import HeroEnter from './hero-enter';
import SplitReveal from './split-reveal';
import CountUp from './count-up';
import CvDownloadButton from './cv-download-button';
import { CONTACT_LINKS } from '@/lib/contact';
import type { Stat } from '@/lib/portfolio';

const HERO_LINKS = CONTACT_LINKS.filter((l) => l.label !== 'Phone');

export default function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section id="top" className="hero">
      <div className="hero-aurora" aria-hidden="true">
        <span />
        <span />
      </div>

      <HeroEnter className="container hero-inner">
        <p data-enter className="hero-badge mono">
          <span className="hero-badge-dot" />
          Available for work · Baghdad, Iraq
        </p>

        <SplitReveal
          as="h1"
          trigger="mount"
          delay={0.1}
          className="hero-title"
          text="I build the dashboards *governments run on.*"
        />

        <p data-enter className="lead hero-lead">
          Ameer Abdulkareem Jabbar Lami — front-end specialized full-stack
          developer. Two years shipping React and Next.js products in English
          and Arabic, from 1.5M-record ministry systems to real-time SaaS chat.
        </p>

        <div data-enter className="hero-actions">
          <a href="#work" className="btn btn-primary">
            View work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <CvDownloadButton />
          <nav aria-label="Social links" className="hero-social">
            {HERO_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="hero-social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={link.iconPath} />
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <dl data-enter className="hero-stats">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat">
              <dt className="mono">{s.label}</dt>
              <dd>
                <CountUp value={s.num} />
              </dd>
            </div>
          ))}
        </dl>

        <p data-enter className="hero-sign">
          Code by day — <em>ship by night.</em>
        </p>
      </HeroEnter>
    </section>
  );
}
