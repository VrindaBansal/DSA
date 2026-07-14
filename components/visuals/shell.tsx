'use client';

import React, { useEffect, useRef } from 'react';
import type { VisualEngine } from './engine';

// ---------------------------------------------------------------------------
// The signature frame (spec §10): SVG animation and Python code side by side,
// always in lockstep, in one bordered figure. Every visual uses this shell.
// ---------------------------------------------------------------------------

export function VisualShell({
  figure,
  title,
  engine,
  svg,
  code,
  drive,
  readout,
  codeTitle,
}: {
  figure: string; // e.g. "FIG 06·1"
  title: string;
  engine: VisualEngine<unknown> | VisualEngine<never> | any;
  svg: React.ReactNode;
  code: React.ReactNode;
  drive?: React.ReactNode;
  readout?: React.ReactNode;
  codeTitle?: React.ReactNode;
}) {
  return (
    <figure className="not-prose my-8 overflow-hidden rounded-md border-[1.5px] border-ink bg-panel">
      {/* header strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {figure}
          </span>
          <span className="font-display text-[13px] font-semibold tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1">
            <i className="h-2 w-2 rounded-full bg-active" /> current
          </span>
          <span className="flex items-center gap-1">
            <i className="h-2 w-2 rounded-full bg-done" /> done
          </span>
          <span className="flex items-center gap-1">
            <i className="h-2 w-2 rounded-full bg-alert" /> violated
          </span>
        </div>
      </div>

      {/* animation + code, one frame */}
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
        <div className="flex flex-col border-line max-md:border-b md:border-r">
          <div className="flex-1 p-4">{svg}</div>
          {/* step note */}
          <div className="flex min-h-[34px] items-center gap-2 border-t border-line px-4 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-active" />
            <span className="font-mono text-[11.5px] leading-snug text-ink-soft">
              {engine.frame?.note ?? ''}
            </span>
          </div>
          {/* live state readout */}
          {readout && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line bg-paper px-4 py-2">
              {readout}
            </div>
          )}
        </div>
        <div className="flex flex-col bg-code-bg/60">
          {codeTitle && (
            <div className="border-b border-line px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              {codeTitle}
            </div>
          )}
          <div className="max-h-[420px] flex-1 overflow-auto py-2">{code}</div>
        </div>
      </div>

      {/* controls + drive-it-yourself */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t-[1.5px] border-ink bg-paper px-3 py-2">
        <Controls engine={engine} />
        {drive && (
          <div className="flex flex-wrap items-center gap-2">{drive}</div>
        )}
      </div>
    </figure>
  );
}

export function Controls({ engine }: { engine: any }) {
  const speeds = [0.5, 1, 2, 4];
  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px]">
      <CtrlBtn onClick={engine.toggle} label={engine.playing ? 'pause' : 'play'}>
        {engine.playing ? '❚❚' : '▶'}
      </CtrlBtn>
      <CtrlBtn onClick={engine.stepBack} disabled={engine.atStart} label="step back">
        ‹
      </CtrlBtn>
      <CtrlBtn onClick={engine.stepFwd} disabled={engine.atEnd} label="step forward">
        ›
      </CtrlBtn>
      <CtrlBtn onClick={engine.reset} label="reset">
        ↺
      </CtrlBtn>
      <button
        onClick={() => {
          const i = speeds.indexOf(engine.speed);
          engine.setSpeed(speeds[(i + 1) % speeds.length]);
        }}
        className="ml-1 rounded border border-line-strong bg-panel px-2 py-1 text-muted hover:text-ink"
        aria-label="playback speed"
      >
        {engine.speed}×
      </button>
      <span className="ml-2 tabular-nums text-faint">
        {engine.index + 1}/{engine.length}
      </span>
    </div>
  );
}

function CtrlBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="min-w-8 rounded border border-line-strong bg-panel px-2 py-1 text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export function CodePane({
  lines,
  active,
}: {
  lines: string[];
  active: number | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (active == null) return;
    const el = ref.current?.querySelector(`[data-line="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);
  return (
    <div ref={ref} className="font-mono text-[12px] leading-[1.7]">
      {lines.map((l, i) => (
        <div
          key={i}
          data-line={i}
          className={`flex px-3 ${
            active === i
              ? 'border-l-2 border-active bg-active-wash text-ink'
              : 'border-l-2 border-transparent text-ink-soft'
          }`}
        >
          <span className="w-6 shrink-0 select-none text-right text-[10px] leading-[1.7]/none pt-px pr-2 text-faint tabular-nums">
            {i + 1}
          </span>
          <pre className="whitespace-pre">{l || ' '}</pre>
        </div>
      ))}
    </div>
  );
}

// --- live state readout atoms ----------------------------------------------

export function KV({
  k,
  v,
  tone,
}: {
  k: string;
  v: React.ReactNode;
  tone?: 'active' | 'done' | 'alert';
}) {
  const toneCls =
    tone === 'active'
      ? 'text-active-deep'
      : tone === 'done'
        ? 'text-done'
        : tone === 'alert'
          ? 'text-alert'
          : 'text-ink';
  return (
    <span className="font-mono text-[11.5px]">
      <span className="text-muted">{k}=</span>
      <span className={`font-semibold ${toneCls}`}>{v}</span>
    </span>
  );
}

// --- drive-it-yourself atoms -------------------------------------------------

export function DriveBtn({
  children,
  onClick,
  disabled,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tone?: 'primary';
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded border px-2.5 py-1 font-mono text-[11px] transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
        tone === 'primary'
          ? 'border-active bg-active text-white hover:bg-active-deep'
          : 'border-line-strong bg-panel text-ink hover:border-ink'
      }`}
    >
      {children}
    </button>
  );
}

export function DriveInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-16 rounded border border-line-strong bg-panel px-2 py-1 font-mono text-[11px] text-ink outline-none focus:border-active ${props.className ?? ''}`}
    />
  );
}

export function DriveSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border border-line-strong bg-panel px-2 py-1 font-mono text-[11px] text-ink outline-none focus:border-active"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function DriveLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}
