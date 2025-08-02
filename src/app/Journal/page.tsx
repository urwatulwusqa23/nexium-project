'use client'

import { useState } from 'react'
import JournalForm from '@/components/journalForm'
import JournalList from '@/components/journalList'
import SidebarLayout from "@/components/SidebarLayout";
export default function JournalPage() {
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [addingNew, setAddingNew] = useState(false);

  const handleAddNew = () => {
    setAddingNew(true);
    setActiveEntry(null);
  };

  const handleEntryClick = (entry: JournalEntry) => {
    setActiveEntry(entry);
    setAddingNew(false);
  };

  return (
    <SidebarLayout>
    <div className="h-screen flex font-sans bg-pastel-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-1/4 bg-pink-100 text-purple-800 p-4 flex flex-col border-r border-purple-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" />
          </svg>
          Journal
        </h2>

        <button
          className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-4 py-2 rounded font-semibold mb-4 transition-colors"
          onClick={handleAddNew}
        >
          + Add New Entry
        </button>
        <div className="flex-1 overflow-y-auto">
          <JournalList key={refreshKey} onEntryClick={handleEntryClick} activeEntryId={activeEntry?._id} />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto bg-purple-50">
        {addingNew ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-800 border border-purple-100">
            <JournalForm onSuccess={() => {
              setRefreshKey(prev => prev + 1);
              setAddingNew(false);
            }} />
          </div>
        ) : activeEntry ? (
          <div className="bg-white rounded-xl shadow p-6 text-gray-800 border border-purple-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1 text-purple-700">
                  {new Date(activeEntry.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </h1>
                <p className="text-lg font-medium mb-4 text-purple-600">{activeEntry.title}</p>
              </div>
              <span className="text-sm text-gray-400">Entry time unavailable</span>
            </div>

            <div className="prose max-w-none text-gray-700">
              <p className="mb-4 whitespace-pre-line">{activeEntry.content}</p>
            </div>

            {activeEntry.image?.data && (
              <div className="mt-6 overflow-auto">
                <img
                  src={`data:${activeEntry.image.contentType};base64,${activeEntry.image.data}`}
                  alt="Journal entry"
                  className="rounded-lg shadow object-contain w-full max-h-[80vh]"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select an entry to view details
          </div>
        )}
      </div>
    </div>
    </SidebarLayout>
  );
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
