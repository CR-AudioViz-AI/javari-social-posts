// lib/config.ts — javari-social-posts
// Platform and content configuration — extracted to .ts to avoid SWC TSX parse issues
// CR AudioViz AI · May 2026

export const PLATFORMS = [
  { id: 'linkedin_post',     label: 'LinkedIn',         icon: 'LI', color: '#0a66c2', hint: 'Professional tone, insights, thought leadership' },
  { id: 'twitter_thread',    label: 'Twitter / X',      icon: 'X',  color: '#1d9bf0', hint: 'Punchy threads, hooks, max engagement' },
  { id: 'instagram_caption', label: 'Instagram',        icon: 'IG', color: '#e1306c', hint: 'Visual storytelling, emojis, hashtags' },
  { id: 'facebook_post',     label: 'Facebook',         icon: 'FB', color: '#1877f2', hint: 'Community-focused, shareable, conversational' },
  { id: 'content_calendar',  label: 'Content Calendar', icon: 'CC', color: '#7c3aed', hint: '30-day content plan for any topic' },
]

export const TONES = ['Professional', 'Casual', 'Inspirational', 'Educational', 'Humorous', 'Urgent']

export const LENGTHS = [
  { id: 'short',  label: 'Short',  desc: '1-2 paragraphs' },
  { id: 'medium', label: 'Medium', desc: '3-4 paragraphs' },
  { id: 'long',   label: 'Long',   desc: 'Full post / thread' },
]
