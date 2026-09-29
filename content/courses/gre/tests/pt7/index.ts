import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

// Untimed and essay-free: the four scored sections only, with no clock.
export const PT7: PracticeTest = {
  id: 'pt-7',
  number: 7,
  title: 'Practice Test 7',
  timed: false,
  order: ['v1', 'v2', 'q1', 'q2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
