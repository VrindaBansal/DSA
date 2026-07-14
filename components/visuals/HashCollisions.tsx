'use client';

import React, { useRef, useState } from 'react';
import { useVisualEngine, makeEmitter, type Frame } from './engine';
import { VisualShell, CodePane, KV, DriveBtn, DriveSelect, DriveLabel } from './shell';

const M = 8;
const KEYS = ['ada', 'bo', 'cyd', 'dee', 'eli', 'fay', 'gus', 'hal', 'ivy', 'jo', 'kai', 'lena'];

type Mode = 'good' | 'bad';

interface HS {
  buckets: string[][];
  mode: Mode;
  activeBucket: number | null;
  probing: string | null;   // key being looked up
  probeIndex: number | null; // position in chain being compared
  comparisons: number;
  inserted: number;
  found: boolean | null;
}

const CODE = [
  'M = 8  # bucket count',
  '',
  'def bucket_good(key):',
  '    h = 0',
  '    for ch in key:              # every char stirs the pot',
  '        h = (h * 31 + ord(ch)) % (2**32)',
  '    return h % M',
  '',
  'def bucket_bad(key):',
  '    return len(key) % M         # "fast!" — and catastrophic',
  '',
  'def insert(table, key):',
  '    b = bucket(key)',
  '    table[b].append(key)        # collision → chain grows',
  '',
  'def lookup(table, key):',
  '    b = bucket(key)             # O(1) to find the bucket...',
  '    for k in table[b]:          # ...O(chain) to walk it',
  '        if k == key:',
  '            return True',
  '    return False',
];

const goodHash = (key: string) => {
  let h = 0;
  for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % M;
};
const badHash = (key: string) => key.length % M;
const hashOf = (mode: Mode, key: string) =>
  mode === 'good' ? goodHash(key) : badHash(key);

const fresh = (mode: Mode): HS => ({
  buckets: Array.from({ length: M }, () => []),
  mode,
  activeBucket: null,
  probing: null,
  probeIndex: null,
  comparisons: 0,
  inserted: 0,
  found: null,
});

function insertFrames(from: HS, key: string): Frame<HS>[] {
  const frames: Frame<HS>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  s.probing = null;
  s.probeIndex = null;
  s.found = null;
  const b = hashOf(s.mode, key);
  s.activeBucket = b;
  emit(s, s.mode === 'good' ? 6 : 9, `bucket("${key}") = ${b}  (${s.mode} hash)`);
  s.buckets[b] = [...s.buckets[b], key];
  s.inserted += 1;
  const chain = s.buckets[b].length;
  emit(
    s,
    13,
    chain > 1
      ? `COLLISION — "${key}" chains behind ${chain - 1} other${chain > 2 ? 's' : ''} in bucket ${b}`
      : `"${key}" is alone in bucket ${b} — the O(1) dream`,
  );
  s.activeBucket = null;
  return frames;
}

function lookupFrames(from: HS, key: string): Frame<HS>[] {
  const frames: Frame<HS>[] = [];
  const emit = makeEmitter(frames);
  const s = structuredClone(from);
  const b = hashOf(s.mode, key);
  s.activeBucket = b;
  s.probing = key;
  s.probeIndex = null;
  s.comparisons = 0;
  s.found = null;
  emit(s, 16, `lookup("${key}"): bucket ${b} — the O(1) part is done`);
  const chain = s.buckets[b];
  for (let i = 0; i < chain.length; i++) {
    s.probeIndex = i;
    s.comparisons += 1;
    if (chain[i] === key) {
      s.found = true;
      emit(s, 18, `"${chain[i]}" == "${key}" ✓ — found after ${s.comparisons} comparison${s.comparisons > 1 ? 's' : ''}`);
      s.activeBucket = null;
      s.probing = null;
      s.probeIndex = null;
      return frames;
    }
    emit(s, 17, `compare "${chain[i]}" ≠ "${key}" — keep walking the chain (${s.comparisons} so far)`);
  }
  s.found = false;
  emit(s, 20, `not here — ${s.comparisons} comparisons for a miss. Long chains make this O(n).`);
  s.activeBucket = null;
  s.probing = null;
  s.probeIndex = null;
  return frames;
}

function buildDemo(mode: Mode, nKeys: number): Frame<HS>[] {
  const frames: Frame<HS>[] = [];
  const emit = makeEmitter(frames);
  let s = fresh(mode);
  emit(
    s,
    0,
    mode === 'good'
      ? `${M} buckets, polynomial hash — keys should spread out.`
      : `${M} buckets, hash = len(key) % ${M} — most names have 3 letters…`,
  );
  const run = (f: Frame<HS>[]) => {
    frames.push(...f);
    s = structuredClone(f[f.length - 1].state);
  };
  for (const k of KEYS.slice(0, nKeys)) run(insertFrames(s, k));
  run(lookupFrames(s, KEYS[nKeys - 1]));
  return frames;
}

export default function HashCollisionsVisual() {
  const [mode, setMode] = useState<Mode>('good');
  const engine = useVisualEngine<HS>(buildDemo('good', 8), { baseMs: 750 });
  const s = engine.frame.state;
  const nextKey = useRef(8);

  const switchMode = (m: Mode) => {
    setMode(m);
    nextKey.current = 8;
    engine.setProgram(buildDemo(m, 8));
  };

  const loadFactor = s.inserted / M;
  const longest = Math.max(...s.buckets.map((b) => b.length));

  return (
    <VisualShell
      figure="FIG · H2"
      title="Hash collisions — a bad hash quietly repeals O(1)"
      engine={engine}
      codeTitle="hashmap.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="hash" v={s.mode} tone={s.mode === 'bad' ? 'alert' : 'done'} />
          <KV k="items" v={s.inserted} />
          <KV k="load_factor" v={loadFactor.toFixed(2)} tone={loadFactor > 1 ? 'alert' : undefined} />
          <KV k="longest_chain" v={longest} tone={longest >= 4 ? 'alert' : undefined} />
          {s.comparisons > 0 && (
            <KV k="last_lookup" v={`${s.comparisons} cmp`} tone={s.comparisons >= 3 ? 'alert' : 'done'} />
          )}
        </>
      }
      drive={
        <>
          <DriveLabel>hash fn</DriveLabel>
          <DriveSelect
            value={mode}
            onChange={(v) => switchMode(v as Mode)}
            options={[
              { value: 'good', label: 'good (poly)' },
              { value: 'bad', label: 'bad (len %8)' },
            ]}
          />
          <DriveBtn
            tone="primary"
            onClick={() => {
              const k = KEYS[nextKey.current % KEYS.length];
              nextKey.current += 1;
              engine.pushOp(insertFrames(s, k));
            }}
          >
            insert next
          </DriveBtn>
          <DriveBtn
            onClick={() => {
              const pool = s.buckets.flat();
              if (pool.length === 0) return;
              const k = pool[Math.floor(Math.random() * pool.length)];
              engine.pushOp(lookupFrames(s, k));
            }}
          >
            lookup random
          </DriveBtn>
        </>
      }
      svg={
        <svg
          viewBox="0 0 440 260"
          className="mx-auto block w-full max-w-[500px]"
          role="img"
          aria-label="hash map collision animation"
        >
          {s.buckets.map((chain, b) => {
            const y = 12 + b * 30;
            const isActive = b === s.activeBucket;
            return (
              <g key={b}>
                <rect
                  x={10}
                  y={y}
                  width={30}
                  height={24}
                  rx={3}
                  fill={isActive ? 'var(--color-active-wash)' : 'var(--color-paper)'}
                  stroke={isActive ? 'var(--color-active)' : 'var(--color-line-strong)'}
                  strokeWidth={isActive ? 2 : 1}
                  style={{ transition: 'fill .25s, stroke .25s' }}
                />
                <text x={25} y={y + 16} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--color-muted)">
                  {b}
                </text>
                {chain.map((key, i) => {
                  const x = 52 + i * 62;
                  const isProbe = isActive && s.probeIndex === i;
                  const isMatch = isProbe && s.probing === key;
                  return (
                    <g key={`${key}-${i}`}>
                      <line
                        x1={i === 0 ? 40 : x - 10}
                        y1={y + 12}
                        x2={x}
                        y2={y + 12}
                        stroke={isActive ? 'var(--color-active)' : 'var(--color-line-strong)'}
                        strokeWidth={1.2}
                      />
                      <rect
                        x={x}
                        y={y}
                        width={52}
                        height={24}
                        rx={3}
                        fill={
                          isMatch
                            ? 'var(--color-done-wash)'
                            : isProbe
                              ? 'var(--color-active-wash)'
                              : 'var(--color-panel)'
                        }
                        stroke={
                          isMatch
                            ? 'var(--color-done)'
                            : isProbe
                              ? 'var(--color-active)'
                              : chain.length >= 4
                                ? 'var(--color-alert)'
                                : 'var(--color-ink)'
                        }
                        strokeWidth={isProbe ? 2 : 1.1}
                        style={{ transition: 'fill .2s, stroke .2s' }}
                      />
                      <text
                        x={x + 26}
                        y={y + 16}
                        textAnchor="middle"
                        fontFamily="var(--font-mono)"
                        fontSize="11"
                        fill="var(--color-ink)"
                      >
                        {key}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      }
    />
  );
}
