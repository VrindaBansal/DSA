// ---------------------------------------------------------------------------
// GRE practice-bank engine: seeded randomness, number formatting, and the
// question builders every generator uses.
//
// Everything here is DETERMINISTIC. A generator seeded with its own id always
// produces the same questions in the same order, so a question id like
// `gre.pct-change.37` names the same question in the browser, on the server,
// and in the validation script (scripts/check-gre-bank.mjs). Editing a
// generator re-rolls its questions, so treat generator ids as stable.
//
// Imports inside bank/ use explicit .ts extensions so Node can execute these
// files directly (type stripping) in the validation script.
// ---------------------------------------------------------------------------

import type {
  BlanksQuestion,
  McqQuestion,
  MultiQuestion,
  NumericQuestion,
  Stimulus,
} from '../../../../lib/types.ts';

export type Rng = () => number;

/** FNV-1a — string → 32-bit seed. */
export function hashStr(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 — tiny, fast, identical in every JS engine. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random integer in [lo, hi], inclusive. */
export const ri = (r: Rng, lo: number, hi: number): number =>
  lo + Math.floor(r() * (hi - lo + 1));

export const pick = <T>(r: Rng, arr: readonly T[]): T => arr[Math.floor(r() * arr.length)];

export function shuffle<T>(r: Rng, arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** k distinct items from arr. */
export const sample = <T>(r: Rng, arr: readonly T[], k: number): T[] => shuffle(r, arr).slice(0, k);

export const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
export const lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;

export const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
export const choose = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
};

export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};

/** Prime factorization as [prime, exponent] pairs. */
export function factorize(n: number): [number, number][] {
  const out: [number, number][] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

// --- formatting ---------------------------------------------------------------

const MINUS = '−';

/** 1234.5 → "1,234.5"; −3 → "−3". Float noise is rounded away. */
export function fmt(n: number): string {
  if (!Number.isFinite(n)) throw new Error(`fmt: non-finite ${n}`);
  const neg = n < 0 && Math.abs(n) > 1e-12;
  const x = Math.round(Math.abs(n) * 1e6) / 1e6;
  let s = x.toString();
  if (s.includes('e')) s = x.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
  const [int, dec] = s.split('.');
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (neg ? MINUS : '') + withCommas + (dec ? `.${dec}` : '');
}

/** Money: whole dollars stay whole, otherwise two decimals. */
export function money(n: number): string {
  const cents = Math.round(n * 100);
  if (cents % 100 === 0) return `$${fmt(cents / 100)}`;
  const s = (Math.abs(cents) / 100).toFixed(2);
  const [int, dec] = s.split('.');
  return `${n < 0 ? MINUS : ''}$${int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${dec}`;
}

/** Reduced fraction string: frac(6, 8) → "3/4", frac(8, 4) → "2". */
export function frac(n: number, d: number): string {
  if (d === 0) throw new Error('frac: zero denominator');
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return fmt(nn);
  return `${nn < 0 ? MINUS : ''}${Math.abs(nn)}/${dd}`;
}

const SUP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
};
/** Unicode superscript for integer exponents: sup(12) → "¹²". */
export const sup = (n: number): string => String(n).split('').map((c) => SUP[c] ?? c).join('');

/** "3x" / "−x" / "x" coefficient rendering for linear terms. */
export function term(coef: number, v: string, first = false): string {
  if (coef === 0) return '';
  const abs = Math.abs(coef);
  const body = abs === 1 ? v : `${abs}${v}`;
  if (first) return coef < 0 ? `${MINUS}${body}` : body;
  return coef < 0 ? ` ${MINUS} ${body}` : ` + ${body}`;
}
/** Constant term with sign: " + 5" / " − 5" / "". */
export const cterm = (c: number, first = false): string =>
  c === 0 ? (first ? '0' : '') : first ? fmt(c) : c < 0 ? ` ${MINUS} ${fmt(-c)}` : ` + ${fmt(c)}`;

export const ordinal = (n: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const NAMES = [
  'Ava', 'Ben', 'Carmen', 'Dev', 'Elena', 'Farid', 'Grace', 'Hiro', 'Imani', 'Jonah',
  'Kiara', 'Luis', 'Mei', 'Nora', 'Omar', 'Priya', 'Quinn', 'Rosa', 'Sam', 'Tariq',
  'Uma', 'Victor', 'Wen', 'Yara', 'Zane', 'Anika', 'Bruno', 'Chloe', 'Diego', 'Esme',
] as const;

// --- question builders --------------------------------------------------------

export interface Opt {
  text: string;
  /** Why this option is right, or why it's tempting and wrong. */
  note: string;
  /** Numeric value, when options should be listed in ascending order (GRE style). */
  value?: number;
}

/** A generated question before it gets its id/lessonId. */
export type Built =
  | Omit<McqQuestion, 'id' | 'lessonId'>
  | Omit<MultiQuestion, 'id' | 'lessonId'>
  | Omit<NumericQuestion, 'id' | 'lessonId'>
  | Omit<BlanksQuestion, 'id' | 'lessonId'>;

export interface Candidate {
  /** Identifies the CONTENT — two candidates with the same key are duplicates. */
  key: string;
  q: Built;
  /** Questions sharing a group (one reading passage) stay together in sets. */
  group?: string;
}

type Diff = 1 | 2 | 3;

/**
 * Five-choice multiple choice. Wrong options are de-duplicated against the
 * correct one and each other; returns null (the generator re-rolls) if fewer
 * than `nWrong` distinct distractors survive. Numeric choices are listed in
 * ascending order, as the GRE does; anything else is shuffled.
 */
export function mc(
  r: Rng,
  spec: {
    prompt: string;
    correct: Opt;
    wrong: Opt[];
    explanation: string;
    difficulty: Diff;
    stimulus?: Stimulus;
    nWrong?: number;
  },
): Built | null {
  const nWrong = spec.nWrong ?? 4;
  const seen = new Set([spec.correct.text]);
  const wrong: Opt[] = [];
  for (const w of spec.wrong) {
    if (seen.has(w.text)) continue;
    if (spec.correct.value !== undefined && w.value !== undefined && Math.abs(w.value - spec.correct.value) < 1e-9)
      continue;
    seen.add(w.text);
    wrong.push(w);
    if (wrong.length === nWrong) break;
  }
  if (wrong.length < nWrong) return null;
  let opts = [{ ...spec.correct, ok: true }, ...wrong.map((w) => ({ ...w, ok: false }))];
  if (opts.every((o) => o.value !== undefined)) {
    const vals = opts.map((o) => o.value!);
    if (new Set(vals.map((v) => v.toFixed(9))).size !== vals.length) return null;
    opts.sort((a, b) => a.value! - b.value!);
  } else opts = shuffle(r, opts);
  return {
    kind: 'mcq',
    prompt: spec.prompt,
    options: opts.map((o) => o.text),
    correctIndex: opts.findIndex((o) => o.ok),
    explanation: spec.explanation,
    distractorNotes: opts.map((o) => (o.ok ? `✓ ${o.note}` : o.note)),
    difficulty: spec.difficulty,
    ...(spec.stimulus ? { stimulus: spec.stimulus } : {}),
  };
}

export const QC_OPTIONS = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];
export type QcAnswer = 0 | 1 | 2 | 3;
export const QC_LETTER = ['A', 'B', 'C', 'D'];

/** Quantitative comparison: four fixed choices, never shuffled. */
export function qc(spec: {
  given?: string;
  a: string;
  b: string;
  answer: QcAnswer;
  explanation: string;
  difficulty: Diff;
  /** Optional per-choice notes; defaults are generated from the answer. */
  notes?: string[];
  /** No unknowns: both quantities are fixed numbers, so D is impossible. */
  fixed?: boolean;
}): Built {
  const def = [
    'Only right if A beats B for EVERY allowed value.',
    'Only right if B beats A for EVERY allowed value.',
    'Only right if they are equal for EVERY allowed value.',
    spec.fixed
      ? 'Never right here: with no unknowns, two fixed numbers always have a definite relationship.'
      : 'Only right if different allowed values give different relationships.',
  ];
  return {
    kind: 'mcq',
    prompt: spec.given || 'Compare Quantity A and Quantity B.',
    options: QC_OPTIONS,
    correctIndex: spec.answer,
    explanation: spec.explanation,
    distractorNotes: (spec.notes ?? def).map((n, i) => (i === spec.answer ? `✓ ${n}` : n)),
    difficulty: spec.difficulty,
    stimulus: { quantities: { a: spec.a, b: spec.b } },
  };
}

export function numeric(spec: {
  prompt: string;
  answer: number;
  display?: string;
  fraction?: boolean;
  roundTo?: number;
  prefix?: string;
  suffix?: string;
  explanation: string;
  difficulty: Diff;
  stimulus?: Stimulus;
}): Built {
  if (!Number.isFinite(spec.answer)) throw new Error('numeric: non-finite answer');
  return {
    kind: 'numeric',
    prompt: spec.prompt,
    answer: spec.answer,
    answerDisplay: spec.display ?? fmt(spec.answer),
    ...(spec.fraction ? { fraction: true } : {}),
    ...(spec.roundTo ? { roundTo: spec.roundTo } : {}),
    ...(spec.prefix ? { prefix: spec.prefix } : {}),
    ...(spec.suffix ? { suffix: spec.suffix } : {}),
    explanation: spec.explanation,
    difficulty: spec.difficulty,
    ...(spec.stimulus ? { stimulus: spec.stimulus } : {}),
  };
}

/** Select-one-or-more (or exactly `selectCount`). */
export function multi(
  r: Rng,
  spec: {
    prompt: string;
    options: (Opt & { correct: boolean })[];
    explanation: string;
    difficulty: Diff;
    selectCount?: number;
    stimulus?: Stimulus;
    keepOrder?: boolean;
  },
): Built | null {
  const texts = spec.options.map((o) => o.text);
  if (new Set(texts).size !== texts.length) return null;
  if (!spec.options.some((o) => o.correct)) return null;
  let opts = [...spec.options];
  if (!spec.keepOrder) {
    if (opts.every((o) => o.value !== undefined)) opts.sort((a, b) => a.value! - b.value!);
    else opts = shuffle(r, opts);
  }
  return {
    kind: 'multi',
    prompt: spec.prompt,
    options: opts.map((o) => o.text),
    correctIndices: opts.flatMap((o, i) => (o.correct ? [i] : [])),
    ...(spec.selectCount ? { selectCount: spec.selectCount } : {}),
    explanation: spec.explanation,
    distractorNotes: opts.map((o) => (o.correct ? `✓ ${o.note}` : `✗ ${o.note}`)),
    difficulty: spec.difficulty,
    ...(spec.stimulus ? { stimulus: spec.stimulus } : {}),
  };
}

/** Near-miss numeric distractors: correct ± a few, for when common errors collide. */
export function nearMisses(x: number, fmtFn: (n: number) => string, steps: number[] = [1, -1, 2, -2, 3, 5, -3, 10]): Opt[] {
  return steps.map((s) => ({
    text: fmtFn(x + s),
    value: x + s,
    note: 'An arithmetic slip away from the right value — recheck each step.',
  }));
}

// --- generator contract ---------------------------------------------------------

export type Track = 'quant' | 'verbal';

export interface Generator {
  /** Stable id — part of every question id it produces. */
  id: string;
  track: Track;
  /** Display name for topic drills, e.g. "Percent change". */
  topic: string;
  /** The lesson that teaches this skill (relearn links + review grouping). */
  lessonId: string;
  /** How many unique questions it contributes to the bank. */
  count: number;
  /** Random generators: one candidate per call (null = re-roll). */
  make?: (r: Rng) => Candidate | null;
  /** Authored generators (reading passages): the full, ordered list. */
  all?: () => Candidate[];
  /** Review may serve a fresh sibling instead of the same question. */
  variants?: boolean;
}
