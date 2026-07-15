'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/lib/progress/provider';

const LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/practice', label: 'Practice' },
  { href: '/review', label: 'Review' },
  { href: '/reference', label: 'Reference' },
];

export function TopNav() {
  const pathname = usePathname();
  const { dueReview, ready } = useProgress();
  const due = ready ? dueReview().length : 0;

  if (pathname === '/unlock') return null;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-panel/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-8 px-5">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-[15px] font-semibold tracking-tight">
            Invariant
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-faint sm:inline">
            dsa portal
          </span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-[12px]">
          {LINKS.map(({ href, label }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded px-2.5 py-1 transition-colors ${
                  active
                    ? 'bg-active-wash text-active-deep'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {label}
                {href === '/review' && due > 0 && (
                  <span className="ml-1.5 rounded-sm bg-active px-1 py-px text-[10px] font-semibold text-white">
                    {due}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
