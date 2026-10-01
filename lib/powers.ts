// Exponents typed with a caret (2^x, 9^(x + 1), 3^(4(n − 1)), n^1.585) are
// split out here so they can be drawn as real raised powers, both in question
// text (RichText) and in lesson prose (remarkPowers).
//
// A caret only counts as a power when something sits right before it and an
// exponent follows right after it, with no spaces. A spaced-out "a ^ b" stays
// literal. A parenthesized exponent drops its outer parentheses once it's
// raised, because the raised position already groups it: 9^(x + 1) is drawn
// as 9 with "x + 1" up top.

export type PowerPiece = string | { sup: PowerPiece[] };

/** A bare exponent: a number (2^10, n^1.585) or a name (2^x, n^log₂4). */
const TOKEN = /^[−-]?(?:\d+(?:\.\d+)?|[A-Za-z][A-Za-z0-9₀-₉]*)/;

export function splitPowers(text: string): PowerPiece[] {
  const out: PowerPiece[] = [];
  let buf = '';
  let i = 0;
  while (i < text.length) {
    if (text[i] === '^' && i > 0 && !/\s/.test(text[i - 1])) {
      let exp = '';
      let end = i + 1;
      if (text[i + 1] === '(') {
        let depth = 0;
        for (let j = i + 1; j < text.length; j++) {
          if (text[j] === '(') depth++;
          else if (text[j] === ')' && --depth === 0) {
            exp = text.slice(i + 2, j);
            end = j + 1;
            break;
          }
        }
      } else {
        const m = text.slice(i + 1).match(TOKEN);
        if (m) {
          exp = m[0];
          end = i + 1 + exp.length;
        }
      }
      if (exp.trim()) {
        if (buf) out.push(buf);
        buf = '';
        out.push({ sup: splitPowers(exp) });
        i = end;
        continue;
      }
    }
    buf += text[i];
    i++;
  }
  if (buf) out.push(buf);
  return out;
}

type MdNode = { type: string; value?: string; children?: MdNode[]; data?: Record<string, unknown> };

/**
 * Remark plugin: carets in lesson prose become <sup>. Only plain text nodes
 * are touched, so code, inline code, and $$math$$ keep their carets.
 */
export function remarkPowers() {
  return (tree: MdNode) => walk(tree);
}

function walk(node: MdNode) {
  if (!node.children) return;
  const next: MdNode[] = [];
  for (const child of node.children) {
    if (child.type === 'text' && child.value?.includes('^')) next.push(...toMdast(splitPowers(child.value)));
    else {
      walk(child);
      next.push(child);
    }
  }
  node.children = next;
}

function toMdast(pieces: PowerPiece[]): MdNode[] {
  return pieces.map((p) =>
    typeof p === 'string'
      ? { type: 'text', value: p }
      : { type: 'superscript', data: { hName: 'sup' }, children: toMdast(p.sup) },
  );
}
