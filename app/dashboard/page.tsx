'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = '/'
      } else {
        setUserEmail(session.user.email || '')
        setLoading(false)
      }
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <div style={{
      background: '#0A0D14',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F0F2FF',
      fontFamily: 'Tajawal, sans-serif'
    }}>
      جاري التحميل...
    </div>
  )

  return (
    <div style={{
      fontFamily: 'Tajawal, sans-serif',
      background: '#0A0D14',
      color: '#F0F2FF',
      minHeight: '100vh',
      padding: '40px',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{fontSize: '1.8rem', fontWeight: 900}}>🔍 SocialLens</h1>
          <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
            <span style={{color: 'rgba(240,242,255,0.5)', fontSize: '0.9rem'}}>{userEmail}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent',
                color: '#F0F2FF',
                cursor: 'pointer',
                fontFamily: 'Tajawal, sans-serif'
              }}
            >
              خروج
            </button>
          </div>
        </div>

        <div style={{
          background: '#111520',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '24px',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '3rem', marginBottom: '16px'}}>🎉</div>
          <h2 style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px'}}>أهلاً بيك!</h2>
          <p style={{color: 'rgba(240,242,255,0.5)'}}>الداشبورد شغال تمام</p>
        </div>
      </div>
    </div>
  )
}