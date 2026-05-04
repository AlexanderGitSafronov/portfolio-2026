"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { experiences } from "@/lib/experience";
import type { Dictionary } from "@/i18n/dictionaries";
import { meshGradientFrag, smokescreenFrag } from "@/lib/shaders";
import { ShaderBackground } from "./ShaderBackground";

type Props = { dict: Dictionary };

export function Experience({ dict }: Props) {
  const items = dict.experience.items as Record<
    string,
    { role: string; bullets: string[] }
  >;

  return (
    <section
      id="experience"
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
          {dict.experience.kicker}
        </span>
        <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          <span className="text-white">{dict.experience.titleA}</span>{" "}
          <span className="text-gradient">{dict.experience.titleB}</span>
        </h2>
        <p className="mt-2 max-w-2xl text-white/55 md:text-lg">
          {dict.experience.lead}
        </p>
      </motion.div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent md:left-4"
        />

        <div className="flex flex-col gap-5 md:gap-6">
          {experiences.map((exp, i) => {
            const t = items[exp.slug] ?? { role: "", bullets: [] };
            return (
              <ExperienceCard
                key={exp.slug}
                index={i}
                accent={exp.accent}
                role={t.role}
                bullets={t.bullets}
                company={exp.company}
                start={exp.start}
                end={exp.end}
                stack={exp.stack}
              />
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a14] p-6 md:p-8">
          <ShaderBackground fragment={smokescreenFrag} className="opacity-80" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/45 via-black/30 to-black/60"
          />
          <div className="relative z-10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/55">
              {dict.education.kicker}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
              {dict.education.uniName}
            </h3>
            <p className="mt-1 text-sm text-white/70">
              {dict.education.uniProgram}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
              2013 — 2018
            </p>

            <div className="mt-5 h-px w-full bg-white/15" />

            <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
              {dict.education.hillel}
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
              2021
            </p>
            <a
              href="https://certificate.ithillel.ua/view/40392820"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-violet-200 transition hover:text-white"
            >
              {dict.education.viewCert} →
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a14] p-6 md:p-8">
          <ShaderBackground fragment={meshGradientFrag} className="opacity-70" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/45 via-black/30 to-black/60"
          />
          <div className="relative z-10">
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/55">
              {dict.languages.kicker}
            </span>
            <ul className="mt-4 space-y-3">
              {(["uk", "ru", "en"] as const).map((code) => (
                <li
                  key={code}
                  className="flex items-center justify-between border-b border-white/15 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-base text-white/95">
                    {dict.languages.langs[code]}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                    {dict.languages.levels[code]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type ExperienceCardProps = {
  index: number;
  accent: string;
  role: string;
  bullets: string[];
  company: string;
  start: string;
  end: string;
  stack: readonly string[];
};

function ExperienceCard({
  index,
  accent,
  role,
  bullets,
  company,
  start,
  end,
  stack,
}: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - yPct) * 4;
    const ry = (xPct - 0.5) * 4;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative pl-10 md:pl-14"
    >
      <div
        aria-hidden
        className={cn(
          "absolute left-0 top-6 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ring-4 ring-[#050509] md:h-8 md:w-8",
          accent
        )}
      >
        <Briefcase className="h-3.5 w-3.5 text-white md:h-4 md:w-4" />
      </div>

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-transform duration-300 will-change-transform md:p-8"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {role}
            </h3>
            <p
              className={cn(
                "mt-1 bg-gradient-to-r bg-clip-text text-transparent text-sm font-medium md:text-base",
                accent
              )}
            >
              {company}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
            {start} — {end}
          </span>
        </div>

        <ul className="mt-5 flex flex-col gap-2.5">
          {bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm leading-relaxed text-white/70 md:text-base"
            >
              <span
                className={cn(
                  "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r",
                  accent
                )}
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
