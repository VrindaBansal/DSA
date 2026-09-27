import type { PracticeTest } from '../types.ts';
import { V1, V2E, V2H } from './verbal.ts';
import { Q1, Q2E, Q2H } from './quant.ts';

export const PT1: PracticeTest = {
  id: 'pt-1',
  number: 1,
  title: 'Practice Test 1',
  essay: {
    claim:
      'Students learn more from struggling with a difficult problem on their own than from being shown how to solve it.',
    task: 'Write a response in which you discuss the extent to which you agree or disagree with the claim. In developing and supporting your position, be sure to address the most compelling reasons and/or examples that could be used to challenge your position.',
  },
  order: ['v1', 'v2', 'q1', 'q2'],
  sections: { v1: V1, v2e: V2E, v2h: V2H, q1: Q1, q2e: Q2E, q2h: Q2H },
};
