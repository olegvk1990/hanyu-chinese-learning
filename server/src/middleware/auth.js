const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { error } = require('../utils/response');

const secret = process.env.JWT_SECRET || 'hanyu-secret-key';
const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

function generateToken(userId) {
  return jwt.sign({ userId }, secret, { expiresIn });
}

async function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'No token provided', 401, 'UNAUTHORIZED');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return error(res, 'User not found', 401, 'UNAUTHORIZED');
    }
    req.user = user;
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token', 401, 'UNAUTHORIZED');
  }
}

module.exports = {
  generateToken,
  protect
};
