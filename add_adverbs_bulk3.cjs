
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));

const newAdverbs = [
  { w: 'あくまで', k: '飽くまで', f: '飽[あく]まで', m: '到底、徹底地', c: 'adv_logic_mood', e_ja: '飽くまで自分の意見を主張する。', e_zh: '徹底堅持自己的意見。' },
  { w: 'あきらかに', k: '明らかに', f: '明[あき]らかに', m: '明顯地', c: 'adv_senses_perception', e_ja: '明らかに彼が間違っている。', e_zh: '明顯是他錯了。' },
  { w: 'いちがいに', k: '一概に', f: '一概[いちがい]に', m: '一概地、無差別地', c: 'adv_logic_mood', e_ja: '一概に悪いとは言えない。', e_zh: '不能一概而論說是不好的。' },
  { w: 'いやいや', k: '嫌々', f: '嫌々[いやいや]', m: '不情願地', c: 'adv_psych_emotion', e_ja: '嫌々仕事を引き受けた。', e_zh: '不情願地接下了工作。' },
  { w: 'うとうと', k: 'うとうと', f: 'うとうと', m: '打瞌睡地', c: 'adv_body_physio', e_ja: '授業中にうとうとしてしまった。', e_zh: '上課時不小心打瞌睡了。' },
  { w: 'えんえんと', k: '延々と', f: '延々[えんえん]と', m: '沒完沒了地', c: 'adv_time_freq', e_ja: '延々と会議が続いた。', e_zh: '會議沒完沒了地進行著。' },
  { w: 'おおいに', k: '大いに', f: '大[おお]いに', m: '大大地、非常', c: 'adv_degree_qty', e_ja: '大いに盛り上がった。', e_zh: '氣氛非常熱烈。' },
  { w: 'かくして', k: 'かくして', f: 'かくして', m: '於是、就這樣', c: 'adv_logic_mood', e_ja: 'かくして事件は解決した。', e_zh: '於是事件就這樣解決了。' },
  { w: 'きらきら', k: 'きらきら', f: 'きらきら', m: '閃閃發光地', c: 'adv_item_space', e_ja: '星がきらきら光っている。', e_zh: '星星閃閃發光。' },
  { w: 'くどくど', k: 'くどくど', f: 'くどくど', m: '囉嗦地', c: 'adv_comm_attitude', e_ja: 'くどくどと言い訳をするな。', e_zh: '不要囉哩囉嗦地找藉口。' },
  { w: 'くたくた', k: 'くたくた', f: 'くたくた', m: '筋疲力盡地', c: 'adv_body_physio', e_ja: '一日中歩いてくたくただ。', e_zh: '走了一整天累得筋疲力盡。' },
  { w: 'ごく', k: '極', f: '極[ごく]', m: '極其', c: 'adv_degree_qty', e_ja: 'これは極普通の現象だ。', e_zh: '這是極其普通的現象。' },
  { w: 'こつこつ', k: 'こつこつ', f: 'こつこつ', m: '孜孜不倦地', c: 'adv_work_study', e_ja: '毎日こつこつ勉強する。', e_zh: '每天孜孜不倦地學習。' },
  { w: 'ざっと', k: 'ざっと', f: 'ざっと', m: '粗略地', c: 'adv_daily_action', e_ja: '書類にざっと目を通した。', e_zh: '粗略地看了一下文件。' },
  { w: 'じかに', k: '直に', f: '直[じか]に', m: '直接地', c: 'adv_daily_action', e_ja: '社長に直に交渉する。', e_zh: '直接與總經理交涉。' },
  { w: 'しきりに', k: '頻りに', f: '頻[しき]りに', m: '頻繁地、不斷地', c: 'adv_time_freq', e_ja: '頻りに時計を気にする。', e_zh: '不斷地看手錶。' },
  { w: 'しとやかに', k: 'しとやかに', f: 'しとやかに', m: '端莊地', c: 'adv_comm_attitude', e_ja: 'しとやかに振る舞う。', e_zh: '舉止端莊。' },
  { w: 'すんなり', k: 'すんなり', f: 'すんなり', m: '順利地', c: 'adv_daily_action', e_ja: '交渉はすんなりまとまった。', e_zh: '交涉順利達成了。' },
  { w: 'ぞくぞく', k: '続々', f: '続々[ぞくぞく]', m: '陸續地', c: 'adv_time_freq', e_ja: '客が続々と集まってきた。', e_zh: '客人陸陸續續聚集過來。' },
  { w: 'だぶだぶ', k: 'だぶだぶ', f: 'だぶだぶ', m: '肥大地、寬大地', c: 'adv_item_space', e_ja: 'だぶだぶの服を着ている。', e_zh: '穿著肥大的衣服。' },
  { w: 'ちやほや', k: 'ちやほや', f: 'ちやほや', m: '溺愛、奉承', c: 'adv_comm_attitude', e_ja: '親にちやほやされて育った。', e_zh: '被父母溺愛長大。' },
  { w: 'つくづく', k: 'つくづく', f: 'つくづく', m: '深切地', c: 'adv_psych_emotion', e_ja: '自分が嫌になるとつくづく思う。', e_zh: '深切地覺得討厭自己。' },
  { w: 'とうてい', k: '到底', f: '到底[とうてい]', m: '到底、無論如何也', c: 'adv_logic_mood', e_ja: '到底間に合わない。', e_zh: '無論如何也趕不上了。' },
  { w: 'どうどうと', k: '堂々と', f: '堂々[どうどう]と', m: '堂堂正正地', c: 'adv_comm_attitude', e_ja: '堂々と意見を述べる。', e_zh: '堂堂正正地陳述意見。' },
  { w: 'どきまぎ', k: 'どきまぎ', f: 'どきまぎ', m: '慌張、不知所措', c: 'adv_psych_emotion', e_ja: '突然質問されてどきまぎした。', e_zh: '被突然提問而感到慌張。' },
  { w: 'なお', k: '尚', f: '尚[なお]', m: '尚、還', c: 'adv_logic_mood', e_ja: '尚、詳細は後日連絡します。', e_zh: '此外，詳情日後會聯絡。' },
  { w: 'なにしろ', k: '何しろ', f: '何[なに]しろ', m: '總之、因為', c: 'adv_logic_mood', e_ja: '何しろ時間がない。', e_zh: '總之就是沒有時間。' },
  { w: 'なんなりと', k: '何なりと', f: '何[なん]なりと', m: '無論什麼', c: 'adv_logic_mood', e_ja: '何なりとお申し付けください。', e_zh: '有什麼吩咐請儘管說。' },
  { w: 'にこにこ', k: 'にこにこ', f: 'にこにこ', m: '笑咪咪地', c: 'adv_body_physio', e_ja: '彼はいつもにこにこしている。', e_zh: '他總是笑咪咪的。' },
  { w: 'のきなみ', k: '軒並み', f: '軒並[のきな]み', m: '幾乎全部、一律', c: 'adv_degree_qty', e_ja: '株価が軒並み下落した。', e_zh: '股價全面下跌了。' },
  { w: 'のびのび', k: 'のびのび', f: 'のびのび', m: '無拘無束地、放鬆地', c: 'adv_psych_emotion', e_ja: '田舎でのびのびと育つ。', e_zh: '在鄉下無拘無束地長大。' },
  { w: 'ぱんぱん', k: 'ぱんぱん', f: 'ぱんぱん', m: '鼓鼓的', c: 'adv_item_space', e_ja: 'お腹がぱんぱんだ。', e_zh: '肚子撐得鼓鼓的。' },
  { w: 'ひやひや', k: 'ひやひや', f: 'ひやひや', m: '心驚膽戰地', c: 'adv_psych_emotion', e_ja: '見ているだけでひやひやする。', e_zh: '光是看著就心驚膽戰。' },
  { w: 'ぶつぶつ', k: 'ぶつぶつ', f: 'ぶつぶつ', m: '嘟噥地、發牢騷地', c: 'adv_comm_attitude', e_ja: 'ぶつぶつ文句を言う。', e_zh: '嘟嘟噥噥地發牢騷。' },
  { w: 'ふらふら', k: 'ふらふら', f: 'ふらふら', m: '搖晃地、蹣跚地', c: 'adv_body_physio', e_ja: '熱で頭がふらふらする。', e_zh: '發燒燒得頭暈目眩。' },
  { w: 'ぺこぺこ', k: 'ぺこぺこ', f: 'ぺこぺこ', m: '點頭哈腰、肚子極餓', c: 'adv_body_physio', e_ja: 'お腹がぺこぺこだ。', e_zh: '肚子餓扁了。' },
  { w: 'ほっと', k: 'ほっと', f: 'ほっと', m: '鬆了一口氣', c: 'adv_psych_emotion', e_ja: '無事に終わってほっとした。', e_zh: '順利結束後鬆了一口氣。' },
  { w: 'ぽろぽろ', k: 'ぽろぽろ', f: 'ぽろぽろ', m: '紛紛落下的樣子', c: 'adv_physical_change', e_ja: '涙がぽろぽろこぼれた。', e_zh: '眼淚撲簌簌地流下來。' },
  { w: 'まじまじ', k: 'まじまじ', f: 'まじまじ', m: '目不轉睛地', c: 'adv_senses_perception', e_ja: '相手の顔をまじまじと見つめる。', e_zh: '目不轉睛地盯著對方的臉。' },
  { w: 'まんざら', k: '満更', f: '満更[まんざら]', m: '未必、並不完全（接否定）', c: 'adv_logic_mood', e_ja: '満更嘘でもない。', e_zh: '未必完全是說謊。' },
  { w: 'みるみる', k: '見る見る', f: '見[み]る見[み]る', m: '眼看著', c: 'adv_physical_change', e_ja: '見る見るうちに空が暗くなった。', e_zh: '眼看著天空就變暗了。' },
  { w: 'もろに', k: 'もろに', f: 'もろに', m: '迎面、直接', c: 'adv_daily_action', e_ja: 'もろにボールが当たった。', e_zh: '球直接砸了過來。' },
  { w: 'やむをえず', k: '已むを得ず', f: '已[や]むを得[え]ず', m: '不得已', c: 'adv_psych_emotion', e_ja: '已むを得ず計画を変更した。', e_zh: '不得已改變了計畫。' },
  { w: 'やれやれ', k: 'やれやれ', f: 'やれやれ', m: '哎呀、總算', c: 'adv_psych_emotion', e_ja: 'やれやれ、やっと終わった。', e_zh: '哎呀，總算結束了。' },
  { w: 'ゆうゆう', k: '悠々', f: '悠々[ゆうゆう]', m: '悠然自得地', c: 'adv_daily_action', e_ja: '悠々と歩く。', e_zh: '悠然自得地走著。' },
  { w: 'よほど', k: '余程', f: '余程[よほど]', m: '相當、很', c: 'adv_degree_qty', e_ja: '余程疲れていたのだろう。', e_zh: '想必是相當累了吧。' },
  { w: 'わんわん', k: 'わんわん', f: 'わんわん', m: '大哭聲', c: 'adv_body_physio', e_ja: '赤ちゃんがわんわん泣く。', e_zh: '嬰兒哇哇大哭。' },
  { w: 'あたかも', k: '宛も', f: '宛[あたか]も', m: '簡直就像', c: 'adv_logic_mood', e_ja: '宛も夢のようだ。', e_zh: '簡直就像做夢一樣。' },
  { w: 'しいて', k: '強いて', f: '強[し]いて', m: '硬要說的話、勉強', c: 'adv_logic_mood', e_ja: '強いて言えば、これが一番いい。', e_zh: '硬要說的話，這個最好。' },
  { w: 'どうせ', k: 'どうせ', f: 'どうせ', m: '反正', c: 'adv_logic_mood', e_ja: 'どうせ失敗するに決まっている。', e_zh: '反正肯定會失敗的。' }
];

let addedCount = 0;
const timestamp = Date.now();

if (!data.JLPT_DATA_CHUNKS['N3']) data.JLPT_DATA_CHUNKS['N3'] = { vocabulary: [] };

newAdverbs.forEach((item, index) => {
  const newItem = {
    id: 'adv_bulk3_' + timestamp + '_' + index,
    word: item.w,
    kanji: item.k,
    furigana: item.f,
    kana: '', 
    romaji: '',
    type: 'adverb',
    pos: '副詞',
    category: item.c,
    level: 'N3',
    meaning: item.m,
    sentences: [
      {
        ja: item.e_ja,
        furigana: item.e_ja,
        zh: item.e_zh
      }
    ]
  };
  data.JLPT_DATA_CHUNKS['N3'].vocabulary.push(newItem);
  addedCount++;
});

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(data, null, 2));
console.log('Added ' + addedCount + ' common adverbs to the new 13 subcategories!');

