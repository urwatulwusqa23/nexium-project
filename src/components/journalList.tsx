'use client'
import { useEffect, useState } from 'react'

interface JournalListProps {
  onEntryClick: (entry: JournalEntry) => void
  activeEntryId?: string
}

interface JournalEntry {
  _id: string
  title: string
  content: string
  image?: {
    data: string
    contentType: string
  }
  createdAt: string
}

export default function JournalList({ onEntryClick, activeEntryId }: JournalListProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch('/api/journals')
        if (!res.ok) throw new Error('Failed to fetch entries')
        const data = await res.json()
        setEntries(data)
      } catch (error) {
        console.error('Error fetching entries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  if (loading) return <div className="text-center py-4 text-amber-700">Loading entries...</div>

  return (
    <div className="space-y-4">
      {entries.map((entry) => {
        const preview = entry.content.split('\n')[0].substring(0, 100)
        const date = new Date(entry.createdAt)
        
        return (
          <div
            key={entry._id}
            onClick={() => onEntryClick(entry)}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              activeEntryId === entry._id 
                ? 'bg-amber-100 border-l-4 border-amber-500' 
                : 'bg-white hover:bg-amber-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-xs font-medium text-amber-600">
                  {date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                </span>
                <span className="text-xl font-bold text-amber-900">
                  {date.getDate()}
                </span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-amber-900 line-clamp-1">
                  {entry.title}
                </h3>
                <p className="text-sm text-amber-700 line-clamp-2">
                  {preview}
                </p>
                {entry.image?.data && (
                  <div className="mt-2">
                    <img
                      src={`data:${entry.image.contentType};base64,${entry.image.data}`}
                      alt="Preview"
                      className="h-12 w-12 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}