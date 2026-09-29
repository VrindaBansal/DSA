// Full-length practice tests: the data model.
//
// A test mirrors the shorter GRE General Test: one Issue essay, then two
// Verbal and two Quant sections. Each measure's second section comes in two
// versions — easier and harder — and the first section's score decides which
// one you get (section-level adaptivity, as on the real test).

import type { CardQuestion } from '../../../../lib/types.ts';

export type Measure = 'verbal' | 'quant';
export type Level = 'easier' | 'harder';

/** Decides the on-screen directions and the "by question type" breakdown. */
export type TestFormat =
  | 'tc' //        text completion, 1–3 blanks
  | 'se' //        sentence equivalence
  | 'rc' //        reading comprehension, select one
  | 'rc-multi' //  reading comprehension, select one or more
  | 'rc-select' // reading comprehension, select a sentence in the passage
  | 'cr' //        argument paragraph (critical reasoning), select one
  | 'qc' //        quantitative comparison
  | 'ps' //        problem solving, select one
  | 'ps-multi' //  problem solving, select one or more
  | 'ne'; //       numeric entry

export type TestQuestion = CardQuestion & {
  format: TestFormat;
  /** Questions sharing a passage or data display carry the same group id. */
  group?: string;
};

export type SectionKey = 'v1' | 'v2e' | 'v2h' | 'q1' | 'q2e' | 'q2h';
/** A position in the test's running order; stage 2 resolves by routing. */
export type Slot = 'v1' | 'v2' | 'q1' | 'q2';

export interface TestSection {
  key: SectionKey;
  measure: Measure;
  stage: 1 | 2;
  level?: Level;
  minutes: number;
  questions: TestQuestion[];
}

export interface PracticeTest {
  id: string;
  number: number;
  title: string;
  /** Issue task: the claim to respond to and the specific instructions. Omitted on essay-free tests. */
  essay?: { claim: string; task: string };
  /** Timed like the real exam (default). `false` = no clock, sections never end on their own. */
  timed?: boolean;
  /** Running order of the scored sections after the essay. */
  order: Slot[];
  sections: Record<SectionKey, TestSection>;
}
