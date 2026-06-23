
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));

const newKeigo = [
  // 尊敬語動詞
  { w: 'いらっしゃる', k: 'いらっしゃる', f: 'いらっしゃる', m: '去、來、在 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: '先生がいらっしゃいました。', e_zh: '老師來了。 (原形：行く/来る/いる)' },
  { w: 'おっしゃる', k: '仰る', f: '仰[おっしゃ]る', m: '說 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: '社長がそうおっしゃいました。', e_zh: '總經理是這麼說的。 (原形：言う)' },
  { w: '召し上がる', k: '召し上がる', f: '召[め]し上[あ]がる', m: '吃、喝 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: 'どうぞお召し上がりください。', e_zh: '請享用(吃/喝)。 (原形：食べる/飲む)' },
  { w: 'ご覧になる', k: 'ご覧になる', f: 'ご 覧[らん] になる', m: '看 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: 'この資料をご覧になりましたか。', e_zh: '您看過這份資料了嗎？ (原形：見る)' },
  { w: 'なさる', k: 'なさる', f: 'なさる', m: '做 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: '休日は何をなさいますか。', e_zh: '您假日都做些什麼呢？ (原形：する)' },
  { w: 'おいでになる', k: 'お出でになる', f: 'お 出[い]で になる', m: '去、來、在 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: 'お客様がおいでになりました。', e_zh: '客人來了。 (原形：行く/来る/いる)' },
  { w: 'お休みになる', k: 'お休みになる', f: 'お 休[やす]み になる', m: '睡覺、休息 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: '先生はもうお休みになりました。', e_zh: '老師已經休息(睡覺)了。 (原形：寝る)' },
  { w: 'ご存知だ', k: 'ご存知だ', f: 'ご 存知[ぞんじ] だ', m: '知道 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: '彼の連絡先をご存知ですか。', e_zh: '您知道他的聯絡方式嗎？ (原形：知っている)' },
  { w: 'くださる', k: '下さる', f: '下[くだ]さる', m: '給予我 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N4', e_ja: '先生が本をくださいました。', e_zh: '老師給了我一本書。 (原形：くれる)' },
  { w: 'お召しになる', k: 'お召しになる', f: 'お 召[め]し になる', m: '穿 (尊敬語)', c: 'kei_sonkei_verb', lv: 'N3', e_ja: '素敵なコートをお召しですね。', e_zh: '您穿的外套真好看。 (原形：着る)' },

  // 尊敬語名詞
  { w: 'お名前', k: 'お名前', f: 'お 名前[なまえ]', m: '名字 (尊敬語)', c: 'kei_sonkei_noun', lv: 'N5', e_ja: 'お名前は何とおっしゃいますか。', e_zh: '請問您的大名是？' },
  { w: '貴社', k: '貴社', f: '貴社[きしゃ]', m: '貴公司 (書面尊敬語)', c: 'kei_sonkei_noun', lv: 'N3', e_ja: '貴社のますますのご発展をお祈り申し上げます。', e_zh: '祝貴公司日益發展。' },
  { w: '御社', k: '御社', f: '御社[おんしゃ]', m: '貴公司 (口語尊敬語)', c: 'kei_sonkei_noun', lv: 'N3', e_ja: '御社の製品に興味があります。', e_zh: '我對貴公司的產品有興趣。' },
  { w: 'お宅', k: 'お宅', f: 'お 宅[たく]', m: '府上、您的家 (尊敬語)', c: 'kei_sonkei_noun', lv: 'N4', e_ja: '明日、お宅に伺ってもよろしいですか。', e_zh: '明天方便去您府上拜訪嗎？' },

  // 謙讓語動詞
  { w: '参る', k: '参る', f: '参[まい]る', m: '去、來 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: '明日、そちらへ参ります。', e_zh: '我明天會過去那邊。 (原形：行く/来る)' },
  { w: '伺う', k: '伺う', f: '伺[うかが]う', m: '聽、問、拜訪 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: 'お話を伺いたいです。', e_zh: '想請教您一些事。 (原形：聞く/訪ねる)' },
  { w: '申す', k: '申す', f: '申[もう]す', m: '說、叫 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: '田中と申します。', e_zh: '我叫田中。 (原形：言う)' },
  { w: '申し上げる', k: '申し上げる', f: '申[もう]し 上[あ]げる', m: '說、表達 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: '心よりお詫び申し上げます。', e_zh: '我打從心底向您致歉。 (原形：言う)' },
  { w: '拝見する', k: '拝見する', f: '拝見[はいけん] する', m: '看 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: 'メールを拝見しました。', e_zh: '我已經看過郵件了。 (原形：見る)' },
  { w: 'いたす', k: '致す', f: '致[いた]す', m: '做 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: 'よろしくお願いいたします。', e_zh: '請多多指教。 (原形：する)' },
  { w: '存じる', k: '存じる', f: '存[ぞん]じる', m: '知道、認為 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: 'その件につきましては存じております。', e_zh: '關於那件事我已經知道了。 (原形：知っている)' },
  { w: 'いただく', k: '頂く', f: '頂[いただ]く', m: '得到、吃、喝 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: 'お土産をいただきました。', e_zh: '我收到了伴手禮。 (原形：もらう/食べる/飲む)' },
  { w: 'お目にかかる', k: 'お目にかかる', f: 'お 目[め] にかかる', m: '見面 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N4', e_ja: 'お目にかかれて光栄です。', e_zh: '能見到您是我的榮幸。 (原形：会う)' },
  { w: '承る', k: '承る', f: '承[うけたまわ]る', m: '聽從、接受、知道 (謙讓語)', c: 'kei_kenjou_verb', lv: 'N3', e_ja: 'ご注文を承りました。', e_zh: '您的訂單我們已經收到了。 (原形：聞く/引き受ける)' },

  // 謙讓語名詞
  { w: '弊社', k: '弊社', f: '弊社[へいしゃ]', m: '敝公司 (謙讓語)', c: 'kei_kenjou_noun', lv: 'N3', e_ja: '弊社のサービスをご利用ください。', e_zh: '請使用敝公司的服務。' },
  { w: 'わたくし', k: '私', f: '私[わたくし]', m: '我 (謙讓語)', c: 'kei_kenjou_noun', lv: 'N4', e_ja: 'わたくしが担当いたします。', e_zh: '將由我來負責。' },

  // 丁寧語與美化語
  { w: 'ございます', k: '御座います', f: '御座[ござ]います', m: '有、是 (丁寧語)', c: 'kei_teinei_general', lv: 'N4', e_ja: 'ありがとうございます。', e_zh: '非常感謝。 (原形：ある/だ)' },
  { w: 'よろしい', k: '宜しい', f: '宜[よろ]しい', m: '好的、可以的 (丁寧語)', c: 'kei_teinei_general', lv: 'N4', e_ja: 'こちらでよろしいでしょうか。', e_zh: '請問這樣可以嗎？ (原形：いい)' },
  { w: 'お茶', k: 'お茶', f: 'お 茶[ちゃ]', m: '茶 (美化語)', c: 'kei_bika_noun', lv: 'N5', e_ja: 'お茶をいれましょうか。', e_zh: '我來泡杯茶吧？' },
  { w: 'ご飯', k: 'ご飯', f: 'ご 飯[はん]', m: '飯 (美化語)', c: 'kei_bika_noun', lv: 'N5', e_ja: '一緒にご飯を食べませんか。', e_zh: '要不要一起吃飯？' }
];

let addedCount = 0;
const timestamp = Date.now();

newKeigo.forEach((item, index) => {
  const lv = item.lv || 'N4';
  if (!data.JLPT_DATA_CHUNKS[lv]) data.JLPT_DATA_CHUNKS[lv] = { vocabulary: [] };

  const newItem = {
    id: 'kei_' + timestamp + '_' + index,
    word: item.w,
    kanji: item.k,
    furigana: item.f,
    kana: '', 
    romaji: '',
    type: 'keigo',
    pos: '敬語',
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
console.log('Added ' + addedCount + ' keigo words!');

