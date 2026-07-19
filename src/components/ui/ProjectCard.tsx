"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { pad } from "@/lib/utils";

/**
 * A single project card. Renders a real cover image when `project.cover` is
 * set, otherwise a tasteful generated gradient using the project's accent.
 */
export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        {/* Cover */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              style={{
                background: `radial-gradient(120% 120% at 30% 20%, ${project.color}22, transparent 60%), linear-gradient(150deg, ${project.color}18, ${project.color}05)`,
              }}
            >
              <span
                className="font-display absolute bottom-6 left-6 text-7xl opacity-15"
                style={{ color: project.color }}
              >
                {pad(index + 1)}
              </span>
            </div>
          )}

          {/* hover badge */}
          <div className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-paper/90 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl tracking-tight transition-colors group-hover:text-muted">
            {project.title}
          </h3>
          <span className="shrink-0 text-sm text-muted">{project.year}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{project.category}</p>
      </Link>
    </motion.article>
  );
}
