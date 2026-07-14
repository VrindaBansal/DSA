import { getAllLessons } from '@/lib/content';
import { CodePracticeClient } from '@/components/pages/CodePracticeClient';

export const metadata = { title: 'Coding exercises' };

export default function CodePracticePage() {
  const lessons = getAllLessons().map((l) => l.meta);
  return <CodePracticeClient lessons={lessons} />;
}
