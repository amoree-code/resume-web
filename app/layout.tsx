import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from './components/smooth-scroll';
import ParticleField from './components/particle-field';
import Cursor from './components/cursor';
import ScrollProgress from './components/scroll-progress';
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

const title = 'Ameer Abdulkareem Jabbar Lami — Front-end Developer';
const description =
  'Front-end-focused Full Stack Developer with 2 years of experience turning ideas and designs into clean, fast, dependable web products — from large-scale government dashboards to real-time SaaS used by hundreds of thousands.';

export const metadata: Metadata = {
  metadataBase: new URL('https://cv-ameer.vercel.app'),
  title,
  description,
  keywords: [
    'Ameer Abdulkareem Jabbar Lami',
    'Front-end Developer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Portfolio',
  ],
  authors: [{ name: 'Ameer Abdulkareem Jabbar Lami' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title,
    description,
    siteName: 'cv-ameer.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
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
        {/* set the saved / system theme before first paint so there is no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('portfolio-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full">
        <SmoothScroll />
        <ScrollProgress />
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
