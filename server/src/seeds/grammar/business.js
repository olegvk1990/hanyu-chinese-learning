module.exports = [
  {
    title: { zh: '关于/对于/按照', pinyin: 'Guānyú/Duìyú/Ànzhào', ru: 'Формальные предлоги 关于/对于/按照', en: 'Formal prepositions 关于/对于/按照' },
    explanation: { ru: '关于 — "о, относительно" (тема). 对于 — "что касается, в отношении" (объект суждения). 按照 — "согласно, в соответствии с" (основание). Все три — книжный стиль.', en: '关于 means "about, regarding" (topic). 对于 means "as for, with regard to" (object of judgment). 按照 means "according to" (basis). All three are formal.' },
    pattern: '关于/对于 + topic，sentence | 按照 + standard + verb',
    examples: [
      { chinese: '关于这个项目，我有几点建议。', pinyin: 'Guānyú zhège xiàngmù, wǒ yǒu jǐ diǎn jiànyì.', translation: { ru: 'Относительно этого проекта у меня есть несколько предложений.', en: 'Regarding this project, I have a few suggestions.' } },
      { chinese: '对于新员工，公司有专门的培训。', pinyin: 'Duìyú xīn yuángōng, gōngsī yǒu zhuānmén de péixùn.', translation: { ru: 'Для новых сотрудников в компании есть специальное обучение.', en: 'For new employees, the company has special training.' } },
      { chinese: '请按照合同条款执行。', pinyin: 'Qǐng ànzhào hétong tiáokuǎn zhíxíng.', translation: { ru: 'Выполняйте согласно условиям контракта.', en: 'Please execute according to the contract terms.' } },
    ],
    difficulty: 'hard'
  },
  {
    title: { zh: '百分比与数字表达', pinyin: 'Bǎifēnbǐ yǔ shùzì biǎodá', ru: 'Выражение процентов и чисел', en: 'Percentage and number expressions' },
    explanation: { ru: 'Проценты: 百分之 + число (百分之五十 = 50%). Доли: 十分之一 = 1/10. Кратность: 两倍 = в два раза. Рост/падение: 增长/下降 + 了 + 百分之...', en: 'Percentages: 百分之 + number (百分之五十 = 50%). Fractions: 十分之一 = 1/10. Multiples: 两倍 = twice. Growth/decline: 增长/下降 + 了 + 百分之...' },
    pattern: '百分之 + number | number + 倍 | verb + 了 + 百分之...',
    examples: [
      { chinese: '今年利润增长了百分之二十。', pinyin: 'Jīnnián lìrùn zēngzhǎng le bǎi fēn zhī èrshí.', translation: { ru: 'В этом году прибыль выросла на 20%.', en: 'This year\'s profit increased by 20%.' } },
      { chinese: '成本是去年的两倍。', pinyin: 'Chéngběn shì qùnián de liǎng bèi.', translation: { ru: 'Себестоимость в два раза выше прошлогодней.', en: 'The cost is twice that of last year.' } },
      { chinese: '百分之八十的客户表示满意。', pinyin: 'Bǎi fēn zhī bāshí de kèhù biǎoshì mǎnyì.', translation: { ru: '80% клиентов выразили удовлетворённость.', en: '80% of clients expressed satisfaction.' } },
    ],
    difficulty: 'medium'
  },
  {
    title: { zh: '由于/因此/所以', pinyin: 'Yóuyú/Yīncǐ/Suǒyǐ', ru: 'Причинно-следственные связки', en: 'Cause-and-effect connectors' },
    explanation: { ru: '由于 — "из-за, ввиду" (книжная причина). 因此/所以 — "поэтому" (следствие). 由于...所以... — полная конструкция причинно-следственной связи.', en: '由于 means "due to, owing to" (formal cause). 因此/所以 means "therefore" (result). 由于...所以... is the full cause-effect construction.' },
    pattern: '由于 + cause，因此/所以 + result',
    examples: [
      { chinese: '由于市场变化，我们调整了策略。', pinyin: 'Yóuyú shìchǎng biànhuà, wǒmen tiáozhěng le cèlüè.', translation: { ru: 'Из-за изменений на рынке мы скорректировали стратегию.', en: 'Due to market changes, we adjusted our strategy.' } },
      { chinese: '原材料涨价，因此产品也涨了。', pinyin: 'Yuáncáiliào zhǎngjià, yīncǐ chǎnpǐn yě zhǎng le.', translation: { ru: 'Сырьё подорожало, поэтому и продукция подорожала.', en: 'Raw materials went up in price; therefore, products also increased.' } },
      { chinese: '由于资金不足，项目被推迟了。', pinyin: 'Yóuyú zījīn bùzú, xiàngmù bèi tuīchí le.', translation: { ru: 'Из-за нехватки средств проект был отложен.', en: 'Due to insufficient funds, the project was postponed.' } },
    ],
    difficulty: 'hard'
  },
  {
    title: { zh: '不但...而且...', pinyin: 'Búdàn...érqiě...', ru: 'Не только...но и...', en: 'Not only...but also...' },
    explanation: { ru: 'Конструкция 不但...而且... выражает нарастание: "не только...но и...". В деловом контексте используется для перечисления преимуществ или проблем.', en: 'The 不但...而且... construction expresses escalation: "not only...but also...". In business context, used to list advantages or problems.' },
    pattern: '不但 + clause1，而且 + clause2',
    examples: [
      { chinese: '这个方案不但节约成本，而且提高效率。', pinyin: 'Zhège fāng\'àn búdàn jiéyuē chéngběn, érqiě tígāo xiàolǜ.', translation: { ru: 'Этот план не только экономит затраты, но и повышает эффективность.', en: 'This plan not only saves costs but also improves efficiency.' } },
      { chinese: '他不但会说中文，而且会说日文。', pinyin: 'Tā búdàn huì shuō Zhōngwén, érqiě huì shuō Rìwén.', translation: { ru: 'Он не только говорит по-китайски, но и по-японски.', en: 'He can not only speak Chinese but also Japanese.' } },
      { chinese: '公司不但扩大了市场，而且提升了品牌形象。', pinyin: 'Gōngsī búdàn kuòdà le shìchǎng, érqiě tíshēng le pǐnpái xíngxiàng.', translation: { ru: 'Компания не только расширила рынок, но и повысила имидж бренда.', en: 'The company not only expanded the market but also enhanced brand image.' } },
    ],
    difficulty: 'medium'
  },
];
