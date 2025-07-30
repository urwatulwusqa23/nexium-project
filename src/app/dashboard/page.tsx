// app/dashboard/page.tsx (Dashboard Page)
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const tabs = ['Activity', 'Mood', 'Food', 'Sleep']

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Activity')
  const [mood, setMood] = useState('')
  const [note, setNote] = useState('')
  const [day, setDay] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const submitMood = async () => {
    await fetch('/api/mood', {
      method: 'POST',
      body: JSON.stringify({ user: user?.email, mood, note, day }),
    })
    alert('Mood submitted!')
  }

  return (
    <div className="p-6 min-h-screen bg-[#f9f9f6] font-sans">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Good morning, {user?.email?.split('@')[0] || 'Guest'} ☀️</h1>
          <div className="flex mt-2 space-x-2">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`px-4 py-1 rounded-full text-sm text-black ${
                  activeTab === tab ? 'bg-black text-white' : 'bg-gray-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
      </div>

      {/* Mood History */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Mood History</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-3xl">
                {['😡', '😫', '😤', '😢', '😊'][i]}
              </div>
              <span className="text-sm text-black">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Actions</h2>
        <div className="flex space-x-3">
          {['🧘 Meditate', '📝 Journal', '💬 Talk'].map((act, i) => (
            <div key={i} className="bg-purple-100 px-4 py-2 rounded-xl text-sm font-medium text-black">
              {act}
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Activity Suggestions</h2>
        <div className="bg-green-100 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="font-semibold text-black">Take a 5-min session</p>
            <p className="text-xs text-gray-800">5 min • Exercise</p>
          </div>
          <span className="text-green-600 font-bold">+20 ↑</span>
        </div>
      </div>
<div className="mb-6">
  <h2 className="text-lg font-semibold mb-2 text-black">Relaxation Resources</h2>

  {/* YouTube Embed */}
  <div className="mb-4">
    <iframe
      className="rounded-xl w-full h-48"
      src="https://www.youtube.com/embed/2OEL4P1Rz04"
      title="Relaxing Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>

  {/* Spotify Embed */}
  <div className="mb-4">
    <iframe
      className="rounded-xl w-full h-20"
      src="https://open.spotify.com/embed/playlist/37i9dQZF1DWUvHZA1zLcjW?utm_source=generator"
      allow="encrypted-media"
    ></iframe>
  </div>

  {/* External Links */}
  <div className="space-y-2 text-sm text-blue-700 underline">
    <a href="https://www.headspace.com/meditation/meditation-for-beginners" target="_blank">Meditation Guide</a><br />
    <a href="https://www.calm.com/" target="_blank">Calm App</a>
  </div>
</div>

      {/* Mood Input */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-bold mb-3 text-black">Log Today’s Mood</h2>
        <select
          onChange={e => setDay(e.target.value)}
          className="w-full p-2 border mb-2 rounded-md text-black"
        >
          <option>Select Day</option>
          {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input
          className="w-full p-2 border mb-2 rounded-md text-black"
          placeholder="How do you feel?"
          onChange={e => setMood(e.target.value)}
        />
        <textarea
          className="w-full p-2 border mb-3 rounded-md text-black"
          placeholder="Write a note..."
          onChange={e => setNote(e.target.value)}
        />
        <button
          onClick={submitMood}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
