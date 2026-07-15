'use client';

import Link from 'next/link';
import type { LessonMeta, ModuleMeta } from '@/lib/types';
import type { CourseMeta } from '@/lib/courses';
import { useProgress } from '@/lib/progress/provider';

// The top-level course picker (multi-course home). Each card shows the course's
// promise plus your progress through it. No course selected = this screen.

export function CoursePickerClient({
  courses,
  modules,
  lessons,
}: {
  courses: CourseMeta[];
  modules: ModuleMeta[];
  lessons: LessonMeta[];
}) {
  const { state, ready } = useProgress();

  const courseLessons = (id: string) => lessons.filter((l) => l.courseId === id);
  const courseModules = (id: string) => modules.filter((m) => m.courseId === id);
  const completed = (id: string) =>
    courseLessons(id).filter((l) => state.lessons[l.id]?.completed).length;
  const lastInCourse = (id: string) => {
    if (!ready) return undefined;
    const ls = courseLessons(id)
      .filter((l) => state.lessons[l.id]?.lastVisited)
      .sort(
        (a, b) =>
          (state.lessons[b.id]?.lastVisited ?? 0) -
          (state.lessons[a.id]?.lastVisited ?? 0),
      );
    return ls[0];
  };

  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-14">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Invariant
      </div>
      <h1 className="font-display text-[2.3rem] font-bold leading-[1.1] tracking-tight">
        Pick a course
      </h1>
      <p className="mt-2 max-w-[60ch] text-[15px] text-ink-soft">
        Concept-first, anchored in real systems, tested constantly — and a tutor
        that sees the whole curriculum. Two courses, one method.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {courses.map((c) => {
          const ls = courseLessons(c.id);
          const done = completed(c.id);
          const mods = courseModules(c.id);
          const resume = lastInCourse(c.id);
          const pct = ls.length ? Math.round((done / ls.length) * 100) : 0;
          return (
            <Link
              key={c.id}
              href={`/course/${c.id}`}
              className="group flex flex-col rounded-lg border-[1.5px] border-ink bg-panel p-6 transition-colors hover:bg-active-wash/30"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {mods.length} modules · {ls.length} lessons
                </span>
                {ready && done > 0 && (
                  <span className="font-mono text-[10px] text-done">
                    {done}/{ls.length} ✓
                  </span>
                )}
              </div>
              <h2 className="mt-2 font-display text-[1.35rem] font-bold leading-tight tracking-tight group-hover:text-active-deep">
                {c.title}
              </h2>
              <p className="mt-2 flex-1 text-[13.5px] leading-snug text-ink-soft">
                {c.tagline}
              </p>
              <div className="mt-4 h-[3px] w-full bg-line">
                <div
                  className={`h-full ${pct === 100 ? 'bg-done' : 'bg-active'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px]">
                <span className="text-active group-hover:underline">
                  {resume ? 'continue' : 'start'} →
                </span>
                {resume && (
                  <span className="max-w-[60%] truncate text-faint">
                    {resume.title}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex flex-wrap gap-4 font-mono text-[12px] text-muted">
        <Link href="/practice" className="hover:text-ink">
          → practice (all courses)
        </Link>
        <Link href="/review" className="hover:text-ink">
          → review queue
        </Link>
        <Link href="/reference" className="hover:text-ink">
          → reference
        </Link>
      </div>
    </div>
  );
}
