import React, { useState } from 'react';

const FuriganaText = ({ text }) => {
  if (!text) return null;
  // Match one or more Kanji characters followed by brackets containing Kana
  const regex = /([一-龥々]+)\[([^\]]+)\]/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={lastIndex}>{text.substring(lastIndex, match.index)}</span>);
    }
    elements.push(
      <ruby key={match.index}>
        {match[1]}<rt>{match[2]}</rt>
      </ruby>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
  }

  return <>{elements.length > 0 ? elements : text}</>;
};

const nounCategoryGroups = [
  { id: "all", label: "✨ 全部類別" },
  { id: "human_self", label: "👥 人類自身" },
  { id: "material_life", label: "🏠 物質生活" },
  { id: "nature_universe", label: "🌌 自然與宇宙" },
  { id: "society_civilization", label: "🏢 社會與文明" },
  { id: "abstract_concepts", label: "💡 抽象概念" }
];

const nounSubCategories = [
  { id: "human_body_physiology", label: "身體構造與生理現象", group: "human_self" },
  { id: "human_action_posture", label: "日常肢體動作與姿態", group: "human_self" },
  { id: "human_senses_perception", label: "五官感知與覺察", group: "human_self" },
  { id: "human_psychology_emotion", label: "心理、情感與情緒", group: "human_self" },
  { id: "human_health_medical", label: "疾病、醫療與日常健康", group: "human_self" },

  { id: "material_food_cooking", label: "飲食、烹飪與餐飲文化", group: "material_life" },
  { id: "material_clothing_beauty", label: "服飾、美容與穿脫打扮", group: "material_life" },
  { id: "material_housing_appliances", label: "房屋格局、家居與家電", group: "material_life" },
  { id: "material_transport_mobility", label: "交通工具、道路與空間移動", group: "material_life" },
  { id: "material_leisure_sports", label: "休閒娛樂、體育運動與假期", group: "material_life" },

  { id: "nature_weather_season", label: "天氣、氣候與季節變化", group: "nature_universe" },
  { id: "nature_geography_space", label: "天文地理與空間地貌", group: "nature_universe" },
  { id: "nature_animals", label: "動物世界與生命特徵", group: "nature_universe" },
  { id: "nature_plants", label: "植物世界與自然生態", group: "nature_universe" },
  { id: "nature_physics_phenomena", label: "物理現象、動態與狀態改變", group: "nature_universe" },

  { id: "society_family_relations", label: "家族結構與人際關係", group: "society_civilization" },
  { id: "society_communication_language", label: "溝通表達、語言與互動態度", group: "society_civilization" },
  { id: "society_work_economy", label: "工作職業、辦公用品與經濟買賣", group: "society_civilization" },
  { id: "society_education_learning", label: "教育學習、研究與考察", group: "society_civilization" },
  { id: "society_law_politics", label: "社會體制、法律與公共秩序", group: "society_civilization" },

  // 1. 時間流逝與曆法
  { id: "abs_time_calendar", label: "絕對曆法與週期", group: "abstract_concepts" },
  { id: "abs_time_relative", label: "相對時間點", group: "abstract_concepts" },
  { id: "abs_time_period", label: "日常時段切分", group: "abstract_concepts" },
  { id: "abs_time_duration", label: "時長與時間區間", group: "abstract_concepts" },

  // 2. 空間坐標與相對位置
  { id: "abs_space_absolute", label: "絕對地理方位", group: "abstract_concepts" },
  { id: "abs_space_relative", label: "自身與單一物體視角", group: "abstract_concepts" },
  { id: "abs_space_relation", label: "兩物體以上的相對關係", group: "abstract_concepts" },
  { id: "abs_space_limit", label: "抽象空間與極限邊界", group: "abstract_concepts" },

  // 3. 數字、度量衡與單位量詞
  { id: "abs_num_math", label: "基礎數字與數學概念", group: "abstract_concepts" },
  { id: "abs_num_measure", label: "物理測量單位", group: "abstract_concepts" },
  { id: "abs_num_shape_counter", label: "物理特徵與形狀量詞", group: "abstract_concepts" },
  { id: "abs_num_life_counter", label: "生命體與無形量詞", group: "abstract_concepts" },

  // 4. 邏輯因果、方法與運作機制
  { id: "abs_logic_cause", label: "因果關係與目的", group: "abstract_concepts" },
  { id: "abs_logic_method", label: "方法、手段與過程", group: "abstract_concepts" },
  { id: "abs_logic_rule", label: "規則、制度與社會連結", group: "abstract_concepts" },
  { id: "abs_logic_thought", label: "思考、概念與意義", group: "abstract_concepts" },

  // 5. 狀態性質、真假與價值判斷
  { id: "abs_state_truth", label: "真偽事實與對錯判斷", group: "abstract_concepts" },
  { id: "abs_state_condition", label: "處境狀態與生存環境", group: "abstract_concepts" },
  { id: "abs_state_nature", label: "事物本質與比較差異", group: "abstract_concepts" },
  { id: "abs_state_value", label: "價值觀與評分標準", group: "abstract_concepts" }
];

const verbCategoryGroups = [
  { id: "all", label: "✨ 全部動詞" },
  { id: "human_action", label: "🧍 人類自身" },
  { id: "material_life", label: "🏠 物質生活" },
  { id: "society_civilization", label: "🤝 社會與文明" },
  { id: "nature_universe", label: "🌍 自然與宇宙" },
  { id: "abstract_concept", label: "💭 抽象概念" }
];

const verbSubCategories = [
  // 人類自身
  { id: "verb_body_movement", label: "肢體動作", group: "human_action" },
  { id: "verb_senses", label: "五官感知", group: "human_action" },
  { id: "verb_physiology", label: "生理與生存", group: "human_action" },
  { id: "verb_psychology", label: "心理與思考", group: "human_action" },
  
  // 物質生活
  { id: "verb_food_cooking", label: "飲食與烹飪", group: "material_life" },
  { id: "verb_clothing", label: "穿脫與打扮", group: "material_life" },
  { id: "verb_housework", label: "家事與居住", group: "material_life" },
  { id: "verb_transport_leisure", label: "交通與休閒", group: "material_life" },
  
  // 社會與文明
  { id: "verb_communication", label: "溝通與表達", group: "society_civilization" },
  { id: "verb_giving_receiving", label: "人際授受", group: "society_civilization" },
  { id: "verb_work_economy", label: "工作與經濟", group: "society_civilization" },
  { id: "verb_learning_education", label: "學習與教育", group: "society_civilization" },
  
  // 自然與宇宙
  { id: "verb_weather", label: "天氣變化", group: "nature_universe" },
  { id: "verb_nature_growth", label: "動植物生長", group: "nature_universe" },
  { id: "verb_physical_change", label: "物理與狀態改變", group: "nature_universe" },
  
  // 抽象概念
  { id: "verb_existence_possession", label: "存在與擁有", group: "abstract_concept" },
  { id: "verb_time_process", label: "時間與開始結束", group: "abstract_concept" }
];

const adjCategoryGroups = [
  { id: "all", label: "✨ 全部形容詞" },
  { id: "human_action", label: "🧍 人類自身" },
  { id: "material_life", label: "🏠 物質生活" },
  { id: "nature_universe", label: "🌍 自然與宇宙" },
  { id: "society_civilization", label: "🤝 社會與文明" },
  { id: "abstract_concept", label: "💭 抽象概念" }
];

const adjSubCategories = [
  // 人類自身
  { id: "adj_emotion", label: "情感心理", group: "human_action" },
  { id: "human_body", label: "生理狀態與痛覺", group: "human_action" },
  
  // 物質生活
  { id: "adj_taste", label: "味覺與口感", group: "material_life" },
  { id: "looks_size", label: "外觀與尺寸", group: "material_life" },
  { id: "looks_state", label: "物品新舊與狀態", group: "material_life" },
  
  // 自然與宇宙
  { id: "nature_weather", label: "天氣與溫度", group: "nature_universe" },
  { id: "looks_space", label: "空間與環境", group: "nature_universe" },
  
  // 社會與文明
  { id: "social_personality", label: "性格特質", group: "society_civilization" },
  { id: "adj_social_eval", label: "社會與人際評價", group: "society_civilization" },
  
  // 抽象概念
  { id: "abstract_value", label: "好壞與價值", group: "abstract_concept" },
  { id: "abstract_difficulty", label: "難易與安全", group: "abstract_concept" }
];

const advCategoryGroups = [
  { id: "all", label: "✨ 全部副詞" },
  { id: "human_self", label: "🧍 人類自身" },
  { id: "material_life", label: "🏠 物質生活" },
  { id: "nature_universe", label: "🌍 自然與宇宙" },
  { id: "society_civilization", label: "🤝 社會與文明" },
  { id: "abstract_concept", label: "💭 抽象概念" }
];

const advSubCategories = [
  // 人類自身
  { id: "adv_body_physio", label: "肢體與生理模樣", group: "human_self" },
  { id: "adv_psych_emotion", label: "心理與情緒狀態", group: "human_self" },
  { id: "adv_senses_perception", label: "五官與感知描述", group: "human_self" },
  
  // 物質生活
  { id: "adv_daily_action", label: "日常行為與速度方式", group: "material_life" },
  { id: "adv_food_cooking", label: "飲食與烹飪狀態", group: "material_life" },
  { id: "adv_item_space", label: "物品與空間狀態", group: "material_life" },
  
  // 自然與宇宙
  { id: "adv_weather_mimic", label: "天氣現象模擬", group: "nature_universe" },
  { id: "adv_physical_change", label: "物理動態與狀態改變", group: "nature_universe" },
  
  // 社會與文明
  { id: "adv_comm_attitude", label: "溝通表達態度", group: "society_civilization" },
  { id: "adv_work_study", label: "職場與學習處事", group: "society_civilization" },
  
  // 抽象概念
  { id: "adv_time_freq", label: "時間與發生頻率", group: "abstract_concept" },
  { id: "adv_degree_qty", label: "程度與數量強弱", group: "abstract_concept" },
  { id: "adv_subjective_grammar", label: "主觀語氣與文法呼應", group: "abstract_concept" }
];

const proCategoryGroups = [
  { id: "all", label: "✨ 全部代名詞" },
  { id: "personal", label: "🧍 人稱代名詞" },
  { id: "demonstrative", label: "👉 指示代名詞" },
  { id: "interrogative", label: "❓ 疑問代名詞" }
];

const proSubCategories = [
  // 人稱代名詞
  { id: "pro_first_person", label: "第一人稱 (自稱)", group: "personal" },
  { id: "pro_second_person", label: "第二人稱 (對稱)", group: "personal" },
  { id: "pro_third_person", label: "第三人稱與複數", group: "personal" },
  // 指示代名詞
  { id: "pro_demo_thing", label: "事物指示 (これ系)", group: "demonstrative" },
  { id: "pro_demo_place", label: "場所與方向指示", group: "demonstrative" },
  // 疑問代名詞
  { id: "pro_interrogative", label: "疑問詞 (誰/何/いつ)", group: "interrogative" }
];

const keiCategoryGroups = [
  { id: "all", label: "✨ 全部敬語" },
  { id: "sonkeigo", label: "⬆️ 尊敬語 (抬高對方)" },
  { id: "kenjougo", label: "⬇️ 謙讓語 (降低自己)" },
  { id: "teineigo", label: "🤝 丁寧語與美化語 (鄭重優雅)" }
];

const keiSubCategories = [
  { id: "kei_sonkei_verb", label: "尊敬語動詞 (いらっしゃる等)", group: "sonkeigo" },
  { id: "kei_sonkei_noun", label: "尊敬語名詞/稱呼", group: "sonkeigo" },
  { id: "kei_kenjou_verb", label: "謙讓語動詞 (参る、拝見する等)", group: "kenjougo" },
  { id: "kei_kenjou_noun", label: "謙讓語名詞/自稱", group: "kenjougo" },
  { id: "kei_teinei_general", label: "丁寧語 (ございます等)", group: "teineigo" },
  { id: "kei_bika_noun", label: "美化語 (お水、ご飯等)", group: "teineigo" }
];

const mimCategoryGroups = [
  { id: "all", label: "✨ 全部擬聲擬態語" },
  { id: "mim_emotion", label: "💖 情感與心理" },
  { id: "mim_action", label: "🏃 動作與生理狀態" },
  { id: "mim_nature", label: "🌧️ 自然與環境聲音" }
];

const mimSubCategories = [
  { id: "mim_emotion", label: "情感與心理狀態", group: "mim_emotion" },
  { id: "mim_action", label: "生理與動作模樣", group: "mim_action" },
  { id: "mim_nature", label: "自然與事物聲音", group: "mim_nature" }
];

const conjCategoryGroups = [
  { id: "all", label: "✨ 全部連接詞" },
  { id: "conj_logic", label: "🔗 邏輯與條件" },
  { id: "conj_time", label: "⏳ 時間與順序" },
  { id: "conj_addition", label: "➕ 補充與選擇" }
];

const conjSubCategories = [
  { id: "conj_cause_effect", label: "因果關係 (所以/因為)", group: "conj_logic" },
  { id: "conj_contrast", label: "逆接與讓步 (但是/卻)", group: "conj_logic" },
  { id: "conj_condition", label: "條件與假設 (如果/的話)", group: "conj_logic" },

  { id: "conj_time_seq", label: "時間順序 (然後/接著)", group: "conj_time" },
  { id: "conj_simultaneous", label: "同時與伴隨 (一邊...)", group: "conj_time" },

  { id: "conj_addition", label: "遞進與補充 (而且/再者)", group: "conj_addition" },
  { id: "conj_choice", label: "選擇與對比 (還是/或者)", group: "conj_addition" },
  { id: "conj_change_topic", label: "轉換話題 (對了/順帶一提)", group: "conj_addition" }
];

const catLabels = {
  ...nounSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...verbSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...adjSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...advSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...proSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...keiSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...mimSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...conjSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {})
};

export default function ConsolidationView({ chunks, posFilter = 'noun' }) {
  const categoryGroups = posFilter === 'verb' ? verbCategoryGroups : posFilter === 'adjective' ? adjCategoryGroups : posFilter === 'adverb' ? advCategoryGroups : posFilter === 'pronoun' ? proCategoryGroups : posFilter === 'keigo' ? keiCategoryGroups : posFilter === 'mimetic' ? mimCategoryGroups : posFilter === 'conjunction' ? conjCategoryGroups : nounCategoryGroups;
  const subCategories = posFilter === 'verb' ? verbSubCategories : posFilter === 'adjective' ? adjSubCategories : posFilter === 'adverb' ? advSubCategories : posFilter === 'pronoun' ? proSubCategories : posFilter === 'keigo' ? keiSubCategories : posFilter === 'mimetic' ? mimSubCategories : posFilter === 'conjunction' ? conjSubCategories : nounSubCategories;
  const [level, setLevel] = useState('全部等級');
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeSub, setActiveSub] = useState('all');
  const [selectedVerb, setSelectedVerb] = useState(null); // Used for both Verbs and Adjectives detail modals
  const [verbBannerTab, setVerbBannerTab] = useState('types');
  const [keigoBannerTab, setKeigoBannerTab] = useState('guide');

  const speak = (text) => {
    if (!text) return;
    const cleanText = text.replace(/\[.*?\]/g, ''); // 移除 漢字[かんじ] 標記中的注音讀音，只播放純漢字/假名日文
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang.startsWith("ja"));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  // 1. Get raw vocab
  let vocabulary = [];
  if (posFilter === 'mimetic' || posFilter === 'keigo') {
    // These categories span across chunks or have their own chunks (mimetic_1), and do not use JLPT level filtering.
    vocabulary = Object.values(chunks || {}).reduce((acc, chunk) => acc.concat(chunk.vocabulary || []), []);
  } else if (level === '全部等級') {
    vocabulary = Object.values(chunks || {}).reduce((acc, chunk) => acc.concat(chunk.vocabulary || []), []);
  } else {
    vocabulary = chunks?.[level]?.vocabulary || [];
  }
  // 2. Filter for Nouns/Verbs/Adjs & Search
  let filteredVocab = vocabulary.filter(v => {
    if (!v) return false;
    
    // Check Part of Speech
    const t = String(v.type || '').toLowerCase();
    const p = String(v.pos || v.type || '').toLowerCase();
    const vCat = v.category || 'other';

    if (posFilter === 'noun') {
      if (!(t === 'noun' || p.includes('名詞') || p.includes('noun'))) return false;
      if (vCat.startsWith('verb_') || vCat.startsWith('adv_')) return false; // Noun tab shouldn't show verb/adv categories
      if (t === 'adjective' || p.includes('形容詞')) return false;
    } else if (posFilter === 'verb') {
      if (!(t === 'verb' || p.includes('動詞') || p.includes('verb'))) return false;
      if (!vCat.startsWith('verb_')) return false; // STRICT: Only show words generated for the new verb categories!
    } else if (posFilter === 'adjective') {
      if (!(t === 'adjective' || p.includes('形容詞') || p.includes('adj'))) return false;
    } else if (posFilter === 'adverb') {
      if (!(t === 'adverb' || p.includes('副詞') || p.includes('adv'))) return false;
    } else if (posFilter === 'pronoun') {
      if (!(t === 'pronoun' || p.includes('代名詞'))) return false;
    } else if (posFilter === 'keigo') {
      if (!(t === 'keigo' || p.includes('敬語') || vCat.startsWith('kei_'))) return false;
    } else if (posFilter === 'mimetic') {
      if (!(t === 'mimetic' || p.includes('擬聲') || p.includes('擬態'))) return false;
    } else if (posFilter === 'conjunction') {
      if (!(t === 'conjunction' || p.includes('接續詞') || p.includes('連接詞') || p.includes('conj'))) return false;
    }
    
    // Search
    if (search) {
      const q = search.toLowerCase();
      if (!((v.word || '').toLowerCase().includes(q) || 
            (v.reading || v.furigana || '').toLowerCase().includes(q) || 
            (v.meaning || '').toLowerCase().includes(q))) {
        return false;
      }
    }
    
    // Thematic Filter
    if (activeGroup !== 'all') {
      const catDef = subCategories.find(sc => sc.id === vCat);
      if (!catDef || catDef.group !== activeGroup) return false;
    }
    if (activeSub !== 'all' && vCat !== activeSub) return false;
    
    return true;
  });

  return (
    <section id="consolidation-page" className="page-section" style={{ background: '#f5f7fa', minHeight: '100vh', padding: '32px' }}>
      <style>{`
        /* Reset any dark mode or generic styles for this page */
        #consolidation-page {
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .keigo-teaching-banner {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px 32px;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }
        .keigo-teaching-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .keigo-teaching-icon {
          font-size: 1.8rem;
        }
        .keigo-teaching-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .keigo-teaching-desc {
          color: #64748b;
          font-size: 1.05rem;
          margin: 0 0 24px 0;
          font-weight: 500;
        }
        .keigo-teaching-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .keigo-teaching-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border-left: 4px solid #cbd5e1;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          transition: transform 0.2s;
        }
        .keigo-teaching-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .keigo-teaching-card.sonkei { border-left-color: #3b82f6; }
        .keigo-teaching-card.kenjou { border-left-color: #f43f5e; }
        .keigo-teaching-card.teinei { border-left-color: #10b981; }
        .keigo-teaching-card h3 {
          margin: 0 0 12px 0;
          font-size: 1.15rem;
          color: #1e293b;
        }
        .keigo-target {
          margin: 0 0 4px 0;
          color: #475569;
          font-size: 0.95rem;
        }
        .keigo-target strong {
          color: #0f172a;
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .keigo-purpose {
          margin: 0 0 16px 0;
          color: #64748b;
          font-size: 0.9rem;
        }
        .keigo-examples {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .keigo-examples span {
          display: inline-block;
          background: #f8fafc;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.9rem;
          color: #334155;
          font-family: monospace;
        }
        .vocab-main-container {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
          max-width: 1400px;
          margin: 0 auto;
        }
        .vocab-filter-topbar {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
        }
        .vocab-search-box {
          flex: 1;
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 16px;
        }
        .vocab-search-box input {
          border: none;
          outline: none;
          flex: 1;
          margin-left: 12px;
          font-size: 0.95rem;
          color: #333;
        }
        .level-filters {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #64748b;
        }
        .level-pill-btn {
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .level-pill-btn.active {
          background: linear-gradient(135deg, #f43f5e, #fb7185);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 10px rgba(244,63,94,0.3);
        }
        .group-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .group-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .group-btn.active {
          background: linear-gradient(135deg, #f43f5e, #fb7185);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 10px rgba(244,63,94,0.3);
        }
        .subcat-grey-box {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }
        .subcat-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid #cbd5e1;
        }
        .subcat-row:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }
        .subcat-label {
          background: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #1e293b;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          min-width: 140px;
          text-align: center;
          flex-shrink: 0;
        }
        .subcat-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .subcat-pill {
          padding: 6px 14px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .subcat-pill.active {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #cbd5e1;
          font-weight: 600;
        }
        
        .old-vocab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .old-vocab-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          border: 1px solid #f1f5f9;
        }
        .old-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .old-furi {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 4px;
          min-height: 1.2em;
        }
        .old-word {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }
        .old-romaji {
          font-size: 0.85rem;
          color: #94a3b8;
        }
        .old-badges {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .badge-level {
          background: #ffe4e6;
          color: #e11d48;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .badge-cat {
          background: #fce7f3;
          color: #db2777;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .badge-adj-type {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .badge-adj-type.i-adj {
          background: #fee2e2;
          color: #ef4444;
        }
        .badge-adj-type.na-adj {
          background: #dcfce7;
          color: #22c55e;
        }
        .old-meaning {
          font-size: 1.1rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 20px;
        }
        .old-example {
          border-left: 3px solid #f43f5e;
          background: #f8fafc;
          padding: 12px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 12px;
        }
        .ex-ja {
          font-size: 0.95rem;
          color: #1e293b;
          margin-bottom: 4px;
          font-weight: 500;
        }
        .ex-en {
          font-size: 0.85rem;
          color: #64748b;
        }
        .btn-example-speaker {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .btn-example-speaker:hover {
          color: #f43f5e;
          background: #ffe4e6;
        }
        .old-actions {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 16px;
        }
        .btn-speaker {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          cursor: pointer;
        }
        .btn-learned {
          background: linear-gradient(135deg, #a855f7, #8b5cf6);
          color: #fff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .verb-intro-banner {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-left: 6px solid #0ea5e9;
          padding: 24px 32px;
          border-radius: 16px;
          margin-bottom: 32px;
          color: #0f172a;
        }
        .verb-intro-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0369a1;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .verb-intro-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #334155;
          margin-bottom: 0;
        }
        .adj-intro-banner {
          background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
          border-left: 6px solid #f43f5e;
          padding: 24px 32px;
          border-radius: 16px;
          margin-bottom: 32px;
          color: #0f172a;
        }
        .adj-intro-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #be123c;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .adj-intro-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #334155;
          margin-bottom: 0;
        }

        
        /* Modal Styles */
        .verb-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .verb-modal-content {
          background: #ffffff;
          width: 90%;
          max-width: 750px;
          max-height: 90vh;
          border-radius: 24px;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: flex;
          flex-direction: column;
        }
        .verb-modal-close {
          position: absolute;
          top: 20px; right: 20px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          font-size: 1.5rem;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .verb-modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .verb-modal-header {
          padding: 40px 40px 30px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
          position: relative;
        }
        .verb-modal-furi {
          font-size: 1.1rem;
          color: #64748b;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .verb-modal-word {
          font-size: 3.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .verb-modal-badges {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .vm-badge-group {
          background: #eff6ff; color: #2563eb;
          padding: 6px 16px; border-radius: 20px;
          font-size: 0.9rem; font-weight: 700;
          border: 1px solid #bfdbfe;
        }
        .vm-badge-trans {
          background: #fef2f2; color: #dc2626;
          padding: 6px 16px; border-radius: 20px;
          font-size: 0.9rem; font-weight: 700;
          border: 1px solid #fecaca;
        }
        .vm-badge-cat {
          background: #f0fdf4; color: #16a34a;
          padding: 6px 16px; border-radius: 20px;
          font-size: 0.9rem; font-weight: 700;
          border: 1px solid #bbf7d0;
        }
        .verb-modal-meaning {
          font-size: 1.4rem;
          font-weight: 700;
          color: #334155;
        }
        .verb-modal-body {
          padding: 30px 40px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .vm-section-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .vm-section-title::before {
          content: '';
          display: block;
          width: 4px; height: 18px;
          background: #f43f5e;
          border-radius: 4px;
        }
        .vm-conj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
        }
        .vm-conj-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          transition: all 0.2s;
        }
        .vm-conj-item:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transform: translateY(-2px);
        }
        .vm-conj-label {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .vm-conj-val {
          font-size: 1.2rem;
          font-weight: 700;
          color: #0f172a;
        }
        .vm-keigo-box {
          background: #fefce8;
          border: 1px solid #fef08a;
          padding: 20px;
          border-radius: 12px;
          color: #854d0e;
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .vm-sentence {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-left: 4px solid #3b82f6;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .vm-sent-ja {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .vm-sent-zh {
          font-size: 1.05rem;
          color: #64748b;
          line-height: 1.5;
        }
        .btn-detail {
          background: #f1f5f9;
          color: #334155;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-detail:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
      `}</style>

      <div className="vocab-main-container">
        
        {posFilter === 'adverb' && (
          <div className="adj-intro-banner" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
            <div className="adj-intro-title" style={{ color: '#15803d' }}>
              <span>📖</span> 日文副詞分類與呼應句型指南
            </div>
            <p className="adj-intro-desc" style={{ color: '#1e293b', marginBottom: '16px' }}>
              副詞用來修飾動詞、形容詞或整個句子，不需進行詞尾變化。掌握副詞能顯著提升日語表達的生動度與精準度：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontWeight: '800', color: '#15803d', marginBottom: '12px', fontSize: '1.15rem' }}>
                  🟢 1. 程度副詞（修飾程度與量）
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  用於修飾形容詞或動詞的「程度深淺」或「數量多寡」：<br/>
                  ・<strong>とても</strong> (非常) → 很常用於修飾形容詞。<br/>
                  ・<strong>少し / ちょっと</strong> (稍微) → 表示程度較低。<br/>
                  ・<strong>非常に / 大変</strong> (極其/非常) → 用於較正式或書面的語境。<br/>
                  <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #15803d' }}>
                    例：この料理は<strong>とても</strong>美味しいです。<br/>
                    例：熱が<strong>少し</strong>あります。
                  </div>
                </div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontWeight: '800', color: '#15803d', marginBottom: '12px', fontSize: '1.15rem' }}>
                  🟢 2. 狀態副詞（修飾動作的狀態方式）
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  用來具體描繪動作是如何進行的（常含有「〜り」或擬聲擬態詞語尾）：<br/>
                  ・<strong>ゆっくり</strong> (慢慢地) → 描寫速度或步調。<br/>
                  ・<strong>はっきり</strong> (清晰地) → 描寫狀態明瞭。<br/>
                  ・<strong>すっかり</strong> (完全/徹底) → 描寫事情進行得乾淨俐落。<br/>
                  <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #15803d' }}>
                    例：<strong>ゆっくり</strong>話してください (請慢慢說)。<br/>
                    例：日本語が<strong>はっきり</strong>聞こえました。
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontWeight: '800', color: '#15803d', marginBottom: '12px', fontSize: '1.15rem' }}>
                  🟢 3. 陳述呼應副詞（文法呼應句型）
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  這類副詞與句尾的「否定型」或「推測型」等特定文法具有<strong>強制呼應關係</strong>：<br/>
                  ・<strong>全然 / ちっとも ＋ 否定型</strong> (完全不...)<br/>
                  ・<strong>決して ＋ 否定型</strong> (絕對不...)<br/>
                  ・<strong>おそらく ＋ 推測型(〜でしょう)</strong> (恐怕/大概...)<br/>
                  <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #15803d' }}>
                    例：日本語が<strong>全然</strong>分かりません (完全不懂日語)。<br/>
                    例：明日は<strong>おそらく</strong>雨でしょう (明天恐怕會下雨吧)。
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {posFilter === 'adjective' && (
          <div className="adj-intro-banner">
            <div className="adj-intro-title">
              <span>📖</span> 日文形容詞的兩大分類與否定形式
            </div>
            <p className="adj-intro-desc" style={{ marginBottom: '16px' }}>
              日文的形容詞主要分為<strong>「い形容詞」</strong>與<strong>「な形容詞」</strong>兩大類，它們在修飾名詞以及做「否定形式」時有不同的接續變化規律：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                <div style={{ fontWeight: '800', color: '#e11d48', marginBottom: '12px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🔴 い形容詞（以「い」結尾）
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  <strong>修飾名詞</strong>：直接接名詞<br/>
                  <span style={{ color: '#64748b' }}>例：美味しい＋ご飯 → <strong style={{ color: '#0f172a' }}>美味しいご飯</strong> (美味的飯)</span><br/><br/>
                  <strong>否定形式變化</strong>：去尾部的<strong>「い」＋「くない」</strong>（非正式口語）或 <strong>「くありません」</strong>（正式敬體）<br/>
                  <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #e11d48' }}>
                    例：暑い (熱) → <strong style={{ color: '#e11d48' }}>暑くない</strong> / <strong style={{ color: '#e11d48' }}>暑くありません</strong><br/>
                    例：遠い (遠) → <strong style={{ color: '#e11d48' }}>遠くない</strong> / <strong style={{ color: '#e11d48' }}>遠くありません</strong>
                  </div>
                  <span style={{ color: '#be123c', fontSize: '0.85rem', display: 'block', marginTop: '8px' }}>※例外注意：良い (いい) 的否定是固定變成 <strong style={{ color: '#e11d48' }}>よくない</strong> / <strong style={{ color: '#e11d48' }}>よくありません</strong>。</span>
                </div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                <div style={{ fontWeight: '800', color: '#e11d48', marginBottom: '12px', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🟢 な形容詞（語幹不以「い」結尾）
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  <strong>修飾名詞</strong>：詞尾加上<strong>「な」</strong>再接名詞<br/>
                  <span style={{ color: '#64748b' }}>例：綺麗＋部屋 → <strong style={{ color: '#0f172a' }}>綺麗な部屋</strong> (乾淨漂亮的房間)</span><br/><br/>
                  <strong>句尾接「です」（表示禮貌肯定陳述）</strong>：<br/>
                  直接加上<strong>「です」</strong>（<strong>⚠️注意：必須去掉「な」直接接「です」！</strong>）<br/>
                  <span style={{ color: '#64748b' }}>
                    例：綺麗 ＋ です → <strong style={{ color: '#16a34a' }}>綺麗です。</strong> (很漂亮。)<br/>
                    例：暇 ＋ です → <strong style={{ color: '#16a34a' }}>暇です。</strong> (我有空。)<br/>
                    <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>❌ 錯誤用法：綺麗なです (×)</span>
                  </span><br/><br/>
                  <strong>否定形式變化</strong>：詞尾去掉「な」，加上 <strong>「表達否定」：ではない / じゃない / 疑問 / ではありません</strong><br/>
                  <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #16a34a' }}>
                    例：暇 (空閒) → <strong style={{ color: '#16a34a' }}>暇ではない</strong> / <strong style={{ color: '#16a34a' }}>暇退屈ではありません</strong><br/>
                    例：親切 (親切) → <strong style={{ color: '#16a34a' }}>親切じゃない</strong> / <strong style={{ color: '#16a34a' }}>親切ではありません</strong>
                  </div>
                  <span style={{ color: '#15803d', fontSize: '0.85rem', display: 'block', marginTop: '8px' }}>※語音提示：大部分「な形容詞」的字典形態是不帶「な」的（如：靜か、綺麗），修飾名詞才加「な」。</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {posFilter === 'verb' && (

          <div className="verb-intro-banner">
            <div className="verb-intro-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(2, 132, 199, 0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div className="verb-intro-title" style={{ margin: 0 }}>
                <span>📖</span> 動詞學習指南
              </div>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(2, 132, 199, 0.05)', padding: '4px', borderRadius: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setVerbBannerTab('types')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: verbBannerTab === 'types' ? '#0284c7' : 'transparent',
                    color: verbBannerTab === 'types' ? '#fff' : '#0284c7'
                  }}
                >
                  三大分類 (ます形)
                </button>
                <button 
                  onClick={() => setVerbBannerTab('basics')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: verbBannerTab === 'basics' ? '#0284c7' : 'transparent',
                    color: verbBannerTab === 'basics' ? '#fff' : '#0284c7'
                  }}
                >
                  常體時態 (ない・た・なかった)
                </button>
                <button 
                  onClick={() => setVerbBannerTab('conjugations')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: verbBannerTab === 'conjugations' ? '#0284c7' : 'transparent',
                    color: verbBannerTab === 'conjugations' ? '#fff' : '#0284c7'
                  }}
                >
                  進階變化 (使役・受身・可能・意向)
                </button>
              </div>
            </div>

            {verbBannerTab === 'types' && (
              <>
                <p className="verb-intro-desc" style={{ marginBottom: '16px' }}>
                  日文動詞依照變化的規律，主要分為三大類。掌握這三個分類，是學好所有動詞變化的核心基礎：
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>I 類動詞（五段動詞）</div>
                    <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                      <strong>特徵</strong>：字典形語尾必定是<strong>「う」段音</strong> (即：う、つ、る、ぬ、ぶ、む、く、ぐ、す)。變化最繁複。<br/>
                      <span style={{ color: '#0ea5e9', fontWeight: '700', display: 'block', marginTop: '6px' }}>【ます形 (禮貌肯定)】：將語尾轉為同行的「い」段音 ＋ ます</span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                        例：書（か）く → 書（か）きます<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;話（はな）す → 話（はな）します<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;死（し）ぬ → 死（し）にます
                      </span>
                      <span style={{ color: '#ef4444', fontSize: '0.85rem', display: 'block', marginTop: '6px', fontWeight: 'bold' }}>※ 例外注意：歸、切、知、走、入、限、減、焦 等動詞雖然以「る」結尾且前一字為「い/え」段音，但屬於五段動詞！例如：帰る → 帰ります。</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>II 類動詞（一段動詞）</div>
                    <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                      <strong>特徵</strong>：字典形語尾必定是<strong>「る」</strong>，且「る」的前一個字音必定為<strong>「い」段或「え」段</strong>。變化極為規律。<br/>
                      <span style={{ color: '#0ea5e9', fontWeight: '700', display: 'block', marginTop: '6px' }}>【ます形 (禮貌肯定)】：直接去掉「る」 ＋ ます</span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                        例：見（み）る → 見（み）ます<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;食（た）べる → 食（た）べます<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;起（お）きる → 起（お）きます
                      </span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>III 類動詞（不規則動詞）</div>
                    <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                      <strong>特徵</strong>：僅有以下兩個核心動詞，以及所有由「名詞 ＋ する」構成的複合動作。<br/>
                      <span style={{ color: '#0ea5e9', fontWeight: '700', display: 'block', marginTop: '6px' }}>【ます形 (禮貌肯定)】：完全不規則變化</span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                        例：する（做） → します<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来（く）る（來） → 来（き）ます<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勉強（べんきょう）する → 勉強します
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {verbBannerTab === 'basics' && (
              <>
                <p className="verb-intro-desc" style={{ marginBottom: '16px' }}>
                  常體時態（ない形、た形、なかった形）是用於日常對話、朋友間聊天，以及各種中高級文法接續的關鍵：
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>ない形（現在常體否定 / 不做...）</div>
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>I 類動詞 (五段)</span>：將語尾 <strong>u段音 改為同行的 a段音 + ない</strong><br/>
                      <span style={{ color: '#ef4444', fontSize: '0.82rem', fontWeight: 'bold' }}>⚠️ 語尾是單獨的「う」時，要變為「わ」＋ない</span><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：書く → 書かない / 買う → 買わない / 話す → 話さない</span><br/><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>II 類動詞 (一段)</span>：<strong>直接去「る」 ＋ ない</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：食べる → 食べない / 見る → 見ない</span><br/><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>III 類動詞 (不規則)</span>：<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>・する → しない<br/>・来る（くる） → 来（こ）ない</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>た形（過去常體肯定 / 做了...）</div>
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>I 類動詞 (五段)</span>：根據動詞語尾進行<strong>音便變化</strong>：<br/>
                      ・尾音為 <strong>う、つ、る</strong> → 變為 <strong>った</strong><br/>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>&nbsp;&nbsp;例：買う→買った / 待つ→待った / 走る→走った</span><br/>
                      ・尾音為 <strong>ぬ、ぶ、む</strong> → 變為 <strong>んだ</strong><br/>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>&nbsp;&nbsp;例：死ぬ→死んだ / 遊ぶ→遊んだ / 読む→読んだ</span><br/>
                      ・尾音為 <strong>く</strong> → 變為 <strong>いた</strong> (例外: <strong>行く→行った</strong>)<br/>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>&nbsp;&nbsp;例：書く→書いた / 聞く→聞いた</span><br/>
                      ・尾音為 <strong>ぐ</strong> → 變為 <strong>いだ</strong><br/>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>&nbsp;&nbsp;例：泳ぐ→泳いだ / 急ぐ→急いだ</span><br/>
                      ・尾音為 <strong>す</strong> → 變為 <strong>した</strong><br/>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>&nbsp;&nbsp;例：話す→話した / 直す→直した</span><br/><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>II 類動詞 (一段)</span>：<strong>直接去「る」 ＋ た</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：食べる → 食べた / 見る → 食べた</span><br/><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>III 類動詞 (不規則)</span>：<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>・する → した<br/>・来る（くる） → 来（き）た</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>なかった形（過去常體否定 / 沒做...）</div>
                    <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                      <strong>【萬用規則】</strong>：<br/>
                      先將動詞轉換為<strong>「ない形」</strong>，再將結尾的<strong>「ない」直接改為「なかった」</strong>即可。<br/><br/>
                      <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #0284c7' }}>
                        <strong>變形實例對照表</strong>：<br/>
                        1. 買う (買)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ 買わない (不買)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ <strong>買わなかった</strong> (沒買)<br/>
                        2. 食べる (吃)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ 食べない (不吃)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ <strong>食べなかった</strong> (沒吃)<br/>
                        3. する (做)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ しない (不做)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ <strong>しなかった</strong> (沒做)<br/>
                        4. 来る (來)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ 来ない (不來)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;→ <strong>来なかった</strong> (沒來)
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {verbBannerTab === 'conjugations' && (
              <>
                <p className="verb-intro-desc" style={{ marginBottom: '16px' }}>
                  日文動詞的進階變化型（如<strong>使役形</strong>、<strong>受身形</strong>等）皆依動詞類別進行規則變形。以下是常用變化公式：
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>使役形（讓／強迫／允許）</div>
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>I 類動詞 (五段)</span>：語尾 <strong>u段 → a段 + せる</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：書（か）く → 書（か）かせる / 話（はな）す → 話（はな）させる</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>II 類動詞 (一段)</span>：<strong>去 る ＋ させる</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：食（た）べる → 食（た）べさせる / 見（み）る → 見（み）させる</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>III 類動詞 (不規則)</span>：<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>・する → させる<br/>・来（く）る → 来（こ）させる</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>受身形（被動／敬語）</div>
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>I 類動詞 (五段)</span>：語尾 <strong>u段 → a段 + れる</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：書（か）く → 書（か）かれる / 呼（よ）ぶ → 呼（よ）ばれる</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>II 類動詞 (一段)</span>：<strong>去 る ＋ られる</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：食（た）べる → 食（た）べられる / 見（み）る → 見（み）られる</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>III 類動詞 (不規則)</span>：<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>・する → される<br/>・来（く）る → 来（こ）られる</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>可能形（能夠／可以）</div>
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>I 類動詞 (五段)</span>：語尾 <strong>u段 → e段 + る</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：書（か）く → 書（か）ける / 泳（およ）ぐ → 泳（およ）げる</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>II 類動詞 (一段)</span>：<strong>去 る ＋ られる</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：食（た）べる → 食（た）べられる / 見（み）る → 見（み）られる</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>III 類動詞 (不規則)</span>：<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>・する → できる<br/>・来（く）る → 来（こ）られる</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>意向形（意志／勸誘）</div>
                    <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>I 類動詞 (五段)</span>：語尾 <strong>u段 → o段 + う</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：書（か）く → 書（か）こう / 行（い）く → 行（い）こう</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>II 類動詞 (一段)</span>：<strong>去 る ＋ よう</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>例：食（た）べる → 食（た）べよう / 見（み）る → 見（み）よう</span><br/>
                      <span style={{ fontWeight: '600', color: '#0284c7' }}>III 類動詞 (不規則)</span>：<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>・する → しよう<br/>・来（く）る → 来（こ）よう</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {posFilter === 'pronoun' && (
          <div className="adj-intro-banner" style={{ background: '#fdf2f8', borderColor: '#fbcfe8', color: '#9d174d' }}>
            <div className="adj-intro-title" style={{ color: '#be185d' }}>
              <span>📖</span> 代名詞分類與指示代名詞 (こそあど) 指南
            </div>
            <p className="adj-intro-desc" style={{ color: '#1e293b', marginBottom: '16px' }}>
              代名詞用來指代人、事、物或場所。日語的代名詞包含人稱代名詞與極具規律性的「こそあど」指示代名詞系統：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #fbcfe8' }}>
                <div style={{ fontWeight: '800', color: '#be185d', marginBottom: '12px', fontSize: '1.15rem' }}>
                  👥 1. 人稱代名詞 (指代人)
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  ・<strong>第一人稱 (我)</strong>：<br/>
                  &nbsp;&nbsp;私 (わたし) [通用] / 僕 (ぼく) [男性口語] / 俺 (おれ) [男性粗魯/親密] / 私 (わたくし) [正式謙遜]<br/>
                  ・<strong>第二人稱 (你)</strong>：<br/>
                  &nbsp;&nbsp;あなた [通用/夫妻稱呼] / 君 (きみ) [上對下] / お前 (おまえ) [粗魯/親密]<br/>
                  ・<strong>第三人稱 (他/她)</strong>：<br/>
                  &nbsp;&nbsp;彼 (かれ) [他] / 彼女 (かのじょ) [她]
                </div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '20px', borderRadius: '12px', border: '1px solid #fbcfe8' }}>
                <div style={{ fontWeight: '800', color: '#be185d', marginBottom: '12px', fontSize: '1.15rem' }}>
                  📍 2. 指示代名詞 (こそあど系統)
                </div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
                  根據指代對象與說話者/聽話者的距離，分為四個系列：<br/>
                  ・<strong>こ系列 (近)</strong>：靠近說話者。<br/>
                  ・<strong>そ系列 (中)</strong>：靠近聽話者。<br/>
                  ・<strong>あ系列 (遠)</strong>：遠離雙方。<br/>
                  ・<strong>ど系列 (疑)</strong>：疑問詞。<br/>
                  <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #be185d' }}>
                    物體：<strong>これ / それ / あれ / どれ</strong><br/>
                    場所：<strong>ここ / そこ / あそこ / どこ</strong><br/>
                    方向：<strong>こちら / そちら / あちら / どちら</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {posFilter === 'conjunction' && (
          <div className="adj-intro-banner" style={{ background: '#fffbeb', borderColor: '#fef3c7', color: '#92400e' }}>
            <div className="adj-intro-title" style={{ color: '#b45309' }}>
              <span>📖</span> 連接詞功能與邏輯關係指南
            </div>
            <p className="adj-intro-desc" style={{ color: '#1e293b', marginBottom: '16px' }}>
              連接詞用於串聯句子與段落，明晰前後文的邏輯關係，是寫作與長篇口說的靈魂骨架：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
                <div style={{ fontWeight: '800', color: '#b45309', marginBottom: '8px', fontSize: '1.1rem' }}>➡️ 1. 順接 (因果關係)</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  後句是前句的自然結果或推導：<br/>
                  ・<strong>だから / ですから</strong> (所以) [口語/敬體]<br/>
                  ・<strong>そこで</strong> (因此/於是) [接續動作]<br/>
                  ・<strong>したがって</strong> (因此) [正式書面語]<br/>
                  <span style={{ color: '#b45309', fontSize: '0.85rem' }}>例：雨が降りました。<strong>引いて</strong>、遅れました。</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
                <div style={{ fontWeight: '800', color: '#b45309', marginBottom: '8px', fontSize: '1.1rem' }}>⬅️ 2. 逆接 (轉折關係)</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  後句與前句的意思相反或出乎意料：<br/>
                  ・<strong>しかし / だが</strong> (但是) [正式]<br/>
                  ・<strong>進んで / けれども</strong> (但是/可是) [口語]<br/>
                  ・<strong>ところが</strong> (然而/沒想到) [驚訝語氣]<br/>
                  <span style={{ color: '#b45309', fontSize: '0.85rem' }}>例：勉強しました。<strong>しかし</strong>、不合格でした。</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
                <div style={{ fontWeight: '800', color: '#b45309', marginBottom: '8px', fontSize: '1.1rem' }}>➕ 3. 累加與選擇</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  用於並列、追加或多選一：<br/>
                  ・<strong>そして</strong> (而且/然後) [順序並列]<br/>
                  ・<strong>それに / そのうえ</strong> (而且/加上) [累加遞進]<br/>
                  ・<strong>それとも</strong> (還是/或者) [二選一疑問]<br/>
                  <span style={{ color: '#b45309', fontSize: '0.85rem' }}>例：コーヒーですか。<strong>それとも</strong>、お茶ですか。</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {posFilter === 'keigo' && (
          <div className="keigo-teaching-banner">
            <div className="keigo-teaching-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(139, 92, 246, 0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div className="keigo-teaching-title" style={{ margin: 0, color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', fontWeight: '800' }}>
                <span className="keigo-teaching-icon">📖</span> 敬語學習與實戰指南
              </div>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(139, 92, 246, 0.05)', padding: '4px', borderRadius: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setKeigoBannerTab('guide')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: keigoBannerTab === 'guide' ? '#8b5cf6' : 'transparent',
                    color: keigoBannerTab === 'guide' ? '#fff' : '#8b5cf6'
                  }}
                >
                  三大體系
                </button>
                <button 
                  onClick={() => setKeigoBannerTab('table')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: keigoBannerTab === 'table' ? '#8b5cf6' : 'transparent',
                    color: keigoBannerTab === 'table' ? '#fff' : '#8b5cf6'
                  }}
                >
                  常用動詞對照表
                </button>
                <button 
                  onClick={() => setKeigoBannerTab('formulas')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: keigoBannerTab === 'formulas' ? '#8b5cf6' : 'transparent',
                    color: keigoBannerTab === 'formulas' ? '#fff' : '#8b5cf6'
                  }}
                >
                  常規變化公式
                </button>
                <button 
                  onClick={() => setKeigoBannerTab('pitfalls')} 
                  style={{
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    background: keigoBannerTab === 'pitfalls' ? '#8b5cf6' : 'transparent',
                    color: keigoBannerTab === 'pitfalls' ? '#fff' : '#8b5cf6'
                  }}
                >
                  常見考試誤區
                </button>
              </div>
            </div>

            {keigoBannerTab === 'guide' && (
              <>
                <p className="keigo-teaching-desc">日文的敬語核心在於「<strong>動作者是誰</strong>」。搞懂動作者，就能選對敬語！</p>
                <div className="keigo-teaching-grid">
                  <div className="keigo-teaching-card sonkei">
                    <h3>⬆️ 尊敬語</h3>
                    <p className="keigo-target">動作者：<strong>對方</strong> (長輩/客戶)</p>
                    <p className="keigo-purpose">目的：抬高對方的身分</p>
                    <div className="keigo-examples">
                      <span>行く → いらっしゃる</span>
                      <span>食べる → 召し上がる</span>
                      <span>見る → ご覧になる</span>
                    </div>
                  </div>
                  <div className="keigo-teaching-card kenjou">
                    <h3>⬇️ 謙讓語</h3>
                    <p className="keigo-target">動作者：<strong>自己</strong> (或我方人員)</p>
                    <p className="keigo-purpose">目的：壓低自己以顯得謙卑</p>
                    <div className="keigo-examples">
                      <span>行く → 参る / 伺う</span>
                      <span>もらう → いただく</span>
                      <span>見る → 拝見する</span>
                    </div>
                  </div>
                  <div className="keigo-teaching-card teinei">
                    <h3>🤝 丁寧語 / 美化語</h3>
                    <p className="keigo-target">動作者：<strong>任何人</strong> (無關上下關係)</p>
                    <p className="keigo-purpose">目的：讓談吐顯得優雅、有教養</p>
                    <div className="keigo-examples">
                      <span>だ/ある → ございます</span>
                      <span>茶 → お茶</span>
                      <span>飯 → ご飯</span>
                    </div>
                  </div>
                </div>
                
                <div className="keigo-ogo-box" style={{ marginTop: '24px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#38bdf8', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>重點解析</span> 
                    「お」與「ご」的接續奧秘
                  </h4>
                  <p style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#475569', lineHeight: '1.6' }}>
                    我們經常在名詞前加上「お」或「ご」來構成尊敬語、謙讓語或美化語。要加哪一個，主要取決於單字的<strong>來源</strong>：
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #f472b6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>🌸 お ＋ 和語（日本傳統字彙）</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>通常是訓讀字（可以獨立念出意思的字）。</div>
                      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ background: '#fdf2f8', color: '#be185d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>水 (みず) → お水</span>
                        <span style={{ background: '#fdf2f8', color: '#be185d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>名前 (なまえ) → お名前</span>
                        <span style={{ background: '#fdf2f8', color: '#be185d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>話 (はなし) → お話し</span>
                      </div>
                    </div>
                    <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #14b8a6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>⛩️ ご ＋ 漢語（來自中國的字彙）</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>通常是音讀字（兩個漢字組合，發音硬挺）。</div>
                      <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ background: '#f0fdfa', color: '#0f766e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>家族 (かぞく) → ご家族</span>
                        <span style={{ background: '#f0fdfa', color: '#0f766e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>意見 (いけん) → ご意見</span>
                        <span style={{ background: '#f0fdfa', color: '#0f766e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>連絡 (れんらく) → ご連絡</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '12px', fontStyle: 'italic' }}>* 例外提醒：お電話 (でんわ)、お食事 (しょくじ) 等已經深深融入日本人日常生活的漢語，習慣上會使用「お」。</div>
                </div>
              </>
            )}

            {keigoBannerTab === 'table' && (
              <div style={{ overflowX: 'auto', background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.15)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#7c3aed', fontSize: '1.05rem', fontWeight: 'bold' }}>📋 常用核心動詞敬語對照表</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ddd', background: 'rgba(139, 92, 246, 0.05)' }}>
                      <th style={{ padding: '10px', fontWeight: 'bold', color: '#475569' }}>基本字典形 (意味)</th>
                      <th style={{ padding: '10px', fontWeight: 'bold', color: '#10b981' }}>尊敬語 (⬆️對方動作)</th>
                      <th style={{ padding: '10px', fontWeight: 'bold', color: '#6366f1' }}>謙讓語 (⬇️自己動作)</th>
                      <th style={{ padding: '10px', fontWeight: 'bold', color: '#64748b' }}>丁寧語 (一般客氣)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { base: '行く・来る (去/來)', son: 'いらっしゃる / おいでになる', ken: '参（まい）る / 伺（うかが）う', tei: '行きます / 来ます' },
                      { base: '食べる・飲む (吃/喝)', son: '召（め）し上がる', ken: 'いただく', tei: '食べます / 飲みます' },
                      { base: '言う (說)', son: 'おっしゃる', ken: '申（もう）す / 申し上げる', tei: '言います' },
                      { base: 'する (做)', son: 'なさる', ken: 'いたす', tei: 'します' },
                      { base: '見る (看)', son: 'ご覧（らん）になる', ken: '拝見（はいけん）する', tei: '見ます' },
                      { base: '知る (知道)', son: 'ご存（ぞん）じだ', ken: '存（ぞん）じている / 存じる', tei: '知っています' },
                      { base: '会う (見面)', son: 'お会いになる', ken: 'お目にかかる / お会いする', tei: '會います' },
                      { base: '与える・あげる (給)', son: 'くださる', ken: '差し上げる', tei: 'あげます / くれます' },
                      { base: 'もらう (得到)', son: 'お受けになる', ken: 'いただく / 頂戴する', tei: 'もらいます' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 1 ? 'rgba(139, 92, 246, 0.02)' : 'transparent' }}>
                        <td style={{ padding: '10px', fontWeight: '600', color: '#334155' }}>{row.base}</td>
                        <td style={{ padding: '10px', color: '#059669', fontWeight: '600' }}>{row.son}</td>
                        <td style={{ padding: '10px', color: '#4f46e5', fontWeight: '600' }}>{row.ken}</td>
                        <td style={{ padding: '10px', color: '#475569' }}>{row.tei}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {keigoBannerTab === 'formulas' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #ddd6fe' }}>
                  <div style={{ fontWeight: '800', color: '#7c3aed', marginBottom: '8px', fontSize: '1.1rem' }}>1. 尊敬語 常規變化公式</div>
                  <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.7' }}>
                    當動詞沒有特殊不規則敬語時，可用以下公式轉換：<br/>
                    <strong>① お + ます形去ます + になる</strong><br/>
                    <span style={{ color: '#059669' }}>例：書く ➡️ お書きになる</span><br/>
                    <span style={{ color: '#059669' }}>例：待つ ➡️ お待ちになる</span><br/>
                    <strong>② 動詞被動形 (れる / られる)</strong><br/>
                    <span style={{ color: '#059669' }}>例：社長は明日東京へ行かれます。</span><br/>
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>※ 說明：被動形表敬意程度略低於「お〜になる」，使用更隨和。</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #ddd6fe' }}>
                  <div style={{ fontWeight: '800', color: '#7c3aed', marginBottom: '8px', fontSize: '1.1rem' }}>2. 謙讓語 常規變化公式</div>
                  <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.7' }}>
                    用於將自己的動作放低，以表示對他人的尊敬：<br/>
                    <strong>① お + ます形去ます + する / いたす</strong><br/>
                    <span style={{ color: '#4f46e5' }}>例：持つ ➡️ お持ちする / お持ちいたす</span><br/>
                    <strong>② ご + 動作性名詞 (三類) + する / いたす</strong><br/>
                    <span style={{ color: '#4f46e5' }}>例：案内する ➡️ ご案内する / ご案内いたす</span><br/>
                    <strong>③ お/ご + ます形去ます + いただく</strong><br/>
                    <span style={{ color: '#4f46e5' }}>例：お読みいただく (承蒙您閱讀)</span>
                  </div>
                </div>
              </div>
            )}

            {keigoBannerTab === 'pitfalls' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #fca5a5' }}>
                  <div style={{ fontWeight: '800', color: '#dc2626', marginBottom: '8px', fontSize: '1.1rem' }}>⚠️ 陷阱一：二重敬語 (過度敬語)</div>
                  <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                    在一個動詞上重複套用相同種類的敬語，是日語中不合語法的贅言。<br/><br/>
                    ❌ 錯誤：<strong>お召し上がりになられる</strong><br/>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>(同時用了特殊尊敬語 召し上がる、お~になる 與 られる)</span><br/>
                    ⭕ 正確：<strong>召し上がる</strong> / <strong>お召し上がりになる</strong><br/><br/>
                    ❌ 錯誤：<strong>お読みになられる</strong><br/>
                    ⭕ 正確：<strong>お読みになる</strong> / <strong>読まれる</strong>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #fca5a5' }}>
                  <div style={{ fontWeight: '800', color: '#dc2626', marginBottom: '8px', fontSize: '1.1rem' }}>⚠️ 陷阱二：尊敬與謙讓對象混淆</div>
                  <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                    把用在自己身上的「謙讓語」套給長輩，或者把抬高他人的「尊敬語」用在自己身上，在職場上非常失禮。<br/><br/>
                    ❌ 錯誤：<strong>私がご存じです。</strong> (對長輩稱自己「知道」時，誤用尊敬語的「ご存じ」)<br/>
                    ⭕ 正確：<strong>私は存じております。</strong> (使用謙讓語)<br/><br/>
                    ❌ 錯誤：<strong>部長、何時に参りますか。</strong> (詢問部長何時來，卻對部長使用謙讓語的「参る」)<br/>
                    ⭕ 正確：<strong>部長、何時にいらっしゃいますか。</strong>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #fca5a5' }}>
                  <div style={{ fontWeight: '800', color: '#dc2626', marginBottom: '8px', fontSize: '1.1rem' }}>⚠️ 陷阱三：內外關係（ウチ・ソト）</div>
                  <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                    在日商職場中，<strong>向外部客戶（外）提起自己公司的上司（內）時，必須降格上司，使用謙讓語</strong>，而非尊敬語！<br/><br/>
                    ❌ 錯誤：<strong>（向客戶說）林部長がいらっしゃいました。</strong> (對自己部長用尊敬語，對客戶失禮)<br/>
                    ⭕ 正確：<strong>（向客戶說）部長の林が参りました。</strong><br/>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>(稱謂去頭銜，並使用謙讓語的「參る」)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {posFilter === 'mimetic' && (
          <div className="grammar-hero" style={{marginBottom: '2rem'}}>
            <h2 className="hero-title">
              <span className="hero-icon">✨</span>
              擬聲擬態語 (Onomatopoeia)
            </h2>
            <p className="hero-subtitle">讓日語變得極度生動可愛的魔法單字！</p>
            
            <div className="keigo-cards-container" style={{display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap'}}>
              <div className="gram-syntax-box" style={{flex: 1, minWidth: '250px'}}>
                <div className="gram-syntax-header" style={{background: '#ff6b6b'}}>🔊 擬音語 (Giongo)</div>
                <div className="gram-syntax-content" style={{padding: '1rem', fontSize: '0.95rem'}}>
                  模仿自然界或事物實際發出的「聲音」。通常用<strong>片假名</strong>表示。<br/><br/>
                  <strong>例：</strong>ザーザー (大雨聲)、ドカン (爆炸聲)、ワンワン (狗吠)
                </div>
              </div>
              <div className="gram-syntax-box" style={{flex: 1, minWidth: '250px'}}>
                <div className="gram-syntax-header" style={{background: '#4ecdc4'}}>🎭 擬態語 (Gitaigo)</div>
                <div className="gram-syntax-content" style={{padding: '1rem', fontSize: '0.95rem'}}>
                  用聲音來描繪「沒有聲音」的狀態或動作。是日文表達的精華。<br/><br/>
                  <strong>例：</strong>キラキラ (閃閃發光)、ギリギリ (勉強趕上)、ペコペコ (肚子餓)
                </div>
              </div>
              <div className="gram-syntax-box" style={{flex: 1, minWidth: '250px'}}>
                <div className="gram-syntax-header" style={{background: '#ffe66d', color: '#333'}}>💖 擬情語 (Gijougo)</div>
                <div className="gram-syntax-content" style={{padding: '1rem', fontSize: '0.95rem'}}>
                  屬於擬態語的一種，專門用來描述人類內心的情感波動。<br/><br/>
                  <strong>例：</strong>ドキドキ (緊張心跳)、イライラ (焦躁)、ワクワク (期待雀躍)
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="vocab-filter-topbar">
          <div className="vocab-search-box">
            <span style={{ opacity: 0.5 }}>🔍</span>
            <input 
              type="text" 
              placeholder="搜尋日語單字、羅馬拼音、中文含意..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {posFilter !== 'mimetic' && posFilter !== 'keigo' && (
            <div className="level-filters">
              <span>等級篩選：</span>
              {['全部等級', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
                <button 
                  key={lvl}
                  className={`level-pill-btn ${level === lvl ? 'active' : ''}`}
                  onClick={() => setLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          )}
          
          <div className="level-filters" style={{marginLeft: 'auto'}}>
            <span>分類篩選：</span>
          </div>
        </div>

        <div className="group-filters">
          {categoryGroups.map(grp => (
            <button
              key={grp.id}
              className={`group-btn ${activeGroup === grp.id ? 'active' : ''}`}
              onClick={() => {
                setActiveGroup(grp.id);
                setActiveSub('all');
              }}
            >
              {grp.label}
            </button>
          ))}
        </div>

        <div className="subcat-grey-box">
          {categoryGroups.filter(g => g.id !== 'all').map(grp => {
             // Only show this group's row if activeGroup is 'all' or matches this group
             if (activeGroup !== 'all' && activeGroup !== grp.id) return null;
             const subs = subCategories.filter(sc => sc.group === grp.id);
             return (
               <div className="subcat-row" key={grp.id}>
                 <div className="subcat-label">{grp.label}</div>
                 <div className="subcat-pills">
                   {subs.map(sub => (
                     <button
                       key={sub.id}
                       className={`subcat-pill ${activeSub === sub.id ? 'active' : ''}`}
                       onClick={() => setActiveSub(sub.id === activeSub ? 'all' : sub.id)}
                     >
                       {sub.label}
                     </button>
                   ))}
                 </div>
               </div>
             )
          })}
        </div>

        {filteredVocab.length > 0 ? (
          <div className="old-vocab-grid">
            {filteredVocab.map((item, i) => (
              <div key={i} className="old-vocab-card">
                <div className="old-card-top">
                  <div>
                    {(!item.furigana || !item.furigana.includes('[')) && /[一-龥々]/.test(item.word || '') && <div className="old-furi">{item.reading || item.furigana || ' '}</div>}
                    <div className="old-word">
                      {(item.furigana && item.furigana.includes('[')) ? <FuriganaText text={item.furigana} /> : (item.word || '-')}
                    </div>
                    <div className="old-romaji">{item.romaji || '-'}</div>
                  </div>
                  <div className="old-badges">
                    <span className="badge-level">{item.level || 'N5'}</span>
                    <span className="badge-cat">{catLabels[item.category] || '單字'}</span>
                    {posFilter === 'adjective' && (() => {
                      const isIAdj = item.pos === 'い形容詞' || item.type === 'i-adjective';
                      const isNaAdj = item.pos === 'な形容詞' || item.type === 'na-adjective';
                      if (isIAdj || isNaAdj) {
                        return (
                          <span className={`badge-adj-type ${isIAdj ? 'i-adj' : 'na-adj'}`}>
                            {isIAdj ? 'い形容詞' : 'な形容詞'}
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </div>
                </div>
                
                <div className="old-meaning">{item.meaning || '-'}</div>
                
                {Array.isArray(item.sentences) && item.sentences.length > 0 ? (
                  item.sentences.map((sent, idx) => (
                    <div className="old-example" key={idx}>
                      <div className="ex-ja" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <span><FuriganaText text={sent.ja} /></span>
                        <button 
                          className="btn-example-speaker" 
                          onClick={() => speak(sent.ja)}
                          title="播放例句"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                        </button>
                      </div>
                      <div className="ex-en">{sent.zh || sent.en || '-'}</div>
                    </div>
                  ))
                ) : (item.exampleJa || item.exampleEn) ? (
                  <div className="old-example">
                    <div className="ex-ja" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <span><FuriganaText text={item.exampleJa || '-'} /></span>
                      <button 
                        className="btn-example-speaker" 
                        onClick={() => speak(item.exampleJa)}
                        title="播放例句"
                      >
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                      </button>
                    </div>
                    <div className="ex-en">{item.exampleZh || item.exampleEn || '-'}</div>
                  </div>
                ) : null}

                <div className="old-actions">
                  <button className="btn-speaker" onClick={() => speak(item.word)}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                  </button>
                  {(posFilter === 'verb' || posFilter === 'adjective' || posFilter === 'adverb') && (
                    <button className="btn-detail" onClick={() => setSelectedVerb(item)}>
                      詳細解說
                    </button>
                  )}
                  <button className="btn-learned">標記為已學</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8', fontSize: '1.1rem' }}>
            找不到符合條件的單字。
          </div>
        )}

      </div>

      {selectedVerb && (
        <div className="verb-modal-overlay" onClick={() => setSelectedVerb(null)}>
          <div className="verb-modal-content" onClick={e => e.stopPropagation()}>
            <button className="verb-modal-close" onClick={() => setSelectedVerb(null)}>×</button>
            
            <div className="verb-modal-header">
              {(!selectedVerb.furigana || !selectedVerb.furigana.includes('[')) && /[一-龥々]/.test(selectedVerb.word || '') && <div className="verb-modal-furi">{selectedVerb.reading || selectedVerb.furigana}</div>}
              <div className="verb-modal-word">
                {(selectedVerb.furigana && selectedVerb.furigana.includes('[')) ? <FuriganaText text={selectedVerb.furigana} /> : selectedVerb.word}
              </div>
              <div className="verb-modal-badges">
                {selectedVerb.verb_group && <span className="vm-badge-group">{selectedVerb.verb_group}</span>}
                {(selectedVerb.type === 'adjective' || selectedVerb.type === 'adverb') && selectedVerb.pos && <span className="vm-badge-group">{selectedVerb.pos}</span>}
                {selectedVerb.grammar_class && <span className="vm-badge-group">{selectedVerb.grammar_class}</span>}
                {selectedVerb.transitivity && <span className="vm-badge-trans">{selectedVerb.transitivity}</span>}
                <span className="vm-badge-cat">{selectedVerb.encyclopedia_category || catLabels[selectedVerb.category] || '單字'}</span>
              </div>
              <div className="verb-modal-meaning">{selectedVerb.meaning}</div>
            </div>
            
            <div className="verb-modal-body">
              {selectedVerb.type === 'verb' && selectedVerb.masu_form && (
                <div className="vm-section">
                  <h3 className="vm-section-title">變化型 (Conjugations)</h3>
                  <div className="vm-conj-grid">
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">辭書形 (原形)</div>
                      <div className="vm-conj-val">{selectedVerb.word || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">ます形 (丁寧)</div>
                      <div className="vm-conj-val">{selectedVerb.masu_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">ない形 (否定)</div>
                      <div className="vm-conj-val">{selectedVerb.nai_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">た形 (過去)</div>
                      <div className="vm-conj-val">{selectedVerb.ta_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">なかった形 (過去否定)</div>
                      <div className="vm-conj-val">{selectedVerb.nakatta_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">可能形 (能力)</div>
                      <div className="vm-conj-val">{selectedVerb.potential_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">使役形 (強迫/允許)</div>
                      <div className="vm-conj-val">{selectedVerb.causative_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">受身形 (被動)</div>
                      <div className="vm-conj-val">{selectedVerb.passive_form || '-'}</div>
                    </div>
                    <div className="vm-conj-item">
                      <div className="vm-conj-label">意向形 (意志/勸誘)</div>
                      <div className="vm-conj-val">{selectedVerb.volitional_form || '-'}</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedVerb.type === 'adjective' && (
                <>
                  <div className="vm-section">
                    <h3 className="vm-section-title">基本時態 (Basic Tenses)</h3>
                    <div className="vm-conj-grid">
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">現在肯定 (敬體)</div>
                        <div className="vm-conj-val">{selectedVerb.present_affirmative || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">現在否定 (常體)</div>
                        <div className="vm-conj-val">{selectedVerb.present_negative || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">過去肯定 (常體)</div>
                        <div className="vm-conj-val">{selectedVerb.past_affirmative || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">過去否定 (常體)</div>
                        <div className="vm-conj-val">{selectedVerb.past_negative || '-'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="vm-section">
                    <h3 className="vm-section-title">進階活用 (Advanced Conjugations)</h3>
                    <div className="vm-conj-grid">
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">修飾名詞型</div>
                        <div className="vm-conj-val">{selectedVerb.noun_modifier || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">副詞化變形</div>
                        <div className="vm-conj-val">{selectedVerb.adverb_modifier || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">名詞化變形</div>
                        <div className="vm-conj-val">{selectedVerb.noun_form || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">樣態型 (看起來...)</div>
                        <div className="vm-conj-val">{selectedVerb.looks_like || '-'}</div>
                      </div>
                      <div className="vm-conj-item">
                        <div className="vm-conj-label">過度型 (太...)</div>
                        <div className="vm-conj-val">{selectedVerb.too_much || '-'}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedVerb.type === 'adverb' && (
                <>
                  <div className="vm-section">
                    <h3 className="vm-section-title">用法與呼應規則 (Usage & Rules)</h3>
                    <div className="vm-conj-grid">
                      <div className="vm-conj-item" style={{ gridColumn: 'span 2' }}>
                        <div className="vm-conj-label">主要修飾對象</div>
                        <div className="vm-conj-val">{selectedVerb.target || '-'}</div>
                      </div>
                      <div className="vm-conj-item" style={{ gridColumn: 'span 2' }}>
                        <div className="vm-conj-label">句尾呼應規則</div>
                        <div className="vm-conj-val">{selectedVerb.ending_rule || '-'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="vm-section">
                    <h3 className="vm-section-title">學習提示 (Learning Tips)</h3>
                    <div className="vm-conj-grid">
                      <div className="vm-conj-item" style={{ gridColumn: 'span 2' }}>
                        <div className="vm-conj-label">特殊發音/用法提示</div>
                        <div className="vm-conj-val">{selectedVerb.special_note || '-'}</div>
                      </div>
                      <div className="vm-conj-item" style={{ gridColumn: 'span 2' }}>
                        <div className="vm-conj-label">近義詞比較</div>
                        <div className="vm-conj-val">{selectedVerb.synonym || '-'}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedVerb.type === 'verb' && selectedVerb.keigo && selectedVerb.keigo !== '-' && (
                <div className="vm-section">
                  <h3 className="vm-section-title">敬語 (Keigo)</h3>
                  <div className="vm-keigo-box">
                    {selectedVerb.keigo}
                  </div>
                </div>
              )}

              {selectedVerb.sentences && selectedVerb.sentences.length > 0 && (
                <div className="vm-section">
                  <h3 className="vm-section-title">實用例句 (Examples)</h3>
                  {selectedVerb.sentences.map((sent, i) => (
                    <div className="vm-sentence" key={i}>
                      <div className="vm-sent-ja"><FuriganaText text={sent.ja} /></div>
                      <div className="vm-sent-zh">{sent.zh}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
