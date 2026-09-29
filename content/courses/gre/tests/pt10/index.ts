import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

// Untimed and essay-free: the four scored sections only, with no clock.
export const PT10: PracticeTest = {
  id: 'pt-10',
  number: 10,
  title: 'Practice Test 10',
  timed: false,
  order: ['q1', 'q2', 'v1', 'v2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
