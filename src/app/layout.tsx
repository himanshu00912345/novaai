import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NovaAI — An AI Workspace Concept',
    template: '%s | NovaAI',
  },
  description:
    'Explore a polished front-end concept for an AI workspace, with interactive product previews and a procedural 3D hero.',
  keywords: [
    'AI SaaS',
    'AI workspace concept',
    'Next.js 14',
    'Three.js',
    'React Three Fiber',
    'Tailwind CSS',
    'Web Development Portfolio',
  ],
  authors: [{ name: 'NovaAI Portfolio Concept' }],
  icons: { icon: '/icons/icon.svg', shortcut: '/icons/icon.svg' },
  openGraph: {
    title: 'NovaAI — An AI Workspace Concept',
    description: 'A front-end concept for an AI workspace, built with Next.js, Tailwind CSS and Three.js.',
    siteName: 'NovaAI',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
