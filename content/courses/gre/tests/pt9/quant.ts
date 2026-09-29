// Practice Test 9 — Quantitative Reasoning.

import { dataSet, fig, g, ne, ps, psMulti, qc, section } from '../author.ts';

// ---------------------------------------------------------------- figures

// Concentric circles, center O, radii 10 and 6 (10 px per unit). Chord AB of
// the larger circle is tangent to the smaller circle at P.
const rings = fig(300, 250, [
  g.circle([150, 125], 100),
  g.circle([150, 125], 60),
  g.line([70, 185], [230, 185]),
  g.line([150, 125], [150, 185], true),
  g.right([150, 185], [150, 125], [230, 185]),
  g.dot([150, 125]),
  g.dot([70, 185]),
  g.dot([230, 185]),
  g.text([150, 116], 'O'),
  g.text([62, 200], 'A', 'end'),
  g.text([238, 200], 'B', 'start'),
  g.text([150, 204], 'P'),
]);

// ---------------------------------------------------------------- Section 1

const power = {
  charts: [
    {
      type: 'bar' as const,
      title: 'Sources of Electricity in Country Z (total generated: 400 billion kWh in 2010, 500 billion kWh in 2020)',
      categories: ['Coal', 'Gas', 'Nuclear', 'Hydro', 'Wind and solar'],
      series: [
        { name: '2010', values: [45, 25, 20, 8, 2] },
        { name: '2020', values: [25, 35, 18, 9, 13] },
      ],
      yLabel: 'Percent of electricity generated',
      yMax: 50,
      yStep: 10,
      unit: '%',
      showValues: true,
    },
  ],
};

export const Q1 = section(9, 'q1', [
  qc(1, 'pct', { a: '15% of 80', b: '12' }, 'C', '15% of 80 = 0.15 × 80 = 12. (Or take 10% = 8 and 5% = 4, then add: 12.)'),
  qc(
    2,
    'int',
    { given: 'n is a positive integer.', a: 'n(n + 1)', b: 'n² + 1' },
    'D',
    'n(n + 1) = n² + n, so compare n² + n with n² + 1 — that is, compare n with 1. If n = 1 they’re equal; if n ≥ 2, A is greater. Since n could be either, the answer is D.',
  ),
  qc(
    3,
    'tri',
    { given: 'In triangle ABC, the measure of angle A is 70° and the measure of angle B is 40°.', a: 'The length of side BC', b: 'The length of side AC' },
    'A',
    'In a triangle, a larger angle is opposite a longer side. BC is opposite angle A (70°) and AC is opposite angle B (40°), so BC is longer. (Angle C is 70° too, so AB = BC — but that doesn’t change the comparison.)',
  ),
  qc(
    2,
    'ratio',
    { given: 'In a class, the ratio of boys to girls is 3 : 5.', a: 'The fraction of the students in the class who are boys', b: '3/5' },
    'B',
    'Boys are 3 parts out of 3 + 5 = 8, so the fraction is 3/8 = 0.375, less than 3/5 = 0.6. A part-to-part ratio is not a fraction of the whole.',
  ),
  ps(
    1,
    'rate',
    'A machine fills 45 bottles per minute. At this rate, how many minutes will it take to fill 1,080 bottles?',
    ['16', '18', '20', '22', '24'],
    4,
    '1,080 ÷ 45 = 24 minutes. (Check: 45 × 24 = 900 + 180 = 1,080.)',
  ),
  dataSet('power', power, [
    ps(
      1,
      'data',
      'Which source’s share of the electricity generated increased by the most percentage points from 2010 to 2020?',
      ['Coal', 'Gas', 'Nuclear', 'Hydro', 'Wind and solar'],
      4,
      'Change in share: coal −20, gas +10, nuclear −2, hydro +1, wind and solar +11 points. Wind and solar gained the most, just ahead of gas.',
    ),
    ne(
      2,
      'data',
      'How many billion kilowatt-hours of electricity were generated from gas in 2020?',
      175,
      'Gas was 35% of 500 billion kWh in 2020: 0.35 × 500 = 175 billion kWh. Use the 2020 total, not 2010’s 400.',
      { suffix: 'billion kWh' },
    ),
    psMulti(
      3,
      'data',
      'For which sources did the amount of electricity generated (not the share) increase from 2010 to 2020?\n\nIndicate all such sources.',
      ['Coal', 'Gas', 'Nuclear', 'Hydro', 'Wind and solar'],
      [1, 2, 3, 4],
      'Convert shares to amounts (billion kWh), 2010 → 2020: coal 180 → 125 ✗; gas 100 → 175 ✓; nuclear 80 → 90 ✓; hydro 32 → 45 ✓; wind and solar 8 → 65 ✓. Nuclear is the trap: its share fell, but the total grew enough that its amount rose.',
    ),
  ]),
  ps(
    2,
    'circ',
    'A wheel with a diameter of 70 centimeters rolls without slipping and makes 100 complete turns. Using 22/7 as an approximation for π, about how many meters does the wheel travel?',
    ['110', '154', '220', '440', '2,200'],
    2,
    'One turn covers the circumference: π × 70 ≈ 22/7 × 70 = 220 centimeters. 100 turns: 22,000 cm = 220 meters. (A) uses the radius in place of the diameter.',
  ),
  ne(
    3,
    'exp',
    'What is the value of (5⁻¹ + 5⁻²)⁻¹?',
    25 / 6,
    '5⁻¹ + 5⁻² = 1/5 + 1/25 = 5/25 + 1/25 = 6/25. The −1 power takes the reciprocal: 25/6. (Adding exponents first — 5⁻³ — is not allowed for a sum.)',
    { fraction: true, display: '25/6' },
  ),
  psMulti(
    2,
    'fn',
    'For which of the following functions f is f(2) = f(−2)?\n\nIndicate all such functions.',
    ['f(x) = x²', 'f(x) = 2x', 'f(x) = |x|', 'f(x) = x³', 'f(x) = x² + x', 'f(x) = 5'],
    [0, 2, 5],
    'Evaluate each at 2 and −2: x² gives 4 and 4 ✓; 2x gives 4 and −4 ✗; |x| gives 2 and 2 ✓; x³ gives 8 and −8 ✗; x² + x gives 6 and 2 ✗; the constant 5 gives 5 both times ✓.',
  ),
  ps(
    3,
    'prob',
    'A fair coin is tossed 5 times. What is the probability of getting more heads than tails?',
    ['1/2', '9/16', '5/8', '11/16', '13/16'],
    0,
    'With 5 tosses there can’t be a tie, so every outcome has either more heads or more tails. By symmetry the two are equally likely: 1/2. (Counting also works: C(5,3) + C(5,4) + C(5,5) = 10 + 5 + 1 = 16 of 32.)',
  ),
]);

// ---------------------------------------------------------------- Section 2 (easier)

const commute = {
  table: {
    caption: 'Survey of 400 Commuters: Main Way of Getting to Work',
    columns: ['Main way of commuting', 'Number of commuters'],
    rows: [
      ['Car', '180'],
      ['Bus', '90'],
      ['Train', '70'],
      ['Bicycle', '40'],
      ['Walking', '20'],
    ],
  },
};

export const Q2E = section(9, 'q2e', [
  qc(1, 'int', { a: 'The greatest common factor of 36 and 48', b: 'The least common multiple of 6 and 8' }, 'B', 'GCF(36, 48) = 12 (36 = 2² × 3², 48 = 2⁴ × 3). LCM(6, 8) = 24. 12 < 24.'),
  qc(1, 'frac', { a: '0.25 × 0.4', b: '0.1' }, 'C', 'Convert to fractions: 0.25 × 0.4 = 1/4 × 2/5 = 2/20 = 1/10 = 0.1. The two quantities are equal.'),
  qc(1, 'coord', { given: 'In the xy-plane, A = (2, 3) and B = (2, −5).', a: 'The distance between A and B', b: '7' }, 'A', 'A and B have the same x-coordinate, so the distance is the difference in y: 3 − (−5) = 8, which is greater than 7.'),
  qc(
    2,
    'lin',
    { given: '3x + 2 > 11', a: 'x', b: '4' },
    'D',
    'Solve: 3x > 9, so x > 3. x could be 3.5 (less than 4) or 10 (greater than 4). An inequality gives a range, not a single value.',
  ),
  qc(
    2,
    'circ',
    { given: 'A rectangle has length 9 and width 4.', a: 'The perimeter of the rectangle', b: 'The perimeter of a square with the same area as the rectangle' },
    'A',
    'The rectangle’s perimeter is 2(9 + 4) = 26. Its area is 36, so the square has side 6 and perimeter 24. 26 > 24. (For a given area, the square has the smallest perimeter of any rectangle.)',
  ),
  ps(
    1,
    'pct',
    'A town’s budget of $2.4 million is divided so that 45 percent goes to schools. How much of the budget goes to schools?',
    ['$0.45 million', '$0.96 million', '$1.08 million', '$1.2 million', '$1.32 million'],
    2,
    '0.45 × 2.4 = 1.08, so $1.08 million. (B) is 40 percent; (D) is half.',
  ),
  ne(
    1,
    'int',
    'How many multiples of 6 are there between 1 and 100?',
    16,
    'The multiples are 6, 12, …, 96 = 6 × 16. So there are 16. (100 ÷ 6 ≈ 16.7; round down.)',
  ),
  ps(
    1,
    'ratio',
    'A 12-foot board is cut into two pieces whose lengths are in the ratio 1 : 3. How many feet long is the longer piece?',
    ['3', '4', '8', '9', '10'],
    3,
    'The ratio has 1 + 3 = 4 parts, each 12 ÷ 4 = 3 feet. The longer piece is 3 parts = 9 feet. (B) divides 12 by 3.',
  ),
  ps(
    2,
    'tri',
    'In an isosceles triangle, one angle measures 100°. What is the measure of each of the other two angles?',
    ['40°', '50°', '80°', '100°', '140°'],
    0,
    'A triangle can’t have two 100° angles (that would already exceed 180°), so 100° is the vertex angle and the two base angles are equal: (180° − 100°) ÷ 2 = 40°.',
  ),
  psMulti(
    2,
    'int',
    'Which of the following numbers are divisible by 9?\n\nIndicate all such numbers.',
    ['243', '405', '512', '738', '1,017', '2,020'],
    [0, 1, 3, 4],
    'A number is divisible by 9 exactly when its digit sum is. Digit sums: 243 → 9 ✓; 405 → 9 ✓; 512 → 8 ✗; 738 → 18 ✓; 1,017 → 9 ✓; 2,020 → 4 ✗.',
  ),
  ps(
    2,
    'coord',
    'In the xy-plane, line m has slope 3 and passes through the point (1, 4). What is the x-intercept of line m?',
    ['−3', '−1/3', '1/3', '1', '3'],
    1,
    'y − 4 = 3(x − 1), so y = 3x + 1. Set y = 0: 3x = −1, x = −1/3. (The y-intercept is 1 — choice (D) is a common mix-up.)',
  ),
  ne(
    2,
    'rate',
    'A 600-mile trip took 10 hours in all. The first 240 miles were driven at an average speed of 40 miles per hour. What was the average speed, in miles per hour, for the rest of the trip?',
    90,
    'The first part took 240 ÷ 40 = 6 hours, leaving 4 hours for the remaining 360 miles: 360 ÷ 4 = 90 miles per hour.',
    { suffix: 'mph' },
  ),
  dataSet('commute', commute, [
    ps(
      1,
      'data',
      'What percent of the commuters surveyed travel mainly by bus or by train?',
      ['16%', '22.5%', '32%', '40%', '60%'],
      3,
      'Bus and train together: 90 + 70 = 160 of 400 commuters. 160 ÷ 400 = 0.40 = 40%.',
    ),
    ne(
      2,
      'data',
      'If the survey results were displayed in a circle graph, what would be the central angle, in degrees, of the sector representing commuters who bicycle or walk?',
      54,
      'Bicycle or walk: 40 + 20 = 60 of 400 = 15%. A full circle is 360°, so the sector is 0.15 × 360 = 54°.',
      { suffix: 'degrees' },
    ),
  ]),
  ps(
    1,
    'frac',
    'Which of the following numbers is between 1/3 and 1/2?',
    ['1/4', '2/7', '3/10', '2/5', '5/9'],
    3,
    '1/3 ≈ 0.333 and 1/2 = 0.5. As decimals: 0.25, 0.286, 0.3, 0.4, 0.556. Only 2/5 = 0.4 is between them.',
  ),
]);

// ---------------------------------------------------------------- Section 2 (harder)

export const Q2H = section(9, 'q2h', [
  qc(
    3,
    'exp',
    { given: '−1 < x < 0', a: 'x³', b: 'x' },
    'A',
    'For a number between −1 and 0, cubing keeps the sign negative but shrinks the size: x = −0.5 gives x³ = −0.125, which is greater than −0.5. Closer to zero means greater for negatives.',
  ),
  qc(
    2,
    'stat',
    { given: 'The average (arithmetic mean) of five consecutive integers is 12.', a: 'The greatest of the five integers', b: '15' },
    'B',
    'For consecutive integers the mean is the middle one, so the integers are 10, 11, 12, 13, 14. The greatest is 14, less than 15.',
  ),
  qc(
    3,
    'coord',
    { given: 'In the xy-plane, circle C has center (3, 4) and radius 5.', a: 'The number of points at which circle C meets the x-axis', b: '1' },
    'A',
    'On the x-axis, y = 0: (x − 3)² + (0 − 4)² = 25 gives (x − 3)² = 9, so x = 0 or x = 6. The circle crosses the x-axis at two points, (0, 0) and (6, 0). (The center is 4 above the axis and the radius is 5, so it must cross.)',
  ),
  qc(
    3,
    'int',
    { given: 'n is a positive integer that has exactly 3 positive divisors.', a: 'n', b: '4' },
    'D',
    'A number with exactly 3 divisors is the square of a prime: its divisors are 1, p, and p². The smallest is 4 (1, 2, 4) — equal to B. But 9, 25, 49, … also qualify, making A greater. So the answer is D.',
  ),
  qc(
    3,
    'prob',
    { given: 'A fair six-sided die is rolled 3 times.', a: 'The probability that the three numbers rolled are all different', b: '1/2' },
    'A',
    'The first roll can be anything, the second must differ (5/6), and the third must differ from both (4/6): 1 × 5/6 × 4/6 = 20/36 = 5/9 ≈ 0.56, which is greater than 1/2.',
  ),
  ps(
    3,
    'pct',
    'Solution A is 20 percent salt, and solution B is 50 percent salt. How many liters of solution B must be mixed with 6 liters of solution A to produce a solution that is 30 percent salt?',
    ['1', '1.5', '2', '3', '4'],
    3,
    'Track the salt: 0.2(6) + 0.5b = 0.3(6 + b). So 1.2 + 0.5b = 1.8 + 0.3b, 0.2b = 0.6, and b = 3. Check: 1.2 + 1.5 = 2.7 liters of salt in 9 liters = 30% ✓.',
  ),
  ne(
    3,
    'quad',
    'What is the sum of all the values of x that satisfy the equation (x − 2)² = 3(x − 2)?',
    7,
    'Move everything to one side and factor: (x − 2)² − 3(x − 2) = (x − 2)(x − 2 − 3) = (x − 2)(x − 5) = 0, so x = 2 or x = 5, and the sum is 7. Dividing both sides by x − 2 loses the solution x = 2 and gives 5.',
  ),
  psMulti(
    3,
    'tri',
    'In triangle ABC, AB = 6 and BC = 9. Which of the following could be the area of triangle ABC?\n\nIndicate all such areas.',
    ['9', '18', '27', '30', '54'],
    [0, 1, 2],
    'Take AB = 6 as the base. The height from C to line AB is at most BC = 9, reached when angle B is a right angle, and it can be as small as you like. So the area can be anything greater than 0 up to (1/2)(6)(9) = 27. 9, 18, and 27 are possible; 30 and 54 are not.',
  ),
  ps(
    3,
    'circ',
    'In the figure above, the two circles have the same center O. Chord AB of the larger circle is tangent to the smaller circle at P, and AB = 16. What is the area of the region inside the larger circle and outside the smaller circle?',
    ['36π', '64π', '100π', '128π', '136π'],
    1,
    'OP is perpendicular to AB at the tangent point and bisects the chord, so AP = 8. In right triangle OPA, R² − r² = AP² = 64, where R and r are the radii. The ring’s area is πR² − πr² = π(R² − r²) = 64π — you never need the radii themselves.',
    { stimulus: { figure: rings } },
  ),
  ps(
    3,
    'fn',
    'The terms of a sequence are defined by aₙ = n² − n for each positive integer n. How many of the first 20 terms of the sequence are divisible by 4?',
    ['4', '5', '6', '8', '10'],
    4,
    'aₙ = n(n − 1), a product of consecutive integers; one is even, but for divisibility by 4 the even one must be a multiple of 4. That happens when n or n − 1 is a multiple of 4: n = 1, 4, 5, 8, 9, 12, 13, 16, 17, 20 — 10 terms (a₁ = 0 counts, since 0 is divisible by 4).',
  ),
  ne(
    3,
    'prob',
    'A bag contains 5 red, 4 green, and 3 yellow marbles. Marbles are drawn one at a time without looking. What is the least number of marbles that must be drawn to be certain that at least 4 of the marbles drawn are the same color?',
    10,
    'Find the most marbles you could draw without 4 of any color: at most 3 red, 3 green, and all 3 yellow — 9 marbles. The next marble must be red or green, making 4 of that color. So 10 marbles guarantee it.',
  ),
  ps(
    2,
    'rate',
    'Mia types 60 words per minute and Leo types 40 words per minute. They split a 2,000-word document between them so that they finish at the same time. How many words does Mia type?',
    ['600', '800', '900', '1,000', '1,200'],
    4,
    'Finishing together means they work for the same time, so they type in the ratio of their speeds, 60 : 40 = 3 : 2. Mia’s share: 3/5 × 2,000 = 1,200 words (in 20 minutes; Leo types 800 in the same 20).',
  ),
  ps(
    3,
    'int',
    'The product of two positive integers is 144, and their greatest common factor is 4. What is their least common multiple?',
    ['36', '48', '72', '144', '576'],
    0,
    'For any two positive integers, GCF × LCM = their product. So LCM = 144 ÷ 4 = 36. (Here the pair is 4 and 36 — GCF 4, LCM 36 — but the rule gives the answer without finding them.)',
  ),
  ne(
    2,
    'circ',
    'A rectangular box has dimensions 3 inches by 4 inches by 12 inches. What is the length, in inches, of the longest straight rod that fits inside the box, from one corner to the opposite corner?',
    13,
    'The diagonal of the 3-by-4 base is √(9 + 16) = 5. That diagonal and the 12-inch height form a right triangle whose hypotenuse is the box’s diagonal: √(25 + 144) = √169 = 13. (All at once: √(3² + 4² + 12²) = 13.)',
  ),
  ps(
    2,
    'exp',
    'If 10ˣ = 0.001, what is the value of x?',
    ['−3', '−1/3', '0.001', '1/3', '3'],
    0,
    '0.001 = 1/1,000 = 1/10³ = 10⁻³, so x = −3. (E) forgets that a number less than 1 needs a negative exponent.',
  ),
]);
