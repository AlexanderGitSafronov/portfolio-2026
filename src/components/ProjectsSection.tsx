"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col items-start gap-3 md:mb-16"
      >
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
          ◆ Selected work
        </span>
        <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          <span className="text-white">Live products,</span>{" "}
          <span className="text-gradient">shipping fast.</span>
        </h2>
        <p className="mt-2 max-w-2xl text-white/55 md:text-lg">
          {projects.length} production apps deployed on Vercel — full-stack
          Next.js with PostgreSQL, Prisma, and modern PWA capabilities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
