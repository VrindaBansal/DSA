import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { LessonMeta } from './types';
import { MODULES } from './modules';

// Git is the CMS: lessons live at content/courses/<courseId>/lessons/<id>/lesson.mdx.
// Adding a lesson = dropping in a directory under a course; adding a course =
// dropping in a course folder + registering it in lib/courses.ts. The courseId
// is derived from the folder path, so lesson frontmatter never repeats it.

const COURSES_DIR = path.join(process.cwd(), 'content', 'courses');

export interface LoadedLesson {
  meta: LessonMeta;
  /** Raw MDX body (frontmatter stripped) — also injected into tutor context. */
  source: string;
}

let cache: LoadedLesson[] | null = null;

export function getAllLessons(): LoadedLesson[] {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  const lessons: LoadedLesson[] = [];

  const courseDirs = fs.existsSync(COURSES_DIR)
    ? fs.readdirSync(COURSES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory())
    : [];

  for (const course of courseDirs) {
    const lessonsDir = path.join(COURSES_DIR, course.name, 'lessons');
    if (!fs.existsSync(lessonsDir)) continue;
    const dirs = fs
      .readdirSync(lessonsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());
    for (const dir of dirs) {
      const file = path.join(lessonsDir, dir.name, 'lesson.mdx');
      if (!fs.existsSync(file)) continue;
      const raw = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(raw);
      lessons.push({
        meta: {
          id: data.id ?? dir.name,
          module: data.module,
          courseId: course.name,
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

export const getCourseLessons = (courseId: string): LoadedLesson[] =>
  getAllLessons().filter((l) => l.meta.courseId === courseId);

/** Previous/next lesson in curriculum order, scoped to the same course. */
export function getLessonNeighbors(id: string): {
  prev?: LessonMeta;
  next?: LessonMeta;
} {
  const current = getLesson(id);
  if (!current) return {};
  const within = getCourseLessons(current.meta.courseId);
  const i = within.findIndex((l) => l.meta.id === id);
  return {
    prev: i > 0 ? within[i - 1].meta : undefined,
    next: i >= 0 && i < within.length - 1 ? within[i + 1].meta : undefined,
  };
}
