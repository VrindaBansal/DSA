// Vocab flashcard scheduling — a five-box Leitner system.
//
//   "Got it"         → up one box; the box sets when the card is due again
//   "Still learning" → back to box 1, due right away
//
// A brand-new card you already know jumps to box 2 (due tomorrow). Boxes 4–5
// count as mastered. Pure functions, so the provider and the tests share them.

export interface CardProgress {
  /** Leitner box, 1–5. */
  box: number;
  /** Epoch ms when the card is next due. */
  due: number;
  seen: number;
  right: number;
  wrong: number;
  /** Epoch ms of the last answer. */
  last: number;
  /** Epoch ms the word was first studied (drives the daily new-word limit). */
  first?: number;
}

export interface FlashcardState {
  /** word → progress. Words never answered have no entry ("new"). */
  cards: Record<string, CardProgress>;
  /** Local dates (YYYY-MM-DD) with any flashcard activity, oldest first — drives the streak. */
  days: string[];
  /** Fastest finished match game, in ms. */
  matchBestMs?: number;
  /** Most right answers in one speed round. */
  speedBest?: number;
}

export const emptyFlashcardState = (): FlashcardState => ({ cards: {}, days: [] });

export const DAY_MS = 86_400_000;
/** Days until due after landing in box n (index = box). */
export const BOX_DAYS = [0, 0, 1, 3, 7, 21];
export const MASTERED_BOX = 4;

export function gradeCard(prev: CardProgress | undefined, knew: boolean, now = Date.now()): CardProgress {
  const box = knew ? Math.min(5, (prev?.box ?? 1) + 1) : 1;
  return {
    box,
    due: now + BOX_DAYS[box] * DAY_MS,
    seen: (prev?.seen ?? 0) + 1,
    right: (prev?.right ?? 0) + (knew ? 1 : 0),
    wrong: (prev?.wrong ?? 0) + (knew ? 0 : 1),
    last: now,
    first: prev ? (prev.first ?? prev.last) : now,
  };
}

/** New words a day in "Today's review" — the pace the study plan sets. */
export const NEW_PER_DAY = 20;

/** Words first studied since local midnight. */
export function newToday(cards: Record<string, CardProgress>, now = new Date()): number {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Object.values(cards).filter((p) => (p.first ?? p.last) >= midnight).length;
}

export type CardStatus = 'new' | 'learning' | 'reviewing' | 'mastered';

export function cardStatus(p: CardProgress | undefined): CardStatus {
  if (!p) return 'new';
  if (p.box >= MASTERED_BOX) return 'mastered';
  return p.box <= 1 ? 'learning' : 'reviewing';
}

export const isDue = (p: CardProgress | undefined, now = Date.now()) => !!p && p.due <= now;

/** Missed at least once and not yet mastered. */
export const isTricky = (p: CardProgress | undefined) => !!p && p.wrong > 0 && p.box < MASTERED_BOX;

// --- daily streak -------------------------------------------------------------------

const pad = (n: number) => String(n).padStart(2, '0');
export const localDay = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function markDay(days: string[], today = localDay()): string[] {
  if (days.at(-1) === today) return days;
  return [...days.filter((d) => d !== today), today].sort().slice(-120);
}

/** Consecutive study days ending today — or yesterday, so the streak survives until you study today. */
export function streak(days: string[], now = new Date()): number {
  const set = new Set(days);
  const d = new Date(now);
  if (!set.has(localDay(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(localDay(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
