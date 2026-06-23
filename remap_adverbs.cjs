
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/ai/jlpt_data_export.json', 'utf8'));

const map = {
  'ゆっくり': 'adv_body_physio', 'ぐっすり': 'adv_body_physio', 'すやすや': 'adv_body_physio', 'のろのろ': 'adv_body_physio', 'ぶらぶら': 'adv_body_physio', 'うろうろ': 'adv_body_physio', 'ぶるぶる': 'adv_body_physio', 'のんびり': 'adv_body_physio', 'にっこり': 'adv_body_physio',
  'ドキドキ': 'adv_psych_emotion', 'どきどき': 'adv_psych_emotion', 'イライラ': 'adv_psych_emotion', 'びくびく': 'adv_psych_emotion', 'わくわく': 'adv_psych_emotion', 'がっかり': 'adv_psych_emotion', 'びっくり': 'adv_psych_emotion', 'はらはら': 'adv_psych_emotion', 'まごまご': 'adv_psych_emotion', 'しみじみ': 'adv_psych_emotion',
  'じっと': 'adv_senses_perception', 'ぼんやり': 'adv_senses_perception', 'ちらっと': 'adv_senses_perception', 'くっきり': 'adv_senses_perception', 'しいんと': 'adv_senses_perception',
  'すぐ': 'adv_daily_action', 'すぐに': 'adv_daily_action', 'こっそり': 'adv_daily_action', 'いよいよ': 'adv_daily_action', 'さっさと': 'adv_daily_action', '急いで': 'adv_daily_action', '急に': 'adv_daily_action', 'にわかに': 'adv_daily_action', 'ふと': 'adv_daily_action', 'ばったり': 'adv_daily_action', 'ぐずぐず': 'adv_daily_action', 'そのまま': 'adv_daily_action', '別々に': 'adv_daily_action', '一緒に': 'adv_daily_action', '一人で': 'adv_daily_action', 'みんなで': 'adv_daily_action', '自分で': 'adv_daily_action', '交互': 'adv_daily_action', 'ただちに': 'adv_daily_action', 'みずから': 'adv_daily_action',
  'ぱくぱく': 'adv_food_cooking', 'ぐつぐつ': 'adv_food_cooking', 'あっさり': 'adv_food_cooking', 'さっぱり': 'adv_food_cooking',
  'ピカピカ': 'adv_item_space', 'ふかふか': 'adv_item_space', 'そっくり': 'adv_item_space', 'ぎっしり': 'adv_item_space', 'ずらりと': 'adv_item_space', 'めちゃくちゃ': 'adv_item_space', 'ばらばら': 'adv_item_space', 'ぼろぼろ': 'adv_item_space', 'まっすぐ': 'adv_item_space',
  'ザーザー': 'adv_weather_mimic', 'そよそよ': 'adv_weather_mimic', 'ごろごろ': 'adv_weather_mimic', 
  'グラグラ': 'adv_physical_change', 'くるくる': 'adv_physical_change', 'どんどん': 'adv_physical_change', 'ころころ': 'adv_physical_change', 'がらりと': 'adv_physical_change', 'だんだん': 'adv_physical_change', 'しだいに': 'adv_physical_change', 'じょじょに': 'adv_physical_change', 'ますます': 'adv_physical_change', 'めっきり': 'adv_physical_change', 'ぴったり': 'adv_physical_change',
  'はっきり': 'adv_comm_attitude', 'うっかり': 'adv_comm_attitude', 'わざと': 'adv_comm_attitude', 'わざわざ': 'adv_comm_attitude', 'きっぱり': 'adv_comm_attitude', 'はきはき': 'adv_comm_attitude', 'にやにや': 'adv_comm_attitude', 'いちいち': 'adv_comm_attitude', 'つとめて': 'adv_comm_attitude', 'ひそかに': 'adv_comm_attitude',
  'しっかり': 'adv_work_study', 'ちゃんと': 'adv_work_study', 'きちんと': 'adv_work_study', 'すっきり': 'adv_work_study', 'ばっちり': 'adv_work_study', 'ぺらぺら': 'adv_work_study', 'どうにか': 'adv_work_study', 'かろうじて': 'adv_work_study', 'ぎりぎり': 'adv_work_study', 'なるべく': 'adv_work_study', 'できるだけ': 'adv_work_study',
  'いつも': 'adv_time_freq', 'よく': 'adv_time_freq', 'たまに': 'adv_time_freq', 'さっき': 'adv_time_freq', 'これから': 'adv_time_freq', 'もうすぐ': 'adv_time_freq', '最近': 'adv_time_freq', 'この頃': 'adv_time_freq', 'いつか': 'adv_time_freq', '将来': 'adv_time_freq', '昔': 'adv_time_freq', 'ずっと前に': 'adv_time_freq', '先ほど': 'adv_time_freq', '後で': 'adv_time_freq', 'そのうち': 'adv_time_freq', 'やがて': 'adv_time_freq', 'まず': 'adv_time_freq', '次に': 'adv_time_freq', 'それから': 'adv_time_freq', '最後に': 'adv_time_freq', 'とうとう': 'adv_time_freq', 'ついに': 'adv_time_freq', 'やっと': 'adv_time_freq', 'もう': 'adv_time_freq', 'まだ': 'adv_time_freq', 'あとで': 'adv_time_freq', 'また': 'adv_time_freq', '初めて': 'adv_time_freq', 'いずれ': 'adv_time_freq', 'いったん': 'adv_time_freq', 'いつのまにか': 'adv_time_freq', 'しばらく': 'adv_time_freq', 'そろそろ': 'adv_time_freq', 'たびたび': 'adv_time_freq', 'つぎつぎ': 'adv_time_freq', 'どっと': 'adv_time_freq', 'ひとまず': 'adv_time_freq', 'しばしば': 'adv_time_freq', 'つねに': 'adv_time_freq', 'とりあえず': 'adv_time_freq', 'もはや': 'adv_time_freq', 'あらかじめ': 'adv_time_freq', 'じきに': 'adv_time_freq', 'しょっちゅう': 'adv_time_freq', 'すでに': 'adv_time_freq', '再び': 'adv_time_freq', 'めったに': 'adv_time_freq',
  'とても': 'adv_degree_qty', '少し': 'adv_degree_qty', 'かなり': 'adv_degree_qty', 'もっと': 'adv_degree_qty', 'およそ': 'adv_degree_qty', '約': 'adv_degree_qty', 'ほとんど': 'adv_degree_qty', 'なかなか': 'adv_degree_qty', 'ちょっと': 'adv_degree_qty', 'たくさん': 'adv_degree_qty', '全部': 'adv_degree_qty', 'だいたい': 'adv_degree_qty', '一番': 'adv_degree_qty', 'すっかり': 'adv_degree_qty', 'ずいぶん': 'adv_degree_qty', '大変': 'adv_degree_qty', 'あまり': 'adv_degree_qty', 'さほど': 'adv_degree_qty', 'さらに': 'adv_degree_qty', 'たいして': 'adv_degree_qty', 'たっぷり': 'adv_degree_qty', 'やけに': 'adv_degree_qty', 'いやに': 'adv_degree_qty', 'むやみに': 'adv_degree_qty', 'せいぜい': 'adv_degree_qty', 'まったく': 'adv_degree_qty', 'ろくに': 'adv_degree_qty', 'ちっとも': 'adv_degree_qty', '少しも': 'adv_degree_qty',
  'たぶん': 'adv_subjective_grammar', '決して': 'adv_subjective_grammar', '全然': 'adv_subjective_grammar', '大抵': 'adv_subjective_grammar', 'たしか': 'adv_subjective_grammar', 'たしかに': 'adv_subjective_grammar', '必ず': 'adv_subjective_grammar', '絶対に': 'adv_subjective_grammar', 'ぜひとも': 'adv_subjective_grammar', 'たとえ': 'adv_subjective_grammar', 'おかげで': 'adv_subjective_grammar', 'せいで': 'adv_subjective_grammar', 'おかげさまで': 'adv_subjective_grammar', 'つまり': 'adv_subjective_grammar', 'しかし': 'adv_subjective_grammar', 'それでは': 'adv_subjective_grammar', 'では': 'adv_subjective_grammar', 'だから': 'adv_subjective_grammar', 'ですから': 'adv_subjective_grammar', 'すると': 'adv_subjective_grammar', 'そこで': 'adv_subjective_grammar', 'あるいは': 'adv_subjective_grammar', 'または': 'adv_subjective_grammar', 'それとも': 'adv_subjective_grammar', 'ところで': 'adv_subjective_grammar', 'なるほど': 'adv_subjective_grammar', 'もしかしたら': 'adv_subjective_grammar', 'もしかすると': 'adv_subjective_grammar', 'まるで': 'adv_subjective_grammar', 'いくら～ても': 'adv_subjective_grammar', 'どんなに': 'adv_subjective_grammar', 'なぜなら': 'adv_subjective_grammar', 'どうしても～ない': 'adv_subjective_grammar', 'ちっとも～ない': 'adv_subjective_grammar', 'どうしても': 'adv_subjective_grammar', 'たいてい': 'adv_subjective_grammar', 'きっと': 'adv_subjective_grammar', 'ぜひ': 'adv_subjective_grammar', 'もし': 'adv_subjective_grammar', 'いくら': 'adv_subjective_grammar', 'もちろん': 'adv_subjective_grammar', '特に': 'adv_subjective_grammar', '別に': 'adv_subjective_grammar', 'おそらく': 'adv_subjective_grammar', 'やはり': 'adv_subjective_grammar', 'さすが': 'adv_subjective_grammar', 'ついでに': 'adv_subjective_grammar', 'かえって': 'adv_subjective_grammar', 'とにかく': 'adv_subjective_grammar', 'むしろ': 'adv_subjective_grammar', '思い切って': 'adv_subjective_grammar', 'てっきり': 'adv_subjective_grammar', 'どうやら': 'adv_subjective_grammar', 'ともかく': 'adv_subjective_grammar', 'ひたすら': 'adv_subjective_grammar', 'かならずしも': 'adv_subjective_grammar', 'すなわち': 'adv_subjective_grammar', 'せっかく': 'adv_subjective_grammar', 'たまたま': 'adv_subjective_grammar', 'はたして': 'adv_subjective_grammar', 'まさか': 'adv_subjective_grammar', 'やたら': 'adv_subjective_grammar', 'あえて': 'adv_subjective_grammar', 'いかにも': 'adv_subjective_grammar', 'かつて': 'adv_subjective_grammar', 'さぞ': 'adv_subjective_grammar', '依然': 'adv_subjective_grammar', 'ちょうどいい': 'adv_subjective_grammar', 'ちょうど': 'adv_subjective_grammar', 'あいにく': 'adv_subjective_grammar', 'いっそ': 'adv_subjective_grammar', 'いっそう': 'adv_subjective_grammar', 'おもわず': 'adv_subjective_grammar', 'いまだに': 'adv_subjective_grammar'
};

let modified = 0;

for (const level in data.JLPT_DATA_CHUNKS) {
  if (data.JLPT_DATA_CHUNKS[level].vocabulary) {
    data.JLPT_DATA_CHUNKS[level].vocabulary.forEach(v => {
      if (v.type === 'adverb' || (v.pos && v.pos.includes('副詞'))) {
        const wordToMatch = v.word || v.kanji;
        if (map[wordToMatch]) {
          v.category = map[wordToMatch];
          modified++;
        } else if (map[v.kanji]) {
          v.category = map[v.kanji];
          modified++;
        } else {
          // Fallback based on meaning heuristics
          const m = v.meaning || '';
          if (m.includes('地') && m.length <= 4) v.category = 'adv_body_physio';
          else if (m.includes('時間') || m.includes('時') || m.includes('然後') || m.includes('再')) v.category = 'adv_time_freq';
          else if (m.includes('程度') || m.includes('非常') || m.includes('更')) v.category = 'adv_degree_qty';
          else v.category = 'adv_subjective_grammar'; // Default to subjective grammar since many are here
          modified++;
        }
      }
    });
  }
}

fs.writeFileSync('c:/ai/jlpt_data_export.json', JSON.stringify(data, null, 2));
console.log('Re-categorized ' + modified + ' adverbs into new 5 major categories!');

