'use client';

import React from 'react';
import { useVisualEngine, makeEmitter, type Frame } from '../engine';
import { VisualShell, CodePane, KV, DriveBtn } from '../shell';

// The agent loop: perceive → decide → act → observe, bounded by a step budget.
// A toy ReAct trace accumulates so the "reasoning made visible" point lands.

type Beat = 'perceive' | 'decide' | 'act' | 'observe' | 'done';

interface Step {
  thought: string;
  action: string;
  observation: string;
}

interface AG {
  beat: Beat;
  step: number;
  maxSteps: number;
  trace: Step[];
  current: Partial<Step>;
  finished: boolean;
}

const CODE = [
  'state = perceive(goal)',
  'for step in range(MAX_STEPS):        # ← the bound',
  '    thought, action = model.decide(state)',
  '    if action.is_final: return action.answer',
  '    obs = run_tool(action)           # your code runs it',
  '    state = state + [thought, action, obs]',
  'raise BudgetExceeded                 # stop condition',
];

const SCRIPT: Step[] = [
  {
    thought: 'I need the user’s current plan before I can answer about limits.',
    action: 'get_subscription(user)',
    observation: '{plan: "free", api_calls: 950/1000}',
  },
  {
    thought: 'They’re near the free cap. I should check the upgrade options.',
    action: 'get_plans()',
    observation: '{pro: "$20/mo, 50k calls"}',
  },
  {
    thought: 'I have what I need to answer with a concrete recommendation.',
    action: 'final_answer(...)',
    observation: '(done)',
  },
];

function program(): Frame<AG>[] {
  const frames: Frame<AG>[] = [];
  const emit = makeEmitter(frames);
  const base = (over: Partial<AG>): AG => ({
    beat: 'perceive',
    step: 0,
    maxSteps: 6,
    trace: [],
    current: {},
    finished: false,
    ...over,
  });
  let trace: Step[] = [];
  emit(base({}), 0, 'perceive: read the goal and current state');
  SCRIPT.forEach((st, i) => {
    const isFinal = i === SCRIPT.length - 1;
    emit(base({ beat: 'decide', step: i, trace: [...trace], current: { thought: st.thought } }), 2, `decide · thought: ${st.thought}`);
    emit(
      base({ beat: isFinal ? 'done' : 'act', step: i, trace: [...trace], current: { thought: st.thought, action: st.action } }),
      isFinal ? 3 : 4,
      isFinal ? `action is final → return the answer (loop ends at step ${i + 1}/6)` : `act · your code runs: ${st.action}`,
    );
    if (!isFinal) {
      emit(base({ beat: 'observe', step: i, trace: [...trace], current: st }), 5, `observe: ${st.observation}`);
      trace = [...trace, st];
    } else {
      trace = [...trace, st];
    }
  });
  emit(base({ beat: 'done', step: SCRIPT.length, trace, finished: true }), 3, 'done — bounded by the step budget, never ran away');
  return frames;
}

const NODES: { beat: Beat; label: string; x: number; y: number }[] = [
  { beat: 'perceive', label: 'perceive', x: 150, y: 30 },
  { beat: 'decide', label: 'decide', x: 250, y: 100 },
  { beat: 'act', label: 'act', x: 150, y: 170 },
  { beat: 'observe', label: 'observe', x: 50, y: 100 },
];

export default function AgentLoopVisual() {
  const engine = useVisualEngine<AG>(program(), { baseMs: 1050 });
  const s = engine.frame.state;

  return (
    <VisualShell
      figure="FIG · L8"
      title="The agent loop — model decides, your code acts, a budget bounds it"
      engine={engine}
      codeTitle="agent.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="beat" v={s.beat} tone={s.beat === 'done' ? 'done' : 'active'} />
          <KV k="step" v={`${Math.min(s.step + (s.finished ? 0 : 1), s.maxSteps)}/${s.maxSteps}`} tone={s.step >= s.maxSteps - 1 ? 'alert' : undefined} />
          {s.current.action && <KV k="action" v={s.current.action} />}
        </>
      }
      drive={<DriveBtn onClick={() => engine.setProgram(program())}>replay</DriveBtn>}
      svg={
        <svg viewBox="0 0 460 210" className="mx-auto block w-full max-w-[500px]" role="img" aria-label="agent loop animation">
          {/* loop ring */}
          <circle cx={150} cy={100} r={70} fill="none" stroke="var(--color-line)" strokeDasharray="3 4" />
          {NODES.map((n, i) => {
            const next = NODES[(i + 1) % NODES.length];
            const active = s.beat === n.beat;
            return (
              <g key={n.beat}>
                <line x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="var(--color-line-strong)" strokeWidth={1} markerEnd="url(#ag-arr)" opacity={0.5} />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={26}
                  fill={active ? 'var(--color-active-wash)' : 'var(--color-panel)'}
                  stroke={active ? 'var(--color-active)' : 'var(--color-ink)'}
                  strokeWidth={active ? 2.2 : 1.2}
                  style={{ transition: 'fill .2s, stroke .2s' }}
                />
                <text x={n.x} y={n.y + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" fontWeight={active ? 700 : 400} fill="var(--color-ink)">
                  {n.label}
                </text>
              </g>
            );
          })}
          {s.finished && (
            <text x={150} y={104} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fontWeight={700} fill="var(--color-done)">
              ✓ done
            </text>
          )}

          {/* ReAct trace */}
          <text x={252} y={16} fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-muted)">
            ReAct trace
          </text>
          {s.trace.map((st, i) => (
            <g key={i}>
              <text x={252} y={30 + i * 34} fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-active-deep)">
                {i + 1}. {st.action}
              </text>
              <text x={252} y={40 + i * 34} fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--color-muted)">
                → {st.observation.length > 34 ? st.observation.slice(0, 34) + '…' : st.observation}
              </text>
            </g>
          ))}
          {s.current.thought && !s.finished && (
            <text x={252} y={30 + s.trace.length * 34} fontFamily="var(--font-body)" fontSize="8.5" fontStyle="italic" fill="var(--color-faint)">
              💭 {s.current.thought.length > 40 ? s.current.thought.slice(0, 40) + '…' : s.current.thought}
            </text>
          )}

          <defs>
            <marker id="ag-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--color-line-strong)" />
            </marker>
          </defs>
        </svg>
      }
    />
  );
}
