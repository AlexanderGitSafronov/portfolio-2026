export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" />
      <div
        className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, #7c3aed 0%, #06b6d4 33%, #ec4899 66%, #7c3aed 100%)",
          animation: "aurora 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          animation: "aurora 26s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          animation: "aurora 30s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
