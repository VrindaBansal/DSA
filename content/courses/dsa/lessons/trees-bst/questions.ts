import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-trie-cost',
    lessonId: 'trees-bst',
    difficulty: 2,
    prompt:
      'Autocomplete backends use a trie. Looking up the prefix "mon" in a trie holding one million words costs:',
    options: [
      'O(log n) — trees are logarithmic',
      'O(3) — proportional to the PREFIX length, independent of how many words are stored',
      'O(n) — every word must be checked against the prefix',
      'O(n log n) — lookup plus ranking',
    ],
    correctIndex: 1,
    explanation:
      'A trie walk consumes one character per edge: m→o→n, three steps, whether the dictionary holds a thousand words or a billion. Dictionary size affects breadth (children per node), not path length. That decoupling — cost tied to the query, not the corpus — is why tries own prefix search, and the same idea B-trees apply to disk pages.',
    distractorNotes: [
      'Log n is the signature of *comparison* trees (BSTs); tries don’t compare keys, they spell them.',
      'Correct.',
      'That’s the grep plan — exactly what the trie exists to avoid.',
      'Ranking the completions costs extra, but the *prefix walk* itself is O(len(prefix)).',
    ],
  },
  {
    kind: 'short',
    id: 'q-inorder-short',
    lessonId: 'trees-bst',
    difficulty: 2,
    prompt:
      'Why does in-order traversal (left, node, right) of ANY valid BST emit values in sorted order? Argue from the invariant, not from an example.',
    rubric: [
      'The BST invariant is global: everything in the left subtree < node < everything in the right subtree',
      'In-order visits the entire left subtree before the node and the entire right subtree after — matching the invariant’s ordering exactly',
      'Induction: if in-order sorts each subtree (base: empty/leaf), the concatenation left + node + right is sorted for the whole tree',
    ],
    modelAnswer:
      'Induct on the tree. Base: an empty tree emits nothing, trivially sorted. Step: assume in-order sorts any smaller tree. At a node, in-order emits sorted(left), then node, then sorted(right). The BST invariant guarantees every left value < node < every right value, so the concatenation of the three parts is itself sorted. Hence "in-order = sorted" is not a coincidence of examples — it is the invariant read off in traversal order, and it is why a BST doubles as a sorted iterator (and why an in-order walk is the standard O(n) BST validity check).',
  },
];
