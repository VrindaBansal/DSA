'use client';

import React from 'react';
import { BlockShell } from './BlockShell';
import { McqCard } from '@/components/quiz/McqCard';
import { ShortCard } from '@/components/quiz/ShortCard';
import { QUESTION_BY_ID } from '@/content/questions';
import { useProgress, useLessonProgress } from '@/lib/progress/provider';

/**
 * Inline comprehension check, mid-lecture (spec §5.1). Blocks nothing —
 * scrolling past is skipping — but every answer is tracked and feeds the
 * review queue.
 */
export function CheckBlock({
  lessonId,
  blockId,
  id,
}: {
  lessonId: string;
  blockId: string;
  id: string;
}) {
  const q = QUESTION_BY_ID[id];
  const { recordCheck } = useProgress();
  const lp = useLessonProgress(lessonId);

  if (!q) {
    return (
      <div className="my-6 rounded border border-alert bg-alert-wash p-3 font-mono text-[12px] text-alert">
        Unknown question id: {id}
      </div>
    );
  }

  const prior = lp.checks[id];

  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-8">
      <div className="rounded-md border border-line bg-panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
            ✎ Check yourself
          </span>
          <span className="font-mono text-[10px] text-faint">
            d{q.difficulty}
            {prior && (
              <span className={prior.correct ? 'text-done' : 'text-alert'}>
                {' '}
                · answered {prior.correct ? '✓' : '✗'}
              </span>
            )}
          </span>
        </div>
        {q.kind === 'mcq' && (
          <McqCard
            q={q}
            priorAnswer={prior?.answer}
            onAnswered={(correct, answer) =>
              recordCheck(lessonId, q, correct, answer)
            }
          />
        )}
        {q.kind === 'short' && (
          <ShortCard
            q={q}
            onGraded={(verdict, answer) =>
              // strict: partial does not count as knowing it (spec §5.2)
              recordCheck(lessonId, q, verdict === 'correct', answer)
            }
          />
        )}
      </div>
    </BlockShell>
  );
}
