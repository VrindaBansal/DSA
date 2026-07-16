'use client';

import React, { useState } from 'react';
import { CodeScratchpad } from '@/components/CodeScratchpad';

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
  { label: 'Empty', code: '' },
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
  const [inject, setInject] = useState({ code: DEFAULT_CODE, nonce: 0 });

  const push = (code: string) => setInject((s) => ({ code, nonce: s.nonce + 1 }));

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
              if (s) push(s.code);
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
          <button
            onClick={() => push(DEFAULT_CODE)}
            className="font-mono text-[10.5px] text-faint hover:text-ink"
          >
            reset to example
          </button>
        </div>
      </div>

      <div className="mt-6">
        <CodeScratchpad
          storageKey={STORAGE_KEY}
          initialCode={DEFAULT_CODE}
          minHeight={340}
          injectCode={inject}
        />
      </div>

      <p className="mt-4 font-mono text-[10.5px] leading-relaxed text-faint">
        The standard library is available (collections, heapq, bisect, math,
        itertools, functools…). No file or network access. This is the same
        engine that grades the coding exercises — so if it runs here, it runs
        there. Runs on the page&apos;s main thread, so an infinite loop will
        freeze the tab (your code is auto-saved, so just reload) — put a bound on
        your loops while experimenting.
      </p>
    </div>
  );
}
