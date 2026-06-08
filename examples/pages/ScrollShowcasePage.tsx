import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDocsStore } from "../store/useDocsStore";
import { 
  Sliders, RotateCcw, Copy, Check, Eye, Code, Sparkles, X, 
  BookOpen, Compass, BarChart3, Users, Image as ImageIcon, MapPin, Milestone, ArrowUp 
} from "lucide-react";
import * as AFK from "../../src";

// Define scroll components metadata
interface ComponentProp {
  name: string;
  type: "string" | "number" | "boolean" | "select" | "color";
  default: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  description: string;
}

interface ScrollComponentMeta {
  name: string;
  importName: string;
  description: string;
  props: ComponentProp[];
  realWorldDesc: string;
  advancedDesc: string;
  propsDoc: Record<string, string>;
}

const SCROLL_COMPONENTS: Record<string, ScrollComponentMeta> = {
  ScrollProgress: {
    name: "Scroll Progress",
    importName: "ScrollProgress",
    description: "Reading progress indicator bar fixed to the top or bottom of a viewport or wrapper container. Built with spring physics for smooth, lag-free scaling.",
    realWorldDesc: "A standard blog reading layout displaying an animated progress line at the top of the article as the reader scrolls down.",
    advancedDesc: "Combining ScrollProgress with gradient fills and a sticky page header containing reading metrics (e.g. reading time dynamically updating).",
    propsDoc: {
      color: "Color code (HEX, rgb, etc.) of the progress tracking line.",
      height: "Thickness of the progress bar line in pixels.",
      container: "React Ref of the scrollable container. Defaults to the window context."
    },
    props: [
      { name: "color", type: "color", default: "#6366f1", description: "Color of the progress bar line" },
      { name: "height", type: "number", default: 4, min: 2, max: 16, step: 1, description: "Height thickness of the line (px)" }
    ]
  },
  ScrollTop: {
    name: "Scroll Top",
    importName: "ScrollTop",
    description: "Floating back-to-top button with circular, minimal, percentage, linear, square, or glow progress indicators. Animates page scrolling with custom easing controls.",
    realWorldDesc: "A premium floating action button that appears after scrolling past a threshold, displaying the scroll percentage inside a glass bubble.",
    advancedDesc: "A wide linear footer banner pinned at the bottom of the screen containing progress indicators and scroll-up buttons.",
    propsDoc: {
      variant: "Visual variant style: 'circle', 'minimal', 'percentage', 'linear', 'dotted', 'square', or 'glow'.",
      size: "Overall diameter dimension of the circular floating button (px).",
      threshold: "Scroll position threshold in pixels before the button fades into view.",
      progressColor: "Color of the active progress ring, text, or progress line.",
      glass: "Enables glassmorphic backdrop filters and semi-transparent borders."
    },
    props: [
      { name: "variant", type: "select", default: "circle", options: ["circle", "minimal", "percentage", "linear", "dotted", "square", "glow"], description: "Visual variant style" },
      { name: "size", type: "number", default: 60, min: 40, max: 100, step: 5, description: "Overall button size (px)" },
      { name: "threshold", type: "number", default: 150, min: 50, max: 600, step: 25, description: "Scroll visibility threshold (px)" },
      { name: "progressColor", type: "color", default: "#6366f1", description: "Progress indicator track color" },
      { name: "glass", type: "boolean", default: true, description: "Enable glassmorphism styling" }
    ]
  },
  ScrollReveal: {
    name: "Scroll Reveal",
    importName: "ScrollReveal",
    description: "Fades and translates elements into view as they intersect the viewport. Perfect for staggered lists and content panels.",
    realWorldDesc: "Staggered feature sections and description boxes sliding upwards as you scroll down a SaaS landing layout.",
    advancedDesc: "A grid of services cards that slide, scale, and fade in sequentially with custom delays.",
    propsDoc: {
      duration: "Duration of the entry animation in seconds.",
      delay: "Delay in seconds before the animation begins once the element enters the viewport.",
      yOffset: "Initial vertical displacement in pixels. Positive values animate the element upwards."
    },
    props: [
      { name: "duration", type: "number", default: 0.6, min: 0.1, max: 3, step: 0.1, description: "Reveal duration (seconds)" },
      { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Reveal delay offset (seconds)" },
      { name: "yOffset", type: "number", default: 40, min: 0, max: 150, step: 5, description: "Vertical entry distance displacement (px)" }
    ]
  },
  ScrollFade: {
    name: "Scroll Fade",
    importName: "ScrollFade",
    description: "Dynamically maps the scroll coordinates to opacity value. Fades in as it enters view, and fades out as it scrolls out.",
    realWorldDesc: "Alternating feature overview blocks that smoothly fade in as they reach the screen center and fade out as they leave.",
    advancedDesc: "Overlaid headline elements fading out sequentially to create a cinematic page-fold transition.",
    propsDoc: {
      container: "React Ref of the scrollable container. Defaults to the window context."
    },
    props: []
  },
  ScrollScale: {
    name: "Scroll Scale",
    importName: "ScrollScale",
    description: "Modulates component size/scaling factor dynamically mapped to scroll positions, creating a focal-zoom outline.",
    realWorldDesc: "A card-based product gallery showcasing clean item grids magnifying slightly as they scroll into view.",
    advancedDesc: "A prominent dashboard display card that starts small and scales up to fill the viewport as the user scrolls past.",
    propsDoc: {
      startScale: "Initial scale multiplier of the element when it is at the edge of the viewport.",
      endScale: "Maximum scale factor reached at the center or exit of the viewport.",
      container: "React Ref of the scrollable container."
    },
    props: [
      { name: "startScale", type: "number", default: 0.85, min: 0.5, max: 1, step: 0.05, description: "Scale multiplier at viewport entry" },
      { name: "endScale", type: "number", default: 1.05, min: 1, max: 1.5, step: 0.05, description: "Scale multiplier at viewport exit" }
    ]
  },
  ScrollRotate: {
    name: "Scroll Rotate",
    importName: "ScrollRotate",
    description: "Rotates elements dynamically mapped to the viewport's vertical scrolling progression. Excellent for creative layouts.",
    realWorldDesc: "A digital portfolio showing circular icons, gear widgets, or badges rotating continuously as the page scrolls.",
    advancedDesc: "A layout containing rotating decorative mesh wheels serving as background landmarks for features.",
    propsDoc: {
      maxRotation: "Maximum rotation angle in degrees applied at full scroll progress limits.",
      container: "React Ref of the scrollable container."
    },
    props: [
      { name: "maxRotation", type: "number", default: 45, min: 10, max: 180, step: 5, description: "Maximum angle rotation (degrees)" }
    ]
  },
  ScrollParallax: {
    name: "Scroll Parallax",
    importName: "ScrollParallax",
    description: "Translates elements at different relative speeds compared to normal scrolls. Creates immersive three-dimensional spatial depth.",
    realWorldDesc: "A layered hero header containing background graphics translating slower than foreground text as you scroll down.",
    advancedDesc: "A multi-layered product showcase section where specification elements float upwards over product backdrops.",
    propsDoc: {
      speed: "Pixel displacement scale value. Positive values translate downwards, negative values translate upwards.",
      container: "React Ref of the scrollable container."
    },
    props: [
      { name: "speed", type: "number", default: 100, min: -250, max: 250, step: 10, description: "Displacement speed factor (px)" }
    ]
  },
  ScrollBlur: {
    name: "Scroll Blur",
    importName: "ScrollBlur",
    description: "Adjusts CSS blur filters dynamically relative to the viewport vertical offsets. Creates premium focus transitions.",
    realWorldDesc: "Headline title cards and image layers starting heavily blurred and coming into sharp focus as they center in view.",
    advancedDesc: "A grid of article covers fading and blurring out as the reader scrolls past them, directing focus to active rows.",
    propsDoc: {
      maxBlur: "Maximum blur offset value in pixels applied at the entry and exit boundaries of the screen.",
      container: "React Ref of the scrollable container."
    },
    props: [
      { name: "maxBlur", type: "number", default: 10, min: 2, max: 30, step: 1, description: "Maximum entry blur strength (px)" }
    ]
  },
  ScrollPin: {
    name: "Scroll Pin",
    importName: "ScrollPin",
    description: "Pins elements to the viewport relative boundary while adjacent content continues to scroll. Great for narrative timelines.",
    realWorldDesc: "A storytelling panel where product specifications remain sticky on the left side while multiple images scroll on the right.",
    advancedDesc: "A split design pinning a code block on the right column while feature explanations scroll on the left.",
    propsDoc: {
      top: "Sticky vertical top boundary offset in pixels.",
      children: "React nodes and layout elements pinned within the container."
    },
    props: [
      { name: "top", type: "number", default: 20, min: 0, max: 150, step: 5, description: "Sticky vertical top offset (px)" }
    ]
  },
  ScrollZoom: {
    name: "Scroll Zoom",
    importName: "ScrollZoom",
    description: "Magnifies inner media elements (e.g. images) within a cropped container relative to scroll triggers.",
    realWorldDesc: "A hero background image scaling up smoothly as the page scrolls, creating an immersive camera zoom effect.",
    advancedDesc: "A vertical gallery showcase zooming into image textures when they intersect the central display zone.",
    propsDoc: {
      src: "Source path URL of the background image to zoom.",
      alt: "Alternative description text for accessibility labels.",
      container: "React Ref of the scrollable container."
    },
    props: [
      { name: "src", type: "string", default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80", description: "Image source URL" }
    ]
  },
  ScrollStagger: {
    name: "Scroll Stagger",
    importName: "ScrollStagger",
    description: "Cascades entrance animations for multiple children in a grid or layout sequentially as they enter the screen.",
    realWorldDesc: "A grid of team member cards or statistics panels fading in one after another when the row enters view.",
    advancedDesc: "A showcase dashboard grid where each stats widget pops and scales in a clean sequential wave.",
    propsDoc: {
      staggerDelay: "Stagger delay timing in seconds between consecutive child entries.",
      children: "List of child elements to animate sequentially."
    },
    props: [
      { name: "staggerDelay", type: "number", default: 0.1, min: 0.05, max: 0.5, step: 0.05, description: "Stagger delay step (seconds)" }
    ]
  },
  ScrollCounter: {
    name: "Scroll Counter",
    importName: "ScrollCounter",
    description: "Scroll-triggered count up number animator. Counts metrics from a starting point up to target figures when scrolled into view.",
    realWorldDesc: "An analytics panel showcasing active users count, sales stats, or lines of code counting up to target numbers.",
    advancedDesc: "Combining ScrollCounter with progress circular rings to illustrate dynamic data milestones.",
    propsDoc: {
      to: "Target metric number limit to count up to.",
      from: "Starting metric number offset (default is 0).",
      duration: "Counter animation duration in seconds."
    },
    props: [
      { name: "from", type: "number", default: 0, min: 0, max: 500, step: 10, description: "Starting counter value" },
      { name: "to", type: "number", default: 100, min: 10, max: 10000, step: 10, description: "Target limit counter value" },
      { name: "duration", type: "number", default: 1.5, min: 0.5, max: 5, step: 0.1, description: "Counter duration (seconds)" }
    ]
  },
  ScrollTimeline: {
    name: "Scroll Timeline",
    importName: "ScrollTimeline",
    description: "A vertical line progress tracker that expands dynamically as you scroll. Ideal for illustrating timelines, roadmaps, and sequences.",
    realWorldDesc: "A company timeline or project roadmap where a vertical path line connects milestone cards dynamically.",
    advancedDesc: "A dynamic steps wizard drawing path tracks between completed checkpoints inside a sidebar navigation.",
    propsDoc: {
      container: "React Ref of the scrollable container.",
      style: "Custom style overrides applied to the line wrapper container."
    },
    props: []
  }
};

export const ScrollShowcasePage: React.FC = () => {
  const { component: urlComponent } = useParams<{ component: string }>();
  const navigate = useNavigate();
  const { setSelectedComponent } = useDocsStore();

  const activeKey = (urlComponent && SCROLL_COMPONENTS[urlComponent]) ? urlComponent : "ScrollProgress";
  
  const setActiveKey = (key: string) => {
    navigate(`/explore/scroll/${key}`);
  };

  const [customProps, setCustomProps] = useState<Record<string, any>>({});
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showUnifiedDemo, setShowUnifiedDemo] = useState<boolean>(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const meta = SCROLL_COMPONENTS[activeKey];

  useEffect(() => {
    setSelectedComponent("scroll", activeKey);
  }, [activeKey, setSelectedComponent]);

  // Reset component parameters to defaults
  const resetProps = () => {
    const defaults: Record<string, any> = {};
    meta.props.forEach(p => {
      defaults[p.name] = p.default;
    });
    setCustomProps(defaults);
  };

  // Populate default controls on active component shift
  useEffect(() => {
    resetProps();
  }, [activeKey]);

  // Handle control updates
  const setPropValue = (name: string, val: any) => {
    setCustomProps(prev => ({
      ...prev,
      [name]: val
    }));
  };

  // Read actual resolved controls values
  const getResolvedProps = () => {
    const propsObj: Record<string, any> = {};
    meta.props.forEach(p => {
      propsObj[p.name] = customProps[p.name] !== undefined ? customProps[p.name] : p.default;
    });
    return propsObj;
  };

  const resolved = getResolvedProps();

  // Generate JS code text dynamically
  const generateJsCode = () => {
    const imports = `import { ${meta.importName} } from "@hemanath-afk/afk-motion";`;
    const propStrings = Object.entries(resolved)
      .map(([k, v]) => {
        if (typeof v === "string") return `  ${k}="${v}"`;
        if (typeof v === "boolean") return `  ${k}={${v}}`;
        return `  ${k}={${v}}`;
      });
    const containerProp = meta.importName === "ScrollPin" ? "" : "  container={scrollRef}";
    const formattedProps = propStrings.length > 0 
      ? `\n${propStrings.join("\n")}${containerProp ? "\n" + containerProp : ""}\n` 
      : (containerProp ? `\n${containerProp}\n` : "");

    switch (meta.importName) {
      case "ScrollProgress":
        return `${imports}
import { useRef } from "react";

export default function ArticleProgress() {
  const scrollRef = useRef(null);

  return (
    <div 
      ref={scrollRef} 
      style={{ height: "400px", overflowY: "auto", position: "relative" }}
    >
      <ScrollProgress${formattedProps} />
      <article style={{ padding: "40px" }}>
        <h1>Realistic Tech Blog Article</h1>
        <p>Scroll down to see the reading indicator line extend...</p>
      </article>
    </div>
  );
}`;
      case "ScrollTop":
        return `${imports}
import { useRef } from "react";

export default function FloatingScrollTop() {
  const scrollRef = useRef(null);

  return (
    <div 
      ref={scrollRef} 
      style={{ height: "400px", overflowY: "auto", position: "relative" }}
    >
      <ScrollTop${formattedProps} />
      <div style={{ height: "1200px", padding: "40px" }}>
        <p>Scroll down past the threshold to trigger the floating button...</p>
      </div>
    </div>
  );
}`;
      case "ScrollReveal":
        return `${imports}

export default function FeaturesReveal() {
  return (
    <div style={{ padding: "80px 20px", display: "grid", gap: "24px" }}>
      <ScrollReveal${formattedProps}>
        <div style={{ padding: "24px", background: "#0a0a0f", borderRadius: "12px", border: "1px solid #1e293b" }}>
          <h3>High-Performance Rendering</h3>
          <p>This panel slide-revealed dynamically using Framer Motion.</p>
        </div>
      </ScrollReveal>
    </div>
  );
}`;
      case "ScrollFade":
        return `${imports}
import { useRef } from "react";

export default function FadingSections() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto" }}>
      <ScrollFade${formattedProps} style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ padding: "30px", background: "#0f172a", borderRadius: "12px" }}>
          <h2>Interactive Fade Element</h2>
        </div>
      </ScrollFade>
    </div>
  );
}`;
      case "ScrollScale":
        return `${imports}
import { useRef } from "react";

export default function ScalingGallery() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto" }}>
      <ScrollScale${formattedProps}>
        <img src="product.jpg" style={{ width: "100%", height: "240px", borderRadius: "12px" }} />
      </ScrollScale>
    </div>
  );
}`;
      case "ScrollRotate":
        return `${imports}
import { useRef } from "react";

export default function RotatingPortfolio() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto" }}>
      <ScrollRotate${formattedProps}>
        <div style={{ width: "80px", height: "80px", background: "#6366f1", borderRadius: "50%" }} />
      </ScrollRotate>
    </div>
  );
}`;
      case "ScrollParallax":
        return `${imports}
import { useRef } from "react";

export default function HeroParallax() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto" }}>
      <ScrollParallax${formattedProps}>
        <h1>Visual Parallax Layer</h1>
      </ScrollParallax>
    </div>
  );
}`;
      case "ScrollBlur":
        return `${imports}
import { useRef } from "react";

export default function BlurredReveal() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto" }}>
      <ScrollBlur${formattedProps}>
        <h2>Focussing Text Title</h2>
      </ScrollBlur>
    </div>
  );
}`;
      case "ScrollPin":
        return `${imports}

export default function PinnedLayout() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <ScrollPin${formattedProps}>
        <div style={{ width: "200px", background: "#111827" }}>
          <h4>Sticky Sidebar content</h4>
        </div>
      </ScrollPin>
      <div style={{ flex: 1, height: "1000px" }}>
        <p>Adjacent content continues to scroll down...</p>
      </div>
    </div>
  );
}`;
      case "ScrollZoom":
        return `${imports}
import { useRef } from "react";

export default function MediaZoom() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto" }}>
      <div style={{ height: "250px", overflow: "hidden" }}>
        <ScrollZoom${formattedProps} />
      </div>
    </div>
  );
}`;
      case "ScrollStagger":
        return `${imports}

export default function TeamsStagger() {
  return (
    <ScrollStagger${formattedProps}>
      <div className="card">Team 1</div>
      <div className="card">Team 2</div>
      <div className="card">Team 3</div>
    </ScrollStagger>
  );
}`;
      case "ScrollCounter":
        return `${imports}

export default function StatsCounter() {
  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
      <ScrollCounter${formattedProps} />+ Active Users
    </div>
  );
}`;
      case "ScrollTimeline":
        return `${imports}
import { useRef } from "react";

export default function CompanyRoadmap() {
  const scrollRef = useRef(null);

  return (
    <div ref={scrollRef} style={{ height: "400px", overflowY: "auto", display: "flex", gap: "30px" }}>
      <ScrollTimeline${formattedProps} style={{ height: "300px" }} />
      <div>
        <div>Milestone 1</div>
        <div>Milestone 2</div>
      </div>
    </div>
  );
}`;
      default:
        return "";
    }
  };

  const codeText = generateJsCode();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Render specific realistic mockups inside sandbox
  const renderSandboxMock = () => {
const Component = (AFK as any)[meta.importName];

    switch (meta.importName) {
      case "ScrollProgress":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6">
            <Component container={scrollContainerRef} {...resolved} />
            <div className="max-w-2xl mx-auto space-y-6 pt-8 pb-12 text-left">
              {/* Blog Header */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  Engineering Journal
                </span>
                <span className="text-[10px] text-slate-500 font-mono">4 MIN READ</span>
              </div>
              
              <h1 className="text-2xl font-black text-white leading-tight">
                Architecting High-Performance React Interfaces: Mitigating Layout Shifting
              </h1>
              
              {/* Author Tag */}
              <div className="flex items-center gap-2.5 py-2 border-y border-slate-900">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700" />
                <div>
                  <h5 className="text-xs font-bold text-slate-300">Alex Rivera</h5>
                  <span className="text-[9px] text-slate-500 block">Lead UI Architect at AFK Tech</span>
                </div>
              </div>

              {/* Long Copious Blog Content */}
              <p className="text-xs text-slate-400 leading-relaxed">
                In modern single-page applications, UI fluidity is a key indicator of product quality. Layout shifts—often caused by async images loading without specified aspect ratios, slow webfont renders, or dynamic component injections—impact both core web vitals and overall developer satisfaction.
              </p>
              
              <h3 className="text-sm font-bold text-white mt-8">The Pitfalls of Scroll Event Bindings</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                When developers attempt to build custom progress trackers or floating action buttons, the first instinct is to bind a callback to the scroll event. However, querying layout parameters (like <code className="text-[10px] font-mono text-pink-400 bg-slate-950 px-1 py-0.5 rounded">window.scrollY</code> or <code className="text-[10px] font-mono text-pink-400 bg-slate-950 px-1 py-0.5 rounded">element.getBoundingClientRect()</code>) triggers synchronous layout calculations. In React, updating state inside these event listeners forces component re-renders, resulting in frame delays and visual lag.
              </p>

              <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-xl space-y-2 font-mono text-[10px] text-indigo-300">
                <span className="text-slate-500 block">// High-performance Scroll Tracking</span>
                <span>const {"{ scrollProgress }"} = useScrollProgress();</span>
                <span className="block">const yOffset = useTransform(scrollProgress, [0, 1], [0, -100]);</span>
              </div>

              <h3 className="text-sm font-bold text-white mt-8">Offloading Math to the GPU Compositor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By delegating scroll calculations directly to motion structures and CSS custom variables, we completely avoid layouts. The browser renders the composite frame asynchronously, maintaining 60fps even under heavy main-thread loads.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Notice how the progress bar at the top edge of this container extends smoothly as you read. This is accomplished without forcing state re-renders in the surrounding article page wrapper.
              </p>

              <h3 className="text-sm font-bold text-white mt-8">Summary and Best Practices</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Always set explicit sizing containers on canvas elements, utilize relative container bounds checks, and let library components handle physics dampening loops for clean, modern micro-interactions.
              </p>
            </div>
          </div>
        );
      case "ScrollTop":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-8">
            {/* Top sticky info header */}
            <div className="sticky top-0 z-35 p-3 bg-slate-900/95 backdrop-blur border border-slate-800 rounded-xl text-center space-y-1">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Interactive Website Sandbox</span>
              <p className="text-[11px] text-slate-300">Scroll down inside this area to see the scroll-to-top variants in a complete website context!</p>
            </div>

            {/* Grid of circle / floating variants */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* Circle (Default) */}
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col items-center justify-between min-h-[130px] relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase text-center">1. Circle (Default)</span>
                <div className="h-16 flex items-center justify-center">
                  <Component variant="circle" container={scrollContainerRef} floating={false} progressColor="#6366f1" size={54} threshold={30} glass={resolved.glass} />
                </div>
                <span className="text-[9px] text-slate-500">Traditional outline ring</span>
              </div>

              {/* Dotted Theme */}
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col items-center justify-between min-h-[130px] relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase text-center">2. Dotted Theme</span>
                <div className="h-16 flex items-center justify-center">
                  <Component variant="dotted" container={scrollContainerRef} floating={false} progressColor="#a78bfa" size={54} threshold={30} glass={resolved.glass} />
                </div>
                <span className="text-[9px] text-slate-500">Dotted ring & arrow mask</span>
              </div>

              {/* Square */}
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col items-center justify-between min-h-[130px] relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-rose-450 uppercase text-center">3. Square</span>
                <div className="h-16 flex items-center justify-center">
                  <Component variant="square" container={scrollContainerRef} floating={false} progressColor="#f43f5e" size={54} threshold={30} glass={resolved.glass} />
                </div>
                <span className="text-[9px] text-slate-500">Rounded rect progress</span>
              </div>

              {/* Glow */}
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col items-center justify-between min-h-[130px] relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase text-center">4. Glow (Neon)</span>
                <div className="h-16 flex items-center justify-center">
                  <Component variant="glow" container={scrollContainerRef} floating={false} progressColor="#10b981" size={54} threshold={30} glass={resolved.glass} />
                </div>
                <span className="text-[9px] text-slate-500">Pulsing ambient shadow</span>
              </div>

              {/* Percentage */}
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col items-center justify-between min-h-[130px] relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase text-center">5. Percentage</span>
                <div className="h-16 flex items-center justify-center">
                  <Component variant="percentage" container={scrollContainerRef} floating={false} progressColor="#3b82f6" size={54} threshold={30} glass={resolved.glass} />
                </div>
                <span className="text-[9px] text-slate-500">Numeric metrics bubble</span>
              </div>

              {/* Minimal */}
              <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex flex-col items-center justify-between min-h-[130px] relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase text-center">6. Minimal</span>
                <div className="h-16 flex items-center justify-center">
                  <Component variant="minimal" container={scrollContainerRef} floating={false} progressColor="#f59e0b" size={50} threshold={30} glass={resolved.glass} />
                </div>
                <span className="text-[9px] text-slate-500">Spring arrow translation</span>
              </div>

            </div>

            {/* Scroll-extending simulator height block */}
            <div className="h-[250px] border border-dashed border-slate-900 flex flex-col items-center justify-center text-[10px] text-slate-650 rounded-xl bg-slate-950/20 py-8">
              <span>↓↓ KEEP SCROLLING DOWN ↓↓</span>
              <span className="mt-2 text-slate-500">To increase progress and make variants visible</span>
            </div>

            {/* Linear variant full width card */}
            <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl relative overflow-hidden min-h-[120px] flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold text-pink-400 uppercase block mb-2 text-center">7. Linear Progress variant (Fixed Bottom Bar style)</span>
              
              <div className="flex-1 flex items-center justify-center border border-slate-950/80 rounded-lg p-3 bg-slate-950/40 relative overflow-hidden h-[48px]">
                <Component variant="linear" container={scrollContainerRef} floating={false} progressColor="#ec4899" threshold={30} glass={resolved.glass} />
                <span className="text-[9px] text-slate-500 relative z-10 pointer-events-none">Bar advances along bottom edge of active screen</span>
              </div>
            </div>

            <div className="h-[120px]" />
          </div>
        );
      case "ScrollReveal":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-16">
            
            {/* Header info */}
            <div className="text-center max-w-md mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Features Showcase Website</span>
              <h2 className="text-lg font-black text-white">Engineered for Peak Performance</h2>
              <p className="text-xs text-slate-500 leading-normal">Scroll down inside this mockup layout to trigger the entrance transitions of each SaaS feature card.</p>
            </div>

            {/* Section 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Component {...resolved}>
                <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">⚡</div>
                  <h4 className="text-xs font-bold text-slate-200">Hardware Accelerated</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Transforms are offloaded straight to composite GPU threads, bypassing the main thread entirely.</p>
                </div>
              </Component>
              
              <Component {...resolved} delay={resolved.delay + 0.1}>
                <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">✨</div>
                  <h4 className="text-xs font-bold text-slate-200">Subtle Physics</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Built using spring physics configurations to deliver organic, fluid feeling motions.</p>
                </div>
              </Component>

              <Component {...resolved} delay={resolved.delay + 0.2}>
                <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-2 text-left">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">🛡️</div>
                  <h4 className="text-xs font-bold text-slate-200">WCAG Compliant</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Integrates aria-hidden tags, focus containment overlays, and respect for screen readers.</p>
                </div>
              </Component>
            </div>

            <div className="h-[100px] flex items-center justify-center text-[10px] text-slate-550 border border-dashed border-slate-900 rounded-xl">
              [Scroll down further to load secondary feature row...]
            </div>

            {/* Section 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Component {...resolved}>
                <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2 text-left">
                  <h4 className="text-xs font-bold text-slate-200">Zero Layout Shift (CLS)</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Unlike absolute positioning hacks that cause surrounding boxes to reposition, our components maintain static footprints and translate using CSS transforms, maintaining an ideal 0 CLS audit score.</p>
                </div>
              </Component>

              <Component {...resolved} delay={resolved.delay + 0.15}>
                <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2 text-left">
                  <h4 className="text-xs font-bold text-slate-200">Fluid Tailoring Options</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Easily modify animation displacement, delay timers, and duration scales from the side controls. Code updates automatically in the right code panel.</p>
                </div>
              </Component>
            </div>

            <div className="h-[60px]" />
          </div>
        );
      case "ScrollFade":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-24">
            
            {/* Header */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest font-mono">Design & Editorial Journal</span>
              <h2 className="text-lg font-black text-white">Visual Storytelling</h2>
              <p className="text-xs text-slate-500">Experience sections fading in and out depending on their distance from viewport focus centers.</p>
            </div>

            {/* Fade block 1 */}
            <Component container={scrollContainerRef} {...resolved}>
              <div className="max-w-md mx-auto p-8 bg-gradient-to-tr from-indigo-950/20 to-purple-950/20 border border-indigo-900/20 rounded-2xl text-left space-y-4">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Milestone 01 / Concept</span>
                <h3 className="text-sm font-black text-white">Visualizing Interactive Space</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As this card approaches the viewport center, it increases opacity to 1. When it scrolls past towards the top margin, it fades back to 0. This creates a focused reading spotlight.
                </p>
              </div>
            </Component>

            <div className="h-[200px] flex items-center justify-center text-[10px] text-slate-700 border border-dashed border-slate-900/60 rounded-xl">
              [Scroll further to fade in next quote...]
            </div>

            {/* Fade block 2 */}
            <Component container={scrollContainerRef} {...resolved}>
              <div className="max-w-md mx-auto p-8 bg-gradient-to-tr from-purple-950/20 to-pink-950/20 border border-purple-900/20 rounded-2xl text-center space-y-4">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider font-mono">Milestone 02 / Easing</span>
                <h3 className="text-sm font-black text-white">"Motion should feel natural, never mechanical."</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Combining fade states with custom spring formulas mimics physical mass and inertia, easing user tension and encouraging page exploration.
                </p>
              </div>
            </Component>

            <div className="h-[120px]" />
          </div>
        );
      case "ScrollScale":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-16">
            
            {/* Header info */}
            <div className="text-center max-w-md mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest font-mono">Hardware E-Commerce Store</span>
              <h2 className="text-lg font-black text-white">Premium Devices Grid</h2>
              <p className="text-xs text-slate-500">Cards scale up smoothly as they enter the container center, creating focus points.</p>
            </div>

            {/* Catalog list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto">
              
              {/* Product 1 */}
              <Component container={scrollContainerRef} {...resolved}>
                <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/30 flex flex-col justify-between">
                  <div className="h-32 bg-slate-950 relative flex items-center justify-center">
                    <span className="text-2xl">⌚</span>
                  </div>
                  <div className="p-4 bg-slate-900/90 text-left space-y-1">
                    <h4 className="text-xs font-bold text-white">Chronos Watch V3</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">$299.00</span>
                  </div>
                </div>
              </Component>

              {/* Product 2 */}
              <Component container={scrollContainerRef} {...resolved}>
                <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/30 flex flex-col justify-between">
                  <div className="h-32 bg-slate-950 relative flex items-center justify-center">
                    <span className="text-2xl">🎧</span>
                  </div>
                  <div className="p-4 bg-slate-900/90 text-left space-y-1">
                    <h4 className="text-xs font-bold text-white">Aura Pods Elite</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">$180.00</span>
                  </div>
                </div>
              </Component>

              {/* Product 3 */}
              <Component container={scrollContainerRef} {...resolved}>
                <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/30 flex flex-col justify-between">
                  <div className="h-32 bg-slate-950 relative flex items-center justify-center">
                    <span className="text-2xl">⌨️</span>
                  </div>
                  <div className="p-4 bg-slate-900/90 text-left space-y-1">
                    <h4 className="text-xs font-bold text-white">Hex Keyboard 75%</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">$220.00</span>
                  </div>
                </div>
              </Component>

              {/* Product 4 */}
              <Component container={scrollContainerRef} {...resolved}>
                <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/30 flex flex-col justify-between">
                  <div className="h-32 bg-slate-950 relative flex items-center justify-center">
                    <span className="text-2xl">🖱️</span>
                  </div>
                  <div className="p-4 bg-slate-900/90 text-left space-y-1">
                    <h4 className="text-xs font-bold text-white">Specter Laser Mouse</h4>
                    <span className="text-[10px] text-slate-400 font-mono block">$110.00</span>
                  </div>
                </div>
              </Component>

            </div>

            <div className="h-[120px]" />
          </div>
        );
      case "ScrollRotate":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 flex flex-col items-center gap-16">
            
            {/* Header info */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Creative Portfolio Showcase</span>
              <h2 className="text-lg font-black text-white">Interactive Rotate</h2>
              <p className="text-xs text-slate-500">Geometric components rotate dynamically mapped to the viewport's vertical scrolling progress.</p>
            </div>

            {/* Gear 1 */}
            <div className="flex items-center gap-10 bg-slate-900/30 p-6 rounded-2xl border border-slate-850 w-full max-w-md">
              <Component container={scrollContainerRef} {...resolved}>
                <div className="w-20 h-20 bg-indigo-600/10 border-2 border-dashed border-indigo-500 rounded-full flex items-center justify-center text-indigo-400 font-black text-xs relative select-none">
                  ✦ GEAR A
                </div>
              </Component>
              <div className="flex-1 text-left space-y-1.5">
                <h4 className="text-xs font-bold text-slate-200">Mechanical Synchronization</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">This gear rotates as you scroll, creating a visual layout anchor. Ideal for mechanical or technical portfolios.</p>
              </div>
            </div>

            <div className="h-[150px] border border-dashed border-slate-900 flex items-center justify-center text-[10px] text-slate-700 w-full max-w-md rounded-xl">
              [Scroll down to rotate the second anchor]
            </div>

            {/* Gear 2 */}
            <div className="flex items-center gap-10 bg-slate-900/30 p-6 rounded-2xl border border-slate-850 w-full max-w-md">
              <Component container={scrollContainerRef} maxRotation={-resolved.maxRotation || -45}>
                <div className="w-20 h-20 bg-purple-600/10 border-2 border-dashed border-purple-500 rounded-full flex items-center justify-center text-purple-400 font-black text-xs relative select-none">
                  ✦ GEAR B
                </div>
              </Component>
              <div className="flex-1 text-left space-y-1.5">
                <h4 className="text-xs font-bold text-slate-200">Counter-Rotation Bounds</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">This gear rotates in the opposite direction. By combining offset axes, you can build immersive grid patterns.</p>
              </div>
            </div>

            <div className="h-[120px]" />
          </div>
        );
      case "ScrollParallax":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar flex flex-col">
            
            {/* Parallax Hero container */}
            <div className="h-[400px] w-full shrink-0 relative overflow-hidden flex items-center justify-center border-b border-slate-900">
              
              {/* Layer 1: Background Blur */}
              <Component container={scrollContainerRef} speed={resolved.speed ? -resolved.speed * 0.8 : -80} className="absolute inset-0 z-0">
                <div className="w-full h-full bg-gradient-to-tr from-indigo-950/40 via-purple-950/20 to-transparent flex items-center justify-center">
                  <div className="w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px]" />
                </div>
              </Component>

              {/* Layer 2: Graphic Grid */}
              <Component container={scrollContainerRef} speed={resolved.speed ? -resolved.speed * 0.4 : -40} className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-72 h-72 border border-dashed border-slate-800/80 rounded-full flex items-center justify-center">
                  <div className="w-52 h-52 border border-dashed border-slate-800/40 rounded-full" />
                </div>
              </Component>

              {/* Layer 3: Foreground Content */}
              <Component container={scrollContainerRef} speed={resolved.speed ? resolved.speed * 0.6 : 60} className="relative z-20 text-center max-w-sm px-4 space-y-3">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider font-mono">
                  Space Parallax
                </span>
                <h2 className="text-xl font-black text-white leading-tight">Multidimensional UI Perspective</h2>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Background meshes translate slower than foreground text cards, mimicking natural 3D depth perception.
                </p>
              </Component>

            </div>

            {/* Copious website content below hero */}
            <div className="p-6 space-y-6 text-left max-w-md mx-auto">
              <h4 className="text-xs font-bold text-slate-200">The Power of Layered Motion</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                By sliding layouts at varying velocities, the brain perceives distance in flat viewport screens. Ideal for marketing banners, premium landing products, and creative digital portfolios.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Scroll up and down to witness the layered widgets shift positions relative to each other smoothly.
              </p>
            </div>

            <div className="h-[200px]" />
          </div>
        );
      case "ScrollBlur":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-24">
            
            {/* Header info */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Luxury Product Reveal</span>
              <h2 className="text-lg font-black text-white">Cinematic Focus Shifts</h2>
              <p className="text-xs text-slate-500">Watch headlines and description cards sharpen to absolute clarity as they approach the center focus row.</p>
            </div>

            {/* Block 1 */}
            <Component container={scrollContainerRef} {...resolved}>
              <div className="max-w-sm mx-auto text-center space-y-3 p-6 bg-slate-900/40 border border-slate-850 rounded-2xl">
                <span className="text-[9px] text-slate-500 block font-mono font-bold">1 / HIGH FIDELITY AUDIO</span>
                <h3 className="text-sm font-bold text-white">Acoustic Precision Chambers</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Our headphones employ custom 40mm transducers to minimize auditory distortion, delivering pristine lows and hyper-detailed highs.
                </p>
              </div>
            </Component>

            <div className="h-[200px] flex items-center justify-center text-[10px] text-slate-700 border border-dashed border-slate-900 rounded-xl max-w-sm mx-auto">
              [Scroll down to focus the next feature specification]
            </div>

            {/* Block 2 */}
            <Component container={scrollContainerRef} {...resolved}>
              <div className="max-w-sm mx-auto text-center space-y-3 p-6 bg-slate-900/40 border border-slate-850 rounded-2xl">
                <span className="text-[9px] text-slate-500 block font-mono font-bold">2 / HYBRID ANC LOOPS</span>
                <h3 className="text-sm font-bold text-white">Active Noise Cancellation</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Dual microphone arrays feed background acoustic noise directly into our cancellation chip to neutralize ambient sounds.
                </p>
              </div>
            </Component>

            <div className="h-[120px]" />
          </div>
        );
      case "ScrollPin":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start relative h-[800px]">
              
              {/* Pinned left column */}
              <Component {...resolved}>
                <div className="w-full sm:w-44 p-4 bg-slate-900 border border-slate-800 rounded-xl text-left space-y-3 shrink-0">
                  <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider font-mono">SPEC SUMMARY</span>
                  <h4 className="text-xs font-black text-white">AFK Tracker V2</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">This summary block stays locked in place while the descriptions on the right scroll past.</p>
                  <button className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[9px] transition-all">
                    Pre-Order Now
                  </button>
                </div>
              </Component>

              {/* Scrolling right column details */}
              <div className="flex-1 space-y-6 w-full text-left pt-6 sm:pt-0">
                <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold text-white">Design & Ergonomics</h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Crafted with lightweight composites and breathable mesh to ensure long-term comfort during intense workspaces.</p>
                </div>
                <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold text-white">Optics & Sensors</h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Advanced high-precision tracking sensors capture minimal movements with absolute accuracy.</p>
                </div>
                <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold text-white">Power & Battery</h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Smart energy monitoring algorithms stretch single charges to up to 80 active usage hours.</p>
                </div>
                <div className="p-5 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2">
                  <h5 className="text-xs font-bold text-white">Software Integration</h5>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Instantly sync configurations through the interactive desktop controller app panel.</p>
                </div>
              </div>

            </div>
          </div>
        );
      case "ScrollZoom":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-16">
            
            {/* Header info */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest font-mono">Digital Photography Log</span>
              <h2 className="text-lg font-black text-white">Immersive Image Zooms</h2>
              <p className="text-xs text-slate-500">Image media elements scale inside their cropped layout bounds as they enter central viewports.</p>
            </div>

            {/* Image block 1 */}
            <div className="w-full max-w-md mx-auto space-y-2 text-left">
              <div className="h-44 w-full overflow-hidden rounded-xl border border-slate-800 relative">
                <Component container={scrollContainerRef} {...resolved} />
              </div>
              <span className="text-[9px] text-slate-500 font-mono">LOCATION: HAWAIIAN COASTLINE // SCROLL AND WATCH TEXTURE SCALE</span>
            </div>

            <div className="h-[150px] border border-dashed border-slate-900 flex items-center justify-center text-[10px] text-slate-700 max-w-md mx-auto rounded-xl">
              [Scroll further to see the second landscape]
            </div>

            {/* Image block 2 */}
            <div className="w-full max-w-md mx-auto space-y-2 text-left">
              <div className="h-44 w-full overflow-hidden rounded-xl border border-slate-800 relative">
                <Component container={scrollContainerRef} src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80" />
              </div>
              <span className="text-[9px] text-slate-500 font-mono">LOCATION: NORTHERN GREENLAND // ACCENT CAMERA ZOOM</span>
            </div>

            <div className="h-[120px]" />
          </div>
        );
      case "ScrollStagger":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-16">
            
            {/* Header info */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest font-mono">Enterprise Integrations page</span>
              <h2 className="text-lg font-black text-white">Testimonial & Logos Grid</h2>
              <p className="text-xs text-slate-500">Scrolling down triggers the sequential cascading entrance of partner cards.</p>
            </div>

            {/* Stagger grid */}
            <Component className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto" {...resolved}>
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-850 mx-auto flex items-center justify-center font-bold text-[10px] text-indigo-400">G1</div>
                <h4 className="text-xs font-bold text-slate-200">Google Cloud</h4>
                <p className="text-[9px] text-slate-500">Database synchronization and analytics loops.</p>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-850 mx-auto flex items-center justify-center font-bold text-[10px] text-purple-400">V2</div>
                <h4 className="text-xs font-bold text-slate-200">Vercel Inc.</h4>
                <p className="text-[9px] text-slate-500">Serverless deployments and edge caching layers.</p>
              </div>
              <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-xl space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-850 mx-auto flex items-center justify-center font-bold text-[10px] text-pink-400">S3</div>
                <h4 className="text-xs font-bold text-slate-200">Stripe Tech</h4>
                <p className="text-[9px] text-slate-500">Global commerce pipelines and checkout widgets.</p>
              </div>
            </Component>

            <div className="h-[150px] border border-dashed border-slate-900 flex items-center justify-center text-[10px] text-slate-700 max-w-xl mx-auto rounded-xl">
              [Scroll further to load client reviews staggered block]
            </div>

            {/* Testimonials staggered block */}
            <Component className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto" staggerDelay={resolved.staggerDelay + 0.05}>
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-left space-y-2">
                <p className="text-[10px] text-slate-400 italic">"Integrating AFK Motion was a breeze. Visual performance scores reached a perfect 100 on our site instantly."</p>
                <h5 className="text-[9px] font-bold text-slate-300">- Marcus V., Tech CTO</h5>
              </div>
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-left space-y-2">
                <p className="text-[10px] text-slate-400 italic">"The hardware accelerated easing transforms give our shop layouts an exceptionally premium and responsive touch."</p>
                <h5 className="text-[9px] font-bold text-slate-300">- Sophia L., Lead Designer</h5>
              </div>
            </Component>

            <div className="h-[60px]" />
          </div>
        );
      case "ScrollCounter":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 space-y-16 flex flex-col items-center">
            
            {/* Header info */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6">
              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">SaaS Analytics Dashboard</span>
              <h2 className="text-lg font-black text-white">Live Metric Counters</h2>
              <p className="text-xs text-slate-500">Numbers count up dynamically to target milestones when scrolled into the active viewport.</p>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm pt-8">
              
              {/* Metric 1 */}
              <div className="p-5 bg-slate-900/40 border border-slate-855 rounded-xl text-center space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Downloads</span>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-center">
                  <Component {...resolved} />
                  <span>+</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-5 bg-slate-900/40 border border-slate-855 rounded-xl text-center space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Satisfied Devs</span>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-center">
                  <Component from={0} to={99} duration={resolved.duration} />
                  <span>%</span>
                </div>
              </div>

            </div>

            <div className="h-[200px] border border-dashed border-slate-900 flex items-center justify-center text-[10px] text-slate-700 w-full max-w-sm rounded-xl">
              [Scroll down to load server metrics indicators]
            </div>

            {/* Second Dashboard block */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm pb-8">
              
              {/* Metric 3 */}
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-center space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Total API Calls</span>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-center">
                  <Component from={100} to={8500} duration={resolved.duration + 0.4} />
                  <span>k</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-center space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Core Coverage</span>
                <div className="text-2xl font-black text-white font-mono flex items-center justify-center">
                  <Component from={20} to={100} duration={resolved.duration} />
                  <span>%</span>
                </div>
              </div>

            </div>

            <div className="h-[60px]" />
          </div>
        );
      case "ScrollTimeline":
        return (
          <div ref={scrollContainerRef} className="w-full h-[620px] overflow-y-auto border border-slate-800 bg-[#07070a] rounded-xl relative custom-scrollbar p-6 flex flex-col items-center">
            
            {/* Header info */}
            <div className="text-center max-w-sm mx-auto space-y-2 pt-6 pb-8">
              <span className="text-[9px] font-bold text-purple-400 uppercase tracking-widest font-mono">Product roadmap Website</span>
              <h2 className="text-lg font-black text-white">Dynamic Journey Milestones</h2>
              <p className="text-xs text-slate-500">The vertical roadmap line expands and paints dynamically connecting milestone cards as you scroll down.</p>
            </div>

            <div className="flex gap-8 relative w-full max-w-sm justify-center">
              {/* The dynamic timeline component */}
              <Component container={scrollContainerRef} style={{ height: "460px" }} />
              
              {/* Timeline nodes list */}
              <div className="space-y-16 pt-4 text-left">
                
                {/* Stage 1 */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl w-60 space-y-1">
                  <span className="text-[9px] text-indigo-400 font-mono font-bold block uppercase tracking-wider">STAGE 1 / Q1 2026</span>
                  <h4 className="text-xs font-bold text-slate-200">Setup Project Core Repository</h4>
                  <p className="text-[9px] text-slate-500">Initialize basic physics algorithms and layout testing utilities.</p>
                </div>

                {/* Stage 2 */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl w-60 space-y-1">
                  <span className="text-[9px] text-indigo-400 font-mono font-bold block uppercase tracking-wider">STAGE 2 / Q2 2026</span>
                  <h4 className="text-xs font-bold text-slate-200">Compile Bundle Packages</h4>
                  <p className="text-[9px] text-slate-500">Assemble ESModules and CommonJS builds using Rollup & Vite.</p>
                </div>

                {/* Stage 3 */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl w-60 space-y-1">
                  <span className="text-[9px] text-indigo-400 font-mono font-bold block uppercase tracking-wider">STAGE 3 / Q3 2026</span>
                  <h4 className="text-xs font-bold text-slate-200">Release Production V1</h4>
                  <p className="text-[9px] text-slate-500">Publish to npm registry, launch live sandbox explorer page.</p>
                </div>

              </div>
            </div>

            <div className="h-[120px]" />
          </div>
        );
      default:
        return null;
    }
  };

  // Render unified immersive landing page
  const renderUnifiedDemo = () => {
    return (
      <div className="fixed inset-0 bg-[#07070a] z-50 overflow-y-auto custom-scrollbar flex flex-col">
        {/* Navigation Overlay Header */}
        <header className="sticky top-0 bg-[#07070a]/90 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center justify-between z-50 select-none">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-bold tracking-tight text-white uppercase font-mono">AFK Scroll Animations Showcase</span>
          </div>
          <button 
            onClick={() => setShowUnifiedDemo(false)} 
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <X className="w-4 h-4" /> Exit Demo
          </button>
        </header>

        {/* 1. ScrollProgress (Active Indicator Bar) */}
        <AFK.ScrollProgress color="#818cf8" height={5} />

        {/* 2. Hero Section using ScrollParallax */}
        <section className="h-[600px] w-full relative overflow-hidden flex items-center justify-center bg-slate-950 border-b border-slate-900">
          <AFK.ScrollParallax speed={-120} className="absolute inset-0 z-0 opacity-40">
            <div className="w-full h-full bg-gradient-to-tr from-indigo-950 to-[#2e1065] flex items-center justify-center">
              <div className="w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
            </div>
          </AFK.ScrollParallax>
          <AFK.ScrollParallax speed={80} className="relative z-10 text-center max-w-2xl px-6 space-y-6">
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-widest font-mono">
              Category Parallax Showcase
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
              Premium React Scroll animations
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
              Fluid, lag-free viewport transforms calculated directly on the GPU layer. Scroll down to trigger features reveals.
            </p>
          </AFK.ScrollParallax>
        </section>

        {/* 3. Feature Sections using ScrollReveal and ScrollFade */}
        <section className="max-w-4xl mx-auto py-24 px-6 space-y-16">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white">ScrollReveal & ScrollFade</h2>
            <p className="text-xs text-slate-500">Milestones fade in smoothly as they reach the viewport focus area.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AFK.ScrollReveal yOffset={50} duration={0.8}>
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">✦</div>
                <h3 className="text-sm font-bold text-white">Spring Interpolation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Avoid frame delays by caching transform matrices outside active render loops.
                </p>
              </div>
            </AFK.ScrollReveal>

            <AFK.ScrollReveal yOffset={50} duration={0.8} delay={0.15}>
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-sm">✦</div>
                <h3 className="text-sm font-bold text-white">Subtle Blur Layers</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Combines CSS filters and transparency alphas dynamically with viewport offsets.
                </p>
              </div>
            </AFK.ScrollReveal>
          </div>
        </section>

        {/* 4. Statistics Dashboard using ScrollCounter */}
        <section className="bg-slate-950 py-20 border-y border-slate-900">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Downloads</span>
              <div className="text-3xl font-black text-white font-mono">
                <AFK.ScrollCounter from={100} to={8500} duration={2} />+
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Satisfied Devs</span>
              <div className="text-3xl font-black text-white font-mono">
                <AFK.ScrollCounter from={0} to={98} duration={1.5} />%
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 block uppercase tracking-wider font-mono">Build Coverage</span>
              <div className="text-3xl font-black text-white font-mono">
                <AFK.ScrollCounter from={50} to={100} duration={1.2} />%
              </div>
            </div>
          </div>
        </section>

        {/* 5. Team Section using ScrollStagger */}
        <section className="max-w-4xl mx-auto py-24 px-6 space-y-16">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white font-display">Staggered Animations</h2>
            <p className="text-xs text-slate-500">Staggering cards layout triggered as the row enters viewport boundaries.</p>
          </div>

          <AFK.ScrollStagger staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full mx-auto" />
              <h4 className="text-xs font-bold text-white">Hemanath AFK</h4>
              <span className="text-[10px] text-slate-500">Creator</span>
            </div>
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full mx-auto" />
              <h4 className="text-xs font-bold text-white">Jane Cooper</h4>
              <span className="text-[10px] text-slate-500">UX Design</span>
            </div>
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-3 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full mx-auto" />
              <h4 className="text-xs font-bold text-white">Cody Fisher</h4>
              <span className="text-[10px] text-slate-500">Engineer</span>
            </div>
          </AFK.ScrollStagger>
        </section>

        {/* 6. Product Gallery using ScrollScale and ScrollZoom */}
        <section className="bg-slate-950/80 py-24 border-y border-slate-900 px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center max-w-md mx-auto space-y-2">
              <h2 className="text-2xl font-black text-white">Image Scale & Zoom</h2>
              <p className="text-xs text-slate-500">Hover or scroll to magnify textures and scale outlines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AFK.ScrollScale startScale={0.9} endScale={1.1} className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="h-64 overflow-hidden relative">
                  <AFK.ScrollZoom src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" alt="Landscape" />
                </div>
              </AFK.ScrollScale>

              <AFK.ScrollScale startScale={0.9} endScale={1.1} className="overflow-hidden rounded-2xl border border-slate-800">
                <div className="h-64 overflow-hidden relative">
                  <AFK.ScrollZoom src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80" alt="Forest" />
                </div>
              </AFK.ScrollScale>
            </div>
          </div>
        </section>

        {/* 7. Storytelling pinned layout section using ScrollPin */}
        <section className="max-w-4xl mx-auto py-24 px-6 relative">
          <div className="flex flex-col md:flex-row gap-8 items-start relative h-[700px]">
            <AFK.ScrollPin top={100} className="w-full md:w-80 shrink-0">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider font-mono">Narrative Pinned Column</span>
                <h3 className="text-lg font-black text-white">Storytelling Spec Pinned</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As you scroll the timeline on the right side, this specification summary panel remains fixed in view to anchor focus.
                </p>
              </div>
            </AFK.ScrollPin>
            <div className="flex-1 space-y-6 w-full">
              <div className="h-44 bg-slate-900/30 border border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-500 font-bold">Additional detail content slide #1</div>
              <div className="h-44 bg-slate-900/30 border border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-500 font-bold">Additional detail content slide #2</div>
              <div className="h-44 bg-slate-900/30 border border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-500 font-bold">Additional detail content slide #3</div>
            </div>
          </div>
        </section>

        {/* 8. Roadmap Section using ScrollTimeline */}
        <section className="bg-slate-950 py-24 border-t border-slate-900">
          <div className="max-w-md mx-auto px-6 space-y-12 flex flex-col items-center">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-white">Scroll Timeline</h2>
              <p className="text-xs text-slate-500">Vertical line draws connecting roadmap updates dynamically.</p>
            </div>

            <div className="flex gap-8 min-h-[400px] relative">
              <AFK.ScrollTimeline style={{ height: "360px" }} />
              <div className="space-y-20 pt-6">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl w-64 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-mono block">STAGE 1</span>
                  <h4 className="text-xs font-bold text-slate-100">Setup Project Core</h4>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl w-64 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-mono block">STAGE 2</span>
                  <h4 className="text-xs font-bold text-slate-100">Compile Bundle Libs</h4>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl w-64 space-y-1">
                  <span className="text-[10px] text-indigo-400 font-mono block">STAGE 3</span>
                  <h4 className="text-xs font-bold text-slate-100">Publish Production V1</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dotted ScrollTop Tracker */}
        <AFK.ScrollTop variant="dotted" size={54} threshold={100} progressColor="#818cf8" />
      </div>
    );
  };

  if (showUnifiedDemo) {
    return renderUnifiedDemo();
  }

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* Scroll Selector Sidebar */}
      <aside className="w-64 border-r border-slate-900 bg-[#08080c]/60 backdrop-blur flex flex-col justify-stretch select-none">
        <div className="p-4 border-b border-slate-900 flex flex-col gap-1.5">
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Explore Categories</span>
          <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> Scroll Animations
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
          {Object.entries(SCROLL_COMPONENTS).map(([key, item]) => {
            const isActive = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-400" 
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        
        {/* Fullscreen Demo overlay launcher */}
        <div className="p-4 border-t border-slate-900">
          <button 
            onClick={() => setShowUnifiedDemo(true)}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Immersive Scroll Demo
          </button>
        </div>
      </aside>

      {/* Main Sandbox & Code Grid */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#07070a] p-6 space-y-6 flex flex-col">
        
        {/* Header Metadata Info */}
        <div className="flex flex-col border-b border-slate-900 pb-5 space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight">{meta.name}</h2>
            <span className="text-[10px] font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">
              {meta.importName}.jsx
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-normal max-w-xl">{meta.description}</p>
        </div>

        {/* Live Preview Sandbox */}
        <div className="space-y-2">
          <span className="text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider block">Live Preview Sandbox</span>
          <div className="w-full min-h-[620px] flex items-center justify-center border border-slate-900 bg-[#0a0a0f] rounded-2xl p-6 relative overflow-hidden">
            {renderSandboxMock()}
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        {meta.props.length > 0 && (
          <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold tracking-wider">Playground Controls</span>
              <button 
                onClick={resetProps}
                className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-all"
              >
                <RotateCcw className="w-3 h-3" /> Reset Defaults
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meta.props.map((p) => {
                const currentVal = resolved[p.name];

                return (
                  <div key={p.name} className="flex flex-col gap-1.5 text-left">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300 font-mono">{p.name}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{String(currentVal)}</span>
                    </div>

                    {p.type === "number" && (
                      <input
                        type="range"
                        min={p.min}
                        max={p.max}
                        step={p.step}
                        value={currentVal}
                        onChange={(e) => setPropValue(p.name, parseFloat(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-900 border border-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                    )}

                    {p.type === "boolean" && (
                      <label className="inline-flex items-center cursor-pointer gap-2 py-1">
                        <input
                          type="checkbox"
                          checked={currentVal}
                          onChange={(e) => setPropValue(p.name, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-9 h-5 bg-slate-900 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white" />
                        <span className="text-[10px] text-slate-500">Toggle parameter value</span>
                      </label>
                    )}

                    {p.type === "select" && p.options && (
                      <select
                        value={currentVal}
                        onChange={(e) => setPropValue(p.name, e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                      >
                        {p.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {p.type === "color" && (
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={currentVal}
                          onChange={(e) => setPropValue(p.name, e.target.value)}
                          className="w-8 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={currentVal}
                          onChange={(e) => setPropValue(p.name, e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 w-32 focus:outline-none"
                        />
                      </div>
                    )}

                    {p.type === "string" && (
                      <input
                        type="text"
                        value={currentVal}
                        onChange={(e) => setPropValue(p.name, e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-350 focus:outline-none"
                      />
                    )}

                    <span className="text-[10px] text-slate-500">{p.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Real-World and Advanced Examples panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 border border-slate-900 rounded-xl p-5">
          <div className="space-y-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Real-World Example
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">{meta.realWorldDesc}</p>
          </div>

          <div className="space-y-2 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" /> Advanced Example
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">{meta.advancedDesc}</p>
          </div>
        </div>

        {/* Dynamic API Documentation table */}
        <div className="p-4 bg-slate-950/20 border border-slate-900 rounded-xl text-left space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">API Props Reference</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-slate-400 font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-500">
                  <th className="py-2 text-left font-bold">PROP</th>
                  <th className="py-2 text-left font-bold">TYPE</th>
                  <th className="py-2 text-left font-bold">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {Object.entries(meta.propsDoc).map(([propName, desc]) => {
                  const targetProp = meta.props.find(p => p.name === propName);
                  return (
                    <tr key={propName}>
                      <td className="py-2.5 font-bold text-indigo-400">{propName}</td>
                      <td className="py-2.5 text-slate-500 text-[10px]">{targetProp?.type || "ref / object"}</td>
                      <td className="py-2.5 text-slate-400 leading-normal">{desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Right Code Editor Panel */}
      <aside className="w-[480px] shrink-0 p-6 bg-[#07070a] border-l border-slate-900 flex flex-col justify-stretch">
        <div className="flex-1 flex flex-col h-full overflow-hidden border border-slate-900 bg-slate-950/60 rounded-xl">
          <div className="px-4 py-3 bg-[#0a0a0f] border-b border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-slate-200 font-mono">{meta.importName}.jsx</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold shadow flex items-center gap-1 transition-all"
            >
              {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copiedCode ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 text-[11px] font-mono text-indigo-300 bg-[#07070a]/80 text-left whitespace-pre select-all leading-normal custom-scrollbar">
            {codeText}
          </div>
        </div>
      </aside>
    </div>
  );
};
