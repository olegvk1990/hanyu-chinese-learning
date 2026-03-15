require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectRedis } = require('./utils/redis');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const wordsRoutes = require('./routes/words');
const grammarRoutes = require('./routes/grammar');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/words', wordsRoutes);
app.use('/api/grammar', grammarRoutes);
app.use('/api/progress', progressRoutes);

// Error handler
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hanyu')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Connect to Redis
connectRedis();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
