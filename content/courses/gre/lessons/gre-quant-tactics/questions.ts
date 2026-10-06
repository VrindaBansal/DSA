import type { Question } from '@/lib/types';

// Practice questions for "Quant tactics" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- plug in ---------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tac-plug',
    lessonId: 'gre-quant-tactics',
    difficulty: 2,
    prompt: 'If a car travels m miles in h hours, how many minutes does it take to travel 1 mile at the same rate?',
    options: ['m/h', 'h/m', '60h/m', '60m/h', 'hm/60'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Pick numbers: m = 30 miles in h = 1 hour.\n**Step 2:** Target: 30 miles per hour is 1 mile every 2 minutes, so the target is **2**.\n**Step 3:** Test: m/h = 30 ✗, h/m = 1/30 ✗, 60h/m = 60/30 = 2 ✓, 60m/h = 1,800 ✗, hm/60 = 0.5 ✗.\n**Answer:** **60h/m**.',
    distractorNotes: [
      'That is the speed in miles per hour.',
      'That is hours per mile — the question wants minutes.',
      'Correct.',
      'Upside down: with m = 30, h = 1 it gives 1,800.',
      'With m = 30, h = 1 it gives 0.5, not 2.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tac-plug-percent',
    lessonId: 'gre-quant-tactics',
    difficulty: 2,
    prompt: 'A positive number x is increased by 20%, and the result is then decreased by 25%. The final number is what percent of x?',
    options: ['75%', '90%', '95%', '96%', '120%'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Plug in x = 100.\n**Step 2:** Increase by 20%: 100 → 120.\n**Step 3:** Decrease by 25%: 25% of 120 is 30, so 120 → 90.\n**Answer:** 90 out of the original 100 = **90%**.',
    distractorNotes: [
      'That applies only the 25% decrease.',
      'Correct.',
      'That adds the percents (+20 − 25 = −5). The 25% is taken from 120, not from 100.',
      'That is +20% then −20%.',
      'That applies only the 20% increase.',
    ],
  },
  // --- backsolve -----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tac-backsolve',
    lessonId: 'gre-quant-tactics',
    difficulty: 2,
    prompt: 'A jar holds 30 coins, all nickels and dimes, worth a total of $2.10. How many dimes are in the jar?',
    options: ['6', '12', '18', '24', '27'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Try the middle choice, 18 dimes: then 12 nickels. Value: 180¢ + 60¢ = 240¢ — too much.\n**Step 2:** Too much money means too many dimes, so try a smaller choice: 12 dimes and 18 nickels: 120¢ + 90¢ = 210¢ ✓.\n**Answer:** **12** dimes.',
    distractorNotes: [
      '6 dimes + 24 nickels = 60¢ + 120¢ = $1.80.',
      'Correct.',
      '18 dimes + 12 nickels = $2.40.',
      '24 dimes + 6 nickels = $2.70.',
      '27 dimes + 3 nickels = $2.85.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tac-backsolve-age',
    lessonId: 'gre-quant-tactics',
    difficulty: 2,
    prompt: 'Ana is now 3 times as old as Ben. In 6 years, Ana will be twice as old as Ben. How old is Ana now?',
    options: ['12', '15', '18', '21', '24'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Try the middle choice: Ana = 18, so Ben = 18 ÷ 3 = 6.\n**Step 2:** In 6 years: Ana 24, Ben 12. Is 24 twice 12? Yes ✓.\n**Answer:** Ana is **18**.',
    distractorNotes: [
      'Ben would be 4. In 6 years: 18 and 10 — not twice.',
      'Ben would be 5. In 6 years: 21 and 11 — not twice.',
      'Correct.',
      'Ben would be 7. In 6 years: 27 and 13 — not twice.',
      'Ben would be 8. In 6 years: 30 and 14 — not twice.',
    ],
  },
  // --- estimate ------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tac-estimate',
    lessonId: 'gre-quant-tactics',
    difficulty: 1,
    prompt: 'Which of the following is closest to (39.8 × 5.02) ÷ 0.198?',
    options: ['10', '100', '1,000', '10,000', '100,000'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Round: 39.8 ≈ 40, 5.02 ≈ 5, 0.198 ≈ 0.2.\n**Step 2:** (40 × 5) ÷ 0.2 = 200 ÷ 0.2. Dividing by 0.2 is the same as multiplying by 5: 200 × 5 = 1,000.\n**Answer:** **1,000**. The choices are 10 times apart, so rounding is safe.',
    distractorNotes: [
      'Off by a factor of 100.',
      'That forgets that dividing by 0.2 multiplies by 5.',
      'Correct.',
      'Off by a factor of 10.',
      'Off by a factor of 100.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tac-estimate-percent',
    lessonId: 'gre-quant-tactics',
    difficulty: 1,
    prompt: 'Which of the following is closest to 49.6% of 1,212?',
    options: ['400', '500', '600', '700', '800'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Round: 49.6% ≈ 50%, and 1,212 ≈ 1,200.\n**Step 2:** 50% of 1,200 = 600.\n**Answer:** **600**. (Exact: about 601.)',
    distractorNotes: [
      'That is about a third of 1,212.',
      'Too low — half of 1,212 is about 600.',
      'Correct.',
      'Too high — 49.6% is just under half.',
      'That is about two-thirds of 1,212.',
    ],
  },
  // --- formats -------------------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-tac-multi',
    lessonId: 'gre-quant-tactics',
    difficulty: 2,
    prompt: 'If 3 < 2x − 1 < 11, which of the following could be the value of x?\n\nIndicate all such values.',
    options: ['1', '2', '3.5', '5', '6'],
    correctIndices: [2, 3],
    explanation:
      '**Step 1:** Find the rule once instead of testing each choice. Add 1 to all three parts: 4 < 2x < 12.\n**Step 2:** Divide by 2: 2 < x < 6.\n**Step 3:** Read off the choices strictly between 2 and 6: **3.5 and 5**.',
    distractorNotes: [
      '✗ Below 2.',
      '✗ x = 2 gives 2x − 1 = 3, which is not greater than 3.',
      '✓ Between 2 and 6.',
      '✓ Between 2 and 6.',
      '✗ x = 6 gives 11, which is not less than 11.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-tac-units',
    lessonId: 'gre-quant-tactics',
    difficulty: 1,
    prompt: 'A car travels at a constant speed of 45 miles per hour. How many minutes does it take the car to travel 12 miles?',
    answer: 16,
    answerDisplay: '16',
    suffix: 'minutes',
    explanation:
      '**Step 1:** Time = distance ÷ speed = 12 ÷ 45 = 4/15 of an hour.\n**Step 2:** The question asks for **minutes**: (4/15) × 60 = **16** minutes.\n(Entering 0.267 — the time in hours — is the units trap.)',
  },
  // --- right question; pacing ---------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tac-question',
    lessonId: 'gre-quant-tactics',
    difficulty: 2,
    prompt: 'The length of a rectangle is 3 more than its width, and its area is 40. What is its perimeter?',
    options: ['5', '8', '13', '26', '40'],
    correctIndex: 3,
    explanation:
      '**Step 1:** Width w, length w + 3: w(w + 3) = 40. Backsolve-style: 5 × 8 = 40, so w = 5 and the length is 8.\n**Step 2:** Reread the question — it wants the **perimeter**: 2(5 + 8) = **26**.\nThe traps are the width (5), the length (8), and their sum (13) — each the answer to a different question.',
    distractorNotes: [
      'That is the width.',
      'That is the length.',
      'That is length + width — only half the perimeter.',
      'Correct.',
      'That is the area, which was given.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tac-pacing',
    lessonId: 'gre-quant-tactics',
    difficulty: 1,
    prompt:
      'You have spent about three minutes on a question in a Quant section and still don’t see how to solve it. What is the best thing to do?',
    options: [
      'Keep working until you solve it, since every question must be answered correctly.',
      'Leave it blank so that a wrong answer can’t lower your score.',
      'Move on without answering and plan to come back if there’s time.',
      'Pick your best guess, mark it for review, and move on.',
      'Go back and recheck all of the earlier questions first.',
    ],
    correctIndex: 3,
    explanation:
      '**Step 1:** Every question is worth the same, so minutes spent here are minutes taken from easier questions.\n**Step 2:** There is no penalty for a wrong answer, so a guess can only help.\n**Answer:** **guess, mark it, and move on** — then come back from the Review screen if time allows.',
    distractorNotes: [
      'Spending more time on one question costs you easier questions later.',
      'There is no penalty for wrong answers — a blank is always worse than a guess.',
      'If time runs out, it stays blank. Guess first, then come back.',
      'Correct.',
      'That spends time without dealing with the current question.',
    ],
  },
];
