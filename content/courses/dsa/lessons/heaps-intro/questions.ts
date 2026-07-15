import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'short',
    id: 'q-topk-short',
    lessonId: 'heaps-intro',
    difficulty: 3,
    prompt:
      'You must keep the top 10 scores from a stream of 10 million events. Explain the size-k min-heap pattern: why a MIN-heap for a top-K problem, and what does the full pass cost?',
    rubric: [
      'Keep a heap of only k elements — the k best seen so far — with the WORST of them at the root',
      'A min-heap makes the weakest current member O(1) to find: each new event either loses to the root (discard) or replaces it (pop+push, O(log k))',
      'Total cost O(n log k) time and O(k) space — versus O(n log n) time / O(n) space for sorting everything',
    ],
    modelAnswer:
      'Hold a min-heap of size 10 containing the best 10 so far. The counter-intuitive part is the polarity: you want the WEAKEST of your champions instantly accessible, because that is the only one a newcomer can displace — hence min-heap for top-K-largest. Each event compares against the root: smaller → discard in O(1); larger → replace root and sift, O(log k). Ten million events cost O(n log k) ≈ n·3.3 comparisons with O(k) memory — you never sort, never store the stream. This is how "k nearest results" works inside a search ranker.',
  },
];
