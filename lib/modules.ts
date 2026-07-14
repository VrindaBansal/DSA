import type { ModuleMeta } from './types';

// The 12-module curriculum (spec §6). Pure data — safe on client and server.
export const MODULES: ModuleMeta[] = [
  {
    slug: 'complexity',
    number: 1,
    title: 'Complexity',
    blurb: 'Big-O, Θ, Ω · amortized analysis · space complexity · recursion trees + Master theorem',
    anchors: ['Why an O(n²) autocomplete dies at 10k contacts'],
  },
  {
    slug: 'arrays',
    number: 2,
    title: 'Arrays and dynamic arrays',
    blurb: 'Static vs dynamic · amortized doubling · two pointers · sliding window · prefix sums',
    anchors: ['Python list internals', 'Image convolution as a sliding window'],
  },
  {
    slug: 'hashing',
    number: 3,
    title: 'Hashing',
    blurb: 'Hash functions · collisions (chaining vs open addressing) · load factor · when dict is not O(1)',
    anchors: ['Database indexes', 'Deduping event streams', 'DNS caching'],
  },
  {
    slug: 'linked-structures',
    number: 4,
    title: 'Linked structures',
    blurb: 'Singly/doubly linked · fast–slow pointers · LRU cache',
    anchors: ['Browser history (doubly linked)', 'LRU in a CDN edge cache'],
  },
  {
    slug: 'stacks',
    number: 5,
    title: 'Stacks',
    blurb: 'Array vs linked backing · monotonic stack · the call stack',
    anchors: ['The call stack itself', 'Undo/redo', 'Expression parsing in a compiler'],
  },
  {
    slug: 'queues',
    number: 6,
    title: 'Queues and deques',
    blurb: 'FIFO · ring buffer · deque · priority queue preview',
    anchors: ['Gmail send → SMTP worker queue', 'Kafka', 'Print spoolers', 'BFS frontier'],
  },
  {
    slug: 'heaps',
    number: 7,
    title: 'Heaps and priority queues',
    blurb: 'Binary heap · sift up/down · heapify · two-heap median · top-K',
    anchors: ['OS process scheduler', 'Uber dispatch', 'k-nearest results in a search ranker'],
  },
  {
    slug: 'trees',
    number: 8,
    title: 'Trees',
    blurb: 'Binary trees · traversals · BST · balancing (conceptual) · tries',
    anchors: ['Filesystem', 'DOM', 'Autocomplete tries', 'B-trees under every SQL index'],
  },
  {
    slug: 'graphs',
    number: 9,
    title: 'Graphs',
    blurb: 'Representations · BFS/DFS · topological sort · union-find · Dijkstra',
    anchors: ['Social graphs', 'Build dependency ordering (npm, Make)', 'Maps routing'],
  },
  {
    slug: 'sorting',
    number: 10,
    title: 'Sorting',
    blurb: 'Merge · quick (Lomuto + Hoare) · heap · counting/radix · Timsort · stability',
    anchors: ['Stable ORDER BY', 'Leaderboard sorting', 'External sort on files too big for RAM'],
  },
  {
    slug: 'searching',
    number: 11,
    title: 'Searching',
    blurb: 'Binary search · bisect from scratch · binary search on the answer · quickselect',
    anchors: ['Git bisect', 'Rate-limit threshold tuning', 'Percentile queries'],
  },
  {
    slug: 'dp',
    number: 12,
    title: 'Recursion, backtracking, DP, greedy',
    blurb: 'Memo → tabulate → space-optimize · knapsack/LIS/edit distance · when greedy is provably safe',
    anchors: ['Diff algorithms (edit distance)', 'Autocomplete ranking', 'Cache eviction heuristics'],
  },
];

export const getModule = (slug: string): ModuleMeta | undefined =>
  MODULES.find((m) => m.slug === slug);
