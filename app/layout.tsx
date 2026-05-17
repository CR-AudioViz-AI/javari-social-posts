// app/layout.tsx — Javari Social Posts
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Javari Social | AI Social Post Generator',
  description: 'Generate viral social media posts with AI in seconds',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#0a0a0f', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(7,7,16,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <span style={{ fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Javari Social</span>
            <span style={{ color: '#374151', fontSize: 11, marginLeft: 4 }}>by CR AudioViz AI</span>
          </a>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="https://javariai.com" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}>Javari AI</a>
            <a href="https://craudiovizai.com/pricing" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none' }}>Pricing</a>
            <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: 'white', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get Started Free</a>
          </div>
        </nav>
        <div style={{ height: 58 }} />
        {children}
        <footer style={{ background: '#030308', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 24px', textAlign: 'center', color: '#1f2937', fontSize: 12 }}>
          <p style={{ margin: '0 0 8px' }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 | Fort Myers, Florida</p>
          <p style={{ margin: 0 }}>Your Story. Our Design. Everyone Connects. Everyone Wins. |{' '}
            <a href="https://craudiovizai.com/privacy" style={{ color: '#374151', textDecoration: 'none' }}>Privacy</a> ·{' '}
            <a href="https://craudiovizai.com/terms" style={{ color: '#374151', textDecoration: 'none' }}>Terms</a>
          </p>
        </footer>
      </body>
    </html>
  )
}
