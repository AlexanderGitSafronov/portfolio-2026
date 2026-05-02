const skills = [
  "HTML5",
  "CSS3",
  "JavaScript ES6+",
  "TypeScript",
  "React",
  "Next.js",
  "SASS / SCSS",
  "Tailwind CSS",
  "Bootstrap",
  "jQuery",
  "Gulp",
  "WordPress",
  "PHP",
  "REST API",
  "PostgreSQL",
  "Prisma",
  "Auth.js",
  "Cloudinary",
  "Figma",
  "Git / GitHub",
];

export function SkillsMarquee() {
  return (
    <div className="marquee-mask relative w-full overflow-hidden border-y border-white/10 bg-white/[0.02] py-6">
      <div className="animate-marquee flex w-max shrink-0 gap-10 whitespace-nowrap pr-10">
        {[...skills, ...skills, ...skills, ...skills].map((s, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-white/45"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
