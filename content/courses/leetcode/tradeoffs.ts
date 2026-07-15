import type { TradeoffTableData } from '@/lib/types';

// Cracking LeetCode — tradeoff / decision tables referenced by <TradeoffTable
// id="..." /> and listed on /reference. The signal→pattern table is the spine
// of the whole course: it's how you turn "I have no idea where to start" into
// "this is a sliding-window problem."

export const TRADEOFFS: TradeoffTableData[] = [
  {
    id: 'lc-pattern-signals',
    lessonId: 'lc-method',
    title: 'The signal → pattern cheat table',
    columns: ['If the problem says…', 'Reach for', 'Because'],
    rows: [
      {
        label: 'Sorted array / two ends / pair summing to a target',
        cells: ['Two pointers', 'One pass, O(1) space — the sort already ordered the search'],
      },
      {
        label: 'Contiguous subarray / substring, “longest/shortest/at most k”',
        cells: ['Sliding window', 'Grow and shrink one window instead of re-scanning every range'],
      },
      {
        label: '“Have I seen this?” / count / complement / dedupe',
        cells: ['Hash set or dict', 'O(1) membership turns an O(n²) scan into O(n)'],
      },
      {
        label: 'Sorted input, or “find the boundary / minimum that works”',
        cells: ['Binary search (maybe on the answer)', 'Halve the search space each step: O(log n)'],
      },
      {
        label: 'Matching pairs, “next greater/smaller”, nesting',
        cells: ['Stack (often monotonic)', 'The most recent unmatched thing is exactly the top'],
      },
      {
        label: 'Tree / grid / “explore all connected”',
        cells: ['DFS or BFS', 'BFS for shortest steps, DFS for “does a path exist / all paths”'],
      },
      {
        label: '“k largest / smallest / most frequent”, streaming',
        cells: ['Heap', 'Keep only the k that matter: O(n log k)'],
      },
      {
        label: 'Generate all combinations / permutations / subsets',
        cells: ['Backtracking', 'Choose → explore → un-choose over the decision tree'],
      },
      {
        label: 'Count ways / min/max over choices with overlapping subproblems',
        cells: ['Dynamic programming', 'Define a state, reuse its answer instead of recomputing'],
      },
    ],
    note: 'Recognition is 80% of the battle. Read the constraints (next lesson) to confirm the complexity the pattern must hit.',
  },
  {
    id: 'lc-dp-forms',
    lessonId: 'lc-dp-1d',
    title: 'The three forms of the same DP',
    columns: ['Form', 'How', 'Space', 'When to use'],
    rows: [
      {
        label: 'Top-down (memoized recursion)',
        cells: [
          'Write the recurrence literally; cache results in a dict/@lru_cache',
          'O(states)',
          'First draft — it maps 1:1 to the recurrence, easiest to get right',
        ],
      },
      {
        label: 'Bottom-up (tabulation)',
        cells: [
          'Fill a table from base cases up in dependency order',
          'O(states)',
          'No recursion-depth risk; often clearer complexity',
        ],
      },
      {
        label: 'Space-optimized',
        cells: [
          'Keep only the last row/few values the transition reads',
          'O(width)',
          'When each state depends only on the previous row/couple of cells',
        ],
      },
    ],
    note: 'Always allowed to stop at the first form that passes. Optimize space only when asked or when it obviously matters.',
  },
];
