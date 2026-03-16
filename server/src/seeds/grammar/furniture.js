module.exports = [
  {
    title: { zh: '把字句 — 移动物体', pinyin: 'Bǎ zì jù — yídòng wùtǐ', ru: 'Конструкция 把 — перемещение предметов', en: 'The 把 construction — moving objects' },
    explanation: { ru: 'Конструкция 把 используется, когда действие производит конкретное изменение над объектом (перемещение, изменение состояния). Структура: 把 + объект + глагол + результат/направление.', en: 'The 把 construction is used when an action produces a specific change to an object (movement, state change). Structure: 把 + object + verb + result/direction.' },
    pattern: 'subject + 把 + object + verb + complement',
    examples: [
      { chinese: '请把桌子搬到客厅。', pinyin: 'Qǐng bǎ zhuōzi bān dào kètīng.', translation: { ru: 'Пожалуйста, перенеси стол в гостиную.', en: 'Please move the table to the living room.' } },
      { chinese: '他把椅子放在窗户旁边。', pinyin: 'Tā bǎ yǐzi fàng zài chuānghù pángbiān.', translation: { ru: 'Он поставил стул рядом с окном.', en: 'He put the chair next to the window.' } },
      { chinese: '把这幅画挂到墙上。', pinyin: 'Bǎ zhè fú huà guà dào qiáng shàng.', translation: { ru: 'Повесь эту картину на стену.', en: 'Hang this painting on the wall.' } },
    ],
    difficulty: 'medium'
  },
  {
    title: { zh: '在/上/里 — 位置关系', pinyin: 'Zài/shàng/lǐ — wèizhì guānxì', ru: 'Указатели местоположения 在/上/里', en: 'Location markers 在/上/里' },
    explanation: { ru: '在 указывает местонахождение; 上 — на поверхности; 里 — внутри. Комбинация 在 + место + 上/里/下 точно описывает расположение мебели и предметов.', en: '在 indicates location; 上 means on the surface; 里 means inside. Combining 在 + place + 上/里/下 precisely describes furniture and object placement.' },
    pattern: 'object + 在 + place + 上/里/下/旁边',
    examples: [
      { chinese: '书在桌子上。', pinyin: 'Shū zài zhuōzi shàng.', translation: { ru: 'Книга на столе.', en: 'The book is on the table.' } },
      { chinese: '衣服在柜子里。', pinyin: 'Yīfu zài guìzi lǐ.', translation: { ru: 'Одежда в шкафу.', en: 'The clothes are in the wardrobe.' } },
      { chinese: '猫在沙发下面睡觉。', pinyin: 'Māo zài shāfā xiàmiàn shuìjiào.', translation: { ru: 'Кот спит под диваном.', en: 'The cat is sleeping under the sofa.' } },
    ],
    difficulty: 'easy'
  },
  {
    title: { zh: '放/摆/挂 — 动词放置', pinyin: 'Fàng/bǎi/guà — dòngcí fàngzhì', ru: 'Глаголы размещения: 放/摆/挂', en: 'Placement verbs: 放/摆/挂' },
    explanation: { ru: '放 — ставить/класть (общее); 摆 — расставлять, расположить (аккуратно, декоративно); 挂 — вешать. Выбор глагола зависит от способа размещения предмета.', en: '放 means to put/place (general); 摆 means to arrange/display (neatly, decoratively); 挂 means to hang. The verb choice depends on how the object is placed.' },
    pattern: '把 + object + 放/摆/挂 + 在 + location',
    examples: [
      { chinese: '把花瓶摆在桌子上。', pinyin: 'Bǎ huāpíng bǎi zài zhuōzi shàng.', translation: { ru: 'Расставь вазу на столе.', en: 'Place the vase on the table.' } },
      { chinese: '请把外套挂在衣架上。', pinyin: 'Qǐng bǎ wàitào guà zài yījià shàng.', translation: { ru: 'Пожалуйста, повесь пальто на вешалку.', en: 'Please hang the coat on the hanger.' } },
      { chinese: '别把脏碗放在沙发上！', pinyin: 'Bié bǎ zāng wǎn fàng zài shāfā shàng!', translation: { ru: 'Не ставь грязные тарелки на диван!', en: 'Don\'t put dirty bowls on the sofa!' } },
    ],
    difficulty: 'medium'
  },
  {
    title: { zh: '有 + 家具 — 描述房间', pinyin: 'Yǒu + jiājù — miáoshù fángjiān', ru: 'Описание комнаты с 有', en: 'Describing a room with 有' },
    explanation: { ru: '有 используется для описания наличия мебели и предметов в комнате. Структура: место + 有 + предмет. Для перечисления используйте 有...还有...', en: '有 is used to describe the presence of furniture and objects in a room. Structure: place + 有 + item. Use 有...还有... for listing multiple items.' },
    pattern: 'place + 有 + item(s)',
    examples: [
      { chinese: '客厅里有一张大沙发。', pinyin: 'Kètīng lǐ yǒu yī zhāng dà shāfā.', translation: { ru: 'В гостиной есть большой диван.', en: 'There is a big sofa in the living room.' } },
      { chinese: '卧室里有床、衣柜，还有书桌。', pinyin: 'Wòshì lǐ yǒu chuáng, yīguì, hái yǒu shūzhuō.', translation: { ru: 'В спальне есть кровать, шкаф и письменный стол.', en: 'The bedroom has a bed, a wardrobe, and a desk.' } },
      { chinese: '厨房里没有微波炉。', pinyin: 'Chúfáng lǐ méiyǒu wēibōlú.', translation: { ru: 'На кухне нет микроволновки.', en: 'There is no microwave in the kitchen.' } },
    ],
    difficulty: 'easy'
  },
];
