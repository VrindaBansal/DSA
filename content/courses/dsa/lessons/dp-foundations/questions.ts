import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-greedy-coins',
    lessonId: 'dp-foundations',
    difficulty: 2,
    prompt:
      'Greedy coin change (always take the biggest coin) is optimal for US denominations but fails for coins {1, 3, 4} making 6: greedy gives 4+1+1 (three coins) vs the optimal 3+3 (two). What does this teach about greedy vs DP?',
    options: [
      'Greedy is always wrong, so dynamic programming should be used for every problem',
      'Greedy needs a proof that local picks never block the optimum; without one, use DP',
      'The failure comes from a floating-point rounding issue with those denominations',
      'DP is just greedy run twice, so it catches whatever the first greedy pass missed',
    ],
    correctIndex: 1,
    explanation:
      'Greedy commits irrevocably; that’s only safe when an exchange argument proves a greedy choice can always be swapped into some optimal solution (true for US coins, interval scheduling, Huffman). {1,3,4} has no such proof — taking 4 kills the 3+3 line permanently. DP is the systematic alternative: try every first coin, recurse, keep the best — paying time for the reconsideration greedy skips.',
    distractorNotes: [
      'Greedy with a valid exchange argument is *better* than DP — same answer, less work (Dijkstra, Kruskal, Huffman all greedy, all correct).',
      'Correct.',
      'Pure integers throughout — the failure is structural, not numeric.',
      'They’re different strategies: greedy commits to one choice per step; DP evaluates all of them.',
    ],
  },
  {
    kind: 'code',
    id: 'q-stairs-code',
    lessonId: 'dp-foundations',
    difficulty: 2,
    prompt:
      'climb(n): count distinct ways to climb n stairs taking 1 or 2 steps at a time. Write it bottom-up (tabulated) in O(n) time — then notice you only ever read two cells back.',
    starterCode: `def climb(n):
    # ways(n) = ways(n-1) + ways(n-2)   — land from one step below or two below
    # Base: ways(0) = 1 (stand still), ways(1) = 1
    # TODO: tabulate bottom-up. Full table or two variables — your choice.
    ...
`,
    tests: `def test_base_cases():
    assert climb(0) == 1
    assert climb(1) == 1

def test_small():
    assert climb(2) == 2   # 1+1, 2
    assert climb(3) == 3   # 1+1+1, 1+2, 2+1
    assert climb(4) == 5

def test_larger():
    assert climb(10) == 89

def test_no_recursion_blowup():
    assert climb(400) > 10**80, "n=400 must finish instantly — exponential recursion would hang"
`,
    hints: [
      'It’s Fibonacci in a costume: each stair’s count is the sum of the previous two.',
      'Tabulated: dp = [0]*(n+1); dp[0] = dp[1] = 1; fill left to right with dp[i] = dp[i-1] + dp[i-2].',
      'Space-optimize by noticing the recurrence only reads i−1 and i−2: keep two variables, a, b = b, a + b.',
    ],
    solution: `def climb(n):
    a, b = 1, 1          # ways(0), ways(1)
    for _ in range(n - 1):
        a, b = b, a + b
    return b if n >= 1 else 1
`,
    complexityCheck: {
      prompt: 'The naive recursive climb(n) vs your tabulated version — what changed and why?',
      options: [
        'Θ(n²) → Θ(n log n): tabulation halves the work done at each level of the recursion',
        'Θ(φⁿ) → Θ(n): recursion recomputed the same subproblems; the table solves each once',
        'Nothing asymptotic: the table only saves stack frames, so the time is the same',
        'Θ(n) → Θ(1): the two-variable trick removes the loop, so it runs in constant time',
      ],
      correctIndex: 1,
      explanation:
        'Naive climb branches twice while shrinking by 1–2 — the exponential recursion-tree signature from Module 1. Tabulation solves each distinct subproblem exactly once: n subproblems × O(1) transition = Θ(n). The two-variable trick then cuts SPACE from O(n) to O(1); time stays Θ(n) — the loop still runs.',
    },
  },
];
