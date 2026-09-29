import type { Question } from '@/lib/types';

// Practice questions for "Functions, defined symbols & sequences" — two per idea,
// in lesson order.

export const QUESTIONS: Question[] = [
  // --- substitution ---------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-fn-evaluate',
    lessonId: 'gre-functions-sequences',
    difficulty: 1,
    prompt: 'If f(x) = x² − 4x + 1, what is the value of f(−3)?',
    answer: 22,
    answerDisplay: '22',
    explanation:
      '**Step 1:** Replace every x with (−3): f(−3) = (−3)² − 4(−3) + 1.\n**Step 2:** (−3)² = 9 and −4(−3) = +12.\n**Step 3:** 9 + 12 + 1 = **22**.',
  },
  {
    kind: 'mcq',
    id: 'gre-fn-expression',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'If g(x) = 3x − 2, which of the following is equal to g(a + 2)?',
    options: ['3a', '3a + 2', '3a + 4', '3a + 6', 'a + 4'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Replace x with (a + 2): g(a + 2) = 3(a + 2) − 2.\n**Step 2:** Distribute: 3a + 6 − 2.\n**Step 3:** Combine: **3a + 4**.\nCheck with a = 0: g(2) = 3(2) − 2 = 4, and 3(0) + 4 = 4 ✓.',
    distractorNotes: [
      'Only the a was multiplied by 3 (3a + 2 − 2). The 2 inside the parentheses gets multiplied too.',
      'Check with a = 0: g(2) = 4, but this choice gives 2.',
      'Correct.',
      'That is 3(a + 2) — the −2 at the end was dropped.',
      'The 3 must multiply the a as well.',
    ],
  },
  // --- composition ----------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-fn-compose',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'If f(x) = x² − 1 and g(x) = 3 − x, what is the value of f(g(5))?',
    answer: 3,
    answerDisplay: '3',
    explanation:
      '**Step 1:** Inside first: g(5) = 3 − 5 = −2.\n**Step 2:** Feed −2 into f: f(−2) = (−2)² − 1 = 4 − 1 = 3.\n**Answer:** **3**.',
  },
  {
    kind: 'numeric',
    id: 'gre-fn-solve-for-input',
    lessonId: 'gre-functions-sequences',
    difficulty: 1,
    prompt: 'If h(x) = 2x + 7 and h(k) = 19, what is the value of k?',
    answer: 6,
    answerDisplay: '6',
    explanation:
      '**Step 1:** h(k) means the rule with x = k: 2k + 7.\n**Step 2:** Set it equal to the output: 2k + 7 = 19.\n**Step 3:** 2k = 12, so k = **6**. Check: h(6) = 12 + 7 = 19 ✓.',
  },
  // --- made-up symbols ------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-fn-symbol',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'For all numbers a and b, a ⊕ b = ab − a + b. What is the value of (2 ⊕ 3) ⊕ (−1)?',
    answer: -15,
    answerDisplay: '−15',
    explanation:
      '**Step 1:** Parentheses first: 2 ⊕ 3 = (2)(3) − 2 + 3 = 7.\n**Step 2:** Now 7 ⊕ (−1), with a = 7 and b = −1: (7)(−1) − 7 + (−1) = −7 − 7 − 1.\n**Answer:** **−15**. Keep each number in its own spot — this operation gives a different result if you swap them.',
  },
  {
    kind: 'numeric',
    id: 'gre-fn-symbol-equation',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'For all numbers x and y, x ★ y = 2x + y². If k ★ 3 = 15, what is the value of k?',
    answer: 3,
    answerDisplay: '3',
    explanation:
      '**Step 1:** k is in the first spot (x) and 3 is in the second spot (y): k ★ 3 = 2k + 3².\n**Step 2:** Set it equal to 15: 2k + 9 = 15.\n**Step 3:** 2k = 6, so k = **3**. Check: 2(3) + 9 = 15 ✓.',
  },
  // --- arithmetic sequences -----------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-fn-arith',
    lessonId: 'gre-functions-sequences',
    difficulty: 1,
    prompt:
      'The first term of a sequence is 5, and each term after the first is 6 more than the previous term. What is the 15th term of the sequence?',
    answer: 89,
    answerDisplay: '89',
    explanation:
      '**Step 1:** Adding 6 each time makes this arithmetic, with a₁ = 5 and d = 6.\n**Step 2:** From the 1st term to the 15th you add 6 exactly 15 − 1 = 14 times.\n**Step 3:** 5 + 14 × 6 = 5 + 84 = **89**.',
  },
  {
    kind: 'mcq',
    id: 'gre-fn-arith-find',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'In an arithmetic sequence, the 3rd term is 11 and the 8th term is 31. What is the 1st term?',
    options: ['1', '3', '4', '7', '−1'],
    correctIndex: 1,
    explanation:
      '**Step 1:** From the 3rd term to the 8th is 8 − 3 = 5 steps.\n**Step 2:** The terms grew by 31 − 11 = 20 over 5 steps, so d = 20 ÷ 5 = 4.\n**Step 3:** From the 3rd term back to the 1st is 2 steps: 11 − 2 × 4 = **3**.\nCheck: 3, 7, 11, 15, 19, 23, 27, 31 ✓.',
    distractorNotes: [
      'This comes from counting 4 steps between the 3rd and 8th terms (d = 5). There are 5.',
      'Correct.',
      '4 is the common difference, not the 1st term.',
      '7 is the 2nd term — one more step back is needed.',
      'That steps back 3 times; the 3rd term is only 2 steps from the 1st.',
    ],
  },
  // --- geometric and recursive ----------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-fn-sequence',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt:
      'The first term of a sequence is 3, and each term after the first is 2 times the previous term. What is the 7th term?',
    options: ['15', '96', '192', '384', '2,187'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Multiplying by 2 each time makes this geometric: a₁ = 3, r = 2.\n**Step 2:** From the 1st term to the 7th you multiply by 2 six times: 3 × 2⁶ = 3 × 64.\n**Answer:** **192**. (Written out: 3, 6, 12, 24, 48, 96, 192.)',
    distractorNotes: [
      'This adds 2 each time instead of multiplying by 2.',
      '96 is the 6th term.',
      'Correct.',
      'This multiplies by 2 seven times; the 1st term to the 7th is only six steps.',
      'That is 3⁷ — the ratio is 2, not 3.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-fn-recursive',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'A sequence is defined by a₁ = 3 and aₙ = 3aₙ₋₁ − 4 for n ≥ 2. What is the value of a₄?',
    answer: 29,
    answerDisplay: '29',
    explanation:
      '**Step 1:** Read the rule as "triple the previous term, then subtract 4."\n**Step 2:** a₂ = 3(3) − 4 = 5.\n**Step 3:** a₃ = 3(5) − 4 = 11.\n**Step 4:** a₄ = 3(11) − 4 = **29**.',
  },
  // --- variation ------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-fn-variation',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'The quantity y varies inversely with x. If y = 8 when x = 6, what is y when x = 16?',
    options: ['2', '3', '6', '12', '21⅓'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Inverse variation means the product xy stays the same: 6 × 8 = 48.\n**Step 2:** At x = 16: 16 × y = 48.\n**Step 3:** y = 48 ÷ 16 = **3**. (x went up, y went down ✓.)',
    distractorNotes: [
      'Check the division: 48 ÷ 16 = 3.',
      'Correct.',
      '6 is the old x value — find the new y with the constant product 48.',
      'This scales y up; with inverse variation y must go down when x goes up.',
      'That is 8 × 16/6 — direct variation, not inverse.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-fn-variation-square',
    lessonId: 'gre-functions-sequences',
    difficulty: 2,
    prompt: 'The quantity y varies directly with the square of x. If y = 12 when x = 2, what is y when x = 6?',
    options: ['36', '72', '108', '144', '216'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Write the rule: y = kx².\n**Step 2:** Find k from the first pair: 12 = k(2²) = 4k, so k = 3.\n**Step 3:** Use k with the new x: y = 3(6²) = 3 × 36 = **108**.\nShortcut: x tripled, so y is multiplied by 3² = 9, and 12 × 9 = 108 ✓.',
    distractorNotes: [
      'This triples y, as if y varied with x itself. With x², tripling x multiplies y by 9.',
      'That is 12 × 6 — k must be found with x², not x.',
      'Correct.',
      'That is 12² — square x, not y.',
      'That is 6³ — no step cubes x.',
    ],
  },
];
