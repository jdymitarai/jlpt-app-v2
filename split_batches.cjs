const fs = require('fs');

const d = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));
const allNouns = [];

for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    if (v.type === 'noun') {
      allNouns.push({ word: v.word, meaning: v.meaning });
    }
  });
}

const batchSize = 350;
for (let i = 0; i < allNouns.length; i += batchSize) {
  const batch = allNouns.slice(i, i + batchSize);
  fs.writeFileSync(`c:/ai/jlpt-app-v2/batch${Math.floor(i / batchSize) + 1}.json`, JSON.stringify(batch));
}

console.log(`Created ${Math.ceil(allNouns.length / batchSize)} batches.`);
