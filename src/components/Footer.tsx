import type { Dictionary } from "@/i18n/dictionaries";

type Props = { dict: Dictionary };

export function Footer({ dict }: Props) {
  const rights = dict.footer.rights.replace(
    "{year}",
    String(new Date().getFullYear())
  );
  return (
    <footer className="relative border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-white/40 md:flex-row">
        <div>{rights}</div>
        <div className="font-mono uppercase tracking-[0.2em]">
          {dict.footer.earth}
        </div>
      </div>
    </footer>
  );
}
