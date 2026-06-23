
const fs = require('fs');
const adjectives = JSON.parse(fs.readFileSync('c:/ai/adjectives_meaning_check.json', 'utf8'));

const meaningCount = {};
for (const a of adjectives) {
  if (!a.meaning) continue;
  if (!meaningCount[a.meaning]) meaningCount[a.meaning] = [];
  meaningCount[a.meaning].push(a.word);
}

for (const meaning in meaningCount) {
  if (meaningCount[meaning].length > 1) {
    console.log('Meaning:', meaning, '-> Words:', meaningCount[meaning].join(', '));
  }
}

