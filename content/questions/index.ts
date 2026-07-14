import type { Question } from '@/lib/types';
import { QUESTIONS as queues } from '../lessons/queues/questions';
import { QUESTIONS as deques } from '../lessons/deques/questions';
import { QUESTIONS as bigO } from '../lessons/big-o/questions';
import { QUESTIONS as amortized } from '../lessons/amortized/questions';
import { QUESTIONS as space } from '../lessons/space-complexity/questions';
import { QUESTIONS as recursionTrees } from '../lessons/recursion-trees/questions';
import { QUESTIONS as stubs } from './stub-questions';

// One line per lesson bank — the practice engine and the spaced-repetition
// engine both consume this, independently of the MDX (spec §5.2).
export const ALL_QUESTIONS: Question[] = [
  ...bigO,
  ...amortized,
  ...space,
  ...recursionTrees,
  ...queues,
  ...deques,
  ...stubs,
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q]),
);

export const questionsForLesson = (lessonId: string): Question[] =>
  ALL_QUESTIONS.filter((q) => q.lessonId === lessonId);
