'use client';

import React, { useState } from 'react';
import type { NumericQuestion } from '@/lib/types';
import { RichText } from './RichText';
import { StimulusAbove, StimulusQuantities } from './Stimulus';

/** Parses "12", "-3.5", ".75", "1,200", or "3/4". NaN if it isn't a number. */
export function parseNumeric(raw: string): number {
  const s = raw.replace(/,/g, '').replace(/\s+/g, '').replace(/−/g, '-');
  if (!s) return NaN;
  const frac = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (frac) {
    const d = Number(frac[2]);
    return d === 0 ? NaN : Number(frac[1]) / d;
  }
  return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? Number(s) : NaN;
}

/** Exact match (to float noise), or within half a unit of `roundTo`. */
export function numericCorrect(value: number, q: Pick<NumericQuestion, 'answer' | 'roundTo'>): boolean {
  if (!Number.isFinite(value)) return false;
  if (q.roundTo) return Math.abs(value - q.answer) <= q.roundTo / 2 + 1e-9;
  return Math.abs(value - q.answer) <= 1e-9 * Math.max(1, Math.abs(q.answer));
}

/**
 * GRE numeric entry. No choices to lean on: type the value. Fraction
 * questions get the two-box numerator/denominator entry; equivalent
 * fractions (6/8 for 3/4) count, as they do on the real test.
 */
export function NumericCard({
  q,
  onAnswered,
  hideFeedback,
}: {
  q: NumericQuestion;
  onAnswered?: (correct: boolean, answerText: string) => void;
  hideFeedback?: boolean;
}) {
  const [v, setV] = useState('');
  const [num, setNum] = useState('');
  const [den, setDen] = useState('');
  const [answered, setAnswered] = useState(false);
  const [right, setRight] = useState(false);

  const text = q.fraction ? `${num}/${den}` : v;
  const value = q.fraction
    ? num.trim() && den.trim()
      ? parseNumeric(num) / parseNumeric(den)
      : NaN
    : parseNumeric(v);
  const ready = Number.isFinite(value);

  const submit = () => {
    if (!ready || answered) return;
    const ok = numericCorrect(value, q);
    setRight(ok);
    setAnswered(true);
    onAnswered?.(ok, text);
  };

  const box =
    'rounded border-[1.5px] border-line-strong bg-panel px-2.5 py-1.5 text-center font-mono text-[14px] outline-none focus:border-active disabled:opacity-80';

  return (
    <div>
      <StimulusAbove s={q.stimulus} />
      <p className="mb-3 font-body text-[15.5px] leading-relaxed">
        <RichText text={q.prompt} />
      </p>
      <StimulusQuantities s={q.stimulus} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-wrap items-center gap-3"
      >
        {q.prefix && <span className="font-mono text-[14px]">{q.prefix}</span>}
        {q.fraction ? (
          <span className="inline-flex flex-col items-center gap-1">
            <input
              value={num}
              onChange={(e) => setNum(e.target.value)}
              disabled={answered}
              inputMode="decimal"
              aria-label="numerator"
              className={`${box} w-24`}
            />
            <span className="h-[1.5px] w-24 bg-ink" aria-hidden />
            <input
              value={den}
              onChange={(e) => setDen(e.target.value)}
              disabled={answered}
              inputMode="decimal"
              aria-label="denominator"
              className={`${box} w-24`}
            />
          </span>
        ) : (
          <input
            value={v}
            onChange={(e) => setV(e.target.value)}
            disabled={answered}
            inputMode="decimal"
            aria-label="your answer"
            placeholder="your answer"
            className={`${box} w-36`}
          />
        )}
        {q.suffix && <span className="font-mono text-[14px]">{q.suffix}</span>}
        {!answered && (
          <button
            type="submit"
            disabled={!ready}
            className="rounded border border-active bg-active px-3.5 py-1.5 font-mono text-[11.5px] text-white transition-colors hover:bg-active-deep disabled:opacity-40"
          >
            check
          </button>
        )}
      </form>
      {q.roundTo && !answered && (
        <p className="mt-1.5 font-mono text-[10.5px] text-faint">
          round to the nearest {q.roundTo === 1 ? 'whole number' : q.roundTo}
        </p>
      )}

      {answered && hideFeedback && (
        <p className="mt-3 font-mono text-[11px] text-muted">answer locked in — review comes at the end</p>
      )}

      {answered && !hideFeedback && (
        <div
          className={`mt-3 rounded border-l-2 py-2 pl-3 pr-2 text-[13.5px] leading-relaxed ${
            right ? 'border-done bg-done-wash/50' : 'border-alert bg-alert-wash/50'
          }`}
        >
          <span className="mr-2 font-mono text-[10px] font-semibold uppercase tracking-wider">
            {right ? 'Correct' : 'Wrong'}
          </span>
          <span className="mr-1 font-mono text-[11.5px]">
            Answer: {q.prefix ?? ''}
            {q.answerDisplay}
            {q.suffix ? ` ${q.suffix}` : ''}.
          </span>
          <RichText text={q.explanation} />
        </div>
      )}
    </div>
  );
}
