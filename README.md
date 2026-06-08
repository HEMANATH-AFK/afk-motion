# @hemanath-afk/afk-motion 

[![NPM Version](https://img.shields.io/npm/v/@hemanath-afk/afk-motion.svg?style=flat-square&color=6366f1)](https://www.npmjs.com/package/@hemanath-afk/afk-motion)
[![License](https://img.shields.io/npm/l/@hemanath-afk/afk-motion.svg?style=flat-square&color=10b981)](https://github.com/HEMANATH-AFK/afk-motion/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@hemanath-afk/afk-motion?style=flat-square&color=ec4899)](https://bundlephobia.com/package/@hemanath-afk/afk-motion)
[![React Version](https://img.shields.io/badge/react-%3E%3D19.0.0-blue?style=flat-square)](https://react.dev)
[![Framer Motion](https://img.shields.io/badge/framer--motion-%3E%3D11.0.0-violet?style=flat-square)](https://www.framer.com/motion/)

`@hemanath-afk/afk-motion` is a premium, high-performance, tree-shakeable React micro-interaction and animation library designed to build immersive portfolios, high-converting SaaS landing pages, and interactive creative dashboards.

Version **2.0.0** introduces full React 19 compatibility, hardware-accelerated scroll scrubbing, stable animation loops (resolving standard React re-render lags), and an expanded catalog of over 100+ premium components across 18 specialized interactive categories.

---

##  Table of Contents

- [> Core Philosophy & Performance](#-core-philosophy--performance)
- [> Key Features](#-key-features)
- [> Installation](#-installation)
- [> Component Catalog Architecture](#️-component-catalog-architecture)
- [> Code Examples](#-code-examples)
  - [1. 3D Hover Tilt Card](#1-3d-hover-tilt-card)
  - [2. Dotted Scroll Top Variant](#2-dotted-scroll-top-variant)
  - [3. Scroll Container Indicator](#3-scroll-container-indicator)
  - [4. High-Performance Cursor Trails](#4-high-performance-cursor-trails)
  - [5. AI Prompt Textarea Interface](#5-ai-prompt-textarea-interface)
- [> Custom React Hooks API](#-custom-react-hooks-api)
- [> Design Guidelines & Best Practices](#-design-guidelines--best-practices)
- [> Release Notes (v2.0.0)](#-release-notes-v200)
- [> Publishing & CI/CD Pipelines](#-publishing--cicd-pipelines)
- [📄 License](#-license)

---

##  Core Philosophy & Performance

Most React animation libraries suffer from layout thrashing and input lags because they bind mouse coordinates or scroll vectors directly to React component state. This forces constant re-renders at 60Hz, freezing the main thread and resulting in sluggish frames.

`afk-motion` takes a different approach:
- **Direct DOM Manipulation**: Coordinates are tracked through passive event listeners and piped directly to CSS variables or transform matrices on target elements via `requestAnimationFrame` and `framer-motion` springs.
- **GPU Composited Layers**: Transforms (`translate3d`, `scale`, `rotate`) and rendering filters (`blur`, `opacity`) are applied directly on composition layers to bypass layout repaints.
- **Hydration Safe**: Components are fully optimized for Next.js (App Router/Pages Router) and Vite, respecting Server Side Hydration bounds.

---

##  Key Features

* **60 FPS Guarantee**: Zero component re-renders during mouse movement, scroll scrubbing, and cursor follower tracking.
* **Peer-Dependency Agnostic**: Requires zero CSS stylesheets to be imported. The design engine applies styling tokens directly as inline properties.
* **Apple TV Parallax**: Immersive three-dimensional card structures (`ImageDepthHover`, `ThreeDProductShowcase`) that translate layers dynamically.
* **Scroll-Scrubbing Spring Engine**: Smooth dampening curves applied to scroll timelines, progress widgets, and page timeline routes.
* **Bento Grid Support**: Pre-designed spotlight layouts, pricing switchers, and FAQ accordions optimized for conversions.
* **Tree-shakeable Bundles**: Shipped with complete ESModules (`dist/index.esm.js`) and CommonJS (`dist/index.cjs.js`) formats with complete TypeScript declarations.

---

##  Installation

Ensure your project environment is running React 19+:

```bash
# Using npm
npm install @hemanath-afk/afk-motion

# Using yarn
yarn add @hemanath-afk/afk-motion

# Using pnpm
pnpm add @hemanath-afk/afk-motion

# Using bun
bun add @hemanath-afk/afk-motion
```

> [!NOTE]  
> `react` (>=19.0.0), `react-dom` (>=19.0.0), and `framer-motion` (>=11.0.0) are required as peer dependencies.

---

##  Component Catalog Architecture

The library is organized into 18 specialized directories, grouping over 100+ production-ready components:

| Category | Highlights | Description |
| :--- | :--- | :--- |
| **1. Entrance Animations** | `FadeUp`, `ElasticIn`, `BounceIn`, `RotateIn`, `FlipInX`, `BlurIn` | Staggered view-intersecting entrance animations. |
| **2. Exit Animations** | `FadeOut`, `SlideUpOut`, `ZoomOutExit`, `FlipOutY`, `CollapseOut` | Clean exit transitions and layout collapsers. |
| **3. Hover Effects** | `HoverTilt`, `HoverMagnetic`, `HoverSpotlight`, `HoverBorderExpand` | Proximity coordinate magnets and card highlights. |
| **4. Buttons** | `NeonButton`, `RippleButton`, `MorphButton`, `ProgressButton` | Elastic click widgets, liquid effects, and loading states. |
| **5. Text Animations** | `ScrambleText`, `TypewriterText`, `GlitchText`, `CountUpText` | Decoding scripts, typewriter streams, and numerical counts. |
| **6. Loading Components** | `OrbitLoader`, `DNALoader`, `TerminalLoader`, `MatrixLoader` | Micro-loading spinners, skeleton loaders, and command outputs. |
| **7. Scroll Animations** | `ScrollProgress`, `ScrollTimeline`, `ScrollPin`, `ScrollBlur` | Reading lines, dynamic roadmap lines, and parallax layers. |
| **8. Cards** | `GlassCard`, `TiltCard`, `FlipCard`, `GlowCard`, `PricingCard` | Premium layouts supporting glassmorphism and ambient glow paths. |
| **9. Navigation** | `DockMenu`, `CircularMenu`, `AnimatedNavbar`, `SidebarMenu` | macOS-style docks, radial context wheels, and drawers. |
| **10. Background Effects** | `MeshGradient`, `StarfieldBackground`, `MatrixRain`, `BubbleBackground` | Fluid noise matrices, snow falls, and customizable canvases. |
| **11. Mouse Effects** | `CustomCursor`, `CursorTrail`, `SpotlightCursor`, `CursorParticles` | Interactive trails, particles emitters, and spotlight masks. |
| **12. Modals & Popups** | `AnimatedModal`, `BottomSheet`, `ToastNotification`, `ConfirmDialog` | Framer-motion overlays, alert sheets, and slide-in notifications. |
| **13. Form Elements** | `OTPInput`, `PasswordStrengthInput`, `AutoCompleteInput` | Structured security forms, animated sliders, and inputs. |
| **14. Hero Sections** | `HeroReveal`, `HeroParallax`, `HeroSpotlight`, `HeroSplitReveal` | Premium split sliders, typographic overlays, and background videos. |
| **15. 3D Components** | `ThreeDProductShowcase`, `ThreeDStackCards`, `ThreeDCube` | Layered specification viewers, drag-cube arrays, and galleries. |
| **16. Dashboard Widgets** | `ProgressRing`, `KPIWidget`, `CounterCard`, `ActivityFeed` | SVG metrics trackers, sparklines, and transaction feeds. |
| **17. Advanced Elements** | `CommandPalette`, `TerminalEmulator`, `AnimatedCodeBlock`, `BentoGrid` | Developer utilities, FAQ accordions, and bento marketing slots. |
| **18. AI-Era UI** | `PromptInput`, `AIChatBubble`, `StreamingText`, `ThinkingIndicator` | Textareas with typing physics, stream counters, and response blocks. |

---

##  Code Examples

### 1. 3D Hover Tilt Card

Tracks relative coordinate mouse inputs to apply a smooth 3D tilting vector and highlight glowing spotlight reflection.

```tsx
import React from "react";
import { HoverTilt, GlassCard } from "@hemanath-afk/afk-motion";

export default function FeatureCard() {
  return (
    <HoverTilt maxTilt={15} scale={1.03} perspective={1000}>
      <GlassCard 
        style={{ 
          width: "320px", 
          height: "220px", 
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between" 
        }}
      >
        <div>
          <span style={{ fontSize: "24px" }}>⚡</span>
          <h3 style={{ marginTop: "12px", color: "#fff" }}>Compositor Physics</h3>
          <p style={{ color: "#94a3b8", fontSize: "12px", lineHeight: "1.6" }}>
            Offloads math transforms straight to the GPU thread, guaranteeing constant 60FPS output.
          </p>
        </div>
        <button style={{ color: "#6366f1", fontSize: "12px", fontWeight: "bold", textAlign: "left" }}>
          Learn More →
        </button>
      </GlassCard>
    </HoverTilt>
  );
}
```

### 2. Dotted Scroll Top Variant

A custom floating button that tracks viewport vertical progression and shows circular progress via a dotted perimeter.

```tsx
import React from "react";
import { ScrollTop } from "@hemanath-afk/afk-motion";

export default function Layout() {
  return (
    <div style={{ minHeight: "2000px", padding: "40px" }}>
      <h1>Scroll down to see button reveal</h1>
      <ScrollTop 
        variant="dotted" 
        size={60} 
        threshold={150} 
        progressColor="#a78bfa" 
        glass={true} 
      />
    </div>
  );
}
```

### 3. Scroll Container Indicator

Binds progress meters to scrollable elements (like custom columns or blogs) rather than the global window.

```tsx
import React, { useRef } from "react";
import { ScrollProgress } from "@hemanath-afk/afk-motion";

export default function ArticleReader() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: "400px", 
        overflowY: "auto", 
        position: "relative",
        border: "1px solid #1e293b",
        borderRadius: "12px"
      }}
    >
      {/* progress line stays fixed at the top of the container */}
      <ScrollProgress container={containerRef} color="#6366f1" height={4} />
      
      <div style={{ padding: "32px", spaceY: "16px" }}>
        <h2>Advanced Rendering Loops</h2>
        {/* Long content block here */}
        <p style={{ height: "1000px", color: "#94a3b8" }}>
          Scroll down inside this area to see the reading indicator line extend...
        </p>
      </div>
    </div>
  );
}
```

### 4. High-Performance Cursor Trails

Injects multiple trailing coordinate points tracking cursor pathways efficiently.

```tsx
import React from "react";
import { CursorTrail } from "@hemanath-afk/afk-motion";

export default function LandingPage() {
  return (
    <div style={{ background: "#07070a", minHeight: "100vh" }}>
      <CursorTrail color="#818cf8" count={10} size={8} />
      <main style={{ display: "flex", items: "center", justifyContent: "center" }}>
        <h1 style={{ color: "#fff" }}>Interactive Spaces</h1>
      </main>
    </div>
  );
}
```

### 5. AI Prompt Textarea Interface

An auto-growing textarea designed for chat interfaces. Expands smoothly up to a maximum height threshold and handles enter-triggers.

```tsx
import React, { useState } from "react";
import { PromptInput } from "@hemanath-afk/afk-motion";

export default function ChatInput() {
  const [value, setValue] = useState("");

  const handleSend = () => {
    alert(`Submitting prompt: ${value}`);
    setValue("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "16px" }}>
      <PromptInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSend}
        placeholder="Ask the AI model..."
        maxRows={6}
        showCharCount={true}
      />
    </div>
  );
}
```

---

##  Custom React Hooks API

`afk-motion` exports its core physics utilities as React hooks so you can build custom layout interactions:

### `useSpring(value: number, config?: SpringConfig)`
Creates a dynamic, motion-damped value that smooths out raw input states.
- **`config`**: `{ stiffness: number; damping: number; mass: number }`

### `useMousePosition(ref: React.RefObject<HTMLElement>)`
Returns high-performance `{ x, y }` coordinates relative to the bounding box of target elements.

### `useTilt(ref: React.RefObject<HTMLElement>, options?: TiltOptions)`
Calculates the dynamic pitch and roll rotations of elements based on the cursor position.

### `useScrollProgress(ref?: React.RefObject<HTMLElement>)`
Computes the current scroll depth percentage (`0.0` to `1.0`) of either the global window or a wrapper container.

---

##  Design Guidelines & Best Practices

To get the absolute best visual outcome using `afk-motion` in your apps:
1. **Choose Harmonious Color Schemes**: Avoid generic basic colors. Combine indigo, purple, rose, or emerald hex values with deep grey, dark obsidian background layers.
2. **Implement Glassmorphism Strategically**: Use the `glass={true}` property to automatically inject backdrop-filters, transparent borders, and subtle radial highlight gradients.
3. **Control Stacking Layouts**: The background canvas elements (`StarfieldBackground`, `MatrixRain`) are configured with `zIndex: -1` and require parent elements to establish a positioning context (`position: relative; overflow: hidden`) to stack correctly under texts.
4. **Honor Reduced Motion Prefers**: Respect user system preferences by leveraging Framer Motion's built-in transition switches on accessibility devices.

---

## 🆕 Release Notes (v2.0.0)

Version 2.0.0 represents a significant upgrade focusing on performance, modularity, and catalog expansion:
- **React 19 Core Alignment**: Completely rebuilt components to conform with React 19's refs passing, hydration parameters, and lifecycle guidelines.
- **SVG Mask Scoping**: Scoped unique SVG identifiers inside instances (e.g. `ScrollTop` dotted paths) using random keys, avoiding render collisions in multi-instance containers.
- **ResizeObserver Canvas Loops**: Replaced global `window` resizing listeners inside background modules with container-specific `ResizeObserver` callbacks, fixing sizing bugs on initial renders.
- **New Variants added**:
  - `ScrollTop`: added `square` (rectangular borders progress) and `glow` (pulsing ambient shadows) variants.
  - `ThreeDStackCards`: added interactive stacked arrays.
  - `PromptInput`: added character counters and auto-growing chat parameters.

---

##  Publishing & CI/CD Pipelines

To contribute to or deploy the library:

### 1. Verification Build
Compile files locally to ensure ESModules, CommonJS, and declaration maps map cleanly:
```bash
cmd.exe /c npm run build
```

### 2. Semantic Release Cycles
Our repository enforces **Semantic Versioning** automated commits hooks. Merging pull requests to the `main` branch automatically checks tags and deploys versions to the npm registry:
- `fix(scroll-progress): ...` -> triggers automated patch version bump (e.g. `2.0.1`)
- `feat(audio-player): ...` -> triggers automated minor version bump (e.g. `2.1.0`)
- `feat(navbar)!: ...` (or containing `BREAKING CHANGE`) -> triggers major version bump (e.g. `3.0.0`)

---

## 📄 License

MIT © [Hemanath AFK](https://github.com/hemanath-afk)  
Feel free to use these modules inside private agency layouts, commercial portfolios, and personal SaaS products.

