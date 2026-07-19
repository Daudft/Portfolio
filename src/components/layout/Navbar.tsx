"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { TextRoll } from "@/components/ui/TextRoll";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-20">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-lg tracking-tight"
            onClick={() => setOpen(false)}
          >
            {site.name}
            <span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <TextRoll>{item.label}</TextRoll>
              </Link>
            ))}
          </div>

          {/* Right: availability + CTA (desktop) */}
          <div className="hidden items-center gap-5 md:flex">
            {site.availableForWork && (
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available
              </span>
            )}
            <Link
              href="/contact"
              className="group bg-ink px-5 py-2.5 text-sm font-medium text-paper"
            >
              <TextRoll>Let&rsquo;s talk</TextRoll>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-ink"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-6 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-ink"
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            <div className="container-x flex h-full flex-col justify-center gap-2 pt-16">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group font-display block py-3 text-5xl tracking-tight"
                  >
                    <TextRoll>{item.label}</TextRoll>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-10 flex flex-col gap-1 text-sm text-muted">
                <a href={`mailto:${site.email}`} className="link-underline w-fit">
                  {site.email}
                </a>
                <span>{site.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
