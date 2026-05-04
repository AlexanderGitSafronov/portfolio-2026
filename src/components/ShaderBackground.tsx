"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { mountShader, type ShaderHandle } from "@/lib/shaderCanvas";

type Props = {
  fragment: string;
  className?: string;
};

// Mounts a fullscreen WebGL canvas that fills its parent and runs a
// fragment shader. The GL context only initialises once visible; the
// rAF loop pauses when the canvas leaves the viewport or the tab hides.
export function ShaderBackground({ fragment, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let handle: ShaderHandle | null = null;
    const ensure = () => {
      if (!handle) handle = mountShader(canvas, fragment);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ensure();
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

    if (reduce) {
      ensure();
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
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
