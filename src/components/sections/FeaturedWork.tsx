import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="container-x scroll-mt-24 py-[var(--spacing-section)]"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Selected Work</p>
          </Reveal>
          <AnimatedHeading
            as="h2"
            text="Recent projects"
            className="font-display text-5xl tracking-tight sm:text-6xl"
          />
        </div>
        <Reveal delay={0.1}>
          <Link
            href="/projects"
            className="link-underline text-sm text-ink-soft"
          >
            View all projects →
          </Link>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <div key={project.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
            <ProjectCard project={project} index={i} priority={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
