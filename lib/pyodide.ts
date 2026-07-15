'use client';

// Pyodide, loaded lazily from CDN only when a code exercise actually runs
// (spec §9 — it's heavy). Everything executes client-side; no backend sandbox.

const PYODIDE_VERSION = 'v0.26.4';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

/* eslint-disable @typescript-eslint/no-explicit-any */
let pyodidePromise: Promise<any> | null = null;

export function getPyodide(): Promise<any> {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const w = window as any;
      if (w.loadPyodide) {
        w.loadPyodide({ indexURL: PYODIDE_BASE }).then(resolve, reject);
        return;
      }
      const s = document.createElement('script');
      s.src = `${PYODIDE_BASE}pyodide.js`;
      s.onload = () =>
        w.loadPyodide({ indexURL: PYODIDE_BASE }).then(resolve, reject);
      s.onerror = () => {
        pyodidePromise = null;
        reject(new Error('Failed to load Pyodide from CDN — are you offline?'));
      };
      document.head.appendChild(s);
    });
  }
  return pyodidePromise;
}

export const isPyodideLoaded = () => pyodidePromise !== null;

export interface TestResult {
  name: string;
  passed: boolean;
  message?: string;
}

export interface RunOutcome {
  results: TestResult[];
  /** Error before tests could run (syntax error, import failure…). */
  error?: string;
  allPassed: boolean;
}

const HARNESS = `
import json, traceback

def __invariant_run():
    env = {}
    try:
        exec(__USER_CODE, env)
    except Exception:
        return json.dumps({"error": traceback.format_exc(limit=3)})
    try:
        exec(__TEST_CODE, env)
    except Exception:
        return json.dumps({"error": traceback.format_exc(limit=3)})
    results = []
    for name in list(env):
        fn = env[name]
        if name.startswith("test_") and callable(fn):
            try:
                fn()
                results.append({"name": name, "passed": True})
            except AssertionError as e:
                tb = traceback.extract_tb(e.__traceback__)
                src = tb[-1].line if tb else ""
                msg = str(e) or "assertion failed"
                if src:
                    msg += "   ←  " + src
                results.append({"name": name, "passed": False, "message": msg})
            except Exception as e:
                results.append({"name": name, "passed": False,
                                "message": type(e).__name__ + ": " + str(e)})
    return json.dumps({"results": results})

__invariant_run()
`;

export interface ScriptOutcome {
  /** Everything the program printed (stdout + stderr, interleaved order kept
   *  best-effort: stdout first, then stderr). */
  stdout: string;
  /** Uncaught exception traceback, if the program blew up. */
  error?: string;
  /** True when the program ran to completion with no uncaught exception. */
  ok: boolean;
}

const SCRIPT_HARNESS = `
import sys, io, json, traceback

def __invariant_script():
    buf = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = sys.stderr = buf
    err = None
    try:
        exec(__USER_SCRIPT, {"__name__": "__main__"})
    except SystemExit:
        pass
    except Exception:
        err = traceback.format_exc()
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    return json.dumps({"stdout": buf.getvalue(), "error": err})

__invariant_script()
`;

/**
 * Run arbitrary Python for the playground / print-debugging — captures stdout
 * and stderr and returns them as text, plus any uncaught traceback. Unlike
 * runTests there are no hidden tests: this is a plain "run my code" REPL.
 */
export async function runScript(code: string): Promise<ScriptOutcome> {
  const py = await getPyodide();
  py.globals.set('__USER_SCRIPT', code);
  const raw = py.runPython(SCRIPT_HARNESS) as string;
  const parsed = JSON.parse(raw) as { stdout: string; error: string | null };
  return {
    stdout: parsed.stdout ?? '',
    error: parsed.error ?? undefined,
    ok: !parsed.error,
  };
}

/** Execute user code + hidden pytest-style tests; report per-test pass/fail. */
export async function runTests(
  userCode: string,
  tests: string,
): Promise<RunOutcome> {
  const py = await getPyodide();
  py.globals.set('__USER_CODE', userCode);
  py.globals.set('__TEST_CODE', tests);
  const raw = py.runPython(HARNESS) as string;
  const parsed = JSON.parse(raw) as {
    error?: string;
    results?: TestResult[];
  };
  if (parsed.error) {
    return { results: [], error: parsed.error, allPassed: false };
  }
  const results = parsed.results ?? [];
  return {
    results,
    allPassed: results.length > 0 && results.every((r) => r.passed),
  };
}
