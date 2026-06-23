const fs = require('fs');

const kanjiMap = {
  "ゆっくり": { word: "悠っくり", furigana: "悠[ゆ]っくり" },
  "ますます": { word: "益々", furigana: "益々[ますます]" },
  "わざと": { word: "態と", furigana: "態[わざ]と" },
  "わざわざ": { word: "態々", furigana: "態々[わざわざ]" },
  "たしか": { word: "確か", furigana: "確[たし]か" },
  "たしかに": { word: "確かに", furigana: "確[たし]かに" },
  "そのまま": { word: "其の儘", furigana: "其[そ]の儘[まま]" },
  "できるだけ": { word: "出来る丈", furigana: "出来[でき]る丈[だけ]" },
  "およそ": { word: "凡そ", furigana: "凡[およ]そ" },
  "ほとんど": { word: "殆ど", furigana: "殆[ほとん]ど" },
  "かなり": { word: "可也", furigana: "可也[かなり]" },
  "なかなか": { word: "中々", furigana: "中々[なかなか]" },
  "ちょうどいい": { word: "丁度良い", furigana: "丁度[ちょうど]良[い]い" },
  "すぐに": { word: "直ぐに", furigana: "直[す]ぐに" },
  "これから": { word: "此れから", furigana: "此[こ]れから" },
  "もうすぐ": { word: "もう直ぐ", furigana: "もう直[す]ぐ" },
  "いつか": { word: "何時か", furigana: "何時[いつ]か" },
  "そのうち": { word: "其の内", furigana: "其[そ]の内[うち]" },
  "やがて": { word: "軈て", furigana: "軈[やが]て" },
  "まず": { word: "先ず", furigana: "先[ま]ず" },
  "それから": { word: "其れから", furigana: "其[そ]れから" },
  "ぜひとも": { word: "是非共", furigana: "是非共[ぜひとも]" },
  "たとえ": { word: "例え", furigana: "例[たと]え" },
  "おかげで": { word: "お蔭で", furigana: "お蔭[かげ]で" },
  "せいで": { word: "所為で", furigana: "所為[せい]で" },
  "おかげさまで": { word: "お蔭様で", furigana: "お蔭様[かげさま]で" },
  "つまり": { word: "詰まり", furigana: "詰[つま]り" },
  "しかし": { word: "然し", furigana: "然[しか]し" },
  "それでは": { word: "其れでは", furigana: "其[そ]れでは" },
  "だから": { word: "だから", furigana: "だから" },
  "ですから": { word: "ですから", furigana: "ですから" },
  "すると": { word: "然ると", furigana: "然[す]ると" },
  "そこで": { word: "其処で", furigana: "其処[そこ]で" },
  "あるいは": { word: "或いは", furigana: "或[ある]いは" },
  "または": { word: "又は", furigana: "又[また]は" },
  "それとも": { word: "其れ共", furigana: "其[そ]れ共[とも]" },
  "ところで": { word: "所で", furigana: "所[ところ]で" },
  "なるほど": { word: "成程", furigana: "成程[なるほど]" },
  "もしかしたら": { word: "若しかしたら", furigana: "若[も]しかしたら" },
  "もしかすると": { word: "若しかすると", furigana: "若[も]しかすると" },
  "まるで": { word: "丸で", furigana: "丸[まる]で" },
  "なぜなら": { word: "何故なら", furigana: "何故[なぜ]なら" },
  "とうとう": { word: "到頭", furigana: "到頭[とうとう]" },
  "ついに": { word: "遂に", furigana: "遂[つい]に" },
  "やっと": { word: "漸と", furigana: "漸[やっ]と" },
  "しっかり": { word: "確り", furigana: "確[しっか]り" },
  "はっきり": { word: "判然り", furigana: "判然[はっき]り" },
  "なるべく": { word: "成る可く", furigana: "成[な]る可[べ]く" },
  "どうしても": { word: "如何しても", furigana: "如何[どう]しても" },
  "たまに": { word: "偶に", furigana: "偶[たま]に" },
  "めったに": { word: "滅多に", furigana: "滅多[めった]に" },
  "ちっとも": { word: "些とも", furigana: "些[ちっ]とも" },
  "たいてい": { word: "大抵", furigana: "大抵[たいてい]" },
  "だんだん": { word: "段々", furigana: "段々[だんだん]" },
  "どんどん": { word: "駸々", furigana: "駸々[どんどん]" },
  "たぶん": { word: "多分", furigana: "多分[たぶん]" },
  "きっと": { word: "屹度", furigana: "屹度[きっと]" },
  "ぜひ": { word: "是非", furigana: "是非[ぜひ]" },
  "もし": { word: "若し", furigana: "若[も]し" },
  "いくら": { word: "幾ら", furigana: "幾[いく]ら" },
  "もちろん": { word: "勿論", furigana: "勿論[もちろん]" },
  "ずいぶん": { word: "随分", furigana: "随分[ずいぶん]" },
  "あまり": { word: "余り", furigana: "余[あま]り" },
  "いつも": { word: "何時も", furigana: "何時[いつ]も" },
  "よく": { word: "良く", furigana: "良[よ]く" },
  "ちょうど": { word: "丁度", furigana: "丁度[ちょうど]" },
  "もう": { word: "最早", furigana: "最早[もう]" },
  "まだ": { word: "未だ", furigana: "未[ま]だ" },
  "すぐ": { word: "直ぐ", furigana: "直[す]ぐ" },
  "さっき": { word: "先き", furigana: "先[さっ]き" },
  "あとで": { word: "後で", furigana: "後[あと]で" },
  "また": { word: "又", furigana: "又[また]" },
  "みんなで": { word: "皆で", furigana: "皆[みんな]で" },
  "とても": { word: "迚も", furigana: "迚[とて]も" },
  "ちょっと": { word: "一寸", furigana: "一寸[ちょっと]" },
  "だいたい": { word: "大体", furigana: "大体[だいたい]" },
  "うっかり": { word: "漫り", furigana: "漫[うっか]り" },
  "ぐっすり": { word: "熟睡り", furigana: "熟睡[ぐっす]り" },
  "さっぱり": { word: "薩張", furigana: "薩張[さっぱり]" },
  "にっこり": { word: "莞爾", furigana: "莞爾[にっこり]" },
  "めっきり": { word: "滅切り", furigana: "滅切[めっき]り" },
  "あっさり": { word: "呆気さり", furigana: "呆気[あっ]さり" },
  "いっそ": { word: "一層", furigana: "一層[いっそ]" },
  "きっぱり": { word: "斬っ張", furigana: "斬[き]っ張[ぱり]" },
  "しいんと": { word: "悄然と", furigana: "悄然[しいん]と" },
  "じっと": { word: "凝と", furigana: "凝[じっ]と" },
  "たっぷり": { word: "堪り", furigana: "堪[たっぷ]り" },
  "ちらっと": { word: "散らっと", furigana: "散[ち]らっと" },
  "どうにか": { word: "如何にか", furigana: "如何[どう]にか" },
  "どうやら": { word: "如何やら", furigana: "如何[どう]やら" },
  "てっきり": { word: "的確り", furigana: "的確[てっき]り" },
  "ひたすら": { word: "只管", furigana: "只管[ひたすら]" }
};

const d = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));
let updatedCount = 0;

for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    // Only target those we mapped
    if (kanjiMap[v.word]) {
      const mapping = kanjiMap[v.word];
      v.word = mapping.word;
      v.furigana = mapping.furigana;
      updatedCount++;
    }
  });
}

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(d, null, 2));
console.log('Successfully applied Kanji to ' + updatedCount + ' more adverbs/words.');
