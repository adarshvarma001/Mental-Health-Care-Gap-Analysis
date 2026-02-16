import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

/* ===== PAGES ===== */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Disorders from "./pages/Disorders";
import RiskAnalysis from "./pages/RiskAnalysis";
import CareGapAnalysis from "./pages/CareGapAnalysis";
import CareGapForm from "./pages/CareGapForm";
import CareGapFollowUp from "./pages/CareGapFollowUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {/* ===== ROOT ===== */}
            <Route
              path="/"
              element={
                <Navigate
                  to={isAuthenticated ? "/home" : "/login"}
                  replace
                />
              }
            />

            {/* ===== AUTH ===== */}
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Signup onSignup={handleLogin} />
                )
              }
            />

            {/* ===== MAIN PAGES ===== */}
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/disorders"
              element={
                isAuthenticated ? (
                  <Disorders onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            
            <Route
              path="/risk-analysis"
              element={
                isAuthenticated ? (
                  <RiskAnalysis />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            
            <Route
              path="/care-gap-analysis"
              element={
                isAuthenticated ? (
                  <CareGapAnalysis onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* ===== CARE GAP FLOW ===== */}
            <Route
              path="/care-gap-form"
              element={
                isAuthenticated ? (
                  <CareGapForm />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/care-gap-followup"
              element={
                isAuthenticated ? (
                  <CareGapFollowUp onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* ===== FALLBACK ===== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
