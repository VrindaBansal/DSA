import { getAllLessons } from '@/lib/content';
import { MODULES } from '@/lib/modules';
import { COURSES } from '@/lib/courses';
import { CoursePickerClient } from '@/components/pages/CoursePickerClient';

export default function HomePage() {
  const lessons = getAllLessons().map((l) => l.meta);
  return (
    <CoursePickerClient courses={COURSES} modules={MODULES} lessons={lessons} />
  );
}
