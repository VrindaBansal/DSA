// Quantitative comparison — the GRE's signature question type. Three
// families:
//   qc-algebra   expressions under a constraint; the answer is DECIDED BY
//                TESTING the kinds of numbers the constraint allows
//                (integers, fractions, negatives, 0, 1), exactly the method
//                the lesson teaches — so a D answer always comes with a
//                concrete pair of counterexamples.
//   qc-numbers   no variables: compute or estimate, never D.
//   qc-concepts  word/geometry/number-property setups with classic traps.

import {
  type Generator,
  type QcAnswer,
  QC_LETTER,
  choose,
  fmt,
  frac,
  gcd,
  pick,
  qc,
  ri,
} from '../engine.ts';

// --- qc-algebra ----------------------------------------------------------------

interface Domain {
  text: string;
  xs: number[];
  /** true when √x and 1/x are safe. */
  positive?: boolean;
  nonzero?: boolean;
}

const DOMAINS: Domain[] = [
  { text: 'x > 0', xs: [0.1, 0.25, 0.5, 0.9, 1, 1.5, 2, 3, 10], positive: true, nonzero: true },
  { text: 'x < 0', xs: [-10, -3, -2, -1.5, -1, -0.5, -0.25, -0.1], nonzero: true },
  { text: '0 < x < 1', xs: [0.01, 0.1, 0.25, 0.5, 0.75, 0.9, 0.99], positive: true, nonzero: true },
  { text: 'x > 1', xs: [1.01, 1.5, 2, 3, 5, 10], positive: true, nonzero: true },
  { text: '−1 < x < 0', xs: [-0.99, -0.75, -0.5, -0.25, -0.01], nonzero: true },
  { text: 'x is a positive integer', xs: [1, 2, 3, 4, 5, 10], positive: true, nonzero: true },
  { text: 'x is a negative integer', xs: [-1, -2, -3, -4, -10], nonzero: true },
  { text: 'x < −1', xs: [-1.01, -1.5, -2, -3, -10], nonzero: true },
  { text: 'x ≠ 0', xs: [-10, -2, -1, -0.5, -0.1, 0.1, 0.5, 1, 2, 10], nonzero: true },
  { text: 'x is an integer greater than 1', xs: [2, 3, 4, 5, 10], positive: true, nonzero: true },
];

interface Pair {
  a: string;
  b: string;
  f: (x: number) => number;
  g: (x: number) => number;
  needsPositive?: boolean;
  needsNonzero?: boolean;
  insight: string;
}

const PAIRS: Pair[] = [
  { a: 'x', b: 'x²', f: (x) => x, g: (x) => x * x, insight: 'x² > x for x > 1 or x < 0; x² < x for 0 < x < 1; equal at 0 and 1.' },
  { a: 'x²', b: 'x³', f: (x) => x * x, g: (x) => x ** 3, insight: 'x³ > x² only when x > 1; for 0 < x < 1 cubing shrinks more; for negatives x³ is negative.' },
  { a: 'x', b: '1/x', f: (x) => x, g: (x) => 1 / x, needsNonzero: true, insight: 'x and 1/x are equal at 1 and −1; between −1 and 1 (except 0) the reciprocal is bigger in size.' },
  { a: 'x', b: '√x', f: (x) => x, g: (x) => Math.sqrt(x), needsPositive: true, insight: '√x > x for 0 < x < 1; √x < x for x > 1; equal at 1.' },
  { a: '2x', b: 'x²', f: (x) => 2 * x, g: (x) => x * x, insight: 'x² − 2x = x(x − 2): equal at 0 and 2, x² bigger outside [0, 2].' },
  { a: 'x²', b: '2x − 1', f: (x) => x * x, g: (x) => 2 * x - 1, insight: 'x² − (2x − 1) = (x − 1)² ≥ 0, with equality only at x = 1.' },
  { a: 'x³', b: 'x', f: (x) => x ** 3, g: (x) => x, insight: 'x³ − x = x(x − 1)(x + 1): sign changes at −1, 0, 1.' },
  { a: '−x', b: 'x²', f: (x) => -x, g: (x) => x * x, insight: 'x² + x = x(x + 1): negative only for −1 < x < 0.' },
  { a: '|x|', b: 'x', f: (x) => Math.abs(x), g: (x) => x, insight: '|x| = x when x ≥ 0 and |x| > x when x < 0.' },
  { a: 'x + 1/x', b: '2', f: (x) => x + 1 / x, g: () => 2, needsPositive: true, insight: 'For x > 0, x + 1/x ≥ 2 with equality only at x = 1.' },
  { a: 'x/2', b: 'x/3', f: (x) => x / 2, g: (x) => x / 3, insight: 'For positive x, x/2 > x/3; for negative x the inequality flips.' },
  { a: '3x', b: '2x', f: (x) => 3 * x, g: (x) => 2 * x, insight: '3x − 2x = x, so the sign of x decides.' },
  { a: '(x + 1)²', b: 'x² + 1', f: (x) => (x + 1) ** 2, g: (x) => x * x + 1, insight: '(x + 1)² − (x² + 1) = 2x, so the sign of x decides.' },
  { a: '1/x', b: '1/x²', f: (x) => 1 / x, g: (x) => 1 / (x * x), needsNonzero: true, insight: '1/x² is always positive; compare sizes: for x > 1, 1/x > 1/x².' },
  { a: 'x² − x', b: '0', f: (x) => x * x - x, g: () => 0, insight: 'x² − x = x(x − 1): negative only between 0 and 1.' },
  { a: 'x⁴', b: 'x²', f: (x) => x ** 4, g: (x) => x * x, insight: 'x⁴ − x² = x²(x² − 1): x⁴ bigger when |x| > 1, smaller when 0 < |x| < 1.' },
  { a: '2ˣ', b: 'x²', f: (x) => 2 ** x, g: (x) => x * x, insight: '2ˣ and x² cross at x = 2 and x = 4 (and once for a negative x); between 2 and 4, x² is larger.' },
  { a: 'x + 2', b: '2x + 1', f: (x) => x + 2, g: (x) => 2 * x + 1, insight: '(x + 2) − (2x + 1) = 1 − x: positive for x < 1, zero at 1.' },
  { a: '1 − x', b: 'x − 1', f: (x) => 1 - x, g: (x) => x - 1, insight: 'The two are opposites; they’re equal only at x = 1.' },
  { a: 'x²', b: '|x|', f: (x) => x * x, g: (x) => Math.abs(x), insight: 'x² > |x| when |x| > 1; x² < |x| when 0 < |x| < 1.' },
];

const decide = (diffs: number[]): QcAnswer => {
  const eps = 1e-9;
  if (diffs.every((d) => d > eps)) return 0;
  if (diffs.every((d) => d < -eps)) return 1;
  if (diffs.every((d) => Math.abs(d) <= eps)) return 2;
  return 3;
};

const qcAlgebra: Generator = {
  id: 'qc-algebra',
  track: 'quant',
  topic: 'QC: variables & constraints',
  lessonId: 'gre-quant-comparison',
  count: 170,
  variants: true,
  make(r) {
    const p = pick(r, PAIRS);
    const d = pick(r, DOMAINS);
    if (p.needsPositive && !d.positive) return null;
    if (p.needsNonzero && !d.nonzero) return null;
    const swap = r() < 0.5;
    const A = swap ? p.b : p.a;
    const B = swap ? p.a : p.b;
    const fa = swap ? p.g : p.f;
    const fb = swap ? p.f : p.g;
    const diffs = d.xs.map((x) => fa(x) - fb(x));
    const ans = decide(diffs);
    const show = (x: number) => `x = ${fmt(x)}: A = ${fmt(Number(fa(x).toFixed(4)))}, B = ${fmt(Number(fb(x).toFixed(4)))}`;
    let why: string;
    if (ans === 3) {
      const iA = diffs.findIndex((v) => v > 1e-9);
      const iB = diffs.findIndex((v) => v < -1e-9);
      const iC = diffs.findIndex((v) => Math.abs(v) <= 1e-9);
      const pair = [iA, iB, iC].filter((i) => i >= 0).slice(0, 2);
      why = `Two allowed values give different results:\n${pair.map((i) => `• ${show(d.xs[i])} (${diffs[i] > 1e-9 ? 'A greater' : diffs[i] < -1e-9 ? 'B greater' : 'equal'})`).join('\n')}\nDifferent outcomes → **D**.`;
    } else {
      const picks = [d.xs[0], d.xs[Math.floor(d.xs.length / 2)], d.xs[d.xs.length - 1]];
      why = `Test the extremes of what’s allowed — ${picks.map((x) => show(x)).join('; ')}. Every allowed value gives the same result → **${QC_LETTER[ans]}**.`;
    }
    const diff = ans === 3 ? 2 : d.xs.some((x) => !Number.isInteger(x)) ? 3 : 2;
    return {
      key: `${p.a}|${p.b}|${d.text}|${swap}`,
      q: qc({
        given: d.text,
        a: A,
        b: B,
        answer: ans,
        explanation: `${why}\nWhy: ${p.insight}\nMethod: with a constraint, try numbers from every "zone" it allows — an integer, a fraction, a negative, 0 or 1 if permitted. The moment two tests disagree, the answer is D.`,
        difficulty: diff as 2 | 3,
      }),
    };
  },
};

// --- qc-numbers -------------------------------------------------------------------

const qcNumbers: Generator = {
  id: 'qc-numbers',
  track: 'quant',
  topic: 'QC: numbers only',
  lessonId: 'gre-quant-comparison',
  count: 150,
  variants: true,
  make(r) {
    const style = ri(r, 0, 5);
    const ansOf = (a: number, b: number): QcAnswer => (Math.abs(a - b) < 1e-9 ? 2 : a > b ? 0 : 1);
    if (style === 0) {
      const d1 = ri(r, 3, 15);
      const d2 = ri(r, 3, 15);
      const n1 = ri(r, 1, d1 - 1);
      const n2 = ri(r, 1, d2 - 1);
      if (d1 === d2 || gcd(n1, d1) !== 1 || gcd(n2, d2) !== 1 || Math.abs(n1 / d1 - n2 / d2) < 0.005) return null;
      const ans = ansOf(n1 / d1, n2 / d2);
      return {
        key: `0:${n1}/${d1}:${n2}/${d2}`,
        q: qc({
          fixed: true,
          a: `${n1}/${d1}`,
          b: `${n2}/${d2}`,
          answer: ans,
          explanation: `Cross-multiply (both denominators are positive): compare ${n1} × ${d2} = ${n1 * d2} with ${n2} × ${d1} = ${n2 * d1}.\n${n1 * d2 > n2 * d1 ? `${n1 * d2} > ${n2 * d1}, so Quantity A is greater` : `${n1 * d2} < ${n2 * d1}, so Quantity B is greater`} → **${QC_LETTER[ans]}**.`,
          difficulty: 1,
        }),
      };
    }
    if (style === 1) {
      const [b1, e1, b2, e2] = pick(r, [
        [2, 10, 10, 3],
        [3, 5, 5, 3],
        [2, 7, 7, 2],
        [2, 20, 10, 6],
        [3, 4, 4, 3],
        [2, 5, 5, 2],
        [4, 5, 5, 4],
        [9, 5, 3, 10],
        [8, 4, 2, 12],
        [2, 30, 10, 9],
        [5, 6, 6, 5],
        [3, 10, 10, 5],
        [2, 9, 9, 2],
        [7, 3, 3, 7],
        [2, 8, 4, 4],
        [16, 3, 4, 6],
      ] as const);
      const va = b1 ** e1;
      const vb = b2 ** e2;
      const ans = ansOf(va, vb);
      const sup = (e: number) => String(e).split('').map((c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)]).join('');
      const swap = r() < 0.5;
      return {
        key: `1:${b1}^${e1}:${b2}^${e2}:${swap}`,
        q: qc({
          fixed: true,
          a: swap ? `${b2}${sup(e2)}` : `${b1}${sup(e1)}`,
          b: swap ? `${b1}${sup(e1)}` : `${b2}${sup(e2)}`,
          answer: swap ? (ans === 0 ? 1 : ans === 1 ? 0 : 2) : ans,
          explanation: `${b1}${sup(e1)} = ${fmt(va)} and ${b2}${sup(e2)} = ${fmt(vb)}.${va === vb ? ' They’re equal — rewrite both with the same base to see it without computing.' : ' When the numbers are big, rewrite with a common base or compare logs/benchmarks (2¹⁰ ≈ 10³).'}\nAnswer: **${QC_LETTER[swap ? (ans === 0 ? 1 : ans === 1 ? 0 : 2) : ans]}**.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 2) {
      const a = pick(r, [10, 12, 15, 20, 25, 30, 40, 45, 60, 75, 80]);
      const b = pick(r, [16, 24, 36, 48, 50, 64, 72, 90, 120, 150]);
      return {
        key: `2:${a}:${b}`,
        q: qc({
          fixed: true,
          a: `${a}% of ${b}`,
          b: `${b}% of ${a}`,
          answer: 2,
          explanation: `${a}% of ${b} = (${a} × ${b})/100 = ${fmt((a * b) / 100)}, and ${b}% of ${a} = (${b} × ${a})/100 — the same product.\nx% of y always equals y% of x → **C**. (Handy: 16% of 50 = 50% of 16 = 8.)`,
          difficulty: 2,
        }),
      };
    }
    if (style === 3) {
      const a = ri(r, 2, 50);
      const b = ri(r, 2, 50);
      if (Number.isInteger(Math.sqrt(a + b))) return null;
      return {
        key: `3:${Math.min(a, b)}:${Math.max(a, b)}`,
        q: qc({
          fixed: true,
          a: `√${a} + √${b}`,
          b: `√${a + b}`,
          answer: 0,
          explanation: `Square both (both positive, so squaring keeps the order): A² = ${a} + ${b} + 2√${a * b} = ${a + b} + 2√${a * b}; B² = ${a + b}.\nA² is bigger by 2√${a * b} > 0 → **A**. Roots don’t distribute over addition: √a + √b > √(a + b) for positive a, b.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 4) {
      const v = ri(r, 1, 9) / 10;
      const pw = ri(r, 2, 3);
      return {
        key: `4:${v}:${pw}`,
        q: qc({
          fixed: true,
          a: `(${fmt(v)})${pw === 2 ? '²' : '³'}`,
          b: fmt(v),
          answer: 1,
          explanation: `(${fmt(v)})${pw === 2 ? '²' : '³'} = ${fmt(Number((v ** pw).toFixed(4)))}. Raising a number between 0 and 1 to a power makes it SMALLER → **B**.`,
          difficulty: 1,
        }),
      };
    }
    const nums = Array.from({ length: ri(r, 5, 7) }, () => ri(r, 1, 30));
    const sorted = [...nums].sort((a, b) => a - b);
    const L = sorted.length;
    const mean = nums.reduce((a, b) => a + b, 0) / L;
    const median = L % 2 ? sorted[(L - 1) / 2] : (sorted[L / 2 - 1] + sorted[L / 2]) / 2;
    const ans = ansOf(mean, median);
    return {
      key: `5:${nums.join(',')}`,
      q: qc({
          fixed: true,
        given: `The list: ${nums.join(', ')}`,
        a: 'The average (arithmetic mean) of the list',
        b: 'The median of the list',
        answer: ans,
        explanation: `Mean = ${nums.reduce((a, b) => a + b, 0)} ÷ ${L} = ${fmt(Number(mean.toFixed(3)))}. Sorted: ${sorted.join(', ')} → median = ${fmt(median)}.\nSo **${QC_LETTER[ans]}**. (A few large values pull the mean above the median; small outliers pull it below.)`,
        difficulty: 1,
      }),
    };
  },
};

// --- qc-concepts -------------------------------------------------------------------

const qcConcepts: Generator = {
  id: 'qc-concepts',
  track: 'quant',
  topic: 'QC: classic traps',
  lessonId: 'gre-quant-comparison',
  count: 170,
  variants: true,
  make(r) {
    const style = ri(r, 0, 9);
    if (style === 0) {
      const k = pick(r, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144]);
      const root = Math.sqrt(k);
      return {
        key: `0:${k}`,
        q: qc({
          given: `x² = ${k}`,
          a: 'x',
          b: fmt(root),
          answer: 3,
          explanation: `x² = ${k} has TWO solutions: x = ${root} (equal to B) or x = −${root} (less than B). Different outcomes → **D**.\nThe trap is taking only the positive root. (If the question said x > 0, the answer would be C.)`,
          difficulty: 2,
        }),
      };
    }
    if (style === 1) {
      const k = ri(r, 2, 6);
      return {
        key: `1:${k}`,
        q: qc({
          given: `x³ = −${k ** 3}`,
          a: 'x',
          b: `−${k}`,
          answer: 2,
          explanation: `Odd powers keep the sign, so a cube root is unique: x = −${k} exactly → **C**. (Contrast: x² = ${k * k} would have two roots.)`,
          difficulty: 2,
        }),
      };
    }
    if (style === 2) {
      const s = ri(r, 6, 30);
      return {
        key: `2:${s}`,
        q: qc({
          given: `x and y are positive integers and x + y = ${s}.`,
          a: 'x',
          b: 'y',
          answer: 3,
          explanation: `Many pairs work: x = 1, y = ${s - 1} (B greater) or x = ${s - 1}, y = 1 (A greater)${s % 2 === 0 ? `, or x = y = ${s / 2} (equal)` : ''}. Nothing pins down which is larger → **D**.`,
          difficulty: 1,
        }),
      };
    }
    if (style === 3) {
      const avg = ri(r, 10, 60);
      const bigger = r() < 0.5;
      return {
        key: `3:${avg}:${bigger}`,
        q: qc({
          given: `The average of x and y is ${avg}, and x ${bigger ? '>' : '<'} ${avg}.`,
          a: 'y',
          b: `${avg}`,
          answer: bigger ? 1 : 0,
          explanation: `x + y = ${2 * avg}. If x is ${bigger ? 'above' : 'below'} ${avg} by some amount, y must be ${bigger ? 'below' : 'above'} ${avg} by the same amount to balance → y ${bigger ? '<' : '>'} ${avg} → **${bigger ? 'B' : 'A'}**.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 4) {
      const a = ri(r, 2, 15);
      const b = ri(r, a + 1, 20);
      const lo = b - a;
      const hi = a + b;
      const mode = pick(r, ['above', 'below', 'inside'] as const);
      const val = mode === 'above' ? hi + ri(r, 0, 3) : mode === 'below' ? Math.max(1, lo - ri(r, 0, 2)) : ri(r, lo + 1, hi - 1);
      const ans: QcAnswer = mode === 'above' ? 1 : mode === 'below' ? 0 : 3;
      return {
        key: `4:${a}:${b}:${val}`,
        q: qc({
          given: `Two sides of a triangle have lengths ${a} and ${b}.`,
          a: 'The length of the third side',
          b: fmt(val),
          answer: ans,
          explanation: `Triangle inequality: ${lo} < third side < ${hi}.\n${mode === 'above' ? `Every allowed length is below ${hi}, so it is less than ${val} → **B**.` : mode === 'below' ? `Every allowed length is above ${lo}, so it is greater than ${val} → **A**.` : `${val} sits inside (${lo}, ${hi}): the side could be ${lo + 0.5} (less) or ${hi - 0.5} (greater) → **D**.`}`,
          difficulty: 2,
        }),
      };
    }
    if (style === 5) {
      const p = pick(r, [10, 20, 25, 30, 40, 50]);
      const upFirst = r() < 0.5;
      return {
        key: `5:${p}:${upFirst}`,
        q: qc({
          given: `The price of an item is ${upFirst ? 'increased' : 'decreased'} by ${p}% and then the new price is ${upFirst ? 'decreased' : 'increased'} by ${p}%.`,
          a: 'The final price',
          b: 'The original price',
          answer: 1,
          explanation: `Multiply the factors: ${upFirst ? `${1 + p / 100} × ${1 - p / 100}` : `${1 - p / 100} × ${1 + p / 100}`} = ${fmt(1 - (p / 100) ** 2)} → the final price is ${fmt(100 * (1 - (p / 100) ** 2))}% of the original, a loss of ${fmt(p * p / 100)}% → **B**.\nOrder doesn’t matter: equal-percent up-and-down always lands BELOW the start.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 6) {
      const d = ri(r, 3, 12);
      const rem = ri(r, 1, d - 1);
      const k = ri(r, 2, 7);
      const actual = (k * rem) % d;
      const shown = pick(r, [actual, (actual + 1) % d, k * rem]);
      const ans: QcAnswer = actual === shown ? 2 : actual > shown ? 0 : 1;
      return {
        key: `6:${d}:${rem}:${k}:${shown}`,
        q: qc({
          given: `When the positive integer n is divided by ${d}, the remainder is ${rem}.`,
          a: `The remainder when ${k}n is divided by ${d}`,
          b: fmt(shown),
          answer: ans,
          explanation: `Test n = ${rem}: ${k}n = ${k * rem}, and ${k * rem} ÷ ${d} leaves remainder ${actual}. (Any n = ${d}q + ${rem} gives the same remainder.)\nA = ${actual}, B = ${shown} → **${QC_LETTER[ans]}**.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 7) {
      const N = ri(r, 5, 15);
      const k = ri(r, 1, N - 1);
      if (k * 2 === N) return null;
      return {
        key: `7:${N}:${k}`,
        q: qc({
          fixed: true,
          a: `The number of ways to choose ${k} people from ${N}`,
          b: `The number of ways to choose ${N - k} people from ${N}`,
          answer: 2,
          explanation: `Choosing ${k} to include is the same as choosing ${N - k} to leave out: C(${N}, ${k}) = C(${N}, ${N - k}) = ${fmt(choose(N, k))} → **C**.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 8) {
      const a = ri(r, 1, 9);
      const b = ri(r, a + 1, 15);
      const c = ri(r, 1, 6);
      return {
        key: `8:${a}:${b}:${c}`,
        q: qc({
          fixed: true,
          a: `${a}/${b}`,
          b: `${a + c}/${b + c}`,
          answer: 1,
          explanation: `Adding the same positive number to the top and bottom of a proper fraction moves it toward 1: ${a}/${b} ≈ ${(a / b).toFixed(3)}, ${a + c}/${b + c} ≈ ${((a + c) / (b + c)).toFixed(3)} → **B**.\n(Cross-multiply to prove it: ${a}(${b + c}) = ${a * (b + c)} < ${a + c}(${b}) = ${(a + c) * b}.)`,
          difficulty: 2,
        }),
      };
    }
    // circle vs number
    const rr = ri(r, 2, 12);
    const area = Math.PI * rr * rr;
    const off = pick(r, [-1, 1]);
    const cmp = Math.round(area) + off * ri(r, 1, 3);
    const ans: QcAnswer = area > cmp ? 0 : 1;
    return {
      key: `9:${rr}:${cmp}`,
      q: qc({
        given: `A circle has circumference ${2 * rr}π.`,
        a: 'The area of the circle',
        b: fmt(cmp),
        answer: ans,
        explanation: `Circumference 2πr = ${2 * rr}π → r = ${rr}. Area = π(${rr})² = ${rr * rr}π ≈ ${rr * rr} × 3.14159 ≈ ${area.toFixed(2)}.\nCompared with ${cmp} → **${QC_LETTER[ans]}**. Use π ≈ 3.14 when the comparison is close.`,
        difficulty: 2,
      }),
    };
  },
};

export const COMPARISONS: Generator[] = [qcAlgebra, qcNumbers, qcConcepts];

void frac;
