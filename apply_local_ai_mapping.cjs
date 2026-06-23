const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let updateCount = 0;

for (let i = 4; i <= 6; i++) {
  const mapFile = `c:/ai/jlpt-app-v2/mapped${i}.json`;
  if (fs.existsSync(mapFile)) {
    const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    
    for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
      if (!chunk.vocabulary) continue;
      chunk.vocabulary.forEach(v => {
        if (v.type === 'noun' && map[v.word]) {
          v.category = map[v.word];
          updateCount++;
        }
      });
    }
  }
}

fs.writeFileSync(dbPath, JSON.stringify(d, null, 2));
console.log(`Successfully updated ${updateCount} nouns from local AI mapping!`);
