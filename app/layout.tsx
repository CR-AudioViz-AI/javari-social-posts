// app/layout.tsx — Javari Social Posts — CR AudioViz AI
// Updated: 2026-03-15
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata: Metadata = {
  title: 'Javari Social Posts | CR AudioViz AI',
  description: 'AI Social Media Post Generator — Create viral content instantly',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
      <body className="min-h-screen bg-gray-50">
        {children}
        <Script src="https://javariai.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
