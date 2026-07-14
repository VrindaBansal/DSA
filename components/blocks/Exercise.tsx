'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BlockShell } from './BlockShell';
import { McqCard } from '@/components/quiz/McqCard';
import { QUESTION_BY_ID } from '@/content/questions';
import { useProgress, useLessonProgress } from '@/lib/progress/provider';
import { runTests, type RunOutcome } from '@/lib/pyodide';
import type { CodeQuestion } from '@/lib/types';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center bg-code-bg font-mono text-[11px] text-faint">
      loading editor…
    </div>
  ),
});

/**
 * A structural coding exercise (spec §9): CodeMirror + Pyodide test runner,
 * progressive hints, solution gated behind 2 failed runs or an explicit
 * confirm, complexity self-check after the tests pass.
 */
export function ExerciseBlock({
  lessonId,
  blockId,
  id,
}: {
  lessonId: string;
  blockId: string;
  id: string;
}) {
  const q = QUESTION_BY_ID[id];
  if (!q || q.kind !== 'code') {
    return (
      <div className="my-6 rounded border border-alert bg-alert-wash p-3 font-mono text-[12px] text-alert">
        Unknown code exercise: {id}
      </div>
    );
  }
  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="not-prose my-8">
      <ExerciseCard lessonId={lessonId} q={q} />
    </BlockShell>
  );
}

export function ExerciseCard({
  lessonId,
  q,
}: {
  lessonId: string;
  q: CodeQuestion;
}) {
  const { recordCodeRun, useHint, revealSolution, recordComplexityCheck } =
    useProgress();
  const lp = useLessonProgress(lessonId);
  const cp = lp.code[q.id];

  const storageKey = `invariant.code.${q.id}`;
  const [code, setCode] = useState(q.starterCode);
  const [pyExtensions, setPyExtensions] = useState<unknown[]>([]);
  const [booting, setBooting] = useState(false);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [hintsShown, setHintsShown] = useState(cp?.hintsUsed ?? 0);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setCode(saved);
    } catch {}
    import('@codemirror/lang-python').then((m) =>
      setPyExtensions([m.python()]),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCodeChange = (v: string) => {
    setCode(v);
    try {
      window.localStorage.setItem(storageKey, v);
    } catch {}
  };

  const run = async () => {
    if (running) return;
    setRunning(true);
    setRunError(null);
    setBooting(true);
    try {
      const res = await runTests(code, q.tests);
      setBooting(false);
      setOutcome(res);
      recordCodeRun(lessonId, q, res.allPassed);
    } catch (e) {
      setBooting(false);
      setRunError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
    }
  };

  const failedRuns = cp?.failedRuns ?? 0;
  const canFreelyReveal = failedRuns >= 2;

  const reveal = () => {
    if (
      !canFreelyReveal &&
      !window.confirm(
        'Show the solution before two failed runs? The struggle is the learning.',
      )
    )
      return;
    setShowSolution(true);
    revealSolution(lessonId, q.id);
  };

  const showHint = () => {
    if (hintsShown < q.hints.length) {
      setHintsShown((h) => h + 1);
      useHint(lessonId, q.id);
    }
  };

  const passed = outcome?.allPassed ?? false;

  return (
    <div className="overflow-hidden rounded-md border-[1.5px] border-ink bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
          ⌨ Code exercise
        </span>
        <span className="font-mono text-[10px] text-faint">
          d{q.difficulty}
          {cp?.passed && <span className="text-done"> · solved ✓</span>}
          {cp && !cp.passed && cp.attempts > 0 && (
            <span> · {cp.attempts} run{cp.attempts === 1 ? '' : 's'}</span>
          )}
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="text-[15px] leading-relaxed">{q.prompt}</p>
      </div>

      <div className="border-y border-line [&_.cm-editor]:!bg-code-bg/60 [&_.cm-editor]:font-mono [&_.cm-editor]:text-[13px] [&_.cm-editor.cm-focused]:outline-none [&_.cm-gutters]:!border-r [&_.cm-gutters]:!border-line [&_.cm-gutters]:!bg-paper">
        <CodeMirror
          value={code}
          onChange={onCodeChange}
          extensions={pyExtensions as never[]}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
            autocompletion: false,
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5">
        <button
          onClick={run}
          disabled={running}
          className="rounded border border-active bg-active px-4 py-1.5 font-mono text-[11.5px] font-semibold text-white transition-colors hover:bg-active-deep disabled:opacity-50"
        >
          {booting ? 'booting Python…' : running ? 'running…' : '▶ run tests'}
        </button>
        <button
          onClick={showHint}
          disabled={hintsShown >= q.hints.length}
          className="rounded border border-line-strong bg-panel px-3 py-1.5 font-mono text-[11px] text-ink hover:border-ink disabled:opacity-35"
        >
          hint {Math.min(hintsShown + 1, q.hints.length)}/{q.hints.length}
        </button>
        <button
          onClick={reveal}
          className="rounded border border-line-strong bg-panel px-3 py-1.5 font-mono text-[11px] text-muted hover:border-ink hover:text-ink"
        >
          {canFreelyReveal ? 'show solution' : 'give up → solution'}
        </button>
        <button
          onClick={() => onCodeChange(q.starterCode)}
          className="ml-auto font-mono text-[10.5px] text-faint hover:text-ink"
        >
          reset to starter
        </button>
      </div>

      {hintsShown > 0 && (
        <div className="space-y-1.5 border-t border-dashed border-line px-4 py-3">
          {q.hints.slice(0, hintsShown).map((h, i) => (
            <div key={i} className="flex gap-2 text-[13px] leading-snug">
              <span className="font-mono text-[10px] text-active-deep">
                H{i + 1}
              </span>
              <span>{h}</span>
            </div>
          ))}
          {hintsShown >= 2 && !passed && (
            <p className="pt-1 font-mono text-[10px] text-faint">
              ≥2 hints — this one&apos;s complexity question will enter your review
              queue when you solve it.
            </p>
          )}
        </div>
      )}

      {runError && (
        <div className="border-t border-line px-4 py-3 font-mono text-[12px] text-alert">
          {runError}
        </div>
      )}

      {outcome && (
        <div className="border-t border-line px-4 py-3">
          {outcome.error ? (
            <pre className="overflow-x-auto rounded border border-alert bg-alert-wash/60 p-3 font-mono text-[11.5px] leading-relaxed text-alert">
              {outcome.error}
            </pre>
          ) : (
            <ul className="space-y-1">
              {outcome.results.map((r) => (
                <li key={r.name} className="font-mono text-[12px]">
                  <span className={r.passed ? 'text-done' : 'text-alert'}>
                    {r.passed ? '✓' : '✗'} {r.name}
                  </span>
                  {r.message && (
                    <div className="mt-0.5 whitespace-pre-wrap pl-5 text-[11.5px] text-alert/90">
                      {r.message}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showSolution && (
        <div className="border-t border-line px-4 py-3">
          <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Solution
          </div>
          <pre className="overflow-x-auto rounded border border-line bg-code-bg p-3 font-mono text-[12px] leading-relaxed">
            {q.solution}
          </pre>
        </div>
      )}

      {passed && q.complexityCheck && (
        <div className="border-t-[1.5px] border-ink bg-paper px-4 py-4">
          <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
            Complexity self-check — passing tests without knowing the cost is a
            fake win
          </div>
          <McqCard
            q={{ ...q.complexityCheck, id: q.id }}
            priorAnswer={
              cp?.complexityCorrect != null
                ? q.complexityCheck.options[
                    cp.complexityCorrect
                      ? q.complexityCheck.correctIndex
                      : -1
                  ]
                : undefined
            }
            onAnswered={(correct, answer) =>
              recordComplexityCheck(lessonId, q, correct, answer)
            }
          />
        </div>
      )}
    </div>
  );
}
