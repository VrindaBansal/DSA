'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import type { LessonMeta } from '@/lib/types';
import { CHEATSHEETS } from '@/content/cheatsheets';
import { TRADEOFFS } from '@/content/tradeoffs';
import { CheatsheetBody } from '@/components/blocks/Cheatsheet';
import { TradeoffTableView } from '@/components/blocks/TradeoffTable';

// Global searchable reference (spec §4): every cheatsheet, every complexity
// table, one page — plus the color-encoding legend (§10).

export function ReferenceClient({ lessons }: { lessons: LessonMeta[] }) {
  const [query, setQuery] = useState('');
  const lessonById = useMemo(
    () => Object.fromEntries(lessons.map((l) => [l.id, l])),
    [lessons],
  );

  const q = query.trim().toLowerCase();
  const matches = (text: string) => q === '' || text.toLowerCase().includes(q);

  const sheets = CHEATSHEETS.filter((c) =>
    matches(
      [
        lessonById[c.lessonId]?.title ?? c.lessonId,
        c.useWhen,
        c.dontUseWhen,
        c.stdlib,
        ...c.opsTable.map((o) => `${o.op} ${o.complexity} ${o.note ?? ''}`),
        ...(c.bullets ?? []),
        ...(c.gotchas ?? []),
      ].join(' '),
    ),
  );

  const tables = TRADEOFFS.filter((t) =>
    matches(
      [
        t.title,
        ...t.columns,
        ...t.rows.map((r) => `${r.label} ${r.cells.join(' ')}`),
      ].join(' '),
    ),
  );

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] font-bold tracking-tight">
            Reference
          </h1>
          <p className="mt-1 font-mono text-[11.5px] text-muted">
            every cheatsheet · every complexity table · one page
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search: O(1), heap, popleft…"
          className="w-64 rounded border border-line-strong bg-panel px-3 py-2 font-mono text-[12.5px] outline-none focus:border-active"
          aria-label="search reference"
        />
      </div>

      {/* the color language, used by every visual in the app */}
      <section className="mt-8 rounded-md border-[1.5px] border-ink bg-panel p-5">
        <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Legend — color encodes state, everywhere
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <LegendItem swatch="bg-active" label="active / current">
            the executing line, the pointer being moved, the cell being written
          </LegendItem>
          <LegendItem swatch="bg-done" label="visited / done">
            settled elements, correct answers, sorted regions
          </LegendItem>
          <LegendItem swatch="bg-alert" label="invariant violated">
            raised exceptions, wrong answers, degenerate structures
          </LegendItem>
          <LegendItem swatch="bg-line-strong" label="neutral">
            everything not currently part of the story
          </LegendItem>
        </div>
      </section>

      {tables.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Tradeoff tables
          </h2>
          <div className="space-y-4">
            {tables.map((t) => (
              <div key={t.id}>
                <TradeoffTableView data={t} />
                <Link
                  href={`/lesson/${t.lessonId}`}
                  className="mt-1 inline-block font-mono text-[10.5px] text-active hover:underline"
                >
                  from: {lessonById[t.lessonId]?.title ?? t.lessonId} →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Cheatsheets
        </h2>
        <div className="space-y-6">
          {sheets.map((c) => (
            <div
              key={c.lessonId}
              className="rounded-md border border-line bg-panel p-5"
            >
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-display text-[16px] font-semibold tracking-tight">
                  {lessonById[c.lessonId]?.title ?? c.lessonId}
                </h3>
                <span className="flex gap-3 font-mono text-[10.5px]">
                  <Link
                    href={`/lesson/${c.lessonId}`}
                    className="text-active hover:underline"
                  >
                    lesson →
                  </Link>
                  <Link
                    href={`/lesson/${c.lessonId}/cheatsheet`}
                    className="text-active hover:underline"
                  >
                    print ↗
                  </Link>
                </span>
              </div>
              <CheatsheetBody data={c} />
            </div>
          ))}
          {sheets.length === 0 && tables.length === 0 && (
            <p className="font-mono text-[12px] text-muted">
              nothing matches “{query}”.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function LegendItem({
  swatch,
  label,
  children,
}: {
  swatch: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5">
      <span className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded-sm ${swatch}`} />
      <div>
        <div className="font-mono text-[11px] font-semibold">{label}</div>
        <div className="text-[12px] leading-snug text-muted">{children}</div>
      </div>
    </div>
  );
}
