import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-master-mergesort',
    lessonId: 'recursion-trees',
    difficulty: 2,
    prompt:
      'T(n) = 2T(n/2) + cn (merge sort). What does the recursion tree show at each level?',
    options: [
      'Level costs halve as you descend — the root dominates, so O(n)',
      'Every level costs exactly cn, and there are log₂ n levels — so O(n log n)',
      'Level costs double as you descend — the leaves dominate, so O(n²)',
      'The tree has n levels of cost c — so O(n)',
    ],
    correctIndex: 1,
    explanation:
      'Level k has 2ᵏ nodes each doing c·(n/2ᵏ) work: the product is cn at every level. Flat level sums × log₂ n levels = Θ(n log n). "Every level costs the same" is the signature of the balanced case.',
    distractorNotes: [
      'Halving level sums happen when the combine work shrinks faster than nodes multiply — e.g. T(n)=T(n/2)+n gives a geometric series dominated by the root: O(n).',
      'Correct.',
      'Doubling level sums is T(n)=4T(n/2)+n territory: leaves dominate, Θ(n²).',
      'Depth is log₂ n, not n — the input halves each level.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-rectree-fib',
    lessonId: 'recursion-trees',
    difficulty: 2,
    prompt:
      'Naive fib(n) calls fib(n−1) and fib(n−2). What does its recursion tree look like, and what cost does that imply?',
    options: [
      'A balanced binary tree of depth log n — O(n log n)',
      'A path of n calls — O(n)',
      'A binary tree of depth ~n where the node count roughly doubles per level — exponential, Θ(φⁿ)',
      'A grid of n² calls — O(n²)',
    ],
    correctIndex: 2,
    explanation:
      'Each call branches twice and the argument shrinks by only 1 or 2, so depth is ~n and the tree bushes out exponentially (~1.618ⁿ nodes — the golden ratio, fittingly). The tree also shows the cure: the same subproblems appear over and over, which is exactly what memoization collapses to n distinct nodes.',
    distractorNotes: [
      'Balanced log-depth trees need the problem to *halve* per call; fib decrements.',
      'A path is single recursion (like factorial); fib branches.',
      'Correct.',
      'n² is what you get *after* memoizing nothing but… no — memoized fib is O(n). The n² grid picture belongs to two-index DP like edit distance.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-master-leafheavy',
    lessonId: 'recursion-trees',
    difficulty: 3,
    prompt: 'T(n) = 4T(n/2) + cn. Which term wins, and what is T(n)?',
    options: [
      'The root — T(n) = Θ(n)',
      'All levels tie — T(n) = Θ(n log n)',
      'The leaves — level sums double every level, T(n) = Θ(n²)',
      'Cannot be determined without the base case constant',
    ],
    correctIndex: 2,
    explanation:
      'Level k: 4ᵏ nodes × c·n/2ᵏ work = cn·2ᵏ — the level sums *grow* geometrically, so the last level dominates. There are n^(log₂4) = n² leaves doing O(1) each: Θ(n²). Master theorem case 1: log_b a = 2 > 1, so n^(log_b a) wins.',
    distractorNotes: [
      'Root-dominates needs level sums that *shrink* (a·f(n/b) < f(n), e.g. T(n)=T(n/2)+n).',
      'The tie case needs f(n) ≈ n^(log_b a); here n vs n² — no tie.',
      'Correct.',
      'Base-case constants shift the answer by a constant factor only; growth class is determined by the recurrence shape.',
    ],
  },
  {
    kind: 'short',
    id: 'q-rectree-short',
    lessonId: 'recursion-trees',
    difficulty: 3,
    prompt:
      'Explain the recursion-tree method as a recipe: how do you go from a recurrence to a Θ bound without memorizing the Master theorem?',
    rubric: [
      'Draw the tree: each node is a subproblem labeled with its non-recursive (local) work',
      'Sum the work per level, then identify how level sums behave down the tree (shrinking / flat / growing geometric)',
      'Shrinking → root dominates; flat → level cost × depth; growing → leaves dominate (count the leaves)',
    ],
    modelAnswer:
      'Expand the recurrence into a tree where each node carries its local work f(size). Sum each level. Three regimes: if level sums shrink geometrically, the total is a constant times the root — Θ(f(n)). If they stay flat, total = level sum × number of levels — e.g. cn × log n for merge sort. If they grow geometrically, the bottom level swamps everything — count the leaves (a^depth) and multiply by the leaf cost. The Master theorem is just these three pictures with the algebra pre-chewed.',
  },
];
