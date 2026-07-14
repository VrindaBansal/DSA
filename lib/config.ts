// Single place to swap the model (spec §3).
export const OPENAI_MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

export const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Trivial rate guard so a runaway render loop can't drain credits (spec §8):
// max requests per rolling minute, enforced in-process in the route handlers.
export const RATE_LIMIT_PER_MINUTE = 20;

// Persistence backend for progress state (spec §3, §11).
//   'local'  → browser localStorage (default; zero setup)
//   'sqlite' → node:sqlite on the server via /api/progress
// Swap by setting NEXT_PUBLIC_PERSIST=sqlite in .env.local.
export const PERSIST_MODE =
  process.env.NEXT_PUBLIC_PERSIST === 'sqlite' ? 'sqlite' : 'local';
