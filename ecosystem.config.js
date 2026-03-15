module.exports = {
  apps: [{
    name: 'hanyu-api',
    script: 'server/src/index.js',
    cwd: '/var/www/hanyu',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      MONGODB_URI: 'mongodb://localhost:27017/hanyu',
      REDIS_URL: 'redis://localhost:6379',
      JWT_SECRET: 'CHANGE_THIS_IN_PRODUCTION',
      JWT_EXPIRES_IN: '30d'
    },
    instances: 1,
    autorestart: true,
    max_memory_restart: '256M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};
