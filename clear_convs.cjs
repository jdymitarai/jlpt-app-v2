const fs = require('fs');
const dbPath = 'c:/ai/jlpt_data_export.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
db.JLPT_DATA.conversations = [];
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Cleared conversations array.');
