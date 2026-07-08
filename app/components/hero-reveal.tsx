"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const targets = ref.current.querySelectorAll("[data-hero-item]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      targets,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      {children}
    </div>
  );
}
