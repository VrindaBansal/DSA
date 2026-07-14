import type { AppState } from '../types';
import { emptyAppState } from '../types';
import { PERSIST_MODE } from '../config';

// ---------------------------------------------------------------------------
// The data layer behind a thin repository interface (spec §3): the rest of
// the app only ever sees ProgressRepo. Swapping backends = editing this file.
//   - LocalStorageRepo: default, zero setup, survives browser restarts.
//   - ApiRepo: server-side node:sqlite via /api/progress (NEXT_PUBLIC_PERSIST=sqlite).
//   - A Supabase adapter would slot in the same way for a Vercel deploy.
// ---------------------------------------------------------------------------

export interface ProgressRepo {
  load(): Promise<AppState>;
  save(state: AppState): Promise<void>;
}

const KEY = 'invariant.progress.v1';

class LocalStorageRepo implements ProgressRepo {
  async load(): Promise<AppState> {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return emptyAppState();
      return { ...emptyAppState(), ...JSON.parse(raw) };
    } catch {
      return emptyAppState();
    }
  }
  async save(state: AppState): Promise<void> {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // quota errors etc. — progress is best-effort, never crash the app
    }
  }
}

class ApiRepo implements ProgressRepo {
  async load(): Promise<AppState> {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      return { ...emptyAppState(), ...(data ?? {}) };
    } catch {
      return emptyAppState();
    }
  }
  async save(state: AppState): Promise<void> {
    try {
      await fetch('/api/progress', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(state),
      });
    } catch {
      // offline — next save wins
    }
  }
}

export const createRepo = (): ProgressRepo =>
  PERSIST_MODE === 'sqlite' ? new ApiRepo() : new LocalStorageRepo();
