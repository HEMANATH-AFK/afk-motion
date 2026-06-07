import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { ShowcaseDashboard } from "./pages/ShowcaseDashboard";
import { DocsGuide } from "./pages/DocsGuide";
import { ComponentShowcasePage } from "./pages/ComponentShowcasePage";
import { Navbar } from "./components/Navbar";
import { CommandPalette } from "./components/CommandPalette";
import { useDocsStore } from "./store/useDocsStore";

export const App: React.FC = () => {
  const { theme } = useDocsStore();

  // Synchronise global theme configurations on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col bg-[#07070a] text-slate-100 ${theme === "light" ? "light-mode" : ""}`}>
        
        {/* Global Nav Bar Header */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <div className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<ShowcaseDashboard />} />
            <Route path="/docs" element={<DocsGuide />} />
            <Route path="/explore/:category/:component" element={<ComponentShowcasePage />} />
            
            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global Search command palette overlay */}
        <CommandPalette />

      </div>
    </Router>
  );
};
