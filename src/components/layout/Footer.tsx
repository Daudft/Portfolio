import { site } from "@/lib/site";

export function Footer() {
  const year = "2026"; // update yearly, or wire to a build-time constant

  return (
    <footer className="relative flex min-h-svh flex-col pt-20">
      {/* Big "let's work together" call to action — fills the middle */}
      <div className="container-x flex flex-1 flex-col justify-center py-12">
        <p className="eyebrow mb-6">Have a project in mind?</p>
        <a
          href={`mailto:${site.email}`}
          className="font-display block max-w-4xl text-balance text-5xl leading-[1.05] tracking-tight transition-colors hover:text-muted sm:text-7xl lg:text-8xl"
        >
          Let&rsquo;s make something
          <span className="text-accent"> worth remembering.</span>
        </a>
        <div className="mt-10">
          <a
            href={`mailto:${site.email}`}
            className="link-underline text-lg text-ink-soft"
          >
            {site.email}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.role}</p>
          <p className="mt-1 text-sm text-muted">{site.location}</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm text-ink-soft"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container-x border-t border-line py-6 text-xs text-muted">
        <span>
          © {year} {site.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
