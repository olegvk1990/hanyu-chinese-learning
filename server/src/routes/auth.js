const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { success, error } = require('../utils/response');
const { asyncHandler } = require('../middleware/errorHandler');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

function toUserResponse(user) {
  const obj = user.toObject();
  delete obj.passwordHash;
  return obj;
}

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return error(res, 'Email, password and name are required', 400, 'VALIDATION_ERROR');
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return error(res, 'User with this email already exists', 400, 'DUPLICATE_EMAIL');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email.toLowerCase().trim(),
      passwordHash,
      name: name.trim()
    });
    const token = generateToken(user._id);
    return success(res, { token, user: toUserResponse(user) }, 201);
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, 'Email and password are required', 400, 'VALIDATION_ERROR');
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return error(res, 'Invalid email or password', 401, 'AUTH_FAILED');
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return error(res, 'Invalid email or password', 401, 'AUTH_FAILED');
    }
    const token = generateToken(user._id);
    return success(res, { token, user: toUserResponse(user) });
  })
);

module.exports = router;
