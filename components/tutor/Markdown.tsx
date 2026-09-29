'use client';

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Small markdown renderer for AI replies (tutor chat, grader feedback).
// Blocks: fenced code, paragraphs, headings, bullet and numbered lists (one
// level of nesting). Inline: code, bold, italics, and LaTeX math typeset
// with KaTeX: \( … \) or $ … $ inline, \[ … \] or $$ … $$ displayed.
//
// A lone dollar amount ("costs $12 and $15") is not math: an inline $ … $
// span must hug its content on both sides and the closing $ must not be
// followed by a digit (the same rule pandoc uses).

const KATEX_OPTS = { throwOnError: false, strict: 'ignore', output: 'htmlAndMathml' } as const;

const Tex = React.memo(function Tex({ tex, display }: { tex: string; display: boolean }) {
  const html = katex.renderToString(tex.trim(), { ...KATEX_OPTS, displayMode: display });
  return display ? (
    <span
      className="md-math-display block overflow-x-auto overflow-y-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <span className="md-math" dangerouslySetInnerHTML={{ __html: html }} />
  );
});

const TOKEN = new RegExp(
  [
    /`([^`\n]+)`/.source, // 1 inline code
    /\$\$([\s\S]+?)\$\$/.source, // 2 display $$ … $$
    /\\\[([\s\S]+?)\\\]/.source, // 3 display \[ … \]
    /\\\(([\s\S]+?)\\\)/.source, // 4 inline \( … \)
    /(?<![\\$\w])\$(?=[^\s$])([^$\n]+?)(?<=\S)\$(?![\d$])/.source, // 5 inline $ … $
    /\*\*([^\n]+?)\*\*/.source, // 6 bold
    /(?<![\w*\\])\*(?=\S)([^*\n]+?)(?<=\S)\*(?![\w*])/.source, // 7 italics
  ].join('|'),
  'g',
);

function plain(text: string): string {
  return text.replace(/\\\$/g, '$');
}

export function inline(text: string, keyBase = 'i'): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    const display = m[2] !== undefined || m[3] !== undefined;
    // A displayed equation is its own line already; drop the newlines
    // around it so it doesn't get blank lines above and below as well.
    let before = text.slice(last, at);
    if (display) before = before.replace(/[ \t]*\n[ \t]*$/, '');
    if (before) out.push(plain(before));
    const key = `${keyBase}-${n++}`;
    if (m[1] !== undefined) {
      out.push(
        <code
          key={key}
          className="rounded border border-line bg-code-bg px-1 py-px font-mono text-[0.82em]"
        >
          {m[1]}
        </code>,
      );
    } else if (display) {
      out.push(<Tex key={key} tex={(m[2] ?? m[3])!} display />);
    } else if (m[4] !== undefined || m[5] !== undefined) {
      out.push(<Tex key={key} tex={(m[4] ?? m[5])!} display={false} />);
    } else if (m[6] !== undefined) {
      out.push(<strong key={key}>{inline(m[6], key)}</strong>);
    } else if (m[7] !== undefined) {
      out.push(<em key={key}>{inline(m[7], key)}</em>);
    }
    last = at + m[0].length;
    if (display) last += /^[ \t]*\n/.exec(text.slice(last))?.[0].length ?? 0;
  }
  if (last < text.length) out.push(plain(text.slice(last)));
  return out;
}

/** One line (or a few) of prose with inline markdown and math, no blocks. */
export function MathText({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

type Item = { text: string; sub?: List };
type List = { kind: 'ul' | 'ol'; start: number; indent: number; items: Item[] };
type Block =
  | { kind: 'code'; body: string }
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | List;

const BULLET = /^(\s*)[-*•+]\s+(.*)$/;
const NUMBERED = /^(\s*)(\d{1,3})[.)]\s+(.*)$/;
const HEADING = /^\s*#{1,6}\s+(.*)$/;
const FENCE = /^\s*```/;

// Does an open display-math span ($$ or \[) continue past this text?
function mathOpen(text: string): boolean {
  const dollars = (text.match(/\$\$/g) ?? []).length;
  const opens = (text.match(/\\\[/g) ?? []).length;
  const closes = (text.match(/\\\]/g) ?? []).length;
  return dollars % 2 === 1 || opens > closes;
}

function parse(src: string): Block[] {
  const blocks: Block[] = [];
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  let para: string[] = [];
  let list: List | null = null;

  const flush = () => {
    if (para.length) blocks.push({ kind: 'p', text: para.join('\n') });
    para = [];
    if (list) blocks.push(list);
    list = null;
  };
  const lastItem = (): Item | undefined => {
    if (!list) return undefined;
    const top = list.items[list.items.length - 1];
    return top?.sub ? top.sub.items[top.sub.items.length - 1] : top;
  };
  const inMath = () => {
    const open = lastItem();
    return list && open ? mathOpen(open.text) : mathOpen(para.join('\n'));
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Inside an unfinished display-math span every line belongs to it.
    if ((para.length || list) && inMath()) {
      const item = lastItem();
      if (list && item) item.text += '\n' + line.trim();
      else para.push(line);
      continue;
    }

    if (FENCE.test(line)) {
      flush();
      const body: string[] = [];
      i++;
      while (i < lines.length && !FENCE.test(lines[i])) body.push(lines[i++]);
      blocks.push({ kind: 'code', body: body.join('\n') });
      continue;
    }
    if (!line.trim()) {
      // A blank line ends a paragraph; a list survives it if the next
      // non-blank line is another item or an indented continuation.
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const next = lines[j] ?? '';
      if (list && (BULLET.test(next) || NUMBERED.test(next) || /^\s{2,}\S/.test(next))) continue;
      flush();
      continue;
    }
    const h = HEADING.exec(line);
    if (h) {
      flush();
      blocks.push({ kind: 'h', text: h[1] });
      continue;
    }
    const b = BULLET.exec(line);
    const o = b ? null : NUMBERED.exec(line);
    if (b || o) {
      const indent = (b ? b[1] : o![1]).replace(/\t/g, '    ').length;
      const kind = b ? 'ul' : 'ol';
      const text = b ? b[2] : o![3];
      const start = o ? Number(o[2]) : 1;
      if (para.length) {
        blocks.push({ kind: 'p', text: para.join('\n') });
        para = [];
      }
      const current = list as List | null;
      const parent = current?.items[current.items.length - 1];
      if (current && parent && indent > current.indent) {
        if (!parent.sub || parent.sub.kind !== kind) {
          if (parent.sub) {
            // A second nested list of the other kind: keep it in one list.
            parent.sub.items.push({ text });
            continue;
          }
          parent.sub = { kind, start, indent, items: [] };
        }
        parent.sub.items.push({ text });
      } else if (current && current.kind === kind) {
        current.items.push({ text });
      } else {
        if (current) blocks.push(current);
        list = { kind, start, indent, items: [{ text }] };
      }
      continue;
    }
    const item = lastItem();
    if (list && item) {
      item.text += '\n' + line.trim();
    } else {
      para.push(line);
    }
  }
  flush();
  return blocks;
}

function ListView({ list, keyBase }: { list: List; keyBase: string }) {
  const items = list.items.map((it, k) => (
    <li key={k} className="whitespace-pre-line pl-0.5">
      {inline(it.text, `${keyBase}-${k}`)}
      {it.sub && <ListView list={it.sub} keyBase={`${keyBase}-${k}s`} />}
    </li>
  ));
  return list.kind === 'ol' ? (
    <ol start={list.start} className="mt-1 list-decimal space-y-1 pl-5 marker:text-muted">
      {items}
    </ol>
  ) : (
    <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-muted">{items}</ul>
  );
}

export function Markdown({ text }: { text: string }) {
  return (
    <div className="md space-y-2 text-[13.5px] leading-relaxed">
      {parse(text).map((blk, i) => {
        const key = String(i);
        switch (blk.kind) {
          case 'code':
            return (
              <pre
                key={key}
                className="overflow-x-auto rounded border border-line bg-code-bg p-2.5 font-mono text-[11.5px] leading-relaxed"
              >
                {blk.body}
              </pre>
            );
          case 'h':
            return (
              <p key={key} className="font-semibold">
                {inline(blk.text, key)}
              </p>
            );
          case 'p':
            return (
              <p key={key} className="whitespace-pre-wrap">
                {inline(blk.text, key)}
              </p>
            );
          default:
            return <ListView key={key} list={blk} keyBase={key} />;
        }
      })}
    </div>
  );
}
