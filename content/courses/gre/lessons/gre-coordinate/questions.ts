import type { Question } from '@/lib/types';

// Practice questions for "Coordinate geometry" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- quadrants and reflections ----------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-coord-quadrant',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt:
      'The point (a, b) lies in quadrant II. Which of the following points must lie in quadrant IV?\n\nIndicate all such points.',
    options: ['(b, a)', '(−a, b)', '(a, −b)', '(−a, −b)', '(−b, −a)'],
    correctIndices: [0, 3],
    explanation:
      '**Step 1:** Quadrant II is (−, +), so a is negative and b is positive.\n**Step 2:** Quadrant IV is (+, −): the first coordinate must be positive and the second negative.\n**Step 3:** Check each. (b, a) = (+, −) ✓. (−a, −b) = (+, −) ✓. The others land elsewhere.\nPlug-in check with (a, b) = (−2, 3): (3, −2) and (2, −3) are both in quadrant IV ✓.',
    distractorNotes: [
      '✓ (+, −).',
      '✗ (+, +) — quadrant I.',
      '✗ (−, −) — quadrant III.',
      '✓ (+, −).',
      '✗ (−, +) — back in quadrant II.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-coord-reflect',
    lessonId: 'gre-coordinate',
    difficulty: 1,
    prompt: 'Point P has coordinates (−4, 7). Point Q is the reflection of P across the x-axis. What is the distance between P and Q?',
    answer: 14,
    answerDisplay: '14',
    explanation:
      '**Step 1:** Reflecting across the x-axis flips the sign of y: Q = (−4, −7).\n**Step 2:** P and Q have the same x, so they’re on a vertical line. The distance is just the gap in y: from 7 down to −7.\n**Answer:** 7 − (−7) = **14**.',
  },
  // --- slope -----------------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-coord-slope',
    lessonId: 'gre-coordinate',
    difficulty: 1,
    prompt: 'What is the slope of the line through (3, −4) and (−1, 4)?',
    options: ['−2', '−½', '½', '2', '0'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Rise: 4 − (−4) = 8.\n**Step 2:** Run, in the same order: −1 − 3 = −4.\n**Step 3:** Slope = 8 ÷ (−4) = **−2**. (Going from left to right, the line drops ✓.)',
    distractorNotes: [
      'Correct.',
      'That is run over rise — the change in y goes on top.',
      'That flips the fraction and loses the sign.',
      'The sign is wrong — subtract in the same order on top and bottom.',
      'The points have different y-values, so the line isn’t flat.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-coord-slope-unknown',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'A line passes through the points (2, k) and (6, 11) and has slope 3/2. What is the value of k?',
    answer: 5,
    answerDisplay: '5',
    explanation:
      '**Step 1:** Write the slope: (11 − k) / (6 − 2) = 3/2.\n**Step 2:** The run is 4, so (11 − k)/4 = 3/2. Multiply both sides by 4: 11 − k = 6.\n**Step 3:** k = **5**. Check: (11 − 5)/4 = 6/4 = 3/2 ✓.',
  },
  // --- distance and midpoint --------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-coord-distance',
    lessonId: 'gre-coordinate',
    difficulty: 1,
    prompt: 'What is the distance between the points (1, −2) and (6, 10)?',
    answer: 13,
    answerDisplay: '13',
    explanation:
      '**Step 1:** Horizontal gap: 6 − 1 = 5.\n**Step 2:** Vertical gap: 10 − (−2) = 12.\n**Step 3:** Distance = √(5² + 12²) = √(25 + 144) = √169 = **13** (a 5-12-13 triangle).',
  },
  {
    kind: 'mcq',
    id: 'gre-coord-midpoint',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'The midpoint of segment AB is (4, −1). If A has coordinates (1, 3), what are the coordinates of B?',
    options: ['(2.5, 1)', '(3, −4)', '(7, −5)', '(−2, 7)', '(5, 2)'],
    correctIndex: 2,
    explanation:
      '**Step 1:** Find the step from A to the midpoint: x goes 1 → 4 (right 3), y goes 3 → −1 (down 4).\n**Step 2:** The midpoint is halfway, so take the same step again: x = 4 + 3 = 7, y = −1 − 4 = −5.\n**Answer:** B = **(7, −5)**. Check: ((1 + 7)/2, (3 + (−5))/2) = (4, −1) ✓.',
    distractorNotes: [
      'That is the midpoint of A and the midpoint — it goes only halfway.',
      'That is the step from A to the midpoint, not the point B.',
      'Correct.',
      'That steps the wrong way — away from the midpoint.',
      'That adds A and the midpoint instead of stepping past the midpoint.',
    ],
  },
  // --- line equations ----------------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-coord-line',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'A line passes through (0, 3) and (2, 7). Which of the following points also lies on the line?',
    options: ['(3, 8)', '(4, 11)', '(−1, 2)', '(5, 12)', '(−2, 1)'],
    correctIndex: 1,
    explanation:
      '**Step 1:** Slope: (7 − 3)/(2 − 0) = 2.\n**Step 2:** (0, 3) is the y-intercept, so the line is y = 2x + 3.\n**Step 3:** Test the choices. For (4, 11): 2(4) + 3 = 11 ✓. The answer is **(4, 11)**.',
    distractorNotes: [
      '2(3) + 3 = 9, not 8.',
      'Correct.',
      '2(−1) + 3 = 1, not 2.',
      '2(5) + 3 = 13, not 12.',
      '2(−2) + 3 = −1, not 1.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-coord-area',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'The line 3x + 4y = 24 forms a triangle with the x-axis and the y-axis. What is the area of that triangle?',
    answer: 24,
    answerDisplay: '24',
    explanation:
      '**Step 1:** x-intercept: set y = 0, so 3x = 24 and x = 8.\n**Step 2:** y-intercept: set x = 0, so 4y = 24 and y = 6.\n**Step 3:** The triangle is a right triangle with legs 8 and 6 along the axes: ½ × 8 × 6 = **24**.',
  },
  // --- parallel and perpendicular ------------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-coord-perp',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'Line ℓ has equation 2x + 5y = 10. What is the slope of a line perpendicular to ℓ?',
    options: ['−5/2', '−2/5', '2/5', '5/2', '2'],
    correctIndex: 3,
    explanation:
      '**Step 1:** Solve for y: 5y = −2x + 10, so y = −(2/5)x + 2. Line ℓ has slope −2/5.\n**Step 2:** Perpendicular: flip the fraction and change the sign: **5/2**.\nCheck: (−2/5) × (5/2) = −1 ✓.',
    distractorNotes: [
      'That flips the fraction but keeps the sign — change the sign too.',
      'That is ℓ’s own slope (a parallel line would have it).',
      'That changes the sign without flipping the fraction.',
      'Correct.',
      'The slope isn’t the x-coefficient; solve for y first.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-coord-parallel',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'Line k is parallel to the line y = 3x − 7 and passes through the point (2, 1). What is the y-intercept of line k?',
    answer: -5,
    answerDisplay: '−5',
    explanation:
      '**Step 1:** Parallel means the same slope: y = 3x + b.\n**Step 2:** Plug in (2, 1): 1 = 3(2) + b = 6 + b.\n**Step 3:** b = **−5**. (Not −7 — that’s the other line’s intercept.)',
  },
  // --- intersections ------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-coord-intersect',
    lessonId: 'gre-coordinate',
    difficulty: 1,
    prompt: 'The lines y = 2x − 1 and y = −x + 8 intersect at a point. What is the y-coordinate of that point?',
    answer: 5,
    answerDisplay: '5',
    explanation:
      '**Step 1:** Set the y’s equal: 2x − 1 = −x + 8.\n**Step 2:** 3x = 9, so x = 3.\n**Step 3:** y = 2(3) − 1 = **5**. Check with the other line: −3 + 8 = 5 ✓.',
  },
  {
    kind: 'mcq',
    id: 'gre-coord-parabola',
    lessonId: 'gre-coordinate',
    difficulty: 2,
    prompt: 'At which points does the graph of y = x² − 2x − 8 cross the x-axis?',
    options: ['(−4, 0) and (2, 0)', '(4, 0) and (−2, 0)', '(0, −8) only', '(8, 0) and (−1, 0)', '(4, 0) only'],
    correctIndex: 1,
    explanation:
      '**Step 1:** The x-axis is where y = 0: x² − 2x − 8 = 0.\n**Step 2:** Factor — two numbers that multiply to −8 and add to −2 are −4 and 2: (x − 4)(x + 2) = 0.\n**Step 3:** x = 4 or x = −2, so the points are **(4, 0) and (−2, 0)**.',
    distractorNotes: [
      'The signs are flipped: (x − 4) = 0 gives x = +4.',
      'Correct.',
      '(0, −8) is where it crosses the y-axis (set x = 0).',
      'Those multiply to −8 but add to 7, not −2.',
      'x = −2 also works: 4 + 4 − 8 = 0.',
    ],
  },
];
