'use client';

import React from 'react';
import { BlockShell } from './BlockShell';
import { TRADEOFF_BY_ID } from '@/content/tradeoffs';

/**
 * Structured comparison rendered from normalized data (spec §5.1) so the
 * /reference page can aggregate every table in the app.
 */
export function TradeoffTableBlock({
  lessonId,
  blockId,
  id,
}: {
  lessonId: string;
  blockId: string;
  id: string;
}) {
  const data = TRADEOFF_BY_ID[id];
  if (!data) {
    return (
      <div className="my-6 rounded border border-alert bg-alert-wash p-3 font-mono text-[12px] text-alert">
        Unknown tradeoff table: {id}
      </div>
    );
  }
  return (
    <BlockShell lessonId={lessonId} blockId={blockId} className="my-8">
      <TradeoffTableView data={data} />
    </BlockShell>
  );
}

export function TradeoffTableView({
  data,
}: {
  data: (typeof TRADEOFF_BY_ID)[string];
}) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-panel">
      <div className="border-b border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Tradeoffs · {data.title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="border-b-[1.5px] border-ink px-4 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-muted" />
              {data.columns.map((c) => (
                <th
                  key={c}
                  className="border-b-[1.5px] border-ink px-4 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.label}>
                <td className="border-b border-line px-4 py-2 font-medium">
                  {r.label}
                </td>
                {r.cells.map((c, i) => (
                  <td
                    key={i}
                    className="border-b border-line px-4 py-2 font-mono text-[12px] text-ink-soft"
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.note && (
        <div className="px-4 py-2 text-[12.5px] italic text-muted">
          {data.note}
        </div>
      )}
    </div>
  );
}
