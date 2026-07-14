import type { ReviewItem } from './types';

// Spaced repetition, SM-2-ish (spec §11):
//   wrong  → (re)enter the queue at interval 1 day
//   correct → interval ×2.2
// No streaks, no gamification.

export const DAY_MS = 86_400_000;
export const GROWTH = 2.2;

export function applyAnswer(
  review: Record<string, ReviewItem>,
  questionId: string,
  lessonId: string,
  correct: boolean,
  opts?: { asComplexityCheck?: boolean },
): Record<string, ReviewItem> {
  const now = Date.now();
  const existing = review[questionId];
  if (!correct) {
    return {
      ...review,
      [questionId]: {
        questionId,
        lessonId,
        intervalDays: 1,
        due: now + DAY_MS,
        reps: existing?.reps ?? 0,
        lapses: (existing?.lapses ?? 0) + 1,
        asComplexityCheck: opts?.asComplexityCheck ?? existing?.asComplexityCheck,
      },
    };
  }
  if (!existing) return review; // never missed → never queued
  const intervalDays = existing.intervalDays * GROWTH;
  return {
    ...review,
    [questionId]: {
      ...existing,
      intervalDays,
      due: now + intervalDays * DAY_MS,
      reps: existing.reps + 1,
    },
  };
}

/** Enter an item directly (code exercise that needed ≥2 hints → its complexity MCQ). */
export function enterQueue(
  review: Record<string, ReviewItem>,
  questionId: string,
  lessonId: string,
  asComplexityCheck: boolean,
): Record<string, ReviewItem> {
  if (review[questionId]) return review;
  return {
    ...review,
    [questionId]: {
      questionId,
      lessonId,
      intervalDays: 1,
      due: Date.now() + DAY_MS,
      reps: 0,
      lapses: 0,
      asComplexityCheck,
    },
  };
}

export const dueItems = (
  review: Record<string, ReviewItem>,
  now = Date.now(),
): ReviewItem[] =>
  Object.values(review)
    .filter((r) => r.due <= now)
    .sort((a, b) => a.due - b.due);
