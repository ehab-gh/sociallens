'use client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://sociallens-tawny.vercel.app/dashboard'
      }
    })
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

        <button
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'white',
            color: '#333',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontFamily: 'Tajawal, sans-serif'
          }}
        >
          <img src="https://www.google.com/favicon.ico" width="20" height="20" />
          سجل دخول بـ Google
        </button>
      </div>
    </div>
  )
}