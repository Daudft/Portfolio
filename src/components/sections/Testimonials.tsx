"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

const INTERVAL_MS = 7000;

/**
 * Sample testimonials — replace with real client quotes.
 * Each quote is split so its money phrase can be highlighted, and each
 * carries the hard result behind it — proof sells, praise doesn't.
 */
const testimonials = [
  {
    pre: "Our old website got compliments. The one Daud built ",
    highlight: "gets us customers",
    post: ". Best money we've spent this year.",
    name: "Sarah Mitchell",
    role: "Founder, Lumen Studio",
    initials: "SM",
    metric: { value: "2×", label: "enquiries after launch", client: "Lumen Studio" },
  },
  {
    pre: "The rare designer who obsesses over both the pixels and the numbers. Our ",
    highlight: "signup conversion jumped 52%",
    post: " and the site still feels effortless.",
    name: "James Okonkwo",
    role: "CEO, Atlas",
    initials: "JO",
    metric: { value: "+52%", label: "signup conversion", client: "Atlas" },
  },
  {
    pre: "Every detail felt considered — the motion, the type, the pacing. Working with Daud was ",
    highlight: "the calmest launch we've ever had",
    post: ".",
    name: "Elena Rossi",
    role: "Creative Director, Form & Field",
    initials: "ER",
    metric: { value: "0", label: "surprises at launch", client: "Form & Field" },
  },
];

/**
 * Reviews as proof: a spotlight quote with its money phrase in the brand
 * accent, and the results themselves as tabs — scan the numbers first,
 * read the words second. Auto-rotates; any tab click takes over.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[index];

  // Auto-advance; re-arming on index change means any manual pick
  // restarts the clock.
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [reduce, index]);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 rounded-t-3xl bg-paper-2/50 pb-16 pt-[var(--spacing-section)]"
    >
      <div className="container-x">
        {/* Social proof header */}
        <Reveal>
          <div className="flex flex-col items-center gap-3">
            <p className="eyebrow">What clients say</p>
            <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 text-accent"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
              <span className="ml-2 font-mono text-xs text-muted">
                5.0 — founders &amp; teams I&rsquo;ve shipped with
              </span>
            </div>
          </div>
        </Reveal>

        {/* Spotlight quote */}
        <div className="relative mx-auto mt-14 max-w-4xl text-center">
          <span
            aria-hidden
            className="font-display pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 text-[9rem] leading-none text-accent/15"
          >
            &ldquo;
          </span>

          <div className="min-h-[16rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 24, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? { opacity: 0 }
                    : { opacity: 0, y: -24, filter: "blur(6px)" }
                }
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="font-display text-balance text-2xl leading-snug tracking-tight sm:text-3xl lg:text-4xl">
                  {t.pre}
                  <em className="text-accent">{t.highlight}</em>
                  {t.post}
                </blockquote>

                <figcaption className="mt-8 flex items-center justify-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft font-mono text-xs font-medium text-ink">
                    {t.initials}
                  </span>
                  <span className="text-left">
                    <p className="font-medium text-ink">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        {/* The results are the navigation */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {testimonials.map((item, i) => {
            const isActive = index === i;
            return (
              <button
                key={`${item.name}-${i}`}
                onClick={() => setIndex(i)}
                aria-pressed={isActive}
                aria-label={`Show review from ${item.name}`}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-400",
                  isActive
                    ? "border-accent bg-accent text-paper"
                    : "border-line bg-card hover:bg-paper-2",
                )}
              >
                <span className="font-display block text-3xl tracking-tight">
                  {item.metric.value}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-xs leading-snug",
                    isActive ? "text-paper/80" : "text-muted",
                  )}
                >
                  {item.metric.label}
                </span>
                <span
                  className={cn(
                    "mt-3 block font-mono text-[0.65rem] uppercase tracking-[0.18em]",
                    isActive ? "text-paper/60" : "text-faint",
                  )}
                >
                  {item.metric.client}
                </span>

                {/* Auto-advance progress on the active tab */}
                {isActive && !reduce && (
                  <motion.span
                    key={index}
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-paper/60"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
