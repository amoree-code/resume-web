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
          style={{
            width: 'min(88vw, calc(86vh * 1.75), 1420px)',
            aspectRatio: '1344 / 768',
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            animation: 'heroImageFloat 5s ease-in-out infinite alternate',
          }}
          className="hero-image-frame"
        >
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

          {/* chaotic scattered headline, no background boxes, straight on the photo */}
          <div
            data-enter
            data-enter-from="left"
            data-enter-rotate="-3"
            style={{
              position: 'absolute',
              top: '6%',
              left: '5%',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: '#fff',
              border: '1px solid rgba(255,255,255,.4)',
              borderRadius: 999,
              padding: '6px 14px',
              textShadow: TEXT_SHADOW,
              transform: 'rotate(-3deg)',
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
            style={{
              position: 'absolute',
              top: '16%',
              left: '7%',
              fontFamily: 'var(--font-merienda), cursive',
              fontWeight: 900,
              fontSize: 'clamp(22px, 4vw, 40px)',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-.5px',
              color: '#fff',
              textShadow: TEXT_SHADOW,
              transform: 'rotate(-2deg)',
            }}
          >
            Code by day
          </h1>

          <div
            data-enter
            data-enter-from="bottom"
            data-enter-rotate="3"
            style={{
              position: 'absolute',
              top: '32%',
              right: '6%',
              fontFamily: 'var(--font-merienda), cursive',
              fontWeight: 900,
              fontSize: 'clamp(22px, 4vw, 40px)',
              lineHeight: 1.05,
              color: 'var(--accent)',
              textShadow: TEXT_SHADOW,
              transform: 'rotate(3deg)',
              textAlign: 'right',
            }}
          >
            Ship by night
          </div>

          <p
            data-enter
            data-enter-from="left"
            data-enter-rotate="1"
            style={{
              position: 'absolute',
              bottom: '34%',
              left: '6%',
              maxWidth: 280,
              fontSize: 14,
              lineHeight: 1.7,
              color: '#fff',
              textShadow: TEXT_SHADOW,
              transform: 'rotate(1deg)',
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
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '6%',
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              transform: 'rotate(-1deg)',
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
            style={{ position: 'absolute', top: 16, right: 16 }}
          >
            <CvDownloadButton />
          </div>

          <nav
            aria-label="Social links"
            className="hero-social-nav"
            style={{
              position: 'absolute',
              inset: 'auto 0 0 0',
              padding: '0 20px 22px',
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
      </HeroEnter>
    </section>
  );
}
