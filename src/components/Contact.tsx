"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-10 md:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
          ◆ Get in touch
        </span>
        <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-7xl">
          <span className="text-white">Have an idea?</span>
          <br />
          <span className="text-gradient">Let&apos;s build it.</span>
        </h2>
        <p className="mt-6 max-w-xl text-white/60 md:text-lg">
          Whether it&apos;s a polished MVP, a side-project you want shipped, or
          a complex full-stack app — I&apos;m down to talk.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:sasha.safronov1996161681@gmail.com"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" />
            sasha.safronov1996161681@gmail.com
            <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
          <a
            href="https://github.com/AlexanderGitSafronov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/10"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
