// ---------------------------------------------------------------------------
// Shared types. Content types mirror the spec (§5); progress types back the
// repository interface (§11).
// ---------------------------------------------------------------------------

export type Difficulty = 1 | 2 | 3;

export interface LessonMeta {
  id: string;
  module: string;
  /** Which course this lesson belongs to (derived from its folder). */
  courseId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  prerequisites: string[];
  objectives: string[];
  tags: string[];
  /** Stub lessons render objectives + visual + cheatsheet skeleton only. */
  stub?: boolean;
}

export interface ModuleMeta {
  slug: string;
  /** Which course this module belongs to. */
  courseId: string;
  number: number;
  title: string;
  blurb: string;
  /** Real-world anchors this module leans on (spec §6). */
  anchors: string[];
}

// --- Question model (spec §5.2) --------------------------------------------

/** A bar, line, or pie chart for data-interpretation questions. */
export interface ChartData {
  type: 'bar' | 'line' | 'pie';
  title: string;
  /** x-axis categories (bar/line) or slice labels (pie). */
  categories: string[];
  /** One or more series; a pie uses the first series only. */
  series: { name: string; values: number[] }[];
  yLabel?: string;
  xLabel?: string;
  /** y-axis maximum and gridline step (bar/line). */
  yMax?: number;
  yStep?: number;
  /** Appended to value labels, e.g. "%". */
  unit?: string;
  /** Print each value on its bar/point/slice (default: true for pie only). */
  showValues?: boolean;
}

/**
 * Material shown above a question's prompt — a reading passage, a data
 * table or chart, a geometry figure, or the two columns of a GRE
 * quantitative comparison.
 */
export interface Stimulus {
  /** Reading passage or argument paragraph. */
  passage?: string;
  /** Data table (data interpretation). */
  table?: { caption?: string; columns: string[]; rows: string[][] };
  /** Charts (data interpretation). */
  charts?: ChartData[];
  /** Geometry figure as inline SVG markup (authored content, not user input). */
  figure?: { svg: string; note?: string };
  /** Quantitative comparison: Quantity A vs Quantity B. */
  quantities?: { a: string; b: string };
}

interface QuestionBase {
  id: string;
  lessonId: string;
  prompt: string;
  difficulty: Difficulty;
  stimulus?: Stimulus;
}

export interface McqQuestion extends QuestionBase {
  kind: 'mcq';
  options: string[];
  correctIndex: number;
  /** Shown AFTER answering, always, right or wrong. */
  explanation: string;
  /** Why each wrong answer is tempting — indexed like options. */
  distractorNotes?: string[];
}

export interface ShortQuestion extends QuestionBase {
  kind: 'short';
  /** 2–4 bullet points a correct answer must hit. */
  rubric: string[];
  modelAnswer: string;
}

export interface ComplexityCheck {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeQuestion extends QuestionBase {
  kind: 'code';
  starterCode: string;
  /** pytest-style test functions, hidden until run. */
  tests: string;
  /** Progressive hints, revealed one at a time. */
  hints: string[];
  solution: string;
  /** MCQ on the complexity of what was just written (spec §9). */
  complexityCheck?: ComplexityCheck;
}

/**
 * Select-all-that-apply (GRE "select one or more"), or select exactly
 * `selectCount` (GRE sentence equivalence: exactly 2 of 6). All-or-nothing.
 */
export interface MultiQuestion extends QuestionBase {
  kind: 'multi';
  options: string[];
  correctIndices: number[];
  selectCount?: number;
  explanation: string;
  distractorNotes?: string[];
}

/** Numeric entry: type the number (or a fraction). */
export interface NumericQuestion extends QuestionBase {
  kind: 'numeric';
  answer: number;
  /** How the answer is shown after grading, e.g. "3/4" or "12.5". */
  answerDisplay: string;
  /** Answer box is a fraction (numerator / denominator), as on the GRE. */
  fraction?: boolean;
  /** Accept anything that rounds to the answer at this place value (e.g. 0.1). */
  roundTo?: number;
  /** Units shown after the box, e.g. "%" or "cm". */
  suffix?: string;
  prefix?: string;
  explanation: string;
}

/** Multi-blank text completion: one choice per blank, all must be right. */
export interface BlanksQuestion extends QuestionBase {
  kind: 'blanks';
  /** Blanks appear in the prompt as (i)_____, (ii)_____, (iii)_____. */
  blanks: { options: string[]; correctIndex: number }[];
  explanation: string;
  /** Per blank, why the tempting wrong choice is wrong. */
  blankNotes?: string[];
}

export type Question =
  | McqQuestion
  | ShortQuestion
  | CodeQuestion
  | MultiQuestion
  | NumericQuestion
  | BlanksQuestion;

/** Every kind answered in a single card (everything except code exercises). */
export type CardQuestion = Exclude<Question, CodeQuestion>;

// --- Cheatsheet + tradeoff data (spec §5.1, §6) -----------------------------

export interface OpsRow {
  op: string;
  complexity: string;
  note?: string;
}

export interface CheatsheetData {
  lessonId: string;
  /** The 3-column quick-reference table. */
  opsTable: OpsRow[];
  /** Column headers; defaults to Operation / Complexity / Note (DSA). */
  opsHeaders?: [string, string, string];
  useWhen: string;
  dontUseWhen: string;
  /** Labels for the two boxes; default "Use this when" / "Don't use this when". */
  useWhenLabel?: string;
  dontUseWhenLabel?: string;
  /** Python stdlib equivalent (DSA) or key tools/libraries (LLM). */
  stdlib: string;
  /** Label for the stdlib row; defaults to "Python stdlib". */
  stdlibLabel?: string;
  bullets?: string[];
  gotchas?: string[];
}

/** Normalized so the /reference page can aggregate every table. */
export interface TradeoffTableData {
  id: string;
  lessonId: string;
  title: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
  note?: string;
}

// --- Grading (spec §5.2) ----------------------------------------------------

export interface GradeResult {
  verdict: 'correct' | 'partial' | 'incorrect';
  hitRubricPoints: string[];
  missed: string[];
  feedback: string;
}

// --- Progress state (spec §11) ----------------------------------------------

export interface CheckResult {
  questionId: string;
  correct: boolean;
  /** What I answered — option text for MCQ, free text for short. */
  answer: string;
  at: number;
}

export interface CodeProgress {
  attempts: number;
  failedRuns: number;
  hintsUsed: number;
  passed: boolean;
  passedAt?: number;
  solutionRevealed?: boolean;
  complexityCorrect?: boolean;
}

export interface ReviewItem {
  questionId: string;
  lessonId: string;
  intervalDays: number;
  /** epoch ms when due */
  due: number;
  reps: number;
  lapses: number;
  /** Code exercises that needed ≥2 hints re-enter as their complexity MCQ. */
  asComplexityCheck?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  at: number;
}

export interface LessonProgress {
  lessonId: string;
  blocksSeen: string[];
  checks: Record<string, CheckResult>;
  code: Record<string, CodeProgress>;
  chat: ChatMessage[];
  /** Personal cheatsheet notes, mostly "add this to my cheatsheet" from the tutor. */
  notes: string[];
  lastVisited?: number;
  completed?: boolean;
  lastWrong?: { questionId: string; prompt: string; myAnswer: string; at: number };
}

export interface BankSetResult {
  correct: number;
  total: number;
  at: number;
  /** Seconds spent, when the set was run as a timed section. */
  seconds?: number;
}

/**
 * Practice-bank progress. Kept compact on purpose — the bank holds 10k+
 * questions, so each answer is one key and a 0/1, not a full CheckResult.
 */
export interface BankProgress {
  /** questionId → 1 (last attempt right) or 0 (last attempt wrong). */
  answers: Record<string, 0 | 1>;
  /** set id → most recent result. */
  sets: Record<string, BankSetResult>;
}

/**
 * A response on a full-length practice test, by question kind: option index
 * (mcq), option indices (multi), raw typed text — "n/d" for fraction boxes —
 * (numeric), or one option index per blank (blanks).
 */
export type TestResponse = number | number[] | string | (number | null)[];

export interface TestMeasureResult {
  firstCorrect: number;
  firstTotal: number;
  secondCorrect: number;
  secondTotal: number;
  /** Which second section the first section routed to. */
  level: 'easier' | 'harder';
  /** Estimated 130–170 score. */
  scaled: number;
}

export interface PracticeTestResult {
  testId: string;
  at: number;
  verbal: TestMeasureResult;
  quant: TestMeasureResult;
  /** questionId → response, for the answer review. */
  responses: Record<string, TestResponse>;
  /** section key → seconds used. */
  seconds: Record<string, number>;
  essay: string;
}

export interface AppState {
  lessons: Record<string, LessonProgress>;
  review: Record<string, ReviewItem>;
  lastLesson?: string;
  /** The "General" tutor tab's thread — not scoped to any one lesson. */
  generalChat: ChatMessage[];
  bank: BankProgress;
  /** Full-length practice tests: test id → finished attempts, oldest first. */
  tests: Record<string, PracticeTestResult[]>;
}

export const emptyLessonProgress = (lessonId: string): LessonProgress => ({
  lessonId,
  blocksSeen: [],
  checks: {},
  code: {},
  chat: [],
  notes: [],
});

export const emptyAppState = (): AppState => ({
  lessons: {},
  review: {},
  generalChat: [],
  bank: { answers: {}, sets: {} },
  tests: {},
});
