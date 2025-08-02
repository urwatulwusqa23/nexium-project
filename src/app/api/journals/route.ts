import { NextResponse } from 'next/server'
import { JournalModel } from '@/models/journal'
import { connectToDatabase } from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const imageFile = formData.get('image') as File | null

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    let imageData = undefined
    if (imageFile && imageFile.size > 0) {
      try {
        const arrayBuffer = await imageFile.arrayBuffer()
        imageData = {
          data: Buffer.from(arrayBuffer),
          contentType: imageFile.type
        }
      } catch (uploadError) {
        console.error('Image processing error:', uploadError)
        return NextResponse.json(
          { error: 'Failed to process image' },
          { status: 500 }
        )
      }
    }

    await connectToDatabase()
    const newEntry = new JournalModel({
      title,
      content,
      ...(imageData && { image: imageData }) // Only add if image exists
    })

    await newEntry.save()

    // Convert binary data to base64 for response
    const responseData = newEntry.toObject()
    if (responseData.image?.data) {
      responseData.image.data = responseData.image.data.toString('base64')
    }

    return NextResponse.json(responseData, { status: 201 })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectToDatabase()
    const entries = await JournalModel.find().sort({ createdAt: -1 })
    
    // Convert binary data to base64 for frontend display
    const entriesWithBase64 = entries.map(entry => {
      const entryObj = entry.toObject()
      if (entryObj.image?.data) {
        entryObj.image.data = entryObj.image.data.toString('base64')
      }
      return entryObj
    })

    return NextResponse.json(entriesWithBase64)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    )
  }
}