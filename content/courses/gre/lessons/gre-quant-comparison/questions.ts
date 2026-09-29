import type { Question } from '@/lib/types';

// Practice questions for "Quantitative comparison" — two per idea, in lesson order.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

export const QUESTIONS: Question[] = [
  // --- plain numbers -----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-qc-fixed',
    lessonId: 'gre-quant-comparison',
    difficulty: 1,
    prompt: 'Compare Quantity A and Quantity B.',
    stimulus: { quantities: { a: '2¹⁰', b: '10³' } },
    options: QC,
    correctIndex: 0,
    explanation:
      '**Step 1:** No variables, so D is impossible.\n**Step 2:** 2¹⁰ = 1,024 and 10³ = 1,000.\n**Answer:** 1,024 > 1,000, so **Quantity A is greater**.',
    distractorNotes: [
      'Correct — 1,024 > 1,000.',
      '1,000 is the smaller one.',
      'Close (that’s why 2¹⁰ ≈ 10³ is a handy estimate), but not equal.',
      'Impossible here — there are no unknowns.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-qc-roots',
    lessonId: 'gre-quant-comparison',
    difficulty: 2,
    prompt: 'Compare Quantity A and Quantity B.',
    stimulus: { quantities: { a: '√50 + √2', b: '√72' } },
    options: QC,
    correctIndex: 2,
    explanation:
      '**Step 1:** Simplify each root by pulling out a perfect square: √50 = √(25 × 2) = 5√2, and √72 = √(36 × 2) = 6√2.\n**Step 2:** A = 5√2 + √2 = 6√2.\n**Answer:** both are 6√2, so **the two quantities are equal**.',
    distractorNotes: [
      'Simplify first: both sides are 6√2.',
      'Roots don’t add like √50 + √2 = √52 — simplify them first.',
      'Correct.',
      'There are no variables, so D is impossible.',
    ],
  },
  // --- simplify both sides -------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-qc-cancel',
    lessonId: 'gre-quant-comparison',
    difficulty: 1,
    prompt: 'Compare Quantity A and Quantity B.',
    stimulus: { quantities: { a: '3x − 2(x − 4)', b: 'x + 7' } },
    options: QC,
    correctIndex: 0,
    explanation:
      '**Step 1:** Simplify A: 3x − 2x + 8 = x + 8.\n**Step 2:** Subtract x from both sides: A becomes 8, B becomes 7.\n**Answer:** 8 > 7 for every x, so **Quantity A is greater**.',
    distractorNotes: [
      'Correct.',
      'Watch the sign: −2(x − 4) = −2x + 8, not −2x − 8.',
      'A simplifies to x + 8, which is 1 more than B.',
      'The x’s cancel, so the value of x doesn’t matter.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-qc-simplify',
    lessonId: 'gre-quant-comparison',
    difficulty: 3,
    prompt: 'k is a positive integer.\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'k/(k + 1)', b: '(k + 1)/(k + 2)' } },
    options: QC,
    correctIndex: 1,
    explanation:
      '**Step 1:** Both denominators are positive, so you can cross-multiply without flipping anything: compare k(k + 2) with (k + 1)².\n**Step 2:** k(k + 2) = k² + 2k, and (k + 1)² = k² + 2k + 1.\n**Step 3:** The second is always 1 bigger, so **Quantity B is greater**. (Test k = 1: ½ vs. ⅔ ✓.)',
    distractorNotes: [
      'Test k = 1: ½ is less than ⅔.',
      'Correct.',
      'After cross-multiplying they differ by exactly 1.',
      'Cross-multiplying shows B wins for every positive k.',
    ],
  },
  // --- test numbers ---------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-qc-zones',
    lessonId: 'gre-quant-comparison',
    difficulty: 2,
    prompt: 'x < 0\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'x³', b: 'x' } },
    options: QC,
    correctIndex: 3,
    explanation:
      '**Test 1 — x = −2:** A = −8, B = −2 → B is bigger.\n**Test 2 — x = −½ (a negative fraction):** A = −⅛, B = −½ → A is bigger (−0.125 > −0.5).\n**Answer:** two allowed values disagree, so **D**. The negative-fraction zone is the one people forget.',
    distractorNotes: [
      'True only for x between −1 and 0.',
      'True only for x less than −1.',
      'True only at x = −1.',
      'Correct.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-qc-sign',
    lessonId: 'gre-quant-comparison',
    difficulty: 2,
    prompt: '−1 < x < 0\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'x²', b: 'x' } },
    options: QC,
    correctIndex: 0,
    explanation:
      '**Test:** x = −½: A = ¼, B = −½ → A bigger. x = −0.9: A = 0.81, B = −0.9 → A bigger.\n**The reason:** x is negative, but x² (a square) is positive. Any positive number beats any negative number.\n**Answer:** **Quantity A is greater**.',
    distractorNotes: [
      'Correct.',
      'x is negative here, and x² is positive.',
      'x² = x only when x is 0 or 1 — neither is allowed.',
      'Every allowed x is negative, so x² is always positive and bigger.',
    ],
  },
  // --- hidden cases -------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-qc-square',
    lessonId: 'gre-quant-comparison',
    difficulty: 2,
    prompt: 'y² = 49\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'y', b: '7' } },
    options: QC,
    correctIndex: 3,
    explanation:
      '**Step 1:** y² = 49 has two solutions: y = 7 or y = −7.\n**Step 2:** y = 7 → equal. y = −7 → B is bigger.\n**Answer:** different outcomes, so **D**.',
    distractorNotes: [
      'y is never bigger than 7 here.',
      'Only when y = −7.',
      'Only when y = 7 — the classic trap.',
      'Correct.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-qc-hidden',
    lessonId: 'gre-quant-comparison',
    difficulty: 3,
    prompt: 'a and b are integers, and ab = 12.\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'a + b', b: '7' } },
    options: QC,
    correctIndex: 3,
    explanation:
      '**Test 1 — a = 3, b = 4:** a + b = 7 → equal.\n**Test 2 — a = 2, b = 6:** a + b = 8 → A is bigger.\n**Test 3 — a = −3, b = −4** (negatives also multiply to 12): a + b = −7 → B is bigger.\n**Answer:** the relationship changes, so **D**.',
    distractorNotes: [
      'Not always — a = 3, b = 4 gives exactly 7.',
      'Only when both are negative, like −3 and −4.',
      'Only for 3 and 4 — other pairs multiply to 12 too.',
      'Correct.',
    ],
  },
  // --- word problems -----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-qc-points',
    lessonId: 'gre-quant-comparison',
    difficulty: 2,
    prompt: 'A town’s unemployment rate rose from 4% to 5%.\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'The percent increase in the unemployment rate', b: '1%' } },
    options: QC,
    correctIndex: 0,
    explanation:
      '**Step 1:** The rate went up by 5 − 4 = 1 **percentage point**.\n**Step 2:** The **percent increase** is the change over the start: 1 ÷ 4 = 25%.\n**Answer:** 25% > 1%, so **Quantity A is greater**.',
    distractorNotes: [
      'Correct.',
      'That mixes up percentage points with percent change.',
      'A 1-point change is not a 1% change.',
      'All the numbers are given.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-qc-average',
    lessonId: 'gre-quant-comparison',
    difficulty: 2,
    prompt: 'The average (arithmetic mean) of x and y is 20, and x > 25.\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'y', b: '15' } },
    options: QC,
    correctIndex: 1,
    explanation:
      '**Step 1:** Average 20 means x + y = 40, so y = 40 − x.\n**Step 2:** x is more than 25, so y is less than 40 − 25 = 15.\n**Answer:** y < 15 always, so **Quantity B is greater**. (Test: x = 26 → y = 14; x = 30 → y = 10.)',
    distractorNotes: [
      'When x goes up, y must go down to keep the sum at 40.',
      'Correct.',
      'y = 15 only when x = 25, and x must be more than 25.',
      'The constraint fixes the direction: y is always below 15.',
    ],
  },
];
