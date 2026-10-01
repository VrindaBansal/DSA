// The course registry. Each course is a self-contained curriculum living under
// content/courses/<id>/. Adding a course = drop a folder + one entry here.
// Pure data — safe on client and server.

/** A named group of modules on a course dashboard (e.g. GRE Math vs English). */
export interface CourseSection {
  id: string;
  title: string;
  /** Shown under the title for subject sections. */
  subtitle?: string;
  /** A subject track (full header with progress and next lesson) vs a small framing group. */
  subject?: boolean;
}

export interface CourseMeta {
  id: string;
  title: string;
  /** One-line what-and-why, shown on the course picker card. */
  tagline: string;
  /** Longer framing for the course dashboard header. */
  blurb: string;
  /** The promise: what you can do after finishing the whole thing. */
  outcome: string;
  /** Has a generated practice bank at /course/<id>/bank. */
  bank?: boolean;
  /** Has full-length practice tests at /course/<id>/tests. */
  tests?: boolean;
  /** Has vocab flashcards at /course/<id>/flashcards. */
  flashcards?: boolean;
  /** Lesson that lays out the week-by-week plan, linked from the dashboard. */
  planLessonId?: string;
  /** Group modules into sections, in dashboard order. Modules name their section. */
  sections?: CourseSection[];
}

export const COURSES: CourseMeta[] = [
  {
    id: 'dsa',
    title: 'Data structures & algorithms',
    tagline: 'Whiteboard any structure, state its tradeoffs, recognize the pattern cold.',
    blurb:
      'The classic interview canon, taught concept-first with an interactive visual and a real-world anchor for every structure. Twelve modules from complexity analysis to dynamic programming.',
    outcome:
      'Finish it and you can whiteboard any structure, state its tradeoffs, and recognize the pattern in an unseen problem.',
  },
  {
    id: 'llm',
    title: 'Large language models',
    tagline: 'From tokens to agents — become the person who actually understands the stack.',
    blurb:
      'Everything between raw text and a shipped agentic product: tokenization, embeddings, attention, prompting, RAG, tool-use agents, agentic workflows, evaluation, fine-tuning, and inference. Built the same way — concept-first, anchored in real systems, tested constantly.',
    outcome:
      'Finish it and you can design, build, debug, and evaluate LLM systems — RAG pipelines, agents, and agentic workflows — and reason about the tradeoffs like an expert.',
  },
  {
    id: 'leetcode',
    title: 'Cracking LeetCode',
    tagline: 'Not 3,000 problems — ~15 patterns. Learn to see which one a problem wants.',
    blurb:
      'A confidence-first path from “I freeze on these” to solving LeetCode Hard, all in Python. Built around the handful of patterns that unlock the interview — two pointers, sliding window, binary search, backtracking, graphs, DP — each taught as a trigger you can recognize, a template you can reuse, and real problems you solve in a built-in editor that ramp from Easy to Hard.',
    outcome:
      'Finish it and you can read an unseen problem, name the pattern it wants, implement it cleanly in Python, argue its complexity — and decompose a LeetCode Hard into pieces you already know.',
  },
  {
    id: 'gre',
    title: 'GRE prep',
    tagline: 'Quant + Verbal + Writing, taught by worked example — then 11,000+ practice questions and 10 full-length practice tests.',
    blurb:
      'A complete, follow-along GRE course in two sections — Math and English — that you work through side by side. Every quant topic and every verbal question type is taught with worked examples you try first, checked with questions that explain every answer choice, and backed by a practice bank of 11,000+ questions organized into numbered sets that ramp from Foundation to Advanced, plus ten full-length practice tests: five that run like the real exam — the essay, timed sections, adaptive second sections, and estimated scores — and five untimed ones without the essay. Vocab flashcards — flip cards, a match game, and speed rounds — cover all 764 words of the core list.',
    outcome:
      'Finish it and you know exactly what the GRE tests and how it tests it, have a method for every question type, and have drilled each skill to the point where test day feels like one more practice set.',
    bank: true,
    tests: true,
    flashcards: true,
    planLessonId: 'gre-study-plan',
    sections: [
      { id: 'start', title: 'Getting started' },
      { id: 'math', title: 'Math', subtitle: 'Quantitative Reasoning', subject: true },
      { id: 'english', title: 'English', subtitle: 'Verbal Reasoning & Analytical Writing', subject: true },
      { id: 'final', title: 'Test day' },
    ],
  },
];

export const DEFAULT_COURSE_ID = 'dsa';

export const getCourse = (id: string): CourseMeta | undefined =>
  COURSES.find((c) => c.id === id);
