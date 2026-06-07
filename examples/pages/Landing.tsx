import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, ShieldCheck, Flame, Compass, Sliders, Play, 
  Terminal, Globe, Zap, Cpu, MousePointer, Layers
} from "lucide-react";
import { useDocsStore } from "../store/useDocsStore";

// Import components directly from src package
import { 
  FadeUp, FadeIn, ScaleIn, GlowButton, NeonButton, GradientButton, 
  TiltCard, GlassCard, ScrambleText, GlitchText, InfiniteTicker, SplitText
} from "../../src";

export const Landing: React.FC = () => {
  const { theme } = useDocsStore();
  const [copiedInstall, setCopiedInstall] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("npm install @hemanath-afk/afk-motion");
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className={`min-h-screen bg-[#07070a] text-slate-100 flex flex-col relative overflow-hidden select-none`}>
      
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 max-w-6xl mx-auto text-center flex flex-col items-center justify-center min-h-[85vh] z-10">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <Flame className="w-3.5 h-3.5" /> High Performance Micro-Interactions
          </div>
        </FadeIn>

        <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Animate React Sites <br />
          With <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Physics-Based</span> Loops
        </h1>

        <FadeUp delay={0.25}>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mb-8 leading-relaxed">
            Zero-layout friction, premium components designed for developers who value fluid details. Built on Framer Motion and spring physics.
          </p>
        </FadeUp>

        {/* Action Button Triggers */}
        <FadeUp delay={0.35}>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <Link to="/explore/entrance/FadeUp">
              <GradientButton style={{ padding: "14px 28px", fontSize: "0.95rem" }}>
                Explore Components <ArrowRight className="w-4 h-4 ml-1" />
              </GradientButton>
            </Link>
            <Link to="/docs">
              <button className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold hover:border-slate-700 hover:text-white transition-all inline-flex items-center gap-2">
                Documentation
              </button>
            </Link>
          </div>
        </FadeUp>

        {/* Copy command box */}
        <FadeUp delay={0.45}>
          <div className="flex items-center bg-slate-950/80 border border-slate-800/80 rounded-xl p-1.5 pl-4 max-w-md w-full">
            <Terminal className="w-4 h-4 text-slate-500 mr-2.5 shrink-0" />
            <code className="text-xs font-mono text-indigo-400 flex-1 text-left select-all">
              npm install @hemanath-afk/afk-motion
            </code>
            <button
              onClick={handleCopyInstall}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-all"
            >
              {copiedInstall ? "Copied!" : "Copy"}
            </button>
          </div>
        </FadeUp>
      </section>

      {/* Infinite Logo Clouds / Tickers */}
      <section className="py-12 border-y border-slate-800/40 bg-slate-950/20 z-10 relative">
        <InfiniteTicker speed={25}>
          <div className="flex gap-16 text-slate-500 font-mono text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-500" /> Framer Motion</span>
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-emerald-500" /> Spring Easing</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-sky-500" /> Zero Layout Shift</span>
            <span className="flex items-center gap-2"><MousePointer className="w-4 h-4 text-purple-500" /> Apple Physics</span>
            <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-pink-500" /> Tailwind Integrated</span>
          </div>
        </InfiniteTicker>
      </section>

      {/* Bento Grid Feature Showcase */}
      <section className="py-24 px-6 max-w-6xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black font-display text-white mb-4">
            Designed for State-Of-The-Art UI
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
            Every file incorporates best performance structures, accessibility focus-outline loops, and custom spring parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <TiltCard maxTilt={10} scale={1.02} className="col-span-1 md:col-span-2 flex flex-col justify-between">
            <div className="p-4">
              <span className="text-indigo-400 text-xs font-bold font-mono">01 / PARALLAX TILT</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Responsive 3D Coordinate Mapping</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tilt card components track hover triggers dynamically, executing coordinate offsets to generate smooth perspective rotations directly on GPU composite layers.
              </p>
            </div>
            <div className="h-32 bg-indigo-500/5 rounded-b-xl border-t border-slate-800/40 flex items-center justify-center gap-6">
              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center font-bold">A</div>
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center font-bold">F</div>
              <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/20 rounded-lg flex items-center justify-center font-bold">K</div>
            </div>
          </TiltCard>

          {/* Card 2 */}
          <GlassCard className="flex flex-col justify-between">
            <div className="p-4">
              <span className="text-purple-400 text-xs font-bold font-mono">02 / CYBERPUNK CHROME</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Glitch & Neon Typography</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Add sci-fi styling with dynamic chromatic abbreviations, random text scrambled arrays, and text shadows that flicker.
              </p>
            </div>
            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-center min-h-[100px]">
              <GlitchText className="text-lg font-bold tracking-widest text-indigo-400">DECRYPTING...</GlitchText>
            </div>
          </GlassCard>

          {/* Card 3 */}
          <GlassCard className="flex flex-col justify-between">
            <div className="p-4">
              <span className="text-pink-400 text-xs font-bold font-mono">03 / GLOW SHIFT</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Custom Shadow Halos</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Buttons map glowing shadows on hover. Custom radial gradient lines follow cursors to reveal items inside the spotlight.
              </p>
            </div>
            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-center gap-3 min-h-[100px]">
              <GlowButton color="rgba(99,102,241,0.5)">Glow Mode</GlowButton>
            </div>
          </GlassCard>

          {/* Card 4 */}
          <TiltCard maxTilt={8} scale={1.02} className="col-span-1 md:col-span-2 flex flex-col justify-between">
            <div className="p-4">
              <span className="text-emerald-400 text-xs font-bold font-mono">04 / ACCESSIBILITY ENFORCED</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3">Aria-Friendly Structures</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Includes strict WCAG keyboard navigation support, focus containment dialog loops, reduced motion preferences, and readable fallback labels.
              </p>
            </div>
            <div className="h-32 bg-emerald-500/5 rounded-b-xl border-t border-slate-800/40 flex items-center justify-center p-4">
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> WCAG 2.1 AA Compliant
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Landing footer */}
      <footer className="mt-auto py-8 px-6 border-t border-slate-800/40 bg-slate-950 text-slate-500 text-xs text-center z-10 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AFK Motion. Released under the MIT license.</p>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </a>
            <Link to="/explore/entrance/FadeUp" className="hover:text-slate-300 transition-colors">Catalog Explorer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
