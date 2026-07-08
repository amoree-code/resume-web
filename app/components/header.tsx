"use client";

import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./theme-toggle";

const NAV_LINKS = ["about", "work", "experience", "contact"];
const RESUME_URL = "/resume.pdf";
const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Header() {
  const reduceMotion = useReducedMotion();
  const tap = reduceMotion ? undefined : { scale: 0.95 };
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        background: "color-mix(in srgb, var(--bg) 78%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 10,
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--fg)",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          <span style={{ fontSize: 14 }}>
            amir<span style={{ color: "var(--accent)" }}>.dev</span>
          </span>
        </a>
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            rowGap: 10,
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          {NAV_LINKS.map((id) => (
            <motion.a
              key={id}
              className="navlink"
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                position: "relative",
              }}
              href={`#${id}`}
              whileHover={reduceMotion ? undefined : { color: "var(--fg)" }}
              whileTap={tap}
              transition={SPRING}
            >
              {id}
            </motion.a>
          ))}
          <motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--fg)",
              textDecoration: "none",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 14px",
              fontWeight: 700,
            }}
            whileHover={
              reduceMotion ? undefined : { borderColor: "var(--accent)" }
            }
            whileTap={tap}
            transition={SPRING}
          >
            Resume
          </motion.a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
