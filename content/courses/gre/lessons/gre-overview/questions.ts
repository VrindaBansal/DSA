import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-ov-scale',
    lessonId: 'gre-overview',
    difficulty: 1,
    prompt: 'On the GRE, the Verbal and Quantitative sections are each reported on which scale?',
    options: [
      '0–6, in half-point steps',
      '1–36, in 1-point steps',
      '200–800, in 10-point steps',
      '130–170, in 1-point steps',
      '0–100, as a percentile',
    ],
    correctIndex: 3,
    explanation:
      '**Step 1:** Verbal and Quant each get a scaled score from **130 to 170**, in 1-point steps.\n**Step 2:** The 0–6 scale belongs to Analytical Writing — that’s the common mix-up.\n**Answer:** **130–170, in 1-point steps**.',
    distractorNotes: [
      'That is the Analytical Writing scale.',
      'That is the ACT scale.',
      'That is the old SAT section scale.',
      'Correct.',
      'The GRE reports scaled scores, not a percentage.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-ov-adaptive',
    lessonId: 'gre-overview',
    difficulty: 2,
    prompt: 'Halfway through your second Quant section, the questions feel noticeably harder than in the first. What is the most reasonable interpretation?',
    options: [
      'You are doing badly, and the test is adapting question by question to trap you.',
      'You likely did well on the first Quant section, so you got the harder second one.',
      'The second section is unscored, so how hard it feels doesn’t matter at all.',
      'The test assigns difficulty at random, so the harder questions mean nothing.',
      'You should slow down and spend extra time on each question to make up for it.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** The GRE adapts by section, not question by question.\n**Step 2:** Your first Quant section decides whether the second is easier or harder.\n**Step 3:** So a harder second section usually means the first went well — and it’s where high scores come from.\n**Answer:** you probably did well on the first section.',
    distractorNotes: [
      'The GRE does not adapt question by question.',
      'Correct.',
      'Both sections count; the current GRE has no unscored section.',
      'Difficulty is not random — it is based on your first section.',
      'Pacing rules still apply; slowing down costs you other questions.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-ov-types',
    lessonId: 'gre-overview',
    difficulty: 1,
    prompt: 'Which of the following question types appear in the Verbal Reasoning sections?\n\nIndicate all that apply.',
    options: ['Text completion', 'Quantitative comparison', 'Sentence equivalence', 'Reading comprehension', 'Numeric entry'],
    correctIndices: [0, 2, 3],
    explanation:
      '**Step 1:** Verbal has three question types: text completion, sentence equivalence, and reading comprehension (which includes short argument paragraphs).\n**Step 2:** Quantitative comparison and numeric entry belong to Quant.\n**Answer:** **text completion, sentence equivalence, reading comprehension**.',
    distractorNotes: ['✓ Verbal.', '✗ Quant.', '✓ Verbal.', '✓ Verbal.', '✗ Quant.'],
  },
  {
    kind: 'mcq',
    id: 'gre-ov-strategy',
    lessonId: 'gre-overview',
    difficulty: 1,
    prompt: 'With one minute left in a Verbal section, you have four questions you haven’t answered. What should you do?',
    options: [
      'Leave them blank, since a wrong answer costs you more than a blank one.',
      'Answer only the ones you are at least 50% sure about, and skip the rest.',
      'Work carefully on the first one and hope for time on the others.',
      'Go back and double-check the answers you have already given.',
      'Answer all four quickly, then spend any time left on the fastest one.',
    ],
    correctIndex: 4,
    explanation:
      '**Step 1:** There is no penalty for wrong answers, so a blank is always worse than a guess.\n**Step 2:** Lock in a guess on all four first — that takes seconds.\n**Step 3:** Then use whatever time is left to try to improve one of them.\n**Answer:** **guess on all four, then work on the fastest one**.',
    distractorNotes: [
      'Wrong answers cost nothing on the GRE — blanks just throw away chances.',
      'Even a pure guess has positive expected value.',
      'Risks leaving three blanks.',
      'Unanswered questions are worth more attention than checked ones.',
      'Correct.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-ov-pace',
    lessonId: 'gre-overview',
    difficulty: 1,
    prompt: 'The second Quant section has 15 questions in 26 minutes. If you have used 13 minutes and answered 6 questions, how many minutes per question do you have left for the remaining questions? Round to the nearest tenth.',
    answer: 13 / 9,
    answerDisplay: '1.4',
    roundTo: 0.1,
    explanation:
      '**Step 1:** Time left: 26 − 13 = 13 minutes.\n**Step 2:** Questions left: 15 − 6 = 9.\n**Step 3:** 13 ÷ 9 ≈ **1.4** minutes each — below the 1.75-minute average, so it’s time to speed up or skip a hard one.',
  },
];
