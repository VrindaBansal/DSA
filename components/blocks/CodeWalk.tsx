'use client';

import React, { useMemo, useState } from 'react';
import { BlockShell } from './BlockShell';

export interface WalkLine {
  code: string;
  note?: string;
}

/**
 * Annotated code, line by line (spec §5.1). Hovering or stepping a line
 * highlights the corresponding prose annotation, and vice versa.
 */
export function CodeWalk({
  lessonId,
  blockId,
  title,
  lines,
}: {
  lessonId: string;
  blockId: string;
  title?: string;
  lines: WalkLine[];
}) {
  const noted = useMemo(
    () => lines.map((l, i) => ({ ...l, i })).filter((l) => l.note),
    [lines],
  );
  const [active, setActive] = useState<number>(noted[0]?.i ?? 0);

  const activeNotePos = noted.findIndex((n) => n.i === active);
  const step = (d: number) => {
    const next = noted[Math.min(Math.max(activeNotePos + d, 0), noted.length - 1)];
    if (next) setActive(next.i);
  };

  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-8">
      <div className="overflow-hidden rounded-md border-[1.5px] border-ink bg-panel">
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Code walk{title ? ` · ${title}` : ''}
          </span>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <button
              onClick={() => step(-1)}
              disabled={activeNotePos <= 0}
              className="rounded border border-line-strong px-2 py-0.5 hover:border-ink disabled:opacity-35"
              aria-label="previous annotation"
            >
              ‹
            </button>
            <button
              onClick={() => step(1)}
              disabled={activeNotePos >= noted.length - 1}
              className="rounded border border-line-strong px-2 py-0.5 hover:border-ink disabled:opacity-35"
              aria-label="next annotation"
            >
              ›
            </button>
            <span className="ml-1 text-faint">
              {activeNotePos + 1}/{noted.length}
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="border-line bg-code-bg/60 py-2 max-md:border-b md:border-r">
            {lines.map((l, i) => (
              <div
                key={i}
                onMouseEnter={() => l.note && setActive(i)}
                onClick={() => l.note && setActive(i)}
                className={`flex px-3 font-mono text-[12px] leading-[1.75] ${
                  active === i
                    ? 'border-l-2 border-active bg-active-wash'
                    : 'border-l-2 border-transparent'
                } ${l.note ? 'cursor-pointer' : ''}`}
              >
                <span className="w-6 shrink-0 select-none pr-2 text-right text-[10px] text-faint tabular-nums leading-[1.75]">
                  {i + 1}
                </span>
                <pre className="whitespace-pre text-ink-soft">
                  {l.code || ' '}
                </pre>
                {l.note && (
                  <span
                    className={`ml-auto pl-2 text-[10px] leading-[1.75] ${active === i ? 'text-active' : 'text-faint'}`}
                  >
                    ●
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 p-3">
            {noted.map((n) => (
              <button
                key={n.i}
                onClick={() => setActive(n.i)}
                onMouseEnter={() => setActive(n.i)}
                className={`rounded border px-3 py-2 text-left text-[13px] leading-snug transition-colors ${
                  active === n.i
                    ? 'border-active bg-active-wash text-ink'
                    : 'border-line bg-panel text-muted'
                }`}
              >
                <span className="mr-1.5 font-mono text-[10px] text-faint">
                  L{n.i + 1}
                </span>
                {n.note}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BlockShell>
  );
}
