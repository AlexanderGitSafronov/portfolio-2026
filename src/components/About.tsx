"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Rocket, Sparkles } from "lucide-react";

const stats = [
  { value: "14", label: "Live products" },
  { value: "3+", label: "Years shipping" },
  { value: "∞", label: "Cups of coffee" },
];

const values = [
  {
    icon: Rocket,
    title: "Ship fast",
    body: "I build with proven primitives — Next.js, Prisma, Tailwind — and skip the bikeshed. Production beats perfection.",
  },
  {
    icon: Layers,
    title: "Full-stack thinking",
    body: "From schema to UI motion. I own the whole pipeline so the experience holds together end-to-end.",
  },
  {
    icon: Code2,
    title: "Clean & typed",
    body: "Strict TypeScript, server components, and components that read like the spec.",
  },
  {
    icon: Sparkles,
    title: "Detail obsessed",
    body: "Microinteractions, loading states, empty states, edge cases. The polish is the product.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-24 md:py-32"
    >
      <div className="grid gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
            ◆ About
          </span>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            <span className="text-white">Designer-developer</span>{" "}
            <span className="text-gradient">on a mission.</span>
          </h2>
          <p className="mt-6 text-white/65 md:text-lg">
            I&apos;m Alexander — a full-stack developer who treats every project
            like a product. I build apps people use daily: finance trackers,
            inventory tools, planners, games. Shipping is the goal.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-medium tracking-tight text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {v.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
