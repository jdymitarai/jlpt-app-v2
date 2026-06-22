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
  { id: "human_existence", label: "👥 人類自身" },
  { id: "clinical_medical", label: "🏥 護理專業" },
  { id: "material_life", label: "🏠 物質生活" },
  { id: "nature_universe", label: "🌌 自然與宇宙" },
  { id: "society_civilization", label: "🏢 社會與文明" },
  { id: "abstract_concepts", label: "💡 抽象概念" }
];

const nounSubCategories = [
  { id: "body_physiology", label: "身體部位與生理", group: "human_existence" },
  { id: "health_medical", label: "常見疾病與常規醫療", group: "human_existence" },
  { id: "psychology_character", label: "心理情感與性格", group: "human_existence" },
  { id: "med_basic", label: "基礎醫學", group: "clinical_medical" },
  { id: "med_nursing", label: "基本護理學及護理行政", group: "clinical_medical" },
  { id: "med_medsurg", label: "內外科護理學", group: "clinical_medical" },
  { id: "med_pedsmats", label: "產兒科護理學", group: "clinical_medical" },
  { id: "med_psychcomm", label: "精神科與社區衛生護理學", group: "clinical_medical" },
  { id: "food_culture", label: "飲食文化", group: "material_life" },
  { id: "fashion_beauty", label: "服飾與美容", group: "material_life" },
  { id: "housing_space", label: "居住與家電", group: "material_life" },
  { id: "transport_mobility", label: "交通與移動", group: "material_life" },
  { id: "leisure_sports", label: "休閒育樂與購物", group: "material_life" },
  { id: "astronomy_meteorology", label: "天文與氣象", group: "nature_universe" },
  { id: "geography_ecology", label: "地理與生態", group: "nature_universe" },
  { id: "biological_world", label: "生物世界", group: "nature_universe" },
  { id: "relations_human", label: "人際與關係", group: "society_civilization" },
  { id: "society_politics_law", label: "社會政治法律", group: "society_civilization" },
  { id: "economy_business", label: "經濟商業金融", group: "society_civilization" },
  { id: "culture_thought", label: "文明與傳承", group: "society_civilization" },
  { id: "math_quantity", label: "數量與數理", group: "abstract_concepts" },
  { id: "properties_relations", label: "性質狀態關係", group: "abstract_concepts" }
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

const catLabels = {
  ...nounSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...verbSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...adjSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {})
};

export default function ConsolidationView({ chunks, posFilter = 'noun' }) {
  const categoryGroups = posFilter === 'verb' ? verbCategoryGroups : posFilter === 'adjective' ? adjCategoryGroups : nounCategoryGroups;
  const subCategories = posFilter === 'verb' ? verbSubCategories : posFilter === 'adjective' ? adjSubCategories : nounSubCategories;
  const [level, setLevel] = useState('全部等級');
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeSub, setActiveSub] = useState('all');
  const [selectedVerb, setSelectedVerb] = useState(null); // Used for both Verbs and Adjectives detail modals

  // 1. Get raw vocab
  let vocabulary = [];
  if (level === '全部等級') {
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
      if (vCat.startsWith('verb_')) return false; // Noun tab shouldn't show verb_ categories
      if (t === 'adjective' || p.includes('形容詞')) return false;
    } else if (posFilter === 'verb') {
      if (!(t === 'verb' || p.includes('動詞') || p.includes('verb'))) return false;
      if (!vCat.startsWith('verb_')) return false; // STRICT: Only show words generated for the new verb categories!
    } else if (posFilter === 'adjective') {
      if (!(t === 'adjective' || p.includes('形容詞') || p.includes('adj'))) return false;
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
          margin-bottom: 16px;
        }
        .subcat-row:last-child {
          margin-bottom: 0;
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
        
        {posFilter === 'verb' && (
          <div className="verb-intro-banner">
            <div className="verb-intro-title">
              <span>📖</span> 日文動詞的三大分類（三段動詞）
            </div>
            <p className="verb-intro-desc" style={{ marginBottom: '16px' }}>
              日文動詞依照變化的規律，主要分為三大類。掌握這三個分類，是學好動詞變化的最重要基礎：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>I 類動詞（五段動詞）</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  字典形語尾必定是<strong>「う」段音</strong>。變化最多樣。<br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>[ます形] 語尾轉「い」段音＋ます</span><br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>例：書（か）く → 書（か）きます<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;話（はな）す → 話（はな）します</span><br/>
                  <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>※例外：帰（かえ）る、切（き）る、知（し）る、走（はし）る、入（はい）る等，長得像 II 類，但屬於 I 類動詞。</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>II 類動詞（上一段/下一段）</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  字典形語尾必定是<strong>「る」</strong>，且前面為「い/え」段。變化最規律。<br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>[ます形] 去掉「る」＋ます</span><br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>例：見（み）る → 見（み）ます<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;食（た）べる → 食（た）べます</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>III 類動詞（不規則動詞）</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  只有兩個不規則變化的動詞，以及「名詞＋する」群。<br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>[ます形] 不規則變化</span><br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>例：する（做）→ します<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来（く）る（來）→ 来（き）ます</span>
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
                    {!item.furigana && <div className="old-furi">{item.reading || ' '}</div>}
                    <div className="old-word">
                      {item.furigana ? <FuriganaText text={item.furigana} /> : (item.word || '-')}
                    </div>
                    <div className="old-romaji">{item.romaji || '-'}</div>
                  </div>
                  <div className="old-badges">
                    <span className="badge-level">{item.level || 'N5'}</span>
                    <span className="badge-cat">{catLabels[item.category] || '單字'}</span>
                  </div>
                </div>
                
                <div className="old-meaning">{item.meaning || '-'}</div>
                
                {Array.isArray(item.sentences) && item.sentences.length > 0 ? (
                  item.sentences.map((sent, idx) => (
                    <div className="old-example" key={idx}>
                      <div className="ex-ja">{sent.ja}</div>
                      <div className="ex-en">{sent.zh || sent.en || '-'}</div>
                    </div>
                  ))
                ) : (item.exampleJa || item.exampleEn) ? (
                  <div className="old-example">
                    <div className="ex-ja">{item.exampleJa || '-'}</div>
                    <div className="ex-en">{item.exampleZh || item.exampleEn || '-'}</div>
                  </div>
                ) : null}

                <div className="old-actions">
                  <button className="btn-speaker">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                  </button>
                  {(posFilter === 'verb' || posFilter === 'adjective') && (
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
              {!selectedVerb.furigana && <div className="verb-modal-furi">{selectedVerb.reading}</div>}
              <div className="verb-modal-word">
                {selectedVerb.furigana ? <FuriganaText text={selectedVerb.furigana} /> : selectedVerb.word}
              </div>
              <div className="verb-modal-badges">
                {selectedVerb.verb_group && <span className="vm-badge-group">{selectedVerb.verb_group}</span>}
                {selectedVerb.type === 'adjective' && selectedVerb.pos && <span className="vm-badge-group">{selectedVerb.pos}</span>}
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
                      <div className="vm-sent-ja">{sent.ja}</div>
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
