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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only scale — no opacity (opacity caused ghost flicker through translucent bg)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const items = dict.projects.items as Record<
    string,
    { tagline: string; description: string }
  >;
  const t = items[project.slug] ?? { tagline: "", description: "" };

  // Each card pins progressively lower so previous ones peek through above
  const stickyTop = `${1.25 + index * 1.1}rem`;

  return (
    <div
      ref={ref}
      className="sticky h-screen w-full px-3 md:px-6"
      style={{ top: stickyTop }}
    >
      <motion.div
        style={{ scale }}
        className="relative mx-auto h-[calc(100svh-3.5rem)] w-full max-w-6xl origin-top md:h-[calc(100svh-4rem)]"
      >
        <div
          className={cn(
            "relative grid h-full w-full grid-rows-[minmax(0,1.1fr)_minmax(0,1fr)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b13] shadow-[0_30px_80px_rgba(0,0,0,0.65)] md:grid-cols-[1.15fr_1fr] md:grid-rows-1"
          )}
        >
          {/* Accent border */}
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r opacity-80",
              project.accent
            )}
          />

          {/* Soft corner glow */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-32 -right-32 z-0 h-80 w-80 rounded-full bg-gradient-to-br opacity-25 blur-3xl",
              project.accent
            )}
          />

          {/* Preview */}
          <div className="relative h-full min-h-0 overflow-hidden border-b border-white/10 md:border-b-0 md:border-r">
            <Preview
              url={project.href}
              name={project.name}
              accent={project.accent}
              alt={`${project.name} ${dict.projects.preview}`}
            />
          </div>

          {/* Info */}
          <div className="relative z-10 flex min-h-0 flex-col gap-4 overflow-y-auto p-5 md:gap-5 md:p-8 lg:p-10">
            {/* Counter */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                {project.year}
              </span>
            </div>

            {/* Logo + name */}
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg md:h-14 md:w-14",
                  project.accent
                )}
              >
                <span className="font-mono text-xs font-bold md:text-sm">
                  {project.name.replace(/[^A-Z]/g, "").slice(0, 2) ||
                    project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl lg:text-4xl">
                  {project.name}
                </h3>
                <p className="text-sm text-white/55 md:text-base">{t.tagline}</p>
              </div>
            </div>

            {/* CTA — moved up so they're never covered by the next sticky card */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[1.02]"
              >
                {dict.projects.visit}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10"
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

            {/* Divider */}
            <div className="h-px w-full bg-white/10" />

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              {t.description}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
