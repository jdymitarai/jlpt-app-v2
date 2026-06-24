const fs = require('fs');
const d = require('c:/ai/jlpt_data_export.json');

const uid = () => Math.random().toString(36).substring(2, 9);

function addVocab(word, reading, zh) {
  return {
    id: 'n_time_' + uid(),
    word: word,
    reading: reading,
    furigana: `${word}[${reading}]`,
    romaji: '',
    meaning: zh,
    pos: '名詞',
    type: 'noun',
    category: 'abs_time_calendar',
    level: 'N5',
    sentences: []
  };
}

// Find existing time words to avoid duplication
const existingWords = new Set();
Object.values(d.JLPT_DATA_CHUNKS).forEach(c => {
  if(c.vocabulary) {
    c.vocabulary.forEach(v => {
      if(v.category === 'abs_time_calendar' || v.category === 'abstract_time_calendar') {
        existingWords.add(v.word);
      }
    });
  }
});

const newVocabs = [];
const maybeAdd = (word, reading, zh) => {
  if(!existingWords.has(word)) {
    newVocabs.push(addVocab(word, reading, zh));
    existingWords.add(word);
  }
};

// 1. Weekdays
const weekdays = [
  ['月曜日', 'げつようび', '星期一'],
  ['火曜日', 'かようび', '星期二'],
  ['水曜日', 'すいようび', '星期三'],
  ['木曜日', 'もくようび', '星期四'],
  ['金曜日', 'きんようび', '星期五'],
  ['土曜日', 'どようび', '星期六'],
  ['日曜日', 'にちようび', '星期日']
];
weekdays.forEach(w => maybeAdd(w[0], w[1], w[2]));

// 2. Months 1-12
const monthReadings = ['いちがつ', 'にがつ', 'さんがつ', 'しがつ', 'ごがつ', 'ろくがつ', 'しちがつ', 'はちがつ', 'くがつ', 'じゅうがつ', 'じゅういちがつ', 'じゅうにがつ'];
for (let i = 1; i <= 12; i++) {
  maybeAdd(`${i}月`, monthReadings[i - 1], `${i}月`);
}

// 3. Dates 1-31
const dateIrregulars = {
  1: 'ついたち', 2: 'ふつか', 3: 'みっか', 4: 'よっか', 5: 'いつか', 
  6: 'むいか', 7: 'なのか', 8: 'ようか', 9: 'ここのか', 10: 'とおか',
  14: 'じゅうよっか', 20: 'はつか', 24: 'にじゅうよっか'
};
const numPrefixes = ['', 'じゅう', 'にじゅう', 'さんじゅう'];
const baseNums = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
for (let i = 1; i <= 31; i++) {
  if (dateIrregulars[i]) {
    maybeAdd(`${i}日`, dateIrregulars[i], `${i}日`);
  } else {
    let reading = '';
    const tens = Math.floor(i / 10);
    const units = i % 10;
    reading = numPrefixes[tens] + baseNums[units] + 'にち';
    maybeAdd(`${i}日`, reading, `${i}日`);
  }
}

// 4. Hours 1-24
const hourIrregulars = { 4: 'よじ', 7: 'しちじ', 9: 'くじ', 14: 'じゅうよじ', 17: 'じゅうしちじ', 19: 'じゅうくじ', 24: 'にじゅうよじ' };
for (let i = 1; i <= 24; i++) {
  if (hourIrregulars[i]) {
    maybeAdd(`${i}時`, hourIrregulars[i], `${i}點`);
  } else {
    const tens = Math.floor(i / 10);
    const units = i % 10;
    let reading = numPrefixes[tens] + baseNums[units] + 'じ';
    maybeAdd(`${i}時`, reading, `${i}點`);
  }
}

// 5. Minutes 1-60
const minBase = {
  1: 'いっぷん', 2: 'にふん', 3: 'さんぷん', 4: 'よんぷん', 5: 'ごふん',
  6: 'ろっぷん', 7: 'ななふん', 8: 'はっぷん', 9: 'きゅうふん', 0: 'じゅっぷん'
};
for (let i = 1; i <= 60; i++) {
  const units = i % 10;
  let reading = '';
  if (i === 60) {
    reading = 'ろくじゅっぷん';
  } else if (i < 10) {
    reading = minBase[units];
  } else if (units === 0) {
    // 10, 20, 30, 40, 50
    const prefix = [null, '', 'に', 'さん', 'よん', 'ご'][Math.floor(i/10)];
    reading = prefix + 'じゅっぷん';
  } else {
    const prefix = [null, 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう'][Math.floor(i/10)];
    reading = prefix + minBase[units];
  }
  maybeAdd(`${i}分`, reading, `${i}分鐘`);
}

// 6. Seconds 1-60
for (let i = 1; i <= 60; i++) {
  const tens = Math.floor(i / 10);
  const units = i % 10;
  let prefix = '';
  if (tens === 1) prefix = 'じゅう';
  else if (tens > 1) prefix = baseNums[tens] + 'じゅう';
  
  let unitStr = baseNums[units];
  let reading = prefix + unitStr + 'びょう';
  if (i === 60) reading = 'ろくじゅうびょう';
  
  maybeAdd(`${i}秒`, reading, `${i}秒鐘`);
}

if (!d.JLPT_DATA_CHUNKS['n_time_expansion']) {
  d.JLPT_DATA_CHUNKS['n_time_expansion'] = { level: 'N5', count: 0, vocabulary: [] };
}
d.JLPT_DATA_CHUNKS['n_time_expansion'].vocabulary.push(...newVocabs);
d.JLPT_DATA_CHUNKS['n_time_expansion'].count += newVocabs.length;

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log(`Generated and added ${newVocabs.length} NEW time vocabularies!`);
