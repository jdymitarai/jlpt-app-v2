const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const mappedPath = 'c:/ai/jlpt-app-v2/abstract_nouns_mapped.json';
const mapping = JSON.parse(fs.readFileSync(mappedPath, 'utf8'));

const oldCats = ['abstract_time_calendar', 'abstract_space_direction', 'abstract_numbers_units', 'abstract_logic_method', 'abstract_state_value'];

let updateCount = 0;
let notFoundCount = 0;

for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    if (v.type === 'noun' && oldCats.includes(v.category)) {
      const newCat = mapping[v.word];
      if (newCat) {
        v.category = newCat;
        updateCount++;
      } else {
        notFoundCount++;
      }
    }
  });
}

fs.writeFileSync(dbPath, JSON.stringify(d, null, 2));
console.log(`Successfully updated ${updateCount} abstract nouns. Did not find mapping for ${notFoundCount} nouns.`);
