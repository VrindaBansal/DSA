// Authored reading-comprehension passages in GRE style: a short academic
// passage, then 3–4 questions of the kinds the test uses — main idea,
// detail, inference, function ("the author mentions X in order to"),
// vocabulary in context, select-all (3 choices, any number right), and
// select-in-passage (rendered as a choice of sentences). Every choice
// carries a note saying why it is right or wrong.
//
// Passages are original. Where they touch real science or history they
// stay at the level of well-established, textbook claims, and attribute
// debates to "some researchers" rather than inventing citations.

import { type Candidate, type Generator, hashStr, mulberry32, shuffle } from '../engine.ts';

type Diff = 1 | 2 | 3;
interface PQ {
  prompt: string;
  options: string[];
  answer: number | number[];
  why: string;
  notes: string[];
}
interface Passage {
  id: string;
  difficulty: Diff;
  text: string;
  questions: PQ[];
}

const Q = (prompt: string, options: string[], answer: number, why: string, notes: string[]): PQ => ({ prompt, options, answer, why, notes });
/** GRE "select one or more": three choices, indicate all that apply. */
const S = (prompt: string, options: string[], answer: number[], why: string, notes: string[]): PQ => ({ prompt, options, answer, why, notes });

export const PASSAGES: Passage[] = [
  {
    id: 'birdsong',
    difficulty: 1,
    text: `Young songbirds do not simply inherit their songs. In many species, a juvenile male listens to adult males during a sensitive period early in life, stores a memory of what he hears, and later practices until his own song matches that memory. Birds raised in isolation typically produce songs that are recognizably those of their species but simplified and abnormal in structure.

One consequence of this learning is that songs vary from place to place. Populations separated by only a few kilometers can sing distinct "dialects," and a bird moved to a new population as a nestling will usually learn the local dialect rather than that of its parents. Such findings suggest that song, like human language, is shaped by both an inherited predisposition and the particular environment in which an individual develops.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['explaining how songbirds learn their songs and one result of that learning', 'arguing that birdsong is entirely inherited rather than learned from adults', 'comparing the complexity of birdsong with the complexity of human language', 'describing the experimental methods used to raise birds in isolation', 'criticizing the researchers who study the regional dialects of songbirds'],
        0,
        'Paragraph 1 describes how young birds learn song; paragraph 2 describes a consequence (regional dialects) and the conclusion (both inheritance and environment matter).',
        ['Right: learning process + one consequence (dialects).', 'The passage argues the opposite — song is not simply inherited.', 'Human language is mentioned only as a brief comparison at the end.', 'Isolation experiments are a supporting detail, not the focus.', 'No researchers are criticized.']),
      Q('According to the passage, a songbird raised in isolation typically produces a song that is',
        ['identical to its parents’ song', 'characteristic of its species but abnormal', 'indistinguishable from a local dialect', 'more complex than a normally learned song', 'unrecognizable as belonging to its species'],
        1,
        'The passage says such birds produce songs "recognizably those of their species but simplified and abnormal in structure."',
        ['It never heard its parents, so it cannot copy them.', 'Right — recognizable as the species, but simplified and abnormal.', 'Dialects come from hearing a local population, which an isolated bird does not.', 'The passage says "simplified," the opposite of more complex.', 'The passage says the song IS recognizable as the species’ song.']),
      Q('It can be inferred from the passage that a nestling moved from population A to population B would most likely sing',
        ['the dialect of population A, its parents’ group', 'the dialect of population B, where it grows up', 'a mixture of the dialects of A and B', 'no song at all, since it was moved so young', 'the simplified song of an isolated bird'],
        1,
        'The passage states that a bird moved as a nestling "will usually learn the local dialect rather than that of its parents" — the local dialect is B’s.',
        ['A is the parents’ dialect, which the passage says is usually NOT learned.', 'Right — it learns the local dialect.', 'The passage does not mention mixing.', 'It still hears adult males, so it learns a song.', 'It is not isolated; it hears population B.']),
      S('The passage suggests which of the following about birdsong?',
        ['It depends partly on an inherited predisposition.', 'It depends partly on what a young bird hears.', 'It is identical across populations of the same species.'],
        [0, 1],
        'The last sentence names both factors: "an inherited predisposition and the particular environment." Dialects show that songs differ between populations.',
        ['Supported: isolated birds still sing a species-typical song, and the conclusion names inherited predisposition.', 'Supported: birds copy the adults they hear.', 'Contradicted: nearby populations sing distinct dialects.']),
    ],
  },
  {
    id: 'heat-islands',
    difficulty: 1,
    text: `Cities are often several degrees warmer than the surrounding countryside, a phenomenon known as the urban heat island. Dark surfaces such as asphalt and roofing absorb sunlight and release the stored heat slowly, especially at night, while the scarcity of vegetation reduces the cooling that plants provide through evaporation of water from their leaves.

Planting street trees is frequently proposed as a remedy, and in many cases it helps: shade lowers surface temperatures, and evaporation cools the air. Yet trees are not a universal solution. In arid cities, irrigating large numbers of trees may strain scarce water supplies, and in narrow streets a dense canopy can trap vehicle exhaust near the ground. Urban planners, therefore, increasingly combine tree planting with other measures, such as reflective roofing materials, suited to local conditions.`,
    questions: [
      Q('The author’s attitude toward planting street trees as a remedy for urban heat islands is best described as',
        ['enthusiastic and entirely unqualified', 'dismissive of the idea as impractical', 'supportive, but with some reservations', 'neutral, since the author takes no side', 'hostile toward the city’s urban planners'],
        2,
        '“In many cases it helps” is support; “Yet trees are not a universal solution” adds reservations.',
        ['The author explicitly says trees are "not a universal solution."', 'The author says it "helps" in many cases.', 'Right — supportive, with qualifications.', 'The author does take a position: helpful but limited.', 'Planners are described approvingly.']),
      Q('According to the passage, one reason cities are warmer than the countryside is that',
        ['cities receive more hours of direct sunlight each day', 'dark surfaces absorb sunlight and release heat slowly', 'trees in cities release stored heat back into the air at night', 'vehicle exhaust raises the temperature of the upper atmosphere', 'reflective roofing materials trap heat inside buildings'],
        1,
        'Paragraph 1: “Dark surfaces such as asphalt and roofing absorb sunlight and release the stored heat slowly.”',
        ['Nothing says cities get more sunlight.', 'Right — stated directly.', 'Trees cool through evaporation; they are not a cause.', 'Exhaust is mentioned only as being trapped near the ground.', 'Reflective roofing is offered as a remedy.']),
      Q('The author mentions narrow streets primarily in order to',
        ['give an example of a setting where trees may have a drawback', 'argue that cities should widen their narrowest streets', 'explain why cities are warmer than the surrounding countryside', 'show that street trees always reduce air pollution', 'illustrate the benefits of reflective roofing materials'],
        0,
        'Narrow streets appear in the “Yet trees are not a universal solution” part: a dense canopy there can trap exhaust — a drawback.',
        ['Right — an example of where trees can backfire.', 'The passage never recommends widening streets.', 'The causes of heat islands are in paragraph 1.', 'The example shows the opposite: trees can trap pollution.', 'Roofing comes up separately, in the last sentence.']),
      Q('In the passage, the word “strain” most nearly means',
        ['filter', 'overtax', 'injure a muscle', 'purify', 'stretch into a line'],
        1,
        'Irrigating many trees may “strain scarce water supplies” — put excessive demand on them.',
        ['“Strain” can mean filter, but not in this context.', 'Right — overtax a limited supply.', 'The muscle sense doesn’t fit water supplies.', 'Nothing is being purified.', 'Not a physical stretching.']),
    ],
  },
  {
    id: 'plate-tectonics',
    difficulty: 2,
    text: `When the idea that continents move across Earth’s surface was proposed in the early twentieth century, most geologists rejected it. Its proponents pointed to the jigsaw-like fit of coastlines on either side of the Atlantic and to matching fossils and rock formations on continents now separated by oceans. Critics did not deny these observations; their chief objection was that no one could explain what force could push continents through the solid rock of the ocean floor.

The theory gained acceptance only decades later, when studies of the seafloor revealed that new crust is continually created at mid-ocean ridges and spreads outward. Continents, it turned out, do not plow through the ocean floor; they ride along with it. The history is sometimes told as a story of stubborn scientists refusing to accept obvious truth. A more charitable reading is that the critics were right to demand a mechanism: the original version of the theory, which imagined continents moving through the seafloor, was in that respect wrong.`,
    questions: [
      Q('The primary purpose of the passage is to',
        ['defend early critics of continental drift against a common portrayal', 'describe the fossils found on either side of the Atlantic', 'argue that the theory of moving continents is still unproven today', 'explain how the mid-ocean ridges were first discovered by geologists', 'criticize early geologists for ignoring the evidence of drift'],
        0,
        'The passage builds to its last sentences: rather than “stubborn scientists refusing obvious truth,” a “more charitable reading” says the critics were right to demand a mechanism.',
        ['Right — it offers a more charitable reading of the critics.', 'Fossils are one piece of the proponents’ evidence.', 'The passage says the theory “gained acceptance.”', 'The ridges are mentioned, but how they were discovered isn’t described.', 'This is the portrayal the author pushes back against.']),
      Q('According to the passage, the critics’ main objection to the early theory was that',
        ['the coastlines on either side did not actually fit together', 'the fossil evidence from both continents had been misidentified', 'no known force could move continents through the ocean floor', 'new crust is constantly being created at the mid-ocean ridges', 'continents are too large to have ever been joined together'],
        2,
        '“Their chief objection was that no one could explain what force could push continents through the solid rock of the ocean floor.”',
        ['Critics “did not deny these observations.”', 'The fossil evidence was not disputed.', 'Right — stated directly.', 'This was the later discovery that vindicated a revised theory.', 'Not mentioned.']),
      Q('It can be inferred that the author regards the original version of the theory as',
        ['correct in every important respect', 'partly mistaken but partly right', 'based on evidence that was fabricated', 'identical to the theory later accepted', 'irrelevant to modern geology today'],
        1,
        'The author says the original version “imagined continents moving through the seafloor” and “was in that respect wrong” — wrong in one respect, not entirely.',
        ['“In that respect wrong” rules this out.', 'Right — wrong about the mechanism, right that continents move.', 'The evidence (fit, fossils) was genuine.', 'The accepted theory has continents riding WITH the seafloor, a key difference.', 'The passage treats it as the forerunner of accepted theory.']),
      Q('Which sentence in the passage explains why the critics’ objection turned out to be answerable?',
        ['“Its proponents pointed to the jigsaw-like fit…”', '“Critics did not deny these observations…”', '“Continents, it turned out, do not plow through…”', '“The history is sometimes told as a story…”', '“When the idea that continents move…”'],
        2,
        'The objection was that nothing could push continents THROUGH the seafloor; the answer is that they don’t go through it — they ride with it.',
        ['This is evidence for movement, not an answer to the mechanism problem.', 'This states the objection’s context.', 'Right — the mechanism the critics demanded.', 'This introduces the portrayal the author questions.', 'This sets up the history.']),
    ],
  },
  {
    id: 'serial-novels',
    difficulty: 2,
    text: `Many of the best-known Victorian novels first reached readers not as bound books but in monthly or weekly installments. Literary critics once treated this mode of publication as a mere commercial circumstance, irrelevant to the novels themselves. More recent scholarship argues that serialization shaped the novels in fundamental ways. An author writing installments had to end each part with enough suspense to bring readers back, and could observe how readers responded before the story was complete — in some cases revising plans for a character in light of public reaction.

Critics of this newer view caution against overstatement. Novels written for single-volume publication, they note, also contain cliffhangers and multiple plotlines, so the presence of such features does not by itself prove the influence of serialization. The strongest evidence, they argue, comes not from the finished texts but from authors’ letters and working notes, which sometimes record changes made in response to readers.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['a debate about how a publication format shaped Victorian novels', 'the commercial success of the publishers of Victorian novels', 'the reasons Victorian readers preferred installments to whole books', 'a comparison of Victorian novels with novels written today', 'the life and career of one particular Victorian novelist'],
        0,
        'Paragraph 1: older view (irrelevant) vs. newer view (fundamental influence). Paragraph 2: a caution against overstating the newer view.',
        ['Right — a debate about serialization’s influence.', 'Commerce comes up only as the older critics’ framing.', 'Readers’ preferences are not discussed.', 'Modern novels are not mentioned.', 'No single author is profiled.']),
      Q('The critics mentioned in the second paragraph would most likely agree with which statement?',
        ['Cliffhangers in a novel prove on their own that it was serialized.', 'Authors’ working notes can show how serialization influenced them.', 'Serialization had no effect at all on any Victorian novel.', 'Single-volume novels never contained multiple plotlines or subplots.', 'Finished texts are the best evidence of how a novel was written.'],
        1,
        'They say the strongest evidence “comes … from authors’ letters and working notes.”',
        ['They say cliffhangers do NOT by themselves prove it.', 'Right — letters and notes are their preferred evidence.', 'They caution against overstatement, not against the whole idea.', 'They say single-volume novels ALSO contain multiple plotlines.', 'They say the opposite: not the finished texts.']),
      Q('The author mentions that authors could observe readers’ responses before a story was complete in order to',
        ['illustrate one way serialization could shape a novel', 'show that Victorian readers were unusually critical', 'argue that single-volume novels were inferior', 'explain why serialization was commercially successful', 'refute the more recent scholarship'],
        0,
        'It is listed as a way serialization “shaped the novels in fundamental ways” — authors sometimes revised plans in light of reactions.',
        ['Right — a mechanism of influence.', 'Readers’ temperament is not discussed.', 'No judgment of single-volume novels’ quality is made.', 'Commercial success is not the point here.', 'It supports, not refutes, the newer scholarship.']),
      S('According to the passage, which of the following is true of cliffhangers?',
        ['They appear in some novels that were not serialized.', 'They were required by Victorian publishing law for every serial.', 'Their presence alone doesn’t show serialization shaped a novel.'],
        [0, 2],
        'Paragraph 2: single-volume novels “also contain cliffhangers,” so their presence “does not by itself prove the influence of serialization.”',
        ['Stated: single-volume novels also contain them.', 'Nothing about law is mentioned.', 'Stated directly.']),
    ],
  },
  {
    id: 'sleep-memory',
    difficulty: 2,
    text: `A substantial body of research indicates that sleep contributes to the consolidation of memory — the process by which newly acquired information becomes stable and resistant to interference. In typical experiments, participants learn a task and are tested after an interval that either includes sleep or consists entirely of wakefulness. Those who sleep generally perform better.

Such results do not settle why sleep helps. One possibility is that the sleeping brain actively replays and reorganizes recent experience. Another is more modest: sleep may simply shield new memories from the interference that waking activity produces. The two accounts are difficult to separate, because a sleeping participant is both undergoing whatever active processes sleep involves and avoiding new experiences. Some researchers have attempted to disentangle them by comparing sleep with quiet rest in a darkened room, which reduces interference without producing sleep.`,
    questions: [
      Q('The passage suggests that the two accounts of sleep’s benefit are difficult to separate because',
        ['sleep may involve active processes and also blocks new experiences', 'participants cannot be tested properly right after sleeping', 'quiet rest produces just the same brain activity as sleep does', 'no careful experiments on sleep and memory have ever been done', 'memory consolidation does not actually occur during sleep'],
        0,
        '“A sleeping participant is both undergoing whatever active processes sleep involves and avoiding new experiences.”',
        ['Right — the two factors come bundled together.', 'Participants are tested after sleep in the typical experiment.', 'The passage uses quiet rest precisely because it does NOT produce sleep.', 'The passage describes many such experiments.', 'The passage accepts consolidation.']),
      Q('The comparison between sleep and quiet rest described in the last sentence is designed to',
        ['test whether less interference alone explains sleep’s benefit', 'show that participants prefer resting in darkened rooms', 'prove that sleep does not actually help memory at all', 'measure how long memory consolidation takes to finish', 'demonstrate that the brain replays experiences during rest'],
        0,
        'Quiet rest “reduces interference without producing sleep.” If rest helps as much as sleep, interference reduction may be enough; if sleep helps more, something active is going on.',
        ['Right — it isolates the interference factor.', 'Preferences are irrelevant.', 'The design compares two explanations of a benefit it accepts.', 'Timing is not discussed.', 'Replay during rest is not the hypothesis being tested.']),
      Q('In the passage, the word “modest” most nearly means',
        ['humble in manner', 'limited in its claims', 'inexpensive to make', 'shy around others', 'decent in dress'],
        1,
        'The second account is “more modest”: it claims less — sleep merely shields memories rather than actively reorganizing them.',
        ['A person-trait sense; the account isn’t a person.', 'Right — makes a smaller claim.', 'Nothing about cost.', 'A person-trait sense.', 'Irrelevant sense.']),
      Q('Which of the following, if found, would most support the “active replay” account over the “shielding” account?',
        ['Participants who sleep do better than those who rest quietly as long.', 'Participants who rest quietly perform as well as those who sleep.', 'Participants who stay awake and active perform worst of all groups.', 'Participants remember tasks better in the morning than in the evening.', 'Participants who sleep often report having vivid dreams afterward.'],
        0,
        'Quiet rest provides shielding without sleep. If sleep still beats rest, the extra benefit must come from something sleep does — consistent with active replay.',
        ['Right — sleep adds benefit beyond shielding.', 'This would support shielding being enough.', 'Both accounts predict this.', 'Time of day doesn’t distinguish the accounts.', 'Dreams alone don’t show a memory benefit.']),
    ],
  },
  {
    id: 'commons',
    difficulty: 2,
    text: `An influential argument holds that resources shared by a community — pastures, fisheries, forests — are doomed to overuse. Because each user gains the full benefit of taking more while the cost of depletion is spread across everyone, rational individuals will, the argument goes, exhaust the resource. The only remedies are private ownership or control by a central authority.

Field studies of long-lived communal arrangements have complicated this picture. Researchers documented fisheries, irrigation systems, and grazing lands that communities had managed sustainably for generations without either privatization or outside control. Such arrangements tended to share certain features: clearly defined boundaries, rules adapted to local conditions, participation by users in making the rules, and monitoring by people accountable to the users. The argument for inevitable ruin, these studies suggest, describes not a law of nature but what happens when such institutions are absent.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['qualifying a widely accepted argument with evidence from field studies', 'proving that private ownership of shared resources always fails', 'describing the history of one particular fishery and its decline', 'arguing that central authorities should control all resources', 'explaining why rational individuals overuse shared resources'],
        0,
        'Paragraph 1 presents the influential argument; paragraph 2 says field studies “complicated this picture” and reinterpret the argument’s scope.',
        ['Right — a qualification based on evidence.', 'The passage makes no such claim about private ownership.', 'Several arrangements are discussed, not one history.', 'That is one of the remedies the passage calls into question.', 'That is the argument being qualified, not the passage’s own concern.']),
      Q('According to the passage, the communal arrangements that succeeded tended to include all of the following EXCEPT',
        ['clearly defined boundaries', 'rules adapted to local conditions', 'users’ participation in making rules', 'ownership by a single private individual', 'monitoring by people accountable to users'],
        3,
        'The listed features are boundaries, local rules, user participation, and accountable monitoring — and the arrangements worked “without … privatization.”',
        ['Listed.', 'Listed.', 'Listed.', 'Right — the point is that they worked WITHOUT privatization.', 'Listed.']),
      Q('The author would most likely agree that the “argument for inevitable ruin”',
        ['holds only when certain community institutions are missing', 'is correct in all circumstances, as a law of nature', 'was never supported by any evidence from the real world', 'applies to forests and pastures but not to fisheries', 'shows that communities cannot make rules for themselves'],
        0,
        'The last sentence: it describes “what happens when such institutions are absent.”',
        ['Right — conditional, not universal.', 'The passage denies it is a “law of nature.”', 'The passage doesn’t say it lacked evidence.', 'No such distinction is drawn.', 'The passage shows communities making effective rules.']),
      S('Which of the following does the passage present as remedies proposed by the influential argument?',
        ['Private ownership of the resource', 'Control by a central authority', 'Rules made by users themselves'],
        [0, 1],
        '“The only remedies are private ownership or control by a central authority.” User-made rules come from the field studies, not the argument.',
        ['Proposed by the argument.', 'Proposed by the argument.', 'Found in the field studies — the argument said only the other two would work.']),
    ],
  },
  {
    id: 'impressionism-photo',
    difficulty: 3,
    text: `It is often said that photography freed painting from the obligation to record appearances, leaving painters free to explore light, color, and subjective impression. The claim has an appealing simplicity, and there is some evidence for it: several Impressionist painters were acquainted with photographers, and some compositions — figures cut off at the edge of the canvas, unusual vantage points — resemble the accidental framing of the snapshot.

But the story risks confusing coincidence with cause. The painters’ interest in fleeting effects of light had roots in earlier outdoor sketching traditions, and the cropped compositions have equally plausible sources in Japanese prints, which were widely collected in Paris at the time. Moreover, early photographs required long exposures and could not easily capture the very transience that the Impressionists prized. If photography influenced painting, the influence may have run in a more complicated direction than the familiar story allows.`,
    questions: [
      Q('The author’s primary purpose is to',
        ['challenge an oversimplified account of an artistic influence', 'prove that photography had no effect on painting', 'celebrate the technical achievements of early photographers', 'describe the history of Japanese prints in Paris', 'argue that Impressionism was an unoriginal movement'],
        0,
        'The author grants the claim’s appeal and some evidence, then argues it “risks confusing coincidence with cause.”',
        ['Right — challenges the simple story.', 'Too strong: the author allows that photography may have had SOME influence, just a more complicated one.', 'Photography’s limitations are noted, not celebrated.', 'Japanese prints are one alternative source.', 'Nothing questions the movement’s originality.']),
      Q('The author mentions Japanese prints in order to',
        ['offer another source for a feature credited to photography', 'show that the Impressionist painters disliked photography', 'explain why early photographs required long exposures', 'argue that Japanese art was superior to French art', 'describe how the painters learned outdoor sketching'],
        0,
        'Cropped compositions were cited as evidence of photographic influence; Japanese prints are an “equally plausible” source.',
        ['Right — an alternative explanation.', 'The painters’ feelings about photography aren’t discussed.', 'Exposures are a separate point.', 'No ranking of art traditions.', 'Outdoor sketching is a different, separate root.']),
      Q('Which of the following, if true, would most weaken the author’s argument?',
        ['A painter’s letters describe copying the framing of specific photographs.', 'Japanese prints were collected by many Parisian artists in that period.', 'Early photographs required long exposures to capture an image.', 'Outdoor sketching was common among painters before photography.', 'Some of the Impressionists never even met a photographer.'],
        0,
        'The author says the evidence might reflect coincidence. Direct documentary evidence of copying photographs would show cause, not coincidence.',
        ['Right — direct evidence of photographic influence.', 'This supports the author’s alternative explanation.', 'This is one of the author’s own points.', 'This supports the author’s point about earlier roots.', 'This weakens the influence claim, which helps the author.']),
      Q('The phrase “the influence may have run in a more complicated direction” suggests that the author',
        ['does not rule out some influence of photography on painting', 'believes painting influenced photography more than the reverse', 'is certain that photography had no influence on painting', 'thinks Japanese prints were influenced by photography', 'regards the question of influence as unimportant'],
        0,
        '“If photography influenced painting … may have run in a more complicated direction” — the author allows influence but doubts the simple version.',
        ['Right — influence isn’t ruled out.', 'Possible, but the passage doesn’t claim it.', 'The conditional “if” shows the author is not certain.', 'Not suggested.', 'The whole passage treats it as worth getting right.']),
    ],
  },
  {
    id: 'octopus',
    difficulty: 2,
    text: `The octopus poses an unusual challenge to our intuitions about intelligence. Its capacities are well documented: octopuses can learn to open jars, navigate mazes, and distinguish between individual human caretakers. Yet its nervous system is organized very differently from that of vertebrates. A large proportion of its neurons lie not in the central brain but in the arms, each of which can perform complex movements with considerable independence — an arm severed from the body may continue to reach for and grasp objects.

This distributed arrangement invites the question of where, in an octopus, the "thinking" happens. Some researchers see the arms as semi-autonomous agents coordinated loosely by the brain; others caution that independence of movement need not imply independence of decision. What is clear is that the octopus achieved sophisticated behavior along an evolutionary path separated from ours by hundreds of millions of years, which suggests that complex cognition can arise from more than one kind of neural design.`,
    questions: [
      Q('The passage mentions an arm that continues to grasp objects after being severed in order to',
        ['illustrate the independence of the arms’ movements', 'show that octopuses feel no pain when an arm is lost', 'argue that octopuses are more intelligent than vertebrates', 'describe how octopuses are able to open screw-top jars', 'prove that the arms make all of the octopus’s decisions'],
        0,
        'It follows “each of which can perform complex movements with considerable independence.”',
        ['Right — evidence of the arms’ independence.', 'Pain is never discussed.', 'No ranking of intelligence is offered.', 'Jar-opening is a separate example.', 'The passage notes that movement independence need not imply decision independence.']),
      Q('The researchers who “caution that independence of movement need not imply independence of decision” would most likely agree that',
        ['an arm moving on its own doesn’t show that it chooses its goals', 'octopus arms cannot move at all without signals from the brain', 'octopuses are incapable of learning from experience', 'the octopus’s central brain contains most of its neurons', 'severed arms can learn to find their way through mazes'],
        0,
        'Their point: moving independently ≠ deciding independently.',
        ['Right — movement isn’t choice.', 'They accept that arms move independently.', 'Nothing suggests they deny learning.', 'The passage says a large share of neurons are in the arms.', 'Not claimed.']),
      Q('The author’s final conclusion is that',
        ['complex cognition may arise from very different neural organizations', 'octopuses think primarily with their arms rather than their brain', 'vertebrate intelligence evolved from that of early octopuses', 'intelligence requires a single, centralized brain like a vertebrate’s', 'octopus behavior only looks sophisticated and is not truly so'],
        0,
        '“Complex cognition can arise from more than one kind of neural design.”',
        ['Right — stated directly.', 'This is one side of an unresolved debate.', 'The passage says the paths separated long ago; it does not say one came from the other.', 'The conclusion implies the opposite.', 'The passage calls it sophisticated.']),
      S('According to the passage, octopuses can',
        ['learn to open jars and navigate mazes', 'tell individual human caretakers apart', 'solve problems only with the central brain'],
        [0, 1],
        'Both abilities are listed in paragraph 1. The passage never says problems are solved only centrally — it stresses the arms’ role.',
        ['Listed.', 'Listed.', 'Not stated, and against the passage’s emphasis on the arms.']),
    ],
  },
  {
    id: 'placebo',
    difficulty: 3,
    text: `Clinical trials routinely compare a new drug with a placebo, an inert substance given in the same form. Patients receiving placebos often improve, and this improvement is commonly attributed to the "placebo effect" — a benefit produced by the expectation of treatment. But not all improvement in a placebo group reflects expectation. Many conditions fluctuate naturally, and patients tend to enroll in trials when their symptoms are at their worst; some improvement would therefore occur even without any treatment, a pattern statisticians call regression to the mean.

To estimate the placebo effect itself, a trial needs a third group that receives no treatment at all. Where such comparisons have been made, the difference between placebo and no treatment has often been smaller than the improvement in the placebo group alone would suggest, though it appears to be larger for subjective outcomes, such as reported pain, than for objective measurements.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['separating the placebo effect from other reasons placebo groups improve', 'arguing that placebos are often more effective than real drugs', 'describing how new drugs are manufactured for clinical use', 'criticizing patients who enroll in clinical trials too late', 'explaining why the placebos used in trials contain no active ingredients'],
        0,
        'The key move: “not all improvement in a placebo group reflects expectation” — regression to the mean also contributes, and a no-treatment group is needed to separate them.',
        ['Right.', 'The passage makes no such comparison.', 'Manufacturing isn’t discussed.', 'Enrollment timing is a statistical point, not a criticism.', 'Only mentioned in passing (“inert substance”).']),
      Q('According to the passage, regression to the mean in a trial arises partly because',
        ['patients tend to enroll when their symptoms are worst', 'placebos often contain small amounts of the active drug', 'doctors expect their patients to improve during a trial', 'objective measurements in trials are often unreliable', 'no-treatment groups are usually too small to be reliable'],
        0,
        '“Patients tend to enroll in trials when their symptoms are at their worst; some improvement would therefore occur even without any treatment.”',
        ['Right.', 'Placebos are described as inert.', 'Doctors’ expectations are not discussed.', 'Not claimed.', 'Group size is not discussed.']),
      Q('It can be inferred that comparing a placebo group with a no-treatment group allows researchers to',
        ['separate the effect of expectation from improvement that happens anyway', 'eliminate the natural fluctuation in patients’ symptoms entirely', 'prove that the drug being tested works better than nothing', 'ensure that patients enroll when their symptoms are at their worst', 'measure objective outcomes only, ignoring what patients report'],
        0,
        'Both groups experience regression to the mean; only the placebo group has the expectation of treatment. The difference isolates the placebo effect.',
        ['Right.', 'Fluctuation still happens; the comparison controls for it rather than eliminating it.', 'The drug group is a separate comparison.', 'Enrollment timing isn’t controlled this way.', 'Both kinds of outcome can be compared.']),
      Q('The passage suggests that the placebo effect is likely to be largest when a trial measures',
        ['pain as reported by patients', 'blood pressure readings', 'laboratory test results', 'body temperature readings', 'the size of a tumor on a scan'],
        0,
        'The difference “appears to be larger for subjective outcomes, such as reported pain, than for objective measurements.”',
        ['Right — a subjective outcome.', 'Objective.', 'Objective.', 'Objective.', 'Objective.']),
    ],
  },
  {
    id: 'waggle',
    difficulty: 1,
    text: `A honeybee that has found a rich source of food can communicate its location to other foragers in the hive by performing a "waggle dance." On the vertical surface of the honeycomb, the bee runs in a straight line while vibrating its body, then circles back to repeat the run. The angle of the straight run relative to vertical corresponds to the angle between the food source and the direction of the sun, and the duration of the waggling indicates the distance: the longer the waggle, the farther the food.

Because the sun moves across the sky during the day, a dancer must adjust the angle of its run over time to keep pointing to the same location. That bees make this adjustment suggests that they can compensate for the sun’s movement — a capacity that requires some internal sense of time.`,
    questions: [
      Q('According to the passage, the duration of the waggle communicates',
        ['the direction of the sun', 'the distance to the food', 'the quality of the food', 'the time of day it was found', 'the number of foragers needed'],
        1,
        '“The duration of the waggling indicates the distance: the longer the waggle, the farther the food.”',
        ['Direction is conveyed by the ANGLE of the run.', 'Right.', 'Not mentioned.', 'Not what the waggle conveys.', 'Not mentioned.']),
      Q('The passage suggests that a bee that danced for the same food source in the morning and the afternoon would',
        ['change the angle of its run', 'change the duration of its waggle', 'stop dancing altogether', 'dance on a horizontal surface', 'keep its whole dance the same'],
        0,
        'The sun moves, so the angle between sun and food changes; bees “must adjust the angle of its run over time.”',
        ['Right.', 'The distance hasn’t changed, so the duration shouldn’t either.', 'Nothing suggests this.', 'The dance is on the vertical comb.', 'The angle must change.']),
      Q('The author concludes that bees have some internal sense of time because they',
        ['adjust their dances for the sun’s movement', 'dance for longer when the food is farther from the hive', 'forage only during the daylight hours of each day', 'return to the hive each time before they dance', 'vibrate their bodies while making the waggle run'],
        0,
        '“That bees make this adjustment suggests … a capacity that requires some internal sense of time.”',
        ['Right.', 'Distance coding doesn’t involve time-keeping.', 'Not discussed.', 'Not the basis of the conclusion.', 'A feature of the dance, not evidence of time sense.']),
    ],
  },
  {
    id: 'hydrothermal',
    difficulty: 2,
    text: `Until the late twentieth century, it was widely assumed that nearly all life on Earth ultimately depended on sunlight, captured by plants and other photosynthesizers and passed along food chains. The discovery of dense communities of animals around hydrothermal vents on the deep seafloor, where no sunlight penetrates, challenged that assumption. These communities rest on microbes that obtain energy from chemical reactions involving compounds, such as hydrogen sulfide, dissolved in the vent fluids — a process known as chemosynthesis.

The finding has shaped speculation about life elsewhere. If organisms can thrive on chemical energy in total darkness, then environments once considered uninhabitable — the oceans thought to lie beneath the icy crusts of some moons in the outer solar system, for instance — become candidates in the search for life. The vent communities do not show that life exists in such places, of course; they show only that sunlight is not a strict requirement.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['a discovery that revised an assumption about life’s energy sources', 'the chemistry of hydrogen sulfide in hot water from the vents', 'proof that life exists on moons in the outer solar system', 'the history of the technology used in deep-sea exploration', 'the role that plants play at the base of most food chains'],
        0,
        'Paragraph 1: the vent discovery challenged the sunlight assumption. Paragraph 2: implications for the search for life.',
        ['Right.', 'A detail.', 'The author explicitly says the vents do not show this.', 'Not discussed.', 'Background only.']),
      Q('The author’s statement that the vent communities “show only that sunlight is not a strict requirement” serves to',
        ['limit the conclusion that can be drawn from the discovery', 'argue that life on icy moons is certain', 'reject the importance of chemosynthesis', 'suggest that vent communities depend on sunlight after all', 'criticize scientists who study other moons'],
        0,
        'It guards against overreaching: the discovery widens the search but doesn’t prove life exists elsewhere.',
        ['Right — it qualifies the implication.', 'The opposite.', 'Chemosynthesis is the point of the discovery.', 'The passage says they live in total darkness.', 'No criticism is made.']),
      Q('In the passage, the word “rest” most nearly means',
        ['relax', 'depend', 'stop moving', 'remain', 'sleep'],
        1,
        '“These communities rest on microbes” — they are supported by, depend on, the microbes.',
        ['Wrong sense.', 'Right.', 'Wrong sense.', 'Close but misses the idea of support.', 'Wrong sense.']),
      S('Which of the following can be inferred from the passage?',
        ['Before the vents were found, sunlight was thought to underlie nearly all life.', 'Chemosynthesis can support animal communities without sunlight.', 'Life has already been found in the oceans beneath some icy moons.'],
        [0, 1],
        'The first is stated; the second follows from animals thriving on microbes that use chemical energy in darkness. The third is explicitly denied.',
        ['Stated in the first sentence.', 'Follows from the description of the vent communities.', 'The passage says the vents “do not show that life exists in such places.”']),
    ],
  },
  {
    id: 'loss-aversion',
    difficulty: 2,
    text: `Standard economic models long assumed that people evaluate outcomes in terms of their final wealth: gaining $100 and then losing $100 should leave a person exactly as satisfied as before. Experiments in behavioral economics suggest otherwise. People typically evaluate outcomes as gains or losses relative to a reference point, often their current situation, and losses loom larger than equivalent gains. Many people will refuse a coin-flip bet that offers an even chance of winning $110 or losing $100, even though the bet has a positive expected value.

This "loss aversion" has been used to explain a range of behavior, from investors’ reluctance to sell stocks that have fallen in value to the tendency of people to value an object more highly once they own it. Its scope remains debated; some studies find the asymmetry weaker when stakes are small or when losses are expected, and critics argue that some apparent examples reflect other factors entirely.`,
    questions: [
      Q('The coin-flip example is used to illustrate that people',
        ['may turn down a favorable bet because a loss weighs more than a gain', 'always calculate the expected value of a bet correctly and act on it', 'prefer small bets to large ones, whatever the odds may be', 'value money only in terms of the total wealth they end up with', 'enjoy gambling regardless of the odds of winning or losing'],
        0,
        'The bet has positive expected value, yet many refuse it — because “losses loom larger than equivalent gains.”',
        ['Right.', 'The example shows they don’t act on expected value.', 'Not the point.', 'That is the standard model the example contradicts.', 'The example shows the opposite: they turn it down.']),
      Q('According to the passage, people typically evaluate outcomes relative to',
        ['a reference point such as their current situation', 'the average wealth of the people around them', 'the total they expect to earn over their lifetimes', 'the recent performance of the stock market', 'the outcomes of the bets they made in the past'],
        0,
        '“Relative to a reference point, often their current situation.”',
        ['Right.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.']),
      Q('The final sentence of the passage primarily serves to',
        ['indicate that the concept’s reach is not fully settled', 'reject the idea of loss aversion entirely, as critics do', 'provide further examples of loss aversion in everyday life', 'explain the standard economic model of how people decide', 'summarize the coin-flip experiment described earlier'],
        0,
        '“Its scope remains debated” — the final sentence adds qualifications.',
        ['Right.', 'Critics question some examples, but the concept isn’t rejected.', 'It offers limits, not examples.', 'That was in the first sentence.', 'Not a summary.']),
      S('Which of the following does the passage present as behavior that loss aversion has been used to explain?',
        ['Investors holding on to stocks that have fallen in value', 'People valuing an object more once they own it', 'People preferring bets with positive expected value'],
        [0, 1],
        'Both are listed as explained behaviors. The third contradicts the coin-flip finding.',
        ['Listed.', 'Listed.', 'The passage shows people REJECTING a positive-expected-value bet.']),
    ],
  },
  {
    id: 'ice-cores',
    difficulty: 1,
    text: `The great ice sheets of Antarctica and Greenland are built from snow that has accumulated, year after year, for hundreds of thousands of years. As the snow is compressed into ice, it traps tiny bubbles of air. By drilling long cylinders of ice, called cores, and analyzing the air in these bubbles, scientists can measure the composition of the atmosphere at the time the bubbles were sealed.

Ice cores have thus become one of the most important archives of Earth’s past climate. Their record is not perfect: near the surface, snow remains porous for decades before the bubbles close, so the air in a given layer is somewhat younger than the ice around it. Researchers correct for this offset, and the resulting records show how atmospheric gases have changed across many cycles of glacial advance and retreat.`,
    questions: [
      Q('According to the passage, scientists use ice cores to',
        ['measure the past composition of the atmosphere', 'predict how much snow will fall in future', 'determine the thickness of modern glaciers', 'study animals that were preserved in the ice', 'measure past ocean temperatures directly'],
        0,
        '“Analyzing the air in these bubbles, scientists can measure the composition of the atmosphere.”',
        ['Right.', 'Not mentioned.', 'Not the purpose described.', 'Not mentioned.', 'Not mentioned.']),
      Q('The passage indicates that the air in a given layer of ice is younger than the ice itself because',
        ['snow remains porous for some time before bubbles close', 'scientists contaminate the cores when drilling', 'air slowly rises up through the solid ice over time', 'the surface ice melts and refreezes every summer', 'bubbles can form only in ice that is already very old'],
        0,
        '“Near the surface, snow remains porous for decades before the bubbles close.”',
        ['Right.', 'Not mentioned.', 'Not claimed.', 'Not claimed.', 'Not claimed.']),
      Q('The author regards ice cores as',
        ['valuable despite a limitation researchers can correct for', 'worthless because of the offset between air and ice ages', 'perfect records of the past with no limitations at all', 'less useful than tree rings as a record of past climate', 'relevant only to the history of Greenland’s climate'],
        0,
        'They are “one of the most important archives,” and “not perfect,” but researchers “correct for this offset.”',
        ['Right.', 'Contradicted.', 'The author says “not perfect.”', 'No comparison is made.', 'Antarctica is also mentioned.']),
    ],
  },
  {
    id: 'gothic',
    difficulty: 2,
    text: `Romanesque churches, which preceded the Gothic style in much of Europe, typically had thick walls with relatively small windows, since the walls had to bear the heavy outward thrust of stone vaults. Gothic builders developed a combination of techniques that changed this balance. Pointed arches directed more of the vault’s weight downward, and flying buttresses — external arms of masonry — carried the remaining outward thrust away from the walls to supports outside the building.

Relieved of much of their structural burden, the walls could be opened up with vast windows of stained glass, and the buildings could rise to greater heights. It would be a mistake, however, to regard the Gothic cathedral simply as an engineering solution. Medieval writers described the luminous interiors in theological terms, as images of heavenly light, and the pursuit of that effect may have driven the engineering as much as the engineering made the effect possible.`,
    questions: [
      Q('According to the passage, flying buttresses allowed Gothic builders to',
        ['reduce the structural load on the walls', 'build thicker and much stronger walls', 'eliminate heavy stone vaults entirely', 'replace pointed arches with round ones', 'lower the height of the buildings'],
        0,
        'They carried outward thrust away from the walls; the walls were “relieved of much of their structural burden.”',
        ['Right.', 'The opposite — walls could be opened up.', 'Vaults remained; their thrust was redirected.', 'Pointed arches were used alongside buttresses.', 'Buildings could rise HIGHER.']),
      Q('The author’s point in the final sentence is that',
        ['aesthetic and religious aims may have driven the engineering', 'Gothic engineering was largely a failure, despite its ambitions', 'medieval writers misunderstood how the buildings actually worked', 'stained glass was more important than the flying buttresses', 'Romanesque churches were more spiritual than Gothic ones'],
        0,
        '“The pursuit of that effect may have driven the engineering as much as the engineering made the effect possible.”',
        ['Right — purpose may have driven technique.', 'Not suggested.', 'Their descriptions are used as evidence, not criticized.', 'No such ranking.', 'Not suggested.']),
      Q('The author would most likely disagree with which statement?',
        ['The Gothic cathedral is best seen purely as a structural solution.', 'Pointed arches directed more of a vault’s weight downward.', 'Romanesque churches had relatively small windows in their thick walls.', 'Medieval writers described luminous interiors as heavenly light.', 'Gothic buildings could rise higher than Romanesque ones.'],
        0,
        '“It would be a mistake … to regard the Gothic cathedral simply as an engineering solution.”',
        ['Right — the author says this would be a mistake.', 'Stated by the author.', 'Stated.', 'Stated.', 'Stated.']),
      Q('In the passage, the word “thrust” most nearly means',
        ['stab or pierce', 'push or pressure', 'main point of an idea', 'sudden lunge forward', 'ambition or drive'],
        1,
        'The “outward thrust of stone vaults” is the pushing force the vaults exert on the walls.',
        ['Wrong sense.', 'Right.', 'The “thrust of an argument” sense — not this one.', 'Close, but the vault’s thrust is continuous pressure, not a movement.', 'Wrong sense.']),
    ],
  },
  {
    id: 'oral-history',
    difficulty: 3,
    text: `Historians have long regarded oral testimony with suspicion. Memories fade and are reshaped by later events, and interviewees may tell the story they believe the interviewer wants. Written documents produced at the time of the events, by contrast, seem to offer a fixed record.

Defenders of oral history respond that this contrast is overdrawn. Contemporary documents were also written by people with interests and blind spots, and they survive selectively: the records of governments and institutions are far more likely to be preserved than the perspectives of those who did not write, or whose writings were not kept. Oral testimony can recover these missing perspectives. Moreover, the ways in which memories are reshaped are not merely noise; how a community remembers an event can itself be an object of historical study. The goal, defenders argue, is not to treat testimony as a flawless window onto the past but to read it, as one reads any source, with attention to how and why it was produced.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['presenting a defense of oral testimony as a historical source', 'arguing that written documents are useless to historians', 'describing how oral history interviews should be recorded', 'explaining why people’s memories fade and change over time', 'comparing government archives with institutional archives'],
        0,
        'Paragraph 1 states the suspicion; paragraph 2 gives defenders’ responses.',
        ['Right.', 'Defenders say documents also have biases — not that they are useless.', 'Not discussed.', 'Mentioned only as part of the critique.', 'Only a detail about survival.']),
      Q('The defenders mentioned in the passage would most likely agree that',
        ['any source, written or oral, should be read with its making in mind', 'oral testimony is always more reliable than written documents', 'memories that have been reshaped over time should be discarded', 'written records preserve every group’s perspective equally well', 'interviewers never influence what the people they interview say'],
        0,
        'The final sentence: read testimony “as one reads any source, with attention to how and why it was produced.”',
        ['Right.', 'They don’t claim superiority, only value.', 'They say reshaping can itself be studied.', 'They say records survive selectively.', 'Not claimed; the concern is acknowledged, not denied.']),
      Q('The author mentions that government records are more likely to be preserved in order to',
        ['show that written sources also have gaps', 'argue that governments are dishonest', 'explain why interviewees fear interviewers', 'prove that oral history is complete', 'describe the history of archives'],
        0,
        'It supports the claim that documents “survive selectively,” leaving perspectives oral history can recover.',
        ['Right.', 'Honesty isn’t the issue; selection is.', 'Unrelated.', 'No source is complete.', 'Not the purpose.']),
      S('According to the passage, which of the following are among the concerns historians have raised about oral testimony?',
        ['Memories can be reshaped by later events.', 'Interviewees may tell the story they think the interviewer wants.', 'Oral testimony cannot recover perspectives missing from documents.'],
        [0, 1],
        'Both concerns are listed in paragraph 1. The third contradicts what defenders say oral testimony CAN do.',
        ['Listed.', 'Listed.', 'Defenders claim it can.']),
    ],
  },
  {
    id: 'enemy-release',
    difficulty: 3,
    text: `Why do some introduced species spread explosively in new regions while remaining unremarkable in their native ranges? One widely discussed explanation, the enemy release hypothesis, holds that introduced species leave behind the herbivores, parasites, and pathogens that kept their populations in check at home. Freed from these enemies, they can devote more resources to growth and reproduction.

The hypothesis has found support: surveys often find that introduced plants host fewer specialized enemies in their new ranges than in their native ones. Yet fewer enemies do not always translate into greater success. Many introduced species with few enemies never become invasive, and some invaders acquire new enemies within decades. Ecologists increasingly treat enemy release as one factor among several — alongside, for instance, the availability of unused resources in the new habitat — rather than as a general explanation.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['evaluating a hypothesis about why some introduced species spread', 'listing the most dangerous invasive plants in the world', 'arguing that introduced species should never be controlled', 'describing how pathogens spread among plants in new habitats', 'proving that invaders never acquire new enemies where they spread'],
        0,
        'The passage explains the hypothesis, cites support, then limits its scope.',
        ['Right.', 'No list is given.', 'No policy argument.', 'Not the focus.', 'The passage says some invaders DO acquire new enemies.']),
      Q('Which of the following, if true, would most challenge the enemy release hypothesis as a general explanation?',
        ['Many introduced species with few enemies fail to spread.', 'Introduced plants host fewer specialized enemies abroad.', 'Invasive species often reproduce rapidly in new habitats.', 'Native species have many enemies in their home ranges.', 'Some habitats have unused resources that newcomers can exploit.'],
        0,
        'If release from enemies were sufficient, species with few enemies should spread. The passage notes that many don’t — a challenge to the hypothesis as a GENERAL explanation.',
        ['Right — and the passage itself cites this.', 'This supports the hypothesis.', 'Consistent with the hypothesis.', 'Background.', 'Supports an additional factor, not a direct challenge.']),
      Q('The author mentions “unused resources in the new habitat” as an example of',
        ['another factor that may contribute to invasiveness', 'evidence against all explanations of invasion', 'a resource that specialized enemies consume', 'a reason that native species decline after an invasion', 'a type of pathogen that attacks introduced plants'],
        0,
        'It is offered as one of the “several” factors alongside enemy release.',
        ['Right.', 'Not suggested.', 'Not suggested.', 'Not discussed.', 'Not a pathogen.']),
      Q('The author’s attitude toward the enemy release hypothesis is best described as',
        ['measured acceptance as a partial explanation', 'complete rejection of it as an explanation', 'uncritical enthusiasm for it as the whole answer', 'indifference to whether it is right or wrong', 'confusion about what it actually means'],
        0,
        'It “has found support” but is best treated “as one factor among several.”',
        ['Right.', 'The author grants it support.', 'The author notes its limits.', 'The author engages seriously.', 'The author explains it clearly.']),
    ],
  },
  {
    id: 'turtles-light',
    difficulty: 1,
    text: `When sea turtle hatchlings emerge from their nests on sandy beaches, usually at night, they must reach the ocean quickly. On a natural beach, the horizon over the sea is typically brighter than the land behind the beach, and hatchlings crawl toward the brighter direction. Artificial lighting from buildings and roads can disrupt this behavior: hatchlings may head inland toward the lights, where many die from exhaustion, predators, or traffic.

Conservation programs in some coastal communities have responded by requiring lights near nesting beaches to be shielded, turned off during nesting season, or replaced with longer-wavelength lighting to which hatchlings are less sensitive. Such measures cost little compared with many conservation efforts, and they illustrate how a small change in human behavior can remove a threat that is invisible to most people.`,
    questions: [
      Q('According to the passage, hatchlings on a natural beach find the ocean by',
        ['crawling toward the brighter horizon', 'following the sound of breaking waves', 'following their mothers to the water', 'moving downhill toward the water', 'moving away from predators on the beach'],
        0,
        '“Hatchlings crawl toward the brighter direction” — the horizon over the sea.',
        ['Right.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.']),
      Q('The passage suggests that artificial lights are harmful to hatchlings mainly because they',
        ['make inland directions appear brighter than the sea', 'raise the temperature of the sand around the nests', 'attract predators to the nests buried in the sand', 'prevent the eggs in the nests from hatching at all', 'confuse the adult turtles that come ashore to nest'],
        0,
        'Hatchlings head toward the brightest direction; lights make that inland.',
        ['Right.', 'Not mentioned.', 'Predators are a consequence of going inland, not what the lights do.', 'Not mentioned.', 'Adults are not discussed.']),
      Q('The author describes the conservation measures as',
        ['cheap and effective against a little-noticed threat', 'costly, but necessary to protect the young turtles', 'unpopular with the residents of coastal towns', 'untested, so their effects are still unknown', 'harmful to other wildlife that lives on the beach'],
        0,
        '“Such measures cost little” and remove “a threat that is invisible to most people.”',
        ['Right.', 'The passage says they cost little.', 'Not mentioned.', 'Not suggested.', 'Not mentioned.']),
    ],
  },
  {
    id: 'polarization',
    difficulty: 3,
    text: `It has become common to blame social media for political polarization. The mechanism usually proposed is the "echo chamber": algorithms show users content that confirms their existing views, and users cluster with like-minded others, so that opinions harden over time.

The empirical picture is more mixed than this account suggests. Several studies have found that most users encounter a wider range of political views online than the echo-chamber metaphor implies, often through acquaintances whose views differ from their own. Some research even suggests that exposure to opposing views can intensify, rather than soften, partisan attitudes — perhaps because such exposure frequently comes in the form of the other side’s most provocative content. Moreover, in some countries polarization began rising before social media became widespread, and it has risen fastest among older adults, the group least likely to use it. None of this shows that social media plays no role; it suggests that the familiar story, in which isolation from opposing views is the culprit, may have the mechanism wrong.`,
    questions: [
      Q('The primary purpose of the passage is to',
        ['question a common account of how social media affects polarization', 'prove that social media has no effect on politics at all', 'recommend new algorithms that social media companies should adopt', 'describe the history of political parties and their supporters', 'argue that older adults use social media more than anyone else'],
        0,
        'The passage presents the echo-chamber account and argues “the familiar story … may have the mechanism wrong.”',
        ['Right.', 'The author explicitly says “None of this shows that social media plays no role.”', 'No recommendations are made.', 'Not discussed.', 'The passage says older adults are the LEAST likely users.']),
      Q('The fact that polarization has risen fastest among older adults is mentioned in order to',
        ['cast doubt on social media as the primary cause of polarization', 'show that older adults are simply more partisan by nature', 'argue that algorithms target older users with political content', 'explain why young people avoid political content online', 'support the echo-chamber account of rising polarization'],
        0,
        'If the group least exposed to social media polarized fastest, social media is unlikely to be the main driver.',
        ['Right.', 'Not claimed.', 'Not claimed.', 'Not discussed.', 'It weakens that account.']),
      Q('According to the passage, exposure to opposing views online may intensify partisan attitudes because',
        ['the other side’s content users see is often its most provocative', 'algorithms hide opposing views from most users most of the time', 'users rarely encounter acquaintances with different views', 'older adults share less content online than younger users do', 'opposing views are usually more accurate than people expect'],
        0,
        '“Perhaps because such exposure frequently comes in the form of the other side’s most provocative content.”',
        ['Right.', 'The passage says users see more varied views than assumed.', 'The passage says they often DO, through acquaintances.', 'Irrelevant.', 'Not discussed.']),
      S('Which of the following does the author present as evidence against the echo-chamber account?',
        ['Most users encounter a wide range of views online.', 'In some countries, polarization rose before social media was widespread.', 'Algorithms show users content that confirms their views.'],
        [0, 1],
        'Both are cited as complicating the picture. The third is the echo-chamber account’s own claim.',
        ['Cited as evidence.', 'Cited as evidence.', 'This is the mechanism the account proposes.']),
    ],
  },
  {
    id: 'jazz',
    difficulty: 2,
    text: `Improvisation is sometimes imagined as creation from nothing — the jazz soloist inventing music on the spot, unconstrained by tradition. Musicians themselves tend to describe it differently. Improvisers spend years absorbing the work of earlier players, memorizing phrases, and practicing variations on common harmonic patterns. A spontaneous solo draws on this stored vocabulary much as a fluent speaker draws on words and idioms without composing each sentence from scratch.

This account does not diminish the creativity involved. The skill lies in combining and transforming familiar material in response to the moment — the tempo, the other musicians, the audience — so that the result is new even though its components are not. Seen this way, improvisation is less an escape from tradition than a particularly demanding way of participating in it.`,
    questions: [
      Q('The author compares an improviser to a fluent speaker in order to',
        ['illustrate how improvisation draws on a learned vocabulary', 'argue that music is a true language in every respect', 'show that improvisers memorize entire solos in advance', 'suggest that improvisation requires no practice at all', 'explain why audiences enjoy jazz performances so much'],
        0,
        'A fluent speaker uses stored words and idioms without composing from scratch; so does an improviser.',
        ['Right.', 'Too broad — the comparison is limited to one feature.', 'They memorize phrases, not whole solos.', 'The passage stresses years of practice.', 'Audience enjoyment isn’t discussed.']),
      Q('The author’s view is that improvisation is',
        ['a creative way of working within a tradition', 'creation entirely from nothing', 'mere repetition of memorized music', 'less creative than composition', 'unrelated to the tradition of earlier players'],
        0,
        '“Less an escape from tradition than a particularly demanding way of participating in it.”',
        ['Right.', 'This is the popular image the author rejects.', 'The author stresses combining and transforming, not repeating.', 'No such comparison.', 'The opposite.']),
      Q('In the passage, the phrase “does not diminish the creativity involved” most directly responds to which possible objection?',
        ['If improvisers use memorized phrases, their solos aren’t truly creative.', 'Jazz has become less popular than most other genres of music.', 'Improvisers never listen to the recordings of earlier players.', 'Audiences cannot tell improvised music from music composed in advance.', 'The tempo of a piece does not affect how players improvise.'],
        0,
        'After showing improvisers rely on stored material, the author heads off the objection that this makes them uncreative.',
        ['Right.', 'Not raised.', 'Contradicts the passage.', 'Not raised.', 'Not raised.']),
    ],
  },
  {
    id: 'microbiome',
    difficulty: 2,
    text: `The human gut hosts trillions of microorganisms, collectively called the gut microbiome. Many of these microbes break down dietary fibers that human enzymes cannot digest, producing compounds that the body can absorb and use. The composition of the microbiome varies considerably between individuals and can change with diet, medication, and other factors.

Research linking the microbiome to health has grown rapidly, and popular accounts sometimes present it as the key to conditions ranging from obesity to mood disorders. Scientists tend to be more cautious. Many findings are correlations: people with a given condition may have a distinctive microbiome, but the condition may alter the microbiome rather than the reverse, or both may reflect a third factor such as diet. Establishing causation typically requires experiments — for example, transferring microbes into animals raised without any — and results from such animals do not always carry over to humans.`,
    questions: [
      Q('According to the passage, some gut microbes',
        ['break down fibers that human enzymes cannot digest', 'produce all of the digestive enzymes the body uses', 'cause obesity in every person who carries them', 'are identical in every person, wherever they live', 'cannot be affected by changes in a person’s diet'],
        0,
        '“Many of these microbes break down dietary fibers that human enzymes cannot digest.”',
        ['Right.', 'Not claimed.', 'The passage treats causation as unestablished.', 'Composition “varies considerably.”', 'Composition “can change with diet.”']),
      Q('The author’s point about correlations is that',
        ['a link between microbes and a condition doesn’t show which causes which', 'correlations are always misleading and should simply be ignored', 'the microbiome never has any real influence on a person’s health', 'experiments on animals are unnecessary for showing what causes what', 'diet has no effect on health, whatever the microbes may do'],
        0,
        'The condition may alter the microbiome, or a third factor may drive both.',
        ['Right.', 'Too strong.', 'Too strong — the author calls for evidence, not denial.', 'The author says experiments are usually required.', 'Diet is offered as a possible third factor.']),
      Q('The passage suggests that popular accounts of microbiome research tend to',
        ['overstate what has been established', 'ignore the microbiome entirely', 'describe experiments in careful detail', 'emphasize the limits of animal studies', 'deny any link between diet and health'],
        0,
        'Popular accounts present it “as the key” to many conditions; “scientists tend to be more cautious.”',
        ['Right.', 'The opposite.', 'Not suggested.', 'That’s what scientists emphasize.', 'Not suggested.']),
      Q('The mention of animals raised without any microbes serves to',
        ['give an example of an experiment that could establish causation', 'show that microbes are unnecessary for an animal’s survival', 'argue that research on animals should stop altogether', 'explain how fibers are digested in the absence of microbes', 'prove that animal results always apply to humans as well'],
        0,
        'It is the example of an experiment that can test causation — with the caveat that results may not carry over.',
        ['Right.', 'Not the point.', 'Not argued.', 'Unrelated.', 'The passage says results “do not always carry over.”']),
    ],
  },
  {
    id: 'language-death',
    difficulty: 2,
    text: `Of the roughly seven thousand languages spoken today, a large share are spoken by small communities, and linguists expect many of them to fall silent within this century as younger generations shift to regional or global languages. Documentation projects attempt to record grammars, vocabularies, and recordings of speech before the last fluent speakers are gone.

Some critics argue that documentation, however valuable to scholars, does little for the communities themselves; a grammar in a university library does not keep a language alive. Many linguists now agree and describe their work as collaboration rather than extraction, training community members to record their own languages and producing teaching materials for local schools. Such efforts have helped some communities revive languages that had few remaining speakers, though revitalization depends above all on whether families choose to speak the language at home.`,
    questions: [
      Q('The critics mentioned in the second paragraph object that documentation',
        ['may benefit scholars more than speakers', 'is too expensive to justify continuing', 'records the wrong languages first', 'has never produced a usable grammar', 'is opposed by all of the communities involved'],
        0,
        '“Documentation, however valuable to scholars, does little for the communities themselves.”',
        ['Right.', 'Cost isn’t mentioned.', 'Not mentioned.', 'Not claimed.', 'Not claimed.']),
      Q('The passage suggests that the most important factor in reviving a language is',
        ['whether families speak it at home', 'the number of grammars published', 'funding from universities', 'the size of the regional language', 'the age of the last speakers'],
        0,
        '“Revitalization depends above all on whether families choose to speak the language at home.”',
        ['Right.', 'The passage suggests grammars alone don’t keep languages alive.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.']),
      Q('The shift described in the second paragraph is from',
        ['documentation as extraction to documentation as collaboration', 'studying widespread languages to studying only local ones', 'writing grammars to abandoning field research altogether', 'training academic linguists to training language teachers', 'recording everyday speech to writing printed dictionaries'],
        0,
        'Linguists “describe their work as collaboration rather than extraction.”',
        ['Right.', 'Not the shift described.', 'Research continues.', 'Community members, not teachers per se, are trained.', 'Not the shift described.']),
    ],
  },
  {
    id: 'matilda',
    difficulty: 3,
    text: `Historians of science have documented numerous cases in which credit for a discovery went disproportionately to a more prominent collaborator, often a senior male colleague, while the contributions of junior researchers — frequently women — went unrecognized. Some have argued that such cases reflect a systematic pattern rather than isolated injustices, a pattern reinforced by the tendency of recognition to accumulate: those already known receive more citations, invitations, and awards, which in turn make them better known.

Skeptics respond that assigning credit in collaborative science is inherently difficult, since contributions are often intertwined, and that some celebrated cases have been retold in ways that overstate the overlooked researcher’s role. Yet even granting such difficulties, the skeptics’ point cuts both ways: if credit is hard to assign, there is little reason to assume that the prevailing assignments, which have tended to favor the already prominent, are correct.`,
    questions: [
      Q('The author’s final sentence primarily serves to',
        ['turn the skeptics’ argument into a reason to doubt current credit', 'concede that the skeptics are entirely correct about credit', 'argue that credit for discoveries should never be assigned', 'show that women in fact received most of the scientific awards', 'deny that collaboration makes credit difficult to assign'],
        0,
        '“The skeptics’ point cuts both ways”: if credit is hard to assign, the prevailing assignments — which favor the prominent — aren’t necessarily right.',
        ['Right.', 'The author grants a point but turns it.', 'Not argued.', 'The passage suggests the opposite.', 'The author grants the difficulty.']),
      Q('According to the passage, recognition tends to “accumulate” because',
        ['those already known get more of what makes them better known', 'junior researchers publish more papers than senior ones do', 'scientific awards are given out more or less at random', 'historians overstate some cases of overlooked scientists', 'true collaboration is rare in most fields of science'],
        0,
        '“Those already known receive more citations, invitations, and awards, which in turn make them better known.”',
        ['Right.', 'Not claimed.', 'Not claimed.', 'That is the skeptics’ point, unrelated to accumulation.', 'Not claimed.']),
      S('Which of the following do the skeptics argue?',
        ['Contributions in collaborative science are often intertwined.', 'Some famous cases have been retold in exaggerated ways.', 'Prevailing assignments of scientific credit are usually wrong.'],
        [0, 1],
        'Both are stated as the skeptics’ response. The third is the author’s counterpoint, and even the author says only there is “little reason to assume” they are correct.',
        ['Skeptics’ point.', 'Skeptics’ point.', 'Not the skeptics’ view.']),
      Q('The author’s attitude toward the claim of a systematic pattern is best described as',
        ['sympathetic, while granting counterarguments', 'dismissive of it as poorly argued', 'neutral and uninterested in the outcome', 'hostile to the historians who study it', 'uncertain about what the claim actually means'],
        0,
        'The author presents the skeptics fairly (“even granting such difficulties”) but ends by undercutting their position.',
        ['Right.', 'The author sides against the skeptics.', 'The author takes a position.', 'Historians are presented respectfully.', 'The claim is explained clearly.']),
    ],
  },
  {
    id: 'min-wage',
    difficulty: 3,
    text: `A simple supply-and-demand model predicts that raising the minimum wage above the market wage will reduce employment: when labor becomes more expensive, employers hire less of it. For decades this prediction was treated by many economists as close to settled.

Empirical studies comparing neighboring regions — one that raised its minimum wage and one that did not — complicated the consensus by finding small or undetectable effects on employment in several cases. Economists have offered various explanations. In labor markets where a few employers dominate hiring, those employers may pay less than workers would earn in a competitive market, and a minimum wage can raise pay without reducing employment. Higher wages may also reduce costly turnover. None of these explanations implies that a minimum wage can be raised indefinitely without cost; most economists agree that sufficiently large increases would reduce employment. The debate concerns where that threshold lies.`,
    questions: [
      Q('The passage is primarily concerned with',
        ['how evidence complicated a simple economic model’s prediction', 'arguing that minimum wages should be abolished entirely', 'showing that minimum wages have no effects on employment', 'describing the history of labor unions and their wage demands', 'explaining how supply and demand determine prices of goods'],
        0,
        'The simple model predicted job losses; studies found small effects; economists offered explanations; a debate remains about thresholds.',
        ['Right.', 'No policy recommendation is made.', 'The passage says large increases would reduce employment.', 'Not discussed.', 'Labor is the market discussed.']),
      Q('The situation in which “a few employers dominate hiring” is offered as',
        ['one reason a minimum wage might not reduce employment', 'evidence that the simple model of wages is always right', 'a reason that minimum wages cause higher turnover', 'an example of a fully competitive labor market', 'the underlying cause of nearly all unemployment'],
        0,
        'In such markets employers may pay below competitive wages, so a minimum can raise pay without cutting jobs.',
        ['Right.', 'The opposite.', 'Turnover is a separate explanation.', 'It is the opposite of a competitive market.', 'Not claimed.']),
      Q('According to the passage, most economists agree that',
        ['large enough minimum-wage increases would reduce employment', 'the minimum wage has no effect on employment at any level', 'the threshold for job losses has been precisely identified', 'employee turnover has nothing to do with the wages paid', 'studies of neighboring regions are essentially worthless'],
        0,
        '“Most economists agree that sufficiently large increases would reduce employment. The debate concerns where that threshold lies.”',
        ['Right.', 'Contradicted.', 'The threshold is debated.', 'Higher wages may reduce turnover.', 'They are presented as informative.']),
      Q('The author’s tone is best described as',
        ['balanced and explanatory', 'passionately partisan', 'sarcastic about economists', 'dismissive of empirical research', 'nostalgic for older theories'],
        0,
        'The author reports findings and explanations and ends by clarifying the real disagreement.',
        ['Right.', 'No partisanship.', 'No sarcasm.', 'The empirical research is taken seriously.', 'Not nostalgic.']),
    ],
  },
  {
    id: 'harlem',
    difficulty: 3,
    text: `The flowering of Black literature, music, and art in Harlem in the 1920s is often told as a story of creative independence. Yet many writers of the period depended on the support of wealthy patrons and on publishers whose expectations about what Black writing should be were not always shared by the writers themselves. Some patrons favored work that emphasized what they regarded as primitive vitality; some writers chafed at such expectations, while others found ways to use the opportunities patronage provided without fully conforming to them.

Recognizing this dependence does not mean treating the writers as passive. The more interesting question is how they negotiated between the freedom they sought and the conditions under which their work could be published — a negotiation visible, some critics argue, in the ironies and double meanings that run through much of the period’s writing.`,
    questions: [
      Q('The author’s main point is that the writers of the period',
        ['worked within the limits of patronage while negotiating them', 'were entirely controlled by the patrons who funded them', 'had no need of financial support from patrons at all', 'produced work of little lasting value to later readers', 'rejected all publishers and printed their own work'],
        0,
        'The passage stresses dependence on patrons but insists the writers were not passive — they negotiated.',
        ['Right.', '“Does not mean treating the writers as passive.”', 'The passage stresses dependence.', 'No such judgment.', 'They depended on publishers.']),
      Q('The phrase “chafed at” most nearly means',
        ['were irritated by', 'embraced', 'misunderstood', 'profited from', 'wrote about'],
        0,
        'Some writers “chafed at such expectations” — resented them — in contrast to others who used the opportunities.',
        ['Right.', 'The opposite.', 'Not the sense.', 'That’s what the other group did.', 'Not the sense.']),
      Q('The critics mentioned in the final sentence suggest that the writers’ negotiation can be seen in',
        ['the ironies and double meanings in their work', 'the letters they wrote to their patrons', 'their refusal to publish with major firms', 'the sales figures for their published books', 'the architecture of Harlem in that period'],
        0,
        '“A negotiation visible … in the ironies and double meanings that run through much of the period’s writing.”',
        ['Right.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.']),
    ],
  },
  {
    id: 'coral',
    difficulty: 1,
    text: `Reef-building corals live in partnership with microscopic algae that inhabit their tissues. The algae supply the coral with sugars produced by photosynthesis, and in return they receive shelter and nutrients. The algae also give many corals much of their color.

When water becomes unusually warm, this partnership can break down. Stressed corals expel their algae and turn white — an event known as bleaching. Bleached corals are not dead, and if temperatures return to normal soon enough, they may regain their algae and recover. But prolonged or repeated bleaching leaves corals starved of the sugars they depend on, and widespread die-offs can follow.`,
    questions: [
      Q('According to the passage, the algae provide corals with',
        ['sugars from photosynthesis', 'shelter inside their tissues', 'protection from warm water', 'calcium for building skeletons', 'oxygen and nothing else'],
        0,
        '“The algae supply the coral with sugars produced by photosynthesis.”',
        ['Right.', 'The corals provide shelter to the algae.', 'Not claimed.', 'Not mentioned.', 'Not mentioned.']),
      Q('The passage indicates that a bleached coral',
        ['can recover if the water cools again soon enough', 'is always dead, even if the water cools again', 'has taken in more algae than it held before', 'produces more sugar than it did before bleaching', 'cannot survive even a single bleaching event'],
        0,
        '“Bleached corals are not dead, and if temperatures return to normal soon enough, they may regain their algae and recover.”',
        ['Right.', '“Bleached corals are not dead.”', 'They expel algae.', 'They lose their sugar supply.', 'Recovery is possible.']),
      Q('It can be inferred that bleached corals appear white mainly because',
        ['they have lost the algae that gave them color', 'warm water bleaches their stony skeletons', 'they are covered by a layer of pale sand', 'they produce a white pigment when stressed', 'sunlight is reflected by the water above them'],
        0,
        'The algae give corals “much of their color,” and bleached corals have expelled their algae.',
        ['Right.', 'Not stated.', 'Not mentioned.', 'Not mentioned.', 'Not mentioned.']),
    ],
  },
];

// --- generator ------------------------------------------------------------------

const letters = 'ABCDE';

/**
 * Choices are authored in a natural order, often with the right answer
 * first. Deal them into a fixed order per question, with a one-answer
 * question's right answer moved to the slot it is assigned, so across the
 * set every letter is right equally often and the position gives nothing
 * away.
 */
function deal(key: string, options: string[], notes: string[]) {
  const order = shuffle(mulberry32(hashStr(`deal:${key}`)), options.map((_, j) => j));
  return { order, options: order.map((j) => options[j]), notes: order.map((j) => notes[j]) };
}

function build(p: Passage, first: number): Candidate[] {
  return p.questions.map((pq, i) => {
    const text = p.text.trim();
    const key = `${p.id}:${i}`;
    if (Array.isArray(pq.answer)) {
      const d = deal(key, pq.options, pq.notes);
      const answers = (pq.answer as number[]).map((j) => d.order.indexOf(j)).sort((x, y) => x - y);
      return {
        key,
        group: p.id,
        q: {
          kind: 'multi' as const,
          prompt: `${pq.prompt}\n\nConsider each of the choices separately and select all that apply.`,
          options: d.options,
          correctIndices: answers,
          explanation: pq.why,
          distractorNotes: d.notes.map((n, j) => (answers.includes(j) ? `✓ ${n}` : `✗ ${n}`)),
          difficulty: p.difficulty,
          stimulus: { passage: text },
        },
      };
    }
    const d = deal(key, pq.options, pq.notes);
    const t = (first + i) % pq.options.length;
    const at = d.order.indexOf(pq.answer);
    for (const xs of [d.options, d.notes]) [xs[t], xs[at]] = [xs[at], xs[t]];
    return {
      key,
      group: p.id,
      q: {
        kind: 'mcq' as const,
        prompt: pq.prompt,
        options: d.options,
        correctIndex: t,
        explanation: `${pq.why} (Answer: ${letters[t]}.)`,
        distractorNotes: d.notes.map((n, j) => (j === t ? `✓ ${n}` : n)),
        difficulty: p.difficulty,
        stimulus: { passage: text },
      },
    };
  });
}

const rcPassages: Generator = {
  id: 'rc-passages',
  track: 'verbal',
  topic: 'Reading comprehension',
  lessonId: 'gre-rc-method',
  count: PASSAGES.reduce((n, p) => n + p.questions.length, 0),
  all: () => {
    let first = 0;
    return [...PASSAGES]
      .sort((a, b) => a.difficulty - b.difficulty)
      .flatMap((p) => {
        const out = build(p, first);
        first += p.questions.length;
        return out;
      });
  },
};

export const PASSAGE_GENERATORS: Generator[] = [rcPassages];
