# Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge About+Workspace into a "What I Do" section with a Services row and CSS marquee, add fixed scroll-tracking side rails, and split Contact into two animated columns.

**Architecture:** Reuse existing component conventions in this repo (inline `style` objects, `Reveal` for scroll-in animation, `gsap.context` + `ScrollTrigger` for scrub/active-section tracking). No new npm dependencies — the marquee is pure CSS, the rails reuse `gsap`/`ScrollTrigger` already installed. Section ids (`about`, `work`, `experience`, `contact`) and their nav/DOM order are already correct today — no reordering of Work/Experience is needed, only the About+Workspace merge.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, gsap + ScrollTrigger, framer-motion (Contact only). No test runner configured in this repo — verification is `npm run build`, `npm run lint`, and manual browser check via the `run` skill, not unit tests.

## Global Constraints

- No new npm dependencies (per spec "Out of scope").
- Marquee respects `prefers-reduced-motion` (static, unanimated row) — matches existing convention in `workspace.tsx`/`experience.tsx`/`reveal.tsx`.
- Side rails hidden below a tablet breakpoint (no room in narrow viewports) — spec: "Hidden on mobile/narrow viewports".
- `id="about"` must be preserved on the merged section (header nav depends on it: `app/components/header.tsx:11`).
- Content changes belong in `data/portfolio.json` per this repo's CLAUDE.md convention ("Content changes go in `data/portfolio.json`; components stay presentational").

---

## File Structure

- Modify: `data/portfolio.json` — add `focusAreas: string[]` (the 4 service labels).
- Modify: `lib/portfolio.ts` — add `focusAreas` to `PortfolioData` type and passthrough.
- Create: `app/components/marquee.tsx` — generic two-direction CSS marquee, takes `items: string[]`, `direction: "left" | "right"`.
- Modify: `app/globals.css` — add `@keyframes marquee-left` / `@keyframes marquee-right`.
- Create: `app/components/what-i-do.tsx` — merged section: bio + skill tags (from `about.tsx`) + workspace card (from `workspace.tsx`) + new Services row + two `Marquee` rows.
- Delete: `app/components/about.tsx`, `app/components/workspace.tsx` (content absorbed into `what-i-do.tsx`).
- Create: `app/components/side-rails.tsx` — fixed left (section index 01–04) + right (active stat) rails, one `ScrollTrigger` per section driving shared active-index state.
- Modify: `app/components/contact.tsx` — split into `KeepInTouch` (left) + existing CTA card (right), two staggered `Reveal`s.
- Modify: `app/page.tsx` — swap `About`+`Workspace` for `WhatIDo`, add `SideRails`.

---

## Task 1: Add `focusAreas` to portfolio data

**Files:**
- Modify: `data/portfolio.json`
- Modify: `lib/portfolio.ts`

**Interfaces:**
- Produces: `PortfolioData.focusAreas: string[]`, consumed by Task 3 (`what-i-do.tsx`).

- [ ] **Step 1: Add the field to the JSON**

Open `data/portfolio.json`, add a top-level key right after `"skillGroups"` (before `"projects"`):

```json
  "focusAreas": [
    "Full-stack Developer",
    "Web Development",
    "Advanced Solutions",
    "Code Optimization"
  ],
```

- [ ] **Step 2: Add the type + passthrough**

In `lib/portfolio.ts`, update the `PortfolioData` type and nothing else (the `as PortfolioData` cast already passes new fields through):

```ts
export type PortfolioData = {
  stats: Stat[];
  skillGroups: SkillGroup[];
  focusAreas: string[];
  projects: Project[];
  experience: Experience[];
};
```

- [ ] **Step 3: Verify with build**

Run: `npm run build`
Expected: build succeeds (TypeScript accepts the new field; no component destructures it yet so it's simply unused).

- [ ] **Step 4: Commit**

```bash
git add data/portfolio.json lib/portfolio.ts
git commit -m "feat: add focusAreas to portfolio data"
```

---

## Task 2: Marquee component + keyframes

**Files:**
- Create: `app/components/marquee.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `export default function Marquee({ items, direction }: { items: string[]; direction: "left" | "right" })` — consumed by Task 3.

- [ ] **Step 1: Add keyframes to globals.css**

In `app/globals.css`, add next to the other `@keyframes` blocks (near `@keyframes deskfloat` at line ~127):

```css
@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
```

- [ ] **Step 2: Write the component**

Create `app/components/marquee.tsx`:

```tsx
"use client";

export default function Marquee({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const track = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: "flex",
          width: "max-content",
          gap: 32,
          animation: `${
            direction === "left" ? "marquee-left" : "marquee-right"
          } 22s linear infinite`,
        }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--muted)",
              whiteSpace: "nowrap",
              padding: "6px 18px",
              border: "1px solid var(--border)",
              borderRadius: 999,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add hover-pause + reduced-motion rules to globals.css**

Right after the two `@keyframes marquee-*` blocks:

```css
@media (hover: hover) and (pointer: fine) {
  .marquee-track:hover {
    animation-play-state: paused;
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none !important;
  }
}
```

Then update `marquee.tsx`'s inner `<div>` to also carry `className="marquee-track"` (already present above — confirm it's there, not just in the `style`).

- [ ] **Step 4: Verify with build**

Run: `npm run build`
Expected: build succeeds, no unused-import errors (component isn't wired into a page yet, so also run `npm run lint` — expected: no errors; an unused-export is fine, an unused-import inside the file is not).

- [ ] **Step 5: Commit**

```bash
git add app/components/marquee.tsx app/globals.css
git commit -m "feat: add CSS marquee component"
```

---

## Task 3: "What I Do" section (merge About + Workspace + Services + Marquee)

**Files:**
- Create: `app/components/what-i-do.tsx`
- Delete: `app/components/about.tsx`
- Delete: `app/components/workspace.tsx`

**Interfaces:**
- Consumes: `SkillGroup[]` (from `lib/portfolio.ts`, unchanged shape), `focusAreas: string[]` (Task 1), `Marquee` (Task 2), `Reveal` (existing, unchanged), `Parallax` (existing, unchanged).
- Produces: `export default function WhatIDo({ skillGroups, focusAreas }: { skillGroups: SkillGroup[]; focusAreas: string[] })`, mounted with `id="about"` — consumed by Task 6 (`page.tsx`) and Task 5 (`side-rails.tsx` targets `#about`).

- [ ] **Step 1: Create the merged component**

Create `app/components/what-i-do.tsx` — this is `about.tsx` and `workspace.tsx` content combined into one section, with the number label removed (rails own that now, per spec), plus the new Services row and two `Marquee` rows:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import Parallax from "./parallax";
import Marquee from "./marquee";
import type { SkillGroup } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

const CODE_LINES = [
  { w: "38%", c: "var(--accent)" },
  { w: "62%", c: "var(--faint)" },
  { w: "51%", c: "var(--faint)" },
  { w: "44%", c: "var(--blue, #7fb2e0)" },
  { w: "58%", c: "var(--faint)" },
  { w: "29%", c: "var(--accent)" },
];

export default function WhatIDo({
  skillGroups,
  focusAreas,
}: {
  skillGroups: SkillGroup[];
  focusAreas: string[];
}) {
  const groupsRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (groupsRef.current) {
        const items = gsap.utils.toArray<HTMLElement>(".skill-group");
        if (reduceMotion) {
          gsap.set(items, { opacity: 1, scale: 1 });
        } else {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: groupsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            })
            .fromTo(
              items,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 }
            );
        }
      }

      if (wrapRef.current && !reduceMotion) {
        gsap.fromTo(
          wrapRef.current,
          { scale: 0.94, rotate: -1.2 },
          {
            scale: 1.04,
            rotate: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          }
        );
      }

      if (servicesRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(".focus-area");
        if (reduceMotion) {
          gsap.set(cards, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: servicesRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "30px 24px 70px",
        gap: 60,
      }}
    >
      <Reveal>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 30 }}>
          <h2
            style={{
              fontFamily: "var(--font-merienda), cursive",
              fontWeight: 700,
              fontSize: 32,
              margin: 0,
            }}
          >
            What I Do
          </h2>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
          gap: 44,
          alignItems: "end",
        }}
      >
        <Reveal>
          <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.85 }}>
            <p style={{ margin: "0 0 16px" }}>
              I care about interfaces that feel effortless — clean, fast, and
              easy to use. I&apos;m just as comfortable working across the
              full stack, taking a product from idea to something real people
              use.
            </p>
            <p style={{ margin: 0 }}>
              I&apos;ve built large-scale government platforms handling{" "}
              <span style={{ color: "var(--fg)" }}>1.5M+ records</span>,
              embedded SaaS products used across{" "}
              <span style={{ color: "var(--fg)" }}>10+ production platforms</span>
              , and real-time systems serving hundreds of thousands of
              people. I focus on writing code that performs well and that a
              team can actually maintain and grow.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div ref={groupsRef} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {skillGroups.map((g) => (
              <div key={g.label} className="skill-group">
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "var(--faint)",
                    marginBottom: 10,
                  }}
                >
                  {g.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.items.map((sk) => (
                    <span
                      key={sk}
                      style={{
                        fontSize: 12,
                        border: "1px solid var(--border)",
                        background: "var(--panel)",
                        borderRadius: 8,
                        padding: "7px 12px",
                        color: "var(--fg)",
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal>
        <Parallax amount={24}>
          <div ref={wrapRef} style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -30,
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 65%)",
                filter: "blur(30px)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                border: "1px solid var(--border)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 30px 80px rgba(0,0,0,.45)",
                animation: "deskfloat 6s ease-in-out infinite",
                background: "linear-gradient(160deg, var(--panel), var(--bg) 70%)",
                aspectRatio: "1376 / 768",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "14px 18px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                  <span
                    key={c}
                    style={{ width: 11, height: 11, borderRadius: "50%", background: c }}
                  />
                ))}
                <span style={{ marginLeft: 12, fontSize: 11.5, color: "var(--faint)" }}>
                  the-workspace.tsx
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 14,
                  padding: "0 40px",
                }}
              >
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    style={{ height: 10, width: line.w, borderRadius: 4, background: line.c, opacity: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Parallax>
      </Reveal>

      <div ref={servicesRef} style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {focusAreas.map((area) => (
          <div
            key={area}
            className="focus-area"
            style={{
              fontSize: 15,
              fontWeight: 700,
              border: "1px solid var(--border)",
              background: "var(--panel)",
              borderRadius: 12,
              padding: "16px 22px",
              color: "var(--fg)",
            }}
          >
            {area}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Marquee items={[...new Set(skillGroups.flatMap((g) => g.items))]} direction="left" />
        <Marquee items={focusAreas} direction="right" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete the old components**

```bash
rm app/components/about.tsx app/components/workspace.tsx
```

- [ ] **Step 3: Verify with build**

Run: `npm run build`
Expected: fails at this point because `app/page.tsx` still imports the deleted `About`/`Workspace` files — that's expected; Task 6 fixes `page.tsx`. Confirm the *only* errors are the two missing-module errors in `app/page.tsx`, nothing inside `what-i-do.tsx` itself.

- [ ] **Step 4: Commit**

```bash
git add app/components/what-i-do.tsx
git rm app/components/about.tsx app/components/workspace.tsx
git commit -m "feat: merge About+Workspace into WhatIDo section with Services+Marquee"
```

---

## Task 4: Split Contact into two columns

**Files:**
- Modify: `app/components/contact.tsx`

**Interfaces:**
- Consumes: `CONTACT_LINKS` from `@/lib/contact` (existing, unchanged — has entries with `.label` of `"Email"`, `"GitHub"`, `"LinkedIn"`, `"Phone"`).
- No exported interface changes — `export default function Contact()` keeps its zero-prop signature.

- [ ] **Step 1: Rewrite the section as two Reveal-wrapped columns**

Replace the full contents of `app/components/contact.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./reveal";
import { CONTACT_LINKS } from "@/lib/contact";

const emailLink = CONTACT_LINKS.find((l) => l.label === "Email")!;
const githubLink = CONTACT_LINKS.find((l) => l.label === "GitHub")!;
const linkedinLink = CONTACT_LINKS.find((l) => l.label === "LinkedIn")!;
const phoneLink = CONTACT_LINKS.find((l) => l.label === "Phone")!;

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const hover = (extra?: object) =>
    reduceMotion ? undefined : { scale: 1.03, ...extra };
  const tap = reduceMotion ? undefined : { scale: 0.97 };

  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "40px 24px 30px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
          gap: 32,
        }}
      >
        <Reveal>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 18,
              background: "var(--panel)",
              padding: "48px 36px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-merienda), cursive",
                fontWeight: 700,
                fontSize: 26,
                margin: "0 0 22px",
              }}
            >
              Keep in Touch
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 14 }}>
              <motion.a
                className="navlink"
                href={githubLink.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                GitHub ↗
              </motion.a>
              <motion.a
                className="navlink"
                href={linkedinLink.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                LinkedIn ↗
              </motion.a>
              <motion.a
                className="navlink"
                href={phoneLink.href}
                style={{ color: "var(--muted)", textDecoration: "none" }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                +964 777 766 5783
              </motion.a>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={150}>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 18,
              background: "var(--panel)",
              padding: "56px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 14 }}>
                $ <span style={{ color: "var(--accent)" }}>./say-hello.sh</span>
                <span style={{ animation: "blink 1s step-end infinite" }}>▊</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-merienda), cursive",
                  fontWeight: 900,
                  fontSize: 40,
                  margin: "0 0 16px",
                }}
              >
                Let&apos;s build something
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  maxWidth: 440,
                  margin: "0 auto 28px",
                  lineHeight: 1.7,
                }}
              >
                Open to front-end and full-stack roles. Reach out and
                I&apos;ll get back within a day.
              </p>
              <motion.a
                href={emailLink.href}
                style={{
                  background: "color-mix(in srgb, var(--accent) 80%, black)",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  display: "inline-block",
                  textDecoration: "none",
                }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                amir.abdulkarim.jabbar@gmail.com
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

Note the grid uses `auto-fit` with `minmax(360px, 100%)` — same responsive pattern as `about.tsx`'s old grid, so it stacks to one column automatically below ~750px, right column ("Let's Build Something") appearing second in DOM but since it's the CTA and DOM order here is left-then-right with `Reveal delayMs={150}` staggering it in second, that satisfies "right on top" visually only if you reverse DOM order — spec says right should stack on top on mobile. To achieve that without extra JS, swap the two `Reveal` blocks' order in JSX so the CTA card is first in DOM (top on mobile) and use CSS `order` via a wrapping style if you need it to render second on desktop. Simplest correct fix: keep CTA (`Let's Build Something`) as the *first* child in JSX and `Keep in Touch` second — grid auto-placement then puts CTA left-top and Keep in Touch right on desktop two-column, and CTA on top when stacked. Apply this ordering (CTA block first, Keep in Touch block second) when writing the file.

- [ ] **Step 2: Verify with build**

Run: `npm run build`
Expected: succeeds (no other file references old Contact internals).

- [ ] **Step 3: Commit**

```bash
git add app/components/contact.tsx
git commit -m "feat: split Contact into Keep in Touch + Let's Build Something columns"
```

---

## Task 5: Side rails (left index + right stat)

**Files:**
- Create: `app/components/side-rails.tsx`

**Interfaces:**
- Consumes: `Stat[]` from `lib/portfolio.ts` (existing, unchanged), the 4 section DOM ids `about`, `work`, `experience`, `contact` (already present in the DOM from existing components).
- Produces: `export default function SideRails({ stats }: { stats: Stat[] })`, mounted once in Task 6 (`page.tsx`), rendered outside the scrolling column (fixed position, so placement in the JSX tree doesn't matter beyond being inside `<body>`).

- [ ] **Step 1: Write the component**

Create `app/components/side-rails.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Stat } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ["about", "work", "experience", "contact"];

export default function SideRails({ stats }: { stats: Stat[] }) {
  const [active, setActive] = useState(0);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
        triggersRef.current.push(trigger);
      });
    });

    return () => {
      ctx.revert();
      triggersRef.current = [];
    };
  }, []);

  return (
    <>
      <div
        className="side-rail side-rail-left"
        style={{
          position: "fixed",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 40,
        }}
      >
        {SECTION_IDS.map((id, i) => (
          <span
            key={id}
            style={{
              fontSize: i === active ? 15 : 12,
              fontWeight: i === active ? 800 : 400,
              color: i === active ? "var(--accent)" : "var(--faint)",
              transition: "font-size .25s ease, color .25s ease, font-weight .25s ease",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>

      <div
        className="side-rail side-rail-right"
        style={{
          position: "fixed",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          zIndex: 40,
          textAlign: "right",
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>
          {stats[active]?.num}
        </span>
        <span style={{ fontSize: 10.5, color: "var(--faint)", maxWidth: 100 }}>
          {stats[active]?.label}
        </span>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Hide rails on narrow viewports + reduced-motion transition-skip**

Add to `app/globals.css`, near the other `@media` blocks:

```css
@media (max-width: 900px) {
  .side-rail {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .side-rail span {
    transition: none !important;
  }
}
```

- [ ] **Step 3: Verify with build**

Run: `npm run build`
Expected: fails only on the not-yet-wired-in import in `app/page.tsx` if you check now — otherwise, if checked after Task 6, expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/components/side-rails.tsx app/globals.css
git commit -m "feat: add fixed side rails tracking active section"
```

---

## Task 6: Wire it all into the page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `WhatIDo` (Task 3), `SideRails` (Task 5), `getPortfolioData()` (Task 1's `focusAreas` field, existing `stats`/`skillGroups`/`projects`/`experience`).

- [ ] **Step 1: Rewrite page.tsx**

```tsx
import Header from './components/header';
import Hero from './components/hero';
import WhatIDo from './components/what-i-do';
import Work from './components/work';
import Experience from './components/experience';
import Contact from './components/contact';
import Footer from './components/footer';
import SideRails from './components/side-rails';
import { getPortfolioData } from '@/lib/portfolio';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Amir Abdulkarim Jabbar',
  jobTitle: 'Front-end Developer',
  email: 'mailto:amir.abdulkarim.jabbar@gmail.com',
  telephone: '+9647777665783',
  url: 'https://amir.dev',
  sameAs: [],
};

export default function Home() {
  const { stats, skillGroups, focusAreas, projects, experience } = getPortfolioData();

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Header />
      <Hero />
      <WhatIDo skillGroups={skillGroups} focusAreas={focusAreas} />
      <Work projects={projects} />
      <Experience experience={experience} />
      <Contact />
      <Footer />
      <SideRails stats={stats} />
    </div>
  );
}
```

- [ ] **Step 2: Verify with build**

Run: `npm run build`
Expected: succeeds, no TypeScript or missing-module errors.

- [ ] **Step 3: Verify with lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Manual browser check**

Use the `run` skill (or `npm run dev` + open `http://localhost:3000` in a browser) and confirm:
- Section order top to bottom: Hero → What I Do (bio, skill tags, workspace card, focus-area row, two marquee rows) → Work → Experience → Contact (Keep in Touch left, Let's Build Something right) → Footer.
- Left rail shows 01–04, highlights the number matching whichever of the 4 sections is centered in viewport while scrolling.
- Right rail swaps stat text as you scroll past each section.
- Marquee rows scroll in opposite directions and pause on hover.
- Nav links in the header (`About`/`Work`/`Experience`/`Contact`) still jump to the correct sections.
- Resize below ~900px width: side rails disappear, Contact stacks with CTA card on top.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire WhatIDo and SideRails into page, finish restructure"
```

---

## Self-Review Notes

- **Spec coverage:** What I Do merge ✅ (Task 3), Services row ✅ (Task 3), two-row marquee ✅ (Task 2+3), page order ✅ (Task 6 — Work/Experience order was already correct, no change needed there), Experience tree ✅ (untouched, already implemented), fixed rails ✅ (Task 5), Contact split ✅ (Task 4), header nav anchors ✅ (unchanged ids, verified in Task 6 manual check).
- **Type consistency:** `PortfolioData.focusAreas: string[]` (Task 1) matches `WhatIDo({ focusAreas: string[] })` (Task 3) matches `page.tsx` destructure (Task 6). `Stat` type (existing) matches `SideRails({ stats: Stat[] })` (Task 5).
- **No placeholders:** all steps contain full code, no TBD/TODO.
