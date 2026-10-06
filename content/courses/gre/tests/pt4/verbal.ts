// Practice Test 4 — Verbal Reasoning.

import { passage, rc, rcMulti, rcSelect, se, section, tc } from '../author.ts';

// ---------------------------------------------------------------- Section 1

const retrieval = `Students often prepare for exams by rereading their notes, a strategy that feels productive because the material becomes increasingly familiar. Research on memory suggests that this feeling is misleading. In a number of experiments, students who spent part of their study time trying to recall material from memory—without looking at it—remembered considerably more a week later than students who spent the same time rereading, even though the rereaders predicted that they would do better. Familiarity, it seems, is easily mistaken for learning; the effortful act of retrieval, by contrast, strengthens the memory being retrieved.`;

const wegener = `When Alfred Wegener proposed in 1912 that the continents had once been joined and had since drifted apart, he assembled an impressive body of evidence: the matching outlines of South America and Africa, similar fossils on continents now separated by oceans, and rock formations that seemed to continue across the Atlantic. Yet most geologists rejected his hypothesis for decades. The usual explanation is that Wegener could not supply a plausible mechanism—no known force seemed capable of pushing continents through the solid ocean floor. When evidence of seafloor spreading emerged in the 1960s, supplying such a mechanism, the idea of moving continents was quickly accepted in the form of plate tectonics.

Some historians find this account too tidy. They note that many geologists who rejected drift also doubted Wegener's evidence itself, attributing the similar fossils, for example, to land bridges that had once connected the continents and had since sunk. On this view, the absence of a mechanism was not the only obstacle; the evidence Wegener regarded as decisive seemed, to many of his contemporaries, to admit other explanations.`;

export const V1 = section(4, 'v1', [
  tc(
    2,
    'Although the documentary claims to offer a balanced view of the controversy, its selection of interviews is so _____ that viewers hear almost nothing from the project’s defenders.',
    [[['lopsided', 'exhaustive', 'impartial', 'haphazard', 'extensive'], 0]],
    '“Although … balanced” sets up a contrast, and the result — viewers hear almost nothing from one side — defines it: the selection is **lopsided**. “Impartial” agrees with “balanced” instead of contrasting; “exhaustive” and “extensive” don’t explain one side’s absence; “haphazard” (random) wouldn’t systematically leave out one side.',
  ),
  tc(
    2,
    'The chef’s menu is deliberately (i)_____, offering only five dishes each night, but each dish is prepared with such (ii)_____ that diners rarely miss having more choices.',
    [
      [['spare', 'eclectic', 'extensive'], 0],
      [['meticulousness', 'haste', 'extravagance'], 0],
    ],
    '(i) “Only five dishes” → a **spare** menu. (ii) “But” turns to what compensates for the lack of choice: the dishes are prepared with great care — **meticulousness**.',
    [
      '“Eclectic” (drawing on many sources) and “extensive” clash with “only five dishes”.',
      '“Haste” wouldn’t make up for a short menu; “extravagance” is about lavishness, not the care that satisfies diners.',
    ],
  ),
  tc(
    3,
    'Scientists once assumed that the deep ocean floor was (i)_____, too cold and dark to support much life. The discovery of hydrothermal vents, around which dense communities of organisms thrive on chemical energy rather than sunlight, (ii)_____ this view and (iii)_____ the range of conditions under which biologists believed life could exist.',
    [
      [['barren', 'teeming', 'unexplored'], 0],
      [['upended', 'reinforced', 'predated'], 0],
      [['expanded', 'narrowed', 'obscured'], 0],
    ],
    '(i) “Too cold and dark to support much life” defines **barren**. (ii) Dense communities of organisms contradict that view — they **upended** it. (iii) Life thriving without sunlight **expanded** the conditions biologists thought life could tolerate.',
    [
      '“Teeming” is what the vents revealed, not the old assumption; “unexplored” doesn’t match “too cold and dark to support much life”.',
      'A discovery of thriving life can’t reinforce a belief that little lives there; “predated” makes no sense for a later discovery.',
      'New habitats for life widen, not narrow, the known range.',
    ],
  ),
  passage('retrieval', retrieval, [
    rc(
      2,
      'The passage suggests that students prefer rereading as a study strategy because rereading',
      [
        'creates a sense of familiarity that students mistake for learning',
        'improves long-term memory more than practicing recall does',
        'requires much more mental effort than practicing recall does',
        'allows students to predict their exam scores accurately',
        'is the strategy that most memory researchers recommend to students',
      ],
      0,
      'Rereading “feels productive because the material becomes increasingly familiar”, and “familiarity … is easily mistaken for learning” (A). (B) contradicts the experiments; (C) reverses the effort; (D) contradicts the rereaders’ wrong predictions.',
    ),
    rc(
      3,
      'Which of the following, if true, would most seriously weaken the conclusion drawn from the experiments described in the passage?',
      [
        'Unlike the rereaders, the recall group was told in advance what the test would cover.',
        'Some of the students who reread their notes also highlighted key passages in them.',
        'The students in both groups were enrolled in the same introductory course.',
        'The students who reread their notes found the experience more pleasant than recall.',
        'Both groups of students spent exactly the same amount of time studying.',
      ],
      0,
      'The conclusion is that retrieval itself improves memory. If the recall group also knew what would be tested, that difference could explain their better scores (A). (C) and (E) make the groups more alike, strengthening the comparison; (B) and (D) don’t explain the gap.',
    ),
  ]),
  se(
    1,
    'The novel’s plot is so _____ that most readers guess the ending by the third chapter.',
    ['predictable', 'intricate', 'formulaic', 'suspenseful', 'lengthy', 'original'],
    [0, 2],
    'An ending readers guess by chapter three comes from a **predictable**, **formulaic** plot. “Intricate”, “suspenseful”, and “original” would make the ending harder to guess.',
  ),
  se(
    2,
    'Though the candidate’s supporters described her as decisive, her opponents called her _____, noting that she often acted before gathering the facts.',
    ['hasty', 'deliberate', 'precipitate', 'cautious', 'indecisive', 'charismatic'],
    [0, 2],
    '“Acted before gathering the facts” is the unflattering version of “decisive”: **hasty** and **precipitate** (done too suddenly, without care). “Deliberate” and “cautious” contradict acting before the facts; “indecisive” contradicts acting at all.',
  ),
  se(
    2,
    'The report’s authors were careful to _____ their conclusions, noting several ways in which the data might be misleading.',
    ['qualify', 'overstate', 'hedge', 'publicize', 'abandon', 'exaggerate'],
    [0, 2],
    'Pointing out how the data might mislead limits the conclusions: they **qualify** and **hedge** them. “Overstate” and “exaggerate” are the opposite pair; “abandon” goes too far — they kept the conclusions but limited them.',
  ),
  se(
    3,
    'The biologist’s theory, once dismissed as _____, has gained new respectability as evidence for it has accumulated.',
    ['risible', 'orthodox', 'ludicrous', 'abstruse', 'conventional', 'venerable'],
    [0, 2],
    'A theory that has only now “gained … respectability” was once dismissed as absurd: **risible** (laughable) and **ludicrous**. “Orthodox” and “conventional” form a pair, but a conventional theory wouldn’t be “dismissed”. “Abstruse” (hard to understand) and “venerable” don’t fit.',
  ),
  passage('wegener', wegener, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'give a common explanation for a hypothesis’s rejection, and a challenge to it',
        'argue that Wegener’s hypothesis was correct in every detail that he proposed',
        'describe the discovery of seafloor spreading in the twentieth century',
        'explain why land bridges once connected the continents across the oceans',
        'criticize the geologists who accepted plate tectonics far too quickly',
      ],
      0,
      'Paragraph 1 gives “the usual explanation” (no mechanism); paragraph 2 says some historians find it “too tidy” and add a second obstacle. That’s (A). The passage doesn’t claim (B), treats (C) as a detail, and never endorses land bridges (D).',
    ),
    rcMulti(
      2,
      'According to the passage, the evidence Wegener assembled included which of the following?',
      [
        'Similar fossils found on continents now separated by oceans',
        'The matching outlines of two continents’ coastlines',
        'Measurements showing that the seafloor was spreading',
      ],
      [0, 1],
      'Wegener cited “the matching outlines of South America and Africa” (B) and “similar fossils on continents now separated by oceans” (A). Evidence of seafloor spreading (C) emerged in the 1960s, decades after his proposal.',
    ),
    rc(
      3,
      'The historians mentioned in the second paragraph would most likely agree with which of the following statements?',
      [
        'Even with a plausible mechanism, many geologists of his day might still have doubted Wegener.',
        'Wegener fabricated much of the evidence he presented for his hypothesis.',
        'The discovery of seafloor spreading played no role at all in the acceptance of plate tectonics.',
        'Land bridges have since been shown to have connected the continents long ago.',
        'Geologists of Wegener’s time accepted his evidence but rejected his conclusions.',
      ],
      0,
      'These historians argue that the missing mechanism “was not the only obstacle” — many geologists also doubted the evidence. So a mechanism alone might not have won them over (A). (E) contradicts them: geologists doubted the evidence itself. (B) and (D) go far beyond the passage; (C) denies something they don’t dispute.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const dolphins = `Dolphins face an unusual problem at bedtime: because they must surface to breathe and cannot rely on reflexes to do so, a dolphin that fell fully asleep in open water might drown. Their solution is to sleep with one half of the brain at a time. Recordings of brain activity show that while one hemisphere displays the slow waves characteristic of deep sleep, the other remains awake, and the eye connected to the sleeping hemisphere closes.

Some birds do something similar. In one study, mallard ducks sleeping in a row were more likely to keep open the eye facing away from the group when they were at the end of the row—the position most exposed to predators—suggesting that half-brain sleep can also serve as a form of vigilance. Such findings complicate the assumption that sleep is necessarily a state of the whole brain, although they leave unanswered the deeper question of what sleep is for.`;

const forgery = `In the late 1930s, a Dutch painter named Han van Meegeren sold several paintings that experts accepted as previously unknown works by the seventeenth-century master Johannes Vermeer. One eminent critic hailed the first of them as among Vermeer's finest achievements. After the Second World War, facing charges of having sold a national treasure to a Nazi official, van Meegeren confessed that he had painted the works himself—and, to prove it, painted another "Vermeer" under supervision. The paintings, once celebrated, were quickly relegated to storerooms.

The episode poses a question that philosophers of art have found difficult to answer. If a forgery is good enough to deceive experts, what exactly is lost when its origin is revealed? The painting's appearance has not changed. One answer is that the value of an artwork lies partly in what it achieved: a Vermeer represents a solution to artistic problems that Vermeer himself posed, whereas a forgery merely reproduces solutions someone else has already found. Another answer holds that knowing a painting's origin changes how we look at it.

The philosopher Nelson Goodman argued that even if we cannot now see any difference between an original and a skillful copy, the knowledge that one is a copy gives us reason to look for differences we may learn to see. In van Meegeren's case, later viewers did come to find his "Vermeers" conspicuously unlike the real thing, their faces marked by a heaviness that critics of the 1930s had somehow overlooked.`;

const forgeryP2 = [
  'The episode poses a question that philosophers of art have found difficult to answer.',
  'If a forgery is good enough to deceive experts, what exactly is lost when its origin is revealed?',
  "The painting's appearance has not changed.",
  'One answer is that the value of an artwork lies partly in what it achieved: a Vermeer represents a solution to artistic problems that Vermeer himself posed, whereas a forgery merely reproduces solutions someone else has already found.',
  "Another answer holds that knowing a painting's origin changes how we look at it.",
];

export const V2H = section(4, 'v2h', [
  tc(
    2,
    'The committee’s report, for all its length, is curiously _____: it catalogs the agency’s failures in exhaustive detail but offers no account of why they occurred.',
    [[['superficial', 'partisan', 'succinct', 'speculative', 'impassioned'], 0]],
    '“For all its length” warns of a contrast, and the colon supplies it: lots of detail, no explanation of causes — the report is **superficial** (lacking depth). “Succinct” contradicts its length; “speculative” is the opposite of offering no account of why; “partisan” and “impassioned” aren’t supported.',
  ),
  tc(
    3,
    'Far from being a (i)_____ figure content to work in obscurity, the inventor was an inveterate (ii)_____, staging public demonstrations of his devices and courting newspaper coverage at every opportunity.',
    [
      [['retiring', 'flamboyant', 'prolific'], 0],
      [['self-promoter', 'recluse', 'skeptic'], 0],
    ],
    '(i) “Content to work in obscurity” defines **retiring** (shy, avoiding attention). (ii) “Far from” reverses it: public demonstrations and courting the press make him an inveterate **self-promoter**.',
    [
      '“Flamboyant” is the opposite of content in obscurity; “prolific” is about output, not publicity.',
      '“Recluse” matches the rejected description; “skeptic” has nothing to do with seeking attention.',
    ],
  ),
  tc(
    2,
    'The film’s director has a reputation for (i)_____, reshooting scenes dozens of times in pursuit of a performance that only she can envision. Actors who have worked with her describe the experience as (ii)_____ but ultimately rewarding, since the finished films (iii)_____ the ordeal.',
    [
      [['perfectionism', 'improvisation', 'indifference'], 0],
      [['grueling', 'effortless', 'lucrative'], 0],
      [['justify', 'undermine', 'conceal'], 0],
    ],
    '(i) Reshooting dozens of times for a performance only she can envision is **perfectionism**. (ii) “But ultimately rewarding” contrasts with a hard experience: **grueling**. (iii) The films are why it’s rewarding — they **justify** the ordeal.',
    [
      '“Improvisation” is the opposite of reshooting toward a fixed vision; “indifference” contradicts her intensity.',
      '“Effortless” clashes with “ordeal”; “lucrative” doesn’t set up “but ultimately rewarding”.',
      'Films that undermined or concealed the ordeal wouldn’t make it rewarding.',
    ],
  ),
  tc(
    3,
    'The historian’s thesis is (i)_____ rather than demonstrated: she assembles a handful of suggestive anecdotes and treats them as if they (ii)_____ a pattern that her evidence cannot in fact support.',
    [
      [['asserted', 'documented', 'retracted'], 0],
      [['established', 'contradicted', 'obscured'], 0],
    ],
    '(i) “Rather than demonstrated” — the contrast is merely claimed: **asserted**. (ii) She treats a few anecdotes as if they **established** a pattern the evidence can’t support.',
    [
      '“Documented” is close to “demonstrated”, killing the contrast; “retracted” isn’t suggested.',
      'Treating anecdotes as if they contradicted or obscured a pattern makes no sense with “cannot in fact support”.',
    ],
  ),
  passage('dolphins', dolphins, [
    rc(
      2,
      'According to the passage, sleeping with one half of the brain at a time allows dolphins to',
      [
        'keep surfacing to breathe while sleeping',
        'sleep more deeply than other mammals',
        'avoid the need for sleep altogether',
        'see equally well with both eyes during sleep',
        'rely on reflexes to breathe',
      ],
      0,
      'Dolphins “must surface to breathe and cannot rely on reflexes to do so”, so full sleep could drown them; half-brain sleep is “their solution” (A). (E) contradicts the passage; (D) contradicts the eye closing.',
    ),
    rc(
      3,
      'The study of mallard ducks is mentioned primarily in order to',
      [
        'suggest that half-brain sleep may serve another purpose than in dolphins',
        'show that birds, like dolphins, must surface regularly in order to breathe',
        'argue that mallard ducks sleep more deeply than dolphins do at night',
        'explain why sleep must necessarily be a state of the whole brain at once',
        'provide evidence that mallard ducks do not actually need to sleep at all',
      ],
      0,
      'In dolphins, half-brain sleep solves the breathing problem; the ducks keep the outward-facing eye open when most exposed to predators, “suggesting that half-brain sleep can also serve as a form of vigilance” — another purpose (A). (D) reverses the passage.',
    ),
    rcMulti(
      3,
      'The passage suggests which of the following about sleep?',
      [
        'Its function is not fully explained by the findings described.',
        'It requires the entire brain to enter a sleeping state at once.',
        'It serves exactly the same purpose in dolphins as it does in ducks.',
      ],
      [0],
      'Only A: the findings “leave unanswered the deeper question of what sleep is for.” B is the assumption the findings complicate. C is contradicted — breathing for dolphins, vigilance for ducks. Select-all questions can have a single correct answer.',
    ),
  ]),
  se(
    3,
    'The chief executive’s _____ in the face of mounting losses reassured investors, who had feared she would panic.',
    ['sangfroid', 'agitation', 'poise', 'bravado', 'candor', 'recklessness'],
    [0, 2],
    'Investors feared panic, so what reassured them was calm self-possession: **sangfroid** (coolness under pressure) and **poise**. “Agitation” is the panic they feared; “bravado” is a show of boldness, which isn’t the same as calm and has no partner.',
  ),
  se(
    2,
    'Because the study’s sample was so _____, its authors cautioned against drawing broad conclusions from the results.',
    ['meager', 'diverse', 'limited', 'representative', 'random', 'recent'],
    [0, 2],
    'Caution about broad conclusions follows from a sample too small to generalize from: **meager**, **limited**. A “diverse”, “representative”, or “random” sample would support broader conclusions.',
  ),
  se(
    3,
    'The poet’s late work is marked by _____ that surprised readers familiar with the ornate, allusive style of her youth.',
    ['austerity', 'extravagance', 'spareness', 'grandiloquence', 'obscurity', 'melancholy'],
    [0, 2],
    'Readers were surprised because the late work contrasts with an “ornate, allusive” style: it is plain — **austerity**, **spareness**. “Extravagance” and “grandiloquence” describe the ornate early style. “Melancholy” is a mood, not a contrast with ornateness.',
  ),
  se(
    3,
    'Although the new evidence was _____, it was not in itself sufficient to overturn the verdict: it raised doubts without resolving them.',
    ['suggestive', 'conclusive', 'intriguing', 'definitive', 'spurious', 'irrelevant'],
    [0, 2],
    'Evidence that “raised doubts without resolving them” hints at something without proving it: **suggestive**, **intriguing**. “Conclusive” and “definitive” are the trap pair — conclusive evidence would be sufficient. “Spurious” and “irrelevant” evidence wouldn’t raise real doubts.',
  ),
  passage('forgery', forgery, [
    rc(
      2,
      'The primary purpose of the passage is to',
      [
        'use a historical episode to raise a philosophical question and weigh answers to it',
        'argue that van Meegeren’s paintings are just as valuable as Vermeer’s originals',
        'describe the methods van Meegeren used to deceive the art experts of his day',
        'criticize the critics who praised van Meegeren’s forgeries as genuine Vermeers',
        'explain why Vermeer’s works are so rare and so highly valued today',
      ],
      0,
      'Paragraph 1 tells the van Meegeren story; paragraph 2 poses “a question that philosophers of art have found difficult”; paragraphs 2–3 give two answers. That’s (A). The passage never argues (B), describes his methods (C), or explains rarity (E); (D) is at most implied in passing.',
    ),
    rc(
      3,
      'It can be inferred that Goodman would most likely agree with which of the following?',
      [
        'Not seeing a difference between original and copy now doesn’t mean none exists.',
        'An original painting and a skillful copy of it are aesthetically identical.',
        'The value of a painting lies entirely in the problems its creator solved.',
        'Experts are never deceived by forgeries if they look at them closely enough.',
        'Knowing a painting’s origin should not affect how closely we look at it.',
      ],
      0,
      'Goodman argued that “even if we cannot now see any difference”, knowing one is a copy gives us reason to look for differences “we may learn to see” — so not seeing a difference now doesn’t mean there isn’t one (A). (B) and (E) contradict him; (C) is the other answer; (D) is contradicted by the episode.',
    ),
    rc(
      3,
      'The author mentions that later viewers found the forgeries “conspicuously unlike the real thing” most likely in order to',
      [
        'provide an instance that is consistent with Goodman’s view',
        'show that critics of the 1930s were incompetent',
        'argue that forgeries can never deceive experts for long',
        'suggest that van Meegeren’s technique improved over time',
        'refute the view that a painting’s value depends on its origin',
      ],
      0,
      'Goodman predicted that knowing a painting is a copy lets us learn to see differences — and later viewers did see them (A). “Incompetent” (B) and “never” (C) overstate; (E) is not the point; (D) is unsupported.',
    ),
    rcSelect(
      3,
      'Select the sentence in the second paragraph that presents an answer based on what an artwork accomplishes rather than on how it looks.',
      forgeryP2,
      3,
      'Sentence 4 locates value “in what it achieved”: a Vermeer solves problems Vermeer posed, while a forgery reproduces solutions already found. Sentence 5 is the other answer — about how knowledge changes how we look. Sentence 3 notes that appearance hasn’t changed but offers no answer.',
    ),
  ]),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const bystanders = `Why do people sometimes fail to help a stranger in distress when many others are present? In a series of experiments in the late 1960s, psychologists found that participants who believed they were the only witness to an apparent emergency were far more likely to help than participants who believed that others were also aware of it. The researchers proposed that responsibility is diffused among bystanders: each person assumes that someone else will act. Later studies have qualified this finding. When an emergency is unambiguous and dangerous, groups of bystanders often do intervene, perhaps because the need for help is obvious and several people together can act more safely than one person alone.`;

const potato = `The potato, first cultivated in the Andes of South America, reached Europe in the second half of the sixteenth century. For many decades it was grown mainly as a curiosity or as animal feed. Many Europeans regarded it with suspicion: it was not mentioned in the Bible, it grew from pieces of itself rather than from seed, and it belonged to the same plant family as several poisonous species. Its eventual acceptance owed much to its practical advantages. An acre of potatoes could feed far more people than an acre of grain, and because the crop grew underground, it was less easily destroyed by passing armies. By the nineteenth century it had become a staple food across much of northern Europe. That success carried a danger, however. Where large populations came to depend on a single variety of potato, a disease that attacked that variety could cause catastrophic famine, as it did in Ireland in the 1840s.`;

const potatoSentences = [
  'The potato, first cultivated in the Andes of South America, reached Europe in the second half of the sixteenth century.',
  'For many decades it was grown mainly as a curiosity or as animal feed.',
  'Its eventual acceptance owed much to its practical advantages.',
  'By the nineteenth century it had become a staple food across much of northern Europe.',
  'That success carried a danger, however.',
  'Where large populations came to depend on a single variety of potato, a disease that attacked that variety could cause catastrophic famine, as it did in Ireland in the 1840s.',
];

export const V2E = section(4, 'v2e', [
  tc(
    1,
    'Because the bridge was closed for repairs, commuters were forced to take a _____ route that added nearly an hour to their trip.',
    [[['circuitous', 'direct', 'scenic', 'familiar', 'shorter'], 0]],
    'A detour that adds nearly an hour is roundabout: **circuitous**. “Direct” and “shorter” are the opposite; “scenic” and “familiar” don’t explain the extra hour.',
  ),
  tc(
    1,
    'The team’s victory was all the more _____ because it had lost its best player to injury early in the season.',
    [[['impressive', 'predictable', 'disappointing', 'routine', 'controversial'], 0]],
    'Winning despite losing the best player makes the victory more **impressive**. “All the more” intensifies a quality the victory already has; “predictable” and “routine” would be less likely after the loss, not more.',
  ),
  tc(
    2,
    'Though the author’s first book was a (i)_____ success, selling millions of copies, critics largely (ii)_____ it, dismissing it as formulaic.',
    [
      [['commercial', 'critical', 'modest'], 0],
      [['panned', 'praised', 'ignored'], 0],
    ],
    '(i) “Selling millions of copies” → a **commercial** success. (ii) “Dismissing it as formulaic” means critics **panned** it (reviewed it harshly).',
    [
      'A “critical” success contradicts the critics’ dismissal; “modest” contradicts millions of copies.',
      '“Praised” contradicts “dismissing”; critics who dismissed the book as formulaic didn’t ignore it.',
    ],
  ),
  tc(
    2,
    'The town’s first attempt to (i)_____ its downtown failed because the new shops were too (ii)_____ for local residents; the second attempt succeeded by offering goods and prices that residents found (iii)_____.',
    [
      [['revitalize', 'abandon', 'document'], 0],
      [['expensive', 'affordable', 'convenient'], 0],
      [['accessible', 'exorbitant', 'unfamiliar'], 0],
    ],
    '(i) An attempt that could fail or succeed by opening shops is an effort to **revitalize** the downtown. (ii) The shops failed with residents because they were too **expensive** — the second attempt fixed exactly this with better prices. (iii) Goods and prices residents found **accessible**.',
    [
      'Abandoning or documenting a downtown doesn’t involve new shops.',
      'Shops can’t fail by being too affordable or convenient.',
      '“Exorbitant” repeats the first attempt’s problem; “unfamiliar” wouldn’t explain success.',
    ],
  ),
  passage('bystanders', bystanders, [
    rc(
      1,
      'According to the passage, participants who believed they were the only witness to an emergency were',
      [
        'more likely to help than those who believed others were aware of it',
        'less likely to help than the participants who were in groups',
        'often unaware that an emergency was taking place nearby',
        'likely to assume that someone else would act in their place',
        'unwilling to help, especially when the situation seemed dangerous',
      ],
      0,
      'Lone witnesses “were far more likely to help than participants who believed that others were also aware of it” (A). (D) describes bystanders in groups.',
    ),
    rc(
      1,
      'The passage suggests that responsibility becomes “diffused” among bystanders because',
      [
        'each bystander assumes that someone else will take action',
        'bystanders cannot tell whether an emergency is real',
        'emergencies are more dangerous when many people are present',
        'bystanders are unwilling to act without instructions',
        'groups act more safely than individuals',
      ],
      0,
      'The researchers’ proposal is stated directly: “each person assumes that someone else will act” (A). (E) is the later studies’ explanation for when groups DO help.',
    ),
    rc(
      2,
      'The “later studies” described in the passage indicate that',
      [
        'the presence of other bystanders does not always make help less likely',
        'the original experiments were fundamentally flawed in their design',
        'people never help strangers when other bystanders are present',
        'dangerous emergencies are less likely to attract help from bystanders',
        'diffusion of responsibility occurs only in dangerous emergencies',
      ],
      0,
      'They “qualified” the finding: in unambiguous, dangerous emergencies, groups “often do intervene” — so the presence of others doesn’t always suppress help (A). “Qualified” is weaker than “fundamentally flawed” (B); (D) reverses the finding.',
    ),
  ]),
  se(
    1,
    'The museum’s collection is remarkably _____, ranging from ancient pottery to contemporary video installations.',
    ['diverse', 'narrow', 'varied', 'meager', 'valuable', 'famous'],
    [0, 2],
    '“Ranging from ancient pottery to contemporary video” shows a wide range: **diverse**, **varied**. “Narrow” and “meager” are the opposite; “valuable” and “famous” aren’t about range.',
  ),
  se(
    1,
    'Tired of her roommate’s _____ complaints about the apartment, Julia finally suggested that they look for a new place.',
    ['constant', 'occasional', 'incessant', 'reasonable', 'silent', 'cheerful'],
    [0, 2],
    'Being “tired of” the complaints implies there were many, without letup: **constant**, **incessant**. “Occasional” complaints wouldn’t wear her down; “silent” and “cheerful” don’t describe complaints.',
  ),
  se(
    2,
    'The senator’s speech was _____, filled with personal attacks rather than arguments about the bill itself.',
    ['vitriolic', 'conciliatory', 'venomous', 'measured', 'lengthy', 'eloquent'],
    [0, 2],
    'A speech “filled with personal attacks” is **vitriolic** and **venomous** (bitterly hostile). “Conciliatory” and “measured” are the opposite; “lengthy” and “eloquent” don’t capture the attacks.',
  ),
  se(
    2,
    'The researchers were _____ about their preliminary findings, stressing that the results would need to be replicated before any conclusions could be drawn.',
    ['cautious', 'jubilant', 'circumspect', 'boastful', 'secretive', 'dismissive'],
    [0, 2],
    'Insisting on replication before drawing conclusions is careful: **cautious**, **circumspect**. “Jubilant” and “boastful” overclaim; “secretive” contradicts “stressing”; “dismissive” means they’d reject the findings.',
  ),
  passage('potato', potato, [
    rc(
      1,
      'The passage is primarily concerned with',
      [
        'describing how a crop came to be widely adopted in Europe, and a risk that resulted',
        'explaining how potatoes were first cultivated by farmers in the Andes',
        'arguing that Europeans should have adopted the potato far sooner than they actually did',
        'comparing the nutritional value of potatoes with that of grain crops',
        'describing the causes of all of the major famines in European history',
      ],
      0,
      'The passage traces the potato from suspicion to staple food, then notes the danger of depending on one variety (A). The other choices are details or claims the passage doesn’t make.',
    ),
    rc(
      1,
      'According to the passage, one reason Europeans regarded the potato with suspicion was that',
      [
        'it was related to several poisonous plant species',
        'it could be destroyed easily by passing armies',
        'it produced less food per acre than grain crops did',
        'it grew only in the high mountains of the Andes',
        'it was often attacked by disease in damp climates',
      ],
      0,
      'The passage lists three reasons for suspicion: no mention in the Bible, growing from pieces of itself, and belonging to the same family as poisonous species (A). (B) and (C) reverse the potato’s advantages.',
    ),
    rcMulti(
      2,
      'According to the passage, which of the following were practical advantages of the potato?',
      [
        'It could feed more people per acre than grain.',
        'It was less easily destroyed by passing armies.',
        'It was resistant to the diseases that attacked grain.',
      ],
      [0, 1],
      'The passage names two advantages: more people fed per acre (A) and, because it grew underground, less vulnerability to armies (B). C contradicts the ending: a disease devastated the potato in Ireland.',
    ),
    rcSelect(
      2,
      'Select the sentence that describes how the potato’s success left some populations vulnerable.',
      potatoSentences,
      5,
      'The last sentence explains the vulnerability: populations dependent on a single variety could be devastated by one disease, as in Ireland. “That success carried a danger, however” announces a danger but doesn’t describe it.',
    ),
  ]),
]);
