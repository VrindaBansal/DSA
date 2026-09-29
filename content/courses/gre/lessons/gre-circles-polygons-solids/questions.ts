import type { Question } from '@/lib/types';

// Practice questions for "Circles, polygons & solids" — two per idea, in lesson order.

const QC = [
  'Quantity A is greater.',
  'Quantity B is greater.',
  'The two quantities are equal.',
  'The relationship cannot be determined from the information given.',
];

export const QUESTIONS: Question[] = [
  // --- circle basics -------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-circ-area',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 1,
    prompt: 'A circle has a circumference of 10π. What is the area of the circle?',
    options: ['5π', '10π', '25π', '50π', '100π'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Find r: 2πr = 10π, so r = 5.\n**Step 2:** Area = πr² = π(5²) = **25π**.',
    distractorNotes: [
      '5 is the radius — the area needs r².',
      'That is the circumference, not the area.',
      'Correct.',
      'That is 2r² instead of r².',
      'That squares the diameter (10) instead of the radius.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-circ-compare',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'Compare Quantity A and Quantity B.',
    stimulus: {
      quantities: {
        a: 'The area of a circle with radius 4',
        b: 'The circumference of a circle with radius 8',
      },
    },
    options: QC,
    correctIndex: 2,
    explanation:
      '**Step 1:** Quantity A: π(4²) = 16π.\n**Step 2:** Quantity B: 2π(8) = 16π.\n**Answer:** the two quantities are **equal**. (One is an area and one is a length, but the question only compares the numbers.)',
    distractorNotes: [
      'Both work out to 16π.',
      'Both work out to 16π — B uses 2πr, not πr².',
      'Correct.',
      'Both radii are given, so both values are fixed.',
    ],
  },
  // --- arcs and sectors ------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-circ-sector',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'In a circle with circumference 24π, what is the length of an arc cut off by a central angle of 60°?',
    options: ['2π', '4π', '6π', '12π', '24π'],
    correctIndex: 1,
    explanation:
      '**Step 1:** What fraction of the circle? 60/360 = ⅙.\n**Step 2:** The arc is ⅙ of the circumference: ⅙ × 24π = **4π**.',
    distractorNotes: [
      'That is 1/12 of the circumference.',
      'Correct.',
      'That uses ¼ of the circle — 90°, not 60°.',
      'That uses ½ of the circle.',
      'That is the whole circumference.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-circ-sector-angle',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'A circle has radius 6. A sector of the circle has an area of 10π. What is the central angle of the sector, in degrees?',
    answer: 100,
    answerDisplay: '100',
    suffix: 'degrees',
    explanation:
      '**Step 1:** Whole area: π(6²) = 36π.\n**Step 2:** Fraction of the circle: 10π ÷ 36π = 10/36 = 5/18.\n**Step 3:** The angle is the same fraction of 360°: (5/18) × 360 = **100°**.',
  },
  // --- circles with other shapes ------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-circ-shaded',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt:
      'A circle is drawn inside a square with side length 10 so that the circle touches all four sides of the square. What is the area of the region inside the square but outside the circle?',
    options: ['100 − 25π', '100 − 10π', '100 − 50π', '100 − 100π', '25π'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Square area: 10² = 100.\n**Step 2:** Shared length: the circle’s diameter equals the side, 10, so r = 5 and the circle’s area is 25π.\n**Step 3:** Square − circle = **100 − 25π** (about 21.5).',
    distractorNotes: [
      'Correct.',
      '10π is the circle’s circumference, not its area.',
      'That uses 2r² for the circle’s area.',
      'That uses the diameter as the radius — and 100π is bigger than 100, so the answer would be negative.',
      'That is the circle’s area, not the region outside it.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-circ-semicircle',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 3,
    prompt:
      'Points A, B, and C lie on a circle, and AB is a diameter of the circle. If AB = 10 and AC = 6, what is the area of triangle ABC?',
    answer: 24,
    answerDisplay: '24',
    explanation:
      '**Step 1:** AB is a diameter and C is on the circle, so the angle at C is 90°. AB is the hypotenuse.\n**Step 2:** Find BC: 6 : 10 is 3 : 5, so it’s a 3-4-5 triangle times 2, and BC = 8. (Or: 100 − 36 = 64, √64 = 8.)\n**Step 3:** The legs AC and BC are base and height: ½ × 6 × 8 = **24**.',
  },
  // --- polygon angles -----------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-circ-polygon',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'Each interior angle of a regular polygon measures 156°. How many sides does the polygon have?',
    answer: 15,
    answerDisplay: '15',
    explanation:
      '**Step 1:** Each exterior angle is 180° − 156° = 24°.\n**Step 2:** The exterior angles add to 360°, so there are 360 ÷ 24 of them.\n**Answer:** n = **15**.',
  },
  {
    kind: 'numeric',
    id: 'gre-circ-pentagon',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 1,
    prompt: 'Four of the interior angles of a pentagon measure 100°, 110°, 115°, and 95°. What is the measure of the fifth angle, in degrees?',
    answer: 120,
    answerDisplay: '120',
    suffix: 'degrees',
    explanation:
      '**Step 1:** Angle sum for 5 sides: (5 − 2) × 180° = 540°.\n**Step 2:** The four known angles add to 100 + 110 + 115 + 95 = 420°.\n**Step 3:** Fifth angle = 540 − 420 = **120°**.',
  },
  // --- quadrilateral areas --------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-circ-trapezoid',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 1,
    prompt: 'A trapezoid has parallel sides of length 6 and 14, and the perpendicular distance between them is 5. What is the area of the trapezoid?',
    answer: 50,
    answerDisplay: '50',
    explanation:
      '**Step 1:** Average the parallel sides: (6 + 14) ÷ 2 = 10.\n**Step 2:** Multiply by the height: 10 × 5 = **50**.',
  },
  {
    kind: 'mcq',
    id: 'gre-circ-parallelogram',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 3,
    prompt:
      'A parallelogram has sides of length 10 and 6, and one of its angles measures 30°. What is the area of the parallelogram?',
    options: ['15', '18', '30', '30√3', '60'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Use 10 as the base. The height is the straight-up distance from the base, not the slanted side of 6.\n**Step 2:** Drop a height from the top of the 6 side. It forms a 30-60-90 triangle with hypotenuse 6, and the height is across from the 30° angle — the short leg — so height = 6 ÷ 2 = 3.\n**Step 3:** Area = base × height = 10 × 3 = **30**.',
    distractorNotes: [
      'That is ½ × 10 × 3 — a parallelogram’s area has no ½.',
      'That is 6 × 3 — the base should be 10.',
      'Correct.',
      'That uses the long leg (3√3) as the height; the height is across from the 30° angle.',
      'That uses the slanted side (6) as the height.',
    ],
  },
  // --- solids -----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-circ-solid',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'A cylinder has radius 3 and height 10. If the radius is doubled and the height is cut in half, what is the new volume?',
    options: ['45π', '90π', '180π', '360π', '720π'],
    correctIndex: 2,
    explanation:
      '**Step 1:** New radius 6, new height 5.\n**Step 2:** Volume = πr²h = π(6²)(5) = π(36)(5) = **180π**.\nCheck with scaling: the original is π(9)(10) = 90π. Doubling r multiplies by 4, halving h multiplies by ½ — net × 2, so 180π ✓.',
    distractorNotes: [
      'That halves the volume instead of applying ×4 and ×½.',
      'That is the original volume.',
      'Correct.',
      'That doubles the radius but forgets to halve the height.',
      'That doubles the height instead of halving it.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-circ-cube',
    lessonId: 'gre-circles-polygons-solids',
    difficulty: 2,
    prompt: 'A cube has a total surface area of 150. What is the volume of the cube?',
    answer: 125,
    answerDisplay: '125',
    explanation:
      '**Step 1:** A cube has 6 equal square faces: 6s² = 150, so s² = 25.\n**Step 2:** s = 5.\n**Step 3:** Volume = s³ = 5³ = **125**.',
  },
];
