import type { CheatsheetData } from '@/lib/types';

// Cheatsheets for the module lectures — the night-before ops tables,
// use/don’t-use verdicts, and stdlib lines aggregated on /reference.

export const MODULE_CHEATSHEETS: CheatsheetData[] = [
  {
    lessonId: 'dynamic-arrays',
    opsTable: [
      { op: 'index / assign', complexity: 'O(1)', note: 'contiguous memory + offset math' },
      { op: 'append', complexity: 'O(1) amortized', note: 'doubling — see Module 1' },
      { op: 'insert / delete at front', complexity: 'O(n)', note: 'shifts everything' },
      { op: 'search unsorted', complexity: 'O(n)', note: 'sorted → binary search O(log n)' },
      { op: 'slice arr[a:b]', complexity: 'O(b−a)', note: 'always a copy' },
    ],
    useWhen: 'Random access dominates; sizes are unknown but growth is append-shaped; cache locality matters.',
    dontUseWhen: 'You hammer the front (deque) or need lookup by key (dict).',
    stdlib: 'list · two pointers: i, j indices · window: running aggregate',
    bullets: [
      'Two pointers needs sorted input or a monotonic predicate — that’s what lets you move only forward.',
      'Sliding window: +entering, −leaving; never recompute the overlap.',
      'Prefix sums: precompute once O(n), then any range sum is O(1): P[j]−P[i].',
    ],
  },
  {
    lessonId: 'hashing-internals',
    opsTable: [
      { op: 'get / set / in', complexity: 'O(1) avg', note: 'O(n) when collisions pile up' },
      { op: 'delete', complexity: 'O(1) avg', note: 'tombstones in open addressing' },
      { op: 'iterate', complexity: 'O(n)', note: 'insertion order in Python 3.7+' },
      { op: 'resize (rehash all)', complexity: 'O(n)', note: 'amortized away, like list doubling' },
    ],
    useWhen: 'Lookup/dedupe/count by key — the default answer to "have I seen this before?"',
    dontUseWhen: 'You need ordering, range queries (tree/sorted array), or worst-case guarantees on adversarial keys.',
    stdlib: 'dict · set · collections.Counter · collections.defaultdict',
    bullets: [
      'Load factor = items/buckets; resizing keeps it bounded so chains stay O(1) on average.',
      'Chaining stores collisions in per-bucket lists; open addressing probes for the next free slot.',
      'Only hash immutables: a mutated key changes its hash and gets lost in the wrong bucket.',
    ],
    gotchas: ['dict keys must be hashable — lists/dicts/sets are not; tuples are (if their contents are).'],
  },
  {
    lessonId: 'linked-lists',
    opsTable: [
      { op: 'push/pop at head', complexity: 'O(1)', note: 'the whole point' },
      { op: 'insert/delete after a held node', complexity: 'O(1)', note: 'pointer splice' },
      { op: 'index / search', complexity: 'O(n)', note: 'no random access, poor cache locality' },
      { op: 'doubly-linked delete of held node', complexity: 'O(1)', note: 'what makes LRU O(1)' },
    ],
    useWhen: 'O(1) splice at a held position: LRU caches, adjacency lists, undo chains.',
    dontUseWhen: 'You index by position or scan a lot — arrays crush it on cache locality.',
    stdlib: 'no bare stdlib singly-list; collections.deque (block-linked) · OrderedDict / functools.lru_cache for LRU',
    bullets: [
      'Reversal = three pointers: save next, flip curr.next to prev, advance. Never burn an unread pointer.',
      'Fast–slow pointers: cycle detection and midpoint in one pass, O(1) space.',
      'LRU = hash map (O(1) find) + doubly-linked list (O(1) move-to-front / evict-tail).',
    ],
  },
  {
    lessonId: 'stacks-intro',
    opsTable: [
      { op: 'push / pop / peek', complexity: 'O(1)', note: 'list.append / list.pop()' },
      { op: 'search', complexity: 'O(n)', note: 'not what stacks are for' },
      { op: 'monotonic stack sweep', complexity: 'O(n) total', note: 'each element pushed+popped once' },
    ],
    useWhen: 'Nesting, most-recent-first, backtracking: brackets, undo, call frames, "next greater element."',
    dontUseWhen: 'You need the oldest item (queue) or the extreme item (heap).',
    stdlib: 'list — append(x) / pop() from the END only',
    bullets: [
      'The call stack is the stack you use daily: frames push on call, pop on return; recursion depth = stack height.',
      'Monotonic stack: maintain increasing/decreasing invariant; pop while violated — amortized O(1) per element.',
      'Undo/redo = two stacks: actions pushed on undo-stack; undo moves them to redo-stack.',
    ],
  },
  {
    lessonId: 'heaps-intro',
    opsTable: [
      { op: 'push', complexity: 'O(log n)', note: 'sift up' },
      { op: 'pop min/max', complexity: 'O(log n)', note: 'swap last to root, sift down' },
      { op: 'peek', complexity: 'O(1)', note: 'root of the array' },
      { op: 'heapify n items', complexity: 'O(n)', note: 'NOT n log n — heights telescope' },
      { op: 'top-K of a stream', complexity: 'O(n log k)', note: 'keep a size-k heap' },
    ],
    useWhen: '"Best next" repeatedly: schedulers, dispatch, top-K, k-way merge, Dijkstra’s frontier.',
    dontUseWhen: 'You need full sorted order (sort), lookup by key (dict), or both ends (deque).',
    stdlib: 'heapq — min-heap; max-heap = push negated keys · heapq.nlargest/nsmallest',
    bullets: [
      'Flat-array tree: children of i at 2i+1, 2i+2; parent at (i−1)//2. No pointers, perfect locality.',
      'One invariant: parent ≤ children. Everything is "restore the invariant along one path" — hence log n.',
      'Two-heap median: max-heap of the low half + min-heap of the high half, rebalance to ±1.',
    ],
  },
  {
    lessonId: 'trees-bst',
    opsTable: [
      { op: 'search / insert / delete (balanced)', complexity: 'O(log n)', note: 'O(height), and balance forces height ≈ log n' },
      { op: 'same, degenerate BST', complexity: 'O(n)', note: 'sorted inserts → linked list' },
      { op: 'in-order traversal', complexity: 'O(n)', note: 'yields sorted order — the defining property' },
      { op: 'trie lookup of word w', complexity: 'O(len(w))', note: 'independent of dictionary size' },
    ],
    useWhen: 'Ordered data with range queries, floor/ceiling, sorted iteration; tries for prefix search.',
    dontUseWhen: 'Only exact-key lookup matters — a dict is simpler and faster.',
    stdlib: 'no built-in BST — bisect on a sorted list covers the small-n cases; SQL indexes are B-trees doing this at scale',
    bullets: [
      'Every BST cost is really O(height); balancing (AVL/red-black) is the machinery that pins height to log n.',
      'Deletion’s three cases: leaf → unlink; one child → splice; two children → swap with in-order successor, delete that.',
      'B-trees are BSTs redesigned for pages: hundreds of keys per node so height ≈ 3-4 on disk.',
    ],
  },
  {
    lessonId: 'graphs-traversal',
    opsTable: [
      { op: 'BFS / DFS', complexity: 'O(V + E)', note: 'each vertex and edge touched once' },
      { op: 'shortest path unweighted', complexity: 'O(V + E)', note: 'BFS layers = distance' },
      { op: 'Dijkstra (binary heap)', complexity: 'O((V+E) log V)', note: 'weights → priority frontier' },
      { op: 'topological sort', complexity: 'O(V + E)', note: 'DFS finish order, or Kahn’s in-degrees' },
      { op: 'union-find ops', complexity: '≈O(1) amortized', note: 'α(n) with compression + rank' },
    ],
    useWhen: 'Anything that is entities + relationships: dependencies, routing, social reachability, build order.',
    dontUseWhen: 'The structure is a tree/sequence in disguise — don’t pay adjacency-list overhead for a hierarchy.',
    stdlib: 'dict[node, list[node]] adjacency · collections.deque for BFS · graphlib.TopologicalSorter',
    bullets: [
      'The frontier container IS the algorithm: queue → BFS, stack → DFS, priority queue → Dijkstra.',
      'Mark visited when ENQUEUING, not when popping — or the frontier fills with duplicates.',
      'Cycle in a directed graph = back edge found during DFS = "your npm install never resolves."',
    ],
  },
  {
    lessonId: 'sorting-algorithms',
    opsTable: [
      { op: 'merge sort', complexity: 'O(n log n) always', note: 'stable, O(n) space' },
      { op: 'quicksort', complexity: 'O(n log n) avg, O(n²) worst', note: 'in-place, unstable, pivot-sensitive' },
      { op: 'heapsort', complexity: 'O(n log n) always', note: 'in-place, unstable, cache-unfriendly' },
      { op: 'counting/radix', complexity: 'O(n + k)', note: 'beats n log n by not comparing' },
      { op: 'Timsort (Python sorted)', complexity: 'O(n log n), O(n) on runs', note: 'stable, adaptive' },
    ],
    useWhen: 'sorted()/.sort() for 99% of life; know the zoo for the 1% and the interview.',
    dontUseWhen: 'You only need the top-K (heap) or the k-th element (quickselect, O(n) average).',
    stdlib: 'sorted(xs, key=..., reverse=...) · xs.sort() · both stable',
    bullets: [
      'Stability = equal keys keep prior order → chain sorts, last key first.',
      'The n log n comparison lower bound is real; counting/radix escape it by exploiting key structure.',
      'Naive first-element pivot + sorted input = quicksort’s O(n²) — watch it die in the race visual.',
    ],
  },
  {
    lessonId: 'binary-search',
    opsTable: [
      { op: 'search sorted array', complexity: 'O(log n)', note: 'halve the bracket each probe' },
      { op: 'bisect_left / insertion point', complexity: 'O(log n)', note: 'leftmost slot where x fits' },
      { op: 'search on the ANSWER space', complexity: 'O(log range × check)', note: 'needs a monotonic predicate' },
      { op: 'quickselect k-th element', complexity: 'O(n) average', note: 'partition, recurse one side' },
    ],
    useWhen: 'Sorted data — or ANY monotonic yes/no question: capacities, thresholds, "first version that fails" (git bisect).',
    dontUseWhen: 'Unsorted and unsortable-cheaply data, or the predicate isn’t monotonic — halving needs one flip point.',
    stdlib: 'bisect.bisect_left / bisect_right / insort',
    bullets: [
      'The invariant is the algorithm: "answer (if any) ∈ a[lo..hi]". Every ± 1 bug is an invariant bug.',
      'lo = mid+1 / hi = mid−1 guarantees shrinkage — no infinite loop, no evicted answer.',
      'Binary search on the answer: guess a value, check feasibility (monotonic), halve the range — sorted array optional.',
    ],
  },
  {
    lessonId: 'dp-foundations',
    opsTable: [
      { op: 'naive overlapping recursion', complexity: 'O(2ⁿ)-ish', note: 'the recursion tree repeats itself' },
      { op: 'memoized (top-down)', complexity: 'O(#subproblems × transition)', note: 'each subproblem solved once' },
      { op: 'tabulated (bottom-up)', complexity: 'same time, no stack', note: 'fill order replaces recursion' },
      { op: 'space-optimized table', complexity: 'often O(row)', note: 'keep only what transitions read' },
    ],
    useWhen: 'Overlapping subproblems + optimal substructure: edit distance, knapsack, LIS, counting paths.',
    dontUseWhen: 'Subproblems never repeat (divide-and-conquer) or greedy is provably safe (exchange argument).',
    stdlib: 'functools.lru_cache(maxsize=None) — memoization as a decorator',
    bullets: [
      'Recipe: define the state in words → write the recurrence → pick memo or table → optimize space last.',
      'Memo fills the table in dependency order lazily; tabulation fills it in index order eagerly — same table.',
      'Edit distance IS diff: the table’s arrows are the insert/delete/substitute script between two strings.',
    ],
  },
];
