import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

export const PT3: PracticeTest = {
  id: 'pt-3',
  number: 3,
  title: 'Practice Test 3',
  essay: {
    claim:
      'Leaders are most effective when they are willing to change their positions in response to new evidence, even at the risk of appearing inconsistent.',
    task: 'Write a response in which you discuss the extent to which you agree or disagree with the claim and explain your reasoning for the position you take. In developing and supporting your position, describe specific circumstances in which the claim would or would not hold true and explain how these examples shape your position.',
  },
  order: ['v1', 'q1', 'v2', 'q2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
