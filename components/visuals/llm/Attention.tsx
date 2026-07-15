'use client';

import React from 'react';
import { useVisualEngine, makeEmitter, type Frame } from '../engine';
import { VisualShell, CodePane, KV } from '../shell';

// Self-attention as a weight matrix: each token (query) takes a weighted average
// of all tokens (keys). The punchline: "it" attends back to "cat".

const TOKENS = ['the', 'cat', 'sat', 'because', 'it', 'was', 'tired'];

// hand-authored, plausible attention weights (rows = query, cols = key),
// each row roughly sums to 1. Causal: a token attends to itself + earlier.
const W: number[][] = [
  [1.0, 0, 0, 0, 0, 0, 0],
  [0.3, 0.7, 0, 0, 0, 0, 0],
  [0.1, 0.5, 0.4, 0, 0, 0, 0],
  [0.1, 0.2, 0.3, 0.4, 0, 0, 0],
  [0.05, 0.62, 0.08, 0.05, 0.2, 0, 0], // "it" -> "cat"
  [0.05, 0.15, 0.25, 0.05, 0.3, 0.2, 0],
  [0.05, 0.2, 0.1, 0.05, 0.15, 0.15, 0.3],
];

interface AT {
  q: number; // current query row (-1 = none)
}

const CODE = [
  'scores = Q @ K.T / sqrt(d)   # token↔token',
  'weights = softmax(scores)    # rows sum to 1',
  'out = weights @ V            # weighted avg of values',
  '#   → each token becomes a blend of the',
  '#     tokens it attends to most',
];

function demo(): Frame<AT>[] {
  const frames: Frame<AT>[] = [];
  const emit = makeEmitter(frames);
  emit({ q: -1 }, 0, 'attention: every token (row) weighs every token (column)');
  for (let i = 0; i < TOKENS.length; i++) {
    const top = W[i].map((w, j) => [w, j] as [number, number]).sort((a, b) => b[0] - a[0])[0];
    const note =
      TOKENS[i] === 'it'
        ? `"it" attends most to "${TOKENS[top[1]]}" (${(top[0] * 100).toFixed(0)}%) — coreference, learned`
        : `"${TOKENS[i]}" attends most to "${TOKENS[top[1]]}" (${(top[0] * 100).toFixed(0)}%)`;
    emit({ q: i }, 1, note);
  }
  emit({ q: -1 }, 2, 'each output token is the weighted blend of what it attended to');
  return frames;
}

const CELL = 30;
const OX = 62;
const OY = 30;

export default function AttentionVisual() {
  const engine = useVisualEngine<AT>(demo(), { baseMs: 950 });
  const q = engine.frame.state.q;

  return (
    <VisualShell
      figure="FIG · L3"
      title="Self-attention — who looks at whom (and why context is n²)"
      engine={engine}
      codeTitle="attention"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          {q >= 0 ? (
            <>
              <KV k="query" v={`"${TOKENS[q]}"`} tone="active" />
              <span className="font-mono text-[11px] text-muted">
                row weights:{' '}
                {W[q].map((w, j) => (w > 0.01 ? `${TOKENS[j]} ${(w * 100).toFixed(0)}%` : null)).filter(Boolean).join(' · ')}
              </span>
            </>
          ) : (
            <span className="font-mono text-[11px] text-muted">
              {TOKENS.length}×{TOKENS.length} weights — cost grows with n²
            </span>
          )}
        </>
      }
      svg={
        <svg
          viewBox={`0 0 ${OX + TOKENS.length * CELL + 20} ${OY + TOKENS.length * CELL + 30}`}
          className="mx-auto block w-full max-w-[420px]"
          role="img"
          aria-label="attention weight matrix"
        >
          {/* column labels (keys) */}
          {TOKENS.map((t, j) => (
            <text
              key={j}
              x={OX + j * CELL + CELL / 2}
              y={OY - 8}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              fill="var(--color-muted)"
              transform={`rotate(-40 ${OX + j * CELL + CELL / 2} ${OY - 8})`}
            >
              {t}
            </text>
          ))}
          {/* rows */}
          {TOKENS.map((t, i) => (
            <g key={i}>
              <text
                x={OX - 6}
                y={OY + i * CELL + CELL / 2 + 3}
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fontSize="9.5"
                fontWeight={i === q ? 700 : 400}
                fill={i === q ? 'var(--color-active-deep)' : 'var(--color-muted)'}
              >
                {t}
              </text>
              {W[i].map((w, j) => {
                const active = i === q;
                const shown = q < 0 || i === q;
                return (
                  <g key={j}>
                    <rect
                      x={OX + j * CELL}
                      y={OY + i * CELL}
                      width={CELL - 2}
                      height={CELL - 2}
                      rx={2}
                      fill={
                        w === 0
                          ? 'var(--color-paper)'
                          : active
                            ? `color-mix(in srgb, var(--color-active) ${Math.round(w * 100)}%, white)`
                            : `color-mix(in srgb, var(--color-line-strong) ${Math.round(w * 90)}%, white)`
                      }
                      stroke={active ? 'var(--color-active)' : 'var(--color-line)'}
                      strokeWidth={active ? 1.4 : 0.8}
                      opacity={shown ? 1 : 0.35}
                      style={{ transition: 'opacity .2s, fill .2s' }}
                    />
                    {active && w >= 0.15 && (
                      <text
                        x={OX + j * CELL + (CELL - 2) / 2}
                        y={OY + i * CELL + (CELL - 2) / 2 + 3}
                        textAnchor="middle"
                        fontFamily="var(--font-mono)"
                        fontSize="8"
                        fontWeight={600}
                        fill={w > 0.5 ? 'white' : 'var(--color-ink)'}
                      >
                        {(w * 100).toFixed(0)}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      }
    />
  );
}
