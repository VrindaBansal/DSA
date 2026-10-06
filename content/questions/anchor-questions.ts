import type { Question } from '@/lib/types';

// The original anchor questions for each module lecture — kept alongside the
// per-lesson deep-dive banks in content/lessons/<id>/questions.ts.

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-window-sum',
    lessonId: 'dynamic-arrays',
    difficulty: 2,
    prompt:
      'Computing the sum of every k-length window in an array: recomputing each window costs O(nk). The sliding-window trick makes it O(n). What is the trick?',
    options: [
      'Sort the array first, so that every window becomes one contiguous block',
      'Cache every window sum in a dict, so repeated windows are looked up in O(1)',
      'Use a second thread for the second half, so the two halves run in parallel',
      'When the window slides, add the entering element and subtract the leaving one',
    ],
    correctIndex: 3,
    explanation:
      'Adjacent windows share k−1 elements — recomputing them is pure waste. Maintain a running sum: +entering, −leaving, O(1) per slide. The general pattern: exploit overlap between consecutive states instead of rebuilding state.',
    distractorNotes: [
      'Sorting destroys the positional structure that defines the windows.',
      'Caching n sums costs O(n) space to avoid work that the running trick avoids for free.',
      'Parallelism divides constants, not complexity classes.',
      'Correct.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-hash-load',
    lessonId: 'hashing-internals',
    difficulty: 2,
    prompt: 'When does a hash map’s O(1) average lookup honestly degrade toward O(n)?',
    options: [
      'When many keys collide into one bucket: a bad hash function or adversarial keys',
      'When it stores more than about 1,000 items and the table runs out of room',
      'When the keys are strings instead of integers, since strings are slower to hash',
      'Never: O(1) is guaranteed by the structure itself, whatever keys you insert',
    ],
    correctIndex: 0,
    explanation:
      'O(1) rests on keys spreading evenly. A weak hash (or attacker-chosen keys — the classic hash-DoS) piles keys into one bucket, and lookup becomes a linear chain scan. Load factor is the early-warning metric; resizing keeps it bounded.',
    distractorNotes: [
      'Correct.',
      'Size alone is fine — dicts resize to keep the load factor low.',
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
      'Three is only a convention; two pointers work fine if you’re careful with order',
      'Python needs three references so the garbage collector doesn’t free the nodes',
      'The third pointer stores the list’s length, which the loop needs to know when to stop',
      'You must save curr.next before overwriting it, or the rest of the list is lost',
    ],
    correctIndex: 3,
    explanation:
      'The reversal step curr.next = prev destroys your only route forward. next exists to hold the continuation before you burn the bridge. Every linked-list bug is a version of "overwrote a pointer I still needed" — which is why the visual draws all three.',
    distractorNotes: [
      'Try it: the moment you flip curr.next with no saved copy, the tail is garbage.',
      'GC keeps objects alive via any reference; that’s not the issue — reachability from YOUR traversal is.',
      'Length is irrelevant to reversal.',
      'Correct.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-stack-lifo',
    lessonId: 'stacks-intro',
    difficulty: 1,
    prompt: 'Why is a stack the right structure for checking balanced brackets — ([{}]) — in a parser?',
    options: [
      'The most recently opened bracket must close first: nesting is LIFO by definition',
      'Brackets arrive in FIFO order, so the first one opened must be closed first',
      'Stacks store characters more compactly than lists, so long inputs fit in memory',
      'A dict of bracket counts would work too; it only fails on unicode bracket types',
    ],
    correctIndex: 0,
    explanation:
      'Nesting means the innermost (most recent) open bracket is the next one that must close. "Most recent first" IS the stack contract. Push opens; on a close, pop and demand a match. The call stack does the same job for function calls — it’s the same shape.',
    distractorNotes: [
      'Correct.',
      'FIFO would match the OLDEST open bracket — exactly wrong for nesting.',
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
      'heapify skips the comparisons entirely and just arranges items by their index',
      'heapify only processes half of the array, so it does half the work of pushing',
      'Sift-down costs at most a node’s height, and most nodes are near the bottom',
      'It doesn’t: heapify is also O(n log n), and people just round it down to O(n)',
    ],
    correctIndex: 2,
    explanation:
      'Half the nodes are leaves (height 0, zero work), a quarter have height 1, … Σ n/2^(h+1) · h = O(n). Pushing one-by-one charges log-of-current-size per item, and the many late items each pay the full log. Bottom-up sifting charges by height instead — and heights are mostly zero.',
    distractorNotes: [
      'Comparisons are the work; nothing skips them, they’re just distributed better.',
      'It starts at the last internal node (n//2 − 1), but that’s a detail of the same height argument.',
      'Correct.',
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
      'A perfectly balanced tree, so search still costs O(log n)',
      'Nothing: the BST rejects sorted input to stay balanced',
      'A right-leaning chain, really a linked list: O(n) search',
      'A random-looking shape, so search is O(log n) expected',
    ],
    correctIndex: 2,
    explanation:
      'Each new key is larger than everything present, so it becomes the rightmost child: a chain of depth n. Every BST guarantee is really "O(height)" — and sorted input maximizes height. This degeneration is the entire reason AVL/red-black trees (and B-trees under your SQL indexes) exist.',
    distractorNotes: [
      'Balance never happens by luck on sorted input — it must be enforced.',
      'A plain BST has no opinion about input order; it just quietly degrades.',
      'Correct.',
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
      'It reaches nodes in order of edge count; weights break “each layer costs +1”',
      'It tries every possible path and keeps the best one, which also works with weights',
      'It doesn’t find shortest paths at all; only Dijkstra does, weighted or not',
      'It works with weights too, as long as each adjacency list is sorted by weight',
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
      'Grouped by customer; stability only matters for descending sorts',
      'Grouped by customer, with each customer’s orders in random order',
      'Sorted by date only, since the second sort undoes the first one',
      'Grouped by customer, and within each customer still in date order',
    ],
    correctIndex: 3,
    explanation:
      'Stable = equal keys keep their prior relative order. So the customer sort preserves the date ordering within each customer group — multi-key sorting by chaining single-key sorts, last key first. Python’s Timsort is stable, which is why this idiom works; quicksort is not, which is why some databases’ ORDER BY surprises people.',
    distractorNotes: [
      'Direction is irrelevant; stability is about ties.',
      'That’s what an UNstable sort gives you — and the bug report that follows.',
      'The second sort reorders by customer but, stably, breaks ties by the existing (date) order.',
      'Correct.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-bsearch-invariant',
    lessonId: 'binary-search',
    difficulty: 2,
    prompt: 'The loop invariant of binary search is: "if the target exists, it lies within a[lo..hi]". What do most off-by-one bugs violate?',
    options: [
      'The O(log n) bound, by halving the range unevenly so the loop runs too long',
      'The sortedness of the array, by searching data that was never fully sorted',
      'The invariant: lo or hi moves past the target, or the range stops shrinking',
      'The rule that n must be a power of two, so the halves don’t come out even',
    ],
    correctIndex: 2,
    explanation:
      'mid = (lo+hi)//2 then lo = mid + 1 / hi = mid − 1 keeps the invariant AND guarantees shrinkage. Write lo = mid (with certain bounds) and the window can stall forever at two elements; drop a +1 and you can evict the answer. Debug binary search by stating the invariant, not by shuffling ±1 until tests pass.',
    distractorNotes: [
      'A buggy search usually still halves — it just halves toward the wrong answer or loops.',
      'Sortedness is a precondition; the loop can’t break it.',
      'Correct.',
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
      'Merge sort is already too fast for memoization to make any measurable difference',
      'Merge sort’s subproblems never repeat, so there is nothing for a cache to reuse',
      'Sorting can’t be written recursively, so there are no calls for a cache to wrap',
      'Memoization only works on numeric arguments, and merge sort works on whole lists',
    ],
    correctIndex: 1,
    explanation:
      'Memoization pays off exactly when the recursion tree contains the SAME subproblem many times (fib(38) appears ~10⁵ times in fib(50)). Merge sort splits into disjoint halves — every subarray is sorted exactly once. Overlapping subproblems is the first DP prerequisite; optimal substructure is the second.',
    distractorNotes: [
      'Speed isn’t the criterion — repetition is.',
      'Correct.',
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
        'O(n log n): it has to sift down every subtree below the start node',
        'O(n): in the worst case it may have to visit every node in the heap',
        'O(1): a single swap at the root always restores the heap property',
        'O(log n): at most one swap per level, and the tree is log n tall',
      ],
      correctIndex: 3,
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
        'Effectively O(1): O(α(n)), the inverse Ackermann function, ≤ 4 in practice',
        'O(log n) always, because union by rank keeps every tree logarithmically short',
        'O(n), because a find can still walk the whole structure in the worst case',
        'Exactly O(1) in the worst case, because path compression flattens every tree',
      ],
      correctIndex: 0,
      explanation:
        'The celebrated bound is O(α(n)) amortized — α is the inverse Ackermann function, ≤ 4 for any n that fits in the universe. Compression flattens paths as a side effect of every find, so early O(n)-ish walks prepay later O(1) hops: amortized analysis again, in the wild.',
    },
  },
];
