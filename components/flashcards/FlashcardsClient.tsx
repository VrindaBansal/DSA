'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import type { Pos } from '@/content/courses/gre/bank/verbal/clusters';
import {
  NEW_PER_DAY,
  SET_SIZE,
  accuracy,
  buildDailyPlan,
  cardStatus,
  isTricky,
  localDay,
  masterWeight,
  newToday,
  streak,
  weightedShuffle,
  type CardProgress,
  type CardStatus,
} from '@/lib/flashcards';
import { FlipSession } from './FlipSession';
import { MatchGame } from './MatchGame';
import { SpeedRound } from './SpeedRound';
import {
  FlagButton,
  type FlashCard,
  type FlashFamily,
  PosChip,
  STATUS_CLASS,
  STATUS_LABEL,
  ago,
  familyColor,
  fmtTime,
  shuffle,
} from './shared';

type Mode = 'flip' | 'match' | 'speed';
type PosFilter = 'all' | Pos;
type Daily = { day: string; index: number };
type View = { kind: 'home' } | { kind: Mode; title: string; cards: FlashCard[]; key: number; daily?: Daily };

const MODES: { id: Mode; name: string; blurb: string; glyph: string }[] = [
  { id: 'flip', name: 'Flip cards', blurb: 'See it, guess it, flip it. Swipe → if you knew it.', glyph: '⟲' },
  { id: 'match', name: 'Match', blurb: 'Pair 6 words with their meanings against the clock.', glyph: '⇄' },
  { id: 'speed', name: 'Speed round', blurb: '60 seconds. Pick the right meaning, dodge the opposite.', glyph: '⚡' },
];

const POS_TABS: { id: PosFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'adj', label: 'Adjectives' },
  { id: 'verb', label: 'Verbs' },
  { id: 'noun', label: 'Nouns' },
];

const PREFS_KEY = 'invariant.gre.flashcards.prefs';

export function FlashcardsClient({
  courseId,
  cards,
  families,
}: {
  courseId: string;
  cards: FlashCard[];
  families: FlashFamily[];
}) {
  const { state, ready, setDailyPlan, completeDailySet } = useProgress();
  const progress = useMemo(() => state.flashcards?.cards ?? {}, [state.flashcards]);
  const flagged = useMemo(() => state.flashcards?.flagged ?? {}, [state.flashcards]);
  const plan = state.flashcards?.daily;
  const famById = useMemo(() => Object.fromEntries(families.map((f) => [f.id, f])), [families]);
  const cardByWord = useMemo(() => Object.fromEntries(cards.map((c) => [c.w, c])), [cards]);

  const [view, setView] = useState<View>({ kind: 'home' });
  const [mode, setMode] = useState<Mode>('flip');
  const [reverse, setReverse] = useState(false);
  const [pos, setPos] = useState<PosFilter>('all');
  const [size, setSize] = useState(20);
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  // the local date — read on the client only, so server and client render the same markup
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(localDay()), []);

  // deal today's mini sets once a day: due words, then flagged, then missed, plus new words
  useEffect(() => {
    if (!ready || !today || plan?.day === today) return;
    setDailyPlan(
      buildDailyPlan({
        words: cards.map((c) => c.w),
        progress,
        flagged,
        newLeft: Math.max(0, NEW_PER_DAY - newToday(progress)),
        day: today,
      }),
    );
  }, [ready, today, plan?.day]); // eslint-disable-line react-hooks/exhaustive-deps

  // remember how you like to play (this browser only)
  useEffect(() => {
    try {
      const p = JSON.parse(window.localStorage.getItem(PREFS_KEY) ?? '{}');
      if (p.mode) setMode(p.mode);
      if (typeof p.reverse === 'boolean') setReverse(p.reverse);
      if (p.pos) setPos(p.pos);
      if (p.size) setSize(p.size);
    } catch {
      /* no prefs */
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify({ mode, reverse, pos, size }));
    } catch {
      /* ignore */
    }
  }, [mode, reverse, pos, size]);

  const start = (title: string, deck: FlashCard[], as: Mode = mode, daily?: Daily) => {
    if (!deck.length) return;
    setView({ kind: as, title, cards: deck, key: Date.now(), daily });
    window.scrollTo({ top: 0 });
  };
  const todaySets = plan && plan.day === today ? plan.sets : [];
  const startSet = (i: number) => {
    const set = todaySets[i];
    if (!set || !plan) return;
    const deck = set.words.map((w) => cardByWord[w]).filter(Boolean);
    start(`Mini set ${i + 1} of ${todaySets.length}`, shuffle(deck), 'flip', { day: plan.day, index: i });
  };
  const dealAnother = () => {
    if (!plan || !today) return;
    const extra = buildDailyPlan({
      words: cards.map((c) => c.w),
      progress,
      flagged,
      newLeft: SET_SIZE,
      minNew: 0,
      day: plan.day,
      exclude: new Set(plan.sets.flatMap((st) => st.words)),
      maxSets: 1,
    });
    if (extra.sets.length) setDailyPlan({ ...plan, sets: [...plan.sets, ...extra.sets] });
  };
  const home = () => {
    setView({ kind: 'home' });
    window.scrollTo({ top: 0 });
  };

  // ---- sessions ----------------------------------------------------------------------
  if (view.kind !== 'home') {
    return (
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-8">
        {view.kind === 'flip' && (
          <FlipSession
            key={view.key}
            title={view.title}
            deck={view.cards}
            reverse={reverse}
            families={famById}
            onExit={home}
            onRestart={(c, t) => start(t, shuffle(c), 'flip')}
            onComplete={view.daily ? (r) => completeDailySet(view.daily!.day, view.daily!.index, r) : undefined}
            next={(() => {
              if (!view.daily) return undefined;
              const j = todaySets.findIndex((st, i) => i !== view.daily!.index && !st.done);
              return j >= 0 ? { label: `Next: mini set ${j + 1} →`, go: () => startSet(j) } : undefined;
            })()}
          />
        )}
        {view.kind === 'match' && (
          <MatchGame key={view.key} title={view.title} pool={view.cards} all={cards} onExit={home} />
        )}
        {view.kind === 'speed' && (
          <SpeedRound
            key={view.key}
            title={view.title}
            pool={view.cards}
            all={cards}
            families={famById}
            onExit={home}
            onFlip={(c, t) => start(t, shuffle(c), 'flip')}
          />
        )}
      </div>
    );
  }

  // ---- home: stats, today's sets, decks, word log ------------------------------------------
  const inPos = (c: FlashCard) => pos === 'all' || c.pos === pos;
  const pool = cards.filter(inPos);
  const counts: Record<CardStatus, number> = { new: 0, learning: 0, reviewing: 0, mastered: 0 };
  for (const c of cards) counts[cardStatus(progress[c.w])]++;
  const fresh = pool.filter((c) => !progress[c.w]);
  const missedPool = pool
    .filter((c) => isTricky(progress[c.w]))
    .sort((a, b) => progress[b.w].wrong - progress[a.w].wrong);
  const flaggedPool = pool.filter((c) => flagged[c.w] !== undefined);
  const mastered = pool.filter((c) => cardStatus(progress[c.w]) === 'mastered');
  const days = streak(state.flashcards?.days ?? []);
  const fc = state.flashcards;
  const setsDone = todaySets.filter((st) => st.done).length;

  const decks: { id: string; title: string; sub: string; cards: () => FlashCard[]; primary?: boolean; empty: boolean }[] = [
    {
      id: 'master',
      title: 'Master set',
      sub: `all ${pool.length} words · reshuffled every session`,
      cards: () => weightedShuffle(pool, (c) => masterWeight(progress[c.w], flagged[c.w] !== undefined)),
      primary: true,
      empty: pool.length === 0,
    },
    {
      id: 'missed',
      title: 'Missed words',
      sub: missedPool.length ? `${missedPool.length} still to fix` : 'none yet — nice',
      cards: () => shuffle(missedPool.slice(0, size)),
      empty: missedPool.length === 0,
    },
    {
      id: 'flagged',
      title: 'Flagged',
      sub: flaggedPool.length ? `${flaggedPool.length} flagged` : 'tap ⚐ on any card',
      cards: () => shuffle(flaggedPool).slice(0, size),
      empty: flaggedPool.length === 0,
    },
    {
      id: 'new',
      title: 'New words',
      sub: `${fresh.length} you haven’t seen`,
      cards: () => fresh.slice(0, size),
      empty: fresh.length === 0,
    },
    {
      id: 'mastered',
      title: 'Keep them fresh',
      sub: mastered.length ? `${mastered.length} mastered` : 'master a few first',
      cards: () => shuffle(mastered).slice(0, size),
      empty: mastered.length === 0,
    },
  ];

  const q = query.trim().toLowerCase();
  const famList = families.filter(
    (f) => (pos === 'all' || f.pos === pos) && (!q || f.gist.toLowerCase().includes(q) || f.words.some((w) => w.includes(q))),
  );
  const famCards = (f: FlashFamily) => f.words.map((w) => cardByWord[w]).filter(Boolean);
  const FAM_PREVIEW = 9;
  const famShown = q || showAll ? famList : famList.slice(0, FAM_PREVIEW);
  const modeName = MODES.find((m) => m.id === mode)!.name;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-10">
      <div className="mb-1 font-mono text-[11px]">
        <Link href={`/course/${courseId}`} className="text-muted hover:text-ink">
          ← course
        </Link>
      </div>
      <h1 className="font-display text-[2rem] font-bold tracking-tight">Vocab flashcards</h1>
      <p className="mt-1 max-w-[66ch] text-[14px] leading-relaxed text-ink-soft">
        All {cards.length} words from the core list, in their {families.length} meaning families. Every card shows the
        definition, the word in a real sentence (with the clue underlined), its family, and its opposite family — the
        trap answer on the test. Words you know move up five boxes and come back less and less often; words you miss
        come straight back and land in your missed list. Flag anything you want to see more of.
      </p>

      {/* stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" data-testid="fc-stats">
        <div className="col-span-2 rounded-lg border border-line bg-panel p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Mastered</span>
            <span className="font-mono text-[11px] text-muted">{ready ? `${counts.mastered} / ${cards.length}` : '—'}</span>
          </div>
          <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-line">
            {(['mastered', 'reviewing', 'learning'] as const).map((s) => (
              <div
                key={s}
                className={s === 'mastered' ? 'bg-done' : s === 'reviewing' ? 'bg-active' : 'bg-alert/70'}
                style={{ width: `${(counts[s] / cards.length) * 100}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] text-muted">
            <span><span className="text-done">●</span> {counts.mastered} mastered</span>
            <span><span className="text-active">●</span> {counts.reviewing} reviewing</span>
            <span><span className="text-alert">●</span> {counts.learning} learning</span>
            <span><span className="text-faint">●</span> {counts.new} new</span>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-panel p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Streak</div>
          <div className="mt-1 font-display text-[1.7rem] font-bold leading-none">
            {days > 0 ? `🔥 ${days}` : '0'}
            <span className="ml-1 text-[13px] font-normal text-muted">day{days === 1 ? '' : 's'}</span>
          </div>
          <div className="mt-1 text-[11.5px] text-muted">{days ? 'study today to keep it' : 'study today to start one'}</div>
        </div>
        <div className="rounded-lg border border-line bg-panel p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Bests</div>
          <div className="mt-1 text-[13px] leading-relaxed">
            <div>match: <span className="font-semibold">{fc?.matchBestMs !== undefined ? fmtTime(fc.matchBestMs) : '—'}</span></div>
            <div>speed: <span className="font-semibold">{fc?.speedBest ? `${fc.speedBest} right` : '—'}</span></div>
          </div>
        </div>
      </div>

      {/* today's mini sets */}
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
          Today’s practice · mini sets of {SET_SIZE}
        </h2>
        {todaySets.length > 0 && (
          <span className="font-mono text-[11px] text-muted" data-testid="sets-done">
            {setsDone} of {todaySets.length} done{setsDone === todaySets.length ? ' — nice work today' : ''}
          </span>
        )}
      </div>
      <p className="mt-1 text-[12.5px] text-muted">
        Dealt fresh each day: words due back first, then the ones you flagged or missed, plus up to {NEW_PER_DAY} new
        words — mixed so every set has some of each.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {!ready || !today ? (
          <div className="rounded-lg border border-dashed border-line-strong p-4 text-[13px] text-muted">dealing today’s sets…</div>
        ) : todaySets.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line-strong p-4 text-[13px] text-muted sm:col-span-2 lg:col-span-3">
            Nothing due and you’ve met today’s new words. Run the master set, or play a game below.
          </div>
        ) : (
          todaySets.map((st, i) => {
            const parts = (['due', 'flagged', 'missed', 'new'] as const)
              .filter((k) => st.kinds[k])
              .map((k) => `${st.kinds[k]} ${k}`);
            return (
              <button
                key={i}
                data-miniset={i}
                onClick={() => startSet(i)}
                className={`group rounded-lg border-[1.5px] p-4 text-left transition-all hover:-translate-y-0.5 ${
                  st.done
                    ? 'border-done/50 bg-done-wash shadow-[0_4px_0_0_var(--color-done)]'
                    : 'border-ink bg-panel shadow-[0_4px_0_0_var(--color-ink)]'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-[16px] font-semibold">Mini set {i + 1}</span>
                  {st.done ? (
                    <span className="font-mono text-[11px] text-done">✓ {st.done.firstTry}/{st.done.total} first try</span>
                  ) : (
                    <span className="font-mono text-[11px] text-muted">{st.words.length} cards</span>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-muted">{parts.join(' · ')}</div>
                <div className={`mt-3 font-mono text-[10.5px] ${st.done ? 'text-done' : 'text-active-deep'}`}>
                  {st.done ? 'Go again →' : 'Flip cards →'}
                </div>
              </button>
            );
          })
        )}
      </div>
      {ready && today && setsDone === todaySets.length && todaySets.length > 0 && (
        <button
          onClick={dealAnother}
          className="mt-3 rounded-md border border-dashed border-line-strong px-3 py-2 font-mono text-[11.5px] text-ink-soft hover:border-ink hover:text-ink"
        >
          + Deal one more set
        </button>
      )}

      {/* mode */}
      <h2 className="mb-2 mt-10 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">1 · How do you want to play?</h2>
      <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Game mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="radio"
            aria-checked={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`rounded-lg border-[1.5px] p-4 text-left transition-all ${
              mode === m.id
                ? '-translate-y-0.5 border-active bg-active-wash/50 shadow-[0_4px_0_0_var(--color-active)]'
                : 'border-line-strong bg-panel hover:border-ink'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-[1.3rem] leading-none text-active-deep">{m.glyph}</span>
              <span className="font-display text-[16px] font-semibold">{m.name}</span>
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-muted">{m.blurb}</p>
          </button>
        ))}
      </div>

      {/* options */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11.5px]">
        <Segmented
          label="words"
          value={pos}
          onChange={(v) => setPos(v as PosFilter)}
          options={POS_TABS.map((t) => ({ value: t.id, label: t.label }))}
        />
        <Segmented
          label="deck size"
          value={String(size)}
          onChange={(v) => setSize(Number(v))}
          options={[10, 20, 30].map((n) => ({ value: String(n), label: String(n) }))}
        />
        {mode === 'flip' && (
          <Segmented
            label="show first"
            value={reverse ? 'def' : 'word'}
            onChange={(v) => setReverse(v === 'def')}
            options={[
              { value: 'word', label: 'word → meaning' },
              { value: 'def', label: 'meaning → word' },
            ]}
          />
        )}
      </div>

      {/* quick decks */}
      <h2 className="mb-2 mt-8 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">2 · Pick a deck</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {decks.map((d) => {
          return (
            <button
              key={d.id}
              data-deck={d.id}
              disabled={d.empty}
              onClick={() => start(d.title, d.cards())}
              className={`group rounded-lg border-[1.5px] p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                d.primary
                  ? 'border-ink bg-ink text-paper shadow-[0_4px_0_0_var(--color-active)] enabled:hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1'
                  : 'border-ink bg-panel shadow-[0_4px_0_0_var(--color-ink)] enabled:hover:-translate-y-0.5'
              }`}
            >
              <div className={`font-display text-[16px] font-semibold ${d.primary ? '' : 'group-enabled:group-hover:text-active-deep'}`}>
                {d.title}
              </div>
              <div className={`mt-1 text-[12px] ${d.primary ? 'text-faint' : 'text-muted'}`}>{d.sub}</div>
              <div className={`mt-3 font-mono text-[10.5px] ${d.primary ? 'text-[#9fc0ff]' : 'text-active-deep'}`}>
                {modeName} →
              </div>
            </button>
          );
        })}
      </div>

      {/* the words you get wrong, and the ones you flagged */}
      <WordLog
        cards={cards}
        progress={progress}
        flagged={flagged}
        onPractice={(title, ws) => start(title, shuffle(ws), 'flip')}
      />

      {/* families */}
      <div className="mt-10 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
          …or play one word family · {famList.length} {q ? 'matching' : 'families'}
        </h2>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search a word or meaning"
          aria-label="Search word families"
          className="w-full rounded-md border border-line-strong bg-panel px-3 py-1.5 font-mono text-[12px] outline-none focus:border-active sm:w-64"
        />
      </div>
      <p className="mt-1 text-[12.5px] text-muted">
        “+ opposite” adds the opposite family to the deck — the best way to stop falling for the trap answer.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {famShown.map((f) => {
          const opp = f.opposite ? famById[f.opposite] : undefined;
          const fcards = famCards(f);
          const done = fcards.filter((c) => cardStatus(progress[c.w]) === 'mastered').length;
          return (
            <div
              key={f.id}
              className="flex flex-col rounded-lg border border-line bg-panel p-3.5"
              style={{ borderLeft: `5px solid ${familyColor(f.id)}` }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-[14px] font-semibold leading-snug">{f.gist}</span>
                <span className="shrink-0 font-mono text-[10px] text-muted">
                  {done}/{fcards.length}
                </span>
              </div>
              {opp && <div className="font-mono text-[10px] text-faint">≠ {opp.gist.split(';')[0]}</div>}
              <div className="mt-2 flex flex-wrap gap-1">
                {fcards.map((c) => (
                  <span
                    key={c.w}
                    title={`${c.def} · ${cardStatus(progress[c.w])}`}
                    className={`rounded border px-1.5 py-0.5 text-[12px] ${STATUS_CLASS[cardStatus(progress[c.w])]}`}
                  >
                    {c.w}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2 font-mono text-[11px]">
                <button
                  data-family={f.id}
                  onClick={() => start(`Family · ${f.gist}`, shuffle(fcards))}
                  className="rounded border border-ink px-2.5 py-1 hover:bg-ink hover:text-paper"
                >
                  {modeName}
                </button>
                {opp && (
                  <button
                    onClick={() => start(`${f.gist.split(';')[0]} vs. ${opp.gist.split(';')[0]}`, shuffle([...fcards, ...famCards(opp)]))}
                    className="rounded border border-line-strong px-2.5 py-1 text-ink-soft hover:border-ink hover:text-ink"
                  >
                    + opposite
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {famShown.length < famList.length && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full rounded-lg border border-dashed border-line-strong py-3 font-mono text-[12px] text-ink-soft hover:border-ink hover:text-ink"
        >
          Show all {famList.length} families ↓
        </button>
      )}
      {famList.length === 0 && <p className="mt-4 text-[13px] text-muted">No family matches “{query}”.</p>}
    </div>
  );
}

function Segmented({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted">{label}</span>
      <div className="inline-flex overflow-hidden rounded-md border border-line-strong bg-panel" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`px-2.5 py-1 ${value === o.value ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-paper'}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function WordLog({
  cards,
  progress,
  flagged,
  onPractice,
}: {
  cards: FlashCard[];
  progress: Record<string, CardProgress>;
  flagged: Record<string, number>;
  onPractice: (title: string, cards: FlashCard[]) => void;
}) {
  const [tab, setTab] = useState<'missed' | 'flagged'>('missed');
  const [all, setAll] = useState(false);
  const missed = cards
    .filter((c) => (progress[c.w]?.wrong ?? 0) > 0)
    .sort(
      (a, b) =>
        progress[b.w].wrong - progress[a.w].wrong || (progress[b.w].lastMiss ?? 0) - (progress[a.w].lastMiss ?? 0),
    );
  const flags = cards.filter((c) => flagged[c.w] !== undefined).sort((a, b) => flagged[b.w] - flagged[a.w]);
  const list = tab === 'missed' ? missed : flags;
  const shown = all ? list : list.slice(0, 8);
  const toFix = tab === 'missed' ? missed.filter((c) => isTricky(progress[c.w])) : flags;

  return (
    <section className="mt-10 rounded-lg border border-line bg-panel p-4 sm:p-5" data-testid="word-log">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 font-mono text-[11.5px]" role="tablist" aria-label="Word log">
          {(
            [
              ['missed', `Missed · ${missed.length}`],
              ['flagged', `Flagged · ${flags.length}`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => {
                setTab(id);
                setAll(false);
              }}
              className={`rounded-md px-2.5 py-1 ${tab === id ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-paper'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          disabled={!toFix.length}
          onClick={() => onPractice(tab === 'missed' ? 'Missed words' : 'Flagged words', toFix)}
          className="rounded-md bg-ink px-3 py-1.5 font-mono text-[11.5px] text-paper hover:bg-active-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          {tab === 'missed' ? `Practice the ${toFix.length} not yet mastered →` : `Practice all ${toFix.length} →`}
        </button>
      </div>
      {list.length === 0 ? (
        <p className="mt-4 text-[13px] text-muted">
          {tab === 'missed'
            ? 'Every word you get wrong — in flip cards or a speed round — shows up here, with how often you missed it.'
            : 'Tap ⚐ on any card (or press f) to flag a word. Flagged words get their own deck and show up in your daily sets.'}
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-line">
          {shown.map((c) => {
            const p = progress[c.w];
            const acc = accuracy(p);
            const status = cardStatus(p);
            return (
              <li key={c.w} className="flex items-start gap-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-semibold">{c.w}</span>
                    <PosChip pos={c.pos} />
                    <span className={`rounded border px-1.5 py-0.5 font-mono text-[10px] ${STATUS_CLASS[status]}`}>
                      {STATUS_LABEL[status]}
                    </span>
                  </div>
                  <div className="truncate text-[13px] text-ink-soft">{c.def}</div>
                  {p && (
                    <div className="mt-0.5 font-mono text-[10.5px] text-muted">
                      {p.wrong > 0 && <span className="text-alert">missed {p.wrong}×</span>}
                      {p.wrong > 0 && ' · '}
                      {acc !== undefined && `${acc}% right`}
                      {p.lastMiss ? ` · last missed ${ago(p.lastMiss)}` : ''}
                    </div>
                  )}
                </div>
                <FlagButton word={c.w} compact />
              </li>
            );
          })}
        </ul>
      )}
      {list.length > shown.length && (
        <button onClick={() => setAll(true)} className="mt-2 font-mono text-[11.5px] text-active-deep hover:underline">
          Show all {list.length} ↓
        </button>
      )}
    </section>
  );
}
