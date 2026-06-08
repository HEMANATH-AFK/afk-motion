import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTilt } from "../hooks/useTilt";

// 1. ThreeDTilt
export const ThreeDTilt = ({ children, maxTilt = 15, scale = 1.05, style, ...props }) => {
  const ref = useRef(null);
  const tilt = useTilt(ref, { maxTilt, scale });
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const update = () => {
      setStyles({
        transform: `perspective(${tilt.perspective}px) rotateX(${tilt.rotateX.get()}deg) rotateY(${tilt.rotateY.get()}deg) scale(${tilt.scale.get()})`,
        transition: "transform 0.08s ease-out"
      });
    };
    const cleanups = [tilt.rotateX.onChange(update), tilt.rotateY.onChange(update), tilt.scale.onChange(update)];
    return () => cleanups.forEach((c) => c());
  }, [tilt]);

  return (
    <div ref={ref} style={{ display: "inline-block", willChange: "transform", ...style, ...styles }} {...props}>
      {children}
    </div>
  );
};

// 2. ThreeDFlip
export const ThreeDFlip = ({ front, back, style, ...props }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: 1000, width: "220px", height: "140px", cursor: "pointer", ...style }}
      {...props}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d"
        }}
      >
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {front}
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "#6366f1" }}>
          {back}
        </div>
      </motion.div>
    </div>
  );
};

// 3. ThreeDCube (A rotating 3D box)
export const ThreeDCube = ({ size = 100, style, ...props }) => (
  <div style={{ width: size, height: size, perspective: "800px", display: "inline-block", ...style }} {...props}>
    <motion.div
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Front */}
      <div style={{ position: "absolute", width: size, height: size, background: "rgba(99,102,241,0.6)", border: "1px solid #fff", transform: `translateZ(${size / 2}px)` }} />
      {/* Back */}
      <div style={{ position: "absolute", width: size, height: size, background: "rgba(192,132,252,0.6)", border: "1px solid #fff", transform: `rotateY(180deg) translateZ(${size / 2}px)` }} />
      {/* Left */}
      <div style={{ position: "absolute", width: size, height: size, background: "rgba(244,63,94,0.6)", border: "1px solid #fff", transform: `rotateY(-90deg) translateZ(${size / 2}px)` }} />
      {/* Right */}
      <div style={{ position: "absolute", width: size, height: size, background: "rgba(16,185,129,0.6)", border: "1px solid #fff", transform: `rotateY(90deg) translateZ(${size / 2}px)` }} />
      {/* Top */}
      <div style={{ position: "absolute", width: size, height: size, background: "rgba(245,158,11,0.6)", border: "1px solid #fff", transform: `rotateX(90deg) translateZ(${size / 2}px)` }} />
      {/* Bottom */}
      <div style={{ position: "absolute", width: size, height: size, background: "rgba(100,116,139,0.6)", border: "1px solid #fff", transform: `rotateX(-90deg) translateZ(${size / 2}px)` }} />
    </motion.div>
  </div>
);

// 4. ThreeDStackCards
export const ThreeDStackCards = ({ cards = [
  <div key={1} style={{ color: "#fff", display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>Card Item 1</div>,
  <div key={2} style={{ color: "#fff", display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>Card Item 2</div>,
  <div key={3} style={{ color: "#fff", display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>Card Item 3</div>
], style, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", width: "200px", height: "260px", display: "inline-block", ...style }}
      {...props}
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          animate={{
            y: hovered ? idx * -30 : idx * -10,
            z: hovered ? idx * 20 : idx * 5,
            scale: 1 - idx * 0.05,
            rotate: hovered ? idx * 2 : 0
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(15,15,22,0.95)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            zIndex: 10 - idx,
            transformStyle: "preserve-3d"
          }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
};

// 5. ThreeDCarousel & ThreeDRotatingGallery
export const ThreeDCarousel = ({ items = [
  <span key={1}>Item 1</span>,
  <span key={2}>Item 2</span>,
  <span key={3}>Item 3</span>,
  <span key={4}>Item 4</span>,
  <span key={5}>Item 5</span>,
  <span key={6}>Item 6</span>
], style, ...props }) => {
  const [angle, setAngle] = useState(0);
  const next = () => setAngle((a) => a - 60);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...style }} {...props}>
      <div style={{ width: "200px", height: "150px", perspective: "800px", position: "relative", margin: "40px 0" }}>
        <motion.div
          animate={{ rotateY: angle }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            position: "absolute"
          }}
        >
          {items.slice(0, 6).map((item, idx) => {
            const rotY = idx * 60;
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: `rotateY(${rotY}deg) translateZ(160px)`,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                {item}
              </div>
            );
          })}
        </motion.div>
      </div>
      <button onClick={next} style={{ padding: "8px 16px", background: "#6366f1", border: "none", color: "#fff", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>Rotate</button>
    </div>
  );
};

export const ThreeDRotatingGallery = ThreeDCarousel;

// 6. ThreeDProductShowcase (Layered exploded view)
export const ThreeDProductShowcase = ({ title = "Product Explorer", layers = [
  <div key={1} style={{ width: "100px", height: "100px", borderRadius: "12px", background: "rgba(99, 102, 241, 0.35)", border: "1px solid rgba(99, 102, 241, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>Base Layer</div>,
  <div key={2} style={{ width: "80px", height: "80px", borderRadius: "10px", background: "rgba(192, 132, 252, 0.35)", border: "1px solid rgba(192, 132, 252, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>Core Chip</div>,
  <div key={3} style={{ width: "60px", height: "60px", borderRadius: "8px", background: "rgba(244, 63, 94, 0.35)", border: "1px solid rgba(244, 63, 94, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>Heatsink</div>
], style, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "240px",
        height: "300px",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        ...style
      }}
      {...props}
    >
      <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#fff" }}>{title}</h4>
      <div 
        style={{ 
          position: "relative", 
          height: "160px", 
          transformStyle: "preserve-3d", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          transform: "rotateX(60deg) rotateZ(-45deg)",
          transition: "transform 0.4s ease-out"
        }}
      >
        {layers.map((layer, idx) => (
          <motion.div
            key={idx}
            animate={{
              z: hovered ? idx * 45 : idx * 12,
              opacity: hovered ? 1 - idx * 0.15 : 0.8
            }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            style={{
              position: "absolute",
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformStyle: "preserve-3d"
            }}
          >
            {layer}
          </motion.div>
        ))}
      </div>
      <div style={{ fontSize: "0.8rem", color: "#64748b", textAlign: "center" }}>
        Hover to explode layers in 3D
      </div>
    </div>
  );
};
