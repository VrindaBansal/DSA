import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'q-space-def',
    lessonId: 'space-complexity',
    difficulty: 1,
    prompt:
      'reversed = list(reversed(arr)) vs arr.reverse(). In space-complexity terms, what separates them?',
    options: [
      'Nothing — both are O(n) because the array has n elements',
      'The first allocates O(n) auxiliary space; the second reverses in place with O(1) auxiliary',
      'The second is O(n²) because swaps are expensive',
      'The first is faster, so it uses less space',
    ],
    correctIndex: 1,
    explanation:
      'Space complexity conventionally counts *auxiliary* space — memory beyond the input itself. A copy is Θ(n) auxiliary; an in-place reverse uses two indices and a temp: O(1). Interviewers who ask "can you do it in O(1) space" mean auxiliary.',
    distractorNotes: [
      'The input doesn’t count against you — otherwise every algorithm would be Ω(n) space and the measure would be useless.',
      'Correct.',
      'Swapping is O(1) each, n/2 swaps total — that’s time, and linear anyway.',
      'Time and space are separate ledgers; you can’t pay one with the other (though you often trade between them).',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-space-recursion',
    lessonId: 'space-complexity',
    difficulty: 2,
    prompt:
      'A recursive function sums a linked list of length n, no allocations anywhere. Its space complexity is:',
    options: [
      'O(1) — it allocates nothing',
      'O(n) — every unfinished call sits on the call stack',
      'O(log n) — recursion always logs',
      'O(n²) — each frame copies the list',
    ],
    correctIndex: 1,
    explanation:
      'Each recursive call pushes a stack frame that lives until its child returns; a linear chain means n simultaneous frames. The call stack is memory — recursion depth IS space complexity. (It’s also why deep recursion hits Python’s 1000-frame limit.)',
    distractorNotes: [
      'The heap is quiet, but the *stack* grows to depth n — frames are allocations too.',
      'Correct.',
      'Log-depth needs the problem to *halve* per call (like binary search or balanced-tree walks); walking a list decrements by 1.',
      'Frames hold a pointer each, not a copy — O(1) per frame, n frames.',
    ],
  },
  {
    kind: 'mcq',
    id: 'q-space-sorts',
    lessonId: 'space-complexity',
    difficulty: 2,
    prompt: 'Auxiliary space of classic merge sort vs in-place quicksort?',
    options: [
      'Both O(1) — sorting rearranges, it doesn’t allocate',
      'Merge O(n) for the merge buffer; quicksort O(log n) expected for its recursion stack',
      'Both O(n) — recursion always costs linear space',
      'Merge O(log n), quicksort O(n) — merge is the frugal one',
    ],
    correctIndex: 1,
    explanation:
      'Merging two runs needs a scratch buffer proportional to the run — Θ(n) at top level. Quicksort partitions in place; its only space is the recursion stack, O(log n) deep on balanced splits (O(n) worst case on degenerate pivots — the same degeneration the sorting race shows).',
    distractorNotes: [
      'Merge fundamentally cannot interleave two runs in place without extra memory (in-place merge exists but is famously impractical).',
      'Correct.',
      'Depth depends on how fast the problem shrinks: halving → log, decrement → linear.',
      'Backwards: merge carries the buffer, quicksort is the in-place one.',
    ],
  },
  {
    kind: 'short',
    id: 'q-space-short',
    lessonId: 'space-complexity',
    difficulty: 2,
    prompt:
      'Your teammate says "my function is O(1) space — I only create two variables." It recurses to depth n. Correct them precisely.',
    rubric: [
      'Explicit allocations are O(1), but each recursive call adds a stack frame',
      'At maximum depth, n frames coexist, so auxiliary space is O(n)',
      'Space complexity counts peak simultaneous memory, wherever it lives (stack or heap)',
    ],
    modelAnswer:
      'The two variables are O(1) per call, but the function is n calls deep before anything returns — n stack frames exist simultaneously, each holding locals and a return address. Space complexity measures peak simultaneous memory including the call stack, so the function is O(n) space. Converting to an iterative loop (or tail-call form in languages that eliminate it — Python does not) would make it genuinely O(1).',
  },
];
