export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-white/40 md:flex-row">
        <div>© {new Date().getFullYear()} Alexander Safronov · Crafted with Next.js & Framer Motion.</div>
        <div className="font-mono uppercase tracking-[0.2em]">Made on Earth</div>
      </div>
    </footer>
  );
}
