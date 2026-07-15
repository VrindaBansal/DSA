import { NextResponse } from 'next/server';
import { UNLOCK_COOKIE, expectedToken, sitePassword } from '@/lib/site-lock';
import { rateLimited } from '@/lib/rate-guard';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (rateLimited()) {
    return NextResponse.json(
      { error: 'Too many attempts. Wait a minute.' },
      { status: 429 },
    );
  }

  const body = (await req.json().catch(() => ({}))) as { password?: string };
  if (body.password !== sitePassword()) {
    return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(UNLOCK_COOKIE, await expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 180, // ~6 months — "remember me," no re-login
  });
  return res;
}
