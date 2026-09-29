import type { Question } from '@/lib/types';

// Practice questions for "Quadratics & special products" — two per idea, in
// lesson order.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

export const QUESTIONS: Question[] = [
  // --- FOIL ---------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-quad-expand',
    lessonId: 'gre-quadratics',
    difficulty: 1,
    prompt: 'Which of the following is equal to (2x − 3)(x + 4)?',
    options: ['2x² + 5x − 12', '2x² − 5x − 12', '2x² + 11x − 12', '2x² − 12', '3x² + 5x − 12'],
    correctIndex: 0,
    explanation:
      '**First:** 2x · x = 2x². **Outer:** 2x · 4 = 8x. **Inner:** −3 · x = −3x. **Last:** −3 · 4 = −12.\n**Combine:** 2x² + 8x − 3x − 12 = **2x² + 5x − 12**.\nCheck with x = 1: (−1)(5) = −5, and 2 + 5 − 12 = −5 ✓.',
    distractorNotes: [
      'Correct.',
      'The middle term’s sign is wrong: 8x − 3x = +5x.',
      '8x + 3x adds the inner term instead of subtracting it.',
      'The outer and inner terms were dropped.',
      'x · 2x is 2x², not 3x².',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-quad-expand-qc',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'Compare Quantity A and Quantity B.',
    stimulus: { quantities: { a: '(x + 1)²', b: 'x² + 1' } },
    options: QC,
    correctIndex: 3,
    explanation:
      '**Step 1:** Expand A: (x + 1)² = x² + 2x + 1.\n**Step 2:** Subtract x² + 1 from both quantities: A becomes 2x and B becomes 0.\n**Step 3:** 2x can be positive (x = 1), zero (x = 0), or negative (x = −1).\n**Answer:** cannot be determined. (No condition on x was given.)',
    distractorNotes: [
      'True only when x > 0.',
      'True only when x < 0.',
      'True only when x = 0.',
      'Correct — it depends on the sign of x.',
    ],
  },
  // --- factoring -----------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-quad-factor',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'Which of the following are solutions of x² + 2x − 15 = 0?\n\nIndicate all such values.',
    options: ['−5', '−3', '3', '5', '15'],
    correctIndices: [0, 2],
    explanation:
      '**Step 1:** Find two numbers that multiply to −15 and add to +2: 5 and −3.\n**Step 2:** Factor: (x + 5)(x − 3) = 0.\n**Step 3:** Each factor to zero: x = −5 or x = 3.\nCheck x = 3: 9 + 6 − 15 = 0 ✓.',
    distractorNotes: [
      '✓ (x + 5) = 0.',
      '✗ The signs are reversed: the factors are (x + 5)(x − 3).',
      '✓ (x − 3) = 0.',
      '✗ The signs are reversed.',
      '✗ 15 is the constant term, not a root.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-quad-positive-root',
    lessonId: 'gre-quadratics',
    difficulty: 1,
    prompt: 'If x > 0 and x² + 3x − 28 = 0, what is the value of x?',
    answer: 4,
    answerDisplay: '4',
    explanation:
      '**Step 1:** Two numbers that multiply to −28 and add to +3: 7 and −4.\n**Step 2:** (x + 7)(x − 4) = 0, so x = −7 or x = 4.\n**Step 3:** x > 0, so x = **4**. Check: 16 + 12 − 28 = 0 ✓.',
  },
  // --- = 0 first; ± ----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-quad-divide',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'What are all the solutions of 3x² = 12x?',
    options: ['x = 4 only', 'x = 0 only', 'x = 0 or x = 4', 'x = −4 or x = 4', 'x = 0 or x = −4'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Move everything to one side: 3x² − 12x = 0.\n**Step 2:** Factor out 3x: 3x(x − 4) = 0.\n**Step 3:** 3x = 0 → x = 0; x − 4 = 0 → x = 4.\n**Answer:** **x = 0 or x = 4**.',
    distractorNotes: [
      'Dividing both sides by x throws away x = 0.',
      'x = 4 also works: 3(16) = 48 = 12(4).',
      'Correct.',
      'x = −4 gives 48 = −48 — no.',
      'The nonzero solution is +4, not −4.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-quad-square-root',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'If (x + 1)² = 16, what are all the possible values of x?',
    options: ['3 only', '−5 only', '3 or −5', '−3 or 5', '15 only'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Undo the square with ±: x + 1 = 4 or x + 1 = −4.\n**Step 2:** x = 3 or x = −5.\nCheck: (3 + 1)² = 16 ✓ and (−5 + 1)² = (−4)² = 16 ✓.',
    distractorNotes: [
      'You forgot the negative square root, −4.',
      'You forgot the positive square root, 4.',
      'Correct.',
      'Both signs are flipped: x + 1 = ±4 gives 3 and −5.',
      'x + 1 = 16 forgets to take the square root.',
    ],
  },
  // --- special products ---------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-quad-identity',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'If a − b = 4 and ab = 6, what is the value of a² + b²?',
    options: ['10', '16', '22', '28', '40'],
    correctIndex: 3,
    explanation:
      '**Step 1:** The identity with a − b is (a − b)² = a² − 2ab + b².\n**Step 2:** Plug in: 4² = a² + b² − 2(6), so 16 = a² + b² − 12.\n**Step 3:** a² + b² = **28**.',
    distractorNotes: [
      '10 is (a − b) + ab.',
      '16 is (a − b)² — you still need to add back 2ab.',
      '22 adds ab only once.',
      'Correct.',
      '40 would come from adding 2ab twice.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-quad-diff-squares',
    lessonId: 'gre-quadratics',
    difficulty: 1,
    prompt: 'If x + y = 12 and x − y = 3, what is the value of x² − y²?',
    answer: 36,
    answerDisplay: '36',
    explanation:
      '**Step 1:** Difference of squares: x² − y² = (x + y)(x − y).\n**Step 2:** 12 × 3 = **36**.\nNo need to find x and y (they’re 7.5 and 4.5).',
  },
  // --- algebraic fractions -----------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-quad-simplify',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'For x ≠ 2, (x² + 3x − 10)/(x − 2) is equal to which of the following?',
    options: ['x + 5', 'x − 5', 'x + 3', 'x² + 5', '3x + 5'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Factor the top: two numbers that multiply to −10 and add to 3 are 5 and −2, so x² + 3x − 10 = (x + 5)(x − 2).\n**Step 2:** Cancel the (x − 2): **x + 5**.\nCheck with x = 0: (−10)/(−2) = 5, and 0 + 5 = 5 ✓.',
    distractorNotes: [
      'Correct.',
      'The factor is (x + 5), not (x − 5).',
      'You can’t cancel terms that are added — factor first.',
      'Only whole factors cancel.',
      'No valid step gives 3x + 5.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-quad-simplify-solve',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'If x ≠ −4 and (x² − 16)/(x + 4) = 7, what is the value of x?',
    answer: 11,
    answerDisplay: '11',
    explanation:
      '**Step 1:** Difference of squares: x² − 16 = (x + 4)(x − 4).\n**Step 2:** Cancel (x + 4): the equation becomes x − 4 = 7.\n**Step 3:** x = **11**. Check: (121 − 16)/15 = 105/15 = 7 ✓.',
  },
];
