// Deterrent-grade site lock (not real auth): one shared password gates the
// whole deployment so a stranger who finds the URL can't burn the OpenAI key.
// No accounts, no sessions in a DB — just a cookie set after one correct
// password, checked in middleware before anything else runs. Not marked
// "server-only" because Next.js middleware (Edge runtime) imports it too.

export const UNLOCK_COOKIE = 'invariant_unlock';

export function sitePassword(): string {
  // Override with SITE_PASSWORD in .env.local / Vercel env vars to change it
  // without touching source. Falls back to a default so this works with zero
  // config, as requested.
  return process.env.SITE_PASSWORD?.trim() || 'Hello227';
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** The cookie never stores the password itself, only this hash. */
export async function expectedToken(): Promise<string> {
  return sha256Hex(sitePassword());
}

export async function isValidToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await expectedToken();
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
