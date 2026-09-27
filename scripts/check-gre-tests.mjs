#!/usr/bin/env node
// Full-length GRE practice tests validation (npm run test:tests).
//
// Checks each test against the real test's blueprint and every question
// for structure and answer consistency:
//   - sections: 12/15/15 questions, official minutes, measure order valid;
//   - layout: Verbal opens with text completion, sentence equivalence in
//     one block, passage questions contiguous; Quant opens with the QC
//     block (4 in section 1, 5 in section 2) and has none after it;
//   - adaptivity: harder second sections are harder than the first,
//     easier ones easier;
//   - every question: right option counts per format, keyed answer grades
//     as correct through the same grading code the app uses, select-in-
//     passage sentences really occur in the passage, figures/charts sane;
//   - ids unique across tests, bank, and lesson checks; no duplicate
//     questions; essay prompts present and distinct.
//
// `--print <testNo> <sectionKey>` prints a section for a read-through.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const T = await imp('content/courses/gre/tests/index.ts');
const G = await imp('content/courses/gre/tests/grade.ts');
const S = await imp('content/courses/gre/tests/scoring.ts');

let failures = 0;
const fail = (msg) => {
  failures++;
  if (failures <= 80) console.error(`  ✗ ${msg}`);
};
const section = (name) => console.log(`\n■ ${name}`);

const lessonsDir = path.join(root, 'content/courses/gre/lessons');
const lessonIds = new Set(
  fs.readdirSync(lessonsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name),
);

const BAD_TEXT = /undefined|NaN|Infinity|\[object|null\b|\$\{/;
const SIZES = { v1: 12, v2e: 15, v2h: 15, q1: 12, q2e: 15, q2h: 15 };
const MINUTES = { v1: 18, v2e: 23, v2h: 23, q1: 21, q2e: 26, q2h: 26 };
const QC_COUNT = { q1: 4, q2e: 5, q2h: 5 };
const VERBAL_FORMATS = new Set(['tc', 'se', 'rc', 'rc-multi', 'rc-select', 'cr']);
const QUANT_FORMATS = new Set(['qc', 'ps', 'ps-multi', 'ne']);

function keyedResponse(q) {
  switch (q.kind) {
    case 'mcq':
      return q.correctIndex;
    case 'multi':
      return [...q.correctIndices];
    case 'numeric':
      return q.answerDisplay;
    case 'blanks':
      return q.blanks.map((b) => b.correctIndex);
  }
}
function wrongResponse(q) {
  switch (q.kind) {
    case 'mcq':
      return (q.correctIndex + 1) % q.options.length;
    case 'multi': {
      const w = q.options.map((_, i) => i).find((i) => !q.correctIndices.includes(i));
      return w === undefined ? q.correctIndices.slice(1) : [...q.correctIndices.slice(1), w];
    }
    case 'numeric':
      return String(q.answer + 7);
    case 'blanks':
      return q.blanks.map((b, i) => (i === 0 ? (b.correctIndex + 1) % 3 : b.correctIndex));
  }
}

const texts = (q) => {
  const out = [q.prompt, q.explanation ?? ''];
  if (q.options) out.push(...q.options);
  if (q.distractorNotes) out.push(...q.distractorNotes);
  if (q.blanks) for (const b of q.blanks) out.push(...b.options);
  if (q.blankNotes) out.push(...q.blankNotes);
  if (q.answerDisplay) out.push(q.answerDisplay);
  const s = q.stimulus;
  if (s?.passage) out.push(s.passage);
  if (s?.quantities) out.push(s.quantities.a, s.quantities.b);
  if (s?.table) out.push(...s.table.columns, ...s.table.rows.flat());
  return out;
};

function checkQuestion(q, sec) {
  const w = q.id;
  if (!q.prompt) fail(`${w}: empty prompt`);
  if (![1, 2, 3].includes(q.difficulty)) fail(`${w}: difficulty ${q.difficulty}`);
  if (!q.explanation || q.explanation.length < 40) fail(`${w}: explanation missing or too thin`);
  if (!lessonIds.has(q.lessonId)) fail(`${w}: unknown lessonId ${q.lessonId}`);
  for (const t of texts(q)) if (typeof t !== 'string' || BAD_TEXT.test(t)) fail(`${w}: broken text → ${String(t).slice(0, 80)}`);
  const allowed = sec.measure === 'verbal' ? VERBAL_FORMATS : QUANT_FORMATS;
  if (!allowed.has(q.format)) fail(`${w}: format ${q.format} in a ${sec.measure} section`);

  const n = q.options?.length;
  switch (q.format) {
    case 'tc':
      if (q.kind === 'mcq') {
        if (n !== 5) fail(`${w}: 1-blank TC needs 5 options`);
        if ((q.prompt.match(/_{3,}/g) ?? []).length !== 1) fail(`${w}: 1-blank TC must show exactly one blank`);
      } else if (q.kind === 'blanks') {
        if (q.blanks.length < 2 || q.blanks.length > 3) fail(`${w}: ${q.blanks.length} blanks`);
        q.blanks.forEach((b, i) => {
          if (b.options.length !== 3 || new Set(b.options).size !== 3) fail(`${w}: blank ${i} needs 3 distinct options`);
        });
        const marks = (q.prompt.match(/\((i|ii|iii)\)_{3,}/g) ?? []).length;
        if (marks !== q.blanks.length) fail(`${w}: prompt shows ${marks} blanks, data has ${q.blanks.length}`);
      } else fail(`${w}: TC must be mcq or blanks`);
      break;
    case 'se':
      if (q.kind !== 'multi' || n !== 6 || q.selectCount !== 2 || q.correctIndices.length !== 2) fail(`${w}: SE needs 6 options, exactly 2 correct`);
      if ((q.prompt.match(/_{3,}/g) ?? []).length !== 1) fail(`${w}: SE must show exactly one blank`);
      break;
    case 'rc':
    case 'cr':
      if (q.kind !== 'mcq' || n !== 5) fail(`${w}: reading select-one needs 5 options`);
      if (!q.stimulus?.passage) fail(`${w}: reading question without a passage`);
      break;
    case 'rc-multi':
      if (q.kind !== 'multi' || n !== 3 || q.selectCount) fail(`${w}: select-all reading needs 3 options, no fixed count`);
      if (!q.stimulus?.passage) fail(`${w}: reading question without a passage`);
      break;
    case 'rc-select':
      if (q.kind !== 'mcq' || n < 3) fail(`${w}: select-in-passage needs ≥3 sentences`);
      for (const s of q.options ?? []) if (!q.stimulus?.passage?.includes(s)) fail(`${w}: sentence not in passage → ${s.slice(0, 60)}`);
      break;
    case 'qc':
      if (q.kind !== 'mcq' || n !== 4 || !q.stimulus?.quantities) fail(`${w}: QC needs 4 fixed options and two quantities`);
      break;
    case 'ps':
      if (q.kind !== 'mcq' || n !== 5) fail(`${w}: select-one problem needs 5 options`);
      break;
    case 'ps-multi':
      if (q.kind !== 'multi' || n < 3 || n > 8 || q.selectCount) fail(`${w}: select-all problem needs 3–8 options`);
      if (!/Indicate all|Select all|all such/i.test(q.prompt)) fail(`${w}: select-all prompt should say so`);
      break;
    case 'ne':
      if (q.kind !== 'numeric') fail(`${w}: numeric entry must be kind numeric`);
      else {
        const [a, b] = q.answerDisplay.replace(/,/g, '').replace(/−/g, '-').split('/');
        const shown = b === undefined ? Number(a) : Number(a) / Number(b);
        const tol = q.roundTo ? q.roundTo / 2 + 1e-9 : 1e-9 * Math.max(1, Math.abs(q.answer));
        if (!(Math.abs(shown - q.answer) <= tol)) fail(`${w}: display ${q.answerDisplay} ≠ answer ${q.answer}`);
      }
      break;
  }
  if (q.options && new Set(q.options).size !== n) fail(`${w}: duplicate options`);
  if (q.kind === 'mcq' && !(q.correctIndex >= 0 && q.correctIndex < n)) fail(`${w}: correctIndex out of range`);
  if (q.kind === 'multi' && q.correctIndices.some((i) => i < 0 || i >= n)) fail(`${w}: correctIndices out of range`);
  if (q.distractorNotes && q.distractorNotes.length !== n) fail(`${w}: notes/options length mismatch`);

  // grading: keyed answer right, a wrong answer wrong, nothing entered wrong
  if (!G.isCorrect(q, keyedResponse(q))) fail(`${w}: keyed answer does not grade as correct`);
  if (G.isCorrect(q, wrongResponse(q))) fail(`${w}: a wrong answer grades as correct`);
  if (G.isCorrect(q, undefined)) fail(`${w}: blank answer grades as correct`);
  if (!G.isComplete(q, keyedResponse(q))) fail(`${w}: keyed answer counts as incomplete`);

  // stimulus sanity
  const s = q.stimulus ?? {};
  for (const c of s.charts ?? []) {
    if (!c.title || !c.categories?.length) fail(`${w}: chart missing title/categories`);
    for (const ser of c.series) if (ser.values.length !== c.categories.length) fail(`${w}: chart series ${ser.name} length mismatch`);
  }
  if (s.figure) {
    if (!/^<svg[\s>]/.test(s.figure.svg) || !s.figure.svg.endsWith('</svg>')) fail(`${w}: figure is not an svg`);
    if (/<script|on\w+=/i.test(s.figure.svg)) fail(`${w}: figure contains script`);
  }
  if (/figure above|\babove\b.*figure/i.test(q.prompt) && !s.figure) fail(`${w}: mentions a figure but has none`);
}

function checkLayout(sec, testNo) {
  const qs = sec.questions;
  const tag = `test ${testNo} ${sec.key}`;
  // groups contiguous, same stimulus
  const seen = new Set();
  for (let i = 0; i < qs.length; i++) {
    const gid = qs[i].group;
    if (!gid) continue;
    if (i > 0 && qs[i - 1].group === gid) {
      if (JSON.stringify(qs[i - 1].stimulus?.passage ?? null) !== JSON.stringify(qs[i].stimulus?.passage ?? null))
        fail(`${tag}: group ${gid} passage differs within the group`);
      continue;
    }
    if (seen.has(gid)) fail(`${tag}: group ${gid} is split`);
    seen.add(gid);
  }
  if (sec.measure === 'verbal') {
    const f = qs.map((q) => q.format);
    const firstNonTc = f.findIndex((x) => x !== 'tc');
    if (firstNonTc < 3) fail(`${tag}: should open with at least 3 text completions`);
    if (f.slice(firstNonTc).includes('tc')) fail(`${tag}: text completion after the opening block`);
    const seIdx = f.map((x, i) => (x === 'se' ? i : -1)).filter((i) => i >= 0);
    if (seIdx.length < 2 || seIdx.length > 4) fail(`${tag}: ${seIdx.length} sentence equivalence (expected 2–4)`);
    if (seIdx.length && seIdx[seIdx.length - 1] - seIdx[0] !== seIdx.length - 1) fail(`${tag}: SE questions not in one block`);
    const reading = f.filter((x) => x.startsWith('rc') || x === 'cr').length;
    if (reading < 5) fail(`${tag}: only ${reading} reading questions`);
  } else {
    const f = qs.map((q) => q.format);
    const want = QC_COUNT[sec.key];
    if (!f.slice(0, want).every((x) => x === 'qc')) fail(`${tag}: first ${want} questions must be QC`);
    if (f.slice(want).includes('qc')) fail(`${tag}: QC after the QC block`);
    const kinds = new Set(f);
    if (!kinds.has('ne')) fail(`${tag}: no numeric-entry question`);
    if (!kinds.has('ps-multi')) fail(`${tag}: no select-all problem`);
  }
}

const avg = (qs) => qs.reduce((a, q) => a + q.difficulty, 0) / qs.length;

// -------------------------------------------------------------------------------------
section('tests and sections');
const tests = T.TESTS;
if (tests.length < 5) fail(`only ${tests.length} tests — promised 5`);
const allIds = new Set();
const sigs = new Map();
const claims = new Set();
let total = 0;
for (const t of tests) {
  if (!t.essay?.claim || !t.essay?.task) fail(`${t.id}: essay prompt missing`);
  if (claims.has(t.essay.claim)) fail(`${t.id}: duplicate essay claim`);
  claims.add(t.essay.claim);
  const o = t.order.join(',');
  if (t.order.length !== 4 || new Set(t.order).size !== 4) fail(`${t.id}: order must contain each slot once`);
  if (t.order.indexOf('v1') > t.order.indexOf('v2') || t.order.indexOf('q1') > t.order.indexOf('q2')) fail(`${t.id}: order ${o} puts a second section first`);

  for (const [key, size] of Object.entries(SIZES)) {
    const sec = t.sections[key];
    if (!sec) {
      fail(`${t.id}: missing section ${key}`);
      continue;
    }
    if (sec.questions.length !== size) fail(`${t.id} ${key}: ${sec.questions.length} questions (expected ${size})`);
    if (sec.minutes !== MINUTES[key]) fail(`${t.id} ${key}: ${sec.minutes} minutes (expected ${MINUTES[key]})`);
    checkLayout(sec, t.number);
    for (const q of sec.questions) {
      if (allIds.has(q.id)) fail(`${q.id}: duplicate id`);
      allIds.add(q.id);
      if (!q.id.startsWith(`gre-pt${t.number}-${key}-`)) fail(`${q.id}: id doesn't match its section`);
      const sig = JSON.stringify([q.prompt, q.stimulus?.quantities ?? null, q.options ?? q.blanks ?? q.answer]);
      if (sigs.has(sig)) fail(`${q.id}: duplicates ${sigs.get(sig)}`);
      sigs.set(sig, q.id);
      checkQuestion(q, sec);
      total++;
    }
  }
  const [v1, v2e, v2h, q1, q2e, q2h] = ['v1', 'v2e', 'v2h', 'q1', 'q2e', 'q2h'].map((k) => avg(t.sections[k].questions));
  if (!(v2h > v1 && v1 > v2e)) fail(`${t.id}: verbal difficulty not ordered easier < first < harder (${v2e.toFixed(2)}, ${v1.toFixed(2)}, ${v2h.toFixed(2)})`);
  if (!(q2h > q1 && q1 > q2e)) fail(`${t.id}: quant difficulty not ordered easier < first < harder (${q2e.toFixed(2)}, ${q1.toFixed(2)}, ${q2h.toFixed(2)})`);
  console.log(
    `  ${t.id}: order ${o} · difficulty V ${v2e.toFixed(1)}/${v1.toFixed(1)}/${v2h.toFixed(1)} · Q ${q2e.toFixed(1)}/${q1.toFixed(1)}/${q2h.toFixed(1)} (easier/first/harder)`,
  );
}
console.log(`  ${total} questions across ${tests.length} tests`);

section('answer keys are spread out');
{
  const counts = [0, 0, 0, 0, 0];
  for (const t of tests)
    for (const sec of Object.values(t.sections))
      for (const q of sec.questions) if (q.kind === 'mcq' && q.options.length === 5 && q.format !== 'rc-select') counts[q.correctIndex]++;
  const n = counts.reduce((a, b) => a + b, 0);
  const share = counts.map((c) => c / n);
  console.log(`  5-choice keys A–E: ${counts.join(' / ')}`);
  if (share.some((s) => s > 0.4)) fail(`one answer letter holds over 40% of 5-choice keys`);
}

section('no collisions with the bank or lesson checks');
{
  const bank = await imp('content/courses/gre/bank/index.ts');
  for (const id of allIds) if (bank.isBankId(id)) fail(`${id} looks like a bank id`);
  for (const lid of lessonIds) {
    const f = path.join(lessonsDir, lid, 'questions.ts');
    if (!fs.existsSync(f)) continue;
    const mod = await import(pathToFileURL(f).href);
    for (const q of mod.QUESTIONS) if (allIds.has(q.id)) fail(`${q.id} collides with a lesson check`);
  }
  for (const id of allIds) if (T.TEST_QUESTION_BY_ID[id]?.id !== id) fail(`${id}: lookup does not round-trip`);
  console.log('  ok');
}

section('scoring model');
{
  for (const lvl of ['easier', 'harder']) {
    let prev = 0;
    const max = lvl === 'harder' ? 27 : 12 + 15;
    for (let r = 0; r <= max; r++) {
      const s = S.estimateScaled('verbal', lvl, r);
      if (s < 130 || s > 170) fail(`${lvl} ${r}: score ${s} out of range`);
      if (s < prev) fail(`${lvl}: score drops from ${prev} to ${s} at raw ${r}`);
      prev = s;
    }
  }
  if (S.estimateScaled('quant', 'harder', 27) !== 170) fail('a perfect harder-path score should be 170');
  if (S.estimateScaled('quant', 'easier', 0) !== 130) fail('zero right should be 130');
  if (S.routeLevel(S.ROUTE_THRESHOLD) !== 'harder' || S.routeLevel(S.ROUTE_THRESHOLD - 1) !== 'easier') fail('routing threshold off');
  // a perfect run through the harder path must score 170 end to end
  const t = tests[0];
  const responses = {};
  for (const k of ['v1', 'v2h', 'q1', 'q2h']) for (const q of t.sections[k].questions) responses[q.id] = keyedResponse(q);
  const res = T.scoreAttempt(t, { verbal: 'harder', quant: 'harder' }, responses, {}, '');
  if (res.verbal.scaled !== 170 || res.quant.scaled !== 170) fail(`perfect attempt scored V${res.verbal.scaled} Q${res.quant.scaled}`);
  console.log('  ok');
}

const pi = process.argv.indexOf('--print');
if (pi > 0) {
  const t = tests[Number(process.argv[pi + 1]) - 1];
  const sec = t.sections[process.argv[pi + 2] ?? 'v1'];
  section(`${t.title} · ${sec.key}`);
  let lastGroup;
  sec.questions.forEach((q, i) => {
    if (q.stimulus?.passage && q.group !== lastGroup) console.log(`\n  PASSAGE: ${q.stimulus.passage}\n`);
    lastGroup = q.group;
    console.log(`\n${i + 1}. [${q.format}, d${q.difficulty}] ${q.prompt}`);
    if (q.stimulus?.quantities) console.log(`   A: ${q.stimulus.quantities.a}   |   B: ${q.stimulus.quantities.b}`);
    q.options?.forEach((o, j) =>
      console.log(`   ${(q.correctIndex === j || q.correctIndices?.includes(j)) ? '*' : ' '} ${'ABCDEFGH'[j]}. ${o}`),
    );
    q.blanks?.forEach((b, j) => console.log(`   (${['i', 'ii', 'iii'][j]}) ${b.options.map((o, k) => (k === b.correctIndex ? `*${o}` : o)).join(' | ')}`));
    if (q.kind === 'numeric') console.log(`   answer: ${q.answerDisplay}`);
  });
}

console.log(failures === 0 ? `\n✓ practice tests: all ${total} questions valid` : `\n✗ practice tests: ${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
