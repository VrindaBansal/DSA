// Practice Test 4 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

const incircle = fig(260, 225, [
  g.poly([
    [40, 190],
    [220, 190],
    [130, 34.1],
  ]),
  g.circle([130, 138], 52),
  g.text([130, 212], '6', 'middle', true),
  g.text([72, 106], '6', 'middle', true),
  g.text([188, 106], '6', 'middle', true),
]);

// ---------------------------------------------------------------- Section 1

const regions = {
  charts: [
    {
      type: 'pie' as const,
      title: 'Company Z: 2023 Sales by Region (total: $800 million)',
      categories: ['North', 'South', 'East', 'West', 'International'],
      series: [{ name: 'Share', values: [30, 25, 20, 15, 10] }],
      unit: '%',
    },
    {
      type: 'bar' as const,
      title: 'Company Z: Percent Change in Sales from 2022 to 2023, by Region',
      categories: ['North', 'South', 'East', 'West', 'International'],
      series: [{ name: 'Percent change', values: [20, 10, 25, 0, 60] }],
      yLabel: 'Percent increase',
      yMax: 70,
      yStep: 10,
      unit: '%',
      showValues: true,
    },
  ],
};

export const Q1 = section(4, 'q1', [
  qc(
    1,
    'frac',
    { a: '2/7', b: '1/3 + 1/4' },
    'B',
    '1/3 + 1/4 = 4/12 + 3/12 = 7/12 ≈ 0.58, while 2/7 ≈ 0.29. The trap is adding tops and bottoms (1 + 1)/(3 + 4) = 2/7 — which is exactly Quantity A.',
  ),
  qc(
    2,
    'tri',
    { given: 'In triangle ABC, AB = 5 and BC = 7.', a: 'AC', b: '12' },
    'B',
    'Triangle inequality: any side is less than the sum of the other two, so AC < 5 + 7 = 12. (AC = 12 would flatten the triangle into a line segment.)',
  ),
  qc(
    2,
    'int',
    { given: 'x is a prime number, and 20 < x < 30.', a: 'x', b: '25' },
    'D',
    'The primes between 20 and 30 are 23 and 29. If x = 23, B is greater; if x = 29, A is greater → D.',
  ),
  qc(
    3,
    'exp',
    { given: 'x > 0, y > 0, and x² = 2y²', a: 'x', b: '1.4y' },
    'A',
    'Taking positive square roots: x = √2 · y. Since √2 ≈ 1.414 > 1.4 and y > 0, x > 1.4y. The trap is treating √2 as exactly 1.4.',
  ),
  ps(
    1,
    'ratio',
    'If a/b = 3/4 and b = 20, what is the value of a + b?',
    ['15', '20', '23', '27', '35'],
    4,
    'a/20 = 3/4 gives a = 15, so a + b = 15 + 20 = 35. (A) stops at a.',
  ),
  dataSet('regions', regions, [
    ps(
      1,
      'data',
      'What were Company Z’s 2023 sales in the East region, in millions of dollars?',
      ['80', '100', '120', '150', '160'],
      4,
      'East is 20% of $800 million: 0.20 × 800 = $160 million. (The bar graph isn’t needed here — it shows change, not size.)',
    ),
    ne(
      2,
      'data',
      'What were Company Z’s 2022 sales in the North region, in millions of dollars?',
      200,
      'North’s 2023 sales: 30% of 800 = 240. That was a 20% increase over 2022, so 2022 sales × 1.20 = 240, giving 200. Taking 20% off 240 (= 192) is the trap: the 20% is measured from 2022, not 2023.',
      { prefix: '$', suffix: 'million' },
    ),
    ps(
      3,
      'data',
      'Approximately what were Company Z’s total sales in 2022, in millions of dollars?',
      ['560', '600', '640', '680', '720'],
      3,
      'Undo each region’s change: North 240/1.20 = 200; South 200/1.10 ≈ 182; East 160/1.25 = 128; West 120/1.00 = 120; International 80/1.60 = 50. Total ≈ 680. Averaging the percent changes and applying one rate to the total doesn’t work — the regions have different sizes.',
    ),
  ]),
  ps(
    2,
    'ratio',
    'If the ratio of a to b is 2 to 3 and the ratio of b to c is 4 to 5, what is the ratio of a to c?',
    ['1 : 3', '2 : 5', '1 : 2', '8 : 15', '3 : 5'],
    3,
    'Make b match: a : b = 2 : 3 = 8 : 12 and b : c = 4 : 5 = 12 : 15. So a : b : c = 8 : 12 : 15 and a : c = 8 : 15. (B) multiplies the first terms and uses the last — it ignores the need for a common b.',
  ),
  ne(
    2,
    'circ',
    'A circular pizza with a diameter of 14 inches is cut into 8 slices of equal size. What is the area of one slice, in square inches, to the nearest whole number?',
    19,
    'Radius 7, so the whole pizza has area π × 7² = 49π ≈ 153.9 square inches. One slice: 153.9/8 ≈ 19.2, which rounds to 19. Using the diameter as the radius (196π) is the common slip.',
    { roundTo: 1 },
  ),
  psMulti(
    2,
    'coord',
    'Which of the following points lie on the line y = 3x − 4 in the xy-plane?\n\nIndicate all such points.',
    ['(0, −4)', '(2, 2)', '(−1, −1)', '(3, 5)', '(4, 7)'],
    [0, 1, 3],
    'Substitute each x and check y. x = 0 → −4 ✓. x = 2 → 2 ✓. x = −1 → −7, not −1 ✗. x = 3 → 5 ✓. x = 4 → 8, not 7 ✗.',
  ),
  ps(
    3,
    'stat',
    'The average (arithmetic mean) score of 30 students on a test was 72. When the scores of 5 students whose average was 90 are removed, what is the average score of the remaining 25 students?',
    ['62.4', '64.8', '66.0', '67.5', '68.4'],
    4,
    'Total of all 30 scores: 30 × 72 = 2,160. The 5 removed scores total 5 × 90 = 450. Remaining: 1,710 over 25 students = 68.4.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const milk = {
  table: {
    caption: 'Average Price of a Gallon of Milk',
    columns: ['Year', 'Price'],
    rows: [
      ['2019', '$3.20'],
      ['2020', '$3.35'],
      ['2021', '$3.50'],
      ['2022', '$3.90'],
      ['2023', '$4.10'],
    ],
  },
};

export const Q2H = section(4, 'q2h', [
  qc(
    2,
    'fn',
    { given: 'g(x) = |x − 4| for all numbers x.', a: 'g(1)', b: 'g(6)' },
    'A',
    'g(1) = |1 − 4| = 3 and g(6) = |6 − 4| = 2. Absolute value measures distance from 4: 1 is farther away than 6.',
  ),
  qc(
    3,
    'circ',
    { given: 'In a circle with radius 5, chord AB has length 8.', a: 'The distance from the center of the circle to chord AB', b: '3.5' },
    'B',
    'The perpendicular from the center bisects the chord, making a right triangle with hypotenuse 5 (a radius) and one leg 4 (half the chord). The other leg — the distance — is 3 (a 3-4-5 triangle). 3 < 3.5.',
  ),
  qc(
    3,
    'prob',
    { given: 'A fair coin is tossed 4 times.', a: 'The probability of getting exactly 2 heads', b: 'The probability of getting at least 3 heads' },
    'A',
    'There are 2⁴ = 16 equally likely outcomes. Exactly 2 heads: C(4, 2) = 6 outcomes → 6/16. At least 3 heads: C(4, 3) + C(4, 4) = 4 + 1 = 5 → 5/16. 6/16 > 5/16.',
  ),
  qc(
    3,
    'int',
    { given: 'n is a positive integer, and n² is divisible by 72.', a: 'The least possible value of n', b: '12' },
    'C',
    '72 = 2³ × 3². In a perfect square, every prime appears an even number of times, so n² needs at least 2⁴ × 3², meaning n needs at least 2² × 3 = 12. Check: 12² = 144 = 2 × 72 ✓. Smaller candidates such as 6 fail (36 isn’t divisible by 72).',
  ),
  qc(
    3,
    'lin',
    { given: '3x + 2y = 12, where x > 0 and y > 0.', a: 'x', b: 'y' },
    'D',
    'Many positive pairs fit. x = 2, y = 3 (B greater). x = 3, y = 1.5 (A greater). x = 2.4, y = 2.4 (equal). The relationship depends on the pair → D.',
  ),
  ps(
    2,
    'pct',
    'If 120 is increased by p percent, the result is 150. What is the value of p?',
    ['25', '30', '45', '50', '125'],
    0,
    'Percent increase = change ÷ original = 30/120 = 0.25 = 25%. (B) confuses the change (30) with the percent; dividing by the new value (30/150 = 20%) is another common slip.',
  ),
  ne(
    2,
    'quad',
    'If x² − y² = 48 and x + y = 12, what is the value of x?',
    8,
    'Factor the difference of squares: x² − y² = (x + y)(x − y) = 12(x − y) = 48, so x − y = 4. Adding x + y = 12 and x − y = 4 gives 2x = 16, x = 8.',
  ),
  ps(
    3,
    'tri',
    'In the figure above, a circle is inscribed in an equilateral triangle with sides of length 6. What is the radius of the circle?',
    ['1', '√2', '1.5', '√3', '2'],
    3,
    'In an equilateral triangle the center of the inscribed circle is also where the medians meet, one-third of the way up each height. Height = (√3/2) × 6 = 3√3, so r = (1/3)(3√3) = √3. (C) is a quarter of the side; don’t guess from the picture.',
    { stimulus: { figure: incircle } },
  ),
  ps(
    3,
    'rate',
    'A cyclist rides uphill from home to a lookout at an average speed of 8 miles per hour and returns home along the same road at an average speed of 24 miles per hour. If the round trip takes 2 hours, how many miles is it from home to the lookout?',
    ['6', '8', '10', '12', '16'],
    3,
    'Let d be the one-way distance. Time up + time down = d/8 + d/24 = 3d/24 + d/24 = 4d/24 = d/6 = 2, so d = 12. Averaging the speeds (16 mph) would give 16 miles in 2 hours round trip — 8 each way — the trap.',
  ),
  psMulti(
    3,
    'int',
    'If m and n are positive integers and m/n = 0.35, which of the following could be the value of n?\n\nIndicate all such values.',
    ['7', '14', '20', '35', '40', '60'],
    [2, 4, 5],
    '0.35 = 35/100 = 7/20 in lowest terms, so m/n = 7/20 and n must be a multiple of 20 (then m = 7k with n = 20k). Among the choices: 20, 40, 60. 7 and 35 are tempting because they share digits with 0.35, but 7/20 doesn’t reduce further.',
  ),
  ne(
    3,
    'prob',
    'How many positive three-digit integers have digits whose sum is 5? (For example, 104 is one such integer.)',
    15,
    'Count by the hundreds digit, which must be 1 to 5. If it is 1, the other two digits sum to 4: 5 ways (04, 13, 22, 31, 40). If 2 → sum 3: 4 ways. If 3 → 3 ways. If 4 → 2 ways. If 5 → 1 way (500). Total: 5 + 4 + 3 + 2 + 1 = 15.',
  ),
  ps(
    2,
    'lin',
    'Kim is 4 times as old as her son. In 20 years, she will be twice as old as her son. How old is Kim now?',
    ['30', '32', '36', '40', '44'],
    3,
    'Let s be the son’s age now, so Kim is 4s. In 20 years: 4s + 20 = 2(s + 20) → 4s + 20 = 2s + 40 → s = 10. Kim is 40. Check: in 20 years, 60 and 30 ✓.',
  ),
  ps(
    3,
    'exp',
    'What is the value of √(2¹⁰ + 2¹⁰ + 2¹⁰ + 2¹⁰) ?',
    ['2³', '2⁴', '2⁵', '2⁵√2', '2⁶'],
    4,
    'Four equal terms: 2¹⁰ + 2¹⁰ + 2¹⁰ + 2¹⁰ = 4 × 2¹⁰ = 2² × 2¹⁰ = 2¹². √(2¹²) = 2⁶. (C) takes √(2¹⁰) and forgets the other three terms.',
  ),
  ps(
    3,
    'stat',
    'The scores on an exam are approximately normally distributed with a mean of 500 and a standard deviation of 100. Approximately what percent of the scores are between 400 and 700?',
    ['48%', '68%', '82%', '95%', '98%'],
    2,
    '400 is 1 standard deviation below the mean and 700 is 2 above. In a normal distribution about 34% of values lie within 1 SD on each side of the mean, and about 13.5% lie between 1 and 2 SD on each side. So 34% + 34% + 13.5% ≈ 82%. (B) covers only 400–600.',
  ),
  ne(
    2,
    'pct',
    'According to the table above, by what percent did the average price of a gallon of milk increase from 2019 to 2023, to the nearest whole percent?',
    28,
    'Increase: $4.10 − $3.20 = $0.90. Percent increase: 0.90/3.20 = 0.28125 ≈ 28%. Dividing by the 2023 price (0.90/4.10 ≈ 22%) is the trap.',
    { roundTo: 1, suffix: '%', stimulus: milk },
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const bikes = {
  charts: [
    {
      type: 'line' as const,
      title: 'Bicycles Sold by Store S, 2019–2023',
      categories: ['2019', '2020', '2021', '2022', '2023'],
      series: [{ name: 'Bicycles sold', values: [400, 450, 600, 540, 700] }],
      yLabel: 'Number sold',
      yMax: 800,
      yStep: 100,
      showValues: true,
    },
  ],
};

export const Q2E = section(4, 'q2e', [
  qc(1, 'frac', { a: '0.5 × 18', b: '18 ÷ 0.5' }, 'B', '0.5 × 18 = 9, but 18 ÷ 0.5 = 18 × 2 = 36. Dividing by a number between 0 and 1 makes a positive number bigger.'),
  qc(1, 'tri', { given: 'Each side of an equilateral triangle has length 6.', a: 'The perimeter of the triangle', b: '18' }, 'C', 'Three sides of length 6: 3 × 6 = 18. Equal.'),
  qc(1, 'exp', { a: '3² + 4²', b: '(3 + 4)²' }, 'B', '3² + 4² = 9 + 16 = 25, while (3 + 4)² = 7² = 49. Squaring a sum is not the same as summing the squares — the difference is the 2ab term (2 × 3 × 4 = 24).'),
  qc(
    2,
    'lin',
    { given: 'x + y = 10 and x − y = 2', a: 'x', b: 'y + 1' },
    'A',
    'Add the equations: 2x = 12, so x = 6 and y = 4. A = 6, B = 4 + 1 = 5. A is greater.',
  ),
  qc(
    2,
    'int',
    { given: 'k is an even integer.', a: 'k²', b: '2k' },
    'D',
    'k = 2: 4 vs 4 (equal). k = 4: 16 vs 8 (A greater). k = 0: 0 vs 0 (equal). Since the relationship isn’t the same for every even k → D. (Always test 0 and 2 as well as a “typical” number.)',
  ),
  ps(1, 'stat', 'What is the average (arithmetic mean) of 12, 15, 18, 21, and 24?', ['18', '19', '20', '21', '22'], 0, 'The numbers are evenly spaced, so the mean is the middle number, 18. (Check: the sum is 90, and 90/5 = 18.)'),
  ne(
    1,
    'pct',
    'An item costs $60 before tax. If the sales tax is 8 percent, what is the total cost of the item including tax, in dollars?',
    64.8,
    'Tax: 8% of $60 = 0.08 × 60 = $4.80. Total: $60 + $4.80 = $64.80. Or directly: 1.08 × 60 = 64.8.',
    { prefix: '$', display: '64.80' },
  ),
  ps(1, 'lin', 'If 2x + 5 = 3x − 4, what is the value of x?', ['1', '3', '5', '9', '11'], 3, 'Subtract 2x from both sides: 5 = x − 4. Add 4: x = 9. Check: 23 = 23 ✓.'),
  ps(
    2,
    'tri',
    'A 13-foot ladder leans against a vertical wall. The foot of the ladder is 5 feet from the base of the wall on level ground. How many feet above the ground does the top of the ladder touch the wall?',
    ['8', '9', '10', '11', '12'],
    4,
    'The ladder is the hypotenuse of a right triangle: 5² + h² = 13², so h² = 169 − 25 = 144 and h = 12. (A 5-12-13 triple — worth memorizing.)',
  ),
  ps(2, 'int', 'What is the remainder when 247 is divided by 9?', ['1', '2', '4', '5', '7'], 2, '9 × 27 = 243, and 247 − 243 = 4. Shortcut: a number’s remainder on division by 9 equals its digit sum’s: 2 + 4 + 7 = 13 → 1 + 3 = 4.'),
  psMulti(
    2,
    'prob',
    'An integer is chosen at random from the integers 1 through 12, inclusive. Which of the following events have a probability of exactly 1/3?\n\nIndicate all such events.',
    ['The integer is a multiple of 3.', 'The integer is greater than 8.', 'The integer is prime.', 'The integer is even.', 'The integer is a multiple of 4.'],
    [0, 1],
    'Each event needs exactly 4 of the 12 integers. Multiples of 3: 3, 6, 9, 12 (4 ✓). Greater than 8: 9, 10, 11, 12 (4 ✓). Primes: 2, 3, 5, 7, 11 (5 ✗). Even: 6 ✗. Multiples of 4: 4, 8, 12 (3 ✗).',
  ),
  ps(2, 'fn', 'If h(x) = x² − 2x, what is the value of h(−3)?', ['−15', '3', '15', '21', '27'], 2, 'h(−3) = (−3)² − 2(−3) = 9 + 6 = 15. The slip is (−3)² = −9, or −2(−3) = −6.'),
  ne(
    1,
    'ratio',
    'On a map, 1 inch represents 25 miles. If two cities are 3.5 inches apart on the map, how many miles apart are they?',
    87.5,
    'Each map inch stands for 25 miles, so scale up: 3.5 × 25 = 87.5 miles (3 inches = 75 miles, plus half an inch = 12.5 miles).',
    { suffix: 'miles' },
  ),
  ps(
    2,
    'data',
    'Based on the graph above, by what percent did the number of bicycles sold increase from 2020 to 2021?',
    ['25%', '30%', '33⅓%', '50%', '150%'],
    2,
    'From 450 to 600 is an increase of 150. As a percent of the 2020 figure: 150/450 = 1/3 ≈ 33⅓%. Dividing by 600 gives 25% — the trap.',
    { stimulus: bikes },
  ),
  ps(
    3,
    'int',
    'How many integers from 1 to 100, inclusive, are divisible by neither 2 nor 5?',
    ['30', '40', '45', '50', '60'],
    1,
    'Count what to remove. Divisible by 2: 50. By 5: 20. By both (by 10): 10. Divisible by 2 or 5: 50 + 20 − 10 = 60. Neither: 100 − 60 = 40. (E) is the “2 or 5” count.',
  ),
]);
