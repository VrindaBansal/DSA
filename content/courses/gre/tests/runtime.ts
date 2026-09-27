// Test-running logic that client code needs without pulling in the (large)
// question content: routing, scoring, labels.

import type { PracticeTestResult, TestMeasureResult, TestResponse } from '../../../../lib/types.ts';
import { isCorrect } from './grade.ts';
import { estimateScaled } from './scoring.ts';
import type { Level, Measure, PracticeTest, SectionKey, Slot, TestFormat, TestSection } from './types.ts';

export const FORMAT_LABEL: Record<TestFormat, string> = {
  tc: 'Text completion',
  se: 'Sentence equivalence',
  rc: 'Reading comprehension',
  'rc-multi': 'Reading · select all that apply',
  'rc-select': 'Reading · select a sentence',
  cr: 'Argument (critical reasoning)',
  qc: 'Quantitative comparison',
  ps: 'Problem solving · select one',
  'ps-multi': 'Problem solving · select all that apply',
  ne: 'Numeric entry',
};

export const MEASURE_LABEL: Record<Measure, string> = {
  verbal: 'Verbal Reasoning',
  quant: 'Quantitative Reasoning',
};

/** The section a slot resolves to, given the routing decided so far. */
export function sectionForSlot(
  test: PracticeTest,
  slot: Slot,
  levels: Partial<Record<Measure, Level>>,
): TestSection | undefined {
  if (slot === 'v1' || slot === 'q1') return test.sections[slot];
  const lvl = levels[slot === 'v2' ? 'verbal' : 'quant'];
  if (!lvl) return undefined;
  return test.sections[`${slot[0]}2${lvl === 'harder' ? 'h' : 'e'}` as SectionKey];
}

export function measureResult(
  test: PracticeTest,
  measure: Measure,
  level: Level,
  responses: Record<string, TestResponse>,
): TestMeasureResult {
  const s1 = test.sections[measure === 'verbal' ? 'v1' : 'q1'];
  const s2 = sectionForSlot(test, measure === 'verbal' ? 'v2' : 'q2', { [measure]: level })!;
  const right = (s: TestSection) => s.questions.filter((q) => isCorrect(q, responses[q.id])).length;
  const c1 = right(s1);
  const c2 = right(s2);
  return {
    firstCorrect: c1,
    firstTotal: s1.questions.length,
    secondCorrect: c2,
    secondTotal: s2.questions.length,
    level,
    scaled: estimateScaled(measure, level, c1 + c2),
  };
}

export function scoreAttempt(
  test: PracticeTest,
  levels: Record<Measure, Level>,
  responses: Record<string, TestResponse>,
  seconds: Record<string, number>,
  essay: string,
): PracticeTestResult {
  return {
    testId: test.id,
    at: Date.now(),
    verbal: measureResult(test, 'verbal', levels.verbal, responses),
    quant: measureResult(test, 'quant', levels.quant, responses),
    responses,
    seconds,
    essay,
  };
}
