"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
import SplitReveal from "./split-reveal";
import type { Service } from "@/lib/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About({ services }: { services: Service[] }) {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    const reduceMotionMq = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".service-row");
      rows.forEach((row) => {
        const num = row.querySelector(".service-num");
        const content = row.querySelector(".service-content");
        const line = row.querySelector(".service-line");
        if (!num || !content) return;
        if (reduceMotionMq) {
          gsap.set([num, content], { opacity: 1, x: 0, scale: 1 });
          return;
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.6,
            },
          })
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none" })
          .fromTo(
            num,
            { opacity: 0, scale: 0.6, x: -20 },
            { opacity: 1, scale: 1, x: 0, ease: "power2.out" },
            "<"
          )
          .fromTo(
            content,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, ease: "power2.out" },
            "<"
          );
      });
    }, listRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="container section">
      <div className="section-head">
        <div>
          <p className="eyebrow" style={{ margin: "0 0 12px" }}>01 — What I do</p>
          <SplitReveal className="section-title" text="Interfaces that *hold up.*" />
        </div>
      </div>

      <Reveal>
        <div className="lead" style={{ marginBottom: "clamp(32px, 5vw, 56px)" }}>
          <p style={{ margin: "0 0 16px" }}>
            I care about interfaces that feel effortless — clean, fast, and
            easy to use — and I&apos;m just as comfortable across the full
            stack, taking a product from idea to something real people use.
          </p>
          <p style={{ margin: 0 }}>
            I&apos;ve built government platforms handling{" "}
            <span style={{ color: "var(--fg)" }}>1.5M+ records</span>, an
            embedded SaaS used across{" "}
            <span style={{ color: "var(--fg)" }}>10+ production platforms</span>
            , and real-time systems serving hundreds of thousands of people.
          </p>
        </div>
      </Reveal>

      <div ref={listRef}>
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="service-row"
            whileHover={reduceMotion ? undefined : { x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="service-line" aria-hidden="true" />
            <div className="service-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
