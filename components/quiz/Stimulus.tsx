import React from 'react';
import type { Stimulus } from '@/lib/types';
import { Paragraphs, RichText } from './RichText';

/** Reading passage and/or data table, shown above the prompt. */
export function StimulusAbove({ s }: { s?: Stimulus }) {
  if (!s || (!s.passage && !s.table)) return null;
  return (
    <div className="mb-4 space-y-3">
      {s.passage && (
        <div className="rounded border border-line bg-paper px-4 py-3">
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Passage
          </div>
          <Paragraphs
            text={s.passage}
            className="font-body text-[14.5px] leading-relaxed text-ink"
          />
        </div>
      )}
      {s.table && (
        <div className="overflow-x-auto rounded border border-line bg-paper px-3 py-2.5">
          {s.table.caption && (
            <div className="mb-1.5 text-center font-mono text-[11px] font-semibold text-ink-soft">
              {s.table.caption}
            </div>
          )}
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {s.table.columns.map((c, i) => (
                  <th
                    key={i}
                    className="border-b-[1.5px] border-ink px-2 py-1 text-left font-mono text-[10.5px] uppercase tracking-wider text-muted"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`border-b border-line px-2 py-1 ${ci === 0 ? 'font-semibold' : 'font-mono text-[12.5px]'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** GRE quantitative comparison columns, shown between prompt and choices. */
export function StimulusQuantities({ s }: { s?: Stimulus }) {
  if (!s?.quantities) return null;
  return (
    <div className="mb-4 grid grid-cols-2 gap-3">
      {(['a', 'b'] as const).map((k) => (
        <div
          key={k}
          className="rounded border-[1.5px] border-line-strong bg-paper px-3 py-2.5 text-center"
        >
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">
            Quantity {k.toUpperCase()}
          </div>
          <div className="text-[15px] leading-snug">
            <RichText text={s.quantities![k]} />
          </div>
        </div>
      ))}
    </div>
  );
}
