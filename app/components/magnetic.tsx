"use client";

import { useEffect } from "react";

const STRENGTH = 0.28;
const MAX = 10; // px

// One delegated listener pulls any [data-magnetic] element toward the pointer.
// Writes --mag-x / --mag-y, which globals.css maps onto the `translate` property,
// so it never fights Framer or GSAP over `transform`.
export default function Magnetic() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let current: HTMLElement | null = null;

    const release = (el: HTMLElement) => {
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (current && current !== el) release(current);
      current = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * STRENGTH;
      const dy = (e.clientY - (r.top + r.height / 2)) * STRENGTH;
      el.style.setProperty("--mag-x", `${Math.max(-MAX, Math.min(MAX, dx))}px`);
      el.style.setProperty("--mag-y", `${Math.max(-MAX, Math.min(MAX, dy))}px`);
    };

    const onLeaveWindow = () => {
      if (current) release(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
}
