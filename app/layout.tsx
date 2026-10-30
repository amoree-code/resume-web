import type { Metadata } from 'next';
import { Geist, Geist_Mono, Merienda } from 'next/font/google';
import SmoothScroll from './components/smooth-scroll';
import ParticleField from './components/particle-field';
import Cursor from './components/cursor';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Script face is reserved for the hero signature lines only.
const merienda = Merienda({
  variable: '--font-merienda',
  weight: ['900'],
  subsets: ['latin'],
});

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
      className={`${geist.variable} ${geistMono.variable} ${merienda.variable}`}
    >
      <body className="min-h-full">
        <SmoothScroll />
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
