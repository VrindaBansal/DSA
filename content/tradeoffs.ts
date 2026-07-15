import type { TradeoffTableData } from '@/lib/types';
import { TRADEOFFS as dsa } from './courses/dsa/tradeoffs';
import { TRADEOFFS as llm } from './courses/llm/tradeoffs';
import { TRADEOFFS as leetcode } from './courses/leetcode/tradeoffs';

// Global aggregator of every course's normalized tradeoff tables. Blocks
// reference them by id via <TradeoffTable id="..." />; /reference lists them.
export const TRADEOFFS: TradeoffTableData[] = [...dsa, ...llm, ...leetcode];

export const TRADEOFF_BY_ID: Record<string, TradeoffTableData> =
  Object.fromEntries(TRADEOFFS.map((t) => [t.id, t]));
