import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'numeric',
    id: 'gre-rat-parts',
    lessonId: 'gre-ratios',
    difficulty: 1,
    prompt: 'In a jar, the ratio of red to blue marbles is 5 : 3, and there are 14 more red marbles than blue. How many marbles are in the jar?',
    answer: 56,
    answerDisplay: '56',
    explanation: 'The difference is 5 − 3 = 2 parts = 14, so one part = 7. Total = 8 parts = **56**.',
  },
  {
    kind: 'mcq',
    id: 'gre-rat-chain',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'If x : y = 3 : 4 and y : z = 6 : 5, what is x : z?',
    options: ['3 : 5', '9 : 10', '10 : 9', '9 : 5', '1 : 2'],
    correctIndex: 1,
    explanation: 'Make y match: y is 4 and 6 → use 12. x : y = 9 : 12, y : z = 12 : 10. So x : z = 9 : 10.',
    distractorNotes: [
      'Read straight across without matching y.',
      'Correct.',
      'That is z : x — reversed.',
      'Scaled one ratio the wrong way.',
      'Not supported.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rat-scale',
    lessonId: 'gre-ratios',
    difficulty: 2,
    prompt: 'Six identical printers print 720 pages in 4 minutes. At that rate, how many minutes would 8 such printers take to print 1,200 pages?',
    options: ['3', '4', '5', '6', '8'],
    correctIndex: 2,
    explanation: 'One printer: 720 ÷ (6 × 4) = 30 pages per minute. Eight printers: 240 pages per minute. 1,200 ÷ 240 = **5** minutes.',
    distractorNotes: [
      'Scaled pages up but ignored the extra printers’ effect the wrong way.',
      'Same as the original time — but both the printers and the pages changed.',
      'Correct.',
      'Forgot the 2 extra printers.',
      'Scaled time up with more printers.',
    ],
  },
];
