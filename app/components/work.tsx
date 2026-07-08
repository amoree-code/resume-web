"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./reveal";
import type { Project } from "@/lib/portfolio";

export default function Work({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="work"
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
            marginBottom: 26,
          }}
        >
          <span style={{ color: "var(--accent)", fontSize: 14 }}>02</span>
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
            {projects.length} projects
          </span>
        </div>
      </Reveal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap: 18,
        }}
      >
        {projects.map((p, i) => (
          <Reveal key={p.idx} delayMs={Math.min(i, 4) * 60}>
            <motion.div
              className="project-card"
              style={{
                border: "1px solid var(--border)",
                borderRadius: 14,
                background: "var(--panel)",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                height: "100%",
              }}
              whileHover={
                reduceMotion ? undefined : { y: -6, scale: 1.015 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 11, color: "var(--faint)" }}>
                  {p.idx}
                </span>
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
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-merienda), cursive",
                  fontWeight: 700,
                  fontSize: 19,
                  margin: 0,
                  color: "var(--fg)",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 12.5,
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  margin: 0,
                  flex: 1,
                }}
              >
                {p.desc}
              </p>
            </motion.div>
          </Reveal>
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
