/**
 * SM-2 spaced repetition algorithm
 * @param {number} quality - 0-5 (0-2 = again, 3 = hard, 4 = good, 5 = easy)
 * @param {number} [prevEaseFactor=2.5] - Previous ease factor
 * @param {number} [prevInterval=0] - Previous interval in days
 * @param {number} [repetitions=0] - Number of successful repetitions
 * @returns {{ easeFactor: number, interval: number, repetitions: number, nextReview: Date }}
 */
export function calculateSM2(
  quality,
  prevEaseFactor = 2.5,
  prevInterval = 0,
  repetitions = 0
) {
  let easeFactor =
    prevEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  let interval;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(prevInterval * easeFactor);
  }

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { easeFactor, interval, repetitions, nextReview };
}
