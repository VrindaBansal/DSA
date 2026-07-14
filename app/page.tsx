import { getAllLessons } from '@/lib/content';
import { MODULES } from '@/lib/modules';
import { DashboardClient } from '@/components/pages/DashboardClient';

export default function DashboardPage() {
  const lessons = getAllLessons().map((l) => l.meta);
  return <DashboardClient modules={MODULES} lessons={lessons} />;
}
