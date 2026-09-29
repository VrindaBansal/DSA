import type { Question } from '@/lib/types';

// Practice questions for "Sentence equivalence", in lesson order.

const SE =
  '\n\nSelect the **two** answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning.';

export const QUESTIONS: Question[] = [
  // --- the method -------------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-se-pair',
    lessonId: 'gre-se-method',
    difficulty: 2,
    prompt: `Despite months of criticism from colleagues, the researcher remained ___, refusing to change a single conclusion in her report.${SE}`,
    options: ['intransigent', 'amenable', 'obdurate', 'pliant', 'garrulous', 'diffident'],
    correctIndices: [0, 2],
    selectCount: 2,
    explanation:
      '**Step 1 — Predict:** clue “refusing to change a single conclusion” → stubborn.\n**Step 2 — Find the pair:** **intransigent** and **obdurate** both mean unwilling to give in.\n**Step 3 — Check the other pair:** amenable and pliant are a pair too — but they mean easily persuaded, the opposite of the clue.',
    distractorNotes: [
      '✓ Unwilling to compromise.',
      '✗ Open to persuasion — the opposite pair.',
      '✓ Hardened against persuasion.',
      '✗ Easily influenced — the opposite pair.',
      '✗ Talkative; no partner.',
      '✗ Shy, lacking confidence; no partner.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-se-contrast',
    lessonId: 'gre-se-method',
    difficulty: 2,
    prompt: `Though the new chief executive had promised to transform the company, her first year brought only ___ changes: a new logo, a redesigned lobby, and little else.${SE}`,
    options: ['sweeping', 'cosmetic', 'radical', 'superficial', 'lucrative', 'controversial'],
    correctIndices: [1, 3],
    selectCount: 2,
    explanation:
      '**Step 1 — Predict:** “Though … promised to transform” sets up a contrast, and the clue lists surface-level changes (a logo, a lobby, “little else”) → shallow, surface-level.\n**Step 2 — Find the pair:** **cosmetic** and **superficial** both mean affecting only the surface.\n**Step 3 — Check the other pair:** sweeping and radical are a pair meaning far-reaching — what she promised, the other side of the contrast.',
    distractorNotes: [
      '✗ Far-reaching — what was promised, not what happened.',
      '✓ Affecting only appearance.',
      '✗ Fundamental — the trap pair with sweeping.',
      '✓ On the surface only.',
      '✗ Profitable; no partner and no support.',
      '✗ Causing disagreement; no partner, and a new logo isn’t described that way.',
    ],
  },
  // --- traps ------------------------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-se-lone',
    lessonId: 'gre-se-method',
    difficulty: 3,
    prompt: `The committee’s report was so ___ that even experts in the field needed several readings to follow its argument.${SE}`,
    options: ['abstruse', 'lucid', 'recondite', 'verbose', 'succinct', 'trenchant'],
    correctIndices: [0, 2],
    selectCount: 2,
    explanation:
      '**Step 1 — Predict:** even experts needed several readings → hard to understand.\n**Step 2 — Find the pair:** **abstruse** and **recondite** both mean obscure, difficult to understand.\n**Step 3 — Spot the traps:** verbose (wordy) could make a report hard to read, but it has no partner and doesn’t mean difficult — the lone-word trap. Lucid and succinct describe clear, easy writing.',
    distractorNotes: [
      '✓ Difficult to understand.',
      '✗ Clear — the opposite.',
      '✓ Obscure, known to few.',
      '✗ Wordy — tempting, but no partner, and wordy isn’t the same as hard to understand.',
      '✗ Brief and clear.',
      '✗ Sharp and incisive; no partner.',
    ],
  },
  // --- unknown words ---------------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-se-unknown',
    lessonId: 'gre-se-method',
    difficulty: 3,
    prompt: `The candidate’s answers were so ___ that voters often left her events unsure what, if anything, she had promised.${SE}`,
    options: ['equivocal', 'unequivocal', 'noncommittal', 'forthright', 'rousing', 'lengthy'],
    correctIndices: [0, 2],
    selectCount: 2,
    explanation:
      '**Step 1 — Predict:** voters were unsure what she promised → vague, avoiding commitment.\n**Step 2 — Pair up what you know:** unequivocal and forthright mean clear and direct — the opposite pair. Rousing and lengthy don’t match.\n**Step 3 — The answers:** **noncommittal** (not committing to a position) fits, and its partner is **equivocal** (deliberately unclear, open to more than one meaning).\nRoot check: *equi-* (equal) + *voc* (voice) — speaking “equally” for both sides.',
    distractorNotes: [
      '✓ Deliberately unclear.',
      '✗ Completely clear — the opposite (un- + equivocal).',
      '✓ Avoiding a clear position.',
      '✗ Direct and outspoken — pairs with unequivocal.',
      '✗ Stirring and exciting; no partner, and it says nothing about clarity.',
      '✗ Long; no partner — long answers can still be clear.',
    ],
  },
];
