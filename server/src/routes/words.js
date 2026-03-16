const express = require('express');
const Word = require('../models/Word');
const Category = require('../models/Category');
const { success } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get(
  '/study/:categorySlug',
  asyncHandler(async (req, res) => {
    const { categorySlug } = req.params;
    const { difficulty } = req.query;
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }
    const query = { category: category._id };
    if (difficulty) query.difficulty = difficulty;
    const words = await Word.find(query).sort({ difficulty: 1, chinese: 1 });
    return success(res, words);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const word = await Word.findById(req.params.id).populate('category', 'name slug icon color');
    if (!word) {
      return res.status(404).json({ success: false, error: { message: 'Word not found', code: 'NOT_FOUND' } });
    }
    return success(res, word);
  })
);

module.exports = router;
