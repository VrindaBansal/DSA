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
];
