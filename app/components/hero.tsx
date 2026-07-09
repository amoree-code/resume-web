import HeroEnter from './hero-enter';
import CvDownloadButton from './cv-download-button';
import Image from 'next/image';
import { CONTACT_LINKS } from '@/lib/contact';

const HERO_LINKS = CONTACT_LINKS.filter((l) => l.label !== 'Phone');

const TEXT_SHADOW = '0 2px 6px rgba(0,0,0,.85), 0 6px 26px rgba(0,0,0,.65)';

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 24px 32px',
        minHeight: '80vh',
      }}
    >
      <HeroEnter>
        <div
          data-enter-image
          className="hero-image-frame"
        >
          <div className="hero-photo">
            <Image
              src="/gaming-room.jpg"
              alt="Moody, red-lit gaming setup at night"
              width={1344}
              height={768}
              priority
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* dark scrim for legibility, keeps the photo's own blacks intact */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(8,6,12,.32)',
              }}
            />
          </div>

          <div className="hero-content">
          {/* chaotic scattered headline on desktop; stacks in normal flow on mobile */}
          <div
            data-enter
            data-enter-from="left"
            data-enter-rotate="-3"
            className="hero-el hero-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: '#fff',
              border: '1px solid rgba(255,255,255,.4)',
              borderRadius: 999,
              padding: '6px 14px',
              textShadow: TEXT_SHADOW,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#28c840',
              }}
            />
            Available for work
          </div>

          <h1
            data-enter
            data-enter-from="top"
            data-enter-rotate="-2"
            className="hero-el hero-title-1"
            style={{
              fontFamily: 'var(--font-merienda), cursive',
              fontWeight: 900,
              fontSize: 'clamp(22px, 4vw, 40px)',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-.5px',
              color: '#fff',
              textShadow: TEXT_SHADOW,
            }}
          >
            Code by day
          </h1>

          <div
            data-enter
            data-enter-from="bottom"
            data-enter-rotate="3"
            className="hero-el hero-title-2"
            style={{
              fontFamily: 'var(--font-merienda), cursive',
              fontWeight: 900,
              fontSize: 'clamp(22px, 4vw, 40px)',
              lineHeight: 1.05,
              color: 'var(--accent)',
              textShadow: TEXT_SHADOW,
            }}
          >
            Ship by night
          </div>

          <p
            data-enter
            data-enter-from="left"
            data-enter-rotate="1"
            className="hero-el hero-desc"
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: '#fff',
              textShadow: TEXT_SHADOW,
              margin: 0,
            }}
          >
            Amir Abdulkarim Jabbar. Front-end-focused Full Stack Developer
            turning ideas into clean, fast, dependable web products.
          </p>

          <div
            data-enter
            data-enter-from="scale"
            data-enter-rotate="-1"
            className="hero-el hero-ctas"
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#work"
              style={{
                background: 'color-mix(in srgb, var(--accent) 80%, black)',
                color: '#fff',
                padding: '13px 24px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              View work →
            </a>
            <a
              href="#contact"
              style={{
                border: '1px solid rgba(255,255,255,.4)',
                color: '#fff',
                padding: '13px 24px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                textShadow: TEXT_SHADOW,
              }}
            >
              Get in touch
            </a>
          </div>

          <div
            data-enter
            data-enter-from="right"
            className="hero-el hero-cv"
          >
            <CvDownloadButton />
          </div>

          <nav
            aria-label="Social links"
            className="hero-el hero-social-nav"
            style={{
              display: 'flex',
              gap: 14,
            }}
          >
            {HERO_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,.3)',
                  background: 'rgba(255,255,255,.06)',
                  backdropFilter: 'blur(6px)',
                  color: '#fff',
                  transition:
                    'box-shadow .2s, border-color .2s, color .2s, transform .2s',
                }}
                className="hero-social-btn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={link.iconPath} />
                </svg>
              </a>
            ))}
          </nav>
          </div>
        </div>
      </HeroEnter>
    </section>
  );
}
