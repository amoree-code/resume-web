"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./reveal";
import SplitReveal from "./split-reveal";
import { CONTACT_LINKS } from "@/lib/contact";

const emailLink = CONTACT_LINKS.find((l) => l.label === "Email")!;
const githubLink = CONTACT_LINKS.find((l) => l.label === "GitHub")!;
const linkedinLink = CONTACT_LINKS.find((l) => l.label === "LinkedIn")!;
const phoneLink = CONTACT_LINKS.find((l) => l.label === "Phone")!;

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : { y: -2 };
  const tap = reduceMotion ? undefined : { scale: 0.97 };

  const secondary = [
    { label: "GitHub ↗", href: githubLink.href, external: true },
    { label: "LinkedIn ↗", href: linkedinLink.href, external: true },
    { label: "WhatsApp ↗", href: "https://wa.me/9647777665783", external: true },
    { label: "+964 777 766 5783", href: phoneLink.href, external: false },
  ];

  return (
    <section id="contact" className="container section">
      <Reveal>
        <div className="contact-card">
          <div className="contact-glow" aria-hidden="true" />
          <div style={{ position: "relative" }}>
            <p className="eyebrow" style={{ margin: "0 0 8px" }}>05 — Contact</p>
            <p className="mono contact-prompt">
              $ <span style={{ color: "var(--accent)" }}>./say-hello.sh</span>
              <span className="contact-caret" aria-hidden="true">▊</span>
            </p>
            <SplitReveal className="section-title" text="Let's build *something.*" />
            <p className="lead" style={{ margin: "18px auto 32px" }}>
              Open to front-end and full-stack roles, remote or on-site. Reach
              out and I&apos;ll get back within a day.
            </p>
            <motion.a
              href={emailLink.href}
              className="btn btn-primary contact-email"
              data-magnetic
              whileHover={hover}
              whileTap={tap}
              transition={SPRING}
            >
              {emailLink.href.replace("mailto:", "")}
            </motion.a>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <nav id="keep-in-touch" aria-label="Other contact links" className="contact-links">
          {secondary.map((l) => (
            <motion.a
              key={l.label}
              className="navlink"
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              whileHover={hover}
              whileTap={tap}
              transition={SPRING}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>
      </Reveal>
    </section>
  );
}
