import type { CheatsheetData } from '@/lib/types';

export const CHEATSHEET: CheatsheetData = {
  lessonId: 'recursion-trees',
  opsTable: [
    { op: 'T(n)=T(n/2)+O(1)', complexity: 'Θ(log n)', note: 'binary search — path, constant per level' },
    { op: 'T(n)=T(n/2)+O(n)', complexity: 'Θ(n)', note: 'root dominates (geometric decay)' },
    { op: 'T(n)=2T(n/2)+O(n)', complexity: 'Θ(n log n)', note: 'merge sort — every level costs n' },
    { op: 'T(n)=2T(n/2)+O(1)', complexity: 'Θ(n)', note: 'tree walk — leaves dominate' },
    { op: 'T(n)=4T(n/2)+O(n)', complexity: 'Θ(n²)', note: 'leaves dominate: n^log₂4 of them' },
    { op: 'T(n)=2T(n−1)+O(1)', complexity: 'Θ(2ⁿ)', note: 'branch without shrinking — naive fib' },
  ],
  useWhen:
    'Any divide-and-conquer cost question; sanity-checking a recursive design before writing it; deriving bounds you forgot without the Master theorem.',
  dontUseWhen:
    'Subproblem sizes are uneven or data-dependent (quicksort worst case) — then argue directly about the unlucky shape.',
  stdlib: 'no import — draw the tree: node = local work, sum per level, spot the regime',
  bullets: [
    'Three regimes of level sums: shrinking → root wins; flat → level × depth; growing → count the leaves.',
    'Master theorem: compare f(n) with n^(log_b a). Bigger wins; tie adds the log factor.',
    'Depth comes from how the size shrinks: n/2 per call → log n deep; n−1 per call → n deep.',
    'Branching without halving is the exponential signature — 2 calls on n−1 is Θ(2ⁿ), the memoization alarm bell.',
  ],
  gotchas: [
    'Two recursive calls ≠ n log n. T(n)=2T(n−1)+1 is exponential — check how the ARGUMENT shrinks, not how many calls.',
    'The Master theorem needs polynomial f and constant a, b — T(n)=T(n−1)+n is outside it (it’s just Σ = Θ(n²)).',
  ],
};
