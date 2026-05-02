"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Languages } from "lucide-react";
import { localeNames, localeShort, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type Props = { current: Locale };

export function LanguageSwitcher({ current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchTo(locale: Locale) {
    if (locale === current) {
      setOpen(false);
      return;
    }
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    router.push(segments.join("/") || `/${locale}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages className="h-3.5 w-3.5" />
        <span className="font-mono text-[11px] tracking-wider">
          {localeShort[current]}
        </span>
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]/95 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={l === current}
                onClick={() => switchTo(l)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition",
                  l === current
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <span>{localeNames[l]}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {localeShort[l]}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
