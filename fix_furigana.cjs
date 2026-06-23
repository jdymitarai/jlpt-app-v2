const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/ai/live_jlpt_data_fixed.json', 'utf8'));

const kanjiMap = {
  '大抵': '大抵[たいてい]',
  '急に': '急[きゅう]に',
  '再び': '再[ふたた]び',
  '多分': '多分[たぶん]',
  '別々に': '別々[べつべつ]に',
  '約': '約[やく]',
  '必ず': '必[かなら]ず',
  '絶対に': '絶対[ぜったい]に',
  '急いで': '急[いそ]いで',
  '最近': '最近[さいきん]',
  'この頃': 'この頃[ごろ]',
  '将来': '将来[しょうらい]',
  '昔': '昔[むかし]',
  'ずっと前に': 'ずっと前[まえ]に',
  '先ほど': '先[さき]ほど',
  '後で': '後[あと]で',
  '次に': '次[つぎ]に',
  '最後に': '最後[さいご]に',
  '別に': '別[べつ]に',
  '決して': '決[けっ]して',
  '少しも': '少[すこ]しも',
  '特に': '特[とく]に',
  '大変': '大変[たいへん]',
  '全然': '全然[ぜんぜん]',
  '時々': '時々[ときどき]',
  '初めて': '初[はじ]めて',
  '一緒に': '一緒[いっしょ]に',
  '一人で': '一人[ひとり]で',
  '自分で': '自分[じぶん]で',
  '本当に': '本当[ほんとう]に',
  '少し': '少[すこ]し',
  '全部': '全部[ぜんぶ]',
  '一番': '一番[いちばん]',
  '交互': '交互[こうご]',
  '依然': '依然[いぜん]'
};

let updatedCount = 0;

for (const level in data.JLPT_DATA_CHUNKS) {
  if (data.JLPT_DATA_CHUNKS[level].vocabulary) {
    data.JLPT_DATA_CHUNKS[level].vocabulary = data.JLPT_DATA_CHUNKS[level].vocabulary.map(v => {
      if (!v) return v;
      const t = String(v.type || '').toLowerCase();
      const p = String(v.pos || v.type || '').toLowerCase();
      if (t === 'adverb' || p.includes('副詞') || p.includes('adv')) {
        if (/[一-龥々]/.test(v.word)) {
          if (kanjiMap[v.word]) {
            v.furigana = kanjiMap[v.word];
            v.kana = ''; // Hide the bottom kana
            updatedCount++;
          }
        } else {
          v.furigana = v.word; 
          v.kana = '';
          updatedCount++;
        }
        v.kanji = v.word;
      }
      return v;
    });
  }
}

fs.writeFileSync('c:/ai/live_jlpt_data_furigana.json', JSON.stringify(data, null, 2));
console.log('Updated ' + updatedCount + ' adverbs with furigana rules!');
