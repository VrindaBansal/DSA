'use client';

import React from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn } from './shell';

// next[i] = index of node i's successor, or null. Reversal flips these edges
// one at a time; prev/curr/nxt are drawn as labeled arrows because pointer
// bugs are visual bugs (spec §7).

interface LL {
  values: string[];
  next: (number | null)[];
  prev: number | null;
  curr: number | null;
  nxt: number | null;
  head: number | null;
  flipped: number[]; // node indices whose edge now points backwards (done)
  danger: boolean;   // moment where skipping "save next" would lose the tail
}

const CODE = [
  'def reverse(head):',
  '    prev = None',
  '    curr = head',
  '    while curr:',
  '        nxt = curr.next    # save the escape route FIRST',
  '        curr.next = prev   # flip the arrow',
  '        prev = curr        # drag prev forward',
  '        curr = nxt         # step into the saved route',
  '    return prev            # prev ends on the new head',
];

function build(values: string[]): Frame<LL>[] {
  const frames: Frame<LL>[] = [];
  const emit = makeEmitter(frames);
  const n = values.length;
  const s: LL = {
    values,
    next: values.map((_, i) => (i < n - 1 ? i + 1 : null)),
    prev: null,
    curr: null,
    nxt: null,
    head: 0,
    flipped: [],
    danger: false,
  };
  emit(s, 1, 'prev = None — nothing reversed yet');
  s.curr = 0;
  emit(s, 2, `curr = head (${values[0]})`);
  while (s.curr != null) {
    const c: number = s.curr;
    s.nxt = s.next[c];
    emit(
      s,
      4,
      `nxt = ${s.nxt != null ? values[s.nxt] : 'None'} — saved. (Skip this line and the tail is unreachable.)`,
    );
    s.danger = true;
    s.next[c] = s.prev;
    s.flipped = [...s.flipped, c];
    emit(
      s,
      5,
      `${values[c]}.next now points ${s.prev != null ? `back to ${values[s.prev]}` : 'to None — new tail'}`,
    );
    s.danger = false;
    s.prev = c;
    emit(s, 6, `prev = ${values[c]}`);
    s.curr = s.nxt;
    emit(
      s,
      7,
      s.curr != null
        ? `curr = ${values[s.curr]} — the saved route works`
        : 'curr = None — loop ends',
    );
  }
  s.head = s.prev;
  emit(s, 8, `return prev = ${s.prev != null ? values[s.prev] : '?'} — the list is reversed`);
  return frames;
}

const LISTS = [
  ['A', 'B', 'C', 'D'],
  ['A', 'B', 'C', 'D', 'E'],
  ['X', 'Y', 'Z'],
];

const NX = (i: number) => 40 + i * 78;
const NY = 66;

export default function LinkedReversalVisual() {
  const engine = useVisualEngine<LL>(build(LISTS[0]), { baseMs: 850 });
  const s = engine.frame.state;
  const W = Math.max(360, 60 + s.values.length * 78);

  const ptrMarker = (i: number | null, label: string, color: string, row: number) => {
    if (i == null)
      return (
        <text
          key={label}
          x={12}
          y={NY + 62 + row * 16}
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill={color}
        >
          {label}=None
        </text>
      );
    return (
      <g
        key={label}
        style={{
          transition: 'transform .35s ease',
          transform: `translate(${NX(i)}px, 0px)`,
        }}
      >
        <line x1={0} y1={NY + 58 + row * 17} x2={0} y2={NY + 30} stroke={color} strokeWidth={1.8} markerEnd={`url(#lr-arr-${label})`} />
        <text x={0} y={NY + 70 + row * 17} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fontWeight={700} fill={color}>
          {label}
        </text>
      </g>
    );
  };

  return (
    <VisualShell
      figure="FIG · L4"
      title="Linked-list reversal — three pointers, zero lost tails"
      engine={engine}
      codeTitle="reverse.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="prev" v={s.prev != null ? s.values[s.prev] : 'None'} tone="done" />
          <KV k="curr" v={s.curr != null ? s.values[s.curr] : 'None'} tone="active" />
          <KV k="next" v={s.nxt != null ? s.values[s.nxt] : 'None'} />
          <KV k="flipped" v={`${s.flipped.length}/${s.values.length}`} />
          {s.danger && (
            <span className="font-mono text-[11px] text-alert">
              ← without the saved nxt, everything right of curr would be orphaned
            </span>
          )}
        </>
      }
      drive={
        <>
          {LISTS.map((l) => (
            <DriveBtn key={l.join('')} onClick={() => engine.setProgram(build(l))}>
              {l.length} nodes
            </DriveBtn>
          ))}
        </>
      }
      svg={
        <svg
          viewBox={`0 0 ${W} 190`}
          className="mx-auto block w-full max-w-[520px]"
          role="img"
          aria-label="linked list reversal animation"
        >
          <defs>
            {(['prev', 'curr', 'next'] as const).map((l) => (
              <marker key={l} id={`lr-arr-${l}`} markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
                <path
                  d="M0,0 L7,3.5 L0,7 z"
                  fill={
                    l === 'prev'
                      ? 'var(--color-done)'
                      : l === 'curr'
                        ? 'var(--color-active)'
                        : 'var(--color-ink-soft)'
                  }
                />
              </marker>
            ))}
            <marker id="lr-edge" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--color-ink-soft)" />
            </marker>
            <marker id="lr-edge-flip" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--color-done)" />
            </marker>
          </defs>

          {/* edges */}
          {s.next.map((to, from) => {
            if (to == null) return null;
            const isFlipped = s.flipped.includes(from);
            const x1 = NX(from);
            const x2 = NX(to);
            const backwards = x2 < x1;
            return (
              <path
                key={`${from}-${to}`}
                d={
                  backwards
                    ? `M ${x1 - 8} ${NY - 20} C ${x1 - 30} ${NY - 48}, ${x2 + 30} ${NY - 48}, ${x2 + 10} ${NY - 22}`
                    : `M ${x1 + 22} ${NY} L ${x2 - 26} ${NY}`
                }
                fill="none"
                stroke={isFlipped ? 'var(--color-done)' : 'var(--color-ink-soft)'}
                strokeWidth={1.8}
                markerEnd={isFlipped ? 'url(#lr-edge-flip)' : 'url(#lr-edge)'}
              />
            );
          })}
          {/* None terminator for flipped tail */}
          {s.flipped.length > 0 && (
            <text x={NX(s.flipped[0]) - 2} y={NY - 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-faint)">
              ∅
            </text>
          )}

          {/* nodes */}
          {s.values.map((v, i) => {
            const isCurr = i === s.curr;
            const isDone = s.flipped.includes(i) && !isCurr;
            return (
              <g key={i}>
                <circle
                  cx={NX(i)}
                  cy={NY}
                  r={20}
                  fill={isCurr ? 'var(--color-active-wash)' : isDone ? 'var(--color-done-wash)' : 'var(--color-panel)'}
                  stroke={isCurr ? 'var(--color-active)' : isDone ? 'var(--color-done)' : 'var(--color-ink)'}
                  strokeWidth={isCurr ? 2.2 : 1.4}
                  style={{ transition: 'fill .3s, stroke .3s' }}
                />
                <text x={NX(i)} y={NY + 4.5} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fontWeight={600} fill="var(--color-ink)">
                  {v}
                </text>
              </g>
            );
          })}

          {/* the three pointers */}
          {ptrMarker(s.prev, 'prev', 'var(--color-done)', 0)}
          {ptrMarker(s.curr, 'curr', 'var(--color-active)', 1)}
          {ptrMarker(s.nxt, 'next', 'var(--color-ink-soft)', 2)}
        </svg>
      }
    />
  );
}
