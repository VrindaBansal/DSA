import type { Question } from '@/lib/types';

// Practice questions for "The core word families" — family thinking and opposite families.

export const QUESTIONS: Question[] = [
  // --- families on a real question -----------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-vc-se',
    lessonId: 'gre-vocab-core',
    difficulty: 2,
    prompt:
      'The senator’s speech was so ___ that reporters struggled to find a single quotable line; her rival’s, by contrast, was filled with memorable, pointed phrases.\n\nSelect the **two** answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning.',
    options: ['insipid', 'pithy', 'vapid', 'succinct', 'hostile', 'lucid'],
    correctIndices: [0, 2],
    selectCount: 2,
    explanation:
      '**Step 1 — Clue:** no quotable lines, “by contrast” with memorable, pointed phrases.\n**Step 2 — Predict:** dull, empty.\n**Step 3 — Sort into families:** dull = insipid, vapid; concise and sharp = pithy, succinct; no partner = hostile, lucid.\n**Answer:** **insipid** and **vapid**. The pithy/succinct pair describes the rival’s speech — the other side of the contrast.',
    distractorNotes: [
      '✓ Lacking flavor or interest.',
      '✗ Concise and full of meaning — describes the rival.',
      '✓ Offering nothing stimulating.',
      '✗ Briefly and clearly expressed — a pair with pithy, but the wrong side of the contrast.',
      '✗ No partner, and nothing suggests hostility.',
      '✗ Clear — no partner, and clarity isn’t the issue.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-vc-meaning',
    lessonId: 'gre-vocab-core',
    difficulty: 2,
    prompt: 'The ___ student rarely spoke in class, but her written work showed she had followed every discussion closely.',
    options: ['reticent', 'garrulous', 'truculent', 'munificent', 'capricious'],
    correctIndex: 0,
    explanation:
      '**Step 1 — Clue:** “rarely spoke in class.”\n**Step 2 — Predict:** quiet, reluctant to speak.\n**Step 3 — Match:** **reticent** (reluctant to share your thoughts). **Garrulous** (talkative) is the opposite-family trap.',
    distractorNotes: [
      'Correct.',
      'Excessively talkative — the opposite of the clue.',
      'Eager to fight — no support in the sentence.',
      'Extremely generous — irrelevant.',
      'Changeable, unpredictable — irrelevant.',
    ],
  },
  // --- opposite families ----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-vc-opposite',
    lessonId: 'gre-vocab-core',
    difficulty: 1,
    prompt: 'Which word is most nearly OPPOSITE in meaning to **ephemeral**?',
    options: ['evanescent', 'enduring', 'transient', 'ubiquitous', 'meager'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Ephemeral means lasting a very short time.\n**Step 2:** Its opposite family is “long-lasting”: enduring, abiding, perennial, durable.\n**Answer:** **enduring**. Evanescent and transient are in ephemeral’s own family — the synonym trap.',
    distractorNotes: [
      'A synonym — quickly fading.',
      'Correct.',
      'A synonym — lasting only a short time.',
      'Found everywhere — unrelated to how long something lasts.',
      'Small in amount — unrelated to how long something lasts.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-vc-opposite-energy',
    lessonId: 'gre-vocab-core',
    difficulty: 2,
    prompt: 'Which word is most nearly OPPOSITE in meaning to **lethargic**?',
    options: ['torpid', 'sprightly', 'sluggish', 'indolent', 'placid'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Lethargic means sluggish and without energy — the “lazy” family.\n**Step 2:** The opposite family is “lively”: vivacious, spirited, sprightly, animated.\n**Answer:** **sprightly**. Torpid, sluggish, and indolent are all in lethargic’s own family.',
    distractorNotes: [
      'Same family — inactive.',
      'Correct — lively, full of energy.',
      'Same family — slow-moving.',
      'Same family — habitually lazy.',
      'Calm and peaceful — not the opposite of low energy, just a different idea.',
    ],
  },
];
