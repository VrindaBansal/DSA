// End-of-lesson problem sets for Cracking LeetCode. Each set is the ~10-problem
// grind for that lesson: a few fully in-app testable exercises (solved with
// "run tests" right here) plus a curated list of the canonical REAL LeetCode
// problems for the pattern (worked in the embedded editor, submitted on
// LeetCode's own judge). Consumed by <ProblemSet id="<lessonId>" />.

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface CuratedProblem {
  /** Display name, e.g. "Two Sum II". */
  name: string;
  /** LeetCode slug → https://leetcode.com/problems/<slug>/ */
  slug: string;
  difficulty: Difficulty;
  /** One-line "why this / the twist". */
  note?: string;
}

export interface ProblemSetData {
  lessonId: string;
  /** CodeQuestion ids (must be kind:'code' in questions.ts) rendered as
   *  in-app testable cards. */
  inApp: string[];
  /** Real LeetCode problems, worked in the embedded editor. */
  curated: CuratedProblem[];
}

export const PROBLEM_SETS: ProblemSetData[] = [
  {
    lessonId: 'lc-method',
    inApp: ['lc-ps-method-runsum', 'lc-ps-method-wealth', 'lc-ps-method-steps'],
    curated: [
      { name: 'Fizz Buzz', slug: 'fizz-buzz', difficulty: 'Easy', note: 'The classic warm-up — say the brute force out loud.' },
      { name: 'Build Array from Permutation', slug: 'build-array-from-permutation', difficulty: 'Easy' },
      { name: 'Concatenation of Array', slug: 'concatenation-of-array', difficulty: 'Easy' },
      { name: 'Shuffle the Array', slug: 'shuffle-the-array', difficulty: 'Easy' },
      { name: 'Kids With the Greatest Number of Candies', slug: 'kids-with-the-greatest-number-of-candies', difficulty: 'Easy' },
      { name: 'How Many Numbers Are Smaller Than the Current Number', slug: 'how-many-numbers-are-smaller-than-the-current-number', difficulty: 'Easy' },
      { name: 'Final Value of Variable After Performing Operations', slug: 'final-value-of-variable-after-performing-operations', difficulty: 'Easy' },
    ],
  },
  {
    lessonId: 'lc-constraints',
    inApp: ['lc-ps-con-haspair', 'lc-ps-con-kadane', 'lc-ps-con-negatives'],
    curated: [
      { name: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'Easy', note: 'n is large — the O(n²) pair scan times out; find the O(n).' },
      { name: 'Majority Element', slug: 'majority-element', difficulty: 'Easy', note: 'Boyer–Moore does it in O(n)/O(1).' },
      { name: 'Product of Array Except Self', slug: 'product-of-array-except-self', difficulty: 'Medium', note: 'O(n), no division.' },
      { name: 'Find the Duplicate Number', slug: 'find-the-duplicate-number', difficulty: 'Medium', note: 'O(n) time, O(1) space is the intended bar.' },
      { name: 'Sort Colors', slug: 'sort-colors', difficulty: 'Medium', note: 'One pass (Dutch national flag).' },
      { name: 'Merge Sorted Array', slug: 'merge-sorted-array', difficulty: 'Easy' },
      { name: 'Rotate Array', slug: 'rotate-array', difficulty: 'Medium' },
    ],
  },
  {
    lessonId: 'lc-two-pointers',
    inApp: ['lc-ps-tp-movezeroes', 'lc-ps-tp-subsequence', 'lc-ps-tp-sqsquares'],
    curated: [
      { name: 'Two Sum II - Input Array Is Sorted', slug: 'two-sum-ii-input-array-is-sorted', difficulty: 'Medium', note: 'The archetype: sorted → opposite ends.' },
      { name: '3Sum', slug: '3sum', difficulty: 'Medium', note: 'Sort, then two pointers inside a loop.' },
      { name: 'Remove Duplicates from Sorted Array', slug: 'remove-duplicates-from-sorted-array', difficulty: 'Easy', note: 'Slow/fast, same direction.' },
      { name: '3Sum Closest', slug: '3sum-closest', difficulty: 'Medium' },
      { name: 'Boats to Save People', slug: 'boats-to-save-people', difficulty: 'Medium', note: 'Greedy two pointers after sorting.' },
      { name: 'Reverse String', slug: 'reverse-string', difficulty: 'Easy' },
      { name: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Hard', note: 'The two-pointer boss — revisited in the Hard capstone.' },
    ],
  },
  {
    lessonId: 'lc-sliding-window',
    inApp: ['lc-ps-sw-minlen', 'lc-ps-sw-ones', 'lc-ps-sw-anagrams'],
    curated: [
      { name: 'Best Time to Buy and Sell Stock', slug: 'best-time-to-buy-and-sell-stock', difficulty: 'Easy', note: 'A window between buy and sell days.' },
      { name: 'Longest Repeating Character Replacement', slug: 'longest-repeating-character-replacement', difficulty: 'Medium', note: 'Window valid while (len − maxfreq) ≤ k.' },
      { name: 'Permutation in String', slug: 'permutation-in-string', difficulty: 'Medium', note: 'Fixed window + char counts.' },
      { name: 'Fruit Into Baskets', slug: 'fruit-into-baskets', difficulty: 'Medium', note: 'Longest window with ≤ 2 distinct.' },
      { name: 'Maximum Average Subarray I', slug: 'maximum-average-subarray-i', difficulty: 'Easy', note: 'Fixed window.' },
      { name: 'Grumpy Bookstore Owner', slug: 'grumpy-bookstore-owner', difficulty: 'Medium' },
      { name: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'Hard', note: 'Window + counts — the capstone version.' },
    ],
  },
  {
    lessonId: 'lc-hashing',
    inApp: ['lc-ps-hash-dup', 'lc-ps-hash-anagram', 'lc-ps-hash-firstuniq'],
    curated: [
      { name: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', note: 'The complement-map archetype.' },
      { name: 'Group Anagrams', slug: 'group-anagrams', difficulty: 'Medium', note: 'Key by sorted letters (or a count tuple).' },
      { name: 'Top K Frequent Elements', slug: 'top-k-frequent-elements', difficulty: 'Medium', note: 'Counter + selection.' },
      { name: 'Valid Sudoku', slug: 'valid-sudoku', difficulty: 'Medium', note: 'Sets for rows/cols/boxes.' },
      { name: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Medium', note: 'A set turns O(n log n) into O(n).' },
      { name: 'Ransom Note', slug: 'ransom-note', difficulty: 'Easy' },
      { name: 'Isomorphic Strings', slug: 'isomorphic-strings', difficulty: 'Easy', note: 'Two consistent mappings.' },
    ],
  },
  {
    lessonId: 'lc-binary-search',
    inApp: ['lc-ps-bs-matrix', 'lc-ps-bs-insert', 'lc-ps-bs-findmin'],
    curated: [
      { name: 'Search in Rotated Sorted Array', slug: 'search-in-rotated-sorted-array', difficulty: 'Medium', note: 'Decide which half is sorted, then discard.' },
      { name: 'Find First and Last Position of Element in Sorted Array', slug: 'find-first-and-last-position-of-element-in-sorted-array', difficulty: 'Medium', note: 'Two boundary searches.' },
      { name: 'Find Peak Element', slug: 'find-peak-element', difficulty: 'Medium', note: 'Binary search on an unsorted array via slope.' },
      { name: 'Koko Eating Bananas', slug: 'koko-eating-bananas', difficulty: 'Medium', note: 'Search the answer — same as the lesson.' },
      { name: 'Capacity To Ship Packages Within D Days', slug: 'capacity-to-ship-packages-within-d-days', difficulty: 'Medium', note: 'Search the answer (min capacity).' },
      { name: 'Time Based Key-Value Store', slug: 'time-based-key-value-store', difficulty: 'Medium', note: 'Binary search over timestamps.' },
      { name: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', difficulty: 'Hard', note: 'Binary search the partition — the famous one.' },
    ],
  },
  {
    lessonId: 'lc-stacks',
    inApp: ['lc-ps-stack-rpn', 'lc-ps-stack-dedup', 'lc-ps-stack-backspace'],
    curated: [
      { name: 'Min Stack', slug: 'min-stack', difficulty: 'Medium', note: 'Track the running min alongside the stack.' },
      { name: 'Generate Parentheses', slug: 'generate-parentheses', difficulty: 'Medium', note: 'Backtracking, but a stack-shaped invariant.' },
      { name: 'Car Fleet', slug: 'car-fleet', difficulty: 'Medium', note: 'Monotonic stack on arrival times.' },
      { name: 'Simplify Path', slug: 'simplify-path', difficulty: 'Medium' },
      { name: 'Decode String', slug: 'decode-string', difficulty: 'Medium', note: 'Nested counts — a stack of (count, string).' },
      { name: 'Asteroid Collision', slug: 'asteroid-collision', difficulty: 'Medium', note: 'Simulate collisions with a stack.' },
      { name: 'Next Greater Element I', slug: 'next-greater-element-i', difficulty: 'Easy', note: 'Monotonic stack precompute.' },
    ],
  },
  {
    lessonId: 'lc-linked-list',
    inApp: ['lc-ps-ll-merge', 'lc-ps-ll-middle', 'lc-ps-ll-removenth'],
    curated: [
      { name: 'Reorder List', slug: 'reorder-list', difficulty: 'Medium', note: 'Midpoint + reverse + merge — three moves.' },
      { name: 'Palindrome Linked List', slug: 'palindrome-linked-list', difficulty: 'Easy', note: 'Fast/slow + reverse the back half.' },
      { name: 'Add Two Numbers', slug: 'add-two-numbers', difficulty: 'Medium', note: 'Carry + dummy head.' },
      { name: 'Copy List with Random Pointer', slug: 'copy-list-with-random-pointer', difficulty: 'Medium', note: 'Hash old→new, or interleave.' },
      { name: 'LRU Cache', slug: 'lru-cache', difficulty: 'Medium', note: 'Hash map + doubly linked list — the boss fight.' },
      { name: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', note: 'A heap of the k heads.' },
      { name: 'Reverse Nodes in k-Group', slug: 'reverse-nodes-in-k-group', difficulty: 'Hard' },
    ],
  },
  {
    lessonId: 'lc-trees',
    inApp: ['lc-ps-tree-invert', 'lc-ps-tree-same', 'lc-ps-tree-pathsum'],
    curated: [
      { name: 'Diameter of Binary Tree', slug: 'diameter-of-binary-tree', difficulty: 'Easy', note: 'Return height, track the best split.' },
      { name: 'Balanced Binary Tree', slug: 'balanced-binary-tree', difficulty: 'Easy', note: 'Return height and a balanced flag together.' },
      { name: 'Lowest Common Ancestor of a BST', slug: 'lowest-common-ancestor-of-a-binary-search-tree', difficulty: 'Medium' },
      { name: 'Validate Binary Search Tree', slug: 'validate-binary-search-tree', difficulty: 'Medium', note: 'Pass down (low, high) bounds.' },
      { name: 'Binary Tree Right Side View', slug: 'binary-tree-right-side-view', difficulty: 'Medium', note: 'BFS, last node per level.' },
      { name: 'Kth Smallest Element in a BST', slug: 'kth-smallest-element-in-a-bst', difficulty: 'Medium', note: 'In-order traversal is sorted.' },
      { name: 'Binary Tree Maximum Path Sum', slug: 'binary-tree-maximum-path-sum', difficulty: 'Hard', note: 'Return the best downward arm, update a global.' },
    ],
  },
  {
    lessonId: 'lc-heaps',
    inApp: ['lc-ps-heap-laststone', 'lc-ps-heap-klargest', 'lc-ps-heap-ropes'],
    curated: [
      { name: 'Kth Largest Element in a Stream', slug: 'kth-largest-element-in-a-stream', difficulty: 'Easy', note: 'The size-k min-heap, literally.' },
      { name: 'K Closest Points to Origin', slug: 'k-closest-points-to-origin', difficulty: 'Medium', note: 'Size-k max-heap by distance.' },
      { name: 'Task Scheduler', slug: 'task-scheduler', difficulty: 'Medium', note: 'Greedy with a max-heap of counts.' },
      { name: 'Reorganize String', slug: 'reorganize-string', difficulty: 'Medium', note: 'Always place the most frequent remaining.' },
      { name: 'Single-Threaded CPU', slug: 'single-threaded-cpu', difficulty: 'Medium' },
      { name: 'Find Median from Data Stream', slug: 'find-median-from-data-stream', difficulty: 'Hard', note: 'Two heaps balanced around the middle.' },
      { name: 'Design Twitter', slug: 'design-twitter', difficulty: 'Medium', note: 'Merge k feeds with a heap.' },
    ],
  },
  {
    lessonId: 'lc-backtracking',
    inApp: ['lc-ps-bt-permutations', 'lc-ps-bt-combine', 'lc-ps-bt-phone'],
    curated: [
      { name: 'Subsets II', slug: 'subsets-ii', difficulty: 'Medium', note: 'Skip duplicates at the same tree level.' },
      { name: 'Combination Sum II', slug: 'combination-sum-ii', difficulty: 'Medium', note: 'Each number used once; dedupe siblings.' },
      { name: 'Permutations II', slug: 'permutations-ii', difficulty: 'Medium' },
      { name: 'Word Search', slug: 'word-search', difficulty: 'Medium', note: 'Backtrack over the grid with visited marks.' },
      { name: 'Palindrome Partitioning', slug: 'palindrome-partitioning', difficulty: 'Medium' },
      { name: 'N-Queens', slug: 'n-queens', difficulty: 'Hard', note: 'The pruning showcase.' },
      { name: 'Sudoku Solver', slug: 'sudoku-solver', difficulty: 'Hard' },
    ],
  },
  {
    lessonId: 'lc-graphs',
    inApp: ['lc-ps-graph-maxarea', 'lc-ps-graph-components', 'lc-ps-graph-oranges'],
    curated: [
      { name: 'Clone Graph', slug: 'clone-graph', difficulty: 'Medium', note: 'DFS/BFS with an old→new map.' },
      { name: 'Course Schedule II', slug: 'course-schedule-ii', difficulty: 'Medium', note: 'Topological order, not just feasibility.' },
      { name: 'Pacific Atlantic Water Flow', slug: 'pacific-atlantic-water-flow', difficulty: 'Medium', note: 'Multi-source DFS from each ocean.' },
      { name: 'Surrounded Regions', slug: 'surrounded-regions', difficulty: 'Medium', note: 'Flood from the borders inward.' },
      { name: 'Redundant Connection', slug: 'redundant-connection', difficulty: 'Medium', note: 'Union-find: the edge that closes a cycle.' },
      { name: 'Graph Valid Tree', slug: 'graph-valid-tree', difficulty: 'Medium', note: 'Connected and exactly n−1 edges.' },
      { name: '01 Matrix', slug: '01-matrix', difficulty: 'Medium', note: 'Multi-source BFS from all zeros.' },
    ],
  },
  {
    lessonId: 'lc-dp-1d',
    inApp: ['lc-ps-dp-rob', 'lc-ps-dp-mincost', 'lc-ps-dp-lis'],
    curated: [
      { name: 'House Robber II', slug: 'house-robber-ii', difficulty: 'Medium', note: 'Circular — run the line DP twice.' },
      { name: 'Coin Change II', slug: 'coin-change-ii', difficulty: 'Medium', note: 'Count ways — loop order matters.' },
      { name: 'Word Break', slug: 'word-break', difficulty: 'Medium', note: 'dp[i] = can the prefix be segmented.' },
      { name: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'Medium', note: 'Track both max and min (negatives flip).' },
      { name: 'Decode Ways', slug: 'decode-ways', difficulty: 'Medium', note: 'Fibonacci-shaped with validity checks.' },
      { name: 'Partition Equal Subset Sum', slug: 'partition-equal-subset-sum', difficulty: 'Medium', note: '0/1 subset-sum in disguise.' },
      { name: 'Longest Palindromic Substring', slug: 'longest-palindromic-substring', difficulty: 'Medium', note: 'Expand around centers.' },
    ],
  },
  {
    lessonId: 'lc-dp-2d',
    inApp: ['lc-ps-dp-minpath', 'lc-ps-dp-obstacles', 'lc-ps-dp-edit'],
    curated: [
      { name: 'Maximal Square', slug: 'maximal-square', difficulty: 'Medium', note: 'dp = 1 + min of three neighbors.' },
      { name: 'Best Time to Buy and Sell Stock with Cooldown', slug: 'best-time-to-buy-and-sell-stock-with-cooldown', difficulty: 'Medium', note: 'State machine DP.' },
      { name: 'Target Sum', slug: 'target-sum', difficulty: 'Medium', note: 'Assign ± — subset-sum reduction.' },
      { name: 'Interleaving String', slug: 'interleaving-string', difficulty: 'Medium', note: 'Two-sequence grid DP.' },
      { name: 'Longest Increasing Path in a Matrix', slug: 'longest-increasing-path-in-a-matrix', difficulty: 'Hard', note: 'DFS + memo over cells.' },
      { name: 'Distinct Subsequences', slug: 'distinct-subsequences', difficulty: 'Hard' },
      { name: 'Dungeon Game', slug: 'dungeon-game', difficulty: 'Hard', note: 'Fill the table backwards from the goal.' },
    ],
  },
  {
    lessonId: 'lc-hard',
    inApp: ['lc-ps-hard-histogram', 'lc-ps-hard-slidingmax', 'lc-ps-hard-validparen'],
    curated: [
      { name: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', difficulty: 'Hard', note: 'Binary search on the partition.' },
      { name: 'Merge k Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Hard', note: 'Heap of heads, or divide and conquer.' },
      { name: 'Serialize and Deserialize Binary Tree', slug: 'serialize-and-deserialize-binary-tree', difficulty: 'Hard', note: 'DFS with explicit null markers.' },
      { name: 'Word Search II', slug: 'word-search-ii', difficulty: 'Hard', note: 'Backtracking + a trie of the words.' },
      { name: 'Basic Calculator', slug: 'basic-calculator', difficulty: 'Hard', note: 'A stack for signs and parentheses.' },
      { name: 'Find Median from Data Stream', slug: 'find-median-from-data-stream', difficulty: 'Hard', note: 'Two heaps.' },
      { name: 'Regular Expression Matching', slug: 'regular-expression-matching', difficulty: 'Hard', note: '2-D DP over pattern and text.' },
    ],
  },
];

export const PROBLEM_SET_BY_LESSON: Record<string, ProblemSetData> =
  Object.fromEntries(PROBLEM_SETS.map((p) => [p.lessonId, p]));
