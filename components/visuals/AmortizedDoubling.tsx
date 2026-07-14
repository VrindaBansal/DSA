'use client';

import React from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn } from './shell';

interface AD {
  size: number;
  cap: number;
  /** per-append cost history (1 = plain write; k+1 = resize-copy of k then write) */
  costs: number[];
  copying: boolean;
  lastCost: number;
}

const CODE = [
  'class DynArray:',
  '    def append(self, x):',
  '        if self.size == self.cap:      # full?',
  '            new = alloc(2 * self.cap)  # DOUBLE',
  '            for i in range(self.size): # copy all',
  '                new[i] = self.buf[i]   #   the O(n) spike',
  '            self.buf = new',
  '            self.cap = 2 * self.cap',
  '        self.buf[self.size] = x        # the O(1) write',
  '        self.size += 1',
];

const fresh = (): AD => ({
  size: 0,
  cap: 2,
  costs: [],
  copying: false,
  lastCost: 0,
});

function pushFrames(from: AD, n: number): Frame<AD>[] {
  const frames: Frame<AD>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  for (let k = 0; k < n; k++) {
    s.copying = false;
    let cost = 1;
    if (s.size === s.cap) {
      emit(s, 2, `append #${s.costs.length + 1}: size==cap==${s.cap} — FULL`);
      s.copying = true;
      cost += s.size;
      emit(
        s,
        4,
        `copy ${s.size} elements into a block of ${s.cap * 2} — this append costs ${cost}`,
      );
      s.cap *= 2;
      s.copying = false;
      emit(s, 7, `capacity is now ${s.cap}`);
    }
    s.size += 1;
    s.lastCost = cost;
    s.costs.push(cost);
    const avg = s.costs.reduce((a, b) => a + b, 0) / s.costs.length;
    emit(
      s,
      8,
      cost === 1
        ? `plain write — cost 1. running average ${avg.toFixed(2)}`
        : `write done — this op cost ${cost}, yet the average is only ${avg.toFixed(2)}`,
    );
  }
  return frames;
}

function demo(): Frame<AD>[] {
  const frames: Frame<AD>[] = [];
  const emit = makeEmitter(frames);
  const s = fresh();
  emit(s, 0, 'capacity 2, empty. Watch each append’s cost — and watch the average line.');
  frames.push(...pushFrames(s, 11));
  return frames;
}

const W = 460;
const CHART_H = 110;
const CHART_Y = 155;

export default function AmortizedDoublingVisual() {
  const engine = useVisualEngine<AD>(demo(), { baseMs: 700 });
  const s = engine.frame.state;

  const avg =
    s.costs.length > 0 ? s.costs.reduce((a, b) => a + b, 0) / s.costs.length : 0;
  const maxCost = Math.max(4, ...s.costs);
  const shown = s.costs.slice(-28);
  const offset = s.costs.length - shown.length;
  const barW = Math.max(4, Math.min(14, (W - 60) / Math.max(shown.length, 1) - 3));
  const cellW = Math.min(26, (W - 20) / s.cap);

  return (
    <VisualShell
      figure="FIG · C2"
      title="Amortized doubling — spikes are loud, the average is flat"
      engine={engine}
      codeTitle="dyn_array.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="size" v={s.size} />
          <KV k="cap" v={s.cap} />
          <KV
            k="last_cost"
            v={s.lastCost || '—'}
            tone={s.lastCost > 1 ? 'alert' : undefined}
          />
          <KV k="total_cost" v={s.costs.reduce((a, b) => a + b, 0)} />
          <KV k="avg" v={avg ? avg.toFixed(2) : '—'} tone="done" />
          <span className="font-mono text-[11px] text-muted">
            claim: avg &lt; 3, forever
          </span>
        </>
      }
      drive={
        <>
          <DriveBtn tone="primary" onClick={() => engine.pushOp(pushFrames(s, 1))}>
            push ×1
          </DriveBtn>
          <DriveBtn onClick={() => engine.pushOp(pushFrames(s, 8))}>
            push ×8
          </DriveBtn>
        </>
      }
      svg={
        <svg
          viewBox={`0 0 ${W} 280`}
          className="mx-auto block w-full max-w-[520px]"
          role="img"
          aria-label="amortized doubling animation"
        >
          <text x={10} y={16} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--color-muted)">
            buf · capacity {s.cap}
          </text>
          {Array.from({ length: s.cap }).map((_, i) => {
            const filled = i < s.size;
            const isNew = i === s.size - 1;
            return (
              <g key={i}>
                <rect
                  x={10 + i * cellW}
                  y={24}
                  width={cellW - 2}
                  height={26}
                  rx={2}
                  fill={
                    s.copying && filled
                      ? 'var(--color-alert-wash)'
                      : isNew
                        ? 'var(--color-active-wash)'
                        : filled
                          ? 'var(--color-panel)'
                          : 'var(--color-paper)'
                  }
                  stroke={
                    s.copying && filled
                      ? 'var(--color-alert)'
                      : isNew
                        ? 'var(--color-active)'
                        : filled
                          ? 'var(--color-ink)'
                          : 'var(--color-line-strong)'
                  }
                  strokeWidth={isNew || (s.copying && filled) ? 1.6 : 1}
                  style={{ transition: 'fill .25s, stroke .25s' }}
                />
                {filled && cellW > 13 && (
                  <text
                    x={10 + i * cellW + (cellW - 2) / 2}
                    y={41}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    fill="var(--color-ink-soft)"
                  >
                    {i}
                  </text>
                )}
              </g>
            );
          })}
          {s.copying && (
            <text x={10} y={68} fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-alert)">
              ⚠ resize: copying {s.size} elements
            </text>
          )}

          <text x={10} y={CHART_Y - 22} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--color-muted)">
            cost per append
          </text>
          <line x1={30} y1={CHART_Y + CHART_H} x2={W - 10} y2={CHART_Y + CHART_H} stroke="var(--color-line-strong)" />
          <line x1={30} y1={CHART_Y - 10} x2={30} y2={CHART_Y + CHART_H} stroke="var(--color-line-strong)" />
          {shown.map((c, i) => {
            const h = (c / maxCost) * CHART_H;
            return (
              <rect
                key={i + offset}
                x={36 + i * (barW + 3)}
                y={CHART_Y + CHART_H - h}
                width={barW}
                height={h}
                fill={c > 1 ? 'var(--color-alert)' : 'var(--color-line-strong)'}
              />
            );
          })}
          {shown.length > 1 && (
            <>
              <polyline
                points={shown
                  .map((_, i) => {
                    const upto = s.costs.slice(0, offset + i + 1);
                    const a = upto.reduce((x, y) => x + y, 0) / upto.length;
                    return `${36 + i * (barW + 3) + barW / 2},${
                      CHART_Y + CHART_H - (a / maxCost) * CHART_H
                    }`;
                  })
                  .join(' ')}
                fill="none"
                stroke="var(--color-done)"
                strokeWidth={2.5}
              />
              <text
                x={W - 12}
                y={CHART_Y + CHART_H - (avg / maxCost) * CHART_H - 7}
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fontSize="10.5"
                fontWeight={700}
                fill="var(--color-done)"
              >
                avg {avg.toFixed(2)} — flat
              </text>
            </>
          )}
        </svg>
      }
    />
  );
}
