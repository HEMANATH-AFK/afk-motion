import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Helper to track mouse position globally
const useGlobalMouse = () => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  useEffect(() => {
    const handleMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouse.x, mouse.y]);

  return mouse;
};

// 1. CustomCursor
export const CustomCursor = ({ size = 8, color = "#6366f1", ...props }) => {
  const { x, y } = useGlobalMouse();
  const springX = useSpring(x, { stiffness: 1000, damping: 50 });
  const springY = useSpring(y, { stiffness: 1000, damping: 50 });

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 99999,
        x: springX,
        y: springY
      }}
      {...props}
    />
  );
};

// 2. CursorFollower (Dot + delayed ring)
export const CursorFollower = ({ color = "#6366f1", size = 30, ...props }) => {
  const { x, y } = useGlobalMouse();
  const dotX = useSpring(x, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 50 });
  const ringX = useSpring(x, { stiffness: 220, damping: 25 });
  const ringY = useSpring(y, { stiffness: 220, damping: 25 });

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          x: dotX,
          y: dotY
        }}
      />
      {/* Outer Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: size,
          height: size,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          x: ringX,
          y: ringY
        }}
        {...props}
      />
    </>
  );
};

const TrailPoint = ({ x, y, i, count, color, ...props }) => {
  const scale = 1 - i * (1 / count);
  const springX = useSpring(x, { stiffness: 300 - i * 30, damping: 25 + i * 2 });
  const springY = useSpring(y, { stiffness: 300 - i * 30, damping: 25 + i * 2 });

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: 0.6 * scale,
        pointerEvents: "none",
        zIndex: 99999 - i,
        transform: `translate(-50%, -50%) scale(${scale})`,
        x: springX,
        y: springY
      }}
      {...props}
    />
  );
};

// 3. CursorTrail
export const CursorTrail = ({ color = "#6366f1", count = 6, ...props }) => {
  const { x, y } = useGlobalMouse();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <TrailPoint
          key={i}
          x={x}
          y={y}
          i={i}
          count={count}
          color={color}
          {...props}
        />
      ))}
    </>
  );
};

// 4. MagneticCursor (Snaps to hovered interactive elements containing class 'magnetic-target')
export const MagneticCursor = ({ size = 20, color = "#6366f1", ...props }) => {
  const { x, y } = useGlobalMouse();
  const [activeEl, setActiveEl] = useState(null);
  const scale = useSpring(1, { stiffness: 350, damping: 20 });

  useEffect(() => {
    const handleOver = (e) => {
      const target = e.target.closest(".magnetic-target");
      if (target) {
        setActiveEl(target);
        scale.set(2.2);
      }
    };
    const handleOut = (e) => {
      const target = e.target.closest(".magnetic-target");
      if (target) {
        setActiveEl(null);
        scale.set(1);
      }
    };
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [scale]);

  const targetX = useSpring(x, { stiffness: 400, damping: 28 });
  const targetY = useSpring(y, { stiffness: 400, damping: 28 });

  useEffect(() => {
    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      x.set(rect.left + rect.width / 2);
      y.set(rect.top + rect.height / 2);
    }
  }, [activeEl, x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        backgroundColor: activeEl ? "rgba(99, 102, 241, 0.15)" : "transparent",
        pointerEvents: "none",
        zIndex: 99999,
        transform: "translate(-50%, -50%)",
        x: targetX,
        y: targetY,
        scale
      }}
      {...props}
    />
  );
};

// 5. SpotlightCursor (Fullscreen dark overlay with hole at cursor)
export const SpotlightCursor = ({ size = 250, opacity = 0.95, ...props }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
        background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, transparent 100%, rgba(7,7,10,${opacity}) 100%)`
      }}
      {...props}
    />
  );
};

// 6. CursorGlowFollower (Pulsating glow following cursor)
export const CursorGlowFollower = ({ color = "rgba(99, 102, 241, 0.25)", size = 180, ...props }) => {
  const { x, y } = useGlobalMouse();
  const glowX = useSpring(x, { stiffness: 120, damping: 25 });
  const glowY = useSpring(y, { stiffness: 120, damping: 25 });

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 9998,
        transform: "translate(-50%, -50%)",
        x: glowX,
        y: glowY
      }}
      {...props}
    />
  );
};

// 7. CursorRipple (Emits rings on clicks)
export const CursorRipple = ({ color = "#6366f1", ...props }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }} {...props}>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: "8px",
            height: "8px",
            border: `2px solid ${color}`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "afk-cursor-ripple 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards"
          }}
        />
      ))}
      <style>{`
        @keyframes afk-cursor-ripple {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 120px; height: 120px; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// 8. CursorParticles (Sparks fly on click)
export const CursorParticles = ({ color = "#6366f1", ...props }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      const sparks = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const speed = Math.random() * 3 + 2;
        return {
          id: `${Date.now()}-${i}`,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed
        };
      });
      setParticles((prev) => [...prev, ...sparks]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !sparks.find((s) => s.id === p.id)));
      }, 600);
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    let frame;
    const update = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1 // gravity
        }))
      );
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }} {...props}>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: "4px",
            height: "4px",
            backgroundColor: color,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 4px ${color}`
          }}
        />
      ))}
    </div>
  );
};
