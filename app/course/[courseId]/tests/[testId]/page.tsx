import { notFound } from 'next/navigation';
import { COURSES } from '@/lib/courses';
import { getCourseLessons } from '@/lib/content';
import { TESTS, TEST_BY_ID } from '@/content/courses/gre/tests';
import { TestClient } from '@/components/tests/TestClient';

export function generateStaticParams() {
  return COURSES.filter((c) => c.tests).flatMap((c) => TESTS.map((t) => ({ courseId: c.id, testId: t.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = await params;
  return { title: TEST_BY_ID[testId]?.title ?? 'Practice test' };
}

export default async function TestPage({ params }: { params: Promise<{ courseId: string; testId: string }> }) {
  const { courseId, testId } = await params;
  const test = TEST_BY_ID[testId];
  if (!test || !COURSES.find((c) => c.id === courseId)?.tests) notFound();
  const lessons = getCourseLessons(courseId).map((l) => ({ id: l.meta.id, title: l.meta.title }));
  // Only this test's content is sent to the browser.
  return <TestClient test={test} lessons={lessons} />;
}
