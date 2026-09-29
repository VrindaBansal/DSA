import type { Question } from '@/lib/types';

// Practice questions for "Reading comprehension — map, predict, prove", in lesson order.

const PASSAGE = `Many museums now allow visitors to photograph their collections, reversing long-standing bans. Supporters of the change argue that photography deepens engagement: visitors who photograph a work, they claim, look at it more closely and are more likely to remember it. Some research complicates this view. In one well-known study, participants who photographed objects on a museum tour later remembered fewer details of those objects than participants who simply observed them — unless they used the camera to zoom in on a specific feature.

The findings do not suggest that museums should restore their bans. They suggest instead that how visitors photograph matters more than whether they do. A snapshot taken to "capture" a work may substitute for looking at it; a photograph that directs attention to a detail may do the opposite.`;

const BEES = `For decades, ecologists assumed that a region's declining wild bees could be replaced by managed honeybee colonies, which farmers can rent and move from field to field. Recent field studies challenge that assumption. In orchards where wild bees were scarce, adding more honeybee hives raised fruit yields only slightly; in orchards with diverse wild-bee populations, yields were consistently higher, even when fewer honeybee hives were present. The researchers suggest that wild bees, which are active at different times of day and in different weather, provide pollination that honeybees alone cannot supply.`;

export const QUESTIONS: Question[] = [
  // --- the map -------------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-rc-main',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'The primary purpose of the passage is to',
    options: [
      'argue that museums should restore bans on photography',
      'refine a claim about photography and engagement in light of research',
      'describe the history of museum photography policies',
      'prove that photographs always harm memory',
      'criticize museums for allowing photography',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Map:** paragraph 1 gives the supporters’ claim, then research that “complicates” it. Paragraph 2 concludes that HOW visitors photograph matters.\n**Step 2 — Main point:** the claim isn’t rejected, it’s adjusted.\n**Answer:** **refine a claim … in light of research**.',
    distractorNotes: [
      'Distortion — the passage says the findings do NOT suggest restoring bans.',
      'Correct.',
      'True but too narrow — the policy change is only the opening context.',
      'Too extreme — zooming in on details did not hurt memory.',
      'Out of scope — no criticism of museums is made.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rc-function',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'The second paragraph primarily serves to',
    options: [
      'draw a practical conclusion from the research described in the first paragraph',
      'present new evidence that contradicts the study',
      'describe the design of the study in more detail',
      'argue that supporters of photography were entirely correct',
      'summarize the history of museum photography bans',
    ],
    correctIndex: 0,
    explanation:
      '**Step 1 — Read the paragraph’s first sentence:** “The findings do not suggest that museums should restore their bans.” It is responding to the findings.\n**Step 2 — What does it do?** It says what the findings DO mean: how visitors photograph matters.\n**Answer:** it **draws a practical conclusion from the research**.',
    distractorNotes: [
      'Correct.',
      'No new evidence appears — it interprets the same study.',
      'The study’s design isn’t described further.',
      'Too extreme — it says HOW people photograph matters, not that supporters were right.',
      'The history appears only briefly, in paragraph 1.',
    ],
  },
  // --- question types -----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-rc-inference',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt:
      'It can be inferred from the passage that a visitor who photographs a painting in order to zoom in on the artist’s brushwork',
    options: [
      'will remember the painting less well than a visitor who takes no photographs',
      'may remember details of the painting at least as well as a visitor who only observes it',
      'is violating most museums’ current policies',
      'will not look at the painting directly',
      'is more interested in photography than in art',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Find the lines:** the memory cost applied “unless they used the camera to zoom in on a specific feature,” and a photo that directs attention to a detail “may do the opposite” of replacing looking.\n**Step 2 — One small step:** zooming in on brushwork is exactly that case, so the memory cost may not apply.\n**Answer:** the cautious choice — **may remember details at least as well**.',
    distractorNotes: [
      'Distortion — the memory cost applied UNLESS participants zoomed in.',
      'Correct — cautious enough to be supported (“may,” “at least as well”).',
      'Distortion — many museums now ALLOW photography.',
      'Not supported — zooming in directs attention to the work.',
      'Out of scope.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rc-attitude',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'The author’s attitude toward the supporters’ claim that photography deepens engagement is best described as',
    options: ['unqualified endorsement', 'qualified acceptance', 'outright rejection', 'indifference', 'open hostility'],
    correctIndex: 1,
    explanation:
      '**Step 1 — Find the author’s reaction:** research “complicates” the claim, but the author says the findings don’t justify bans.\n**Step 2 — Weigh it:** the author accepts that photography can help — when it directs attention — but not in every case.\n**Answer:** **qualified acceptance** — agreement with conditions.',
    distractorNotes: [
      'Too strong — the author says research “complicates” the claim.',
      'Correct.',
      'Too strong the other way — the author rejects restoring bans.',
      'The author takes a clear position on what the findings mean.',
      'Nothing in the tone is hostile.',
    ],
  },
  // --- prove it ----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-rc-support',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'Which of the following statements is best supported by the passage?',
    options: [
      'Photographing artworks always reduces how well visitors remember them.',
      'The effect of photography on memory may depend on how the camera is used.',
      'Most museums have now lifted their bans on photography.',
      'Visitors who take photographs enjoy museums less than other visitors do.',
      'Zooming in on a feature improved memory more than simply observing did.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Test each choice against a sentence.**\n**Step 2:** “how visitors photograph matters more than whether they do” directly supports **(B)**.\n**Step 3 — Name the others:** (A) too extreme (“always”); (C) distortion (“many” became “most”); (D) out of scope (enjoyment is never discussed); (E) distortion (the passage says the memory cost disappeared, not that zooming beat observing).',
    distractorNotes: [
      'Too extreme — zooming in was the exception.',
      'Correct.',
      'Distortion — the passage says “many museums,” not most.',
      'Out of scope — enjoyment is never mentioned.',
      'Distortion — zooming removed the memory cost; the passage doesn’t say it beat observing.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rc-bees',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: BEES },
    prompt: 'Which of the following can most reasonably be inferred from the passage?',
    options: [
      'Honeybees are ineffective pollinators of fruit trees.',
      'Managed honeybee colonies may not fully make up for a loss of wild bees.',
      'Wild bee populations are declining mainly because of pesticide use.',
      'Farmers should stop renting honeybee hives.',
      'Wild bees visit more flowers per hour than honeybees do.',
    ],
    correctIndex: 1,
    explanation:
      '**Step 1 — Find the lines:** adding honeybee hives raised yields “only slightly” where wild bees were scarce, and wild bees provide pollination “that honeybees alone cannot supply.”\n**Step 2 — One small step:** honeybees can’t completely replace wild bees.\n**Answer:** **(B)**, worded cautiously (“may not fully”).',
    distractorNotes: [
      'Too extreme — honeybees did raise yields, just “only slightly.”',
      'Correct.',
      'Outside knowledge — the passage never says why wild bees are declining.',
      'Too extreme and out of scope — the passage gives no such advice.',
      'Out of scope — the passage explains the difference by timing and weather, not flowers per hour.',
    ],
  },
  // --- special formats -----------------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-rc-selectall',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt:
      'According to the passage, which of the following is true of the study it describes?\n\nConsider each of the choices separately and select all that apply.',
    options: [
      'Participants who photographed objects generally remembered fewer details than those who only observed.',
      'Zooming in on a feature was associated with an exception to that finding.',
      'The study was conducted in several countries.',
    ],
    correctIndices: [0, 1],
    explanation:
      '**Step 1 — Judge each choice on its own.**\n**Choice 1:** stated directly ✓.\n**Choice 2:** “unless they used the camera to zoom in on a specific feature” ✓.\n**Choice 3:** the passage never says where the study took place ✗.\n**Answer:** the first two.',
    distractorNotes: [
      '✓ Stated directly.',
      '✓ “unless they used the camera to zoom in on a specific feature.”',
      '✗ Never mentioned — out of scope.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-rc-sentence',
    lessonId: 'gre-rc-method',
    difficulty: 2,
    stimulus: { passage: PASSAGE },
    prompt: 'Select the sentence in the passage that presents evidence challenging the supporters’ view.',
    options: [
      '“Many museums now allow visitors to photograph their collections, reversing long-standing bans.”',
      '“Supporters of the change argue that photography deepens engagement…”',
      '“Some research complicates this view.”',
      '“In one well-known study, participants who photographed objects on a museum tour later remembered fewer details…”',
      '“They suggest instead that how visitors photograph matters more than whether they do.”',
    ],
    correctIndex: 3,
    explanation:
      '**Step 1 — Name the job:** presenting **evidence** that challenges the supporters.\n**Step 2 — Check the tempting one:** “Some research complicates this view” announces a challenge but gives no evidence.\n**Step 3:** the next sentence gives the evidence — the study’s results.\n**Answer:** **“In one well-known study…”**',
    distractorNotes: [
      'Background — no evidence about engagement.',
      'That states the supporters’ view itself.',
      'It announces a challenge but doesn’t present the evidence.',
      'Correct.',
      'That interprets the evidence rather than presenting it.',
    ],
  },
];
