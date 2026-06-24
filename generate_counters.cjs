const fs = require('fs');
const d = require('c:/ai/jlpt_data_export.json');

const uid = () => Math.random().toString(36).substring(2, 9);

function addVocab(word, reading, zh, category) {
  return {
    id: 'n_cnt_' + uid(),
    word: word,
    reading: reading,
    furigana: `${word}[${reading}]`,
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
const maybeAdd = (word, reading, zh, cat) => {
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
    
    // Check if there is an exact exception for the whole number (like 20歳 -> はたち)
    if (rules.exact && rules.exact[i]) {
      reading = rules.exact[i];
    } else {
      let prefix = tens === 2 ? 'にじゅう' : (tens === 1 ? 'じゅう' : '');
      let baseNum = '';
      let suffix = rules.default;
      
      if (units === 0 && tens > 0) {
        // Multiples of 10
        baseNum = '';
        if (rules[10]) {
          // rule[10] usually defines the 10 part AND the suffix, e.g. 'じゅっぽん'
          // We need to strip the base じゅう from prefix and use the rule
          if (tens === 1) prefix = '';
          else if (tens === 2) prefix = 'に';
          suffix = rules[10];
        }
      } else {
        baseNum = base[units] || '';
        
        // Handle 4, 7, 9 base variations
        if (units === 4 && rules[4]) baseNum = rules[4].num;
        if (units === 7 && rules[7]) baseNum = rules[7].num;
        if (units === 9 && rules[9]) baseNum = rules[9].num;
        
        // Handle phonetics for 1, 3, 6, 8
        if (rules[units]) {
          if (rules[units].num !== undefined) baseNum = rules[units].num;
          if (rules[units].suf !== undefined) suffix = rules[units].suf;
        }
      }
      
      reading = prefix + baseNum + suffix;
    }
    
    maybeAdd(`${i}${kanji}`, reading, `${i}${zhUnit}`, cat);
  }
};

const catShape = 'abs_num_shape_counter';
const catLife = 'abs_num_life_counter';
const catMeas = 'abs_num_measure';

// --- H-row sounds (本, 杯, 匹) -> ppon, bon, ppon, ppon, juppon ---
const hRules = {
  default: 'ほん',
  1: { num: 'いっ', suf: 'ぽん' },
  3: { suf: 'ぼん' },
  6: { num: 'ろっ', suf: 'ぽん' },
  8: { num: 'はっ', suf: 'ぽん' },
  10: 'じゅっぽん'
};
buildCounter('本', '支/根', catShape, hRules);

const haiRules = {
  default: 'はい',
  1: { num: 'いっ', suf: 'ぱい' },
  3: { suf: 'ばい' },
  6: { num: 'ろっ', suf: 'ぱい' },
  8: { num: 'はっ', suf: 'ぱい' },
  10: 'じゅっぱい'
};
buildCounter('杯', '杯', catShape, haiRules);

const hikiRules = {
  default: 'ひき',
  1: { num: 'いっ', suf: 'ぴき' },
  3: { suf: 'びき' },
  6: { num: 'ろっ', suf: 'ぴき' },
  8: { num: 'はっ', suf: 'ぴき' },
  10: 'じゅっぴき'
};
buildCounter('匹', '隻(小動物)', catLife, hikiRules);

// --- K-row sounds (個, 回, 階, 軒) -> kko, kko, kko, jukko ---
const koRules = {
  default: 'こ',
  1: { num: 'いっ', suf: 'こ' },
  6: { num: 'ろっ', suf: 'こ' },
  8: { num: 'はっ', suf: 'こ' },
  10: 'じゅっこ'
};
buildCounter('個', '個', catShape, koRules);

const kaiRules = {
  default: 'かい',
  1: { num: 'いっ', suf: 'かい' },
  6: { num: 'ろっ', suf: 'かい' },
  8: { num: 'はっ', suf: 'かい' },
  10: 'じゅっかい'
};
buildCounter('回', '次', catLife, kaiRules);

const kai2Rules = { ...kaiRules }; // Same phonetics for floor
buildCounter('階', '樓', catMeas, kai2Rules);

const kenRules = {
  default: 'けん',
  1: { num: 'いっ', suf: 'けん' },
  3: { suf: 'げん' }, // 3軒 is さんげん
  6: { num: 'ろっ', suf: 'けん' },
  8: { num: 'はっ', suf: 'けん' },
  10: 'じゅっけん'
};
buildCounter('軒', '間(房屋)', catShape, kenRules);

// --- S-row sounds (冊, 歳, 足) -> ssatsu, ssatsu, jussatsu ---
const satsuRules = {
  default: 'さつ',
  1: { num: 'いっ', suf: 'さつ' },
  8: { num: 'はっ', suf: 'さつ' },
  10: 'じゅっさつ'
};
buildCounter('冊', '本(書冊)', catShape, satsuRules);

const saiRules = {
  default: 'さい',
  1: { num: 'いっ', suf: 'さい' },
  8: { num: 'はっ', suf: 'さい' },
  10: 'じゅっさい',
  exact: { 20: 'はたち' }
};
buildCounter('歳', '歲', catMeas, saiRules);

const sokuRules = {
  default: 'そく',
  1: { num: 'いっ', suf: 'そく' },
  3: { suf: 'ぞく' }, // さんぞく
  8: { num: 'はっ', suf: 'そく' },
  10: 'じゅっそく'
};
buildCounter('足', '雙(鞋襪)', catShape, sokuRules);

// --- T-row sounds (頭) -> ttou ---
const touRules = {
  default: 'とう',
  1: { num: 'いっ', suf: 'とう' },
  8: { num: 'はっ', suf: 'とう' },
  10: 'じゅっとう'
};
buildCounter('頭', '頭(大動物)', catLife, touRules);

// --- W-row sounds (羽) -> pa, wa, ppa, ppa, juppa ---
const waRules = {
  default: 'わ',
  3: { suf: 'ば' },
  6: { num: 'ろっ', suf: 'ぱ' },
  8: { num: 'はっ', suf: 'ぱ' },
  10: 'じゅっぱ'
};
buildCounter('羽', '隻(鳥類)', catLife, waRules);

// --- Regulars without mutation (枚, 台) ---
const maiRules = { default: 'まい', 4: { num: 'よん' }, 7: { num: 'なな' }, 9: { num: 'きゅう' } };
buildCounter('枚', '張/片', catShape, maiRules);

const daiRules = { default: 'だい', 4: { num: 'よん' }, 7: { num: 'なな' }, 9: { num: 'きゅう' } };
buildCounter('台', '台', catShape, daiRules);

// --- Specials (人) ---
const ninRules = {
  default: 'にん',
  4: { num: 'よ' },
  7: { num: 'しち' }, // しちにん / ななにん, しち is common but both ok. Let's use なな for standard
  9: { num: 'く' },
  exact: { 1: 'ひとり', 2: 'ふたり' }
};
buildCounter('人', '人', catLife, ninRules);

// --- 汎用量詞 (1つ ~ 10つ) ---
const tsuRules = {
  1: 'ひとつ', 2: 'ふたつ', 3: 'みっつ', 4: 'よっつ', 5: 'いつつ',
  6: 'むっつ', 7: 'ななつ', 8: 'やっつ', 9: 'ここのつ', 10: 'とお'
};
for (let i = 1; i <= 10; i++) {
  const word = i === 10 ? '10' : `${i}つ`;
  maybeAdd(word, tsuRules[i], `${i}個(通用)`, catLife);
}

if (!d.JLPT_DATA_CHUNKS['n_counter_expansion']) {
  d.JLPT_DATA_CHUNKS['n_counter_expansion'] = { level: 'N5', count: 0, vocabulary: [] };
}
d.JLPT_DATA_CHUNKS['n_counter_expansion'].vocabulary.push(...newVocabs);
d.JLPT_DATA_CHUNKS['n_counter_expansion'].count += newVocabs.length;

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log(`Generated and added ${newVocabs.length} NEW counter vocabularies!`);
