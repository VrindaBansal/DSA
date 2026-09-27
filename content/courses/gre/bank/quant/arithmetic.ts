// Arithmetic & number properties: integers, divisibility, primes, remainders,
// units digits, exponents, roots, fractions, ordering, scientific notation.

import {
  type Generator,
  type Opt,
  type Rng,
  factorize,
  fmt,
  frac,
  gcd,
  isPrime,
  lcm,
  mc,
  multi,
  nearMisses,
  numeric,
  pick,
  ri,
  sample,
  shuffle,
  sup,
} from '../engine.ts';

const n = (x: number, note: string): Opt => ({ text: fmt(x), value: x, note });
const factorStr = (f: [number, number][]) => f.map(([p, e]) => (e === 1 ? `${p}` : `${p}${sup(e)}`)).join(' × ');

// -----------------------------------------------------------------------------

const divisorCount: Generator = {
  id: 'int-divisors',
  track: 'quant',
  topic: 'Counting factors',
  lessonId: 'gre-integers',
  count: 110,
  variants: true,
  make(r) {
    const primes = sample(r, [2, 3, 5, 7, 11], ri(r, 2, 3)).sort((a, b) => a - b);
    const exps = primes.map(() => ri(r, 1, primes.length === 3 ? 2 : 4));
    const N = primes.reduce((acc, p, i) => acc * p ** exps[i], 1);
    if (N > 5000 || N < 12) return null;
    const f = primes.map((p, i) => [p, exps[i]] as [number, number]);
    const ans = exps.reduce((a, e) => a * (e + 1), 1);
    const sumE = exps.reduce((a, e) => a + e, 0);
    const prodE = exps.reduce((a, e) => a * e, 1);
    const diff = (primes.length === 3 || Math.max(...exps) >= 3 ? 2 : 1) as 1 | 2;
    const explanation = `Prime-factorize first: ${fmt(N)} = ${factorStr(f)}.\nA divisor chooses an exponent for each prime independently: ${f
      .map(([p, e]) => `${p} from 0 to ${e} (${e + 1} ways)`)
      .join(', ')}.\nMultiply the choices: ${exps.map((e) => `(${e}+1)`).join('')} = **${ans}**.`;
    if (N % 2 === 1 || r() < 0.4)
      return {
        key: `${N}`,
        q: numeric({
          prompt: `How many positive divisors does ${fmt(N)} have?`,
          answer: ans,
          explanation,
          difficulty: diff,
        }),
      };
    const q = mc(r, {
      prompt: `How many positive divisors does ${fmt(N)} have?`,
      correct: n(ans, 'Add 1 to each exponent in the prime factorization, then multiply.'),
      wrong: [
        n(sumE + primes.length - 1, 'Adding the (exponent + 1) counts instead of multiplying them.'),
        n(prodE, 'Multiplying the exponents without adding 1 — forgets that an exponent of 0 is a choice (that is how 1 and the pure prime powers get counted).'),
        n(ans - 2, 'Leaving out 1 and the number itself — both are divisors.'),
        n(sumE, 'Counting prime factors (with repeats), not divisors.'),
        ...nearMisses(ans, fmt, [2, -1, 4, 1]),
      ],
      explanation,
      difficulty: diff,
    });
    return q && { key: `${N}`, q };
  },
};

const gcdLcm: Generator = {
  id: 'int-gcd-lcm',
  track: 'quant',
  topic: 'GCD & LCM',
  lessonId: 'gre-integers',
  count: 110,
  variants: true,
  make(r) {
    const g = pick(r, [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15]);
    let a = g * ri(r, 2, 9);
    let b = g * ri(r, 2, 9);
    if (a === b) return null;
    if (a > b) [a, b] = [b, a];
    const G = gcd(a, b);
    const L = lcm(a, b);
    if (L > 600) return null;
    const style = ri(r, 0, 3);
    const fa = factorStr(factorize(a));
    const fb = factorStr(factorize(b));
    const facts = `${a} = ${fa} and ${b} = ${fb}.`;
    if (style === 0 || style === 1) {
      const wantG = style === 0;
      const ans = wantG ? G : L;
      const q = mc(r, {
        prompt: `What is the ${wantG ? 'greatest common divisor' : 'least common multiple'} of ${a} and ${b}?`,
        correct: n(ans, wantG ? 'Shared primes, lowest powers.' : 'Every prime that appears, highest power.'),
        wrong: [
          n(wantG ? L : G, wantG ? 'That is the LCM — the smallest number both divide INTO.' : 'That is the GCD — the largest number dividing both.'),
          n(a * b, 'The product is a common multiple, but not the least one unless the numbers share no factor.'),
          n(wantG ? a : b, wantG ? 'The smaller number only works if it divides the larger one.' : 'The larger number only works if the smaller divides it.'),
          n(b - a, 'The difference is not a divisor in general.'),
          ...nearMisses(ans, fmt, [ans, -Math.floor(ans / 2), 2]),
        ].filter((o) => o.value! > 0),
        explanation: `Factor: ${facts}\n${wantG ? `GCD = product of SHARED primes at their LOWEST powers = **${G}**.` : `LCM = every prime that appears, at its HIGHEST power = **${L}**.`}\nCheck: GCD × LCM = ${G} × ${L} = ${fmt(G * L)} = ${a} × ${b}. That identity is a fast way to get one from the other.`,
        difficulty: 1,
      });
      return q && { key: `${style}:${a}:${b}`, q };
    }
    if (style === 2) {
      const things = pick(r, [
        ['Two lighthouse beacons flash every', 'seconds', 'flash together'],
        ['Two buses leave the station every', 'minutes', 'leave together'],
        ['Two alarms ring every', 'minutes', 'ring together'],
      ] as const);
      return {
        key: `${style}:${a}:${b}`,
        q: numeric({
          prompt: `${things[0]} ${a} and ${b} ${things[1]}, respectively. If they ${things[2].split(' ')[0]} together right now, after how many ${things[1]} will they next ${things[2]}?`,
          answer: L,
          suffix: things[1],
          explanation: `They coincide at common multiples of ${a} and ${b}; the NEXT time is the least common multiple.\n${facts}\nLCM = **${L}** ${things[1]}.`,
          difficulty: 2,
        }),
      };
    }
    return {
      key: `${style}:${a}:${b}`,
      q: numeric({
        prompt: `Two ribbons, ${a} cm and ${b} cm long, are to be cut into pieces that are all the same length, with nothing left over. What is the greatest possible length of each piece, in centimeters?`,
        answer: G,
        suffix: 'cm',
        explanation: `The piece length must divide both ${a} and ${b}, and we want the largest such number — the greatest common divisor.\n${facts}\nGCD = **${G}** cm (giving ${a / G} + ${b / G} = ${(a + b) / G} pieces).`,
        difficulty: 2,
      }),
    };
  },
};

const remainders: Generator = {
  id: 'int-remainder',
  track: 'quant',
  topic: 'Remainders',
  lessonId: 'gre-integers',
  count: 120,
  variants: true,
  make(r) {
    const d = ri(r, 4, 12);
    const rem = ri(r, 1, d - 1);
    const k = ri(r, 2, 9);
    const m = ri(r, 0, 9);
    const ans = (k * rem + m) % d;
    const expr = m ? `${k}n + ${m}` : `${k}n`;
    const explanation = `Pick the simplest n that works: n = ${rem} (it leaves remainder ${rem} when divided by ${d}).\nThen ${expr} = ${k}(${rem})${m ? ` + ${m}` : ''} = ${k * rem + m}, and ${k * rem + m} ÷ ${d} leaves remainder **${ans}**.\nWhy picking one n is legitimate: n = ${d}q + ${rem}, so ${expr} = ${d}(${k}q) + ${k * rem + m} — the ${d}(${k}q) part is always divisible by ${d}, so only ${k * rem + m} matters.`;
    const prompt = `When the positive integer n is divided by ${d}, the remainder is ${rem}. What is the remainder when ${expr} is divided by ${d}?`;
    const diff = (k * rem + m >= 2 * d ? 2 : 1) as 1 | 2;
    if (r() < 0.45) return { key: `${d}:${rem}:${k}:${m}`, q: numeric({ prompt, answer: ans, explanation, difficulty: diff }) };
    const q = mc(r, {
      prompt,
      correct: n(ans, 'Plug in n = the remainder itself, then divide.'),
      wrong: [
        n(k * rem + m, 'That number is not reduced — a remainder must be smaller than the divisor.'),
        n(rem, 'Assumes the remainder is unchanged by multiplying and adding.'),
        n((k * rem) % d, `Forgot to add the ${m}.`),
        n((rem + m) % d, `Forgot to multiply by ${k}.`),
        ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter((x) => x < d).map((x) => n(x, 'A possible remainder, but not this one — redo the arithmetic with n = the remainder.')),
      ],
      explanation,
      difficulty: diff,
    });
    return q && { key: `${d}:${rem}:${k}:${m}`, q };
  },
};

function cycleOf(b: number): number[] {
  const u = b % 10;
  const out: number[] = [];
  let x = u;
  do {
    out.push(x);
    x = (x * u) % 10;
  } while (x !== u && out.length < 5);
  return out;
}

const unitsDigit: Generator = {
  id: 'int-units-digit',
  track: 'quant',
  topic: 'Units digits',
  lessonId: 'gre-exponents-roots',
  count: 110,
  variants: true,
  make(r) {
    const base = pick(r, [2, 3, 4, 7, 8, 9, 12, 13, 17, 18, 22, 23, 27, 28, 33, 37, 43, 47, 52, 58]);
    const e = ri(r, 11, 99);
    const cyc = cycleOf(base);
    const L = cyc.length;
    const pos = e % L === 0 ? L : e % L;
    const ans = cyc[pos - 1];
    const explanation = `Only the units digit of the base matters: ${base % 10}.\nPowers of ${base % 10} cycle through the units digits ${cyc.join(', ')} — a cycle of length ${L}.\n${e} ÷ ${L} leaves remainder ${e % L}${e % L === 0 ? `, which means the LAST position in the cycle` : ''}, so ${base}${sup(e)} ends in the ${pos === 1 ? '1st' : pos === 2 ? '2nd' : pos === 3 ? '3rd' : `${pos}th`} digit of the cycle: **${ans}**.`;
    const prompt = `What is the units digit of ${base}${sup(e)}?`;
    const diff = (base > 10 ? 2 : 1) as 1 | 2;
    if (r() < 0.4) return { key: `${base}:${e}`, q: numeric({ prompt, answer: ans, explanation, difficulty: diff }) };
    const q = mc(r, {
      prompt,
      correct: n(ans, 'Find the cycle of units digits, then locate the exponent in it.'),
      wrong: [
        ...cyc.filter((c) => c !== ans).map((c) => n(c, `In the cycle for ${base % 10}, but at the wrong position — an off-by-one when mapping remainder ${e % L} to a position.`)),
        n(base % 10, 'The base’s own units digit — only right when the exponent lands on position 1.'),
        n(e % 10, 'The exponent’s units digit has nothing to do with the answer.'),
        ...[0, 1, 5, 6].map((x) => n(x, 'Not in the cycle of units digits for this base.')),
      ],
      explanation,
      difficulty: diff,
    });
    return q && { key: `${base}:${e}`, q };
  },
};

const consecutive: Generator = {
  id: 'int-consecutive',
  track: 'quant',
  topic: 'Consecutive integers',
  lessonId: 'gre-integers',
  count: 100,
  variants: true,
  make(r) {
    const kind = pick(r, ['', 'even ', 'odd '] as const);
    const step = kind ? 2 : 1;
    const k = ri(r, 3, 9);
    let first = ri(r, -10, 60);
    if (kind === 'even ' && first % 2 !== 0) first++;
    if (kind === 'odd ' && Math.abs(first % 2) !== 1) first++;
    const nums = Array.from({ length: k }, (_, i) => first + i * step);
    const S = nums.reduce((a, b) => a + b, 0);
    const last = nums[k - 1];
    const avg = S / k;
    const askSmall = r() < 0.4;
    const ans = askSmall ? first : last;
    const q = mc(r, {
      prompt: `The sum of ${k} consecutive ${kind}integers is ${fmt(S)}. What is the ${askSmall ? 'least' : 'greatest'} of these integers?`,
      correct: n(ans, 'Average = sum ÷ count = the middle term; then step out to the end.'),
      wrong: [
        n(avg, 'That is the average — the MIDDLE of the list, not an end.'),
        n(askSmall ? last : first, `That is the ${askSmall ? 'greatest' : 'least'} one — read which end the question asks for.`),
        n(askSmall ? first - step : last + step, 'One step too far — count the terms from the middle carefully.'),
        n(askSmall ? first + step : last - step, 'One step short of the end.'),
        ...nearMisses(ans, fmt, [2 * step + 1, -2 * step - 1, 3]),
      ].filter((o) => Number.isInteger(o.value)),
      explanation: `For evenly spaced numbers, the average equals the middle term: ${fmt(S)} ÷ ${k} = ${fmt(avg)}.\n${k % 2 === 1 ? `With ${k} terms, ${fmt(avg)} is the middle one, with ${(k - 1) / 2} terms on each side.` : `With an even count (${k}), the average sits halfway between the two middle terms.`}\nThe list is ${nums.map(fmt).join(', ')}, so the ${askSmall ? 'least' : 'greatest'} is **${fmt(ans)}**.`,
      difficulty: (kind ? 2 : 1) as 1 | 2,
    });
    return q && { key: `${kind}:${k}:${first}:${askSmall}`, q };
  },
};

// Parity / sign "must be" questions, decided by brute force over allowed values.
type Expr = { t: string; f: (x: number, y: number) => number };
const PARITY_EXPRS: Expr[] = [
  { t: 'x + y', f: (x, y) => x + y },
  { t: 'xy', f: (x, y) => x * y },
  { t: 'x²', f: (x) => x * x },
  { t: 'y²', f: (_, y) => y * y },
  { t: 'x² + y', f: (x, y) => x * x + y },
  { t: 'x + y²', f: (x, y) => x + y * y },
  { t: '3x + y', f: (x, y) => 3 * x + y },
  { t: 'x + 2y', f: (x, y) => x + 2 * y },
  { t: 'xy + 1', f: (x, y) => x * y + 1 },
  { t: 'x(y + 1)', f: (x, y) => x * (y + 1) },
  { t: '(x + 1)(y + 1)', f: (x, y) => (x + 1) * (y + 1) },
  { t: 'x² + y²', f: (x, y) => x * x + y * y },
  { t: '2x + 3y', f: (x, y) => 2 * x + 3 * y },
  { t: 'x − y', f: (x, y) => x - y },
  { t: 'x³ + y', f: (x, y) => x ** 3 + y },
  { t: 'xy + x', f: (x, y) => x * y + x },
];
const SIGN_EXPRS: Expr[] = [
  { t: 'xy', f: (x, y) => x * y },
  { t: 'x − y', f: (x, y) => x - y },
  { t: 'y − x', f: (x, y) => y - x },
  { t: 'x + y', f: (x, y) => x + y },
  { t: 'x²y', f: (x, y) => x * x * y },
  { t: 'xy²', f: (x, y) => x * y * y },
  { t: 'x³', f: (x) => x ** 3 },
  { t: 'y/x', f: (x, y) => y / x },
  { t: 'x² − y²', f: (x, y) => x * x - y * y },
  { t: '−x', f: (x) => -x },
  { t: 'x²', f: (x) => x * x },
  { t: '(x − y)²', f: (x, y) => (x - y) ** 2 },
  { t: 'x/y − 1', f: (x, y) => x / y - 1 },
  { t: 'x³y', f: (x, y) => x ** 3 * y },
];

const parityValues = (odd: boolean) =>
  Array.from({ length: 21 }, (_, i) => i - 10).filter((v) => Math.abs(v % 2) === (odd ? 1 : 0));

const paritySign: Generator = {
  id: 'int-parity-sign',
  track: 'quant',
  topic: 'Odd/even & sign rules',
  lessonId: 'gre-integers',
  count: 100,
  make(r) {
    if (r() < 0.55) {
      const xOdd = r() < 0.5;
      const yOdd = r() < 0.5;
      const target = pick(r, ['odd', 'even'] as const);
      const xs = parityValues(xOdd);
      const ys = parityValues(yOdd);
      const exprs = sample(r, PARITY_EXPRS, 5);
      const verdict = exprs.map((e) => {
        let always = true;
        for (const x of xs) for (const y of ys) if ((Math.abs(e.f(x, y)) % 2 === 1) !== (target === 'odd')) always = false;
        return always;
      });
      const nOk = verdict.filter(Boolean).length;
      if (nOk === 0 || nOk === 5) return null;
      const q = multi(r, {
        prompt: `If x is ${xOdd ? 'an odd' : 'an even'} integer and y is ${yOdd ? 'an odd' : 'an even'} integer, which of the following must be ${target}?\n\nIndicate all such expressions.`,
        options: exprs.map((e, i) => ({
          text: e.t,
          correct: verdict[i],
          note: verdict[i]
            ? `Always ${target} — try x = ${xOdd ? 1 : 2}, y = ${yOdd ? 1 : 2}: ${e.t} = ${e.f(xOdd ? 1 : 2, yOdd ? 1 : 2)}.`
            : `Not always ${target}: with x = ${xOdd ? 1 : 2}, y = ${yOdd ? 1 : 2} it equals ${e.f(xOdd ? 1 : 2, yOdd ? 1 : 2)}.`,
        })),
        keepOrder: false,
        explanation: `Parity only depends on odd/even, so test the simplest values: x = ${xOdd ? 1 : 2}, y = ${yOdd ? 1 : 2}. Rules: odd × anything even = even; odd × odd = odd; odd ± odd = even; even ± anything keeps that thing’s parity. A "must be" answer has to hold for EVERY allowed x and y — a single counterexample eliminates it.`,
        difficulty: 2,
      });
      return q && { key: `p:${xOdd}:${yOdd}:${target}:${exprs.map((e) => e.t).sort().join('|')}`, q };
    }
    const target = pick(r, ['positive', 'negative'] as const);
    const case_ = pick(r, ['x < 0 < y', 'x < y < 0', '0 < x < y'] as const);
    const samples: [number, number][] = [];
    const vals = [-7, -3, -2, -1, -0.5, -0.25, 0.25, 0.5, 1, 2, 3, 7];
    for (const x of vals)
      for (const y of vals) {
        const ok = case_ === 'x < 0 < y' ? x < 0 && y > 0 : case_ === 'x < y < 0' ? x < y && y < 0 : x > 0 && y > x;
        if (ok) samples.push([x, y]);
      }
    const exprs = sample(r, SIGN_EXPRS, 5);
    const verdict = exprs.map((e) => samples.every(([x, y]) => (target === 'positive' ? e.f(x, y) > 0 : e.f(x, y) < 0)));
    const nOk = verdict.filter(Boolean).length;
    if (nOk === 0 || nOk === 5) return null;
    const [sx, sy] = case_ === 'x < 0 < y' ? [-2, 3] : case_ === 'x < y < 0' ? [-3, -2] : [2, 3];
    const q = multi(r, {
      prompt: `If ${case_}, which of the following must be ${target}?\n\nIndicate all such expressions.`,
      options: exprs.map((e, i) => {
        const counter = samples.find(([x, y]) => !(target === 'positive' ? e.f(x, y) > 0 : e.f(x, y) < 0));
        return {
          text: e.t,
          correct: verdict[i],
          note: verdict[i]
            ? `Always ${target} under ${case_} (e.g. x = ${sx}, y = ${sy} gives ${fmt(e.f(sx, sy))}).`
            : counter
              ? `Fails for x = ${fmt(counter[0])}, y = ${fmt(counter[1])}: ${e.t} = ${fmt(e.f(counter[0], counter[1]))}.`
              : 'Not always.',
        };
      }),
      explanation: `Track signs, not sizes: under ${case_}, x is ${case_.startsWith('x < 0') || case_.startsWith('x < y < 0') ? 'negative' : 'positive'} and y is ${case_ === '0 < x < y' || case_ === 'x < 0 < y' ? 'positive' : 'negative'}. Even powers are positive; odd powers keep the sign; a product/quotient is negative exactly when an odd number of factors are negative. For sums and differences, check the ORDER of the numbers too — and test fractions between −1 and 1, where squaring makes things smaller.`,
      difficulty: 2,
    });
    return q && { key: `s:${case_}:${target}:${exprs.map((e) => e.t).sort().join('|')}`, q };
  },
};

const primes: Generator = {
  id: 'int-primes',
  track: 'quant',
  topic: 'Primes',
  lessonId: 'gre-integers',
  count: 90,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const lo = ri(r, 1, 80);
      const hi = lo + ri(r, 12, 30);
      const ps: number[] = [];
      for (let x = lo + 1; x < hi; x++) if (isPrime(x)) ps.push(x);
      const traps = [];
      for (let x = lo + 1; x < hi; x++) if (!isPrime(x) && x % 2 && x % 5 && x > 1) traps.push(x);
      const ans = ps.length;
      const q = mc(r, {
        prompt: `How many prime numbers are greater than ${lo} and less than ${hi}?`,
        correct: n(ans, 'List them and check each odd candidate.'),
        wrong: [
          n(ans + traps.filter((t) => t % 3 !== 0).length, `Counting look-alike composites such as ${traps.filter((t) => t % 3 !== 0).slice(0, 2).join(' and ') || 'odd non-primes'} as prime.`),
          n(ans + 1, lo < 2 ? 'Counting 1 as prime — it is not.' : 'Counting one boundary number or one composite too many.'),
          n(ans - 1, 'Missing one prime in the range.'),
          n(ans + traps.length, 'Counting every odd number not ending in 5 as prime.'),
          ...nearMisses(ans, fmt, [2, -2, 3]),
        ].filter((o) => o.value! >= 0),
        explanation: `Check each odd number between ${lo} and ${hi} (2 is the only even prime) for divisibility by 3, 5, 7 (up to √${hi}).\nPrimes: ${ps.join(', ') || 'none'}. That is **${ans}**.${traps.length ? `\nLook-alikes that are NOT prime: ${traps.map((t) => `${t} = ${factorStr(factorize(t))}`).join(', ')}.` : ''}`,
        difficulty: 2,
      });
      return q && { key: `c:${lo}:${hi}`, q };
    }
    const N = ri(r, 30, 999);
    const f = factorize(N);
    if (f.length < 2) return null;
    const distinct = f.map(([p]) => p);
    if (style === 1) {
      const ans = distinct.reduce((a, b) => a + b, 0);
      const withRep = f.reduce((a, [p, e]) => a + p * e, 0);
      const q = mc(r, {
        prompt: `What is the sum of the distinct prime factors of ${fmt(N)}?`,
        correct: n(ans, 'Each prime counted once.'),
        wrong: [
          n(withRep, 'Counting repeated primes more than once — "distinct" means each prime once.'),
          n(Math.max(...distinct), 'That is only the largest prime factor.'),
          n(ans + 1, 'Adding 1 — but 1 is not prime.'),
          n(distinct.length, 'That is how MANY distinct primes there are, not their sum.'),
          ...nearMisses(ans, fmt, [2, -2, 4]),
        ],
        explanation: `${fmt(N)} = ${factorStr(f)}. The distinct primes are ${distinct.join(', ')}; their sum is **${ans}**.`,
        difficulty: 1,
      });
      return q && { key: `s:${N}`, q };
    }
    const ans = Math.max(...distinct);
    return {
      key: `g:${N}`,
      q: numeric({
        prompt: `What is the greatest prime factor of ${fmt(N)}?`,
        answer: ans,
        explanation: `Divide out small primes: ${fmt(N)} = ${factorStr(f)}. The greatest prime factor is **${ans}**.`,
        difficulty: ans > 30 ? 2 : 1,
      }),
    };
  },
};

// -----------------------------------------------------------------------------
// Exponents & roots

const POW_BASES: [number, number, number][] = [
  // [composite, prime base, power]
  [4, 2, 2], [8, 2, 3], [16, 2, 4], [32, 2, 5], [9, 3, 2], [27, 3, 3], [81, 3, 4], [25, 5, 2], [125, 5, 3], [49, 7, 2],
];

const expRules: Generator = {
  id: 'exp-rules',
  track: 'quant',
  topic: 'Exponent rules',
  lessonId: 'gre-exponents-roots',
  count: 120,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      // p^a · C^b = p^x
      const [C, p, k] = pick(r, POW_BASES);
      const a = ri(r, 1, 9);
      const b = ri(r, 1, 6);
      const ans = a + k * b;
      const q = mc(r, {
        prompt: `If ${p}${sup(a)} × ${C}${sup(b)} = ${p}${'ˣ'}, what is the value of x?`,
        correct: n(ans, `Rewrite ${C} as ${p}${sup(k)} so the bases match, then add exponents.`),
        wrong: [
          n(a + b, `Adds exponents without converting ${C} to base ${p}.`),
          n(a * k * b, 'Multiplies the exponents instead of adding them.'),
          n(k * (a + b), `Converts the whole product instead of just the ${C}.`),
          n(a + k + b, `Adds the ${k} instead of multiplying: (${p}${sup(k)})${sup(b)} = ${p}${sup(k * b)}.`),
          ...nearMisses(ans, fmt, [1, -1, 2]),
        ],
        explanation: `${C} = ${p}${sup(k)}, so ${C}${sup(b)} = (${p}${sup(k)})${sup(b)} = ${p}${sup(k * b)} (power of a power → multiply).\nNow ${p}${sup(a)} × ${p}${sup(k * b)} = ${p}${sup(a + k * b)} (same base, multiplying → add exponents).\nSo x = **${ans}**.`,
        difficulty: 1,
      });
      return q && { key: `0:${C}:${a}:${b}`, q };
    }
    if (style === 1) {
      // (x^a)^b · x^c / x^d = x^?
      const a = ri(r, 2, 5);
      const b = ri(r, 2, 4);
      const c = ri(r, 1, 7);
      const d = ri(r, 1, 9);
      const ans = a * b + c - d;
      const q = mc(r, {
        prompt: `For x ≠ 0, (x${sup(a)})${sup(b)} · x${sup(c)} / x${sup(d)} is equal to which of the following?`,
        correct: { text: `x${sup(ans)}`, value: ans, note: 'Multiply for a power of a power, add when multiplying, subtract when dividing.' },
        wrong: [
          { text: `x${sup(a + b + c - d)}`, value: a + b + c - d, note: `Adds a and b — but (x${sup(a)})${sup(b)} = x${sup(a * b)}.` },
          { text: `x${sup(a * b * c - d)}`, value: a * b * c - d, note: 'Multiplies when it should add (x^m · x^n = x^(m+n)).' },
          { text: `x${sup(a * b + c + d)}`, value: a * b + c + d, note: 'Adds the exponent in the denominator instead of subtracting it.' },
          { text: `x${sup(Math.round((a * b + c) / d))}`, value: (a * b + c) / d + 0.01, note: 'Divides the exponents — dividing powers SUBTRACTS exponents.' },
          { text: `x${sup(ans + 1)}`, value: ans + 1, note: 'Off by one — recount each step.' },
          { text: `x${sup(ans - 2)}`, value: ans - 2, note: 'Off by two — recount each step.' },
        ],
        explanation: `(x${sup(a)})${sup(b)} = x${sup(a * b)}. Then x${sup(a * b)} · x${sup(c)} = x${sup(a * b + c)}. Dividing by x${sup(d)} subtracts: x${sup(a * b + c - d)}.\nAnswer: **x${sup(ans)}**.`,
        difficulty: 1,
      });
      return q && { key: `1:${a}:${b}:${c}:${d}`, q };
    }
    // 2^n + 2^n + ... (k copies) = 2^?
    const p = pick(r, [2, 3, 5]);
    const e = ri(r, 3, 30);
    const k = p;
    const copies = Array.from({ length: k }, () => `${p}${sup(e)}`).join(' + ');
    const q = mc(r, {
      prompt: `${copies} = ${p}ˣ. What is x?`,
      correct: n(e + 1, `${k} copies of ${p}${sup(e)} = ${p} × ${p}${sup(e)} = ${p}${sup(e + 1)}.`),
      wrong: [
        n(e * k, 'Adding identical powers does not multiply the exponent.'),
        n(e + k, `Adding ${k} to the exponent — the ${k} copies multiply by ${k} = ${p}¹, which adds 1.`),
        n(e, 'Ignores that there are several copies.'),
        n(e ** 2, 'Squares the exponent — no rule does that here.'),
        n(e + 2, 'One too many.'),
      ],
      explanation: `Adding ${k} identical terms is multiplying by ${k}: ${k} × ${p}${sup(e)}. Since ${k} = ${p}¹, that is ${p}¹ × ${p}${sup(e)} = ${p}${sup(e + 1)}. So x = **${e + 1}**. (Exponent rules work for products, never for sums — so turn the sum into a product first.)`,
      difficulty: 2,
    });
    return q && { key: `2:${p}:${e}`, q };
  },
};

const expSolve: Generator = {
  id: 'exp-solve',
  track: 'quant',
  topic: 'Solving exponential equations',
  lessonId: 'gre-exponents-roots',
  count: 100,
  variants: true,
  make(r) {
    if (r() < 0.5) {
      // p^(ax + b) = p^k shown as a power value
      const p = pick(r, [2, 3, 5]);
      const k = p === 2 ? ri(r, 3, 10) : p === 3 ? ri(r, 2, 6) : ri(r, 2, 4);
      const a = ri(r, 1, 3);
      const b = ri(r, -3, 3);
      if ((k - b) % a !== 0) return null;
      const x = (k - b) / a;
      const lhs = `${p}^(${a === 1 ? '' : a}x${b ? (b > 0 ? ` + ${b}` : ` − ${-b}`) : ''})`;
      return {
        key: `a:${p}:${k}:${a}:${b}`,
        q: numeric({
          prompt: `If ${lhs} = ${fmt(p ** k)}, what is the value of x?`,
          answer: x,
          explanation: `Write ${fmt(p ** k)} as a power of ${p}: ${fmt(p ** k)} = ${p}${sup(k)}.\nSame base on both sides → exponents are equal: ${a === 1 ? '' : a}x${b ? (b > 0 ? ` + ${b}` : ` − ${-b}`) : ''} = ${k}.\nSo x = **${fmt(x)}**.`,
          difficulty: 1,
        }),
      };
    }
    // (C1)^(x + a) = (C2)^(x + b) with C1 = p^m, C2 = p^n
    const p = pick(r, [2, 3]);
    const pows = POW_BASES.filter(([, pp]) => pp === p);
    const [[C1, , m], [C2, , nn]] = sample(r, pows, 2);
    const a = ri(r, -4, 5);
    const b = ri(r, -4, 5);
    // m(x + a) = n(x + b) → (m − n)x = nb − ma
    if (m === nn || (nn * b - m * a) % (m - nn) !== 0) return null;
    const x = (nn * b - m * a) / (m - nn);
    const sh = (c: number) => (c ? (c > 0 ? ` + ${c}` : ` − ${-c}`) : '');
    const q = mc(r, {
      prompt: `If ${C1}^(x${sh(a)}) = ${C2}^(x${sh(b)}), what is the value of x?`,
      correct: n(x, `Convert both sides to base ${p}, then set exponents equal.`),
      wrong: [
        n(b - a === 0 ? 1 : b - a, 'Sets x + a = x + b style without converting the bases first.'),
        n(-x, 'Sign slip when moving terms across.'),
        n(x + 1, 'Arithmetic slip in the linear equation.'),
        n(x - 2, 'Arithmetic slip in the linear equation.'),
        n(2 * x + 1, 'Distributed the outer exponent to only one term.'),
        n(x + 3, 'Arithmetic slip.'),
      ],
      explanation: `${C1} = ${p}${sup(m)} and ${C2} = ${p}${sup(nn)}.\nLeft: ${p}^(${m}(x${sh(a)})); right: ${p}^(${nn}(x${sh(b)})).\nSet exponents equal: ${m}x${sh(m * a)} = ${nn}x${sh(nn * b)} → ${m - nn}x = ${nn * b - m * a} → x = **${fmt(x)}**.`,
      difficulty: 2,
    });
    return q && { key: `b:${C1}:${C2}:${a}:${b}`, q };
  },
};

function simplifyRoot(N: number): [number, number] {
  let out = 1;
  let inside = N;
  for (let k = Math.floor(Math.sqrt(N)); k >= 2; k--) {
    if (inside % (k * k) === 0) {
      out *= k;
      inside /= k * k;
      k = Math.floor(Math.sqrt(inside)) + 1;
    }
  }
  return [out, inside];
}
const rootStr = (c: number, s: number) => (s === 1 ? `${c}` : c === 1 ? `√${s}` : `${c}√${s}`);

const roots: Generator = {
  id: 'roots',
  track: 'quant',
  topic: 'Roots & radicals',
  lessonId: 'gre-exponents-roots',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const s = pick(r, [2, 3, 5, 6, 7, 10]);
      const c = ri(r, 2, 9);
      const N = c * c * s;
      const [oc, os] = simplifyRoot(N);
      const q = mc(r, {
        prompt: `Which of the following is equal to √${N}?`,
        correct: { text: rootStr(oc, os), value: oc * Math.sqrt(os), note: `Pull out the largest perfect-square factor: ${N} = ${oc * oc} × ${os}.` },
        wrong: [
          { text: rootStr(os, oc * oc), value: os * Math.sqrt(oc * oc) + 0.001, note: 'Inside and outside swapped.' },
          { text: rootStr(oc * oc, os), value: oc * oc * Math.sqrt(os), note: `Pulled out ${oc * oc} instead of √${oc * oc} = ${oc}.` },
          { text: rootStr(Math.floor(N / 2), 2), value: Math.floor(N / 2) * Math.sqrt(2), note: 'Pulled out a factor that is not a perfect square.' },
          { text: rootStr(oc + 1, os), value: (oc + 1) * Math.sqrt(os), note: 'Off by one outside the radical.' },
          { text: rootStr(oc - 1 || 1, os + 1), value: (oc - 1 || 1) * Math.sqrt(os + 1) + 0.002, note: 'Not equal — square it to check.' },
        ],
        explanation: `${N} = ${oc * oc} × ${os}, and ${oc * oc} is a perfect square, so √${N} = √${oc * oc} × √${os} = **${rootStr(oc, os)}**.\nCheck by squaring: (${rootStr(oc, os)})² = ${oc * oc} × ${os} = ${N}.`,
        difficulty: 1,
      });
      return q && { key: `s:${N}`, q };
    }
    if (style === 1) {
      const N = ri(r, 11, 399);
      const lo = Math.floor(Math.sqrt(N));
      if (lo * lo === N) return null;
      const q = mc(r, {
        prompt: `√${N} is between which two consecutive integers?`,
        correct: { text: `${lo} and ${lo + 1}`, value: lo, note: `${lo}² = ${lo * lo} < ${N} < ${(lo + 1) ** 2} = ${lo + 1}².` },
        wrong: [
          { text: `${lo - 1} and ${lo}`, value: lo - 1, note: 'One pair too low.' },
          { text: `${lo + 1} and ${lo + 2}`, value: lo + 1, note: 'One pair too high.' },
          { text: `${Math.floor(N / 2)} and ${Math.floor(N / 2) + 1}`, value: Math.floor(N / 2) + 0.5, note: 'Halving is not square-rooting.' },
          { text: `${lo - 2} and ${lo - 1}`, value: lo - 2, note: 'Too low.' },
          { text: `${lo + 2} and ${lo + 3}`, value: lo + 2, note: 'Too high.' },
        ].filter((o) => o.value > 0 && o.value !== lo + 0.5),
        explanation: `Bracket ${N} between perfect squares: ${lo}² = ${lo * lo} and ${lo + 1}² = ${(lo + 1) ** 2}. Since ${lo * lo} < ${N} < ${(lo + 1) ** 2}, √${N} is between **${lo} and ${lo + 1}**.`,
        difficulty: 1,
      });
      return q && { key: `b:${N}`, q };
    }
    // (√a + √b)² = a + b + 2√(ab)
    const a = ri(r, 2, 12);
    const b = ri(r, 2, 12);
    if (a >= b || Number.isInteger(Math.sqrt(a)) || Number.isInteger(Math.sqrt(b))) return null;
    const [c, s] = simplifyRoot(a * b);
    const mid = rootStr(2 * c, s);
    const q = mc(r, {
      prompt: `(√${a} + √${b})² = ?`,
      correct: { text: `${a + b} + ${mid}`, note: 'Square of a sum: first² + 2·first·second + second².' },
      wrong: [
        { text: `${a + b}`, note: 'Squaring a sum is not the sum of squares — the middle term 2√(ab) is missing.' },
        { text: `${a + b} + ${rootStr(c, s)}`, note: 'Forgot the 2 in the middle term.' },
        { text: `${a * b}`, note: 'Multiplied instead of expanding.' },
        { text: `${a + b} + ${2 * a * b}`, note: 'Dropped the radical from the middle term: 2√(ab), not 2ab.' },
        { text: `${2 * (a + b)}`, note: 'Doubled instead of squaring.' },
      ],
      explanation: `(√${a} + √${b})² = (√${a})² + 2√${a}√${b} + (√${b})² = ${a} + 2√${a * b} + ${b}.\n${s !== a * b ? `Simplify √${a * b} = ${rootStr(c, s)}, so ` : ''}the result is **${a + b} + ${mid}**.`,
      difficulty: 2,
    });
    return q && { key: `e:${a}:${b}`, q };
  },
};

const sciNotation: Generator = {
  id: 'sci-notation',
  track: 'quant',
  topic: 'Scientific notation',
  lessonId: 'gre-fractions-decimals',
  count: 60,
  variants: true,
  make(r) {
    const a = ri(r, 2, 9);
    const b = ri(r, 2, 9);
    const c = pick(r, [2, 4, 5, 8]);
    const m = ri(r, -6, 9);
    const nExp = ri(r, -6, 9);
    const p = ri(r, -5, 6);
    const coef = (a * b) / c;
    if (!Number.isInteger(coef * 10)) return null;
    let mant = coef;
    let e = m + nExp - p;
    while (mant >= 10) {
      mant /= 10;
      e++;
    }
    while (mant < 1) {
      mant *= 10;
      e--;
    }
    const s = (x: number, ex: number) => `${fmt(x)} × 10${sup(ex)}`;
    const q = mc(r, {
      prompt: `(${a} × 10${sup(m)})(${b} × 10${sup(nExp)}) / (${c} × 10${sup(p)}) = ?`,
      correct: { text: s(mant, e), note: 'Multiply/divide the coefficients, add/subtract the powers of 10, then renormalize.' },
      wrong: [
        { text: s(mant, e + 1), note: 'Powers of ten off by one — check the renormalizing step.' },
        { text: s(mant, e - 1), note: 'Powers of ten off by one — check the renormalizing step.' },
        { text: s(mant, m + nExp + p + (e - (m + nExp - p))), note: 'Added the denominator’s exponent instead of subtracting it.' },
        { text: s(mant, -e), note: 'Sign error on the exponent.' },
        { text: s(mant * 2 >= 10 ? mant / 5 : mant * 2, e), note: 'Coefficient arithmetic slip.' },
      ],
      explanation: `Coefficients: ${a} × ${b} ÷ ${c} = ${fmt(coef)}. Powers of ten: 10^(${m} + ${nExp} − ${p}) = 10${sup(m + nExp - p)}.\nSo the product is ${fmt(coef)} × 10${sup(m + nExp - p)} = **${s(mant, e)}** (the coefficient must be at least 1 and less than 10).`,
      difficulty: 2,
    });
    return q && { key: `${a}:${b}:${c}:${m}:${nExp}:${p}`, q };
  },
};

// -----------------------------------------------------------------------------
// Fractions & ordering

const fractionArith: Generator = {
  id: 'fraction-arith',
  track: 'quant',
  topic: 'Fraction arithmetic',
  lessonId: 'gre-fractions-decimals',
  count: 100,
  variants: true,
  make(r) {
    const den = [2, 3, 4, 5, 6, 8, 9, 10, 12];
    const f = () => {
      const d = pick(r, den);
      return [ri(r, 1, d - 1), d] as [number, number];
    };
    const [a, b] = f();
    const [c, d] = f();
    const [e, g] = f();
    const op = pick(r, ['+', '−'] as const);
    const numr = op === '+' ? a * d + c * b : a * d - c * b;
    const denr = b * d;
    if (numr === 0) return null;
    // (a/b ± c/d) ÷ (e/g)
    const N = numr * g;
    const D = denr * e;
    const val = N / D;
    const L = lcm(b, d);
    return {
      key: `${a}/${b}${op}${c}/${d}÷${e}/${g}`,
      q: numeric({
        prompt: `(${a}/${b} ${op} ${c}/${d}) ÷ ${e}/${g} = ?\n\nGive your answer as a fraction.`,
        answer: val,
        display: frac(N, D),
        fraction: true,
        explanation: `Common denominator ${L}: ${a}/${b} = ${(a * L) / b}/${L} and ${c}/${d} = ${(c * L) / d}/${L}, so the parentheses equal ${frac(numr, denr)}.\nDividing by ${e}/${g} means multiplying by its reciprocal ${g}/${e}: ${frac(numr, denr)} × ${g}/${e} = **${frac(N, D)}**.\n(On the GRE any equivalent fraction is accepted — it does not have to be reduced.)`,
        difficulty: 2,
      }),
    };
  },
};

const orderNumbers: Generator = {
  id: 'order-numbers',
  track: 'quant',
  topic: 'Comparing fractions & decimals',
  lessonId: 'gre-fractions-decimals',
  count: 80,
  make(r) {
    const want = pick(r, ['greatest', 'least'] as const);
    const pool: Opt[] = [];
    const used = new Set<string>();
    while (pool.length < 5) {
      const t = ri(r, 0, 3);
      let o: Opt;
      if (t === 0) {
        const d = ri(r, 3, 13);
        const nn = ri(r, 1, d - 1);
        if (gcd(nn, d) !== 1) continue;
        o = { text: `${nn}/${d}`, value: nn / d, note: `${nn}/${d} ≈ ${(nn / d).toFixed(3)}` };
      } else if (t === 1) {
        const v = ri(r, 10, 95) / 100;
        o = { text: fmt(v), value: v, note: `${fmt(v)} is already a decimal.` };
      } else if (t === 2) {
        const v = ri(r, 2, 9) / 10;
        o = { text: `(${fmt(v)})²`, value: v * v, note: `(${fmt(v)})² = ${fmt(v * v)} — squaring a number between 0 and 1 makes it SMALLER.` };
      } else {
        const v = pick(r, [0.04, 0.09, 0.16, 0.25, 0.36, 0.49, 0.64, 0.81]);
        o = { text: `√${fmt(v)}`, value: Math.sqrt(v), note: `√${fmt(v)} = ${fmt(Math.sqrt(v))} — the root of a number between 0 and 1 is LARGER than it.` };
      }
      if (used.has(o.text)) continue;
      used.add(o.text);
      pool.push(o);
    }
    const vals = pool.map((o) => o.value!);
    const target = want === 'greatest' ? Math.max(...vals) : Math.min(...vals);
    const sorted = [...vals].sort((a, b) => a - b);
    if (sorted.some((v, i) => i && v - sorted[i - 1] < 0.004)) return null; // too close to call cleanly
    const correct = pool.find((o) => o.value === target)!;
    const q = mc(r, {
      prompt: `Which of the following is ${want}?`,
      correct: { ...correct, value: undefined },
      wrong: pool.filter((o) => o !== correct).map((o) => ({ ...o, value: undefined })),
      explanation: `Convert everything to decimals: ${pool.map((o) => `${o.text} ≈ ${o.value!.toFixed(3)}`).join('; ')}.\nThe ${want} is **${correct.text}**.`,
      difficulty: 2,
    });
    return q && { key: `${want}:${pool.map((o) => o.text).sort().join('|')}`, q };
  },
};

export const ARITHMETIC: Generator[] = [
  divisorCount,
  gcdLcm,
  remainders,
  unitsDigit,
  consecutive,
  paritySign,
  primes,
  expRules,
  expSolve,
  roots,
  sciNotation,
  fractionArith,
  orderNumbers,
];

// silence unused-helper lint in case a generator is removed
void shuffle;
export type { Rng };
