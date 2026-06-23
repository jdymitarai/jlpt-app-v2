const fs = require('fs');
const path = 'c:/ai/jlpt_data_export.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

if (!data.JLPT_DATA_CHUNKS) {
  data.JLPT_DATA_CHUNKS = {};
}

if (!data.JLPT_DATA_CHUNKS.mimetic_1) {
  data.JLPT_DATA_CHUNKS.mimetic_1 = { vocabulary: [] };
}

const newMimetics = [
  // --- 情感與心理 (Emotion & Psychology) ---
  { word: "ドキドキ", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "心臟怦怦跳、緊張期待的樣子", examples: [{ ja: "面接の前で、胸がドキドキしている。", zh: "面試前，心臟緊張得怦怦跳。" }] },
  { word: "ワクワク", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "雀躍、充滿期待的樣子", examples: [{ ja: "明日の旅行が楽しみで、ワクワクする。", zh: "好期待明天的旅行，心裡很雀躍。" }] },
  { word: "イライラ", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "焦躁、心煩意亂的樣子", examples: [{ ja: "電車が遅れていて、イライラする。", zh: "電車誤點了，覺得很煩躁。" }] },
  { word: "ほっと", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "鬆了一口氣、安心的樣子", examples: [{ ja: "無事に試験が終わって、ほっとした。", zh: "考試順利結束，總算鬆了一口氣。" }] },
  { word: "はっと", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "突然意識到、猛然一驚的樣子", examples: [{ ja: "はっと気がつくと、もう朝だった。", zh: "猛然驚覺，居然已經早上了。" }] },
  { word: "すっきり", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "舒暢、清爽、毫無掛礙", examples: [{ ja: "シャワーを浴びて、気分がすっきりした。", zh: "洗了個澡，心情變得很舒暢。" }] },
  { word: "がっかり", type: "mimetic", pos: "擬態語", category: "mim_emotion", meaning: "失望、頹喪的樣子", examples: [{ ja: "不合格と聞いて、がっかりした。", zh: "聽到不及格，覺得非常失望。" }] },

  // --- 生理與動作 (Physiology & Action) ---
  { word: "ペコペコ", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "肚子餓扁了；點頭哈腰的樣子", examples: [{ ja: "お腹がペコペコで、倒れそうだ。", zh: "肚子餓扁了，快暈倒了。" }, { ja: "社長にペコペコとお辞儀をする。", zh: "對著總裁點頭哈腰。" }] },
  { word: "ぐっすり", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "熟睡的樣子", examples: [{ ja: "昨日は疲れていたので、ぐっすり眠れた。", zh: "昨天太累了，所以睡得很熟。" }] },
  { word: "ウトウト", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "打瞌睡、迷迷糊糊的樣子", examples: [{ ja: "授業中、ついウトウトしてしまった。", zh: "上課時，不小心打起瞌睡來。" }] },
  { word: "ギリギリ", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "勉強趕上、極限的狀態", examples: [{ ja: "電車の時間にギリギリ間に合った。", zh: "勉強趕上了電車的時間。" }] },
  { word: "のんびり", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "悠閒、無憂無慮的樣子", examples: [{ ja: "休日は家でのんびり過ごしたい。", zh: "假日想在家裡悠閒地度過。" }] },
  { word: "フラフラ", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "腳步踉蹌、搖搖晃晃；漫無目的地遊蕩", examples: [{ ja: "熱があって、頭がフラフラする。", zh: "發燒了，頭暈目眩搖搖晃晃。" }] },
  { word: "ペラペラ", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "流利地說話；紙張很薄", examples: [{ ja: "彼女は英語がペラペラだ。", zh: "她的英文說得非常流利。" }] },
  { word: "ニコニコ", type: "mimetic", pos: "擬態語", category: "mim_action", meaning: "笑咪咪的樣子", examples: [{ ja: "赤ちゃんがニコニコと笑っている。", zh: "嬰兒正笑咪咪的。" }] },

  // --- 自然與聲音 (Nature & Sound) ---
  { word: "キラキラ", type: "mimetic", pos: "擬態語", category: "mim_nature", meaning: "閃閃發光、耀眼的樣子", examples: [{ ja: "夜空の星がキラキラ光っている。", zh: "夜空的星星閃閃發光。" }] },
  { word: "ピカピカ", type: "mimetic", pos: "擬態語", category: "mim_nature", meaning: "閃亮發光、擦得嶄新的樣子", examples: [{ ja: "靴をピカピカに磨いた。", zh: "把鞋子擦得晶亮。" }] },
  { word: "ザーザー", type: "mimetic", pos: "擬音語", category: "mim_nature", meaning: "雨下得很大的聲音 (嘩啦嘩啦)", examples: [{ ja: "雨がザーザー降っている。", zh: "雨正嘩啦嘩啦地下著。" }] },
  { word: "ゴロゴロ", type: "mimetic", pos: "擬音語", category: "mim_nature", meaning: "雷聲(轟隆)；物體滾動的聲音；無所事事", examples: [{ ja: "雷がゴロゴロと鳴っている。", zh: "雷聲轟隆轟隆地響。" }, { ja: "休日は家でゴロゴロしている。", zh: "假日在家無所事事地躺著。" }] },
  { word: "サラサラ", type: "mimetic", pos: "擬態語", category: "mim_nature", meaning: "水流清澈順暢；頭髮滑順的樣子", examples: [{ ja: "彼女の髪はサラサラだ。", zh: "她的頭髮很滑順。" }] },
  { word: "ドカン", type: "mimetic", pos: "擬音語", category: "mim_nature", meaning: "爆炸或巨大撞擊的聲音", examples: [{ ja: "ドカンという大きな音がした。", zh: "發出了『轟』的一聲巨響。" }] }
];

let added = 0;
newMimetics.forEach((m, idx) => {
  const newId = 'm_' + Date.now() + '_' + idx;
  data.JLPT_DATA_CHUNKS.mimetic_1.vocabulary.push({ id: newId, ...m });
  added++;
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully added ${added} Onomatopoeia (Mimetic words).`);
