# Invariant — personal DSA learning portal

learning data structures and algorithms with my own personal
coursera/duolingo/khan academy.

Single-user web app that teaches DSA through interactive text lectures,
lockstep code-and-animation visuals, inline comprehension checks, in-browser
Python exercises, an AI tutor, and a spaced repetition queue. Built to
`dsa-portal-spec.md` — codename "Grok" in the spec, renamed **Invariant**
(the spec said rename freely).

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

## Where things live

```
content/lessons/<id>/lesson.mdx    the lecture (frontmatter + block components)
content/lessons/<id>/questions.ts  that lesson's question bank
content/lessons/<id>/cheatsheet.ts structured cheatsheet data
content/questions/index.ts         one-line registration per bank
content/cheatsheets.ts             one-line registration per cheatsheet
content/tradeoffs.ts               normalized tradeoff tables (aggregated on /reference)
components/blocks/                 the 10 authoring primitives (§5.1)
components/visuals/                the 11 interactive visuals + shared engine
lib/progress/repo.ts               THE persistence swap point (see below)
lib/config.ts                      model name, rate limit, persistence mode
```

Adding a lesson = drop a directory under `content/lessons/` with a
`lesson.mdx`, plus (optionally) `questions.ts` + `cheatsheet.ts` and two
one-line imports in the registries. No app code changes.

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

## Deploy to Vercel

Local dev remains the primary target (spec §3), but the app deploys to
Vercel as-is:

1. **Import the repo** at [vercel.com/new](https://vercel.com/new) — the
   framework preset auto-detects Next.js; no build settings to change.
   (Or from the CLI: `npx vercel`, then `npx vercel --prod`.)
2. **Set one environment variable** in Project → Settings → Environment
   Variables: `OPENAI_API_KEY`. That's the only secret; it is read
   exclusively inside the `/api/chat` and `/api/grade` route handlers and
   never reaches a client bundle. Optionally set `OPENAI_MODEL` to override
   the default in `lib/config.ts`.
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
