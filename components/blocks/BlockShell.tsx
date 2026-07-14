'use client';

import React, { useEffect, useRef } from 'react';
import { useProgress } from '@/lib/progress/provider';

/**
 * Wraps every authored block: reports "I scrolled past this" to the progress
 * store (feeds the tutor's where-am-I context, spec §8) via IntersectionObserver.
 */
export function BlockShell({
  lessonId,
  blockId,
  children,
  className,
  onSeen,
}: {
  lessonId: string;
  blockId: string;
  children: React.ReactNode;
  className?: string;
  onSeen?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { markBlockSeen } = useProgress();
  const seenRef = useRef(false);
  const onSeenRef = useRef(onSeen);
  onSeenRef.current = onSeen;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !seenRef.current) {
            seenRef.current = true;
            markBlockSeen(lessonId, blockId);
            onSeenRef.current?.();
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, blockId]);

  return (
    <div ref={ref} data-block={blockId} className={className}>
      {children}
    </div>
  );
}
