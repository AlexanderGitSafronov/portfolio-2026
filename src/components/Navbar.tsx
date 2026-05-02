"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
        <Link
          href="#top"
          className="ml-2 mr-3 flex items-center gap-2 text-sm font-medium tracking-tight"
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-500 to-cyan-400">
            <span className="absolute inset-[2px] rounded-full bg-[#050509]" />
            <span className="relative font-mono text-[11px] font-bold text-white">
              AS
            </span>
          </span>
          <span className="hidden sm:inline">Alexander Safronov</span>
        </Link>
        <div className="mx-1 h-5 w-px bg-white/10" />
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {l.label}
          </Link>
        ))}
        <a
          href="mailto:sasha.safronov1996161681@gmail.com"
          className="ml-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Hire me
        </a>
      </nav>
    </motion.header>
  );
}
