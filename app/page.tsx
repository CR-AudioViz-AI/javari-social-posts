'use client'
import { useState, useRef } from 'react'
import { PLATFORMS, TONES, LENGTHS } from '@/lib/config'

export default function SocialPostsPage() {
  const [platform, setPlatform] = useState(PLATFORMS[0])
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('Professional')
  const [length, setLength] = useState('medium')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])

  async function generate() {
    if (!input.trim()) { setError('Describe what you want to post about'); return }
    setLoading(true); setError(''); setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: platform.id,
          input: input.trim(),
          tone,
          length,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      const result = data.result || ''
      setOutput(result)
      const entry = { platform: platform.label, icon: platform.icon, input: input.slice(0, 60), output: result, ts: new Date().toLocaleTimeString() }
      setHistory(prev => [entry, ...prev.slice(0, 9)])
    } catch (e) { setError(e.message || 'Something went wrong') }
    setLoading(false)
  }

  function copy() {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: '#07080f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(7,8,15,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(139,92,246,0.15)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 20 }}>✨</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#a78bfa' }}>Javari Social Posts</span>
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="https://javariai.com" style={{ color: '#4b5563', fontSize: 13, textDecoration: 'none', padding: '6px 12px' }}>Javari AI</a>
          <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Free Access</a>
        </div>
      </nav>
      <div style={{ height: 60 }} />

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '44px 24px 28px', maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.03em' }}>
          AI Social Posts <span style={{ color: '#a78bfa' }}>That Convert</span>
        </h1>
        <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
          LinkedIn, Twitter/X, Instagram, Facebook — platform-optimized content in seconds.
          <strong style={{ color: '#a78bfa' }}> 2 credits per post.</strong>
        </p>
      </section>

      {/* PLATFORM SELECTOR */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
          {PLATFORMS.map(p => (
            <button key={p.id} onClick={() => { setPlatform(p); setOutput('') }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 10, border: platform.id === p.id ? `2px solid ${p.color}` : '2px solid rgba(255,255,255,0.06)', background: platform.id === p.id ? `${p.color}20` : 'rgba(255,255,255,0.03)', cursor: 'pointer', color: platform.id === p.id ? '#e2e8f0' : '#6b7280', fontWeight: 600, fontSize: 13, transition: 'all 0.15s' }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 20 }}>
          {/* LEFT: Input panel */}
          <div>
            <div style={{ background: '#0f111a', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 14, padding: '20px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>What do you want to post about?</div>

              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={platform.hint}
                rows={5}
                style={{ width: '100%', background: '#07080f', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10, padding: '12px 14px', color: '#e2e8f0', fontSize: 14, resize: 'vertical', boxSizing: 'border-box', outline: 'none', lineHeight: 1.6 }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Tone</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {TONES.map(t => (
                      <button key={t} onClick={() => setTone(t)}
                        style={{ padding: '4px 10px', borderRadius: 6, border: tone === t ? '1px solid #a78bfa' : '1px solid rgba(255,255,255,0.08)', background: tone === t ? 'rgba(167,139,250,0.15)' : 'transparent', color: tone === t ? '#c4b5fd' : '#6b7280', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Length</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {LENGTHS.map(l => (
                      <button key={l.id} onClick={() => setLength(l.id)}
                        style={{ textAlign: 'left', padding: '6px 10px', borderRadius: 6, border: length === l.id ? '1px solid #a78bfa' : '1px solid rgba(255,255,255,0.08)', background: length === l.id ? 'rgba(167,139,250,0.15)' : 'transparent', color: length === l.id ? '#c4b5fd' : '#6b7280', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
                        <span style={{ fontWeight: 700 }}>{l.label}</span> — {l.desc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={generate} disabled={loading || !input.trim()}
                style={{ width: '100%', marginTop: 16, background: loading || !input.trim() ? '#1a1428' : 'linear-gradient(135deg,#7c3aed,#5b21b6)', color: loading || !input.trim() ? '#374151' : 'white', border: 'none', borderRadius: 10, padding: '13px', fontSize: 15, fontWeight: 700, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer' }}>
                {loading ? '✨ Writing...' : `Generate ${platform.label} Post`}
              </button>
              {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>⚠ {error}</p>}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div style={{ background: '#0f111a', border: '1px solid rgba(139,92,246,0.08)', borderRadius: 14, padding: '16px', marginTop: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Recent Generations</div>
                {history.slice(0, 5).map((h, i) => (
                  <button key={i} onClick={() => setOutput(h.output)}
                    style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', marginBottom: 6, cursor: 'pointer', display: 'block' }}>
                    <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>{h.icon} {h.platform} · {h.ts}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.input}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Output */}
          <div style={{ background: '#0f111a', border: '1px solid rgba(139,92,246,0.12)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80, alignSelf: 'start' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(139,92,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{platform.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{platform.label} Post</span>
              </div>
              {output && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={copy}
                    style={{ background: copied ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(139,92,246,0.2)', color: copied ? '#a78bfa' : '#6b7280', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                  <button onClick={() => { setInput(''); setOutput('') }}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#4b5563', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
                    Clear
                  </button>
                </div>
              )}
            </div>
            {output ? (
              <textarea value={output} readOnly
                style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 480, boxSizing: 'border-box', outline: 'none' }} />
            ) : (
              <div style={{ padding: '80px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.4 }}>{loading ? '✨' : platform.icon}</div>
                <p style={{ color: '#1f2937', fontSize: 14, lineHeight: 1.7 }}>
                  {loading
                    ? 'Writing your ' + platform.label + ' post...'
                    : 'Describe your topic and click Generate.
AI will write platform-optimized content instantly.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer style={{ background: '#050609', borderTop: '1px solid rgba(139,92,246,0.07)', padding: '20px 24px', textAlign: 'center', marginTop: 40 }}>
        <p style={{ color: '#0f111a', fontSize: 11, margin: 0 }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida · Your Story. Our Design. Everyone Connects. Everyone Wins.</p>
      </footer>
    </div>
  )
}
