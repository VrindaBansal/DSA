import type { Question } from '@/lib/types';

// Practice questions for "Ratios & proportions" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- what a ratio tells you -----------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-rat-fraction',
    lessonId: 'gre-ratios',
    difficulty: 1,
    prompt: 'In a class, the ratio of boys to girls is 4 : 5. What fraction of the students in the class are girls?',
    options: ['4/5', '5/4', '4/9', '5/9', '1/9'],
    correctIndex: 3,
    explanation:
      '**Step 1:** The class has 4 + 5 = 9 parts.\n**Step 2:** Girls are 5 of those parts.\n**Answer:** **5/9**.',
    distractorNotes: [
      'That compares boys to girls, not girls to the whole class.',
      'That compares girls to boys, not girls to the whole class.',
      'That is the fraction of boys.',
      'Correct.',
      'One part is 1/9, but girls are 5 parts.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rat-simplify',
    lessonId: 'gre-ratios',
    difficulty: 1,
    prompt: 'The ratio of 0.25 to 1.5 is equal to which of the following ratios?',
    options: ['1 : 6', '1 : 4', '5 : 3', '6 : 1', '3 : 20'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Clear the decimals by multiplying both numbers by 4: 0.25 × 4 = 1 and 1.5 × 4 = 6.\n**Answer:** **1 : 6**. (Check: 0.25 ÷ 1.5 = 1/6.)',
    distractorNotes: [
      'Correct.',
      '1 : 4 would be 0.25 to 1.',
      'No step gives 5 : 3.',
      'That is reversed — 1.5 to 0.25.',
      '3 : 20 = 0.15, not 1/6.',
    ],
  },
  // --- the parts method ---------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rat-parts-total',
    lessonId: 'gre-ratios',
    difficulty: 1,
    prompt: 'Three partners split a profit of $1,800 in the ratio 2 : 3 : 4. How many dollars does the partner with the largest share receive?',
    answer: 800,
    answerDisplay: '800',
    prefix: '$',
    explanation:
      '**Step 1:** Total parts: 2 + 3 + 4 = 9.\n**Step 2:** One part: $1,800 ÷ 9 = $200.\n**Step 3:** The largest share is 4 parts: 4 × $200 = **$800**. (Shares: $400, $600, $800 — they add to $1,800 ✓.)',
  },
  {
    kind: 'numeric',
    id: 'gre-rat-parts',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'In a jar, the ratio of red to blue marbles is 5 : 3, and there are 14 more red marbles than blue. How many marbles are in the jar?',
    answer: 56,
    answerDisplay: '56',
    explanation:
      '**Step 1:** The difference, 14 marbles, is 5 − 3 = 2 parts.\n**Step 2:** One part = 14 ÷ 2 = 7.\n**Step 3:** The jar is 5 + 3 = 8 parts: 8 × 7 = **56**. (35 red and 21 blue.)',
  },
  // --- combining ratios --------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-rat-chain',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'If x : y = 3 : 4 and y : z = 6 : 5, what is x : z?',
    options: ['3 : 5', '9 : 10', '10 : 9', '9 : 5', '1 : 2'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Make y the same in both ratios. It is 4 and 6; the LCM is 12.\n**Step 2:** x : y = 3 : 4 = 9 : 12 and y : z = 6 : 5 = 12 : 10.\n**Step 3:** x : y : z = 9 : 12 : 10, so x : z = **9 : 10**.',
    distractorNotes: [
      'You read 3 and 5 straight across without matching y.',
      'Correct.',
      'That is z : x — reversed.',
      'Only one ratio was scaled.',
      'No step gives 1 : 2.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-rat-chain-three',
    lessonId: 'gre-ratios',
    difficulty: 3,
    prompt: 'If a : b = 2 : 3, b : c = 4 : 5, and a + b + c = 70, what is the value of c?',
    answer: 30,
    answerDisplay: '30',
    explanation:
      '**Step 1:** b is 3 in one ratio and 4 in the other; the LCM is 12.\n**Step 2:** a : b = 8 : 12 and b : c = 12 : 15, so a : b : c = 8 : 12 : 15.\n**Step 3:** Total parts: 8 + 12 + 15 = 35, so one part = 70 ÷ 35 = 2.\n**Step 4:** c = 15 parts = **30**. (a = 16, b = 24, c = 30; sum 70 ✓.)',
  },
  // --- changing ratios -----------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rat-change',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'A bowl contains red and green candies in the ratio 3 : 2. After 10 red candies are eaten and none are added, the numbers of red and green candies are equal. How many green candies are in the bowl?',
    answer: 20,
    answerDisplay: '20',
    explanation:
      '**Step 1:** The green candies don’t change. Let red = 3k and green = 2k.\n**Step 2:** After eating 10 red: 3k − 10 = 2k, so k = 10.\n**Step 3:** Green = 2k = **20**. (Red went from 30 to 20 ✓.)',
  },
  {
    kind: 'mcq',
    id: 'gre-rat-mixture',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'A 30-liter punch is made of juice and water in the ratio 2 : 1. How many liters of water must be added so that the ratio of juice to water becomes 1 : 1?',
    options: ['5', '10', '15', '20', '30'],
    correctIndex: 1,
    explanation:
      '**Step 1:** 2 + 1 = 3 parts make 30 liters, so one part is 10: juice = 20 L, water = 10 L.\n**Step 2:** The juice doesn’t change. For 1 : 1, water must also be 20 L.\n**Step 3:** Add 20 − 10 = **10** liters.',
    distractorNotes: [
      'Then water is 15 L against 20 L of juice — still not equal.',
      'Correct.',
      'That ends with 25 L of water against 20 L of juice.',
      '20 L is how much water the punch needs in total, not how much to add.',
      'Far too much.',
    ],
  },
  // --- proportions ---------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rat-proportion',
    lessonId: 'gre-ratios',
    difficulty: 1,
    prompt: 'A car uses 6 gallons of gas to travel 195 miles. At the same rate, how many gallons will it use to travel 325 miles?',
    answer: 10,
    answerDisplay: '10',
    suffix: 'gallons',
    explanation:
      '**Step 1:** More miles means more gas (direct).\n**Step 2:** Unit rate: 195 ÷ 6 = 32.5 miles per gallon.\n**Step 3:** 325 ÷ 32.5 = **10** gallons. (Or set up 6/195 = x/325 and cross-multiply.)',
  },
  {
    kind: 'mcq',
    id: 'gre-rat-scale',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'Six identical printers print 720 pages in 4 minutes. At that rate, how many minutes would 8 such printers take to print 1,200 pages?',
    options: ['3', '4', '5', '6', '8'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Find one printer’s rate: 720 pages ÷ 6 printers ÷ 4 minutes = 30 pages per minute.\n**Step 2:** 8 printers print 8 × 30 = 240 pages per minute.\n**Step 3:** 1,200 ÷ 240 = **5** minutes.',
    distractorNotes: [
      'Too fast — check the pages per minute.',
      'That’s the original time, but both the printers and the pages changed.',
      'Correct.',
      'You scaled up for the extra pages but forgot the extra printers.',
      'More printers should mean less time, not more.',
    ],
  },
];
