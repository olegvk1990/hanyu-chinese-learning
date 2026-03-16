module.exports = [
  {
    title: { zh: '是...的 — 描述材料', ru: 'Конструкция 是...的 для описания материала', en: 'Using 是...的 to describe material' },
    explanation: { ru: 'Конструкция 是 + материал + 的 описывает, из чего сделан предмет. Можно использовать с 用 для уточнения: 是用...做的.', en: 'The construction 是 + material + 的 describes what something is made of. Can be combined with 用 for clarification: 是用...做的.' },
    pattern: 'object + 是 + (用) + material + 做的/的',
    examples: [
      { chinese: '这张桌子是木头的。', pinyin: 'Zhè zhāng zhuōzi shì mùtou de.', translation: { ru: 'Этот стол деревянный.', en: 'This table is made of wood.' } },
      { chinese: '这个杯子是用玻璃做的。', pinyin: 'Zhège bēizi shì yòng bōlí zuò de.', translation: { ru: 'Этот стакан сделан из стекла.', en: 'This cup is made of glass.' } },
      { chinese: '这件衣服是纯棉的。', pinyin: 'Zhè jiàn yīfu shì chúnmián de.', translation: { ru: 'Эта одежда из чистого хлопка.', en: 'This garment is made of pure cotton.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '用...做/造', ru: 'Использование 用...做/造', en: 'Using 用...做/造' },
    explanation: { ru: '用 означает "использовать". Конструкция 用 + материал + 做/造 означает "делать/строить из материала".', en: '用 means "to use". The construction 用 + material + 做/造 means "to make/build from material".' },
    pattern: '用 + material + 做/造 + object',
    examples: [
      { chinese: '中国人用竹子做很多东西。', pinyin: 'Zhōngguórén yòng zhúzi zuò hěn duō dōngxi.', translation: { ru: 'Китайцы делают много вещей из бамбука.', en: 'Chinese people make many things from bamboo.' } },
      { chinese: '这座桥是用石头造的。', pinyin: 'Zhè zuò qiáo shì yòng shítou zào de.', translation: { ru: 'Этот мост построен из камня.', en: 'This bridge is built from stone.' } },
      { chinese: '我们用回收材料做了一个花盆。', pinyin: 'Wǒmen yòng huíshōu cáiliào zuò le yī gè huāpén.', translation: { ru: 'Мы сделали цветочный горшок из переработанных материалов.', en: 'We made a flowerpot from recycled materials.' } },
    ],
    difficulty: 'medium'
  },
  {
    title: { zh: '材料量词', ru: 'Счётные слова для материалов', en: 'Measure words for materials' },
    explanation: { ru: 'Разные материалы используют специальные счётные слова: 块 (кусок — камень, металл), 张 (лист — бумага, кожа), 根 (стержень — трубка, палка), 卷 (рулон — ткань, бумага), 堆 (куча — песок, земля).', en: 'Different materials use specific measure words: 块 (piece — stone, metal), 张 (sheet — paper, leather), 根 (rod — pipe, stick), 卷 (roll — fabric, paper), 堆 (pile — sand, soil).' },
    pattern: 'number + measure word + material',
    examples: [
      { chinese: '我需要三块木板。', pinyin: 'Wǒ xūyào sān kuài mùbǎn.', translation: { ru: 'Мне нужно три доски.', en: 'I need three wooden boards.' } },
      { chinese: '请给我一卷布。', pinyin: 'Qǐng gěi wǒ yī juǎn bù.', translation: { ru: 'Дайте мне один рулон ткани.', en: 'Please give me a roll of fabric.' } },
      { chinese: '工地上有一大堆沙子。', pinyin: 'Gōngdì shàng yǒu yī dà duī shāzi.', translation: { ru: 'На стройке есть большая куча песка.', en: 'There is a big pile of sand at the construction site.' } },
    ],
    difficulty: 'medium'
  },
  {
    title: { zh: '材料的比较', ru: 'Сравнение материалов', en: 'Comparing materials' },
    explanation: { ru: 'Для сравнения свойств материалов используются конструкции 比 (сравнение) и 没有 (отрицательное сравнение). Часто описывают прочность, вес, цену.', en: 'To compare material properties, use 比 (comparison) and 没有 (negative comparison). Often used for strength, weight, and price.' },
    pattern: 'material A + 比 + material B + adj',
    examples: [
      { chinese: '钢铁比木头结实。', pinyin: 'Gāngtiě bǐ mùtou jiēshi.', translation: { ru: 'Сталь прочнее дерева.', en: 'Steel is stronger than wood.' } },
      { chinese: '塑料没有金属耐用。', pinyin: 'Sùliào méiyǒu jīnshǔ nàiyòng.', translation: { ru: 'Пластик не такой долговечный, как металл.', en: 'Plastic is not as durable as metal.' } },
      { chinese: '这种布料比丝绸便宜得多。', pinyin: 'Zhè zhǒng bùliào bǐ sīchóu piányi de duō.', translation: { ru: 'Этот вид ткани намного дешевле шёлка.', en: 'This type of fabric is much cheaper than silk.' } },
    ],
    difficulty: 'medium'
  },
];
