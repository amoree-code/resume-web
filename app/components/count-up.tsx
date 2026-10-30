"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Counts the numeric part of a stat like "1.5M+" up from zero once it scrolls into view.
export default function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!el || !match || !inView || reduceMotion) return;
    const [, prefix, num, suffix] = match;
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    // start from zero right away so the final value never shows before the count
    el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
    const controls = animate(0, parseFloat(num), {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, delay]);

  return <span ref={ref}>{value}</span>;
}
