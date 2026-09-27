// Practice Test 1 — Verbal Reasoning.
// Section 1 (12): TC 1–3 · short passage 4–5 · SE 6–9 · passage 10–12.
// Section 2 (15): TC 1–4 · reading 5–7 · SE 8–11 · reading 12–15.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const farming = `Conventional wisdom holds that the shift from hunting and gathering to agriculture improved human well-being, since farming produced more reliable supplies of food. Skeletal evidence from several early farming communities complicates this view. Compared with the remains of foragers who lived in the same regions a few centuries earlier, the remains of early farmers frequently show reduced adult stature, more dental cavities, and more signs of nutritional stress in childhood. Some researchers conclude that early agriculture made most people worse off. Others caution that skeletons record only those who died, and that farming communities, whose populations grew rapidly, may have kept alive many sickly individuals who in a foraging band would not have survived to adulthood at all—an effect that would make a farming population look less healthy even if farming had improved most people's prospects.`;

const serials = `For much of the twentieth century, critics treated the serial publication of Victorian novels—issued in monthly or weekly parts over a year or more—as an unfortunate commercial necessity. The demand for a gripping moment at the end of each installment, they argued, encouraged melodrama and padding, and the novels that survived as classics did so in spite of the form.

More recent scholarship has questioned this judgment. Because readers encountered a serial novel over many months, often discussing each part before the next appeared, the form encouraged a distinctive kind of attention: characters could develop slowly, subplots could recede and return, and the long gaps between installments gave minor figures time to become familiar. Some novelists also adjusted later installments in light of how earlier ones had been received, so that the finished work bears traces of an exchange between author and audience that a novel published all at once could not record.

None of this makes every serial virtue a deliberate achievement. Much of what now looks like artful patience was likely produced by the practical need to fill a fixed number of pages each month. But to explain a feature's origin is not to explain it away; a technique born of necessity can still shape how readers experience a book.`;

export const V1 = section(1, 'v1', [
  tc(
    1,
    'Although the committee’s report was praised for its thoroughness, critics noted that its recommendations were strangely _____, offering few concrete steps that any agency could actually carry out.',
    [[['nebulous', 'exhaustive', 'incendiary', 'pragmatic', 'costly'], 0]],
    '“Although … praised for its thoroughness” sets up a contrast, and the clue after the comma defines the blank: recommendations that offer “few concrete steps” are **nebulous** (vague, ill-defined). “Exhaustive” repeats the praise instead of contrasting with it; “pragmatic” is the opposite of what the clue describes; “incendiary” and “costly” aren’t supported by anything in the sentence.',
  ),
  tc(
    2,
    'The biographer’s portrait of the composer is (i)_____: rather than smoothing over his notorious feuds and petty vindictiveness, it presents them in unsparing detail, a choice that some admirers of the music have found (ii)_____.',
    [
      [['hagiographic', 'unflinching', 'cursory'], 1],
      [['disconcerting', 'reassuring', 'irrelevant'], 0],
    ],
    'Blank (i): the colon promises a restatement — a portrait that presents flaws “in unsparing detail” rather than smoothing them over is **unflinching**. Blank (ii): admirers of the music confronted with the composer’s pettiness would find that **disconcerting** (unsettling).',
    [
      '“Hagiographic” (idealizing, saint-like) is exactly what the biography refuses to be; “cursory” contradicts “unsparing detail”.',
      'Nothing suggests admirers were comforted (“reassuring”), and “irrelevant” ignores that they reacted to the choice at all.',
    ],
  ),
  tc(
    3,
    'Early accounts of the expedition, written largely by its sponsors, were (i)_____ in tone, celebrating every minor discovery as a triumph. Only when the private journals of the crew were published a century later did a more (ii)_____ picture emerge: one of chronic mismanagement and of successes that owed more to luck than to (iii)_____.',
    [
      [['triumphalist', 'measured', 'skeptical'], 0],
      [['sobering', 'flattering', 'fanciful'], 0],
      [['foresight', 'providence', 'hardship'], 0],
    ],
    '(i) Accounts “celebrating every minor discovery as a triumph” are **triumphalist**. (ii) “Only when … did a more ___ picture emerge” signals a contrast with the celebration, and the colon describes it: mismanagement — a **sobering** picture. (iii) Successes owing “more to luck than to” something: the contrast to luck in a story about mismanagement is planning, i.e. **foresight**.',
    [
      '“Measured” and “skeptical” describe the later journals, not the sponsors’ celebrations.',
      '“Flattering” and “fanciful” fit the sponsors’ accounts, which is what this picture contrasts with.',
      '“Providence” (divine guidance) is close to luck, not its opposite; “hardship” isn’t something successes are owed to.',
    ],
  ),
  passage('farming', farming, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'present evidence that complicates a common belief and describe a disagreement about how to interpret that evidence',
        'argue that the adoption of agriculture harmed the health of most early farmers',
        'explain why foraging populations remained healthier than farming populations',
        'criticize researchers who draw conclusions from skeletal remains',
        'trace the historical causes of the shift from foraging to agriculture',
      ],
      0,
      'The passage states a belief (farming improved well-being), gives evidence that complicates it (farmers’ skeletons look less healthy), and then lays out two interpretations — “Some researchers conclude …” and “Others caution …”. Choice (A) covers all three moves. (B) is only one side of the disagreement; the author doesn’t take it. (C) assumes the evidence is conclusive; (D) is too negative — the “others” qualify the evidence, they don’t condemn the researchers; (E) is never discussed.',
    ),
    rcMulti(
      3,
      'Which of the following statements about the skeletal evidence described in the passage are supported by the passage?',
      [
        'It is consistent with more than one account of how farming affected human health.',
        'It shows that early farmers died at younger ages than earlier foragers did.',
        'It may be affected by differences in which individuals survived to adulthood.',
      ],
      [0, 2],
      'A: yes — the two groups of researchers read the same evidence differently, so it fits more than one account. C: yes — that is exactly the “others’” point: farming communities may have kept sickly people alive who would have died young among foragers. B: no — the passage mentions stature, cavities, and childhood stress, never age at death. Answering B means importing an assumption the passage doesn’t make.',
    ),
  ]),
  se(
    1,
    'Despite the author’s reputation for _____, her latest novel is remarkably concise, rarely spending more than a paragraph on any single scene.',
    ['verbosity', 'brevity', 'prolixity', 'obscurity', 'elegance', 'candor'],
    [0, 2],
    '“Despite” signals that her reputation contrasts with “remarkably concise”, so the blank means wordiness: **verbosity** and **prolixity**. “Brevity” is the trap — it matches “concise” and so kills the contrast. The others don’t oppose conciseness.',
  ),
  se(
    2,
    'The senator’s speech was so _____ that even her longtime supporters could not say with confidence where she stood on the bill.',
    ['impassioned', 'equivocal', 'lucid', 'ambiguous', 'strident', 'concise'],
    [1, 3],
    'If supporters can’t tell where she stands, the speech was unclear on purpose or in effect: **equivocal** and **ambiguous**. “Lucid” and “concise” point the wrong way; “impassioned” and “strident” describe tone, not whether a position is clear — a fiery speech can still be perfectly clear.',
  ),
  se(
    2,
    'Far from being _____, the new regulations were the product of years of consultation with the very industries they govern.',
    ['arbitrary', 'deliberate', 'capricious', 'stringent', 'methodical', 'popular'],
    [0, 2],
    '“Far from being X, they were the product of years of consultation” — X must be the opposite of carefully considered: **arbitrary** and **capricious** (on a whim). Note the trap pair: “deliberate” and “methodical” are synonyms of each other but agree with the clue, so “far from being deliberate” contradicts the sentence. “Stringent” and “popular” have no partner and aren’t implied by the contrast.',
  ),
  se(
    3,
    'The historian argues that the treaty, often praised as a masterpiece of diplomacy, was in fact _____: the negotiators, lacking any coherent strategy, simply accepted whatever terms seemed least likely to provoke immediate conflict.',
    ['desultory', 'farsighted', 'calculated', 'haphazard', 'magnanimous', 'ruthless'],
    [0, 3],
    'The colon explains the blank: negotiators “lacking any coherent strategy” produced a treaty that was **haphazard** — and **desultory** (lacking plan or purpose) says the same. “Farsighted” and “calculated” form a tempting pair, but they describe the “masterpiece” view the historian rejects. “Magnanimous” and “ruthless” describe attitude, not planning.',
  ),
  passage('serials', serials, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'reassessing an unfavorable critical view of a publishing format',
        'explaining why Victorian novelists preferred to publish in installments',
        'arguing that serialized novels are superior to novels published all at once',
        'describing how Victorian readers discussed serialized fiction',
        'tracing the decline of serial publication in the twentieth century',
      ],
      0,
      'Paragraph 1 gives the older, dismissive view; paragraph 2 says recent scholarship “has questioned this judgment”; paragraph 3 qualifies the new view. That is a reassessment (A). (B) and (E) are never claimed. (C) overshoots — the author credits the form with distinctive effects, not superiority. (D) is a detail in paragraph 2, not the point of the passage.',
    ),
    rc(
      2,
      'The author mentions “the practical need to fill a fixed number of pages each month” primarily in order to',
      [
        'concede that some seemingly artful features of serial novels may have had practical origins',
        'support the earlier critics’ claim that serial publication produced inferior novels',
        'explain why some novelists revised later installments in response to readers',
        'suggest that minor characters were added mainly to satisfy readers',
        'argue that Victorian novelists were motivated chiefly by money',
      ],
      0,
      'The sentence opens paragraph 3’s concession — “None of this makes every serial virtue a deliberate achievement” — and then offers a practical source for what “now looks like artful patience”. That is (A). The author concedes a point to the older view without endorsing its verdict (B): the next sentence insists that origins don’t “explain away” a technique. (C), (D), and (E) misattribute or exaggerate.',
    ),
    rc(
      3,
      'The author’s statement that “to explain a feature’s origin is not to explain it away” suggests that the author believes which of the following?',
      [
        'A feature of a novel that arose from commercial pressure can still contribute to its literary effect.',
        'Commercial pressures had little influence on the form of Victorian novels.',
        'The value of a literary technique depends on whether its author intended it.',
        'Critics should not investigate why novelists adopted particular techniques.',
        'Serialized novels were written more carefully than earlier critics recognized.',
      ],
      0,
      'The author has just granted that some features came from practical necessity, then says this origin doesn’t cancel their effect: “a technique born of necessity can still shape how readers experience a book.” That is (A). (C) is the view the author is rejecting; (B) contradicts the concession; (D) goes too far — explaining origins is fine, it just isn’t a verdict. (E) is the trap: the author explicitly declines to call every virtue deliberate.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const magnet = `The discovery that some migratory birds can orient themselves using Earth's magnetic field raised an obvious question: where is the compass? One long-favored hypothesis located it in iron-containing cells in the upper beak, which might act like tiny bar magnets. A competing hypothesis proposes that the sense depends on light-sensitive proteins in the eye, in which a magnetic field could alter chemical reactions and thus, perhaps, what the bird sees. Experiments have tended to favor the second account: birds whose beak nerves were severed could often still orient, whereas birds tested under certain wavelengths of light could not. Yet the two mechanisms need not be rivals. A bird might use one to sense the direction of the field and the other to sense its strength, much as a hiker might use both a compass and a map.`;

const marlow = `In the city of Marlow, the number of reported bicycle thefts fell by 30 percent in the year after the city installed security cameras at its busiest bicycle racks. The city council concludes that the cameras deterred would-be thieves, and it plans to install cameras at every public bicycle rack in the city.`;

const commons = `In a widely cited 1968 essay, the ecologist Garrett Hardin argued that any resource open to all—a pasture, a fishery, the atmosphere—is doomed to overuse. Each herder gains the full benefit of adding one more animal to a shared pasture but bears only a fraction of the cost of the resulting overgrazing, so each has reason to keep adding animals until the pasture is ruined. Hardin concluded that such resources must either be divided into private property or be regulated by a central authority.

The political scientist Elinor Ostrom challenged the generality of this conclusion. Examining records of communities that had shared pastures, forests, fisheries, and irrigation systems, in some cases for centuries, she found many that had avoided ruin without either privatization or central control. These communities had devised their own rules—limits on how many animals each household could graze, rotating schedules for drawing water—along with ways of monitoring compliance and penalties for violators that began mildly and grew more severe with repeated offenses.

Ostrom did not claim that communities always succeed. Her point was that Hardin had described not a law of nature but the predictable outcome of a particular situation: one in which users cannot communicate, cannot make binding agreements, and have no stake in the resource's future. Where those conditions are absent—where users are few enough to know one another, expect to depend on the resource for generations, and can observe one another's behavior—cooperation becomes not only possible but, in her data, common. Hardin's herders were, in effect, strangers who would never meet again; Ostrom's were neighbors.`;

const commonsP3 = [
  'Ostrom did not claim that communities always succeed.',
  "Her point was that Hardin had described not a law of nature but the predictable outcome of a particular situation: one in which users cannot communicate, cannot make binding agreements, and have no stake in the resource's future.",
  "Where those conditions are absent—where users are few enough to know one another, expect to depend on the resource for generations, and can observe one another's behavior—cooperation becomes not only possible but, in her data, common.",
  "Hardin's herders were, in effect, strangers who would never meet again; Ostrom's were neighbors.",
];

export const V2H = section(1, 'v2h', [
  tc(
    2,
    'The scientist’s critics accused her of _____, but her readiness to revise her conclusions whenever new data appeared suggests that she was anything but dogmatic.',
    [[['intransigence', 'credulity', 'diffidence', 'inconsistency', 'pedantry'], 0]],
    '“Anything but dogmatic” tells you what the critics accused her of: being dogmatic — refusing to budge. **Intransigence** means exactly that. “Inconsistency” is the trap: her willingness to revise might look inconsistent, but the sentence contrasts the accusation with open-mindedness, so the accusation must be rigidity. “Credulity” (believing too easily) and “diffidence” (shyness) don’t match dogmatism.',
  ),
  tc(
    3,
    'Although the new theory has been hailed as (i)_____, its central insight is in fact (ii)_____: nineteenth-century naturalists stated essentially the same idea, though without the mathematical apparatus that now makes it seem so novel.',
    [
      [['revolutionary', 'derivative', 'untenable'], 0],
      [['time-worn', 'unprecedented', 'unfounded'], 0],
    ],
    '(ii) is decided first by the colon: naturalists stated the same idea in the nineteenth century, so the insight is old — **time-worn**. (i) “Although … hailed as ___” must contrast with “old”, and “seem so novel” confirms it: **revolutionary**.',
    [
      '“Derivative” agrees with the author’s view instead of contrasting with it; “untenable” is about truth, not novelty.',
      '“Unprecedented” is what the praise claims, not what the author asserts; “unfounded” is never suggested — the idea is old, not wrong.',
    ],
  ),
  tc(
    2,
    'The minister’s reputation for (i)_____ was so well established that when she finally spoke bluntly about the budget crisis, observers took her uncharacteristic (ii)_____ as a sign of how grave the situation had become.',
    [
      [['circumspection', 'candor', 'volubility'], 0],
      [['forthrightness', 'reticence', 'levity'], 0],
    ],
    '(ii) restates “spoke bluntly”: **forthrightness**. It was “uncharacteristic”, so her reputation (i) was for the opposite — caution in speech, **circumspection**.',
    [
      '“Candor” is the blunt speech she was NOT known for; “volubility” (talkativeness) isn’t the opposite of bluntness.',
      '“Reticence” is her usual manner, not the uncharacteristic behavior; “levity” (joking) contradicts “how grave”.',
    ],
  ),
  tc(
    3,
    'The (i)_____ of the archive’s catalog, which lists thousands of documents under headings so broad as to be nearly meaningless, has long (ii)_____ researchers, many of whom have come to suspect that the collection’s reputed treasures are more (iii)_____ than real.',
    [
      [['imprecision', 'thoroughness', 'brevity'], 0],
      [['frustrated', 'emboldened', 'reassured'], 0],
      [['legendary', 'accessible', 'valuable'], 0],
    ],
    'Headings “so broad as to be nearly meaningless” describe (i) **imprecision**, which would have (ii) **frustrated** researchers. Unable to find the famous documents, they suspect the treasures are (iii) more **legendary** — talked about — than real.',
    [
      'A catalog listing thousands of documents is not brief, and meaningless headings aren’t thoroughness.',
      'A useless catalog wouldn’t embolden or reassure anyone.',
      '“More accessible than real” and “more valuable than real” don’t make sense as contrasts with “real”.',
    ],
  ),
  passage('magnet', magnet, [
    rc(
      2,
      'The author mentions a hiker using “both a compass and a map” primarily in order to',
      [
        'illustrate how two mechanisms could serve different but complementary purposes',
        'suggest that birds navigate by memorizing landmarks along their routes',
        'argue that experiments have favored the second hypothesis for the wrong reasons',
        'show that the magnetic sense is less precise than human navigation tools',
        'indicate that the direction of the magnetic field matters more than its strength',
      ],
      0,
      'The analogy follows “the two mechanisms need not be rivals. A bird might use one to sense the direction … and the other to sense its strength”. A compass and a map do different jobs that work together — (A). Nothing in the passage mentions landmarks (B), criticizes the experiments (C), or ranks precision or importance (D, E).',
    ),
    rcMulti(
      3,
      'Which of the following can be inferred from the passage about the experiments it describes?',
      [
        'They provide evidence against the view that iron-containing cells in the beak are necessary for birds’ orientation.',
        'They establish that birds are unable to sense the strength of the magnetic field.',
        'They do not rule out the possibility that cells in the beak play some role in navigation.',
      ],
      [0, 2],
      'A: birds with severed beak nerves “could often still orient”, so the beak isn’t required for orientation. C: right after the experiments, the author says the mechanisms “need not be rivals” and proposes a role for both — so the experiments leave room for the beak. B: nothing in the experiments concerns field strength; the passage in fact suggests birds may sense it.',
    ),
  ]),
  argument(
    'marlow',
    marlow,
    rc(
      3,
      'Which of the following, if true, most seriously weakens the council’s conclusion?',
      [
        'During the same year, a popular bicycle-sharing program led many Marlow residents to sell their own bicycles, sharply reducing the number of privately owned bicycles left at public racks.',
        'Security cameras have also been used to deter vandalism in several of Marlow’s public parks.',
        'Some bicycle thefts in Marlow occur at private residences rather than at public racks.',
        'Installing cameras at every public rack would cost more than the initial installation did.',
        'Most residents surveyed said they felt safer leaving their bicycles at racks with cameras.',
      ],
      0,
      'The council infers cause (cameras) from a correlation (thefts fell after cameras went in). The strongest weakener supplies another cause for the drop: if far fewer bicycles were left at racks, there was less to steal, cameras or not — (A). (D) attacks the plan’s cost, not the conclusion; (C) and (B) are irrelevant to whether cameras caused this drop; (E), if anything, makes the cameras look effective.',
    ),
  ),
  se(
    2,
    'Critics found the playwright’s dialogue _____, its characters speaking in polished epigrams that no actual person would produce in conversation.',
    ['stilted', 'naturalistic', 'artificial', 'colloquial', 'laconic', 'profane'],
    [0, 2],
    'Polished epigrams “no actual person would produce” make dialogue unnatural: **stilted**, **artificial**. “Naturalistic” and “colloquial” form a pair too — but they mean the opposite of the clue. “Laconic” (few words) and “profane” aren’t implied.',
  ),
  se(
    2,
    'Though the committee’s final report was _____, its members privately acknowledged deep disagreements that the document’s unanimous language had papered over.',
    ['contentious', 'harmonious', 'perfunctory', 'concordant', 'tendentious', 'discordant'],
    [1, 3],
    '“Though … privately acknowledged deep disagreements” and “unanimous language” tell you the report looked unified: **harmonious**, **concordant**. The trap pair “contentious/discordant” describes the private reality, not the report — the “though” needs the contrast.',
  ),
  se(
    3,
    'Although the essayist cultivated an air of _____, affecting indifference to both praise and criticism, his private letters reveal a man acutely sensitive to every review.',
    ['insouciance', 'fastidiousness', 'rancor', 'nonchalance', 'obsequiousness', 'trepidation'],
    [0, 3],
    '“Affecting indifference” defines the blank: **insouciance** and **nonchalance** both mean carefree unconcern. “Trepidation” (anxiety) is what the letters reveal, not the air he cultivated; “obsequiousness” (fawning), “rancor” (bitterness) and “fastidiousness” (fussiness) have no support.',
  ),
  se(
    3,
    'The regime’s promises of reform proved _____: within months, the newly granted freedoms had been quietly rescinded.',
    ['sweeping', 'illusory', 'sincere', 'chimerical', 'durable', 'gradual'],
    [1, 3],
    'Freedoms rescinded within months mean the reforms were not real: **illusory** and **chimerical** (existing only as a fantasy). “Sincere” and “durable” are contradicted by the colon; “sweeping” and “gradual” describe scope and pace, not whether the promises were real.',
  ),
  passage('commons', commons, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'describe a challenge to the scope of an influential argument',
        'defend the view that shared resources should be privately owned',
        'show that central authorities manage shared resources poorly',
        'explain why Hardin’s essay has been so widely cited',
        'compare the management of pastures with that of fisheries',
      ],
      0,
      'Paragraph 1 presents Hardin’s argument; paragraphs 2–3 present Ostrom’s challenge to its “generality” — she argues it holds under particular conditions, not always. That’s (A). (B) is one of Hardin’s options, not the author’s view; (C) and (E) are not discussed; (D) touches only the first phrase.',
    ),
    rcMulti(
      2,
      'According to the passage, the communities that Ostrom studied did which of the following?',
      [
        'Set limits on how much of a shared resource each household could use',
        'Imposed penalties that grew more severe for repeat violators',
        'Relied on a central authority to enforce limits on use',
      ],
      [0, 1],
      'Paragraph 2 lists “limits on how many animals each household could graze” (A) and penalties “that began mildly and grew more severe with repeated offenses” (B). (C) is the opposite: they avoided ruin “without either privatization or central control”.',
    ),
    rc(
      3,
      'It can be inferred that Ostrom would most likely regard which of the following as the greatest threat to the sustainable management of a shared fishery?',
      [
        'An influx of transient fishing crews with no long-term ties to the area',
        'A gradual increase in the number of fish caught by each household',
        'A system of fines that increases with repeated violations',
        'A rule rotating access to the most productive fishing grounds',
        'A regional agency that collects data on each year’s catch',
      ],
      0,
      'Ostrom’s conditions for cooperation are users who know one another, expect to depend on the resource for generations, and can watch one another. Transient crews with no long-term stake recreate Hardin’s “strangers who would never meet again” — (A). (C) and (D) are the kind of rules her successful communities used; (B) might be a problem, but not the structural threat her analysis identifies; (E) is neutral.',
    ),
    rcSelect(
      3,
      'Select the sentence in the third paragraph that identifies the circumstances in which, according to the passage, Hardin’s predicted outcome is to be expected.',
      commonsP3,
      1,
      'Sentence 2 says Hardin described “the predictable outcome of a particular situation: one in which users cannot communicate, cannot make binding agreements, and have no stake in the resource’s future” — those are the circumstances. Sentence 3 is the trap: it gives the conditions under which cooperation is common, i.e. when Hardin’s outcome is NOT expected. Sentence 4 restates the contrast as an image but lists no circumstances.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const bees = `When a honeybee forager returns to the hive after finding a rich source of food, she often performs what is called a waggle dance on the vertical surface of the comb. The dancer runs forward in a straight line while waggling her body, then circles back and repeats the run. In the 1940s the zoologist Karl von Frisch proposed that the dance encodes the location of the food: the angle of the waggle run relative to vertical corresponds to the angle between the direction of the food and the direction of the sun, and the duration of the run corresponds to the distance. Some researchers doubted that bees actually used this information, suggesting instead that recruits found food by following its odor. Later experiments, including ones that tracked individual recruits by radar, showed that recruits did fly in the directions the dances indicated—though odor, it turned out, also helps them pinpoint the source once they are near.`;

const techlane = `A survey of employees at Techlane found that those who used the company's on-site gym at least twice a week took, on average, fewer sick days than those who did not. Techlane's management concluded that regular exercise at the gym reduces the number of sick days employees take, and it plans to offer bonuses to employees who use the gym.`;

const tubes = `The collapsible metal paint tube, patented in 1841 by the American portrait painter John Goffe Rand, is often credited with making Impressionism possible. Before its invention, painters commonly stored oil paints in small bladders that were difficult to seal and to carry, which made sustained work outdoors impractical. Tubes allowed painters to take a full range of prepared colors into the countryside and to work directly from nature, capturing effects of light that changed from hour to hour. Yet the tube alone cannot account for the movement. Painters had sketched outdoors long before 1841, and many who owned tubes continued to finish their pictures in the studio. What distinguished the Impressionists was less a new tool than a new idea of what a finished painting could be—one in which the visible, rapid brushwork of the outdoor sketch was no longer a preliminary step but the final result.`;

export const V2E = section(1, 'v2e', [
  tc(
    1,
    'Because the museum’s new wing was designed to be _____, visitors can easily find their way from one gallery to the next without consulting a map.',
    [[['intuitive', 'ornate', 'cramped', 'labyrinthine', 'temporary'], 0]],
    '“Because” signals cause and effect: visitors find their way easily because the layout is **intuitive**. “Labyrinthine” (maze-like) is the opposite; “ornate”, “cramped”, and “temporary” don’t explain easy navigation.',
  ),
  tc(
    1,
    'Maria’s _____ was evident in her refusal to accept credit for the project, even though she had done most of the work.',
    [[['modesty', 'arrogance', 'indifference', 'ambition', 'resentment'], 0]],
    'Refusing credit you’ve earned shows **modesty**. “Indifference” is tempting, but the sentence gives no sign she didn’t care about the project — only that she declined the credit.',
  ),
  tc(
    2,
    'The first reviews of the film were (i)_____, but as audiences discovered it through word of mouth, its reputation (ii)_____, and it is now regarded as a classic.',
    [
      [['tepid', 'glowing', 'belated'], 0],
      [['burgeoned', 'waned', 'stalled'], 0],
    ],
    '“Now regarded as a classic” means the reputation (ii) **burgeoned** (grew rapidly). “But” contrasts the growth with the first reviews, so they were (i) **tepid** (lukewarm).',
    [
      '“Glowing” reviews wouldn’t contrast with later success; “belated” is about timing, not opinion.',
      'A reputation that “waned” or “stalled” couldn’t produce a classic.',
    ],
  ),
  tc(
    2,
    'Although the recipe appears (i)_____, requiring only a handful of ingredients, the dish is notoriously difficult to (ii)_____; even experienced cooks find that small errors in timing can (iii)_____ the result.',
    [
      [['simple', 'elaborate', 'expensive'], 0],
      [['master', 'describe', 'afford'], 0],
      [['ruin', 'improve', 'reveal'], 0],
    ],
    '(i) “Requiring only a handful of ingredients” → **simple**. (ii) “Although” contrasts that with difficulty — difficult to **master**. (iii) Small errors that make it hard even for experienced cooks **ruin** the result.',
    [
      'A handful of ingredients isn’t elaborate, and nothing mentions cost.',
      'The difficulty is in cooking it, not describing or paying for it.',
      'Errors don’t improve a dish; “reveal” doesn’t fit “the result”.',
    ],
  ),
  passage('bees', bees, [
    rc(
      1,
      'According to the passage, von Frisch proposed that the duration of a bee’s waggle run indicates',
      [
        'the distance to the food source',
        'the direction of the sun',
        'the quantity of food available',
        'the odor of the food',
        'the time of day the food was found',
      ],
      0,
      'The passage says “the duration of the run corresponds to the distance.” The angle of the run, not its duration, carries direction; quantity, odor, and time of day aren’t encoded according to von Frisch’s proposal.',
    ),
    rc(
      2,
      'The author mentions researchers who “doubted that bees actually used this information” primarily in order to',
      [
        'introduce an alternative explanation that later evidence only partly supported',
        'show that von Frisch’s proposal was eventually abandoned',
        'argue that odor is more important to foraging than dance is',
        'explain why the waggle dance is performed on a vertical surface',
        'criticize the use of radar in studies of insects',
      ],
      0,
      'The doubters proposed odor instead of the dance. Radar experiments showed recruits do follow the dance’s directions (so the doubters were wrong about that), “though odor … also helps” near the source (so they were partly right). That is (A). (B) and (C) contradict the passage’s conclusion.',
    ),
    rc(
      2,
      'Which of the following, if true, would most strongly support von Frisch’s proposal about the dance?',
      [
        'When bees dance on a horizontal surface in view of the sun, the waggle run points directly toward the food.',
        'Recruits that are prevented from smelling the dancer still leave the hive.',
        'Bees perform the dance more often when food is plentiful.',
        'Some bee species do not perform a waggle dance at all.',
        'Recruits sometimes arrive at a food source before the dancer returns to it.',
      ],
      0,
      'Von Frisch said the angle of the run on the vertical comb encodes the angle between food and sun. If, when the sun can be seen directly, the run simply points at the food, that confirms the run is a coded direction — (A). (B) says recruits leave but not where they go; (C) and (D) are about how often or whether bees dance, not what the dance encodes; (E) doesn’t connect to the dance’s content.',
    ),
  ]),
  se(
    1,
    'The instructions were so _____ that even first-time users assembled the shelf in minutes.',
    ['lengthy', 'clear', 'confusing', 'lucid', 'technical', 'brief'],
    [1, 3],
    'Instructions that let first-timers finish in minutes are **clear** and **lucid**. “Brief” is tempting, but short instructions aren’t necessarily easy to follow, and it has no partner with the same meaning.',
  ),
  se(
    1,
    'Though generally _____, the coach could become quite animated when she believed her players were being treated unfairly.',
    ['excitable', 'placid', 'cheerful', 'calm', 'strict', 'talkative'],
    [1, 3],
    '“Though generally ___, she could become quite animated” — the blank contrasts with animated: **placid** and **calm**. “Excitable” agrees with “animated” and kills the contrast.',
  ),
  se(
    2,
    'The company’s _____ response to the safety complaints—a single brief statement issued weeks after the first reports—angered customers who had expected immediate action.',
    ['swift', 'dilatory', 'comprehensive', 'tardy', 'apologetic', 'candid'],
    [1, 3],
    'A statement issued “weeks after the first reports” when customers expected “immediate action” is slow: **dilatory** and **tardy**. “Swift” is the opposite; “comprehensive” contradicts “a single brief statement”.',
  ),
  se(
    2,
    'Scholars once dismissed the diary as _____, but recent analysis of its paper and ink has confirmed that it was written in the period it describes.',
    ['authentic', 'spurious', 'trivial', 'counterfeit', 'genuine', 'fragmentary'],
    [1, 3],
    '“But … confirmed that it was written in the period it describes” — so scholars had dismissed it as fake: **spurious**, **counterfeit**. The pair “authentic/genuine” is what the analysis confirmed, so it can’t be what the scholars dismissed it as.',
  ),
  argument(
    'techlane',
    techlane,
    rc(
      2,
      'The management’s conclusion depends on which of the following assumptions?',
      [
        'Employees who use the gym regularly were not already healthier, for reasons unrelated to the gym, than employees who do not.',
        'Most Techlane employees would use the gym more often if they were offered bonuses.',
        'The gym is open during all of Techlane’s working hours.',
        'Employees who take fewer sick days are more productive than those who take more.',
        'Other companies have offered bonuses for gym use.',
      ],
      0,
      'The conclusion is causal: the gym REDUCES sick days. That requires ruling out the reverse explanation — healthier people are the ones who go to the gym. Negate (A): if gym users were already healthier for other reasons, the survey no longer shows that the gym helps. (B) matters to the bonus plan, not to the conclusion. (C), (D), and (E) aren’t needed.',
    ),
  ),
  passage('tubes', tubes, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'evaluating the claim that a technical innovation was responsible for an artistic movement',
        'describing how painters stored their paints before 1841',
        'explaining why Impressionist paintings were controversial',
        'arguing that Rand deserves more credit than the Impressionists',
        'comparing studio painting with outdoor sketching',
      ],
      0,
      'The passage opens with the claim that the paint tube made Impressionism possible, grants what tubes did, then argues “the tube alone cannot account for the movement”. That is an evaluation of the claim (A). (B) and (E) are details; (C) and (D) are never discussed.',
    ),
    rc(
      2,
      'The author mentions that “painters had sketched outdoors long before 1841” in order to',
      [
        'show that outdoor painting did not depend entirely on the paint tube',
        'suggest that the Impressionists were not interested in painting outdoors',
        'explain why paint was stored in bladders',
        'argue that the paint tube was invented earlier than is usually thought',
        'praise the skill of painters who worked before the paint tube existed',
      ],
      0,
      'This is evidence for “the tube alone cannot account for the movement”: if painters worked outdoors before tubes existed, outdoor work didn’t depend entirely on the tube — (A). The rest either contradicts the passage (B, D) or isn’t its point (C, E).',
    ),
    rcMulti(
      2,
      'According to the passage, which of the following was true of painting before the invention of the collapsible paint tube?',
      [
        'Oil paints were commonly stored in containers that were hard to seal.',
        'Painters never worked outdoors.',
        'Sustained work outdoors was impractical.',
      ],
      [0, 2],
      'The passage says paints were stored “in small bladders that were difficult to seal and to carry, which made sustained work outdoors impractical” — A and C. B is contradicted: “Painters had sketched outdoors long before 1841.” Notice the difference between “impractical” and “never”.',
    ),
  ]),
]);
