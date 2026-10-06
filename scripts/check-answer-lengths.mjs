#!/usr/bin/env node
// Answer-choice fairness (npm run test:lengths).
//
// A multiple-choice question gives itself away when the right answer is the
// longest one, or when it is nearly always in the same position. Writers tend to qualify the true statement carefully and
// dash off the wrong ones, so "pick the longest" becomes a strategy that
// beats the content. This check reads every choice set in every course and
// holds them to one standard.
//
// Every set whose options are worded (the longest is 20+ characters) must
// pass these rules:
//   1. The correct answer is at most 10% longer than the longest wrong answer
//      (a few characters of slack for short options). With several correct
//      answers, the average correct one is at most 10% longer than the
//      average wrong one.
//   2. The options are about the same length: the shortest is at least 60%
//      of the longest, unless they differ by under a dozen characters.
// And across each course:
//   3. The correct answer is noticeably the longest (5%+ longer than every
//      wrong answer) no more often than chance would make it.
//   4. No letter is the right answer much more often than the others: the
//      most common position holds at most 12 points more than its fair share.
//
// Short options (numbers, "O(n)", single vocabulary words) are exempt: their
// length carries no hint. So are the four fixed quantitative-comparison
// choices, and practice-test "select the sentence" questions, whose options
// are the passage's own sentences, clicked in place rather than listed.
//
// Runs the TypeScript sources directly with Node's built-in type stripping.
// Pass --list to print every failing set.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const LIST = process.argv.includes('--list');

const WORDED = 20; // longest option at least this long → length could be a tell
const MAX_RATIO = 1.1; // rule 1
const MIN_SPREAD = 0.6; // rule 2
const SLACK = 4; // rule 1: a few characters never count as "longer"
const SPREAD_SLACK = 12; // rule 2: nor does a gap this small
const NOTICEABLY = 1.05; // rule 3: "noticeably the longest"
const QC = /^Quantity A is greater/;

const len = (s) => s.replace(/\*\*/g, '').length;

/** Every choice set in a value: { id, options, correct[] }. */
function collect(v, out, id) {
  if (Array.isArray(v)) return v.forEach((x) => collect(x, out, id));
  if (!v || typeof v !== 'object') return;
  const myId = v.id ?? id;
  if (Array.isArray(v.options) && (v.correctIndex !== undefined || v.correctIndices)) {
    if (!QC.test(v.options[0] ?? '') && v.format !== 'rc-select')
      out.push({ id: myId, options: v.options, correct: v.correctIndices ?? [v.correctIndex] });
  }
  for (const [k, x] of Object.entries(v)) if (k !== 'options' && x && typeof x === 'object') collect(x, out, myId);
}

// --- load every course ------------------------------------------------------
const groups = {}; // course label → choice sets
const add = (label, value) => collect(value, (groups[label] ??= []), undefined);

for (const course of fs.readdirSync(path.join(root, 'content/courses'))) {
  const lessonsDir = path.join(root, 'content/courses', course, 'lessons');
  if (fs.existsSync(lessonsDir))
    for (const l of fs.readdirSync(lessonsDir)) {
      const f = path.join('content/courses', course, 'lessons', l, 'questions.ts');
      if (fs.existsSync(path.join(root, f))) add(course === 'gre' ? 'gre lessons' : course, Object.values(await imp(f)));
    }
  const own = path.join('content/courses', course, 'questions.ts');
  // the GRE course file only re-exports its lessons' checks
  if (course !== 'gre' && fs.existsSync(path.join(root, own))) add(course, Object.values(await imp(own)));
}
add('dsa', Object.values(await imp('content/questions/anchor-questions.ts')));

const bank = await imp('content/courses/gre/bank/index.ts');
for (const g of bank.GENERATORS) add('gre bank', bank.questionsFor(g.id));
const tests = await imp('content/courses/gre/tests/index.ts');
for (const t of tests.TESTS) add('gre practice tests', Object.values(t.sections));

// --- check -------------------------------------------------------------------
let failures = 0;
const fail = (msg) => {
  failures++;
  if (LIST || failures <= 40) console.error(`  ✗ ${msg}`);
};

console.log('■ answer lengths and positions');
for (const [label, sets] of Object.entries(groups)) {
  let worded = 0;
  let single = 0;
  let longest = 0;
  let chance = 0;
  const at = [0, 0, 0, 0, 0, 0];
  for (const s of sets) {
    const lens = s.options.map(len);
    const right = s.correct.map((i) => lens[i]);
    const wrong = lens.filter((_, i) => !s.correct.includes(i));
    if (!wrong.length || Math.max(...lens) < WORDED) continue;
    worded++;
    const show = () => `${s.id}: ${lens.join('/')} (correct ${s.correct.map((i) => 'ABCDEFGHI'[i]).join('')})`;
    if (s.correct.length === 1) {
      single++;
      chance += 1 / lens.length;
      at[s.correct[0]]++;
      const top = Math.max(...wrong);
      if (right[0] > MAX_RATIO * top && right[0] - top >= SLACK) fail(`${show()} — the right answer is the longest by far`);
      if (right[0] >= NOTICEABLY * Math.max(...wrong)) longest++;
    } else {
      const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
      if (avg(right) > MAX_RATIO * avg(wrong) && avg(right) - avg(wrong) >= SLACK) fail(`${show()} — the right answers run longer than the wrong ones`);
    }
    const [lo, hi] = [Math.min(...lens), Math.max(...lens)];
    if (lo < MIN_SPREAD * hi && hi - lo >= SPREAD_SLACK) fail(`${show()} — options differ too much in length`);
  }
  const rate = single ? longest / single : 0;
  const expected = single ? chance / single : 0;
  if (single && rate > expected + 0.02)
    fail(`${label}: the right answer is noticeably the longest in ${Math.round(rate * 100)}% of questions (chance ≈ ${Math.round(expected * 100)}%)`);
  const top = single ? Math.max(...at) / single : 0;
  if (single && top > expected + 0.12)
    fail(`${label}: the right answer is ${'ABCDEF'[at.indexOf(Math.max(...at))]} in ${Math.round(top * 100)}% of questions (fair share ≈ ${Math.round(expected * 100)}%)`);
  console.log(
    `  ${label}: ${worded} worded sets; right answer noticeably longest in ${Math.round(rate * 100)}% (chance ≈ ${Math.round(expected * 100)}%); ` +
      `positions ${at.slice(0, 5).map((n, i) => `${'ABCDE'[i]} ${Math.round((100 * n) / (single || 1))}%`).join(' · ')}`,
  );
}

console.log(
  failures === 0
    ? '\n✓ answer choices: no question gives itself away by length or position'
    : `\n✗ answer choices: ${failures} failure(s)${LIST ? '' : ' (pass --list for all)'}`,
);
process.exit(failures === 0 ? 0 : 1);
