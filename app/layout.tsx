import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import SmoothScroll from "./components/smooth-scroll";
import ParticleField from "./components/particle-field";
import Cursor from "./components/cursor";
import "./globals.css";

const merienda = Merienda({
  variable: "--font-merienda",
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

const title = "Amir Abdulkarim Jabbar — Front-end Developer";
const description =
  "Front-end-focused Full Stack Developer with 3 years of experience turning ideas and designs into clean, fast, dependable web products — from large-scale government dashboards to real-time SaaS used by hundreds of thousands.";

export const metadata: Metadata = {
  metadataBase: new URL("https://amir.dev"),
  title,
  description,
  keywords: [
    "Amir Abdulkarim Jabbar",
    "Front-end Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Amir Abdulkarim Jabbar" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "amir.dev",
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en" className={`${merienda.variable}`}>
      <body className="min-h-full">
        <SmoothScroll />
        <Cursor />
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
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
