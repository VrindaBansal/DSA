// Numeric-entry parsing and grading, shared by the answer cards and the
// full-length practice tests. Pure functions — safe anywhere (and importable
// from Node scripts, hence the explicit .ts import below).

import type { NumericQuestion } from './types.ts';

/** Parses "12", "-3.5", ".75", "1,200", or "3/4". NaN if it isn't a number. */
export function parseNumeric(raw: string): number {
  const s = raw.replace(/,/g, '').replace(/\s+/g, '').replace(/−/g, '-');
  if (!s) return NaN;
  const frac = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (frac) {
    const d = Number(frac[2]);
    return d === 0 ? NaN : Number(frac[1]) / d;
  }
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : NaN;
}

/** Exact match (to float noise), or within half a unit of `roundTo`. */
export function numericCorrect(value: number, q: Pick<NumericQuestion, 'answer' | 'roundTo'>): boolean {
  if (!Number.isFinite(value)) return false;
  if (q.roundTo) return Math.abs(value - q.answer) <= q.roundTo / 2 + 1e-9;
  return Math.abs(value - q.answer) <= 1e-9 * Math.max(1, Math.abs(q.answer));
}
