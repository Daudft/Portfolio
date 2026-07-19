"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { TextRoll } from "./TextRoll";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 text-sm font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:pointer-events-none";

const sizes = "h-12 px-6";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-paper hover:bg-ink-soft",
  outline: "border border-line text-ink hover:border-ink",
  ghost: "text-ink hover:text-muted",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type AsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: never;
};

export function Button(props: AsLink | AsButton) {
  const {
    children,
    variant = "solid",
    className,
    arrow = false,
    magnetic = false,
  } = props;

  const classes = cn(base, sizes, variants[variant], className);

  const inner = (
    <>
      <TextRoll className="relative z-10">{children}</TextRoll>
      {arrow && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  const element =
    "href" in props && props.href !== undefined ? (
      props.external ? (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      ) : (
        <Link href={props.href} className={classes}>
          {inner}
        </Link>
      )
    ) : (
      <button
        type={props.type ?? "button"}
        onClick={props.onClick}
        disabled={props.disabled}
        className={classes}
      >
        {inner}
      </button>
    );

  if (!magnetic) return element;
  return <Magnetic strength={0.25}>{element}</Magnetic>;
}
