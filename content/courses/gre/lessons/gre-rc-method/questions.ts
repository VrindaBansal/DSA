import type { Question } from '@/lib/types';

const PASSAGE = `Many museums now allow visitors to photograph their collections, reversing long-standing bans. Supporters of the change argue that photography deepens engagement: visitors who photograph a work, they claim, look at it more closely and are more likely to remember it. Some research complicates this view. In one well-known study, participants who photographed objects on a museum tour later remembered fewer details of those objects than participants who simply observed them — unless they used the camera to zoom in on a specific feature.

The findings do not suggest that museums should restore their bans. They suggest instead that how visitors photograph matters more than whether they do. A snapshot taken to "capture" a work may substitute for looking at it; a photograph that directs attention to a detail may do the opposite.`;

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-rc-main',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'The primary purpose of the passage is to',
    options: [
      'argue that museums should restore bans on photography',
      'refine a claim about photography and engagement in light of research',
      'describe the history of museum photography policies',
      'prove that photographs always harm memory',
      'criticize museums for allowing photography',
    ],
    correctIndex: 1,
    explanation: 'The passage presents supporters’ claim, adds research that “complicates” it, and concludes that HOW visitors photograph matters — a refinement, not a rejection.',
    distractorNotes: [
      'The passage explicitly says the findings do NOT suggest restoring bans.',
      'Correct.',
      'The policy history is only the opening context.',
      'Too extreme — zooming in on details did not hurt memory.',
      'No criticism of museums is made.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rc-inference',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'It can be inferred from the passage that a visitor who photographs a painting in order to zoom in on the artist’s brushwork',
    options: [
      'will remember the painting less well than a visitor who takes no photographs',
      'may remember details of the painting at least as well as a visitor who only observes it',
      'is violating most museums’ current policies',
      'will not look at the painting directly',
      'is more interested in photography than in art',
    ],
    correctIndex: 1,
    explanation: 'The study found the memory cost disappeared for participants who zoomed in on a specific feature, and the author says a photo that directs attention to a detail “may do the opposite” of substituting for looking.',
    distractorNotes: [
      'The passage says the memory cost applied UNLESS participants zoomed in.',
      'Correct — cautious enough to be supported (“may,” “at least as well”).',
      'Many museums now ALLOW photography.',
      'Not supported — zooming directs attention to the work.',
      'Out of scope.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-rc-selectall',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'According to the passage, which of the following is true of the study it describes?\n\nConsider each of the choices separately and select all that apply.',
    options: [
      'Participants who photographed objects generally remembered fewer details than those who only observed.',
      'Zooming in on a feature was associated with an exception to that finding.',
      'The study was conducted in several countries.',
    ],
    correctIndices: [0, 1],
    explanation: 'The passage states both the general finding and the zoom exception. It says nothing about where the study took place.',
    distractorNotes: ['✓ Stated directly.', '✓ “unless they used the camera to zoom in on a specific feature.”', '✗ Never mentioned — out of scope.'],
  },
];
