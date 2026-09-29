import type { Question } from '@/lib/types';

// Practice questions for "Counting & probability" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- slot method -----------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-cnt-slots',
    lessonId: 'gre-counting-probability',
    difficulty: 1,
    prompt:
      'A password consists of 2 letters (from the 26 letters A–Z) followed by 2 digits (0–9). The two letters must be different, but the digits may repeat. How many different passwords are possible?',
    answer: 65000,
    answerDisplay: '65,000',
    explanation:
      '**Step 1:** Four slots: letter, letter, digit, digit.\n**Step 2:** Options: 26 for the first letter, 25 for the second (no repeat), 10 and 10 for the digits (repeats allowed).\n**Step 3:** 26 × 25 × 10 × 10 = **65,000**.',
  },
  {
    kind: 'numeric',
    id: 'gre-cnt-odd',
    lessonId: 'gre-counting-probability',
    difficulty: 3,
    prompt: 'How many odd three-digit numbers have three different digits?',
    answer: 320,
    answerDisplay: '320',
    explanation:
      '**Step 1:** Restricted slots first. The units digit must be odd: 5 options (1, 3, 5, 7, 9).\n**Step 2:** The hundreds digit can’t be 0 and can’t match the units digit: 10 − 2 = 8 options.\n**Step 3:** The tens digit can’t match either digit already used: 10 − 2 = 8 options.\n**Step 4:** 5 × 8 × 8 = **320**.',
  },
  // --- arrangements ----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-cnt-perm',
    lessonId: 'gre-counting-probability',
    difficulty: 1,
    prompt: 'Ten runners compete in a race. In how many different ways can the gold, silver, and bronze medals be awarded?',
    options: ['30', '120', '720', '1,000', '3,628,800'],
    correctIndex: 2,
    explanation:
      '**Step 1:** The medals are different, so order matters. Use three slots: gold, silver, bronze.\n**Step 2:** 10 runners can win gold, then 9 remain for silver, then 8 for bronze.\n**Step 3:** 10 × 9 × 8 = **720**.',
    distractorNotes: [
      'That is 10 × 3 — the slots multiply, one for each medal.',
      'That is C(10, 3), which ignores order — but gold and silver are different.',
      'Correct.',
      'That is 10³, which lets one runner win more than one medal.',
      'That is 10! — it arranges all ten runners, not just the top three.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-cnt-letters',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt: 'How many different arrangements are there of the letters in the word BANANA?',
    answer: 60,
    answerDisplay: '60',
    explanation:
      '**Step 1:** 6 letters: A appears 3 times, N appears 2 times, B once.\n**Step 2:** As if all were different: 6! = 720.\n**Step 3:** Divide out the repeats: 720 ÷ (3! × 2!) = 720 ÷ (6 × 2) = **60**.',
  },
  // --- combinations ---------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-cnt-comb',
    lessonId: 'gre-counting-probability',
    difficulty: 1,
    prompt: 'In how many ways can a group of 4 volunteers be chosen from 9 people?',
    options: ['36', '126', '504', '3,024', '6,561'],
    correctIndex: 1,
    explanation:
      '**Step 1:** A group — order doesn’t matter — so this is C(9, 4).\n**Step 2:** Count down 4 numbers from 9: 9 × 8 × 7 × 6 = 3,024.\n**Step 3:** Divide by 4! = 24: 3,024 ÷ 24 = **126**.',
    distractorNotes: [
      'That is C(9, 2) — choosing 2, not 4.',
      'Correct.',
      'That is 9 × 8 × 7 — an ordered choice of 3.',
      'That counts ordered choices — each group got counted 4! = 24 times.',
      'That is 9⁴, which allows repeats and order.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-cnt-two-groups',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt:
      'A committee will consist of 2 teachers and 3 students. If there are 5 teachers and 6 students to choose from, how many different committees are possible?',
    answer: 200,
    answerDisplay: '200',
    explanation:
      '**Step 1:** Teachers: C(5, 2) = (5 × 4) ÷ 2 = 10.\n**Step 2:** Students: C(6, 3) = (6 × 5 × 4) ÷ 6 = 20.\n**Step 3:** Both choices must be made, so multiply: 10 × 20 = **200**.',
  },
  // --- restrictions ------------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-cnt-restrict',
    lessonId: 'gre-counting-probability',
    difficulty: 3,
    prompt: 'In how many ways can 6 people stand in a line if two of them, Lee and Ana, must NOT stand next to each other?',
    answer: 480,
    answerDisplay: '480',
    explanation:
      '**Step 1:** All arrangements: 6! = 720.\n**Step 2:** Arrangements with them together: glue Lee and Ana into one block, so there are 5 things to arrange (5! = 120), times 2 for the order inside the block: 240.\n**Step 3:** Not together = 720 − 240 = **480**.',
  },
  {
    kind: 'numeric',
    id: 'gre-cnt-atleast',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt:
      'A team of 3 is chosen from 4 managers and 5 engineers. How many different teams include at least one manager?',
    answer: 74,
    answerDisplay: '74',
    explanation:
      '**Step 1:** All teams: C(9, 3) = (9 × 8 × 7) ÷ 6 = 84.\n**Step 2:** Teams with no managers (all engineers): C(5, 3) = (5 × 4 × 3) ÷ 6 = 10.\n**Step 3:** At least one manager = 84 − 10 = **74**.',
  },
  // --- probability basics ---------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-prob-dice',
    lessonId: 'gre-counting-probability',
    difficulty: 1,
    prompt: 'Two fair six-sided dice are rolled. What is the probability that the sum of the two numbers is 9?',
    options: ['1/12', '1/9', '1/6', '1/4', '5/36'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Total outcomes: 6 × 6 = 36.\n**Step 2:** Outcomes with sum 9: (3, 6), (4, 5), (5, 4), (6, 3) — 4 outcomes.\n**Step 3:** 4/36 = **1/9**.',
    distractorNotes: [
      'That is 3/36 — one of the four outcomes was missed. (3, 6) and (6, 3) both count.',
      'Correct.',
      'That is the probability of a sum of 7 (6 outcomes).',
      'That is 9/36 — 9 is the sum, not the number of outcomes.',
      'That is the probability of a sum of 8 (or 6).',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-prob-atleast',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt: 'A fair coin is flipped 4 times. What is the probability of getting at least one head?',
    options: ['1/16', '1/4', '1/2', '3/4', '15/16'],
    correctIndex: 4,
    explanation:
      '**Step 1:** "At least one" → use 1 − P(none).\n**Step 2:** P(no heads) = P(4 tails) = (1/2)⁴ = 1/16.\n**Step 3:** 1 − 1/16 = **15/16**.',
    distractorNotes: [
      'That is P(no heads) — subtract it from 1.',
      'That treats it as 1 head out of 4 flips.',
      'That is the chance of a head on a single flip.',
      'That is 1 − 1/4 — the chance of no heads is (1/2)⁴, not 1/4.',
      'Correct.',
    ],
  },
  // --- and / or ---------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-prob-draw',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt:
      'A box has 5 green and 3 yellow balls. Two balls are drawn at random without replacement. What is the probability that both are yellow?',
    options: ['3/28', '9/64', '3/8', '1/4', '3/32'],
    correctIndex: 0,
    explanation:
      '**Step 1:** First ball yellow: 3 of 8, so 3/8.\n**Step 2:** Second ball yellow: now 2 yellow of 7 left, so 2/7.\n**Step 3:** Both → multiply: (3/8) × (2/7) = 6/56 = **3/28**.',
    distractorNotes: [
      'Correct.',
      'That is (3/8)², as if the first ball were put back.',
      'That is the chance for one draw only.',
      'That is 2/8 — the second draw has 7 balls left, not 8.',
      'That is (3/8) × (2/8) — one ball is gone, so the second fraction is out of 7.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-prob-or',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt:
      'Events A and B are independent. The probability of A is 0.5, and the probability of B is 0.4. What is the probability that A or B (or both) occurs?',
    options: ['0.2', '0.45', '0.7', '0.8', '0.9'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Independent, so P(A and B) = 0.5 × 0.4 = 0.2.\n**Step 2:** OR: add, then subtract the overlap: 0.5 + 0.4 − 0.2.\n**Answer:** **0.7**.\nCheck with the complement: P(neither) = 0.5 × 0.6 = 0.3, and 1 − 0.3 = 0.7 ✓.',
    distractorNotes: [
      'That is P(A and B) — both happening.',
      'That averages the two probabilities.',
      'Correct.',
      'That is 1 − P(A and B), the chance they don’t both happen.',
      'That adds without subtracting the overlap, so the "both" cases are counted twice.',
    ],
  },
  // --- overlapping sets ------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-set-overlap',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt:
      'Of the 120 employees at a company, 70 drive to work, 55 take the bus to work, and 20 do neither. How many employees both drive and take the bus?',
    answer: 25,
    answerDisplay: '25',
    explanation:
      '**Step 1:** Total = A + B − Both + Neither: 120 = 70 + 55 − Both + 20.\n**Step 2:** 120 = 145 − Both.\n**Step 3:** Both = **25**.',
  },
  {
    kind: 'numeric',
    id: 'gre-set-table',
    lessonId: 'gre-counting-probability',
    difficulty: 2,
    prompt:
      'In a group of 80 people, 45 are women. Of the 30 people in the group who wear glasses, 12 are men. How many women in the group do not wear glasses?',
    answer: 27,
    answerDisplay: '27',
    explanation:
      '**Step 1:** Set up a 2×2 table: women/men by glasses/no glasses.\n**Step 2:** Women with glasses = 30 − 12 = 18.\n**Step 3:** Women without glasses = 45 − 18 = **27**.\nCheck: men = 35; men without glasses = 35 − 12 = 23; 27 + 23 = 50 = 80 − 30 ✓.',
  },
];
