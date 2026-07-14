import type { CheatsheetData } from '@/lib/types';

export const CHEATSHEET: CheatsheetData = {
  lessonId: 'big-o',
  opsTable: [
    { op: 'O(g) — upper bound', complexity: 'f ≤ c·g eventually', note: '"no worse than", constants excused' },
    { op: 'Ω(g) — lower bound', complexity: 'f ≥ c·g eventually', note: '"at least this bad"' },
    { op: 'Θ(g) — tight bound', complexity: 'both at once', note: 'what people usually mean by O' },
    { op: 'drop constants', complexity: '3n² + 50n → Θ(n²)', note: 'fastest-growing term wins' },
    { op: 'nested triangle loop', complexity: 'Σi = n(n−1)/2 → Θ(n²)', note: 'count, don’t pattern-match' },
  ],
  useWhen:
    'Predicting how work scales when n grows 10×, 100×; comparing algorithms before writing either; explaining why the demo died in production.',
  dontUseWhen:
    'n is small and fixed (constants dominate), or two candidates share a class (then measure — Timsort beats mergesort by constants, not class).',
  stdlib: 'no import — it’s a lens, not a library',
  bullets: [
    'Big-O is a ceiling on growth, eventually, up to a constant. Θ adds the matching floor.',
    'log n = "how many halvings until 1". If nothing halves, there is no log.',
    'Worst/average/best case is a separate axis from O/Θ/Ω — you can bound any case with any symbol.',
    'The autocomplete rule: O(n²) feels instant at n=100 (10⁴ ops) and is dead at n=10,000 (10⁸ ops).',
  ],
  gotchas: [
    'in on a list is O(n); on a set/dict it is O(1) average. Same keyword, different class.',
    's += piece in a loop rebuilds the string each time — O(n²) total. Use "".join(parts).',
  ],
};
