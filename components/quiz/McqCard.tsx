'use client';

import React, { useState } from 'react';
import type { McqQuestion, ComplexityCheck } from '@/lib/types';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * MCQ, graded client-side, instantly. Explanation AND distractor notes are
 * always shown after answering — right or wrong (spec §5.2).
 */
export function McqCard({
  q,
  onAnswered,
  priorAnswer,
}: {
  q: McqQuestion | (ComplexityCheck & { id: string });
  onAnswered?: (correct: boolean, answerText: string) => void;
  priorAnswer?: string;
}) {
  const priorIndex =
    priorAnswer != null ? q.options.findIndex((o) => o === priorAnswer) : -1;
  const [selected, setSelected] = useState<number | null>(
    priorIndex >= 0 ? priorIndex : null,
  );
  const [answered, setAnswered] = useState(priorIndex >= 0);

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    onAnswered?.(i === q.correctIndex, q.options[i]);
  };

  const distractorNotes = 'distractorNotes' in q ? q.distractorNotes : undefined;

  return (
    <div>
      <p className="mb-3 font-body text-[15.5px] leading-relaxed">{q.prompt}</p>
      <div className="flex flex-col gap-1.5">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selected;
          let cls = 'border-line bg-panel hover:border-line-strong';
          if (answered) {
            if (isCorrect) cls = 'border-done bg-done-wash';
            else if (isSelected) cls = 'border-alert bg-alert-wash';
            else cls = 'border-line bg-panel opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={`flex items-start gap-3 rounded border px-3 py-2 text-left transition-colors ${cls} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span
                className={`mt-px font-mono text-[11px] font-semibold ${
                  answered && isCorrect
                    ? 'text-done'
                    : answered && isSelected
                      ? 'text-alert'
                      : 'text-muted'
                }`}
              >
                {LETTERS[i]}
              </span>
              <span className="text-[14px] leading-snug">{opt}</span>
              {answered && isCorrect && (
                <span className="ml-auto font-mono text-[11px] text-done">✓</span>
              )}
              {answered && isSelected && !isCorrect && (
                <span className="ml-auto font-mono text-[11px] text-alert">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-3 space-y-2.5">
          <div
            className={`rounded border-l-2 py-2 pl-3 pr-2 text-[13.5px] leading-relaxed ${
              selected === q.correctIndex
                ? 'border-done bg-done-wash/50'
                : 'border-alert bg-alert-wash/50'
            }`}
          >
            <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
              {selected === q.correctIndex ? 'Correct' : 'Wrong'}
            </span>
            {q.explanation}
          </div>
          {distractorNotes && distractorNotes.length > 0 && (
            <div className="rounded border border-line bg-paper px-3 py-2">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                Why the wrong ones are tempting
              </div>
              <ul className="space-y-1 text-[13px] leading-snug text-ink-soft">
                {distractorNotes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-mono text-[10.5px] text-faint">
                      {LETTERS[i]}
                    </span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
