"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./split-reveal";
import type { Project } from "@/lib/portfolio";
import { RESUME_URL } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger);

// Spotlight follows the pointer: the card's ::before reads --mx / --my.
function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Work({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const visibleProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  );

  // First reveal on scroll: card contents rise in a stagger. GSAP drives the inner
  // wrapper so it never fights Framer's layout transforms on the card itself.
  useEffect(() => {
    if (!gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-card-inner",
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="container section">
      <div className="section-head">
        <div>
          <p className="eyebrow" style={{ margin: "0 0 12px" }}>02 — Selected work</p>
          <SplitReveal className="section-title" text="Real scale, *real users.*" />
        </div>
        <div className="work-filters" role="group" aria-label="Filter projects">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="work-filter"
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="work-filter-pill"
                  className="work-filter-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span style={{ position: "relative" }}>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div ref={gridRef} className="work-grid" layout={!reduceMotion}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((p) => (
            <motion.article
              key={p.idx}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="work-card"
              onPointerMove={trackPointer}
            >
              <div className="work-card-inner">
                <div className="work-card-top">
                  <span className="work-chip mono">{p.category}</span>
                  <span className="mono work-idx">{p.idx}</span>
                </div>
                {p.metric && (
                  <div className="work-metric">
                    {p.metric}
                    <span className="mono">{p.metricLabel}</span>
                  </div>
                )}
                <div className="work-body">
                  <h3 className="work-title">{p.title}</h3>
                  <p className="work-desc">{p.desc}</p>
                </div>
                <div className="work-foot">
                  {p.tags.map((tag) => (
                    <span key={tag} className="work-tag mono">
                      {tag}
                    </span>
                  ))}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-link"
                      aria-label={`Visit ${p.title} live`}
                    >
                      Visit live <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div style={{ textAlign: "center", marginTop: 36 }}>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          Full project history in the resume →
        </a>
      </div>
    </section>
  );
}
