import React, { useMemo, useEffect, useState, useRef } from "react";
import { useDocsStore } from "../store/useDocsStore";
import { componentsSchema, getComponentMetadata } from "../components-schema";
import { Sidebar } from "../components/Sidebar";
import { PropControls } from "../components/PropControls";
import { CodeEditor } from "../components/CodeEditor";
import { 
  Play, RotateCcw, AlertCircle, Info, Accessibility, Activity, ShieldCheck, Check, Copy, Sparkles, Send
} from "lucide-react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import all components directly from package source
import * as AFK from "../../src";

export const ComponentShowcasePage: React.FC = () => {
  const { category: urlCategory, component: urlComponent } = useParams<{ category: string; component: string }>();

  const { 
    selectedCategory, 
    selectedComponent, 
    setSelectedComponent,
    previewDevice,
    theme,
    customProps,
    setCustomProp
  } = useDocsStore();

  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isExitVisible, setIsExitVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync route params to zustand store
  useEffect(() => {
    if (urlCategory && urlComponent) {
      if (selectedCategory !== urlCategory || selectedComponent !== urlComponent) {
        setSelectedComponent(urlCategory, urlComponent);
      }
    }
  }, [urlCategory, urlComponent, selectedCategory, selectedComponent, setSelectedComponent]);

  // Retrieve current component schemas
  const compMeta = useMemo(() => {
    return getComponentMetadata(selectedCategory, selectedComponent);
  }, [selectedCategory, selectedComponent]);

  const activeProps = customProps[selectedComponent] || {};

  // Resolve values passing defaults from schemas
  const resolvedProps = useMemo(() => {
    const props: Record<string, any> = {};
    compMeta.props.forEach((p) => {
      props[p.name] = activeProps[p.name] !== undefined ? activeProps[p.name] : p.default;
    });
    return props;
  }, [compMeta, activeProps]);

  // Dynamically resolve component function
  const Component = useMemo(() => {
    return (AFK as any)[selectedComponent];
  }, [selectedComponent]);

  // Restart animation preview trigger
  const handleRestart = () => {
    setPreviewKey((prev) => prev + 1);
  };

  const copyToClipboard = (text: string, setCopied: (c: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate code editor string dynamically to align with custom slider parameters
  const generatedCode = useMemo(() => {
    return compMeta.usageCode(resolvedProps);
  }, [compMeta, resolvedProps]);

  // Component preview children helper
  const renderPreviewElement = () => {
    if (!Component) {
      return (
        <div className="text-red-400 flex items-center gap-2 text-xs font-mono">
          <AlertCircle className="w-4 h-4" /> Component {selectedComponent} not found in package.
        </div>
      );
    }

    // Determine children parameters
    let childrenNode: React.ReactNode = null;
    const propsObj = { ...resolvedProps };

    // Resolve style prop if it's passed as a JSON string template to avoid CSSStyleDeclaration setter crash
    if (typeof propsObj.style === "string") {
      try {
        const cleanJson = propsObj.style.trim().replace(/'/g, '"');
        propsObj.style = JSON.parse(cleanJson);
      } catch (err) {
        propsObj.style = {};
      }
    }

    // Format specific complex props for standard widgets
    if (compMeta.importName === "RotateText") {
      propsObj.words = typeof resolvedProps.items === "string" 
        ? resolvedProps.items.split(",") 
        : resolvedProps.items || ["Fast", "Modern", "Physics-based", "Apple-style"];
    }

    if (compMeta.importName === "AnimatedNavbar" || compMeta.importName === "FloatingNavbar" || compMeta.importName === "MorphNavbar" || compMeta.importName === "CircularMenu" || compMeta.importName === "DockMenu") {
      propsObj.items = typeof resolvedProps.items === "string"
        ? resolvedProps.items.split(",")
        : resolvedProps.items || ["Home", "Works", "Contact"];
    }

    if (compMeta.importName === "ThreeDStackCards") {
      propsObj.cards = [
        <div key={1} className="w-48 h-32 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center font-bold font-mono text-white text-xs">Card Face 1</div>,
        <div key={2} className="w-48 h-32 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center font-bold font-mono text-white text-xs">Card Face 2</div>,
        <div key={3} className="w-48 h-32 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center justify-center font-bold font-mono text-white text-xs">Card Face 3</div>
      ];
    }

    if (compMeta.importName === "ConversationTimeline" || compMeta.importName === "InteractiveTimeline") {
      propsObj.steps = [
        { label: "Step 1: Setup", title: "Step 1: Setup", detail: "Install dependency packs.", description: "Install dependency packs." },
        { label: "Step 2: Code", title: "Step 2: Code", detail: "Configure custom properties.", description: "Configure custom properties." },
        { label: "Step 3: Deploy", title: "Step 3: Deploy", detail: "Run production build scripts.", description: "Run production build scripts." }
      ];
    }

    if (compMeta.importName === "ActivityFeed") {
      propsObj.items = [
        { title: "User signed up", time: "2 mins ago" },
        { title: "Invoice paid", time: "1 hr ago" },
        { title: "Server restarted", time: "3 hrs ago" }
      ];
    }

    if (compMeta.importName === "Stepper") {
      propsObj.steps = ["Profile Info", "Payment Method", "Review Order"];
    }

    if (compMeta.importName === "FeatureShowcase") {
      propsObj.features = [
        { tab: "Design", content: <div className="p-4 bg-slate-900/60 rounded-lg text-slate-300 text-xs">Modern layout engines using Framer Motion.</div> },
        { tab: "Physics", content: <div className="p-4 bg-slate-900/60 rounded-lg text-slate-300 text-xs">Stiffness and damping settings for spring simulation.</div> },
        { tab: "Export", content: <div className="p-4 bg-slate-900/60 rounded-lg text-slate-300 text-xs">Export clean configuration code directly to clipboard.</div> }
      ];
    }

    if (compMeta.importName === "InfiniteLogoCloud") {
      propsObj.logos = ["Google", "Vercel", "Apple", "OpenAI", "Meta"];
    }

    if (compMeta.importName === "TestimonialCarousel") {
      propsObj.items = [
        { quote: "AFK Motion has accelerated our engineering timelines significantly.", author: "Hemanath AFK", role: "Principal Engineer" },
        { quote: "The micro-animations feel incredibly premium and responsive.", author: "Jane Doe", role: "UX Designer" }
      ];
    }

    if (compMeta.importName === "MasonryGallery") {
      propsObj.items = [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=150&auto=format&fit=crop&q=60"
      ];
    }

    if (compMeta.importName === "AnimatedFAQ") {
      propsObj.qas = [
        { question: "Is this library compatible with Next.js?", answer: "Yes, fully compatible! Make sure to add 'use client' directive at the top of import files." },
        { question: "Are animations performance optimized?", answer: "Absolutely. Frame updates are executed directly on the GPU composite layers." }
      ];
    }

    if (compMeta.importName === "ComparisonSlider" || compMeta.importName === "BeforeAfterImage") {
      propsObj.beforeSrc = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60";
      propsObj.afterSrc = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=60&hue=290";
    }

    // Determine supportsChildren parameters
    const supportsChildren = compMeta.props.some(p => p.name === "children") || 
                             ["GlassCard", "TiltCard", "GlowCard", "MagneticCard", "ThreeDCard", "AnimatedProfileCard", "ProductCard", "PricingCard", 
                              "AnimatedModal", "BlurModal", "SlideModal", "ZoomModal", "BottomSheet", "ConfirmDialog",
                              "SidebarMenu", "SlideMenu", "MobileDrawer", "MegaMenu",
                              "Spotlight", "BentoGrid", "HoverScale", "HoverGrow", "HoverShrink", "HoverLift", 
                              "HoverFloat", "HoverTilt", "HoverRotate", "HoverFlip", "HoverGlow", "HoverPulse", 
                              "HoverShake", "HoverBounce", "HoverRipple", "HoverMagnetic", "HoverBorderExpand", 
                              "HoverUnderline", "HoverGradientShift", "HoverSpotlight",
                              "FadeIn", "FadeUp", "FadeDown", "FadeLeft", "FadeRight", "ZoomIn", "ZoomOut", "ScaleIn",
                              "SlideUp", "SlideDown", "SlideLeft", "SlideRight", "RotateIn", "FlipInX", "FlipInY", "BlurIn",
                              "ExpandIn", "BounceIn", "ElasticIn", "SwingIn", "RollIn", "LightSpeedIn",
                              "FadeOut", "FadeUpOut", "FadeDownOut", "FadeLeftOut", "FadeRightOut", "ZoomOutExit", "ScaleOut",
                              "SlideUpOut", "SlideDownOut", "SlideLeftOut", "SlideRightOut", "RotateOut", "FlipOutX", "FlipOutY",
                              "BlurOut", "CollapseOut", "BounceOut", "RollOut"].includes(compMeta.importName) ||
                              compMeta.category === "entrance" ||
                              compMeta.category === "exit" ||
                              compMeta.category === "hover";

    // Build children widgets based on category / type
    if (resolvedProps.children !== undefined) {
      if (typeof resolvedProps.children === "string" && resolvedProps.children.includes("<")) {
        childrenNode = <div dangerouslySetInnerHTML={{ __html: resolvedProps.children }} />;
      } else {
        childrenNode = resolvedProps.children; // Plain text string or custom element
      }
      delete propsObj.children;
    } else {
      if (compMeta.category === "hover") {
        childrenNode = (
          <div className="w-52 p-5 rounded-xl border border-slate-800 bg-slate-900/80 text-left pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-3" />
            <h4 className="text-xs font-bold text-slate-100">Interactive Card</h4>
            <p className="text-[10px] text-slate-500 mt-1">Hover coordinates trigger spring animations.</p>
          </div>
        );
      } else if (compMeta.category === "buttons") {
        childrenNode = <span>Execute Action</span>;
      } else if (compMeta.category === "entrance" || compMeta.category === "exit") {
        childrenNode = (
          <div className="text-center p-6 bg-slate-900/60 border border-slate-800/80 rounded-xl w-56">
            <span className="text-xs font-bold text-slate-200">{compMeta.name}</span>
            <p className="text-[10px] text-slate-500 mt-1">Viewport Entrance Block</p>
          </div>
        );
      } else {
        childrenNode = (
          <div className="text-center p-4 bg-slate-900/40 border border-slate-800/50 rounded-xl w-44">
            <span className="text-xs font-semibold text-slate-300">{compMeta.name}</span>
          </div>
        );
      }
    }

    // Wrap elements by category constraints to demonstrate actual layout functionality
    try {
      // 1. Scroll Simulator Layout
      if (compMeta.category === "scroll") {
        propsObj.container = scrollRef;
        const rendered = supportsChildren ? (
          <Component key={previewKey} {...propsObj}>{childrenNode}</Component>
        ) : (
          <Component key={previewKey} {...propsObj} />
        );

        return (
          <div className="flex flex-col items-center w-full h-[300px]">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono mb-2 animate-pulse">
              ↓ Scroll inside the dashboard box below to see effect ↓
            </span>
            <div 
              ref={scrollRef} 
              className="w-full flex-1 overflow-y-auto border border-slate-800 bg-slate-950/60 rounded-xl p-4 custom-scrollbar relative flex flex-col items-center"
            >
              <div className="h-[250px] w-full shrink-0 flex items-center justify-center border border-dashed border-slate-900/40 text-[10px] text-slate-600">
                Container Top (Scroll Down)
              </div>
              <div className="my-16 shrink-0 flex items-center justify-center w-full">
                {rendered}
              </div>
              <div className="h-[350px] w-full shrink-0 flex items-center justify-center border border-dashed border-slate-900/40 text-[10px] text-slate-600">
                Container Bottom
              </div>
            </div>
          </div>
        );
      }

      // 2. Modals / Overlays Layout (including SidebarMenu, MobileDrawer, CommandPalette)
      const isOverlayComponent = compMeta.category === "modals" || 
                                 ["SidebarMenu", "MobileDrawer", "CommandPalette"].includes(compMeta.importName);
      if (isOverlayComponent) {
        propsObj.inline = true;
        propsObj.isOpen = isModalOpen;
        propsObj.onClose = () => setIsModalOpen(false);

        // Customize props for ConfirmDialog
        if (compMeta.importName === "ConfirmDialog") {
          propsObj.onCancel = () => setIsModalOpen(false);
          propsObj.onConfirm = () => {
            alert("Confirmed!");
            setIsModalOpen(false);
          };
        }

        // Customize props for Snackbar
        if (compMeta.importName === "Snackbar") {
          propsObj.message = propsObj.message || "Configuration saved.";
        }

        // Customize props for ToastNotification
        if (compMeta.importName === "ToastNotification") {
          propsObj.toasts = isModalOpen ? [{ id: 1, message: propsObj.message || "Command successfully executed." }] : [];
        }

        // Customize props for FloatingAlert
        if (compMeta.importName === "FloatingAlert") {
          propsObj.title = propsObj.title || "Task Alert";
          propsObj.message = propsObj.message || "Active background services are running.";
        }

        const rendered = supportsChildren ? (
          <Component key={previewKey} {...propsObj}>{childrenNode}</Component>
        ) : (
          <Component key={previewKey} {...propsObj} />
        );

        return (
          <div className="flex flex-col items-center gap-4 w-full h-[280px] justify-center relative">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-2 z-10"
            >
              <Sparkles className="w-3.5 h-3.5" /> Toggle Overlay State
            </button>
            <span className="text-[10px] text-slate-500 z-10">
              Opens overlay positioned absolutely inside this preview sandbox container.
            </span>
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-20">
              <div className="pointer-events-auto">
                {rendered}
              </div>
            </div>
          </div>
        );
      }

      // 3. Exit Animations Layout
      if (compMeta.category === "exit") {
        return (
          <div className="flex flex-col items-center gap-6 w-full justify-center">
            <button
              onClick={() => setIsExitVisible(!isExitVisible)}
              className="px-4 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-lg text-xs font-semibold shadow transition-all"
            >
              {isExitVisible ? "Trigger Exit Animation" : "Mount Component"}
            </button>
            <div className="h-32 flex items-center justify-center">
              <AnimatePresence>
                {isExitVisible && (
                  <Component key={previewKey} {...propsObj}>
                    {childrenNode}
                  </Component>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      }

      // 4. Form Elements Layout (provide simple wrapping form card instead of plain input)
      if (compMeta.category === "forms" && compMeta.importName !== "RangeSlider" && compMeta.importName !== "ToggleSwitch") {
        const rendered = supportsChildren ? (
          <Component key={previewKey} {...propsObj}>{childrenNode}</Component>
        ) : (
          <Component key={previewKey} {...propsObj} />
        );
        return (
          <div className="w-72 p-5 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4 text-left">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200">Interactive Form Demo</span>
              <span className="text-[9px] text-slate-500 mt-0.5">Custom input widget integration</span>
            </div>
            {rendered}
            <button className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-semibold rounded-lg border border-indigo-500/20 transition-all">
              Save Settings
            </button>
          </div>
        );
      }

      // 5. Background Effects Layout (layer content on top of backgrounds)
      if (compMeta.category === "backgrounds") {
        const rendered = supportsChildren ? (
          <Component key={previewKey} {...propsObj}>{childrenNode}</Component>
        ) : (
          <Component key={previewKey} {...propsObj} />
        );
        return (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center relative bg-slate-950 overflow-hidden">
            {rendered}
            <div className="relative z-10 w-64 p-6 rounded-2xl border border-slate-800/80 bg-slate-900/80 backdrop-blur-md text-left space-y-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold font-mono">
                Featured Layout
              </span>
              <h3 className="text-xs font-bold text-white">Fluid Backdrop Elements</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Notice how the background moves behind this card overlay. Ideal for SaaS header pages.
              </p>
            </div>
          </div>
        );
      }

      // 6. AI Components / Chats Layout (render in a chat panel)
      if (compMeta.category === "ai" && compMeta.importName !== "ConversationTimeline") {
        const rendered = supportsChildren ? (
          <Component key={previewKey} {...propsObj}>{childrenNode}</Component>
        ) : (
          <Component key={previewKey} {...propsObj} />
        );
        return (
          <div className="w-72 bg-slate-955/80 border border-slate-800 bg-[#0a0a0f] rounded-xl overflow-hidden flex flex-col h-[280px] justify-between p-4 space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">AI Sandbox Agent</span>
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center py-2">
              {rendered}
            </div>
            <div className="flex gap-2">
              <input type="text" disabled placeholder="Type response..." className="flex-1 bg-slate-900/60 border border-slate-800/80 rounded-lg px-2.5 py-1 text-[10px] text-slate-500 focus:outline-none" />
              <button disabled className="px-2 py-1 bg-indigo-600/40 rounded-lg text-slate-300 text-[10px]"><Send className="w-3 h-3" /></button>
            </div>
          </div>
        );
      }

      // 7. General Fallback Render
      if (supportsChildren) {
        return (
          <Component key={previewKey} {...propsObj}>
            {childrenNode}
          </Component>
        );
      } else {
        return (
          <Component key={previewKey} {...propsObj} />
        );
      }
    } catch (e: any) {
      return (
        <div className="text-red-400 text-xs font-mono p-4 bg-red-950/20 border border-red-900 rounded-xl max-w-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Render Crash: {e.message}</span>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden h-full">
      {/* 3-Panel Grid Framework */}
      <Sidebar />

      {/* Center panel - Live Sandbox + Controls */}
      <div className="flex-1 flex flex-col bg-[#07070a] overflow-y-auto custom-scrollbar p-6 space-y-6">
        
        {/* Component Header Metadata Card */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-black font-display text-white">
              {compMeta.name}
            </h2>
            <p className="text-slate-400 text-xs leading-normal max-w-2xl">
              {compMeta.description}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(`npm i @hemanath-afk/afk-motion`, setCopiedInstall)}
              className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              {copiedInstall ? <Check className="w-3.5 h-3.5 text-green-400" /> : "npm install"}
            </button>
            <button
              onClick={() => copyToClipboard(`import { ${compMeta.importName} } from "@hemanath-afk/afk-motion";`, setCopiedImport)}
              className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/30 text-indigo-400 hover:text-indigo-300 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              {copiedImport ? <Check className="w-3.5 h-3.5 text-green-400" /> : "Import Copy"}
            </button>
            <button
              onClick={() => copyToClipboard(generatedCode, setCopiedCode)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-indigo-200" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Configuration
            </button>
          </div>
        </div>

        {/* Live Canvas Area */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Live Sandbox</span>
            <button
              onClick={handleRestart}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Trigger
            </button>
          </div>

          <div 
            className={`flex items-center justify-center p-12 border border-slate-800 bg-[#0a0a0f] rounded-2xl min-h-[340px] relative overflow-hidden transition-all ${
              previewDevice === "mobile" ? "max-w-[375px] mx-auto" : previewDevice === "tablet" ? "max-w-[768px] mx-auto" : "w-full"
            } ${
              theme === "light" ? "bg-slate-50 border-slate-200" : "bg-[#0b0b0f] border-slate-800"
            }`}
          >
            {renderPreviewElement()}
          </div>
        </div>

        {/* Prop Control Inputs Grid */}
        <PropControls 
          componentName={selectedComponent}
          propsList={compMeta.props}
          defaultValues={resolvedProps}
        />

        {/* Documentation details panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 border border-slate-900 rounded-xl p-5">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-indigo-400" /> Accessibility Notes
            </h4>
            <p className="text-xs text-slate-500 leading-normal">
              {compMeta.accessibilityNotes}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" /> Performance & Browser
            </h4>
            <p className="text-xs text-slate-500 leading-normal">
              {compMeta.performanceNotes} <br />
              <span className="text-[10px] text-slate-600 block mt-2">Support: {compMeta.browserSupport}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Right panel - Live Monaco Code Editor */}
      <div className="w-[480px] shrink-0 p-6 bg-[#07070a] border-l border-slate-800 flex flex-col justify-stretch">
        <CodeEditor 
          code={generatedCode}
          filename={`${compMeta.importName}.tsx`}
        />
      </div>

    </div>
  );
};
