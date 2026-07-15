import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-amort-def',
    lessonId: 'amortized',
    difficulty: 2,
    prompt: 'What does "amortized O(1)" actually promise?',
    options: [
      'Each operation takes O(1) in the worst case',
      'Each operation takes O(1) on random inputs, on average',
      'Any sequence of n operations costs O(n) total — expensive ops are paid for by the cheap ones around them',
      'The operation is O(1) if the compiler optimizes it',
    ],
    correctIndex: 2,
    explanation:
      'Amortized analysis averages over a worst-case *sequence*, not over random inputs. One append might cost O(n) (resize), but any n appends cost O(n) total, so the average per op is O(1) — guaranteed, no probability involved.',
    distractorNotes: [
      'That’s a strictly stronger claim (worst-case O(1)) — a ring buffer gives you that; a dynamic array does not.',
      '"Random inputs" is average-case analysis — a different tool. Amortized bounds hold for adversarial sequences.',
      'Correct.',
      'Complexity is a property of the algorithm, not the toolchain.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-amort-append',
    lessonId: 'amortized',
    difficulty: 2,
    prompt:
      'A dynamic array doubles capacity when full. Total element-copies across n appends starting from capacity 1?',
    options: [
      'About n²/2 — each resize copies everything',
      'About 2n — the copy costs form a geometric series that sums below 2n',
      'About n log n — log n resizes of n elements each',
      'Zero — doubling avoids copying',
    ],
    correctIndex: 1,
    explanation:
      'Resizes copy 1, 2, 4, 8, … n/2, n elements. That geometric series sums to less than 2n. Spread 2n copies over n appends: O(1) amortized each. The doubling is what makes the series geometric — that’s the entire trick.',
    distractorNotes: [
      'n²/2 is what you get if you grow by a FIXED amount (+k) instead of doubling — then resizes are frequent and each copies ~n.',
      'Correct.',
      'There are ~log n resizes, but they copy geometrically growing amounts, not n each — the sum telescopes to O(n), not O(n log n).',
      'Every resize copies the whole array; doubling just makes resizes exponentially rare.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-amort-latency',
    lessonId: 'amortized',
    difficulty: 2,
    prompt:
      'Your game loop appends to a dynamic array every frame and must never exceed 16ms. Why might amortized O(1) not be good enough?',
    options: [
      'Amortized analysis is usually wrong in practice',
      'The one append that triggers a resize still pays O(n) right then — a latency spike the average hides',
      'Doubling wastes memory, which slows the game',
      'It is good enough — amortized O(1) bounds every individual operation',
    ],
    correctIndex: 1,
    explanation:
      'Amortized bounds throughput, not latency. The resize append really does copy the whole array in that frame. Real-time paths want worst-case bounds — preallocate, or use a structure with true O(1) like a ring buffer.',
    distractorNotes: [
      'The math is exactly right; it just answers a throughput question, and you asked a latency one.',
      'Correct.',
      'Memory overhead is real but bounded (≤2×) and not the frame-time problem.',
      'This is precisely what amortized does NOT promise — it explicitly permits rare expensive ops.',
    ],
  },
  {
    kind: 'short',
    id: 'q-amort-short',
    lessonId: 'amortized',
    difficulty: 3,
    prompt:
      'Why does doubling capacity give amortized O(1) appends, while growing capacity by a fixed +16 gives amortized O(n)? Make the totals explicit.',
    rubric: [
      'Doubling: copy costs 1+2+4+…+n form a geometric series, total under 2n, so O(1) per append',
      'Fixed increment: a resize happens every 16 appends and copies the current size, giving totals like 16+32+48+… ≈ n²/32 — quadratic',
      'The difference is resize frequency vs array size: doubling makes resizes exponentially rarer as the array grows; +16 does not',
    ],
    modelAnswer:
      'With doubling, resizes happen at sizes 1, 2, 4, …, n and copy that many elements — a geometric series summing to under 2n, so n appends cost O(n) total, O(1) amortized. With +16, a resize fires every 16 appends and copies the whole current array: 16 + 32 + 48 + … + n ≈ n²/32 total, which is O(n) *per append*. The lesson: growth must be multiplicative so that resize frequency falls as fast as resize cost rises.',
  },
];
