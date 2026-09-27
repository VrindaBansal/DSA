// Verbal generators, built on the vocabulary clusters (clusters.ts), the
// authored multi-blank templates (multi-blank.ts), and the authored reading
// passages and arguments (passages.ts, arguments.ts).
//
// Distractors are drawn only from "far" clusters — same part of speech, not
// listed as near in meaning — so every wrong choice is genuinely wrong, while
// the opposite cluster supplies the trap a test-writer would use.

import { type Candidate, type Generator, type Rng, mc, multi, pick, sample, shuffle } from '../engine.ts';
import { type Cluster, CLUSTERS, CLUSTER_BY_ID } from './clusters.ts';
import { MULTI_BLANK } from './multi-blank.ts';
import { PASSAGE_GENERATORS } from './passages.ts';
import { ARGUMENT_GENERATORS } from './arguments.ts';

// --- helpers --------------------------------------------------------------------

interface WordRef {
  w: string;
  def: string;
  c: Cluster;
}

const ALL_WORDS: WordRef[] = CLUSTERS.flatMap((c) => c.words.map((x) => ({ ...x, c })));

const related = (a: Cluster, b: Cluster) =>
  a.id === b.id ||
  a.opposite === b.id ||
  b.opposite === a.id ||
  (a.near ?? []).includes(b.id) ||
  (b.near ?? []).includes(a.id);

/** Same part of speech, clearly different meaning, and not the opposite. */
export const farClusters = (c: Cluster): Cluster[] => CLUSTERS.filter((o) => o.pos === c.pos && !related(c, o));

const farWords = (c: Cluster): WordRef[] => farClusters(c).flatMap((o) => o.words.map((x) => ({ ...x, c: o })));

/** Pick k far words from k different clusters. */
function farPick(r: Rng, c: Cluster, k: number, avoid: Set<string> = new Set()): WordRef[] {
  const cs = shuffle(r, farClusters(c).filter((o) => !avoid.has(o.id))).slice(0, k);
  return cs.map((o) => {
    const x = pick(r, o.words);
    return { ...x, c: o };
  });
}

const clueOf = (frame: string) => frame.match(/\[([^\]]+)\]/)?.[1] ?? '';

/** The sentence as shown on the test: clue brackets removed, a/an → a(n). */
export function showFrame(frame: string, marker = '_____'): string {
  return frame
    .replace(/\[|\]/g, '')
    .replace(/\b([Aa])n? ___/g, (_, a: string) => `${a}(n) ___`)
    .replace('___', marker);
}

const vowelSound = (w: string) => /^[aeio]/i.test(w) || (/^u/i.test(w) && !/^(uni|use|usu|uti)/i.test(w));

/** The sentence completed with a word (for examples), articles fixed. */
export function fillFrame(frame: string, word: string): string {
  return frame
    .replace(/\[|\]/g, '')
    .replace(/\b([Aa])n? ___/g, (_, a: string) => `${a}${vowelSound(word) ? 'n' : ''} ___`)
    .replace('___', `**${word}**`);
}

const q = (s: string) => `“${s}”`;
/** Cluster gist without the grammar tags used for authoring ("(mass)", "(plural)"). */
const gist = (c: Cluster) => c.gist.replace(/\s*\((mass|plural|singular)\)/g, '');

// --- vocabulary drills -------------------------------------------------------------

const vocabMeaning: Generator = {
  id: 'vocab-meaning',
  track: 'verbal',
  topic: 'Vocab: what does it mean?',
  lessonId: 'gre-vocab-core',
  count: 700,
  all() {
    const r = seeded('vm');
    return shuffleStable(ALL_WORDS, 'vm').flatMap((x) => {
      const ds = farPick(r, x.c, 4);
      const example = fillFrame(pick(r, x.c.frames), x.w);
      const built = mc(r, {
        prompt: `**${x.w}** most nearly means:`,
        correct: { text: x.def, note: `That is the meaning of ${x.w}.` },
        wrong: ds.map((d) => ({ text: d.def, note: `That defines **${d.w}**.` })),
        explanation: `**${x.w}** (${x.c.pos}) — ${x.def}.\nIn context: ${example}\nIt belongs to the “${gist(x.c)}” family: ${x.c.words.map((y) => y.w).join(', ')}.${x.c.opposite ? `\nOpposite family: ${CLUSTER_BY_ID[x.c.opposite].words.map((y) => y.w).join(', ')}.` : ''}`,
        difficulty: difficultyOf(x.w),
      });
      return built ? [{ key: `vm:${x.w}`, q: built }] : [];
    }).slice(0, 700);
  },
};

const vocabWord: Generator = {
  id: 'vocab-word',
  track: 'verbal',
  topic: 'Vocab: which word fits the definition?',
  lessonId: 'gre-vocab-core',
  count: 700,
  all() {
    const r = seeded('vw');
    return shuffleStable(ALL_WORDS, 'vw').flatMap((x) => {
      const trap = x.c.opposite ? pick(r, CLUSTER_BY_ID[x.c.opposite].words) : null;
      const ds = farPick(r, x.c, trap ? 3 : 4);
      const wrong = [
        ...(trap ? [{ text: trap.w, note: `**${trap.w}** means ${trap.def} — the OPPOSITE family.` }] : []),
        ...ds.map((d) => ({ text: d.w, note: `**${d.w}** means ${d.def}.` })),
      ];
      const built = mc(r, {
        prompt: `Which word means “${x.def}”?`,
        correct: { text: x.w, note: `**${x.w}** means exactly that.` },
        wrong,
        explanation: `**${x.w}** — ${x.def}.\nExample: ${fillFrame(pick(r, x.c.frames), x.w)}\nSame family (“${gist(x.c)}”): ${x.c.words.filter((y) => y.w !== x.w).map((y) => y.w).join(', ')}.`,
        difficulty: difficultyOf(x.w),
      });
      return built ? [{ key: `vw:${x.w}`, q: built }] : [];
    }).slice(0, 700);
  },
};

const vocabSynonym: Generator = {
  id: 'vocab-synonym',
  track: 'verbal',
  topic: 'Vocab: synonyms',
  lessonId: 'gre-vocab-core',
  count: 700,
  all() {
    const r = seeded('vs');
    return shuffleStable(ALL_WORDS, 'vs').flatMap((x) => {
      const mates = x.c.words.filter((y) => y.w !== x.w);
      if (!mates.length) return [];
      const mate = pick(r, mates);
      const trap = x.c.opposite ? pick(r, CLUSTER_BY_ID[x.c.opposite].words) : null;
      const ds = farPick(r, x.c, trap ? 3 : 4);
      const built = mc(r, {
        prompt: `Which word is closest in meaning to **${x.w}**?`,
        correct: { text: mate.w, note: `Both belong to the “${gist(x.c)}” family.` },
        wrong: [
          ...(trap ? [{ text: trap.w, note: `**${trap.w}** is an ANTONYM (${trap.def}) — test-writers love this trap.` }] : []),
          ...ds.map((d) => ({ text: d.w, note: `**${d.w}** means ${d.def}.` })),
        ],
        explanation: `**${x.w}** — ${x.def}.\n**${mate.w}** — ${mate.def}.\nBoth sit in the “${gist(x.c)}” family (${x.c.words.map((y) => y.w).join(', ')}). Learning words in families like this is exactly what sentence equivalence rewards.`,
        difficulty: difficultyOf(x.w),
      });
      return built ? [{ key: `vs:${x.w}`, q: built }] : [];
    }).slice(0, 700);
  },
};

const vocabAntonym: Generator = {
  id: 'vocab-antonym',
  track: 'verbal',
  topic: 'Vocab: antonyms',
  lessonId: 'gre-vocab-core',
  count: 560,
  all() {
    const r = seeded('va');
    return shuffleStable(
      ALL_WORDS.filter((x) => x.c.opposite && x.c.words.length > 1),
      'va',
    ).flatMap((x) => {
      const opp = CLUSTER_BY_ID[x.c.opposite!];
      const ans = pick(r, opp.words);
      const mate = pick(r, x.c.words.filter((y) => y.w !== x.w));
      const ds = farPick(r, x.c, 3, new Set([opp.id]));
      const built = mc(r, {
        prompt: `Which word is most nearly OPPOSITE in meaning to **${x.w}**?`,
        correct: { text: ans.w, note: `${ans.def} — the reverse of ${x.def}.` },
        wrong: [
          { text: mate.w, note: `**${mate.w}** is a SYNONYM of ${x.w} — read the question word “opposite.”` },
          ...ds.map((d) => ({ text: d.w, note: `**${d.w}** means ${d.def} — unrelated, not opposite.` })),
        ],
        explanation: `**${x.w}** — ${x.def}.\n**${ans.w}** — ${ans.def}.\nThe “${gist(x.c)}” family is the mirror image of the “${gist(opp)}” family (${opp.words.map((y) => y.w).join(', ')}).`,
        difficulty: difficultyOf(x.w),
      });
      return built ? [{ key: `va:${x.w}`, q: built }] : [];
    }).slice(0, 560);
  },
};

// --- sentence equivalence & text completion -------------------------------------------

interface FrameRef {
  c: Cluster;
  i: number;
  f: string;
}
const ALL_FRAMES: FrameRef[] = CLUSTERS.flatMap((c) => c.frames.map((f, i) => ({ c, i, f })));

function seBuild(r: Rng, fr: FrameRef, pair: [WordRef, WordRef]): Candidate['q'] | null {
  const { c, f } = fr;
  const clue = clueOf(f);
  const opp = c.opposite ? CLUSTER_BY_ID[c.opposite] : null;
  // Trap pair: two synonyms from the opposite family if it has 2+, else a far family.
  const trapCluster = opp && opp.words.length >= 2 && r() < 0.6 ? opp : pick(r, farClusters(c).filter((o) => o.words.length >= 2));
  if (!trapCluster) return null;
  const trapPair = sample(r, trapCluster.words, 2).map((x) => ({ ...x, c: trapCluster }));
  const singles = farPick(r, c, 2, new Set([trapCluster.id]));
  const options = [
    ...pair.map((x) => ({
      text: x.w,
      correct: true,
      note: `${x.w}: ${x.def} — fits the clue.`,
    })),
    ...trapPair.map((x) => ({
      text: x.w,
      correct: false,
      note: `${x.w}: ${x.def}. It has a partner (${trapPair.find((y) => y.w !== x.w)!.w}), but the pair means “${gist(trapCluster)}”${trapCluster.id === c.opposite ? ' — the OPPOSITE of what the clue demands' : ', which the sentence doesn’t call for'}.`,
    })),
    ...singles.map((x) => ({
      text: x.w,
      correct: false,
      note: `${x.w}: ${x.def} — doesn’t fit, and nothing else here means the same thing.`,
    })),
  ];
  return multi(r, {
    prompt: `${showFrame(f)}\n\nSelect the **two** answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning.`,
    options,
    selectCount: 2,
    explanation: `Clue: ${q(clue)} → the blank must mean *${gist(c)}*.\n**${pair[0].w}** (${pair[0].def}) and **${pair[1].w}** (${pair[1].def}) both fit and produce sentences alike in meaning.\nTrap: **${trapPair[0].w}** and **${trapPair[1].w}** are ALSO a synonym pair — but they mean *${gist(trapCluster)}*. On sentence equivalence, a matching pair is necessary but not sufficient: it has to fit the clue.\nCompleted: ${fillFrame(f, pair[0].w)}`,
    difficulty: difficultyOf(pair[0].w) === 3 || difficultyOf(pair[1].w) === 3 ? 3 : 2,
  });
}

const sentenceEquivalence: Generator = {
  id: 'se',
  track: 'verbal',
  topic: 'Sentence equivalence',
  lessonId: 'gre-se-method',
  count: 1200,
  all() {
    const r = seeded('se');
    const out: Candidate[] = [];
    // Two different answer pairs per sentence at most, spread over all sentences.
    for (const round of [0, 1]) {
      for (const fr of shuffleStable(ALL_FRAMES, `se${round}`)) {
        const words = fr.c.words.map((x) => ({ ...x, c: fr.c }));
        if (words.length < 2) continue;
        const pairs: [WordRef, WordRef][] = [];
        for (let a = 0; a < words.length; a++) for (let b = a + 1; b < words.length; b++) pairs.push([words[a], words[b]]);
        const p = shuffleStable(pairs, `${fr.c.id}:${fr.i}`)[round];
        if (!p) continue;
        const built = seBuild(r, fr, p);
        if (built) out.push({ key: `se:${fr.c.id}:${fr.i}:${p[0].w}:${p[1].w}`, q: built });
      }
    }
    return out.slice(0, 1200);
  },
};

const textCompletion1: Generator = {
  id: 'tc1',
  track: 'verbal',
  topic: 'Text completion (one blank)',
  lessonId: 'gre-tc-method',
  count: 700,
  all() {
    const r = seeded('tc1');
    return shuffleStable(ALL_FRAMES, 'tc1').flatMap((fr) => {
      const { c, f } = fr;
      const ans = pick(r, c.words);
      const opp = c.opposite ? CLUSTER_BY_ID[c.opposite] : null;
      const trap = opp ? pick(r, opp.words) : null;
      const ds = farPick(r, c, trap ? 3 : 4);
      const clue = clueOf(f);
      const built = mc(r, {
        prompt: showFrame(f),
        correct: { text: ans.w, note: `${ans.def} — matches the clue.` },
        wrong: [
          ...(trap ? [{ text: trap.w, note: `${trap.def} — the OPPOSITE of what the clue calls for.` }] : []),
          ...ds.map((d) => ({ text: d.w, note: `${d.def} — nothing in the sentence points here.` })),
        ],
        explanation: `Cover the choices and predict. The clue ${q(clue)} tells you the blank means *${gist(c)}*.\n**${ans.w}** — ${ans.def}.${trap ? `\nThe tempting wrong answer, **${trap.w}**, means ${trap.def}: exactly backwards.` : ''}\nOther words that would work: ${c.words.filter((y) => y.w !== ans.w).map((y) => y.w).join(', ')}.`,
        difficulty: difficultyOf(ans.w),
      });
      return built ? [{ key: `tc1:${c.id}:${fr.i}`, q: built }] : [];
    }).slice(0, 700);
  },
};

// Multi-blank text completion from authored templates.
const textCompletionMulti: Generator = {
  id: 'tc-multi',
  track: 'verbal',
  topic: 'Text completion (two & three blanks)',
  lessonId: 'gre-tc-multi',
  count: 300,
  all() {
    const r = seeded('tcm');
    const out: Candidate[] = [];
    for (const variant of [0, 1, 2]) {
      MULTI_BLANK.forEach((t, ti) => {
        const ROMAN = ['i', 'ii', 'iii'];
        const blanks = t.blanks.map(([target, trapId]) => {
          const tc = CLUSTER_BY_ID[target];
          const trapC = CLUSTER_BY_ID[trapId];
          const words = shuffleStable(tc.words, `${ti}:${target}`);
          const ans = words[variant % words.length];
          const trapW = pick(r, trapC.words);
          const other = farPick(r, tc, 1, new Set([trapId]))[0];
          const opts = shuffle(r, [
            { w: ans.w, ok: true },
            { w: trapW.w, ok: false },
            { w: other.w, ok: false },
          ]);
          return { tc, trapC, ans, trapW, other, opts };
        });
        let prompt = t.text;
        blanks.forEach((_, bi) => {
          prompt = prompt.replace(new RegExp(`\\b([Aa])n? \\(${ROMAN[bi]}\\)___`), (_m, a: string) => `${a}(n) (${ROMAN[bi]})___`);
          prompt = prompt.replace(`(${ROMAN[bi]})___`, `(${ROMAN[bi]})_____`);
        });
        const key = `tcm:${ti}:${blanks.map((b) => b.ans.w).join(':')}`;
        if (out.some((o) => o.key === key)) return;
        out.push({
          key,
          q: {
            kind: 'blanks',
            prompt,
            blanks: blanks.map((b) => ({ options: b.opts.map((o) => o.w), correctIndex: b.opts.findIndex((o) => o.ok) })),
            explanation: `${t.why}\n${blanks.map((b, bi) => `(${ROMAN[bi]}) **${b.ans.w}** — ${b.ans.def}.`).join('\n')}`,
            blankNotes: blanks.map(
              (b) =>
                `needs *${gist(b.tc)}*. **${b.trapW.w}** (${b.trapW.def}) is the trap — it means *${gist(b.trapC)}*. **${b.other.w}** (${b.other.def}) is unrelated.`,
            ),
            difficulty: t.blanks.length === 3 ? 3 : 2,
          },
        });
      });
    }
    return out.slice(0, 300);
  },
};

// --- utilities ------------------------------------------------------------------------

function seeded(tag: string): Rng {
  let h = 0x811c9dc5;
  for (let i = 0; i < tag.length; i++) h = Math.imul(h ^ tag.charCodeAt(i), 0x01000193);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleStable<T>(arr: readonly T[], tag: string): T[] {
  return shuffle(seeded(tag), arr);
}

/** Longer, rarer words → harder. A rough but consistent proxy. */
const COMMON = new Set(
  'fearless cowardly hopeful gloomy upbeat modest humble timid bashful careless sloppy lively simple elementary rare scarce abundant plentiful ample harmless wealthy poor diverse uniform chaotic orderly organized harsh severe strict polite respectful cheeky witty sober grave serious kind stingy thrifty wasteful friendly chatty vague clear relevant irrelevant trivial crucial vital fleeting lasting durable secret overt showy luxurious plush stark ornate elaborate forbid permit ban outlaw save waste preserve delay postpone decide settle copy imitate spread circulate weaken reduce trim increase boost expand ease praise applaud'.split(' '),
);
function difficultyOf(w: string): 1 | 2 | 3 {
  if (COMMON.has(w)) return 1;
  return w.length >= 10 ? 3 : 2;
}

export const VERBAL: Generator[] = [
  vocabMeaning,
  vocabWord,
  vocabSynonym,
  vocabAntonym,
  textCompletion1,
  textCompletionMulti,
  sentenceEquivalence,
  ...PASSAGE_GENERATORS,
  ...ARGUMENT_GENERATORS,
];
