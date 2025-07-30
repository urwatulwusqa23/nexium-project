import React, { useState } from 'react';
import { saveJournalEntry } from '@/services/journalService';

const JournalPage = () => {
  const [entry, setEntry] = useState('');

  const handleSave = async () => {
    if (!entry.trim()) return;
    await saveJournalEntry({ text: entry, date: new Date().toISOString() });
    setEntry('');
    alert('Journal entry saved!');
  };

  return (
    <div className="page">
      <h1>📝 Journal Your Thoughts</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={8}
        placeholder="Write your thoughts here..."
      />
      <button onClick={handleSave}>Save Entry</button>
    </div>
  );
};

export default JournalPage;
