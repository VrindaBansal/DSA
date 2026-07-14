import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-lru-design',
    lessonId: 'linked-lists',
    difficulty: 3,
    prompt:
      'An LRU cache needs get(key) and put(key, value) in O(1), evicting the least-recently-used entry when full. Why does the classic design need BOTH a hash map and a doubly-linked list?',
    options: [
      'The hash map finds the node in O(1); the doubly-linked list moves it to the front and evicts the tail in O(1) — each structure covers the other’s weakness',
      'Two structures are used for redundancy in case one corrupts',
      'The list stores keys and the map stores values, halving memory',
      'A singly-linked list would work; doubly is just convention',
    ],
    correctIndex: 0,
    explanation:
      'Recency order is a sequence (list); lookup by key is a map. Neither alone does both in O(1): a map has no order, a list has no O(1) lookup. The map stores key → node pointer; the DLL keeps recency order. Doubly matters because unlinking a node you’re *holding* needs node.prev — a singly list would take O(n) to find the predecessor.',
    distractorNotes: [
      'Correct.',
      'Redundancy is a distributed-systems concern; this is a complexity marriage.',
      'Both structures reference the same entries; memory goes up, not down — that’s the price of two access paths.',
      'The eviction/move-to-front unlink is exactly where singly-linked fails: no O(1) access to the predecessor.',
    ],
  },
  {
    kind: 'code',
    id: 'q-fastslow-code',
    lessonId: 'linked-lists',
    difficulty: 2,
    prompt:
      'Implement middle(head): return the middle node’s value using fast–slow pointers — one pass, O(1) space. For even lengths, return the SECOND middle (the standard convention).',
    starterCode: `class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def build(vals):
    head = None
    for v in reversed(vals):
        head = Node(v, head)
    return head

def middle(head):
    # TODO: slow moves 1 step, fast moves 2; when fast runs out, slow is the middle
    ...
`,
    tests: `def test_odd_length():
    assert middle(build([1, 2, 3, 4, 5])) == 3

def test_even_length_second_middle():
    assert middle(build([1, 2, 3, 4])) == 3, "even length: return the SECOND middle"

def test_single():
    assert middle(build([7])) == 7

def test_two():
    assert middle(build([1, 2])) == 2
`,
    hints: [
      'slow = fast = head. Advance slow by one and fast by two per iteration.',
      'Loop condition is the whole exercise: while fast and fast.next: — check fast BEFORE touching fast.next, or None will bite you.',
      'When the loop exits, slow.val is the answer — fast covered twice the distance, so slow stands at half.',
    ],
    solution: `def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow.val
`,
    complexityCheck: {
      prompt: 'Time and space of fast–slow middle-finding versus "count length, then walk to n//2"?',
      options: [
        'Both are O(n) time and O(1) space — fast–slow just does it in one pass instead of two',
        'Fast–slow is O(log n) because fast halves the list',
        'Fast–slow is O(n) time but O(n) space for the second pointer',
        'Counting first is asymptotically faster',
      ],
      correctIndex: 0,
      explanation:
        'Same complexity class; the win is one traversal instead of two (and it composes into cycle detection, where two-pass counting is impossible because there is no end to count to). A pointer is O(1) space no matter how fast it moves.',
    },
  },
];
