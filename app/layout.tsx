import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from './components/smooth-scroll';
import ParticleField from './components/particle-field';
import Cursor from './components/cursor';
import ScrollProgress from './components/scroll-progress';
import Magnetic from './components/magnetic';
import { PERSON, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

// Display face: headings and the italic accent words.
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a181b',
};

// Search-console ownership tokens come from the environment (set in Vercel), never the repo.
const verification: Metadata['verification'] = {
  google: process.env.GOOGLE_SITE_VERIFICATION,
  other: process.env.BING_SITE_VERIFICATION
    ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
    : undefined,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: PERSON.name,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: PERSON.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  verification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* before first paint: mark JS on (for entrance guards) and apply the saved / system theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{var t=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full">
        <SmoothScroll />
        <ScrollProgress />
        <Magnetic />
        <Cursor />
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
          }}
        >
          <ParticleField />
        </div>
        {children}
      </body>
    </html>
  );
}
