import { Link } from "react-router-dom";
import { Brain, Activity, Search, Heart, Sparkles, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/ui/feature-card";
import { GradientButton } from "@/components/ui/gradient-button";

interface HomeProps {
  onLogout: () => void;
}

const quotes = [
  "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
  "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
  "It's okay to not be okay. Healing takes time, and asking for help is a courageous step.",
];

export default function Home({ onLogout }: HomeProps) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-glow opacity-30" />
      <div className="absolute top-1/3 -left-64 w-[500px] h-[500px] bg-violet/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-64 w-[500px] h-[500px] bg-pink/5 rounded-full blur-3xl" />
      
      <Navbar isAuthenticated onLogout={onLogout} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Motivational Quote */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-violet-dark text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Daily Inspiration
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground max-w-4xl mx-auto leading-relaxed">
              "{randomQuote}"
            </blockquote>
          </div>

          {/* Welcome Card */}
          <div className="neon-border rounded-3xl p-8 md:p-12 mb-12 animate-slide-up relative overflow-hidden">
            <div className="absolute inset-0 gradient-glow opacity-20" />
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-6 w-6 text-pink" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Understanding Mental Health
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  Mental Health Care Gap Analysis
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Care gap analysis in mental health identifies the difference between 
                  the care patients need and the care they actually receive. By understanding 
                  these gaps, we can work towards more accessible, affordable, and effective 
                  mental health support for everyone.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-violet" />
                    <span>Evidence-based insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-purple" />
                    <span>Personalized analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-pink" />
                    <span>Actionable recommendations</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full gradient-primary opacity-20 blur-3xl absolute inset-0" />
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full neon-border flex items-center justify-center animate-float">
                    <Brain className="h-24 w-24 md:h-32 md:w-32 text-violet" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/disorders" className="block group">
              <FeatureCard
                icon={Brain}
                title="Basic Disorders"
                description="Explore common mental health disorders, their symptoms, impacts, and management strategies."
                gradient="violet"
                className="h-full cursor-pointer"
              />
              <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link to="/risk-analysis" className="block group">
              <FeatureCard
                icon={Activity}
                title="Risk Analysis"
                description="Assess your mental health risk factors and receive personalized insights for better wellbeing."
                gradient="purple"
                className="h-full cursor-pointer"
              />
              <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Start assessment <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            <Link to="/care-gap-analysis" className="block group">
              <FeatureCard
                icon={Search}
                title="Care Gap Analysis"
                description="Identify barriers in mental health care access and discover resources to bridge those gaps."
                gradient="pink"
                className="h-full cursor-pointer"
              />
              <div className="mt-4 flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Analyze gaps <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Ready to understand your mental health better?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/disorders">
                <GradientButton size="lg">
                  <Brain className="h-5 w-5" />
                  View Basic Disorders
                </GradientButton>
              </Link>
              <Link to="/risk-analysis">
                <GradientButton variant="outline" size="lg">
                  <Activity className="h-5 w-5" />
                  Start Risk Analysis
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mindful Path Explorer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
