const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  preferredLang: {
    type: String,
    enum: ['ru', 'en'],
    default: 'ru'
  },
  studyState: {
    type: Map,
    of: {
      currentIndex: { type: Number, default: 0 },
      difficulty: { type: String, default: '' },
      showPinyin: { type: Boolean, default: true },
      viewMode: { type: String, default: 'cards' },
      learnedIds: [String],
      selectedWordIds: [String],
      ts: Number
    },
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
