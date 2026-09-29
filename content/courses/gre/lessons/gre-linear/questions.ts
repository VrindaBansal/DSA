import type { Question } from '@/lib/types';

// Practice questions for "Linear equations, systems, inequalities & absolute
// value" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- one-variable equations ---------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-lin-solve',
    lessonId: 'gre-linear',
    difficulty: 1,
    prompt: 'If 5(2x − 3) = 3x + 20, what is the value of x?',
    answer: 5,
    answerDisplay: '5',
    explanation:
      '**Step 1:** Distribute: 10x − 15 = 3x + 20.\n**Step 2:** Subtract 3x: 7x − 15 = 20.\n**Step 3:** Add 15: 7x = 35, so x = **5**.\nCheck: 5(10 − 3) = 35 and 15 + 20 = 35 ✓.',
  },
  {
    kind: 'numeric',
    id: 'gre-lin-fraction-eq',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'If x/2 − x/5 = 9, what is the value of x?',
    answer: 30,
    answerDisplay: '30',
    explanation:
      '**Step 1:** Multiply every term by 10 (the LCD of 2 and 5): 5x − 2x = 90.\n**Step 2:** 3x = 90, so x = **30**.\nCheck: 30/2 − 30/5 = 15 − 6 = 9 ✓.',
  },
  // --- systems ---------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-lin-system',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'If 5a + 2b = 24 and 2a + 5b = 18, what is the value of a + b?',
    options: ['4', '6', '7', '42', '6/7'],
    correctIndex: 1,
    explanation:
      'The question wants a + b, so look for a shortcut before solving.\n**Step 1:** Add the two equations: 7a + 7b = 42.\n**Step 2:** Divide by 7: a + b = **6**.\n(Solving fully gives a = 4 and b = 2 — same answer, more work.)',
    distractorNotes: [
      'That’s the value of a alone.',
      'Correct.',
      'That’s the coefficient after adding, not a + b.',
      '42 is 7(a + b) — divide by 7.',
      'The division went the wrong way.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-lin-substitute',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'If y = 2x − 1 and 3x + 2y = 26, what is the value of x?',
    answer: 4,
    answerDisplay: '4',
    explanation:
      '**Step 1:** Substitute y = 2x − 1 into the second equation: 3x + 2(2x − 1) = 26.\n**Step 2:** 3x + 4x − 2 = 26, so 7x = 28 and x = **4**.\nCheck: y = 7, and 12 + 14 = 26 ✓.',
  },
  // --- inequalities --------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-lin-inequality',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'Which of the following describes all values of x for which 7 − 2x ≥ 15?',
    options: ['x ≥ 4', 'x ≤ 4', 'x ≥ −4', 'x ≤ −4', 'x ≤ −11'],
    correctIndex: 3,
    explanation:
      '**Step 1:** Subtract 7: −2x ≥ 8.\n**Step 2:** Divide by −2 and flip the sign: **x ≤ −4**.\nCheck: x = −5 gives 7 + 10 = 17 ≥ 15 ✓; x = 0 gives 7 ≥ 15 ✗.',
    distractorNotes: [
      'Sign error on 4, and the inequality wasn’t flipped.',
      'The inequality should be ≤ — but the number is −4, not 4.',
      'You forgot to flip the sign when dividing by −2.',
      'Correct.',
      'No step gives −11.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-lin-range',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'How many integers x satisfy 3 < 2x + 1 ≤ 15?',
    answer: 6,
    answerDisplay: '6',
    explanation:
      '**Step 1:** Subtract 1 from all three parts: 2 < 2x ≤ 14.\n**Step 2:** Divide all three parts by 2: 1 < x ≤ 7.\n**Step 3:** The integers are 2, 3, 4, 5, 6, 7 — that is **6**. (1 is excluded by <; 7 is included by ≤.)',
  },
  // --- absolute value -----------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-lin-abs',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'What is the sum of all solutions of |2x − 6| = 10?',
    answer: 6,
    answerDisplay: '6',
    explanation:
      '**Step 1:** Two cases: 2x − 6 = 10 or 2x − 6 = −10.\n**Step 2:** First: 2x = 16, x = 8. Second: 2x = −4, x = −2.\n**Step 3:** Sum: 8 + (−2) = **6**.',
  },
  {
    kind: 'mcq',
    id: 'gre-lin-abs-range',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'Which of the following is equivalent to |x − 5| < 3?',
    options: ['x < 8', '2 < x < 8', '−8 < x < −2', 'x > 2', '−2 < x < 8'],
    correctIndex: 1,
    explanation:
      '|x − 5| < 3 means “x is less than 3 away from 5.”\n**Step 1:** 5 − 3 = 2 and 5 + 3 = 8.\n**Answer:** **2 < x < 8**. Check x = 0: |0 − 5| = 5, not less than 3 — and 0 is correctly outside the range.',
    distractorNotes: [
      'This lets in x = 0, which is 5 away from 5.',
      'Correct.',
      'That’s the range around −5, not 5.',
      'This lets in x = 100.',
      'The lower end should be 5 − 3 = 2.',
    ],
  },
  // --- words -----------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-lin-translate',
    lessonId: 'gre-linear',
    difficulty: 1,
    prompt: 'Which equation represents the statement “Seven less than three times a number n is 4 more than twice the number”?',
    options: ['7 − 3n = 2n + 4', '3n − 7 = 2n + 4', '3(n − 7) = 2(n + 4)', '3n − 7 = 2(n + 4)', '7 − 3n = 2(n + 4)'],
    correctIndex: 1,
    explanation:
      '**Step 1:** “Three times a number” is 3n; “seven less than” it is 3n − 7 (start with 3n, take away 7).\n**Step 2:** “Is” is =.\n**Step 3:** “Twice the number” is 2n; “4 more than” it is 2n + 4.\n**Answer:** **3n − 7 = 2n + 4**.',
    distractorNotes: [
      '“Seven less than 3n” is 3n − 7, not 7 − 3n.',
      'Correct.',
      'The 7 is subtracted after tripling, not before.',
      '“4 more than twice the number” is 2n + 4 — the 4 isn’t doubled.',
      'Both halves are reversed.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-lin-words',
    lessonId: 'gre-linear',
    difficulty: 2,
    prompt: 'Concert tickets cost $25 for adults and $10 for students. If 200 tickets were sold for a total of $3,500, how many adult tickets were sold?',
    answer: 100,
    answerDisplay: '100',
    explanation:
      '**Step 1:** Let a = adult tickets, so 200 − a are student tickets.\n**Step 2:** Money: 25a + 10(200 − a) = 3,500.\n**Step 3:** 25a + 2,000 − 10a = 3,500 → 15a = 1,500 → a = **100**.\nCheck: 100 × $25 + 100 × $10 = $3,500 ✓.',
  },
];
