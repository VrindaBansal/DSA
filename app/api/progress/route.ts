import { NextResponse } from 'next/server';

// SQLite adapter endpoint for the progress repository (spec §3, Phase 6).
// Uses Node's built-in sqlite so there is no native dependency to compile.
// Single-user app: one row, whole-state JSON. The repository interface in
// lib/progress/repo.ts is the only caller.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getDb() {
  const { DatabaseSync } = await import('node:sqlite');
  const fs = await import('node:fs');
  const path = await import('node:path');
  const dir = path.join(process.cwd(), 'data');
  fs.mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, 'progress.db'));
  db.exec(
    'CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY CHECK (id = 1), state TEXT NOT NULL, updated_at INTEGER NOT NULL)',
  );
  return db;
}

export async function GET() {
  try {
    const db = await getDb();
    const row = db
      .prepare('SELECT state FROM progress WHERE id = 1')
      .get() as { state: string } | undefined;
    db.close();
    return NextResponse.json(row ? JSON.parse(row.state) : null);
  } catch (err) {
    return NextResponse.json(
      { error: `sqlite unavailable: ${String(err)}` },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const state = await req.json();
    const db = await getDb();
    db.prepare(
      `INSERT INTO progress (id, state, updated_at) VALUES (1, ?, ?)
       ON CONFLICT(id) DO UPDATE SET state = excluded.state, updated_at = excluded.updated_at`,
    ).run(JSON.stringify(state), Date.now());
    db.close();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: `sqlite unavailable: ${String(err)}` },
      { status: 500 },
    );
  }
}
