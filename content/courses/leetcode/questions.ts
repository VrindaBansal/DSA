import type { Question } from '@/lib/types';

// Cracking LeetCode — the course-level question bank. Mostly `code` exercises
// (real LeetCode-style problems that run in the browser via Pyodide), plus a
// few MCQ checks for the method lessons. Every `lessonId` matches a lesson
// directory under lessons/. Aggregated globally in content/questions/index.ts.
//
// Contract (enforced by scripts/check-exercises.py): each code exercise's
// solution passes every test_*, the starter FAILS at least one, and a
// complexityCheck exists. Test helpers (ListNode/TreeNode/build) are defined
// inside the code strings so each runs standalone in the Pyodide sandbox.

export const QUESTIONS: Question[] = [
  // ======================================================================
  // Phase 0 — Method & mindset
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-method-first-move',
    lessonId: 'lc-method',
    difficulty: 1,
    prompt:
      'You open a problem and have no idea how to solve it optimally. What is the best FIRST move?',
    options: [
      'Sit and think silently until the clever trick appears',
      'State a brute-force solution that obviously works, out loud, even if it is slow',
      'Start typing the fastest algorithm you can half-remember',
      'Skip it and find an easier problem',
    ],
    correctIndex: 1,
    explanation:
      'A correct brute force is a real answer — it locks in the input/output contract, gives you something to test against, and very often the optimization is just “remove the redundant work” from it. Silence and half-remembered tricks are how you freeze.',
    distractorNotes: [
      'Silence gives the interviewer nothing and gives you no traction — externalize the brute force first.',
      'Correct — brute force first, then optimize.',
      'Typing before you have a correct idea is how you write confident nonsense you then have to debug.',
      'Avoidance never builds the recognition muscle; work the problem from the brute force.',
    ],
  },
  {
    kind: 'code',
    id: 'lc-method-fizzbuzz',
    lessonId: 'lc-method',
    difficulty: 1,
    prompt:
      'Warm-up to prove the editor works and that you can already do this. Return a list of strings for 1..n: "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if by both, else the number as a string. Hit "run tests".',
    starterCode: `def fizzbuzz(n):
    # Build a list of length n. Check divisibility by 15 FIRST.
    # TODO
    return []
`,
    tests: `def test_first_five():
    assert fizzbuzz(5) == ["1", "2", "Fizz", "4", "Buzz"]

def test_fizzbuzz_at_15():
    assert fizzbuzz(15)[-1] == "FizzBuzz"

def test_three():
    assert fizzbuzz(3) == ["1", "2", "Fizz"]

def test_length():
    assert len(fizzbuzz(100)) == 100
`,
    hints: [
      'Loop i from 1 to n inclusive: for i in range(1, n + 1).',
      'Check i % 15 == 0 before i % 3 and i % 5, or the FizzBuzz case never fires.',
      'Append str(i) in the else branch so everything in the list is a string.',
    ],
    solution: `def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out
`,
    complexityCheck: {
      prompt: 'What is the time complexity of your fizzbuzz(n)?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 2,
      explanation:
        'One pass from 1 to n doing O(1) work each step → O(n). Reading the size of the output is your floor here: you must produce n items, so you cannot beat O(n).',
    },
  },

  // ======================================================================
  // Phase 0 — Reading the constraints
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-constraints-target',
    lessonId: 'lc-constraints',
    difficulty: 2,
    prompt:
      'The constraints say 1 ≤ n ≤ 2·10⁵. Modern judges do ~10⁸ simple operations/second. What complexity should you be aiming for?',
    options: [
      'O(n²) is fine',
      'O(n log n) or O(n) — around 2·10⁵ log n ≈ a few million ops',
      'Only O(1) will pass',
      'O(2ⁿ) is expected',
    ],
    correctIndex: 1,
    explanation:
      'n² ≈ 4·10¹⁰ operations — far past the ~10⁸/s budget, so it times out. n log n ≈ 3.5·10⁶ is comfortable. The input size is a hint: 10⁵–10⁶ almost always means the intended solution is O(n) or O(n log n).',
    distractorNotes: [
      'O(n²) at n = 2·10⁵ is ~4·10¹⁰ ops — a guaranteed time-limit-exceeded.',
      'Correct — read 10⁵–10⁶ as “sort-or-linear”.',
      'O(1) is almost never required at this size; O(n) is plenty.',
      'Exponential is only viable for tiny n (≤ ~20–25).',
    ],
  },
  {
    kind: 'mcq',
    id: 'lc-constraints-exp',
    lessonId: 'lc-constraints',
    difficulty: 2,
    prompt:
      'A problem has n ≤ 18 and asks for “all subsets / the best assignment over all combinations.” What does that tiny bound tell you?',
    options: [
      'You must find a clever O(n) trick',
      'An exponential solution (about 2ⁿ ≈ 262k) is intended and will pass',
      'The bound is a typo',
      'You should use binary search',
    ],
    correctIndex: 1,
    explanation:
      'A suspiciously small n (≤ ~20) is the classic tell for an intended exponential solution — 2¹⁸ ≈ 262k is trivial. When you see n ≤ 20 next to “all combinations / subsets,” think bitmask or backtracking, not a hunt for a polynomial trick that may not exist.',
    distractorNotes: [
      'If a polynomial trick existed the bound would usually be far larger; tiny n signals exponential is OK.',
      'Correct — small n licenses exponential.',
      'It is deliberate: the setter shrank n so 2ⁿ fits.',
      'Binary search needs a sorted/monotonic structure, unrelated to this signal.',
    ],
  },
  {
    kind: 'short',
    id: 'lc-constraints-short',
    lessonId: 'lc-constraints',
    difficulty: 2,
    prompt:
      'In your own words: how do you use the constraint “n ≤ 10⁵” to rule algorithms in or out before writing any code?',
    rubric: [
      'Estimate operations: an O(n²) algorithm is ~10¹⁰ ops, over the ~10⁸/s budget → too slow',
      'So the target is O(n) or O(n log n); that points at sorting, hashing, two pointers, or a single pass',
      'The input size narrows the space of intended solutions before you commit to an approach',
    ],
    modelAnswer:
      'I convert the bound into an operation budget. Judges do roughly 10⁸ simple operations per second, so at n = 10⁵ an O(n²) algorithm is about 10¹⁰ operations — a hundred seconds, which times out. That rules out nested loops over the whole input. What survives is O(n log n) (≈ 1.7·10⁶) or O(n) — which is exactly the complexity you get from sorting, a hash map, two pointers, or a sliding window. So before writing code I already know I am looking for a single-pass or sort-based approach, not a double loop.',
  },

  // ======================================================================
  // Phase 1 — Two pointers
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-tp-when',
    lessonId: 'lc-two-pointers',
    difficulty: 2,
    prompt: 'Which signal most reliably says “try two pointers”?',
    options: [
      'The array is unsorted and you need every pair',
      'The input is sorted (or you can sort it) and you want a pair/among-ends relationship in O(1) space',
      'You need the k most frequent elements',
      'The problem is about a tree',
    ],
    correctIndex: 1,
    explanation:
      'Two pointers shine when order lets you move a left/right (or slow/fast) pointer and never look back — sorted arrays, palindromes, and “from both ends” problems. If the answer needs every unordered pair with no structure, hashing is usually the move instead.',
  },
  {
    kind: 'code',
    id: 'lc-tp-palindrome',
    lessonId: 'lc-two-pointers',
    difficulty: 1,
    prompt:
      'Valid palindrome. Return True if s reads the same forwards and backwards considering only alphanumeric characters and ignoring case. Do it with two pointers and O(1) extra space (no building a cleaned copy).',
    starterCode: `def is_palindrome(s):
    # Two pointers from the ends. Skip non-alphanumeric chars.
    # Compare lowercased. Return False on the first mismatch.
    # TODO
    return True
`,
    tests: `def test_classic():
    assert is_palindrome("A man, a plan, a canal: Panama") is True

def test_not():
    assert is_palindrome("race a car") is False

def test_empty():
    assert is_palindrome("") is True

def test_alnum_only():
    assert is_palindrome("0P") is False

def test_single():
    assert is_palindrome(".,") is True
`,
    hints: [
      'i = 0, j = len(s) - 1; loop while i < j.',
      'Inner while-loops advance i or j past any char where not s[i].isalnum().',
      'Compare s[i].lower() != s[j].lower() → return False; otherwise step both inward.',
    ],
    solution: `def is_palindrome(s):
    i, j = 0, len(s) - 1
    while i < j:
        while i < j and not s[i].isalnum():
            i += 1
        while i < j and not s[j].isalnum():
            j -= 1
        if s[i].lower() != s[j].lower():
            return False
        i += 1
        j -= 1
    return True
`,
    complexityCheck: {
      prompt: 'Time and space for the two-pointer palindrome check?',
      options: [
        'O(n) time, O(1) space',
        'O(n) time, O(n) space',
        'O(n²) time, O(1) space',
        'O(n log n) time, O(1) space',
      ],
      correctIndex: 0,
      explanation:
        'Each pointer moves inward at most n times total, so O(n) time. You compare in place without building a filtered copy, so O(1) extra space — that is the win over the “strip then reverse” approach.',
    },
  },
  {
    kind: 'code',
    id: 'lc-tp-container',
    lessonId: 'lc-two-pointers',
    difficulty: 2,
    prompt:
      'Container with most water. Given heights, pick two lines that together with the x-axis hold the most water. Return that maximum area. (Area = min of the two heights × distance between them.) Aim for one pass with two pointers.',
    starterCode: `def max_area(height):
    # Start with the widest container (both ends) and move the SHORTER
    # wall inward each step — that's the only move that can help.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49

def test_two():
    assert max_area([1, 1]) == 1

def test_valley():
    assert max_area([1, 2, 1]) == 2

def test_tall_ends():
    assert max_area([4, 3, 2, 1, 4]) == 16
`,
    hints: [
      'Two pointers i, j at the ends. Track best = 0.',
      'Area = min(height[i], height[j]) * (j - i). Update best each step.',
      'Move the pointer at the SHORTER wall inward: the width shrinks, so only a taller wall can ever beat the current area.',
    ],
    solution: `def max_area(height):
    i, j = 0, len(height) - 1
    best = 0
    while i < j:
        area = min(height[i], height[j]) * (j - i)
        best = max(best, area)
        if height[i] < height[j]:
            i += 1
        else:
            j -= 1
    return best
`,
    complexityCheck: {
      prompt:
        'Why is moving the shorter wall (not the taller) the correct greedy choice?',
      options: [
        'It is arbitrary — either works',
        'The area is capped by the shorter wall, so moving the taller one can only keep or lower the height while width shrinks — never an improvement',
        'Moving the taller wall is faster to compute',
        'It guarantees the pointers meet in the middle',
      ],
      correctIndex: 1,
      explanation:
        'Height is bounded by the shorter wall. If you move the taller wall inward you lose width and the height ceiling is unchanged or lower — strictly no better. Only replacing the shorter wall gives any chance at a taller container. That argument is why the O(n) sweep never misses the optimum.',
    },
  },

  // ======================================================================
  // Phase 1 — Sliding window
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-sw-shrink',
    lessonId: 'lc-sliding-window',
    difficulty: 2,
    prompt:
      'In a variable-size sliding window, when do you shrink the window from the left?',
    options: [
      'Every iteration, always',
      'When the window violates the constraint (e.g. a duplicate appeared, or the sum exceeded the target) — shrink until it is valid again',
      'Only at the very end',
      'Never — the window only grows',
    ],
    correctIndex: 1,
    explanation:
      'The pattern is grow-then-shrink: extend the right edge each step, and whenever the window breaks its rule, advance the left edge until the rule holds again. Both pointers only move forward, so the whole scan is O(n).',
  },
  {
    kind: 'code',
    id: 'lc-sw-maxsum',
    lessonId: 'lc-sliding-window',
    difficulty: 1,
    prompt:
      'Fixed window. Given an array nums and an integer k, return the maximum sum of any contiguous subarray of length exactly k. Slide a window instead of re-summing each range.',
    starterCode: `def max_sum_subarray(nums, k):
    # Sum the first k. Then slide: add the entering element, drop the
    # leaving one. Track the best sum.
    # TODO
    return 0
`,
    tests: `def test_basic():
    assert max_sum_subarray([1, 2, 3, 4, 5], 2) == 9

def test_middle():
    assert max_sum_subarray([2, 1, 5, 1, 3, 2], 3) == 9

def test_single_window():
    assert max_sum_subarray([4], 1) == 4

def test_negatives():
    assert max_sum_subarray([-1, -2, -3, -4], 2) == -3
`,
    hints: [
      'window = sum(nums[:k]); best = window.',
      'For i in range(k, len(nums)): window += nums[i] - nums[i - k].',
      'best = max(best, window) after each slide.',
    ],
    solution: `def max_sum_subarray(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best
`,
    complexityCheck: {
      prompt:
        'The naive approach re-sums each window in O(k). What does sliding buy you?',
      options: [
        'O(n·k) → O(n): each slide is O(1) because you add one element and drop one',
        'Nothing, it is the same complexity',
        'O(n) → O(log n)',
        'It reduces space to O(1) only',
      ],
      correctIndex: 0,
      explanation:
        'Re-summing every window is O(n·k). Reusing the previous sum and adjusting by the entering/leaving element makes each step O(1), so the whole pass is O(n). That reuse — not re-doing overlapping work — is the entire sliding-window idea.',
    },
  },
  {
    kind: 'code',
    id: 'lc-sw-longest-unique',
    lessonId: 'lc-sliding-window',
    difficulty: 2,
    prompt:
      'Longest substring without repeating characters. Return the length of the longest substring of s that contains no repeated character. Use a variable window that shrinks when a duplicate enters.',
    starterCode: `def length_of_longest(s):
    # Track the last index you saw each char. When a char repeats INSIDE
    # the window, jump the left edge past its previous position.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert length_of_longest("abcabcbb") == 3

def test_all_same():
    assert length_of_longest("bbbbb") == 1

def test_empty():
    assert length_of_longest("") == 0

def test_pwwkew():
    assert length_of_longest("pwwkew") == 3

def test_two():
    assert length_of_longest("au") == 2
`,
    hints: [
      'Keep last = {} mapping char -> its most recent index, and start = 0 for the window left edge.',
      'For i, c in enumerate(s): if c in last and last[c] >= start, move start = last[c] + 1.',
      'Record last[c] = i and update best = max(best, i - start + 1) every step.',
    ],
    solution: `def length_of_longest(s):
    last = {}
    start = 0
    best = 0
    for i, c in enumerate(s):
        if c in last and last[c] >= start:
            start = last[c] + 1
        last[c] = i
        best = max(best, i - start + 1)
    return best
`,
    complexityCheck: {
      prompt: 'Time complexity of the sliding-window longest-unique-substring?',
      options: ['O(n²)', 'O(n) — each index enters and leaves the window once', 'O(n log n)', 'O(1)'],
      correctIndex: 1,
      explanation:
        'The right edge visits each character once and the left edge only ever moves forward, so total pointer movement is O(n). The hash map lookups are O(1). Contrast with the brute force of checking every substring, which is O(n²) or worse.',
    },
  },

  // ======================================================================
  // Phase 1 — Hashing
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-hash-when',
    lessonId: 'lc-hashing',
    difficulty: 1,
    prompt:
      'A problem asks whether any two numbers sum to a target, in O(n). Why does a hash set beat sorting + two pointers here?',
    options: [
      'It does not — sorting is always better',
      'A set gives O(1) “have I seen the complement?” lookups, so one pass is O(n); sorting first is O(n log n)',
      'Sets use less memory than sorting',
      'Sorting cannot find pairs',
    ],
    correctIndex: 1,
    explanation:
      'For each number you ask “is (target − n) already in my set?” — an O(1) lookup — and add n. One pass, O(n) time. Sorting-plus-two-pointers also works but pays O(n log n) to sort and loses the original indices. Reach for a hash set the moment the question is “have I seen…?”.',
  },
  {
    kind: 'code',
    id: 'lc-hash-twosum',
    lessonId: 'lc-hashing',
    difficulty: 1,
    prompt:
      'Two Sum. Given nums and target, return the indices [i, j] of the two numbers that add up to target (exactly one solution exists, and you may not reuse an index). One pass with a hash map.',
    starterCode: `def two_sum(nums, target):
    # Map each value -> its index as you go. Before storing n, check
    # whether target - n was already seen.
    # TODO
    return []
`,
    tests: `def test_basic():
    assert two_sum([2, 7, 11, 15], 9) == [0, 1]

def test_middle():
    assert two_sum([3, 2, 4], 6) == [1, 2]

def test_dup():
    assert two_sum([3, 3], 6) == [0, 1]
`,
    hints: [
      'seen = {} maps value -> index.',
      'For i, n in enumerate(nums): if target - n in seen: return [seen[target - n], i].',
      'Otherwise seen[n] = i and continue.',
    ],
    solution: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []
`,
    complexityCheck: {
      prompt: 'The brute force checks every pair. What did the hash map change?',
      options: [
        'O(n²) time → O(n) time, at the cost of O(n) extra space',
        'Nothing — still O(n²)',
        'O(n) time → O(log n) time',
        'It only saved space',
      ],
      correctIndex: 0,
      explanation:
        'Checking every pair is O(n²). Storing values in a map turns “is the complement present?” into an O(1) lookup, so a single pass solves it in O(n) time — the classic time-for-space trade, using O(n) memory for the map.',
    },
  },
  {
    kind: 'code',
    id: 'lc-hash-subarray-sum',
    lessonId: 'lc-hashing',
    difficulty: 3,
    prompt:
      'Subarray sum equals k. Return how many contiguous subarrays of nums sum to exactly k (values may be negative). The trick: prefix sums + a hash map of how many times each prefix sum has occurred.',
    starterCode: `def subarray_sum(nums, k):
    # running prefix sum. A subarray (j..i] sums to k iff
    # prefix[i] - prefix[j] == k, i.e. prefix[j] == prefix[i] - k.
    # Count how many earlier prefixes equal (prefix - k).
    # TODO
    return 0
`,
    tests: `def test_ones():
    assert subarray_sum([1, 1, 1], 2) == 2

def test_example():
    assert subarray_sum([1, 2, 3], 3) == 2

def test_negatives():
    assert subarray_sum([-1, -1, 1], 0) == 1

def test_none():
    assert subarray_sum([1, 2, 3], 100) == 0
`,
    hints: [
      'Use a dict counts mapping prefix-sum -> how many times it has appeared. Seed counts[0] = 1 (the empty prefix).',
      'Maintain prefix += n. The number of valid subarrays ending here is counts[prefix - k].',
      'Add that to your total, then do counts[prefix] += 1.',
    ],
    solution: `def subarray_sum(nums, k):
    from collections import defaultdict
    counts = defaultdict(int)
    counts[0] = 1
    prefix = 0
    total = 0
    for n in nums:
        prefix += n
        total += counts[prefix - k]
        counts[prefix] += 1
    return total
`,
    complexityCheck: {
      prompt: 'Why can’t you use a plain sliding window for this one?',
      options: [
        'You can — a window is fine',
        'Negative numbers break the monotonic “grow/shrink” invariant a window relies on, so you need prefix sums + a hash map instead — O(n) time, O(n) space',
        'The array is too large for a window',
        'Windows only work on strings',
      ],
      correctIndex: 1,
      explanation:
        'A sliding window assumes that extending it only increases the sum (and shrinking decreases it). With negative numbers that monotonicity is gone, so shrinking logic fails. The prefix-sum-plus-hashmap counts matching earlier prefixes in one O(n) pass, using O(n) space.',
    },
  },

  // ======================================================================
  // Phase 1 — Binary search
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-bs-answer',
    lessonId: 'lc-binary-search',
    difficulty: 3,
    prompt:
      '“Binary search on the answer” (e.g. minimum speed, smallest capacity). What must be true for it to work?',
    options: [
      'The input array must already be sorted',
      'There must be a monotonic predicate: if a candidate answer works, every larger (or every smaller) one does too — so “works?” flips exactly once',
      'The answer must be unique',
      'The array must contain the answer',
    ],
    correctIndex: 1,
    explanation:
      'You are not searching the array; you are searching the range of possible answers for the boundary where a yes/no test flips. That only works if the test is monotonic (once it becomes feasible it stays feasible). Then you binary-search the smallest feasible value in O(log(range)) checks.',
  },
  {
    kind: 'code',
    id: 'lc-bs-classic',
    lessonId: 'lc-binary-search',
    difficulty: 1,
    prompt:
      'The bug-free binary search template. Given a sorted ascending array nums and a target, return its index, or -1 if absent. Use the inclusive lo/hi template with while lo <= hi.',
    starterCode: `def binary_search(nums, target):
    # lo, hi = 0, len(nums) - 1
    # while lo <= hi: mid = (lo + hi) // 2 ; then narrow.
    # TODO
    return -1
`,
    tests: `def test_found():
    assert binary_search([-1, 0, 3, 5, 9, 12], 9) == 4

def test_absent():
    assert binary_search([-1, 0, 3, 5, 9, 12], 2) == -1

def test_single():
    assert binary_search([5], 5) == 0

def test_empty():
    assert binary_search([], 1) == -1

def test_first():
    assert binary_search([1, 2, 3, 4], 1) == 0
`,
    hints: [
      'lo, hi = 0, len(nums) - 1. Loop while lo <= hi.',
      'mid = (lo + hi) // 2. If nums[mid] == target return mid.',
      'If nums[mid] < target: lo = mid + 1 else hi = mid - 1. Return -1 after the loop.',
    ],
    solution: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
    complexityCheck: {
      prompt: 'Time complexity, and why the “lo <= hi with mid ± 1” template matters?',
      options: [
        'O(log n); the ± 1 updates guarantee the range strictly shrinks, so it always terminates',
        'O(n); it scans linearly',
        'O(log n), but it can infinite-loop',
        'O(1)',
      ],
      correctIndex: 0,
      explanation:
        'Halving the search range each step is O(log n). Moving lo/hi to mid ± 1 (never leaving mid inside the range) is what prevents the classic infinite loop when lo and hi are adjacent — the single most common binary-search bug.',
    },
  },
  {
    kind: 'code',
    id: 'lc-bs-koko',
    lessonId: 'lc-binary-search',
    difficulty: 3,
    prompt:
      'Koko eating bananas (binary search on the answer). piles[i] bananas per pile; Koko eats at speed k bananas/hour, finishing at most one pile per hour (a partial pile still costs a full hour). Return the minimum integer speed k that lets her finish all piles within h hours.',
    starterCode: `def min_eating_speed(piles, h):
    # The answer lives in [1, max(piles)]. "Can she finish at speed k in
    # h hours?" is MONOTONIC in k. Binary-search the smallest k that works.
    # hours needed at speed k = sum of ceil(pile / k).
    # TODO
    return 1
`,
    tests: `def test_example():
    assert min_eating_speed([3, 6, 7, 11], 8) == 4

def test_tight():
    assert min_eating_speed([30, 11, 23, 4, 20], 5) == 30

def test_looser():
    assert min_eating_speed([30, 11, 23, 4, 20], 6) == 23

def test_single():
    assert min_eating_speed([1], 1) == 1
`,
    hints: [
      'ceil(p / k) without floats is (p + k - 1) // k. Sum that over piles to get hours(k).',
      'lo, hi = 1, max(piles). Search for the smallest feasible speed.',
      'while lo < hi: mid = (lo + hi) // 2; if hours(mid) <= h: hi = mid else lo = mid + 1. Return lo.',
    ],
    solution: `def min_eating_speed(piles, h):
    def hours(k):
        return sum((p + k - 1) // k for p in piles)

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if hours(mid) <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
    complexityCheck: {
      prompt: 'What is the complexity, with n piles and M = max(piles)?',
      options: [
        'O(n log M) — O(log M) binary-search steps, each an O(n) feasibility check',
        'O(n · M)',
        'O(n²)',
        'O(log n)',
      ],
      correctIndex: 0,
      explanation:
        'You binary-search speeds over [1, M], which is O(log M) iterations, and each “can she finish?” test sums over all n piles in O(n). Total O(n log M). Brute-forcing every speed from 1 to M would be O(n·M).',
    },
  },

  // ======================================================================
  // Phase 1 — Stacks
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-stack-monotonic',
    lessonId: 'lc-stacks',
    difficulty: 3,
    prompt:
      'A monotonic stack (kept increasing or decreasing) is the go-to for which kind of question?',
    options: [
      'Sorting an array in place',
      '“For each element, find the next greater/smaller element” (or the span until one appears)',
      'Finding the k most frequent elements',
      'Detecting a cycle in a linked list',
    ],
    correctIndex: 1,
    explanation:
      'When you need, for every element, the nearest larger/smaller one to its left or right, a monotonic stack does it in O(n): each element is pushed and popped at most once, and the moment it gets popped you have found its “next greater/smaller” neighbor.',
  },
  {
    kind: 'code',
    id: 'lc-stack-valid-parens',
    lessonId: 'lc-stacks',
    difficulty: 1,
    prompt:
      'Valid parentheses. Given a string of just the characters ()[]{}, return True if every bracket is closed by the matching type in the correct order. A stack is the natural fit.',
    starterCode: `def is_valid(s):
    # Push opening brackets. On a closing bracket, the top of the stack
    # must be its matching opener — else it's invalid.
    # TODO
    return True
`,
    tests: `def test_simple():
    assert is_valid("()") is True

def test_mixed():
    assert is_valid("()[]{}") is True

def test_wrong_type():
    assert is_valid("(]") is False

def test_interleaved():
    assert is_valid("([)]") is False

def test_nested():
    assert is_valid("{[]}") is True

def test_unclosed():
    assert is_valid("(") is False
`,
    hints: [
      'Map each closing bracket to its opener: pairs = {")": "(", "]": "[", "}": "{"}.',
      'If the char is a closer: fail if the stack is empty or stack.pop() != pairs[char].',
      'Otherwise push it. At the end, valid only if the stack is empty.',
    ],
    solution: `def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for c in s:
        if c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
        else:
            stack.append(c)
    return not stack
`,
    complexityCheck: {
      prompt: 'Why is the leftover stack check at the end necessary?',
      options: [
        'It is not needed',
        'To catch unclosed openers like "(" — the loop never rejects them, so a non-empty stack at the end means invalid; overall O(n) time, O(n) space',
        'To sort the brackets',
        'To reverse the string',
      ],
      correctIndex: 1,
      explanation:
        'A string like "(" or "([" never triggers a mismatch during the loop — the failure is that openers were never closed. Returning “valid only if the stack is empty” catches exactly that. One pass, O(n) time, and up to O(n) stack space.',
    },
  },
  {
    kind: 'code',
    id: 'lc-stack-daily-temps',
    lessonId: 'lc-stacks',
    difficulty: 2,
    prompt:
      'Daily temperatures (monotonic stack). Given temps, return an array answer where answer[i] is the number of days until a warmer temperature, or 0 if none. Example: [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0].',
    starterCode: `def daily_temperatures(temps):
    # Keep a stack of INDICES whose warmer-day is still unknown, with
    # temperatures decreasing down the stack. When today is warmer than
    # the top, you've found that index's answer — pop and record.
    # TODO
    return [0] * len(temps)
`,
    tests: `def test_example():
    assert daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]) == [1, 1, 4, 2, 1, 1, 0, 0]

def test_increasing():
    assert daily_temperatures([30, 40, 50, 60]) == [1, 1, 1, 0]

def test_decreasing():
    assert daily_temperatures([60, 50, 40, 30]) == [0, 0, 0, 0]

def test_three():
    assert daily_temperatures([30, 60, 90]) == [1, 1, 0]
`,
    hints: [
      'res = [0] * len(temps); stack = [] holding indices.',
      'For i, t in enumerate(temps): while stack and temps[stack[-1]] < t: j = stack.pop(); res[j] = i - j.',
      'Then stack.append(i). Indices left on the stack keep their default 0.',
    ],
    solution: `def daily_temperatures(temps):
    res = [0] * len(temps)
    stack = []
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop()
            res[j] = i - j
        stack.append(i)
    return res
`,
    complexityCheck: {
      prompt: 'The nested while-loop looks like O(n²). What is the real complexity?',
      options: [
        'O(n²) always',
        'O(n): each index is pushed once and popped at most once, so total work across all while-iterations is linear',
        'O(n log n)',
        'O(1)',
      ],
      correctIndex: 1,
      explanation:
        'Amortized analysis: an index can be popped only once ever, so the inner while-loop does at most n pops in total across the whole run. Push + pop each element once → O(n) time, O(n) stack space. A nested loop is not automatically O(n²).',
    },
  },

  // ======================================================================
  // Phase 1 — Linked list
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-ll-dummy',
    lessonId: 'lc-linked-list',
    difficulty: 2,
    prompt: 'Why do linked-list solutions so often start with a “dummy” head node?',
    options: [
      'It makes the list longer',
      'It removes the special case for the head: you always have a node whose .next you can set, so inserting/merging/deleting at the front needs no separate branch — return dummy.next at the end',
      'It sorts the list',
      'It is required by Python',
    ],
    correctIndex: 1,
    explanation:
      'A dummy (sentinel) node gives you a stable handle before the real first node. Every insertion or deletion becomes “set some node’s .next,” with no special-casing when the change is at the head. You build off dummy and return dummy.next.',
  },
  {
    kind: 'code',
    id: 'lc-ll-reverse',
    lessonId: 'lc-linked-list',
    difficulty: 1,
    prompt:
      'Reverse a singly linked list, in place, and return the new head. A ListNode has .val and .next. The classic three-pointer walk — and remember to save .next before you overwrite it.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # prev = None; walk the list, flipping each .next to point backwards.
    # Save nxt = curr.next BEFORE you overwrite curr.next.
    # TODO
    return head
`,
    tests: `def build(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def test_five():
    assert to_list(reverse_list(build([1, 2, 3, 4, 5]))) == [5, 4, 3, 2, 1]

def test_single():
    assert to_list(reverse_list(build([1]))) == [1]

def test_empty():
    assert reverse_list(build([])) is None
`,
    hints: [
      'prev, curr = None, head.',
      'Loop while curr: nxt = curr.next (save it first!).',
      'curr.next = prev; prev = curr; curr = nxt. Return prev at the end.',
    ],
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev
`,
    complexityCheck: {
      prompt: 'Time and space for in-place reversal?',
      options: [
        'O(n) time, O(1) space',
        'O(n) time, O(n) space',
        'O(n²) time, O(1) space',
        'O(log n) time, O(1) space',
      ],
      correctIndex: 0,
      explanation:
        'One pass over n nodes, flipping a pointer each step → O(n) time. You reuse the existing nodes and keep only three pointers → O(1) extra space. Building a new reversed list instead would cost O(n) space.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ll-cycle',
    lessonId: 'lc-linked-list',
    difficulty: 2,
    prompt:
      'Detect a cycle (Floyd’s fast/slow pointers). Return True if the linked list has a cycle, else False — in O(1) extra space (no visited set).',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    # slow steps 1, fast steps 2. If they ever meet, there's a cycle.
    # If fast falls off the end, there isn't.
    # TODO
    return False
`,
    tests: `def build(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def test_no_cycle():
    assert has_cycle(build([1, 2, 3])) is False

def test_empty():
    assert has_cycle(build([])) is False

def test_cycle():
    head = build([1, 2, 3, 4])
    tail = head
    while tail.next:
        tail = tail.next
    tail.next = head.next  # link back into the middle
    assert has_cycle(head) is True

def test_self_loop():
    head = ListNode(1)
    head.next = head
    assert has_cycle(head) is True
`,
    hints: [
      'slow = fast = head.',
      'Loop while fast and fast.next: advance slow by one, fast by two.',
      'If slow is fast at any point, return True. If the loop exits, return False.',
    ],
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
`,
    complexityCheck: {
      prompt: 'Why does fast/slow beat a “visited set” here?',
      options: [
        'It does not',
        'Same O(n) time but O(1) space instead of O(n): the two pointers must eventually meet inside a cycle because the gap closes by one each step',
        'It is O(log n)',
        'The set version is wrong',
      ],
      correctIndex: 1,
      explanation:
        'A visited-set detector is O(n) time and O(n) space. Floyd’s two pointers are also O(n) time but O(1) space — inside a loop the fast pointer gains one step on the slow pointer each iteration, so they are guaranteed to collide. Constant space is the whole point.',
    },
  },

  // ======================================================================
  // Phase 1 — Trees
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-tree-bfsdfs',
    lessonId: 'lc-trees',
    difficulty: 2,
    prompt: 'You need the shortest path (fewest edges) from the root to some target. DFS or BFS — and why?',
    options: [
      'DFS, because recursion is simpler',
      'BFS, because it explores level by level, so the first time it reaches the target it has used the fewest edges',
      'Either; they give the same first-arrival distance',
      'Neither works on trees',
    ],
    correctIndex: 1,
    explanation:
      'BFS fans out in distance layers, so first arrival = fewest edges — that is why it gives shortest paths in unweighted graphs/trees. DFS may plunge down a long branch first and reach the target by a longer route. Use DFS for “does a path exist / all paths / subtree info,” BFS for “fewest steps / level order.”',
  },
  {
    kind: 'code',
    id: 'lc-tree-maxdepth',
    lessonId: 'lc-trees',
    difficulty: 1,
    prompt:
      'Maximum depth of a binary tree. A TreeNode has .val, .left, .right. Return the number of nodes on the longest root-to-leaf path (an empty tree is depth 0). This is the “return info up” DFS in miniature.',
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    # Depth of empty is 0. Otherwise 1 + the deeper of the two children.
    # TODO
    return 0
`,
    tests: `def test_balanced():
    root = TreeNode(1, TreeNode(2), TreeNode(3))
    assert max_depth(root) == 2

def test_left_chain():
    root = TreeNode(1, TreeNode(2, TreeNode(3)))
    assert max_depth(root) == 3

def test_empty():
    assert max_depth(None) == 0

def test_single():
    assert max_depth(TreeNode(7)) == 1
`,
    hints: [
      'Base case: if not root: return 0.',
      'Recurse into left and right.',
      'Return 1 + max(max_depth(root.left), max_depth(root.right)).',
    ],
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
`,
    complexityCheck: {
      prompt: 'Complexity of this recursive depth (n nodes, height h)?',
      options: [
        'O(n) time, O(h) space for the call stack',
        'O(n) time, O(n) space always',
        'O(log n) time',
        'O(n²) time',
      ],
      correctIndex: 0,
      explanation:
        'Every node is visited once → O(n) time. The recursion stack is as deep as the tree, O(h): that is O(log n) for a balanced tree but O(n) for a degenerate (chain) tree — worth knowing when recursion depth is a risk.',
    },
  },
  {
    kind: 'code',
    id: 'lc-tree-levelorder',
    lessonId: 'lc-trees',
    difficulty: 2,
    prompt:
      'Binary tree level-order traversal (BFS). Return a list of levels, each a list of node values left-to-right, top to bottom. Example: root 3 with children 9 and 20(15,7) → [[3],[9,20],[15,7]].',
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    # BFS with a queue. Each outer step drains one whole level: snapshot
    # len(queue), pop that many, collect their values, enqueue children.
    # TODO
    return []
`,
    tests: `def test_example():
    root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    assert level_order(root) == [[3], [9, 20], [15, 7]]

def test_empty():
    assert level_order(None) == []

def test_single():
    assert level_order(TreeNode(1)) == [[1]]

def test_left_chain():
    assert level_order(TreeNode(1, TreeNode(2, TreeNode(3)))) == [[1], [2], [3]]
`,
    hints: [
      'If not root: return []. Otherwise q = deque([root]).',
      'While q: take level_size = len(q); loop that many times, popping from the left.',
      'Collect vals into a level list, enqueue node.left/node.right if present, append the level.',
    ],
    solution: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root):
    if not root:
        return []
    out = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        out.append(level)
    return out
`,
    complexityCheck: {
      prompt: 'Why snapshot len(q) at the start of each outer iteration?',
      options: [
        'To fix the number of pops to exactly the current level, so children enqueued now go into the NEXT level, not this one',
        'For speed only',
        'It is optional and changes nothing',
        'To sort each level',
      ],
      correctIndex: 0,
      explanation:
        'The queue holds this level plus children you are appending. Freezing the count to the current queue length is what cleanly separates levels. Overall O(n) time (each node once) and O(n) space for the queue.',
    },
  },

  // ======================================================================
  // Phase 1 — Heaps
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-heap-whymin',
    lessonId: 'lc-heaps',
    difficulty: 3,
    prompt:
      'To keep the k LARGEST elements of a big stream, you maintain a size-k MIN-heap. Why a min-heap?',
    options: [
      'A max-heap would be simpler and equivalent',
      'The root of a size-k min-heap is the WEAKEST of your current champions — the only one a newcomer must beat, and it is O(1) to compare/evict',
      'Min-heaps are faster than max-heaps',
      'You actually want the smallest k',
    ],
    correctIndex: 1,
    explanation:
      'You only keep k elements. The smallest of them (the min-heap root) is exactly the one on the chopping block: if the next value beats it, pop the root and push the newcomer; otherwise discard. Each event is O(log k), total O(n log k) with O(k) memory — no sorting the whole stream.',
  },
  {
    kind: 'code',
    id: 'lc-heap-kth-largest',
    lessonId: 'lc-heaps',
    difficulty: 2,
    prompt:
      'Kth largest element in an array. Return the k-th largest value (k is 1-indexed, so k=1 is the maximum). Use heapq to keep only the k largest seen so far — O(n log k).',
    starterCode: `import heapq

def find_kth_largest(nums, k):
    # Maintain a min-heap of size k. Push each number; if the heap grows
    # past k, pop the smallest. The k-th largest ends up at the root.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert find_kth_largest([3, 2, 1, 5, 6, 4], 2) == 5

def test_dups():
    assert find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) == 4

def test_single():
    assert find_kth_largest([1], 1) == 1

def test_max():
    assert find_kth_largest([7, 6, 5, 4, 3, 2, 1], 1) == 7
`,
    hints: [
      'heap = []; for n in nums: heapq.heappush(heap, n).',
      'After each push, if len(heap) > k: heapq.heappop(heap) removes the current smallest.',
      'When done, heap[0] (the root) is the k-th largest.',
    ],
    solution: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
`,
    complexityCheck: {
      prompt: 'Complexity of the size-k heap approach vs. sorting?',
      options: [
        'O(n log k) time, O(k) space — better than sorting’s O(n log n) when k is small',
        'O(n²) time',
        'O(n log n), identical to sorting',
        'O(n) time, O(n) space',
      ],
      correctIndex: 0,
      explanation:
        'Each of n elements does an O(log k) push/pop on a heap capped at size k → O(n log k) time, O(k) space. Sorting everything is O(n log n) time and O(n) space; the heap wins whenever k is much smaller than n, and it works on a stream you can’t fully store.',
    },
  },
  {
    kind: 'code',
    id: 'lc-heap-topk-frequent',
    lessonId: 'lc-heaps',
    difficulty: 2,
    prompt:
      'Top K frequent elements. Return the k most frequent values in nums, in any order. Count with a hash map, then take the k highest counts.',
    starterCode: `from collections import Counter

def top_k_frequent(nums, k):
    # Count frequencies, then return the k values with the highest counts.
    # TODO
    return []
`,
    tests: `def test_basic():
    assert sorted(top_k_frequent([1, 1, 1, 2, 2, 3], 2)) == [1, 2]

def test_single():
    assert sorted(top_k_frequent([1], 1)) == [1]

def test_ties():
    r = top_k_frequent([4, 4, 5, 5, 6], 2)
    assert 4 in r and 5 in r and len(r) == 2
`,
    hints: [
      'counts = Counter(nums) maps value -> frequency.',
      'Counter has .most_common(k), which returns the k highest (value, count) pairs.',
      'Return just the values: [v for v, _ in counts.most_common(k)].',
    ],
    solution: `from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    return [v for v, _ in counts.most_common(k)]
`,
    complexityCheck: {
      prompt:
        'Counting is O(n). Picking the top k with a heap of size k costs what, versus fully sorting the counts?',
      options: [
        'Heap: O(m log k) over m distinct values — better than sorting all counts at O(m log m) when k ≪ m',
        'Both are O(n²)',
        'Heap is O(1)',
        'Sorting is always faster',
      ],
      correctIndex: 0,
      explanation:
        'With m distinct values, a size-k heap selects the top k in O(m log k); sorting every count is O(m log m). When k is small relative to the number of distinct values, the heap (what most_common uses under the hood) is the cheaper selection.',
    },
  },

  // ======================================================================
  // Phase 2 — Backtracking
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-bt-unchoose',
    lessonId: 'lc-backtracking',
    difficulty: 2,
    prompt:
      'The backtracking template is choose → explore → un-choose. What breaks if you forget the un-choose step?',
    options: [
      'Nothing — it is optional',
      'Your partial state (the path) leaks between branches, so sibling explorations start from a dirty state and produce wrong results',
      'The recursion never starts',
      'It becomes iterative',
    ],
    correctIndex: 1,
    explanation:
      'Backtracking reuses one mutable “path.” After exploring a choice you must undo it (pop what you pushed) so the next sibling branch sees the state it expects. Skip the un-choose and choices from one branch contaminate the others.',
  },
  {
    kind: 'code',
    id: 'lc-bt-subsets',
    lessonId: 'lc-backtracking',
    difficulty: 2,
    prompt:
      'Subsets. Given a list of distinct integers nums, return all possible subsets (the power set), in any order. Use the choose/explore/un-choose template. There are 2ⁿ subsets.',
    starterCode: `def subsets(nums):
    # Backtrack from a start index. At each call, record the current path,
    # then try adding each remaining element (choose), recurse (explore),
    # then remove it (un-choose).
    # TODO
    return []
`,
    tests: `def norm(subs):
    return sorted([sorted(s) for s in subs])

def test_three():
    got = subsets([1, 2, 3])
    want = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
    assert norm(got) == norm(want)

def test_empty():
    assert subsets([]) == [[]]

def test_one():
    assert norm(subsets([0])) == norm([[], [0]])

def test_count():
    assert len(subsets([1, 2, 3, 4])) == 16
`,
    hints: [
      'res = []; define backtrack(start, path).',
      'First line of backtrack: res.append(path[:]) — a COPY, so later mutations don’t change it.',
      'For i in range(start, len(nums)): path.append(nums[i]); backtrack(i + 1, path); path.pop().',
    ],
    solution: `def subsets(nums):
    res = []

    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
`,
    complexityCheck: {
      prompt: 'How many subsets are there, and what does that make the time complexity?',
      options: [
        'O(n · 2ⁿ): there are 2ⁿ subsets and copying each into the result is up to O(n)',
        'O(n²)',
        'O(n log n)',
        'O(2ⁿ) but only O(1) per subset',
      ],
      correctIndex: 0,
      explanation:
        'Each element is either in or out → 2ⁿ subsets. Building/copying each subset is up to O(n), so O(n · 2ⁿ). This is expected: the OUTPUT itself has exponential size, so you can’t beat exponential — and the tiny-n constraint told you exponential was fine.',
    },
  },
  {
    kind: 'code',
    id: 'lc-bt-combination-sum',
    lessonId: 'lc-backtracking',
    difficulty: 3,
    prompt:
      'Combination sum. Given distinct positive candidates and a target, return all unique combinations that sum to target. The same number may be reused unlimited times. Order within/among combinations does not matter.',
    starterCode: `def combination_sum(candidates, target):
    # Backtrack with a start index to avoid permuted duplicates. Because
    # reuse is allowed, recurse with i (not i + 1). Prune when a candidate
    # exceeds the remaining target.
    # TODO
    return []
`,
    tests: `def norm(c):
    return sorted([sorted(x) for x in c])

def test_basic():
    assert norm(combination_sum([2, 3, 6, 7], 7)) == norm([[2, 2, 3], [7]])

def test_multi():
    assert norm(combination_sum([2, 3, 5], 8)) == norm([[2, 2, 2, 2], [2, 3, 3], [3, 5]])

def test_none():
    assert combination_sum([2], 1) == []

def test_single_hit():
    assert norm(combination_sum([4, 2], 4)) == norm([[4], [2, 2]])
`,
    hints: [
      'Sort candidates first so you can prune with an early break.',
      'backtrack(start, remain, path): if remain == 0, record path[:] and return.',
      'For i from start: if candidates[i] > remain: break; else choose it, recurse with i (reuse allowed) and remain - candidates[i], then un-choose.',
    ],
    solution: `def combination_sum(candidates, target):
    res = []
    candidates = sorted(candidates)

    def backtrack(start, remain, path):
        if remain == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                break
            path.append(candidates[i])
            backtrack(i, remain - candidates[i], path)
            path.pop()

    backtrack(0, target, [])
    return res
`,
    complexityCheck: {
      prompt: 'What role does the “start index” play in avoiding wrong answers?',
      options: [
        'It sorts the output',
        'Recursing from i (never before start) prevents counting the same combination in different orders (e.g. [2,3] and [3,2]) as distinct',
        'It makes it O(n)',
        'Nothing important',
      ],
      correctIndex: 1,
      explanation:
        'Passing a start index means each recursion only considers candidates from the current position onward, so combinations are built in nondecreasing order and permutations of the same multiset aren’t re-generated. Recursing with i (not i+1) is what permits reusing a number.',
    },
  },

  // ======================================================================
  // Phase 2 — Graphs
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-graph-bfs',
    lessonId: 'lc-graphs',
    difficulty: 2,
    prompt: 'A 2-D grid of land/water cells is secretly a graph. What are its “edges”?',
    options: [
      'There are no edges in a grid',
      'Each cell connects to its up/down/left/right neighbors — so grid problems are just BFS/DFS with (row, col) as the node',
      'Only diagonal neighbors',
      'Every cell connects to every other cell',
    ],
    correctIndex: 1,
    explanation:
      'Treat each cell (r, c) as a node and its 4 orthogonal neighbors as adjacent nodes (sometimes 8 with diagonals). Then “number of islands,” “shortest path in a maze,” and “rotting oranges” are ordinary DFS/BFS — recognizing the grid-as-graph is the whole unlock.',
  },
  {
    kind: 'code',
    id: 'lc-graph-islands',
    lessonId: 'lc-graphs',
    difficulty: 2,
    prompt:
      'Number of islands. grid is a list of lists of the strings "1" (land) and "0" (water). An island is land connected up/down/left/right. Return how many islands there are. Flood-fill each one you find (mutating the grid is fine).',
    starterCode: `def num_islands(grid):
    # Scan every cell. When you hit unvisited land, that's a new island:
    # increment the count and "sink" the whole connected blob to "0" so
    # you don't count it again.
    # TODO
    return 0
`,
    tests: `def test_two():
    grid = [["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]]
    assert num_islands(grid) == 2

def test_all_water():
    assert num_islands([["0", "0"], ["0", "0"]]) == 0

def test_all_land():
    assert num_islands([["1", "1"], ["1", "1"]]) == 1

def test_diagonal_not_connected():
    grid = [["1", "0"], ["0", "1"]]
    assert num_islands(grid) == 2
`,
    hints: [
      'rows, cols = len(grid), len(grid[0]). Define sink(r, c).',
      'sink returns immediately if r/c is out of bounds or grid[r][c] != "1"; otherwise set grid[r][c] = "0" and recurse into the 4 neighbors.',
      'Loop over all cells; each time you see a "1", do count += 1 and sink(r, c).',
    ],
    solution: `def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def sink(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        sink(r + 1, c)
        sink(r - 1, c)
        sink(r, c + 1)
        sink(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                sink(r, c)
    return count
`,
    complexityCheck: {
      prompt: 'Complexity for an m×n grid?',
      options: [
        'O(m·n): every cell is visited a constant number of times across all flood-fills',
        'O((m·n)²)',
        'O(m + n)',
        'O(m·n·log(m·n))',
      ],
      correctIndex: 0,
      explanation:
        'Each cell is examined by the outer scan and sunk at most once, so total work is proportional to the number of cells: O(m·n) time. The recursion (or an explicit stack/queue) uses up to O(m·n) space in the worst case.',
    },
  },
  {
    kind: 'code',
    id: 'lc-graph-course-schedule',
    lessonId: 'lc-graphs',
    difficulty: 3,
    prompt:
      'Course schedule (topological sort / cycle detection). numCourses courses labeled 0..n-1; prerequisites[i] = [a, b] means you must take b before a. Return True if you can finish all courses — i.e. the dependency graph has no cycle. Use Kahn’s algorithm (BFS on in-degrees).',
    starterCode: `def can_finish(numCourses, prerequisites):
    # Build the graph and in-degree of each course. Queue every course
    # with in-degree 0, "take" it, and decrement its dependents; enqueue
    # any that reach in-degree 0. If you take all n, there's no cycle.
    # TODO
    return True
`,
    tests: `def test_linear():
    assert can_finish(2, [[1, 0]]) is True

def test_cycle():
    assert can_finish(2, [[1, 0], [0, 1]]) is False

def test_none():
    assert can_finish(1, []) is True

def test_chain():
    assert can_finish(3, [[1, 0], [2, 1]]) is True

def test_three_cycle():
    assert can_finish(3, [[0, 1], [1, 2], [2, 0]]) is False
`,
    hints: [
      'graph[b].append(a) and indeg[a] += 1 for each [a, b].',
      'Start a deque with every course whose indeg is 0. Count how many you pop.',
      'For each popped node, decrement indeg of its neighbors and enqueue those hitting 0. Return taken == numCourses.',
    ],
    solution: `def can_finish(numCourses, prerequisites):
    from collections import defaultdict, deque
    graph = defaultdict(list)
    indeg = [0] * numCourses
    for a, b in prerequisites:
        graph[b].append(a)
        indeg[a] += 1
    q = deque(i for i in range(numCourses) if indeg[i] == 0)
    taken = 0
    while q:
        node = q.popleft()
        taken += 1
        for nxt in graph[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                q.append(nxt)
    return taken == numCourses
`,
    complexityCheck: {
      prompt: 'How does Kahn’s algorithm detect a cycle?',
      options: [
        'It sorts the courses',
        'If a cycle exists, its nodes never reach in-degree 0, so the queue empties before all n are taken → taken < numCourses',
        'It throws an exception on a cycle',
        'It counts edges',
      ],
      correctIndex: 1,
      explanation:
        'Nodes inside a cycle always have an unsatisfied prerequisite, so they never enter the zero-in-degree queue. When the queue starves with taken < numCourses, the leftover nodes form a cycle. Runs in O(V + E).',
    },
  },

  // ======================================================================
  // Phase 2 — DP 1D
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-dp-what',
    lessonId: 'lc-dp-1d',
    difficulty: 2,
    prompt: 'What two things must you pin down to turn a problem into a dynamic program?',
    options: [
      'A sort order and a pointer',
      'A STATE (what a subproblem’s answer depends on) and a TRANSITION (how to build it from smaller states) — plus base cases',
      'A stack and a queue',
      'A hash map and a set',
    ],
    correctIndex: 1,
    explanation:
      'DP = define dp[state] as the answer to a subproblem, write the recurrence (transition) that expresses dp[state] in terms of smaller states, and nail the base cases. Once those are right, memoizing or tabulating is mechanical. Overlapping subproblems are what make caching pay off.',
  },
  {
    kind: 'code',
    id: 'lc-dp-climb',
    lessonId: 'lc-dp-1d',
    difficulty: 1,
    prompt:
      'Climbing stairs. You can take 1 or 2 steps at a time. Return the number of distinct ways to climb n stairs. (This is Fibonacci in disguise: ways(n) = ways(n-1) + ways(n-2).) Use O(1) space with two rolling variables.',
    starterCode: `def climb_stairs(n):
    # ways(0) = 1, ways(1) = 1, and each step is the sum of the previous
    # two. Roll two variables forward instead of storing an array.
    # TODO
    return 1
`,
    tests: `def test_two():
    assert climb_stairs(2) == 2

def test_three():
    assert climb_stairs(3) == 3

def test_five():
    assert climb_stairs(5) == 8

def test_one():
    assert climb_stairs(1) == 1

def test_zero():
    assert climb_stairs(0) == 1
`,
    hints: [
      'Keep a, b = 1, 1 (ways to reach the previous two positions).',
      'Repeat n times: a, b = b, a + b.',
      'Return a.',
    ],
    solution: `def climb_stairs(n):
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return a
`,
    complexityCheck: {
      prompt: 'Why is the two-variable version better than naive recursion?',
      options: [
        'Naive recursion recomputes the same subproblems exponentially (O(2ⁿ)); the rolling DP is O(n) time, O(1) space',
        'They are the same',
        'The DP is O(log n)',
        'Recursion is faster here',
      ],
      correctIndex: 0,
      explanation:
        'Plain recursion recomputes ways(n-1) and ways(n-2) with massive overlap → O(2ⁿ). Because each state depends only on the previous two, you keep just two numbers: O(n) time, O(1) space — memoization’s payoff made concrete.',
    },
  },
  {
    kind: 'code',
    id: 'lc-dp-coin-change',
    lessonId: 'lc-dp-1d',
    difficulty: 3,
    prompt:
      'Coin change (minimum coins). Given coin denominations coins and an amount, return the fewest coins that sum to amount, or -1 if it is impossible. Unlimited coins of each type. Classic 1-D tabulation over amounts 0..amount.',
    starterCode: `def coin_change(coins, amount):
    # dp[a] = fewest coins to make amount a. dp[0] = 0; everything else
    # starts "infinite". For each a, try each coin c <= a:
    # dp[a] = min(dp[a], dp[a - c] + 1).
    # TODO
    return -1
`,
    tests: `def test_example():
    assert coin_change([1, 2, 5], 11) == 3

def test_impossible():
    assert coin_change([2], 3) == -1

def test_zero():
    assert coin_change([1], 0) == 0

def test_mixed():
    assert coin_change([2, 5, 10, 1], 27) == 4

def test_exact():
    assert coin_change([1, 2, 5], 5) == 1
`,
    hints: [
      'INF = amount + 1 (a value no real answer can reach). dp = [0] + [INF] * amount.',
      'For a in range(1, amount + 1): for c in coins: if c <= a: dp[a] = min(dp[a], dp[a - c] + 1).',
      'Return dp[amount] if it is < INF else -1.',
    ],
    solution: `def coin_change(coins, amount):
    INF = amount + 1
    dp = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != INF else -1
`,
    complexityCheck: {
      prompt: 'Complexity for amount A and c coin types?',
      options: [
        'O(A · c) time, O(A) space',
        'O(A²)',
        'O(c²)',
        'O(2^A)',
      ],
      correctIndex: 0,
      explanation:
        'You fill A subproblems, each trying c coins → O(A · c) time and O(A) space for the table. Greedy (always take the biggest coin) fails for denominations like [1, 3, 4] making 6, which is why this needs DP.',
    },
  },

  // ======================================================================
  // Phase 2 — DP 2D
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-dp2d-fill',
    lessonId: 'lc-dp-2d',
    difficulty: 3,
    prompt:
      'In 2-D DP where dp[i][j] depends on dp[i-1][j], dp[i][j-1], and dp[i-1][j-1], what order must you fill the table in?',
    options: [
      'Any order works',
      'In increasing i and j (top-to-bottom, left-to-right) so every cell a transition reads is already computed',
      'Bottom-right to top-left',
      'Randomly',
    ],
    correctIndex: 1,
    explanation:
      'A cell may only be computed after the cells its transition depends on. When dependencies point up and left, iterating rows top-to-bottom and columns left-to-right guarantees dp[i-1][*] and dp[i][j-1] are ready. Getting the fill order to respect dependencies is the crux of tabulation.',
  },
  {
    kind: 'code',
    id: 'lc-dp-unique-paths',
    lessonId: 'lc-dp-2d',
    difficulty: 2,
    prompt:
      'Unique paths. A robot at the top-left of an m×n grid can only move right or down. Return how many distinct paths reach the bottom-right. Grid DP: paths(i,j) = paths(i-1,j) + paths(i,j-1), with the top row and left column all 1.',
    starterCode: `def unique_paths(m, n):
    # Each cell = paths from above + paths from the left. First row and
    # first column are all 1 (only one straight-line way to reach them).
    # A single rolling row of length n is enough.
    # TODO
    return 1
`,
    tests: `def test_example():
    assert unique_paths(3, 7) == 28

def test_small():
    assert unique_paths(3, 2) == 3

def test_one_by_one():
    assert unique_paths(1, 1) == 1

def test_square():
    assert unique_paths(3, 3) == 6
`,
    hints: [
      'row = [1] * n represents the first row (all 1s).',
      'For each subsequent row (m - 1 of them): for j in range(1, n): row[j] += row[j - 1].',
      'row[j - 1] is the value to the left (already updated this row); row[j] before update is the value above. Return row[n - 1].',
    ],
    solution: `def unique_paths(m, n):
    row = [1] * n
    for _ in range(1, m):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[n - 1]
`,
    complexityCheck: {
      prompt: 'How does the single rolling row cut space from O(m·n) to O(n)?',
      options: [
        'It doesn’t',
        'Each new row only needs the row above and the left neighbor, so one array updated in place carries both — O(m·n) time, O(n) space',
        'It uses O(1) space',
        'It makes it O(m + n) time',
      ],
      correctIndex: 1,
      explanation:
        'When row j reads only “above” (the old row[j]) and “left” (the freshly updated row[j-1]), you can overwrite the array in place. That drops space from a full O(m·n) table to a single O(n) row while time stays O(m·n).',
    },
  },
  {
    kind: 'code',
    id: 'lc-dp-lcs',
    lessonId: 'lc-dp-2d',
    difficulty: 3,
    prompt:
      'Longest common subsequence. Given strings a and b, return the length of their longest common subsequence (characters in order, not necessarily contiguous). The canonical two-sequence DP: dp[i][j] over prefixes.',
    starterCode: `def longest_common_subsequence(a, b):
    # dp[i][j] = LCS length of a[:i] and b[:j]. If a[i-1] == b[j-1],
    # dp[i][j] = dp[i-1][j-1] + 1; else max(dp[i-1][j], dp[i][j-1]).
    # TODO
    return 0
`,
    tests: `def test_example():
    assert longest_common_subsequence("abcde", "ace") == 3

def test_identical():
    assert longest_common_subsequence("abc", "abc") == 3

def test_none():
    assert longest_common_subsequence("abc", "def") == 0

def test_scattered():
    assert longest_common_subsequence("bl", "yby") == 1

def test_empty():
    assert longest_common_subsequence("", "abc") == 0
`,
    hints: [
      'm, n = len(a), len(b). dp = [[0]*(n+1) for _ in range(m+1)] — the extra row/col are the empty-prefix base cases (all 0).',
      'For i in 1..m, j in 1..n: if a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1] + 1.',
      'Else dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Answer is dp[m][n].',
    ],
    solution: `def longest_common_subsequence(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
`,
    complexityCheck: {
      prompt: 'Complexity of the LCS table for strings of length m and n?',
      options: [
        'O(m·n) time and O(m·n) space (reducible to O(min(m,n)) space)',
        'O(m + n)',
        'O(2^(m+n))',
        'O(m·n·log n)',
      ],
      correctIndex: 0,
      explanation:
        'Every (i, j) prefix pair is computed once → O(m·n) time and O(m·n) space. Since each row depends only on the previous row, you can roll it down to O(min(m, n)) space — the same trick as unique-paths. Edit distance uses this identical shape.',
    },
  },

  // ======================================================================
  // Phase 3 — Composing patterns: cracking Hard
  // ======================================================================
  {
    kind: 'mcq',
    id: 'lc-hard-decompose',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt: 'What is the most useful mindset when a problem is labeled “Hard”?',
    options: [
      'Hard problems need a brand-new algorithm you have never seen',
      'A Hard is usually 2–3 familiar patterns stacked (or one pattern with a twist) — decompose it into pieces you already know',
      'Skip Hards entirely',
      'Memorize the exact solution',
    ],
    correctIndex: 1,
    explanation:
      'Most Hards are compositions: trapping rain water is two-pointer bookkeeping; minimum window substring is sliding window + a frequency map; word ladder is BFS over strings. The skill is decomposition — spot the sub-patterns, solve each, and wire them together.',
  },
  {
    kind: 'code',
    id: 'lc-hard-trap',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt:
      'Trapping rain water (Hard). Given non-negative bar heights, return the total units of water trapped after rain. The clean solution is TWO POINTERS: water over a bar is min(max-to-its-left, max-to-its-right) − its height, computed on the fly.',
    starterCode: `def trap(height):
    # Two pointers l, r from the ends, tracking left_max and right_max.
    # Whichever max is smaller BOUNDS the water at that pointer, so move
    # that side inward and add (that_max - height[pointer]).
    # TODO
    return 0
`,
    tests: `def test_example():
    assert trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6

def test_valley():
    assert trap([4, 2, 0, 3, 2, 5]) == 9

def test_empty():
    assert trap([]) == 0

def test_monotone():
    assert trap([1, 2, 3]) == 0

def test_flat():
    assert trap([2, 2, 2]) == 0
`,
    hints: [
      'If height is empty, return 0. l, r = 0, len-1; left_max, right_max = height[l], height[r]; total = 0.',
      'While l < r: if left_max < right_max, move l inward, update left_max, add left_max - height[l]; else mirror on the right.',
      'The smaller of the two maxes is the true bound, so it is always safe to add against it.',
    ],
    solution: `def trap(height):
    if not height:
        return 0
    l, r = 0, len(height) - 1
    left_max, right_max = height[l], height[r]
    total = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, height[l])
            total += left_max - height[l]
        else:
            r -= 1
            right_max = max(right_max, height[r])
            total += right_max - height[r]
    return total
`,
    complexityCheck: {
      prompt: 'The two-pointer version vs. precomputing left/right max arrays?',
      options: [
        'Same O(n) time, but two pointers use O(1) space instead of O(n) for the two max arrays',
        'Two pointers are O(n²)',
        'The array version is faster asymptotically',
        'Both are O(log n)',
      ],
      correctIndex: 0,
      explanation:
        'The DP/array version precomputes left_max[] and right_max[] in O(n) time but O(n) space. The two-pointer version realizes you only ever need the smaller side’s running max, collapsing it to O(1) space at the same O(n) time — a textbook space optimization.',
    },
  },
  {
    kind: 'code',
    id: 'lc-hard-min-window',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt:
      'Minimum window substring (Hard). Given strings s and t, return the shortest substring of s that contains every character of t (including multiplicities), or "" if none. This composes two patterns: a sliding window + a frequency map with a “missing” counter.',
    starterCode: `def min_window(s, t):
    # need = Counter(t); missing = len(t). Expand the right edge; when a
    # needed char is consumed, missing -= 1. When missing == 0 the window
    # is valid — record it and shrink from the left as far as still valid.
    # TODO
    return ""
`,
    tests: `def test_example():
    assert min_window("ADOBECODEBANC", "ABC") == "BANC"

def test_single():
    assert min_window("a", "a") == "a"

def test_impossible():
    assert min_window("a", "aa") == ""

def test_pick_shortest():
    assert min_window("ab", "b") == "b"

def test_empty_t():
    assert min_window("abc", "") == ""
`,
    hints: [
      'from collections import Counter; need = Counter(t); missing = len(t); left = 0; best = "".',
      'For right, c in enumerate(s): if need[c] > 0: missing -= 1. Then need[c] -= 1 (counts can go negative for surplus chars).',
      'While missing == 0: update best if this window is shorter; then release s[left]: need[s[left]] += 1, and if it goes above 0, missing += 1; left += 1.',
    ],
    solution: `def min_window(s, t):
    from collections import Counter
    if not t or not s:
        return ""
    need = Counter(t)
    missing = len(t)
    left = 0
    best = ""
    for right, c in enumerate(s):
        if need[c] > 0:
            missing -= 1
        need[c] -= 1
        while missing == 0:
            if best == "" or (right - left + 1) < len(best):
                best = s[left:right + 1]
            lc = s[left]
            need[lc] += 1
            if need[lc] > 0:
                missing += 1
            left += 1
    return best
`,
    complexityCheck: {
      prompt: 'Complexity, with |s| = n and |t| = m?',
      options: [
        'O(n + m) time, O(m) space — each character of s enters and leaves the window once',
        'O(n · m)',
        'O(n²)',
        'O(n log n)',
      ],
      correctIndex: 0,
      explanation:
        'The right pointer traverses s once and the left pointer only moves forward, so pointer movement is O(n); building need is O(m). The map holds at most the distinct chars of t → O(m) space. The “missing” counter avoids re-scanning the map to check validity.',
    },
  },
  {
    kind: 'code',
    id: 'lc-hard-word-ladder',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt:
      'Word ladder (Hard). Given beginWord, endWord, and a wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, changing one letter at a time, where every intermediate word is in wordList (count includes both ends); return 0 if impossible. This is BFS with words as nodes.',
    starterCode: `def ladder_length(beginWord, endWord, wordList):
    # Shortest path in an unweighted graph => BFS. Neighbors of a word are
    # all words that differ by exactly one letter and appear in the set.
    # Track the number of words so far; first time you pop endWord, return it.
    # TODO
    return 0
`,
    tests: `def test_reachable():
    assert ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]) == 5

def test_no_end():
    assert ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"]) == 0

def test_short():
    assert ladder_length("a", "c", ["a", "b", "c"]) == 2

def test_direct():
    assert ladder_length("hot", "dot", ["dot", "dog"]) == 2
`,
    hints: [
      'words = set(wordList). If endWord not in words, return 0 immediately.',
      'BFS queue of (word, steps) starting at (beginWord, 1); a seen set avoids revisiting.',
      'For each position i and each letter a..z, form word[:i] + ch + word[i+1:]; if it is in words and unseen, enqueue with steps + 1.',
    ],
    solution: `def ladder_length(beginWord, endWord, wordList):
    from collections import deque
    words = set(wordList)
    if endWord not in words:
        return 0
    q = deque([(beginWord, 1)])
    seen = {beginWord}
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    while q:
        word, steps = q.popleft()
        if word == endWord:
            return steps
        for i in range(len(word)):
            for ch in alphabet:
                nxt = word[:i] + ch + word[i + 1:]
                if nxt in words and nxt not in seen:
                    seen.add(nxt)
                    q.append((nxt, steps + 1))
    return 0
`,
    complexityCheck: {
      prompt: 'Why BFS rather than DFS for the shortest transformation?',
      options: [
        'DFS is impossible here',
        'BFS explores by distance, so the first time endWord is dequeued it is via the fewest transformations — DFS could find a longer path first',
        'BFS uses less memory',
        'They are equivalent for shortest path',
      ],
      correctIndex: 1,
      explanation:
        'Every edge (one-letter change) has equal weight, so BFS’s level-by-level expansion guarantees first-arrival = shortest. With L = word length and N = number of words, generating neighbors costs about O(L² · N) overall — and DFS would risk returning a non-minimal path.',
    },
  },

  // ======================================================================
  // Problem-set exercises (end-of-lesson grind — lc-ps-*). Fresh problems,
  // distinct from the inline teaching exercises above.
  // ======================================================================

  // --- lc-method ----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-method-runsum',
    lessonId: 'lc-method',
    difficulty: 1,
    prompt:
      'Running Sum of 1d Array. Return a new list where the i-th element is the sum of nums[0..i]. Example: [1,2,3,4] -> [1,3,6,10].',
    starterCode: `def running_sum(nums):
    # Keep a running total; append it at each step.
    # TODO
    return []
`,
    tests: `def test_basic():
    assert running_sum([1, 2, 3, 4]) == [1, 3, 6, 10]

def test_ones():
    assert running_sum([1, 1, 1, 1, 1]) == [1, 2, 3, 4, 5]

def test_mixed():
    assert running_sum([3, 1, 2, 10, 1]) == [3, 4, 6, 16, 17]

def test_single():
    assert running_sum([7]) == [7]
`,
    hints: [
      'Track total = 0; iterate the list.',
      'total += n each step, then append total to the output.',
    ],
    solution: `def running_sum(nums):
    out = []
    total = 0
    for n in nums:
        total += n
        out.append(total)
    return out
`,
    complexityCheck: {
      prompt: 'Time complexity of running_sum?',
      options: ['O(1)', 'O(n)', 'O(n²)', 'O(n log n)'],
      correctIndex: 1,
      explanation:
        'One pass, O(1) work per element, and an output of size n → O(n). This is a prefix sum, the building block behind many subarray tricks.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-method-wealth',
    lessonId: 'lc-method',
    difficulty: 1,
    prompt:
      'Richest Customer Wealth. accounts[i] is a list of what customer i has in each bank. Return the largest total wealth any single customer has.',
    starterCode: `def maximum_wealth(accounts):
    # Each customer's wealth is the sum of their row. Return the max.
    # TODO
    return 0
`,
    tests: `def test_basic():
    assert maximum_wealth([[1, 2, 3], [3, 2, 1]]) == 6

def test_second():
    assert maximum_wealth([[1, 5], [7, 3], [3, 5]]) == 10

def test_third():
    assert maximum_wealth([[2, 8, 7], [7, 1, 3], [1, 9, 5]]) == 17

def test_one():
    assert maximum_wealth([[5]]) == 5
`,
    hints: [
      'sum(row) gives one customer’s wealth.',
      'max(sum(row) for row in accounts).',
    ],
    solution: `def maximum_wealth(accounts):
    return max(sum(row) for row in accounts)
`,
    complexityCheck: {
      prompt: 'With m customers and n banks, the cost is…',
      options: ['O(m·n)', 'O(m + n)', 'O(m²)', 'O(1)'],
      correctIndex: 0,
      explanation:
        'You touch every cell once to sum the rows → O(m·n). There’s no shortcut: the answer depends on all the balances.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-method-steps',
    lessonId: 'lc-method',
    difficulty: 1,
    prompt:
      'Number of Steps to Reduce a Number to Zero. If the number is even, halve it; if odd, subtract 1. Return how many steps reach 0. Example: 14 -> 6 steps.',
    starterCode: `def number_of_steps(num):
    # Loop until num is 0, counting steps. Even -> //2, odd -> -1.
    # TODO
    return 0
`,
    tests: `def test_fourteen():
    assert number_of_steps(14) == 6

def test_eight():
    assert number_of_steps(8) == 4

def test_123():
    assert number_of_steps(123) == 12

def test_zero():
    assert number_of_steps(0) == 0
`,
    hints: [
      'while num > 0: branch on num % 2.',
      'Even: num //= 2. Odd: num -= 1. Count each step.',
    ],
    solution: `def number_of_steps(num):
    steps = 0
    while num > 0:
        if num % 2 == 0:
            num //= 2
        else:
            num -= 1
        steps += 1
    return steps
`,
    complexityCheck: {
      prompt: 'How many steps, roughly, for a number num?',
      options: [
        'O(log num) — halving dominates, so it’s logarithmic in the value',
        'O(num)',
        'O(num²)',
        'O(1)',
      ],
      correctIndex: 0,
      explanation:
        'Halving happens on every even step and can only be followed by at most one subtract, so the count is proportional to the number of bits → O(log num). A great reminder that complexity can be in the VALUE, not the array length.',
    },
  },

  // --- lc-constraints -----------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-con-haspair',
    lessonId: 'lc-constraints',
    difficulty: 2,
    prompt:
      'The array can be up to 10⁵ long, so O(n²) is out. Return True if any two DISTINCT elements sum to target, else False — in O(n) using a set.',
    starterCode: `def has_pair_with_sum(nums, target):
    # n is large -> the double loop times out. One pass with a "seen" set.
    # TODO
    return False
`,
    tests: `def test_no():
    assert has_pair_with_sum([1, 2, 3, 9], 8) is False

def test_yes():
    assert has_pair_with_sum([1, 2, 4, 4], 8) is True

def test_empty():
    assert has_pair_with_sum([], 5) is False

def test_pair():
    assert has_pair_with_sum([3, 5], 8) is True
`,
    hints: [
      'Keep a set of values you’ve seen.',
      'For each n, if target - n is in the set, return True; else add n.',
    ],
    solution: `def has_pair_with_sum(nums, target):
    seen = set()
    for n in nums:
        if target - n in seen:
            return True
        seen.add(n)
    return False
`,
    complexityCheck: {
      prompt: 'Why does the set version matter at n = 10⁵?',
      options: [
        'O(n²) ≈ 10¹⁰ ops would time out; the set makes it O(n) with O(1) lookups',
        'It doesn’t; both are fine',
        'The set is O(log n)',
        'It only saves memory',
      ],
      correctIndex: 0,
      explanation:
        'At n = 10⁵ the double loop is ~10¹⁰ operations — over the budget. The constraint told you to find O(n): the set gives O(1) membership so one pass suffices.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-con-kadane',
    lessonId: 'lc-constraints',
    difficulty: 2,
    prompt:
      'Maximum Subarray (Kadane’s). With n up to 10⁵ you need O(n). Return the largest sum of any contiguous non-empty subarray.',
    starterCode: `def max_subarray(nums):
    # At each index, the best subarray ENDING here either extends the previous
    # best or restarts at this element. Track the running best and the global.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6

def test_single():
    assert max_subarray([1]) == 1

def test_all_pos():
    assert max_subarray([5, 4, -1, 7, 8]) == 23

def test_all_neg():
    assert max_subarray([-1, -2, -3]) == -1
`,
    hints: [
      'cur = best = nums[0].',
      'For each later n: cur = max(n, cur + n) — extend or restart.',
      'best = max(best, cur).',
    ],
    solution: `def max_subarray(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best
`,
    complexityCheck: {
      prompt: 'Kadane’s complexity?',
      options: ['O(n) time, O(1) space', 'O(n²)', 'O(n log n)', 'O(n) time, O(n) space'],
      correctIndex: 0,
      explanation:
        'One pass keeping two numbers → O(n) time, O(1) space. The brute force over all subarrays is O(n²), which the 10⁵ constraint rules out.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-con-negatives',
    lessonId: 'lc-constraints',
    difficulty: 2,
    prompt:
      'Count Negative Numbers in a Sorted Matrix. Each row and column is sorted in non-increasing order. Count the negatives in O(m + n) using the staircase walk (not O(m·n)).',
    starterCode: `def count_negatives(grid):
    # Start at the TOP-RIGHT. If the cell is negative, everything below it in
    # this column is negative too (columns decrease going down) — count them and
    # move left. Otherwise move down.
    # TODO
    return 0
`,
    tests: `def test_example():
    grid = [[4, 3, 2, -1], [3, 2, 1, -1], [1, 1, -1, -2], [-1, -1, -2, -3]]
    assert count_negatives(grid) == 8

def test_none():
    assert count_negatives([[3, 2], [1, 0]]) == 0

def test_all():
    assert count_negatives([[-1, -2], [-3, -4]]) == 4

def test_single_row():
    assert count_negatives([[5, 1, 0, -1]]) == 1
`,
    hints: [
      'rows, cols = len(grid), len(grid[0]); r, c = 0, cols - 1.',
      'If grid[r][c] < 0: every row from r down is negative in this column → count += rows - r, then c -= 1.',
      'Else move down: r += 1. Stop when r runs off the bottom or c off the left.',
    ],
    solution: `def count_negatives(grid):
    rows, cols = len(grid), len(grid[0])
    r, c = 0, cols - 1
    count = 0
    while r < rows and c >= 0:
        if grid[r][c] < 0:
            count += rows - r
            c -= 1
        else:
            r += 1
    return count
`,
    complexityCheck: {
      prompt: 'Why is the staircase walk O(m + n), not O(m·n)?',
      options: [
        'Each step moves either left or down and never back, so at most m + n moves total',
        'It sorts the grid',
        'It’s actually O(m·n)',
        'Binary search on each row',
      ],
      correctIndex: 0,
      explanation:
        'From the top-right corner every step commits to one column (left) or one row (down) permanently, so the walk length is bounded by m + n. The "sorted rows and columns" hint in the constraints is what licenses skipping whole blocks.',
    },
  },

  // --- lc-two-pointers ----------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-tp-movezeroes',
    lessonId: 'lc-two-pointers',
    difficulty: 1,
    prompt:
      'Move Zeroes. Move all 0s to the end of nums while keeping the order of the non-zero elements, IN PLACE. Return the same list. Example: [0,1,0,3,12] -> [1,3,12,0,0].',
    starterCode: `def move_zeroes(nums):
    # Same-direction two pointers: a write index for the next non-zero slot.
    # TODO
    return nums
`,
    tests: `def test_example():
    assert move_zeroes([0, 1, 0, 3, 12]) == [1, 3, 12, 0, 0]

def test_single_zero():
    assert move_zeroes([0]) == [0]

def test_no_zeros():
    assert move_zeroes([1, 2, 3]) == [1, 2, 3]

def test_leading():
    assert move_zeroes([0, 0, 1]) == [1, 0, 0]
`,
    hints: [
      'last = 0 is the next position to place a non-zero.',
      'Scan i; when nums[i] != 0, swap nums[last] and nums[i], then last += 1.',
    ],
    solution: `def move_zeroes(nums):
    last = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[last], nums[i] = nums[i], nums[last]
            last += 1
    return nums
`,
    complexityCheck: {
      prompt: 'Complexity of the in-place move?',
      options: ['O(n) time, O(1) space', 'O(n) time, O(n) space', 'O(n²) time', 'O(n log n) time'],
      correctIndex: 0,
      explanation:
        'One pass with a write pointer, swapping in place → O(n) time, O(1) space. Building a new list would cost O(n) extra space.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-tp-subsequence',
    lessonId: 'lc-two-pointers',
    difficulty: 1,
    prompt:
      'Is Subsequence. Return True if s is a subsequence of t (s’s characters appear in t in order, not necessarily contiguous). Two pointers, one over each string.',
    starterCode: `def is_subsequence(s, t):
    # Advance a pointer into s only when the current char of t matches.
    # s is consumed iff the pointer reaches the end.
    # TODO
    return False
`,
    tests: `def test_yes():
    assert is_subsequence("abc", "ahbgdc") is True

def test_no():
    assert is_subsequence("axc", "ahbgdc") is False

def test_empty_s():
    assert is_subsequence("", "anything") is True

def test_longer_s():
    assert is_subsequence("a", "") is False
`,
    hints: [
      'i = 0 indexes s. Walk each char of t.',
      'If i < len(s) and s[i] == ch: i += 1.',
      'Return i == len(s).',
    ],
    solution: `def is_subsequence(s, t):
    i = 0
    for ch in t:
        if i < len(s) and s[i] == ch:
            i += 1
    return i == len(s)
`,
    complexityCheck: {
      prompt: 'Complexity, with |t| = n?',
      options: ['O(n) time, O(1) space', 'O(n²)', 'O(n log n)', 'O(|s|·|t|)'],
      correctIndex: 0,
      explanation:
        'One walk over t, advancing into s as matches occur → O(n) time, O(1) space. Both pointers only move forward.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-tp-sqsquares',
    lessonId: 'lc-two-pointers',
    difficulty: 2,
    prompt:
      'Squares of a Sorted Array. Given nums sorted ascending (may contain negatives), return the squares in sorted order — in O(n). The largest square is at one of the two ends.',
    starterCode: `def sorted_squares(nums):
    # Two pointers at the ends; the bigger absolute value squares largest, so
    # fill the result from the BACK.
    # TODO
    return []
`,
    tests: `def test_example():
    assert sorted_squares([-4, -1, 0, 3, 10]) == [0, 1, 9, 16, 100]

def test_negatives():
    assert sorted_squares([-7, -3, 2, 3, 11]) == [4, 9, 9, 49, 121]

def test_single():
    assert sorted_squares([2]) == [4]

def test_all_neg():
    assert sorted_squares([-3, -2, -1]) == [1, 4, 9]
`,
    hints: [
      'res = [0]*n; l, r = 0, n-1; fill k from n-1 down to 0.',
      'Compare abs(nums[l]) vs abs(nums[r]); the larger goes to res[k], then move that pointer inward.',
    ],
    solution: `def sorted_squares(nums):
    n = len(nums)
    res = [0] * n
    l, r = 0, n - 1
    for k in range(n - 1, -1, -1):
        if abs(nums[l]) > abs(nums[r]):
            res[k] = nums[l] * nums[l]
            l += 1
        else:
            res[k] = nums[r] * nums[r]
            r -= 1
    return res
`,
    complexityCheck: {
      prompt: 'Why is two pointers better than squaring then sorting?',
      options: [
        'Squaring then sorting is O(n log n); two pointers is O(n) by merging from the sorted ends',
        'They are the same',
        'Two pointers is O(n²)',
        'Sorting is O(n) here',
      ],
      correctIndex: 0,
      explanation:
        'The array is already sorted by value, so the squares are largest at the ends — merging inward fills the result in sorted order in O(n), beating the O(n log n) square-then-sort.',
    },
  },

  // --- lc-sliding-window --------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-sw-minlen',
    lessonId: 'lc-sliding-window',
    difficulty: 2,
    prompt:
      'Minimum Size Subarray Sum. Given positive nums and a target, return the length of the shortest contiguous subarray whose sum is ≥ target, or 0 if none. Variable window.',
    starterCode: `def min_subarray_len(target, nums):
    # Grow the right edge, adding to a running sum. While the sum is >= target,
    # record the length and shrink from the left.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert min_subarray_len(7, [2, 3, 1, 2, 4, 3]) == 2

def test_single():
    assert min_subarray_len(4, [1, 4, 4]) == 1

def test_impossible():
    assert min_subarray_len(11, [1, 1, 1, 1, 1, 1, 1, 1]) == 0

def test_whole():
    assert min_subarray_len(15, [1, 2, 3, 4, 5]) == 5
`,
    hints: [
      'left = 0, total = 0, best = infinity.',
      'For right: total += nums[right]; while total >= target: best = min(best, right-left+1), total -= nums[left], left += 1.',
      'Return best if it changed, else 0.',
    ],
    solution: `def min_subarray_len(target, nums):
    left = 0
    total = 0
    best = float("inf")
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return best if best != float("inf") else 0
`,
    complexityCheck: {
      prompt: 'Complexity of the variable window?',
      options: [
        'O(n) — each index is added once and removed once',
        'O(n²)',
        'O(n log n)',
        'O(n) but only because the array is sorted',
      ],
      correctIndex: 0,
      explanation:
        'Both pointers move forward only, so total movement is at most 2n → O(n). Positive values are what make shrinking valid; negatives would break it.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-sw-ones',
    lessonId: 'lc-sliding-window',
    difficulty: 2,
    prompt:
      'Max Consecutive Ones III. Given a binary array nums and an integer k, return the longest run of 1s you can get by flipping at most k zeros. Variable window that shrinks when it holds more than k zeros.',
    starterCode: `def longest_ones(nums, k):
    # Grow the window; count zeros inside it. When zeros > k, shrink from the
    # left until it's back to <= k. Track the max window length.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert longest_ones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2) == 6

def test_bigger():
    assert longest_ones([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3) == 10

def test_no_flips():
    assert longest_ones([1, 1, 1], 0) == 3

def test_all_zero():
    assert longest_ones([0, 0, 0], 0) == 0
`,
    hints: [
      'Track zeros inside the window.',
      'When zeros > k, advance left (decrementing zeros when you pass a 0).',
      'best = max(best, right - left + 1) each step.',
    ],
    solution: `def longest_ones(nums, k):
    left = 0
    zeros = 0
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left + 1)
    return best
`,
    complexityCheck: {
      prompt: 'What is the window’s invariant here?',
      options: [
        'It always contains at most k zeros — shrink whenever that breaks',
        'It always has a fixed size',
        'It never shrinks',
        'It contains at most k ones',
      ],
      correctIndex: 0,
      explanation:
        'The valid window is "≤ k zeros" (each flippable to a 1). You grow greedily and shrink only when the zero count exceeds k. O(n), both pointers forward-only.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-sw-anagrams',
    lessonId: 'lc-sliding-window',
    difficulty: 2,
    prompt:
      'Find All Anagrams in a String. Return the start indices of every substring of s that is an anagram of p. Fixed-size window (|p|) plus a character-count comparison.',
    starterCode: `def find_anagrams(s, p):
    # Slide a window of length len(p). Keep a running Counter of the window and
    # compare it to Counter(p). Record the start index on a match.
    # TODO
    return []
`,
    tests: `def test_example():
    assert find_anagrams("cbaebabacd", "abc") == [0, 6]

def test_overlap():
    assert find_anagrams("abab", "ab") == [0, 1, 2]

def test_none():
    assert find_anagrams("af", "be") == []

def test_too_short():
    assert find_anagrams("a", "aa") == []
`,
    hints: [
      'If len(p) > len(s): return []. Build need = Counter(p) and window = Counter(s[:len(p)]).',
      'Compare window == need for index 0, then slide: add s[i], remove s[i-len(p)].',
      'Delete keys whose count hits 0 so Counter equality works cleanly.',
    ],
    solution: `def find_anagrams(s, p):
    from collections import Counter
    if len(p) > len(s):
        return []
    need = Counter(p)
    window = Counter(s[:len(p)])
    res = []
    if window == need:
        res.append(0)
    for i in range(len(p), len(s)):
        window[s[i]] += 1
        left = s[i - len(p)]
        window[left] -= 1
        if window[left] == 0:
            del window[left]
        if window == need:
            res.append(i - len(p) + 1)
    return res
`,
    complexityCheck: {
      prompt: 'Complexity, with |s| = n and an alphabet of size A?',
      options: [
        'O(n·A) from comparing fixed-size counts each slide (O(n) with O(1)-tracked match count)',
        'O(n²)',
        'O(n log n)',
        'O(2ⁿ)',
      ],
      correctIndex: 0,
      explanation:
        'Each slide is O(1) to update the window counts and up to O(A) to compare Counters; with a lowercase alphabet A is a constant, so it’s effectively O(n). A running "matches" counter removes even the O(A) compare.',
    },
  },

  // --- lc-hashing ---------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-hash-dup',
    lessonId: 'lc-hashing',
    difficulty: 1,
    prompt:
      'Contains Duplicate. Return True if any value appears at least twice in nums, else False. The one-line "seen" pattern.',
    starterCode: `def contains_duplicate(nums):
    # A set of what you've seen; if a value is already in it, you found a dup.
    # TODO
    return False
`,
    tests: `def test_dup():
    assert contains_duplicate([1, 2, 3, 1]) is True

def test_unique():
    assert contains_duplicate([1, 2, 3, 4]) is False

def test_empty():
    assert contains_duplicate([]) is False

def test_all_same():
    assert contains_duplicate([7, 7]) is True
`,
    hints: [
      'Compare len(nums) to len(set(nums)), or…',
      'Walk with a set: return True on the first value already seen.',
    ],
    solution: `def contains_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False
`,
    complexityCheck: {
      prompt: 'Complexity?',
      options: ['O(n) time, O(n) space', 'O(n²) time', 'O(n log n) time', 'O(1) space'],
      correctIndex: 0,
      explanation:
        'One pass with O(1) set lookups → O(n) time, O(n) space. Sorting first would be O(n log n) time but O(1) extra space — a real time/space trade.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-hash-anagram',
    lessonId: 'lc-hashing',
    difficulty: 1,
    prompt:
      'Valid Anagram. Return True if t is an anagram of s (same letters, same counts). A frequency map (or Counter) makes it one line.',
    starterCode: `def is_anagram(s, t):
    # Two strings are anagrams iff their character counts are equal.
    # TODO
    return False
`,
    tests: `def test_yes():
    assert is_anagram("anagram", "nagaram") is True

def test_no():
    assert is_anagram("rat", "car") is False

def test_diff_len():
    assert is_anagram("a", "ab") is False

def test_empty():
    assert is_anagram("", "") is True
`,
    hints: [
      'Different lengths → immediately False.',
      'Compare Counter(s) == Counter(t).',
    ],
    solution: `def is_anagram(s, t):
    from collections import Counter
    return Counter(s) == Counter(t)
`,
    complexityCheck: {
      prompt: 'Complexity for strings of length n?',
      options: ['O(n) time, O(1) space for a fixed alphabet', 'O(n²)', 'O(n log n) if you sort', 'O(2ⁿ)'],
      correctIndex: 0,
      explanation:
        'Counting is O(n); the map holds at most the alphabet size (a constant for lowercase letters) → O(1) space in that model. Sorting both and comparing is the O(n log n) alternative.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-hash-firstuniq',
    lessonId: 'lc-hashing',
    difficulty: 1,
    prompt:
      'First Unique Character in a String. Return the index of the first non-repeating character, or -1 if none. Count first, then scan.',
    starterCode: `def first_uniq_char(s):
    # Two passes: count every char, then return the index of the first with
    # count == 1.
    # TODO
    return -1
`,
    tests: `def test_first():
    assert first_uniq_char("leetcode") == 0

def test_middle():
    assert first_uniq_char("loveleetcode") == 2

def test_none():
    assert first_uniq_char("aabb") == -1

def test_single():
    assert first_uniq_char("z") == 0
`,
    hints: [
      'counts = Counter(s).',
      'Enumerate s; return the first i where counts[s[i]] == 1.',
    ],
    solution: `def first_uniq_char(s):
    from collections import Counter
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1
`,
    complexityCheck: {
      prompt: 'Why two passes instead of one?',
      options: [
        'You can’t know a char is unique until you’ve seen the whole string; so count first (O(n)), then scan (O(n)) → O(n) total',
        'One pass is impossible in any language',
        'It makes it O(n²)',
        'To sort the string',
      ],
      correctIndex: 0,
      explanation:
        'Uniqueness is a global property — the last character could repeat the first. Counting fully, then scanning for the first count-1 char, is two O(n) passes → O(n) with O(1) space for a fixed alphabet.',
    },
  },

  // --- lc-binary-search ---------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-bs-matrix',
    lessonId: 'lc-binary-search',
    difficulty: 2,
    prompt:
      'Search a 2D Matrix. Each row is sorted, and the first value of each row is greater than the last of the previous row — so the whole matrix is one sorted sequence. Return True if target is present. Treat it as a flat array and binary-search.',
    starterCode: `def search_matrix(matrix, target):
    # Map a flat index mid to (mid // cols, mid % cols) and binary-search over
    # rows*cols positions.
    # TODO
    return False
`,
    tests: `def test_found():
    m = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
    assert search_matrix(m, 3) is True

def test_absent():
    m = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]
    assert search_matrix(m, 13) is False

def test_single():
    assert search_matrix([[5]], 5) is True

def test_last():
    assert search_matrix([[1, 2], [3, 4]], 4) is True
`,
    hints: [
      'rows, cols = len(matrix), len(matrix[0]); lo, hi = 0, rows*cols - 1.',
      'val = matrix[mid // cols][mid % cols].',
      'Standard lo <= hi template on the flat index.',
    ],
    solution: `def search_matrix(matrix, target):
    rows, cols = len(matrix), len(matrix[0])
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // cols][mid % cols]
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False
`,
    complexityCheck: {
      prompt: 'Complexity for an m×n matrix?',
      options: ['O(log(m·n))', 'O(m·n)', 'O(m + n)', 'O(m log n)'],
      correctIndex: 0,
      explanation:
        'The sorted-sequence structure lets one binary search cover all m·n cells → O(log(m·n)). The index math converts a flat position to (row, col).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-bs-insert',
    lessonId: 'lc-binary-search',
    difficulty: 1,
    prompt:
      'Search Insert Position. Given a sorted array and a target, return the index of the target, or the index where it would be inserted to keep the array sorted. This is the "lower bound" (leftmost) binary search.',
    starterCode: `def search_insert(nums, target):
    # Find the FIRST index whose value is >= target. Boundary template:
    # lo, hi = 0, len(nums); shrink toward that boundary; return lo.
    # TODO
    return 0
`,
    tests: `def test_found():
    assert search_insert([1, 3, 5, 6], 5) == 2

def test_middle():
    assert search_insert([1, 3, 5, 6], 2) == 1

def test_end():
    assert search_insert([1, 3, 5, 6], 7) == 4

def test_start():
    assert search_insert([1, 3, 5, 6], 0) == 0
`,
    hints: [
      'lo, hi = 0, len(nums) (note: hi is len, not len-1, for a boundary search).',
      'while lo < hi: if nums[mid] < target: lo = mid + 1 else hi = mid.',
      'Return lo — the first position where target fits.',
    ],
    solution: `def search_insert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo
`,
    complexityCheck: {
      prompt: 'Which binary-search template is this?',
      options: [
        'The boundary / lower-bound template (lo < hi, hi = mid), returning the first index that fits',
        'The exact-match template (lo <= hi, mid ± 1)',
        'Linear scan',
        'Two pointers',
      ],
      correctIndex: 0,
      explanation:
        'You’re finding a boundary (first index ≥ target), not an exact value, so it’s the lo < hi / hi = mid form that returns lo. O(log n). This is exactly what bisect_left does.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-bs-findmin',
    lessonId: 'lc-binary-search',
    difficulty: 2,
    prompt:
      'Find Minimum in Rotated Sorted Array. A sorted array of distinct values was rotated at an unknown pivot. Return the minimum, in O(log n). Compare mid to the right end to decide which half holds the pivot.',
    starterCode: `def find_min(nums):
    # If nums[mid] > nums[hi], the min is to the RIGHT of mid; else it's mid or
    # to the left. Shrink toward the minimum.
    # TODO
    return nums[0]
`,
    tests: `def test_rotated():
    assert find_min([3, 4, 5, 1, 2]) == 1

def test_big_rotate():
    assert find_min([4, 5, 6, 7, 0, 1, 2]) == 0

def test_not_rotated():
    assert find_min([11, 13, 15, 17]) == 11

def test_two():
    assert find_min([2, 1]) == 1
`,
    hints: [
      'lo, hi = 0, len(nums) - 1.',
      'while lo < hi: if nums[mid] > nums[hi]: lo = mid + 1 else hi = mid.',
      'Return nums[lo].',
    ],
    solution: `def find_min(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]
`,
    complexityCheck: {
      prompt: 'Why compare nums[mid] to nums[hi] rather than nums[lo]?',
      options: [
        'Comparing to the right end unambiguously tells you which side is sorted / holds the pivot; comparing to the left is ambiguous when not rotated',
        'It’s arbitrary',
        'To make it O(n)',
        'nums[lo] is always the answer',
      ],
      correctIndex: 0,
      explanation:
        'If nums[mid] > nums[hi], the drop (pivot/min) must be to the right of mid; otherwise the min is at mid or left. This keeps the invariant clean and gives O(log n).',
    },
  },

  // --- lc-stacks ----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-stack-rpn',
    lessonId: 'lc-stacks',
    difficulty: 2,
    prompt:
      'Evaluate Reverse Polish Notation. tokens is a postfix expression with integers and the operators + - * /. Evaluate it. Division truncates toward zero. Use a stack.',
    starterCode: `def eval_rpn(tokens):
    # Push numbers. On an operator, pop b then a, apply a OP b, push the result.
    # For division use int(a / b) to truncate toward zero.
    # TODO
    return 0
`,
    tests: `def test_basic():
    assert eval_rpn(["2", "1", "+", "3", "*"]) == 9

def test_div():
    assert eval_rpn(["4", "13", "5", "/", "+"]) == 6

def test_nested():
    assert eval_rpn(["5", "1", "2", "+", "4", "*", "+", "3", "-"]) == 14

def test_single():
    assert eval_rpn(["42"]) == 42
`,
    hints: [
      'ops = {"+", "-", "*", "/"}.',
      'On an operator: b = stack.pop(); a = stack.pop(); apply and push.',
      'Division: int(a / b) truncates toward zero (unlike a // b for negatives).',
    ],
    solution: `def eval_rpn(tokens):
    ops = {"+", "-", "*", "/"}
    stack = []
    for t in tokens:
        if t in ops:
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(t))
    return stack[0]
`,
    complexityCheck: {
      prompt: 'Complexity, and why a stack fits postfix?',
      options: [
        'O(n): each operator’s operands are exactly the two most recent results — the stack top',
        'O(n²)',
        'O(n log n)',
        'O(2ⁿ)',
      ],
      correctIndex: 0,
      explanation:
        'Postfix means an operator applies to the most recently produced values — precisely what a stack hands you in O(1). One pass → O(n).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-stack-dedup',
    lessonId: 'lc-stacks',
    difficulty: 1,
    prompt:
      'Remove All Adjacent Duplicates In String. Repeatedly remove two adjacent equal letters until none remain; return the final string. Example: "abbaca" -> "ca". A stack does it in one pass.',
    starterCode: `def remove_duplicates(s):
    # Push each char; if it equals the top of the stack, pop instead (they
    # cancel). Join what's left.
    # TODO
    return ""
`,
    tests: `def test_example():
    assert remove_duplicates("abbaca") == "ca"

def test_second():
    assert remove_duplicates("azxxzy") == "ay"

def test_all_cancel():
    assert remove_duplicates("aabb") == ""

def test_none():
    assert remove_duplicates("abc") == "abc"
`,
    hints: [
      'stack = []; for ch in s.',
      'If stack and stack[-1] == ch: stack.pop(); else stack.append(ch).',
      'Return "".join(stack).',
    ],
    solution: `def remove_duplicates(s):
    stack = []
    for ch in s:
        if stack and stack[-1] == ch:
            stack.pop()
        else:
            stack.append(ch)
    return "".join(stack)
`,
    complexityCheck: {
      prompt: 'Complexity?',
      options: ['O(n) time, O(n) space', 'O(n²) time', 'O(n log n) time', 'O(1) space'],
      correctIndex: 0,
      explanation:
        'Each character is pushed and popped at most once → O(n) time; the stack holds up to n characters → O(n) space. The naive "scan and rebuild repeatedly" is O(n²).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-stack-backspace',
    lessonId: 'lc-stacks',
    difficulty: 1,
    prompt:
      'Backspace String Compare. Each "#" is a backspace. Return True if s and t produce the same final string after applying backspaces. Build each with a stack and compare.',
    starterCode: `def backspace_compare(s, t):
    # Build the typed result of a string: push normal chars, pop on "#".
    # Compare the two results.
    # TODO
    return False
`,
    tests: `def test_equal():
    assert backspace_compare("ab#c", "ad#c") is True

def test_empty_both():
    assert backspace_compare("ab##", "c#d#") is True

def test_diff():
    assert backspace_compare("a#c", "b") is False

def test_leading_backspace():
    assert backspace_compare("#a#c", "c") is True
`,
    hints: [
      'Write a helper build(x) that returns the stack after processing x.',
      'On "#" pop if non-empty; otherwise push the char.',
      'Return build(s) == build(t).',
    ],
    solution: `def backspace_compare(s, t):
    def build(x):
        st = []
        for ch in x:
            if ch == "#":
                if st:
                    st.pop()
            else:
                st.append(ch)
        return st

    return build(s) == build(t)
`,
    complexityCheck: {
      prompt: 'Complexity of the stack approach?',
      options: ['O(n + m) time, O(n + m) space', 'O(n·m)', 'O(n²)', 'O(log n)'],
      correctIndex: 0,
      explanation:
        'Each string is processed once with push/pop → linear time and space. (A two-pointer scan from the right can do it in O(1) space, but the stack version is the clearest.)',
    },
  },

  // --- lc-linked-list -----------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-ll-merge',
    lessonId: 'lc-linked-list',
    difficulty: 1,
    prompt:
      'Merge Two Sorted Lists. Splice two sorted linked lists into one sorted list and return its head. Use a dummy head so the front is not a special case.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    # dummy head; walk both, attaching the smaller node each step; then attach
    # whatever remains.
    # TODO
    return l1
`,
    tests: `def build(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def test_example():
    assert to_list(merge_two_lists(build([1, 2, 4]), build([1, 3, 4]))) == [1, 1, 2, 3, 4, 4]

def test_empty_both():
    assert merge_two_lists(build([]), build([])) is None

def test_one_empty():
    assert to_list(merge_two_lists(build([]), build([0]))) == [0]
`,
    hints: [
      'dummy = ListNode(); tail = dummy.',
      'While both non-empty: attach the smaller, advance that list, advance tail.',
      'tail.next = l1 or l2 (whichever remains); return dummy.next.',
    ],
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    dummy = ListNode()
    tail = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next
`,
    complexityCheck: {
      prompt: 'Complexity to merge lists of length m and n?',
      options: ['O(m + n) time, O(1) extra space', 'O(m·n)', 'O((m+n) log(m+n))', 'O(m + n) space'],
      correctIndex: 0,
      explanation:
        'Each node is visited once and re-linked in place → O(m + n) time, O(1) extra space. The dummy head removes the "which list starts first" special case.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-ll-middle',
    lessonId: 'lc-linked-list',
    difficulty: 1,
    prompt:
      'Middle of the Linked List. Return the middle node (if two middles, the second). Fast/slow pointers: when fast reaches the end, slow is at the middle.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def middle_node(head):
    # slow +1, fast +2; return slow when fast runs off the end.
    # TODO
    return head
`,
    tests: `def build(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def test_odd():
    assert to_list(middle_node(build([1, 2, 3, 4, 5]))) == [3, 4, 5]

def test_even():
    assert to_list(middle_node(build([1, 2, 3, 4, 5, 6]))) == [4, 5, 6]

def test_single():
    assert to_list(middle_node(build([1]))) == [1]
`,
    hints: [
      'slow = fast = head.',
      'while fast and fast.next: slow = slow.next; fast = fast.next.next.',
      'Return slow.',
    ],
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
`,
    complexityCheck: {
      prompt: 'Why does slow land on the middle?',
      options: [
        'Fast moves twice as fast, so when it reaches the end (2×), slow has covered half (1×)',
        'It’s a coincidence',
        'Because the list is sorted',
        'It only works for even lengths',
      ],
      correctIndex: 0,
      explanation:
        'Fast travels the full length while slow travels half — so slow sits at the midpoint. One pass, O(n) time, O(1) space, no length count needed.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-ll-removenth',
    lessonId: 'lc-linked-list',
    difficulty: 2,
    prompt:
      'Remove Nth Node From End of List. Remove the n-th node from the end and return the head. One pass with two pointers held n apart, over a dummy head.',
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head, n):
    # dummy head; advance fast by n, then move fast and slow together until fast
    # hits the end — slow now sits just before the target.
    # TODO
    return head
`,
    tests: `def build(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

def test_middle():
    assert to_list(remove_nth_from_end(build([1, 2, 3, 4, 5]), 2)) == [1, 2, 3, 5]

def test_head():
    assert remove_nth_from_end(build([1]), 1) is None

def test_first():
    assert to_list(remove_nth_from_end(build([1, 2]), 2)) == [2]

def test_last():
    assert to_list(remove_nth_from_end(build([1, 2]), 1)) == [1]
`,
    hints: [
      'dummy = ListNode(0, head); fast = slow = dummy.',
      'Advance fast n times. Then move both until fast.next is None.',
      'slow.next = slow.next.next; return dummy.next.',
    ],
    solution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
`,
    complexityCheck: {
      prompt: 'What does the dummy head prevent here?',
      options: [
        'A special case when removing the actual head node (n == length)',
        'Nothing — it’s decorative',
        'It sorts the list',
        'It makes it O(1)',
      ],
      correctIndex: 0,
      explanation:
        'If the target is the head, slow needs a node before it to re-link. The dummy provides that node, so "remove the head" needs no separate branch. One pass, O(n) time, O(1) space.',
    },
  },

  // --- lc-trees -----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-tree-invert',
    lessonId: 'lc-trees',
    difficulty: 1,
    prompt:
      'Invert Binary Tree. Swap every node’s left and right children (recursively) and return the root. The one-liner that famously stumped a candidate.',
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    # Base case empty; otherwise swap the inverted subtrees.
    # TODO
    return root
`,
    tests: `from collections import deque

def level_order(root):
    if not root:
        return []
    out = []
    q = deque([root])
    while q:
        node = q.popleft()
        if node:
            out.append(node.val)
            q.append(node.left)
            q.append(node.right)
        else:
            out.append(None)
    while out and out[-1] is None:
        out.pop()
    return out

def test_example():
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7, TreeNode(6), TreeNode(9)))
    assert level_order(invert_tree(root)) == [4, 7, 2, 9, 6, 3, 1]

def test_empty():
    assert invert_tree(None) is None

def test_single():
    assert level_order(invert_tree(TreeNode(1))) == [1]
`,
    hints: [
      'if not root: return None.',
      'root.left, root.right = invert_tree(root.right), invert_tree(root.left).',
      'Return root.',
    ],
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root
`,
    complexityCheck: {
      prompt: 'Complexity to invert n nodes?',
      options: ['O(n) time, O(h) space for the recursion', 'O(n²)', 'O(log n)', 'O(1)'],
      correctIndex: 0,
      explanation:
        'Every node is visited once and its children swapped → O(n) time; the call stack is the tree height h (O(log n) balanced, O(n) worst case).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-tree-same',
    lessonId: 'lc-trees',
    difficulty: 1,
    prompt:
      'Same Tree. Return True if two binary trees are identical in structure and values. Recurse both in lockstep.',
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p, q):
    # Both empty -> True. One empty or values differ -> False. Else recurse
    # on both pairs of children.
    # TODO
    return False
`,
    tests: `def test_equal():
    p = TreeNode(1, TreeNode(2), TreeNode(3))
    q = TreeNode(1, TreeNode(2), TreeNode(3))
    assert is_same_tree(p, q) is True

def test_shape_diff():
    p = TreeNode(1, TreeNode(2))
    q = TreeNode(1, None, TreeNode(2))
    assert is_same_tree(p, q) is False

def test_value_diff():
    p = TreeNode(1, TreeNode(2), TreeNode(1))
    q = TreeNode(1, TreeNode(1), TreeNode(2))
    assert is_same_tree(p, q) is False

def test_both_empty():
    assert is_same_tree(None, None) is True
`,
    hints: [
      'if not p and not q: return True.',
      'if not p or not q or p.val != q.val: return False.',
      'return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right).',
    ],
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)
`,
    complexityCheck: {
      prompt: 'Complexity comparing trees of n nodes?',
      options: ['O(n) time, O(h) space', 'O(n²)', 'O(n log n)', 'O(1)'],
      correctIndex: 0,
      explanation:
        'Each pair of corresponding nodes is compared once → O(n); recursion depth is the height h. Short-circuit AND stops early on the first mismatch.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-tree-pathsum',
    lessonId: 'lc-trees',
    difficulty: 1,
    prompt:
      'Path Sum. Return True if the tree has a root-to-LEAF path whose values sum to target. Subtract as you descend; check the remainder at leaves.',
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root, target):
    # Empty -> False. At a leaf -> does target equal this node's value?
    # Otherwise recurse with target - node.val into the children.
    # TODO
    return False
`,
    tests: `def test_yes():
    root = TreeNode(5, TreeNode(4, TreeNode(11, TreeNode(7), TreeNode(2))), TreeNode(8, TreeNode(13), TreeNode(4, None, TreeNode(1))))
    assert has_path_sum(root, 22) is True

def test_no():
    root = TreeNode(1, TreeNode(2), TreeNode(3))
    assert has_path_sum(root, 5) is False

def test_empty():
    assert has_path_sum(None, 0) is False

def test_single():
    assert has_path_sum(TreeNode(7), 7) is True
`,
    hints: [
      'if not root: return False.',
      'if not root.left and not root.right: return target == root.val.',
      'rem = target - root.val; recurse into left OR right.',
    ],
    solution: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root, target):
    if not root:
        return False
    if not root.left and not root.right:
        return target == root.val
    rem = target - root.val
    return has_path_sum(root.left, rem) or has_path_sum(root.right, rem)
`,
    complexityCheck: {
      prompt: 'Why check the sum only at leaves, not internal nodes?',
      options: [
        'A "root-to-leaf path" must end at a leaf, so the target is only fully spent there',
        'It’s faster',
        'Internal nodes have no value',
        'To sort the tree',
      ],
      correctIndex: 0,
      explanation:
        'The problem asks for a complete root-to-leaf path. You subtract each node’s value on the way down and confirm the remainder equals the leaf’s value at a leaf. O(n) time, O(h) space.',
    },
  },

  // --- lc-heaps -----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-heap-laststone',
    lessonId: 'lc-heaps',
    difficulty: 2,
    prompt:
      'Last Stone Weight. Repeatedly smash the two heaviest stones; if unequal, the difference goes back. Return the weight of the last stone (or 0 if none remain). A max-heap (negate for heapq).',
    starterCode: `def last_stone_weight(stones):
    # Max-heap via negation. Pop the two largest; push back their difference if
    # nonzero. Repeat until 0 or 1 stones remain.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert last_stone_weight([2, 7, 4, 1, 8, 1]) == 1

def test_single():
    assert last_stone_weight([1]) == 1

def test_cancel():
    assert last_stone_weight([2, 2]) == 0

def test_two():
    assert last_stone_weight([3, 7]) == 4
`,
    hints: [
      'h = [-s for s in stones]; heapq.heapify(h).',
      'While len(h) > 1: a = -heappop, b = -heappop; if a != b: heappush(h, -(a - b)).',
      'Return -h[0] if h else 0.',
    ],
    solution: `import heapq

def last_stone_weight(stones):
    h = [-s for s in stones]
    heapq.heapify(h)
    while len(h) > 1:
        a = -heapq.heappop(h)
        b = -heapq.heappop(h)
        if a != b:
            heapq.heappush(h, -(a - b))
    return -h[0] if h else 0
`,
    complexityCheck: {
      prompt: 'Complexity for n stones?',
      options: [
        'O(n log n) — up to n rounds, each doing O(log n) heap operations',
        'O(n)',
        'O(n²)',
        'O(log n)',
      ],
      correctIndex: 0,
      explanation:
        'Each round removes at least one stone and costs O(log n) for the heap operations, so O(n log n) overall. The heap keeps the two heaviest available in O(log n).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-heap-klargest',
    lessonId: 'lc-heaps',
    difficulty: 1,
    prompt:
      'Return the k largest numbers in descending order. Use heapq.nlargest (the size-k heap under the hood). Example: ([3,2,1,5,6,4], 2) -> [6, 5].',
    starterCode: `def k_largest(nums, k):
    # heapq has a one-liner for exactly this.
    # TODO
    return []
`,
    tests: `def test_example():
    assert k_largest([3, 2, 1, 5, 6, 4], 2) == [6, 5]

def test_all():
    assert k_largest([1, 2, 3], 3) == [3, 2, 1]

def test_one():
    assert k_largest([7], 1) == [7]

def test_dups():
    assert k_largest([4, 4, 4, 1], 2) == [4, 4]
`,
    hints: [
      'import heapq.',
      'return heapq.nlargest(k, nums) — already sorted descending.',
    ],
    solution: `import heapq

def k_largest(nums, k):
    return heapq.nlargest(k, nums)
`,
    complexityCheck: {
      prompt: 'Complexity of nlargest(k, nums) for n numbers?',
      options: [
        'O(n log k) — it maintains a size-k heap',
        'O(n log n) always',
        'O(k)',
        'O(n²)',
      ],
      correctIndex: 0,
      explanation:
        'nlargest keeps a heap of size k while scanning all n → O(n log k), better than fully sorting (O(n log n)) when k is small.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-heap-ropes',
    lessonId: 'lc-heaps',
    difficulty: 2,
    prompt:
      'Minimum Cost to Connect Ropes. Connecting two ropes costs the sum of their lengths. Repeatedly connect the two SHORTEST ropes; return the minimum total cost. A min-heap greedily gives the two smallest.',
    starterCode: `def connect_ropes(ropes):
    # Min-heap. Repeatedly pop the two smallest, add their sum to the total, and
    # push the combined rope back. Stop when one rope remains.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert connect_ropes([1, 2, 3, 4, 5]) == 33

def test_second():
    assert connect_ropes([4, 3, 2, 6]) == 29

def test_single():
    assert connect_ropes([5]) == 0

def test_two():
    assert connect_ropes([1, 8]) == 9
`,
    hints: [
      'If fewer than 2 ropes, cost is 0.',
      'heapify the list; while len > 1: a = heappop, b = heappop; total += a + b; heappush(a + b).',
    ],
    solution: `import heapq

def connect_ropes(ropes):
    if len(ropes) < 2:
        return 0
    h = list(ropes)
    heapq.heapify(h)
    total = 0
    while len(h) > 1:
        a = heapq.heappop(h)
        b = heapq.heappop(h)
        total += a + b
        heapq.heappush(h, a + b)
    return total
`,
    complexityCheck: {
      prompt: 'Why always combine the two SHORTEST ropes?',
      options: [
        'A rope’s length is re-added every time it’s merged, so short ropes should be merged earliest/most often — a greedy the min-heap enables in O(n log n)',
        'It’s arbitrary',
        'To make it O(n)',
        'Longest-first is actually optimal',
      ],
      correctIndex: 0,
      explanation:
        'Each merge re-counts the combined length in later merges (like Huffman coding), so merging the smallest first minimizes total re-counting. The min-heap supplies the two smallest in O(log n) → O(n log n) overall.',
    },
  },

  // --- lc-backtracking ----------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-bt-permutations',
    lessonId: 'lc-backtracking',
    difficulty: 2,
    prompt:
      'Permutations. Given distinct integers, return all their orderings (in any order). Backtracking over "which unused number comes next."',
    starterCode: `def permutations(nums):
    # Build a path; at each step try each remaining number, recurse, then undo.
    # TODO
    return []
`,
    tests: `def norm(perms):
    return sorted(tuple(p) for p in perms)

def test_three():
    got = permutations([1, 2, 3])
    want = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
    assert norm(got) == norm(want)

def test_one():
    assert permutations([0]) == [[0]]

def test_count():
    assert len(permutations([1, 2, 3, 4])) == 24
`,
    hints: [
      'backtrack(path, remaining): if not remaining, record path[:].',
      'For each i in remaining, choose remaining[i], recurse with it removed, then un-choose.',
      'remaining[:i] + remaining[i+1:] drops the chosen element.',
    ],
    solution: `def permutations(nums):
    res = []

    def backtrack(path, remaining):
        if not remaining:
            res.append(path[:])
            return
        for i in range(len(remaining)):
            path.append(remaining[i])
            backtrack(path, remaining[:i] + remaining[i + 1:])
            path.pop()

    backtrack([], nums)
    return res
`,
    complexityCheck: {
      prompt: 'How many permutations of n distinct items, and the time cost?',
      options: [
        'n! permutations, O(n · n!) to build them',
        'O(2ⁿ)',
        'O(n²)',
        'O(n log n)',
      ],
      correctIndex: 0,
      explanation:
        'There are n! orderings, each of length n to copy → O(n · n!). The output itself is factorial in size, which is why the n ≤ ~10 constraint is your permission to enumerate them.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-bt-combine',
    lessonId: 'lc-backtracking',
    difficulty: 2,
    prompt:
      'Combinations. Return all combinations of k numbers chosen from 1..n (order within a combination doesn’t matter). Use a start index so you never repeat a combination.',
    starterCode: `def combine(n, k):
    # Backtrack from a start value; stop a branch once the path reaches length k.
    # TODO
    return []
`,
    tests: `def norm(c):
    return sorted(tuple(x) for x in c)

def test_example():
    got = combine(4, 2)
    want = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
    assert norm(got) == norm(want)

def test_k1():
    assert norm(combine(3, 1)) == norm([[1], [2], [3]])

def test_all():
    assert combine(2, 2) == [[1, 2]]
`,
    hints: [
      'backtrack(start, path): if len(path) == k, record path[:].',
      'For i in range(start, n + 1): choose i, recurse with start = i + 1, un-choose.',
    ],
    solution: `def combine(n, k):
    res = []

    def backtrack(start, path):
        if len(path) == k:
            res.append(path[:])
            return
        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1, path)
            path.pop()

    backtrack(1, [])
    return res
`,
    complexityCheck: {
      prompt: 'What does recursing with start = i + 1 guarantee?',
      options: [
        'Combinations are built in increasing order, so [2,3] and [3,2] aren’t both generated',
        'It sorts the output',
        'It makes it O(n)',
        'Nothing important',
      ],
      correctIndex: 0,
      explanation:
        'Advancing the start index means each choice only considers larger values, so every combination is produced once in ascending order — no permuted duplicates.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-bt-phone',
    lessonId: 'lc-backtracking',
    difficulty: 2,
    prompt:
      'Letter Combinations of a Phone Number. Given digits 2-9, return all letter strings they could spell (like old phone keypads). Return [] for an empty input. Backtracking over each digit’s letters.',
    starterCode: `def letter_combinations(digits):
    # Map each digit to its letters. Backtrack: for each letter of the current
    # digit, append it and recurse to the next digit.
    # TODO
    return []
`,
    tests: `def test_two_digits():
    got = letter_combinations("23")
    want = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
    assert sorted(got) == sorted(want)

def test_empty():
    assert letter_combinations("") == []

def test_single():
    assert sorted(letter_combinations("2")) == ["a", "b", "c"]
`,
    hints: [
      'mapping = {"2": "abc", "3": "def", ... "9": "wxyz"}.',
      'backtrack(i, path): if i == len(digits), record "".join(path).',
      'For ch in mapping[digits[i]]: choose, recurse i+1, un-choose.',
    ],
    solution: `def letter_combinations(digits):
    if not digits:
        return []
    mapping = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    res = []

    def backtrack(i, path):
        if i == len(digits):
            res.append("".join(path))
            return
        for ch in mapping[digits[i]]:
            path.append(ch)
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
`,
    complexityCheck: {
      prompt: 'For d digits each mapping to ~4 letters, how many strings?',
      options: [
        'Up to 4^d — the product of the choices per digit',
        'O(d²)',
        'O(d)',
        'O(d log d)',
      ],
      correctIndex: 0,
      explanation:
        'Each digit multiplies the count by its number of letters (3 or 4), so the output is up to 4^d strings — exponential, which is why inputs are short.',
    },
  },

  // --- lc-graphs ----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-graph-maxarea',
    lessonId: 'lc-graphs',
    difficulty: 2,
    prompt:
      'Max Area of Island. grid is a matrix of 0s (water) and 1s (land). Return the area (cell count) of the largest island (4-directionally connected). Flood-fill each island and track the max.',
    starterCode: `def max_area_of_island(grid):
    # For each unvisited land cell, DFS/flood-fill the whole island, counting
    # cells and sinking them to 0. Track the maximum area.
    # TODO
    return 0
`,
    tests: `def test_example():
    grid = [[0, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]
    assert max_area_of_island(grid) == 3

def test_none():
    assert max_area_of_island([[0, 0], [0, 0]]) == 0

def test_full():
    assert max_area_of_island([[1, 1], [1, 1]]) == 4

def test_two_islands():
    assert max_area_of_island([[1, 0, 1, 1], [0, 0, 0, 0]]) == 2
`,
    hints: [
      'area(r, c) returns 0 if out of bounds or grid[r][c] != 1.',
      'Otherwise sink grid[r][c] = 0 and return 1 + area of the 4 neighbors.',
      'Loop all cells; best = max(best, area(r, c)) whenever you hit a 1.',
    ],
    solution: `def max_area_of_island(grid):
    rows, cols = len(grid), len(grid[0])

    def area(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != 1:
            return 0
        grid[r][c] = 0
        return 1 + area(r + 1, c) + area(r - 1, c) + area(r, c + 1) + area(r, c - 1)

    best = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                best = max(best, area(r, c))
    return best
`,
    complexityCheck: {
      prompt: 'Complexity for an m×n grid?',
      options: ['O(m·n) — each cell is visited a constant number of times', 'O((m·n)²)', 'O(m + n)', 'O(m·n·log(m·n))'],
      correctIndex: 0,
      explanation:
        'Sinking cells means each is counted once across all flood-fills → O(m·n). Same shape as "number of islands," just tracking the max blob size.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-graph-components',
    lessonId: 'lc-graphs',
    difficulty: 3,
    prompt:
      'Number of Connected Components in an Undirected Graph. Given n nodes (0..n-1) and an edge list, return the number of connected components. Union-find is the clean tool.',
    starterCode: `def count_components(n, edges):
    # Start with n components. Union the endpoints of each edge; every union
    # that joins two different groups reduces the count by one.
    # TODO
    return n
`,
    tests: `def test_two():
    assert count_components(5, [[0, 1], [1, 2], [3, 4]]) == 2

def test_one():
    assert count_components(5, [[0, 1], [1, 2], [2, 3], [3, 4]]) == 1

def test_none_connected():
    assert count_components(4, []) == 4

def test_redundant_edge():
    assert count_components(3, [[0, 1], [1, 2], [0, 2]]) == 1
`,
    hints: [
      'parent = list(range(n)); find(x) walks to the root (with path compression).',
      'union(a, b): if roots differ, link one under the other and return True.',
      'count = n; subtract 1 for each successful union.',
    ],
    solution: `def count_components(n, edges):
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            return True
        return False

    count = n
    for a, b in edges:
        if union(a, b):
            count -= 1
    return count
`,
    complexityCheck: {
      prompt: 'Why does a redundant edge (both endpoints already connected) not change the count?',
      options: [
        'union returns False when the roots are already equal, so the count only drops on genuine merges',
        'Redundant edges are removed first',
        'It always decrements',
        'Because the graph is a tree',
      ],
      correctIndex: 0,
      explanation:
        'find(a) == find(b) means they’re already in one component, so no merge happens and the count is unchanged. With path compression it’s effectively O((n + e)·α(n)).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-graph-oranges',
    lessonId: 'lc-graphs',
    difficulty: 3,
    prompt:
      'Rotting Oranges. grid cells are 0 (empty), 1 (fresh), 2 (rotten). Each minute, every rotten orange rots its 4-neighboring fresh oranges. Return the minutes until none are fresh, or -1 if impossible. Multi-source BFS.',
    starterCode: `def oranges_rotting(grid):
    # Seed a queue with ALL rotten oranges at time 0 and count the fresh ones.
    # BFS outward; each fresh orange rots at parent_time + 1. Answer is the max
    # time, or -1 if any fresh remain.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]) == 4

def test_impossible():
    assert oranges_rotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]) == -1

def test_none_fresh():
    assert oranges_rotting([[0, 2]]) == 0

def test_already_done():
    assert oranges_rotting([[2, 2], [2, 2]]) == 0
`,
    hints: [
      'Scan once: enqueue every rotten cell as (r, c, 0) and count fresh cells.',
      'BFS: for each fresh neighbor, rot it, decrement fresh, enqueue with t + 1, track max t.',
      'Return the max time if fresh == 0 else -1.',
    ],
    solution: `def oranges_rotting(grid):
    from collections import deque
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                q.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    while q:
        r, c, t = q.popleft()
        minutes = max(minutes, t)
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                q.append((nr, nc, t + 1))
    return minutes if fresh == 0 else -1
`,
    complexityCheck: {
      prompt: 'Why seed the queue with ALL rotten oranges before starting BFS?',
      options: [
        'They all rot simultaneously — multi-source BFS advances every front in lockstep so the layer number equals the minute',
        'To sort them',
        'Only one source is allowed',
        'It’s required by heapq',
      ],
      correctIndex: 0,
      explanation:
        'Multiple rotten oranges spread at once, so all are level 0. Multi-source BFS treats them as one combined frontier, and BFS depth = minutes. O(m·n).',
    },
  },

  // --- lc-dp-1d -----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-dp-rob',
    lessonId: 'lc-dp-1d',
    difficulty: 2,
    prompt:
      'House Robber. You can’t rob two adjacent houses. Return the maximum money from nums. Classic 1-D DP: at each house, skip it (take the previous best) or rob it (best from two back + this).',
    starterCode: `def rob(nums):
    # Roll two values: best excluding the current house, and best including it.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert rob([1, 2, 3, 1]) == 4

def test_bigger():
    assert rob([2, 7, 9, 3, 1]) == 12

def test_alt():
    assert rob([2, 1, 1, 2]) == 4

def test_empty():
    assert rob([]) == 0
`,
    hints: [
      'prev, curr = 0, 0 (best up to two-back, best up to one-back).',
      'For each n: prev, curr = curr, max(curr, prev + n).',
      'Return curr.',
    ],
    solution: `def rob(nums):
    prev, curr = 0, 0
    for n in nums:
        prev, curr = curr, max(curr, prev + n)
    return curr
`,
    complexityCheck: {
      prompt: 'What is the state and transition here?',
      options: [
        'State: best loot up to house i; transition: max(skip = dp[i-1], rob = dp[i-2] + nums[i])',
        'State: the current house value only',
        'There is no transition',
        'It’s greedy, not DP',
      ],
      correctIndex: 0,
      explanation:
        'dp[i] is the best you can rob considering houses 0..i; you either skip house i (keep dp[i-1]) or rob it (dp[i-2] + nums[i]). Only two prior values are needed → O(n) time, O(1) space.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-dp-mincost',
    lessonId: 'lc-dp-1d',
    difficulty: 1,
    prompt:
      'Min Cost Climbing Stairs. cost[i] is the price to step off stair i; you may start at index 0 or 1 and climb 1 or 2 steps at a time. Return the min cost to reach the top (past the last stair).',
    starterCode: `def min_cost_climbing(cost):
    # dp[i] = min cost to REACH step i (top = len(cost)). Each step is reached
    # from one or two below, paying that step's cost. Two rolling values suffice.
    # TODO
    return 0
`,
    tests: `def test_small():
    assert min_cost_climbing([10, 15, 20]) == 15

def test_long():
    assert min_cost_climbing([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6

def test_two():
    assert min_cost_climbing([0, 0]) == 0

def test_two_cost():
    assert min_cost_climbing([1, 2]) == 1
`,
    hints: [
      'a, b = 0, 0 are the min costs to reach steps i-2 and i-1 (top starts reachable for free at 0 and 1).',
      'For i from 2 to len(cost): new = min(b + cost[i-1], a + cost[i-2]).',
      'Roll a, b forward and return b.',
    ],
    solution: `def min_cost_climbing(cost):
    a, b = 0, 0
    for i in range(2, len(cost) + 1):
        a, b = b, min(b + cost[i - 1], a + cost[i - 2])
    return b
`,
    complexityCheck: {
      prompt: 'Complexity?',
      options: ['O(n) time, O(1) space', 'O(n) time, O(n) space', 'O(n²)', 'O(2ⁿ)'],
      correctIndex: 0,
      explanation:
        'Each step depends only on the previous two, so two rolling variables give O(n) time and O(1) space — the space-optimized form of the 1-D table.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-dp-lis',
    lessonId: 'lc-dp-1d',
    difficulty: 3,
    prompt:
      'Longest Increasing Subsequence. Return the length of the longest strictly increasing subsequence of nums (elements in order, not necessarily contiguous). The O(n²) DP is the classic first solution.',
    starterCode: `def length_of_lis(nums):
    # dp[i] = length of the longest increasing subsequence ENDING at i.
    # dp[i] = 1 + max(dp[j] for j < i with nums[j] < nums[i]), or 1.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]) == 4

def test_second():
    assert length_of_lis([0, 1, 0, 3, 2, 3]) == 4

def test_flat():
    assert length_of_lis([7, 7, 7, 7]) == 1

def test_single():
    assert length_of_lis([5]) == 1
`,
    hints: [
      'dp = [1] * len(nums).',
      'For i, for each j < i with nums[j] < nums[i]: dp[i] = max(dp[i], dp[j] + 1).',
      'Answer is max(dp).',
    ],
    solution: `def length_of_lis(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
`,
    complexityCheck: {
      prompt: 'What is dp[i] defined as, and the cost?',
      options: [
        'dp[i] = LIS length ending exactly at i; O(n²) from the inner scan over earlier indices',
        'dp[i] = the value at i; O(n)',
        'O(n log n) with this exact code',
        'O(2ⁿ)',
      ],
      correctIndex: 0,
      explanation:
        'Anchoring the subsequence to end at i makes the transition well-defined (extend any smaller earlier ending). The double loop is O(n²); a patience-sorting + binary-search variant reaches O(n log n).',
    },
  },

  // --- lc-dp-2d -----------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-dp-minpath',
    lessonId: 'lc-dp-2d',
    difficulty: 2,
    prompt:
      'Minimum Path Sum. From the top-left of a grid of non-negative numbers, moving only right or down, return the minimum sum along a path to the bottom-right. 2-D DP.',
    starterCode: `def min_path_sum(grid):
    # dp[r][c] = grid[r][c] + min(cost from above, cost from left). First row/col
    # have only one way in.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert min_path_sum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]) == 7

def test_rect():
    assert min_path_sum([[1, 2, 3], [4, 5, 6]]) == 12

def test_single():
    assert min_path_sum([[5]]) == 5

def test_row():
    assert min_path_sum([[1, 2, 3]]) == 6
`,
    hints: [
      'Handle (0,0) = grid[0][0]; first row accumulates from the left; first column from above.',
      'Otherwise dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).',
      'Answer is dp[last][last].',
    ],
    solution: `def min_path_sum(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            if r == 0 and c == 0:
                dp[r][c] = grid[r][c]
            elif r == 0:
                dp[r][c] = dp[r][c - 1] + grid[r][c]
            elif c == 0:
                dp[r][c] = dp[r - 1][c] + grid[r][c]
            else:
                dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]
    return dp[rows - 1][cols - 1]
`,
    complexityCheck: {
      prompt: 'Complexity for an m×n grid?',
      options: ['O(m·n) time and space (reducible to O(n) space)', 'O(m + n)', 'O((m·n)²)', 'O(2^(m+n))'],
      correctIndex: 0,
      explanation:
        'Each cell is computed once from its top and left neighbors → O(m·n) time and space. Since each row only needs the previous row, it collapses to O(n) space.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-dp-obstacles',
    lessonId: 'lc-dp-2d',
    difficulty: 2,
    prompt:
      'Unique Paths II. Count paths from top-left to bottom-right moving only right or down, where grid cells with a 1 are obstacles you cannot enter. Return 0 if the start or end is blocked.',
    starterCode: `def unique_paths_with_obstacles(grid):
    # dp[r][c] = ways to reach (r,c). Obstacles contribute 0 ways. Otherwise sum
    # the ways from above and from the left.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert unique_paths_with_obstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]) == 2

def test_small():
    assert unique_paths_with_obstacles([[0, 1], [0, 0]]) == 1

def test_blocked_start():
    assert unique_paths_with_obstacles([[1]]) == 0

def test_open():
    assert unique_paths_with_obstacles([[0, 0], [0, 0]]) == 2
`,
    hints: [
      'If the start cell is an obstacle, return 0. Seed dp[0][0] = 1.',
      'For each cell: if it’s an obstacle, dp = 0; else add dp from above (if any) and from the left (if any).',
    ],
    solution: `def unique_paths_with_obstacles(grid):
    rows, cols = len(grid), len(grid[0])
    if grid[0][0] == 1:
        return 0
    dp = [[0] * cols for _ in range(rows)]
    dp[0][0] = 1
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                dp[r][c] = 0
                continue
            if r > 0:
                dp[r][c] += dp[r - 1][c]
            if c > 0:
                dp[r][c] += dp[r][c - 1]
    return dp[rows - 1][cols - 1]
`,
    complexityCheck: {
      prompt: 'How are obstacles handled in the recurrence?',
      options: [
        'An obstacle cell contributes 0 ways, so paths route around it automatically',
        'Obstacles are deleted from the grid first',
        'They add 1 way',
        'They make the answer 0 always',
      ],
      correctIndex: 0,
      explanation:
        'Setting an obstacle’s dp to 0 means no path passes through it; downstream cells simply sum the surviving routes. O(m·n) time and space.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-dp-edit',
    lessonId: 'lc-dp-2d',
    difficulty: 3,
    prompt:
      'Edit Distance (Hard). Return the minimum number of single-character insertions, deletions, or replacements to turn word a into word b. The canonical two-sequence 2-D DP.',
    starterCode: `def edit_distance(a, b):
    # dp[i][j] = edits to turn a[:i] into b[:j]. Base cases: dp[i][0]=i, dp[0][j]=j.
    # If last chars match, no new cost (diagonal); else 1 + min(insert, delete, replace).
    # TODO
    return 0
`,
    tests: `def test_example():
    assert edit_distance("horse", "ros") == 3

def test_second():
    assert edit_distance("intention", "execution") == 5

def test_empty():
    assert edit_distance("", "abc") == 3

def test_same():
    assert edit_distance("abc", "abc") == 0
`,
    hints: [
      'dp is (m+1) x (n+1). dp[i][0] = i, dp[0][j] = j (all inserts/deletes).',
      'If a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1].',
      'Else dp[i][j] = 1 + min(dp[i-1][j] delete, dp[i][j-1] insert, dp[i-1][j-1] replace).',
    ],
    solution: `def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    return dp[m][n]
`,
    complexityCheck: {
      prompt: 'What do the three terms in the min represent?',
      options: [
        'Delete from a (dp[i-1][j]), insert into a (dp[i][j-1]), replace (dp[i-1][j-1])',
        'Three unrelated constants',
        'Left, right, and down moves in a grid',
        'Nothing — only the diagonal matters',
      ],
      correctIndex: 0,
      explanation:
        'Each option is one edit onto a smaller subproblem: drop a char of a, add a char to match b, or swap the mismatched char. O(m·n) time and space — the engine behind diff and spell-check.',
    },
  },

  // --- lc-hard ------------------------------------------------------------
  {
    kind: 'code',
    id: 'lc-ps-hard-histogram',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt:
      'Largest Rectangle in Histogram (Hard). Given bar heights of width 1, return the area of the largest rectangle. A monotonic (increasing) stack of (start_index, height) finds, for each bar, how far left it can extend.',
    starterCode: `def largest_rectangle_area(heights):
    # Keep a stack increasing by height, storing (start_index, height). When a
    # shorter bar arrives, pop taller bars and settle their rectangles, carrying
    # the leftmost start back to the new bar.
    # TODO
    return 0
`,
    tests: `def test_example():
    assert largest_rectangle_area([2, 1, 5, 6, 2, 3]) == 10

def test_two():
    assert largest_rectangle_area([2, 4]) == 4

def test_single():
    assert largest_rectangle_area([5]) == 5

def test_valley():
    assert largest_rectangle_area([2, 1, 2]) == 3
`,
    hints: [
      'stack holds (start, height) with heights increasing. best = 0.',
      'For each i, h: start = i; while stack top is taller than h, pop (idx, ht), best = max(best, ht * (i - idx)), and set start = idx. Push (start, h).',
      'After the loop, settle the rest: for (idx, ht) in stack, best = max(best, ht * (n - idx)).',
    ],
    solution: `def largest_rectangle_area(heights):
    stack = []
    best = 0
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            best = max(best, height * (i - idx))
            start = idx
        stack.append((start, h))
    n = len(heights)
    for idx, height in stack:
        best = max(best, height * (n - idx))
    return best
`,
    complexityCheck: {
      prompt: 'Why is this O(n) despite the inner while-loop?',
      options: [
        'Each bar is pushed once and popped once, so total pops across the run are ≤ n',
        'It’s O(n²)',
        'The heights are sorted',
        'Binary search bounds it',
      ],
      correctIndex: 0,
      explanation:
        'When a bar is popped, its maximal rectangle is finalized and it’s never revisited. Each index enters and leaves the stack once → O(n). Carrying the leftmost start back is what extends a popped bar’s width correctly.',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-hard-slidingmax',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt:
      'Sliding Window Maximum (Hard). Return the maximum of every contiguous window of size k. A monotonic-decreasing deque of indices gives each window’s max in O(1).',
    starterCode: `def max_sliding_window(nums, k):
    # Deque of indices, values decreasing. Pop smaller values from the back when
    # a bigger one arrives; drop the front if it falls out of the window. The
    # front is always the current window's max.
    # TODO
    return []
`,
    tests: `def test_example():
    assert max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3) == [3, 3, 5, 5, 6, 7]

def test_single_k():
    assert max_sliding_window([1, 2, 3], 1) == [1, 2, 3]

def test_full():
    assert max_sliding_window([9, 11], 2) == [11]

def test_decreasing():
    assert max_sliding_window([4, 3, 2, 1], 2) == [4, 3, 2]
`,
    hints: [
      'from collections import deque; dq holds indices with decreasing nums values.',
      'For i, n: pop from the back while nums[back] < n; append i; if dq[0] <= i - k, popleft.',
      'Once i >= k - 1, append nums[dq[0]] to the result.',
    ],
    solution: `def max_sliding_window(nums, k):
    from collections import deque
    dq = deque()
    res = []
    for i, n in enumerate(nums):
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res
`,
    complexityCheck: {
      prompt: 'Why is the deque approach O(n) rather than O(n·k)?',
      options: [
        'Each index is added and removed from the deque at most once, so the total work is linear',
        'It sorts each window',
        'It uses binary search',
        'It’s actually O(n·k)',
      ],
      correctIndex: 0,
      explanation:
        'The monotonic deque discards dominated indices permanently, so across the whole scan each index is pushed and popped once → O(n). Recomputing each window’s max naively would be O(n·k).',
    },
  },
  {
    kind: 'code',
    id: 'lc-ps-hard-validparen',
    lessonId: 'lc-hard',
    difficulty: 3,
    prompt:
      'Longest Valid Parentheses (Hard). Given a string of "(" and ")", return the length of the longest well-formed substring. A stack of indices, seeded with a -1 base, measures each valid stretch.',
    starterCode: `def longest_valid_parentheses(s):
    # Stack of indices, start with [-1] as a base "last unmatched" marker.
    # On "(" push the index. On ")" pop; if the stack empties, push this index as
    # the new base; else the valid length is i - stack[-1].
    # TODO
    return 0
`,
    tests: `def test_one():
    assert longest_valid_parentheses("(()") == 2

def test_two():
    assert longest_valid_parentheses(")()())") == 4

def test_empty():
    assert longest_valid_parentheses("") == 0

def test_none_valid():
    assert longest_valid_parentheses("(((") == 0
`,
    hints: [
      'stack = [-1]; best = 0.',
      'On "(": push i. On ")": pop.',
      'After popping, if stack is empty push i (new base); else best = max(best, i - stack[-1]).',
    ],
    solution: `def longest_valid_parentheses(s):
    stack = [-1]
    best = 0
    for i, ch in enumerate(s):
        if ch == "(":
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                best = max(best, i - stack[-1])
    return best
`,
    complexityCheck: {
      prompt: 'What does the -1 base on the stack represent?',
      options: [
        'The index just before the current valid run, so i - stack[-1] measures the run length',
        'An error sentinel',
        'The answer itself',
        'The number of open parens',
      ],
      correctIndex: 0,
      explanation:
        'The stack’s bottom always holds the index of the last position that broke validity. Subtracting it from i gives the length of the valid stretch ending at i. One pass → O(n) time, O(n) space.',
    },
  },
];
