import type { Question } from '@/lib/types';

// Practice questions for "Two- and three-blank completions", in lesson order.

export const QUESTIONS: Question[] = [
  // --- format and method ------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tcm-order',
    lessonId: 'gre-tc-multi',
    difficulty: 1,
    prompt: 'In a three-blank text completion, which blank should you usually solve first?',
    options: [
      'Always blank (i), because the blanks must be done in order',
      'The blank with the most direct clue in the sentence',
      'Blank (iii), because the last blank is always easiest',
      'The blank with the hardest vocabulary',
      'It doesn’t matter; guess each blank independently',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** The blanks depend on each other, so a solid first answer makes the others easier.\n**Step 2:** The most solid answer comes from the blank with the strongest clue — wherever it is.\n**Answer:** start with **the blank that has the most direct clue**, then use it as a clue for the rest.',
    distractorNotes: [
      'Blank (i) often comes before the clues and is frequently the hardest.',
      'Correct.',
      'Sometimes true, but not a rule.',
      'Hard vocabulary is a reason to solve that blank LAST, after the others narrow it down.',
      'The blanks depend on each other — that connection is what makes them solvable.',
    ],
  },
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
    explanation:
      '**Step 1 — Start with (ii):** “editors now cut half of every piece” means the writing has become far too long: **prolix** (tediously wordy).\n**Step 2 — Structure:** “Once praised … has grown” marks a change, so (i) is the opposite of (ii).\n**Step 3 — Blank (i):** lean and efficient: **economical**.\n**Step 4 — Reread:** “Once praised for its economical prose … has grown so prolix that editors now cut half.” ✓',
    blankNotes: [
      '**economical** = using no more words than needed. **florid** (overly fancy) wouldn’t contrast with wordiness. **obscure** (unclear) isn’t something writing is praised for.',
      '**prolix** = tediously long. **terse** (very brief) is the opposite trap. **lucid** (clear) wouldn’t make editors cut.',
    ],
  },
  // --- structures ------------------------------------------------------------------------------------
  {
    kind: 'blanks',
    id: 'gre-tcm-pattern',
    lessonId: 'gre-tc-multi',
    difficulty: 3,
    prompt:
      'The biography is not (i)_____ but (ii)_____: it records the general’s blunders as carefully as his victories.',
    blanks: [
      { options: ['hagiographic', 'balanced', 'cursory'], correctIndex: 0 },
      { options: ['evenhanded', 'adulatory', 'superficial'], correctIndex: 0 },
    ],
    explanation:
      '**Step 1 — Structure:** “not (i) but (ii)” — the blanks are opposites, and the clue supports (ii).\n**Step 2 — Blank (ii):** it records blunders “as carefully as” victories — fair to both sides: **evenhanded**.\n**Step 3 — Blank (i):** the opposite of fair here is one-sidedly flattering: **hagiographic** (treating its subject like a saint).\n**Step 4 — Reread:** “not hagiographic but evenhanded: it records the general’s blunders as carefully as his victories.” ✓',
    blankNotes: [
      '**hagiographic** = excessively flattering. **balanced** is what the book IS — it belongs in (ii)’s meaning, not (i). **cursory** (hasty) doesn’t contrast with careful fairness in the right way.',
      '**evenhanded** = fair to all sides. **adulatory** (full of praise) is what the book is NOT. **superficial** contradicts “records … carefully.”',
    ],
  },
  {
    kind: 'blanks',
    id: 'gre-tcm-three',
    lessonId: 'gre-tc-multi',
    difficulty: 3,
    prompt:
      'The regime tried to (i)_____ news of the protests, but reports continued to (ii)_____ online, and the government’s (iii)_____ denials convinced no one.',
    blanks: [
      { options: ['disseminate', 'suppress', 'corroborate'], correctIndex: 1 },
      { options: ['proliferate', 'dwindle', 'stagnate'], correctIndex: 0 },
      { options: ['candid', 'mendacious', 'belated'], correctIndex: 1 },
    ],
    explanation:
      '**Step 1 — Structure:** “tried to (i) … but reports continued” — (i) is an attempt that failed.\n**Step 2 — Blank (i):** a regime trying to stop news: **suppress**.\n**Step 3 — Blank (ii):** the attempt failed, so reports kept spreading: **proliferate**.\n**Step 4 — Blank (iii):** denials of events everyone could see, which “convinced no one” — lies: **mendacious**.',
    blankNotes: [
      '**suppress** = forcibly stop. **disseminate** (spread) is the opposite trap. **corroborate** (confirm) makes no sense for a regime hiding news.',
      '**proliferate** = multiply quickly. **dwindle** is the opposite; “but … continued to dwindle” breaks the contrast.',
      '**mendacious** = lying. **candid** (honest) is the opposite. **belated** (late) is possible, but “convinced no one” is about truthfulness.',
    ],
  },
];
