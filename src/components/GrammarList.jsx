import React, { useState } from 'react';

export default function GrammarList({ grammar }) {
  const [level, setLevel] = useState('N5');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

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
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1 className="page-title">{level} 核心文法</h1>
          <p className="page-subtitle">重點文法課，搭配結構拆解模型與造句練習。</p>
        </div>
        <div className="level-selector-section" style={{ marginTop: '16px' }}>
          <div className="level-pills">
            {['全部', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
              <button 
                key={lvl}
                className={`level-pill ${level === lvl ? 'active' : ''}`}
                onClick={() => { setLevel(lvl); setExpandedId(null); }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card vocab-header" style={{ marginBottom: '24px' }}>
        <div className="search-bar-container">
          <svg className="search-icon-svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder="搜尋文法標題、結構或解釋..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grammar-list-container">
        {filteredGrammar.map((g, i) => {
          const isExpanded = expandedId === (g.id || i);
          
          return (
            <div key={g.id || i} className={`grammar-item-card ${isExpanded ? 'expanded' : ''}`}>
              <div className="grammar-item-header" onClick={() => toggleExpand(g.id || i)}>
                <div className="grammar-header-left">
                  <div className="grammar-index">{i + 1}</div>
                  <div className="grammar-title">{g.title}</div>
                </div>
                <div className="grammar-collapse-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="grammar-item-body">
                <div style={{ marginBottom: '20px' }}>
                  <span className="grammar-section-title">接續結構</span>
                  <div className="grammar-structure-box">
                    {g.structure}
                  </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <span className="grammar-section-title">用法解說</span>
                  <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    {g.explanation}
                  </p>
                </div>

                <div>
                  <span className="grammar-section-title">實用例句</span>
                  <div className="examples-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {g.examples?.map((ex, idx) => (
                      <div key={idx} style={{ 
                        borderLeft: '4px solid var(--primary)', 
                        paddingLeft: '16px', 
                        background: 'rgba(0,0,0,0.02)', 
                        padding: '12px 16px',
                        borderRadius: '0 8px 8px 0'
                      }}>
                        <div style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '4px', fontWeight: 500 }}>
                          {ex.ja}
                        </div>
                        {ex.kana && (
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                            {ex.kana}
                          </div>
                        )}
                        <div style={{ color: 'var(--text-secondary)' }}>
                          {ex.zh}
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
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            找不到符合的文法。
          </div>
        )}
      </div>
    </div>
  );
}
