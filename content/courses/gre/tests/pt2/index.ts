import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

export const PT2: PracticeTest = {
  id: 'pt-2',
  number: 2,
  title: 'Practice Test 2',
  essay: {
    claim:
      'A community’s investment in public libraries, parks, and other shared spaces does more for its long-term prosperity than tax incentives for new businesses.',
    task: 'Write a response in which you discuss the extent to which you agree or disagree with the claim. In developing and supporting your position, consider ways in which the claim might or might not hold true and explain how these considerations shape your position.',
  },
  order: ['q1', 'q2', 'v1', 'v2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
