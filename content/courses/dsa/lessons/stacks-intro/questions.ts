import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-monotonic-amortized',
    lessonId: 'stacks-intro',
    difficulty: 3,
    prompt:
      'The monotonic-stack sweep for "next greater element" has a while-loop inside a for-loop, yet it is O(n) total. What justifies that?',
    options: [
      'The inner while rarely executes in practice',
      'Each element is pushed exactly once and popped at most once, so all inner-loop iterations across the whole run total ≤ n',
      'Python optimizes nested loops into one',
      'It is actually O(n²); people quote the average case',
    ],
    correctIndex: 1,
    explanation:
      'Charge the work to elements, not to loop nests: every while-iteration pops something, and nothing is pushed twice. Total pops ≤ total pushes = n, so the "nested" loop does ≤ 2n work. This is the amortized argument from Module 1 wearing a stack costume — and the single most common false-O(n²) reading in interviews.',
    distractorNotes: [
      '"Rarely" is a hope, not a bound — the argument must survive adversarial input, and it does.',
      'Correct.',
      'No language does this; the bound is algorithmic.',
      'The pop-once argument is airtight and worst-case — no averaging over inputs involved.',
    ],
  },
  {
    kind: 'code',
    id: 'q-nge-code',
    lessonId: 'stacks-intro',
    difficulty: 2,
    prompt:
      'Implement next_greater(a): for each index, the value of the nearest element to its RIGHT that is strictly greater, or -1. Use a monotonic stack of indices; O(n) total.',
    starterCode: `def next_greater(a):
    res = [-1] * len(a)
    stack = []   # indices whose answer is still unknown; values decrease down the stack
    # TODO: for each i, pop every index whose value is < a[i] — a[i] is their answer.
    # Then push i.
    ...
    return res
`,
    tests: `def test_basic():
    assert next_greater([2, 1, 5, 3]) == [5, 5, -1, -1]

def test_increasing():
    assert next_greater([1, 2, 3]) == [2, 3, -1]

def test_decreasing():
    assert next_greater([3, 2, 1]) == [-1, -1, -1]

def test_duplicates_strict():
    assert next_greater([2, 2, 3]) == [3, 3, -1], "strictly greater: equal values don't count"

def test_empty():
    assert next_greater([]) == []
`,
    hints: [
      'Walk left to right. The stack holds indices still waiting for their next-greater.',
      'When a[i] arrives: while stack and a[stack[-1]] < a[i]: res[stack.pop()] = a[i]. The newcomer resolves everyone it beats.',
      'After the while, append i. Anything left on the stack at the end keeps its -1 — nothing to its right ever beat it.',
    ],
    solution: `def next_greater(a):
    res = [-1] * len(a)
    stack = []
    for i, x in enumerate(a):
        while stack and a[stack[-1]] < x:
            res[stack.pop()] = x
        stack.append(i)
    return res
`,
    complexityCheck: {
      prompt: 'Total time of next_greater on n elements, and why?',
      options: [
        'O(n) — every index is pushed once and popped at most once; the nested while is amortized away',
        'O(n²) — nested loops multiply',
        'O(n log n) — the stack keeps things sorted',
        'O(n) only on random inputs',
      ],
      correctIndex: 0,
      explanation:
        'The while-loop’s lifetime total is bounded by total pushes (n), not by n per outer iteration. "Nested loops multiply" applies to independent trip counts — here the inner loop consumes a budget the outer loop fills at 1 per step. Amortized analysis, third appearance in this curriculum.',
    },
  },
];
