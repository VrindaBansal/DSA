import type { CheatsheetData } from '@/lib/types';

export const CHEATSHEET: CheatsheetData = {
  lessonId: 'deques',
  opsTable: [
    { op: 'append / appendleft', complexity: 'O(1)', note: 'both ends, always' },
    { op: 'pop / popleft', complexity: 'O(1)', note: 'both ends, always' },
    { op: 'index into middle', complexity: 'O(n)', note: 'walks blocks — lists win here' },
    { op: 'rotate(k)', complexity: 'O(k)', note: 'moves ends, not a re-layout' },
    { op: 'priority queue push/pop (preview)', complexity: 'O(log n)', note: 'heapq — Module 7' },
  ],
  useWhen:
    'Both ends matter: sliding windows, BFS frontiers, work-stealing, undo buffers with a cap (maxlen).',
  dontUseWhen:
    'You index into the middle a lot (use a list) or need "best next" rather than "ends next" (use a heap).',
  stdlib: 'collections.deque(maxlen=k) · heapq.heappush / heappop (preview)',
  bullets: [
    'deque = doubly-linked chain of fixed-size blocks: O(1) ends, O(n) middle — the exact inverse of a contiguous array.',
    'BFS frontier is a queue because FIFO expands nodes in distance order; swap in a stack and the identical loop becomes DFS.',
    'Priority queue changes the contract: serve most-important, not first-arrived — heap pays O(log n) to keep the extreme on top.',
    'Two stacks make a queue with amortized O(1) ops: each element is moved at most twice, ever.',
  ],
  gotchas: [
    'deque(maxlen=k) silently drops from the far end when full — great for "last k events," surprising if you expected an exception.',
    'd[n//2] looks innocent but is O(n) — random access is the price of cheap ends.',
  ],
};
