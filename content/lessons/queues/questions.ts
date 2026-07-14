import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-fifo-why',
    lessonId: 'queues',
    difficulty: 1,
    prompt:
      'Gmail returns control to you the instant you press Send, even though delivering mail over SMTP can take seconds. What property of a queue makes it the right structure here?',
    options: [
      'It preserves arrival order while letting the producer and consumer run at different speeds',
      'It allows O(1) lookup of any message by id',
      'It keeps messages sorted by recipient so delivery is faster',
      'It compresses messages so the network transfer is cheaper',
    ],
    correctIndex: 0,
    explanation:
      'The queue decouples the producer (the UI thread enqueuing your message) from the consumer (the SMTP worker draining at its own pace), while FIFO ordering guarantees mails go out in the order you sent them. That decoupling-with-order is the whole abstraction.',
    distractorNotes: [
      'This is the right answer.',
      'Tempting because queues are fast — but a queue gives you O(1) at the *ends only*; lookup by key is a dict’s job.',
      'Queues never sort. If you need “most important first,” you want a priority queue, which is a different contract.',
      'Nothing about a queue changes the bytes. This confuses the transport with the buffer in front of it.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-listpop',
    lessonId: 'queues',
    difficulty: 2,
    prompt:
      'You implement a queue as a Python list: enqueue with lst.append(x), dequeue with lst.pop(0). What is the cost of one dequeue on a queue of n items?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'Amortized O(1), worst case O(n)'],
    correctIndex: 2,
    explanation:
      'lst.pop(0) removes index 0, and CPython then memmoves all n−1 remaining elements one slot left to keep the array contiguous. Every single dequeue pays O(n). This is precisely why collections.deque exists.',
    distractorNotes: [
      'pop() from the *end* is O(1); pop(0) is the trap — the front is the expensive end of an array.',
      'Nothing here halves the search space; log n would need a tree-ish structure.',
      'Correct.',
      'Amortized O(1) describes append (occasional resize). pop(0) is O(n) *every time* — there is no cheap common case being averaged.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-ring-full',
    lessonId: 'queues',
    difficulty: 2,
    prompt:
      'In a ring buffer, you observe head == tail. What do you know about the buffer?',
    options: [
      'It is empty',
      'It is full',
      'Nothing yet — it is either empty or full, and you need extra state (e.g. a count) to tell which',
      'head == tail is impossible after the first enqueue',
    ],
    correctIndex: 2,
    explanation:
      'Both states collapse to the same pointer picture: dequeue until empty and head catches tail; enqueue until full and tail wraps around to catch head. The classic fixes are an explicit count, or sacrificing one slot so “full” is tail+1 == head.',
    distractorNotes: [
      'True right after construction, but also the exact picture when the buffer is full — that’s the ambiguity.',
      'Same trap mirrored: full looks identical to empty from the pointers alone.',
      'Correct.',
      'It recurs constantly — every time the buffer drains completely, and every time it fills completely.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-deque-vs-list',
    lessonId: 'queues',
    difficulty: 2,
    prompt:
      'For a sliding-window problem you need to remove from the front and add to the back, thousands of times. Why is collections.deque the right call over list?',
    options: [
      'deque keeps elements sorted as they arrive',
      'deque does O(1) appends and pops at both ends; list pays O(n) at the front',
      'deque uses less memory per element than list',
      'deque is thread-safe, list is not',
    ],
    correctIndex: 1,
    explanation:
      'deque is a doubly-linked list of fixed-size blocks, so both ends are O(1). A list is one contiguous array: the back is cheap, but the front costs a full shift. In a window loop that difference is O(n) vs O(n²) overall.',
    distractorNotes: [
      'No container in this story sorts anything; ordering is arrival order.',
      'Correct.',
      'Backwards, if anything — deque’s block structure carries overhead. You pay a little memory for O(1) ends.',
      'deque’s append/popleft are atomic, which helps, but that’s not why it wins sliding windows — the complexity is.',
    ],
  },
  {
    kind: 'short',
    id: 'q-queue-short',
    lessonId: 'queues',
    difficulty: 2,
    prompt:
      'Your PM asks: “Why does the send button enqueue the email instead of just… sending it?” Give the systems argument in 2–4 sentences.',
    rubric: [
      'Decouples the producer (UI) from the consumer (delivery worker) so they can run at different speeds',
      'The UI can return immediately instead of blocking on slow network I/O (SMTP)',
      'The queue absorbs bursts / retries safely because work is persisted in order',
    ],
    modelAnswer:
      'Sending over SMTP is slow and can fail, and the UI must not block on it. Enqueuing makes the send a fast local write; a worker drains the queue at its own pace, in order. The queue also absorbs bursts and gives you a natural place to retry failed deliveries without losing or reordering mail.',
  },
  {
    kind: 'short',
    id: 'q-ring-short',
    lessonId: 'queues',
    difficulty: 3,
    prompt:
      'Explain why a ring buffer gives O(1) enqueue AND O(1) dequeue with zero allocation after construction — and name the one bookkeeping problem this design creates.',
    rubric: [
      'Fixed-size array is allocated once; slots are reused by wrapping indices with modulo',
      'Both operations only move one pointer and touch one slot — no shifting, no resizing',
      'head == tail is ambiguous between empty and full; needs a count or a sacrificed slot',
    ],
    modelAnswer:
      'The buffer is one array allocated up front. enqueue writes at tail and advances it mod capacity; dequeue reads at head and advances it mod capacity — one slot touched, one pointer moved, never a shift or a resize, so both are O(1) and allocation-free. The price is that head == tail no longer tells you the state: it looks the same empty and full, so you track a count (or keep one slot permanently empty) to disambiguate.',
  },
  {
    kind: 'code',
    id: 'q-ring-code',
    lessonId: 'queues',
    difficulty: 2,
    prompt:
      'Implement enqueue and dequeue on the ring buffer skeleton. Fixed capacity, wrap with modulo, raise Full/Empty, keep both operations O(1).',
    starterCode: `class Full(Exception): pass
class Empty(Exception): pass

class RingBuffer:
    def __init__(self, k):
        self.buf = [None] * k
        self.head = 0    # next slot to dequeue from
        self.tail = 0    # next free slot to enqueue into
        self.count = 0   # disambiguates full vs empty

    def enqueue(self, x):
        # TODO: raise Full when full; write at tail; advance tail (wrap!); bump count
        ...

    def dequeue(self):
        # TODO: raise Empty when empty; read at head; advance head (wrap!); drop count
        # return the dequeued value
        ...
`,
    tests: `def test_fifo_order():
    q = RingBuffer(3)
    q.enqueue(1); q.enqueue(2); q.enqueue(3)
    assert q.dequeue() == 1, "first in must be first out"
    assert q.dequeue() == 2

def test_wraps_around():
    q = RingBuffer(3)
    for x in [1, 2, 3]:
        q.enqueue(x)
    q.dequeue(); q.dequeue()
    q.enqueue(4); q.enqueue(5)   # tail must wrap to reuse freed slots
    assert [q.dequeue(), q.dequeue(), q.dequeue()] == [3, 4, 5]

def test_full_raises():
    q = RingBuffer(2)
    q.enqueue(1); q.enqueue(2)
    try:
        q.enqueue(3)
        assert False, "expected Full to be raised"
    except Full:
        pass

def test_empty_raises():
    q = RingBuffer(2)
    try:
        q.dequeue()
        assert False, "expected Empty to be raised"
    except Empty:
        pass

def test_fixed_memory():
    q = RingBuffer(4)
    for i in range(100):
        q.enqueue(i)
        assert q.dequeue() == i
    assert len(q.buf) == 4, "buffer must never grow"
`,
    hints: [
      'Full is when count == len(self.buf). Do NOT compare head and tail — they are equal both when empty and when full.',
      'Advance a pointer with modular arithmetic so it wraps: self.tail = (self.tail + 1) % len(self.buf).',
      'enqueue: check full → buf[tail] = x → tail = (tail+1) % k → count += 1. dequeue mirrors it at head: save buf[head], clear the slot, advance, decrement, return the saved value.',
    ],
    solution: `class Full(Exception): pass
class Empty(Exception): pass

class RingBuffer:
    def __init__(self, k):
        self.buf = [None] * k
        self.head = 0
        self.tail = 0
        self.count = 0

    def enqueue(self, x):
        if self.count == len(self.buf):
            raise Full
        self.buf[self.tail] = x
        self.tail = (self.tail + 1) % len(self.buf)
        self.count += 1

    def dequeue(self):
        if self.count == 0:
            raise Empty
        x = self.buf[self.head]
        self.buf[self.head] = None
        self.head = (self.head + 1) % len(self.buf)
        self.count -= 1
        return x
`,
    complexityCheck: {
      prompt:
        'You just implemented enqueue and dequeue. What is the time complexity of each operation?',
      options: [
        'O(1) worst case — one slot touched, one pointer moved, never a resize',
        'Amortized O(1) — occasional resizes cost O(n)',
        'O(n) — the buffer must shift elements on dequeue',
        'O(log n) — the pointer wrap is a binary operation',
      ],
      correctIndex: 0,
      explanation:
        'Fixed capacity is the point: no resize can ever happen, so this is true worst-case O(1) — stronger than a dynamic array’s amortized O(1) append. (If you answered “amortized,” you were thinking of the growable structure this one deliberately is not.)',
    },
  },
];
