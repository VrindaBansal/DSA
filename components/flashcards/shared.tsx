'use client';

import React, { useEffect, useState } from 'react';
import type { FlashCard, FlashFamily } from '@/content/courses/gre/flashcards';
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
