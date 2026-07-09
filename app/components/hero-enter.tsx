"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

const STAGGER = 0.12;

const FROM_OFFSETS: Record<string, { x?: number; y?: number; scale?: number }> = {
  top: { y: -40 },
  bottom: { y: 40 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.7 },
  up: { y: 20 },
};

export default function HeroEnter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const image = ref.current.querySelector<HTMLElement>("[data-enter-image]");
    const rest = Array.from(
      ref.current.querySelectorAll<HTMLElement>("[data-enter]")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (image) gsap.set(image, { clipPath: "inset(0% 0 0% 0 round 20px)" });
      rest.forEach((el) =>
        gsap.set(el, { x: 0, y: 0, scale: 1, rotate: Number(el.dataset.enterRotate ?? 0) })
      );
      const fadeTargets = [image, ...rest].filter(Boolean) as HTMLElement[];
      if (fadeTargets.length) {
        gsap.fromTo(
          fadeTargets,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: STAGGER }
        );
      }
      return;
    }

    const tl = gsap.timeline();

    if (image) {
      // starts invisible, opens from the center line outward (top and bottom reveal simultaneously)
      tl.fromTo(
        image,
        { opacity: 0, clipPath: "inset(50% 0 50% 0 round 20px)" },
        { opacity: 1, clipPath: "inset(0% 0 0% 0 round 20px)", duration: 1.1, ease: "power3.out" },
        0
      )
        // drifts away from its resting spot, then eases back home
        .to(image, { x: 60, y: -20, duration: 0.5, ease: "power2.inOut" }, 1.0)
        .to(image, { x: 0, y: 0, duration: 0.7, ease: "power3.out" }, 1.5);
    }

    const textStart = image ? 0.55 : 0;
    rest.forEach((el, i) => {
      const start = textStart + i * STAGGER;
      const restRotate = Number(el.dataset.enterRotate ?? 0);
      const from = FROM_OFFSETS[el.dataset.enterFrom ?? "up"] ?? FROM_OFFSETS.up;
      tl.fromTo(
        el,
        {
          opacity: 0,
          x: from.x ?? 0,
          y: from.y ?? 0,
          rotate: restRotate - 6,
          scale: from.scale ?? 1.05,
        },
        { opacity: 1, x: 0, y: 0, duration: 0.45, ease: "power2.out" },
        start
      ).to(
        el,
        { rotate: restRotate, scale: 1, duration: 0.3, ease: "back.out(2.4)" },
        start + 0.18
      );
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}
