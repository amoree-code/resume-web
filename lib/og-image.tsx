import { ImageResponse } from 'next/og';
import { PERSON, SITE_URL } from '@/lib/site';

// Shared 1200×630 social card for Open Graph and Twitter/X. Colors are the
// Darkmatter tokens from globals.css, converted to hex for the image renderer.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${PERSON.name} — ${PERSON.jobTitle}, ${PERSON.city}, ${PERSON.country}`;

const BG = '#1a181b';
const FG = '#f2f2f2';
const MUTED = '#c4c4c4';
const ACCENT = '#e08a52';

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: BG,
          color: FG,
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: MUTED, letterSpacing: 2 }}>
          {`${PERSON.city.toUpperCase()}, ${PERSON.country.toUpperCase()}`}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            {PERSON.name}
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: ACCENT }}>{PERSON.jobTitle}</div>
          <div style={{ display: 'flex', fontSize: 30, color: MUTED }}>
            React · Next.js · TypeScript · Node.js
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: MUTED }}>
          {SITE_URL.replace('https://', '')}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
