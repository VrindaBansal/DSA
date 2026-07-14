'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import type { LessonMeta, Question } from '@/lib/types';
import { ALL_QUESTIONS } from '@/content/questions';
import { useProgress } from '@/lib/progress/provider';
import { McqCard } from '@/components/quiz/McqCard';
import { ShortCard } from '@/components/quiz/ShortCard';
import { getModule } from '@/lib/modules';

function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Mixed practice (spec §4): pulls MCQ + short questions across completed
 * lessons — or a whole module when used as the module exam.
 */
export function PracticeClient({
  lessons,
  moduleFilter,
}: {
  lessons: LessonMeta[];
  moduleFilter: string | null;
}) {
  const { state, ready, recordCheck } = useProgress();
  const [seed, setSeed] = useState(() => Date.now() & 0x7fffffff);
  const [idx, setIdx] = useState(0);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);
  const [results, setResults] = useState<{ q: Question; correct: boolean }[]>(
    [],
  );

  const lessonById = useMemo(
    () => Object.fromEntries(lessons.map((l) => [l.id, l])),
    [lessons],
  );

  const pool = useMemo(() => {
    if (!ready) return [];
    let eligible: string[];
    if (moduleFilter) {
      eligible = lessons.filter((l) => l.module === moduleFilter).map((l) => l.id);
    } else {
      const completed = lessons
        .filter((l) => state.lessons[l.id]?.completed)
        .map((l) => l.id);
      const touched = lessons
        .filter((l) => (state.lessons[l.id]?.blocksSeen.length ?? 0) > 0)
        .map((l) => l.id);
      eligible =
        completed.length > 0
          ? completed
          : touched.length > 0
            ? touched
            : lessons.map((l) => l.id);
    }
    const qs = ALL_QUESTIONS.filter(
      (q) => q.kind !== 'code' && eligible.includes(q.lessonId),
    );
    return shuffle(qs, seed);
  }, [ready, moduleFilter, lessons, state.lessons, seed]);

  const restart = () => {
    setSeed(Date.now() & 0x7fffffff);
    setIdx(0);
    setResults([]);
    setAnsweredCurrent(false);
  };

  const modTitle = moduleFilter ? getModule(moduleFilter)?.title : null;

  if (!ready) return null;

  const finished = idx >= pool.length && pool.length > 0;
  const q = pool[idx];

  const onAnswered = (correct: boolean, answerText: string) => {
    if (!q) return;
    recordCheck(q.lessonId, q, correct, answerText);
    setResults((r) => [...r, { q, correct }]);
    setAnsweredCurrent(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-[1.7rem] font-bold tracking-tight">
            {modTitle ? `Module exam · ${modTitle}` : 'Mixed practice'}
          </h1>
          <p className="mt-1 font-mono text-[11.5px] text-muted">
            {moduleFilter
              ? 'every question in this module, shuffled'
              : 'questions from lessons you have finished'}
            {' · '}
            <Link href="/practice/code" className="text-active hover:underline">
              coding exercises →
            </Link>
          </p>
        </div>
        {pool.length > 0 && !finished && (
          <span className="font-mono text-[12px] text-muted">
            {Math.min(idx + 1, pool.length)}/{pool.length}
          </span>
        )}
      </div>

      {pool.length === 0 && (
        <div className="rounded-md border border-dashed border-line-strong bg-paper px-5 py-6 text-center">
          <p className="text-[14px] text-muted">
            Nothing to practice yet — finish a lesson first.
          </p>
          <Link
            href="/"
            className="mt-3 inline-block font-mono text-[12px] text-active hover:underline"
          >
            → curriculum
          </Link>
        </div>
      )}

      {q && !finished && (
        <div className="rounded-md border border-line bg-panel p-5">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-faint">
            <span>
              from{' '}
              <Link
                href={`/lesson/${q.lessonId}`}
                className="text-active hover:underline"
              >
                {lessonById[q.lessonId]?.title ?? q.lessonId}
              </Link>
            </span>
            <span>d{q.difficulty}</span>
          </div>
          {q.kind === 'mcq' && (
            <McqCard key={q.id + seed} q={q} onAnswered={onAnswered} />
          )}
          {q.kind === 'short' && (
            <ShortCard
              key={q.id + seed}
              q={q}
              onGraded={(verdict, answer) =>
                onAnswered(verdict === 'correct', answer)
              }
            />
          )}
          {answeredCurrent && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setIdx((i) => i + 1);
                  setAnsweredCurrent(false);
                }}
                className="rounded border-[1.5px] border-ink bg-panel px-4 py-1.5 font-mono text-[12px] hover:bg-active-wash"
              >
                {idx + 1 < pool.length ? 'next →' : 'finish'}
              </button>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="rounded-md border-[1.5px] border-ink bg-panel p-6">
          <div className="font-display text-[1.2rem] font-bold">
            {results.filter((r) => r.correct).length}/{results.length} correct
          </div>
          {results.some((r) => !r.correct) && (
            <>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                Missed — now queued for review
              </p>
              <ul className="mt-2 space-y-1.5">
                {results
                  .filter((r) => !r.correct)
                  .map(({ q }) => (
                    <li key={q.id} className="text-[13.5px]">
                      <span className="text-alert">✗</span> {q.prompt}{' '}
                      <Link
                        href={`/lesson/${q.lessonId}`}
                        className="font-mono text-[11px] text-active hover:underline"
                      >
                        relearn →
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
          <button
            onClick={restart}
            className="mt-5 rounded border-[1.5px] border-ink bg-panel px-4 py-1.5 font-mono text-[12px] hover:bg-active-wash"
          >
            ↺ again, reshuffled
          </button>
        </div>
      )}
    </div>
  );
}
