import type { Question } from '@/lib/types';
import { QUESTIONS as bigO } from '../courses/dsa/lessons/big-o/questions';
import { QUESTIONS as amortized } from '../courses/dsa/lessons/amortized/questions';
import { QUESTIONS as space } from '../courses/dsa/lessons/space-complexity/questions';
import { QUESTIONS as recursionTrees } from '../courses/dsa/lessons/recursion-trees/questions';
import { QUESTIONS as dynamicArrays } from '../courses/dsa/lessons/dynamic-arrays/questions';
import { QUESTIONS as hashing } from '../courses/dsa/lessons/hashing-internals/questions';
import { QUESTIONS as linkedLists } from '../courses/dsa/lessons/linked-lists/questions';
import { QUESTIONS as stacks } from '../courses/dsa/lessons/stacks-intro/questions';
import { QUESTIONS as queues } from '../courses/dsa/lessons/queues/questions';
import { QUESTIONS as deques } from '../courses/dsa/lessons/deques/questions';
import { QUESTIONS as heaps } from '../courses/dsa/lessons/heaps-intro/questions';
import { QUESTIONS as trees } from '../courses/dsa/lessons/trees-bst/questions';
import { QUESTIONS as graphs } from '../courses/dsa/lessons/graphs-traversal/questions';
import { QUESTIONS as sorting } from '../courses/dsa/lessons/sorting-algorithms/questions';
import { QUESTIONS as searching } from '../courses/dsa/lessons/binary-search/questions';
import { QUESTIONS as dp } from '../courses/dsa/lessons/dp-foundations/questions';
import { QUESTIONS as anchors } from './anchor-questions';
import { QUESTIONS as llm } from '../courses/llm/questions';

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
  ...llm,
];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q]),
);

export const questionsForLesson = (lessonId: string): Question[] =>
  ALL_QUESTIONS.filter((q) => q.lessonId === lessonId);
