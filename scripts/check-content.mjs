#!/usr/bin/env node
// Content integrity tests — run before any deploy (npm run test:content).
// Static checks over the MDX + TS content registries across ALL courses:
// every reference the app can follow must resolve, and every lesson must
// satisfy the structural MUSTs (terminal cheatsheet, frontmatter, cheatsheet
// data, module belongs to the right course).

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const coursesDir = path.join(root, 'content', 'courses');
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};
const section = (name) => console.log(`\n■ ${name}`);
const read = (p) => fs.readFileSync(p, 'utf8');
const exists = fs.existsSync;

// --- discover courses + lessons --------------------------------------------
const courseIds = fs
  .readdirSync(coursesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

// lessons: [{ course, dir, path }]
const lessons = [];
for (const course of courseIds) {
  const ld = path.join(coursesDir, course, 'lessons');
  if (!exists(ld)) continue;
  for (const d of fs.readdirSync(ld, { withFileTypes: true })) {
    if (d.isDirectory() && exists(path.join(ld, d.name, 'lesson.mdx')))
      lessons.push({ course, dir: d.name, path: path.join(ld, d.name) });
  }
}

// module slug -> courseId, parsed in order from lib/modules.ts
const modulesSrc = read(path.join(root, 'lib', 'modules.ts'));
const moduleCourse = {};
{
  const re = /slug: '([^']+)',\s*\n\s*courseId: '([^']+)',/g;
  let m;
  while ((m = re.exec(modulesSrc))) moduleCourse[m[1]] = m[2];
}
const moduleSlugs = Object.keys(moduleCourse);

// question banks: per-lesson questions.ts + course-level questions.ts + anchors
const questionFiles = [
  ...lessons.map((l) => path.join(l.path, 'questions.ts')).filter(exists),
  ...courseIds.map((c) => path.join(coursesDir, c, 'questions.ts')).filter(exists),
  path.join(root, 'content', 'questions', 'anchor-questions.ts'),
].filter(exists);
const questionIds = [];
for (const f of questionFiles)
  for (const m of read(f).matchAll(/^    id: '([^']+)',$/gm)) questionIds.push(m[1]);

// cheatsheet lessonIds: per-lesson + dsa module-cheatsheets + course cheatsheets
const cheatsheetFiles = [
  ...lessons.map((l) => path.join(l.path, 'cheatsheet.ts')).filter(exists),
  path.join(coursesDir, 'dsa', 'module-cheatsheets.ts'),
  ...courseIds.map((c) => path.join(coursesDir, c, 'cheatsheets.ts')).filter(exists),
].filter(exists);
const cheatsheetLessons = new Set();
for (const f of cheatsheetFiles)
  for (const m of read(f).matchAll(/lessonId: '([^']+)'/g)) cheatsheetLessons.add(m[1]);

const visualRegistry = read(path.join(root, 'components', 'blocks', 'VisualBlock.tsx'));
const tradeoffIds = new Set();
for (const c of courseIds) {
  const tf = path.join(coursesDir, c, 'tradeoffs.ts');
  if (exists(tf)) for (const m of read(tf).matchAll(/^    id: '([^']+)',$/gm)) tradeoffIds.add(m[1]);
}

const questionIndex = read(path.join(root, 'content', 'questions', 'index.ts'));
const cheatsheetIndex = read(path.join(root, 'content', 'cheatsheets.ts'));
const tradeoffIndex = read(path.join(root, 'content', 'tradeoffs.ts'));

// --- per-lesson checks ------------------------------------------------------
section('lesson frontmatter + structure (all courses)');
const lessonIds = new Set();
const frontmatters = {}; // id -> { fm, course }
for (const l of lessons) {
  const src = read(path.join(l.path, 'lesson.mdx'));
  const fmMatch = src.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    fail(`${l.course}/${l.dir}: no frontmatter`);
    continue;
  }
  const fm = fmMatch[1];
  const field = (k) => fm.match(new RegExp(`^${k}: (.+)$`, 'm'))?.[1];
  const id = field('id');
  lessonIds.add(id);
  frontmatters[id] = { fm, course: l.course };
  if (id !== l.dir) fail(`${l.course}/${l.dir}: frontmatter id "${id}" ≠ directory name`);
  for (const k of ['module', 'title', 'order', 'estimatedMinutes']) {
    if (!field(k)) fail(`${l.course}/${l.dir}: missing frontmatter field "${k}"`);
  }
  if (!fm.includes('objectives:')) fail(`${l.course}/${l.dir}: no objectives`);
  const mod = field('module');
  if (!moduleSlugs.includes(mod)) fail(`${l.course}/${l.dir}: unknown module "${mod}"`);
  else if (moduleCourse[mod] !== l.course)
    fail(`${l.course}/${l.dir}: module "${mod}" belongs to course "${moduleCourse[mod]}", not "${l.course}"`);

  // Cheatsheet MUST be the terminal block
  const closeIdx = src.lastIndexOf('</Cheatsheet>');
  if (!src.includes('<Cheatsheet>')) fail(`${l.course}/${l.dir}: no <Cheatsheet> block`);
  else if (closeIdx === -1 || src.slice(closeIdx + '</Cheatsheet>'.length).trim() !== '')
    fail(`${l.course}/${l.dir}: <Cheatsheet> is not the last block`);

  // every lesson needs cheatsheet data for the standalone/print route
  if (!cheatsheetLessons.has(id)) fail(`${l.course}/${l.dir}: no cheatsheet data registered`);
}
console.log(`  ${lessons.length} lessons across ${courseIds.length} courses`);

section('prerequisites resolve');
for (const [id, { fm, course }] of Object.entries(frontmatters)) {
  const prereqs = fm.match(/^prerequisites: \[(.*)\]$/m)?.[1] ?? '';
  for (const p of prereqs.split(',').map((s) => s.trim()).filter(Boolean)) {
    if (!lessonIds.has(p)) fail(`${course}/${id}: prerequisite "${p}" is not a lesson id`);
  }
}
console.log('  ok');

section('block references resolve (Check / Exercise / Visual / TradeoffTable)');
for (const l of lessons) {
  const src = read(path.join(l.path, 'lesson.mdx'));
  for (const m of src.matchAll(/<(Check|Exercise) id="([^"]+)"/g))
    if (!questionIds.includes(m[2])) fail(`${l.course}/${l.dir}: <${m[1]}> → unknown question "${m[2]}"`);
  for (const m of src.matchAll(/<Visual id="([^"]+)"/g))
    if (!visualRegistry.includes(`'${m[1]}'`)) fail(`${l.course}/${l.dir}: unknown visual "${m[1]}"`);
  for (const m of src.matchAll(/<TradeoffTable id="([^"]+)"/g))
    if (!tradeoffIds.has(m[1])) fail(`${l.course}/${l.dir}: unknown tradeoff table "${m[1]}"`);
}
console.log('  ok');

section('problem sets resolve (leetcode)');
{
  const psFile = path.join(coursesDir, 'leetcode', 'problemsets.ts');
  if (!exists(psFile)) {
    console.log('  (none)');
  } else {
    const psSrc = read(psFile);
    const psLessons = new Set();
    const entryRe = /lessonId: '([^']+)',\s*\n\s*inApp: \[([^\]]*)\]/g;
    let m;
    while ((m = entryRe.exec(psSrc))) {
      const lid = m[1];
      psLessons.add(lid);
      if (!lessonIds.has(lid)) fail(`problemsets: lessonId "${lid}" is not a lesson`);
      for (const qm of m[2].matchAll(/'([^']+)'/g))
        if (!questionIds.includes(qm[1]))
          fail(`problemsets: inApp "${qm[1]}" is not a question id`);
    }
    for (const l of lessons) {
      const src = read(path.join(l.path, 'lesson.mdx'));
      for (const mm of src.matchAll(/<ProblemSet id="([^"]+)"/g))
        if (!psLessons.has(mm[1]))
          fail(`${l.course}/${l.dir}: <ProblemSet> → unknown set "${mm[1]}"`);
    }
    console.log(`  ${psLessons.size} problem sets, all inApp ids resolve`);
  }
}

section('question bank sanity');
const seen = new Set();
for (const id of questionIds) {
  if (seen.has(id)) fail(`duplicate question id "${id}"`);
  seen.add(id);
}
for (const f of questionFiles) {
  const src = read(f);
  const mcqCount = (src.match(/kind: 'mcq'/g) ?? []).length;
  const ciCount = (src.match(/correctIndex: \d/g) ?? []).length;
  const ccCount = (src.match(/complexityCheck: \{/g) ?? []).length;
  if (ciCount < mcqCount + ccCount)
    fail(`${path.relative(root, f)}: ${mcqCount} mcq + ${ccCount} complexityChecks but ${ciCount} correctIndex`);
  for (const m of src.matchAll(/lessonId: '([^']+)'/g))
    if (!lessonIds.has(m[1])) fail(`${path.relative(root, f)}: question for unknown lesson "${m[1]}"`);
}
console.log(`  ${questionIds.length} questions, ids unique`);

section('registries wired');
// every module has at least one lesson
const lessonModules = new Set(
  Object.values(frontmatters).map(({ fm }) => fm.match(/^module: (.+)$/m)?.[1]),
);
for (const slug of moduleSlugs)
  if (!lessonModules.has(slug)) fail(`module "${slug}" has no lessons`);
// course-level banks are imported into the global aggregators
for (const c of courseIds) {
  if (exists(path.join(coursesDir, c, 'questions.ts')) && !questionIndex.includes(`courses/${c}/questions`))
    fail(`course "${c}" questions.ts not imported in content/questions/index.ts`);
  if (exists(path.join(coursesDir, c, 'cheatsheets.ts')) && !cheatsheetIndex.includes(`courses/${c}/cheatsheets`))
    fail(`course "${c}" cheatsheets.ts not imported in content/cheatsheets.ts`);
  if (exists(path.join(coursesDir, c, 'tradeoffs.ts')) && !tradeoffIndex.includes(`courses/${c}/tradeoffs`))
    fail(`course "${c}" tradeoffs.ts not imported in content/tradeoffs.ts`);
}
console.log('  ok');

// --- verdict ----------------------------------------------------------------
console.log(
  failures === 0
    ? `\n✓ content integrity: all checks passed`
    : `\n✗ content integrity: ${failures} failure(s)`,
);
process.exit(failures === 0 ? 0 : 1);
