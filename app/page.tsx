'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles, Wand2, Copy, Hash, Image, Calendar, TrendingUp, Zap, Target, MessageSquare, ChevronRight, Menu, X } from 'lucide-react';

const PLATFORMS = [
  { name: 'Twitter/X', icon: '𝕏', color: 'from-gray-700 to-black', chars: '280' },
  { name: 'Instagram', icon: '📸', color: 'from-purple-500 to-pink-500', chars: '2,200' },
  { name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800', chars: '3,000' },
  { name: 'Facebook', icon: '👍', color: 'from-blue-500 to-blue-700', chars: '63,206' },
  { name: 'TikTok', icon: '🎵', color: 'from-pink-500 to-cyan-500', chars: '2,200' },
  { name: 'Threads', icon: '🧵', color: 'from-gray-800 to-black', chars: '500' },
];

const CONTENT_TYPES = [
  { name: 'Promotional', icon: '📢', desc: 'Product launches, sales, announcements' },
  { name: 'Educational', icon: '📚', desc: 'Tips, how-tos, tutorials' },
  { name: 'Engaging', icon: '💬', desc: 'Questions, polls, discussions' },
  { name: 'Storytelling', icon: '📖', desc: 'Behind-the-scenes, journeys' },
  { name: 'Trending', icon: '🔥', desc: 'Current events, viral topics' },
  { name: 'Inspirational', icon: '✨', desc: 'Quotes, motivation, success' },
];

const FEATURES = [
  { icon: Wand2, title: 'AI-Generated Content', description: 'Describe your message and get platform-optimized posts instantly.', color: 'from-purple-500 to-pink-600' },
  { icon: Hash, title: 'Smart Hashtags', description: 'AI suggests trending, relevant hashtags to maximize reach.', color: 'from-blue-500 to-cyan-600' },
  { icon: Image, title: 'Image Suggestions', description: 'Get AI recommendations for visuals that complement your post.', color: 'from-green-500 to-emerald-600' },
  { icon: Calendar, title: 'Best Time to Post', description: 'AI analyzes your audience to suggest optimal posting times.', color: 'from-amber-500 to-orange-600' },
  { icon: TrendingUp, title: 'Trend Integration', description: 'Automatically incorporate trending topics and formats.', color: 'from-red-500 to-rose-600' },
  { icon: Copy, title: 'Multi-Platform Export', description: 'Generate variants optimized for each platform at once.', color: 'from-indigo-500 to-purple-600' },
];

const STATS = [
  { value: '100K+', label: 'Posts Generated' },
  { value: '6', label: 'Platforms' },
  { value: '< 30s', label: 'Per Post' },
  { value: '1 credit', label: 'Per Post' },
];

export default function SocialPostGeneratorPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('Twitter/X');
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">Social Post Generator</span>
                <span className="text-pink-400 text-xs block -mt-1">by Javari AI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#platforms" className="text-gray-300 hover:text-white">Platforms</a>
              <a href="#features" className="text-gray-300 hover:text-white">Features</a>
              <a href="/create" className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg">Create Post</a>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-300">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm text-pink-300 mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Social Content</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Create Viral Content
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">For Every Platform</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Generate engaging posts, captions, and hashtags optimized for each social platform. AI does the creative work.
          </motion.p>

          {/* Platform Selector */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 mb-8">
            {PLATFORMS.map((p) => (
              <button key={p.name} onClick={() => setSelectedPlatform(p.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedPlatform === p.name ? 'bg-white text-gray-900' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                {p.icon} {p.name}
              </button>
            ))}
          </motion.div>

          {/* Prompt Input */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What do you want to post about? e.g., 'Announcing our new product launch with a special 20% discount'"
                rows={3}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 resize-none"
              />
              <button className="absolute right-3 bottom-3 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Generate
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">1 credit per post • Includes hashtags & best time suggestions</p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Types */}
      <section id="platforms" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Content for Every Purpose</h2>
            <p className="text-gray-400">Select your content type for optimized results</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CONTENT_TYPES.map((type, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:border-pink-500/50 transition cursor-pointer group">
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="font-medium text-white group-hover:text-pink-400 transition">{type.name}</div>
                <div className="text-xs text-gray-500">{type.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Social Content</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">AI that understands each platform's unique requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-pink-500/50 transition-all">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Go Viral?</h2>
          <p className="text-xl text-gray-400 mb-8">Create scroll-stopping content in seconds.</p>
          <a href="/create" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl">
            Start Creating <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-6 h-6 text-pink-400" />
              <span className="text-white font-semibold">Social Post Generator</span>
              <span className="text-gray-500">by CR AudioViz AI</span>
            </div>
            <div className="text-sm text-gray-400">© {new Date().getFullYear()} CR AudioViz AI, LLC.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
