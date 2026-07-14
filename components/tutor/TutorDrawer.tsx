'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProgress, useLessonProgress } from '@/lib/progress/provider';
import { CHEATSHEET_BY_LESSON } from '@/content/cheatsheets';
import { Markdown } from './Markdown';

// The tutor is not a page (spec §4) — it's this drawer, on every lesson,
// toggled with Cmd+K, thread persisted per lesson.

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

export function TutorDrawer({
  lessonId,
  lessonTitle,
  lessonSource,
  objectives,
  open,
  onOpenChange,
  pendingAsk,
  onPendingConsumed,
}: {
  lessonId: string;
  lessonTitle: string;
  lessonSource: string;
  objectives: string[];
  open: boolean;
  onOpenChange: (o: boolean) => void;
  pendingAsk: string | null;
  onPendingConsumed: () => void;
}) {
  const { appendChat, clearChat, addNote } = useProgress();
  const lp = useLessonProgress(lessonId);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [streamText, setStreamText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noted, setNoted] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  // Cmd+K / Ctrl+K toggle
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape' && open) onOpenChange(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onOpenChange]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lp.chat.length, streamText, open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    const userMsg = { role: 'user' as const, content: trimmed, at: Date.now() };
    appendChat(lessonId, userMsg);
    setInput('');
    setStreamText('');
    try {
      const history = [...lp.chat, userMsg].map(({ role, content }) => ({
        role,
        content,
      }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          lessonTitle,
          lessonSource,
          objectives,
          cheatsheet: cheatsheetAsText(lessonId),
          blocksSeen: lp.blocksSeen,
          lastWrong: lp.lastWrong
            ? { prompt: lp.lastWrong.prompt, myAnswer: lp.lastWrong.myAnswer }
            : null,
          messages: history,
        }),
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
        appendChat(lessonId, {
          role: 'assistant',
          content: acc,
          at: Date.now(),
        });
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

  // "Explain this" selections arrive here
  useEffect(() => {
    if (pendingAsk && open && !busyRef.current) {
      onPendingConsumed();
      void send(pendingAsk);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAsk, open]);

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
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div>
              <div className="font-display text-[13px] font-semibold">Tutor</div>
              <div className="font-mono text-[9.5px] uppercase tracking-wider text-faint">
                sees: this lesson · {lp.blocksSeen.length} blocks read
                {lp.lastWrong ? ' · your last miss' : ''}
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              {lp.chat.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear this lesson’s tutor thread?'))
                      clearChat(lessonId);
                  }}
                  className="text-faint hover:text-alert"
                >
                  clear
                </button>
              )}
              <button
                onClick={() => onOpenChange(false)}
                className="rounded border border-line-strong px-1.5 py-0.5 hover:border-ink"
                aria-label="close tutor"
              >
                esc
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            {lp.chat.length === 0 && streamText == null && (
              <div className="mt-6 space-y-2 text-[13px] leading-relaxed text-muted">
                <p>
                  Ask anything about <em>{lessonTitle}</em> — I can see the whole
                  lesson, your progress, and what you got wrong.
                </p>
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-faint">
                  tip: select any text in the lecture → “explain this”
                </p>
              </div>
            )}
            <div className="space-y-4">
              {lp.chat.map((m, i) => (
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
                    <div className="font-mono text-[11px] text-faint">
                      thinking…
                    </div>
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
                ⌘K toggles · thread saved per lesson
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
