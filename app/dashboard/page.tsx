'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
      else setUser(data.user)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (!user) return (
    <div style={{
      background: '#0A0D14', color: '#F0F2FF',
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tajawal, sans-serif'
    }}>
      <p>جاري التحميل...</p>
    </div>
  )

  return (
    <div style={{
      fontFamily: 'Tajawal, sans-serif',
      background: '#0A0D14',
      color: '#F0F2FF',
      minHeight: '100vh',
      direction: 'rtl'
    }}>
      {/* Topbar */}
      <div style={{
        background: '#111520',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{fontSize: '1.3rem', fontWeight: 900}}>🔍 SocialLens</div>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <span style={{color: 'rgba(240,242,255,0.5)', fontSize: '0.85rem'}}>
            {user.email}
          </span>
          <button onClick={handleLogout} style={{
            padding: '8px 16px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent',
            color: '#F0F2FF',
            cursor: 'pointer',
            fontFamily: 'Tajawal, sans-serif',
            fontSize: '0.85rem'
          }}>
            تسجيل خروج
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{padding: '32px'}}>
        <h1 style={{fontSize: '1.8rem', fontWeight: 900, marginBottom: '8px'}}>
          أهلاً! 👋
        </h1>
        <p style={{color: 'rgba(240,242,255,0.5)', marginBottom: '32px'}}>
          اربط أكاونتاتك وابدأ التحليل
        </p>

        {/* Connect cards */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '600px'}}>
          <div style={{
            background: '#111520',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '28px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <div style={{fontSize: '2.5rem', marginBottom: '12px'}}>📸</div>
            <div style={{fontWeight: 800, marginBottom: '8px'}}>Instagram</div>
            <div style={{
              background: 'linear-gradient(135deg, #E1306C, #FF6B35)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginTop: '16px'
            }}>
              ربط الأكاونت
            </div>
          </div>

          <div style={{
            background: '#111520',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '28px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <div style={{fontSize: '2.5rem', marginBottom: '12px'}}>👤</div>
            <div style={{fontWeight: 800, marginBottom: '8px'}}>Facebook</div>
            <div style={{
              background: '#1877F2',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginTop: '16px'
            }}>
              ربط الأكاونت
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}