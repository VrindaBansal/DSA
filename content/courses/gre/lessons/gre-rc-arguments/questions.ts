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
      'The town’s library should open on Saturdays.',
      'Most residents who don’t use the library work during its current hours.',
      'Library visits rose in two nearby towns after they added Saturday hours.',
      'Saturday hours are more popular than weekday hours.',
      'The library currently has too few users.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1:** Ask of each statement: is it offered as a fact, or is it what the facts are meant to prove?\n**Step 2:** The survey and the nearby towns are facts — evidence. Both are given to support opening on Saturdays.\n**Answer:** **the library should open on Saturdays** (note the word *should*).',
    distractorNotes: [
      'Correct.',
      'Evidence — a survey result offered in support.',
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
      'Train ridership would not have risen by as much over that year without the shuttle.',
      'The shuttle is inexpensive to operate.',
      'Most shuttle riders also own cars.',
      'The train station is the city’s largest.',
      'Downtown businesses support the shuttle.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — The gap:** ridership rose after the shuttle started; the mayor says the shuttle caused it.\n**Step 2 — Negation test on (A):** “Ridership would have risen 15% anyway, shuttle or not.” Now the shuttle gets no credit — the argument collapses.\n**Answer:** **(A)** is required. Negating any other choice leaves the argument untouched.',
    distractorNotes: [
      'Correct.',
      'Negate it (“expensive”) — the shuttle could still have caused the rise.',
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
      'Hillcrest’s current textbook costs more than the new one.',
      'The rise in Riverside’s scores was not due mainly to some other change made at the same time.',
      'Riverside and Hillcrest have exactly the same number of students.',
      'Most teachers in Hillcrest would prefer the new textbook.',
      'Riverside’s scores will keep rising in future years.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — The gap:** the evidence says scores rose after the switch; the argument credits the textbook and assumes it will work elsewhere.\n**Step 2 — Negation test on (B):** “The rise was mainly due to something else, like new teachers.” Then the textbook may do nothing for Hillcrest — the argument collapses.\n**Answer:** **(B)**.',
    distractorNotes: [
      'Cost isn’t part of the argument about raising scores.',
      'Correct.',
      'Tempting because the argument compares the districts — but they don’t need to be identical in size. Negating it doesn’t break the argument.',
      'Teacher preference isn’t required for the textbook to work.',
      'The argument is about last year’s rise; future years aren’t needed.',
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
      'The hospitals with free parking are mostly small rural hospitals, whose patients report higher satisfaction on every measure.',
      'Parking fees at urban hospitals have risen.',
      'Satisfaction surveys are mailed to patients after discharge.',
      'Some patients arrive by public transit.',
      'Free parking is popular with hospital employees.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — The gap:** free parking and high satisfaction go together; the consultant says free parking causes it.\n**Step 2 — Weaken with another explanation:** (A) says the free-parking hospitals are small rural ones whose patients are happier about everything. Being small and rural — not parking — may explain the scores.\n**Answer:** **(A)**.',
    distractorNotes: [
      'Correct — a third factor explains the link.',
      'Doesn’t address whether parking causes satisfaction.',
      'How surveys are delivered doesn’t touch the gap.',
      'Slightly relevant, but doesn’t explain the link between free parking and satisfaction.',
      'Employees aren’t the patients being surveyed.',
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
      'In the city’s other neighborhoods, which did not get new lights, reported break-ins did not fall that year.',
      'Eastside residents generally approve of the new streetlights.',
      'The new streetlights use less electricity than the old ones.',
      'Eastside has more parked cars than most neighborhoods.',
      'Police began patrolling Eastside more often in January.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — The gap:** break-ins fell after the lights went up, but something else — like a citywide drop in crime — could explain it.\n**Step 2 — Strengthen by ruling that out:** (A) shows break-ins didn’t fall where there were no new lights, so a citywide trend is unlikely.\n**Answer:** **(A)**. Note that (E) does the opposite — it offers another cause, which weakens.',
    distractorNotes: [
      'Correct — it rules out a citywide explanation.',
      'Approval doesn’t show the lights caused anything.',
      'Energy use is off-topic.',
      'This doesn’t explain why break-ins fell.',
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
      'It relies on a sample that is unlikely to represent the city’s residents as a whole.',
      'It assumes that bike lanes will reduce traffic.',
      'It mistakes an effect for its cause.',
      'It ignores the cost of building bike lanes.',
      'It treats a percentage as if it were a total number.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — The gap:** the evidence is about readers of a cycling blog; the conclusion is about all residents.\n**Step 2 — Name the flaw:** cycling-blog readers are far more likely than average to favor bike lanes. That’s an **unrepresentative sample**.\n**Answer:** **(A)**.',
    distractorNotes: [
      'Correct.',
      'The argument never mentions traffic.',
      'No cause-and-effect claim is made.',
      'Cost doesn’t affect whether residents support the lanes.',
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
      'Many customers switched from the bakery’s more expensive specialty breads to the discounted basic loaf.',
      'The bakery’s flour costs rose.',
      'A competitor also cut prices.',
      'The bakery advertised the price cut.',
      'Loaf sales rose most on weekends.',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — The clash:** more loaves sold, but less money taken in.\n**Step 2 — What makes both true?** The average price per loaf must have dropped a lot.\n**Step 3:** (A) does it: customers traded down from expensive specialty breads to the cheap basic loaf. More loaves, lower average price — revenue can fall.\n**Answer:** **(A)**. Flour costs (B) affect profit, not revenue.',
    distractorNotes: [
      'Correct.',
      'Costs affect profit, not revenue.',
      'Doesn’t explain higher sales with lower revenue.',
      'Would help sales, but doesn’t explain the fall in revenue.',
      'When the sales happened doesn’t matter.',
    ],
  },
];
