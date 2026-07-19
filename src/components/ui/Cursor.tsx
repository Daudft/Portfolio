"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A quiet cursor companion: a slim ring that trails the native cursor
 * (which stays visible). On interactive elements it eases slightly larger
 * and warms to the accent color. Fine-pointer devices only.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHovering(
        !!t?.closest("a, button, [data-cursor='hover'], input, textarea"),
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-100 hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full border"
        animate={{
          width: hovering ? 34 : 22,
          height: hovering ? 34 : 22,
          x: hovering ? -17 : -11,
          y: hovering ? -17 : -11,
          borderColor: hovering
            ? "rgba(194,65,12,0.65)"
            : "rgba(20,19,16,0.22)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      />
    </motion.div>
  );
}
