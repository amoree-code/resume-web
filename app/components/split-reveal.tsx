"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Token = { word: string; em: boolean };

// "Selected *work*" → words, with the *starred* run rendered as the italic accent.
function tokenize(text: string): Token[] {
  return text
    .split("*")
    .flatMap((run, i) =>
      run
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, em: i % 2 === 1 }))
    );
}

export default function SplitReveal({
  text,
  as: Tag = "h2",
  className,
  trigger = "scroll",
  delay = 0,
  prefix,
  label,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  trigger?: "scroll" | "mount";
  delay?: number;
  /** Static content rendered before the animated words, e.g. a name line inside the h1. */
  prefix?: ReactNode;
  /** Accessible name override when `prefix` adds words the plain text does not carry. */
  label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const tokens = tokenize(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".split-word > span"),
        // y: 0 — GSAP would otherwise adopt the CSS first-paint guard's translateY as a
        // permanent base offset, leaving every word parked below its mask.
        { y: 0, yPercent: 110, rotate: 4 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          delay,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
              : undefined,
        }
      );
    }, el);
    return () => ctx.revert();
  }, [trigger, delay]);

  return (
    <Tag ref={ref as never} className={className} aria-label={label ?? text.replaceAll("*", "")}>
      {prefix}
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <span className="split-word" aria-hidden="true">
            <span>{t.em ? <em>{t.word}</em> : t.word}</span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
