#!/usr/bin/env python3
"""Code-exercise tests — run before any deploy (npm run test:exercises).

For every code question in the content, this executes the SAME contract the
in-browser Pyodide runner uses (exec code, exec tests, run every test_*):

  1. solution + tests  -> every test must PASS (the exercise is solvable)
  2. starter  + tests  -> at least one test must FAIL (the tests aren't vacuous)
  3. a complexityCheck must exist (spec §9: passing without knowing the cost
     is a fake win)
"""

import glob
import re
import sys
import traceback

FIELD = r"{name}: `((?:[^`\\]|\\.)*)`"


def extract_exercises():
    files = (
        sorted(glob.glob("content/courses/*/lessons/*/questions.ts"))
        + sorted(glob.glob("content/courses/*/questions.ts"))
        + ["content/questions/anchor-questions.ts"]
    )
    exercises = []
    for f in files:
        src = open(f).read()
        # split on question-object boundaries; code questions carry starterCode
        for block in re.split(r"\n  \{\n", src)[1:]:
            if "kind: 'code'" not in block:
                continue
            qid = re.search(r"id: '([^']+)'", block).group(1)
            fields = {}
            for name in ("starterCode", "tests", "solution"):
                m = re.search(FIELD.format(name=name), block, re.S)
                if not m:
                    fields = None
                    break
                fields[name] = m.group(1).replace("\\`", "`").replace("\\\\", "\\")
            exercises.append(
                {
                    "id": qid,
                    "file": f,
                    "fields": fields,
                    "has_complexity": "complexityCheck: {" in block,
                }
            )
    return exercises


def run_tests(user_code, test_code):
    """Mirror of the harness in lib/pyodide.ts."""
    env = {}
    try:
        exec(user_code, env)  # noqa: S102 - executing our own content is the point
    except Exception:
        return None, f"user code raised:\n{traceback.format_exc(limit=2)}"
    try:
        exec(test_code, env)  # noqa: S102
    except Exception:
        return None, f"test code raised:\n{traceback.format_exc(limit=2)}"
    results = []
    for name in list(env):
        fn = env[name]
        if name.startswith("test_") and callable(fn):
            try:
                fn()
                results.append((name, True, ""))
            except Exception as e:  # noqa: BLE001
                results.append((name, False, f"{type(e).__name__}: {e}"))
    return results, None


def main():
    exercises = extract_exercises()
    if not exercises:
        print("✗ no code exercises found — extraction broken?")
        return 1

    failures = 0
    for ex in exercises:
        qid = ex["id"]
        if ex["fields"] is None:
            print(f"✗ {qid}: could not extract starter/tests/solution")
            failures += 1
            continue

        results, err = run_tests(ex["fields"]["solution"], ex["fields"]["tests"])
        if err or not results:
            print(f"✗ {qid}: solution run broke — {err or 'no test_* functions found'}")
            failures += 1
        elif not all(ok for _, ok, _ in results):
            bad = [(n, msg) for n, ok, msg in results if not ok]
            print(f"✗ {qid}: SOLUTION FAILS ITS OWN TESTS: {bad}")
            failures += 1
        else:
            starter_results, starter_err = run_tests(
                ex["fields"]["starterCode"], ex["fields"]["tests"]
            )
            starter_fails = (
                starter_err is not None
                or not starter_results
                or any(not ok for _, ok, _ in starter_results)
            )
            if not starter_fails:
                print(f"✗ {qid}: starter code already passes — tests are vacuous")
                failures += 1
            elif not ex["has_complexity"]:
                print(f"✗ {qid}: missing complexityCheck (spec §9)")
                failures += 1
            else:
                print(f"✓ {qid}: solvable, {len(results)} tests pass, starter fails, complexity check present")

    print(
        f"\n{'✓' if failures == 0 else '✗'} code exercises: "
        f"{len(exercises) - failures}/{len(exercises)} valid"
    )
    return 0 if failures == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
