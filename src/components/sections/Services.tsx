"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { pad, cn } from "@/lib/utils";

type Service = {
  title: string;
  blurb: string;
  tags: string[];
  /** Card surface + text colors */
  shell: string;
  /** Secondary text color */
  soft: string;
  /** Tag pill border color */
  pill: string;
  /** Big index number color */
  number: string;
};

const SERVICES: Service[] = [
  {
    title: "Web Design",
    blurb:
      "Editorial, conversion-first websites — designed from wireframe to pixel so your brand feels unmistakable, and gets chosen.",
    tags: ["UX/UI", "Design Systems", "Prototyping", "Responsive"],
    shell: "bg-card text-ink border border-line",
    soft: "text-ink-soft",
    pill: "border-line text-muted",
    number: "text-accent",
  },
  {
    title: "Web Development",
    blurb:
      "Fast, accessible, motion-rich builds with Next.js and React — clean code engineered to feel as good as it looks.",
    tags: ["Next.js", "React", "Animation", "CMS"],
    shell: "bg-accent-soft text-ink border border-line",
    soft: "text-ink-soft",
    pill: "border-ink/15 text-ink/60",
    number: "text-accent",
  },
  {
    title: "Product & Software",
    blurb:
      "Interfaces for web apps, dashboards and SaaS — complex flows made calm, clear and ready to ship.",
    tags: ["Web Apps", "SaaS", "Dashboards", "Design Systems"],
    shell: "bg-ink text-paper border border-ink",
    soft: "text-paper/70",
    pill: "border-paper/25 text-paper/60",
    number: "text-accent",
  },
];

function Card({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const isLast = index === total - 1;

  // While the next card slides over this one, this card recedes —
  // scaling down slightly and dimming, for depth.
  const start = index / (total - 1);
  const end = (index + 1) / (total - 1);
  const scale = useTransform(progress, [start, end], [1, 0.93]);
  const dim = useTransform(progress, [start, end], [0, 0.25]);

  return (
    <div
      className="sticky top-0 flex h-svh items-center"
      style={{ zIndex: index + 1 }}
    >
      <div className="container-x w-full">
        <motion.article
          style={reduce || isLast ? undefined : { scale }}
          className={cn(
            "relative mx-auto flex h-[68svh] w-full max-w-4xl flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-[0_30px_60px_-30px_rgba(20,19,16,0.35)] sm:p-10",
            service.shell,
          )}
        >
          {/* Top row: label + count */}
          <div className="flex items-start justify-between">
            <p className="eyebrow text-current/60!">Services</p>
            <span className={cn("font-mono text-sm", service.soft)}>
              {pad(index + 1)} / {pad(total)}
            </span>
          </div>

          {/* Middle: number + title + blurb */}
          <div>
            <span
              className={cn(
                "font-display block text-5xl leading-none sm:text-6xl",
                service.number,
              )}
            >
              {pad(index + 1)}
            </span>
            <h3 className="font-display mt-3 max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              {service.title}
            </h3>
            <p
              className={cn(
                "mt-5 max-w-lg leading-relaxed",
                service.soft,
              )}
            >
              {service.blurb}
            </p>
          </div>

          {/* Bottom row: tags + CTA */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <ul className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    service.pill,
                  )}
                >
                  {tag}
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="link-underline inline-flex items-center gap-1.5 text-sm"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Dimming veil while the next card covers this one */}
          {!reduce && !isLast && (
            <motion.div
              aria-hidden
              style={{ opacity: dim }}
              className="pointer-events-none absolute inset-0 rounded-3xl bg-ink"
            />
          )}
        </motion.article>
      </div>
    </div>
  );
}

/**
 * Services as a scroll-pinned card stack: each card holds the screen,
 * then the next one rides up and covers it.
 */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id="services" className="relative scroll-mt-24">
      {SERVICES.map((service, i) => (
        <Card
          key={service.title}
          service={service}
          index={i}
          total={SERVICES.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  );
}
