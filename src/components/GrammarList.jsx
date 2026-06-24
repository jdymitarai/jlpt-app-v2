import React, { useState } from 'react';

// Furigana component from other files (re-implemented here for simplicity or we can assume it's global, but better to implement a simple parser for grammar since we didn't import it in the original either)
const renderFurigana = (text) => {
  if (!text) return null;
  const regex = /([一-龥々]+)\[([^\]]+)\]/g;
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

export default function GrammarList({ grammar }) {
  const [level, setLevel] = useState('N5');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Colors for different JLPT levels
  const levelColors = {
    'N5': '#10b981', // Green
    'N4': '#f59e0b', // Orange
    'N3': '#3b82f6', // Blue
    'N2': '#8b5cf6', // Purple
    'N1': '#ef4444', // Red
    '全部': '#64748b'  // Slate
  };

  const filteredGrammar = grammar.filter(g => {
    if (g.level !== level && g.level !== undefined && g.level !== null && level !== '全部') {
      if (g.level !== level) return false;
    }
    if (!search) return true;
    const q = search.toLowerCase();
    return g.title?.toLowerCase().includes(q) || 
           g.structure?.toLowerCase().includes(q) || 
           g.explanation?.toLowerCase().includes(q);
  });

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
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
        .gram-lvl-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
        }
        /* Dynamic Level Colors applied via inline style below */

        .grammar-search-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
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
        .grammar-search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          background: #fff;
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
        .gram-card.is-expanded {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
          transform: translateY(-2px);
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
        .gram-card-header:hover {
          background: #f8fafc;
        }
        .gram-title-group {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .gram-index {
          font-size: 1.2rem;
          font-weight: 800;
          color: #cbd5e1;
          min-width: 40px;
        }
        .gram-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
        }
        .gram-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.5px;
        }
        .gram-chevron {
          color: #94a3b8;
          transition: transform 0.3s;
        }
        .gram-card.is-expanded .gram-chevron {
          transform: rotate(180deg);
          color: #0f172a;
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
        .gram-card.is-expanded .gram-card-body {
          padding: 32px;
          max-height: 2000px;
          opacity: 1;
          visibility: visible;
          border-top: 1px solid #e2e8f0;
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
        .gram-ex-ja {
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        .gram-ex-ja ruby {
          ruby-position: over;
        }
        .gram-ex-ja rt {
          font-size: 0.6em;
          color: #64748b;
          font-weight: 600;
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
        .gram-ex-zh::before {
          content: '譯';
          background: #e2e8f0;
          color: #475569;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 800;
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
        <div className="grammar-search-wrapper">
          <svg className="grammar-search-icon" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            className="grammar-search-input" 
            placeholder="搜尋文法標題、結構或解釋..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="grammar-cards-grid">
        {filteredGrammar.map((g, i) => {
          const isExpanded = expandedId === (g.id || i);
          const badgeColor = levelColors[g.level] || levelColors['全部'];
          
          return (
            <div key={g.id || i} className={`gram-card ${isExpanded ? 'is-expanded' : ''}`}>
              <div className="gram-card-header" onClick={() => toggleExpand(g.id || i)}>
                <div className="gram-title-group">
                  <div className="gram-index">{String(i + 1).padStart(2, '0')}</div>
                  <div className="gram-title">{g.title}</div>
                  <div className="gram-badge" style={{ background: badgeColor }}>
                    {g.level}
                  </div>
                </div>
                <div className="gram-chevron">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
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
                    {g.examples?.map((ex, idx) => (
                      <div key={idx} className="gram-ex-item">
                        <div className="gram-ex-ja">
                          {ex.furigana ? renderFurigana(ex.furigana) : (ex.ja || ex.text)}
                        </div>
                        {/* Fallback to en since the existing data has 'en' instead of 'zh' */}
                        <div className="gram-ex-zh">
                          {ex.zh || ex.en}
                        </div>
                      </div>
                    ))}
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
