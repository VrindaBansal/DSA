import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-coord-slope',
    lessonId: 'gre-coordinate',
    difficulty: 1,
    prompt: 'What is the slope of the line through (3, −4) and (−1, 4)?',
    options: ['−2', '−½', '½', '2', '0'],
    correctIndex: 0,
    explanation: 'Slope = (4 − (−4)) / (−1 − 3) = 8 / (−4) = **−2**.',
    distractorNotes: ['Correct.', 'Run over rise.', 'Sign and orientation errors.', 'Sign error — subtract in the same order top and bottom.', 'The points differ in y, so the slope isn’t 0.'],
  },
  {
    kind: 'mcq',
    id: 'gre-coord-perp',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'Line ℓ has equation 2x + 5y = 10. What is the slope of a line perpendicular to ℓ?',
    options: ['−5/2', '−2/5', '2/5', '5/2', '2'],
    correctIndex: 3,
    explanation: 'Rewrite ℓ: 5y = −2x + 10 → y = −(2/5)x + 2, so its slope is −2/5. The perpendicular slope is the negative reciprocal: **5/2**.',
    distractorNotes: ['Reciprocal without the sign flip.', 'That is ℓ’s own slope.', 'Sign flip without the reciprocal.', 'Correct.', 'Read the x-coefficient as the slope.'],
  },
  {
    kind: 'numeric',
    id: 'gre-coord-area',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'The line 3x + 4y = 24 forms a triangle with the x-axis and the y-axis. What is the area of that triangle?',
    answer: 24,
    answerDisplay: '24',
    explanation: 'x-intercept: y = 0 → x = 8. y-intercept: x = 0 → y = 6. The triangle has legs 8 and 6 along the axes: area = ½ × 8 × 6 = **24**.',
  },
];
