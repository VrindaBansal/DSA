import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-topo-cycle',
    lessonId: 'graphs-traversal',
    difficulty: 2,
    prompt:
      'npm needs an install order where every package comes after its dependencies — a topological sort. What input property makes this impossible, and how does Kahn’s algorithm report it?',
    options: [
      'Duplicate edges; they double-count dependencies, so Kahn’s in-degrees never balance',
      'Disconnected components; Kahn’s algorithm can’t reach them, so it stops with an error',
      'A cycle; Kahn’s algorithm emits fewer than V nodes, as cycle members never hit in-degree 0',
      'More edges than nodes; Kahn’s algorithm only works on sparse graphs, so it loops forever',
    ],
    correctIndex: 2,
    explanation:
      'Topological order exists iff the graph is a DAG. In a cycle, every member waits for another member, so none ever reaches in-degree 0 and Kahn’s queue starves early: emitted count < V is the cycle detector. This is literally the "circular dependency" error your package manager prints.',
    distractorNotes: [
      'Duplicate edges are cosmetic; in-degrees just count them.',
      'Disconnected DAGs sort fine — independent components interleave in any order.',
      'Correct.',
      'Density is a performance concern, never a correctness one — O(V+E) handles both.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-dijkstra-frontier',
    lessonId: 'graphs-traversal',
    difficulty: 3,
    prompt:
      'BFS finds shortest paths by popping the OLDEST frontier node. Dijkstra handles weighted graphs by popping the CHEAPEST. Why does that single change restore correctness — and what assumption does Dijkstra still require?',
    options: [
      'Dijkstra explores fewer nodes than BFS, so it never reaches the wrong paths at all',
      'A priority queue is faster than a queue, which makes up for the cost of the weights',
      'The cheapest popped node’s distance is final, as long as no edge weight is negative',
      'It needs no assumption; popping the cheapest node works for any weights, even negative',
    ],
    correctIndex: 2,
    explanation:
      'The greedy proof: when the cheapest frontier node u is popped, any alternative path to u would pass through some frontier node with cost ≥ u’s — and non-negative edges can only add to that. So u is settled. Negative edges break exactly this "can only add" step (a later route could undercut), which is why Bellman-Ford exists. BFS is the special case where all weights are 1 and the priority queue degenerates into a plain queue.',
    distractorNotes: [
      'Same worst case, every node once; the difference is pop order, not pop count.',
      'The heap is *slower* per operation (log V vs O(1)) — it buys ordering, not speed.',
      'Correct.',
      'Negative weights are Dijkstra’s one hard no — the classic trap answer.',
    ],
  },
];
