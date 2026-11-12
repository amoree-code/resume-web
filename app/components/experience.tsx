"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import SplitReveal from "./split-reveal";
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
    <section id="experience" className="container section">
      <div className="section-head">
        <div>
          <p className="eyebrow" style={{ margin: "0 0 12px" }}>02 — Experience</p>
          <SplitReveal className="section-title" text="Where I've *shipped.*" />
        </div>
      </div>
      <div ref={listRef} style={{ position: "relative" }}>
        <div ref={trunkRef} className="tree-trunk" />
        {experience.map((e, i) => {
          const isLeft = i % 2 === 0;
          const card = (
            <div className="tree-card">
              <div className="mono tree-dates">{e.dates}</div>
              <h3 className="tree-company">{e.company}</h3>
              <div className="tree-role">{e.role}</div>
              <ul className="tree-points">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          );
          return (
            <Reveal key={e.company} delayMs={Math.min(i, 4) * 60}>
              <div className="tree-row" data-side={isLeft ? "left" : "right"}>
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
