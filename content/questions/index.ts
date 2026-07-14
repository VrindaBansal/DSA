import type { Question } from '@/lib/types';
import { QUESTIONS as bigO } from '../lessons/big-o/questions';
import { QUESTIONS as amortized } from '../lessons/amortized/questions';
import { QUESTIONS as space } from '../lessons/space-complexity/questions';
import { QUESTIONS as recursionTrees } from '../lessons/recursion-trees/questions';
import { QUESTIONS as dynamicArrays } from '../lessons/dynamic-arrays/questions';
import { QUESTIONS as hashing } from '../lessons/hashing-internals/questions';
import { QUESTIONS as linkedLists } from '../lessons/linked-lists/questions';
import { QUESTIONS as stacks } from '../lessons/stacks-intro/questions';
import { QUESTIONS as queues } from '../lessons/queues/questions';
import { QUESTIONS as deques } from '../lessons/deques/questions';
import { QUESTIONS as heaps } from '../lessons/heaps-intro/questions';
import { QUESTIONS as trees } from '../lessons/trees-bst/questions';
import { QUESTIONS as graphs } from '../lessons/graphs-traversal/questions';
import { QUESTIONS as sorting } from '../lessons/sorting-algorithms/questions';
import { QUESTIONS as searching } from '../lessons/binary-search/questions';
import { QUESTIONS as dp } from '../lessons/dp-foundations/questions';
import { QUESTIONS as anchors } from './anchor-questions';

// One line per lesson bank — the practice engine and the spaced-repetition
// engine both consume this, independently of the MDX (spec §5.2).
export const ALL_QUESTIONS: Question[] = [
  ...bigO,
  ...amortized,
  ...space,
  ...recursionTrees,
  ...dynamicArrays,
  ...hashing,
  ...linkedLists,
  ...stacks,
  ...queues,
  ...deques,
  ...heaps,
  ...trees,
  ...graphs,
  ...sorting,
  ...searching,
  ...dp,
  ...anchors,
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q]),
);

export const questionsForLesson = (lessonId: string): Question[] =>
  ALL_QUESTIONS.filter((q) => q.lessonId === lessonId);
