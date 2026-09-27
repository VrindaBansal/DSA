import type { Question } from '@/lib/types';
import { QUESTIONS as overview } from './lessons/gre-overview/questions';
import { QUESTIONS as studyPlan } from './lessons/gre-study-plan/questions';
import { QUESTIONS as vocabMethod } from './lessons/gre-vocab-method/questions';
import { QUESTIONS as vocabCore } from './lessons/gre-vocab-core/questions';
import { QUESTIONS as integers } from './lessons/gre-integers/questions';
import { QUESTIONS as exponentsRoots } from './lessons/gre-exponents-roots/questions';
import { QUESTIONS as fractionsDecimals } from './lessons/gre-fractions-decimals/questions';
import { QUESTIONS as tcMethod } from './lessons/gre-tc-method/questions';
import { QUESTIONS as tcMulti } from './lessons/gre-tc-multi/questions';
import { QUESTIONS as quantComparison } from './lessons/gre-quant-comparison/questions';
import { QUESTIONS as quantTactics } from './lessons/gre-quant-tactics/questions';
import { QUESTIONS as seMethod } from './lessons/gre-se-method/questions';
import { QUESTIONS as percents } from './lessons/gre-percents/questions';
import { QUESTIONS as ratios } from './lessons/gre-ratios/questions';
import { QUESTIONS as ratesWork } from './lessons/gre-rates-work/questions';
import { QUESTIONS as rcMethod } from './lessons/gre-rc-method/questions';
import { QUESTIONS as rcArguments } from './lessons/gre-rc-arguments/questions';
import { QUESTIONS as linear } from './lessons/gre-linear/questions';
import { QUESTIONS as quadratics } from './lessons/gre-quadratics/questions';
import { QUESTIONS as functionsSequences } from './lessons/gre-functions-sequences/questions';
import { QUESTIONS as issueEssay } from './lessons/gre-issue-essay/questions';
import { QUESTIONS as linesTriangles } from './lessons/gre-lines-triangles/questions';
import { QUESTIONS as circlesPolygonsSolids } from './lessons/gre-circles-polygons-solids/questions';
import { QUESTIONS as coordinate } from './lessons/gre-coordinate/questions';
import { QUESTIONS as statistics } from './lessons/gre-statistics/questions';
import { QUESTIONS as countingProbability } from './lessons/gre-counting-probability/questions';
import { QUESTIONS as dataInterpretation } from './lessons/gre-data-interpretation/questions';
import { QUESTIONS as testDay } from './lessons/gre-test-day/questions';
import { QUESTIONS as practiceBank } from './lessons/gre-practice-bank/questions';

// GRE lesson checks, in curriculum order. Aggregated globally in
// content/questions/index.ts. Regenerate with scripts/gen-gre-questions.py.
export const QUESTIONS: Question[] = [
  ...overview,
  ...studyPlan,
  ...vocabMethod,
  ...vocabCore,
  ...integers,
  ...exponentsRoots,
  ...fractionsDecimals,
  ...tcMethod,
  ...tcMulti,
  ...quantComparison,
  ...quantTactics,
  ...seMethod,
  ...percents,
  ...ratios,
  ...ratesWork,
  ...rcMethod,
  ...rcArguments,
  ...linear,
  ...quadratics,
  ...functionsSequences,
  ...issueEssay,
  ...linesTriangles,
  ...circlesPolygonsSolids,
  ...coordinate,
  ...statistics,
  ...countingProbability,
  ...dataInterpretation,
  ...testDay,
  ...practiceBank,
];
