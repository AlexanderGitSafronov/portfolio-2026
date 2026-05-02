"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import type { Dictionary } from "@/i18n/dictionaries";
import { ProjectDeck } from "./ProjectDeck";

type Props = { dict: Dictionary };

export function ProjectsSection({ dict }: Props) {
  const lead = dict.projects.lead.replace("{count}", String(projects.length));
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 pt-24 md:pt-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 flex flex-col items-start gap-3 md:mb-12"
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

      {featured.length > 0 && <ProjectDeck projects={featured} dict={dict} />}

      {rest.length > 0 && (
        <div className="pt-12 md:pt-20">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-semibold tracking-tight text-white/90 md:text-3xl"
          >
            {dict.projects.moreTitle ?? "More projects"}
          </motion.h3>
          <ProjectDeck projects={rest} dict={dict} perCardVh={55} />
        </div>
      )}
    </section>
  );
}
