import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="font-display text-7xl tracking-tight sm:text-9xl">
        Lost the thread<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-sm text-ink-soft">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        Let&rsquo;s get you back on track.
      </p>
      <div className="mt-10 flex gap-4">
        <Button href="/" arrow>
          Back home
        </Button>
        <Button href="/projects" variant="outline">
          View work
        </Button>
      </div>
    </section>
  );
}
