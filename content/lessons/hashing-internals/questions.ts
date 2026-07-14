import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-open-addressing',
    lessonId: 'hashing-internals',
    difficulty: 2,
    prompt:
      'Chaining stores colliding keys in per-bucket lists. Open addressing (what CPython’s dict does) stores everything in the flat table and probes for the next slot. What does open addressing buy, and what does it pay?',
    options: [
      'Buys cache-friendly, pointer-free storage; pays with probe sequences that demand a lower load factor and tombstones on delete',
      'Buys unlimited load factor; pays with slower hashing',
      'Buys sorted iteration order; pays with O(log n) lookup',
      'Nothing — it is strictly worse than chaining',
    ],
    correctIndex: 0,
    explanation:
      'All data lives in one contiguous array — no chain pointers to chase, great cache behavior, which is why CPython chose it. The costs: performance craters as the table fills (probe sequences lengthen), so dicts resize around ⅔ load; and deletion can’t just empty a slot mid-probe-path, hence tombstone markers.',
    distractorNotes: [
      'Correct.',
      'Backwards — open addressing is the scheme that CANNOT exceed load factor 1 and degrades well before it.',
      'Neither scheme sorts anything; Python’s insertion-order iteration comes from a separate dense-entries array, not the probing.',
      'CPython, Rust’s HashMap, and Swift’s Dictionary all chose open addressing — the cache argument wins in practice.',
    ],
  },
  {
    kind: 'short',
    id: 'q-hash-mutable-short',
    lessonId: 'hashing-internals',
    difficulty: 2,
    prompt:
      'Python refuses to let a list be a dict key, but allows a tuple. Explain the invariant that mutable keys would break — walk through what happens to a hypothetical mutated key.',
    rubric: [
      'The bucket/slot is chosen by the key’s hash at insertion time',
      'Mutating the key would change its hash, so lookups would probe the wrong bucket — the entry still exists but is unfindable',
      'Hashable therefore requires the hash to be immutable over the object’s lifetime (tuples of immutables qualify; lists never do)',
    ],
    modelAnswer:
      'A dict files each entry under the bucket dictated by hash(key) at insert time. If you could use a list and then append to it, its hash would change; a later lookup would hash the new state, probe a different bucket, and miss — the entry becomes a ghost: present in memory, unreachable by lookup, still counted in len(). To keep "where it was filed" and "where we look" permanently in agreement, Python requires keys to have lifetime-stable hashes — which is exactly the immutability contract, and why the equal-looking tuple is welcome while the list is not.',
  },
];
