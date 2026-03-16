module.exports = [
  {
    title: { zh: '先...然后...最后', ru: 'Последовательность: 先...然后...最后', en: 'Sequence: 先...然后...最后' },
    explanation: { ru: 'Эта конструкция описывает последовательность действий: 先 (сначала), 然后 (затем), 最后 (наконец). Используется для описания процессов производства, рецептов, инструкций.', en: 'This construction describes a sequence of actions: 先 (first), 然后 (then), 最后 (finally). Used for production processes, recipes, and instructions.' },
    pattern: '先 + action1，然后 + action2，最后 + action3',
    examples: [
      { chinese: '先量尺寸，然后切木板，最后组装。', pinyin: 'Xiān liáng chǐcùn, ránhòu qiē mùbǎn, zuìhòu zǔzhuāng.', translation: { ru: 'Сначала измерь размеры, потом распили доски, наконец собери.', en: 'First measure the dimensions, then cut the boards, finally assemble.' } },
      { chinese: '先打磨表面，然后涂底漆，最后上色。', pinyin: 'Xiān dǎmó biǎomiàn, ránhòu tú dǐqī, zuìhòu shàngsè.', translation: { ru: 'Сначала отшлифуй поверхность, затем нанеси грунтовку, в конце покрась.', en: 'First sand the surface, then apply primer, finally paint.' } },
      { chinese: '做家具先画图纸，然后买材料。', pinyin: 'Zuò jiājù xiān huà túzhǐ, ránhòu mǎi cáiliào.', translation: { ru: 'При изготовлении мебели сначала нарисуй чертёж, потом купи материалы.', en: 'When making furniture, first draw the blueprint, then buy materials.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '被字句 — 被动语态', ru: 'Пассивный залог с 被', en: 'Passive voice with 被' },
    explanation: { ru: 'Конструкция 被 используется для пассивного залога, когда важен результат действия или действующее лицо неизвестно/неважно. Часто для негативных или нейтральных контекстов.', en: 'The 被 construction is used for passive voice when the result is important or the agent is unknown/unimportant. Often for negative or neutral contexts.' },
    pattern: 'object + 被 + (agent) + verb + complement',
    examples: [
      { chinese: '这把椅子被修好了。', pinyin: 'Zhè bǎ yǐzi bèi xiūhǎo le.', translation: { ru: 'Этот стул починили.', en: 'This chair has been repaired.' } },
      { chinese: '旧家具被回收了。', pinyin: 'Jiù jiājù bèi huíshōu le.', translation: { ru: 'Старая мебель была утилизирована.', en: 'The old furniture was recycled.' } },
      { chinese: '这批产品被检查出质量问题。', pinyin: 'Zhè pī chǎnpǐn bèi jiǎnchá chū zhìliàng wèntí.', translation: { ru: 'В этой партии продукции обнаружены проблемы с качеством.', en: 'This batch of products was found to have quality issues.' } },
    ],
    difficulty: 'hard'
  },
  {
    title: { zh: '把...做成...', ru: 'Превращение: 把...做成...', en: 'Transform: 把...做成...' },
    explanation: { ru: 'Конструкция 把...做成/变成 описывает процесс превращения одного материала в другой продукт. 做成 — изготовить, 变成 — превратить.', en: 'The construction 把...做成/变成 describes transforming one material into another product. 做成 — to make into, 变成 — to turn into.' },
    pattern: '把 + raw material + 做成/变成 + product',
    examples: [
      { chinese: '工人把木头做成了一张漂亮的桌子。', pinyin: 'Gōngrén bǎ mùtou zuòchéng le yī zhāng piàoliang de zhuōzi.', translation: { ru: 'Рабочий сделал из дерева красивый стол.', en: 'The worker made a beautiful table from wood.' } },
      { chinese: '他把旧轮胎变成了花盆。', pinyin: 'Tā bǎ jiù lúntāi biànchéng le huāpén.', translation: { ru: 'Он превратил старые шины в цветочные горшки.', en: 'He turned old tires into flowerpots.' } },
      { chinese: '这块布料可以做成窗帘。', pinyin: 'Zhè kuài bùliào kěyǐ zuòchéng chuānglián.', translation: { ru: 'Из этого отреза ткани можно сшить шторы.', en: 'This piece of fabric can be made into curtains.' } },
    ],
    difficulty: 'medium'
  },
];
