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
    <div className="flex h-screen">
      {/* Left image panel */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/img.jpg')" }}
      />

      {/* Right message panel */}
      <div className="w-1/2 bg-[#c7d798] flex flex-col justify-center items-center p-10 text-center">
        <h2 className="text-4xl italic mb-4">Logging you in...</h2>
        <p className="text-lg text-black italic">
          If you&apos;re not redirected in a few seconds,<br /> please check your email again.
        </p>
      </div>
    </div>
  )
}
