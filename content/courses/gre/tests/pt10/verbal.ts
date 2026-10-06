// Practice Test 10 — Verbal Reasoning.

import { argument, passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const anning = `Mary Anning (1799–1847) spent her life collecting fossils from the crumbling cliffs near Lyme Regis on the southern coast of England. Her finds included the first ichthyosaur skeleton to be correctly identified, the first nearly complete skeleton of a plesiosaur, and the first pterosaur found in Britain—specimens that helped persuade scientists that many species had become extinct. Yet Anning, a working-class woman, could not join the Geological Society of London, which did not admit women until 1919, and the gentlemen who bought her specimens often described them in print without mentioning who had found them. Some who knew her work privately acknowledged that she understood fossils better than many of the scientists who profited from her finds.`;

const containers = `In April 1956 a converted oil tanker, the Ideal-X, sailed from Newark to Houston carrying fifty-eight metal truck trailers. The voyage, organized by the trucking entrepreneur Malcom McLean, is usually taken as the beginning of container shipping. Before containers, cargo was loaded and unloaded piece by piece: longshoremen carried sacks, barrels, and crates on and off ships by hand, and a vessel could spend nearly as long in port as at sea. By packing goods into standard boxes that could be lifted directly from trucks or trains onto ships, containerization drastically cut the cost of loading cargo and made shipping far more predictable.

The benefits were slow to arrive, however. Containers were useful only if ports, ships, trucks, and railroads all adopted compatible equipment, and in the early years rival companies used boxes of different sizes. Not until international standards for container dimensions were agreed on in the late 1960s did the system begin to spread rapidly. Its costs fell unevenly, too: old waterfront districts, built for handling loose cargo, lost their trade to new container terminals, and employment of longshoremen fell steeply.`;

export const V1 = section(10, 'v1', [
  tc(
    2,
    'The scientist’s memoir is refreshingly _____: rather than presenting her career as a march from triumph to triumph, she dwells on her mistakes and on the dead ends she pursued for years.',
    [[['unvarnished', 'triumphal', 'technical', 'sentimental', 'brief'], 0]],
    'Dwelling on mistakes instead of polishing the story is **unvarnished** (plain, not prettified) — and that is why it is “refreshing.” “Triumphal” is exactly what the memoir avoids.',
  ),
  tc(
    2,
    'Though the town’s founders imagined it as a (i)_____ community of small farmers, its economy was from the start (ii)_____ on a single mill that employed nearly half its residents.',
    [
      [['self-sufficient', 'industrial', 'transient'], 0],
      [['dependent', 'independent', 'modeled'], 0],
    ],
    '(i) “Though” sets the founders’ vision against reality; a community of small farmers relying on no one else is **self-sufficient**. (ii) The reality: the economy was **dependent** on one mill.',
    [
      'An “industrial” vision would match the mill instead of contrasting with it; “transient” doesn’t fit a farming community.',
      '“Independent” reverses the point; an economy “modeled on” a mill makes little sense.',
    ],
  ),
  tc(
    3,
    'The historian’s thesis—that the empire fell less from external conquest than from internal (i)_____—is hardly new. What is (ii)_____ is the evidence she marshals, drawn from tax records that earlier scholars had (iii)_____ as too fragmentary to be useful.',
    [
      [['decay', 'expansion', 'reform'], 0],
      [['novel', 'familiar', 'questionable'], 0],
      [['dismissed', 'celebrated', 'forged'], 0],
    ],
    '(i) The alternative to conquest as a cause of the fall is internal **decay**. (ii) “Hardly new … What is ___” sets up a contrast: the evidence is **novel**. (iii) Records thought “too fragmentary to be useful” had been **dismissed**.',
    [
      '“Expansion” and “reform” aren’t causes of a fall set against conquest.',
      '“Familiar” repeats “hardly new” instead of contrasting; “questionable” isn’t supported.',
      'Records considered useless weren’t “celebrated,” and nothing suggests they were “forged.”',
    ],
  ),
  passage('anning', anning, [
    rc(
      2,
      'The passage suggests that Anning’s discoveries were scientifically important in part because they',
      [
        'helped convince scientists that many species had become extinct',
        'were the first fossils ever found in England',
        'led the Geological Society to admit women',
        'showed that ichthyosaurs and plesiosaurs were the same animal',
        'were described in print by Anning herself',
      ],
      0,
      'Her specimens “helped persuade scientists that many species had become extinct” (A). The Society admitted women only in 1919, long after her death (C); others described her finds, often without credit (E); (B) and (D) aren’t claimed.',
    ),
    rc(
      3,
      'The author mentions that Anning “could not join the Geological Society of London” primarily in order to',
      [
        'illustrate the obstacles that limited recognition of her work',
        'explain why she stopped collecting fossils',
        'suggest that the Society did not value fossils',
        'show that she was not interested in scientific debate',
        'contrast her career with that of her male competitors in Lyme Regis',
      ],
      0,
      'The sentence begins “Yet” and pairs her exclusion with scientists publishing her finds without credit — both barriers to recognition (A). Nothing says she stopped collecting (B) or lacked interest (D); the Society’s exclusion concerned women, not fossils (C).',
    ),
  ]),
  se(
    1,
    'The hikers were _____ after the long climb and rested for an hour before starting back down.',
    ['exhausted', 'weary', 'energetic', 'lost', 'hungry', 'cheerful'],
    [0, 1],
    'Needing an hour’s rest after a long climb means they were tired: **exhausted**, **weary**. “Energetic” is the opposite; “hungry” may be true but has no partner.',
  ),
  se(
    2,
    'The committee’s response to the proposal was _____: its members neither endorsed nor rejected it, and no one asked a single question.',
    ['apathetic', 'indifferent', 'hostile', 'enthusiastic', 'hasty', 'formal'],
    [0, 1],
    'Neither backing nor opposing a proposal, and not even asking about it, shows a lack of interest: **apathetic**, **indifferent**. “Hostile” and “enthusiastic” would each produce a reaction.',
  ),
  se(
    2,
    'Long regarded as _____, the neighborhood has in recent years become one of the most fashionable in the city.',
    ['unglamorous', 'dowdy', 'trendy', 'exclusive', 'historic', 'crowded'],
    [0, 1],
    '“Long regarded as ___” contrasts with “most fashionable”: the neighborhood used to be **unglamorous**, **dowdy**. “Trendy” and “exclusive” describe what it has become.',
  ),
  se(
    3,
    'The official’s _____ reply—a single word, delivered without looking up from his desk—made it clear that the interview was over.',
    ['clipped', 'abrupt', 'effusive', 'long-winded', 'apologetic', 'evasive'],
    [0, 1],
    'A one-word answer given without looking up is short and sharp to the point of rudeness: **clipped**, **abrupt**. “Effusive” and “long-winded” are the opposite; “evasive” doesn’t match a reply that makes things perfectly clear.',
  ),
  passage('containers', containers, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'describe the origins, benefits, and uneven effects of containers',
        'argue that containerization harmed the shipping industry',
        'explain how McLean built his trucking business before shipping',
        'compare shipping in the United States with shipping in other countries',
        'defend the work practices of the longshoremen who lost jobs',
      ],
      0,
      'Paragraph one covers the first voyage and the savings; paragraph two covers the slow spread and the unequal costs (A). The passage calls the benefits real, so (B) overstates; McLean’s business (C) and other countries (D) aren’t discussed.',
    ),
    rc(
      3,
      'According to the passage, the spread of container shipping was delayed because',
      [
        'different companies’ equipment was not compatible at first',
        'longshoremen refused to handle containers at most ports',
        'the Ideal-X’s first voyage was unsuccessful and costly',
        'loading containers cost more than loading loose cargo',
        'container ships could not travel between Newark and Houston',
      ],
      0,
      'Containers helped only if everyone used compatible equipment, and early on “rival companies used boxes of different sizes” — standards came only in the late 1960s (A). Containers cut loading costs (not D); the passage doesn’t say the voyage failed (C).',
    ),
    rcMulti(
      3,
      'The passage indicates that which of the following resulted from containerization?',
      [
        'A reduction in the cost of loading cargo',
        'A decline in the employment of longshoremen',
        'An increase in the time ships spent in port',
      ],
      [0, 1],
      'Containerization “drastically cut the cost of loading cargo” (A), and “employment of longshoremen fell steeply” (B). Before containers, ships spent long periods in port; containers shortened that time, so C is backwards.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const heat = `On a summer evening, the center of a large city can be several degrees warmer than the countryside around it. This “urban heat island” has several causes. Dark roofs and pavement absorb sunlight during the day and release the heat slowly after dark; tall buildings trap warm air and block breezes; and cities have fewer trees and plants, which cool their surroundings as water evaporates from their leaves. Heat from cars, air conditioners, and factories adds to the effect. The difference matters most during heat waves, when high nighttime temperatures give people no chance to recover from the heat of the day. Many cities are now trying to reduce the effect by planting trees and by encouraging roofs made of light-colored materials that reflect sunlight rather than absorb it.`;

const hillcrest = `A study of Hillcrest’s two high schools found that students at Northside, where classes begin at 8:30 a.m., had higher average test scores than students at Southside, where classes begin at 7:30 a.m. The school board concludes that the later start time improves students’ academic performance and plans to move Southside’s start time to 8:30 a.m.`;

const murano = `In 1291 the government of Venice ordered the city’s glassmakers to move their furnaces to the nearby island of Murano. The official reason was the risk of fire in a crowded city built largely of wood, but the move also made it easier to guard the industry’s secrets. Venetian glass—clear, thin, and elaborately worked—was prized across Europe, and the Republic went to great lengths to keep its methods at home: skilled glassworkers were forbidden to leave, and those who did could face severe penalties. These measures were never entirely successful. Glassworkers who slipped away found eager employers abroad, and by the sixteenth century glass in the Venetian style was being made in several other countries. In the 1660s the French government even recruited Venetian craftsmen to help found a mirror-making works in Paris, breaking Venice’s hold on one of its most profitable products.`;

export const V2E = section(10, 'v2e', [
  tc(
    1,
    'The small café is always _____ at lunchtime, with customers lined up out the door.',
    [[['crowded', 'empty', 'closed', 'silent', 'cheap'], 0]],
    'Customers lined up out the door means the café is **crowded**. “Empty,” “closed,” and “silent” contradict the line.',
  ),
  tc(
    1,
    'The treatment’s side effects were so _____ that most patients hardly noticed them.',
    [[['mild', 'severe', 'frequent', 'expensive', 'lasting'], 0]],
    'Side effects patients “hardly noticed” were **mild**. “Severe,” “frequent,” and “lasting” effects would be noticed.',
  ),
  tc(
    2,
    'The mayor promised that the new tax would be (i)_____, lasting only until the stadium was paid for; twenty years later, residents are still (ii)_____ it.',
    [
      [['temporary', 'permanent', 'voluntary'], 0],
      [['paying', 'debating', 'praising'], 0],
    ],
    '(i) “Lasting only until the stadium was paid for” defines a **temporary** tax. (ii) The irony: twenty years later residents are still **paying** it.',
    [
      '“Permanent” contradicts “lasting only until”; “voluntary” doesn’t match the explanation.',
      '“Debating” and “praising” miss the point that the promised end never came.',
    ],
  ),
  tc(
    2,
    'The novel’s (i)_____ pace suits its setting: a quiet village where, as one character remarks, nothing (ii)_____ ever happens. Readers expecting drama will be (iii)_____; those who value stillness will be rewarded.',
    [
      [['leisurely', 'frantic', 'uneven'], 0],
      [['noteworthy', 'ordinary', 'tedious'], 0],
      [['disappointed', 'delighted', 'confused'], 0],
    ],
    '(i) A pace that suits a quiet village is **leisurely**. (ii) In such a village nothing **noteworthy** happens. (iii) The semicolon contrasts two kinds of readers: those wanting drama will be **disappointed**, those who value stillness rewarded.',
    [
      '“Frantic” clashes with a quiet village; “uneven” doesn’t follow from the setting.',
      'In a quiet village ordinary things are exactly what do happen; “tedious” events isn’t the point of the remark.',
      '“Delighted” would erase the contrast with the rewarded readers; “confused” isn’t implied.',
    ],
  ),
  passage('heat', heat, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'explaining why cities are warmer than their surroundings and how some respond',
        'arguing that air conditioning is the main cause of the heat in cities',
        'comparing summer temperatures in several different cities around the world',
        'describing the health effects of summer heat waves in the countryside',
        'explaining why the buildings in large cities are so tall and so close together',
      ],
      0,
      'The passage lists the causes of the urban heat island, says when it matters most, and ends with cities’ efforts to reduce it (A). Air conditioners are one contributor among several (not B); (C), (D), and (E) aren’t its subject.',
    ),
    rc(
      2,
      'According to the passage, trees and plants help cool their surroundings by',
      [
        'releasing water that evaporates from their leaves',
        'reflecting sunlight away from nearby roofs',
        'blocking the breezes between buildings',
        'absorbing the heat given off by cars and factories',
        'storing heat during the day and releasing it at night',
      ],
      0,
      'Plants “cool their surroundings as water evaporates from their leaves” (A). Reflecting sunlight describes light-colored roofs (B); blocking breezes is something buildings do, which warms the city (C); (E) describes dark pavement.',
    ),
    rc(
      2,
      'It can be inferred that light-colored roofs would help reduce the urban heat island mainly because they',
      [
        'absorb and store less of the sun’s heat than dark roofs do',
        'allow more rainwater to evaporate from the roof surface',
        'block the heat that is produced by the air conditioners inside',
        'make buildings shorter and their streets less crowded',
        'trap warm air inside the buildings that lie below them',
      ],
      0,
      'Dark roofs “absorb sunlight during the day and release the heat slowly after dark”; light roofs “reflect sunlight rather than absorb it,” so they store less heat to release (A). The other choices don’t follow from the passage.',
    ),
  ]),
  se(
    1,
    'The child was _____ by the magician’s tricks, watching every move with wide eyes.',
    ['fascinated', 'enthralled', 'bored', 'frightened', 'annoyed', 'confused'],
    [0, 1],
    'Watching every move wide-eyed shows complete absorption: **fascinated**, **enthralled**. “Bored” is the opposite; “frightened” and “confused” don’t fit an enjoyable show watched so closely.',
  ),
  se(
    1,
    'After the heavy snowfall, the roads were _____, and schools across the county closed for the day.',
    ['impassable', 'blocked', 'clear', 'dry', 'busy', 'repaired'],
    [0, 1],
    'Roads that close schools after a heavy snowfall can’t be traveled: **impassable**, **blocked**. “Clear” and “dry” are the opposite.',
  ),
  se(
    2,
    'The senator’s speech was _____, touching on a dozen topics without developing any of them.',
    ['unfocused', 'scattershot', 'focused', 'concise', 'angry', 'humorous'],
    [0, 1],
    'A speech that jumps among many topics without developing any is **unfocused**, **scattershot**. “Focused” and “concise” form the opposite pair.',
  ),
  se(
    2,
    'The results of the experiment were _____: they could be read as supporting either of the rival hypotheses.',
    ['inconclusive', 'indeterminate', 'decisive', 'definitive', 'fraudulent', 'expensive'],
    [0, 1],
    'Results that support either hypothesis settle nothing: **inconclusive**, **indeterminate**. “Decisive” and “definitive” are the opposite pair.',
  ),
  argument(
    'hillcrest',
    hillcrest,
    rc(
      2,
      'Which of the following, if true, most strengthens the school board’s conclusion?',
      [
        'After Northside moved its start to 8:30, its scores rose with the same student body.',
        'Southside has more students than Northside and larger classes in most subjects.',
        'Many Southside students ride a school bus for more than half an hour each morning.',
        'Northside’s teachers have, on average, more years of experience than Southside’s.',
        'Average test scores at both of the schools have risen steadily over the past decade.',
      ],
      0,
      'The board infers cause from a difference between two schools, which could have many sources. (A) shows the same school’s scores rising after the change with the same students — evidence that the start time itself matters. (D) weakens the argument with a rival explanation; (B), (C), and (E) don’t bear on the start time.',
    ),
  ),
  passage('murano', murano, [
    rc(
      1,
      'According to the passage, the official reason for moving the glassmakers to Murano was',
      [
        'the risk of fire in the city',
        'the need for more space for furnaces',
        'a shortage of skilled workers in Venice',
        'pressure from the French government',
        'the demand for mirrors abroad',
      ],
      0,
      '“The official reason was the risk of fire in a crowded city built largely of wood” (A). Guarding secrets was an additional benefit, not the official reason; the other choices aren’t mentioned as reasons.',
    ),
    rc(
      2,
      'The passage suggests that Venice’s efforts to keep its glassmaking methods secret',
      [
        'did not keep the methods from spreading to other countries',
        'succeeded in keeping the methods secret until the 1900s',
        'were abandoned soon after the glassmakers moved to Murano',
        'were opposed by most of the glassworkers on Murano',
        'made Venetian glass less popular with buyers abroad',
      ],
      0,
      '“These measures were never entirely successful”: workers left, Venetian-style glass was made elsewhere by the sixteenth century, and France recruited Venetian craftsmen (A). (B) contradicts the passage; (C), (D), and (E) aren’t supported.',
    ),
    rc(
      2,
      'The author mentions the French mirror-making works most likely in order to',
      [
        'give an example of Venice losing its hold on a valuable product',
        'show that French glass was superior in quality to Venetian glass',
        'explain why the Venetian glassmakers moved to Murano',
        'suggest that Venice had no interest in making mirrors for export',
        'describe how Venetian glass and mirrors were made',
      ],
      0,
      'The French works, staffed with recruited Venetian craftsmen, broke “Venice’s hold on one of its most profitable products” (A) — the passage’s strongest example of the secrecy failing. The other choices aren’t supported.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const carsonSentences = [
  'Rachel Carson’s Silent Spring (1962) opens not with data but with a fable: a description of an imaginary American town where, one spring, the birds have stopped singing.',
  'The device was calculated.',
  'Carson, a marine biologist who had already written best-selling books about the sea, wanted to reach readers who would never open a scientific report, and the fable gave them an image of what was at stake before the evidence began.',
  'The evidence, when it came, was extensive: the book’s argument about the effects of pesticides such as DDT on wildlife was supported by more than fifty pages of references.',
  'Some of her opponents in the chemical industry nevertheless dismissed her as emotional and alarmist, as though a writer who used vivid language could not also be rigorous.',
  'In fact Carson did not call for banning all pesticides; she argued for using them sparingly and with a fuller understanding of their effects.',
  'That position, controversial at the time, has come to seem to many readers simply prudent.',
];
const carson = carsonSentences.join(' ');

const depletion = `In a widely cited experiment published in 1998, researchers seated hungry participants in front of a plate of freshly baked cookies and a bowl of radishes. Some were told to eat only the radishes. Afterward, all were given a puzzle that, unknown to them, had no solution. Those who had resisted the cookies gave up sooner than those who had been allowed to eat them. The researchers concluded that self-control draws on a limited resource that is used up by exercise—a phenomenon they called ego depletion—and over the next decade hundreds of studies appeared to confirm it.

In 2016, however, a coordinated attempt to reproduce the effect, carried out by more than twenty laboratories following an identical procedure specified in advance, found an effect close to zero. Defenders of ego depletion objected that the task used in the replication to exhaust participants’ self-control was too mild to deplete anyone. Critics replied that if the effect were as robust as the earlier literature suggested, it should have appeared anyway, and they pointed to a likelier explanation for the earlier consensus: studies that found the effect were more likely to be published than studies that did not. The dispute is not settled, but it has become a central example in debates about how psychology should test its findings.`;

export const V2H = section(10, 'v2h', [
  tc(
    2,
    'The chemist’s early work was _____, touching on a dozen unrelated problems without solving any of them; only in middle age did she settle on the question that would define her career.',
    [[['scattered', 'focused', 'derivative', 'lucrative', 'celebrated'], 0]],
    'Work that skips among unrelated problems without finishing any is **scattered**. “Focused” is what her later work became, not her early work.',
  ),
  tc(
    3,
    'Critics of the museum’s renovation complain that it has (i)_____ the building’s original character, replacing its intimate galleries with vast open halls; yet attendance has (ii)_____ since the building reopened, suggesting that visitors do not share the critics’ nostalgia.',
    [
      [['effaced', 'preserved', 'revealed'], 0],
      [['surged', 'dwindled', 'stabilized'], 0],
    ],
    '(i) Replacing intimate galleries with vast halls wipes out the original character: **effaced**. (ii) “Yet … visitors do not share the critics’ nostalgia” — more people are coming: attendance has **surged**.',
    [
      'The critics “complain,” so the renovation didn’t “preserve” or “reveal” the character they miss.',
      '“Dwindled” would suggest visitors agree with the critics; “stabilized” doesn’t show they disagree.',
    ],
  ),
  tc(
    3,
    'Scientific prose is often thought to be (i)_____, a transparent medium through which facts pass without distortion. Yet the choices a writer makes—which results to lead with, which doubts to (ii)_____, which rival explanations to mention—can (iii)_____ a reader’s impression of how settled a finding is.',
    [
      [['impersonal', 'ornate', 'persuasive'], 0],
      [['acknowledge', 'invent', 'repeat'], 0],
      [['shape', 'ignore', 'confirm'], 0],
    ],
    '(i) “A transparent medium through which facts pass without distortion” describes **impersonal** prose, in which the writer seems absent. (ii) A writer chooses which doubts to **acknowledge** — to mention or leave out. (iii) “Yet” says these choices do affect the reader: they **shape** the impression.',
    [
      '“Ornate” and “persuasive” are the opposite of transparent, undistorting prose.',
      'Writers don’t choose which doubts to “invent,” and “repeat” doesn’t parallel choosing what to mention.',
      '“Ignore” reverses the point; “confirm” implies the impression is already there.',
    ],
  ),
  tc(
    3,
    'The biography is (i)_____ enough to satisfy scholars, who will find every claim documented, but too (ii)_____ to hold the attention of general readers, who may tire of its endless catalog of dates and names.',
    [
      [['scrupulous', 'speculative', 'brief'], 0],
      [['dry', 'lively', 'short'], 0],
    ],
    '(i) Scholars are satisfied because every claim is documented: the book is **scrupulous** (careful about accuracy). (ii) “An endless catalog of dates and names” tires general readers: the book is **dry**.',
    [
      '“Speculative” contradicts “every claim documented”; “brief” contradicts an “endless catalog.”',
      '“Lively” would hold readers’ attention; “short” contradicts “endless.”',
    ],
  ),
  passage('carson', carson, [
    rc(
      2,
      'According to the passage, Carson opened Silent Spring with a fable in order to',
      [
        'show readers who’d never read a scientific report what was at stake',
        'avoid presenting any of the scientific evidence she had gathered',
        'respond in advance to the critics she expected from the chemical industry',
        'show that she had been trained as a marine biologist',
        'argue that all chemical pesticides should be banned outright',
      ],
      0,
      'She wanted “to reach readers who would never open a scientific report,” and the fable gave them “an image of what was at stake” (A). The evidence followed and was extensive (not B); the critics came after publication (C); she didn’t call for a total ban (E).',
    ),
    rc(
      3,
      'The author implies that the opponents mentioned in the passage made which of the following errors?',
      [
        'Assuming that vivid writing cannot also be rigorous',
        'Overlooking the fable at the start of the book',
        'Believing that Carson was a marine biologist',
        'Claiming that DDT had no harmful effects on wildlife',
        'Calling for all pesticides to be banned outright',
      ],
      0,
      'They dismissed her “as though a writer who used vivid language could not also be rigorous” — the author presents this as a mistaken assumption, given her fifty pages of references (A). The other choices aren’t attributed to them.',
    ),
    rcSelect(
      3,
      'Select the sentence in which the author corrects a possible misunderstanding of Carson’s position.',
      carsonSentences,
      5,
      '“In fact Carson did not call for banning all pesticides” corrects the mistaken idea that she wanted a total ban and states her actual view. The sentence before it reports how opponents characterized her style, not her position.',
    ),
  ]),
  se(
    2,
    'The reviewer’s objections were _____; none of them bore on the book’s central argument.',
    ['tangential', 'incidental', 'devastating', 'fundamental', 'numerous', 'belated'],
    [0, 1],
    'Objections that don’t touch the central argument are off to the side: **tangential**, **incidental**. “Devastating” and “fundamental” form the opposite pair.',
  ),
  se(
    3,
    'For all his reputation as a _____, the senator rarely voted against his party, and his celebrated speeches of dissent almost never changed a vote.',
    ['maverick', 'nonconformist', 'loyalist', 'partisan', 'orator', 'novice'],
    [0, 1],
    '“For all his reputation” sets the reputation against his reliable party votes, so he was known as an independent: **maverick**, **nonconformist**. “Loyalist” and “partisan” describe how he actually voted.',
  ),
  se(
    3,
    'The actor’s performance was so _____ that audiences forgot they were watching a performance at all.',
    ['naturalistic', 'unaffected', 'stilted', 'mannered', 'energetic', 'comic'],
    [0, 1],
    'A performance that doesn’t seem like acting is lifelike and free of artifice: **naturalistic**, **unaffected**. “Stilted” and “mannered” are the opposite pair — they call attention to the acting.',
  ),
  se(
    3,
    'Despite the _____ of the evidence against him, the defendant maintained his innocence to the end.',
    ['preponderance', 'weight', 'scarcity', 'absence', 'novelty', 'ambiguity'],
    [0, 1],
    '“Despite” means the evidence was strong: its **preponderance**, its **weight**. “Scarcity” and “absence” would make maintaining innocence unsurprising.',
  ),
  passage('depletion', depletion, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'describe a psychological finding and a challenge to its reliability',
        'explain why hungry people give up sooner on difficult puzzles',
        'argue that people’s capacity for self-control is unlimited',
        'defend the 1998 experiment against the objections of its critics',
        'describe how psychology journals decide which articles to publish',
      ],
      0,
      'Paragraph one presents the ego-depletion finding; paragraph two describes the failed replication and the dispute (A). The passage doesn’t claim (C), takes no side (D), and mentions publication only as one explanation (E).',
    ),
    rc(
      3,
      'It can be inferred that the “coordinated attempt” described in the second paragraph differed from many earlier studies in that it',
      [
        'followed one procedure, fixed in advance, across many laboratories',
        'used cookies and radishes as the foods participants had to resist',
        'was designed from the start specifically to confirm ego depletion',
        'studied only participants who had been made hungry beforehand',
        'was never published in any of the major scientific journals',
      ],
      0,
      'It was carried out “by more than twenty laboratories following an identical procedure specified in advance” (A). Nothing says it repeated the cookie design (B) or the hunger condition (D); it was an attempt to reproduce the effect, not a study designed to confirm it (C).',
    ),
    rc(
      3,
      'The critics mentioned in the second paragraph respond to the defenders’ objection by arguing that',
      [
        'a truly robust effect should have appeared even with a mild task',
        'the replication’s task was in fact very demanding for participants',
        'the 1998 study used far too few participants to be trusted',
        'hundreds of later studies had found no effect whatsoever',
        'self-control does not depend on any limited mental resource',
      ],
      0,
      '“If the effect were as robust as the earlier literature suggested, it should have appeared anyway” (A). The critics don’t dispute that the task was mild (B); the earlier studies appeared to confirm the effect (not D); (C) and (E) aren’t their argument.',
    ),
    rcMulti(
      3,
      'Which of the following, if true, would support the critics’ explanation of the earlier consensus?',
      [
        'Many studies of ego depletion that found no effect were never published.',
        'Journals then favored studies that reported significant effects.',
        'The 1998 study had more participants than the 2016 replication did.',
      ],
      [0, 1],
      'The critics say the consensus came from studies that found the effect being published more often. Unpublished studies that found nothing (A) and journals favoring significant effects (B) both support that. The size of the 1998 study (C) says nothing about which studies were published.',
    ),
  ]),
]);
