const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const wordCounts = {};

for (const [level, chunk] of Object.entries(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    // Unique key is word + furigana
    // If furigana is undefined, use word
    const f = v.furigana ? v.furigana.replace(/\[.*?\]/g, "") : v.word; // simplified
    const key = v.word + "|||" + (v.furigana || v.word);
    
    if (!wordCounts[key]) {
      wordCounts[key] = [];
    }
    wordCounts[key].push({ level, type: v.type, category: v.category, meaning: v.meaning });
  });
}

const duplicates = [];
for (const [key, instances] of Object.entries(wordCounts)) {
  if (instances.length > 1) {
    duplicates.push({ key, instances });
  }
}

console.log(`Found ${duplicates.length} duplicated items (matching both word and furigana).`);
