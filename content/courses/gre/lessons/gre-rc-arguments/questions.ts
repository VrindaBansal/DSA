import type { Question } from '@/lib/types';

// Practice questions for "Argument questions", in lesson order.

export const QUESTIONS: Question[] = [
  // --- evidence, conclusion, gap -------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-arg-conclusion',
    lessonId: 'gre-rc-arguments',
    difficulty: 1,
    stimulus: {
      passage:
        'Our town’s library should open on Saturdays. In a recent survey, most residents who do not use the library said they work during its current weekday hours. And two nearby towns saw library visits rise sharply after they added Saturday hours.',
    },
    prompt: 'Which of the following is the main conclusion of the argument?',
    options: [
      'Most residents who don’t use the library work during its current hours.',
      'The town’s library should open on Saturdays as well as weekdays.',
      'Library visits rose in two nearby towns after they added Saturday hours.',
      'Saturday hours are more popular with residents than weekday hours.',
      'The library currently has too few users during its weekday hours.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1:** Ask of each statement: is it offered as a fact, or is it what the facts are meant to prove?\n**Step 2:** The survey and the nearby towns are facts — evidence. Both are given to support opening on Saturdays.\n**Answer:** **the library should open on Saturdays** (note the word *should*).',
    distractorNotes: [
      'Evidence — a survey result offered in support.',
      'Correct.',
      'Evidence — an example offered in support.',
      'Never claimed.',
      'Implied at most, not the claim being argued for.',
    ],
  },
  // --- assumptions ----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-arg-assume',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'A city added a free shuttle between its train station and downtown. Over the next year, the number of people riding the train into the city rose by 15 percent. The mayor concludes that the shuttle attracted new train riders.',
    },
    prompt: 'The mayor’s conclusion depends on which of the following assumptions?',
    options: [
      'The shuttle costs the city less to operate than it earns from new riders.',
      'Train ridership would not have risen as much that year without the shuttle.',
      'Most of the people who ride the shuttle also own cars they could drive.',
      'The train station is the largest station in the city’s transit system.',
      'Downtown business owners strongly support keeping the shuttle running.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — The gap:** ridership rose after the shuttle started; the mayor says the shuttle caused it.\n**Step 2 — Negation test on (B):** “Ridership would have risen 15% anyway, shuttle or not.” Now the shuttle gets no credit — the argument collapses.\n**Answer:** **(B)** is required. Negating any other choice leaves the argument untouched.',
    distractorNotes: [
      'Negate it (“expensive”) — the shuttle could still have caused the rise.',
      'Correct.',
      'Irrelevant to whether the shuttle caused the rise.',
      'Irrelevant.',
      'Irrelevant to causation.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-arg-assume-analogy',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'Last year the Riverside school district switched to a new math textbook, and its students’ average math scores rose by 8 points. The Hillcrest district, which has similar funding, should therefore adopt the same textbook to raise its own scores.',
    },
    prompt: 'The argument relies on which of the following assumptions?',
    options: [
      'Hillcrest’s current math textbook costs more than the new one would.',
      'Riverside’s average math scores will keep rising in each of the coming years.',
      'Riverside and Hillcrest have exactly the same number of students enrolled.',
      'Most math teachers in Hillcrest would prefer to teach from the new textbook.',
      'Riverside’s rise was not mainly due to another change made at the same time.',
    ],
    correctIndex: 4,
    explanation:
      '**Step 1 — The gap:** the evidence says scores rose after the switch; the argument credits the textbook and assumes it will work elsewhere.\n**Step 2 — Negation test on (E):** “The rise was mainly due to something else, like new teachers.” Then the textbook may do nothing for Hillcrest — the argument collapses.\n**Answer:** **(E)**.',
    distractorNotes: [
      'Cost isn’t part of the argument about raising scores.',
      'The argument is about last year’s rise; future years aren’t needed.',
      'Tempting because the argument compares the districts — but they don’t need to be identical in size. Negating it doesn’t break the argument.',
      'Teacher preference isn’t required for the textbook to work.',
      'Correct.',
    ],
  },
  // --- weaken and strengthen ------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-arg-weaken',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'Hospitals in the region that offer free parking have higher patient-satisfaction scores than hospitals that charge for parking. A consultant concludes that eliminating parking fees would raise a hospital’s satisfaction scores.',
    },
    prompt: 'Which of the following, if true, most seriously weakens the consultant’s conclusion?',
    options: [
      'Free parking is especially popular with the employees of the hospitals that offer it.',
      'Parking fees at the region’s urban hospitals have risen sharply in recent years.',
      'Satisfaction surveys are mailed to patients a few weeks after they are discharged.',
      'Some patients at every hospital in the region arrive there by public transit.',
      'The free-parking hospitals are mostly small rural ones, rated higher on every measure.',
    ],
    correctIndex: 4,
    explanation:
      '**Step 1 — The gap:** free parking and high satisfaction go together; the consultant says free parking causes it.\n**Step 2 — Weaken with another explanation:** (E) says the free-parking hospitals are small rural ones whose patients are happier about everything. Being small and rural — not parking — may explain the scores.\n**Answer:** **(E)**.',
    distractorNotes: [
      'Employees aren’t the patients being surveyed.',
      'Doesn’t address whether parking causes satisfaction.',
      'How surveys are delivered doesn’t touch the gap.',
      'Slightly relevant, but doesn’t explain the link between free parking and satisfaction.',
      'Correct — a third factor explains the link.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-arg-strengthen',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'In January, the city installed brighter streetlights in the Eastside neighborhood. Over the following year, reported car break-ins in Eastside fell by 30 percent. The city council concludes that the brighter lights caused the drop.',
    },
    prompt: 'Which of the following, if true, most strengthens the council’s conclusion?',
    options: [
      'Eastside has more cars parked on its streets overnight than most neighborhoods.',
      'Most Eastside residents say they approve of the brighter new streetlights.',
      'The new streetlights use much less electricity than the ones they replaced.',
      'In other neighborhoods, which got no new lights, break-ins did not fall that year.',
      'Police began patrolling the Eastside neighborhood more often in January.',
    ],
    correctIndex: 3,
    explanation:
      '**Step 1 — The gap:** break-ins fell after the lights went up, but something else — like a citywide drop in crime — could explain it.\n**Step 2 — Strengthen by ruling that out:** (D) shows break-ins didn’t fall where there were no new lights, so a citywide trend is unlikely.\n**Answer:** **(D)**. Note that (E) does the opposite — it offers another cause, which weakens.',
    distractorNotes: [
      'This doesn’t explain why break-ins fell.',
      'Approval doesn’t show the lights caused anything.',
      'Energy use is off-topic.',
      'Correct — it rules out a citywide explanation.',
      'This WEAKENS — it offers another explanation for the drop.',
    ],
  },
  // --- flaws ----------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-arg-flaw',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'An online poll on a popular cycling blog found that 85 percent of respondents favor adding bike lanes to Main Street. The blog’s editor concludes that most of the city’s residents support the new bike lanes.',
    },
    prompt: 'The editor’s reasoning is most vulnerable to which of the following criticisms?',
    options: [
      'It ignores how much building the new bike lanes on Main Street would cost.',
      'It assumes without evidence that adding bike lanes will reduce car traffic.',
      'It mistakes an effect of the bike lanes for the cause of their popularity.',
      'It relies on a sample unlikely to represent the city’s residents as a whole.',
      'It treats a percentage of respondents as if it were a total number of people.',
    ],
    correctIndex: 3,
    explanation:
      '**Step 1 — The gap:** the evidence is about readers of a cycling blog; the conclusion is about all residents.\n**Step 2 — Name the flaw:** cycling-blog readers are far more likely than average to favor bike lanes. That’s an **unrepresentative sample**.\n**Answer:** **(D)**.',
    distractorNotes: [
      'Cost doesn’t affect whether residents support the lanes.',
      'The argument never mentions traffic.',
      'No cause-and-effect claim is made.',
      'Correct.',
      'The argument uses the percentage correctly; the problem is who was asked.',
    ],
  },
  // --- paradox --------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-arg-paradox',
    lessonId: 'gre-rc-arguments',
    difficulty: 2,
    stimulus: {
      passage:
        'After a bakery cut the price of its basic white loaf by 20 percent, the total number of loaves of bread it sold rose by 30 percent. Yet its total revenue from bread fell.',
    },
    prompt: 'Which of the following, if true, best explains how revenue could fall?',
    options: [
      'The cost of the flour the bakery buys rose sharply over the same period.',
      'Many customers switched from pricier specialty breads to the discounted basic loaf.',
      'A competing bakery nearby also cut the prices of all of its own breads that month.',
      'The bakery advertised the price cut widely in local papers and online.',
      'Sales of the basic loaf rose most on weekends, when the bakery is busiest.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — The clash:** more loaves sold, but less money taken in.\n**Step 2 — What makes both true?** The average price per loaf must have dropped a lot.\n**Step 3:** (B) does it: customers traded down from expensive specialty breads to the cheap basic loaf. More loaves, lower average price — revenue can fall.\n**Answer:** **(B)**. Flour costs (A) affect profit, not revenue.',
    distractorNotes: [
      'Costs affect profit, not revenue.',
      'Correct.',
      'Doesn’t explain higher sales with lower revenue.',
      'Would help sales, but doesn’t explain the fall in revenue.',
      'When the sales happened doesn’t matter.',
    ],
  },
];
