"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  url: string;
  name: string;
  accent: string;
  alt: string;
};

export function Preview({ url, name, accent, alt }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // WordPress mShots — free, no auth, generates from any public URL
  const screenshot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    url
  )}?w=1280&h=800`;

  const initials =
    name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() ||
    name.slice(0, 2).toUpperCase();

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated gradient placeholder — visible until image loads */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          accent,
          "transition-opacity duration-700",
          loaded && !errored ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.4),transparent_60%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-2xl border border-white/30 bg-black/30 px-5 py-2.5 backdrop-blur-md">
              <span className="font-mono text-sm font-semibold tracking-[0.3em] text-white">
                {initials}
              </span>
            </div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              {name}
            </span>
          </div>
        </div>
      </div>

      {/* Screenshot — fades in over the gradient when ready */}
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshot}
          alt={alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            const img = e.currentTarget;
            // mShots sometimes returns a tiny "wait" image
            if (img.naturalWidth < 200) {
              setErrored(true);
            } else {
              setLoaded(true);
            }
          }}
          onError={() => setErrored(true)}
          className={cn(
            "relative z-10 h-full w-full object-cover object-top transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Subtle overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-20 bg-gradient-to-br opacity-15 mix-blend-overlay",
          accent
        )}
      />
    </div>
  );
}
