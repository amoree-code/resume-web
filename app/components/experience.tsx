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
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || !lineRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      gsap.set(lineRef.current, { scaleY: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
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
          <span style={{ color: "var(--accent)", fontSize: 14 }}>03</span>
          <h2
            style={{
              fontFamily: "var(--font-merienda), cursive",
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
      <div
        ref={listRef}
        style={{ display: "flex", flexDirection: "column", position: "relative" }}
      >
        <div
          ref={lineRef}
          style={{
            position: "absolute",
            left: 182,
            top: 0,
            bottom: 0,
            width: 2,
            background: "var(--accent)",
            opacity: 0.4,
            transformOrigin: "top",
          }}
        />
        {experience.map((e, i) => (
          <Reveal key={e.company} delayMs={Math.min(i, 4) * 60}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "170px 1fr",
                gap: 24,
                padding: "22px 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: 12, color: "var(--faint)" }}>
                {e.dates}
              </div>
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--fg)",
                    }}
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
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
