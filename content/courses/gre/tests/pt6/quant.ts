// Practice Test 6 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

// Isosceles trapezoid ABCD (AB ∥ DC), drawn to scale at 15 px per unit:
// AB = 10, DC = 16, legs 5, height 4.
const trapezoid = fig(320, 225, [
  g.poly([
    [85, 130],
    [235, 130],
    [280, 190],
    [40, 190],
  ]),
  g.text([79, 126], 'A', 'end'),
  g.text([241, 126], 'B', 'start'),
  g.text([288, 204], 'C', 'start'),
  g.text([32, 204], 'D', 'end'),
  g.text([160, 121], '10', 'middle', true),
  g.text([160, 211], '16', 'middle', true),
  g.text([55, 158], '5', 'end', true),
  g.text([265, 158], '5', 'start', true),
]);

// ---------------------------------------------------------------- Section 1

const rainfall = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Monthly Rainfall in City X and City Y, January–June',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [
        { name: 'City X', values: [3.2, 2.8, 4.0, 3.6, 2.4, 1.2] },
        { name: 'City Y', values: [2.0, 2.6, 2.4, 3.0, 1.6, 1.6] },
      ],
      yLabel: 'Rainfall (inches)',
      yMax: 5,
      yStep: 1,
      showValues: true,
    },
  ],
};

export const Q1 = section(6, 'q1', [
  qc(
    1,
    'int',
    { a: 'The remainder when 58 is divided by 7', b: 'The remainder when 58 is divided by 9' },
    'B',
    '58 = 7 × 8 + 2, so the first remainder is 2. 58 = 9 × 6 + 4, so the second is 4. 4 > 2.',
  ),
  qc(
    2,
    'pct',
    { given: 'x is 150 percent of y, and y > 0.', a: 'y as a percent of x', b: '66%' },
    'A',
    'x = 1.5y, so y/x = 1/1.5 = 2/3 ≈ 66.67%, which is greater than 66%. Don’t assume the reverse percent is 50% or 150% − 100% — divide.',
  ),
  qc(
    2,
    'lin',
    { given: '|x − 2| = 5', a: 'x', b: '0' },
    'D',
    'x − 2 = 5 gives x = 7; x − 2 = −5 gives x = −3. One value is greater than 0 and one is less, so the relationship can’t be determined. An absolute-value equation usually has two solutions — check both.',
  ),
  qc(
    3,
    'int',
    { given: 'n is a positive integer, and n² is divisible by 12.', a: 'The remainder when n is divided by 6', b: '0' },
    'C',
    '12 = 2² × 3. For 3 to divide n², 3 must divide n (a prime dividing a square divides the root). For 2² to divide n², 2 must divide n. So n is divisible by 2 and 3, hence by 6, and the remainder is 0. (Smallest case: n = 6, n² = 36.)',
  ),
  ps(
    1,
    'frac',
    'What is the value of (1/2 + 1/3) ÷ (1/2 − 1/3)?',
    ['1/5', '1', '5/6', '5', '6'],
    3,
    '1/2 + 1/3 = 5/6 and 1/2 − 1/3 = 1/6. Then (5/6) ÷ (1/6) = 5/6 × 6 = 5. (C) is only the numerator.',
  ),
  dataSet('rainfall', rainfall, [
    ps(
      1,
      'data',
      'In how many of the six months did City X receive more rainfall than City Y?',
      ['2', '3', '4', '5', '6'],
      3,
      'Compare month by month: Jan 3.2 > 2.0, Feb 2.8 > 2.6, Mar 4.0 > 2.4, Apr 3.6 > 3.0, May 2.4 > 1.6, but Jun 1.2 < 1.6. That is 5 months.',
    ),
    ne(
      2,
      'data',
      'What was City Y’s average (arithmetic mean) monthly rainfall for the six months, in inches?',
      2.2,
      'City Y’s total: 2.0 + 2.6 + 2.4 + 3.0 + 1.6 + 1.6 = 13.2 inches. 13.2 ÷ 6 = 2.2 inches per month.',
      { suffix: 'inches' },
    ),
    psMulti(
      3,
      'data',
      'For which months was City X’s rainfall at least 50 percent greater than City Y’s?\n\nIndicate all such months.',
      ['January', 'February', 'March', 'April', 'May', 'June'],
      [0, 2, 4],
      '“At least 50% greater” means X ≥ 1.5 × Y. Jan: 1.5 × 2.0 = 3.0, and 3.2 ≥ 3.0 ✓. Feb: 3.9 > 2.8 ✗. Mar: 3.6 ≤ 4.0 ✓. Apr: 4.5 > 3.6 ✗. May: 1.5 × 1.6 = 2.4, and 2.4 ≥ 2.4 ✓ (exactly 50% more still counts). Jun: X is less than Y ✗.',
    ),
  ]),
  ps(
    2,
    'ratio',
    'Three partners divide a profit of $84,000 in the ratio 2 : 3 : 7. How much more does the partner with the largest share receive than the partner with the smallest share?',
    ['$7,000', '$14,000', '$21,000', '$28,000', '$35,000'],
    4,
    'The ratio has 2 + 3 + 7 = 12 parts, so each part is $84,000 ÷ 12 = $7,000. The largest share is 7 parts and the smallest 2, a difference of 5 parts = $35,000. (A) is a single part; (B) is the smallest share.',
  ),
  ne(
    2,
    'circ',
    'A circular garden has a circumference of 20π feet. A path 2 feet wide surrounds the garden. The area of the path is kπ square feet. What is the value of k?',
    44,
    'Circumference 20π means radius 10. With the path, the outer radius is 12. Path area = π(12²) − π(10²) = 144π − 100π = 44π, so k = 44. A common slip is adding 2 to the diameter instead of to the radius on each side.',
  ),
  psMulti(
    2,
    'quad',
    'For which of the following equations is x = −2 a solution?\n\nIndicate all such equations.',
    ['x² − 4 = 0', 'x² + 4x + 4 = 0', 'x² − x − 6 = 0', 'x² + x − 6 = 0', 'x² − 2x = 0', 'x³ + 8 = 0'],
    [0, 1, 2, 5],
    'Substitute x = −2 into each: 4 − 4 = 0 ✓; 4 − 8 + 4 = 0 ✓; 4 + 2 − 6 = 0 ✓; 4 − 2 − 6 = −4 ✗; 4 + 4 = 8 ✗; −8 + 8 = 0 ✓. Watch the signs: (−2)² = 4 but −(−2) = +2 and (−2)³ = −8.',
  ),
  ps(
    3,
    'prob',
    'A bag contains 4 red marbles and 6 blue marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles are the same color?',
    ['7/15', '1/2', '13/25', '8/15', '2/5'],
    0,
    'Same color = both red or both blue. Ways: C(4, 2) + C(6, 2) = 6 + 15 = 21 out of C(10, 2) = 45 pairs, so 21/45 = 7/15. (C) is the with-replacement answer (0.4² + 0.6² = 0.52); (D) is the probability of different colors.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const budget = {
  charts: [
    {
      type: 'pie' as const,
      title: 'How Mira Spends Her Monthly Income of $3,200',
      categories: ['Rent', 'Food', 'Transportation', 'Savings', 'Other'],
      series: [{ name: 'Share', values: [35, 15, 10, 20, 20] }],
      unit: '%',
    },
  ],
};

export const Q2E = section(6, 'q2e', [
  qc(1, 'frac', { a: '3/7', b: '0.43' }, 'B', '3/7 = 0.4285…, which is less than 0.43. (Check: 0.43 × 7 = 3.01 > 3.)'),
  qc(1, 'exp', { a: '(2³)²', b: '2⁵' }, 'A', 'A power of a power multiplies the exponents: (2³)² = 2⁶ = 64, while 2⁵ = 32. Adding the exponents (3 + 2 = 5) is the trap.'),
  qc(
    2,
    'tri',
    { given: 'In triangle ABC, the measure of angle A is 50°, and the exterior angle at vertex C measures 110°.', a: 'The measure of angle B', b: '60°' },
    'C',
    'An exterior angle equals the sum of the two interior angles not next to it: 110° = A + B = 50° + B, so B = 60°. (Or: interior angle C = 180° − 110° = 70°, and B = 180° − 50° − 70° = 60°.)',
  ),
  qc(
    2,
    'int',
    { given: 'n is an integer and 10 < n² < 50.', a: 'n', b: '5' },
    'D',
    'n² can be 16, 25, 36, or 49, so n can be ±4, ±5, ±6, or ±7. n = 6 makes A greater; n = 4 or n = −6 makes B greater. Forgetting the negative roots (and 4) makes this look like A.',
  ),
  qc(
    2,
    'stat',
    { given: 'The average (arithmetic mean) of x, y, and z is 8, and x = 5.', a: 'The average of y and z', b: '10' },
    'B',
    'x + y + z = 3 × 8 = 24, so y + z = 24 − 5 = 19 and their average is 9.5, which is less than 10.',
  ),
  ps(
    1,
    'pct',
    'A store sells a lamp for $48, which is 20 percent more than the store paid for it. How much did the store pay for the lamp?',
    ['$36.00', '$38.40', '$40.00', '$42.00', '$57.60'],
    2,
    'Cost × 1.2 = 48, so cost = 48 ÷ 1.2 = $40. (B) takes 20% off the selling price — but the 20% is a percent of the cost, not of $48.',
  ),
  ne(
    1,
    'rate',
    'A car travels 150 miles in 2.5 hours. At the same rate, how many miles will it travel in 4 hours?',
    240,
    'Rate = 150 ÷ 2.5 = 60 miles per hour. In 4 hours: 60 × 4 = 240 miles.',
    { suffix: 'miles' },
  ),
  ps(
    2,
    'coord',
    'In the xy-plane, a line passes through the points (−2, 5) and (4, −7). At which point does the line cross the y-axis?',
    ['(0, −2)', '(0, 1)', '(0, 3)', '(0, 5)', '(0, 9)'],
    1,
    'Slope = (−7 − 5) ÷ (4 − (−2)) = −12 ÷ 6 = −2, so y = −2x + b. Using (−2, 5): 5 = 4 + b, so b = 1 and the line crosses at (0, 1). Check with (4, −7): −8 + 1 = −7 ✓. (A) is the slope, not the intercept.',
  ),
  ps(
    2,
    'int',
    'What is the greatest prime factor of 2⁸ − 1?',
    ['3', '5', '7', '17', '31'],
    3,
    '2⁸ − 1 = 255 = 5 × 51 = 5 × 3 × 17, so the greatest prime factor is 17. (Or use the difference of squares: 2⁸ − 1 = (2⁴ − 1)(2⁴ + 1) = 15 × 17.)',
  ),
  psMulti(
    2,
    'fn',
    'If f(x) = x² − 4x, for which of the following values of x is f(x) negative?\n\nIndicate all such values.',
    ['−1', '0', '1', '3', '4', '5'],
    [2, 3],
    'f(x) = x(x − 4) is negative when the factors have opposite signs, which happens only for 0 < x < 4. So x = 1 (f = −3) and x = 3 (f = −3). At 0 and 4, f(x) = 0; at −1 and 5, f(x) = 5.',
  ),
  ps(
    1,
    'circ',
    'A rectangular box has inside dimensions of 10 centimeters by 6 centimeters by 4 centimeters. What is the greatest number of cubes with edges of 2 centimeters that can be packed inside the box?',
    ['15', '30', '60', '120', '240'],
    1,
    'Along each edge: 10 ÷ 2 = 5, 6 ÷ 2 = 3, 4 ÷ 2 = 2 cubes, so 5 × 3 × 2 = 30 cubes. (Same as dividing volumes here: 240 ÷ 8 = 30.) (E) is the box’s volume.',
  ),
  dataSet('budget', budget, [
    ps(
      1,
      'data',
      'How much more does Mira spend on rent than on food each month?',
      ['$160', '$320', '$480', '$560', '$640'],
      4,
      'Rent is 35% and food 15%, a difference of 20 percentage points. 20% of $3,200 = $640. (C) takes 15 percent — the food share — instead of the difference.',
    ),
    ne(
      2,
      'data',
      'If Mira’s monthly income rises by 10 percent and her rent stays the same dollar amount, what percent of her new income will her rent be, to the nearest whole percent?',
      32,
      'Rent = 35% × 3,200 = $1,120. New income = 3,200 × 1.1 = $3,520. 1,120 ÷ 3,520 ≈ 0.318, or about 32%. (Subtracting 10 points to get 25% is the trap.)',
      { roundTo: 1, suffix: '%' },
    ),
  ]),
  ps(
    2,
    'ratio',
    'The ratio of the length of a rectangle to its width is 3 : 2, and the perimeter of the rectangle is 40. What is the area of the rectangle?',
    ['24', '48', '80', '96', '384'],
    3,
    'Write length = 3k and width = 2k. Perimeter 2(3k + 2k) = 10k = 40, so k = 4: the rectangle is 12 by 8, with area 96. (A) multiplies the ratio terms; (E) uses k = 8 by forgetting that the perimeter counts each side twice.',
  ),
  ne(
    1,
    'lin',
    'A phone plan charges a flat fee of $20 per month plus $0.05 for each text message. If one month’s bill was $32.50, how many text messages were sent that month?',
    250,
    'Subtract the flat fee: 32.50 − 20 = 12.50 dollars for messages. At $0.05 each: 12.50 ÷ 0.05 = 250 messages.',
    { suffix: 'messages' },
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

export const Q2H = section(6, 'q2h', [
  qc(2, 'exp', { a: '3²⁰ + 3²⁰ + 3²⁰', b: '3²¹' }, 'C', 'Three copies of 3²⁰ is 3 × 3²⁰ = 3²¹. Adding equal powers multiplies by the count; it doesn’t raise the base to 60 or the exponent to 60.'),
  qc(
    3,
    'coord',
    { given: 'In the xy-plane, the point (p, q) lies inside the circle x² + y² = 25.', a: 'p + q', b: '7' },
    'D',
    'Inside the circle means p² + q² < 25. Take p = q = 3.53: p² + q² ≈ 24.92 < 25 and p + q = 7.06 > 7. Take p = q = 0: p + q = 0 < 7. The largest p + q gets is just under 5√2 ≈ 7.07, so it can exceed 7 — barely. Answer D.',
  ),
  qc(
    3,
    'prob',
    { given: 'Two fair six-sided dice are rolled.', a: 'The probability that the sum of the two numbers is 7', b: 'The probability that the two numbers are equal' },
    'C',
    'There are 36 equally likely ordered outcomes. Sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — 6 outcomes. Doubles: (1,1) through (6,6) — also 6. Both are 6/36 = 1/6. (Counting (3,4) and (4,3) once each — as unordered pairs — is the classic slip.)',
  ),
  qc(
    2,
    'stat',
    { given: 'Set X: 10, 20, 30, 40, 50\nSet Y: 10, 30, 30, 30, 50', a: 'The standard deviation of set X', b: 'The standard deviation of set Y' },
    'A',
    'Both sets have mean 30. In X the middle values sit 10 and 20 away from 30; in Y three values sit exactly at 30. Same extremes, but X is more spread out overall, so its standard deviation is greater. No computation needed.',
  ),
  qc(
    3,
    'lin',
    { given: '(x − 3)(y + 2) = 0', a: 'x', b: '3' },
    'D',
    'A product is 0 when either factor is 0. If x = 3, the quantities are equal. But if y = −2, the equation holds for any x — say x = 10 or x = 0. The trap is concluding x must be 3.',
  ),
  ps(
    3,
    'rate',
    'Pump A alone can fill a tank in 6 hours, and pump B alone can fill it in 4 hours. Pump A is started alone, and 1 hour later pump B is also turned on. How many hours after pump A was started will the tank be full?',
    ['2', '2.4', '2.8', '3', '3.4'],
    3,
    'In the first hour A fills 1/6 of the tank, leaving 5/6. Together the pumps fill 1/6 + 1/4 = 5/12 per hour, so the rest takes (5/6) ÷ (5/12) = 2 hours. Total: 1 + 2 = 3 hours. (B) is how long the two pumps take together from empty.',
  ),
  ne(
    3,
    'pct',
    'The price of an item was increased by 20 percent. By what percent must the new price be decreased to return the item to its original price? Give your answer to the nearest tenth of a percent.',
    16.7,
    'Start at 100; the new price is 120. To get back to 100, decrease by 20 out of 120: 20/120 = 1/6 ≈ 16.67%, or 16.7%. The decrease is smaller than 20% because it is taken from a larger base.',
    { roundTo: 0.1, suffix: '%' },
  ),
  psMulti(
    3,
    'int',
    'If n is a positive integer and n³ is divisible by 72, which of the following must be divisors of n?\n\nIndicate all such numbers.',
    ['2', '3', '4', '6', '9', '12'],
    [0, 1, 3],
    '72 = 2³ × 3². If a prime divides n³, it divides n, so 2 and 3 both divide n — and so does 6. The smallest such n is 6 (6³ = 216 = 72 × 3), which is not divisible by 4, 9, or 12, so those need not divide n.',
  ),
  ps(
    3,
    'circ',
    'In the figure above, ABCD is a trapezoid with side AB parallel to side DC. What is the area of ABCD?',
    ['26', '39', '40', '48', '52'],
    4,
    'Drop perpendiculars from A and B to DC. They cut off 16 − 10 = 6 units, split equally: 3 on each side. Each leg of 5 then forms a 3-4-5 right triangle, so the height is 4. Area = (1/2)(10 + 16)(4) = 52. (B) takes 3, not 4, as the height.',
    { stimulus: { figure: trapezoid } },
  ),
  ps(
    3,
    'fn',
    'The first term of an arithmetic sequence is 4, and the 10th term is 31. What is the sum of the first 10 terms of the sequence?',
    ['155', '175', '185', '310', '350'],
    1,
    'From the 1st term to the 10th is 9 steps, so the common difference is (31 − 4) ÷ 9 = 3. The sum of an arithmetic sequence is (number of terms) × (first + last) ÷ 2 = 10 × 35 ÷ 2 = 175. (D) forgets to divide by 2.',
  ),
  ne(
    3,
    'prob',
    'A committee of 3 people is to be chosen from a group of 5 women and 4 men. How many different committees include at least one man?',
    74,
    'Count the complement. All committees: C(9, 3) = 84. Committees with no man (all women): C(5, 3) = 10. So 84 − 10 = 74 include at least one man.',
  ),
  ps(
    2,
    'circ',
    'A right circular cylinder has a volume of 72π cubic inches and a height of 8 inches. What is its total surface area, in square inches?',
    ['42π', '48π', '57π', '66π', '84π'],
    3,
    'πr² × 8 = 72π gives r² = 9, r = 3. Total surface area = two bases + side = 2π(3²) + 2π(3)(8) = 18π + 48π = 66π. (C) counts only one base; (B) is the side alone.',
  ),
  ps(
    2,
    'exp',
    'If 4ˣ = 8ʸ and x + y = 10, what is the value of x?',
    ['6', '7.5', '8', '12', '15'],
    0,
    'Write both sides as powers of 2: 2²ˣ = 2³ʸ, so 2x = 3y and y = 2x/3. Then x + 2x/3 = 10, so 5x/3 = 10 and x = 6 (y = 4).',
  ),
  ne(
    3,
    'stat',
    'The scores of five students on a quiz were 6, 9, 9, 10, and x. If the average (arithmetic mean) of the five scores equals their median, what is the value of x?',
    11,
    'Whatever x is, the median is 9: if x ≤ 9 the sorted middle value is still one of the 9s, and if x ≥ 9 the list reads 6, 9, 9, … with 9 in the middle. So the mean must be 9: (6 + 9 + 9 + 10 + x) ÷ 5 = 9 gives 34 + x = 45, x = 11.',
  ),
  ps(
    2,
    'coord',
    'In the xy-plane, line ℓ has the equation 3x + 4y = 24. What is the area of the triangle formed by line ℓ and the two coordinate axes?',
    ['12', '24', '30', '48', '96'],
    1,
    'Intercepts: y = 0 gives x = 8; x = 0 gives y = 6. The triangle has legs 8 and 6 along the axes, so its area is (1/2)(8)(6) = 24. (D) forgets the 1/2.',
  ),
]);
