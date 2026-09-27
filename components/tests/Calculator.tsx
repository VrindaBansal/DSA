'use client';

import React, { useState } from 'react';

// The on-screen calculator from the Quant sections: four functions, square
// root, sign change, parentheses with order of operations, one memory, and
// "Transfer Display" into a numeric-entry box. Deliberately basic — like the
// real one — so the habits you build here carry over.

type Op = '+' | '-' | '×' | '÷';
type Tok = number | Op | '(' | ')';

const PREC: Record<Op, number> = { '+': 1, '-': 1, '×': 2, '÷': 2 };

export function evaluate(toks: Tok[]): number {
  const out: Tok[] = [];
  const ops: Tok[] = [];
  for (const t of toks) {
    if (typeof t === 'number') out.push(t);
    else if (t === '(') ops.push(t);
    else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') out.push(ops.pop()!);
      ops.pop();
    } else {
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top === '(' || PREC[top as Op] < PREC[t]) break;
        out.push(ops.pop()!);
      }
      ops.push(t);
    }
  }
  while (ops.length) {
    const o = ops.pop()!;
    if (o !== '(') out.push(o);
  }
  const st: number[] = [];
  for (const t of out) {
    if (typeof t === 'number') st.push(t);
    else {
      const b = st.pop();
      const a = st.pop();
      if (a === undefined || b === undefined) return NaN;
      st.push(t === '+' ? a + b : t === '-' ? a - b : t === '×' ? a * b : a / b);
    }
  }
  return st.length === 1 ? st[0] : NaN;
}

/** Up to 8 significant digits, like a basic calculator display. */
export function formatDisplay(v: number): string {
  if (!Number.isFinite(v)) return 'Error';
  if (Math.abs(v) >= 1e8) return 'Error';
  const r = Number(v.toPrecision(8));
  return String(r);
}

function K({ label, on, tone }: { label: string; on: () => void; tone?: 'op' | 'fn' }) {
  return (
    <button
      type="button"
      onClick={on}
      className={`h-9 rounded border font-mono text-[13px] ${
        tone === 'op'
          ? 'border-line-strong bg-paper hover:bg-active-wash'
          : tone === 'fn'
            ? 'border-line-strong bg-paper text-[11.5px] hover:bg-active-wash'
            : 'border-line bg-panel hover:bg-active-wash'
      }`}
    >
      {label}
    </button>
  );
}

export function Calculator({
  onTransfer,
  onClose,
}: {
  /** Present only while a numeric-entry question is showing. */
  onTransfer?: (value: string) => void;
  onClose: () => void;
}) {
  const [toks, setToks] = useState<Tok[]>([]);
  const [entry, setEntry] = useState('');
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [last, setLast] = useState<number | null>(null);

  const current = (): number => (entry !== '' ? Number(entry) : last ?? Number(display) ?? 0);

  const digit = (d: string) => {
    let base = toks;
    if (last !== null && entry === '' && toks.length === 0) {
      setLast(null);
      base = [];
    }
    if (d === '.' && entry.includes('.')) return;
    if (entry.replace(/[-.]/g, '').length >= 8) return;
    const e = entry === '' && d === '.' ? '0.' : entry === '0' && d !== '.' ? d : entry + d;
    setToks(base);
    setEntry(e);
    setDisplay(e);
  };

  const op = (o: Op) => {
    const next = [...toks];
    if (entry !== '') next.push(Number(entry));
    else if (next.length === 0 && last !== null) next.push(last);
    else if (next.length && typeof next[next.length - 1] === 'string' && next[next.length - 1] !== ')' && next[next.length - 1] !== '(')
      next.pop(); // replace a trailing operator
    next.push(o);
    setToks(next);
    setEntry('');
    setLast(null);
  };

  const paren = (p: '(' | ')') => {
    const next = [...toks];
    if (p === ')' && entry !== '') next.push(Number(entry));
    next.push(p);
    setToks(next);
    setEntry('');
  };

  const equals = () => {
    const next = [...toks];
    if (entry !== '') next.push(Number(entry));
    const opens = next.filter((t) => t === '(').length - next.filter((t) => t === ')').length;
    for (let i = 0; i < opens; i++) next.push(')');
    const v = evaluate(next);
    const shown = formatDisplay(v);
    setDisplay(shown);
    setToks([]);
    setEntry('');
    setLast(shown === 'Error' ? null : Number(shown));
  };

  const unary = (fn: (x: number) => number) => {
    const v = fn(current());
    const shown = formatDisplay(v);
    setDisplay(shown);
    setEntry(shown === 'Error' ? '' : shown);
  };

  const clearAll = () => {
    setToks([]);
    setEntry('');
    setDisplay('0');
    setLast(null);
  };

  const pending = toks
    .map((t) => (typeof t === 'number' ? formatDisplay(t) : t))
    .join(' ');

  return (
    <div
      className="fixed right-4 top-28 z-40 w-[244px] rounded-md border-[1.5px] border-ink bg-panel p-2.5 shadow-lg"
      role="dialog"
      aria-label="Calculator"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">Calculator</span>
        <button onClick={onClose} className="font-mono text-[12px] text-muted hover:text-ink" aria-label="Close calculator">
          ✕
        </button>
      </div>
      <div className="mb-2 rounded border border-line-strong bg-paper px-2 py-1 text-right">
        <div className="h-3.5 truncate font-mono text-[10px] text-faint">
          {memory !== 0 ? 'M  ' : ''}
          {pending}
        </div>
        <div className="font-mono text-[20px] leading-tight" data-testid="calc-display">
          {entry || display}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1">
        <K label="MR" tone="fn" on={() => { const s = formatDisplay(memory); setEntry(s); setDisplay(s); }} />
        <K label="MC" tone="fn" on={() => setMemory(0)} />
        <K label="M+" tone="fn" on={() => setMemory((m) => m + current())} />
        <K label="(" tone="fn" on={() => paren('(')} />
        <K label=")" tone="fn" on={() => paren(')')} />
        <K label="7" on={() => digit('7')} />
        <K label="8" on={() => digit('8')} />
        <K label="9" on={() => digit('9')} />
        <K label="÷" tone="op" on={() => op('÷')} />
        <K label="C" tone="fn" on={clearAll} />
        <K label="4" on={() => digit('4')} />
        <K label="5" on={() => digit('5')} />
        <K label="6" on={() => digit('6')} />
        <K label="×" tone="op" on={() => op('×')} />
        <K label="CE" tone="fn" on={() => { setEntry(''); setDisplay('0'); }} />
        <K label="1" on={() => digit('1')} />
        <K label="2" on={() => digit('2')} />
        <K label="3" on={() => digit('3')} />
        <K label="−" tone="op" on={() => op('-')} />
        <K label="√" tone="fn" on={() => unary(Math.sqrt)} />
        <K label="0" on={() => digit('0')} />
        <K label="." on={() => digit('.')} />
        <K label="±" tone="fn" on={() => unary((x) => -x)} />
        <K label="+" tone="op" on={() => op('+')} />
        <K label="=" tone="op" on={equals} />
      </div>
      <button
        type="button"
        disabled={!onTransfer}
        onClick={() => onTransfer?.(entry || display)}
        className="mt-2 w-full rounded border border-line-strong py-1.5 font-mono text-[11px] enabled:hover:bg-active-wash disabled:opacity-40"
        title={onTransfer ? 'Copy the display into the answer box' : 'Only for numeric-entry questions'}
      >
        Transfer Display
      </button>
    </div>
  );
}
