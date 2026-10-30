"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import type { Experience as ExperienceItem } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Experience({
  experience,
}: {
  experience: ExperienceItem[];
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const trunkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || !trunkRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      gsap.set(trunkRef.current, { scaleY: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        trunkRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "30px 24px 70px",
      }}
    >
      <Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 30,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 32,
              margin: 0,
            }}
          >
            Experience
          </h2>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
      </Reveal>
      <div ref={listRef} style={{ position: "relative" }}>
        <div ref={trunkRef} className="tree-trunk" />
        {experience.map((e, i) => {
          const isLeft = i % 2 === 0;
          const card = (
            <div className="tree-card">
              <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 6 }}>
                {e.dates}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontSize: 16, fontWeight: 700, color: "var(--fg)" }}
                >
                  {e.company}
                </span>
                <span style={{ fontSize: 16, color: "var(--accent)" }}>
                  {e.role}
                </span>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  fontSize: 12.5,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}
              >
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          );
          return (
            <Reveal key={e.company} delayMs={Math.min(i, 4) * 60}>
              <div className="tree-row">
                <div className="tree-cell-left">{isLeft ? card : null}</div>
                <div className="tree-cell-node">
                  <span className="tree-node" />
                </div>
                <div className="tree-cell-right">{!isLeft ? card : null}</div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
