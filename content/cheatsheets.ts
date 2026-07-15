import type { CheatsheetData } from '@/lib/types';
import { CHEATSHEET as queues } from './courses/dsa/lessons/queues/cheatsheet';
import { CHEATSHEET as deques } from './courses/dsa/lessons/deques/cheatsheet';
import { CHEATSHEET as bigO } from './courses/dsa/lessons/big-o/cheatsheet';
import { CHEATSHEET as amortized } from './courses/dsa/lessons/amortized/cheatsheet';
import { CHEATSHEET as space } from './courses/dsa/lessons/space-complexity/cheatsheet';
import { CHEATSHEET as recursionTrees } from './courses/dsa/lessons/recursion-trees/cheatsheet';
import { MODULE_CHEATSHEETS } from './courses/dsa/module-cheatsheets';
import { LLM_CHEATSHEETS } from './courses/llm/cheatsheets';

export const CHEATSHEETS: CheatsheetData[] = [
  bigO,
  amortized,
  space,
  recursionTrees,
  queues,
  deques,
  ...MODULE_CHEATSHEETS,
  ...LLM_CHEATSHEETS,
];

export const CHEATSHEET_BY_LESSON: Record<string, CheatsheetData> =
  Object.fromEntries(CHEATSHEETS.map((c) => [c.lessonId, c]));
