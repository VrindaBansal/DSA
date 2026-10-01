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
  /** Epoch ms of the most recent miss. */
  lastMiss?: number;
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
  /** Words you flagged to keep an eye on → when you flagged them. */
  flagged?: Record<string, number>;
  /** Today's mini sets, fixed for the day once dealt. */
  daily?: DailyPlan;
}

export type SetKind = 'due' | 'flagged' | 'missed' | 'new';

export interface MiniSet {
  words: string[];
  /** How many of each kind the set holds — shown on its tile. */
  kinds: Record<SetKind, number>;
  /** Filled in when the set is finished. */
  done?: { at: number; firstTry: number; total: number };
}

export interface DailyPlan {
  /** Local date (YYYY-MM-DD) the plan is for. */
  day: string;
  sets: MiniSet[];
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
    ...(knew ? (prev?.lastMiss ? { lastMiss: prev.lastMiss } : {}) : { lastMiss: now }),
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

// --- smarter decks ----------------------------------------------------------------------

/** Percent of answers that were right, or undefined before the first answer. */
export const accuracy = (p: CardProgress | undefined) =>
  p && p.right + p.wrong > 0 ? Math.round((p.right / (p.right + p.wrong)) * 100) : undefined;

/**
 * A fresh random order every time, but weighted: flagged and missed words tend to come up
 * sooner, and mastered ones later. (Efraimidis–Spirakis: sort by u^(1/weight).)
 */
export function weightedShuffle<T>(items: readonly T[], weight: (x: T) => number, rand = Math.random): T[] {
  return items
    .map((x) => ({ x, k: Math.pow(rand(), 1 / Math.max(0.01, weight(x))) }))
    .sort((a, b) => b.k - a.k)
    .map((e) => e.x);
}

/** How strongly the master set pulls a word toward the front. */
export function masterWeight(p: CardProgress | undefined, flagged: boolean): number {
  let w = 1;
  if (flagged) w *= 3;
  if (isTricky(p)) w *= 3;
  if (p && p.box >= MASTERED_BOX) w *= 0.4;
  return w;
}

export const SET_SIZE = 10;
export const DAILY_SETS = 3;

/**
 * Today's mini sets. Everything that needs work comes first — words due back, then words
 * you flagged, then words you've missed — and up to the day's quota of new words (at least
 * a set's worth of room is kept for them, so new learning never stalls behind a backlog).
 * Each set mixes review and new words, so no set is all-new or all-review.
 */
export function buildDailyPlan(opts: {
  /** Every word, in the order new words should be introduced (the curriculum order). */
  words: string[];
  progress: Record<string, CardProgress>;
  flagged: Record<string, number>;
  /** New words still allowed today. */
  newLeft: number;
  day: string;
  now?: number;
  /** Words to leave out (already in today's sets). */
  exclude?: Set<string>;
  maxSets?: number;
  setSize?: number;
  /** Slots kept for new words even when there's a review backlog (default: one set's worth). */
  minNew?: number;
}): DailyPlan {
  const { words, progress, flagged, newLeft, day, now = Date.now(), exclude = new Set<string>() } = opts;
  const maxSets = opts.maxSets ?? DAILY_SETS;
  const size = opts.setSize ?? SET_SIZE;
  const cap = maxSets * size;
  const avail = words.filter((w) => !exclude.has(w));
  const taken = new Set<string>();
  const take = (ws: string[], kind: SetKind) =>
    ws.filter((w) => !taken.has(w) && (taken.add(w), true)).map((w) => ({ w, kind }));

  const due = take(
    avail
      .filter((w) => isDue(progress[w], now))
      .sort((a, b) => progress[a].box - progress[b].box || progress[a].due - progress[b].due),
    'due',
  );
  const flaggedWs = take(
    avail.filter((w) => flagged[w] !== undefined).sort((a, b) => flagged[b] - flagged[a]),
    'flagged',
  );
  const missed = take(
    avail
      .filter((w) => isTricky(progress[w]))
      .sort((a, b) => progress[b].wrong - progress[a].wrong || (progress[b].lastMiss ?? 0) - (progress[a].lastMiss ?? 0)),
    'missed',
  );
  const review = [...due, ...flaggedWs, ...missed];
  const fresh = avail.filter((w) => !progress[w] && !taken.has(w)).map((w) => ({ w, kind: 'new' as const }));

  const minNew = opts.minNew ?? Math.min(size, newLeft);
  const newCount = Math.min(fresh.length, Math.max(0, newLeft), Math.max(cap - review.length, minNew));
  const reviewCount = Math.min(review.length, cap - newCount);
  const r = review.slice(0, reviewCount);
  const n = fresh.slice(0, newCount);
  const k = Math.ceil((r.length + n.length) / size);

  const sets: MiniSet[] = Array.from({ length: k }, () => ({
    words: [],
    kinds: { due: 0, flagged: 0, missed: 0, new: 0 },
  }));
  // deal review and new words round-robin, so every set gets a mix
  [...r, ...n].forEach((item, i) => {
    let s = i % k;
    // keep sets within the size limit when the split is uneven
    while (sets[s].words.length >= size) s = (s + 1) % k;
    sets[s].words.push(item.w);
    sets[s].kinds[item.kind]++;
  });
  return { day, sets: sets.filter((s) => s.words.length) };
}
