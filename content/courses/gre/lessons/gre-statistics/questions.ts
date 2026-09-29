import type { Question } from '@/lib/types';

// Practice questions for "Statistics" — two per idea, in lesson order.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

export const QUESTIONS: Question[] = [
  // --- mean via sums --------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-stat-avg',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt: 'Maya’s average on 4 tests is 82. What score must she get on the 5th test to raise her average to 85?',
    answer: 97,
    answerDisplay: '97',
    explanation:
      '**Step 1:** Total she has now: 4 × 82 = 328.\n**Step 2:** Total she needs for an 85 average over 5 tests: 5 × 85 = 425.\n**Step 3:** Fifth score = 425 − 328 = **97**.',
  },
  {
    kind: 'numeric',
    id: 'gre-stat-avg-remove',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'The average of 8 numbers is 15. When one of the numbers is removed, the average of the remaining 7 numbers is 14. What number was removed?',
    answer: 22,
    answerDisplay: '22',
    explanation:
      '**Step 1:** Sum of all 8: 8 × 15 = 120.\n**Step 2:** Sum of the remaining 7: 7 × 14 = 98.\n**Step 3:** The removed number is the difference: 120 − 98 = **22**.',
  },
  // --- weighted averages ------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-stat-weighted',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'In a class, the 12 boys have an average score of 70 and the 18 girls have an average score of 80. What is the average score for the whole class?',
    answer: 76,
    answerDisplay: '76',
    explanation:
      '**Step 1:** Boys’ total: 12 × 70 = 840. Girls’ total: 18 × 80 = 1,440.\n**Step 2:** Class total: 840 + 1,440 = 2,280, over 12 + 18 = 30 students.\n**Step 3:** 2,280 ÷ 30 = **76**. (Closer to 80, because there are more girls ✓.)',
  },
  {
    kind: 'mcq',
    id: 'gre-stat-weighted-qc',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'Group X has more members than group Y. The average age of group X is 70, and the average age of group Y is 90.\n\nCompare Quantity A and Quantity B.',
    stimulus: { quantities: { a: 'The average age of all the members of X and Y combined', b: '80' } },
    options: QC,
    correctIndex: 1,
    explanation:
      '**Step 1:** 80 is exactly halfway between 70 and 90 — that would be the combined average only if the groups were the same size.\n**Step 2:** X is bigger, so the combined average is pulled closer to X’s average, 70.\n**Answer:** the combined average is below 80, so **Quantity B is greater**. (Example: 20 people at 70 and 10 at 90 give 2,300 ÷ 30 ≈ 76.7.)',
    distractorNotes: [
      'That would need Y, the group averaging 90, to be the bigger group.',
      'Correct.',
      'Equal only if the groups were the same size.',
      'We don’t know the exact sizes, but X being bigger is enough to fix the direction.',
    ],
  },
  // --- median, mode, range --------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-stat-median',
    lessonId: 'gre-statistics',
    difficulty: 1,
    prompt: 'What is the median of 14, 3, 9, 21, 9, 30?',
    options: ['9', '11.5', '14', '14⅓', '15'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Sort: 3, 9, 9, 14, 21, 30.\n**Step 2:** Six numbers, so the middle two are the 3rd and 4th: 9 and 14.\n**Step 3:** Average them: (9 + 14) ÷ 2 = **11.5**.',
    distractorNotes: [
      '9 is the mode (it appears twice).',
      'Correct.',
      '14 is only the 4th value — with an even count, average the two middle values.',
      'That is the mean: 86 ÷ 6.',
      'That averages the 3rd and 4th numbers of the unsorted list (9 and 21) — sort first.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-stat-outlier',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'The number 50 is added to the list 3, 5, 5, 8, 9. Which of the following increase?\n\nIndicate all that apply.',
    options: ['the mean', 'the median', 'the mode', 'the range', 'the smallest value'],
    correctIndices: [0, 1, 3],
    explanation:
      '**Before:** mean 30 ÷ 5 = 6, median 5, mode 5, range 9 − 3 = 6.\n**After (3, 5, 5, 8, 9, 50):** mean 80 ÷ 6 ≈ 13.3, median (5 + 8) ÷ 2 = 6.5, mode still 5, range 50 − 3 = 47.\n**Answer:** the **mean, median, and range** increase. The mean jumps a lot; the median moves only a little.',
    distractorNotes: [
      '✓ 6 → about 13.3.',
      '✓ 5 → 6.5. It moves a little, because the middle shifts one spot.',
      '✗ 5 still appears most often.',
      '✓ 6 → 47.',
      '✗ The smallest value is still 3.',
    ],
  },
  // --- quartiles --------------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-stat-iqr',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt: 'What is the interquartile range of the data 14, 2, 9, 5, 20, 7, 4, 11?',
    answer: 8,
    answerDisplay: '8',
    explanation:
      '**Step 1:** Sort: 2, 4, 5, 7, 9, 11, 14, 20.\n**Step 2:** Lower half 2, 4, 5, 7 → Q1 = (4 + 5) ÷ 2 = 4.5. Upper half 9, 11, 14, 20 → Q3 = (11 + 14) ÷ 2 = 12.5.\n**Step 3:** IQR = 12.5 − 4.5 = **8**.',
  },
  {
    kind: 'mcq',
    id: 'gre-stat-quartile-share',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'In a large data set, the first quartile is 30, the median is 42, and the third quartile is 50. Approximately what percent of the values are between 30 and 42?',
    options: ['12.5%', '25%', '42%', '50%', '75%'],
    correctIndex: 1,
    explanation:
      '**Step 1:** About 25% of the values are below Q1 (30).\n**Step 2:** About 50% are below the median (42).\n**Step 3:** Between them: 50% − 25% = **25%**. (Each quartile slice holds about a quarter of the data, however wide or narrow it is.)',
    distractorNotes: [
      'That is half of a quartile slice.',
      'Correct.',
      '42 is a data value, not a percent.',
      '50% lies between Q1 and Q3 (30 to 50).',
      '75% is above Q1.',
    ],
  },
  // --- standard deviation --------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-stat-sd',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'Data set S has a standard deviation of 4. Each value in S is multiplied by 3, and then 10 is added to each result. What is the standard deviation of the new data set?',
    options: ['4', '12', '14', '22', '36'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Multiplying by 3 triples every gap, so the SD becomes 4 × 3 = 12.\n**Step 2:** Adding 10 slides everything over without changing the gaps.\n**Answer:** **12**.',
    distractorNotes: [
      'Multiplying every value by 3 stretches the gaps, so the SD changes.',
      'Correct.',
      'That adds 10 to the SD — shifts don’t change spread.',
      'That triples the SD and then adds 10 to it.',
      'That multiplies the SD by 9 (3²).',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-stat-sd-compare',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt: 'Which of the following lists of numbers has the greatest standard deviation?',
    options: ['10, 10, 10, 10', '1, 2, 3, 4', '100, 101, 102, 103', '2, 4, 6, 8', '5, 5, 6, 6'],
    correctIndex: 3,
    explanation:
      '**Step 1:** Ignore how big the numbers are — look at the spacing.\n**Step 2:** 1, 2, 3, 4 and 100, 101, 102, 103 are both spaced 1 apart (same SD). 2, 4, 6, 8 is the same pattern with gaps of 2, so its SD is **twice** as big.\n**Step 3:** 10, 10, 10, 10 has SD 0, and 5, 5, 6, 6 is tightly bunched.\n**Answer:** **2, 4, 6, 8**.',
    distractorNotes: [
      'All equal values → SD 0, the smallest possible.',
      'Gaps of 1 — half the spread of 2, 4, 6, 8.',
      'Big numbers, but gaps of only 1 — the same SD as 1, 2, 3, 4.',
      'Correct.',
      'Every value is within 0.5 of the mean — a small SD.',
    ],
  },
  // --- normal distribution ------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-stat-normal',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'Heights of a plant species are normally distributed with a mean of 40 cm and a standard deviation of 5 cm. Approximately what percent of the plants are taller than 45 cm?',
    options: ['2.5%', '16%', '34%', '50%', '84%'],
    correctIndex: 1,
    explanation:
      '**Step 1:** 45 cm is 5 above the mean — that’s +1 SD.\n**Step 2:** Above +1 SD are the two right-hand tail pieces: 13.5% + 2.5%.\n**Answer:** **16%**. (Or: 50% are above the mean, and 34% of those are below +1 SD: 50 − 34 = 16.)',
    distractorNotes: [
      'That is the percent above +2 SD (50 cm).',
      'Correct.',
      'That is the percent between 40 and 45 cm.',
      'That is the percent above the mean.',
      'That is the percent below 45 cm.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-stat-normal-count',
    lessonId: 'gre-statistics',
    difficulty: 2,
    prompt:
      'The scores of 2,000 students on a test are approximately normally distributed with a mean of 150 and a standard deviation of 8. Approximately how many students scored above 166?',
    answer: 50,
    answerDisplay: '50',
    explanation:
      '**Step 1:** 166 is 16 above the mean, and 16 ÷ 8 = 2, so 166 is +2 SD.\n**Step 2:** About 2.5% of the data is above +2 SD.\n**Step 3:** 2.5% of 2,000 = 0.025 × 2,000 = **50** students.',
  },
];
