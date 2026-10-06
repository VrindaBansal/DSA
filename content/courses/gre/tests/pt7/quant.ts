// Practice Test 7 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

// Circle with center O and central angle AOB of 72°, symmetric about the
// vertical: A at 126° and B at 54° (radius 95 px).
const arc = fig(300, 240, [
  g.circle([150, 125], 95),
  g.line([150, 125], [94.2, 48.1]),
  g.line([150, 125], [205.8, 48.1]),
  g.dot([150, 125]),
  g.dot([94.2, 48.1]),
  g.dot([205.8, 48.1]),
  g.text([86, 42], 'A', 'end'),
  g.text([214, 42], 'B', 'start'),
  g.text([150, 146], 'O'),
  g.text([150, 100], '72°', 'middle', true),
]);

// ---------------------------------------------------------------- Section 1

const clubs = {
  charts: [
    {
      type: 'line' as const,
      title: 'Membership of Two Clubs, 2018–2023',
      categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
      series: [
        { name: 'Club A', values: [120, 150, 135, 180, 210, 240] },
        { name: 'Club B', values: [200, 190, 175, 170, 180, 200] },
      ],
      yLabel: 'Number of members',
      yMax: 250,
      yStep: 50,
      showValues: true,
    },
  ],
};

export const Q1 = section(7, 'q1', [
  qc(2, 'frac', { a: '(0.9)²', b: '0.8' }, 'A', '(0.9)² = 0.81, which is greater than 0.8. Squaring a number between 0 and 1 makes it smaller — 0.81 < 0.9 — but not smaller than 0.8.'),
  qc(
    2,
    'exp',
    { given: 'x ≠ 0', a: 'x²', b: 'x⁻²' },
    'D',
    'x⁻² = 1/x². If x = 2: 4 vs 1/4 (A greater). If x = 1/2: 1/4 vs 4 (B greater). If x = 1: both 1. Numbers between −1 and 1 flip the comparison.',
  ),
  qc(
    2,
    'rate',
    { given: 'Car P travels 190 miles in 3 hours. Car Q travels 250 miles in 4 hours.', a: 'The average speed of car P', b: 'The average speed of car Q' },
    'A',
    'Car P: 190 ÷ 3 ≈ 63.3 miles per hour. Car Q: 250 ÷ 4 = 62.5 miles per hour. P is faster, though it went fewer miles.',
  ),
  qc(
    3,
    'circ',
    { given: 'Cube A has edges of length 2. The volume of cube B is twice the volume of cube A.', a: 'The edge length of cube B', b: '2.5' },
    'A',
    'Cube A has volume 8, so cube B has volume 16 and edge ∛16. Since 2.5³ = 15.625 < 16, the edge is a little more than 2.5 (about 2.52). Doubling the volume multiplies the edge by only ∛2 ≈ 1.26, not by 2.',
  ),
  ps(
    1,
    'pct',
    'A shirt originally priced at $40 is marked down to $34. By what percent was the price reduced?',
    ['6%', '10%', '12%', '15%', '17.6%'],
    3,
    'The reduction is $6 on an original price of $40: 6 ÷ 40 = 0.15 = 15%. (E) divides by the sale price, 6 ÷ 34; (A) is the dollar amount of the reduction, not a percent.',
  ),
  dataSet('clubs', clubs, [
    ps(
      1,
      'data',
      'In how many of the years shown did Club A have more members than Club B?',
      ['1', '2', '3', '4', '5'],
      2,
      'Club A is ahead in 2021 (180 vs 170), 2022 (210 vs 180), and 2023 (240 vs 200) — 3 years. In 2018–2020, Club B had more.',
    ),
    ne(
      2,
      'data',
      'By what percent did Club A’s membership increase from 2018 to 2023?',
      100,
      'From 120 to 240: an increase of 120 on a base of 120, which is 100%. (Doubling is a 100% increase, not 200%.)',
      { suffix: '%' },
    ),
    psMulti(
      3,
      'data',
      'For which of the following pairs of consecutive years did Club A’s membership increase by more than 20 percent?\n\nIndicate all such pairs.',
      ['2018 to 2019', '2019 to 2020', '2020 to 2021', '2021 to 2022', '2022 to 2023'],
      [0, 2],
      'More than 20% means the new value exceeds 1.2 × the old. 2018→2019: 150 > 144 ✓. 2019→2020: a decrease ✗. 2020→2021: 180 > 162 ✓. 2021→2022: 210 < 216 ✗. 2022→2023: 240 < 252 ✗. The later increases are larger in members (30) but smaller in percent.',
    ),
  ]),
  ps(
    2,
    'lin',
    'If 2x + 3y = 17 and x − y = 1, what is the value of xy?',
    ['12', '15', '18', '20', '24'],
    0,
    'From the second equation, x = y + 1. Substitute: 2(y + 1) + 3y = 17, so 5y = 15 and y = 3. Then x = 4, and xy = 12.',
  ),
  ne(
    3,
    'tri',
    'The legs of a right triangle have lengths 9 and 12. What is the distance from the vertex of the right angle to the midpoint of the hypotenuse?',
    7.5,
    'The hypotenuse is √(81 + 144) = 15. The midpoint of the hypotenuse is the center of the circle through all three vertices (the hypotenuse is a diameter), so it is the same distance — half of 15 — from every vertex: 7.5. (Check with coordinates: right angle at (0, 0), midpoint (4.5, 6), distance √(20.25 + 36) = 7.5.)',
  ),
  psMulti(
    2,
    'int',
    'Which of the following integers are divisible by both 3 and 4 but are not divisible by 8?\n\nIndicate all such integers.',
    ['12', '24', '36', '48', '60', '72'],
    [0, 2, 4],
    'Divisible by 3 and 4 means divisible by 12 — all six are. Now drop the multiples of 8: 24, 48, and 72 are, while 12, 36, and 60 are not (each leaves remainder 4 when divided by 8).',
  ),
  ps(
    3,
    'prob',
    'The five letters of the word LEVEL are arranged in a row at random. What is the probability that the arrangement begins and ends with the letter L?',
    ['1/20', '1/10', '1/5', '2/5', '1/2'],
    1,
    'Distinct arrangements of L, E, V, E, L: 5!/(2! × 2!) = 30. With an L at each end, the middle three letters E, V, E can be arranged 3!/2! = 3 ways. Probability 3/30 = 1/10. (Or place letters one at a time: first letter L with probability 2/5, last letter the other L with probability 1/4: 2/5 × 1/4 = 1/10.)',
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const languages = {
  table: {
    caption: 'Students Enrolled in Language Courses at Rowan College',
    columns: ['Language', '2021', '2022', '2023'],
    rows: [
      ['Spanish', '240', '260', '300'],
      ['French', '120', '110', '90'],
      ['Mandarin', '60', '80', '110'],
      ['Total', '420', '450', '500'],
    ],
  },
};

export const Q2E = section(7, 'q2e', [
  qc(1, 'int', { a: 'The number of positive divisors of 16', b: 'The number of positive divisors of 15' }, 'A', '16: 1, 2, 4, 8, 16 — five divisors. 15: 1, 3, 5, 15 — four. 5 > 4.'),
  qc(1, 'pct', { a: '40% of 50', b: '50% of 40' }, 'C', '0.40 × 50 = 20 and 0.50 × 40 = 20. In general a% of b = b% of a, since both equal ab/100.'),
  qc(
    2,
    'coord',
    { given: 'In the xy-plane, point P has coordinates (−3, 4).', a: 'The distance from P to the origin', b: 'The distance from P to the point (3, 0)' },
    'B',
    'To the origin: √(3² + 4²) = 5. To (3, 0): √(6² + 4²) = √52 ≈ 7.2. B is greater.',
  ),
  qc(1, 'lin', { given: '5x − 3 = 2x + 9', a: 'x', b: '3' }, 'A', 'Subtract 2x and add 3: 3x = 12, so x = 4, which is greater than 3.'),
  qc(
    2,
    'stat',
    { given: 'The average (arithmetic mean) of four numbers is 10, and the greatest of the four numbers is 16.', a: 'The least of the four numbers', b: '4' },
    'D',
    'The four numbers total 40, so the other three total 24. They could be 8, 8, 8 (least 8 — A greater) or 0, 8, 16 (least 0 — B greater). Nothing pins the least number down.',
  ),
  ps(
    1,
    'frac',
    'What is the value of 3/4 − 2/3 + 1/6?',
    ['1/4', '1/3', '5/12', '1/2', '7/12'],
    0,
    'Use twelfths: 9/12 − 8/12 + 2/12 = 3/12 = 1/4.',
  ),
  ne(
    1,
    'ratio',
    'If 5 notebooks cost $7.50, how much do 8 of the same notebooks cost?',
    12,
    'One notebook costs 7.50 ÷ 5 = $1.50, so 8 notebooks cost 8 × 1.50 = $12. (Or scale the ratio: 8/5 × 7.50 = 12.)',
    { prefix: '$' },
  ),
  ps(
    2,
    'exp',
    'What is the value of (2⁵ × 3⁴) ÷ 6³?',
    ['6', '12', '18', '24', '36'],
    1,
    '6³ = 2³ × 3³. Divide prime by prime: 2⁵⁻³ × 3⁴⁻³ = 2² × 3 = 12.',
  ),
  ps(
    1,
    'circ',
    'What is the sum of the measures of the interior angles of a hexagon?',
    ['360°', '540°', '720°', '900°', '1,080°'],
    2,
    'A polygon with n sides has interior angles summing to (n − 2) × 180°. For a hexagon, n = 6: 4 × 180° = 720°. (Split it into 4 triangles from one vertex.) (A) is the sum of the exterior angles.',
  ),
  psMulti(
    2,
    'tri',
    'Which of the following could be the lengths of the three sides of a right triangle?\n\nIndicate all such sets of lengths.',
    ['3, 4, 5', '5, 12, 13', '6, 8, 12', '7, 24, 25', '8, 15, 16', '9, 40, 41'],
    [0, 1, 3, 5],
    'Check whether the squares of the two shorter sides add to the square of the longest: 9 + 16 = 25 ✓; 25 + 144 = 169 ✓; 36 + 64 = 100 ≠ 144 ✗; 49 + 576 = 625 ✓; 64 + 225 = 289 ≠ 256 ✗; 81 + 1,600 = 1,681 ✓.',
  ),
  ps(
    2,
    'rate',
    'A faucet can fill a 30-gallon tub in 12 minutes, and the tub’s open drain can empty a full tub in 20 minutes. If the tub starts empty and both the faucet and the drain are open, how many minutes will it take to fill the tub?',
    ['7.5', '12', '20', '30', '32'],
    3,
    'The faucet adds 30 ÷ 12 = 2.5 gallons per minute; the drain removes 30 ÷ 20 = 1.5. The net gain is 1 gallon per minute, so 30 gallons take 30 minutes. (A) adds the drain’s rate instead of subtracting it; (B) and (C) are the faucet’s and the drain’s times alone.',
  ),
  ne(
    2,
    'pct',
    'A jacket that regularly sells for $80 is on sale for 25 percent off. A sales tax of 8 percent is then added to the sale price. What is the total cost of the jacket?',
    64.8,
    'Sale price: 80 × 0.75 = $60. With tax: 60 × 1.08 = $64.80. (Subtracting 25% and adding 8% of the original gives $66.40 — the tax applies to the sale price.)',
    { display: '64.80', prefix: '$' },
  ),
  dataSet('languages', languages, [
    ps(
      1,
      'data',
      'Which language had the greatest percent increase in enrollment from 2021 to 2023?',
      ['Spanish', 'French', 'Mandarin', 'All the same', 'None increased'],
      2,
      'Spanish: 240 → 300, up 60/240 = 25%. French fell. Mandarin: 60 → 110, up 50/60 ≈ 83%. Spanish gained more students, but Mandarin’s percent increase is far larger.',
    ),
    ne(
      1,
      'data',
      'In 2023, enrollment in Spanish was what percent of the total enrollment in the three languages?',
      60,
      'Spanish accounted for 300 of the 500 students enrolled in 2023: 300 ÷ 500 = 0.6, or 60%.',
      { suffix: '%' },
    ),
  ]),
  ps(
    1,
    'int',
    'What is the sum of all the even integers from 2 to 20, inclusive?',
    ['55', '90', '100', '105', '110'],
    4,
    'There are 10 even integers from 2 to 20. Pair them from the outside in: 2 + 20 = 22, 4 + 18 = 22, and so on — 5 pairs of 22 = 110. (A) is the sum of 1 through 10 — half the answer.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

export const Q2H = section(7, 'q2h', [
  qc(2, 'exp', { given: 'n is a positive integer.', a: '(−1)²ⁿ⁺¹', b: '(−1)²ⁿ' }, 'B', '2n is even and 2n + 1 is odd for every integer n. An even power of −1 is 1 and an odd power is −1, so A = −1 and B = 1.'),
  qc(
    3,
    'int',
    { given: 'x and y are positive integers, and x² − y² = 13.', a: 'x', b: '7' },
    'C',
    'Factor: (x − y)(x + y) = 13. Since 13 is prime and x + y > x − y > 0, the factors must be 1 and 13: x − y = 1 and x + y = 13. So x = 7 (and y = 6).',
  ),
  qc(
    3,
    'coord',
    { given: 'In the xy-plane, line k has a positive slope and a positive y-intercept.', a: 'The x-intercept of line k', b: '0' },
    'B',
    'Write the line as y = mx + b with m > 0 and b > 0. Setting y = 0 gives x = −b/m, a positive number divided by a positive number with a minus sign in front — negative. A rising line that crosses the y-axis above the origin crosses the x-axis to the left of it.',
  ),
  qc(
    3,
    'prob',
    {
      given: 'A jar holds 3 red chips and 2 white chips. Two chips are drawn at random, one at a time. In experiment 1, the first chip is put back before the second draw; in experiment 2, it is not.',
      a: 'The probability that both chips are red in experiment 1',
      b: 'The probability that both chips are red in experiment 2',
    },
    'A',
    'With replacement: (3/5)(3/5) = 9/25 = 0.36. Without replacement: (3/5)(2/4) = 6/20 = 0.30. Removing a red chip makes a second red less likely.',
  ),
  qc(
    3,
    'circ',
    { given: 'The radius of circle C is 50 percent greater than the radius of circle D.', a: 'The area of circle C', b: 'Twice the area of circle D' },
    'A',
    'Area scales with the square of the radius: (1.5)² = 2.25, so C’s area is 2.25 times D’s — more than twice. (Thinking a 50% longer radius gives 50% more area is the trap.)',
  ),
  ps(
    3,
    'ratio',
    'If x/y = 3/4 and y/z = 2/5, what is the value of (x + y)/(y + z)?',
    ['2/7', '3/10', '1/2', '7/10', '6/5'],
    2,
    'Pick y = 4: then x = 3 and z = 10 (since y/z = 2/5 means z = 5y/2). (x + y)/(y + z) = 7/14 = 1/2. Any nonzero y gives the same ratio. (B) is x/z.',
  ),
  ne(
    2,
    'pct',
    'The value of an investment increased by 10 percent in its first year and by 20 percent in its second year. By what percent did the value increase over the two years combined?',
    32,
    'Growth factors multiply: 1.10 × 1.20 = 1.32, a 32% increase. Adding 10% + 20% = 30% ignores that the second year’s 20% is earned on the larger value.',
    { suffix: '%' },
  ),
  psMulti(
    3,
    'exp',
    'If 0 < x < 1, which of the following must be greater than x?\n\nIndicate all such expressions.',
    ['x²', '√x', '1/x', 'x³', '2x', '(x + 1)/2'],
    [1, 2, 4, 5],
    'For 0 < x < 1: powers above 1 shrink it (x², x³ < x); √x > x (e.g., √0.25 = 0.5); 1/x > 1 > x; 2x > x because x is positive; (x + 1)/2 is the average of x and 1, so it lies between them and is greater than x.',
  ),
  ps(
    3,
    'circ',
    'In the figure above, O is the center of the circle, and the length of arc AB is 4π. What is the area of the circle?',
    ['40π', '64π', '100π', '144π', '400π'],
    2,
    'Arc AB is 72/360 = 1/5 of the circumference, so the circumference is 5 × 4π = 20π and the radius is 10. Area = π(10²) = 100π. (E) uses 20 as the radius instead of the circumference’s 20π ÷ 2π = 10.',
    { stimulus: { figure: arc } },
  ),
  ps(
    3,
    'fn',
    'The function g is defined by g(x) = x² − 3x for all numbers x. If g(a) = g(5) and a ≠ 5, what is the value of a?',
    ['−2', '−1', '2', '3', '5'],
    0,
    'g(5) = 25 − 15 = 10. Solve a² − 3a = 10: a² − 3a − 10 = 0, (a − 5)(a + 2) = 0, so a = 5 or a = −2. Since a ≠ 5, a = −2. Check: 4 + 6 = 10 ✓.',
  ),
  ne(
    2,
    'prob',
    'A club with 10 members will choose a president, a vice president, and a treasurer. No member can hold more than one office. In how many different ways can the three offices be filled?',
    720,
    'Order matters — the offices are different. 10 choices for president, then 9 for vice president, then 8 for treasurer: 10 × 9 × 8 = 720. (C(10, 3) = 120 would count only which three people are chosen.)',
  ),
  ps(
    3,
    'stat',
    'The numbers of books read last summer by 11 students were 2, 3, 3, 4, 5, 6, 7, 8, 9, 12, and 15. What is the interquartile range of these numbers?',
    ['3', '4', '4.5', '5', '6'],
    4,
    'The median is the 6th value, 6. The lower half (2, 3, 3, 4, 5) has median Q1 = 3; the upper half (7, 8, 9, 12, 15) has median Q3 = 9. IQR = Q3 − Q1 = 9 − 3 = 6. (A) is Q1 alone.',
  ),
  ps(
    2,
    'quad',
    'The length of a rectangle is 3 more than its width, and its area is 40. What is the perimeter of the rectangle?',
    ['13', '22', '26', '28', '40'],
    2,
    'w(w + 3) = 40 → w² + 3w − 40 = 0 → (w + 8)(w − 5) = 0, so w = 5 (a width can’t be −8). The rectangle is 5 by 8, with perimeter 2(5 + 8) = 26. (A) forgets to double.',
  ),
  ne(
    2,
    'rate',
    'A cyclist rides at a constant speed of 18 kilometers per hour. How many meters does she travel in 40 seconds?',
    200,
    '18 km per hour = 18,000 m per 3,600 s = 5 m per second. In 40 seconds: 5 × 40 = 200 meters.',
    { suffix: 'meters' },
  ),
  ps(
    2,
    'circ',
    'A cube has a total surface area of 150 square inches. What is the volume of the cube, in cubic inches?',
    ['25', '75', '125', '150', '216'],
    2,
    'A cube has 6 equal square faces: each is 150 ÷ 6 = 25, so an edge is 5 and the volume is 5³ = 125. (A) is the area of one face.',
  ),
]);
