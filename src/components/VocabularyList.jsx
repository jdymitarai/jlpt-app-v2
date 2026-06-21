import React, { useState, useMemo } from 'react';

const POS_FILTERS = [
  { id: 'all', label: '全部單字' },
  { id: 'noun', label: '名詞' },
  { id: 'verb', label: '動詞' },
  { id: 'adjective', label: '形容詞' },
  { id: 'pronoun', label: '代名詞' },
  { id: 'adverb', label: '副詞' },
  { id: 'particle', label: '助詞' },
];

export default function VocabularyList({ chunk, globalData }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Combine chunk vocab and potentially global pronouns/adverbs
  const vocabList = useMemo(() => {
    let list = chunk.vocabulary || [];
    
    // Add pronouns if applicable
    if (globalData?.pronouns) {
      // flattening the grouped pronouns
      const pronounsFlat = globalData.pronouns.reduce((acc, p) => acc.concat(p.items || []), []);
      // Map to standard vocab format
      const formattedPronouns = pronounsFlat.map(p => ({
        word: p.word,
        reading: p.reading,
        meaning: p.meaning,
        type: 'pronoun',
        pos: '代名詞'
      }));
      list = [...list, ...formattedPronouns];
    }
    
    return list;
  }, [chunk, globalData]);

  const filteredVocab = useMemo(() => {
    return vocabList.filter(v => {
      // Filter by POS
      if (filter !== 'all') {
        const typeMatch = v.type === filter || (v.pos && v.pos.includes(POS_FILTERS.find(f => f.id === filter).label.substring(0,2)));
        if (!typeMatch) return false;
      }
      
      // Filter by search
      if (search) {
        const q = search.toLowerCase();
        const wordMatch = v.word && v.word.toLowerCase().includes(q);
        const readingMatch = v.reading && v.reading.toLowerCase().includes(q);
        const meaningMatch = v.meaning && v.meaning.toLowerCase().includes(q);
        if (!wordMatch && !readingMatch && !meaningMatch) return false;
      }
      
      return true;
    });
  }, [vocabList, filter, search]);

  return (
    <div>
      <div className="filters">
        <select 
          className="select-input" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          {POS_FILTERS.map(f => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
        
        <input 
          type="text" 
          className="text-input" 
          placeholder="搜尋單字、讀音或釋義..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
        共找到 {filteredVocab.length} 個單字
      </div>

      <div className="grid">
        {filteredVocab.slice(0, 100).map((v, i) => (
          <div key={i} className="card">
            <div className="card-header">
              <span className="badge">{v.pos || v.type || '單字'}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {v.reading || v.furigana || '-'}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
              {v.word || '-'}
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
              {v.meaning || '-'}
            </div>
          </div>
        ))}
      </div>
      
      {filteredVocab.length > 100 && (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          因效能考量，僅顯示前 100 筆。請使用搜尋功能過濾。
        </div>
      )}
    </div>
  );
}
