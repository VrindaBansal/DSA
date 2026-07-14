import type { CheatsheetData } from '@/lib/types';
import { CHEATSHEET as queues } from './lessons/queues/cheatsheet';
import { CHEATSHEET as deques } from './lessons/deques/cheatsheet';
import { CHEATSHEET as bigO } from './lessons/big-o/cheatsheet';
import { CHEATSHEET as amortized } from './lessons/amortized/cheatsheet';
import { CHEATSHEET as space } from './lessons/space-complexity/cheatsheet';
import { CHEATSHEET as recursionTrees } from './lessons/recursion-trees/cheatsheet';
import { STUB_CHEATSHEETS } from './stub-cheatsheets';

export const CHEATSHEETS: CheatsheetData[] = [
  bigO,
  amortized,
  space,
  recursionTrees,
  queues,
  deques,
  ...STUB_CHEATSHEETS,
];

export const CHEATSHEET_BY_LESSON: Record<string, CheatsheetData> =
  Object.fromEntries(CHEATSHEETS.map((c) => [c.lessonId, c]));
