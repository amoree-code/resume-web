# Design system

The rules this portfolio is built on. The live, rendered version is the `/design` route
(`app/design/page.tsx`); tokens live in `app/globals.css`. Change a token there, not inline.

## Principles

1. **Proof over adjectives.** Numbers, stacks and live links sell the work — not words like
   "pixel-perfect" or "passionate". Every figure on the site must be one he actually measured.
2. **One accent.** Terracotta marks action and emphasis only: primary buttons, links, the
   active state. Never decoration, never large fills.
3. **Sans for reading, mono for data.** Prose and headings in Geist; labels, indices, nav and
   code in Geist Mono. The Merienda script face appears in the hero signature lines and nowhere else.
4. **Motion confirms, never decorates.** Every animation answers an action or a scroll
   position, and all of it switches off under `prefers-reduced-motion`.
5. **Bilingual-ready.** Use logical properties (`margin-inline-start`, `padding-inline`) so
   an Arabic (RTL) version flips without rework.

## Color

Both themes are defined on `:root` / `[data-theme="light"]` in `app/globals.css`.

| Token      | Dark      | Light     | Use                                   |
| ---------- | --------- | --------- | ------------------------------------- |
| `--bg`     | `#202124` | `#f4f1ea` | page background                       |
| `--panel`  | `#292a2d` | `#ffffff` | cards, tags, buttons at rest          |
| `--border` | `#3c4043` | `#e2dacd` | hairlines, dividers, outlines         |
| `--fg`     | `#e8eaed` | `#211e1a` | headings and body text                |
| `--muted`  | `#9aa0a6` | `#6a655e` | secondary text, descriptions          |
| `--faint`  | `#8f949a` | `#6f685f` | meta: indices, dates, footer          |
| `--accent` | `#d97757` | `#c25e3f` | actions, links, active state          |

Tints of the accent are made with `color-mix(in srgb, var(--accent) N%, transparent)` —
never a new hex.

**Text on accent is `#141413`, not white.** White on `#d97757` is about 3.1:1 and fails AA
for button-size text; `#141413` is about 6:1. (The current hero buttons still use white —
fix when the hero is rebuilt.)

## Typography

| Token           | Face         | Use                                          |
| --------------- | ------------ | -------------------------------------------- |
| `--font-sans`   | Geist        | body, headings (`--font-display` aliases it) |
| `--font-mono`   | Geist Mono   | nav, section indicator, indices, code        |
| `--font-script` | Merienda 900 | hero signature lines only                    |

Scale (px): **11** meta · **12–13** labels, tags, small body · **14–16** body ·
**20** card title · **32** section title · **40–48** display numbers ·
`clamp(22px, 4vw, 40px)` hero lines. Headings `h1–h3` track at `-0.02em`.
Body line-height 1.7.

## Layout and spacing

- Container: `max-width: 1120px`, `padding-inline: 24px`.
- Section rhythm: `110px` top / `70–90px` bottom on desktop.
- Spacing steps: 4 · 8 · 10 · 14 · 24 · 30 — stay on these.

## Radius

| Value | Use                     |
| ----- | ----------------------- |
| 4–6   | category chips          |
| 8     | tags                    |
| 9–10  | buttons, inputs         |
| 18–20 | cards, hero frame       |
| 999   | pills, status badge     |

## Motion

- Hover / tap: Framer spring `{ stiffness: 300, damping: 20 }`, lift `y: -4`, tap `scale: .95`.
- Scroll reveals: GSAP `power2.out`, scrubbed between `top 75%` and `top 35%`.
- Entrances: `power3.out`, 0.5–0.8s. Smooth scroll: Lenis.
- `prefers-reduced-motion: reduce` → set final state immediately, no transitions.

## Components

Rendered in `/design`: buttons (primary, secondary, icon), status badge, category chip,
tag, project row, stat, section heading. Reuse these — a new variant needs a reason.

## Content rules

- Name: **Ameer Abdulkareem Jabbar Lami** — exactly this spelling everywhere.
- Experience: **2 years**.
- Only figures he measured; no load-time %, traffic %, signup %, or Lighthouse scores.
- Project order: Technical Support System → Ministry dashboard → Riyada → Archive →
  Hospital → Karwatt. Experience and projects stay separate sections.
