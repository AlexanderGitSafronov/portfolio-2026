"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  total: number;
  dict: Dictionary;
};

export function StackedProjectCard({ project, index, total, dict }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress for THIS card's pinned region
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // While the next card scrolls up over this one, push it back slightly
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.55]);

  const items = dict.projects.items as Record<
    string,
    { tagline: string; description: string }
  >;
  const t = items[project.slug] ?? { tagline: "", description: "" };

  // Stack peek — each card lands progressively lower so previous ones show through
  const stickyTop = `${1.5 + index * 1.4}rem`;

  return (
    <div
      ref={ref}
      className="sticky h-screen w-full px-4 md:px-6"
      style={{ top: stickyTop }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative mx-auto h-[calc(100vh-4rem)] w-full max-w-6xl origin-top"
      >
        <div
          className={cn(
            "relative grid h-full w-full grid-rows-[1fr_auto] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a12]/85 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:grid-cols-[1.15fr_1fr] md:grid-rows-1"
          )}
        >
          {/* Accent border */}
          <div
            className={cn(
              "absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r opacity-80",
              project.accent
            )}
          />

          {/* Soft corner glow */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-32 -right-32 z-0 h-80 w-80 rounded-full bg-gradient-to-br opacity-30 blur-3xl",
              project.accent
            )}
          />

          {/* Preview side */}
          <div className="relative h-full min-h-[40svh] overflow-hidden border-b border-white/10 md:border-b-0 md:border-r">
            <Preview
              url={project.href}
              name={project.name}
              accent={project.accent}
              alt={`${project.name} ${dict.projects.preview}`}
            />
          </div>

          {/* Info side */}
          <div className="relative z-10 flex flex-col gap-5 overflow-y-auto p-6 md:gap-7 md:p-10 lg:p-12">
            {/* Counter */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
                {project.year}
              </span>
            </div>

            {/* Logo + name */}
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                  project.accent
                )}
              >
                <span className="font-mono text-sm font-bold">
                  {project.name.replace(/[^A-Z]/g, "").slice(0, 2) ||
                    project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
                  {project.name}
                </h3>
                <p className="text-sm text-white/55 md:text-base">{t.tagline}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              {t.description}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                {dict.projects.visit}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  {project.githubPrivate ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <GithubIcon className="h-4 w-4" />
                  )}
                  {project.githubPrivate
                    ? dict.projects.private
                    : dict.projects.source}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
