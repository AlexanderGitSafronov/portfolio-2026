"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Mail, MessageCircle, Phone } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { GithubIcon } from "./icons/GithubIcon";

type Props = { dict: Dictionary };

export function Contact({ dict }: Props) {
  const channels = [
    {
      label: dict.contact.email,
      value: "sasha.safronov1996161681@gmail.com",
      href: "mailto:sasha.safronov1996161681@gmail.com",
      Icon: Mail,
    },
    {
      label: dict.contact.phone,
      value: "+38 068 568 80 65",
      href: "tel:+380685688065",
      Icon: Phone,
    },
    {
      label: dict.contact.telegram,
      value: "@alex_R6",
      href: "https://t.me/alex_R6",
      Icon: MessageCircle,
    },
    {
      label: dict.contact.github,
      value: "AlexanderGitSafronov",
      href: "https://github.com/AlexanderGitSafronov",
      Icon: GithubIcon,
    },
  ];

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
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-5 sm:p-8 md:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-violet-500/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/55">
              {dict.contact.kicker}
            </span>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
              <span className="text-white">{dict.contact.titleA}</span>
              <br />
              <span className="text-gradient">{dict.contact.titleB}</span>
            </h2>
            <p className="mt-6 max-w-xl text-white/60 md:text-lg">
              {dict.contact.lead}
            </p>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              <FileText className="h-4 w-4" />
              {dict.contact.downloadCv}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-3 lg:col-span-6">
            {channels.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex min-w-0 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06] sm:px-5"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                      {label}
                    </div>
                    <div className="truncate text-sm text-white/85 md:text-base">
                      {value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
