// app/layout.tsx — Javari Social
// Fortune 50 quality — uses AppShell for full ecosystem integration
// May 17, 2026 — CR AudioViz AI, LLC
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Javari Social | Javari by CR AudioViz AI',
  description: 'AI social post generator',
  keywords: 'Javari Social, Javari, AI, CR AudioViz AI',
}

import AppShell from '@/components/AppShell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <AppShell
          appName="Javari Social"
          appColor="#ec4899"
          appEmoji="📱"
          appDesc="AI social post generator"
      handoffApp="Javari Email"
      handoffUrl="https://javari-email-templates.vercel.app"
      handoffPitch="Social done? Complete your campaign with email →"
        >
          {children}
        </AppShell>
      </body>
    </html>
  )
}
