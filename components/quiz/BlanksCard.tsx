'use client';

import React, { useState } from 'react';
import type { BlanksQuestion } from '@/lib/types';
import { RichText } from './RichText';
import { StimulusAbove } from './Stimulus';

const ROMAN = ['i', 'ii', 'iii'];

/**
 * GRE multi-blank text completion: one column of three choices per blank.
 * Every blank must be right to earn the point — no partial credit.
 */
export function BlanksCard({
  q,
  onAnswered,
  hideFeedback,
}: {
  q: BlanksQuestion;
  onAnswered?: (correct: boolean, answerText: string) => void;
  hideFeedback?: boolean;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(() => q.blanks.map(() => null));
  const [answered, setAnswered] = useState(false);

  const ready = picks.every((p) => p !== null);
  const allRight = picks.every((p, i) => p === q.blanks[i].correctIndex);

  const submit = () => {
    if (!ready || answered) return;
    setAnswered(true);
    const text = picks
      .map((p, i) => `(${ROMAN[i]}) ${q.blanks[i].options[p ?? 0]}`)
      .join(' / ');
    onAnswered?.(allRight, text);
  };

  return (
    <div>
      <StimulusAbove s={q.stimulus} />
      <p className="mb-3 font-body text-[15.5px] leading-relaxed">
        <RichText text={q.prompt} />
      </p>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${q.blanks.length}, minmax(0, 1fr))` }}
      >
        {q.blanks.map((b, bi) => (
          <div key={bi} className="flex flex-col gap-1.5">
            <div className="text-center font-mono text-[10.5px] uppercase tracking-wider text-muted">
              Blank ({ROMAN[bi]})
            </div>
            {b.options.map((opt, oi) => {
              const on = picks[bi] === oi;
              const correct = b.correctIndex === oi;
              let cls = on
                ? 'border-active bg-active-wash'
                : 'border-line bg-panel hover:border-line-strong';
              if (answered && hideFeedback) {
                cls = on ? 'border-active bg-active-wash' : 'border-line bg-panel opacity-60';
              } else if (answered) {
                if (correct) cls = on ? 'border-done bg-done-wash' : 'border-done border-dashed bg-panel';
                else if (on) cls = 'border-alert bg-alert-wash';
                else cls = 'border-line bg-panel opacity-60';
              }
              return (
                <button
                  key={oi}
                  onClick={() =>
                    !answered &&
                    setPicks((p) => p.map((x, i) => (i === bi ? oi : x)))
                  }
                  disabled={answered}
                  aria-pressed={on}
                  className={`rounded border px-2 py-1.5 text-center text-[14px] transition-colors ${cls} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ))}
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
              allRight ? 'border-done bg-done-wash/50' : 'border-alert bg-alert-wash/50'
            }`}
          >
            <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
              {allRight
                ? 'Correct'
                : `Wrong — ${picks.filter((p, i) => p === q.blanks[i].correctIndex).length}/${q.blanks.length} blanks right (no partial credit)`}
            </span>
            <RichText text={q.explanation} />
          </div>
          {q.blankNotes && q.blankNotes.length > 0 && (
            <div className="rounded border border-line bg-paper px-3 py-2">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                Blank by blank
              </div>
              <ul className="space-y-1 text-[13px] leading-snug text-ink-soft">
                {q.blankNotes.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-mono text-[10.5px] text-faint">({ROMAN[i]})</span>
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
