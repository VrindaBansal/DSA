'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@/lib/progress/provider';
import { useTutor } from '@/components/tutor/TutorContext';

/**
 * Client wrapper around the server-rendered lecture: visit tracking,
 * registering this lesson with the global tutor context (so the drawer can
 * offer a "This lesson" tab), and select-to-explain (spec §8).
 */
export function LessonShell({
  lessonId,
  lessonTitle,
  lessonSource,
  objectives,
  children,
}: {
  lessonId: string;
  lessonTitle: string;
  lessonSource: string;
  objectives: string[];
  children: React.ReactNode;
}) {
  const { visitLesson } = useProgress();
  const { setActiveLesson, askInLesson } = useTutor();
  const [selBtn, setSelBtn] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    visitLesson(lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  // Register/unregister this lesson with the global tutor so the drawer's
  // "This lesson" tab exists exactly while this page is mounted.
  useEffect(() => {
    setActiveLesson({ id: lessonId, title: lessonTitle, source: lessonSource, objectives });
    return () => setActiveLesson(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, lessonTitle, lessonSource, objectives]);

  // "Explain this": floating button on text selection inside the lecture.
  useEffect(() => {
    const onUp = () => {
      // let the selection settle
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          setSelBtn(null);
          return;
        }
        const text = sel.toString().trim();
        if (text.length < 8 || text.length > 600) {
          setSelBtn(null);
          return;
        }
        const node =
          sel.anchorNode instanceof Element
            ? sel.anchorNode
            : sel.anchorNode?.parentElement;
        if (!node || !articleRef.current?.contains(node)) {
          setSelBtn(null);
          return;
        }
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setSelBtn({
          x: Math.min(rect.left + rect.width / 2, window.innerWidth - 120),
          y: rect.top,
          text,
        });
      }, 0);
    };
    document.addEventListener('mouseup', onUp);
    document.addEventListener('selectionchange', () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) setSelBtn(null);
    });
    return () => document.removeEventListener('mouseup', onUp);
  }, []);

  const explain = () => {
    if (!selBtn) return;
    const block = (
      window.getSelection()?.anchorNode?.parentElement ?? null
    )?.closest('[data-block]');
    const blockId = block?.getAttribute('data-block');
    askInLesson(
      `Explain this passage from the lesson${blockId ? ` (block ${blockId})` : ''}:\n\n> ${selBtn.text}\n\nWhy is this true — and what am I most likely missing about it?`,
    );
    setSelBtn(null);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <>
      <div ref={articleRef}>{children}</div>

      {selBtn && (
        <button
          onClick={explain}
          style={{ left: selBtn.x, top: Math.max(selBtn.y - 40, 8) }}
          className="no-print fixed z-50 -translate-x-1/2 rounded border-[1.5px] border-ink bg-panel px-2.5 py-1 font-mono text-[11px] shadow-md hover:bg-active-wash"
        >
          ✦ explain this
        </button>
      )}
    </>
  );
}
