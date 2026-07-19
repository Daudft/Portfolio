"use client";

import { createElement } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

type Props = {
  /** Plain text, or segments for mixed styling (e.g. a serif accent word). */
  text?: string;
  segments?: Segment[];
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
};

const wordVariants: Variants = {
  hidden: { y: "115%" },
  show: (delay: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/**
 * Word-by-word mask reveal — each word slides up from behind a clip.
 *
 * The in-view trigger lives on an UNCLIPPED wrapper and propagates to the
 * words via variants: a word translated inside its overflow-hidden mask is
 * "invisible" to IntersectionObserver, so watching the words themselves
 * would never fire.
 */
export function AnimatedHeading({
  text,
  segments,
  as = "h2",
  className,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const parts: Segment[] = segments ?? [{ text: text ?? "" }];
  const label = parts.map((p) => p.text).join(" ");

  if (reduce) {
    return createElement(
      as,
      { className },
      parts.map((p, i) => (
        <span key={i} className={p.className}>
          {p.text}
          {i < parts.length - 1 ? " " : ""}
        </span>
      )),
    );
  }

  let wordIndex = 0;
  return createElement(
    as,
    { className, "aria-label": label },
    <motion.span
      className="block"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {parts.map((part, pi) => {
        const words = part.text.split(" ");
        return (
          <span key={pi} className={cn("inline", part.className)}>
            {words.map((word, wi) => {
              const idx = wordIndex++;
              return (
                <span
                  key={wi}
                  aria-hidden
                  className="inline-flex overflow-hidden align-bottom"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={wordVariants}
                    custom={delay + idx * 0.055}
                  >
                    {word}
                  </motion.span>
                  {wi < words.length - 1 ? " " : pi < parts.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </motion.span>,
  );
}
