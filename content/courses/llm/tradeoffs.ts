import type { TradeoffTableData } from '@/lib/types';

// LLM comparison tables, aggregated globally in content/tradeoffs.ts and shown
// on /reference. Referenced from lessons via <TradeoffTable id="..." />.

export const TRADEOFFS: TradeoffTableData[] = [
  {
    id: 'llm-adaptation-ladder',
    lessonId: 'prompting',
    title: 'How to make the model do what you want — cheapest lever first',
    columns: ['adds', 'cost', 'good for', "can't do"],
    rows: [
      { label: 'Prompting', cells: ['instructions/format', '~free', 'behavior, format, simple tasks', 'add missing knowledge'] },
      { label: 'Few-shot', cells: ['examples at runtime', 'tokens/call', 'consistent format, edge cases', 'large knowledge'] },
      { label: 'RAG', cells: ['live/private facts', 'infra + tokens', 'current, citable knowledge', 'change core behavior/style'] },
      { label: 'Fine-tuning', cells: ['baked-in behavior', 'training + data', 'style/format at scale, latency', 'fresh facts (goes stale)'] },
    ],
    note: 'Try top to bottom; stop at the cheapest lever that works. RAG and fine-tuning compose: retrieve WHAT, fine-tune HOW.',
  },
  {
    id: 'llm-rag-vs-finetune',
    lessonId: 'rag',
    title: 'RAG vs fine-tuning for “make it know X”',
    columns: ['knowledge freshness', 'citations', 'cost to update', 'best when'],
    rows: [
      { label: 'RAG', cells: ['live (re-retrieve)', 'yes — sources', 'reindex docs', 'facts change or must be cited'] },
      { label: 'Fine-tuning', cells: ['frozen snapshot', 'no', 'retrain', 'behavior/format/style, not facts'] },
    ],
    note: 'For changing, private, or citable knowledge: RAG. For consistent behavior/format at scale: fine-tune. They are not substitutes.',
  },
  {
    id: 'llm-workflow-vs-agent',
    lessonId: 'agentic-workflows',
    title: 'Workflow vs agent',
    columns: ['control flow', 'predictability', 'cost/latency', 'use when'],
    rows: [
      { label: 'Workflow', cells: ['fixed, coded', 'high — testable', 'lower', 'steps are known in advance'] },
      { label: 'Single agent', cells: ['model decides', 'medium', 'higher', 'steps unknown; needs to adapt'] },
      { label: 'Multi-agent', cells: ['agents coordinate', 'low', 'highest', 'genuinely parallel/independent sub-tasks'] },
    ],
    note: 'Use the least autonomy that solves the task. Most production “agents” are workflows with one or two agentic steps.',
  },
  {
    id: 'llm-decoding-settings',
    lessonId: 'decoding',
    title: 'Decoding settings by task',
    columns: ['temperature', 'why', 'example'],
    rows: [
      { label: 'Extraction / classification', cells: ['0 (greedy)', 'reproducible, single best answer', 'parse fields → JSON'] },
      { label: 'Tool / function calls', cells: ['0', 'valid, stable arguments', 'call get_weather(city)'] },
      { label: 'General assistant', cells: ['~0.3–0.7', 'natural but grounded', 'answer a support question'] },
      { label: 'Brainstorming / creative', cells: ['~0.8–1.2', 'diversity is the point', 'name ideas, draft copy'] },
    ],
    note: 'Temperature controls variance, never truth. Pair low temp with grounding for reliability; raise it only when diversity helps.',
  },
];
