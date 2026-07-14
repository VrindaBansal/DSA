'use client';

import React, { useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveInput } from './shell';

// Min-heap: tree AND backing array, side by side — the duality is the lesson.

interface HP {
  h: number[];
  i: number | null;        // node being sifted
  cmp: number | null;      // node being compared against
  swapped: [number, number] | null;
  formula: string;         // live index math, e.g. "children of 1: 2·1+1=3, 2·1+2=4"
}

const CODE = [
  'def sift_up(h, i):',
  '    while i > 0:',
  '        parent = (i - 1) // 2',
  '        if h[i] >= h[parent]:',
  '            break              # invariant holds',
  '        h[i], h[parent] = h[parent], h[i]',
  '        i = parent',
  '',
  'def sift_down(h, i, n):',
  '    while True:',
  '        l, r = 2*i + 1, 2*i + 2',
  '        small = i',
  '        if l < n and h[l] < h[small]: small = l',
  '        if r < n and h[r] < h[small]: small = r',
  '        if small == i:',
  '            break              # both children ≥ me',
  '        h[i], h[small] = h[small], h[i]',
  '        i = small',
];

function insertFrames(from: HP, x: number): Frame<HP>[] {
  const frames: Frame<HP>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  if (s.h.length >= 15) {
    emit(s, 0, 'heap full for this demo (15 slots) — extract something first');
    return frames;
  }
  s.h.push(x);
  let i = s.h.length - 1;
  s.i = i;
  s.cmp = null;
  s.swapped = null;
  s.formula = `appended at index ${i}`;
  emit(s, 0, `insert(${x}): append at index ${i} — last array slot = next free leaf`);
  while (i > 0) {
    const p = (i - 1) >> 1;
    s.cmp = p;
    s.formula = `parent of ${i}: (${i}−1)//2 = ${p}`;
    emit(s, 2, `parent of index ${i} is (${i}−1)//2 = ${p}: compare ${s.h[i]} vs ${s.h[p]}`);
    if (s.h[i] >= s.h[p]) {
      emit(s, 4, `${s.h[i]} ≥ ${s.h[p]} — invariant holds, stop`);
      break;
    }
    [s.h[i], s.h[p]] = [s.h[p], s.h[i]];
    s.swapped = [i, p];
    emit(s, 5, `${s.h[p]} < ${s.h[i]} — swap up (same swap in tree and array)`);
    s.swapped = null;
    i = p;
    s.i = i;
    emit(s, 6, `continue from index ${i}`);
  }
  s.i = null;
  s.cmp = null;
  s.formula = '';
  emit(s, 4, `done — h[0]=${s.h[0]} is the minimum, as always`);
  return frames;
}

function extractFrames(from: HP): Frame<HP>[] {
  const frames: Frame<HP>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  if (s.h.length === 0) {
    emit(s, 8, 'heap empty');
    return frames;
  }
  const min = s.h[0];
  s.i = 0;
  s.formula = '';
  emit(s, 8, `extract_min: root h[0]=${min} leaves; last element ${s.h[s.h.length - 1]} moves to the root`);
  const last = s.h.pop()!;
  if (s.h.length > 0) s.h[0] = last;
  let i = 0;
  s.i = 0;
  emit(s, 9, `now sift ${last} down from the root`);
  const n = s.h.length;
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    s.formula = `children of ${i}: 2·${i}+1=${l}, 2·${i}+2=${r}`;
    let small = i;
    s.cmp = l < n ? l : null;
    emit(s, 10, `children of ${i} live at ${l} and ${r} — the index math IS the tree`);
    if (l < n && s.h[l] < s.h[small]) small = l;
    if (r < n && s.h[r] < s.h[small]) small = r;
    if (small === i) {
      s.cmp = null;
      emit(s, 15, `both children ≥ ${s.h[i]} — heap property restored`);
      break;
    }
    s.cmp = small;
    emit(s, small === l ? 12 : 13, `smaller child is h[${small}]=${s.h[small]}`);
    [s.h[i], s.h[small]] = [s.h[small], s.h[i]];
    s.swapped = [i, small];
    emit(s, 16, `swap ${s.h[small]} ↔ ${s.h[i]}`);
    s.swapped = null;
    i = small;
    s.i = i;
    emit(s, 17, `continue from index ${i}`);
  }
  s.i = null;
  s.cmp = null;
  s.formula = '';
  emit(s, 15, `extracted ${min}; new min is h[0]=${s.h[0] ?? '—'}`);
  return frames;
}

function demo(): Frame<HP>[] {
  const frames: Frame<HP>[] = [];
  let s: HP = { h: [], i: null, cmp: null, swapped: null, formula: '' };
  const run = (f: Frame<HP>[]) => {
    frames.push(...f);
    s = structuredClone(f[f.length - 1].state);
  };
  for (const v of [42, 17, 8, 29, 3]) run(insertFrames(s, v));
  run(extractFrames(s));
  return frames;
}

const TW = 300;
const treePos = (i: number) => {
  const d = Math.floor(Math.log2(i + 1));
  const p = i - (2 ** d - 1);
  return { x: (TW * (p + 0.5)) / 2 ** d, y: 26 + d * 50 };
};

export default function HeapSiftVisual() {
  const engine = useVisualEngine<HP>(demo(), { baseMs: 800 });
  const [val, setVal] = useState('11');
  const s = engine.frame.state;
  const cellW = 30;

  const nodeTone = (i: number) => {
    if (s.swapped && (s.swapped[0] === i || s.swapped[1] === i))
      return { fill: 'var(--color-done-wash)', stroke: 'var(--color-done)', w: 2.2 };
    if (i === s.i) return { fill: 'var(--color-active-wash)', stroke: 'var(--color-active)', w: 2.2 };
    if (i === s.cmp) return { fill: 'var(--color-paper)', stroke: 'var(--color-active)', w: 1.6 };
    return { fill: 'var(--color-panel)', stroke: 'var(--color-ink)', w: 1.2 };
  };

  return (
    <VisualShell
      figure="FIG · P1"
      title="Heap sift — one structure, two views, same swaps"
      engine={engine}
      codeTitle="heap.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <span className="font-mono text-[11.5px] text-muted">
            h=[
            {s.h.map((v, i) => (
              <span key={i} className={i === s.i ? 'font-bold text-active-deep' : i === s.cmp ? 'text-active' : 'text-ink'}>
                {v}
                {i < s.h.length - 1 ? ' ' : ''}
              </span>
            ))}
            ]
          </span>
          <KV k="n" v={s.h.length} />
          {s.formula && <KV k="index_math" v={s.formula} tone="active" />}
        </>
      }
      drive={
        <>
          <DriveInput value={val} onChange={(e) => setVal(e.target.value)} inputMode="numeric" aria-label="value to insert" />
          <DriveBtn
            tone="primary"
            onClick={() => {
              const x = parseInt(val, 10);
              engine.pushOp(insertFrames(s, Number.isFinite(x) ? x : 11));
              setVal(String(((Number.isFinite(x) ? x : 11) * 13 + 5) % 90));
            }}
          >
            insert
          </DriveBtn>
          <DriveBtn onClick={() => engine.pushOp(extractFrames(s))}>extract-min</DriveBtn>
        </>
      }
      svg={
        <svg viewBox="0 0 480 270" className="mx-auto block w-full max-w-[540px]" role="img" aria-label="heap sift animation">
          {/* tree edges */}
          {s.h.map((_, i) => {
            if (i === 0) return null;
            const p = (i - 1) >> 1;
            const a = treePos(i);
            const b = treePos(p);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--color-line-strong)" strokeWidth={1.2} />;
          })}
          {/* tree nodes */}
          {s.h.map((v, i) => {
            const p = treePos(i);
            const t = nodeTone(i);
            return (
              <g key={i} style={{ transition: 'transform .3s' }}>
                <circle cx={p.x} cy={p.y} r={17} fill={t.fill} stroke={t.stroke} strokeWidth={t.w} style={{ transition: 'fill .25s, stroke .25s' }} />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11.5" fontWeight={600} fill="var(--color-ink)">
                  {v}
                </text>
                <text x={p.x + 21} y={p.y - 10} fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">
                  {i}
                </text>
              </g>
            );
          })}

          {/* backing array */}
          <text x={330} y={20} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--color-muted)">
            same bytes, flat:
          </text>
          {s.h.map((v, i) => {
            const t = nodeTone(i);
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 330 + col * (cellW + 4);
            const y = 32 + row * (cellW + 16);
            return (
              <g key={i}>
                <rect x={x} y={y} width={cellW} height={cellW} rx={3} fill={t.fill} stroke={t.stroke} strokeWidth={t.w} style={{ transition: 'fill .25s, stroke .25s' }} />
                <text x={x + cellW / 2} y={y + cellW / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fontWeight={600} fill="var(--color-ink)">
                  {v}
                </text>
                <text x={x + cellW / 2} y={y + cellW + 10} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-faint)">
                  {i}
                </text>
              </g>
            );
          })}
        </svg>
      }
    />
  );
}
