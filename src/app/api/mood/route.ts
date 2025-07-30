// src/app/api/mood/route.ts

import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const dbName = 'mental_health'

if (!uri) throw new Error('Missing MONGODB_URI in env')

// Cache the client across hot reloads in development
let cachedClient: MongoClient | null = null

async function connectToMongo() {
  if (cachedClient) return cachedClient
  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  return client
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user_id, mood, notes } = body

    if (!user_id || !mood) {
      return NextResponse.json({ error: 'user_id and mood are required' }, { status: 400 })
    }

    const client = await connectToMongo()
    
    const db = client.db(dbName)
    const moods = db.collection('moods')

    // Optional: Send to n8n for AI summary
    let summary: string | null = null
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        const aiRes = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood, note: notes || '' })
        })
        const aiData = await aiRes.json()
        summary = aiData.summary || null
      } catch (e) {
        console.warn('AI summary failed:', e)
      }
    }

    const doc = {
      user_id,
      mood,
      notes: notes || '',
      summary,
      date: new Date()
    }

    await moods.insertOne(doc)

    return NextResponse.json({ success: true, entry: doc })
  } catch (err) {
    console.error('Error in /api/mood:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
