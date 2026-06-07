import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "./BackgroundEffects";

// 1. HeroReveal
export const HeroReveal = ({ title, subtitle, cta, style, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px", ...style }} {...props}>
    <div style={{ overflow: "hidden" }}>
      <motion.h1
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: "4rem", margin: 0, fontWeight: 900, lineHeight: 1.1 }}
      >
        {title}
      </motion.h1>
    </div>
    <div style={{ overflow: "hidden" }}>
      <motion.p
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ color: "#94a3b8", fontSize: "1.2rem", margin: 0 }}
      >
        {subtitle}
      </motion.p>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {cta}
    </motion.div>
  </div>
);

// 2. HeroParticles
export const HeroParticles = ({ children, style, ...props }) => (
  <div style={{ position: "relative", padding: "80px 20px", overflow: "hidden", ...style }} {...props}>
    <ParticleBackground count={40} style={{ position: "absolute", inset: 0, zIndex: 1 }} />
    <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
  </div>
);

// 3. HeroParallax
export const HeroParallax = ({ children, backgroundLayer, style, ...props }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div ref={ref} style={{ position: "relative", height: "80vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...style }} {...props}>
      <motion.div style={{ position: "absolute", inset: 0, y: bgY, zIndex: 1 }}>
        {backgroundLayer}
      </motion.div>
      <motion.div style={{ position: "relative", zIndex: 2, y: textY }}>
        {children}
      </motion.div>
    </div>
  );
};

// 4. HeroTyping
export const HeroTyping = ({ text, style, ...props }) => {
  const letters = text.split("");
  return (
    <h1 style={{ fontSize: "3.5rem", fontWeight: 800, ...style }} {...props}>
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            delay: index * 0.1
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
};

// 5. HeroSpotlight
export const HeroSpotlight = ({ children, style, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07070a",
        overflow: "hidden",
        ...style
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(99,102,241,0.08) 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};

// 6. HeroVideoBackground
export const HeroVideoBackground = ({ videoSrc, children, style, ...props }) => (
  <div style={{ position: "relative", height: "70vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...style }} {...props}>
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(7,7,10,0.7)", zIndex: 2 }} />
    <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
  </div>
);

// 7. HeroCarousel
export const HeroCarousel = ({ slides = [], style, ...props }) => {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % slides.length);
  const prev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div style={{ position: "relative", height: "400px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", ...style }} {...props}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", textAlign: "center" }}
        >
          {slides[active]}
        </motion.div>
      </AnimatePresence>
      <button onClick={prev} style={{ position: "absolute", left: "20px", background: "none", border: "none", color: "#fff", fontSize: "2rem", cursor: "pointer", zIndex: 10 }}>&lsaquo;</button>
      <button onClick={next} style={{ position: "absolute", right: "20px", background: "none", border: "none", color: "#fff", fontSize: "2rem", cursor: "pointer", zIndex: 10 }}>&rsaquo;</button>
    </div>
  );
};

// 8. HeroSplitReveal
export const HeroSplitReveal = ({ leftContent, rightContent, style, ...props }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "80vh", overflow: "hidden", ...style }} {...props}>
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c14", padding: "40px" }}
    >
      {leftContent}
    </motion.div>
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1e1b4b", padding: "40px" }}
    >
      {rightContent}
    </motion.div>
  </div>
);
