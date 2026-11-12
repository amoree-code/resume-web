"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const THEME_KEY = "portfolio-theme";

type Theme = "dark" | "light";

// <html data-theme> is set before paint by the inline script in layout.tsx;
// this component only reads and flips it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, getTheme, () => "dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "light"}
      style={{
        cursor: "pointer",
        width: 44,
        height: 44,
        borderRadius: "var(--radius)",
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
