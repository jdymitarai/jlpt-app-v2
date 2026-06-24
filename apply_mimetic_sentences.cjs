const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const sentencesMapPath = 'c:/ai/jlpt-app-v2/mimetics_with_sentences.json';
const sentencesMap = JSON.parse(fs.readFileSync(sentencesMapPath, 'utf8'));

let updateCount = 0;

for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    if (v.type === 'mimetic' && sentencesMap[v.word]) {
      // Ensure v.sentences exists and merge without duplicates
      if (!v.sentences) v.sentences = [];
      const newSentences = sentencesMap[v.word];
      
      for (const ns of newSentences) {
        if (!v.sentences.some(existing => existing.en === ns.en)) {
          v.sentences.push(ns);
        }
      }
      updateCount++;
    }
  });
}

fs.writeFileSync(dbPath, JSON.stringify(d, null, 2));
console.log(`Successfully updated ${updateCount} mimetics with example sentences.`);
