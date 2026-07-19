import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Rolling label for buttons/links: on `group` hover the text slides up and
 * an identical copy rolls in from below. Pure CSS (group-hover) so it works
 * on any element that carries the `group` class — easing per the
 * motion-framer skill's smooth cubic-bezier guidance.
 */
export function TextRoll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[110%]">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
