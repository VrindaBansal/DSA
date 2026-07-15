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
      'A cycle: A depends on B depends on A. Kahn’s algorithm ends with fewer than V nodes emitted — the cycle members never reach in-degree 0',
      'Disconnected components: unreachable packages cannot be ordered',
      'Duplicate edges: they double-count dependencies',
      'More edges than nodes: the sort only works on sparse graphs',
    ],
    correctIndex: 0,
    explanation:
      'Topological order exists iff the graph is a DAG. In a cycle, every member waits for another member, so none ever reaches in-degree 0 and Kahn’s queue starves early: emitted count < V is the cycle detector. This is literally the "circular dependency" error your package manager prints.',
    distractorNotes: [
      'Correct.',
      'Disconnected DAGs sort fine — independent components interleave in any order.',
      'Duplicate edges are cosmetic; in-degrees just count them.',
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
      'Popping the cheapest node guarantees its distance is final (no cheaper route can appear later) — provided all edge weights are non-negative',
      'The priority queue is faster than a queue, which compensates for weights',
      'Dijkstra explores fewer nodes than BFS',
      'It doesn’t require any assumption; Dijkstra handles all weights',
    ],
    correctIndex: 0,
    explanation:
      'The greedy proof: when the cheapest frontier node u is popped, any alternative path to u would pass through some frontier node with cost ≥ u’s — and non-negative edges can only add to that. So u is settled. Negative edges break exactly this "can only add" step (a later route could undercut), which is why Bellman-Ford exists. BFS is the special case where all weights are 1 and the priority queue degenerates into a plain queue.',
    distractorNotes: [
      'Correct.',
      'The heap is *slower* per operation (log V vs O(1)) — it buys ordering, not speed.',
      'Same worst case, every node once; the difference is pop order, not pop count.',
      'Negative weights are Dijkstra’s one hard no — the classic trap answer.',
    ],
  },
];
