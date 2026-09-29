import type { Question } from '@/lib/types';

// Practice questions for "Rates, work & mixtures" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- d = r × t --------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rw-basic',
    lessonId: 'gre-rates-work',
    difficulty: 1,
    prompt: 'A train travels 210 miles in 3 hours and 30 minutes. What is its average speed, in miles per hour?',
    answer: 60,
    answerDisplay: '60',
    suffix: 'mph',
    explanation:
      '**Step 1:** Convert the time to hours: 30 minutes = 0.5 hour, so the time is 3.5 hours.\n**Step 2:** rate = distance ÷ time = 210 ÷ 3.5 = **60** mph.\n(Using 3.3 hours for “3 hours 30 minutes” is the classic slip.)',
  },
  {
    kind: 'mcq',
    id: 'gre-rw-units',
    lessonId: 'gre-rates-work',
    difficulty: 1,
    prompt: 'Walking at a steady 4 miles per hour, how many minutes does it take to walk 1.4 miles?',
    options: ['14', '18', '21', '24', '35'],
    correctIndex: 2,
    explanation:
      '**Step 1:** time = distance ÷ rate = 1.4 ÷ 4 = 0.35 hour.\n**Step 2:** Convert to minutes: 0.35 × 60 = **21** minutes.\n(Or: 4 mph is 1 mile every 15 minutes, so 1.4 miles takes 1.4 × 15 = 21 minutes.)',
    distractorNotes: [
      'That treats 1.4 miles as 14 minutes — units don’t work that way.',
      'No step gives 18.',
      'Correct.',
      'No step gives 24.',
      '0.35 hour is 21 minutes, not 35 minutes — multiply by 60.',
    ],
  },
  // --- average speed ------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-rw-avg',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'A cyclist rides 20 miles uphill at 10 mph and returns the same 20 miles downhill at 40 mph. What is the average speed for the whole ride, in miles per hour?',
    options: ['16', '20', '25', '30', '50'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Uphill time: 20 ÷ 10 = 2 hours. Downhill time: 20 ÷ 40 = 0.5 hour.\n**Step 2:** Total: 40 miles in 2.5 hours.\n**Step 3:** Average speed = 40 ÷ 2.5 = **16** mph.',
    distractorNotes: [
      'Correct.',
      'No step gives 20.',
      'That averages the two speeds — but the cyclist spends much longer going slowly.',
      'No step gives 30.',
      '50 adds the speeds.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-rw-avg-two',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'Maya drove for 2 hours at 50 miles per hour and then for 3 hours at 70 miles per hour. What was her average speed for the entire trip, in miles per hour?',
    answer: 62,
    answerDisplay: '62',
    suffix: 'mph',
    explanation:
      '**Step 1:** Distances: 2 × 50 = 100 miles and 3 × 70 = 210 miles, so 310 miles in all.\n**Step 2:** Total time: 2 + 3 = 5 hours.\n**Step 3:** Average speed = 310 ÷ 5 = **62** mph. (Not 60: she spent more time at the faster speed.)',
  },
  // --- two movers ---------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rw-toward',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'Two cyclists start 45 miles apart and ride toward each other, one at 12 miles per hour and the other at 18 miles per hour. How many minutes after they start will they meet?',
    answer: 90,
    answerDisplay: '90',
    suffix: 'minutes',
    explanation:
      '**Step 1:** Toward each other, the gap closes at 12 + 18 = 30 miles per hour.\n**Step 2:** Time = 45 ÷ 30 = 1.5 hours.\n**Step 3:** Convert: 1.5 × 60 = **90** minutes.',
  },
  {
    kind: 'mcq',
    id: 'gre-rw-meet',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'Car A leaves a town at 9:00 a.m., driving at 45 miles per hour. At 11:00 a.m., car B leaves the same town on the same road in the same direction, driving at 75 miles per hour. At what time does car B catch up to car A?',
    options: ['12:30 p.m.', '1:00 p.m.', '2:00 p.m.', '3:00 p.m.', '5:00 p.m.'],
    correctIndex: 2,
    explanation:
      '**Step 1:** By 11:00, car A has driven 2 hours × 45 = 90 miles — that’s the head start.\n**Step 2:** Same direction, so B gains 75 − 45 = 30 miles per hour.\n**Step 3:** 90 ÷ 30 = 3 hours after 11:00 → **2:00 p.m.**\nCheck: at 2:00, A has gone 5 × 45 = 225 miles and B has gone 3 × 75 = 225 miles ✓.',
    distractorNotes: [
      'No step gives 1.5 hours.',
      '90 ÷ 45 uses A’s speed instead of the gap-closing speed.',
      'Correct.',
      'That’s 3 hours after noon, not after 11:00.',
      'No step gives 6 hours.',
    ],
  },
  // --- work ---------------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rw-work',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'Pipe A alone fills a tank in 4 hours, and pipe B alone fills it in 12 hours. Working together, how many hours do they take to fill the empty tank?',
    answer: 3,
    answerDisplay: '3',
    suffix: 'hours',
    explanation:
      '**Step 1:** Rates: A fills 1/4 of the tank per hour; B fills 1/12.\n**Step 2:** Add: 1/4 + 1/12 = 3/12 + 1/12 = 4/12 = 1/3 of the tank per hour.\n**Step 3:** 1/3 per hour → **3** hours. (Shortcut: 4 × 12 ÷ (4 + 12) = 48 ÷ 16 = 3.)',
  },
  {
    kind: 'mcq',
    id: 'gre-rw-work-two',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'Machine A makes 300 bolts in 5 hours, and machine B makes 300 bolts in 3 hours. Working together at these rates, how many hours will the two machines take to make 600 bolts?',
    options: ['3', '3.75', '4', '4.5', '8'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Rates: A makes 300 ÷ 5 = 60 bolts per hour; B makes 300 ÷ 3 = 100 per hour.\n**Step 2:** Together: 160 bolts per hour.\n**Step 3:** 600 ÷ 160 = **3.75** hours.',
    distractorNotes: [
      'No step gives 3.',
      'Correct.',
      'That averages the two times.',
      'No step gives 4.5.',
      'Adding the times makes working together slower than either machine alone.',
    ],
  },
  // --- mixtures --------------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-rw-mix',
    lessonId: 'gre-rates-work',
    difficulty: 2,
    prompt: 'How many liters of pure water must be added to 15 liters of a 40% acid solution to make a 25% acid solution?',
    answer: 9,
    answerDisplay: '9',
    suffix: 'liters',
    explanation:
      '**Step 1:** Acid stays fixed: 0.40 × 15 = 6 liters.\n**Step 2:** After adding w liters of water: 0.25 × (15 + w) = 6.\n**Step 3:** 15 + w = 6 ÷ 0.25 = 24, so w = **9** liters.\nCheck: 6 liters of acid in 24 liters = 25% ✓.',
  },
  {
    kind: 'mcq',
    id: 'gre-rw-mix-two',
    lessonId: 'gre-rates-work',
    difficulty: 3,
    prompt: 'How many ounces of a 50% salt solution must be added to 20 ounces of a 10% salt solution to make a 30% salt solution?',
    options: ['10', '15', '20', '25', '40'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Salt already there: 0.10 × 20 = 2 ounces. Salt added: 0.50x.\n**Step 2:** The final mix has 20 + x ounces, 30% salt: 2 + 0.5x = 0.3(20 + x) = 6 + 0.3x.\n**Step 3:** 0.2x = 4, so x = **20** ounces.\nCheck: 2 + 10 = 12 ounces of salt in 40 ounces = 30% ✓. (30% is exactly halfway between 10% and 50%, so equal amounts make sense.)',
    distractorNotes: [
      'With 10: 7 ounces of salt in 30 ounces ≈ 23%.',
      'With 15: 9.5 ounces in 35 ≈ 27%.',
      'Correct.',
      'With 25: 14.5 ounces in 45 ≈ 32%.',
      'With 40: 22 ounces in 60 ≈ 37%.',
    ],
  },
];
