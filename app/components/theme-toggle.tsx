"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("amir-portfolio-theme");
    const t =
      (saved as "dark" | "light" | null) ??
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("amir-portfolio-theme", next);
  };

  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "light"}
      style={{
        cursor: "pointer",
        width: 38,
        height: 38,
        borderRadius: 9,
        border: "1px solid var(--border)",
        background: "var(--panel)",
        color: "var(--fg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          style={{ fontSize: 15, display: "inline-block" }}
          initial={reduceMotion ? undefined : { rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {theme === "dark" ? "☀" : "☾"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
