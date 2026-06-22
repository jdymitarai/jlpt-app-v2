import React, { useState, useEffect } from 'react';
import ConsolidationView from './components/ConsolidationView';
import GrammarList from './components/GrammarList';
import KanaChart from './components/KanaChart';

function App() {
  const [activeTab, setActiveTab] = useState('consolidation'); // default to consolidation for now
  const [currentLevel, setCurrentLevel] = useState('N5');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [jlptData, setJlptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply dark mode class to body based on state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setJlptData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getLevelData = () => {
    if (!jlptData) return null;
    return jlptData.JLPT_DATA_CHUNKS?.[currentLevel] || null;
  };

  const chunkData = getLevelData();

  return (
    <>
      {loading && (
        <div id="loading-overlay" className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">載入級數資料庫中...</div>
        </div>
      )}

      <div className="app-container">
        {/* 側邊導覽列 */}
        <aside className="sidebar">
          <div className="logo-section">
            <div className="logo-icon">{currentLevel}</div>
            <div className="logo-text">日檢教科書</div>
          </div>
          

          
          <nav className="nav-links">

            <li className={`nav-item ${activeTab === 'kana' ? 'active' : ''}`} onClick={() => setActiveTab('kana')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                <span>五十音圖</span>
              </a>
            </li>

            <li className={`nav-item ${activeTab === 'consolidation' ? 'active' : ''}`} onClick={() => setActiveTab('consolidation')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 5a1 1 0 01.757-.975l11-3A1 1 0 0117 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V5zm0 0h12m-6 4v8m-3-4h6"/></svg>
                <span>名詞</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'verbs' ? 'active' : ''}`} onClick={() => setActiveTab('verbs')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span>動詞</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'grammar' ? 'active' : ''}`} onClick={() => setActiveTab('grammar')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>核心文法</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'practice' ? 'active' : ''}`} onClick={() => setActiveTab('practice')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                <span>互動測驗</span>
              </a>
            </li>
          </nav>
          
          <div className="sidebar-footer">
            <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              {isDarkMode ? '淺色模式' : '深色模式'}
            </button>
          </div>
        </aside>

        {/* 主要內容顯示區域 */}
        <main className="main-content">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          
          <div className="main-content-inner">
            {error && (
              <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
                <h2>載入失敗</h2>
                <p>{error}</p>
              </div>
            )}
            
            {!loading && !error && chunkData && (
              <>
                {activeTab === 'consolidation' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="noun" />
                )}
                
                {activeTab === 'verbs' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="verb" />
                )}
                
                {/* Placholders for other views to be implemented */}

                {activeTab === 'kana' && (
                  <KanaChart kanaData={jlptData.JLPT_DATA?.kana} />
                )}

                {activeTab === 'grammar' && (
                  <GrammarList grammar={jlptData.JLPT_DATA?.grammar || []} />
                )}
                {activeTab === 'practice' && <div className="page-section"><h1 className="page-title">互動測驗</h1><p className="page-subtitle">建置中...</p></div>}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
