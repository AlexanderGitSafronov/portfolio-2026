const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
  "Prisma",
  "Auth.js",
  "Vercel",
  "Cloudinary",
  "PWA",
  "Server Components",
  "next-intl",
  "Edge Functions",
  "Stripe",
  "Node.js",
];

export function SkillsMarquee() {
  return (
    <div className="marquee-mask relative w-full overflow-hidden border-y border-white/10 bg-white/[0.02] py-6">
      <div
        className="flex w-max gap-8 whitespace-nowrap"
        style={{ animation: "marquee 38s linear infinite" }}
      >
        {[...skills, ...skills].map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-white/40"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
