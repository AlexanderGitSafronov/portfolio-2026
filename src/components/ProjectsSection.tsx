"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { StackedProjectCard } from "./StackedProjectCard";

type Props = { dict: Dictionary };

export function ProjectsSection({ dict }: Props) {
  const lead = dict.projects.lead.replace("{count}", String(projects.length));
  const stackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-3"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
            {dict.projects.kicker}
          </span>
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            <span className="text-white">{dict.projects.titleA}</span>{" "}
            <span className="text-gradient">{dict.projects.titleB}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-white/55 md:text-lg">{lead}</p>
        </motion.div>
      </div>

      {/* Pinned stage with absolutely-positioned cards.
          Section is N × 100vh tall so each card gets one screen of scroll. */}
      <div
        ref={stackRef}
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-3 md:px-6">
          {/* Subtle deck stack peek behind the active card */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[calc(100svh-3.5rem)] w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 md:h-[calc(100svh-4rem)]">
            <div className="absolute inset-x-6 -bottom-2 h-3 rounded-b-[1.75rem] border border-t-0 border-white/10 bg-[#0b0b13]/90" />
            <div className="absolute inset-x-12 -bottom-4 h-3 rounded-b-[1.75rem] border border-t-0 border-white/10 bg-[#0b0b13]/70" />
          </div>

          <div className="relative h-[calc(100svh-3.5rem)] w-full max-w-6xl md:h-[calc(100svh-4rem)]">
            {projects.map((p, i) => (
              <StackedProjectCard
                key={p.slug}
                project={p}
                index={i}
                total={projects.length}
                dict={dict}
                sectionProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <FloatingCounter progress={scrollYProgress} total={projects.length} />
    </section>
  );
}

function FloatingCounter({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const opacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
  const widthPct = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  const counterText = useTransform(progress, (v) => {
    const i = Math.min(total, Math.max(1, Math.ceil(v * total)));
    return `${String(i).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  });

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0a12]/80 px-4 py-2 backdrop-blur-xl">
        <motion.span className="font-mono text-xs text-white/85">
          {counterText}
        </motion.span>
        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <motion.div
            style={{ width: widthPct }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400"
          />
        </div>
      </div>
    </motion.div>
  );
}
