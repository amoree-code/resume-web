"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { smoothScrollTo } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS: { id: string; num: string; label: string; endId?: string }[] = [
  { id: "about", num: "01", label: "What I do" },
  { id: "work", num: "02", label: "Projects" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "contact", num: "04", label: "Contact", endId: "keep-in-touch" },
];

export default function SectionIndicator() {
  const [active, setActive] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach(({ id, num, endId }) => {
        if (!document.getElementById(id)) return;
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          endTrigger: endId ? `#${endId}` : undefined,
          onEnter: () => setActive(num),
          onEnterBack: () => setActive(num),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav className="section-indicator" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <motion.button
          key={s.num}
          type="button"
          aria-label={`Scroll to ${s.label}`}
          className={`section-indicator-num${active === s.num ? " active" : ""}`}
          onClick={() => smoothScrollTo(s.id)}
          animate={reduceMotion ? undefined : { scale: active === s.num ? 1.3 : 1 }}
          whileHover={reduceMotion ? undefined : { scale: active === s.num ? 1.4 : 1.15 }}
          whileTap={reduceMotion ? undefined : { scale: 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {s.num}
        </motion.button>
      ))}
    </nav>
  );
}
