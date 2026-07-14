'use client';

import React, { useState } from 'react';
import { useVisualEngine, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveSelect, DriveLabel } from './shell';

// The same five lines run twice — only the frontier container differs.
// Watching the two frontiers diverge on the same graph IS the lesson (§7).

const ADJ: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B', 'G'],
  E: ['B', 'G'],
  F: ['C', 'H'],
  G: ['D', 'E', 'H'],
  H: ['F', 'G'],
};

const POS: Record<string, { x: number; y: number }> = {
  A: { x: 110, y: 26 },
  B: { x: 55, y: 78 },
  C: { x: 165, y: 78 },
  D: { x: 25, y: 132 },
  E: { x: 95, y: 132 },
  F: { x: 165, y: 132 },
  G: { x: 60, y: 186 },
  H: { x: 160, y: 186 },
};

const CODE = [
  'def traverse(g, start, frontier):',
  '    frontier.add(start)',
  '    seen = {start}',
  '    while frontier:',
  '        v = frontier.take()   # queue: popleft — oldest',
  '                              # stack: pop     — newest',
  '        visit(v)',
  '        for u in g[v]:',
  '            if u not in seen:',
  '                seen.add(u)',
  '                frontier.add(u)',
];

interface Side {
  visited: string[];
  frontier: string[];
  current: string | null;
  order: string[];
  done: boolean;
}

interface BD {
  bfs: Side;
  dfs: Side;
  turn: 'bfs' | 'dfs' | null;
}

interface Event {
  side: Side;
  line: number;
  note: string;
}

function runTraversal(start: string, kind: 'bfs' | 'dfs'): Event[] {
  const events: Event[] = [];
  const s: Side = { visited: [], frontier: [start], current: null, order: [], done: false };
  const seen = new Set([start]);
  const snap = (line: number, note: string) =>
    events.push({ side: structuredClone(s), line, note });
  snap(1, `${kind.toUpperCase()}: frontier starts as [${start}]`);
  while (s.frontier.length > 0) {
    const v = kind === 'bfs' ? s.frontier.shift()! : s.frontier.pop()!;
    s.current = v;
    snap(4, `${kind.toUpperCase()}: take ${kind === 'bfs' ? 'OLDEST (popleft)' : 'NEWEST (pop)'} → ${v}`);
    s.visited.push(v);
    s.order.push(v);
    const added: string[] = [];
    for (const u of ADJ[v]) {
      if (!seen.has(u)) {
        seen.add(u);
        s.frontier.push(u);
        added.push(u);
      }
    }
    s.current = null;
    snap(
      10,
      added.length > 0
        ? `${kind.toUpperCase()}: ${v} discovers ${added.join(', ')} → frontier [${s.frontier.join(' ')}]`
        : `${kind.toUpperCase()}: ${v} finds nothing new`,
    );
  }
  s.done = true;
  snap(3, `${kind.toUpperCase()} done: ${s.order.join(' → ')}`);
  return events;
}

function buildProgram(start: string): Frame<BD>[] {
  const b = runTraversal(start, 'bfs');
  const d = runTraversal(start, 'dfs');
  const frames: Frame<BD>[] = [];
  const len = Math.max(b.length, d.length);
  let lastB = b[0].side;
  let lastD = d[0].side;
  frames.push({
    state: { bfs: lastB, dfs: lastD, turn: null },
    line: 1,
    note: `same graph, same start (${start}): left runs a QUEUE, right runs a STACK`,
  });
  for (let i = 1; i < len; i++) {
    if (i < b.length) {
      lastB = b[i].side;
      frames.push({
        state: structuredClone({ bfs: lastB, dfs: lastD, turn: 'bfs' as const }),
        line: b[i].line,
        note: b[i].note,
      });
    }
    if (i < d.length) {
      lastD = d[i].side;
      frames.push({
        state: structuredClone({ bfs: lastB, dfs: lastD, turn: 'dfs' as const }),
        line: d[i].line,
        note: d[i].note,
      });
    }
  }
  frames.push({
    state: { bfs: lastB, dfs: lastD, turn: null },
    line: 3,
    note: `BFS swept in rings: ${lastB.order.join(' ')} · DFS dove down corridors: ${lastD.order.join(' ')}`,
  });
  return frames;
}

function Panel({ side, label, active }: { side: Side; label: string; active: boolean }) {
  const drawn = new Set<string>();
  return (
    <g>
      <text x={110} y={12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={700} fill={active ? 'var(--color-active-deep)' : 'var(--color-muted)'}>
        {label}
      </text>
      {Object.entries(ADJ).flatMap(([v, ns]) =>
        ns.map((u) => {
          const key = [v, u].sort().join('');
          if (drawn.has(key)) return null;
          drawn.add(key);
          return (
            <line key={key} x1={POS[v].x} y1={POS[v].y} x2={POS[u].x} y2={POS[u].y} stroke="var(--color-line-strong)" strokeWidth={1.1} />
          );
        }),
      )}
      {Object.keys(POS).map((v) => {
        const isCur = side.current === v;
        const isVisited = side.visited.includes(v);
        const inFrontier = side.frontier.includes(v);
        return (
          <g key={v}>
            <circle
              cx={POS[v].x}
              cy={POS[v].y}
              r={14}
              fill={isCur ? 'var(--color-active-wash)' : isVisited ? 'var(--color-done-wash)' : 'var(--color-panel)'}
              stroke={isCur ? 'var(--color-active)' : isVisited ? 'var(--color-done)' : inFrontier ? 'var(--color-active)' : 'var(--color-line-strong)'}
              strokeWidth={isCur ? 2.4 : inFrontier ? 1.8 : 1.2}
              strokeDasharray={inFrontier && !isCur ? '3 2' : undefined}
              style={{ transition: 'fill .25s, stroke .25s' }}
            />
            <text x={POS[v].x} y={POS[v].y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight={600} fill="var(--color-ink)">
              {v}
            </text>
          </g>
        );
      })}
      {/* frontier readout */}
      <text x={10} y={216} fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-muted)">
        {label === 'BFS · queue' ? 'queue→' : 'stack↑'}
      </text>
      {side.frontier.map((v, i) => (
        <g key={`${v}-${i}`}>
          <rect x={52 + i * 24} y={205} width={20} height={16} rx={2} fill="var(--color-paper)" stroke="var(--color-active)" strokeWidth={1.2} />
          <text x={62 + i * 24} y={217} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--color-ink)">
            {v}
          </text>
        </g>
      ))}
    </g>
  );
}

export default function BfsDfsVisual() {
  const [start, setStart] = useState('A');
  const engine = useVisualEngine<BD>(buildProgram('A'), { baseMs: 850 });
  const s = engine.frame.state;

  return (
    <VisualShell
      figure="FIG · G1"
      title="BFS vs DFS — same loop, different frontier, different world"
      engine={engine}
      codeTitle="traverse.py — runs on BOTH sides"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="bfs_order" v={s.bfs.order.join(' ') || '—'} tone="done" />
          <KV k="dfs_order" v={s.dfs.order.join(' ') || '—'} tone="active" />
        </>
      }
      drive={
        <>
          <DriveLabel>start</DriveLabel>
          <DriveSelect
            value={start}
            onChange={(v) => {
              setStart(v);
              engine.setProgram(buildProgram(v));
            }}
            options={Object.keys(POS).map((n) => ({ value: n, label: n }))}
          />
          <DriveBtn onClick={() => engine.setProgram(buildProgram(start))}>restart</DriveBtn>
        </>
      }
      svg={
        <svg viewBox="0 0 470 230" className="mx-auto block w-full max-w-[560px]" role="img" aria-label="BFS versus DFS animation">
          <g>
            <Panel side={s.bfs} label="BFS · queue" active={s.turn === 'bfs'} />
          </g>
          <line x1={235} y1={6} x2={235} y2={224} stroke="var(--color-line)" />
          <g transform="translate(240, 0)">
            <Panel side={s.dfs} label="DFS · stack" active={s.turn === 'dfs'} />
          </g>
        </svg>
      }
    />
  );
}
