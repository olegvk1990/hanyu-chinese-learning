require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Word = require('../models/Word');
const GrammarRule = require('../models/GrammarRule');
const categories = require('./categories');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hanyu');
    console.log('Connected to MongoDB');

    // Seed categories
    for (const cat of categories) {
      await Category.findOneAndUpdate(
        { slug: cat.slug },
        cat,
        { upsert: true, new: true }
      );
    }
    console.log(`Seeded ${categories.length} categories`);

    // Seed words from each file
    const wordFiles = [
      'body', 'food', 'verbs', 'adjectives', 'feelings',
      'furniture', 'materials', 'furniture-terms', 'finishing', 'consumables',
      'business', 'business-phrases',
      'location', 'comparisons', 'idioms'
    ];

    for (const file of wordFiles) {
      try {
        const words = require(`./words/${file}`);
        const category = await Category.findOne({ slug: file });
        if (!category) {
          console.log(`Category ${file} not found, skipping`);
          continue;
        }

        let count = 0;
        for (const word of words) {
          await Word.findOneAndUpdate(
            { chinese: word.chinese, category: category._id },
            { ...word, category: category._id },
            { upsert: true, new: true }
          );
          count++;
        }

        // Update word count
        const totalWords = await Word.countDocuments({ category: category._id });
        await Category.findByIdAndUpdate(category._id, { wordCount: totalWords });

        console.log(`Seeded ${count} words for ${file} (total: ${totalWords})`);
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          console.log(`Word file for ${file} not found, skipping`);
        } else {
          console.error(`Error seeding ${file}:`, e.message);
        }
      }
    }

    // Seed grammar rules
    try {
      const grammarFiles = [
        'body', 'food', 'verbs', 'adjectives', 'feelings',
        'furniture', 'materials', 'furniture-terms', 'finishing', 'consumables',
        'business', 'business-phrases',
        'location', 'comparisons', 'idioms'
      ];

      for (const file of grammarFiles) {
        try {
          const rules = require(`./grammar/${file}`);
          const category = await Category.findOne({ slug: file });
          if (!category) continue;

          for (const rule of rules) {
            await GrammarRule.findOneAndUpdate(
              { 'title.zh': rule.title.zh, category: category._id },
              { ...rule, category: category._id },
              { upsert: true, new: true }
            );
          }
          console.log(`Seeded ${rules.length} grammar rules for ${file}`);
        } catch (e) {
          if (e.code === 'MODULE_NOT_FOUND') continue;
          console.error(`Error seeding grammar for ${file}:`, e.message);
        }
      }
    } catch (e) {
      console.error('Error seeding grammar:', e.message);
    }

    console.log('\nSeed completed!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
