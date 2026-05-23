// app/page.tsx — Javari Social Posts
// AI content for every social platform
// CR AudioViz AI · EIN 39-3646201 · May 2026
"use client";
import { useState } from "react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", emoji: "📸", tone: "visual, engaging, hashtag-heavy", maxLen: 2200 },
  { id: "linkedin",  label: "LinkedIn",  emoji: "💼", tone: "professional, thought-leadership", maxLen: 3000 },
  { id: "twitter",   label: "X / Twitter",emoji: "🐦", tone: "concise, punchy, under 280 chars", maxLen: 280 },
  { id: "facebook",  label: "Facebook",  emoji: "👥", tone: "community-focused, conversational",  maxLen: 63206 },
  { id: "tiktok",    label: "TikTok",    emoji: "🎵", tone: "trendy, casual, call-to-action heavy", maxLen: 2200 },
  { id: "threads",   label: "Threads",   emoji: "🧵", tone: "casual, authentic, conversational", maxLen: 500 },
];

const CATEGORIES = ["Product Launch","Behind the Scenes","Customer Story","Educational Tip","Company News","Event Promo","Engagement Question","Holiday/Seasonal"];

export default function SocialPostsHome() {
  const [platform, setPlatform] = useState("instagram");
  const [category, setCategory] = useState("Product Launch");
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pl = PLATFORMS.find(p => p.id === platform) || PLATFORMS[0];

  async function generate() {
    if (!topic.trim()) return;
    setLoading(true); setPosts([]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Write 3 different ${pl.label} posts for a ${category} about: "${topic}".

Platform tone: ${pl.tone}
Max length: ${pl.maxLen} chars

Format as:
POST 1:
[content]

POST 2:
[content]

POST 3:
[content]

Include relevant hashtags for ${pl.label} where appropriate.`
          }],
          stream: false,
          systemOverride: `You are an expert social media strategist with 10+ years managing brand accounts with millions of followers. Write engaging, platform-native content that drives real engagement. Never generic — always specific and compelling.`,
        }),
      });
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content || data?.content || "";
      // Split into 3 posts
      const parts = text.split(/POST \d:/i).filter((p: string) => p.trim());
      setPosts(parts.slice(0, 3));
    } catch { setPosts(["Error generating posts."]); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#040912", color:"#e2e8f0", fontFamily:"system-ui" }}>
      <nav style={{ background:"#1E3A5F", padding:"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:18 }}>📱</span>
          <span style={{ fontWeight:800, color:"#00B4D8", fontSize:15 }}>Social Posts</span>
          <span style={{ color:"#374151", fontSize:11 }}>· AI Content Generator</span>
        </div>
        <a href="https://craudiovizai.com/auth/signup" style={{ background:"#FF0800", color:"#fff", borderRadius:7, padding:"5px 14px", fontSize:12, fontWeight:700, textDecoration:"none" }}>Sign Up Free</a>
      </nav>

      <section style={{ background:"linear-gradient(135deg,#1E3A5F,#040912)", padding:"56px 24px 48px", textAlign:"center" }}>
        <div style={{ maxWidth:620, margin:"0 auto" }}>
          <h1 style={{ fontSize:"clamp(26px,4vw,46px)", fontWeight:900, color:"#fff", margin:"0 0 14px", lineHeight:1.05 }}>
            3 Posts. Every Platform.<br /><span style={{ color:"#00B4D8" }}>In Seconds.</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:15, lineHeight:1.65, margin:0 }}>
            Platform-native content that actually sounds like you. Not like a robot.
          </p>
        </div>
      </section>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"32px 20px 72px", display:"grid", gridTemplateColumns:"320px 1fr", gap:24 }}>
        {/* Controls */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 8px" }}>Platform</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => setPlatform(p.id)}
                  style={{ background: platform===p.id ? "rgba(0,180,216,0.2)" : "#0F1F32", border:`1px solid ${platform===p.id ? "rgba(0,180,216,0.4)" : "rgba(255,255,255,0.07)"}`, borderRadius:8, padding:"8px 10px", cursor:"pointer", fontFamily:"system-ui", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:16 }}>{p.emoji}</span>
                  <span style={{ fontSize:12, color: platform===p.id ? "#00B4D8" : "#9CA3AF", fontWeight:600 }}>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 8px" }}>Category</p>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ width:"100%", background:"#0F1F32", border:"1px solid rgba(0,180,216,0.15)", borderRadius:8, padding:"10px 12px", color:"#e2e8f0", fontSize:13, outline:"none", fontFamily:"system-ui" }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <p style={{ fontSize:11, fontWeight:700, color:"#6B7280", textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 8px" }}>Topic / Product</p>
            <textarea value={topic} onChange={e => setTopic(e.target.value)} rows={3}
              placeholder="Describe what you want to post about..."
              style={{ width:"100%", background:"#0F1F32", border:"1px solid rgba(0,180,216,0.15)", borderRadius:8, padding:"10px 12px", color:"#e2e8f0", fontSize:13, outline:"none", fontFamily:"system-ui", boxSizing:"border-box", resize:"vertical" }} />
          </div>

          <button onClick={generate} disabled={loading || !topic.trim()}
            style={{ background: loading || !topic.trim() ? "#0F1F32" : "linear-gradient(135deg,#1E3A5F,#00B4D8)", color: loading || !topic.trim() ? "#374151" : "#fff", border:"none", borderRadius:10, padding:"13px", fontSize:15, fontWeight:700, cursor: loading || !topic.trim() ? "not-allowed" : "pointer", fontFamily:"system-ui" }}>
            {loading ? "Generating..." : `✨ Generate ${pl.label} Posts`}
          </button>
        </div>

        {/* Posts output */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {posts.length === 0 && !loading && (
            <div style={{ background:"#0F1F32", border:"1px solid rgba(0,180,216,0.06)", borderRadius:14, padding:"48px 24px", textAlign:"center", color:"#374151" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>{pl.emoji}</div>
              <p style={{ fontSize:13 }}>Your {pl.label} posts will appear here</p>
            </div>
          )}
          {loading && (
            <div style={{ background:"#0F1F32", border:"1px solid rgba(0,180,216,0.1)", borderRadius:14, padding:"48px 24px", textAlign:"center", color:"#6B7280" }}>
              Writing {pl.label} posts...
            </div>
          )}
          {posts.map((post, i) => (
            <div key={i} style={{ background:"#0F1F32", border:"1px solid rgba(0,180,216,0.1)", borderRadius:14, padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#00B4D8" }}>{pl.emoji} Post {i+1}</span>
                <div style={{ display:"flex", gap:6 }}>
                  <span style={{ fontSize:11, color: post.trim().length > pl.maxLen ? "#FF0800" : "#374151" }}>
                    {post.trim().length}/{pl.maxLen}
                  </span>
                  <button onClick={() => navigator.clipboard?.writeText(post.trim())}
                    style={{ background:"transparent", color:"#6B7280", border:"1px solid rgba(255,255,255,0.08)", borderRadius:5, padding:"2px 8px", fontSize:11, cursor:"pointer", fontFamily:"system-ui" }}>Copy</button>
                </div>
              </div>
              <p style={{ margin:0, fontSize:13, color:"#e2e8f0", lineHeight:1.65, whiteSpace:"pre-wrap" }}>{post.trim()}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ borderTop:"1px solid rgba(0,180,216,0.08)", padding:"14px 24px", textAlign:"center" }}>
        <p style={{ color:"#374151", fontSize:11, margin:0 }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · <a href="https://craudiovizai.com/auth/signup" style={{ color:"#FF0800", textDecoration:"none", fontWeight:600 }}>Sign Up Free</a></p>
      </footer>
    </div>
  );
}