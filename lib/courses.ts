// The course registry. Each course is a self-contained curriculum living under
// content/courses/<id>/. Adding a course = drop a folder + one entry here.
// Pure data — safe on client and server.

export interface CourseMeta {
  id: string;
  title: string;
  /** One-line what-and-why, shown on the course picker card. */
  tagline: string;
  /** Longer framing for the course dashboard header. */
  blurb: string;
  /** The promise: what you can do after finishing the whole thing. */
  outcome: string;
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
];

export const DEFAULT_COURSE_ID = 'dsa';

export const getCourse = (id: string): CourseMeta | undefined =>
  COURSES.find((c) => c.id === id);
