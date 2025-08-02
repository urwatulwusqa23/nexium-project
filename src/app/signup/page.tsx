'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
        data: { name },
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Magic link sent! Check your email.')
    }

    setLoading(false)
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/Images/ik.jpg')" }}>
      </div>

      <div className="w-1/2 bg-[#d194b5] flex flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-[cursive] text-black mb-2">Welcome to</h1>
        <h2 className="text-5xl font-[cursive] italic text-black mb-10">Moodify</h2>

        <form onSubmit={handleSignup} className="w-full max-w-sm space-y-6">
          <div>
            <label className="block text-black italic mb-1">Name:</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-gray-100 border-none outline-none text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black italic mb-1">Email:</label>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-100 border-none outline-none  text-black"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#420558] text-white font-bold py-3 rounded hover:bg-[#631c7d] transition"
          >
            {loading ? 'Sending...' : 'Get Magic Link'}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-center text-black">{message}</p>}
      </div>
    </div>
  )
}
