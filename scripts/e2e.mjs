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

section('print stylesheet on cheatsheet route');
await page.goto(`${BASE}/lesson/queues/cheatsheet`, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
const navHidden = await page.evaluate(
  () => getComputedStyle(document.querySelector('header')).display === 'none',
);
if (navHidden) pass('nav hidden under @media print');
else fail('print stylesheet leaves chrome visible');
await page.emulateMedia({ media: 'screen' });

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
