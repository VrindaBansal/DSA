// ---------------------------------------------------------------------------
// GRE vocabulary, organized the way it is tested: in CLUSTERS of words that
// share a core meaning. Sentence equivalence rewards knowing that two words
// land in the same cluster; text completion rewards picking the cluster the
// sentence's clue points to.
//
// Each cluster: part of speech, the gist, 3–6 words with short definitions,
// an optional opposite cluster (the classic trap), "near" clusters that are
// too close in meaning to use as distractors, and context sentences.
//
// Sentence rules (so every word in the cluster fits every sentence):
//   - `___` marks the blank; [square brackets] mark the context clue, which
//     is shown plain in the question and quoted in the explanation.
//   - "a ___" / "an ___" is shown as "a(n) ___", exactly as the GRE does, so
//     the article never gives the answer away
//   - verbs are in base form; a noun cluster is all-plural or all-mass
// ---------------------------------------------------------------------------

export type Pos = 'adj' | 'verb' | 'noun';

export interface Cluster {
  id: string;
  pos: Pos;
  gist: string;
  words: { w: string; def: string }[];
  opposite?: string;
  near?: string[];
  frames: string[];
}

function C(
  id: string,
  pos: Pos,
  gist: string,
  words: string,
  frames: string[],
  opts: { opposite?: string; near?: string[] } = {},
): Cluster {
  return {
    id,
    pos,
    gist,
    words: words.split('|').map((s) => {
      const i = s.indexOf(':');
      return { w: s.slice(0, i).trim(), def: s.slice(i + 1).trim() };
    }),
    frames,
    ...opts,
  };
}

export const CLUSTERS: Cluster[] = [
  // =========================================================================
  // ADJECTIVES — character & temperament
  // =========================================================================
  C('stubborn', 'adj', 'stubborn; refusing to budge', `
    obstinate: stubbornly refusing to change one’s mind |
    intransigent: unwilling to compromise |
    recalcitrant: stubbornly resisting authority or control |
    obdurate: hardened against persuasion |
    intractable: hard to manage or persuade`, [
    'Despite eleven hours of negotiation, the union’s spokesperson remained ___, [refusing to budge on even the smallest demand].',
    'The committee had hoped the senator would soften her position, but she proved ___, [rejecting every proposed amendment out of hand].',
    'Parents of toddlers know the ___ phase well: [no amount of coaxing, bargaining, or bribery changes the child’s mind].',
    'Mediators described the two landlords as equally ___: [each insisted the other make every concession].',
  ], { opposite: 'flexible', near: ['rebellious', 'determined', 'dogmatic'] }),

  C('flexible', 'adj', 'open to persuasion; easily influenced', `
    pliant: easily bent or influenced |
    malleable: easily shaped or changed |
    amenable: open and responsive to suggestion |
    tractable: easily managed or controlled`, [
    'Unlike his rigid predecessor, the new manager was ___, [readily adjusting the schedule whenever the team raised a reasonable objection].',
    'The investors hoped to find the board ___, [willing to reshape the company’s strategy to fit their plans].',
    'Young children’s opinions are notoriously ___: [they often adopt whatever view the last adult expressed].',
    'Because the client proved ___, [the architects were able to revise the design three times without complaint].',
  ], { opposite: 'stubborn', near: ['obedient'] }),

  C('obedient', 'adj', 'obedient; submissive', `
    docile: quietly obedient; easily taught |
    compliant: inclined to go along with rules or wishes |
    submissive: ready to yield to others’ authority |
    dutiful: conscientiously doing what is expected`, [
    'The dog had once been wild, but after months of training it was ___, [sitting and staying on the first command].',
    'Critics of the regime noted that its parliament had become ___, [approving every decree without debate].',
    'Far from rebellious, the teenager was ___, [following every household rule without argument].',
    'The colonial administrators preferred ___ local officials [who would carry out orders without question].',
  ], { opposite: 'rebellious', near: ['flexible', 'respectful'] }),

  C('rebellious', 'adj', 'defiant of authority', `
    insubordinate: defiant of authority; disobedient |
    defiant: openly resisting |
    mutinous: openly rebellious against those in charge |
    refractory: stubbornly unmanageable`, [
    'The sergeant reported the private as ___ [for openly refusing the captain’s orders in front of the unit].',
    'After the pay cut, the crew grew ___, [muttering openly about seizing control of the ship].',
    'Rather than accept the new curfew, the ___ students [staged a sit-in outside the dean’s office].',
    'The teacher could manage ordinary mischief, but the ___ class [openly ignored every instruction she gave].',
  ], { opposite: 'obedient', near: ['stubborn'] }),

  C('determined', 'adj', 'persistent; determined', `
    tenacious: holding firmly; persistent |
    dogged: persistent despite difficulty |
    resolute: firmly determined |
    indefatigable: tireless; never giving up |
    persevering: continuing despite setbacks`, [
    'The ___ investigator [spent six years following a trail that everyone else had abandoned].',
    '[Despite a dozen rejections], the ___ novelist kept revising and submitting the manuscript.',
    'Her success owes less to talent than to her ___ effort: [she simply refused to quit when the experiments failed].',
    'Rescue crews remained ___, [digging through the rubble for three days without rest].',
  ], { opposite: 'fickle', near: ['stubborn', 'hardworking', 'steadfast'] }),

  C('steadfast', 'adj', 'loyal and unwavering', `
    steadfast: firm and unwavering in loyalty |
    staunch: loyal and committed |
    unwavering: steady; not changing |
    constant: faithful and dependable`, [
    'Through every scandal, the senator’s ___ supporters [never once questioned their loyalty].',
    'She remained a ___ ally of the cause [even when it cost her friends and her job].',
    'The old dog was a ___ companion, [waiting by the door every evening for twenty years].',
    'Although many donors deserted the museum, a ___ few [continued to give every single year].',
  ], { opposite: 'fickle', near: ['determined'] }),

  C('fickle', 'adj', 'changeable; unpredictable', `
    capricious: given to sudden, unaccountable changes |
    mercurial: subject to sudden changes of mood |
    volatile: liable to change rapidly and unpredictably |
    fickle: changing loyalties or interests frequently |
    erratic: irregular; not predictable`, [
    'The CEO’s ___ temperament kept employees on edge: [she might praise a proposal in the morning and ridicule it by afternoon].',
    'Fashion is famously ___; [what is celebrated one season is mocked the next].',
    'Investors fled the ___ market, [which had swung wildly between record highs and sudden crashes].',
    'The playwright complained that audiences were ___, [adoring a show one week and abandoning it the next].',
  ], { opposite: 'steadfast', near: ['versatile'] }),

  C('versatile', 'adj', 'able to adapt to many roles', `
    versatile: able to do many different things well |
    protean: able to change form or take many roles |
    adaptable: able to adjust to new conditions |
    multifaceted: having many sides or talents`, [
    'A ___ performer, [she moved easily from opera to jazz to stand-up comedy].',
    'The ___ material [can be woven into fabric, molded into car parts, or spun into fiber-optic cable].',
    'The best utility players are ___, [able to cover any position on the field].',
    'His ___ career [spanned medicine, architecture, and, late in life, poetry].',
  ], { near: ['fickle'] }),

  C('talkative', 'adj', 'talkative', `
    loquacious: very talkative |
    garrulous: excessively talkative, especially about trivia |
    voluble: speaking easily, rapidly, and at length |
    chatty: fond of informal talk`, [
    'Our ___ tour guide [never stopped talking, even while we were trying to photograph the paintings].',
    'The normally reserved professor became ___ at the reunion, [telling story after story until midnight].',
    'The ___ passenger in the next seat [kept up a monologue for the entire six-hour flight].',
    'Interviewers love ___ guests, [who fill every silence with anecdotes].',
  ], { opposite: 'taciturn', near: ['wordy'] }),

  C('taciturn', 'adj', 'saying little; reserved', `
    taciturn: habitually silent; saying little |
    reticent: reluctant to reveal one’s thoughts |
    laconic: using very few words |
    uncommunicative: unwilling to talk or share information`, [
    'The ___ farmer [answered each of the reporter’s questions with a single word, if that].',
    'Usually ___ about her personal life, the actress [surprised fans by discussing her childhood at length].',
    'Detectives found the witness ___, [volunteering nothing beyond what was directly asked].',
    'His ___ manner [made colleagues assume he disapproved, when in fact he simply disliked small talk].',
  ], { opposite: 'talkative', near: ['aloof', 'brief'] }),

  C('aloof', 'adj', 'emotionally distant', `
    aloof: cool and distant |
    standoffish: distant and unfriendly |
    detached: emotionally uninvolved |
    remote: distant in manner`, [
    'At the party the new neighbor seemed ___, [standing apart and never joining a conversation].',
    'The critic’s ___ tone [kept the reader at arm’s length, as if the author could not be bothered to care].',
    'Colleagues found the director ___ — [she rarely made eye contact and never lingered to chat].',
    'Fame made the once-friendly singer ___, [ignoring old friends who waved to her in the street].',
  ], { opposite: 'friendly', near: ['taciturn', 'arrogant'] }),

  C('friendly', 'adj', 'warm and friendly', `
    affable: friendly and easy to talk to |
    genial: cheerful and friendly |
    amiable: pleasant and good-natured |
    cordial: warm and polite`, [
    'Customers loved the ___ shopkeeper, [who greeted everyone by name and asked after their families].',
    'The negotiations were surprisingly ___: [the two sides even shared a meal and swapped jokes].',
    'Although her predecessor had been cold, the new dean was ___, [stopping in the hallway to chat with students].',
    'The ___ host [made every guest, even strangers, feel instantly at home].',
  ], { opposite: 'irritable', near: ['cheerful'] }),

  C('irritable', 'adj', 'easily angered', `
    irascible: easily angered |
    choleric: bad-tempered |
    cantankerous: argumentative and bad-tempered |
    testy: easily irritated; impatient |
    splenetic: bad-tempered; spiteful`, [
    'The ___ old editor [would explode in fury over a single misplaced comma].',
    'Lack of sleep made the pilot ___, [snapping at the crew over the slightest delay].',
    'Neighbors avoided the ___ landlord, [who shouted at anyone who parked near his building].',
    'Even his admirers conceded that the composer was ___, [prone to rages that sent musicians fleeing rehearsals].',
  ], { opposite: 'friendly', near: ['hostile'] }),

  C('hostile', 'adj', 'aggressive; eager to fight', `
    belligerent: hostile and aggressive |
    bellicose: eager to fight |
    pugnacious: quick to argue or fight |
    truculent: eager to fight or argue; defiant |
    combative: ready to fight`, [
    'The ___ customer [threatened to punch the clerk over a two-dollar refund].',
    'The dictator’s ___ speeches, [full of threats against neighboring countries], alarmed diplomats.',
    'Known for ___ interviews, the senator [attacked nearly every question as biased].',
    'Rather than seek common ground, the ___ lawyer [treated every procedural point as a battle to be won].',
  ], { opposite: 'conciliatory', near: ['irritable'] }),

  C('conciliatory', 'adj', 'seeking to make peace', `
    conciliatory: intended to placate or make peace |
    placatory: intended to calm anger |
    propitiatory: intended to win back favor |
    pacific: peaceful; peacemaking`, [
    'After the heated exchange, the manager sent a ___ email, [apologizing and offering to meet the team halfway].',
    'The ___ gesture — [returning the disputed land] — ended decades of tension between the two villages.',
    'Hoping to end the strike, the company adopted a ___ tone, [promising to reconsider the pay cuts].',
    'Her ___ remarks [were meant to soothe the offended delegates, not to concede the argument].',
  ], { opposite: 'hostile' }),

  C('flattering', 'adj', 'excessively eager to please', `
    obsequious: excessively eager to please or obey |
    sycophantic: flattering powerful people for advantage |
    fawning: displaying exaggerated flattery |
    servile: excessively submissive |
    unctuous: excessively and insincerely flattering`, [
    'The ___ aide [laughed loudly at every one of the governor’s jokes, however feeble].',
    'Critics dismissed the biography as ___, [an uncritical tribute that praised even its subject’s failures].',
    'The waiter’s ___ manner, [bowing low and praising every choice the diners made], made them uncomfortable.',
    'Courtiers survived by being ___, [telling the king only what he wanted to hear].',
  ], { opposite: 'arrogant', near: ['obedient'] }),

  C('arrogant', 'adj', 'arrogant; looking down on others', `
    haughty: arrogantly superior |
    supercilious: behaving as if one is superior to others |
    imperious: arrogant and domineering |
    condescending: showing patronizing superiority |
    disdainful: showing contempt`, [
    'The ___ duchess [refused to speak directly to servants, addressing them only through her butler].',
    'The critic’s ___ review [treated the young author as a child who had wandered into the wrong room].',
    'His ___ tone — [explaining basic arithmetic to a room full of engineers] — irritated everyone.',
    'Waiters at the ___ restaurant [sniffed at diners who could not pronounce the French dishes].',
  ], { opposite: 'humble', near: ['vain', 'aloof', 'pompous'] }),

  C('humble', 'adj', 'modest; not self-promoting', `
    modest: not boastful about one’s abilities |
    unassuming: not pretentious; modest |
    self-effacing: keeping oneself in the background |
    humble: having a low estimate of one’s importance`, [
    'Despite her Nobel Prize, the chemist was ___, [crediting her students for every discovery].',
    'The ___ billionaire [still drove an old car and ate lunch in the company cafeteria].',
    'In interviews he was ___, [deflecting praise and talking only about his teammates].',
    'The memoir’s ___ tone [surprised readers who expected boasting from so famous a general].',
  ], { opposite: 'arrogant', near: ['shy'] }),

  C('vain', 'adj', 'excessively proud of oneself', `
    vain: excessively proud of one’s appearance or achievements |
    conceited: excessively proud of oneself |
    narcissistic: excessively self-admiring |
    egotistical: self-centered and boastful`, [
    'The ___ actor [checked his reflection in every window he passed].',
    'Colleagues found the professor ___, [steering every conversation back to his own publications].',
    'Her ___ speech [mentioned her own accomplishments thirty times and her team’s not at all].',
    'The ___ king [ordered his portrait hung in every room of the palace].',
  ], { opposite: 'humble', near: ['arrogant'] }),

  C('shy', 'adj', 'shy; lacking confidence', `
    diffident: shy and lacking self-confidence |
    timid: lacking courage or confidence |
    timorous: nervous and fearful |
    bashful: easily embarrassed`, [
    'The ___ student [rarely raised her hand, even when she knew the answer].',
    'Once ___, [he now speaks confidently before audiences of thousands].',
    'The ___ puppy [hid behind the sofa whenever visitors arrived].',
    'Her ___ manner [led interviewers to underestimate her considerable expertise].',
  ], { opposite: 'bold', near: ['humble', 'cowardly'] }),

  C('bold', 'adj', 'fearless; daring', `
    audacious: boldly daring |
    intrepid: fearless; adventurous |
    dauntless: showing fearless determination |
    fearless: lacking fear`, [
    'The ___ explorer [crossed the ice sheet alone, with no radio and no hope of rescue].',
    'It was ___ of the junior analyst to [challenge the chief executive’s forecast in front of the entire board].',
    'Only the most ___ climbers [attempt the north face in winter].',
    'The reporter’s ___ investigation [took her into the heart of the cartel’s territory].',
  ], { opposite: 'shy', near: ['reckless'] }),

  C('cowardly', 'adj', 'cowardly', `
    pusillanimous: showing a lack of courage |
    craven: contemptibly cowardly |
    spineless: lacking courage or resolve |
    cowardly: lacking courage`, [
    'The ___ official [fled the city at the first sign of trouble, abandoning his staff].',
    'Historians condemn the council’s ___ decision to [surrender without even attempting a defense].',
    'Rather than face his critics, the ___ senator [hid in his office and refused all interviews].',
    'The ___ bully [picked only on children much smaller than himself].',
  ], { opposite: 'bold', near: ['shy'] }),

  C('reckless', 'adj', 'rash; heedless of danger', `
    rash: acting without careful thought |
    impetuous: acting quickly without thought |
    heedless: showing no care or attention |
    foolhardy: recklessly bold`, [
    'The ___ investor [sank his entire savings into a company he had researched for five minutes].',
    'It was ___ to [attempt the river crossing during the flood, and the guides refused].',
    'Her ___ decision to [quit her job on a whim] left her without income for a year.',
    'Young drivers can be ___, [speeding through icy roads as though accidents happened only to others].',
  ], { opposite: 'cautious', near: ['bold'] }),

  C('cautious', 'adj', 'careful to avoid risk', `
    circumspect: wary and unwilling to take risks |
    wary: cautious about possible dangers |
    chary: cautiously reluctant |
    guarded: cautious; restrained`, [
    'After being burned twice, the investor was ___, [checking every claim before committing a cent].',
    'Diplomats remained ___ in their public statements, [careful not to say anything that could inflame the crisis].',
    'The ___ doctor [refused to speculate about the diagnosis until every test came back].',
    'Villagers grew ___ of strangers [after a string of robberies].',
  ], { opposite: 'reckless', near: ['wise', 'skeptical'] }),

  C('wise', 'adj', 'showing sound judgment', `
    judicious: having or showing good judgment |
    sagacious: wise and discerning |
    prudent: acting with care for the future |
    sage: profoundly wise`, [
    'The ___ mentor [always knew which battles were worth fighting and which to let pass].',
    'A ___ use of limited funds, [the grant went only to projects with proven results].',
    'Villagers sought the ___ elder’s advice [before any important decision].',
    'Saving part of every paycheck is ___: [it protects you when the unexpected arrives].',
  ], { opposite: 'foolish', near: ['shrewd', 'cautious'] }),

  C('shrewd', 'adj', 'perceptive and sharp', `
    astute: quick to notice and use details to advantage |
    shrewd: sharply perceptive, especially in practical matters |
    perspicacious: having keen insight |
    discerning: showing good judgment and insight`, [
    'The ___ negotiator [noticed immediately that the other side was bluffing].',
    'A ___ reader [will spot the narrator’s unreliability long before the final chapter].',
    'Her ___ analysis [identified the flaw in the company’s accounts that auditors had missed].',
    'Only the most ___ critics [recognized the young painter’s genius at the time].',
  ], { opposite: 'obtuse', near: ['wise'] }),

  C('obtuse', 'adj', 'slow to understand', `
    obtuse: slow to understand |
    dense: slow-witted |
    slow-witted: slow to grasp things |
    imperceptive: failing to notice or understand`, [
    'The manager was so ___ that [he never realized his team was planning to quit en masse].',
    'Hints went unnoticed by the ___ guest, [who stayed long after the hosts began yawning pointedly].',
    'The detective in the novel is deliberately ___, [missing clues that the reader spots at once].',
    'It seemed almost willfully ___ of the committee to [ignore three reports pointing to the same problem].',
  ], { opposite: 'shrewd', near: ['foolish'] }),

  C('foolish', 'adj', 'silly; lacking sense', `
    fatuous: silly and pointless |
    inane: lacking sense or meaning |
    asinine: extremely stupid |
    puerile: childishly silly`, [
    'The comedian’s ___ jokes [drew groans rather than laughter].',
    'Reviewers dismissed the plot as ___, [a string of silly coincidences no adult could take seriously].',
    'The debate descended into ___ name-calling [that insulted the audience’s intelligence].',
    'His ___ remarks [about a serious tragedy embarrassed everyone in the room].',
  ], { opposite: 'wise', near: ['obtuse'] }),

  C('honest', 'adj', 'frank and open', `
    candid: truthful and straightforward |
    forthright: direct and outspoken |
    frank: open and honest in speech |
    outspoken: frank in stating opinions`, [
    'The coach was ___ about the team’s chances: [“We are going to lose, and probably badly.”]',
    'In a surprisingly ___ memoir, [the senator admitted to mistakes she had long denied].',
    'Employees appreciated the CEO’s ___ answers, [which acknowledged the layoffs rather than dodging the question].',
    'Her ___ assessment [left no doubt about the flaws in the proposal].',
  ], { opposite: 'deceitful', near: ['naive'] }),

  C('deceitful', 'adj', 'dishonest; deceptive', `
    duplicitous: deliberately deceitful; double-dealing |
    mendacious: lying; untruthful |
    disingenuous: insincere; pretending to know less than one does |
    deceitful: intending to deceive`, [
    'The ___ broker [assured each client that their money was safe while secretly spending it].',
    'Investigators found the report ___, [full of statistics invented to hide the losses].',
    'It was ___ of the candidate to [claim ignorance of a scheme he had personally approved].',
    'The spy’s ___ career [involved feeding false information to both governments at once].',
  ], { opposite: 'honest', near: ['sly'] }),

  C('sly', 'adj', 'cleverly deceptive', `
    wily: skilled at gaining advantage by deception |
    crafty: clever in a sly way |
    cunning: skilled in trickery |
    artful: clever in a crafty way`, [
    'The ___ fox [doubled back over its own tracks to throw the hounds off the scent].',
    'A ___ politician, [she let her rivals exhaust themselves attacking each other before she entered the race].',
    'The ___ lawyer [phrased each question so the witness could only answer in his client’s favor].',
    'Like many ___ swindlers, [he made his victims believe they were the ones outsmarting him].',
  ], { opposite: 'naive', near: ['deceitful', 'shrewd'] }),

  C('naive', 'adj', 'innocent; unsuspecting', `
    ingenuous: innocent and unsuspecting |
    artless: without guile or deception |
    guileless: innocent; without deception |
    naive: lacking experience or judgment`, [
    'The ___ newcomer [believed every promise the salesman made].',
    'Her ___ question — [“Why don’t they just stop fighting?”] — silenced the room of diplomats.',
    'The film’s ___ hero [trusts everyone, which makes him easy prey for the villains].',
    'The child’s ___ drawings [had a directness that sophisticated artists envied].',
  ], { opposite: 'sly', near: ['honest', 'gullible'] }),

  C('gullible', 'adj', 'easily fooled', `
    credulous: too ready to believe things |
    gullible: easily persuaded to believe something |
    trusting: believing in others’ honesty too readily`, [
    'The con artist targeted ___ tourists [who would believe any story about “limited-time” bargains].',
    'Only the most ___ readers [took the satirical article as real news].',
    'The ___ villagers [paid the traveling quack for bottles of colored water].',
    'Scientists are trained not to be ___: [they demand evidence before accepting any claim].',
  ], { opposite: 'skeptical', near: ['naive'] }),

  C('skeptical', 'adj', 'doubting', `
    skeptical: not easily convinced; doubting |
    incredulous: unwilling or unable to believe |
    dubious: hesitating or doubting |
    doubtful: feeling uncertain`, [
    'The reviewers were ___ of the study’s claims, [noting that it had never been replicated].',
    'Her friends were ___ when she announced her plan, [convinced it could never work].',
    'The jury looked ___ as the defendant [offered his fourth different explanation].',
    'Seasoned investors remain ___ of any fund [that promises high returns with no risk].',
  ], { opposite: 'gullible', near: ['cautious'] }),

  C('hardworking', 'adj', 'diligent; hardworking', `
    industrious: diligent and hardworking |
    diligent: showing care and effort in work |
    assiduous: showing great care and persistence |
    sedulous: persevering and diligent`, [
    'The ___ apprentice [arrived before dawn and left long after the master had gone home].',
    'Her ___ research [involved reading every letter in a twelve-thousand-page archive].',
    'Bees are famously ___, [visiting thousands of flowers each day].',
    'The book reflects ___ scholarship: [every claim is footnoted, every source checked].',
  ], { opposite: 'lazy', near: ['careful', 'determined'] }),

  C('lazy', 'adj', 'lazy; sluggish', `
    indolent: habitually lazy |
    slothful: lazy and inactive |
    lethargic: sluggish and without energy |
    torpid: mentally or physically inactive |
    sluggish: slow-moving; lacking energy`, [
    'The ___ clerk [let the paperwork pile up for weeks rather than lift a finger].',
    'The summer heat left everyone ___, [lying in the shade and barely speaking].',
    'Critics blamed the ___ economy on [years of weak investment and stagnant demand].',
    'After the huge meal the guests grew ___, [dozing in their armchairs].',
  ], { opposite: 'lively', near: ['apathetic'] }),

  C('lively', 'adj', 'full of energy', `
    vivacious: attractively lively |
    spirited: full of energy and determination |
    sprightly: lively; full of energy |
    animated: full of life and excitement`, [
    'At ninety, the ___ grandmother [still danced at every family wedding].',
    'The debate was ___, [with students jumping up to challenge one another].',
    'The ___ puppy [raced around the yard for hours without tiring].',
    'Her ___ lecture [kept even the sleepiest undergraduates wide awake].',
  ], { opposite: 'lazy', near: ['cheerful'] }),

  C('careful', 'adj', 'extremely careful and precise', `
    meticulous: showing great attention to detail |
    scrupulous: diligent and thorough |
    punctilious: showing great attention to detail or correct behavior |
    painstaking: done with great care`, [
    'The ___ restorer [spent a week cleaning a single square inch of the painting].',
    'Her ___ notes [recorded the temperature, humidity, and time of every measurement].',
    'The ___ editor [checked every date and quotation against the original sources].',
    'Surgeons must be ___: [a single overlooked detail can cost a life].',
  ], { opposite: 'sloppy', near: ['hardworking', 'fussy', 'rigorous'] }),

  C('sloppy', 'adj', 'careless; slapdash', `
    slapdash: done too hurriedly and carelessly |
    slipshod: careless; poorly done |
    sloppy: careless and unsystematic |
    careless: not giving enough attention`, [
    'The ___ repairs [began leaking again within a week].',
    'Reviewers condemned the ___ translation, [riddled with errors a beginner would catch].',
    'His ___ bookkeeping [left the firm unable to say where half its money had gone].',
    'The report was so ___ that [the same table appeared twice with different numbers].',
  ], { opposite: 'careful', near: ['perfunctory', 'chaotic'] }),

  C('perfunctory', 'adj', 'done without real care or interest', `
    perfunctory: carried out with minimum effort or reflection |
    cursory: hasty and not thorough |
    superficial: existing only at the surface; shallow |
    desultory: lacking a plan or enthusiasm`, [
    'The inspector gave the factory only a ___ glance [before signing off on the safety report].',
    'Her ___ apology — [a mumbled “sorry” without looking up] — satisfied no one.',
    'After a ___ search [of just two drawers], he declared the keys lost.',
    'The ___ review [skimmed the book’s first chapter and ignored the rest].',
  ], { opposite: 'careful', near: ['sloppy'] }),

  C('fussy', 'adj', 'hard to please; picky', `
    fastidious: very concerned about accuracy and detail; hard to please |
    finicky: fussy about needs or tastes |
    persnickety: placing too much emphasis on trivial details |
    fussy: hard to satisfy`, [
    'The ___ diner [sent the soup back three times because it was not quite hot enough].',
    'Cats are notoriously ___ eaters, [refusing any food that is not exactly to their liking].',
    'A ___ proofreader, [he objected to a comma that every other editor had accepted].',
    'The ___ collector [rejected any stamp with even the faintest crease].',
  ], { near: ['careful'] }),

  // =========================================================================
  // ADJECTIVES — mood & emotion
  // =========================================================================
  C('cheerful', 'adj', 'full of high spirits', `
    ebullient: cheerful and full of energy |
    exuberant: full of joyful energy |
    buoyant: cheerful and optimistic |
    jovial: cheerful and friendly |
    effervescent: bubbly and lively`, [
    'The ___ crowd [sang and danced in the streets after the victory].',
    'Even after the long delay, the ___ tour guide [kept everyone laughing].',
    'Her ___ mood [was infectious; soon the whole office was smiling].',
    'The ___ host [greeted each guest with a booming laugh and a hug].',
  ], { opposite: 'sad', near: ['lively', 'friendly', 'optimistic'] }),

  C('sad', 'adj', 'sorrowful; gloomy', `
    melancholy: pensively sad |
    lugubrious: looking or sounding sad and dismal |
    doleful: expressing sorrow |
    mournful: feeling or expressing grief |
    somber: dark and gloomy in mood`, [
    'The ___ music [brought many of the mourners to tears].',
    'His ___ expression [suggested that the news from the hospital was not good].',
    'The poem’s ___ tone [reflects the poet’s grief after her brother’s death].',
    'A ___ silence [settled over the team after the season-ending loss].',
  ], { opposite: 'cheerful', near: ['dejected', 'pessimistic'] }),

  C('dejected', 'adj', 'dispirited; hopeless', `
    despondent: in low spirits from loss of hope |
    dejected: sad and depressed |
    disconsolate: unable to be comforted |
    crestfallen: sad and disappointed`, [
    'The ___ candidate [conceded the race in a voice barely above a whisper].',
    'After the third rejection letter, the ___ writer [considered giving up entirely].',
    'The ___ child [would not be comforted after losing her dog].',
    'Players sat ___ in the locker room, [heads in their hands].',
  ], { opposite: 'cheerful', near: ['sad', 'pessimistic'] }),

  C('optimistic', 'adj', 'hopeful about the future', `
    sanguine: optimistic, especially in a bad situation |
    optimistic: hopeful and confident about the future |
    hopeful: feeling hope |
    upbeat: cheerful and positive`, [
    'Despite the poor forecast, the farmer remained ___ [that the rains would come in time].',
    'Economists were ___ about the recovery, [predicting strong growth next year].',
    'The doctor’s ___ prognosis [gave the family reason to hope].',
    'Her ___ outlook [survived three failed businesses; she was sure the fourth would succeed].',
  ], { opposite: 'pessimistic', near: ['cheerful'] }),

  C('pessimistic', 'adj', 'expecting the worst', `
    pessimistic: expecting the worst |
    defeatist: expecting or accepting failure |
    gloomy: pessimistic and depressed |
    fatalistic: believing events are fixed and cannot be changed`, [
    'The ___ analyst [predicted a recession every year for a decade].',
    'Soldiers grew ___ [after months without reinforcements, convinced the battle was already lost].',
    'Her ___ attitude — [“Why bother? It will fail anyway.”] — discouraged the whole team.',
    'The report’s ___ conclusion: [the species will almost certainly vanish within twenty years].',
  ], { opposite: 'optimistic', near: ['sad', 'dejected'] }),

  C('calm-person', 'adj', 'calm under pressure', `
    imperturbable: unable to be upset or excited |
    unflappable: calm in a crisis |
    composed: calm and in control of oneself |
    equable: even-tempered`, [
    'The ___ pilot [landed the damaged plane while calmly chatting with the tower].',
    'Even when the protesters began shouting, the speaker remained ___, [finishing her remarks without raising her voice].',
    'Emergency-room nurses must be ___, [staying calm while chaos erupts around them].',
    'His ___ temperament [made him the natural choice to handle the tense negotiations].',
  ], { opposite: 'agitated', near: ['peaceful'] }),

  C('agitated', 'adj', 'nervous and upset', `
    agitated: troubled or nervous |
    distraught: deeply upset |
    overwrought: in a state of nervous excitement |
    frantic: wild with fear or anxiety`, [
    'The ___ parents [searched every street, shouting their son’s name].',
    'By the time the police arrived, the witness was ___, [sobbing and unable to speak clearly].',
    'The ___ passengers [crowded the gate agent, demanding answers about the cancelled flight].',
    'He grew increasingly ___ [as the deadline approached with the report unfinished].',
  ], { opposite: 'calm-person' }),

  C('peaceful', 'adj', 'calm and quiet (of places or moods)', `
    placid: calm and peaceful |
    serene: calm, peaceful, and untroubled |
    tranquil: free from disturbance |
    halcyon: idyllically calm and happy`, [
    'The ___ lake [lay perfectly still, reflecting the mountains].',
    'After the noise of the city, the monastery felt ___, [its silence broken only by birdsong].',
    'She looked back fondly on the ___ summers [of her childhood, before the war].',
    'The garden’s ___ atmosphere [made it a favorite retreat for exhausted students].',
  ], { opposite: 'turbulent', near: ['calm-person'] }),

  C('turbulent', 'adj', 'full of upheaval', `
    tumultuous: making an uproar; disorderly |
    turbulent: characterized by conflict or disorder |
    tempestuous: stormy; full of strong emotion |
    stormy: full of angry emotion or conflict`, [
    'The couple’s ___ marriage [was marked by loud arguments and dramatic reconciliations].',
    'The country’s ___ history [includes three revolutions in a single century].',
    'The meeting turned ___ [when angry residents began shouting down the council].',
    'Few leaders survived the ___ decade, [when governments fell almost yearly].',
  ], { opposite: 'peaceful', near: ['chaotic'] }),

  C('eager', 'adj', 'enthusiastic; passionate', `
    avid: keenly enthusiastic |
    zealous: fervently devoted |
    ardent: passionately enthusiastic |
    fervent: intensely passionate |
    keen: eager; enthusiastic`, [
    'An ___ birdwatcher, [she rose at four every morning to catch the dawn chorus].',
    'The ___ volunteers [knocked on thousands of doors in the final week of the campaign].',
    'His ___ support for the team [survived thirty losing seasons].',
    'The reform had ___ champions [who spoke about it at every opportunity].',
  ], { opposite: 'apathetic', near: ['cheerful'] }),

  C('apathetic', 'adj', 'showing no interest', `
    apathetic: showing no interest or concern |
    indifferent: having no particular interest |
    unconcerned: not worried or interested |
    blasé: unimpressed through overfamiliarity`, [
    'Organizers worried that ___ voters [would simply stay home on election day].',
    'The students seemed ___, [barely looking up when the famous author entered the room].',
    'Having flown hundreds of times, she was ___ about the turbulence [that terrified the other passengers].',
    'The public remained ___ [to warnings that would have alarmed an earlier generation].',
  ], { opposite: 'eager', near: ['lazy', 'unfeeling'] }),

  C('kind', 'adj', 'kind and compassionate', `
    benevolent: well-meaning and kindly |
    compassionate: showing concern for others’ suffering |
    humane: showing kindness and mercy |
    kindly: kind and warm-hearted`, [
    'The ___ landlord [forgave the rent of tenants who lost their jobs].',
    'Prison reformers argued for more ___ treatment [of inmates, including access to education].',
    'A ___ stranger [paid for the stranded family’s bus tickets home].',
    'The ___ foundation [funds clinics in villages that have never had a doctor].',
  ], { opposite: 'malicious', near: ['generous', 'selfless', 'forgiving'] }),

  C('malicious', 'adj', 'intending harm', `
    malevolent: wishing evil on others |
    malicious: intending to do harm |
    malign: evil in nature or effect |
    baleful: threatening harm; menacing`, [
    'The ___ rumor [was spread deliberately to destroy the candidate’s reputation].',
    'In the fairy tale, a ___ witch [curses the infant princess out of pure spite].',
    'Security experts traced the ___ software [designed to steal banking passwords].',
    'Her ___ glare [left no doubt that she meant him harm].',
  ], { opposite: 'kind', near: ['vindictive', 'unfeeling'] }),

  C('unfeeling', 'adj', 'insensitive to others’ suffering', `
    callous: showing cruel disregard for others |
    insensitive: showing no concern for others’ feelings |
    heartless: completely lacking compassion |
    hard-hearted: incapable of being moved to pity`, [
    'The ___ executive [announced the layoffs by email on Christmas Eve].',
    'It was ___ of the reporter to [question the grieving mother moments after the accident].',
    'Critics called the policy ___, [cutting food aid to children in the middle of a famine].',
    'The ___ landlord [evicted the elderly tenant during a snowstorm].',
  ], { opposite: 'kind', near: ['malicious', 'apathetic'] }),

  C('vindictive', 'adj', 'seeking revenge', `
    vindictive: having a strong desire for revenge |
    vengeful: seeking to harm someone in return for a perceived injury |
    spiteful: showing a desire to hurt or annoy |
    rancorous: characterized by bitter, long-lasting resentment`, [
    'The ___ ex-partner [spent years trying to ruin the business they had once shared].',
    'After losing the election, the ___ mayor [cut funding to every neighborhood that voted against him].',
    'Her ___ review of her former student’s book [seemed motivated more by grudge than by judgment].',
    'The feud grew ___, [each family plotting revenge for the last insult].',
  ], { opposite: 'forgiving', near: ['malicious'] }),

  C('forgiving', 'adj', 'merciful; willing to forgive', `
    magnanimous: generous in forgiving an opponent |
    forgiving: ready to pardon |
    clement: merciful |
    merciful: showing mercy`, [
    'In victory she was ___, [inviting her defeated rival to join her cabinet].',
    'The ___ judge [reduced the sentence, noting the defendant’s genuine remorse].',
    'A ___ friend, [he never mentioned the betrayal again].',
    'Historians praise the general’s ___ treatment of prisoners, [who were fed and released after the war].',
  ], { opposite: 'vindictive', near: ['kind', 'lenient'] }),

  C('generous', 'adj', 'lavishly generous with money', `
    munificent: extremely generous |
    bountiful: generously giving |
    openhanded: generous; giving freely |
    lavish: very generous or extravagant in giving`, [
    'A ___ gift from an anonymous donor [paid for the entire new library].',
    'The ___ patron [funded the young composer for a decade without asking anything in return].',
    'Their ___ hospitality — [a feast, gifts for every guest, rooms for as long as we liked] — overwhelmed us.',
    'The ___ benefactor [left her fortune to the town’s schools].',
  ], { opposite: 'stingy', near: ['selfless', 'kind', 'extravagant'] }),

  C('stingy', 'adj', 'unwilling to spend', `
    parsimonious: unwilling to spend money |
    miserly: hoarding wealth; stingy |
    tightfisted: not willing to spend or give |
    stingy: unwilling to give or spend`, [
    'The ___ millionaire [reused tea bags and haggled over every penny of the tip].',
    'The ___ budget [left the school without enough money for textbooks].',
    'Employees resented the ___ owner, [who refused even to buy coffee for the break room].',
    'He was so ___ that [he walked miles in the rain rather than pay bus fare].',
  ], { opposite: 'generous', near: ['thrifty', 'greedy'] }),

  C('thrifty', 'adj', 'careful with money (approving)', `
    frugal: sparing and economical |
    thrifty: using money carefully |
    economical: giving good value; careful with resources |
    provident: making provision for the future`, [
    'Her ___ habits — [cooking at home, mending old clothes] — let her retire early.',
    'The ___ household [saved a little each month and never went into debt].',
    'A ___ shopper [compares prices and buys only what is needed].',
    'Farmers in the region were ___, [storing grain in good years against the bad].',
  ], { opposite: 'extravagant', near: ['stingy'] }),

  C('extravagant', 'adj', 'wasteful with money', `
    profligate: recklessly extravagant |
    prodigal: wastefully extravagant |
    spendthrift: spending money recklessly |
    wasteful: using resources carelessly`, [
    'The ___ heir [squandered the family fortune on yachts and racehorses within five years].',
    'Taxpayers were outraged by the agency’s ___ spending, [including a gold-plated fountain in its lobby].',
    'After years of ___ living, [he found himself bankrupt at forty].',
    'The ___ government [borrowed heavily to pay for monuments no one needed].',
  ], { opposite: 'thrifty', near: ['generous', 'indulgent'] }),

  C('greedy', 'adj', 'greedy for wealth', `
    avaricious: having extreme greed for wealth |
    rapacious: aggressively greedy |
    covetous: longing to possess what others have |
    acquisitive: excessively interested in acquiring things`, [
    'The ___ landlord [raised rents every month, driving out long-time tenants].',
    '___ loggers [stripped the forest of every valuable tree, leaving nothing to regrow].',
    'The ___ king [taxed his subjects into poverty to fill his treasury].',
    'He cast a ___ eye on [his neighbor’s land, plotting how to acquire it].',
  ], { opposite: 'selfless', near: ['stingy'] }),

  C('selfless', 'adj', 'concerned for others', `
    altruistic: unselfishly concerned for others |
    selfless: concerned more with others than oneself |
    philanthropic: seeking to promote others’ welfare |
    charitable: generous in giving to those in need`, [
    'Her ___ decision to [donate a kidney to a stranger] made headlines.',
    'The ___ foundation [spends every dollar it raises on medical care for the poor].',
    'Soldiers praised the medic’s ___ courage: [he crossed open ground under fire to reach the wounded].',
    'Not all apparently ___ acts are pure: [some donors mainly want their names on buildings].',
  ], { opposite: 'greedy', near: ['generous', 'kind'] }),

  // =========================================================================
  // ADJECTIVES — speech, writing & ideas
  // =========================================================================
  C('brief', 'adj', 'brief and to the point', `
    succinct: briefly and clearly expressed |
    pithy: concise and full of meaning |
    terse: sparing in words; abrupt |
    concise: giving much information in few words`, [
    'The editor cut the rambling essay into a ___ summary [of just three sentences].',
    'Her ___ reply — [“No.”] — ended the discussion.',
    'Good slogans are ___: [a handful of words that stick in the memory].',
    'The ___ report [covered the whole crisis in a single page].',
  ], { opposite: 'wordy', near: ['taciturn'] }),

  C('wordy', 'adj', 'using too many words', `
    verbose: using more words than needed |
    prolix: tediously lengthy |
    long-winded: continuing at tedious length |
    discursive: rambling from subject to subject`, [
    'The ___ report [took forty pages to say what could have been said in two].',
    'Students groaned at the ___ lecture, [which wandered for an hour before reaching its point].',
    'Critics found the novel ___, [padded with digressions that added nothing to the plot].',
    'Even his emails were ___, [burying a one-line request under paragraphs of preamble].',
  ], { opposite: 'brief', near: ['talkative', 'pompous'] }),

  C('pompous', 'adj', 'pompously inflated in language', `
    pompous: affectedly grand or self-important |
    grandiloquent: pompous or extravagant in language |
    bombastic: high-sounding but with little meaning |
    turgid: swollen; overly complex in style`, [
    'The ___ speech [was full of grand phrases but contained no actual proposals].',
    'Readers mocked the memoir’s ___ style, [which described breakfast as though it were a coronation].',
    'Behind the ___ rhetoric — [“a new dawn for civilization”] — was a modest tax cut.',
    'The ___ official [referred to himself in the third person and demanded to be called “Excellency.”]',
  ], { opposite: 'humble', near: ['wordy', 'showy', 'arrogant'] }),

  C('eloquent', 'adj', 'fluent and persuasive in speech', `
    eloquent: fluent and persuasive in speaking or writing |
    articulate: able to express ideas clearly |
    fluent: able to express oneself easily |
    silver-tongued: persuasive and eloquent`, [
    'The ___ lawyer [moved the jury to tears in her closing argument].',
    'Though only sixteen, the activist was remarkably ___, [holding her own against seasoned politicians on live television].',
    'His ___ letters [persuaded dozens of investors to back an untested idea].',
    'An ___ spokesperson [can make even a complicated policy sound simple and compelling].',
  ], { opposite: 'inarticulate', near: ['brief'] }),

  C('inarticulate', 'adj', 'unable to express oneself clearly', `
    inarticulate: unable to express oneself clearly |
    tongue-tied: too shy or nervous to speak |
    incoherent: expressed in a confused, disjointed way |
    halting: slow and hesitant in speech`, [
    'Overcome by nerves, the witness became ___, [stammering and losing the thread of her story].',
    'His ___ apology [was so confused that no one could tell what he was sorry for].',
    'The usually fluent professor grew ___ [when asked about her own role in the scandal].',
    'Exhausted and feverish, the patient gave ___ answers [that made no sense to the doctors].',
  ], { opposite: 'eloquent', near: ['taciturn'] }),

  C('clear', 'adj', 'clear and easy to understand', `
    lucid: expressed clearly; easy to understand |
    pellucid: translucently clear in style |
    perspicuous: clearly expressed |
    intelligible: able to be understood`, [
    'Her ___ explanation [made quantum mechanics understandable to a room of high-school students].',
    'The manual is admirably ___: [even a first-time user can follow every step].',
    'Critics praised the translator’s ___ prose, [which reads as easily as the original].',
    'After the fever broke, the patient was ___ again, [answering questions clearly and sensibly].',
  ], { opposite: 'obscure', near: ['explicit'] }),

  C('obscure', 'adj', 'hard to understand; known to few', `
    abstruse: difficult to understand |
    arcane: understood by few; mysterious |
    recondite: little known; obscure |
    esoteric: intended for a small circle of specialists |
    opaque: hard to understand; not transparent`, [
    'The philosopher’s ___ prose [baffled even specialists in the field].',
    'The lecture on medieval tax law was too ___ for [the general audience, who began leaving at the break].',
    'Only a handful of scholars can follow the ___ debates [of this tiny subfield].',
    'The contract’s ___ language [seemed designed to keep customers from understanding their rights].',
  ], { opposite: 'clear', near: ['ambiguous', 'complicated'] }),

  C('ambiguous', 'adj', 'open to more than one interpretation', `
    ambiguous: open to more than one interpretation |
    equivocal: deliberately unclear or evasive |
    nebulous: vague; ill-defined |
    vague: not clearly expressed`, [
    'The senator’s ___ answer [left both supporters and opponents convinced she agreed with them].',
    'The law’s ___ wording [has produced conflicting rulings in three different courts].',
    'His plans for the company remained ___, [a cloud of buzzwords with no specific goals].',
    'The poem’s ending is deliberately ___: [readers still argue about whether the narrator survives].',
  ], { opposite: 'explicit', near: ['obscure'] }),

  C('explicit', 'adj', 'clear and unmistakable', `
    explicit: stated clearly and in detail |
    unequivocal: leaving no doubt |
    unambiguous: not open to more than one interpretation |
    categorical: unambiguously explicit and direct`, [
    'The instructions were ___: [under no circumstances should the door be left unlocked].',
    'Her ___ denial — [“I never met him, not once”] — left no room for interpretation.',
    'The court issued an ___ ruling [that settled the question for good].',
    'The treaty’s terms are ___, [spelling out exactly which territories each side controls].',
  ], { opposite: 'ambiguous', near: ['clear'] }),

  C('complicated', 'adj', 'extremely complicated', `
    convoluted: extremely complex and difficult to follow |
    labyrinthine: like a maze; intricate |
    byzantine: excessively complicated |
    intricate: very complicated or detailed |
    tortuous: full of twists and turns`, [
    'The novel’s ___ plot [involves forty characters, three timelines, and a dozen secret identities].',
    'Applicants must navigate a ___ bureaucracy [of forms, offices, and conflicting rules].',
    'The tax code has grown so ___ that [even accountants disagree about what it requires].',
    'Her ___ argument [twisted through so many qualifications that listeners lost track of the point].',
  ], { opposite: 'simple', near: ['obscure'] }),

  C('simple', 'adj', 'simple and straightforward', `
    straightforward: uncomplicated and easy |
    uncomplicated: simple; not complex |
    simple: easily understood or done |
    elementary: basic; involving only the simplest ideas`, [
    'The repair turned out to be ___: [a single loose wire, fixed in two minutes].',
    'Unlike the old system, the new form is ___, [asking just five questions].',
    'The solution was so ___ that [everyone wondered why no one had thought of it before].',
    'The recipe is ___ enough [for a child to follow].',
  ], { opposite: 'complicated', near: ['clear'] }),

  C('unoriginal', 'adj', 'overused; clichéd', `
    banal: so lacking in originality as to be boring |
    trite: overused and consequently of little import |
    hackneyed: overused; lacking freshness |
    clichéd: showing a lack of original thought`, [
    'The script was full of ___ dialogue, [lines audiences had heard in a hundred other films].',
    'The speech offered only ___ advice — [“follow your dreams,” “never give up”].',
    'Critics found the ___ plot [entirely predictable from the first scene].',
    'Her ___ metaphors — [“busy as a bee,” “cold as ice”] — weakened an otherwise strong essay.',
  ], { opposite: 'original', near: ['dull', 'ordinary'] }),

  C('original', 'adj', 'new and inventive', `
    novel: new and unusual |
    innovative: introducing new ideas |
    groundbreaking: pioneering; innovative |
    inventive: creative; original`, [
    'The ___ design [used no nails at all, only interlocking wooden joints].',
    'Her ___ approach to teaching math [has since been copied by schools around the world].',
    'Reviewers praised the film’s ___ structure, [telling the story backward from the final scene].',
    'The ___ treatment [was unlike anything doctors had tried before].',
  ], { opposite: 'unoriginal', near: ['eccentric'] }),

  C('dull', 'adj', 'dull and lifeless', `
    insipid: lacking flavor or interest |
    vapid: offering nothing stimulating |
    prosaic: lacking poetic beauty; commonplace |
    pedestrian: lacking inspiration; dull |
    lackluster: lacking energy or brilliance`, [
    'The ___ performance [left the audience yawning long before the intermission].',
    'His ___ prose [turned an exciting adventure into a tedious list of events].',
    'The candidate’s ___ speech [contained nothing memorable or inspiring].',
    'After the spice of the market stalls, the hotel food seemed ___, [bland and flavorless].',
  ], { opposite: 'lively', near: ['unoriginal', 'ordinary'] }),

  C('ordinary', 'adj', 'everyday; commonplace', `
    mundane: lacking excitement; ordinary |
    quotidian: occurring every day; ordinary |
    workaday: ordinary; everyday |
    commonplace: not unusual; ordinary`, [
    'The novel finds beauty in ___ moments — [washing dishes, waiting for a bus].',
    'Astronauts say that after months in orbit, even ___ tasks [like brushing teeth become fascinating].',
    'Her photographs transform ___ objects, [a teacup or a doorknob], into art.',
    'What was once a marvel — [talking to someone across an ocean] — is now utterly ___.',
  ], { opposite: 'anomalous', near: ['dull', 'unoriginal'] }),

  C('anomalous', 'adj', 'deviating from the norm', `
    anomalous: deviating from what is standard or expected |
    aberrant: departing from an accepted standard |
    atypical: not representative of a type |
    irregular: not conforming to the usual pattern`, [
    'The ___ reading [was so far from all the others that scientists assumed the instrument was broken].',
    'Doctors were puzzled by the ___ symptoms, [unlike anything in the textbooks].',
    'The warm January was ___: [the region normally sees snow for weeks].',
    'The researchers excluded one ___ result [that contradicted every other trial].',
  ], { opposite: 'ordinary', near: ['eccentric'] }),

  C('eccentric', 'adj', 'unconventional in behavior', `
    eccentric: unconventional and slightly strange |
    idiosyncratic: peculiar to an individual |
    quirky: having peculiar traits |
    unconventional: not based on what is generally done`, [
    'The ___ inventor [wore a different colored sock on each foot and kept a pet crow].',
    'Her ___ spelling [followed rules known only to herself].',
    'The ___ house [had staircases that led nowhere and doors that opened onto walls].',
    'Colleagues tolerated his ___ habits — [lecturing barefoot, answering email only at dawn] — because his work was brilliant.',
  ], { opposite: 'conventional', near: ['anomalous', 'original', 'heterodox'] }),

  C('conventional', 'adj', 'following accepted norms', `
    orthodox: following established rules or beliefs |
    conventional: based on what is generally done |
    conformist: following accepted behavior |
    traditional: following long-established customs`, [
    'The ___ doctor [refused to consider any treatment not found in the standard textbooks].',
    'Her ___ taste in music [ran to the same classical pieces her parents had loved].',
    'The committee favored ___ designs, [rejecting anything that departed from the town’s established style].',
    'In that ___ town, [everyone went to church, married young, and stayed put].',
  ], { opposite: 'eccentric', near: ['heterodox'] }),

  C('heterodox', 'adj', 'departing from accepted doctrine', `
    heterodox: not conforming with accepted beliefs |
    heretical: holding opinions contrary to accepted doctrine |
    iconoclastic: attacking cherished beliefs |
    unorthodox: contrary to what is usual or accepted`, [
    'The economist’s ___ views [put her at odds with nearly every colleague in her department].',
    'His ___ sermon, [which questioned core doctrines of the church], cost him his post.',
    'The ___ critic [delighted in attacking the reputations of the most revered authors].',
    'Once dismissed as ___, [the theory is now taught in every introductory course].',
  ], { opposite: 'conventional', near: ['eccentric', 'rebellious'] }),

  C('dogmatic', 'adj', 'rigidly asserting opinions', `
    dogmatic: asserting opinions as undeniably true |
    doctrinaire: rigidly applying a theory without regard to practicality |
    opinionated: stubbornly holding one’s views |
    peremptory: insisting on immediate compliance; brooking no disagreement`, [
    'The ___ professor [treated every student objection as proof of ignorance].',
    'Her ___ insistence that [only one method could ever work] alienated colleagues.',
    'Voters tired of the ___ candidate, [who would not admit a single flaw in his platform].',
    'The ___ reformers [applied their theory everywhere, even where it plainly failed].',
  ], { opposite: 'impartial', near: ['stubborn', 'arrogant'] }),

  C('impartial', 'adj', 'unbiased; neutral', `
    impartial: treating all sides equally |
    dispassionate: not influenced by strong emotion |
    disinterested: not influenced by personal advantage; unbiased |
    evenhanded: fair and impartial |
    objective: not influenced by personal feelings`, [
    'The judge must remain ___, [favoring neither the prosecution nor the defense].',
    'A ___ referee [calls fouls the same way no matter which team commits them].',
    'We need a ___ observer, [someone with no stake in the outcome], to review the results.',
    'The historian’s ___ account [gives both sides’ arguments a fair hearing].',
  ], { opposite: 'biased', near: ['calm-person'] }),

  C('biased', 'adj', 'one-sided; prejudiced', `
    partisan: strongly supporting one side |
    prejudiced: having an unfair preconceived opinion |
    tendentious: promoting a particular cause or point of view |
    one-sided: unfairly giving only one point of view`, [
    'The ___ documentary [interviewed only people who agreed with the director].',
    'Critics accused the judge of being ___, [pointing to her ties to one of the parties].',
    'The ___ report [ignored every study that contradicted its conclusion].',
    'In a ___ newspaper, [the other party’s successes are never reported].',
  ], { opposite: 'impartial', near: ['dogmatic'] }),

  C('relevant', 'adj', 'relevant; to the point', `
    pertinent: relevant to the matter at hand |
    germane: relevant and appropriate |
    apposite: apt; appropriate |
    apropos: appropriate to the situation |
    relevant: closely connected to the matter`, [
    'The lawyer objected that the question was not ___ [to the charges before the court].',
    'Her ___ remarks [went straight to the heart of the dispute].',
    'Only ___ details [that bear directly on the case] should be included in the brief.',
    'The quotation was perfectly ___, [capturing the very point the speaker was making].',
  ], { opposite: 'irrelevant' }),

  C('irrelevant', 'adj', 'beside the point', `
    extraneous: irrelevant; not belonging |
    irrelevant: not connected to the matter |
    tangential: only slightly relevant; diverging |
    immaterial: unimportant under the circumstances`, [
    'The editor cut the ___ anecdotes [that distracted from the article’s main argument].',
    'Whether the defendant was wearing a hat is ___ [to the question of guilt].',
    'The lecture wandered into ___ topics [that had nothing to do with the syllabus].',
    'Much of the data was ___, [contributing nothing to the question the study was designed to answer].',
  ], { opposite: 'relevant', near: ['trivial'] }),

  C('trivial', 'adj', 'unimportant', `
    trivial: of little value or importance |
    inconsequential: not important or significant |
    insignificant: too small or unimportant to matter |
    petty: of little importance; trivial`, [
    'The couple argued for hours over ___ matters, [such as who had left a spoon in the sink].',
    'Compared with the budget crisis, the typo in the report was ___ — [hardly worth mentioning].',
    'The manager wasted meetings on ___ details [while the major deadline slipped].',
    'The error seemed ___ at the time, [but it later cost the company millions].',
  ], { opposite: 'crucial', near: ['irrelevant', 'meager'] }),

  C('crucial', 'adj', 'vitally important', `
    crucial: decisive; critically important |
    pivotal: of central importance |
    vital: absolutely necessary |
    paramount: more important than anything else`, [
    'The first hour after a stroke is ___: [treatment given then can prevent permanent damage].',
    'Her testimony proved ___, [turning a case that seemed lost into an acquittal].',
    'For a pilot, safety is ___ — [it outranks schedules, comfort, and cost].',
    'The battle was ___ [because it decided which side would control the river for the rest of the war].',
  ], { opposite: 'trivial' }),

  // =========================================================================
  // ADJECTIVES — quantity, time, and quality of things
  // =========================================================================
  C('fleeting', 'adj', 'short-lived; temporary', `
    ephemeral: lasting a very short time |
    evanescent: quickly fading |
    transient: lasting only a short time |
    fleeting: passing swiftly |
    transitory: not permanent`, [
    'Fame on social media is ___: [today’s sensation is forgotten by next week].',
    'The ___ beauty of the cherry blossoms [draws crowds precisely because it lasts only days].',
    'Mayflies live ___ lives, [often dying within a day of reaching adulthood].',
    'Her happiness proved ___; [by morning the old worries had returned].',
  ], { opposite: 'lasting' }),

  C('lasting', 'adj', 'long-lasting; enduring', `
    enduring: continuing for a long time |
    abiding: lasting; permanent |
    perennial: lasting for a very long time or recurring |
    durable: able to withstand wear; long-lasting`, [
    'Shakespeare’s ___ appeal [shows no sign of fading after four centuries].',
    'Their ___ friendship [survived wars, moves, and sixty years of change].',
    'The ___ debate over free will [has occupied philosophers since antiquity].',
    'The bridge’s ___ design [has withstood a century of floods].',
  ], { opposite: 'fleeting', near: ['steadfast'] }),

  C('ubiquitous', 'adj', 'found everywhere', `
    ubiquitous: present everywhere |
    pervasive: spreading widely through an area |
    omnipresent: widely or constantly encountered |
    prevalent: widespread in a particular area`, [
    'Smartphones are now ___: [you see them in every café, classroom, and bus].',
    'The smell of smoke was ___, [seeping into every room of the house].',
    'Once rare, the invasive plant has become ___ [along every riverbank in the state].',
    'Advertising is so ___ that [most people no longer notice it].',
  ], { opposite: 'scarce', near: ['abundant'] }),

  C('abundant', 'adj', 'plentiful', `
    abundant: existing in large quantities |
    copious: abundant in supply |
    profuse: produced in great quantity |
    plentiful: existing in great quantity |
    ample: enough or more than enough`, [
    'The ___ harvest [filled every barn in the valley].',
    'She took ___ notes, [filling three notebooks during the conference].',
    'Rainfall was ___ that year, [and the reservoirs overflowed].',
    'The ___ evidence [left the jury in no doubt].',
  ], { opposite: 'scarce', near: ['ubiquitous'] }),

  C('scarce', 'adj', 'in short supply', `
    scarce: insufficient for demand |
    rare: not occurring often |
    scant: barely sufficient |
    sparse: thinly scattered`, [
    'During the drought, water was ___, [rationed to a few liters per family].',
    'Reliable data on the disease remain ___, [since few cases have ever been studied].',
    'The ___ vegetation [of the desert supports only a few hardy species].',
    'Jobs were ___ that winter, [and hundreds applied for every opening].',
  ], { opposite: 'abundant', near: ['meager'] }),

  C('meager', 'adj', 'pitifully small in amount', `
    meager: lacking in quantity or quality |
    paltry: small or meager; worthless |
    measly: contemptibly small |
    negligible: so small as to be not worth considering`, [
    'After years of work, he received a ___ pension [barely enough to pay the rent].',
    'The company offered a ___ settlement — [a few hundred dollars for a ruined house].',
    'The ___ raise [did not even keep pace with inflation].',
    'The side effects were ___, [too small to measure in most patients].',
  ], { opposite: 'abundant', near: ['scarce', 'trivial'] }),

  C('harmful', 'adj', 'harmful; damaging', `
    deleterious: causing harm or damage |
    pernicious: having a harmful effect, especially gradually |
    noxious: harmful, poisonous, or very unpleasant |
    detrimental: tending to cause harm |
    injurious: causing or likely to cause damage`, [
    'Doctors warned about the ___ effects of [smoking on nearly every organ in the body].',
    'The factory released ___ fumes [that killed the trees downwind].',
    'Gossip can be ___, [slowly poisoning the trust among colleagues].',
    'Cutting the research budget would be ___ [to the country’s long-term competitiveness].',
  ], { opposite: 'beneficial', near: ['malicious'] }),

  C('beneficial', 'adj', 'promoting health or well-being', `
    salutary: producing good effects |
    salubrious: health-giving |
    beneficial: resulting in good |
    wholesome: conducive to well-being`, [
    'The ___ mountain air [was said to cure every ailment of the lungs].',
    'The scandal had a ___ effect: [it forced the agency to finally reform its rules].',
    'Daily exercise is ___ [for both body and mind].',
    'Parents sought ___ activities for their children, [like scouting and music lessons].',
  ], { opposite: 'harmful', near: ['harmless'] }),

  C('harmless', 'adj', 'not harmful or offensive', `
    innocuous: not harmful or offensive |
    benign: gentle; not harmful |
    harmless: not able to cause harm |
    inoffensive: not objectionable`, [
    'The snake looks frightening but is entirely ___, [with no venom at all].',
    'Her ___ joke [was taken, bizarrely, as a serious insult].',
    'The biopsy showed the growth was ___, [requiring no treatment].',
    'The question seemed ___, [but it was a trap designed to catch the witness in a lie].',
  ], { opposite: 'harmful', near: ['beneficial', 'kind'] }),

  C('secret', 'adj', 'done secretly', `
    clandestine: kept secret; done secretively |
    covert: not openly acknowledged |
    surreptitious: kept secret because it would not be approved |
    furtive: attempting to avoid notice; sly`, [
    'The rebels held ___ meetings [in basements, changing locations every week to avoid the police].',
    'He cast a ___ glance [at his phone while pretending to listen to the lecture].',
    'The agency ran ___ operations [that even most members of Congress knew nothing about].',
    'The ___ affair [was hidden from friends and family for a decade].',
  ], { opposite: 'overt', near: ['sly'] }),

  C('overt', 'adj', 'open; not hidden', `
    overt: done or shown openly |
    blatant: done openly and unashamedly |
    flagrant: conspicuously offensive |
    conspicuous: clearly visible; attracting notice`, [
    'The referee ignored the ___ foul, [committed right in front of him].',
    'The ___ bribery — [cash handed over in the town square] — shocked even cynical observers.',
    'Her ___ disdain for the rules [made no attempt to disguise itself].',
    'The dent was ___, [visible from across the parking lot].',
  ], { opposite: 'secret' }),

  C('luxurious', 'adj', 'luxurious and costly', `
    opulent: ostentatiously rich and luxurious |
    sumptuous: splendid and expensive-looking |
    luxurious: extremely comfortable and elegant |
    plush: richly luxurious`, [
    'The ___ hotel [had marble floors, silk curtains, and a butler for every suite].',
    'Guests dined on a ___ feast [of lobster, caviar, and rare wines].',
    'The tycoon’s ___ yacht [included a cinema and a helicopter pad].',
    'Critics contrasted the minister’s ___ lifestyle [with the poverty of her constituents].',
  ], { opposite: 'austere', near: ['showy', 'ornate'] }),

  C('austere', 'adj', 'severely plain', `
    austere: severe or strict in appearance; plain |
    spartan: showing extreme simplicity or lack of comfort |
    unadorned: not decorated |
    stark: severe or bare in appearance`, [
    'The monks lived in ___ cells [containing only a bed, a chair, and a crucifix].',
    'The architect favored ___ buildings, [with bare concrete walls and no ornament of any kind].',
    'The ___ barracks [offered recruits nothing but narrow cots and cold showers].',
    'Her ___ prose [avoids adjectives and metaphors almost entirely].',
  ], { opposite: 'ornate', near: ['self-denying'] }),

  C('ornate', 'adj', 'elaborately decorated', `
    ornate: elaborately decorated |
    elaborate: involving many carefully arranged parts |
    florid: excessively elaborate or ornate |
    baroque: extravagantly ornate`, [
    'The ___ ceiling [was covered with gilded angels, clouds, and garlands].',
    'His ___ prose style, [dense with metaphors and flourishes], exhausted readers.',
    'The ___ costume [took seamstresses three months to embroider].',
    'Compared with the ___ palace, [the modern parliament building looks like a box].',
  ], { opposite: 'austere', near: ['showy', 'luxurious', 'pompous'] }),

  C('showy', 'adj', 'designed to impress; flashy', `
    ostentatious: designed to impress or attract notice |
    flamboyant: tending to attract attention through confidence and style |
    garish: obtrusively bright and showy |
    showy: striking in a way meant to impress`, [
    'The ___ mansion, [with its gold faucets and marble statues of the owner], was widely mocked.',
    'The ___ performer [arrived in a sequined cape and a feathered hat].',
    'Old money often considers new wealth ___, [too eager to display itself].',
    'The ___ neon sign [could be seen from miles away].',
  ], { opposite: 'austere', near: ['ornate', 'luxurious', 'pompous'] }),

  C('self-denying', 'adj', 'avoiding indulgence', `
    ascetic: practicing severe self-discipline and avoiding pleasure |
    abstemious: not self-indulgent, especially with food and drink |
    temperate: showing moderation or self-restraint |
    abstinent: refraining from indulgence`, [
    'The ___ hermit [ate a single bowl of rice each day and slept on a bare floor].',
    'Although wealthy, she lived a thoroughly ___ life, [avoiding alcohol, rich food, and luxury].',
    'Monastic orders prized ___ habits — [fasting, silence, and simple dress].',
    'The athlete kept a strictly ___ diet [during training, with no sweets or alcohol].',
  ], { opposite: 'indulgent', near: ['austere', 'thrifty'] }),

  C('indulgent', 'adj', 'devoted to pleasure', `
    hedonistic: devoted to pleasure-seeking |
    sybaritic: fond of luxury and pleasure |
    self-indulgent: indulging one’s own desires |
    epicurean: devoted to refined sensual pleasure`, [
    'The emperor’s ___ court [spent its days in feasts, games, and parties].',
    'His ___ vacations — [champagne, spas, and five-course dinners] — drained his savings.',
    'The novel satirizes the ___ lifestyle [of the idle rich].',
    'Critics found the album ___, [full of long solos that pleased no one but the band].',
  ], { opposite: 'self-denying', near: ['extravagant', 'luxurious'] }),

  C('wealthy', 'adj', 'rich', `
    affluent: having a great deal of money |
    prosperous: successful, especially financially |
    wealthy: having a great deal of money |
    moneyed: having much money`, [
    'The ___ suburb [has the highest average income in the state].',
    'Only ___ families [could afford the school’s tuition].',
    'The once-___ town [fell into poverty when the mine closed].',
    'The ___ merchant [owned ships, warehouses, and half the waterfront].',
  ], { opposite: 'poor', near: ['luxurious'] }),

  C('poor', 'adj', 'very poor', `
    impoverished: made poor |
    indigent: poor; needy |
    destitute: without the basic necessities of life |
    impecunious: having little or no money`, [
    'The clinic serves ___ patients [who cannot afford any other care].',
    'After the war, many families were ___, [without homes, food, or savings].',
    'The ___ student [survived on bread and tea while finishing her degree].',
    'The drought left the region ___, [its farms ruined and its people hungry].',
  ], { opposite: 'wealthy', near: ['meager'] }),

  C('varied', 'adj', 'made up of different kinds', `
    eclectic: deriving from a diverse range of sources |
    heterogeneous: diverse in character or content |
    diverse: showing a great deal of variety |
    motley: incongruously varied`, [
    'Her ___ record collection [ranged from Bach to punk to Malian blues].',
    'The class was ___, [including retirees, teenagers, and working parents].',
    'A ___ crew of [sailors, cooks, and runaway apprentices] manned the ship.',
    'The museum’s ___ holdings [span five continents and four thousand years].',
  ], { opposite: 'uniform' }),

  C('uniform', 'adj', 'all the same', `
    homogeneous: of the same kind; alike |
    uniform: not varying; the same in all cases |
    monolithic: massive and uniform; without variation |
    undifferentiated: not different or differentiated`, [
    'The suburb’s ___ houses [were identical down to the color of their mailboxes].',
    'Pollsters warned against treating voters as a ___ bloc; [their views vary widely].',
    'The mixture must be ___, [with no lumps or streaks of color].',
    'Critics described the party as ___, [with no dissenting voices at all].',
  ], { opposite: 'varied' }),

  C('chaotic', 'adj', 'disorderly', `
    chaotic: in a state of complete confusion |
    disorderly: lacking organization |
    anarchic: with no controlling rules or principles |
    haphazard: lacking order or plan`, [
    'The ___ evacuation, [with no one directing traffic], left thousands stranded.',
    'Her desk was ___: [papers, cups, and books piled in no discernible order].',
    'The meeting grew ___ [as everyone shouted at once].',
    'Books were shelved in ___ fashion, [with no attention to author or subject].',
  ], { opposite: 'orderly', near: ['sloppy', 'turbulent'] }),

  C('orderly', 'adj', 'neatly organized', `
    orderly: neatly and methodically arranged |
    methodical: done according to a systematic procedure |
    systematic: done according to a fixed plan |
    organized: arranged in a systematic way`, [
    'The ___ archive [had every letter labeled, dated, and filed].',
    'A ___ search [of each room in turn] finally turned up the missing ring.',
    'The ___ evacuation [took less than ten minutes, with no injuries].',
    'Her ___ approach — [one step, checked, then the next] — prevented costly errors.',
  ], { opposite: 'chaotic', near: ['careful'] }),

  C('rigorous', 'adj', 'thorough and strict', `
    rigorous: extremely thorough and careful |
    exacting: making great demands on skill or attention |
    demanding: requiring much effort |
    stringent: strict, precise, and exacting`, [
    'The program’s ___ standards [mean that only one applicant in fifty is admitted].',
    'Drugs must pass ___ testing [before they can be sold to the public].',
    'The ___ training [left even veteran athletes exhausted].',
    'Her ___ proof [left no step unjustified].',
  ], { opposite: 'lenient', near: ['careful', 'harsh'] }),

  C('harsh', 'adj', 'severe; punishing', `
    draconian: excessively harsh and severe |
    harsh: cruel or severe |
    severe: very strict or serious |
    punitive: inflicting or intended as punishment`, [
    'The ___ law [imposed a ten-year sentence for stealing a loaf of bread].',
    'Critics called the ___ measures [out of all proportion to the offense].',
    'The school’s ___ discipline [included expulsion for a first late assignment].',
    'The treaty imposed ___ terms [that crippled the defeated nation for a generation].',
  ], { opposite: 'lenient', near: ['rigorous', 'unfeeling'] }),

  C('lenient', 'adj', 'tolerant; not strict', `
    lenient: more merciful or tolerant than expected |
    permissive: allowing great freedom of behavior |
    lax: not strict or careful enough |
    indulgent: allowing too much; lenient`, [
    'The ___ teacher [accepted assignments weeks late with no penalty].',
    'Critics blamed ___ regulation [for letting the banks take reckless risks].',
    'The ___ parents [let the children stay up as late as they liked].',
    'Security at the old airport was ___: [passengers barely had their bags checked].',
  ], { opposite: 'harsh', near: ['forgiving', 'sloppy'] }),

  C('respectful', 'adj', 'showing respect', `
    deferential: showing respect and humility |
    respectful: showing politeness and honor |
    reverent: feeling or showing deep respect |
    courteous: polite and respectful`, [
    'The young officer was ___ toward the general, [standing whenever she entered and never interrupting].',
    'The crowd fell into ___ silence [as the veterans passed].',
    'Visitors must be ___ in the temple, [removing their shoes and speaking softly].',
    'His ___ tone [changed completely once the boss had left the room].',
  ], { opposite: 'impudent', near: ['obedient', 'humble'] }),

  C('impudent', 'adj', 'disrespectful; cheeky', `
    impudent: not showing due respect |
    insolent: showing rude disrespect |
    impertinent: not showing proper respect |
    cheeky: impudent in an amusing way`, [
    'The ___ student [rolled his eyes and told the principal to mind his own business].',
    'Her ___ reply to the judge [earned her a night in jail for contempt].',
    'It was ___ of the intern to [correct the CEO’s grammar in front of the board].',
    'The ___ customer [snapped his fingers at the waiter and demanded faster service].',
  ], { opposite: 'respectful', near: ['rebellious', 'flippant'] }),

  C('humorous', 'adj', 'playfully funny', `
    jocular: fond of joking |
    waggish: humorous in a playful way |
    droll: curious or unusual in a way that provokes dry amusement |
    witty: showing quick, inventive humor`, [
    'The ___ host [kept the audience laughing between every act].',
    'Her ___ remarks [lightened the tense meeting].',
    'The novel’s ___ narrator [comments on every disaster with dry amusement].',
    'A ___ uncle, [he could turn any family dinner into a comedy].',
  ], { opposite: 'serious', near: ['flippant', 'cheerful'] }),

  C('flippant', 'adj', 'inappropriately lighthearted', `
    flippant: not showing a serious attitude when one is needed |
    facetious: treating serious issues with inappropriate humor |
    cavalier: showing a lack of proper concern |
    offhand: casual in a careless or rude way`, [
    'His ___ comments [about the tragedy offended the victims’ families].',
    'The manager’s ___ attitude toward safety — [“accidents happen”] — alarmed the inspectors.',
    'It was ___ of the minister to [joke about unemployment during a recession].',
    'The committee was angered by the ___ response [to a very serious complaint].',
  ], { opposite: 'serious', near: ['humorous', 'impudent'] }),

  C('serious', 'adj', 'solemn and earnest', `
    solemn: formal and dignified; serious |
    grave: serious and solemn |
    earnest: sincere and intensely serious |
    sober: serious, sensible, and solemn`, [
    'The judge read the verdict in a ___ voice [as the courtroom fell silent].',
    'Their ___ faces [told her the news was bad before anyone spoke].',
    'The ___ young volunteer [took every task, however small, with complete seriousness].',
    'After the jokes of the opening, the speech turned ___, [addressing the war and its victims].',
  ], { opposite: 'flippant', near: ['sad'] }),

  // =========================================================================
  // VERBS
  // =========================================================================
  C('praise', 'verb', 'to praise', `
    laud: to praise highly |
    extol: to praise enthusiastically |
    acclaim: to praise publicly and enthusiastically |
    commend: to praise formally |
    applaud: to show strong approval of`, [
    'Critics rushed to ___ the film, [calling it the finest of the decade].',
    'The mayor paused to ___ the firefighters [for their courage during the blaze].',
    'Reviewers who once mocked the composer now ___ [the same symphonies as masterpieces].',
    'It is easy to ___ honesty in principle; [practicing it is harder].',
  ], { opposite: 'criticize', near: ['honor'] }),

  C('criticize', 'verb', 'to criticize harshly', `
    castigate: to reprimand severely |
    excoriate: to criticize severely |
    berate: to scold angrily and at length |
    lambaste: to criticize harshly |
    upbraid: to find fault with; scold`, [
    'The coach would ___ players [for a single missed assignment, screaming until he was hoarse].',
    'Editorials continued to ___ the governor, [calling her response to the flood a disgrace].',
    'Rather than ___ the intern [for the costly error], the manager quietly helped fix it.',
    'Reviewers did not merely dislike the play; they chose to ___ it, [calling it an insult to the audience].',
  ], { opposite: 'praise', near: ['scold', 'belittle'] }),

  C('scold', 'verb', 'to reprimand mildly', `
    admonish: to warn or reprimand firmly but mildly |
    reprove: to reprimand gently |
    chide: to scold mildly |
    reproach: to express disappointment in`, [
    'The librarian had to ___ the students [— gently — for talking during the exam].',
    'She did not shout; she would only ___ the children, [reminding them quietly of the rules].',
    'The judge paused to ___ the lawyer [for interrupting, then let the trial continue].',
    'Parents often ___ teenagers [for coming home late, with more concern than anger].',
  ], { opposite: 'praise', near: ['criticize'] }),

  C('belittle', 'verb', 'to belittle; speak of disparagingly', `
    disparage: to regard or represent as of little worth |
    denigrate: to criticize unfairly; belittle |
    belittle: to make seem unimportant |
    deprecate: to express disapproval of; belittle`, [
    'Insecure critics often ___ the achievements [of younger rivals].',
    'The campaign ads ___ the senator’s record, [dismissing twenty years of work as “nothing”].',
    'It is unfair to ___ her contribution [simply because she was not the lead author].',
    'The coach refused to ___ the opposing team, [calling them worthy champions].',
  ], { opposite: 'praise', near: ['criticize'] }),

  C('honor', 'verb', 'to revere; hold in deep respect', `
    venerate: to regard with great respect |
    revere: to feel deep respect or admiration for |
    idolize: to admire excessively |
    esteem: to respect and admire`, [
    'Villagers ___ the old healer, [bringing her gifts and seeking her blessing].',
    'Many musicians ___ the great jazz pioneers [as almost sacred figures].',
    'The monks ___ the relic, [bowing before it every morning].',
    'Children often ___ older siblings, [copying everything they do].',
  ], { opposite: 'belittle', near: ['praise'] }),

  C('placate', 'verb', 'to calm someone’s anger', `
    placate: to make less angry |
    mollify: to appease the anger of |
    pacify: to quell anger or agitation |
    appease: to calm by giving in to demands |
    propitiate: to win or regain the favor of`, [
    'To ___ the furious customers, [the airline offered free hotel rooms and meal vouchers].',
    'The king tried to ___ the rebels [by abolishing the hated tax].',
    'Nothing the waiter did could ___ the diner, [who continued to shout].',
    'Management hoped a small bonus would ___ the striking workers, [whose anger had shut down the plant for a week].',
  ], { opposite: 'provoke', near: ['soothe'] }),

  C('provoke', 'verb', 'to anger; stir up hostility', `
    antagonize: to cause to become hostile |
    incense: to make very angry |
    rile: to make annoyed or irritated |
    inflame: to provoke or intensify strong feelings`, [
    'His insulting remarks were bound to ___ the delegates, [who walked out in protest].',
    'The new tax only served to ___ the farmers, [who blocked the capital’s roads with tractors].',
    'Careful not to ___ the bear, [the hikers backed away slowly].',
    'The editorial seemed designed to ___ readers, [and angry letters poured in].',
  ], { opposite: 'placate', near: ['incite'] }),

  C('soothe', 'verb', 'to calm a feeling (fear, guilt, suspicion)', `
    assuage: to make an unpleasant feeling less intense |
    allay: to put fears or suspicions at rest |
    soothe: to gently calm |
    quiet: to calm or quell (doubts, fears)`, [
    'The doctor tried to ___ the patient’s fears, [explaining calmly that the procedure was routine].',
    'Nothing anyone said could ___ her guilt [over the accident].',
    'The company released its full accounts to ___ [investors’ suspicions of fraud].',
    'A phone call from her son helped ___ [the mother’s anxiety].',
  ], { opposite: 'worsen', near: ['placate', 'alleviate'] }),

  C('alleviate', 'verb', 'to ease suffering or a problem', `
    alleviate: to make suffering or a problem less severe |
    mitigate: to make less severe or serious |
    palliate: to ease symptoms without curing the cause |
    lessen: to make smaller or less intense`, [
    'Aid shipments helped ___ [the famine’s worst effects, though hunger persisted].',
    'The drug can ___ [the pain, though it cannot cure the disease].',
    'New policies aim to ___ [the hardship caused by the layoffs].',
    'Counseling helped ___ [the suffering of the flood’s survivors].',
  ], { opposite: 'worsen', near: ['soothe', 'reduce'] }),

  C('worsen', 'verb', 'to make worse', `
    exacerbate: to make a problem worse |
    aggravate: to make worse or more serious |
    intensify: to make more intense |
    compound: to make a problem worse by adding to it`, [
    'Cutting the hospital’s budget would only ___ [the already dangerous staffing shortage].',
    'Scratching will ___ the rash, [spreading the irritation].',
    'His angry denial served to ___ the scandal, [drawing even more attention to it].',
    'Drought and war together ___ [the region’s food crisis].',
  ], { opposite: 'alleviate', near: ['provoke'] }),

  C('hinder', 'verb', 'to hinder; get in the way of', `
    impede: to delay or prevent by obstructing |
    hinder: to create difficulties that slow progress |
    hamper: to hinder or impede movement or progress |
    obstruct: to block; get in the way of |
    encumber: to restrict or burden`, [
    'Heavy snow continued to ___ the rescue effort, [slowing trucks to a crawl].',
    'Outdated rules ___ innovation [by requiring years of approval for minor changes].',
    'Her knee injury threatened to ___ her training, [keeping her off the track for weeks].',
    'Bureaucratic delays ___ [the delivery of aid to the flood victims].',
  ], { opposite: 'facilitate', near: ['thwart'] }),

  C('thwart', 'verb', 'to prevent from succeeding', `
    thwart: to prevent someone from accomplishing something |
    foil: to prevent something from succeeding |
    stymie: to prevent the progress of |
    frustrate: to prevent a plan from progressing`, [
    'Alert guards managed to ___ the robbery [before the thieves reached the vault].',
    'The opposition used every procedural trick to ___ the bill, [which never came to a vote].',
    'A sudden storm helped ___ [the climbers’ attempt on the summit, forcing them back to camp].',
    'Encryption can ___ hackers [who would otherwise read the stolen files].',
  ], { opposite: 'facilitate', near: ['hinder'] }),

  C('facilitate', 'verb', 'to make easier', `
    facilitate: to make an action or process easier |
    expedite: to speed up a process |
    ease: to make less difficult |
    streamline: to make a process simpler and more efficient`, [
    'The new software should ___ the hiring process, [cutting paperwork by half].',
    'Translators were hired to ___ communication [between the two delegations].',
    'A special visa program will ___ the arrival of [skilled workers the industry badly needs].',
    'Ramps and wide doors ___ access [for wheelchair users].',
  ], { opposite: 'hinder' }),

  C('bolster', 'verb', 'to support or strengthen', `
    bolster: to support or strengthen |
    buttress: to provide support for (an argument or structure) |
    reinforce: to strengthen with additional support |
    fortify: to strengthen`, [
    'New evidence served to ___ the theory, [making it far harder for critics to dismiss].',
    'The coach hoped a win would ___ [the team’s shaky confidence].',
    'Engineers moved to ___ the old dam [before the spring floods arrived].',
    'She cited three independent studies to ___ her argument, [giving it support the skeptics could not ignore].',
  ], { opposite: 'undermine', near: ['confirm'] }),

  C('undermine', 'verb', 'to weaken gradually', `
    undermine: to weaken gradually or secretly |
    erode: to gradually wear away |
    sap: to gradually weaken |
    weaken: to make less strong`, [
    'Repeated scandals ___ [public trust in the agency, year after year].',
    'Constant criticism can ___ a child’s confidence [until nothing is left].',
    'The long illness continued to ___ [his strength, week by week].',
    'Leaks from inside the cabinet threatened to ___ [the prime minister’s authority].',
  ], { opposite: 'bolster', near: ['thwart'] }),

  C('confirm', 'verb', 'to support with evidence', `
    corroborate: to confirm or give support to (a statement or theory) |
    substantiate: to provide evidence to support |
    validate: to prove or check the validity of |
    verify: to make sure or demonstrate that something is true`, [
    'A second witness came forward to ___ [the victim’s account of the attack].',
    'Laboratory tests may yet ___ [the dealer’s claim that the painting dates from the fifteenth century].',
    'Without documents to ___ his claims, [the court dismissed the case].',
    'Independent labs were able to ___ [the original experiment’s surprising results].',
  ], { opposite: 'disprove', near: ['bolster'] }),

  C('disprove', 'verb', 'to prove false', `
    refute: to prove a statement or theory wrong |
    rebut: to claim or prove that evidence is false |
    disprove: to prove to be false |
    debunk: to expose the falseness of`, [
    'The astronomer set out to ___ the popular myth, [showing that the planets could not have caused the flood].',
    'Defense lawyers produced receipts to ___ [the claim that their client had been in the city that night].',
    'Scientists have repeatedly tried, and failed, to ___ [the theory].',
    'The fact-checkers moved quickly to ___ [the viral rumor, publishing documents that showed it was false].',
  ], { opposite: 'confirm', near: ['renounce'] }),

  C('renounce', 'verb', 'to formally give up or reject', `
    renounce: to formally give up a claim or belief |
    repudiate: to refuse to accept or be associated with |
    disavow: to deny any responsibility for or support of |
    recant: to withdraw a statement or belief publicly |
    abjure: to solemnly renounce`, [
    'Under pressure, the scientist was forced to ___ [the theory he had defended for decades].',
    'After years in the movement, she chose to ___ [the beliefs she had once preached].',
    'Under oath, the witness moved to ___ [the testimony she had given a year earlier, admitting it was false].',
    'Years later, the former extremist chose to publicly ___ [the ideology of his youth].',
  ], { opposite: 'confirm', near: ['disprove', 'abolish'] }),

  C('abolish', 'verb', 'to cancel officially', `
    abrogate: to repeal or do away with (a law or agreement) |
    rescind: to revoke or cancel |
    revoke: to officially cancel |
    annul: to declare invalid`, [
    'The new government moved to ___ [the treaty signed by its predecessor].',
    'After the scandal, the university voted to ___ [the honorary degree it had awarded him].',
    'Voters demanded that the council ___ [the unpopular parking tax].',
    'The board may ___ [the contract if the supplier fails to deliver on time].',
  ], { opposite: 'authorize', near: ['renounce'] }),

  C('authorize', 'verb', 'to give permission', `
    authorize: to give official permission |
    permit: to allow |
    sanction: to give official approval to |
    approve: to officially accept as satisfactory`, [
    'Only the board can ___ [spending over a million dollars].',
    'The city refused to ___ [the construction of a tower in the historic district].',
    'Congress must ___ [any use of the emergency funds].',
    'The agency will not ___ [the new drug until further trials are completed].',
  ], { opposite: 'forbid', near: ['facilitate'] }),

  C('forbid', 'verb', 'to prohibit', `
    proscribe: to forbid, especially by law |
    prohibit: to formally forbid |
    forbid: to refuse to allow |
    outlaw: to make illegal`, [
    'The new regulations ___ [smoking in all public buildings].',
    'Many countries now ___ [the sale of ivory to protect elephants].',
    'Religious law may ___ [certain foods entirely].',
    'The treaty will ___ [the testing of nuclear weapons].',
  ], { opposite: 'authorize' }),

  C('squander', 'verb', 'to waste', `
    squander: to waste in a reckless and foolish manner |
    dissipate: to waste or fritter away |
    waste: to use carelessly or to no purpose`, [
    'The heir managed to ___ [a fortune that had taken three generations to build].',
    'Do not ___ your savings [on lottery tickets].',
    'The team seemed determined to ___ [its early lead, giving up four goals in the final minutes].',
    'Governments that ___ [oil revenues on palaces] have little to show when prices fall.',
  ], { opposite: 'conserve', near: ['extravagant'] }),

  C('conserve', 'verb', 'to save carefully', `
    conserve: to protect from harmful or wasteful use |
    husband: to use economically; conserve |
    preserve: to maintain in its original state |
    save: to keep for future use`, [
    'Marathon runners learn to ___ their energy [for the final miles].',
    'During the drought, residents were urged to ___ water [by skipping lawn watering].',
    'The expedition had to ___ its fuel [to last through the long winter].',
    'Smart managers ___ [their limited resources for the projects that matter most].',
  ], { opposite: 'squander', near: ['thrifty'] }),

  C('postpone', 'verb', 'to delay until later', `
    defer: to put off to a later time |
    postpone: to arrange for something to take place later |
    put off: to postpone |
    delay: to make late or slow; put off`, [
    'Because of the storm, organizers chose to ___ [the concert until next month].',
    'The committee voted to ___ the proposal [until more information was available].',
    'Students may ___ [their enrollment for up to one year].',
    'The company had to ___ [its expansion plans when the recession hit].',
  ], { opposite: 'expedite-go', near: ['procrastinate'] }),

  C('expedite-go', 'verb', 'to speed up', `
    accelerate: to cause to happen sooner or faster |
    hasten: to cause to happen sooner |
    precipitate: to cause to happen suddenly or prematurely |
    quicken: to make faster`, [
    'Warmer temperatures can ___ [the melting of the glaciers, shrinking them years ahead of schedule].',
    'The scandal only served to ___ [the minister’s resignation, which came within days].',
    'Adding a catalyst will ___ [the reaction, finishing it in seconds instead of hours].',
    'Investors’ panic could ___ [the very collapse they feared].',
  ], { opposite: 'postpone', near: ['facilitate'] }),

  C('procrastinate', 'verb', 'to put off action; dawdle', `
    procrastinate: to delay doing something that should be done |
    dawdle: to waste time; move slowly |
    dally: to act or move slowly |
    stall: to delay in order to gain time`, [
    'Students who ___ [until the night before the deadline] rarely write their best essays.',
    'If you ___ [at every shop window], we will miss the train.',
    'The lawyer tried to ___ [by asking for yet another extension].',
    'Writers often ___, [finding a hundred small chores to do instead of writing].',
  ], { near: ['postpone', 'hesitate'] }),

  C('hesitate', 'verb', 'to waver; be indecisive', `
    vacillate: to alternate between opinions |
    waver: to be undecided between choices |
    dither: to be indecisive |
    oscillate: to swing back and forth between positions`, [
    'The voters continued to ___ [between the two candidates until election day].',
    'Leaders who ___ [in a crisis lose the public’s confidence].',
    'She would ___ for hours [over which of two nearly identical dresses to buy].',
    'The council seemed to ___, [approving the plan one week and rejecting it the next].',
  ], { opposite: 'decide', near: ['procrastinate'] }),

  C('decide', 'verb', 'to resolve firmly', `
    resolve: to decide firmly on a course of action |
    determine: to decide on or settle |
    settle: to resolve or reach a decision about |
    decide: to make a choice after consideration`, [
    'After weeks of debate, the council finally had to ___ [whether to build the new bridge].',
    'She sat down to ___ [once and for all which job offer to accept].',
    'The judge will ___ [the matter tomorrow, ending months of uncertainty].',
    'Only a vote can ___ [which of the two proposals will go forward].',
  ], { opposite: 'hesitate' }),

  C('imitate', 'verb', 'to copy', `
    mimic: to imitate, especially to entertain or ridicule |
    ape: to imitate, often clumsily |
    parrot: to repeat mechanically without understanding |
    imitate: to copy`, [
    'The comedian could ___ [every politician’s voice perfectly].',
    'Young writers often ___ [the style of the authors they admire].',
    'Students who merely ___ [the textbook’s phrases] rarely understand the ideas behind them.',
    'The startup tried to ___ [its famous rival’s design down to the color of the logo].',
  ], { near: ['emulate'] }),

  C('emulate', 'verb', 'to try to equal or surpass by imitation', `
    emulate: to match or surpass, typically by imitation |
    rival: to be comparable to |
    equal: to be as good as |
    match: to be equal to`, [
    'Young players strive to ___ [the achievements of their heroes].',
    'Few novelists can ___ [the range of Tolstoy].',
    'The small school hopes to ___ [the success of its famous neighbor].',
    'No other city can ___ [Venice for beauty].',
  ], { near: ['imitate'] }),

  C('spread', 'verb', 'to spread widely', `
    disseminate: to spread widely (information) |
    propagate: to spread and promote an idea |
    circulate: to pass from person to person |
    broadcast: to make widely known`, [
    'Health workers will ___ the information [to every village in the region].',
    'The internet allows anyone to ___ rumors [around the globe within hours].',
    'Scholars wrote pamphlets to ___ [the new ideas throughout Europe].',
    'The agency uses radio to ___ [storm warnings to remote communities].',
  ], { opposite: 'suppress', near: ['incite'] }),

  C('suppress', 'verb', 'to put down; forcibly stop', `
    quash: to put an end to; suppress |
    quell: to put an end to (a rebellion or disorder) |
    stifle: to restrain; prevent from happening |
    squelch: to forcefully silence or suppress |
    suppress: to forcibly put an end to`, [
    'The army was sent to ___ [the uprising in the northern provinces].',
    'Authoritarian regimes ___ [dissent by jailing journalists].',
    'The company tried to ___ the report, [paying the author to keep it unpublished].',
    'Police moved in to ___ [the riot before it could spread to other neighborhoods].',
  ], { opposite: 'incite', near: ['thwart'] }),

  C('incite', 'verb', 'to stir up trouble', `
    foment: to instigate or stir up (trouble) |
    incite: to encourage violent or unlawful behavior |
    instigate: to bring about or initiate (an action) |
    stir up: to provoke or arouse (trouble, feeling)`, [
    'Agitators were accused of trying to ___ [a riot outside the courthouse].',
    'Foreign agents worked to ___ [unrest among the border tribes].',
    'The pamphlets were meant to ___ [rebellion against the crown].',
    'The speech was designed to ___ [anger against the new policy].',
  ], { opposite: 'suppress', near: ['provoke'] }),

  C('deceive', 'verb', 'to trick', `
    deceive: to cause someone to believe something false |
    dupe: to trick or deceive |
    hoodwink: to deceive or trick |
    beguile: to charm or trick someone, often deceptively`, [
    'The con artist managed to ___ [even experienced investors into handing over their savings].',
    'Forgers try to ___ [collectors with fake signatures].',
    'The advertisement was designed to ___ [customers into thinking the product was free].',
    'Magicians happily ___ [their audiences with sleight of hand].',
  ], { near: ['deceitful'] }),

  C('increase', 'verb', 'to add to; increase', `
    augment: to make greater by adding to |
    supplement: to add something to complete or enhance |
    expand: to make larger or more extensive |
    boost: to help or encourage to increase`, [
    'She took a second job to ___ [her modest income].',
    'The museum plans to ___ [its collection with gifts from private donors].',
    'The company hopes the new factory will ___ [its output by a third].',
    'The coach added evening sessions to ___ [the team’s training].',
  ], { opposite: 'reduce', near: ['proliferate', 'exaggerate'] }),

  C('exaggerate', 'verb', 'to overstate', `
    exaggerate: to represent as larger or greater than it is |
    overstate: to state too emphatically |
    inflate: to exaggerate the importance of |
    magnify: to make something seem more important than it is`, [
    'The report tended to ___ the risks, [making a small chance of harm sound like a certainty].',
    'Fishermen are said to ___ [the size of the one that got away].',
    'Critics accused the campaign of trying to ___ [a minor disagreement into a full-blown scandal].',
    'Résumés often ___ [an applicant’s role, turning “helped with” into “led.”]',
  ], { opposite: 'understate', near: ['increase'] }),

  C('understate', 'verb', 'to present as smaller than it is', `
    understate: to describe as smaller or less important than it is |
    downplay: to make something appear less important |
    minimize: to represent as less important |
    trivialize: to make something seem less important than it is`, [
    'Company spokespeople tried to ___ [the leak, calling a major spill “a minor incident.”]',
    'It would be dangerous to ___ [the threat; the storm is the strongest in a century].',
    'The general’s memoir tends to ___ [his own mistakes while dwelling on others’].',
    'Officials were accused of trying to ___ [the outbreak to avoid alarming tourists].',
  ], { opposite: 'exaggerate', near: ['belittle'] }),

  C('reduce', 'verb', 'to cut back', `
    curtail: to reduce in extent or quantity; cut short |
    reduce: to make smaller or less |
    scale back: to reduce in size or extent |
    trim: to reduce by removing excess`, [
    'Budget cuts forced the library to ___ [its opening hours to three days a week].',
    'The company had to ___ [travel and hiring after the losses].',
    'The city voted to ___ [spending on the festival after the budget shortfall].',
    'To meet the deadline, the editor had to ___ [the report from eighty pages to forty].',
  ], { opposite: 'increase', near: ['subside', 'alleviate'] }),

  C('subside', 'verb', 'to grow less; die down', `
    abate: to become less intense |
    wane: to decrease in strength or extent |
    ebb: to gradually lessen |
    subside: to become less intense or severe |
    dwindle: to diminish gradually |
    diminish: to become less`, [
    'Residents waited for the storm to ___ [before venturing outside].',
    'Public interest began to ___ [once the trial ended].',
    'As the fever started to ___, [the patient was able to sit up and eat].',
    'The empire’s power continued to ___ [over the following century].',
  ], { opposite: 'proliferate', near: ['reduce'] }),

  C('proliferate', 'verb', 'to grow or multiply rapidly', `
    proliferate: to increase rapidly in number |
    burgeon: to begin to grow or increase rapidly |
    mushroom: to increase or develop rapidly |
    flourish: to grow or develop vigorously`, [
    'Coffee shops began to ___ [across the city, three opening on a single block].',
    'Without predators, the rabbits continued to ___ [until they overran the island].',
    'Online courses started to ___ [during the pandemic, multiplying almost overnight].',
    'In the warm, wet climate, weeds tend to ___ [faster than the gardeners can pull them].',
  ], { opposite: 'subside', near: ['increase'] }),

  // =========================================================================
  // NOUNS
  // =========================================================================
  C('praise-n', 'noun', 'praise; acclaim (plural)', `
    accolades: awards or expressions of praise |
    plaudits: expressions of praise |
    encomiums: speeches or writings praising someone highly |
    tributes: acts or statements showing admiration`, [
    'The novel earned ___ from critics [who called it the best book of the decade].',
    'At her retirement dinner, colleagues offered warm ___ [for her forty years of service].',
    'The rescue workers received ___ [from the president herself].',
    'Despite the ___ [heaped on the film by reviewers], it failed at the box office.',
  ], { opposite: 'criticism-n' }),

  C('criticism-n', 'noun', 'harsh criticism; disgrace (mass)', `
    censure: formal expression of severe disapproval |
    opprobrium: harsh criticism or public disgrace |
    obloquy: strong public criticism |
    condemnation: expression of strong disapproval`, [
    'The minister’s remarks drew widespread ___, [with even his allies calling for his resignation].',
    'The company faced public ___ [after the pollution scandal was exposed].',
    'Few politicians have endured such ___: [newspapers, rivals, and voters all turned against him].',
    'The decision attracted international ___ [from dozens of governments].',
  ], { opposite: 'praise-n' }),

  C('hostility-n', 'noun', 'hatred; ill will (mass)', `
    animosity: strong hostility |
    enmity: the state of being actively opposed |
    antipathy: a deep-seated feeling of dislike |
    rancor: bitterness or resentfulness, especially long-standing |
    animus: hostility or ill feeling`, [
    'The two families nursed a deep ___ [that had lasted for generations].',
    'There was open ___ between the rivals, [who refused even to shake hands].',
    'Her ___ toward the new manager [was obvious in every meeting].',
    'Years of war left lasting ___ [between the neighboring peoples].',
  ], { opposite: 'harmony-n' }),

  C('harmony-n', 'noun', 'friendly agreement (mass)', `
    amity: friendly relations |
    concord: agreement or harmony |
    harmony: agreement or accord |
    goodwill: friendly or helpful feelings`, [
    'The treaty ushered in a period of ___ [between the former enemies].',
    'Neighbors lived in ___, [sharing tools and helping with each other’s harvests].',
    'The joint festival was meant to promote ___ [between the two communities].',
    'Decades of ___ [ended abruptly when the border dispute flared].',
  ], { opposite: 'hostility-n' }),

  C('candor-n', 'noun', 'frankness (mass)', `
    candor: the quality of being open and honest |
    frankness: openness in speech |
    forthrightness: directness and honesty |
    openness: willingness to share and be honest`, [
    'Voters appreciated the candidate’s ___ [about her past mistakes].',
    'The memoir is striking for its ___: [the author hides nothing, however embarrassing].',
    'His ___ [during the interview — admitting the project was failing] — earned him respect.',
    'Doctors are expected to discuss a diagnosis with ___ [rather than hiding bad news].',
  ], { opposite: 'deceit-n', near: ['integrity-n'] }),

  C('integrity-n', 'noun', 'moral uprightness (mass)', `
    probity: strong moral principles; honesty |
    integrity: the quality of being honest and morally upright |
    rectitude: morally correct behavior |
    uprightness: moral correctness`, [
    'The judge was known for her ___: [in thirty years, no one ever questioned her honesty].',
    'Voters wanted a leader of unquestioned ___ [after years of corruption scandals].',
    'His ___ was tested when [a bribe worth a year’s salary was offered — and refused].',
    'The auditor’s reputation for ___ [made her findings impossible to dismiss].',
  ], { opposite: 'deceit-n', near: ['candor-n'] }),

  C('deceit-n', 'noun', 'deception; trickery (mass)', `
    duplicity: deceitfulness; double-dealing |
    deceit: the action of deceiving someone |
    mendacity: untruthfulness |
    chicanery: the use of trickery to achieve a purpose |
    guile: sly or cunning intelligence`, [
    'The investigation revealed years of ___: [the company had lied to regulators about every test].',
    'The spy’s ___ [— working for two governments at once —] was finally exposed.',
    'Voters were weary of the ___ [of politicians who promised one thing and did another].',
    'The lawyer won through ___, [hiding evidence and misleading the court].',
  ], { opposite: 'integrity-n', near: ['candor-n'] }),

  C('skill-n', 'noun', 'skill and adroitness (mass)', `
    prowess: skill or expertise in a particular activity |
    dexterity: skill in performing tasks, especially with the hands |
    adroitness: cleverness or skill |
    finesse: refinement and delicacy in performance`, [
    'The surgeon’s ___ [allowed her to repair vessels thinner than a hair].',
    'The pianist displayed astonishing ___, [racing through the passage without a single error].',
    'Negotiating the treaty required great ___, [balancing the demands of six countries].',
    'The juggler’s ___ [kept seven flaming torches in the air at once].',
  ], { opposite: 'ineptitude-n', near: ['insight-n'] }),

  C('insight-n', 'noun', 'keen judgment (mass)', `
    acumen: the ability to make good judgments quickly |
    discernment: the ability to judge well |
    perspicacity: keenness of mental perception |
    sagacity: wisdom and good judgment`, [
    'Her business ___ [turned a small bakery into a national chain].',
    'The critic’s ___ [allowed him to spot the young writer’s talent immediately].',
    'Investors trusted his ___, [which had predicted three recessions correctly].',
    'It takes ___ to [see which of a dozen promising ideas will actually succeed].',
  ], { opposite: 'ineptitude-n', near: ['skill-n'] }),

  C('ineptitude-n', 'noun', 'lack of skill (mass)', `
    ineptitude: lack of skill or ability |
    incompetence: inability to do something successfully |
    clumsiness: lack of skill or grace |
    ineptness: lack of skill`, [
    'The agency’s ___ [left thousands of flood victims without help for weeks].',
    'The team lost because of its sheer ___, [missing easy shots and fumbling simple passes].',
    'His ___ with tools [made even changing a light bulb an adventure].',
    'The scandal exposed the ___ [of the officials in charge].',
  ], { opposite: 'skill-n' }),

  C('excess-n', 'noun', 'an oversupply (singular)', `
    surfeit: an excessive amount |
    glut: an excessively abundant supply |
    plethora: a large or excessive amount |
    superfluity: an unnecessarily large amount`, [
    'A ___ of oil [on the world market drove prices to record lows].',
    'The report suffers from a ___ of detail [that buries its main findings].',
    'Viewers face a ___ of streaming options, [more shows than anyone could watch in a lifetime].',
    'After the harvest there was a ___ of apples; [farmers left them rotting on the ground].',
  ], { opposite: 'dearth-n' }),

  C('dearth-n', 'noun', 'a shortage (singular)', `
    dearth: a scarcity or lack |
    paucity: the presence of something in small quantities |
    scarcity: a shortage |
    shortage: a situation in which something needed cannot be obtained`, [
    'The ___ of evidence [forced the prosecutors to drop the case].',
    'There is a ___ of qualified nurses; [hospitals have hundreds of unfilled positions].',
    'Critics noted the ___ of women [among the award’s winners over the past century].',
    'Given the ___ of rainfall, [farmers planted drought-resistant crops].',
  ], { opposite: 'excess-n' }),

  C('peak-n', 'noun', 'the highest point', `
    zenith: the time at which something is most powerful or successful |
    apex: the highest point |
    pinnacle: the most successful point |
    acme: the point at which something is best or most perfect`, [
    'At the ___ of its power, [the empire stretched from the Atlantic to the Indus].',
    'Winning the championship was the ___ of her career; [nothing afterward came close].',
    'The band reached its ___ in 1975, [selling out stadiums around the world].',
    'The cathedral represents the ___ of Gothic architecture, [never surpassed by later builders].',
  ], { opposite: 'nadir-n' }),

  C('nadir-n', 'noun', 'the lowest point', `
    nadir: the lowest point |
    low point: the worst moment |
    bottom: the lowest point |
    lowest ebb: the lowest point of decline`, [
    'The team’s ___ came in 1998, [when it won only two games all season].',
    'At the ___ of the recession, [one worker in four was unemployed].',
    'The ___ of her career [was the flop that nearly ended it].',
    'Relations between the two countries reached their ___ [when both recalled their ambassadors].',
  ], { opposite: 'peak-n' }),

  C('beginning-n', 'noun', 'the start of something', `
    inception: the establishment or starting point of an undertaking |
    outset: the start or beginning |
    start: the point at which something begins |
    beginning: the point in time at which something starts`, [
    'From the ___ of the project, [the team knew the funding would run out within a year].',
    'At the ___ of the war, [few expected it to last more than a few months].',
    'Problems appeared at the very ___ [of the voyage, when the ship ran aground leaving port].',
    'Right from the ___, [it was clear the two partners disagreed about everything].',
  ], { near: ['peak-n'] }),

  C('composure-n', 'noun', 'calmness under stress (mass)', `
    equanimity: mental calmness, especially in difficult situations |
    composure: the state of being calm and in control |
    poise: graceful and elegant bearing; composure |
    aplomb: self-confidence in a demanding situation |
    sangfroid: composure in danger`, [
    'She accepted the bad news with ___, [thanking the doctor calmly and asking about next steps].',
    'The negotiator’s ___ [never cracked, even when the talks collapsed].',
    'He handled the hecklers with ___, [answering each insult with a joke].',
    'Pilots are trained to keep their ___ [when engines fail].',
  ], { opposite: 'agitation-n' }),

  C('agitation-n', 'noun', 'anxious disturbance (mass)', `
    agitation: a state of anxiety or nervous excitement |
    turmoil: a state of great disturbance |
    perturbation: anxiety; mental uneasiness |
    disquiet: a feeling of anxiety or worry`, [
    'The news threw the markets into ___, [with prices swinging wildly all day].',
    'Her ___ [was obvious: she paced the room and checked her phone every few seconds].',
    'The rumors caused growing ___ [among employees, who feared layoffs].',
    'The country was in ___ [after the disputed election].',
  ], { opposite: 'composure-n' }),

  C('boldness-n', 'noun', 'rash or insolent boldness (mass)', `
    temerity: excessive confidence or boldness |
    effrontery: insolent or impertinent behavior |
    audacity: willingness to take bold risks; impudence |
    gall: bold, impudent behavior`, [
    'The intern had the ___ to [tell the CEO that her strategy was foolish].',
    'He had the ___ to [ask for a raise on his first day].',
    'Few would have the ___ to [challenge the champion to a rematch after such a defeat].',
    'The thief had the ___ to [send the victims a thank-you note].',
  ], { opposite: 'timidity-n' }),

  C('timidity-n', 'noun', 'shyness; lack of confidence (mass)', `
    diffidence: modesty or shyness from lack of self-confidence |
    timidity: lack of courage or confidence |
    bashfulness: shyness |
    shyness: nervousness in the company of others`, [
    'Her ___ [kept her from speaking up, even when she knew the answer].',
    'Overcoming his ___, [he finally asked the question that had troubled him all semester].',
    'The child’s ___ [made her hide behind her mother whenever a stranger spoke].',
    'Critics mistook the young pianist’s ___ [for arrogance, because she would not look at the audience].',
  ], { opposite: 'boldness-n' }),

  C('dread-n', 'noun', 'fearful expectation (mass)', `
    trepidation: a feeling of fear or agitation about what may happen |
    apprehension: anxiety that something bad will happen |
    dread: great fear or apprehension |
    foreboding: a feeling that something bad will happen`, [
    'She opened the letter with ___, [certain it contained bad news].',
    'Villagers watched the rising river with growing ___ [as the rain continued].',
    'A sense of ___ [hung over the camp on the night before the battle].',
    'He approached the exam with ___, [having barely studied].',
  ], { opposite: 'composure-n', near: ['agitation-n'] }),

  C('zeal-n', 'noun', 'passionate enthusiasm (mass)', `
    zeal: great energy or enthusiasm for a cause |
    fervor: intense and passionate feeling |
    ardor: enthusiasm or passion |
    enthusiasm: intense and eager enjoyment`, [
    'The volunteers worked with remarkable ___, [often staying until midnight].',
    'The convert pursued his new faith with ___, [preaching on street corners every day].',
    'Her ___ for the project [was contagious; soon the whole office had signed up].',
    'Revolutionary ___ [swept through the capital].',
  ], { opposite: 'apathy-n' }),

  C('apathy-n', 'noun', 'lack of interest (mass)', `
    apathy: lack of interest or concern |
    indifference: lack of interest or sympathy |
    unconcern: lack of worry or interest |
    nonchalance: a casually calm and relaxed manner`, [
    'Voter ___ [kept turnout below thirty percent].',
    'The students’ ___ [was obvious; most were asleep by the end of the lecture].',
    'The public’s ___ toward the crisis [frustrated the scientists who had warned about it for years].',
    'She met the news with ___, [shrugging as though it did not concern her].',
  ], { opposite: 'zeal-n', near: ['lethargy-n'] }),

  C('lethargy-n', 'noun', 'lack of energy (mass)', `
    lethargy: a lack of energy and enthusiasm |
    torpor: a state of physical or mental inactivity |
    lassitude: physical or mental weariness |
    languor: tiredness or inactivity, especially when pleasurable`, [
    'The heat induced a general ___; [no one moved except to fan themselves].',
    'After the illness, a deep ___ [kept him in bed for weeks].',
    'The economy sank into ___, [with little growth and less investment].',
    'A pleasant ___ [settled over the guests after the long lunch].',
  ], { opposite: 'vigor-n', near: ['apathy-n'] }),

  C('vigor-n', 'noun', 'energy and vitality (mass)', `
    vigor: physical strength and good health |
    vitality: the state of being strong and active |
    verve: vigor and spirit |
    zest: great enthusiasm and energy`, [
    'At eighty, she still hiked mountains with remarkable ___, [outpacing hikers half her age].',
    'The young conductor led the orchestra with ___, [leaping and waving throughout].',
    'The city’s ___ [was evident in its crowded streets and new businesses].',
    'He attacked the task with ___, [finishing in a day what others expected to take a week].',
  ], { opposite: 'lethargy-n', near: ['zeal-n'] }),
];

// Integrity: every word is unique across clusters; opposites/near exist.
const seen = new Map<string, string>();
const ids = new Set(CLUSTERS.map((c) => c.id));
for (const c of CLUSTERS) {
  for (const { w } of c.words) {
    if (seen.has(w)) throw new Error(`vocab: "${w}" in both ${seen.get(w)} and ${c.id}`);
    seen.set(w, c.id);
  }
  if (c.opposite && !ids.has(c.opposite)) throw new Error(`vocab: ${c.id} opposite ${c.opposite} missing`);
  for (const nn of c.near ?? []) if (!ids.has(nn)) throw new Error(`vocab: ${c.id} near ${nn} missing`);
  for (const f of c.frames) {
    if ((f.match(/___/g) ?? []).length !== 1) throw new Error(`vocab: ${c.id} frame needs exactly one blank: ${f}`);
    if (!/\[[^\]]+\]/.test(f)) throw new Error(`vocab: ${c.id} frame has no [clue]: ${f}`);
  }
}

export const CLUSTER_BY_ID: Record<string, Cluster> = Object.fromEntries(CLUSTERS.map((c) => [c.id, c]));
export const WORD_COUNT = seen.size;
