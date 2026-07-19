import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — websites, brands and products.",
};

export default function ProjectsPage() {
  return (
    <section className="container-x pt-36 pb-[var(--spacing-section)] md:pt-44">
      <Reveal>
        <p className="eyebrow mb-4">Portfolio</p>
      </Reveal>
      <AnimatedHeading
        as="h1"
        segments={[
          { text: "Selected" },
          { text: "work", className: "font-display italic text-accent" },
        ]}
        className="font-display text-6xl leading-[0.95] tracking-tight sm:text-8xl"
      />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          A collection of recent projects across web, brand and product design.
        </p>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((project, i) => (
          <div key={project.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
            <ProjectCard project={project} index={i} priority={i < 2} />
          </div>
        ))}
      </div>
    </section>
  );
}
