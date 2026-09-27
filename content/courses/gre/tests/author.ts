// Authoring helpers for the practice tests. Each builder returns a draft
// question (no id); `section()` numbers them. Keeps the test files readable:
// one call per question, answer and explanation right next to it.

import type { Difficulty, Stimulus } from '../../../../lib/types.ts';
import type { SectionKey, TestQuestion, TestSection } from './types.ts';

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
export type Draft = DistributiveOmit<TestQuestion, 'id'>;
type D = Difficulty;

/** Lesson each question teaches back to (drives the by-topic breakdown). */
export const L = {
  tc: 'gre-tc-method',
  tcm: 'gre-tc-multi',
  se: 'gre-se-method',
  rc: 'gre-rc-method',
  cr: 'gre-rc-arguments',
  int: 'gre-integers',
  exp: 'gre-exponents-roots',
  frac: 'gre-fractions-decimals',
  pct: 'gre-percents',
  ratio: 'gre-ratios',
  rate: 'gre-rates-work',
  lin: 'gre-linear',
  quad: 'gre-quadratics',
  fn: 'gre-functions-sequences',
  tri: 'gre-lines-triangles',
  circ: 'gre-circles-polygons-solids',
  coord: 'gre-coordinate',
  stat: 'gre-statistics',
  prob: 'gre-counting-probability',
  data: 'gre-data-interpretation',
} as const;
type LessonKey = keyof typeof L;

const tick = (notes: string[] | undefined, correct: number[]) =>
  notes?.map((n, i) => (correct.includes(i) && !n.startsWith('✓') ? `✓ ${n}` : n));

// --- Verbal -------------------------------------------------------------------------

/**
 * Text completion. One column = one blank with five choices (the text shows
 * `_____`); two or three columns = three choices each, marked (i)_____ etc.
 */
export function tc(d: D, text: string, cols: [string[], number][], why: string, notes?: string[]): Draft {
  if (cols.length === 1) {
    const [options, correctIndex] = cols[0];
    return {
      kind: 'mcq',
      format: 'tc',
      lessonId: L.tc,
      difficulty: d,
      prompt: text,
      options,
      correctIndex,
      explanation: why,
      ...(notes ? { distractorNotes: tick(notes, [correctIndex]) } : {}),
    };
  }
  return {
    kind: 'blanks',
    format: 'tc',
    lessonId: L.tcm,
    difficulty: d,
    prompt: text,
    blanks: cols.map(([options, correctIndex]) => ({ options, correctIndex })),
    explanation: why,
    ...(notes ? { blankNotes: notes } : {}),
  };
}

/** Sentence equivalence: six choices, exactly two right. */
export function se(d: D, text: string, options: string[], answers: [number, number], why: string, notes?: string[]): Draft {
  return {
    kind: 'multi',
    format: 'se',
    lessonId: L.se,
    difficulty: d,
    prompt: text,
    options,
    correctIndices: answers,
    selectCount: 2,
    explanation: why,
    ...(notes ? { distractorNotes: tick(notes, answers) } : {}),
  };
}

/** Reading question, select one of five. */
export function rc(d: D, prompt: string, options: string[], answer: number, why: string, notes?: string[]): Draft {
  return {
    kind: 'mcq',
    format: 'rc',
    lessonId: L.rc,
    difficulty: d,
    prompt,
    options,
    correctIndex: answer,
    explanation: why,
    ...(notes ? { distractorNotes: tick(notes, [answer]) } : {}),
  };
}

/** Reading question, select one or more of three; credit only for exactly the right set. */
export function rcMulti(d: D, prompt: string, options: string[], answers: number[], why: string, notes?: string[]): Draft {
  return {
    kind: 'multi',
    format: 'rc-multi',
    lessonId: L.rc,
    difficulty: d,
    prompt,
    options,
    correctIndices: answers,
    explanation: why,
    ...(notes ? { distractorNotes: tick(notes, answers) } : {}),
  };
}

/**
 * Select-in-passage: the options are sentences copied exactly from the
 * passage; the test screen lets you click them in the passage itself.
 */
export function rcSelect(d: D, prompt: string, sentences: string[], answer: number, why: string): Draft {
  return {
    kind: 'mcq',
    format: 'rc-select',
    lessonId: L.rc,
    difficulty: d,
    prompt,
    options: sentences,
    correctIndex: answer,
    explanation: why,
  };
}

/** Attach a passage to its questions. */
export function passage(name: string, text: string, qs: Draft[]): Draft[] {
  return qs.map((q) => ({ ...q, group: name, stimulus: { ...(q.stimulus ?? {}), passage: text } }));
}

/** A one-paragraph argument with its critical-reasoning question. */
export function argument(name: string, text: string, q: Draft): Draft[] {
  return passage(name, text, [{ ...q, format: q.format === 'rc' ? 'cr' : q.format, lessonId: L.cr } as Draft]);
}

// --- Quant --------------------------------------------------------------------------

export const QC_OPTIONS = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];
export const QC_NO_INFO = 'Compare Quantity A and Quantity B.';
const QC_INDEX = { A: 0, B: 1, C: 2, D: 3 } as const;

/** Quantitative comparison. `given` is the information centered above the columns. */
export function qc(
  d: D,
  topic: LessonKey,
  spec: { given?: string; a: string; b: string; figure?: Stimulus['figure'] },
  answer: keyof typeof QC_INDEX,
  why: string,
): Draft {
  return {
    kind: 'mcq',
    format: 'qc',
    lessonId: L[topic],
    difficulty: d,
    prompt: spec.given || QC_NO_INFO,
    options: QC_OPTIONS,
    correctIndex: QC_INDEX[answer],
    explanation: why,
    stimulus: { quantities: { a: spec.a, b: spec.b }, ...(spec.figure ? { figure: spec.figure } : {}) },
  };
}

interface Extra {
  stimulus?: Stimulus;
  notes?: string[];
}

/** Problem solving, select one of five. */
export function ps(d: D, topic: LessonKey, prompt: string, options: string[], answer: number, why: string, x: Extra = {}): Draft {
  return {
    kind: 'mcq',
    format: 'ps',
    lessonId: L[topic],
    difficulty: d,
    prompt,
    options,
    correctIndex: answer,
    explanation: why,
    ...(x.notes ? { distractorNotes: tick(x.notes, [answer]) } : {}),
    ...(x.stimulus ? { stimulus: x.stimulus } : {}),
  };
}

/** Problem solving, select one or more. */
export function psMulti(
  d: D,
  topic: LessonKey,
  prompt: string,
  options: string[],
  answers: number[],
  why: string,
  x: Extra = {},
): Draft {
  return {
    kind: 'multi',
    format: 'ps-multi',
    lessonId: L[topic],
    difficulty: d,
    prompt,
    options,
    correctIndices: answers,
    explanation: why,
    ...(x.notes ? { distractorNotes: tick(x.notes, answers) } : {}),
    ...(x.stimulus ? { stimulus: x.stimulus } : {}),
  };
}

/** Numeric entry. `display` defaults to the answer; `fraction` gives the two-box entry. */
export function ne(
  d: D,
  topic: LessonKey,
  prompt: string,
  answer: number,
  why: string,
  x: {
    display?: string;
    fraction?: boolean;
    roundTo?: number;
    prefix?: string;
    suffix?: string;
    stimulus?: Stimulus;
  } = {},
): Draft {
  return {
    kind: 'numeric',
    format: 'ne',
    lessonId: L[topic],
    difficulty: d,
    prompt,
    answer,
    answerDisplay: x.display ?? String(answer),
    ...(x.fraction ? { fraction: true } : {}),
    ...(x.roundTo ? { roundTo: x.roundTo } : {}),
    ...(x.prefix ? { prefix: x.prefix } : {}),
    ...(x.suffix ? { suffix: x.suffix } : {}),
    explanation: why,
    ...(x.stimulus ? { stimulus: x.stimulus } : {}),
  };
}

/** A data-interpretation set: several questions on the same chart/table. */
export function dataSet(name: string, stimulus: Stimulus, qs: Draft[]): Draft[] {
  return qs.map((q) => ({ ...q, group: name, stimulus: { ...stimulus, ...(q.stimulus ?? {}) } }));
}

// --- Figures ------------------------------------------------------------------------
// Tiny SVG vocabulary for geometry figures. Coordinates are in a viewBox the
// caller picks; strokes use currentColor so figures follow the text color.

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
type P = [number, number];

export const g = {
  poly: (pts: P[], fill = 'none') =>
    `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${fill}" stroke="currentColor" stroke-width="1.6"/>`,
  path: (pts: P[]) =>
    `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
  line: (a: P, b: P, dashed = false) =>
    `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="currentColor" stroke-width="1.6"${dashed ? ' stroke-dasharray="5 4"' : ''}/>`,
  circle: (c: P, r: number, fill = 'none') =>
    `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="${fill}" stroke="currentColor" stroke-width="1.6"/>`,
  dot: (c: P) => `<circle cx="${c[0]}" cy="${c[1]}" r="2.8" fill="currentColor"/>`,
  /** Italic label (variables, vertex names); plain=true for numbers/units. */
  text: (at: P, s: string, anchor: 'start' | 'middle' | 'end' = 'middle', plain = false) =>
    `<text x="${at[0]}" y="${at[1]}" text-anchor="${anchor}" font-size="15" font-family="Georgia, serif"${plain ? '' : ' font-style="italic"'} fill="currentColor">${esc(s)}</text>`,
  /** Right-angle box at vertex v, with legs heading toward a and b. */
  right: (v: P, a: P, b: P, size = 11) => {
    const u = (p: P): P => {
      const dx = p[0] - v[0];
      const dy = p[1] - v[1];
      const len = Math.hypot(dx, dy);
      return [(dx / len) * size, (dy / len) * size];
    };
    const [ux, uy] = u(a);
    const [wx, wy] = u(b);
    const r = (n: number) => Math.round(n * 10) / 10;
    return `<polyline points="${r(v[0] + ux)},${r(v[1] + uy)} ${r(v[0] + ux + wx)},${r(v[1] + uy + wy)} ${r(v[0] + wx)},${r(v[1] + wy)}" fill="none" stroke="currentColor" stroke-width="1.2"/>`;
  },
  /** Coordinate axes through (ox, oy) spanning the box, with x/y labels. */
  axes: (o: P, w: number, h: number) =>
    `<line x1="${o[0] - w}" y1="${o[1]}" x2="${o[0] + w}" y2="${o[1]}" stroke="currentColor" stroke-width="1.2"/>` +
    `<line x1="${o[0]}" y1="${o[1] + h}" x2="${o[0]}" y2="${o[1] - h}" stroke="currentColor" stroke-width="1.2"/>` +
    `<text x="${o[0] + w - 2}" y="${o[1] + 16}" text-anchor="end" font-size="14" font-family="Georgia, serif" font-style="italic" fill="currentColor">x</text>` +
    `<text x="${o[0] + 8}" y="${o[1] - h + 12}" font-size="14" font-family="Georgia, serif" font-style="italic" fill="currentColor">y</text>` +
    `<text x="${o[0] - 6}" y="${o[1] + 16}" text-anchor="end" font-size="13" font-family="Georgia, serif" fill="currentColor">O</text>`,
};

export const NOT_TO_SCALE = 'Note: Figure not drawn to scale.';

export function fig(w: number, h: number, parts: string[], note?: string): NonNullable<Stimulus['figure']> {
  return {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img">${parts.join('')}</svg>`,
    ...(note ? { note } : {}),
  };
}

// --- Sections -----------------------------------------------------------------------

const MINUTES: Record<string, number> = { v1: 18, v2: 23, q1: 21, q2: 26 };
const LETTERS = 'ABCDEFGH';

// Deterministic shuffle so verbal answer keys land on every letter, as on the
// real test, while the source keeps the answer easy to find (authors may
// list it anywhere). Seeded by question id → stable across builds.
function seeded(id: string) {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function permutation(n: number, rand: () => number): number[] {
  const p = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return p; // p[newIndex] = oldIndex
}

/** Shuffle choices of verbal select-one / SE / multi-blank questions; remap "(A)"-style references. */
function shuffleChoices(q: TestQuestion): TestQuestion {
  const rand = seeded(q.id);
  if (q.kind === 'blanks') {
    return {
      ...q,
      blanks: q.blanks.map((b) => {
        const p = permutation(b.options.length, rand);
        return { options: p.map((i) => b.options[i]), correctIndex: p.indexOf(b.correctIndex) };
      }),
    };
  }
  const shufflable =
    (q.kind === 'mcq' && (q.format === 'tc' || q.format === 'rc' || q.format === 'cr')) ||
    (q.kind === 'multi' && q.format === 'se');
  if (!shufflable || (q.kind !== 'mcq' && q.kind !== 'multi')) return q;
  const p = permutation(q.options.length, rand);
  const newOf = (old: number) => p.indexOf(old);
  const relabel = (t: string) => t.replace(/\(([A-H])\)/g, (m, l: string) => {
    const old = LETTERS.indexOf(l);
    return old >= 0 && old < p.length ? `(${LETTERS[newOf(old)]})` : m;
  });
  const base = {
    options: p.map((i) => q.options[i]),
    explanation: relabel(q.explanation),
    ...(q.distractorNotes ? { distractorNotes: p.map((i) => relabel(q.distractorNotes![i])) } : {}),
  };
  return q.kind === 'mcq'
    ? { ...q, ...base, correctIndex: newOf(q.correctIndex) }
    : { ...q, ...base, correctIndices: q.correctIndices.map(newOf).sort((a, b) => a - b) };
}

/** Number the drafts into a section: ids like gre-pt1-v2h-07. */
export function section(testNo: number, key: SectionKey, drafts: (Draft | Draft[])[]): TestSection {
  const flat = drafts.flat();
  const measure = key.startsWith('v') ? 'verbal' : 'quant';
  const stage = key[1] === '1' ? 1 : 2;
  return {
    key,
    measure,
    stage,
    ...(stage === 2 ? { level: key.endsWith('h') ? ('harder' as const) : ('easier' as const) } : {}),
    minutes: MINUTES[`${key[0]}${stage}`],
    questions: flat.map((q, i) =>
      shuffleChoices({
        ...q,
        id: `gre-pt${testNo}-${key}-${String(i + 1).padStart(2, '0')}`,
        ...(q.group ? { group: `pt${testNo}.${key}.${q.group}` } : {}),
      } as TestQuestion),
    ),
  };
}
