import { ReactNode } from "react";
import authBg from "@/assets/auth-bg.jpg";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* ===== CINEMATIC GRAIN OVERLAY ===== */}
      <div className="absolute inset-0 pointer-events-none noise z-50" />

      {/* ===== BACKGROUND IMAGE (SLOW DRIFT) ===== */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center animate-[slow-drift_40s_linear_infinite]"
        style={{
          backgroundImage: `url(${authBg})`,
        }}
      />

      {/* ===== SOFT DARK OVERLAY (READABILITY) ===== */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/20 via-black/10 to-black/30" />

      {/* ===== AURORA MOTION LAYER ===== */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-500/35 blur-[160px] animate-aurora-slow" />
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/35 blur-[160px] animate-aurora-medium" />
        <div className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full bg-pink-500/35 blur-[160px] animate-aurora-fast" />
      </div>

      {/* ===== FLOATING GLASS AUTH CARD ===== */}
      <div className="relative z-30 w-full max-w-md px-6">
        {/* Glass backdrop */}
        <div className="absolute -inset-6 rounded-3xl bg-white/5 backdrop-blur-2xl" />

        {/* Card content */}
        <div className="relative p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-white">
              {title}
            </h2>

            <p className="text-white/60 mt-1">
              {subtitle}
            </p>

            {/* Supportive mental-health line */}
            <p className="text-sm text-white/70 italic mt-2">
              It’s okay to take things one step at a time.
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
