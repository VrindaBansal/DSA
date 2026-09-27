import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

export const PT5: PracticeTest = {
  id: 'pt-5',
  number: 5,
  title: 'Practice Test 5',
  essay: {
    claim:
      'When a historic building stands in the way of something a community needs now, the community’s present needs should come first.',
    task: 'Write a response in which you discuss the extent to which you agree or disagree with the recommendation and explain your reasoning for the position you take. In developing and supporting your position, describe specific circumstances in which adopting the recommendation would or would not be advantageous and explain how these examples shape your position.',
  },
  order: ['v1', 'q1', 'q2', 'v2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
