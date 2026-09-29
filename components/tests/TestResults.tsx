'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import type { PracticeTestResult, TestMeasureResult } from '@/lib/types';
import { useProgress } from '@/lib/progress/provider';
import { useTutor } from '@/components/tutor/TutorContext';
import { AnswerReview } from '@/components/quiz/AnswerReview';
import type { Measure, PracticeTest, TestFormat, TestQuestion, TestSection } from '@/content/courses/gre/tests/types';
import { isAnswered, isCorrect, responseText } from '@/content/courses/gre/tests/grade';
import { scoreBand } from '@/content/courses/gre/tests/scoring';
import { FORMAT_LABEL, MEASURE_LABEL, sectionForSlot } from '@/content/courses/gre/tests/runtime';

const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0);
const mins = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s) % 60).padStart(2, '0')}`;

export function TestResults({
  test,
  result,
  lessonTitle,
  onBack,
}: {
  test: PracticeTest;
  result: PracticeTestResult;
  lessonTitle: Record<string, string>;
  onBack: () => void;
}) {
  const { queueForReview, state } = useProgress();
  const { askGeneral } = useTutor();
  const levels = { verbal: result.verbal.level, quant: result.quant.level };
  const sections = useMemo(() => test.order.map((s) => sectionForSlot(test, s, levels)!), [test, levels.verbal, levels.quant]); // eslint-disable-line react-hooks/exhaustive-deps
  const all = sections.flatMap((s) => s.questions);
  const r = result.responses;
  const missed = all.filter((q) => !isCorrect(q, r[q.id]));
  const alreadyQueued = missed.filter((q) => state.review[q.id]).length;
  const [queued, setQueued] = useState(false);

  const byFormat = new Map<string, { right: number; total: number }>();
  const byTopic = new Map<string, { right: number; total: number; measure: Measure }>();
  for (const s of sections)
    for (const q of s.questions) {
      const ok = isCorrect(q, r[q.id]);
      const fk = formatGroup(q.format);
      const f = byFormat.get(fk) ?? { right: 0, total: 0 };
      f.total++;
      if (ok) f.right++;
      byFormat.set(fk, f);
      const t = byTopic.get(q.lessonId) ?? { right: 0, total: 0, measure: s.measure };
      t.total++;
      if (ok) t.right++;
      byTopic.set(q.lessonId, t);
    }

  const timed = test.timed !== false;
  const words = result.essay.trim() ? result.essay.trim().split(/\s+/).length : 0;
  const essayAsk = test.essay
    ? `Please score my practice GRE Issue essay (0–6) and critique it against the rubric — position, reasons and examples, counterarguments, organization, language. Quote specific sentences; don't rewrite it for me.

Prompt: ${test.essay.claim}
${test.essay.task}

My essay (${words} words, written in ${mins(result.seconds.awa ?? 1800)} min):
${result.essay}`
    : '';

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-8">
      <button onClick={onBack} className="font-mono text-[11px] text-muted hover:text-ink">
        ← {test.title}
      </button>
      <div className="mt-3 rounded-md border-[1.5px] border-ink bg-panel p-6">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          {test.title} · results · {new Date(result.at).toLocaleDateString()}
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <ScoreCard measure="verbal" m={result.verbal} />
          <ScoreCard measure="quant" m={result.quant} />
        </div>
        <p className="mt-4 text-[12.5px] leading-relaxed text-muted">
          Scores are <strong>estimates</strong>. ETS doesn’t publish how raw answers convert to 130–170, so these come
          from a model of the real test (the harder second section unlocks the top of the scale). Read them as a band
          of about ±3. For an ETS-scored number, take the official POWERPREP tests.
          {!timed && (
            <>
              {' '}
              <strong>This test was untimed</strong>, so expect a somewhat lower score under the real clock — compare
              your time per section with the real limits below.
            </>
          )}
        </p>
      </div>

      {/* Timing */}
      <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">Timing</h2>
      <div className={`grid gap-2 ${test.essay ? 'sm:grid-cols-5' : 'sm:grid-cols-4'}`}>
        {test.essay && <TimeTile label="Writing" used={result.seconds.awa ?? 0} limit={1800} timed={timed} />}
        {sections.map((s) => (
          <TimeTile key={s.key} label={sectionName(s)} used={result.seconds[s.key] ?? 0} limit={s.minutes * 60} timed={timed} />
        ))}
      </div>

      {/* Breakdowns */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">By question type</h2>
          <div className="divide-y divide-line rounded-md border border-line bg-panel">
            {[...byFormat.entries()].map(([k, v]) => (
              <Row key={k} label={k} right={v.right} total={v.total} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            By topic — weakest first
          </h2>
          <div className="divide-y divide-line rounded-md border border-line bg-panel">
            {[...byTopic.entries()]
              .sort((a, b) => a[1].right / a[1].total - b[1].right / b[1].total || b[1].total - a[1].total)
              .map(([lid, v]) => (
                <Row
                  key={lid}
                  label={lessonTitle[lid] ?? lid}
                  right={v.right}
                  total={v.total}
                  link={v.right < v.total ? `/lesson/${lid}` : undefined}
                />
              ))}
          </div>
          <p className="mt-2 font-mono text-[10.5px] text-faint">
            Relearn a weak topic, then drill it in the{' '}
            <Link href="/course/gre/bank" className="text-active hover:underline">
              practice bank
            </Link>{' '}
            (Topic drills tab).
          </p>
        </div>
      </div>

      {/* Missed → review queue */}
      {missed.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-panel px-5 py-4">
          <div className="text-[14px]">
            <strong>{missed.length}</strong> questions missed or skipped.
            <span className="ml-1 text-ink-soft">Put them in your spaced review queue so they come back until they stick.</span>
          </div>
          <button
            disabled={queued || alreadyQueued === missed.length}
            onClick={() => {
              queueForReview(missed.map((q) => ({ id: q.id, lessonId: q.lessonId })));
              setQueued(true);
            }}
            className="rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep disabled:border-done disabled:bg-done"
          >
            {queued || alreadyQueued === missed.length ? '✓ in your review queue' : `add ${missed.length} to review →`}
          </button>
        </div>
      )}

      {/* Essay */}
      {test.essay && (
        <>
          <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Analytical Writing
          </h2>
          <div className="rounded-md border border-line bg-panel px-5 py-4">
            <p className="font-body text-[14.5px] font-semibold">{test.essay.claim}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              {words} words · {mins(result.seconds.awa ?? 0)} used
            </p>
            {words > 0 ? (
              <>
                <details className="mt-3">
                  <summary className="cursor-pointer font-mono text-[11.5px] text-active">show your essay</summary>
                  <div className="mt-2 whitespace-pre-wrap rounded border border-line bg-paper px-4 py-3 font-body text-[14.5px] leading-relaxed">
                    {result.essay}
                  </div>
                </details>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => askGeneral(essayAsk)}
                    className="rounded border-[1.5px] border-ink bg-panel px-4 py-2 font-mono text-[12px] hover:bg-active-wash"
                  >
                    get tutor feedback &amp; a score estimate →
                  </button>
                  <Link href="/lesson/gre-issue-essay" className="font-mono text-[11px] text-active hover:underline">
                    score it yourself with the rubric →
                  </Link>
                </div>
              </>
            ) : (
              <p className="mt-2 text-[13.5px] text-ink-soft">No essay was written this time.</p>
            )}
          </div>
        </>
      )}

      {/* Answer review */}
      <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
        Every question, explained
      </h2>
      <SectionReview sections={sections} result={result} lessonTitle={lessonTitle} />
    </div>
  );
}

function formatGroup(f: TestFormat): string {
  if (f === 'rc-multi' || f === 'rc-select') return FORMAT_LABEL.rc;
  if (f === 'ps-multi') return FORMAT_LABEL['ps-multi'];
  return FORMAT_LABEL[f];
}

const sectionName = (s: TestSection) =>
  `${s.measure === 'verbal' ? 'Verbal' : 'Quant'} ${s.stage}${s.level ? ` (${s.level})` : ''}`;

function ScoreCard({ measure, m }: { measure: Measure; m: TestMeasureResult }) {
  const [lo, hi] = scoreBand(m.scaled);
  return (
    <div className="rounded border border-line bg-paper px-4 py-3" data-testid={`score-${measure}`}>
      <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{MEASURE_LABEL[measure]}</div>
      <div className="mt-0.5 font-display text-[2.2rem] font-bold leading-none">
        {m.scaled}
        <span className="ml-2 font-mono text-[12px] font-normal text-muted">
          est. · likely {lo}–{hi}
        </span>
      </div>
      <div className="mt-2 font-mono text-[11.5px] text-ink-soft">
        Section 1: {m.firstCorrect}/{m.firstTotal} → routed to the <strong>{m.level}</strong> second section:{' '}
        {m.secondCorrect}/{m.secondTotal}
      </div>
    </div>
  );
}

function TimeTile({ label, used, limit, timed }: { label: string; used: number; limit: number; timed: boolean }) {
  // Timed: did the clock run out? Untimed: how does the time spent compare with the real limit?
  const out = timed ? used >= limit - 1 : used > limit;
  return (
    <div className="rounded border border-line bg-panel px-3 py-2">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{label}</div>
      <div className={`font-mono text-[13px] ${out ? 'text-alert' : ''}`}>
        {mins(used)} <span className="text-faint">{timed ? '/' : 'vs'} {mins(limit)}</span>
      </div>
      {out && (
        <div className="font-mono text-[9.5px] text-alert">{timed ? 'ran out of time' : 'over the real limit'}</div>
      )}
    </div>
  );
}

function Row({ label, right, total, link }: { label: string; right: number; total: number; link?: string }) {
  const tone = right === total ? 'text-done' : pct(right, total) >= 50 ? 'text-active-deep' : 'text-alert';
  return (
    <div className="flex items-center gap-3 px-4 py-2 text-[13.5px]">
      <span className={`w-12 font-mono text-[11.5px] ${tone}`}>
        {right}/{total}
      </span>
      <span className="flex-1">{label}</span>
      {link && (
        <Link href={link} className="font-mono text-[10.5px] text-active hover:underline">
          relearn →
        </Link>
      )}
    </div>
  );
}

function SectionReview({
  sections,
  result,
  lessonTitle,
}: {
  sections: TestSection[];
  result: PracticeTestResult;
  lessonTitle: Record<string, string>;
}) {
  const [tab, setTab] = useState(0);
  const [missesOnly, setMissesOnly] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const s = sections[tab];
  const r = result.responses;
  const shown = s.questions.map((q, i) => ({ q, i })).filter(({ q }) => !missesOnly || !isCorrect(q, r[q.id]));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line">
        <div className="flex flex-wrap gap-1 font-mono text-[11.5px]">
          {sections.map((sec, i) => {
            const right = sec.questions.filter((q) => isCorrect(q, r[q.id])).length;
            return (
              <button
                key={sec.key}
                onClick={() => {
                  setTab(i);
                  setOpen(null);
                }}
                className={`-mb-px border-b-2 px-3 py-2 ${
                  i === tab ? 'border-active text-active-deep' : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {sectionName(sec)} · {right}/{sec.questions.length}
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-1.5 pb-1 font-mono text-[11px] text-muted">
          <input type="checkbox" checked={missesOnly} onChange={(e) => setMissesOnly(e.target.checked)} />
          misses only
        </label>
      </div>
      <div className="mt-3 space-y-2">
        {shown.map(({ q, i }) => (
          <ReviewRow
            key={q.id}
            q={q}
            n={i + 1}
            answered={isAnswered(q, r[q.id])}
            right={isCorrect(q, r[q.id])}
            text={responseText(q, r[q.id])}
            topic={lessonTitle[q.lessonId] ?? q.lessonId}
            open={open === q.id}
            onToggle={() => setOpen(open === q.id ? null : q.id)}
          />
        ))}
        {shown.length === 0 && (
          <p className="rounded border border-dashed border-line-strong px-4 py-6 text-center font-mono text-[12px] text-muted">
            No misses in this section.
          </p>
        )}
      </div>
    </div>
  );
}

function ReviewRow({
  q,
  n,
  answered,
  right,
  text,
  topic,
  open,
  onToggle,
}: {
  q: TestQuestion;
  n: number;
  answered: boolean;
  right: boolean;
  text: string;
  topic: string;
  open: boolean;
  onToggle: () => void;
}) {
  const head = q.format === 'qc' ? `${q.stimulus?.quantities?.a} vs ${q.stimulus?.quantities?.b}` : q.prompt;
  return (
    <div className="rounded-md border border-line bg-panel">
      <button onClick={onToggle} className="flex w-full items-center gap-3 px-4 py-2.5 text-left" aria-expanded={open}>
        <span className={`w-4 font-mono text-[12px] ${right ? 'text-done' : 'text-alert'}`}>
          {right ? '✓' : answered ? '✗' : '—'}
        </span>
        <span className="w-6 font-mono text-[11px] text-muted">{n}</span>
        <span className="flex-1 truncate text-[13.5px]">{head.replace(/\*\*/g, '').split('\n')[0]}</span>
        <span className="hidden font-mono text-[10px] text-faint sm:inline">{FORMAT_LABEL[q.format]}</span>
        <span className="font-mono text-[11px] text-muted">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="border-t border-line px-4 py-3">
          <AnswerReview q={q} answer={text} />
          <div className="mt-2 flex justify-between font-mono text-[10.5px]">
            <span className="text-faint">{answered ? '' : 'not answered · '}topic: {topic}</span>
            <Link href={`/lesson/${q.lessonId}`} className="text-active hover:underline">
              relearn →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
