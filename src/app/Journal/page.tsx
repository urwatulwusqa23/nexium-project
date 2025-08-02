'use client'
import { useState } from 'react'
import JournalForm from '@/components/journalForm'
import JournalList from '@/components/journalList'

export default function JournalPage() {
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-900">August 2024</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Entries List */}
          <div className="md:col-span-1 space-y-8">
            {/* New Entry Form (Collapsible) */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <JournalForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
            </div>

            {/* Entries List */}
            <div className="space-y-6">
              <JournalList 
                key={refreshKey}
                onEntryClick={setActiveEntry}
                activeEntryId={activeEntry?._id}
              />
            </div>
          </div>

          {/* Right Column - Active Entry */}
          <div className="md:col-span-2">
            {activeEntry ? (
              <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-serif font-bold text-amber-900">
                    {activeEntry.title}
                  </h2>
                  <p className="text-amber-700 mt-1">
                    {new Date(activeEntry.createdAt).toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-800 whitespace-pre-line">
                    {activeEntry.content}
                  </p>
                </div>

                {activeEntry.image?.data && (
                  <div className="mt-6">
                    <img
                      src={`data:${activeEntry.image.contentType};base64,${activeEntry.image.data}`}
                      alt="Journal entry"
                      className="rounded-lg shadow-sm max-h-80 object-cover w-full"
                    />
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-amber-100">
                  <p className="text-sm text-amber-600">
                    {activeEntry.content.split(' ').length} Words
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm h-full flex items-center justify-center">
                <p className="text-amber-700">Select an entry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
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