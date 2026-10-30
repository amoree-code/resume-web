# Design system

The rules this portfolio is built on. The live, rendered version is the `/design` route
(`app/design/page.tsx`); tokens live on `:root` in `app/globals.css`. Change a token there, not inline.

## Principles

1. **Proof over adjectives.** Numbers, stacks and live links sell the work. Every figure on the
   site must be one he actually measured.
2. **One accent, one second voice.** Orange (`--accent`) marks action and emphasis; teal
   (`--accent-2`) only appears in gradients and rails beside it. Never large fills.
3. **Serif to speak, sans to read, mono for data.** Instrument Serif for headlines and the italic
   accent word, Geist for prose, JetBrains Mono for labels, indices, tags and code.
4. **Motion confirms, never decorates.** Every animation answers a load, a scroll position or a
   pointer, and all of it stops under `prefers-reduced-motion`.
5. **Fluid first, breakpoints by exception.** Sizes come from `clamp()` tokens; media queries are
   mobile-first (`min-width`) and only change structure.
6. **Bilingual-ready.** Logical properties (`padding-inline`, `margin-inline-start`) so an Arabic
   RTL version flips without rework.

## Theme — Darkmatter (tweakcn)

Source: `https://tweakcn.com/r/themes/darkmatter.json`. `--bg`, `--accent`, `--accent-2`, and the
two foreground greys are the theme's own values. Adapted: `--panel` lifted a step off `--bg` so
cards read as cards, `--fg` brightened for headings, and the light accent darkened (L .67 → .55)
so accent text passes 4.5:1 on white.

| Token        | Dark                   | Light                  | Use                              |
| ------------ | ---------------------- | ---------------------- | -------------------------------- |
| `--bg`       | `oklch(.18 .004 308)`  | `oklch(.985 .002 264)` | page background                  |
| `--panel`    | `oklch(.215 .004 308)` | `oklch(1 0 0)`         | cards, tags, resting buttons     |
| `--border`   | `oklch(.295 0 0)`      | `oklch(.908 .006 264)` | hairlines, outlines              |
| `--fg`       | `oklch(.95 0 0)`       | `oklch(.21 .032 265)`  | headings and body                |
| `--muted`    | `oklch(.81 0 0)`       | `oklch(.44 .025 264)`  | secondary text                   |
| `--faint`    | `oklch(.65 0 0)`       | `oklch(.51 .023 264)`  | meta: indices, dates, footer     |
| `--accent`   | `oklch(.72 .134 50)`   | `oklch(.55 .137 45)`   | actions, links, active state     |
| `--accent-fg`| `--bg` (dark)          | white                  | text on accent — never `#fff` on the dark accent |
| `--accent-2` | `oklch(.68 .06 196)`   | `oklch(.54 .04 196)`   | gradients, rails                 |

Tints: `color-mix(in oklch, var(--accent) N%, transparent)` — never a new value. `--glow` is the
pre-mixed accent haze for shadows and the card spotlight.

## Typography

| Token            | Face             | Use                                        |
| ---------------- | ---------------- | ------------------------------------------ |
| `--font-display` | Instrument Serif | h1–h3, stat numbers, service numbers, marquee |
| `--font-sans`    | Geist            | body copy, buttons                         |
| `--font-mono`    | JetBrains Mono   | nav, eyebrows, tags, dates, code           |

Fluid scale (320 → 1280px): `--text-xs` 11.5–12.5 · `--text-sm` 13.5–14.5 · `--text-body`
15.7–17 · `--text-lg` 17.6–20.8 · `--text-h3` 23–32 · `--text-h2` 37–64 · `--text-h1` 46–112.
Headings are weight 400 (the serif's only weight); emphasis comes from the italic accent, not
bold. In a `SplitReveal` title, wrap the accent words in `*stars*`.

## Layout and responsive

- `.container`: `max-width: 1180px`, `padding-inline: var(--gutter)` (16 → 32px).
- `.section`: `padding-block: var(--section-y)` (64 → 128px).
- Breakpoints (mobile-first, structural only): **640** hero buttons stop stretching · **720**
  tool groups go three-column · **768** experience rail moves to the centre, services widen ·
  **900** hero stats go 2×2 → 4 across · **960** desktop nav replaces the menu button ·
  **1440** section indicator appears.
- Section order (nav, eyebrows and side indicator agree): 01 About → Stack → 02 Experience →
  03 Work → 04 Education → 05 Contact.
- Work cards use a **container query**: at ≥520px of card width the metric sits beside the copy.
- Tap targets ≥ 44px; heights use `svh` with a `vh` fallback; overflow clipping uses `clip`, never
  `hidden`, on anything that wraps the sticky header.

## Radius

`--radius` .75rem — buttons, menu button, theme toggle · ×1.6 — work cards · ×2 — contact card ·
6–8px — chips and tags · 999px — pills, filter bar, badge.

## Motion

| Pattern            | Where                         | How                                              |
| ------------------ | ----------------------------- | ------------------------------------------------ |
| Split-word reveal  | hero h1, every section title  | `SplitReveal` — words rise from a clip, `power4.out`, 0.06s stagger |
| Blur-up entrance   | hero badge, lead, actions     | `HeroEnter` — opacity + y + blur, 0.12s stagger  |
| Count-up           | hero stats                    | `CountUp` — 1.6s ease-out when in view, once     |
| Aurora             | hero background               | two blurred orbs drifting on 14s / 18s loops     |
| Scroll progress    | top of viewport               | `ScrollProgress` — spring-smoothed `scaleX`      |
| Card spotlight     | work cards                    | pointer-tracked radial glow via `--mx` / `--my`  |
| Filter pill        | work filters                  | Framer `layoutId` slide; cards re-flow with `layout` |
| Scrubbed rows      | services, experience rail     | GSAP ScrollTrigger scrub                         |
| Hover lift         | buttons, chips, socials       | `translateY(-2…-3px)`, spring `{300, 20}`        |
| Press feedback     | buttons, filters, menu        | `scale: .97` on `:active`, 120ms ease-out        |
| Magnetic pull      | primary CTAs, socials         | `[data-magnetic]` → `--mag-x/y` on `translate`, max 10px |
| CEFR fill          | Education · spoken languages  | segments fill left→right, 90ms stagger, on view  |
| Rule draw          | Education card                | gradient rule `scaleX` 0→1 on view               |

Curves: `--ease-out` `cubic-bezier(.23,1,.32,1)` for entrances, `--ease-in-out`
`cubic-bezier(.77,0,.175,1)` for on-screen movement — never `ease-in` on UI.
First paint: the head script sets `html.js`; under `prefers-reduced-motion: no-preference`,
`[data-enter]` and split words start hidden so nothing flashes before its entrance.

Reduced motion: GSAP effects return early, Framer variants are disabled, CSS animations are cut
to 0.01ms, the aurora and marquee stop.

## Content rules

- Name: **Ameer Abdulkareem Jabbar Lami** — exactly this spelling everywhere.
- Experience: **2 years**.
- Only figures he measured; no load-time %, traffic %, signup %, or Lighthouse scores.
- Project order: Technical Support System → Ministry dashboard → Riyada → Archive →
  Hospital → Karwatt. Experience and projects stay separate sections.
