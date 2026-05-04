"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { mountShader, type ShaderHandle } from "@/lib/shaderCanvas";

type Props = {
  label: string;
  fragment: string;
  className?: string;
};

export function ShaderCard({ label, fragment, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let handle: ShaderHandle | null = null;
    const ensureMounted = () => {
      if (!handle) handle = mountShader(canvas, fragment);
    };

    // Mount once visible. Pause when out of view or tab hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensureMounted();
          if (!reduce) handle?.resume();
        } else {
          handle?.pause();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(wrap);

    const onVis = () => {
      if (document.hidden) handle?.pause();
      else if (!reduce) handle?.resume();
    };
    document.addEventListener("visibilitychange", onVis);

    // For reduced motion, render a single frame and stop.
    if (reduce) {
      ensureMounted();
      requestAnimationFrame(() => handle?.pause());
    }

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      handle?.destroy();
    };
  }, [fragment, reduce]);

  return (
    <div
      ref={wrapRef}
      style={{ clipPath: "inset(0 round 1.5rem)" }}
      className={cn(
        "relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/65 px-3 py-1 font-mono text-xs text-amber-200/95 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {label}
      </div>
    </div>
  );
}
