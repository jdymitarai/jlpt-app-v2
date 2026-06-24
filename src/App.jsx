import React, { useState, useEffect } from 'react';
import ConsolidationView from './components/ConsolidationView';
import GrammarList from './components/GrammarList';
import KanaChart from './components/KanaChart';
import ConversationView from './components/ConversationView';

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
                <span>動詞分類</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'adjectives' ? 'active' : ''}`} onClick={() => setActiveTab('adjectives')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                <span>形容詞分類</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'adverbs' ? 'active' : ''}`} onClick={() => setActiveTab('adverbs')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                <span>副詞大全</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'mimetic' ? 'active' : ''}`} onClick={() => setActiveTab('mimetic')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>擬聲擬態大全</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'pronouns' ? 'active' : ''}`} onClick={() => setActiveTab('pronouns')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span>代名詞大全</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'keigo' ? 'active' : ''}`} onClick={() => setActiveTab('keigo')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /><path d="M12 11l5-5-5-5" transform="rotate(45 12 12)"/></svg>
                <span>敬語大全</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'grammar' ? 'active' : ''}`} onClick={() => setActiveTab('grammar')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>核心文法</span>
              </a>
            </li>
            <li className={`nav-item ${activeTab === 'conversation' ? 'active' : ''}`} onClick={() => setActiveTab('conversation')}>
              <a>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                <span>實用情境會話</span>
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

                {activeTab === 'adjectives' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="adjective" />
                )}

                {activeTab === 'adverbs' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="adverb" />
                )}

                {activeTab === 'mimetic' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="mimetic" />
                )}

                {activeTab === 'pronouns' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="pronoun" />
                )}

                {activeTab === 'keigo' && (
                  <ConsolidationView chunks={jlptData.JLPT_DATA_CHUNKS} posFilter="keigo" />
                )}
                
                {/* Placholders for other views to be implemented */}

                {activeTab === 'kana' && (
                  <KanaChart kanaData={jlptData.JLPT_DATA?.kana} />
                )}

                {activeTab === 'grammar' && (
                  <GrammarList grammar={jlptData.JLPT_DATA?.grammar || []} />
                )}
                {activeTab === 'conversation' && (
                  <ConversationView conversations={jlptData.JLPT_DATA?.conversations} />
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
