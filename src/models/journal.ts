import mongoose, { Schema, Document } from 'mongoose'

export interface JournalEntry extends Document {
  title: string
  content: string
  image?: {
    data: Buffer
    contentType: string
  }
  createdAt: Date
}

const JournalSchema = new Schema<JournalEntry>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    data: { type: Buffer, required: false },
    contentType: { type: String, required: false }
  },
  createdAt: { type: Date, default: Date.now }
})

// Important configuration for handling large images
mongoose.set('bufferCommands', false)
mongoose.set('bufferTimeoutMS', 30000)

export const JournalModel =
  mongoose.models.Journal || mongoose.model<JournalEntry>('Journal', JournalSchema)