const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const wordCounts = {};
const duplicates = [];

for (const [level, chunk] of Object.entries(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    const key = v.word;
    if (!wordCounts[key]) {
      wordCounts[key] = [];
    }
    wordCounts[key].push({ level, type: v.type, category: v.category, meaning: v.meaning });
  });
}

for (const [word, instances] of Object.entries(wordCounts)) {
  if (instances.length > 1) {
    duplicates.push({ word, instances });
  }
}

console.log(`Found ${duplicates.length} duplicated words.`);
if (duplicates.length > 0) {
  console.log("Sample duplicates:", JSON.stringify(duplicates.slice(0, 5), null, 2));
}
