// Routing and score estimates.
//
// ETS does not publish how raw answers become 130–170 scores, so these are
// ESTIMATES, built to behave like the real test in the ways that matter:
//   - the first section decides the second: 7+ of 12 right routes you to
//     the harder second section;
//   - the harder second section unlocks the top of the scale, the easier
//     one caps you in the high 150s;
//   - on the harder path each right answer is worth a bit more, so fewer
//     right answers can still out-score the easier path.
// Treat the number as a ±3 band. The official POWERPREP tests are the only
// source of ETS-scored practice.

import type { Level, Measure } from './types.ts';

export const ROUTE_THRESHOLD = 7;
export const SCORE_BAND = 3;

export const routeLevel = (firstCorrect: number): Level =>
  firstCorrect >= ROUTE_THRESHOLD ? 'harder' : 'easier';

// raw total (first + second section, out of 27) → scaled score
const HARDER: Record<number, number> = {
  27: 170, 26: 168, 25: 166, 24: 165, 23: 163, 22: 162, 21: 160, 20: 159, 19: 158, 18: 156,
  17: 155, 16: 154, 15: 153, 14: 152, 13: 150, 12: 149, 11: 148, 10: 147, 9: 146, 8: 145, 7: 144,
};
const EASIER: Record<number, number> = {
  21: 158, 20: 156, 19: 155, 18: 153, 17: 152, 16: 151, 15: 150, 14: 148, 13: 147, 12: 146,
  11: 145, 10: 144, 9: 142, 8: 141, 7: 140, 6: 138, 5: 137, 4: 135, 3: 134, 2: 132, 1: 131, 0: 130,
};

/** Estimated 130–170 score from the route taken and total questions right. */
export function estimateScaled(_measure: Measure, level: Level, rawTotal: number): number {
  const table = level === 'harder' ? HARDER : EASIER;
  const keys = Object.keys(table).map(Number);
  const r = Math.max(Math.min(...keys), Math.min(Math.max(...keys), Math.round(rawTotal)));
  return table[r];
}

export const scoreBand = (scaled: number): [number, number] => [
  Math.max(130, scaled - SCORE_BAND),
  Math.min(170, scaled + SCORE_BAND),
];
