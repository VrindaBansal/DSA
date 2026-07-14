'use client';

import React, { useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveSelect, DriveLabel } from './shell';

// Edit distance, one table, two fill orders: bottom-up sweeps densely,
// top-down memo fills sparsely on demand. Same cells, two orders — the insight.

type Mode = 'tabulation' | 'memo';

interface DP {
  a: string;
  b: string;
  D: (number | null)[][];
  active: [number, number] | null;
  deps: [number, number][];
  hits: [number, number] | null; // cache hit being reused
  mode: Mode;
}

const TAB_CODE = [
  'def edit(a, b):                 # bottom-up: fill EVERY cell',
  '    m, n = len(a), len(b)',
  '    D = [[0]*(n+1) for _ in range(m+1)]',
  '    for i in range(m+1): D[i][0] = i   # delete all',
  '    for j in range(n+1): D[0][j] = j   # insert all',
  '    for i in range(1, m+1):',
  '        for j in range(1, n+1):        # row-major sweep',
  '            if a[i-1] == b[j-1]:',
  '                D[i][j] = D[i-1][j-1]  # match: free diagonal',
  '            else:',
  '                D[i][j] = 1 + min(D[i-1][j],    # delete',
  '                                  D[i][j-1],    # insert',
  '                                  D[i-1][j-1])  # substitute',
  '    return D[m][n]',
];

const MEMO_CODE = [
  '@lru_cache(None)                 # top-down: only what is NEEDED',
  'def ed(i, j):    # distance a[:i] vs b[:j]',
  '    if i == 0: return j',
  '    if j == 0: return i',
  '    if a[i-1] == b[j-1]:',
  '        return ed(i-1, j-1)      # match skips two branches —',
  '                                 #   whole regions never fill',
  '    return 1 + min(ed(i-1, j),',
  '                   ed(i, j-1),',
  '                   ed(i-1, j-1))',
];

function tabFrames(a: string, b: string): Frame<DP>[] {
  const m = a.length,
    n = b.length;
  const frames: Frame<DP>[] = [];
  const emit = makeEmitter(frames);
  const s: DP = {
    a,
    b,
    D: Array.from({ length: m + 1 }, () => Array(n + 1).fill(null)),
    active: null,
    deps: [],
    hits: null,
    mode: 'tabulation',
  };
  emit(s, 2, `tabulation: "${a}" → "${b}". Every cell will be filled, row by row.`, 'tab');
  for (let i = 0; i <= m; i++) s.D[i][0] = i;
  emit(s, 3, 'base column: turning a[:i] into "" takes i deletes', 'tab');
  for (let j = 0; j <= n; j++) s.D[0][j] = j;
  emit(s, 4, 'base row: turning "" into b[:j] takes j inserts', 'tab');
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      s.active = [i, j];
      if (a[i - 1] === b[j - 1]) {
        s.deps = [[i - 1, j - 1]];
        s.D[i][j] = s.D[i - 1][j - 1];
        emit(s, 8, `'${a[i - 1]}'=='${b[j - 1]}' — free: copy the diagonal (${s.D[i][j]})`, 'tab');
      } else {
        s.deps = [
          [i - 1, j],
          [i, j - 1],
          [i - 1, j - 1],
        ];
        s.D[i][j] = 1 + Math.min(s.D[i - 1][j]!, s.D[i][j - 1]!, s.D[i - 1][j - 1]!);
        emit(s, 10, `'${a[i - 1]}'≠'${b[j - 1]}': 1 + min(↑${s.D[i - 1][j]}, ←${s.D[i][j - 1]}, ↖${s.D[i - 1][j - 1]}) = ${s.D[i][j]}`, 'tab');
      }
    }
  }
  s.active = null;
  s.deps = [];
  emit(s, 13, `D[${m}][${n}] = ${s.D[m][n]} — edit distance, after filling all ${(m + 1) * (n + 1)} cells`, 'tab');
  return frames;
}

function memoFrames(a: string, b: string): Frame<DP>[] {
  const m = a.length,
    n = b.length;
  const frames: Frame<DP>[] = [];
  const emit = makeEmitter(frames);
  const s: DP = {
    a,
    b,
    D: Array.from({ length: m + 1 }, () => Array(n + 1).fill(null)),
    active: null,
    deps: [],
    hits: null,
    mode: 'memo',
  };
  emit(s, 1, `memo: "${a}" → "${b}". Start at the END — ed(${m},${n}) — and compute only what's demanded.`, 'memo');
  let computed = 0;
  const ed = (i: number, j: number): number => {
    if (s.D[i][j] != null) {
      s.hits = [i, j];
      emit(s, 0, `ed(${i},${j}) already cached = ${s.D[i][j]} — free`, 'memo');
      s.hits = null;
      return s.D[i][j]!;
    }
    if (i === 0) {
      s.D[0][j] = j;
      computed++;
      s.active = [0, j];
      s.deps = [];
      emit(s, 2, `base: ed(0,${j}) = ${j}`, 'memo');
      s.active = null;
      return j;
    }
    if (j === 0) {
      s.D[i][0] = i;
      computed++;
      s.active = [i, 0];
      s.deps = [];
      emit(s, 3, `base: ed(${i},0) = ${i}`, 'memo');
      s.active = null;
      return i;
    }
    if (a[i - 1] === b[j - 1]) {
      const v = ed(i - 1, j - 1);
      s.D[i][j] = v;
      computed++;
      s.active = [i, j];
      s.deps = [[i - 1, j - 1]];
      emit(s, 5, `'${a[i - 1]}'=='${b[j - 1]}': ed(${i},${j}) = diagonal = ${v} — two branches never explored`, 'memo');
      s.active = null;
      s.deps = [];
      return v;
    }
    const d1 = ed(i - 1, j);
    const d2 = ed(i, j - 1);
    const d3 = ed(i - 1, j - 1);
    const v = 1 + Math.min(d1, d2, d3);
    s.D[i][j] = v;
    computed++;
    s.active = [i, j];
    s.deps = [
      [i - 1, j],
      [i, j - 1],
      [i - 1, j - 1],
    ];
    emit(s, 7, `ed(${i},${j}) = 1 + min(${d1},${d2},${d3}) = ${v}`, 'memo');
    s.active = null;
    s.deps = [];
    return v;
  };
  const ans = ed(m, n);
  emit(
    s,
    9,
    `ed(${m},${n}) = ${ans} — computed ${computed}/${(m + 1) * (n + 1)} cells; blank cells were never needed`,
    'memo',
  );
  return frames;
}

const PAIRS: [string, string][] = [
  ['money', 'monkey'],
  ['cat', 'cart'],
  ['kitten', 'sitting'],
];

export default function DpTableVisual() {
  const [mode, setMode] = useState<Mode>('tabulation');
  const [pair, setPair] = useState(0);
  const engine = useVisualEngine<DP>(tabFrames('money', 'monkey'), { baseMs: 480 });
  const s = engine.frame.state;
  const m = s.a.length,
    n = s.b.length;
  const cell = Math.min(34, 380 / (n + 2));
  const ox = 46,
    oy = 40;

  const regen = (md: Mode, p: number) => {
    setMode(md);
    setPair(p);
    const [a, b] = PAIRS[p];
    engine.setProgram(md === 'tabulation' ? tabFrames(a, b) : memoFrames(a, b));
  };

  const filled = s.D.flat().filter((v) => v != null).length;

  return (
    <VisualShell
      figure="FIG · D1"
      title="DP table — one table, two fill orders (memo vs tabulation)"
      engine={engine}
      codeTitle={s.mode === 'tabulation' ? 'edit_tab.py' : 'edit_memo.py'}
      code={
        <CodePane
          lines={s.mode === 'tabulation' ? TAB_CODE : MEMO_CODE}
          active={engine.frame.line}
        />
      }
      readout={
        <>
          <KV k="mode" v={s.mode} tone="active" />
          <KV k="cells_filled" v={`${filled}/${(m + 1) * (n + 1)}`} />
          <KV k="answer" v={s.D[m][n] ?? '…'} tone={s.D[m][n] != null ? 'done' : undefined} />
          <span className="font-mono text-[11px] text-muted">
            ↑ delete · ← insert · ↖ substitute/match
          </span>
        </>
      }
      drive={
        <>
          <DriveLabel>order</DriveLabel>
          <DriveSelect
            value={mode}
            onChange={(v) => regen(v as Mode, pair)}
            options={[
              { value: 'tabulation', label: 'tabulation (dense)' },
              { value: 'memo', label: 'memo (sparse)' },
            ]}
          />
          <DriveLabel>strings</DriveLabel>
          <DriveSelect
            value={String(pair)}
            onChange={(v) => regen(mode, parseInt(v, 10))}
            options={PAIRS.map((p, i) => ({ value: String(i), label: `${p[0]}→${p[1]}` }))}
          />
        </>
      }
      svg={
        <svg
          viewBox={`0 0 ${ox + (n + 1) * cell + 14} ${oy + (m + 1) * cell + 14}`}
          className="mx-auto block w-full max-w-[480px]"
          role="img"
          aria-label="dynamic programming table animation"
        >
          {/* headers */}
          <text x={ox - 14} y={oy - 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-faint)">
            ε
          </text>
          {s.b.split('').map((ch, j) => (
            <text key={j} x={ox + (j + 1) * cell + cell / 2} y={oy - 10} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={600} fill="var(--color-ink-soft)">
              {ch}
            </text>
          ))}
          {s.a.split('').map((ch, i) => (
            <text key={i} x={ox - 12} y={oy + (i + 1) * cell + cell / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={600} fill="var(--color-ink-soft)">
              {ch}
            </text>
          ))}

          {/* cells */}
          {s.D.map((row, i) =>
            row.map((v, j) => {
              const x = ox + j * cell;
              const y = oy + i * cell;
              const isActive = s.active?.[0] === i && s.active?.[1] === j;
              const isDep = s.deps.some(([di, dj]) => di === i && dj === j);
              const isHit = s.hits?.[0] === i && s.hits?.[1] === j;
              const isAnswer = i === m && j === n && v != null;
              return (
                <g key={`${i}-${j}`}>
                  <rect
                    x={x}
                    y={y}
                    width={cell - 2}
                    height={cell - 2}
                    rx={2}
                    fill={
                      isActive
                        ? 'var(--color-active-wash)'
                        : isHit
                          ? 'var(--color-done-wash)'
                          : isAnswer
                            ? 'var(--color-done-wash)'
                            : v != null
                              ? 'var(--color-panel)'
                              : 'var(--color-paper)'
                    }
                    stroke={
                      isActive
                        ? 'var(--color-active)'
                        : isDep
                          ? 'var(--color-active)'
                          : isHit || isAnswer
                            ? 'var(--color-done)'
                            : v != null
                              ? 'var(--color-line-strong)'
                              : 'var(--color-line)'
                    }
                    strokeWidth={isActive || isAnswer ? 2 : isDep ? 1.6 : 1}
                    strokeDasharray={isDep ? '3 2' : undefined}
                    style={{ transition: 'fill .2s, stroke .2s' }}
                  />
                  {v != null && (
                    <text x={x + (cell - 2) / 2} y={y + cell / 2 + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fontWeight={isActive || isAnswer ? 700 : 500} fill="var(--color-ink)">
                      {v}
                    </text>
                  )}
                </g>
              );
            }),
          )}

          {/* dependency arrows into the active cell */}
          {s.active &&
            s.deps.map(([di, dj]) => {
              const [ai, aj] = s.active!;
              const x1 = ox + dj * cell + cell / 2;
              const y1 = oy + di * cell + cell / 2;
              const x2 = ox + aj * cell + cell / 2;
              const y2 = oy + ai * cell + cell / 2;
              return (
                <line
                  key={`${di}-${dj}`}
                  x1={x1}
                  y1={y1}
                  x2={x2 - (x2 - x1) * 0.35}
                  y2={y2 - (y2 - y1) * 0.35}
                  stroke="var(--color-active)"
                  strokeWidth={1.6}
                  markerEnd="url(#dp-arrow)"
                />
              );
            })}
          <defs>
            <marker id="dp-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--color-active)" />
            </marker>
          </defs>
        </svg>
      }
    />
  );
}
