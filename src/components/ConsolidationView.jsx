import React, { useState } from 'react';

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

const catLabels = {
  ...nounSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {}),
  ...verbSubCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.label }), {})
};

export default function ConsolidationView({ chunks, posFilter = 'noun' }) {
  const categoryGroups = posFilter === 'verb' ? verbCategoryGroups : nounCategoryGroups;
  const subCategories = posFilter === 'verb' ? verbSubCategories : nounSubCategories;
  const [level, setLevel] = useState('全部等級');
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [activeSub, setActiveSub] = useState('all');

  // 1. Get raw vocab
  let vocabulary = [];
  if (level === '全部等級') {
    vocabulary = Object.values(chunks || {}).reduce((acc, chunk) => acc.concat(chunk.vocabulary || []), []);
  } else {
    vocabulary = chunks?.[level]?.vocabulary || [];
  }
  
  // 2. Filter for Nouns/Verbs & Search
  let filteredVocab = vocabulary.filter(v => {
    if (!v) return false;
    
    // Check Part of Speech
    const t = String(v.type || '').toLowerCase();
    const p = String(v.pos || v.type || '').toLowerCase();
    const vCat = v.category || 'other';

    if (posFilter === 'noun') {
      if (!(t === 'noun' || p.includes('名詞') || p.includes('noun'))) return false;
      if (vCat.startsWith('verb_')) return false; // Noun tab shouldn't show verb_ categories
    } else if (posFilter === 'verb') {
      if (!(t === 'verb' || p.includes('動詞') || p.includes('verb'))) return false;
      if (!vCat.startsWith('verb_')) return false; // STRICT: Only show words generated for the new verb categories!
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
                  字典形語尾必定是<strong>「う」段音</strong>（如 く、す、つ、ぬ、む、る、う 等）。變化最多樣。<br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>例：書く (kaku)、話す (hanasu)、乗る (noru)</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>II 類動詞（上一段/下一段）</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  字典形語尾必定是<strong>「る」</strong>，且「る」前面的音落在<strong>「い」段或「え」段</strong>。變化最規律。<br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>例：見る (mi-ru)、食べる (tabe-ru)、起きる (oki-ru)</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '12px', border: '1px solid #bae6fd' }}>
                <div style={{ fontWeight: '800', color: '#0284c7', marginBottom: '8px', fontSize: '1.1rem' }}>III 類動詞（不規則動詞）</div>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6' }}>
                  只有兩個不規則變化的動詞，以及由「名詞＋する」所構成的動詞群。<br/>
                  <span style={{ color: '#0ea5e9', fontWeight: '600' }}>例：する (做)、来る (くる / 來)、勉強する</span>
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
                    <div className="old-furi">{item.reading || item.furigana || ' '}</div>
                    <div className="old-word">{item.word || '-'}</div>
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
    </section>
  );
}
