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
* **Apple TV Parallax**: Features `ImageDepthHover` to transform static image layers into gorgeous interactive 3D structures.
* **Lightweight Footprint**: Excludes large physics engine dependencies. Spring physics are computed natively.
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

*Note: React 19 is a peer dependency.*

---

## 🛠️ API Reference & Examples

### 1. CoordinateHover (The Hero)

Tracks relative cursor movement within an element to apply dynamic 3D tilting, radial spotlight glowing overlays, and shadow displacement pointing away from the light source.

```tsx
import { CoordinateHover } from "@hemanath-afk/afk-motion";

export default function SkillCard() {
  return (
    <CoordinateHover
      maxTilt={15}
      scale={1.05}
      glow={true}
      glowColor="rgba(99, 102, 241, 0.15)"
      glowSize={350}
      shadow={true}
      shadowColor="rgba(0, 0, 0, 0.4)"
      style={{
        width: "300px",
        height: "200px",
        background: "#0d0d15",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <h3>Development</h3>
      <p>Hover to see 3D response.</p>
    </CoordinateHover>
  );
}
```

#### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `15` | Maximum tilt angle in degrees. |
| `scale` | `number` | `1.05` | Card scale factor when hovered. |
| `perspective` | `number` | `1000` | Perspective depth distance in pixels. |
| `stiffness` | `number` | `150` | Spring physics stiffness coefficient. |
| `damping` | `number` | `15` | Spring physics damping coefficient. |
| `glow` | `boolean` | `true` | Enable radial mouse spotlight. |
| `glowColor` | `string` | `rgba(255,255,255,0.12)` | Radial spotlight color. |
| `glowSize` | `number` | `350` | Radial spotlight circle diameter. |
| `shadow` | `boolean` | `true` | Shift shadow away from the cursor. |
| `shadowColor` | `string` | `rgba(0,0,0,0.4)` | Color of the shifting drop shadow. |

---

### 2. ImageDepthHover (3D Parallax Card)

Takes stacked image layers and translates them at different rates depending on mouse position. Renders a stunning 3D perspective effect.

```tsx
import { ImageDepthHover } from "@hemanath-afk/afk-motion";

export default function ParallaxShowcase() {
  return (
    <ImageDepthHover
      layers={[
        "/bg.png",     // Background (shifts least)
        "/mid.png",    // Midground
        "/front.png"   // Foreground (shifts most)
      ]}
      maxShift={25}
      maxTilt={8}
      style={{
        width: "400px",
        height: "300px",
        borderRadius: "20px"
      }}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `layers` | `(string \| ImageLayer)[]` | *Required* | Array of image URLs or layer configurations (`{ src, depth, alt }`). |
| `maxShift` | `number` | `25` | Maximum translation displacement in pixels. |
| `maxTilt` | `number` | `8` | Maximum coordinate tilt of card boundary. |
| `glow` | `boolean` | `true` | Enable mouse spotlight overlay. |
| `glowColor` | `string` | `rgba(255,255,255,0.15)` | Color of the spotlight gradient. |

---

### 3. ScrollTop

A premium, customizable floating button that triggers smooth scrolling to page top, complete with an SVG scroll-depth progress ring.

```tsx
import { ScrollTop } from "@hemanath-afk/afk-motion";

export default function App() {
  return (
    <div>
      {/* Renders a glassmorphic floating button with an active progress track */}
      <ScrollTop
        size={60}
        threshold={300}
        duration={800}
        progressColor="#6366f1"
        glass={true}
      />
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number` | `60` | Width/Height of the round button in pixels. |
| `threshold` | `number` | `300` | Vertical scroll threshold (in px) before appearing. |
| `duration` | `number` | `800` | Smooth scroll duration in milliseconds. |
| `progressRing` | `boolean` | `true` | Enable circular progress outline. |
| `progressColor` | `string` | `#ffffff` | Color of active progress line. |
| `strokeWidth` | `number` | `3` | Thickness of progress circle line. |
| `glass` | `boolean` | `true` | Apply blur backdrops and translucent borders. |
| `floating` | `boolean` | `true` | Fixed position bottom right. |
| `icon` | `React.ReactNode` | *Dotted Arrow* | Custom SVG or icon wrapper. |

---

### 4. MagneticButton

Attracts the button element toward the mouse pointer when within range, creating elastic cursor magnets using custom springs.

```tsx
import { MagneticButton } from "@hemanath-afk/afk-motion";

export default function Contact() {
  return (
    <MagneticButton strength={0.35} range={45}>
      <button style={{ padding: "12px 24px", borderRadius: "30px" }}>
        Say Hello
      </button>
    </MagneticButton>
  );
}
```

#### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `strength` | `number` | `0.35` | Attraction force multiplier (0.0 to 1.0). |
| `range` | `number` | `45` | Hover boundary buffer padding in pixels. |
| `stiffness` | `number` | `120` | Spring stiffness factor. |
| `damping` | `number` | `12` | Spring damping resistance. |

---

### 5. CursorGlow

Generates a gorgeous blurred glowing circle that smoothly follows mouse movements. Automatically expands and shifts scale when hover coordinates overlap interactive links or buttons.

```tsx
import { CursorGlow } from "@hemanath-afk/afk-motion";

export default function Layout({ children }) {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Restricts mouse glow trail behind card text */}
      <CursorGlow color="rgba(99, 102, 241, 0.15)" size={300} global={false} />
      {children}
    </div>
  );
}
```

#### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number` | `300` | Diameter of the glow blob. |
| `color` | `string` | `rgba(99,102,241,0.15)` | Spot light gradient color. |
| `blur` | `number` | `60` | CSS blur radius in pixels. |
| `global` | `boolean` | `false` | Tracks full body layout coordinates instead of container. |
| `hoverScale` | `number` | `1.4` | Scale multiplier when hovering buttons/links. |

---

### 6. ScrollPlay

Interpolates component styles proportionally based on viewport entrance bounds or linear scroll progress.

```tsx
import { ScrollPlay } from "@hemanath-afk/afk-motion";

export default function ParallaxText() {
  return (
    // Scrubs rotation and vertical coordinate as element passes viewport
    <ScrollPlay
      from={{ opacity: 0.2, y: 50, rotate: -10 }}
      to={{ opacity: 1, y: -50, rotate: 10 }}
      mode="scroll"
      parallaxSpeed={60}
    >
      <h2>Creative Portfolio</h2>
    </ScrollPlay>
  );
}
```

#### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `from` | `ScrollPlayState` | *Required* | Initial layout parameters (`{ opacity, x, y, scale, rotate, blur }`). |
| `to` | `ScrollPlayState` | *Required* | Target layout parameters at full active states. |
| `mode` | `"viewport" \| "scroll"` | `"viewport"` | Trigger once on intersection or linearly scrub based on page depth. |
| `once` | `boolean` | `true` | Run transition only once (for viewport mode). |
| `threshold` | `number` | `0.1` | Viewport visibility ratio before triggering. |
| `duration` | `number` | `800` | Transition duration (viewport mode) in ms. |
| `delay` | `number` | `0` | Transition delay (viewport mode) in ms. |
| `parallaxSpeed` | `number` | `0` | Parallax offset multiplier. |

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
This produces optimized bundles in `dist/` with typings files.

### 2. Manual Publish
```bash
# Login to NPM registry
npm login

# Dry run verification
npm publish --dry-run

# Publish package
npm publish --access public
```

### 3. Automated Semantic Release
Our CI/CD pipeline triggers automated version bumps, changelog compilations, and NPM registry publications whenever you merge to the `main` branch, based on **Semantic Commits**:
* `feat(...)`: bumps **minor** version
* `fix(...)`: bumps **patch** version
* `perf(...)`: bumps **patch** version
* `feat(...)` + `BREAKING CHANGE`: bumps **major** version

---

## 📄 License

 © [Hemanath AFK](https://github.com/hemanath-afk)
