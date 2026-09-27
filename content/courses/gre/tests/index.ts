// The five full-length GRE practice tests.
//
// Original questions written to match the real test: same section lengths
// and timing, same question types in the same order, the same topic mix and
// difficulty spread, and the same kinds of traps. Nothing here is copied
// from ETS material — for real retired questions, use the official
// POWERPREP tests (see the "Practice tests" lesson note).
//
// Heavy (lots of text), so client pages receive one test as a prop from the
// server; only /review lazy-loads this whole module.

import type { PracticeTest, TestQuestion } from './types.ts';
import { PT1 } from './pt1/index.ts';
import { PT2 } from './pt2/index.ts';
import { PT3 } from './pt3/index.ts';
import { PT4 } from './pt4/index.ts';
import { PT5 } from './pt5/index.ts';

export const TESTS: PracticeTest[] = [PT1, PT2, PT3, PT4, PT5];
export const TEST_BY_ID: Record<string, PracticeTest> = Object.fromEntries(TESTS.map((t) => [t.id, t]));

export const TEST_QUESTION_PREFIX = 'gre-pt';
export const isTestQuestionId = (id: string) => id.startsWith(TEST_QUESTION_PREFIX);

export const TEST_QUESTION_BY_ID: Record<string, TestQuestion> = {};
for (const t of TESTS)
  for (const s of Object.values(t.sections)) for (const q of s.questions) TEST_QUESTION_BY_ID[q.id] = q;

export * from './runtime.ts';
