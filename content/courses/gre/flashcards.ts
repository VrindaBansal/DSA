// The vocab flashcard deck: one card per word in the core list, built from the
// same meaning families (clusters.ts) the lessons and the practice bank use.
// Each card carries its family, an example sentence from the family's
// context frames (word filled in, [clue] kept so the card can highlight it),
// and enough family links for the card's back to show its synonyms and its
// opposite family.

import { CLUSTERS, type Pos } from './bank/verbal/clusters.ts';
import { ROOTS, type WordRoots } from './roots/index.ts';

export interface FlashFamily {
  id: string;
  pos: Pos;
  /** The shared meaning, e.g. "stubborn; refusing to budge". */
  gist: string;
  words: string[];
  /** Id of the opposite family, if it has one. */
  opposite?: string;
}

export interface FlashCard {
  /** The word itself — unique across the whole list, so it doubles as the card id. */
  w: string;
  def: string;
  pos: Pos;
  /** Family id. */
  fam: string;
  /** Example sentence: the word as **word**, the context clue as [clue]. */
  ex: string;
  /** Word-root breakdown, or an origin story for words without useful roots. */
  rt?: WordRoots;
}

const tidy = (g: string) => g.replace(/\s*\((mass|plural|singular)\)/g, '');

const vowelSound = (w: string) => /^[aeio]/i.test(w) || (/^u/i.test(w) && !/^(uni|use|usu|uti)/i.test(w));

/** A family's context frame completed with one of its words, articles fixed, clue kept. */
export function fillExample(frame: string, word: string): string {
  return frame
    .replace(/\b([Aa])n? ___/g, (_, a: string) => `${a}${vowelSound(word) ? 'n' : ''} ___`)
    .replace('___', `**${word}**`);
}

export function buildDeck(): { cards: FlashCard[]; families: FlashFamily[] } {
  const families: FlashFamily[] = CLUSTERS.map((c) => ({
    id: c.id,
    pos: c.pos,
    gist: tidy(c.gist),
    words: c.words.map((x) => x.w),
    ...(c.opposite ? { opposite: c.opposite } : {}),
  }));
  const cards: FlashCard[] = CLUSTERS.flatMap((c) =>
    c.words.map((x, i) => ({
      w: x.w,
      def: x.def,
      pos: c.pos,
      fam: c.id,
      // a different sentence for each word in the family, where there are enough
      ex: fillExample(c.frames[i % c.frames.length], x.w),
      ...(ROOTS[x.w] ? { rt: ROOTS[x.w] } : {}),
    })),
  );
  return { cards, families };
}
