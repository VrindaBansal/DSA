'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { runScript, isPyodideLoaded, type ScriptOutcome } from '@/lib/pyodide';

const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-code-bg font-mono text-[11px] text-faint">
      loading editor…
    </div>
  ),
});

const STORAGE_KEY = 'invariant.playground.code';

const DEFAULT_CODE = `# Your Python scratchpad. Runs in the browser — nothing leaves your machine.
# Print anything, try an idea, or paste a LeetCode solution and poke at it.

def two_sum(nums, target):
    seen = {}                      # value -> index
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))   # -> [0, 1]
`;

const SNIPPETS: { label: string; code: string }[] = [
  {
    label: 'Empty',
    code: '',
  },
  {
    label: 'Timing harness',
    code: `import time

def solve(nums):
    # ... your solution ...
    return sum(nums)

data = list(range(1_000_000))
t = time.perf_counter()
result = solve(data)
print("result:", result)
print(f"took {(time.perf_counter() - t) * 1000:.1f} ms")
`,
  },
  {
    label: 'Assert-style tests',
    code: `def is_palindrome(s):
    s = [c.lower() for c in s if c.isalnum()]
    return s == s[::-1]

# Sanity-check yourself before hitting "run tests" on a real problem:
assert is_palindrome("A man, a plan, a canal: Panama")
assert not is_palindrome("race a car")
print("all asserts passed ✓")
`,
  },
];

export function PlaygroundClient() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [pyExtensions, setPyExtensions] = useState<unknown[]>([]);
  const [running, setRunning] = useState(false);
  const [booting, setBooting] = useState(false);
  const [outcome, setOutcome] = useState<ScriptOutcome | null>(null);
  const [ranAt, setRanAt] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setCode(saved);
    } catch {}
    import('@codemirror/lang-python').then((m) => setPyExtensions([m.python()]));
  }, []);

  const onCodeChange = (v: string) => {
    setCode(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {}
  };

  const run = async () => {
    if (running) return;
    setRunning(true);
    setBooting(!isPyodideLoaded());
    try {
      const res = await runScript(code);
      setBooting(false);
      setOutcome(res);
      setRanAt(Date.now());
    } catch (e) {
      setBooting(false);
      setOutcome({
        stdout: '',
        error: e instanceof Error ? e.message : String(e),
      });
    } finally {
      setRunning(false);
    }
  };

  // Cmd/Ctrl+Enter to run
  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  };

  const empty =
    outcome && !outcome.error && !outcome.stdout
      ? 'Ran with no output. (Nothing was printed — add print(...) to see values.)'
      : null;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-[1.7rem] font-bold tracking-tight">
            Python playground
          </h1>
          <p className="mt-1 font-mono text-[11.5px] text-muted">
            A real editor to test on. Runs entirely in your browser (Pyodide);
            first run boots Python, then it&apos;s instant. Progress-free — just a
            scratchpad.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-mono text-[10.5px] text-faint">load</label>
          <select
            onChange={(e) => {
              const s = SNIPPETS.find((x) => x.label === e.target.value);
              if (s) onCodeChange(s.code);
              e.currentTarget.selectedIndex = 0;
            }}
            className="rounded border border-line-strong bg-panel px-2 py-1 font-mono text-[11px] text-ink hover:border-ink"
            defaultValue=""
          >
            <option value="" disabled>
              a snippet…
            </option>
            {SNIPPETS.map((s) => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        onKeyDown={onKeyDown}
        className="mt-6 overflow-hidden rounded-md border-[1.5px] border-ink bg-panel"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-active-deep">
            ⌨ scratchpad.py
          </span>
          <span className="hidden font-mono text-[10px] text-faint sm:inline">
            ⌘/Ctrl + Enter to run
          </span>
        </div>

        <div className="[&_.cm-editor]:!bg-code-bg/60 [&_.cm-editor]:min-h-[340px] [&_.cm-editor]:font-mono [&_.cm-editor]:text-[13px] [&_.cm-editor.cm-focused]:outline-none [&_.cm-gutters]:!border-r [&_.cm-gutters]:!border-line [&_.cm-gutters]:!bg-paper">
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

        <div className="flex flex-wrap items-center gap-2 border-t border-line px-4 py-2.5">
          <button
            onClick={run}
            disabled={running}
            className="rounded border border-active bg-active px-4 py-1.5 font-mono text-[11.5px] font-semibold text-white transition-colors hover:bg-active-deep disabled:opacity-50"
          >
            {booting ? 'booting Python…' : running ? 'running…' : '▶ run'}
          </button>
          <button
            onClick={() => onCodeChange('')}
            className="rounded border border-line-strong bg-panel px-3 py-1.5 font-mono text-[11px] text-muted hover:border-ink hover:text-ink"
          >
            clear
          </button>
          <button
            onClick={() => onCodeChange(DEFAULT_CODE)}
            className="ml-auto font-mono text-[10.5px] text-faint hover:text-ink"
          >
            reset to example
          </button>
        </div>

        <div className="border-t border-line bg-paper px-4 py-3">
          <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            output
            {ranAt && (
              <span className="normal-case tracking-normal text-faint">
                · last run {new Date(ranAt).toLocaleTimeString()}
              </span>
            )}
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
          {empty && (
            <p className="font-mono text-[12px] text-faint">{empty}</p>
          )}
          {outcome?.error && (
            <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded border border-alert bg-alert-wash/60 p-3 font-mono text-[11.5px] leading-relaxed text-alert">
              {outcome.error}
            </pre>
          )}
        </div>
      </div>

      <p className="mt-4 font-mono text-[10.5px] leading-relaxed text-faint">
        The standard library is available (collections, heapq, bisect, math,
        itertools, functools…). No file or network access. This is the same
        engine that grades the coding exercises — so if it runs here, it runs
        there. Runs on the page&apos;s main thread, so an infinite loop will
        freeze the tab (your code is auto-saved, so just reload) — put a bound
        on your loops while experimenting.
      </p>
    </div>
  );
}
