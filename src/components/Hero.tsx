"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";

const reveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.05 * i,
    },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-32 pb-20"
    >
      <motion.div
        custom={0}
        variants={reveal}
        initial="hidden"
        animate="show"
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/70 backdrop-blur"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Available for new projects
      </motion.div>

      <motion.h1
        custom={1}
        variants={reveal}
        initial="hidden"
        animate="show"
        className="text-balance text-center text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
      >
        <span className="block text-white/95">Building digital</span>
        <span className="block text-gradient">experiences</span>
        <span className="block text-white/95">that ship.</span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={reveal}
        initial="hidden"
        animate="show"
        className="mt-7 max-w-xl text-center text-base text-white/60 md:text-lg"
      >
        Full-stack developer crafting fast, modern web apps with{" "}
        <span className="text-white/85">Next.js</span>,{" "}
        <span className="text-white/85">TypeScript</span> and a love for clean
        product thinking. Currently shipping a portfolio of 14 live products.
      </motion.p>

      <motion.div
        custom={3}
        variants={reveal}
        initial="hidden"
        animate="show"
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href="#work"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02] active:scale-[0.99]"
        >
          <Sparkles className="h-4 w-4" />
          Explore my work
          <span className="ml-1 transition group-hover:translate-x-0.5">→</span>
        </a>
        <a
          href="https://github.com/AlexanderGitSafronov"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
      </motion.div>

      <motion.div
        custom={4}
        variants={reveal}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
