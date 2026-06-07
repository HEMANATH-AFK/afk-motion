import React, { useState } from "react";
import { 
  BookOpen, Terminal, Check, HelpCircle, FileCode2, Zap, AlertTriangle 
} from "lucide-react";
import { GlassCard } from "../../src";

export const DocsGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"install" | "api" | "faq" | "changelog">("install");
  const [copiedInstall, setCopiedInstall] = useState<Record<string, boolean>>({});

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedInstall((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex select-none">
      
      {/* Sidebar Documentation Sections */}
      <aside className="w-64 border-r border-slate-800 bg-[#07070a]/90 backdrop-blur-md p-6 flex flex-col gap-6 shrink-0">
        <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Documentation Portal</h4>
        <nav className="flex flex-col gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("install")}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              activeTab === "install" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
            }`}
          >
            🚀 Getting Started
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              activeTab === "api" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
            }`}
          >
            📋 API Reference
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              activeTab === "faq" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
            }`}
          >
            💡 FAQ
          </button>
          <button
            onClick={() => setActiveTab("changelog")}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all ${
              activeTab === "changelog" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-850"
            }`}
          >
            🔄 Changelog
          </button>
        </nav>
      </aside>

      {/* Main Documentation Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-4xl">
        
        {/* Getting Started Guide */}
        {activeTab === "install" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-display text-white">Getting Started & Installation</h1>
              <p className="text-slate-400 text-sm mt-2">
                Learn how to integrate AFK Motion into your React application using npm, yarn, or pnpm.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">1. Install Library</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Run one of the following commands in your project terminal root:
              </p>

              {/* Install tabs */}
              <div className="space-y-2">
                {/* npm */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-850 font-mono text-xs text-indigo-400">
                  <span>npm install @hemanath-afk/afk-motion</span>
                  <button onClick={() => handleCopyCode("npm", "npm install @hemanath-afk/afk-motion")} className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1 rounded hover:text-white transition-colors">
                    {copiedInstall.npm ? <Check className="w-3.5 h-3.5 text-green-400" /> : "Copy"}
                  </button>
                </div>
                {/* yarn */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-850 font-mono text-xs text-indigo-400">
                  <span>yarn add @hemanath-afk/afk-motion</span>
                  <button onClick={() => handleCopyCode("yarn", "yarn add @hemanath-afk/afk-motion")} className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1 hover:text-white transition-colors">
                    {copiedInstall.yarn ? <Check className="w-3.5 h-3.5 text-green-400" /> : "Copy"}
                  </button>
                </div>
                {/* pnpm */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-850 font-mono text-xs text-indigo-400">
                  <span>pnpm add @hemanath-afk/afk-motion</span>
                  <button onClick={() => handleCopyCode("pnpm", "pnpm add @hemanath-afk/afk-motion")} className="text-[10px] bg-slate-900 border border-slate-800 px-3 py-1 hover:text-white transition-colors">
                    {copiedInstall.pnpm ? <Check className="w-3.5 h-3.5 text-green-400" /> : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              <h3 className="text-lg font-bold text-slate-200">2. Basic Usage</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Import and wrap components to apply premium physics-based animations:
              </p>
              
              <pre className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
{`import { FadeUp, GlowButton } from "@hemanath-afk/afk-motion";

export default function Home() {
  return (
    <FadeUp duration={0.8} delay={0.2}>
      <div className="card">
        <h2>Welcome to AFK Motion</h2>
        <GlowButton color="rgba(99,102,241,0.5)">
          Get Started
        </GlowButton>
      </div>
    </FadeUp>
  );
}`}
              </pre>
            </div>

            {/* Performance warnings alerts */}
            <div className="p-4 bg-indigo-950/20 border border-indigo-900/40 rounded-xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">Performance recommendation</p>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  To ensure 60fps responsiveness inside heavy dashboard pages, wrap custom mouse handlers inside requestAnimationFrame hooks. The library handles coordinate calculations automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* API Reference */}
        {activeTab === "api" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-display text-white">API Reference & Hooks</h1>
              <p className="text-slate-400 text-sm mt-2">
                Detailed API list and react hooks configurations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-md font-bold text-slate-200">useScrollProgress()</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Returns vertical scroll percentages and triggers events on layout updates. Used inside progress bars and parallax timelines.
                </p>
                <pre className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg font-mono text-xs text-indigo-400">
                  {`const { scrollY, scrollProgress, onChange } = useScrollProgress();`}
                </pre>
              </div>

              <div className="space-y-2 border-t border-slate-800/40 pt-4">
                <h3 className="text-md font-bold text-slate-200">useTilt(ref, options)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Binds direct coordinate event handlers to DOM elements to calculate 3D tilt vectors.
                </p>
                <pre className="p-3 bg-slate-950/60 border border-slate-850 rounded-lg font-mono text-xs text-indigo-400">
                  {`const tilt = useTilt(elementRef, { maxTilt: 15, scale: 1.05 });`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* FAQs */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-display text-white">Frequently Asked Questions</h1>
              <p className="text-slate-400 text-sm mt-2">
                Find quick answers about package capabilities and browser support.
              </p>
            </div>

            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-2">
                <h4 className="text-sm font-bold text-slate-200">Does it support Tailwind CSS?</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Yes, AFK Motion is utility-agnostic. The internal libraries use standard vanilla CSS and inline styles, allowing you to wrap them in any class layout structure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-2">
                <h4 className="text-sm font-bold text-slate-200">What is the performance weight of this library?</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  The bundle is extremely optimized. It lists Framer Motion as a peer dependency to avoid double installation loads, keeping the direct bundle impact minimal.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Changelog */}
        {activeTab === "changelog" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black font-display text-white">Changelog & Updates</h1>
              <p className="text-slate-400 text-sm mt-2">
                Track versions, fixes, and updates.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-indigo-500 pl-4 space-y-2">
                <span className="text-xs font-bold text-indigo-400 font-mono">v1.1.0 (Current Version)</span>
                <h4 className="text-xs font-bold text-slate-200">Released expansion package</h4>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Added AI Era inputs interfaces and trackers.</li>
                  <li>Implemented macOS scale proximity DockMenu navigation widgets.</li>
                  <li>Added full 3D interactive rotatable cubes widgets.</li>
                  <li>Resolved JSX types default properties constraints errors.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
