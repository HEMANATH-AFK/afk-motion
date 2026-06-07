import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountUpText } from "./TextAnimations";
import { SkeletonLoader } from "./LoadingComponents";

// 1. AnimatedStatsCard
export const AnimatedStatsCard = ({ title, value, sparklineData = [20, 45, 28, 60, 35, 80], style, ...props }) => {
  // Map points to SVG coordinates
  const width = 120;
  const height = 40;
  const max = Math.max(...sparklineData);
  const min = Math.min(...sparklineData);
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / (max - min || 1)) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "220px",
        ...style
      }}
      {...props}
    >
      <div>
        <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{title}</span>
        <h3 style={{ margin: "4px 0 0", fontSize: "1.8rem", fontWeight: 800 }}>
          {typeof value === "number" ? <CountUpText to={value} /> : value}
        </h3>
      </div>
      <svg width={width} height={height}>
        <motion.polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="2.5"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
};

// 2. CounterCard
export const CounterCard = ({ title, style, ...props }) => {
  const [val, setVal] = useState(100);
  return (
    <div
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px",
        textAlign: "center",
        width: "160px",
        ...style
      }}
      {...props}
    >
      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "14px 0" }}>
        <button
          onClick={() => setVal(val - 1)}
          style={{ width: "28px", height: "28px", border: "none", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}
        >
          -
        </button>
        <span style={{ fontSize: "1.5rem", fontWeight: 700, minWidth: "40px" }}>{val}</span>
        <button
          onClick={() => setVal(val + 1)}
          style={{ width: "28px", height: "28px", border: "none", backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}
        >
          +
        </button>
      </div>
    </div>
  );
};

// 3. ProgressRing
export const ProgressRing = ({ progress = 75, size = 60, strokeWidth = 5, color = "#6366f1", style, ...props }) => {
  const radius = (size - strokeWidth) / 2;
  const circ = radius * 2 * Math.PI;
  const strokeDashoffset = circ - (progress / 100) * circ;

  return (
    <div style={{ position: "relative", width: size, height: size, display: "inline-block", ...style }} {...props}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>
        {progress}%
      </div>
    </div>
  );
};

export const CircularProgress = ProgressRing;

// 4. ActivityFeed
export const ActivityFeed = ({ items = [
  { title: "User signed up", time: "2 mins ago" },
  { title: "Invoice paid", time: "1 hr ago" },
  { title: "Server restarted", time: "3 hrs ago" }
], style, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", ...style }} {...props}>
    {/* Connector trace line */}
    <div style={{ position: "absolute", left: "12px", top: "10px", bottom: "10px", width: "2px", backgroundColor: "rgba(255,255,255,0.05)" }} />

    {items.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1 }}
        style={{ display: "flex", gap: "16px", alignItems: "flex-start", position: "relative", zIndex: 1 }}
      >
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "#6366f1", border: "4px solid #07070a", display: "flex", alignItems: "center", justifyContent: "center" }} />
        <div>
          <span style={{ fontSize: "0.9rem", color: "#fff", fontWeight: 600 }}>{item.title}</span>
          <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "0.8rem" }}>{item.time}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

// 5. AnimatedChartWrapper (Bar chart animation)
export const AnimatedChartWrapper = ({ data = [40, 75, 55, 90, 60], style, ...props }) => (
  <div
    style={{
      height: "160px",
      display: "flex",
      alignItems: "flex-end",
      gap: "16px",
      padding: "20px",
      background: "rgba(255,255,255,0.01)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: "16px",
      width: "fit-content",
      ...style
    }}
    {...props}
  >
    {data.map((val, idx) => (
      <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: `${val}px` }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: idx * 0.05 }}
          style={{
            width: "24px",
            background: "linear-gradient(to top, #6366f1, #c084fc)",
            borderRadius: "4px 4px 0 0"
          }}
        />
        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{idx + 1}</span>
      </div>
    ))}
  </div>
);

// 6. KPIWidget
export const KPIWidget = ({ title, value, change, isPositive = true, style, ...props }) => (
  <div
    style={{
      borderRadius: "16px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      padding: "20px",
      width: "200px",
      ...style
    }}
    {...props}
  >
    <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{title}</span>
    <h3 style={{ margin: "6px 0", fontSize: "1.8rem", fontWeight: 800 }}>{value}</h3>
    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: isPositive ? "#10b981" : "#ef4444" }}>
      <span>{isPositive ? "▲" : "▼"}</span>
      <span>{change}</span>
    </div>
  </div>
);

// 7. DashboardLoader
export const DashboardLoader = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "100%" }}>
    <SkeletonLoader height={80} />
    <SkeletonLoader height={80} />
    <SkeletonLoader height={140} width="100%" />
    <SkeletonLoader height={140} width="100%" />
  </div>
);
