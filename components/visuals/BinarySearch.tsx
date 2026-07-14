'use client';

import React, { useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveInput } from './shell';

interface BS {
  a: number[];
  lo: number;
  hi: number;
  mid: number | null;
  target: number;
  found: number | null;   // index if found
  missed: boolean;
  probes: number;
}

const CODE = [
  'def binary_search(a, target):',
  '    lo, hi = 0, len(a) - 1',
  '    # INVARIANT: if target exists, it is in a[lo..hi]',
  '    while lo <= hi:',
  '        mid = (lo + hi) // 2',
  '        if a[mid] == target:',
  '            return mid',
  '        elif a[mid] < target:',
  '            lo = mid + 1   # everything ≤ mid is too small',
  '        else:',
  '            hi = mid - 1   # everything ≥ mid is too big',
  '    return -1              # bracket emptied — not present',
];

function sortedArray(): number[] {
  const s = new Set<number>();
  while (s.size < 15) s.add(2 + Math.floor(Math.random() * 95));
  return [...s].sort((a, b) => a - b);
}

function searchFrames(a: number[], target: number): Frame<BS>[] {
  const frames: Frame<BS>[] = [];
  const emit = makeEmitter(frames);
  const s: BS = {
    a,
    lo: 0,
    hi: a.length - 1,
    mid: null,
    target,
    found: null,
    missed: false,
    probes: 0,
  };
  emit(s, 1, `search ${target}: bracket is the whole array — invariant: ${target} ∈ a[0..${a.length - 1}] if present`);
  while (s.lo <= s.hi) {
    s.mid = (s.lo + s.hi) >> 1;
    s.probes += 1;
    emit(s, 4, `probe #${s.probes}: mid = (${s.lo}+${s.hi})//2 = ${s.mid}, a[${s.mid}] = ${a[s.mid]}`);
    if (a[s.mid] === target) {
      s.found = s.mid;
      emit(s, 6, `a[${s.mid}] == ${target} — found in ${s.probes} probes (⌈log₂ ${a.length}⌉ = ${Math.ceil(Math.log2(a.length))} max)`);
      return frames;
    } else if (a[s.mid] < target) {
      const old = s.lo;
      s.lo = s.mid + 1;
      emit(s, 8, `${a[s.mid]} < ${target}: discard a[${old}..${s.mid}] — invariant now: ${target} ∈ a[${s.lo}..${s.hi}]`);
    } else {
      const old = s.hi;
      s.hi = s.mid - 1;
      emit(s, 10, `${a[s.mid]} > ${target}: discard a[${s.mid}..${old}] — invariant now: ${target} ∈ a[${s.lo}..${s.hi}]`);
    }
    s.mid = null;
  }
  s.missed = true;
  emit(s, 11, `lo(${s.lo}) > hi(${s.hi}) — the bracket is empty, so ${target} is not here. ${s.probes} probes.`);
  return frames;
}

function demo(a: number[]): Frame<BS>[] {
  return searchFrames(a, a[10]);
}

const CW = 30;

export default function BinarySearchVisual() {
  const [arr, setArr] = useState<number[]>(() => [3, 7, 11, 18, 24, 31, 40, 47, 55, 62, 70, 78, 84, 91, 97]);
  const [tval, setTval] = useState('70');
  const engine = useVisualEngine<BS>(demo(arr), { baseMs: 900 });
  const s = engine.frame.state;
  const W = 20 + arr.length * CW;

  return (
    <VisualShell
      figure="FIG · B1"
      title="Binary search — the bracket collapses, the invariant survives"
      engine={engine}
      codeTitle="bsearch.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="lo" v={s.lo} tone="active" />
          <KV k="hi" v={s.hi <= s.a.length - 1 && s.hi >= 0 ? s.hi : s.hi} tone="active" />
          <KV k="mid" v={s.mid ?? '—'} />
          <KV k="probes" v={s.probes} />
          <span className={`font-mono text-[11px] ${s.missed ? 'text-alert' : 'text-done'}`}>
            invariant: {s.missed
              ? 'bracket empty ⇒ not present'
              : s.found != null
                ? `found at ${s.found}`
                : `${s.target} ∈ a[${s.lo}..${s.hi}] if present`}
          </span>
        </>
      }
      drive={
        <>
          <DriveInput value={tval} onChange={(e) => setTval(e.target.value)} inputMode="numeric" aria-label="target" />
          <DriveBtn
            tone="primary"
            onClick={() => {
              const t = parseInt(tval, 10);
              engine.setProgram(searchFrames(arr, Number.isFinite(t) ? t : arr[4]));
            }}
          >
            search
          </DriveBtn>
          <DriveBtn
            onClick={() => {
              const a = sortedArray();
              setArr(a);
              const t = a[Math.floor(Math.random() * a.length)];
              setTval(String(t));
              engine.setProgram(searchFrames(a, t));
            }}
          >
            new array
          </DriveBtn>
        </>
      }
      svg={
        <svg viewBox={`0 0 ${W} 140`} className="mx-auto block w-full max-w-[520px]" role="img" aria-label="binary search animation">
          {s.a.map((v, i) => {
            const inBracket = i >= s.lo && i <= s.hi && !s.missed;
            const isMid = i === s.mid;
            const isFound = i === s.found;
            return (
              <g key={i}>
                <rect
                  x={10 + i * CW}
                  y={40}
                  width={CW - 4}
                  height={36}
                  rx={3}
                  fill={
                    isFound
                      ? 'var(--color-done-wash)'
                      : isMid
                        ? 'var(--color-active-wash)'
                        : inBracket
                          ? 'var(--color-panel)'
                          : 'var(--color-paper)'
                  }
                  stroke={
                    isFound
                      ? 'var(--color-done)'
                      : isMid
                        ? 'var(--color-active)'
                        : inBracket
                          ? 'var(--color-ink)'
                          : 'var(--color-line)'
                  }
                  strokeWidth={isFound || isMid ? 2.2 : inBracket ? 1.3 : 1}
                  opacity={inBracket || isFound ? 1 : 0.45}
                  style={{ transition: 'all .3s' }}
                />
                <text
                  x={10 + i * CW + (CW - 4) / 2}
                  y={62}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight={isMid || isFound ? 700 : 500}
                  fill={inBracket || isFound ? 'var(--color-ink)' : 'var(--color-faint)'}
                >
                  {v}
                </text>
                <text x={10 + i * CW + (CW - 4) / 2} y={32} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">
                  {i}
                </text>
              </g>
            );
          })}
          {/* lo / hi / mid markers */}
          {!s.missed && s.lo <= s.hi && (
            <>
              <g style={{ transition: 'transform .35s', transform: `translateX(${10 + s.lo * CW + (CW - 4) / 2}px)` }}>
                <line x1={0} y1={92} x2={0} y2={80} stroke="var(--color-active)" strokeWidth={1.8} />
                <text x={0} y={104} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={700} fill="var(--color-active)">
                  lo
                </text>
              </g>
              <g style={{ transition: 'transform .35s', transform: `translateX(${10 + s.hi * CW + (CW - 4) / 2}px)` }}>
                <line x1={0} y1={92} x2={0} y2={80} stroke="var(--color-active)" strokeWidth={1.8} />
                <text x={0} y={104} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={700} fill="var(--color-active)">
                  hi
                </text>
              </g>
            </>
          )}
          {s.mid != null && (
            <g style={{ transition: 'transform .35s', transform: `translateX(${10 + s.mid * CW + (CW - 4) / 2}px)` }}>
              <text x={0} y={122} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={700} fill="var(--color-active-deep)">
                ▲ mid
              </text>
            </g>
          )}
          <text x={10} y={16} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--color-muted)">
            target: {s.target} · faded cells are PROVEN not to contain it
          </text>
        </svg>
      }
    />
  );
}
