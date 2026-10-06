import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-twoptr-sorted',
    lessonId: 'dynamic-arrays',
    difficulty: 2,
    prompt:
      'Two pointers finds a pair summing to a target in a SORTED array in O(n). Why does the technique collapse on an unsorted array?',
    options: [
      'Each move relies on order: “sum too small → left++” only helps if values increase',
      'It doesn’t: two pointers works on any array, sorted or not, in the same O(n)',
      'Unsorted arrays can’t be indexed from both ends, so the right pointer has no start',
      'The two pointers would collide in the middle before they ever reach the pair',
    ],
    correctIndex: 0,
    explanation:
      'Each pointer move discards candidates forever. That discard is safe only because sortedness proves the discarded pairings couldn’t work (if a[l]+a[r] < target, no pair using a[l] and anything left of r can reach it). Remove the order and the proof — and the algorithm — evaporates. Sort first (O(n log n)) or trade space for a hash set.',
    distractorNotes: [
      'Correct.',
      'It runs on any array; it returns wrong answers on unsorted ones — worse than crashing.',
      'Indexing is always fine; the *inference* from a comparison is what breaks.',
      'They do meet in the middle — that’s the normal termination, not the problem.',
    ],
  },
  {
    kind: 'short',
    id: 'q-prefix-short',
    lessonId: 'dynamic-arrays',
    difficulty: 2,
    prompt:
      'Your dashboard answers thousands of "total revenue between day i and day j" queries over a fixed year of data. Explain the prefix-sum play: the preprocessing, the query, and the costs of each.',
    rubric: [
      'Precompute P where P[k] = sum of the first k elements — one O(n) pass',
      'Any range sum [i..j] is then P[j+1] − P[i], answered in O(1)',
      'The trade: O(n) extra space and one pass up front, amortized across many queries',
    ],
    modelAnswer:
      'Build P once: P[0]=0, P[k]=P[k−1]+a[k−1] — an O(n) pass and O(n) space. Then revenue(i..j) = P[j+1] − P[i]: two lookups and a subtraction, O(1) per query, no matter how wide the range. One linear pass converts every future range query from O(range) to O(1) — the classic precompute-once, query-forever trade, and the 1-D version of what image processing does with summed-area tables.',
  },
];
