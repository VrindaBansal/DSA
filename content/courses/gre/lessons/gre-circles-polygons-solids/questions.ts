import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-circ-sector',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'In a circle with circumference 24π, what is the length of an arc cut off by a central angle of 60°?',
    options: ['2π', '4π', '6π', '12π', '24π'],
    correctIndex: 1,
    explanation: 'The arc is 60/360 = ⅙ of the circumference: ⅙ × 24π = **4π**.',
    distractorNotes: ['That is 1/12 of the circumference.', 'Correct.', 'Used ¼ instead of ⅙.', 'Used ½.', 'That is the whole circumference.'],
  },
  {
    kind: 'numeric',
    id: 'gre-circ-polygon',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'Each interior angle of a regular polygon measures 156°. How many sides does the polygon have?',
    answer: 15,
    answerDisplay: '15',
    explanation: 'Each exterior angle = 180° − 156° = 24°. Exterior angles sum to 360°, so n = 360 ÷ 24 = **15**.',
  },
  {
    kind: 'mcq',
    id: 'gre-circ-solid',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'A cylinder has radius 3 and height 10. If the radius is doubled and the height is halved, what is the new volume?',
    options: ['45π', '90π', '180π', '360π', '720π'],
    correctIndex: 2,
    explanation: 'Original: π(3²)(10) = 90π. New: π(6²)(5) = 180π. (Radius ×2 → ×4; height ×½ → ×½; net ×2.)',
    distractorNotes: ['Halved instead of doubling.', 'The original volume.', 'Correct.', 'Forgot to halve the height.', 'Not a valid combination.'],
  },
];
