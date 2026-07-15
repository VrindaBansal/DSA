import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllLessons, getLesson, getLessonNeighbors } from '@/lib/content';
import { getModule } from '@/lib/modules';
import { makeMdxComponents } from '@/components/blocks/mdx-components';
import { LessonShell } from '@/components/lesson/LessonShell';

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.meta.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return { title: lesson?.meta.title ?? 'Lesson' };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const { meta, source } = lesson;
  const mod = getModule(meta.module);
  const { prev, next } = getLessonNeighbors(meta.id);

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10">
      <LessonShell
        lessonId={meta.id}
        lessonTitle={meta.title}
        lessonSource={source}
        objectives={meta.objectives}
      >
        {/* header */}
        <header className="mb-10">
          {mod && (
            <Link
              href={`/module/${mod.slug}`}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-active"
            >
              Module {String(mod.number).padStart(2, '0')} · {mod.title}
            </Link>
          )}
          <h1 className="mt-2 font-display text-[2.3rem] font-bold leading-[1.12] tracking-tight">
            {meta.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
            <span>~{meta.estimatedMinutes} min</span>
            {meta.prerequisites.length > 0 && (
              <span>
                needs:{' '}
                {meta.prerequisites.map((p, i) => (
                  <React.Fragment key={p}>
                    {i > 0 && ', '}
                    <Link href={`/lesson/${p}`} className="text-active hover:underline">
                      {p}
                    </Link>
                  </React.Fragment>
                ))}
              </span>
            )}
            <span className="text-faint">{meta.tags.join(' · ')}</span>
          </div>

          {meta.objectives.length > 0 && (
            <div className="mt-6 rounded-md border border-line bg-panel px-5 py-4">
              <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                After this lesson you can
              </div>
              <ul className="space-y-1.5 text-[14px] leading-snug">
                {meta.objectives.map((o, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="font-mono text-[11px] text-active">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meta.stub && (
            <div className="mt-6 rounded-md border border-dashed border-line-strong bg-paper px-5 py-3 font-mono text-[11.5px] text-muted">
              STUB — objectives, key visual, and cheatsheet skeleton only. The
              full lecture lands here later; the structure is ready for it.
            </div>
          )}
        </header>

        {/* the lecture */}
        <article className="lesson-prose">
          <MDXRemote
            source={source}
            components={makeMdxComponents(meta.id)}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm] },
              // Lessons are trusted, repository-owned content and use JS
              // expressions for structured component props (for example,
              // CodeWalk's lines array). Keep dangerous globals blocked.
              blockJS: false,
            }}
          />
        </article>

        {/* footer nav */}
        <footer className="no-print mt-14 flex items-center justify-between border-t border-line pt-5 font-mono text-[12px]">
          {prev ? (
            <Link href={`/lesson/${prev.id}`} className="text-muted hover:text-ink">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/lesson/${next.id}`} className="text-right text-muted hover:text-ink">
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </footer>
      </LessonShell>
    </div>
  );
}
