import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 1. Spinner
export const Spinner = ({ size = 40, color = "#6366f1", ...props }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: "3px solid rgba(255,255,255,0.05)",
      borderTopColor: color,
      display: "inline-block"
    }}
    {...props}
  />
);

// 2. PulseLoader
export const PulseLoader = ({ size = 40, color = "#6366f1", ...props }) => (
  <div style={{ position: "relative", width: size, height: size, display: "inline-block" }} {...props}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          delay: i * 0.4,
          ease: "easeOut"
        }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: color
        }}
      />
    ))}
  </div>
);

// 3. DotLoader
export const DotLoader = ({ color = "#6366f1", size = 10, ...props }) => (
  <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }} {...props}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
          delay: i * 0.15,
          ease: "easeInOut"
        }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color
        }}
      />
    ))}
  </div>
);

// 4. WaveLoader
export const WaveLoader = ({ color = "#6366f1", height = 30, ...props }) => (
  <div style={{ display: "inline-flex", gap: "4px", alignItems: "flex-end", height }} {...props}>
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        animate={{ height: ["20%", "100%", "20%"] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          delay: i * 0.15,
          ease: "easeInOut"
        }}
        style={{
          width: "4px",
          backgroundColor: color,
          borderRadius: "2px"
        }}
      />
    ))}
  </div>
);

// 5. OrbitLoader
export const OrbitLoader = ({ size = 50, color = "#6366f1", ...props }) => (
  <div style={{ position: "relative", width: size, height: size, display: "inline-block" }} {...props}>
    <div style={{ position: "absolute", inset: "8px", borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.15)" }} />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%"
      }}
    >
      <div style={{ width: "10px", height: "10px", backgroundColor: color, borderRadius: "50%", margin: "0 auto" }} />
    </motion.div>
  </div>
);

// 6. InfinityLoader
export const InfinityLoader = ({ size = 60, color = "#6366f1", ...props }) => (
  <svg width={size} height={size / 2} viewBox="0 0 100 50" fill="none" {...props}>
    <path
      d="M25 15 C 10 15, 10 35, 25 35 C 40 35, 60 15, 75 15 C 90 15, 90 35, 75 35 C 60 35, 40 15, 25 15 Z"
      stroke="rgba(255,255,255,0.05)"
      strokeWidth="4"
    />
    <motion.path
      d="M25 15 C 10 15, 10 35, 25 35 C 40 35, 60 15, 75 15 C 90 15, 90 35, 75 35 C 60 35, 40 15, 25 15 Z"
      stroke={color}
      strokeWidth="4"
      strokeDasharray="160"
      animate={{ strokeDashoffset: [160, -160] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
    />
  </svg>
);

// 7. RingLoader
export const RingLoader = ({ size = 50, color = "#6366f1", ...props }) => (
  <div style={{ position: "relative", width: size, height: size, display: "inline-block" }} {...props}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: "3px solid transparent",
        borderTopColor: color,
        borderBottomColor: color
      }}
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
      style={{
        position: "absolute",
        inset: "6px",
        borderRadius: "50%",
        border: "3px solid transparent",
        borderLeftColor: "#c084fc",
        borderRightColor: "#c084fc"
      }}
    />
  </div>
);

// 8. SkeletonLoader
export const SkeletonLoader = ({ width = "100%", height = 150, ...props }) => (
  <div
    style={{
      position: "relative",
      width,
      height,
      backgroundColor: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: "16px",
      overflow: "hidden"
    }}
    {...props}
  >
    <motion.div
      animate={{ x: ["-100%", "200%"] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "50%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)"
      }}
    />
  </div>
);

// 9. ProgressLoader (simulated top bar loading indicator)
export const ProgressLoader = ({ progress = 0, color = "#6366f1", ...props }) => (
  <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(255,255,255,0.05)", ...props }}>
    <motion.div
      animate={{ width: `${progress}%` }}
      style={{ height: "100%", backgroundColor: color }}
    />
  </div>
);

// 10. BarLoader
export const BarLoader = ({ color = "#6366f1", ...props }) => (
  <div style={{ width: "120px", height: "4px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden", display: "inline-block" }} {...props}>
    <motion.div
      animate={{ x: ["-100%", "200%"] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      style={{
        width: "50%",
        height: "100%",
        backgroundColor: color,
        borderRadius: "2px"
      }}
    />
  </div>
);

// 11. CubeLoader
export const CubeLoader = ({ size = 40, color = "#6366f1", ...props }) => (
  <div style={{ width: size, height: size, perspective: "100px", display: "inline-block" }} {...props}>
    <motion.div
      animate={{ rotateX: [0, 180, 180, 0], rotateY: [0, 0, 180, 180] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color,
        borderRadius: "4px"
      }}
    />
  </div>
);

// 12. DNALoader
export const DNALoader = ({ color = "#6366f1", ...props }) => {
  const dotsCount = 10;
  return (
    <div style={{ display: "inline-flex", gap: "8px", alignItems: "center", height: "40px" }} {...props}>
      {Array.from({ length: dotsCount }).map((_, i) => {
        const offset = i * (Math.PI / 4);
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
            <motion.div
              animate={{ y: [0, -12, 0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: i * 0.1 }}
              style={{ width: "6px", height: "6px", backgroundColor: color, borderRadius: "50%" }}
            />
            <motion.div
              animate={{ y: [0, 12, 0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: i * 0.1 }}
              style={{ width: "6px", height: "6px", backgroundColor: "#c084fc", borderRadius: "50%" }}
            />
          </div>
        );
      })}
    </div>
  );
};

// 13. MatrixLoader
export const MatrixLoader = ({ style, ...props }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Generates static vertical chains typing matrix details
    const cols = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 2,
      speed: 1 + Math.random() * 2,
      chars: Array.from({ length: 6 }).map(() => String.fromCharCode(33 + Math.floor(Math.random() * 90)))
    }));
    setColumns(cols);
  }, []);

  return (
    <div
      style={{
        fontFamily: "monospace",
        color: "#00ff66",
        fontSize: "0.8rem",
        display: "flex",
        gap: "10px",
        overflow: "hidden",
        height: "80px",
        padding: "10px",
        background: "#050508",
        borderRadius: "8px",
        border: "1px solid rgba(0,255,102,0.1)",
        ...style
      }}
      {...props}
    >
      {columns.map((col) => (
        <motion.div
          key={col.id}
          animate={{ y: [-100, 100] }}
          transition={{ repeat: Infinity, ease: "linear", duration: col.speed, delay: col.delay }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {col.chars.map((char, index) => (
            <span key={index} style={{ opacity: 1 - index * 0.18 }}>
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// 14. TerminalLoader
export const TerminalLoader = ({ style, ...props }) => {
  const [lines, setLines] = useState(["$ initialising..."]);
  const steps = [
    "$ afk-motion --install",
    "Fetching dependencies...",
    "Injecting physics springs...",
    "Compilation success! Ready."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        setLines((prev) => [...prev, steps[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontFamily: "monospace",
        background: "#08080c",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "14px",
        width: "250px",
        height: "140px",
        color: "#cbd5e1",
        fontSize: "0.8rem",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        textAlign: "left",
        ...style
      }}
      {...props}
    >
      <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ff5f56" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27c93f" }} />
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.startsWith("$") ? "#818cf8" : "#94a3b8" }}>
          {l}
        </div>
      ))}
    </div>
  );
};
