import type { CheatsheetData } from '@/lib/types';

export const CHEATSHEET: CheatsheetData = {
  lessonId: 'amortized',
  opsTable: [
    { op: 'list.append (doubling)', complexity: 'O(1) amortized', note: 'O(n) on the resize call' },
    { op: 'n appends total', complexity: 'O(n)', note: 'copies form geometric series < 2n' },
    { op: 'growth by fixed +k', complexity: 'O(n) amortized ✗', note: 'total goes quadratic — never do this' },
    { op: 'ring buffer enqueue', complexity: 'O(1) worst case', note: 'the stronger promise: no resize exists' },
    { op: 'two-stack queue dequeue', complexity: 'O(1) amortized', note: 'each element moved ≤ 2 times ever' },
  ],
  useWhen:
    'Judging throughput of a sequence of operations — bulk loads, streaming appends, batch processing.',
  dontUseWhen:
    'A single operation has a latency budget (game frame, audio callback, trading path) — amortized explicitly permits the rare O(n) spike.',
  stdlib: 'list.append / pop() are amortized O(1); collections.deque both ends O(1)',
  bullets: [
    'Amortized = guaranteed average over any worst-case sequence. No probability anywhere.',
    'The accounting trick: charge each cheap op a constant "tax" that prepays the rare expensive one.',
    'Doubling works because resize frequency falls exactly as fast as resize cost rises.',
    'CPython actually grows lists by ~1.125× + constant, not 2× — same geometric argument, tighter memory.',
  ],
  gotchas: [
    'Amortized O(1) append does NOT mean the 1,048,577th append is fast — that one copies a million elements.',
    'Calling list(x) "free" hides an O(n) copy — amortization never applies to wholesale copies.',
  ],
};
