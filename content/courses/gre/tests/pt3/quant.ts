// Practice Test 3 — Quantitative Reasoning.

import { NOT_TO_SCALE, dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

const parallels = fig(
  320,
  210,
  [
    g.line([20, 60], [290, 60]),
    g.line([20, 150], [290, 150]),
    g.line([90, 200], [210, 10]),
    g.text([300, 65], 'ℓ', 'start'),
    g.text([300, 155], 'm', 'start'),
    g.text([192, 50], '(2x + 10)°', 'start'),
    g.text([134, 140], '(3x − 20)°', 'start'),
  ],
  NOT_TO_SCALE,
);

const altitude = fig(
  240,
  210,
  [
    g.poly([
      [60, 80],
      [60, 170],
      [180, 170],
    ]),
    g.line([60, 170], [103.2, 112.4]),
    g.right([60, 170], [60, 80], [180, 170]),
    g.right([103.2, 112.4], [60, 170], [180, 170], 9),
    g.text([50, 80], 'A', 'end'),
    g.text([50, 186], 'B', 'end'),
    g.text([190, 186], 'C', 'start'),
    g.text([110, 106], 'D', 'start'),
    g.text([48, 130], '6', 'end', true),
    g.text([120, 190], '8', 'middle', true),
  ],
  NOT_TO_SCALE,
);

// ---------------------------------------------------------------- Section 1

const enrollment = {
  table: {
    caption: 'Enrollment in Four Programs at Westfield College',
    columns: ['Program', '2020', '2024'],
    rows: [
      ['Nursing', '240', '300'],
      ['Business', '400', '380'],
      ['Engineering', '160', '240'],
      ['Education', '200', '180'],
      ['Total', '1,000', '1,100'],
    ],
  },
};

export const Q1 = section(3, 'q1', [
  qc(
    1,
    'pct',
    { a: '25% of 60', b: '60% of 25' },
    'C',
    'x% of y always equals y% of x, because both are xy/100. Here each is 15.',
  ),
  qc(
    2,
    'coord',
    { given: 'Line ℓ has the equation y = −2x + 6.', a: 'The x-intercept of ℓ', b: 'The y-intercept of ℓ' },
    'B',
    'y-intercept: set x = 0 → y = 6. x-intercept: set y = 0 → 2x = 6 → x = 3. 6 > 3.',
  ),
  qc(
    2,
    'stat',
    { given: 'List X: 2, 4, 6, 8, 10\nList Y: 12, 14, 16, 18, 20', a: 'The standard deviation of list X', b: 'The standard deviation of list Y' },
    'C',
    'List Y is list X with 10 added to every number. Adding a constant shifts every value — and the mean — by the same amount, so every distance from the mean, and therefore the standard deviation, is unchanged.',
  ),
  qc(
    3,
    'frac',
    { given: 'x is a positive integer.', a: 'x / (x + 1)', b: '(x + 1) / (x + 2)' },
    'B',
    'Each is 1 minus a fraction: x/(x + 1) = 1 − 1/(x + 1) and (x + 1)/(x + 2) = 1 − 1/(x + 2). Since 1/(x + 2) < 1/(x + 1), B takes away less, so B is greater for every positive x. Check: x = 1 gives 1/2 vs 2/3.',
  ),
  ps(
    1,
    'rate',
    'Working at the same constant rate, 4 workers can build 3 sheds in 6 days. At that rate, how many days would it take 8 workers to build 3 sheds?',
    ['1.5', '3', '4', '9', '12'],
    1,
    'Doubling the workers doubles the rate, so the same job takes half the time: 6/2 = 3 days. (E) multiplies instead of dividing — more workers should mean less time.',
  ),
  dataSet('enrollment', enrollment, [
    ps(
      1,
      'data',
      'In 2024, enrollment in Business was approximately what percent of the total enrollment in the four programs?',
      ['25%', '30%', '35%', '38%', '40%'],
      2,
      '380/1,100 ≈ 0.345, about 35%. Using the 2020 figures (400/1,000 = 40%) is the trap.',
    ),
    psMulti(
      2,
      'data',
      'For which of the programs was the percent change in enrollment from 2020 to 2024 greater than 10 percent, in either direction?\n\nIndicate all such programs.',
      ['Nursing', 'Business', 'Engineering', 'Education'],
      [0, 2],
      'Nursing: +60/240 = +25% ✓. Business: −20/400 = −5% ✗. Engineering: +80/160 = +50% ✓. Education: −20/200 = −10% — exactly 10%, not greater ✗.',
    ),
    ne(
      3,
      'data',
      'The ratio of Nursing enrollment to Education enrollment was greater in 2024 than in 2020. By how much greater? Give your answer to the nearest hundredth.',
      0.47,
      '2024 ratio: 300/180 = 5/3 ≈ 1.667. 2020 ratio: 240/200 = 1.2. Difference ≈ 0.467, which rounds to 0.47.',
      { roundTo: 0.01 },
    ),
  ]),
  ps(
    2,
    'exp',
    'If 3ᵃ · 9ᵇ = 3¹² and a = 2b, what is the value of b?',
    ['2', '3', '4', '6', '12'],
    1,
    'Rewrite 9ᵇ as 3²ᵇ, so 3ᵃ · 3²ᵇ = 3ᵃ⁺²ᵇ = 3¹² and a + 2b = 12. Substituting a = 2b: 4b = 12, b = 3. (D) is a.',
  ),
  ps(
    2,
    'tri',
    'In the figure above, lines ℓ and m are parallel. What is the value of x?',
    ['20', '30', '38', '42', '50'],
    1,
    'Both marked angles sit above their parallel line and to the right of the transversal, so they are corresponding angles and are equal: 2x + 10 = 3x − 20, x = 30. (Each is 70°.) Setting them supplementary gives 38 — that would be right only for angles on opposite sides.',
    { stimulus: { figure: parallels } },
  ),
  ne(
    3,
    'int',
    'What is the greatest integer n such that 2ⁿ is a factor of 20! (the product of the integers 1 through 20)?',
    18,
    'Count the factors of 2 in 1 × 2 × … × 20. Multiples of 2 contribute one each: 10. Multiples of 4 contribute one more: 5. Multiples of 8, one more: 2. Multiples of 16, one more: 1. Total: 10 + 5 + 2 + 1 = 18.',
  ),
  ps(
    3,
    'prob',
    'A box contains 4 red balls and 3 blue balls. If 3 balls are drawn at random without replacement, what is the probability that exactly 2 of them are red?',
    ['12/35', '144/343', '16/35', '18/35', '4/7'],
    3,
    'Ways to pick 2 red and 1 blue: C(4, 2) × C(3, 1) = 6 × 3 = 18. Ways to pick any 3 balls: C(7, 3) = 35. Probability: 18/35. (B) treats the draws as independent — that’s drawing with replacement.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const rainfall = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Monthly Rainfall in Town T, January–May',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      series: [{ name: 'Rainfall', values: [4, 3, 5, 6, 2] }],
      yLabel: 'Inches',
      yMax: 7,
      yStep: 1,
      showValues: true,
    },
  ],
};

export const Q2H = section(3, 'q2h', [
  qc(
    2,
    'exp',
    { given: 'x < 0', a: '(x²)³', b: 'x⁵' },
    'A',
    '(x²)³ = x⁶, an even power, so it is positive for any nonzero x. x⁵ is an odd power of a negative number, so it is negative. Positive > negative.',
  ),
  qc(
    3,
    'circ',
    { given: 'A square and a circle have the same perimeter.', a: 'The area of the square', b: 'The area of the circle' },
    'B',
    'Let the common perimeter be P. Square: side P/4, area P²/16 = 0.0625P². Circle: 2πr = P, so r = P/(2π) and area = P²/(4π) ≈ 0.0796P². For a fixed perimeter, the circle encloses more area.',
  ),
  qc(
    3,
    'quad',
    { given: '(x − 3)² = 16', a: 'x', b: '−1' },
    'D',
    'Take square roots of both signs: x − 3 = 4 or x − 3 = −4, so x = 7 or x = −1. If x = 7, A is greater; if x = −1, they’re equal → D.',
  ),
  qc(
    3,
    'pct',
    {
      given: 'In a class, 60 percent of the students are women. Of the women, 25 percent are science majors; of the men, 40 percent are science majors.',
      a: 'The percent of all the students in the class who are science majors',
      b: '32%',
    },
    'B',
    'Weighted average: 0.60 × 25% + 0.40 × 40% = 15% + 16% = 31%. The simple average of 25% and 40% (32.5%) would make A look bigger — but there are more women, so the result is pulled toward 25%.',
  ),
  qc(
    2,
    'int',
    { given: 'a and b are positive integers, and a + b = 10.', a: 'The greatest possible value of ab', b: '25' },
    'C',
    'For a fixed sum, a product is largest when the numbers are as close as possible: 5 × 5 = 25. (4 × 6 = 24, 3 × 7 = 21, …) So the greatest possible value is 25.',
  ),
  ps(
    2,
    'lin',
    'If 5a − 3b = 11 and 2a + b = 11, what is the value of a + b?',
    ['1', '4', '7', '10', '13'],
    2,
    'From 2a + b = 11, b = 11 − 2a. Substitute: 5a − 3(11 − 2a) = 11 → 11a − 33 = 11 → a = 4, so b = 3 and a + b = 7. Check: 20 − 9 = 11 ✓, 8 + 3 = 11 ✓.',
  ),
  ne(
    3,
    'fn',
    'The function f is defined by f(x) = ax² + bx + c, where a, b, and c are constants. If f(0) = 3, f(1) = 6, and f(−1) = 4, what is the value of f(2)?',
    13,
    'f(0) = c = 3. f(1) = a + b + 3 = 6, so a + b = 3. f(−1) = a − b + 3 = 4, so a − b = 1. Adding: 2a = 4, a = 2, b = 1. f(2) = 2(4) + 2 + 3 = 13.',
  ),
  ps(
    3,
    'tri',
    'In the figure above, triangle ABC has a right angle at B, and BD is perpendicular to AC. If AB = 6 and BC = 8, what is the length of BD?',
    ['4', '4.8', '5', '6', '7.2'],
    1,
    'AC = 10 (a 6-8-10 triangle). Compute the area two ways: with legs, ½ × 6 × 8 = 24; with AC as base and BD as height, ½ × 10 × BD. So 5 × BD = 24 and BD = 4.8.',
    { stimulus: { figure: altitude } },
  ),
  ps(
    2,
    'rate',
    'Pump A alone can fill a tank in 4 hours. Pumps A and B working together can fill the same tank in 3 hours. How many hours would it take pump B alone to fill the tank?',
    ['1', '3.5', '7', '12', '24'],
    3,
    'Rates add: B’s rate = together − A = 1/3 − 1/4 = 1/12 tank per hour, so B alone takes 12 hours. (B) averages the times; (A) subtracts them.',
  ),
  psMulti(
    3,
    'stat',
    'A list of 7 numbers has an average (arithmetic mean) of 10 and a median of 8. If the greatest number in the list is increased by 14, which of the following must be true?\n\nIndicate all such statements.',
    [
      'The average of the list increases by 2.',
      'The median of the list is unchanged.',
      'The range of the list increases by 14.',
      'The standard deviation of the list is unchanged.',
    ],
    [0, 1, 2],
    'The sum rises by 14, so the mean rises by 14/7 = 2 ✓. The median is the 4th value in order; raising the largest value doesn’t move it ✓. The largest value rises by 14 and the smallest is unchanged, so the range rises by 14 ✓ (the list can’t be all equal, since its mean and median differ). The largest value moves farther from the mean, so the spread grows ✗.',
  ),
  ps(
    3,
    'prob',
    'In how many different ways can 5 people be seated in a row of 5 chairs if two particular people must sit next to each other?',
    ['24', '48', '60', '72', '120'],
    1,
    'Glue the pair into one block: now arrange 4 units — 4! = 24 ways. The pair can sit in 2 orders inside the block: 24 × 2 = 48. (A) forgets the pair’s two orders; (E) ignores the restriction.',
  ),
  ne(
    3,
    'int',
    'When the positive integer n is divided by 5, the remainder is 3, and when n is divided by 7, the remainder is 4. What is the least possible value of n?',
    18,
    'List numbers with remainder 3 on division by 5: 3, 8, 13, 18, 23, … Check each for remainder 4 on division by 7: 3 → 3, 8 → 1, 13 → 6, 18 → 4 ✓. So n = 18.',
  ),
  psMulti(
    3,
    'coord',
    'In the xy-plane, a circle with center (3, −2) passes through the point (7, 1). Which of the following points also lie on the circle?\n\nIndicate all such points.',
    ['(8, −2)', '(3, 4)', '(0, 2)', '(5, 2)', '(−2, −2)'],
    [0, 2, 4],
    'Radius = distance from (3, −2) to (7, 1) = √(4² + 3²) = 5. A point lies on the circle if its distance from the center is 5. (8, −2): 5 ✓. (3, 4): 6 ✗. (0, 2): √(9 + 16) = 5 ✓. (5, 2): √(4 + 16) = √20 ✗. (−2, −2): 5 ✓.',
  ),
  ne(
    3,
    'pct',
    'The price of a stock rose 20 percent on Monday and then fell x percent on Tuesday, closing Tuesday 8 percent below its price before Monday’s rise. What is x, to the nearest tenth?',
    23.3,
    'Use multipliers: 1.20 × (1 − x/100) = 0.92, so 1 − x/100 = 0.92/1.20 ≈ 0.7667 and x ≈ 23.3. Adding percents (20 + 8 = 28) is the trap — Tuesday’s drop is measured from Monday’s higher price.',
    { roundTo: 0.1, suffix: '%' },
  ),
  ps(
    2,
    'data',
    'Based on the graph above, in how many of the five months was the rainfall greater than the average (arithmetic mean) monthly rainfall for the five months?',
    ['1', '2', '3', '4', '5'],
    1,
    'Total: 4 + 3 + 5 + 6 + 2 = 20 inches, so the average is 4. Only March (5) and April (6) are above 4 — January equals it.',
    { stimulus: rainfall },
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const visitors = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Visitors to a Museum, Monday–Friday',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      series: [{ name: 'Visitors', values: [120, 90, 150, 180, 210] }],
      yLabel: 'Number of visitors',
      yMax: 240,
      yStep: 40,
      showValues: true,
    },
  ],
};

export const Q2E = section(3, 'q2e', [
  qc(1, 'int', { a: '7 × 13', b: '90' }, 'A', '7 × 13 = 70 + 21 = 91, and 91 > 90. (Splitting 13 into 10 + 3 keeps the arithmetic mental.)'),
  qc(1, 'lin', { given: 'x = 4', a: 'x² − 3x', b: '2x − 4' }, 'C', 'x² − 3x = 16 − 12 = 4 and 2x − 4 = 8 − 4 = 4. Equal.'),
  qc(
    2,
    'prob',
    { given: 'A bag contains 3 red marbles and 5 blue marbles.', a: 'The probability that a marble chosen at random is red', b: '0.4' },
    'B',
    '3 of 8 marbles are red: 3/8 = 0.375, which is less than 0.4.',
  ),
  qc(
    2,
    'int',
    { given: 'n is a positive integer.', a: 'n + n', b: 'n × n' },
    'D',
    'n = 1: 2 vs 1 (A greater). n = 2: 4 vs 4 (equal). n = 3: 6 vs 9 (B greater). Different answers for different n → D.',
  ),
  qc(1, 'circ', { given: 'The perimeter of a square is 20.', a: 'The area of the square', b: '20' }, 'A', 'A square has four equal sides, so each side is 20/4 = 5 and the area is 5² = 25 > 20.'),
  ps(
    1,
    'frac',
    'Which of the following is closest to 0.48 × 2.1?',
    ['0.1', '0.5', '1', '2', '10'],
    2,
    'Round: 0.48 ≈ 0.5 and 2.1 ≈ 2, so the product ≈ 1. (Exactly: 1.008.)',
  ),
  ne(1, 'lin', 'If 7 − 2y = −5, what is the value of y?', 6, 'Subtract 7: −2y = −12. Divide by −2: y = 6. Check: 7 − 12 = −5 ✓.'),
  ps(
    1,
    'pct',
    'In a survey of 250 people, 40 percent said they prefer tea to coffee. How many of the people surveyed said they prefer tea?',
    ['60', '100', '125', '150', '210'],
    1,
    '40% of 250 = 0.4 × 250 = 100. (D) is the number who did not say tea.',
  ),
  psMulti(
    2,
    'tri',
    'Two sides of a triangle have lengths 4 and 9. Which of the following could be the length of the third side?\n\nIndicate all such lengths.',
    ['4', '5', '6', '10', '13', '14'],
    [2, 3],
    'The third side must be greater than 9 − 4 = 5 and less than 9 + 4 = 13. Only 6 and 10 are strictly between. At exactly 5 or 13 the “triangle” would collapse into a straight line.',
  ),
  ps(
    1,
    'circ',
    'A right circular cylinder has a radius of 3 and a height of 5. What is its volume?',
    ['15π', '30π', '45π', '75π', '90π'],
    2,
    'Volume = πr²h = π × 9 × 5 = 45π. (A) uses r instead of r².',
  ),
  ps(
    2,
    'stat',
    'The average (arithmetic mean) of five numbers is 12. If one of the numbers, 20, is removed, what is the average of the remaining four numbers?',
    ['8', '10', '11', '12', '13'],
    1,
    'The five numbers sum to 5 × 12 = 60. Removing 20 leaves 40, and 40/4 = 10.',
  ),
  ps(1, 'fn', 'If f(x) = 3x − 2, for what value of x does f(x) = 13?', ['1', '3', '5', '11', '37'], 2, '3x − 2 = 13 → 3x = 15 → x = 5. (E) computes f(13) instead.'),
  ps(
    2,
    'prob',
    'How many different two-letter arrangements can be made from the letters A, B, C, D, and E if no letter may be used twice? (For example, AB and BA are different arrangements.)',
    ['5', '10', '20', '25', '32'],
    2,
    'Order matters and there’s no repetition: 5 choices for the first letter × 4 for the second = 20. (B) counts unordered pairs; (D) allows repeats.',
  ),
  ne(
    2,
    'data',
    'Based on the graph above, what was the average (arithmetic mean) number of visitors per day for the five days?',
    150,
    'Total: 120 + 90 + 150 + 180 + 210 = 750. Average: 750/5 = 150.',
    { stimulus: visitors },
  ),
  ps(
    3,
    'pct',
    'A number is increased by 25 percent, and then the result is decreased by 25 percent. If the final number is 90, what was the original number?',
    ['84', '90', '96', '100', '104'],
    2,
    'Multipliers: x × 1.25 × 0.75 = 0.9375x = 90, so x = 96. (B) assumes the two changes cancel; they don’t, because the decrease is taken from a larger number.',
  ),
]);
