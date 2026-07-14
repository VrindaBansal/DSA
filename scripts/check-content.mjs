#!/usr/bin/env node
// Content integrity tests — run before any deploy (npm run test:content).
// Static checks over the MDX + TS content registries: every reference the
// app can follow must resolve, and every lesson must satisfy the spec's
// structural MUSTs (terminal cheatsheet, frontmatter, cheatsheet data).

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const lessonsDir = path.join(root, 'content', 'lessons');
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const section = (name) => console.log(`\n■ ${name}`);

const read = (p) => fs.readFileSync(p, 'utf8');

// --- gather ---------------------------------------------------------------
const lessonDirs = fs
  .readdirSync(lessonsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const moduleSlugs = [...read(path.join(root, 'lib', 'modules.ts')).matchAll(/slug: '([^']+)'/g)].map(
  (m) => m[1],
);

const questionFiles = [
  ...lessonDirs
    .map((d) => path.join(lessonsDir, d, 'questions.ts'))
    .filter(fs.existsSync),
  path.join(root, 'content', 'questions', 'anchor-questions.ts'),
];
const questionIds = [];
for (const f of questionFiles) {
  for (const m of read(f).matchAll(/^    id: '([^']+)',$/gm)) questionIds.push(m[1]);
}

const cheatsheetFiles = [
  ...lessonDirs
    .map((d) => path.join(lessonsDir, d, 'cheatsheet.ts'))
    .filter(fs.existsSync),
  path.join(root, 'content', 'module-cheatsheets.ts'),
];
const cheatsheetLessons = new Set();
for (const f of cheatsheetFiles) {
  for (const m of read(f).matchAll(/lessonId: '([^']+)'/g)) cheatsheetLessons.add(m[1]);
}

const visualRegistry = read(path.join(root, 'components', 'blocks', 'VisualBlock.tsx'));
const tradeoffIds = new Set(
  [...read(path.join(root, 'content', 'tradeoffs.ts')).matchAll(/^    id: '([^']+)',$/gm)].map((m) => m[1]),
);

// registration checks: every per-lesson bank must be imported in the index
const questionIndex = read(path.join(root, 'content', 'questions', 'index.ts'));
const cheatsheetIndex = read(path.join(root, 'content', 'cheatsheets.ts'));

// --- per-lesson checks ------------------------------------------------------
section('lesson frontmatter + structure');
const lessonIds = new Set();
const frontmatters = {};
for (const dir of lessonDirs) {
  const file = path.join(lessonsDir, dir, 'lesson.mdx');
  if (!fs.existsSync(file)) {
    fail(`${dir}: missing lesson.mdx`);
    continue;
  }
  const src = read(file);
  const fm = src.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) {
    fail(`${dir}: no frontmatter`);
    continue;
  }
  frontmatters[dir] = fm[1];
  const field = (k) => fm[1].match(new RegExp(`^${k}: (.+)$`, 'm'))?.[1];
  const id = field('id');
  lessonIds.add(id);
  if (id !== dir) fail(`${dir}: frontmatter id "${id}" ≠ directory name`);
  for (const k of ['module', 'title', 'order', 'estimatedMinutes']) {
    if (!field(k)) fail(`${dir}: missing frontmatter field "${k}"`);
  }
  if (!fm[1].includes('objectives:')) fail(`${dir}: no objectives`);
  if (!moduleSlugs.includes(field('module'))) fail(`${dir}: unknown module "${field('module')}"`);
  if (/^stub: true$/m.test(fm[1])) fail(`${dir}: still marked stub`);

  // Cheatsheet MUST be the terminal block (spec §5.1)
  const closeIdx = src.lastIndexOf('</Cheatsheet>');
  if (!src.includes('<Cheatsheet>')) fail(`${dir}: no <Cheatsheet> block`);
  else if (closeIdx === -1 || src.slice(closeIdx + '</Cheatsheet>'.length).trim() !== '')
    fail(`${dir}: <Cheatsheet> is not the last block`);

  // every lesson needs cheatsheet data for the standalone/print route
  if (!cheatsheetLessons.has(dir)) fail(`${dir}: no cheatsheet data registered`);

  // per-lesson question bank must be registered in the index
  if (fs.existsSync(path.join(lessonsDir, dir, 'questions.ts'))) {
    if (!questionIndex.includes(`lessons/${dir}/questions`))
      fail(`${dir}: questions.ts exists but is not imported in content/questions/index.ts`);
  }
}
console.log(`  ${lessonDirs.length} lessons checked`);

section('prerequisites resolve');
for (const [dir, fm] of Object.entries(frontmatters)) {
  const prereqs = fm.match(/^prerequisites: \[(.*)\]$/m)?.[1] ?? '';
  for (const p of prereqs.split(',').map((s) => s.trim()).filter(Boolean)) {
    if (!lessonIds.has(p)) fail(`${dir}: prerequisite "${p}" is not a lesson id`);
  }
}
console.log('  ok');

section('block references resolve (Check / Exercise / Visual / TradeoffTable)');
for (const dir of lessonDirs) {
  const src = read(path.join(lessonsDir, dir, 'lesson.mdx'));
  for (const m of src.matchAll(/<(Check|Exercise) id="([^"]+)"/g)) {
    if (!questionIds.includes(m[2])) fail(`${dir}: <${m[1]}> references unknown question "${m[2]}"`);
  }
  for (const m of src.matchAll(/<Visual id="([^"]+)"/g)) {
    if (!visualRegistry.includes(`'${m[1]}'`)) fail(`${dir}: unknown visual "${m[1]}"`);
  }
  for (const m of src.matchAll(/<TradeoffTable id="([^"]+)"/g)) {
    if (!tradeoffIds.has(m[1])) fail(`${dir}: unknown tradeoff table "${m[1]}"`);
  }
}
console.log('  ok');

section('question bank sanity');
const seen = new Set();
for (const id of questionIds) {
  if (seen.has(id)) fail(`duplicate question id "${id}"`);
  seen.add(id);
}
for (const f of questionFiles) {
  const src = read(f);
  // every mcq needs options + correctIndex; light structural probe
  const mcqCount = (src.match(/kind: 'mcq'/g) ?? []).length;
  const ciCount = (src.match(/correctIndex: \d/g) ?? []).length;
  const ccCount = (src.match(/complexityCheck: \{/g) ?? []).length;
  if (ciCount < mcqCount + ccCount)
    fail(`${path.relative(root, f)}: ${mcqCount} mcq + ${ccCount} complexityChecks but ${ciCount} correctIndex fields`);
  for (const m of src.matchAll(/lessonId: '([^']+)'/g)) {
    if (!lessonIds.has(m[1])) fail(`${path.relative(root, f)}: question for unknown lesson "${m[1]}"`);
  }
}
console.log(`  ${questionIds.length} questions, ids unique`);

section('every module has a lesson; cheatsheets registered');
const lessonModules = new Set(
  Object.values(frontmatters).map((fm) => fm.match(/^module: (.+)$/m)?.[1]),
);
for (const slug of moduleSlugs) {
  if (!lessonModules.has(slug)) fail(`module "${slug}" has no lessons`);
}
if (!cheatsheetIndex.includes('MODULE_CHEATSHEETS')) fail('module-cheatsheets not registered');
console.log('  ok');

// --- verdict ----------------------------------------------------------------
console.log(
  failures === 0
    ? `\n✓ content integrity: all checks passed`
    : `\n✗ content integrity: ${failures} failure(s)`,
);
process.exit(failures === 0 ? 0 : 1);
