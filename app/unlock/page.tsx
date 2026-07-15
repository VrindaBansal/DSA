'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function UnlockForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(j.error ?? 'Wrong password.');
      }
      const next = params.get('next');
      router.replace(next && next.startsWith('/') ? next : '/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center px-5">
      <div className="w-full rounded-md border-[1.5px] border-ink bg-panel p-6">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Invariant
        </div>
        <h1 className="mb-4 font-display text-[1.3rem] font-bold tracking-tight">
          Enter password
        </h1>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="password"
            className="w-full rounded border border-line-strong bg-paper px-3 py-2 font-mono text-[14px] outline-none focus:border-active"
          />
          {error && <p className="font-mono text-[12px] text-alert">{error}</p>}
          <button
            type="submit"
            disabled={busy || !password}
            className="w-full rounded border border-active bg-active px-3 py-2 font-mono text-[12.5px] text-white transition-colors hover:bg-active-deep disabled:opacity-40"
          >
            {busy ? 'checking…' : 'unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense>
      <UnlockForm />
    </Suspense>
  );
}
