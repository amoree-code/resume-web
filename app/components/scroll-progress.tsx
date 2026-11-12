"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
    />
  );
}
