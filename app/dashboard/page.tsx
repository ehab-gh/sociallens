'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        window.location.href = '/dashboard'
      }
    })
  }, [])

  async function handleLogin() {
    setLoading(true)
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://sociallens-tawny.vercel.app/dashboard'
      }
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{
      fontFamily: 'Tajawal, sans-serif',
      background: '#0A0D14',
      color: '#F0F2FF',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      direction: 'rtl'
    }}>
      <div style={{
        background: '#111520',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '24px',
        padding: '48px',
        width: '400px',
        textAlign: 'center'
      }}>
        <div style={{fontSize: '2.5rem', marginBottom: '16px'}}>🔍</div>
        <h1 style={{fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px'}}>SocialLens</h1>
        <p style={{color: 'rgba(240,242,255,0.5)', marginBottom: '32px'}}>
          سجل دخولك لتحليل أكاونتاتك
        </p>

        {!sent ? (
          <>
            <input
              type="email"
              placeholder="أدخل إيميلك"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#F0F2FF',
                fontSize: '1rem',
                marginBottom: '16px',
                outline: 'none',
                direction: 'ltr',
                textAlign: 'left'
              }}
            />
            <button
              onClick={handleLogin}
              disabled={loading || !email}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #6C63FF, #8B5CF6)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'Tajawal, sans-serif'
              }}
            >
              {loading ? 'جاري الإرسال...' : '🚀 ابدأ — ادخل برابط على إيميلك'}
            </button>
          </>
        ) : (
          <div style={{
            background: 'rgba(0,212,170,0.1)',
            border: '1px solid rgba(0,212,170,0.3)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{fontSize: '2rem', marginBottom: '12px'}}>📧</div>
            <p style={{fontWeight: 700, marginBottom: '8px'}}>تم الإرسال!</p>
            <p style={{color: 'rgba(240,242,255,0.6)', fontSize: '0.9rem'}}>
              افتح إيميلك واضغط على الرابط عشان تدخل
            </p>
          </div>
        )}
      </div>
    </div>
  )
}