// Practice Test 5 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

const squareTriangle = fig(250, 240, [
  g.poly([
    [40, 40],
    [200, 40],
    [200, 200],
    [40, 200],
  ]),
  g.poly(
    [
      [40, 40],
      [200, 120],
      [120, 200],
    ],
    '#d5dae0',
  ),
  g.text([32, 36], 'A', 'end'),
  g.text([208, 36], 'B', 'start'),
  g.text([208, 216], 'C', 'start'),
  g.text([32, 216], 'D', 'end'),
  g.text([212, 125], 'E', 'start'),
  g.text([120, 220], 'F'),
  g.text([120, 30], '4', 'middle', true),
]);

// ---------------------------------------------------------------- Section 1

const library = {
  table: {
    caption: 'Books Checked Out at Four Library Branches in 2023, by Type',
    columns: ['Branch', 'Fiction', 'Nonfiction', 'Children’s', 'Total'],
    rows: [
      ['Central', '4,200', '3,100', '2,700', '10,000'],
      ['East', '1,800', '900', '1,300', '4,000'],
      ['North', '2,500', '1,500', '2,000', '6,000'],
      ['West', '1,500', '1,200', '1,300', '4,000'],
      ['All branches', '10,000', '6,700', '7,300', '24,000'],
    ],
  },
};

export const Q1 = section(5, 'q1', [
  qc(
    1,
    'int',
    { a: 'The number of prime numbers less than 20', b: '8' },
    'C',
    'The primes less than 20 are 2, 3, 5, 7, 11, 13, 17, 19 — eight of them. (Remember 2 is prime and 1 is not.)',
  ),
  qc(
    2,
    'pct',
    { given: 'The price of item P is 25 percent greater than the price of item Q.', a: 'The price of Q as a percent of the price of P', b: '75%' },
    'A',
    'Let Q = 100, so P = 125. Then Q/P = 100/125 = 80%, which is greater than 75%. “25% more” does not reverse to “25% less” — the base changes.',
  ),
  qc(
    2,
    'coord',
    { given: 'The point (a, b) lies on the line y = 2x + 1, and a > 0.', a: 'b', b: '1' },
    'A',
    'On the line, b = 2a + 1. Since a > 0, 2a > 0, so b > 1.',
  ),
  qc(
    3,
    'stat',
    { given: 'The average (arithmetic mean) of five different positive integers is 6.', a: 'The median of the five integers', b: '6' },
    'D',
    'The integers sum to 30. They could be 2, 4, 6, 8, 10 (median 6 — equal), or 1, 2, 3, 4, 20 (median 3 — B greater), or 1, 2, 7, 9, 11 (median 7 — A greater). Mean and median needn’t match → D.',
  ),
  ps(
    1,
    'frac',
    'Which of the following is greatest?',
    ['3/5', '5/8', '7/12', '11/20', '2/3'],
    4,
    'As decimals: 3/5 = 0.6, 5/8 = 0.625, 7/12 ≈ 0.583, 11/20 = 0.55, 2/3 ≈ 0.667. The greatest is 2/3. (Each is also “1 minus something”: 2/3 = 1 − 1/3 leaves the least out.)',
  ),
  dataSet('library', library, [
    ps(
      1,
      'data',
      'At which branch were children’s books the greatest percent of that branch’s total checkouts?',
      ['Central', 'East', 'North', 'West', 'East and West equally'],
      2,
      'Children’s share of each branch’s total: Central 2,700/10,000 = 27%; East 1,300/4,000 = 32.5%; North 2,000/6,000 ≈ 33.3%; West 1,300/4,000 = 32.5%. North is highest. East and West tie with each other, but below North.',
    ),
    ne(
      2,
      'data',
      'Nonfiction checkouts at the North branch were what percent of all nonfiction checkouts at the four branches, to the nearest whole percent?',
      22,
      'North nonfiction ÷ all nonfiction = 1,500/6,700 ≈ 0.224 = 22%. Dividing by North’s own total (1,500/6,000 = 25%) answers a different question — read which total the question names.',
      { roundTo: 1, suffix: '%' },
    ),
    psMulti(
      3,
      'data',
      'For which branches was the ratio of fiction checkouts to nonfiction checkouts greater than 1.5?\n\nIndicate all such branches.',
      ['Central', 'East', 'North', 'West'],
      [1, 2],
      'Central: 4,200/3,100 ≈ 1.35 ✗. East: 1,800/900 = 2 ✓. North: 2,500/1,500 ≈ 1.67 ✓. West: 1,500/1,200 = 1.25 ✗. A quick check without dividing: is fiction more than 1.5 × nonfiction? East 1,800 > 1,350 ✓; North 2,500 > 2,250 ✓.',
    ),
  ]),
  ps(
    2,
    'quad',
    'If (x − 2)(x + 5) = 0 and x > 0, what is the value of 3x² − x?',
    ['10', '14', '20', '70', '80'],
    0,
    'The roots are x = 2 and x = −5; with x > 0, x = 2. Then 3(4) − 2 = 10. (E) uses x = −5: 3(25) − (−5) = 80 — check the condition before substituting.',
  ),
  ne(
    3,
    'tri',
    'A right triangle has a perimeter of 30, and one of its legs has length 5. What is the length of the hypotenuse?',
    13,
    'Call the other leg b and the hypotenuse c. Perimeter: 5 + b + c = 30, so c = 25 − b. Pythagorean theorem: 25 + b² = (25 − b)² = 625 − 50b + b², so 50b = 600, b = 12 and c = 13. (A 5-12-13 triangle.)',
  ),
  ps(
    2,
    'rate',
    'A printer prints 12 pages every 30 seconds. At this rate, how many minutes will it take to print 300 pages?',
    ['12.5', '15', '20', '25', '30'],
    0,
    '12 pages per half minute = 24 pages per minute. 300/24 = 12.5 minutes. (D) forgets to convert 30 seconds into half a minute.',
  ),
  ps(
    2,
    'exp',
    'If x and y are positive integers and 2ˣ · 3ʸ = 648, what is the value of x + y?',
    ['5', '6', '7', '8', '9'],
    2,
    'Prime-factorize 648: 648 = 8 × 81 = 2³ × 3⁴. Prime factorizations are unique, so x = 3 and y = 4, and x + y = 7.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

const service = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Employees of Firm F by Years of Service (100 employees)',
      categories: ['0–4', '5–9', '10–14', '15–19', '20+'],
      series: [{ name: 'Employees', values: [30, 45, 15, 6, 4] }],
      xLabel: 'Years of service',
      yLabel: 'Number of employees',
      yMax: 50,
      yStep: 10,
      showValues: true,
    },
  ],
};

export const Q2H = section(5, 'q2h', [
  qc(
    2,
    'exp',
    { a: '2⁻³', b: '(−2)⁻³' },
    'A',
    'A negative exponent means reciprocal: 2⁻³ = 1/2³ = 1/8, while (−2)⁻³ = 1/(−2)³ = −1/8. Positive > negative. A negative exponent never makes a positive base negative.',
  ),
  qc(
    2,
    'circ',
    { given: 'Circle C has area 16π. Square S has a diagonal of length 8.', a: 'The area of circle C', b: 'The area of square S' },
    'A',
    'Circle: 16π ≈ 50.3. Square with diagonal d has area d²/2 = 64/2 = 32. 50.3 > 32. (A circle of radius 4 and the square inscribed in it — the circle is always bigger.)',
  ),
  qc(
    3,
    'prob',
    { given: 'A group has 6 people.', a: 'The number of different 2-person committees that can be chosen from the group', b: 'The number of different 4-person committees that can be chosen from the group' },
    'C',
    'C(6, 2) = 15 and C(6, 4) = 15. Choosing 2 people to serve is the same as choosing the 4 who don’t — every 2-person committee pairs with exactly one 4-person complement.',
  ),
  qc(
    3,
    'lin',
    { given: '−3 ≤ x ≤ 2 and −1 ≤ y ≤ 4', a: 'The greatest possible value of x − y', b: '4' },
    'B',
    'To maximize x − y, make x as large as possible and y as small as possible: 2 − (−1) = 3. So the greatest possible value is 3 < 4. (Using x = 2 and y = 4, or x = −3, gives smaller values.)',
  ),
  qc(
    3,
    'quad',
    { given: 'k > 0, and the equation x² + kx + 9 = 0 has two different real solutions.', a: 'k', b: '6' },
    'A',
    'Two different real solutions require the discriminant to be positive: k² − 4(1)(9) > 0, so k² > 36. With k > 0, k > 6. (k = 6 would give exactly one solution, x = −3.)',
  ),
  ps(
    2,
    'exp',
    'A population of bacteria doubles every 3 hours. If there are 500 bacteria at noon, how many will there be at 9:00 p.m. the same day?',
    ['1,000', '1,500', '2,000', '3,000', '4,000'],
    4,
    'Noon to 9:00 p.m. is 9 hours = 3 doubling periods: 500 × 2³ = 4,000. (B) adds 500 each period instead of doubling; (C) counts only two doublings.',
  ),
  ne(
    2,
    'stat',
    'Set S consists of 5 numbers with an average (arithmetic mean) of 12. Set T consists of 7 numbers with an average of 18. What is the average of the 12 numbers in the two sets combined?',
    15.5,
    'Combine sums, not averages: 5 × 12 = 60 and 7 × 18 = 126, total 186 over 12 numbers = 15.5. Averaging 12 and 18 (15) ignores that T has more numbers.',
  ),
  psMulti(
    3,
    'coord',
    'In the xy-plane, a circle lies in the first quadrant, is tangent to both the x-axis and the y-axis, and passes through the point (8, 9). Which of the following could be the radius of the circle?\n\nIndicate all such values.',
    ['5', '9', '12', '17', '29'],
    [0, 4],
    'Tangent to both axes in the first quadrant → center (r, r) and radius r. The point (8, 9) is at distance r from the center: (8 − r)² + (9 − r)² = r². Expanding: r² − 34r + 145 = 0 = (r − 5)(r − 29). Both work: a small circle hugging the corner, and a large one.',
  ),
  ps(
    3,
    'tri',
    'In the figure above, ABCD is a square with sides of length 4, E is the midpoint of side BC, and F is the midpoint of side CD. What is the area of the shaded triangle AEF?',
    ['3', '4', '4.5', '5', '6'],
    4,
    'Subtract the three unshaded right triangles from the square (area 16). ABE: ½ × 4 × 2 = 4. ECF: ½ × 2 × 2 = 2. ADF: ½ × 4 × 2 = 4. Shaded: 16 − 4 − 2 − 4 = 6.',
    { stimulus: { figure: squareTriangle } },
  ),
  psMulti(
    3,
    'int',
    'Which of the following integers have exactly 4 positive divisors?\n\nIndicate all such integers.',
    ['6', '8', '9', '12', '16', '21'],
    [0, 1, 5],
    'A number has exactly 4 divisors when it is p × q (two different primes) or p³. 6 = 2 × 3 ✓ (1, 2, 3, 6). 8 = 2³ ✓ (1, 2, 4, 8). 21 = 3 × 7 ✓. 9 = 3² has 3 divisors; 12 = 2² × 3 has 6; 16 = 2⁴ has 5.',
  ),
  ps(
    3,
    'prob',
    'How many different arrangements of the letters in the word ARRANGE are possible?',
    ['630', '720', '1,260', '2,520', '5,040'],
    2,
    'ARRANGE has 7 letters, with A twice and R twice. Arrangements: 7!/(2! × 2!) = 5,040/4 = 1,260. (E) treats all letters as different; (D) corrects for only one repeated letter.',
  ),
  ps(
    2,
    'fn',
    'If f(x) = x² + 1 and g(x) = 3x − 2, what is the value of f(g(2)) − g(f(2))?',
    ['−8', '−4', '0', '2', '4'],
    4,
    'Work inside out. g(2) = 4, so f(g(2)) = 16 + 1 = 17. f(2) = 5, so g(f(2)) = 15 − 2 = 13. Difference: 17 − 13 = 4. Composition isn’t commutative — the order matters.',
  ),
  ps(
    2,
    'rate',
    'Machine A produces 60 widgets per hour and machine B produces 40 widgets per hour. Machine A starts at 8:00 a.m., and machine B starts at 10:00 a.m. If both run continuously after starting, at what time will they have produced a combined total of 520 widgets?',
    ['12:00 noon', '1:00 p.m.', '1:12 p.m.', '2:00 p.m.', '3:00 p.m.'],
    3,
    'By 10:00 a.m., A alone has made 2 × 60 = 120. The remaining 400 come at 60 + 40 = 100 per hour: 4 more hours → 2:00 p.m. (C) divides all 520 by 100 and starts at 8:00 — forgetting B’s late start.',
  ),
  ne(
    3,
    'prob',
    'Two different cards are drawn at random from five cards numbered 1, 2, 3, 4, and 5. What is the probability that the sum of the two numbers drawn is even?',
    2 / 5,
    'There are C(5, 2) = 10 equally likely pairs. The sum is even when both are odd (from 1, 3, 5: C(3, 2) = 3 pairs) or both even (2 and 4: 1 pair). 4/10 = 2/5. The coin-flip intuition of 1/2 fails because there are more odd cards than even ones.',
    { fraction: true, display: '2/5' },
  ),
  ps(
    2,
    'stat',
    'The graph above shows the years of service of the 100 employees of Firm F. In which category does the median years of service fall?',
    ['0–4', '5–9', '10–14', '15–19', '20+'],
    1,
    'The median of 100 values is the average of the 50th and 51st. Counting up: 0–4 holds employees 1–30, and 5–9 holds 31–75. Both the 50th and 51st fall in 5–9. (The category with the middle label, 10–14, is the trap.)',
    { stimulus: service },
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const day = {
  charts: [
    {
      type: 'pie' as const,
      title: 'How Maya Spends a 24-Hour Weekday (hours)',
      categories: ['Sleep', 'School', 'Homework', 'Leisure', 'Other'],
      series: [{ name: 'Hours', values: [8, 7, 3, 4, 2] }],
      unit: ' h',
    },
  ],
};

export const Q2E = section(5, 'q2e', [
  qc(1, 'frac', { a: '1/2 + 1/3', b: '5/6' }, 'C', 'Common denominator 6: 3/6 + 2/6 = 5/6. Equal.'),
  qc(1, 'exp', { given: 'x = −2', a: 'x²', b: 'x³' }, 'A', 'x² = (−2)² = 4 and x³ = (−2)³ = −8. Even powers of a negative number are positive; odd powers stay negative.'),
  qc(
    2,
    'circ',
    { given: 'A circle has radius 3.', a: 'The circumference of the circle', b: '18' },
    'A',
    'Circumference = 2πr = 6π ≈ 6 × 3.14 = 18.84, which is greater than 18. (Using π ≈ 3 gives exactly 18 — too rough here.)',
  ),
  qc(
    1,
    'lin',
    { given: 'Jill is 3 years older than Kate. Kate is 5 years younger than Maria.', a: 'Jill’s age', b: 'Maria’s age' },
    'B',
    'Write everything in terms of Kate: Jill = Kate + 3, Maria = Kate + 5. Maria is 2 years older than Jill.',
  ),
  qc(
    2,
    'int',
    { given: 'm and n are integers, and m > n.', a: 'm − n', b: '1' },
    'D',
    'm − n is a positive integer, so it is at least 1. It could equal 1 (m = 5, n = 4) or be larger (m = 5, n = 1). Equal in some cases, greater in others → D.',
  ),
  ps(
    1,
    'pct',
    'If 40 percent of a number is 18, what is 60 percent of the number?',
    ['27', '30', '36', '45', '72'],
    0,
    '40% is 18, so 20% is 9 and 60% is 27. (Or: the number is 18/0.4 = 45, and 0.6 × 45 = 27.) (D) is the number itself.',
  ),
  ne(1, 'lin', 'If 3(x + 4) = 33, what is the value of x?', 7, 'Divide by 3: x + 4 = 11. Subtract 4: x = 7. Check: 3 × 11 = 33 ✓.'),
  ps(
    1,
    'circ',
    'A rectangle has a perimeter of 36 and a length of 12. What is its area?',
    ['24', '36', '48', '60', '72'],
    4,
    'Perimeter 36 = 2(12 + w), so 12 + w = 18 and w = 6. Area = 12 × 6 = 72.',
  ),
  ps(
    2,
    'quad',
    'If a = 3 and b = −4, what is the value of a² − 2ab + b²?',
    ['1', '7', '25', '49', '73'],
    3,
    'a² − 2ab + b² = (a − b)² = (3 − (−4))² = 7² = 49. Plugging in directly: 9 − 2(3)(−4) + 16 = 9 + 24 + 16 = 49. (A) computes (a + b)².',
  ),
  ne(
    2,
    'pct',
    'The population of a town grew from 8,000 to 9,200. By what percent did the population increase?',
    15,
    'Increase: 1,200. As a percent of the original: 1,200/8,000 = 0.15 = 15%.',
    { suffix: '%' },
  ),
  ps(
    2,
    'ratio',
    'In a class of 28 students, the ratio of students who own a pet to students who do not is 4 to 3. How many students in the class own a pet?',
    ['16', '18', '20', '21', '24'],
    0,
    '4 + 3 = 7 parts make 28 students, so each part is 4 students. Pet owners: 4 parts = 16.',
  ),
  ps(
    2,
    'circ',
    'A semicircle has a diameter of 10. What is the perimeter of the semicircle, including the diameter?',
    ['5π', '5π + 10', '10π', '25π/2', '10π + 10'],
    1,
    'The curved part is half the circumference: ½ × π × 10 = 5π. Add the straight diameter: 5π + 10. (A) forgets the diameter; (C) uses the full circumference.',
  ),
  psMulti(
    2,
    'stat',
    'For which of the following lists is the median greater than the average (arithmetic mean)?\n\nIndicate all such lists.',
    ['1, 2, 3, 4, 100', '1, 8, 9, 10', '5, 5, 5', '2, 9, 10', '3, 4, 5, 6'],
    [1, 3],
    '1, 2, 3, 4, 100: median 3, mean 22 ✗. 1, 8, 9, 10: median 8.5, mean 7 ✓. 5, 5, 5: equal ✗. 2, 9, 10: median 9, mean 7 ✓. 3, 4, 5, 6: both 4.5 ✗. A low outlier drags the mean below the median; a high one pulls it above.',
  ),
  ps(
    2,
    'data',
    'Based on the graph above, approximately what percent of the day does Maya spend on homework and leisure combined?',
    ['17%', '25%', '29%', '33%', '42%'],
    2,
    'Homework + leisure = 3 + 4 = 7 hours out of 24: 7/24 ≈ 0.29 = 29%.',
    { stimulus: day },
  ),
  ps(
    3,
    'int',
    'When the positive integer n is divided by 4, the remainder is 3. What is the remainder when 3n is divided by 4?',
    ['0', '1', '2', '3', '4'],
    1,
    'Pick the simplest n: n = 3. Then 3n = 9, which leaves remainder 1 when divided by 4. Check another: n = 7, 3n = 21, remainder 1 ✓. (E) is impossible — a remainder on division by 4 is always less than 4.',
  ),
]);
