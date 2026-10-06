# Invariant — personal learning portal

my own personal coursera/duolingo/khan academy.

Single-user web app that teaches through interactive text
lectures, lockstep code-and-animation visuals, inline comprehension checks,
in-browser Python exercises, an AI tutor, and a spaced repetition queue.
Started from `dsa-portal-spec.md` (codename "Grok", renamed **Invariant**) and
grew into a **multi-course** platform.

## Courses

Four courses ship today, all built the same way (concept-first, real-world
anchors, tested constantly):

- **Data structures & algorithms** — 12 modules, 16 lessons, fully authored.
- **Large language models** — 12 modules, 13 lessons. Foundations → tokenization
  → embeddings → attention → decoding → prompting → RAG → tools → agents →
  agentic workflows → evaluation → fine-tuning → inference. Flagship lessons
  fully authored with five interactive visuals; the rest are strong stubs
  (framing prose + concept fills + a check + an exam-ready cheatsheet).
- **Cracking LeetCode** — 15 modules, 15 lessons, fully authored, all Python. A
  confidence-first, pattern-based path from the problem-solving method →
  reading constraints → the core patterns (two pointers, sliding window,
  hashing, binary search, stacks, linked lists, trees, heaps) → the heavy
  hitters (backtracking, graphs, DP) → a Hard capstone that decomposes real
  LeetCode-Hard problems into patterns you already know. ~28 in-browser coding
  exercises ramping Easy → Hard, each with hidden tests, hints, a gated
  solution, and a complexity self-check.
- **GRE prep** — 13 modules, 29 lessons, in two sections shown side by side on
  the dashboard: **Math** (Quantitative Reasoning, 6 modules) and **English**
  (Verbal Reasoning and the Issue essay, 5 modules), plus a Getting started
  module and a Test day module. Each section shows its own progress and next
  lesson, and the **study plan** (pinned on the dashboard) schedules both every
  week. Sections are generic: a course lists `sections` in `lib/courses.ts`
  and each module names its `section` in `lib/modules.ts`. Every lesson
  teaches one idea at a time: a plain-language explanation → a worked
  **example** with every step shown ("try it first", then reveal the
  **solution**) → one or two GRE-style **practice checks** on that idea, each
  with a step-by-step explanation and a note on every answer choice → a named
  trap → a recap table and cheatsheet. 261 hand-written checks use the real
  GRE formats (5-choice, quantitative comparison, numeric entry, select-all,
  2–3 blank text completion, sentence equivalence, reading passages). Lesson
  formulas are typeset with KaTeX (`remark-math` + `rehype-katex`; only `$$ … $$`
  counts as math, so dollar amounts stay text). Exponents typed with a caret
  (`9^(x + 1)`, `2^x`) are drawn as real raised powers everywhere: in lesson
  prose (`remarkPowers`) and in every question, option, and explanation
  (`RichText`), both built on `lib/powers.ts`. Geometry lessons carry inline
  SVG figures, and `<DataChart c={…} />` draws a bar, line, or pie chart with
  the same renderer as the questions. The vocabulary is taught as **word
  families** (184 families, 764 words), not a flat list.
  - **Vocab flashcards** (`/course/gre/flashcards`) — one card per word (764),
    built from the same families (`content/courses/gre/flashcards.ts`). The
    back of each card shows the definition, a **word-root breakdown** (each
    prefix, root, and suffix with its meaning, and what they add up to — or,
    for the 65 words without useful roots, where the word comes from), an
    example sentence with the context clue underlined, the rest of the family,
    and the opposite family. The front can show the roots as a hint (h)
    before you flip. The breakdowns are hand-written in
    `content/courses/gre/roots/` and checked to spell their words.
    Three ways to play: **flip cards** (3D flip, swipe or ←/→ to grade, undo),
    **match** (6 words to 6 meanings against the clock, +2s per miss), and a
    60-second **speed round** (one choice is usually the opposite family).
    Words climb a five-box Leitner schedule (`lib/flashcards.ts`: due again in
    1, 3, 7, then 21 days; a miss drops a word back to box 1). Each day deals
    **mini sets** of 10 (`buildDailyPlan`): words due back first, then
    flagged, then missed, plus up to 20 new words, mixed so every set has
    some of each; the sets stay fixed for the day, finished ones are marked
    with their score, and "deal one more" adds a set from what's left. The
    **master set** is all 764 words in a fresh order every session — a
    weighted shuffle that brings missed and flagged words up sooner. Flag any
    word (⚐ or the f key); the **word log** lists every word you've missed
    (miss count, accuracy, last miss) and every flag, each with a practice
    button. Other decks: missed, flagged, new, mastered, any family, or a
    family with its opposite. Progress, flags, today's sets, the streak, and
    best scores live in the same progress state as everything else
    (`state.flashcards`).
  - **Practice bank** (`/course/gre/bank`) — **11,773 questions** (6,750 Quant ·
    5,023 Verbal) in 589 numbered sets of ~20, tiered Foundation → Core →
    Advanced. Run a set in **practice** mode (feedback after each question)
    or as a **timed section** at real GRE pace (review at the end). Topic
    drills serve unanswered and missed questions first. A mistakes list lets
    you redo misses, and every miss joins the spaced review queue. Review
    serves a fresh variant of the same problem so you can't just memorize
    the answer.
  - **Ten full-length practice tests** (`/course/gre/tests`). Tests 1–5 run like the
    real exam: the Issue essay (30 min, no spell-check), then two Verbal
    sections (12 questions/18 min, 15/23) and two Quant sections (12/21, 15/26)
    in the official layout. Inside a section you can go back, **mark**, and use
    a **review** screen; Quant has an on-screen **calculator** with Transfer
    Display. Each measure’s second section comes in an **easier** and a
    **harder** version, and the first section’s score decides which one you
    get. Results show **estimated 130–170 scores** (a ±3 band, since ETS
    doesn’t publish its conversion), time per section, breakdowns by question
    type and topic, an explanation for every question, a button that sends
    misses to the review queue, and tutor feedback on the essay. Tests 6–10
    are the same adaptive sections and scoring with **no clock** (a count-up
    timer shows time spent; nothing ends on its own) and **no essay**. All 840
    questions are original, written to match real GRE formats, topic mix,
    difficulty, and traps. They include bar, line, and pie charts, data
    tables, geometry figures, and select-in-passage questions. The attempt is
    saved as you go, so a reload resumes where you left off.
  - How the bank is built: Quant questions come from 66 seeded,
    deterministic generators, one per GRE skill (percent change, work
    rates, special triangles, standard deviation, QC with variables, …).
    Verbal questions are assembled from the word families (meanings,
    synonyms, antonyms, one-blank completion, sentence equivalence), 105
    multi-blank templates, 26 reading passages, and 36 argument
    (critical-reasoning) passages. Each question has an explanation, and most
    say why the tempting wrong answer is wrong.

Adding a course = drop a folder under `content/courses/<id>/` and register it in
`lib/courses.ts`. Adding a lesson = drop a directory under that course's
`lessons/`. The `courseId` is derived from the folder path.

## Run it

```bash
npm install
cp .env.example .env.local   # then paste your OpenAI key
npm run dev                  # http://localhost:3000
```

Without `OPENAI_API_KEY` everything works except the AI tutor and short-answer
grading (they fail with a clear message; MCQs, visuals, and code exercises are
fully client-side).

Code exercises boot Pyodide from the jsDelivr CDN on first "run tests" —
first run takes a few seconds, then it's cached.

## The tutor

A small "✦ tutor ⌘K" pill sits bottom-right on **every page** — dashboard,
practice, review, reference, and every lesson — never in the way, gone
entirely while the drawer is open. Toggle with the button or `Cmd+K`/`Ctrl+K`
from anywhere.

Two tabs, two persisted threads:
- **General** — always available, aware of the whole curriculum (every
  module and lesson) and your progress (completed lessons, review count).
  Ask "which lesson covers X", how two topics relate, or what to study next.
- **This lesson** — appears only while a lesson page is open; sees that
  lesson's full source, objectives, cheatsheet, your scroll position, and
  your last wrong answer, so its answers stay in that lesson's vocabulary.
  Select any text in the lecture → **"explain this"** sends the selection
  straight into this tab with surrounding context.

Both tabs are specialized for this course specifically (the system prompt
declines unrelated requests and steers back), never sycophantic, and answer
factual questions directly before elaborating. Threads persist through the
same progress repository as everything else (`lib/progress/repo.ts`).

Replies render as light markdown with **typeset math**: the prompt asks the
model to write every expression in LaTeX — `\( … \)` inline, `\[ … \]` on its
own line — and `components/tutor/Markdown.tsx` renders it with KaTeX (plus
numbered and bulleted lists). `$ … $` works too, but a lone dollar amount
("costs $12 and $15") stays plain text. Short-answer grading feedback uses
the same renderer.

## Where things live

```
lib/courses.ts                       the course registry (add a course here)
lib/modules.ts                       every module (each tagged with courseId)
content/courses/<course>/lessons/<id>/lesson.mdx    a lecture (MDX + blocks)
content/courses/<course>/lessons/<id>/questions.ts  per-lesson question bank (DSA)
content/courses/<course>/lessons/<id>/cheatsheet.ts per-lesson cheatsheet (DSA)
content/courses/<course>/questions.ts   course-level question bank (LLM)
content/courses/<course>/cheatsheets.ts course-level cheatsheets (LLM)
content/courses/<course>/tradeoffs.ts   course tradeoff tables
content/courses/gre/bank/            GRE practice-bank generators (quant/, verbal/)
                                     + index.ts (sets, tiers, variants, lookup)
content/courses/gre/tests/           the 10 full-length practice tests: pt<N>/
                                     verbal.ts + quant.ts, author.ts (builders,
                                     figures), scoring.ts (routing + estimates)
components/tests/                    practice-test runner, calculator, results
content/questions/index.ts           GLOBAL aggregator of every course's banks
content/cheatsheets.ts               GLOBAL aggregator of every cheatsheet
content/tradeoffs.ts                 GLOBAL aggregator of every tradeoff table
components/blocks/                   the authoring primitives (incl. <Example>,
                                     <Solution>, <Gotcha title>, <WordFamilies>)
components/quiz/                     answer cards: MCQ, short, multi (select-all /
                                     select-2), numeric entry, multi-blank, and
                                     QuestionCard, which dispatches between them
components/visuals/                  DSA visuals + shared engine
components/visuals/llm/              LLM visuals (BPE, cosine, attention, RAG, agent loop)
lib/progress/repo.ts                 THE persistence swap point (see below)
```

Routes: `/` is the **course picker**; `/course/[courseId]` is a course
dashboard; `/module/[slug]` and `/lesson/[slug]` use globally-unique slugs;
`/practice`, `/review`, and `/reference` span all courses with a course filter;
`/course/[courseId]/bank` is a course's practice bank (GRE only, via
`bank: true` in `lib/courses.ts`); `/course/[courseId]/tests` lists its
full-length practice tests and `/course/[courseId]/tests/[testId]` runs one
(`tests: true`);
`/playground` is a standalone Python **IDE** (CodeMirror + Pyodide) for testing
any idea, with real stdout/stderr. Every coding exercise also has an in-place
**▶ run (print-debug)** button next to "run tests" so you can `print()` and
inspect a failing attempt — same in-browser Python engine, nothing leaves your
machine.

Adding a lesson = drop a directory under a course's `lessons/` with a
`lesson.mdx`, plus its cheatsheet/questions and a one-line import in the
relevant registry. No routing changes — the course is derived from the path.

## Curriculum state

- **All 12 modules fully authored** — 16 lessons total, no stubs. Every
  lesson has real-world anchors, inline checks, a terminal cheatsheet, and
  (where the spec requires one) its interactive visual. Modules 1 and 6
  carry multiple lessons; modules 2–5 and 7–12 each ship one comprehensive
  lecture covering the spec §6 topic list for that module.
- **Question bank:** ~50 questions across MCQ / short-response / code,
  including 8 structural code exercises (ring buffer, two-stack queue,
  sift_down, union-find, fast–slow midpoint, next-greater monotonic stack,
  bisect_left, climbing stairs).
- All 11 required visuals (§7) are implemented, each with play/step/speed
  controls, live state readout, drive-it-yourself inputs, lockstep Python
  line highlighting, and `prefers-reduced-motion` support.

## Persistence

Progress lives behind `ProgressRepo` (`lib/progress/repo.ts`) — the one-file
swap point required by §3. Practice-bank answers are stored compactly
(`bank.answers`: question id → 0/1, `bank.sets`: set id → last result), so
10k+ questions don't bloat the state:

- **default**: browser `localStorage` — zero setup, survives restarts.
- **`NEXT_PUBLIC_PERSIST=sqlite`**: server-side SQLite via `/api/progress`
  using Node's built-in `node:sqlite` (no native deps). DB file: `data/progress.db`.
- A Supabase adapter for a Vercel deploy would be a third class in the same file.

## Tests

```bash
npm test              # content integrity + code exercises + GRE bank + practice tests + answer choices
npm run test:content    # every Check/Exercise/Visual/TradeoffTable reference
                        # resolves; frontmatter valid; cheatsheet terminal +
                        # registered; question ids unique; prereqs exist
npm run test:exercises  # runs every code exercise's SOLUTION against its
                        # hidden tests with real Python (same contract as the
                        # in-browser Pyodide harness), asserts the starter
                        # FAILS them, and that a complexity check exists
npm run test:bank       # builds all 11,773 GRE bank questions and checks
                        # each one (structure, answer consistency, no broken
                        # text, no duplicates), the set partition, review
                        # variants, and every hand-written GRE check.
                        # `node scripts/check-gre-bank.mjs --sample 10 tc-`
                        # prints random questions for a read-through
npm run test:tests      # checks the 10 practice tests against the real test's
                        # blueprint (section sizes, minutes, question-type
                        # order), checks every question's structure, and
                        # checks that each keyed answer grades as correct
                        # through the app's own grading code. Also checks
                        # that harder second sections are harder, that ids
                        # and content are unique, and that the scoring model
                        # is monotonic. `--print 3 v2h` prints a section
npm run test:lengths    # no multiple-choice question in any course gives
                        # itself away: the right answer is never noticeably
                        # longer than the wrong ones, options run about the
                        # same length, and the right answer is spread evenly
                        # across the letters. `--list` prints every failure
npm run test:e2e        # full browser sweep: all 214 routes load with zero
                        # page errors, visual stepping + drive-it-yourself,
                        # MCQ grading, progress persistence across reload,
                        # review-queue round trip, every GRE answer format,
                        # the practice bank (practice + timed sets, results,
                        # review of a bank question), a full practice test
                        # (essay, keyed answers → harder route, mark/review,
                        # save & resume, calculator transfer, results,
                        # misses → review queue), print stylesheet,
                        # progress API roundtrip, grade API error hygiene,
                        # rate guard
```

`content/courses/gre/questions.ts` is generated: after adding a GRE lesson
(its `questions.ts` exports `QUESTIONS`), run
`python3 scripts/gen-gre-questions.py` to regenerate the aggregator in
curriculum order.

`test` needs only Node ≥ 22.18 (the bank check runs the TypeScript
generators with Node's built-in type stripping) + Python 3. `test:e2e` additionally needs a
production build (`npm run build`), `playwright-core`
(`npm i --no-save playwright-core`), and a Chromium binary — point
`CHROMIUM_PATH` at one if it isn't in the default location.

## Deploy to Vercel

Local dev remains the primary target (spec §3), but the app deploys to
Vercel as-is:

1. **Import the repo** at [vercel.com/new](https://vercel.com/new) — the
   framework preset auto-detects Next.js; no build settings to change.
   (Or from the CLI: `npx vercel`, then `npx vercel --prod`.)
2. **Set one environment variable** in Project → Settings → Environment
   Variables: `OPENAI_API_KEY`. That's the only required secret; it is read
   exclusively inside the `/api/chat` and `/api/grade` route handlers and
   never reaches a client bundle. Optionally set `OPENAI_MODEL` to override
   the default in `lib/config.ts`, and `SITE_PASSWORD` to change the site
   password from its default (see below).
3. **Leave persistence on the default (localStorage).** Do NOT set
   `NEXT_PUBLIC_PERSIST=sqlite` on Vercel — serverless filesystems are
   ephemeral, so the SQLite file would vanish between invocations.
   localStorage gives durable single-user progress in the browser you study
   from, which matches how this app is used. If you later want progress to
   follow you across devices, add a Supabase adapter as a third class in
   `lib/progress/repo.ts` (the one-file swap point) — the repo interface is
   two methods, `load()` and `save()`.

Notes that make this work (already wired):

- `next.config.mjs` traces `content/**` into the serverless bundle via
  `outputFileTracingIncludes`, so the dynamic routes (`/practice`, which
  reads `searchParams`) can read lesson MDX at request time. All lesson,
  module, and cheatsheet pages are statically generated at build.
- Pyodide loads client-side from the jsDelivr CDN — nothing to configure.
- The in-process rate guard on the OpenAI routes works per serverless
  instance; for a single-user app that is plenty.

### Password gate

Once deployed, anyone with the URL could otherwise hit `/api/chat` or
`/api/grade` directly and spend your OpenAI credits — a client-only check
(e.g. something read from localStorage) can't stop that, since nothing
prevents a request from reaching those routes without ever loading the page.
So the whole site sits behind one shared password, enforced in
**`middleware.ts`**, which runs before any page or API route:

- Default password: **`Hello227`**. Override it by setting `SITE_PASSWORD`
  in Vercel's environment variables (or `.env.local` locally) — no code
  change needed.
- Enter it once at `/unlock`; a long-lived (~6 month) `httpOnly` cookie
  remembers you after that, so there's no repeated login. There's no
  account system, no session store — just one password compared server-side
  in `lib/site-lock.ts`, and the same in-process rate guard used by the
  OpenAI routes applies to unlock attempts too.
- This is a deterrent, not a security boundary against a determined
  attacker — there's no email/2FA/rotation. For a single-user personal tool
  behind an unlisted URL, that trade is intentional.

## Decisions on the spec's open questions (§14)

Made autonomously; all trivially reversible:

1. **Local-first.** localStorage default + sqlite adapter; deploy story left
   as the documented swap.
2. **All 12 modules stubbed up front** — the dashboard shows the whole map,
   and stubs carry their visuals + cheatsheet skeletons so `/reference` and
   `/review` span the full curriculum now.
3. **Tutor does not see code-exercise attempts** — it sees the lesson source,
   objectives, cheatsheet, scroll position, and your last wrong answer.
   Adding attempts later = one field in `TutorDrawer`'s fetch body.

## Deviations from the spec

- **shadcn/ui not used** (§3 said "where useful"): every component is
  hand-rolled on the token layer — less dependency surface, and the app was
  explicitly not supposed to look like a shadcn app.
- **`better-sqlite3` replaced by Node's built-in `node:sqlite`** — same
  SQLite, zero native compilation, still behind the repository interface.
- Framer Motion is used where it earns its bundle (tutor drawer); visuals
  animate via CSS transitions on SVG — inspectable DOM, as required.
