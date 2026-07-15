import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-bfs-frontier',
    lessonId: 'deques',
    difficulty: 2,
    prompt:
      'BFS explores a graph level by level. Why must its frontier be a queue rather than a stack?',
    options: [
      'A queue is faster than a stack for graph work',
      'FIFO guarantees nodes are expanded in discovery order, so all distance-k nodes are processed before any distance-k+1 node',
      'A stack cannot store graph nodes, only numbers',
      'BFS needs random access to the frontier and queues provide it',
    ],
    correctIndex: 1,
    explanation:
      'The frontier’s discipline IS the traversal order. FIFO expands oldest-discovered first, which sweeps outward one distance layer at a time — that layering is what makes BFS find shortest paths in unweighted graphs. Swap in a stack (LIFO) and the same loop becomes DFS.',
    distractorNotes: [
      'Both are O(1) per operation; speed is not the difference — ordering discipline is.',
      'Correct.',
      'Any container stores anything; contracts differ, not payloads.',
      'Neither structure offers random access, and BFS never needs it — it only pops the front and pushes the back.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-pq-preview',
    lessonId: 'deques',
    difficulty: 2,
    prompt:
      'An ER triage system always treats the most critical patient next, regardless of arrival time. Which structure models this, and what does its “dequeue” cost?',
    options: [
      'A queue — O(1)',
      'A priority queue (binary heap) — O(log n)',
      'A sorted list re-sorted on every arrival — O(1) to serve',
      'A deque — O(1) at either end',
    ],
    correctIndex: 1,
    explanation:
      'When “next” means most-important rather than first-arrived, the contract is a priority queue. A binary heap pays O(log n) to remove the top and repair itself — the price of keeping the extreme element always one step away. Module 7 builds it.',
    distractorNotes: [
      'A queue serves the *oldest* patient — arrival order is exactly the wrong policy for triage.',
      'Correct.',
      'Serving from a sorted list is O(1), but keeping it sorted costs O(n) per arrival (insert position + shift) — the heap beats that split.',
      'A deque gives you the two *ends by position*, not the extreme *by priority*.',
    ],
  },
  {
    kind: 'short',
    id: 'q-deque-short',
    lessonId: 'deques',
    difficulty: 2,
    prompt:
      'Why is deque.appendleft(x) O(1) while list.insert(0, x) is O(n)? Answer in terms of memory layout.',
    rubric: [
      'list is one contiguous array — inserting at index 0 must shift every existing element right',
      'deque is a doubly-linked chain of blocks — the left end has (or allocates) spare slots, so a front insert touches only that block',
      'The layouts trade random access (list O(1)) for cheap ends (deque)',
    ],
    modelAnswer:
      'A list is a single contiguous array, so making room at index 0 means shifting all n elements right — O(n). A deque is a doubly-linked list of fixed-size blocks with spare capacity at both ends; appendleft writes into the leftmost block (allocating a new block occasionally), touching O(1) memory. The trade: the deque gives up O(1) random access in the middle to make both ends O(1).',
  },
  {
    kind: 'code',
    id: 'q-twostacks-code',
    lessonId: 'deques',
    difficulty: 2,
    prompt:
      'Build a FIFO queue out of two LIFO stacks (plain Python lists used only via append/pop). enqueue pushes to inbox; dequeue pours inbox into outbox only when outbox is empty, then pops.',
    starterCode: `class Empty(Exception): pass

class QueueFromStacks:
    def __init__(self):
        self.inbox = []    # newest on top
        self.outbox = []   # oldest on top (reversed)

    def enqueue(self, x):
        # TODO: one push
        ...

    def dequeue(self):
        # TODO: if outbox is empty, pour ALL of inbox into it (pop -> append),
        # which reverses order. Then pop outbox. Raise Empty if both are empty.
        ...
`,
    tests: `def test_fifo():
    q = QueueFromStacks()
    q.enqueue(1); q.enqueue(2); q.enqueue(3)
    assert q.dequeue() == 1
    assert q.dequeue() == 2

def test_interleaved():
    q = QueueFromStacks()
    q.enqueue(1); q.enqueue(2)
    assert q.dequeue() == 1
    q.enqueue(3)
    assert q.dequeue() == 2
    assert q.dequeue() == 3

def test_pour_only_when_outbox_empty():
    q = QueueFromStacks()
    q.enqueue(1); q.enqueue(2)
    q.dequeue()                    # pours: outbox=[2]
    q.enqueue(3)                   # must go to inbox, not disturb outbox
    assert q.outbox == [2], "do not pour while outbox still has items"
    assert q.dequeue() == 2

def test_empty_raises():
    q = QueueFromStacks()
    try:
        q.dequeue()
        assert False, "expected Empty"
    except Empty:
        pass
`,
    hints: [
      'enqueue is literally self.inbox.append(x) — all the cleverness lives in dequeue.',
      'Pour = while self.inbox: self.outbox.append(self.inbox.pop()). Popping reverses order, so outbox ends up oldest-on-top.',
      'Only pour when outbox is empty — pouring early would interleave old and new items and break FIFO.',
    ],
    solution: `class Empty(Exception): pass

class QueueFromStacks:
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())
        if not self.outbox:
            raise Empty
        return self.outbox.pop()
`,
    complexityCheck: {
      prompt:
        'A single dequeue can pour n elements. Why do we still call this queue O(1)?',
      options: [
        'Because each element is moved at most once ever, the total over n operations is O(n) — amortized O(1) per operation',
        'Because Python lists make pouring free',
        'We don’t — dequeue is O(n) and that’s that',
        'Because the pour happens at most once in the queue’s lifetime',
      ],
      correctIndex: 0,
      explanation:
        'Charge each element two moves (one push into inbox, one pour into outbox) plus one pop when its turn comes — a constant per element. Any sequence of n operations costs O(n) total, so O(1) amortized, even though one unlucky dequeue pays for the whole backlog. Worst-case single-op latency is O(n), which is exactly the amortized-vs-worst-case distinction from Module 1.',
    },
  },
];
