import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-iss-task',
    lessonId: 'gre-issue-essay',
    difficulty: 1,
    prompt: 'Which of the following is most likely to lower an Issue essay’s score?',
    options: [
      'Taking a position that the reader personally disagrees with',
      'Ignoring the specific instructions that follow the prompt',
      'Using examples from history instead of current events',
      'Acknowledging a counterargument',
      'Writing in plain, clear language',
    ],
    correctIndex: 1,
    explanation: 'The instructions change from prompt to prompt (e.g. “address the most compelling reasons someone might disagree”), and essays that don’t follow them are penalized. Your particular opinion isn’t scored.',
    distractorNotes: [
      'There is no right position; readers score the reasoning.',
      'Correct.',
      'Any well-explained, relevant example works.',
      'Addressing the other side usually helps.',
      'Clarity is rewarded.',
    ],
  },
  {
    kind: 'short',
    id: 'gre-iss-thesis',
    lessonId: 'gre-issue-essay',
    difficulty: 2,
    prompt: 'Prompt: “Educational institutions should require all students to study a foreign language.” Write a one- or two-sentence thesis that takes a clear, QUALIFIED position on this claim.',
    rubric: [
      'States a clear position (agree or disagree) on requiring a foreign language',
      'Includes a qualification or condition that limits the position',
      'Gives at least a hint of the reason behind the position',
    ],
    modelAnswer:
      'Schools should require foreign-language study for most students, because learning another language builds both practical skills and an understanding of other cultures — but the requirement should allow flexibility for students whose time is better spent mastering the language of instruction first.',
  },
  {
    kind: 'short',
    id: 'gre-iss-counter',
    lessonId: 'gre-issue-essay',
    difficulty: 3,
    prompt: 'You argue that “Governments should fund the arts.” State the strongest counterargument someone might make, and then respond to it in two or three sentences.',
    rubric: [
      'States a genuine, strong counterargument (e.g. public money is limited and should go to essential needs)',
      'Responds to the counterargument directly rather than ignoring or dismissing it',
      'Explains why the original position still holds or how it is qualified in light of the counterargument',
    ],
    modelAnswer:
      'The strongest objection is that public money is scarce and should go to essentials like health and infrastructure before the arts. But arts funding is typically a tiny share of a budget, and it pays for things markets underprovide — access for people who can’t afford tickets, work that isn’t commercially viable but matters culturally. The objection shows funding should be modest and targeted, not that it should be zero.',
  },
];
