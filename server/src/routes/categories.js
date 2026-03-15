const express = require('express');
const Category = require('../models/Category');
const Word = require('../models/Word');
const { success } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');
const { getCache, setCache } = require('../utils/redis');

const router = express.Router();
const CACHE_KEY = 'hanyu:categories';
const CACHE_TTL = 3600;

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const cached = await getCache(CACHE_KEY);
    if (cached) {
      return success(res, cached);
    }
    const categories = await Category.find().sort({ order: 1 });
    await setCache(CACHE_KEY, categories, CACHE_TTL);
    return success(res, categories);
  })
);

router.get(
  '/:slug/words',
  asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const { difficulty, page = 1, limit = 20 } = req.query;
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const cacheKey = `hanyu:categories:${slug}:${difficulty || 'all'}:${pageNum}:${limitNum}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }
    const query = { category: category._id };
    if (difficulty) query.difficulty = difficulty;
    const skip = (pageNum - 1) * limitNum;
    const [words, total] = await Promise.all([
      Word.find(query).skip(skip).limit(limitNum).populate('category', 'name slug'),
      Word.countDocuments(query)
    ]);
    const response = {
      success: true,
      data: words,
      pagination: { total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) || 1 }
    };
    await setCache(cacheKey, response, CACHE_TTL);
    return res.status(200).json(response);
  })
);

module.exports = router;
