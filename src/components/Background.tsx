"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Background() {
  const { scrollYProgress } = useScroll();
  // Subtle scroll parallax — the orbs drift as you scroll the page
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" />
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(from 90deg at 50% 50%, #7c3aed 0%, #06b6d4 33%, #ec4899 66%, #7c3aed 100%)",
            animation: "aurora 22s ease-in-out infinite",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: blob2Y }}
        className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            animation: "aurora 26s ease-in-out infinite reverse",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: blob3Y }}
        className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            animation: "aurora 30s ease-in-out infinite",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
