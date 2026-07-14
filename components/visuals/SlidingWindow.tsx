'use client';

import React, { useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveSelect, DriveLabel } from './shell';

interface SW {
  a: number[];
  k: number;
  l: number; // window start
  r: number; // window end (inclusive)
  sum: number;
  best: number;
  bestL: number;
  entering: number | null;
  leaving: number | null;
  started: boolean;
}

const CODE = [
  'def best_window_sum(a, k):',
  '    s = sum(a[:k])          # first window, the only full add',
  '    best, best_l = s, 0',
  '    for r in range(k, len(a)):',
  '        s += a[r]           # one element ENTERS on the right',
  '        s -= a[r - k]       # one element LEAVES on the left',
  '        if s > best:',
  '            best, best_l = s, r - k + 1',
  '    return best',
];

function randArray(n = 12): number[] {
  return Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 9));
}

function buildProgram(a: number[], k: number): Frame<SW>[] {
  const frames: Frame<SW>[] = [];
  const emit = makeEmitter(frames);
  const s: SW = {
    a,
    k,
    l: 0,
    r: k - 1,
    sum: a.slice(0, k).reduce((x, y) => x + y, 0),
    best: 0,
    bestL: 0,
    entering: null,
    leaving: null,
    started: false,
  };
  s.best = s.sum;
  emit(
    { ...s, started: true },
    1,
    `first window a[0..${k - 1}]: one honest O(k) sum = ${s.sum}. Never again.`,
  );
  s.started = true;
  for (let r = k; r < a.length; r++) {
    s.r = r;
    s.l = r - k + 1;
    s.entering = r;
    s.leaving = null;
    s.sum += a[r];
    emit(s, 4, `a[${r}]=${a[r]} enters → sum ${s.sum - 0}`);
    s.leaving = r - k;
    s.entering = null;
    s.sum -= a[r - k];
    emit(s, 5, `a[${r - k}]=${a[r - k]} leaves → sum ${s.sum}. Two ops, not ${k}.`);
    s.leaving = null;
    if (s.sum > s.best) {
      s.best = s.sum;
      s.bestL = s.l;
      emit(s, 7, `new best window: a[${s.l}..${s.r}] = ${s.best}`);
    } else {
      emit(s, 6, `sum ${s.sum} ≤ best ${s.best} — keep sliding`);
    }
  }
  emit(s, 8, `done: best k=${k} window is a[${s.bestL}..${s.bestL + k - 1}] = ${s.best}, in O(n)`);
  return frames;
}

const CW = 34;

export default function SlidingWindowVisual() {
  const [k, setK] = useState(3);
  const [arr, setArr] = useState<number[]>(() => [4, 2, 7, 1, 5, 9, 3, 6, 2, 8, 4, 1]);
  const engine = useVisualEngine<SW>(buildProgram(arr, k), { baseMs: 750 });
  const s = engine.frame.state;
  const W = 20 + arr.length * CW;

  const regen = (newArr: number[], newK: number) => {
    setArr(newArr);
    setK(newK);
    engine.setProgram(buildProgram(newArr, newK));
  };

  return (
    <VisualShell
      figure="FIG · A3"
      title="Sliding window — reuse the overlap, never recompute it"
      engine={engine}
      codeTitle="window.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="window" v={`a[${s.l}..${s.r}]`} tone="active" />
          <KV k="sum" v={s.sum} tone="active" />
          <KV k="best" v={s.best} tone="done" />
          <KV k="k" v={s.k} />
          <span className="font-mono text-[11px] text-muted">
            work per slide: 2 ops (was {s.k})
          </span>
        </>
      }
      drive={
        <>
          <DriveLabel>k</DriveLabel>
          <DriveSelect
            value={String(k)}
            onChange={(v) => regen(arr, parseInt(v, 10))}
            options={[2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) }))}
          />
          <DriveBtn onClick={() => regen(randArray(), k)}>new array</DriveBtn>
        </>
      }
      svg={
        <svg
          viewBox={`0 0 ${W} 150`}
          className="mx-auto block w-full max-w-[520px]"
          role="img"
          aria-label="sliding window animation"
        >
          {/* best-so-far underline */}
          {s.best > 0 && (
            <rect
              x={10 + s.bestL * CW - 2}
              y={86}
              width={s.k * CW + 2}
              height={4}
              rx={2}
              fill="var(--color-done)"
              style={{ transition: 'x .3s' }}
            />
          )}
          {s.a.map((v, i) => {
            const inWin = i >= s.l && i <= s.r;
            const isIn = i === s.entering;
            const isOut = i === s.leaving;
            return (
              <g key={i}>
                <rect
                  x={10 + i * CW}
                  y={40}
                  width={CW - 4}
                  height={40}
                  rx={3}
                  fill={
                    isIn
                      ? 'var(--color-active-wash)'
                      : isOut
                        ? 'var(--color-alert-wash)'
                        : inWin
                          ? 'var(--color-panel)'
                          : 'var(--color-paper)'
                  }
                  stroke={
                    isIn
                      ? 'var(--color-active)'
                      : isOut
                        ? 'var(--color-alert)'
                        : inWin
                          ? 'var(--color-ink)'
                          : 'var(--color-line-strong)'
                  }
                  strokeWidth={isIn || isOut ? 2 : inWin ? 1.4 : 1}
                  style={{ transition: 'fill .25s, stroke .25s' }}
                />
                <text
                  x={10 + i * CW + (CW - 4) / 2}
                  y={65}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="13"
                  fontWeight={600}
                  fill={inWin ? 'var(--color-ink)' : 'var(--color-faint)'}
                >
                  {v}
                </text>
                <text
                  x={10 + i * CW + (CW - 4) / 2}
                  y={32}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
                  fill="var(--color-faint)"
                >
                  {i}
                </text>
              </g>
            );
          })}
          {/* window bracket */}
          <rect
            x={10 + s.l * CW - 3}
            y={36}
            width={s.k * CW + 2}
            height={48}
            rx={5}
            fill="none"
            stroke="var(--color-active)"
            strokeWidth={2}
            style={{ transition: 'x .35s ease' }}
          />
          {s.entering != null && (
            <text
              x={10 + s.entering * CW + CW / 2}
              y={105}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9.5"
              fill="var(--color-active)"
            >
              +{s.a[s.entering]} enters
            </text>
          )}
          {s.leaving != null && (
            <text
              x={10 + s.leaving * CW + CW / 2}
              y={105}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9.5"
              fill="var(--color-alert)"
            >
              −{s.a[s.leaving]} leaves
            </text>
          )}
          <text x={10} y={132} fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--color-ink-soft)">
            sum = <tspan fontWeight={700} fill="var(--color-active-deep)">{s.sum}</tspan>
            {'   '}best = <tspan fontWeight={700} fill="var(--color-done)">{s.best}</tspan>
          </text>
        </svg>
      }
    />
  );
}
