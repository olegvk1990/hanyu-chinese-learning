module.exports = [
  {
    title: { zh: '动词 + 了 (完成体)', ru: 'Глагол + 了 (совершённый вид)', en: 'Verb + 了 (perfective aspect)' },
    explanation: {
      ru: 'Частица 了 после глагола указывает на завершённость действия. Действие уже произошло или завершено.',
      en: 'The particle 了 after a verb indicates completed action. The action has already happened or been completed.'
    },
    pattern: '主语 + 动词 + 了 + (宾语)',
    examples: [
      { chinese: '我吃了饭。', pinyin: 'Wǒ chī le fàn.', translation: { ru: 'Я поел.', en: 'I have eaten.' } },
      { chinese: '他去了北京。', pinyin: 'Tā qù le Běijīng.', translation: { ru: 'Он поехал в Пекин.', en: 'He went to Beijing.' } },
      { chinese: '我买了一个苹果。', pinyin: 'Wǒ mǎi le yī gè píngguǒ.', translation: { ru: 'Я купил яблоко.', en: 'I bought an apple.' } }
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '正在 / 在 + 动词 (进行体)', ru: '正在/在 + глагол (длительный вид)', en: '正在/在 + verb (progressive aspect)' },
    explanation: {
      ru: 'Конструкция 正在 или 在 перед глаголом указывает на действие в процессе. Часто используется с 呢 в конце предложения.',
      en: 'The construction 正在 or 在 before a verb indicates an action in progress. Often used with 呢 at the end of the sentence.'
    },
    pattern: '主语 + 正在/在 + 动词 + (宾语) + 呢',
    examples: [
      { chinese: '我在吃饭。', pinyin: 'Wǒ zài chī fàn.', translation: { ru: 'Я ем (сейчас).', en: 'I am eating.' } },
      { chinese: '他正在看书呢。', pinyin: 'Tā zhèngzài kàn shū ne.', translation: { ru: 'Он сейчас читает.', en: 'He is reading now.' } },
      { chinese: '他们在开会。', pinyin: 'Tāmen zài kāihuì.', translation: { ru: 'Они проводят совещание.', en: 'They are having a meeting.' } }
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '能愿动词: 想、要、会、可以', ru: 'Модальные глаголы: 想、要、会、可以', en: 'Modal verbs: 想、要、会、可以' },
    explanation: {
      ru: 'Модальные глаголы ставятся перед основным глаголом. 想 — хотеть/думать, 要 — хотеть/нужно, 会 — уметь/будет, 可以 — можно.',
      en: 'Modal verbs are placed before the main verb. 想 — want/think, 要 — want/need, 会 — can/will, 可以 — may/can.'
    },
    pattern: '主语 + 能愿动词 + 动词 + (宾语)',
    examples: [
      { chinese: '我想去中国。', pinyin: 'Wǒ xiǎng qù Zhōngguó.', translation: { ru: 'Я хочу поехать в Китай.', en: 'I want to go to China.' } },
      { chinese: '我会说中文。', pinyin: 'Wǒ huì shuō Zhōngwén.', translation: { ru: 'Я умею говорить по-китайски.', en: 'I can speak Chinese.' } },
      { chinese: '你可以进来。', pinyin: 'Nǐ kěyǐ jìnlái.', translation: { ru: 'Ты можешь войти.', en: 'You may come in.' } }
    ],
    difficulty: 'medium'
  },
  {
    title: { zh: '动词重叠 (尝试或短暂)', ru: 'Удвоение глагола (попытка или краткость)', en: 'Verb reduplication (tentative or brief)' },
    explanation: {
      ru: 'Удвоение односложного глагола (АА) или  А一А придаёт действию оттенок краткости, смягчения или попытки. Часто используется в просьбах.',
      en: 'Reduplicating a monosyllabic verb (AA) or A一A gives the action a sense of brevity, softness, or attempt. Often used in requests.'
    },
    pattern: '动词 + 动词 或 动词 + 一 + 动词',
    examples: [
      { chinese: '你看看。', pinyin: 'Nǐ kànkan.', translation: { ru: 'Посмотри.', en: 'Take a look.' } },
      { chinese: '我试试。', pinyin: 'Wǒ shìshi.', translation: { ru: 'Я попробую.', en: 'I\'ll try.' } },
      { chinese: '你听一听。', pinyin: 'Nǐ tīng yī tīng.', translation: { ru: 'Послушай.', en: 'Listen.' } }
    ],
    difficulty: 'medium'
  }
];
