import type { Question } from '@/lib/types';

// Practice questions for "Fractions, decimals & comparing numbers" — two per
// idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- what a fraction means ------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-frac-simplify',
    lessonId: 'gre-fractions-decimals',
    difficulty: 1,
    prompt: 'Which of the following is equal to 18/48?',
    options: ['3/8', '3/7', '6/15', '9/16', '2/6'],
    correctIndex: 0,
    explanation:
      '**Step 1:** 18 and 48 are both divisible by 6.\n**Step 2:** 18 ÷ 6 = 3 and 48 ÷ 6 = 8.\n**Answer:** **3/8**. (Check as decimals: 18/48 = 0.375 = 3/8.)',
    distractorNotes: [
      'Correct.',
      '3/7 ≈ 0.43, but 18/48 = 0.375.',
      '6/15 = 0.4 — close, but not equal.',
      '9/16 divides only the top by 2.',
      '2/6 = 1/3 ≈ 0.333.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-frac-improper',
    lessonId: 'gre-fractions-decimals',
    difficulty: 1,
    prompt: 'Which of the following is equal to 3⅘?',
    options: ['19/5', '17/5', '15/4', '12/5', '34/5'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Whole number × denominator: 3 × 5 = 15 fifths.\n**Step 2:** Add the numerator: 15 + 4 = 19 fifths.\n**Answer:** **19/5**. (Check: 19 ÷ 5 = 3 remainder 4.)',
    distractorNotes: [
      'Correct.',
      '17/5 = 3⅖.',
      '15/4 mixes up the parts.',
      '12/5 multiplies 3 × 4 instead of 3 × 5 + 4.',
      '34/5 is 6⅘.',
    ],
  },
  // --- adding and subtracting --------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-frac-add',
    lessonId: 'gre-fractions-decimals',
    difficulty: 1,
    prompt: '1/3 + 1/4 + 1/6 = ?\n\nGive your answer as a fraction.',
    answer: 3 / 4,
    answerDisplay: '3/4',
    fraction: true,
    explanation:
      '**Step 1:** The least common denominator of 3, 4, and 6 is 12.\n**Step 2:** Rewrite: 1/3 = 4/12, 1/4 = 3/12, 1/6 = 2/12.\n**Step 3:** Add the tops: 4 + 3 + 2 = 9, so 9/12.\n**Step 4:** Simplify: 9/12 = **3/4**.',
  },
  {
    kind: 'numeric',
    id: 'gre-frac-mixed',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt: '5¼ − 2⅔ = ?\n\nGive your answer as a fraction.',
    answer: 31 / 12,
    answerDisplay: '31/12',
    fraction: true,
    explanation:
      '**Step 1:** Convert to improper fractions: 5¼ = 21/4 and 2⅔ = 8/3.\n**Step 2:** Common denominator 12: 21/4 = 63/12 and 8/3 = 32/12.\n**Step 3:** Subtract: 63/12 − 32/12 = **31/12** (which is 2 7/12).',
  },
  // --- multiplying and dividing --------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-frac-ops',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt: '(3/4 − 1/6) ÷ 7/9 = ?\n\nGive your answer as a fraction.',
    answer: 3 / 4,
    answerDisplay: '3/4',
    fraction: true,
    explanation:
      '**Step 1:** Parentheses first: 3/4 − 1/6 = 9/12 − 2/12 = 7/12.\n**Step 2:** Dividing by 7/9 means multiplying by 9/7: 7/12 × 9/7.\n**Step 3:** Cancel the 7s: 9/12 = **3/4**.',
  },
  {
    kind: 'numeric',
    id: 'gre-frac-divide-servings',
    lessonId: 'gre-fractions-decimals',
    difficulty: 1,
    prompt: 'A recipe uses 3/8 cup of oil per batch. How many batches can be made with exactly 6 cups of oil?',
    answer: 16,
    answerDisplay: '16',
    suffix: 'batches',
    explanation:
      '“How many 3/8s fit in 6?” is a division: 6 ÷ 3/8.\n**Step 1:** Flip and multiply: 6 × 8/3.\n**Step 2:** 6 × 8 = 48, and 48 ÷ 3 = **16** batches.\nCheck: 16 × 3/8 = 48/8 = 6 cups ✓.',
  },
  // --- comparing --------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-frac-order',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt: 'Which of the following is greatest?',
    options: ['8/15', '7/13', '6/11', '5/9', '4/7'],
    correctIndex: 4,
    explanation:
      'Every choice is a bit more than ½, so benchmarks alone won’t settle it. Look at how far each top is above half its bottom:\n8/15: half of 15 is 7.5, so 8 is 0.5 over — out of 15.\n4/7: half of 7 is 3.5, so 4 is 0.5 over — out of only 7.\nThe same 0.5 extra is a bigger share of a smaller whole, so **4/7** is greatest. As decimals: 0.533, 0.538, 0.545, 0.556, 0.571.',
    distractorNotes: [
      '8/15 ≈ 0.533 — actually the least.',
      '7/13 ≈ 0.538.',
      '6/11 ≈ 0.545.',
      '5/9 ≈ 0.556 — second greatest.',
      'Correct: 4/7 ≈ 0.571.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-frac-compare',
    lessonId: 'gre-fractions-decimals',
    difficulty: 3,
    prompt: 'Which of the following is least?',
    options: ['5/9', '4/7', '0.56', '(0.75)²', '√0.3'],
    correctIndex: 4,
    explanation:
      'The values are very close, so convert each to three decimal places:\n5/9 ≈ 0.556\n4/7 ≈ 0.571\n0.56 = 0.560\n(0.75)² = 0.5625\n√0.3: 0.55² = 0.3025, which is just over 0.3, so √0.3 is just under 0.55 (≈ 0.548).\nThe least is **√0.3**.',
    distractorNotes: [
      '≈ 0.556 — close, but slightly more than √0.3.',
      '≈ 0.571 — actually the greatest.',
      '0.560.',
      '0.5625.',
      'Correct — √0.3 ≈ 0.548.',
    ],
  },
  // --- decimals ---------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-frac-decimal-mult',
    lessonId: 'gre-fractions-decimals',
    difficulty: 1,
    prompt: '0.04 × 0.3 = ?',
    options: ['1.2', '0.12', '0.012', '0.0012', '12'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Ignore the decimal points: 4 × 3 = 12.\n**Step 2:** Count decimal places: 0.04 has two and 0.3 has one — three in all.\n**Step 3:** Put three decimal places in 12: **0.012**.',
    distractorNotes: [
      'The product of two numbers less than 1 must be less than both.',
      'That has only two decimal places; you need three.',
      'Correct.',
      'That has four decimal places; you need three.',
      'The decimal points were dropped entirely.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-frac-decimal-div',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt: '0.72 ÷ 0.018 = ?',
    answer: 40,
    answerDisplay: '40',
    explanation:
      '**Step 1:** 0.018 has three decimal places, so move both decimal points three places right: 0.72 → 720 and 0.018 → 18.\n**Step 2:** 720 ÷ 18 = **40**.\nCheck: 40 × 0.018 = 0.72 ✓.',
  },
  // --- fractions of what's left -----------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-frac-remain',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt: 'A tank was full. On Monday 2/5 of the water was used, and on Tuesday 1/2 of the remaining water was used, leaving 120 liters. How many liters does the full tank hold?',
    answer: 400,
    answerDisplay: '400',
    suffix: 'liters',
    explanation:
      '**Step 1:** After Monday, 1 − 2/5 = 3/5 of the tank remains.\n**Step 2:** Tuesday uses half of that, so half of 3/5 remains: 3/5 × 1/2 = 3/10 of the tank.\n**Step 3:** 3/10 of the tank = 120 liters, so the tank = 120 ÷ 3/10 = 120 × 10/3 = **400** liters.\nCheck: 400 → 240 after Monday → 120 after Tuesday ✓.',
  },
  {
    kind: 'mcq',
    id: 'gre-frac-remain-two',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt:
      'In a class, 1/3 of the students take Spanish. Of the students who don’t take Spanish, 3/4 take French. The remaining 6 students take no language. How many students are in the class?',
    options: ['24', '30', '36', '48', '72'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Students not taking Spanish: 1 − 1/3 = 2/3 of the class.\n**Step 2:** Of those, 1 − 3/4 = 1/4 take no language: 1/4 × 2/3 = 1/6 of the class.\n**Step 3:** 1/6 of the class is 6 students, so the class has **36**.\nCheck: 12 Spanish, 24 others, 18 of them French, 6 none ✓.',
    distractorNotes: [
      'With 24: 8 Spanish, 16 others, 12 French → 4 with no language, not 6.',
      '30 isn’t divisible by 3 and 4 in the way the story needs.',
      'Correct.',
      'This treats the 6 as 1/8 of the class — the 1/4 was of the remainder, not the whole.',
      'This treats the 6 students as 1/12 of the class.',
    ],
  },
  // --- scientific notation ------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-frac-sci',
    lessonId: 'gre-fractions-decimals',
    difficulty: 1,
    prompt: '(5 × 10⁴)(8 × 10⁻⁷) = ?',
    options: ['4 × 10⁻²', '4 × 10⁻³', '4 × 10⁻⁴', '40 × 10⁻²', '4 × 10²'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Multiply the front numbers: 5 × 8 = 40.\n**Step 2:** Add the exponents: 10⁴ × 10⁻⁷ = 10⁻³.\n**Step 3:** 40 × 10⁻³ — fix the front: 40 = 4 × 10¹, so the result is 4 × 10⁻².\n**Answer:** **4 × 10⁻²** (= 0.04).',
    distractorNotes: [
      'Correct.',
      'You forgot that 40 = 4 × 10, which adds one to the exponent.',
      'The fix went the wrong direction.',
      '40 × 10⁻² = 0.4, but the product is 0.04.',
      'Sign error on the exponent.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-frac-sci-div',
    lessonId: 'gre-fractions-decimals',
    difficulty: 2,
    prompt: '(1.2 × 10⁶) ÷ (4 × 10⁻²) = ?',
    options: ['3 × 10⁴', '3 × 10⁷', '3 × 10⁸', '4.8 × 10⁴', '3 × 10⁻⁸'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Divide the front numbers: 1.2 ÷ 4 = 0.3.\n**Step 2:** Subtract the exponents: 10^(6 − (−2)) = 10⁸.\n**Step 3:** 0.3 × 10⁸ — fix the front: 0.3 = 3 × 10⁻¹, so the result is 3 × 10⁷.\n**Answer:** **3 × 10⁷**.',
    distractorNotes: [
      '6 − 2 = 4 forgets that subtracting −2 adds 2.',
      'Correct.',
      '0.3 × 10⁸ is right, but 0.3 must become 3 × 10⁻¹, lowering the exponent by one.',
      'That multiplies instead of dividing.',
      'The exponent’s sign is flipped.',
    ],
  },
];
