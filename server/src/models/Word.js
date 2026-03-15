const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  chinese: { type: String, required: true },
  pinyin: { type: String, required: true },
  translation: {
    ru: { type: String },
    en: { type: String }
  },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
}, { _id: false });

const wordSchema = new mongoose.Schema({
  chinese: { type: String, required: true },
  pinyin: { type: String, required: true },
  translations: {
    ru: { type: String },
    en: { type: String }
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  examples: [exampleSchema],
  grammarNote: { type: String },
  hskLevel: { type: Number, min: 1, max: 6 },
  tags: [{ type: String }]
}, { timestamps: true });

wordSchema.index({ category: 1, difficulty: 1 });

module.exports = mongoose.model('Word', wordSchema);
