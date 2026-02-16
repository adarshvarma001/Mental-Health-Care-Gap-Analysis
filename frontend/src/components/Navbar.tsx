import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/gradient-button";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ isAuthenticated = false, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = isAuthenticated
    ? [
        { href: "/home", label: "Home" },
        { href: "/disorders", label: "Disorders" },
        { href: "/risk-analysis", label: "Risk Analysis" },
        { href: "/care-gap-analysis", label: "Care Gap" },
      ]
    : [];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        glass-card border-b border-border/50
        rounded-b-2xl md:rounded-b-3xl
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/home" : "/login"}
            className="flex items-center gap-2 text-xl font-serif font-semibold text-foreground"
          >
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:block">MindCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link.href)
                    ? "bg-violet-light text-violet-dark"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <GradientButton
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </GradientButton>
            ) : (
              <>
                <Link to="/login">
                  <GradientButton variant="ghost" size="sm">
                    Login
                  </GradientButton>
                </Link>
                <Link to="/signup">
                  <GradientButton size="sm">Sign Up</GradientButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "bg-violet-light text-violet-dark"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <GradientButton variant="ghost" className="w-full">
                      Login
                    </GradientButton>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <GradientButton className="w-full">
                      Sign Up
                    </GradientButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
