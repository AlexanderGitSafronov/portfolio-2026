"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";
import { GithubIcon } from "./icons/GithubIcon";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  const featured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative",
        featured ? "md:col-span-2" : "md:col-span-1"
      )}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className={cn(
          "card-glow card-border relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
          "transition-transform duration-500 will-change-transform",
          "hover:-translate-y-1"
        )}
      >
        {/* Accent gradient bar */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70",
            project.accent
          )}
        />

        {/* Soft corner glow */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br opacity-30 blur-3xl transition group-hover:opacity-60",
            project.accent
          )}
        />

        <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                  project.accent
                )}
              >
                <span className="font-mono text-xs font-bold">
                  {project.name.replace(/[^A-Z]/g, "").slice(0, 2) ||
                    project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {project.name}
                </h3>
                <p className="text-sm text-white/55">{project.tagline}</p>
              </div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/55">
              {project.year}
            </span>
          </div>

          {/* Live preview frame */}
          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <iframe
              src={project.href}
              title={`${project.name} preview`}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
              className="absolute left-0 top-0 h-[200%] w-[200%] origin-top-left scale-50 border-0 transition duration-700 group-hover:scale-[0.55]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20 mix-blend-overlay",
                project.accent
              )}
            />
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            {project.description}
          </p>

          {/* Stack */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex items-center justify-between gap-2 pt-4">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02]"
              )}
            >
              Visit live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10"
                aria-label={`${project.name} on GitHub`}
              >
                {project.githubPrivate ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  <GithubIcon className="h-3.5 w-3.5" />
                )}
                <span>{project.githubPrivate ? "Private" : "Source"}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
