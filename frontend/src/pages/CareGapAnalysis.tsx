import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GradientButton } from "@/components/ui/gradient-button";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Lightbulb,
  DollarSign,
  Clock,
  Sparkles,
  HeartPulse,
} from "lucide-react";

interface CareGapAnalysisProps {
  onLogout: () => void;
}

export default function CareGapAnalysis({ onLogout }: CareGapAnalysisProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/care-gap-form");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 gradient-glow opacity-30" />

      <Navbar isAuthenticated onLogout={onLogout} />

      <main className="relative pt-24 pb-28 px-6">
        {/* ⬇ Increased spacing here */}
        <div className="max-w-7xl mx-auto space-y-16">

          {/* BACK */}
          <Link to="/home">
            <GradientButton variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </GradientButton>
          </Link>

          {/* ================= HERO ================= */}
          <section className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT STORY */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mt-2">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-violet-300">
                  Mental Health Awareness
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
                The gap between{" "}
                <span className="gradient-text">needing</span>
                <br />
                care and{" "}
                <span className="gradient-text">receiving</span> it
                <br />
                is wider than we think.
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Mental health care gaps are silent barriers —
                stopping people from getting help even when support exists.
                Understanding them is the first step toward real intervention.
              </p>

              <GradientButton
                size="xl"
                className="px-14 h-16 text-lg"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Analyzing care gaps…
                  </>
                ) : (
                  <>
                    Care Gap Analyze
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </GradientButton>
            </div>

            {/* RIGHT VISUAL */}
            <div className="relative glass-card rounded-3xl p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-3xl" />
              <div className="relative space-y-6">
                <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center">
                  <HeartPulse className="h-7 w-7 text-white" />
                </div>
                <p className="text-3xl font-bold">
                  <span className="text-violet-400">56%</span>
                </p>
                <p className="text-lg text-muted-foreground">
                  of people with mental health conditions
                  never receive the care they need.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Care exists — but access doesn’t always follow.
                </p>
              </div>
            </div>
          </section>

          {/* ===== DIVIDER ===== */}
          <div className="flex justify-center">
            <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
          </div>

          {/* ================= CARE GAP FLOW ================= */}
          <section className="grid md:grid-cols-4 gap-10 text-center">
            {[
              { icon: MapPin, title: "Access", desc: "Care is too far away" },
              { icon: Lightbulb, title: "Awareness", desc: "Symptoms go unnoticed" },
              { icon: DollarSign, title: "Affordability", desc: "Cost blocks treatment" },
              { icon: Clock, title: "Availability", desc: "Help comes too late" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="space-y-4">
                  <div className="mx-auto h-14 w-14 rounded-full bg-violet-500/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              );
            })}
          </section>

          {/* ===== SOFT SPACER + DIVIDER ===== */}
          <div className="h-1" />
          <div className="flex justify-center">
            <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
          </div>
          <div className="h-5" />

          {/* ================= WHY IT MATTERS ================= */}
          <section className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-serif font-bold">
              Why care gaps matter
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When help feels unreachable, people stop asking.
              Delayed care leads to worsening symptoms,
              lower quality of life, and deeper societal impact.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Closing care gaps means earlier intervention,
              better recovery, and fewer people suffering in silence.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
