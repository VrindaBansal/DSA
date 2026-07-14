'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProgress, useLessonProgress } from '@/lib/progress/provider';
import { CHEATSHEET_BY_LESSON } from '@/content/cheatsheets';
import { Markdown } from './Markdown';
import { useTutor } from './TutorContext';

// The tutor is not a page (spec §8) — a persistent drawer, toggled with
// Cmd+K, mounted once at the layout level so it's available on every page.
// Two tabs: "This lesson" (context-injected, only when a lesson is open)
// and "General" (whole-curriculum-aware, always available).

function cheatsheetAsText(lessonId: string): string {
  const c = CHEATSHEET_BY_LESSON[lessonId];
  if (!c) return '(no cheatsheet yet)';
  return [
    ...c.opsTable.map((r) => `${r.op}: ${r.complexity}${r.note ? ` — ${r.note}` : ''}`),
    `USE WHEN: ${c.useWhen}`,
    `DON'T USE WHEN: ${c.dontUseWhen}`,
    `PYTHON STDLIB: ${c.stdlib}`,
    ...(c.bullets ?? []),
  ].join('\n');
}

export function TutorDrawer() {
  const {
    open,
    tab,
    setTab,
    activeLesson,
    closeDrawer,
    toggleDrawer,
    pendingAsk,
    consumePendingAsk,
  } = useTutor();
  const { state, appendChat, clearChat, appendGeneralChat, clearGeneralChat, addNote, dueReview } =
    useProgress();
  const lessonId = activeLesson?.id;
  const lp = useLessonProgress(lessonId ?? '__none__');
  const thread = tab === 'lesson' && lessonId ? lp.chat : state.generalChat;

  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [streamText, setStreamText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noted, setNoted] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  // Cmd+K / Ctrl+K toggle, from anywhere in the app.
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleDrawer();
      }
      if (e.key === 'Escape' && open) closeDrawer();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, toggleDrawer, closeDrawer]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [thread.length, streamText, open, tab]);

  useEffect(() => setNoted(new Set()), [tab, lessonId]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    const userMsg = { role: 'user' as const, content: trimmed, at: Date.now() };
    const isLessonTab = tab === 'lesson' && lessonId && activeLesson;

    if (isLessonTab) appendChat(lessonId, userMsg);
    else appendGeneralChat(userMsg);
    setInput('');
    setStreamText('');
    try {
      const history = [...thread, userMsg].map(({ role, content }) => ({ role, content }));
      const payload = isLessonTab
        ? {
            mode: 'lesson' as const,
            lessonId: activeLesson.id,
            lessonTitle: activeLesson.title,
            lessonSource: activeLesson.source,
            objectives: activeLesson.objectives,
            cheatsheet: cheatsheetAsText(activeLesson.id),
            blocksSeen: lp.blocksSeen,
            lastWrong: lp.lastWrong
              ? { prompt: lp.lastWrong.prompt, myAnswer: lp.lastWrong.myAnswer }
              : null,
            messages: history,
          }
        : {
            mode: 'general' as const,
            completedLessonIds: Object.values(state.lessons)
              .filter((l) => l.completed)
              .map((l) => l.lessonId),
            currentLessonTitle: activeLesson?.title ?? null,
            dueReviewCount: dueReview().length,
            messages: history,
          };
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(j.error ?? `tutor request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setStreamText(acc);
      }
      if (acc.trim()) {
        const assistantMsg = { role: 'assistant' as const, content: acc, at: Date.now() };
        if (isLessonTab) appendChat(lessonId, assistantMsg);
        else appendGeneralChat(assistantMsg);
      }
      setStreamText(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'tutor request failed');
      setStreamText(null);
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  // "Explain this" selections arrive here — always the lesson tab.
  useEffect(() => {
    if (pendingAsk && open && tab === 'lesson' && !busyRef.current) {
      consumePendingAsk();
      void send(pendingAsk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAsk, open, tab]);

  const clearCurrent = () => {
    const label = tab === 'lesson' ? 'this lesson’s' : 'the general';
    if (!window.confirm(`Clear ${label} tutor thread?`)) return;
    if (tab === 'lesson' && lessonId) clearChat(lessonId);
    else clearGeneralChat();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
          className="no-print fixed bottom-0 right-0 top-12 z-50 flex w-full max-w-[420px] flex-col border-l-[1.5px] border-ink bg-panel shadow-[-8px_0_24px_rgba(20,25,35,0.08)]"
          aria-label="AI tutor"
        >
          <div className="border-b border-line">
            <div className="flex items-center justify-between px-4 pt-2.5">
              <div className="font-display text-[13px] font-semibold">Tutor</div>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                {thread.length > 0 && (
                  <button onClick={clearCurrent} className="text-faint hover:text-alert">
                    clear
                  </button>
                )}
                <button
                  onClick={closeDrawer}
                  className="rounded border border-line-strong px-1.5 py-0.5 hover:border-ink"
                  aria-label="close tutor"
                >
                  esc
                </button>
              </div>
            </div>
            <div className="flex items-center gap-1 px-4 pb-2 pt-2">
              {activeLesson && (
                <button
                  onClick={() => setTab('lesson')}
                  className={`rounded px-2.5 py-1 font-mono text-[10.5px] transition-colors ${
                    tab === 'lesson'
                      ? 'bg-active-wash text-active-deep'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  This lesson
                </button>
              )}
              <button
                onClick={() => setTab('general')}
                className={`rounded px-2.5 py-1 font-mono text-[10.5px] transition-colors ${
                  tab === 'general' ? 'bg-active-wash text-active-deep' : 'text-muted hover:text-ink'
                }`}
              >
                General
              </button>
              <span className="ml-auto font-mono text-[9.5px] uppercase tracking-wider text-faint">
                {tab === 'lesson' && activeLesson
                  ? `${lp.blocksSeen.length} blocks read${lp.lastWrong ? ' · last miss' : ''}`
                  : 'whole curriculum'}
              </span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            {thread.length === 0 && streamText == null && (
              <div className="mt-6 space-y-2 text-[13px] leading-relaxed text-muted">
                {tab === 'lesson' && activeLesson ? (
                  <>
                    <p>
                      Ask anything about <em>{activeLesson.title}</em> — I can see the
                      whole lesson, your progress, and what you got wrong.
                    </p>
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">
                      tip: select any text in the lecture → “explain this”
                    </p>
                  </>
                ) : (
                  <p>
                    Ask anything about the course — which lesson covers X, how two
                    ideas relate, or what to study next. I can see the whole
                    curriculum and your progress.
                  </p>
                )}
              </div>
            )}
            <div className="space-y-4">
              {thread.map((m, i) => (
                <div key={i}>
                  <div
                    className={`mb-1 font-mono text-[9px] uppercase tracking-[0.14em] ${
                      m.role === 'user' ? 'text-active-deep' : 'text-muted'
                    }`}
                  >
                    {m.role === 'user' ? 'you' : 'tutor'}
                  </div>
                  {m.role === 'user' ? (
                    <div className="rounded border-l-2 border-active bg-active-wash/50 py-1.5 pl-3 pr-2 text-[13.5px] leading-relaxed">
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    </div>
                  ) : (
                    <div>
                      <Markdown text={m.content} />
                      {tab === 'lesson' && lessonId && (
                        <button
                          onClick={() => {
                            addNote(lessonId, m.content);
                            setNoted((s) => new Set(s).add(i));
                          }}
                          disabled={noted.has(i)}
                          className="mt-1.5 font-mono text-[10px] text-active underline-offset-2 hover:underline disabled:no-underline disabled:text-done"
                        >
                          {noted.has(i)
                            ? '§ added to cheatsheet ✓'
                            : '§ add this to my cheatsheet'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {streamText != null && (
                <div>
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    tutor
                  </div>
                  {streamText === '' ? (
                    <div className="font-mono text-[11px] text-faint">thinking…</div>
                  ) : (
                    <Markdown text={streamText} />
                  )}
                </div>
              )}
              {error && (
                <div className="rounded border border-alert bg-alert-wash px-3 py-2 font-mono text-[11.5px] text-alert">
                  {error}
                </div>
              )}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="border-t border-line p-3"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={2}
              placeholder="wait, why…?  (Enter to send)"
              className="w-full resize-none rounded border border-line bg-paper px-3 py-2 text-[13.5px] leading-relaxed outline-none focus:border-active"
            />
            <div className="mt-1.5 flex items-center justify-between">
              <span className="font-mono text-[9.5px] text-faint">
                ⌘K toggles · {tab === 'lesson' ? 'thread saved per lesson' : 'general thread saved'}
              </span>
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="rounded border border-active bg-active px-3 py-1 font-mono text-[11px] text-white hover:bg-active-deep disabled:opacity-40"
              >
                {busy ? '…' : 'ask'}
              </button>
            </div>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
