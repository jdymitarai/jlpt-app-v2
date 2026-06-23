const fs = require('fs');
const d = JSON.parse(fs.readFileSync('missing_kanji.json', 'utf8'));
const mapStr = fs.readFileSync('apply_kanji.cjs', 'utf8');

const unmapped = [];
const seen = new Set();
for (const v of d) {
    if (!mapStr.includes('"' + v.word + '"')) {
        if (!seen.has(v.word)) {
            unmapped.push(v);
            seen.add(v.word);
        }
    }
}

console.log(unmapped.map(v => v.word + ' (' + v.meaning + ')').join(', '));
console.log('\nUnmapped count:', unmapped.length);
