const fs = require('fs');

const kanjiMap = {
  "ぶどう": { word: "葡萄", furigana: "葡萄[ぶどう]" },
  "くすぐったい": { word: "擽ったい", furigana: "擽[くすぐ]ったい" },
  "おこがましい": { word: "烏滸がましい", furigana: "烏滸[おこ]がましい" },
  "とてつもない": { word: "途轍もない", furigana: "途轍[とてつ]もない" },
  "ばかでかい": { word: "馬鹿でかい", furigana: "馬鹿[ばか]でかい" },
  "もっともらしい": { word: "尤もらしい", furigana: "尤[もっと]もらしい" }
};

const d = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));
let updatedCount = 0;

for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    // Only target those we mapped
    if (kanjiMap[v.word]) {
      const mapping = kanjiMap[v.word];
      v.word = mapping.word;
      v.furigana = mapping.furigana;
      updatedCount++;
    }
  });
}

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log('Successfully applied Kanji to ' + updatedCount + ' more items.');
