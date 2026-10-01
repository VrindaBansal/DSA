'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import type { LessonMeta } from '@/lib/types';
import { useProgress } from '@/lib/progress/provider';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { AnswerReview } from '@/components/quiz/AnswerReview';
import { Powers } from '@/components/quiz/RichText';
import {
  BANK_TOTAL,
  PACE_MIN,
  TOPICS,
  type BankQuestion,
  type BankSetMeta,
  generatorOf,
  getBankQuestion,
  isBankId,
  questionsFor,
  setQuestionIds,
  setsFor,
  trackTotal,
} from '@/content/courses/gre/bank';

type Track = 'quant' | 'verbal';

interface RunSpec {
  title: string;
  ids: string[];
  mode: 'learn' | 'timed';
  setId?: string;
}

const TRACK_LABEL: Record<Track, string> = { quant: 'Quantitative', verbal: 'Verbal' };
const n = (x: number) => x.toLocaleString('en-US');
const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0);

/**
 * The GRE practice bank: 11,000+ generated questions, dealt into numbered
 * sets per track (Foundation → Core → Advanced), plus topic drills, a
 * mistakes list, and timed sections at real GRE pace. Every answer is
 * recorded; misses also enter the spaced-repetition review queue.
 */
export function BankClient({ courseId, lessons }: { courseId: string; lessons: LessonMeta[] }) {
  const [run, setRun] = useState<RunSpec | null>(null);
  const lessonTitle = useMemo(
    () => Object.fromEntries(lessons.map((l) => [l.id, l.title])) as Record<string, string>,
    [lessons],
  );

  if (run)
    return (
      <Runner
        key={run.setId ?? run.title + run.ids[0]}
        spec={run}
        lessonTitle={lessonTitle}
        onExit={() => setRun(null)}
        onStart={setRun}
      />
    );
  return <BankHome courseId={courseId} lessons={lessons} lessonTitle={lessonTitle} onStart={setRun} />;
}

// -----------------------------------------------------------------------------
// Home

function BankHome({
  courseId,
  lessons,
  lessonTitle,
  onStart,
}: {
  courseId: string;
  lessons: LessonMeta[];
  lessonTitle: Record<string, string>;
  onStart: (r: RunSpec) => void;
}) {
  const { state, ready } = useProgress();
  const [track, setTrack] = useState<Track>('quant');
  const [tab, setTab] = useState<'sets' | 'topics' | 'mistakes'>('sets');

  // Remember the last track/tab viewed (per-browser convenience only).
  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('invariant.bank.view') ?? '{}');
      if (saved.track === 'quant' || saved.track === 'verbal') setTrack(saved.track);
      if (['sets', 'topics', 'mistakes'].includes(saved.tab)) setTab(saved.tab);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem('invariant.bank.view', JSON.stringify({ track, tab }));
    } catch {
      /* ignore */
    }
  }, [track, tab]);

  const answers = state.bank.answers;
  const stats = useMemo(() => {
    const s = { quant: { done: 0, right: 0 }, verbal: { done: 0, right: 0 } };
    for (const [id, v] of Object.entries(answers)) {
      if (!isBankId(id)) continue;
      const g = generatorOf(id);
      if (!g) continue;
      s[g.track].done++;
      if (v === 1) s[g.track].right++;
    }
    return s;
  }, [answers]);

  const totalDone = stats.quant.done + stats.verbal.done;
  const totalRight = stats.quant.right + stats.verbal.right;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-10">
      <div className="mb-1 font-mono text-[11px]">
        <Link href={`/course/${courseId}`} className="text-muted hover:text-ink">
          ← course
        </Link>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] font-bold tracking-tight">Practice bank</h1>
          <p className="mt-1 max-w-[64ch] text-[14px] text-ink-soft">
            {n(BANK_TOTAL)} questions with an explanation for every answer choice. Work through the
            numbered sets in order — each mixes every topic at the same difficulty, ramping from
            Foundation to Advanced — or drill one topic, or rerun your mistakes. Misses go to your
            review queue.{' '}
            <Link href="/lesson/gre-practice-bank" className="text-active hover:underline">
              how to use the bank →
            </Link>
          </p>
        </div>
        {ready && (
          <div className="rounded-md border border-line bg-panel px-4 py-3 font-mono text-[11.5px]">
            <div>
              <span className="font-semibold text-active-deep">{n(totalDone)}</span> / {n(BANK_TOTAL)} answered
            </div>
            <div className="text-muted">{totalDone ? `${pct(totalRight, totalDone)}% correct` : 'no answers yet'}</div>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(['quant', 'verbal'] as Track[]).map((t) => (
          <button
            key={t}
            onClick={() => setTrack(t)}
            className={`rounded-md border-[1.5px] px-4 py-3 text-left transition-colors ${
              track === t ? 'border-active bg-active-wash/60' : 'border-line bg-panel hover:border-ink'
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[16px] font-semibold">{TRACK_LABEL[t]}</span>
              <span className="font-mono text-[11px] text-muted">
                {n(trackTotal(t))} questions · {setsFor(t).length} sets
              </span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-line">
              <div className="h-full bg-active" style={{ width: `${(100 * stats[t].done) / trackTotal(t)}%` }} />
            </div>
            <div className="mt-1.5 font-mono text-[10.5px] text-faint">
              {n(stats[t].done)} answered{stats[t].done ? ` · ${pct(stats[t].right, stats[t].done)}% correct` : ''}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-1.5 border-b border-line font-mono text-[12px]">
        {(
          [
            ['sets', 'Numbered sets'],
            ['topics', 'Topic drills'],
            ['mistakes', 'Mistakes'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`-mb-px border-b-2 px-3 py-2 ${
              tab === id ? 'border-active text-active-deep' : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {!ready ? (
        <p className="mt-6 font-mono text-[12px] text-muted">loading your progress…</p>
      ) : tab === 'sets' ? (
        <SetsView track={track} onStart={onStart} />
      ) : tab === 'topics' ? (
        <TopicsView track={track} lessons={lessons} lessonTitle={lessonTitle} onStart={onStart} />
      ) : (
        <MistakesView track={track} lessonTitle={lessonTitle} onStart={onStart} />
      )}
    </div>
  );
}

function scoreTone(correct: number, total: number) {
  const p = total ? correct / total : 0;
  return p >= 0.8 ? 'border-done bg-done-wash text-done' : p >= 0.5 ? 'border-active bg-active-wash text-active-deep' : 'border-alert bg-alert-wash text-alert';
}

function SetsView({ track, onStart }: { track: Track; onStart: (r: RunSpec) => void }) {
  const { state } = useProgress();
  const sets = setsFor(track);
  const results = state.bank.sets;
  const next = sets.find((s) => !results[s.id]) ?? sets[sets.length - 1];
  const [selected, setSelected] = useState<BankSetMeta>(next);
  useEffect(() => setSelected(next), [track]); // eslint-disable-line react-hooks/exhaustive-deps

  const sel = sets.find((s) => s.id === selected.id) ?? next;
  const ids = useMemo(() => setQuestionIds(sel.id), [sel.id]);
  const minutes = Math.round(ids.length * PACE_MIN[track]);
  const res = results[sel.id];
  const doneCount = sets.filter((s) => results[s.id]).length;

  const start = (mode: RunSpec['mode']) =>
    onStart({ title: `${TRACK_LABEL[track]} set ${sel.number}`, ids, mode, setId: sel.id });

  return (
    <div className="mt-6">
      <div className="rounded-md border-[1.5px] border-ink bg-panel p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {sel.id === next.id && !res ? 'next up' : 'selected'} · {sel.tier}
            </div>
            <div className="mt-0.5 font-display text-[1.35rem] font-bold">
              {TRACK_LABEL[track]} set {sel.number}
              <span className="ml-2 font-mono text-[12px] font-normal text-muted">
                {ids.length} questions
              </span>
            </div>
          </div>
          <div className="font-mono text-[11.5px] text-muted">
            {doneCount} of {sets.length} sets done
            {res && (
              <span className={`ml-2 rounded border px-1.5 py-0.5 ${scoreTone(res.correct, res.total)}`}>
                last: {res.correct}/{res.total}
                {res.seconds ? ` in ${Math.round(res.seconds / 60)} min` : ''}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => start('learn')}
            className="rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
          >
            practice · feedback after each question →
          </button>
          <button
            onClick={() => start('timed')}
            className="rounded border-[1.5px] border-ink bg-panel px-4 py-2 font-mono text-[12px] hover:bg-active-wash"
          >
            timed section · {minutes} min · review at the end
          </button>
        </div>
        <p className="mt-2.5 font-mono text-[10.5px] text-faint">
          Timed mode runs at real GRE pace ({track === 'quant' ? '26 min per 15 questions' : '23 min per 15 questions'}) and
          withholds feedback until the end, like the test.
        </p>
      </div>

      {(['Foundation', 'Core', 'Advanced'] as const).map((tier) => {
        const inTier = sets.filter((s) => s.tier === tier);
        return (
          <div key={tier} className="mt-7">
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                {tier} · sets {inTier[0].number}–{inTier[inTier.length - 1].number}
              </h3>
              <span className="font-mono text-[10.5px] text-faint">
                {inTier.filter((s) => results[s.id]).length}/{inTier.length} done
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {inTier.map((s) => {
                const r = results[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    title={r ? `${r.correct}/${r.total}` : 'not started'}
                    className={`h-8 w-11 rounded border font-mono text-[10.5px] ${
                      r ? scoreTone(r.correct, r.total) : 'border-line bg-panel text-muted hover:border-ink'
                    } ${s.id === sel.id ? 'ring-2 ring-active ring-offset-1' : ''}`}
                  >
                    {s.number}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="mt-6 font-mono text-[10.5px] text-faint">
        tile colors: green ≥ 80% · blue 50–79% · red &lt; 50% · outlined = not started
      </p>
    </div>
  );
}

/** Next questions for a topic drill: unanswered first, then misses, then the rest. */
function drillIds(genId: string, answers: Record<string, 0 | 1>, size = 10): string[] {
  const qs = questionsFor(genId);
  const grouped = qs.some((q) => q.group);
  if (grouped) {
    const units: BankQuestion[][] = [];
    for (const q of qs) {
      const last = units[units.length - 1];
      if (last && last[0].group === q.group) last.push(q);
      else units.push([q]);
    }
    const rank = (u: BankQuestion[]) => (u.some((q) => answers[q.id] === undefined) ? 0 : u.some((q) => answers[q.id] === 0) ? 1 : 2);
    const ordered = [...units].sort((a, b) => rank(a) - rank(b));
    const out: string[] = [];
    for (const u of ordered) {
      if (out.length >= 8) break;
      out.push(...u.map((q) => q.id));
    }
    return out;
  }
  const rank = (q: BankQuestion) => (answers[q.id] === undefined ? 0 : answers[q.id] === 0 ? 1 : 2);
  return [...qs].sort((a, b) => rank(a) - rank(b)).slice(0, size).map((q) => q.id);
}

function TopicsView({
  track,
  lessons,
  lessonTitle,
  onStart,
}: {
  track: Track;
  lessons: LessonMeta[];
  lessonTitle: Record<string, string>;
  onStart: (r: RunSpec) => void;
}) {
  const { state } = useProgress();
  const answers = state.bank.answers;
  const order = new Map(lessons.map((l, i) => [l.id, i]));
  const topics = TOPICS.filter((t) => t.track === track);
  const byLesson = new Map<string, typeof topics>();
  for (const t of topics) byLesson.set(t.lessonId, [...(byLesson.get(t.lessonId) ?? []), t]);
  const lessonIds = [...byLesson.keys()].sort((a, b) => (order.get(a) ?? 99) - (order.get(b) ?? 99));

  const counts = useMemo(() => {
    const c: Record<string, { done: number; right: number }> = {};
    for (const [id, v] of Object.entries(answers)) {
      const g = isBankId(id) ? generatorOf(id) : undefined;
      if (!g) continue;
      c[g.id] ??= { done: 0, right: 0 };
      c[g.id].done++;
      if (v === 1) c[g.id].right++;
    }
    return c;
  }, [answers]);

  return (
    <div className="mt-6 space-y-6">
      {lessonIds.map((lid) => (
        <div key={lid}>
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="font-display text-[15px] font-semibold">{lessonTitle[lid] ?? lid}</h3>
            <Link href={`/lesson/${lid}`} className="font-mono text-[10.5px] text-active hover:underline">
              lesson →
            </Link>
          </div>
          <div className="divide-y divide-line rounded-md border border-line bg-panel">
            {byLesson.get(lid)!.map((t) => {
              const c = counts[t.id] ?? { done: 0, right: 0 };
              return (
                <div key={t.id} className="flex flex-wrap items-center gap-3 px-4 py-2.5">
                  <span className="min-w-[14rem] flex-1 text-[14px]">{t.topic}</span>
                  <span className="w-28">
                    <span className="block h-[3px] w-full bg-line">
                      <span className="block h-full bg-active" style={{ width: `${(100 * c.done) / t.count}%` }} />
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-faint">
                      {c.done}/{t.count}
                      {c.done ? ` · ${pct(c.right, c.done)}%` : ''}
                    </span>
                  </span>
                  <button
                    onClick={() => onStart({ title: `Drill · ${t.topic}`, ids: drillIds(t.id, answers), mode: 'learn' })}
                    className="rounded border border-line-strong px-3 py-1 font-mono text-[11px] hover:border-ink hover:bg-active-wash"
                  >
                    drill →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function MistakesView({
  track,
  lessonTitle,
  onStart,
}: {
  track: Track;
  lessonTitle: Record<string, string>;
  onStart: (r: RunSpec) => void;
}) {
  const { state } = useProgress();
  const wrong = useMemo(
    () =>
      Object.entries(state.bank.answers)
        .filter(([id, v]) => v === 0 && isBankId(id) && generatorOf(id)?.track === track)
        .map(([id]) => id),
    [state.bank.answers, track],
  );
  const byTopic = new Map<string, string[]>();
  for (const id of wrong) {
    const g = generatorOf(id)!;
    byTopic.set(g.id, [...(byTopic.get(g.id) ?? []), id]);
  }

  if (wrong.length === 0)
    return (
      <div className="mt-6 rounded-md border border-dashed border-line-strong bg-paper px-5 py-8 text-center font-mono text-[12.5px] text-muted">
        No open {TRACK_LABEL[track].toLowerCase()} mistakes. Questions you miss show up here until you get them right.
      </div>
    );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border-[1.5px] border-ink bg-panel p-5">
        <div>
          <div className="font-display text-[1.2rem] font-bold">{wrong.length} open mistakes</div>
          <p className="mt-0.5 font-mono text-[11px] text-muted">
            A question leaves this list when you answer it correctly.
          </p>
        </div>
        <button
          onClick={() => onStart({ title: 'Redo mistakes', ids: wrong.slice(0, 20), mode: 'learn' })}
          className="rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
        >
          redo {Math.min(20, wrong.length)} →
        </button>
      </div>
      <div className="mt-5 divide-y divide-line rounded-md border border-line bg-panel">
        {[...byTopic.entries()]
          .sort((a, b) => b[1].length - a[1].length)
          .map(([gid, ids]) => {
            const g = generatorOf(ids[0])!;
            return (
              <div key={gid} className="flex flex-wrap items-center gap-3 px-4 py-2.5">
                <span className="flex-1 text-[14px]">
                  {g.topic}
                  <Link href={`/lesson/${g.lessonId}`} className="ml-2 font-mono text-[10.5px] text-active hover:underline">
                    relearn: {lessonTitle[g.lessonId] ?? g.lessonId}
                  </Link>
                </span>
                <span className="font-mono text-[11px] text-alert">{ids.length}</span>
                <button
                  onClick={() => onStart({ title: `Mistakes · ${g.topic}`, ids: ids.slice(0, 20), mode: 'learn' })}
                  className="rounded border border-line-strong px-3 py-1 font-mono text-[11px] hover:border-ink hover:bg-active-wash"
                >
                  redo →
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Runner

function Runner({
  spec,
  lessonTitle,
  onExit,
  onStart,
}: {
  spec: RunSpec;
  lessonTitle: Record<string, string>;
  onExit: () => void;
  onStart: (r: RunSpec) => void;
}) {
  const { recordBankAnswer, recordBankSet } = useProgress();
  const questions = useMemo(
    () => spec.ids.map((id) => getBankQuestion(id)).filter((q): q is BankQuestion => !!q),
    [spec.ids],
  );
  const track: Track = (generatorOf(spec.ids[0])?.track as Track) ?? 'quant';
  const limitSec = spec.mode === 'timed' ? Math.round(questions.length * PACE_MIN[track] * 60) : 0;

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { correct: boolean; text: string }>>({});
  const [finished, setFinished] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [finished]);

  const secs = Math.floor((now - startedAt) / 1000);
  const remaining = limitSec - secs;

  const finish = () => {
    if (finished) return;
    const used = Math.floor((Date.now() - startedAt) / 1000);
    setElapsed(used);
    setFinished(true);
    if (spec.setId) {
      const correct = questions.filter((q) => answers[q.id]?.correct).length;
      recordBankSet(spec.setId, {
        correct,
        total: questions.length,
        at: Date.now(),
        ...(spec.mode === 'timed' ? { seconds: used } : {}),
      });
    }
  };

  useEffect(() => {
    if (spec.mode === 'timed' && !finished && remaining <= 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const q = questions[idx];
  const answered = q ? !!answers[q.id] : false;

  const onAnswered = (correct: boolean, text: string) => {
    if (!q) return;
    recordBankAnswer(q, correct);
    setAnswers((a) => ({ ...a, [q.id]: { correct, text } }));
  };

  const advance = () => {
    if (idx + 1 >= questions.length) finish();
    else setIdx((i) => i + 1);
  };

  if (finished)
    return (
      <Results
        spec={spec}
        questions={questions}
        answers={answers}
        seconds={elapsed}
        lessonTitle={lessonTitle}
        onExit={onExit}
        onStart={onStart}
      />
    );

  const g = q ? generatorOf(q.id) : undefined;
  const mmss = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onExit} className="font-mono text-[11px] text-muted hover:text-ink">
          ← bank (progress so far is saved)
        </button>
        <div className="flex items-center gap-3 font-mono text-[12px]">
          <span className="text-muted">
            {idx + 1}/{questions.length}
          </span>
          {spec.mode === 'timed' && (
            <span
              className={`rounded border px-2 py-0.5 ${remaining < 120 ? 'border-alert text-alert' : 'border-line-strong text-ink'}`}
              aria-label="time remaining"
            >
              ⏱ {mmss(remaining)}
            </span>
          )}
        </div>
      </div>
      <h1 className="font-display text-[1.4rem] font-bold tracking-tight">{spec.title}</h1>
      <div className="mb-4 mt-1 h-[3px] w-full bg-line">
        <div className="h-full bg-active transition-all" style={{ width: `${(100 * idx) / questions.length}%` }} />
      </div>

      {q && (
        <div className="rounded-md border border-line bg-panel p-5">
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-faint">
            <span>{g?.topic}</span>
            <span>d{q.difficulty}</span>
          </div>
          <QuestionCard key={q.id} q={q} onAnswered={onAnswered} hideFeedback={spec.mode === 'timed'} />
          <div className="mt-4 flex items-center justify-between">
            {spec.mode === 'learn' && answered && g ? (
              <Link href={`/lesson/${g.lessonId}`} className="font-mono text-[11px] text-active hover:underline" target="_blank">
                relearn: {lessonTitle[g.lessonId] ?? g.lessonId} ↗
              </Link>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              {!answered && (
                <button onClick={advance} className="rounded px-3 py-1.5 font-mono text-[11.5px] text-muted hover:text-ink">
                  skip
                </button>
              )}
              {answered && (
                <button
                  onClick={advance}
                  className="rounded border-[1.5px] border-ink bg-panel px-4 py-1.5 font-mono text-[12px] hover:bg-active-wash"
                >
                  {idx + 1 < questions.length ? 'next →' : 'finish'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {spec.mode === 'timed' && (
        <div className="mt-4 text-right">
          <button onClick={finish} className="font-mono text-[11px] text-muted underline hover:text-ink">
            end section now
          </button>
        </div>
      )}
    </div>
  );
}

function Results({
  spec,
  questions,
  answers,
  seconds,
  lessonTitle,
  onExit,
  onStart,
}: {
  spec: RunSpec;
  questions: BankQuestion[];
  answers: Record<string, { correct: boolean; text: string }>;
  seconds: number;
  lessonTitle: Record<string, string>;
  onExit: () => void;
  onStart: (r: RunSpec) => void;
}) {
  const correct = questions.filter((q) => answers[q.id]?.correct).length;
  const skipped = questions.filter((q) => !answers[q.id]).length;
  const [open, setOpen] = useState<string | null>(null);

  const byTopic = new Map<string, { topic: string; lessonId: string; right: number; total: number }>();
  for (const q of questions) {
    const g = generatorOf(q.id)!;
    const t = byTopic.get(g.id) ?? { topic: g.topic, lessonId: g.lessonId, right: 0, total: 0 };
    t.total++;
    if (answers[q.id]?.correct) t.right++;
    byTopic.set(g.id, t);
  }
  const missed = questions.filter((q) => !answers[q.id]?.correct);

  // next numbered set in the same track
  let nextSpec: RunSpec | null = null;
  if (spec.setId) {
    const track: Track = spec.setId.startsWith('q-') ? 'quant' : 'verbal';
    const sets = setsFor(track);
    const i = sets.findIndex((s) => s.id === spec.setId);
    const nx = sets[i + 1];
    if (nx)
      nextSpec = {
        title: `${TRACK_LABEL[track]} set ${nx.number}`,
        ids: setQuestionIds(nx.id),
        mode: spec.mode,
        setId: nx.id,
      };
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-8">
      <button onClick={onExit} className="font-mono text-[11px] text-muted hover:text-ink">
        ← bank
      </button>
      <div className="mt-3 rounded-md border-[1.5px] border-ink bg-panel p-6">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{spec.title} · results</div>
        <div className="mt-1 font-display text-[2rem] font-bold">
          {correct}/{questions.length}
          <span className="ml-3 font-mono text-[13px] font-normal text-muted">
            {pct(correct, questions.length)}%
            {spec.mode === 'timed' ? ` · ${Math.floor(seconds / 60)}m ${seconds % 60}s` : ''}
            {skipped ? ` · ${skipped} skipped` : ''}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {nextSpec && (
            <button
              onClick={() => onStart(nextSpec!)}
              className="rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
            >
              next: {nextSpec.title} →
            </button>
          )}
          {missed.length > 0 && (
            <button
              onClick={() => onStart({ title: `${spec.title} · redo misses`, ids: missed.map((q) => q.id), mode: 'learn' })}
              className="rounded border-[1.5px] border-ink bg-panel px-4 py-2 font-mono text-[12px] hover:bg-active-wash"
            >
              redo the {missed.length} missed
            </button>
          )}
        </div>
      </div>

      <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">By topic</h2>
      <div className="divide-y divide-line rounded-md border border-line bg-panel">
        {[...byTopic.values()]
          .sort((a, b) => a.right / a.total - b.right / b.total)
          .map((t) => (
            <div key={t.topic} className="flex items-center gap-3 px-4 py-2 text-[13.5px]">
              <span className={`w-12 font-mono text-[11.5px] ${t.right === t.total ? 'text-done' : 'text-alert'}`}>
                {t.right}/{t.total}
              </span>
              <span className="flex-1">{t.topic}</span>
              {t.right < t.total && (
                <Link href={`/lesson/${t.lessonId}`} className="font-mono text-[10.5px] text-active hover:underline">
                  relearn: {lessonTitle[t.lessonId] ?? t.lessonId}
                </Link>
              )}
            </div>
          ))}
      </div>

      {missed.length > 0 && (
        <>
          <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Review {spec.mode === 'timed' ? 'every miss' : 'your misses'} — now in your review queue
          </h2>
          <div className="space-y-2">
            {missed.map((q, i) => (
              <div key={q.id} className="rounded-md border border-line bg-panel">
                <button
                  onClick={() => setOpen(open === q.id ? null : q.id)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
                  aria-expanded={open === q.id}
                >
                  <span className="font-mono text-[11px] text-alert">{answers[q.id] ? '✗' : '—'}</span>
                  <span className="flex-1 truncate text-[13.5px]">
                    {i + 1}. <Powers text={q.prompt.replace(/\*\*/g, '').split('\n')[0]} />
                  </span>
                  <span className="font-mono text-[11px] text-muted">{open === q.id ? '−' : '+'}</span>
                </button>
                {open === q.id && (
                  <div className="border-t border-line px-4 py-3">
                    <AnswerReview q={q} answer={answers[q.id]?.text} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
