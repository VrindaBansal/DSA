'use client';

import React, { useEffect, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import { Confetti, FlagButton, type FlashCard, PosChip, fmtTime, shuffle } from './shared';

const PAIRS = 6;
const PENALTY_MS = 2000;

/** Six words from different families (so no two meanings are near-twins), topped up from the whole list. */
export function pickMatchCards(pool: FlashCard[], all: FlashCard[]): FlashCard[] {
  const out: FlashCard[] = [];
  const fams = new Set<string>();
  for (const c of [...shuffle(pool), ...shuffle(all)]) {
    if (out.length === PAIRS) break;
    if (fams.has(c.fam) || out.some((o) => o.w === c.w)) continue;
    fams.add(c.fam);
    out.push(c);
  }
  return out;
}

export function MatchGame({
  title,
  pool,
  all,
  onExit,
}: {
  title: string;
  pool: FlashCard[];
  all: FlashCard[];
  onExit: () => void;
}) {
  const { state, recordFlashGame } = useProgress();
  const best = state.flashcards?.matchBestMs;

  const deal = () => {
    const cards = pickMatchCards(pool, all);
    return { cards, words: shuffle(cards), defs: shuffle(cards) };
  };
  const [{ cards, words, defs }, setBoard] = useState(deal);

  const [picked, setPicked] = useState<{ side: 'word' | 'def'; w: string } | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<{ word: string; def: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [finalMs, setFinalMs] = useState<number | null>(null);
  const [prevBest, setPrevBest] = useState<number | undefined>(undefined);
  const [burst, setBurst] = useState(0);

  const finished = finalMs !== null;

  useEffect(() => {
    if (start === null || finished) return;
    const t = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(t);
  }, [start, finished]);

  const reset = () => {
    setBoard(deal());
    setPicked(null);
    setMatched([]);
    setWrong(null);
    setMistakes(0);
    setStart(null);
    setNow(0);
    setFinalMs(null);
  };

  const choose = (side: 'word' | 'def', w: string) => {
    if (finished || matched.includes(w)) return;
    const t0 = start ?? Date.now();
    if (start === null) {
      setStart(t0);
      setNow(t0);
    }
    if (!picked || picked.side === side) {
      setPicked(picked?.side === side && picked.w === w ? null : { side, w });
      return;
    }
    if (picked.w === w) {
      const m = [...matched, w];
      setMatched(m);
      setPicked(null);
      if (m.length === cards.length) {
        const ms = Date.now() - t0 + mistakes * PENALTY_MS;
        setPrevBest(best);
        setFinalMs(ms);
        recordFlashGame('match', ms);
        setBurst((b) => b + 1);
      }
    } else {
      setMistakes((n) => n + 1);
      setWrong(side === 'word' ? { word: w, def: picked.w } : { word: picked.w, def: w });
      setPicked(null);
      window.setTimeout(() => setWrong(null), 450);
    }
  };

  const shown = finished ? finalMs! : start === null ? 0 : now - start + mistakes * PENALTY_MS;

  const tile = (side: 'word' | 'def', c: FlashCard) => {
    const isMatched = matched.includes(c.w);
    const isPicked = picked?.side === side && picked.w === c.w;
    const isWrong = !!wrong && wrong[side] === c.w;
    return (
      <button
        key={`${side}-${c.w}`}
        data-pair={c.w}
        data-side={side}
        onClick={() => choose(side, c.w)}
        disabled={isMatched}
        className={`w-full rounded-lg border-[1.5px] px-3 py-3 text-left transition-all duration-200 ${
          isMatched
            ? 'fc-pop border-done/40 bg-done-wash text-done opacity-60'
            : isPicked
              ? '-translate-y-0.5 border-active bg-active-wash shadow-[0_3px_0_0_var(--color-active)]'
              : isWrong
                ? 'fc-shake border-alert bg-alert-wash'
                : 'border-ink bg-panel shadow-[0_3px_0_0_var(--color-ink)] hover:-translate-y-0.5'
        } ${side === 'word' ? 'font-display text-[16px] font-semibold' : 'text-[13.5px] leading-snug text-ink-soft'}`}
      >
        {side === 'word' ? c.w : c.def}
      </button>
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Confetti burst={burst} />
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="font-mono text-[11px] text-muted">{title}</div>
          <h2 className="font-display text-[1.5rem] font-bold">Match the pairs</h2>
        </div>
        <div className="text-right font-mono">
          <div className="text-[1.6rem] font-semibold tabular-nums" data-testid="match-time">
            {fmtTime(shown)}
          </div>
          <div className="text-[10.5px] text-muted">
            {matched.length}/{cards.length} matched · {mistakes} miss{mistakes === 1 ? '' : 'es'} (+2s each)
          </div>
        </div>
      </div>

      {finished ? (
        <div className="fc-deal rounded-lg border-[1.5px] border-ink bg-panel p-6 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">all {cards.length} matched</div>
          <div className="mt-1 font-display text-[2.6rem] font-bold tabular-nums">{fmtTime(finalMs!)}</div>
          <p className="text-[14px] text-ink-soft">
            {prevBest === undefined
              ? 'Your first time on the board — now beat it.'
              : finalMs! < prevBest
                ? `New best! ${fmtTime(prevBest - finalMs!)} faster than before.`
                : `Best: ${fmtTime(prevBest)}. ${mistakes ? 'Fewer misses = faster time.' : 'So close!'}`}
          </p>
          <ul className="mx-auto mt-5 max-w-lg space-y-1 text-left text-[13.5px]">
            {cards.map((c) => (
              <li key={c.w} className="flex items-baseline gap-2">
                <PosChip pos={c.pos} />
                <span className="flex-1">
                  <span className="font-semibold">{c.w}</span>
                  <span className="text-ink-soft"> — {c.def}</span>
                </span>
                <FlagButton word={c.w} compact />
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button onClick={reset} className="rounded-md bg-ink px-4 py-2 font-mono text-[12px] text-paper hover:bg-active-deep">
              Play again →
            </button>
            <button onClick={onExit} className="rounded-md border border-line-strong px-4 py-2 font-mono text-[12px] hover:border-ink">
              Back to decks
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-4 text-[13.5px] text-muted">
            Tap a word, then its meaning. The clock starts on your first tap; each wrong pair adds 2 seconds.
          </p>
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 sm:gap-4">
            <div className="space-y-2.5">{words.map((c) => tile('word', c))}</div>
            <div className="space-y-2.5">{defs.map((c) => tile('def', c))}</div>
          </div>
          <div className="mt-5 flex justify-between font-mono text-[11px] text-muted">
            <button onClick={onExit} className="hover:text-ink">
              ← decks
            </button>
            <span>{best !== undefined ? `best ${fmtTime(best)}` : 'no best time yet'}</span>
            <button onClick={reset} className="hover:text-ink">
              ↻ new words
            </button>
          </div>
        </>
      )}
    </div>
  );
}
