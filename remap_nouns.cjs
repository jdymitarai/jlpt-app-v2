const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const d = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const mapCategory = (v) => {
  const c = v.category || "";
  const m = v.meaning || "";
  const w = v.word || "";

  // 1. 強制關鍵字優先匹配 (Override by specific word/meaning keywords)
  if (/(目|耳|鼻|口|手|足|髪|心臓|呼吸|睡眠)/.test(w) || /(眼睛|耳朵|鼻子|嘴巴|手|腳|頭髮|心臟|呼吸|睡眠)/.test(m)) return "human_body_physiology";
  if (/(姿勢|歩行|動作)/.test(w) || /(姿勢|步行|動作)/.test(m)) return "human_action_posture";
  if (/(視界|匂い|音|味)/.test(w) || /(視野|氣味|聲音|味道)/.test(m)) return "human_senses_perception";
  if (/(不安|安心|喜び|ストレス|怒り)/.test(w) || /(不安|安心|喜悅|壓力|生氣|悲傷)/.test(m)) return "human_psychology_emotion";
  if (/(風邪|薬|頭痛|病院|医者)/.test(w) || /(感冒|藥|頭痛|醫院|醫生)/.test(m)) return "human_health_medical";

  if (/(野菜|肉|料理|調味料|箸)/.test(w) || /(蔬菜|肉|料理|調味料|筷子)/.test(m)) return "material_food_cooking";
  if (/(服|靴|帽子|化粧)/.test(w) || /(衣服|鞋子|帽子|化妝)/.test(m)) return "material_clothing_beauty";
  if (/(部屋|台所|冷蔵庫|机|エアコン)/.test(w) || /(房間|廚房|冰箱|桌子|冷氣)/.test(m)) return "material_housing_appliances";
  if (/(電車|飛行機|車|道|交差点)/.test(w) || /(電車|飛機|車|道路|十字路口)/.test(m)) return "material_transport_mobility";
  if (/(映画|ゲーム|サッカー|旅行|趣味)/.test(w) || /(電影|遊戲|足球|旅行|興趣)/.test(m)) return "material_leisure_sports";

  if (/(雨|雪|台風|春|夏|秋|冬|天気)/.test(w) || /(雨|雪|颱風|春天|夏天|秋天|冬天|天氣)/.test(m)) return "nature_weather_season";
  if (/(太陽|星|海|山|川|空)/.test(w) || /(太陽|星星|海|山|河流|天空)/.test(m)) return "nature_geography_space";
  if (/(犬|猫|鳥|虫|尾|動物|魚)/.test(w) || /(狗|貓|鳥|昆蟲|尾巴|動物|魚)/.test(m)) return "nature_animals";
  if (/(花|木|桜|葉|森|植物|草)/.test(w) || /(花|樹木|櫻花|葉子|森林|植物|草)/.test(m)) return "nature_plants";
  if (/(地震|火災|波|光|影)/.test(w) || /(地震|火災|波浪|光|影子)/.test(m)) return "nature_physics_phenomena";

  if (/(家族|友達|上司|先輩|親戚|父|母|兄|弟|姉|妹)/.test(w) || /(家族|朋友|主管|前輩|親戚|父親|母親|哥哥|弟弟|姊姊|妹妹)/.test(m)) return "society_family_relations";
  if (/(会話|挨拶|礼|言葉|話)/.test(w) || /(對話|寒暄|謝禮|語言)/.test(m)) return "society_communication_language";
  if (/(会社員|書類|金|物価|仕事|会社)/.test(w) || /(公司職員|文件|錢|物價|工作|公司)/.test(m)) return "society_work_economy";
  if (/(学校|宿題|試験|辞書|学生|先生)/.test(w) || /(學校|作業|考試|字典|學生|老師)/.test(m)) return "society_education_learning";
  if (/(国家|法律|警察|規則|政治|国)/.test(w) || /(國家|法律|警察|規則|政治)/.test(m)) return "society_law_politics";

  if (/(曜日|今日|明日|昨日|将来|週末|時間|年|月|日|週|時計)/.test(w) || /(星期|今天|明天|昨天|將來|週末|時間|年|月|日|週|時鐘)/.test(m)) return "abstract_time_calendar";
  if (/(東|西|南|北|右|左|上|下|前|後|隣|向こう|外|中)/.test(w) || /(東|西|南|北|右|左|上|下|前|後|旁邊|對面|外|內)/.test(m)) return "abstract_space_direction";
  if (/(ゼロ|半分|本|枚|メートル|キロ|グラム|度|回|個)/.test(w) || /(零|一半|公尺|公斤|公克|度|次|個)/.test(m)) return "abstract_numbers_units";
  if (/(理由|原因|結果|方法|約束|仕方)/.test(w) || /(理由|原因|結果|方法|約定|辦法)/.test(m)) return "abstract_logic_method";
  if (/(本当|嘘|間違い|安全|自由|平和|真|偽|価値|状態)/.test(w) || /(真實|謊言|錯誤|安全|自由|和平|真|假|價值|狀態)/.test(m)) return "abstract_state_value";

  // 2. 基於舊有類別的預設轉換
  if (c === "body_physiology") return "human_body_physiology";
  if (c === "health_medical") return "human_health_medical";
  if (c === "psychology_character") return "human_psychology_emotion";
  
  if (c === "food_culture") return "material_food_cooking";
  if (c === "fashion_beauty" || c === "clothing_accessories") return "material_clothing_beauty";
  if (c === "housing_space" || c === "housing_architecture" || c === "living_housing" || c === "city_facilities") {
    if (m.includes("路") || m.includes("道") || m.includes("街")) return "material_transport_mobility";
    return "material_housing_appliances";
  }
  if (c === "transport_mobility") return "material_transport_mobility";
  if (c === "leisure_sports") return "material_leisure_sports";
  
  if (c === "astronomy_meteorology") return "nature_weather_season";
  if (c === "geography_ecology") return "nature_geography_space";
  if (c === "biological_world" || c === "animals_plants") return "nature_animals"; 

  if (c === "relations_human" || c === "human_relations") return "society_family_relations";
  if (c === "culture_thought") return "society_communication_language"; 
  if (c === "society_politics_law") return "society_law_politics";
  if (c === "economy_business" || c === "jobs_titles") return "society_work_economy";
  if (c === "learning_education" || c === "education_learning") return "society_education_learning";

  if (c === "math_quantity") return "abstract_numbers_units";
  
  if (c === "properties_relations") return "abstract_state_value";

  if (c === "activities_actions" || c === "adv_daily_action") return "human_action_posture";
  if (c === "daily_goods") return "material_housing_appliances";

  // 3. Fallback
  return "abstract_state_value";
};

let remappedCount = 0;

for (const chunk of Object.values(d.JLPT_DATA_CHUNKS)) {
  if (!chunk.vocabulary) continue;
  chunk.vocabulary.forEach(v => {
    if (v.type === 'noun') {
      v.category = mapCategory(v);
      remappedCount++;
    }
  });
}

fs.writeFileSync(dbPath, JSON.stringify(d, null, 2));
console.log(`Remapped ${remappedCount} general nouns.`);
