import type { Question } from '@/lib/types';

// Practice questions for "Percents" — two per idea, in lesson order.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

export const QUESTIONS: Question[] = [
  // --- forms and mental math ------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-pct-convert',
    lessonId: 'gre-percents',
    difficulty: 1,
    prompt: 'Which of the following is equal to 0.4%?',
    options: ['0.4', '0.04', '0.004', '4/10', '1/25'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Percent means “divide by 100,” so move the decimal point two places left.\n**Step 2:** 0.4 → 0.04 → 0.004.\n**Answer:** **0.004** (which is 1/250).',
    distractorNotes: [
      '0.4 is 40%.',
      '0.04 is 4% — only one place was moved.',
      'Correct.',
      '4/10 = 0.4 = 40%.',
      '1/25 = 0.04 = 4%.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-pct-mental',
    lessonId: 'gre-percents',
    difficulty: 1,
    prompt: 'What is 35% of 80?',
    answer: 28,
    answerDisplay: '28',
    explanation:
      '**Step 1:** 10% of 80 = 8, so 30% = 24.\n**Step 2:** 5% is half of 10%: 4.\n**Step 3:** 35% = 24 + 4 = **28**. (Or 0.35 × 80 = 28.)',
  },
  // --- translating ------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-pct-of',
    lessonId: 'gre-percents',
    difficulty: 1,
    prompt: '18 is what percent of 24?',
    answer: 75,
    answerDisplay: '75',
    suffix: '%',
    explanation:
      '**Step 1:** Translate: 18 = (x/100) × 24.\n**Step 2:** 18/24 = 0.75.\n**Step 3:** 0.75 = **75%**.\nThe number after “of” (24) is the whole, so it goes on the bottom.',
  },
  {
    kind: 'numeric',
    id: 'gre-pct-whole',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: '42 is 35% of what number?',
    answer: 120,
    answerDisplay: '120',
    explanation:
      '**Step 1:** Translate: 42 = 0.35 × x.\n**Step 2:** x = 42 ÷ 0.35 = 4,200 ÷ 35 = **120**.\nCheck: 10% of 120 is 12, so 30% is 36 and 5% is 6; 35% of 120 = 36 + 6 = 42 ✓.',
  },
  // --- percent change ---------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-pct-change',
    lessonId: 'gre-percents',
    difficulty: 1,
    prompt: 'The number of members in a club fell from 250 to 190. By what percent did the membership decrease?',
    answer: 24,
    answerDisplay: '24',
    suffix: '%',
    explanation:
      '**Step 1:** The change is 250 − 190 = 60.\n**Step 2:** Divide by the starting value: 60 ÷ 250 = 0.24.\n**Answer:** a **24%** decrease. (Dividing by 190 instead gives about 31.6% — the wrong base.)',
  },
  {
    kind: 'mcq',
    id: 'gre-pct-more-less',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'x is 25 percent greater than y, and y > 0.',
    stimulus: { quantities: { a: 'The percent by which y is less than x', b: '25%' } },
    options: QC,
    correctIndex: 1,
    explanation:
      '**Step 1:** Pick y = 100, so x = 125.\n**Step 2:** y is 25 less than x, and “less than x” means divide by x: 25/125 = 20%.\n**Step 3:** 20% < 25%, so **Quantity B is greater** — for every positive y, since the ratio is always the same.',
    distractorNotes: [
      'y is only 20% less than x.',
      'Correct: 25/125 = 20% < 25%.',
      'The difference is the same (25), but the bases differ (100 vs 125).',
      'The answer doesn’t depend on which positive y you pick.',
    ],
  },
  // --- multipliers --------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-pct-successive',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'A stock’s price increased by 50% in one year and decreased by 40% the next. The final price is what percent of the original price?',
    options: ['80%', '90%', '100%', '110%', '120%'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Multipliers: +50% → × 1.5 and −40% → × 0.6.\n**Step 2:** 1.5 × 0.6 = 0.9.\n**Answer:** the final price is **90%** of the original.\nCheck with $100: $100 → $150 → 40% of $150 is $60 off → $90 ✓.',
    distractorNotes: [
      'No step gives 0.8.',
      'Correct.',
      'The changes don’t cancel — the 40% drop is taken from a bigger number.',
      'Adding the percents (+50 − 40 = +10) is the trap.',
      'No step gives 1.2.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-pct-multiplier',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'Increasing a number by 20% and then decreasing the result by 25% is the same as multiplying the original number by',
    options: ['0.85', '0.9', '0.95', '1', '1.05'],
    correctIndex: 1,
    explanation:
      '**Step 1:** +20% → × 1.2. −25% → × 0.75.\n**Step 2:** 1.2 × 0.75 = 0.9.\n**Answer:** **0.9** — a 10% decrease overall.',
    distractorNotes: [
      'No step gives 0.85.',
      'Correct.',
      '+20 − 25 = −5% adds the percents; changes in a row multiply.',
      'The changes don’t cancel.',
      'No step gives 1.05.',
    ],
  },
  // --- working backward ----------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-pct-reverse',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'Including an 8% sales tax, a purchase cost $64.80. What was the price before tax, in dollars?',
    answer: 60,
    answerDisplay: '60',
    prefix: '$',
    explanation:
      '**Step 1:** Adding 8% tax multiplies the price by 1.08: price × 1.08 = 64.80.\n**Step 2:** price = 64.80 ÷ 1.08 = **60**.\nCheck: 8% of $60 is $4.80, and $60 + $4.80 = $64.80 ✓. (Taking 8% off $64.80 gives $59.62 — the wrong base.)',
  },
  {
    kind: 'mcq',
    id: 'gre-pct-reverse-two',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'After a 30% discount, a coat costs $84. What was its price before the discount?',
    options: ['$58.80', '$109.20', '$112', '$120', '$280'],
    correctIndex: 3,
    explanation:
      '**Step 1:** A 30% discount leaves 70%: original × 0.70 = 84.\n**Step 2:** original = 84 ÷ 0.70 = **$120**.\nCheck: 30% of $120 = $36, and $120 − $36 = $84 ✓.',
    distractorNotes: [
      'That takes another 30% off $84.',
      'That adds 30% of $84 — the discount was 30% of the original, not of $84.',
      '84 ÷ 0.75 treats it as a 25% discount.',
      'Correct.',
      '84 ÷ 0.30 treats $84 as the discount itself.',
    ],
  },
  // --- percent of a percent; points ------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-pct-points',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'A city’s unemployment rate fell from 8% to 6%. Which of the following statements is true?',
    options: [
      'The rate fell by 2 percent.',
      'The rate fell by 2 percentage points, a 25% decrease.',
      'The rate fell by 25 percentage points.',
      'The rate fell by 2 percentage points, a 33⅓% decrease.',
      'The rate fell by 6 percentage points.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Percentage points:** subtract the rates: 8 − 6 = 2 points.\n**Step 2 — Percent change:** divide the change by the original rate: 2/8 = 0.25 = 25%.\n**Answer:** a drop of **2 percentage points, which is a 25% decrease**.',
    distractorNotes: [
      'The drop is 2 percentage points, but as a percent it is 25%, not 2%.',
      'Correct.',
      'Points are found by subtracting the rates: 2, not 25.',
      '2/6 divides by the new rate; divide by the original, 8.',
      '6% is the new rate, not the change.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-pct-of-pct',
    lessonId: 'gre-percents',
    difficulty: 2,
    prompt: 'In a town, 40% of the residents own a car, and 30% of the car owners own an electric car. What percent of the town’s residents own an electric car?',
    answer: 12,
    answerDisplay: '12',
    suffix: '%',
    explanation:
      '**Step 1:** Electric-car owners are 30% of 40% of the residents.\n**Step 2:** 0.30 × 0.40 = 0.12.\n**Answer:** **12%**. Check with 100 residents: 40 own cars, 30% of 40 = 12 own electric cars.',
  },
  // --- interest ------------------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-pct-simple',
    lessonId: 'gre-percents',
    difficulty: 1,
    prompt: 'Sam deposits $5,000 in an account that pays 4% simple annual interest. How much interest does the account earn in 3 years?',
    answer: 600,
    answerDisplay: '600',
    prefix: '$',
    explanation:
      '**Step 1:** Simple interest is the same each year: 4% of $5,000 = $200.\n**Step 2:** 3 years × $200 = **$600**. (Formula: principal × rate × years = 5,000 × 0.04 × 3.)',
  },
  {
    kind: 'mcq',
    id: 'gre-pct-interest',
    lessonId: 'gre-percents',
    difficulty: 3,
    prompt: '$2,000 is invested at 10% annual interest, compounded annually. How much more interest does it earn in 3 years than it would at 10% simple interest?',
    options: ['$0', '$20', '$62', '$600', '$662'],
    correctIndex: 2,
    explanation:
      '**Step 1 — Simple:** 10% of $2,000 = $200 per year, so $600 in 3 years.\n**Step 2 — Compound:** $2,000 × 1.1³ = $2,000 × 1.331 = $2,662, so the interest is $662.\n**Step 3 — Difference:** $662 − $600 = **$62**.',
    distractorNotes: [
      'Compounding earns interest on earlier interest, so it earns more.',
      '$20 is the difference after 2 years, not 3.',
      'Correct.',
      '$600 is the simple interest itself.',
      '$662 is the compound interest itself.',
    ],
  },
];
