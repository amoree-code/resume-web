"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./reveal";

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const hover = (extra?: object) =>
    reduceMotion ? undefined : { scale: 1.03, ...extra };
  const tap = reduceMotion ? undefined : { scale: 0.97 };
  return (
    <section
      id="contact"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: 1120,
        margin: "0 auto",
        padding: "40px 24px 30px",
      }}
    >
      <Reveal>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 18,
            background: "var(--panel)",
            padding: "56px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 55%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 12, color: "var(--faint)", marginBottom: 14 }}>
              $ <span style={{ color: "var(--accent)" }}>./say-hello.sh</span>
              <span style={{ animation: "blink 1s step-end infinite" }}>▊</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-merienda), cursive",
                fontWeight: 900,
                fontSize: 40,
                margin: "0 0 16px",
              }}
            >
              Let&apos;s build something
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                maxWidth: 440,
                margin: "0 auto 28px",
                lineHeight: 1.7,
              }}
            >
              Open to front-end and full-stack roles. Reach out and
              I&apos;ll get back within a day.
            </p>
            <motion.a
              href="mailto:amir.abdulkarim.jabbar@gmail.com"
              style={{
                background: "color-mix(in srgb, var(--accent) 80%, black)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                display: "inline-block",
                textDecoration: "none",
              }}
              whileHover={hover()}
              whileTap={tap}
              transition={SPRING}
            >
              amir.abdulkarim.jabbar@gmail.com
            </motion.a>
            <div
              style={{
                display: "flex",
                gap: 22,
                justifyContent: "center",
                marginTop: 26,
                fontSize: 12.5,
              }}
            >
              <motion.a
                className="navlink"
                href="#"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                GitHub ↗
              </motion.a>
              <motion.a
                className="navlink"
                href="#"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                LinkedIn ↗
              </motion.a>
              <motion.a
                className="navlink"
                href="tel:+9647777665783"
                style={{ color: "var(--muted)", textDecoration: "none" }}
                whileHover={hover()}
                whileTap={tap}
                transition={SPRING}
              >
                +964 777 766 5783
              </motion.a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
