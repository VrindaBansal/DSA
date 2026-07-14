'use client';

import React from 'react';
import { useTutor } from './TutorContext';
import { TutorDrawer } from './TutorDrawer';

/**
 * The small, out-of-the-way way in: a bottom-right pill, never visible while
 * the drawer itself is open. Mounted once in the root layout so it — and the
 * drawer it opens — is available on every page, lesson or not.
 */
export function TutorLauncher() {
  const { open, openDrawer } = useTutor();
  return (
    <>
      {!open && (
        <button
          onClick={() => openDrawer()}
          className="no-print fixed bottom-5 right-5 z-40 rounded-full border-[1.5px] border-ink bg-panel px-4 py-2 font-mono text-[11.5px] shadow-md transition-colors hover:bg-active-wash"
          aria-label="open tutor"
        >
          ✦ tutor <span className="text-faint">⌘K</span>
        </button>
      )}
      <TutorDrawer />
    </>
  );
}
