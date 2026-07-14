'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import type { CodeQuestion, LessonMeta } from '@/lib/types';
import { ALL_QUESTIONS } from '@/content/questions';
import { ExerciseCard } from '@/components/blocks/Exercise';
import { useProgress } from '@/lib/progress/provider';

export function CodePracticeClient({ lessons }: { lessons: LessonMeta[] }) {
  const { state } = useProgress();
  const [openId, setOpenId] = useState<string | null>(null);
  const codeQs = ALL_QUESTIONS.filter(
    (q): q is CodeQuestion => q.kind === 'code',
  );
  const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l]));

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-10">
      <h1 className="font-display text-[1.7rem] font-bold tracking-tight">
        Coding exercises
      </h1>
      <p className="mt-1 font-mono text-[11.5px] text-muted">
        small, structural, pedagogical — the real problem grind lives on
        LeetCode. Python boots in your browser on first run.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {codeQs.map((q) => {
          const cp = state.lessons[q.lessonId]?.code[q.id];
          const open = openId === q.id;
          return (
            <div
              key={q.id}
              className="overflow-hidden rounded-md border border-line bg-panel"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`font-mono text-[13px] ${cp?.passed ? 'text-done' : 'text-faint'}`}
                >
                  {cp?.passed ? '✓' : '○'}
                </span>
                <div className="flex-1">
                  <div className="text-[14.5px] font-medium leading-snug">
                    {q.prompt}
                  </div>
                  <div className="mt-0.5 font-mono text-[10.5px] text-muted">
                    d{q.difficulty} ·{' '}
                    <Link
                      href={`/lesson/${q.lessonId}`}
                      className="text-active hover:underline"
                    >
                      {lessonById[q.lessonId]?.title ?? q.lessonId}
                    </Link>
                    {cp && cp.attempts > 0 && (
                      <span> · {cp.attempts} runs · {cp.hintsUsed} hints</span>
                    )}
                  </div>
                </div>
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
  );
}
