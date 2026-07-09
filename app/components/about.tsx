"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./reveal";
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
        if (!num || !content) return;
        if (reduceMotionMq) {
          gsap.set([num, content], { opacity: 1, x: 0, scale: 1 });
          return;
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 75%",
              end: "top 35%",
              scrub: 0.6,
            },
          })
          .fromTo(
            num,
            { opacity: 0, scale: 0.6, x: -20 },
            { opacity: 1, scale: 1, x: 0, ease: "power2.out" }
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
    <section
      id="about"
      style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "110px 24px 70px",
      }}
    >
      <Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            marginBottom: 30,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-merienda), cursive",
              fontWeight: 700,
              fontSize: 32,
              margin: 0,
            }}
          >
            What I do
          </h2>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
      </Reveal>

      <Reveal>
        <div
          style={{
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.85,
            maxWidth: 720,
            marginBottom: 40,
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            I care about interfaces that feel effortless — clean, fast, and
            easy to use. I&apos;m just as comfortable working across the full
            stack, taking a product from idea to something real people use.
          </p>
          <p style={{ margin: 0 }}>
            I&apos;ve built large-scale government platforms handling{" "}
            <span style={{ color: "var(--fg)" }}>1.5M+ records</span>,
            embedded SaaS products used across{" "}
            <span style={{ color: "var(--fg)" }}>
              10+ production platforms
            </span>
            , and real-time systems serving hundreds of thousands of people.
            I focus on writing code that performs well and that a team can
            actually maintain and grow.
          </p>
        </div>
      </Reveal>

      <div ref={listRef}>
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className="service-row"
            style={{
              minHeight: "48vh",
              borderTop: i === 0 ? "none" : "1px solid var(--border)",
            }}
            whileHover={reduceMotion ? undefined : { x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className="service-num"
              style={{
                fontFamily: "var(--font-merienda), cursive",
                fontSize: 48,
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="service-content">
              <h3
                style={{
                  fontFamily: "var(--font-merienda), cursive",
                  fontWeight: 700,
                  fontSize: 26,
                  margin: "0 0 12px",
                  color: "var(--fg)",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  maxWidth: 620,
                  margin: 0,
                }}
              >
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
