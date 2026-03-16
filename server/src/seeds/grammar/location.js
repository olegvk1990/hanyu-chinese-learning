module.exports = [
  {
    title: { zh: '方位词 上/下/左/右/前/后', ru: 'Слова направления: 上/下/左/右/前/后', en: 'Directional words: 上/下/左/右/前/后' },
    explanation: { ru: 'Базовые слова направления: 上 (верх), 下 (низ), 左 (лево), 右 (право), 前 (перед), 后 (зад). Добавляется 面/边 для «сторона»: 上面, 左边.', en: 'Basic directional words: 上 (up), 下 (down), 左 (left), 右 (right), 前 (front), 后 (back). Add 面/边 for "side": 上面, 左边.' },
    pattern: 'noun + (的) + 上面/下面/左边/右边/前面/后面',
    examples: [
      { chinese: '银行在超市的左边。', pinyin: 'Yínháng zài chāoshì de zuǒbiān.', translation: { ru: 'Банк находится слева от супермаркета.', en: 'The bank is on the left side of the supermarket.' } },
      { chinese: '学校前面有一个公园。', pinyin: 'Xuéxiào qiánmiàn yǒu yī gè gōngyuán.', translation: { ru: 'Перед школой есть парк.', en: 'There is a park in front of the school.' } },
      { chinese: '请往右边走。', pinyin: 'Qǐng wǎng yòubiān zǒu.', translation: { ru: 'Идите направо.', en: 'Please go to the right.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '在...的 + 方位', ru: 'Конструкция 在...的 + направление', en: 'Construction 在...的 + direction' },
    explanation: { ru: 'Полная конструкция для описания местоположения: A + 在 + B + 的 + 方位词. Указывает, где A находится относительно B.', en: 'Full construction for location description: A + 在 + B + 的 + directional word. Indicates where A is relative to B.' },
    pattern: 'A + 在 + B + 的 + direction',
    examples: [
      { chinese: '邮局在医院的对面。', pinyin: 'Yóujú zài yīyuàn de duìmiàn.', translation: { ru: 'Почта находится напротив больницы.', en: 'The post office is across from the hospital.' } },
      { chinese: '我的座位在他的后面。', pinyin: 'Wǒ de zuòwèi zài tā de hòumiàn.', translation: { ru: 'Моё место позади него.', en: 'My seat is behind him.' } },
      { chinese: '中国在日本的西边。', pinyin: 'Zhōngguó zài Rìběn de xībiān.', translation: { ru: 'Китай находится к западу от Японии.', en: 'China is to the west of Japan.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '从...到...', ru: 'От...до...', en: 'From...to...' },
    explanation: { ru: '从 означает "от/из" (начальная точка), 到 — "до" (конечная точка). Используется для маршрутов, расстояний и временных отрезков.', en: '从 means "from" (starting point), 到 means "to" (end point). Used for routes, distances, and time periods.' },
    pattern: '从 + place A + 到 + place B + (verb/distance/time)',
    examples: [
      { chinese: '从这里到机场要多长时间？', pinyin: 'Cóng zhèlǐ dào jīchǎng yào duō cháng shíjiān?', translation: { ru: 'Сколько времени от сюда до аэропорта?', en: 'How long does it take from here to the airport?' } },
      { chinese: '从北京到上海坐高铁四个半小时。', pinyin: 'Cóng Běijīng dào Shànghǎi zuò gāotiě sì gè bàn xiǎoshí.', translation: { ru: 'От Пекина до Шанхая на скоростном поезде четыре с половиной часа.', en: 'It takes four and a half hours by high-speed train from Beijing to Shanghai.' } },
      { chinese: '从我家到公司走路十分钟。', pinyin: 'Cóng wǒ jiā dào gōngsī zǒulù shí fēnzhōng.', translation: { ru: 'От моего дома до офиса пешком десять минут.', en: 'It is a ten-minute walk from my home to the office.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '离 — 距离表达', ru: 'Выражение расстояния с 离', en: 'Expressing distance with 离' },
    explanation: { ru: '离 означает "от" и используется для выражения расстояния между двумя точками. Структура: A + 离 + B + 远/近/距离.', en: '离 means "from" and is used to express distance between two points. Structure: A + 离 + B + far/near/distance.' },
    pattern: 'A + 离 + B + 远/近/很远/不远',
    examples: [
      { chinese: '我家离学校很近。', pinyin: 'Wǒ jiā lí xuéxiào hěn jìn.', translation: { ru: 'Мой дом рядом со школой.', en: 'My home is close to the school.' } },
      { chinese: '酒店离火车站不太远。', pinyin: 'Jiǔdiàn lí huǒchēzhàn bú tài yuǎn.', translation: { ru: 'Отель не очень далеко от вокзала.', en: 'The hotel is not too far from the train station.' } },
      { chinese: '这里离市中心有二十公里。', pinyin: 'Zhèlǐ lí shì zhōngxīn yǒu èrshí gōnglǐ.', translation: { ru: 'Отсюда до центра города двадцать километров.', en: 'It is twenty kilometers from here to the city center.' } },
    ],
    difficulty: 'easy'
  },
];
