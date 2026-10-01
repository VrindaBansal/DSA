'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import { Confetti, FlagButton, type FlashCard, type FlashFamily, PosChip, shuffle } from './shared';

const ROUND_MS = 60_000;

interface Q {
  card: FlashCard;
  options: FlashCard[];
}

/**
 * Four meanings: the right one, one from the opposite family when there is one
 * (the classic GRE trap), and the rest from other families of the same part of speech.
 */
export function makeQuestion(card: FlashCard, all: FlashCard[], families: Record<string, FlashFamily>): Q {
  const opp = families[card.fam]?.opposite;
  const trap = opp ? shuffle(all.filter((c) => c.fam === opp)).slice(0, 1) : [];
  const used = new Set([card.fam, ...trap.map((t) => t.fam)]);
  const rest: FlashCard[] = [];
  for (const c of shuffle(all)) {
    if (rest.length + trap.length === 3) break;
    if (c.pos !== card.pos || used.has(c.fam)) continue;
    used.add(c.fam);
    rest.push(c);
  }
  return { card, options: shuffle([card, ...trap, ...rest]) };
}

export function SpeedRound({
  title,
  pool,
  all,
  families,
  onExit,
  onFlip,
}: {
  title: string;
  pool: FlashCard[];
  all: FlashCard[];
  families: Record<string, FlashFamily>;
  onExit: () => void;
  /** Open a flip round with these cards. */
  onFlip: (cards: FlashCard[], title: string) => void;
}) {
  const { state, gradeFlashcard, recordFlashGame } = useProgress();
  const best = state.flashcards?.speedBest ?? 0;

  const [phase, setPhase] = useState<'ready' | 'countdown' | 'playing' | 'done'>('ready');
  const [count, setCount] = useState(3);
  const [deadline, setDeadline] = useState(0);
  const [now, setNow] = useState(0);
  const [q, setQ] = useState<Q | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [missed, setMissed] = useState<FlashCard[]>([]);
  const [feedback, setFeedback] = useState<{ picked: string } | null>(null);
  const [prevBest, setPrevBest] = useState(0);
  const [burst, setBurst] = useState(0);
  const order = useRef<FlashCard[]>([]);
  const scoreRef = useRef(0);

  const next = useCallback(() => {
    if (!order.current.length) {
      // small decks (one family) get topped up so the round doesn't loop on three words
      const extra = pool.length >= 8 ? [] : shuffle(all.filter((c) => !pool.some((p) => p.w === c.w))).slice(0, 8 - pool.length);
      order.current = shuffle([...pool, ...extra]);
    }
    const card = order.current.pop()!;
    setQ(makeQuestion(card, all, families));
    setFeedback(null);
  }, [pool, all, families]);

  const begin = () => {
    order.current = [];
    scoreRef.current = 0;
    setScore(0);
    setStreak(0);
    setMissed([]);
    setCount(3);
    setPhase('countdown');
  };

  // 3-2-1
  useEffect(() => {
    if (phase !== 'countdown') return;
    if (count === 0) {
      const t0 = Date.now();
      setDeadline(t0 + ROUND_MS);
      setNow(t0);
      next();
      setPhase('playing');
      return;
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 600);
    return () => window.clearTimeout(t);
  }, [phase, count, next]);

  // the clock
  useEffect(() => {
    if (phase !== 'playing') return;
    const t = window.setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n >= deadline) {
        setPhase('done');
        setPrevBest(best);
        recordFlashGame('speed', scoreRef.current);
        if (scoreRef.current > 0) setBurst((b) => b + 1);
      }
    }, 100);
    return () => window.clearInterval(t);
  }, [phase, deadline, best, recordFlashGame]);

  const pick = useCallback(
    (opt: FlashCard) => {
      if (!q || feedback || phase !== 'playing') return;
      const right = opt.w === q.card.w;
      setFeedback({ picked: opt.w });
      if (right) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
        setMissed((m) => (m.some((c) => c.w === q.card.w) ? m : [...m, q.card]));
        gradeFlashcard(q.card.w, false); // misses go to the review pile
      }
      window.setTimeout(next, right ? 250 : 900);
    },
    [q, feedback, phase, next, gradeFlashcard],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onExit();
      if (phase === 'playing' && q && /^[1-4]$/.test(e.key)) pick(q.options[Number(e.key) - 1]);
      if ((phase === 'ready' || phase === 'done') && e.key === 'Enter') begin();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const left = Math.max(0, deadline - now);

  if (phase === 'ready' || phase === 'countdown') {
    return (
      <div className="fc-deal mx-auto max-w-xl rounded-lg border-[1.5px] border-ink bg-panel p-8 text-center shadow-[0_6px_0_0_var(--color-ink)]">
        <div className="font-mono text-[11px] text-muted">{title}</div>
        {phase === 'countdown' ? (
          <div key={count} className="fc-pop py-10 font-display text-[5rem] font-bold leading-none text-active-deep">
            {count || 'Go!'}
          </div>
        ) : (
          <>
            <h2 className="mt-1 font-display text-[2rem] font-bold">Speed round</h2>
            <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">
              60 seconds. See a word, tap its meaning — or press 1–4. Watch out: one choice is often the{' '}
              <strong>opposite</strong>. Every miss goes into your review pile.
            </p>
            <div className="mt-2 font-mono text-[12px] text-muted">{best ? `your best: ${best}` : 'no best score yet'}</div>
            <button
              onClick={begin}
              className="mt-6 rounded-lg bg-ink px-8 py-3 font-mono text-[14px] text-paper hover:bg-active-deep"
            >
              Start →
            </button>
            <div className="mt-4">
              <button onClick={onExit} className="font-mono text-[11px] text-muted hover:text-ink">
                ← decks
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="fc-deal mx-auto max-w-xl">
        <Confetti burst={burst} />
        <div className="rounded-lg border-[1.5px] border-ink bg-panel p-7 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">time’s up</div>
          <div className="mt-1 font-display text-[3.4rem] font-bold leading-none" data-testid="speed-score">
            {score}
          </div>
          <div className="mt-1 text-[14px] text-ink-soft">
            {score > prevBest && prevBest > 0
              ? `New best! (was ${prevBest})`
              : score > 0 && prevBest === 0
                ? 'Your first score — now beat it.'
                : `Best: ${Math.max(prevBest, score)}`}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button onClick={begin} className="rounded-md bg-ink px-4 py-2 font-mono text-[12px] text-paper hover:bg-active-deep">
              Play again →
            </button>
            {missed.length > 0 && (
              <button
                onClick={() => onFlip(missed, 'Speed-round misses')}
                className="rounded-md border border-line-strong px-4 py-2 font-mono text-[12px] hover:border-ink"
              >
                Flip the {missed.length} I missed
              </button>
            )}
            <button onClick={onExit} className="rounded-md border border-line-strong px-4 py-2 font-mono text-[12px] hover:border-ink">
              Back to decks
            </button>
          </div>
        </div>
        {missed.length > 0 && (
          <div className="mt-5 rounded-lg border border-line bg-panel p-5">
            <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Missed this round</div>
            <ul className="space-y-1.5 text-[14px]">
              {missed.map((c) => (
                <li key={c.w} className="flex items-start justify-between gap-3">
                  <span>
                    <span className="font-semibold">{c.w}</span>
                    <span className="text-ink-soft"> — {c.def}</span>
                  </span>
                  <FlagButton word={c.w} compact />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (!q) return null;
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-2 flex items-center justify-between font-mono text-[12px]">
        <span className="text-muted">
          score <span className="text-[16px] font-semibold text-ink" data-testid="speed-live">{score}</span>
          {streak >= 3 && (
            <span key={streak} className="fc-pop ml-2 rounded-full bg-[#fff4d6] px-2 py-0.5 text-[#9a5b00]">
              🔥 {streak}
            </span>
          )}
        </span>
        <span className={`tabular-nums ${left < 10_000 ? 'text-alert' : 'text-ink'}`}>{Math.ceil(left / 1000)}s</span>
      </div>
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full transition-[width] duration-100 ${left < 10_000 ? 'bg-alert' : 'bg-active'}`}
          style={{ width: `${(left / ROUND_MS) * 100}%` }}
        />
      </div>

      <div key={q.card.w} className="fc-deal rounded-xl border-[1.5px] border-ink bg-panel px-6 py-8 text-center shadow-[0_6px_0_0_var(--color-ink)]">
        <PosChip pos={q.card.pos} />
        <div className="mt-3 break-words font-display text-[2.4rem] font-bold leading-tight">{q.card.w}</div>
      </div>

      <div className="mt-5 grid gap-2.5">
        {q.options.map((o, i) => {
          const isRight = o.w === q.card.w;
          const show = !!feedback;
          const isPicked = feedback?.picked === o.w;
          return (
            <button
              key={o.w}
              onClick={() => pick(o)}
              data-correct={isRight ? 'true' : undefined}
              className={`flex items-start gap-3 rounded-lg border-[1.5px] px-4 py-3 text-left text-[14px] leading-snug transition-colors ${
                show && isRight
                  ? 'border-done bg-done-wash text-done'
                  : show && isPicked
                    ? 'fc-shake border-alert bg-alert-wash text-alert'
                    : 'border-line-strong bg-panel hover:border-ink'
              }`}
            >
              <span className="font-mono text-[11px] text-faint">{i + 1}</span>
              <span>{o.def}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
