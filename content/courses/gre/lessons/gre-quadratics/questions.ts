import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'multi',
    id: 'gre-quad-factor',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'Which of the following are solutions of x² + 2x − 15 = 0?\n\nIndicate all such values.',
    options: ['−5', '−3', '3', '5', '15'],
    correctIndices: [0, 2],
    explanation: 'Factor: numbers that multiply to −15 and add to 2 are 5 and −3 → (x + 5)(x − 3) = 0 → x = −5 or x = 3.',
    distractorNotes: ['✓ makes x + 5 = 0.', '✗ sign error — the factor is (x − 3), giving +3.', '✓ makes x − 3 = 0.', '✗ sign error — the factor is (x + 5), giving −5.', '✗ that is the constant term.'],
  },
  {
    kind: 'mcq',
    id: 'gre-quad-identity',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'If a − b = 4 and ab = 6, what is a² + b²?',
    options: ['10', '16', '22', '28', '40'],
    correctIndex: 3,
    explanation: '(a − b)² = a² − 2ab + b², so a² + b² = (a − b)² + 2ab = 16 + 12 = **28**.',
    distractorNotes: ['Added 4 and 6.', 'That is (a − b)² alone — forgot the 2ab.', 'Added ab only once.', 'Correct.', 'Not a valid step.'],
  },
  {
    kind: 'mcq',
    id: 'gre-quad-divide',
    lessonId: 'gre-quadratics',
    difficulty: 2,
    prompt: 'What are all the solutions of 3x² = 12x?',
    options: ['x = 4 only', 'x = 0 only', 'x = 0 or x = 4', 'x = −4 or x = 4', 'x = 0 or x = −4'],
    correctIndex: 2,
    explanation: '3x² − 12x = 0 → 3x(x − 4) = 0 → x = 0 or x = 4. Dividing both sides by x would lose x = 0.',
    distractorNotes: ['Lost x = 0 by dividing by x.', 'Missed x = 4.', 'Correct.', 'Treated it like x² = 16.', 'Sign error.'],
  },
];
