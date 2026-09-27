import React from 'react';
import type { Stimulus } from '@/lib/types';
import { Paragraphs, RichText } from './RichText';
import { Chart } from './Chart';

/** Geometry figure: authored inline SVG plus the "not drawn to scale" note. */
export function Figure({ figure }: { figure: NonNullable<Stimulus['figure']> }) {
  return (
    <figure className="flex flex-col items-center rounded border border-line bg-panel px-3 py-3">
      <div
        className="w-full max-w-[380px] text-ink [&_svg]:h-auto [&_svg]:w-full"
        // Authored content from content/courses/gre — never user input.
        dangerouslySetInnerHTML={{ __html: figure.svg }}
      />
      {figure.note && (
        <figcaption className="mt-1.5 font-mono text-[10.5px] italic text-muted">
          {figure.note}
        </figcaption>
      )}
    </figure>
  );
}

/** Data charts, table, and geometry figure (everything except the passage). */
export function StimulusData({ s }: { s?: Stimulus }) {
  if (!s || (!s.table && !s.charts?.length && !s.figure)) return null;
  return (
    <div className="mb-4 space-y-3">
      {s.charts?.map((c, i) => (
        <Chart key={i} c={c} />
      ))}
      {s.table && <DataTable table={s.table} />}
      {s.figure && <Figure figure={s.figure} />}
    </div>
  );
}

/** Reading passage, data table/charts, and figure, shown above the prompt. */
export function StimulusAbove({ s }: { s?: Stimulus }) {
  if (!s || (!s.passage && !s.table && !s.charts?.length && !s.figure)) return null;
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
      {s.charts?.map((c, i) => (
        <Chart key={i} c={c} />
      ))}
      {s.table && <DataTable table={s.table} />}
      {s.figure && <Figure figure={s.figure} />}
    </div>
  );
}

export function DataTable({ table }: { table: NonNullable<Stimulus['table']> }) {
  return (
    <div className="overflow-x-auto rounded border border-line bg-paper px-3 py-2.5">
      {table.caption && (
        <div className="mb-1.5 text-center font-mono text-[11px] font-semibold text-ink-soft">
          {table.caption}
        </div>
      )}
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {table.columns.map((c, i) => (
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
          {table.rows.map((r, ri) => (
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
