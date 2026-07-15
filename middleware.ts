import { NextResponse, type NextRequest } from 'next/server';
import { UNLOCK_COOKIE, isValidToken } from '@/lib/site-lock';

// Gates every route behind the site password (see lib/site-lock.ts). Runs
// before any page render or API handler, so this is what actually protects
// the OpenAI-backed /api/chat and /api/grade from an unauthenticated visitor
// — a client-only check (e.g. localStorage) couldn't do that, since nothing
// stops a request from hitting those routes directly.
export async function middleware(req: NextRequest) {
  const token = req.cookies.get(UNLOCK_COOKIE)?.value;
  if (await isValidToken(token)) return NextResponse.next();

  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'locked' }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = '/unlock';
  url.searchParams.set('next', req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|unlock|api/unlock).*)'],
};
