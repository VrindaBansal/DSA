'use client';

import Link from 'next/link';
import type { LessonMeta, ModuleMeta } from '@/lib/types';
import { useProgress } from '@/lib/progress/provider';

// Dashboard (spec §4): module grid, progress, resume, review due. No streaks,
// no confetti — "N due today" and nothing else (§11).

export function DashboardClient({
  modules,
  lessons,
}: {
  modules: ModuleMeta[];
  lessons: LessonMeta[];
}) {
  const { state, ready, dueReview } = useProgress();
  const due = ready ? dueReview().length : 0;

  const lastLesson = state.lastLesson
    ? lessons.find((l) => l.id === state.lastLesson)
    : undefined;

  const byModule = (slug: string) =>
    lessons.filter((l) => l.module === slug).sort((a, b) => a.order - b.order);

  const completedCount = (slug: string) =>
    byModule(slug).filter((l) => state.lessons[l.id]?.completed).length;

  const totalCompleted = lessons.filter(
    (l) => state.lessons[l.id]?.completed,
  ).length;
  const totalAuthored = lessons.filter((l) => !l.stub).length;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] font-bold tracking-tight">
            Curriculum
          </h1>
          <p className="mt-1 font-mono text-[12px] text-muted">
            {totalCompleted}/{lessons.length} lessons finished ·{' '}
            {totalAuthored} fully authored, {lessons.length - totalAuthored}{' '}
            stubs
          </p>
        </div>
        <div className="flex items-center gap-3">
          {due > 0 && (
            <Link
              href="/review"
              className="rounded-md border-[1.5px] border-ink bg-panel px-4 py-2.5 font-mono text-[12px] hover:bg-active-wash"
            >
              <span className="font-semibold text-active-deep">{due} due</span>{' '}
              in review
            </Link>
          )}
          {lastLesson && (
            <Link
              href={`/lesson/${lastLesson.id}`}
              className="rounded-md border-[1.5px] border-active bg-active px-4 py-2.5 font-mono text-[12px] text-white hover:bg-active-deep"
            >
              resume · {lastLesson.title} →
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => {
          const ls = byModule(m.slug);
          const done = completedCount(m.slug);
          const started = ls.some(
            (l) => (state.lessons[l.id]?.blocksSeen.length ?? 0) > 0,
          );
          return (
            <Link
              key={m.slug}
              href={`/module/${m.slug}`}
              className="group flex flex-col rounded-md border border-line bg-panel p-5 transition-colors hover:border-ink"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-faint">
                  {String(m.number).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] text-muted">
                  {done}/{ls.length || '—'}
                  {done === ls.length && ls.length > 0 ? ' ✓' : ''}
                </span>
              </div>
              <h2 className="mt-1 font-display text-[17px] font-semibold leading-snug tracking-tight group-hover:text-active-deep">
                {m.title}
              </h2>
              <p className="mt-1.5 flex-1 text-[13px] leading-snug text-muted">
                {m.blurb}
              </p>
              {/* progress rule */}
              <div className="mt-4 h-[3px] w-full bg-line">
                <div
                  className={`h-full ${done === ls.length && ls.length > 0 ? 'bg-done' : 'bg-active'}`}
                  style={{
                    width: ls.length
                      ? `${(done / ls.length) * 100}%`
                      : started
                        ? '4%'
                        : '0%',
                  }}
                />
              </div>
              <p className="mt-2 font-mono text-[10px] leading-relaxed text-faint">
                {m.anchors[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
