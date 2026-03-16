const express = require('express');
const Progress = require('../models/Progress');
const User = require('../models/User');
const { success } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);

// SM-2 algorithm: quality 5 = correct, 0 = incorrect
function calcNextReview(progress, correct) {
  const quality = correct ? 5 : 0;
  const now = new Date();
  let { easeFactor, interval, repetitions } = progress;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    const q = quality;
    easeFactor = Math.max(0.1, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return { easeFactor, interval, repetitions, nextReview };
}

router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const stats = await Progress.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    const total = await Progress.countDocuments({ userId });
    const byStatus = stats.reduce((acc, s) => {
      acc[s._id] = s.count;
      return acc;
    }, {});
    return success(res, {
      byStatus,
      totalWordsStudied: total
    });
  })
);

router.post(
  '/:wordId',
  asyncHandler(async (req, res) => {
    const { wordId } = req.params;
    const { status, correct } = req.body;
    const userId = req.user._id;

    let progress = await Progress.findOne({ userId, wordId });
    const now = new Date();

    if (!progress) {
      progress = new Progress({ userId, wordId });
    }

    if (typeof correct === 'boolean') {
      if (correct) progress.correctCount += 1;
      else progress.incorrectCount += 1;
      const { easeFactor, interval, repetitions, nextReview } = calcNextReview(progress, correct);
      progress.easeFactor = easeFactor;
      progress.interval = interval;
      progress.repetitions = repetitions;
      progress.nextReview = nextReview;
    }

    progress.lastReviewed = now;
    if (status) progress.status = status;

    await progress.save();
    return success(res, progress);
  })
);

router.get(
  '/review',
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const now = new Date();
    const items = await Progress.find({
      userId,
      nextReview: { $lte: now },
      status: { $in: ['learning', 'review'] }
    })
      .populate('wordId')
      .sort({ nextReview: 1 });
    return success(res, items);
  })
);

router.get(
  '/learned',
  asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const items = await Progress.find({ userId, status: 'known' })
      .populate({
        path: 'wordId',
        populate: { path: 'category', select: 'name slug' }
      });
    return success(res, items);
  })
);

router.get(
  '/study-state',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('studyState');
    return success(res, user?.studyState ?? {});
  })
);

router.put(
  '/study-state',
  asyncHandler(async (req, res) => {
    const { categorySlug, state } = req.body;
    if (!categorySlug || !state) {
      return res.status(400).json({ success: false, error: 'categorySlug and state required' });
    }
    const update = {};
    update[`studyState.${categorySlug}`] = {
      currentIndex: state.currentIndex ?? 0,
      difficulty: state.difficulty ?? '',
      showPinyin: state.showPinyin ?? true,
      viewMode: state.viewMode ?? 'cards',
      learnedIds: state.learnedIds ?? [],
      selectedWordIds: state.selectedWordIds ?? [],
      ts: Date.now()
    };
    await User.findByIdAndUpdate(req.user._id, { $set: update });
    return success(res, { saved: true });
  })
);

module.exports = router;
