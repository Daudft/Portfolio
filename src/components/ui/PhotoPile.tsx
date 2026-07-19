"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";

type Polaroid = {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  left: string;
  top: string;
  width: string;
};

/** In age order — the visitor reads the pile as a timeline. */
const POLAROIDS: Polaroid[] = [
  {
    src: "/childhood.webp",
    alt: "Daud as a kid in a red shirt, studio print from Lahore",
    caption: "01 · Lahore, early 2000s",
    rotate: -7,
    left: "4%",
    top: "4%",
    width: "38%",
  },
  {
    src: "/teen.webp",
    alt: "Teenage Daud in a Chelsea kit holding an orange football",
    caption: "02 · Number 9, big dreams",
    rotate: 6,
    left: "56%",
    top: "10%",
    width: "38%",
  },
  {
    src: "/now.webp",
    alt: "Daud at golden hour in a denim shirt",
    caption: "03 · Golden hour",
    rotate: 4,
    left: "8%",
    top: "52%",
    width: "36%",
  },
  {
    src: "/portrait.webp",
    alt: "Studio portrait of Daud today",
    caption: "04 · Today — your designer",
    rotate: -4,
    left: "54%",
    top: "54%",
    width: "36%",
  },
];

/**
 * Dotted journey lines between the photos (viewBox 0 0 100 120 — same
 * coordinate space as the desk). Each segment draws on AFTER the photo it
 * leaves, and the next photo pops in as the arrow lands.
 */
const SEGMENTS = [
  // 01 → 02: arc over the top gap
  { d: "M 44 15 C 49 5, 53 7, 57 15", end: [57, 15] },
  // 02 → 03: big swoop down and left
  { d: "M 80 70 C 94 86, 60 78, 46 73", end: [46, 73] },
  // 03 → 04: little valley along the bottom
  { d: "M 42 112 C 47 120, 52 120, 56 113", end: [56, 113] },
];

/** Beat length between photo appearances. */
const STEP = 1.5;

export function PhotoPile() {
  const deskRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // One central trigger: the show starts only once the desk is ~60% on
  // screen (per-element in-view checks fail for paths inside <mask>).
  const inView = useInView(deskRef, { once: true, amount: 0.6 });
  const play = reduce || inView;

  return (
    <div>
      <div
        ref={deskRef}
        className="relative mx-auto aspect-10/12 w-full max-w-104"
      >
        {/* ---- Journey lines ------------------------------------------- */}
        <svg
          viewBox="0 0 100 120"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden
        >
          {SEGMENTS.map((s, i) => (
            <g key={i}>
              {/* fine hairline that draws itself along the curve */}
              <motion.path
                d={s.d}
                stroke="var(--color-accent)"
                strokeWidth={0.8}
                strokeLinecap="round"
                opacity={0.55}
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: play ? 1 : 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.65, 0, 0.35, 1],
                  delay: play ? 0.75 + i * STEP : 0,
                }}
              />
              {/* a small dot lands where the next memory appears */}
              <motion.circle
                cx={s.end[0]}
                cy={s.end[1]}
                r={1.4}
                fill="var(--color-accent)"
                initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0 }}
                animate={{
                  opacity: play ? 1 : 0,
                  scale: play ? 1 : 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                  delay: play ? 1.8 + i * STEP : 0,
                }}
                style={{
                  transformOrigin: `${s.end[0]}px ${s.end[1]}px`,
                }}
              />
            </g>
          ))}
        </svg>

        {/* ---- Polaroids, appearing along the journey ------------------- */}
        {POLAROIDS.map((p, i) => (
          <motion.div
            key={p.src}
            drag
            dragConstraints={deskRef}
            dragElastic={0.18}
            dragMomentum={false}
            whileDrag={{ scale: 1.07, rotate: 0, zIndex: 30 }}
            whileHover={{ scale: 1.03, zIndex: 20 }}
            initial={reduce ? undefined : { opacity: 0, y: 34, rotate: 0 }}
            animate={
              play
                ? { opacity: 1, y: 0, rotate: p.rotate }
                : { opacity: 0, y: 34, rotate: 0 }
            }
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: play ? 0.2 + i * STEP : 0,
            }}
            className="absolute cursor-grab active:cursor-grabbing"
            style={{ left: p.left, top: p.top, width: p.width }}
          >
            <div className="rounded-md bg-accent p-2 pb-2.5 shadow-[0_16px_40px_-18px_rgba(194,65,12,0.45)]">
              {/* ink tape */}
              <span
                aria-hidden
                className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 rounded-xs bg-ink/70 shadow-sm"
              />
              <div className="relative aspect-4/5 overflow-hidden rounded-sm">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="10rem"
                  draggable={false}
                  className="pointer-events-none select-none object-cover object-top grayscale contrast-[1.05]"
                />
              </div>
              <p className="font-display mt-2 text-center text-xs italic leading-snug text-paper">
                {p.caption}
              </p>
            </div>
          </motion.div>
        ))}

      </div>

      <p className="eyebrow mt-6 text-center">
        Go on — drag the memories around{" "}
        <span className="text-accent">✦</span>
      </p>
    </div>
  );
}
