// Grading a practice-test response. Pure — shared by the test runner, the
// results screen, and the Node validator.

import type { CardQuestion, TestResponse } from '../../../../lib/types.ts';
import { numericCorrect, parseNumeric } from '../../../../lib/numeric.ts';

const sameSet = (a: number[], b: number[]) =>
  a.length === b.length && a.every((x) => b.includes(x));

/** Something has been entered (it may still be incomplete). */
export function isAnswered(q: CardQuestion, r: TestResponse | undefined): boolean {
  if (r === undefined) return false;
  switch (q.kind) {
    case 'mcq':
      return typeof r === 'number';
    case 'multi':
      return Array.isArray(r) && r.length > 0;
    case 'numeric':
      return typeof r === 'string' && r.replace('/', '').trim() !== '';
    case 'blanks':
      return Array.isArray(r) && r.some((x) => x !== null && x !== undefined);
    default:
      return false;
  }
}

/** Fully answered: every blank filled, exactly N picked, both fraction boxes. */
export function isComplete(q: CardQuestion, r: TestResponse | undefined): boolean {
  if (!isAnswered(q, r)) return false;
  switch (q.kind) {
    case 'multi':
      return q.selectCount ? (r as number[]).length === q.selectCount : true;
    case 'numeric':
      return q.fraction ? /^\s*[^/\s]+\s*\/\s*[^/\s]+\s*$/.test(r as string) : true;
    case 'blanks':
      return q.blanks.every((_, i) => typeof (r as (number | null)[])[i] === 'number');
    default:
      return true;
  }
}

export function isCorrect(q: CardQuestion, r: TestResponse | undefined): boolean {
  if (!isAnswered(q, r)) return false;
  switch (q.kind) {
    case 'mcq':
      return r === q.correctIndex;
    case 'multi':
      return sameSet(r as number[], q.correctIndices);
    case 'numeric':
      return numericCorrect(parseNumeric(r as string), q);
    case 'blanks':
      return q.blanks.every((b, i) => (r as (number | null)[])[i] === b.correctIndex);
    default:
      return false;
  }
}

/** The response as text, in the shape AnswerReview expects. */
export function responseText(q: CardQuestion, r: TestResponse | undefined): string {
  if (!isAnswered(q, r)) return '';
  switch (q.kind) {
    case 'mcq':
      return q.options[r as number] ?? '';
    case 'multi':
      return (r as number[]).map((i) => q.options[i]).join('; ');
    case 'numeric':
      return String(r);
    case 'blanks':
      return q.blanks
        .map((b, i) => {
          const k = (r as (number | null)[])[i];
          return typeof k === 'number' ? b.options[k] : '—';
        })
        .join(' / ');
    default:
      return '';
  }
}
