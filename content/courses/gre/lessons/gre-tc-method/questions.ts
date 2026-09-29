import type { Question } from '@/lib/types';

// Practice questions for "Text completion — the one-blank method", in lesson order.

export const QUESTIONS: Question[] = [
  // --- cover, clue, predict, match -----------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tc1-predict',
    lessonId: 'gre-tc-method',
    difficulty: 1,
    prompt:
      'The manager’s ___ approach to the budget — she questioned every expense, however small — frustrated some employees but saved the company millions.',
    options: ['cavalier', 'scrupulous', 'lavish', 'haphazard', 'indifferent'],
    correctIndex: 1,
    explanation:
      '**Step 1 — Clue:** “she questioned every expense, however small.”\n**Step 2 — Signal:** the dashes explain the blank — same direction.\n**Step 3 — Predict:** extremely careful.\n**Step 4 — Match:** **scrupulous** (very careful and thorough).',
    distractorNotes: [
      'Careless and offhand — the opposite of questioning every expense.',
      'Correct.',
      'Generous with spending — contradicts the clue.',
      'Without a plan — the opposite of her methodical approach.',
      'Uninterested — she cared intensely.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tc1-restate',
    lessonId: 'gre-tc-method',
    difficulty: 2,
    prompt:
      'The professor’s lectures were famously ___: she would wander from medieval history to her garden to a film she had seen, rarely returning to the day’s topic.',
    options: ['digressive', 'concise', 'rigorous', 'monotonous', 'erudite'],
    correctIndex: 0,
    explanation:
      '**Step 1 — Clue:** she wandered from topic to topic, “rarely returning to the day’s topic.”\n**Step 2 — Signal:** the colon means what follows explains the blank.\n**Step 3 — Predict:** wandering off the subject.\n**Step 4 — Match:** **digressive** (straying from the main subject).',
    distractorNotes: [
      'Correct.',
      'Brief and to the point — the opposite of wandering.',
      'Strict and precise — nothing in the clue supports it.',
      'Dull and unvarying — her lectures varied a lot.',
      'Scholarly — possibly true of a professor, but the clue is about wandering, not knowledge.',
    ],
  },
  // --- signals ----------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tc1-signal',
    lessonId: 'gre-tc-method',
    difficulty: 2,
    prompt:
      'Although the candidate’s supporters described her platform as visionary, her critics dismissed it as ___, a collection of slogans with no workable proposals.',
    options: ['pragmatic', 'innovative', 'vacuous', 'meticulous', 'radical'],
    correctIndex: 2,
    explanation:
      '**Step 1 — Clue:** “a collection of slogans with no workable proposals.”\n**Step 2 — Signal:** “Although … supporters … critics” — the critics’ view contrasts with “visionary.”\n**Step 3 — Predict:** empty, lacking substance.\n**Step 4 — Match:** **vacuous** (empty of ideas).',
    distractorNotes: [
      'Practical and workable — contradicts “no workable proposals.”',
      'A synonym for “visionary” — the supporters’ side of the contrast.',
      'Correct.',
      'Carefully detailed — the opposite of slogans.',
      'Tempting, since critics might say it, but the clue is about emptiness, not extremism.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tc1-colon',
    lessonId: 'gre-tc-method',
    difficulty: 2,
    prompt: 'The novel’s ending is deliberately ___: readers still argue about whether the narrator survives.',
    options: ['conclusive', 'ambiguous', 'derivative', 'tragic', 'redundant'],
    correctIndex: 1,
    explanation:
      '**Step 1 — Signal:** the colon means what follows explains the blank.\n**Step 2 — Clue:** readers still argue about what happened.\n**Step 3 — Predict:** unclear, open to more than one reading.\n**Step 4 — Match:** **ambiguous**.',
    distractorNotes: [
      'The opposite — a conclusive ending would settle the argument.',
      'Correct.',
      'Unoriginal — nothing in the clue is about originality.',
      'Possible in a story, but the clue is about uncertainty, not sadness.',
      'Unnecessarily repetitive — not supported.',
    ],
  },
  // --- unknown words -------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tc1-unknown',
    lessonId: 'gre-tc-method',
    difficulty: 3,
    prompt:
      'Rather than address the committee’s specific objections, the director responded with ___ generalities that committed him to nothing.',
    options: ['anodyne', 'incisive', 'pointed', 'explicit', 'trenchant'],
    correctIndex: 0,
    explanation:
      '**Step 1 — Clue:** “generalities that committed him to nothing.”\n**Step 2 — Predict:** bland, vague, safe.\n**Step 3 — Eliminate:** incisive, pointed, explicit, and trenchant all mean sharp or clear — the opposite of the clue.\n**Step 4 — One word left:** **anodyne** (bland, unlikely to offend) ✓. Even if you didn’t know it, elimination gets you there.',
    distractorNotes: [
      'Correct — bland and inoffensive.',
      'Sharp and penetrating — the opposite.',
      'Direct and sharp — the opposite.',
      'Clearly stated — the opposite of noncommittal.',
      'Forceful and cutting — the opposite.',
    ],
  },
  // --- topic trap -----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tc1-topic',
    lessonId: 'gre-tc-method',
    difficulty: 2,
    prompt:
      'The critic complained that the painter’s celebrated new series was ___: each canvas simply repeated techniques the artist had been using for decades.',
    options: ['aesthetic', 'derivative', 'abstract', 'luminous', 'avant-garde'],
    correctIndex: 1,
    explanation:
      '**Step 1 — Clue:** “each canvas simply repeated techniques the artist had been using for decades.”\n**Step 2 — Signal:** the colon explains the blank; “complained” tells you it’s negative.\n**Step 3 — Predict:** unoriginal, copied.\n**Step 4 — Match:** **derivative** (copying earlier work, unoriginal).\nThe other choices are art-topic words that don’t match the clue.',
    distractorNotes: [
      'About beauty — an art word, but not a complaint about repetition.',
      'Correct.',
      'A style of art — fits the topic, not the clue.',
      'Full of light — a compliment, and off the clue.',
      'Experimental and new — the opposite of repeating old techniques.',
    ],
  },
];
