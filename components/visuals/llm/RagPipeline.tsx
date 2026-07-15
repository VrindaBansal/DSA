'use client';

import React from 'react';
import { useVisualEngine, makeEmitter, type Frame } from '../engine';
import { VisualShell, CodePane, KV, DriveBtn } from '../shell';

// The RAG pipeline as a flow: query → retrieve → rerank → ground → generate.
// The teaching beat: retrieval decides everything; reranking fixes precision.

interface Chunk {
  id: string;
  text: string;
  vec: number; // toy vector score vs query (retrieval)
  rer: number; // reranker score (precision)
}

interface RAG {
  stage: number; // 0 embed, 1 retrieve, 2 rerank, 3 ground, 4 generate
  retrieved: string[]; // ids passing retrieval
  reranked: string[]; // ids passing rerank
  answer: string | null;
}

const CHUNKS: Chunk[] = [
  { id: 'A', text: 'Refunds are issued within 5 business days.', vec: 0.61, rer: 0.94 },
  { id: 'B', text: 'Our office is open 9–5 on weekdays.', vec: 0.66, rer: 0.10 },
  { id: 'C', text: 'To request a refund, use the Orders page.', vec: 0.58, rer: 0.88 },
  { id: 'D', text: 'Shipping is free over $50.', vec: 0.55, rer: 0.12 },
  { id: 'E', text: 'The cafeteria serves lunch at noon.', vec: 0.40, rer: 0.02 },
];

const QUERY = 'how do I get a refund and how long does it take?';

const CODE = [
  '# query: "how do I get a refund…?"',
  'qv     = embed(query)',
  'hits   = vector_db.search(qv, k=4)   # recall',
  'top    = rerank(query, hits)[:2]     # precision',
  'ctx    = "\\n".join(c.text for c in top)',
  'answer = llm(GROUND_PROMPT + ctx + query)',
];

const STAGES = ['embed query', 'retrieve (top-4)', 'rerank (top-2)', 'ground context', 'generate'];

function program(): Frame<RAG>[] {
  const frames: Frame<RAG>[] = [];
  const emit = makeEmitter(frames);
  emit({ stage: -1, retrieved: [], reranked: [], answer: null }, 0, 'a docs-Q&A query arrives');
  emit({ stage: 0, retrieved: [], reranked: [], answer: null }, 1, 'embed the query into a vector');
  const retrieved = [...CHUNKS].sort((a, b) => b.vec - a.vec).slice(0, 4).map((c) => c.id);
  emit(
    { stage: 1, retrieved, reranked: [], answer: null },
    2,
    `vector search returns top-4 by similarity: ${retrieved.join(', ')} — note B (“office hours”) sneaks in`,
  );
  const reranked = [...CHUNKS]
    .filter((c) => retrieved.includes(c.id))
    .sort((a, b) => b.rer - a.rer)
    .slice(0, 2)
    .map((c) => c.id);
  emit(
    { stage: 2, retrieved, reranked, answer: null },
    3,
    `reranker re-scores query+chunk together → ${reranked.join(', ')}; the irrelevant B is dropped`,
  );
  emit({ stage: 3, retrieved, reranked, answer: null }, 4, 'stuff only the reranked chunks into a grounded prompt');
  emit(
    { stage: 4, retrieved, reranked, answer: 'Request a refund on the Orders page [C]; it’s issued within 5 business days [A].' },
    5,
    'generate — grounded in A + C, with citations',
  );
  return frames;
}

export default function RagPipelineVisual() {
  const engine = useVisualEngine<RAG>(program(), { baseMs: 1100 });
  const s = engine.frame.state;

  const chunkTone = (id: string) => {
    if (s.reranked.includes(id)) return { fill: 'var(--color-done-wash)', stroke: 'var(--color-done)' };
    if (s.retrieved.includes(id)) return { fill: 'var(--color-active-wash)', stroke: 'var(--color-active)' };
    return { fill: 'var(--color-paper)', stroke: 'var(--color-line)' };
  };

  return (
    <VisualShell
      figure="FIG · L6"
      title="RAG pipeline — retrieval first, reranking for precision, then ground"
      engine={engine}
      codeTitle="rag.py"
      code={<CodePane lines={CODE} active={engine.frame.line} />}
      readout={
        <>
          <KV k="stage" v={s.stage >= 0 ? STAGES[s.stage] : 'query'} tone="active" />
          {s.retrieved.length > 0 && <KV k="retrieved" v={s.retrieved.join(',')} />}
          {s.reranked.length > 0 && <KV k="kept" v={s.reranked.join(',')} tone="done" />}
        </>
      }
      drive={<DriveBtn onClick={() => engine.setProgram(program())}>replay</DriveBtn>}
      svg={
        <svg viewBox="0 0 380 250" className="mx-auto block w-full max-w-[460px]" role="img" aria-label="RAG pipeline animation">
          {/* stage rail */}
          {STAGES.map((st, i) => (
            <g key={i}>
              <rect
                x={8 + i * 74}
                y={8}
                width={68}
                height={22}
                rx={4}
                fill={s.stage === i ? 'var(--color-active-wash)' : 'var(--color-panel)'}
                stroke={s.stage === i ? 'var(--color-active)' : s.stage > i ? 'var(--color-done)' : 'var(--color-line)'}
                strokeWidth={s.stage === i ? 1.8 : 1}
              />
              <text x={8 + i * 74 + 34} y={22} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--color-ink)">
                {st}
              </text>
              {i < STAGES.length - 1 && (
                <text x={8 + i * 74 + 70} y={22} fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-faint)">
                  ›
                </text>
              )}
            </g>
          ))}

          {/* chunks */}
          {CHUNKS.map((c, i) => {
            const y = 48 + i * 30;
            const t = chunkTone(c.id);
            const dropped = s.stage >= 2 && s.retrieved.includes(c.id) && !s.reranked.includes(c.id);
            return (
              <g key={c.id} style={{ transition: 'opacity .3s' }} opacity={s.stage >= 1 && !s.retrieved.includes(c.id) ? 0.3 : 1}>
                <rect x={8} y={y} width={300} height={24} rx={3} fill={t.fill} stroke={dropped ? 'var(--color-alert)' : t.stroke} strokeWidth={1.2} style={{ transition: 'fill .3s, stroke .3s' }} />
                <text x={14} y={y + 16} fontFamily="var(--font-mono)" fontSize="9" fontWeight={700} fill="var(--color-muted)">
                  {c.id}
                </text>
                <text x={30} y={y + 16} fontFamily="var(--font-body)" fontSize="10.5" fill="var(--color-ink)">
                  {c.text.length > 42 ? c.text.slice(0, 42) + '…' : c.text}
                </text>
                <text x={314} y={y + 16} fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--color-faint)">
                  {s.stage >= 2 && s.retrieved.includes(c.id) ? `r${c.rer.toFixed(2)}` : `v${c.vec.toFixed(2)}`}
                </text>
              </g>
            );
          })}

          {/* answer */}
          {s.answer && (
            <g>
              <rect x={8} y={210} width={362} height={32} rx={4} fill="var(--color-done-wash)" stroke="var(--color-done)" strokeWidth={1.4} />
              <text x={14} y={223} fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-done)">
                GROUNDED ANSWER
              </text>
              <text x={14} y={236} fontFamily="var(--font-body)" fontSize="10" fill="var(--color-ink)">
                {s.answer.length > 62 ? s.answer.slice(0, 62) + '…' : s.answer}
              </text>
            </g>
          )}
        </svg>
      }
    />
  );
}
