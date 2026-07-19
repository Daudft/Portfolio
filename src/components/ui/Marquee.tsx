import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates its children so the loop is seamless.
 */
export function Marquee({
  items,
  className,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{item}</span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
