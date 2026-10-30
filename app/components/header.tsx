"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(header, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        header,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" }
      );
    }

    // compact + blur once the page scrolls past the fold
    const st = ScrollTrigger.create({
      start: "80px top",
      end: 999999,
      toggleClass: { targets: header, className: "header-scrolled" },
    });

    return () => st.kill();
  }, []);

  // Escape closes the mobile menu; widening past the breakpoint resets it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    smoothScrollTo(id);
  };

  const links = NAV_LINKS.map((id) => (
    <a
      key={id}
      className="navlink"
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        go(id);
      }}
    >
      {id}
    </a>
  ));

  return (
    <header ref={headerRef} className="site-header" data-open={open}>
      <div className="container site-header-inner">
        <motion.a
          href="#top"
          className="site-logo mono"
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={tap}
          transition={SPRING}
        >
          <span className="site-logo-dot" />
          ameer<span style={{ color: "var(--accent)" }}>.lami</span>
        </motion.a>

        <nav className="site-nav" aria-label="Primary">
          {links}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost site-resume">
            Resume
          </a>
        </nav>

        <div className="site-header-tools">
          <ThemeToggle />
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-btn-bar" />
            <span className="menu-btn-bar" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container mobile-menu-inner">
              {links}
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
