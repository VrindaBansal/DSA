// Practice Test 5 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const goodhart = `"When a measure becomes a target, it ceases to be a good measure." This principle, usually attributed to the economist Charles Goodhart, describes a recurring problem for organizations that manage by numbers. A hospital judged by how quickly patients are seen in its emergency room may reduce reported waiting times by moving patients into hallways sooner, without treating them any faster. A school evaluated by its students' test scores may devote more class time to test-taking strategies than to the subjects the tests were meant to sample. In each case the number improves while the underlying quality it was meant to indicate does not—and may even decline, if effort is diverted from the real goal to the measured one.`;

const temperament = `Tuning a keyboard instrument requires a compromise. Intervals that sound perfectly consonant—such as a fifth whose frequencies stand in the ratio 3 to 2—cannot all be combined in a single system of twelve notes per octave: stack twelve pure fifths and you overshoot seven octaves by a small but audible amount. Tuners have long distributed this discrepancy in different ways. Equal temperament, now standard, divides the octave into twelve identical steps, making every interval slightly impure but every key equally usable. Earlier "well temperaments" distributed the discrepancy unevenly, so that keys with few sharps or flats sounded purer and more remote keys sounded more tense.

It is often assumed that J. S. Bach's The Well-Tempered Clavier, whose two books contain preludes and fugues in all twenty-four major and minor keys, was written to demonstrate equal temperament. Many scholars now doubt this. A well temperament would also have made all twenty-four keys usable, and on such an instrument each key would have had its own character—a quality that equal temperament erases and that some performers now seek to recover.`;

export const V1 = section(5, 'v1', [
  tc(
    2,
    'Many early photographers regarded their medium as a (i)_____ tool, useful for recording facts but incapable of art; it took decades for critics to accept that photographs could be as (ii)_____ as paintings.',
    [
      [['mechanical', 'expressive', 'obsolete'], 0],
      [['evocative', 'accurate', 'durable'], 0],
    ],
    '(i) “Useful for recording facts but incapable of art” describes a merely **mechanical** tool. (ii) What critics were slow to accept was photography’s artistic power: that photographs could be as **evocative** as paintings.',
    [
      '“Expressive” is the opposite of “incapable of art”; “obsolete” contradicts “useful”.',
      '“Accurate” is the trap — nobody needed decades to accept that photographs were accurate; that was never in doubt. “Durable” is irrelevant to art.',
    ],
  ),
  tc(
    2,
    'The senator’s remarks, intended to be _____, instead inflamed tensions between the two factions.',
    [[['conciliatory', 'provocative', 'candid', 'ambiguous', 'cryptic'], 0]],
    '“Intended to be ___, instead inflamed tensions” — the intention was the opposite of inflaming: **conciliatory** (meant to calm, reconcile). “Provocative” is what the remarks turned out to be. “Candid” and the others don’t oppose inflaming.',
  ),
  tc(
    3,
    'Much of what passes for (i)_____ in contemporary political commentary is merely contrarianism: the habit of rejecting whatever view is currently popular, regardless of its merits. Genuine independence of mind, by contrast, is (ii)_____ to popularity in either direction, neither seeking agreement nor (iii)_____ it.',
    [
      [['originality', 'orthodoxy', 'civility'], 0],
      [['indifferent', 'hostile', 'beholden'], 0],
      [['shunning', 'courting', 'doubting'], 0],
    ],
    '(i) Contrarianism “passes for” something admirable that it merely imitates: **originality** (the next sentence names the real thing, independence of mind). (ii) Independence is unaffected by popularity “in either direction” — **indifferent**. (iii) “Neither seeking agreement nor ___ it” needs the opposite of seeking: **shunning**.',
    [
      'Rejecting popular views is the opposite of orthodoxy; “civility” is unrelated.',
      '“Hostile” to popularity describes the contrarian, not the independent mind; “beholden” means dependent on it.',
      '“Courting” just repeats “seeking”; “doubting” doesn’t complete the either-direction contrast.',
    ],
  ),
  passage('goodhart', goodhart, [
    rc(
      2,
      'The examples of the hospital and the school serve primarily to',
      [
        'illustrate how a number used as a target can improve without a corresponding improvement in what it was meant to indicate',
        'argue that hospitals and schools should not be evaluated at all',
        'show that emergency rooms are more poorly managed than schools',
        'suggest that test scores are the best measure of learning',
        'explain how Goodhart first formulated his principle',
      ],
      0,
      'Both examples show the number getting better (waiting times, test scores) while the thing it stands for (faster treatment, learning) doesn’t — (A), as the last sentence spells out. The passage doesn’t say never to evaluate (B), compares no institutions (C), and suggests the opposite of (D).',
    ),
    rc(
      3,
      'Which of the following best exemplifies the principle described in the passage?',
      [
        'A call center that rates employees by the number of calls completed per hour finds that employees begin ending calls before customers’ problems are resolved.',
        'A company that surveys its customers finds that satisfaction has risen after a product was improved.',
        'A city that installs speed cameras finds that the number of speeding tickets rises at first and then falls.',
        'A retailer that raises its prices finds that its sales volume declines.',
        'A university that admits more students finds that its classes become larger.',
      ],
      0,
      'The principle: once people are judged by a number, they push the number in ways that undercut the goal it measured. Calls-per-hour rises because employees cut calls short, while actual customer service (what the metric was meant to track) gets worse — (A). The other choices describe ordinary cause and effect, with no measure being gamed.',
    ),
  ]),
  se(
    1,
    'The committee’s decision was _____; not a single member dissented.',
    ['unanimous', 'contentious', 'undivided', 'tentative', 'secret', 'hasty'],
    [0, 2],
    'No dissent means everyone agreed: **unanimous**, **undivided**. “Contentious” is the opposite; “tentative”, “secret”, and “hasty” aren’t implied by the absence of dissent.',
  ),
  se(
    2,
    'Despite its _____ appearance, the tiny frog secretes a toxin potent enough to kill a large predator.',
    ['innocuous', 'menacing', 'harmless', 'colorful', 'fearsome', 'sluggish'],
    [0, 2],
    '“Despite” sets up a contrast with the deadly toxin, so the frog looks safe: **innocuous**, **harmless**. “Menacing” and “fearsome” are a pair, but they agree with the toxin instead of contrasting with it.',
  ),
  se(
    2,
    'The memoir’s tone is relentlessly _____, as though its author could find nothing in her long career worth celebrating.',
    ['dour', 'celebratory', 'gloomy', 'jaunty', 'measured', 'candid'],
    [0, 2],
    'Finding nothing worth celebrating makes the tone **dour** and **gloomy**. “Celebratory” and “jaunty” (lively, cheerful) are the opposite; “measured” and “candid” don’t fit “relentlessly”.',
  ),
  se(
    3,
    'The candidate’s _____ on the central issue of the campaign—she supported the measure in one speech and opposed it in the next—left even her advisers unsure of her position.',
    ['vacillation', 'steadfastness', 'tergiversation', 'reticence', 'intransigence', 'eloquence'],
    [0, 2],
    'Switching sides from one speech to the next is **vacillation** and **tergiversation** (repeatedly changing one’s position). “Steadfastness” and “intransigence” form a pair meaning the opposite — refusing to change. “Reticence” (saying little) doesn’t fit speeches on both sides.',
  ),
  passage('temperament', temperament, [
    rc(
      2,
      'According to the passage, tuning a keyboard instrument requires a compromise because',
      [
        'perfectly consonant intervals cannot all be combined within twelve notes per octave',
        'most listeners cannot hear the difference between pure and impure intervals',
        'equal temperament makes some keys unusable',
        'keyboard instruments cannot play fifths',
        'well temperaments were abandoned in the nineteenth century',
      ],
      0,
      'Pure intervals “cannot all be combined in a single system of twelve notes per octave” — twelve pure fifths overshoot seven octaves (A). (B) contradicts “audible”; (C) reverses equal temperament’s advantage; (D) and (E) aren’t stated.',
    ),
    rc(
      3,
      'The author mentions that “a well temperament would also have made all twenty-four keys usable” in order to',
      [
        'undermine a reason for believing that Bach wrote the work to demonstrate equal temperament',
        'show that Bach preferred equal temperament to well temperament',
        'explain why equal temperament became standard',
        'argue that Bach’s work cannot be performed in equal temperament',
        'suggest that most keys were unusable before the eighteenth century',
      ],
      0,
      'The assumption rests on the work covering all twenty-four keys — seemingly a showcase for equal temperament. If a well temperament also made every key usable, that feature no longer points to equal temperament (A). The author doesn’t claim (B) or (D), and (C) isn’t the point here.',
    ),
    rcMulti(
      3,
      'It can be inferred from the passage that in a well temperament',
      [
        'some keys sound purer than others',
        'every interval is equally impure',
        'different keys have different characters',
      ],
      [0, 2],
      'Well temperaments distributed the discrepancy “unevenly”, so keys with few sharps or flats “sounded purer” (A), and “each key would have had its own character” (C). B describes equal temperament, which makes every interval slightly — and equally — impure.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const phages = `Bacteriophages—viruses that infect and kill bacteria—were discovered in the 1910s, and within a decade physicians were using them to treat infections. In most Western countries, however, phage therapy was largely abandoned after antibiotics became widely available in the 1940s. Antibiotics were easier to manufacture and store, and each could act against many kinds of bacteria, whereas a given phage typically attacks only a narrow range of bacterial strains, so that a physician must identify the infecting strain before choosing a treatment. The rise of bacteria resistant to multiple antibiotics has revived interest in phages. Their narrowness, once a drawback, now looks in some respects like an advantage: a phage that kills only the harmful strain spares the beneficial bacteria that broad-spectrum antibiotics destroy. And because phages, unlike drugs, can evolve alongside the bacteria they attack, some researchers hope that bacterial resistance to them will prove easier to overcome.`;

const phageSentences = [
  'Bacteriophages—viruses that infect and kill bacteria—were discovered in the 1910s, and within a decade physicians were using them to treat infections.',
  'In most Western countries, however, phage therapy was largely abandoned after antibiotics became widely available in the 1940s.',
  'Antibiotics were easier to manufacture and store, and each could act against many kinds of bacteria, whereas a given phage typically attacks only a narrow range of bacterial strains, so that a physician must identify the infecting strain before choosing a treatment.',
  'The rise of bacteria resistant to multiple antibiotics has revived interest in phages.',
  'Their narrowness, once a drawback, now looks in some respects like an advantage: a phage that kills only the harmful strain spares the beneficial bacteria that broad-spectrum antibiotics destroy.',
  'And because phages, unlike drugs, can evolve alongside the bacteria they attack, some researchers hope that bacterial resistance to them will prove easier to overcome.',
];

const hawthorne = `Between 1924 and 1932, researchers at the Hawthorne Works, a Western Electric factory near Chicago, conducted a series of studies of worker productivity. In the best known of them, the lighting in a work area was raised and lowered to see how illumination affected output. According to the account that entered textbooks, productivity rose whatever the researchers did—even when the lights were dimmed—leading to the conclusion that workers were responding not to the lighting but to the attention of being studied. The phenomenon came to be called the Hawthorne effect.

The story has proved more durable than the evidence. The original illumination data were long thought to be lost, and when economists located and reanalyzed surviving records decades later, they found much weaker support for the dramatic pattern described in textbooks; some of the apparent effects could be explained by ordinary factors, such as the timing of the changes. None of this shows that being observed never changes behavior—there is good evidence from other settings that it sometimes does. But it suggests that one of social science's most famous findings owed its fame less to the strength of its evidence than to the appeal of its lesson.`;

export const V2H = section(5, 'v2h', [
  tc(
    2,
    'The reviewer praised the novel’s _____ structure, in which each of its seven chapters can be read in any order without loss of coherence.',
    [[['modular', 'linear', 'chronological', 'labyrinthine', 'conventional'], 0]],
    'Chapters that work in any order are self-contained units: a **modular** structure. “Linear” and “chronological” require a fixed order. “Labyrinthine” is the trap — it suggests complexity, but a maze confuses; this structure keeps coherence.',
  ),
  tc(
    3,
    'Although the physicist’s early papers were dismissed as (i)_____, their central predictions were eventually (ii)_____ by experiments that her critics had insisted were impossible to perform.',
    [
      [['speculative', 'rigorous', 'derivative'], 0],
      [['vindicated', 'refuted', 'anticipated'], 0],
    ],
    '(i) Predictions that couldn’t yet be tested — critics said the experiments were impossible — were dismissed as **speculative**. (ii) “Although … dismissed” sets up a reversal: the experiments **vindicated** them.',
    [
      '“Rigorous” isn’t a dismissal; “derivative” is about originality, not testability.',
      '“Refuted” would agree with the dismissal, killing the “although”; “anticipated” doesn’t fit experiments testing predictions.',
    ],
  ),
  tc(
    3,
    'The essay’s argument is (i)_____ rather than cumulative: instead of building step by step toward a conclusion, it circles back to the same few observations, returning to each with small variations. Readers who expect a (ii)_____ thesis will be frustrated; those willing to follow its (iii)_____ movement may find it rewarding.',
    [
      [['recursive', 'linear', 'polemical'], 0],
      [['conclusive', 'circular', 'tentative'], 0],
      [['meandering', 'relentless', 'abrupt'], 0],
    ],
    '(i) An argument that “circles back to the same few observations” instead of building step by step is **recursive**. (ii) Readers who will be frustrated expect the opposite — a **conclusive** thesis. (iii) The essay’s circling motion is **meandering**.',
    [
      '“Linear” is what “cumulative” and “step by step” describe — the opposite; “polemical” (combative) isn’t suggested.',
      'Readers expecting a “circular” or “tentative” thesis wouldn’t be frustrated by this essay.',
      '“Relentless” and “abrupt” contradict a gentle circling “with small variations”.',
    ],
  ),
  tc(
    3,
    'It would be (i)_____ to call the negotiations a failure, since they produced several modest agreements; but it would be (ii)_____ to call them a success, since the central dispute remains unresolved.',
    [
      [['unduly harsh', 'entirely fair', 'overly lenient'], 0],
      [['unduly generous', 'entirely apt', 'needlessly harsh'], 0],
    ],
    'Each blank judges a label against the evidence. (i) Calling talks that produced agreements a “failure” is **unduly harsh**. (ii) Calling talks that left the central dispute unresolved a “success” is **unduly generous**.',
    [
      '“Entirely fair” contradicts “since they produced several modest agreements”; “overly lenient” is backward — calling it a failure isn’t lenient.',
      '“Entirely apt” contradicts “the central dispute remains unresolved”; “needlessly harsh” is backward — calling it a success isn’t harsh.',
    ],
  ),
  passage('phages', phages, [
    rc(
      2,
      'According to the passage, which of the following was a reason phage therapy was abandoned in most Western countries?',
      [
        'A given phage attacks only a narrow range of bacterial strains.',
        'Phages were found to destroy beneficial bacteria.',
        'Bacteria quickly became resistant to phages.',
        'Phages could not be used until the 1940s.',
        'Physicians were unable to identify bacterial strains.',
      ],
      0,
      'Antibiotics won out partly because each “could act against many kinds of bacteria, whereas a given phage typically attacks only a narrow range of bacterial strains” (A). (B) reverses the passage — antibiotics destroy beneficial bacteria. (C), (D), and (E) aren’t stated.',
    ),
    rc(
      3,
      'The author suggests that the narrowness of phages is',
      [
        'a characteristic whose value depends on circumstances',
        'the main reason phages are more effective than antibiotics',
        'a drawback that researchers have finally overcome',
        'irrelevant to the renewed interest in phages',
        'a myth that has been disproved',
      ],
      0,
      '“Their narrowness, once a drawback, now looks in some respects like an advantage” — the same trait counted against phages when antibiotics worked well and for them now that resistance is common (A). “Main reason … more effective” (B) overstates; nothing was “overcome” (C).',
    ),
    rcSelect(
      2,
      'Select the sentence that suggests a reason to expect that bacterial resistance to phages might be easier to overcome than resistance to antibiotics.',
      phageSentences,
      5,
      'The last sentence gives the reason: phages “can evolve alongside the bacteria they attack”, unlike drugs. Sentence 5 describes a different advantage (sparing beneficial bacteria), not resistance.',
    ),
  ]),
  se(
    3,
    'The minister’s speech was a masterpiece of _____, conveying her disapproval so obliquely that no one could accuse her of criticizing the president.',
    ['indirection', 'bluntness', 'circumlocution', 'candor', 'bombast', 'brevity'],
    [0, 2],
    'Conveying disapproval “so obliquely” means speaking around the point: **indirection**, **circumlocution** (roundabout expression). “Bluntness” and “candor” are the opposite; “bombast” (inflated speech) and “brevity” don’t capture obliqueness.',
  ),
  se(
    2,
    'Hoping to _____ the dispute before it reached the courts, the company offered generous terms to the plaintiffs.',
    ['forestall', 'prolong', 'preempt', 'escalate', 'publicize', 'investigate'],
    [0, 2],
    'Generous terms offered “before it reached the courts” aim to head off the lawsuit: **forestall**, **preempt**. “Prolong” and “escalate” are the opposite of what generous terms are for.',
  ),
  se(
    3,
    'Though his public persona was one of genial _____, in private the comedian was withdrawn and often morose.',
    ['bonhomie', 'melancholy', 'affability', 'reserve', 'cynicism', 'diffidence'],
    [0, 2],
    '“Though” contrasts the public persona with being “withdrawn and often morose”: publicly he was cheerfully friendly — **bonhomie**, **affability**. “Melancholy”, “reserve”, and “diffidence” describe the private man, not the contrast.',
  ),
  se(
    2,
    'The prosecutor’s case, though superficially _____, collapsed once the defense showed that its key witness had been out of the country on the night in question.',
    ['compelling', 'flimsy', 'persuasive', 'tenuous', 'lengthy', 'complicated'],
    [0, 2],
    '“Though superficially ___, collapsed” — on the surface the case looked strong: **compelling**, **persuasive**. “Flimsy” and “tenuous” describe the case after it collapsed, so they kill the contrast.',
  ),
  passage('hawthorne', hawthorne, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'describe a famous finding and question the evidence on which its reputation rests',
        'argue that being observed never changes people’s behavior',
        'explain how lighting affects worker productivity',
        'criticize the economists who reanalyzed the Hawthorne data',
        'describe the history of the Western Electric Company',
      ],
      0,
      'Paragraph 1 tells the textbook story of the Hawthorne effect; paragraph 2 says “the story has proved more durable than the evidence” (A). (B) is explicitly denied: the author grants that observation “sometimes does” change behavior.',
    ),
    rc(
      2,
      'According to the textbook account described in the passage, worker productivity at the Hawthorne Works',
      [
        'increased even when the lighting was dimmed',
        'increased only when the lighting was brightened',
        'declined when workers knew they were being studied',
        'was unaffected by any of the researchers’ changes',
        'depended mainly on the day of the week',
      ],
      0,
      'In the textbook story, productivity “rose whatever the researchers did—even when the lights were dimmed” (A). (B) and (D) contradict it; (E) is the reanalysis’s kind of explanation, not the textbook account.',
    ),
    rc(
      3,
      'Which of the following best describes the author’s view of the Hawthorne effect as a general phenomenon?',
      [
        'The author accepts that being observed can alter behavior but doubts that the Hawthorne studies demonstrated it.',
        'The author regards it as thoroughly disproved.',
        'The author believes the Hawthorne studies remain the strongest evidence for it.',
        'The author considers it too vague to be tested.',
        'The author argues that it applies only in factories.',
      ],
      0,
      'The author says the reanalysis doesn’t show that observation “never changes behavior—there is good evidence from other settings that it sometimes does”, while the Hawthorne evidence itself is weak (A). (B) and (C) are the two extremes the author avoids.',
    ),
    rcMulti(
      3,
      'The passage suggests which of the following about the reanalysis of the Hawthorne data?',
      [
        'It relied on records that had long been thought to be unavailable.',
        'It showed that observation never affects behavior.',
        'It identified other explanations for some of the changes in output.',
      ],
      [0, 2],
      'The data “were long thought to be lost” before economists “located and reanalyzed surviving records” (A), and “some of the apparent effects could be explained by ordinary factors” (C). B is exactly what the author says the reanalysis does not show.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const tardigrades = `Tardigrades, microscopic animals often called water bears, are famous for surviving conditions that would kill almost any other animal. When their surroundings dry out, many species curl into a compact, dehydrated form called a tun, in which their metabolism slows to a tiny fraction of its normal rate. In this state they can endure extreme cold, high doses of radiation, and even, in one experiment, several days of exposure to outer space. Their toughness is often misunderstood, however. Tardigrades are not especially hardy in their active state, and most live in ordinary environments such as moss and leaf litter. Their remarkable tolerance is best understood not as an adaptation to extreme environments but as a way of waiting out the drying and freezing that are common in the damp places they inhabit.`;

const brandon = `The city of Brandon plans to reduce litter in its parks by doubling the number of trash cans in each park. City officials point out that the parks that currently have the most trash cans have the least litter.`;

const clocks = `Before the late nineteenth century, most American towns kept their own local time, setting their clocks so that noon fell when the sun was highest overhead. Because the sun reaches its highest point at different moments in different places, a traveler going from one town to the next might find clocks that differed by several minutes. For most of history this variation hardly mattered. The railroads changed that. A railroad serving dozens of towns could not publish a coherent schedule if every station kept a different time, and by the 1870s the confusion had become costly and even dangerous. On November 18, 1883, the major railroads adopted a system of standard time zones, and most towns soon followed. Remarkably, the federal government did not make standard time official until 1918; for thirty-five years, the nation's clocks were governed largely by an agreement among private companies.`;

export const V2E = section(5, 'v2e', [
  tc(
    1,
    'The instructions for assembling the desk were so _____ that it took us three hours to finish a job that should have taken thirty minutes.',
    [[['confusing', 'clear', 'brief', 'illustrated', 'accurate'], 0]],
    'A thirty-minute job taking three hours points to bad instructions: **confusing**. “Clear”, “illustrated”, and “accurate” would speed things up; “brief” instructions aren’t necessarily hard to follow.',
  ),
  tc(
    1,
    'Rather than _____ his mistake, the manager tried to blame it on his assistant.',
    [[['admit', 'repeat', 'conceal', 'forget', 'investigate'], 0]],
    '“Rather than X, he blamed his assistant” — X is the honest alternative to shifting blame: **admit**. “Conceal” is the trap: blaming someone else is a way of concealing, so it doesn’t contrast.',
  ),
  tc(
    2,
    'The scientist’s findings were initially met with (i)_____, but after other laboratories (ii)_____ her results, the scientific community accepted them.',
    [
      [['skepticism', 'enthusiasm', 'gratitude'], 0],
      [['replicated', 'disputed', 'ignored'], 0],
    ],
    '(i) “But … the scientific community accepted them” means the first reaction was doubt: **skepticism**. (ii) What makes scientists accept results is other labs getting the same results: they **replicated** them.',
    [
      'Enthusiasm or gratitude wouldn’t need to be overcome by later acceptance.',
      'Disputing or ignoring the results wouldn’t lead to acceptance.',
    ],
  ),
  tc(
    2,
    'Because the old factory had been (i)_____ for decades, the developers expected to find it in ruins; instead, they discovered that its sturdy brick walls had (ii)_____ the years remarkably well, and they decided to (iii)_____ the building rather than tear it down.',
    [
      [['abandoned', 'renovated', 'occupied'], 0],
      [['withstood', 'suffered', 'recorded'], 0],
      [['restore', 'demolish', 'sell'], 0],
    ],
    '(i) Expecting ruins means the building had been left empty: **abandoned**. (ii) “Instead … sturdy brick walls” — the walls had **withstood** the years. (iii) “Rather than tear it down” → **restore** it.',
    [
      'A renovated or occupied building wouldn’t be expected to be in ruins.',
      '“Suffered the years remarkably well” contradicts the surprise; “recorded” doesn’t fit walls.',
      '“Demolish” is tearing it down; “sell” doesn’t contrast with tearing down.',
    ],
  ),
  passage('tardigrades', tardigrades, [
    rc(
      1,
      'According to the passage, a tun is',
      [
        'a dehydrated form that tardigrades adopt when their surroundings dry out',
        'a type of moss in which tardigrades live',
        'the active state of a tardigrade',
        'an extreme environment where tardigrades are commonly found',
        'a substance tardigrades produce to resist radiation',
      ],
      0,
      '“When their surroundings dry out, many species curl into a compact, dehydrated form called a tun” (A).',
    ),
    rc(
      2,
      'The author mentions that most tardigrades “live in ordinary environments such as moss and leaf litter” in order to',
      [
        'correct a misunderstanding about why tardigrades can tolerate harsh conditions',
        'explain how tardigrades survive in outer space',
        'show that tardigrades are hardier in their active state',
        'suggest that tardigrades cannot survive drying',
        'describe the diet of tardigrades',
      ],
      0,
      'Right after “Their toughness is often misunderstood”, the author notes they live in ordinary places — so their tolerance evolved for waiting out ordinary drying and freezing, not for extreme environments (A). (C) contradicts the passage.',
    ),
    rcMulti(
      2,
      'Which of the following statements about tardigrades are supported by the passage?',
      [
        'Their metabolism slows greatly in the tun state.',
        'They are especially hardy in their active state.',
        'At least some have survived exposure to outer space.',
      ],
      [0, 2],
      'A: in a tun, “their metabolism slows to a tiny fraction of its normal rate.” C: they survived “several days of exposure to outer space” in one experiment. B is contradicted: they “are not especially hardy in their active state.”',
    ),
  ]),
  se(
    1,
    'The novel’s hero is thoroughly _____, always willing to put the needs of others ahead of his own.',
    ['selfless', 'ambitious', 'altruistic', 'cunning', 'selfish', 'reckless'],
    [0, 2],
    'Putting others’ needs first is **selfless** and **altruistic**. “Selfish” is the opposite; “ambitious” and “cunning” are about his own advancement.',
  ),
  se(
    1,
    'Although the company’s profits were _____ last year, its executives expect a strong recovery.',
    ['disappointing', 'record-breaking', 'meager', 'impressive', 'stable', 'audited'],
    [0, 2],
    'Expecting a “recovery” means last year was bad: **disappointing**, **meager**. “Record-breaking” and “impressive” leave nothing to recover from.',
  ),
  se(
    2,
    'The critic’s praise for the film was _____: she called it the most important work of the decade.',
    ['effusive', 'grudging', 'lavish', 'muted', 'belated', 'sarcastic'],
    [0, 2],
    'Calling a film the most important work of the decade is praise without restraint: **effusive**, **lavish**. “Grudging” and “muted” are the opposite; “sarcastic” would make it not praise at all.',
  ),
  se(
    2,
    'Her explanation of the policy was so _____ that even people with no background in economics could follow it.',
    ['intelligible', 'technical', 'accessible', 'convoluted', 'lengthy', 'controversial'],
    [0, 2],
    'If non-experts can follow it, the explanation is **intelligible** and **accessible**. “Technical” and “convoluted” would shut them out.',
  ),
  argument(
    'brandon',
    brandon,
    rc(
      2,
      'The officials’ plan depends on which of the following assumptions?',
      [
        'The parks with more trash cans have less litter because of the trash cans rather than because of some other difference between the parks.',
        'Most park visitors support the plan.',
        'Trash cans are inexpensive to install.',
        'Litter is a greater problem in parks than on city streets.',
        'The parks with the most trash cans are the most heavily visited.',
      ],
      0,
      'The officials reason from a correlation (more cans, less litter) to a cause. If some other difference — say, better-maintained parks get both more cans and more cleanups — explains the pattern, adding cans won’t help. The plan needs (A). The others aren’t required for adding cans to reduce litter.',
    ),
  ),
  passage('clocks', clocks, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'explaining how and why standard time replaced local time in the United States',
        'describing how clocks were manufactured in the nineteenth century',
        'arguing that the federal government should regulate railroads',
        'comparing American and European methods of keeping time',
        'explaining why the sun reaches its highest point at different times in different places',
      ],
      0,
      'The passage describes local time, the railroads’ problem with it, and the 1883 adoption of standard time zones (A). (E) is background; the others aren’t discussed.',
    ),
    rc(
      2,
      'According to the passage, local time created problems for the railroads because',
      [
        'stations along a route kept different times, making it hard to publish coherent schedules',
        'trains could not run at night',
        'travelers refused to change their watches',
        'the federal government required railroads to use local time',
        'towns disagreed about when the sun was highest',
      ],
      0,
      '“A railroad serving dozens of towns could not publish a coherent schedule if every station kept a different time” (A). (D) is wrong — the government wasn’t involved until 1918.',
    ),
    rc(
      2,
      'The author’s use of the word “Remarkably” in the last sentence indicates surprise that',
      [
        'an arrangement among private companies governed the nation’s timekeeping for decades before becoming law',
        'the railroads adopted standard time zones in a single day',
        'most towns chose to follow the railroads’ system',
        'local time had been used for so long',
        'the federal government opposed standard time',
      ],
      0,
      'The sentence explains what is remarkable: the government made standard time official only in 1918, so “for thirty-five years, the nation’s clocks were governed largely by an agreement among private companies” (A). Nothing says the government opposed it (E).',
    ),
  ]),
]);
