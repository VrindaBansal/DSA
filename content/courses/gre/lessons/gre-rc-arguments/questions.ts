import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-arg-assume',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'A city added a free shuttle between its train station and downtown. Over the next year, the number of people riding the train into the city rose by 15 percent. The mayor concludes that the shuttle attracted new train riders.',
    },
    prompt: 'The mayor’s conclusion depends on which of the following assumptions?',
    options: [
      'Train ridership would not have risen by as much over that year without the shuttle.',
      'The shuttle is inexpensive to operate.',
      'Most shuttle riders also own cars.',
      'The train station is the city’s largest.',
      'Downtown businesses support the shuttle.',
    ],
    correctIndex: 0,
    explanation: 'The argument moves from “ridership rose after the shuttle” to “the shuttle caused it.” It assumes the rise wasn’t going to happen anyway. Negate it — “ridership would have risen 15% regardless” — and the conclusion collapses.',
    distractorNotes: ['Correct.', 'Cost is irrelevant to whether it caused the rise.', 'Irrelevant.', 'Irrelevant.', 'Irrelevant to causation.'],
  },
  {
    kind: 'mcq',
    id: 'gre-arg-weaken',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'Hospitals in the region that offer free parking have higher patient-satisfaction scores than hospitals that charge for parking. A consultant concludes that eliminating parking fees would raise a hospital’s satisfaction scores.',
    },
    prompt: 'Which of the following, if true, most seriously weakens the consultant’s conclusion?',
    options: [
      'The hospitals with free parking are mostly small rural hospitals, whose patients report higher satisfaction on every measure.',
      'Parking fees at urban hospitals have risen.',
      'Satisfaction surveys are mailed to patients after discharge.',
      'Some patients arrive by public transit.',
      'Free parking is popular with hospital employees.',
    ],
    correctIndex: 0,
    explanation: 'A third factor — small rural hospitals, which score higher on everything — explains the correlation, so free parking may not be the cause.',
    distractorNotes: ['Correct.', 'Doesn’t address causation.', 'Irrelevant to the gap.', 'Slightly relevant, but doesn’t explain the correlation.', 'Employees aren’t the patients surveyed.'],
  },
  {
    kind: 'mcq',
    id: 'gre-arg-paradox',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'After a bakery cut the price of its basic white loaf by 20 percent, the total number of loaves of bread it sold rose by 30 percent. Yet its total revenue from bread fell.',
    },
    prompt: 'Which of the following, if true, best explains how revenue could fall?',
    options: [
      'Many customers switched from the bakery’s more expensive specialty breads to the discounted basic loaf.',
      'The bakery’s flour costs rose.',
      'A competitor also cut prices.',
      'The bakery advertised the price cut.',
      'Loaf sales rose most on weekends.',
    ],
    correctIndex: 0,
    explanation: 'More loaves can bring in less money if the extra sales are cheap loaves replacing expensive ones. Customers trading down from specialty breads to the discounted basic loaf lowers the average price per loaf enough for total revenue to fall. Costs (B) affect profit, not revenue.',
    distractorNotes: ['Correct.', 'Costs affect profit, not revenue.', 'Wouldn’t explain higher sales with lower revenue.', 'Would help sales, not explain the paradox.', 'Timing is irrelevant.'],
  },
];
