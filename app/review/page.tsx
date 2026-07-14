import { getAllLessons } from '@/lib/content';
import { ReviewClient } from '@/components/pages/ReviewClient';

export const metadata = { title: 'Review' };

export default function ReviewPage() {
  const lessons = getAllLessons().map((l) => l.meta);
  return <ReviewClient lessons={lessons} />;
}
