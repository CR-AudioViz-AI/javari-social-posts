'use client'
import { useState, useRef } from 'react'
import { getPlatforms, getTones } from '@/lib/config'

export default function SocialPostsPage() {
  const platforms = getPlatforms()
  const tones = getTones()
  const [platformId, setPlatformId] = useState(platforms[0].id)
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('Professional')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function generate() {
    const plat = platforms.find(p => p.id === platformId)
    if (!input.trim() || !plat) return
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: platformId, input: input.trim(), tone }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
    } catch (e) { setError(e.message || 'Something went wrong') }
    setLoading(false)
  }

  return (
    <div style={{ background: '#07080f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(7,8,15,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(139,92,246,0.15)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>📱</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#a78bfa' }}>Javari Social</span>
        </a>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Free Access</a>
      </nav>
      <div style={{ height: 60 }} />
      <section style={{ textAlign: 'center', padding: '44px 24px 28px', maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.03em' }}>AI <span style={{ color: '#a78bfa' }}>Social Content</span> Generator</h1>
        <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>Write LinkedIn posts, Twitter threads, Instagram captions, and more in seconds. <strong style={{ color: '#a78bfa' }}>Real AI. Free to start.</strong></p>
      </section>
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 20 }}>
        <div>
          <div style={{ background: '#100e1e', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
            {platforms.map(p => (
              <button key={p.id} onClick={() => { setPlatformId(p.id); setOutput('') }}
                style={{ width: '100%', textAlign: 'left', padding: '11px 16px', background: platformId === p.id ? 'rgba(139,92,246,0.1)' : 'transparent', borderLeft: platformId === p.id ? '3px solid #a78bfa' : '3px solid transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(139,92,246,0.06)', display: 'block' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: platformId === p.id ? '#c4b5fd' : '#9ca3af' }}>{p.label}</div>
                <div style={{ fontSize: 11, color: '#374151', marginTop: 2 }}>{p.hint}</div>
              </button>
            ))}
          </div>
          <div style={{ background: '#100e1e', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 14, padding: '16px' }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Topic or Brief</label>
              <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={'What do you want to post about? Be specific: product launch, tip, story, announcement...'} rows={4}
                style={{ width: '100%', background: '#07080f', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Tone</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {tones.map(t => (
                  <button key={t} onClick={() => setTone(t)}
                    style={{ padding: '5px 12px', borderRadius: 20, border: '1px solid', fontSize: 12, cursor: 'pointer', fontWeight: 500,
                      borderColor: tone === t ? '#a78bfa' : 'rgba(139,92,246,0.2)',
                      background: tone === t ? 'rgba(139,92,246,0.15)' : 'transparent',
                      color: tone === t ? '#c4b5fd' : '#6b7280' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={generate} disabled={loading || !input.trim()}
              style={{ width: '100%', background: loading ? '#1a1428' : 'linear-gradient(135deg,#7c3aed,#5b21b6)', color: loading ? '#374151' : 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', marginTop: 4 }}>
              {loading ? 'Writing...' : 'Write ' + (platforms.find(p => p.id === platformId) ? platforms.find(p => p.id === platformId).label + ' Post' : 'Post')}
            </button>
            {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>⚠ {error}</p>}
          </div>
        </div>
        <div style={{ background: '#100e1e', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Generated Post</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: copied ? '#a78bfa' : '#6b7280', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          {output ? (
            <textarea value={output} readOnly style={{ width: '100%', background: 'transparent', border: 'none', padding: '18px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 400, boxSizing: 'border-box', outline: 'none' }} />
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{loading ? '✍️' : '📱'}</div>
              <p style={{ color: '#1c1830', fontSize: 13, lineHeight: 1.7 }}>{loading ? 'Writing your post...' : 'Enter a topic on the left and click Write Post.
Real AI generation — no templates.'}</p>
            </div>
          )}
        </div>
      </section>
      <footer style={{ background: '#050609', borderTop: '1px solid rgba(139,92,246,0.07)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ color: '#100e1e', fontSize: 11, margin: 0 }}>2026 CR AudioViz AI LLC - EIN 39-3646201 - Fort Myers Florida - Your Story. Our Design.</p>
      </footer>
    </div>
  )
}
