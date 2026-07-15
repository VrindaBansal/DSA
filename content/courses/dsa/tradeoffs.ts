import type { TradeoffTableData } from '@/lib/types';

// Normalized tradeoff/complexity tables (spec §5.1). Lessons render them by
// id via <TradeoffTable id="..." />; /reference aggregates all of them.

export const TRADEOFFS: TradeoffTableData[] = [
  {
    id: 'queue-backings',
    lessonId: 'queues',
    title: 'What should back a queue?',
    columns: ['enqueue', 'dequeue', 'memory', 'verdict'],
    rows: [
      {
        label: 'Python list',
        cells: ['O(1) am.', 'O(n) ✗', 'contiguous, grows', 'never — pop(0) shifts everything'],
      },
      {
        label: 'collections.deque',
        cells: ['O(1)', 'O(1)', 'block-linked, grows', 'default choice'],
      },
      {
        label: 'Ring buffer',
        cells: ['O(1) worst', 'O(1) worst', 'fixed O(k), zero alloc', 'bounded buffers, hot paths, embedded'],
      },
      {
        label: 'queue.Queue',
        cells: ['O(1) + lock', 'O(1) + lock', 'grows', 'only across threads'],
      },
    ],
    note: 'The ring buffer is the only one with worst-case (not amortized) O(1) — fixed capacity means no resize can ever happen.',
  },
  {
    id: 'growth-rates',
    lessonId: 'big-o',
    title: 'Growth rates at n = 10⁶ (1 ns per step)',
    columns: ['steps', 'wall clock', 'feels like'],
    rows: [
      { label: 'O(1)', cells: ['1', '1 ns', 'instant'] },
      { label: 'O(log n)', cells: ['≈20', '20 ns', 'instant'] },
      { label: 'O(n)', cells: ['10⁶', '1 ms', 'instant'] },
      { label: 'O(n log n)', cells: ['2×10⁷', '20 ms', 'one frame'] },
      { label: 'O(n²)', cells: ['10¹²', '≈17 min', 'ticket filed'] },
      { label: 'O(2ⁿ)', cells: ['astronomical', 'heat death', 'wrong algorithm'] },
    ],
    note: 'The gap that matters in practice is n log n vs n² — it is the difference between "one frame" and "17 minutes".',
  },
  {
    id: 'amortized-vs-worst',
    lessonId: 'amortized',
    title: 'Amortized vs worst case — same structure, different questions',
    columns: ['append cost', 'when it bites', 'right lens'],
    rows: [
      {
        label: 'Dynamic array append',
        cells: ['O(1) amortized, O(n) worst', 'latency spikes at resize', 'throughput: amortized'],
      },
      {
        label: 'Ring buffer enqueue',
        cells: ['O(1) worst case', 'never (fixed capacity)', 'real-time: worst case'],
      },
      {
        label: 'Two-stack queue dequeue',
        cells: ['O(1) amortized, O(n) worst', 'the unlucky pour', 'throughput: amortized'],
      },
    ],
    note: 'Amortized bounds average over a sequence; they say nothing about the latency of one unlucky call. Real-time paths need worst-case bounds.',
  },
  {
    id: 'collision-strategies',
    lessonId: 'hashing-internals',
    title: 'Chaining vs open addressing',
    columns: ['collision handling', 'cache behavior', 'delete', 'degrades when'],
    rows: [
      {
        label: 'Chaining',
        cells: ['append to bucket list', 'poor — pointer chasing', 'unlink, easy', 'chains grow (bad hash)'],
      },
      {
        label: 'Open addressing',
        cells: ['probe next slot', 'excellent — one flat array', 'tombstones required', 'load factor nears 1'],
      },
      {
        label: 'CPython dict',
        cells: ['open addressing, perturbed probing', 'excellent', 'tombstones', 'resizes at ~⅔ load to prevent it'],
      },
    ],
    note: 'Both are O(1) average under a good hash — the fight is about constants, cache lines, and failure modes.',
  },
  {
    id: 'frontier-choice',
    lessonId: 'graphs-traversal',
    title: 'The frontier container IS the algorithm',
    columns: ['frontier', 'pops', 'finds', 'cost'],
    rows: [
      { label: 'BFS', cells: ['queue (FIFO)', 'oldest discovered', 'shortest paths, unweighted', 'O(V+E)'] },
      { label: 'DFS', cells: ['stack (LIFO)', 'newest discovered', 'cycles, topo order, components', 'O(V+E)'] },
      { label: 'Dijkstra', cells: ['min-heap by distance', 'cheapest so far', 'shortest paths, weights ≥ 0', 'O((V+E) log V)'] },
      { label: "Kahn's topo", cells: ['queue of in-degree 0', 'anything unblocked', 'dependency order / cycle detection', 'O(V+E)'] },
    ],
    note: 'One loop, four algorithms. Change what "next" means and you change what the traversal proves.',
  },
  {
    id: 'sort-zoo',
    lessonId: 'sorting-algorithms',
    title: 'The sorting zoo',
    columns: ['time', 'space', 'stable', 'personality'],
    rows: [
      { label: 'Merge', cells: ['Θ(n log n) always', 'O(n)', 'yes', 'predictable workhorse; external-sort friendly'] },
      { label: 'Quick (random pivot)', cells: ['O(n log n) expected, O(n²) worst', 'O(log n)', 'no', 'fastest constants in RAM'] },
      { label: 'Heap', cells: ['Θ(n log n) always', 'O(1)', 'no', 'worst-case insurance; cache-hostile'] },
      { label: 'Counting/radix', cells: ['O(n+k) / O(d(n+b))', 'O(n+k)', 'yes', 'escapes the comparison bound; needs small keys'] },
      { label: 'Timsort (sorted())', cells: ['O(n log n), O(n) on runs', 'O(n)', 'yes', 'exploits real-world order; the right default'] },
    ],
    note: 'Interview shortcut: name Timsort for practice, merge for stability proofs, quick for speed, heap for worst-case guarantees, radix for integers.',
  },
];

// TRADEOFF_BY_ID is assembled globally in content/tradeoffs.ts across courses.
