const fs = require('fs');

const dataFile = 'c:/ai/jlpt_data_export.json';
const newBatchFile = process.argv[2];

if (!newBatchFile) {
  console.error("Please provide the path to the new batch JSON file.");
  process.exit(1);
}

try {
  const db = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  const newBatch = JSON.parse(fs.readFileSync(newBatchFile, 'utf-8'));
  
  if (!Array.isArray(newBatch)) {
    console.error("Batch must be a JSON array.");
    process.exit(1);
  }

  // Find the conversations chunk
  let convChunkKey = Object.keys(db).find(k => k.startsWith('JLPT_DATA_CHUNKS') && db[k].conversations);
  if (!convChunkKey) {
    convChunkKey = 'JLPT_DATA_CHUNKS_5';
    if (!db[convChunkKey]) db[convChunkKey] = {};
    if (!db[convChunkKey].conversations) db[convChunkKey].conversations = [];
  }

  // Append items
  db[convChunkKey].conversations.push(...newBatch);
  
  fs.writeFileSync(dataFile, JSON.stringify(db, null, 2), 'utf-8');
  console.log(`Successfully appended ${newBatch.length} conversations to ${convChunkKey}.`);
} catch (e) {
  console.error("Error processing batch:", e);
  process.exit(1);
}
