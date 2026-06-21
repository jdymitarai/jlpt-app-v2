import React, { useState } from 'react';

export default function KanaChart({ kanaData }) {
  const [mode, setMode] = useState('hiragana');

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang.startsWith("ja"));
      if (jaVoice) {
        utterance.voice = jaVoice;
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const kanaList = kanaData?.[mode] || [];

  return (
    <div className="page-section">
      <div className="page-header">
        <div>
          <h1 className="page-title">五十音圖</h1>
          <p className="page-subtitle">學習平假名與片假名。點擊任意平假名或片假名即可聆聽其正確發音。</p>
        </div>
        <div className="kana-controls">
          <button 
            className={`btn ${mode === 'hiragana' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('hiragana')}
          >
            平假名
          </button>
          <button 
            className={`btn ${mode === 'katakana' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('katakana')}
          >
            片假名
          </button>
        </div>
      </div>

      <div className="glass-card">
        <div className="kana-chart-grid">
          {kanaList.map((item, idx) => {
            if (!item.jp) {
              return <div key={idx} className="kana-card empty"></div>;
            }

            return (
              <div 
                key={idx} 
                className="kana-card"
                onClick={(e) => {
                  speak(item.jp);
                  const card = e.currentTarget;
                  card.classList.add("ripple-effect");
                  setTimeout(() => card.classList.remove("ripple-effect"), 300);
                }}
              >
                <div className="kana-jp">{item.jp}</div>
                <div className="kana-romaji">{item.romaji}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
