const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    zh: { type: String, required: true },
    ru: { type: String, required: true },
    en: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'book' },
  order: { type: Number, default: 0 },
  wordCount: { type: Number, default: 0 },
  color: { type: String, default: '#FF6B6B' }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
