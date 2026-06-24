const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!data.JLPT_DATA) data.JLPT_DATA = {};

// Overwrite entirely with 16 practical scenarios
data.JLPT_DATA.conversations = [
  // ==========================================
  // 1. 旅遊與觀光 (Travel & Tourism)
  // ==========================================
  {
    id: "conv_travel_customs",
    stage: "✈️ 旅遊與觀光 (Travel & Tourism)",
    icon: "🛂",
    title: "機場入境與海關",
    description: "過海關、申報物品與入境審查",
    dialogues: [
      { speaker: "審查官", role: "staff", text: "パスポートを見せてください。滞在の目的は何ですか。", furigana: "パスポートを見[み]せてください。滞[たい]在[ざい]の目[もく]的[てき]は何[なん]ですか。", translation: "請出示護照。您停留的目的是什麼？" },
      { speaker: "旅客", role: "user", text: "観光です。5日間滞在する予定です。", furigana: "観[かん]光[こう]です。5日間[いつかかん]滞[たい]在[ざい]する予[よ]定[てい]です。", translation: "是觀光。預計停留5天。" },
      { speaker: "審查官", role: "staff", text: "申告するものはありますか。", furigana: "申[しん]告[こく]するものはありますか。", translation: "有需要申報的物品嗎？" },
      { speaker: "旅客", role: "user", text: "いいえ、特にありません。", furigana: "いいえ、特[とく]にありません。", translation: "沒有，沒有特別要申報的。" }
    ]
  },
  {
    id: "conv_travel_transport",
    stage: "✈️ 旅遊與觀光 (Travel & Tourism)",
    icon: "🚆",
    title: "購買車票與問路",
    description: "搭乘新幹線、尋找月台與計程車",
    dialogues: [
      { speaker: "旅客", role: "user", text: "すみません、東京駅までの切符はどこで買えますか。", furigana: "すみません、東[とう]京[きょう]駅[えき]までの切[きっ]符[ぷ]はどこで買[か]えますか。", translation: "不好意思，請問去東京車站的車票要在哪裡買？" },
      { speaker: "站務員", role: "staff", text: "あちらの券売機、またはみどりの窓口で買えますよ。", furigana: "あちらの券[けん]売[ばい]機[き]、またはみどりの窓[まど]口[ぐち]で買[か]えますよ。", translation: "可以在那邊的售票機，或是綠色窗口購買喔。" },
      { speaker: "旅客", role: "user", text: "ありがとうございます。新幹線の乗り場は何番線ですか。", furigana: "ありがとうございます。新[しん]幹[かん]線[せん]の乗[の]り場[ば]は何[なん]番[ばん]線[せん]ですか。", translation: "謝謝。請問新幹線的搭車月台是第幾月台？" },
      { speaker: "站務員", role: "staff", text: "14番線になります。階段を上がって右側です。", furigana: "14番[ばん]線[せん]になります。階[かい]段[だん]を上[あ]がって右[みぎ]側[がわ]です。", translation: "是14號月台。上樓梯後右轉就是了。" }
    ]
  },
  {
    id: "conv_travel_hotel",
    stage: "✈️ 旅遊與觀光 (Travel & Tourism)",
    icon: "🏨",
    title: "飯店入住與退房",
    description: "Check-in手續、寄放行李",
    dialogues: [
      { speaker: "櫃台", role: "staff", text: "いらっしゃいませ。チェックインですか。", furigana: "いらっしゃいませ。チェックインですか。", translation: "歡迎光臨。請問是要辦理入住嗎？" },
      { speaker: "旅客", role: "user", text: "はい、予約していた王です。荷物を預かってもらえますか。", furigana: "はい、予[よ]約[やく]していた王[おう]です。荷[に]物[もつ]を預[あず]かってもらえますか。", translation: "是的，我是預約的王。請問可以寄放行李嗎？" },
      { speaker: "櫃台", role: "staff", text: "はい、お預かりいたします。お部屋の鍵はこちらになります。", furigana: "はい、お預[あず]かりいたします。お部[へ]屋[や]の鍵[かぎ]はこちらになります。", translation: "好的，為您保管。這是您房間的鑰匙。" },
      { speaker: "旅客", role: "user", text: "ありがとうございます。朝食は何時からですか。", furigana: "ありがとうございます。朝[ちょう]食[しょく]は何[なん]時[じ]からですか。", translation: "謝謝。請問早餐是幾點開始？" }
    ]
  },
  {
    id: "conv_travel_restaurant",
    stage: "✈️ 旅遊與觀光 (Travel & Tourism)",
    icon: "🍽️",
    title: "預約餐廳與點餐",
    description: "入座點餐、詢問過敏原與結帳",
    dialogues: [
      { speaker: "店員", role: "staff", text: "ご注文はお決まりですか。", furigana: "ご注[ちゅう]文[もん]はお決[き]まりですか。", translation: "請問決定好要點什麼了嗎？" },
      { speaker: "顧客", role: "user", text: "おすすめのセットを2つお願いします。あと、ピーナッツアレルギーがあるのですが。", furigana: "おすすめのセットを2つお願[ねが]いします。あと、ピーナッツアレルギーがあるのですが。", translation: "請給我兩份推薦套餐。另外，我對花生過敏。" },
      { speaker: "店員", role: "staff", text: "かしこまりました。ピーナッツは抜いてお作りしますね。", furigana: "かしこまりました。ピーナッツは抜[ぬ]いてお作[つく]りしますね。", translation: "了解了。我們會為您去除花生製作。" },
      { speaker: "顧客", role: "user", text: "助かります。お会計はクレジットカードでお願いします。", furigana: "助[たす]かります。お会[かい]計[けい]はクレジットカードでお願[ねが]いします。", translation: "那真是幫了大忙。結帳請讓我用信用卡。" }
    ]
  },
  {
    id: "conv_travel_shopping",
    stage: "✈️ 旅遊與觀光 (Travel & Tourism)",
    icon: "🛍️",
    title: "購物與免稅手續",
    description: "尋找商品尺寸、辦理Tax-free",
    dialogues: [
      { speaker: "顧客", role: "user", text: "すみません、この服のMサイズはありますか。", furigana: "すみません、この服[ふく]のMサイズはありますか。", translation: "不好意思，這件衣服有M號的嗎？" },
      { speaker: "店員", role: "staff", text: "少々お待ちください。…申し訳ありません、Mサイズは売り切れです。", furigana: "少[しょう]々[しょう]お待[ま]ちください。…申[もう]し訳[わけ]ありません、Mサイズは売[う]り切[き]れです。", translation: "請稍候。…非常抱歉，M號已經賣完了。" },
      { speaker: "顧客", role: "user", text: "そうですか、じゃあLサイズでいいです。免税できますか。", furigana: "そうですか、じゃあLサイズでいいです。免[めん]税[ぜい]できますか。", translation: "這樣啊，那L號也可以。請問可以免稅嗎？" },
      { speaker: "店員", role: "staff", text: "はい、パスポートをご提示ください。", furigana: "はい、パスポートをご提[てい]示[じ]ください。", translation: "可以的，請出示您的護照。" }
    ]
  },

  // ==========================================
  // 2. 日常生活 (Daily Life)
  // ==========================================
  {
    id: "conv_daily_greet",
    stage: "🏡 日常生活 (Daily Life)",
    icon: "👋",
    title: "基礎交際與寒暄",
    description: "自我介紹、天氣寒暄、日常打招呼",
    dialogues: [
      { speaker: "鄰居", role: "staff", text: "おはようございます。今日はいい天気ですね。", furigana: "おはようございます。今[きょう]日[は]はいい天[てん]気[き]ですね。", translation: "早安。今天天氣真好呢。" },
      { speaker: "主角", role: "user", text: "おはようございます。本当にそうですね、お出かけですか。", furigana: "おはようございます。本[ほん]当[とう]にそうですね、お出[で]かけですか。", translation: "早安。真的呢，您要出門嗎？" },
      { speaker: "鄰居", role: "staff", text: "ええ、ちょっと近くのスーパーまで買い物に。", furigana: "ええ、ちょっと近[ちか]くのスーパーまで買[か]い物[もの]に。", translation: "是啊，去附近的超市買點東西。" },
      { speaker: "主角", role: "user", text: "いってらっしゃいませ。", furigana: "いってらっしゃいませ。", translation: "慢走喔。" }
    ]
  },
  {
    id: "conv_daily_conbini",
    stage: "🏡 日常生活 (Daily Life)",
    icon: "🏪",
    title: "便利商店與超市",
    description: "結帳對答、加熱食物、索取塑膠袋",
    dialogues: [
      { speaker: "店員", role: "staff", text: "お弁当温めますか。また、レジ袋はご利用になりますか。", furigana: "お弁[べん]当[とう]温[あたた]めますか。また、レジ袋[ぶくろ]はご利[り]用[よう]になりますか。", translation: "便當需要加熱嗎？另外，需要購買塑膠袋嗎？" },
      { speaker: "顧客", role: "user", text: "はい、温めてください。袋は大丈夫です、マイバッグがありますので。", furigana: "はい、温[あたた]めてください。袋[ふくろ]は大[だい]丈[じょう]夫[ぶ]です、マイバッグがありますので。", translation: "好的，請幫我加熱。不用袋子沒關係，我自己有帶購物袋。" },
      { speaker: "店員", role: "staff", text: "お支払いはどうされますか。", furigana: "お支[し]払[はら]いはどうされますか。", translation: "請問您要如何付款？" },
      { speaker: "顧客", role: "user", text: "Suicaでお願いします。", furigana: "Suicaでお願[ねが]いします。", translation: "請讓我用西瓜卡 (Suica) 結帳。" }
    ]
  },
  {
    id: "conv_daily_public",
    stage: "🏡 日常生活 (Daily Life)",
    icon: "🏢",
    title: "公家機關與郵局",
    description: "寄送包裹、市役所辦理手續",
    dialogues: [
      { speaker: "郵局人員", role: "staff", text: "いらっしゃいませ。こちらの荷物ですね。中身は何ですか。", furigana: "いらっしゃいませ。こちらの荷[に]物[もつ]ですね。中[なか]身[み]は何[なん]ですか。", translation: "歡迎光臨。是這件包裹對吧。請問裡面裝的是什麼？" },
      { speaker: "顧客", role: "user", text: "洋服と本です。台湾まで送りたいのですが。", furigana: "洋[よう]服[ふく]と本[ほん]です。台[たい]湾[わん]まで送[おく]りたいのですが。", translation: "是衣服跟書。我想寄到台灣。" },
      { speaker: "郵局人員", role: "staff", text: "EMS（国際スピード郵便）と船便がありますが、どちらにしますか。", furigana: "EMS（国[こく]際[さい]スピード郵[ゆう]便[びん]）と船[ふな]便[びん]がありますが、どちらにしますか。", translation: "有 EMS（國際快捷）跟海運，請問您要選哪一種？" },
      { speaker: "顧客", role: "user", text: "一番早いEMSでお願いします。", furigana: "一[いち]番[ばん]早[はや]いEMSでお願[ねが]いします。", translation: "請給我最快的 EMS。" }
    ]
  },
  {
    id: "conv_daily_clinic",
    stage: "🏡 日常生活 (Daily Life)",
    icon: "🏥",
    title: "診所就醫與藥局",
    description: "描述症狀、領藥、尋求協助",
    dialogues: [
      { speaker: "醫師", role: "staff", text: "今日はどうされましたか。", furigana: "今[きょう]日[は]はどうされましたか。", translation: "今天怎麼了嗎？哪裡不舒服？" },
      { speaker: "病患", role: "user", text: "昨日から熱があって、喉もすごく痛いんです。", furigana: "昨[きのう]日[う]から熱[ねつ]があって、喉[のど]もすごく痛[いた]いんです。", translation: "從昨天開始就發燒，而且喉嚨非常痛。" },
      { speaker: "醫師", role: "staff", text: "風邪ですね。解熱鎮痛剤とうがい薬を出しておきます。", furigana: "風[かぜ]邪[ぜ]ですね。解[げ]熱[ねつ]鎮[ちん]痛[つう]剤[ざい]とうがい薬[ぐすり]を出[だ]しておきます。", translation: "是感冒呢。我會開退燒止痛藥跟漱口水給您。" },
      { speaker: "病患", role: "user", text: "ありがとうございます。薬は隣の薬局でもらえますか。", furigana: "ありがとうございます。薬[くすり]は隣[となり]の薬[やっ]局[きょく]でもらえますか。", translation: "謝謝。請問藥可以在隔壁的藥局領嗎？" }
    ]
  },

  // ==========================================
  // 3. 人際交友與休閒 (Social & Entertainment)
  // ==========================================
  {
    id: "conv_social_invite",
    stage: "🍻 人際交友與休閒 (Social & Entertainment)",
    icon: "💌",
    title: "交友邀約與拒絕",
    description: "約朋友出去玩、委婉拒絕邀約",
    dialogues: [
      { speaker: "朋友A", role: "staff", text: "今週末、みんなで映画見に行かない？", furigana: "今[こん]週[しゅう]末[まつ]、みんなで映[えい]画[が]見[み]に行[い]かない？", translation: "這週末大家要不要一起去看電影？" },
      { speaker: "主角", role: "user", text: "あー、ごめん。今週はちょっと用事があって…。", furigana: "あー、ごめん。今[こん]週[しゅう]はちょっと用[よう]事[じ]があって…。", translation: "啊，抱歉。這禮拜剛好有點事..." },
      { speaker: "朋友A", role: "staff", text: "そっか、残念。じゃあ、また今度誘うね！", furigana: "そっか、残[ざん]念[ねん]。じゃあ、また今[こん]度[ど]誘[さそ]うね！", translation: "這樣啊，真可惜。那我下次再約你！" },
      { speaker: "主角", role: "user", text: "うん、誘ってくれてありがとう。楽しんできてね。", furigana: "うん、誘[さそ]ってくれてありがとう。楽[たの]しんできてね。", translation: "嗯，謝謝你約我。你們好好去玩喔。" }
    ]
  },
  {
    id: "conv_social_izakaya",
    stage: "🍻 人際交友與休閒 (Social & Entertainment)",
    icon: "🍺",
    title: "居酒屋與聚會",
    description: "日本特有點餐文化、乾杯、閒聊",
    dialogues: [
      { speaker: "同事A", role: "staff", text: "とりあえず生ビールでいいかな？", furigana: "とりあえず生[なま]ビールでいいかな？", translation: "總而言之先點生啤酒可以嗎？" },
      { speaker: "主角", role: "user", text: "はい、生でお願いします。唐揚げも頼みましょう！", furigana: "はい、生[なま]でお願[ねが]いします。唐[から]揚[あ]げも頼[たの]みましょう！", translation: "好的，請給我生啤。我們也點個炸雞塊吧！" },
      { speaker: "同事A", role: "staff", text: "よし、じゃあみんなグラス持って！お疲れ様でした、乾杯！", furigana: "よし、じゃあみんなグラス持[も]って！お疲[つか]れ様[さま]でした、乾[かん]杯[ぱい]！", translation: "好，那大家把酒杯拿好！辛苦了，乾杯！" },
      { speaker: "主角", role: "user", text: "乾杯！今週は本当に忙しかったですね。", furigana: "乾[かん]杯[ぱい]！今[こん]週[しゅう]は本[ほん]当[とう]に忙[いそが]しかったですね。", translation: "乾杯！這個禮拜真的是有夠忙的。" }
    ]
  },
  {
    id: "conv_social_complain",
    stage: "🍻 人際交友與休閒 (Social & Entertainment)",
    icon: "💬",
    title: "傾訴抱怨與安慰",
    description: "朋友間的煩惱傾談、表達情緒",
    dialogues: [
      { speaker: "主角", role: "user", text: "最近、仕事のストレスがひどくて、全然眠れないんだ。", furigana: "最[さい]近[きん]、仕[し]事[ごと]のストレスがひどくて、全[ぜん]然[ぜん]眠[ねむ]れないんだ。", translation: "最近工作壓力超大，完全睡不著。" },
      { speaker: "朋友B", role: "staff", text: "大丈夫？あんまり無理しないでね。いつでも話聞くから。", furigana: "大[だい]丈[じょう]夫[ぶ]？あんまり無[む]理[り]しないでね。いつでも話[はなし]聞[き]くから。", translation: "你還好嗎？不要太勉強自己喔。我隨時都可以聽你說。" },
      { speaker: "主角", role: "user", text: "ありがとう。なんか、話したら少しすっきりしたよ。", furigana: "ありがとう。なんか、話[はな]したら少[すこ]しすっきりしたよ。", translation: "謝謝你。總覺得說出來之後稍微舒坦一點了。" },
      { speaker: "朋友B", role: "staff", text: "たまには息抜きも必要だよ。美味しいものでも食べに行こう！", furigana: "たまには息[いき]抜[ぬ]きも必[ひつ]要[よう]だよ。美[おい]味[し]いものでも食[た]べに行[い]こう！", translation: "偶爾也是需要喘口氣的。我們去吃點好吃的吧！" }
    ]
  },

  // ==========================================
  // 4. 職場與商務 (Business & Professional)
  // ==========================================
  {
    id: "conv_biz_interview",
    stage: "💼 職場與商務 (Business & Professional)",
    icon: "🤝",
    title: "求職與面試",
    description: "回答面試官提問、自我介紹",
    dialogues: [
      { speaker: "面試官", role: "staff", text: "これまでのご経歴と、転職の理由を教えていただけますか。", furigana: "これまでのご経[けい]歴[れき]と、転[てん]職[しょく]の理[り]由[ゆう]を教[おし]えていただけますか。", translation: "可以請您說說過去的經歷，以及想轉職的理由嗎？" },
      { speaker: "面試者", role: "user", text: "はい。前職では営業として5年間勤務し、新規開拓に努めてまいりました。", furigana: "はい。前[ぜん]職[しょく]では営[えい]業[ぎょう]として5年[ねん]間[かん]勤[きん]務[む]し、新[しん]規[き]開[かい]拓[たく]に努[つと]めてまいりました。", translation: "好的。我在前公司擔任業務 5 年，一直致力於開發新客源。" },
      { speaker: "面試官", role: "staff", text: "当社の海外事業部に興味を持たれた理由はなんですか。", furigana: "当[とう]社[しゃ]の海[かい]外[がい]事[じ]業[ぎょう]部[ぶ]に興[きょう]味[み]を持[も]たれた理[り]由[ゆう]はなんですか。", translation: "您對我們公司海外事業部感興趣的理由是什麼呢？" },
      { speaker: "面試者", role: "user", text: "私の語学力を活かし、御社のグローバル展開に貢献したいと考えたからです。", furigana: "私[わたし]の語[ご]学[がく]力[りょく]を活[い]かし、御[おん]社[しゃ]のグローバル展[てん]開[かい]に貢[こう]献[けん]したいと考[かんが]えたからです。", translation: "是因為我希望能活用我的外語能力，為貴公司的全球化發展貢獻一份心力。" }
    ]
  },
  {
    id: "conv_biz_office",
    stage: "💼 職場與商務 (Business & Professional)",
    icon: "📞",
    title: "辦公室報聯相",
    description: "向上司報告進度、請假、接聽電話",
    dialogues: [
      { speaker: "部下", role: "user", text: "課長、今お時間よろしいでしょうか。A社のプロジェクトについてご報告があります。", furigana: "課[か]長[ちょう]、今[いま]お時[じ]間[かん]よろしいでしょうか。A社[しゃ]のプロジェクトについてご報[ほう]告[こく]があります。", translation: "課長，現在方便打擾一下嗎？關於A公司的專案我有點事想報告。" },
      { speaker: "課長", role: "staff", text: "ああ、どうぞ。進捗はどうなっている？", furigana: "ああ、どうぞ。進[しん]捗[ちょく]はどうなっている？", translation: "喔，請說。進度現在怎麼樣了？" },
      { speaker: "部下", role: "user", text: "予定より少し遅れておりまして、スケジュールの調整をお願いしたいと考えております。", furigana: "予[よ]定[てい]より少[すこ]し遅[おく]れておりまして、スケジュールの調[ちょう]整[せい]をお願[ねが]いしたいと考[かんが]えております。", translation: "目前的進度比預期稍微落後，希望能夠調整一下時程。" },
      { speaker: "課長", role: "staff", text: "分かった。午後に関係者を集めてミーティングをしよう。", furigana: "分[わ]かった。午[ご]後[ご]に関[かん]係[けい]者[しゃ]を集[あつ]めてミーティングをしよう。", translation: "知道了。下午把相關人員找來開個會吧。" }
    ]
  },
  {
    id: "conv_biz_negotiate",
    stage: "💼 職場與商務 (Business & Professional)",
    icon: "🏢",
    title: "商務拜訪與談判",
    description: "拜訪客戶、報價與合約討論",
    dialogues: [
      { speaker: "業務員", role: "user", text: "本日はお時間をいただき、誠にありがとうございます。", furigana: "本[ほん]日[じつ]はお時[じ]間[かん]をいただき、誠[まこと]にありがとうございます。", translation: "非常感謝您今天撥冗見面。" },
      { speaker: "客戶", role: "staff", text: "いえいえ。さっそくですが、お見積もりの件についてお伺いできますか。", furigana: "いえいえ。さっそくですが、お見[み]積[つ]もりの件[けん]についてお伺[うかが]いできますか。", translation: "不會不會。我們就直接進入正題，可以請教一下報價的事情嗎？" },
      { speaker: "業務員", role: "user", text: "はい、こちらの資料をご覧ください。ロット数を増やしていただければ、単価を下げることが可能です。", furigana: "はい、こちらの資[し]料[りょう]をごらんください。ロット数[すう]を増[ふ]やしていただければ、単[たん]価[か]を下[さ]げることが可[か]能[のう]です。", translation: "好的，請看這份資料。如果您能增加訂購批量，單價就有調降的空間。" },
      { speaker: "客戶", role: "staff", text: "なるほど、社内で検討して、来週中にご連絡いたします。", furigana: "なるほど、社[しゃ]内[ない]で検[けん]討[とう]して、来[らい]週[しゅう]中[ちゅう]にご連[れん]絡[らく]いたします。", translation: "原來如此，我們會在公司內部檢討後，於下週內回覆您。" }
    ]
  },
  {
    id: "conv_biz_email",
    stage: "💼 職場與商務 (Business & Professional)",
    icon: "📧",
    title: "書信與客訴處理",
    description: "商業Email撰寫、回覆客戶抱怨",
    dialogues: [
      { speaker: "客服人員", role: "user", text: "平素は格別のお引き立てを賜り、厚く御礼申し上げます。", furigana: "平[へい]素[そ]は格[かく]別[べつ]のお引[ひ]き立[た]てを賜[たまわ]り、厚[あつ]く御[おん]礼[れい]申[もう]し上[あ]げます。", translation: "承蒙您平時特別的關照，在此致上最深的謝意。" },
      { speaker: "客服人員", role: "user", text: "この度は、製品の不具合によりご迷惑をおかけし、深くお詫び申し上げます。", furigana: "この度[たび]は、製[せい]品[ひん]の不[ふ]具[ぐ]合[あい]によりご迷[めい]惑[わく]をおかけし、深[ふか]くお詫[わ]び申[もう]し上[あ]げます。", translation: "這次因為產品的瑕疵給您添麻煩了，我們深感抱歉。" },
      { speaker: "顧客", role: "staff", text: "早急に代替品を送ってください。困っています。", furigana: "早[さっ]急[きゅう]に代[だい]替[たい]品[ひん]を送[おく]ってください。困[こま]っています。", translation: "請盡快寄送替代品過來。這讓我們很困擾。" },
      { speaker: "客服人員", role: "user", text: "直ちに新しい製品を発送手配いたしました。明日には到着予定でございます。", furigana: "直[ただ]ちに新[あたら]しい製[せい]品[ひん]を発[はっ]送[そう]手[て]配[はい]いたしました。明[あし]日[た]には到[とう]着[ちゃく]予[よ]定[てい]でございます。", translation: "我們已立刻安排寄送新產品了。預計明天就會送達。" }
    ]
  }
];

// Write to db
fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully injected 16 Practical Scenarios.');
