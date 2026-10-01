'use client';

import React, { useEffect, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import type { FlashCard, FlashFamily } from '@/content/courses/gre/flashcards';
import type { RootPart, WordRoots } from '@/content/courses/gre/roots';
import type { Pos } from '@/content/courses/gre/bank/verbal/clusters';
import { type CardProgress, type CardStatus, cardStatus } from '@/lib/flashcards';

export type { FlashCard, FlashFamily };

export const POS_NAME: Record<Pos, string> = { adj: 'adjective', verb: 'verb', noun: 'noun' };

const POS_CLASS: Record<Pos, string> = {
  adj: 'bg-active-wash text-active-deep',
  verb: 'bg-done-wash text-done',
  noun: 'bg-[#f1ebfa] text-[#5f3a96]',
};

export function PosChip({ pos }: { pos: Pos }) {
  return (
    <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${POS_CLASS[pos]}`}>
      {POS_NAME[pos]}
    </span>
  );
}

/** A stable color per family, so a family's cards look like they belong together. */
export function familyHue(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}
export const familyColor = (id: string, l = 46) => `hsl(${familyHue(id)} 58% ${l}%)`;

export const STATUS_LABEL: Record<CardStatus, string> = {
  new: 'new',
  learning: 'learning',
  reviewing: 'reviewing',
  mastered: 'mastered',
};

export const STATUS_CLASS: Record<CardStatus, string> = {
  new: 'border-line bg-panel text-ink-soft',
  learning: 'border-alert/30 bg-alert-wash text-alert',
  reviewing: 'border-active/30 bg-active-wash text-active-deep',
  mastered: 'border-done/30 bg-done-wash text-done',
};

/** Five little boxes: how far a word has climbed. */
export function BoxMeter({ progress }: { progress: CardProgress | undefined }) {
  const box = progress?.box ?? 0;
  const status = cardStatus(progress);
  return (
    <span className="inline-flex items-center gap-1" title={`box ${box || 0} of 5 · ${STATUS_LABEL[status]}`}>
      {[1, 2, 3, 4, 5].map((b) => (
        <span
          key={b}
          className={`h-1.5 w-3 rounded-sm ${b <= box ? (box >= 4 ? 'bg-done' : 'bg-active') : 'bg-line-strong/60'}`}
        />
      ))}
    </span>
  );
}

/**
 * An example sentence: **word** in bold (or blanked out), [clue] underlined —
 * the part of the sentence that tells you what the word means.
 */
export function Example({ text, hideWord = false }: { text: string; hideWord?: boolean }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">
            {hideWord ? '______' : p.slice(2, -2)}
          </strong>
        ) : p.startsWith('[') ? (
          <span key={i} className="underline decoration-active/50 decoration-2 underline-offset-[3px]">
            {p.slice(1, -1)}
          </span>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
}

export function shuffle<T>(xs: readonly T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const fmtTime = (ms: number) => {
  const s = ms / 1000;
  return s < 60 ? `${s.toFixed(1)}s` : `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`;
};

const CONFETTI_COLORS = ['#0f5bd8', '#0b7a5a', '#c43125', '#e3a008', '#5f3a96', '#0aa2c0'];

/** A one-shot confetti burst; bump `burst` to fire again. */
export function Confetti({ burst }: { burst: number }) {
  const [pieces, setPieces] = useState<
    { left: number; color: string; delay: number; drift: number; spin: number; dur: number }[]
  >([]);
  useEffect(() => {
    if (!burst) return;
    setPieces(
      Array.from({ length: 80 }, (_, i) => ({
        left: Math.random() * 100,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 240,
        spin: 360 + Math.random() * 720,
        dur: 1.8 + Math.random() * 1.4,
      })),
    );
    const t = setTimeout(() => setPieces([]), 3800);
    return () => clearTimeout(t);
  }, [burst]);
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={`${burst}-${i}`}
          aria-hidden
          className="fc-confetti"
          style={
            {
              left: `${p.left}%`,
              background: p.color,
              animationDelay: `${p.delay}s`,
              '--fc-drift': `${p.drift}px`,
              '--fc-spin': `${p.spin}deg`,
              '--fc-dur': `${p.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}

/** Same-family words and the opposite family, for the back of a card. */
export function familyLinks(card: FlashCard, families: Record<string, FlashFamily>) {
  const fam = families[card.fam];
  const opp = fam?.opposite ? families[fam.opposite] : undefined;
  return {
    fam,
    mates: (fam?.words ?? []).filter((w) => w !== card.w),
    opposite: opp ? { gist: opp.gist, words: opp.words } : undefined,
  };
}

/** Flag a word to keep an eye on. Never flips or swipes the card it sits on. */
export function FlagButton({ word, compact = false }: { word: string; compact?: boolean }) {
  const { state, toggleFlag } = useProgress();
  const on = state.flashcards?.flagged?.[word] !== undefined;
  return (
    <button
      type="button"
      data-flag={word}
      aria-pressed={on}
      aria-label={on ? `Unflag ${word}` : `Flag ${word}`}
      title={on ? 'Flagged — click to unflag (f)' : 'Flag this word to practice it more (f)'}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        toggleFlag(word);
      }}
      className={`shrink-0 rounded-md border font-mono text-[11px] leading-none transition-colors ${
        compact ? 'px-1.5 py-1' : 'px-2 py-1'
      } ${on ? 'border-[#e3a008] bg-[#fff4d6] text-[#9a5b00]' : 'border-line-strong text-muted hover:border-ink hover:text-ink'}`}
    >
      {on ? '⚑' : '⚐'}
      {!compact && <span className="ml-1">{on ? 'flagged' : 'flag'}</span>}
    </button>
  );
}

/** "today", "yesterday", "3d ago" … */
export function ago(ms: number, now = Date.now()): string {
  const d = new Date(now);
  const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  if (ms >= midnight) return 'today';
  const days = Math.ceil((midnight - ms) / 86_400_000);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}

const PART_CLASS: Record<RootPart['kind'], string> = {
  prefix: 'border-active/30 bg-active-wash text-active-deep',
  root: 'border-done/30 bg-done-wash text-done',
  suffix: 'border-line-strong bg-paper text-ink-soft',
};

/**
 * A word's root breakdown: each piece with its meaning, and what they add up to —
 * or, for words without useful roots, where the word comes from.
 * `hint` shows only the pieces (for the front of a card, before you flip).
 */
export function Roots({ roots, hint = false }: { roots: WordRoots | undefined; hint?: boolean }) {
  if (!roots) return null;
  if (!roots.parts) {
    if (hint) return null;
    return (
      <div className="rounded-md border border-line bg-paper px-3.5 py-2.5" data-testid="roots">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">word origin</div>
        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
          {roots.story ? roots.story[0].toUpperCase() + roots.story.slice(1) : ''}
        </p>
      </div>
    );
  }
  return (
    <div className={hint ? '' : 'rounded-md border border-line bg-paper px-3.5 py-2.5'} data-testid="roots">
      {!hint && <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">word roots</div>}
      <div className={`flex flex-wrap items-stretch gap-1.5 ${hint ? 'justify-center' : 'mt-1.5'}`}>
        {roots.parts.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="self-center font-mono text-[12px] text-faint">+</span>}
            <span className={`flex flex-col rounded border px-2 py-1 leading-tight ${PART_CLASS[p.kind]}`}>
              <span className="font-mono text-[13px] font-semibold">{p.text}</span>
              {p.meaning && <span className="text-[11.5px] opacity-90">{p.meaning}</span>}
            </span>
          </React.Fragment>
        ))}
      </div>
      {!hint && roots.sense && (
        <p className="mt-2 text-[13.5px] text-ink-soft">
          <span className="font-mono text-faint">= </span>
          {roots.sense}
        </p>
      )}
    </div>
  );
}
