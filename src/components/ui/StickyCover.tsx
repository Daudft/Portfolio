"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pins its content when its bottom edge reaches the viewport bottom, so the
 * next sibling (with a higher z-index and opaque background) scrolls up and
 * covers it — the "stacking sheets" effect, working for content of ANY
 * height. For content taller than the viewport it scrolls through fully
 * first; a 100svh section pins at the top like a classic cover.
 */
export function StickyCover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () =>
      setTop(Math.min(0, window.innerHeight - el.offsetHeight));

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("sticky z-0", className)}
      style={top === null ? undefined : { top }}
    >
      {children}
    </div>
  );
}
