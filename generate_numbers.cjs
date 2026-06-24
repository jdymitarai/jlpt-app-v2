const fs = require('fs');
const d = require('c:/ai/jlpt_data_export.json');

const uid = () => Math.random().toString(36).substring(2, 9);

function addVocab(numArabic, kanji, reading, zh, level) {
  const word = `${numArabic}（${kanji}）`;
  return {
    id: 'n_num_' + uid(),
    word: word,
    reading: reading,
    furigana: `${numArabic}（${kanji}[${reading}]）`,
    romaji: '',
    meaning: zh,
    pos: '名詞',
    type: 'noun',
    category: 'abs_num_math',
    level: level,
    sentences: []
  };
}

const existingWords = new Set();
Object.values(d.JLPT_DATA_CHUNKS).forEach(c => {
  if (c.vocabulary) {
    c.vocabulary.forEach(v => {
      existingWords.add(v.word);
    });
  }
});

const newVocabs = [];
const maybeAdd = (numA, kanji, reading, zh, level='N5') => {
  const word = `${numA}（${kanji}）`;
  if (!existingWords.has(word)) {
    newVocabs.push(addVocab(numA, kanji, reading, zh, level));
    existingWords.add(word);
  }
};

const base = {
  1: {k: '一', r: 'いち'}, 2: {k: '二', r: 'に'}, 3: {k: '三', r: 'さん'}, 4: {k: '四', r: 'よん'}, 5: {k: '五', r: 'ご'},
  6: {k: '六', r: 'ろく'}, 7: {k: '七', r: 'なな'}, 8: {k: '八', r: 'はち'}, 9: {k: '九', r: 'きゅう'}
};

// 1 to 99
for (let i = 1; i < 100; i++) {
  if (i < 10) {
    maybeAdd(i, base[i].k, base[i].r, `數字 ${i}`);
  } else {
    const tens = Math.floor(i / 10);
    const units = i % 10;
    let kanji = '';
    let reading = '';
    
    if (tens === 1) {
      kanji = '十'; reading = 'じゅう';
    } else {
      kanji = base[tens].k + '十'; reading = base[tens].r + 'じゅう';
    }
    
    if (units > 0) {
      kanji += base[units].k;
      reading += base[units].r;
    }
    maybeAdd(i, kanji, reading, `數字 ${i}`);
  }
}

// 100 to 900
const hyaku = {
  1: {k: '百', r: 'ひゃく'}, 2: {k: '二百', r: 'にひゃく'}, 3: {k: '三百', r: 'さんびゃく'},
  4: {k: '四百', r: 'よんひゃく'}, 5: {k: '五百', r: 'ごひゃく'}, 6: {k: '六百', r: 'ろっぴゃく'},
  7: {k: '七百', r: 'ななひゃく'}, 8: {k: '八百', r: 'はっぴゃく'}, 9: {k: '九百', r: 'きゅうひゃく'}
};
for(let i=1; i<=9; i++) {
  maybeAdd(i*100, hyaku[i].k, hyaku[i].r, `數字 ${i*100}`);
}

// 1000 to 9000
const sen = {
  1: {k: '千', r: 'せん'}, 2: {k: '二千', r: 'にせん'}, 3: {k: '三千', r: 'さんぜん'},
  4: {k: '四千', r: 'よんせん'}, 5: {k: '五千', r: 'ごせん'}, 6: {k: '六千', r: 'ろくせん'},
  7: {k: '七千', r: 'ななせん'}, 8: {k: '八千', r: 'はっせん'}, 9: {k: '九千', r: 'きゅうせん'}
};
for(let i=1; i<=9; i++) {
  const numA = (i*1000).toLocaleString('en-US');
  maybeAdd(numA, sen[i].k, sen[i].r, `數字 ${numA}`);
}

// 1萬 到 10萬
for(let i=1; i<=10; i++) {
  const numA = (i*10000).toLocaleString('en-US');
  let kanji = '', reading = '';
  if (i === 10) {
    kanji = '十万'; reading = 'じゅうまん';
  } else {
    // Note: 1万 is いちまん, NOT just まん
    const k = i === 1 ? '一' : base[i].k;
    const r = i === 1 ? 'いち' : base[i].r;
    kanji = k + '万'; reading = r + 'まん';
  }
  maybeAdd(numA, kanji, reading, `數字 ${numA}`);
}

// 20萬 到 100萬
for(let i=2; i<=10; i++) {
  const numA = (i*100000).toLocaleString('en-US');
  let kanji = '', reading = '';
  if (i === 10) {
    kanji = '百万'; reading = 'ひゃくまん';
  } else {
    kanji = base[i].k + '十万'; reading = base[i].r + 'じゅうまん';
  }
  maybeAdd(numA, kanji, reading, `數字 ${numA}`);
}

// 200萬 到 1000萬
for(let i=2; i<=10; i++) {
  const numA = (i*1000000).toLocaleString('en-US');
  let kanji = '', reading = '';
  if (i === 10) {
    kanji = '一千万'; reading = 'いっせんまん';
  } else {
    kanji = hyaku[i].k + '万'; reading = hyaku[i].r + 'まん';
  }
  maybeAdd(numA, kanji, reading, `數字 ${numA}`);
}

// 2000萬 到 1億
for(let i=2; i<=10; i++) {
  const numA = (i*10000000).toLocaleString('en-US');
  let kanji = '', reading = '';
  if (i === 10) {
    kanji = '一億'; reading = 'いちおく';
  } else {
    kanji = sen[i].k + '万'; reading = sen[i].r + 'まん';
  }
  maybeAdd(numA, kanji, reading, `數字 ${numA}`);
}

// 億到兆 (2億 ~ 10億, 100億, 1000億, 1兆)
for(let i=2; i<=10; i++) {
  const numA = (i*100000000).toLocaleString('en-US');
  let kanji = '', reading = '';
  if (i === 10) {
    kanji = '十億'; reading = 'じゅうおく';
  } else {
    kanji = base[i].k + '億'; reading = base[i].r + 'おく';
  }
  maybeAdd(numA, kanji, reading, `數字 ${numA}`);
}
// 100億
maybeAdd("10,000,000,000", '百億', 'ひゃくおく', '數字 10,000,000,000');
// 1000億
maybeAdd("100,000,000,000", '千億', 'せんおく', '數字 100,000,000,000');
// 1兆
maybeAdd("1,000,000,000,000", '一兆', 'いっちょう', '數字 1,000,000,000,000');

if (!d.JLPT_DATA_CHUNKS['n_number_expansion']) {
  d.JLPT_DATA_CHUNKS['n_number_expansion'] = { level: 'N5', count: 0, vocabulary: [] };
}
d.JLPT_DATA_CHUNKS['n_number_expansion'].vocabulary.push(...newVocabs);
d.JLPT_DATA_CHUNKS['n_number_expansion'].count += newVocabs.length;

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log(`Generated and added ${newVocabs.length} NEW number vocabularies!`);
