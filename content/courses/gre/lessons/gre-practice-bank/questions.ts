import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-bank-mode',
    lessonId: 'gre-practice-bank',
    difficulty: 1,
    prompt: 'You want to practice pacing under real test conditions. Which practice-bank mode fits best?',
    options: ['A topic drill', 'A numbered set in timed mode', 'The mistakes list', 'The vocabulary drills', 'A numbered set in practice mode'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Pacing practice needs a real clock and no feedback until the end — just like the test.\n**Step 2:** Timed mode does exactly that; practice mode and drills show feedback after each question.\n**Answer:** **a numbered set in timed mode**.',
    distractorNotes: [
      'Drills target one skill, untimed.',
      'Correct.',
      'For fixing past misses.',
      'For building vocabulary.',
      'Practice mode gives feedback after each question — great for learning, not for pacing.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-bank-next',
    lessonId: 'gre-practice-bank',
    difficulty: 1,
    prompt: 'After a quant set, the topic breakdown shows 1/4 on “Work rates” and 90%+ everywhere else. What should you do next?',
    options: [
      'Nothing — the overall score is good',
      'A work-rates topic drill, and reread the rates lesson if the drill goes badly too',
      'Start the Advanced tier immediately',
      'Redo the same set from the start',
      'Stop practicing quant',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** A good overall score can hide one weak topic — here, work rates at 1/4.\n**Step 2:** A topic drill gives you ten fresh questions on exactly that skill.\n**Step 3:** If the drill goes badly too, the gap is the method — reread the lesson.\n**Answer:** **a work-rates drill, then the lesson if needed**.',
    distractorNotes: [
      'The weak topic will cost points on test day.',
      'Correct.',
      'Harder sets would include more work-rate questions you are getting wrong.',
      'The rest of the set is already mastered.',
      'Consistent practice is how the gains stick.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-bank-routing',
    lessonId: 'gre-practice-bank',
    difficulty: 2,
    prompt:
      'On a full-length practice test you get 6 of 12 right in the first Quant section, so you are routed to the easier second section, where you get 14 of 15 right. What is the most useful conclusion?',
    options: [
      'Your Quant score will be near the top of the scale, since you almost aced the second section.',
      'The first section cost you the most: the easier route limits how high your score can go, however well you do on it.',
      'Easier and harder second sections are scored identically, so the route doesn’t matter.',
      'You should leave the hardest first-section questions blank to save time.',
      'Routing depends on your essay score, not on the first section.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** The first section decides which second section you get — 7 or more right routes you to the harder one.\n**Step 2:** With 6 right, you got the easier second section, which caps your score well below the top of the scale, however well you do on it.\n**Step 3:** One more first-section question would have changed your route.\n**Answer:** **the first section cost you the most** — give it your sharpest focus.',
    distractorNotes: [
      'Acing an easier section can’t lift you to the top of the scale — that’s the whole point of routing.',
      'Correct.',
      'The two routes lead to different score ranges.',
      'Never leave a question blank — there is no penalty for guessing.',
      'The essay is scored separately and doesn’t affect routing.',
    ],
  },
];
