"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries";
import { glassFrag, gradientFrag, waveFrag } from "@/lib/shaders";
import { ShaderCard } from "./ShaderCard";

type Props = { dict: Dictionary };

export function ShaderLab({ dict }: Props) {
  return (
    <section
      id="lab"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex flex-col items-start gap-3 md:mb-14"
      >
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
          {dict.lab.kicker}
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
          <span className="text-white">{dict.lab.titleA}</span>{" "}
          <span className="text-gradient">{dict.lab.titleB}</span>
        </h2>
        <p className="max-w-2xl text-white/55 md:text-lg">{dict.lab.lead}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        <ShaderCard label="<Glass />" fragment={glassFrag} />
        <ShaderCard label="<WaveDistortion />" fragment={waveFrag} />
        <ShaderCard label="<LinearGradient />" fragment={gradientFrag} />
      </div>
    </section>
  );
}
