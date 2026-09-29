// Practice Test 8 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

// Region under y = x + 2 from x = 0 to x = 6, drawn to scale at 20 px per
// unit with the origin at (50, 210).
const region = fig(250, 240, [
  g.poly(
    [
      [50, 210],
      [170, 210],
      [170, 50],
      [50, 170],
    ],
    '#d5dae0',
  ),
  g.line([30, 210], [235, 210]),
  g.line([50, 232], [50, 12]),
  g.line([30, 190], [200, 20]),
  g.line([170, 222], [170, 30], true),
  `<text x="231" y="226" text-anchor="end" font-size="14" font-family="Georgia, serif" font-style="italic" fill="currentColor">x</text>`,
  `<text x="58" y="22" font-size="14" font-family="Georgia, serif" font-style="italic" fill="currentColor">y</text>`,
  g.text([44, 226], 'O', 'end', true),
  g.text([170, 236], '6', 'middle', true),
  g.text([44, 175], '2', 'end', true),
  g.text([126, 56], 'y = x + 2', 'end'),
  g.text([176, 132], 'x = 6', 'start'),
]);

// ---------------------------------------------------------------- Section 1

const bookstore = {
  table: {
    caption: 'Books Sold at a Bookstore, January–March',
    columns: ['Category', 'January', 'February', 'March'],
    rows: [
      ['Fiction', '420', '380', '450'],
      ['Nonfiction', '300', '320', '280'],
      ['Children’s', '180', '200', '270'],
      ['Total', '900', '900', '1,000'],
    ],
  },
};

export const Q1 = section(8, 'q1', [
  qc(1, 'exp', { a: '√50', b: '7' }, 'A', '7 = √49, and √50 > √49. (√50 = 5√2 ≈ 7.07.)'),
  qc(
    2,
    'int',
    { given: 'k is an odd integer.', a: 'The remainder when k² is divided by 4', b: '1' },
    'C',
    'Write k = 2m + 1. Then k² = 4m² + 4m + 1 = 4(m² + m) + 1, which leaves remainder 1 when divided by 4 — for every odd k. Check: 3² = 9 = 8 + 1, 5² = 25 = 24 + 1, (−1)² = 1.',
  ),
  qc(
    3,
    'frac',
    { given: '0 < a < b', a: 'a/b', b: '(a + 1)/(b + 1)' },
    'B',
    'Compare by cross-multiplying (all denominators positive): a(b + 1) vs b(a + 1), that is ab + a vs ab + b. Since a < b, the left side is smaller, so a/b < (a + 1)/(b + 1). Adding the same amount to the top and bottom of a fraction less than 1 moves it toward 1. Try a = 1, b = 2: 1/2 < 2/3.',
  ),
  qc(
    2,
    'coord',
    { given: 'In the xy-plane, line ℓ passes through the points (0, 4) and (6, 0).', a: 'The slope of line ℓ', b: '−1/2' },
    'B',
    'Slope = (0 − 4)/(6 − 0) = −4/6 = −2/3 ≈ −0.67, which is less than −1/2 = −0.5. With negatives, the number farther from zero is the smaller one.',
  ),
  ps(
    1,
    'pct',
    'What is 0.5 percent of 240?',
    ['0.0012', '0.012', '0.12', '1.2', '12'],
    3,
    '0.5 percent is 0.5/100 = 0.005, and 0.005 × 240 = 1.2. (E) is 5 percent — 0.5 percent is ten times smaller.',
  ),
  dataSet('bookstore', bookstore, [
    ps(
      1,
      'data',
      'How many nonfiction books did the bookstore sell in the three months combined?',
      ['280', '300', '580', '880', '900'],
      4,
      'Add the nonfiction row across the three months: 300 + 320 + 280 = 900 books. (The monthly totals, 900, 900, and 1,000, are for all categories.)',
    ),
    ne(
      2,
      'data',
      'In March, children’s books were what percent of all the books the store sold?',
      27,
      'March total: 1,000 books, of which 270 were children’s books. 270 ÷ 1,000 = 0.27 = 27%.',
      { suffix: '%' },
    ),
    psMulti(
      3,
      'data',
      'For which categories was the number of books sold in March greater than the average (arithmetic mean) monthly number sold in that category over the three months?\n\nIndicate all such categories.',
      ['Fiction', 'Nonfiction', 'Children’s'],
      [0, 2],
      'Fiction: average (420 + 380 + 450) ÷ 3 ≈ 416.7, and 450 > 416.7 ✓. Nonfiction: average 900 ÷ 3 = 300, and 280 < 300 ✗. Children’s: average 650 ÷ 3 ≈ 216.7, and 270 > 216.7 ✓.',
    ),
  ]),
  ps(
    1,
    'frac',
    'Of the 60 members of a choir, 3/5 are sopranos, and 1/4 of the sopranos also sing solos. How many members of the choir are sopranos who sing solos?',
    ['9', '12', '15', '21', '36'],
    0,
    'Sopranos: 3/5 × 60 = 36. Soloists among them: 1/4 × 36 = 9. (E) stops at the sopranos; (C) takes 1/4 of all 60.',
  ),
  ne(
    2,
    'quad',
    'If x > 0 and x² − 2x = 15, what is the value of x² + 2x?',
    35,
    'x² − 2x − 15 = 0 factors as (x − 5)(x + 3) = 0, and x > 0 gives x = 5. Then x² + 2x = 25 + 10 = 35. (Shortcut: x² + 2x = (x² − 2x) + 4x = 15 + 20.)',
  ),
  psMulti(
    3,
    'coord',
    'Which of the following lines in the xy-plane are perpendicular to the line 2x − 3y = 6?\n\nIndicate all such lines.',
    ['y = −(3/2)x + 4', '3x + 2y = 1', 'y = (3/2)x − 2', '2x + 3y = 5', '6x + 4y = 0', 'y = −(2/3)x'],
    [0, 1, 4],
    '2x − 3y = 6 means y = (2/3)x − 2, slope 2/3. A perpendicular line has slope −3/2 (the negative reciprocal). Slopes of the choices: −3/2 ✓; 3x + 2y = 1 → −3/2 ✓; 3/2 ✗; 2x + 3y = 5 → −2/3 ✗; 6x + 4y = 0 → −3/2 ✓; −2/3 ✗. The intercept doesn’t matter.',
  ),
  ps(
    3,
    'prob',
    'A two-digit positive integer is chosen at random. What is the probability that its tens digit is greater than its units digit?',
    ['1/2', '5/9', '3/5', '2/3', '9/10'],
    0,
    'There are 90 two-digit integers (10 through 99). With tens digit t, the units digit can be any of 0 to t − 1: that is t choices. Total: 1 + 2 + … + 9 = 45. Probability 45/90 = 1/2.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const study = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Hours Spent Studying Last Week',
      categories: ['Ana', 'Ben', 'Cai', 'Dev', 'Eli'],
      series: [{ name: 'Hours', values: [12, 8, 15, 5, 10] }],
      yLabel: 'Hours',
      yMax: 16,
      yStep: 4,
      showValues: true,
    },
  ],
};

export const Q2E = section(8, 'q2e', [
  qc(1, 'frac', { a: '1/4 + 1/4', b: '1/8 + 1/8 + 1/8 + 1/8' }, 'C', 'Both equal 1/2: 2 × 1/4 = 1/2 and 4 × 1/8 = 1/2.'),
  qc(2, 'int', { a: 'The greatest odd factor of 48', b: '5' }, 'B', '48 = 2⁴ × 3, so its odd factors are 1 and 3. The greatest is 3, which is less than 5.'),
  qc(1, 'lin', { given: 'a − 2 = b', a: 'a', b: 'b' }, 'A', 'a = b + 2, so a is always 2 more than b.'),
  qc(
    2,
    'tri',
    { given: 'The hypotenuse of an isosceles right triangle has length 10.', a: 'The length of each leg', b: '7' },
    'A',
    'The legs of an isosceles right triangle are hypotenuse ÷ √2: 10/√2 = 5√2 ≈ 7.07, a bit more than 7. (Check: 7² + 7² = 98 < 100, so legs of 7 would be too short.)',
  ),
  qc(
    2,
    'pct',
    { given: 'In a class, 60 percent of the students are girls, and 25 percent of the girls wear glasses.', a: 'The percent of all students in the class who are girls who wear glasses', b: '15%' },
    'C',
    'A percent of a percent multiplies: 25% of 60% = 0.25 × 0.60 = 0.15 = 15% of the class.',
  ),
  ps(
    1,
    'lin',
    'Sam has $15 more than Tia. Together they have $85. How much money does Tia have?',
    ['$30', '$35', '$40', '$50', '$70'],
    1,
    'Tia has t, Sam has t + 15: t + t + 15 = 85, so 2t = 70 and t = 35. Sam has $50 — choice (D), the trap.',
  ),
  ne(
    1,
    'frac',
    'A recipe calls for 2¼ cups of flour. How many cups of flour are needed to make 1/3 of the recipe?',
    0.75,
    '2¼ = 9/4 cups, and 1/3 of 9/4 is 9/12 = 3/4 cup.',
    { fraction: true, display: '3/4', suffix: 'cup' },
  ),
  ps(
    1,
    'exp',
    'If 3ˣ⁺¹ = 81, what is the value of x?',
    ['2', '3', '4', '26', '27'],
    1,
    '81 = 3⁴, so x + 1 = 4 and x = 3. (C) is the exponent x + 1 itself.',
  ),
  ps(
    1,
    'coord',
    'In the xy-plane, what is the midpoint of the line segment joining the points (−4, 7) and (6, −1)?',
    ['(1, 3)', '(2, 6)', '(5, −4)', '(10, −8)', '(−1, −3)'],
    0,
    'Average the coordinates: x = (−4 + 6)/2 = 1, y = (7 + (−1))/2 = 3. The midpoint is (1, 3). (B) adds without halving; (D) subtracts.',
  ),
  psMulti(
    2,
    'int',
    'Which of the following numbers are prime?\n\nIndicate all such numbers.',
    ['51', '53', '57', '59', '87', '91'],
    [1, 3],
    '51 = 3 × 17, 57 = 3 × 19, 87 = 3 × 29 (digit sums divisible by 3), and 91 = 7 × 13. 53 and 59 have no factor up to their square roots (about 7.3 and 7.7), so they are prime.',
  ),
  ps(
    2,
    'stat',
    'What is the median of the numbers 17, 4, 9, 23, 12, and 8?',
    ['9', '10.5', '12', '12.17', '13.5'],
    1,
    'Sort them: 4, 8, 9, 12, 17, 23. With an even count, the median is the average of the two middle values: (9 + 12)/2 = 10.5. (D) is the mean, 73/6 ≈ 12.17; (C) forgets to sort.',
  ),
  ne(
    2,
    'circ',
    'A rectangular fish tank is 50 centimeters long, 30 centimeters wide, and 40 centimeters high. How many liters of water does the tank hold when full? (1 liter = 1,000 cubic centimeters)',
    60,
    'Volume = 50 × 30 × 40 = 60,000 cubic centimeters. Divide by 1,000: 60 liters.',
    { suffix: 'liters' },
  ),
  dataSet('study', study, [
    ps(
      1,
      'data',
      'What is the average (arithmetic mean) number of hours the five students spent studying?',
      ['6', '7', '8', '9', '10'],
      4,
      'Total: 12 + 8 + 15 + 5 + 10 = 50 hours. 50 ÷ 5 = 10 hours.',
    ),
    ne(
      2,
      'data',
      'Cai spent what percent more hours studying than Eli did?',
      50,
      'Percent more = difference ÷ the amount compared with: (15 − 10) ÷ 10 = 0.5 = 50%. Dividing by Cai’s 15 (33%) answers “what percent less did Eli study.”',
      { suffix: '%' },
    ),
  ]),
  ps(
    2,
    'fn',
    'A linear function f has f(1) = 5 and f(3) = 11. What is the value of f(10)?',
    ['32', '35', '38', '41', '50'],
    0,
    'From x = 1 to x = 3, f rises by 6, so the slope is 6 ÷ 2 = 3 and f(x) = 3x + 2 (check: f(1) = 5). Then f(10) = 32. (E) assumes f(10) = 10 × f(1).',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

export const Q2H = section(8, 'q2h', [
  qc(2, 'exp', { a: '2⁵⁰', b: '5²⁰' }, 'A', 'Rewrite both with exponent 10: 2⁵⁰ = (2⁵)¹⁰ = 32¹⁰ and 5²⁰ = (5²)¹⁰ = 25¹⁰. Since 32 > 25, A is greater.'),
  qc(
    2,
    'int',
    { given: 'p and q are different prime numbers, each greater than 2.', a: 'The remainder when p + q is divided by 2', b: 'The remainder when pq is divided by 2' },
    'B',
    'Every prime greater than 2 is odd. Odd + odd is even (remainder 0); odd × odd is odd (remainder 1).',
  ),
  qc(
    3,
    'stat',
    { given: 'Data set X consists of 10 numbers whose average (arithmetic mean) is 50. Data set Y consists of the 10 numbers in X together with the number 50.', a: 'The standard deviation of X', b: 'The standard deviation of Y' },
    'D',
    'Adding a value equal to the mean keeps the mean at 50 but adds a zero deviation, so it lowers the standard deviation — if X has any spread. But if all ten numbers in X are 50, both standard deviations are 0. Usually A is greater, but they can be equal, so the answer is D.',
  ),
  qc(
    2,
    'prob',
    { given: 'A bag contains only red, blue, and green marbles. When one marble is drawn at random, the probability that it is red is 1/3 and the probability that it is blue is 1/4.', a: 'The number of green marbles in the bag', b: 'The number of red marbles in the bag' },
    'A',
    'P(green) = 1 − 1/3 − 1/4 = 5/12, while P(red) = 4/12. With one draw from the same bag, a higher probability means more marbles, so there are more green marbles.',
  ),
  qc(
    3,
    'coord',
    { given: 'In the xy-plane, triangle ABC has vertices A(0, 0), B(6, 0), and C(k, 4), where k is a number.', a: 'The area of triangle ABC', b: '12' },
    'C',
    'Take AB, on the x-axis, as the base: length 6. The height is the vertical distance from C to the x-axis, which is 4 no matter what k is. Area = (1/2)(6)(4) = 12. Sliding C sideways doesn’t change the area.',
  ),
  ps(
    3,
    'pct',
    'At a company, 40 percent of the employees work remotely. Of the remote employees, 30 percent live out of state; of the other employees, 5 percent live out of state. What percent of all the employees live out of state?',
    ['12%', '15%', '17.5%', '18%', '35%'],
    1,
    'Take 100 employees: 40 remote, of whom 30% = 12 live out of state; 60 others, of whom 5% = 3 do. 12 + 3 = 15 of 100 = 15%. (C) averages the two percents without weighting; (E) adds them.',
  ),
  ne(
    2,
    'exp',
    'If 2ˣ · 4ˣ = 8⁴, what is the value of x?',
    4,
    'Write everything as a power of 2: 2ˣ · 2²ˣ = 2³ˣ and 8⁴ = 2¹². So 3x = 12 and x = 4.',
  ),
  psMulti(
    3,
    'quad',
    'Which of the following expressions are equal to (x − 3)² for every value of x?\n\nIndicate all such expressions.',
    ['x² − 9', 'x² − 6x + 9', '(3 − x)²', '(x − 3)(3 − x)', '(x + 3)² − 12x', 'x² + 9'],
    [1, 2, 4],
    '(x − 3)² = x² − 6x + 9 ✓. (3 − x)² = (x − 3)², since squaring removes the sign ✓. (x + 3)² − 12x = x² + 6x + 9 − 12x = x² − 6x + 9 ✓. But (x − 3)(3 − x) = −(x − 3)², and x² − 9 and x² + 9 drop the middle term.',
  ),
  ps(
    2,
    'coord',
    'In the figure above, what is the area of the shaded region, which is bounded by the x-axis, the y-axis, the line x = 6, and the line y = x + 2?',
    ['24', '28', '30', '36', '48'],
    2,
    'The region is a trapezoid with parallel vertical sides at x = 0 (height y = 2) and x = 6 (height y = 8), 6 units apart. Area = (1/2)(2 + 8)(6) = 30. (E) uses the full 6-by-8 rectangle.',
    { stimulus: { figure: region } },
  ),
  ps(
    2,
    'fn',
    'The operation ⊕ is defined by a ⊕ b = ab − a − b for all numbers a and b. If 3 ⊕ k = 5, what is the value of k?',
    ['−1', '0', '1', '2', '4'],
    4,
    '3 ⊕ k = 3k − 3 − k = 2k − 3. Setting 2k − 3 = 5 gives k = 4. Check: 12 − 3 − 4 = 5 ✓.',
  ),
  ne(
    3,
    'prob',
    'How many different 3-letter strings can be formed from the letters A, B, C, D, and E if letters may be repeated but no two adjacent letters may be the same?',
    80,
    'First letter: 5 choices. Second: anything except the first, 4 choices. Third: anything except the second, 4 choices (it may repeat the first). 5 × 4 × 4 = 80.',
  ),
  ps(
    2,
    'rate',
    'Two runners start at the same point on a 400-meter circular track and run in opposite directions, one at 5 meters per second and the other at 3 meters per second. After how many seconds will they first meet?',
    ['40', '50', '80', '100', '200'],
    1,
    'Running in opposite directions, they close the 400-meter loop at a combined 5 + 3 = 8 meters per second, so they meet after 400 ÷ 8 = 50 seconds. (E) uses the difference of the speeds, which is right only for runners going the same way.',
  ),
  ps(
    3,
    'int',
    'What is the units digit of 7⁴³?',
    ['0', '1', '3', '7', '9'],
    2,
    'Units digits of powers of 7 repeat every 4: 7, 9, 3, 1, 7, 9, 3, 1, … Since 43 = 4 × 10 + 3, 7⁴³ has the same units digit as 7³ = 343: 3.',
  ),
  ne(
    3,
    'stat',
    'A list consists of 6 different positive integers. The smallest is 3, and the range of the list is 9. What is the greatest possible sum of the 6 integers?',
    53,
    'Range 9 means the largest is 3 + 9 = 12. To maximize the sum, make the other four as large as possible while staying different and below 12: 11, 10, 9, 8. Sum: 3 + 8 + 9 + 10 + 11 + 12 = 53.',
  ),
  ps(
    2,
    'lin',
    'The sum of three consecutive odd integers is 81. What is the greatest of the three integers?',
    ['21', '23', '25', '27', '29'],
    4,
    'Call them n − 2, n, n + 2. Their sum is 3n = 81, so n = 27 and the integers are 25, 27, 29. The greatest is 29. (D) is the middle one.',
  ),
]);
