import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-padded index, e.g. 1 -> "01". */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}
