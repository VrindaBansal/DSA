import { notFound } from 'next/navigation';
import { getCourseLessons } from '@/lib/content';
import { COURSES, getCourse } from '@/lib/courses';
import { BankClient } from '@/components/pages/BankClient';

export function generateStaticParams() {
  return COURSES.filter((c) => c.bank).map((c) => ({ courseId: c.id }));
}

export const metadata = { title: 'Practice bank' };

export default async function BankPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course?.bank) notFound();
  const lessons = getCourseLessons(courseId).map((l) => l.meta);
  return <BankClient courseId={courseId} lessons={lessons} />;
}
