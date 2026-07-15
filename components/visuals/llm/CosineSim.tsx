'use client';

import React from 'react';
import { useVisualEngine, makeEmitter, type Frame } from '../engine';
import { VisualShell, CodePane, KV, DriveSelect, DriveLabel } from '../shell';

// Cosine similarity as the angle between two 2-D "embedding" vectors. The point:
// direction encodes meaning; magnitude cancels out.

interface CS {
  query: string;
  candidate: string;
  qv: [number, number];
  cv: [number, number];
  cos: number;
  angle: number;
}

const CODE = [
  'def cosine(a, b):',
  '    dot   = sum(x*y for x, y in zip(a, b))',
  '    na    = sqrt(sum(x*x for x in a))',
  '    nb    = sqrt(sum(x*x for x in b))',
  '    return dot / (na * nb)   # ignores magnitude',
];

// toy 2-D "embeddings": [semantic-x, semantic-y]
const VECS: Record<string, [number, number]> = {
  cat: [0.9, 0.4],
  kitten: [0.85, 0.5],
  dog: [0.8, 0.55],
  car: [-0.3, 0.95],
  truck: [-0.35, 0.9],
  democracy: [-0.9, -0.4],
};

const cosineOf = (a: [number, number], b: [number, number]) => {
  const dot = a[0] * b[0] + a[1] * b[1];
  const na = Math.hypot(a[0], a[1]);
  const nb = Math.hypot(b[0], b[1]);
  return dot / (na * nb);
};

function frameFor(query: string, candidate: string): Frame<CS>[] {
  const frames: Frame<CS>[] = [];
  const emit = makeEmitter(frames);
  const qv = VECS[query];
  const cv = VECS[candidate];
  const cos = cosineOf(qv, cv);
  const angle = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
  const s: CS = { query, candidate, qv, cv, cos, angle };
  emit(s, 1, `dot product of "${query}" and "${candidate}"`);
  emit(s, 4, `cosine = ${cos.toFixed(3)} → ${angle.toFixed(0)}° apart · ${cos > 0.9 ? 'very similar' : cos > 0.5 ? 'related' : cos > 0 ? 'weakly related' : 'unrelated/opposite'}`);
  return frames;
}

const CX = 150;
const CY = 150;
const R = 120;

export default function CosineSimVisual() {
  const [query, setQuery] = React.useState('cat');
  const [candidate, setCandidate] = React.useState('kitten');
  const engine = useVisualEngine<CS>(frameFor('cat', 'kitten'), { baseMs: 900 });
  const s = engine.frame.state;

  const pt = (v: [number, number]) => ({ x: CX + v[0] * R, y: CY - v[1] * R });
  const q = pt(s.qv);
  const c = pt(s.cv);

  const opts = Object.keys(VECS).map((k) => ({ value: k, label: k }));

  const rank = Object.keys(VECS)
    .filter((w) => w !== s.query)
    .map((w) => ({ w, cos: cosineOf(s.qv, VECS[w]) }))
    .sort((a, b) => b.cos - a.cos);

  return (
    <VisualShell
      figure="FIG · L2"
      title="Cosine similarity — meaning is direction, not length"
      engine={engine}
      codeTitle="cosine.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="cos" v={s.cos.toFixed(3)} tone={s.cos > 0.6 ? 'done' : s.cos < 0 ? 'alert' : 'active'} />
          <KV k="angle" v={`${s.angle.toFixed(0)}°`} />
          <span className="font-mono text-[11px] text-muted">
            nearest to "{s.query}": {rank.slice(0, 3).map((r) => `${r.w} ${r.cos.toFixed(2)}`).join(' · ')}
          </span>
        </>
      }
      drive={
        <>
          <DriveLabel>query</DriveLabel>
          <DriveSelect
            value={query}
            onChange={(v) => {
              setQuery(v);
              engine.setProgram(frameFor(v, candidate));
            }}
            options={opts}
          />
          <DriveLabel>vs</DriveLabel>
          <DriveSelect
            value={candidate}
            onChange={(v) => {
              setCandidate(v);
              engine.setProgram(frameFor(query, v));
            }}
            options={opts}
          />
        </>
      }
      svg={
        <svg viewBox="0 0 300 300" className="mx-auto block w-full max-w-[360px]" role="img" aria-label="cosine similarity animation">
          {/* axes */}
          <line x1={CX - R - 10} y1={CY} x2={CX + R + 10} y2={CY} stroke="var(--color-line)" />
          <line x1={CX} y1={CY - R - 10} x2={CX} y2={CY + R + 10} stroke="var(--color-line)" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-line)" strokeDasharray="2 3" />

          {/* angle wedge */}
          <path
            d={`M ${CX} ${CY} L ${q.x} ${q.y} A ${R} ${R} 0 0 ${s.qv[0] * s.cv[1] - s.qv[1] * s.cv[0] > 0 ? 0 : 1} ${c.x} ${c.y} Z`}
            fill="var(--color-active-wash)"
            opacity={0.5}
          />

          {/* query vector */}
          <line x1={CX} y1={CY} x2={q.x} y2={q.y} stroke="var(--color-active)" strokeWidth={2.5} markerEnd="url(#cs-arr-q)" />
          <text x={q.x} y={q.y - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={700} fill="var(--color-active-deep)">
            {s.query}
          </text>

          {/* candidate vector */}
          <line x1={CX} y1={CY} x2={c.x} y2={c.y} stroke="var(--color-done)" strokeWidth={2.5} markerEnd="url(#cs-arr-c)" />
          <text x={c.x} y={c.y - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={700} fill="var(--color-done)">
            {s.candidate}
          </text>

          <text x={CX} y={CY + R + 24} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-muted)">
            small angle = high cosine = similar meaning
          </text>

          <defs>
            <marker id="cs-arr-q" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--color-active)" />
            </marker>
            <marker id="cs-arr-c" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--color-done)" />
            </marker>
          </defs>
        </svg>
      }
    />
  );
}
