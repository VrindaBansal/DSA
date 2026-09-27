// Geometry: angles, triangles (Pythagorean, special right, inequality,
// similarity), polygons, circles & sectors, rectangles, solids, and the
// coordinate plane. Figures are described in words, with every needed fact
// stated — as on the GRE, never assume anything a figure doesn't guarantee.

import {
  type Generator,
  type Opt,
  fmt,
  frac,
  gcd,
  mc,
  multi,
  nearMisses,
  numeric,
  pick,
  ri,
} from '../engine.ts';

const n = (x: number, note: string): Opt => ({ text: fmt(x), value: x, note });

function simplifyRoot(N: number): [number, number] {
  let out = 1;
  let inside = N;
  for (let k = Math.floor(Math.sqrt(inside)); k >= 2; k--) {
    while (inside % (k * k) === 0) {
      out *= k;
      inside /= k * k;
    }
  }
  return [out, inside];
}
/** c√s with value, simplified: rad(2, 8) → "4√2". */
function rad(c: number, s: number): Opt & { text: string } {
  const [o, i] = simplifyRoot(s);
  const coef = c * o;
  const text = i === 1 ? fmt(coef) : coef === 1 ? `√${i}` : `${fmt(coef)}√${i}`;
  return { text, value: coef * Math.sqrt(i), note: '' };
}
const withNote = (o: { text: string; value?: number; note?: string }, note: string): Opt => ({ ...o, note });
/** "√221" or "√72 = 6√2", with the final form bolded. */
const rootAns = (N: number) => {
  const t = rad(1, N).text;
  return t === `√${N}` ? `**√${N}**` : `√${N} = **${t}**`;
};
/** k·π as text, with value. */
const piOpt = (k: number, note: string): Opt => ({
  text: k === 1 ? 'π' : `${fmt(k)}π`,
  value: k * Math.PI,
  note,
});
const deg = (x: number) => `${fmt(x)}°`;

// -----------------------------------------------------------------------------
// Lines & triangles

const triAngles: Generator = {
  id: 'tri-angles',
  track: 'quant',
  topic: 'Angles & triangles',
  lessonId: 'gre-lines-triangles',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 3);
    if (style === 0) {
      const a = ri(r, 1, 7);
      const b = ri(r, 1, 7);
      const c = ri(r, 1, 9);
      const s = a + b + c;
      if (180 % s !== 0 || (a === b && b === c)) return null;
      const u = 180 / s;
      const big = r() < 0.6;
      const ans = (big ? Math.max(a, b, c) : Math.min(a, b, c)) * u;
      const q = mc(r, {
        prompt: `The measures of the three angles of a triangle are in the ratio ${a} : ${b} : ${c}. What is the measure of the ${big ? 'largest' : 'smallest'} angle?`,
        correct: { ...n(ans, 'One part = 180° ÷ total parts.'), text: deg(ans) },
        wrong: [
          { ...n((big ? Math.min(a, b, c) : Math.max(a, b, c)) * u, `That is the ${big ? 'smallest' : 'largest'} angle.`), text: deg((big ? Math.min(a, b, c) : Math.max(a, b, c)) * u) },
          { ...n(u, 'That is one ratio part, not an angle.'), text: deg(u) },
          { ...n((big ? Math.max(a, b, c) : Math.min(a, b, c)) * (360 / s), 'Used 360° — a triangle’s angles sum to 180°.'), text: deg((big ? Math.max(a, b, c) : Math.min(a, b, c)) * (360 / s)) },
          { ...n(big ? Math.max(a, b, c) * 10 : Math.min(a, b, c) * 10, 'Guessed a scale of 10° per part.'), text: deg(big ? Math.max(a, b, c) * 10 : Math.min(a, b, c) * 10) },
          { ...n(ans + u, 'One part too many.'), text: deg(ans + u) },
          { ...n(ans - u, 'One part too few.'), text: deg(ans - u) },
        ].filter((o) => o.value! > 0 && o.value! < 180),
        explanation: `The angles are ${a}k, ${b}k, ${c}k with ${a}k + ${b}k + ${c}k = 180°, so ${s}k = 180° and k = ${fmt(u)}°.\nThe ${big ? 'largest' : 'smallest'} angle is ${big ? Math.max(a, b, c) : Math.min(a, b, c)} × ${fmt(u)}° = **${deg(ans)}**.`,
        difficulty: 1,
      });
      return q && { key: `0:${a}:${b}:${c}:${big}`, q };
    }
    if (style === 1) {
      const v = ri(r, 10, 160);
      if ((180 - v) % 2 !== 0) return null;
      const askBase = r() < 0.6;
      return askBase
        ? {
            key: `1:${v}:b`,
            q: numeric({
              prompt: `In isosceles triangle PQR, PQ = PR and angle P measures ${v}°. What is the measure, in degrees, of angle Q?`,
              answer: (180 - v) / 2,
              suffix: 'degrees',
              explanation: `Equal sides face equal angles: PQ = PR means angles R and Q (opposite those sides) are equal.\nQ + R = 180° − ${v}° = ${180 - v}°, so Q = **${(180 - v) / 2}°**.`,
              difficulty: 1,
            }),
          }
        : {
            key: `1:${v}:v`,
            q: numeric({
              prompt: `In isosceles triangle PQR, PQ = PR and angle Q measures ${(180 - v) / 2}°. What is the measure, in degrees, of angle P?`,
              answer: v,
              suffix: 'degrees',
              explanation: `PQ = PR makes the angles opposite them — R and Q — equal, so R = ${(180 - v) / 2}° too.\nP = 180° − 2(${(180 - v) / 2}°) = **${v}°**.`,
              difficulty: 1,
            }),
          };
    }
    if (style === 2) {
      const A = ri(r, 20, 80);
      const B = ri(r, 20, 80);
      if (A + B >= 170) return null;
      const E = A + B;
      return {
        key: `2:${A}:${B}`,
        q: numeric({
          prompt: `In triangle ABC, the exterior angle at vertex C measures ${E}°. If angle A measures ${A}°, what is the measure, in degrees, of angle B?`,
          answer: B,
          suffix: 'degrees',
          explanation: `An exterior angle equals the sum of the two REMOTE interior angles: ${E}° = A + B.\nB = ${E}° − ${A}° = **${B}°**.\n(Interior angle C is ${180 - E}°, the supplement of the exterior angle.)`,
          difficulty: 2,
        }),
      };
    }
    const a = ri(r, 25, 85);
    const opts = [a, 180 - a, 90, a / 2, 90 - a, 2 * a].filter((v, i, arr) => v > 0 && v < 180 && arr.indexOf(v) === i && Number.isInteger(v));
    if (opts.length < 4) return null;
    const q = multi(r, {
      prompt: `Parallel lines ℓ and m are both crossed by a transversal t. One of the angles formed where t crosses ℓ measures ${a}°. Which of the following could be the measure of an angle formed where t crosses m?\n\nIndicate all such measures.`,
      options: opts.slice(0, 5).map((v) => ({
        text: deg(v),
        value: v,
        correct: v === a || v === 180 - a,
        note:
          v === a
            ? 'Corresponding / alternate angles are equal.'
            : v === 180 - a
              ? 'Its supplement appears too (angles on a line sum to 180°).'
              : 'A transversal across parallel lines makes only two measures: the angle and its supplement.',
      })),
      explanation: `A transversal crossing parallel lines creates only TWO angle measures, at every intersection: ${a}° and its supplement ${180 - a}°. So **${a}° and ${180 - a}°** are the only possibilities.`,
      difficulty: 2,
    });
    return q && { key: `3:${a}`, q };
  },
};

const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
];

const triPythag: Generator = {
  id: 'tri-pythag',
  track: 'quant',
  topic: 'Pythagorean theorem',
  lessonId: 'gre-lines-triangles',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const [a, b, c] = pick(r, TRIPLES);
      const k = ri(r, 1, a === 3 ? 12 : 4);
      const [A, B, C] = [a * k, b * k, c * k];
      const askHyp = r() < 0.5;
      const ctx = pick(r, [
        (x: number, y: number) => `A right triangle has legs of length ${x} and ${y}. What is the length of the hypotenuse?`,
        (x: number, y: number) => `A rectangle is ${x} meters wide and ${y} meters long. How many meters long is its diagonal?`,
        (x: number, y: number) => `A hiker walks ${x} kilometers due north and then ${y} kilometers due east. How many kilometers is the hiker from the starting point, in a straight line?`,
      ]);
      if (askHyp) {
        return {
          key: `0:${A}:${B}:h:${ctx(1, 1)}`,
          q: numeric({
            prompt: ctx(A, B),
            answer: C,
            explanation: `Right angle → Pythagorean theorem: c² = ${A}² + ${B}² = ${A * A} + ${B * B} = ${C * C}, so c = **${C}**.\nFaster: ${A}-${B}-${C} is the ${a}-${b}-${c} triple scaled by ${k}. Memorize the common triples.`,
            difficulty: 1,
          }),
        };
      }
      const q = mc(r, {
        prompt: `The hypotenuse of a right triangle has length ${C}, and one leg has length ${A}. What is the length of the other leg?`,
        correct: n(B, `${C}² − ${A}².`),
        wrong: [
          n(C - A, 'Subtracted the lengths — the theorem works on SQUARES.'),
          withNote(rad(1, C * C + A * A), 'Added the squares — for a missing LEG, subtract.'),
          n(C + A, 'Added the lengths.'),
          n(Math.round((C + A) / 2), 'Averaged the lengths.'),
          ...nearMisses(B, fmt, [1, -1, 2]),
        ],
        explanation: `Leg² = hypotenuse² − other leg² = ${C * C} − ${A * A} = ${B * B}, so the leg is **${B}**. (It’s the ${a}-${b}-${c} triple × ${k}.)`,
        difficulty: 1,
      });
      return q && { key: `0:${A}:${C}:l`, q };
    }
    const a = ri(r, 1, 12);
    const b = ri(r, a, 14);
    const s = a * a + b * b;
    if (Number.isInteger(Math.sqrt(s))) return null;
    const correct = rad(1, s);
    const q = mc(r, {
      prompt: `A right triangle has legs of length ${a} and ${b}. What is the length of its hypotenuse?`,
      correct: withNote(correct, `√(${a}² + ${b}²) = √${s}.`),
      wrong: [
        withNote({ ...n(a + b, ''), value: a + b }, 'Added the legs — the hypotenuse is shorter than their sum.'),
        withNote(rad(1, Math.abs(b * b - a * a) || 2), 'Subtracted the squares — that finds a leg, not the hypotenuse.'),
        withNote(rad(1, s + 2 * a * b), 'Used (a + b)² — the middle term 2ab doesn’t belong.'),
        withNote({ text: fmt(s), value: s }, 'Forgot the square root.'),
        withNote(rad(2, s), 'Doubled the root.'),
      ],
      explanation: `Hypotenuse² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${s}, so the hypotenuse is ${rootAns(s)} (≈ ${Math.sqrt(s).toFixed(2)}).`,
      difficulty: 2,
    });
    return q && { key: `1:${a}:${b}`, q };
  },
};

const triSpecial: Generator = {
  id: 'tri-special',
  track: 'quant',
  topic: '45-45-90 & 30-60-90 triangles',
  lessonId: 'gre-lines-triangles',
  count: 100,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    const k = ri(r, 1, 15);
    if (style === 0) {
      // 45-45-90: leg k, hyp k√2
      const giveHyp = r() < 0.5;
      const q = mc(r, {
        prompt: giveHyp
          ? `An isosceles right triangle has a hypotenuse of length ${fmt(2 * k)}. What is the length of each leg?`
          : `The diagonal of a square has length ${fmt(k)}√2. What is the area of the square?`,
        correct: giveHyp ? withNote(rad(k, 2), 'Leg = hypotenuse ÷ √2.') : withNote({ text: fmt(k * k), value: k * k }, 'The diagonal splits the square into two 45-45-90 triangles with leg = side.'),
        wrong: giveHyp
          ? [
              withNote({ text: fmt(k), value: k }, 'Halved the hypotenuse — only right for a different triangle.'),
              withNote(rad(2 * k, 2), 'Multiplied by √2 instead of dividing.'),
              withNote({ text: fmt(2 * k), value: 2 * k }, 'That is the hypotenuse.'),
              withNote(rad(k, 3), 'Used the 30-60-90 ratio.'),
              withNote(rad(1, 2 * k), 'Not the ratio x : x : x√2.'),
            ]
          : [
              withNote({ text: fmt(2 * k * k), value: 2 * k * k }, 'Squared the diagonal — the side is the diagonal ÷ √2.'),
              withNote({ text: fmt(k * k / 2), value: (k * k) / 2 }, 'Halved once too often.'),
              withNote(rad(k * k, 2), 'Left a √2 in the area.'),
              withNote({ text: fmt(4 * k), value: 4 * k }, 'That is the perimeter.'),
              withNote({ text: fmt(k * k + 2), value: k * k + 2 }, 'Arithmetic slip.'),
            ],
        explanation: giveHyp
          ? `In a 45-45-90 triangle the sides are x : x : x√2. Hypotenuse x√2 = ${2 * k} → x = ${2 * k}/√2 = **${rad(k, 2).text}**.`
          : `The diagonal of a square is side × √2 (45-45-90). So side = ${k}√2 ÷ √2 = ${k}, and area = ${k}² = **${fmt(k * k)}**.`,
        difficulty: 2,
      });
      return q && { key: `0:${k}:${giveHyp}`, q };
    }
    if (style === 1) {
      // 30-60-90: short k, long k√3, hyp 2k
      const given = pick(r, ['short', 'hyp'] as const);
      const want = pick(r, ['long', given === 'short' ? 'hyp' : 'short'] as const);
      const val = (w: string) => (w === 'short' ? { text: fmt(k), value: k } : w === 'hyp' ? { text: fmt(2 * k), value: 2 * k } : rad(k, 3));
      const nameOf = (w: string) => (w === 'short' ? 'shorter leg' : w === 'hyp' ? 'hypotenuse' : 'longer leg');
      const q = mc(r, {
        prompt: `In a 30°-60°-90° triangle, the ${nameOf(given)} has length ${val(given).text}. What is the length of the ${nameOf(want)}?`,
        correct: withNote(val(want), 'Sides x : x√3 : 2x, opposite 30°, 60°, 90°.'),
        wrong: [
          withNote(rad(k, 2), 'Used the 45-45-90 ratio.'),
          withNote(rad(2 * k, 3), 'Put √3 on the hypotenuse — it belongs to the longer leg.'),
          withNote({ text: fmt(3 * k), value: 3 * k }, 'Multiplied by 3 instead of √3.'),
          withNote({ text: fmt(4 * k), value: 4 * k }, 'Doubled twice.'),
          withNote(val(given === 'short' ? 'hyp' : 'short'), 'That’s the other side.'),
          withNote({ text: fmt(k / 2), value: k / 2 }, 'Halved the short leg.'),
        ].filter((o) => o.text !== val(given).text),
        explanation: `30-60-90 sides are x : x√3 : 2x (short leg, long leg, hypotenuse). Here x = ${k}, so the ${nameOf(want)} is **${val(want).text}**.`,
        difficulty: 2,
      });
      return q && { key: `1:${k}:${given}:${want}`, q };
    }
    const s = 2 * ri(r, 1, 10);
    const area = rad((s * s) / 4, 3);
    const q = mc(r, {
      prompt: `What is the area of an equilateral triangle with side length ${s}?`,
      correct: withNote(area, 's²√3 / 4.'),
      wrong: [
        withNote({ text: fmt((s * s) / 2), value: (s * s) / 2 }, 'Used the side as the height — the height is (s/2)√3.'),
        withNote(rad((s * s) / 2, 3), 'Forgot the ½ in ½ × base × height.'),
        withNote(rad(s / 2, 3), 'That is the height, not the area.'),
        withNote({ text: fmt(s * s), value: s * s }, 'That is the area of a square with that side.'),
        withNote(rad((s * s) / 4, 2), 'Wrong radical — the height comes from a 30-60-90 triangle.'),
      ],
      explanation: `Drop an altitude: it splits the triangle into two 30-60-90 triangles, so the height is (${s}/2)√3 = ${rad(s / 2, 3).text}.\nArea = ½ × ${s} × ${rad(s / 2, 3).text} = **${area.text}** (formula: s²√3/4).`,
      difficulty: 2,
    });
    return q && { key: `2:${s}`, q };
  },
};

const triInequality: Generator = {
  id: 'tri-inequality',
  track: 'quant',
  topic: 'Triangle inequality',
  lessonId: 'gre-lines-triangles',
  count: 80,
  variants: true,
  make(r) {
    const a = ri(r, 2, 20);
    const b = ri(r, a, 25);
    const lo = b - a;
    const hi = a + b;
    if (r() < 0.55) {
      const cnt = hi - lo - 1;
      const q = mc(r, {
        prompt: `Two sides of a triangle have lengths ${a} and ${b}. If the third side has an integer length, how many different lengths are possible for it?`,
        correct: n(cnt, `Integers strictly between ${lo} and ${hi}.`),
        wrong: [
          n(cnt + 2, 'Included both endpoints — a side equal to the sum or difference gives a flat "triangle".'),
          n(cnt + 1, 'Included one endpoint.'),
          n(hi, `Counted every length below ${hi}, forgetting the lower bound.`),
          n(cnt - 1, 'Missed one length.'),
          ...nearMisses(cnt, fmt, [3, -2]),
        ].filter((o) => o.value! > 0),
        explanation: `Triangle inequality: the third side must be greater than the difference and less than the sum of the other two: ${b} − ${a} < x < ${b} + ${a}, i.e. ${lo} < x < ${hi}.\nIntegers from ${lo + 1} to ${hi - 1}: **${cnt}** of them.`,
        difficulty: 2,
      });
      return q && { key: `c:${a}:${b}`, q };
    }
    const cands = [lo, lo + 1, Math.floor((lo + hi) / 2), hi - 1, hi, hi + 2].filter((v, i, arr) => v > 0 && arr.indexOf(v) === i);
    if (cands.length < 4) return null;
    const q = multi(r, {
      prompt: `Two sides of a triangle have lengths ${a} and ${b}. Which of the following could be the length of the third side?\n\nIndicate all such lengths.`,
      options: cands.slice(0, 6).map((v) => ({
        text: fmt(v),
        value: v,
        correct: v > lo && v < hi,
        note: v > lo && v < hi ? `Between ${lo} and ${hi}.` : v === lo || v === hi ? 'Equal to the difference/sum — the three points would be collinear.' : `Outside ${lo} < x < ${hi}.`,
      })),
      explanation: `The third side x must satisfy ${b} − ${a} < x < ${b} + ${a}, i.e. **${lo} < x < ${hi}** — strict inequalities on both ends.`,
      difficulty: 2,
    });
    return q && { key: `m:${a}:${b}`, q };
  },
};

const triSimilar: Generator = {
  id: 'tri-similar',
  track: 'quant',
  topic: 'Similar figures & area ratios',
  lessonId: 'gre-lines-triangles',
  count: 80,
  variants: true,
  make(r) {
    const p = ri(r, 1, 6);
    const q_ = ri(r, 2, 7);
    if (p >= q_ || gcd(p, q_) !== 1) return null;
    const style = ri(r, 0, 1);
    if (style === 0) {
      const A1 = p * p * ri(r, 2, 12);
      const A2 = (A1 * q_ * q_) / (p * p);
      const s1 = p * ri(r, 1, 4);
      const s2 = (s1 * q_) / p;
      const q = mc(r, {
        prompt: `Triangles T and U are similar. A side of T has length ${s1}, and the corresponding side of U has length ${fmt(s2)}. If the area of T is ${A1}, what is the area of U?`,
        correct: n(A2, `Area scales by the SQUARE of the side ratio (${q_}/${p})².`),
        wrong: [
          n((A1 * q_) / p, `Scaled the area by the side ratio ${q_}/${p} — areas scale by its square.`),
          n((A1 * q_ ** 3) / p ** 3, 'Cubed the ratio — that’s for volumes.'),
          n(A1 + (s2 - s1), 'Added the difference in side lengths.'),
          n(A1 * q_ * q_, 'Forgot to divide by the square of the other side.'),
          ...nearMisses(A2, fmt, [q_, -q_]),
        ].filter((o) => o.value! > 0 && Number.isInteger(o.value! * 2)),
        explanation: `Side ratio U : T = ${fmt(s2)} : ${s1} = ${q_} : ${p}. Areas scale by the square: (${q_}/${p})² = ${q_ * q_}/${p * p}.\nArea of U = ${A1} × ${q_ * q_}/${p * p} = **${fmt(A2)}**.`,
        difficulty: 2,
      });
      return q && { key: `0:${p}:${q_}:${A1}:${s1}`, q };
    }
    const k = ri(r, 1, 6);
    const base = p * k;
    const top = q_ * k;
    const h = ri(r, 2, 9) * p;
    const H = (h * q_) / p;
    return {
      key: `1:${p}:${q_}:${k}:${h}`,
      q: numeric({
        prompt: `A ${fmt(h)}-foot pole casts a shadow ${base} feet long. At the same moment, a nearby tree casts a shadow ${top} feet long. How tall, in feet, is the tree?`,
        answer: H,
        suffix: 'feet',
        explanation: `Same sun angle → the pole-and-shadow and tree-and-shadow triangles are similar, so height/shadow is the same:\n${fmt(h)}/${base} = H/${top} → H = ${fmt(h)} × ${top}/${base} = **${fmt(H)}** feet.`,
        difficulty: 1,
      }),
    };
  },
};

// -----------------------------------------------------------------------------
// Polygons, circles, rectangles, solids

const polygon: Generator = {
  id: 'polygon',
  track: 'quant',
  topic: 'Polygons',
  lessonId: 'gre-circles-polygons-solids',
  count: 80,
  variants: true,
  make(r) {
    const nSides = ri(r, 5, 36);
    const style = ri(r, 0, 3);
    const sum = (nSides - 2) * 180;
    if (style === 3) {
      if (360 % nSides !== 0) return null;
      const each = 180 - 360 / nSides;
      return {
        key: `3:${nSides}`,
        q: numeric({
          prompt: `Each interior angle of a regular polygon measures ${each}°. How many sides does the polygon have?`,
          answer: nSides,
          explanation: `Work with the exterior angle — it’s simpler: each exterior angle is 180° − ${each}° = ${360 / nSides}°.\nExterior angles of any polygon sum to 360°, so the number of sides is 360° ÷ ${360 / nSides}° = **${nSides}**.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 0) {
      const q = mc(r, {
        prompt: `What is the sum of the interior angles of a polygon with ${nSides} sides?`,
        correct: { ...n(sum, '(n − 2) × 180°.'), text: deg(sum) },
        wrong: [
          { ...n(nSides * 180, 'n × 180° — forgot to subtract 2 (the polygon splits into n − 2 triangles).'), text: deg(nSides * 180) },
          { ...n((nSides - 1) * 180, 'Subtracted 1 instead of 2.'), text: deg((nSides - 1) * 180) },
          { ...n(360, 'That is the sum of EXTERIOR angles — the same for every polygon.'), text: deg(360) },
          { ...n((nSides - 2) * 90, 'Used 90° per triangle.'), text: deg((nSides - 2) * 90) },
          { ...n(sum + 180, 'One triangle too many.'), text: deg(sum + 180) },
        ],
        explanation: `From one vertex you can draw diagonals that cut an n-gon into n − 2 triangles, each with 180°.\nSum = (${nSides} − 2) × 180° = **${deg(sum)}**.`,
        difficulty: 1,
      });
      return q && { key: `0:${nSides}`, q };
    }
    if (style === 1) {
      const each = sum / nSides;
      if (!Number.isInteger(each * 2)) return null;
      return {
        key: `1:${nSides}`,
        q: numeric({
          prompt: `What is the measure, in degrees, of each interior angle of a regular polygon with ${nSides} sides?`,
          answer: each,
          suffix: 'degrees',
          explanation: `Sum = (${nSides} − 2) × 180° = ${fmt(sum)}°. Regular → all ${nSides} angles equal: ${fmt(sum)}° ÷ ${nSides} = **${fmt(each)}°**.\nFaster: each exterior angle is 360°/${nSides} = ${fmt(360 / nSides)}°, and interior = 180° − exterior.`,
          difficulty: 2,
        }),
      };
    }
    const diags = (nSides * (nSides - 3)) / 2;
    return {
      key: `2:${nSides}`,
      q: numeric({
        prompt: `How many diagonals does a convex polygon with ${nSides} sides have?`,
        answer: diags,
        explanation: `Each vertex connects by a diagonal to every vertex except itself and its 2 neighbors: ${nSides} − 3 = ${nSides - 3} diagonals per vertex.\n${nSides} × ${nSides - 3} counts each diagonal twice (once from each end), so the total is ${nSides} × ${nSides - 3} ÷ 2 = **${diags}**.`,
        difficulty: 3,
      }),
    };
  },
};

const circleBasic: Generator = {
  id: 'circle-basic',
  track: 'quant',
  topic: 'Circles: area & circumference',
  lessonId: 'gre-circles-polygons-solids',
  count: 100,
  variants: true,
  make(r) {
    const rr = ri(r, 1, 20);
    const given = pick(r, ['area', 'circumference', 'diameter'] as const);
    const want = pick(r, (['area', 'circumference', 'radius'] as const).filter((w) => w !== given));
    const givenText =
      given === 'area' ? `an area of ${rr * rr === 1 ? '' : fmt(rr * rr)}π` : given === 'circumference' ? `a circumference of ${fmt(2 * rr)}π` : `a diameter of ${fmt(2 * rr)}`;
    let correct: Opt;
    let wrong: Opt[];
    if (want === 'area') {
      correct = piOpt(rr * rr, 'πr².');
      wrong = [
        piOpt(2 * rr, 'That is the circumference, 2πr.'),
        piOpt(4 * rr * rr, 'Used the diameter in πr².'),
        piOpt(2 * rr * rr, 'πr² has no 2.'),
        piOpt(rr, 'Forgot to square r.'),
        piOpt(rr * rr + 1, 'Arithmetic slip.'),
      ];
    } else if (want === 'circumference') {
      correct = piOpt(2 * rr, '2πr = πd.');
      wrong = [
        piOpt(rr * rr, 'That is the area.'),
        piOpt(rr, 'Used πr — circumference is 2πr.'),
        piOpt(4 * rr, 'Doubled the diameter.'),
        piOpt(2 * rr * rr, 'Mixed the two formulas.'),
        piOpt(2 * rr + 2, 'Arithmetic slip.'),
      ];
    } else {
      correct = { text: fmt(rr), value: rr, note: 'Back out r from the given formula.' };
      wrong = [
        { text: fmt(2 * rr), value: 2 * rr, note: 'That is the diameter.' },
        { text: fmt(rr * rr), value: rr * rr, note: 'That is r² — take the square root.' },
        { text: fmt(rr / 2), value: rr / 2, note: 'Halved too many times.' },
        { text: fmt(rr + 1), value: rr + 1, note: 'Arithmetic slip.' },
        { text: `${fmt(rr)}π`, value: rr * Math.PI, note: 'A length found this way has no π left in it.' },
      ];
    }
    const q = mc(r, {
      prompt: `A circle has ${givenText}. What is its ${want}?`,
      correct,
      wrong: wrong.filter((w) => w.value! > 0),
      explanation: `Everything about a circle comes from its radius. ${given === 'area' ? `πr² = ${fmt(rr * rr)}π → r = ${rr}.` : given === 'circumference' ? `2πr = ${fmt(2 * rr)}π → r = ${rr}.` : `d = ${2 * rr} → r = ${rr}.`}\n${want === 'area' ? `Area = πr² = π(${rr})² = **${correct.text}**.` : want === 'circumference' ? `Circumference = 2πr = 2π(${rr}) = **${correct.text}**.` : `So the radius is **${rr}**.`}`,
      difficulty: 1,
    });
    return q && { key: `${rr}:${given}:${want}`, q };
  },
};

const circleArc: Generator = {
  id: 'circle-arc',
  track: 'quant',
  topic: 'Arcs & sectors',
  lessonId: 'gre-circles-polygons-solids',
  count: 100,
  variants: true,
  make(r) {
    const theta = pick(r, [20, 30, 36, 40, 45, 60, 72, 80, 90, 120, 135, 150, 180, 240, 270]);
    const rr = ri(r, 2, 18);
    const f = theta / 360;
    const arcK = f * 2 * rr;
    const secK = f * rr * rr;
    const askArc = r() < 0.5;
    const k = askArc ? arcK : secK;
    if (!Number.isInteger(k * 2)) return null;
    const q = mc(r, {
      prompt: `In a circle with radius ${rr}, a central angle measures ${theta}°. What is the ${askArc ? 'length of the arc' : 'area of the sector'} it cuts off?`,
      correct: piOpt(k, `(${theta}/360) of the ${askArc ? 'circumference' : 'area'}.`),
      wrong: [
        piOpt(askArc ? secK : arcK, askArc ? 'That is the sector AREA — arc length uses 2πr.' : 'That is the ARC LENGTH — sector area uses πr².'),
        piOpt(askArc ? f * rr : f * 2 * rr * rr, askArc ? 'Used πr instead of 2πr.' : 'Put a 2 into πr².'),
        piOpt(askArc ? 2 * rr : rr * rr, `That is the whole ${askArc ? 'circumference' : 'area'} — take only ${theta}/360 of it.`),
        piOpt(askArc ? (theta / 180) * rr * 2 : (theta / 180) * rr * rr, 'Used 180° as the whole circle.'),
        piOpt(k + 1, 'Arithmetic slip.'),
      ].filter((o) => o.value! > 0),
      explanation: `A ${theta}° central angle is ${frac(theta, 360)} of the full circle.\n${askArc ? `Circumference = 2π(${rr}) = ${fmt(2 * rr)}π; arc = ${frac(theta, 360)} × ${fmt(2 * rr)}π` : `Area = π(${rr})² = ${fmt(rr * rr)}π; sector = ${frac(theta, 360)} × ${fmt(rr * rr)}π`} = **${piOpt(k, '').text}**.`,
      difficulty: 2,
    });
    return q && { key: `${theta}:${rr}:${askArc}`, q };
  },
};

const rect: Generator = {
  id: 'rect',
  track: 'quant',
  topic: 'Rectangles & squares',
  lessonId: 'gre-circles-polygons-solids',
  count: 80,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const w = ri(r, 2, 20);
      const d = ri(r, 1, 12);
      const l = w + d;
      const A = l * w;
      const q = mc(r, {
        prompt: `The length of a rectangle is ${d} more than its width, and its area is ${A}. What is its perimeter?`,
        correct: n(2 * (l + w), `Width ${w}, length ${l}.`),
        wrong: [
          n(l + w, 'Added one length and one width — a perimeter has two of each.'),
          n(4 * w, 'Treated it as a square.'),
          n(A, 'That is the area.'),
          n(2 * (l + w) + 2 * d, 'Arithmetic slip.'),
          ...nearMisses(2 * (l + w), fmt, [2, -2, 4]),
        ],
        explanation: `Let width = w: w(w + ${d}) = ${A}. Try factor pairs of ${A} that differ by ${d}: ${w} × ${l}.\nPerimeter = 2(${l} + ${w}) = **${2 * (l + w)}**.`,
        difficulty: 2,
      });
      return q && { key: `0:${w}:${d}`, q };
    }
    if (style === 1) {
      const side = ri(r, 2, 15);
      const q = mc(r, {
        prompt: `A square is inscribed in a circle of radius ${side}. What is the area of the square?`,
        correct: n(2 * side * side, 'The square’s diagonal is the circle’s diameter.'),
        wrong: [
          n(side * side, 'Used the radius as the side.'),
          n(4 * side * side, 'Used the diameter as the side — the diameter is the DIAGONAL.'),
          { ...piOpt(side * side, 'That is the circle’s area.') },
          n(side * side * 1.5, 'Guessed a ratio.'),
          n(2 * side * side + 2, 'Arithmetic slip.'),
        ],
        explanation: `The square’s diagonal is a diameter: ${2 * side}. A square’s diagonal = side × √2, so side = ${2 * side}/√2 and side² = ${4 * side * side}/2 = **${2 * side * side}**.\n(Shortcut: area of a square = diagonal²/2.)`,
        difficulty: 3,
      });
      return q && { key: `1:${side}`, q };
    }
    const [a, b, c] = pick(r, TRIPLES.slice(0, 4));
    const k = ri(r, 1, 5);
    return {
      key: `2:${a}:${k}`,
      q: numeric({
        prompt: `A rectangle has a perimeter of ${2 * (a + b) * k} and a diagonal of length ${c * k}. What is its area?`,
        answer: a * b * k * k,
        explanation: `l + w = ${(a + b) * k} and l² + w² = ${(c * k) ** 2}.\n(l + w)² = l² + 2lw + w² → ${((a + b) * k) ** 2} = ${(c * k) ** 2} + 2lw → lw = **${a * b * k * k}**.\n(The sides are ${a * k} and ${b * k} — a ${a}-${b}-${c} triple.)`,
        difficulty: 3,
      }),
    };
  },
};

const solids: Generator = {
  id: 'solids',
  track: 'quant',
  topic: 'Boxes, cubes & cylinders',
  lessonId: 'gre-circles-polygons-solids',
  count: 110,
  variants: true,
  make(r) {
    const style = ri(r, 0, 3);
    if (style === 0) {
      const [l, w, h] = [ri(r, 2, 12), ri(r, 2, 10), ri(r, 1, 9)];
      const askV = r() < 0.5;
      const V = l * w * h;
      const SA = 2 * (l * w + l * h + w * h);
      const q = mc(r, {
        prompt: `A rectangular box has dimensions ${l} × ${w} × ${h}. What is its ${askV ? 'volume' : 'total surface area'}?`,
        correct: n(askV ? V : SA, askV ? 'l × w × h.' : '2(lw + lh + wh).'),
        wrong: askV
          ? [n(SA, 'That is the surface area.'), n(l + w + h, 'Added the dimensions.'), n(l * w, 'Only one face.'), n(2 * V, 'Doubled.'), ...nearMisses(V, fmt, [l, -w])]
          : [n(V, 'That is the volume.'), n(l * w + l * h + w * h, 'Counted each face once — a box has two of each.'), n(6 * l * w, 'Treated every face as l × w.'), n(4 * (l + w + h), 'That is the total edge length.'), ...nearMisses(SA, fmt, [2, -2, 4])],
        explanation: askV
          ? `Volume = ${l} × ${w} × ${h} = **${V}**.`
          : `Six faces in three matching pairs: 2(${l}·${w} + ${l}·${h} + ${w}·${h}) = 2(${l * w} + ${l * h} + ${w * h}) = **${SA}**.`,
        difficulty: askV ? 1 : 2,
      });
      return q && { key: `0:${l}:${w}:${h}:${askV}`, q };
    }
    if (style === 1) {
      const s = ri(r, 1, 12);
      return {
        key: `1:${s}`,
        q: numeric({
          prompt: `The total surface area of a cube is ${6 * s * s}. What is the volume of the cube?`,
          answer: s ** 3,
          explanation: `Six equal square faces: 6s² = ${6 * s * s} → s² = ${s * s} → s = ${s}. Volume = s³ = **${s ** 3}**.`,
          difficulty: 1,
        }),
      };
    }
    if (style === 2) {
      const [l, w, h] = [ri(r, 1, 12), ri(r, 1, 12), ri(r, 1, 12)];
      const d2 = l * l + w * w + h * h;
      const correct = rad(1, d2);
      const q = mc(r, {
        prompt: `What is the length of the longest line segment that fits inside a rectangular box with dimensions ${l} × ${w} × ${h}?`,
        correct: withNote(correct, '√(l² + w² + h²) — the space diagonal.'),
        wrong: [
          withNote(rad(1, l * l + w * w), 'That is the diagonal of the base only.'),
          withNote({ text: fmt(l + w + h), value: l + w + h }, 'Added the dimensions.'),
          withNote(rad(1, Math.max(l, w, h) ** 2 + Math.min(l, w, h) ** 2 + 1), 'Not the space diagonal.'),
          withNote({ text: fmt(d2), value: d2 }, 'Forgot the square root.'),
          withNote(rad(1, d2 + 2 * l * w), 'Extra cross term.'),
        ],
        explanation: `The longest segment is the space diagonal: √(${l}² + ${w}² + ${h}²) = ${rootAns(d2)}.\n(It’s the Pythagorean theorem twice: base diagonal √${l * l + w * w}, then with the height.)`,
        difficulty: 2,
      });
      return q && { key: `2:${[l, w, h].sort().join(':')}`, q };
    }
    const rr = ri(r, 1, 10);
    const h = ri(r, 1, 15);
    const style2 = r() < 0.5;
    if (style2) {
      const q = mc(r, {
        prompt: `A right circular cylinder has radius ${rr} and height ${h}. What is its volume?`,
        correct: piOpt(rr * rr * h, 'πr²h.'),
        wrong: [
          piOpt(2 * rr * h, 'That is the curved surface area (2πrh).'),
          piOpt(rr * h, 'Forgot to square r.'),
          piOpt(4 * rr * rr * h, 'Used the diameter as the radius.'),
          piOpt(rr * rr * h * 2, 'Doubled.'),
          piOpt(rr * rr + h, 'Added instead of multiplying by h.'),
        ],
        explanation: `Volume = (area of base) × height = πr²h = π(${rr})²(${h}) = **${piOpt(rr * rr * h, '').text}**.`,
        difficulty: 1,
      });
      return q && { key: `3:${rr}:${h}`, q };
    }
    const kR = pick(r, [2, 3]);
    const kH = pick(r, [1, 2, 3]);
    const factor = kR * kR * kH;
    const q = mc(r, {
      prompt: `If the radius of a cylinder is multiplied by ${kR} and its height ${kH === 1 ? 'is unchanged' : `is multiplied by ${kH}`}, by what factor is its volume multiplied?`,
      correct: n(factor, `r is squared: ${kR}² × ${kH}.`),
      wrong: [
        n(kR * kH, 'Forgot that radius is squared in πr²h.'),
        n(kR + kH, 'Added the factors.'),
        n(kR ** 3 * kH, 'Cubed the radius factor.'),
        n(kR * kR, 'Ignored the height.'),
        n(factor * 2, 'Doubled.'),
      ],
      explanation: `V = πr²h. Replace r with ${kR}r and h with ${kH === 1 ? 'h' : `${kH}h`}: π(${kR}r)²(${kH === 1 ? 'h' : `${kH}h`}) = ${kR * kR} × ${kH} × πr²h. The volume is multiplied by **${factor}**.`,
      difficulty: 2,
    });
    return q && { key: `4:${kR}:${kH}`, q };
  },
};

// -----------------------------------------------------------------------------
// Coordinate geometry

const pt = (x: number, y: number) => `(${fmt(x)}, ${fmt(y)})`;

const coordLine: Generator = {
  id: 'coord-line',
  track: 'quant',
  topic: 'Slope, distance & midpoint',
  lessonId: 'gre-coordinate',
  count: 120,
  variants: true,
  make(r) {
    const [x1, y1, x2, y2] = [ri(r, -9, 9), ri(r, -9, 9), ri(r, -9, 9), ri(r, -9, 9)];
    if (x1 === x2 || y1 === y2) return null;
    const style = ri(r, 0, 3);
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (style === 0) {
      const sl = frac(dy, dx);
      const q = mc(r, {
        prompt: `What is the slope of the line through ${pt(x1, y1)} and ${pt(x2, y2)}?`,
        correct: { text: sl, note: 'Rise over run: Δy / Δx.' },
        wrong: [
          { text: frac(dx, dy), note: 'Run over rise — upside down.' },
          { text: frac(-dy, dx), note: 'Sign error — subtract in the same order top and bottom.' },
          { text: frac(y2 + y1, x2 + x1 || 1), note: 'Added coordinates instead of subtracting.' },
          { text: frac(-dx, dy), note: 'That is the slope of a PERPENDICULAR line.' },
          { text: frac(dy + 1, dx), note: 'Arithmetic slip.' },
        ],
        explanation: `Slope = (y₂ − y₁)/(x₂ − x₁) = (${fmt(y2)} − ${fmt(y1).startsWith('−') ? `(${fmt(y1)})` : fmt(y1)})/(${fmt(x2)} − ${fmt(x1).startsWith('−') ? `(${fmt(x1)})` : fmt(x1)}) = ${fmt(dy)}/${fmt(dx)} = **${sl}**.`,
        difficulty: 1,
      });
      return q && { key: `0:${x1}:${y1}:${x2}:${y2}`, q };
    }
    if (style === 1) {
      const d2 = dx * dx + dy * dy;
      const correct = rad(1, d2);
      const q = mc(r, {
        prompt: `What is the distance between the points ${pt(x1, y1)} and ${pt(x2, y2)}?`,
        correct: withNote(correct, '√(Δx² + Δy²).'),
        wrong: [
          withNote({ text: fmt(Math.abs(dx) + Math.abs(dy)), value: Math.abs(dx) + Math.abs(dy) }, 'Added the legs — that’s the taxicab distance, not straight-line.'),
          withNote(rad(1, Math.abs(dx * dx - dy * dy) || 3), 'Subtracted the squares.'),
          withNote(rad(1, (x1 + x2) ** 2 + (y1 + y2) ** 2 || 5), 'Added coordinates instead of subtracting.'),
          withNote({ text: fmt(d2), value: d2 }, 'Forgot the square root.'),
          withNote(rad(1, d2 + 4), 'Arithmetic slip.'),
        ],
        explanation: `Distance is the hypotenuse of a right triangle with legs |Δx| = ${Math.abs(dx)} and |Δy| = ${Math.abs(dy)}: √(${dx * dx} + ${dy * dy}) = ${rootAns(d2)}.`,
        difficulty: 2,
      });
      return q && { key: `1:${x1}:${y1}:${x2}:${y2}`, q };
    }
    if (style === 2) {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const q = mc(r, {
        prompt: `What is the midpoint of the segment joining ${pt(x1, y1)} and ${pt(x2, y2)}?`,
        correct: { text: pt(mx, my), note: 'Average the x’s and average the y’s.' },
        wrong: [
          { text: pt(dx / 2, dy / 2), note: 'Halved the DIFFERENCES — that is half the displacement, not a point.' },
          { text: pt(x1 + x2, y1 + y2), note: 'Forgot to divide by 2.' },
          { text: pt(my, mx), note: 'Swapped x and y.' },
          { text: pt(mx, -my), note: 'Sign slip on y.' },
          { text: pt(-mx, my), note: 'Sign slip on x.' },
        ],
        explanation: `Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2) = ((${fmt(x1)} + ${fmt(x2)})/2, (${fmt(y1)} + ${fmt(y2)})/2) = **${pt(mx, my)}**.`,
        difficulty: 1,
      });
      return q && { key: `2:${x1}:${y1}:${x2}:${y2}`, q };
    }
    // point on a line: slope m through (x1, y1); find k for (x2, k)
    const m = pick(r, [-3, -2, -1, 1, 2, 3, 4]);
    const k = y1 + m * (x2 - x1);
    return {
      key: `3:${m}:${x1}:${y1}:${x2}`,
      q: numeric({
        prompt: `A line with slope ${fmt(m)} passes through the point ${pt(x1, y1)}. If the point (${fmt(x2)}, k) is also on the line, what is the value of k?`,
        answer: k,
        explanation: `Slope = rise/run: (k − ${fmt(y1)})/(${fmt(x2)} − ${fmt(x1)}) = ${fmt(m)} → k − ${fmt(y1)} = ${fmt(m)} × ${fmt(x2 - x1)} = ${fmt(m * (x2 - x1))} → k = **${fmt(k)}**.`,
        difficulty: 2,
      }),
    };
  },
};

const coordIntercepts: Generator = {
  id: 'coord-intercepts',
  track: 'quant',
  topic: 'Lines, intercepts & perpendiculars',
  lessonId: 'gre-coordinate',
  count: 80,
  variants: true,
  make(r) {
    const style = ri(r, 0, 2);
    if (style === 0) {
      const a = ri(r, 1, 9);
      const b = ri(r, 1, 9);
      const xi = ri(r, 1, 8) * b;
      const c = a * xi;
      if (c % b !== 0) return null;
      const yi = c / b;
      const area = (xi * yi) / 2;
      return {
        key: `0:${a}:${b}:${c}`,
        q: numeric({
          prompt: `The line ${a === 1 ? '' : a}x + ${b === 1 ? '' : b}y = ${c} and the two coordinate axes form a triangle. What is the area of that triangle?`,
          answer: area,
          explanation: `Intercepts: set y = 0 → x = ${c}/${a} = ${xi}; set x = 0 → y = ${c}/${b} = ${yi}.\nThe triangle has legs ${xi} and ${yi} along the axes: area = ½ × ${xi} × ${yi} = **${fmt(area)}**.`,
          difficulty: 2,
        }),
      };
    }
    if (style === 1) {
      const p = ri(r, -6, 6);
      const q_ = ri(r, 1, 6);
      if (p === 0) return null;
      const m = frac(p, q_);
      const perp = frac(-q_, p);
      const q = mc(r, {
        prompt: `Line k has slope ${m}. What is the slope of a line perpendicular to line k?`,
        correct: { text: perp, note: 'Negative reciprocal.' },
        wrong: [
          { text: frac(-p, q_), note: 'Only negated — also take the reciprocal.' },
          { text: frac(q_, p), note: 'Only the reciprocal — also flip the sign.' },
          { text: m, note: 'That is a PARALLEL line’s slope.' },
          { text: '0', note: 'Slope 0 is horizontal — perpendicular only to a vertical line.' },
          { text: frac(q_ + 1, p), note: 'Arithmetic slip.' },
        ],
        explanation: `Perpendicular slopes multiply to −1, so the slope is the negative reciprocal of ${m}: **${perp}**.\nCheck: ${m} × ${perp} = −1.`,
        difficulty: 1,
      });
      return q && { key: `1:${p}:${q_}`, q };
    }
    const m = pick(r, [-4, -3, -2, 2, 3, 4, 5]);
    const b = ri(r, -10, 10);
    const xi = -b / m;
    if (!Number.isInteger(xi * 2) || b === 0) return null;
    return {
      key: `2:${m}:${b}`,
      q: numeric({
        prompt: `What is the x-intercept of the line y = ${fmt(m)}x${b < 0 ? ` − ${-b}` : ` + ${b}`}?`,
        answer: xi,
        explanation: `The x-intercept is where y = 0: 0 = ${fmt(m)}x${b < 0 ? ` − ${-b}` : ` + ${b}`} → x = ${fmt(-b)}/${fmt(m)} = **${fmt(xi)}**. (The y-intercept, ${fmt(b)}, is the trap answer.)`,
        difficulty: 1,
      }),
    };
  },
};

export const GEOMETRY: Generator[] = [
  triAngles,
  triPythag,
  triSpecial,
  triInequality,
  triSimilar,
  polygon,
  circleBasic,
  circleArc,
  rect,
  solids,
  coordLine,
  coordIntercepts,
];
