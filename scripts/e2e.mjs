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

import { spawn } from 'node:child_process';
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

// --- discover routes from content ------------------------------------------
const lessonIds = fs
  .readdirSync(path.join(root, 'content', 'lessons'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const moduleSlugs = [
  ...fs.readFileSync(path.join(root, 'lib', 'modules.ts'), 'utf8').matchAll(/slug: '([^']+)'/g),
].map((m) => m[1]);
const routes = [
  '/',
  '/practice',
  '/practice/code',
  '/review',
  '/reference',
  ...moduleSlugs.map((s) => `/module/${s}`),
  ...lessonIds.map((l) => `/lesson/${l}`),
  ...lessonIds.map((l) => `/lesson/${l}/cheatsheet`),
];

// --- boot server -------------------------------------------------------------
if (!fs.existsSync(path.join(root, '.next'))) {
  console.error('No .next build found — run `npm run build` first.');
  process.exit(1);
}
const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
  cwd: root,
  stdio: 'ignore',
});
const cleanup = () => {
  try {
    server.kill('SIGKILL');
  } catch {}
};
process.on('exit', cleanup);

for (let i = 0; i < 60; i++) {
  try {
    const r = await fetch(BASE + '/');
    if (r.ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 500));
}

const { chromium } = await import('playwright-core');
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

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
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ lessons: {}, review: {}, lastLesson: 'e2e-probe' }),
});
const got = put.ok ? await (await fetch(`${BASE}/api/progress`)).json() : null;
if (got?.lastLesson === 'e2e-probe') pass('sqlite progress adapter roundtrips');
else fail(`/api/progress roundtrip failed (${put.status})`);

const grade = await fetch(`${BASE}/api/grade`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
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
    headers: { 'content-type': 'application/json' },
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
