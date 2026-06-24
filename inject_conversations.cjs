const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!data.JLPT_DATA) {
  data.JLPT_DATA = {};
}

data.JLPT_DATA.conversations = [
  {
    id: "conv_restaurant",
    icon: "🍽️",
    title: "餐廳與點餐",
    description: "訂位、入座、點餐、結帳等實用對話",
    dialogues: [
      { speaker: "店員", role: "staff", text: "いらっしゃいませ。何名様ですか。", furigana: "いらっしゃいませ。何[なん]名[めい]様[さま]ですか。", translation: "歡迎光臨，請問幾位？" },
      { speaker: "顧客", role: "user", text: "2人です。", furigana: "2[ふた]人[り]です。", translation: "兩位。" },
      { speaker: "店員", role: "staff", text: "こちらへどうぞ。ご注文はお決まりですか。", furigana: "こちらへどうぞ。ご注[ちゅう]文[もん]はお決[き]まりですか。", translation: "這邊請。請問決定好要點什麼了嗎？" },
      { speaker: "顧客", role: "user", text: "はい、これを2つお願いします。", furigana: "はい、これを2[ふた]つお願[ねが]いします。", translation: "好的，請給我這個兩份。" },
      { speaker: "店員", role: "staff", text: "かしこまりました。少々お待ちください。", furigana: "かしこまりました。少[しょう]々[しょう]お待[ま]ちください。", translation: "好的，請稍候。" },
      { speaker: "顧客", role: "user", text: "お会計をお願いします。クレジットカードは使えますか。", furigana: "お会[かい]計[けい]をお願[ねが]いします。クレジットカードは使[つか]えますか。", translation: "麻煩結帳。可以使用信用卡嗎？" },
      { speaker: "店員", role: "staff", text: "はい、使えます。ありがとうございました。", furigana: "はい、使[つか]えます。ありがとうございました。", translation: "可以的。非常感謝您的光臨。" }
    ]
  },
  {
    id: "conv_hotel",
    icon: "🏨",
    title: "飯店與住宿",
    description: "辦理入住、退房、寄放行李、詢問設施",
    dialogues: [
      { speaker: "顧客", role: "user", text: "チェックインをお願いします。", furigana: "チェックインをお願[ねが]いします。", translation: "我要辦理入住。" },
      { speaker: "櫃台", role: "staff", text: "ご予約のお名前を教えていただけますか。", furigana: "ご予[よ]約[やく]のお名[な]前[まえ]を教[おし]えていただけますか。", translation: "可以請問您預約的姓名嗎？" },
      { speaker: "顧客", role: "user", text: "王（おう）です。ネットで予約しました。", furigana: "王[おう]です。ネットで予[よ]約[やく]しました。", translation: "我姓王。是在網路上預約的。" },
      { speaker: "櫃台", role: "staff", text: "王様ですね。パスポートのコピーをお願いします。", furigana: "王[おう]様[さま]ですね。パスポートのコピーをお願[ねが]いします。", translation: "王先生/小姐。麻煩借我們影印一下護照。" },
      { speaker: "顧客", role: "user", text: "はい。あ、チェックアウトの後に荷物を預かってもらえますか。", furigana: "はい。あ、チェックアウトの後[あと]に荷[に]物[もつ]を預[あず]かってもらえますか。", translation: "好的。啊，退房後可以寄放行李嗎？" },
      { speaker: "櫃台", role: "staff", text: "はい、フロントでお預かりします。", furigana: "はい、フロントでお預[あず]かりします。", translation: "可以的，我們可以在櫃台為您保管。" }
    ]
  },
  {
    id: "conv_shopping",
    icon: "🛍️",
    title: "購物與退稅",
    description: "詢問價格、找尺寸、試穿與免稅手續",
    dialogues: [
      { speaker: "顧客", role: "user", text: "すみません、これを試着してもいいですか。", furigana: "すみません、これを試[し]着[ちゃく]してもいいですか。", translation: "不好意思，這個可以試穿嗎？" },
      { speaker: "店員", role: "staff", text: "はい、試着室はこちらです。", furigana: "はい、試[し]着[ちゃく]室[しつ]はこちらです。", translation: "可以的，試穿室在這邊。" },
      { speaker: "顧客", role: "user", text: "少し小さいです。もう一つ大きいサイズはありますか。", furigana: "少[すこ]し小[ちい]さいです。もう一[ひと]つ大[おお]きいサイズはありますか。", translation: "有點小。有大一個尺寸的嗎？" },
      { speaker: "店員", role: "staff", text: "はい、お持ちします。お待ちください。", furigana: "はい、お持[も]ちします。お待[ま]ちください。", translation: "有的，我去拿過來。請稍等。" },
      { speaker: "顧客", role: "user", text: "ぴったりです。これにします。免税はできますか。", furigana: "ぴったりです。これにします。免[めん]税[ぜい]はできますか。", translation: "很剛好。我要買這個。可以退稅嗎？" },
      { speaker: "店員", role: "staff", text: "はい、パスポートを見せてください。", furigana: "はい、パスポートを見[み]せてください。", translation: "可以的，請出示您的護照。" }
    ]
  },
  {
    id: "conv_transport",
    icon: "🚃",
    title: "交通與問路",
    description: "搭電車、買票、問路與尋找目的地",
    dialogues: [
      { speaker: "旅客", role: "user", text: "すみません、東京駅に行きたいんですが、何番線ですか。", furigana: "すみません、東[とう]京[きょう]駅[えき]に行[い]きたいんですが、何[なん]番[ばん]線[せん]ですか。", translation: "不好意思，我想去東京車站，請問是在第幾月台？" },
      { speaker: "站務員", role: "staff", text: "東京駅は3番線です。山手線に乗ってください。", furigana: "東[とう]京[きょう]駅[えき]は3番[ばん]線[せん]です。山[やま]手[のて]線[せん]に乗[の]ってください。", translation: "東京車站在3號月台。請搭乘山手線。" },
      { speaker: "旅客", role: "user", text: "ありがとうございます。この電車は新宿に停まりますか。", furigana: "ありがとうございます。この電[でん]車[しゃ]は新[しん]宿[じゅく]に停[と]まりますか。", translation: "謝謝。這班電車會停新宿嗎？" },
      { speaker: "站務員", role: "staff", text: "いいえ、これは快速なので、新宿には停まりません。", furigana: "いいえ、これは快[かい]速[そく]なので、新[しん]宿[じゅく]には停[と]まりません。", translation: "不會，這是快速列車，不會停靠新宿。" },
      { speaker: "旅客", role: "user", text: "わかりました。次の各駅停車を待ちます。", furigana: "わかりました。次[つぎ]の各[かく]駅[えき]停[てい]車[しゃ]を待[ま]ちます。", translation: "了解。那我等下一班每站皆停的普通車。" }
    ]
  },
  {
    id: "conv_hospital",
    icon: "🏥",
    title: "生病與就醫",
    description: "說明症狀、買藥、看醫生時的溝通",
    dialogues: [
      { speaker: "護理師", role: "staff", text: "どうされましたか。", furigana: "どうされましたか。", translation: "您怎麼了嗎？" },
      { speaker: "病患", role: "user", text: "昨日から熱があって、喉も痛いです。", furigana: "昨[きのう]日[う]から熱[ねつ]があって、喉[のど]も痛[いた]いです。", translation: "我從昨天開始發燒，而且喉嚨很痛。" },
      { speaker: "護理師", role: "staff", text: "咳は出ますか。", furigana: "咳[せき]は出[で]ますか。", translation: "有咳嗽嗎？" },
      { speaker: "病患", role: "user", text: "少し出ます。あと、頭痛もします。", furigana: "少[すこ]し出[で]ます。あと、頭[ず]痛[つう]もします。", translation: "有一點。還有，頭也很痛。" },
      { speaker: "醫師", role: "staff", text: "風邪ですね。薬を3日分出しておきます。ゆっくり休んでください。", furigana: "風邪[かぜ]ですね。薬[くすり]を3[みっ]日[か]分[ぶん]出[だ]しておきます。ゆっくり休[やす]んでください。", translation: "是感冒喔。我會開3天份的藥給你。請好好休息。" },
      { speaker: "病患", role: "user", text: "はい、ありがとうございます。お水で飲めばいいですか。", furigana: "はい、ありがとうございます。お水[みず]で飲[の]めばいいですか。", translation: "好的，謝謝醫生。配水喝就可以了嗎？" },
      { speaker: "醫師", role: "staff", text: "ええ、食後に水かお湯で飲んでください。", furigana: "ええ、食[しょく]後[ご]に水[みず]かお湯[ゆ]で飲[の]んでください。", translation: "對，請在飯後配水或溫水服用。" }
    ]
  }
];

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully injected 5 conversation scenarios into the database.');
