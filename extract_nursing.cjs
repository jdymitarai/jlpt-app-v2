const fs = require('fs');

const nursingCategories = [
  "med_basic", "med_nursing", "med_medsurg", "med_pedsmats", "med_psychcomm"
];

const dbPath = 'c:/ai/jlpt_data_export.json';
const backupPath = 'c:/ai/nursing_backup.json';

const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const nursingBackup = {};
let extractedCount = 0;
let remainingNounCount = 0;

for (const [level, chunk] of Object.entries(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  
  const originalLen = chunk.vocabulary.length;
  
  // separate nursing and others
  const nursingItems = chunk.vocabulary.filter(v => v.type === 'noun' && nursingCategories.includes(v.category));
  const otherItems = chunk.vocabulary.filter(v => !(v.type === 'noun' && nursingCategories.includes(v.category)));
  
  if (nursingItems.length > 0) {
    if (!nursingBackup[level]) nursingBackup[level] = [];
    nursingBackup[level].push(...nursingItems);
    extractedCount += nursingItems.length;
  }
  
  chunk.vocabulary = otherItems;
  
  // Count remaining nouns
  remainingNounCount += chunk.vocabulary.filter(v => v.type === 'noun').length;
}

// Write the separated files
fs.writeFileSync(backupPath, JSON.stringify(nursingBackup, null, 2));
fs.writeFileSync(dbPath, JSON.stringify(d, null, 2));

console.log(`Extracted ${extractedCount} nursing vocabulary items to ${backupPath}.`);
console.log(`Remaining general nouns in the database: ${remainingNounCount}.`);
