import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '../components/theme-toggle';
import { getPortfolioData } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Design system — Ameer Abdulkareem Jabbar Lami',
  description: 'Tokens, type, motion and components behind the portfolio.',
  robots: { index: false, follow: false },
};

// Darkmatter (tweakcn) — see the note above :root in app/globals.css.
const COLORS = [
  { token: '--bg', dark: 'oklch(.18 .004 308)', light: 'oklch(.985 .002 264)', use: 'Page background' },
  { token: '--panel', dark: 'oklch(.215 .004 308)', light: 'oklch(1 0 0)', use: 'Cards, tags, resting buttons' },
  { token: '--border', dark: 'oklch(.295 0 0)', light: 'oklch(.908 .006 264)', use: 'Hairlines and outlines' },
  { token: '--fg', dark: 'oklch(.95 0 0)', light: 'oklch(.21 .032 265)', use: 'Headings and body' },
  { token: '--muted', dark: 'oklch(.81 0 0)', light: 'oklch(.44 .025 264)', use: 'Secondary text' },
  { token: '--faint', dark: 'oklch(.65 0 0)', light: 'oklch(.51 .023 264)', use: 'Meta: indices, dates' },
  { token: '--accent', dark: 'oklch(.72 .134 50)', light: 'oklch(.55 .137 45)', use: 'Actions and emphasis only' },
  { token: '--accent-2', dark: 'oklch(.68 .06 196)', light: 'oklch(.54 .04 196)', use: 'Second voice: gradients, rails' },
];

const PRINCIPLES = [
  ['Proof over adjectives', 'Numbers, stacks and live links do the selling. Every figure is one that was measured.'],
  ['One accent', 'Terracotta marks action and emphasis — never decoration, never large fills.'],
  ['Serif to speak, sans to read', 'Instrument Serif for headlines and the italic accent, Geist for prose, JetBrains Mono for data.'],
  ['Motion confirms', 'Every animation answers an action or a scroll position, and stops under reduced motion.'],
  ['Bilingual-ready', 'Logical properties everywhere, so an Arabic RTL version flips without rework.'],
];

const TYPE_SCALE = [
  { size: 'clamp 46–112', label: 'Hero · serif', font: 'var(--font-display)', weight: 400, text: 'I build the dashboards', fs: 'var(--text-h1)' },
  { size: 'clamp 37–64', label: 'Section · serif', font: 'var(--font-display)', weight: 400, text: 'Real scale, real users.', fs: 'var(--text-h2)' },
  { size: 'clamp 23–32', label: 'Sub-head · serif', font: 'var(--font-display)', weight: 400, text: 'Technical Support System', fs: 'var(--text-h3)' },
  { size: 'clamp 16–17', label: 'Body · Geist', font: 'var(--font-sans)', weight: 400, text: 'Front-end specialized, comfortable down to the database.', fs: 'var(--text-body)' },
  { size: 'clamp 11.5–12.5', label: 'Label · JetBrains Mono', font: 'var(--font-mono)', weight: 400, text: 'PRJ-01 · Sep 2025 – Present', fs: 'var(--text-xs)' },
];

const RADII = [
  { r: 6, use: 'Chip' },
  { r: 8, use: 'Tag' },
  { r: 10, use: 'Button' },
  { r: 18, use: 'Card' },
  { r: 999, use: 'Pill' },
];

const SPACING = [4, 8, 10, 14, 24, 30];

const label = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--faint)',
  textTransform: 'uppercase' as const,
  letterSpacing: '.08em',
};

const card = {
  border: '1px solid var(--border)',
  background: 'var(--panel)',
  borderRadius: 18,
  padding: 24,
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: '56px 0', borderTop: '1px solid var(--border)' }}>
      <h2
        className="section-title"
        style={{ marginBottom: 28 }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignPage() {
  const { stats, projects } = getPortfolioData();
  const sample = projects[0];

  return (
    <main className="container" style={{ paddingBlock: '32px 90px' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 48,
        }}
      >
        <Link href="/" className="navlink" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
          ← back to portfolio
        </Link>
        <ThemeToggle />
      </header>

      <p style={label}>Design system · v2 · theme: Darkmatter (tweakcn)</p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'var(--text-h1)',
          lineHeight: 0.95,
          margin: '10px 0 16px',
        }}
      >
        Built like the dashboards <em style={{ color: 'var(--accent)' }}>I ship.</em>
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--muted)', maxWidth: 620, margin: '0 0 24px' }}>
        The tokens, type, motion and components behind this portfolio. Toggle the theme to see both
        palettes. Source of truth: <code>app/globals.css</code> and <code>DESIGN.md</code>.
      </p>

      <Section id="principles" title="Principles">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {PRINCIPLES.map(([title, body], i) => (
            <div key={title} style={card}>
              <div style={{ ...label, color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '10px 0 6px' }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="color" title="Color">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
          {COLORS.map((c) => (
            <div key={c.token} style={{ ...card, padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 72, background: `var(${c.token})`, borderBottom: '1px solid var(--border)' }} />
              <div style={{ padding: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>{c.token}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', margin: '4px 0 8px' }}>
                  {c.dark} / {c.light}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.use}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" title="Typography">
        <div style={{ display: 'grid', gap: 0 }}>
          {TYPE_SCALE.map((t) => (
            <div
              key={t.label}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(110px, 160px) minmax(0, 1fr)',
                gap: 24,
                alignItems: 'baseline',
                padding: '18px 0',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div style={label}>
                {t.label}
                <br />
                {t.size}
              </div>
              <div style={{ fontFamily: t.font, fontWeight: t.weight, fontSize: t.fs, lineHeight: 1.05, overflowWrap: 'anywhere' }}>
                {t.text}
              </div>
            </div>
          ))}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(110px, 160px) minmax(0, 1fr)',
              gap: 24,
              alignItems: 'baseline',
              padding: '18px 0',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={label}>
              Italic accent
              <br />
              wrap in *stars*
            </div>
            <div className="section-title">
              Code by day — <em>ship by night.</em>
            </div>
          </div>
        </div>
      </Section>

      <Section id="space" title="Spacing & radius">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          <div style={card}>
            <div style={{ ...label, marginBottom: 16 }}>Spacing steps</div>
            {SPACING.map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', width: 28 }}>{s}</span>
                <span style={{ height: 10, width: s * 4, background: 'var(--accent)', borderRadius: 2 }} />
              </div>
            ))}
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '14px 0 0' }}>
              Container 1120px · gutter 24px · section 110px top.
            </p>
          </div>
          <div style={card}>
            <div style={{ ...label, marginBottom: 16 }}>Radius</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {RADII.map((r) => (
                <div key={r.r} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      border: '1.5px solid var(--accent)',
                      background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      borderRadius: Math.min(r.r, 28),
                    }}
                  />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', marginTop: 6 }}>
                    {r.r} · {r.use}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="motion" title="Motion">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {[
            ['Hover & tap', 'Spring { stiffness: 300, damping: 20 } · lift y −4 · tap scale .95'],
            ['Scroll reveal', 'GSAP power2.out, scrubbed from top 75% to top 35%'],
            ['Entrance', 'power3.out, 0.5–0.8s · Lenis smooth scroll'],
            ['Reduced motion', 'Final state set immediately — no transitions, no scrub'],
          ].map(([title, body]) => (
            <div key={title} style={card}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="components" title="Components">
        <div style={{ ...label, marginBottom: 14 }}>Buttons & badges</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <span className="btn btn-primary">View work →</span>
          <span className="btn btn-ghost">Get in touch</span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid var(--border)',
              borderRadius: 999,
              padding: '6px 14px',
              fontSize: 12,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840' }} />
            Available for work
          </span>
          <span
            style={{
              fontSize: 11,
              color: 'var(--accent)',
              border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
              borderRadius: 6,
              padding: '3px 8px',
            }}
          >
            SaaS
          </span>
          <span
            style={{
              fontSize: 11,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              borderRadius: 8,
              padding: '5px 10px',
            }}
          >
            WebSocket
          </span>
        </div>

        <div style={{ ...label, marginBottom: 14 }}>Stats</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 14,
            marginBottom: 36,
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={card}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 48, lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...label, marginBottom: 14 }}>Work card · narrow / wide (container query at 520px)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 16 }}>
          {[{ maxWidth: 380 }, { maxWidth: '100%' }].map((box, i) => (
            <article key={i} className="work-card" style={box}>
              <div className="work-card-inner">
                <div className="work-card-top">
                  <span className="work-chip mono">{sample.category}</span>
                  <span className="mono work-idx">{sample.idx}</span>
                </div>
                <div className="work-metric">
                  {sample.metric}
                  <span className="mono">{sample.metricLabel}</span>
                </div>
                <div className="work-body">
                  <h3 className="work-title">{sample.title}</h3>
                  <p className="work-desc">{sample.desc}</p>
                </div>
                <div className="work-foot">
                  {sample.tags.map((tag) => (
                    <span key={tag} className="work-tag mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
