"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { usePreloaderDone } from "@/components/ui/Preloader";
import { TextRoll } from "@/components/ui/TextRoll";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const PORTRAIT_SRC = "/portrait.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: 0.85 + i * 0.12 },
  }),
};

/**
 * Statement hero: a bold two-line promise fills the page, the portrait
 * cutout rises over it from the fold, and the working elements (pitch,
 * CTA, availability) hold the bottom corners.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const done = usePreloaderDone();
  const ready = reduce || done;
  const [hasPhoto, setHasPhoto] = useState(true);

  // As the next section scrolls up to cover the hero, the hero gently
  // recedes — scaling down and dimming for a sense of depth.
  const { scrollY } = useScroll();
  const coverScale = useTransform(scrollY, [0, 900], [1, 0.94]);
  const coverOpacity = useTransform(scrollY, [0, 900], [1, 0.45]);

  return (
    <motion.section
      id="top"
      style={reduce ? undefined : { scale: coverScale, opacity: coverOpacity }}
      className="sticky top-0 z-0 flex min-h-svh flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute left-1/2 top-[66%] z-10 w-[min(72vw,13rem)] -translate-x-1/2 -translate-y-1/2 sm:top-[46%] sm:w-[min(56vw,17rem)] sm:w-76 md:hidden">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 48, scale: 0.96 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 48, scale: 0.96 }
          }
          transition={{ duration: 1.15, ease: EASE, delay: 0.55 }}
          className="relative aspect-4/5 overflow-hidden rounded-xl bg-paper-2 shadow-[0_30px_70px_-30px_rgba(20,19,16,0.35)]"
        >
          {hasPhoto ? (
            <Image
              src={PORTRAIT_SRC}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(max-width: 640px) 72vw, 13rem"
              className="object-cover object-top grayscale contrast-[1.05]"
              onError={() => setHasPhoto(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-8xl text-accent/25">DA</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 hidden w-[min(56vw,17rem)] -translate-x-1/2 -translate-y-1/2 sm:w-76 md:block">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 48, scale: 0.96 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 48, scale: 0.96 }
          }
          transition={{ duration: 1.15, ease: EASE, delay: 0.55 }}
          className="relative aspect-4/5 overflow-hidden rounded-xl bg-paper-2 shadow-[0_30px_70px_-30px_rgba(20,19,16,0.35)]"
        >
          {hasPhoto ? (
            <Image
              src={PORTRAIT_SRC}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(max-width: 640px) 72vw, 13rem"
              className="object-cover object-top grayscale contrast-[1.05]"
              onError={() => setHasPhoto(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-8xl text-accent/25">DA</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="container-x relative z-20 mt-auto flex flex-col gap-8 pb-12 pt-28 sm:pb-16 sm:pt-20 md:grid md:grid-cols-2 md:items-end md:pb-20 md:pt-0">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate={ready ? "show" : "hidden"}
          className="max-w-full sm:max-w-[28rem]"
        >
          <h1 className="font-display text-[2.5rem] leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Turn clicks
            <br />
            into <span className="italic">clients</span>
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-full leading-relaxed text-ink-soft sm:max-w-72">
            I help growing brands and startups gain an unfair advantage through
            premium, results-driven websites.
          </p>
          <div className="mt-7">
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 bg-accent px-7 font-mono text-xs font-medium uppercase tracking-[0.18em] text-paper sm:w-auto sm:justify-start"
            >
              <TextRoll>Book a call</TextRoll>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        </motion.div>

        <motion.figure
          custom={1}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate={ready ? "show" : "hidden"}
          className="hidden max-w-72 text-right md:block md:justify-self-end"
        >
          <blockquote className="text-sm leading-relaxed text-ink-soft">
            &ldquo;Our old website got compliments. The one Daud built{" "}
            <span className="text-accent">gets us customers</span>. Best money
            we&rsquo;ve spent this year.&rdquo;
          </blockquote>
          <figcaption className="font-display mt-2 italic text-muted">
            — Sarah, founder at Lumen Studio
          </figcaption>
        </motion.figure>
      </div>
    </motion.section>
  );
}
