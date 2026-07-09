"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import Workspace from "./workspace";
import type { SkillGroup } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About({
  skillGroups,
  services,
}: {
  skillGroups: SkillGroup[];
  services: string[];
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".stagger-item");
      if (reduceMotion) {
        gsap.set(items, { opacity: 1, scale: 1 });
        return;
      }
      gsap
        .timeline({
          scrollTrigger: {
            trigger: bodyRef.current,
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
    }, bodyRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "110px 24px 70px",
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
              fontFamily: "var(--font-merienda), cursive",
              fontWeight: 700,
              fontSize: 32,
              margin: 0,
            }}
          >
            What I do
          </h2>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
      </Reveal>

      <Reveal>
        <div
          style={{
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.85,
            maxWidth: 720,
            marginBottom: 40,
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            I care about interfaces that feel effortless — clean, fast, and
            easy to use. I&apos;m just as comfortable working across the full
            stack, taking a product from idea to something real people use.
          </p>
          <p style={{ margin: 0 }}>
            I&apos;ve built large-scale government platforms handling{" "}
            <span style={{ color: "var(--fg)" }}>1.5M+ records</span>,
            embedded SaaS products used across{" "}
            <span style={{ color: "var(--fg)" }}>
              10+ production platforms
            </span>
            , and real-time systems serving hundreds of thousands of people.
            I focus on writing code that performs well and that a team can
            actually maintain and grow.
          </p>
        </div>
      </Reveal>

      <div ref={bodyRef}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: 14,
            marginBottom: 48,
          }}
        >
          {services.map((service) => (
            <div
              key={service}
              className="stagger-item"
              style={{
                border: "1px solid var(--border)",
                background: "var(--panel)",
                borderRadius: 14,
                padding: "20px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: "var(--accent)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--fg)" }}>
                {service}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))",
            gap: 44,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {skillGroups.map((g) => (
              <div key={g.label} className="skill-group stagger-item">
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
          <Workspace />
        </div>
      </div>
    </section>
  );
}
