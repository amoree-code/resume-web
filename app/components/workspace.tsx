"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import Parallax from "./parallax";

gsap.registerPlugin(ScrollTrigger);

const CODE_LINES = [
  { w: "38%", c: "var(--accent)" },
  { w: "62%", c: "var(--faint)" },
  { w: "51%", c: "var(--faint)" },
  { w: "44%", c: "var(--blue, #7fb2e0)" },
  { w: "58%", c: "var(--faint)" },
  { w: "29%", c: "var(--accent)" },
];

export default function Workspace() {
  // Scale/rotate scrub lives on the outer wrapper (not the deskfloat card
  // itself) so it doesn't fight the CSS keyframe animation on that element.
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
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
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "0 24px 90px",
      }}
    >
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
              background:
                "linear-gradient(160deg, var(--panel), var(--bg) 70%)",
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
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
              <span
                style={{
                  marginLeft: 12,
                  fontSize: 11.5,
                  color: "var(--faint)",
                }}
              >
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
                  style={{
                    height: 10,
                    width: line.w,
                    borderRadius: 4,
                    background: line.c,
                    opacity: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Parallax>
      </Reveal>
    </section>
  );
}
