#!/usr/bin/env node
// GRE practice-bank validation (npm run test:bank).
//
// The bank is generated, so it is tested like code: build every generator,
// then check every single question — structure, answer consistency, no
// broken text, no duplicates — plus the bank-level promises: 10,000+
// questions, and every question lands in exactly one practice set.
//
// Runs the TypeScript generators directly with Node's built-in type
// stripping (Node ≥ 22.18). Pass `--sample N` to print N random questions
// for a human read-through.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const bank = await import(pathToFileURL(path.join(root, 'content/courses/gre/bank/index.ts')).href);

let failures = 0;
const fail = (msg) => {
  failures++;
  if (failures <= 60) console.error(`  ✗ ${msg}`);
};
const section = (name) => console.log(`\n■ ${name}`);

// lesson ids that exist in the GRE course
const lessonsDir = path.join(root, 'content/courses/gre/lessons');
const lessonIds = new Set(
  fs.existsSync(lessonsDir)
    ? fs.readdirSync(lessonsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
    : [],
);

const parseNum = (raw) => {
  const s = String(raw).replace(/,/g, '').replace(/−/g, '-').replace(/\s+/g, '');
  const f = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (f) return Number(f[1]) / Number(f[2]);
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : NaN;
};

const BAD_TEXT = /undefined|NaN|Infinity|\[object|null\b|\$\{/;
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
  if (s?.table) out.push(...s.table.columns, ...s.table.rows.flat(), s.table.caption ?? '');
  return out;
};

function checkQuestion(q) {
  const where = q.id;
  if (!q.prompt || typeof q.prompt !== 'string') fail(`${where}: empty prompt`);
  if (![1, 2, 3].includes(q.difficulty)) fail(`${where}: difficulty ${q.difficulty}`);
  if (q.kind !== 'short' && (!q.explanation || q.explanation.length < 20)) fail(`${where}: missing/short explanation`);
  for (const t of texts(q)) if (typeof t !== 'string' || BAD_TEXT.test(t)) fail(`${where}: broken text → ${String(t).slice(0, 90)}`);
  if (lessonIds.size && !lessonIds.has(q.lessonId)) fail(`${where}: unknown lessonId "${q.lessonId}"`);
  switch (q.kind) {
    case 'mcq': {
      const n = q.options.length;
      const isQc = !!q.stimulus?.quantities;
      if (isQc ? n !== 4 : n !== 5) fail(`${where}: ${n} options (expected ${isQc ? 4 : 5})`);
      if (new Set(q.options).size !== n) fail(`${where}: duplicate options`);
      if (!(q.correctIndex >= 0 && q.correctIndex < n)) fail(`${where}: correctIndex out of range`);
      if (q.distractorNotes && q.distractorNotes.length !== n) fail(`${where}: notes/options length mismatch`);
      break;
    }
    case 'multi': {
      const n = q.options.length;
      if (n < 3 || n > 8) fail(`${where}: ${n} options`);
      if (new Set(q.options).size !== n) fail(`${where}: duplicate options`);
      const ci = q.correctIndices;
      if (!ci.length || new Set(ci).size !== ci.length || ci.some((i) => i < 0 || i >= n)) fail(`${where}: bad correctIndices`);
      if (q.selectCount && ci.length !== q.selectCount) fail(`${where}: selectCount ${q.selectCount} ≠ ${ci.length} correct`);
      if (q.distractorNotes && q.distractorNotes.length !== n) fail(`${where}: notes/options length mismatch`);
      break;
    }
    case 'numeric': {
      if (!Number.isFinite(q.answer)) fail(`${where}: non-finite answer`);
      const shown = parseNum(q.answerDisplay);
      if (!q.roundTo && !(Math.abs(shown - q.answer) <= 1e-6 * Math.max(1, Math.abs(q.answer))))
        fail(`${where}: answerDisplay "${q.answerDisplay}" ≠ answer ${q.answer}`);
      if (q.roundTo && !(Math.abs(shown - q.answer) <= q.roundTo / 2 + 1e-9))
        fail(`${where}: rounded display "${q.answerDisplay}" not within ${q.roundTo} of ${q.answer}`);
      break;
    }
    case 'blanks': {
      if (q.blanks.length < 2 || q.blanks.length > 3) fail(`${where}: ${q.blanks.length} blanks`);
      q.blanks.forEach((b, i) => {
        if (b.options.length !== 3 || new Set(b.options).size !== 3) fail(`${where}: blank ${i} needs 3 distinct options`);
        if (!(b.correctIndex >= 0 && b.correctIndex < 3)) fail(`${where}: blank ${i} correctIndex`);
      });
      const marks = (q.prompt.match(/\((i|ii|iii)\)_{3,}/g) ?? []).length;
      if (marks !== q.blanks.length) fail(`${where}: prompt shows ${marks} blanks, data has ${q.blanks.length}`);
      break;
    }
    case 'short':
      if (!q.rubric?.length || !q.modelAnswer) fail(`${where}: short answer needs rubric + model answer`);
      break;
    default:
      fail(`${where}: unexpected kind ${q.kind}`);
  }
}

// --- build + check every generator --------------------------------------------------
section('build every generator');
const t0 = Date.now();
const all = [];
const perTrack = { quant: 0, verbal: 0 };
for (const g of bank.GENERATORS) {
  const tg = Date.now();
  const qs = bank.questionsFor(g.id);
  const ms = Date.now() - tg;
  if (qs.length !== g.count) fail(`${g.id}: produced ${qs.length} unique questions, declares ${g.count}`);
  if (ms > 1500) fail(`${g.id}: took ${ms}ms to build`);
  perTrack[g.track] += qs.length;
  for (const q of qs) {
    checkQuestion(q);
    all.push(q);
  }
}
console.log(`  ${bank.GENERATORS.length} generators → ${all.length} questions in ${Date.now() - t0}ms`);
console.log(`  quant ${perTrack.quant} · verbal ${perTrack.verbal}`);

section('bank-level promises');
if (all.length < 10000) fail(`bank has ${all.length} questions — promised 10,000+`);
if (all.length !== bank.BANK_TOTAL) fail(`BANK_TOTAL ${bank.BANK_TOTAL} ≠ built ${all.length}`);
const ids = new Set();
for (const q of all) {
  if (ids.has(q.id)) fail(`duplicate id ${q.id}`);
  ids.add(q.id);
  if (bank.getBankQuestion(q.id) !== q) fail(`${q.id}: getBankQuestion does not round-trip`);
}
const sig = new Map();
for (const q of all) {
  const s = JSON.stringify([q.prompt, q.stimulus ?? null, q.options ?? q.blanks ?? q.answer]);
  if (sig.has(s)) fail(`duplicate content: ${q.id} = ${sig.get(s)}`);
  else sig.set(s, q.id);
}
console.log(`  ${all.length} ids unique · ${sig.size} distinct questions`);

section('practice sets partition the bank');
const inSets = new Map();
for (const track of ['quant', 'verbal']) {
  const sets = bank.setsFor(track);
  let min = Infinity;
  let max = 0;
  for (const s of sets) {
    const qids = bank.setQuestionIds(s.id);
    min = Math.min(min, qids.length);
    max = Math.max(max, qids.length);
    for (const id of qids) {
      if (inSets.has(id)) fail(`${id} in both ${inSets.get(id)} and ${s.id}`);
      inSets.set(id, s.id);
      if (!ids.has(id)) fail(`${s.id} references unknown ${id}`);
    }
  }
  if (min < 10 || max > 40) fail(`${track} set sizes out of range: ${min}–${max}`);
  console.log(`  ${track}: ${sets.length} sets, ${min}–${max} questions each`);
}
for (const id of ids) if (!inSets.has(id)) fail(`${id} is not in any set`);

section('GRE lesson checks (hand-written)');
{
  let n = 0;
  const seenIds = new Set(ids);
  for (const lid of lessonIds) {
    const f = path.join(lessonsDir, lid, 'questions.ts');
    if (!fs.existsSync(f)) continue;
    const mod = await import(pathToFileURL(f).href);
    for (const q of mod.QUESTIONS) {
      if (q.lessonId !== lid) fail(`${q.id}: lessonId ${q.lessonId} but lives in ${lid}`);
      if (seenIds.has(q.id)) fail(`${q.id}: duplicate id`);
      seenIds.add(q.id);
      checkQuestion(q);
      n++;
    }
  }
  console.log(`  ${n} lesson checks valid`);
}

section('review variants');
let variantChecks = 0;
for (const g of bank.GENERATORS.filter((x) => x.variants)) {
  const id = `gre.${g.id}.0`;
  const v = bank.bankVariant(id, 3);
  if (!v) fail(`${g.id}: no variant`);
  else if (v.difficulty !== bank.getBankQuestion(id).difficulty) fail(`${g.id}: variant changed difficulty`);
  variantChecks++;
}
console.log(`  ${variantChecks} generators serve fresh variants`);

section('vocab flashcards');
{
  const deckMod = await import(pathToFileURL(path.join(root, 'content/courses/gre/flashcards.ts')).href);
  const clusters = await import(pathToFileURL(path.join(root, 'content/courses/gre/bank/verbal/clusters.ts')).href);
  const fcLib = await import(pathToFileURL(path.join(root, 'lib/flashcards.ts')).href);
  const { cards, families } = deckMod.buildDeck();
  const famIds = new Set(families.map((f) => f.id));
  const words = new Set(cards.map((c) => c.w));
  if (cards.length !== clusters.WORD_COUNT) fail(`flashcards: ${cards.length} cards for ${clusters.WORD_COUNT} words`);
  if (words.size !== cards.length) fail('flashcards: duplicate words');
  for (const f of families) {
    if (f.opposite && !famIds.has(f.opposite)) fail(`flashcards: ${f.id} opposite missing`);
    for (const w of f.words) if (!words.has(w)) fail(`flashcards: ${f.id} lists ${w} without a card`);
  }
  for (const c of cards) {
    const where = `flashcard ${c.w}`;
    if (!famIds.has(c.fam)) fail(`${where}: unknown family ${c.fam}`);
    if (!c.def || c.def.length < 3) fail(`${where}: missing definition`);
    if ((c.ex.match(/\*\*/g) ?? []).length !== 2 || !c.ex.includes(`**${c.w}**`)) fail(`${where}: example doesn't bold the word once`);
    if (c.ex.includes('___')) fail(`${where}: example still has a blank`);
    if (!/\[[^\]]+\]/.test(c.ex)) fail(`${where}: example has no [clue]`);
    if (/\[[^\]]*\*\*/.test(c.ex)) fail(`${where}: word sits inside the clue`);
    if (/\b[Aa] \*\*[aeio]/.test(c.ex) || /\b[Aa]n \*\*[^aeiouAEIOU]/.test(c.ex)) fail(`${where}: a/an mismatch → ${c.ex}`);
    if (BAD_TEXT.test(c.ex) || BAD_TEXT.test(c.def)) fail(`${where}: broken text`);
  }
  // scheduling: the Leitner boxes behave as the page promises
  const t0 = Date.UTC(2026, 0, 5, 12);
  let p = fcLib.gradeCard(undefined, true, t0);
  if (p.box !== 2 || p.due !== t0 + fcLib.DAY_MS) fail('flashcards: a known new word should land in box 2, due tomorrow');
  for (let i = 0; i < 2; i++) p = fcLib.gradeCard(p, true, t0);
  if (p.box !== 4 || fcLib.cardStatus(p) !== 'mastered') fail('flashcards: box 4 should count as mastered');
  p = fcLib.gradeCard(p, false, t0);
  if (p.box !== 1 || p.due !== t0 || !fcLib.isTricky(p) || fcLib.cardStatus(p) !== 'learning') fail('flashcards: a miss should drop to box 1, due now');
  if (p.first !== t0) fail('flashcards: first-studied time should stick');
  const days = ['2026-01-02', '2026-01-03', '2026-01-04'];
  if (fcLib.streak(days, new Date(2026, 0, 4, 9)) !== 3) fail('flashcards: streak through today');
  if (fcLib.streak(days, new Date(2026, 0, 5, 9)) !== 3) fail('flashcards: streak survives until you study today');
  if (fcLib.streak(days, new Date(2026, 0, 6, 9)) !== 0) fail('flashcards: a missed day breaks the streak');
  // daily mini sets
  const all = cards.map((c) => c.w);
  const day = '2026-01-05';
  const plan0 = fcLib.buildDailyPlan({ words: all, progress: {}, flagged: {}, newLeft: 20, day, now: t0 });
  if (plan0.sets.length !== 2 || plan0.sets.some((st) => st.words.length !== 10 || st.kinds.new !== 10))
    fail(`daily plan for a new learner: ${plan0.sets.map((st) => st.words.length).join(',')}`);
  const prog = {};
  all.slice(0, 15).forEach((w) => (prog[w] = { box: 2, due: t0 - 1, seen: 1, right: 1, wrong: 0, last: t0 - fcLib.DAY_MS }));
  all.slice(15, 20).forEach((w) => (prog[w] = { box: 2, due: t0 + 9 * fcLib.DAY_MS, seen: 2, right: 1, wrong: 1, last: t0, lastMiss: t0 }));
  const flags = Object.fromEntries(all.slice(20, 23).map((w, i) => [w, t0 + i]));
  const plan1 = fcLib.buildDailyPlan({ words: all, progress: prog, flagged: flags, newLeft: 20, day, now: t0 });
  const dealt = plan1.sets.flatMap((st) => st.words);
  const kinds = plan1.sets.reduce((k, st) => (Object.keys(k).forEach((x) => (k[x] += st.kinds[x])), k), { due: 0, flagged: 0, missed: 0, new: 0 });
  if (plan1.sets.length !== 3 || dealt.length !== 30 || new Set(dealt).size !== 30) fail(`daily plan size: ${plan1.sets.map((st) => st.words.length)}`);
  if (kinds.due !== 15 || kinds.flagged !== 3 || kinds.new !== 10 || kinds.missed !== 2)
    fail(`daily plan priorities (due → flagged → missed, a set of new kept): ${JSON.stringify(kinds)}`);
  if (plan1.sets.some((st) => !st.kinds.new || st.kinds.new === st.words.length)) fail('daily sets should each mix review and new words');
  const extra = fcLib.buildDailyPlan({ words: all, progress: prog, flagged: flags, newLeft: 10, minNew: 0, day, now: t0, exclude: new Set(dealt), maxSets: 1 });
  if (extra.sets.length !== 1 || extra.sets[0].kinds.missed !== 3 || extra.sets[0].words.some((w) => dealt.includes(w)))
    fail(`an extra set should take the leftover review first: ${JSON.stringify(extra.sets[0]?.kinds)}`);
  // master-set shuffle: a fresh order each time, weighted toward missed and flagged words
  let frontFirst = 0;
  for (let i = 0; i < 4000; i++) if (fcLib.weightedShuffle(['heavy', 'light'], (x) => (x === 'heavy' ? 3 : 1))[0] === 'heavy') frontFirst++;
  if (frontFirst / 4000 < 0.7 || frontFirst / 4000 > 0.8) fail(`weighted shuffle bias ${frontFirst / 4000} (expected ≈ 0.75)`);
  const order = fcLib.weightedShuffle(all, () => 1);
  if (new Set(order).size !== all.length) fail('weighted shuffle lost or duplicated words');
  if (fcLib.masterWeight(prog[all[15]], true) <= fcLib.masterWeight(undefined, false)) fail('missed + flagged words should weigh more');
  console.log(`  ${cards.length} cards in ${families.length} families · examples, links, scheduling, daily sets and shuffle ok`);
}

const sampleArg = process.argv.indexOf('--sample');
if (sampleArg > 0) {
  const n = Number(process.argv[sampleArg + 1] ?? 10);
  const filter = process.argv[sampleArg + 2];
  const pool = filter ? all.filter((q) => q.id.includes(filter)) : all;
  section(`${n} sample questions${filter ? ` matching "${filter}"` : ''}`);
  for (let i = 0; i < n && pool.length; i++) {
    const q = pool[Math.floor(Math.random() * pool.length)];
    console.log(`\n[${q.id}] (${q.kind}, d${q.difficulty})`);
    if (q.stimulus?.passage) console.log(`PASSAGE: ${q.stimulus.passage.slice(0, 400)}…`);
    if (q.stimulus?.table) console.log(`TABLE: ${JSON.stringify(q.stimulus.table)}`);
    if (q.stimulus?.quantities) console.log(`A: ${q.stimulus.quantities.a} | B: ${q.stimulus.quantities.b}`);
    console.log(q.prompt);
    if (q.options) q.options.forEach((o, j) => console.log(`  ${(q.correctIndex === j || q.correctIndices?.includes(j)) ? '*' : ' '} ${'ABCDEFGH'[j]}. ${o}${q.distractorNotes ? `   — ${q.distractorNotes[j]}` : ''}`));
    if (q.blanks) q.blanks.forEach((b, j) => console.log(`  (${['i', 'ii', 'iii'][j]}) ${b.options.map((o, k) => (k === b.correctIndex ? `*${o}` : o)).join(' | ')}`));
    if (q.kind === 'numeric') console.log(`  answer: ${q.answerDisplay}`);
    console.log(`  EXPLANATION: ${q.explanation}`);
    if (q.blankNotes) console.log(`  NOTES: ${q.blankNotes.join(' / ')}`);
  }
}

console.log(
  failures === 0
    ? `\n✓ GRE bank: all ${all.length} questions valid`
    : `\n✗ GRE bank: ${failures} failure(s)`,
);
process.exit(failures === 0 ? 0 : 1);
