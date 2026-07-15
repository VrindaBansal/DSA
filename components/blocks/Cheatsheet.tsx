'use client';

import React from 'react';
import Link from 'next/link';
import { BlockShell } from './BlockShell';
import { CHEATSHEET_BY_LESSON } from '@/content/cheatsheets';
import { useProgress, useLessonProgress } from '@/lib/progress/provider';
import type { CheatsheetData } from '@/lib/types';

/**
 * Terminal block of every lesson (spec §5.1): ops table, use-when /
 * don't-use-when, stdlib equivalent, plus my personal notes captured from the
 * tutor. Reaching it marks the lesson completed. Extractable to its own
 * printable route.
 */
export function CheatsheetBlock({
  lessonId,
  blockId,
  children,
}: {
  lessonId: string;
  blockId: string;
  children?: React.ReactNode;
}) {
  const { setCompleted } = useProgress();
  const data = CHEATSHEET_BY_LESSON[lessonId];

  return (
    <BlockShell
      lessonId={lessonId}
      blockId={blockId}
      className="not-prose my-10"
      onSeen={() => setCompleted(lessonId)}
    >
      <div className="print-sheet overflow-hidden rounded-md border-[1.5px] border-ink bg-panel">
        <div className="flex items-center justify-between border-b-[1.5px] border-ink bg-paper px-5 py-2.5">
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.1em]">
            Cheatsheet
          </span>
          <Link
            href={`/lesson/${lessonId}/cheatsheet`}
            className="no-print font-mono text-[10.5px] uppercase tracking-wider text-active underline-offset-2 hover:underline"
          >
            print view ↗
          </Link>
        </div>
        <div className="p-5">
          {data ? <CheatsheetBody data={data} /> : null}
          {children && <div className="mt-4 text-[14px]">{children}</div>}
          <MyNotes lessonId={lessonId} />
        </div>
      </div>
    </BlockShell>
  );
}

export function CheatsheetBody({ data }: { data: CheatsheetData }) {
  return (
    <div className="space-y-4">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {(data.opsHeaders ?? ['Operation', 'Complexity', 'Note']).map((h) => (
              <th
                key={h}
                className="border-b-[1.5px] border-ink py-1.5 pr-4 text-left font-mono text-[10px] uppercase tracking-wider text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.opsTable.map((r) => (
            <tr key={r.op}>
              <td className="border-b border-line py-1.5 pr-4 font-mono text-[12px]">
                {r.op}
              </td>
              <td className="border-b border-line py-1.5 pr-4 font-mono text-[12px] font-semibold">
                {r.complexity}
              </td>
              <td className="border-b border-line py-1.5 text-[12.5px] text-ink-soft">
                {r.note ?? ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded border-l-2 border-done bg-done-wash/40 py-2 pl-3 pr-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-done">
            Use this when
          </div>
          <p className="mt-1 text-[13.5px] leading-snug">{data.useWhen}</p>
        </div>
        <div className="rounded border-l-2 border-alert bg-alert-wash/40 py-2 pl-3 pr-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-alert">
            Don&apos;t use this when
          </div>
          <p className="mt-1 text-[13.5px] leading-snug">{data.dontUseWhen}</p>
        </div>
      </div>

      <div className="rounded border border-line bg-paper px-3 py-2">
        <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-muted">
          {data.stdlibLabel ?? 'Python stdlib'}
        </span>
        <code className="font-mono text-[12.5px]">{data.stdlib}</code>
      </div>

      {data.bullets && data.bullets.length > 0 && (
        <ul className="space-y-1.5 text-[13.5px] leading-snug">
          {data.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-faint">–</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {data.gotchas && data.gotchas.length > 0 && (
        <ul className="space-y-1.5 text-[13.5px] leading-snug">
          {data.gotchas.map((g, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-alert">⚠</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Personal notes — mostly "add this to my cheatsheet" from the tutor (§8). */
export function MyNotes({ lessonId }: { lessonId: string }) {
  const lp = useLessonProgress(lessonId);
  const { removeNote } = useProgress();
  if (lp.notes.length === 0) return null;
  return (
    <div className="mt-5 border-t border-dashed border-line-strong pt-4">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-active-deep">
        My notes — things I asked about
      </div>
      <ul className="space-y-2">
        {lp.notes.map((n, i) => (
          <li key={i} className="group flex gap-2 text-[13.5px] leading-snug">
            <span className="font-mono text-active">§</span>
            <span className="whitespace-pre-wrap">{n}</span>
            <button
              onClick={() => removeNote(lessonId, i)}
              className="no-print ml-auto self-start font-mono text-[10px] text-faint opacity-0 transition-opacity hover:text-alert group-hover:opacity-100"
              aria-label="remove note"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
