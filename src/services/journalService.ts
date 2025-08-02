
import axios from 'axios';

export const saveJournalEntry = async (entry: { text: string; date: string }) => {
  try {
    const res = await axios.post('/api/journal', entry);
    return res.data;
  } catch (error) {
    console.error('Error saving journal entry:', error);
    throw error;
  }
};