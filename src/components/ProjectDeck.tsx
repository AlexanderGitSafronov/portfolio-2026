"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { GithubIcon } from "./icons/GithubIcon";
import { Preview } from "./Preview";

type Props = {
  projects: Project[];
  dict: Dictionary;
  perCardVh?: number;
  className?: string;
};

export function ProjectDeck({
  projects,
  dict,
  perCardVh = 80,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = projects.length;
  const stride = total > 1 ? 1 / (total - 1) : 1;

  if (reduce) {
    return (
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <DeckCardStatic key={p.slug} project={p} dict={dict} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ height: `${total * perCardVh}vh` }}
      className={cn("relative mt-6", className)}
    >
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-4 md:top-24 md:h-[calc(100vh-6rem)]">
        {projects.map((p, i) => (
          <DeckCard
            key={p.slug}
            project={p}
            index={i}
            total={total}
            stride={stride}
            scrollYProgress={scrollYProgress}
            dict={dict}
          />
        ))}
      </div>
    </div>
  );
}

type DeckCardProps = {
  project: Project;
  index: number;
  total: number;
  stride: number;
  scrollYProgress: MotionValue<number>;
  dict: Dictionary;
};

function lerp(p: number, a: number, b: number, va: number, vb: number) {
  if (p <= a) return va;
  if (p >= b) return vb;
  return va + ((p - a) / (b - a)) * (vb - va);
}

function DeckCard({
  project,
  index,
  total,
  stride,
  scrollYProgress,
  dict,
}: DeckCardProps) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const depth = total - 1 - index; // cards that land on top of this one
  const enterStart = Math.max(0, (index - 1) * stride);
  const enterEnd = Math.min(1, index * stride);
  // Cap the visual depth at 4 so 10-card decks don't fan out wildly.
  const visualDepth = Math.min(depth, 4);
  const finalYPct = -visualDepth * 1.6;
  const finalScale = 1 - visualDepth * 0.018;
  const finalOpacity = visualDepth === 0 ? 1 : Math.max(0.55, 1 - visualDepth * 0.1);

  const y = useTransform(scrollYProgress, (p) => {
    let v: number;
    if (isFirst) v = lerp(p, 0, 1, 0, finalYPct);
    else if (p < enterEnd) v = lerp(p, enterStart, enterEnd, 100, 0);
    else if (isLast) v = 0;
    else v = lerp(p, enterEnd, 1, 0, finalYPct);
    return `${v}%`;
  });

  const scale = useTransform(scrollYProgress, (p) => {
    if (isFirst) return lerp(p, 0, 1, 1, finalScale);
    if (p < enterEnd) return 1;
    if (isLast) return 1;
    return lerp(p, enterEnd, 1, 1, finalScale);
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    if (isFirst) return lerp(p, 0, 1, 1, finalOpacity);
    if (p < enterEnd) return lerp(p, enterStart, enterEnd, 0, 1);
    if (isLast) return 1;
    return lerp(p, enterEnd, 1, 1, finalOpacity);
  });

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex: index }}
      className="absolute inset-x-4 top-1/2 mx-auto w-full max-w-5xl -translate-y-1/2 will-change-transform"
    >
      <DeckCardInner project={project} dict={dict} />
    </motion.div>
  );
}

function DeckCardStatic({
  project,
  dict,
}: {
  project: Project;
  dict: Dictionary;
}) {
  return <DeckCardInner project={project} dict={dict} />;
}

function DeckCardInner({
  project,
  dict,
}: {
  project: Project;
  dict: Dictionary;
}) {
  const items = dict.projects.items as Record<
    string,
    { tagline: string; description: string }
  >;
  const t = items[project.slug] ?? { tagline: "", description: "" };

  return (
    <div
      className={cn(
        "card-glow card-border relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b13] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70",
          project.accent
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br opacity-30 blur-3xl",
          project.accent
        )}
      />

      <div
        className="relative w-full overflow-hidden"
        style={{ height: "min(calc(38vh + 100px), 560px)" }}
      >
        <Preview
          slug={project.slug}
          url={project.href}
          name={project.name}
          accent={project.accent}
          alt={`${project.name} ${dict.projects.preview}`}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-3 p-4 md:gap-4 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg",
                project.accent
              )}
            >
              <span className="font-mono text-[11px] font-bold">
                {project.name.replace(/[^A-Z]/g, "").slice(0, 2) ||
                  project.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold tracking-tight text-white md:text-2xl">
                {project.name}
              </h3>
              <p className="truncate text-sm text-white/55 md:text-base">
                {t.tagline}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/55">
            {project.year}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-white/65 md:text-base">
          {t.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/60"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
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
  );
}
