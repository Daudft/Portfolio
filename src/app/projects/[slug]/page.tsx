import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, getProject, getProjectNav } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

type Params = { slug: string };

// Pre-render every case study at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNav(slug);

  return (
    <article className="pt-32 md:pt-40">
      {/* Back link */}
      <div className="container-x">
        <Link
          href="/projects"
          className="link-underline inline-flex items-center gap-2 text-sm text-muted"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> All work
        </Link>
      </div>

      {/* Header */}
      <header className="container-x mt-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span>{project.category}</span>
          <span className="h-1 w-1 rounded-full bg-faint" />
          <span>{project.year}</span>
        </div>

        <AnimatedHeading
          as="h1"
          text={project.title}
          className="font-display mt-4 text-6xl leading-[0.95] tracking-tight sm:text-8xl"
        />

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-balance text-xl leading-relaxed text-ink-soft sm:text-2xl">
            {project.summary}
          </p>
        </Reveal>
      </header>

      {/* Cover */}
      <Reveal delay={0.15} className="container-x mt-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-paper-2">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 120% at 30% 20%, ${project.color}25, transparent 60%), linear-gradient(150deg, ${project.color}18, ${project.color}06)`,
              }}
            />
          )}
        </div>
      </Reveal>

      {/* Meta + overview */}
      <div className="container-x mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <Reveal>
            <dl className="space-y-8">
              <div>
                <dt className="eyebrow mb-2">Role</dt>
                <dd className="space-y-1">
                  {project.role.map((r) => (
                    <p key={r} className="text-ink-soft">
                      {r}
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Services</dt>
                <dd className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              {project.liveUrl && (
                <div>
                  <dt className="eyebrow mb-2">Live</dt>
                  <dd>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 text-ink"
                    >
                      Visit site
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </aside>

        <div className="lg:col-span-8">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
              {project.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>

          {project.metrics && (
            <div className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <Reveal key={m.label}>
                  <p className="font-display text-4xl tracking-tight">
                    {m.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{m.label}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="container-x mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.05}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2">
                <Image
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Prev / Next */}
      <nav className="container-x mt-[var(--spacing-section)] grid grid-cols-2 gap-8 border-t border-line pt-10">
        {prev && (
          <Link href={`/projects/${prev.slug}`} className="group">
            <span className="flex items-center gap-2 text-xs text-muted">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> Previous
            </span>
            <span className="font-display mt-2 block text-2xl tracking-tight transition-colors group-hover:text-muted">
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group text-right sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-2 text-xs text-muted">
              Next <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
            <span className="font-display mt-2 block text-2xl tracking-tight transition-colors group-hover:text-muted">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
