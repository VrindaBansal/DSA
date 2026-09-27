// ---------------------------------------------------------------------------
// The GRE practice bank: 10,000+ questions, generated deterministically from
// the generators registered below (see engine.ts for the contract).
//
// Question ids: `gre.<generatorId>.<index>`. A generator's list is sorted by
// difficulty, so low indices are easier. Nothing here touches the DOM or the
// filesystem — it runs identically in the browser, on the server, and in
// scripts/check-gre-bank.mjs.
// ---------------------------------------------------------------------------

import type { CardQuestion } from '../../../../lib/types.ts';
import { type Built, type Generator, type Track, hashStr, mulberry32, shuffle } from './engine.ts';
import { ARITHMETIC } from './quant/arithmetic.ts';
import { WORD_PROBLEMS } from './quant/word-problems.ts';
import { ALGEBRA } from './quant/algebra.ts';
import { GEOMETRY } from './quant/geometry.ts';
import { DATA } from './quant/data.ts';
import { COMPARISONS } from './quant/comparison.ts';
import { VERBAL } from './verbal/generators.ts';

export type BankQuestion = CardQuestion & { group?: string };

export const GENERATORS: Generator[] = [
  ...ARITHMETIC,
  ...WORD_PROBLEMS,
  ...ALGEBRA,
  ...GEOMETRY,
  ...DATA,
  ...COMPARISONS,
  ...VERBAL,
];

export const GENERATOR_BY_ID: Record<string, Generator> = Object.fromEntries(
  GENERATORS.map((g) => [g.id, g]),
);

export const BANK_PREFIX = 'gre.';
export const isBankId = (id: string): boolean => id.startsWith(BANK_PREFIX);

export const trackTotal = (t: Track): number =>
  GENERATORS.filter((g) => g.track === t).reduce((n, g) => n + g.count, 0);
export const BANK_TOTAL = GENERATORS.reduce((n, g) => n + g.count, 0);

// --- building -----------------------------------------------------------------

const cache = new Map<string, BankQuestion[]>();

/** Every question a generator contributes, easiest first. Memoized. */
export function questionsFor(genId: string): BankQuestion[] {
  const hit = cache.get(genId);
  if (hit) return hit;
  const g = GENERATOR_BY_ID[genId];
  if (!g) return [];
  let built: { q: Built; group?: string }[];
  if (g.all) {
    built = g.all().slice(0, g.count).map((c) => ({ q: c.q, group: c.group }));
    // Ungrouped authored lists still ramp easy → hard (stable sort); grouped
    // lists (reading passages) keep their authored order.
    if (!built.some((b) => b.group)) built.sort((a, b) => a.q.difficulty - b.q.difficulty);
  } else {
    const r = mulberry32(hashStr(`gre-bank:${g.id}`));
    const seen = new Set<string>();
    const out: { q: Built; group?: string }[] = [];
    let attempts = 0;
    while (out.length < g.count && attempts < g.count * 80) {
      attempts++;
      const c = g.make!(r);
      if (!c || seen.has(c.key)) continue;
      seen.add(c.key);
      out.push({ q: c.q, group: c.group });
    }
    // stable: equal difficulties keep generation order
    built = out.sort((a, b) => a.q.difficulty - b.q.difficulty);
  }
  const list = built.map(
    ({ q, group }, i) =>
      ({ ...q, id: `${BANK_PREFIX}${g.id}.${i}`, lessonId: g.lessonId, ...(group ? { group } : {}) }) as BankQuestion,
  );
  cache.set(genId, list);
  return list;
}

function parseId(id: string): { genId: string; index: number } | null {
  if (!isBankId(id)) return null;
  const rest = id.slice(BANK_PREFIX.length);
  const dot = rest.lastIndexOf('.');
  if (dot < 0) return null;
  const index = Number(rest.slice(dot + 1));
  return Number.isInteger(index) ? { genId: rest.slice(0, dot), index } : null;
}

export function getBankQuestion(id: string): BankQuestion | undefined {
  const p = parseId(id);
  return p ? questionsFor(p.genId)[p.index] : undefined;
}

export const generatorOf = (id: string): Generator | undefined => {
  const p = parseId(id);
  return p ? GENERATOR_BY_ID[p.genId] : undefined;
};

/**
 * For review: a fresh sibling of a missed question (same skill, same
 * difficulty, different numbers) when the generator supports it — so review
 * tests the method, not your memory of one answer. Otherwise the original.
 */
export function bankVariant(id: string, salt: number): BankQuestion | undefined {
  const p = parseId(id);
  if (!p) return undefined;
  const g = GENERATOR_BY_ID[p.genId];
  const list = questionsFor(p.genId);
  const orig = list[p.index];
  if (!g?.variants || !orig) return orig;
  const same = list.filter((q) => q.difficulty === orig.difficulty && q.id !== orig.id);
  if (same.length === 0) return orig;
  return same[hashStr(`${id}:${salt}`) % same.length];
}

// --- sets -----------------------------------------------------------------------

export const SET_SIZE = 20;
/** Minutes per question at real GRE pace (26 min / 15 Q quant, 23 min / 15 Q verbal). */
export const PACE_MIN: Record<Track, number> = { quant: 26 / 15, verbal: 23 / 15 };

export interface BankSetMeta {
  id: string;
  track: Track;
  number: number;
  tier: 'Foundation' | 'Core' | 'Advanced';
}

/** A generator's questions as units: one question, or one passage's group. */
function unitsOf(g: Generator): string[][] {
  if (!g.all) return Array.from({ length: g.count }, (_, i) => [`${BANK_PREFIX}${g.id}.${i}`]);
  const units: string[][] = [];
  let last: string | undefined;
  for (const q of questionsFor(g.id)) {
    if (q.group && q.group === last) units[units.length - 1].push(q.id);
    else units.push([q.id]);
    last = q.group;
  }
  return units;
}

export const setCount = (t: Track): number => Math.max(1, Math.round(trackTotal(t) / SET_SIZE));

export function setsFor(t: Track): BankSetMeta[] {
  const S = setCount(t);
  return Array.from({ length: S }, (_, k) => ({
    id: `${t === 'quant' ? 'q' : 'v'}-${String(k + 1).padStart(3, '0')}`,
    track: t,
    number: k + 1,
    tier: k < S / 3 ? 'Foundation' : k < (2 * S) / 3 ? 'Core' : 'Advanced',
  }));
}

const layoutCache = new Map<Track, string[][]>();

/**
 * Deal the whole track into sets. Every unit (a question, or one passage's
 * questions) gets a position = how far through its generator's easy → hard
 * list it sits. Sorting all units by that position interleaves every topic
 * at matching difficulty; cutting the sorted list into equal chunks gives
 * ~20-question sets that mix all topics and ramp from Foundation to
 * Advanced. Every bank question lands in exactly one set.
 */
function trackLayout(t: Track): string[][] {
  const hit = layoutCache.get(t);
  if (hit) return hit;
  const S = setCount(t);
  const units: { pos: number; ids: string[] }[] = [];
  for (const g of GENERATORS.filter((x) => x.track === t)) {
    const U = unitsOf(g);
    const jitter = (hashStr(g.id) % 1000) / 1000;
    U.forEach((ids, i) => units.push({ pos: (i + jitter) / U.length, ids }));
  }
  units.sort((a, b) => a.pos - b.pos);
  const total = units.reduce((n, u) => n + u.ids.length, 0);
  const sets: string[][] = Array.from({ length: S }, () => []);
  let placed = 0;
  let k = 0;
  for (const u of units) {
    while (k < S - 1 && placed >= ((k + 1) * total) / S) k++;
    sets[k].push(...u.ids);
    placed += u.ids.length;
  }
  layoutCache.set(t, sets);
  return sets;
}

/** The question ids in one set, in a mixed (but stable) order. */
export function setQuestionIds(setId: string): string[] {
  const t: Track = setId.startsWith('q-') ? 'quant' : 'verbal';
  const k = Number(setId.slice(2)) - 1;
  const ids = trackLayout(t)[k] ?? [];
  // Shuffle whole units so a reading passage's questions stay together.
  const units: string[][] = [];
  let lastGroup: string | undefined;
  for (const id of ids) {
    const group = getBankQuestion(id)?.group;
    if (group && group === lastGroup) units[units.length - 1].push(id);
    else units.push([id]);
    lastGroup = group;
  }
  // Mix topics, then ease in: easier questions first (stable, so the mix holds).
  const minDiff = (u: string[]) => Math.min(...u.map((id) => getBankQuestion(id)?.difficulty ?? 2));
  return shuffle(mulberry32(hashStr(`set:${setId}`)), units)
    .map((u) => ({ u, d: minDiff(u) }))
    .sort((a, b) => a.d - b.d)
    .flatMap((x) => x.u);
}

export interface TopicMeta {
  id: string;
  topic: string;
  track: Track;
  lessonId: string;
  count: number;
}
export const TOPICS: TopicMeta[] = GENERATORS.map((g) => ({
  id: g.id,
  topic: g.topic,
  track: g.track,
  lessonId: g.lessonId,
  count: g.count,
}));
