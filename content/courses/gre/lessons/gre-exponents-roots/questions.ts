import type { Question } from '@/lib/types';

// Practice questions for "Exponents & roots" — two per idea, in lesson order.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

export const QUESTIONS: Question[] = [
  // --- the rules ---------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-exp-rules',
    lessonId: 'gre-exponents-roots',
    difficulty: 1,
    prompt: 'For all x ≠ 0, (x³)² · x⁴ ÷ x⁵ is equal to which of the following?',
    options: ['x⁴', 'x⁵', 'x⁸', 'x¹⁰', 'x¹⁹'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Power of a power — multiply: (x³)² = x⁶.\n**Step 2:** Multiply same base — add: x⁶ · x⁴ = x¹⁰.\n**Step 3:** Divide same base — subtract: x¹⁰ ÷ x⁵ = x⁵.\n**Answer:** **x⁵**.',
    distractorNotes: [
      'This treats (x³)² as x⁵ (adding 3 + 2). A power of a power multiplies.',
      'Correct: 6 + 4 − 5 = 5.',
      'This treats (x³)² as x⁹ (3 squared). Multiply the exponents: 3 × 2 = 6.',
      'You stopped before dividing by x⁵.',
      'This multiplies x⁶ · x⁴ into x²⁴. Multiplying powers adds exponents.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-exp-product',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'Which of the following is equal to (3a²b)³?',
    options: ['3a⁶b³', '9a⁶b³', '27a⁵b³', '27a⁶b³', '27a⁶b'],
    correctIndex: 3,
    explanation:
      'The cube goes to every factor inside the parentheses.\n**Step 1:** 3³ = 27.\n**Step 2:** (a²)³ = a⁶ (multiply exponents).\n**Step 3:** b³.\n**Answer:** **27a⁶b³**.',
    distractorNotes: [
      'The 3 in front must be cubed too.',
      '3 was squared instead of cubed: 3³ = 27.',
      '(a²)³ multiplies exponents: a⁶, not a⁵.',
      'Correct.',
      'b must be cubed as well.',
    ],
  },
  // --- zero and negative exponents -----------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-exp-negative',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'What is the value of (1/3)⁻² + 3⁰?',
    options: ['−8', '1/9', '10/9', '9', '10'],
    correctIndex: 4,
    explanation:
      '**Step 1:** A negative exponent means flip: (1/3)⁻² = 3² = 9.\n**Step 2:** Anything nonzero to the zero power is 1: 3⁰ = 1.\n**Step 3:** 9 + 1 = **10**.',
    distractorNotes: [
      'A negative exponent doesn’t make a number negative — it flips it.',
      '(1/3)² is 1/9, but the exponent is −2, so flip first: 3² = 9.',
      'That’s (1/3)² + 1 — you forgot to flip.',
      'You dropped 3⁰, which is 1, not 0.',
      'Correct.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-exp-negative-qc',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'Compare Quantity A and Quantity B.',
    stimulus: { quantities: { a: '2⁻²', b: '(−2)⁻²' } },
    options: QC,
    correctIndex: 2,
    explanation:
      '**Quantity A:** 2⁻² = 1/2² = 1/4.\n**Quantity B:** (−2)⁻² = 1/(−2)² = 1/4, because (−2)² = (−2)(−2) = 4 is positive.\nThe quantities are **equal**. An even power erases a negative sign; the negative exponent only flips.',
    distractorNotes: [
      'Both equal 1/4.',
      'The negative base disappears under an even power: (−2)² = 4.',
      'Correct — both are 1/4.',
      'There are no unknowns, so the comparison is fixed.',
    ],
  },
  // --- same base -----------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-exp-base',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'If 9^(x − 1) = 27^x, what is the value of x?',
    answer: -2,
    answerDisplay: '−2',
    explanation:
      '**Step 1:** Rewrite with base 3: 9^(x − 1) = (3²)^(x − 1) = 3^(2x − 2), and 27^x = (3³)^x = 3^(3x).\n**Step 2:** Set the exponents equal: 2x − 2 = 3x.\n**Step 3:** Subtract 2x: −2 = x.\n**Answer:** **−2**. Check: 9⁻³ = 1/729 and 27⁻² = 1/729 ✓.',
  },
  {
    kind: 'numeric',
    id: 'gre-exp-base-two',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'If 3^(2n) = 81^(n − 1), what is the value of n?',
    answer: 2,
    answerDisplay: '2',
    explanation:
      '**Step 1:** 81 = 3⁴, so 81^(n − 1) = 3^(4(n − 1)) = 3^(4n − 4).\n**Step 2:** Set the exponents equal: 2n = 4n − 4.\n**Step 3:** Subtract 2n and add 4: 4 = 2n, so n = **2**.\nCheck: 3⁴ = 81 and 81¹ = 81 ✓.',
  },
  // --- adding identical powers -------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-exp-add-same',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: '4¹⁰ + 4¹⁰ + 4¹⁰ + 4¹⁰ =',
    options: ['4¹¹', '4⁴⁰', '16¹⁰', '4¹⁴', '16⁴⁰'],
    correctIndex: 0,
    explanation:
      'Four identical copies of 4¹⁰ make 4 × 4¹⁰.\n**Step 1:** 4 × 4¹⁰ = 4¹ × 4¹⁰.\n**Step 2:** Same base multiplied — add exponents: 4¹¹.\n**Answer:** **4¹¹**.',
    distractorNotes: [
      'Correct.',
      'Adding powers doesn’t add exponents — only multiplying does.',
      '16¹⁰ = (4²)¹⁰ = 4²⁰, far too big.',
      'The 4 copies multiply the power by 4 (one more exponent), not add 4 to the exponent.',
      'Much too big.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-exp-factor',
    lessonId: 'gre-exponents-roots',
    difficulty: 3,
    prompt: 'If 5^(n + 1) − 5^n = 100, what is the value of n?',
    answer: 2,
    answerDisplay: '2',
    explanation:
      '**Step 1:** Rewrite the bigger power: 5^(n + 1) = 5 · 5^n.\n**Step 2:** Factor out 5^n: 5 · 5^n − 1 · 5^n = 4 · 5^n.\n**Step 3:** 4 · 5^n = 100, so 5^n = 25 = 5².\n**Answer:** n = **2**. Check: 125 − 25 = 100 ✓.',
  },
  // --- roots -----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-exp-root',
    lessonId: 'gre-exponents-roots',
    difficulty: 1,
    prompt: 'Which of the following is equal to √98?',
    options: ['7√2', '2√7', '49√2', '14', '9.8'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Find the biggest perfect square inside 98: 98 = 49 × 2.\n**Step 2:** Split the root over the multiplication: √98 = √49 × √2.\n**Step 3:** √49 = 7, so √98 = **7√2** (about 9.9).',
    distractorNotes: [
      'Correct.',
      'Inside and outside swapped: 2√7 = √28.',
      'You pulled out 49 instead of √49 = 7.',
      '14² = 196, not 98.',
      '9.8 is 98 ÷ 10, not √98.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-exp-root-sum',
    lessonId: 'gre-exponents-roots',
    difficulty: 3,
    prompt: 'What is the value of (√12 + √27)²?',
    options: ['39', '45', '75', '5√3', '225'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Simplify each root: √12 = √(4 × 3) = 2√3 and √27 = √(9 × 3) = 3√3.\n**Step 2:** They match now, so add: 2√3 + 3√3 = 5√3.\n**Step 3:** Square: (5√3)² = 25 × 3 = **75**.',
    distractorNotes: [
      '12 + 27 = 39 squares each root separately — but (a + b)² isn’t a² + b².',
      'No step gives 45.',
      'Correct.',
      '5√3 is the sum before squaring.',
      '15² = 225 comes from squaring 5√3 as if it were 15.',
    ],
  },
  // --- between 0 and 1 ---------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-exp-fraction',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'If 0 < x < 1, which of the following is greatest?',
    options: ['x', 'x²', 'x³', '√x', 'x/2'],
    correctIndex: 3,
    explanation:
      'Pick a number between 0 and 1, say x = 1/4.\nx = 0.25\nx² = 0.0625\nx³ ≈ 0.016\n√x = 0.5\nx/2 = 0.125\nBetween 0 and 1, roots make numbers bigger and powers make them smaller, so **√x** is greatest.',
    distractorNotes: [
      'Bigger than its powers, but smaller than its root.',
      'Squaring a fraction shrinks it.',
      'Cubing shrinks it even more.',
      'Correct.',
      'Halving shrinks it.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-exp-fraction-qc',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: '−1 < x < 0',
    stimulus: { quantities: { a: 'x²', b: 'x³' } },
    options: QC,
    correctIndex: 0,
    explanation:
      '**Step 1:** Try x = −0.5: x² = 0.25 (positive) and x³ = −0.125 (negative).\n**Step 2:** This holds for every x in the range: an even power of a negative number is positive, an odd power is negative.\n**Answer:** Quantity A is always greater.',
    distractorNotes: [
      'Correct — positive beats negative.',
      'x³ is negative, so it can’t be bigger than the positive x².',
      'They are equal only at 0 or 1, which are outside the range.',
      'Every allowed x gives the same result.',
    ],
  },
  // --- units digits --------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-exp-units',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'What is the units digit of 3⁵⁰?',
    answer: 9,
    answerDisplay: '9',
    explanation:
      '**Step 1:** Powers of 3 end in 3, 9, 7, 1, then repeat — a cycle of 4.\n**Step 2:** 50 ÷ 4 = 12, remainder 2.\n**Step 3:** Remainder 2 means the 2nd digit of the cycle: **9**.',
  },
  {
    kind: 'numeric',
    id: 'gre-exp-units-two',
    lessonId: 'gre-exponents-roots',
    difficulty: 2,
    prompt: 'What is the units digit of 2¹⁰⁰?',
    answer: 6,
    answerDisplay: '6',
    explanation:
      '**Step 1:** Powers of 2 end in 2, 4, 8, 6, then repeat — a cycle of 4.\n**Step 2:** 100 ÷ 4 = 25, remainder 0.\n**Step 3:** Remainder 0 means the **last** digit of the cycle: **6**. (Check with 2⁴ = 16 and 2⁸ = 256: exponents that are multiples of 4 end in 6.)',
  },
];
