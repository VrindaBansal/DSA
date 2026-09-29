// Practice Test 6 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const coral = `Reef-building corals depend on a partnership. Inside the cells of a coral live single-celled algae called zooxanthellae, which photosynthesize and pass much of the sugar they make to their host; in return, the coral supplies the algae with shelter and with nutrients from its own wastes. The algae also give most corals their color. When water temperatures stay even a degree or two above their usual summer maximum for several weeks, the partnership breaks down: the stressed algae begin to produce harmful compounds, and the coral expels them, leaving its tissue translucent over a white skeleton. Such “bleached” coral is not dead. If temperatures fall soon enough, it can regain its algae and recover; if they do not, the coral, deprived of its main source of food, may starve.`;

const rosetta = `The Rosetta Stone, found by French soldiers in Egypt in 1799, carries the same decree in three scripts: Greek, which scholars could read, and two forms of Egyptian—hieroglyphic and demotic—which they could not. It is often described as the key that unlocked hieroglyphs, but the stone alone did not suffice. Its hieroglyphic section is badly damaged, and a parallel text helps a decipherer only if the decipherer knows what kind of writing system to look for. For centuries, European scholars had assumed that hieroglyphs were purely symbolic, each sign standing for an idea rather than a sound.

The English scholar Thomas Young made important early progress by showing that some signs, particularly those inside the oval rings called cartouches that enclose royal names, had phonetic values. But Young believed that phonetic writing was confined to foreign names such as Ptolemy. It was Jean-François Champollion who showed, beginning in 1822, that sound-signs pervaded the whole system, mixed with signs for ideas—and he could do so partly because he knew Coptic, the late form of the Egyptian language, which allowed him to recognize the words the signs spelled.`;

export const V1 = section(6, 'v1', [
  tc(
    2,
    'Far from being _____, the director’s final film is so restrained that some early viewers mistook its quietness for indifference.',
    [[['ostentatious', 'understated', 'indifferent', 'tedious', 'somber'], 0]],
    '“Far from being ___” needs the opposite of what the film actually is — “so restrained.” The opposite of restrained is **ostentatious** (showy). “Understated” is the trap: it describes the film as it is, not what it is far from being. “Indifferent” just echoes a later word.',
  ),
  tc(
    2,
    'The archive’s catalog, compiled over decades by volunteers who shared no common system, is notoriously (i)_____: the same kind of document may be filed under three different headings, and some headings are so (ii)_____ that they tell a researcher almost nothing about what they contain.',
    [
      [['inconsistent', 'exhaustive', 'meticulous'], 0],
      [['vague', 'specific', 'recent'], 0],
    ],
    '(i) Volunteers with “no common system” filing the same kind of document under three headings — the catalog is **inconsistent**. (ii) Headings that “tell a researcher almost nothing” are **vague**.',
    [
      '“Exhaustive” and “meticulous” are praise; the colon introduces problems.',
      '“Specific” headings would tell a researcher a lot — the opposite of the clue; “recent” is irrelevant.',
    ],
  ),
  tc(
    3,
    'The historian argues that the inventor’s reputation as a solitary genius is largely (i)_____. Her notebooks, the historian shows, (ii)_____ ideas freely from correspondents across Europe, and the device that made her famous owed as much to the (iii)_____ of her workshop assistants as to her own insight.',
    [
      [['a myth', 'deserved', 'recent'], 0],
      [['borrowed', 'concealed', 'rejected'], 0],
      [['ingenuity', 'negligence', 'ambition'], 0],
    ],
    '(i) Everything after the first sentence shows she wasn’t working alone, so the “solitary genius” reputation is **a myth**. (ii) Notebooks that take ideas “freely from correspondents” **borrowed** them. (iii) The device owed as much to her assistants’ **ingenuity** as to her own insight.',
    [
      '“Deserved” contradicts the evidence that follows; “recent” says nothing about whether the reputation is accurate.',
      '“Concealed” and “rejected” don’t fit ideas taken “freely” from others.',
      'Parallel to “her own insight,” the assistants must have contributed something positive — not “negligence”; “ambition” doesn’t build a device.',
    ],
  ),
  passage('coral', coral, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'explaining what happens to corals during bleaching and why bleached coral is not necessarily dead',
        'arguing that rising ocean temperatures will soon destroy all coral reefs',
        'comparing the feeding habits of different species of coral',
        'describing how zooxanthellae were first discovered',
        'proposing a method for preventing coral bleaching',
      ],
      0,
      'The passage explains the coral–algae partnership, how heat breaks it down (bleaching), and that bleached coral “is not dead” and can recover — (A). It makes no prediction about all reefs (B), compares no species (C), and says nothing about discovery (D) or prevention (E).',
    ),
    rc(
      3,
      'It can be inferred from the passage that a bleached coral that recovers has most likely',
      [
        'taken in algae again after water temperatures returned to normal',
        'never actually lost its algae',
        'produced its own pigments to replace those of the algae',
        'fed on the harmful compounds produced by the stressed algae',
        'been exposed to high temperatures for many months',
      ],
      0,
      'Recovery happens “if temperatures fall soon enough” — the coral “can regain its algae and recover” (A). Bleaching is defined by expelling the algae, so (B) is wrong; (C) and (D) are never mentioned; long exposure (E) is what leads to starvation, not recovery.',
    ),
  ]),
  se(
    1,
    'The two witnesses gave _____ accounts of the accident: one insisted the car had been red, the other that it had been blue.',
    ['contradictory', 'conflicting', 'identical', 'consistent', 'detailed', 'brief'],
    [0, 1],
    'Accounts that disagree on the car’s color are **contradictory**, **conflicting**. “Identical” and “consistent” form the opposite pair; “detailed” and “brief” don’t describe the disagreement.',
  ),
  se(
    2,
    'The scientist’s _____ approach—testing each assumption before building on it—made her progress slow but her conclusions unusually reliable.',
    ['methodical', 'painstaking', 'intuitive', 'haphazard', 'speculative', 'innovative'],
    [0, 1],
    'Testing every assumption step by step, slowly but reliably, is **methodical** and **painstaking**. “Intuitive” and “speculative” are close to the opposite; “haphazard” contradicts the careful testing; “innovative” has no support in the sentence.',
  ),
  se(
    2,
    'Though the critic is known for her _____ reviews, her assessment of the young novelist’s debut was surprisingly gentle.',
    ['scathing', 'withering', 'lengthy', 'generous', 'laudatory', 'perceptive'],
    [0, 1],
    '“Though … surprisingly gentle” — her usual reviews must be harsh: **scathing**, **withering**. “Generous” and “laudatory” form the trap pair: they agree with “gentle” instead of contrasting with it.',
  ),
  se(
    3,
    'Critics who dismiss the poet’s late work as _____ overlook how carefully its apparent plainness was achieved; what reads as artless is in fact the product of years of revision.',
    ['facile', 'glib', 'labored', 'ornate', 'meticulous', 'cryptic'],
    [0, 1],
    'The critics think the plain poems were too easy — superficial, effortless in a bad sense: **facile**, **glib**. The author answers that they took years of revision. “Labored” and “meticulous” describe the effort the author defends, not the critics’ dismissal; “ornate” contradicts “plainness.”',
  ),
  passage('rosetta', rosetta, [
    rc(
      2,
      'The author mentions that the stone’s hieroglyphic section “is badly damaged” in order to',
      [
        'support the claim that the stone by itself was not enough to decipher hieroglyphs',
        'explain why the Greek section was easier to read',
        'suggest that Young worked from a different inscription',
        'argue that the soldiers who found the stone handled it carelessly',
        'account for the European belief that hieroglyphs were symbolic',
      ],
      0,
      'The sentence begins “the stone alone did not suffice” and gives two reasons — the damage and the need to know what kind of system to look for. The damage supports that claim (A). Nothing links it to the Greek (B), another inscription (C), the soldiers (D), or the old belief (E).',
    ),
    rc(
      3,
      'According to the passage, Champollion’s contribution differed from Young’s in that Champollion',
      [
        'recognized that sound-signs were used throughout the writing system, not only in foreign names',
        'was the first to identify phonetic values in cartouches',
        'relied on the Greek text rather than on knowledge of the Egyptian language',
        'argued that hieroglyphs stood only for ideas',
        'worked from an undamaged copy of the decree',
      ],
      0,
      'Young thought phonetic writing was “confined to foreign names”; Champollion showed “sound-signs pervaded the whole system” (A). Young was the one who first found phonetic values in cartouches (B); Champollion’s Coptic was key, the reverse of (C); (D) is the old European view; (E) is never said.',
    ),
    rcMulti(
      3,
      'The passage suggests which of the following about the belief that hieroglyphs were purely symbolic?',
      [
        'It had to be given up before the system could be fully deciphered.',
        'Young’s work on cartouches partly challenged it.',
        'The demotic section of the Rosetta Stone confirmed it.',
      ],
      [0, 1],
      'A decipherer must know “what kind of writing system to look for,” and the breakthrough was showing sound-signs everywhere — so the purely-symbolic belief had to go (A). Young’s finding that some signs had phonetic values already cut against it (B). Nothing says the demotic section confirmed it (C).',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const monarchs = `Each autumn, monarch butterflies from eastern North America fly as far as 4,000 kilometers to a few mountain forests in central Mexico, where they spend the winter clustered on fir trees. No individual butterfly makes the round trip. The monarchs that fly south belong to a special generation that delays reproduction and lives for several months; in spring they begin the journey north, breed along the way, and die, and it is their offspring and their offspring’s offspring—each generation living only a few weeks—that complete the return. Thus the butterflies that arrive in Mexico each autumn have never been there before. Researchers have found that monarchs navigate in part with a time-compensated sun compass: the insects track the sun’s position and correct for the time of day using a biological clock located, surprisingly, partly in their antennae.`;

const glenbrook = `Last year the Glenbrook public library began staying open until 9 p.m. on weekdays, three hours later than before. Since then, the number of books checked out each month has risen by 12 percent. The library’s director concludes that the longer hours are responsible for the increase and recommends extending weekend hours as well.`;

const jacobs = `In The Death and Life of Great American Cities (1961), Jane Jacobs attacked the planning orthodoxy of her day, which sought to replace crowded, mixed-use neighborhoods with orderly superblocks of housing set apart from shops and offices. Planners regarded busy sidewalks as a symptom of disorder. Jacobs argued the opposite: a street used by many different people at different hours—residents, shopkeepers, workers, visitors—is watched almost constantly by what she called “eyes on the street,” and this informal, unplanned surveillance does more to keep it safe than any police force. Streets that planners had emptied of shops and pedestrians, she contended, became places where no one was watching. Jacobs had no formal training in planning, and her critics dismissed her as an amateur; yet many of her ideas, once heretical, have become commonplaces of the field.`;

export const V2E = section(6, 'v2e', [
  tc(
    1,
    'Although the hotel advertised its rooms as _____, the one we were given was barely large enough for a single bed.',
    [[['spacious', 'cramped', 'affordable', 'modern', 'quiet'], 0]],
    '“Although” sets up a contrast with a room “barely large enough for a single bed,” so the ad promised **spacious** rooms. “Cramped” agrees with the room instead of contrasting; the other choices aren’t about size.',
  ),
  tc(
    1,
    'The researcher’s findings were _____ by three independent laboratories, which obtained the same results using different equipment.',
    [[['corroborated', 'disputed', 'concealed', 'anticipated', 'misreported'], 0]],
    'Other labs getting “the same results” confirm the findings: **corroborated**. “Disputed” is the opposite; “anticipated” would mean the labs predicted the results beforehand, which the sentence doesn’t say.',
  ),
  tc(
    2,
    'The mayor’s plan, initially (i)_____ by residents who feared higher taxes, gradually won their support once it became clear that the new park would (ii)_____ property values rather than depress them.',
    [
      [['opposed', 'embraced', 'ignored'], 0],
      [['raise', 'lower', 'freeze'], 0],
    ],
    '(i) Residents who “feared higher taxes” and only “gradually” came to support the plan must first have **opposed** it. (ii) “Rather than depress them” needs the opposite: **raise**.',
    [
      '“Embraced” contradicts “gradually won their support”; fear of taxes suggests active resistance, not indifference.',
      '“Lower” means the same as “depress” — no contrast; “freeze” isn’t the opposite of depressing.',
    ],
  ),
  tc(
    2,
    'The documentary does not so much (i)_____ its subject as let her speak for herself: the director rarely appears on camera, and the film’s few (ii)_____ comments are confined to brief captions. The result is a portrait that feels (iii)_____ rather than staged.',
    [
      [['interpret', 'admire', 'imitate'], 0],
      [['editorial', 'humorous', 'hostile'], 0],
      [['candid', 'rehearsed', 'unfinished'], 0],
    ],
    '(i) The contrast is with letting her “speak for herself,” so the film doesn’t **interpret** her. (ii) The director’s own remarks — kept to captions — are **editorial** comments. (iii) “Rather than staged” calls for **candid**.',
    [
      '“Admire” and “imitate” don’t contrast with letting someone speak for herself.',
      'Nothing suggests the captions are funny or hostile; the point is that the director’s own voice is minimal.',
      '“Rehearsed” means the same as “staged”; “unfinished” isn’t its opposite.',
    ],
  ),
  passage('monarchs', monarchs, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'describing features of the monarch butterfly’s annual migration',
        'explaining why monarch populations have declined',
        'comparing monarchs with other migratory insects',
        'arguing that monarchs navigate mainly by smell',
        'describing the forests where monarchs breed',
      ],
      0,
      'The passage covers who makes the trip, how the generations divide it, and how the butterflies navigate — features of the migration (A). It mentions no decline (B) or other insects (C), says they navigate by the sun (not D), and the forests are where they spend the winter, not where they breed (E).',
    ),
    rc(
      2,
      'According to the passage, the monarchs that fly south in autumn differ from later generations in that they',
      [
        'live longer and postpone reproduction',
        'make the round trip more than once',
        'navigate without using the sun',
        'lack the biological clock found in other generations',
        'breed in the Mexican forests',
      ],
      0,
      'The southbound generation “delays reproduction and lives for several months,” while later generations live “only a few weeks” (A). No butterfly makes the round trip even once (B); (C) and (D) contradict the sun-compass finding; they breed on the way north, not in Mexico (E).',
    ),
    rc(
      2,
      'The statement that “the butterflies that arrive in Mexico each autumn have never been there before” serves primarily to',
      [
        'emphasize that the migrating monarchs cannot have learned the route from experience',
        'contradict the claim that monarchs use a sun compass',
        'suggest that monarchs choose a different site each year',
        'show that the southbound generation lives only a few weeks',
        'explain why the Mexican forests are important to the species',
      ],
      0,
      'Since no individual makes the round trip, the arrivals are first-timers — so the route can’t be remembered, which is why the next sentence turns to how they navigate (A). The sentence doesn’t touch the compass (B), says they go to the same few forests (not C), and the southbound generation is the long-lived one (not D).',
    ),
  ]),
  se(
    1,
    'The new manager was _____ about the budget, answering every question from the staff openly and in detail.',
    ['forthcoming', 'transparent', 'secretive', 'uncertain', 'indifferent', 'reserved'],
    [0, 1],
    'Answering “openly and in detail” is being **forthcoming** and **transparent**. “Secretive” and “reserved” are the opposite; “uncertain” and “indifferent” don’t fit the detailed answers.',
  ),
  se(
    1,
    'After weeks of heavy rain, the usually placid river became _____, flooding several farms along its banks.',
    ['turbulent', 'tumultuous', 'shallow', 'tranquil', 'murky', 'narrow'],
    [0, 1],
    '“Usually placid” contrasts with a flooding river that is **turbulent**, **tumultuous**. “Tranquil” means placid — no contrast. “Murky” may be true of floodwater, but it has no partner and misses the contrast with “placid.”',
  ),
  se(
    2,
    'The biography is marred by its author’s _____ toward his subject, which leads him to excuse even the man’s most obvious failings.',
    ['indulgence', 'leniency', 'erudition', 'skepticism', 'brevity', 'objectivity'],
    [0, 1],
    'Excusing someone’s obvious failings is going easy on him: **indulgence**, **leniency**. “Objectivity” and “skepticism” would work against excusing; “erudition” and “brevity” wouldn’t lead to excuses.',
  ),
  se(
    2,
    'Early reviews of the play were so _____ that the producers extended its run before it had even opened in other cities.',
    ['enthusiastic', 'rapturous', 'mixed', 'tepid', 'lengthy', 'belated'],
    [0, 1],
    'Producers extend a run because of excellent reviews: **enthusiastic**, **rapturous**. “Mixed” and “tepid” form a pair, but lukewarm reviews wouldn’t prompt an early extension.',
  ),
  argument(
    'glenbrook',
    glenbrook,
    rc(
      2,
      'Which of the following, if true, most seriously weakens the director’s conclusion?',
      [
        'In the same year, the library doubled its purchases of new books and began a heavily advertised reading program.',
        'Most people who use the library in the evening are students.',
        'Checkouts during the new evening hours account for nearly all of the increase.',
        'Other libraries in the region that extended their hours also saw checkouts rise.',
        'The library’s operating costs rose after the hours were extended.',
      ],
      0,
      'The director assumes the new hours caused the rise. (A) offers other causes that arrived at the same time — more new books and an advertised program — so the rise may not be due to the hours. (C) and (D) strengthen the conclusion; (B) and (E) don’t bear on what caused the increase.',
    ),
  ),
  passage('jacobs', jacobs, [
    rc(
      1,
      'According to the passage, planners of Jacobs’s day regarded busy sidewalks as',
      [
        'a sign of disorder',
        'a source of safety',
        'a necessary feature of mixed-use neighborhoods',
        'an effective substitute for police',
        'an unavoidable result of building superblocks',
      ],
      0,
      'The passage says it directly: planners “regarded busy sidewalks as a symptom of disorder” (A). (B) and (D) are Jacobs’s view, not the planners’; (C) and (E) aren’t stated.',
    ),
    rc(
      2,
      'Jacobs would most likely agree with which of the following statements?',
      [
        'A street lined with shops that are open at different hours is likely to be safer than a street lined only with housing.',
        'Streets are safest when only residents are allowed to use them.',
        'Police patrols are the most important factor in keeping a street safe.',
        'Separating housing from shops and offices reduces crime.',
        'Crowded sidewalks make it harder for residents to notice strangers.',
      ],
      0,
      'For Jacobs, many people using a street at different hours keep “eyes on the street,” and streets emptied of shops go unwatched — so the mixed street is safer (A). (B) and (D) are the opposite; she says informal watching does more than any police force (not C); (E) contradicts her view of busy sidewalks.',
    ),
    rc(
      2,
      'The final sentence of the passage primarily serves to',
      [
        'note that Jacobs’s views, though once dismissed, came to be widely accepted',
        'question whether Jacobs was qualified to write about planning',
        'suggest that planners have since rejected all of Jacobs’s ideas',
        'explain why Jacobs’s book was published',
        'argue that formal training in planning is unnecessary',
      ],
      0,
      'It sets the critics’ dismissal (“an amateur”) against the outcome — her once-heretical ideas “have become commonplaces of the field” (A). It reports the critics’ doubt without endorsing it (B), says the reverse of (C), and makes no general argument about training (E).',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const mirrorSentences = [
  'In the mirror self-recognition test, devised by the psychologist Gordon Gallup in 1970, an animal is marked, usually while anesthetized, with a spot of dye on a part of its body it cannot see directly, such as the forehead.',
  'It is then given a mirror.',
  'If the animal touches or inspects the mark while looking at its reflection, it is taken to recognize the image as itself.',
  'Chimpanzees pass the test; most monkeys do not.',
  'Passing has since been reported in orangutans, dolphins, elephants, and magpies, and more controversially in a small fish, the cleaner wrasse.',
  'The wrasse result has divided researchers.',
  'Some argue that it shows the test to be a poorer measure of self-awareness than was supposed, since few are prepared to credit a fish with a concept of self.',
  'Others reply that the result may be sound and that it is our assumptions about fish cognition that need revising.',
  'Either way, the controversy exposes a difficulty the test has always had: it detects a behavior, and the inference from that behavior to an inner state is only as strong as the reasoning that connects them.',
];
const mirror = mirrorSentences.join(' ');

const concrete = `Roman concrete has long puzzled engineers. Many Roman structures—harbor walls, aqueducts, the dome of the Pantheon—have survived for nearly two thousand years, while modern concrete often begins to crack and crumble within decades. For much of the twentieth century, the durability was attributed chiefly to the Romans’ use of volcanic ash, which reacts with lime to form unusually stable minerals. In marine structures, researchers later found, seawater percolating through the concrete even promotes the growth of interlocking crystals that strengthen it over time.

More recently, attention has turned to a feature that earlier investigators had dismissed as a sign of careless work: small white lumps of lime, called lime clasts, scattered through the concrete. If the Romans had mixed their materials thoroughly, the reasoning went, such lumps would not exist. A 2023 study proposed instead that the clasts result from mixing quicklime directly into the concrete—a hot process that leaves lime-rich lumps behind—and that they serve a purpose. When a crack forms and water enters it, the water dissolves calcium from the clasts, and the calcium then recrystallizes as calcium carbonate, filling the crack. The concrete, in other words, can partly heal itself. Whether the Romans understood this or benefited from it by accident is unknown; but the finding has prompted engineers to experiment with modern mixes that imitate it.`;

export const V2H = section(6, 'v2h', [
  tc(
    2,
    'The committee’s report, far from settling the controversy, only _____ it, supplying each side with fresh evidence for its own position.',
    [[['exacerbated', 'resolved', 'obscured', 'anticipated', 'summarized'], 0]],
    '“Far from settling” it, and giving both sides new ammunition — the report made the controversy worse: **exacerbated**. “Resolved” is what it failed to do; “obscured” means hid, which fresh evidence for both sides doesn’t do.',
  ),
  tc(
    3,
    'That the ancient city was abandoned suddenly has long been (i)_____ from the half-finished buildings found at the site; but recent excavations suggest a more (ii)_____ decline, in which construction simply stopped as the population dwindled over several generations.',
    [
      [['inferred', 'belied', 'dissociated'], 0],
      [['protracted', 'precipitous', 'catastrophic'], 0],
    ],
    '(i) Half-finished buildings are the evidence from which a sudden abandonment was **inferred**. (ii) “But” introduces the opposite of sudden — a decline “over several generations” is **protracted**.',
    [
      '“Belied” means contradicted — the half-finished buildings seemed to support sudden abandonment, not contradict it. “Dissociated” doesn’t fit “from the buildings.”',
      '“Precipitous” and “catastrophic” both mean sudden or violent — the view the excavations overturn.',
    ],
  ),
  tc(
    3,
    'Scientific revolutions, the philosopher argued, are rarely won by (i)_____ alone: the older theory’s defenders seldom concede defeat when confronted with contrary evidence, which they can usually find ways to (ii)_____. Instead, the new view prevails as its opponents (iii)_____ and a younger generation, familiar with it from the start, takes their place.',
    [
      [['persuasion', 'coercion', 'accident'], 0],
      [['accommodate', 'publicize', 'fabricate'], 0],
      [['die out', 'recant', 'multiply'], 0],
    ],
    '(i) Defenders who won’t concede when shown evidence can’t be won over by argument: revolutions aren’t won by **persuasion** alone. (ii) They fit the contrary evidence into their theory — they **accommodate** it. (iii) A younger generation “takes their place” as the old guard **die out**.',
    [
      'Nothing suggests force or luck; the colon explains why argument fails.',
      '“Publicize” and “fabricate” don’t describe how defenders neutralize inconvenient evidence.',
      '“Recant” would mean they are persuaded after all — the opposite of the claim; “multiply” contradicts being replaced.',
    ],
  ),
  tc(
    3,
    'The novelist’s prose has been called (i)_____, but the charge misses the point: her long, winding sentences are not ornament for its own sake but an attempt to (ii)_____ the way thought actually moves, doubling back and qualifying itself as it goes.',
    [
      [['overwrought', 'austere', 'derivative'], 0],
      [['mimic', 'simplify', 'conceal'], 0],
    ],
    '(i) The defense — the sentences are “not ornament for its own sake” — answers the charge that the prose is excessive: **overwrought**. (ii) Sentences that double back and qualify themselves copy how thought moves: they **mimic** it.',
    [
      '“Austere” (plain, severe) is the opposite of long, winding sentences; “derivative” is about originality, which the defense doesn’t address.',
      'Winding sentences don’t “simplify” thought, and the point is to reveal thought’s movement, not “conceal” it.',
    ],
  ),
  passage('mirror', mirror, [
    rc(
      2,
      'According to the passage, an animal in the mirror test is taken to recognize its reflection as itself if it',
      [
        'examines a mark on its own body that it could see only in the mirror',
        'looks at the mirror longer than at other objects',
        'touches the mirror where the reflection of the mark appears',
        'avoids the mirror after being marked',
        'places similar marks on other animals',
      ],
      0,
      'The criterion: the animal “touches or inspects the mark while looking at its reflection” — the mark on its own body, placed where it “cannot see directly” (A). Touching the mirror image (C) is exactly what would not count; the others aren’t mentioned.',
    ),
    rc(
      3,
      'The two groups of researchers described in the passage disagree most directly about whether',
      [
        'the wrasse’s success reveals a flaw in the test or a flaw in common assumptions about fish',
        'the cleaner wrasse actually touched the mark',
        'chimpanzees are capable of self-recognition',
        'animals should be anesthetized before being marked',
        'magpies have passed the test',
      ],
      0,
      'One side says the wrasse result shows the test is a poor measure; the other says the result may be sound and our view of fish should change (A). Neither side disputes the observation itself (B); (C), (D), and (E) aren’t in dispute.',
    ),
    rcSelect(
      3,
      'Select the sentence in which the author identifies a limitation of the test that holds regardless of how the wrasse controversy is resolved.',
      mirrorSentences,
      8,
      '“Either way” signals a point independent of which side is right: the test detects a behavior, and any conclusion about an inner state depends on the reasoning linking the two. The sentences before it report the controversy without judging the test in general.',
    ),
  ]),
  se(
    2,
    'The theory, once _____, is now taught in introductory courses as settled fact.',
    ['heterodox', 'unorthodox', 'fashionable', 'established', 'obscure', 'celebrated'],
    [0, 1],
    '“Once … now settled fact” sets up a contrast: the theory used to be outside accepted opinion — **heterodox**, **unorthodox**. “Established” agrees with “settled fact” instead of contrasting; “fashionable” and “celebrated” don’t contrast with it either.',
  ),
  se(
    3,
    'Though he cultivated a reputation for _____, the senator privately spent lavishly on art and travel.',
    ['frugality', 'parsimony', 'extravagance', 'profligacy', 'candor', 'erudition'],
    [0, 1],
    '“Though” contrasts the reputation with lavish private spending, so the reputation was for thrift: **frugality**, **parsimony**. “Extravagance” and “profligacy” are the trap pair — they describe his real behavior, destroying the contrast.',
  ),
  se(
    3,
    'The essay’s case is built so _____ that readers may not notice how far they have been carried from uncontroversial premises to a startling conclusion.',
    ['incrementally', 'gradually', 'hastily', 'transparently', 'polemically', 'erratically'],
    [0, 1],
    'Readers fail to notice the distance traveled only if each step is small: **incrementally**, **gradually**. A “hasty,” “polemical,” or “erratic” case would be noticed; “transparently” would let readers see exactly where they were going.',
  ),
  se(
    3,
    'The diplomat’s _____ was legendary: in thirty years of negotiations, no one could recall his giving a straight answer to a direct question.',
    ['prevarication', 'equivocation', 'bluntness', 'forthrightness', 'patience', 'erudition'],
    [0, 1],
    'Never giving a straight answer is **prevarication** or **equivocation** — evasive, deliberately unclear speech. “Bluntness” and “forthrightness” are a pair meaning the opposite; “patience” and “erudition” don’t explain the missing straight answers.',
  ),
  passage('concrete', concrete, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'describing explanations for the durability of Roman concrete, including a recent reinterpretation of one of its features',
        'arguing that modern concrete should be replaced by Roman concrete',
        'explaining why the Pantheon’s dome has outlasted other Roman buildings',
        'criticizing earlier researchers for careless experiments',
        'describing how the Romans discovered the uses of volcanic ash',
      ],
      0,
      'Paragraph one gives the older explanations (volcanic ash, seawater-grown crystals); paragraph two reinterprets lime clasts as self-healing (A). Engineers only experiment with imitations (not B); the Pantheon is one example among several (C); the “careless work” was attributed to the Romans, not the researchers (D).',
    ),
    rc(
      3,
      'It can be inferred that the “earlier investigators” mentioned in the passage believed that',
      [
        'lime clasts showed that the concrete’s ingredients had been incompletely mixed',
        'lime clasts were responsible for the concrete’s durability',
        'seawater weakens concrete over time',
        'the Romans added quicklime to their concrete deliberately',
        'volcanic ash played no part in the concrete’s strength',
      ],
      0,
      'They “dismissed [the clasts] as a sign of careless work,” reasoning that thorough mixing would leave no lumps (A). (B) and (D) are the newer view the passage contrasts with theirs; nothing supports (C) or (E).',
    ),
    rc(
      3,
      'The statement that “whether the Romans understood this or benefited from it by accident is unknown” serves primarily to',
      [
        'acknowledge that the finding about self-healing does not settle the question of the Romans’ intentions',
        'cast doubt on the claim that lime clasts can fill cracks',
        'suggest that engineers will be unable to imitate Roman concrete',
        'imply that the 2023 study was flawed',
        'argue that Roman builders were careless after all',
      ],
      0,
      'The study explains what the clasts do; the author adds that this doesn’t reveal whether the Romans intended it (A). The self-healing mechanism isn’t doubted (B, D), engineers are already trying to imitate it (not C), and “by accident” doesn’t mean “careless” (E).',
    ),
    rcMulti(
      3,
      'According to the passage, which of the following contributes to the strength or durability of at least some Roman concrete?',
      [
        'The reaction of volcanic ash with lime',
        'The growth of crystals promoted by seawater',
        'Thorough mixing that leaves no lumps of lime',
      ],
      [0, 1],
      'Volcanic ash reacting with lime forms “unusually stable minerals” (A), and in marine structures seawater “promotes the growth of interlocking crystals that strengthen it” (B). (C) is backwards — the lumps left by hot mixing are what let the concrete heal.',
    ),
  ]),
]);
