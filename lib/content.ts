import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { LessonMeta } from './types';
import { MODULES } from './modules';

// Git is the CMS (spec §3): lessons are MDX files at content/lessons/<id>/lesson.mdx.
// Adding a lesson = dropping in a directory; nothing here needs to change.

const LESSONS_DIR = path.join(process.cwd(), 'content', 'lessons');

export interface LoadedLesson {
  meta: LessonMeta;
  /** Raw MDX body (frontmatter stripped) — also injected into tutor context. */
  source: string;
}

let cache: LoadedLesson[] | null = null;

export function getAllLessons(): LoadedLesson[] {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  const dirs = fs.existsSync(LESSONS_DIR)
    ? fs.readdirSync(LESSONS_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
    : [];
  const lessons: LoadedLesson[] = [];
  for (const dir of dirs) {
    const file = path.join(LESSONS_DIR, dir.name, 'lesson.mdx');
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    lessons.push({
      meta: {
        id: data.id ?? dir.name,
        module: data.module,
        title: data.title,
        order: data.order ?? 99,
        estimatedMinutes: data.estimatedMinutes ?? 30,
        prerequisites: data.prerequisites ?? [],
        objectives: data.objectives ?? [],
        tags: data.tags ?? [],
        stub: data.stub ?? false,
      },
      source: content,
    });
  }
  const moduleOrder = new Map(MODULES.map((m) => [m.slug, m.number]));
  lessons.sort(
    (a, b) =>
      (moduleOrder.get(a.meta.module) ?? 99) - (moduleOrder.get(b.meta.module) ?? 99) ||
      a.meta.order - b.meta.order,
  );
  cache = lessons;
  return lessons;
}

export const getLesson = (id: string): LoadedLesson | undefined =>
  getAllLessons().find((l) => l.meta.id === id);

export const getModuleLessons = (moduleSlug: string): LoadedLesson[] =>
  getAllLessons().filter((l) => l.meta.module === moduleSlug);

/** Previous/next lesson in curriculum order, for footer navigation. */
export function getLessonNeighbors(id: string): {
  prev?: LessonMeta;
  next?: LessonMeta;
} {
  const all = getAllLessons();
  const i = all.findIndex((l) => l.meta.id === id);
  return {
    prev: i > 0 ? all[i - 1].meta : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1].meta : undefined,
  };
}
