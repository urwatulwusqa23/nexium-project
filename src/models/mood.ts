// models/Mood.ts
import mongoose from 'mongoose'

const MoodSchema = new mongoose.Schema({
  user: String,
  day: String,
  mood: String,
  note: String,
  summary: String
}, { timestamps: true })

export default mongoose.models.Mood || mongoose.model('Mood', MoodSchema)
