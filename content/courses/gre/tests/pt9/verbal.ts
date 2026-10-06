// Practice Test 9 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const sparrows = `White-crowned sparrows living only a few kilometers apart along the California coast sing noticeably different versions of their species’ song, much as human speech varies from region to region. In the 1960s the biologist Peter Marler showed that these dialects are learned. A young male hears the songs of the adults around him during a sensitive period early in life and later, when he begins to sing, gradually matches his own attempts to his memory of what he heard. Birds raised in isolation develop only a simplified, abnormal song, and birds deafened before they begin to sing produce even less structured sounds—evidence that a young bird must be able to hear his own voice in order to match it to the remembered model.`;

const talkies = `The arrival of synchronized sound in Hollywood was swift. The Jazz Singer, released in 1927 with a few scenes of synchronized singing and speech, was a sensation, and within about three years the major studios had nearly stopped making silent features. Popular memory, shaped partly by later films that satirized the period, holds that the transition destroyed the careers of silent stars whose voices failed to suit the microphone.

Film historians have complicated this picture. Some stars whose careers faded after 1929 were already declining in popularity; others were casualties of expiring contracts and studio politics rather than of their voices; and many silent performers, among them Greta Garbo, made the move to sound with great success. The coming of sound did reshape the industry—it favored actors with stage training and, for a time, imposed a static style on filmmaking, since early microphones required actors to stay close to them—but the fate of individual stars had many causes.`;

export const V1 = section(9, 'v1', [
  tc(
    2,
    'The new museum has been criticized as _____, its sweeping marble staircases and vast entrance halls better suited to impressing visitors than to displaying art.',
    [[['grandiose', 'modest', 'functional', 'unfinished', 'derivative'], 0]],
    'A building built to impress rather than to serve its purpose is **grandiose** (pretentiously grand). “Modest” and “functional” are the opposite of the criticism; “derivative” is about originality.',
  ),
  tc(
    2,
    'Although the island’s ecosystem appears (i)_____, it is in fact extraordinarily fragile: the arrival of a single predator a century ago was enough to (ii)_____ three native bird species.',
    [
      [['robust', 'barren', 'recent'], 0],
      [['wipe out', 'protect', 'reveal'], 0],
    ],
    '(i) “Although … in fact extraordinarily fragile” needs the opposite: it looks **robust**. (ii) The colon proves fragility — one predator was enough to **wipe out** three species.',
    [
      '“Barren” doesn’t contrast with fragile; “recent” is irrelevant.',
      'A predator that “protects” or “reveals” species wouldn’t demonstrate fragility.',
    ],
  ),
  tc(
    3,
    'Much early writing about the region was (i)_____, the work of travelers who stayed a few weeks and generalized freely from whatever they happened to see. The (ii)_____ accounts of long-term residents, by contrast, tend to resist sweeping claims, (iii)_____ nearly every observation with qualifications about time and place.',
    [
      [['superficial', 'meticulous', 'scholarly'], 0],
      [['circumspect', 'breezy', 'sensational'], 0],
      [['hedging', 'embellishing', 'dismissing'], 0],
    ],
    '(i) Travelers who stayed a few weeks and “generalized freely” wrote **superficial** accounts. (ii) “By contrast,” residents are cautious: **circumspect**. (iii) Attaching qualifications to observations is **hedging** them.',
    [
      '“Meticulous” and “scholarly” contradict generalizing freely from a few weeks’ glimpses.',
      '“Breezy” and “sensational” describe the travelers’ style, not the contrast.',
      '“Embellishing” adds ornament, not qualifications; “dismissing” observations isn’t qualifying them.',
    ],
  ),
  passage('sparrows', sparrows, [
    rc(
      2,
      'According to the passage, white-crowned sparrows raised in isolation',
      [
        'develop a simplified and abnormal song',
        'sing the dialect of the region where they hatched',
        'produce no sounds of any kind at all',
        'learn their song later than other sparrows',
        'imitate the songs of other species',
      ],
      0,
      'The passage says so directly: birds raised in isolation “develop only a simplified, abnormal song” (A). They can’t learn a local dialect without hearing it (B); deafened birds, not isolated ones, produce the least structured sounds, and even they make some (C).',
    ),
    rc(
      3,
      'The passage suggests that deafening a young sparrow before it begins to sing disrupts its song mainly because the bird',
      [
        'cannot compare its own singing with the song it remembers',
        'forgets the songs that it heard during the sensitive period',
        'can no longer hear adult birds singing nearby',
        'is kept apart from other birds of its species',
        'learns the song dialect of a different region',
      ],
      0,
      'The passage calls the deafening result “evidence that a young bird must be able to hear his own voice in order to match it to the remembered model” (A). The bird already heard the adults before it was deafened, so (B) and (C) miss the point; (D) describes isolation, not deafening.',
    ),
  ]),
  se(
    1,
    'The puppy was so _____ that it chewed through two leashes and a sofa cushion in its first week home.',
    ['mischievous', 'unruly', 'sleepy', 'obedient', 'tiny', 'timid'],
    [0, 1],
    'Chewing through leashes and furniture is badly behaved: **mischievous**, **unruly**. “Obedient” is the opposite; “sleepy” and “timid” don’t fit the destruction.',
  ),
  se(
    2,
    'The scholar’s argument, though _____, rests on a single ambiguous letter and collapses if that letter is read differently.',
    ['ingenious', 'clever', 'tedious', 'obvious', 'sound', 'popular'],
    [0, 1],
    '“Though” concedes a strength before the weakness: the argument is **ingenious**, **clever**. “Sound” is the trap — an argument that collapses on one alternative reading isn’t sound, so there would be no contrast.',
  ),
  se(
    2,
    'Residents have grown _____ about the city’s promises to repair the bridge, having heard the same assurances every year for a decade.',
    ['cynical', 'jaded', 'hopeful', 'optimistic', 'angry', 'informed'],
    [0, 1],
    'A decade of broken promises leaves people distrustful and weary: **cynical**, **jaded**. “Hopeful” and “optimistic” are the opposite pair; “angry” has no partner.',
  ),
  se(
    3,
    'The ambassador was known for her _____: in a profession that prizes tact, she was notorious for saying exactly what she thought, however it might be received.',
    ['brusqueness', 'bluntness', 'discretion', 'diplomacy', 'erudition', 'reticence'],
    [0, 1],
    'Saying exactly what she thought, without the tact her profession values, is **brusqueness**, **bluntness**. “Discretion” and “diplomacy” are the tact she lacked; “reticence” is the opposite of speaking her mind.',
  ),
  passage('talkies', talkies, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'qualify a popular belief about how sound affected silent-film performers',
        'explain how synchronized sound for films was first invented',
        'argue that silent films were artistically superior to early sound films',
        'describe the plot of The Jazz Singer and how audiences received it',
        'show that studio politics brought Greta Garbo’s career to an end',
      ],
      0,
      'The first paragraph gives the popular belief — sound destroyed silent stars — and the second shows historians complicating it (A). The passage doesn’t explain the invention (B), rank the films (C), or summarize a plot (D); Garbo succeeded (E).',
    ),
    rc(
      3,
      'The author mentions Greta Garbo in order to',
      [
        'give an example of a silent star whose career survived the coming of sound',
        'illustrate how studio politics ended the careers of some silent stars',
        'show that stage training was essential for actors in early sound films',
        'identify one of the stars who were satirized in later films about the era',
        'explain why the studios stopped making silent feature films altogether',
      ],
      0,
      'She appears in the list of “silent performers” who “made the move to sound with great success” (A) — a counterexample to the popular belief. Nothing links her to studio politics (B), stage training (C), or satire (D).',
    ),
    rcMulti(
      3,
      'According to the passage, which of the following contributed to the decline of some silent stars’ careers after 1929?',
      [
        'A drop in popularity that had begun before the coming of sound',
        'Expiring contracts and studio politics',
        'The major studios’ refusal to adopt synchronized sound',
      ],
      [0, 1],
      'Some stars “were already declining in popularity” (A); others “were casualties of expiring contracts and studio politics” (B). The studios adopted sound quickly — within three years they had nearly stopped making silents — so C contradicts the passage.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const lorenz = `In 1961 the meteorologist Edward Lorenz was running a simple computer model of the weather when he decided to repeat part of a simulation. To save time, he restarted the run from the middle, typing in numbers from an earlier printout. The printout, however, had rounded the numbers to three decimal places, while the computer stored six. Lorenz expected the tiny difference to have a tiny effect. Instead, the new run tracked the old one for a while and then diverged until the two bore no resemblance to each other. The model was entirely deterministic—the same inputs always produced the same outputs—yet it was unpredictable in practice over long periods, because no measurement of its starting state could ever be exact enough. Lorenz later popularized the idea with a question: could the flap of a butterfly’s wings in Brazil set off a tornado in Texas?`;

const dunmore = `Last year, 60 percent of the traffic accidents in the city of Dunmore involved drivers who had been driving for more than ten years, while only 10 percent involved drivers with less than two years of experience. A newspaper columnist concludes that, contrary to popular belief, experienced drivers are more dangerous than new ones.`;

const dust = `During the 1930s, a series of severe droughts struck the southern Great Plains of the United States, and enormous dust storms carried away millions of tons of topsoil. Drought alone did not cause the disaster. In the preceding decades, high wheat prices and new tractors had encouraged farmers to plow up millions of acres of native grassland, whose deep-rooted grasses had held the soil in place through earlier dry spells. When the rains failed, the exposed soil simply blew away. The federal government responded in 1935 by creating the Soil Conservation Service, which encouraged farmers—often by paying them—to adopt practices such as plowing along the contours of the land, planting rows of trees as windbreaks, and returning some fields to grass.`;

export const V2E = section(9, 'v2e', [
  tc(
    1,
    'Although the forecast had promised sunshine, the afternoon turned out to be cold and _____.',
    [[['rainy', 'pleasant', 'warm', 'bright', 'calm'], 0]],
    '“Although” sets the actual weather against the promised sunshine: **rainy**. “Pleasant,” “warm,” and “bright” agree with sunshine; “calm” isn’t its opposite.',
  ),
  tc(
    1,
    'The candidate’s closing speech was so _____ that even her opponents admitted it had been the most moving of the campaign.',
    [[['stirring', 'tedious', 'brief', 'technical', 'awkward'], 0]],
    'A speech that even opponents call the most moving of the campaign was **stirring** (rousing strong feeling). “Tedious,” “technical,” and “awkward” speeches wouldn’t move anyone; “brief” says nothing about its effect.',
  ),
  tc(
    2,
    'The company’s profits, which had (i)_____ for three straight years, suddenly recovered last spring, a (ii)_____ that analysts attribute to a single popular new product.',
    [
      [['declined', 'soared', 'stabilized'], 0],
      [['reversal', 'continuation', 'disaster'], 0],
    ],
    '(i) Profits can “recover” only after falling: they had **declined**. (ii) Falling and then recovering is a **reversal**.',
    [
      '“Soared” and “stabilized” leave nothing to recover from.',
      'A recovery after three years of decline isn’t a “continuation,” and it’s good news, not a “disaster.”',
    ],
  ),
  tc(
    2,
    'The garden’s designer wanted it to look (i)_____, as if no one had planned it at all. Achieving this effect, ironically, required (ii)_____ planning: every “wild” corner was in fact (iii)_____ arranged.',
    [
      [['natural', 'formal', 'symmetrical'], 0],
      [['meticulous', 'little', 'hasty'], 0],
      [['deliberately', 'randomly', 'poorly'], 0],
    ],
    '(i) Looking as if no one planned it is looking **natural**. (ii) The irony is that looking unplanned took **meticulous** planning. (iii) The “wild” corners were **deliberately** arranged.',
    [
      '“Formal” and “symmetrical” gardens look planned — the opposite of the goal.',
      '“Little” or “hasty” planning would remove the irony the sentence announces.',
      '“Randomly” and “poorly” contradict the careful planning just described.',
    ],
  ),
  passage('lorenz', lorenz, [
    rc(
      1,
      'According to the passage, the two runs of Lorenz’s model diverged because',
      [
        'the second run began from numbers that were slightly rounded',
        'the computer made an arithmetic error during the second run',
        'Lorenz changed the equations of the model between the runs',
        'the model included some random elements in its equations',
        'the second run used real weather data instead of test values',
      ],
      0,
      'Lorenz restarted from a printout that had rounded six-decimal numbers to three (A). The model was “entirely deterministic,” so there was no randomness (D); nothing suggests a computer error (B), changed equations (C), or new data (E).',
    ),
    rc(
      2,
      'It can be inferred that Lorenz found the result surprising because he had assumed that',
      [
        'a tiny change in the starting values would make only a tiny difference',
        'his computer stored the numbers to only three decimal places internally',
        'the weather could never be modeled accurately by any computer',
        'the two runs would diverge from each other as soon as they started',
        'butterflies could influence the weather in distant parts of the world',
      ],
      0,
      '“Lorenz expected the tiny difference to have a tiny effect” (A). The computer stored six places (not B); he was running a weather model, so he didn’t think (C); (D) and (E) aren’t his assumptions.',
    ),
    rc(
      2,
      'The author describes the model as “entirely deterministic” in order to emphasize that',
      [
        'its unpredictability did not come from randomness in the model itself',
        'it could predict the weather accurately for long periods',
        'Lorenz had deliberately designed it to behave in unpredictable ways',
        'its outputs never depended in any way on the inputs it was given',
        'it was far more complicated than the real weather it simulated',
      ],
      0,
      'The point is the paradox: the same inputs always gave the same outputs, “yet it was unpredictable in practice” — so the unpredictability came from sensitivity to starting values, not chance (A). (B) contradicts the passage; (D) contradicts “deterministic.”',
    ),
  ]),
  se(
    1,
    'The old map was so _____ that several of the roads it showed no longer existed.',
    ['outdated', 'obsolete', 'accurate', 'detailed', 'colorful', 'enormous'],
    [0, 1],
    'A map showing roads that no longer exist is out of date: **outdated**, **obsolete**. “Accurate” is the opposite; “detailed” and “colorful” don’t explain the missing roads.',
  ),
  se(
    1,
    'The athlete’s comeback after a serious injury was _____, surprising even her own coaches.',
    ['remarkable', 'extraordinary', 'predictable', 'routine', 'brief', 'painful'],
    [0, 1],
    'A comeback that surprised her own coaches was **remarkable**, **extraordinary**. “Predictable” and “routine” are the opposite pair.',
  ),
  se(
    2,
    'The negotiations were so _____ that each side accused the other of stalling: after eight months, not a single clause had been agreed.',
    ['interminable', 'drawn-out', 'productive', 'brief', 'secret', 'cordial'],
    [0, 1],
    'Eight months without agreeing to a single clause is a long, slow process: **interminable**, **drawn-out**. “Productive” and “brief” contradict the colon; “secret” and “cordial” don’t explain the accusations of stalling.',
  ),
  se(
    2,
    'Voters found the candidate’s _____ refreshing: he admitted his mistakes openly and never pretended to know more than he did.',
    ['candor', 'frankness', 'guile', 'evasiveness', 'wealth', 'ambition'],
    [0, 1],
    'Admitting mistakes openly is **candor**, **frankness**. “Guile” and “evasiveness” are the opposite; “wealth” and “ambition” aren’t described by the colon.',
  ),
  argument(
    'dunmore',
    dunmore,
    rc(
      2,
      'Which of the following, if true, most seriously weakens the columnist’s conclusion?',
      [
        'About 80 percent of the drivers on Dunmore’s roads have driven for more than ten years.',
        'Most of the accidents in Dunmore occur during the morning and evening rush hours.',
        'New drivers in Dunmore must pass both a written test and a road test before driving.',
        'The number of traffic accidents in Dunmore was lower last year than the year before.',
        'Accidents that involve new drivers are more likely than others to cause injuries.',
      ],
      0,
      'The columnist compares shares of accidents without asking how many drivers are in each group. If experienced drivers are 80% of all drivers but have only 60% of accidents, they have fewer accidents per driver than average (A). (E) is about severity, not frequency; the others don’t bear on which group is riskier.',
    ),
  ),
  passage('dust', dust, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'explaining the causes of the Dust Bowl and one response to it',
        'describing the daily lives of Plains farmers in the 1930s',
        'arguing that drought was the only cause of the dust storms',
        'comparing farming practices in different regions of the country',
        'explaining how the tractors used on the Plains were invented',
      ],
      0,
      'The passage explains how drought and plowed-up grassland together caused the disaster, then describes the Soil Conservation Service (A). It explicitly denies (C); (B), (D), and (E) aren’t its subject.',
    ),
    rc(
      2,
      'According to the passage, native grasses had helped the Plains withstand earlier droughts because',
      [
        'their deep roots held the soil in place',
        'they needed less water than wheat',
        'they were planted in rows as windbreaks',
        'they fed the cattle that farmers depended on',
        'they sold for high prices at market',
      ],
      0,
      'The grasses were “deep-rooted” and “had held the soil in place through earlier dry spells” (A). Tree rows were windbreaks (C); the other choices aren’t stated.',
    ),
    rc(
      2,
      'The statement that “drought alone did not cause the disaster” serves primarily to',
      [
        'introduce the role farming practices played in the disaster',
        'deny that there was a real drought on the Plains in the 1930s',
        'suggest that the dust storms have been exaggerated by historians',
        'criticize the work of the Soil Conservation Service',
        'explain why wheat prices were high during the period',
      ],
      0,
      'The next sentences explain the other cause: plowing up the grassland that had anchored the soil (A). The drought did happen (B); nothing minimizes the storms (C) or criticizes the agency (D).',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const hurstonSentences = [
  'Zora Neale Hurston is now best known as a novelist, but she was also a trained anthropologist.',
  'After studying at Barnard College under Franz Boas, she spent years in the 1920s and 1930s collecting folktales, songs, and sayings in the rural South and the Caribbean, publishing the results in books such as Mules and Men (1935).',
  'Her fieldwork shaped her fiction.',
  'The dialogue of Their Eyes Were Watching God (1937) draws on the speech she had spent years recording, and she treated that speech not as a quaint departure from standard English but as a language capable of wit, argument, and poetry.',
  'Some of her contemporaries objected.',
  'The novelist Richard Wright complained that the book lacked a serious purpose and that its dialect played to the expectations of white readers, and by the time of her death in 1960 her books were largely out of print.',
  'Their revival began in the 1970s, when a new generation of writers, notably Alice Walker, championed the very qualities that Wright had found wanting.',
];
const hurston = hurstonSentences.join(' ');

const longitude = `For centuries, sailors could find their latitude by measuring the height of the sun or the pole star, but longitude—their east–west position—was far harder to determine. Because the earth turns fifteen degrees every hour, a navigator who knew the time at a reference port could compute longitude by comparing it with local time, which the sun revealed. The difficulty was keeping the reference time at sea, where pendulum clocks were useless. In 1714 the British Parliament offered a prize of up to £20,000 for a practical method.

The popular version of what followed is a tale of lone genius: John Harrison, a self-taught clockmaker, built a series of marine timekeepers, the fourth of which kept time to within seconds on a voyage to Jamaica in 1761–62, only to be denied his reward by an establishment of astronomers who favored their own method. There is truth in this; Harrison was treated shabbily, and he received the balance of his reward only after appealing to Parliament and the king. But the astronomers’ rival method, which found the time by measuring the moon’s position against the stars and consulting published tables, was not a mere prejudice. It required no costly instrument beyond a sextant and a book of tables, and for decades, while chronometers remained rare and expensive, it was the method most navigators actually used. Harrison’s solution eventually prevailed, but only when chronometers could be manufactured cheaply enough to put one on every ship.`;

export const V2H = section(9, 'v2h', [
  tc(
    2,
    'Far from _____ the controversy, the senator’s clarification only added to the confusion, since it contradicted both of her earlier statements.',
    [[['dispelling', 'fueling', 'reporting', 'predicting', 'initiating'], 0]],
    '“Far from ___ … only added to the confusion” needs the opposite of adding confusion: **dispelling** (clearing away) the controversy. “Fueling” is what the clarification actually did.',
  ),
  tc(
    3,
    'Though the naturalist’s field notes are (i)_____, crowded with abbreviations and private shorthand, they are also remarkably (ii)_____: nearly every observation he recorded has been confirmed by later researchers.',
    [
      [['cryptic', 'eloquent', 'sparse'], 0],
      [['reliable', 'charming', 'vague'], 0],
    ],
    '(i) Notes full of abbreviations and private shorthand are hard to decipher: **cryptic**. (ii) Observations confirmed by later researchers make the notes **reliable**.',
    [
      '“Eloquent” clashes with shorthand; “sparse” contradicts “crowded.”',
      'Confirmation by later researchers shows accuracy, not charm; “vague” contradicts it.',
    ],
  ),
  tc(
    3,
    'The committee’s recommendations were less (i)_____ than their critics claimed: rather than overturning the existing system, they proposed modest adjustments, most of which had already been (ii)_____ by the agencies concerned. What made them seem radical was not their substance but the (iii)_____ language in which they were announced.',
    [
      [['sweeping', 'modest', 'popular'], 0],
      [['anticipated', 'rejected', 'misunderstood'], 0],
      [['strident', 'muted', 'technical'], 0],
    ],
    '(i) Critics called the recommendations radical; in fact they were less **sweeping**. (ii) Adjustments the agencies had already been planning were **anticipated** by them. (iii) What made mild proposals seem radical was **strident** (harsh, loud) language.',
    [
      '“Modest” is what they actually were — “less modest than claimed” reverses the point; “popular” isn’t what critics exaggerated.',
      '“Rejected” and “misunderstood” don’t support the claim that the proposals were modest.',
      '“Muted” language would make them seem tamer, not radical; “technical” language doesn’t make proposals sound radical.',
    ],
  ),
  tc(
    3,
    'The biographer is careful not to (i)_____ her subject’s failures, yet she is equally careful not to let them (ii)_____ his achievements, which were, after all, the reason anyone remembers him.',
    [
      [['gloss over', 'dwell on', 'invent'], 0],
      [['overshadow', 'explain', 'inspire'], 0],
    ],
    '(i) A careful biographer doesn’t hide the failures — she doesn’t **gloss over** them. (ii) “Yet … equally careful” balances this: she doesn’t let the failures **overshadow** the achievements.',
    [
      '“Dwell on” is the opposite error, which the second half addresses; “invent” makes no sense with real failures.',
      'Letting failures “explain” or “inspire” achievements isn’t something to be careful to avoid.',
    ],
  ),
  passage('hurston', hurston, [
    rc(
      2,
      'According to the passage, Hurston’s anthropological work influenced her fiction by',
      [
        'supplying the speech on which the dialogue of her novel drew',
        'persuading her to write about the Caribbean rather than the South',
        'leading her to abandon folklore for realistic fiction',
        'teaching her to write for an academic audience',
        'introducing her to the novelist Richard Wright',
      ],
      0,
      'The novel’s dialogue “draws on the speech she had spent years recording” (A). The passage doesn’t mention (B), (D), or (E), and her fiction used the folk speech rather than abandoning it (C).',
    ),
    rc(
      3,
      'It can be inferred that the writers mentioned in the last sentence valued Hurston’s work in part for',
      [
        'its treatment of rural Southern speech as rich and expressive',
        'its explicit protest against racial injustice in the South',
        'its careful avoidance of dialect in its characters’ dialogue',
        'its reliance on standard written English rather than dialect',
        'its focus on life in large Northern cities like New York',
      ],
      0,
      'They “championed the very qualities that Wright had found wanting” — among them the dialect he criticized, which Hurston treated as “a language capable of wit, argument, and poetry” (A). Wright faulted the book for lacking a serious purpose, so (B) is what it lacked; (C) and (D) contradict the passage.',
    ),
    rcSelect(
      3,
      'Select the sentence that describes how Hurston regarded the language of the people whose speech she recorded.',
      hurstonSentences,
      3,
      'The fourth sentence states her view: she treated the speech “not as a quaint departure from standard English but as a language capable of wit, argument, and poetry.” The second sentence describes collecting it but not how she regarded it.',
    ),
  ]),
  se(
    2,
    'The report’s conclusions were so _____ that even the agency’s harshest critics could find little to dispute.',
    ['incontrovertible', 'unassailable', 'tentative', 'contentious', 'lengthy', 'belated'],
    [0, 1],
    'Conclusions that even harsh critics can’t dispute are **incontrovertible**, **unassailable**. “Tentative” and “contentious” would invite dispute.',
  ),
  se(
    3,
    'The playwright’s dialogue is deliberately _____: characters talk past one another, abandon sentences halfway, and answer questions that no one has asked.',
    ['disjointed', 'fragmented', 'eloquent', 'polished', 'archaic', 'lyrical'],
    [0, 1],
    'Talk that breaks off, misses its target, and doesn’t connect is **disjointed**, **fragmented**. “Eloquent” and “polished” form the opposite pair; “archaic” and “lyrical” don’t match the description.',
  ),
  se(
    3,
    'Though critics routinely praise the treatise for its _____, much of it is in fact borrowed, sometimes word for word, from earlier writers whom its author never credits.',
    ['originality', 'novelty', 'erudition', 'clarity', 'brevity', 'derivativeness'],
    [0, 1],
    '“Though … borrowed … from earlier writers” contrasts with praise for being new: **originality**, **novelty**. “Erudition” (learning) is the trap — borrowing from many writers is compatible with erudition, so it wouldn’t set up a contrast; “derivativeness” is what the book actually shows.',
  ),
  se(
    2,
    'The mountain village, long _____ from the outside world by its lack of roads, has changed more in the past decade than in the preceding century.',
    ['insulated', 'isolated', 'visible', 'connected', 'governed', 'exhausted'],
    [0, 1],
    'Having no roads kept the village cut off: **insulated**, **isolated**. “Connected” is the opposite; “visible” and “governed” don’t follow from lacking roads.',
  ),
  passage('longitude', longitude, [
    rc(
      2,
      'The passage is primarily concerned with',
      [
        'complicating a popular account of how the longitude problem was solved',
        'explaining how sailors measured latitude using the sun and stars',
        'describing the design of Harrison’s timekeepers in technical detail',
        'arguing that the astronomers deliberately cheated Harrison of his prize',
        'tracing the history of pendulum clocks from their invention onward',
      ],
      0,
      'After explaining the problem, the author presents the “popular version” — lone genius versus establishment — and then adds what it leaves out: the real merits of the lunar method (A). Latitude is background (B); the timekeepers’ design isn’t described (C); the author grants that Harrison was treated shabbily but calls the rival method more than prejudice (D).',
    ),
    rc(
      3,
      'According to the passage, knowing the time at a reference port allowed a navigator to find longitude because',
      [
        'the gap between that time and local time shows how far east or west the ship is',
        'the reference time showed how high the pole star stood above the horizon',
        'the moon’s position in the sky depends only on the time at the reference port',
        'local time at sea cannot be found by observing the position of the sun',
        'pendulum clocks kept the reference time accurately even on a rolling ship',
      ],
      0,
      'The earth turns fifteen degrees an hour, so comparing reference time with local time (read from the sun) gives the east–west offset (A). The sun does reveal local time (not D), and pendulum clocks were useless at sea (not E).',
    ),
    rc(
      3,
      'The author’s attitude toward the “popular version” of the story is best described as',
      [
        'partial acceptance: it holds truth but overlooks a rival method’s merits',
        'complete endorsement of its view of the astronomers as villains',
        'outright rejection of its claim that Harrison was treated unfairly by them',
        'indifference to whether or not the story is historically accurate',
        'amusement at the story’s many exaggerations and inventions',
      ],
      0,
      '“There is truth in this; Harrison was treated shabbily” — but the rival method “was not a mere prejudice” (A). The author accepts part of the story, which rules out (B) and (C), and cares about its accuracy (not D).',
    ),
    rcMulti(
      3,
      'According to the passage, which of the following were true of the astronomers’ method in the decades after Harrison’s voyage?',
      [
        'It did not require an expensive timekeeper.',
        'It needed only a sextant and a book of published tables.',
        'It was more accurate than Harrison’s timekeeper.',
      ],
      [0, 1],
      'The lunar method “required no costly instrument beyond a sextant and a book of tables” (A, B), which is why most navigators used it while chronometers were expensive. The passage never compares its accuracy with Harrison’s (C).',
    ),
  ]),
]);
