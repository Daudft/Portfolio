"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Photo = {
  src: string;
  alt: string;
  caption: string;
  /** Relative width of the row — grows left to right, kid → today. */
  width: number;
};

const PHOTOS: Photo[] = [
  {
    src: "/childhood.webp",
    alt: "Daud as a kid in a red shirt, studio print from Lahore",
    caption: "01 · Lahore, early 2000s",
    width: 17,
  },
  {
    src: "/teen.webp",
    alt: "Teenage Daud in a Chelsea kit holding an orange football",
    caption: "02 · Number 9, big dreams",
    width: 21,
  },
  {
    src: "/now.webp",
    alt: "Daud at golden hour in a denim shirt",
    caption: "03 · Golden hour",
    width: 25.5,
  },
  {
    src: "/portrait.webp",
    alt: "Studio portrait of Daud today",
    caption: "04 · Today — your designer",
    width: 30,
  },
];

/**
 * Width also capped in vh so the whole row (plus captions and the text
 * below) always fits a single screen — 30% ↔ 33vh wide ≈ 41vh tall.
 */
const widthFor = (w: number) => `min(${w}%, ${(w * 1.1).toFixed(1)}vh)`;

/**
 * A growing-up timeline: four photos in one row, each larger than the
 * last, vertically centred. Hover trades the grayscale for full colour.
 */
export function PhotoTimeline() {
  const reduce = useReducedMotion();

  return (
    <div className="flex items-center justify-center gap-[3%]">
      {PHOTOS.map((p, i) => (
        <motion.figure
          key={p.src}
          style={{ width: widthFor(p.width) }}
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
        >
          <div className="group relative aspect-4/5 overflow-hidden rounded-xl bg-paper-2 shadow-[0_24px_50px_-28px_rgba(20,19,16,0.35)]">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 30vw, 22rem"
              className="object-cover object-top grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="eyebrow mt-3 hidden text-center sm:block">
            {p.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
