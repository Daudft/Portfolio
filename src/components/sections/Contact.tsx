import { site } from "@/lib/site";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line py-[var(--spacing-section)]"
    >
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left column — invitation + details */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4">Contact</p>
          </Reveal>
          <AnimatedHeading
            as="h2"
            segments={[
              { text: "Let's build" },
              { text: "something great.", className: "font-display italic text-accent" },
            ]}
            className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-ink-soft leading-relaxed">
              Tell me about your project and I&rsquo;ll reply within a couple of
              days. Prefer email? Reach me directly below.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 space-y-6">
              <div>
                <p className="eyebrow mb-1">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline text-lg text-ink"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-1">Elsewhere</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink-soft"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
              {site.availableForWork && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {site.availabilityLabel}
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {/* Right column — form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
