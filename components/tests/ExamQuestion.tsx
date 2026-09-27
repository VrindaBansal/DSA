'use client';

import React from 'react';
import type { TestResponse } from '@/lib/types';
import type { TestQuestion } from '@/content/courses/gre/tests/types';
import { QC_NO_INFO } from '@/content/courses/gre/tests/author';
import { Paragraphs, RichText } from '@/components/quiz/RichText';
import { StimulusData } from '@/components/quiz/Stimulus';

// One question on the practice-test screen: no feedback, answers can be
// changed until the section ends — exactly like the real test. Ovals for
// "select one", squares for "select one or more", columns for multi-blank
// completions, boxes for numeric entry, clickable sentences for
// select-in-passage.

const ROMAN = ['i', 'ii', 'iii'];

export function directionsFor(q: TestQuestion): string {
  switch (q.format) {
    case 'tc':
      return q.kind === 'blanks'
        ? 'For each blank, choose one entry from its column. Fill all the blanks in the way that best completes the text.'
        : 'Choose the entry that best completes the text.';
    case 'se':
      return 'Choose the two answer choices that each complete the sentence so that it makes sense as a whole and that produce two sentences alike in meaning.';
    case 'rc-multi':
      return 'Consider each choice separately and select every one that applies.';
    case 'rc-select':
      return 'Click on the sentence in the passage that answers the question.';
    case 'qc':
      return 'Compare Quantity A with Quantity B, using any information centered above them, and select one of the four answer choices.';
    case 'ps-multi':
      return 'Select every answer choice that applies.';
    case 'ne':
      return q.kind === 'numeric' && q.fraction
        ? 'Enter your answer as a fraction; it does not need to be reduced.'
        : 'Enter your answer as an integer or a decimal in the box. Give the exact value unless the question asks you to round.';
    default:
      return 'Select one answer choice.';
  }
}

function Oval({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-[3px] inline-block h-[16px] w-[22px] shrink-0 rounded-[50%] border-[1.5px] ${
        on ? 'border-ink bg-ink' : 'border-ink-soft bg-panel'
      }`}
    />
  );
}

function Square({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-[3px] inline-flex h-[16px] w-[16px] shrink-0 items-center justify-center border-[1.5px] text-[11px] leading-none text-white ${
        on ? 'border-ink bg-ink' : 'border-ink-soft bg-panel'
      }`}
    >
      {on ? '✓' : ''}
    </span>
  );
}

/** A passage with some sentences clickable (select-in-passage). */
function SelectablePassage({
  text,
  sentences,
  chosen,
  onPick,
}: {
  text: string;
  sentences: string[];
  chosen?: number;
  onPick: (i: number) => void;
}) {
  const paras = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="font-body text-[15px] leading-relaxed text-ink">
      {paras.map((p, pi) => {
        const hits = sentences
          .map((s, i) => ({ i, at: p.indexOf(s), s }))
          .filter((h) => h.at >= 0)
          .sort((a, b) => a.at - b.at);
        const parts: React.ReactNode[] = [];
        let pos = 0;
        for (const h of hits) {
          if (h.at < pos) continue;
          if (h.at > pos) parts.push(<React.Fragment key={`t${pos}`}>{p.slice(pos, h.at)}</React.Fragment>);
          parts.push(
            <span
              key={`s${h.i}`}
              role="button"
              tabIndex={0}
              data-sentence={h.i}
              onClick={() => onPick(h.i)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPick(h.i)}
              className={`cursor-pointer rounded-sm transition-colors ${
                chosen === h.i ? 'bg-ink text-white' : 'hover:bg-active-wash'
              }`}
            >
              {h.s}
            </span>,
          );
          pos = h.at + h.s.length;
        }
        if (pos < p.length) parts.push(<React.Fragment key={`t${pos}`}>{p.slice(pos)}</React.Fragment>);
        return (
          <p key={pi} className="mb-3 last:mb-0">
            {parts}
          </p>
        );
      })}
    </div>
  );
}

export function ExamQuestion({
  q,
  response,
  onChange,
  groupLabel,
}: {
  q: TestQuestion;
  response: TestResponse | undefined;
  onChange: (r: TestResponse | undefined) => void;
  /** e.g. "Questions 4 to 5 are based on the following passage." */
  groupLabel?: string;
}) {
  const s = q.stimulus;
  const hasPassage = !!s?.passage;
  const groupedData = !!q.group && !hasPassage && !!(s?.charts?.length || s?.table);
  const split = hasPassage || groupedData;

  const left = split ? (
    <div className="rounded border border-line bg-paper px-4 py-3 lg:max-h-[calc(100vh-190px)] lg:overflow-y-auto">
      {groupLabel && <div className="mb-2 font-mono text-[11px] italic text-muted">{groupLabel}</div>}
      {hasPassage ? (
        q.format === 'rc-select' && q.kind === 'mcq' ? (
          <SelectablePassage
            text={s!.passage!}
            sentences={q.options}
            chosen={typeof response === 'number' ? response : undefined}
            onPick={(i) => onChange(i)}
          />
        ) : (
          <Paragraphs text={s!.passage!} className="font-body text-[15px] leading-relaxed text-ink" />
        )
      ) : (
        <StimulusData s={s} />
      )}
    </div>
  ) : null;

  const body = (
    <div data-question-id={q.id}>
      <p className="mb-3 font-mono text-[11px] italic leading-relaxed text-muted">{directionsFor(q)}</p>
      {!split && <StimulusData s={s} />}
      {q.format === 'qc' ? <QcBody q={q} /> : (
        <div className="mb-4 font-body text-[15.5px] leading-relaxed">
          <RichText text={q.prompt} />
        </div>
      )}
      <Answer q={q} response={response} onChange={onChange} />
    </div>
  );

  return split ? (
    <div className="grid gap-5 lg:grid-cols-2">
      {left}
      {body}
    </div>
  ) : (
    <div className="mx-auto max-w-3xl">{body}</div>
  );
}

function QcBody({ q }: { q: TestQuestion }) {
  const quantities = q.stimulus?.quantities;
  return (
    <div className="mb-4">
      {q.prompt !== QC_NO_INFO && (
        <div className="mb-3 text-center font-body text-[15.5px] leading-relaxed">
          <RichText text={q.prompt} />
        </div>
      )}
      {quantities && (
        <div className="grid grid-cols-2 gap-3">
          {(['a', 'b'] as const).map((k) => (
            <div key={k} className="border-t-[1.5px] border-ink px-2 pt-2 text-center">
              <div className="mb-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                Quantity {k.toUpperCase()}
              </div>
              <div className="font-body text-[16px] leading-snug">
                <RichText text={quantities[k]} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Answer({
  q,
  response,
  onChange,
}: {
  q: TestQuestion;
  response: TestResponse | undefined;
  onChange: (r: TestResponse | undefined) => void;
}) {
  switch (q.kind) {
    case 'mcq': {
      if (q.format === 'rc-select') {
        const i = typeof response === 'number' ? response : undefined;
        return (
          <div className="rounded border border-dashed border-line-strong px-3 py-2 text-[13.5px] text-ink-soft">
            {i === undefined ? (
              <span className="font-mono text-[11.5px] text-muted">No sentence selected yet — click one in the passage.</span>
            ) : (
              <>
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Selected: </span>
                <span className="font-body">{q.options[i]}</span>
              </>
            )}
          </div>
        );
      }
      if (q.format === 'tc')
        return (
          <div className="inline-block min-w-[220px] border-[1.5px] border-ink">
            {q.options.map((o, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onChange(i)}
                aria-pressed={response === i}
                className={`block w-full border-b border-line-strong px-4 py-2 text-left font-body text-[15px] last:border-b-0 ${
                  response === i ? 'bg-ink text-white' : 'hover:bg-active-wash'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        );
      return (
        <div className="space-y-1.5">
          {q.options.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i)}
              aria-pressed={response === i}
              className={`flex w-full gap-3 rounded px-2 py-1.5 text-left font-body text-[15px] leading-snug ${
                response === i ? 'bg-active-wash' : 'hover:bg-paper'
              }`}
            >
              <Oval on={response === i} />
              <span className="flex-1">
                <RichText text={o} />
              </span>
            </button>
          ))}
        </div>
      );
    }
    case 'multi': {
      const picked = Array.isArray(response) ? (response as number[]) : [];
      const toggle = (i: number) => {
        if (picked.includes(i)) {
          const next = picked.filter((x) => x !== i);
          onChange(next.length ? next : undefined);
        } else if (q.selectCount && picked.length >= q.selectCount) {
          onChange([...picked.slice(1), i]); // swap out the oldest pick
        } else onChange([...picked, i]);
      };
      return (
        <div className="space-y-1.5">
          {q.options.map((o, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={picked.includes(i)}
              className={`flex w-full gap-3 rounded px-2 py-1.5 text-left font-body text-[15px] leading-snug ${
                picked.includes(i) ? 'bg-active-wash' : 'hover:bg-paper'
              }`}
            >
              <Square on={picked.includes(i)} />
              <span className="flex-1">
                <RichText text={o} />
              </span>
            </button>
          ))}
        </div>
      );
    }
    case 'blanks': {
      const picked = Array.isArray(response) ? (response as (number | null)[]) : q.blanks.map(() => null);
      return (
        <div className="flex flex-wrap gap-4">
          {q.blanks.map((b, bi) => (
            <div key={bi} className="min-w-[170px] border-[1.5px] border-ink">
              <div className="border-b-[1.5px] border-ink bg-paper px-3 py-1 text-center font-mono text-[11px] text-ink-soft">
                Blank ({ROMAN[bi]})
              </div>
              {b.options.map((o, oi) => (
                <button
                  key={oi}
                  type="button"
                  onClick={() => {
                    const next = q.blanks.map((_, k) => picked[k] ?? null);
                    next[bi] = oi;
                    onChange(next);
                  }}
                  aria-pressed={picked[bi] === oi}
                  className={`block w-full border-b border-line-strong px-3 py-2 text-left font-body text-[15px] last:border-b-0 ${
                    picked[bi] === oi ? 'bg-ink text-white' : 'hover:bg-active-wash'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case 'numeric': {
      const raw = typeof response === 'string' ? response : '';
      const clean = (v: string) => v.replace(/[^0-9.\-]/g, '').slice(0, 12);
      const box =
        'w-40 rounded-none border-[1.5px] border-ink bg-panel px-2 py-1.5 font-mono text-[15px] focus:outline-none focus:ring-2 focus:ring-active';
      if (q.fraction) {
        const [num = '', den = ''] = raw.split('/');
        const set = (n: string, d: string) => onChange(n || d ? `${n}/${d}` : undefined);
        return (
          <div className="inline-flex flex-col items-center gap-1.5">
            <input
              aria-label="numerator"
              inputMode="decimal"
              value={num}
              onChange={(e) => set(clean(e.target.value), den)}
              className={`${box} w-28 text-center`}
            />
            <div className="h-[2px] w-32 bg-ink" />
            <input
              aria-label="denominator"
              inputMode="decimal"
              value={den}
              onChange={(e) => set(num, clean(e.target.value))}
              className={`${box} w-28 text-center`}
            />
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2 font-body text-[15px]">
          {q.prefix && <span>{q.prefix}</span>}
          <input
            aria-label="answer"
            inputMode="decimal"
            value={raw}
            onChange={(e) => {
              const v = clean(e.target.value);
              onChange(v ? v : undefined);
            }}
            className={box}
          />
          {q.suffix && <span>{q.suffix}</span>}
        </div>
      );
    }
    default:
      return null;
  }
}
