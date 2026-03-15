const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  status: {
    type: String,
    enum: ['new', 'learning', 'review', 'known'],
    default: 'new'
  },
  correctCount: { type: Number, default: 0 },
  incorrectCount: { type: Number, default: 0 },
  lastReviewed: { type: Date },
  nextReview: { type: Date },
  easeFactor: { type: Number, default: 2.5 },
  interval: { type: Number, default: 0 },
  repetitions: { type: Number, default: 0 }
}, { timestamps: true });

progressSchema.index({ userId: 1, wordId: 1 }, { unique: true });
progressSchema.index({ userId: 1, status: 1 });
progressSchema.index({ userId: 1, nextReview: 1 });

module.exports = mongoose.model('Progress', progressSchema);
