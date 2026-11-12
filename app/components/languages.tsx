"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitReveal from "./split-reveal";
import type { SkillGroup } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

const GROUP_ICONS: Record<string, string> = {
  Languages: "M8 5 3 12l5 7M16 5l5 7-5 7M13 4l-2 16",
  "Front-end": "M4 5h16v11H4z M4 19h16 M9 8l3 3-3 3 M15 8l-3 3 3 3",
  "UI Libraries": "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  "Back-end": "M4 4h16v6H4z M4 14h16v6H4z M8 7h.01 M8 17h.01",
  Databases:
    "M4 5c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z M4 5v14c0 1.1 3.6 2 8 2s8-.9 8-2V5 M4 12c0 1.1 3.6 2 8 2s8-.9 8-2",
  Localization: "M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18 M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18",
  Tools: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z",
};

export default function Languages({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".lang-row");
      rows.forEach((row) => {
        const icon = row.querySelector(".lang-icon");
        const chips = row.querySelectorAll(".lang-chip");
        if (reduceMotion) {
          gsap.set([icon, ...Array.from(chips)], { opacity: 1, scale: 1, y: 0 });
          return;
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          })
          .fromTo(
            icon,
            { opacity: 0, scale: 0.5, rotate: -15 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" }
          )
          .fromTo(
            chips,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.06 },
            "-=0.25"
          );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="container section" style={{ position: "relative" }}>
      <div className="section-head">
        <div>
          <p className="eyebrow" style={{ margin: "0 0 12px" }}>Stack</p>
          <SplitReveal className="section-title" text={"Languages & *tools.*"} />
        </div>
      </div>

      <div ref={listRef} className="lang-list">
        {skillGroups.map((g) => (
          <div key={g.label} className="lang-row">
            <svg
              className="lang-icon"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={GROUP_ICONS[g.label] ?? "M4 12h16"} />
            </svg>
            <div className="eyebrow lang-label">{g.label}</div>
            <div className="lang-chips">
              {g.items.map((sk) => (
                <span key={sk} className="lang-chip mono">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
