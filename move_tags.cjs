const fs = require('fs');
const dbPath = 'c:/ai/jlpt_data_export.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (data.JLPT_DATA && data.JLPT_DATA.conversations) {
  data.JLPT_DATA.conversations.forEach(conv => {
    // We will assign tags to individual dialogues
    if (conv.dialogues) {
      conv.dialogues.forEach(d => {
        let dTags = [];
        // Copy level tag if exists (e.g. N1, N2, N3, N4, N5)
        const levelTag = conv.tags.find(t => t.match(/^N[1-5]$/));
        if (levelTag) dTags.push(levelTag);
        
        // Determine politeness based on role and text
        if (d.text.includes('ます') || d.text.includes('です') || d.text.includes('ください')) {
            dTags.push('敬語');
        } else if (d.text.endsWith('ね') || d.text.endsWith('よ') || d.text.endsWith('の') || d.text.endsWith('な') || d.text.endsWith('？')) {
             if (!d.text.includes('ます') && !d.text.includes('です')) {
                 dTags.push('常體');
             }
        }

        // Add role specific tags
        if (conv.tags.includes('男生用語') && d.role === 'user') dTags.push('男生用語');
        if (conv.tags.includes('女生用語') && d.role === 'user') dTags.push('女生用語');

        // Fallback to conversation tags if empty
        if (dTags.length === 0) {
            dTags = conv.tags.filter(t => t.match(/^N[1-5]$/) || t === '敬語' || t === '常體');
        }
        
        // Remove duplicates
        d.tags = [...new Set(dTags)];
      });
    }
  });
}

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Moved tags to dialogues.');
