module.exports = [
  {
    title: { zh: '一点儿 vs 有点儿', pinyin: 'Yīdiǎnr vs yǒudiǎnr', ru: 'Разница между 一点儿 и 有点儿', en: 'Difference between 一点儿 and 有点儿' },
    explanation: { ru: '一点儿 означает "немного" и используется после прилагательного для смягчения запроса или сравнения. 有点儿 означает "немного" с негативным оттенком и ставится перед прилагательным.', en: '一点儿 means "a little" and is used after an adjective to soften a request or comparison. 有点儿 means "a bit" with a negative connotation and is placed before an adjective.' },
    pattern: 'adj + 一点儿 (request/comparison) | 有点儿 + adj (complaint)',
    examples: [
      { chinese: '请给我少一点儿盐。', pinyin: 'Qǐng gěi wǒ shǎo yīdiǎnr yán.', translation: { ru: 'Положите мне поменьше соли.', en: 'Please give me a little less salt.' } },
      { chinese: '这道菜有点儿辣。', pinyin: 'Zhè dào cài yǒudiǎnr là.', translation: { ru: 'Это блюдо немного острое.', en: 'This dish is a bit spicy.' } },
      { chinese: '能便宜一点儿吗？', pinyin: 'Néng piányi yīdiǎnr ma?', translation: { ru: 'Можно немного дешевле?', en: 'Can it be a little cheaper?' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '多/少 + 动词', pinyin: 'Duō/shǎo + dòngcí', ru: 'Больше/меньше + глагол', en: 'More/less + verb' },
    explanation: { ru: '多 и 少 ставятся перед глаголом для обозначения "больше/меньше делать что-то". Часто используется для советов о еде и здоровье.', en: '多 and 少 are placed before verbs to mean "do more/less of something". Often used for advice about food and health.' },
    pattern: '多/少 + verb + (object)',
    examples: [
      { chinese: '多吃蔬菜，少吃糖。', pinyin: 'Duō chī shūcài, shǎo chī táng.', translation: { ru: 'Ешь больше овощей, меньше сладкого.', en: 'Eat more vegetables, less sugar.' } },
      { chinese: '多喝水对身体好。', pinyin: 'Duō hē shuǐ duì shēntǐ hǎo.', translation: { ru: 'Пить больше воды полезно для здоровья.', en: 'Drinking more water is good for health.' } },
      { chinese: '少放一点儿油。', pinyin: 'Shǎo fàng yīdiǎnr yóu.', translation: { ru: 'Положи поменьше масла.', en: 'Add a little less oil.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '食物量词', pinyin: 'Shíwù liàngcí', ru: 'Счётные слова для еды', en: 'Measure words for food' },
    explanation: { ru: 'В китайском языке перед существительными еды используются специальные счётные слова: 碗 (миска), 杯 (стакан/чашка), 瓶 (бутылка), 块 (кусок), 片 (ломтик), 盘 (тарелка), 份 (порция).', en: 'Chinese uses specific measure words before food nouns: 碗 (bowl), 杯 (cup/glass), 瓶 (bottle), 块 (piece), 片 (slice), 盘 (plate), 份 (portion).' },
    pattern: 'number + measure word + food noun',
    examples: [
      { chinese: '我要一碗米饭和两杯茶。', pinyin: 'Wǒ yào yī wǎn mǐfàn hé liǎng bēi chá.', translation: { ru: 'Мне одну миску риса и два стакана чая.', en: 'I want a bowl of rice and two cups of tea.' } },
      { chinese: '请给我三片面包。', pinyin: 'Qǐng gěi wǒ sān piàn miànbāo.', translation: { ru: 'Дайте мне три ломтика хлеба.', en: 'Please give me three slices of bread.' } },
      { chinese: '来一份宫保鸡丁。', pinyin: 'Lái yī fèn gōngbǎo jīdīng.', translation: { ru: 'Одну порцию курицы гунбао.', en: 'One serving of Kung Pao Chicken.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '又...又... 描述食物', pinyin: 'Yòu...yòu... miáoshù shíwù', ru: 'Конструкция 又...又... для описания еды', en: 'Using 又...又... to describe food' },
    explanation: { ru: 'Конструкция 又...又... используется для одновременного описания двух качеств. Часто применяется для описания вкуса и свойств еды.', en: 'The 又...又... construction is used to describe two qualities simultaneously. Often used to describe food taste and properties.' },
    pattern: '又 + adj1 + 又 + adj2',
    examples: [
      { chinese: '这道菜又香又辣。', pinyin: 'Zhè dào cài yòu xiāng yòu là.', translation: { ru: 'Это блюдо и ароматное, и острое.', en: 'This dish is both fragrant and spicy.' } },
      { chinese: '西瓜又甜又便宜。', pinyin: 'Xīguā yòu tián yòu piányi.', translation: { ru: 'Арбуз и сладкий, и дешёвый.', en: 'Watermelon is both sweet and cheap.' } },
      { chinese: '这个蛋糕又好吃又好看。', pinyin: 'Zhège dàngāo yòu hǎochī yòu hǎokàn.', translation: { ru: 'Этот торт и вкусный, и красивый.', en: 'This cake is both delicious and beautiful.' } },
    ],
    difficulty: 'medium'
  },
];
