  // app/page.tsx
  'use client'
  import { supabase } from '@/lib/supabase'
  import { useState } from 'react'

  export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleLogin = async () => {
      const { error } = await supabase.auth.signInWithOtp({ email })
      setMessage(error ? error.message : 'Check your email for magic link!')
    }

    return (
      <div className="p-8">
        <h1>Login with Email</h1>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={handleLogin}>Send Magic Link</button>
        <p>{message}</p>
      </div>
    )
  }
