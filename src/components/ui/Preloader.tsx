"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { pad } from "@/lib/utils";

/**
 * Preloader with a 0 → 100 count in the accent color, then the curtain
 * slides up to reveal the site. Exposes `done` via context so the hero
 * can hold its entrance animations until the reveal.
 */
const PreloaderContext = createContext(true);

export function usePreloaderDone() {
  return useContext(PreloaderContext);
}

const COUNT_MS = 2800; // how long 0→100 takes
const EXIT_DELAY_MS = 450; // beat after hitting 100 before the curtain lifts

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }

    // lock scroll while loading
    document.documentElement.style.overflow = "hidden";

    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => setDone(true), EXIT_DELAY_MS);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      document.documentElement.style.overflow = "";
    };
  }, [reduce]);

  // release scroll once the curtain starts lifting
  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <PreloaderContext.Provider value={done}>
      <AnimatePresence>
        {!done && !reduce && (
          <motion.div
            key="preloader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-90 flex flex-col justify-between bg-paper px-[clamp(1.25rem,5vw,4rem)] py-8"
            aria-hidden
          >
            {/* Name + role, left-centred */}
            <div className="pointer-events-none absolute inset-y-0 left-[clamp(1.25rem,5vw,4rem)] flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              >
                <p className="font-display text-6xl leading-[1.02] tracking-tight sm:text-8xl">
                  {site.name}
                  <span className="text-accent">.</span>
                </p>
                <p className="font-display mt-4 text-2xl tracking-tight text-ink-soft sm:text-3xl">
                  Creative <span className="italic">Designer</span>
                  <span className="text-accent"> &amp; </span>
                  Developer
                </p>
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="absolute left-0 top-0 h-0.5 w-full bg-line">
              <div
                className="h-full bg-accent transition-[width] duration-100 ease-linear"
                style={{ width: `${count}%` }}
              />
            </div>

            {/* Big count, bottom-right, in the accent orange */}
            <div className="flex items-end justify-between">
              <p className="eyebrow mb-3 hidden sm:block">
                Crafting the experience…
              </p>
              <span className="font-display text-[22vw] leading-[0.8] tracking-tight text-accent sm:text-[14rem]">
                {pad(count, count === 100 ? 3 : 2)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PreloaderContext.Provider>
  );
}
