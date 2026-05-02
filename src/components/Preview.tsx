"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  slug: string;
  url: string;
  name: string;
  accent: string;
  alt: string;
};

export function Preview({ slug, url, name, accent, alt }: Props) {
  // Static screenshot baked into /public/previews at build time — fastest,
  // most reliable. Falls back to Microlink, then mShots, then gradient.
  const local = `/previews/${slug}.jpg`;
  const microlink = `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&viewport.height=900`;
  const mshots = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    url
  )}?w=1440&h=900`;
  const sources = [local, microlink, mshots];

  const [sourceIndex, setSourceIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const initials =
    name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() ||
    name.slice(0, 2).toUpperCase();

  function handleError() {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((i) => i + 1);
      setLoaded(false);
    } else {
      setErrored(true);
    }
  }

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    if (img.naturalWidth < 400) {
      handleError();
      return;
    }
    setLoaded(true);
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Browser-style chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-2 border-b border-white/10 bg-[#0b0b13]/90 px-4 py-2 backdrop-blur">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 truncate rounded-md bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/50">
          <svg
            className="h-3 w-3 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="truncate">{url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>

      {/* Gradient placeholder — visible until image loads or on full failure */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          accent,
          "transition-opacity duration-700",
          loaded && !errored ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.4),transparent_60%)]" />
        <div className="absolute inset-0 grid place-items-center px-6 pt-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-2xl border border-white/30 bg-black/40 px-6 py-3 backdrop-blur-md">
              <span className="font-mono text-base font-bold tracking-[0.3em] text-white">
                {initials}
              </span>
            </div>
            <div>
              <div className="text-2xl font-semibold tracking-tight text-white drop-shadow-lg">
                {name}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/80">
                {errored ? "live demo" : "loading preview…"}
              </div>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-black backdrop-blur transition hover:scale-[1.03]"
            >
              Open live
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Screenshot */}
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={sources[sourceIndex]}
          src={sources[sourceIndex]}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top pt-9 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Subtle overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-gradient-to-br opacity-15 mix-blend-overlay",
          accent
        )}
      />
    </div>
  );
}
