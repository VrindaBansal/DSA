import type { Question } from '@/lib/types';

// Practice questions for "Lines, angles & triangles" — two per idea, in lesson order.

export const QUESTIONS: Question[] = [
  // --- lines and parallel lines ------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-tri-line-angles',
    lessonId: 'gre-lines-triangles',
    difficulty: 1,
    prompt:
      'Two lines intersect. Two of the angles formed sit side by side along one of the lines, and together they make a straight line. They measure (2x + 30)° and (4x)°. What is the value of x?',
    answer: 25,
    answerDisplay: '25',
    explanation:
      '**Step 1:** Angles that form a straight line add to 180°: (2x + 30) + 4x = 180.\n**Step 2:** 6x + 30 = 180, so 6x = 150.\n**Step 3:** x = **25**. Check: 80° + 100° = 180° ✓.',
  },
  {
    kind: 'multi',
    id: 'gre-tri-parallel',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt:
      'Two parallel lines are crossed by a third line, forming eight angles. One of the eight angles measures 65°. Which of the following could be the measure of another one of the eight angles?\n\nIndicate all such measures.',
    options: ['25°', '65°', '105°', '115°', '130°'],
    correctIndices: [1, 3],
    explanation:
      '**Step 1:** With parallel lines, the eight angles come in only two sizes, and a small one plus a big one make 180°.\n**Step 2:** The small size is 65°, so the big size is 180° − 65° = 115°.\n**Answer:** only **65° and 115°** appear.',
    distractorNotes: [
      '✗ 25° would pair with 65° to make 90°, not 180°.',
      '✓ Every small angle equals 65°.',
      '✗ Not 65° and doesn’t add with 65° to make 180°.',
      '✓ 180° − 65° = 115°.',
      '✗ That doubles 65°; no angle in the figure does that.',
    ],
  },
  // --- triangle angles -------------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-tri-angles',
    lessonId: 'gre-lines-triangles',
    difficulty: 1,
    prompt:
      'In triangle ABC, the exterior angle at C measures 130°, and angle A measures 55°. What is the measure of angle B, in degrees?',
    answer: 75,
    answerDisplay: '75',
    suffix: 'degrees',
    explanation:
      '**Step 1:** An exterior angle equals the sum of the two inside angles farthest from it (A and B): 130 = 55 + B.\n**Step 2:** B = 130 − 55 = **75°**.\nCheck: the inside angle at C is 180 − 130 = 50°, and 55 + 75 + 50 = 180 ✓.',
  },
  {
    kind: 'multi',
    id: 'gre-tri-isosceles',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt:
      'One angle of an isosceles triangle measures 40°. Which of the following could be the measure of another angle of the triangle?\n\nIndicate all such measures.',
    options: ['40°', '70°', '80°', '100°', '140°'],
    correctIndices: [0, 1, 3],
    explanation:
      '**Case 1 — 40° is one of the two equal angles.** The angles are 40°, 40°, and 180 − 80 = 100°.\n**Case 2 — 40° is the odd angle.** The other two are equal: (180 − 40) ÷ 2 = 70° each, so 40°, 70°, 70°.\n**Answer:** another angle could be **40°, 70°, or 100°**.',
    distractorNotes: [
      '✓ Case 1: 40°, 40°, 100°.',
      '✓ Case 2: 40°, 70°, 70°.',
      '✗ 80° is the two 40° angles added together, not an angle.',
      '✓ Case 1: 180 − 40 − 40 = 100°.',
      '✗ 140° is 180° − 40° — the other two angles combined in case 2.',
    ],
  },
  // --- Pythagorean theorem ---------------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-tri-pythag',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt: 'A right triangle has a hypotenuse of length 26 and one leg of length 10. What is the area of the triangle?',
    answer: 120,
    answerDisplay: '120',
    explanation:
      '**Step 1:** Find the other leg. 10 : 26 is 5 : 13, so this is a 5-12-13 triangle times 2, and the other leg is 24. (Or: 26² − 10² = 676 − 100 = 576, and √576 = 24.)\n**Step 2:** The legs are the base and height: ½ × 10 × 24 = **120**.',
  },
  {
    kind: 'mcq',
    id: 'gre-tri-rectangle',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt: 'A rectangle has a length of 8 and a diagonal of 10. What is the perimeter of the rectangle?',
    options: ['24', '28', '36', '40', '48'],
    correctIndex: 1,
    explanation:
      '**Step 1:** The diagonal splits the rectangle into two right triangles with legs 8 and w, and hypotenuse 10.\n**Step 2:** 8 : 10 is 4 : 5, so it’s a 3-4-5 triangle times 2, and w = 6. (Or: 100 − 64 = 36, √36 = 6.)\n**Step 3:** Perimeter = 2(8 + 6) = **28**.',
    distractorNotes: [
      'That is 8 + 6 + 10 — the perimeter of one triangle, not the rectangle.',
      'Correct.',
      'That uses the diagonal as a side: 2(8 + 10).',
      'That treats the rectangle as a square with side 10.',
      'That is the area, 8 × 6.',
    ],
  },
  // --- special right triangles ---------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-tri-special',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt: 'The diagonal of a square is 8. What is the area of the square?',
    options: ['16', '32', '32√2', '64', '16√2'],
    correctIndex: 1,
    explanation:
      '**Step 1:** The diagonal cuts the square into two 45-45-90 triangles, so diagonal = side × √2.\n**Step 2:** side = 8 ÷ √2 = 4√2.\n**Step 3:** area = (4√2)² = 16 × 2 = **32**.\nShortcut: a square’s area is diagonal² ÷ 2 = 64 ÷ 2 = 32.',
    distractorNotes: [
      'That uses a side of 4 — half the diagonal. The side is 8 ÷ √2.',
      'Correct.',
      '(4√2)² = 16 × 2 = 32 — the √2 disappears when you square it.',
      'That squares the diagonal without dividing by 2.',
      'That is 4 × 4√2 — only one of the sides was converted.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-tri-3060',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt:
      'In a 30-60-90 triangle, the side opposite the 60° angle has length 6√3. What is the length of the hypotenuse?',
    options: ['6', '6√3', '12', '12√3', '18'],
    correctIndex: 2,
    explanation:
      '**Step 1:** The sides follow x : x√3 : 2x, and the side opposite 60° is the middle one, x√3.\n**Step 2:** x√3 = 6√3, so x = 6 (the shortest side).\n**Step 3:** The hypotenuse is 2x = **12**.',
    distractorNotes: [
      '6 is the shortest side (opposite 30°).',
      'That is the side you were given.',
      'Correct.',
      'That doubles the given side; double the shortest side instead.',
      'That is 6 + 12 — no side is found that way.',
    ],
  },
  // --- triangle inequality ------------------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-tri-ineq',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt:
      'Two sides of a triangle have lengths 5 and 11. Which of the following could be the length of the third side?\n\nIndicate all such lengths.',
    options: ['5', '6', '7', '15', '16'],
    correctIndices: [2, 3],
    explanation:
      '**Step 1:** Difference and sum: 11 − 5 = 6 and 11 + 5 = 16.\n**Step 2:** The third side is strictly between them: 6 < x < 16.\n**Answer:** only **7 and 15** qualify.',
    distractorNotes: [
      '✗ Less than 6.',
      '✗ Equal to the difference — the "triangle" would be a flat line.',
      '✓ Between 6 and 16.',
      '✓ Between 6 and 16.',
      '✗ Equal to the sum — flat again.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-tri-ineq-count',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt:
      'Two sides of a triangle have lengths 4 and 10. If the third side has an integer length, how many different lengths are possible for the third side?',
    answer: 7,
    answerDisplay: '7',
    explanation:
      '**Step 1:** Difference and sum: 10 − 4 = 6 and 10 + 4 = 14.\n**Step 2:** The third side is strictly between: 6 < x < 14.\n**Step 3:** The integers are 7, 8, 9, 10, 11, 12, 13 — that’s **7** lengths.',
  },
  // --- area and similar triangles ---------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-tri-area',
    lessonId: 'gre-lines-triangles',
    difficulty: 3,
    prompt:
      'A right triangle has legs of length 6 and 8. What is the length of the height drawn from the right angle to the hypotenuse?',
    answer: 4.8,
    answerDisplay: '4.8',
    explanation:
      '**Step 1:** Area using the legs as base and height: ½ × 6 × 8 = 24.\n**Step 2:** The hypotenuse is 10 (a 3-4-5 triangle times 2).\n**Step 3:** Now use the hypotenuse as the base. The area is still 24: ½ × 10 × h = 24, so 5h = 24.\n**Answer:** h = **4.8**.',
  },
  {
    kind: 'numeric',
    id: 'gre-tri-similar',
    lessonId: 'gre-lines-triangles',
    difficulty: 2,
    prompt:
      'Two similar triangles have corresponding sides of length 3 and 7.5. If the smaller triangle has an area of 12, what is the area of the larger triangle?',
    answer: 75,
    answerDisplay: '75',
    explanation:
      '**Step 1:** Scale factor for lengths: k = 7.5 ÷ 3 = 2.5.\n**Step 2:** Areas scale by k²: 2.5² = 6.25.\n**Step 3:** 12 × 6.25 = **75**. (Scaling the area by 2.5 alone would give 30 — the most common mistake.)',
  },
];
