// Data analysis: averages, weighted averages, median/mode/range, standard
// deviation, the normal distribution, quartiles, counting, probability,
// overlapping sets, and data interpretation from tables.

import {
  type Generator,
  type Opt,
  choose,
  factorial,
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
  shuffle,
} from '../engine.ts';

const n = (x: number, note: string): Opt => ({ text: fmt(x), value: x, note });
const fr = (num: number, den: number, note: string): Opt => ({ text: frac(num, den), value: num / den, note });
const clean = (x: number, places = 2) => Math.abs(x * 10 ** places - Math.round(x * 10 ** places)) < 1e-9;

// -----------------------------------------------------------------------------
// Statistics

const meanMissing: Generator = {
  id: 'stat-mean',
  track: 'quant',
  topic: 'Averages',
  lessonId: 'gre-statistics',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    const cnt = ri(r, 3, 12);
    const A = ri(r, 10, 95);
    const d = ri(r, -6, 8);
    if (d === 0) return null;
    if (style === 0) {
      const B = A + d;
      const added = (cnt + 1) * B - cnt * A;
      if (added <= 0) return null;
      const q = mc(r, {
        prompt: `The average (arithmetic mean) of ${cnt} numbers is ${A}. When one more number is included, the average of the ${cnt + 1} numbers is ${B}. What number was included?`,
        correct: n(added, 'New sum − old sum.'),
        wrong: [
          n(B, 'That is the new average, not the new number.'),
          n(B + d, `Only accounts for the change once — the new number must lift ALL ${cnt + 1} numbers by ${Math.abs(d)}.`),
          n(cnt * B - cnt * A, `Used ${cnt} instead of ${cnt + 1} for the new count.`),
          n(2 * B - A, 'Averaged the averages.'),
          ...nearMisses(added, fmt, [B, -B, 1]),
        ].filter((o) => o.value! > 0),
        explanation: `Work with sums, not averages.\nOld sum = ${cnt} × ${A} = ${cnt * A}. New sum = ${cnt + 1} × ${B} = ${(cnt + 1) * B}.\nThe included number = ${(cnt + 1) * B} − ${cnt * A} = **${added}**.`,
        difficulty: 2,
      });
      return q && { key: `0:${cnt}:${A}:${d}`, q };
    }
    if (style === 1) {
      const B = A + d;
      const removed = cnt * A - (cnt - 1) * B;
      if (removed <= 0 || cnt < 4) return null;
      return {
        key: `1:${cnt}:${A}:${d}`,
        q: numeric({
          prompt: `The average of ${cnt} numbers is ${A}. When one of the numbers is removed, the average of the remaining numbers is ${B}. What number was removed?`,
          answer: removed,
          explanation: `Sum of all ${cnt}: ${cnt} × ${A} = ${cnt * A}. Sum of the remaining ${cnt - 1}: ${cnt - 1} × ${B} = ${(cnt - 1) * B}.\nRemoved = ${cnt * A} − ${(cnt - 1) * B} = **${removed}**.`,
          difficulty: 2,
        }),
      };
    }
    const tests = ri(r, 3, 7);
    const cur = ri(r, 70, 88);
    const target = cur + ri(r, 1, 3);
    const need = (tests + 1) * target - tests * cur;
    if (need > 100) return null;
    const who = pick(r, ['Maya', 'Leo', 'Ines', 'Theo', 'Ruth', 'Kofi', 'Lena', 'Arjun']);
    return {
      key: `2:${tests}:${cur}:${target}`,
      q: numeric({
        prompt: `${who}’s average score on ${tests} tests is ${cur}. What score must ${who} earn on the next test to raise the average to exactly ${target}?`,
        answer: need,
        explanation: `Needed total for ${tests + 1} tests: ${tests + 1} × ${target} = ${(tests + 1) * target}. Current total: ${tests} × ${cur} = ${tests * cur}.\nNext score = ${(tests + 1) * target} − ${tests * cur} = **${need}**.\nIntuition: it must cover the new average (${target}) plus ${target - cur} extra for each of the ${tests} earlier tests.`,
        difficulty: 2,
      }),
    };
  },
};

const weighted: Generator = {
  id: 'stat-weighted',
  track: 'quant',
  topic: 'Weighted averages',
  lessonId: 'gre-statistics',
  count: 100,
  variants: true,
  make(r) {
    const g1 = ri(r, 2, 30);
    const g2 = ri(r, 2, 30);
    const a1 = ri(r, 50, 95);
    const a2 = ri(r, 50, 95);
    if (a1 === a2 || g1 === g2) return null;
    const avg = (g1 * a1 + g2 * a2) / (g1 + g2);
    if (!clean(avg, 1)) return null;
    const what = pick(r, [
      ['students in section A', 'students in section B', 'scored an average of', 'score'],
      ['full-time employees', 'part-time employees', 'worked an average of', 'hours per week'],
      ['adult members', 'junior members', 'paid an average of', 'dollars in dues'],
    ] as const);
    if (r() < 0.6) {
      const q = mc(r, {
        prompt: `${g1} ${what[0]} ${what[2]} ${a1}, and ${g2} ${what[1]} ${what[2]} ${a2}. What is the average for all ${g1 + g2} combined?`,
        correct: n(avg, 'Weight each average by its group size.'),
        wrong: [
          n((a1 + a2) / 2, 'The plain average of the two averages — ignores that the groups differ in size.'),
          n(Math.round(((g2 * a1 + g1 * a2) / (g1 + g2)) * 10) / 10, 'Weighted each average by the OTHER group’s size.'),
          n(Math.round(((a1 * g1 + a2 * g2) / Math.max(g1, g2)) * 10) / 10, 'Divided by the larger group only.'),
          ...nearMisses(avg, fmt, [1, -1, 2, -2]),
        ].filter((o) => o.value! > 0),
        explanation: `Combined average = total ÷ count = (${g1} × ${a1} + ${g2} × ${a2}) ÷ ${g1 + g2} = ${g1 * a1 + g2 * a2} ÷ ${g1 + g2} = **${fmt(avg)}**.\nIt sits closer to ${g1 > g2 ? a1 : a2}, the average of the larger group.`,
        difficulty: 2,
      });
      return q && { key: `0:${g1}:${g2}:${a1}:${a2}`, q };
    }
    const c = avg;
    return {
      key: `1:${g1}:${g2}:${a1}:${a2}`,
      q: numeric({
        prompt: `A group of ${what[0]} ${what[2]} ${a1}, and a group of ${what[1]} ${what[2]} ${a2}. There are ${g1} in the first group, and the combined average is ${fmt(c)}. How many are in the second group?`,
        answer: g2,
        explanation: `Balance around the combined average: each of the ${g1} is ${fmt(Math.abs(a1 - c))} ${a1 > c ? 'above' : 'below'} it, each in the second group ${fmt(Math.abs(a2 - c))} ${a2 > c ? 'above' : 'below'}.\n${g1} × ${fmt(Math.abs(a1 - c))} = n × ${fmt(Math.abs(a2 - c))} → n = **${g2}**.\n(Or: ${g1}(${a1}) + ${a2}n = ${fmt(c)}(${g1} + n).)`,
        difficulty: 3,
      }),
    };
  },
};

const medianRange: Generator = {
  id: 'stat-median',
  track: 'quant',
  topic: 'Median, mode & range',
  lessonId: 'gre-statistics',
  count: 110,
  variants: true,
  make(r) {
    const len = ri(r, 5, 9);
    const list = Array.from({ length: len }, () => ri(r, 1, 40));
    if (r() < 0.3) list[ri(r, 0, len - 1)] = list[0]; // make a mode likely
    const sorted = [...list].sort((a, b) => a - b);
    const median = len % 2 ? sorted[(len - 1) / 2] : (sorted[len / 2 - 1] + sorted[len / 2]) / 2;
    const mean = list.reduce((a, b) => a + b, 0) / len;
    const range = sorted[len - 1] - sorted[0];
    const counts = new Map<number, number>();
    for (const x of list) counts.set(x, (counts.get(x) ?? 0) + 1);
    const maxC = Math.max(...counts.values());
    const modes = [...counts].filter(([, c]) => c === maxC).map(([v]) => v);
    const want = pick(r, ['median', 'range', 'mean minus median', 'mode'] as const);
    if (want === 'mode' && (maxC < 2 || modes.length > 1)) return null;
    if (want === 'mean minus median' && !clean(mean - median, 2)) return null;
    const listText = list.join(', ');
    const sortedText = sorted.join(', ');
    if (want === 'median') {
      const q = mc(r, {
        prompt: `What is the median of the following list?\n${listText}`,
        correct: n(median, 'Sort first, then take the middle.'),
        wrong: [
          n(list[Math.floor(len / 2)], 'Took the middle of the UNSORTED list.'),
          n(Math.round(mean * 10) / 10, 'That is the mean.'),
          n(sorted[Math.floor(len / 2) + 1] ?? median + 1, 'Off by one position in the sorted list.'),
          n(sorted[Math.floor(len / 2) - 1] ?? median - 1, 'Off by one position in the sorted list.'),
          n(range, 'That is the range.'),
          n((sorted[0] + sorted[len - 1]) / 2, 'The midpoint of the extremes is not the median.'),
        ],
        explanation: `Sorted: ${sortedText}.\n${len % 2 ? `${len} values → the median is the ${(len + 1) / 2}th: **${fmt(median)}**.` : `${len} values → average the ${len / 2}th and ${len / 2 + 1}th: (${sorted[len / 2 - 1]} + ${sorted[len / 2]})/2 = **${fmt(median)}**.`}`,
        difficulty: 1,
      });
      return q && { key: `m:${listText}`, q };
    }
    if (want === 'range')
      return {
        key: `r:${listText}`,
        q: numeric({
          prompt: `What is the range of the following list?\n${listText}`,
          answer: range,
          explanation: `Range = greatest − least = ${sorted[len - 1]} − ${sorted[0]} = **${range}**.`,
          difficulty: 1,
        }),
      };
    if (want === 'mode')
      return {
        key: `o:${listText}`,
        q: numeric({
          prompt: `What is the mode of the following list?\n${listText}`,
          answer: modes[0],
          explanation: `The mode is the value that appears most often: ${modes[0]} appears ${maxC} times. Sorted: ${sortedText}. Answer: **${modes[0]}**.`,
          difficulty: 1,
        }),
      };
    return {
      key: `d:${listText}`,
      q: numeric({
        prompt: `For the list below, what is the mean minus the median?\n${listText}`,
        answer: mean - median,
        explanation: `Mean = ${list.reduce((a, b) => a + b, 0)} ÷ ${len} = ${fmt(mean)}.\nSorted: ${sortedText}; median = ${fmt(median)}.\nMean − median = **${fmt(mean - median)}**.${mean > median ? ' (A positive result means a few large values pull the mean up.)' : ''}`,
        difficulty: 2,
      }),
    };
  },
};

const sd = (xs: number[]) => {
  const m = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / xs.length);
};

const stdev: Generator = {
  id: 'stat-sd',
  track: 'quant',
  topic: 'Standard deviation',
  lessonId: 'gre-statistics',
  count: 80,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style < 2) {
      const d = ri(r, 2, 15);
      const k = ri(r, 2, 12);
      const add = style === 0;
      const q = mc(r, {
        prompt: `The numbers in data set S have a standard deviation of ${d}. If every number in S is ${add ? `increased by ${k}` : `multiplied by ${k}`}, what is the standard deviation of the new data set?`,
        correct: n(add ? d : d * k, add ? 'Shifting every value moves the center but not the spread.' : 'Scaling every value scales the spread.'),
        wrong: add
          ? [n(d + k, 'Adding a constant shifts values; the distances from the mean don’t change.'), n(d * k, 'Multiplied — but nothing was scaled.'), n(k, 'The standard deviation isn’t replaced by the shift.'), n(d + k * k, 'Not a real rule.'), n(d - 1, 'Arithmetic slip.')]
          : [n(d, 'Multiplying stretches every distance from the mean, so the spread changes.'), n(d + k, 'Added the factor.'), n(d * k * k, 'That is how the VARIANCE scales (k²), not the standard deviation.'), n(k, 'Not a rule.'), n(d * k + 1, 'Arithmetic slip.')],
        explanation: add
          ? `Adding ${k} to every value slides the whole set; every value stays the same distance from the (also shifted) mean. SD stays **${d}**.`
          : `Multiplying every value by ${k} multiplies every distance from the mean by ${k}, so the SD becomes ${d} × ${k} = **${d * k}**.`,
        difficulty: 2,
      });
      return q && { key: `${style}:${d}:${k}`, q };
    }
    const sets: number[][] = [];
    const seen = new Set<string>();
    // every set the same size, so no choice stands out by its length
    const len = ri(r, 3, 5);
    while (sets.length < 5) {
      const center = ri(r, 3, 20);
      const spread = ri(r, 0, 6);
      const xs = Array.from({ length: len }, () => center + ri(r, -spread, spread)).sort((a, b) => a - b);
      const key = xs.join(',');
      if (seen.has(key)) continue;
      seen.add(key);
      sets.push(xs);
    }
    const sds = sets.map(sd);
    const want = pick(r, ['greatest', 'least'] as const);
    const best = want === 'greatest' ? Math.max(...sds) : Math.min(...sds);
    const sortedSds = [...sds].sort((a, b) => (want === 'greatest' ? b - a : a - b));
    if (Math.abs(sortedSds[0] - sortedSds[1]) < 0.35) return null;
    const bi = sds.indexOf(best);
    const text = (xs: number[]) => `{${xs.join(', ')}}`;
    const q = mc(r, {
      prompt: `Which of the following data sets has the ${want} standard deviation?`,
      correct: { text: text(sets[bi]), note: `SD ≈ ${best.toFixed(2)}.` },
      wrong: sets.filter((_, i) => i !== bi).map((xs, i) => ({ text: text(xs), note: `SD ≈ ${sd(xs).toFixed(2)}${i === 0 ? '' : ''}.` })),
      explanation: `Standard deviation measures how far values typically sit from their mean — judge the SPREAD, not the size of the numbers. ${want === 'greatest' ? 'Look for values far from their center.' : 'Look for values bunched together (identical values give SD 0).'}\nApproximate SDs: ${sets.map((xs, i) => `${text(xs)} ≈ ${sds[i].toFixed(2)}`).join('; ')}.\nAnswer: **${text(sets[bi])}**. On the GRE you rarely compute SD — you compare spreads.`,
      difficulty: 2,
    });
    return q && { key: `2:${want}:${sets.map((x) => x.join(',')).sort().join('|')}`, q };
  },
};

const NORMAL_Q: [string, (m: number, s: number) => string, number][] = [
  ['between', (m, s) => `between ${fmt(m - s)} and ${fmt(m + s)}`, 68],
  ['between2', (m, s) => `between ${fmt(m - 2 * s)} and ${fmt(m + 2 * s)}`, 95],
  ['above1', (m, s) => `greater than ${fmt(m + s)}`, 16],
  ['below1', (m, s) => `less than ${fmt(m - s)}`, 16],
  ['above2', (m, s) => `greater than ${fmt(m + 2 * s)}`, 2.5],
  ['m-to-1', (m, s) => `between ${fmt(m)} and ${fmt(m + s)}`, 34],
  ['1-to-2', (m, s) => `between ${fmt(m + s)} and ${fmt(m + 2 * s)}`, 13.5],
  ['-1-to-2', (m, s) => `between ${fmt(m - s)} and ${fmt(m + 2 * s)}`, 81.5],
  ['above-1', (m, s) => `greater than ${fmt(m - s)}`, 84],
  ['below2', (m, s) => `less than ${fmt(m + 2 * s)}`, 97.5],
];

const normal: Generator = {
  id: 'stat-normal',
  track: 'quant',
  topic: 'Normal distribution',
  lessonId: 'gre-statistics',
  count: 80,
  variants: true,
  make(r) {
    const ctx = pick(r, [
      ['The heights of adult sunflowers in a field', 'centimeters', 150, 10],
      ['Scores on a certification exam', 'points', 500, 100],
      ['The weights of apples from an orchard', 'grams', 180, 15],
      ['Commute times for employees of a company', 'minutes', 40, 8],
      ['The lifetimes of a brand of light bulb', 'hours', 1200, 150],
      ['Scores on a statistics quiz', 'points', 70, 6],
    ] as const);
    const m = ctx[2] + ri(r, -3, 3) * (ctx[3] / 2);
    const s = ctx[3];
    const [id, phrase, ans] = pick(r, NORMAL_Q);
    const pool = [68, 95, 16, 2.5, 34, 13.5, 81.5, 84, 50, 97.5, 47.5];
    const wrong = shuffle(r, pool.filter((p) => p !== ans)).slice(0, 4);
    const q = mc(r, {
      prompt: `${ctx[0]} are approximately normally distributed with a mean of ${fmt(m)} ${ctx[1]} and a standard deviation of ${fmt(s)} ${ctx[1]}. Approximately what percent of the values are ${phrase(m, s)} ${ctx[1]}?`,
      correct: { text: `${fmt(ans)}%`, value: ans, note: 'Use 68-95-99.7 and symmetry.' },
      wrong: wrong.map((p) => ({ text: `${fmt(p)}%`, value: p, note: 'Map the cutoffs to standard deviations from the mean, then add up the regions.' })),
      explanation: `Convert the cutoffs to standard deviations from the mean (z-scores): values ${phrase(0, 1)} SD.\nHere the mean is ${fmt(m)} and one SD is ${fmt(s)}, so ${fmt(m + s)} is +1 SD, ${fmt(m - s)} is −1 SD, ${fmt(m + 2 * s)} is +2 SD, ${fmt(m - 2 * s)} is −2 SD.\nRegions of a normal curve: mean to 1 SD ≈ 34%, 1 to 2 SD ≈ 13.5%, beyond 2 SD ≈ 2.5% (each side).\nAdding the relevant regions gives **≈ ${fmt(ans)}%**.`,
      difficulty: ans === 68 || ans === 95 ? 1 : 2,
    });
    return q && { key: `${ctx[0]}:${m}:${id}`, q };
  },
};

const quartiles: Generator = {
  id: 'stat-quartiles',
  track: 'quant',
  topic: 'Quartiles & interquartile range',
  lessonId: 'gre-statistics',
  count: 70,
  variants: true,
  make(r) {
    const len = pick(r, [8, 10, 12]);
    const xs = Array.from({ length: len }, () => ri(r, 1, 60)).sort((a, b) => a - b);
    const half = len / 2;
    const med = (a: number[]) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
    const lower = xs.slice(0, half);
    const upper = xs.slice(half);
    const q1 = med(lower);
    const q3 = med(upper);
    const iqr = q3 - q1;
    const shuffled = shuffle(r, xs);
    return {
      key: shuffled.join(','),
      q: numeric({
        prompt: `What is the interquartile range of the following ${len} numbers?\n${shuffled.join(', ')}`,
        answer: iqr,
        explanation: `Sort: ${xs.join(', ')}.\nLower half: ${lower.join(', ')} → Q1 = ${fmt(q1)}. Upper half: ${upper.join(', ')} → Q3 = ${fmt(q3)}.\nIQR = Q3 − Q1 = ${fmt(q3)} − ${fmt(q1)} = **${fmt(iqr)}**. (It’s the range of the middle half of the data.)`,
        difficulty: 2,
      }),
    };
  },
};

// -----------------------------------------------------------------------------
// Counting & probability

const WORDS = ['LEVEL', 'BANANA', 'APPLE', 'COFFEE', 'LETTER', 'SUCCESS', 'BALLOON', 'ASSESS', 'TOOTH', 'PEPPER', 'EAGLE', 'CHEESE', 'KAYAK', 'COOKIE', 'GARAGE', 'DEEDED', 'TATTOO', 'NOON', 'RADAR', 'BOOKKEEPER'];

const permutations: Generator = {
  id: 'count-perm',
  track: 'quant',
  topic: 'Arrangements (permutations)',
  lessonId: 'gre-counting-probability',
  count: 90,
  variants: true,
  make(r) {
    const style = ri(r, 0, 6);
    const nP = ri(r, 4, 9);
    if (style === 5) {
      const seats = ri(r, 4, 10);
      const ans = factorial(seats - 1);
      const q = mc(r, {
        prompt: `In how many different ways can ${seats} people be seated around a circular table, if two seatings are the same when one is a rotation of the other?`,
        correct: n(ans, '(n − 1)! — fix one person to remove rotations.'),
        wrong: [
          n(factorial(seats), 'Counted rotations of the same seating as different.'),
          n(factorial(seats - 1) / 2, 'Also divided out reflections — only rotations are identified here.'),
          n(factorial(seats - 2), 'Fixed two people.'),
          n(seats * seats, 'Not a counting rule.'),
          ...nearMisses(ans, fmt, [seats, -seats]),
        ],
        explanation: `Around a circle only relative positions matter. Seat one person anywhere to anchor the circle; the other ${seats - 1} fill the remaining seats in ${seats - 1}! ways = **${fmt(ans)}**.`,
        difficulty: 2,
      });
      return q && { key: `5:${seats}`, q };
    }
    if (style === 6) {
      const k = ri(r, 3, 4);
      if (nP <= k) return null;
      const ans = factorial(k) * factorial(nP - k + 1);
      return {
        key: `6:${nP}:${k}`,
        q: numeric({
          prompt: `${nP} different books are placed on a shelf. If ${k} particular books must be kept together (in any order), how many arrangements are possible?`,
          answer: ans,
          explanation: `Glue the ${k} books into one block: ${nP - k + 1} units to arrange → ${nP - k + 1}! = ${fmt(factorial(nP - k + 1))}.
Inside the block the ${k} books can be ordered ${k}! = ${factorial(k)} ways.
Total: ${fmt(factorial(nP - k + 1))} × ${factorial(k)} = **${fmt(ans)}**.`,
          difficulty: 3,
        }),
      };
    }
    if (style === 0) {
      const ans = 2 * factorial(nP - 1);
      const q = mc(r, {
        prompt: `In how many different ways can ${nP} people stand in a line if two particular people, Ana and Bo, must stand next to each other?`,
        correct: n(ans, 'Glue the pair into one block, arrange, then order the pair inside.'),
        wrong: [
          n(factorial(nP - 1), 'Forgot the pair can stand as Ana-Bo or Bo-Ana.'),
          n(factorial(nP), 'Ignored the restriction.'),
          n(factorial(nP) - ans, 'That counts arrangements where they are NOT together.'),
          n(2 * factorial(nP - 2), 'Glued the pair but arranged one block too few.'),
          n(ans / 2 + factorial(nP - 2), 'Not a valid count.'),
        ],
        explanation: `Treat Ana+Bo as one block: now ${nP - 1} units to arrange → ${nP - 1}! = ${factorial(nP - 1)}.\nInside the block they can be in 2 orders → × 2 = **${fmt(ans)}**.`,
        difficulty: 2,
      });
      return q && { key: `0:${nP}`, q };
    }
    if (style === 1) {
      const ans = factorial(nP) - 2 * factorial(nP - 1);
      return {
        key: `1:${nP}`,
        q: numeric({
          prompt: `In how many different ways can ${nP} people be seated in a row of ${nP} chairs if two particular people refuse to sit next to each other?`,
          answer: ans,
          explanation: `Count the complement: total arrangements ${nP}! = ${fmt(factorial(nP))}; arrangements with the two together = 2 × ${nP - 1}! = ${fmt(2 * factorial(nP - 1))}.\nApart = ${fmt(factorial(nP))} − ${fmt(2 * factorial(nP - 1))} = **${fmt(ans)}**.`,
          difficulty: 3,
        }),
      };
    }
    if (style === 2) {
      const w = pick(r, WORDS);
      const counts = new Map<string, number>();
      for (const ch of w) counts.set(ch, (counts.get(ch) ?? 0) + 1);
      const reps = [...counts.values()].filter((c) => c > 1);
      const ans = factorial(w.length) / reps.reduce((a, c) => a * factorial(c), 1);
      const q = mc(r, {
        prompt: `How many distinct arrangements of the letters in the word ${w} are there?`,
        correct: n(ans, 'n! divided by the factorial of each repeat count.'),
        wrong: [
          n(factorial(w.length), 'Treated repeated letters as different — swapping two identical letters makes no new arrangement.'),
          n(factorial(w.length) / factorial(Math.max(...reps)), 'Divided out only one of the repeated letters.'),
          n(factorial(counts.size), 'Arranged only the distinct letters.'),
          n(ans * 2, 'Doubled.'),
          n(Math.round(ans / 2) === ans ? ans + 1 : Math.round(ans / 2), 'Over-divided.'),
        ],
        explanation: `${w} has ${w.length} letters with repeats: ${[...counts].filter(([, c]) => c > 1).map(([ch, c]) => `${ch} ×${c}`).join(', ')}.\nArrangements = ${w.length}! / (${reps.map((c) => `${c}!`).join(' × ')}) = ${fmt(factorial(w.length))} / ${reps.reduce((a, c) => a * factorial(c), 1)} = **${fmt(ans)}**.`,
        difficulty: 2,
      });
      return q && { key: `2:${w}`, q };
    }
    if (style === 3) {
      const club = ri(r, 5, 15);
      const roles = ri(r, 2, 3);
      const ans = roles === 2 ? club * (club - 1) : club * (club - 1) * (club - 2);
      const q = mc(r, {
        prompt: `A club with ${club} members will choose ${roles === 2 ? 'a president and a vice president' : 'a president, a vice president, and a treasurer'}. If no member can hold more than one office, how many different outcomes are possible?`,
        correct: n(ans, 'Order matters (the offices differ): multiply choices.'),
        wrong: [
          n(choose(club, roles), 'Used a combination — but the offices are different, so order matters.'),
          n(club ** roles, 'Allowed one person to hold several offices.'),
          n(club * roles, 'Multiplied members by offices.'),
          n(ans / 2, 'Divided by 2 without reason.'),
          ...nearMisses(ans, fmt, [club, -club]),
        ],
        explanation: `Distinct roles → order matters. ${Array.from({ length: roles }, (_, i) => club - i).join(' × ')} = **${fmt(ans)}**.\n(A committee of ${roles} with no titles would be C(${club}, ${roles}) = ${choose(club, roles)} instead.)`,
        difficulty: 1,
      });
      return q && { key: `3:${club}:${roles}`, q };
    }
    const L = ri(r, 1, 3);
    const D = ri(r, 1, 4);
    const rep = r() < 0.5;
    const ans = rep ? 26 ** L * 10 ** D : Array.from({ length: L }, (_, i) => 26 - i).reduce((a, b) => a * b, 1) * Array.from({ length: D }, (_, i) => 10 - i).reduce((a, b) => a * b, 1);
    if (ans > 1e8) return null;
    return {
      key: `4:${L}:${D}:${rep}`,
      q: numeric({
        prompt: `A code consists of ${L} letter${L > 1 ? 's' : ''} (from the 26 letters of the alphabet) followed by ${D} digit${D > 1 ? 's' : ''} (0–9). ${rep ? 'Letters and digits may repeat.' : 'No letter and no digit may be used more than once.'} How many different codes are possible?`,
        answer: ans,
        explanation: `Fill the positions in order and multiply the choices: ${rep ? `${Array(L).fill(26).join(' × ')} × ${Array(D).fill(10).join(' × ')}` : `${Array.from({ length: L }, (_, i) => 26 - i).join(' × ')} × ${Array.from({ length: D }, (_, i) => 10 - i).join(' × ')}`} = **${fmt(ans)}**.`,
        difficulty: 1,
      }),
    };
  },
};

const combinations: Generator = {
  id: 'count-comb',
  track: 'quant',
  topic: 'Selections (combinations)',
  lessonId: 'gre-counting-probability',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 3);
    if (style === 0) {
      const N = ri(r, 5, 12);
      const k = ri(r, 2, Math.min(5, N - 1));
      const ans = choose(N, k);
      const [noun, pool] = pick(r, [
        ['books', 'different books to take on a trip'],
        ['toppings', 'available pizza toppings'],
        ['songs', 'songs for a playlist, if the order of the songs doesn’t matter'],
        ['people', 'candidates to form a committee'],
      ] as const);
      const q = mc(r, {
        prompt: `In how many ways can ${k} ${noun} be chosen from ${N} ${pool}?`,
        correct: n(ans, `C(${N}, ${k}) — a selection, order irrelevant.`),
        wrong: [
          n(Array.from({ length: k }, (_, i) => N - i).reduce((a, b) => a * b, 1), 'Counted ordered arrangements — divide by k! when order doesn’t matter.'),
          n(N * k, 'Multiplied n by k.'),
          n(choose(N, k - 1), `Used C(${N}, ${k - 1}).`),
          n(2 ** N, 'Counted every possible subset of any size.'),
          ...nearMisses(ans, fmt, [N, -N, 1]),
        ],
        explanation: `Order doesn’t matter → combinations: C(${N}, ${k}) = ${N}! / (${k}! × ${N - k}!) = (${Array.from({ length: k }, (_, i) => N - i).join(' × ')}) / ${factorial(k)} = **${fmt(ans)}**.`,
        difficulty: 1,
      });
      return q && { key: `0:${N}:${k}`, q };
    }
    if (style === 1) {
      const a = ri(r, 3, 9);
      const b = ri(r, 3, 9);
      const ka = ri(r, 1, 3);
      const kb = ri(r, 1, 3);
      const ans = choose(a, ka) * choose(b, kb);
      const q = mc(r, {
        prompt: `A committee will consist of ${ka} teacher${ka > 1 ? 's' : ''} chosen from ${a} teachers and ${kb} parent${kb > 1 ? 's' : ''} chosen from ${b} parents. How many different committees are possible?`,
        correct: n(ans, 'Choose each group independently, then MULTIPLY.'),
        wrong: [
          n(choose(a, ka) + choose(b, kb), 'Added — but every teacher group pairs with every parent group.'),
          n(choose(a + b, ka + kb), 'Pooled everyone — ignores the required mix.'),
          n(a * b, 'Multiplied the pool sizes.'),
          n(ans * 2, 'Doubled.'),
          ...nearMisses(ans, fmt, [a, -b]),
        ],
        explanation: `Teachers: C(${a}, ${ka}) = ${choose(a, ka)}. Parents: C(${b}, ${kb}) = ${choose(b, kb)}.\nIndependent choices multiply: ${choose(a, ka)} × ${choose(b, kb)} = **${fmt(ans)}**.`,
        difficulty: 2,
      });
      return q && { key: `1:${a}:${b}:${ka}:${kb}`, q };
    }
    if (style === 2) {
      const N = ri(r, 4, 30);
      return {
        key: `2:${N}`,
        q: numeric({
          prompt: `At a meeting, each of the ${N} attendees shakes hands exactly once with each of the other attendees. How many handshakes take place?`,
          answer: choose(N, 2),
          explanation: `Each handshake is a PAIR of people: C(${N}, 2) = ${N} × ${N - 1} / 2 = **${fmt(choose(N, 2))}**.\n(${N} × ${N - 1} counts each handshake twice — once from each person.)`,
          difficulty: 1,
        }),
      };
    }
    const m = ri(r, 3, 8);
    const w = ri(r, 2, 7);
    const k = ri(r, 2, 4);
    if (k > m) return null;
    const ans = choose(m + w, k) - choose(m, k);
    const q = mc(r, {
      prompt: `A team of ${k} will be chosen from ${m} juniors and ${w} seniors. How many different teams include at least one senior?`,
      correct: n(ans, 'All teams minus the teams with no senior.'),
      wrong: [
        n(w * choose(m + w - 1, k - 1), 'Picked "one senior" then anyone — counts teams with several seniors more than once.'),
        n(choose(m + w, k), 'That is every team, including all-junior ones.'),
        n(choose(w, 1) * choose(m, k - 1), 'Counts teams with EXACTLY one senior.'),
        n(choose(m, k), 'That is the number of all-junior teams.'),
        ...nearMisses(ans, fmt, [1, -1]),
      ],
      explanation: `"At least one" → count the complement.\nAll teams: C(${m + w}, ${k}) = ${choose(m + w, k)}. Teams with no senior: C(${m}, ${k}) = ${choose(m, k)}.\nAt least one senior: ${choose(m + w, k)} − ${choose(m, k)} = **${fmt(ans)}**.`,
      difficulty: 3,
    });
    return q && { key: `3:${m}:${w}:${k}`, q };
  },
};

const probBasic: Generator = {
  id: 'prob-basic',
  track: 'quant',
  topic: 'Probability',
  lessonId: 'gre-counting-probability',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 3);
    if (style <= 1) {
      const red = ri(r, 2, 9);
      const blue = ri(r, 2, 9);
      const green = ri(r, 0, 6);
      const T = red + blue + green;
      const replace = style === 1;
      const num = replace ? red * red : red * (red - 1);
      const den = replace ? T * T : T * (T - 1);
      const box = `A jar contains ${red} red, ${blue} blue${green ? `, and ${green} green` : ''} marbles.`;
      const q = mc(r, {
        prompt: `${box} Two marbles are drawn at random ${replace ? 'with replacement (the first is put back before the second draw)' : 'without replacement'}. What is the probability that both are red?`,
        correct: fr(num, den, replace ? `(${red}/${T})².` : `${red}/${T} × ${red - 1}/${T - 1}.`),
        wrong: [
          fr(replace ? red * (red - 1) : red * red, replace ? T * (T - 1) : T * T, replace ? 'Treated it as without replacement.' : 'Treated it as with replacement — after one red is gone, fewer reds AND fewer marbles remain.'),
          fr(red, T, 'That is the chance for ONE draw.'),
          fr(2 * red, T, 'Added probabilities for "and" — AND multiplies.'),
          fr(red * (red - 1), T * T, 'Mixed the two setups.'),
          fr(red - 1, T - 1, 'Only the second draw.'),
        ].filter((o) => o.value! < 1),
        explanation: replace
          ? `With replacement the draws are independent: P = (${red}/${T}) × (${red}/${T}) = **${frac(num, den)}**.`
          : `First red: ${red}/${T}. Then ${red - 1} reds remain among ${T - 1} marbles: ${red - 1}/${T - 1}.\nP = ${red}/${T} × ${red - 1}/${T - 1} = ${num}/${den} = **${frac(num, den)}**.`,
        difficulty: 2,
      });
      return q && { key: `${style}:${red}:${blue}:${green}`, q };
    }
    if (style === 2) {
      const s = ri(r, 2, 12);
      let ways = 0;
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === s) ways++;
      const q = mc(r, {
        prompt: `Two fair six-sided dice are rolled. What is the probability that the sum of the numbers rolled is ${s}?`,
        correct: fr(ways, 36, `${ways} of 36 equally likely ordered outcomes.`),
        wrong: [
          fr(1, 11, 'The 11 possible sums (2–12) are NOT equally likely.'),
          fr(Math.ceil(ways / 2), 36, 'Counted (a, b) and (b, a) as the same outcome.'),
          fr(ways, 12, 'Used 12 as the number of outcomes.'),
          fr(ways + 1, 36, 'Miscounted the pairs.'),
          fr(ways, 6, 'Used one die’s outcomes.'),
          fr(ways + 2, 36, 'Miscounted the pairs.'),
        ],
        explanation: `There are 6 × 6 = 36 equally likely ordered pairs. Pairs summing to ${s}: ${Array.from({ length: 6 }, (_, i) => i + 1).filter((a) => s - a >= 1 && s - a <= 6).map((a) => `(${a}, ${s - a})`).join(', ')} → ${ways} pairs.\nP = ${ways}/36 = **${frac(ways, 36)}**.`,
        difficulty: 2,
      });
      return q && { key: `2:${s}`, q };
    }
    const flips = ri(r, 3, 6);
    const k = ri(r, 0, flips);
    const num = choose(flips, k);
    const den = 2 ** flips;
    const q = mc(r, {
      prompt: `A fair coin is flipped ${flips} times. What is the probability of getting exactly ${k} head${k === 1 ? '' : 's'}?`,
      correct: fr(num, den, `C(${flips}, ${k}) / 2^${flips}.`),
      wrong: [
        fr(1, den, 'That is the probability of one SPECIFIC sequence.'),
        fr(k, flips, 'Heads-to-flips ratio is not a probability of this event.'),
        fr(1, flips + 1, 'The numbers of heads are not equally likely.'),
        fr(num, den * 2, 'Wrong total count.'),
        fr(num + 1, den, 'Miscounted the sequences.'),
      ].filter((o) => o.value! <= 1),
      explanation: `Each of the 2^${flips} = ${den} sequences is equally likely. Sequences with exactly ${k} heads: choose which ${k} flips are heads → C(${flips}, ${k}) = ${num}.\nP = ${num}/${den} = **${frac(num, den)}**.`,
      difficulty: 2,
    });
    return q && { key: `3:${flips}:${k}`, q };
  },
};

const probEvents: Generator = {
  id: 'prob-events',
  track: 'quant',
  topic: 'Combining probabilities',
  lessonId: 'gre-counting-probability',
  count: 90,
  variants: true,
  make(r) {
    const a = ri(r, 1, 9) / 10;
    const b = ri(r, 1, 9) / 10;
    const want = pick(r, ['both', 'either', 'neither', 'exactly one'] as const);
    const ans = want === 'both' ? a * b : want === 'either' ? a + b - a * b : want === 'neither' ? (1 - a) * (1 - b) : a * (1 - b) + b * (1 - a);
    const ctx = pick(r, [
      ['it rains in Denver tomorrow', 'it rains in Lisbon tomorrow'],
      ['Nia passes the written test', 'Nia passes the road test'],
      ['machine X breaks down this week', 'machine Y breaks down this week'],
      ['the first shot goes in', 'the second shot goes in'],
    ] as const);
    const phrase =
      want === 'both' ? 'both events occur' : want === 'either' ? 'at least one of the events occurs' : want === 'neither' ? 'neither event occurs' : 'exactly one of the events occurs';
    const d2 = (x: number) => Number(x.toFixed(4));
    const q = mc(r, {
      prompt: `The probability that ${ctx[0]} is ${fmt(a)}, and the probability that ${ctx[1]} is ${fmt(b)}. If the two events are independent, what is the probability that ${phrase}?`,
      correct: { text: fmt(d2(ans)), value: d2(ans), note: 'Use the independence rules.' },
      wrong: [
        { text: fmt(d2(a + b)), value: d2(a + b), note: 'Just adding double-counts the overlap (and can exceed 1).' },
        { text: fmt(d2(a * b)), value: d2(a * b), note: 'That is P(both).' },
        { text: fmt(d2(1 - a * b)), value: d2(1 - a * b), note: 'That is P(not both) — not the same as neither.' },
        { text: fmt(d2((1 - a) * (1 - b))), value: d2((1 - a) * (1 - b)), note: 'That is P(neither).' },
        { text: fmt(d2(a + b - a * b)), value: d2(a + b - a * b), note: 'That is P(at least one).' },
        { text: fmt(d2(a * (1 - b) + b * (1 - a))), value: d2(a * (1 - b) + b * (1 - a)), note: 'That is P(exactly one).' },
        { text: fmt(d2(Math.abs(a - b))), value: d2(Math.abs(a - b)) + 1e-7, note: 'Subtracting has no meaning here.' },
      ].filter((o) => o.value <= 1.00001 && o.value > 0.001),
      explanation: `Independent → multiply for "and".\nP(both) = ${fmt(a)} × ${fmt(b)} = ${fmt(d2(a * b))}. P(neither) = ${fmt(d2(1 - a))} × ${fmt(d2(1 - b))} = ${fmt(d2((1 - a) * (1 - b)))}.\nP(at least one) = 1 − P(neither) = ${fmt(d2(1 - (1 - a) * (1 - b)))}. P(exactly one) = P(at least one) − P(both) = ${fmt(d2(a + b - 2 * a * b))}.\nThe question asks for the probability that ${phrase}: **${fmt(d2(ans))}**.`,
      difficulty: want === 'both' ? 1 : 2,
    });
    return q && { key: `${a}:${b}:${want}`, q };
  },
};

const venn: Generator = {
  id: 'sets-venn',
  track: 'quant',
  topic: 'Overlapping sets',
  lessonId: 'gre-counting-probability',
  count: 100,
  variants: true,
  make(r) {
    const both = ri(r, 1, 30);
    const onlyA = ri(r, 1, 40);
    const onlyB = ri(r, 1, 40);
    const neither = ri(r, 0, 25);
    const A = onlyA + both;
    const B = onlyB + both;
    const T = onlyA + onlyB + both + neither;
    const [x, y, group] = pick(r, [
      ['play an instrument', 'sing in a choir', 'students'],
      ['own a dog', 'own a cat', 'households surveyed'],
      ['speak French', 'speak Spanish', 'employees'],
      ['read the print edition', 'read the online edition', 'subscribers'],
    ] as const);
    const want = pick(r, ['both', 'neither', 'onlyA'] as const);
    const given =
      want === 'both'
        ? `Of ${T} ${group}, ${A} ${x}, ${B} ${y}, and ${neither} do neither. How many ${x} and also ${y}?`
        : want === 'neither'
          ? `Of ${T} ${group}, ${A} ${x}, ${B} ${y}, and ${both} do both. How many do neither?`
          : `Of ${T} ${group}, ${A} ${x}, ${B} ${y}, and ${neither} do neither. How many ${x} but do NOT ${y}?`;
    const ans = want === 'both' ? both : want === 'neither' ? neither : onlyA;
    return {
      key: `${both}:${onlyA}:${onlyB}:${neither}:${want}`,
      q: numeric({
        prompt: given,
        answer: ans,
        explanation: `Total = A + B − Both + Neither.\n${want === 'both' ? `${T} = ${A} + ${B} − Both + ${neither} → Both = ${A} + ${B} + ${neither} − ${T} = **${both}**.` : want === 'neither' ? `${T} = ${A} + ${B} − ${both} + Neither → Neither = ${T} − ${A + B - both} = **${neither}**.` : `First, Both = ${A} + ${B} + ${neither} − ${T} = ${both}. Then only-${x.split(' ')[0]} = ${A} − ${both} = **${onlyA}**.`}\nA Venn diagram (or a 2×2 table) keeps the double-counted overlap straight.`,
        difficulty: want === 'onlyA' ? 3 : 2,
      }),
    };
  },
};

// -----------------------------------------------------------------------------
// Data interpretation (tables)

const DI_CTX = [
  { caption: 'Annual sales by region (thousands of dollars)', rows: ['North', 'South', 'East', 'West', 'Central'], unit: 'thousand dollars', money: true },
  { caption: 'Enrollment by department', rows: ['Biology', 'History', 'Economics', 'Physics', 'English'], unit: 'students', money: false },
  { caption: 'Visitors to five state parks (hundreds)', rows: ['Cedar Hollow', 'Pine Ridge', 'Lake Aster', 'Red Mesa', 'Fox Glen'], unit: 'hundred visitors', money: false },
  { caption: 'Units produced by factory line', rows: ['Line A', 'Line B', 'Line C', 'Line D'], unit: 'units', money: false },
  { caption: 'Library circulation by branch (thousands of items)', rows: ['Downtown', 'Eastside', 'Harbor', 'Hillcrest'], unit: 'thousand items', money: false },
] as const;

const diTable: Generator = {
  id: 'di-table',
  track: 'quant',
  topic: 'Data interpretation (tables)',
  lessonId: 'gre-data-interpretation',
  count: 160,
  variants: true,
  make(r) {
    const ctx = pick(r, DI_CTX);
    const y0 = ri(r, 2015, 2022);
    const years = [y0, y0 + 1, y0 + 2];
    const vals = ctx.rows.map(() => {
      const base = ri(r, 8, 60) * 5;
      return years.map((_, i) => (i === 0 ? base : 0));
    });
    for (const row of vals) {
      row[1] = Math.max(5, row[0] + ri(r, -8, 12) * 5);
      row[2] = Math.max(5, row[1] + ri(r, -8, 12) * 5);
    }
    const table = {
      caption: ctx.caption,
      columns: ['', ...years.map(String)],
      rows: ctx.rows.map((name, i) => [name, ...vals[i].map((v) => fmt(v))]),
    };
    const style = ri(r, 0, 3);
    const ri_ = ri(r, 0, ctx.rows.length - 1);
    const name = ctx.rows[ri_];
    if (style === 0) {
      const [a, b] = r() < 0.5 ? [0, 1] : r() < 0.5 ? [1, 2] : [0, 2];
      const change = ((vals[ri_][b] - vals[ri_][a]) / vals[ri_][a]) * 100;
      if (Math.abs(change) < 1) return null;
      const rounded = Math.round(change);
      return {
        key: `0:${JSON.stringify(vals)}:${ri_}:${a}:${b}`,
        q: numeric({
          prompt: `According to the table, by what percent did the figure for ${name} ${change > 0 ? 'increase' : 'decrease'} from ${years[a]} to ${years[b]}? Give your answer to the nearest whole percent.`,
          answer: Math.abs(change),
          display: fmt(Math.abs(rounded)),
          roundTo: 1,
          suffix: '%',
          explanation: `${name}: ${fmt(vals[ri_][a])} in ${years[a]} → ${fmt(vals[ri_][b])} in ${years[b]}.\nPercent change = (${fmt(vals[ri_][b])} − ${fmt(vals[ri_][a])}) ÷ ${fmt(vals[ri_][a])} × 100 ≈ ${Math.abs(change).toFixed(2)}% → **${Math.abs(rounded)}%**.\nAlways divide by the EARLIER year’s value.`,
          difficulty: 2,
          stimulus: { table },
        }),
      };
    }
    if (style === 1) {
      const incs = vals.map((v) => (v[2] - v[0]) / v[0]);
      const best = Math.max(...incs);
      const sortedInc = [...incs].sort((a, b) => b - a);
      if (sortedInc[0] - sortedInc[1] < 0.03) return null;
      const bi = incs.indexOf(best);
      const absInc = vals.map((v) => v[2] - v[0]);
      const absBest = absInc.indexOf(Math.max(...absInc));
      const q = mc(r, {
        prompt: `According to the table, which ${ctx.rows[0].startsWith('Line') ? 'line' : 'category'} had the greatest PERCENT increase from ${years[0]} to ${years[2]}?`,
        correct: { text: ctx.rows[bi], note: `+${(best * 100).toFixed(1)}%.` },
        wrong: (ctx.rows as readonly string[])
          .map((nm, i): Opt => ({
            text: nm,
            note: `${fmt(Number((incs[i] * 100).toFixed(1)))}%${i === absBest && i !== bi ? ' — the largest ABSOLUTE increase, but it started from a bigger base.' : '.'}`,
          }))
          .filter((_, i) => i !== bi)
          .concat(ctx.rows.length === 4 ? [{ text: 'Can’t be determined', note: 'Everything needed is in the table.' }] : []),
        explanation: `Percent increase = (${years[2]} − ${years[0]}) ÷ ${years[0]} for each row:\n${ctx.rows.map((nm, i) => `${nm}: ${fmt(vals[i][0])} → ${fmt(vals[i][2])} = ${fmt(Number((incs[i] * 100).toFixed(1)))}%`).join('\n')}\nGreatest: **${ctx.rows[bi]}**.${absBest !== bi ? ` (${ctx.rows[absBest]} grew the most in absolute terms — the classic trap.)` : ''}`,
        difficulty: 2,
        stimulus: { table },
      });
      return q && { key: `1:${JSON.stringify(vals)}`, q };
    }
    if (style === 2) {
      const y = ri(r, 0, 2);
      const total = vals.reduce((a, v) => a + v[y], 0);
      const share = (vals[ri_][y] / total) * 100;
      return {
        key: `2:${JSON.stringify(vals)}:${ri_}:${y}`,
        q: numeric({
          prompt: `According to the table, ${name} accounted for what percent of the ${years[y]} total for all ${ctx.rows.length} rows combined? Give your answer to the nearest whole percent.`,
          answer: share,
          display: fmt(Math.round(share)),
          roundTo: 1,
          suffix: '%',
          explanation: `${years[y]} total = ${vals.map((v) => fmt(v[y])).join(' + ')} = ${fmt(total)}.\n${name}: ${fmt(vals[ri_][y])} ÷ ${fmt(total)} × 100 ≈ ${share.toFixed(2)}% → **${Math.round(share)}%**.`,
          difficulty: 2,
          stimulus: { table },
        }),
      };
    }
    const y = ri(r, 0, 2);
    const avg = vals.reduce((a, v) => a + v[y], 0) / vals.length;
    if (!clean(avg, 2)) return null;
    const above = vals.filter((v) => v[y] > avg).length;
    const q = mc(r, {
      prompt: `According to the table, how many of the ${ctx.rows.length} rows had a ${years[y]} figure greater than the ${years[y]} average (arithmetic mean) of all the rows?`,
      correct: n(above, `Average = ${fmt(avg)}.`),
      wrong: [0, 1, 2, 3, 4, 5].filter((k) => k !== above && k <= ctx.rows.length).map((k) => n(k, 'Recompute the average, then compare each row.')),
      explanation: `${years[y]} average = (${vals.map((v) => fmt(v[y])).join(' + ')}) ÷ ${vals.length} = ${fmt(avg)}.\nAbove it: ${ctx.rows.filter((_, i) => vals[i][y] > avg).join(', ') || 'none'} → **${above}**.`,
      difficulty: 1,
      stimulus: { table },
    });
    return q && { key: `3:${JSON.stringify(vals)}:${y}`, q };
  },
};

export const DATA: Generator[] = [
  meanMissing,
  weighted,
  medianRange,
  stdev,
  normal,
  quartiles,
  permutations,
  combinations,
  probBasic,
  probEvents,
  venn,
  diTable,
];

void gcd;
void sample;
void money;
