import { notFound } from 'next/navigation';
import { COURSES, getCourse } from '@/lib/courses';
import { buildDeck } from '@/content/courses/gre/flashcards';
import { FlashcardsClient } from '@/components/flashcards/FlashcardsClient';

export function generateStaticParams() {
  return COURSES.filter((c) => c.flashcards).map((c) => ({ courseId: c.id }));
}

export const metadata = { title: 'Vocab flashcards' };

export default async function FlashcardsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  if (!getCourse(courseId)?.flashcards) notFound();
  const { cards, families } = buildDeck();
  return <FlashcardsClient courseId={courseId} cards={cards} families={families} />;
}
