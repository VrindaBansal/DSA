'use client';

import React, { useState } from 'react';
import type { MultiQuestion } from '@/lib/types';
import { RichText } from './RichText';
import { StimulusAbove, StimulusQuantities } from './Stimulus';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * GRE "select one or more" and sentence equivalence (exactly 2 of 6).
 * All-or-nothing, exactly like the real test: no partial credit.
 */
export function MultiCard({
  q,
  onAnswered,
  hideFeedback,
}: {
  q: MultiQuestion;
  onAnswered?: (correct: boolean, answerText: string) => void;
  hideFeedback?: boolean;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [answered, setAnswered] = useState(false);
  const want = new Set(q.correctIndices);
  const isRight =
    selected.size === want.size && [...selected].every((i) => want.has(i));

  const toggle = (i: number) => {
    if (answered) return;
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else {
        // exact-count questions: selecting past the limit swaps out the oldest
        if (q.selectCount && n.size >= q.selectCount) {
          const first = n.values().next().value;
          if (first !== undefined) n.delete(first);
        }
        n.add(i);
      }
      return n;
    });
  };

  const ready = q.selectCount ? selected.size === q.selectCount : selected.size > 0;

  const submit = () => {
    if (!ready || answered) return;
    setAnswered(true);
    const text = [...selected]
      .sort((a, b) => a - b)
      .map((i) => q.options[i])
      .join('; ');
    onAnswered?.(isRight, text);
  };

  return (
    <div>
      <StimulusAbove s={q.stimulus} />
      <p className="mb-2 font-body text-[15.5px] leading-relaxed">
        <RichText text={q.prompt} />
      </p>
      <StimulusQuantities s={q.stimulus} />
      <p className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-muted">
        {q.selectCount
          ? `Select exactly ${q.selectCount === 2 ? 'two' : q.selectCount}`
          : 'Select all that apply'}
      </p>
      <div className="flex flex-col gap-1.5">
        {q.options.map((opt, i) => {
          const on = selected.has(i);
          const correct = want.has(i);
          let cls = on
            ? 'border-active bg-active-wash'
            : 'border-line bg-panel hover:border-line-strong';
          if (answered && hideFeedback) {
            cls = on ? 'border-active bg-active-wash' : 'border-line bg-panel opacity-60';
          } else if (answered) {
            if (correct && on) cls = 'border-done bg-done-wash';
            else if (correct) cls = 'border-done border-dashed bg-panel';
            else if (on) cls = 'border-alert bg-alert-wash';
            else cls = 'border-line bg-panel opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              disabled={answered}
              aria-pressed={on}
              className={`flex items-start gap-3 rounded border px-3 py-2 text-left transition-colors ${cls} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span
                className={`mt-[3px] inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border-[1.5px] font-mono text-[9px] leading-none ${
                  on ? 'border-active bg-active text-white' : 'border-line-strong'
                }`}
                aria-hidden
              >
                {on ? '✓' : ''}
              </span>
              <span className="mt-px font-mono text-[11px] font-semibold text-muted">
                {LETTERS[i]}
              </span>
              <span className="text-[14px] leading-snug">
                <RichText text={opt} />
              </span>
              {answered && !hideFeedback && correct && (
                <span className="ml-auto font-mono text-[11px] text-done">
                  {on ? '✓' : 'missed'}
                </span>
              )}
              {answered && !hideFeedback && on && !correct && (
                <span className="ml-auto font-mono text-[11px] text-alert">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {!answered && (
        <div className="mt-3">
          <button
            onClick={submit}
            disabled={!ready}
            className="rounded border border-active bg-active px-3.5 py-1.5 font-mono text-[11.5px] text-white transition-colors hover:bg-active-deep disabled:opacity-40"
          >
            check
          </button>
        </div>
      )}

      {answered && hideFeedback && (
        <p className="mt-3 font-mono text-[11px] text-muted">answer locked in — review comes at the end</p>
      )}

      {answered && !hideFeedback && (
        <div className="mt-3 space-y-2.5">
          <div
            className={`rounded border-l-2 py-2 pl-3 pr-2 text-[13.5px] leading-relaxed ${
              isRight ? 'border-done bg-done-wash/50' : 'border-alert bg-alert-wash/50'
            }`}
          >
            <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
              {isRight ? 'Correct' : 'Wrong'}
            </span>
            {!isRight && (
              <span className="mr-1 font-mono text-[11px]">
                Answer: {q.correctIndices.map((i) => LETTERS[i]).join(', ')}.
              </span>
            )}
            <RichText text={q.explanation} />
          </div>
          {q.distractorNotes && q.distractorNotes.length > 0 && (
            <div className="rounded border border-line bg-paper px-3 py-2">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                Choice by choice
              </div>
              <ul className="space-y-1 text-[13px] leading-snug text-ink-soft">
                {q.distractorNotes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-mono text-[10.5px] text-faint">{LETTERS[i]}</span>
                    <span>
                      <RichText text={n} />
                    </span>
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
