const mongoose = require('mongoose');

const grammarExampleSchema = new mongoose.Schema({
  chinese: { type: String, required: true },
  pinyin: { type: String, required: true },
  translation: {
    ru: { type: String },
    en: { type: String }
  }
}, { _id: false });

const grammarRuleSchema = new mongoose.Schema({
  title: {
    zh: { type: String },
    ru: { type: String },
    en: { type: String }
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  explanation: {
    ru: { type: String },
    en: { type: String }
  },
  pattern: { type: String },
  examples: [grammarExampleSchema],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  relatedWords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }]
}, { timestamps: true });

grammarRuleSchema.index({ category: 1 });

module.exports = mongoose.model('GrammarRule', grammarRuleSchema);
