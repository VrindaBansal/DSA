'use client';

import React, { useEffect, useState } from 'react';
import { BlockShell } from './BlockShell';
import { ExerciseCard } from './Exercise';
import { CodeScratchpad } from '@/components/CodeScratchpad';
import { QUESTION_BY_ID } from '@/content/questions';
import { PROBLEM_SET_BY_LESSON, type Difficulty } from '@/content/courses/leetcode/problemsets';
import type { CodeQuestion } from '@/lib/types';
import { useProgress } from '@/lib/progress/provider';

const DIFF_STYLE: Record<Difficulty, string> = {
  Easy: 'border-done/40 text-done',
  Medium: 'border-active/50 text-active-deep',
  Hard: 'border-alert/50 text-alert',
};

export function ProblemSetBlock({
  lessonId,
  blockId,
  id,
}: {
  lessonId: string;
  blockId: string;
  id?: string;
}) {
  const set = PROBLEM_SET_BY_LESSON[id ?? lessonId];
  const { state } = useProgress();
  const [openId, setOpenId] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  const doneKey = `invariant.ps-done.${set?.lessonId ?? lessonId}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(doneKey);
      if (raw) setDone(new Set(JSON.parse(raw) as string[]));
    } catch {}
  }, [doneKey]);

  if (!set) {
    return (
      <div className="my-6 rounded border border-alert bg-alert-wash p-3 font-mono text-[12px] text-alert">
        No problem set registered for lesson: {id ?? lessonId}
      </div>
    );
  }

  const toggleDone = (slug: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      try {
        window.localStorage.setItem(doneKey, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const inAppQs = set.inApp
    .map((qid) => QUESTION_BY_ID[qid])
    .filter((q): q is CodeQuestion => !!q && q.kind === 'code');

  const inAppSolved = inAppQs.filter(
    (q) => state.lessons[q.lessonId]?.code[q.id]?.passed,
  ).length;
  const curatedDone = set.curated.filter((c) => done.has(c.slug)).length;
  const total = inAppQs.length + set.curated.length;
  const completed = inAppSolved + curatedDone;

  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="not-prose my-10">
      <div className="rounded-md border-[1.5px] border-ink bg-panel">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
              ▶ Problem set — do these on the IDE
            </div>
            <div className="mt-0.5 text-[12.5px] text-muted">
              {inAppQs.length} solved-here + {set.curated.length} real LeetCode
              problems for this pattern.
            </div>
          </div>
          <div className="font-mono text-[12px] text-faint">
            <span className={completed === total ? 'text-done' : 'text-ink'}>
              {completed}
            </span>{' '}
            / {total} done
          </div>
        </div>

        {/* In-app testable problems */}
        <div className="border-b border-line px-5 py-4">
          <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            solve here · run tests for a green check
          </div>
          <div className="flex flex-col gap-2.5">
            {inAppQs.map((q, i) => {
              const cp = state.lessons[q.lessonId]?.code[q.id];
              const open = openId === q.id;
              return (
                <div
                  key={q.id}
                  className="overflow-hidden rounded-md border border-line bg-paper"
                >
                  <div className="flex items-center gap-3 px-4 py-2.5">
                    <span
                      className={`font-mono text-[13px] ${cp?.passed ? 'text-done' : 'text-faint'}`}
                    >
                      {cp?.passed ? '✓' : '○'}
                    </span>
                    <div className="flex-1 text-[13.5px] font-medium leading-snug">
                      <span className="font-mono text-[11px] text-faint">
                        {i + 1}.
                      </span>{' '}
                      {q.prompt.split('.')[0]}.
                    </div>
                    <span className="font-mono text-[10px] text-faint">
                      d{q.difficulty}
                    </span>
                    <button
                      onClick={() => setOpenId(open ? null : q.id)}
                      className="rounded border border-line-strong px-3 py-1 font-mono text-[11px] hover:border-ink"
                    >
                      {open ? 'close' : cp?.passed ? 'redo' : 'solve'}
                    </button>
                  </div>
                  {open && (
                    <div className="border-t border-line p-3">
                      <ExerciseCard lessonId={q.lessonId} q={q} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Curated real LeetCode problems */}
        <div className="px-5 py-4">
          <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            then grind these on leetcode · draft in the editor below, submit there
          </div>
          <ul className="flex flex-col divide-y divide-line/70">
            {set.curated.map((c) => {
              const isDone = done.has(c.slug);
              return (
                <li key={c.slug} className="flex items-center gap-3 py-2">
                  <button
                    onClick={() => toggleDone(c.slug)}
                    aria-label={isDone ? 'mark not done' : 'mark done'}
                    className={`grid h-4 w-4 place-items-center rounded-sm border font-mono text-[10px] ${
                      isDone
                        ? 'border-done bg-done/15 text-done'
                        : 'border-line-strong text-transparent hover:border-ink'
                    }`}
                  >
                    ✓
                  </button>
                  <a
                    href={`https://leetcode.com/problems/${c.slug}/`}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 text-[13.5px] hover:underline ${
                      isDone ? 'text-faint line-through' : 'text-ink'
                    }`}
                  >
                    {c.name} <span className="text-faint">↗</span>
                    {c.note && (
                      <span className="ml-1 text-[11.5px] text-muted no-underline">
                        — {c.note}
                      </span>
                    )}
                  </a>
                  <span
                    className={`rounded border px-1.5 py-px font-mono text-[9.5px] uppercase tracking-wide ${DIFF_STYLE[c.difficulty]}`}
                  >
                    {c.difficulty}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Embedded scratch IDE */}
        <div className="border-t border-line px-5 py-4">
          <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            your scratchpad · draft & print-debug any of the above
          </div>
          <CodeScratchpad
            storageKey={`invariant.ps-scratch.${set.lessonId}`}
            initialCode={
              '# Draft a solution here, run it, print-debug, then submit on LeetCode.\n\n'
            }
            minHeight={200}
          />
        </div>
      </div>
    </BlockShell>
  );
}
