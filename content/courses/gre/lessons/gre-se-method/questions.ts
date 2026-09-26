import type { Question } from '@/lib/types';

const SE = '\n\nSelect the **two** answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning.';

export const QUESTIONS: Question[] = [
  {
    kind: 'multi',
    id: 'gre-se-pair',
    lessonId: 'gre-se-method',
    difficulty: 2,
    prompt: `Despite months of criticism from colleagues, the researcher remained ___, refusing to change a single conclusion in her report.${SE}`,
    options: ['intransigent', 'amenable', 'obdurate', 'pliant', 'garrulous', 'diffident'],
    correctIndices: [0, 2],
    selectCount: 2,
    explanation: 'Clue: “refusing to change a single conclusion.” Prediction: stubborn. **Intransigent** and **obdurate** both mean unwilling to yield. **Amenable** and **pliant** are a pair too — meaning easily persuaded, the opposite of the clue.',
    distractorNotes: [
      '✓ unwilling to compromise.',
      '✗ open to persuasion — the opposite pair.',
      '✓ hardened against persuasion.',
      '✗ easily influenced — the opposite pair.',
      '✗ talkative; no partner.',
      '✗ shy, lacking confidence; no partner.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-se-lone',
    lessonId: 'gre-se-method',
    difficulty: 3,
    prompt: `The committee’s report was so ___ that even experts in the field needed several readings to follow its argument.${SE}`,
    options: ['abstruse', 'lucid', 'recondite', 'verbose', 'succinct', 'trenchant'],
    correctIndices: [0, 2],
    selectCount: 2,
    explanation: 'Clue: “even experts needed several readings.” Prediction: hard to understand. **Abstruse** and **recondite** both mean obscure, difficult to understand. **Verbose** (wordy) might make a report hard to read, but it has no partner here and doesn’t mean difficult. **Lucid** and **succinct** describe clear, easy writing.',
    distractorNotes: [
      '✓ difficult to understand.',
      '✗ clear — the opposite.',
      '✓ little known; obscure.',
      '✗ wordy — tempting, but no partner, and wordy isn’t the same as hard to understand.',
      '✗ brief and clear.',
      '✗ sharp and incisive; no partner.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-se-contrast',
    lessonId: 'gre-se-method',
    difficulty: 2,
    prompt: `Far from being ___, the new mayor answered every question at length and seemed to relish the reporters’ company.${SE}`,
    options: ['loquacious', 'taciturn', 'affable', 'reticent', 'voluble', 'hostile'],
    correctIndices: [1, 3],
    selectCount: 2,
    explanation: '“Far from” flips the clue: the mayor was talkative and sociable, so the blank means NOT talkative. **Taciturn** and **reticent** fit. **Loquacious** and **voluble** are a pair describing what the mayor actually was — the trap.',
    distractorNotes: [
      '✗ talkative — describes the mayor, but “far from” needs the opposite.',
      '✓ saying little.',
      '✗ friendly; no partner, and it describes the mayor.',
      '✓ reluctant to speak.',
      '✗ talkative — the trap pair with loquacious.',
      '✗ no partner and no support.',
    ],
  },
];
