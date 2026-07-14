import { RATE_LIMIT_PER_MINUTE } from './config';

// Trivial in-process rate guard (spec §8): a runaway render loop can't drain
// my OpenAI credits. Single user, single process — a sliding window is plenty.

const hits: number[] = [];

export function rateLimited(): boolean {
  const now = Date.now();
  while (hits.length > 0 && hits[0] < now - 60_000) hits.shift();
  if (hits.length >= RATE_LIMIT_PER_MINUTE) return true;
  hits.push(now);
  return false;
}
