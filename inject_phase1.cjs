const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!data.JLPT_DATA) data.JLPT_DATA = {};
if (!data.JLPT_DATA.conversations) data.JLPT_DATA.conversations = [];

// Helper to remove existing scenarios by ID
const removeExisting = (ids) => {
  data.JLPT_DATA.conversations = data.JLPT_DATA.conversations.filter(c => !ids.includes(c.id));
};

const newConversations = [
  // Stage 1: Infancy & Childhood
  {
    id: "conv_infancy_soothe",
    stage: "👶 嬰幼兒與童年 (0-12歲)",
    icon: "🍼",
    title: "牙牙學語與安撫",
    description: "安撫嬰兒、教導說話、哄睡等對話",
    dialogues: [
      { speaker: "母親", role: "staff", text: "ほら、泣かないで。ママはここよ。", furigana: "ほら、泣[な]かないで。ママはここよ。", translation: "乖，不要哭喔。媽媽在這裡。" },
      { speaker: "寶寶", role: "user", text: "あーあー、まんま...", furigana: "あーあー、まんま...", translation: "啊啊，飯飯..." },
      { speaker: "母親", role: "staff", text: "お腹すいたの？今ミルク作るからね。", furigana: "お腹[なか]すいたの？今[いま]ミルク作[つく]るからね。", translation: "肚子餓了嗎？現在就去泡牛奶喔。" },
      { speaker: "父親", role: "staff", text: "もう寝る時間だよ。絵本を読もうか。", furigana: "もう寝[ね]る時[じ]間[かん]だよ。絵[え]本[ほん]を読[よ]もうか。", translation: "該睡覺囉。我們來念故事書吧。" }
    ]
  },
  {
    id: "conv_infancy_daycare",
    stage: "👶 嬰幼兒與童年 (0-12歲)",
    icon: "📛",
    title: "托兒所與幼稚園",
    description: "家長接送、與老師對答、小孩間的互動",
    dialogues: [
      { speaker: "家長", role: "user", text: "おはようございます。今日もよろしくお願いします。", furigana: "おはようございます。今[きょう]日[も]もよろしくお願[ねが]いします。", translation: "早安。今天也麻煩您了。" },
      { speaker: "老師", role: "staff", text: "おはようございます。太郎くん、元気ですね。", furigana: "おはようございます。太[た]郎[ろう]くん、元[げん]気[き]ですね。", translation: "早安。太郎今天也很有精神呢。" },
      { speaker: "太郎", role: "user", text: "せんせい、あのね、昨日ブロックで遊んだの！", furigana: "せんせい、あのね、昨[きのう]日[う]ブロックで遊[あそ]んだの！", translation: "老師我跟你說喔，昨天我玩了積木！" },
      { speaker: "老師", role: "staff", text: "すごいわね！今日もいっぱい遊ぼうね。", furigana: "すごいわね！今[きょう]日[も]もいっぱい遊[あそ]ぼうね。", translation: "好棒喔！今天也要盡情玩喔。" }
    ]
  },
  {
    id: "conv_infancy_school",
    stage: "👶 嬰幼兒與童年 (0-12歲)",
    icon: "🎒",
    title: "小學日常",
    description: "交朋友、忘記帶東西、放學後的對話",
    dialogues: [
      { speaker: "學生A", role: "user", text: "ねえ、一緒に帰ろう！", furigana: "ねえ、一[いっ]緒[しょ]に帰[かえ]ろう！", translation: "欸，我們一起回家吧！" },
      { speaker: "學生B", role: "staff", text: "うん！あ、ちょっと待って。ランドセルに宿題入れるの忘れてた。", furigana: "うん！あ、ちょっと待[ま]って。ランドセルに宿[しゅく]題[だい]入[い]れるの忘[わす]れてた。", translation: "好啊！啊，等一下。我忘記把作業放進書包了。" },
      { speaker: "學生A", role: "user", text: "早く早く！公園でドッジボールしよう。", furigana: "早[はや]く早[はや]く！公[こう]園[えん]でドッジボールしよう。", translation: "快點快點！我們去公園打躲避球。" },
      { speaker: "學生B", role: "staff", text: "おっけー、行こう！", furigana: "おっけー、行[い]こう！", translation: "OK，走吧！" }
    ]
  },
  // Stage 2: Student Life
  {
    id: "conv_student_junior",
    stage: "🌸 青春期與學生時代 (13-22歲)",
    icon: "🏫",
    title: "國高中生活",
    description: "文化祭準備、體育祭、校園日常",
    dialogues: [
      { speaker: "同學A", role: "user", text: "文化祭の出し物、お化け屋敷に決まったね。", furigana: "文[ぶん]化[か]祭[さい]の出[だ]し物[もの]、お化[ば]け屋[や]敷[しき]に決[き]まったね。", translation: "文化祭的項目決定是鬼屋了呢。" },
      { speaker: "同學B", role: "staff", text: "うん、ダンボール集めなきゃ。放課後残れる？", furigana: "うん、ダンボール集[あつ]めなきゃ。放[ほう]課[か]後[ご]残[のこ]れる？", translation: "嗯，得去收集紙箱。你放學後能留下來嗎？" },
      { speaker: "同學A", role: "user", text: "ごめん、今日は塾があるから無理だ。", furigana: "ごめん、今[きょう]日[は]は塾[じゅく]があるから無[む]理[り]だ。", translation: "抱歉，今天有補習班所以不行。" },
      { speaker: "同學B", role: "staff", text: "そっか。じゃあ、明日の昼休みにやろう。", furigana: "そっか。じゃあ、明[あし]日[た]の昼[ひる]休[やす]みにやろう。", translation: "這樣啊。那我們明天午休的時候做吧。" }
    ]
  },
  {
    id: "conv_student_club",
    stage: "🌸 青春期與學生時代 (13-22歲)",
    icon: "⚽",
    title: "社團活動 (部活)",
    description: "學長學弟制、練球、比賽前的精神喊話",
    dialogues: [
      { speaker: "學弟", role: "user", text: "先輩、おはようございます！ボールの準備終わりました！", furigana: "先[せん]輩[ぱい]、おはようございます！ボールの準[じゅん]備[び]終[お]わりました！", translation: "學長，早安！球的準備工作已經完成了！" },
      { speaker: "學長", role: "staff", text: "おう、ご苦労。今日の試合、絶対に勝つぞ！", furigana: "おう、ご苦[く]労[ろう]。今[きょう]日[の]の試[し]合[あい]、絶[ぜっ]対[たい]に勝[か]つぞ！", translation: "喔，辛苦了。今天的比賽絕對要贏！" },
      { speaker: "教練", role: "staff", text: "全員集合！相手は強豪だが、気合を入れていけ！", furigana: "全[ぜん]員[いん]集[しゅう]合[ごう]！相[あい]手[て]は強[きょう]豪[ごう]だが、気[き]合[あい]を入[い]れていけ！", translation: "全員集合！雖然對手是強校，但也給我拿出氣勢來！" },
      { speaker: "全體", role: "user", text: "はい！よろしくお願いします！", furigana: "はい！よろしくお願[ねが]いします！", translation: "是！請多多指教！" }
    ]
  },
  {
    id: "conv_student_exam",
    stage: "🌸 青春期與學生時代 (13-22歲)",
    icon: "📝",
    title: "考試與升學",
    description: "準備期末考、大學聯考放榜",
    dialogues: [
      { speaker: "學生A", role: "user", text: "明日、数学のテストじゃん。全然勉強してないよ。", furigana: "明[あし]日[た]、数[すう]学[がく]のテストじゃん。全[ぜん]然[ぜん]勉[べん]強[きょう]してないよ。", translation: "明天不是有數學考試嗎。我完全沒唸耶。" },
      { speaker: "學生B", role: "staff", text: "嘘だ！いつもそう言って満点取るじゃん。", furigana: "嘘[うそ]だ！いつもそう言[い]って満[まん]点[てん]取[と]るじゃん。", translation: "騙人！你每次都這麼說然後考滿分不是嗎。" },
      { speaker: "學生A", role: "user", text: "今回はマジでやばい。徹夜するしかないな。", furigana: "今[こん]回[かい]はマジでやばい。徹[てつ]夜[や]するしかないな。", translation: "這次是真的慘了。只能熬夜了。" },
      { speaker: "學生B", role: "staff", text: "頑張れ。僕はもう寝るよ、おやすみ。", furigana: "頑[がん]張[ば]れ。僕[ぼく]はもう寝[ね]るよ、おやすみ。", translation: "加油吧。我要睡囉，晚安。" }
    ]
  },
  {
    id: "conv_student_romance",
    stage: "🌸 青春期與學生時代 (13-22歲)",
    icon: "💌",
    title: "戀愛與青春",
    description: "告白、情人節、校園戀情",
    dialogues: [
      { speaker: "女學生", role: "user", text: "あの...田中くん！ちょっと時間いいですか。", furigana: "あの...田[た]中[なか]くん！ちょっと時[じ]間[かん]いいですか。", translation: "那個...田中同學！現在有點時間嗎。" },
      { speaker: "男學生", role: "staff", text: "えっ、うん。どうしたの？", furigana: "えっ、うん。どうしたの？", translation: "咦，嗯。怎麼了？" },
      { speaker: "女學生", role: "user", text: "ずっと前から好きでした。これ、受け取ってください！", furigana: "ずっと前[まえ]から好[す]きでした。これ、受[う]け取[と]ってください！", translation: "我從很久以前就一直喜歡你。這個，請收下！" },
      { speaker: "男學生", role: "staff", text: "ありがとう。俺も、実は気になってたんだ。", furigana: "ありがとう。俺[おれ]も、実[じつ]は気[き]になってたんだ。", translation: "謝謝。其實我也一直很在意妳。" }
    ]
  },
  {
    id: "conv_student_uni",
    stage: "🌸 青春期與學生時代 (13-22歲)",
    icon: "🎓",
    title: "大學生活與打工",
    description: "排課表、打工面試、居酒屋排班",
    dialogues: [
      { speaker: "大學生", role: "user", text: "店長、来月のシフトの件で相談があります。", furigana: "店[てん]長[ちょう]、来[らい]月[げつ]のシフトの件[けん]で相[そう]談[だん]があります。", translation: "店長，關於下個月的排班我想跟您商量一下。" },
      { speaker: "店長", role: "staff", text: "どうした？テスト期間か？", furigana: "どうした？テスト期[き]間[かん]か？", translation: "怎麼啦？遇到考試週了嗎？" },
      { speaker: "大學生", role: "user", text: "はい、レポートの提出が重なっているので、週2日に減らしてもいいですか。", furigana: "はい、レポートの提[てい]出[しゅつ]が重[かさ]なっているので、週[しゅう]2日[ふつか]に減[へ]らしてもいいですか。", translation: "是的，剛好碰到要交很多報告，可以讓我減為一週排兩天就好嗎？" },
      { speaker: "店長", role: "staff", text: "分かった。学業優先だからな。頑張れよ。", furigana: "分[わ]かった。学[がく]業[ぎょう]優[ゆう]先[せん]だからな。頑[がん]張[ば]れよ。", translation: "知道了。畢竟學業優先嘛。加油喔。" }
    ]
  },
  {
    id: "conv_student_shukatsu",
    stage: "🌸 青春期與學生時代 (13-22歲)",
    icon: "👔",
    title: "就職活動 (就活)",
    description: "面試問答、自我介紹、收到內定",
    dialogues: [
      { speaker: "面試官", role: "staff", text: "それでは、簡単に自己ＰＲをお願いします。", furigana: "それでは、簡[かん]単[たん]に自[じ]己[こ]ＰＲをお願いします。", translation: "那麼，請簡單地做個自我介紹 (PR)。" },
      { speaker: "大學生", role: "user", text: "はい。私は大学時代、サークルの副部長としてリーダーシップを養いました。", furigana: "はい。私[わたし]は大[だい]学[がく]時[じ]代[だい]、サークルの副[ふく]部[ぶ]長[ちょう]としてリーダーシップを養[やしな]いました。", translation: "好的。我在大學時期擔任社團副社長，培養了領導能力。" },
      { speaker: "面試官", role: "staff", text: "なるほど。当社を志望した理由は何ですか。", furigana: "なるほど。当[とう]社[しゃ]を志[し]望[ぼう]した理[り]由[ゆう]は何[なん]ですか。", translation: "原來如此。那麼您報考本公司的理由是什麼？" },
      { speaker: "大學生", role: "user", text: "御社のグローバルな事業展開に魅力を感じたからです。", furigana: "御[おん]社[しゃ]のグローバルな事[じ]業[ぎょう]展[てん]開[かい]に魅[み]力[りょく]を感[かん]じたからです。", translation: "是因為我對貴公司全球化的事業版圖感到非常有魅力。" }
    ]
  }
];

const newIds = newConversations.map(c => c.id);
removeExisting(newIds);

// Append the new scenarios
data.JLPT_DATA.conversations.push(...newConversations);

// Assign "🛒 日常生存必備" stage to existing ones if missing
data.JLPT_DATA.conversations.forEach(c => {
  if (!c.stage) {
    c.stage = "🛒 日常生活生存必備";
  }
});

// Write to db
fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully injected 9 Phase-1 scenarios.');
