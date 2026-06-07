# afk-motion

[![npm version](https://img.shields.io/npm/v/@hemanath-afk/afk-motion.svg?style=flat-square)](https://www.npmjs.com/package/@hemanath-afk/afk-motion)
[![license](https://img.shields.io/npm/l/@hemanath-afk/afk-motion.svg?style=flat-square)](https://github.com/HEMANATH-AFK/afk-motion/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@hemanath-afk/afk-motion?style=flat-square)](https://bundlephobia.com/package/@hemanath-afk/afk-motion)

A high-performance, tree-shakeable, zero-css-config React 19+ micro-interaction library designed for modern portfolios, agency showcases, and premium landing experiences. 

Inspired by Apple TV cards, GSAP spring mechanics, and Framer Motion ease, `afk-motion` delivers immersive 3D tilting, custom cursors, elastic buttons, and scroll scrubbing utilizing lightweight vanilla physics loops—completely avoiding external library lock-in.

---

## 🚀 Key Features

* **60 FPS Physics**: Uses direct DOM modification via `requestAnimationFrame` loops. No React re-renders on mousemove or scroll triggers!
* **React 19 Ready**: Optimized for React 19 props handling and strict hydration requirements.
* **Zero CSS Setup**: Dynamic styles, spotlight gradients, and glassmorphism borders are applied inline. No CSS files to import.
* **Apple TV Parallax**: Features `ImageDepthHover` and `HoverTilt` to transform static image layers into gorgeous interactive 3D structures.
* **Over 100+ Components**: Spanning 18 rich visual categories (from entrance transitions to dashboard charts and AI interfaces).
* **Fully Tree-shakeable**: Bundled into ESM and CommonJS formats. Import only what you use.

---

## 📦 Installation

```bash
npm install @hemanath-afk/afk-motion
# or
yarn add @hemanath-afk/afk-motion
# or
pnpm add @hemanath-afk/afk-motion
```

*Note: React 19 and Framer Motion are peer dependencies.*

---

## 🛠️ Category Architecture

`afk-motion` is structured into logical categories designed to cover every interactive aspect of modern web design:

1. **Entrance Animations**: Staggered fades, scales, flips, and bounces (`FadeUp`, `ElasticIn`, `BounceIn`, etc.)
2. **Exit Animations**: Unmount coordinates triggers (`FadeOut`, `SlideUpOut`, `ZoomOutExit`, etc.)
3. **Hover Effects**: Proximity magnets, floats, lifts, and spotlight layers (`HoverTilt`, `HoverMagnetic`, `HoverSpotlight`, etc.)
4. **Buttons**: Cyberpunk neon, progress, liquid, and success indicator states (`NeonButton`, `RippleButton`, etc.)
5. **Text Animations**: Character waves, typewriter inputs, neon glows, and scramble decoding (`ScrambleText`, `TypewriterText`, `SplitText`, etc.)
6. **Loading Components**: Orbiting nodes, skeletons, terminal command mocks, and DNA waves (`OrbitLoader`, `DNALoader`, etc.)
7. **Scroll Animations**: Viewport timeline trackers, counters, scroll blurs, and progress indicators (`ScrollProgress`, `ScrollTimeline`, etc.)
8. **Cards**: Glassmorphic, pricing, 3D, bento, and product showcases (`GlassCard`, `GlowCard`, `PricingCard`, etc.)
9. **Navigation Elements**: macOS style docks, circular widgets, hidden headers, and sidebar drawers (`AnimatedNavbar`, `DockMenu`, `SidebarMenu`, etc.)
10. **Background Effects**: Fluid mesh gradients, particle grids, snowfalls, and starfields (`MeshGradient`, `StarfieldBackground`, `AuroraBackground`, etc.)
11. **Mouse Effects**: Cursor trails, spotlight focus masks, magnetic shapes, and ripples (`CustomCursor`, `CursorTrail`, `SpotlightCursor`, etc.)
12. **Modal & Overlays**: Confirms dialogs, bottom sheets, snackbars, and toasts (`AnimatedModal`, `BottomSheet`, `ToastNotification`, etc.)
13. **Form Elements**: Floating labels, passcode blocks, strength sliders, and search inputs (`OTPInput`, `ToggleSwitch`, `RangeSlider`, etc.)
14. **Hero Sections**: Large screen typing titles, video backdrops, and hero reveal structures (`HeroReveal`, etc.)
15. **3D Components**: Explosive layered showcases, rotating product carousels, and 3D cubes (`ThreeDProductShowcase`, `ThreeDStackCards`, etc.)
16. **Dashboard Widgets**: Progress rings, KPI rise counters, sparkline charts, and activity feeds (`AnimatedStatsCard`, `ActivityFeed`, `ProgressRing`, etc.)
17. **Advanced Components**: Terminal emulators, command palettes, Stepper, and FAQ accordions (`TerminalEmulator`, `CommandPalette`, etc.)
18. **AI Era Components**: Chat bubbles, streaming text simulators, and thinking indicators (`AIChatBubble`, `StreamingText`, `ThinkingIndicator`, etc.)

---

## 💡 Code Examples

### 1. 3D Hover Tilt Card

Tracks relative cursor movement within an element to apply dynamic 3D tilting, radial spotlight glowing overlays, and shadow displacement.

```tsx
import { HoverTilt, GlassCard } from "@hemanath-afk/afk-motion";

export default function SkillCard() {
  return (
    <HoverTilt maxTilt={15} scale={1.05}>
      <GlassCard style={{ width: "300px", height: "200px", padding: "24px" }}>
        <h3>Premium Feature</h3>
        <p>Hover and move cursor around to see 3D response.</p>
      </GlassCard>
    </HoverTilt>
  );
}
```

### 2. Sandbox Modals & Overlays

Allows overlays to overlay pages or fit inline inside preview canvases by setting the `inline` parameter to `true`.

```tsx
import { AnimatedModal } from "@hemanath-afk/afk-motion";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <AnimatedModal isOpen={open} onClose={() => setOpen(false)} inline={false}>
        <h2>System Alert</h2>
        <p>Authentication was completed successfully.</p>
      </AnimatedModal>
    </div>
  );
}
```

### 3. Scroll Container Indicator

Enables scroll animations to scrub inside custom container scrollable containers rather than the full window context.

```tsx
import { ScrollProgress } from "@hemanath-afk/afk-motion";
import { useRef } from "react";

export default function ScrollBox() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} style={{ height: "300px", overflowY: "auto", position: "relative" }}>
      {/* ScrollProgress absolute positioning aligns with the ref container */}
      <ScrollProgress container={scrollRef} color="#6366f1" height={4} />
      <div style={{ height: "800px", padding: "20px" }}>
        <p>Scroll down to see the progress bar update.</p>
      </div>
    </div>
  );
}
```

### 4. Custom Cursor Trails

Emits high-performance trailing point indicators tracking global coordinates without triggering React re-renders.

```tsx
import { CursorTrail } from "@hemanath-afk/afk-motion";

export default function PageLayout() {
  return (
    <div>
      <CursorTrail color="#6366f1" count={8} />
      <h1>Welcome to AFK Motion</h1>
    </div>
  );
}
```

---

## ⚡ Under the Hood: Performance Optimizations

1. **Direct DOM Binding**: Rather than mapping mouse coordinates to React state (which triggers rapid component re-renders and lags animations), coordinates are mapped directly to DOM CSS properties inside `requestAnimationFrame` loops.
2. **Passive Observers**: Uses `{ passive: true }` listeners for scroll and mouse events, preventing main thread paint blockages and maintaining a smooth 60 FPS profile.
3. **Hardware Accelerations**: Employs `translate3d` and GPU filters (opacity, blur) to ensure transitions occur on compositing layers.

---

## 📦 Publishing to NPM

### 1. Build and Bundle locally
To verify everything compiles cleanly before shipping:
```bash
npm run build
```
This produces optimized bundles in `dist/` with type definition files.

### 2. Automated Versioning and Release
Our CI/CD pipeline triggers automated version bumps, changelog updates, and NPM registry publications whenever changes are merged to the `main` branch, based on **Semantic Commits**:
- `feat(...)`: bumps **minor** version
- `fix(...)`: bumps **patch** version
- `perf(...)`: bumps **patch** version
- `feat(...)` + `BREAKING CHANGE`: bumps **major** version

---

## 📄 License

 © [Hemanath AFK](https://github.com/hemanath-afk)
