// Practice Test 10 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

// Right triangle with legs CA = 3 (vertical) and CB = 6 (horizontal), drawn
// at 35 px per unit, with the inscribed square of side 2 in the right-angle
// corner; its fourth corner (110, 100) lies on AB.
const inscribed = fig(290, 210, [
  g.poly(
    [
      [40, 170],
      [110, 170],
      [110, 100],
      [40, 100],
    ],
    '#d5dae0',
  ),
  g.poly([
    [40, 65],
    [250, 170],
    [40, 170],
  ]),
  g.text([32, 62], 'A', 'end'),
  g.text([258, 176], 'B', 'start'),
  g.text([32, 186], 'C', 'end'),
  g.text([26, 122], '3', 'end', true),
  g.text([145, 192], '6', 'middle', true),
]);

// ---------------------------------------------------------------- Section 1

const park = {
  charts: [
    {
      type: 'line' as const,
      title: 'Visitors to Lake Park, 2017–2022',
      categories: ['2017', '2018', '2019', '2020', '2021', '2022'],
      series: [{ name: 'Visitors (thousands)', values: [320, 350, 370, 180, 300, 400] }],
      yLabel: 'Visitors (thousands)',
      yMax: 450,
      yStep: 50,
      showValues: true,
    },
  ],
};

export const Q1 = section(10, 'q1', [
  qc(1, 'frac', { a: '2/3 of 3/4', b: '1/2' }, 'C', '2/3 × 3/4 = 6/12 = 1/2. (The 3s cancel: 2/4.)'),
  qc(
    2,
    'lin',
    { given: '2a + 3b = 12, where a and b are positive numbers.', a: 'a', b: '6' },
    'B',
    'Since b > 0, 3b > 0, so 2a = 12 − 3b < 12 and a < 6. (a reaches 6 only if b = 0, which isn’t allowed.)',
  ),
  qc(
    2,
    'exp',
    { a: '(√3 + √12)²', b: '27' },
    'C',
    '√12 = √4 × √3 = 2√3, so √3 + √12 = 3√3, and (3√3)² = 9 × 3 = 27. (Squaring term by term — 3 + 12 = 15 — is the trap.)',
  ),
  qc(
    3,
    'stat',
    { given: 'The range of the numbers in list M is 12, and the range of the numbers in list N is 9.', a: 'The range of the numbers in M and N combined into one list', b: '12' },
    'D',
    'Combining can only stretch the spread, so the combined range is at least 12. It equals 12 if N’s numbers lie within M’s (M: 0 to 12, N: 1 to 10) but can be larger (M: 0 to 12, N: 20 to 29 gives range 29).',
  ),
  ps(
    1,
    'int',
    'Which of the following is the prime factorization of 180?',
    ['2 × 3 × 30', '2² × 3² × 5', '2² × 45', '2 × 3² × 10', '2³ × 3 × 5'],
    1,
    '180 = 4 × 45 = 2² × 9 × 5 = 2² × 3² × 5. The other choices either contain non-primes (30, 45, 10) or multiply to something else (2³ × 3 × 5 = 120).',
  ),
  dataSet('park', park, [
    ps(
      1,
      'data',
      'Between which two consecutive years did the number of visitors change by the greatest amount?',
      ['2017 and 2018', '2018 and 2019', '2019 and 2020', '2020 and 2021', '2021 and 2022'],
      2,
      'Changes (thousands): +30, +20, −190, +120, +100. The largest change, of either sign, is the drop of 190 thousand from 2019 to 2020.',
    ),
    ne(
      2,
      'data',
      'What was the average (arithmetic mean) number of visitors per year, in thousands, for the six years shown?',
      320,
      'Total: 320 + 350 + 370 + 180 + 300 + 400 = 1,920 thousand. 1,920 ÷ 6 = 320 thousand visitors per year.',
      { suffix: 'thousand' },
    ),
    psMulti(
      3,
      'data',
      'In which years was the number of visitors greater than the average number of visitors per year for the six years shown?\n\nIndicate all such years.',
      ['2017', '2018', '2019', '2020', '2021', '2022'],
      [1, 2, 5],
      'The six-year average is 320 thousand. Greater than 320: 2018 (350), 2019 (370), and 2022 (400). 2017 equals the average exactly, so it is not greater; 2020 and 2021 are below.',
    ),
  ]),
  ps(
    2,
    'pct',
    'In an election, candidate A received 55 percent of the 18,000 votes cast, and candidate B received all the rest. By how many votes did candidate A win?',
    ['900', '1,800', '2,700', '8,100', '9,900'],
    1,
    'A got 55% and B got 45%, a margin of 10 percentage points. 10% of 18,000 = 1,800 votes. (Check: 9,900 − 8,100 = 1,800.)',
  ),
  ne(
    2,
    'tri',
    'The sides of a triangle have lengths 7, 24, and 25. What is the area of the triangle?',
    84,
    '7² + 24² = 49 + 576 = 625 = 25², so this is a right triangle with legs 7 and 24. Area = (1/2)(7)(24) = 84.',
  ),
  psMulti(
    3,
    'exp',
    'If n is a positive integer, which of the following must be an integer?\n\nIndicate all such expressions.',
    ['√(4n²)', '(n² + n)/2', '(n + 1)/2', '2ⁿ⁻¹', '√n', 'n/(n + 1)'],
    [0, 1, 3],
    '√(4n²) = 2n ✓. (n² + n)/2 = n(n + 1)/2, and one of two consecutive integers is even ✓. 2ⁿ⁻¹ is 1, 2, 4, … ✓. But (n + 1)/2 fails for even n, √n fails for n = 2, and n/(n + 1) is always a fraction between 0 and 1.',
  ),
  ps(
    3,
    'prob',
    'Two different numbers are chosen at random from the set {1, 2, 3, 4, 5, 6}. What is the probability that their product is greater than their sum?',
    ['1/3', '1/2', '3/5', '2/3', '5/6'],
    3,
    'There are C(6, 2) = 15 pairs. If one number is 1, the product equals the other number, which is less than the sum — 5 pairs fail. Any pair from {2, …, 6} works (the smallest, 2 and 3: 6 > 5). So 10/15 = 2/3.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const grads = {
  charts: [
    {
      type: 'pie' as const,
      title: 'Fields of Study of 1,200 Graduate Students',
      categories: ['Engineering', 'Sciences', 'Business', 'Humanities', 'Other'],
      series: [{ name: 'Share', values: [30, 25, 20, 15, 10] }],
      unit: '%',
    },
  ],
};

export const Q2E = section(10, 'q2e', [
  qc(1, 'int', { a: 'The number of even integers from 1 to 25, inclusive', b: 'The number of odd integers from 1 to 25, inclusive' }, 'B', 'From 1 to 25 there are 25 integers. Starting and ending with an odd number, there is one more odd than even: 13 odd and 12 even.'),
  qc(1, 'pct', { a: 'The price of a $50 item after a 10 percent discount', b: '$44' }, 'A', '10% of $50 is $5, so the discounted price is $45, which is more than $44.'),
  qc(
    2,
    'coord',
    { given: 'In the xy-plane, P = (4, 3) and Q = (−4, −3).', a: 'The slope of the line through P and Q', b: '3/4' },
    'C',
    'Slope = (3 − (−3)) ÷ (4 − (−4)) = 6/8 = 3/4. (P and Q are reflections of each other through the origin, so the line passes through (0, 0) with slope 3/4.)',
  ),
  qc(
    2,
    'tri',
    { given: 'In triangle PQR, the measure of angle P is 30° and the measure of angle Q is 60°.', a: 'The measure of angle R', b: 'The sum of the measures of angles P and Q' },
    'C',
    'Angle R = 180° − 30° − 60° = 90°, and P + Q = 90° as well. (In any triangle, the third angle is 180° minus the other two; here that happens to equal their sum.)',
  ),
  qc(
    2,
    'stat',
    { given: 'List L: 2, 4, 6, 8, 20', a: 'The average (arithmetic mean) of list L', b: 'The median of list L' },
    'A',
    'Mean = 40 ÷ 5 = 8; median = 6 (the middle value). The large value 20 pulls the mean up but not the median.',
  ),
  ps(
    1,
    'lin',
    'If 5x − 7 = 3x + 9, what is the value of 2x?',
    ['8', '12', '16', '18', '32'],
    2,
    'Subtract 3x and add 7: 2x = 16. The question asks for 2x, so stop there. (A) is x.',
  ),
  ne(
    1,
    'ratio',
    'A car’s fuel tank holds 12 gallons, and the car travels 32 miles per gallon. How many miles can the car travel on 3/4 of a tank of fuel?',
    288,
    '3/4 of 12 gallons is 9 gallons, and 9 × 32 = 288 miles.',
    { suffix: 'miles' },
  ),
  ps(
    1,
    'frac',
    'What is 1.25 expressed as a fraction in lowest terms?',
    ['1/4', '5/4', '25/20', '125/10', '4/5'],
    1,
    '1.25 = 125/100 = 5/4 after dividing top and bottom by 25. (C) equals 1.25 too but isn’t in lowest terms; (D) is 12.5.',
  ),
  ps(
    1,
    'circ',
    'A regular pentagon and a regular hexagon each have a perimeter of 60. How much longer is a side of the pentagon than a side of the hexagon?',
    ['0.5', '1', '1.2', '2', '10'],
    3,
    'Pentagon: 60 ÷ 5 = 12 per side. Hexagon: 60 ÷ 6 = 10 per side. The difference is 2.',
  ),
  psMulti(
    2,
    'frac',
    'Which of the following fractions are greater than 0.6?\n\nIndicate all such fractions.',
    ['4/7', '5/9', '7/11', '9/16', '11/18', '13/21'],
    [2, 4, 5],
    'Compare with 3/5 by cross-multiplying (a/b > 3/5 exactly when 5a > 3b): 4/7: 20 < 21 ✗; 5/9: 25 < 27 ✗; 7/11: 35 > 33 ✓; 9/16: 45 < 48 ✗; 11/18: 55 > 54 ✓; 13/21: 65 > 63 ✓.',
  ),
  ps(
    1,
    'rate',
    'A plane flies 1,200 miles in 2 hours and 30 minutes. What is its average speed, in miles per hour?',
    ['480', '500', '521.7', '550', '600'],
    0,
    '2 hours 30 minutes is 2.5 hours, not 2.3. 1,200 ÷ 2.5 = 480 miles per hour. (C) treats 2 hours 30 minutes as 2.3 hours; (E) ignores the 30 minutes.',
  ),
  ne(
    2,
    'pct',
    'Maria deposits $2,000 in an account that pays 3 percent simple annual interest. How much interest, in dollars, will the account earn in 4 years?',
    240,
    'Simple interest is the same each year: 3% of $2,000 = $60 per year, so 4 years earn 4 × 60 = $240.',
    { prefix: '$' },
  ),
  dataSet('grads', grads, [
    ps(
      1,
      'data',
      'How many of the graduate students study business?',
      ['60', '120', '150', '200', '240'],
      4,
      'Business is 20% of 1,200 students: 0.20 × 1,200 = 240.',
    ),
    ne(
      2,
      'data',
      'How many more of the graduate students study engineering than study humanities?',
      180,
      'Engineering 30% and humanities 15% differ by 15 percentage points: 0.15 × 1,200 = 180 students. (Or 360 − 180 = 180.)',
      { suffix: 'students' },
    ),
  ]),
  ps(
    2,
    'exp',
    'What is the value of 16^(3/4)?',
    ['8', '12', '24', '32', '64'],
    0,
    'Take the fourth root first, then cube: 16^(1/4) = 2, and 2³ = 8. (E) is 16^(3/2) — a square root where a fourth root belongs; (B) multiplies 16 by 3/4.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

export const Q2H = section(10, 'q2h', [
  qc(
    3,
    'exp',
    { given: 'x > 1', a: '√x', b: 'x/2' },
    'D',
    'At x = 4: √4 = 2 and 4/2 = 2 — equal. At x = 2: √2 ≈ 1.41 > 1. At x = 9: 3 < 4.5. The comparison changes with x.',
  ),
  qc(
    2,
    'int',
    { given: 'x is the number of positive divisors of 36, and y is the number of positive divisors of 64.', a: 'x', b: 'y' },
    'A',
    '36 = 2² × 3², so it has (2 + 1)(2 + 1) = 9 divisors. 64 = 2⁶, so it has 6 + 1 = 7. 9 > 7 — even though 64 is the larger number.',
  ),
  qc(
    2,
    'coord',
    { given: 'In the xy-plane, the lines y = 2x + 3 and y = −x + 9 intersect at the point (p, q).', a: 'p', b: 'q' },
    'B',
    'At the intersection the y-values match: 2p + 3 = −p + 9, so p = 2 and q = 7. 2 < 7.',
  ),
  qc(
    3,
    'prob',
    { given: 'One number is chosen at random from {1, 2, 3, 4}, and one number is chosen at random from {1, 2, 3, 4, 5, 6}.', a: 'The probability that the two numbers are equal', b: '1/6' },
    'C',
    'There are 4 × 6 = 24 equally likely pairs. Equal pairs: (1,1), (2,2), (3,3), (4,4) — 4 of them. 4/24 = 1/6. (Equivalently: whatever the first number is, the second matches it with probability 1/6.)',
  ),
  qc(
    2,
    'circ',
    { given: 'A right circular cylinder has radius 2 and height 8. A cube has edges of length 4.', a: 'The volume of the cylinder', b: 'The volume of the cube' },
    'A',
    'Cylinder: π(2²)(8) = 32π ≈ 100.5. Cube: 4³ = 64. The cylinder is larger.',
  ),
  ps(
    2,
    'ratio',
    'Machines A and B produce bolts at rates in the ratio 5 : 3. Working together, they produce 960 bolts in 4 hours. How many bolts does machine A produce per hour?',
    ['150', '180', '240', '480', '600'],
    0,
    'Together they make 960 ÷ 4 = 240 bolts per hour. A’s share is 5/8 of that: 150 bolts per hour (B makes 90). (C) is the two machines together; (E) is A’s total over the 4 hours.',
  ),
  ne(
    2,
    'stat',
    'The average (arithmetic mean) of 6 numbers is 15. If the average of the 3 smallest numbers is 10, what is the average of the 3 largest numbers?',
    20,
    'Work with sums: all six total 6 × 15 = 90; the three smallest total 30; so the three largest total 60, an average of 20.',
  ),
  psMulti(
    3,
    'lin',
    'A shop sells pens for $3 each and notebooks for $5 each. Which of the following could be the total cost of a purchase that includes at least one pen and at least one notebook?\n\nIndicate all such totals.',
    ['$8', '$10', '$12', '$13', '$15', '$21'],
    [0, 3, 5],
    'Totals have the form 3p + 5n with p ≥ 1 and n ≥ 1. $8 = 3 + 5 ✓. $13 = 3 + 10 ✓. $21 = 6 + 15 ✓. $10 would need 0 pens, $15 would need 0 notebooks or 0 pens, and $12 can’t be made (12 − 5 = 7 and 12 − 10 = 2 aren’t multiples of 3).',
  ),
  ps(
    3,
    'tri',
    'In the figure above, triangle ABC has a right angle at C, with CA = 3 and CB = 6. A square is drawn inside the triangle with two of its sides along CA and CB and one vertex on AB. What is the length of a side of the square?',
    ['1', '1.5', '1.8', '2', '2.5'],
    3,
    'Put C at the origin, B at (6, 0), and A at (0, 3). Side AB is the line y = 3 − x/2. The square’s far corner is (s, s), so s = 3 − s/2, giving s = 2. (Shortcut: s = ab/(a + b) = 18/9 = 2.)',
    { stimulus: { figure: inscribed } },
  ),
  ps(
    3,
    'fn',
    'The function h is defined by h(x) = ax + b, where a and b are constants. If h(2) = 7 and h(h(2)) = 22, what is the value of h(0)?',
    ['−2', '1', '3', '4', '7'],
    1,
    'h(h(2)) = h(7) = 22. So 2a + b = 7 and 7a + b = 22. Subtracting, 5a = 15, a = 3, and b = 1. h(0) = b = 1. (C) is a.',
  ),
  ne(
    3,
    'prob',
    'A password consists of 2 letters followed by 2 digits. The letters are chosen from A, B, C, D, and E, and may repeat; the digits are chosen from 0 through 9, and the two digits must be different. How many different passwords are possible?',
    2250,
    'Letters: 5 × 5 = 25 ways (repeats allowed). Digits: 10 × 9 = 90 ways (no repeat). Multiply the independent choices: 25 × 90 = 2,250.',
    { display: '2,250' },
  ),
  ps(
    3,
    'rate',
    'A tank is being filled at a constant rate. At 2:00 p.m. it is 1/4 full, and at 2:45 p.m. it is 2/3 full. At what time will the tank be full?',
    ['3:15 p.m.', '3:21 p.m.', '3:30 p.m.', '3:36 p.m.', '4:00 p.m.'],
    1,
    'In 45 minutes the tank gains 2/3 − 1/4 = 5/12, so 1/12 takes 9 minutes. The remaining 1/3 = 4/12 takes 36 minutes after 2:45: 3:21 p.m. (D) adds 36 minutes to 3:00.',
  ),
  ps(
    3,
    'int',
    'What is the least positive integer n such that 150n is the square of an integer?',
    ['2', '3', '4', '5', '6'],
    4,
    '150 = 2 × 3 × 5². In a perfect square every prime appears an even number of times, so n must supply one more 2 and one more 3: n = 6, and 150 × 6 = 900 = 30².',
  ),
  ne(
    2,
    'quad',
    'If (x + 3)(x − 3) = 40, what is the value of x²?',
    49,
    'The left side is a difference of squares: x² − 9 = 40, so x² = 49. No need to find x (which could be 7 or −7).',
  ),
  ps(
    2,
    'circ',
    'A cylindrical can has a radius of 3 inches and a height of 10 inches. A paper label covers the entire curved side of the can, with no overlap. What is the area of the label, in square inches?',
    ['30π', '60π', '90π', '120π', '180π'],
    1,
    'Unrolled, the label is a rectangle whose width is the can’s circumference, 2π(3) = 6π, and whose height is 10. Area = 60π. (C) is the volume; (A) uses πr instead of 2πr.',
  ),
]);
