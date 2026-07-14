'use client';

import React, { useState } from 'react';
import { useVisualEngine, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveSelect, DriveLabel } from './shell';

const N = 12;

type AlgoName = 'merge' | 'quick' | 'bubble';

interface AlgoState {
  a: number[];
  focus: number[] | null;
  comps: number;
  line: number;
  done: boolean;
}

interface Race {
  merge: AlgoState;
  quick: AlgoState;
  bubble: AlgoState;
  input: string;
}

const CODES: Record<AlgoName, string[]> = {
  merge: [
    'def merge_sort(a, lo, hi):',
    '    if hi - lo < 2: return',
    '    mid = (lo + hi) // 2',
    '    merge_sort(a, lo, mid)',
    '    merge_sort(a, mid, hi)',
    '    L, R = a[lo:mid], a[mid:hi]',
    '    i = j = 0; k = lo',
    '    while i < len(L) or j < len(R):',
    '        a[k] = smaller of L[i], R[j]',
    '        k += 1   # always n log n, rain or shine',
  ],
  quick: [
    'def quick(a, lo, hi):   # Lomuto, LAST-element pivot',
    '    if lo >= hi: return',
    '    p = a[hi]            # naive pivot choice',
    '    i = lo',
    '    for j in range(lo, hi):',
    '        if a[j] <= p:',
    '            a[i], a[j] = a[j], a[i]; i += 1',
    '    a[i], a[hi] = a[hi], a[i]',
    '    quick(a, lo, i - 1)  # sorted input → one side',
    '    quick(a, i + 1, hi)  #   is ALWAYS empty → O(n²)',
  ],
  bubble: [
    'def bubble(a):',
    '    for end in range(len(a)-1, 0, -1):',
    '        for i in range(end):',
    '            if a[i] > a[i+1]:',
    '                a[i], a[i+1] = a[i+1], a[i]',
  ],
};

interface Step {
  a: number[];
  focus: number[] | null;
  comps: number;
  line: number;
}

function traceBubble(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  let comps = 0;
  for (let end = a.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      comps++;
      steps.push({ a: [...a], focus: [i, i + 1], comps, line: 3 });
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        steps.push({ a: [...a], focus: [i, i + 1], comps, line: 4 });
      }
    }
  }
  steps.push({ a: [...a], focus: null, comps, line: 0 });
  return steps;
}

function traceQuick(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  let comps = 0;
  const quick = (lo: number, hi: number) => {
    if (lo >= hi) return;
    const p = a[hi];
    steps.push({ a: [...a], focus: [hi], comps, line: 2 });
    let i = lo;
    for (let j = lo; j < hi; j++) {
      comps++;
      steps.push({ a: [...a], focus: [j, hi], comps, line: 5 });
      if (a[j] <= p) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    steps.push({ a: [...a], focus: [i], comps, line: 7 });
    quick(lo, i - 1);
    quick(i + 1, hi);
  };
  quick(0, a.length - 1);
  steps.push({ a: [...a], focus: null, comps, line: 0 });
  return steps;
}

function traceMerge(input: number[]): Step[] {
  const steps: Step[] = [];
  const a = [...input];
  let comps = 0;
  const ms = (lo: number, hi: number) => {
    if (hi - lo < 2) return;
    const mid = (lo + hi) >> 1;
    ms(lo, mid);
    ms(mid, hi);
    const L = a.slice(lo, mid);
    const R = a.slice(mid, hi);
    let i = 0,
      j = 0,
      k = lo;
    while (i < L.length || j < R.length) {
      if (i < L.length && j < R.length) comps++;
      const takeLeft = j >= R.length || (i < L.length && L[i] <= R[j]);
      a[k] = takeLeft ? L[i++] : R[j++];
      steps.push({ a: [...a], focus: [k], comps, line: 8 });
      k++;
    }
  };
  ms(0, a.length);
  steps.push({ a: [...a], focus: null, comps, line: 0 });
  return steps;
}

const INPUTS: Record<string, () => number[]> = {
  random: () => [7, 2, 11, 4, 9, 1, 12, 6, 3, 10, 5, 8],
  'already sorted': () => Array.from({ length: N }, (_, i) => i + 1),
  'reverse sorted': () => Array.from({ length: N }, (_, i) => N - i),
  'all duplicates': () => Array.from({ length: N }, (_, i) => (i % 3 === 0 ? 6 : i % 3 === 1 ? 6 : 7)),
};

function buildProgram(inputName: string): Frame<Race>[] {
  const input = INPUTS[inputName]();
  const traces: Record<AlgoName, Step[]> = {
    merge: traceMerge(input),
    quick: traceQuick(input),
    bubble: traceBubble(input),
  };
  const len = Math.max(...Object.values(traces).map((t) => t.length));
  const frames: Frame<Race>[] = [];
  const at = (name: AlgoName, i: number): AlgoState => {
    const t = traces[name];
    const s = t[Math.min(i, t.length - 1)];
    return { ...s, a: [...s.a], done: i >= t.length - 1 };
  };
  frames.push({
    state: { merge: at('merge', 0), quick: at('quick', 0), bubble: at('bubble', 0), input: inputName },
    line: null,
    note: `input: ${inputName}. Three sorts, one array, comparison counters running.`,
  });
  for (let i = 1; i < len; i++) {
    const st: Race = {
      merge: at('merge', i),
      quick: at('quick', i),
      bubble: at('bubble', i),
      input: inputName,
    };
    const finishNote =
      i === traces.merge.length - 1
        ? ' — merge finishes'
        : i === traces.quick.length - 1
          ? ' — quick finishes'
          : i === traces.bubble.length - 1
            ? ' — bubble finishes'
            : '';
    frames.push({
      state: st,
      line: null,
      note: `comparisons — merge ${st.merge.comps} · quick ${st.quick.comps} · bubble ${st.bubble.comps}${finishNote}`,
    });
  }
  const last = frames[frames.length - 1].state;
  const ranked = (['merge', 'quick', 'bubble'] as AlgoName[]).sort(
    (x, y) => last[x].comps - last[y].comps,
  );
  frames.push({
    state: structuredClone(last),
    line: null,
    note: `final: ${ranked.map((n) => `${n} ${last[n].comps}`).join(' < ')}${
      inputName === 'already sorted' ? ' — naive-pivot quicksort just went quadratic on EASY input' : ''
    }`,
  });
  return frames;
}

function Lane({ s, label, y }: { s: AlgoState; label: string; y: number }) {
  const max = Math.max(...s.a);
  const bw = 26;
  return (
    <g transform={`translate(0, ${y})`}>
      <text x={4} y={30} fontFamily="var(--font-mono)" fontSize="9.5" fontWeight={700} fill={s.done ? 'var(--color-done)' : 'var(--color-muted)'}>
        {label}
      </text>
      <text x={4} y={44} fontFamily="var(--font-mono)" fontSize="9" fill={s.done ? 'var(--color-done)' : 'var(--color-faint)'}>
        {s.comps} cmp{s.done ? ' ✓' : ''}
      </text>
      {s.a.map((v, i) => {
        const h = 8 + (v / max) * 42;
        const hot = s.focus?.includes(i) && !s.done;
        return (
          <rect
            key={i}
            x={70 + i * (bw + 2)}
            y={56 - h}
            width={bw}
            height={h}
            rx={1.5}
            fill={s.done ? 'var(--color-done)' : hot ? 'var(--color-active)' : 'var(--color-line-strong)'}
            style={{ transition: 'height .12s, y .12s' }}
          />
        );
      })}
    </g>
  );
}

export default function SortingRaceVisual() {
  const [inputName, setInputName] = useState('random');
  const [tab, setTab] = useState<AlgoName>('quick');
  const engine = useVisualEngine<Race>(buildProgram('random'), { baseMs: 220 });
  const s = engine.frame.state;

  return (
    <VisualShell
      figure="FIG · S1"
      title="Sorting race — adversarial inputs sort the algorithms"
      engine={engine}
      codeTitle={
        <span>
          {(['merge', 'quick', 'bubble'] as AlgoName[]).map((n) => (
            <button
              key={n}
              onClick={() => setTab(n)}
              className={`mr-2 uppercase ${tab === n ? 'font-bold text-active-deep underline' : ''}`}
            >
              {n}
            </button>
          ))}
        </span>
      }
      code={<CodePane lines={CODES[tab]} active={s[tab].done ? null : s[tab].line} />}
      readout={
        <>
          <KV k="input" v={s.input} />
          <KV k="merge" v={s.merge.comps} tone={s.merge.done ? 'done' : undefined} />
          <KV k="quick" v={s.quick.comps} tone={s.quick.done ? 'done' : s.input === 'already sorted' ? 'alert' : undefined} />
          <KV k="bubble" v={s.bubble.comps} tone={s.bubble.done ? 'done' : undefined} />
        </>
      }
      drive={
        <>
          <DriveLabel>input</DriveLabel>
          <DriveSelect
            value={inputName}
            onChange={(v) => {
              setInputName(v);
              engine.setProgram(buildProgram(v));
            }}
            options={Object.keys(INPUTS).map((k) => ({ value: k, label: k }))}
          />
        </>
      }
      svg={
        <svg viewBox="0 0 420 200" className="mx-auto block w-full max-w-[520px]" role="img" aria-label="sorting race animation">
          <Lane s={s.merge} label="merge" y={2} />
          <Lane s={s.quick} label="quick" y={68} />
          <Lane s={s.bubble} label="bubble" y={134} />
        </svg>
      }
    />
  );
}
