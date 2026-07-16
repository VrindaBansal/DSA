'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { runScript, isPyodideLoaded, type ScriptOutcome } from '@/lib/pyodide';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[200px] items-center justify-center bg-code-bg font-mono text-[11px] text-faint">
      loading editor…
    </div>
  ),
});

/**
 * The reusable in-browser Python editor: CodeMirror + a Run button that shows
 * real stdout/stderr/exceptions, persisted to localStorage under `storageKey`.
 * Used both by the full-page /playground and embedded in each lesson's problem
 * set. `injectCode` (bump its nonce) overwrites the editor from the outside —
 * that's how the playground's snippet loader / reset works.
 */
export function CodeScratchpad({
  storageKey,
  initialCode = '',
  minHeight = 220,
  injectCode,
}: {
  storageKey: string;
  initialCode?: string;
  minHeight?: number;
  injectCode?: { code: string; nonce: number };
}) {
  const [code, setCode] = useState(initialCode);
  const [pyExtensions, setPyExtensions] = useState<unknown[]>([]);
  const [running, setRunning] = useState(false);
  const [booting, setBooting] = useState(false);
  const [outcome, setOutcome] = useState<ScriptOutcome | null>(null);
  const firstInject = useRef(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved !== null) setCode(saved);
    } catch {}
    import('@codemirror/lang-python').then((m) => setPyExtensions([m.python()]));
  }, [storageKey]);

  // External code injection (snippet loader, reset button). Bump the nonce to
  // push new code in. Skip the initial mount so a saved draft in localStorage
  // isn't clobbered by the seed value.
  useEffect(() => {
    if (firstInject.current) {
      firstInject.current = false;
      return;
    }
    if (injectCode) change(injectCode.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [injectCode?.nonce]);

  const change = (v: string) => {
    setCode(v);
    try {
      window.localStorage.setItem(storageKey, v);
    } catch {}
  };

  const run = async () => {
    if (running) return;
    setRunning(true);
    setBooting(!isPyodideLoaded());
    try {
      const res = await runScript(code);
      setOutcome(res);
    } catch (e) {
      setOutcome({ stdout: '', error: e instanceof Error ? e.message : String(e) });
    } finally {
      setBooting(false);
      setRunning(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  };

  const noOutput = outcome && !outcome.error && !outcome.stdout;

  return (
    <div
      onKeyDown={onKeyDown}
      className="overflow-hidden rounded-md border-[1.5px] border-ink bg-panel"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
          ⌨ scratchpad.py
        </span>
        <span className="hidden font-mono text-[10px] text-faint sm:inline">
          ⌘/Ctrl + Enter to run
        </span>
      </div>

      <div
        style={{ ['--cm-min' as string]: `${minHeight}px` }}
        className="[&_.cm-editor]:!bg-code-bg/60 [&_.cm-editor]:min-h-[var(--cm-min)] [&_.cm-editor]:font-mono [&_.cm-editor]:text-[13px] [&_.cm-editor.cm-focused]:outline-none [&_.cm-gutters]:!border-r [&_.cm-gutters]:!border-line [&_.cm-gutters]:!bg-paper"
      >
        <CodeMirror
          value={code}
          onChange={change}
          extensions={pyExtensions as never[]}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            highlightActiveLine: true,
            autocompletion: false,
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-2.5">
        <button
          onClick={run}
          disabled={running}
          className="rounded border border-active bg-active px-4 py-1.5 font-mono text-[11.5px] font-semibold text-white transition-colors hover:bg-active-deep disabled:opacity-50"
        >
          {booting ? 'booting Python…' : running ? 'running…' : '▶ run'}
        </button>
        <button
          onClick={() => change('')}
          className="rounded border border-line-strong bg-panel px-3 py-1.5 font-mono text-[11px] text-muted hover:border-ink hover:text-ink"
        >
          clear
        </button>
      </div>

      <div className="border-t border-line bg-paper px-4 py-3">
        <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          output
        </div>
        {!outcome && (
          <p className="font-mono text-[12px] text-faint">
            Nothing run yet — hit ▶ run.
          </p>
        )}
        {outcome?.stdout && (
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-ink">
            {outcome.stdout}
          </pre>
        )}
        {noOutput && (
          <p className="font-mono text-[12px] text-faint">
            Ran with no output — add print(...) to see values.
          </p>
        )}
        {outcome?.error && (
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded border border-alert bg-alert-wash/60 p-3 font-mono text-[11.5px] leading-relaxed text-alert">
            {outcome.error}
          </pre>
        )}
      </div>
    </div>
  );
}
