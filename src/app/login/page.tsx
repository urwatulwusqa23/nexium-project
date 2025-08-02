'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
      }
    })

    setMessage(error ? error.message : 'Check your email for magic link!')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Login with Email</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-2 border rounded w-full mb-2"
        placeholder="you@example.com"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white py-2 px-4 rounded w-full"
      >
        Send Magic Link
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}
