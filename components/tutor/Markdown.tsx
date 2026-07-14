'use client';

import React from 'react';

// Minimal markdown for tutor replies: fenced code, inline code, bold.
// Deliberately tiny — the tutor is instructed to keep formatting minimal.

function inline(text: string, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  parts.forEach((p, i) => {
    if (p.startsWith('`') && p.endsWith('`') && p.length > 2) {
      out.push(
        <code
          key={`${keyBase}-${i}`}
          className="rounded border border-line bg-code-bg px-1 py-px font-mono text-[0.82em]"
        >
          {p.slice(1, -1)}
        </code>,
      );
    } else if (p.startsWith('**') && p.endsWith('**') && p.length > 4) {
      out.push(<strong key={`${keyBase}-${i}`}>{p.slice(2, -2)}</strong>);
    } else if (p) {
      out.push(p);
    }
  });
  return out;
}

export function Markdown({ text }: { text: string }) {
  const segments = text.split(/(```[\s\S]*?```)/g);
  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed">
      {segments.map((seg, i) => {
        if (seg.startsWith('```')) {
          const body = seg.replace(/^```[a-z]*\n?/, '').replace(/```$/, '');
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded border border-line bg-code-bg p-2.5 font-mono text-[11.5px] leading-relaxed"
            >
              {body}
            </pre>
          );
        }
        return seg
          .split(/\n{2,}/)
          .filter((p) => p.trim())
          .map((para, j) => (
            <p key={`${i}-${j}`} className="whitespace-pre-wrap">
              {inline(para, `${i}-${j}`)}
            </p>
          ));
      })}
    </div>
  );
}
