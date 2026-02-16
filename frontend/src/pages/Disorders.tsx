import { Navbar } from "@/components/Navbar";
import { GradientButton } from "@/components/ui/gradient-button";
import { Link } from "react-router-dom";
import { ArrowLeft, Brain, AlertCircle, HeartPulse, Zap, RefreshCw, Lightbulb } from "lucide-react";

interface DisordersProps {
  onLogout: () => void;
}

const disorders = [
  {
    id: "depression",
    name: "Depression",
    icon: Brain,
    color: "violet",
    description: "A mood disorder causing persistent feelings of sadness, hopelessness, and loss of interest in daily activities.",
    impact: "Affects work performance, relationships, and physical health. Can lead to sleep problems, appetite changes, and difficulty concentrating.",
    tips: [
      "Maintain a regular sleep schedule",
      "Exercise regularly, even if just a short walk",
      "Connect with supportive friends and family",
      "Consider professional therapy or counseling",
      "Practice mindfulness and relaxation techniques",
    ],
  },
  {
    id: "anxiety",
    name: "Anxiety",
    icon: AlertCircle,
    color: "purple",
    description: "Characterized by excessive worry, nervousness, and fear that can interfere with daily activities.",
    impact: "Can cause panic attacks, avoidance behaviors, and physical symptoms like rapid heartbeat, sweating, and trembling.",
    tips: [
      "Practice deep breathing exercises",
      "Limit caffeine and alcohol intake",
      "Challenge negative thought patterns",
      "Create a calming daily routine",
      "Seek cognitive behavioral therapy (CBT)",
    ],
  },
  {
    id: "stress",
    name: "Chronic Stress",
    icon: Zap,
    color: "pink",
    description: "A prolonged state of physical and emotional tension resulting from demanding circumstances or life events.",
    impact: "Weakens immune system, increases risk of heart disease, and can lead to anxiety, depression, and burnout.",
    tips: [
      "Identify and address stress triggers",
      "Set boundaries at work and home",
      "Take regular breaks throughout the day",
      "Practice stress-relief activities like yoga",
      "Prioritize self-care and rest",
    ],
  },
  {
    id: "ptsd",
    name: "PTSD",
    icon: HeartPulse,
    color: "violet",
    description: "Post-Traumatic Stress Disorder develops after experiencing or witnessing a traumatic event.",
    impact: "Causes flashbacks, nightmares, severe anxiety, and uncontrollable thoughts about the traumatic event.",
    tips: [
      "Work with a trauma-informed therapist",
      "Join a support group for trauma survivors",
      "Practice grounding techniques",
      "Gradually face triggers in safe environments",
      "Be patient with your healing process",
    ],
  },
  {
    id: "bipolar",
    name: "Bipolar Disorder",
    icon: RefreshCw,
    color: "purple",
    description: "A mental health condition marked by extreme mood swings including emotional highs (mania) and lows (depression).",
    impact: "Affects energy levels, judgment, and ability to think clearly. Can disrupt relationships and daily functioning.",
    tips: [
      "Maintain consistent medication as prescribed",
      "Track mood patterns and triggers",
      "Establish regular sleep and eating routines",
      "Build a strong support network",
      "Learn to recognize early warning signs",
    ],
  },
];

const colorClasses = {
  violet: {
    bg: "bg-violet-light",
    text: "text-violet-dark",
    border: "border-violet/20",
    icon: "bg-gradient-to-br from-violet to-purple",
    gradient: "from-violet to-purple",
  },
  purple: {
    bg: "bg-purple-light",
    text: "text-purple-dark",
    border: "border-purple/20",
    icon: "bg-gradient-to-br from-purple to-pink",
    gradient: "from-purple to-pink",
  },
  pink: {
    bg: "bg-pink-light",
    text: "text-pink-dark",
    border: "border-pink/20",
    icon: "bg-gradient-to-br from-pink to-violet",
    gradient: "from-pink to-violet",
  },
};

export default function Disorders({ onLogout }: DisordersProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-glow opacity-30" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      
      <Navbar isAuthenticated onLogout={onLogout} />

      <main className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <Link to="/home">
              <GradientButton variant="ghost" size="sm" className="mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </GradientButton>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  Basic Mental Health Disorders
                </h1>
                <p className="text-muted-foreground mt-1">
                  Understanding common conditions for better awareness
                </p>
              </div>
            </div>
          </div>

          {/* Disorders Grid */}
          <div className="space-y-8">
            {disorders.map((disorder, index) => {
              const colors = colorClasses[disorder.color as keyof typeof colorClasses];
              const Icon = disorder.icon;

              return (
                <div
                  key={disorder.id}
                  className="glass-card rounded-2xl overflow-hidden animate-slide-up hover:shadow-glow transition-shadow duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-6 md:p-8 ${colors.bg}`}>
                    <div className="flex items-start gap-4">
                      <div className={`h-14 w-14 rounded-xl ${colors.icon} flex items-center justify-center flex-shrink-0 text-primary-foreground`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                          {disorder.name}
                        </h2>
                        <p className="text-foreground/80 leading-relaxed">
                          {disorder.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                    {/* Impact Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <HeartPulse className="h-5 w-5 text-pink" />
                        <h3 className="font-semibold text-foreground">Impact on Daily Life</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {disorder.impact}
                      </p>
                    </div>

                    {/* Tips Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-5 w-5 text-violet" />
                        <h3 className="font-semibold text-foreground">Management Tips</h3>
                      </div>
                      <ul className="space-y-2">
                        {disorder.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className={`h-1.5 w-1.5 rounded-full mt-2 bg-gradient-to-r ${colors.gradient}`} />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Concerned about your mental health?
            </p>
            <Link to="/risk-analysis">
              <GradientButton size="lg">
                Take Risk Assessment
              </GradientButton>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
