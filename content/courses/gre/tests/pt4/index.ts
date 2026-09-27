import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

export const PT4: PracticeTest = {
  id: 'pt-4',
  number: 4,
  title: 'Practice Test 4',
  essay: {
    claim:
      'Experts who advise the public, such as scientists and economists, should be required to explain their conclusions in terms that non-experts can understand.',
    task: 'Write a response in which you discuss your views on the policy and explain your reasoning for the position you take. In developing and supporting your position, you should consider the possible consequences of implementing the policy and explain how these consequences shape your position.',
  },
  order: ['q1', 'v1', 'q2', 'v2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
