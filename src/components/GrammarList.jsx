import React, { useState, useEffect } from 'react';

// Furigana parser
const renderFurigana = (text) => {
  if (!text) return null;
  const regex = /([ 一-龥々]+)\[([^\]]+)\]/g;
  let result = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(<span key={lastIndex}>{text.substring(lastIndex, match.index)}</span>);
    }
    result.push(
      <ruby key={match.index}>
        {match[1]}<rt>{match[2]}</rt>
      </ruby>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
  }

  return <>{result.length > 0 ? result : text}</>;
};

// Strip furigana brackets for voice synthesis
const stripFurigana = (text) => {
  if (!text) return '';
  return text.replace(/\[[^\]]+\]/g, '');
};

export default function GrammarList({ grammar = [] }) {
  const [level, setLevel] = useState('N5');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  
  // Learned status tracking (persisted via localStorage)
  const [learnedIds, setLearnedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('learned_grammar');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Copy feedback state
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    localStorage.setItem('learned_grammar', JSON.stringify(learnedIds));
  }, [learnedIds]);

  // Colors for different JLPT levels
  const levelColors = {
    'N5': '#10b981', // Green
    'N4': '#f59e0b', // Orange
    'N3': '#3b82f6', // Blue
    'N2': '#8b5cf6', // Purple
    'N1': '#ef4444', // Red
    '全部': '#64748b'
  };

  // TTS implementation
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(stripFurigana(text));
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Copy to clipboard
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(stripFurigana(text)).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  // Toggle learned status using unique composite key
  const toggleLearned = (uniqueKey, e) => {
    e.stopPropagation();
    if (learnedIds.includes(uniqueKey)) {
      setLearnedIds(prev => prev.filter(item => item !== uniqueKey));
    } else {
      setLearnedIds(prev => [...prev, uniqueKey]);
    }
  };

  // Filter grammar items
  const filteredGrammar = grammar.filter(g => {
    if (g.level !== level && level !== '全部') {
      return false;
    }
    if (!search) return true;
    const q = search.toLowerCase();
    
    // Check inside title, structure, explanation
    if (g.title?.toLowerCase().includes(q) || 
        g.structure?.toLowerCase().includes(q) || 
        g.explanation?.toLowerCase().includes(q)) {
      return true;
    }
    
    // Check inside example sentences
    if (g.examples && g.examples.some(ex => 
      ex.ja?.toLowerCase().includes(q) || 
      ex.furigana?.toLowerCase().includes(q) || 
      ex.zh?.toLowerCase().includes(q) || 
      ex.en?.toLowerCase().includes(q)
    )) {
      return true;
    }
    
    return false;
  });

  const toggleExpand = (uniqueKey) => {
    if (expandedId === uniqueKey) {
      setExpandedId(null);
    } else {
      setExpandedId(uniqueKey);
    }
  };

  return (
    <section className="grammar-page-section">
      <style>{`
        .grammar-page-section {
          background: #f5f7fa;
          min-height: 100vh;
          padding: 40px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1e293b;
          transition: background 0.3s, color 0.3s;
        }

        /* Dark Mode styles override */
        .dark-mode .grammar-page-section {
          background: #0f172a;
          color: #f8fafc;
        }

        /* Hero Banner */
        .grammar-hero {
          background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 48px;
          color: #0f172a;
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .dark-mode .grammar-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-color: #334155;
          color: #f8fafc;
        }
        .grammar-hero::before {
          content: '文法';
          position: absolute;
          right: -20px;
          bottom: -40px;
          font-size: 180px;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.03);
          pointer-events: none;
        }
        .dark-mode .grammar-hero::before {
          color: rgba(255, 255, 255, 0.02);
        }
        .grammar-hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .grammar-hero-subtitle {
          font-size: 1.15rem;
          color: #64748b;
          max-width: 600px;
          line-height: 1.6;
          margin: 0;
        }
        .dark-mode .grammar-hero-subtitle {
          color: #94a3b8;
        }

        /* Filters & Search */
        .grammar-controls {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }
        
        .grammar-level-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .gram-lvl-btn {
          padding: 10px 24px;
          border-radius: 99px;
          border: 2px solid transparent;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: #fff;
          color: #64748b;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .dark-mode .gram-lvl-btn {
          background: #1e293b;
          color: #94a3b8;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }
        .gram-lvl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
        }

        .controls-row-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .grammar-search-wrapper {
          position: relative;
          width: 100%;
        }
        .grammar-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }
        .grammar-search-input {
          width: 100%;
          padding: 18px 20px 18px 56px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          font-size: 1.1rem;
          color: #1e293b;
          box-shadow: 0 8px 20px rgba(0,0,0,0.03);
          transition: all 0.3s;
          box-sizing: border-box;
        }
        .dark-mode .grammar-search-input {
          border-color: #334155;
          background: rgba(30, 41, 59, 0.8);
          color: #f8fafc;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .grammar-search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          background: #fff;
        }
        .dark-mode .grammar-search-input:focus {
          background: #1e293b;
          border-color: #3b82f6;
        }

        /* Grammar List */
        .grammar-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .gram-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark-mode .gram-card {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .gram-card.is-expanded {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }
        .dark-mode .gram-card.is-expanded {
          border-color: #475569;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }
        .gram-card-header {
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          background: #fff;
          transition: background 0.2s;
        }
        .dark-mode .gram-card-header {
          background: #1e293b;
        }
        .gram-card-header:hover {
          background: #f8fafc;
        }
        .dark-mode .gram-card-header:hover {
          background: #334155;
        }
        .gram-title-group {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }
        .gram-index {
          font-size: 1.2rem;
          font-weight: 800;
          color: #cbd5e1;
          min-width: 40px;
        }
        .dark-mode .gram-index {
          color: #475569;
        }
        .gram-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
        }
        .dark-mode .gram-title {
          color: #f8fafc;
        }
        .gram-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .gram-header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .gram-learned-checkbox-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: #cbd5e1;
        }
        .dark-mode .gram-learned-checkbox-btn {
          color: #475569;
        }
        .gram-learned-checkbox-btn.is-learned {
          color: #10b981;
        }
        .gram-learned-checkbox-btn:hover {
          background: rgba(16, 185, 129, 0.1);
          transform: scale(1.1);
        }
        .gram-chevron {
          color: #94a3b8;
          transition: transform 0.3s;
          display: flex;
          align-items: center;
        }
        .gram-card.is-expanded .gram-chevron {
          transform: rotate(180deg);
          color: #0f172a;
        }
        .dark-mode .gram-card.is-expanded .gram-chevron {
          color: #f8fafc;
        }

        /* Grammar Body (Expanded State) */
        .gram-card-body {
          padding: 0 32px;
          max-height: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: #fafafa;
        }
        .dark-mode .gram-card-body {
          background: #182235;
        }
        .gram-card.is-expanded .gram-card-body {
          padding: 32px;
          max-height: 2000px;
          opacity: 1;
          visibility: visible;
          border-top: 1px solid #e2e8f0;
        }
        .dark-mode .gram-card.is-expanded .gram-card-body {
          border-top-color: #334155;
        }

        .gram-section {
          margin-bottom: 32px;
        }
        .gram-section:last-child {
          margin-bottom: 0;
        }
        .gram-sec-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-weight: 800;
          color: #334155;
          margin-bottom: 16px;
        }
        .dark-mode .gram-sec-title {
          color: #cbd5e1;
        }
        
        /* Syntax Block (Like Code) */
        .gram-syntax-box {
          background: #f1f5f9;
          color: #0369a1;
          border: 1px solid #bae6fd;
          padding: 20px 24px;
          border-radius: 12px;
          font-family: "Fira Code", Consolas, Monaco, monospace;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          box-shadow: none;
          overflow-x: auto;
          white-space: pre-wrap;
        }
        .dark-mode .gram-syntax-box {
          background: #0f172a;
          color: #38bdf8;
          border-color: #0c4a6e;
        }
        
        /* Explanation */
        .gram-desc {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #475569;
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #94a3b8;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .dark-mode .gram-desc {
          background: #1e293b;
          color: #cbd5e1;
          border-left-color: #475569;
        }

        /* Examples */
        .gram-examples {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gram-ex-item {
          background: #fff;
          padding: 20px 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dark-mode .gram-ex-item {
          background: #1e293b;
          border-color: #334155;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .gram-ex-item::before {
          content: '"';
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 4rem;
          color: #f1f5f9;
          font-family: serif;
          line-height: 1;
          pointer-events: none;
        }
        .dark-mode .gram-ex-item::before {
          color: #334155;
        }
        .gram-ex-ja {
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
          line-height: 1.8;
        }
        .dark-mode .gram-ex-ja {
          color: #f8fafc;
        }
        .gram-ex-ja ruby {
          ruby-position: over;
        }
        .gram-ex-ja rt {
          font-size: 0.6em;
          color: #64748b;
          font-weight: 600;
        }
        .dark-mode .gram-ex-ja rt {
          color: #94a3b8;
        }
        .gram-ex-zh {
          font-size: 1.05rem;
          color: #64748b;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dark-mode .gram-ex-zh {
          color: #94a3b8;
        }
        .gram-ex-zh::before {
          content: '譯';
          background: #e2e8f0;
          color: #475569;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 800;
        }
        .dark-mode .gram-ex-zh::before {
          background: #334155;
          color: #cbd5e1;
        }

        .gram-ex-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
          position: relative;
          z-index: 2;
        }
        .ex-action-btn {
          background: #f1f5f9;
          border: none;
          color: #475569;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
        }
        .dark-mode .ex-action-btn {
          background: #334155;
          color: #cbd5e1;
        }
        .ex-action-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: translateY(-1px);
        }
        .dark-mode .ex-action-btn:hover {
          background: #475569;
          color: #fff;
        }
        .ex-action-btn.success {
          background: #d1fae5;
          color: #065f46;
        }
        .dark-mode .ex-action-btn.success {
          background: #065f46;
          color: #a7f3d0;
        }

        .no-results {
          text-align: center;
          padding: 60px;
          color: #94a3b8;
          font-size: 1.2rem;
          font-weight: 600;
          background: #fff;
          border-radius: 20px;
          border: 2px dashed #e2e8f0;
        }
        .dark-mode .no-results {
          background: #1e293b;
          border-color: #334155;
        }
      `}</style>

      {/* Hero Banner */}
      <div className="grammar-hero">
        <h1 className="grammar-hero-title">
          <span>📚</span>
          核心文法指南
        </h1>
        <p className="grammar-hero-subtitle">
          打破死記硬背的迷思。透過結構化拆解與清晰實用的例句，掌握日文最核心的語法骨架。
        </p>
      </div>

      <div className="grammar-controls">
        {/* Level Filters */}
        <div className="grammar-level-filters">
          {['全部', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => {
            const isActive = level === lvl;
            const activeColor = levelColors[lvl] || levelColors['全部'];
            return (
              <button 
                key={lvl}
                className="gram-lvl-btn"
                style={isActive ? {
                  background: activeColor,
                  color: '#fff',
                  borderColor: activeColor,
                  boxShadow: `0 10px 15px -3px ${activeColor}40`
                } : {}}
                onClick={() => { setLevel(lvl); setExpandedId(null); }}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="controls-row-bottom">
          <div className="grammar-search-wrapper">
            <svg className="grammar-search-icon" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="grammar-search-input" 
              placeholder="搜尋文法標題、結構、解釋、或例句內容..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grammar-cards-grid">
        {filteredGrammar.map((g, i) => {
          const uniqueKey = `${g.level}_${g.id}`;
          const isExpanded = expandedId === uniqueKey;
          const badgeColor = levelColors[g.level] || levelColors['全部'];
          const isLearned = learnedIds.includes(uniqueKey);
          
          return (
            <div key={uniqueKey} className={`gram-card ${isExpanded ? 'is-expanded' : ''}`}>
              <div className="gram-card-header" onClick={() => toggleExpand(uniqueKey)}>
                <div className="gram-title-group">
                  <div className="gram-index">{String(i + 1).padStart(2, '0')}</div>
                  <div className="gram-title">{g.title}</div>
                  <div className="gram-badge" style={{ background: badgeColor }}>
                    {g.level}
                  </div>
                </div>
                
                <div className="gram-header-actions" onClick={e => e.stopPropagation()}>
                  <button 
                    className={`gram-learned-checkbox-btn ${isLearned ? 'is-learned' : ''}`}
                    onClick={(e) => toggleLearned(uniqueKey, e)}
                    title={isLearned ? "標記為未學" : "標記為已學"}
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      {isLearned ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <circle cx="12" cy="12" r="9" />
                      )}
                    </svg>
                  </button>
                  <div className="gram-chevron">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="gram-card-body">
                <div className="gram-section">
                  <div className="gram-sec-title"><span>📝</span> 句型接續結構</div>
                  <div className="gram-syntax-box">
                    {g.structure}
                  </div>
                </div>
                
                <div className="gram-section">
                  <div className="gram-sec-title"><span>💡</span> 核心觀念</div>
                  <div className="gram-desc">
                    {g.explanation}
                  </div>
                </div>

                <div className="gram-section">
                  <div className="gram-sec-title"><span>🎯</span> 實戰例句</div>
                  <div className="gram-examples">
                    {g.examples?.map((ex, idx) => {
                      const copyId = `${uniqueKey}_ex_${idx}`;
                      return (
                        <div key={idx} className="gram-ex-item">
                          <div className="gram-ex-ja">
                            {ex.furigana ? renderFurigana(ex.furigana) : (ex.ja || ex.text)}
                          </div>
                          <div className="gram-ex-zh">
                            {ex.zh || ex.en}
                          </div>
                          
                          <div className="gram-ex-actions">
                            <button className="ex-action-btn" onClick={() => speak(ex.ja || ex.furigana)}>
                              🔊 播放音訊
                            </button>
                            <button 
                              className={`ex-action-btn ${copiedId === copyId ? 'success' : ''}`} 
                              onClick={() => handleCopy(ex.ja || ex.furigana, copyId)}
                            >
                              {copiedId === copyId ? '✓ 已複製!' : '📋 複製例句'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredGrammar.length === 0 && (
          <div className="no-results">
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍃</div>
            找不到符合條件的文法
          </div>
        )}
      </div>
    </section>
  );
}
