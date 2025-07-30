'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        error,
      } = await supabase.auth.getSession()

      if (session) {
        router.push('/dashboard')
      } else {
        router.push('/signup')
      }
    }

    checkSession()
  }, [router])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Logging you in...</h2>
      <p>If you&apos;re not redirected in a few seconds, please check your email again.</p>
    </div>
  )
}
