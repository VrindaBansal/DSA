import type { Question } from '@/lib/types';

// One or two anchor questions per stub lesson so practice and review span the
// whole curriculum even before the long-tail lectures are written (§12 P7).

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-window-sum',
    lessonId: 'dynamic-arrays',
    difficulty: 2,
    prompt:
      'Computing the sum of every k-length window in an array: recomputing each window costs O(nk). The sliding-window trick makes it O(n). What is the trick?',
    options: [
      'Sort the array first so windows are contiguous',
      'When the window slides one step, add the entering element and subtract the leaving one',
      'Use a second thread for the second half',
      'Cache every window sum in a dict',
    ],
    correctIndex: 1,
    explanation:
      'Adjacent windows share k−1 elements — recomputing them is pure waste. Maintain a running sum: +entering, −leaving, O(1) per slide. The general pattern: exploit overlap between consecutive states instead of rebuilding state.',
    distractorNotes: [
      'Sorting destroys the positional structure that defines the windows.',
      'Correct.',
      'Parallelism divides constants, not complexity classes.',
      'Caching n sums costs O(n) space to avoid work that the running trick avoids for free.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-hash-load',
    lessonId: 'hashing-internals',
    difficulty: 2,
    prompt: 'When does a hash map’s O(1) average lookup honestly degrade toward O(n)?',
    options: [
      'When it stores more than 1000 items',
      'When many keys collide into the same bucket — bad hash function or adversarial keys',
      'When the keys are strings instead of integers',
      'Never — O(1) is guaranteed by the structure',
    ],
    correctIndex: 1,
    explanation:
      'O(1) rests on keys spreading evenly. A weak hash (or attacker-chosen keys — the classic hash-DoS) piles keys into one bucket, and lookup becomes a linear chain scan. Load factor is the early-warning metric; resizing keeps it bounded.',
    distractorNotes: [
      'Size alone is fine — dicts resize to keep the load factor low.',
      'Correct.',
      'String hashing costs O(len(key)) per hash, but distribution is what decides the class.',
      '"Average O(1)" was always conditional on distribution — the fine print is the interview question.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-ll-reverse',
    lessonId: 'linked-lists',
    difficulty: 2,
    prompt: 'Reversing a singly linked list in place needs exactly three pointers (prev, curr, next). Why can’t two suffice?',
    options: [
      'Three is a convention; two work fine',
      'You must save curr.next BEFORE overwriting it, or the rest of the list is unreachable',
      'The third pointer stores the list length',
      'Python requires three references for garbage collection',
    ],
    correctIndex: 1,
    explanation:
      'The reversal step curr.next = prev destroys your only route forward. next exists to hold the continuation before you burn the bridge. Every linked-list bug is a version of "overwrote a pointer I still needed" — which is why the visual draws all three.',
    distractorNotes: [
      'Try it: the moment you flip curr.next with no saved copy, the tail is garbage.',
      'Correct.',
      'Length is irrelevant to reversal.',
      'GC keeps objects alive via any reference; that’s not the issue — reachability from YOUR traversal is.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-stack-lifo',
    lessonId: 'stacks-intro',
    difficulty: 1,
    prompt: 'Why is a stack the right structure for checking balanced brackets — ([{}]) — in a parser?',
    options: [
      'Brackets arrive in FIFO order',
      'The most recently opened bracket must close first — nesting is LIFO by definition',
      'Stacks store characters more compactly',
      'A dict of counts would fail only on unicode',
    ],
    correctIndex: 1,
    explanation:
      'Nesting means the innermost (most recent) open bracket is the next one that must close. "Most recent first" IS the stack contract. Push opens; on a close, pop and demand a match. The call stack does the same job for function calls — it’s the same shape.',
    distractorNotes: [
      'FIFO would match the OLDEST open bracket — exactly wrong for nesting.',
      'Correct.',
      'Storage size is identical; the discipline differs.',
      'Counts can’t catch ordering errors: "([)]" has balanced counts and broken nesting.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-heapify',
    lessonId: 'heaps-intro',
    difficulty: 3,
    prompt: 'Building a heap from n arbitrary items: pushing one-by-one costs O(n log n). heapify does it in O(n). Where does the saving come from?',
    options: [
      'heapify skips the comparisons',
      'Sift-down work is bounded by node height, and most nodes are near the bottom with tiny heights — the sum telescopes to O(n)',
      'heapify only heapifies half the array',
      'It doesn’t — heapify is also O(n log n), people round it down',
    ],
    correctIndex: 1,
    explanation:
      'Half the nodes are leaves (height 0, zero work), a quarter have height 1, … Σ n/2^(h+1) · h = O(n). Pushing one-by-one charges log-of-current-size per item, and the many late items each pay the full log. Bottom-up sifting charges by height instead — and heights are mostly zero.',
    distractorNotes: [
      'Comparisons are the work; nothing skips them, they’re just distributed better.',
      'Correct.',
      'It starts at the last internal node (n//2 − 1), but that’s a detail of the same height argument.',
      'The O(n) bound is exact and classic — this "correction" is the common interview trap.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-bst-degenerate',
    lessonId: 'trees-bst',
    difficulty: 2,
    prompt: 'Insert 1, 2, 3, …, n into an unbalanced BST in that order. What do you get, and what does search now cost?',
    options: [
      'A perfectly balanced tree — O(log n) search',
      'A right-leaning chain — effectively a linked list, O(n) search',
      'The BST rejects sorted input',
      'A random shape — O(log n) expected',
    ],
    correctIndex: 1,
    explanation:
      'Each new key is larger than everything present, so it becomes the rightmost child: a chain of depth n. Every BST guarantee is really "O(height)" — and sorted input maximizes height. This degeneration is the entire reason AVL/red-black trees (and B-trees under your SQL indexes) exist.',
    distractorNotes: [
      'Balance never happens by luck on sorted input — it must be enforced.',
      'Correct.',
      'A plain BST has no opinion about input order; it just quietly degrades.',
      '"Random shape" needs random insertion order — sorted is the adversarial case.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-bfs-shortest',
    lessonId: 'graphs-traversal',
    difficulty: 2,
    prompt: 'Why does BFS find shortest paths in an UNWEIGHTED graph, and why does that argument break with weights?',
    options: [
      'BFS visits nodes in increasing distance order, so the first arrival is via a fewest-edges path; weights break the "each layer = +1 cost" equivalence',
      'BFS tries all paths and picks the best',
      'BFS doesn’t find shortest paths; only Dijkstra does',
      'It works with weights too if you sort the adjacency lists',
    ],
    correctIndex: 0,
    explanation:
      'The FIFO frontier sweeps the graph in layers: all nodes k edges away are reached before any node k+1 away. Unweighted, edges = cost, so first arrival = cheapest. With weights a 2-edge path can be cheaper than a 1-edge path, layers no longer mean cost — Dijkstra fixes this by popping the cheapest (priority queue), not the oldest.',
    distractorNotes: [
      'Correct.',
      'BFS never enumerates paths — it expands each node once; the ordering does the proof.',
      'BFS IS Dijkstra for the all-weights-equal case.',
      'Sorting neighbors changes tie-breaking, not the layer-vs-cost mismatch.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-sort-stable',
    lessonId: 'sorting-algorithms',
    difficulty: 2,
    prompt: 'You sort orders by date, then sort the result by customer. With a STABLE sort, what does the final list look like?',
    options: [
      'Grouped by customer, and within each customer still in date order',
      'Grouped by customer in random internal order',
      'Sorted by date only — the second sort undoes the first',
      'Stability only matters for descending sorts',
    ],
    correctIndex: 0,
    explanation:
      'Stable = equal keys keep their prior relative order. So the customer sort preserves the date ordering within each customer group — multi-key sorting by chaining single-key sorts, last key first. Python’s Timsort is stable, which is why this idiom works; quicksort is not, which is why some databases’ ORDER BY surprises people.',
    distractorNotes: [
      'Correct.',
      'That’s what an UNstable sort gives you — and the bug report that follows.',
      'The second sort reorders by customer but, stably, breaks ties by the existing (date) order.',
      'Direction is irrelevant; stability is about ties.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-bsearch-invariant',
    lessonId: 'binary-search',
    difficulty: 2,
    prompt: 'The loop invariant of binary search is: "if the target exists, it lies within a[lo..hi]". What do most off-by-one bugs violate?',
    options: [
      'The invariant — by moving lo or hi so the bracket can exclude the target, or fail to shrink',
      'The sortedness of the array',
      'The O(log n) bound',
      'The requirement that n be a power of two',
    ],
    correctIndex: 0,
    explanation:
      'mid = (lo+hi)//2 then lo = mid + 1 / hi = mid − 1 keeps the invariant AND guarantees shrinkage. Write lo = mid (with certain bounds) and the window can stall forever at two elements; drop a +1 and you can evict the answer. Debug binary search by stating the invariant, not by shuffling ±1 until tests pass.',
    distractorNotes: [
      'Correct.',
      'Sortedness is a precondition; the loop can’t break it.',
      'A buggy search usually still halves — it just halves toward the wrong answer or loops.',
      'Binary search never needed powers of two; the halves are just uneven by one.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-dp-overlap',
    lessonId: 'dp-foundations',
    difficulty: 2,
    prompt: 'Memoization turned naive fib from exponential to linear. Why does the same trick do nothing for merge sort?',
    options: [
      'Merge sort’s subproblems are all distinct — nothing repeats, so there is nothing to cache',
      'Merge sort is too fast to memoize',
      'Sorting can’t be expressed recursively',
      'Memoization only works on numbers',
    ],
    correctIndex: 0,
    explanation:
      'Memoization pays off exactly when the recursion tree contains the SAME subproblem many times (fib(38) appears ~10⁵ times in fib(50)). Merge sort splits into disjoint halves — every subarray is sorted exactly once. Overlapping subproblems is the first DP prerequisite; optimal substructure is the second.',
    distractorNotes: [
      'Correct.',
      'Speed isn’t the criterion — repetition is.',
      'Merge sort IS the canonical recursive algorithm.',
      'Any hashable subproblem key can be memoized; sorting subproblems just never recur.',
    ],
  },
  {
    kind: 'code',
    id: 'q-siftdown-code',
    lessonId: 'heaps-intro',
    difficulty: 2,
    prompt:
      'Write sift_down for a min-heap stored in a flat array: children of i live at 2i+1 and 2i+2. Swap downward with the smaller child until the heap property holds. Only the first n slots are the heap.',
    starterCode: `def sift_down(heap, i, n):
    # Min-heap. Restore the heap property for the subtree rooted at i,
    # assuming both child subtrees are already valid heaps.
    # children: 2*i+1 and 2*i+2 ; only indices < n are inside the heap
    # TODO
    ...
`,
    tests: `def test_leaf_untouched():
    h = [1, 3, 2]
    sift_down(h, 2, 3)
    assert h == [1, 3, 2]

def test_swaps_with_smaller_child():
    h = [5, 1, 2]
    sift_down(h, 0, 3)
    assert h == [1, 5, 2], "must swap with the SMALLER child, not just any child"

def test_sifts_full_path():
    h = [9, 1, 2, 3, 4, 5, 6]
    sift_down(h, 0, 7)
    for i in range(7):
        for c in (2*i+1, 2*i+2):
            if c < 7:
                assert h[i] <= h[c], f"heap property violated at parent {i}, child {c}"

def test_respects_size_n():
    h = [7, 1, 2, 0, 0]
    sift_down(h, 0, 3)   # only first 3 elements are the heap
    assert h[:3] == [1, 7, 2] and h[3:] == [0, 0], "slots beyond n must not be touched"
`,
    hints: [
      'Find the smaller of the (up to two) children that exist below n. Compare it with heap[i].',
      'If the parent already ≤ smallest child, stop. Otherwise swap and continue from the child’s index — a loop is cleaner than recursion.',
      'Pattern: smallest = i; if l < n and heap[l] < heap[smallest]: smallest = l; same for r; if smallest == i: return; swap; i = smallest; repeat.',
    ],
    solution: `def sift_down(heap, i, n):
    while True:
        smallest = i
        l, r = 2 * i + 1, 2 * i + 2
        if l < n and heap[l] < heap[smallest]:
            smallest = l
        if r < n and heap[r] < heap[smallest]:
            smallest = r
        if smallest == i:
            return
        heap[i], heap[smallest] = heap[smallest], heap[i]
        i = smallest
`,
    complexityCheck: {
      prompt: 'Worst-case time of one sift_down on a heap of n elements?',
      options: [
        'O(log n) — at most one swap per level, and the tree is log n tall',
        'O(n) — it may visit every node',
        'O(1) — one swap fixes it',
        'O(n log n) — it sifts every subtree',
      ],
      correctIndex: 0,
      explanation:
        'The element falls along a single root-to-leaf path: ≤ height swaps, and a complete binary tree’s height is ⌊log₂ n⌋. (That heights are mostly small is also why heapify — n sift_downs — totals O(n), not O(n log n).)',
    },
  },
  {
    kind: 'code',
    id: 'q-unionfind-code',
    lessonId: 'graphs-traversal',
    difficulty: 3,
    prompt:
      'Complete find (with path compression) and union on this disjoint-set union. find must point every node it visits directly at the root.',
    starterCode: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))   # each node starts as its own root

    def find(self, x):
        # TODO: walk to the root; then point everything on the path AT the root
        ...

    def union(self, a, b):
        # TODO: find both roots; if different, attach one root to the other
        ...
`,
    tests: `def test_initially_disjoint():
    d = DSU(3)
    assert d.find(0) != d.find(1) != d.find(2)

def test_union_connects():
    d = DSU(4)
    d.union(0, 1); d.union(2, 3)
    assert d.find(0) == d.find(1)
    assert d.find(2) == d.find(3)
    assert d.find(0) != d.find(2)
    d.union(1, 2)
    assert d.find(0) == d.find(3)

def test_path_compression():
    d = DSU(6)
    for i in range(5):
        d.union(i, i + 1)
    root = d.find(0)
    assert d.parent[0] == root, "after find(0), node 0 must point DIRECTLY at the root"

def test_self_union_safe():
    d = DSU(2)
    d.union(0, 0)
    assert d.find(0) == 0 or d.find(0) == d.parent[0]
`,
    hints: [
      'find: first loop to the root (parent[r] == r). That’s the easy half.',
      'Compression: walk the path AGAIN from x, setting parent[node] = root as you go. Two small loops beat clever recursion.',
      'union: ra, rb = find(a), find(b); if ra != rb: parent[ra] = rb. That’s the whole thing.',
    ],
    solution: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.parent[ra] = rb
`,
    complexityCheck: {
      prompt: 'With path compression (and union by rank), what does one find/union cost, amortized?',
      options: [
        'Effectively O(1) — O(α(n)), the inverse Ackermann function, ≤ 4 for any feasible n',
        'O(log n) always',
        'O(n) — it can walk the whole structure',
        'O(1) worst case, exactly',
      ],
      correctIndex: 0,
      explanation:
        'The celebrated bound is O(α(n)) amortized — α is the inverse Ackermann function, ≤ 4 for any n that fits in the universe. Compression flattens paths as a side effect of every find, so early O(n)-ish walks prepay later O(1) hops: amortized analysis again, in the wild.',
    },
  },
];
