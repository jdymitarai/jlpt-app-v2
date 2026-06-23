const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function getReading(v) {
  if (!v.furigana) return v.word;
  const match = v.furigana.match(/\[(.*?)\]/);
  if (match) return match[1];
  return v.furigana;
}

const seenKeys = new Set();
let removedCount = 0;

// Desired order of levels to keep words at the lowest possible level
const levelOrder = ['N5', 'N4', 'N3', 'N2', 'N1'];

for (const level of levelOrder) {
  const chunk = d.JLPT_DATA_CHUNKS[level];
  if (!chunk || !chunk.vocabulary) continue;
  
  const newVocab = [];
  for (const v of chunk.vocabulary) {
    const reading = getReading(v);
    const key = v.word + "|||" + reading;
    
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      newVocab.push(v);
    } else {
      removedCount++;
    }
  }
  chunk.vocabulary = newVocab;
}

fs.writeFileSync(dbPath, JSON.stringify(d, null, 2));
console.log(`Successfully removed ${removedCount} duplicated words.`);
