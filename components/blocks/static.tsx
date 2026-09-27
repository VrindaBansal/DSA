'use client';

import React, { useState } from 'react';
import { BlockShell } from './BlockShell';

// The quiet blocks (spec §5.1): Concept, Intuition, RealWorld, Gotcha, Aside.
// Color encodes state, so these stay mostly neutral — typography and rules do
// the differentiation; only Gotcha borrows the alert hue (violated expectations).

export function Concept({
  lessonId,
  blockId,
  children,
}: {
  lessonId: string;
  blockId: string;
  children: React.ReactNode;
}) {
  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-6">
      {children}
    </BlockShell>
  );
}

export function Intuition({
  lessonId,
  blockId,
  children,
}: {
  lessonId: string;
  blockId: string;
  children: React.ReactNode;
}) {
  return (
    <BlockShell
      lessonId={lessonId}
      blockId={blockId}
      className="my-8 border-l-[3px] border-active pl-5"
    >
      <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
        Intuition — why this exists
      </div>
      <div className="text-[1.02em] leading-[1.7] [&>p:last-child]:mb-0">
        {children}
      </div>
    </BlockShell>
  );
}

export function RealWorld({
  lessonId,
  blockId,
  source,
  children,
}: {
  lessonId: string;
  blockId: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-8">
      <div className="rounded-md border-[1.5px] border-ink bg-panel p-5">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-ink" aria-hidden />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
            Real world · {source}
          </span>
        </div>
        <div className="[&>p:last-child]:mb-0">{children}</div>
      </div>
    </BlockShell>
  );
}

export function Gotcha({
  lessonId,
  blockId,
  title,
  children,
}: {
  lessonId: string;
  blockId: string;
  /** Header label; defaults to the DSA wording. */
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <BlockShell
      lessonId={lessonId}
      blockId={blockId}
      className="my-8 rounded-r-md border-l-[3px] border-alert bg-alert-wash/60 py-3.5 pl-5 pr-5"
    >
      <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-alert">
        ⚠ {title ?? 'Gotcha — Python will let you do this'}
      </div>
      <div className="[&>p:last-child]:mb-0">{children}</div>
    </BlockShell>
  );
}

export function Aside({
  lessonId,
  blockId,
  title,
  children,
}: {
  lessonId: string;
  blockId: string;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-6">
      <div className="rounded-md border border-line bg-paper">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink"
          aria-expanded={open}
        >
          <span className="text-[13px] leading-none">{open ? '−' : '+'}</span>
          Aside · {title}
        </button>
        {open && (
          <div className="border-t border-line px-4 py-3 text-[0.95em] [&>p:last-child]:mb-0">
            {children}
          </div>
        )}
      </div>
    </BlockShell>
  );
}

/**
 * A worked example: the problem up top, the solution hidden behind a
 * "try it first" reveal. Put the solution in a <Solution> child.
 */
export function Example({
  lessonId,
  blockId,
  title,
  children,
}: {
  lessonId: string;
  blockId: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-8">
      <div className="rounded-md border border-line-strong bg-panel">
        <div className="flex items-center gap-2 border-b border-line px-5 py-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
            ✦ Worked example{title ? ` · ${title}` : ''}
          </span>
        </div>
        <div className="px-5 py-4 [&>p:last-child]:mb-0">{children}</div>
      </div>
    </BlockShell>
  );
}

export function Solution({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3 border-t border-dashed border-line pt-3">
      {open ? (
        <div className="[&>p:last-child]:mb-0">
          <div className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-done">
            Solution
          </div>
          {children}
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded border-[1.5px] border-ink bg-panel px-3 py-1 font-mono text-[11.5px] hover:bg-active-wash"
        >
          try it first — then reveal the solution
        </button>
      )}
    </div>
  );
}

/** Link out to the real problem grind (spec §2). */
export function LeetCode({
  slug,
  children,
}: {
  slug: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={`https://leetcode.com/problems/${slug}/`}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-[0.85em]"
    >
      {children ?? slug} ↗
    </a>
  );
}
