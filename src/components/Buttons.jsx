import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Base styles for clean dark themed buttons
const baseStyles = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  padding: "12px 24px",
  fontSize: "0.95rem",
  fontWeight: 600,
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "#0f0f16",
  color: "#ffffff",
  cursor: "pointer",
  outline: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "all 0.2s ease"
};

// 1. AnimatedButton
export const AnimatedButton = ({ children, style, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}
    whileTap={{ scale: 0.96 }}
    style={{ ...baseStyles, ...style }}
    {...props}
  >
    {children}
  </motion.button>
);

// 2. RippleButton
export const RippleButton = ({ children, style, ...props }) => {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <button
      ref={btnRef}
      onMouseDown={handleClick}
      style={{
        ...baseStyles,
        position: "relative",
        overflow: "hidden",
        ...style
      }}
      {...props}
    >
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: "8px",
            height: "8px",
            background: "rgba(255,255,255,0.18)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "afk-ripple 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
            pointerEvents: "none",
            zIndex: 1
          }}
        />
      ))}
      <style>{`
        @keyframes afk-ripple {
          0% { width: 0; height: 0; opacity: 0.8; }
          100% { width: 300px; height: 300px; opacity: 0; }
        }
      `}</style>
    </button>
  );
};

// 4. GlowButton
export const GlowButton = ({ children, glowColor = "rgba(99, 102, 241, 0.5)", style, ...props }) => (
  <motion.button
    whileHover={{
      boxShadow: `0 0 20px 4px ${glowColor}`,
      borderColor: "rgba(99, 102, 241, 0.4)",
      scale: 1.02
    }}
    whileTap={{ scale: 0.98 }}
    style={{ ...baseStyles, ...style }}
    {...props}
  >
    {children}
  </motion.button>
);

// 5. NeonButton
export const NeonButton = ({ children, color = "#00ffcc", style, ...props }) => (
  <motion.button
    whileHover={{
      borderColor: color,
      boxShadow: `0 0 10px ${color}, inset 0 0 5px ${color}`,
      textShadow: `0 0 5px ${color}`
    }}
    whileTap={{ scale: 0.97 }}
    style={{
      ...baseStyles,
      borderColor: "rgba(255,255,255,0.15)",
      background: "#08080c",
      color: "#ffffff",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      ...style
    }}
    {...props}
  >
    {children}
  </motion.button>
);

// 6. LiquidButton
export const LiquidButton = ({ children, style, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      style={{
        ...baseStyles,
        position: "relative",
        background: "transparent",
        border: "none",
        padding: "14px 28px",
        overflow: "hidden",
        ...style
      }}
      {...props}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1
        }}
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
      >
        <motion.path
          animate={{
            d: hovered
              ? "M 0 0 C 30 5, 90 5, 120 0 C 120 0, 120 40, 120 40 C 90 35, 30 35, 0 40 Z"
              : "M 0 0 C 30 0, 90 0, 120 0 C 120 0, 120 40, 120 40 C 90 40, 30 40, 0 40 Z"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          fill="#6366f1"
        />
      </svg>
      <span style={{ position: "relative", zIndex: 2, color: "#fff" }}>{children}</span>
    </motion.button>
  );
};

// 7. MorphButton
export const MorphButton = ({ children, activeChildren, isMorph = false, style, ...props }) => (
  <motion.button
    layout
    style={{
      ...baseStyles,
      borderRadius: isMorph ? "30px" : "12px",
      padding: isMorph ? "12px 18px" : "12px 24px",
      background: isMorph ? "#c084fc" : "#0f0f16",
      color: isMorph ? "#07070a" : "#fff",
      ...style
    }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    <motion.span layout="position">
      {isMorph ? activeChildren : children}
    </motion.span>
  </motion.button>
);

// 8. LoadingButton
export const LoadingButton = ({ children, isLoading = false, style, ...props }) => (
  <motion.button
    disabled={isLoading}
    whileTap={isLoading ? {} : { scale: 0.97 }}
    style={{
      ...baseStyles,
      opacity: isLoading ? 0.75 : 1,
      pointerEvents: isLoading ? "none" : "auto",
      ...style
    }}
    {...props}
  >
    {isLoading && (
      <svg
        style={{
          animation: "afk-loading-rotate 1s linear infinite",
          width: "16px",
          height: "16px",
          marginRight: "6px"
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" />
      </svg>
    )}
    <span>{children}</span>
    <style>{`
      @keyframes afk-loading-rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </motion.button>
);

// 9. SuccessButton
export const SuccessButton = ({ children, isSuccess = false, style, ...props }) => (
  <motion.button
    layout
    whileTap={{ scale: 0.96 }}
    style={{
      ...baseStyles,
      background: isSuccess ? "#10b981" : "#0f0f16",
      borderColor: isSuccess ? "#10b981" : "rgba(255, 255, 255, 0.1)",
      color: "#ffffff",
      borderRadius: isSuccess ? "25px" : "12px",
      ...style
    }}
    {...props}
  >
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.span
          key="success"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Success
        </motion.span>
      ) : (
        <motion.span
          key="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);

// 10. ProgressButton
export const ProgressButton = ({ children, progress = 0, style, ...props }) => (
  <button
    style={{
      ...baseStyles,
      position: "relative",
      overflow: "hidden",
      ...style
    }}
    {...props}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: `${progress}%`,
        backgroundColor: "rgba(99, 102, 241, 0.25)",
        transition: "width 0.3s ease",
        zIndex: 1
      }}
    />
    <span style={{ position: "relative", zIndex: 2 }}>
      {children} {progress > 0 && `${progress}%`}
    </span>
  </button>
);

// 11. GradientButton
export const GradientButton = ({ children, style, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    style={{
      ...baseStyles,
      background: "linear-gradient(45deg, #6366f1, #c084fc, #f472b6)",
      backgroundSize: "200% 200%",
      border: "none",
      animation: "afk-gradient-shift 4s ease infinite",
      color: "#fff",
      boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
      ...style
    }}
    {...props}
  >
    {children}
    <style>{`
      @keyframes afk-gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
  </motion.button>
);

// 12. ShinyButton
export const ShinyButton = ({ children, style, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    style={{
      ...baseStyles,
      position: "relative",
      overflow: "hidden",
      ...style
    }}
    {...props}
  >
    <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
    <span
      style={{
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "50%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        transform: "skewX(-25deg)",
        animation: "afk-shimmer 2.2s infinite",
        zIndex: 1
      }}
    />
    <style>{`
      @keyframes afk-shimmer {
        0% { left: -100%; }
        100% { left: 200%; }
      }
    `}</style>
  </motion.button>
);

// 13. PulseButton
export const PulseButton = ({ children, color = "rgba(99, 102, 241, 0.4)", style, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    style={{
      ...baseStyles,
      position: "relative",
      boxShadow: `0 0 0 0 ${color}`,
      animation: "afk-pulse-glow 1.8s infinite",
      ...style
    }}
    {...props}
  >
    {children}
    <style>{`
      @keyframes afk-pulse-glow {
        0% { box-shadow: 0 0 0 0 ${color}; }
        70% { box-shadow: 0 0 0 12px rgba(99, 102, 241, 0); }
        100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
      }
    `}</style>
  </motion.button>
);

// 14. BounceButton
export const BounceButton = ({ children, style, ...props }) => (
  <motion.button
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.9, y: 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 8 }}
    style={{ ...baseStyles, ...style }}
    {...props}
  >
    {children}
  </motion.button>
);
