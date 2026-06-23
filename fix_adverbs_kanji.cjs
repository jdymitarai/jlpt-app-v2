
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/ai/live_jlpt_data.json', 'utf8'));

const adverbMap = {
  '今': { kanji: '今', kana: 'いま' },
  'すぐ': { kanji: '直ぐ', kana: 'すぐ' },
  'もうすぐ': { kanji: '', kana: 'もうすぐ' },
  '後で': { kanji: '後で', kana: 'あとで' },
  'さっき': { kanji: '先程', kana: 'さっき' },
  '昔': { kanji: '昔', kana: 'むかし' },
  'すでに': { kanji: '既に', kana: 'すでに' },
  'もう': { kanji: '', kana: 'もう' },
  'まだ': { kanji: '未だ', kana: 'まだ' },
  'いつも': { kanji: '何時も', kana: 'いつも' },
  'よく': { kanji: '良く', kana: 'よく' },
  'たまに': { kanji: '偶に', kana: 'たまに' },
  '全然': { kanji: '全然', kana: 'ぜんぜん' },
  '時々': { kanji: '時々', kana: 'ときどき' },
  'また': { kanji: '又', kana: 'また' },
  'とても': { kanji: '迚も', kana: 'とても' },
  'かなり': { kanji: '可成り', kana: 'かなり' },
  'すごく': { kanji: '凄く', kana: 'すごく' },
  '最も': { kanji: '最も', kana: 'もっとも' },
  '一番': { kanji: '一番', kana: 'いちばん' },
  '少し': { kanji: '少し', kana: 'すこし' },
  'ちょっと': { kanji: '一寸', kana: 'ちょっと' },
  'まあまあ': { kanji: '', kana: 'まあまあ' },
  'もっと': { kanji: '', kana: 'もっと' },
  'ますます': { kanji: '益々', kana: 'ますます' },
  'ほぼ': { kanji: 'ほぼ', kana: 'ほぼ' },
  'だんだん': { kanji: '段々', kana: 'だんだん' },
  'たくさん': { kanji: '沢山', kana: 'たくさん' },
  '大分': { kanji: '大分', kana: 'だいぶ' },
  'ゆっくり': { kanji: '', kana: 'ゆっくり' },
  'はっきり': { kanji: '', kana: 'はっきり' },
  'しっかり': { kanji: '確り', kana: 'しっかり' },
  'こっそり': { kanji: '', kana: 'こっそり' },
  'イライラ': { kanji: '', kana: 'いらいら' },
  'ドキドキ': { kanji: '', kana: 'どきどき' },
  'ペコペコ': { kanji: '', kana: 'ぺこぺこ' },
  'ピカピカ': { kanji: '', kana: 'ぴかぴか' },
  'サラサラ': { kanji: '', kana: 'さらさら' },
  'ドカン': { kanji: '', kana: 'どかん' },
  'そのまま': { kanji: '其の儘', kana: 'そのまま' },
  'わざと': { kanji: '態と', kana: 'わざと' },
  'たぶん': { kanji: '多分', kana: 'たぶん' },
  'もしかすると': { kanji: '若しかすると', kana: 'もしかすると' },
  'きっと': { kanji: '', kana: 'きっと' },
  '決して': { kanji: '決して', kana: 'けっして' },
  '絶対に': { kanji: '絶対に', kana: 'ぜったいに' },
  'ぜひ': { kanji: '是非', kana: 'ぜひ' },
  'まるで': { kanji: '丸で', kana: 'まるで' },
  '例えば': { kanji: '例えば', kana: 'たとえば' },
  'もし': { kanji: '若し', kana: 'もし' },
  'どうも': { kanji: '', kana: 'どうも' }
};

if (data.JLPT_DATA.adverbsGroup && data.JLPT_DATA.adverbsGroup.N5) {
  data.JLPT_DATA.adverbsGroup.N5 = data.JLPT_DATA.adverbsGroup.N5.map(a => {
    if (adverbMap[a.word]) {
      a.kanji = adverbMap[a.word].kanji;
      a.kana = adverbMap[a.word].kana;
    }
    return a;
  });
}

// ALSO UPDATE THE CHUNKS IF ADVERBS ARE THERE!
if (data.JLPT_DATA_CHUNKS && data.JLPT_DATA_CHUNKS.N5 && data.JLPT_DATA_CHUNKS.N5.vocabulary) {
  data.JLPT_DATA_CHUNKS.N5.vocabulary = data.JLPT_DATA_CHUNKS.N5.vocabulary.map(v => {
    if (v && v.type === 'adverb' && adverbMap[v.word]) {
      v.kanji = adverbMap[v.word].kanji;
      v.kana = adverbMap[v.word].kana;
    }
    return v;
  });
}

// ALSO update JLPT_DATA.vocabulary if they exist there
if (data.JLPT_DATA.vocabulary && data.JLPT_DATA.vocabulary.N5) {
  data.JLPT_DATA.vocabulary.N5 = data.JLPT_DATA.vocabulary.N5.map(v => {
    if (v && v.type === 'adverb' && adverbMap[v.word]) {
      v.kanji = adverbMap[v.word].kanji;
      v.kana = adverbMap[v.word].kana;
    }
    return v;
  });
}

fs.writeFileSync('c:/ai/live_jlpt_data_fixed.json', JSON.stringify(data, null, 2));
console.log('Fixed adverbs and saved to live_jlpt_data_fixed.json');

