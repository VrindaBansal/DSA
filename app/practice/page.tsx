import { getAllLessons } from '@/lib/content';
import { PracticeClient } from '@/components/pages/PracticeClient';

export const metadata = { title: 'Practice' };

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const { module } = await searchParams;
  const lessons = getAllLessons().map((l) => l.meta);
  return <PracticeClient lessons={lessons} moduleFilter={module ?? null} />;
}
