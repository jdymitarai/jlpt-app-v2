
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));

const newPronouns = [
  // 人稱代名詞 - 第一人稱
  { w: '私', k: '私', f: '私[わたし]', m: '我', c: 'pro_first_person', lv: 'N5', e_ja: '私は学生です。', e_zh: '我是學生。' },
  { w: '僕', k: '僕', f: '僕[ぼく]', m: '我(男性用語)', c: 'pro_first_person', lv: 'N5', e_ja: '僕の夢は医者になることです。', e_zh: '我的夢想是成為醫生。' },
  { w: '俺', k: '俺', f: '俺[おれ]', m: '我(男性粗獷/隨性)', c: 'pro_first_person', lv: 'N4', e_ja: '俺に任せろ。', e_zh: '交給我吧。' },
  { w: 'あたし', k: 'あたし', f: 'あたし', m: '我(女性較隨性用語)', c: 'pro_first_person', lv: 'N4', e_ja: 'あたしも行く！', e_zh: '我也要去！' },
  // 人稱代名詞 - 第二人稱
  { w: 'あなた', k: '貴方', f: '貴方[あなた]', m: '你', c: 'pro_second_person', lv: 'N5', e_ja: 'あなたは誰ですか。', e_zh: '你是誰？' },
  { w: '君', k: '君', f: '君[きみ]', m: '你(對平輩或晚輩使用)', c: 'pro_second_person', lv: 'N4', e_ja: '君のことが好きだ。', e_zh: '我喜歡你。' },
  { w: 'お前', k: 'お前', f: 'お前[まえ]', m: '你(較粗魯或親密)', c: 'pro_second_person', lv: 'N3', e_ja: 'お前は何が言いたいんだ？', e_zh: '你到底想說什麼？' },
  // 人稱代名詞 - 第三人稱與複數
  { w: '彼', k: '彼', f: '彼[かれ]', m: '他、男朋友', c: 'pro_third_person', lv: 'N4', e_ja: '彼は私の友達です。', e_zh: '他是我的朋友。' },
  { w: '彼女', k: '彼女', f: '彼女[かのじょ]', m: '她、女朋友', c: 'pro_third_person', lv: 'N4', e_ja: '彼女はとても優しい。', e_zh: '她非常溫柔。' },
  { w: '私たち', k: '私たち', f: '私[わたし]たち', m: '我們', c: 'pro_third_person', lv: 'N5', e_ja: '私たちは毎日日本語を勉強しています。', e_zh: '我們每天都在學日文。' },
  { w: '彼ら', k: '彼ら', f: '彼[かれ]ら', m: '他們', c: 'pro_third_person', lv: 'N4', e_ja: '彼らは会議中です。', e_zh: '他們正在開會。' },
  { w: '皆さん', k: '皆さん', f: '皆[みな]さん', m: '大家、各位', c: 'pro_third_person', lv: 'N5', e_ja: '皆さん、おはようございます。', e_zh: '各位早安。' },

  // 指示代名詞 - 事物
  { w: 'これ', k: 'これ', f: 'これ', m: '這個(離說話者近)', c: 'pro_demo_thing', lv: 'N5', e_ja: 'これは本です。', e_zh: '這是一本書。' },
  { w: 'それ', k: 'それ', f: 'それ', m: '那個(離聽話者近)', c: 'pro_demo_thing', lv: 'N5', e_ja: 'それを取ってください。', e_zh: '請把那個拿給我。' },
  { w: 'あれ', k: 'あれ', f: 'あれ', m: '那個(離雙方都遠)', c: 'pro_demo_thing', lv: 'N5', e_ja: 'あれは富士山です。', e_zh: '那是富士山。' },
  { w: 'どれ', k: 'どれ', f: 'どれ', m: '哪個(事物疑問)', c: 'pro_demo_thing', lv: 'N5', e_ja: 'あなたの傘はどれですか。', e_zh: '你的傘是哪一把？' },

  // 指示代名詞 - 場所與方向
  { w: 'ここ', k: 'ここ', f: 'ここ', m: '這裡(離說話者近)', c: 'pro_demo_place', lv: 'N5', e_ja: 'ここは学校です。', e_zh: '這裡是學校。' },
  { w: 'そこ', k: 'そこ', f: 'そこ', m: '那裡(離聽話者近)', c: 'pro_demo_place', lv: 'N5', e_ja: 'そこに置いてください。', e_zh: '請放在那裡。' },
  { w: 'あそこ', k: 'あそこ', f: 'あそこ', m: '那裡(離雙方都遠)', c: 'pro_demo_place', lv: 'N5', e_ja: 'あそこに犬がいます。', e_zh: '那裡有一隻狗。' },
  { w: 'こちら', k: 'こちら', f: 'こちら', m: '這邊(較禮貌的這裡)', c: 'pro_demo_place', lv: 'N5', e_ja: 'こちらへどうぞ。', e_zh: '請往這邊走。' },
  { w: 'そちら', k: 'そちら', f: 'そちら', m: '那邊(較禮貌的那裡)', c: 'pro_demo_place', lv: 'N5', e_ja: 'そちらの天気はどうですか。', e_zh: '那邊的天氣如何？' },
  { w: 'あちら', k: 'あちら', f: 'あちら', m: '那邊(較禮貌的遠處)', c: 'pro_demo_place', lv: 'N5', e_ja: 'あちらが会議室です。', e_zh: '那邊是會議室。' },
  
  // 疑問代名詞
  { w: '誰', k: '誰', f: '誰[だれ]', m: '誰', c: 'pro_interrogative', lv: 'N5', e_ja: 'あそこにいるのは誰ですか。', e_zh: '在那裡的是誰？' },
  { w: 'どなた', k: 'どなた', f: 'どなた', m: '哪位(誰的尊敬語)', c: 'pro_interrogative', lv: 'N5', e_ja: '失礼ですが、どなたですか。', e_zh: '不好意思，請問您是哪位？' },
  { w: 'どこ', k: 'どこ', f: 'どこ', m: '哪裡(場所疑問)', c: 'pro_interrogative', lv: 'N5', e_ja: 'トイレはどこですか。', e_zh: '洗手間在哪裡？' },
  { w: 'どちら', k: 'どちら', f: 'どちら', m: '哪邊、哪裡(禮貌)', c: 'pro_interrogative', lv: 'N5', e_ja: '出身はどちらですか。', e_zh: '您的家鄉在哪裡？' },
  { w: '何', k: '何', f: '何[なに]', m: '什麼', c: 'pro_interrogative', lv: 'N5', e_ja: 'これは何ですか。', e_zh: '這是什麼？' },
  { w: 'いつ', k: 'いつ', f: 'いつ', m: '何時', c: 'pro_interrogative', lv: 'N5', e_ja: '誕生日はいつですか。', e_zh: '生日是何時？' },
  { w: 'なぜ', k: '何故', f: '何故[なぜ]', m: '為何、為什麼', c: 'pro_interrogative', lv: 'N5', e_ja: 'なぜ泣いているの？', e_zh: '為什麼在哭呢？' },
  { w: 'どうして', k: 'どうして', f: 'どうして', m: '為什麼', c: 'pro_interrogative', lv: 'N5', e_ja: 'どうして遅れたんですか。', e_zh: '為什麼遲到了？' }
];

let addedCount = 0;
const timestamp = Date.now();

newPronouns.forEach((item, index) => {
  const lv = item.lv || 'N5';
  if (!data.JLPT_DATA_CHUNKS[lv]) data.JLPT_DATA_CHUNKS[lv] = { vocabulary: [] };

  const newItem = {
    id: 'pro_' + timestamp + '_' + index,
    word: item.w,
    kanji: item.k,
    furigana: item.f,
    kana: '', 
    romaji: '',
    type: 'pronoun',
    pos: '代名詞',
    category: item.c,
    level: lv,
    meaning: item.m,
    sentences: [
      {
        ja: item.e_ja,
        furigana: item.e_ja,
        zh: item.e_zh
      }
    ]
  };
  data.JLPT_DATA_CHUNKS[lv].vocabulary.push(newItem);
  addedCount++;
});

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(data, null, 2));
console.log('Added ' + addedCount + ' pronouns!');

