import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-day-pace',
    lessonId: 'gre-test-day',
    difficulty: 1,
    prompt: 'You are 13 minutes into the second Quant section (15 questions, 26 minutes) and have finished 4 questions. What should you do?',
    options: [
      'Keep going at the same pace — accuracy matters most',
      'Speed up: guess and mark anything that isn’t quick, and aim to see every question',
      'Go back and check the first 4 answers',
      'Skip to the last question',
      'Stop answering and guess on everything',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Checkpoint:** in Quant 2 you should reach about question 8 by 13 minutes.\n**Step 2 — Compare:** you’ve finished only 4 — well behind. 13 minutes remain for 11 questions, about 1.2 minutes each.\n**Step 3 — Act:** switch to pass-1 mode — answer quick questions, guess and mark the rest, then use leftover time on marked ones.\n**Answer:** **speed up and aim to see every question**.',
    distractorNotes: [
      'At this pace you would reach only about 8 of 15 questions.',
      'Correct.',
      'Checking finished work while unseen questions remain wastes time.',
      'Order doesn’t matter much; the problem is overall pace.',
      'Overcorrection — you can still solve many questions.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-day-guess',
    lessonId: 'gre-test-day',
    difficulty: 1,
    prompt: 'On a five-choice question you can confidently eliminate two choices but can’t decide among the other three, and time is short. What is the best move?',
    options: [
      'Leave it blank to avoid a wrong answer',
      'Guess among the remaining three, mark it, and move on',
      'Spend as long as needed to be sure',
      'Pick the choice with the longest wording',
      'Pick choice (C), which is always most common',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** A blank scores zero. There’s no penalty for a wrong answer.\n**Step 2:** Guessing among the three remaining choices gives you a 1-in-3 chance.\n**Step 3:** Marking it lets you return if time allows.\n**Answer:** **guess among the three, mark it, and move on**.',
    distractorNotes: [
      'No penalty for wrong answers — blanks only lose.',
      'Correct.',
      'Costs time you need for other questions.',
      'Length is not a reliable signal.',
      'Answer positions aren’t biased.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-day-final',
    lessonId: 'gre-test-day',
    difficulty: 1,
    prompt: 'According to the lesson, when should you take your last full-length practice test?',
    options: ['The night before', 'The morning of the test', 'No later than 3–4 days before the test', 'Two months before', 'Never — practice tests cause stress'],
    correctIndex: 2,
    explanation:
      '**Step 1:** A full test is tiring — you need to recover before the real one.\n**Step 2:** You also need time to review what it shows.\n**Answer:** **no later than 3–4 days before the test**.',
    distractorNotes: ['Too tiring, too late to use the results.', 'Far too tiring.', 'Correct.', 'Too early to measure your final level.', 'Timed full tests are the best preparation for pacing.'],
  },
];
