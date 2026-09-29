'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PracticeTestResult, TestResponse } from '@/lib/types';
import { useProgress } from '@/lib/progress/provider';
import type { Level, Measure, PracticeTest, TestSection } from '@/content/courses/gre/tests/types';
import { isAnswered, isComplete, isCorrect } from '@/content/courses/gre/tests/grade';
import { routeLevel } from '@/content/courses/gre/tests/scoring';
import { MEASURE_LABEL, scoreAttempt, sectionForSlot } from '@/content/courses/gre/tests/runtime';
import { ExamQuestion } from './ExamQuestion';
import { Calculator } from './Calculator';
import { TestResults } from './TestResults';

// A full-length practice test, run like the real one: the Issue essay first,
// then four timed sections; inside a section you can move back and forth,
// mark questions, and use the review screen; nothing is graded until the
// end; the first section of each measure decides which second section you
// get. The attempt is saved in this browser as you go, so a refresh or a
// closed tab resumes where you left off (the clock pauses while closed).

const ESSAY_SECONDS = 30 * 60;
const storeKey = (id: string) => `invariant.gre.test.${id}`;

interface Attempt {
  v: 1;
  testId: string;
  startedAt: number;
  phase: 'essay' | 'intro' | 'section';
  /** Index into test.order. */
  slot: number;
  levels: Partial<Record<Measure, Level>>;
  responses: Record<string, TestResponse>;
  marked: string[];
  current: number;
  /** Seconds left per section key ('awa' for the essay). */
  remaining: Record<string, number>;
  /** Seconds used per finished section key. */
  seconds: Record<string, number>;
  /** Untimed tests: seconds spent so far per section key (the clock counts up). */
  elapsed?: Record<string, number>;
  essay: string;
}

function loadAttempt(id: string): Attempt | null {
  try {
    const raw = window.localStorage.getItem(storeKey(id));
    if (!raw) return null;
    const a = JSON.parse(raw) as Attempt;
    return a?.v === 1 && a.testId === id ? a : null;
  } catch {
    return null;
  }
}
function saveAttempt(a: Attempt | null, id: string) {
  try {
    if (a) window.localStorage.setItem(storeKey(id), JSON.stringify(a));
    else window.localStorage.removeItem(storeKey(id));
  } catch {
    /* storage unavailable — the attempt just won't survive a reload */
  }
}

const mmss = (s: number) => {
  const t = Math.max(0, Math.round(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

// -----------------------------------------------------------------------------

export function TestClient({
  test,
  lessons,
}: {
  test: PracticeTest;
  lessons: { id: string; title: string }[];
}) {
  const { state, ready, recordPracticeTest } = useProgress();
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<'home' | 'run' | { result: number }>('home');
  const history = state.tests?.[test.id] ?? [];
  const lessonTitle = useMemo(() => Object.fromEntries(lessons.map((l) => [l.id, l.title])), [lessons]);

  useEffect(() => {
    setAttempt(loadAttempt(test.id));
    setLoaded(true);
  }, [test.id]);

  const start = () => {
    const a: Attempt = {
      v: 1,
      testId: test.id,
      startedAt: Date.now(),
      phase: test.essay ? 'essay' : 'intro',
      slot: 0,
      levels: {},
      responses: {},
      marked: [],
      current: 0,
      remaining: test.essay ? { awa: ESSAY_SECONDS } : {},
      seconds: {},
      essay: '',
    };
    saveAttempt(a, test.id);
    setAttempt(a);
    setView('run');
  };

  const onFinish = (result: PracticeTestResult) => {
    recordPracticeTest(result);
    saveAttempt(null, test.id);
    setAttempt(null);
    setView({ result: -1 });
  };

  if (view === 'run' && attempt)
    return (
      <Runner
        test={test}
        attempt={attempt}
        setAttempt={setAttempt}
        onQuit={() => setView('home')}
        onFinish={onFinish}
      />
    );

  if (typeof view === 'object') {
    const result = view.result === -1 ? history[history.length - 1] : history[view.result];
    if (result)
      return (
        <TestResults
          test={test}
          result={result}
          lessonTitle={lessonTitle}
          onBack={() => setView('home')}
        />
      );
  }

  return (
    <TestHome
      test={test}
      attempt={loaded ? attempt : null}
      history={ready ? history : []}
      onStart={start}
      onResume={() => setView('run')}
      onDiscard={() => {
        if (!window.confirm('Discard this attempt? Your answers so far will be lost.')) return;
        saveAttempt(null, test.id);
        setAttempt(null);
      }}
      onOpenResult={(i) => setView({ result: i })}
    />
  );
}

// -----------------------------------------------------------------------------
// Home: structure, start/resume, past attempts

function TestHome({
  test,
  attempt,
  history,
  onStart,
  onResume,
  onDiscard,
  onOpenResult,
}: {
  test: PracticeTest;
  attempt: Attempt | null;
  history: PracticeTestResult[];
  onStart: () => void;
  onResume: () => void;
  onDiscard: () => void;
  onOpenResult: (i: number) => void;
}) {
  const timed = test.timed !== false;
  const offset = test.essay ? 2 : 1;
  const total = test.order.length + offset - 1;
  const rows: [string, string, string][] = [
    ...(test.essay ? [['1', 'Analytical Writing — Analyze an Issue', timed ? '1 essay · 30 min' : '1 essay'] as [string, string, string]] : []),
    ...test.order.map((slot, i): [string, string, string] => {
      const m: Measure = slot[0] === 'v' ? 'verbal' : 'quant';
      const n = slot.endsWith('1') ? 12 : 15;
      const min = m === 'verbal' ? (n === 12 ? 18 : 23) : n === 12 ? 21 : 26;
      return [
        String(i + offset),
        `${MEASURE_LABEL[m]} — ${slot.endsWith('1') ? 'first section' : 'second section (adapts to your first)'}`,
        timed ? `${n} questions · ${min} min` : `${n} questions · untimed`,
      ];
    }),
  ];
  const where = attempt
    ? attempt.phase === 'essay'
      ? `Writing section, ${mmss(attempt.remaining.awa ?? ESSAY_SECONDS)} left`
      : `section ${Math.min(attempt.slot, test.order.length - 1) + offset} of ${total}`
    : '';

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10">
      <div className="mb-1 font-mono text-[11px]">
        <Link href="/course/gre/tests" className="text-muted hover:text-ink">
          ← all practice tests
        </Link>
      </div>
      <h1 className="font-display text-[2rem] font-bold tracking-tight">{test.title}</h1>
      <p className="mt-1 max-w-[62ch] text-[14px] text-ink-soft">
        {timed ? (
          <>
            A full-length GRE: about 1 hour 58 minutes, no scheduled break. Take it in one sitting, somewhere quiet,
            with scratch paper.
          </>
        ) : (
          <>
            An untimed practice test: the full Verbal and Quant sections of a GRE — same question types, same order,
            same adaptive second sections — with no clock and no essay. Work carefully, and stop and come back whenever
            you like.
          </>
        )}{' '}
        Answers aren’t checked until the end; then you get estimated scores, a breakdown by topic, and an explanation
        for every question.
      </p>

      <div className="mt-6 overflow-hidden rounded-md border border-line bg-panel">
        {rows.map(([n, label, meta]) => (
          <div key={n} className="flex items-center gap-4 border-b border-line px-4 py-2.5 text-[14px] last:border-b-0">
            <span className="w-5 font-mono text-[11px] text-muted">{n}</span>
            <span className="flex-1">{label}</span>
            <span className="font-mono text-[11.5px] text-muted">{meta}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border-[1.5px] border-ink bg-panel p-5">
        {attempt ? (
          <>
            <div className="font-display text-[1.15rem] font-bold">Attempt in progress</div>
            <p className="mt-1 font-mono text-[11.5px] text-muted">
              Stopped at: {where}. {timed ? 'The clock resumes when you do.' : 'Pick up where you left off.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={onResume}
                className="rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
              >
                resume test →
              </button>
              <button onClick={onDiscard} className="rounded px-3 py-2 font-mono text-[11.5px] text-muted hover:text-alert">
                discard attempt
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="font-display text-[1.15rem] font-bold">
              {history.length ? 'Retake this test' : 'Ready when you are'}
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[13.5px] text-ink-soft">
              {timed ? (
                <li>The clock starts as soon as each section starts. When time runs out, the section ends.</li>
              ) : (
                <li>
                  No time limit and no essay. The top bar shows how long you’ve spent, so you can see your pace —
                  a section ends only when you end it.
                </li>
              )}
              <li>
                Within a section you can go back, change answers, <strong>mark</strong> questions, and open the{' '}
                <strong>review</strong> screen. Once a section ends you can’t return to it.
              </li>
              <li>Quant sections have an on-screen calculator. There’s no penalty for guessing — answer everything.</li>
              {history.length > 0 && (
                <li>You’ve seen these questions before, so a retake score will run high. Use it to check that fixes stuck.</li>
              )}
            </ul>
            <button
              onClick={onStart}
              className="mt-4 rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
            >
              start test →
            </button>
          </>
        )}
      </div>

      {history.length > 0 && (
        <>
          <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            Your attempts
          </h2>
          <div className="divide-y divide-line rounded-md border border-line bg-panel">
            {history.map((r, i) => (
              <button
                key={r.at}
                onClick={() => onOpenResult(i)}
                className="flex w-full items-center gap-4 px-4 py-2.5 text-left text-[14px] hover:bg-paper"
              >
                <span className="font-mono text-[11px] text-muted">{new Date(r.at).toLocaleDateString()}</span>
                <span className="flex-1">
                  Verbal <strong>{r.verbal.scaled}</strong> · Quant <strong>{r.quant.scaled}</strong>
                </span>
                <span className="font-mono text-[11px] text-active">view results →</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Runner

function Runner({
  test,
  attempt,
  setAttempt,
  onQuit,
  onFinish,
}: {
  test: PracticeTest;
  attempt: Attempt;
  setAttempt: React.Dispatch<React.SetStateAction<Attempt | null>>;
  onQuit: () => void;
  onFinish: (r: PracticeTestResult) => void;
}) {
  const slot = test.order[attempt.slot];
  const section = slot ? sectionForSlot(test, slot, attempt.levels) : undefined;
  const timed = test.timed !== false;
  const activeKey = attempt.phase === 'essay' ? 'awa' : attempt.phase === 'section' && section ? section.key : null;
  const total = attempt.phase === 'essay' ? ESSAY_SECONDS : (section?.minutes ?? 0) * 60;
  const remaining = activeKey ? (attempt.remaining[activeKey] ?? total) : 0;
  const elapsed = activeKey ? (attempt.elapsed?.[activeKey] ?? 0) : 0;
  const clock: Clock = timed ? { mode: 'remaining', seconds: remaining } : { mode: 'elapsed', seconds: elapsed };
  const sectionNo = attempt.phase === 'essay' ? 1 : attempt.slot + (test.essay ? 2 : 1);
  const sectionCount = test.order.length + (test.essay ? 1 : 0);

  const update = useCallback(
    (fn: (a: Attempt) => Attempt) =>
      setAttempt((a) => {
        if (!a) return a;
        const next = fn(a);
        saveAttempt(next, test.id);
        return next;
      }),
    [setAttempt, test.id],
  );

  // Clock: timed tests count down from what was left when this section
  // (re)started; untimed tests count up from the time already spent.
  useEffect(() => {
    if (!activeKey) return;
    if (!timed) {
      const origin = Date.now() - (attempt.elapsed?.[activeKey] ?? 0) * 1000;
      const t = setInterval(() => {
        const spent = Math.floor((Date.now() - origin) / 1000);
        update((a) => ({ ...a, elapsed: { ...(a.elapsed ?? {}), [activeKey]: spent } }));
      }, 1000);
      return () => clearInterval(t);
    }
    const startLeft = attempt.remaining[activeKey] ?? total;
    const deadline = Date.now() + startLeft * 1000;
    const t = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      update((a) => ({ ...a, remaining: { ...a.remaining, [activeKey]: left } }));
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  const endCurrent = useCallback(() => {
    update((a) => {
      if (a.phase === 'essay') {
        const left = a.remaining.awa ?? ESSAY_SECONDS;
        return { ...a, phase: 'intro', slot: 0, current: 0, seconds: { ...a.seconds, awa: ESSAY_SECONDS - left } };
      }
      const sl = test.order[a.slot];
      const sec = sectionForSlot(test, sl, a.levels)!;
      const left = a.remaining[sec.key] ?? sec.minutes * 60;
      const used = timed ? sec.minutes * 60 - left : (a.elapsed?.[sec.key] ?? 0);
      const seconds = { ...a.seconds, [sec.key]: used };
      const levels = { ...a.levels };
      if (sec.stage === 1) {
        const right = sec.questions.filter((q) => isCorrect(q, a.responses[q.id])).length;
        levels[sec.measure] = routeLevel(right);
      }
      return { ...a, phase: 'intro', slot: a.slot + 1, current: 0, seconds, levels, remaining: { ...a.remaining, [sec.key]: left } };
    });
  }, [test, timed, update]);

  // Time up → the section ends, exactly as on test day. (Never on untimed tests.)
  useEffect(() => {
    if (timed && activeKey && remaining <= 0) endCurrent();
  }, [timed, activeKey, remaining, endCurrent]);

  // All four scored sections done → score it.
  const finished = attempt.phase === 'intro' && attempt.slot >= test.order.length;
  const finishedRef = useRef(false);
  useEffect(() => {
    if (!finished || finishedRef.current) return;
    finishedRef.current = true;
    const levels = { verbal: attempt.levels.verbal ?? 'easier', quant: attempt.levels.quant ?? 'easier' } as Record<
      Measure,
      Level
    >;
    const taken = test.order.map((s) => sectionForSlot(test, s, levels)!);
    const responses: Record<string, TestResponse> = {};
    for (const s of taken) for (const q of s.questions) if (attempt.responses[q.id] !== undefined) responses[q.id] = attempt.responses[q.id];
    onFinish(scoreAttempt(test, levels, responses, attempt.seconds, attempt.essay));
  }, [finished, attempt, test, onFinish]);

  if (finished)
    return <div className="px-5 py-20 text-center font-mono text-[12px] text-muted">scoring your test…</div>;

  if (attempt.phase === 'essay')
    return (
      <EssayScreen
        test={test}
        essay={attempt.essay}
        clock={clock}
        sectionCount={sectionCount}
        onChange={(essay) => update((a) => ({ ...a, essay }))}
        onEnd={endCurrent}
        onQuit={onQuit}
      />
    );

  if (!section) return null;

  if (attempt.phase === 'intro')
    return (
      <SectionIntro
        test={test}
        section={section}
        sectionNo={sectionNo}
        sectionCount={sectionCount}
        onBegin={() => update((a) => ({ ...a, phase: 'section', current: 0 }))}
        onQuit={onQuit}
      />
    );

  return (
    <SectionScreen
      test={test}
      section={section}
      sectionNo={sectionNo}
      sectionCount={sectionCount}
      attempt={attempt}
      clock={clock}
      update={update}
      onEnd={endCurrent}
      onQuit={onQuit}
    />
  );
}

// -----------------------------------------------------------------------------
// Chrome shared by every timed screen

/** Countdown on timed tests; time spent so far on untimed ones. */
type Clock = { mode: 'remaining' | 'elapsed'; seconds: number };

function TopBar({
  test,
  sectionNo,
  sectionCount,
  label,
  clock,
  children,
}: {
  test: PracticeTest;
  sectionNo: number;
  sectionCount: number;
  label: string;
  clock: Clock;
  children: React.ReactNode;
}) {
  const [hideTime, setHideTime] = useState(false);
  return (
    <div className="sticky top-12 z-30 border-b-[1.5px] border-ink bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <div className="font-mono text-[11.5px]">
          <span className="font-semibold">{test.title}</span>
          <span className="mx-2 opacity-50">|</span>
          Section {sectionNo} of {sectionCount} · {label}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">{children}</div>
      </div>
      <div className="border-t border-white/15 bg-[#2a2f37]">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-4 py-1 font-mono text-[11.5px]">
          {!hideTime &&
            (clock.mode === 'remaining' ? (
              <span className={clock.seconds <= 300 ? 'text-[#ffb4a8]' : ''} aria-label="time remaining" data-testid="test-timer">
                {mmss(clock.seconds)}
              </span>
            ) : (
              <span aria-label="time elapsed" data-testid="test-timer">
                untimed · {mmss(clock.seconds)} spent
              </span>
            ))}
          <button onClick={() => setHideTime((h) => !h)} className="underline opacity-75 hover:opacity-100">
            {hideTime ? 'show time' : 'hide time'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BarButton({
  children,
  onClick,
  active,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`rounded border px-2.5 py-1 font-mono text-[11.5px] transition-colors disabled:opacity-35 ${
        active ? 'border-white bg-white text-ink' : 'border-white/40 hover:border-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Essay

function EssayScreen({
  test,
  essay,
  clock,
  sectionCount,
  onChange,
  onEnd,
  onQuit,
}: {
  test: PracticeTest;
  essay: string;
  clock: Clock;
  sectionCount: number;
  onChange: (s: string) => void;
  onEnd: () => void;
  onQuit: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  if (!test.essay) return null;
  const remaining = clock.seconds;
  const words = essay.trim() ? essay.trim().split(/\s+/).length : 0;
  return (
    <div className="min-h-screen bg-paper">
      <TopBar test={test} sectionNo={1} sectionCount={sectionCount} label="Analytical Writing" clock={clock}>
        <BarButton onClick={onQuit}>save &amp; exit</BarButton>
        <BarButton onClick={() => setConfirm(true)}>next →</BarButton>
      </TopBar>
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-6">
        <div className="rounded-md border border-line bg-panel px-5 py-4">
          <div className="mb-2 font-mono text-[10.5px] uppercase tracking-wider text-muted">Analyze an Issue · 30 minutes</div>
          <p className="font-body text-[16px] font-semibold leading-relaxed">{test.essay.claim}</p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink-soft">{test.essay.task}</p>
        </div>
        {confirm && (
          <div className="mt-4 rounded-md border-[1.5px] border-alert bg-alert-wash px-4 py-3 text-[13.5px]">
            End the Writing section with {mmss(remaining)} left? You can’t come back to your essay.
            <div className="mt-2 flex gap-2">
              <button onClick={() => setConfirm(false)} className="rounded border border-line-strong bg-panel px-3 py-1 font-mono text-[11.5px]">
                keep writing
              </button>
              <button onClick={onEnd} className="rounded border border-ink bg-ink px-3 py-1 font-mono text-[11.5px] text-white">
                end section
              </button>
            </div>
          </div>
        )}
        <textarea
          value={essay}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Your essay"
          placeholder="Type your response here. Like the real test, there is no spell-check."
          className="mt-4 h-[52vh] w-full resize-y rounded-md border-[1.5px] border-ink bg-panel px-4 py-3 font-body text-[15.5px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-active"
        />
        <div className="mt-1.5 flex justify-between font-mono text-[11px] text-muted">
          <span>{words} words</span>
          <span>Strong essays usually run 450–650 words: a clear position, 2–3 developed reasons with examples, a counterpoint.</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Section intro

function SectionIntro({
  test,
  section,
  sectionNo,
  sectionCount,
  onBegin,
  onQuit,
}: {
  test: PracticeTest;
  section: TestSection;
  sectionNo: number;
  sectionCount: number;
  onBegin: () => void;
  onQuit: () => void;
}) {
  const quant = section.measure === 'quant';
  const timed = test.timed !== false;
  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b-[1.5px] border-ink bg-ink px-4 py-2 font-mono text-[11.5px] text-white">
        <div className="mx-auto flex max-w-6xl justify-between">
          <span>
            <span className="font-semibold">{test.title}</span>
            <span className="mx-2 opacity-50">|</span>Section {sectionNo} of {sectionCount}
          </span>
          <button onClick={onQuit} className="underline opacity-80 hover:opacity-100">
            save &amp; exit
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-5 pt-14">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
          Section {sectionNo} of {sectionCount}
        </div>
        <h1 className="mt-1 font-display text-[1.9rem] font-bold tracking-tight">{MEASURE_LABEL[section.measure]}</h1>
        <p className="mt-1 font-mono text-[12.5px] text-ink-soft">
          {section.questions.length} questions · {timed ? `${section.minutes} minutes` : `untimed (the real test allows ${section.minutes} minutes)`}
        </p>
        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-[14px] text-ink-soft">
          {timed ? (
            <li>The clock starts when you click Begin and the section ends when it reaches zero.</li>
          ) : (
            <li>No time limit — the top bar shows how long you’ve spent. End the section when you’re done.</li>
          )}
          <li>Use Back and Next to move around, Mark to flag a question, and Review to see every question’s status.</li>
          {quant ? (
            <>
              <li>An on-screen calculator is available from the top bar.</li>
              <li>
                Numbers are real numbers; figures lie in a plane and are not necessarily drawn to scale unless a note
                says so — don’t measure, reason.
              </li>
            </>
          ) : (
            <li>Reading questions stay beside their passage. Blanks need every entry right to earn credit.</li>
          )}
          <li>
            No penalty for wrong answers: before {timed ? 'time runs out' : 'you end the section'}, make sure every
            question has an answer.
          </li>
        </ul>
        <button
          onClick={onBegin}
          className="mt-7 rounded border-[1.5px] border-active bg-active px-5 py-2.5 font-mono text-[12.5px] text-white hover:bg-active-deep"
        >
          begin section →
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// A timed section

function groupLabel(section: TestSection, idx: number): string | undefined {
  const q = section.questions[idx];
  if (!q.group) return undefined;
  const nums = section.questions.map((x, i) => (x.group === q.group ? i + 1 : 0)).filter(Boolean);
  const what = q.stimulus?.passage ? 'passage' : 'data';
  return nums.length === 1
    ? `Question ${nums[0]} is based on the following ${what}.`
    : `Questions ${nums[0]} to ${nums[nums.length - 1]} are based on the following ${what}.`;
}

function SectionScreen({
  test,
  section,
  sectionNo,
  sectionCount,
  attempt,
  clock,
  update,
  onEnd,
  onQuit,
}: {
  test: PracticeTest;
  section: TestSection;
  sectionNo: number;
  sectionCount: number;
  attempt: Attempt;
  clock: Clock;
  update: (fn: (a: Attempt) => Attempt) => void;
  onEnd: () => void;
  onQuit: () => void;
}) {
  const [reviewing, setReviewing] = useState<null | 'review' | 'end'>(null);
  const [confirm, setConfirm] = useState(false);
  const [calc, setCalc] = useState(false);
  const n = section.questions.length;
  const idx = Math.min(attempt.current, n - 1);
  const q = section.questions[idx];
  const marked = attempt.marked.includes(q.id);
  const unanswered = section.questions.filter((x) => !isComplete(x, attempt.responses[x.id])).length;

  const go = (i: number) => {
    setReviewing(null);
    update((a) => ({ ...a, current: Math.max(0, Math.min(n - 1, i)) }));
    window.scrollTo({ top: 0 });
  };
  const next = () => (idx + 1 >= n ? setReviewing('end') : go(idx + 1));
  const setResponse = (r: TestResponse | undefined) =>
    update((a) => {
      const responses = { ...a.responses };
      if (r === undefined) delete responses[q.id];
      else responses[q.id] = r;
      return { ...a, responses };
    });
  const toggleMark = () =>
    update((a) => ({
      ...a,
      marked: a.marked.includes(q.id) ? a.marked.filter((x) => x !== q.id) : [...a.marked, q.id],
    }));

  return (
    <div className="min-h-screen bg-paper">
      <TopBar test={test} sectionNo={sectionNo} sectionCount={sectionCount} label={MEASURE_LABEL[section.measure]} clock={clock}>
        <BarButton onClick={onQuit}>save &amp; exit</BarButton>
        <BarButton onClick={() => setConfirm(true)}>end section</BarButton>
        <BarButton onClick={toggleMark} active={marked} label="mark">
          {marked ? '✓ marked' : 'mark'}
        </BarButton>
        <BarButton onClick={() => setReviewing(reviewing ? null : 'review')} active={!!reviewing}>
          review
        </BarButton>
        {section.measure === 'quant' && (
          <BarButton onClick={() => setCalc((c) => !c)} active={calc}>
            calculator
          </BarButton>
        )}
        <BarButton onClick={() => go(idx - 1)} disabled={idx === 0 || !!reviewing}>
          ← back
        </BarButton>
        <BarButton onClick={next} disabled={!!reviewing}>
          next →
        </BarButton>
      </TopBar>

      {calc && (
        <Calculator
          onClose={() => setCalc(false)}
          onTransfer={
            q.kind === 'numeric' && !q.fraction && !reviewing
              ? (v) => setResponse(v === 'Error' ? undefined : v.replace(/[^0-9.\-]/g, ''))
              : undefined
          }
        />
      )}

      {confirm && (
        <div className="mx-auto mt-4 max-w-3xl px-5">
          <div className="rounded-md border-[1.5px] border-alert bg-alert-wash px-4 py-3 text-[13.5px]">
            End this section{clock.mode === 'remaining' ? ` with ${mmss(clock.seconds)} left` : ''}
            {unanswered ? ` and ${unanswered} question${unanswered === 1 ? '' : 's'} unanswered or incomplete` : ''}? You
            can’t return to it.
            <div className="mt-2 flex gap-2">
              <button onClick={() => setConfirm(false)} className="rounded border border-line-strong bg-panel px-3 py-1 font-mono text-[11.5px]">
                return to section
              </button>
              <button
                onClick={() => {
                  setConfirm(false);
                  onEnd();
                }}
                className="rounded border border-ink bg-ink px-3 py-1 font-mono text-[11.5px] text-white"
              >
                end section
              </button>
            </div>
          </div>
        </div>
      )}

      {reviewing ? (
        <ReviewScreen
          section={section}
          attempt={attempt}
          atEnd={reviewing === 'end'}
          clock={clock}
          onGo={go}
          onReturn={() => setReviewing(null)}
          onEnd={onEnd}
        />
      ) : (
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-4">
          <div className="mb-4 flex items-center justify-between font-mono text-[11.5px] text-muted">
            <span data-testid="question-counter">
              Question {idx + 1} of {n}
            </span>
            {marked && <span className="text-active-deep">✓ marked for review</span>}
          </div>
          <ExamQuestion
            key={q.id}
            q={q}
            response={attempt.responses[q.id]}
            onChange={setResponse}
            groupLabel={groupLabel(section, idx)}
          />
        </div>
      )}
    </div>
  );
}

function ReviewScreen({
  section,
  attempt,
  atEnd,
  clock,
  onGo,
  onReturn,
  onEnd,
}: {
  section: TestSection;
  attempt: Attempt;
  atEnd: boolean;
  clock: Clock;
  onGo: (i: number) => void;
  onReturn: () => void;
  onEnd: () => void;
}) {
  const status = (i: number) => {
    const q = section.questions[i];
    const r = attempt.responses[q.id];
    return isComplete(q, r) ? 'Answered' : isAnswered(q, r) ? 'Incomplete' : 'Not answered';
  };
  const open = section.questions.filter((_, i) => status(i) !== 'Answered').length;
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-6">
      {atEnd && (
        <div className="mb-4 rounded-md border-[1.5px] border-ink bg-panel px-4 py-3 text-[14px]">
          You’ve reached the end of this section
          {clock.mode === 'remaining' ? (
            <>
              {' '}
              with <strong>{mmss(clock.seconds)}</strong> left
            </>
          ) : null}
          {open ? (
            <>
              {' '}
              and <strong>{open}</strong> question{open === 1 ? '' : 's'} not fully answered
            </>
          ) : null}
          . Go back to any question below, or end the section.
        </div>
      )}
      <h2 className="mb-2 font-display text-[1.3rem] font-bold">Review</h2>
      <div className="overflow-hidden rounded-md border border-line bg-panel">
        <div className="grid grid-cols-[70px_1fr_90px] border-b-[1.5px] border-ink bg-paper px-4 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
          <span>Question</span>
          <span>Status</span>
          <span>Marked</span>
        </div>
        {section.questions.map((q, i) => {
          const st = status(i);
          return (
            <button
              key={q.id}
              onClick={() => onGo(i)}
              className={`grid w-full grid-cols-[70px_1fr_90px] border-b border-line px-4 py-1.5 text-left text-[13.5px] last:border-b-0 hover:bg-active-wash ${
                i === attempt.current ? 'bg-paper' : ''
              }`}
            >
              <span className="font-mono">{i + 1}</span>
              <span className={st === 'Answered' ? '' : st === 'Incomplete' ? 'text-active-deep' : 'text-alert'}>{st}</span>
              <span className="font-mono text-active-deep">{attempt.marked.includes(q.id) ? '✓' : ''}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onReturn} className="rounded border-[1.5px] border-ink bg-panel px-4 py-2 font-mono text-[12px] hover:bg-active-wash">
          return to question {attempt.current + 1}
        </button>
        {atEnd && (
          <button
            onClick={onEnd}
            className="rounded border-[1.5px] border-active bg-active px-4 py-2 font-mono text-[12px] text-white hover:bg-active-deep"
          >
            end section & continue →
          </button>
        )}
      </div>
    </div>
  );
}
