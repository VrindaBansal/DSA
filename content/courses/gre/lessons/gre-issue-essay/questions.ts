import type { Question } from '@/lib/types';

// Practice questions for "The Issue essay", in lesson order.

export const QUESTIONS: Question[] = [
  // --- the task ----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-iss-task',
    lessonId: 'gre-issue-essay',
    difficulty: 1,
    prompt: 'Which of the following is most likely to lower an Issue essay’s score?',
    options: [
      'Taking a position that the reader personally disagrees with',
      'Using examples from history instead of current events',
      'Ignoring the specific instructions that follow the prompt',
      'Acknowledging a counterargument and answering it',
      'Writing in plain, clear language instead of jargon',
    ],
    correctIndex: 2,
    explanation:
      '**Step 1:** Readers score how well you argue, not which side you take — so your opinion itself can’t cost you.\n**Step 2:** The instructions change from prompt to prompt, and essays that don’t do what they ask lose points.\n**Answer:** **ignoring the specific instructions**.',
    distractorNotes: [
      'There is no right position; readers score the reasoning.',
      'Any relevant, well-explained example works.',
      'Correct.',
      'Addressing the other side usually helps.',
      'Clear writing is rewarded.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-iss-instructions',
    lessonId: 'gre-issue-essay',
    difficulty: 2,
    prompt:
      'Prompt: “Some people believe that universities should focus on preparing students for careers. Others believe universities should focus on broad intellectual development.”\n\nInstructions: “Write a response in which you discuss which view more closely aligns with your own position and explain your reasoning for the position you take. In developing and supporting your position, you should address both of the views presented.”\n\nWhat must a strong response do?',
    options: [
      'Discuss only the view you agree with, in as much depth as possible',
      'Address both views, and explain which is closer to your position and why',
      'Argue that both views are completely wrong and propose a third one instead',
      'Summarize both views fairly, without taking a position on either of them',
      'Focus on what would happen if a university adopted a new policy',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Read what the instructions require:** (a) say which view is closer to yours, with reasons, and (b) “address both of the views.”\n**Step 2:** A response must do both.\n**Answer:** **address both views and explain which is closer to yours and why**. You can still take a middle position — but you must engage both sides.',
    distractorNotes: [
      'The instructions say to address BOTH views.',
      'Correct.',
      'You must say which view is closer to your own.',
      'You must take a position.',
      'That’s a different set of instructions (the policy version).',
    ],
  },
  // --- thesis -------------------------------------------------------------------------------------
  {
    kind: 'short',
    id: 'gre-iss-thesis',
    lessonId: 'gre-issue-essay',
    difficulty: 2,
    prompt:
      'Prompt: “Educational institutions should require all students to study a foreign language.” Write a one- or two-sentence thesis that takes a clear, QUALIFIED position on this claim.',
    rubric: [
      'States a clear position (agree or disagree) on requiring a foreign language',
      'Includes a qualification or condition that limits the position',
      'Gives at least a hint of the reason behind the position',
    ],
    modelAnswer:
      'Schools should require foreign-language study for most students, because learning another language builds both practical skills and an understanding of other cultures — but the requirement should allow flexibility for students whose time is better spent mastering the language of instruction first.',
  },
  // --- body paragraphs ------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-iss-body',
    lessonId: 'gre-issue-essay',
    difficulty: 2,
    prompt:
      'Position: “Governments should keep funding public libraries even as more information moves online.”\nExample: “In many towns, the library is the only place where residents without home internet can apply for jobs online.”\n\nWhich sentence best explains how the example supports the position?',
    options: [
      'Libraries fill a gap the internet created, so they still need funding.',
      'Libraries have existed in some form for thousands of years.',
      'Many library users also enjoy borrowing novels and other books.',
      'This shows that the internet has been harmful to society as a whole.',
      'Job applications have become more complicated in recent years.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — What does the explanation need to do?** Connect the example (libraries give people internet access) to the position (keep funding libraries).\n**Step 2 — Check each choice for that link.** Only (A) says why the example matters for the position: the move online makes libraries MORE needed, not less.\n**Answer:** **(A)**.',
    distractorNotes: [
      'Correct.',
      'True, but it doesn’t connect the example to the position.',
      'A new point — it leaves the example unexplained.',
      'Overreaches — the essay isn’t arguing against the internet.',
      'Restates part of the example without linking it to funding.',
    ],
  },
  // --- counterargument ----------------------------------------------------------------------------
  {
    kind: 'short',
    id: 'gre-iss-counter',
    lessonId: 'gre-issue-essay',
    difficulty: 3,
    prompt:
      'You argue that “Governments should fund the arts.” State the strongest counterargument someone might make, and then respond to it in two or three sentences.',
    rubric: [
      'States a genuine, strong counterargument (e.g. public money is limited and should go to essential needs)',
      'Responds to the counterargument directly rather than ignoring or dismissing it',
      'Explains why the original position still holds or how it is qualified in light of the counterargument',
    ],
    modelAnswer:
      'The strongest objection is that public money is scarce and should go to essentials like health and infrastructure before the arts. But arts funding is typically a tiny share of a budget, and it pays for things markets underprovide — access for people who can’t afford tickets, work that isn’t commercially viable but matters culturally. The objection shows funding should be modest and targeted, not that it should be zero.',
  },
  // --- the plan ------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-iss-plan',
    lessonId: 'gre-issue-essay',
    difficulty: 1,
    prompt: 'You have 30 minutes for the Issue essay. Which plan is best?',
    options: [
      'Start typing immediately, to get the most possible writing time',
      'About 5 minutes planning, 22 writing, and 3 proofreading',
      'About 15 minutes planning, then 15 minutes writing',
      'Write two quick drafts, then keep the better of the two',
      'Write for the full 30 minutes and skip proofreading',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** A few minutes of planning — position, two reasons, two examples, a counterargument — makes the writing faster and better organized.\n**Step 2:** Most of the time should go to writing the full essay.\n**Step 3:** A short proofread catches missing words and confusing sentences.\n**Answer:** **5 plan · 22 write · 3 proofread**.',
    distractorNotes: [
      'Without a plan, essays wander and run out of time before the counterargument.',
      'Correct.',
      'Too much planning leaves too little time to write a full essay.',
      'There isn’t time for two drafts, and the editor keeps only one response.',
      'A quick proofread catches errors that make sentences hard to follow.',
    ],
  },
];
