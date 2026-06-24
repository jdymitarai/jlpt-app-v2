import React, { useState } from 'react';

// Reuse FuriganaText logic from ConsolidationView
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
  const [activeConv, setActiveConv] = useState(conversations && conversations.length > 0 ? conversations[0].id : null);

  if (!conversations || conversations.length === 0) {
    return <div className="page-section"><h1 className="page-title">實戰情境會話</h1><p className="page-subtitle">尚無會話資料</p></div>;
  }

  const selectedConv = conversations.find(c => c.id === activeConv) || conversations[0];

  return (
    <div className="conversation-container">
      <div className="conv-sidebar">
        <h2 className="conv-sidebar-title">🗣️ 情境選擇</h2>
        <ul className="conv-list">
          {conversations.map(conv => (
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
                {!isUser && <div className="chat-avatar staff-avatar">店</div>}
                <div className="chat-bubble">
                  <div className="chat-speaker">{dialogue.speaker}</div>
                  <div className="chat-text jp-text"><FuriganaText text={dialogue.furigana || dialogue.text} /></div>
                  <div className="chat-translation">{dialogue.translation}</div>
                </div>
                {isUser && <div className="chat-avatar user-avatar">客</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
