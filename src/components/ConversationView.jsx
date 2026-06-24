import React, { useState } from 'react';

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
                setActiveConv(convs[0].id); // Select first conv by default
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

  const stageConvs = groupedConvs[activeStage] || [];
  const selectedConv = stageConvs.find(c => c.id === activeConv) || stageConvs[0];

  return (
    <div className="conversation-container">
      <div className="conv-sidebar">
        <button className="conv-back-btn" onClick={() => setActiveStage(null)}>
          ← 返回大分類
        </button>
        <h2 className="conv-sidebar-title">{activeStage}</h2>
        <div className="conv-list-container">
          <ul className="conv-list">
            {stageConvs.map(conv => (
              <li 
                key={conv.id} 
                className={`conv-item ${activeConv === conv.id ? 'active' : ''}`}
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
      </div>

      <div className="conv-main">
        <div className="conv-header">
          <h2>{selectedConv.icon} {selectedConv.title}</h2>
          <p>{selectedConv.description}</p>
        </div>
        
        <div className="chat-window">
          {selectedConv.dialogues.map((dialogue, index) => {
            const isUser = dialogue.role === 'user';
            return (
              <div key={index} className={`chat-bubble-wrapper ${isUser ? 'right' : 'left'}`}>
                {!isUser && <div className="chat-avatar staff-avatar">👩‍💼</div>}
                <div className="chat-bubble">
                  <div className="chat-speaker">{dialogue.speaker}</div>
                  <div className="chat-text jp-text"><FuriganaText text={dialogue.furigana || dialogue.text} /></div>
                  <div className="chat-translation">{dialogue.translation}</div>
                  {dialogue.tags && dialogue.tags.length > 0 && (
                    <div className="chat-tags">
                      {dialogue.tags.map(tag => (
                        <span key={tag} className="chat-tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                {isUser && <div className="chat-avatar user-avatar">👤</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
