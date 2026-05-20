// lib/config.ts — javari-social-posts
// Platform and tone config — exported as functions for SWC TSX compatibility
// CR AudioViz AI · May 2026

export function getPlatforms() {
  return [
    { id: 'linkedin_post',     label: 'LinkedIn Post',      hint: 'Professional tone, insights, thought leadership', color: '#0a66c2' },
    { id: 'twitter_thread',    label: 'Twitter/X Thread',   hint: 'Punchy hooks, max engagement, viral format', color: '#1d9bf0' },
    { id: 'instagram_caption', label: 'Instagram Caption',  hint: 'Visual storytelling, emojis, hashtags', color: '#e1306c' },
    { id: 'facebook_post',     label: 'Facebook Post',      hint: 'Community-focused, shareable, conversational', color: '#1877f2' },
    { id: 'content_calendar',  label: 'Content Calendar',   hint: '30-day content plan for any topic or niche', color: '#7c3aed' },
  ]
}

export function getTones() {
  return ['Professional', 'Casual', 'Inspirational', 'Educational', 'Humorous', 'Urgent']
}

export function getLengths() {
  return [
    { id: 'short',  label: 'Short',  desc: '1-2 paragraphs' },
    { id: 'medium', label: 'Medium', desc: '3-4 paragraphs' },
    { id: 'long',   label: 'Long',   desc: 'Full post or thread' },
  ]
}
