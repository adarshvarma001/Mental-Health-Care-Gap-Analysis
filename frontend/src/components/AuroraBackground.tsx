export function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Blob 1 */}
      <div
        className="
          absolute
          top-[-20%] left-[-10%]
          h-[500px] w-[500px]
          rounded-full
          bg-violet-500/20
          blur-[120px]
          animate-aurora-slow
        "
      />

      {/* Blob 2 */}
      <div
        className="
          absolute
          top-[30%] right-[-15%]
          h-[450px] w-[450px]
          rounded-full
          bg-purple-500/20
          blur-[140px]
          animate-aurora-medium
        "
      />

      {/* Blob 3 */}
      <div
        className="
          absolute
          bottom-[-20%] left-[30%]
          h-[400px] w-[400px]
          rounded-full
          bg-pink-500/20
          blur-[120px]
          animate-aurora-fast
        "
      />
    </div>
  );
}
