// Word-problem machinery: percents, successive changes, reverse percents,
// interest, fractions of a remainder, ratios, proportions, rates, work, and
// mixtures.

import {
  type Generator,
  type Opt,
  NAMES,
  fmt,
  frac,
  gcd,
  mc,
  money,
  nearMisses,
  numeric,
  pick,
  ri,
  sample,
} from '../engine.ts';

const n = (x: number, note: string): Opt => ({ text: fmt(x), value: x, note });
const pct = (x: number, note: string): Opt => ({ text: `${fmt(x)}%`, value: x, note });
const usd = (x: number, note: string): Opt => ({ text: money(x), value: x, note });
const round1 = (x: number) => Math.round(x * 10) / 10;
const clean = (x: number, places = 2) => Math.abs(x * 10 ** places - Math.round(x * 10 ** places)) < 1e-9;

const PCTS = [5, 10, 12.5, 15, 20, 25, 30, 40, 50, 60, 75, 80];

// -----------------------------------------------------------------------------

const pctOf: Generator = {
  id: 'pct-of',
  track: 'quant',
  topic: 'Percent of / what percent',
  lessonId: 'gre-percents',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 3);
    if (style === 0) {
      const a = pick(r, [10, 20, 25, 40, 50, 60, 75, 80, 120, 150]);
      const b = pick(r, [5, 10, 20, 25, 30, 40, 50, 60]);
      const c = pick(r, [40, 60, 80, 120, 200, 240, 300, 400, 600, 800, 1200]);
      const ans = (a / 100) * (b / 100) * c;
      if (!clean(ans, 1)) return null;
      return {
        key: `0:${a}:${b}:${c}`,
        q: numeric({
          prompt: `What is ${a}% of ${b}% of ${fmt(c)}?`,
          answer: ans,
          explanation: `"Of" means multiply; a percent is a fraction over 100.\n${a}% of ${b}% of ${fmt(c)} = ${a / 100} × ${b / 100} × ${fmt(c)} = **${fmt(ans)}**.\nOrder doesn’t matter — ${b}% of ${fmt(c)} is ${fmt((b / 100) * c)}, and ${a}% of that is ${fmt(ans)}.`,
          difficulty: 1,
        }),
      };
    }
    if (style === 1) {
      const y = pick(r, [20, 25, 40, 50, 60, 75, 80, 120, 125, 150, 160, 200, 240, 250, 400]);
      const x = ri(r, 2, Math.round(y * 1.6));
      const p = (100 * x) / y;
      if (!clean(p, 1) || x === y) return null;
      return {
        key: `1:${x}:${y}`,
        q: numeric({
          prompt: `${fmt(x)} is what percent of ${fmt(y)}?`,
          answer: p,
          suffix: '%',
          explanation: `Percent = part ÷ whole × 100. The whole is the number after "of": ${fmt(x)} ÷ ${fmt(y)} × 100 = **${fmt(p)}%**.${p > 100 ? '\nMore than 100% is fine — the part is bigger than the whole.' : ''}`,
          difficulty: p > 100 ? 2 : 1,
        }),
      };
    }
    if (style === 2) {
      const p = pick(r, PCTS);
      const N = ri(r, 2, 60) * 8;
      const v = (p / 100) * N;
      if (!clean(v, 1)) return null;
      return {
        key: `2:${p}:${N}`,
        q: numeric({
          prompt: `${p}% of what number is ${fmt(v)}?`,
          answer: N,
          explanation: `Translate: (${p}/100) × N = ${fmt(v)}, so N = ${fmt(v)} ÷ ${p / 100} = **${fmt(N)}**.\nSanity check: ${p}% is ${p < 50 ? 'less than half' : p === 50 ? 'half' : 'more than half'}, so N should be ${p < 100 ? 'bigger' : 'smaller'} than ${fmt(v)}.`,
          difficulty: 1,
        }),
      };
    }
    const a = pick(r, [10, 20, 25, 30, 40, 50, 60, 75, 80]);
    const b = pick(r, [10, 15, 20, 25, 30, 40, 45, 50, 60]);
    if (a === b) return null;
    const ans = (100 * b) / a;
    if (!clean(ans, 1)) return null;
    const q = mc(r, {
      prompt: `If ${a}% of x is equal to ${b}% of y, where x and y are positive, then x is what percent of y?`,
      correct: pct(ans, `x/y = ${b}/${a}.`),
      wrong: [
        pct(round1((100 * a) / b), 'Flipped — that is y as a percent of x.'),
        pct(Math.abs(b - a), 'Subtracting the percents means nothing here.'),
        pct(round1((a * b) / 100), 'Multiplying the percents.'),
        pct(100 + b - a, 'Adding the difference to 100% — percents don’t combine additively like that.'),
        ...[5, -5, 10].map((d) => pct(round1(ans + d), 'Close, but set up the equation and solve for x/y exactly.')),
      ].filter((o) => o.value! > 0),
      explanation: `Write it as an equation: ${a / 100}x = ${b / 100}y. Divide both sides by y and by ${a / 100}: x/y = ${b / 100} ÷ ${a / 100} = ${b}/${a}.\nAs a percent: ${b}/${a} × 100 = **${fmt(ans)}%**.`,
      difficulty: 2,
    });
    return q && { key: `3:${a}:${b}`, q };
  },
};

const CHANGE_CTX = [
  { what: 'the price of a jacket', m: true },
  { what: 'the monthly rent on an apartment', m: true },
  { what: 'the population of a town', m: false },
  { what: 'the enrollment at a college', m: false },
  { what: 'the number of subscribers to a newsletter', m: false },
  { what: 'the cost of a train ticket', m: true },
  { what: 'the number of employees at a startup', m: false },
  { what: 'a company’s annual revenue, in thousands of dollars,', m: false },
] as const;

const pctChange: Generator = {
  id: 'pct-change',
  track: 'quant',
  topic: 'Percent change',
  lessonId: 'gre-percents',
  count: 130,
  variants: true,
  make(r) {
    const ctx = pick(r, CHANGE_CTX);
    const p = pick(r, [...PCTS, 35, 45, 120, 150]);
    const up = p > 100 || r() < 0.55;
    const A = ri(r, 2, 40) * (ctx.m ? 20 : 40);
    const B = up ? A * (1 + p / 100) : A * (1 - p / 100);
    if (!Number.isInteger(B) || B <= 0) return null;
    const f = ctx.m ? money : fmt;
    const wrongBase = (100 * Math.abs(B - A)) / B;
    const q = mc(r, {
      prompt: `${ctx.what[0].toUpperCase()}${ctx.what.slice(1)} ${up ? 'rose' : 'fell'} from ${f(A)} to ${f(B)}. By what percent did it ${up ? 'increase' : 'decrease'}?`,
      correct: pct(p, 'Change ÷ ORIGINAL value.'),
      wrong: [
        pct(round1(wrongBase), `Divides the change by the NEW value (${f(B)}) — percent change is always measured from the original.`),
        pct(round1((100 * B) / A), `That is the new value as a percent OF the original — the change is that minus 100%.`),
        pct(100 - p, 'The complement — what remains, not what changed.'),
        pct(round1(p / 2), 'Halved somewhere — recompute change ÷ original.'),
        pct(round1(p * 1.5), 'Recompute change ÷ original.'),
        ...nearMisses(p, (x) => `${fmt(x)}%`, [5, -5, 10]).map((o) => ({ ...o, value: o.value })),
      ].filter((o) => o.value! > 0 && o.value! !== p),
      explanation: `Percent change = (change ÷ original) × 100.\nChange = ${f(Math.abs(B - A))}; original = ${f(A)}.\n${f(Math.abs(B - A))} ÷ ${f(A)} = ${fmt(Math.abs(B - A) / A)} → **${fmt(p)}% ${up ? 'increase' : 'decrease'}**.\nThe classic trap is dividing by the new value (${fmt(round1(wrongBase))}%).`,
      difficulty: p > 100 || !Number.isInteger(p) ? 2 : 1,
    });
    return q && { key: `${ctx.what}:${A}:${B}`, q };
  },
};

const pctSuccessive: Generator = {
  id: 'pct-successive',
  track: 'quant',
  topic: 'Successive percent changes',
  lessonId: 'gre-percents',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const a = pick(r, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 100]);
      const b = pick(r, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75]);
      const final = 100 * (1 + a / 100) * (1 - b / 100);
      if (!clean(final, 1)) return null;
      const item = pick(r, ['a sweater', 'a share of stock', 'a painting', 'a used car', 'a concert ticket']);
      const q = mc(r, {
        prompt: `The price of ${item} is increased by ${a}%, and then the new price is decreased by ${b}%. The final price is what percent of the original price?`,
        correct: pct(round1(final), `Multiply the factors: ${1 + a / 100} × ${1 - b / 100}.`),
        wrong: [
          pct(100 + a - b, `Adds and subtracts the percents — but the ${b}% is taken of a DIFFERENT (larger) base.`),
          pct(round1(100 * (1 - a / 100) * (1 + b / 100)), 'Applied the increase and decrease in the wrong direction.'),
          pct(100, 'Assumes an increase and a decrease cancel — they never do unless the percents are chosen to.'),
          pct(round1(100 * (1 + (a - b) / 100) ** 2), 'Not a real step.'),
          ...nearMisses(round1(final), (x) => `${fmt(x)}%`, [2, -2, 4]),
        ],
        explanation: `Percent changes multiply. Start at 100:\n+${a}% → 100 × ${1 + a / 100} = ${fmt(100 + a)}\n−${b}% → ${fmt(100 + a)} × ${1 - b / 100} = ${fmt(final)}\nSo the final price is **${fmt(round1(final))}%** of the original.${a === b ? `\nNote: +${a}% then −${a}% is a net LOSS, because the decrease acts on a larger number.` : ''}`,
        difficulty: 2,
      });
      return q && { key: `0:${a}:${b}`, q };
    }
    if (style === 1) {
      const a = pick(r, [5, 10, 15, 20, 25, 30, 40, 50, 60]);
      const b = pick(r, [5, 10, 15, 20, 25, 30, 40, 50]);
      const total = 100 - 100 * (1 - a / 100) * (1 - b / 100);
      if (!clean(total, 1)) return null;
      const q = mc(r, {
        prompt: `A store marks a lamp down ${a}%, and a week later takes an additional ${b}% off the reduced price. The final price is equivalent to a single discount of what percent off the original price?`,
        correct: pct(round1(total), 'Remaining fractions multiply; the discount is 100% minus what remains.'),
        wrong: [
          pct(a + b, `Stacks the discounts additively — the second ${b}% comes off a smaller price, so it’s worth less.`),
          pct(round1(100 * (1 - a / 100) * (1 - b / 100)), 'That is the percent that REMAINS, not the discount.'),
          pct(round1((a * b) / 100), 'Multiplies the discounts themselves.'),
          pct(Math.max(a, b), 'Just the larger discount.'),
          ...nearMisses(round1(total), (x) => `${fmt(x)}%`, [3, -3]),
        ],
        explanation: `After ${a}% off, ${100 - a}% remains. After another ${b}% off, ${100 - b}% of THAT remains: ${1 - a / 100} × ${1 - b / 100} = ${fmt((1 - a / 100) * (1 - b / 100))}.\nSo ${fmt(100 * (1 - a / 100) * (1 - b / 100))}% of the price remains → a single discount of **${fmt(round1(total))}%** (not ${a + b}%).`,
        difficulty: 2,
      });
      return q && { key: `1:${a}:${b}`, q };
    }
    const a = pick(r, [5, 10, 20, 25, 50]);
    const years = ri(r, 2, 3);
    const final = 100 * (1 + a / 100) ** years;
    if (!clean(final, 3)) return null;
    const change = Number((final - 100).toFixed(3));
    const q = mc(r, {
      prompt: `A city’s population grew by ${a}% each year for ${years} consecutive years. By what percent did the population grow over the ${years} years?`,
      correct: pct(change, `(${1 + a / 100})^${years} − 1.`),
      wrong: [
        pct(a * years, `${a}% × ${years} ignores compounding — each year’s growth is on a larger base.`),
        pct(a, 'That is one year of growth.'),
        pct(Number((100 * (1 + a / 100) ** years).toFixed(3)), 'That is the final population as a percent of the original, not the growth.'),
        pct(a ** years, 'Raising the percent itself to a power is not a step.'),
        ...nearMisses(change, (x) => `${fmt(x)}%`, [1, -1, 2]),
      ],
      explanation: `Each year multiplies by ${1 + a / 100}. Over ${years} years: ${1 + a / 100}^${years} = ${fmt((1 + a / 100) ** years)}.\nThat is ${fmt(final)}% of the original, so the growth is **${fmt(change)}%** — more than ${a * years}% because of compounding.`,
      difficulty: 2,
    });
    return q && { key: `2:${a}:${years}`, q };
  },
};

const pctReverse: Generator = {
  id: 'pct-reverse',
  track: 'quant',
  topic: 'Finding the original (reverse percent)',
  lessonId: 'gre-percents',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    const O = ri(r, 3, 60) * 20;
    if (style === 0) {
      const p = pick(r, [10, 15, 20, 25, 30, 40, 60, 75]);
      const X = O * (1 - p / 100);
      if (!clean(X)) return null;
      const item = pick(r, ['coat', 'bicycle', 'laptop', 'sofa', 'camera', 'guitar']);
      const q = mc(r, {
        prompt: `After a ${p}% discount, a ${item} sells for ${money(X)}. What was the price before the discount?`,
        correct: usd(O, `${money(X)} is ${100 - p}% of the original.`),
        wrong: [
          usd(X * (1 + p / 100), `Adds ${p}% of the SALE price — but the ${p}% was taken off the original, a bigger number.`),
          usd(X + p, `Adds ${p} dollars instead of ${p} percent.`),
          usd(X * (1 - p / 100), 'Discounted again instead of undoing the discount.'),
          usd(X / (p / 100), `Divided by ${p / 100} (the discount) instead of ${1 - p / 100} (what remained).`),
          ...nearMisses(O, money, [20, -20, 40]),
        ].filter((o) => o.value! > 0 && clean(o.value!)),
        explanation: `A ${p}% discount leaves ${100 - p}% of the original: ${1 - p / 100} × original = ${money(X)}.\nOriginal = ${money(X)} ÷ ${1 - p / 100} = **${money(O)}**.\nCheck: ${p}% of ${money(O)} is ${money((O * p) / 100)}, and ${money(O)} − ${money((O * p) / 100)} = ${money(X)}.`,
        difficulty: 2,
      });
      return q && { key: `0:${O}:${p}`, q };
    }
    if (style === 1) {
      const p = pick(r, [4, 5, 6, 8, 10, 12.5, 20, 25]);
      const X = O * (1 + p / 100);
      if (!clean(X)) return null;
      return {
        key: `1:${O}:${p}`,
        q: numeric({
          prompt: `Including a ${p}% sales tax, the total cost of a purchase was ${money(X)}. What was the cost before tax, in dollars?`,
          answer: O,
          prefix: '$',
          display: fmt(O),
          explanation: `The total is ${100 + p}% of the pre-tax cost: ${1 + p / 100} × cost = ${money(X)}.\nCost = ${money(X)} ÷ ${1 + p / 100} = **${money(O)}**.\nTrap: subtracting ${p}% of ${money(X)} gives ${money(X * (1 - p / 100))} — wrong, because the tax was ${p}% of the smaller, pre-tax amount.`,
          difficulty: 2,
        }),
      };
    }
    const p = pick(r, [5, 10, 20, 25, 40, 50]);
    const S = O * 50;
    const X = S * (1 + p / 100);
    const who = pick(r, NAMES);
    return {
      key: `2:${S}:${p}`,
      q: numeric({
        prompt: `After a ${p}% raise, ${who}’s annual salary is ${money(X)}. What was ${who}’s salary before the raise, in dollars?`,
        answer: S,
        prefix: '$',
        display: fmt(S),
        explanation: `New salary = ${1 + p / 100} × old salary, so old = ${money(X)} ÷ ${1 + p / 100} = **${money(S)}**.`,
        difficulty: 1,
      }),
    };
  },
};

const fractionRemaining: Generator = {
  id: 'fraction-remaining',
  track: 'quant',
  topic: 'Fractions of a remainder',
  lessonId: 'gre-fractions-decimals',
  count: 90,
  variants: true,
  make(r) {
    const a = ri(r, 2, 6);
    const b = ri(r, 2, 6);
    const M = a * b * ri(r, 2, 40) * pick(r, [1, 5, 10]);
    const afterA = M - M / a;
    const L = afterA - afterA / b;
    if (!Number.isInteger(L)) return null;
    const who = pick(r, NAMES);
    const [x, y] = pick(r, [
      ['rent', 'groceries'],
      ['a new phone', 'books'],
      ['tuition', 'travel'],
      ['a gift', 'dinner'],
    ] as const);
    const wrongM = L / (1 - 1 / a - 1 / b);
    const q = mc(r, {
      prompt: `${who} spent 1/${a} of a sum of money on ${x} and then 1/${b} of the REMAINING money on ${y}, leaving ${money(L)}. How much money did ${who} start with?`,
      correct: usd(M, `Work backward: ${money(L)} is ${b - 1}/${b} of what was left after ${x}.`),
      wrong: [
        ...(Number.isFinite(wrongM) && wrongM > 0 && Number.isInteger(wrongM)
          ? [usd(wrongM, `Treats 1/${b} as a fraction of the ORIGINAL sum — it is a fraction of the remainder.`)]
          : []),
        usd(afterA, `That is the amount after ${x} only.`),
        usd((L * a) / (a - 1), `Undid only the first step.`),
        usd(L + L / a + L / b, 'Adds fractions of the final amount — fractions were taken of larger amounts.'),
        usd(L * a * b, 'Multiplied by both denominators — overshoots.'),
        ...nearMisses(M, money, [a * b, -a * b]),
      ].filter((o) => o.value! > 0 && clean(o.value!)),
      explanation: `Let the starting amount be M.\nAfter ${x}: M − M/${a} = ${frac(a - 1, a)}M remains.\nAfter ${y}: ${frac(b - 1, b)} of that remains → ${frac(a - 1, a)} × ${frac(b - 1, b)} × M = ${frac((a - 1) * (b - 1), a * b)}M = ${money(L)}.\nM = ${money(L)} × ${frac(a * b, (a - 1) * (b - 1))} = **${money(M)}**.`,
      difficulty: 2,
    });
    return q && { key: `${a}:${b}:${M}`, q };
  },
};

const interest: Generator = {
  id: 'interest',
  track: 'quant',
  topic: 'Simple & compound interest',
  lessonId: 'gre-percents',
  count: 90,
  variants: true,
  make(r) {
    const P = pick(r, [400, 500, 800, 1000, 1500, 2000, 2500, 4000, 5000, 8000, 10000, 12000, 20000]);
    const rate = pick(r, [2, 4, 5, 8, 10, 20]);
    const t = ri(r, 2, 3);
    const style = ri(r, 0, 2);
    const comp = P * (1 + rate / 100) ** t;
    const simple = P * (1 + (rate * t) / 100);
    if (!clean(comp)) return null;
    if (style === 0) {
      const q = mc(r, {
        prompt: `${money(P)} is invested at ${rate}% annual interest, compounded annually. What is the value of the investment after ${t} years?`,
        correct: usd(comp, `${money(P)} × ${1 + rate / 100}^${t}.`),
        wrong: [
          usd(simple, 'That is SIMPLE interest — compounding earns interest on the interest too.'),
          usd(P * (rate / 100) * t, 'That is only the simple interest earned, not the total value.'),
          usd(comp - P, 'That is the interest earned — the question asks for the total value.'),
          usd(P * (1 + rate / 100) ** (t + 1), `Compounded for ${t + 1} years.`),
          usd(P * (1 + rate / 100) ** (t - 1), `Compounded for ${t - 1} year${t - 1 === 1 ? '' : 's'}.`),
        ].filter((o) => clean(o.value!)),
        explanation: `Compound annually: value = P(1 + r)^t = ${money(P)} × ${1 + rate / 100}^${t}.\nYear by year: ${Array.from({ length: t + 1 }, (_, i) => money(P * (1 + rate / 100) ** i)).join(' → ')}.\nValue after ${t} years: **${money(comp)}**. (Simple interest would give only ${money(simple)}.)`,
        difficulty: 2,
      });
      return q && { key: `0:${P}:${rate}:${t}`, q };
    }
    if (style === 1) {
      const diff = comp - simple;
      if (!clean(diff) || diff <= 0) return null;
      return {
        key: `1:${P}:${rate}:${t}`,
        q: numeric({
          prompt: `${money(P)} is deposited for ${t} years at ${rate}% annual interest. How many more dollars does the account earn if interest is compounded annually rather than simple?`,
          answer: diff,
          prefix: '$',
          display: fmt(diff),
          explanation: `Compound: ${money(P)} × ${1 + rate / 100}^${t} = ${money(comp)}.\nSimple: ${money(P)} + ${t} × ${rate}% × ${money(P)} = ${money(simple)}.\nDifference: **${money(diff)}** — the interest earned on earlier interest.`,
          difficulty: 3,
        }),
      };
    }
    const si = (P * rate * t) / 100;
    return {
      key: `2:${P}:${rate}:${t}`,
      q: numeric({
        prompt: `How much simple interest, in dollars, does ${money(P)} earn in ${t} years at an annual rate of ${rate}%?`,
        answer: si,
        prefix: '$',
        display: fmt(si),
        explanation: `Simple interest = principal × rate × time = ${money(P)} × ${rate / 100} × ${t} = **${money(si)}**. Simple interest never earns interest on itself.`,
        difficulty: 1,
      }),
    };
  },
};

// -----------------------------------------------------------------------------
// Ratios

const RATIO_CTX = [
  ['cats', 'dogs', 'animals in a shelter'],
  ['red marbles', 'blue marbles', 'marbles in a jar'],
  ['fiction books', 'nonfiction books', 'books on a shelf'],
  ['juniors', 'seniors', 'students in a club'],
  ['sedans', 'trucks', 'vehicles in a lot'],
  ['violinists', 'cellists', 'string players in an orchestra'],
] as const;

const ratioParts: Generator = {
  id: 'ratio-parts',
  track: 'quant',
  topic: 'Ratios: parts and totals',
  lessonId: 'gre-ratios',
  count: 110,
  variants: true,
  make(r) {
    const [A, B, whole] = pick(r, RATIO_CTX);
    const a = ri(r, 1, 9);
    const b = ri(r, 1, 9);
    if (a === b || gcd(a, b) !== 1) return null;
    const k = ri(r, 2, 15);
    const T = (a + b) * k;
    const style = ri(r, 0, 2);
    if (style === 0) {
      const q = mc(r, {
        prompt: `The ratio of ${A} to ${B} among the ${T} ${whole} is ${a} to ${b}. How many ${A} are there?`,
        correct: n(a * k, `${a} of every ${a + b} are ${A}.`),
        wrong: [
          n(b * k, `That is the number of ${B}.`),
          n(Math.round((T * a) / b), `Treated ${a}:${b} as a fraction of the total (${a}/${b}) — the total has ${a + b} parts.`),
          n(T / (a + b), 'That is the size of one part.'),
          n(T - a, `Subtracted the ratio number ${a} from the total.`),
          ...nearMisses(a * k, fmt, [k, -k, 1]),
        ].filter((o) => o.value! > 0),
        explanation: `A ${a}:${b} ratio splits the whole into ${a} + ${b} = ${a + b} equal parts.\nOne part = ${T} ÷ ${a + b} = ${k}.\n${A} = ${a} parts = **${a * k}** (and ${B} = ${b * k}; check: ${a * k} + ${b * k} = ${T}).`,
        difficulty: 1,
      });
      return q && { key: `0:${A}:${a}:${b}:${k}`, q };
    }
    if (style === 1) {
      return {
        key: `1:${A}:${a}:${b}:${k}`,
        q: numeric({
          prompt: `There are ${Math.abs(a - b) * k} more ${a > b ? A : B} than ${a > b ? B : A} among some ${whole}. If the ratio of ${A} to ${B} is ${a} to ${b}, how many ${whole} are there in all?`,
          answer: T,
          explanation: `The difference is ${Math.abs(a - b)} parts (${Math.max(a, b)} − ${Math.min(a, b)}), and it equals ${Math.abs(a - b) * k}, so one part = ${k}.\nTotal = ${a + b} parts = **${T}**.`,
          difficulty: 2,
        }),
      };
    }
    const c = ri(r, 1, 7);
    const T3 = (a + b + c) * k;
    const which = ri(r, 0, 2);
    const parts = [a, b, c];
    const names = pick(r, [
      ['flour', 'sugar', 'butter', 'cups of a recipe'],
      ['nickels', 'dimes', 'quarters', 'coins in a jar'],
      ['walkers', 'cyclists', 'drivers', 'commuters surveyed'],
    ] as const);
    return {
      key: `2:${names[0]}:${a}:${b}:${c}:${k}:${which}`,
      q: numeric({
        prompt: `${names[0][0].toUpperCase()}${names[0].slice(1)}, ${names[1]}, and ${names[2]} are in the ratio ${a} : ${b} : ${c} among ${T3} ${names[3]}. How many are ${names[which]}?`,
        answer: parts[which] * k,
        explanation: `Total parts = ${a} + ${b} + ${c} = ${a + b + c}. One part = ${T3} ÷ ${a + b + c} = ${k}.\n${names[which]} = ${parts[which]} × ${k} = **${parts[which] * k}**.`,
        difficulty: 1,
      }),
    };
  },
};

const ratioChain: Generator = {
  id: 'ratio-chain',
  track: 'quant',
  topic: 'Combining ratios',
  lessonId: 'gre-ratios',
  count: 90,
  variants: true,
  make(r) {
    const m = ri(r, 1, 9);
    const nn = ri(r, 1, 9);
    const p = ri(r, 1, 9);
    const q_ = ri(r, 1, 9);
    if (gcd(m, nn) !== 1 || gcd(p, q_) !== 1 || nn === p) return null;
    const A = m * p;
    const C = nn * q_;
    const g = gcd(A, C);
    const ans = `${A / g} : ${C / g}`;
    const [x, y, z] = pick(r, [
      ['a', 'b', 'c'],
      ['x', 'y', 'z'],
      ['p', 'q', 'r'],
    ] as const);
    const q = mc(r, {
      prompt: `If ${x} : ${y} = ${m} : ${nn} and ${y} : ${z} = ${p} : ${q_}, what is ${x} : ${z}?`,
      correct: { text: ans, note: `Make ${y} the same in both ratios, then read across.` },
      wrong: [
        { text: `${m} : ${q_}`, note: `Reads straight across without matching the ${y} terms.` },
        { text: `${m + p} : ${nn + q_}`, note: 'Adds the ratios — ratios combine by scaling, not adding.' },
        { text: `${nn * p / gcd(nn * p, m * q_)} : ${m * q_ / gcd(nn * p, m * q_)}`, note: 'Cross-multiplied the wrong way round.' },
        { text: `${C / g} : ${A / g}`, note: `That is ${z} : ${x} — the reverse.` },
        { text: `${m * q_ / gcd(m * q_, nn * p)} : ${nn * p / gcd(m * q_, nn * p)}`, note: 'Scaled each ratio by the wrong number.' },
      ],
      explanation: `The shared term is ${y}: it is ${nn} in the first ratio and ${p} in the second. Scale both so ${y} is ${nn * p}:\n${x} : ${y} = ${m * p} : ${nn * p} and ${y} : ${z} = ${nn * p} : ${nn * q_}.\nSo ${x} : ${y} : ${z} = ${m * p} : ${nn * p} : ${nn * q_}, and ${x} : ${z} = ${g > 1 ? `${A} : ${C} = ` : ''}**${ans}**.`,
      difficulty: 2,
    });
    return q && { key: `${m}:${nn}:${p}:${q_}`, q };
  },
};

const ratioChange: Generator = {
  id: 'ratio-change',
  track: 'quant',
  topic: 'Ratios that change',
  lessonId: 'gre-ratios',
  count: 80,
  variants: true,
  make(r) {
    const a = ri(r, 1, 7);
    const b = ri(r, 2, 9);
    if (gcd(a, b) !== 1) return null;
    const k = ri(r, 2, 12);
    const d = ri(r, 1, 30);
    const x = a * k;
    const y = b * k;
    const g = gcd(x + d, y);
    const c = (x + d) / g;
    const e = y / g;
    if (c > 12 || e > 12 || (c === a && e === b)) return null;
    const [X, Y] = pick(r, [
      ['boys', 'girls', 'join the class'],
      ['adults', 'children', 'arrive at the party'],
      ['blue tiles', 'white tiles', 'are added to the floor'],
    ] as const);
    return {
      key: `${a}:${b}:${k}:${d}`,
      q: numeric({
        prompt: `The ratio of ${X} to ${Y} in a room is ${a} : ${b}. After ${d} more ${X} ${pick(r, ['enter', 'are added', 'join'])}, the ratio becomes ${c} : ${e}. How many ${Y} are in the room?`,
        answer: y,
        explanation: `Let the original counts be ${a}k ${X} and ${b}k ${Y} (the ${Y} never change).\nAfter: (${a}k + ${d}) / ${b}k = ${c}/${e} → ${e}(${a}k + ${d}) = ${c}(${b}k) → ${e * a}k + ${e * d} = ${c * b}k → ${c * b - e * a}k = ${e * d} → k = ${k}.\n${Y} = ${b} × ${k} = **${y}**. (Check: ${x + d} : ${y} reduces to ${c} : ${e}.)`,
        difficulty: 3,
      }),
    };
  },
};

const proportion: Generator = {
  id: 'proportion',
  track: 'quant',
  topic: 'Proportional reasoning',
  lessonId: 'gre-ratios',
  count: 90,
  variants: true,
  make(r) {
    const ctx = pick(r, [
      ['identical machines', 'produce', 'widgets', 'hours'],
      ['identical printers', 'print', 'pages', 'minutes'],
      ['identical pumps', 'move', 'gallons of water', 'minutes'],
      ['workers, all working at the same rate,', 'pack', 'boxes', 'hours'],
    ] as const);
    const m = ri(r, 2, 8);
    const h = ri(r, 2, 8);
    const unit = ri(r, 2, 12); // output per machine per time unit
    const w = m * h * unit;
    const M = ri(r, 2, 12);
    const H = ri(r, 2, 10);
    if (M === m && H === h) return null;
    const ans = M * H * unit;
    const q = mc(r, {
      prompt: `${m} ${ctx[0]} can ${ctx[1]} ${fmt(w)} ${ctx[2]} in ${h} ${ctx[3]}. At this rate, how many ${ctx[2]} can ${M} such ${ctx[0].split(',')[0].replace('identical ', '')} ${ctx[1]} in ${H} ${ctx[3]}?`,
      correct: n(ans, 'Find the rate of ONE per unit of time, then scale up.'),
      wrong: [
        n(Math.round((w * m * H) / (M * h)), 'Scaled machines the wrong way — more machines produce MORE.'),
        n(Math.round((w * M * h) / (m * H)), 'Scaled time the wrong way — more time produces MORE.'),
        n(w * (M / m), 'Adjusted for the number of machines but forgot the time.'),
        n(w * (H / h), 'Adjusted for time but forgot the number of machines.'),
        ...nearMisses(ans, fmt, [unit, -unit, 2 * unit]),
      ].filter((o) => Number.isInteger(o.value) && o.value! > 0),
      explanation: `One unit's rate: ${fmt(w)} ÷ (${m} × ${h}) = ${unit} ${ctx[2]} per ${ctx[3].replace(/s$/, '')} each.\n${M} of them for ${H} ${ctx[3]}: ${unit} × ${M} × ${H} = **${fmt(ans)}**.\nShortcut: ${fmt(w)} × (${M}/${m}) × (${H}/${h}) — both factors scale output up when they grow.`,
      difficulty: 2,
    });
    return q && { key: `${ctx[0]}:${m}:${h}:${unit}:${M}:${H}`, q };
  },
};

// -----------------------------------------------------------------------------
// Rates, work, mixtures

const avgSpeed: Generator = {
  id: 'rate-avg-speed',
  track: 'quant',
  topic: 'Average speed',
  lessonId: 'gre-rates-work',
  count: 100,
  variants: true,
  make(r) {
    if (r() < 0.55) {
      const u = ri(r, 2, 16) * 5;
      const v = ri(r, 2, 16) * 5;
      if (u >= v) return null;
      const hm = (2 * u * v) / (u + v);
      if (!Number.isInteger(hm)) return null;
      const who = pick(r, NAMES);
      const q = mc(r, {
        prompt: `${who} drove from home to a lake at an average speed of ${u} miles per hour and drove back along the same route at ${v} miles per hour. What was ${who}’s average speed for the round trip, in miles per hour?`,
        correct: n(hm, 'Total distance ÷ total time — slower leg gets more weight.'),
        wrong: [
          n((u + v) / 2, `The simple average of the speeds — wrong, because ${who} spent MORE TIME at the slower speed.`),
          n(v - u, 'The difference of the speeds.'),
          n(u + v, 'The sum of the speeds.'),
          n(Math.sqrt(u * v), 'Geometric mean — not how average speed works.'),
          ...nearMisses(hm, fmt, [-2, 3, 4]),
        ].filter((o) => o.value! > 0 && Number.isInteger(o.value)),
        explanation: `Pick an easy distance: let each leg be ${u * v / gcd(u, v)} miles (a multiple of both speeds).\nOut: ${u * v / gcd(u, v) / u} hours. Back: ${u * v / gcd(u, v) / v} hours. Total: ${(2 * u * v) / gcd(u, v)} miles in ${u * v / gcd(u, v) / u + u * v / gcd(u, v) / v} hours.\nAverage = ${(2 * u * v) / gcd(u, v)} ÷ ${u * v / gcd(u, v) / u + u * v / gcd(u, v) / v} = **${hm}** mph. (Formula for equal distances: 2uv/(u + v).)`,
        difficulty: 2,
      });
      return q && { key: `h:${u}:${v}`, q };
    }
    const u = ri(r, 3, 14) * 5;
    const v = ri(r, 3, 14) * 5;
    const t1 = ri(r, 1, 5);
    const t2 = ri(r, 1, 5);
    const avg = (u * t1 + v * t2) / (t1 + t2);
    if (u === v || !clean(avg, 1)) return null;
    return {
      key: `t:${u}:${v}:${t1}:${t2}`,
      q: numeric({
        prompt: `A train travels for ${t1} hour${t1 > 1 ? 's' : ''} at ${u} kilometers per hour and then for ${t2} hour${t2 > 1 ? 's' : ''} at ${v} kilometers per hour. What is its average speed for the whole trip, in kilometers per hour?`,
        answer: avg,
        explanation: `Average speed = total distance ÷ total time.\nDistance = ${u}(${t1}) + ${v}(${t2}) = ${u * t1 + v * t2} km. Time = ${t1 + t2} hours.\nAverage = ${u * t1 + v * t2} ÷ ${t1 + t2} = **${fmt(avg)}** km/h.${t1 === t2 ? '' : `\nIt is not (${u} + ${v})/2 = ${fmt((u + v) / 2)}, because the times differ.`}`,
        difficulty: 2,
      }),
    };
  },
};

const rateMeet: Generator = {
  id: 'rate-meet',
  track: 'quant',
  topic: 'Meeting & catching up',
  lessonId: 'gre-rates-work',
  count: 100,
  variants: true,
  make(r) {
    const [A, B] = sample(r, NAMES, 2);
    if (r() < 0.55) {
      const u = ri(r, 3, 15) * 5;
      const v = ri(r, 3, 15) * 5;
      const t = pick(r, [0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const D = (u + v) * t;
      if (!Number.isInteger(D)) return null;
      const askWhere = r() < 0.4;
      const ans = askWhere ? u * t : t;
      const q = mc(r, {
        prompt: `${A} and ${B} start driving toward each other at the same time from towns ${D} miles apart. ${A} drives at ${u} miles per hour and ${B} at ${v} miles per hour. ${askWhere ? `How many miles from ${A}’s starting town will they meet?` : 'How many hours after they start will they meet?'}`,
        correct: n(ans, 'Closing speed = sum of the speeds.'),
        wrong: askWhere
          ? [
              n(v * t, `That is how far ${B} drives.`),
              n(D / 2, 'Halfway — only if their speeds were equal.'),
              n(Math.round((D * v) / (u + v)), `Swapped the shares — the faster driver covers more.`),
              n(D - u, 'Not a meaningful quantity.'),
              ...nearMisses(ans, fmt, [5, -5, 10]),
            ].filter((o) => o.value! > 0 && o.value! < D)
          : [
              n(round1(D / Math.abs(v - u || 1)), 'Used the DIFFERENCE of speeds — that is for chasing, not approaching.'),
              n(round1(D / u), `Time for ${A} to cover the whole distance alone.`),
              n(round1(D / v), `Time for ${B} to cover the whole distance alone.`),
              n(round1(D / ((u + v) / 2)), 'Used the average speed of one car — they both close the gap.'),
              n(t * 2, 'Doubled the meeting time.'),
              n(t + 1, 'One hour too many.'),
            ],
        explanation: `Moving toward each other, the gap closes at ${u} + ${v} = ${u + v} mph.\nTime to meet = ${D} ÷ ${u + v} = ${fmt(t)} hour${t === 1 ? '' : 's'}.${askWhere ? `\nIn that time ${A} drives ${u} × ${fmt(t)} = **${fmt(u * t)}** miles.` : `\nSo they meet after **${fmt(t)}** hours.`}`,
        difficulty: 1,
      });
      return q && { key: `m:${u}:${v}:${t}:${askWhere}`, q };
    }
    const u = ri(r, 4, 12) * 5;
    const v = u + ri(r, 1, 6) * 5;
    const h = pick(r, [0.5, 1, 1.5, 2]);
    const t = (u * h) / (v - u);
    if (!clean(t, 2) || t > 12) return null;
    return {
      key: `c:${u}:${v}:${h}`,
      q: numeric({
        prompt: `${A} leaves a station driving along a highway at ${u} miles per hour. ${fmt(h * 60)} minutes later, ${B} leaves the same station on the same highway at ${v} miles per hour. How many hours after ${B} leaves will ${B} catch up to ${A}?`,
        answer: t,
        explanation: `When ${B} starts, ${A} is already ${u} × ${fmt(h)} = ${fmt(u * h)} miles ahead.\n${B} gains on ${A} at ${v} − ${u} = ${v - u} mph (same direction → subtract speeds).\nTime to close the gap = ${fmt(u * h)} ÷ ${v - u} = **${fmt(t)}** hours.`,
        difficulty: 2,
      }),
    };
  },
};

const workRate: Generator = {
  id: 'work-rate',
  track: 'quant',
  topic: 'Work rates',
  lessonId: 'gre-rates-work',
  count: 120,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    const [A, B] = sample(r, NAMES, 2);
    if (style === 0) {
      const a = ri(r, 2, 12);
      const b = ri(r, 2, 15);
      if (a >= b) return null;
      const tNum = a * b;
      const tDen = a + b;
      const minutes = (60 * tNum) / tDen;
      if (!Number.isInteger(minutes)) return null;
      const task = pick(r, ['paint a fence', 'grade a stack of exams', 'clean an office', 'assemble a set of shelves', 'weed a garden']);
      const inMin = !Number.isInteger(tNum / tDen);
      const ans = inMin ? minutes : tNum / tDen;
      const unit = inMin ? 'minutes' : 'hours';
      const q = mc(r, {
        prompt: `Working alone, ${A} can ${task} in ${a} hours, and ${B} can do it in ${b} hours. Working together at these rates, how many ${unit} will it take them?`,
        correct: n(ans, 'Add RATES, not times.'),
        wrong: [
          n(inMin ? ((a + b) / 2) * 60 : (a + b) / 2, 'Averaging the times — together they must be FASTER than either alone.'),
          n(inMin ? (b - a) * 60 : b - a, 'Subtracting the times has no meaning here.'),
          n(inMin ? (a / 2) * 60 : a / 2, 'Halving the faster time assumes the other worker is just as fast.'),
          n(inMin ? (a + b) * 60 : a + b, 'Adding the times — that is slower than either alone.'),
          ...nearMisses(ans, fmt, inMin ? [6, -6, 12] : [1, -1, 2]),
        ].filter((o) => o.value! > 0 && Number.isInteger(o.value)),
        explanation: `Rates add: ${A} does 1/${a} of the job per hour, ${B} does 1/${b}.\nTogether: 1/${a} + 1/${b} = ${frac(a + b, a * b)} of the job per hour.\nTime = 1 ÷ ${frac(a + b, a * b)} = ${frac(a * b, a + b)} hours${inMin ? ` = ${frac(a * b, a + b)} × 60 = **${fmt(minutes)} minutes**` : ` = **${fmt(ans)} hours**`}.\nSanity check: it must be less than ${a} hours, the faster worker’s solo time.`,
        difficulty: 2,
      });
      return q && { key: `0:${a}:${b}`, q };
    }
    if (style === 1) {
      const a = ri(r, 2, 12);
      const bb = ri(r, 3, 30);
      if (bb <= a) return null;
      const together = (a * bb) / (a + bb);
      if (!clean(together, 2)) return null;
      return {
        key: `1:${a}:${bb}`,
        q: numeric({
          prompt: `${A} and ${B}, working together at constant rates, can process a batch of forms in ${fmt(together)} hours. ${A} alone takes ${a} hours. How many hours would ${B} take alone?`,
          answer: bb,
          explanation: `Subtract rates: ${B}’s rate = (together rate) − (${A}’s rate) = 1/${fmt(together)} − 1/${a}.\n1/${fmt(together)} = ${frac(a + bb, a * bb)}, so ${B}’s rate = ${frac(a + bb, a * bb)} − ${frac(bb, a * bb)} = ${frac(a, a * bb)} = 1/${bb}.\n${B} alone takes **${bb}** hours.`,
          difficulty: 3,
        }),
      };
    }
    const fill = ri(r, 2, 10);
    const drain = ri(r, 3, 20);
    if (drain <= fill) return null;
    const t = (fill * drain) / (drain - fill);
    if (!clean(t, 2)) return null;
    const q = mc(r, {
      prompt: `An inlet pipe can fill an empty tank in ${fill} hours. An outlet pipe can empty the full tank in ${drain} hours. If both pipes are open, how many hours will it take to fill the empty tank?`,
      correct: n(t, 'Net rate = fill rate − drain rate.'),
      wrong: [
        n(round1((fill * drain) / (fill + drain)), 'Added the rates — the outlet works AGAINST the inlet.'),
        n(drain - fill, 'Subtracted the times instead of the rates.'),
        n(fill + drain, 'Added the times.'),
        n(fill, 'Ignored the outlet pipe.'),
        ...nearMisses(t, fmt, [1, -1, 2]),
      ].filter((o) => o.value! > 0),
      explanation: `Net rate = 1/${fill} − 1/${drain} = ${frac(drain - fill, fill * drain)} of the tank per hour.\nTime = 1 ÷ ${frac(drain - fill, fill * drain)} = **${fmt(t)}** hours.`,
      difficulty: 2,
    });
    return q && { key: `2:${fill}:${drain}`, q };
  },
};

const mixture: Generator = {
  id: 'mixture',
  track: 'quant',
  topic: 'Mixtures & concentrations',
  lessonId: 'gre-rates-work',
  count: 100,
  variants: true,
  make(r) {
    const sub = pick(r, ['saline', 'alcohol', 'acid', 'sugar', 'bleach']);
    const style = ri(r, 0, 2);
    if (style === 0) {
      const x = ri(r, 1, 12) * 2;
      const y = ri(r, 1, 12) * 2;
      const p = ri(r, 1, 18) * 5;
      const q_ = ri(r, 1, 18) * 5;
      if (p === q_) return null;
      const c = (p * x + q_ * y) / (x + y);
      if (!clean(c, 1)) return null;
      const q = mc(r, {
        prompt: `${x} liters of a ${p}% ${sub} solution are mixed with ${y} liters of a ${q_}% ${sub} solution. What is the concentration of ${sub} in the mixture?`,
        correct: pct(c, 'Total pure substance ÷ total volume.'),
        wrong: [
          pct(round1((p + q_) / 2), 'The plain average — only right for EQUAL volumes.'),
          pct(p + q_, 'Adding concentrations — concentrations never add.'),
          pct(round1((p * y + q_ * x) / (x + y)), 'Weighted each percent by the OTHER solution’s volume.'),
          pct(Math.abs(p - q_), 'The difference of the concentrations.'),
          ...nearMisses(c, (v) => `${fmt(v)}%`, [2, -2, 5]),
        ].filter((o) => o.value! > 0 && o.value! < 100),
        explanation: `Track the pure ${sub}: ${p}% of ${x} L = ${fmt((p * x) / 100)} L, and ${q_}% of ${y} L = ${fmt((q_ * y) / 100)} L.\nTotal: ${fmt((p * x + q_ * y) / 100)} L of ${sub} in ${x + y} L of mixture → **${fmt(c)}%**.\nThe answer must lie between ${Math.min(p, q_)}% and ${Math.max(p, q_)}%, closer to the larger volume’s concentration.`,
        difficulty: 2,
      });
      return q && { key: `0:${sub}:${x}:${y}:${p}:${q_}`, q };
    }
    if (style === 1) {
      const x = ri(r, 2, 20) * 5;
      const p = ri(r, 4, 16) * 5;
      const c = ri(r, 1, p / 5 - 1) * 5;
      const w = (x * (p - c)) / c;
      if (!clean(w, 1)) return null;
      return {
        key: `1:${sub}:${x}:${p}:${c}`,
        q: numeric({
          prompt: `How many liters of pure water must be added to ${x} liters of a ${p}% ${sub} solution to dilute it to a ${c}% solution?`,
          answer: w,
          suffix: 'liters',
          explanation: `Water adds volume but no ${sub}, so the amount of ${sub} stays ${p}% × ${x} = ${fmt((p * x) / 100)} L.\nAfter adding w liters: ${fmt((p * x) / 100)} = ${c / 100}(${x} + w) → ${x} + w = ${fmt((p * x) / c)} → w = **${fmt(w)}** liters.`,
          difficulty: 2,
        }),
      };
    }
    const x = ri(r, 2, 12) * 5;
    const p = ri(r, 1, 6) * 5;
    const q_ = p + ri(r, 2, 10) * 5;
    const target = ri(r, p / 5 + 1, q_ / 5 - 1) * 5;
    if (q_ >= 100) return null;
    const y = (x * (target - p)) / (q_ - target);
    if (!clean(y, 1)) return null;
    return {
      key: `2:${sub}:${x}:${p}:${q_}:${target}`,
      q: numeric({
        prompt: `How many liters of a ${q_}% ${sub} solution must be added to ${x} liters of a ${p}% ${sub} solution to produce a ${target}% solution?`,
        answer: y,
        suffix: 'liters',
        explanation: `Balance the pure ${sub}: ${p / 100}(${x}) + ${q_ / 100}y = ${target / 100}(${x} + y).\n${fmt((p * x) / 100)} + ${q_ / 100}y = ${fmt((target * x) / 100)} + ${target / 100}y → ${fmt((q_ - target) / 100)}y = ${fmt(((target - p) * x) / 100)} → y = **${fmt(y)}** liters.\nShortcut (alligation): the target is ${target - p} points from ${p}% and ${q_ - target} from ${q_}%, so volumes are in ratio ${q_ - target} : ${target - p}.`,
        difficulty: 3,
      }),
    };
  },
};

export const WORD_PROBLEMS: Generator[] = [
  pctOf,
  pctChange,
  pctSuccessive,
  pctReverse,
  fractionRemaining,
  interest,
  ratioParts,
  ratioChain,
  ratioChange,
  proportion,
  avgSpeed,
  rateMeet,
  workRate,
  mixture,
];
