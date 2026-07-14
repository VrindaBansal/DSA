import { getAllLessons } from '@/lib/content';
import { ReferenceClient } from '@/components/pages/ReferenceClient';

export const metadata = { title: 'Reference' };

export default function ReferencePage() {
  const lessons = getAllLessons().map((l) => l.meta);
  return <ReferenceClient lessons={lessons} />;
}
