"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "./theme-toggle";
import { smoothScrollTo } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["about", "work", "experience", "contact"];
const RESUME_URL = "/resume.pdf";
const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Header() {
  const reduceMotion = useReducedMotion();
  const tap = reduceMotion ? undefined : { scale: 0.95 };
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const inner = innerRef.current;
    if (!header || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(header, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        header,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    // compact + shadow once the page scrolls past the fold
    const st = ScrollTrigger.create({
      start: "80px top",
      end: 999999,
      toggleClass: { targets: [header, inner], className: "header-scrolled" },
    });

    return () => st.kill();
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header"
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
        ref={innerRef}
        className="site-header-inner"
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
        <motion.a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--fg)",
            fontWeight: 700,
            textDecoration: "none",
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={tap}
          transition={SPRING}
        >
          <motion.span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.6,
                    boxShadow: "0 0 10px 2px var(--accent)",
                  }
            }
            transition={SPRING}
          />
          <span style={{ fontSize: 14 }}>
            amir<span style={{ color: "var(--accent)" }}>.dev</span>
          </span>
        </motion.a>
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
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(id);
              }}
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
