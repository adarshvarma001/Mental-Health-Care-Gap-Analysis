import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: "violet" | "purple" | "pink";
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon: Icon, title, description, gradient = "violet", ...props }, ref) => {
    const gradientClasses = {
      violet: "from-violet to-purple",
      purple: "from-purple to-pink",
      pink: "from-pink to-violet",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:shadow-glow hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {/* Gradient accent */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 bg-gradient-to-br",
            gradientClasses[gradient]
          )}
        />
        
        {/* Icon container */}
        <div
          className={cn(
            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-primary-foreground",
            gradientClasses[gradient]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>

        {/* Content */}
        <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
