// Practice Test 3 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const induced = `When a congested highway is widened, traffic typically improves at first—and then, within a few years, returns to its former levels. Transportation researchers call this pattern induced demand. Faster travel makes driving more attractive: people who had avoided the road at rush hour begin to use it, some commuters shift from buses or trains, and over the longer term, households and businesses locate farther from city centers because commuting has become easier. The new lanes, in other words, do not merely accommodate existing traffic; they generate additional traffic of their own.`;

const gift = `In his 1925 essay The Gift, the French anthropologist Marcel Mauss argued that in many societies, gifts are never really free. To give is to create an obligation: the recipient is expected not only to accept but, in time, to return a gift of comparable or greater value. Far from being a primitive substitute for trade, Mauss suggested, such exchanges bind people into lasting relationships of a kind that market transactions, which are settled on the spot, do not create. A purchase ends a relationship; a gift begins or renews one.

Later scholars have extended Mauss's insight to modern societies, noting that refusing a gift, or trying to repay it immediately with cash, is often felt as an insult—precisely because it declines the relationship the gift proposes. Others have cautioned against romanticizing gift exchange. The obligations it creates can be burdensome, and a gift that cannot be matched may subordinate the recipient to the giver as surely as a debt.`;

export const V1 = section(3, 'v1', [
  tc(
    1,
    'Unlike her predecessor, who was notorious for making decisions without consulting anyone, the new director is thoroughly _____, seeking the views of her staff before every major choice.',
    [[['collegial', 'autocratic', 'decisive', 'secretive', 'impulsive'], 0]],
    '“Unlike” her predecessor, who consulted no one, she seeks her staff’s views before deciding — she is **collegial** (sharing responsibility with colleagues). “Autocratic” describes the predecessor. “Decisive” is the trap: it’s a positive leadership word, but it isn’t the opposite of deciding alone.',
  ),
  tc(
    2,
    'The (i)_____ of the region’s climate records—many of its weather stations began recording temperatures only in the last few decades—makes it (ii)_____ to say with confidence whether recent heat waves are unusual.',
    [
      [['paucity', 'precision', 'consistency'], 0],
      [['problematic', 'straightforward', 'superfluous'], 0],
    ],
    '(i) The dash explains the blank: stations that started recording recently leave few records — a **paucity** (scarcity). (ii) With little history to compare against, judging whether heat waves are unusual is **problematic**.',
    [
      'Nothing in the dash is about accuracy or consistency; it’s about how little data there is.',
      'Scarce records make the judgment harder, not “straightforward”, and certainly not “superfluous” (unnecessary).',
    ],
  ),
  tc(
    3,
    'Although the novelist’s early books were (i)_____ by reviewers, who found their fractured chronology merely confusing, scholars now regard those same experiments as (ii)_____ of techniques that would not become (iii)_____ until decades later.',
    [
      [['derided', 'celebrated', 'imitated'], 0],
      [['harbingers', 'imitations', 'refutations'], 0],
      [['commonplace', 'controversial', 'obsolete'], 0],
    ],
    '(i) Reviewers found the books “merely confusing”, so they **derided** them. (ii) “Although … scholars now regard” sets up a reversal: the experiments came before later techniques — they were **harbingers** (forerunners). (iii) Techniques that “would not become ___ until decades later” became widespread: **commonplace**.',
    [
      'Reviewers who found the books confusing didn’t celebrate or imitate them.',
      'Early experiments can’t imitate or refute techniques that came decades later.',
      '“Controversial until decades later” and “obsolete until decades later” don’t make sense as a later fate for innovations.',
    ],
  ),
  passage('induced', induced, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'explaining why a common remedy tends not to achieve its intended effect',
        'arguing that cities should stop building and widening highways',
        'describing how researchers measure traffic congestion on highways',
        'comparing the costs of highways with those of rail and other public transit',
        'explaining why businesses move away from crowded city centers',
      ],
      0,
      'Widening a congested highway is meant to relieve congestion; the passage explains why traffic returns — induced demand. That’s (A). The passage makes no policy recommendation (B), and (C), (D), and (E) are either absent or a single detail.',
    ),
    rc(
      3,
      'Which of the following, if true, would provide the strongest support for the explanation offered in the passage?',
      [
        'Once a highway was widened, rush-hour traffic rose and a nearby rail line lost riders.',
        'Traffic on a newly widened highway improved and remained improved for a decade.',
        'Highway-widening projects are among the most expensive public works a city undertakes.',
        'Most drivers surveyed say that they strongly dislike sitting in traffic congestion.',
        'Congestion also occurs regularly on roads that have never been widened at all.',
      ],
      0,
      'The explanation predicts that faster travel draws new traffic, including commuters who switch from transit. More rush-hour drivers plus fewer rail riders after widening is exactly that (A). (B) contradicts the pattern; (C) and (D) are irrelevant; (E) says nothing about what widening causes.',
    ),
  ]),
  se(
    1,
    'The professor’s lectures were famously _____; students often left the hall unsure what the main point had been.',
    ['rambling', 'focused', 'discursive', 'succinct', 'humorous', 'popular'],
    [0, 2],
    'Lectures that leave students unsure of the main point wander from topic to topic: **rambling**, **discursive**. “Focused” and “succinct” point the other way; “humorous” and “popular” don’t explain the confusion.',
  ),
  se(
    2,
    'Rather than _____ the long-standing rivalry between the two departments, the new dean’s policies only intensified it.',
    ['mitigating', 'exacerbating', 'alleviating', 'documenting', 'inflaming', 'prolonging'],
    [0, 2],
    '“Rather than ___, the policies only intensified it” — the blank is the hoped-for opposite of intensifying: **mitigating**, **alleviating**. “Exacerbating” and “inflaming” are a pair, but they describe what actually happened, which kills the contrast.',
  ),
  se(
    2,
    'The company’s financial statements were so _____ that even experienced analysts struggled to determine whether it was profitable.',
    ['opaque', 'transparent', 'impenetrable', 'lucid', 'fraudulent', 'lengthy'],
    [0, 2],
    'If experts can’t tell whether the company made money, the statements are hard to see into: **opaque**, **impenetrable**. “Transparent” and “lucid” are the opposite pair. “Fraudulent” might cause confusion but has no partner and goes beyond the sentence.',
  ),
  se(
    3,
    'Critics accused the historian of _____, charging that she had selected only the evidence that supported her thesis while ignoring anything that contradicted it.',
    ['tendentiousness', 'pedantry', 'partiality', 'credulity', 'prolixity', 'impartiality'],
    [0, 2],
    'Choosing only supporting evidence is bias: **tendentiousness** (promoting a particular point of view) and **partiality**. “Impartiality” is the opposite; “pedantry” (fussiness over detail), “credulity” (believing too easily), and “prolixity” (wordiness) are other faults.',
  ),
  passage('gift', gift, [
    rc(
      2,
      'According to the passage, Mauss distinguished gift exchange from market transactions on the grounds that',
      [
        'gifts create lasting bonds, while market deals are settled on the spot',
        'gift exchange developed much earlier than trade in most societies',
        'market transactions involve goods of far greater value than gifts do',
        'gift exchange is a primitive substitute for trade in simple societies',
        'market transactions create lasting obligations that gifts do not',
      ],
      0,
      'Mauss said gifts “bind people into lasting relationships of a kind that market transactions, which are settled on the spot, do not create” (A). (D) is the view he rejected (“Far from being a primitive substitute for trade”); (E) reverses him.',
    ),
    rc(
      3,
      'The author mentions trying “to repay it immediately with cash” as an example of',
      [
        'treating a gift as though it were a market transaction',
        'fulfilling the obligation a gift creates',
        'a custom found only in modern societies',
        'a way of strengthening the relationship a gift proposes',
        'behavior that Mauss himself recommended',
      ],
      0,
      'Paying on the spot settles the exchange like a purchase — and so “declines the relationship the gift proposes”. That’s treating a gift like a market transaction (A). It rejects the obligation rather than fulfilling it (B) and weakens the relationship rather than strengthening it (D).',
    ),
    rcMulti(
      3,
      'The scholars who “have cautioned against romanticizing gift exchange” would most likely agree that gift exchange',
      [
        'can create relationships of inequality',
        'can impose obligations that recipients find onerous',
        'is an inferior substitute for market trade',
      ],
      [0, 1],
      'They say the obligations “can be burdensome” (B) and that an unmatched gift “may subordinate the recipient to the giver” (A). C goes too far — pointing out costs of gift exchange is not the same as calling it inferior to trade, a view the passage attributes to no one.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const placebo = `The placebo effect has long been thought to depend on deception: a patient improves after taking an inert pill because she believes it to be real medicine. A series of studies over the past fifteen years has challenged this assumption. In these "open-label" trials, patients with conditions such as irritable bowel syndrome were given pills that they were told plainly contained no active ingredient, and many nonetheless reported greater improvement than patients who received no pills at all.

Researchers have proposed several explanations. The ritual of treatment itself—a clinician's attention, the routine of taking a pill—may trigger responses that do not depend on belief in the pill's chemistry. Alternatively, patients may have expected benefits simply because they were told that placebos often help. The studies' reliance on patients' own reports of their symptoms, however, leaves open the possibility that patients who knew they were in a placebo group were inclined to report improvement to please the researchers.`;

const sugar = `Some economists argue that raising taxes on sugary drinks will reduce obesity rates. **Such taxes have been shown to reduce purchases of sugary drinks.** But reduced purchases do not necessarily mean reduced consumption of calories: consumers may simply substitute other high-calorie foods and beverages. **Therefore, a tax on sugary drinks alone is unlikely to produce a substantial decline in obesity.**`;

const jevons = `In 1865 the English economist William Stanley Jevons observed that improvements in the efficiency of steam engines, which allowed each engine to do more work with less coal, had not reduced Britain's consumption of coal. On the contrary, consumption had risen sharply. Jevons's explanation was that efficiency made coal-powered work cheaper, and cheaper work was put to so many new uses that total demand for coal grew. The pattern he described—now called the Jevons paradox—has since been invoked in debates about everything from fuel-efficient cars to energy-saving light bulbs. Its application is not straightforward, however. Whether efficiency gains raise or lower total consumption depends on how strongly demand responds to falling costs. Demand for lighting, for example, may be nearly saturated in wealthy households—few people will light an empty room simply because it has become cheaper to do so—whereas where electricity is scarce, cheaper lighting may be put to many new uses.`;

const jevonsSentences = [
  "In 1865 the English economist William Stanley Jevons observed that improvements in the efficiency of steam engines, which allowed each engine to do more work with less coal, had not reduced Britain's consumption of coal.",
  'On the contrary, consumption had risen sharply.',
  "Jevons's explanation was that efficiency made coal-powered work cheaper, and cheaper work was put to so many new uses that total demand for coal grew.",
  'The pattern he described—now called the Jevons paradox—has since been invoked in debates about everything from fuel-efficient cars to energy-saving light bulbs.',
  'Its application is not straightforward, however.',
  'Whether efficiency gains raise or lower total consumption depends on how strongly demand responds to falling costs.',
  'Demand for lighting, for example, may be nearly saturated in wealthy households—few people will light an empty room simply because it has become cheaper to do so—whereas where electricity is scarce, cheaper lighting may be put to many new uses.',
];

export const V2H = section(3, 'v2h', [
  tc(
    2,
    'The author’s account of her impoverished childhood is notably _____: she neither sentimentalizes the hardship she grew up with nor dwells on it for effect.',
    [[['restrained', 'maudlin', 'lurid', 'nostalgic', 'evasive'], 0]],
    'The colon defines the blank: she avoids both sentimentality and dwelling on hardship “for effect” — the account is **restrained**. “Maudlin” and “nostalgic” are the sentimentality she avoids; “lurid” is dwelling for effect. “Evasive” is the trap: she doesn’t avoid the subject, she just treats it without exaggeration.',
  ),
  tc(
    3,
    'Economic forecasts are notoriously (i)_____, yet policymakers who ignore them entirely risk (ii)_____ the very downturns that even imperfect forecasts might have helped them anticipate.',
    [
      [['fallible', 'precise', 'influential'], 0],
      [['blundering into', 'averting', 'predicting'], 0],
    ],
    '(i) “Even imperfect forecasts” tells you what forecasts are notorious for: being **fallible**. (ii) Ignoring forecasts that might have helped you anticipate downturns means you risk **blundering into** them.',
    [
      '“Precise” contradicts “imperfect”; “influential” doesn’t set up the “yet”.',
      '“Averting” and “predicting” are what forecasts help with — not what ignoring them risks.',
    ],
  ),
  tc(
    3,
    'The discovery of the letters did not so much (i)_____ the prevailing account of the poet’s final years as (ii)_____ it: the broad outline remained intact, but details long accepted as fact turned out to be (iii)_____.',
    [
      [['overturn', 'confirm', 'obscure'], 0],
      [['complicate', 'corroborate', 'simplify'], 0],
      [['apocryphal', 'documented', 'trivial'], 0],
    ],
    '“Did not so much X as Y” — then the colon explains: the outline survived (so not X = **overturn**), but details proved false (so Y = **complicate**). Details “long accepted as fact” that turn out not to be are (iii) **apocryphal** — of doubtful authenticity.',
    [
      'The outline stayed intact, so nothing was overturned; but “confirm” would clash with details proving false, and “obscure” doesn’t fit.',
      '“Corroborate” and “simplify” clash with details turning out to be false.',
      '“Documented” is the opposite; “trivial” misses the contrast with “accepted as fact”.',
    ],
  ),
  tc(
    2,
    'To the casual observer the bird’s plumage appears (i)_____, a uniform brown; only under ultraviolet light, which many birds can see, do the (ii)_____ patterns that distinguish males from females become apparent.',
    [
      [['drab', 'iridescent', 'mottled'], 0],
      [['intricate', 'faded', 'familiar'], 0],
    ],
    '(i) “A uniform brown” restates the blank: **drab**. (ii) “Only under ultraviolet light” do hidden patterns appear — patterns elaborate enough to tell the sexes apart: **intricate**.',
    [
      '“Iridescent” (shimmering) and “mottled” (spotted) contradict “uniform brown”.',
      'Hidden patterns that only appear under UV aren’t “familiar”; “faded” doesn’t fit patterns that distinguish the sexes.',
    ],
  ),
  passage('placebo', placebo, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'presenting findings that challenge an assumption, and possible explanations',
        'arguing that placebos should replace conventional medical treatments entirely',
        'describing how irritable bowel syndrome is diagnosed and treated',
        'criticizing researchers for deceiving the patients in their studies',
        'explaining why deception is necessary for the placebo effect to work',
      ],
      0,
      'Paragraph 1: open-label trials challenge the idea that placebos require deception. Paragraph 2: possible explanations, plus a caveat. That’s (A). (E) is the assumption the findings challenge; (B), (C), and (D) aren’t claimed.',
    ),
    rc(
      3,
      'The last sentence of the passage serves primarily to',
      [
        'note a limitation that could explain the results without any real improvement',
        'offer a third explanation of how open-label placebos produce genuine relief',
        'suggest that patients in the studies were deceived about the pills after all',
        'argue that patients’ own reports of their symptoms are always unreliable',
        'show that the ritual of treatment itself has no effect at all on patients',
      ],
      0,
      '“However … leaves open the possibility” marks a caveat: because improvement was self-reported, patients may have reported gains to please researchers — which would explain the results without real improvement (A). It isn’t another mechanism of genuine relief (B), and “always” in (D) overstates it.',
    ),
    rc(
      3,
      'Which of the following, if true, would most seriously weaken the possibility raised in the last sentence of the passage?',
      [
        'Patients given placebos also improved on lab tests and other measures they couldn’t sway.',
        'Patients in open-label studies were told in advance that placebos often help.',
        'Some patients in open-label studies reported no improvement at all after several weeks.',
        'Researchers in open-label studies spent more time with patients who received placebos.',
        'Irritable bowel syndrome has no known cure, though its symptoms can be managed.',
      ],
      0,
      'The worry is that improvement existed only in patients’ reports. Improvement on objective measures patients can’t influence would show a real change (A). (B) and (D) support the other explanations; (C) doesn’t address whether reported improvements were real; (E) is irrelevant.',
    ),
  ]),
  se(
    2,
    'The scholar’s _____ was legendary: she could cite page numbers from obscure monographs she had read decades earlier.',
    ['erudition', 'modesty', 'learning', 'ignorance', 'eloquence', 'arrogance'],
    [0, 2],
    'Recalling page numbers of obscure monographs shows deep knowledge: **erudition**, **learning**. “Eloquence” is about speaking well, not knowing; “modesty” and “arrogance” are attitudes.',
  ),
  se(
    2,
    'Hardly _____, the critic’s review of the exhibition ran to a single short paragraph and mentioned only two of the forty works on display.',
    ['exhaustive', 'cursory', 'comprehensive', 'perfunctory', 'scathing', 'belated'],
    [0, 2],
    'A single paragraph covering two of forty works is hardly thorough: **exhaustive**, **comprehensive**. “Cursory” and “perfunctory” form a pair describing the review accurately — but “hardly cursory” would contradict the sentence. “Scathing” and “belated” aren’t about thoroughness.',
  ),
  se(
    3,
    'The politician’s apology was widely regarded as _____: it came only after the scandal had cost her party a crucial election, and it expressed regret less for her conduct than for its consequences.',
    ['disingenuous', 'heartfelt', 'abject', 'insincere', 'timely', 'eloquent'],
    [0, 3],
    'An apology that arrives only after damage is done, regretting consequences rather than conduct, looks **disingenuous** and **insincere**. “Heartfelt” is the opposite; “timely” is contradicted by “only after”; “abject” (utterly humble) and “eloquent” have no partners.',
  ),
  se(
    3,
    'Although the treaty’s language was deliberately _____, allowing each signatory to claim victory, its practical effect was unmistakable.',
    ['elastic', 'precise', 'malleable', 'unequivocal', 'belligerent', 'archaic'],
    [0, 2],
    'Language that lets every side claim victory can be stretched to fit different readings: **elastic**, **malleable**. “Although … its practical effect was unmistakable” confirms the contrast. “Precise” and “unequivocal” are the opposite pair.',
  ),
  argument(
    'sugar',
    sugar,
    rc(
      3,
      'In the argument, the two portions in boldface play which of the following roles?',
      [
        'The first supports a position the argument then disputes; the second is its main conclusion.',
        'The first is the argument’s main conclusion; the second is evidence offered to support it.',
        'The first is a consideration the argument concedes; the second is a position the argument rejects.',
        'Both are evidence that the argument offers in support of its main conclusion.',
        'The first is a prediction; the second is evidence that the prediction has come true.',
      ],
      0,
      'The first bold sentence supports the economists’ position (taxes → less obesity). The argument then disputes that position (“But … consumers may simply substitute”) and concludes, with “Therefore”, the second bold sentence — its main conclusion. That’s (A). In (C) the second portion is described as rejected; the argument asserts it.',
    ),
  ),
  passage('jevons', jevons, [
    rc(
      2,
      'According to the passage, Jevons attributed the rise in Britain’s coal consumption to',
      [
        'new uses for coal power that became affordable as engines grew more efficient',
        'a decline in the efficiency of the steam engines then in use',
        'a shortage of other sources of energy, such as wood and water power',
        'rapid growth in Britain’s population and the size of its cities in that era',
        'a fall in the price of coal caused by the opening of many new mines',
      ],
      0,
      'Jevons said efficiency made coal-powered work cheaper, “and cheaper work was put to so many new uses that total demand for coal grew” (A). (B) contradicts the passage; (C), (D), and (E) are never mentioned.',
    ),
    rc(
      3,
      'The author’s discussion of lighting serves primarily to',
      [
        'illustrate how efficiency gains can affect consumption differently by setting',
        'show that the Jevons paradox applies to lighting in every region of the world',
        'argue that energy-saving light bulbs always increase electricity consumption',
        'suggest that wealthy households waste a great deal of electricity on lighting',
        'explain why Jevons’s observations about coal in Britain were mistaken',
      ],
      0,
      'Lighting is the example after “depends on how strongly demand responds”: in wealthy homes demand is saturated (so efficiency likely cuts use), while where electricity is scarce cheaper light finds new uses (so use may rise). Same efficiency gain, different outcomes — (A). (B) and (C) ignore the contrast; (E) isn’t claimed.',
    ),
    rcSelect(
      3,
      'Select the sentence that identifies the factor determining whether the pattern Jevons described will occur.',
      jevonsSentences,
      5,
      'Sentence 6 names the factor: “Whether efficiency gains raise or lower total consumption depends on how strongly demand responds to falling costs.” Sentence 3 explains why the pattern occurred in Jevons’s case, not what decides whether it occurs; sentence 7 gives examples of the factor at work.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const leaves = `The yellow and orange colors of autumn leaves are not newly made in the fall. They come from pigments called carotenoids, which are present in leaves throughout the growing season but are masked by the green of chlorophyll. As days shorten and temperatures drop, trees stop producing chlorophyll and break down what remains, recovering valuable nutrients before the leaves are shed. As the green fades, the yellows and oranges are revealed. Reds and purples are different: they come from pigments called anthocyanins, which many trees actively produce in autumn. Why a tree would spend energy making new pigments in leaves it is about to drop is still debated; one hypothesis holds that anthocyanins protect leaves from sun damage while their nutrients are being withdrawn.`;

const mugs = `In a well-known experiment, researchers gave coffee mugs to half the students in a class and asked each mug owner for the lowest price at which he or she would sell the mug; the other students were asked the highest price they would pay for one. Standard economic reasoning predicts that the two prices should be similar, since the mugs had been handed out at random. Instead, owners typically demanded more than twice as much as buyers were willing to pay. This gap, known as the endowment effect, suggests that people value things more simply because they own them. The effect may help explain why people often hold on to possessions—or investments—longer than a purely financial calculation would justify.`;

const cafe = `The owners of Riverside Café found that customers who sat at the café's new outdoor tables spent more per visit, on average, than customers who sat indoors. To increase revenue, the owners plan to replace several indoor tables with additional outdoor seating.`;

export const V2E = section(3, 'v2e', [
  tc(
    1,
    'The new software was supposed to simplify the ordering process, but it has instead made the process more _____, adding several unnecessary steps.',
    [[['cumbersome', 'efficient', 'affordable', 'secure', 'popular'], 0]],
    '“Supposed to simplify … but instead … adding several unnecessary steps” — the process became more **cumbersome** (awkward, slow). “Efficient” is what it was supposed to become.',
  ),
  tc(
    1,
    'Though he was _____ as a young man, often spending an entire paycheck the day he received it, in later life he became known for his frugality.',
    [[['extravagant', 'miserly', 'cautious', 'diligent', 'ambitious'], 0]],
    'Spending a whole paycheck at once, contrasted (“Though”) with later “frugality”, means he was **extravagant**. “Miserly” and “cautious” match the later frugality instead of contrasting with it.',
  ),
  tc(
    2,
    'The committee’s unanimous (i)_____ of the proposal surprised observers, since several members had (ii)_____ it publicly only weeks before; the reversal was attributed to a series of private concessions by the proposal’s sponsors.',
    [
      [['endorsement', 'rejection', 'revision'], 0],
      [['denounced', 'praised', 'amended'], 0],
    ],
    'Concessions by the sponsors are made to win support, so the reversal ended in (i) **endorsement**. Before the reversal, members had opposed it: (ii) **denounced**.',
    [
      'Sponsors don’t make concessions to get their proposal rejected; a “revision” isn’t a reversal.',
      'If members had praised it, endorsing it wouldn’t be a surprising reversal.',
    ],
  ),
  tc(
    2,
    'Many visitors find the city’s architecture (i)_____, a jumble of styles from different centuries; residents, however, tend to see the same variety as (ii)_____, a record of the city’s long and (iii)_____ history.',
    [
      [['incoherent', 'harmonious', 'monotonous'], 0],
      [['enriching', 'jarring', 'deceptive'], 0],
      [['eventful', 'uneventful', 'brief'], 0],
    ],
    '(i) “A jumble of styles” is **incoherent**. (ii) “However” flips the judgment: residents see the variety positively — **enriching**. (iii) A history that produced styles “from different centuries” is long and **eventful**.',
    [
      'A jumble isn’t harmonious; a variety of styles isn’t monotonous.',
      '“Jarring” repeats the visitors’ view instead of contrasting with it; “deceptive” isn’t supported.',
      '“Uneventful” wouldn’t leave such a varied record; “brief” contradicts “long”.',
    ],
  ),
  passage('leaves', leaves, [
    rc(
      1,
      'According to the passage, the yellow colors of autumn leaves',
      [
        'are present all season but hidden by green chlorophyll',
        'are produced only after autumn temperatures drop',
        'protect the leaves from damage by strong sun',
        'come from the red pigments called anthocyanins',
        'appear only in the trees that also produce red pigments',
      ],
      0,
      'Carotenoids, which make yellows and oranges, “are present in leaves throughout the growing season but are masked by the green of chlorophyll” (A). (B) and (D) describe the reds (anthocyanins), and (C) is a hypothesis about anthocyanins.',
    ),
    rc(
      2,
      'The passage suggests that the production of anthocyanins in autumn is puzzling because',
      [
        'it requires spending energy on leaves that will soon be shed',
        'anthocyanins are chemically identical to carotenoids',
        'it occurs only in trees whose leaves lack chlorophyll',
        'it prevents trees from recovering nutrients from their leaves',
        'anthocyanins cannot be seen once chlorophyll fades',
      ],
      0,
      '“Why a tree would spend energy making new pigments in leaves it is about to drop is still debated” — the puzzle is the energy spent on doomed leaves (A). The others contradict or go beyond the passage.',
    ),
    rcMulti(
      2,
      'According to the passage, which of the following happen in autumn?',
      ['Trees stop producing chlorophyll.', 'Trees recover nutrients from their leaves.', 'Trees begin producing carotenoids.'],
      [0, 1],
      'Trees “stop producing chlorophyll” (A) and break down what remains, “recovering valuable nutrients” (B). C is wrong: carotenoids are present all season; they are revealed in autumn, not newly made.',
    ),
  ]),
  se(
    1,
    'Although the hotel’s lobby was _____, the rooms themselves were small and plainly furnished.',
    ['opulent', 'shabby', 'lavish', 'cramped', 'modest', 'noisy'],
    [0, 2],
    '“Although” contrasts the lobby with “small and plainly furnished” rooms: the lobby was **opulent**, **lavish**. “Shabby”, “cramped”, and “modest” agree with the rooms instead of contrasting.',
  ),
  se(
    1,
    'The witness’s account was so _____ that the jury had little reason to doubt it.',
    ['credible', 'confused', 'plausible', 'contradictory', 'emotional', 'brief'],
    [0, 2],
    'An account the jury had little reason to doubt was **credible** and **plausible**. “Confused” and “contradictory” would invite doubt.',
  ),
  se(
    2,
    'The instructor’s feedback, though _____, was always constructive: she pointed out every weakness but also suggested how to fix it.',
    ['blunt', 'vague', 'frank', 'flattering', 'lenient', 'sporadic'],
    [0, 2],
    '“Though ___, always constructive” — pointing out every weakness is direct to the point of harshness: **blunt**, **frank**. “Flattering” and “lenient” don’t fit pointing out every weakness; “vague” contradicts it.',
  ),
  se(
    2,
    'The explorer’s journals reveal a man of remarkable _____, who pressed on through blizzards and starvation long after his companions had turned back.',
    ['tenacity', 'cowardice', 'perseverance', 'recklessness', 'curiosity', 'generosity'],
    [0, 2],
    'Pressing on through blizzards and starvation after everyone else quit shows **tenacity** and **perseverance**. “Recklessness” is tempting but has no partner, and “remarkable” here is admiring.',
  ),
  passage('mugs', mugs, [
    rc(
      1,
      'According to the passage, standard economic reasoning predicts that in the experiment',
      [
        'the prices named by owners and by buyers would be similar',
        'owners would demand more than buyers would be willing to pay',
        'buyers would be unwilling to pay anything for the mugs',
        'owners would refuse to sell their mugs at any price',
        'buyers would value the mugs more than owners did',
      ],
      0,
      '“Standard economic reasoning predicts that the two prices should be similar” (A). (B) is what actually happened, contrary to the prediction.',
    ),
    rc(
      2,
      'The author mentions that the mugs “had been handed out at random” in order to',
      [
        'indicate that owners and non-owners had no prior reason to value mugs differently',
        'suggest that some of the students did not actually want mugs in the first place',
        'explain why buyers named such low prices for the mugs they were offered',
        'show that the experiment was poorly designed and its results unreliable',
        'argue that the mugs were of little value to any of the students involved',
      ],
      0,
      'Random assignment means the two groups started out alike — so the only difference between them was ownership. That’s why a price gap reveals the endowment effect (A).',
    ),
    rc(
      2,
      'Which of the following would best illustrate the endowment effect described in the passage?',
      [
        'A homeowner rejects an offer above what she would pay for an identical house nearby.',
        'A shopper buys a jacket mainly because it is on sale for half price.',
        'An investor sells a stock as soon as its price rises above what he paid.',
        'A collector pays far more for a rare stamp than for a common one of the same age.',
        'A student sells a used textbook for less than she originally paid for it.',
      ],
      0,
      'The endowment effect: people value things more because they own them. Refusing a price higher than she’d pay for an identical house shows she values her own house more simply because it’s hers (A). The others involve ordinary price reasoning.',
    ),
  ]),
  argument(
    'cafe',
    cafe,
    rc(
      2,
      'Which of the following would be most useful to know in evaluating whether the owners’ plan is likely to increase revenue?',
      [
        'Whether outdoor customers already order differently from indoor customers',
        'Whether the café’s prices are higher than those of other nearby cafés on the street',
        'Whether the outdoor tables and chairs were purchased recently',
        'Whether the café’s employees prefer to work indoors or outdoors',
        'Whether other businesses on the same street also have outdoor seating',
      ],
      0,
      'The plan assumes outdoor seating makes customers spend more. But maybe big spenders (say, groups ordering full meals) are simply the ones who pick outdoor tables. If so, moving tables outside won’t change anyone’s spending. Knowing whether the groups differ (A) tests that assumption directly.',
    ),
  ),
]);
