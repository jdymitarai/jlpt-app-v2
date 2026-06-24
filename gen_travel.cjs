const fs = require('fs');

const data = [
  // ✈️ 旅遊觀光 - 機場與海關
  { category: "機場與海關", title: "入境審查", icon: "🛂", description: "海關詢問來訪目的與停留時間", 
    dialogues: [
      { speaker: "審查官", role: "staff", text: "滞在の目的は何ですか。", furigana: "滞[たい]在[ざい]の目[もく]的[てき]は何[なん]ですか。", translation: "停留的目的是什麼？", tags: ["N5", "敬語"] },
      { speaker: "旅客", role: "user", text: "観光です。一週間滞在します。", furigana: "観[かん]光[こう]です。一[いっ]週[しゅう]間[かん]滞[たい]在[ざい]します。", translation: "觀光。會停留一個禮拜。", tags: ["N5", "敬語"] }
    ]
  },
  { category: "機場與海關", title: "提領行李", icon: "🧳", description: "尋找行李轉盤與確認行李", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "すみません、JL802便のバゲージクレームはどこですか。", furigana: "すみません、JL802便[びん]のバゲージクレームはどこですか。", translation: "不好意思，請問JL802班機的行李轉盤在哪裡？", tags: ["N4", "敬語", "實用"] },
      { speaker: "地勤人員", role: "staff", text: "あちらの3番テーブルになります。", furigana: "あちらの3番[ばん]テーブルになります。", translation: "在那邊的3號轉盤喔。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "機場與海關", title: "物品申報", icon: "📝", description: "填寫海關申報單與確認違禁品", 
    dialogues: [
      { speaker: "海關", role: "staff", text: "申告するものはありますか。", furigana: "申[しん]告[こく]するものはありますか。", translation: "有要申報的物品嗎？", tags: ["N5", "敬語"] },
      { speaker: "旅客", role: "user", text: "いいえ、ありません。お酒もタバコも持っていません。", furigana: "いいえ、ありません。お酒[さけ]もタバコも持[も]っていません。", translation: "沒有。我也沒有帶菸酒。", tags: ["N5", "敬語"] }
    ]
  },
  { category: "機場與海關", title: "尋找機場設施", icon: "🏧", description: "尋找廁所、外幣兌換處或租借Wi-Fi", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "両替所はどこにありますか。", furigana: "両[りょう]替[がえ]所[じょ]はどこにありますか。", translation: "請問外幣兌換處在哪裡？", tags: ["N5", "敬語", "問路"] },
      { speaker: "詢問處", role: "staff", text: "このエスカレーターを降りて右側にございます。", furigana: "このエスカレーターを降[お]りて右[みぎ]側[がわ]にございます。", translation: "搭這座手扶梯下去後在右手邊。", tags: ["N4", "謙讓語"] }
    ]
  },

  // ✈️ 旅遊觀光 - 交通移動
  { category: "交通移動", title: "購買車票", icon: "🎫", description: "操作售票機與詢問交通卡", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "新宿までの切符の買い方が分かりません。", furigana: "新[しん]宿[じゅく]までの切[きっ]符[ぷ]の買[か]い方[かた]が分[わ]かりません。", translation: "我不知道去新宿的車票怎麼買。", tags: ["N4", "敬語"] },
      { speaker: "站務員", role: "staff", text: "あちらの券売機で、画面を英語に切り替えられますよ。", furigana: "あちらの券[けん]売[ばい]機[き]で、画[が]面[めん]を英[えい]語[ご]に切[き]り替[か]えられますよ。", translation: "在那邊的售票機，可以把畫面切換成英文喔。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "交通移動", title: "詢問路線與轉乘", icon: "🗺️", description: "確認月台與抵達時間", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "この電車は秋葉原に止まりますか。", furigana: "この電[でん]車[しゃ]は秋[あき]葉[は]原[ばら]に止[と]まりますか。", translation: "這班電車會停秋葉原嗎？", tags: ["N5", "敬語"] },
      { speaker: "站務員", role: "staff", text: "いいえ、快速は止まりません。次の普通電車にお乗りください。", furigana: "いいえ、快[かい]速[そく]は止[と]まりません。次[つぎ]の普[ふつう]通[つう]電[でん]車[しゃ]にお乗[の]りください。", translation: "不會，快速列車不停。請搭乘下一班普通車。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "交通移動", title: "搭乘計程車", icon: "🚕", description: "指示目的地與結帳", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "東京タワーまでお願いします。", furigana: "東[とう]京[きょう]タワーまでお願[ねが]いします。", translation: "麻煩到東京鐵塔。", tags: ["N5", "敬語"] },
      { speaker: "司機", role: "staff", text: "かしこまりました。シートベルトをお締めください。", furigana: "かしこまりました。シートベルトをお締[し]めください。", translation: "好的。請繫上安全帶。", tags: ["N4", "謙讓語"] }
    ]
  },
  { category: "交通移動", title: "租車與還車", icon: "🚗", description: "辦理租車手續與還車確認", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "ネットで予約した王です。国際免許証はこちらです。", furigana: "ネットで予[よ]約[やく]した王[おう]です。国[こく]際[さい]免[めん]許[きょ]証[しょう]はこちらです。", translation: "我是網路上預約的王。這是我的國際駕照。", tags: ["N4", "敬語"] },
      { speaker: "店員", role: "staff", text: "ありがとうございます。ガソリンは満タンにしてご返却ください。", furigana: "ありがとうございます。ガソリンは満[まん]タンにしてご返[へん]却[きゃく]ください。", translation: "謝謝您。還車時請將油箱加滿。", tags: ["N3", "敬語"] }
    ]
  },

  // ✈️ 旅遊觀光 - 飯店住宿
  { category: "飯店住宿", title: "辦理入住", icon: "🏨", description: "Check-in手續與確認資料", 
    dialogues: [
      { speaker: "櫃台", role: "staff", text: "いらっしゃいませ。ご予約のお名前をお願いします。", furigana: "いらっしゃいませ。ご予[よ]約[やく]のお名[な]前[まえ]をお願[ねが]いします。", translation: "歡迎光臨。請給我您預約的姓名。", tags: ["N4", "敬語"] },
      { speaker: "旅客", role: "user", text: "林です。3泊で予約しています。", furigana: "林[はやし]です。3泊[はく]で予[よ]約[やく]しています。", translation: "我姓林。預約了三個晚上。", tags: ["N5", "敬語"] }
    ]
  },
  { category: "飯店住宿", title: "詢問設施", icon: "♨️", description: "詢問溫泉、早餐時間或大廳設備", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "朝食は何時からですか。あと、大浴場はどこですか。", furigana: "朝[ちょう]食[しょく]は何[なん]時[じ]からですか。あと、大[だい]浴[よく]場[じょう]はどこですか。", translation: "早餐是從幾點開始？還有大浴場在哪裡？", tags: ["N5", "敬語"] },
      { speaker: "櫃台", role: "staff", text: "朝食は7時から1階のレストランで、大浴場は2階にございます。", furigana: "朝[ちょう]食[しょく]は7時[じ]から1階[かい]のレストランで、大[だい]浴[よく]場[じょう]は2階[かい]にございます。", translation: "早餐7點開始在一樓餐廳，大浴場位於二樓。", tags: ["N4", "謙讓語"] }
    ]
  },
  { category: "飯店住宿", title: "客房服務", icon: "🛎️", description: "索取毛巾、備品或點餐", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "タオルの替えを部屋まで持ってきてもらえますか。", furigana: "タオルの替[か]えを部[へ]屋[や]まで持[も]ってきてもらえますか。", translation: "可以請你們送替換的毛巾到房間來嗎？", tags: ["N4", "敬語", "請求"] },
      { speaker: "客服", role: "staff", text: "かしこまりました。すぐにお持ちいたします。", furigana: "かしこまりました。すぐにお持[も]ちいたします。", translation: "好的。馬上為您送去。", tags: ["N4", "謙讓語"] }
    ]
  },
  { category: "飯店住宿", title: "寄放行李", icon: "🎒", description: "入住前或退房後寄放行李", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "チェックアウト後ですが、夕方まで荷物を預かってもらえますか。", furigana: "チェックアウト後[あと]ですが、夕[ゆう]方[がた]まで荷[に]物[もつ]を預[あず]かってもらえますか。", translation: "雖然已經退房了，但能幫我寄放行李到傍晚嗎？", tags: ["N4", "敬語"] },
      { speaker: "櫃台", role: "staff", text: "はい、承知いたしました。こちらの番号札をお持ちください。", furigana: "はい、承[しょう]知[ち]いたしました。こちらの番[ばん]号[ごう]札[ふだ]をお持[も]ちください。", translation: "好的，了解了。請保管好這張號碼牌。", tags: ["N4", "謙讓語"] }
    ]
  },

  // ✈️ 旅遊觀光 - 餐飲點餐
  { category: "餐飲點餐", title: "預約餐廳", icon: "☎️", description: "打電話預約人數與時間", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "今日の夜7時に、3名で予約したいのですが。", furigana: "今[きょう]日[の]の夜[よる]7時[じ]に、3名[めい]で予[よ]約[やく]したいのですが。", translation: "我想要預約今天晚上7點，總共三位。", tags: ["N4", "敬語"] },
      { speaker: "店員", role: "staff", text: "申し訳ありません、本日はすでに満席となっております。", furigana: "申[もう]し訳[わけ]ありません、本[ほん]日[じつ]はすでに満[まん]席[せき]となっております。", translation: "非常抱歉，今天已經客滿了。", tags: ["N3", "謙讓語"] }
    ]
  },
  { category: "餐飲點餐", title: "索取菜單", icon: "📖", description: "入座後索取外文菜單與推薦菜色", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "すみません、英語のメニューはありますか。", furigana: "すみません、英[えい]語[ご]のメニューはありますか。", translation: "不好意思，請問有英文菜單嗎？", tags: ["N5", "敬語"] },
      { speaker: "店員", role: "staff", text: "はい、こちらになります。ご注文がお決まりになりましたらお呼びください。", furigana: "はい、こちらになります。ご注[ちゅう]文[もん]がお決[き]まりになりましたらお呼[よ]びください。", translation: "有的，這邊請。決定好餐點的話請再叫我。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "餐飲點餐", title: "特殊飲食需求", icon: "🥗", description: "表達吃素或對特定食物過敏", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "甲殻類アレルギーなのですが、このスープにエビは入っていますか。", furigana: "甲[こう]殻[かく]類[るい]アレルギーなのですが、このスープにエビは入[はい]っていますか。", translation: "我對甲殼類過敏，這碗湯裡面有蝦子嗎？", tags: ["N3", "敬語", "求助"] },
      { speaker: "店員", role: "staff", text: "エビの出汁を使用しております。別のメニューをご案内しましょうか。", furigana: "エビの出[だ]汁[し]を使[し]用[よう]しております。別[べつ]のメニューをご案[あん]内[ない]しましょうか。", translation: "裡面有用到蝦子熬高湯。需要為您介紹其他餐點嗎？", tags: ["N3", "謙讓語"] }
    ]
  },
  { category: "餐飲點餐", title: "結帳與索取收據", icon: "💳", description: "飯後結帳與發票處理", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "お会計お願いします。クレジットカードは使えますか。", furigana: "お会[かい]計[けい]お願[ねが]いします。クレジットカードは使[つか]えますか。", translation: "麻煩結帳。可以刷信用卡嗎？", tags: ["N5", "敬語"] },
      { speaker: "店員", role: "staff", text: "はい、ご利用いただけます。領収書は必要ですか。", furigana: "はい、ご利[り]用[よう]いただけます。領[りょう]収[しゅう]書[しょ]は必[ひつ]要[よう]ですか。", translation: "可以的。需要開立收據嗎？", tags: ["N5", "敬語"] }
    ]
  },

  // ✈️ 旅遊觀光 - 購物消費
  { category: "購物消費", title: "尋找特定商品", icon: "🔍", description: "拿照片詢問店員商品位置", 
    dialogues: [
      { speaker: "顧客", role: "user", text: "すみません、この写真の化粧品を探しているんですが。", furigana: "すみません、この写[しゃ]真[しん]の化[け]粧[しょう]品[ひん]を探[さが]しているんですが。", translation: "不好意思，我在找照片上的這款化妝品。", tags: ["N4", "敬語"] },
      { speaker: "店員", role: "staff", text: "そちらでしたら、3番の棚にございます。ご案内します。", furigana: "そちらでしたら、3番[ばん]の棚[たな]にございます。ご案[あん]内[ない]します。", translation: "那個的話在3號貨架上。我帶您去。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "購物消費", title: "試穿尺寸", icon: "👕", description: "詢問試衣間與其他尺碼", 
    dialogues: [
      { speaker: "顧客", role: "user", text: "これ試着してもいいですか。あと、Mサイズはありますか。", furigana: "これ試[し]着[ちゃく]してもいいですか。あと、Mサイズはありますか。", translation: "這個可以試穿嗎？還有，有M號的嗎？", tags: ["N5", "敬語"] },
      { speaker: "店員", role: "staff", text: "はい、試着室へどうぞ。Mサイズをお持ちしますね。", furigana: "はい、試[し]着[ちゃく]室[しつ]へどうぞ。Mサイズをお持[も]ちしますね。", translation: "可以，請到試衣間。我幫您拿M號過來。", tags: ["N5", "敬語"] }
    ]
  },
  { category: "購物消費", title: "詢問折扣與庫存", icon: "🏷️", description: "確認特價商品與是否還有庫存", 
    dialogues: [
      { speaker: "顧客", role: "user", text: "この商品はセール対象ですか。別の色はありますか。", furigana: "この商[しょう]品[ひん]はセール対[たい]象[しょう]ですか。別[べつ]の色[いろ]はありますか。", translation: "這個商品有打折嗎？有別的顏色嗎？", tags: ["N4", "敬語"] },
      { speaker: "店員", role: "staff", text: "申し訳ありません、こちらは新作でして…。お色もこれだけになります。", furigana: "申[もう]し訳[わけ]ありません、こちらは新[しん]作[さく]でして…。お色[いろ]もこれだけになります。", translation: "非常抱歉，這是新款... 顏色也只有這一種了。", tags: ["N3", "敬語"] }
    ]
  },
  { category: "購物消費", title: "辦理退稅", icon: "🛂", description: "結帳時辦理 Tax-free", 
    dialogues: [
      { speaker: "顧客", role: "user", text: "免税でお願いします。", furigana: "免[めん]税[ぜい]でお願[ねが]いします。", translation: "請幫我辦理免稅。", tags: ["N5", "敬語"] },
      { speaker: "店員", role: "staff", text: "かしこまりました。パスポートのご提示をお願いいたします。", furigana: "かしこまりました。パスポートのご提[てい]示[じ]をお願[ねが]いいたします。", translation: "好的。麻煩請出示您的護照。", tags: ["N4", "謙讓語"] }
    ]
  },

  // ✈️ 旅遊觀光 - 景點導覽
  { category: "景點導覽", title: "問路", icon: "🗺️", description: "在街上向當地人問路", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "すみません、浅草寺にはどう行けばいいですか。", furigana: "すみません、浅[あさ]草[くさ]寺[でら]にはどう行[い]けばいいですか。", translation: "不好意思，請問要去淺草寺該怎麼走？", tags: ["N5", "敬語", "問路"] },
      { speaker: "路人", role: "staff", text: "この道をまっすぐ行って、最初の信号を右に曲がるとすぐですよ。", furigana: "この道[みち]をまっすぐ行[い]って、最[さい]初[しょ]の信[しん]号[ごう]を右[みぎ]に曲[ま]がるとすぐですよ。", translation: "這條路直走，在第一個紅綠燈右轉馬上就到了喔。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "景點導覽", title: "購買景點門票", icon: "🎟️", description: "購買不同票種與索取導覽手冊", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "大人2枚、子供1枚お願いします。", furigana: "大[おと]人[な]2枚[まい]、子[こ]供[ども]1枚[まい]お願[ねが]いします。", translation: "請給我兩張全票，一張半票。", tags: ["N5", "敬語"] },
      { speaker: "售票員", role: "staff", text: "3500円になります。パンフレットはこちらです。", furigana: "3500円[えん]になります。パンフレットはこちらです。", translation: "總共是3500日圓。簡介導覽在這邊。", tags: ["N5", "敬語"] }
    ]
  },
  { category: "景點導覽", title: "請求路人協助拍照", icon: "📷", description: "請人幫忙合照與感謝", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "すみません、シャッターを押していただけませんか。", furigana: "すみません、シャッターを押[お]していただけませんか。", translation: "不好意思，可以幫我們按個快門拍照嗎？", tags: ["N4", "敬語", "請求"] },
      { speaker: "路人", role: "staff", text: "はい、チーズ！もう一枚縦で撮りますね。", furigana: "はい、チーズ！もう一[いち]枚[まい]縦[たて]で撮[と]りますね。", translation: "好，西瓜！我再幫你們直的拍一張喔。", tags: ["N4", "敬語"] }
    ]
  },

  // ✈️ 旅遊觀光 - 緊急狀況
  { category: "緊急狀況", title: "遺失物品", icon: "👜", description: "在車站或警局報失物品", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "電車にカバンを置き忘れました。", furigana: "電[でん]車[しゃ]にカバンを置[お]き忘[わす]れました。", translation: "我把包包忘在電車上了。", tags: ["N4", "敬語", "求助"] },
      { speaker: "站務員", role: "staff", text: "落ち着いてください。何線の何時頃ですか。", furigana: "落[お]ち着[つ]いてください。何[なに]線[せん]の何[なん]時[じ]頃[ごろ]ですか。", translation: "請冷靜。是哪條路線大約幾點的車？", tags: ["N4", "敬語"] }
    ]
  },
  { category: "緊急狀況", title: "迷路求助", icon: "🧭", description: "找不到路或搭錯車", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "道に迷ってしまいました。ここは地図のどこですか。", furigana: "道[みち]に迷[まよ]ってしまいました。ここは地[ち]図[ず]のどこですか。", translation: "我迷路了。請問這裡是地圖上的哪裡？", tags: ["N4", "敬語", "求助"] },
      { speaker: "路人", role: "staff", text: "今いるのはここです。駅に戻りたいなら、私が案内しますよ。", furigana: "今[いま]いるのはここです。駅[えき]に戻[もど]りたいなら、私[わたし]が案[あん]内[ない]しますよ。", translation: "現在在這裡。如果你想回車站，我帶你去吧。", tags: ["N4", "敬語"] }
    ]
  },
  { category: "緊急狀況", title: "突發疾病就醫", icon: "🚑", description: "身體不適與呼叫救護車", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "気分がとても悪いです。救急車を呼んでください。", furigana: "気[き]分[ぶん]がとても悪[わる]いです。救[きゅう]急[きゅう]車[しゃ]を呼[よ]んでください。", translation: "我非常不舒服。請幫我叫救護車。", tags: ["N4", "敬語", "求助", "緊急"] },
      { speaker: "飯店人員", role: "staff", text: "すぐに手配します！保険証はお持ちですか。", furigana: "すぐに手[て]配[はい]します！保[ほ]険[けん]証[しょう]はお持[も]ちですか。", translation: "我馬上叫！您有帶健保卡或保險證明嗎？", tags: ["N3", "敬語"] }
    ]
  },
  { category: "緊急狀況", title: "聯絡大使館或報警", icon: "👮", description: "護照遺失或遭遇竊盜", 
    dialogues: [
      { speaker: "旅客", role: "user", text: "パスポートと財布を盗まれました。", furigana: "パスポートと財[さい]布[ふ]を盗[ぬす]まれました。", translation: "我的護照和錢包被偷了。", tags: ["N4", "敬語", "被動語態", "求助"] },
      { speaker: "警察", role: "staff", text: "まずは被害届を作成しましょう。それから大使館に連絡してください。", furigana: "まずは被[ひ]害[がい]届[とどけ]を作[さく]成[せい]しましょう。それから大[たい]使[し]館[かん]に連[れん]絡[らく]してください。", translation: "我們先生效報案證明。然後請您聯絡大使館。", tags: ["N3", "敬語"] }
    ]
  }
];

const dbPath = 'c:/ai/jlpt_data_export.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Format and add to array
data.forEach((item, index) => {
  item.id = `conv_travel_${index}`;
  item.stage = "✈️ 旅遊觀光 (Travel & Sightseeing)";
  db.JLPT_DATA.conversations.push(item);
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Injected ${data.length} Travel scenarios.`);
