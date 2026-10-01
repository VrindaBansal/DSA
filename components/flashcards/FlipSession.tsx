'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import { type CardProgress, BOX_DAYS, MASTERED_BOX, gradeCard } from '@/lib/flashcards';
import {
  BoxMeter,
  Confetti,
  Example,
  FlagButton,
  type FlashCard,
  type FlashFamily,
  PosChip,
  Roots,
  familyColor,
  familyLinks,
} from './shared';

interface Result {
  firstTry: boolean;
  misses: number;
  mastered: boolean;
}

interface Snapshot {
  queue: FlashCard[];
  idx: number;
  results: Record<string, Result>;
  combo: number;
  word: string;
  prev: CardProgress | undefined;
}

/** A missed card comes back a few cards later — at most this many extra times per round. */
const MAX_REQUEUES = 3;
const SWIPE_AT = 90;

const CHEERS = ['Nice!', 'On a roll!', 'Sharp!', 'Unstoppable!', 'Word wizard!'];

export function FlipSession({
  title,
  deck,
  reverse,
  families,
  onExit,
  onRestart,
  onComplete,
  next,
}: {
  title: string;
  deck: FlashCard[];
  /** Show the meaning first and recall the word. */
  reverse: boolean;
  families: Record<string, FlashFamily>;
  onExit: () => void;
  /** Start a fresh flip round with these cards (e.g. the ones just missed). */
  onRestart: (cards: FlashCard[], title: string) => void;
  /** Called once when the round is finished (daily mini sets record their score). */
  onComplete?: (r: { firstTry: number; total: number }) => void;
  /** A follow-up offered on the summary, e.g. the next mini set. */
  next?: { label: string; go: () => void };
}) {
  const { state, gradeFlashcard, setFlashcard, toggleFlag } = useProgress();
  const progress = state.flashcards?.cards ?? {};

  const [queue, setQueue] = useState<FlashCard[]>(deck);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [leaving, setLeaving] = useState<'left' | 'right' | null>(null);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [burst, setBurst] = useState(0);
  // the roots hint on the front of the card, before flipping
  const [hint, setHint] = useState(false);
  const drag = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);
  const busy = useRef(false);

  const card = queue[idx] as FlashCard | undefined;
  const done = idx >= queue.length;

  const reported = useRef(false);
  useEffect(() => {
    if (!done) return;
    setBurst((b) => b + 1);
    if (onComplete && !reported.current) {
      reported.current = true;
      const rs = Object.values(results);
      onComplete({ firstTry: rs.filter((r) => r.firstTry).length, total: rs.length });
    }
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  const answer = useCallback(
    (knew: boolean) => {
      if (!card || busy.current) return;
      busy.current = true;
      const prev = progress[card.w];
      const next = gradeCard(prev, knew);
      gradeFlashcard(card.w, knew);

      const r = results[card.w];
      const newResults = {
        ...results,
        [card.w]: {
          firstTry: r ? r.firstTry : knew,
          misses: (r?.misses ?? 0) + (knew ? 0 : 1),
          mastered: (r?.mastered ?? false) || ((prev?.box ?? 0) < MASTERED_BOX && next.box >= MASTERED_BOX),
        },
      };
      let newQueue = queue;
      if (!knew && newResults[card.w].misses <= MAX_REQUEUES) {
        const at = Math.min(queue.length, idx + 1 + Math.min(4, queue.length - idx - 1));
        newQueue = [...queue.slice(0, at), card, ...queue.slice(at)];
      }
      setHistory((h) => [...h, { queue, idx, results, combo, word: card.w, prev }]);
      setResults(newResults);
      setQueue(newQueue);
      const c = knew ? combo + 1 : 0;
      setCombo(c);
      setBestCombo((b) => Math.max(b, c));
      setLeaving(knew ? 'right' : 'left');
      window.setTimeout(() => {
        // snap the wrapper back to center without animating it across the screen
        setDragging(true);
        setIdx((i) => i + 1);
        setFlipped(false);
        setHint(false);
        setLeaving(null);
        setDx(0);
        busy.current = false;
        requestAnimationFrame(() => requestAnimationFrame(() => setDragging(false)));
      }, 260);
    },
    [card, progress, gradeFlashcard, results, queue, idx, combo],
  );

  const undo = useCallback(() => {
    const last = history.at(-1);
    if (!last || busy.current) return;
    setFlashcard(last.word, last.prev);
    setQueue(last.queue);
    setIdx(last.idx);
    setResults(last.results);
    setCombo(last.combo);
    setFlipped(true);
    setHint(false);
    setHistory((h) => h.slice(0, -1));
  }, [history, setFlashcard]);

  // keyboard: space/enter flip · → got it · ← still learning · z undo · esc exit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'Escape') return onExit();
      if (done) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === 'ArrowRight' || e.key === '2') {
        e.preventDefault();
        if (flipped) answer(true);
        else setFlipped(true);
      } else if (e.key === 'ArrowLeft' || e.key === '1') {
        e.preventDefault();
        if (flipped) answer(false);
        else setFlipped(true);
      } else if (e.key === 'z' || e.key === 'Z' || e.key === 'Backspace') {
        undo();
      } else if ((e.key === 'f' || e.key === 'F') && card) {
        toggleFlag(card.w);
      } else if ((e.key === 'h' || e.key === 'H') && !reverse) {
        setHint((x) => !x);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [answer, undo, flipped, done, onExit, card, toggleFlag, reverse]);

  // swipe / drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    if (!d.moved && Math.abs(mx) > 8 && Math.abs(mx) > Math.abs(e.clientY - d.y)) {
      d.moved = true;
      setDragging(true);
    }
    if (d.moved) setDx(mx);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (!d.moved) {
      setFlipped((f) => !f);
      return;
    }
    if (flipped && Math.abs(dx) > SWIPE_AT) answer(dx > 0);
    else {
      setDx(0);
      if (Math.abs(dx) > SWIPE_AT) setFlipped(true); // swiped before looking: show the answer first
    }
  };

  const total = new Set(deck.map((c) => c.w)).size;
  const answered = Object.keys(results).length;

  if (done) {
    const rs = Object.entries(results);
    const firstTry = rs.filter(([, r]) => r.firstTry).length;
    const missed = deck.filter((c) => results[c.w] && !results[c.w].firstTry);
    const mastered = rs.filter(([, r]) => r.mastered).length;
    const pct = rs.length ? Math.round((firstTry / rs.length) * 100) : 0;
    return (
      <div className="fc-deal mx-auto max-w-2xl">
        <Confetti burst={burst} />
        <div className="rounded-lg border-[1.5px] border-ink bg-panel p-6 text-center sm:p-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Round complete · {title}</div>
          <div className="mt-2 font-display text-[2.4rem] font-bold leading-tight">
            {pct === 100 ? 'Perfect round!' : pct >= 80 ? 'Great work!' : pct >= 50 ? 'Nice progress!' : 'Every miss is a word you’re learning.'}
          </div>
          <div className="mx-auto mt-5 grid max-w-md grid-cols-3 gap-3">
            <Stat n={firstTry} label="knew first try" tone="text-done" />
            <Stat n={missed.length} label="needed practice" tone="text-alert" />
            <Stat n={bestCombo} label="best streak" tone="text-active-deep" />
          </div>
          {mastered > 0 && (
            <p className="mt-4 text-[14px] text-done">
              ★ {mastered} word{mastered === 1 ? '' : 's'} newly mastered — {mastered === 1 ? 'it' : 'they'} won’t come back for a week.
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {next && (
              <button onClick={next.go} className="rounded-md bg-ink px-4 py-2 font-mono text-[12px] text-paper hover:bg-active-deep">
                {next.label}
              </button>
            )}
            {missed.length > 0 && (
              <button
                onClick={() => onRestart(missed, `${title} · practice the misses`)}
                className={`rounded-md px-4 py-2 font-mono text-[12px] ${
                  next ? 'border border-line-strong hover:border-ink' : 'bg-ink text-paper hover:bg-active-deep'
                }`}
              >
                Practice the {missed.length} I missed →
              </button>
            )}
            <button
              onClick={() => onRestart(deck, title)}
              className="rounded-md border border-line-strong px-4 py-2 font-mono text-[12px] hover:border-ink"
            >
              Go again
            </button>
            <button
              onClick={onExit}
              className="rounded-md border border-line-strong px-4 py-2 font-mono text-[12px] hover:border-ink"
            >
              Back to decks
            </button>
          </div>
        </div>
        {missed.length > 0 && (
          <div className="mt-5 rounded-lg border border-line bg-panel p-5">
            <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              Words to keep practicing · flag any you want to see more
            </div>
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

  if (!card) return null;
  const { fam, mates, opposite } = familyLinks(card, families);
  const p = progress[card.w];
  const tilt = dx / 18;
  const swipeStyle: React.CSSProperties = leaving
    ? { transform: `translateX(${leaving === 'right' ? 120 : -120}%) rotate(${leaving === 'right' ? 12 : -12}deg)`, opacity: 0 }
    : { transform: `translateX(${dx}px) rotate(${tilt}deg)` };
  const lean = flipped ? Math.max(-1, Math.min(1, dx / SWIPE_AT)) : 0;

  const front = reverse ? (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <PosChip pos={card.pos} />
        <span className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">which word?</span>
          <FlagButton word={card.w} />
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center py-6 text-center">
        <div className="font-display text-[1.6rem] font-semibold leading-snug sm:text-[1.9rem]">{card.def}</div>
        <div className="mt-3 text-[13px] text-muted">
          family: <span style={{ color: familyColor(card.fam, 38) }}>{fam?.gist}</span>
        </div>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
          <Example text={card.ex} hideWord />
        </p>
      </div>
      <Hint />
    </div>
  ) : (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <PosChip pos={card.pos} />
        <span className="flex items-center gap-3">
          <BoxMeter progress={p} />
          <FlagButton word={card.w} />
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
        <div
          data-testid="fc-word"
          className="break-words font-display text-[2.6rem] font-bold leading-tight tracking-tight sm:text-[3.4rem]"
        >
          {card.w}
        </div>
        {card.rt?.parts &&
          (hint ? (
            <Roots roots={card.rt} hint />
          ) : (
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setHint(true);
              }}
              className="rounded-full border border-dashed border-line-strong px-3 py-1 font-mono text-[11px] text-muted hover:border-ink hover:text-ink"
            >
              stuck? show the roots · h
            </button>
          ))}
      </div>
      <Hint />
    </div>
  );

  const back = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[1.35rem] font-bold">{card.w}</span>
          <PosChip pos={card.pos} />
        </div>
        <span className="flex items-center gap-3">
          <BoxMeter progress={p} />
          <FlagButton word={card.w} />
        </span>
      </div>
      <div className="mt-3 font-display text-[1.45rem] font-semibold leading-snug sm:text-[1.6rem]">{card.def}</div>
      <div className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
        <span className="h-2 w-2 rounded-full" style={{ background: familyColor(card.fam) }} />
        family: <span className="text-ink-soft">{fam?.gist}</span>
      </div>
      <div className="mt-4">
        <Roots roots={card.rt} />
      </div>
      <div className="mt-3 rounded-md bg-paper px-3.5 py-2.5">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">in a sentence · underlined = the clue</div>
        <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">
          <Example text={card.ex} />
        </p>
      </div>
      <div className="mt-4 grid gap-3 text-[13px] sm:grid-cols-2">
        {mates.length > 0 && (
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">same family</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {mates.map((w) => (
                <span key={w} className="rounded border border-done/30 bg-done-wash px-1.5 py-0.5 text-done">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
        {opposite && (
          <div>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">≠ opposite · {opposite.gist}</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {opposite.words.map((w) => (
                <span key={w} className="rounded border border-alert/25 bg-alert-wash px-1.5 py-0.5 text-alert">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress strip */}
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[11px] text-muted">
        <span className="truncate">{title}</span>
        <span className="flex shrink-0 items-center gap-3">
          {combo >= 2 && (
            <span key={combo} className="fc-pop rounded-full bg-[#fff4d6] px-2 py-0.5 text-[#9a5b00]">
              🔥 {combo} in a row{combo >= 5 ? ` · ${CHEERS[Math.min(CHEERS.length - 1, Math.floor(combo / 5) - 1)]}` : ''}
            </span>
          )}
          <span data-testid="fc-count">
            {Math.min(answered + 1, total)} / {total}
          </span>
        </span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-active transition-all duration-300" style={{ width: `${(answered / total) * 100}%` }} />
      </div>

      {/* the card */}
      <div className="fc-scene relative select-none">
        <div
          className={`fc-swipe ${dragging ? 'is-dragging' : ''} cursor-pointer`}
          style={swipeStyle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
            setDragging(false);
            setDx(0);
          }}
          role="button"
          tabIndex={0}
          aria-label={flipped ? `Back of card: ${card.w}` : 'Flip card'}
        >
          <div key={`${idx}-${card.w}`} className="fc-deal">
          <div className={`fc-card ${flipped ? 'is-flipped' : ''}`}>
            <div
              className="fc-face min-h-[22rem] rounded-xl border-[1.5px] border-ink bg-panel p-5 shadow-[0_6px_0_0_var(--color-ink)] sm:p-7"
              style={{ borderTop: `6px solid ${familyColor(card.fam)}` }}
              aria-hidden={flipped}
            >
              {front}
            </div>
            <div
              className="fc-face fc-back min-h-[22rem] rounded-xl border-[1.5px] border-ink bg-panel p-5 shadow-[0_6px_0_0_var(--color-ink)] sm:p-7"
              style={{ borderTop: `6px solid ${familyColor(card.fam)}` }}
              aria-hidden={!flipped}
            >
              {back}
            </div>
          </div>
          </div>
          {lean !== 0 && (
            <div
              className={`pointer-events-none absolute top-6 rounded-md border-2 bg-panel/90 px-3 py-1 font-display text-[1.1rem] font-bold tracking-wide ${
                lean > 0 ? 'left-6 rotate-[-10deg] border-done text-done' : 'right-6 rotate-[10deg] border-alert text-alert'
              }`}
              style={{ opacity: Math.abs(lean) }}
            >
              {lean > 0 ? 'GOT IT' : 'AGAIN'}
            </div>
          )}
        </div>
      </div>

      {/* controls */}
      <div className="mt-7">
        {!flipped ? (
          <button
            onClick={() => setFlipped(true)}
            className="w-full rounded-lg bg-ink py-3 font-mono text-[13px] text-paper hover:bg-active-deep"
          >
            {reverse ? 'Show the word' : 'Show the meaning'} <span className="text-faint">· space</span>
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => answer(false)}
              className="rounded-lg border-[1.5px] border-alert bg-alert-wash py-3 font-mono text-[13px] text-alert hover:bg-alert hover:text-panel"
            >
              ✗ Still learning <span className="opacity-60">· ←</span>
            </button>
            <button
              onClick={() => answer(true)}
              className="rounded-lg border-[1.5px] border-done bg-done-wash py-3 font-mono text-[13px] text-done hover:bg-done hover:text-panel"
            >
              ✓ Got it <span className="opacity-60">· →</span>
            </button>
          </div>
        )}
        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted">
          <button onClick={onExit} className="hover:text-ink">
            ← decks
          </button>
          <span className="hidden sm:inline">space flip · ← / → grade · h roots · f flag · z undo</span>
          <button onClick={undo} disabled={!history.length} className="hover:text-ink disabled:opacity-40">
            ↶ undo
          </button>
        </div>
        {flipped && (
          <p className="mt-3 text-center text-[12px] text-faint">
            Got it → back in {nextLabel(gradeCard(p, true).box)} · Still learning → it comes back this round
          </p>
        )}
      </div>
    </div>
  );
}

const nextLabel = (box: number) => {
  const d = BOX_DAYS[box];
  return d === 0 ? 'a moment' : d === 1 ? '1 day' : `${d} days`;
};

function Hint() {
  return (
    <div className="text-center font-mono text-[10.5px] text-faint">
      tap to flip · swipe → if you knew it, ← if not · ⚐ flag words to practice more
    </div>
  );
}

function Stat({ n, label, tone }: { n: number; label: string; tone: string }) {
  return (
    <div className="rounded-md border border-line bg-paper px-2 py-3">
      <div className={`font-display text-[1.8rem] font-bold leading-none ${tone}`}>{n}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{label}</div>
    </div>
  );
}
