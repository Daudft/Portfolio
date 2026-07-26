"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { pad, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    title: "Discover",
    blurb:
      "We start with a deep-dive into your brand, audience and goals. I ask the uncomfortable questions early so the work answers them later.",
    deliverables: ["Strategy call", "Brand & competitor audit", "Project roadmap"],
  },
  {
    title: "Design",
    blurb:
      "Direction first, pixels second. Moodboards and prototypes evolve into high-fidelity designs you can click through — no surprises at launch.",
    deliverables: ["Art direction", "Interactive prototype", "Design system"],
  },
  {
    title: "Build",
    blurb:
      "Design is only half the promise. I build fast, accessible, motion-rich sites with modern tooling — engineered to feel as good as they look.",
    deliverables: ["Next.js development", "Motion & 3D", "CMS if you need it"],
  },
  {
    title: "Launch & grow",
    blurb:
      "QA on real devices, SEO fundamentals, analytics wired in. Then we watch the numbers and sharpen what's working.",
    deliverables: ["Performance audit", "SEO & analytics", "Post-launch support"],
  },
];

type StrokeSpec = {
  d: string;
  /** stroke width */
  w?: number;
  /** opacity of the finished stroke */
  o?: number;
  /** dashed strokes fade in instead of drawing (dasharray fights pathLength) */
  dash?: boolean;
};

/** One stroke of a line illustration that draws itself in when active. */
function Stroke({
  spec,
  delay,
  active,
}: {
  spec: StrokeSpec;
  delay: number;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const { d, w = 2, o = 1, dash } = spec;
  const drawn = reduce || dash;
  return (
    <motion.path
      d={d}
      strokeWidth={w}
      strokeDasharray={dash ? "3 6" : undefined}
      initial={false}
      animate={
        drawn
          ? { pathLength: 1, opacity: active ? o : 0 }
          : { pathLength: active ? 1 : 0, opacity: active ? o : 0 }
      }
      transition={{
        pathLength: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay },
        opacity: { duration: dash ? 0.6 : 0.25, delay: dash ? delay : delay * 0.6 },
      }}
    />
  );
}

/** Layered line illustrations per step — paper strokes on the orange. */
const ILLUSTRATIONS: StrokeSpec[][] = [
  // 01 Discover — magnifier inside a dashed radar orbit
  [
    { d: "M60,14 a46,46 0 1,0 0.1,0", dash: true, w: 1.25, o: 0.4 }, // orbit
    { d: "M50,26 a24,24 0 1,0 0.1,0", w: 2.25 }, // lens
    { d: "M67,68 L92,93", w: 2.75 }, // handle
    { d: "M40,50 a12,12 0 0,1 10,-12", w: 1.5, o: 0.8 }, // glint
    { d: "M50,42 l0.01,0", w: 4, o: 0.9 }, // focus dot
    { d: "M104,38 l6,6 M110,38 l-6,6", w: 1.25, o: 0.6 }, // sparkle
  ],
  // 02 Design — pen-tool bézier over a faint grid
  [
    { d: "M12,60 H108", dash: true, w: 1, o: 0.3 }, // grid h
    { d: "M60,12 V108", dash: true, w: 1, o: 0.3 }, // grid v
    { d: "M16,92 C36,20 84,20 104,92", w: 2.5 }, // the curve
    { d: "M16,92 L34,44", w: 1.25, o: 0.7 }, // left handle
    { d: "M104,92 L86,44", w: 1.25, o: 0.7 }, // right handle
    { d: "M30,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", w: 1.5 }, // left control
    { d: "M82,40 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", w: 1.5 }, // right control
    { d: "M12,88 h8 v8 h-8 Z", w: 1.5 }, // left anchor
    { d: "M100,88 h8 v8 h-8 Z", w: 1.5 }, // right anchor
  ],
  // 03 Build — browser window with code inside
  [
    { d: "M16,26 H104 V96 H16 Z", w: 2.25 }, // window
    { d: "M16,40 H104", w: 1.25, o: 0.8 }, // top bar
    { d: "M24,33 l0.01,0 M32,33 l0.01,0 M40,33 l0.01,0", w: 3, o: 0.9 }, // traffic lights
    { d: "M44,56 L32,68 L44,80", w: 2.25 }, // <
    { d: "M76,56 L88,68 L76,80", w: 2.25 }, // >
    { d: "M66,52 L54,84", w: 2 }, // /
    { d: "M24,50 H36", dash: true, w: 1.25, o: 0.5 }, // code line
    { d: "M84,88 H96", dash: true, w: 1.25, o: 0.5 }, // code line
  ],
  // 04 Launch & grow — chart climbing past a dashed target
  [
    { d: "M14,98 H106", w: 1.25, o: 0.7 }, // baseline
    { d: "M14,30 H106", dash: true, w: 1, o: 0.35 }, // target line
    { d: "M18,90 L42,62 L58,74 L94,30", w: 2.5 }, // the climb
    { d: "M78,30 L94,30 L94,46", w: 2.5 }, // arrowhead
    { d: "M42,62 l0.01,0 M58,74 l0.01,0", w: 4, o: 0.9 }, // data points
    { d: "M100,14 v10 M95,19 h10", w: 1.25, o: 0.6 }, // sparkle
  ],
];

/**
 * Process as horizontal blinds: four full-width bars. The active one
 * expands, floods the brand orange, and a line illustration for that
 * step draws itself in on the right.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      className="flex min-h-svh scroll-mt-24 flex-col justify-center py-16"
    >
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">Process</p>
        </Reveal>

        {/* The blinds */}
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3 md:h-[76svh] md:flex-col lg:h-[72svh]">
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <div
                  key={step.title}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative cursor-pointer overflow-hidden rounded-3xl border outline-none transition-colors duration-500",
                    isActive
                      ? "border-accent bg-accent text-paper"
                      : "border-line bg-card hover:bg-paper-2 focus-visible:bg-paper-2",
                  )}
                  style={{
                    flex: isActive ? 3.4 : 1,
                    minHeight: isActive ? "20rem" : "4.25rem",
                    transition:
                      "flex 0.8s cubic-bezier(0.16,1,0.3,1), background-color 0.5s, border-color 0.5s, color 0.5s",
                  }}
                >
                  {/* Step number — always pinned top-left */}
                  <span
                    className={cn(
                      "absolute left-5 top-5 font-mono text-sm transition-colors duration-500 sm:left-6 sm:top-6",
                      isActive ? "text-paper/80" : "text-accent",
                    )}
                  >
                    {pad(i + 1)}
                  </span>

                  {/* Collapsed bar: title only */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center pl-16 transition-opacity duration-300",
                      isActive ? "opacity-0" : "opacity-100 delay-150",
                    )}
                  >
                    <span className="font-display ml-2 whitespace-nowrap text-xl tracking-tight sm:ml-0 sm:text-2xl">
                      {step.title}
                    </span>
                  </div>

                  {/* Expanded story */}
                  <div
                    className={cn(
                      "flex h-full flex-col justify-end p-6 transition-opacity duration-400 sm:p-8",
                      isActive
                        ? "opacity-100 delay-250"
                        : "pointer-events-none opacity-0",
                    )}
                  >
                    <h3 className="font-display text-2xl tracking-tight sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/85 sm:text-base">
                      {step.blurb}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {step.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-paper/35 px-3 py-1 text-xs text-paper/85"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>

                    {/* Line illustration, drawing in on the right */}
                    <motion.div
                      aria-hidden
                      animate={
                        isActive && !reduce
                          ? { y: [0, -7, 0] }
                          : { y: 0 }
                      }
                      transition={
                        isActive && !reduce
                          ? {
                              duration: 5,
                              ease: "easeInOut",
                              repeat: Infinity,
                              delay: 1.4,
                            }
                          : { duration: 0.3 }
                      }
                      className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 text-paper md:block lg:right-14"
                    >
                      <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-36 w-36 lg:h-48 lg:w-48"
                      >
                        {ILLUSTRATIONS[i].map((spec, s) => (
                          <Stroke
                            key={s}
                            spec={spec}
                            delay={0.35 + s * 0.12}
                            active={isActive}
                          />
                        ))}
                      </svg>
                    </motion.div>

                    {/* Fine inner frame on the open card */}
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-3 rounded-2xl border border-paper/15 transition-opacity duration-700",
                        isActive ? "opacity-100 delay-300" : "opacity-0",
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
