import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Social Post Generator | Javari AI',
  description: 'Create engaging social media content for all platforms with AI. Generate posts, captions, and hashtags instantly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
