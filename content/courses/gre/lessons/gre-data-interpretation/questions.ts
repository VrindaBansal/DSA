import type { Question } from '@/lib/types';

// Practice questions for "Data interpretation" — one or two per idea, in lesson
// order. Several share a display, as they do on the test.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

const TABLE = {
  caption: 'Enrollment by department',
  columns: ['', '2021', '2022', '2023'],
  rows: [
    ['Biology', '240', '270', '300'],
    ['History', '180', '171', '162'],
    ['Economics', '150', '195', '210'],
    ['Physics', '90', '96', '108'],
  ],
};

const BOOKS = {
  type: 'bar' as const,
  title: 'Books Sold by Genre, 2023 (thousands)',
  categories: ['Fiction', 'Mystery', 'Biography', 'Science', 'Travel'],
  series: [{ name: 'Books sold', values: [412, 198, 147, 96, 153] }],
  yLabel: 'Books sold (thousands)',
  yMax: 500,
  yStep: 100,
  showValues: true,
};

const REVENUE = {
  type: 'line' as const,
  title: 'Annual Revenue of Company A (millions of dollars)',
  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
  series: [{ name: 'Company A', values: [40, 50, 55, 66, 72, 88] }],
  yLabel: 'Revenue ($ millions)',
  yMax: 100,
  yStep: 20,
  showValues: true,
};

const BUDGET = {
  type: 'pie' as const,
  title: 'Company Budget of $2,400,000, by Category',
  categories: ['Salaries', 'Marketing', 'Research', 'Facilities', 'Other'],
  series: [{ name: 'Share', values: [45, 20, 15, 12, 8] }],
  unit: '%',
};

export const QUESTIONS: Question[] = [
  // --- read the display ------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-di-units',
    lessonId: 'gre-data-interpretation',
    difficulty: 1,
    stimulus: { charts: [BOOKS] },
    prompt: 'According to the graph, how many more mystery books than travel books were sold in 2023?',
    answer: 45000,
    answerDisplay: '45,000',
    explanation:
      '**Step 1:** Read the bars: Mystery 198, Travel 153.\n**Step 2:** Check the units — the title says **thousands**.\n**Step 3:** 198 − 153 = 45 thousand = **45,000** books. (Entering 45 is the trap.)',
  },
  // --- percent change vs actual change ------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-di-change',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { table: TABLE },
    prompt: 'Which department had the greatest percent increase in enrollment from 2021 to 2023?',
    options: [
      'The Economics department',
      'The History department',
      'The Biology department',
      'The Physics department',
      'It can’t be determined',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1:** Actual change 2021 → 2023: Biology +60, History −18, Economics +60, Physics +18.\n**Step 2:** Divide by the 2021 value: Biology 60/240 = 25%, Economics 60/150 = **40%**, Physics 18/90 = 20%. History went down.\n**Answer:** **Economics**. It tied Biology for the actual increase but started from a smaller number.',
    distractorNotes: [
      'Correct.',
      'History’s enrollment went down.',
      '+25% — the same actual gain as Economics, but from a bigger start.',
      '+20%.',
      'Everything needed is in the table.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-di-line',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { charts: [REVENUE] },
    prompt: 'Between which two consecutive years did Company A’s revenue increase by the greatest percent?',
    options: ['2018 to 2019', '2019 to 2020', '2020 to 2021', '2021 to 2022', '2022 to 2023'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Actual changes: +10, +5, +11, +6, +16.\n**Step 2:** Percent changes (divide by the earlier year): 10/40 = 25%, 5/50 = 10%, 11/55 = 20%, 6/66 ≈ 9%, 16/72 ≈ 22%.\n**Answer:** **2018 to 2019** (25%). The steepest segment, 2022 to 2023, has the biggest actual increase, but it starts from a much larger number.',
    distractorNotes: [
      'Correct.',
      '+10%.',
      '+20%.',
      'About +9%.',
      'The biggest actual increase (+16), but only about 22% of 72.',
    ],
  },
  // --- parts of a whole --------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-di-share',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { table: TABLE },
    prompt:
      'In 2023, Biology accounted for what percent of the total enrollment of the four departments? Give your answer to the nearest whole percent.',
    answer: (300 / 780) * 100,
    answerDisplay: '38',
    roundTo: 1,
    suffix: '%',
    explanation:
      '**Step 1:** 2023 total: 300 + 162 + 210 + 108 = 780.\n**Step 2:** Biology’s share: 300 ÷ 780 ≈ 0.385.\n**Answer:** about **38%**.',
  },
  {
    kind: 'numeric',
    id: 'gre-di-pie',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { charts: [BUDGET] },
    prompt: 'How many more dollars are budgeted for Marketing than for Facilities?',
    answer: 192000,
    answerDisplay: '192,000',
    prefix: '$',
    explanation:
      '**Step 1:** Subtract the percents first: Marketing 20% − Facilities 12% = 8%.\n**Step 2:** Turn it into dollars: 8% of $2,400,000 = 0.08 × 2,400,000.\n**Answer:** **$192,000**.',
  },
  // --- percent of a percent; averages ---------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-di-nested',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    prompt:
      'A school has 1,200 students. Of these, 35% study a foreign language, and 60% of the students who study a foreign language study Spanish. How many students study Spanish?',
    answer: 252,
    answerDisplay: '252',
    explanation:
      '**Step 1:** Students studying a language: 35% of 1,200 = 420.\n**Step 2:** The 60% is a percent **of those 420**, not of the whole school: 60% of 420 = **252**.\n(One step: 0.35 × 0.60 × 1,200 = 252.)',
  },
  {
    kind: 'numeric',
    id: 'gre-di-average',
    lessonId: 'gre-data-interpretation',
    difficulty: 1,
    stimulus: { table: TABLE },
    prompt: 'What was the average (arithmetic mean) annual enrollment in Economics for the three years shown?',
    answer: 185,
    answerDisplay: '185',
    explanation:
      '**Step 1:** Add the Economics row: 150 + 195 + 210 = 555.\n**Step 2:** Divide by the 3 years: 555 ÷ 3 = **185**.',
  },
  // --- estimate and compare ------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-di-estimate',
    lessonId: 'gre-data-interpretation',
    difficulty: 1,
    stimulus: { charts: [BOOKS] },
    prompt: 'Fiction books were approximately what percent of all the books sold in 2023?',
    options: ['20%', '30%', '40%', '50%', '60%'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Estimate the total: 412 + 198 + 147 + 96 + 153 ≈ 400 + 200 + 150 + 100 + 150 = 1,000 (thousand).\n**Step 2:** Fiction ≈ 400 of 1,000 = **40%**.\n(Exact: 412 ÷ 1,006 ≈ 41% — the choices are 10 points apart, so estimating is safe.)',
    distractorNotes: [
      'That is about Mystery’s share.',
      'Too low — Fiction is about 400 of about 1,000.',
      'Correct.',
      'That would need Fiction to equal all the other genres combined (about 594).',
      'Too high — the other genres add up to more than Fiction.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-di-ratio-qc',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { table: TABLE, quantities: { a: 'Economics’ share of the total 2021 enrollment', b: 'Economics’ share of the total 2023 enrollment' } },
    prompt: 'Compare Quantity A and Quantity B.',
    options: QC,
    correctIndex: 1,
    explanation:
      '**Step 1:** Totals: 2021 = 240 + 180 + 150 + 90 = 660. 2023 = 300 + 162 + 210 + 108 = 780.\n**Step 2:** A = 150/660 ≈ 23%. B = 210/780 ≈ 27%. (Benchmark: ¼ of 660 is 165, and 150 is below it; ¼ of 780 is 195, and 210 is above it.)\n**Answer:** **Quantity B is greater**.',
    distractorNotes: [
      'The total grew by 18%, but Economics grew by 40%, so its share went up.',
      'Correct.',
      'The shares differ: about 23% versus about 27%.',
      'Everything needed is in the table.',
    ],
  },
];
