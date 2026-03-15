const Redis = require('ioredis');

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
let redis = null;

function connectRedis() {
  try {
    redis = new Redis(redisUrl);
    redis.on('error', (err) => {
      console.error('Redis connection error:', err.message);
    });
    redis.on('connect', () => {
      console.log('Redis connected');
    });
  } catch (err) {
    console.error('Redis init error:', err.message);
  }
}

async function getCache(key) {
  if (!redis) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Redis getCache error:', err.message);
    return null;
  }
}

async function setCache(key, data, ttl = 3600) {
  if (!redis) return;
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (err) {
    console.error('Redis setCache error:', err.message);
  }
}

async function delCache(key) {
  if (!redis) return;
  try {
    await redis.del(key);
  } catch (err) {
    console.error('Redis delCache error:', err.message);
  }
}

module.exports = {
  get redis() {
    return redis;
  },
  connectRedis,
  getCache,
  setCache,
  delCache
};
