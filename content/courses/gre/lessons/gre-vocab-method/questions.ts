import type { Question } from '@/lib/types';

// Practice questions for "How to learn GRE words" — one or two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- families --------------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-vm-family',
    lessonId: 'gre-vocab-method',
    difficulty: 1,
    prompt: 'Which of the following belong to the same meaning family as **obstinate**?\n\nIndicate all that apply.',
    options: ['intransigent', 'pliant', 'recalcitrant', 'amenable', 'obdurate'],
    correctIndices: [0, 2, 4],
    explanation:
      '**Step 1:** Obstinate means stubborn — refusing to change your mind.\n**Step 2:** Same family: **intransigent**, **recalcitrant**, and **obdurate** all mean stubborn.\n**Step 3:** **Pliant** and **amenable** are the opposite family — easily persuaded. They’re exactly the kind of choice the test uses as a trap.',
    distractorNotes: [
      '✓ Unwilling to compromise — stubborn.',
      '✗ Easily bent or influenced — the opposite family.',
      '✓ Stubbornly resisting authority — stubborn.',
      '✗ Open to suggestion — the opposite family.',
      '✓ Hardened against persuasion — stubborn.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-vm-odd-one',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt: 'Four of the following words belong to the same meaning family. Which word does NOT belong?',
    options: ['candid', 'forthright', 'frank', 'disingenuous', 'blunt'],
    correctIndex: 3,
    explanation:
      '**Step 1:** Find the family. Candid, forthright, frank, and blunt all mean **honest and direct**.\n**Step 2:** **Disingenuous** means pretending to be sincere or less informed than you are — not honest. It belongs to the opposite family.\n**Answer:** **disingenuous**.',
    distractorNotes: [
      'Candid means openly honest — in the family.',
      'Forthright means direct and outspoken — in the family.',
      'Frank means honest and direct — in the family.',
      'Correct — it means insincere, the opposite family.',
      'Blunt means direct, even to the point of rudeness — in the family.',
    ],
  },
  // --- roots ---------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-vm-root',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt: 'Using its parts (*mal-* = bad, *-vol-* = wish), what does **malevolent** most likely mean?',
    options: [
      'Wishing harm on others',
      'Eager to help others',
      'Speaking badly of people',
      'Easily fooled by others',
      'Talking far too much',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1:** Split it: *mal-* + *vol* + *-ent*.\n**Step 2:** *mal-* = bad; *vol* = wish (as in *volition*, your own choice or will).\n**Step 3:** Together: wishing bad things — **wishing harm on others**.\nIts opposite, *benevolent*, uses *bene-* (good).',
    distractorNotes: [
      'Correct.',
      'That is benevolent — bene- means good.',
      'That would need a “speak” root, like loqu- or dict-.',
      'That is credulous or gullible.',
      'That is loquacious.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-vm-root-cred',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt: 'Using its parts (*in-* = not, *cred-* = believe), what does **incredulous** most likely mean?',
    options: [
      'Dishonest in dealings with others',
      'Easily fooled by what others say',
      'So amazing it’s hard to believe',
      'Unwilling to believe something',
      'Unable to pay back money owed',
    ],
    correctIndex: 3,
    explanation:
      '**Step 1:** Split it: *in-* + *cred* + *-ulous* (full of, inclined to).\n**Step 2:** *in-* = not; *cred* = believe.\n**Step 3:** Together: not inclined to believe — **skeptical**. "She was incredulous when she heard the news" means she didn’t believe it.\nCareful: *incredible* describes the news (hard to believe); *incredulous* describes the person doubting it.',
    distractorNotes: [
      'Nothing in the parts means dishonest.',
      'That is credulous — the same root without the “not.”',
      'That is incredible. Incredulous describes the person who doubts.',
      'Correct.',
      'That borrows the money sense of “credit,” which the parts don’t support.',
    ],
  },
  // --- charge -------------------------------------------------------------------------------------
  {
    kind: 'blanks',
    id: 'gre-vm-charge',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt: 'Although critics had long considered the drug (i)_____, new studies suggest that its long-term effects may be (ii)_____.',
    blanks: [
      { options: ['innocuous', 'pernicious', 'lucrative'], correctIndex: 0 },
      { options: ['salutary', 'deleterious', 'negligible'], correctIndex: 1 },
    ],
    explanation:
      '**Step 1:** “Although” signals a contrast between the old view and the new findings.\n**Step 2:** New studies about “long-term effects” that overturn an old view point to harm: blank (ii) is negative — **deleterious** (harmful).\n**Step 3:** The old view is the opposite — harmless: blank (i) is **innocuous**.',
    blankNotes: [
      '**innocuous** = harmless. **pernicious** (harmful) would make “although” meaningless. **lucrative** (profitable) is off-topic.',
      '**deleterious** = harmful. **salutary** (beneficial) and **negligible** (tiny) don’t create the contrast.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-vm-charge-elim',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt: 'The film’s ___ reviews kept audiences away, and the studio pulled it from theaters after only a week.',
    options: ['scathing', 'adulatory', 'rhapsodic', 'complimentary', 'enthusiastic'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Charge: reviews that keep audiences away and get a film pulled are **negative**.\n**Step 2:** Cross out the positive words: complimentary and enthusiastic are clearly positive; adulatory (full of excessive praise) and rhapsodic (wildly enthusiastic) are positive too.\n**Answer:** **scathing** (harshly critical).',
    distractorNotes: [
      'Correct.',
      'Adulatory means full of excessive praise — positive.',
      'Rhapsodic means extremely enthusiastic — positive.',
      'Positive — praise wouldn’t keep audiences away.',
      'Positive — the opposite of what the sentence needs.',
    ],
  },
  // --- secondary meanings ----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-vm-secondary',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt:
      'The reviewer **qualified** her praise of the novel, noting that its final chapters were rushed. In this sentence, “qualified” most nearly means',
    options: ['limited', 'earned', 'certified', 'repeated', 'exaggerated'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Clue: she pointed out a flaw (“final chapters were rushed”) alongside her praise.\n**Step 2:** Pointing out a flaw holds the praise back.\n**Answer:** **limited** — to *qualify* a statement is to limit or soften it. The everyday meaning (“be eligible”) is the trap.',
    distractorNotes: [
      'Correct — the praise came with a limitation.',
      'The everyday “qualify for” sense doesn’t fit.',
      'The “licensed or certified” sense doesn’t fit.',
      'Nothing is repeated.',
      'The opposite: noting a flaw tones the praise down.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-vm-secondary-check',
    lessonId: 'gre-vocab-method',
    difficulty: 2,
    prompt: 'New regulations are intended to **check** the spread of the invasive beetle. In this sentence, “check” most nearly means',
    options: ['restrain', 'inspect', 'verify', 'mark', 'record'],
    correctIndex: 0,
    explanation:
      '**Step 1:** What do regulations do to the spread of a pest? They try to stop or slow it.\n**Step 2:** That’s the GRE sense of *check*: hold back, as in “kept in check.”\n**Answer:** **restrain**.',
    distractorNotes: [
      'Correct.',
      'The everyday sense — you don’t “inspect” a spread.',
      'Another everyday sense (“check your answer”) that doesn’t fit a spread.',
      'As in a check mark — it doesn’t fit.',
      'Regulations aim to stop the spread, not just note it.',
    ],
  },
  // --- routine ------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-vm-routine',
    lessonId: 'gre-vocab-method',
    difficulty: 1,
    prompt: 'Which study habit is most likely to make a new vocabulary word stick?',
    options: [
      'Rereading an alphabetical word list several times a day',
      'Memorizing the dictionary definition exactly, word for word',
      'Writing or saying a sentence of your own that uses the word',
      'Seeing 200 new words once each in a single long session',
      'Skipping the words you got wrong, so you can keep moving',
    ],
    correctIndex: 2,
    explanation:
      '**Step 1:** Memory improves most when you **produce** something, not just read it.\n**Step 2:** Using a word in your own sentence forces you to understand it and connects it to things you know.\n**Answer:** **write or say a sentence of your own**.',
    distractorNotes: [
      'Alphabetical lists group unrelated words, and rereading is passive.',
      'Memorizing wording isn’t the same as knowing how the word is used.',
      'Correct.',
      'Too many words, seen only once, won’t stick.',
      'Missed words are exactly the ones to review.',
    ],
  },
];
