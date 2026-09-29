// Practice Test 7 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const vowels = `Between roughly 1400 and 1700, the pronunciation of the long vowels of English changed in a systematic way that linguists call the Great Vowel Shift. Each long vowel moved higher in the mouth, and the two that were already as high as they could go—the vowels of words like bite and house, once pronounced roughly as “beet” and “hoose”—became diphthongs, sounds that glide from one vowel position to another. Because English spelling was becoming standardized during the same period, partly through the influence of printing, many spellings preserved pronunciations that were about to disappear. This is why English vowel letters stand for sounds so different from those they represent in most other European languages: the letters stayed put while the sounds moved.`;

const tulips = `In the winter of 1636–37, prices for tulip bulbs in the Dutch Republic rose to extraordinary heights and then collapsed within a few weeks. For more than a century the episode, known as tulipmania, served as the classic example of a speculative mania: a whole society, the story went, abandoned good sense, and the collapse ruined merchants and plunged the Dutch economy into distress. Much of this account derives from a book published in 1841 by the Scottish journalist Charles Mackay, who relied heavily on moralizing pamphlets printed just after the crash.

Historians who have since examined notarial records and court documents from the period paint a different picture. The trade was concentrated among a relatively small circle of merchants and artisans; many contracts made at the peak were never honored, so fewer people lost money than the pamphlets implied; and there is little evidence of wider economic damage. Some economists have gone further, arguing that the highest prices—paid for rare bulbs whose striped flowers could not be reliably reproduced—were not obviously irrational at all.`;

export const V1 = section(7, 'v1', [
  tc(
    2,
    'Long dismissed as a mere _____, the amateur astronomer is now credited with several discoveries that the professionals of her day failed to make.',
    [[['dabbler', 'pioneer', 'authority', 'recluse', 'skeptic'], 0]],
    '“Long dismissed as a mere ___” needs a belittling word for an amateur, set against her real achievements: **dabbler** (someone who dabbles without serious commitment). “Pioneer” and “authority” are what she turned out to be — not a dismissal.',
  ),
  tc(
    2,
    'Critics who expected the retrospective to (i)_____ the painter’s reputation were surprised: instead of confirming his place among the great modernists, the exhibition exposed how (ii)_____ much of his later work had become, as he repeated the formulas of his early success.',
    [
      [['cement', 'tarnish', 'ignore'], 0],
      [['stale', 'daring', 'obscure'], 0],
    ],
    '(i) “Instead of confirming his place” tells you what critics expected: that the show would **cement** his reputation. (ii) Work that repeats old formulas has grown **stale**.',
    [
      '“Tarnish” is what actually happened, not what was expected; “ignore” doesn’t match “confirming.”',
      '“Daring” is the opposite of repeating formulas; “obscure” doesn’t follow from repetition.',
    ],
  ),
  tc(
    3,
    'Although the treatise is often cited as a (i)_____ of free-market thought, its author was far more (ii)_____ than his modern admirers suggest: whole chapters warn against collusion among merchants and call for public spending on education—passages that his more (iii)_____ disciples tend to pass over in silence.',
    [
      [['cornerstone', 'refutation', 'parody'], 0],
      [['nuanced', 'doctrinaire', 'influential'], 0],
      [['zealous', 'skeptical', 'scholarly'], 0],
    ],
    '(i) Admirers cite the treatise as a foundation of free-market thought — a **cornerstone**. (ii) Warnings about merchants and calls for public spending show a thinker more **nuanced** than the admirers’ version. (iii) Disciples who skip the inconvenient passages are the most **zealous** ones.',
    [
      'Admirers wouldn’t cite a “refutation” or “parody” of the views they admire.',
      '“Doctrinaire” (rigidly committed to one doctrine) is how the admirers portray him — the opposite of the point; “influential” doesn’t contrast with their portrait.',
      '“Skeptical” or “scholarly” readers would be the least likely to ignore awkward passages.',
    ],
  ),
  passage('vowels', vowels, [
    rc(
      2,
      'According to the passage, one reason English vowel letters stand for sounds different from those they represent in most other European languages is that',
      [
        'English spelling became fixed while the pronunciation of its long vowels was still changing',
        'English adopted the Latin alphabet later than other languages did',
        'early printers deliberately introduced new spellings',
        'the short vowels of English changed more than its long vowels',
        'other European languages had undergone a similar shift earlier',
      ],
      0,
      'The last two sentences give the reason: spelling was standardized during the shift, so “the letters stayed put while the sounds moved” (A). Printing helped fix spellings; it didn’t invent new ones (C). Nothing is said about the alphabet’s adoption (B), short vowels (D), or other languages’ histories (E).',
    ),
    rc(
      3,
      'It can be inferred from the passage that before the Great Vowel Shift, the vowel in the word house',
      [
        'was a single vowel sound rather than a glide from one position to another',
        'was pronounced lower in the mouth than it is today',
        'rhymed with the vowel in bite',
        'was spelled differently than it is today',
        'had the same pronunciation in all English dialects',
      ],
      0,
      'The vowel of house was one of the two that “became diphthongs,” so before the shift it wasn’t one — it was a single vowel, roughly as in “hoose” (A). It was already as high as it could go, so it wasn’t lower before (B). The passage says spellings were preserved, not changed (D); (C) and (E) aren’t supported.',
    ),
  ]),
  se(
    1,
    'After the bridge washed out, the hikers were _____ on the far side of the river for two days until a rescue team reached them.',
    ['stranded', 'marooned', 'soaked', 'rescued', 'guided', 'delighted'],
    [0, 1],
    'Cut off by the washed-out bridge and waiting for rescue, the hikers were **stranded**, **marooned**. “Rescued” happened only at the end; “soaked” may be true but has no partner and misses “for two days.”',
  ),
  se(
    2,
    'Unlike her _____ predecessor, who held a press conference to announce even minor decisions, the new director rarely speaks to reporters.',
    ['voluble', 'loquacious', 'reticent', 'taciturn', 'competent', 'popular'],
    [0, 1],
    '“Unlike” contrasts the predecessor with a director who rarely speaks, so the predecessor was talkative: **voluble**, **loquacious**. “Reticent” and “taciturn” are the trap pair — they describe the new director, not the predecessor.',
  ),
  se(
    2,
    'The negotiator’s _____ manner—she never raised her voice, even when provoked—helped calm tensions that had derailed earlier talks.',
    ['unflappable', 'imperturbable', 'abrasive', 'volatile', 'evasive', 'verbose'],
    [0, 1],
    'Never raising her voice even when provoked describes someone who stays calm: **unflappable**, **imperturbable**. “Abrasive” and “volatile” are the opposite and wouldn’t calm tensions; “evasive” and “verbose” don’t match the dash’s explanation.',
  ),
  se(
    3,
    'Far from being _____, the committee’s final report is full of hedges and qualifications, as though its authors feared committing themselves to any conclusion.',
    ['categorical', 'unequivocal', 'tentative', 'guarded', 'lengthy', 'partisan'],
    [0, 1],
    '“Far from being ___” needs the opposite of a report full of hedges: **categorical**, **unequivocal** (stated without qualification). “Tentative” and “guarded” are the trap pair — they describe what the report actually is.',
  ),
  passage('tulips', tulips, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'describe how a traditional account of a historical episode has been challenged',
        'explain why tulip prices rose so sharply in 1636',
        'defend Mackay’s account against its modern critics',
        'argue that all speculative manias are rational',
        'compare tulipmania with later financial crises',
      ],
      0,
      'The first paragraph gives the traditional story and its source; the second reports the evidence against it (A). The passage never explains the rise (B), sides against Mackay (not C), makes no claim about all manias (D), and mentions no later crises (E).',
    ),
    rc(
      3,
      'The author mentions that Mackay “relied heavily on moralizing pamphlets printed just after the crash” most likely in order to',
      [
        'suggest a reason to doubt the reliability of the traditional account',
        'show that the crash was widely reported at the time',
        'explain why the Dutch economy suffered after the crash',
        'praise Mackay for using sources from the period',
        'identify the documents that later historians examined',
      ],
      0,
      'Pamphlets written to moralize, just after the event, are a shaky basis for a history — and the next paragraph shows they exaggerated the losses (A). The later historians used notarial and court records, not the pamphlets (E); the author doesn’t praise Mackay (D).',
    ),
    rcMulti(
      3,
      'According to the passage, historians who examined records from the period found which of the following?',
      [
        'Trading in tulips was confined to a fairly narrow group of people.',
        'Many agreements made at the height of the market were never carried out.',
        'The collapse did serious damage to the wider Dutch economy.',
      ],
      [0, 1],
      'The trade was “concentrated among a relatively small circle of merchants and artisans” (A), and “many contracts made at the peak were never honored” (B). They found “little evidence of wider economic damage” — the opposite of C.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const silk = `The term “Silk Road” was coined in 1877 by the German geographer Ferdinand von Richthofen, and it has shaped how we imagine the ancient trade between China and the Mediterranean: a single highway along which caravans carried silk westward. Historians now stress that the reality was quite different. There was no one road but a shifting web of routes, and few merchants traveled more than a small part of it; goods typically passed from hand to hand through many intermediaries. Silk was only one commodity among many—horses, paper, glass, spices, and precious metals also moved along the routes—and the exchange of ideas, religions, and technologies may have mattered more in the long run than the trade in any single good. Buddhism, for example, spread from India into China largely along these routes.`;

const harwell = `Sales of Harwell Foods’ frozen dinners fell by 15 percent last year, the first year after the company redesigned the dinners’ packaging. Harwell’s marketing director argues that customers dislike the new packaging and recommends returning to the old design.`;

const mercator = `In 1569 the Flemish cartographer Gerardus Mercator published a world map built on a new projection. Its great virtue was practical: on Mercator’s map, a line of constant compass bearing—the course a navigator actually steers—appears as a straight line, so a sailor could plot a route with a ruler. The price of this convenience is a distortion of area that grows toward the poles. Greenland, for instance, appears roughly as large as Africa, though Africa is about fourteen times larger. Critics have long objected that the projection, adopted far beyond its original navigational purpose, gives a misleading picture of the world by exaggerating the size of lands far from the equator. Defenders reply that every flat map must distort something, since a sphere cannot be flattened without stretching; the only question is which distortions suit a map’s purpose.`;

export const V2E = section(7, 'v2e', [
  tc(
    1,
    'Because the main bridge had been _____ for repairs, drivers were forced to take a long detour through the hills.',
    [[['closed', 'designed', 'praised', 'widened', 'painted'], 0]],
    'A detour is needed when the usual route can’t be used, so the bridge was **closed**. Repairs might widen or paint a bridge, but neither would force a detour.',
  ),
  tc(
    1,
    'The town’s water supply, once _____, has become so polluted that residents are now advised to boil it before drinking.',
    [[['pristine', 'scarce', 'costly', 'murky', 'imported'], 0]],
    '“Once ___” contrasts with “so polluted,” so the water used to be clean: **pristine**. “Murky” agrees with the pollution instead of contrasting; “scarce” and “costly” are about supply, not purity.',
  ),
  tc(
    2,
    'The new policy was meant to (i)_____ the paperwork required of small businesses, but in practice it has (ii)_____ it, adding three new forms to the two it replaced.',
    [
      [['reduce', 'standardize', 'verify'], 0],
      [['increased', 'eliminated', 'simplified'], 0],
    ],
    '(i) “But in practice” signals the policy did the opposite of its aim; adding forms is the opposite of reducing, so it was meant to **reduce** paperwork. (ii) Three new forms replacing two means it **increased** the paperwork.',
    [
      '“Standardize” and “verify” don’t set up the contrast that adding forms completes.',
      '“Eliminated” and “simplified” contradict adding three forms for two.',
    ],
  ),
  tc(
    2,
    'Though the explorer’s journals were long regarded as (i)_____ records of his travels, historians have recently found that he (ii)_____ several episodes, borrowing incidents from the accounts of earlier travelers. The discovery has made scholars more (iii)_____ about relying on the journals for facts.',
    [
      [['faithful', 'fanciful', 'incomplete'], 0],
      [['invented', 'omitted', 'witnessed'], 0],
      [['cautious', 'eager', 'certain'], 0],
    ],
    '(i) “Though … long regarded as” sets up a reversal, so the journals were thought **faithful** (accurate). (ii) Episodes borrowed from other travelers were **invented**, not experienced. (iii) Finding fabrications makes scholars more **cautious**.',
    [
      '“Fanciful” is what the journals turned out to be — no reversal; “incomplete” doesn’t match borrowing incidents.',
      '“Omitted” is the reverse of adding borrowed incidents; “witnessed” contradicts borrowing them.',
      'Discovering fabrications wouldn’t make scholars “eager” or “certain.”',
    ],
  ),
  passage('silk', silk, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'correcting a common picture of the ancient trade between China and the Mediterranean',
        'describing how silk was produced in ancient China',
        'explaining why Richthofen chose the term “Silk Road”',
        'arguing that silk was the most valuable good traded on the routes',
        'tracing the spread of Buddhism from China to India',
      ],
      0,
      'The passage sets the popular image — one highway, silk carried west — against what historians now stress (A). It says nothing about producing silk (B) or Richthofen’s reasons (C), downplays silk’s importance (D), and has Buddhism moving from India into China (E reverses it).',
    ),
    rc(
      2,
      'According to the passage, most merchants who traded along the routes',
      [
        'traveled only a small part of the network',
        'carried silk from China all the way to the Mediterranean',
        'were Buddhist missionaries',
        'followed a single established highway',
        'dealt mainly in precious metals',
      ],
      0,
      '“Few merchants traveled more than a small part of it,” with goods passing through many hands (A). (B) and (D) are the popular image the passage corrects; (C) and (E) aren’t stated.',
    ),
    rc(
      2,
      'The author mentions Buddhism most likely in order to',
      [
        'illustrate the claim that the routes carried ideas as well as goods',
        'suggest that silk was not in fact traded along the routes',
        'explain the origin of the term “Silk Road”',
        'argue that religion caused the decline of the routes',
        'show that India was the center of the trade',
      ],
      0,
      'Right after claiming that the exchange of “ideas, religions, and technologies” may have mattered most, the author gives Buddhism “for example” (A). Silk was traded — it was just one good among many (B); (C), (D), and (E) aren’t suggested.',
    ),
  ]),
  se(
    1,
    'The directions on the medicine bottle were _____: take one tablet twice a day with food.',
    ['straightforward', 'simple', 'confusing', 'lengthy', 'handwritten', 'optional'],
    [0, 1],
    'The colon introduces the directions themselves, which are short and easy to follow: **straightforward**, **simple**. “Confusing” and “lengthy” contradict the example.',
  ),
  se(
    1,
    'Having trained for months, the runner felt _____ about her chances in the marathon.',
    ['optimistic', 'hopeful', 'anxious', 'indifferent', 'doubtful', 'angry'],
    [0, 1],
    'Months of training give a reason for confidence: **optimistic**, **hopeful**. “Anxious” and “doubtful” are a rough pair, but the sentence gives no reason for worry.',
  ),
  se(
    2,
    'The collector’s tastes are famously _____: her house holds Roman coins, Japanese prints, and midcentury American furniture side by side.',
    ['eclectic', 'wide-ranging', 'refined', 'narrow', 'expensive', 'conservative'],
    [0, 1],
    'Objects from very different times and places show tastes drawn from many sources: **eclectic**, **wide-ranging**. “Narrow” is the opposite; “refined” and “expensive” may be true of a collector but aren’t what the list illustrates.',
  ),
  se(
    2,
    'Many visitors found the sculpture _____, unable to tell what, if anything, it was meant to represent.',
    ['baffling', 'perplexing', 'beautiful', 'offensive', 'familiar', 'enormous'],
    [0, 1],
    'Not being able to tell what it represents leaves viewers puzzled: **baffling**, **perplexing**. “Familiar” is the opposite; “beautiful,” “offensive,” and “enormous” don’t follow from the confusion.',
  ),
  argument(
    'harwell',
    harwell,
    rc(
      2,
      'Which of the following, if true, most seriously weakens the marketing director’s argument?',
      [
        'Last year, sales of frozen dinners from all major brands fell by about 15 percent as supermarkets expanded their selections of fresh prepared meals.',
        'The new packaging costs more to produce than the old packaging did.',
        'In a survey, some customers said the new packaging was hard to open.',
        'Sales fell most sharply in the regions where the new packaging was introduced first.',
        'Harwell’s competitors have not changed their packaging in several years.',
      ],
      0,
      'The director assumes the packaging caused the drop. If the whole market fell by the same 15 percent for another reason, Harwell’s decline needs no packaging explanation (A). (C) and (D) support the director; (B) is about cost, not sales; (E) doesn’t explain the drop either way.',
    ),
  ),
  passage('mercator', mercator, [
    rc(
      1,
      'According to the passage, the main advantage of Mercator’s projection for navigators was that it',
      [
        'shows a course of constant compass bearing as a straight line',
        'shows the true relative sizes of the continents',
        'reduces the distortion of areas near the poles',
        'was the first map to include Greenland',
        'could be printed more cheaply than earlier maps',
      ],
      0,
      '“A line of constant compass bearing … appears as a straight line, so a sailor could plot a route with a ruler” (A). The map distorts areas, especially near the poles — the opposite of (B) and (C). (D) and (E) aren’t mentioned.',
    ),
    rc(
      2,
      'The comparison between Greenland and Africa serves primarily to',
      [
        'illustrate how Mercator’s projection distorts area',
        'show that Mercator made errors in measuring Greenland',
        'explain why sailors avoided the polar regions',
        'argue that Africa is often left off world maps',
        'support the defenders’ view of the projection',
      ],
      0,
      'The sentence before says the projection distorts area, increasingly toward the poles; Greenland looking as big as a continent fourteen times its size illustrates that (A). The distortion comes from the projection, not from mismeasurement (B).',
    ),
    rc(
      2,
      'The defenders mentioned in the last sentence would most likely agree that',
      [
        'a map’s distortions should be judged in light of what the map is used for',
        'Mercator’s projection shows the areas of countries accurately',
        'a sphere can be represented on a flat map without distortion',
        'maps should not be used for navigation',
        'Greenland and Africa are about the same size',
      ],
      0,
      'The defenders say every flat map distorts something and the question is “which distortions suit a map’s purpose” (A). They explicitly deny (C); (B) and (E) contradict the passage; (D) contradicts the projection’s whole purpose.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const etherSentences = [
  'On October 16, 1846, in a surgical theater at Massachusetts General Hospital in Boston, a dentist named William Morton administered ether to a patient, and a surgeon removed a tumor from the patient’s neck while he lay insensible.',
  'The demonstration is usually taken as the birth of surgical anesthesia, and news of it reached Europe within a few months.',
  'Yet Morton was not the first to use ether in this way.',
  'A Georgia physician, Crawford Long, had operated on patients under ether as early as 1842, but he did not publish his results until 1849.',
  'Long’s case illustrates a point that historians of science often make about priority: credit tends to go not to whoever does something first but to whoever first makes it known in a form that others can adopt.',
  'A technique used quietly in a country practice changed little beyond it; a public demonstration before an audience of physicians changed surgery everywhere.',
];
const ether = etherSentences.join(' ');

const poe = `When Edgar Allan Poe published “The Murders in the Rue Morgue” in 1841, he established, almost at a stroke, most of the conventions of the detective story: the brilliant, eccentric investigator; the admiring, less perceptive companion who narrates; the baffling crime in a locked room; the inept official police; and the final scene in which the detective explains his reasoning. Poe’s detective, C. Auguste Dupin, reappeared in two later stories, and Arthur Conan Doyle, whose Sherlock Holmes first appeared in 1887, acknowledged the debt—even as he had Holmes dismiss Dupin as “a very inferior fellow.”

Yet Poe himself seems to have regarded these “tales of ratiocination,” as he called them, with some irony. The ingenuity of the solutions, he remarked in a letter, is less than it appears, since the author has woven the web himself for the express purpose of unraveling it. On this view the detective story is a kind of conjuring trick: its pleasure lies not in the detective’s reasoning, which the author controls, but in the reader’s experience of being led from bewilderment to clarity. Later writers who prided themselves on playing fair with the reader—supplying every clue needed to solve the crime—can be read as trying to answer Poe’s objection, turning the story into a genuine contest between author and reader.`;

export const V2H = section(7, 'v2h', [
  tc(
    2,
    'The biologist’s hypothesis was framed so _____ that no conceivable experimental result could have counted against it—which, her critics pointed out, was a weakness rather than a strength.',
    [[['loosely', 'rigidly', 'narrowly', 'recently', 'modestly'], 0]],
    'A hypothesis that no result could count against must be stated vaguely enough to fit anything: framed **loosely**. That is a weakness because it predicts nothing. “Rigidly” and “narrowly” would do the opposite — they would rule results out.',
  ),
  tc(
    3,
    'The reformers’ early successes proved (i)_____: within a decade, most of the laws they had championed were repealed, and the abuses those laws had curbed (ii)_____ in forms that were harder to regulate.',
    [
      [['ephemeral', 'enduring', 'unpopular'], 0],
      [['reappeared', 'vanished', 'diminished'], 0],
    ],
    '(i) Successes undone “within a decade” were short-lived: **ephemeral**. (ii) Once the laws were repealed, the abuses they had curbed came back — they **reappeared**, now in new forms.',
    [
      '“Enduring” is the opposite of being repealed within a decade; nothing says the successes were “unpopular.”',
      '“Vanished” and “diminished” contradict the abuses returning “in forms that were harder to regulate.”',
    ],
  ),
  tc(
    3,
    'The memoirist has a gift for the (i)_____ detail: rather than describing her father’s temper at length, she mentions the (ii)_____ way he folded his newspaper each morning, and the reader understands everything. Such (iii)_____ is rarer than it should be in a genre that tends toward the exhaustive.',
    [
      [['telling', 'extraneous', 'lurid'], 0],
      [['furious', 'absent-minded', 'leisurely'], 0],
      [['economy', 'candor', 'nostalgia'], 0],
    ],
    '(i) One small detail that makes “the reader understand everything” is a **telling** detail. (ii) To convey a temper, the newspaper must be folded in a **furious** way. (iii) Saying much in few words, in contrast to a genre that “tends toward the exhaustive,” is **economy**.',
    [
      '“Extraneous” means irrelevant — the opposite of revealing; “lurid” (sensational) doesn’t fit a quiet domestic detail.',
      '“Absent-minded” and “leisurely” folding wouldn’t reveal a temper.',
      '“Candor” and “nostalgia” don’t contrast with “exhaustive.”',
    ],
  ),
  tc(
    3,
    'It is (i)_____ that the most widely read account of the expedition was written by a member who spent most of it ill in his tent, since his narrative is (ii)_____ vivid scenes that he could not have witnessed.',
    [
      [['ironic', 'fitting', 'unsurprising'], 0],
      [['full of', 'devoid of', 'critical of'], 0],
    ],
    '(i) An eyewitness account by someone who mostly saw his tent is **ironic**. (ii) The irony depends on the narrative being **full of** vivid scenes he couldn’t have seen.',
    [
      '“Fitting” and “unsurprising” miss the incongruity the “since” clause explains.',
      'If the narrative were “devoid of” such scenes, there would be nothing odd to explain; “critical of” scenes makes no sense here.',
    ],
  ),
  passage('ether', ether, [
    rc(
      2,
      'According to the passage, Crawford Long',
      [
        'used ether during surgery several years before Morton’s demonstration',
        'attended Morton’s demonstration in Boston',
        'published his results before Morton’s demonstration',
        'was a dentist rather than a physician',
        'opposed the use of ether in surgery',
      ],
      0,
      'Long “operated on patients under ether as early as 1842,” four years before 1846 (A). He published only in 1849, after Morton (not C); Morton was the dentist (D); (B) and (E) aren’t stated.',
    ),
    rc(
      3,
      'The author would most likely agree with which of the following statements?',
      [
        'Being the first to make a discovery is not enough to ensure that one receives credit for it.',
        'Long deserves more credit for anesthesia than Morton does.',
        'Morton knew of Long’s work and concealed it.',
        'Public demonstrations are an unreliable way to test medical techniques.',
        'Ether was more effective than the anesthetics that later replaced it.',
      ],
      0,
      'The author endorses the historians’ point that credit goes “not to whoever does something first” but to whoever makes it usable by others (A). The author explains why Morton got credit without saying Long deserves more (B); (C), (D), and (E) have no support.',
    ),
    rcSelect(
      3,
      'Select the sentence that explains why Morton’s demonstration, rather than Long’s earlier work, transformed surgical practice.',
      etherSentences,
      5,
      'The last sentence gives the reason: Long’s technique stayed in a country practice, while a public demonstration before physicians spread the method everywhere. The sentence before it states the general point about credit, but not why Morton’s work, in particular, changed surgery.',
    ),
  ]),
  se(
    2,
    'The historian’s _____ is evident on every page: she seems to have read every letter, ledger, and diary that survives from the period.',
    ['assiduousness', 'diligence', 'bias', 'wit', 'brevity', 'modesty'],
    [0, 1],
    'Reading every surviving document shows careful, persistent effort: **assiduousness**, **diligence**. The other words name qualities that reading everything doesn’t demonstrate.',
  ),
  se(
    3,
    'The minister’s apology was so _____ that it seemed less an admission of error than a list of reasons why no error had occurred.',
    ['hedged', 'qualified', 'heartfelt', 'abject', 'prompt', 'eloquent'],
    [0, 1],
    'An apology that mostly explains why nothing went wrong is loaded with reservations: **hedged**, **qualified**. “Heartfelt” and “abject” (utterly humble) are the opposite pair; “prompt” and “eloquent” don’t explain why it reads as a list of excuses.',
  ),
  se(
    3,
    'What makes the novel’s villain so disturbing is his _____: he commits terrible acts without any sign of excitement, anger, or regret.',
    ['impassivity', 'stolidity', 'cruelty', 'malice', 'volatility', 'charm'],
    [0, 1],
    'Showing no emotion at all is **impassivity** or **stolidity**. “Cruelty” and “malice” form a pair, but the colon explains his lack of feeling, not his wickedness; “volatility” is the opposite.',
  ),
  se(
    3,
    'The reviewer found the biography’s central thesis _____: nothing in the evidence it assembled seemed to require so sweeping a conclusion.',
    ['unjustified', 'gratuitous', 'compelling', 'persuasive', 'novel', 'modest'],
    [0, 1],
    'A sweeping conclusion that the evidence doesn’t call for is **unjustified**, **gratuitous** (without good reason). “Compelling” and “persuasive” are the opposite pair; “modest” contradicts “sweeping.”',
  ),
  passage('poe', poe, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'discussing the origins of the detective story and a reservation its originator expressed about the form',
        'comparing the detectives created by Poe and by Conan Doyle',
        'arguing that later detective fiction is superior to Poe’s stories',
        'explaining why Poe stopped writing detective stories',
        'describing how real police methods influenced detective fiction',
      ],
      0,
      'Paragraph one credits Poe with the genre’s conventions; paragraph two turns to Poe’s own ironic view of it and later writers’ response (A). Holmes appears only briefly (B); the passage doesn’t rank the fiction (C), explain Poe stopping (D), or discuss real police (E).',
    ),
    rc(
      3,
      'The author mentions that Conan Doyle had Holmes dismiss Dupin as “a very inferior fellow” most likely in order to',
      [
        'point out an irony in Doyle’s treatment of a predecessor whose influence he acknowledged',
        'show that Holmes was the more skillful detective',
        'suggest that Doyle had not read Poe’s stories',
        'explain why Dupin appeared in only a few stories',
        'support Poe’s low opinion of his own detective stories',
      ],
      0,
      'Doyle “acknowledged the debt — even as” his detective belittled Dupin: the phrasing highlights the irony (A). The author doesn’t judge the detectives (B); acknowledging a debt implies Doyle knew Poe’s work (not C); (D) and (E) aren’t connected to the remark.',
    ),
    rc(
      3,
      'It can be inferred that, according to the “view” described in the second paragraph, the detective’s reasoning in such a story is',
      [
        'less impressive than it seems, because the author arranged the puzzle to fit its solution',
        'the main source of the reader’s pleasure',
        'usually based on faulty logic',
        'modeled on the methods of real investigators',
        'too complicated for most readers to follow',
      ],
      0,
      'The author “has woven the web himself for the express purpose of unraveling it,” so the ingenuity “is less than it appears” (A). The view places the pleasure in the reader’s experience, “not in the detective’s reasoning” (not B); (C), (D), and (E) aren’t claimed.',
    ),
    rcMulti(
      3,
      'Which of the following does the passage present as conventions established by Poe’s 1841 story?',
      [
        'A narrator who is less perceptive than the detective',
        'A crime committed in a locked room',
        'Clues that allow the reader to solve the crime alongside the detective',
      ],
      [0, 1],
      'The list of conventions includes “the admiring, less perceptive companion who narrates” (A) and “the baffling crime in a locked room” (B). Playing fair by supplying every clue (C) is attributed to later writers answering Poe’s objection.',
    ),
  ]),
]);
