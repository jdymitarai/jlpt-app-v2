const fs = require('fs');

const data = [
  // 🍻 交友休閒 - 興趣與嗜好
  { category: "興趣與嗜好", title: "分享電影與音樂", icon: "🎬", description: "和朋友討論最近看過的電影", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "最近、何か面白い映画見た？", furigana: "最[さい]近[きん]、何[なに]か面[おも]白[しろ]い映[えい]画[が]見[み]た？", translation: "最近有看什麼有趣的電影嗎？", tags: ["N4", "常體"] },
      { speaker: "主角", role: "user", text: "うん、昨日新しいアニメの映画見たよ。映像がすごく綺麗だった！", furigana: "うん、昨[きのう]日[のう]新[あたら]しいアニメの映[えい]画[が]見[み]たよ。映[えい]像[ぞう]がすごく綺[き]麗[れい]だった！", translation: "有啊，昨天看了新的動畫電影。畫面超級美的！", tags: ["N4", "常體"] }
    ]
  },
  { category: "興趣與嗜好", title: "交流動漫心得", icon: "🎌", description: "討論新番與喜愛的角色", 
    dialogues: [
      { speaker: "主角", role: "user", text: "今期のアニメ、どれか見てる？", furigana: "今[こん]期[き]のアニメ、どれか見[み]てる？", translation: "這季的動畫你有看哪部嗎？", tags: ["N4", "常體"] },
      { speaker: "朋友", role: "staff", text: "もちろん！あの異世界もの、展開が熱くて最高だよね！", furigana: "もちろん！あの異[い]世[せ]界[かい]もの、展[てん]開[かい]が熱[あつ]くて最[さい]高[こう]だよね！", translation: "當然！那部異世界轉生的，劇情超熱血超棒的！", tags: ["N3", "常體", "流行語"] }
    ]
  },
  { category: "興趣與嗜好", title: "運動與戶外活動", icon: "⚽", description: "聊聊平時的運動習慣", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "休みの日はいつも何してるの？", furigana: "休[やす]みの日[ひ]はいつも何[なに]してるの？", translation: "放假的時候你都在做什麼？", tags: ["N5", "常體"] },
      { speaker: "主角", role: "user", text: "よく友達とフットサルをしてるよ。体を動かすとスッキリするんだ。", furigana: "よく友[とも]達[だち]とフットサルをしてるよ。体[からだ]を動[うご]かすとスッキリするんだ。", translation: "常和朋友去踢五人制足球。動一動身體感覺很清爽。", tags: ["N4", "常體", "男生用語"] }
    ]
  },
  { category: "興趣與嗜好", title: "遊戲與休閒", icon: "🎮", description: "討論手遊或主機遊戲", 
    dialogues: [
      { speaker: "主角", role: "user", text: "ねえ、そのゲーム、レベル上げ大変じゃない？", furigana: "ねえ、そのゲーム、レベル上[あ]げ大[たい]変[へん]じゃない？", translation: "欸，那款遊戲升級是不是很累人啊？", tags: ["N4", "常體"] },
      { speaker: "朋友", role: "staff", text: "そうなんだよ。ガチャも全然いいの出ないし、最悪。", furigana: "そうなんだよ。ガチャも全[ぜん]然[ぜん]いいの出[で]ないし、最[さい]悪[あく]。", translation: "就是說啊。而且轉蛋也完全抽不到好東西，超慘的。", tags: ["N3", "常體"] }
    ]
  },

  // 🍻 交友休閒 - 邀約與安排
  { category: "邀約與安排", title: "提議聚餐", icon: "🍽️", description: "問朋友要不要一起去吃飯", 
    dialogues: [
      { speaker: "主角", role: "user", text: "今度の金曜日の夜、時間ある？一緒にご飯でもどう？", furigana: "今[こん]度[ど]の金[きん]曜[よう]日[び]の夜[よる]、時[じ]間[かん]ある？一[いっ]緒[しょ]にご飯[はん]でもどう？", translation: "這禮拜五晚上你有空嗎？要不要一起去吃個飯？", tags: ["N5", "常體", "邀約"] },
      { speaker: "朋友", role: "staff", text: "金曜なら空いてるよ！どこ行く？", furigana: "金[きん]曜[よう]なら空[あ]いてるよ！どこ行[い]く？", translation: "禮拜五的話我有空喔！要去哪裡？", tags: ["N5", "常體"] }
    ]
  },
  { category: "邀約與安排", title: "約看電影", icon: "🎟️", description: "約朋友週末去看新上映的電影", 
    dialogues: [
      { speaker: "主角", role: "user", text: "話題のあの映画、今週末見に行かない？", furigana: "話[わ]題[だい]のあの映[えい]画[が]、今[こん]週[しゅう]末[まつ]見[み]に行[い]かない？", translation: "那部很有話題的電影，這週末要不要去看？", tags: ["N4", "常體", "邀約"] },
      { speaker: "朋友", role: "staff", text: "いいね！行きたいと思ってたんだ。私がチケット予約しとくよ。", furigana: "いいね！行[い]きたいと思[おも]ってたんだ。私[わたし]がチケット予[よ]約[やく]しとくよ。", translation: "好啊！我本來就想去看了。我先去訂票喔。", tags: ["N4", "常體", "女生用語"] }
    ]
  },
  { category: "邀約與安排", title: "確認雙方時間", icon: "📅", description: "確認見面的時間地點", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "明日の待ち合わせ、何時にする？", furigana: "明[あした]日[た]の待[ま]ち合[あ]わせ、何[なん]時[じ]にする？", translation: "明天約見面，要約幾點？", tags: ["N5", "常體"] },
      { speaker: "主角", role: "user", text: "1時に渋谷のハチ公前でどう？", furigana: "1時[じ]に渋[しぶ]谷[や]のハチ公[こう]前[まえ]でどう？", translation: "約1點在澀谷八公像前面如何？", tags: ["N5", "常體"] }
    ]
  },
  { category: "邀約與安排", title: "規劃週末出遊", icon: "🏞️", description: "討論要去海邊還是山上", 
    dialogues: [
      { speaker: "主角", role: "user", text: "連休、どっか遠出しない？海とか。", furigana: "連[れん]休[きゅう]、どっか遠[とお]出[で]しない？海[うみ]とか。", translation: "連假要不要去遠一點的地方？像是海邊之類的。", tags: ["N4", "常體", "邀約"] },
      { speaker: "朋友", role: "staff", text: "海もいいけど、まだ水冷たくない？温泉の方がよくない？", furigana: "海[うみ]もいいけど、まだ水[みず]冷[つめ]たくない？温[おん]泉[せん]の方[ほう]がよくない？", translation: "海邊也不錯，但水不會還很冷嗎？去泡溫泉不是比較好？", tags: ["N3", "常體"] }
    ]
  },

  // 🍻 交友休閒 - 聚餐與派對
  { category: "聚餐與派對", title: "居酒屋點酒與乾杯", icon: "🍻", description: "第一杯先點生啤酒", 
    dialogues: [
      { speaker: "主角", role: "user", text: "とりあえず生でいい？", furigana: "とりあえず生[なま]でいい？", translation: "總之先來杯生啤酒可以嗎？", tags: ["N4", "常體", "居酒屋"] },
      { speaker: "朋友", role: "staff", text: "うん、それで。じゃあ、お疲れ様！乾杯！", furigana: "うん、それで。じゃあ、お疲[つか]れ様[さま]！乾[かん]杯[ぱい]！", translation: "嗯，就那個。那麼，辛苦啦！乾杯！", tags: ["N5", "常體"] }
    ]
  },
  { category: "聚餐與派對", title: "分攤費用", icon: "💴", description: "吃完飯大家一起分錢 (割り勘)", 
    dialogues: [
      { speaker: "主角", role: "user", text: "今日のお会計、割り勘にしようか。一人いくら？", furigana: "今[きょう]日[きょう]のお会[かい]計[けい]、割[わ]り勘[かん]にしようか。一[ひと]人[り]いくら？", translation: "今天的帳單我們各付各的吧。一個人多少錢？", tags: ["N4", "常體", "AA制"] },
      { speaker: "朋友", role: "staff", text: "全部で8000円だから、一人4000円だね。はい、細かいのあるよ。", furigana: "全[ぜん]部[ぶ]で8000円[えん]だから、一[ひと]人[り]4000円[えん]だね。はい、細[こま]かいのあるよ。", translation: "總共8000日圓，所以一個人4000日圓。給，我有零錢喔。", tags: ["N4", "常體"] }
    ]
  },
  { category: "聚餐與派對", title: "慶祝生日", icon: "🎂", description: "給朋友一個驚喜的生日派對", 
    dialogues: [
      { speaker: "主角", role: "user", text: "ハッピーバースデー！これ、みんなからのプレゼント！", furigana: "ハッピーバースデー！これ、みんなからのプレゼント！", translation: "生日快樂！這個是大家送你的禮物！", tags: ["N5", "常體"] },
      { speaker: "朋友", role: "staff", text: "えー！びっくりした！本当にありがとう、嬉しい！", furigana: "えー！びっくりした！本[ほん]当[とう]にありがとう、嬉[うれ]しい！", translation: "欸！嚇我一跳！真的謝謝你們，好開心！", tags: ["N4", "常體"] }
    ]
  },

  // 🍻 交友休閒 - 情感交流
  { category: "情感交流", title: "表達關心", icon: "❤️", description: "發現朋友不對勁時的關心", 
    dialogues: [
      { speaker: "主角", role: "user", text: "なんか今日元気なくない？どうしたの？", furigana: "なんか今[きょう]日[きょう]元[げん]気[き]なくない？どうしたの？", translation: "你今天怎麼好像沒什麼精神？怎麼了？", tags: ["N4", "常體", "關心"] },
      { speaker: "朋友", role: "staff", text: "実は、昨日彼女と別れちゃって…。ちょっと落ち込んでるんだ。", furigana: "実[じつ]は、昨[きのう]日[のう]彼[かの]女[じょ]と別[わか]れちゃって…。ちょっと落[お]ち込[こ]んでるんだ。", translation: "其實，我昨天跟女朋友分手了... 覺得有點沮喪。", tags: ["N3", "常體", "男生用語"] }
    ]
  },
  { category: "情感交流", title: "傾聽朋友的煩惱", icon: "👂", description: "聆聽並給予簡單的回應", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "最近仕事が忙しすぎて、全然自分の時間が持てないんだよね。", furigana: "最[さい]近[きん]仕[し]事[ごと]が忙[いそが]しすぎて、全[ぜん]然[ぜん]自[じ]分[ぶん]の時[じ]間[かん]が持[も]てないんだよね。", translation: "最近工作太忙了，完全沒有自己的時間。", tags: ["N4", "常體"] },
      { speaker: "主角", role: "user", text: "そっか、それは辛いね。あまり無理しないでね。", furigana: "そっか、それは辛[つら]いね。あまり無[む]理[り]しないでね。", translation: "這樣啊，那真的很辛苦呢。別太勉強自己了喔。", tags: ["N4", "常體", "安慰"] }
    ]
  },
  { category: "情感交流", title: "給予鼓勵與建議", icon: "💪", description: "朋友要面試前的加油打氣", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "明日、ついに第一志望の面接なんだ。すごく緊張する。", furigana: "明[あした]日[た]、ついに第[だい]一[いち]志[し]望[ぼう]の面[めん]接[せつ]なんだ。すごく緊[きん]張[ちょう]する。", translation: "明天終於是第一志願的面試了。我好緊張。", tags: ["N3", "常體"] },
      { speaker: "主角", role: "user", text: "大丈夫だよ！今まであんなに頑張ってきたんだから。自信持って！", furigana: "大[だい]丈[じょう]夫[ぶ]だよ！今[いま]まであんなに頑[がん]張[ば]ってきたんだから。自[じ]信[しん]持[も]って！", translation: "沒問題的啦！你一直以來都這麼努力了。要對自己有信心！", tags: ["N4", "常體", "鼓勵"] }
    ]
  },

  // 🍻 交友休閒 - 意見與態度
  { category: "意見與態度", title: "委婉拒絕邀約", icon: "🙅", description: "不傷感情的拒絕方式", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "今夜、みんなでカラオケ行くんだけど、一緒に来ない？", furigana: "今[こん]夜[や]、みんなでカラオケ行[い]くんだけど、一[いっ]緒[しょ]に来[こ]ない？", translation: "今晚大家要去唱KTV，你要不要一起來？", tags: ["N5", "常體"] },
      { speaker: "主角", role: "user", text: "ごめん！行きたいのは山々なんだけど、明日早いから今日はやめとく。", furigana: "ごめん！行[い]きたいのは山々[やまやま]なんだけど、明[あした]日[た]早[はや]いから今[きょう]日[きょう]はやめとく。", translation: "抱歉！我雖然很想去，但明天要早起，今天就先不去了。", tags: ["N3", "常體", "拒絕"] }
    ]
  },
  { category: "意見與態度", title: "表達贊同", icon: "👍", description: "完全同意對方的看法", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "この店のケーキ、甘すぎなくてすごく美味しいよね。", furigana: "この店[みせ]のケーキ、甘[あま]すぎなくてすごく美[おい]味[し]しいよね。", translation: "這家店的蛋糕不會太甜，非常的好吃對吧。", tags: ["N4", "常體"] },
      { speaker: "主角", role: "user", text: "ほんとそれ！いくらでも食べられそう。", furigana: "ほんとそれ！いくらでも食[た]べられそう。", translation: "真的就是這樣！感覺吃多少都吃得下。", tags: ["N3", "常體", "流行語"] }
    ]
  },
  { category: "意見與態度", title: "提出不同的看法", icon: "🤔", description: "委婉表達自己不同意", 
    dialogues: [
      { speaker: "朋友", role: "staff", text: "彼は絶対わざとあんなこと言ったんだよ！", furigana: "彼[かれ]は絶[ぜっ]対[たい]わざとあんなこと言[い]ったんだよ！", translation: "他絕對是故意那樣說的啦！", tags: ["N3", "常體"] },
      { speaker: "主角", role: "user", text: "うーん、そうかな？悪気はなかったんじゃない？", furigana: "うーん、そうかな？悪[わる]気[ぎ]はなかったんじゃない？", translation: "嗯～是這樣嗎？他應該是沒有惡意的吧？", tags: ["N3", "常體", "反駁"] }
    ]
  },

  // 🍻 交友休閒 - 社群互動
  { category: "社群互動", title: "交換聯絡方式", icon: "📱", description: "初次見面的新朋友加LINE", 
    dialogues: [
      { speaker: "主角", role: "user", text: "もしよかったら、LINE交換しない？", furigana: "もしよかったら、LINE交[こう]換[かん]しない？", translation: "如果不介意的話，要不要交換個LINE？", tags: ["N5", "常體"] },
      { speaker: "朋友", role: "staff", text: "うん、いいよ。QRコード出すね。", furigana: "うん、いいよ。QRコード出[だ]すね。", translation: "嗯，好啊。我把條碼叫出來喔。", tags: ["N5", "常體"] }
    ]
  },
  { category: "社群互動", title: "討論網路話題", icon: "🌐", description: "聊最近爆紅的YouTube影片", 
    dialogues: [
      { speaker: "主角", role: "user", text: "最近バズってるあの動画、もう見た？", furigana: "最[さい]近[きん]バズってるあの動[どう]画[が]、もう見[み]た？", translation: "最近爆紅的那個影片，你看過了嗎？", tags: ["N3", "常體", "網路用語"] },
      { speaker: "朋友", role: "staff", text: "見た見た！めっちゃ面白くて何回もリピートしちゃった。", furigana: "見[み]た見[み]た！めっちゃ面[おも]白[しろ]くて何[なん]回[かい]もリピートしちゃった。", translation: "看了看了！超級有趣，我忍不住重播了好幾次。", tags: ["N4", "常體"] }
    ]
  },
  { category: "社群互動", title: "留言互動", icon: "💬", description: "看到朋友IG打卡的回覆", 
    dialogues: [
      { speaker: "主角", role: "user", text: "昨日のインスタの写真、どこ？すごくおしゃれ！", furigana: "昨[きのう]日[のう]のインスタの写[しゃ]真[しん]、どこ？すごくおしゃれ！", translation: "昨天IG上的照片是哪裡？超有氣氛的！", tags: ["N4", "常體"] },
      { speaker: "朋友", role: "staff", text: "表参道に新しくできたカフェだよ。今度一緒に行こうよ！", furigana: "表[おもて]参[さん]道[どう]に新[あたら]しくできたカフェだよ。今[こん]度[ど]一[いっ]緒[しょ]に行[い]こうよ！", translation: "那是表參道新開的咖啡廳喔。下次一起去吧！", tags: ["N4", "常體"] }
    ]
  }
];

const dbPath = 'c:/ai/jlpt_data_export.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Format and add to array
data.forEach((item, index) => {
  item.id = `conv_social_${index}`;
  item.stage = "🍻 交友休閒 (Friends & Leisure)";
  db.JLPT_DATA.conversations.push(item);
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Injected ${data.length} Social scenarios.`);
