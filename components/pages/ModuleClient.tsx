'use client';

import Link from 'next/link';
import type { LessonMeta, ModuleMeta } from '@/lib/types';
import { useProgress } from '@/lib/progress/provider';
import { questionsForLesson } from '@/content/questions';

export function ModuleClient({
  mod,
  lessons,
}: {
  mod: ModuleMeta;
  lessons: LessonMeta[];
}) {
  const { state } = useProgress();

  const questionCount = lessons.reduce(
    (n, l) => n + questionsForLesson(l.id).filter((q) => q.kind !== 'code').length,
    0,
  );

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-10">
      <div className="mb-1 font-mono text-[11px]">
        <Link href={`/course/${mod.courseId}`} className="text-muted hover:text-ink">
          ← course
        </Link>
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        Module {String(mod.number).padStart(2, '0')}
      </div>
      <h1 className="mt-1 font-display text-[2rem] font-bold tracking-tight">
        {mod.title}
      </h1>
      <p className="mt-2 max-w-[60ch] text-[15px] text-ink-soft">{mod.blurb}</p>
      <p className="mt-2 font-mono text-[11px] text-faint">
        anchors: {mod.anchors.join(' · ')}
      </p>

      <h2 className="mb-3 mt-10 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
        Lessons
      </h2>
      <div className="flex flex-col gap-2">
        {lessons.length === 0 && (
          <p className="rounded border border-dashed border-line-strong bg-paper px-4 py-3 font-mono text-[12px] text-muted">
            No lessons yet — drop an MDX file into content/lessons/.
          </p>
        )}
        {lessons.map((l) => {
          const lp = state.lessons[l.id];
          const status = lp?.completed
            ? 'done'
            : (lp?.blocksSeen.length ?? 0) > 0
              ? 'reading'
              : 'new';
          return (
            <Link
              key={l.id}
              href={`/lesson/${l.id}`}
              className="group flex items-center gap-4 rounded-md border border-line bg-panel px-4 py-3 transition-colors hover:border-ink"
            >
              <span className="font-mono text-[11px] text-faint">
                {String(l.order).padStart(2, '0')}
              </span>
              <span className="flex-1">
                <span className="font-display text-[15px] font-semibold tracking-tight group-hover:text-active-deep">
                  {l.title}
                </span>
                {l.stub && (
                  <span className="ml-2 font-mono text-[9.5px] uppercase text-faint">
                    stub
                  </span>
                )}
              </span>
              <span className="font-mono text-[10.5px] text-muted">
                ~{l.estimatedMinutes}m
              </span>
              <span
                className={`font-mono text-[10.5px] ${
                  status === 'done'
                    ? 'text-done'
                    : status === 'reading'
                      ? 'text-active'
                      : 'text-faint'
                }`}
              >
                {status === 'done' ? '✓ done' : status === 'reading' ? '· reading' : '· new'}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-panel p-4">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Module cheatsheets
          </div>
          <ul className="mt-2 space-y-1">
            {lessons.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/lesson/${l.id}/cheatsheet`}
                  className="font-mono text-[12px] text-active hover:underline"
                >
                  {l.title} ↗
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-line bg-panel p-4">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Module exam
          </div>
          <p className="mt-2 text-[13px] text-ink-soft">
            Every question from every lesson in this module, shuffled.
          </p>
          <Link
            href={`/practice?module=${mod.slug}`}
            className="mt-3 inline-block rounded border-[1.5px] border-ink bg-panel px-3 py-1.5 font-mono text-[11.5px] hover:bg-active-wash"
          >
            start exam ({questionCount} questions) →
          </Link>
        </div>
      </div>
    </div>
  );
}
