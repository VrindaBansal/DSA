# Invariant — personal learning portal

my own personal coursera/duolingo/khan academy.

Single-user web app that teaches technical subjects through interactive text
lectures, lockstep code-and-animation visuals, inline comprehension checks,
in-browser Python exercises, an AI tutor, and a spaced repetition queue.
Started from `dsa-portal-spec.md` (codename "Grok", renamed **Invariant**) and
grew into a **multi-course** platform.

## Courses

Two courses ship today, both built the same way (concept-first, real-world
anchors, tested constantly):

- **Data structures & algorithms** — 12 modules, 16 lessons, fully authored.
- **Large language models** — 12 modules, 12 lessons. Tokenization → embeddings
  → attention → decoding → prompting → RAG → tools → agents → agentic workflows
  → evaluation → fine-tuning → inference. Three lessons fully authored
  (tokenization, RAG, agents) with five interactive visuals; the other nine are
  strong stubs (framing prose + a check + a genuinely exam-ready cheatsheet).

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
content/questions/index.ts           GLOBAL aggregator of every course's banks
content/cheatsheets.ts               GLOBAL aggregator of every cheatsheet
content/tradeoffs.ts                 GLOBAL aggregator of every tradeoff table
components/blocks/                   the authoring primitives
components/visuals/                  DSA visuals + shared engine
components/visuals/llm/              LLM visuals (BPE, cosine, attention, RAG, agent loop)
lib/progress/repo.ts                 THE persistence swap point (see below)
```

Routes: `/` is the **course picker**; `/course/[courseId]` is a course
dashboard; `/module/[slug]` and `/lesson/[slug]` use globally-unique slugs;
`/practice`, `/review`, and `/reference` span all courses with a course filter.

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
swap point required by §3:

- **default**: browser `localStorage` — zero setup, survives restarts.
- **`NEXT_PUBLIC_PERSIST=sqlite`**: server-side SQLite via `/api/progress`
  using Node's built-in `node:sqlite` (no native deps). DB file: `data/progress.db`.
- A Supabase adapter for a Vercel deploy would be a third class in the same file.

## Tests

```bash
npm test              # content integrity + code-exercise validation
npm run test:content    # every Check/Exercise/Visual/TradeoffTable reference
                        # resolves; frontmatter valid; cheatsheet terminal +
                        # registered; question ids unique; prereqs exist
npm run test:exercises  # runs every code exercise's SOLUTION against its
                        # hidden tests with real Python (same contract as the
                        # in-browser Pyodide harness), asserts the starter
                        # FAILS them, and that a complexity check exists
npm run test:e2e        # full browser sweep: all 49 routes load with zero
                        # page errors, visual stepping + drive-it-yourself,
                        # MCQ grading, progress persistence across reload,
                        # review-queue round trip, print stylesheet, progress
                        # API roundtrip, grade API error hygiene, rate guard
```

`test` needs only Node + Python 3. `test:e2e` additionally needs a
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
