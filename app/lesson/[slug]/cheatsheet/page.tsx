import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllLessons, getLesson } from '@/lib/content';
import { getModule } from '@/lib/modules';
import { CheatsheetBody, MyNotes } from '@/components/blocks/Cheatsheet';
import { CHEATSHEET_BY_LESSON } from '@/content/cheatsheets';
import { PrintButton } from '@/components/chrome/PrintButton';

// Standalone printable cheatsheet (spec §4, §10) — the night-before view.

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.meta.id }));
}

export default async function CheatsheetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const data = CHEATSHEET_BY_LESSON[slug];
  const mod = getModule(lesson.meta.module);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="no-print mb-6 flex items-center justify-between">
        <Link
          href={`/lesson/${slug}`}
          className="font-mono text-[12px] text-muted hover:text-ink"
        >
          ← back to lesson
        </Link>
        <PrintButton />
      </div>

      <div className="print-sheet rounded-md border-[1.5px] border-ink bg-panel p-7">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Invariant · cheatsheet
          {mod ? ` · module ${String(mod.number).padStart(2, '0')}` : ''}
        </div>
        <h1 className="mb-6 font-display text-[1.7rem] font-bold tracking-tight">
          {lesson.meta.title}
        </h1>
        {data ? (
          <CheatsheetBody data={data} />
        ) : (
          <p className="text-muted">No cheatsheet data for this lesson yet.</p>
        )}
        <MyNotes lessonId={slug} />
      </div>
    </div>
  );
}
