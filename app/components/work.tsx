"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import type { Project } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Work({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduceMotionMq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      // Collision entrance: same landing feel as the Languages section.
      if (reduceMotionMq) {
        gsap.set(sectionRef.current, { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.fromTo(
          sectionRef.current,
          { y: 140, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.9)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            onStart: () => {
              gsap.fromTo(
                sectionRef.current,
                { boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
                {
                  boxShadow: "0 -30px 60px -20px rgba(0,0,0,.35)",
                  duration: 0.35,
                  yoyo: true,
                  repeat: 1,
                  ease: "power1.out",
                }
              );
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    const reduceMotionMq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".proj-row");
      rows.forEach((row) => {
        const num = row.querySelector(".proj-num");
        const content = row.querySelector(".proj-content");
        if (!num || !content) return;
        if (reduceMotionMq) {
          gsap.set([num, content], { opacity: 1, x: 0, scale: 1 });
          return;
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            num,
            { opacity: 0, scale: 0.6, x: -20 },
            { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: "back.out(1.7)" }
          )
          .fromTo(
            content,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
      });
    }, listRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "30px 24px 70px",
        position: "relative",
      }}
    >
      <Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 26,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-merienda), cursive",
              fontWeight: 700,
              fontSize: 32,
              margin: 0,
            }}
          >
            Projects
          </h2>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 12, color: "var(--faint)" }}>
            {visibleProjects.length} projects
          </span>
        </div>
      </Reveal>
      <Reveal>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 30,
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: 999,
                border:
                  activeCategory === cat
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
                background:
                  activeCategory === cat
                    ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                    : "var(--panel)",
                color: activeCategory === cat ? "var(--accent)" : "var(--muted)",
                cursor: "pointer",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </Reveal>
      <div ref={listRef}>
        {visibleProjects.map((p, i) => (
          <motion.div
            key={p.idx}
            className="proj-row"
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="proj-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="proj-content">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--accent)",
                    border:
                      "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
                    borderRadius: 6,
                    padding: "3px 8px",
                  }}
                >
                  {p.category}
                </span>
                <span style={{ fontSize: 11, color: "var(--faint)" }}>
                  {p.idx}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-merienda), cursive",
                  fontWeight: 700,
                  fontSize: 20,
                  margin: "0 0 8px",
                  color: "var(--fg)",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  margin: "0 0 12px",
                  maxWidth: 640,
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      border: "1px solid var(--border)",
                      background: "var(--panel)",
                      borderRadius: 8,
                      padding: "5px 10px",
                      color: "var(--fg)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Reveal>
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12.5,
              color: "var(--accent)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "10px 20px",
              display: "inline-block",
            }}
          >
            See full project history in resume →
          </a>
        </div>
      </Reveal>
    </section>
  );
}
