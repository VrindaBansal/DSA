'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import type { LessonMeta, ReviewItem } from '@/lib/types';
import { QUESTION_BY_ID } from '@/content/questions';
import { useProgress } from '@/lib/progress/provider';
import { McqCard } from '@/components/quiz/McqCard';
import { ShortCard } from '@/components/quiz/ShortCard';
import { GROWTH } from '@/lib/review';

/**
 * The spaced repetition queue (spec §11). Wrong → 1 day. Correct → ×2.2.
 * Code exercises that needed ≥2 hints show up as their complexity MCQ.
 */
export function ReviewClient({ lessons }: { lessons: LessonMeta[] }) {
  const { ready, dueReview, answerReview } = useProgress();
  // Snapshot the queue when the session starts so answering doesn't reshuffle it.
  const [queue, setQueue] = useState<ReviewItem[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [nCorrect, setNCorrect] = useState(0);

  const due = ready ? dueReview() : [];
  const lessonById = useMemo(
    () => Object.fromEntries(lessons.map((l) => [l.id, l])),
    [lessons],
  );

  if (!ready) return null;

  const start = () => {
    setQueue(due);
    setIdx(0);
    setAnswered(false);
    setNCorrect(0);
  };

  if (!queue) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-10">
        <h1 className="font-display text-[1.7rem] font-bold tracking-tight">
          Review
        </h1>
        {due.length === 0 ? (
          <div className="mt-8 rounded-md border border-dashed border-line-strong bg-paper px-5 py-8 text-center">
            <p className="font-mono text-[13px] text-muted">
              Nothing due. Come back tomorrow.
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-md border-[1.5px] border-ink bg-panel p-6">
            <p className="text-[15px]">
              <span className="font-mono font-semibold text-active-deep">
                {due.length}
              </span>{' '}
              question{due.length === 1 ? '' : 's'} due today.
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              wrong → back to 1 day · correct → interval ×{GROWTH}
            </p>
            <button
              onClick={start}
              className="mt-4 rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
            >
              start →
            </button>
          </div>
        )}
      </div>
    );
  }

  const finished = idx >= queue.length;
  const item = queue[idx];
  const q = item ? QUESTION_BY_ID[item.questionId] : undefined;

  const record = (correct: boolean) => {
    if (!item) return;
    answerReview(item, correct);
    if (correct) setNCorrect((n) => n + 1);
    setAnswered(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-display text-[1.7rem] font-bold tracking-tight">
          Review
        </h1>
        {!finished && (
          <span className="font-mono text-[12px] text-muted">
            {idx + 1}/{queue.length}
          </span>
        )}
      </div>

      {finished ? (
        <div className="rounded-md border-[1.5px] border-ink bg-panel p-6">
          <div className="font-display text-[1.2rem] font-bold">
            {nCorrect}/{queue.length} — queue clear
          </div>
          <p className="mt-1.5 font-mono text-[11.5px] text-muted">
            misses come back tomorrow; the rest pushed out ×{GROWTH}.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block font-mono text-[12px] text-active hover:underline"
          >
            → dashboard
          </Link>
        </div>
      ) : !q ? (
        // orphaned id (content edited) — skip it
        <div className="rounded border border-line bg-panel p-5">
          <p className="font-mono text-[12px] text-muted">
            Question {item.questionId} no longer exists.
          </p>
          <button
            onClick={() => {
              setIdx((i) => i + 1);
              setAnswered(false);
            }}
            className="mt-3 rounded border border-line-strong px-3 py-1 font-mono text-[11px]"
          >
            skip →
          </button>
        </div>
      ) : (
        <div className="rounded-md border border-line bg-panel p-5">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-faint">
            <span>
              {item.asComplexityCheck && 'complexity re-check · '}
              from{' '}
              <Link
                href={`/lesson/${q.lessonId}`}
                className="text-active hover:underline"
              >
                {lessonById[q.lessonId]?.title ?? q.lessonId}
              </Link>
            </span>
            <span>
              interval {item.intervalDays.toFixed(1)}d · lapses {item.lapses}
            </span>
          </div>

          {q.kind === 'code' && q.complexityCheck ? (
            <McqCard
              key={q.id + String(idx)}
              q={{ ...q.complexityCheck, id: q.id }}
              onAnswered={(correct) => record(correct)}
            />
          ) : q.kind === 'mcq' ? (
            <McqCard
              key={q.id + String(idx)}
              q={q}
              onAnswered={(correct) => record(correct)}
            />
          ) : q.kind === 'short' ? (
            <ShortCard
              key={q.id + String(idx)}
              q={q}
              onGraded={(verdict) => record(verdict === 'correct')}
            />
          ) : (
            <p className="font-mono text-[12px] text-muted">
              (code exercise — practice it on{' '}
              <Link href="/practice/code" className="text-active underline">
                the exercise page
              </Link>
              )
            </p>
          )}

          {answered && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setIdx((i) => i + 1);
                  setAnswered(false);
                }}
                className="rounded border-[1.5px] border-ink bg-panel px-4 py-1.5 font-mono text-[12px] hover:bg-active-wash"
              >
                {idx + 1 < queue.length ? 'next →' : 'finish'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
