'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { BlockShell } from './BlockShell';

const skeleton = () => (
  <div className="my-8 flex h-64 items-center justify-center rounded-md border-[1.5px] border-ink bg-panel">
    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
      loading visual…
    </span>
  </div>
);

// Every interactive animation, registered by id (spec §7).
const REGISTRY: Record<string, React.ComponentType> = {
  'ring-buffer': dynamic(() => import('@/components/visuals/RingBuffer'), {
    ssr: false,
    loading: skeleton,
  }),
  'amortized-doubling': dynamic(
    () => import('@/components/visuals/AmortizedDoubling'),
    { ssr: false, loading: skeleton },
  ),
  'hash-collisions': dynamic(
    () => import('@/components/visuals/HashCollisions'),
    { ssr: false, loading: skeleton },
  ),
  'sliding-window': dynamic(() => import('@/components/visuals/SlidingWindow'), {
    ssr: false,
    loading: skeleton,
  }),
  'linked-reversal': dynamic(
    () => import('@/components/visuals/LinkedReversal'),
    { ssr: false, loading: skeleton },
  ),
  'heap-sift': dynamic(() => import('@/components/visuals/HeapSift'), {
    ssr: false,
    loading: skeleton,
  }),
  'bst-ops': dynamic(() => import('@/components/visuals/BstOps'), {
    ssr: false,
    loading: skeleton,
  }),
  'bfs-dfs': dynamic(() => import('@/components/visuals/BfsDfs'), {
    ssr: false,
    loading: skeleton,
  }),
  'sorting-race': dynamic(() => import('@/components/visuals/SortingRace'), {
    ssr: false,
    loading: skeleton,
  }),
  'binary-search': dynamic(() => import('@/components/visuals/BinarySearch'), {
    ssr: false,
    loading: skeleton,
  }),
  'dp-table': dynamic(() => import('@/components/visuals/DpTable'), {
    ssr: false,
    loading: skeleton,
  }),

  // --- LLM course --------------------------------------------------------
  'llm-bpe': dynamic(() => import('@/components/visuals/llm/BpeMerge'), {
    ssr: false,
    loading: skeleton,
  }),
  'llm-cosine': dynamic(() => import('@/components/visuals/llm/CosineSim'), {
    ssr: false,
    loading: skeleton,
  }),
  'llm-attention': dynamic(() => import('@/components/visuals/llm/Attention'), {
    ssr: false,
    loading: skeleton,
  }),
  'llm-rag-pipeline': dynamic(() => import('@/components/visuals/llm/RagPipeline'), {
    ssr: false,
    loading: skeleton,
  }),
  'llm-agent-loop': dynamic(() => import('@/components/visuals/llm/AgentLoop'), {
    ssr: false,
    loading: skeleton,
  }),
};

export function VisualBlock({
  lessonId,
  blockId,
  id,
}: {
  lessonId: string;
  blockId: string;
  id: string;
}) {
  const Comp = REGISTRY[id];
  if (!Comp) {
    return (
      <div className="my-6 rounded border border-alert bg-alert-wash p-3 font-mono text-[12px] text-alert">
        Unknown visual: {id}
      </div>
    );
  }
  return (
    <BlockShell lessonId={lessonId} blockId={blockId}>
      <Comp />
    </BlockShell>
  );
}
