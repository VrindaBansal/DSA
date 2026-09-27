// Practice Test 2 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

const rectTriangle = fig(300, 210, [
  g.poly([
    [40, 40],
    [260, 40],
    [260, 170],
    [40, 170],
  ]),
  g.line([40, 40], [170, 170]),
  g.line([260, 40], [170, 170]),
  g.text([32, 36], 'A', 'end'),
  g.text([268, 36], 'B', 'start'),
  g.text([268, 186], 'C', 'start'),
  g.text([32, 186], 'D', 'end'),
  g.text([170, 190], 'E'),
  g.text([150, 30], '10', 'middle', true),
  g.text([30, 110], '6', 'end', true),
]);

const twoCircles = fig(280, 160, [
  g.poly(
    [
      [20, 20],
      [260, 20],
      [260, 140],
      [20, 140],
    ],
    '#d5dae0',
  ),
  g.circle([80, 80], 60, '#ffffff'),
  g.circle([200, 80], 60, '#ffffff'),
]);

// ---------------------------------------------------------------- Section 1

const finances = {
  charts: [
    {
      type: 'line' as const,
      title: 'Company Y: Annual Revenue and Costs, 2018–2023',
      categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
      series: [
        { name: 'Revenue', values: [40, 45, 38, 50, 62, 70] },
        { name: 'Costs', values: [35, 37, 36, 41, 48, 54] },
      ],
      yLabel: 'Millions of dollars',
      yMax: 80,
      yStep: 10,
      showValues: true,
    },
  ],
};

export const Q1 = section(2, 'q1', [
  qc(1, 'frac', { a: '5/8', b: '0.6' }, 'A', '5/8 = 0.625, and 0.625 > 0.6. (Or compare 5/8 with 3/5 by cross-multiplying: 25 vs 24.)'),
  qc(
    2,
    'int',
    { given: 'When the positive integer k is divided by 6, the remainder is 4.', a: 'The remainder when k is divided by 3', b: '1' },
    'C',
    'k = 6m + 4 for some integer m. Since 6m is a multiple of 3, the remainder of k on division by 3 is the remainder of 4, which is 1. Check with the simplest cases: k = 4 → 1; k = 10 → 1; k = 16 → 1.',
  ),
  qc(
    2,
    'lin',
    { given: '3 − 2x > 7', a: 'x', b: '−2' },
    'B',
    'Subtract 3: −2x > 4. Divide by −2 and flip the inequality: x < −2. So x is always less than −2. Forgetting to flip the sign gives x > −2 and the wrong answer A.',
  ),
  qc(
    3,
    'int',
    { given: 'n is an integer, and n³ < n.', a: 'n', b: '−1.5' },
    'B',
    'Test the integers. n = 0 and n = ±1 give n³ = n (not less). Every positive integer greater than 1 has n³ > n. For n = −2: −8 < −2 ✓, and every integer below −2 also works. So n ≤ −2, which is always less than −1.5.',
  ),
  ps(
    1,
    'pct',
    'What number is 30 percent of 40 percent of 500?',
    ['6', '60', '70', '120', '350'],
    1,
    '40% of 500 is 200, and 30% of 200 is 60. Or multiply the decimals: 0.3 × 0.4 × 500 = 0.12 × 500 = 60. (C) adds the two percents instead — a percent of a percent multiplies.',
  ),
  dataSet('finances', finances, [
    ps(
      1,
      'data',
      'In how many of the years from 2019 through 2023 did the company’s revenue increase from the previous year?',
      ['2', '3', '4', '5', '6'],
      2,
      'Compare each year with the one before: 2019 (45 > 40) up, 2020 (38 < 45) down, 2021 (50) up, 2022 (62) up, 2023 (70) up. That’s 4 increases.',
    ),
    ne(
      2,
      'data',
      'By what percent did the company’s costs increase from 2018 to 2023, to the nearest whole percent?',
      54,
      'Costs went from 35 to 54 (million dollars), an increase of 19. Percent increase = 19/35 ≈ 0.543 = 54.3%, which rounds to 54. Divide by the starting value (35), not the ending value — 19/54 ≈ 35% is the trap.',
      { roundTo: 1, suffix: '%' },
    ),
    ps(
      3,
      'data',
      'Suppose that from 2023 to 2024 the company’s revenue increases by the same percent as it did from 2022 to 2023, and its costs increase by the same dollar amount as they did from 2022 to 2023. Approximately what will the company’s profit (revenue minus costs) be in 2024, in millions of dollars?',
      ['14', '16', '19', '22', '25'],
      2,
      'Revenue 2022→2023: 62 → 70, a factor of 70/62 ≈ 1.129. So 2024 revenue ≈ 70 × 1.129 ≈ 79.0. Costs 2022→2023 rose by 54 − 48 = 6, so 2024 costs = 60. Profit ≈ 79.0 − 60 = 19. Note the two different kinds of change: percent for revenue, dollars for costs.',
    ),
  ]),
  ps(
    2,
    'quad',
    'If x² − 5x − 14 = 0 and x < 0, what is the value of x³?',
    ['−343', '−8', '−2', '8', '343'],
    1,
    'Factor: x² − 5x − 14 = (x − 7)(x + 2), so x = 7 or x = −2. With x < 0, x = −2 and x³ = −8. (C) stops at x; (E) uses the root you were told to discard.',
  ),
  ne(
    2,
    'tri',
    'In the figure above, ABCD is a rectangle with AB = 10 and AD = 6, and point E lies on side CD. What is the area of triangle ABE?',
    30,
    'Take AB as the base (10). The height of triangle ABE is the perpendicular distance from E to AB — and since E is on CD, that distance is the rectangle’s height, 6, wherever E sits. Area = ½ × 10 × 6 = 30: exactly half the rectangle.',
    { stimulus: { figure: rectTriangle } },
  ),
  psMulti(
    2,
    'stat',
    'A number x is added to the list 4, 7, 7, 9, 13. For which of the following values of x does the median of the new list equal the median of the original list?\n\nIndicate all such values.',
    ['3', '5', '7', '8', '10'],
    [0, 1, 2],
    'The original median is 7. The new list has six numbers, so its median is the average of the 3rd and 4th. If x ≤ 7, the 3rd and 4th numbers are both 7 (e.g. 4, 5, 7, 7, 9, 13), so the median stays 7. If x = 8: 4, 7, 7, 8, 9, 13 → (7 + 8)/2 = 7.5. If x = 10: (7 + 9)/2 = 8. So 3, 5, and 7 work.',
  ),
  ps(
    3,
    'prob',
    'A 4-digit code is formed from the digits 0 through 9. Digits may repeat, the first digit cannot be 0, and the code must contain at least one 7. How many such codes are possible?',
    ['2,916', '3,168', '3,439', '3,600', '5,832'],
    1,
    '“At least one” → count the complement. All codes with a nonzero first digit: 9 × 10 × 10 × 10 = 9,000. Codes with no 7 at all: first digit from 8 choices (1–9 except 7), each other digit from 9 choices (0–9 except 7): 8 × 9 × 9 × 9 = 5,832. Codes with at least one 7: 9,000 − 5,832 = 3,168. (E) is the complement itself.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const scores = {
  table: {
    caption: 'Scores of 25 Students on a 5-Point Quiz',
    columns: ['Score', 'Number of students'],
    rows: [
      ['1', '3'],
      ['2', '5'],
      ['3', '8'],
      ['4', '6'],
      ['5', '3'],
    ],
  },
};

export const Q2H = section(2, 'q2h', [
  qc(2, 'exp', { a: '9⁴', b: '3⁷' }, 'A', 'Rewrite with a common base: 9⁴ = (3²)⁴ = 3⁸, and 3⁸ = 3 × 3⁷ > 3⁷.'),
  qc(
    3,
    'fn',
    { given: 'f(x) = x² − 4x + 7 for all numbers x.', a: 'The minimum value of f(x)', b: '4' },
    'B',
    'Complete the square: x² − 4x + 7 = (x − 2)² + 3. A square is never negative, so the minimum is 3 (at x = 2). 3 < 4.',
  ),
  qc(
    3,
    'int',
    { given: 'p and q are different prime numbers.', a: 'The number of positive divisors of p²q', b: '6' },
    'C',
    'Divisors of p²q have the form pᵃqᵇ with a = 0, 1, or 2 and b = 0 or 1: 3 × 2 = 6 choices. For example, 2² × 3 = 12 has divisors 1, 2, 3, 4, 6, 12 — six, whichever primes you pick.',
  ),
  qc(
    2,
    'int',
    { given: 'x and y are integers, and xy = 12.', a: 'x + y', b: '7' },
    'D',
    'x = 3, y = 4 gives 7 (equal). x = 1, y = 12 gives 13 (A greater). x = −3, y = −4 gives −7 (B greater). Integers can be negative — always test them.',
  ),
  qc(
    3,
    'prob',
    { given: 'Events E and F are independent, with P(E) = 0.4 and P(F) = 0.5.', a: 'The probability that at least one of E and F occurs', b: '0.8' },
    'B',
    'P(E or F) = P(E) + P(F) − P(E and F). Independent → P(E and F) = 0.4 × 0.5 = 0.2. So P(E or F) = 0.4 + 0.5 − 0.2 = 0.7 < 0.8. Adding without subtracting the overlap gives 0.9 and the wrong answer A.',
  ),
  ps(
    2,
    'pct',
    'A store marks up the price of a lamp 40 percent above its cost. During a sale, the lamp is sold for 25 percent off the marked price. The store’s profit on the lamp is what percent of its cost?',
    ['0%', '5%', '10%', '15%', '25%'],
    1,
    'Pick a cost of $100. Marked price: $140. Sale price: 75% of $140 = $105. Profit: $5 on a $100 cost — 5%. (D) subtracts the percents (40 − 25); percent changes multiply: 1.40 × 0.75 = 1.05.',
  ),
  ps(
    3,
    'exp',
    'If 2ˣ⁺³ − 2ˣ = 56, what is the value of x?',
    ['1', '2', '3', '4', '5'],
    2,
    'Factor out the common power: 2ˣ⁺³ − 2ˣ = 2ˣ(2³ − 1) = 7 · 2ˣ. So 7 · 2ˣ = 56, 2ˣ = 8, x = 3. Check: 2⁶ − 2³ = 64 − 8 = 56 ✓.',
  ),
  ps(
    3,
    'circ',
    'In the figure above, two circles of equal radius lie inside a rectangle that measures 20 by 10. Each circle is tangent to the other circle and to three sides of the rectangle. What fraction of the rectangle’s area is shaded?',
    ['1 − π/4', 'π/2 − 1', '1 − π/8', 'π/4', '1 − π/16'],
    0,
    'Each circle fits the rectangle’s height of 10, so its radius is 5 (and two diameters = 20, the length ✓). Circles’ area: 2 × π × 5² = 50π. Rectangle: 200. Shaded fraction: (200 − 50π)/200 = 1 − π/4 (about 0.21). (D) is the unshaded fraction.',
    { stimulus: { figure: twoCircles } },
  ),
  ps(
    3,
    'rate',
    'Train A leaves a station at 1:00 p.m. traveling at a constant 60 miles per hour. Train B leaves the same station at 2:30 p.m., traveling in the same direction on a parallel track at a constant 80 miles per hour. At what time will Train B catch up to Train A?',
    ['5:30 p.m.', '6:00 p.m.', '6:30 p.m.', '7:00 p.m.', '8:00 p.m.'],
    3,
    'When B starts, A has driven 1.5 hours × 60 = 90 miles. B gains 80 − 60 = 20 miles per hour, so it needs 90/20 = 4.5 hours: 2:30 + 4:30 = 7:00 p.m. Check: A has driven 6 hours (360 mi), B 4.5 hours (360 mi) ✓.',
  ),
  ps(
    3,
    'stat',
    'A list of 10 numbers has an average (arithmetic mean) of 20 and a standard deviation of 4. Each number in the list is multiplied by 3, and then 5 is subtracted from each result. What is the standard deviation of the new list?',
    ['4', '7', '12', '17', '55'],
    2,
    'Standard deviation measures spread. Multiplying every value by 3 triples every distance from the mean, so the SD becomes 12. Subtracting 5 from every value shifts the list without changing the spread, so it stays 12. (E) is the new mean (3 × 20 − 5).',
  ),
  ne(
    3,
    'prob',
    'A fair six-sided die is rolled twice. What is the probability that the product of the two numbers rolled is even?',
    3 / 4,
    'The product is odd only if both rolls are odd: (1/2)(1/2) = 1/4. So P(even product) = 1 − 1/4 = 3/4 (27/36 if you count outcomes). Any equivalent fraction is accepted.',
    { fraction: true, display: '3/4' },
  ),
  psMulti(
    3,
    'exp',
    'Which of the following are equal to 4¹⁰?\n\nIndicate all such expressions.',
    ['2²⁰', '16⁵', '8⁷', '2¹⁰ + 2¹⁰', '4⁹ + 4⁹ + 4⁹ + 4⁹'],
    [0, 1, 4],
    'Convert to base 2: 4¹⁰ = 2²⁰. 16⁵ = (2⁴)⁵ = 2²⁰ ✓. 8⁷ = 2²¹ ✗. 2¹⁰ + 2¹⁰ = 2 × 2¹⁰ = 2¹¹ ✗. 4⁹ + 4⁹ + 4⁹ + 4⁹ = 4 × 4⁹ = 4¹⁰ ✓.',
  ),
  ps(
    2,
    'lin',
    'A theater sells adult tickets for $12 each and child tickets for $8 each. For one performance, 150 tickets were sold for a total of $1,520. How many adult tickets were sold?',
    ['60', '70', '80', '90', '100'],
    2,
    'Let a = adult tickets, so 150 − a are child tickets. 12a + 8(150 − a) = 1,520 → 4a + 1,200 = 1,520 → a = 80. Check: 80 × 12 + 70 × 8 = 960 + 560 = 1,520 ✓.',
  ),
  ps(
    3,
    'ratio',
    'A 60-liter mixture contains milk and water in the ratio 7 to 3. How many liters of water must be added to make the ratio of milk to water 3 to 2?',
    ['2', '4', '6', '10', '12'],
    3,
    'The mixture has 42 liters of milk and 18 of water. Milk doesn’t change, so the new amount of water w satisfies 42/w = 3/2 → w = 28. Add 28 − 18 = 10 liters.',
  ),
  ne(
    2,
    'stat',
    'The table above shows the scores of 25 students on a quiz. What is the average (arithmetic mean) score?',
    3.04,
    'Weight each score by how many students earned it: 1(3) + 2(5) + 3(8) + 4(6) + 5(3) = 3 + 10 + 24 + 24 + 15 = 76. Mean = 76/25 = 3.04. Averaging the five scores (1 through 5 → 3) ignores the counts.',
    { stimulus: scores },
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const budget = {
  charts: [
    {
      type: 'pie' as const,
      title: 'The Lee Family’s Monthly Budget',
      categories: ['Housing', 'Food', 'Transportation', 'Savings', 'Other'],
      series: [{ name: 'Share', values: [35, 20, 15, 10, 20] }],
      unit: '%',
    },
  ],
};

export const Q2E = section(2, 'q2e', [
  qc(1, 'pct', { a: '3/4 of 20', b: '20% of 80' }, 'B', '3/4 of 20 = 15. 20% of 80 = 0.2 × 80 = 16. 16 > 15.'),
  qc(1, 'lin', { given: 'a = 5 and b = −2', a: 'a − b', b: 'a + b' }, 'A', 'a − b = 5 − (−2) = 7; a + b = 5 + (−2) = 3. Subtracting a negative adds.'),
  qc(
    2,
    'tri',
    { given: 'The measures of the three angles of a triangle are in the ratio 1 : 2 : 3.', a: 'The measure of the largest angle', b: '90°' },
    'C',
    'The angles are x, 2x, and 3x, and they sum to 180°: 6x = 180, x = 30. The largest is 3x = 90° — a right triangle.',
  ),
  qc(1, 'lin', { given: '2x + 3 = 11 and 3y − 2 = 13', a: 'x', b: 'y' }, 'B', '2x = 8 gives x = 4; 3y = 15 gives y = 5. 5 > 4.'),
  qc(
    2,
    'exp',
    { given: '0 < m < 1', a: 'm²', b: 'm³' },
    'A',
    'For a number between 0 and 1, each extra factor of m makes it smaller: m³ = m² × m < m². Try m = 1/2: 1/4 > 1/8.',
  ),
  ps(
    1,
    'ratio',
    'A car uses 3 gallons of gasoline to travel 84 miles. At the same rate, how many gallons will it use to travel 140 miles?',
    ['4', '4.5', '5', '5.5', '6'],
    2,
    'The car gets 84/3 = 28 miles per gallon. 140/28 = 5 gallons. Or set up a proportion: 3/84 = g/140 → g = 5.',
  ),
  ps(1, 'exp', 'What is the value of 2³ × 5² − 10²?', ['0', '100', '150', '200', '900'], 1, 'Exponents first: 8 × 25 − 100 = 200 − 100 = 100.'),
  ne(
    1,
    'stat',
    'Evan’s scores on four tests were 82, 90, 76, and 88. What score must he earn on the fifth test so that the average (arithmetic mean) of all five scores is 85?',
    89,
    'An average of 85 over five tests needs a total of 5 × 85 = 425. The first four sum to 82 + 90 + 76 + 88 = 336. He needs 425 − 336 = 89.',
  ),
  ps(
    2,
    'coord',
    'What is the slope of the line that passes through the points (−1, 4) and (3, −4) in the xy-plane?',
    ['−4', '−2', '−1/2', '1/2', '2'],
    1,
    'Slope = change in y ÷ change in x = (−4 − 4)/(3 − (−1)) = −8/4 = −2. (C) flips the fraction.',
  ),
  ps(
    2,
    'ratio',
    'A recipe uses flour and sugar in the ratio 5 to 2 by volume. If a batch uses a total of 21 cups of flour and sugar, how many cups of flour does it use?',
    ['6', '10', '12', '15', '18'],
    3,
    '5 + 2 = 7 parts make 21 cups, so each part is 3 cups. Flour = 5 parts = 15 cups (and sugar = 6).',
  ),
  ps(2, 'circ', 'The area of a circle is 36π. What is the circumference of the circle?', ['6π', '9π', '12π', '18π', '36π'], 2, 'πr² = 36π gives r = 6. Circumference = 2πr = 12π. (A) uses the radius alone.'),
  psMulti(
    2,
    'lin',
    'Which of the following values of x satisfy the inequality |x − 3| < 4?\n\nIndicate all such values.',
    ['−2', '−1', '0', '3', '6', '7', '8'],
    [2, 3, 4],
    '|x − 3| < 4 means x is within 4 of 3: −4 < x − 3 < 4, so −1 < x < 7. The endpoints −1 and 7 are excluded (strict inequality). Of the choices, 0, 3, and 6 work.',
  ),
  ne(
    2,
    'data',
    'The graph above shows how the Lee family divides its monthly budget. If the family’s monthly budget is $4,200, how many more dollars per month does it spend on housing than on food?',
    630,
    'Housing is 35% and food 20%, a difference of 15 percentage points. 15% of $4,200 = 0.15 × 4,200 = $630. (Finding each amount first also works: $1,470 − $840 = $630.)',
    { prefix: '$', stimulus: budget },
  ),
  ps(
    1,
    'prob',
    'A jar contains 5 red marbles, 3 green marbles, and 2 yellow marbles. If one marble is chosen at random, what is the probability that it is not red?',
    ['1/5', '3/10', '1/2', '3/5', '7/10'],
    2,
    '5 of the 10 marbles are not red (3 green + 2 yellow): 5/10 = 1/2.',
  ),
  ps(
    3,
    'int',
    'What is the sum of all the positive divisors of 36?',
    ['55', '72', '81', '91', '108'],
    3,
    'List divisors in pairs: 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6. The divisors are 1, 2, 3, 4, 6, 9, 12, 18, 36 (count 6 only once). Sum: 91.',
  ),
]);
