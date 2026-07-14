import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-bigo-def',
    lessonId: 'big-o',
    difficulty: 1,
    prompt: 'Precisely, what does "f(n) is O(g(n))" claim?',
    options: [
      'f grows exactly as fast as g',
      'Beyond some n₀, f(n) is bounded above by c·g(n) for some constant c',
      'f(n) ≤ g(n) for every n',
      'f is the average-case running time and g is the worst case',
    ],
    correctIndex: 1,
    explanation:
      'Big-O is an eventual upper bound up to a constant: ∃c, n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀. Small inputs and constant factors are explicitly excused — that’s the feature, not a bug.',
    distractorNotes: [
      '"Exactly as fast" is Θ (Theta). O is only the ceiling; n is O(n²) too, just not tightly.',
      'Correct.',
      'The "beyond some n₀" clause exists precisely because small-n behavior may violate the inequality (100n is O(n²) even though 100n > n² for n < 100).',
      'O/Θ/Ω describe growth of *any* function. Worst/average/best case is a separate axis — you can bound each of them with any of the three symbols.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-bigo-autocomplete',
    lessonId: 'big-o',
    difficulty: 2,
    prompt:
      'An autocomplete widget re-ranks contacts on each keystroke by comparing every contact against every other contact (a nested loop). With 100 contacts it feels instant; the company grows to 10,000 contacts. Roughly how much more work per keystroke?',
    options: [
      '100× more — growth is linear',
      '10,000× more — the nested loop squares the growth factor',
      '2× more — hardware absorbs the rest',
      'log(100)× more — comparisons are cheap',
    ],
    correctIndex: 1,
    explanation:
      'O(n²) work: going from n=100 (10⁴ comparisons) to n=10,000 (10⁸ comparisons) is a 100× input growth but a 100² = 10,000× work growth — per keystroke. That’s the death of the feature, and no one saw it in testing because testing used 100 contacts.',
    distractorNotes: [
      'Input grew 100×, but work grows with the *square* of input for a pairwise loop.',
      'Correct.',
      'Hardware gives you a constant factor; n² eats constant factors for breakfast.',
      'Nothing in a pairwise comparison halves a search space — log appears when you discard half the candidates per step.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-bigo-theta',
    lessonId: 'big-o',
    difficulty: 2,
    prompt: 'Merge sort takes Θ(n log n) time. What does the Θ add over saying O(n log n)?',
    options: [
      'Nothing — they are synonyms',
      'Θ also promises a matching lower bound: it always takes at least ~n log n, not just at most',
      'Θ means the bound holds for average case only',
      'Θ means the constant factor is exactly 1',
    ],
    correctIndex: 1,
    explanation:
      'Θ is a two-sided bound: sandwiched between c₁·n log n and c₂·n log n eventually. O alone leaves the floor open — an O(n log n) algorithm could secretly be linear sometimes. Θ says: this is what it costs, full stop.',
    distractorNotes: [
      'Colloquially people use O as if it were Θ, but the interview-precise distinction is the two-sided bound.',
      'Correct.',
      'The case being analyzed (worst/average) is orthogonal to which bound symbol you use.',
      'All three symbols quotient away constants; none pin them.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-nested-loop',
    lessonId: 'big-o',
    difficulty: 2,
    prompt:
      'for i in range(n): for j in range(i): work() — the inner loop runs i times, not n. Total complexity?',
    options: [
      'O(n) — the inner loop is shorter than n',
      'O(n log n) — the shrinking loop adds a log',
      'O(n²) — the sum 0+1+…+(n−1) = n(n−1)/2 is still quadratic',
      'O(2ⁿ) — nested loops multiply',
    ],
    correctIndex: 2,
    explanation:
      'Count, don’t pattern-match: total inner iterations = Σi = n(n−1)/2 ≈ n²/2. The constant ½ dies in the wash; the n² does not. "Triangle loops" are the classic disguised quadratic.',
    distractorNotes: [
      'Each inner run is shorter, but there are n of them, averaging n/2 — the total is what matters.',
      'Logs come from *halving*, not from linearly shrinking bounds.',
      'Correct.',
      'Nested loops multiply their *trip counts* (n·n at worst) — that’s polynomial, not exponential. Exponential needs branching recursion.',
    ],
  },
  {
    kind: 'short',
    id: 'q-bigo-short',
    lessonId: 'big-o',
    difficulty: 2,
    prompt:
      'Why is binary search O(log n)? Explain where the logarithm physically comes from.',
    rubric: [
      'Each comparison discards half of the remaining search space',
      'The process ends when the space reaches size 1, after about log₂(n) halvings',
      'Each step does constant work, so total work is proportional to the number of halvings',
    ],
    modelAnswer:
      'Each probe compares the target to the middle element and throws away the half that cannot contain it. Starting from n candidates, after k halvings you have n/2ᵏ left; you stop at 1, so k ≈ log₂(n) steps. Each step is O(1) work (one comparison, two index updates), so the total is O(log n). The log is literally "how many times can you halve n before hitting 1."',
  },
];
