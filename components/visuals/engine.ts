'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Every visual is a deterministic sequence of frames. A frame is a snapshot of
// structure state + the currently executing Python line + a one-line note.
// The engine plays/steps/scrubs frames; "drive it yourself" splices freshly
// generated frames after the current one. (Spec §7.)
// ---------------------------------------------------------------------------

export interface Frame<S> {
  state: S;
  /** 0-based index into the code lines shown beside the SVG, or null. */
  line: number | null;
  note: string;
  /** Optional: which code tab this line belongs to (multi-algorithm visuals). */
  tab?: string;
}

export function makeEmitter<S>(frames: Frame<S>[]) {
  return (state: S, line: number | null, note: string, tab?: string) => {
    frames.push({ state: structuredClone(state), line, note, tab });
  };
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

export interface VisualEngine<S> {
  frame: Frame<S>;
  index: number;
  length: number;
  playing: boolean;
  speed: number;
  atStart: boolean;
  atEnd: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  stepFwd: () => void;
  stepBack: () => void;
  reset: () => void;
  setSpeed: (s: number) => void;
  /** Replace the whole program (e.g. new input) and jump to its first frame. */
  setProgram: (frames: Frame<S>[]) => void;
  /** Drive-it-yourself: splice frames after the current one and play them. */
  pushOp: (frames: Frame<S>[]) => void;
}

export function useVisualEngine<S>(
  initial: Frame<S>[],
  opts?: { autoplay?: boolean; baseMs?: number },
): VisualEngine<S> {
  const baseMs = opts?.baseMs ?? 850;
  const [frames, setFrames] = useState(initial);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const reduced = usePrefersReducedMotion();
  const initialRef = useRef(initial);

  useEffect(() => {
    if (!playing) return;
    if (index >= frames.length - 1) {
      setPlaying(false);
      return;
    }
    // Reduced motion keeps stepping — transitions are instant via CSS.
    const t = setTimeout(
      () => setIndex((i) => Math.min(i + 1, frames.length - 1)),
      reduced ? Math.max(400, baseMs / speed) : baseMs / speed,
    );
    return () => clearTimeout(t);
  }, [playing, index, frames.length, speed, baseMs, reduced]);

  const stepFwd = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.min(i + 1, frames.length - 1));
  }, [frames.length]);

  const stepBack = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setPlaying(false);
    setFrames(initialRef.current);
    setIndex(0);
  }, []);

  const setProgram = useCallback((f: Frame<S>[]) => {
    initialRef.current = f;
    setFrames(f);
    setIndex(0);
    setPlaying(false);
  }, []);

  const pushOp = useCallback((newFrames: Frame<S>[]) => {
    if (newFrames.length === 0) return;
    setFrames((prev) => {
      // splice after current frame; stale future is discarded
      return [...prev.slice(0, indexRef.current + 1), ...newFrames];
    });
    setIndex((i) => i); // keep position; playback advances into the new frames
    setPlaying(true);
  }, []);

  // keep a ref of index for pushOp's functional update
  const indexRef = useRef(index);
  indexRef.current = index;

  return useMemo(
    () => ({
      frame: frames[Math.min(index, frames.length - 1)],
      index,
      length: frames.length,
      playing,
      speed,
      atStart: index === 0,
      atEnd: index >= frames.length - 1,
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      toggle: () => setPlaying((p) => !p),
      stepFwd,
      stepBack,
      reset,
      setSpeed,
      setProgram,
      pushOp,
    }),
    [frames, index, playing, speed, stepFwd, stepBack, reset, setProgram, pushOp],
  );
}
