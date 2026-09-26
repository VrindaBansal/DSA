import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'blanks',
    id: 'gre-tcm-two',
    lessonId: 'gre-tc-multi',
    difficulty: 2,
    prompt: 'Once praised for its (i)_____ prose, the columnist’s writing has grown so (ii)_____ that editors now cut half of every piece.',
    blanks: [
      { options: ['economical', 'florid', 'obscure'], correctIndex: 0 },
      { options: ['terse', 'prolix', 'lucid'], correctIndex: 1 },
    ],
    explanation: '“Editors now cut half of every piece” means the writing has become too long: **prolix** (ii). “Once praised … has grown” marks a change, so (i) is the opposite — lean and efficient: **economical**.',
    blankNotes: [
      '**economical** = using no more words than needed. **florid** (overly ornate) would not be a contrast with long-windedness. **obscure** isn’t praise.',
      '**prolix** = tediously lengthy. **terse** is the opposite trap. **lucid** (clear) wouldn’t make editors cut.',
    ],
  },
  {
    kind: 'blanks',
    id: 'gre-tcm-three',
    lessonId: 'gre-tc-multi',
    difficulty: 3,
    prompt: 'The regime tried to (i)_____ news of the protests, but reports continued to (ii)_____ online, and the government’s (iii)_____ denials convinced no one.',
    blanks: [
      { options: ['disseminate', 'suppress', 'corroborate'], correctIndex: 1 },
      { options: ['proliferate', 'dwindle', 'stagnate'], correctIndex: 0 },
      { options: ['candid', 'mendacious', 'belated'], correctIndex: 1 },
    ],
    explanation: '“Tried to … but reports continued” → the regime tried to stop the news (i): **suppress**. Reports kept spreading (ii): **proliferate**. Denials of events everyone could see are lies (iii): **mendacious**.',
    blankNotes: [
      '**suppress** = forcibly stop. **disseminate** (spread) is the opposite trap. **corroborate** (confirm) makes no sense for a regime hiding news.',
      '**proliferate** = multiply rapidly. **dwindle** is the opposite; “but … continued to dwindle” contradicts the contrast.',
      '**mendacious** = lying. **candid** (honest) is the opposite. **belated** (late) is possible but the clue “convinced no one” is about truthfulness.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tcm-order',
    lessonId: 'gre-tc-multi',
    difficulty: 1,
    prompt: 'In a three-blank text completion, which blank should you usually solve first?',
    options: [
      'Always blank (i), because order matters',
      'The blank with the most direct clue in the sentence',
      'Blank (iii), because the last blank is always easiest',
      'The blank with the hardest vocabulary',
      'It doesn’t matter; guess each one independently',
    ],
    correctIndex: 1,
    explanation: 'Start where the sentence gives the strongest evidence, then use each solved blank as a new clue for the rest.',
    distractorNotes: [
      'Blank (i) often comes before the clues and is frequently the hardest.',
      'Correct.',
      'Sometimes true, but not a rule.',
      'Hard vocabulary is a reason to solve that blank LAST, after other blanks constrain it.',
      'The blanks depend on each other; that dependence is what makes them solvable.',
    ],
  },
];
