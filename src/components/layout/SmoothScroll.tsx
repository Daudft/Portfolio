"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

/**
 * True document position of an anchor target, accounting for the pinned
 * "sticky sheet" layout. A plain rect measurement lies once a section's
 * StickyCover is pinned (its rect stays at the viewport top), so we anchor
 * the measurement to the sticky wrapper's static parent — sheet divs are
 * never sticky themselves, so their positions are always accurate.
 */
function resolveTarget(el: HTMLElement) {
  const docTop = (node: Element) =>
    node.getBoundingClientRect().top + window.scrollY;

  let node: HTMLElement | null = el;
  let sticky: HTMLElement | null = null;
  while (node && node !== document.body) {
    if (getComputedStyle(node).position === "sticky") {
      sticky = node;
      break;
    }
    node = node.parentElement;
  }

  const margin = parseFloat(getComputedStyle(el).scrollMarginTop || "0") || 0;

  if (!sticky || !sticky.parentElement) {
    // No pinning involved — a plain measurement is reliable.
    return docTop(el) - margin;
  }

  // Flow offset of the target inside its sticky wrapper stays accurate
  // even while pinned (both rects shift together).
  const inner =
    el.getBoundingClientRect().top - sticky.getBoundingClientRect().top;

  // Sheet-leading sections (inner ≈ 0) should land flush at the top so
  // they fully cover the pinned section behind them; mid-sheet targets
  // respect their scroll margin to clear the fixed navbar.
  const base = docTop(sticky.parentElement) + inner;
  return Math.abs(inner) < 2 ? base : base - margin;
}

/** Intercepts same-page hash links and drives them through Lenis. */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;

      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.pathname !== window.location.pathname ||
        !url.hash
      )
        return; // cross-page links stay with Next's router

      const el = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );
      if (!el) return;

      e.preventDefault(); // also tells next/link to stand down
      history.pushState(null, "", url.hash);

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      lenis.scrollTo(resolveTarget(el), {
        duration: 1.5,
        immediate: reduce,
      });
    };

    // Capture phase, so we run before next/link's own click handling.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}

/**
 * Buttery smooth scrolling via Lenis, wrapping the whole app.
 * Respects reduced-motion (Lenis falls back to native scroll).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}
