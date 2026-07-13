import React, { useState, useEffect } from 'react';

// Reuse FuriganaText logic
const FuriganaText = ({ text }) => {
  if (!text) return null;
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

const ConversationView = ({ conversations }) => {
  const [activeStage, setActiveStage] = useState(null);
  const [activeConv, setActiveConv] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New Interactive Study States
  const [hideTranslations, setHideTranslations] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState({});
  const [rolePlayMode, setRolePlayMode] = useState('none'); // 'none', 'user' (user is blurred), 'staff' (staff is blurred)
  const [revealedRoles, setRevealedRoles] = useState({});
  
  // Continuous Audio Player States
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activePlayIndex, setActivePlayIndex] = useState(-1);
  const [copiedIndex, setCopiedIndex] = useState(-1);

  if (!conversations || conversations.length === 0) {
    return <div className="page-section"><h1 className="page-title">實用情境會話</h1><p className="page-subtitle">尚無會話資料</p></div>;
  }

  // Group conversations by stage
  const groupedConvs = {};
  conversations.forEach(conv => {
    const stage = conv.stage || '🛒 日常生存必備';
    if (!groupedConvs[stage]) groupedConvs[stage] = [];
    groupedConvs[stage].push(conv);
  });

  const stageConvs = groupedConvs[activeStage] || [];
  
  // Filter conversations based on search term
  const filteredConvs = stageConvs.filter(conv => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    if (conv.title && conv.title.toLowerCase().includes(term)) return true;
    if (conv.description && conv.description.toLowerCase().includes(term)) return true;
    
    const hasMatchingTag = conv.dialogues && conv.dialogues.some(d => 
      d.tags && d.tags.some(tag => tag.toLowerCase().includes(term))
    );
    if (hasMatchingTag) return true;
    
    return false;
  });

  // Set selected conv based on filtered results
  let selectedConv = filteredConvs.find(c => c.id === activeConv);
  if (!selectedConv && filteredConvs.length > 0) {
    selectedConv = filteredConvs[0];
  }

  // TTS Reader
  const playTTS = (text) => {
    if (!text) return;
    const cleanText = text.replace(/\[([^\]]+)\]/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    
    // Attempt to set a natural Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.includes('ja') || v.lang.includes('JA'));
    if (jaVoice) utterance.voice = jaVoice;
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return utterance;
  };

  // Continuous Autoplay logic
  useEffect(() => {
    if (!isPlayingAll || activePlayIndex === -1 || !selectedConv) return;
    
    const dialogue = selectedConv.dialogues[activePlayIndex];
    if (!dialogue) {
      setIsPlayingAll(false);
      setActivePlayIndex(-1);
      return;
    }

    const utterance = playTTS(dialogue.text);
    if (utterance) {
      utterance.onend = () => {
        const nextTimeout = setTimeout(() => {
          if (activePlayIndex < selectedConv.dialogues.length - 1) {
            setActivePlayIndex(prev => prev + 1);
            // Auto scroll active bubble into view
            const activeElem = document.getElementById(`bubble-${activePlayIndex + 1}`);
            if (activeElem) {
              activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          } else {
            setIsPlayingAll(false);
            setActivePlayIndex(-1);
          }
        }, 1200);
        return () => clearTimeout(nextTimeout);
      };
      utterance.onerror = () => {
        setIsPlayingAll(false);
        setActivePlayIndex(-1);
      };
    } else {
      setIsPlayingAll(false);
      setActivePlayIndex(-1);
    }
  }, [activePlayIndex, isPlayingAll]);

  // Cancel speech on unmount or conversation change
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      setIsPlayingAll(false);
      setActivePlayIndex(-1);
    };
  }, [activeConv]);

  const startAutoplay = () => {
    window.speechSynthesis.cancel();
    if (isPlayingAll) {
      setIsPlayingAll(false);
      setActivePlayIndex(-1);
    } else {
      setIsPlayingAll(true);
      setActivePlayIndex(0);
      const firstElem = document.getElementById('bubble-0');
      if (firstElem) firstElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const copyToClipboard = (text, index) => {
    const cleanText = text.replace(/\[([^\]]+)\]/g, '$1');
    navigator.clipboard.writeText(cleanText).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(-1), 1500);
    });
  };

  const toggleTranslation = (idx) => {
    setVisibleTranslations(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleRevealRole = (idx) => {
    setRevealedRoles(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Stage Selection View
  if (!activeStage) {
    return (
      <div className="page-section">
        <h1 className="page-title">實用情境會話</h1>
        <p className="page-subtitle">請選擇您想要練習的會話主題</p>
        
        <div className="conv-stage-grid">
          {Object.entries(groupedConvs).map(([stageName, convs]) => (
            <div 
              key={stageName} 
              className="conv-stage-card"
              onClick={() => {
                setActiveStage(stageName);
                setSearchTerm('');
                setActiveConv(convs[0].id);
              }}
            >
              <h2>{stageName}</h2>
              <p>共 {convs.length} 個情境劇本</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const categoryGroups = {};
  filteredConvs.forEach(conv => {
    const cat = conv.category || '未分類';
    if (!categoryGroups[cat]) categoryGroups[cat] = [];
    categoryGroups[cat].push(conv);
  });

  return (
    <div className="conversation-container">
      {/* Sidebar - Scenario Lists */}
      <div className="conv-sidebar">
        <button className="conv-back-btn" onClick={() => { setActiveStage(null); setSearchTerm(''); }}>
          ← 返回大分類
        </button>
        <h2 className="conv-sidebar-title">{activeStage}</h2>
        
        <div className="conv-search">
          <input 
            type="text" 
            placeholder="搜尋情境或標籤 (例如: #N3)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="conv-search-input"
          />
          {searchTerm && (
            <button className="conv-search-clear" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>

        <div className="conv-list-container">
          {filteredConvs.length === 0 ? (
            <div className="conv-no-results">找不到符合「{searchTerm}」的對話。</div>
          ) : (
            Object.entries(categoryGroups).map(([catName, convs]) => (
              <div key={catName} className="conv-category-group">
                <h3 className="conv-category-title">{catName}</h3>
                <ul className="conv-list">
                  {convs.map(conv => (
                    <li 
                      key={conv.id} 
                      className={`conv-item ${selectedConv && selectedConv.id === conv.id ? 'active' : ''}`}
                      onClick={() => setActiveConv(conv.id)}
                    >
                      <span className="conv-icon">{conv.icon}</span>
                      <div className="conv-info">
                        <div className="conv-title">{conv.title}</div>
                        <div className="conv-desc">{conv.description}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="conv-main">
        {selectedConv ? (
          <>
            {/* Conversation Header & Lab Controls */}
            <div className="conv-header" style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ margin: '0 0 6px 0', fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedConv.icon} {selectedConv.title}
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{selectedConv.description}</p>
                </div>
                
                {/* Autoplay & Hide Translation controls */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={startAutoplay}
                    style={{
                      background: isPlayingAll ? '#ef4444' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{isPlayingAll ? '⏹️ 停止播放' : '🔊 自動連播對話'}</span>
                  </button>
                  
                  <button 
                    onClick={() => setHideTranslations(!hideTranslations)}
                    style={{
                      background: hideTranslations ? 'var(--bg-card-hover)' : 'rgba(139, 92, 246, 0.08)',
                      color: 'var(--primary-color)',
                      border: '1px solid var(--border-color)',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    {hideTranslations ? '👁️ 顯示所有翻譯' : '🙈 隱藏所有翻譯'}
                  </button>
                </div>
              </div>

              {/* Role-Play Control Panel */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-main)', padding: '10px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>🎭 角色扮演模式:</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { label: '關閉', value: 'none' },
                    { label: '扮演旅客', value: 'user' },
                    { label: '扮演工作人員/店員', value: 'staff' }
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setRolePlayMode(opt.value);
                        setRevealedRoles({});
                      }}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: rolePlayMode === opt.value ? 'none' : '1px solid var(--border-color)',
                        background: rolePlayMode === opt.value ? '#8b5cf6' : 'var(--bg-card)',
                        color: rolePlayMode === opt.value ? 'white' : 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {rolePlayMode !== 'none' && (
                  <span style={{ fontSize: '0.75rem', color: '#8b5cf6', fontStyle: 'italic' }}>
                    * 提示：您所選角色的日文台詞將被模糊，請自己練習唸出或背誦，再點擊解鎖！
                  </span>
                )}
              </div>
            </div>
            
            {/* Chat Messages Area */}
            <div className="chat-window" style={{ background: 'var(--bg-main)', padding: '24px' }}>
              {selectedConv.dialogues.map((dialogue, index) => {
                const isUser = dialogue.role === 'user';
                const isActivePlaying = activePlayIndex === index;
                
                // Determine if this bubble should be blurred/masked for Roleplay
                const isRoleplayerTarget = rolePlayMode === dialogue.role;
                const isBlurred = isRoleplayerTarget && !revealedRoles[index];
                
                return (
                  <div 
                    key={index} 
                    id={`bubble-${index}`}
                    className={`chat-bubble-wrapper ${isUser ? 'right' : 'left'}`}
                    style={{ 
                      opacity: activePlayIndex !== -1 && !isActivePlaying ? 0.7 : 1,
                      transition: 'all 0.3s'
                    }}
                  >
                    {!isUser && <div className="chat-avatar staff-avatar" style={{ border: isActivePlaying ? '2px solid #8b5cf6' : '1px solid var(--border-color)' }}>👩‍💼</div>}
                    
                    <div 
                      className="chat-bubble"
                      style={{
                        border: isActivePlaying ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
                        boxShadow: isActivePlaying ? '0 0 15px rgba(139, 92, 246, 0.2)' : 'none',
                        background: isActivePlaying ? 'var(--bg-card-hover)' : (isUser ? 'rgba(255, 107, 107, 0.05)' : 'var(--bg-card)')
                      }}
                    >
                      {/* Bubble Actions Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', width: '100%' }}>
                        <span className="chat-speaker">{dialogue.speaker}</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button 
                            onClick={() => playTTS(dialogue.text)} 
                            title="朗讀此句"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: '2px', opacity: 0.7 }}
                          >
                            🔊
                          </button>
                          <button 
                            onClick={() => copyToClipboard(dialogue.text, index)} 
                            title="複製純日文"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: '2px', opacity: 0.7 }}
                          >
                            {copiedIndex === index ? '✅' : '📋'}
                          </button>
                        </div>
                      </div>

                      {/* Dialogue Japanese text (Support Blur) */}
                      <div className="chat-text jp-text" style={{ position: 'relative', minHeight: '1.6em' }}>
                        <div style={{ filter: isBlurred ? 'blur(5px)' : 'none', transition: 'filter 0.2s', userSelect: isBlurred ? 'none' : 'text' }}>
                          <FuriganaText text={dialogue.furigana || dialogue.text} />
                        </div>
                        {isBlurred && (
                          <button
                            onClick={() => toggleRevealRole(index)}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              background: '#8b5cf6',
                              color: 'white',
                              border: 'none',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                          >
                            👁️ 顯示台詞
                          </button>
                        )}
                      </div>

                      {/* Dialogue Translation text (Support Click-to-Reveal) */}
                      {(!hideTranslations || visibleTranslations[index]) ? (
                        <div className="chat-translation" style={{ position: 'relative' }}>
                          {dialogue.translation}
                          {hideTranslations && (
                            <button 
                              onClick={() => toggleTranslation(index)}
                              style={{ background: 'none', border: 'none', color: '#8b5cf6', fontSize: '0.75rem', cursor: 'pointer', marginLeft: '8px', padding: 0 }}
                            >
                              [隱藏]
                            </button>
                          )}
                        </div>
                      ) : (
                        <div 
                          onClick={() => toggleTranslation(index)}
                          style={{
                            fontSize: '0.8rem',
                            color: '#8b5cf6',
                            cursor: 'pointer',
                            fontStyle: 'italic',
                            paddingTop: '8px',
                            borderTop: '1px dashed var(--border-color)',
                            textAlign: 'left'
                          }}
                        >
                          🔍 點擊顯示中文翻譯...
                        </div>
                      )}

                      {/* Bubble tags */}
                      {dialogue.tags && dialogue.tags.length > 0 && (
                        <div className="chat-tags">
                          {dialogue.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="chat-tag" 
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSearchTerm(tag)}
                            >#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    {isUser && <div className="chat-avatar user-avatar" style={{ border: isActivePlaying ? '2px solid #8b5cf6' : '1px solid var(--border-color)' }}>👤</div>}
                  </div>
                );
              })}
            </div>
            
            {/* Contextual Vocab/Learning checklist at the bottom */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                💡 實用對話學習攻略
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                ・您可以使用右上角的<strong>「自動連播」</strong>，關閉螢幕作為隨身日語聽力 CD。<br/>
                ・開啟<strong>「角色扮演」</strong>，大聲唸出被模糊的句子，訓練日語語感和反應速度！
              </p>
            </div>
          </>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            請在左側選擇一個情境劇本開始學習
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationView;
