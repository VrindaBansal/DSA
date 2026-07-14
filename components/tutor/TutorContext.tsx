'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type TutorTab = 'lesson' | 'general';

export interface ActiveLessonCtx {
  id: string;
  title: string;
  source: string;
  objectives: string[];
}

interface TutorApi {
  open: boolean;
  tab: TutorTab;
  activeLesson: ActiveLessonCtx | null;
  pendingAsk: string | null;
  setActiveLesson: (ctx: ActiveLessonCtx | null) => void;
  setTab: (tab: TutorTab) => void;
  openDrawer: (tab?: TutorTab) => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  /** "Explain this" from a text selection — forces the lesson tab open. */
  askInLesson: (question: string) => void;
  consumePendingAsk: () => void;
}

const Ctx = createContext<TutorApi | null>(null);

/**
 * Global tutor state (spec §8, extended): the drawer is mounted once at the
 * layout level so it — and its floating launcher button — is available on
 * every page, not just lesson pages. Lesson pages register themselves here
 * on mount so the drawer can offer a "This lesson" tab; leaving the lesson
 * clears it and the drawer falls back to "General".
 */
export function TutorProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [tab, setTabState] = useState<TutorTab>('general');
  const [activeLesson, setActiveLessonState] = useState<ActiveLessonCtx | null>(null);
  const [pendingAsk, setPendingAsk] = useState<string | null>(null);

  const setActiveLesson = useCallback((ctx: ActiveLessonCtx | null) => {
    setActiveLessonState(ctx);
    setTabState((t) => (ctx ? t : t === 'lesson' ? 'general' : t));
  }, []);

  const setTab = useCallback((t: TutorTab) => setTabState(t), []);
  const openDrawer = useCallback((t?: TutorTab) => {
    if (t) setTabState(t);
    setOpen(true);
  }, []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const toggleDrawer = useCallback(() => setOpen((o) => !o), []);

  const askInLesson = useCallback((question: string) => {
    setTabState('lesson');
    setOpen(true);
    setPendingAsk(question);
  }, []);

  const consumePendingAsk = useCallback(() => setPendingAsk(null), []);

  const api = useMemo<TutorApi>(
    () => ({
      open,
      tab,
      activeLesson,
      pendingAsk,
      setActiveLesson,
      setTab,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      askInLesson,
      consumePendingAsk,
    }),
    [
      open,
      tab,
      activeLesson,
      pendingAsk,
      setActiveLesson,
      setTab,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      askInLesson,
      consumePendingAsk,
    ],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useTutor(): TutorApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTutor must be used inside <TutorProvider>');
  return ctx;
}
