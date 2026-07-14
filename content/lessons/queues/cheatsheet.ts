import type { CheatsheetData } from '@/lib/types';

export const CHEATSHEET: CheatsheetData = {
  lessonId: 'queues',
  opsTable: [
    { op: 'enqueue (push back)', complexity: 'O(1)', note: 'deque.append / ring write at tail' },
    { op: 'dequeue (pop front)', complexity: 'O(1)', note: 'deque.popleft / ring read at head' },
    { op: 'peek front', complexity: 'O(1)', note: 'q[0]' },
    { op: 'search / index', complexity: 'O(n)', note: 'queues are not for lookup' },
    { op: 'space', complexity: 'O(n)', note: 'ring buffer: O(k), fixed at construction' },
  ],
  useWhen:
    'Work arrives faster (or burstier) than you can process it and arrival order must be preserved — task handoff, buffering, BFS frontiers.',
  dontUseWhen:
    'You need lookup by key (dict), random access (array), or "most important next" (priority queue). Arrival order is the only order a queue knows.',
  stdlib: 'from collections import deque · q.append(x) · q.popleft()',
  bullets: [
    'FIFO = arrival order is the priority.',
    'Ring buffer = a queue in fixed memory: two pointers wrapping with % capacity; true worst-case O(1), zero allocation after construction.',
    'head == tail is ambiguous (empty or full?) — disambiguate with a count, or sacrifice one slot.',
    'The queue is the decoupling primitive: producer and consumer run at different speeds without losing order (Gmail send → SMTP worker).',
  ],
  gotchas: [
    'list.pop(0) is O(n) — it shifts every remaining element. Never back a queue with a plain list.',
    'queue.Queue is a thread-synchronization tool (locks inside); single-threaded code wants collections.deque.',
  ],
};
