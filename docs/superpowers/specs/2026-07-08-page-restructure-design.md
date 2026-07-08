# Page restructure: What I Do, reordered sections, side rails, split Contact

## Goal

Restructure the resume page: merge About+Workspace, add a Services row + marquee, reorder Projects before Experience, add scroll-driven side-index rails, split Contact into two animated columns.

## Section order (final)

Header → Hero → What I Do (01) → Projects/Work (02) → Experience (03) → Contact → Footer.

## "What I Do" (merges about.tsx + workspace.tsx)

- Keep About's bio paragraph + skill-group tag list, unchanged content.
- Keep Workspace's floating code-mock card + parallax/scale scrub animation, unchanged content.
- Layout: bio+tags stacked left/top, workspace card right/bottom (or stacked on mobile) — same grid pattern already used in about.tsx.
- New: Services/focus-area row below the bio+workspace grid — 4 items: Full-stack Developer, Web Development, Advanced Solutions, Code Optimization. Same visual language as existing skill-group tags (pill/border style) but larger, one row, animated in with stagger via existing Reveal/gsap pattern.
- New: two-row marquee band directly below the Services row.
  - Row 1: skillGroups items concatenated (React.js, Next.js, Node.js, PostgreSQL, TypeScript, ...), scrolling left.
  - Row 2: the 4 focus-area labels repeated, bold/larger type, scrolling right (opposite direction).
  - Implementation: pure CSS `@keyframes translateX(0 → -50%)` on a duplicated flex track (content doubled for seamless loop), `animation-play-state: paused` on `:hover`, respects `prefers-reduced-motion` (skip animation, static row) matching the pattern already used in workspace.tsx/experience.tsx. No new dependency.

## Projects (Work) — section 02

Move `<Work />` before `<Experience />` in app/page.tsx. No content/component changes.

## Experience — section 03

Keep existing vertical timeline (line-draw scrub + per-row Reveal stagger, already implemented in experience.tsx). No structural changes — just renumber to 03 and confirm animation still triggers correctly at new scroll position.

## Fixed side rails (new, page-wide)

- Left rail: sticky to left viewport edge, spans the 4 main content sections (What I Do / Work / Experience / Contact). Shows index 01–04; the number for the currently-active section is highlighted (accent color, larger/bold), others dimmed. Replaces the existing inline "01"/"03" labels inside each section (those get removed from about.tsx/experience.tsx/work.tsx once the rail exists).
- Right rail: sticky to right viewport edge, mirrors the left rail's active-section tracking. Shows one stat from portfolio.json `stats[]` per section (index-matched: stats[0] for section 01, stats[1] for section 02, etc.), swapping (crossfade) as the active section changes.
- Active-section detection: reuse the existing gsap ScrollTrigger pattern already in this codebase (about.tsx, experience.tsx, workspace.tsx use `gsap.context` + `ScrollTrigger`) — one ScrollTrigger per section toggling an "active index" state, driving both rails from a single source of truth (e.g. a small client component or shared hook) so they never desync.
- Hidden on mobile/narrow viewports (rails need side margin room) — same `prefers-reduced-motion`/responsive conventions as the rest of the site.

## Contact — split into two columns

- Left column: "Keep in Touch" — social/contact links (GitHub, LinkedIn, phone) pulled from `lib/contact.ts` `CONTACT_LINKS`, currently the icon row at the bottom of the existing contact card.
- Right column: "Let's Build Something" — the existing email CTA card content (heading, blurb, email button) unchanged.
- Both columns wrapped in their own `Reveal` with staggered delay (left first, then right), matching the `delayMs` stagger pattern already used in experience.tsx.
- Responsive: stack vertically on narrow viewports (right on top, since it's the primary CTA).

## Header nav anchors

`header.tsx` NAV_LINKS = `["about", "work", "experience", "contact"]` — already matches the target order (What I Do keeps `id="about"`, Work/Experience/Contact unchanged), so no anchor reordering needed. Confirm nav label text still reads sensibly for the merged section (e.g. keep "About" or rename label to "What I Do" — cosmetic, pick during implementation).

## Out of scope

- No changes to portfolio.json content/data shape beyond reading existing `stats`/`skillGroups` arrays.
- No new npm dependencies (marquee is pure CSS, rails reuse gsap already in the project).
- Header/Footer/Hero/nav anchors untouched except updating in-page anchor order if header nav links to section ids.
