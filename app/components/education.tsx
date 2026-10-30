"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Reveal from "./reveal";
import SplitReveal from "./split-reveal";
import type { Education as EducationItem, SpokenLanguage } from "@/lib/portfolio";

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

// "Native" fills the scale; otherwise fill up to the CEFR level named in the label.
function cefrSteps(level: string) {
  if (/native/i.test(level)) return CEFR.length;
  const hit = CEFR.findIndex((c) => level.includes(c));
  return hit === -1 ? 0 : hit + 1;
}

export default function Education({
  education,
  spokenLanguages,
}: {
  education: EducationItem[];
  spokenLanguages: SpokenLanguage[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-15% 0px" });

  return (
    <section id="education" className="container section">
      <div className="section-head">
        <div>
          <p className="eyebrow" style={{ margin: "0 0 12px" }}>04 — Education</p>
          <SplitReveal className="section-title" text={"Education & *languages.*"} />
        </div>
      </div>

      <div ref={gridRef} className="edu-grid" data-inview={inView}>
        <Reveal>
          <div className="edu-card">
            {education.map((ed) => (
              <div key={ed.title} className="edu-item">
                <span className="edu-year">{ed.dates}</span>
                <span className="edu-rule" aria-hidden="true" />
                <div>
                  <h3 className="edu-title">{ed.title}</h3>
                  <p className="edu-place">{ed.place}</p>
                  {ed.note && <p className="mono edu-note">{ed.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="edu-card">
            <p className="eyebrow" style={{ margin: "0 0 20px" }}>Spoken languages · CEFR</p>
            <ul className="lang-levels">
              {spokenLanguages.map((l) => {
                const steps = cefrSteps(l.level);
                return (
                  <li key={l.name}>
                    <div className="lang-level-head">
                      <span className="edu-title">{l.name}</span>
                      <span className="mono lang-level-label">{l.level}</span>
                    </div>
                    <div
                      className="cefr"
                      role="img"
                      aria-label={`${l.name}: ${l.level}`}
                    >
                      {CEFR.map((c, i) => (
                        <span
                          key={c}
                          className="cefr-step"
                          data-on={i < steps}
                          style={{ "--i": i } as React.CSSProperties}
                        >
                          <span className="mono">{c}</span>
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
