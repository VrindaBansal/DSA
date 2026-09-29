'use client';

import Link from 'next/link';
import type React from 'react';
import type { AppState, LessonMeta, ModuleMeta } from '@/lib/types';
import type { CourseMeta, CourseSection } from '@/lib/courses';
import { useProgress } from '@/lib/progress/provider';

// A single course's dashboard: module grid, progress, resume, review due —
// scoped to this course. "N due today" and nothing else.

export function DashboardClient({
  course,
  modules,
  lessons,
}: {
  course: CourseMeta;
  modules: ModuleMeta[];
  lessons: LessonMeta[];
}) {
  const { state, ready, dueReview } = useProgress();

  const lessonIds = new Set(lessons.map((l) => l.id));
  // review items belonging to this course's lessons
  const due = ready
    ? dueReview().filter((r) => lessonIds.has(r.lessonId)).length
    : 0;

  // resume = most-recently-visited lesson in THIS course
  const lastLesson = ready
    ? lessons
        .filter((l) => state.lessons[l.id]?.lastVisited)
        .sort(
          (a, b) =>
            (state.lessons[b.id]?.lastVisited ?? 0) -
            (state.lessons[a.id]?.lastVisited ?? 0),
        )[0]
    : undefined;

  const byModule = (slug: string) =>
    lessons.filter((l) => l.module === slug).sort((a, b) => a.order - b.order);

  const totalCompleted = lessons.filter(
    (l) => state.lessons[l.id]?.completed,
  ).length;
  const totalAuthored = lessons.filter((l) => !l.stub).length;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-1 font-mono text-[11px]">
            <Link href="/" className="text-muted hover:text-ink">
              ← all courses
            </Link>
          </div>
          <h1 className="font-display text-[2rem] font-bold tracking-tight">
            {course.title}
          </h1>
          <p className="mt-1 max-w-[62ch] text-[14px] text-ink-soft">
            {course.blurb}
          </p>
          <p className="mt-1.5 font-mono text-[12px] text-muted">
            {totalCompleted}/{lessons.length} lessons finished · {totalAuthored}{' '}
            fully authored, {lessons.length - totalAuthored} stubs
          </p>
        </div>
        <div className="flex items-center gap-3">
          {due > 0 && (
            <Link
              href={`/review?course=${course.id}`}
              className="rounded-md border-[1.5px] border-ink bg-panel px-4 py-2.5 font-mono text-[12px] hover:bg-active-wash"
            >
              <span className="font-semibold text-active-deep">{due} due</span> in
              review
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

      {(course.bank || course.planLessonId || course.tests) && (
        <div className={`mb-6 grid gap-4 sm:grid-cols-2 ${course.tests ? 'lg:grid-cols-3' : ''}`}>
          {course.planLessonId && (
            <Link
              href={`/lesson/${course.planLessonId}`}
              className="group rounded-md border-[1.5px] border-ink bg-panel p-5 transition-colors hover:bg-active-wash/30"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Start here</div>
              <div className="mt-1 font-display text-[17px] font-semibold group-hover:text-active-deep">
                Your week-by-week study plan →
              </div>
              <p className="mt-1 text-[13px] text-muted">
                What to do each week: which lessons, how many practice sets, when to take timed sections.
              </p>
            </Link>
          )}
          {course.bank && (
            <Link
              href={`/course/${course.id}/bank`}
              className="group rounded-md border-[1.5px] border-active bg-active-wash/40 p-5 transition-colors hover:bg-active-wash"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-active-deep">Practice bank</div>
              <div className="mt-1 font-display text-[17px] font-semibold group-hover:text-active-deep">
                11,000+ questions, sets, drills & timed sections →
              </div>
              <p className="mt-1 text-[13px] text-muted">
                {ready
                  ? `${Object.keys(state.bank.answers).filter((id) => id.startsWith('gre.')).length.toLocaleString('en-US')} answered so far · feedback on every choice`
                  : 'feedback on every choice'}
              </p>
            </Link>
          )}
          {course.tests && (
            <Link
              href={`/course/${course.id}/tests`}
              className="group rounded-md border-[1.5px] border-ink bg-panel p-5 transition-colors hover:bg-active-wash/30"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Full-length tests</div>
              <div className="mt-1 font-display text-[17px] font-semibold group-hover:text-active-deep">
                10 practice tests, real GRE format →
              </div>
              <p className="mt-1 text-[13px] text-muted">
                {ready && Object.values(state.tests ?? {}).some((h) => h.length)
                  ? (() => {
                      const all = Object.values(state.tests).flat().sort((a, b) => a.at - b.at);
                      const last = all[all.length - 1];
                      return `${Object.values(state.tests).filter((h) => h.length).length} of 10 taken · latest V ${last.verbal.scaled} · Q ${last.quant.scaled}`;
                    })()
                  : '5 timed with essay · 5 untimed, no essay · estimated scores'}
              </p>
            </Link>
          )}
        </div>
      )}

      {course.sections ? (
        <SectionedModules
          sections={course.sections}
          modules={modules}
          byModule={byModule}
          isDone={(id) => !!state.lessons[id]?.completed}
          card={(m, n, wide) => (
            <ModuleCard key={m.slug} m={m} n={n} wide={wide} lessons={byModule(m.slug)} state={state} />
          )}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <ModuleCard key={m.slug} m={m} n={m.number} lessons={byModule(m.slug)} state={state} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModuleCard({
  m,
  n,
  wide,
  lessons,
  state,
}: {
  m: ModuleMeta;
  /** Number shown on the card (position within its section, if any). */
  n: number;
  /** Full-width row layout, for single-module framing sections. */
  wide?: boolean;
  lessons: LessonMeta[];
  state: AppState;
}) {
  const done = lessons.filter((l) => state.lessons[l.id]?.completed).length;
  const started = lessons.some((l) => (state.lessons[l.id]?.blocksSeen.length ?? 0) > 0);
  const complete = done === lessons.length && lessons.length > 0;
  const bar = (
    <div className="h-[3px] w-full bg-line">
      <div
        className={`h-full ${complete ? 'bg-done' : 'bg-active'}`}
        style={{ width: lessons.length ? `${(done / lessons.length) * 100}%` : started ? '4%' : '0%' }}
      />
    </div>
  );
  const count = (
    <span className="font-mono text-[10px] text-muted">
      {done}/{lessons.length || '—'}
      {complete ? ' ✓' : ''}
    </span>
  );
  if (wide)
    return (
      <Link
        href={`/module/${m.slug}`}
        className="group flex flex-wrap items-center gap-x-6 gap-y-2 rounded-md border border-line bg-panel px-5 py-4 transition-colors hover:border-ink"
      >
        <div className="min-w-[16rem] flex-1">
          <h3 className="font-display text-[16px] font-semibold tracking-tight group-hover:text-active-deep">{m.title}</h3>
          <p className="mt-0.5 text-[13px] leading-snug text-muted">{m.blurb}</p>
        </div>
        <div className="w-40">
          <div className="mb-1 text-right">{count}</div>
          {bar}
        </div>
      </Link>
    );
  return (
    <Link
      href={`/module/${m.slug}`}
      className="group flex flex-col rounded-md border border-line bg-panel p-5 transition-colors hover:border-ink"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] text-faint">{String(n).padStart(2, '0')}</span>
        {count}
      </div>
      <h2 className="mt-1 font-display text-[17px] font-semibold leading-snug tracking-tight group-hover:text-active-deep">
        {m.title}
      </h2>
      <p className="mt-1.5 flex-1 text-[13px] leading-snug text-muted">{m.blurb}</p>
      <div className="mt-4">{bar}</div>
      <p className="mt-2 font-mono text-[10px] leading-relaxed text-faint">{m.anchors[0]}</p>
    </Link>
  );
}

/**
 * Modules grouped into the course's sections. Subject sections (e.g. GRE
 * Math and English) sit side by side, each with its own progress and next
 * lesson, so the two tracks read as separate curricula; framing sections
 * (getting started, test day) run full width above and below.
 */
function SectionedModules({
  sections,
  modules,
  byModule,
  isDone,
  card,
}: {
  sections: CourseSection[];
  modules: ModuleMeta[];
  byModule: (slug: string) => LessonMeta[];
  isDone: (lessonId: string) => boolean;
  card: (m: ModuleMeta, n: number, wide?: boolean) => React.ReactNode;
}) {
  // Consecutive subject sections render together in one side-by-side row.
  const runs: CourseSection[][] = [];
  for (const sec of sections) {
    const last = runs[runs.length - 1];
    if (sec.subject && last?.[0]?.subject) last.push(sec);
    else runs.push([sec]);
  }
  return (
    <div className="space-y-10">
      {runs.map((run) =>
        run[0].subject ? (
          <div key={run[0].id} className={`grid gap-8 ${run.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {run.map((sec) => {
              const mods = modules.filter((m) => m.section === sec.id);
              const ls = mods.flatMap((m) => byModule(m.slug));
              const done = ls.filter((l) => isDone(l.id)).length;
              const next = ls.find((l) => !isDone(l.id));
              return (
                <section key={sec.id} aria-labelledby={`section-${sec.id}`} data-section={sec.id} className="min-w-0">
                  <div className="mb-4">
                    {sec.subtitle && (
                      <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">{sec.subtitle}</div>
                    )}
                    <h2 id={`section-${sec.id}`} className="font-display text-[1.7rem] font-bold leading-tight tracking-tight">
                      {sec.title}
                    </h2>
                    <div className="mt-1.5 flex items-baseline gap-3 font-mono text-[11px]">
                      <span className="shrink-0 text-muted">
                        {mods.length} modules · {done}/{ls.length} lessons
                      </span>
                      {next ? (
                        <Link href={`/lesson/${next.id}`} className="min-w-0 truncate text-active hover:underline" title={next.title}>
                          next: {next.title} →
                        </Link>
                      ) : (
                        <span className="text-done">section complete ✓</span>
                      )}
                    </div>
                    <div className="mt-2 h-[4px] w-full bg-line-strong">
                      <div
                        className={`h-full ${ls.length && done === ls.length ? 'bg-done' : 'bg-active'}`}
                        style={{ width: ls.length ? `${(100 * done) / ls.length}%` : '0%' }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">{mods.map((m, i) => card(m, i + 1))}</div>
                </section>
              );
            })}
          </div>
        ) : (
          run.map((sec) => {
            const mods = modules.filter((m) => m.section === sec.id);
            if (!mods.length) return null;
            return (
              <section key={sec.id} aria-labelledby={`section-${sec.id}`} data-section={sec.id}>
                <h2
                  id={`section-${sec.id}`}
                  className="mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted"
                >
                  {sec.title}
                </h2>
                <div className="grid gap-3">{mods.map((m, i) => card(m, i + 1, true))}</div>
              </section>
            );
          })
        ),
      )}
    </div>
  );
}
