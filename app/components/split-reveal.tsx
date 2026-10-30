"use client";

import { Fragment, useEffect, useRef } from "react";
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
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  trigger?: "scroll" | "mount";
  delay?: number;
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
        { yPercent: 110, rotate: 4 },
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
    <Tag ref={ref as never} className={className} aria-label={text.replaceAll("*", "")}>
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
