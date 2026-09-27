// Algebra: linear equations & systems, inequalities, absolute value, word
// translation, ages, quadratics, identities, functions, custom symbols,
// sequences, variation.

import {
  type Generator,
  type Opt,
  NAMES,
  cterm,
  fmt,
  frac,
  gcd,
  lcm,
  mc,
  money,
  multi,
  nearMisses,
  numeric,
  pick,
  ri,
  sample,
  sup,
  term,
} from '../engine.ts';

const n = (x: number, note: string): Opt => ({ text: fmt(x), value: x, note });
const lin = (a: number, b: number, v = 'x') => `${term(a, v, true) || '0'}${cterm(b)}`;
const par = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));

// -----------------------------------------------------------------------------

const linSolve: Generator = {
  id: 'lin-solve',
  track: 'quant',
  topic: 'Linear equations',
  lessonId: 'gre-linear',
  count: 120,
  variants: true,
  make(r) {
    if (r() < 0.6) {
      const x = ri(r, -12, 12);
      const a = ri(r, -9, 9);
      const c = ri(r, -9, 9);
      const b = ri(r, -20, 20);
      if (a === c || a === 0 || c === 0) return null;
      const d = a * x + b - c * x;
      return {
        key: `0:${a}:${b}:${c}:${d}`,
        q: numeric({
          prompt: `If ${lin(a, b)} = ${lin(c, d)}, what is the value of x?`,
          answer: x,
          explanation: `Collect x-terms on one side and constants on the other:\n${term(a, 'x', true)}${term(-c, 'x')} = ${fmt(d)}${cterm(-b)}\n${term(a - c, 'x', true)} = ${fmt(d - b)}\nx = ${fmt(d - b)} ÷ ${par(a - c)} = **${fmt(x)}**.\nCheck: left side ${fmt(a * x + b)}, right side ${fmt(c * x + d)}.`,
          difficulty: 1,
        }),
      };
    }
    const [p, q] = sample(r, [2, 3, 4, 5, 6], 2);
    const L = lcm(p, q);
    const x = L * ri(r, -6, 8);
    const b = ri(r, -9, 9);
    // x/p + b = x/q + d
    const d = x / p + b - x / q;
    if (!Number.isInteger(d) || x === 0) return null;
    return {
      key: `1:${p}:${q}:${b}:${d}`,
      q: numeric({
        prompt: `If x/${p}${cterm(b)} = x/${q}${cterm(d)}, what is the value of x?`,
        answer: x,
        explanation: `Clear the fractions by multiplying every term by ${L} (the LCD):\n${L / p}x${cterm(L * b)} = ${L / q}x${cterm(L * d)}\n${term(L / p - L / q, 'x', true)} = ${fmt(L * d - L * b)}\nx = **${fmt(x)}**.`,
        difficulty: 2,
      }),
    };
  },
};

const linSystem: Generator = {
  id: 'lin-system',
  track: 'quant',
  topic: 'Systems of equations',
  lessonId: 'gre-linear',
  count: 120,
  variants: true,
  make(r) {
    if (r() < 0.45) {
      // symmetric coefficients: add or subtract to get x + y or x − y quickly
      const a = ri(r, 2, 9);
      const b = ri(r, 1, 9);
      if (a === b) return null;
      const x = ri(r, -8, 12);
      const y = ri(r, -8, 12);
      const e = a * x + b * y;
      const f = b * x + a * y;
      const wantSum = r() < 0.5;
      const ans = wantSum ? x + y : x - y;
      const q = mc(r, {
        prompt: `If ${lin(a, 0)}${term(b, 'y')} = ${fmt(e)} and ${lin(b, 0)}${term(a, 'y')} = ${fmt(f)}, what is the value of ${wantSum ? 'x + y' : 'x − y'}?`,
        correct: n(ans, wantSum ? 'Add the equations.' : 'Subtract the equations.'),
        wrong: [
          n(wantSum ? x - y : x + y, `That is ${wantSum ? 'x − y' : 'x + y'}.`),
          n(x, 'That is x alone.'),
          n(y, 'That is y alone.'),
          n(wantSum ? e + f : e - f, `Stopped before dividing by ${wantSum ? a + b : a - b}.`),
          ...nearMisses(ans, fmt, [1, -1, 2]),
        ],
        explanation: wantSum
          ? `No need to solve for x and y separately. ADD the equations: ${a + b}x + ${a + b}y = ${fmt(e + f)}, so x + y = ${fmt(e + f)} ÷ ${a + b} = **${fmt(ans)}**.`
          : `No need to solve separately. SUBTRACT the second from the first: ${a - b}x ${a - b >= 0 ? '−' : '+'} ${Math.abs(a - b)}y = ${fmt(e - f)}, i.e. ${a - b}(x − y) = ${fmt(e - f)}, so x − y = **${fmt(ans)}**.`,
        difficulty: 2,
      });
      return q && { key: `s:${a}:${b}:${e}:${f}:${wantSum}`, q };
    }
    const x = ri(r, -9, 9);
    const y = ri(r, -9, 9);
    const a = ri(r, 1, 6);
    const b = ri(r, -6, 6);
    const c = ri(r, 1, 6);
    const d = ri(r, -6, 6);
    if (b === 0 || d === 0 || a * d - b * c === 0) return null;
    const e = a * x + b * y;
    const f = c * x + d * y;
    const ask = r() < 0.5 ? 'x' : 'y';
    return {
      key: `g:${a}:${b}:${c}:${d}:${e}:${f}:${ask}`,
      q: numeric({
        prompt: `If ${lin(a, 0)}${term(b, 'y')} = ${fmt(e)} and ${lin(c, 0)}${term(d, 'y')} = ${fmt(f)}, what is the value of ${ask}?`,
        answer: ask === 'x' ? x : y,
        explanation:
          ask === 'x'
            ? `Eliminate y: multiply the first equation by ${par(d)} and the second by ${par(b)}, then subtract.\n(${a * d} − ${par(b * c)})x = ${fmt(e * d)} − ${par(f * b)} → ${fmt(a * d - b * c)}x = ${fmt(e * d - f * b)} → x = **${fmt(x)}**.\nCheck with y = ${fmt(y)}: ${a}(${fmt(x)}) + ${par(b)}(${fmt(y)}) = ${fmt(e)} ✓ and ${c}(${fmt(x)}) + ${par(d)}(${fmt(y)}) = ${fmt(f)} ✓.`
            : `Eliminate x: multiply the first equation by ${c} and the second by ${a}, then subtract.\n(${b * c} − ${par(a * d)})y = ${fmt(e * c)} − ${par(f * a)} → ${fmt(b * c - a * d)}y = ${fmt(e * c - f * a)} → y = **${fmt(y)}**.\nCheck with x = ${fmt(x)}: ${a}(${fmt(x)}) + ${par(b)}(${fmt(y)}) = ${fmt(e)} ✓ and ${c}(${fmt(x)}) + ${par(d)}(${fmt(y)}) = ${fmt(f)} ✓.`,
        difficulty: 2,
      }),
    };
  },
};

const linInequality: Generator = {
  id: 'lin-inequality',
  track: 'quant',
  topic: 'Inequalities',
  lessonId: 'gre-linear',
  count: 100,
  variants: true,
  make(r) {
    if (r() < 0.5) {
      const b = pick(r, [-5, -4, -3, -2, 2, 3, 4, 5]);
      const c = ri(r, -10, 10);
      const lo = ri(r, -30, 10);
      const hi = lo + ri(r, 6, 30);
      const sols: number[] = [];
      for (let x = -100; x <= 100; x++) {
        const v = b * x + c;
        if (lo < v && v <= hi) sols.push(x);
      }
      if (sols.length < 2) return null;
      const L = (lo - c) / b;
      const H = (hi - c) / b;
      return {
        key: `c:${b}:${c}:${lo}:${hi}`,
        q: numeric({
          prompt: `How many integers x satisfy ${fmt(lo)} < ${lin(b, c)} ≤ ${fmt(hi)}?`,
          answer: sols.length,
          explanation: `Subtract ${fmt(c)} from all three parts: ${fmt(lo - c)} < ${b}x ≤ ${fmt(hi - c)}.\nDivide by ${b}${b < 0 ? ' — NEGATIVE, so both inequality signs flip' : ''}: ${b < 0 ? `${fmt(H)} ≤ x < ${fmt(L)}` : `${fmt(L)} < x ≤ ${fmt(H)}`}.\nIntegers in that range: ${sols.length <= 12 ? sols.map(fmt).join(', ') : `${fmt(sols[0])} through ${fmt(sols[sols.length - 1])}`} — **${sols.length}** of them.`,
          difficulty: b < 0 ? 3 : 2,
        }),
      };
    }
    const a = pick(r, [-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
    const b = ri(r, -12, 12);
    const x0 = ri(r, -8, 8);
    const c = a * x0 + b;
    const gt = r() < 0.5;
    const flip = a < 0;
    const dir = gt !== flip ? '>' : '<';
    const correct = `x ${dir} ${fmt(x0)}`;
    const q = mc(r, {
      prompt: `Which of the following describes all values of x for which ${lin(a, b)} ${gt ? '>' : '<'} ${fmt(c)}?`,
      correct: { text: correct, note: flip ? `Dividing by ${a} (negative) flips the sign.` : 'Isolate x; dividing by a positive keeps the sign.' },
      wrong: [
        { text: `x ${dir === '>' ? '<' : '>'} ${fmt(x0)}`, note: flip ? `Forgot to flip the sign when dividing by ${a}.` : 'Flipped the sign without dividing by a negative.' },
        { text: `x ${dir} ${fmt(-x0)}`, note: 'Sign error when moving the constant.' },
        { text: `x ${dir === '>' ? '<' : '>'} ${fmt(-x0)}`, note: 'Two sign errors.' },
        { text: `x ${dir} ${fmt(x0 + 1)}`, note: 'Arithmetic slip.' },
        { text: `x ${dir} ${frac(c + b, a)}`, note: `Added ${fmt(b)} instead of subtracting it.` },
        { text: `x ${dir === '>' ? '≥' : '≤'} ${fmt(x0)}`, note: 'The inequality is strict — no "or equal to".' },
      ],
      explanation: `${lin(a, b)} ${gt ? '>' : '<'} ${fmt(c)}\nSubtract ${fmt(b)}: ${term(a, 'x', true)} ${gt ? '>' : '<'} ${fmt(c - b)}\nDivide by ${a}${flip ? ' — negative, so FLIP the sign' : ''}: **${correct}**.`,
      difficulty: flip ? 2 : 1,
    });
    return q && { key: `s:${a}:${b}:${c}:${gt}`, q };
  },
};

const absValue: Generator = {
  id: 'abs-value',
  track: 'quant',
  topic: 'Absolute value',
  lessonId: 'gre-linear',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    const a = ri(r, -12, 12);
    const b = ri(r, 1, 12);
    const xa = `x${cterm(-a)}`;
    if (style === 0) {
      const wantSum = r() < 0.6;
      const s1 = a + b;
      const s2 = a - b;
      const ans = wantSum ? s1 + s2 : s1 * s2;
      const q = mc(r, {
        prompt: `What is the ${wantSum ? 'sum' : 'product'} of all values of x for which |${xa}| = ${b}?`,
        correct: n(ans, `The two solutions are ${fmt(s1)} and ${fmt(s2)}.`),
        wrong: [
          n(wantSum ? s1 : s1 * -s2, wantSum ? 'Only one solution counted — absolute value equations have two.' : 'Sign error on one solution.'),
          n(wantSum ? 2 * b : b * b, `Used ${b} instead of solving for x.`),
          n(wantSum ? 0 : -(b * b), 'Assumed the solutions are opposites — true only when the center is 0.'),
          n(wantSum ? -2 * a : a * a + b * b, 'Sign error on the center.'),
          ...nearMisses(ans, fmt, [1, -1, 2, -2]),
        ],
        explanation: `|${xa}| = ${b} means x is ${b} away from ${fmt(a)} on the number line:\n${xa} = ${b} → x = ${fmt(s1)}, or ${xa} = −${b} → x = ${fmt(s2)}.\n${wantSum ? `Sum = ${fmt(s1)} + ${par(s2)} = **${fmt(ans)}** (always twice the center).` : `Product = ${fmt(s1)} × ${par(s2)} = **${fmt(ans)}**.`}`,
        difficulty: 2,
      });
      return q && { key: `0:${a}:${b}:${wantSum}`, q };
    }
    if (style === 1) {
      const strict = r() < 0.5;
      const count = strict ? 2 * b - 1 : 2 * b + 1;
      return {
        key: `1:${a}:${b}:${strict}`,
        q: numeric({
          prompt: `How many integers x satisfy |${xa}| ${strict ? '<' : '≤'} ${b}?`,
          answer: count,
          explanation: `|${xa}| ${strict ? '<' : '≤'} ${b} means x is ${strict ? 'less than' : 'at most'} ${b} away from ${fmt(a)}: ${fmt(a - b)} ${strict ? '<' : '≤'} x ${strict ? '<' : '≤'} ${fmt(a + b)}.\nIntegers: from ${fmt(strict ? a - b + 1 : a - b)} to ${fmt(strict ? a + b - 1 : a + b)} — that is **${count}**.`,
          difficulty: 2,
        }),
      };
    }
    const lo = a - b;
    const hi = a + b;
    const q = mc(r, {
      prompt: `Which of the following is equivalent to ${fmt(lo)} ≤ x ≤ ${fmt(hi)}?`,
      correct: { text: `|${xa}| ≤ ${b}`, note: `Center ${fmt(a)} (the midpoint), radius ${b} (half the width).` },
      wrong: [
        { text: `|x${cterm(a)}| ≤ ${b}`, note: `Center has the wrong sign — |x + c| is centered at −c.` },
        { text: `|${xa}| ≤ ${2 * b}`, note: 'Used the full width instead of half.' },
        { text: `|${xa}| ≥ ${b}`, note: 'Greater-than describes the OUTSIDE of the interval.' },
        { text: `|x${cterm(-lo)}| ≤ ${hi}`, note: 'Centered at an endpoint, not the midpoint.' },
        { text: `|${xa}| < ${b}`, note: 'Strict — would exclude the endpoints.' },
      ],
      explanation: `An interval [L, H] is |x − center| ≤ radius, with center = (L + H)/2 = ${fmt(a)} and radius = (H − L)/2 = ${b}.\nSo ${fmt(lo)} ≤ x ≤ ${fmt(hi)} ⇔ **|${xa}| ≤ ${b}**.`,
      difficulty: 2,
    });
    return q && { key: `2:${a}:${b}`, q };
  },
};

const wordTranslate: Generator = {
  id: 'word-translate',
  track: 'quant',
  topic: 'Translating words to equations',
  lessonId: 'gre-linear',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const num = ri(r, 2, 25);
      const k1 = ri(r, 2, 6);
      const k2 = ri(r, 2, 7);
      if (k1 === k2) return null;
      const c1 = ri(r, 1, 20);
      const rhs = k1 * num + c1;
      const c2 = rhs - k2 * num;
      if (c2 === 0) return null;
      const times = (k: number) => (k === 2 ? 'twice' : k === 3 ? 'three times' : `${k} times`);
      return {
        key: `0:${num}:${k1}:${k2}:${c1}`,
        q: numeric({
          prompt: `When ${c1} is added to ${times(k1)} a number, the result is ${Math.abs(c2)} ${c2 > 0 ? 'more' : 'less'} than ${times(k2)} the number. What is the number?`,
          answer: num,
          explanation: `Let the number be n. "${c1} added to ${times(k1)} n" is ${k1}n + ${c1}; "${Math.abs(c2)} ${c2 > 0 ? 'more' : 'less'} than ${times(k2)} n" is ${k2}n ${c2 > 0 ? '+' : '−'} ${Math.abs(c2)}.\n${k1}n + ${c1} = ${k2}n ${c2 > 0 ? '+' : '−'} ${Math.abs(c2)} → ${k1 - k2}n = ${c2 - c1} → n = **${num}**.`,
          difficulty: 1,
        }),
      };
    }
    if (style === 1) {
      const pa = pick(r, [8, 9, 10, 12, 14, 15, 18, 20]);
      const pc = pick(r, [4, 5, 6, 7, 8, 9]);
      if (pc >= pa) return null;
      const adults = ri(r, 10, 120);
      const kids = ri(r, 10, 120);
      const T = adults + kids;
      const R = pa * adults + pc * kids;
      const event = pick(r, ['a school play', 'a museum exhibit', 'a minor-league game', 'a planetarium show']);
      return {
        key: `1:${pa}:${pc}:${adults}:${kids}`,
        q: numeric({
          prompt: `Tickets to ${event} cost ${money(pa)} for adults and ${money(pc)} for children. If ${T} tickets were sold for a total of ${money(R)}, how many adult tickets were sold?`,
          answer: adults,
          explanation: `Let a = adult tickets, c = child tickets.\na + c = ${T} and ${pa}a + ${pc}c = ${R}.\nSubstitute c = ${T} − a: ${pa}a + ${pc}(${T} − a) = ${R} → ${pa - pc}a = ${R - pc * T} → a = **${adults}**.\nShortcut: if all ${T} were child tickets, revenue would be ${money(pc * T)}; each adult ticket adds ${money(pa - pc)}, and ${money(R - pc * T)} ÷ ${money(pa - pc)} = ${adults}.`,
          difficulty: 2,
        }),
      };
    }
    const F = pick(r, [15, 20, 25, 30, 35, 40, 45]);
    const p = pick(r, [2, 2.5, 3, 4, 5, 6, 7.5]);
    const g = ri(r, 2, 30);
    const B = F + p * g;
    const what = pick(r, [
      ['A phone plan', 'per month plus', 'per gigabyte of data', 'gigabytes'],
      ['A gym', 'per month plus', 'per class attended', 'classes'],
      ['A car rental', 'per day plus', 'per 10 miles driven', 'units of 10 miles'],
    ] as const);
    return {
      key: `2:${F}:${p}:${g}:${what[0]}`,
      q: numeric({
        prompt: `${what[0]} charges ${money(F)} ${what[1]} ${money(p)} ${what[2]}. If one bill was ${money(B)}, how many ${what[3]} were charged?`,
        answer: g,
        explanation: `${money(F)} + ${money(p)} × n = ${money(B)} → ${money(p)} × n = ${money(B - F)} → n = **${g}**.`,
        difficulty: 1,
      }),
    };
  },
};

const wordAge: Generator = {
  id: 'word-age',
  track: 'quant',
  topic: 'Age problems',
  lessonId: 'gre-linear',
  count: 80,
  variants: true,
  make(r) {
    const [A, B] = sample(r, NAMES, 2);
    const Bnow = ri(r, 2, 30);
    const k = ri(r, 2, 6);
    const m = ri(r, 2, k - 1 || 2);
    if (m >= k) return null;
    const future = r() < 0.6;
    if (future) {
      // kB + y = m(B + y) → y = B(k − m)/(m − 1)
      const y = (Bnow * (k - m)) / (m - 1);
      if (!Number.isInteger(y) || y < 1 || y > 40) return null;
      return {
        key: `f:${Bnow}:${k}:${m}`,
        q: numeric({
          prompt: `${A} is now ${k} times as old as ${B}. In ${y} years, ${A} will be ${m === 2 ? 'twice' : `${m} times`} as old as ${B}. How old is ${B} now?`,
          answer: Bnow,
          explanation: `Let ${B}’s age now be b, so ${A} is ${k}b.\nIn ${y} years: ${k}b + ${y} = ${m}(b + ${y}) → ${k}b + ${y} = ${m}b + ${m * y} → ${k - m}b = ${(m - 1) * y} → b = **${Bnow}**.\nCheck: now ${k * Bnow} and ${Bnow}; in ${y} years ${k * Bnow + y} and ${Bnow + y}, and ${k * Bnow + y} = ${m} × ${Bnow + y}.`,
          difficulty: 2,
        }),
      };
    }
    // t years ago, A was k times B; now A is m times B: mB − t = k(B − t) → t = B(k − m)/(k − 1)
    const t = (Bnow * (k - m)) / (k - 1);
    if (!Number.isInteger(t) || t < 1 || t >= Bnow) return null;
    return {
      key: `p:${Bnow}:${k}:${m}`,
      q: numeric({
        prompt: `${A} is now ${m === 2 ? 'twice' : `${m} times`} as old as ${B}. ${t} years ago, ${A} was ${k} times as old as ${B}. How old is ${A} now?`,
        answer: m * Bnow,
        explanation: `Let ${B}’s age now be b, so ${A} is ${m}b.\n${t} years ago: ${m}b − ${t} = ${k}(b − ${t}) → ${m}b − ${t} = ${k}b − ${k * t} → ${(k - 1) * t} = ${k - m}b → b = ${Bnow}.\n${A} is ${m} × ${Bnow} = **${m * Bnow}**. (Read carefully — the question asks for ${A}, not ${B}.)`,
        difficulty: 3,
      }),
    };
  },
};

// -----------------------------------------------------------------------------
// Quadratics

const quadForm = (a: number, r1: number, r2: number) => {
  const b = -a * (r1 + r2);
  const c = a * r1 * r2;
  return `${a === 1 ? '' : a}x²${term(b, 'x')}${cterm(c)}`;
};

const quadRoots: Generator = {
  id: 'quad-roots',
  track: 'quant',
  topic: 'Solving quadratics',
  lessonId: 'gre-quadratics',
  count: 120,
  variants: true,
  make(r) {
    const r1 = ri(r, -9, 9);
    const r2 = ri(r, -9, 9);
    const a = r() < 0.75 ? 1 : pick(r, [2, 3]);
    if (r1 === r2 || r1 === 0 || r2 === 0) return null;
    const eq = `${quadForm(a, r1, r2)} = 0`;
    const style = ri(r, 0, 2);
    const fac = `${a === 1 ? '' : a}(x${cterm(-r1)})(x${cterm(-r2)})`;
    if (style === 0) {
      const big = Math.max(r1, r2);
      const q = mc(r, {
        prompt: `What is the greater of the two solutions of ${eq}?`,
        correct: n(big, `Factor: ${fac} = 0.`),
        wrong: [
          n(-Math.min(r1, r2), 'Sign error: (x − r) = 0 gives x = r, not −r.'),
          n(-Math.max(r1, r2), 'Sign error: (x − r) = 0 gives x = r, not −r.'),
          n(Math.min(r1, r2), 'That is the smaller solution.'),
          n(r1 + r2, 'That is the SUM of the solutions.'),
          n(r1 * r2, 'That is the PRODUCT of the solutions.'),
        ],
        explanation: `Factor: ${eq.replace(' = 0', '')} = ${fac}. A product is 0 only when a factor is 0, so x = ${fmt(r1)} or x = ${fmt(r2)}.\nThe greater solution is **${fmt(big)}**.`,
        difficulty: a === 1 ? 1 : 2,
      });
      return q && { key: `0:${a}:${Math.min(r1, r2)}:${Math.max(r1, r2)}`, q };
    }
    if (style === 1) {
      const wantSum = r() < 0.5;
      const ans = wantSum ? r1 + r2 : r1 * r2;
      return {
        key: `1:${a}:${Math.min(r1, r2)}:${Math.max(r1, r2)}:${wantSum}`,
        q: numeric({
          prompt: `What is the ${wantSum ? 'sum' : 'product'} of the solutions of ${eq}?`,
          answer: ans,
          explanation: `Factor: ${fac} = 0 → x = ${fmt(r1)} or x = ${fmt(r2)}.\n${wantSum ? 'Sum' : 'Product'} = **${fmt(ans)}**.\nShortcut for ax² + bx + c = 0: sum of roots = −b/a, product = c/a.`,
          difficulty: 2,
        }),
      };
    }
    const cands = [r1, r2, -r1, -r2, r1 + r2, r1 * r2].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, 5);
    if (cands.length < 4) return null;
    const q = multi(r, {
      prompt: `Which of the following are solutions of ${eq}?\n\nIndicate all such values.`,
      options: cands.map((v) => ({
        text: fmt(v),
        value: v,
        correct: v === r1 || v === r2,
        note:
          v === r1 || v === r2
            ? `Makes a factor zero.`
            : `Plug it in: the left side equals ${fmt(a * v * v - a * (r1 + r2) * v + a * r1 * r2)}, not 0.`,
      })),
      explanation: `Factor: ${fac} = 0, so the solutions are exactly **${fmt(Math.min(r1, r2))} and ${fmt(Math.max(r1, r2))}**. The negatives of the roots are the classic sign trap.`,
      difficulty: 2,
    });
    return q && { key: `2:${a}:${Math.min(r1, r2)}:${Math.max(r1, r2)}`, q };
  },
};

const quadIdentities: Generator = {
  id: 'quad-identities',
  track: 'quant',
  topic: 'Special products',
  lessonId: 'gre-quadratics',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const s = ri(r, -12, 12);
      const p = ri(r, -30, 30);
      if (s === 0 || p === 0) return null;
      const ans = s * s - 2 * p;
      const q = mc(r, {
        prompt: `If x + y = ${fmt(s)} and xy = ${fmt(p)}, what is the value of x² + y²?`,
        correct: n(ans, '(x + y)² − 2xy.'),
        wrong: [
          n(s * s, 'Forgot to subtract 2xy — (x + y)² is not x² + y².'),
          n(s * s + 2 * p, 'Added 2xy instead of subtracting.'),
          n(s * s - p, 'Subtracted xy once instead of twice.'),
          n(2 * s - 2 * p, 'Doubled instead of squaring.'),
          ...nearMisses(ans, fmt, [4, -4]),
        ],
        explanation: `(x + y)² = x² + 2xy + y², so x² + y² = (x + y)² − 2xy = ${s * s} − 2(${fmt(p)}) = **${fmt(ans)}**.\nNo need to find x and y individually.`,
        difficulty: 2,
      });
      return q && { key: `0:${s}:${p}`, q };
    }
    if (style === 1) {
      const d = ri(r, -10, 10);
      const s = ri(r, -15, 15);
      if (d === 0 || s === 0) return null;
      return {
        key: `1:${d}:${s}`,
        q: numeric({
          prompt: `If x − y = ${fmt(d)} and x + y = ${fmt(s)}, what is the value of x² − y²?`,
          answer: d * s,
          explanation: `x² − y² = (x + y)(x − y) = ${fmt(s)} × ${par(d)} = **${fmt(d * s)}**. Recognize the difference of squares instead of solving for x and y.`,
          difficulty: 1,
        }),
      };
    }
    const q_ = ri(r, 10, 100);
    const p = ri(r, 1, Math.floor(q_ / 2) - 1);
    const plus = r() < 0.5;
    const ans = plus ? q_ + 2 * p : q_ - 2 * p;
    const q = mc(r, {
      prompt: `If x² + y² = ${q_} and xy = ${p}, what is the value of (x ${plus ? '+' : '−'} y)²?`,
      correct: n(ans, plus ? '(x + y)² = x² + y² + 2xy.' : '(x − y)² = x² + y² − 2xy.'),
      wrong: [
        n(plus ? q_ - 2 * p : q_ + 2 * p, 'Used the other identity — watch the sign of the middle term.'),
        n(q_, 'Dropped the middle term.'),
        n(plus ? q_ + p : q_ - p, 'Middle term is 2xy, not xy.'),
        n(q_ * q_, 'Squared the wrong thing.'),
        ...nearMisses(ans, fmt, [2, -2, 4]),
      ],
      explanation: `(x ${plus ? '+' : '−'} y)² = x² ${plus ? '+' : '−'} 2xy + y² = (x² + y²) ${plus ? '+' : '−'} 2xy = ${q_} ${plus ? '+' : '−'} ${2 * p} = **${ans}**.`,
      difficulty: 2,
    });
    return q && { key: `2:${q_}:${p}:${plus}`, q };
  },
};

// -----------------------------------------------------------------------------
// Functions, symbols, sequences, variation

const funcEval: Generator = {
  id: 'func-eval',
  track: 'quant',
  topic: 'Functions',
  lessonId: 'gre-functions-sequences',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const a = ri(r, -4, 5);
      const b = ri(r, -9, 9);
      const c = ri(r, -12, 12);
      const k = ri(r, -5, 6);
      if (a === 0) return null;
      const v = a * k * k + b * k + c;
      return {
        key: `0:${a}:${b}:${c}:${k}`,
        q: numeric({
          prompt: `If f(x) = ${a === 1 ? '' : a === -1 ? '−' : a}x²${term(b, 'x')}${cterm(c)}, what is f(${fmt(k)})?`,
          answer: v,
          explanation: `Substitute x = ${fmt(k)} everywhere — with parentheses, especially for negatives:\nf(${fmt(k)}) = ${a}(${fmt(k)})² + ${par(b)}(${fmt(k)}) + ${par(c)} = ${fmt(a * k * k)} + ${par(b * k)} + ${par(c)} = **${fmt(v)}**.`,
          difficulty: k < 0 ? 2 : 1,
        }),
      };
    }
    if (style === 1) {
      const a = ri(r, 2, 5);
      const b = ri(r, -6, 6);
      const c = ri(r, -5, 5);
      const k = ri(r, -3, 4);
      const g = k * k + c; // g(x) = x² + c
      const fg = a * g + b;
      const f = a * k + b;
      const gf = f * f + c;
      if (fg === gf) return null;
      const q = mc(r, {
        prompt: `If f(x) = ${lin(a, b)} and g(x) = x²${cterm(c)}, what is f(g(${fmt(k)}))?`,
        correct: n(fg, 'Inside first: g, then f.'),
        wrong: [
          n(gf, 'That is g(f(k)) — composition order matters: work from the inside out.'),
          n(f * g, 'Multiplied f(k) by g(k) — composition is not multiplication.'),
          n(f + g, 'Added f(k) and g(k).'),
          n(a * k * k + b + c, `Applied f's coefficient to x² but lost the ${fmt(c)}.`),
          ...nearMisses(fg, fmt, [a, -a, 1]),
        ],
        explanation: `Work inside out. g(${fmt(k)}) = (${fmt(k)})²${cterm(c)} = ${fmt(g)}.\nThen f(${fmt(g)}) = ${a}(${fmt(g)})${cterm(b)} = **${fmt(fg)}**.\n(g(f(${fmt(k)})) would be ${fmt(gf)} — a different number.)`,
        difficulty: 2,
      });
      return q && { key: `1:${a}:${b}:${c}:${k}`, q };
    }
    const a = pick(r, [-5, -4, -3, -2, 2, 3, 4, 5, 6]);
    const b = ri(r, -15, 15);
    const t = ri(r, -10, 12);
    const v = a * t + b;
    return {
      key: `2:${a}:${b}:${t}`,
      q: numeric({
        prompt: `If f(x) = ${lin(a, b)} and f(t) = ${fmt(v)}, what is the value of t?`,
        answer: t,
        explanation: `f(t) = ${lin(a, b, 't')} = ${fmt(v)} → ${a}t = ${fmt(v - b)} → t = **${fmt(t)}**.`,
        difficulty: 1,
      }),
    };
  },
};

type Op = { sym: string; def: string; f: (a: number, b: number) => number | null };
const OPS: Op[] = [
  { sym: '◆', def: 'a ◆ b = 2a − b', f: (a, b) => 2 * a - b },
  { sym: '◆', def: 'a ◆ b = a² − ab', f: (a, b) => a * a - a * b },
  { sym: '⊕', def: 'a ⊕ b = ab + a + b', f: (a, b) => a * b + a + b },
  { sym: '⊕', def: 'a ⊕ b = a² + b²', f: (a, b) => a * a + b * b },
  { sym: '#', def: 'a # b = (a + b)/(a − b)', f: (a, b) => (a === b ? null : (a + b) / (a - b)) },
  { sym: '#', def: 'a # b = 3a + 2b − ab', f: (a, b) => 3 * a + 2 * b - a * b },
  { sym: '▲', def: 'a ▲ b = (a − b)²', f: (a, b) => (a - b) ** 2 },
  { sym: '▲', def: 'a ▲ b = ab − (a + b)', f: (a, b) => a * b - (a + b) },
  { sym: '⊗', def: 'a ⊗ b = a/b + b/a', f: (a, b) => (a === 0 || b === 0 ? null : a / b + b / a) },
  { sym: '⊗', def: 'a ⊗ b = 2ab − b', f: (a, b) => 2 * a * b - b },
];

const symbolOp: Generator = {
  id: 'symbol-op',
  track: 'quant',
  topic: 'Defined operations',
  lessonId: 'gre-functions-sequences',
  count: 90,
  variants: true,
  make(r) {
    const op = pick(r, OPS);
    const [x, y, z] = [ri(r, -5, 6), ri(r, -5, 6), ri(r, -4, 5)];
    const nestLeft = r() < 0.5;
    const inner = nestLeft ? op.f(x, y) : op.f(y, z);
    if (inner === null || !Number.isInteger(inner) || Math.abs(inner) > 60) return null;
    const outer = nestLeft ? op.f(inner, z) : op.f(x, inner);
    if (outer === null || !Number.isFinite(outer) || !Number.isInteger(outer * 2) || Math.abs(outer) > 5000) return null;
    const s = op.sym;
    const expr = nestLeft ? `(${par(x)} ${s} ${par(y)}) ${s} ${par(z)}` : `${par(x)} ${s} (${par(y)} ${s} ${par(z)})`;
    return {
      key: `${op.def}:${expr}`,
      q: numeric({
        prompt: `For all numbers a and b, the operation ${s} is defined by ${op.def}${op.def.includes('/') ? ' (whenever the result is defined)' : ''}. What is the value of ${expr}?`,
        answer: outer,
        explanation: `Parentheses first. ${nestLeft ? `${par(x)} ${s} ${par(y)}` : `${par(y)} ${s} ${par(z)}`} = ${fmt(inner)} (plug into the definition with a = ${nestLeft ? fmt(x) : fmt(y)}, b = ${nestLeft ? fmt(y) : fmt(z)}).\nThen ${nestLeft ? `${par(inner)} ${s} ${par(z)}` : `${par(x)} ${s} ${par(inner)}`} = **${fmt(outer)}**.\nA defined symbol is just a function of two inputs — substitute carefully and keep the order (a first, b second).`,
        difficulty: 2,
      }),
    };
  },
};

const sequence: Generator = {
  id: 'sequence',
  track: 'quant',
  topic: 'Sequences',
  lessonId: 'gre-functions-sequences',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 3);
    if (style === 0) {
      const a1 = ri(r, -20, 30);
      const d = ri(r, -9, 12);
      const i = ri(r, 3, 9);
      const j = i + ri(r, 3, 12);
      const k = j + ri(r, 5, 60);
      if (d === 0) return null;
      const t = (m: number) => a1 + (m - 1) * d;
      const q = mc(r, {
        prompt: `In an arithmetic sequence, the ${i}th term is ${fmt(t(i))} and the ${j}th term is ${fmt(t(j))}. What is the ${k}th term?`,
        correct: n(t(k), `Common difference = (${fmt(t(j))} − ${par(t(i))}) ÷ ${j - i} = ${d}.`),
        wrong: [
          n(t(k) + d, 'Off by one term — the nth term is a₁ + (n − 1)d.'),
          n(t(k) - d, 'Off by one term — the nth term is a₁ + (n − 1)d.'),
          n(t(j) + (k - j) * (t(j) - t(i)), `Used the gap between terms ${i} and ${j} as if it were one step.`),
          n(a1 + k * d, 'Used k·d instead of (k − 1)·d.'),
          ...nearMisses(t(k), fmt, [2 * d, -2 * d]),
        ],
        explanation: `From term ${i} to term ${j} is ${j - i} steps, and the value changes by ${fmt(t(j) - t(i))}, so d = ${fmt(d)}.\nFrom term ${j} to term ${k} is ${k - j} more steps: ${fmt(t(j))} + ${k - j}(${fmt(d)}) = **${fmt(t(k))}**.`,
        difficulty: 2,
      });
      return q && { key: `0:${a1}:${d}:${i}:${j}:${k}`, q };
    }
    if (style === 1) {
      const a1 = pick(r, [1, 2, 3, 4, 5, -2, -3]);
      const ratio = pick(r, [2, 3, -2, -3, 4]);
      const k = ri(r, 4, ratio === 4 ? 6 : 8);
      const v = a1 * ratio ** (k - 1);
      return {
        key: `1:${a1}:${ratio}:${k}`,
        q: numeric({
          prompt: `The first term of a sequence is ${fmt(a1)}, and each term after the first is ${ratio} times the preceding term. What is the ${k}th term?`,
          answer: v,
          explanation: `Geometric sequence: aₙ = a₁ × r^(n − 1) = ${fmt(a1)} × ${par(ratio)}${sup(k - 1)} = **${fmt(v)}**.\n(Common slip: using rⁿ instead of r^(n − 1) — the first term hasn’t been multiplied yet.)`,
          difficulty: 2,
        }),
      };
    }
    if (style === 2) {
      const a1 = ri(r, -3, 6);
      const m = pick(r, [2, 3, -1, -2]);
      const c = ri(r, -4, 5);
      const k = ri(r, 4, 6);
      const seq = [a1];
      for (let i = 1; i < k; i++) seq.push(m * seq[i - 1] + c);
      if (Math.abs(seq[k - 1]) > 2000) return null;
      return {
        key: `2:${a1}:${m}:${c}:${k}`,
        q: numeric({
          prompt: `A sequence is defined by a₁ = ${fmt(a1)} and aₙ = ${m === -1 ? '−' : m}aₙ₋₁${cterm(c)} for n > 1. What is a${String(k).split('').map((ch) => '₀₁₂₃₄₅₆₇₈₉'[Number(ch)]).join('')}?`,
          answer: seq[k - 1],
          explanation: `Just iterate: ${seq.map((v, i) => `a${'₀₁₂₃₄₅₆₇₈₉'[i + 1]} = ${fmt(v)}`).join(', ')}.\nSo the answer is **${fmt(seq[k - 1])}**. Recursive sequences on the GRE are short enough to write out.`,
          difficulty: 2,
        }),
      };
    }
    const lo = ri(r, 1, 60);
    const hi = lo + ri(r, 10, 140);
    const step = pick(r, [1, 1, 2, 3, 5]);
    let first = lo;
    while (first % step !== 0) first++;
    let last = hi;
    while (last % step !== 0) last--;
    const cnt = (last - first) / step + 1;
    const sum = ((first + last) * cnt) / 2;
    const what = step === 1 ? 'integers' : step === 2 ? 'even integers' : `multiples of ${step}`;
    return {
      key: `3:${lo}:${hi}:${step}`,
      q: numeric({
        prompt: `What is the sum of all ${what} from ${lo} to ${hi}, inclusive?`,
        answer: sum,
        explanation: `Evenly spaced list: first term ${first}, last ${last}, count = (${last} − ${first}) ÷ ${step} + 1 = ${cnt}.\nSum = count × average of first and last = ${cnt} × ${fmt((first + last) / 2)} = **${fmt(sum)}**.`,
        difficulty: 2,
      }),
    };
  },
};

const variation: Generator = {
  id: 'variation',
  track: 'quant',
  topic: 'Direct & inverse variation',
  lessonId: 'gre-functions-sequences',
  count: 60,
  variants: true,
  make(r) {
    const kind = pick(r, ['directly', 'inversely', 'directly as the square of', 'inversely as the square of'] as const);
    const x1 = ri(r, 2, 10);
    const x2 = ri(r, 2, 12);
    if (x1 === x2) return null;
    const sq = kind.includes('square');
    const inv = kind.startsWith('inversely');
    const k = ri(r, 1, 12) * (inv ? (sq ? x1 * x1 : x1) : 1);
    const f = (x: number) => (inv ? k / (sq ? x * x : x) : k * (sq ? x * x : x));
    const y1 = f(x1);
    const y2 = f(x2);
    if (!Number.isInteger(y1 * 4) || !Number.isInteger(y2 * 4)) return null;
    const rel = kind.endsWith('of') ? `${kind} x` : `${kind} as x`;
    const wrongDir = inv ? y1 * (sq ? (x2 * x2) / (x1 * x1) : x2 / x1) : y1 * (sq ? (x1 * x1) / (x2 * x2) : x1 / x2);
    const q = mc(r, {
      prompt: `The quantity y varies ${rel}. If y = ${fmt(y1)} when x = ${x1}, what is y when x = ${x2}?`,
      correct: n(y2, inv ? `y × x${sq ? '²' : ''} stays constant.` : `y ÷ x${sq ? '²' : ''} stays constant.`),
      wrong: [
        n(wrongDir, inv ? 'Treated it as DIRECT variation.' : 'Treated it as INVERSE variation.'),
        n(inv ? y1 * (sq ? x1 / x2 : (x1 * x1) / (x2 * x2)) : y1 * (sq ? x2 / x1 : (x2 * x2) / (x1 * x1)), sq ? 'Forgot to square x.' : 'Squared x when the relationship is linear.'),
        n(y1 + (x2 - x1), 'Added the change in x — variation multiplies.'),
        n(y1, 'y does change when x changes.'),
        ...nearMisses(y2, fmt, [1, -1, 2]),
      ].filter((o) => o.value! > 0 && Number.isInteger(o.value! * 4)),
      explanation: `${inv ? `Inverse: y = k/x${sq ? '²' : ''}` : `Direct: y = kx${sq ? '²' : ''}`}. From y = ${fmt(y1)} at x = ${x1}: k = ${fmt(k)}.\nAt x = ${x2}: y = ${inv ? `${fmt(k)}/${sq ? `${x2}²` : x2}` : `${fmt(k)} × ${sq ? `${x2}²` : x2}`} = **${fmt(y2)}**.`,
      difficulty: sq ? 3 : 2,
    });
    return q && { key: `${kind}:${x1}:${x2}:${k}`, q };
  },
};

export const ALGEBRA: Generator[] = [
  linSolve,
  linSystem,
  linInequality,
  absValue,
  wordTranslate,
  wordAge,
  quadRoots,
  quadIdentities,
  funcEval,
  symbolOp,
  sequence,
  variation,
];

void gcd;
