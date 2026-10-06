// Practice Test 8 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const microcredit = `Microcredit—small loans to poor entrepreneurs, typically made without collateral—was widely celebrated in the 1990s and 2000s as a powerful tool against poverty, and in 2006 Muhammad Yunus and the Grameen Bank he founded shared the Nobel Peace Prize. Early evidence came largely from success stories and from comparisons between borrowers and nonborrowers. Such comparisons are hard to interpret, since people who choose to borrow may differ in energy or ambition from those who do not. When researchers later ran randomized studies, offering access to credit in some areas and not in others, the results were more modest: on average, access to microcredit did not measurably raise household income, though it did give some households more flexibility in how they invested and managed their spending.`;

const gothic = `The great Gothic cathedrals of twelfth- and thirteenth-century France seem to defy the weight of stone. Their walls are pierced by enormous windows, and their vaults rise to heights that earlier builders had not attempted. The key was the flying buttress, an external arch that carries the outward thrust of a high vault across open air to a massive pier standing apart from the building. In earlier Romanesque churches, that thrust had been resisted by the walls themselves, which therefore had to be thick and could be opened only by small windows. Once buttresses took over this work, the walls between them were relieved of much of their structural role and could be given over to glass.

The builders who achieved this had no theory of structures in the modern sense; they worked by experience, by rules of proportion handed down within the craft, and, it seems, by trial and error. Not every experiment succeeded. In 1284 part of the choir vault of Beauvais Cathedral, the tallest of all, collapsed, and it was rebuilt with additional supports.`;

export const V1 = section(8, 'v1', [
  tc(
    2,
    'The committee’s final report was notable chiefly for its _____: after two years of hearings, it concluded only that the matter deserved further study.',
    [[['timidity', 'boldness', 'length', 'hostility', 'clarity'], 0]],
    'Concluding nothing but that the matter needs more study, after two years, shows a lack of nerve: **timidity**. “Boldness” is the opposite; “length” and “clarity” aren’t what the colon describes.',
  ),
  tc(
    2,
    'The new edition’s greatest strength is its (i)_____: where earlier editors silently “corrected” the poet’s irregular spelling and punctuation, this one (ii)_____ them, on the grounds that they may well have been deliberate.',
    [
      [['fidelity', 'brevity', 'elegance'], 0],
      [['preserves', 'regularizes', 'ignores'], 0],
    ],
    '(i) Keeping the poet’s text as written, unlike earlier editors, is **fidelity** to the original. (ii) Because the irregularities may be deliberate, this edition **preserves** them.',
    [
      '“Brevity” and “elegance” have nothing to do with leaving the text uncorrected.',
      '“Regularizes” is what the earlier editors did; “ignores” doesn’t fit the reason given — that the irregularities may be deliberate.',
    ],
  ),
  tc(
    3,
    'Economic forecasts are often presented with a (i)_____ that their track record hardly justifies. A more honest practice would attach to each prediction some measure of its (ii)_____, so that readers could see at a glance how far to trust it; but forecasters have little incentive to (iii)_____ the limits of their own expertise.',
    [
      [['confidence', 'hesitancy', 'levity'], 0],
      [['uncertainty', 'popularity', 'origin'], 0],
      [['advertise', 'exceed', 'conceal'], 0],
    ],
    '(i) A poor “track record” fails to justify the **confidence** with which forecasts are presented. (ii) A measure of how far to trust a prediction is a measure of its **uncertainty**. (iii) Forecasters have little reason to **advertise** (publicize) the limits of their expertise.',
    [
      'A weak track record would justify “hesitancy,” so that can’t be what it fails to justify; “levity” is irrelevant.',
      '“Popularity” and “origin” don’t tell readers how far to trust a prediction.',
      '“Conceal” is what they have every incentive to do — the “but” needs the thing they won’t do; “exceed” makes no sense here.',
    ],
  ),
  passage('microcredit', microcredit, [
    rc(
      2,
      'The author mentions that “people who choose to borrow may differ in energy or ambition from those who do not” in order to',
      [
        'explain why comparing borrowers with nonborrowers may mislead',
        'argue that microcredit should be offered only to ambitious borrowers',
        'show that borrowers earned more on average than nonborrowers did',
        'describe how the randomized studies chose and assigned their participants',
        'suggest that the Nobel Prize awarded for microcredit was undeserved',
      ],
      0,
      'If borrowers are more energetic to begin with, any advantage they show might come from that, not from the loans — so such comparisons “are hard to interpret” (A). The sentence doesn’t recommend a policy (B), report results (C), or describe the randomized design (D), and the author passes no judgment on the prize (E).',
    ),
    rc(
      3,
      'Which of the following best describes the findings of the randomized studies, as they are presented in the passage?',
      [
        'Microcredit had real but limited benefits and did not raise average household income.',
        'Access to microcredit left most of the borrowers worse off than they had been before.',
        'Access to microcredit greatly increased the incomes of the poorest households.',
        'The studies confirmed the conclusions drawn from the earlier success stories of borrowers.',
        'The studies could not separate the effects of credit from the effects of ambition.',
      ],
      0,
      'The results were “more modest”: no measurable average rise in income, but more flexibility for some households (A). Nothing says borrowers were harmed (B); (C) and (D) contradict “more modest”; randomizing access is exactly what solves the ambition problem (E).',
    ),
  ]),
  se(
    1,
    'The restaurant is so _____ that diners routinely wait an hour for a table.',
    ['popular', 'sought-after', 'expensive', 'obscure', 'quiet', 'inconvenient'],
    [0, 1],
    'Long waits for a table come from high demand: **popular**, **sought-after**. “Obscure” is the opposite; “expensive,” “quiet,” and “inconvenient” don’t explain the crowds.',
  ),
  se(
    2,
    'The report’s _____ tone—it describes a catastrophic flood in the language of a routine inventory—struck many readers as callous.',
    ['clinical', 'detached', 'alarmist', 'emotional', 'sarcastic', 'hopeful'],
    [0, 1],
    'Describing a catastrophe like an inventory is coolly impersonal: **clinical**, **detached**. “Alarmist” and “emotional” form a pair meaning the opposite; “sarcastic” and “hopeful” don’t match the dash’s description.',
  ),
  se(
    2,
    'The coach’s praise was _____: she complimented players only when they had done something genuinely exceptional.',
    ['sparing', 'infrequent', 'effusive', 'constant', 'insincere', 'public'],
    [0, 1],
    'Praise given only for exceptional play is rarely given: **sparing**, **infrequent**. “Effusive” and “constant” are the opposite; “insincere” and “public” don’t follow from the colon’s explanation.',
  ),
  se(
    3,
    'Although the essayist’s opinions are often _____, her arguments for them are patient and careful, never merely provocative.',
    ['contrarian', 'dissenting', 'conventional', 'orthodox', 'tentative', 'derivative'],
    [0, 1],
    '“Although … never merely provocative” implies her opinions themselves are the kind that provoke — against received views: **contrarian**, **dissenting**. “Conventional” and “orthodox” are the trap pair; they would leave nothing for “although” to concede.',
  ),
  passage('gothic', gothic, [
    rc(
      2,
      'According to the passage, the walls of Romanesque churches were thick because they',
      [
        'had to resist the outward thrust of the vaults',
        'were built before glass was available',
        'had to support the flying buttresses',
        'followed rules of proportion that required thick walls',
        'were meant to keep the interiors dark',
      ],
      0,
      'In Romanesque churches, the vaults’ thrust “had been resisted by the walls themselves, which therefore had to be thick” (A). The buttresses came later (C); (B), (D), and (E) aren’t given as reasons.',
    ),
    rc(
      3,
      'The author mentions the collapse at Beauvais most likely in order to',
      [
        'illustrate the claim that the builders worked partly by trial and error',
        'argue that flying buttresses were an unreliable technique in general',
        'show that Beauvais was built more carelessly than other cathedrals',
        'explain why later Gothic cathedrals were built lower than Beauvais',
        'suggest that the builders had a modern theory of how structures behave',
      ],
      0,
      'Right after saying the builders worked partly “by trial and error” and that “not every experiment succeeded,” the author gives Beauvais as the example (A). One collapse, followed by rebuilding with more supports, doesn’t show buttresses were unreliable in general (B) or that Beauvais was careless (C); (E) contradicts the passage.',
    ),
    rcMulti(
      3,
      'It can be inferred from the passage that the flying buttress made possible which of the following?',
      [
        'Larger windows in the walls of churches',
        'Vaults taller than earlier builders had attempted',
        'A modern theory of how structures carry loads',
      ],
      [0, 1],
      'With the buttresses carrying the thrust, walls “could be given over to glass” (A), and the buttress is named as “the key” to vaults of unprecedented height (B). The builders had “no theory of structures in the modern sense” (C).',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const jenner = `Long before Edward Jenner’s famous experiment of 1796, people in Asia, Africa, and Europe protected themselves against smallpox by a practice called variolation: material from a smallpox sore was scratched into the skin of a healthy person, who usually developed a mild case of the disease and was afterward immune. Variolation was effective but risky, since a small fraction of those treated developed severe smallpox, and they could spread the disease to others. Jenner, an English country doctor, had heard that milkmaids who caught cowpox, a mild disease of cattle, seemed not to get smallpox. He inoculated a boy with material from a cowpox sore and later exposed him to smallpox; the boy did not fall ill. The new method, which came to be called vaccination, from the Latin word for cow, was far safer than variolation, and within a few decades it had largely replaced the older practice.`;

const oak = `The city council of Parkside plans to lower the speed limit on Oak Avenue from 40 to 30 miles per hour. Council members point out that since a neighboring town lowered the speed limit on its main road two years ago, accidents on that road have fallen by a third, and they conclude that the lower limit will reduce accidents on Oak Avenue as well.`;

const qwerty = `The QWERTY keyboard layout, designed for typewriters in the 1870s, is often cited as a textbook case of what economists call path dependence: an inferior technology that survives because early adoption locked it in. According to the familiar story, a rival layout patented in the 1930s by August Dvorak allowed much faster typing, but by then typists had already been trained on QWERTY, and no one wanted to be the first to switch. Some economists have challenged this story. Examining the evidence for Dvorak’s superiority, they found that many of the early studies had been conducted by Dvorak himself, and that later, more careful tests showed little difference in speed. If they are right, QWERTY is less an example of a market locked into an inferior standard than of a standard that was simply good enough.`;

export const V2E = section(8, 'v2e', [
  tc(
    1,
    'Unlike his _____ older brother, who could strike up a conversation with anyone, Ravi was so shy that he rarely spoke in class.',
    [[['outgoing', 'studious', 'athletic', 'wealthy', 'quiet'], 0]],
    '“Unlike” sets the brother against shy Ravi, and “could strike up a conversation with anyone” defines the brother: **outgoing**. “Quiet” describes Ravi, not the contrast.',
  ),
  tc(
    1,
    'The museum’s new wing, with its glass walls and open galleries, feels bright and _____ compared with the dim, cramped rooms of the original building.',
    [[['airy', 'gloomy', 'ancient', 'crowded', 'costly'], 0]],
    'Glass walls and open galleries, set against “dim, cramped rooms,” make the wing bright and **airy** (open and spacious). “Gloomy” and “crowded” describe the old rooms.',
  ),
  tc(
    2,
    'The team’s victory was (i)_____: having lost its three best players to injury, it had been expected to (ii)_____ in the opening round.',
    [
      [['unexpected', 'predictable', 'lopsided'], 0],
      [['falter', 'triumph', 'rest'], 0],
    ],
    '(i) The colon explains the victory: without its best players the team wasn’t supposed to win, so the win was **unexpected**. (ii) A weakened team would be expected to **falter** (stumble, lose).',
    [
      '“Predictable” contradicts the injuries; “lopsided” (a big margin) isn’t explained by the colon’s clause.',
      '“Triumph” is what it did, not what it was expected to do; “rest” makes no sense in the opening round.',
    ],
  ),
  tc(
    2,
    'Early critics found the composer’s music (i)_____, full of clashing harmonies that seemed to follow no rules. Later listeners, more familiar with her methods, came to hear the same passages as (ii)_____ ordered, and today her work is regarded as (iii)_____ rather than chaotic.',
    [
      [['discordant', 'soothing', 'conventional'], 0],
      [['carefully', 'randomly', 'barely'], 0],
      [['rigorous', 'careless', 'derivative'], 0],
    ],
    '(i) “Clashing harmonies” are **discordant**. (ii) Later listeners reversed the verdict: the passages are **carefully** ordered. (iii) “Rather than chaotic” needs the opposite — **rigorous**.',
    [
      '“Soothing” and “conventional” contradict clashing harmonies that follow no rules.',
      '“Randomly” and “barely” ordered would agree with the early critics, not revise them.',
      '“Careless” means the same as chaotic; “derivative” isn’t its opposite.',
    ],
  ),
  passage('jenner', jenner, [
    rc(
      1,
      'According to the passage, variolation involved',
      [
        'deliberately giving a healthy person a mild case of smallpox',
        'inoculating people with material taken from the sores of cowpox',
        'isolating people who had already caught smallpox',
        'exposing milkmaids to cattle infected with cowpox',
        'treating smallpox after symptoms had appeared',
      ],
      0,
      'Smallpox material was scratched into a healthy person’s skin, usually producing “a mild case of the disease” and later immunity (A). Cowpox material (B) was Jenner’s later method; (C), (D), and (E) aren’t described.',
    ),
    rc(
      2,
      'The passage suggests that the main advantage of vaccination over variolation was that vaccination',
      [
        'carried much less risk of causing severe disease',
        'protected against more diseases than smallpox',
        'had been practiced for a much longer time',
        'required no contact with cattle or other animals',
        'produced immunity much more quickly than before',
      ],
      0,
      'Variolation was risky because some developed “severe smallpox” and could spread it; vaccination, using a mild cattle disease, was “far safer” (A). The passage says nothing about other diseases (B) or speed (E); variolation was the older practice (C); vaccine material came from cowpox (D).',
    ),
    rc(
      2,
      'The author mentions milkmaids in order to',
      [
        'identify the observation that led Jenner to his experiment',
        'show that variolation was practiced mainly in the countryside',
        'explain how cowpox spread from cattle to people',
        'suggest that Jenner’s results were unreliable',
        'describe the people on whom Jenner tested his method',
      ],
      0,
      'Jenner “had heard that milkmaids who caught cowpox … seemed not to get smallpox,” and then tested the idea on a boy (A). He tested it on a boy, not milkmaids (E); the other choices aren’t supported.',
    ),
  ]),
  se(
    1,
    'The hotel’s staff were unfailingly _____, greeting every guest by name and anticipating requests before they were made.',
    ['attentive', 'considerate', 'rude', 'indifferent', 'weary', 'numerous'],
    [0, 1],
    'Greeting guests by name and anticipating their needs shows care for them: **attentive**, **considerate**. “Rude” and “indifferent” are the opposite; “weary” and “numerous” don’t follow from the description.',
  ),
  se(
    1,
    'The old farmhouse, abandoned for decades, was in a _____ state: its roof had fallen in and its windows were broken.',
    ['dilapidated', 'ramshackle', 'pristine', 'renovated', 'historic', 'spacious'],
    [0, 1],
    'A fallen roof and broken windows describe a building in ruins: **dilapidated**, **ramshackle**. “Pristine” and “renovated” are the opposite pair; “historic” and “spacious” don’t match the colon’s details.',
  ),
  se(
    2,
    'Although the author insists that her study is _____, its choice of evidence betrays a clear preference for one side of the debate.',
    ['neutral', 'impartial', 'partisan', 'exhaustive', 'original', 'polemical'],
    [0, 1],
    '“Although … betrays a clear preference” — she claims to take no side: **neutral**, **impartial**. “Partisan” and “polemical” describe what the study actually is.',
  ),
  se(
    2,
    'The speaker’s _____ remarks went on for nearly an hour, long after most of the audience had stopped listening.',
    ['long-winded', 'prolix', 'pithy', 'succinct', 'witty', 'inaudible'],
    [0, 1],
    'Remarks that run nearly an hour and outlast the audience’s attention are **long-winded**, **prolix** (wordy). “Pithy” and “succinct” are the opposite pair.',
  ),
  argument(
    'oak',
    oak,
    rc(
      2,
      'The council’s conclusion depends on which of the following assumptions?',
      [
        'Oak Avenue drivers will obey the lower limit about as well as the other town’s did.',
        'Oak Avenue has more accidents each year than any other street in Parkside.',
        'Most of the accidents on Oak Avenue involve pedestrians rather than other cars.',
        'The neighboring town’s main road carries much more traffic than Oak Avenue does.',
        'Lowering the speed limit will not noticeably increase drivers’ travel times.',
      ],
      0,
      'The council reasons from the neighboring town’s result to Oak Avenue, which works only if the change will have a similar effect there — and a lower limit can reduce accidents only if drivers actually slow down (A). If Oak Avenue drivers ignored the new limit, the conclusion would collapse. The other choices aren’t required: the plan could work even if they were false.',
    ),
  ),
  passage('qwerty', qwerty, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'presenting a challenge to a well-known case of path dependence',
        'explaining how the QWERTY layout was originally designed',
        'arguing that typists should switch to the faster Dvorak layout',
        'describing how typewriters became popular in offices and homes',
        'defending the familiar story about how keyboard layouts spread',
      ],
      0,
      'The passage gives the familiar QWERTY story, then reports economists’ challenge to it (A). It doesn’t describe the design (B), recommends no switch (C), and presents the story in order to question it, not defend it (E).',
    ),
    rc(
      2,
      'According to the familiar story described in the passage, QWERTY survived because',
      [
        'typists had already learned it by the time a faster layout appeared',
        'it allowed faster typing than any of the rival layouts did',
        'Dvorak’s patent prevented other companies from using his layout',
        'later tests showed little difference in speed between layouts',
        'typewriter makers refused to produce machines with other layouts',
      ],
      0,
      'In the familiar story, Dvorak’s layout was faster “but by then typists had already been trained on QWERTY” (A). (B) contradicts the story; (D) is the challengers’ finding, not the familiar story; (C) and (E) aren’t mentioned.',
    ),
    rc(
      2,
      'The economists mentioned in the passage suggest that the evidence for the Dvorak layout’s superiority',
      [
        'came partly from studies run by someone with a stake in the outcome',
        'was confirmed by later, more careful tests of typing speed',
        'has never actually been examined by any outside researchers',
        'shows that path dependence does not really exist anywhere in the economy',
        'was ignored by the companies that manufactured typewriters',
      ],
      0,
      'Many early studies “had been conducted by Dvorak himself” — the inventor of the layout being tested (A). Later tests showed “little difference” (not B); they examined the evidence (not C); they question one example, not the whole idea of path dependence (D).',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const tokenSentences = [
  'Small clay objects—cones, spheres, disks, and cylinders—turn up at archaeological sites across the Near East from about 8000 BCE onward.',
  'For decades they were catalogued as game pieces or amulets, if they were noticed at all.',
  'In the 1970s the archaeologist Denise Schmandt-Besserat proposed that they were counters used to keep track of goods, each shape standing for a particular commodity, such as a measure of grain or a sheep.',
  'She further argued that the tokens explain the origin of writing.',
  'Around 3500 BCE, tokens began to be sealed inside hollow clay balls, and their shapes were sometimes pressed into the outside, so that the contents could be known without breaking the ball.',
  'Once the marks on the surface conveyed the information, the tokens inside became unnecessary; the marks came to be made on flat tablets instead, and from these, she contended, the earliest written signs developed.',
  'Critics have questioned whether a single system of tokens could have persisted, unchanged in meaning, for five thousand years, but her account of the step from impressed marks to writing has been widely influential.',
];
const tokens = tokenSentences.join(' ');

const leafcutters = `Leafcutter ants, common in the tropical forests of the Americas, are often described as the only farmers in the animal kingdom apart from humans, though several other insects—certain termites and beetles among them—also cultivate fungi. The ants do not eat the leaves they carry home. Instead, they chew them into a pulp on which they grow a fungus, and it is the fungus that feeds the colony. The partnership is ancient and highly specialized: the fungus that leafcutters grow is not known to live anywhere outside their nests, and a new queen setting out to found a colony carries a pellet of it with her from her mother’s nest.

Like human farmers, the ants must contend with pests. Their gardens are attacked by a parasitic fungus, Escovopsis, that can destroy a crop. In the late 1990s, researchers discovered that many of the ants carry, in special cavities on their bodies, colonies of bacteria that produce compounds that suppress the parasite. The discovery prompted comparisons with human agriculture’s use of pesticides—and a puzzle. Pests usually evolve resistance to pesticides; why, after millions of years, has the parasite not overcome the ants’ defenses? One suggestion is that the bacteria, unlike a manufactured pesticide, are themselves living things and can evolve in step with the parasite.`;

export const V2H = section(8, 'v2h', [
  tc(
    2,
    'The biography’s portrait of its subject is relentlessly _____: not once does the author suggest that the great man might have been wrong about anything.',
    [[['hagiographic', 'critical', 'balanced', 'speculative', 'terse'], 0]],
    'A portrait that never admits a single fault treats its subject like a saint: **hagiographic**. “Critical” and “balanced” would include some criticism; “relentlessly” plus the colon rules them out.',
  ),
  tc(
    3,
    'The poet’s reputation has suffered less from her detractors than from her admirers, whose (i)_____ praise has made her seem (ii)_____—a monument to be revered rather than a writer to be read.',
    [
      [['indiscriminate', 'grudging', 'perceptive'], 0],
      [['remote', 'accessible', 'controversial'], 0],
    ],
    '(i) Praise that harms a reputation is praise that admires everything without distinction: **indiscriminate**. (ii) A “monument to be revered rather than a writer to be read” seems **remote** — distant from readers.',
    [
      '“Grudging” praise wouldn’t turn her into a monument; “perceptive” praise wouldn’t harm her.',
      '“Accessible” is the opposite of a monument; nothing suggests “controversial.”',
    ],
  ),
  tc(
    3,
    'Although the new theory at first attracted only a handful of (i)_____, it won adherents with surprising speed—not because its proponents (ii)_____ their critics in argument, but because it (iii)_____ a range of anomalies that the older theory had never managed to explain.',
    [
      [['supporters', 'critics', 'readers'], 0],
      [['bested', 'flattered', 'ignored'], 0],
      [['accounted for', 'overlooked', 'produced'], 0],
    ],
    '(i) “Although … it won adherents with surprising speed” contrasts with a slow start: only a handful of **supporters**. (ii) The theory didn’t win because its proponents **bested** critics in argument. (iii) It won because it **accounted for** (explained) anomalies the old theory couldn’t.',
    [
      'Few “critics” wouldn’t contrast with gaining adherents; “readers” isn’t the point of the contrast.',
      '“Flattered” and “ignored” don’t describe winning an argument, which is the contrast with the “but” clause.',
      'A theory wins adherents by explaining anomalies, not by overlooking or producing them.',
    ],
  ),
  tc(
    3,
    'The museum’s collection of folk instruments is (i)_____ rather than systematic, reflecting the tastes of the few travelers who happened to donate them; a scholar who treated it as a representative sample of the region’s music would be badly (ii)_____.',
    [
      [['idiosyncratic', 'comprehensive', 'recent'], 0],
      [['misled', 'rewarded', 'overworked'], 0],
    ],
    '(i) “Rather than systematic,” shaped by the personal tastes of a few donors: **idiosyncratic**. (ii) Treating such an accidental collection as representative would leave a scholar **misled**.',
    [
      '“Comprehensive” contradicts a collection shaped by a few donors’ tastes; “recent” doesn’t contrast with “systematic.”',
      'The semicolon warns against the mistake, so the scholar would be misled, not “rewarded”; “overworked” is irrelevant.',
    ],
  ),
  passage('tokens', tokens, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'describing a theory about certain ancient objects and how writing began',
        'explaining how clay was prepared for use by potters in the ancient Near East',
        'arguing that the tokens were game pieces rather than counters for goods',
        'comparing the early writing systems that arose in different parts of the world',
        'describing the methods that archaeologists use to date ancient clay objects',
      ],
      0,
      'The passage presents Schmandt-Besserat’s view that the objects were counters and her account of how they led to writing, plus a criticism (A). The game-piece view is the older one she replaced (C); (B), (D), and (E) aren’t discussed.',
    ),
    rc(
      3,
      'According to Schmandt-Besserat’s account as the passage describes it, the marks pressed into the outside of the clay balls were significant because they',
      [
        'showed the contents without breaking the ball, so the tokens became unnecessary',
        'were the very first objects that anyone had used to count stored goods',
        'recorded the names of the owners of the goods that the tokens stood for',
        'proved that the tokens inside had been used as amulets rather than as counters',
        'allowed the balls to be sealed more securely against tampering by traders',
      ],
      0,
      'The marks let people know the contents “without breaking the ball”; once they carried the information, “the tokens inside became unnecessary,” and marks on tablets led to writing (A). The tokens themselves were the counters (B); (C), (D), and (E) aren’t in the passage.',
    ),
    rcSelect(
      3,
      'Select the sentence in which the author describes the point in Schmandt-Besserat’s account at which information stopped being carried by the tokens themselves.',
      tokenSentences,
      5,
      'The sixth sentence marks the shift: once the marks on the surface conveyed the information, “the tokens inside became unnecessary,” and marks moved to tablets. The sentence before it describes impressing the marks, but the tokens are still sealed inside and still in use.',
    ),
  ]),
  se(
    3,
    'The committee’s decision to cancel the festival, announced without explanation or any consultation with residents, struck many of them as _____.',
    ['peremptory', 'high-handed', 'prudent', 'inevitable', 'generous', 'overdue'],
    [0, 1],
    'A decision imposed without explanation or consultation seems dictatorial: **peremptory**, **high-handed**. “Prudent” implies good reasons that residents weren’t told; “inevitable” and “overdue” don’t follow from the lack of consultation.',
  ),
  se(
    3,
    'The novelist’s early stories are _____, each crowded with more characters and incidents than its few pages can comfortably hold.',
    ['congested', 'cluttered', 'spare', 'austere', 'wistful', 'polished'],
    [0, 1],
    'Stories “crowded with more characters and incidents than [they] can comfortably hold” are **congested**, **cluttered**. “Spare” and “austere” are the opposite pair; “polished” clashes with the criticism.',
  ),
  se(
    3,
    'The senator’s _____ remarks, delivered at a moment of national grief, were widely condemned as a failure of judgment.',
    ['flippant', 'facetious', 'solemn', 'somber', 'lengthy', 'belated'],
    [0, 1],
    'Remarks condemned for their poor judgment at a time of grief must have been inappropriately light: **flippant**, **facetious**. “Solemn” and “somber” would suit the moment; “lengthy” and “belated” aren’t a failure of judgment in tone.',
  ),
  se(
    3,
    'Her reputation for _____ was well earned: in forty years on the bench, she never once allowed her personal sympathies to influence a ruling.',
    ['impartiality', 'evenhandedness', 'leniency', 'severity', 'eloquence', 'erudition'],
    [0, 1],
    'Never letting personal sympathies sway a ruling is **impartiality**, **evenhandedness**. “Leniency” and “severity” are tendencies to rule one way; “eloquence” and “erudition” aren’t what the colon describes.',
  ),
  passage('leafcutters', leafcutters, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'describe the ants’ fungus farming, including how they defend their crop',
        'argue that leafcutter ants are the only farmers apart from humans',
        'compare the farming methods of ants, termites, and certain beetles',
        'explain how the parasite Escovopsis was first discovered by researchers',
        'recommend that human farmers adopt the ants’ methods of pest control',
      ],
      0,
      'Paragraph one explains how the ants farm fungus; paragraph two covers the parasite and the ants’ bacterial defense (A). The passage qualifies the “only farmers” claim (B); termites and beetles get one mention (C); nothing is recommended (E).',
    ),
    rc(
      3,
      'The author mentions that leafcutter ants are “often described as the only farmers in the animal kingdom apart from humans” most likely in order to',
      [
        'introduce a common claim that the author then qualifies',
        'emphasize that the ants’ farming is unique in nature',
        'suggest that termites learned farming from the ants',
        'argue that ants are more intelligent than other insects',
        'explain why the ants do not eat leaves',
      ],
      0,
      'The same sentence continues “though several other insects … also cultivate fungi” — the author reports the claim and corrects it (A), which rules out (B). Nothing suggests (C) or (D).',
    ),
    rc(
      3,
      'It can be inferred from the passage that the fungus cultivated by leafcutter ants',
      [
        'depends on the ants for its continued existence',
        'is eaten by the ants only when leaves are scarce',
        'produces compounds that suppress Escovopsis',
        'was first cultivated by termites',
        'grows naturally throughout tropical forests',
      ],
      0,
      'The fungus “is not known to live anywhere outside their nests,” and queens carry it to each new colony — so it survives only through the ants (A). The ants never eat the leaves (B); the bacteria, not the fungus, suppress the parasite (C); (E) contradicts the passage.',
    ),
    rcMulti(
      3,
      'The passage suggests which of the following about the bacteria that the ants carry?',
      [
        'They help protect the ants’ fungus gardens.',
        'They may be able to change over time in response to the parasite.',
        'They were first discovered living apart from the ants.',
      ],
      [0, 1],
      'The bacteria “produce compounds that suppress the parasite” (A), and one suggestion is that they “can evolve in step with the parasite” (B). They were found on the ants’ bodies (C is unsupported).',
    ),
  ]),
]);
