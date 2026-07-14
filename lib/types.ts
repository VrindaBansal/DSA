// ---------------------------------------------------------------------------
// Shared types. Content types mirror the spec (§5); progress types back the
// repository interface (§11).
// ---------------------------------------------------------------------------

export type Difficulty = 1 | 2 | 3;

export interface LessonMeta {
  id: string;
  module: string;
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
  number: number;
  title: string;
  blurb: string;
  /** Real-world anchors this module leans on (spec §6). */
  anchors: string[];
}

// --- Question model (spec §5.2) --------------------------------------------

interface QuestionBase {
  id: string;
  lessonId: string;
  prompt: string;
  difficulty: Difficulty;
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

export type Question = McqQuestion | ShortQuestion | CodeQuestion;

// --- Cheatsheet + tradeoff data (spec §5.1, §6) -----------------------------

export interface OpsRow {
  op: string;
  complexity: string;
  note?: string;
}

export interface CheatsheetData {
  lessonId: string;
  /** Operations table with complexities. */
  opsTable: OpsRow[];
  useWhen: string;
  dontUseWhen: string;
  /** Python stdlib equivalent. */
  stdlib: string;
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

export interface AppState {
  lessons: Record<string, LessonProgress>;
  review: Record<string, ReviewItem>;
  lastLesson?: string;
}

export const emptyLessonProgress = (lessonId: string): LessonProgress => ({
  lessonId,
  blocksSeen: [],
  checks: {},
  code: {},
  chat: [],
  notes: [],
});

export const emptyAppState = (): AppState => ({ lessons: {}, review: {} });
