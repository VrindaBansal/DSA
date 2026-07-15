import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-counting-escape',
    lessonId: 'sorting-algorithms',
    difficulty: 3,
    prompt:
      'Comparison sorts cannot beat Ω(n log n), yet counting sort runs in O(n + k). How does it escape the lower bound, and when is the escape a bad deal?',
    options: [
      'It never compares elements — it indexes by key value directly; the deal sours when the key range k dwarfs n (e.g. sorting 100 64-bit ids)',
      'It uses parallelism to hide the log factor',
      'It doesn’t escape — O(n+k) is secretly n log n',
      'It only works on already-sorted input',
    ],
    correctIndex: 0,
    explanation:
      'The Ω(n log n) bound counts COMPARISONS — it’s an information-theoretic limit on decision trees. Counting sort asks a different question: not "is a < b?" but "what is a?", using the key as an array index. That requires small integer-ish keys: counting 100 elements ranging over 2⁶⁴ would allocate a universe-sized array. Radix sort is the fix — digit-by-digit counting passes, O(d·(n+b)).',
    distractorNotes: [
      'Correct.',
      'Parallelism divides wall-clock, never asymptotics.',
      'The bound genuinely doesn’t apply — it constrains comparison-based algorithms only. Knowing the bound’s *scope* is the interview point.',
      'Counting sort is oblivious to input order; k is its only sensitivity.',
    ],
  },
  {
    kind: 'short',
    id: 'q-pivot-short',
    lessonId: 'sorting-algorithms',
    difficulty: 3,
    prompt:
      'The sorting race showed naive-pivot quicksort going quadratic on sorted input. Explain why that input is adversarial for a first/last-element pivot, and why a RANDOM pivot repairs the guarantee (and in what sense).',
    rubric: [
      'A first/last pivot on sorted input splits n into (0, n−1) every level — n levels of linear partitions = Θ(n²)',
      'The failure is systematic: a fixed pivot rule lets one specific input class hit the worst case every single time',
      'Random pivots make splits good in expectation regardless of input — O(n log n) expected, with no input class that reliably triggers n²',
    ],
    modelAnswer:
      'With pivot = last element, sorted input makes every partition put ALL remaining elements on one side: sizes n, n−1, n−2, … — a linear amount of work at each of n levels, Θ(n²). The killer is determinism: the pivot rule is a fixed function of position, so an adversary (or an innocent pre-sorted file — the common case!) hits the bad split every level. Choosing the pivot uniformly at random breaks the correlation between input order and split quality: whatever the input, each partition is balanced in expectation, giving O(n log n) *expected* time — the worst case still exists but no input triggers it reliably; you’d have to lose the coin flips. Median-of-three and introsort (fall back to heapsort past a depth limit) are the deterministic industrial fixes.',
  },
];
