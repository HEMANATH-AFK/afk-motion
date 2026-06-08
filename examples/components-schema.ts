export interface PropControl {
  name: string;
  type: "string" | "number" | "boolean" | "select" | "color" | "text";
  default: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  description: string;
}

export interface ComponentMetadata {
  name: string;
  importName: string;
  category: string;
  description: string;
  tags: string[];
  props: PropControl[];
  usageCode: (props: any) => string;
  advancedCode: string;
  accessibilityNotes: string;
  performanceNotes: string;
  browserSupport: string;
}

export const CATEGORIES_LABELS: Record<string, string> = {
  entrance: "Entrance Animations",
  exit: "Exit Animations",
  hover: "Hover Effects",
  buttons: "Button Components",
  text: "Text Animations",
  loading: "Loading Components",
  scroll: "Scroll Animations",
  cards: "Card Components",
  navigation: "Navigation Elements",
  backgrounds: "Background Effects",
  mouse: "Mouse Effects",
  modals: "Modal & Overlays",
  forms: "Form Elements",
  hero: "Hero Sections",
  "3d": "3D Components",
  dashboard: "Dashboard Widgets",
  advanced: "Advanced Components",
  ai: "AI Era Components"
};

export interface ComponentSchemaItem {
  name: string;
  importName: string;
  category: string;
  description?: string;
  tags?: string[];
  props?: PropControl[];
  usageCode?: (props: any) => string;
  advancedCode?: string;
  accessibilityNotes?: string;
  performanceNotes?: string;
  browserSupport?: string;
}

export const componentsSchema: Record<string, ComponentSchemaItem[]> = {
  entrance: [
    {
      name: "Fade Up",
      importName: "FadeUp",
      category: "entrance",
      description: "Smooth vertical entrance animation moving upwards. Perfect for header text, cards, and sequential list reveals.",
      tags: ["entrance", "fade", "spring"],
      props: [
        { name: "duration", type: "number", default: 0.6, min: 0.1, max: 3, step: 0.1, description: "Animation duration in seconds" },
        { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Animation start delay" },
        { name: "once", type: "boolean", default: true, description: "Only animate the first time it enters viewport" },
        { name: "threshold", type: "number", default: 0.1, min: 0, max: 1, step: 0.05, description: "Viewport intersection ratio" }
      ],
      usageCode: (props) => `import { FadeUp } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <FadeUp duration={${props.duration}} delay={${props.delay}} once={${props.once}} threshold={${props.threshold}}>\n      <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>\n        <h4>Fading Up Element</h4>\n        <p>Premium spring-physics entrance animation.</p>\n      </div>\n    </FadeUp>\n  );\n}`,
      advancedCode: `import { FadeUp, FadeIn } from "@hemanath-afk/afk-motion";\n\nexport function StaggeredSection() {\n  return (\n    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>\n      <FadeIn delay={0.1}>\n        <h1>Our Features</h1>\n      </FadeIn>\n      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>\n        <FadeUp delay={0.2}><Card>Staggered 1</Card></FadeUp>\n        <FadeUp delay={0.3}><Card>Staggered 2</Card></FadeUp>\n        <FadeUp delay={0.4}><Card>Staggered 3</Card></FadeUp>\n      </div>\n    </div>\n  );\n}`,
      accessibilityNotes: "Employs Framer Motion's layout properties. Compatible with reduced motion configurations; fallback removes layout translations automatically.",
      performanceNotes: "Hardware accelerated transforms. Animates opacity and GPU-bound translate properties (y coordinate).",
      browserSupport: "Supported on all modern browsers (Chrome 80+, Safari 13.1+, Firefox 75+, Edge 80+)."
    },
    {
      name: "Bounce In",
      importName: "BounceIn",
      category: "entrance",
      description: "Elastic, bounce-style zoom entrance powered by custom spring physics. Excellent for alerts, modal triggers, and buttons.",
      tags: ["entrance", "spring", "pop"],
      props: [
        { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Animation start delay" },
        { name: "once", type: "boolean", default: true, description: "Only animate the first time it enters viewport" }
      ],
      usageCode: (props) => `import { BounceIn } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <BounceIn delay={${props.delay}} once={${props.once}}>\n      <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justify{content: "center"} }}>\n        ⭐\n      </div>\n    </BounceIn>\n  );\n}`,
      advancedCode: `import { BounceIn } from "@hemanath-afk/afk-motion";\n\nexport function PopAlert() {\n  return (\n    <BounceIn delay={0.1}>\n      <div className="alert-box">\n        <span>⚡ Action Completed!</span>\n      </div>\n    </BounceIn>\n  );\n}`,
      accessibilityNotes: "If user settings favor reduced motion, scale transition defaults to smooth opacity fade.",
      performanceNotes: "Runs directly on GPU layer. Uses transform matrices for scale transitions.",
      browserSupport: "Fully supported on modern rendering engines."
    },
    { name: "Fade In", importName: "FadeIn", category: "entrance" },
    { name: "Fade Down", importName: "FadeDown", category: "entrance" },
    { name: "Fade Left", importName: "FadeLeft", category: "entrance" },
    { name: "Fade Right", importName: "FadeRight", category: "entrance" },
    { name: "Zoom In", importName: "ZoomIn", category: "entrance" },
    { name: "Zoom Out", importName: "ZoomOut", category: "entrance" },
    { name: "Scale In", importName: "ScaleIn", category: "entrance" },
    { name: "Slide Up", importName: "SlideUp", category: "entrance" },
    { name: "Slide Down", importName: "SlideDown", category: "entrance" },
    { name: "Slide Left", importName: "SlideLeft", category: "entrance" },
    { name: "Slide Right", importName: "SlideRight", category: "entrance" },
    { name: "Rotate In", importName: "RotateIn", category: "entrance" },
    { name: "Flip In X", importName: "FlipInX", category: "entrance" },
    { name: "Flip In Y", importName: "FlipInY", category: "entrance" },
    { name: "Blur In", importName: "BlurIn", category: "entrance" },
    { name: "Expand In", importName: "ExpandIn", category: "entrance" },
    { name: "Elastic In", importName: "ElasticIn", category: "entrance" },
    { name: "Swing In", importName: "SwingIn", category: "entrance" },
    { name: "Roll In", importName: "RollIn", category: "entrance" },
    { name: "Light Speed In", importName: "LightSpeedIn", category: "entrance" }
  ],
  exit: [
    {
      name: "Fade Up Out",
      importName: "FadeUpOut",
      category: "exit",
      description: "Dismiss/unmount component by fading out and translating upwards. Best for list item deletion, banner closures, and toast exits.",
      tags: ["exit", "fade", "out"],
      props: [
        { name: "duration", type: "number", default: 0.5, min: 0.1, max: 3, step: 0.1, description: "Animation duration in seconds" },
        { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Animation start delay" }
      ],
      usageCode: (props) => `import { FadeUpOut } from "@hemanath-afk/afk-motion";\nimport { AnimatePresence } from "framer-motion";\n\nexport default function Example({ isVisible }) {\n  return (\n    <AnimatePresence>\n      {isVisible && (\n        <FadeUpOut duration={${props.duration}} delay={${props.delay}}>\n          <div style={{ padding: "16px", background: "#ef4444", borderRadius: "8px" }}>\n            This fades up on deletion\n          </div>\n        </FadeUpOut>\n      )}\n    </AnimatePresence>\n  );\n}`,
      advancedCode: `// Exit animation nested in lists\nimport { FadeUpOut } from "@hemanath-afk/afk-motion";\nimport { AnimatePresence } from "framer-motion";\n\nexport function ListDismiss({ items, handleRemove }) {\n  return (\n    <AnimatePresence>\n      {items.map(item => (\n        <FadeUpOut key={item.id}>\n          <div className="item-row">\n            <span>{item.name}</span>\n            <button onClick={() => handleRemove(item.id)}>&times;</button>\n          </div>\n        </FadeUpOut>\n      ))}\n    </AnimatePresence>\n  );\n}`,
      accessibilityNotes: "Requires wrapping in Framer Motion's AnimatePresence to coordinate unmounting states.",
      performanceNotes: "Will trigger reflows if container dimensions are modified. Use absolute positioning inside lists where appropriate.",
      browserSupport: "Fully supported on Chrome, Safari, Firefox, Edge."
    },
    { name: "Fade Out", importName: "FadeOut", category: "exit" },
    { name: "Fade Down Out", importName: "FadeDownOut", category: "exit" },
    { name: "Fade Left Out", importName: "FadeLeftOut", category: "exit" },
    { name: "Fade Right Out", importName: "FadeRightOut", category: "exit" },
    { name: "Zoom Out Exit", importName: "ZoomOutExit", category: "exit" },
    { name: "Scale Out", importName: "ScaleOut", category: "exit" },
    { name: "Slide Up Out", importName: "SlideUpOut", category: "exit" },
    { name: "Slide Down Out", importName: "SlideDownOut", category: "exit" },
    { name: "Slide Left Out", importName: "SlideLeftOut", category: "exit" },
    { name: "Slide Right Out", importName: "SlideRightOut", category: "exit" },
    { name: "Rotate Out", importName: "RotateOut", category: "exit" },
    { name: "Flip Out X", importName: "FlipOutX", category: "exit" },
    { name: "Flip Out Y", importName: "FlipOutY", category: "exit" },
    { name: "Blur Out", importName: "BlurOut", category: "exit" },
    { name: "Collapse Out", importName: "CollapseOut", category: "exit" },
    { name: "Bounce Out", importName: "BounceOut", category: "exit" },
    { name: "Roll Out", importName: "RollOut", category: "exit" }
  ],
  hover: [
    {
      name: "Hover Tilt",
      importName: "HoverTilt",
      category: "hover",
      description: "Calculates mouse coordinate vectors to apply premium 3D parallax rotation to elements. Ideal for profiles, images, and pricing cards.",
      tags: ["hover", "3d", "tilt", "mouse"],
      props: [
        { name: "maxTilt", type: "number", default: 15, min: 5, max: 45, step: 1, description: "Maximum rotation angle in degrees" },
        { name: "scale", type: "number", default: 1.04, min: 0.9, max: 1.2, step: 0.01, description: "Scale multiplier on hover" }
      ],
      usageCode: (props) => `import { HoverTilt } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <HoverTilt maxTilt={${props.maxTilt}} scale={${props.scale}}>\n      <div style={{ width: "240px", height: "160px", background: "linear-gradient(135deg, #6366f1, #c084fc)", borderRadius: "16px", padding: "20px", color: "#fff" }}>\n        <h3>Interactive Tilt Card</h3>\n        <p>Hover and move mouse around.</p>\n      </div>\n    </HoverTilt>\n  );\n}`,
      advancedCode: `import { HoverTilt } from "@hemanath-afk/afk-motion";\n\nexport function ParallaxProfile() {\n  return (\n    <HoverTilt maxTilt={20} scale={1.05}>\n      <div className="profile-card">\n        <div className="avatar" style={{ transform: "translateZ(30px)" }} />\n        <h2 style={{ transform: "translateZ(15px)" }}>Hemanath AFK</h2>\n      </div>\n    </HoverTilt>\n  );\n}`,
      accessibilityNotes: "Uses direct pointer device bindings. Keyboard focus does not trigger mouse tilt angles.",
      performanceNotes: "Optimized 3D matrix operations. Frame updates bound to requestAnimationFrame loops.",
      browserSupport: "Requires CSS transform-style: preserve-3d capability."
    },
    {
      name: "Hover Underline",
      importName: "HoverUnderline",
      category: "hover",
      description: "Highly polished text link animation that expands an underline from the center or edge with cubic-bezier easing.",
      tags: ["hover", "text", "underline"],
      props: [
        { name: "color", type: "color", default: "#6366f1", description: "Underline line color" },
        { name: "height", type: "number", default: 2, min: 1, max: 6, step: 1, description: "Underline line thickness (px)" }
      ],
      usageCode: (props) => `import { HoverUnderline } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <HoverUnderline color="${props.color}" height={${props.height}}>\n      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Hover over this text</span>\n    </HoverUnderline>\n  );\n}`,
      advancedCode: `import { HoverUnderline } from "@hemanath-afk/afk-motion";\n\nexport function MainNavigation() {\n  return (\n    <nav style={{ display: "flex", gap: "24px" }}>\n      <HoverUnderline><a href="#home">Home</a></HoverUnderline>\n      <HoverUnderline><a href="#works">Works</a></HoverUnderline>\n    </nav>\n  );\n}`,
      accessibilityNotes: "Maintains screen reader accessibility using standard textual layout elements.",
      performanceNotes: "Uses GPU composited scaleX transitions for maximum efficiency.",
      browserSupport: "Compatible with all viewport rendering engines."
    },
    { name: "Hover Scale", importName: "HoverScale", category: "hover" },
    { name: "Hover Grow", importName: "HoverGrow", category: "hover" },
    { name: "Hover Shrink", importName: "HoverShrink", category: "hover" },
    { name: "Hover Lift", importName: "HoverLift", category: "hover" },
    { name: "Hover Float", importName: "HoverFloat", category: "hover" },
    { name: "Hover Rotate", importName: "HoverRotate", category: "hover" },
    { name: "Hover Flip", importName: "HoverFlip", category: "hover" },
    { name: "Hover Glow", importName: "HoverGlow", category: "hover" },
    { name: "Hover Pulse", importName: "HoverPulse", category: "hover" },
    { name: "Hover Shake", importName: "HoverShake", category: "hover" },
    { name: "Hover Bounce", importName: "HoverBounce", category: "hover" },
    { name: "Hover Ripple", importName: "HoverRipple", category: "hover" },
    { name: "Hover Magnetic", importName: "HoverMagnetic", category: "hover" },
    { name: "Hover Border Expand", importName: "HoverBorderExpand", category: "hover" },
    { name: "Hover Gradient Shift", importName: "HoverGradientShift", category: "hover" },
    { name: "Hover Spotlight", importName: "HoverSpotlight", category: "hover" }
  ],
  buttons: [
    {
      name: "Neon Button",
      importName: "NeonButton",
      category: "buttons",
      description: "Glowing neon cyberpunk button with customized hover outlines and inner glow filters.",
      tags: ["button", "neon", "glow", "cyberpunk"],
      props: [
        { name: "color", type: "color", default: "#00ffcc", description: "Neon theme color" },
        { name: "children", type: "string", default: "Cyber Button", description: "Button label text" }
      ],
      usageCode: (props) => `import { NeonButton } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <NeonButton color="${props.color}">\n      ${props.children}\n    </NeonButton>\n  );\n}`,
      advancedCode: `import { NeonButton } from "@hemanath-afk/afk-motion";\n\nexport function CyberGroup() {\n  return (\n    <div style={{ display: "flex", gap: "12px" }}>\n      <NeonButton color="#ff0055">Delete</NeonButton>\n      <NeonButton color="#00ffcc">Initiate</NeonButton>\n    </div>\n  );\n}`,
      accessibilityNotes: "Semantic button container. Uses focus-visible outlines to comply with WCAG 2.1 AAA keyboard focus indicators.",
      performanceNotes: "Avoid applying heavy multiple drop-shadow layers in animation loop to prevent repaint bottlenecks.",
      browserSupport: "Fully compatible with CSS custom filters and text-shadow properties."
    },
    {
      name: "Loading Button",
      importName: "LoadingButton",
      category: "buttons",
      description: "Button showing dynamic loading spinners and progress states while maintaining accessibility parameters.",
      tags: ["button", "loader", "async"],
      props: [
        { name: "isLoading", type: "boolean", default: true, description: "Display spinner and disable clicks" },
        { name: "children", type: "string", default: "Process Task", description: "Button label text" }
      ],
      usageCode: (props) => `import { LoadingButton } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <LoadingButton isLoading={${props.isLoading}}>\n      ${props.children}\n    </LoadingButton>\n  );\n}`,
      advancedCode: `import { LoadingButton } from "@hemanath-afk/afk-motion";\nimport { useState } from "react";\n\nexport function SubmitTask() {\n  const [loading, setLoading] = useState(false);\n  return (\n    <LoadingButton \n      isLoading={loading} \n      onClick={() => {\n        setLoading(true);\n        setTimeout(() => setLoading(false), 2000);\n      }}\n    >\n      Execute Request\n    </LoadingButton>\n  );\n}`,
      accessibilityNotes: "Adds aria-disabled properties and sets pointer-events to none while loading.",
      performanceNotes: "Spinner utilizes hardware accelerated CSS transitions for smooth infinite loops.",
      browserSupport: "Standard web standard."
    },
    { name: "Animated Button", importName: "AnimatedButton", category: "buttons" },
    { name: "Ripple Button", importName: "RippleButton", category: "buttons" },
    { name: "Glow Button", importName: "GlowButton", category: "buttons" },
    { name: "Liquid Button", importName: "LiquidButton", category: "buttons" },
    {
      name: "Morph Button",
      importName: "MorphButton",
      category: "buttons",
      description: "Interactive button morphing into completely different shape/color states on click.",
      tags: ["button", "morph", "spring"],
      props: [
        { name: "morphColor", type: "color", default: "#10b981", description: "Color after morph animation finishes" },
        { name: "defaultText", type: "string", default: "Download File", description: "Default button label" },
        { name: "activeText", type: "string", default: "Success!", description: "Label shown after morphing completes" }
      ],
      usageCode: (props) => `import { MorphButton } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <MorphButton morphColor="${props.morphColor}" defaultText="${props.defaultText}" activeText="${props.activeText}" />\n  );\n}`
    },
    {
      name: "Success Button",
      importName: "SuccessButton",
      category: "buttons",
      description: "Submit button with integrated success state transition and check icon animation.",
      tags: ["button", "success", "check"],
      props: [
        { name: "defaultColor", type: "color", default: "#6366f1", description: "Initial button background color" },
        { name: "successColor", type: "color", default: "#10b981", description: "Success state background color" },
        { name: "defaultText", type: "string", default: "Submit Data", description: "Default button label text" },
        { name: "successText", type: "string", default: "Success!", description: "Success state label text" }
      ],
      usageCode: (props) => `import { SuccessButton } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <SuccessButton defaultColor="${props.defaultColor}" successColor="${props.successColor}" defaultText="${props.defaultText}" successText="${props.successText}" />\n  );\n}`
    },
    {
      name: "Progress Button",
      importName: "ProgressButton",
      category: "buttons",
      description: "Action button containing an integrated progress loading bar indicator overlay.",
      tags: ["button", "progress", "loading"],
      props: [
        { name: "progressColor", type: "color", default: "#3b82f6", description: "Active progress loading indicator color" },
        { name: "defaultText", type: "string", default: "Start Upload", description: "Default button text" },
        { name: "activeText", type: "string", default: "Uploading...", description: "Active progress state text" },
        { name: "duration", type: "number", default: 2000, min: 500, max: 8000, step: 100, description: "Simulation loading duration (ms)" }
      ],
      usageCode: (props) => `import { ProgressButton } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ProgressButton progressColor="${props.progressColor}" defaultText="${props.defaultText}" activeText="${props.activeText}" duration={${props.duration}} />\n  );\n}`
    },
    { name: "Gradient Button", importName: "GradientButton", category: "buttons" },
    { name: "Shiny Button", importName: "ShinyButton", category: "buttons" },
    { name: "Pulse Button", importName: "PulseButton", category: "buttons" },
    { name: "Bounce Button", importName: "BounceButton", category: "buttons" }
  ],
  text: [
    {
      name: "Scramble Text",
      importName: "ScrambleText",
      category: "text",
      description: "Cyberpunk text scrambling effect that reveals text character-by-character with custom speeds. Very popular in hero landing pages.",
      tags: ["text", "scramble", "reveal"],
      props: [
        { name: "text", type: "string", default: "SECURE SYSTEM DECODED", description: "The final text to reveal" },
        { name: "speed", type: "number", default: 50, min: 10, max: 200, step: 5, description: "Speed of scramble transitions (ms)" }
      ],
      usageCode: (props) => `import { ScrambleText } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ScrambleText text="${props.text}" speed={${props.speed}} />\n  );\n}`,
      advancedCode: `import { ScrambleText } from "@hemanath-afk/afk-motion";\nimport { useState } from "react";\n\nexport function ScrambleTrigger() {\n  const [trigger, setTrigger] = useState(0);\n  return (\n    <div onClick={() => setTrigger(p => p + 1)} style={{ cursor: "pointer" }}>\n      <ScrambleText text="CLICK TO RE-TRIGGER" key={trigger} />\n    </div>\n  );\n}`,
      accessibilityNotes: "The target text is immediately read by screen readers through fallback HTML text labels.",
      performanceNotes: "Uses React-managed interval updates. Clear triggers are correctly unmounted to prevent memory leaks.",
      browserSupport: "Universal browser compatibility."
    },
    { name: "Typewriter Text", importName: "TypewriterText", category: "text" },
    { name: "Split Text", importName: "SplitText", category: "text" },
    { name: "Letter Reveal", importName: "LetterReveal", category: "text" },
    { name: "Word Reveal", importName: "WordReveal", category: "text" },
    { name: "Character Wave", importName: "CharacterWave", category: "text" },
    { name: "Gradient Text", importName: "GradientText", category: "text" },
    { name: "Glitch Text", importName: "GlitchText", category: "text" },
    { name: "Neon Text", importName: "NeonText", category: "text" },
    { name: "Blur Reveal Text", importName: "BlurRevealText", category: "text" },
    { name: "Rotate Text", importName: "RotateText", category: "text" },
    { name: "Infinite Ticker", importName: "InfiniteTicker", category: "text" },
    { name: "Marquee Text", importName: "MarqueeText", category: "text" },
    { name: "Count Up Text", importName: "CountUpText", category: "text" },
    { name: "Number Ticker", importName: "NumberTicker", category: "text" }
  ],
  loading: [
    {
      name: "Pulse Loader",
      importName: "PulseLoader",
      category: "loading",
      description: "Pulsing radial scale wave indicating background load states. Highly polished styling for dashboards and data requests.",
      tags: ["loader", "pulse", "glow"],
      props: [
        { name: "size", type: "number", default: 45, min: 20, max: 120, step: 5, description: "Diameter of loader (px)" }
      ],
      usageCode: (props) => `import { PulseLoader } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <PulseLoader size={${props.size}} />\n  );\n}`,
      advancedCode: `import { PulseLoader } from "@hemanath-afk/afk-motion";\n\nexport function TablePlaceholder() {\n  return (\n    <div className="placeholder-row">\n      <PulseLoader size={30} />\n      <span>Fetching databases...</span>\n    </div>\n  );\n}`,
      accessibilityNotes: "Exposes appropriate role='status' and aria-live='polite' tags to assistive technologies.",
      performanceNotes: "Infinite scaling animation triggered directly on hardware composited layers.",
      browserSupport: "Compatible with all standard CSS scale and opacity animation layers."
    },
    { name: "Spinner", importName: "Spinner", category: "loading" },
    { name: "Dot Loader", importName: "DotLoader", category: "loading" },
    { name: "Wave Loader", importName: "WaveLoader", category: "loading" },
    { name: "Orbit Loader", importName: "OrbitLoader", category: "loading" },
    { name: "Infinity Loader", importName: "InfinityLoader", category: "loading" },
    { name: "Ring Loader", importName: "RingLoader", category: "loading" },
    { name: "Skeleton Loader", importName: "SkeletonLoader", category: "loading" },
    { name: "Progress Loader", importName: "ProgressLoader", category: "loading" },
    { name: "Bar Loader", importName: "BarLoader", category: "loading" },
    { name: "Cube Loader", importName: "CubeLoader", category: "loading" },
    { name: "DNA Loader", importName: "DNALoader", category: "loading" },
    { name: "Matrix Loader", importName: "MatrixLoader", category: "loading" },
    { name: "Terminal Loader", importName: "TerminalLoader", category: "loading" }
  ],
  scroll: [
    {
      name: "Scroll Progress",
      importName: "ScrollProgress",
      category: "scroll",
      description: "Reading progress bar fixed to the viewport edge. Calculates vertical scroll position with high performance spring dampening.",
      tags: ["scroll", "progress", "spring"],
      props: [
        { name: "color", type: "color", default: "#6366f1", description: "Color of progress line" },
        { name: "height", type: "number", default: 4, min: 2, max: 12, step: 1, description: "Thickness of progress bar (px)" }
      ],
      usageCode: (props) => `import { ScrollProgress } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ScrollProgress color="${props.color}" height={${props.height}} />\n  );\n}`,
      advancedCode: `import { ScrollProgress } from "@hemanath-afk/afk-motion";\n\nexport function Layout() {\n  return (\n    <div>\n      <ScrollProgress color="linear-gradient(90deg, #6366f1, #c084fc)" />\n      <main>Scroll content...</main>\n    </div>\n  );\n}`,
      accessibilityNotes: "Maintains standard reading accessibility standards. Fallback automatically disables on print stylesheets.",
      performanceNotes: "Extremely optimized, utilizes window scroll events bound directly to React hooks.",
      browserSupport: "Fully supported on all viewport scrolling engines."
    },
    {
      name: "Scroll Top",
      importName: "ScrollTop",
      category: "scroll",
      description: "Smooth scroll-to-top floating or full-width button with circular, minimal, percentage, linear, square, or glow progress indicators.",
      tags: ["scroll", "top", "navigation"],
      props: [
        { name: "variant", type: "select", default: "circle", options: ["circle", "minimal", "percentage", "linear", "dotted", "square", "glow"], description: "Visual variant style" },
        { name: "size", type: "number", default: 60, min: 40, max: 100, step: 5, description: "Button diameter (px)" },
        { name: "threshold", type: "number", default: 300, min: 50, max: 1000, step: 50, description: "Scroll threshold to display button (px)" },
        { name: "progressColor", type: "color", default: "#6366f1", description: "Progress active outline/bar color" },
        { name: "glass", type: "boolean", default: true, description: "Enable glassmorphism styling" }
      ],
      usageCode: (props) => `import { ScrollTop } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ScrollTop variant="${props.variant}" size={${props.size}} threshold={${props.threshold}} progressColor="${props.progressColor}" glass={${props.glass}} />\n  );\n}`
    },
    { name: "Scroll Reveal", importName: "ScrollReveal", category: "scroll" },
    { name: "Scroll Fade", importName: "ScrollFade", category: "scroll" },
    { name: "Scroll Scale", importName: "ScrollScale", category: "scroll" },
    { name: "Scroll Rotate", importName: "ScrollRotate", category: "scroll" },
    { name: "Scroll Parallax", importName: "ScrollParallax", category: "scroll" },
    { name: "Scroll Blur", importName: "ScrollBlur", category: "scroll" },
    { name: "Scroll Pin", importName: "ScrollPin", category: "scroll" },
    { name: "Scroll Zoom", importName: "ScrollZoom", category: "scroll" },
    { name: "Scroll Stagger", importName: "ScrollStagger", category: "scroll" },
    { name: "Scroll Counter", importName: "ScrollCounter", category: "scroll" },
    { name: "Scroll Timeline", importName: "ScrollTimeline", category: "scroll" }
  ],
  cards: [
    {
      name: "Glass Card",
      importName: "GlassCard",
      category: "cards",
      description: "Premium SaaS glassmorphism layout containing beautiful backing blurs, border glows, and custom box-shadow layers.",
      tags: ["card", "glass", "premium"],
      props: [
        { name: "children", type: "text", default: "<h4>Premium Card</h4><p>Glassmorphic backing layers.</p>", description: "HTML/String children nested inside Card" }
      ],
      usageCode: (props) => `import { GlassCard } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <GlassCard>\n      <div>${props.children}</div>\n    </GlassCard>\n  );\n}`,
      advancedCode: `import { GlassCard } from "@hemanath-afk/afk-motion";\n\nexport function BentoFeature() {\n  return (\n    <GlassCard style={{ padding: "40px", border: "1px solid rgba(255,255,255,0.06)" }}>\n      <h2>Cloud Services</h2>\n      <p>Secure global data clusters.</p>\n    </GlassCard>\n  );\n}`,
      accessibilityNotes: "Semantic layout card. Ensure inner typography follows appropriate nesting structures.",
      performanceNotes: "Optimize backdrop-filter overlays; avoid overlaying multiple backdrop-filter blurs to prevent framerate dips on low-end hardware.",
      browserSupport: "Supported on Safari 9+, Chrome 76+, Firefox 70+ (with layout configs)."
    },
    { name: "Tilt Card", importName: "TiltCard", category: "cards" },
    { name: "Flip Card", importName: "FlipCard", category: "cards" },
    { name: "Hover Card", importName: "HoverCard", category: "cards" },
    { name: "Glow Card", importName: "GlowCard", category: "cards" },
    { name: "Expand Card", importName: "ExpandCard", category: "cards" },
    { name: "Magnetic Card", importName: "MagneticCard", category: "cards" },
    { name: "ThreeD Card", importName: "ThreeDCard", category: "cards" },
    { name: "Animated Profile Card", importName: "AnimatedProfileCard", category: "cards" },
    { name: "Product Card", importName: "ProductCard", category: "cards" },
    { name: "Pricing Card", importName: "PricingCard", category: "cards" }
  ],
  navigation: [
    {
      name: "Animated Navbar",
      importName: "AnimatedNavbar",
      category: "navigation",
      description: "Tab bar navigation featuring a sliding background spring indicator tracking keyboard and hover focus.",
      tags: ["nav", "spring", "layoutId"],
      props: [
        { name: "items", type: "select", default: ["Home", "Works", "Contact"], options: ["Home,Works,Contact", "Overview,API,Docs,FAQ", "Pricing,Explore,About"], description: "List of items in navigation bar" }
      ],
      usageCode: (props) => {
        const arr = typeof props.items === "string" ? props.items.split(",") : props.items;
        return `import { AnimatedNavbar } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <AnimatedNavbar items={${JSON.stringify(arr)}} />\n  );\n}`;
      },
      advancedCode: `import { AnimatedNavbar } from "@hemanath-afk/afk-motion";\nimport { useState } from "react";\n\nexport function HeaderNav() {\n  const [activeTab, setActiveTab] = useState("Home");\n  return (\n    <AnimatedNavbar \n      items={["Home", "Projects", "Skills", "Contact"]} \n      onChange={(item) => console.log("Current item:", item)}\n    />\n  );\n}`,
      accessibilityNotes: "Exposes role='tablist' and tracks dynamic selection states appropriately.",
      performanceNotes: "Uses layoutId from Framer Motion. Ensures layout transitions are calculated directly on GPU layer.",
      browserSupport: "Compatible with modern layout-id configurations."
    },
    { name: "Floating Navbar", importName: "FloatingNavbar", category: "navigation" },
    {
      name: "Hide On Scroll Navbar",
      importName: "HideOnScrollNavbar",
      category: "navigation",
      description: "Navbar that collapses when scrolling down and reveals when scrolling up. Supports custom inline container mode.",
      tags: ["nav", "scroll", "hide"],
      props: [
        { name: "glass", type: "boolean", default: true, description: "Apply glassmorphism background" },
        { name: "threshold", type: "number", default: 80, min: 20, max: 400, step: 10, description: "Scroll threshold in pixels before hiding" }
      ],
      usageCode: (props) => `import { HideOnScrollNavbar } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <HideOnScrollNavbar glass={${props.glass}} threshold={${props.threshold}}>\n      <div style={{ display: "flex", gap: "20px" }}>\n        <span>Logo</span>\n        <span>Dashboard</span>\n        <span>Settings</span>\n      </div>\n    </HideOnScrollNavbar>\n  );\n}`
    },
    {
      name: "Morph Navbar",
      importName: "MorphNavbar",
      category: "navigation",
      description: "Elegant navbar menu expanding into submenu panels on trigger clicks.",
      tags: ["nav", "morph", "click"],
      props: [
        { name: "activeColor", type: "color", default: "#6366f1", description: "Active indicator highlight color" },
        { name: "items", type: "select", default: "Overview,Pricing,About", options: ["Overview,Pricing,About", "Profile,Settings,Billing,Logout"], description: "Menu links list separated by commas" }
      ],
      usageCode: (props) => {
        const arr = typeof props.items === "string" ? props.items.split(",") : props.items;
        return `import { MorphNavbar } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <MorphNavbar activeColor="${props.activeColor}" items={${JSON.stringify(arr)}} />\n  );\n}`;
      }
    },
    { name: "Sidebar Menu", importName: "SidebarMenu", category: "navigation" },
    { name: "Slide Menu", importName: "SlideMenu", category: "navigation" },
    { name: "Mobile Drawer", importName: "MobileDrawer", category: "navigation" },
    { name: "Mega Menu", importName: "MegaMenu", category: "navigation" },
    {
      name: "Circular Menu",
      importName: "CircularMenu",
      category: "navigation",
      description: "Radial circular menu revealing menu items surrounding a central trigger button on click.",
      tags: ["nav", "circular", "radial"],
      props: [
        { name: "items", type: "select", default: "Home,Works,Contact", options: ["Home,Works,Contact", "Search,Settings,About,Log", "Share,Like,Bookmark,Save,Delete"], description: "Menu labels separated by commas" },
        { name: "radius", type: "number", default: 80, min: 50, max: 150, step: 10, description: "Radius distance of items from center (px)" }
      ],
      usageCode: (props) => {
        const arr = typeof props.items === "string" ? props.items.split(",") : props.items;
        return `import { CircularMenu } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <CircularMenu items={${JSON.stringify(arr)}} radius={${props.radius}} />\n  );\n}`;
      }
    },
    {
      name: "Dock Menu",
      importName: "DockMenu",
      category: "navigation",
      description: "macOS styled dock showing magnification effects on mouse hover proximity.",
      tags: ["nav", "dock", "magnify"],
      props: [
        { name: "items", type: "select", default: "Home,Works,Contact", options: ["Home,Works,Contact", "Overview,Sprints,API,Docs", "Details,Settings"], description: "Menu labels separated by commas" }
      ],
      usageCode: (props) => {
        const arr = typeof props.items === "string" ? props.items.split(",") : props.items;
        return `import { DockMenu } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <DockMenu items={${JSON.stringify(arr)}} />\n  );\n}`;
      }
    }
  ],
  backgrounds: [
    {
      name: "Mesh Gradient",
      importName: "MeshGradient",
      category: "backgrounds",
      description: "Dynamic fluid mesh gradients with smooth color shifts. Ideal for premium landing pages and hero background layouts.",
      tags: ["background", "gradient", "fluid"],
      props: [
        { name: "speed", type: "number", default: 15, min: 5, max: 40, step: 1, description: "Speed of color transition (seconds)" }
      ],
      usageCode: (props) => `import { MeshGradient } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <MeshGradient speed={${props.speed}} />\n  );\n}`,
      advancedCode: `import { MeshGradient } from "@hemanath-afk/afk-motion";\n\nexport function HeroBackground() {\n  return (\n    <div style={{ position: "relative", minHeight: "100vh" }}>\n      <MeshGradient speed={10} />\n      <div style={{ position: "relative", zIndex: 1, padding: "80px" }}>\n        <h1>Welcome to Next-Gen</h1>\n      </div>\n    </div>\n  );\n}`,
      accessibilityNotes: "Positioned as absolute background. Uses z-index layering to ensure foreground text passes AA contrast ratios.",
      performanceNotes: "Uses CSS gradients animators. Ensures rendering frames do not block JS event threads.",
      browserSupport: "Fully supported on modern layout engines."
    },
    { name: "Particle Background", importName: "ParticleBackground", category: "backgrounds" },
    { name: "Starfield Background", importName: "StarfieldBackground", category: "backgrounds" },
    { name: "Aurora Background", importName: "AuroraBackground", category: "backgrounds" },
    { name: "Animated Gradient", importName: "AnimatedGradient", category: "backgrounds" },
    { name: "Matrix Rain", importName: "MatrixRain", category: "backgrounds" },
    { name: "Snow Effect", importName: "SnowEffect", category: "backgrounds" },
    { name: "Rain Effect", importName: "RainEffect", category: "backgrounds" },
    { name: "Bubble Background", importName: "BubbleBackground", category: "backgrounds" },
    { name: "Fireflies Effect", importName: "FirefliesEffect", category: "backgrounds" },
    { name: "Wave Background", importName: "WaveBackground", category: "backgrounds" },
    { name: "Noise Background", importName: "NoiseBackground", category: "backgrounds" }
  ],
  mouse: [
    {
      name: "Spotlight Cursor",
      importName: "SpotlightCursor",
      category: "mouse",
      description: "Interactive spotlight mask following mouse coordinate inputs. Creates a stunning overlay focus mask on landing cards.",
      tags: ["mouse", "cursor", "mask"],
      props: [
        { name: "size", type: "number", default: 260, min: 100, max: 500, step: 20, description: "Radius of spotlight mask (px)" }
      ],
      usageCode: (props) => `import { SpotlightCursor } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <SpotlightCursor size={${props.size}} />\n  );\n}`,
      advancedCode: `import of SpotlightCursor from "@hemanath-afk/afk-motion";\n\nexport function SpotlightCanvas() {\n  return (\n    <div className="canvas-frame">\n      <SpotlightCursor size={300} />\n    </div>\n  );\n}`,
      accessibilityNotes: "Disabled automatically on touch-based devices. Fallback resets masking properties to visible.",
      performanceNotes: "Uses requestAnimationFrame to prevent mouse drag rendering delays.",
      browserSupport: "Requires support for CSS clip-path or masking templates."
    },
    { name: "Custom Cursor", importName: "CustomCursor", category: "mouse" },
    { name: "Cursor Trail", importName: "CursorTrail", category: "mouse" },
    { name: "Magnetic Cursor", importName: "MagneticCursor", category: "mouse" },
    { name: "Cursor Glow Follower", importName: "CursorGlowFollower", category: "mouse" },
    { name: "Cursor Ripple", importName: "CursorRipple", category: "mouse" },
    { name: "Cursor Follower", importName: "CursorFollower", category: "mouse" },
    { name: "Cursor Particles", importName: "CursorParticles", category: "mouse" }
  ],
  modals: [
    {
      name: "Animated Modal",
      importName: "AnimatedModal",
      category: "modals",
      description: "Stunning spring-based dialog popup with background overlays and overlay animations.",
      tags: ["modal", "dialog", "overlay"],
      props: [
        { name: "isOpen", type: "boolean", default: true, description: "Display overlay status" },
        { name: "children", type: "text", default: "<h3>Dialog Portal</h3><p>Configure custom variables inside preview.</p>", description: "Content nested in modal box" }
      ],
      usageCode: (props) => `import { AnimatedModal } from "@hemanath-afk/afk-motion";\n\nexport default function Example({ isOpen, onClose }) {\n  return (\n    <AnimatedModal isOpen={${props.isOpen}} onClose={onClose}>\n      <div>${props.children}</div>\n    </AnimatedModal>\n  );\n}`,
      advancedCode: `import { AnimatedModal } from "@hemanath-afk/afk-motion";\nimport { useState } from "react";\n\nexport function ModalTest() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <AnimatedModal isOpen={open} onClose={() => setOpen(false)}>\n        <h3>Authentication Portal</h3>\n      </AnimatedModal>\n    </div>\n  );\n}`,
      accessibilityNotes: "Tracks focus cycles. Lock document scrolling on active overlays. Focus correctly returns to the triggering button.",
      performanceNotes: "Uses AnimatePresence to coordinate clean unmount hooks.",
      browserSupport: "Standard browser layout compatibility."
    },
    { name: "Blur Modal", importName: "BlurModal", category: "modals" },
    { name: "Slide Modal", importName: "SlideModal", category: "modals" },
    { name: "Zoom Modal", importName: "ZoomModal", category: "modals" },
    { name: "Drawer Modal", importName: "DrawerModal", category: "modals" },
    { name: "Bottom Sheet", importName: "BottomSheet", category: "modals" },
    { name: "Toast Notification", importName: "ToastNotification", category: "modals" },
    { name: "Snackbar", importName: "Snackbar", category: "modals" },
    { name: "Floating Alert", importName: "FloatingAlert", category: "modals" },
    { name: "Confirm Dialog", importName: "ConfirmDialog", category: "modals" }
  ],
  forms: [
    {
      name: "OTP Input",
      importName: "OTPInput",
      category: "forms",
      description: "Animated one-time passcode inputs with automated focus forwarding, backspace catching, and validation alerts.",
      tags: ["form", "input", "validation"],
      props: [
        { name: "length", type: "number", default: 4, min: 4, max: 6, step: 1, description: "Passcode string length" }
      ],
      usageCode: (props) => `import { OTPInput } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <OTPInput length={${props.length}} onChangeVal={(val) => console.log(val)} />\n  );\n}`,
      advancedCode: `import { OTPInput } from "@hemanath-afk/afk-motion";\n\nexport function VerifyOTP() {\n  return (\n    <OTPInput length={6} onChangeVal={(code) => console.log(code)} />\n  );\n}`,
      accessibilityNotes: "Each block uses standard numeric keyboard labels and sets appropriate autocomplete parameters.",
      performanceNotes: "State updates occur locally within the component tree.",
      browserSupport: "Compatible with mobile and desktop browsers."
    },
    { name: "Animated Input", importName: "AnimatedInput", category: "forms" },
    {
      name: "Floating Label Input",
      importName: "FloatingLabelInput",
      category: "forms",
      description: "Beautiful form input field where label animatedly floats upward upon typing or focus.",
      tags: ["form", "input", "float"],
      props: [
        { name: "label", type: "string", default: "Email Address", description: "Placeholder label" }
      ],
      usageCode: (props) => `import { FloatingLabelInput } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <FloatingLabelInput label="${props.label}" />\n  );\n}`
    },
    {
      name: "Password Strength Input",
      importName: "PasswordStrengthInput",
      category: "forms",
      description: "Interactive input field that dynamically estimates password security strength via spring indicators.",
      tags: ["form", "password", "security"],
      props: [
        { name: "label", type: "string", default: "Enter Secure Password", description: "Placeholder label" }
      ],
      usageCode: (props) => `import { PasswordStrengthInput } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <PasswordStrengthInput label="${props.label}" />\n  );\n}`
    },
    { name: "Search Input", importName: "SearchInput", category: "forms" },
    {
      name: "Auto Complete Input",
      importName: "AutoCompleteInput",
      category: "forms",
      description: "Search input suggesting matches interactively on search query entry.",
      tags: ["form", "autocomplete", "suggestions"],
      props: [
        { name: "suggestions", type: "select", default: "React,Framer Motion,Tailwind CSS,Vite,Next.js", options: ["React,Framer Motion,Tailwind CSS,Vite,Next.js", "Chrome Devtools,Gemini Agent,DeepMind"], description: "Dropdown values separated by commas" }
      ],
      usageCode: (props) => {
        const arr = typeof props.suggestions === "string" ? props.suggestions.split(",") : props.suggestions;
        return `import { AutoCompleteInput } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <AutoCompleteInput suggestions={${JSON.stringify(arr)}} />\n  );\n}`;
      }
    },
    { name: "Animated Checkbox", importName: "AnimatedCheckbox", category: "forms" },
    { name: "Animated Radio", importName: "AnimatedRadio", category: "forms" },
    { name: "Toggle Switch", importName: "ToggleSwitch", category: "forms" },
    { name: "Range Slider", importName: "RangeSlider", category: "forms" }
  ],
  hero: [
    {
      name: "Hero Reveal",
      importName: "HeroReveal",
      category: "hero",
      description: "Premium large screen entrance sections containing staggered heading reveals, subtexts, and call-to-action blocks.",
      tags: ["hero", "reveal", "entrance"],
      props: [
        { name: "title", type: "string", default: "Designing Interactions", description: "Large heading text" },
        { name: "subtitle", type: "string", default: "High performance physics based motion blocks.", description: "Subheading details text" }
      ],
      usageCode: (props) => `import { HeroReveal } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <HeroReveal \n      title="${props.title}" \n      subtitle="${props.subtitle}" \n      cta={<button style={{ padding: "10px 20px", background: "#6366f1", border: "none", color: "#fff", borderRadius: "8px" }}>Explore</button>}\n    />\n  );\n}`,
      advancedCode: `import { HeroReveal } from "@hemanath-afk/afk-motion";\n\nexport function LandingHero() {\n  return (\n    <HeroReveal\n      title="AFK Motion Design"\n      subtitle="Zero layout friction React interaction kits."\n    />\n  );\n}`,
      accessibilityNotes: "Renders headings inside semantic H1 tags. Ensure only one H1 is active on target layout screens.",
      performanceNotes: "Uses CSS transitions coordinates for layouts to prevent layout thrashing.",
      browserSupport: "Standard modern browser viewport compatibility."
    },
    { name: "Hero Particles", importName: "HeroParticles", category: "hero" },
    { name: "Hero Parallax", importName: "HeroParallax", category: "hero" },
    { name: "Hero Typing", importName: "HeroTyping", category: "hero" },
    { name: "Hero Spotlight", importName: "HeroSpotlight", category: "hero" },
    { name: "Hero Video Background", importName: "HeroVideoBackground", category: "hero" },
    { name: "Hero Carousel", importName: "HeroCarousel", category: "hero" },
    { name: "Hero Split Reveal", importName: "HeroSplitReveal", category: "hero" }
  ],
  "3d": [
    {
      name: "ThreeD Cube",
      importName: "ThreeDCube",
      category: "3d",
      description: "Fully 3D rotating cube component mapping children components to 3D coordinate face boundaries. Dynamic drag rotation support.",
      tags: ["3d", "cube", "rotation"],
      props: [
        { name: "size", type: "number", default: 80, min: 40, max: 200, step: 10, description: "Cube face edge length (px)" }
      ],
      usageCode: (props) => `import { ThreeDCube } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ThreeDCube size={${props.size}} />\n  );\n}`,
      advancedCode: `import { ThreeDCube } from "@hemanath-afk/afk-motion";\n\nexport function CubeNav() {\n  return (\n    <ThreeDCube size={120} />\n  );\n}`,
      accessibilityNotes: "3D properties are purely layout-based. Avoid hiding nested interactive content inside 3D backfaces.",
      performanceNotes: "Optimized drawing layers using translateZ coordinates.",
      browserSupport: "Requires robust CSS 3D rendering engine support."
    },
    {
      name: "ThreeD Tilt",
      importName: "ThreeDTilt",
      category: "3d",
      description: "Stunning 3D tilt interaction mapping cursor hover coordinates to 3D rotation angles.",
      tags: ["3d", "tilt", "perspective"],
      props: [
        { name: "maxTilt", type: "number", default: 20, min: 5, max: 45, step: 1, description: "Maximum rotation angle (degrees)" },
        { name: "perspective", type: "number", default: 1000, min: 500, max: 2000, step: 100, description: "3D perspective viewport distance" }
      ],
      usageCode: (props) => `import { ThreeDTilt } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ThreeDTilt maxTilt={${props.maxTilt}} perspective={${props.perspective}}>\n      <div style={{ padding: "30px", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>\n        <h3>Hover 3D Tilt</h3>\n      </div>\n    </ThreeDTilt>\n  );\n}`
    },
    { name: "ThreeD Flip", importName: "ThreeDFlip", category: "3d" },
    {
      name: "ThreeD Stack Cards",
      importName: "ThreeDStackCards",
      category: "3d",
      description: "Staggered 3D stacked layout revealing layers dynamically on scroll or hover.",
      tags: ["3d", "stack", "cards"],
      props: [
        { name: "count", type: "number", default: 3, min: 2, max: 5, step: 1, description: "Number of cards in the stack" }
      ],
      usageCode: (props) => `import { ThreeDStackCards } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ThreeDStackCards count={${props.count}} />\n  );\n}`
    },
    { name: "ThreeD Carousel", importName: "ThreeDCarousel", category: "3d" },
    { name: "ThreeD Rotating Gallery", importName: "ThreeDRotatingGallery", category: "3d" },
    {
      name: "ThreeD Product Showcase",
      importName: "ThreeDProductShowcase",
      category: "3d",
      description: "Exploded 3D layer layout perfect for showcasing detailed device/product components.",
      tags: ["3d", "product", "exploded"],
      props: [
        { name: "title", type: "string", default: "Premium Gadget V2", description: "Showcase product title" },
        { name: "price", type: "string", default: "$399", description: "Product price label" },
        { name: "tiltX", type: "number", default: 60, min: 30, max: 90, step: 5, description: "Base tilt angle X" },
        { name: "tiltZ", type: "number", default: -45, min: -90, max: 0, step: 5, description: "Base tilt angle Z" }
      ],
      usageCode: (props) => `import { ThreeDProductShowcase } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ThreeDProductShowcase title="${props.title}" price="${props.price}" tiltX={${props.tiltX}} tiltZ={${props.tiltZ}} />\n  );\n}`
    }
  ],
  dashboard: [
    {
      name: "Progress Ring",
      importName: "ProgressRing",
      category: "dashboard",
      description: "SVG-based circular progress metrics displaying completion percentages with smooth spring offsets.",
      tags: ["dashboard", "svg", "metric"],
      props: [
        { name: "progress", type: "number", default: 80, min: 0, max: 100, step: 5, description: "Progress percentage completion" }
      ],
      usageCode: (props) => `import { ProgressRing } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <ProgressRing progress={${props.progress}} />\n  );\n}`,
      advancedCode: `import { ProgressRing } from "@hemanath-afk/afk-motion";\n\nexport function MetricTracker() {\n  return (\n    <ProgressRing progress={60} />\n  );\n}`,
      accessibilityNotes: "Configures aria-valuenow and aria-valuemax properties automatically.",
      performanceNotes: "Uses SVG stroke-dashoffset calculations. Re-renders are bound only to state updates.",
      browserSupport: "Standard SVG 1.1 layout compatibility."
    },
    { name: "Animated Stats Card", importName: "AnimatedStatsCard", category: "dashboard" },
    { name: "Counter Card", importName: "CounterCard", category: "dashboard" },
    { name: "Circular Progress", importName: "CircularProgress", category: "dashboard" },
    { name: "Activity Feed", importName: "ActivityFeed", category: "dashboard" },
    { name: "Animated Chart Wrapper", importName: "AnimatedChartWrapper", category: "dashboard" },
    { name: "KPI Widget", importName: "KPIWidget", category: "dashboard" },
    { name: "Dashboard Loader", importName: "DashboardLoader", category: "dashboard" }
  ],
  advanced: [
    {
      name: "Terminal Emulator",
      importName: "TerminalEmulator",
      category: "advanced",
      description: "Fully interactive terminal mockup interface rendering dynamic shell outputs, keystrokes, and load stages.",
      tags: ["advanced", "mock", "terminal"],
      props: [
        { name: "title", type: "string", default: "bash - client-server", description: "Terminal header title" }
      ],
      usageCode: (props) => `import { TerminalEmulator } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <TerminalEmulator title="${props.title}" />\n  );\n}`,
      advancedCode: `import { TerminalEmulator } from "@hemanath-afk/afk-motion";\n\nexport function BuildStep() {\n  return (\n    <TerminalEmulator\n      title="afk-package build"\n    />\n  );\n}`,
      accessibilityNotes: "Uses monospaced styling. Text layers readable via screen readers.",
      performanceNotes: "Limits terminal outputs history to prevent high DOM nodes calculation weights.",
      browserSupport: "Universal compatibility."
    },
    { name: "Spotlight", importName: "Spotlight", category: "advanced" },
    {
      name: "Command Palette",
      importName: "CommandPalette",
      category: "advanced",
      description: "Keyboard-accessible command palette overlay menu.",
      tags: ["advanced", "palette", "keyboard"],
      props: [
        { name: "placeholder", type: "string", default: "Search commands...", description: "Search input placeholder" },
        { name: "shortcut", type: "string", default: "⌘K", description: "Shortcut indicator label text" }
      ],
      usageCode: (props) => `import { CommandPalette } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <CommandPalette placeholder="${props.placeholder}" shortcut="${props.shortcut}" />\n  );\n}`
    },
    { name: "Animated Code Block", importName: "AnimatedCodeBlock", category: "advanced" },
    {
      name: "Interactive Timeline",
      importName: "InteractiveTimeline",
      category: "advanced",
      description: "A dynamic layout representing chronological milestones with interactive checks.",
      tags: ["advanced", "timeline", "milestones"],
      props: [
        { name: "color", type: "color", default: "#6366f1", description: "Milestone active line/ring color" }
      ],
      usageCode: (props) => `import { InteractiveTimeline } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <InteractiveTimeline color="${props.color}" />\n  );\n}`
    },
    {
      name: "Stepper",
      importName: "Stepper",
      category: "advanced",
      description: "Wizard component guiding users through sequential multi-step processes.",
      tags: ["advanced", "stepper", "wizard"],
      props: [
        { name: "stepsCount", type: "number", default: 4, min: 2, max: 6, step: 1, description: "Total steps count" }
      ],
      usageCode: (props) => `import { Stepper } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <Stepper stepsCount={${props.stepsCount}} />\n  );\n}`
    },
    { name: "Feature Showcase", importName: "FeatureShowcase", category: "advanced" },
    { name: "Bento Grid", importName: "BentoGrid", category: "advanced" },
    { name: "Infinite Logo Cloud", importName: "InfiniteLogoCloud", category: "advanced" },
    { name: "Testimonial Carousel", importName: "TestimonialCarousel", category: "advanced" },
    { name: "Masonry Gallery", importName: "MasonryGallery", category: "advanced" },
    { name: "Animated FAQ", importName: "AnimatedFAQ", category: "advanced" },
    { name: "Comparison Slider", importName: "ComparisonSlider", category: "advanced" },
    { name: "Before After Image", importName: "BeforeAfterImage", category: "advanced" },
    {
      name: "Pricing Switcher",
      importName: "PricingSwitcher",
      category: "advanced",
      description: "Pricing plans switcher widget containing annual discounts.",
      tags: ["advanced", "pricing", "switcher"],
      props: [
        { name: "monthlyPrice", type: "number", default: 19, min: 5, max: 200, step: 1, description: "Monthly price tier" },
        { name: "yearlyPrice", type: "number", default: 15, min: 5, max: 200, step: 1, description: "Yearly price tier per month" }
      ],
      usageCode: (props) => `import { PricingSwitcher } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <PricingSwitcher monthlyPrice={${props.monthlyPrice}} yearlyPrice={${props.yearlyPrice}} />\n  );\n}`
    },
    { name: "Calendar Heatmap", importName: "CalendarHeatmap", category: "advanced" }
  ],
  ai: [
    {
      name: "Prompt Input",
      importName: "PromptInput",
      category: "ai",
      description: "Auto-growing textbox input with interactive micro-interaction submit buttons. Excellent for chat portals.",
      tags: ["ai", "input", "chat"],
      props: [
        { name: "placeholder", type: "string", default: "Ask Gemini...", description: "Empty state text placeholder" }
      ],
      usageCode: (props) => `import { PromptInput } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <PromptInput placeholder="${props.placeholder}" onSubmit={(val) => console.log(val)} />\n  );\n}`,
      advancedCode: `import { PromptInput } from "@hemanath-afk/afk-motion";\n\nexport function ChatLayout() {\n  return (\n    <PromptInput placeholder="Describe your prompt..." />\n  );\n}`,
      accessibilityNotes: "Tracks key events. Focus shifts directly to input textarea on load.",
      performanceNotes: "TextArea auto-growth uses scrollHeight calculation. Direct DOM mutations prevented.",
      browserSupport: "Standard modern browser integration."
    },
    { name: "AI Chat Bubble", importName: "AIChatBubble", category: "ai" },
    { name: "Streaming Text", importName: "StreamingText", category: "ai" },
    { name: "Thinking Indicator", importName: "ThinkingIndicator", category: "ai" },
    { name: "AI Response Card", importName: "AIResponseCard", category: "ai" },
    { name: "AI Message Loader", importName: "AIMessageLoader", category: "ai" },
    { name: "Token Counter", importName: "TokenCounter", category: "ai" },
    { name: "Conversation Timeline", importName: "ConversationTimeline", category: "ai" }
  ]
};

export function getComponentMetadata(category: string, importName: string): ComponentMetadata {
  const existing = componentsSchema[category]?.find((c) => c.importName === importName);
  const name = existing?.name || importName.replace(/([A-Z])/g, " $1").trim();
  
  let dynamicProps: PropControl[] = [];
  
  if (existing?.props) {
    dynamicProps = existing.props as PropControl[];
  } else {
    // Generate props based on category & component name
    if (category === "entrance") {
      dynamicProps = [
        { name: "duration", type: "number", default: 0.6, min: 0.1, max: 3, step: 0.1, description: "Animation duration in seconds" },
        { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Animation start delay" },
        { name: "once", type: "boolean", default: true, description: "Only animate the first time it enters viewport" },
        { name: "threshold", type: "number", default: 0.1, min: 0, max: 1, step: 0.05, description: "Viewport intersection ratio" }
      ];
    } else if (category === "exit") {
      dynamicProps = [
        { name: "duration", type: "number", default: 0.5, min: 0.1, max: 3, step: 0.1, description: "Animation duration in seconds" },
        { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Animation start delay" }
      ];
    } else if (category === "hover") {
      if (importName === "HoverTilt") {
        dynamicProps = [
          { name: "maxTilt", type: "number", default: 15, min: 5, max: 45, step: 1, description: "Maximum rotation angle in degrees" },
          { name: "scale", type: "number", default: 1.04, min: 0.9, max: 1.2, step: 0.01, description: "Scale multiplier on hover" }
        ];
      } else if (importName === "HoverUnderline") {
        dynamicProps = [
          { name: "color", type: "color", default: "#6366f1", description: "Underline line color" },
          { name: "height", type: "number", default: 2, min: 1, max: 6, step: 1, description: "Underline line thickness (px)" }
        ];
      } else if (importName === "HoverBorderExpand") {
        dynamicProps = [
          { name: "borderColor", type: "color", default: "#6366f1", description: "Glow outline color" },
          { name: "borderWidth", type: "number", default: 2, min: 1, max: 8, step: 1, description: "Outline border thickness (px)" }
        ];
      } else if (importName === "HoverGradientShift") {
        dynamicProps = [
          { name: "gradient", type: "string", default: "linear-gradient(135deg, #6366f1, #c084fc, #f472b6)", description: "Custom backing CSS gradient linear layout" }
        ];
      } else if (importName === "HoverSpotlight") {
        dynamicProps = [
          { name: "glowColor", type: "color", default: "rgba(99, 102, 241, 0.18)", description: "Radial cursor glow color overlay" },
          { name: "glowSize", type: "number", default: 150, min: 50, max: 300, step: 10, description: "Glow radius width size (px)" }
        ];
      } else if (importName === "HoverMagnetic") {
        dynamicProps = [
          { name: "strength", type: "number", default: 0.3, min: 0.1, max: 1, step: 0.05, description: "Magnet attraction multiplier" },
          { name: "range", type: "number", default: 100, min: 20, max: 300, step: 10, description: "Active distance range (px)" }
        ];
      } else if (importName === "HoverLift") {
        dynamicProps = [
          { name: "liftDistance", type: "number", default: -8, min: -30, max: 30, step: 1, description: "Y offset displacement in pixels" },
          { name: "duration", type: "number", default: 0.25, min: 0.1, max: 1, step: 0.05, description: "Transition length in seconds" }
        ];
      } else if (importName === "HoverScale") {
        dynamicProps = [
          { name: "scale", type: "number", default: 1.05, min: 0.8, max: 1.3, step: 0.01, description: "Scale multiplier on hover" },
          { name: "duration", type: "number", default: 0.2, min: 0.1, max: 1, step: 0.05, description: "Scale transition length" }
        ];
      } else {
        const scaleVal = importName === "HoverGrow" ? 1.12 : importName === "HoverShrink" ? 0.93 : 1.05;
        dynamicProps = [
          { name: "scale", type: "number", default: scaleVal, min: 0.8, max: 1.3, step: 0.01, description: "Scale multiplier on hover" }
        ];
      }
    } else if (category === "buttons") {
      if (importName === "NeonButton") {
        dynamicProps = [
          { name: "color", type: "color", default: "#00ffcc", description: "Neon outline glow color theme" },
          { name: "children", type: "string", default: "Cyber Action", description: "Label text" }
        ];
      } else if (importName === "LoadingButton") {
        dynamicProps = [
          { name: "isLoading", type: "boolean", default: true, description: "Displays loading indicator and disables actions" },
          { name: "children", type: "string", default: "Processing Tasks", description: "Button label text" }
        ];
      } else {
        dynamicProps = [
          { name: "children", type: "string", default: "Action Trigger", description: "Button label text" }
        ];
      }
    } else if (category === "text") {
      if (importName === "ScrambleText") {
        dynamicProps = [
          { name: "text", type: "string", default: "SECURE SYSTEM DECODED", description: "Final text to reveal" },
          { name: "speed", type: "number", default: 50, min: 10, max: 200, step: 5, description: "Scramble character interval speed (ms)" }
        ];
      } else if (importName === "TypewriterText") {
        dynamicProps = [
          { name: "text", type: "string", default: "Design is intelligence made visible.", description: "Typing text phrase" },
          { name: "speed", type: "number", default: 80, min: 20, max: 200, step: 10, description: "Typing speed interval (ms)" },
          { name: "delay", type: "number", default: 0, min: 0, max: 3, step: 0.1, description: "Delay before typing begins" },
          { name: "cursor", type: "boolean", default: true, description: "Show animated vertical indicator" }
        ];
      } else if (importName === "SplitText") {
        dynamicProps = [
          { name: "children", type: "string", default: "Staggered characters entrance reveal.", description: "Target string phrase" },
          { name: "duration", type: "number", default: 0.5, min: 0.1, max: 2, step: 0.1, description: "Animation duration in seconds" },
          { name: "stagger", type: "number", default: 0.03, min: 0.01, max: 0.2, step: 0.01, description: "Delay spacing between characters" }
        ];
      } else if (importName === "LetterReveal") {
        dynamicProps = [
          { name: "text", type: "string", default: "Framer Motion Letter Reveal", description: "Target text phrase" },
          { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Start delay" },
          { name: "stagger", type: "number", default: 0.04, min: 0.01, max: 0.2, step: 0.01, description: "Stagger delay between letters" }
        ];
      } else if (importName === "WordReveal") {
        dynamicProps = [
          { name: "text", type: "string", default: "Spring physics staggers word entrance animations.", description: "Target text phrase" },
          { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Start delay" },
          { name: "stagger", type: "number", default: 0.1, min: 0.02, max: 0.5, step: 0.02, description: "Stagger delay between words" }
        ];
      } else if (importName === "CharacterWave") {
        dynamicProps = [
          { name: "text", type: "string", default: "Hover your mouse over me to see characters wave!", description: "Target text phrase" }
        ];
      } else if (importName === "GradientText") {
        dynamicProps = [
          { name: "children", type: "string", default: "Beautiful Gradient Text", description: "Text label" },
          { name: "gradient", type: "string", default: "linear-gradient(90deg, #6366f1, #c084fc, #f472b6)", description: "Background CSS gradient configuration" }
        ];
      } else if (importName === "GlitchText") {
        dynamicProps = [
          { name: "children", type: "string", default: "CYBERPUNK GLITCH SYSTEM", description: "Target text" }
        ];
      } else if (importName === "NeonText") {
        dynamicProps = [
          { name: "children", type: "string", default: "NEON FLICKER NIGHT", description: "Neon text label" },
          { name: "color", type: "color", default: "#ff007f", description: "Shadow glow color backdrop" }
        ];
      } else if (importName === "BlurRevealText") {
        dynamicProps = [
          { name: "children", type: "string", default: "Slowly revealing from high blur values.", description: "Label text" },
          { name: "duration", type: "number", default: 0.8, min: 0.2, max: 3, step: 0.1, description: "Animation duration in seconds" },
          { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Start delay" }
        ];
      } else if (importName === "RotateText") {
        dynamicProps = [
          { name: "items", type: "select", default: "Fast,Modern,Physics-based,Apple-style", options: ["Fast,Modern,Physics-based,Apple-style", "Sleek,Vibrant,Micro-animations", "React,Motion,Springs,Parallax"], description: "Words list separated by comma" },
          { name: "delayInterval", type: "number", default: 2500, min: 800, max: 5000, step: 100, description: "Word cycle change interval (ms)" }
        ];
      } else if (importName === "InfiniteTicker" || importName === "MarqueeText") {
        dynamicProps = [
          { name: "text", type: "string", default: "AFK MOTION DESIGN SYSTEM IN ACTION •", description: "Scrolling text phrase" },
          { name: "speed", type: "number", default: 20, min: 5, max: 60, step: 1, description: "Duration length speed in seconds" }
        ];
      } else if (importName === "CountUpText") {
        dynamicProps = [
          { name: "from", type: "number", default: 0, min: 0, max: 1000, step: 10, description: "Number value start" },
          { name: "to", type: "number", default: 100, min: 10, max: 10000, step: 10, description: "Number value target limit" },
          { name: "duration", type: "number", default: 2, min: 0.5, max: 5, step: 0.1, description: "Trigger offset length in seconds" }
        ];
      } else if (importName === "NumberTicker") {
        dynamicProps = [
          { name: "value", type: "number", default: 1000, min: 0, max: 100000, step: 100, description: "Target counting number limit" }
        ];
      }
    } else if (category === "loading") {
      dynamicProps = [
        { name: "color", type: "color", default: "#6366f1", description: "Loader visual color highlight" }
      ];
      if (["PulseLoader", "Spinner", "OrbitLoader", "RingLoader", "CubeLoader"].includes(importName)) {
        dynamicProps.push({ name: "size", type: "number", default: 40, min: 20, max: 100, step: 5, description: "Diameter sizing in pixels" });
      } else if (importName === "SkeletonLoader") {
        dynamicProps = [
          { name: "width", type: "string", default: "100%", description: "Width boundary size (px or %)" },
          { name: "height", type: "number", default: 120, min: 20, max: 300, step: 10, description: "Height size in pixels" }
        ];
      } else if (importName === "ProgressLoader") {
        dynamicProps.push({ name: "progress", type: "number", default: 65, min: 0, max: 100, step: 1, description: "Completion ratio percentage" });
      }
    } else if (category === "scroll") {
      if (importName === "ScrollProgress") {
        dynamicProps = [
          { name: "color", type: "color", default: "#6366f1", description: "Line indicator background color" },
          { name: "height", type: "number", default: 4, min: 2, max: 16, step: 1, description: "Thickness height in pixels" }
        ];
      } else if (importName === "ScrollReveal") {
        dynamicProps = [
          { name: "duration", type: "number", default: 0.6, min: 0.1, max: 3, step: 0.1, description: "Transition reveal duration (seconds)" },
          { name: "delay", type: "number", default: 0, min: 0, max: 2, step: 0.1, description: "Transition delay" },
          { name: "yOffset", type: "number", default: 40, min: 0, max: 150, step: 5, description: "Vertical slide displacement (px)" }
        ];
      } else if (importName === "ScrollScale") {
        dynamicProps = [
          { name: "startScale", type: "number", default: 0.85, min: 0.5, max: 1, step: 0.05, description: "Minimum start scaling factor" },
          { name: "endScale", type: "number", default: 1.05, min: 1, max: 1.5, step: 0.05, description: "Maximum final scaling factor" }
        ];
      } else if (importName === "ScrollRotate") {
        dynamicProps = [
          { name: "maxRotation", type: "number", default: 45, min: 5, max: 180, step: 5, description: "Maximum angle rotation degrees" }
        ];
      } else if (importName === "ScrollParallax") {
        dynamicProps = [
          { name: "speed", type: "number", default: 100, min: -200, max: 200, step: 10, description: "Scroll translate multiplier factor" }
        ];
      } else if (importName === "ScrollBlur") {
        dynamicProps = [
          { name: "maxBlur", type: "number", default: 10, min: 1, max: 30, step: 1, description: "Maximum blur value in pixels" }
        ];
      } else if (importName === "ScrollPin") {
        dynamicProps = [
          { name: "top", type: "number", default: 20, min: 0, max: 200, step: 5, description: "Sticky container offset boundary (px)" }
        ];
      } else if (importName === "ScrollCounter") {
        dynamicProps = [
          { name: "from", type: "number", default: 0, min: 0, max: 100, step: 1, description: "Initial counter value" },
          { name: "to", type: "number", default: 100, min: 10, max: 10000, step: 50, description: "Target limit value" },
          { name: "duration", type: "number", default: 1.5, min: 0.5, max: 5, step: 0.1, description: "Trigger duration in seconds" }
        ];
      }
    } else if (category === "cards") {
      if (importName === "TiltCard") {
        dynamicProps = [
          { name: "maxTilt", type: "number", default: 12, min: 2, max: 30, step: 1, description: "Parallax rotation boundary degrees" },
          { name: "scale", type: "number", default: 1.05, min: 0.9, max: 1.2, step: 0.01, description: "Sizing transform scale factor" }
        ];
      } else if (importName === "FlipCard") {
        dynamicProps = [
          { name: "front", type: "string", default: "Card Front Side", description: "Title displayed on front Face" },
          { name: "back", type: "string", default: "Card Back Side", description: "Title displayed on back Face" }
        ];
      } else if (importName === "HoverCard") {
        dynamicProps = [
          { name: "title", type: "string", default: "Analytics Dashboard", description: "Card header title" },
          { name: "description", type: "string", default: "Real-time query metrics and charts.", description: "Card descriptions text" },
          { name: "badge", type: "string", default: "Analytics", description: "Fading indicator badge label" }
        ];
      } else if (importName === "GlowCard") {
        dynamicProps = [
          { name: "glowColor", type: "color", default: "rgba(99, 102, 241, 0.4)", description: "Hover outline glow shadow styling" }
        ];
      } else if (importName === "ExpandCard") {
        dynamicProps = [
          { name: "title", type: "string", default: "Sprints Milestones", description: "Header title" },
          { name: "description", type: "string", default: "Click card to expand detailed text.", description: "Header subtitle" },
          { name: "expandedContent", type: "string", default: "Details engineering timelines, tasks arrays, and releases.", description: "Content revealed on click" }
        ];
      } else if (importName === "MagneticCard") {
        dynamicProps = [
          { name: "range", type: "number", default: 50, min: 10, max: 200, step: 5, description: "Active grab area in pixels" },
          { name: "strength", type: "number", default: 0.25, min: 0.05, max: 1, step: 0.05, description: "Displacement strength ratio" }
        ];
      } else if (importName === "AnimatedProfileCard") {
        dynamicProps = [
          { name: "name", type: "string", default: "Jane Cooper", description: "Profile name header" },
          { name: "role", type: "string", default: "Creative Director", description: "Profile subtitle role" }
        ];
      } else if (importName === "ProductCard") {
        dynamicProps = [
          { name: "title", type: "string", default: "Premium Headphones", description: "Product catalog title" },
          { name: "price", type: "string", default: "$299", description: "Pricing text" },
          { name: "tag", type: "string", default: "Best Seller", description: "Top overlay visual badge label" }
        ];
      } else if (importName === "PricingCard") {
        dynamicProps = [
          { name: "plan", type: "string", default: "Professional", description: "SaaS package name" },
          { name: "price", type: "string", default: "$49", description: "Monthly rate pricing" },
          { name: "period", type: "string", default: "mo", description: "Billing frequency period" },
          { name: "isPopular", type: "boolean", default: true, description: "Applies featured glowing border styling" }
        ];
      }
    } else if (category === "navigation") {
      dynamicProps = [
        { name: "items", type: "select", default: "Home,Works,Contact", options: ["Home,Works,Contact", "Overview,Sprints,API,Docs", "Details,Settings"], description: "Menu buttons list separated by commas" }
      ];
    } else if (category === "backgrounds") {
      if (importName === "StarfieldBackground") {
        dynamicProps = [
          { name: "color", type: "color", default: "#ffffff", description: "Particle star elements color" },
          { name: "count", type: "number", default: 100, min: 20, max: 300, step: 10, description: "Quantity count of star elements" },
          { name: "speed", type: "number", default: 0.8, min: 0.1, max: 5, step: 0.1, description: "Space fly travel speed" }
        ];
      } else if (importName === "ParticleBackground" || importName === "SnowEffect" || importName === "RainEffect" || importName === "BubbleBackground" || importName === "FirefliesEffect") {
        dynamicProps = [
          { name: "color", type: "color", default: "#6366f1", description: "Canvas graphics color style" },
          { name: "count", type: "number", default: 60, min: 10, max: 200, step: 10, description: "Total quantity amount of shapes" }
        ];
      } else if (importName === "NoiseBackground") {
        dynamicProps = [
          { name: "opacity", type: "number", default: 0.022, min: 0.005, max: 0.1, step: 0.005, description: "Backing noise filter transparency alpha level" }
        ];
      } else if (importName === "AnimatedGradient") {
        dynamicProps = [
          { name: "gradient", type: "string", default: "linear-gradient(-45deg, #07070a, #1e1b4b, #111827, #311042)", description: "Dynamic color gradient string layout" }
        ];
      }
    } else if (category === "mouse") {
      if (importName === "SpotlightCursor") {
        dynamicProps = [
          { name: "size", type: "number", default: 250, min: 100, max: 600, step: 10, description: "Radial focus spotlight diameter size" },
          { name: "opacity", type: "number", default: 0.95, min: 0.5, max: 1, step: 0.02, description: "Outer dark overlay masking opacity level" }
        ];
      } else {
        dynamicProps = [
          { name: "color", type: "color", default: "#6366f1", description: "Follower cursor color theme" },
          { name: "size", type: "number", default: 30, min: 5, max: 150, step: 5, description: "Shape layout width height dimensions (px)" }
        ];
      }
    } else if (category === "modals") {
      if (importName === "ConfirmDialog") {
        dynamicProps = [
          { name: "title", type: "string", default: "Confirm Action", description: "Confirm dialog title" },
          { name: "message", type: "string", default: "Are you sure you want to perform this build deployment?", description: "Confirmation dialog body description" }
        ];
      } else if (importName === "FloatingAlert") {
        dynamicProps = [
          { name: "title", type: "string", default: "Backup Completed", description: "Alert header title" },
          { name: "message", type: "string", default: "Your portfolio configurations have been exported.", description: "Alert message text description" },
          { name: "type", type: "select", default: "success", options: ["info", "success", "warning", "error"], description: "Theme color type" }
        ];
      } else if (importName === "Snackbar") {
        dynamicProps = [
          { name: "message", type: "string", default: "Configuration saved successfully.", description: "Snackbar text message" },
          { name: "duration", type: "number", default: 3000, min: 1000, max: 8000, step: 500, description: "Display length time before autohide (ms)" }
        ];
      } else {
        dynamicProps = [
          { name: "message", type: "string", default: "Action successfully processed.", description: "Notification text label" }
        ];
      }
    } else if (category === "forms") {
      if (importName === "OTPInput") {
        dynamicProps = [
          { name: "length", type: "number", default: 4, min: 4, max: 6, step: 1, description: "Verification codes digit count" }
        ];
      } else if (importName === "FloatingLabelInput") {
        dynamicProps = [
          { name: "label", type: "string", default: "User Email Address", description: "Placeholder text floating label" },
          { name: "value", type: "string", default: "", description: "Active textbox value state" }
        ];
      } else if (importName === "SearchInput") {
        dynamicProps = [
          { name: "placeholder", type: "string", default: "Type search query...", description: "Empty state text prompt hint" }
        ];
      } else if (importName === "AutoCompleteInput") {
        dynamicProps = [
          { name: "suggestions", type: "select", default: "React,Framer Motion,Tailwind CSS,Vite,Next.js", options: ["React,Framer Motion,Tailwind CSS,Vite,Next.js", "Chrome Devtools,Gemini Agent,DeepMind"], description: "Dropdown values separated by commas" }
        ];
      } else if (importName === "ToggleSwitch") {
        dynamicProps = [
          { name: "isOn", type: "boolean", default: true, description: "Active toggle binary status" },
          { name: "label", type: "string", default: "Enable Dark Mode", description: "Fading text labels descriptions" }
        ];
      } else if (importName === "RangeSlider") {
        dynamicProps = [
          { name: "min", type: "number", default: 0, min: 0, max: 100, step: 1, description: "Lowest boundary range index" },
          { name: "max", type: "number", default: 100, min: 10, max: 500, step: 1, description: "Highest boundary range index" },
          { name: "value", type: "number", default: 50, min: 0, max: 100, step: 1, description: "Current pointer slider value" }
        ];
      }
    } else if (category === "3d") {
      dynamicProps = [
        { name: "size", type: "number", default: 100, min: 40, max: 300, step: 10, description: "Main coordinate scaling dimensions (px)" }
      ];
    } else if (category === "dashboard") {
      if (importName === "ProgressRing") {
        dynamicProps = [
          { name: "progress", type: "number", default: 75, min: 0, max: 100, step: 5, description: "Graph percentage progression" },
          { name: "size", type: "number", default: 60, min: 30, max: 150, step: 5, description: "SVG viewport layout diameter width (px)" },
          { name: "strokeWidth", type: "number", default: 5, min: 2, max: 15, step: 1, description: "SVG path circular thickness" },
          { name: "color", type: "color", default: "#6366f1", description: "SVG progress trace color styling" }
        ];
      } else if (importName === "KPIWidget") {
        dynamicProps = [
          { name: "title", type: "string", default: "Monthly Active Users", description: "Header metric title" },
          { name: "value", type: "string", default: "14,892", description: "Metric counter value string" },
          { name: "change", type: "string", default: "+12.4%", description: "Comparison percentage text" },
          { name: "isPositive", type: "boolean", default: true, description: "Applies green positive rise indicator styling" }
        ];
      }
    } else if (category === "advanced") {
      dynamicProps = [
        { name: "title", type: "string", default: "Build Output Console", description: "Widget header label" }
      ];
    } else if (category === "ai") {
      if (importName === "PromptInput") {
        dynamicProps = [
          { name: "placeholder", type: "string", default: "Ask the AI Assistant...", description: "Empty prompt text cue" }
        ];
      } else if (importName === "TokenCounter") {
        dynamicProps = [
          { name: "value", type: "number", default: 148, min: 0, max: 5000, step: 5, description: "Current count indicator value" }
        ];
      } else if (importName === "StreamingText") {
        dynamicProps = [
          { name: "text", type: "string", default: "Welcome to the AI interaction suite. Real-time words loading...", description: "Target streaming phrase" },
          { name: "speed", type: "number", default: 50, min: 10, max: 200, step: 5, description: "Streaming text velocity interval (ms)" }
        ];
      } else if (importName === "AIChatBubble") {
        dynamicProps = [
          { name: "text", type: "string", default: "Hello! I am Gemini. How can I help you design interactions today?", description: "Chat content phrase text" },
          { name: "sender", type: "select", default: "ai", options: ["ai", "user"], description: "Bubble sender styling type" }
        ];
      }
    }

    if (dynamicProps.length === 0) {
      dynamicProps = [
        { name: "style", type: "text", default: "{}", description: "Custom inline CSS styles object" }
      ];
    }
  }

  return {
    name,
    importName,
    category,
    description: existing?.description || `Highly customizable interaction block: ${importName}. Powered by spring physics and layouts.`,
    tags: existing?.tags || [category, "afk-motion"],
    props: dynamicProps,
    usageCode: existing?.usageCode || ((props) => {
      const propStrings = Object.entries(props)
        .filter(([key]) => key !== "children" && key !== "style")
        .map(([key, value]) => {
          if (typeof value === "string") return `${key}="${value}"`;
          if (typeof value === "boolean") return `${key}={${value}}`;
          if (Array.isArray(value)) return `${key}={${JSON.stringify(value)}}`;
          if (typeof value === "object") return `${key}={${JSON.stringify(value)}}`;
          return `${key}={${value}}`;
        })
        .join(" ");
      const spacing = propStrings ? " " : "";

      const isVoid = ["OTPInput", "FloatingLabelInput", "SearchInput", "AutoCompleteInput", "ToggleSwitch", "RangeSlider",
                      "PulseLoader", "Spinner", "OrbitLoader", "RingLoader", "CubeLoader", "SkeletonLoader", "ProgressLoader", "BarLoader", "DNALoader", "MatrixLoader", "TerminalLoader",
                      "CustomCursor", "CursorFollower", "CursorTrail", "MagneticCursor", "SpotlightCursor", "CursorGlowFollower", "CursorRipple", "CursorParticles",
                      "StarfieldBackground", "ParticleBackground", "SnowEffect", "RainEffect", "BubbleBackground", "FirefliesEffect", "NoiseBackground", "AnimatedGradient", "MeshGradient", "AuroraBackground",
                      "ProgressRing", "CircularProgress", "KPIWidget", "DashboardLoader", "AnimatedStatsCard", "CounterCard", "ActivityFeed", "AnimatedChartWrapper",
                      "ThreeDCube", "ThreeDCarousel", "ThreeDRotatingGallery", "ThreeDProductShowcase",
                      "RotateText", "InfiniteTicker", "MarqueeText", "CountUpText", "NumberTicker", "TypewriterText", "LetterReveal", "WordReveal", "CharacterWave",
                      "StreamingText", "ThinkingIndicator", "AIResponseCard", "AIChatBubble", "TokenCounter", "ConversationTimeline", "InteractiveTimeline"
                     ].includes(importName);
      if (!isVoid) {
        return `import { ${importName} } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <${importName}${spacing}${propStrings}>\n      <div style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>\n        ${name} Content\n      </div>\n    </${importName}>\n  );\n}`;
      } else {
        return `import { ${importName} } from "@hemanath-afk/afk-motion";\n\nexport default function Example() {\n  return (\n    <${importName}${spacing}${propStrings} />\n  );\n}`;
      }
    }),
    advancedCode: existing?.advancedCode || `import { ${importName} } from "@hemanath-afk/afk-motion";\n\nexport function AdvancedView() {\n  return (\n    <${importName} style={{ transform: "translateY(5px)" }}>\n      <CustomWidget />\n    </${importName}>\n  );\n}`,
    accessibilityNotes: existing?.accessibilityNotes || "Uses standard HTML semantic wrappers. Compatible with screen-reader overlays.",
    performanceNotes: existing?.performanceNotes || "Uses layout optimization hooks to avoid excessive repaint operations.",
    browserSupport: existing?.browserSupport || "Fully compatible with all HTML5-compliant rendering engines."
  };
}
