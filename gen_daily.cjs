const fs = require('fs');

const data = [
  // 🏡 日常生活 - 寒暄與問候
  { category: "寒暄與問候", title: "早晚打招呼", icon: "👋", description: "遇到鄰居或室友時的招呼語", 
    dialogues: [
      { speaker: "鄰居", role: "staff", text: "おはようございます。今日はいい天気ですね。", furigana: "おはようございます。今[きょう]日[きょう]はいい天[てん]気[き]ですね。", translation: "早安。今天天氣真好呢。", tags: ["N5", "敬語"] },
      { speaker: "主角", role: "user", text: "おはようございます。そうですね、お出かけですか。", furigana: "おはようございます。そうですね、お出[で]かけですか。", translation: "早安。是啊，您要出門嗎？", tags: ["N5", "敬語"] }
    ]
  },
  { category: "寒暄與問候", title: "天氣閒聊", icon: "🌤️", description: "等車或排隊時的破冰話題", 
    dialogues: [
      { speaker: "主角", role: "user", text: "最近、急に寒くなりましたね。", furigana: "最[さい]近[きん]、急[きゅう]に寒[さむ]くなりましたね。", translation: "最近突然變冷了呢。", tags: ["N4", "敬語"] },
      { speaker: "鄰居", role: "staff", text: "ええ、風邪をひかないように気をつけてくださいね。", furigana: "ええ、風[かぜ]邪[邪]をひかないように気[き]をつけてくださいね。", translation: "是啊，請小心不要感冒了喔。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "寒暄與問候", title: "新環境的自我介紹", icon: "🙇", description: "剛搬進新公寓向鄰居打招呼", 
    dialogues: [
      { speaker: "主角", role: "user", text: "隣に引っ越してきた王です。これ、つまらないものですが。", furigana: "隣[となり]に引[ひ]っ越[こ]してきた王[おう]です。これ、つまらないものですが。", translation: "我是剛搬到隔壁的王。這是一點心意（微薄之物）。", tags: ["N4", "敬語"] },
      { speaker: "鄰居", role: "staff", text: "ご丁寧にありがとうございます。よろしくお願いします。", furigana: "ご丁[てい]寧[ねい]にありがとうございます。よろしくお願[ねが]いします。", translation: "謝謝您這麼費心。今後請多多指教。", tags: ["N4", "敬語"] }
    ]
  },

  // 🏡 日常生活 - 居住與租屋
  { category: "居住與租屋", title: "房仲交涉", icon: "🏘️", description: "尋找適合的物件與詢問條件", 
    dialogues: [
      { speaker: "主角", role: "user", text: "家賃は管理費込みで7万円以内の物件はありますか。", furigana: "家[や]賃[ちん]は管[かん]理[り]費[ひ]込[こ]みで7万[まん]円[えん]以[い]内[ない]の物[ぶっ]件[けん]はありますか。", translation: "請問有租金含管理費在7萬日圓以內的房子嗎？", tags: ["N3", "敬語"] },
      { speaker: "房仲", role: "staff", text: "駅から徒歩10分で、敷金礼金ゼロの物件が一つございます。", furigana: "駅[えき]から徒[と]歩[ほ]10分[ぷん]で、敷[しき]金[きん]礼[れい]金[きん]ゼロの物[ぶっ]件[けん]が一[ひと]つございます。", translation: "有一間離車站走路10分鐘，免押金免禮金的房子。", tags: ["N3", "謙讓語"] }
    ]
  },
  { category: "居住與租屋", title: "簽訂租約", icon: "✍️", description: "確認保證人與初期費用", 
    dialogues: [
      { speaker: "房仲", role: "staff", text: "契約には連帯保証人、または保証会社の利用が必要です。", furigana: "契[けい]約[やく]には連[れん]帯[たい]保[ほ]証[しょう]人[にん]、または保[ほ]証[しょう]会[がい]社[しゃ]の利[り]用[よう]が必[ひつ]要[よう]です。", translation: "簽約需要連帶保證人，或是使用保證公司。", tags: ["N2", "敬語"] },
      { speaker: "主角", role: "user", text: "外国籍なので、保証会社を利用したいです。", furigana: "外[がい]国[こく]籍[せき]なので、保[ほ]証[しょう]会[がい]社[しゃ]を利[り]用[よう]したいです。", translation: "因為我是外國籍，想使用保證公司。", tags: ["N3", "敬語"] }
    ]
  },
  { category: "居住與租屋", title: "水電瓦斯開通", icon: "⚡", description: "打電話請人來開通瓦斯", 
    dialogues: [
      { speaker: "主角", role: "user", text: "引っ越してきたので、ガスの開栓をお願いします。", furigana: "引[ひ]っ越[こ]してきたので、ガスの開[かい]栓[せん]をお願[ねが]いします。", translation: "我剛搬來，麻煩請幫我開通瓦斯。", tags: ["N3", "敬語"] },
      { speaker: "瓦斯公司", role: "staff", text: "立ち会いが必要ですが、明日の午後はご在宅ですか。", furigana: "立[た]ち会[あ]いが必[ひつ]要[よう]ですが、明[あす]日[た]の午[ご]後[ご]はご在[ざい]宅[たく]ですか。", translation: "開通時必須有人在場，請問您明天下午在家嗎？", tags: ["N3", "敬語"] }
    ]
  },
  { category: "居住與租屋", title: "房屋設備報修", icon: "🔧", description: "冷氣滴水或馬桶不通", 
    dialogues: [
      { speaker: "主角", role: "user", text: "エアコンから水が漏れているんですが、見てもらえますか。", furigana: "エアコンから水[みず]が漏[も]れているんですが、見[み]てもらえますか。", translation: "冷氣在漏水，能派人來看嗎？", tags: ["N4", "敬語", "求助"] },
      { speaker: "管理員", role: "staff", text: "ご不便をおかけします。今日の午後に修理の者を向かわせます。", furigana: "ご不[ふ]便[べん]をおかけします。今[きょう]日[きょう]の午[ご]後[ご]に修[しゅう]理[り]の者[もの]を向[む]かわせます。", translation: "造成您的不便。今天下午會請師傅過去。", tags: ["N3", "謙讓語"] }
    ]
  },

  // 🏡 日常生活 - 日常採買
  { category: "日常採買", title: "超市尋找食材", icon: "🛒", description: "詢問肉品或特價時段", 
    dialogues: [
      { speaker: "主角", role: "user", text: "豚ひき肉はどこにありますか。", furigana: "豚[ぶた]ひき肉[にく]はどこにありますか。", translation: "請問豬絞肉在哪裡？", tags: ["N5", "敬語"] },
      { speaker: "店員", role: "staff", text: "お肉コーナーの奥、牛肉の隣に並んでおります。", furigana: "お肉[にく]コーナーの奥[おく]、牛[ぎゅう]肉[にく]の隣[となり]に並[なら]んでおります。", translation: "在肉品區的裡面，牛肉的旁邊。", tags: ["N4", "謙讓語"] }
    ]
  },
  { category: "日常採買", title: "便利商店結帳", icon: "🍱", description: "加熱微波、要筷子或購物袋", 
    dialogues: [
      { speaker: "店員", role: "staff", text: "お弁当温めますか。レジ袋はご利用ですか。", furigana: "お弁[べん]当[とう]温[あたた]めますか。レジ袋[ぶくろ]はご利[り]用[よう]ですか。", translation: "便當需要加熱嗎？需要購物袋嗎？", tags: ["N5", "敬語"] },
      { speaker: "主角", role: "user", text: "はい、温めてください。袋は大丈夫です。", furigana: "はい、温[あたた]めてください。袋[ふくろ]は大[だい]丈[じょう]夫[ぶ]です。", translation: "好的，請幫我加熱。袋子不用了。", tags: ["N5", "敬語"] }
    ]
  },
  { category: "日常採買", title: "藥妝店買藥", icon: "💊", description: "形容症狀並請藥師推薦", 
    dialogues: [
      { speaker: "主角", role: "user", text: "喉が痛くて熱があるんですが、効く薬はありますか。", furigana: "喉[のど]が痛[いた]くて熱[ねつ]があるんですが、効[き]く薬[くすり]はありますか。", translation: "我喉嚨痛又有發燒，有有效的藥嗎？", tags: ["N4", "敬語"] },
      { speaker: "藥師", role: "staff", text: "こちらの総合感冒薬をおすすめします。食後に飲んでください。", furigana: "こちらの総[そう]合[ごう]感[かん]冒[ぼう]薬[やく]をおすすめします。食[しょく]後[ご]に飲[の]んでください。", translation: "推薦這款綜合感冒藥。請在飯後服用。", tags: ["N4", "敬語"] }
    ]
  },

  // 🏡 日常生活 - 公共服務
  { category: "公共服務", title: "銀行開戶與匯款", icon: "🏦", description: "開戶手續與印章確認", 
    dialogues: [
      { speaker: "主角", role: "user", text: "口座を作りたいんですが、何が必要ですか。", furigana: "口[こう]座[ざ]を作[つく]りたいんですが、何[なに]が必[ひつ]要[よう]ですか。", translation: "我想開戶，需要準備什麼？", tags: ["N4", "敬語"] },
      { speaker: "行員", role: "staff", text: "在留カードと印鑑をお持ちでしょうか。", furigana: "在[ざい]留[りゅう]カードと印[いん]鑑[かん]をお持[も]ちでしょうか。", translation: "請問您有帶在留卡和印章嗎？", tags: ["N4", "敬語"] }
    ]
  },
  { category: "公共服務", title: "郵局寄信與領取包裹", icon: "🏣", description: "寄國際包裹與不在通知單", 
    dialogues: [
      { speaker: "主角", role: "user", text: "台湾まで船便で送りたいんですが、いくらになりますか。", furigana: "台[たい]湾[わん]まで船[ふな]便[びん]で送[おく]りたいんですが、いくらになりますか。", translation: "我想用海運寄到台灣，這樣要多少錢？", tags: ["N4", "敬語"] },
      { speaker: "郵局", role: "staff", text: "重さを量りますね。3キロなので、2500円です。", furigana: "重[おも]さを量[はか]りますね。3キロなので、2500円[えん]です。", translation: "我來秤一下重量。3公斤，所以是2500日圓。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "公共服務", title: "區役所辦理居住手續", icon: "🏢", description: "遷入登記與國民健保", 
    dialogues: [
      { speaker: "主角", role: "user", text: "転入届を出したいです。国民健康保険の加入もお願いします。", furigana: "転[てん]入[にゅう]届[とどけ]を出[だ]したいです。国[こく]民[みん]健[けん]康[こう]保[ほ]険[けん]の加[か]入[にゅう]もお願[ねが]いします。", translation: "我想辦理遷入登記。順便幫我加入國民健保。", tags: ["N3", "敬語"] },
      { speaker: "公務員", role: "staff", text: "こちらの用紙に新しい住所をご記入ください。", furigana: "こちらの用[よう]紙[し]に新[あたら]しい住[じゅう]所[しょ]をご記[き]入[にゅう]ください。", translation: "請在這張表格上填寫新地址。", tags: ["N4", "敬語"] }
    ]
  },

  // 🏡 日常生活 - 醫療與健康
  { category: "醫療與健康", title: "電話預約掛號", icon: "🏥", description: "確認看診時間與初診", 
    dialogues: [
      { speaker: "主角", role: "user", text: "初診ですが、今日の午後は診察してもらえますか。", furigana: "初[しょ]診[しん]ですが、今[きょう]日[きょう]の午[ご]後[ご]は診[しん]察[さつ]してもらえますか。", translation: "我是初診，今天下午可以看診嗎？", tags: ["N4", "敬語"] },
      { speaker: "護理師", role: "staff", text: "午後は3時からになります。保険証をお持ちになってお越しください。", furigana: "午[ご]後[ご]は3時[じ]からになります。保[ほ]険[けん]証[しょう]をお持[も]ちになってお越[こ]しください。", translation: "下午是3點開始。請帶著健保卡過來。", tags: ["N3", "敬語"] }
    ]
  },
  { category: "醫療與健康", title: "向醫師描述具體症狀", icon: "🩺", description: "肚子痛、拉肚子等詳細描述", 
    dialogues: [
      { speaker: "醫生", role: "staff", text: "どうされましたか。いつから痛いですか。", furigana: "どうされましたか。いつから痛[いた]いですか。", translation: "怎麼了嗎？從什麼時候開始痛的？", tags: ["N4", "敬語"] },
      { speaker: "主角", role: "user", text: "昨日の夜から胃が痛くて、下痢もしています。", furigana: "昨[きのう]日[のう]の夜[よる]から胃[い]が痛[いた]くて、下[げ]痢[り]もしています。", translation: "從昨天晚上開始胃痛，還有拉肚子。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "醫療與健康", title: "藥局領藥與詢問", icon: "💊", description: "領取處方籤與確認副作用", 
    dialogues: [
      { speaker: "主角", role: "user", text: "この薬は眠くなる副作用はありますか。", furigana: "この薬[くすり]は眠[ねむ]くなる副[ふく]作[さ]用[よう]はありますか。", translation: "這個藥會有嗜睡的副作用嗎？", tags: ["N4", "敬語"] },
      { speaker: "藥師", role: "staff", text: "はい、少し眠気が出ることがありますので、運転は控えてください。", furigana: "はい、少[すこ]し眠[ねむ]気[け]が出[で]ることがありますので、運[うん]転[てん]は控[ひか]えてください。", translation: "是的，有時會產生睡意，請避免開車。", tags: ["N3", "敬語"] }
    ]
  },

  // 🏡 日常生活 - 生活打理
  { category: "生活打理", title: "理髮店溝通髮型", icon: "✂️", description: "指定長度與層次", 
    dialogues: [
      { speaker: "主角", role: "user", text: "全体的に短くして、前髪は目にかからないくらいでお願いします。", furigana: "全[ぜん]体[たい]的[てき]に短[みじか]くして、前[まえ]髪[がみ]は目[め]にかからないくらいでお願[ねが]いします。", translation: "整體剪短，瀏海不要蓋到眼睛。", tags: ["N4", "敬語"] },
      { speaker: "理髮師", role: "staff", text: "かしこまりました。横はバリカンで刈り上げますか。", furigana: "かしこまりました。横[よこ]はバリカンで刈[か]り上[あ]げますか。", translation: "了解。旁邊要用電推剪推高嗎？", tags: ["N3", "敬語"] }
    ]
  },
  { category: "生活打理", title: "洗衣店送洗", icon: "👔", description: "乾洗西裝或處理污漬", 
    dialogues: [
      { speaker: "主角", role: "user", text: "このスーツ、ドライクリーニングでお願いします。", furigana: "このスーツ、ドライクリーニングでお願[ねが]いします。", translation: "這套西裝麻煩幫我乾洗。", tags: ["N5", "敬語"] },
      { speaker: "店員", role: "staff", text: "承知いたしました。仕上がりは明後日の夕方になります。", furigana: "承[しょう]知[ち]いたしました。仕[し]上[あ]がりは明[あさ]後[って]日[の]夕[ゆう]方[がた]になります。", translation: "好的。後天傍晚就可以拿了。", tags: ["N4", "謙讓語"] }
    ]
  },
  { category: "生活打理", title: "社區垃圾分類", icon: "♻️", description: "詢問大型垃圾與資源回收日", 
    dialogues: [
      { speaker: "主角", role: "user", text: "粗大ゴミを捨てたいんですが、どうすればいいですか。", furigana: "粗[そ]大[だい]ゴミを捨[す]てたいんですが、どうすればいいですか。", translation: "我想丟大型垃圾，請問該怎麼做？", tags: ["N4", "敬語"] },
      { speaker: "管理員", role: "staff", text: "市役所に電話して、粗大ゴミ処理券をコンビニで買ってください。", furigana: "市[し]役[やく]所[しょ]に電[でん]話[わ]して、粗[そ]大[だい]ゴミ処[しょ]理[り]券[けん]をコンビニで買[か]ってください。", translation: "請打電話給市公所，然後去超商買大型垃圾處理券。", tags: ["N3", "敬語"] }
    ]
  }
];

const dbPath = 'c:/ai/jlpt_data_export.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Format and add to array
data.forEach((item, index) => {
  item.id = `conv_daily_${index}`;
  item.stage = "🏡 日常生活 (Daily Life)";
  db.JLPT_DATA.conversations.push(item);
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Injected ${data.length} Daily scenarios.`);
