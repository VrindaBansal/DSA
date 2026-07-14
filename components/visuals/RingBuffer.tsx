'use client';

import React, { useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveInput } from './shell';

const CAP = 8;

interface RB {
  buf: (number | null)[];
  head: number;
  tail: number;
  count: number;
  /** slot currently being written/read */
  focus: number | null;
  error: 'Full' | 'Empty' | null;
}

const CODE = [
  'class RingBuffer:',
  '    def __init__(self, k):',
  '        self.buf  = [None] * k',
  '        self.head = 0   # next to dequeue',
  '        self.tail = 0   # next free slot',
  '        self.count = 0  # full-vs-empty sentinel',
  '',
  '    def enqueue(self, x):',
  '        if self.count == len(self.buf):',
  '            raise Full  # head == tail here too!',
  '        self.buf[self.tail] = x',
  '        self.tail = (self.tail + 1) % len(self.buf)',
  '        self.count += 1',
  '',
  '    def dequeue(self):',
  '        if self.count == 0:',
  '            raise Empty  # ...and head == tail here',
  '        x = self.buf[self.head]',
  '        self.buf[self.head] = None',
  '        self.head = (self.head + 1) % len(self.buf)',
  '        self.count -= 1',
  '        return x',
];

const fresh = (): RB => ({
  buf: Array(CAP).fill(null),
  head: 0,
  tail: 0,
  count: 0,
  focus: null,
  error: null,
});

function enqueueFrames(from: RB, x: number): Frame<RB>[] {
  const frames: Frame<RB>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  s.error = null;
  s.focus = null;
  emit(s, 7, `enqueue(${x})`);
  emit(s, 8, `count=${s.count}, capacity=${CAP} — full?`);
  if (s.count === CAP) {
    s.error = 'Full';
    emit(s, 9, `raise Full — head==tail, but count=${CAP} disambiguates: FULL`);
    return frames;
  }
  s.buf[s.tail] = x;
  s.focus = s.tail;
  emit(s, 10, `buf[${s.tail}] ← ${x}`);
  const old = s.tail;
  s.tail = (s.tail + 1) % CAP;
  emit(
    s,
    11,
    `tail = (${old}+1) % ${CAP} = ${s.tail}${old === CAP - 1 ? '  — tail WRAPS around' : ''}`,
  );
  s.count += 1;
  s.focus = null;
  emit(
    s,
    12,
    s.head === s.tail
      ? `count=${s.count} — head==tail again, but count says FULL`
      : `count=${s.count}`,
  );
  return frames;
}

function dequeueFrames(from: RB): Frame<RB>[] {
  const frames: Frame<RB>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  s.error = null;
  s.focus = null;
  emit(s, 14, 'dequeue()');
  emit(s, 15, `count=${s.count} — empty?`);
  if (s.count === 0) {
    s.error = 'Empty';
    emit(s, 16, `raise Empty — head==tail, and count=0 disambiguates: EMPTY`);
    return frames;
  }
  const x = s.buf[s.head]!;
  s.focus = s.head;
  emit(s, 17, `x = buf[${s.head}] = ${x}`);
  s.buf[s.head] = null;
  emit(s, 18, `buf[${s.head}] ← None`);
  const old = s.head;
  s.head = (s.head + 1) % CAP;
  emit(
    s,
    19,
    `head = (${old}+1) % ${CAP} = ${s.head}${old === CAP - 1 ? '  — head WRAPS around' : ''}`,
  );
  s.count -= 1;
  s.focus = null;
  emit(
    s,
    20,
    s.head === s.tail
      ? `count=${s.count} — head==tail again, but count says EMPTY`
      : `count=${s.count}`,
  );
  return frames;
}

function demo(): Frame<RB>[] {
  const frames: Frame<RB>[] = [];
  const emit = makeEmitter(frames);
  let s = fresh();
  emit(
    s,
    5,
    `capacity ${CAP}, empty. head==tail==0 — is that empty or full? count=0 answers.`,
  );
  const run = (f: Frame<RB>[]) => {
    frames.push(...f);
    s = structuredClone(f[f.length - 1].state);
  };
  for (const v of [12, 47, 9]) run(enqueueFrames(s, v));
  run(dequeueFrames(s));
  for (const v of [31, 8, 24, 51, 16, 60]) run(enqueueFrames(s, v));
  run(enqueueFrames(s, 99)); // Full
  run(dequeueFrames(s));
  run(dequeueFrames(s));
  return frames;
}

const CX = 160;
const CY = 148;
const R = 96;

const slotPos = (i: number) => {
  const a = (-90 + i * (360 / CAP)) * (Math.PI / 180);
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), deg: -90 + i * (360 / CAP) };
};

export default function RingBufferVisual() {
  const engine = useVisualEngine<RB>(demo());
  const [val, setVal] = useState('7');
  const s = engine.frame.state;

  const doEnqueue = () => {
    const x = parseInt(val, 10);
    engine.pushOp(enqueueFrames(s, Number.isFinite(x) ? x : 7));
    setVal(String(((Number.isFinite(x) ? x : 7) * 7 + 11) % 100));
  };

  const overlap = s.head === s.tail;

  return (
    <VisualShell
      figure="FIG · Q1"
      title="Ring buffer — head and tail wrap; count breaks the tie"
      engine={engine}
      codeTitle="ring_buffer.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <span className="font-mono text-[11.5px] text-muted">
            buf=[
            {s.buf.map((v, i) => (
              <span key={i}>
                <span
                  className={
                    i === s.focus
                      ? 'font-semibold text-active-deep'
                      : v == null
                        ? 'text-faint'
                        : 'text-ink'
                  }
                >
                  {v == null ? '·' : v}
                </span>
                {i < CAP - 1 ? ' ' : ''}
              </span>
            ))}
            ]
          </span>
          <KV k="head" v={s.head} />
          <KV k="tail" v={s.tail} />
          <KV k="count" v={s.count} tone="active" />
          {s.error && <KV k="raised" v={s.error} tone="alert" />}
          {overlap && !s.error && (
            <span className="font-mono text-[11px] text-alert">
              head==tail → count={s.count} ⇒ {s.count === 0 ? 'EMPTY' : 'FULL'}
            </span>
          )}
        </>
      }
      drive={
        <>
          <DriveInput
            value={val}
            onChange={(e) => setVal(e.target.value)}
            inputMode="numeric"
            aria-label="value to enqueue"
          />
          <DriveBtn tone="primary" onClick={doEnqueue}>
            enqueue
          </DriveBtn>
          <DriveBtn onClick={() => engine.pushOp(dequeueFrames(s))}>
            dequeue
          </DriveBtn>
        </>
      }
      svg={
        <svg
          viewBox="0 0 320 300"
          className="mx-auto block w-full max-w-[380px]"
          role="img"
          aria-label="ring buffer animation"
        >
          {/* guide ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-line)" />

          {/* slots */}
          {s.buf.map((v, i) => {
            const p = slotPos(i);
            const isFocus = i === s.focus;
            const occupied = v != null;
            return (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={22}
                  fill={
                    isFocus
                      ? 'var(--color-active-wash)'
                      : occupied
                        ? 'var(--color-panel)'
                        : 'var(--color-paper)'
                  }
                  stroke={
                    isFocus
                      ? 'var(--color-active)'
                      : occupied
                        ? 'var(--color-ink)'
                        : 'var(--color-line-strong)'
                  }
                  strokeWidth={isFocus ? 2 : 1.25}
                  style={{ transition: 'fill .3s, stroke .3s' }}
                />
                <text
                  x={p.x}
                  y={p.y + 4.5}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="13"
                  fontWeight={600}
                  fill={occupied ? 'var(--color-ink)' : 'var(--color-faint)'}
                >
                  {v == null ? '·' : v}
                </text>
                {/* index label */}
                <text
                  x={CX + (R + 38) * Math.cos((p.deg * Math.PI) / 180)}
                  y={CY + (R + 38) * Math.sin((p.deg * Math.PI) / 180) + 3}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                  fill="var(--color-faint)"
                >
                  {i}
                </text>
              </g>
            );
          })}

          {/* head pointer (outside) */}
          <g
            style={{
              transition: 'transform .4s ease',
              transform: `rotate(${slotPos(s.head).deg + 90}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          >
            <line
              x1={CX}
              y1={CY - R - 52}
              x2={CX}
              y2={CY - R - 28}
              stroke="var(--color-done)"
              strokeWidth={2}
              markerEnd="url(#rb-arrow-head)"
            />
            <text
              x={CX}
              y={CY - R - 58}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10.5"
              fontWeight={600}
              fill="var(--color-done)"
            >
              head
            </text>
          </g>

          {/* tail pointer (inside) */}
          <g
            style={{
              transition: 'transform .4s ease',
              transform: `rotate(${slotPos(s.tail).deg + 90}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          >
            <line
              x1={CX}
              y1={CY - R + 52}
              x2={CX}
              y2={CY - R + 28}
              stroke="var(--color-active)"
              strokeWidth={2}
              markerEnd="url(#rb-arrow-tail)"
            />
            <text
              x={CX}
              y={CY - R + 66}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10.5"
              fontWeight={600}
              fill="var(--color-active)"
            >
              tail
            </text>
          </g>

          <defs>
            <marker
              id="rb-arrow-head"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="var(--color-done)" />
            </marker>
            <marker
              id="rb-arrow-tail"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="var(--color-active)" />
            </marker>
          </defs>

          {/* full/empty ambiguity callout */}
          {overlap && (
            <text
              x={CX}
              y={CY + 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill={s.error ? 'var(--color-alert)' : 'var(--color-muted)'}
            >
              head==tail
            </text>
          )}
        </svg>
      }
    />
  );
}
