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

- **Module 1 (Complexity)** — 4 lessons fully authored.
- **Module 6 (Queues)** — 2 lessons fully authored (the flagship, per §12 Phase 1).
- Remaining 10 modules — stub lessons: objectives, their required visual,
  an anchor check question, and a real cheatsheet skeleton (the ops tables on
  `/reference` work today). Phase 7 fills in the prose.
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
