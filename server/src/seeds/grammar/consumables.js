module.exports = [
  {
    title: { zh: '已经/还没(有)', pinyin: 'Yǐjīng/hái méi(yǒu)', ru: 'Временные маркеры 已经 и 还没(有)', en: 'Temporal markers 已经 and 还没(有)' },
    explanation: { ru: '已经 означает "уже" и указывает на завершённое действие (с 了). 还没有 означает "ещё не" и указывает на незавершённое действие (без 了 в конце).', en: '已经 means "already" and indicates a completed action (with 了). 还没有 means "not yet" and indicates an incomplete action (no 了 at the end).' },
    pattern: '已经 + verb + 了 | 还没(有) + verb',
    examples: [
      { chinese: '墨水已经用完了。', pinyin: 'Mòshuǐ yǐjīng yòngwán le.', translation: { ru: 'Чернила уже закончились.', en: 'The ink has already run out.' } },
      { chinese: '打印纸还没有买。', pinyin: 'Dǎyìnzhǐ hái méiyǒu mǎi.', translation: { ru: 'Бумагу для принтера ещё не купили.', en: 'The printing paper has not been bought yet.' } },
      { chinese: '电池已经换好了。', pinyin: 'Diànchí yǐjīng huànhǎo le.', translation: { ru: 'Батарейки уже заменили.', en: 'The batteries have already been replaced.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '一些/几个 — 不定量词', pinyin: 'Yīxiē/jǐ gè — bùdìng liàngcí', ru: 'Неопределённые квантификаторы 一些/几个', en: 'Indefinite quantifiers 一些/几个' },
    explanation: { ru: '一些 означает "некоторое количество, несколько" (для исчисляемых и неисчисляемых). 几 + счётное слово означает "несколько" (только исчисляемые, обычно 2-9).', en: '一些 means "some, several" (for countable and uncountable). 几 + measure word means "a few" (countable only, usually 2-9).' },
    pattern: '一些 + noun | 几 + MW + noun',
    examples: [
      { chinese: '请买一些办公用品。', pinyin: 'Qǐng mǎi yīxiē bàngōng yòngpǐn.', translation: { ru: 'Купи канцелярские принадлежности.', en: 'Please buy some office supplies.' } },
      { chinese: '桌上还有几支笔。', pinyin: 'Zhuō shàng hái yǒu jǐ zhī bǐ.', translation: { ru: 'На столе ещё есть несколько ручек.', en: 'There are still a few pens on the desk.' } },
      { chinese: '我们需要一些新的文件夹。', pinyin: 'Wǒmen xūyào yīxiē xīn de wénjiànjiā.', translation: { ru: 'Нам нужны новые папки для документов.', en: 'We need some new file folders.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '需要/应该', pinyin: 'Xūyào/yīnggāi', ru: 'Модальные глаголы 需要 и 应该', en: 'Modal verbs 需要 and 应该' },
    explanation: { ru: '需要 означает "нуждаться, необходимо". 应该 означает "следует, должен". 需要 — объективная необходимость, 应该 — рекомендация или моральный долг.', en: '需要 means "to need". 应该 means "should". 需要 indicates objective necessity, 应该 indicates recommendation or moral duty.' },
    pattern: 'subject + 需要/应该 + verb + object',
    examples: [
      { chinese: '我们需要订购新的耗材。', pinyin: 'Wǒmen xūyào dìnggòu xīn de hàocái.', translation: { ru: 'Нам нужно заказать новые расходные материалы.', en: 'We need to order new consumables.' } },
      { chinese: '你应该定期检查设备。', pinyin: 'Nǐ yīnggāi dìngqī jiǎnchá shèbèi.', translation: { ru: 'Тебе следует регулярно проверять оборудование.', en: 'You should regularly check the equipment.' } },
      { chinese: '公司需要控制耗材成本。', pinyin: 'Gōngsī xūyào kòngzhì hàocái chéngběn.', translation: { ru: 'Компании нужно контролировать расходы на расходные материалы.', en: 'The company needs to control consumable costs.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '快要...了 / 就要...了', pinyin: 'Kuàiyào...le / jiùyào...le', ru: 'Скоро произойдёт: 快要/就要...了', en: 'About to happen: 快要/就要...了' },
    explanation: { ru: '快要...了 и 就要...了 означают "скоро, вот-вот". Используются для предупреждения о скором событии, например, что запас заканчивается.', en: '快要...了 and 就要...了 mean "about to, soon". Used to warn about an imminent event, e.g., supplies running out.' },
    pattern: '快要/就要 + verb + 了',
    examples: [
      { chinese: '纸快要用完了，赶快去买。', pinyin: 'Zhǐ kuàiyào yòngwán le, gǎnkuài qù mǎi.', translation: { ru: 'Бумага скоро закончится, скорей иди купи.', en: 'The paper is about to run out; go buy some quickly.' } },
      { chinese: '墨盒就要没了。', pinyin: 'Mòhé jiùyào méi le.', translation: { ru: 'Картридж вот-вот закончится.', en: 'The ink cartridge is about to run out.' } },
      { chinese: '保质期快要到了，赶紧用掉。', pinyin: 'Bǎozhìqī kuàiyào dào le, gǎnjǐn yòngdiào.', translation: { ru: 'Срок годности скоро истечёт, используйте скорее.', en: 'The expiration date is approaching; use it up quickly.' } },
    ],
    difficulty: 'medium'
  },
];
