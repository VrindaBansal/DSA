# Product spec: personal DSA learning portal

**Codename:** Grok (working title, rename freely)
**Owner + only user:** Vrinda
**Purpose:** A single-user web app that teaches data structures and algorithms end to end through interactive text lectures, animations, embedded questions, coding exercises, and an AI tutor — and doubles as a permanent reference I can come back to before any interview.

This document is the brief. Read the whole thing before writing code. Where it says MUST, treat it as a hard requirement. Where it says SHOULD, use judgment but explain deviations.

---

## 1. Why this exists

I'm a CS grad going into full-stack and PM interviews. I know a lot of this material in fragments. I want it consolidated, and I want the consolidation to *stick*. My constraints as a learner:

- **I learn concept-first, not syntax-first.** Tell me *why* a heap exists before you show me `sift_down`.
- **I need real-world anchors.** "A queue is FIFO" is useless. "Gmail's send button doesn't wait for SMTP — it enqueues your message so the UI can return instantly, and a worker drains that queue" is what makes it permanent. Every structure needs at least one anchor like this.
- **I need to be tested constantly**, not just at the end. Comprehension checks inline, mid-lecture.
- **I want a cheatsheet at the end of every lecture** that I can print, screenshot, or skim the night before an interview.
- **I want to be able to ask "wait, why?" at any point** without leaving the page.

Success = I can finish the whole curriculum and then, cold, whiteboard any structure, state its tradeoffs, and recognize the pattern in an unseen problem.

## 2. Non-goals

- Not a product for other people. No auth, no multi-tenancy, no onboarding flow, no landing page, no marketing copy. It's my tool.
- Not video. All lectures are text + animation + interaction.
- Not a LeetCode clone. Coding exercises here are **small, structural, and pedagogical** ("implement `enqueue` and `dequeue` on a ring buffer"), not competitive puzzles. I'll do the real problem grind on LeetCode itself; this app links out to it.
- No mobile app. Responsive down to tablet is enough; I'll use it on a laptop.
- No production hardening. It runs locally or on a personal Vercel deploy. Optimize for build speed and iteration, not scale.

---

## 3. Tech stack

Use this unless there's a strong reason not to. If you deviate, say so up front.

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Server routes are needed to keep the OpenAI key server-side. |
| Styling | **Tailwind CSS** | With a custom token layer, see §9. |
| Components | **shadcn/ui** where useful | Don't fight it, but don't let the app look like every other shadcn app. |
| Animation | **Framer Motion** + hand-rolled SVG | See §7. No animation libraries that render canvas — I want inspectable DOM/SVG. |
| Content | **MDX files in the repo** (`/content/**`) | Content is authored as files, not stored in a DB. Git is my CMS. Custom MDX components do the heavy lifting. |
| Code execution | **Pyodide** (Python in the browser via WASM) | No backend sandbox. Everything runs client-side. |
| Persistence | **SQLite via better-sqlite3 locally**, or **Supabase Postgres** if deploying | Only for *my progress state*, not content. Keep the data layer behind a thin repository interface so this is swappable in one file. |
| AI chat + grading | **OpenAI API** (I have a key) | Called only from Next.js route handlers. Key lives in `.env.local`, never in client bundles. MUST NOT be exposed via `NEXT_PUBLIC_`. |
| Deploy | Vercel (optional) | Local dev is the primary target. |

**Model choice:** default to a fast, cheap model for chat and short-answer grading (e.g. `gpt-4o-mini` or current equivalent). Put the model name in a single config constant so I can swap it.

---

## 4. Information architecture

```
/                       → Dashboard: module grid, progress, "resume where I left off", review queue
/module/[slug]          → Module overview: lessons list, module cheatsheet, module exam
/lesson/[slug]          → The lecture itself (the core surface)
/lesson/[slug]/cheatsheet → Standalone printable cheatsheet
/practice               → Mixed practice: pulls questions across all completed lessons
/practice/code          → Coding exercise index
/review                 → Spaced repetition queue (see §11)
/reference              → Global searchable reference: every cheatsheet, every complexity table, one page
```

The chat tutor is **not a page**. It's a persistent right-hand drawer available on every lesson page (see §8).

---

## 5. Content model

Content lives as MDX. Each lesson is one MDX file with frontmatter:

```mdx
---
id: queues
module: linear-structures
title: Queues and deques
order: 3
estimatedMinutes: 35
prerequisites: [arrays, linked-lists]
objectives:
  - Explain why FIFO ordering is the right abstraction for buffering work
  - Implement a ring buffer with O(1) enqueue and dequeue
  - Justify deque over list for sliding-window problems
tags: [linear, fifo, buffering]
---
```

The MDX body is composed of **block components**. These are the authoring primitives. Build every one of them:

### 5.1 Block components (MUST all exist)

| Component | Purpose | Notes |
|---|---|---|
| `<Concept>` | Plain teaching prose | Default. Serif or high-readability body face, generous measure (~68ch max). |
| `<Intuition>` | The "why does this exist" framing | Visually distinct. This is the block I read first and reread. |
| `<RealWorld source="Gmail">` | The anchor example | MUST render with a visual marker. Every structure gets ≥1. See §6 for the required list. |
| `<Visual id="ring-buffer-wrap">` | Mounts an interactive animation | See §7. |
| `<CodeWalk>` | Annotated code, line-by-line | Hovering/stepping a line highlights the corresponding prose annotation. Python. |
| `<Check>` | Inline comprehension check, mid-lecture | MCQ or short response. Blocks nothing — I can skip — but tracks. |
| `<TradeoffTable>` | Structured comparison | Renders a normalized complexity/tradeoff table from JSON so the reference page can aggregate them. |
| `<Gotcha>` | Python-specific traps | e.g. "`list.pop(0)` is O(n)". Distinct, slightly alarming styling. |
| `<Aside>` | Optional depth, collapsed by default | For "if you want the amortized analysis proof, open this." |
| `<Cheatsheet>` | Terminal block of every lesson | MUST be the last block. Also extractable to its own route + print view. |

### 5.2 Question model

Questions are authored as JSON/TS alongside lessons (`/content/<lesson>/questions.ts`) so the practice engine and the spaced-repetition engine can consume them independently of the MDX.

```ts
type Question =
  | { kind: 'mcq'; id: string; lessonId: string; prompt: string;
      options: string[]; correctIndex: number;
      explanation: string;              // shown AFTER answering, always, right or wrong
      distractorNotes?: string[];       // why each wrong answer is tempting — I want this
      difficulty: 1 | 2 | 3 }
  | { kind: 'short'; id: string; lessonId: string; prompt: string;
      rubric: string[];                 // 2-4 bullet points a correct answer must hit
      modelAnswer: string;              // shown after grading
      difficulty: 1 | 2 | 3 }
  | { kind: 'code'; id: string; lessonId: string; prompt: string;
      starterCode: string;              // Python, with TODOs
      tests: string;                    // pytest-style asserts, hidden from me until I run
      hints: string[];                  // progressive, revealed one at a time
      solution: string;
      difficulty: 1 | 2 | 3 };
```

**Short response grading:** send prompt + rubric + my answer to OpenAI, get back `{ verdict: 'correct' | 'partial' | 'incorrect', hitRubricPoints: string[], missed: string[], feedback: string }` as strict JSON. Grade against the rubric only — the model MUST NOT invent extra criteria. Then show the model answer. Grading should be **strict but not pedantic**: I want to know when I'm hand-waving.

**MCQ:** graded client-side, instantly. Always show the explanation *and* the distractor notes, even when I get it right — knowing why the wrong answer was tempting is half the value.

---

## 6. The curriculum

12 modules. Each module = 2–5 lessons. Build the app so I can add lessons by dropping in MDX; ship with **Module 1 fully authored** as the reference implementation, and stubs (frontmatter + objectives + cheatsheet skeleton) for the rest.

| # | Module | Lessons | Real-world anchors to use |
|---|---|---|---|
| 1 | **Complexity** | Big-O/Θ/Ω · amortized analysis · space complexity · recursion trees + Master theorem | Why an O(n²) autocomplete dies at 10k contacts |
| 2 | **Arrays and dynamic arrays** | Static vs dynamic · amortized doubling · two pointers · sliding window · prefix sums | Python `list` internals; image convolution as a sliding window |
| 3 | **Hashing** | Hash functions · collisions (chaining vs open addressing) · load factor · when `dict` is *not* O(1) | Database indexes; deduping event streams; DNS caching |
| 4 | **Linked structures** | Singly/doubly linked · fast-slow pointers · LRU cache | Browser history (doubly linked); LRU in a CDN edge cache |
| 5 | **Stacks** | Array vs linked backing · monotonic stack · call stack | The call stack itself; undo/redo; expression parsing in a compiler |
| 6 | **Queues and deques** | FIFO · ring buffer · deque · priority queue preview | **Gmail send → SMTP worker queue**; Kafka; print spoolers; BFS frontier |
| 7 | **Heaps and priority queues** | Binary heap · sift up/down · heapify · two-heap median · top-K | OS process scheduler; Uber dispatch; k-nearest results in a search ranker |
| 8 | **Trees** | Binary trees · traversals · BST · balancing (AVL/red-black, conceptual) · tries | Filesystem; DOM; autocomplete tries; B-trees under every SQL index |
| 9 | **Graphs** | Representations · BFS/DFS · topological sort · union-find · shortest paths (Dijkstra) | Social graphs; build dependency ordering (npm, Make); Maps routing |
| 10 | **Sorting** | Merge · quick (Lomuto + Hoare) · heap · counting/radix · Timsort · stability | Why `ORDER BY` is stable in some DBs; leaderboard sorting; external sort on files too big for RAM |
| 11 | **Searching** | Binary search · `bisect` from scratch · binary search on the answer · quickselect | Git bisect; rate-limit threshold tuning; percentile queries |
| 12 | **Recursion, backtracking, DP, greedy** | Memo → tabulate → space-optimize · knapsack/LIS/edit distance · when greedy is provably safe | Diff algorithms (edit distance); autocomplete ranking; cache eviction heuristics |

Every lesson MUST end with a cheatsheet containing, at minimum: the operations table with complexities, the one-line "use this when," the one-line "don't use this when," and the Python stdlib equivalent.

---

## 7. Animations — the hard part, get this right

Animations are the reason this app exists rather than a PDF. They MUST be **interactive and stateful**, not looping decorations. Each one is a React component in `/components/visuals/` registered by id and mounted via `<Visual id="..." />`.

**Universal requirements for every visual:**
- Controls: play/pause, step forward, step back, reset, speed.
- A **live state readout** beneath the animation (e.g. current array, pointer indices, comparison count).
- A **"drive it yourself" mode** — I can enqueue/insert/delete my own values, not just watch a canned sequence.
- Every visual highlights the **currently executing line** of the corresponding Python code beside it. The code and the animation are one component, always.
- `prefers-reduced-motion` respected: fall back to instant state transitions, keep stepping.
- SVG, not canvas. I want to inspect it.

**Required visuals (minimum):**

1. **Amortized doubling** — push elements, watch capacity double, watch the cost spike, watch the *average* line stay flat. The flat average line is the whole point; make it the visual punchline.
2. **Hash map insert with collisions** — buckets, a bad hash function I can toggle to a good one, watch chains grow and lookup degrade to O(n).
3. **Two pointers / sliding window** — window slides over an array, running sum updates live.
4. **Linked list pointer surgery** — reversal, node by node, with the three pointers (`prev`, `curr`, `next`) drawn as labeled arrows. Pointer bugs are visual bugs.
5. **Ring buffer** — head/tail wrapping around a circle. Show the "is it full or empty?" ambiguity and how the sentinel/count solves it.
6. **Heap sift up / sift down** — as a tree *and* as the backing array, side by side, index math visible (`2i+1`, `2i+2`). The tree/array duality is the lesson.
7. **BST insert/delete** — including the three delete cases, and a degenerate insert order that turns the tree into a linked list. That degeneration is *why balancing exists* — land it.
8. **BFS vs DFS on the same graph** — run side by side, same graph, two frontiers (queue vs stack), watch them diverge. This single visual teaches more than either alone.
9. **Sorting race** — merge vs quick vs bubble on the same array, bar heights, comparison counters ticking. Let me choose adversarial inputs (already sorted, reverse sorted, all duplicates) and watch quicksort fall apart on the naive pivot.
10. **Binary search** — the search space collapsing, with the `lo`/`hi`/`mid` invariant printed as text on each step.
11. **DP table filling** — grid, cell by cell, with arrows showing which subproblems each cell depends on. Toggle between memo (top-down, sparse fill) and tabulation (bottom-up, dense fill). Seeing the *same* table filled in two orders is the insight.

---

## 8. The AI tutor

A persistent drawer, toggleable with `Cmd+K`, available on every lesson page.

**Context injection.** Every request MUST include, as system context:
- The current lesson's full MDX source (it's small — just send it).
- The lesson's objectives and cheatsheet.
- Which blocks I've scrolled past (so it knows where I am).
- The last question I got wrong, if any, plus my wrong answer.

**System prompt requirements** — the tutor MUST:
- Answer in the vocabulary of the current lesson. If I'm on queues, don't hand me a graph solution.
- Prefer **Socratic** for conceptual confusion ("what would happen if the tail wrapped past the head?") but give a **straight answer** when I ask a factual question. Do not be coy when I ask "what's the complexity of heapify" — the answer is O(n) and I want it immediately, followed by why it isn't O(n log n).
- Use real-world anchors, consistent with the ones in §6.
- Never be sycophantic. If my answer was wrong, say it was wrong.

**Features:**
- Streaming responses.
- "Explain this" — select any text in the lecture, a floating button sends the selection to the tutor with surrounding context.
- Thread persists **per lesson**, stored locally. I want to reread what I asked in module 3 when I'm in module 9.
- A "add this to my cheatsheet" button on any tutor response — appends it to a personal notes section on that lesson's cheatsheet. **This is important:** my own questions are the best signal of what I'll forget.

**Security:** all calls through `/api/chat` route handler. Key server-side only. Add a trivial rate guard so a runaway render loop can't drain my credits.

---

## 9. Coding exercises

Pyodide, loaded lazily (it's heavy — only load on pages with a code exercise, show a skeleton while it boots).

- **Editor:** CodeMirror 6, Python mode.
- **Run:** executes my code + hidden tests in Pyodide, shows pass/fail per test with the assertion that failed.
- **Hints:** progressive. Revealing hint N locks nothing, but track how many I needed — that's a signal for the review queue.
- **Solution:** only revealable after 2 failed runs or an explicit "show me" with a confirm.
- **Scope:** these are *structural* exercises. Examples of the right size: "implement `enqueue`/`dequeue` on the given ring buffer skeleton," "write `sift_down`," "complete the `find` and `union` with path compression."
- Each coding exercise SHOULD have a **complexity self-check**: after passing tests, I answer an MCQ on the time complexity of what I just wrote. Passing tests without knowing the cost is a fake win.

---

## 10. Visual direction

Do not ship a default. Specific direction:

- **Not** a cream/serif/terracotta "editorial" look. **Not** a dark-mode-with-neon-accent dev tool look. Both are the current AI-generated defaults and I'll recognize them instantly.
- The subject's own world is **structure and state transition** — pointers, indices, buckets, invariants. Lean into that: precise, technical, diagrammatic. Think a well-set textbook or a good technical paper, not a SaaS dashboard.
- **Typography does the work.** A characteristic display face for lesson titles and structure names, a genuinely readable body face at a comfortable measure, and a strong mono for code and for *all* index/pointer labels in the visuals. The mono face should feel like a first-class citizen, not a fallback.
- **Color encodes state, not decoration.** Pick a small palette and assign meaning: one hue for "active/current," one for "visited/done," one for "invariant violated," neutral for everything else. Use the same encoding across every visual in the app so it becomes a language I read without thinking. Document the encoding in a legend on the reference page.
- **The signature element:** the code-and-animation pairing. The executing line of Python and the moving pointer in the SVG are always in lockstep, in the same visual frame. That's what the app is remembered for. Spend the design boldness there and keep everything else quiet.
- Light mode is primary. Dark mode is nice-to-have.
- Every cheatsheet MUST have a clean print stylesheet.

---

## 11. Progress and review

State to persist (per lesson): scroll depth / blocks seen, inline `<Check>` results, quiz scores, code exercise attempts + hints used, chat thread, personal cheatsheet notes.

**Review queue (`/review`):** a simple SM-2-ish spaced repetition scheduler over the question bank. Rules:
- Every question I get wrong enters the queue at interval 1 day.
- Correct → interval ×2.2. Wrong → reset to 1 day.
- Coding exercises that needed ≥2 hints enter the queue as their *complexity MCQ*, not the full code (I don't need to re-type a heap; I need to re-know its cost).
- Dashboard surfaces "N due today" and nothing else. No streaks, no gamification, no confetti. I'm an adult.

---

## 12. Build order

Ship in phases. Each phase MUST be independently runnable — don't build the whole thing then wire it up.

**Phase 1 — Skeleton (get one lesson end to end)**
Next.js + Tailwind + MDX pipeline. Routes for dashboard, module, lesson. All block components rendering with real styling. Author **Module 6 (Queues)** completely — it's the one with the best real-world anchor and it exercises every block type. No DB yet; progress in localStorage.
*Acceptance:* I can read the queues lesson start to finish, including a `<RealWorld>` block about Gmail, and hit the cheatsheet at the end.

**Phase 2 — Interaction**
`<Check>` blocks (MCQ, client-graded, with distractor notes). Quiz engine. The ring buffer visual, fully interactive, with lockstep code highlighting. This visual is the reference implementation for all other visuals — get it right, then clone the pattern.
*Acceptance:* I can drive the ring buffer myself, watch head/tail wrap, and see which line of Python is executing.

**Phase 3 — Code exercises**
Pyodide + CodeMirror + test runner + progressive hints + complexity self-check.
*Acceptance:* I can implement `enqueue`/`dequeue` from a skeleton and see per-test pass/fail.

**Phase 4 — AI tutor**
`/api/chat` route, streaming, context injection, `Cmd+K` drawer, "explain this" selection, "add to cheatsheet."
*Acceptance:* I can highlight a sentence about amortized cost, ask "why isn't this O(n)," and get a lesson-aware answer that doesn't flatter me.

**Phase 5 — Short response grading**
`/api/grade`, rubric-based, strict JSON out.
*Acceptance:* I write a hand-wavy answer about heap complexity and it tells me which rubric point I dodged.

**Phase 6 — Persistence + review**
Swap localStorage for SQLite/Supabase behind the repository interface. Spaced repetition queue. `/reference` aggregate page.
*Acceptance:* I close the browser, come back tomorrow, and the review queue tells me what I owe.

**Phase 7 — Content**
Author the remaining 11 modules against the now-proven component library. This is the long tail; the app should make it feel like writing markdown, not writing software.

---

## 13. What I'll judge this on

1. Can I learn a structure I've half-forgotten in one sitting, and would I still know it in a month?
2. Does the animation make the invariant obvious, or is it a pretty distraction?
3. Does the tutor make me think, or does it just agree with me?
4. Is the cheatsheet good enough to be the *only* thing I look at the night before an interview?
5. Can I add a new lesson in an afternoon without touching the app code?

If a feature doesn't serve one of those five, cut it.

---

## 14. Open questions for me (ask before assuming)

- Do I want to deploy to Vercel or keep it local-only? (Affects the persistence choice.)
- Do I want the whole 12 modules stubbed up front, or only build module scaffolding as I get to each one?
- Should the tutor be able to see my *code exercise attempts* as context, or is that too much?
