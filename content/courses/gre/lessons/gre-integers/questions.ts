import type { Question } from '@/lib/types';

// Practice questions for "Integers, divisibility, primes & remainders" —
// two per idea, in lesson order. Explanations walk through every step.

export const QUESTIONS: Question[] = [
  // --- primes -------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-int-prime',
    lessonId: 'gre-integers',
    difficulty: 1,
    prompt: 'Which of the following is a prime number?',
    options: ['51', '57', '87', '89', '91'],
    correctIndex: 3,
    explanation:
      'Every choice is under 100, and 10 × 10 = 100, so it is enough to test the primes 2, 3, 5, and 7.\n**Step 1:** None is even and none ends in 5, so 2 and 5 are out.\n**Step 2:** Test 3 with digit sums: 51 → 6, 57 → 12, 87 → 15 are all multiples of 3, so 51 = 3 × 17, 57 = 3 × 19, 87 = 3 × 29.\n**Step 3:** That leaves 89 and 91. 91 = 7 × 13, but 89 has no factor among 2, 3, 5, 7.\n**Answer:** **89**.',
    distractorNotes: [
      '51 = 3 × 17 (digit sum 6).',
      '57 = 3 × 19 (digit sum 12).',
      '87 = 3 × 29 (digit sum 15).',
      'Correct — no prime up to 7 divides it.',
      '91 = 7 × 13 — the classic “looks prime” trap.',
    ],
  },
  {
    kind: 'mcq',
    id: 'gre-int-prime-count',
    lessonId: 'gre-integers',
    difficulty: 1,
    prompt: 'How many prime numbers are greater than 30 and less than 50?',
    options: ['4', '5', '6', '7', '8'],
    correctIndex: 1,
    explanation:
      'Only odd numbers can be prime here, so check 31, 33, 35, …, 49. 7 × 7 = 49, so testing 3, 5, and 7 is enough.\n**Step 1:** Cross out multiples of 3: 33, 39, 45. Multiples of 5: 35, 45. Multiples of 7: 35, 49.\n**Step 2:** What’s left: 31, 37, 41, 43, 47.\n**Answer:** **5** primes.',
    distractorNotes: [
      'You missed one — list every odd number and cross out the multiples of 3, 5, and 7.',
      'Correct: 31, 37, 41, 43, 47.',
      'Did you count 49? It is 7 × 7.',
      'Too many — 33, 35, 39, 45, and 49 all have small factors.',
      'That counts some composite numbers, such as 39 = 3 × 13.',
    ],
  },
  // --- prime factorization -------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-int-factorize',
    lessonId: 'gre-integers',
    difficulty: 1,
    prompt: 'What is the prime factorization of 252?',
    options: ['2² × 3² × 7', '2 × 3 × 42', '4 × 9 × 7', '2³ × 3 × 7', '2² × 3 × 21'],
    correctIndex: 0,
    explanation:
      'Build a factor tree: 252 = 4 × 63, and 63 = 9 × 7.\n**Step 1:** Break the non-primes down: 4 = 2 × 2 and 9 = 3 × 3.\n**Step 2:** Collect the primes: 2, 2, 3, 3, 7.\n**Answer:** **2² × 3² × 7**. (Check: 4 × 9 × 7 = 252.)',
    distractorNotes: [
      'Correct — every factor is prime and the product is 252.',
      'The product is 252, but 42 is not prime (42 = 2 × 3 × 7).',
      'The product is 252, but 4 and 9 are not prime.',
      '2³ × 3 × 7 = 168, not 252.',
      '21 is not prime (21 = 3 × 7).',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-int-exponents',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'If x and y are positive integers and 2ˣ × 3ʸ = 72, what is the value of x + y?',
    answer: 5,
    answerDisplay: '5',
    explanation:
      '**Step 1:** Prime-factorize 72: 72 = 8 × 9 = 2³ × 3².\n**Step 2:** A number has only one prime factorization, so matching the two forms gives x = 3 and y = 2.\n**Step 3:** x + y = 3 + 2 = **5**.',
  },
  // --- counting factors -------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-int-divisors',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'How many positive divisors does 72 have?',
    answer: 12,
    answerDisplay: '12',
    explanation:
      '**Step 1:** Prime-factorize: 72 = 2³ × 3².\n**Step 2:** Add 1 to each exponent: 3 + 1 = 4 and 2 + 1 = 3.\n**Step 3:** Multiply: 4 × 3 = **12**.\nCheck by listing in pairs: 1 × 72, 2 × 36, 3 × 24, 4 × 18, 6 × 12, 8 × 9 — twelve divisors.',
  },
  {
    kind: 'mcq',
    id: 'gre-int-most-divisors',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'Which of the following numbers has the greatest number of positive divisors?',
    options: ['36', '48', '50', '64', '81'],
    correctIndex: 1,
    explanation:
      'Factorize each number, then add 1 to each exponent and multiply:\n36 = 2² × 3² → 3 × 3 = 9\n48 = 2⁴ × 3 → 5 × 2 = 10\n50 = 2 × 5² → 2 × 3 = 6\n64 = 2⁶ → 7\n81 = 3⁴ → 5\n**Answer:** **48**, with 10 divisors. The biggest number doesn’t win — what matters is how its primes are spread out.',
    distractorNotes: [
      '36 has 9 divisors — close, but 48 has 10.',
      'Correct: 2⁴ × 3 gives (4 + 1)(1 + 1) = 10.',
      '50 = 2 × 5² has only 6.',
      '64 = 2⁶ has only 7 — one prime, even with a big exponent, gives few divisors.',
      '81 = 3⁴ has only 5.',
    ],
  },
  // --- GCF and LCM -------------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-int-lcm-lights',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt:
      'Light A flashes every 8 seconds and light B flashes every 12 seconds. They flash together at exactly 12:00 noon. How many more times will they flash together from then until 12:02 p.m., including 12:02 p.m.?',
    answer: 5,
    answerDisplay: '5',
    explanation:
      '“Next time they happen together” is an LCM question.\n**Step 1:** LCM of 8 and 12: 8 = 2³ and 12 = 2² × 3, so LCM = 2³ × 3 = 24. They flash together every 24 seconds.\n**Step 2:** From noon to 12:02 is 120 seconds.\n**Step 3:** Joint flashes after noon: 24, 48, 72, 96, 120 seconds — that is 120 ÷ 24 = **5** times.',
  },
  {
    kind: 'mcq',
    id: 'gre-int-gcf-lcm-product',
    lessonId: 'gre-integers',
    difficulty: 3,
    prompt: 'The greatest common factor of two positive integers is 6, and their least common multiple is 90. If one of the integers is 18, what is the other?',
    options: ['15', '24', '30', '36', '45'],
    correctIndex: 2,
    explanation:
      'Use the fact GCF × LCM = the product of the two numbers.\n**Step 1:** 6 × 90 = 540, so 18 × (other) = 540.\n**Step 2:** other = 540 ÷ 18 = **30**.\nCheck: 18 = 2 × 3² and 30 = 2 × 3 × 5. Shared primes at the smaller power: 2 × 3 = 6 ✓. All primes at the larger power: 2 × 3² × 5 = 90 ✓.',
    distractorNotes: [
      'GCF(18, 15) = 3, not 6.',
      'GCF(18, 24) = 6, but LCM(18, 24) = 72, not 90.',
      'Correct: 6 × 90 ÷ 18 = 30.',
      'GCF(18, 36) = 18, not 6.',
      'GCF(18, 45) = 9, not 6.',
    ],
  },
  // --- remainders ---------------------------------------------------------------
  {
    kind: 'mcq',
    id: 'gre-int-remainder',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'When the positive integer k is divided by 6, the remainder is 4. What is the remainder when 3k is divided by 6?',
    options: ['0', '1', '2', '4', '12'],
    correctIndex: 0,
    explanation:
      '**Step 1:** Pick the simplest k that works: k = 4 (4 ÷ 6 is 0 with 4 left over).\n**Step 2:** 3k = 12.\n**Step 3:** 12 ÷ 6 = 2 with nothing left over — remainder **0**.\nDouble-check with the next k, 10: 3k = 30, and 30 ÷ 6 = 5, remainder 0 again ✓.',
    distractorNotes: [
      'Correct.',
      'Recompute: 3 × 4 = 12, which 6 divides exactly.',
      '12 ÷ 6 leaves nothing over, not 2.',
      'The remainder changes when you multiply k by 3 — it isn’t still 4.',
      'A remainder must be smaller than the divisor, 6.',
    ],
  },
  {
    kind: 'numeric',
    id: 'gre-int-remainder-two',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'When the positive integer n is divided by 4, the remainder is 3. When n is divided by 5, the remainder is 1. What is the smallest possible value of n?',
    answer: 11,
    answerDisplay: '11',
    explanation:
      '**Step 1:** List numbers that leave remainder 3 when divided by 4: 3, 7, 11, 15, 19, …\n**Step 2:** Test each one against the second condition (remainder 1 when divided by 5):\n3 → remainder 3 ✗\n7 → remainder 2 ✗\n11 → 11 = 5 × 2 + 1, remainder 1 ✓\n**Answer:** **11**.',
  },
  // --- odd/even and signs -------------------------------------------------------
  {
    kind: 'multi',
    id: 'gre-int-parity',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'If a is an odd integer and b is an even integer, which of the following must be odd?\n\nIndicate all such expressions.',
    options: ['a + b', 'ab', 'a² + b', '2a + b', 'ab + 1'],
    correctIndices: [0, 2, 4],
    explanation:
      'Try a = 1 (odd) and b = 2 (even):\na + b = 3, odd\nab = 2, even\na² + b = 1 + 2 = 3, odd\n2a + b = 2 + 2 = 4, even\nab + 1 = 2 + 1 = 3, odd\nThe rules confirm these for every odd a and even b: odd + even = odd; anything × even = even; even + 1 = odd.',
    distractorNotes: [
      '✓ odd + even = odd.',
      '✗ anything times an even number is even.',
      '✓ odd × odd = odd, then odd + even = odd.',
      '✗ 2a is even (it’s 2 times something), and even + even = even.',
      '✓ ab is even, so ab + 1 is odd.',
    ],
  },
  {
    kind: 'multi',
    id: 'gre-int-signs',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'If mn < 0 and n > 0, which of the following must be positive?\n\nIndicate all such expressions.',
    options: ['mn²', 'm²', '−m', 'm + n', 'n − m'],
    correctIndices: [1, 2, 4],
    explanation:
      '**Step 1:** mn is negative and n is positive, so m must be negative.\n**Step 2:** Try m = −2, n = 3 and check each choice — then ask whether other numbers could change the sign:\nmn² = −2 × 9 = −18, negative ✗\nm² = 4, and a square of a nonzero number is always positive ✓\n−m = 2 — the opposite of a negative is positive ✓\nm + n = 1 here, but with m = −5, n = 3 it is −2, so not “must” ✗\nn − m = 3 − (−2) = 5; positive minus negative is always positive ✓',
    distractorNotes: [
      '✗ n² is positive, and a negative times a positive is negative.',
      '✓ m is not 0, so m² is positive.',
      '✓ m is negative, so −m is positive.',
      '✗ It depends on which is bigger in size: try m = −5, n = 3.',
      '✓ Subtracting a negative adds: n − m = n + |m|.',
    ],
  },
  // --- consecutive integers ---------------------------------------------------------
  {
    kind: 'numeric',
    id: 'gre-int-consecutive',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'The sum of 5 consecutive even integers is 130. What is the least of these integers?',
    answer: 22,
    answerDisplay: '22',
    explanation:
      '**Step 1:** Average = sum ÷ count = 130 ÷ 5 = 26.\n**Step 2:** In an evenly spaced list, the average is the middle number, so 26 is the 3rd of the 5 integers.\n**Step 3:** Consecutive even integers step by 2, so the list is 22, 24, 26, 28, 30.\n**Answer:** the least is **22**. (Check: 22 + 24 + 26 + 28 + 30 = 130 ✓)',
  },
  {
    kind: 'numeric',
    id: 'gre-int-count-multiples',
    lessonId: 'gre-integers',
    difficulty: 2,
    prompt: 'How many integers from 15 to 75, inclusive, are multiples of 5?',
    answer: 13,
    answerDisplay: '13',
    explanation:
      'The multiples are 15, 20, 25, …, 75 — an evenly spaced list that steps by 5.\n**Step 1:** Number of terms = (last − first) ÷ step + 1 = (75 − 15) ÷ 5 + 1.\n**Step 2:** 60 ÷ 5 = 12, and 12 + 1 = **13**.\nThe trap is stopping at 12: “inclusive” means both 15 and 75 count.',
  },
];
