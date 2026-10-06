import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-answer-monotonic',
    lessonId: 'binary-search',
    difficulty: 3,
    prompt:
      '"Binary search on the answer" solves problems with no sorted array in sight (ship capacity, git bisect). What property must the feasibility check have for this to be valid?',
    options: [
      'The check must be deterministic, though it may flip between yes and no freely',
      'The check must run in O(1) time, or else the search loses its logarithmic speedup',
      'The answer must be an integer power of two so that halving always lands on one',
      'Monotonicity: if capacity c works, every larger capacity works, so yes/no flips once',
    ],
    correctIndex: 3,
    explanation:
      'Binary search never searches arrays — it searches any space where one comparison discards half. A monotonic predicate gives the space that structure: all NOs then all YESes, one boundary. can_ship(c) is monotone (more capacity never hurts); "does commit X have the bug" is monotone in history (bugs persist once introduced — git bisect’s actual assumption). Arbitrary flips (option D) destroy the discard step: the eliminated half could hide the boundary.',
    distractorNotes: [
      'Deterministic but non-monotone is exactly the case where discarding half is unsound.',
      'The check is usually O(n) — total O(n log range) is the whole selling point.',
      'The range can be anything ordered; powers of two are irrelevant.',
      'Correct.',
    ],
  },
  {
    kind: 'code',
    id: 'q-bisect-code',
    lessonId: 'binary-search',
    difficulty: 2,
    prompt:
      'Implement bisect_left(a, x) from scratch: the leftmost index where x could be inserted to keep a sorted (equivalently: index of the first element ≥ x). Half-open bounds, no equality early-exit.',
    starterCode: `def bisect_left(a, x):
    lo, hi = 0, len(a)   # half-open: answer lies in [lo, hi]
    # TODO: shrink until lo == hi. If a[mid] < x the boundary is right of mid;
    # otherwise it is at mid or left of it. Note there is NO == early return.
    ...
`,
    tests: `def test_found_leftmost():
    assert bisect_left([1, 2, 2, 2, 3], 2) == 1, "must return the FIRST slot among equals"

def test_absent_middle():
    assert bisect_left([1, 3, 5], 4) == 2

def test_smaller_than_all():
    assert bisect_left([2, 4], 1) == 0

def test_larger_than_all():
    assert bisect_left([2, 4], 9) == 2

def test_empty():
    assert bisect_left([], 5) == 0

def test_no_crash_on_duplicates_everywhere():
    assert bisect_left([7, 7, 7], 7) == 0
`,
    hints: [
      'Invariant: everything left of lo is < x; everything at/right of hi is ≥ x. The answer is where they meet.',
      'while lo < hi: mid = (lo + hi) // 2. If a[mid] < x: lo = mid + 1 else: hi = mid. Note hi = mid, NOT mid − 1 — a[mid] ≥ x means mid might BE the answer.',
      'Return lo (== hi). There is deliberately no equality early-exit: finding an equal element doesn’t prove it’s the LEFTMOST equal.',
    ],
    solution: `def bisect_left(a, x):
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1
        else:
            hi = mid
    return lo
`,
    complexityCheck: {
      prompt: 'Why can’t bisect_left use the classic "if a[mid] == x: return mid" shortcut?',
      options: [
        'Equality comparisons are slow in Python, so skipping them makes the loop faster',
        'An equal element at mid doesn’t prove it’s the LEFTMOST one, so the search must go on',
        'It can: the shortcut is a valid optimization that returns a correct index early',
        'bisect_left has to be O(n) anyway, because it must scan through every duplicate',
      ],
      correctIndex: 1,
      explanation:
        'bisect_left answers a boundary question ("first index ≥ x"), not a membership question. Returning at the first equality would give SOME index of x, not the first one — [1,2,2,2,3] could return 2 instead of 1. The boundary formulation with hi = mid handles duplicates for free and is still O(log n): the run of equals is halved like everything else.',
    },
  },
];
