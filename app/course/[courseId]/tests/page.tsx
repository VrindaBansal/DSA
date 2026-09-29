import { notFound } from 'next/navigation';
import { COURSES, getCourse } from '@/lib/courses';
import { TESTS } from '@/content/courses/gre/tests';
import { TestsHomeClient } from '@/components/tests/TestsHomeClient';

export function generateStaticParams() {
  return COURSES.filter((c) => c.tests).map((c) => ({ courseId: c.id }));
}

export const metadata = { title: 'Practice tests' };

export default async function TestsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  if (!getCourse(courseId)?.tests) notFound();
  const tests = TESTS.map((t) => ({
    id: t.id,
    number: t.number,
    title: t.title,
    order: t.order,
    timed: t.timed !== false,
    essay: !!t.essay,
  }));
  return <TestsHomeClient courseId={courseId} tests={tests} />;
}
