// Word-root breakdowns for every word in the core list, parsed from the
// hand-written lines in part1–3:
//
//   malevolent: male (bad) + vol (wish) + -ent → "wishing ill"
//   halcyon: ~ the halcyon (kingfisher) was said to nest on a calm sea …
//
// A part ending in "-" is a prefix, one starting with "-" is a suffix, anything
// else is a root (or a plain English word). Parts are written as they appear in
// the word, so a test can check every breakdown actually spells its word.

import { ROOTS_1 } from './part1.ts';
import { ROOTS_2 } from './part2.ts';
import { ROOTS_3 } from './part3.ts';

export interface RootPart {
  /** As written in the word: "mal", "in-", "-ous". */
  text: string;
  meaning?: string;
  kind: 'prefix' | 'root' | 'suffix';
}

export interface WordRoots {
  /** The pieces, in order. Absent for words explained by an origin story instead. */
  parts?: RootPart[];
  /** What the pieces add up to, e.g. "wishing ill". */
  sense?: string;
  /** Origin story, for words without useful roots. */
  story?: string;
}

/** Meanings for common suffixes, used when a line doesn't spell one out. */
const SUFFIX_MEANING: Record<string, string> = {
  '-able': 'able to be',
  '-ible': 'able to be',
  '-ous': 'full of',
  '-ious': 'full of',
  '-uous': 'full of',
  '-eous': 'full of',
  '-ful': 'full of',
  '-less': 'without',
  '-ness': 'state of being',
  '-fulness': 'state of being',
  '-iness': 'state of being',
  '-ish': 'like, somewhat',
  '-ly': 'like, having the quality of',
  '-y': 'full of, like',
  '-en': 'make',
  '-ize': 'make',
  '-ized': 'made',
  '-ity': 'quality of',
  '-ty': 'quality of',
  '-acity': 'quality of',
  '-idity': 'quality of',
  '-ality': 'quality of',
  '-osity': 'quality of',
  '-ist': 'one who',
  '-ive': 'tending to',
  '-itive': 'tending to',
  '-ative': 'tending to',
  '-ic': 'of, like',
  '-ical': 'of, like',
  '-al': 'of, relating to',
  '-ial': 'of, relating to',
  '-ent': 'being, doing',
  '-ient': 'being, doing',
  '-ant': 'being, doing',
  '-ence': 'state of',
  '-ance': 'state of',
  '-ion': 'act of',
  '-ation': 'act of',
  '-ory': 'tending to',
  '-atory': 'tending to',
  '-ed': 'having, made',
  '-age': 'state of',
  '-th': 'state of',
  '-ment': 'act or result of',
  '-ure': 'act or result of',
  '-itude': 'state of',
  '-tude': 'state of',
  '-ism': 'belief in',
  '-istic': 'of, given to',
  '-ery': 'conduct of',
  '-escent': 'becoming',
  '-acious': 'inclined to',
  '-ulous': 'tending to',
  '-itous': 'full of',
  '-icious': 'full of',
  '-atious': 'full of',
  '-id': 'having the quality of',
  '-ile': 'like, able to',
  '-ine': 'like, of',
  '-an': 'of, like',
  '-ian': 'of, like',
  '-ean': 'of, like',
  '-ary': 'relating to',
  '-ional': 'relating to',
  '-ential': 'relating to',
  '-atic': 'of, like',
  '-etic': 'of, like',
  '-tic': 'of, like',
  '-or': 'state of',
};

export function parseRoots(src: string): Record<string, WordRoots> {
  const out: Record<string, WordRoots> = {};
  for (const raw of src.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const at = line.indexOf(': ');
    if (at < 0) throw new Error(`roots: no "word: " in ${line}`);
    const word = line.slice(0, at);
    const body = line.slice(at + 2).trim();
    if (out[word]) throw new Error(`roots: ${word} listed twice`);
    if (body.startsWith('~')) {
      out[word] = { story: body.slice(1).trim() };
      continue;
    }
    const arrow = body.indexOf(' → ');
    const partsSrc = arrow < 0 ? body : body.slice(0, arrow);
    const sense = arrow < 0 ? undefined : body.slice(arrow + 3).trim();
    const parts = splitTop(partsSrc).map((p): RootPart => {
      const m = p.trim().match(/^([^(]+?)(?:\s*\((.+)\))?$/);
      if (!m) throw new Error(`roots: bad part "${p}" in ${word}`);
      const text = m[1].trim();
      const meaning = m[2]?.trim() ?? SUFFIX_MEANING[text];
      return {
        text,
        ...(meaning ? { meaning } : {}),
        kind: text.endsWith('-') ? 'prefix' : text.startsWith('-') ? 'suffix' : 'root',
      };
    });
    out[word] = { parts, ...(sense ? { sense } : {}) };
  }
  return out;
}

/** Split "a (x) + b (y + z)" on the pluses that aren't inside parentheses. */
function splitTop(src: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth === 0 && src.startsWith(' + ', i)) {
      out.push(cur);
      cur = '';
      i += 2;
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

export const ROOTS: Record<string, WordRoots> = parseRoots([ROOTS_1, ROOTS_2, ROOTS_3].join('\n'));

/** Do the parts spell the word, in order? (Hyphens and spaces ignored.) */
export function spellsWord(word: string, parts: RootPart[]): boolean {
  const w = word.toLowerCase().replace(/[-\s]/g, '');
  let i = 0;
  for (const p of parts) {
    const t = p.text.toLowerCase().replace(/[-\s]/g, '');
    const j = w.indexOf(t, i);
    if (j < 0) return false;
    i = j + t.length;
  }
  return true;
}
