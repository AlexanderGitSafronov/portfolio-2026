"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { GithubIcon } from "./icons/GithubIcon";
import { Preview } from "./Preview";

type Props = {
  project: Project;
  index: number;
  dict: Dictionary;
};

export function ProjectCard({ project, index, dict }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const items = dict.projects.items as Record<
    string,
    { tagline: string; description: string }
  >;
  const t = items[project.slug] ?? { tagline: "", description: "" };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        delay: Math.min((index % 3) * 0.07, 0.21),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative h-full"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className={cn(
          "card-glow card-border relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b13]",
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
            "pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br opacity-25 blur-3xl transition group-hover:opacity-50",
            project.accent
          )}
        />

        {/* Live preview screenshot */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Preview
            slug={project.slug}
            url={project.href}
            name={project.name}
            accent={project.accent}
            alt={`${project.name} ${dict.projects.preview}`}
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-5 md:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                  project.accent
                )}
              >
                <span className="font-mono text-[11px] font-bold">
                  {project.name.replace(/[^A-Z]/g, "").slice(0, 2) ||
                    project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold tracking-tight text-white">
                  {project.name}
                </h3>
                <p className="truncate text-sm text-white/55">{t.tagline}</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/55">
              {project.year}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/65">
            {t.description}
          </p>

          {/* Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/60"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-auto flex items-center justify-between gap-2 pt-5">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              {dict.projects.visit}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10"
                aria-label={`${project.name} on GitHub`}
              >
                {project.githubPrivate ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  <GithubIcon className="h-3.5 w-3.5" />
                )}
                <span>
                  {project.githubPrivate
                    ? dict.projects.private
                    : dict.projects.source}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
