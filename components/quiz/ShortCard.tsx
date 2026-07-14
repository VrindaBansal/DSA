'use client';

import React, { useState } from 'react';
import type { ShortQuestion, GradeResult } from '@/lib/types';

/**
 * Short-response question, graded server-side against the rubric only
 * (spec §5.2). Strict but not pedantic; model answer shown after grading.
 */
export function ShortCard({
  q,
  onGraded,
}: {
  q: ShortQuestion;
  onGraded?: (verdict: GradeResult['verdict'], answer: string) => void;
}) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const grade = async () => {
    if (!text.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          prompt: q.prompt,
          rubric: q.rubric,
          answer: text,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `grading failed (${res.status})`);
      }
      const g: GradeResult = await res.json();
      setResult(g);
      onGraded?.(g.verdict, text);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'grading failed');
    } finally {
      setBusy(false);
    }
  };

  const verdictTone =
    result?.verdict === 'correct'
      ? 'bg-done-wash text-done border-done'
      : result?.verdict === 'partial'
        ? 'bg-active-wash text-active-deep border-active'
        : 'bg-alert-wash text-alert border-alert';

  return (
    <div>
      <p className="mb-3 font-body text-[15.5px] leading-relaxed">{q.prompt}</p>
      {!result && (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Answer in your own words — hand-waving will be called out."
            className="w-full rounded border border-line bg-panel p-3 font-body text-[14.5px] leading-relaxed outline-none focus:border-active"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={grade}
              disabled={busy || !text.trim()}
              className="rounded border border-active bg-active px-3.5 py-1.5 font-mono text-[11.5px] text-white transition-colors hover:bg-active-deep disabled:opacity-40"
            >
              {busy ? 'grading…' : 'grade against rubric'}
            </button>
            {error && (
              <span className="font-mono text-[11px] text-alert">
                {error} — is OPENAI_API_KEY set in .env.local?
              </span>
            )}
          </div>
        </>
      )}

      {result && (
        <div className="space-y-2.5">
          <div className="rounded border border-line bg-paper px-3 py-2 text-[14px] italic leading-relaxed text-ink-soft">
            “{text}”
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded border px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider ${verdictTone}`}
            >
              {result.verdict}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {result.hitRubricPoints.length > 0 && (
              <div className="rounded border border-done/40 bg-done-wash/40 px-3 py-2">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-done">
                  You hit
                </div>
                <ul className="space-y-1 text-[13px] leading-snug">
                  {result.hitRubricPoints.map((p, i) => (
                    <li key={i}>✓ {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.missed.length > 0 && (
              <div className="rounded border border-alert/40 bg-alert-wash/40 px-3 py-2">
                <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-alert">
                  You dodged
                </div>
                <ul className="space-y-1 text-[13px] leading-snug">
                  {result.missed.map((p, i) => (
                    <li key={i}>✗ {p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            {result.feedback}
          </p>
          <div className="rounded border-l-2 border-line-strong bg-paper py-2 pl-3 pr-2">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted">
              Model answer
            </div>
            <p className="text-[13.5px] leading-relaxed">{q.modelAnswer}</p>
          </div>
          <button
            onClick={() => {
              setResult(null);
              setText('');
            }}
            className="font-mono text-[11px] text-muted underline hover:text-ink"
          >
            try again
          </button>
        </div>
      )}
    </div>
  );
}
