import type { CheatsheetData } from '@/lib/types';

export const CHEATSHEET: CheatsheetData = {
  lessonId: 'space-complexity',
  opsTable: [
    { op: 'in-place reverse/swap', complexity: 'O(1) aux', note: 'two indices and a temp' },
    { op: 'copy / slice arr[:]', complexity: 'O(n) aux', note: 'every slice is a new array' },
    { op: 'recursion depth d', complexity: 'O(d) aux', note: 'stack frames are memory' },
    { op: 'merge sort', complexity: 'O(n) aux', note: 'the merge buffer' },
    { op: 'quicksort (in-place)', complexity: 'O(log n) expected aux', note: 'recursion stack only; O(n) worst' },
    { op: 'memoization table', complexity: 'O(#distinct subproblems)', note: 'time bought with space' },
  ],
  useWhen:
    'Anything with "in place" in the prompt; embedded/mobile constraints; asking whether a copy or the call stack is your real memory bill.',
  dontUseWhen:
    'Memory is abundant and the time win is real — an O(n) dict that makes the algorithm O(n) is almost always the right trade.',
  stdlib: 'sys.getsizeof · sys.setrecursionlimit (default ~1000 — depth IS space)',
  bullets: [
    'Convention: report auxiliary space — memory beyond the input.',
    'Peak simultaneous memory is what counts, wherever it lives: heap or call stack.',
    'Recursion depth = space: linear recursion is O(n) space even with zero allocations; halving recursion is O(log n).',
    'Python has no tail-call elimination — rewriting to a loop is a real space optimization, not style.',
  ],
  gotchas: [
    'arr[::-1] inside a "space-optimized" function quietly allocates a full copy.',
    'RecursionError at ~1000 frames is Python telling you your space complexity out loud.',
  ],
};
