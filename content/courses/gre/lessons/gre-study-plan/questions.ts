import type { Question } from '@/lib/types';

export const QUESTIONS: Question[] = [
  {
    kind: 'mcq',
    id: 'gre-plan-parts',
    lessonId: 'gre-study-plan',
    difficulty: 1,
    prompt: 'You finished the percents lesson yesterday and answered all its checks correctly. Today you missed 3 percent questions in a practice set. Where will those 3 questions show up again?',
    options: [
      'Nowhere — practice sets are one-time only',
      'In your review queue, starting tomorrow',
      'Only if you manually bookmark them',
      'In the lesson’s checks',
      'In the next numbered set, unchanged',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** Every missed bank question goes into your review queue automatically (and into the bank’s Mistakes tab).\n**Step 2:** It comes back after a day, then at growing intervals as you get it right — for quant, usually as a fresh variant with new numbers.\n**Answer:** **in your review queue, starting tomorrow**.',
    distractorNotes: [
      'Misses are recorded and scheduled for review.',
      'Correct.',
      'No bookmarking needed — it is automatic.',
      'Lesson checks are fixed; misses go to review.',
      'Each question appears in exactly one numbered set.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-plan-miss',
    lessonId: 'gre-study-plan',
    difficulty: 2,
    prompt: 'You keep missing successive-percent questions by choosing the answer that adds the two percents (e.g. +20% then −10% → “+10%”). What is the best next step?',
    options: [
      'Do more mixed practice sets and hope it improves',
      'Reread the percents lesson section on successive changes, then do a topic drill on successive percents',
      'Skip percent questions on the test',
      'Memorize the answers to the questions you missed',
      'Move on to geometry, since percents are a small topic',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Diagnose:** the same trap every time (adding percents instead of multiplying the factors) means it’s a **method** problem, not bad luck.\n**Step 2 — Fix the method:** reread the lesson section that teaches successive changes.\n**Step 3 — Make it automatic:** drill that exact topic until you stop falling for the trap.\n**Answer:** **reread the section, then do a topic drill**.',
    distractorNotes: [
      'Mixed sets have only a question or two of this type — too slow to fix a method gap.',
      'Correct.',
      'Percent questions are common and learnable.',
      'Variants will use new numbers; memorized answers won’t help.',
      'Leaving a known weakness unfixed costs points on every test.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-plan-tier',
    lessonId: 'gre-study-plan',
    difficulty: 1,
    prompt: 'According to the plan, what should change in week 4?',
    options: [
      'Stop doing verbal practice',
      'Start doing at least one timed set, to practice pacing',
      'Take all the official practice tests',
      'Skip the review queue',
      'Only study vocabulary',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** Weeks 1–3 build methods with untimed practice.\n**Step 2:** Week 4 adds your first **timed** set in each track, because only timed practice teaches pacing.\n**Answer:** **start doing at least one timed set**.',
    distractorNotes: [
      'Both tracks continue throughout.',
      'Correct.',
      'Official tests are for weeks 7–8.',
      'The review queue runs every day.',
      'Vocabulary continues alongside everything else.',
    ],
  },
];
