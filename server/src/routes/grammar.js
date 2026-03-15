const express = require('express');
const GrammarRule = require('../models/GrammarRule');
const Category = require('../models/Category');
const { success } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category: categorySlug } = req.query;
    let query = {};
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      if (category) query.category = category._id;
    }
    const rules = await GrammarRule.find(query).populate('category', 'name slug');
    return success(res, rules);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const rule = await GrammarRule.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('relatedWords', 'chinese pinyin translations');
    if (!rule) {
      return res.status(404).json({ success: false, error: { message: 'Grammar rule not found', code: 'NOT_FOUND' } });
    }
    return success(res, rule);
  })
);

module.exports = router;
