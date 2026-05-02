"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = { dict: Dictionary; locale: Locale };

export function Navbar({ dict, locale }: Props) {
  const links = [
    { href: "#work", label: dict.nav.work },
    { href: "#about", label: dict.nav.about },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4 md:px-4"
    >
      <nav className="flex max-w-[calc(100vw-1.5rem)] items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-1.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] md:px-2 md:py-2">
        <Link
          href={`/${locale}#top`}
          className="ml-1 flex shrink-0 items-center gap-2 text-sm font-medium tracking-tight md:ml-2 md:mr-3"
          aria-label="Alexander Safronov"
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-500 to-cyan-400">
            <span className="absolute inset-[2px] rounded-full bg-[#050509]" />
            <span className="relative font-mono text-[11px] font-bold text-white">
              AS
            </span>
          </span>
          <span className="hidden lg:inline">Alexander Safronov</span>
        </Link>

        {/* Section links — hidden on mobile to keep navbar compact */}
        <div className="mx-1 hidden h-5 w-px bg-white/10 md:block" />
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 md:ml-1">
          <LanguageSwitcher current={locale} />
          <a
            href="mailto:sasha.safronov1996161681@gmail.com"
            className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black transition hover:bg-white/90 md:px-3.5 md:text-sm"
          >
            {dict.nav.hireMe}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
