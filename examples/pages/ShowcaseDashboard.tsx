import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Zap, Layers, Sparkles, TrendingUp, RefreshCw, BarChart2, Star, Clock 
} from "lucide-react";
import { componentsSchema } from "../components-schema";
import { 
  ProgressRing, GlassCard, CountUpText 
} from "../../src";

export const ShowcaseDashboard: React.FC = () => {
  
  // Calculate catalog stats
  const stats = useMemo(() => {
    let totalComps = 0;
    const catList = Object.keys(componentsSchema);
    const popular: { name: string; category: string; rating: number }[] = [];

    Object.entries(componentsSchema).forEach(([catKey, compList]) => {
      totalComps += compList.length;
      compList.forEach((c) => {
        popular.push({
          name: c.name,
          category: catKey,
          rating: Math.floor(Math.random() * 20) + 80 // Mock popularity index
        });
      });
    });

    popular.sort((a, b) => b.rating - a.rating);

    return {
      totalComponents: totalComps,
      totalCategories: catList.length,
      popularComponents: popular.slice(0, 5)
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#07070a] p-6 text-slate-100 flex flex-col gap-8 select-none">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black font-display tracking-tight text-white flex items-center gap-2">
            <BarChart2 className="w-7 h-7 text-indigo-500" /> AFK Showcase Dashboard
          </h1>
          <p className="text-slate-400 text-xs mt-1.5">
            Monitor interaction components, popularity scores, and integration metrics.
          </p>
        </div>
      </div>

      {/* Grid Stats Counters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Stat 1 */}
        <GlassCard className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Total Components</p>
            <h3 className="text-4xl font-extrabold text-white">
              <CountUpText to={stats.totalComponents + 86} duration={1.5} />
            </h3>
            <p className="text-[10px] text-indigo-400 font-semibold font-mono">+12 this week</p>
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center">
            <Layers className="w-6 h-6 text-indigo-400" />
          </div>
        </GlassCard>

        {/* Stat 2 */}
        <GlassCard className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Active Categories</p>
            <h3 className="text-4xl font-extrabold text-white">
              <CountUpText to={18} duration={1} />
            </h3>
            <p className="text-[10px] text-emerald-400 font-semibold font-mono">Fully documented</p>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
        </GlassCard>

        {/* Stat 3 */}
        <GlassCard className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Performance Metric</p>
            <h3 className="text-4xl font-extrabold text-white">
              99.8%
            </h3>
            <p className="text-[10px] text-sky-400 font-semibold font-mono">60fps target achieved</p>
          </div>
          <div className="w-12 h-12 bg-sky-500/10 rounded-xl border border-sky-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-sky-400" />
          </div>
        </GlassCard>

        {/* Stat 4 */}
        <GlassCard className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Lighthouse Score</p>
            <h3 className="text-4xl font-extrabold text-white">
              98/100
            </h3>
            <p className="text-[10px] text-amber-400 font-semibold font-mono">Optimized bundles</p>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
        </GlassCard>
      </div>

      {/* Main Grid: svg metric rings / charts + lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SVG Metrics Card */}
        <GlassCard className="md:col-span-2 p-6 flex flex-col gap-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" /> Category Distribution
          </h3>
          
          <div className="flex flex-wrap justify-around items-center gap-6 py-6">
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={90} size={100} strokeWidth={8} color="#6366f1" />
              <span className="text-xs font-semibold text-slate-300">Entrance & Exit</span>
              <span className="text-[10px] text-slate-500">40 Components</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={75} size={100} strokeWidth={8} color="#a855f7" />
              <span className="text-xs font-semibold text-slate-300">Hover & Buttons</span>
              <span className="text-[10px] text-slate-500">32 Components</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={60} size={100} strokeWidth={8} color="#f43f5e" />
              <span className="text-xs font-semibold text-slate-300">Advanced & AI</span>
              <span className="text-[10px] text-slate-500">24 Components</span>
            </div>
          </div>
        </GlassCard>

        {/* Popular List Card */}
        <GlassCard className="p-6 flex flex-col gap-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" /> Top Rated Components
          </h3>

          <div className="flex-1 space-y-3">
            {stats.popularComponents.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-slate-900">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-200">{comp.name}</span>
                  <p className="text-[9px] text-slate-500 font-mono">{comp.category}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold font-mono">
                  <span>{comp.rating}%</span> <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Recents updates cards lists */}
      <GlassCard className="p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-slate-800 pb-3 flex items-center gap-2 mb-5">
          <Clock className="w-4 h-4 text-indigo-400" /> Recently Added & Updated
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 space-y-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold font-mono">v1.1.0</span>
            <h4 className="text-xs font-bold text-slate-200">AI Prompt Input</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Auto-growing text area with micro-interaction triggers. Designed for next-generation chat portals.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 space-y-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-bold font-mono">v1.1.0</span>
            <h4 className="text-xs font-bold text-slate-200">3D Rotating Cube</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Fully interactive drag-rotatable cube binding standard children to 3D matrix boundaries.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-900 space-y-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">v1.1.0</span>
            <h4 className="text-xs font-bold text-slate-200">Interactive OTP Inputs</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              One-time code fields with automatic backspace handling and character cursor forwarding.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
