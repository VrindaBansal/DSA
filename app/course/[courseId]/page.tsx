import { notFound } from 'next/navigation';
import { getCourseLessons } from '@/lib/content';
import { getModulesForCourse } from '@/lib/modules';
import { COURSES, getCourse } from '@/lib/courses';
import { DashboardClient } from '@/components/pages/DashboardClient';

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return { title: getCourse(courseId)?.title ?? 'Course' };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();
  const modules = getModulesForCourse(courseId);
  const lessons = getCourseLessons(courseId).map((l) => l.meta);
  return <DashboardClient course={course} modules={modules} lessons={lessons} />;
}
