"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import type { SkillGroup } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!groupsRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".skill-group");
      if (reduceMotion) {
        gsap.set(items, { opacity: 1, scale: 1 });
        return;
      }
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
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
          }
        );
    }, groupsRef);
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
          <span style={{ color: "var(--accent)", fontSize: 14 }}>01</span>
          <h2
            style={{
              fontFamily: "var(--font-merienda), cursive",
              fontWeight: 700,
              fontSize: 32,
              margin: 0,
            }}
          >
            About &amp; stack
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
              <span style={{ color: "var(--fg)" }}>
                10+ production platforms
              </span>
              , and real-time systems serving hundreds of thousands of
              people. I focus on writing code that performs well and that a
              team can actually maintain and grow.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div
            ref={groupsRef}
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
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
    </section>
  );
}
