import React from 'react';
import { CLUSTERS, type Pos } from '@/content/courses/gre/bank/verbal/clusters';

const POS_LABEL: Record<Pos, string> = { adj: 'Adjectives', verb: 'Verbs', noun: 'Nouns' };
const tidy = (g: string) => g.replace(/\s*\((mass|plural|singular)\)/g, '');

/**
 * The course's core word list, grouped into meaning families — the same
 * families the practice bank draws from. Server-rendered, static.
 */
export function WordFamilies() {
  const ids = new Map(CLUSTERS.map((c) => [c.id, c]));
  return (
    <div className="not-prose my-8 space-y-8">
      {(['adj', 'verb', 'noun'] as Pos[]).map((pos) => {
        const cs = CLUSTERS.filter((c) => c.pos === pos);
        return (
          <section key={pos}>
            <h3 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {POS_LABEL[pos]} · {cs.length} families · {cs.reduce((n, c) => n + c.words.length, 0)} words
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {cs.map((c) => (
                <div key={c.id} className="rounded-md border border-line bg-panel px-3.5 py-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-[13.5px] font-semibold">{tidy(c.gist)}</span>
                    {c.opposite && (
                      <span className="font-mono text-[10px] text-faint">
                        ≠ {tidy(ids.get(c.opposite)?.gist ?? '').split(';')[0]}
                      </span>
                    )}
                  </div>
                  <ul className="mt-1.5 space-y-0.5 text-[12.5px] leading-snug">
                    {c.words.map((w) => (
                      <li key={w.w}>
                        <span className="font-semibold">{w.w}</span>
                        <span className="text-ink-soft"> — {w.def}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
