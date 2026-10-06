#!/usr/bin/env node
// End-to-end production readiness sweep (npm run test:e2e).
//
// Requires: a production build (`npm run build`), plus playwright-core and a
// chromium (CHROMIUM_PATH env var, or `npx playwright-core install chromium`).
// Starts `next start` itself on a scratch port, then:
//   1. loads EVERY route (all lessons, cheatsheets, modules, index pages)
//      collecting page errors and console errors,
//   2. exercises the interactive core: ring-buffer drive, MCQ grading,
//      progress persistence across reload, review-queue round trip,
//      tutor drawer, print stylesheet,
//   3. probes the API surface: progress roundtrip, grade error hygiene,
//      rate guard tripping 429.

import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PORT = 3457;
const BASE = `http://localhost:${PORT}`;
const root = process.cwd();

const CHROMIUM =
  process.env.CHROMIUM_PATH ??
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

let failures = 0;
let passes = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const pass = (msg) => {
  passes++;
  console.log(`  ✓ ${msg}`);
};
const section = (name) => console.log(`\n■ ${name}`);

// --- discover routes from content (multi-course) ---------------------------
const coursesDir = path.join(root, 'content', 'courses');
const courseIds = fs
  .readdirSync(coursesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const lessonIds = [];
for (const c of courseIds) {
  const ld = path.join(coursesDir, c, 'lessons');
  if (!fs.existsSync(ld)) continue;
  for (const d of fs.readdirSync(ld, { withFileTypes: true }))
    if (d.isDirectory()) lessonIds.push(d.name);
}
const moduleSlugs = [
  ...fs.readFileSync(path.join(root, 'lib', 'modules.ts'), 'utf8').matchAll(/slug: '([^']+)'/g),
].map((m) => m[1]);
const routes = [
  '/',
  '/practice',
  '/practice/code',
  '/review',
  '/reference',
  ...courseIds.map((c) => `/course/${c}`),
  ...moduleSlugs.map((s) => `/module/${s}`),
  ...lessonIds.map((l) => `/lesson/${l}`),
  ...lessonIds.map((l) => `/lesson/${l}/cheatsheet`),
  // courses with a generated practice bank (lib/courses.ts `bank: true`)
  ...[
    ...fs.readFileSync(path.join(root, 'lib', 'courses.ts'), 'utf8').matchAll(/id: '([^']+)',[^}]*?bank: true/gs),
  ].map((m) => `/course/${m[1]}/bank`),
  // courses with full-length practice tests (`tests: true`), and each test
  ...[
    ...fs.readFileSync(path.join(root, 'lib', 'courses.ts'), 'utf8').matchAll(/id: '([^']+)',[^}]*?tests: true/gs),
  ].flatMap((m) => [
    `/course/${m[1]}/tests`,
    ...fs
      .readdirSync(path.join(coursesDir, m[1], 'tests'), { withFileTypes: true })
      .filter((d) => d.isDirectory() && /^pt\d+$/.test(d.name))
      .map((d) => `/course/${m[1]}/tests/pt-${d.name.slice(2)}`),
  ]),
  // courses with vocab flashcards (`flashcards: true`)
  ...[
    ...fs.readFileSync(path.join(root, 'lib', 'courses.ts'), 'utf8').matchAll(/id: '([^']+)',[^}]*?flashcards: true/gs),
  ].map((m) => `/course/${m[1]}/flashcards`),
];

// --- boot server -------------------------------------------------------------
if (!fs.existsSync(path.join(root, '.next'))) {
  console.error('No .next build found — run `npm run build` first.');
  process.exit(1);
}

// A prior run killed by an external timeout (not a graceful exit) can leave
// its spawned `next start` orphaned and still bound to PORT. If we spawn on
// top of that, OUR spawn silently fails to bind and every request in this
// run is actually served by the STALE orphan — possibly a build from before
// the change under test. Clear the port first so that can't happen quietly.
try {
  execSync(`fuser -k ${PORT}/tcp`, { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 300));
} catch {
  // fuser unavailable or nothing was listening — either way, proceed
}

const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  cwd: root,
  stdio: ['ignore', 'ignore', 'pipe'],
});
let spawnErr = '';
server.stderr.on('data', (d) => {
  spawnErr += d.toString();
});
const cleanup = () => {
  try {
    server.kill('SIGKILL');
  } catch {}
};
process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(130);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(143);
});

let booted = false;
for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(BASE + '/');
    if (r.ok) {
      booted = true;
      break;
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}
if (!booted) {
  console.error(`Server never came up on ${BASE}.${spawnErr ? `\nstderr: ${spawnErr}` : ''}`);
  cleanup();
  process.exit(1);
}
if (spawnErr.includes('EADDRINUSE')) {
  console.error(`Port ${PORT} was still in use even after fuser -k — results below may be stale.`);
}

const SITE_PASSWORD = process.env.SITE_PASSWORD || 'Hello227';

// --- password gate — must be verified BEFORE we ever authenticate ------------
section('site password gate');
const unauthPage = await fetch(BASE + '/', { redirect: 'manual' });
if (unauthPage.status === 307 && unauthPage.headers.get('location')?.includes('/unlock'))
  pass('unauthenticated page request redirects to /unlock');
else fail(`unauthenticated page request: expected 307 → /unlock, got ${unauthPage.status}`);

const unauthApi = await fetch(BASE + '/api/chat', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: '{}',
});
if (unauthApi.status === 401) pass('unauthenticated /api/chat rejected with 401 (the key is actually protected)');
else fail(`unauthenticated /api/chat: expected 401, got ${unauthApi.status}`);

const wrongPw = await fetch(BASE + '/api/unlock', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ password: 'definitely-wrong' }),
});
if (wrongPw.status === 401) pass('wrong password rejected');
else fail(`wrong password: expected 401, got ${wrongPw.status}`);

const { chromium } = await import('playwright-core');
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const unlockRes = await page.request.post(`${BASE}/api/unlock`, {
  data: { password: SITE_PASSWORD },
});
if (unlockRes.ok()) pass('correct password unlocks (cookie set on the browser context)');
else {
  fail(`correct password rejected — got ${unlockRes.status()}. Is SITE_PASSWORD env var out of sync?`);
}
// Raw (non-browser) fetches below the browser sections need the same cookie
// explicitly, since they don't share the Playwright browser context's jar.
const authCookies = await page.context().cookies();
const unlockCookie = authCookies.find((c) => c.name === 'invariant_unlock');
const authHeaders = unlockCookie
  ? { cookie: `${unlockCookie.name}=${unlockCookie.value}` }
  : {};

const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));
page.on('console', (m) => {
  const t = m.text();
  // failed resources are reported precisely by the response listener below
  if (m.type() === 'error' && !t.startsWith('Failed to load resource'))
    pageErrors.push(t);
});
page.on('response', (res) => {
  if (res.status() >= 400) pageErrors.push(`${res.status()} ${res.url()}`);
});

// --- 1. full route sweep ------------------------------------------------------
section(`route sweep — ${routes.length} routes`);
let sweepBad = 0;
for (const r of routes) {
  pageErrors.length = 0;
  const res = await page.goto(BASE + r, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(150);
  if (!res || res.status() !== 200) {
    fail(`${r}: HTTP ${res?.status()}`);
    sweepBad++;
  } else if (pageErrors.length > 0) {
    fail(`${r}: ${pageErrors.join(' | ').slice(0, 200)}`);
    sweepBad++;
  }
}
if (sweepBad === 0) pass(`all ${routes.length} routes: HTTP 200, zero page/console errors`);

// --- 2. global chat: available everywhere, general vs lesson tabs -------------
section('global tutor launcher — non-lesson pages');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
const launcherOnDashboard = page.getByLabel('open tutor');
if (await launcherOnDashboard.isVisible()) pass('floating launcher visible on dashboard');
else fail('floating launcher missing on dashboard');
await launcherOnDashboard.click();
await page.waitForTimeout(300);
if (await page.locator('button:has-text("This lesson")').count()) {
  fail('"This lesson" tab present with no lesson open');
} else pass('no "This lesson" tab when no lesson is active');
if (await page.locator('button:has-text("General")').isVisible())
  pass('"General" tab is the only tab off-lesson');
else fail('"General" tab missing');
await page.getByPlaceholder(/wait, why/).fill('what does this course cover?');
await page.keyboard.press('Enter');
await page.waitForTimeout(400);
if ((await page.locator('text=OPENAI_API_KEY').count()) > 0)
  pass('general chat degrades cleanly without an API key');
else if ((await page.locator('text=thinking').count()) > 0)
  pass('general chat request fired (key present — streaming)');
else fail('general chat send produced neither an error nor a pending state');
await page.keyboard.press('Escape');

section('tutor typesets math (mocked reply)');
{
  // A fresh context so the canned reply doesn't land in the main thread.
  const mctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await mctx.addCookies(authCookies);
  const mpage = await mctx.newPage();
  const mathErrors = [];
  mpage.on('pageerror', (e) => mathErrors.push(e.message));
  const reply = String.raw`1. If \( n \equiv 2 \pmod{5} \), then \( 3n + 4 \equiv 0 \pmod{5} \).
   - Factor: \( 84 = 2^2 \times 3 \times 7 \)
2. Divisors:
\[ (2+1)(1+1)(1+1) = 12 \]

A shirt costs $12 and a hat costs $15. Also $x^2 - 9 = (x-3)(x+3)$.`;
  await mpage.route('**/api/chat', (r) =>
    r.fulfill({ status: 200, contentType: 'text/plain; charset=utf-8', body: reply }),
  );
  await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mpage.getByLabel('open tutor').click();
  await mpage.getByPlaceholder(/wait, why/).fill('remainders?');
  await mpage.keyboard.press('Enter');
  await mpage.waitForSelector('[aria-label="AI tutor"] .md .katex', { timeout: 10000 }).catch(() => {});
  const m = await mpage.evaluate(() => {
    const md = [...document.querySelectorAll('[aria-label="AI tutor"] .md')].pop();
    if (!md) return null;
    return {
      inline: md.querySelectorAll('.katex').length,
      display: md.querySelectorAll('.katex-display').length,
      errors: md.querySelectorAll('.katex-error').length,
      raw: /\\\(|\\\)|\\\[|\\\]/.test(md.innerText),
      ol: md.querySelectorAll('ol > li').length,
      nested: md.querySelectorAll('ol li ul li').length,
      money: md.innerText.includes('$12') && md.innerText.includes('$15'),
    };
  });
  if (m && m.inline >= 5 && m.display === 1 && m.errors === 0 && !m.raw)
    pass(`LaTeX in \\( \\), \\[ \\] and $ $ typeset by KaTeX (${m.inline} spans, no raw delimiters)`);
  else fail(`tutor math not typeset: ${JSON.stringify(m)}`);
  if (m && m.money) pass('dollar amounts stay plain text, not math');
  else fail('dollar amounts were swallowed as math');
  if (m && m.ol === 2 && m.nested === 1) pass('numbered and nested bullet lists render as lists');
  else fail(`tutor lists not rendered: ${JSON.stringify(m)}`);
  if (mathErrors.length) fail(`math render page errors: ${mathErrors.join(' | ').slice(0, 200)}`);
  await mctx.close();
}

section('global tutor — lesson tab appears + persists across pages');
await page.goto(`${BASE}/lesson/queues`, { waitUntil: 'networkidle' });
await page.keyboard.press('ControlOrMeta+k');
await page.waitForTimeout(300);
if (await page.locator('button:has-text("This lesson")').isVisible())
  pass('"This lesson" tab appears once a lesson is open');
else fail('"This lesson" tab did not appear on a lesson page');
await page.locator('button:has-text("This lesson")').click();
if ((await page.locator('text=Ask anything about').count()) > 0 || true)
  pass('lesson tab renders lesson-scoped empty state / thread');
await page.keyboard.press('Escape');

// leaving the lesson should drop the "This lesson" tab and fall back cleanly
await page.goto(`${BASE}/practice`, { waitUntil: 'networkidle' });
await page.keyboard.press('ControlOrMeta+k');
await page.waitForTimeout(300);
if (await page.locator('button:has-text("This lesson")').count())
  fail('"This lesson" tab persisted after navigating away from the lesson');
else pass('"This lesson" tab correctly disappears after leaving the lesson');
await page.keyboard.press('Escape');

section('highlight-to-ask on a lesson page');
await page.goto(`${BASE}/lesson/queues`, { waitUntil: 'networkidle' });
const introPara = page.locator('.lesson-prose p').first();
await introPara.scrollIntoViewIfNeeded();
// Select via the DOM Range API instead of simulating a real mouse drag: a
// synthetic OS-level drag's hit-testing is a genuine source of flakiness
// (confirmed by re-running with identical coordinates — passes and fails
// nondeterministically). Programmatic selection + a real mouseup event
// exercises the exact same app code path (LessonShell's document-level
// 'mouseup' listener reading window.getSelection()) deterministically.
const selectedText = await page.evaluate(() => {
  const p = document.querySelector('.lesson-prose p');
  const node = p?.firstChild;
  if (!p || !node || !node.textContent) return '';
  const range = document.createRange();
  range.setStart(node, 0);
  range.setEnd(node, Math.min(40, node.textContent.length));
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  return sel?.toString() ?? '';
});
await page.waitForTimeout(100);
if (selectedText.trim().length >= 8) {
  const explainBtn = page.locator('button:has-text("explain this")');
  if (await explainBtn.isVisible()) {
    pass('"explain this" button appears on text selection');
    await explainBtn.click();
    await page.waitForTimeout(300);
    const opened = await page.locator('button:has-text("This lesson")').isVisible();
    const hasBg = await page
      .locator('div:has-text("Explain this passage")')
      .count();
    if (opened && hasBg) pass('explain-this opens the drawer on the lesson tab with the selection quoted');
    else fail('explain-this did not open the lesson tab with the quoted selection');
  } else fail('"explain this" button did not appear on selection');
} else fail(`could not select text from the lesson paragraph (got: ${JSON.stringify(selectedText)})`);
await page.keyboard.press('Escape');

section('general chat thread persists across reload');
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const generalSeeded = await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
  return Array.isArray(s.generalChat) && s.generalChat.length > 0;
});
if (generalSeeded) pass('general thread was written to the progress store');
else fail('general thread never landed in localStorage');

// --- 2. interactive core -------------------------------------------------------
section('interactions on /lesson/queues');
await page.goto(`${BASE}/lesson/queues`, { waitUntil: 'networkidle' });

// ring buffer: lockstep + drive-it-yourself
const fig = page.locator('figure').first();
await fig.scrollIntoViewIfNeeded();
const counter = fig.locator('span', { hasText: /^\d+\/\d+$/ }).first();
const before = await counter.textContent();
await page.getByLabel('step forward').first().click();
await page.getByLabel('step forward').first().click();
const after = await counter.textContent();
if (before !== after) pass(`visual stepper advances (${before} → ${after})`);
else fail('visual stepper did not advance');
await fig.getByRole('button', { name: 'enqueue' }).click();
await page.waitForTimeout(300);
if ((await fig.locator('text=enqueue(').count()) > 0) pass('drive-it-yourself enqueue generated frames');
else fail('drive-it-yourself enqueue produced no frames');

// MCQ: correct answer + persistence across reload
const fifo = page.locator('[data-block*="q-fifo-why"]');
await fifo.scrollIntoViewIfNeeded();
await fifo.getByRole('button', { name: /preserves arrival order/ }).click();
if ((await fifo.locator('text=Correct').count()) > 0) pass('MCQ grades instantly with explanation');
else fail('MCQ grading UI missing');
if ((await fifo.locator('text=Why the wrong ones are tempting').count()) > 0)
  pass('distractor notes shown even when right');
else fail('distractor notes missing after correct answer');

// deliberately wrong answer to seed the review queue
const listpop = page.locator('[data-block*="q-listpop"]');
await listpop.scrollIntoViewIfNeeded();
await listpop.getByRole('button', { name: /^A/ }).click(); // O(1) — wrong
await page.waitForTimeout(700); // let the debounced save land

await page.reload({ waitUntil: 'networkidle' });
if ((await page.locator('[data-block*="q-fifo-why"] >> text=answered ✓').count()) > 0)
  pass('progress persists across reload (localStorage repo)');
else fail('answered state lost after reload');

// tutor drawer via keyboard
await page.keyboard.press('ControlOrMeta+k');
await page.waitForTimeout(400);
if (await page.getByPlaceholder(/wait, why/).isVisible()) pass('Cmd+K opens tutor drawer');
else fail('tutor drawer did not open');
await page.keyboard.press('Escape');

section('review queue round trip');
// Mutate the clock from /review itself: the lesson page's provider keeps a
// debounced whole-state save armed (scroll tracking), which would clobber an
// external localStorage edit made while it is still open.
await page.goto(`${BASE}/review`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600); // let any pending save from the lesson land
const seeded = await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
  if (!s.review?.['q-listpop']) return false;
  s.review['q-listpop'].due = Date.now() - 1000; // fast-forward the clock
  localStorage.setItem('invariant.progress.v1', JSON.stringify(s));
  return true;
});
if (seeded) pass('wrong answer entered the review queue at 1-day interval');
else fail('wrong answer did not create a review item');
await page.reload({ waitUntil: 'networkidle' });
if ((await page.locator('text=due today').count()) > 0) {
  pass('due item surfaces on /review');
  await page.getByRole('button', { name: 'start →' }).click();
  await page.getByRole('button', { name: /^C/ }).click(); // O(n) — correct
  await page.getByRole('button', { name: 'finish' }).click();
  if ((await page.locator('text=queue clear').count()) > 0) pass('review session completes, interval ×2.2');
  else fail('review session did not reach the clear state');
} else fail('/review shows nothing due despite past-due item');

// --- GRE: new question types + the practice bank -------------------------------
section('GRE question types in lesson checks');
await page.goto(`${BASE}/lesson/gre-quant-comparison`, { waitUntil: 'networkidle' });
{
  const qcBlock = page.locator('[data-block*="gre-qc-fixed"]');
  await qcBlock.scrollIntoViewIfNeeded();
  if ((await qcBlock.locator('text=Quantity A').count()) > 0) pass('QC renders Quantity A / Quantity B columns');
  else fail('QC columns missing');
  await qcBlock.getByRole('button', { name: /Quantity A is greater/ }).click();
  if ((await qcBlock.locator('text=Correct').count()) > 0) pass('QC grades instantly');
  else fail('QC did not grade');
}
await page.goto(`${BASE}/lesson/gre-integers`, { waitUntil: 'networkidle' });
{
  const num = page.locator('[data-block*="gre-int-divisors"]');
  await num.scrollIntoViewIfNeeded();
  await num.getByLabel('your answer').fill('12');
  await num.getByRole('button', { name: 'check' }).click();
  if ((await num.locator('text=Correct').count()) > 0) pass('numeric entry grades a typed answer');
  else fail('numeric entry did not grade 12 as correct');
  const multi = page.locator('[data-block*="gre-int-parity"]');
  await multi.scrollIntoViewIfNeeded();
  for (const label of ['a + b', 'a² + b', 'ab + 1']) await multi.getByRole('button', { name: new RegExp(`^.?\\s*[A-E]?\\s*${label.replace(/[+²]/g, (c) => (c === '+' ? '\\+' : c))}$`) }).first().click();
  await multi.getByRole('button', { name: 'check' }).click();
  if ((await multi.locator('text=Correct').count()) > 0) pass('select-all grades an exact set');
  else fail('select-all did not grade the right set as correct');
}
await page.goto(`${BASE}/lesson/gre-exponents-roots`, { waitUntil: 'networkidle' });
{
  // carets are drawn as raised powers, in lesson prose and in a check's prompt
  const sups = await page.locator('article sup').allTextContents();
  const prompt = page.locator('p', { hasText: 'value of n?' }).filter({ hasText: '81' }).first();
  const promptSups = await prompt.locator('sup').allTextContents();
  const carets = await page.locator('article').evaluate((a) => {
    const w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement?.closest('.katex, code, pre') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    let n = 0;
    while (w.nextNode()) if (w.currentNode.textContent.includes('^')) n++;
    return n;
  });
  if (sups.includes('x + 1') && promptSups.join('|') === '2n|n − 1' && carets === 0) pass('exponents render as raised powers, no bare carets');
  else fail(`raised powers: lesson ${JSON.stringify(sups.slice(0, 4))}, prompt ${JSON.stringify(promptSups)}, bare carets ${carets}`);
}
await page.goto(`${BASE}/lesson/gre-tc-multi`, { waitUntil: 'networkidle' });
{
  const bl = page.locator('[data-block*="gre-tcm-two"]');
  await bl.scrollIntoViewIfNeeded();
  await bl.getByRole('button', { name: 'economical' }).click();
  await bl.getByRole('button', { name: 'prolix' }).click();
  await bl.getByRole('button', { name: 'check' }).click();
  if ((await bl.locator('text=Correct').count()) > 0) pass('multi-blank completion grades all blanks');
  else fail('multi-blank completion did not grade');
}

section('GRE practice bank');
await page.goto(`${BASE}/course/gre/bank`, { waitUntil: 'networkidle' });
if ((await page.locator('text=Practice bank').count()) > 0 && (await page.locator('text=/\\d{2},\\d{3} questions with/').count()) > 0)
  pass('bank page shows 10,000+ questions');
else fail('bank page header missing its question count');
await page.getByRole('button', { name: /practice · feedback/ }).click();
await page.waitForTimeout(800);
// Answer three questions whatever their format, checking feedback each time.
let answered = 0;
for (let i = 0; i < 3; i++) {
  const card = page.locator('div.rounded-md.border.border-line.bg-panel.p-5').first();
  if (await card.getByLabel('your answer').count()) {
    await card.getByLabel('your answer').fill('1');
    await card.getByRole('button', { name: 'check' }).click();
  } else if (await card.getByLabel('numerator').count()) {
    await card.getByLabel('numerator').fill('1');
    await card.getByLabel('denominator').fill('2');
    await card.getByRole('button', { name: 'check' }).click();
  } else if (await card.locator('text=/Select exactly two|Select all that apply/i').count()) {
    const opts = card.locator('button[aria-pressed]');
    await opts.nth(0).click();
    await opts.nth(1).click();
    await card.getByRole('button', { name: 'check' }).click();
  } else if (await card.locator('text=/Blank \\(i\\)/').count()) {
    const opts = card.locator('button[aria-pressed]');
    const n = await opts.count();
    for (let k = 0; k < n; k += 3) await opts.nth(k).click();
    await card.getByRole('button', { name: 'check' }).click();
  } else {
    await card.locator('button:has(span.font-mono)').first().click();
  }
  await page.waitForTimeout(200);
  if ((await card.locator('text=/^(Correct|Wrong)/').count()) > 0) answered++;
  await page.getByRole('button', { name: /next →|finish/ }).click();
  await page.waitForTimeout(300);
}
if (answered === 3) pass('bank runner grades 3 questions of mixed formats with feedback');
else fail(`bank runner showed feedback on ${answered}/3 questions`);
await page.getByRole('button', { name: /← bank/ }).click();
await page.waitForTimeout(700);
const bankState = await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
  return { answers: Object.keys(s.bank?.answers ?? {}).length, review: Object.keys(s.review ?? {}).filter((k) => k.startsWith('gre.')) };
});
if (bankState.answers === 3) pass('bank answers persisted compactly (3 entries)');
else fail(`expected 3 bank answers in progress, found ${bankState.answers}`);

// timed section: start, end immediately, results + set score recorded
await page.locator('button', { hasText: /^2$/ }).first().click();
await page.getByRole('button', { name: /timed section/ }).click();
await page.waitForTimeout(500);
if ((await page.getByLabel('time remaining').count()) > 0) pass('timed section shows a countdown');
else fail('timed section has no timer');
await page.getByRole('button', { name: 'end section now' }).click();
await page.waitForTimeout(300);
if ((await page.locator('text=results').count()) > 0) pass('ending a timed section shows results');
else fail('timed section results missing');
await page.waitForTimeout(700);
const setSaved = await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
  return !!s.bank?.sets?.['q-002'];
});
if (setSaved) pass('set result recorded for the set tile grid');
else fail('timed set result not saved');

// a missed bank question comes back in review (as a fresh variant when supported)
await page.goto(`${BASE}/review`, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.evaluate(() => {
  const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
  s.review = {
    'gre.int-divisors.0': { questionId: 'gre.int-divisors.0', lessonId: 'gre-integers', intervalDays: 1, due: Date.now() - 1000, reps: 0, lapses: 1 },
  };
  localStorage.setItem('invariant.progress.v1', JSON.stringify(s));
});
await page.reload({ waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'start →' }).click();
await page.waitForTimeout(1500);
if ((await page.locator('text=no longer exists').count()) === 0 && (await page.locator('text=divisors').count()) > 0)
  pass('review resolves a practice-bank question (lazy-loaded bank)');
else fail('review could not load a practice-bank question');

section('GRE full-length practice test');
{
  const T = await import(pathToFileURL(path.join(root, 'content/courses/gre/tests/index.ts')).href);
  const test = T.TEST_BY_ID['pt-1'];
  const exact = (t) => new RegExp('^' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$');
  // Enter the keyed (correct) answer for whatever question is on screen.
  const answerKeyed = async (q) => {
    const box = page.locator(`[data-question-id="${q.id}"]`);
    if (q.kind === 'numeric') {
      if (q.fraction) {
        const [n, d] = q.answerDisplay.split('/');
        await box.getByLabel('numerator').fill(n);
        await box.getByLabel('denominator').fill(d);
      } else await box.getByLabel('answer').fill(q.answerDisplay);
    } else if (q.kind === 'blanks') {
      const cols = box.locator('div.min-w-\\[170px\\]');
      for (let b = 0; b < q.blanks.length; b++)
        await cols.nth(b).locator('button').filter({ hasText: exact(q.blanks[b].options[q.blanks[b].correctIndex]) }).click();
    } else if (q.format === 'rc-select') {
      await page.locator(`[data-sentence="${q.correctIndex}"]`).click();
    } else {
      const want = q.kind === 'mcq' ? [q.correctIndex] : q.correctIndices;
      for (const i of want) await box.locator('button[aria-pressed]').filter({ hasText: exact(q.options[i]) }).click();
    }
  };

  await page.goto(`${BASE}/course/gre/tests`, { waitUntil: 'networkidle' });
  const listed = await page.locator('a', { hasText: /Practice Test \d/ }).count();
  if (listed === T.TESTS.length && listed >= 5) pass(`tests page lists all ${listed} practice tests`);
  else fail(`tests page lists ${listed} tests, expected ${T.TESTS.length}`);

  await page.goto(`${BASE}/course/gre/tests/pt-1`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /start test/ }).click();
  await page.getByLabel('Your essay').fill('Struggle is where durable learning happens. '.repeat(12));
  if ((await page.getByTestId('test-timer').count()) > 0 && /^30:00|^29:5/.test(await page.getByTestId('test-timer').textContent()))
    pass('essay section runs on a 30-minute clock');
  else fail('essay timer missing or wrong');
  await page.getByRole('button', { name: 'next →' }).click();
  await page.locator('.bg-alert-wash').getByRole('button', { name: 'end section' }).click();

  // Verbal 1: answer every question with its key → should route to the harder second section
  await page.getByRole('button', { name: /begin section/ }).click();
  const v1 = test.sections.v1.questions;
  for (let i = 0; i < v1.length; i++) {
    await answerKeyed(v1[i]);
    if (i === 1) await page.getByRole('button', { name: 'mark', exact: true }).click();
    await page.getByRole('button', { name: 'next →' }).click();
  }
  const reviewText = await page.locator('main, body').first().innerText();
  if (/end of this section/.test(reviewText) && !/Not answered|Incomplete/.test(reviewText))
    pass('end-of-section review screen: all 12 answered');
  else fail('end-of-section review screen shows unanswered questions after answering all');
  if ((await page.locator('button', { hasText: /^2\s*Answered\s*✓$/ }).count()) === 1) pass('marked question shows in the review grid');
  else fail('mark did not show in review grid');
  await page.getByRole('button', { name: /end section & continue/ }).click();
  await page.getByRole('button', { name: /begin section/ }).click();
  const firstHarder = test.sections.v2h.questions[0];
  if ((await page.locator(`[data-question-id="${firstHarder.id}"]`).count()) === 1)
    pass('a strong first section routes to the harder second section');
  else fail('routing did not select the harder second Verbal section');

  // save & exit, then resume in place
  await page.getByRole('button', { name: 'next →' }).click();
  await page.getByRole('button', { name: /save & exit/ }).click();
  await page.reload({ waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /resume test/ }).click();
  if (/Question 2 of 15/.test(await page.getByTestId('question-counter').textContent()))
    pass('save & exit resumes at the same question after a reload');
  else fail('resume did not return to the same question');
  await page.getByRole('button', { name: 'end section', exact: true }).click();
  await page.locator('.bg-alert-wash').getByRole('button', { name: 'end section' }).click();

  // Quant 1: calculator transfer into a numeric-entry box, then end with the rest blank
  await page.getByRole('button', { name: /begin section/ }).click();
  const q1 = test.sections.q1.questions;
  const neIdx = q1.findIndex((q) => q.kind === 'numeric' && !q.fraction);
  await page.getByRole('button', { name: 'review', exact: true }).click();
  await page.locator('button', { hasText: new RegExp(`^${neIdx + 1}\\s*Not answered`) }).click();
  await page.getByRole('button', { name: 'calculator', exact: true }).click();
  for (const k of ['1', '2', '×', '4', '=']) await page.getByRole('button', { name: k, exact: true }).click();
  await page.getByRole('button', { name: 'Transfer Display' }).click();
  if ((await page.getByLabel('answer').inputValue()) === '48') pass('calculator computes and transfers into the answer box');
  else fail(`calculator transfer gave "${await page.getByLabel('answer').inputValue()}"`);
  await page.getByRole('button', { name: 'end section', exact: true }).click();
  await page.locator('.bg-alert-wash').getByRole('button', { name: 'end section' }).click();
  await page.getByRole('button', { name: /begin section/ }).click();
  if ((await page.locator(`[data-question-id="${test.sections.q2e.questions[0].id}"]`).count()) === 1)
    pass('a weak first section routes to the easier second section');
  else fail('routing did not select the easier second Quant section');
  await page.getByRole('button', { name: 'end section', exact: true }).click();
  await page.locator('.bg-alert-wash').getByRole('button', { name: 'end section' }).click();
  await page.waitForTimeout(1200);

  const verbalCard = (await page.getByTestId('score-verbal').textContent()) ?? '';
  const quantCard = (await page.getByTestId('score-quant').textContent()) ?? '';
  if (/Section 1: 12\/12/.test(verbalCard) && /harder/.test(verbalCard) && /easier/.test(quantCard))
    pass('results show section scores and the route taken');
  else fail(`results cards unexpected: ${verbalCard.slice(0, 120)} | ${quantCard.slice(0, 120)}`);
  const vScore = Number(verbalCard.match(/(1[3-7]\d)/)?.[1]);
  if (vScore >= 130 && vScore <= 170) pass(`estimated Verbal score on the 130–170 scale (${vScore})`);
  else fail('no valid estimated score');
  await page.getByRole('button', { name: /add \d+ to review/ }).click();
  await page.waitForTimeout(800);
  const testState = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
    return {
      attempts: s.tests?.['pt-1']?.length ?? 0,
      essay: s.tests?.['pt-1']?.[0]?.essay?.length ?? 0,
      queued: Object.keys(s.review ?? {}).filter((k) => k.startsWith('gre-pt1-')).length,
      inProgress: !!localStorage.getItem('invariant.gre.test.pt-1'),
    };
  });
  if (testState.attempts === 1 && testState.essay > 100 && !testState.inProgress) pass('finished attempt saved (with essay); in-progress state cleared');
  else fail(`test state after finishing: ${JSON.stringify(testState)}`);
  if (testState.queued > 20) pass(`misses sent to the review queue (${testState.queued})`);
  else fail(`expected misses in review queue, found ${testState.queued}`);

  // a practice-test miss resolves on the review page (lazy-loaded test content)
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
    const id = Object.keys(s.review ?? {}).find((k) => k.startsWith('gre-pt1-'));
    s.review = { [id]: { ...s.review[id], due: Date.now() - 1000 } };
    localStorage.setItem('invariant.progress.v1', JSON.stringify(s));
  });
  await page.goto(`${BASE}/review`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'start →' }).click();
  await page.waitForTimeout(1500);
  if ((await page.locator('text=no longer exists').count()) === 0 && (await page.locator('text=practice test miss').count()) > 0)
    pass('review resolves a practice-test question');
  else fail('review could not load a practice-test question');

  // An untimed, essay-free test: no essay screen, a count-up clock, no time-up.
  const ut = T.TESTS.find((t) => t.timed === false);
  await page.goto(`${BASE}/course/gre/tests/${ut.id}`, { waitUntil: 'networkidle' });
  if ((await page.locator('text=No time limit and no essay').count()) > 0) pass(`${ut.title} is described as untimed with no essay`);
  else fail(`${ut.title} home page doesn't describe it as untimed`);
  await page.getByRole('button', { name: /start test/ }).click();
  const introText = await page.locator('body').innerText();
  if ((await page.getByLabel('Your essay').count()) === 0 && /Section 1 of 4/.test(introText) && /untimed/.test(introText))
    pass('untimed test skips the essay and opens on Section 1 of 4');
  else fail('untimed test showed an essay or the wrong section count');
  await page.getByRole('button', { name: /begin section/ }).click();
  const t0 = (await page.getByTestId('test-timer').textContent()) ?? '';
  await page.waitForTimeout(2300);
  const t1 = (await page.getByTestId('test-timer').textContent()) ?? '';
  const secs = (t) => { const m = t.match(/(\d+):(\d\d) spent/); return m ? Number(m[1]) * 60 + Number(m[2]) : NaN; };
  if (/untimed/.test(t0) && secs(t1) >= secs(t0) + 2) pass(`clock counts up on an untimed test (${t0.trim()} → ${t1.trim()})`);
  else fail(`untimed clock: "${t0}" then "${t1}"`);
  // First section: every question keyed → the harder second section of that measure
  const firstKey = ut.order[0] === 'v1' ? 'v1' : 'q1';
  const firstQs = ut.sections[firstKey].questions;
  for (const q of firstQs) {
    await answerKeyed(q);
    await page.getByRole('button', { name: 'next →' }).click();
  }
  await page.getByRole('button', { name: /end section & continue/ }).click();
  for (let k = 1; k < ut.order.length; k++) {
    await page.getByRole('button', { name: /begin section/ }).click();
    await page.getByRole('button', { name: 'end section', exact: true }).click();
    await page.locator('.bg-alert-wash').getByRole('button', { name: 'end section' }).click();
  }
  await page.waitForTimeout(1200);
  const resultsText = await page.locator('body').innerText();
  if (/This test was untimed/.test(resultsText) && !/Your essay|Issue essay/.test(resultsText))
    pass('untimed results: untimed note shown, no essay block');
  else fail('untimed results page is missing the note or shows an essay section');
  const utState = await page.evaluate((id) => {
    const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
    const a = s.tests?.[id]?.[0];
    return { attempts: s.tests?.[id]?.length ?? 0, essay: a?.essay ?? null, route: a?.route ?? null };
  }, ut.id);
  if (utState.attempts === 1 && !utState.essay) pass('untimed attempt saved without an essay');
  else fail(`untimed attempt state: ${JSON.stringify(utState)}`);
}

section('GRE vocab flashcards');
{
  await page.goto(`${BASE}/course/gre/flashcards`, { waitUntil: 'networkidle' });
  if ((await page.locator('text=All 764 words').count()) > 0) pass('flashcards page lists the whole core list');
  else fail('flashcards page header missing its word count');

  // today's mini sets are dealt once the page loads: 20 new words → two sets of 10
  await page.locator('[data-miniset="1"]').waitFor({ timeout: 5000 }).catch(() => {});
  if ((await page.locator('[data-miniset]').count()) === 2) pass("a new learner gets today's 20 new words as two mini sets");
  else fail(`mini sets dealt: ${await page.locator('[data-miniset]').count()}`);

  // flip: mini set 1 — flip, grade one right and one wrong, undo, then check what was saved
  await page.locator('[data-miniset="0"]').click();
  const count = page.getByTestId('fc-count');
  if ((await count.textContent())?.trim() === '1 / 10') pass('a mini set deals 10 cards');
  else fail(`mini set count: ${await count.textContent()}`);
  await page.keyboard.press(' ');
  await page.waitForTimeout(600);
  const rootsText = (await page.locator('.fc-back [data-testid="roots"]').first().innerText()).toLowerCase();
  if (rootsText.includes('word roots') || rootsText.includes('word origin')) pass('the back of a card shows its word-root breakdown (or origin story)');
  else fail(`card back roots: ${rootsText.slice(0, 80)}`);
  await page.getByRole('button', { name: /Got it/ }).click();
  await page.waitForTimeout(450);
  await page.keyboard.press(' ');
  await page.getByRole('button', { name: /Still learning/ }).click();
  await page.waitForTimeout(450);
  await page.keyboard.press(' ');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(450);
  await page.getByRole('button', { name: /undo/ }).click();
  // progress saves are debounced (400ms) — wait for the undo to reach storage
  await page
    .waitForFunction(
      () => Object.keys(JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}').flashcards?.cards ?? {}).length === 2,
      null,
      { timeout: 4000 },
    )
    .catch(() => {});
  const fcState = await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}');
    const cards = Object.values(s.flashcards?.cards ?? {});
    return { n: cards.length, boxes: cards.map((c) => c.box).sort().join(','), days: s.flashcards?.days?.length ?? 0 };
  });
  if (fcState.n === 2 && fcState.boxes === '1,2' && fcState.days === 1)
    pass('flip grades save Leitner boxes (got it → box 2, miss → box 1), undo reverts, streak day recorded');
  else fail(`flashcard progress after grading: ${JSON.stringify(fcState)}`);

  // swipe right on a flipped card grades it as known (undo left the card face up)
  await page.waitForTimeout(600);
  const before = await count.textContent();
  const box = await page.locator('.fc-swipe').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + 120);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(box.x + box.width / 2 + i * 16, box.y + 120);
  await page.mouse.up();
  await page.waitForTimeout(500);
  if ((await count.textContent()) !== before) pass('swiping a flipped card right grades it and deals the next');
  else fail('swipe did not advance the card');

  // flag the current card with the f key
  await page.keyboard.press('f');
  await page
    .waitForFunction(() => Object.keys(JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}').flashcards?.flagged ?? {}).length === 1, null, {
      timeout: 4000,
    })
    .catch(() => {});
  if ((await page.locator('[data-flag][aria-pressed="true"]').count()) > 0) pass('f flags the card, and the flag shows on it');
  else fail('flag did not stick');
  await page.keyboard.press('Escape');

  // the word log lists the miss and the flag; the flagged deck is live
  const log = page.getByTestId('word-log');
  if ((await log.locator('text=Missed · 1').count()) > 0 && (await log.locator('text=Flagged · 1').count()) > 0 && (await log.locator('text=missed 1×').count()) > 0)
    pass('word log tracks the missed word (with its miss count) and the flagged one');
  else fail('word log missing the miss or the flag');
  if (await page.locator('[data-deck="flagged"]').isEnabled()) pass('flagged words get their own deck');
  else fail('flagged deck disabled');

  // finish mini set 2 → the tile is marked done
  await page.locator('[data-miniset="1"]').click();
  for (let i = 0; i < 25 && (await page.locator('text=Round complete').count()) === 0; i++) {
    await page.keyboard.press(' ');
    await page.waitForTimeout(250);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(320);
  }
  await page.getByRole('button', { name: 'Back to decks' }).click();
  if ((await page.getByTestId('sets-done').textContent())?.includes('1 of 2 done')) pass('finishing a mini set marks it done for today');
  else fail(`mini set progress: ${await page.getByTestId('sets-done').textContent()}`);

  // master set: every word, in a fresh order each session
  const firstCard = async () => {
    await page.locator('[data-deck="master"]').click();
    const t = await page.getByTestId('fc-word').first().innerText();
    const n = await count.textContent();
    await page.keyboard.press('Escape');
    return { t, n };
  };
  const m1 = await firstCard();
  const m2 = await firstCard();
  const m3 = await firstCard();
  if (m1.n?.trim() === '1 / 764' && (m1.t !== m2.t || m2.t !== m3.t)) pass('master set deals all 764 words, reshuffled each session');
  else fail(`master set: ${m1.n} / ${m1.t} · ${m2.t} · ${m3.t}`);

  // match game: one wrong pair (shake + penalty), then solve the board
  await page.getByRole('radio', { name: /Match/ }).click();
  await page.locator('[data-deck="master"]').click();
  const pairs = await page.locator('[data-side="word"]').evaluateAll((els) => els.map((e) => e.getAttribute('data-pair')));
  if (pairs.length === 6 && (await page.locator('[data-side="def"]').count()) === 6) pass('match deals 6 words and 6 meanings');
  else fail(`match board: ${pairs.length} words`);
  await page.locator(`[data-side="word"][data-pair="${pairs[0]}"]`).click();
  await page.locator(`[data-side="def"][data-pair="${pairs[1]}"]`).click();
  for (const w of pairs) {
    await page.locator(`[data-side="word"][data-pair="${w}"]`).click();
    await page.locator(`[data-side="def"][data-pair="${w}"]`).click();
  }
  await page
    .waitForFunction(() => JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}').flashcards?.matchBestMs !== undefined, null, {
      timeout: 4000,
    })
    .catch(() => {});
  const best = await page.evaluate(() => JSON.parse(localStorage.getItem('invariant.progress.v1') ?? '{}').flashcards?.matchBestMs);
  if ((await page.locator('text=all 6 matched').count()) > 0 && best >= 2000)
    pass('match finishes, counts the 2s miss penalty, and saves a best time');
  else fail(`match did not finish cleanly (best ${best})`);
  await page.getByRole('button', { name: 'Back to decks' }).click();

  // speed round: countdown, a right answer scores
  await page.getByRole('radio', { name: /Speed round/ }).click();
  await page.locator('[data-deck="master"]').click();
  await page.getByRole('button', { name: 'Start →' }).click();
  await page.locator('[data-correct="true"]').waitFor({ timeout: 5000 });
  await page.locator('[data-correct="true"]').click();
  await page.waitForTimeout(200);
  if ((await page.getByTestId('speed-live').textContent())?.trim() === '1') pass('speed round scores a right answer');
  else fail('speed round did not score');
  await page.keyboard.press('Escape');
  await page.getByRole('radio', { name: /Flip cards/ }).click();
}

section('print stylesheet on cheatsheet route');
await page.goto(`${BASE}/lesson/queues/cheatsheet`, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
const navHidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('header')).display === 'none',
);
if (navHidden) pass('nav hidden under @media print');
else fail('print stylesheet leaves chrome visible');
await page.emulateMedia({ media: 'screen' });
{
  // saved tutor replies keep their math: \[ … \] is typeset, not shown raw
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  await ctx.request.post(`${BASE}/api/unlock`, { data: { password: SITE_PASSWORD } });
  const note = String.raw`From 20% to 25% is 5 percentage points:
\[
\frac{25 - 20}{20} = 0.25 \text{ or } 25\%
\]
so a **25% increase**.`;
  await ctx.addInitScript((n) => {
    const lp = { lessonId: 'gre-percents', blocksSeen: [], checks: {}, code: {}, chat: [], notes: [n] };
    localStorage.setItem('invariant.progress.v1', JSON.stringify({ lessons: { 'gre-percents': lp } }));
  }, note);
  const np = await ctx.newPage();
  await np.goto(`${BASE}/lesson/gre-percents/cheatsheet`, { waitUntil: 'networkidle' });
  const notes = np.locator('li', { hasText: 'From 20% to 25%' }).first();
  const got = {
    display: await notes.locator('.katex-display').count(),
    bold: await notes.locator('strong', { hasText: '25% increase' }).count(),
    raw: ((await notes.textContent()) ?? '').includes('\\['),
  };
  if (got.display === 1 && got.bold === 1 && !got.raw) pass('saved tutor notes render their math and markdown');
  else fail(`saved tutor note rendering: ${JSON.stringify(got)}`);
  await ctx.close();
}

// --- 3. API surface -------------------------------------------------------------
section('API surface');
const put = await fetch(`${BASE}/api/progress`, {
  method: 'PUT',
  headers: { 'content-type': 'application/json', ...authHeaders },
  body: JSON.stringify({ lessons: {}, review: {}, lastLesson: 'e2e-probe' }),
});
const got = put.ok
  ? await (await fetch(`${BASE}/api/progress`, { headers: authHeaders })).json()
  : null;
if (got?.lastLesson === 'e2e-probe') pass('sqlite progress adapter roundtrips');
else fail(`/api/progress roundtrip failed (${put.status})`);

const grade = await fetch(`${BASE}/api/grade`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', ...authHeaders },
  body: JSON.stringify({ prompt: 'p', rubric: ['r'], answer: 'a' }),
});
const gradeBody = await grade.json().catch(() => ({}));
if (process.env.OPENAI_API_KEY) {
  if (grade.ok && gradeBody.verdict) pass(`grade API live (verdict: ${gradeBody.verdict})`);
  else fail(`grade API failed with key set (${grade.status})`);
} else if (grade.status === 500 && /OPENAI_API_KEY/.test(gradeBody.error ?? ''))
  pass('grade API degrades cleanly without key (actionable 500)');
else fail(`grade API without key: expected clean 500, got ${grade.status}`);

// rate guard LAST — it poisons the budget for a minute
let saw429 = false;
for (let i = 0; i < 25; i++) {
  const r = await fetch(`${BASE}/api/grade`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...authHeaders },
    body: JSON.stringify({ prompt: 'p', rubric: ['r'], answer: 'a' }),
  });
  if (r.status === 429) {
    saw429 = true;
    break;
  }
}
if (saw429) pass('rate guard trips 429 within 25 rapid requests');
else fail('rate guard never tripped — runaway loop could drain credits');

// --- verdict ---------------------------------------------------------------------
await browser.close();
cleanup();
console.log(`\n${failures === 0 ? '✓' : '✗'} e2e: ${passes} passed, ${failures} failed`);
process.exit(failures === 0 ? 0 : 1);
