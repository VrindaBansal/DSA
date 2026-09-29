'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import type { Slot } from '@/content/courses/gre/tests/types';

interface TestSummary {
  id: string;
  number: number;
  title: string;
  order: Slot[];
  timed: boolean;
  essay: boolean;
}

/** When each test fits in the study plan (see the "Study plan" lesson). */
const WHEN: Record<number, string> = {
  1: 'Diagnostic — take it in week 1, before most lessons. The score is a starting point, not a verdict.',
  2: 'Midpoint check — after the arithmetic, word-problem, TC and SE modules.',
  3: 'After all lessons — the first full test with the whole toolkit.',
  4: 'Final phase — two to three weeks out.',
  5: 'Dress rehearsal — about a week before test day, at the time of day you’ll test.',
  6: 'Week 2 — after the first few lessons in each section; see the whole test without the clock.',
  7: 'Week 3 — a careful pass to find what you don’t know yet.',
  8: 'Week 5 — between timed tests, rework every skill without time pressure.',
  9: 'In reserve — for a rework week after a rough timed test: accuracy first, then compare your time with the real limits.',
  10: 'In reserve — one more full set of new questions, at your own pace.',
};

const measureOrder = (t: TestSummary) =>
  t.order
    .filter((s) => s.endsWith('1'))
    .map((s) => (s[0] === 'v' ? 'Verbal' : 'Quant'))
    .join(' first, then ')
    .concat(t.essay ? ' (after Writing)' : '');

export function TestsHomeClient({ courseId, tests }: { courseId: string; tests: TestSummary[] }) {
  const { state, ready } = useProgress();
  const [inProgress, setInProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const m: Record<string, boolean> = {};
    for (const t of tests) {
      try {
        m[t.id] = !!window.localStorage.getItem(`invariant.gre.test.${t.id}`);
      } catch {
        m[t.id] = false;
      }
    }
    setInProgress(m);
  }, [tests]);

  const taken = tests
    .map((t) => ({ t, last: state.tests?.[t.id]?.at(-1) }))
    .filter((x) => x.last);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-10">
      <div className="mb-1 font-mono text-[11px]">
        <Link href={`/course/${courseId}`} className="text-muted hover:text-ink">
          ← course
        </Link>
      </div>
      <h1 className="font-display text-[2rem] font-bold tracking-tight">Full-length practice tests</h1>
      <p className="mt-1 max-w-[66ch] text-[14px] leading-relaxed text-ink-soft">
        Ten complete GRE practice tests. Every one has two Verbal and two Quant sections (12 + 15 questions each) with
        mark &amp; review, an on-screen calculator, and a second section that gets harder or easier depending on how you
        did on the first. <strong>Tests 1–5</strong> run like the real thing — the Issue essay, then the four sections
        on the official clock. <strong>Tests 6–10</strong> are untimed and skip the essay, for working through a full
        test carefully. Every test ends with estimated 130–170 scores, a breakdown by topic and question type, and an
        explanation for every question.
      </p>
      <p className="mt-2 max-w-[66ch] text-[12.5px] leading-relaxed text-muted">
        The questions are original — written to match real GRE questions in format, topic mix, difficulty and traps,
        not copied from ETS. Add the two free official POWERPREP tests from ETS in your last few weeks: they’re the
        only practice scored by ETS’s own algorithm.
      </p>

      {(
        [
          ['Timed tests — real test conditions', tests.filter((t) => t.timed)],
          ['Untimed tests — no clock, no essay', tests.filter((t) => !t.timed)],
        ] as const
      ).map(([heading, group]) =>
        group.length ? (
          <section key={heading} className="mt-7">
            <h2 className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">{heading}</h2>
            <div className="space-y-3">
              {group.map((t) => {
                const hist = state.tests?.[t.id] ?? [];
                const last = hist.at(-1);
                return (
                  <Link
                    key={t.id}
                    href={`/course/${courseId}/tests/${t.id}`}
                    className="block rounded-md border-[1.5px] border-line bg-panel px-5 py-4 transition-colors hover:border-ink"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-display text-[1.15rem] font-bold">{t.title}</span>
                      <span className="font-mono text-[11.5px]">
                        {ready && last ? (
                          <span className="text-done">
                            V {last.verbal.scaled} · Q {last.quant.scaled}
                            {hist.length > 1 ? ` · ${hist.length} attempts` : ''}
                          </span>
                        ) : inProgress[t.id] ? (
                          <span className="text-active-deep">in progress — resume →</span>
                        ) : (
                          <span className="text-muted">not taken</span>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-[13.5px] text-ink-soft">{WHEN[t.number]}</p>
                    <p className="mt-1 font-mono text-[10.5px] text-faint">
                      {t.timed ? '~1 h 58 min' : 'untimed · no essay · 54 questions'} · {measureOrder(t)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null,
      )}

      {ready && taken.length > 1 && (
        <>
          <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Your trend (latest attempt of each)
          </h2>
          <div className="overflow-hidden rounded-md border border-line bg-panel">
            {taken.map(({ t, last }) => (
              <div key={t.id} className="flex items-center gap-4 border-b border-line px-4 py-2 text-[13.5px] last:border-b-0">
                <span className="w-40">{t.title}</span>
                <span className="font-mono">V {last!.verbal.scaled}</span>
                <span className="font-mono">Q {last!.quant.scaled}</span>
                <span className="font-mono text-muted">total {last!.verbal.scaled + last!.quant.scaled}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 rounded-md border border-line bg-paper px-5 py-4 text-[13.5px] leading-relaxed text-ink-soft">
        <div className="mb-1 font-display text-[15px] font-semibold text-ink">After each test</div>
        Spend as long reviewing as you spent testing. For every miss — and every lucky guess — name the reason:
        didn’t know the content, misread, fell for a trap, or ran out of time. Content gaps go back to the lesson and a
        topic drill in the{' '}
        <Link href={`/course/${courseId}/bank`} className="text-active hover:underline">
          practice bank
        </Link>
        ; misreads and traps go on your cheatsheet; timing problems mean more timed sets.
      </div>
    </div>
  );
}
