// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) throw new Error('Please add MONGODB_URI to .env.local')

// eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose || { conn: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  cached.conn = await mongoose.connect(MONGODB_URI)
  return cached.conn
}
