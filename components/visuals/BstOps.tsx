'use client';

import React, { useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveInput } from './shell';

interface BST {
  vals: Record<number, number>;
  left: Record<number, number | null>;
  right: Record<number, number | null>;
  root: number | null;
  nextId: number;
  focus: number | null;   // node under consideration (active)
  special: number | null; // successor / spliced child (done)
  note?: string;
}

const CODE = [
  'def insert(t, v):',
  '    if t is None:',
  '        return Node(v)          # new leaf lands here',
  '    if v < t.val:',
  '        t.left  = insert(t.left, v)',
  '    else:',
  '        t.right = insert(t.right, v)',
  '    return t',
  '',
  'def delete(t, v):  # walk to v, then 3 cases',
  '    # case 1 — leaf: unlink it',
  '    # case 2 — one child: splice child up',
  '    # case 3 — two children:',
  '    s = leftmost(t.right)       # in-order successor',
  '    t.val = s.val               # successor value moves up',
  '    delete(s)                   # then remove s (case 1/2)',
];

const empty = (): BST => ({
  vals: {},
  left: {},
  right: {},
  root: null,
  nextId: 0,
  focus: null,
  special: null,
});

const count = (s: BST) => Object.keys(s.vals).length;

function heightOf(s: BST, id: number | null = s.root): number {
  if (id == null) return 0;
  return 1 + Math.max(heightOf(s, s.left[id]), heightOf(s, s.right[id]));
}

/** in-order x position + depth for layout */
function layout(s: BST): Record<number, { x: number; y: number }> {
  const pos: Record<number, { x: number; y: number }> = {};
  let ix = 0;
  const walk = (id: number | null, depth: number) => {
    if (id == null) return;
    walk(s.left[id], depth + 1);
    pos[id] = { x: ix++, y: depth };
    walk(s.right[id], depth + 1);
  };
  walk(s.root, 0);
  return pos;
}

function insertFrames(from: BST, v: number): Frame<BST>[] {
  const frames: Frame<BST>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  s.special = null;
  if (s.root == null) {
    const id = s.nextId++;
    s.vals[id] = v;
    s.left[id] = null;
    s.right[id] = null;
    s.root = id;
    s.focus = id;
    emit(s, 2, `tree empty — ${v} becomes the root`);
    s.focus = null;
    emit(s, 7, `height ${heightOf(s)}`);
    return frames;
  }
  let cur = s.root;
  for (;;) {
    s.focus = cur;
    if (v < s.vals[cur]) {
      emit(s, 3, `${v} < ${s.vals[cur]} — go left`);
      if (s.left[cur] == null) {
        const id = s.nextId++;
        s.vals[id] = v;
        s.left[id] = null;
        s.right[id] = null;
        s.left[cur] = id;
        s.focus = id;
        emit(s, 2, `left slot empty — ${v} attaches here as a leaf`);
        break;
      }
      cur = s.left[cur]!;
    } else {
      emit(s, 5, `${v} ≥ ${s.vals[cur]} — go right`);
      if (s.right[cur] == null) {
        const id = s.nextId++;
        s.vals[id] = v;
        s.left[id] = null;
        s.right[id] = null;
        s.right[cur] = id;
        s.focus = id;
        emit(s, 2, `right slot empty — ${v} attaches here as a leaf`);
        break;
      }
      cur = s.right[cur]!;
    }
  }
  s.focus = null;
  const h = heightOf(s);
  const n = count(s);
  emit(
    s,
    7,
    h === n && n >= 4
      ? `height ${h} of ${n} nodes — every node in a chain. This "tree" is a linked list.`
      : `height ${h}, ⌈log₂(${n}+1)⌉ = ${Math.ceil(Math.log2(n + 1))} would be ideal`,
  );
  return frames;
}

function deleteFrames(from: BST, v: number): Frame<BST>[] {
  const frames: Frame<BST>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  s.special = null;

  // find node + parent
  let cur = s.root;
  let parent: number | null = null;
  while (cur != null && s.vals[cur] !== v) {
    s.focus = cur;
    emit(s, 9, `${v} ${v < s.vals[cur] ? '<' : '≥'} ${s.vals[cur]} — ${v < s.vals[cur] ? 'left' : 'right'}`);
    parent = cur;
    cur = v < s.vals[cur] ? s.left[cur] : s.right[cur];
  }
  if (cur == null) {
    s.focus = null;
    emit(s, 9, `${v} is not in the tree`);
    return frames;
  }
  s.focus = cur;
  emit(s, 9, `found ${v}`);

  const replaceIn = (st: BST, p: number | null, oldId: number, newId: number | null) => {
    if (p == null) st.root = newId;
    else if (st.left[p] === oldId) st.left[p] = newId;
    else st.right[p] = newId;
  };
  const removeNode = (st: BST, id: number) => {
    delete st.vals[id];
    delete st.left[id];
    delete st.right[id];
  };

  const L = s.left[cur];
  const R = s.right[cur];
  if (L == null && R == null) {
    emit(s, 10, `case 1 — ${v} is a leaf: unlink it`);
    replaceIn(s, parent, cur, null);
    removeNode(s, cur);
    s.focus = null;
  } else if (L == null || R == null) {
    const child = (L ?? R)!;
    s.special = child;
    emit(s, 11, `case 2 — one child (${s.vals[child]}): splice it up into ${v}'s place`);
    replaceIn(s, parent, cur, child);
    removeNode(s, cur);
    s.focus = null;
    s.special = null;
  } else {
    emit(s, 12, `case 3 — two children: find in-order successor (leftmost of right subtree)`);
    let sp: number = cur;
    let succ: number = R;
    while (s.left[succ] != null) {
      s.special = succ;
      emit(s, 13, `leftmost… ${s.vals[succ]} has a left child, keep going`);
      sp = succ;
      succ = s.left[succ]!;
    }
    s.special = succ;
    emit(s, 13, `successor is ${s.vals[succ]} — the smallest value bigger than ${v}`);
    s.vals[cur] = s.vals[succ];
    emit(s, 14, `${s.vals[succ]} moves up into the deleted slot — ordering stays valid`);
    const succChild = s.right[succ];
    if (sp === cur) s.right[sp] = succChild;
    else s.left[sp] = succChild;
    removeNode(s, succ);
    s.special = null;
    s.focus = null;
    emit(s, 15, `successor's old node removed (it had at most one child)`);
  }
  emit(s, 7, `height ${heightOf(s)} after delete`);
  return frames;
}

function buildProgram(values: number[], intro: string): Frame<BST>[] {
  const frames: Frame<BST>[] = [];
  const emit = makeEmitter(frames);
  let s = empty();
  emit(s, 0, intro);
  for (const v of values) {
    const f = insertFrames(s, v);
    frames.push(...f);
    s = structuredClone(f[f.length - 1].state);
  }
  return frames;
}

const RANDOM = [50, 30, 70, 20, 40, 60, 80];
const SORTED = [10, 20, 30, 40, 50, 60, 70];

export default function BstOpsVisual() {
  const engine = useVisualEngine<BST>(
    buildProgram(RANDOM, 'inserting 50, 30, 70, 20, 40, 60, 80 — a lucky, balanced order'),
    { baseMs: 750 },
  );
  const [val, setVal] = useState('45');
  const s = engine.frame.state;
  const pos = layout(s);
  const n = count(s);
  const h = heightOf(s);
  const degenerate = h === n && n >= 4;
  const colW = Math.max(1, Object.keys(pos).length);

  const X = (id: number) => 24 + (pos[id].x + 0.5) * (432 / colW);
  const Y = (id: number) => 30 + pos[id].y * 44;

  return (
    <VisualShell
      figure="FIG · T1"
      title="BST insert & delete — and the degeneration that justifies balancing"
      engine={engine}
      codeTitle="bst.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="n" v={n} />
          <KV k="height" v={h} tone={degenerate ? 'alert' : undefined} />
          <KV k="ideal" v={n > 0 ? Math.ceil(Math.log2(n + 1)) : 0} tone="done" />
          {degenerate && (
            <span className="font-mono text-[11px] text-alert">
              height == n: search is O(n) now — this is why AVL/red-black exist
            </span>
          )}
        </>
      }
      drive={
        <>
          <DriveInput value={val} onChange={(e) => setVal(e.target.value)} inputMode="numeric" aria-label="value" />
          <DriveBtn
            tone="primary"
            onClick={() => {
              const x = parseInt(val, 10);
              engine.pushOp(insertFrames(s, Number.isFinite(x) ? x : 45));
              setVal(String(((Number.isFinite(x) ? x : 45) * 17 + 23) % 100));
            }}
          >
            insert
          </DriveBtn>
          <DriveBtn
            onClick={() => {
              const x = parseInt(val, 10);
              if (Number.isFinite(x)) engine.pushOp(deleteFrames(s, x));
            }}
          >
            delete
          </DriveBtn>
          <DriveBtn onClick={() => engine.setProgram(buildProgram(RANDOM, 'balanced-ish insert order'))}>
            random build
          </DriveBtn>
          <DriveBtn
            onClick={() =>
              engine.setProgram(
                buildProgram(SORTED, 'inserting 10..70 IN SORTED ORDER — watch the tree stop being one'),
              )
            }
          >
            sorted build ⚠
          </DriveBtn>
        </>
      }
      svg={
        <svg viewBox="0 0 480 260" className="mx-auto block w-full max-w-[540px]" role="img" aria-label="binary search tree animation">
          {Object.keys(s.vals).map((k) => {
            const id = Number(k);
            return ([s.left[id], s.right[id]] as (number | null)[]).map((c) =>
              c != null && pos[id] && pos[c] ? (
                <line
                  key={`${id}-${c}`}
                  x1={X(id)}
                  y1={Y(id)}
                  x2={X(c)}
                  y2={Y(c)}
                  stroke={degenerate ? 'var(--color-alert)' : 'var(--color-line-strong)'}
                  strokeWidth={1.3}
                />
              ) : null,
            );
          })}
          {Object.keys(s.vals).map((k) => {
            const id = Number(k);
            if (!pos[id]) return null;
            const isFocus = id === s.focus;
            const isSpecial = id === s.special;
            return (
              <g key={id} style={{ transition: 'transform .3s' }}>
                <circle
                  cx={X(id)}
                  cy={Y(id)}
                  r={16}
                  fill={isFocus ? 'var(--color-active-wash)' : isSpecial ? 'var(--color-done-wash)' : 'var(--color-panel)'}
                  stroke={
                    isFocus
                      ? 'var(--color-active)'
                      : isSpecial
                        ? 'var(--color-done)'
                        : degenerate
                          ? 'var(--color-alert)'
                          : 'var(--color-ink)'
                  }
                  strokeWidth={isFocus || isSpecial ? 2.2 : 1.3}
                  style={{ transition: 'fill .25s, stroke .25s, cx .35s, cy .35s' }}
                />
                <text x={X(id)} y={Y(id) + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={600} fill="var(--color-ink)">
                  {s.vals[id]}
                </text>
              </g>
            );
          })}
          {n === 0 && (
            <text x={240} y={120} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-faint)">
              (empty tree)
            </text>
          )}
        </svg>
      }
    />
  );
}
