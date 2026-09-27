// Practice Test 2 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const oxygen = `Geochemical evidence indicates that free oxygen began to accumulate in Earth's atmosphere roughly 2.4 billion years ago. Yet cyanobacteria, the microbes whose photosynthesis produced that oxygen, may have evolved hundreds of millions of years earlier. Why the delay? One answer is that oxygen was consumed as fast as it was produced: dissolved iron in the oceans and gases released by volcanoes reacted readily with it, so that none could build up until these "sinks" were exhausted or diminished. On this view, the atmosphere changed not when oxygen production began but when production finally outpaced consumption—much as a bathtub with an open drain begins to fill only once the tap delivers water faster than the drain removes it.`;

const inventories = `Historians interested in the material lives of ordinary people in the eighteenth century have relied heavily on probate inventories—lists of a person's possessions compiled after death for the purpose of settling an estate. Because inventories were drawn up for large numbers of people and itemize everything from furniture to cooking pots, they seem to offer an unusually democratic window onto the past. Yet the window is not as wide as it appears. Estates were inventoried more often when there was property worth dividing, so the poorest households are underrepresented. And because inventories record possessions at death, they overrepresent the old, whose households may have accumulated goods over decades—or, conversely, may already have passed many of them on to their children.

Some historians have responded by treating inventories as a record of what was possible rather than what was typical: the presence of teacups in a modest farmer's inventory shows that such goods had reached people of his station, even if it cannot show how many of his neighbors owned them. Others have sought to correct the biases statistically, weighting inventories by the age and wealth of the deceased. Neither approach recovers the households that left no inventory at all.`;

export const V1 = section(2, 'v1', [
  tc(
    1,
    'The documentary’s narrator adopts a deliberately _____ tone, presenting even the most shocking revelations in calm, matter-of-fact language.',
    [[['dispassionate', 'sensational', 'whimsical', 'indignant', 'reverent'], 0]],
    'The clue “calm, matter-of-fact language” even for shocking material defines a **dispassionate** tone — free of emotion. “Sensational” and “indignant” are the emotional tones the narrator avoids; “whimsical” (playful) and “reverent” (worshipful) don’t match “matter-of-fact”.',
  ),
  tc(
    2,
    'For decades the fern was thought to be (i)_____, found only on a single mountainside in Chile; the recent discovery of thriving populations on three other continents has (ii)_____ that view.',
    [
      [['endemic', 'ubiquitous', 'extinct'], 0],
      [['overturned', 'confirmed', 'refined'], 0],
    ],
    '(i) The phrase after the comma defines the blank: “found only on a single mountainside” — **endemic** (native to and restricted to one place). (ii) Populations on three other continents contradict that, so they have **overturned** it.',
    [
      '“Ubiquitous” (found everywhere) is the new finding, not the old belief; “extinct” contradicts “found … on a single mountainside”.',
      'The discovery doesn’t confirm or merely refine “found only in one place” — it destroys it.',
    ],
  ),
  tc(
    3,
    'The philosopher’s prose is so (i)_____ that readers often mistake its difficulty for depth; yet those who persevere tend to find that, once her sentences are (ii)_____, the ideas they express are surprisingly (iii)_____.',
    [
      [['convoluted', 'lucid', 'terse'], 0],
      [['disentangled', 'memorized', 'published'], 0],
      [['conventional', 'profound', 'obscure'], 0],
    ],
    '(i) Prose whose “difficulty” is mistaken for depth is **convoluted**. (ii) What persistent readers do to convoluted sentences is untangle them — **disentangled**. (iii) “Mistake its difficulty for depth” means there is less depth than there seems, and “surprisingly” marks the reversal: the ideas are **conventional**.',
    [
      '“Lucid” prose isn’t difficult; “terse” prose is short, not tangled.',
      'Memorizing or publishing sentences doesn’t reveal what they mean.',
      '“Profound” is the trap — it is exactly what readers wrongly assumed, so it can’t be the surprise. “Obscure” just repeats the difficulty.',
    ],
  ),
  passage('oxygen', oxygen, [
    rc(
      2,
      'The author mentions a bathtub primarily in order to',
      [
        'illustrate the idea that accumulation depends on the balance between what is added and what is removed',
        'suggest that oxygen production was interrupted for long periods',
        'argue that the oceans once contained more oxygen than the atmosphere',
        'explain why cyanobacteria evolved when they did',
        'show that the timing of the rise in oxygen cannot be determined',
      ],
      0,
      'The analogy immediately follows “production finally outpaced consumption”: a tub with an open drain fills only when the tap beats the drain. That is (A) — accumulation depends on the balance. Nothing suggests production stopped (B), compares oceans and air (C), explains when the microbes evolved (D), or says the timing is unknowable (E).',
    ),
    rcMulti(
      3,
      'Which of the following is consistent with the explanation described in the passage?',
      [
        'Cyanobacteria were producing oxygen long before oxygen accumulated in the atmosphere.',
        'A decline in volcanic activity could have contributed to the rise of atmospheric oxygen.',
        'Oxygen began to accumulate as soon as cyanobacteria first evolved.',
      ],
      [0, 1],
      'A: yes — the whole explanation is about a delay between production and accumulation. B: yes — volcanic gases were one of the “sinks”; fewer of them would mean less consumption, letting oxygen build up sooner. C: no — that denies the delay the explanation is meant to account for.',
    ),
  ]),
  se(
    1,
    'Though the manager’s decisions often struck her staff as _____, they were in fact based on months of careful analysis of sales data.',
    ['rash', 'prudent', 'impetuous', 'calculated', 'unpopular', 'lenient'],
    [0, 2],
    '“Though … in fact based on months of careful analysis” — the staff saw the decisions as the opposite of careful: **rash**, **impetuous**. “Prudent” and “calculated” agree with the careful analysis, which kills the contrast. “Unpopular” and “lenient” aren’t the opposite of careful.',
  ),
  se(
    2,
    'The mayor’s plan, initially greeted with _____, gradually won over even its fiercest critics.',
    ['skepticism', 'enthusiasm', 'incredulity', 'acclaim', 'indifference', 'amusement'],
    [0, 2],
    'If the plan had to “win over … its fiercest critics”, its first reception was doubt: **skepticism** and **incredulity** (disbelief). “Enthusiasm” and “acclaim” are a tempting pair, but a plan greeted with acclaim wouldn’t need to win anyone over. “Indifference” has no partner and doesn’t fit “fiercest critics”.',
  ),
  se(
    2,
    'Her argument, though _____, rests on a single questionable premise; once that premise is removed, the entire structure collapses.',
    ['intricate', 'flimsy', 'elaborate', 'novel', 'tenuous', 'brief'],
    [0, 2],
    '“Though ___, rests on a single premise … the entire structure collapses” — the blank contrasts with fragility, so the argument looks substantial: **intricate**, **elaborate**. “Flimsy” and “tenuous” form a pair, but they agree with “collapses” instead of contrasting with it. “Novel” and “brief” have no partners.',
  ),
  se(
    3,
    'Although the governor publicly described the budget outlook as _____, her own advisers warned privately that a deficit was all but certain.',
    ['sanguine', 'dire', 'rosy', 'precarious', 'ambiguous', 'candid'],
    [0, 2],
    '“Although … advisers warned privately that a deficit was all but certain” — publicly she painted the opposite picture: **sanguine** (optimistic) and **rosy**. “Dire” and “precarious” describe the private warning, not the public spin. “Ambiguous” and “candid” have no partners.',
  ),
  passage('inventories', inventories, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'discuss the limitations of a kind of historical evidence and ways historians have responded to them',
        'argue that probate inventories are the most reliable source on eighteenth-century households',
        'describe the possessions typical of eighteenth-century farmers',
        'explain how estates were divided in the eighteenth century',
        'criticize historians who have ignored probate inventories',
      ],
      0,
      'Paragraph 1 explains why inventories seem valuable and then why they are biased (poor households underrepresented, the old overrepresented); paragraph 2 describes two responses and their shared limit. That’s (A). (B) contradicts the passage’s caution; (C) and (D) are background details; (E) reverses the situation — historians rely heavily on inventories.',
    ),
    rcMulti(
      3,
      'According to the passage, probate inventories of elderly people might misrepresent the possessions of a typical household because elderly people',
      [
        'may have accumulated more goods than younger people had',
        'may already have given many of their goods to their children',
        'were less likely than younger people to own property worth dividing',
      ],
      [0, 1],
      'The passage names both directions: the old “may have accumulated goods over decades—or, conversely, may already have passed many of them on to their children.” So A and B. C mixes up the two biases: the property-worth-dividing point concerns the poor, and nothing says the old were less likely to own property.',
    ),
    rc(
      3,
      'Which of the following best describes the author’s view of the two responses discussed in the second paragraph?',
      [
        'Each addresses some of the biases in the evidence, but neither can compensate for households that are absent from the record.',
        'The statistical approach is clearly superior to treating inventories as a record of what was possible.',
        'Both approaches fully correct the biases described in the first paragraph.',
        'Treating inventories as a record of what was possible is a misuse of the evidence.',
        'Neither approach addresses the overrepresentation of the elderly.',
      ],
      0,
      'The author describes both responses without ranking them, then concludes: “Neither approach recovers the households that left no inventory at all.” That’s (A). The author never ranks them (B) or condemns one (D). (C) contradicts the last sentence. (E) is false: weighting “by the age … of the deceased” targets exactly that bias.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const wages = `Standard economic theory predicts that raising the minimum wage will reduce employment among low-wage workers: if labor becomes more expensive, employers will buy less of it. In the early 1990s, the economists David Card and Alan Krueger tested this prediction by comparing fast-food restaurants in New Jersey, which had just raised its minimum wage, with restaurants in neighboring eastern Pennsylvania, which had not. They found no evidence that employment fell in New Jersey relative to Pennsylvania.

The study provoked intense debate. Critics questioned the reliability of the survey data and argued that the effects of a wage increase might appear only over a longer period. Defenders noted that the result was consistent with a model in which employers have some power to set wages—for instance, because workers cannot easily move between jobs—so that a modest mandated increase can draw more people into work without making it unprofitable to employ them. What the study established beyond dispute was less a conclusion about minimum wages than a method: the use of a neighboring, similar region as a comparison group, which later researchers adopted widely.`;

const dickinson = `When Emily Dickinson's poems were first published in 1890, four years after her death, her editors made numerous changes: they supplied titles, regularized her punctuation, and in places altered words to smooth her rhymes. Not until 1955, when Thomas H. Johnson published an edition based directly on her manuscripts, did readers encounter something close to the poems as she wrote them, complete with the dashes and capitalized nouns now regarded as hallmarks of her style.

Johnson's edition was a landmark, but it too involved choices. Dickinson's manuscripts often contain marks of varying length and angle that a typesetter must render as a uniform dash, and many poems survive with alternative words written in the margins or between the lines, among which an editor must choose. Some scholars now argue that these features are not defects to be resolved but part of the work: that Dickinson, who circulated many poems in letters and sewed others into small handmade booklets, may have deliberately left certain choices open. On this view, any printed edition, by settling what the manuscript leaves unsettled, produces a poem that Dickinson never wrote.

Critics of this position point out that the evidence for deliberate openness is necessarily indirect, and that Dickinson's alternatives may simply record a draft in progress. The debate matters because it concerns not merely how to print Dickinson but what a poem is: a fixed sequence of words, or something that can exist in more than one version at once.`;

export const V2H = section(2, 'v2h', [
  tc(
    2,
    'Far from being _____, the new chief executive’s reforms were so cautious that some board members wondered whether anything had changed at all.',
    [[['iconoclastic', 'incremental', 'prudent', 'unpopular', 'belated'], 0]],
    '“Far from being ___, the reforms were so cautious …” — the blank must be the opposite of cautious: **iconoclastic** (attacking established ways). “Incremental” and “prudent” agree with “cautious”, which a “far from” sentence can’t have. “Unpopular” and “belated” don’t oppose caution.',
  ),
  tc(
    3,
    'The diarist’s entries are maddeningly (i)_____: she records the weather and the price of flour in meticulous detail but mentions the war raging around her only in passing, as though it were a (ii)_____ matter.',
    [
      [['parochial', 'comprehensive', 'fabricated'], 0],
      [['peripheral', 'pressing', 'classified'], 0],
    ],
    '(i) The colon explains the blank: her attention stays on the small and local (weather, flour) while ignoring the war — **parochial** (narrow in scope). (ii) Mentioning the war “only in passing” treats it as a **peripheral** (minor, marginal) matter.',
    [
      '“Comprehensive” is contradicted by the war getting only a passing mention; nothing suggests the diary is “fabricated”.',
      '“Pressing” is what the war really was — the “as though” says she treated it otherwise. “Classified” adds a secrecy the sentence never mentions.',
    ],
  ),
  tc(
    3,
    'Scientific consensus is often portrayed as (i)_____, a settled verdict handed down once the evidence is in. In practice it is more (ii)_____: a balance of judgment among researchers that shifts, usually (iii)_____, as new findings slowly accumulate.',
    [
      [['definitive', 'partisan', 'tentative'], 0],
      [['provisional', 'arbitrary', 'rigid'], 0],
      [['gradually', 'abruptly', 'arbitrarily'], 0],
    ],
    '(i) “A settled verdict” restates the blank: **definitive**. (ii) “In practice” signals contrast, and the colon defines it — a balance of judgment that shifts is **provisional**. (iii) Shifting “as new findings slowly accumulate” happens **gradually**.',
    [
      '“Tentative” is the opposite of a settled verdict; “partisan” isn’t implied.',
      '“Rigid” contradicts “shifts”; “arbitrary” contradicts a judgment that responds to findings.',
      '“Abruptly” clashes with “slowly accumulate”; “arbitrarily” clashes with shifting in response to evidence.',
    ],
  ),
  tc(
    3,
    'Although the senator’s supporters praised her (i)_____, her detractors saw in her refusal to compromise on even minor points not principle but mere (ii)_____.',
    [
      [['steadfastness', 'pragmatism', 'eloquence'], 0],
      [['obstinacy', 'pliability', 'diffidence'], 0],
    ],
    'Both blanks describe the same behavior — refusing to compromise — seen two ways. Supporters call it (i) **steadfastness**; detractors call it (ii) **obstinacy**, stubbornness without principle.',
    [
      '“Pragmatism” (willingness to compromise) is the opposite of her behavior; “eloquence” is about speech, not compromise.',
      '“Pliability” and “diffidence” (shyness) contradict a refusal to compromise.',
    ],
  ),
  passage('wages', wages, [
    rcMulti(
      2,
      'According to the passage, critics of Card and Krueger’s study raised which of the following objections?',
      [
        'The data collected through surveys may not have been reliable.',
        'The study may not have covered a long enough period to detect the effects of the wage increase.',
        'Employers may have had the power to set wages.',
      ],
      [0, 1],
      'Critics “questioned the reliability of the survey data” (A) “and argued that the effects … might appear only over a longer period” (B). C is the defenders’ model, offered to explain the result — not an objection.',
    ),
    rc(
      3,
      'The model cited by the study’s defenders implies which of the following?',
      [
        'Under some conditions, a higher mandated wage need not reduce employment.',
        'Raising the minimum wage will always increase employment.',
        'Low-wage workers move easily from one job to another.',
        'Fast-food restaurants are less profitable than other businesses.',
        'The standard theory’s prediction holds whenever wages are set by employers.',
      ],
      0,
      'The model says a “modest mandated increase can draw more people into work without making it unprofitable to employ them” when employers have wage-setting power — so under those conditions employment need not fall (A). “Always” in (B) overshoots “modest” and “some power”. (C) contradicts the model’s example; (E) inverts it.',
    ),
    rc(
      3,
      'Which of the following, if true, would most seriously undermine the critics’ second objection?',
      [
        'Follow-up studies found no decline in New Jersey fast-food employment relative to Pennsylvania several years after the wage increase.',
        'Some restaurants in the study were located near the border between the two states.',
        'Other economists have also used neighboring regions as comparison groups.',
        'Restaurants in both states raised their menu prices during the period studied.',
        'The survey was conducted by telephone rather than in person.',
      ],
      0,
      'The second objection is that effects “might appear only over a longer period”. Evidence that no decline appeared years later answers it directly — (A). (C) concerns the method’s popularity; (E) bears on the first objection (data reliability), if on anything; (B) and (D) don’t address timing.',
    ),
  ]),
  se(
    2,
    'Known for her _____ in the courtroom, the attorney rarely raised her voice, preferring to dismantle witnesses’ testimony with quiet, precise questions.',
    ['bombast', 'composure', 'vehemence', 'equanimity', 'levity', 'garrulity'],
    [1, 3],
    '“Rarely raised her voice … quiet, precise questions” describes calm self-control: **composure** and **equanimity**. “Bombast” and “vehemence” describe the loud style she avoids; “levity” (joking) and “garrulity” (talkativeness) don’t fit “quiet, precise”.',
  ),
  se(
    2,
    'The report’s conclusions were so _____—hedged with qualifications at every turn—that readers on both sides of the debate claimed it supported their position.',
    ['noncommittal', 'strident', 'guarded', 'unequivocal', 'partisan', 'emphatic'],
    [0, 2],
    'The dash explains the blank: conclusions “hedged with qualifications at every turn” are **noncommittal** and **guarded**. “Unequivocal” and “emphatic” form a pair, but a report that clear couldn’t be claimed by both sides. “Strident” and “partisan” have no partners.',
  ),
  se(
    3,
    'The biography’s portrait of its subject is almost entirely _____, omitting the scandals that dominated the final decade of his life.',
    ['adulatory', 'censorious', 'balanced', 'laudatory', 'scathing', 'exhaustive'],
    [0, 3],
    'A portrait that leaves out every scandal is uncritically admiring: **adulatory** and **laudatory**. The pair “censorious/scathing” means harshly critical — the opposite. “Balanced” and “exhaustive” are contradicted by “omitting the scandals”.',
  ),
  se(
    3,
    'The candidate’s _____ remarks at the rally—he insulted the moderator, the audience, and his own running mate—alienated voters who had been inclined to support him.',
    ['anodyne', 'intemperate', 'measured', 'immoderate', 'bland', 'prescient'],
    [1, 3],
    'Insulting everyone in sight shows a lack of restraint: **intemperate** and **immoderate**. “Anodyne” and “bland” form a pair meaning inoffensive — the opposite. “Measured” is contradicted by the insults; “prescient” (seeing the future) is unrelated.',
  ),
  passage('dickinson', dickinson, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'describing how the editing of a poet’s work has raised a question about the nature of her poems',
        'arguing that Johnson’s edition of Dickinson should be abandoned',
        'explaining why Dickinson’s early editors changed her punctuation',
        'comparing Dickinson’s poems with those of her contemporaries',
        'defending the 1890 edition of Dickinson’s poems',
      ],
      0,
      'The passage traces the 1890 and 1955 editions, then the argument that any printed edition distorts her work, then the counterargument — and ends by saying the debate is about “what a poem is”. That’s (A). No one argues for abandoning Johnson (B) or defending 1890 (E); (C) and (D) are not discussed.',
    ),
    rcMulti(
      2,
      'According to the passage, Dickinson’s first editors did which of the following?',
      [
        'Gave her poems titles',
        'Changed some words to make rhymes smoother',
        'Kept the dashes now regarded as a hallmark of her style',
      ],
      [0, 1],
      'The editors “supplied titles” (A) and “altered words to smooth her rhymes” (B). C is contradicted: readers didn’t see her dashes until Johnson’s 1955 edition, since the first editors “regularized her punctuation”.',
    ),
    rc(
      3,
      'The author mentions that Dickinson “sewed others into small handmade booklets” most likely in order to',
      [
        'suggest that her handwritten versions, rather than printed ones, were forms in which she chose to present her poems',
        'prove that Dickinson intended to publish her poems in print',
        'explain why so many of her poems have alternative words',
        'show that Johnson did not have access to all of her manuscripts',
        'indicate that she wrote most of her poems late in life',
      ],
      0,
      'The detail appears inside the scholars’ argument that manuscript features are “part of the work”. That she circulated poems in letters and assembled her own booklets suggests the handwritten versions were how she presented her poems — not just drafts awaiting print (A). It does not “prove” an intention to print (B), and the other choices aren’t supported.',
    ),
    rc(
      3,
      'The critics mentioned in the third paragraph would most likely agree with which of the following statements?',
      [
        'The presence of alternative words in a manuscript does not by itself show that the poet meant them to remain alternatives.',
        'Johnson’s edition should be replaced by photographic reproductions of the manuscripts.',
        'Dickinson never wrote alternative words in her manuscripts.',
        'Every printed edition of Dickinson inevitably distorts her poems.',
        'The dashes in Dickinson’s manuscripts are uniform in length.',
      ],
      0,
      'The critics say the evidence for deliberate openness is “indirect” and the alternatives “may simply record a draft in progress” — so alternatives alone don’t prove intent (A). (D) is the opposing scholars’ view. (C) and (E) contradict facts the passage states; (B) goes beyond anything the critics say.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const otters = `Sea otters, which were hunted nearly to extinction for their fur by the early twentieth century, turn out to play an outsized role in the coastal ecosystems of the North Pacific. Otters eat sea urchins, and sea urchins eat kelp. Where otters disappeared, urchin populations grew unchecked and grazed the kelp forests down to bare rock, creating what ecologists call urchin barrens. Where otters survived or were reintroduced, urchins were kept in check and kelp forests flourished, providing shelter and food for many species of fish and invertebrates. Because the otters' influence on the ecosystem far exceeds what their numbers alone would suggest, ecologists describe them as a keystone species—after the wedge-shaped stone at the top of an arch, whose removal causes the whole structure to collapse.`;

const elmford = `Last year the town of Elmford banned cars from its main shopping street and turned the street into a pedestrian plaza. Since then, sales at shops on the street have risen by 15 percent. Clearly, removing car traffic makes a shopping street more attractive to customers.`;

const printing = `It is often said that the printing press made the Protestant Reformation possible. Martin Luther's pamphlets were printed and reprinted in enormous numbers in the years after 1517, spreading his ideas far faster than handwritten copies ever could. Yet printing had existed in Europe for more than half a century before Luther, and earlier reformers had not produced comparable movements. What changed was not only the technology but the way it was used. Luther wrote short, inexpensive pamphlets, many of them in German rather than Latin, addressed to ordinary readers—and to the many people who could not read but heard the pamphlets read aloud. Printing was necessary for the Reformation's rapid spread, but it was Luther's choices about how to use print that made it such an effective instrument.`;

const printingSentences = [
  'It is often said that the printing press made the Protestant Reformation possible.',
  "Martin Luther's pamphlets were printed and reprinted in enormous numbers in the years after 1517, spreading his ideas far faster than handwritten copies ever could.",
  'Yet printing had existed in Europe for more than half a century before Luther, and earlier reformers had not produced comparable movements.',
  'What changed was not only the technology but the way it was used.',
  'Luther wrote short, inexpensive pamphlets, many of them in German rather than Latin, addressed to ordinary readers—and to the many people who could not read but heard the pamphlets read aloud.',
  "Printing was necessary for the Reformation's rapid spread, but it was Luther's choices about how to use print that made it such an effective instrument.",
];

export const V2E = section(2, 'v2e', [
  tc(
    1,
    'Although the hiking trail is short, it is far from _____; its steep, rocky switchbacks challenge even experienced climbers.',
    [[['effortless', 'scenic', 'crowded', 'dangerous', 'popular'], 0]],
    '“Although short, it is far from ___; its switchbacks challenge even experienced climbers” — the blank is what a short trail might be expected to be, and what a challenging one isn’t: **effortless**. “Dangerous” is tempting, but “far from dangerous” would contradict the challenge, and the contrast with “short” is about ease.',
  ),
  tc(
    1,
    'The scientist was _____ about her results, repeating the experiment a dozen times before she was willing to publish.',
    [[['meticulous', 'careless', 'boastful', 'indifferent', 'secretive'], 0]],
    'Repeating an experiment a dozen times before publishing shows great care: **meticulous**. “Secretive” is the trap — the delay isn’t about hiding the results but about checking them.',
  ),
  tc(
    2,
    'The novel’s opening chapters are (i)_____, crowded with minor characters and digressions, but the final third moves with such (ii)_____ that many readers finish it in a single sitting.',
    [
      [['sluggish', 'gripping', 'concise'], 0],
      [['momentum', 'hesitation', 'obscurity'], 0],
    ],
    '(i) Chapters “crowded with minor characters and digressions” are slow — **sluggish**. (ii) “But” flips to the ending, which readers finish in one sitting: it moves with **momentum**.',
    [
      '“Gripping” belongs to the ending, not the opening; “concise” contradicts “crowded … digressions”.',
      'Hesitation or obscurity wouldn’t make readers finish in a single sitting.',
    ],
  ),
  tc(
    2,
    'The mayor’s critics had expected her to (i)_____ the controversial proposal, but instead she (ii)_____ it, arguing that the city could not afford to (iii)_____ any longer.',
    [
      [['abandon', 'champion', 'investigate'], 0],
      [['embraced', 'withdrew', 'ignored'], 0],
      [['wait', 'grow', 'spend'], 0],
    ],
    '“But instead” means (ii) is the opposite of (i). Her argument — the city can’t afford to (iii) **wait** any longer — is an argument for acting, so she (ii) **embraced** the proposal, and critics had expected her to (i) **abandon** it.',
    [
      'If critics expected her to champion it, “instead” would require her to drop it — but her argument is for acting now.',
      '“Withdrew” and “ignored” don’t fit an argument for urgency.',
      '“Grow” and “spend” don’t make sense with “could not afford to … any longer”.',
    ],
  ),
  passage('otters', otters, [
    rc(
      1,
      'According to the passage, urchin barrens form when',
      [
        'sea urchins, no longer eaten by otters, consume the kelp',
        'otters overeat the kelp that urchins depend on',
        'kelp forests grow so dense that urchins cannot survive',
        'fish and invertebrates leave the kelp forests',
        'otters are reintroduced to an area',
      ],
      0,
      '“Where otters disappeared, urchin populations grew unchecked and grazed the kelp forests down to bare rock, creating … urchin barrens.” That’s (A). Otters eat urchins, not kelp (B); reintroduced otters restore kelp (E).',
    ),
    rc(
      1,
      'The author mentions “the wedge-shaped stone at the top of an arch” in order to',
      [
        'explain the origin of a term used by ecologists',
        'describe the shape of kelp forests',
        'suggest that otters build structures',
        'compare otters with sea urchins',
        'argue that kelp forests are fragile',
      ],
      0,
      'The stone appears right after “ecologists describe them as a keystone species—after …”: it explains where the term “keystone species” comes from (A).',
    ),
    rc(
      2,
      'It can be inferred from the passage that reintroducing sea otters to an area that has become an urchin barren would most likely',
      [
        'benefit some species that otters do not eat',
        'reduce the amount of kelp in the area',
        'have no effect on the number of sea urchins',
        'cause otters to begin eating kelp',
        'harm fish that shelter in kelp forests',
      ],
      0,
      'Otters would keep urchins in check, the kelp would return, and kelp provides “shelter and food for many species of fish and invertebrates” — species the otters don’t eat would benefit (A). (B), (C), and (E) run the chain backward; (D) is unsupported.',
    ),
  ]),
  se(
    1,
    'The speaker’s remarks were so _____ that the audience grew restless within minutes.',
    ['tedious', 'riveting', 'monotonous', 'brief', 'witty', 'controversial'],
    [0, 2],
    'An audience grows restless when bored: **tedious** and **monotonous**. “Riveting” and “witty” would hold attention; “brief” remarks wouldn’t last long enough; “controversial” has no partner.',
  ),
  se(
    1,
    'Despite her _____ manner in meetings, the director was known among her friends to be generous and warm.',
    ['friendly', 'brusque', 'gracious', 'curt', 'nervous', 'talkative'],
    [1, 3],
    '“Despite” sets up a contrast with “generous and warm”: her meeting manner was abrupt and unfriendly — **brusque**, **curt**. “Friendly” and “gracious” agree with “warm”, which kills the contrast.',
  ),
  se(
    1,
    'The museum’s new director hopes to _____ the institution’s reputation, which was badly damaged by years of mismanagement.',
    ['tarnish', 'restore', 'document', 'rehabilitate', 'ignore', 'inherit'],
    [1, 3],
    'A new director facing a damaged reputation would want to repair it: **restore**, **rehabilitate**. “Tarnish” would damage it further; “document”, “ignore”, and “inherit” aren’t goals a director would “hope” for here.',
  ),
  se(
    2,
    'Early reviewers found the composer’s symphonies _____, but later audiences came to value precisely the dissonances that had once seemed so jarring.',
    ['melodious', 'grating', 'derivative', 'harsh', 'pleasant', 'lengthy'],
    [1, 3],
    '“Dissonances that had once seemed so jarring” tells you what early reviewers heard: **grating**, **harsh** music. “Melodious” and “pleasant” are the opposite pair; “derivative” and “lengthy” aren’t about dissonance.',
  ),
  argument(
    'elmford',
    elmford,
    rc(
      2,
      'Which of the following, if true, most strengthens the argument?',
      [
        'Over the same period, sales at shops on comparable Elmford streets that remained open to cars did not increase.',
        'Some shop owners on the street initially opposed the ban on cars.',
        'The new plaza hosts a weekly farmers’ market that draws visitors from neighboring towns.',
        'Parking fees in Elmford increased last year.',
        'Sales at shops throughout the region rose by about 15 percent last year because of a strong economy.',
      ],
      0,
      'The argument credits the car ban for a sales increase. The best strengthener rules out other explanations: if similar streets that kept cars saw no increase, the ban is the likely difference (A). (E) and (C) offer alternative causes, so they weaken; (B) and (D) are irrelevant to whether the ban raised sales.',
    ),
  ),
  passage('printing', printing, [
    rc(
      1,
      'The primary purpose of the passage is to',
      [
        'qualify a common claim about the cause of a historical development',
        'describe the invention of the printing press',
        'argue that Luther’s ideas were more important than his methods',
        'explain why earlier reformers failed',
        'compare German and Latin as languages of scholarship',
      ],
      0,
      'The passage opens with “It is often said that the printing press made the Protestant Reformation possible”, grants part of it, and then adds that the way Luther used print mattered — a qualification (A). The other choices are details or claims the passage doesn’t make.',
    ),
    rc(
      2,
      'The author mentions that “earlier reformers had not produced comparable movements” in order to',
      [
        'support the claim that printing by itself did not produce the Reformation',
        'suggest that the earlier reformers’ ideas were mistaken',
        'show that printing spread slowly at first',
        'explain why Luther wrote in German',
        'argue that the Reformation would have happened without printing',
      ],
      0,
      'Printing existed for decades before Luther, and yet earlier reformers didn’t spark similar movements — so the technology alone wasn’t enough (A). (E) goes too far: the author says printing “was necessary”.',
    ),
    rcSelect(
      2,
      'Select the sentence in which the author identifies features of Luther’s writings that helped them reach a wide audience.',
      printingSentences,
      4,
      'Sentence 5 lists the features: “short, inexpensive pamphlets, many of them in German rather than Latin, addressed to ordinary readers” — and read aloud to those who couldn’t read. Sentence 2 describes how widely they were printed, not what about them reached people; sentence 6 draws the conclusion without naming the features.',
    ),
  ]),
]);
