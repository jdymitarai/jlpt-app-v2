const fs = require('fs');
const d = require('c:/ai/jlpt_data_export.json');

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

let count = 0;
['n_time_expansion', 'n_counter_expansion'].forEach(chunkKey => {
  const chunk = d.JLPT_DATA_CHUNKS[chunkKey];
  if (!chunk) return;
  chunk.vocabulary.forEach(v => {
    if (v.word.includes('（')) return; // already fixed
    
    const match = v.word.match(/^(\d+)(.*)$/);
    if (match) {
      const numA = parseInt(match[1], 10);
      const counter = match[2];
      const kanjiNum = numToKanji(numA);
      const kanjiWord = kanjiNum + counter;
      
      v.word = `${match[0]}（${kanjiWord}）`;
      v.furigana = `${match[0]}（${kanjiWord}[${v.reading}]）`;
      count++;
    }
  });
});

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log(`Fixed ${count} words!`);
