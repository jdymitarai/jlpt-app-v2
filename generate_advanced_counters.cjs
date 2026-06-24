const fs = require('fs');
const d = require('c:/ai/jlpt_data_export.json');

const uid = () => Math.random().toString(36).substring(2, 9);

function numToKanji(n) {
  const base = {1:'一', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九'};
  if (n < 10) return base[n];
  if (n === 10) return '十';
  const tens = Math.floor(n / 10);
  const units = n % 10;
  let str = '';
  if (tens === 1) str = '十';
  else str = base[tens] + '十';
  if (units > 0) str += base[units];
  return str;
}

function addVocab(word, reading, zh, category) {
  return {
    id: 'n_cnt_adv_' + uid(),
    word: word,
    reading: reading,
    furigana: `${word.replace('）', `[${reading}]）`)}`,
    romaji: '',
    meaning: zh,
    pos: '名詞',
    type: 'noun',
    category: category,
    level: 'N5',
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
const maybeAdd = (numA, kanjiSuffix, reading, zh, cat) => {
  const kanjiPrefix = numToKanji(numA);
  const word = `${numA}${kanjiSuffix}（${kanjiPrefix}${kanjiSuffix}）`;
  if (!existingWords.has(word)) {
    newVocabs.push(addVocab(word, reading, zh, cat));
    existingWords.add(word);
  }
};

const base = {
  1: 'いち', 2: 'に', 3: 'さん', 4: 'よん', 5: 'ご', 
  6: 'ろく', 7: 'なな', 8: 'はち', 9: 'きゅう', 10: 'じゅう'
};

const buildCounter = (kanji, zhUnit, cat, rules) => {
  for (let i = 1; i <= 20; i++) {
    const units = i % 10;
    const tens = Math.floor(i / 10);
    
    let reading = '';
    
    if (rules.exact && rules.exact[i]) {
      reading = rules.exact[i];
    } else {
      let prefix = tens === 2 ? 'にじゅう' : (tens === 1 ? 'じゅう' : '');
      let baseNum = '';
      let suffix = rules.default;
      
      if (units === 0 && tens > 0) {
        baseNum = '';
        if (rules[10]) {
          if (tens === 1) prefix = '';
          else if (tens === 2) prefix = 'に';
          suffix = rules[10];
        }
      } else {
        baseNum = base[units] || '';
        
        if (units === 4 && rules[4]) baseNum = rules[4].num;
        if (units === 7 && rules[7]) baseNum = rules[7].num;
        if (units === 9 && rules[9]) baseNum = rules[9].num;
        
        if (rules[units]) {
          if (rules[units].num !== undefined) baseNum = rules[units].num;
          if (rules[units].suf !== undefined) suffix = rules[units].suf;
        }
      }
      
      reading = prefix + baseNum + suffix;
    }
    
    maybeAdd(i, kanji, reading, `${i}${zhUnit}`, cat);
  }
};

const catLife = 'abs_num_life_counter';
const catShape = 'abs_num_shape_counter';
const catMeas = 'abs_num_measure';
const catMath = 'abs_num_math';

// 1. 名 (mei)
const meiRules = { default: 'めい', 4: { num: 'よ' }, 7: { num: 'なな' }, 9: { num: 'きゅう' } };
buildCounter('名', '名(人)', catLife, meiRules);

// 2. 件 (ken)
const kenRules = {
  default: 'けん',
  1: { num: 'いっ', suf: 'けん' },
  3: { suf: 'けん' }, // san ken
  6: { num: 'ろっ', suf: 'けん' },
  8: { num: 'はっ', suf: 'けん' },
  10: 'じゅっけん'
};
buildCounter('件', '件', catLife, kenRules);

// 3. 種類 (shurui) -> S-rules
const shuruiRules = {
  default: 'しゅるい',
  1: { num: 'いっ', suf: 'しゅるい' },
  8: { num: 'はっ', suf: 'しゅるい' },
  10: 'じゅっしゅるい'
};
buildCounter('種類', '種類', catLife, shuruiRules);

// 4. 着 (chaku) -> T/Ch-rules
const chakuRules = {
  default: 'ちゃく',
  1: { num: 'いっ', suf: 'ちゃく' },
  8: { num: 'はっ', suf: 'ちゃく' },
  10: 'じゅっちゃく'
};
buildCounter('着', '件(衣服)', catShape, chakuRules);

// 5. 通 (tsuu) -> T-rules
const tsuuRules = {
  default: 'つう',
  1: { num: 'いっ', suf: 'つう' },
  8: { num: 'はっ', suf: 'つう' },
  10: 'じゅっつう'
};
buildCounter('通', '封(信件)', catShape, tsuuRules);

// 6. 滴 (teki) -> T-rules
const tekiRules = {
  default: 'てき',
  1: { num: 'いっ', suf: 'てき' },
  8: { num: 'はっ', suf: 'てき' },
  10: 'じゅってき'
};
buildCounter('滴', '滴', catShape, tekiRules);

// 7. 頁 (pe-ji) -> regular
const pejiRules = { default: 'ページ' };
buildCounter('頁', '頁', catShape, pejiRules);

// 8. 泊 (haku) -> paku
const hakuRules = {
  default: 'はく',
  1: { num: 'いっ', suf: 'ぱく' },
  3: { suf: 'ぱく' },
  4: { num: 'よん', suf: 'ぱく' },
  6: { num: 'ろっ', suf: 'ぱく' },
  8: { num: 'はっ', suf: 'ぱく' },
  10: 'じゅっぱく'
};
buildCounter('泊', '晚(住宿)', catMeas, hakuRules);

// 9. 番 (ban) -> regular
const banRules = { default: 'ばん' };
buildCounter('番', '號/順位', catMath, banRules);

// 10. 倍 (bai) -> regular
const baiRules = { default: 'ばい' };
buildCounter('倍', '倍', catMath, baiRules);

if (!d.JLPT_DATA_CHUNKS['n_counter_expansion_2']) {
  d.JLPT_DATA_CHUNKS['n_counter_expansion_2'] = { level: 'N5', count: 0, vocabulary: [] };
}
d.JLPT_DATA_CHUNKS['n_counter_expansion_2'].vocabulary.push(...newVocabs);
d.JLPT_DATA_CHUNKS['n_counter_expansion_2'].count += newVocabs.length;

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log(`Generated and added ${newVocabs.length} NEW advanced counter vocabularies!`);
