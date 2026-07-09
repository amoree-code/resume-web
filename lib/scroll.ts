import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const HEADER_OFFSET = -80;

export function smoothScrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
