// Practice Test 1 — Quantitative Reasoning.
// Section 1 (12): QC 1–4 · PS 5 · data set 6–8 · PS 9–12.
// Section 2 (15): QC 1–5 · PS 6–15.

import { NOT_TO_SCALE, dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

const squareInCircle = fig(240, 240, [
  g.circle([120, 120], 90),
  g.poly([
    [56.4, 56.4],
    [183.6, 56.4],
    [183.6, 183.6],
    [56.4, 183.6],
  ]),
  g.dot([120, 120]),
  g.line([120, 120], [183.6, 56.4]),
  g.text([143, 80], '5', 'middle', true),
  g.text([112, 138], 'O'),
]);

const rightTriangle = fig(
  300,
  210,
  [
    g.poly([
      [50, 40],
      [50, 170],
      [260, 170],
    ]),
    g.right([50, 170], [50, 40], [260, 170]),
    g.text([40, 42], 'A', 'end'),
    g.text([40, 186], 'C', 'end'),
    g.text([270, 186], 'B', 'start'),
    g.text([168, 96], '10', 'middle', true),
  ],
  NOT_TO_SCALE,
);

const segment = fig(260, 245, [
  '<path d="M80,43.4 A100,100 0 0 1 180,43.4 Z" fill="#d5dae0" stroke="currentColor" stroke-width="1.6"/>',
  g.circle([130, 130], 100),
  g.line([130, 130], [80, 43.4]),
  g.line([130, 130], [180, 43.4]),
  g.dot([130, 130]),
  g.text([72, 40], 'A', 'end'),
  g.text([188, 40], 'B', 'start'),
  g.text([130, 150], 'O'),
  g.text([130, 108], '60°', 'middle', true),
  g.text([95, 96], '6', 'middle', true),
]);

// ---------------------------------------------------------------- Section 1

const staff = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Employees at Company X by Department, 2019 and 2023',
      categories: ['Sales', 'Engineering', 'Support', 'Marketing', 'Admin'],
      series: [
        { name: '2019', values: [120, 80, 60, 40, 30] },
        { name: '2023', values: [150, 140, 45, 48, 37] },
      ],
      yLabel: 'Number of employees',
      yMax: 160,
      yStep: 20,
      showValues: true,
    },
  ],
};

export const Q1 = section(1, 'q1', [
  qc(
    1,
    'exp',
    { a: '(−3)⁴', b: '−3⁴' },
    'A',
    'Order of operations: in −3⁴ the exponent applies before the negative sign, so −3⁴ = −(3⁴) = −81. In (−3)⁴ the parentheses make the base −3, and an even power is positive: 81. So A = 81 > B = −81.',
  ),
  qc(
    2,
    'pct',
    {
      given: 'The price of a jacket was p dollars, where p > 0. The price was increased by 20 percent, and the resulting price was then decreased by 20 percent.',
      a: 'The final price of the jacket, in dollars',
      b: 'p',
    },
    'B',
    'Percent changes multiply: p × 1.20 × 0.80 = 0.96p. The 20% decrease is taken from a larger number than the 20% increase was, so it removes more than was added. Since p > 0, 0.96p < p. The tempting answer C assumes +20% and −20% cancel.',
  ),
  qc(
    2,
    'quad',
    { given: 'x² = 4x', a: 'x', b: '4' },
    'D',
    'Don’t divide both sides by x — that throws away a solution. Rearrange: x² − 4x = 0, so x(x − 4) = 0, and x = 0 or x = 4. If x = 4 the quantities are equal; if x = 0, B is greater. Two different relationships → D.',
  ),
  qc(
    3,
    'stat',
    {
      given: 'The average (arithmetic mean) of five different positive integers is 10.',
      a: 'The greatest possible value of the largest of the five integers',
      b: '40',
    },
    'C',
    'The five integers sum to 5 × 10 = 50. To make the largest as big as possible, make the other four as small as possible — but they must be different positive integers: 1, 2, 3, 4, which sum to 10. The largest is then 50 − 10 = 40. (If you allowed repeats, 1 + 1 + 1 + 1 would give 46 — the word “different” is the trap.)',
  ),
  ps(
    1,
    'lin',
    'If 3x − 7 = 11, what is the value of 6x − 7?',
    ['18', '22', '25', '29', '36'],
    3,
    '3x − 7 = 11 gives 3x = 18, so x = 6 and 6x − 7 = 36 − 7 = 29. Faster: 6x = 2(3x) = 36. Choice (E) forgets to subtract 7; (A) is 3x.',
  ),
  dataSet('staff', staff, [
    ps(
      1,
      'data',
      'For which department was the percent increase in the number of employees from 2019 to 2023 the greatest?',
      ['Sales', 'Engineering', 'Support', 'Marketing', 'Admin'],
      1,
      'Percent increase = change ÷ 2019 value. Sales: 30/120 = 25%. Engineering: 60/80 = 75%. Support fell. Marketing: 8/40 = 20%. Admin: 7/30 ≈ 23%. Engineering wins easily. Sales had a big raw increase (30) but from a bigger base — the classic trap is comparing raw changes instead of percents.',
    ),
    ne(
      2,
      'data',
      'In 2023, the employees in Engineering made up what percent of the total number of employees at Company X, to the nearest whole percent?',
      33,
      '2023 total = 150 + 140 + 45 + 48 + 37 = 420. Engineering: 140/420 = 1/3 ≈ 33.3%, which rounds to 33.',
      { roundTo: 1, suffix: '%' },
    ),
    psMulti(
      3,
      'data',
      'For which of the departments did the number of employees increase by more than 20 percent from 2019 to 2023?\n\nIndicate all such departments.',
      ['Sales', 'Engineering', 'Support', 'Marketing', 'Admin'],
      [0, 1, 4],
      'Sales: +30 on 120 = 25% ✓. Engineering: +60 on 80 = 75% ✓. Support: 60 → 45 is a decrease ✗. Marketing: +8 on 40 = exactly 20% — not MORE than 20% ✗. Admin: +7 on 30 ≈ 23.3% ✓. The two traps are Support (a 25% change, but downward) and Marketing (exactly 20%).',
    ),
  ]),
  ps(
    2,
    'ratio',
    'In a club, the ratio of boys to girls is 3 to 5. After 6 more boys join the club and no members leave, the ratio of boys to girls is 1 to 1. How many girls are in the club?',
    ['9', '15', '18', '20', '24'],
    1,
    'Let the club have 3k boys and 5k girls. After 6 boys join, 3k + 6 = 5k, so k = 3: 9 boys and 15 girls. Check: 9 + 6 = 15 = 15. (A) is the number of boys.',
  ),
  ne(
    2,
    'circ',
    'In the figure above, a square is inscribed in a circle with center O and radius 5. What is the area of the square?',
    50,
    'The square’s diagonal is a diameter of the circle: 2 × 5 = 10. A square with diagonal d has area d²/2 (it’s two right isosceles triangles, or side = d/√2), so the area is 100/2 = 50.',
    { stimulus: { figure: squareInCircle } },
  ),
  psMulti(
    2,
    'int',
    'If n is an integer and 20 < n² < 70, which of the following could be the value of n?\n\nIndicate all such values.',
    ['−9', '−8', '−4', '5', '7', '9'],
    [1, 3, 4],
    'n² must be a perfect square strictly between 20 and 70: 25, 36, 49, or 64 — so n = ±5, ±6, ±7, or ±8. Among the choices: −8 (64), 5 (25), and 7 (49). −9 and 9 give 81; −4 gives 16. Don’t forget that negative integers have positive squares.',
  ),
  ps(
    3,
    'int',
    'How many positive integers less than 100 are divisible by 3 or by 4 but not by 12?',
    ['33', '41', '45', '49', '57'],
    1,
    'Below 100 there are 33 multiples of 3 (3 to 99), 24 multiples of 4 (4 to 96), and 8 multiples of 12 (12 to 96). Divisible by 3 or 4: 33 + 24 − 8 = 49 (subtract the overlap once). Now remove the multiples of 12, which are all inside that 49: 49 − 8 = 41. Choice (D) forgets the “not by 12”; (E) adds without removing the overlap.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

export const Q2H = section(1, 'q2h', [
  qc(
    2,
    'exp',
    { a: '2³⁰ + 2³⁰', b: '2³¹' },
    'C',
    'Two copies of the same thing: 2³⁰ + 2³⁰ = 2 × 2³⁰ = 2³¹. Adding powers does not add exponents in any other way — 2³⁰ + 2³⁰ is not 2⁶⁰ and not 4³⁰.',
  ),
  qc(
    3,
    'stat',
    { given: 'List S consists of the numbers 3, 5, 7, 9, and x, where x > 9.', a: 'The average (arithmetic mean) of the numbers in S', b: 'The median of the numbers in S' },
    'D',
    'Since x > 9 is the largest value, the ordered list is 3, 5, 7, 9, x and the median is always 7. The mean is (24 + x)/5, which is 7 exactly when x = 11. Try x = 10: mean 6.8 < 7. Try x = 20: mean 8.8 > 7. Different values give different answers → D.',
  ),
  qc(
    3,
    'tri',
    { given: 'In right triangle ABC above, hypotenuse AB has length 10.', a: 'The area of triangle ABC', b: '25', figure: rightTriangle },
    'D',
    'With legs a and b: a² + b² = 100 and the area is ab/2. Since (a − b)² ≥ 0, we get 2ab ≤ a² + b² = 100, so ab ≤ 50 and the area is at most 25 — reached only when a = b = 5√2. A 6-8-10 triangle has area 24 < 25; an isosceles one has area exactly 25. The figure isn’t to scale, so either is possible → D.',
  ),
  qc(
    2,
    'quad',
    { given: 'x < 0 < y', a: '(x + y)²', b: 'x² + y²' },
    'B',
    'Expand: (x + y)² = x² + 2xy + y². Subtract x² + y² from both quantities, leaving 2xy in A and 0 in B. With x negative and y positive, xy < 0, so B is greater.',
  ),
  qc(
    2,
    'rate',
    {
      given: 'Working alone at their respective constant rates, machine R can fill a tank in 3 hours and machine S can fill the same tank in 6 hours.',
      a: 'The number of hours it takes R and S, working together at these rates, to fill the tank',
      b: '1.5',
    },
    'A',
    'Add rates, not times: R fills 1/3 of the tank per hour and S fills 1/6, so together 1/3 + 1/6 = 1/2 tank per hour — 2 hours. 2 > 1.5. (1.5 is the tempting “average the times and halve” guess.)',
  ),
  ps(
    2,
    'lin',
    'At a store, 3 pens and 2 notebooks cost a total of $13.00, and 2 pens and 3 notebooks cost a total of $12.00. What is the total cost of 1 pen and 1 notebook?',
    ['$4.00', '$4.50', '$5.00', '$5.50', '$6.00'],
    2,
    'Add the two equations: 5 pens + 5 notebooks = $25.00, so 1 pen + 1 notebook = $5.00. No need to find each price (they are $3 and $2). The GRE rewards spotting the combination it asks for.',
  ),
  ne(
    3,
    'pct',
    'The population of a town increased by 25 percent from 2010 to 2015 and then decreased by 20 percent from 2015 to 2020. By what percent did the population change from 2010 to 2020?',
    0,
    'Multiply the factors: 1.25 × 0.80 = 1.00. The population ended exactly where it started — a 0% change. Adding the percents (+25 − 20 = +5) is the trap: the 20% decrease is taken from the larger 2015 population.',
    { suffix: '%' },
  ),
  ps(
    3,
    'quad',
    'If x + 1/x = 5, what is the value of x² + 1/x²?',
    ['3', '10', '23', '25', '27'],
    2,
    'Square both sides: (x + 1/x)² = x² + 2·x·(1/x) + 1/x² = x² + 2 + 1/x² = 25. So x² + 1/x² = 23. Answer (D) forgets the middle term; (E) adds it instead of subtracting.',
  ),
  ps(
    3,
    'coord',
    'In the xy-plane, line k passes through the point (−2, 3) and is perpendicular to the line 2x − 4y = 7. What is the y-intercept of line k?',
    ['−1', '1', '3', '4', '7'],
    0,
    'Rewrite 2x − 4y = 7 as y = (1/2)x − 7/4: slope 1/2. A perpendicular line has slope −2 (negative reciprocal). Through (−2, 3): y − 3 = −2(x + 2), so y = −2x − 1. The y-intercept is −1. Using slope 1/2 by mistake gives 4; using slope 2 gives 7.',
  ),
  ps(
    3,
    'circ',
    'In the figure above, O is the center of the circle, the radius is 6, and angle AOB measures 60°. What is the area of the shaded region?',
    ['6π − 9√3', '12π − 18√3', '6π − 9', '12π − 9√3', '36π − 9√3'],
    0,
    'Shaded region = sector AOB − triangle AOB. Sector: (60/360) × π × 6² = 6π. Triangle: OA = OB = 6 and the angle between them is 60°, so it is equilateral with side 6 and area (√3/4) × 36 = 9√3. Shaded area: 6π − 9√3.',
    { stimulus: { figure: segment } },
  ),
  ps(
    3,
    'prob',
    'A committee of 3 people is to be chosen from a group of 8 people. If two particular people in the group refuse to serve on the committee together, how many different committees are possible?',
    ['20', '36', '42', '50', '56'],
    3,
    'Count all committees, then subtract the forbidden ones. All: C(8, 3) = 56. Committees containing both of the two people: choose the third member from the other 6 — 6 committees. 56 − 6 = 50. (E) ignores the restriction.',
  ),
  ne(
    2,
    'stat',
    'The average (arithmetic mean) of four numbers is 15. When a fifth number is added, the average of the five numbers is 18. What is the fifth number?',
    30,
    'Work with sums. Four numbers averaging 15 sum to 60; five averaging 18 sum to 90. The fifth number is 90 − 60 = 30.',
  ),
  ps(
    2,
    'fn',
    'A sequence is defined by a₁ = 3 and aₙ₊₁ = 2aₙ − 1 for all n ≥ 1. What is the value of a₆?',
    ['31', '33', '63', '65', '129'],
    3,
    'Generate terms: a₁ = 3, a₂ = 5, a₃ = 9, a₄ = 17, a₅ = 33, a₆ = 65. (Pattern: aₙ = 2ⁿ + 1.) (B) is a₅ — an off-by-one error.',
  ),
  psMulti(
    3,
    'int',
    'If p is a prime number greater than 3, which of the following must be true?\n\nIndicate all such statements.',
    ['p + 1 is even.', 'p² − 1 is divisible by 3.', 'p + 2 is prime.', 'p² + 1 is divisible by 5.', 'p² − 1 is divisible by 24.'],
    [0, 1, 4],
    'Every prime greater than 3 is odd and not a multiple of 3. Odd → p + 1 is even ✓. Not a multiple of 3 → p is 1 or 2 more than a multiple of 3, so p² leaves remainder 1 when divided by 3, and p² − 1 is divisible by 3 ✓. Also p² − 1 = (p − 1)(p + 1) is a product of consecutive even numbers (divisible by 8) and divisible by 3, so by 24 ✓. Counterexamples kill the rest: p = 7 gives p + 2 = 9 (not prime); p = 5 gives p² + 1 = 26 (not divisible by 5).',
  ),
  ps(
    3,
    'rate',
    'Working alone at constant rates, Anna can paint a room in 6 hours and Ben can paint the same room in 4 hours. Anna works alone for 2 hours, and then Ben joins her. Working together, how many more hours will they need to finish painting the room?',
    ['1.2', '1.6', '2', '2.4', '2.8'],
    1,
    'In 2 hours Anna paints 2/6 = 1/3 of the room, leaving 2/3. Together they paint 1/6 + 1/4 = 5/12 of the room per hour. Time = (2/3) ÷ (5/12) = (2/3)(12/5) = 8/5 = 1.6 hours. (D) is the time for the whole room together — it ignores Anna’s head start.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

export const Q2E = section(1, 'q2e', [
  qc(
    1,
    'frac',
    { a: '0.3 × 0.3', b: '0.3' },
    'B',
    '0.3 × 0.3 = 0.09. Multiplying a positive number by a number between 0 and 1 makes it smaller, so B is greater.',
  ),
  qc(
    1,
    'circ',
    { given: 'A rectangle has length 8 and width 5.', a: 'The area of the rectangle', b: 'The perimeter of the rectangle' },
    'A',
    'Area = 8 × 5 = 40. Perimeter = 2(8 + 5) = 26. 40 > 26.',
  ),
  qc(
    2,
    'frac',
    { given: 'x > 0', a: 'x/3 + x/6', b: 'x/2' },
    'C',
    'Common denominator 6: x/3 + x/6 = 2x/6 + x/6 = 3x/6 = x/2. Equal for every x.',
  ),
  qc(
    1,
    'int',
    { given: 'y is an integer and 2 < y < 6.', a: 'y', b: '4' },
    'D',
    'y can be 3, 4, or 5. If y = 3, B is greater; if y = 4, they’re equal; if y = 5, A is greater. More than one relationship → D.',
  ),
  qc(
    2,
    'lin',
    { given: 'The average (arithmetic mean) of x and y is 20, and x = 3y.', a: 'x − y', b: '20' },
    'C',
    'Average 20 means x + y = 40. Substituting x = 3y: 4y = 40, so y = 10 and x = 30. x − y = 20.',
  ),
  ps(
    1,
    'frac',
    'What is 2/3 of 3/4 of 48?',
    ['12', '24', '27', '32', '36'],
    1,
    '“Of” means multiply: (2/3)(3/4)(48) = (1/2)(48) = 24. Multiplying the fractions first (2/3 × 3/4 = 1/2) saves arithmetic. (E) is only 3/4 of 48; (D) is only 2/3 of 48.',
  ),
  ne(
    1,
    'pct',
    'A shirt that regularly sells for $40 is on sale for 15 percent off the regular price. What is the sale price of the shirt, in dollars?',
    34,
    '15% of $40 is 0.15 × 40 = $6, so the sale price is 40 − 6 = $34. Or directly: 0.85 × 40 = 34.',
    { prefix: '$' },
  ),
  ps(
    1,
    'lin',
    'If 4(x − 2) = 2x + 6, what is the value of x?',
    ['1', '4', '5', '7', '14'],
    3,
    'Distribute: 4x − 8 = 2x + 6. Subtract 2x and add 8: 2x = 14, so x = 7. (E) stops at 2x = 14.',
  ),
  ps(
    1,
    'tri',
    'In triangle PQR, PQ = PR and the measure of angle P is 40°. What is the measure of angle Q?',
    ['40°', '55°', '70°', '100°', '140°'],
    2,
    'Equal sides PQ and PR sit opposite equal angles R and Q. The angles sum to 180°: 40 + 2Q = 180, so Q = 70°.',
  ),
  ps(
    2,
    'stat',
    'The median of the five numbers 3, 8, x, 12, and 15 is 8. If x is a positive integer, how many different values of x are possible?',
    ['3', '5', '7', '8', '9'],
    3,
    'With five numbers the median is the third in order. If x ≤ 8, the order puts 8 third (for example 3, x, 8, 12, 15 or x, 3, 8, 12, 15), so the median is 8. If x > 8, the third number would be x or 12, which is greater than 8. So x can be any positive integer from 1 to 8 — 8 values, including x = 8 itself.',
  ),
  ne(
    2,
    'ratio',
    'In a class, the ratio of the number of students who walk to school to the number who do not walk to school is 2 to 7. What fraction of the students in the class walk to school?',
    2 / 9,
    'A ratio of 2 to 7 means 2 walkers for every 2 + 7 = 9 students, so 2/9 of the class walks. The trap is 2/7, which compares walkers to non-walkers instead of to the whole class.',
    { fraction: true, display: '2/9' },
  ),
  ps(
    2,
    'prob',
    'An integer is chosen at random from the integers 1 through 20, inclusive. What is the probability that the integer is a multiple of 3 or a multiple of 5?',
    ['1/4', '3/10', '2/5', '9/20', '1/2'],
    3,
    'Multiples of 3: 3, 6, 9, 12, 15, 18 (6). Multiples of 5: 5, 10, 15, 20 (4). 15 is counted twice, so there are 6 + 4 − 1 = 9 favorable integers: 9/20. (E) forgets to remove the double-counted 15.',
  ),
  ps(
    1,
    'coord',
    'What is the distance between the points (1, 2) and (7, 10) in the xy-plane?',
    ['8', '10', '12', '14', '18'],
    1,
    'The horizontal change is 6 and the vertical change is 8. Distance = √(6² + 8²) = √100 = 10 (a 6-8-10 right triangle). (D) adds the legs instead of using the Pythagorean theorem.',
  ),
  psMulti(
    2,
    'int',
    'Which of the following are factors of 84?\n\nIndicate all such numbers.',
    ['6', '8', '12', '14', '16', '21'],
    [0, 2, 3, 5],
    '84 = 2² × 3 × 7. A factor can use at most two 2s, one 3, and one 7. 6 = 2·3 ✓, 12 = 2²·3 ✓, 14 = 2·7 ✓, 21 = 3·7 ✓. 8 = 2³ and 16 = 2⁴ need too many 2s ✗.',
  ),
  ps(
    3,
    'rate',
    'A car travels 180 miles from Town A to Town B at an average speed of 60 miles per hour and returns along the same route at an average speed of 40 miles per hour. What is the car’s average speed, in miles per hour, for the entire round trip?',
    ['45', '48', '50', '52', '55'],
    1,
    'Average speed = total distance ÷ total time. Going: 180/60 = 3 hours. Returning: 180/40 = 4.5 hours. Total: 360 miles in 7.5 hours = 48 mph. (C) averages the two speeds, but the car spends more time at the slower speed, so the true average is lower.',
  ),
]);
