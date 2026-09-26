import type { Question } from '@/lib/types';

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

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-di-change',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { table: TABLE },
    prompt: 'Which department had the greatest percent increase in enrollment from 2021 to 2023?',
    options: ['Biology', 'History', 'Economics', 'Physics', 'It cannot be determined from the table.'],
    correctIndex: 2,
    explanation: 'Biology: 60/240 = 25%. History: fell 10%. Economics: 60/150 = **40%**. Physics: 18/90 = 20%. Biology and Economics both grew by 60 students, but Economics started from a smaller base.',
    distractorNotes: ['+25% — same absolute gain as Economics, bigger base.', 'Decreased.', 'Correct.', '+20%.', 'Everything needed is in the table.'],
  },
  {
    kind: 'numeric',
    id: 'gre-di-share',
    lessonId: 'gre-data-interpretation',
    difficulty: 2,
    stimulus: { table: TABLE },
    prompt: 'In 2023, Biology accounted for what percent of the total enrollment of the four departments? Give your answer to the nearest whole percent.',
    answer: (300 / 780) * 100,
    answerDisplay: '38',
    roundTo: 1,
    suffix: '%',
    explanation: '2023 total = 300 + 162 + 210 + 108 = 780. Biology: 300 ÷ 780 ≈ 0.385 → **38%**.',
  },
];
