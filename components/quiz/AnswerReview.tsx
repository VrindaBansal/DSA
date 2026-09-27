import React from 'react';
import type { CardQuestion } from '@/lib/types';
import { RichText } from './RichText';
import { StimulusAbove, StimulusQuantities } from './Stimulus';

const LETTERS = 'ABCDEFGH';
const ROMAN = ['i', 'ii', 'iii'];

/**
 * A static, after-the-fact view of an answered question: what you chose,
 * what was right, and the full explanation. Used for the review screen at
 * the end of a timed section, where feedback was withheld during the run.
 */
export function AnswerReview({ q, answer }: { q: CardQuestion; answer?: string }) {
  const chosen = answer ?? '';
  return (
    <div className="text-[14px]">
      <StimulusAbove s={q.stimulus} />
      <p className="mb-2 font-body text-[15px] leading-relaxed">
        <RichText text={q.prompt} />
      </p>
      <StimulusQuantities s={q.stimulus} />

      {(q.kind === 'mcq' || q.kind === 'multi') && (
        <ul className="space-y-1">
          {q.options.map((opt, i) => {
            const right = q.kind === 'mcq' ? i === q.correctIndex : q.correctIndices.includes(i);
            const picked = q.kind === 'mcq' ? chosen === opt : chosen.split('; ').includes(opt);
            return (
              <li
                key={i}
                className={`flex gap-2 rounded border px-2.5 py-1.5 ${
                  right ? 'border-done bg-done-wash' : picked ? 'border-alert bg-alert-wash' : 'border-line opacity-70'
                }`}
              >
                <span className="font-mono text-[11px] font-semibold text-muted">{LETTERS[i]}</span>
                <span className="flex-1">
                  <RichText text={opt} />
                </span>
                {picked && (
                  <span className={`font-mono text-[10.5px] ${right ? 'text-done' : 'text-alert'}`}>your pick</span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {q.kind === 'numeric' && (
        <p className="font-mono text-[12.5px]">
          your answer: <span className="text-alert">{chosen || '—'}</span> · correct:{' '}
          <span className="text-done">
            {q.prefix ?? ''}
            {q.answerDisplay}
            {q.suffix ? ` ${q.suffix}` : ''}
          </span>
        </p>
      )}

      {q.kind === 'blanks' && (
        <ul className="space-y-1 font-mono text-[12.5px]">
          {q.blanks.map((b, i) => (
            <li key={i}>
              ({ROMAN[i]}) correct: <span className="text-done">{b.options[b.correctIndex]}</span>
            </li>
          ))}
          {chosen && <li className="text-muted">your answer: {chosen}</li>}
        </ul>
      )}

      {q.kind === 'short' && <p className="text-[13.5px] text-ink-soft">{q.modelAnswer}</p>}

      {'explanation' in q && (
        <div className="mt-2.5 rounded border-l-2 border-line-strong bg-paper py-2 pl-3 pr-2 text-[13.5px] leading-relaxed">
          <RichText text={q.explanation} />
        </div>
      )}
      {'distractorNotes' in q && q.distractorNotes && (
        <ul className="mt-2 space-y-0.5 text-[12.5px] text-ink-soft">
          {q.distractorNotes.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-[10.5px] text-faint">{LETTERS[i]}</span>
              <span>
                <RichText text={n} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {q.kind === 'blanks' && q.blankNotes && (
        <ul className="mt-2 space-y-0.5 text-[12.5px] text-ink-soft">
          {q.blankNotes.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-mono text-[10.5px] text-faint">({ROMAN[i]})</span>
              <span>
                <RichText text={n} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
