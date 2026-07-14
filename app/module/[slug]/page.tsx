import { notFound } from 'next/navigation';
import { getModuleLessons } from '@/lib/content';
import { getModule, MODULES } from '@/lib/modules';
import { ModuleClient } from '@/components/pages/ModuleClient';

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();
  const lessons = getModuleLessons(slug).map((l) => l.meta);
  return <ModuleClient mod={mod} lessons={lessons} />;
}
