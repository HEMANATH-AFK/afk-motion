import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "./BackgroundEffects";

// 1. HeroReveal (Responsive with defaults)
export const HeroReveal = ({ 
  title = "Designing Interactions", 
  subtitle = "High performance physics-based motion blocks.", 
  cta, 
  titleSize = "2.8rem", 
  subtitleSize = "1.05rem", 
  style, 
  ...props 
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "800px", textAlign: "left", ...style }} {...props}>
    <div style={{ overflow: "hidden" }}>
      <motion.h1
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: titleSize, margin: 0, fontWeight: 900, lineHeight: 1.15, color: "#fff" }}
      >
        {title}
      </motion.h1>
    </div>
    <div style={{ overflow: "hidden" }}>
      <motion.p
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ color: "#94a3b8", fontSize: subtitleSize, margin: 0, lineHeight: 1.5 }}
      >
        {subtitle}
      </motion.p>
    </div>
    {cta && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ marginTop: "8px" }}
      >
        {cta}
      </motion.div>
    )}
  </div>
);

// 2. HeroParticles
export const HeroParticles = ({ children, style, ...props }) => (
  <div style={{ position: "relative", padding: "60px 20px", overflow: "hidden", width: "100%", borderRadius: "16px", background: "#07070a", border: "1px solid rgba(255,255,255,0.05)", ...style }} {...props}>
    <ParticleBackground count={35} style={{ position: "absolute", inset: 0, zIndex: 1 }} />
    <div style={{ position: "relative", zIndex: 2, width: "100%" }}>{children}</div>
  </div>
);

// 3. HeroParallax (Configurable height and container ref support)
export const HeroParallax = ({ 
  children, 
  backgroundLayer = <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1e1b4b, #311042)" }} />, 
  container, 
  height = "320px", 
  style, 
  ...props 
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ container });
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div ref={ref} style={{ position: "relative", height, width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px", ...style }} {...props}>
      <motion.div style={{ position: "absolute", inset: 0, y: bgY, zIndex: 1 }}>
        {backgroundLayer}
      </motion.div>
      <motion.div style={{ position: "relative", zIndex: 2, y: textY, width: "100%" }}>
        {children}
      </motion.div>
    </div>
  );
};

// 4. HeroTyping (Typewriter sequential reveal)
export const HeroTyping = ({ text = "Typewriter Hero Heading", speed = 0.06, style, ...props }) => {
  const letters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speed
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.h1 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ fontSize: "2.4rem", fontWeight: 800, color: "#fff", margin: 0, ...style }} 
      {...props}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ color: "#6366f1", marginLeft: "2px" }}
      >
        |
      </motion.span>
    </motion.h1>
  );
};

// 5. HeroSpotlight (Relative coordinates math fix)
export const HeroSpotlight = ({ children, style, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "300px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07070a",
        overflow: "hidden",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        ...style
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99,102,241,0.12) 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>{children}</div>
    </div>
  );
};

// 6. HeroVideoBackground (Abstract background defaults)
export const HeroVideoBackground = ({ 
  videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-glow-39748-large.mp4", 
  children, 
  style, 
  ...props 
}) => (
  <div style={{ position: "relative", height: "320px", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "16px", ...style }} {...props}>
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,7,10,0.4), rgba(7,7,10,0.85)), radial-gradient(circle at center, transparent 30%, #07070a 95%)", zIndex: 2 }} />
    <div style={{ position: "relative", zIndex: 3, width: "100%" }}>{children}</div>
  </div>
);

// 7. HeroCarousel (Safety check & clean navigation buttons)
export const HeroCarousel = ({ 
  slides = [
    <div key={1} style={{ padding: "40px" }}><h2>Sleek Spring Physics</h2><p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px" }}>Experience responsive motion paths</p></div>,
    <div key={2} style={{ padding: "40px" }}><h2>Premium Layouts</h2><p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px" }}>Designed for professional modern portfolios</p></div>,
    <div key={3} style={{ padding: "40px" }}><h2>Cyberpunk Aesthetics</h2><p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px" }}>Vibrant gradients and dynamic cursors</p></div>
  ], 
  style, 
  ...props 
}) => {
  const [active, setActive] = useState(0);

  const next = () => {
    if (slides.length === 0) return;
    setActive((prev) => (prev + 1) % slides.length);
  };
  const prev = () => {
    if (slides.length === 0) return;
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return <div style={{ color: "#64748b", padding: "20px" }}>No slides provided</div>;
  }

  return (
    <div style={{ position: "relative", height: "300px", width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", ...style }} {...props}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ position: "absolute", textAlign: "center", width: "80%" }}
        >
          {slides[active]}
        </motion.div>
      </AnimatePresence>
      <button onClick={prev} style={{ position: "absolute", left: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", width: "40px", height: "40px", color: "#fff", fontSize: "1.2rem", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>&lsaquo;</button>
      <button onClick={next} style={{ position: "absolute", right: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", width: "40px", height: "40px", color: "#fff", fontSize: "1.2rem", cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>&rsaquo;</button>
    </div>
  );
};

// 8. HeroSplitReveal
export const HeroSplitReveal = ({ 
  leftContent = <div style={{ textAlign: "left", padding: "20px" }}><h3 style={{ margin: 0, color: "#fff" }}>Creative UI</h3><p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "6px" }}>Focused micro-interactions</p></div>, 
  rightContent = <div style={{ textAlign: "left", padding: "20px" }}><h3 style={{ margin: 0, color: "#fff" }}>Physics Engine</h3><p style={{ color: "#a5b4fc", fontSize: "0.85rem", marginTop: "6px" }}>Custom mechanical spring setups</p></div>, 
  style, 
  ...props 
}) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "300px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", ...style }} {...props}>
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c14", padding: "20px" }}
    >
      {leftContent}
    </motion.div>
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1e1b4b", padding: "20px" }}
    >
      {rightContent}
    </motion.div>
  </div>
);
