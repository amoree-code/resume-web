# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Purpose

Personal portfolio/resume site for Amir Abdulkarim Jabbar (front-end developer), built on Next.js 16 (App Router).

## Commands

- dev: `npm run dev` (Turbopack, http://localhost:3000)
- build: `npm run build`
- start: `npm run start`
- lint: `npm run lint`
- No test suite configured.

## Architecture

- Entry point: `app/page.tsx` — composes all page sections in order: Header, Hero, About, Workspace, Work, Experience, Contact, Footer.
- `app/layout.tsx` — root shell: loads Merienda font, mounts global `SmoothScroll`, `Cursor`, and background `ParticleField` (three.js), sets SEO metadata/OpenGraph.
- `data/portfolio.json` — single source of truth for content (stats, skillGroups, projects, experience). Edit this to change resume content, not the components.
- `lib/portfolio.ts` — typed accessor (`getPortfolioData`) over `data/portfolio.json`; types (`Stat`, `Project`, `Experience`, etc.) defined here.
- `app/api/portfolio/route.ts` — GET endpoint exposing the same JSON, `revalidate = 3600`.
- `app/components/` — one file per page section/effect (`hero.tsx`, `work.tsx`, `experience.tsx`, `cube-scene.tsx` + `cube-scene-lazy.tsx` for the 3D piece, `particle-field.tsx`, `parallax.tsx`, `reveal.tsx`/`hero-reveal.tsx` for scroll animations).
- 3D/animation stack: `three` + `@react-three/fiber` + `@react-three/drei` for WebGL scenes, `gsap`/`framer-motion`/`lenis` for scroll and motion effects.

## Conventions

- Content changes go in `data/portfolio.json`; components stay presentational.
- Heavy 3D scenes are split into a lazy-loaded wrapper (see `cube-scene-lazy.tsx`) to keep initial bundle light.

## Gotchas

- **This is not the Next.js you know**: breaking changes vs. training data. Before writing Next.js code, read the matching guide under `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`) and heed deprecation notices. Installed version: Next 16.2.10 / React 19.2.4.
