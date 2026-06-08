import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "./SpotlightCard";

// 1. Spotlight (radial mouse masking)
export const Spotlight = ({ children, style, ...props }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCoords((prev) => ({ ...prev, opacity: 0 }))}
      style={{ position: "relative", overflow: "hidden", display: "inline-block", ...style }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(99,102,241,0.15), transparent 70%)`,
          opacity: coords.opacity,
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};

// 2. CommandPalette (Cmd+K searching box)
export const CommandPalette = ({ isOpen, onClose, items = [], onSelect, ...props }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const filtered = items.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "80px 20px"
          }}
          {...props}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "#0c0c14",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
            }}
          >
            <input
              autoFocus
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px",
                color: "#fff",
                outline: "none",
                fontSize: "1rem"
              }}
            />
            <div style={{ marginTop: "12px", maxHeight: "250px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "4px" }}>
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelect && onSelect(item);
                    onClose();
                  }}
                  style={{ padding: "10px 14px", borderRadius: "8px", color: "#94a3b8", cursor: "pointer", fontSize: "0.9rem" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.12)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#94a3b8";
                  }}
                >
                  {item}
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ color: "#64748b", padding: "10px", textAlign: "center", fontSize: "0.9rem" }}>No results found</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// 3. AnimatedCodeBlock
export const AnimatedCodeBlock = ({ 
  code = `// Example AFK Spring Setup\nconst spring = {\n  type: \"spring\",\n  stiffness: 260,\n  damping: 15\n};`, 
  language = "javascript", 
  style, 
  ...props 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#08080c",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        padding: "16px 20px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.85rem",
        color: "#a5b4fc",
        overflowX: "auto",
        ...style
      }}
      {...props}
    >
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "6px",
          color: "#cbd5e1",
          fontSize: "0.7rem",
          padding: "4px 8px",
          cursor: "pointer"
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre style={{ margin: 0 }}><code>{code}</code></pre>
    </div>
  );
};

// 4. TerminalEmulator
export const TerminalEmulator = ({ style, ...props }) => {
  const [history, setHistory] = useState([
    { type: "sys", text: "AFK CommandCenter Console v1.0.0" },
    { type: "sys", text: "Type 'help' to see list of items." }
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  const handleSend = (e) => {
    if (e.key === "Enter") {
      const trimmed = input.trim();
      if (!trimmed) return;

      const newHistory = [...history, { type: "user", text: trimmed }];

      if (trimmed === "help") {
        newHistory.push({ type: "sys", text: "Commands: help, clean, about, neofetch" });
      } else if (trimmed === "clean") {
        setHistory([]);
        setInput("");
        return;
      } else if (trimmed === "about") {
        newHistory.push({ type: "sys", text: "afk-motion: A high-performance Micro-Interactions library." });
      } else if (trimmed === "neofetch") {
        newHistory.push({ type: "sys", text: "OS: AFK-OS v3\nShell: gemini-sh\nUI: React 19 + Framer Motion" });
      } else {
        newHistory.push({ type: "sys", text: `Command not found: ${trimmed}` });
      }

      setHistory(newHistory);
      setInput("");
      setTimeout(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, 50);
    }
  };

  return (
    <div
      style={{
        width: "320px",
        height: "220px",
        backgroundColor: "#07070a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.8rem",
        color: "#00ff66",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        ...style
      }}
      {...props}
    >
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "6px" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
      </div>
      <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
        {history.map((h, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap", color: h.type === "user" ? "#818cf8" : "#94a3b8" }}>
            {h.type === "user" ? `> ${h.text}` : h.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <span>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleSend}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            color: "#00ff66",
            fontFamily: "inherit",
            fontSize: "inherit",
            outline: "none"
          }}
        />
      </div>
    </div>
  );
};

// 5. InteractiveTimeline
export const InteractiveTimeline = ({ steps = [], activeStep, onStepClick, style, ...props }) => {
  const [localActive, setLocalActive] = useState(0);
  const currentActive = activeStep !== undefined ? activeStep : localActive;

  const handleClick = (idx) => {
    if (activeStep === undefined) {
      setLocalActive(idx);
    }
    onStepClick && onStepClick(idx);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px", position: "relative", ...style }} {...props}>
      <div style={{ position: "absolute", left: "16px", top: "15px", bottom: "15px", width: "2px", backgroundColor: "rgba(255,255,255,0.05)" }} />
      {steps.map((step, idx) => {
        const isActive = currentActive === idx;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => handleClick(idx)}
            style={{ display: "flex", gap: "20px", alignItems: "flex-start", cursor: "pointer" }}
          >
            <motion.div
              animate={{
                borderColor: isActive ? "#6366f1" : "rgba(255,255,255,0.15)",
                backgroundColor: isActive ? "#6366f1" : "#0c0c14",
                scale: isActive ? 1.1 : 1
              }}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                zIndex: 1,
                border: "2px solid rgba(255,255,255,0.15)"
              }}
            >
              {idx + 1}
            </motion.div>
            <div>
              <span style={{ fontSize: "1rem", color: isActive ? "#fff" : "#cbd5e1", fontWeight: 700, transition: "color 0.2s" }}>{step.title}</span>
              <p style={{ margin: "4px 0 0", color: isActive ? "#a5b4fc" : "#94a3b8", fontSize: "0.85rem", lineHeight: 1.4, transition: "color 0.2s" }}>{step.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// 6. Stepper (dots timeline indicator)
export const Stepper = ({ steps = [], active = 0, onStepClick, style, ...props }) => {
  const [localActive, setLocalActive] = useState(active);
  const currentActive = active !== undefined ? active : localActive;

  useEffect(() => {
    setLocalActive(active);
  }, [active]);

  const handleClick = (idx) => {
    setLocalActive(idx);
    onStepClick && onStepClick(idx);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", ...style }} {...props}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div 
            onClick={() => handleClick(i)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", cursor: "pointer" }}
          >
            <motion.div
              animate={{
                backgroundColor: currentActive >= i ? "#6366f1" : "rgba(255,255,255,0.1)",
                scale: currentActive === i ? 1.25 : 1
              }}
              style={{ width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "bold", color: "#fff" }}
            >
              {i + 1}
            </motion.div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, width: "40px", height: "2px", backgroundColor: currentActive > i ? "#6366f1" : "rgba(255,255,255,0.08)" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// 7. FeatureShowcase (Interactive tabs)
export const FeatureShowcase = ({ features = [], style, ...props }) => {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", ...style }} {...props}>
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" }}>
        {features.map((feat, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              background: "none",
              border: "none",
              color: active === idx ? "#fff" : "#64748b",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "6px 12px",
              position: "relative"
            }}
          >
            {feat.tab}
            {active === idx && (
              <motion.div layoutId="feature-underline" style={{ position: "absolute", bottom: "-11px", left: 0, right: 0, height: "2px", backgroundColor: "#6366f1" }} />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {features[active]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// 8. BentoGrid
export const BentoGrid = ({ children, style, ...props }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gridAutoRows: "180px",
      gap: "16px",
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);

// 9. InfiniteLogoCloud
export const InfiniteLogoCloud = ({ logos = [], speed = 15, style, ...props }) => (
  <div style={{ overflow: "hidden", display: "flex", width: "100%", ...style }} {...props}>
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap" }}
    >
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        {logos.map((logo, i) => (
          <span key={i} style={{ color: "#64748b", fontWeight: 700, fontSize: "1.2rem" }}>
            {logo}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        {logos.map((logo, i) => (
          <span key={i} style={{ color: "#64748b", fontWeight: 700, fontSize: "1.2rem" }}>
            {logo}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
);

// 10. TestimonialCarousel
export const TestimonialCarousel = ({ items = [], style, ...props }) => {
  const [active, setActive] = useState(0);
  const next = () => setActive((prev) => (prev + 1) % items.length);

  return (
    <div
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "28px",
        position: "relative",
        maxWidth: "400px",
        textAlign: "center",
        ...style
      }}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <p style={{ fontStyle: "italic", fontSize: "0.95rem", lineHeight: 1.6, margin: "0 0 16px", color: "#cbd5e1" }}>
            "{items[active]?.quote}"
          </p>
          <h4 style={{ margin: 0, color: "#fff" }}>{items[active]?.author}</h4>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{items[active]?.role}</span>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={next}
        style={{
          marginTop: "16px",
          background: "none",
          border: "none",
          color: "#818cf8",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Next Testimonial &rarr;
      </button>
    </div>
  );
};

// 11. MasonryGallery
export const MasonryGallery = ({ items = [], style, ...props }) => (
  <div style={{ columnCount: 3, columnGap: "16px", width: "100%", ...style }} {...props}>
    {items.map((item, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.02 }}
        style={{
          breakInside: "avoid",
          marginBottom: "16px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)"
        }}
      >
        <img src={item} alt="" style={{ width: "100%", display: "block" }} />
      </motion.div>
    ))}
  </div>
);

// 12. AnimatedFAQ (Accordions)
export const AnimatedFAQ = ({ qas = [], style, ...props }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", ...style }} {...props}>
      {qas.map((qa, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            style={{
              borderRadius: "10px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden"
            }}
          >
            <div
              onClick={() => toggle(idx)}
              style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: 600 }}
            >
              <span>{qa.question}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>&#x25BC;</motion.span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{
                    padding: "0 20px 16px",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    borderTop: "1px solid rgba(255,255,255,0.02)",
                    paddingTop: "12px"
                  }}
                >
                  {qa.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// 13. ComparisonSlider & BeforeAfterImage (Drag handle before/after viewer)
export const ComparisonSlider = ({ beforeSrc, afterSrc, style, ...props }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "320px",
        height: "200px",
        overflow: "hidden",
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.06)",
        cursor: "ew-resize",
        userSelect: "none",
        ...style
      }}
      {...props}
    >
      {/* Before */}
      <img src={beforeSrc} alt="before" style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
      {/* After (masked overlay) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: `${sliderPos}%`,
          overflow: "hidden",
          borderRight: "2px solid #6366f1"
        }}
      >
        <img src={afterSrc} alt="after" style={{ width: "320px", height: "200px", objectFit: "cover", maxWidth: "none", pointerEvents: "none" }} />
      </div>
      {/* Knob handle */}
      <div style={{ position: "absolute", left: `${sliderPos}%`, top: "50%", transform: "translate(-50%, -50%)", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#6366f1", boxShadow: "0 0 10px #6366f1" }} />
    </div>
  );
};

export const BeforeAfterImage = ComparisonSlider;

// 14. PricingSwitcher (Monthly/annual slider with bounce effect)
export const PricingSwitcher = ({ isAnnual: controlledIsAnnual, onToggle, style, ...props }) => {
  const [localIsAnnual, setLocalIsAnnual] = useState(false);
  const isAnnual = controlledIsAnnual !== undefined ? controlledIsAnnual : localIsAnnual;

  const handleToggle = (val) => {
    if (controlledIsAnnual === undefined) {
      setLocalIsAnnual(val);
    }
    onToggle && onToggle(val);
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.02)", padding: "4px", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.07)", ...style }} {...props}>
      <button
        onClick={() => handleToggle(false)}
        style={{
          padding: "6px 14px",
          borderRadius: "20px",
          border: "none",
          background: !isAnnual ? "#6366f1" : "transparent",
          color: !isAnnual ? "#fff" : "#64748b",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        Monthly
      </button>
      <button
        onClick={() => handleToggle(true)}
        style={{
          padding: "6px 14px",
          borderRadius: "20px",
          border: "none",
          background: isAnnual ? "#6366f1" : "transparent",
          color: isAnnual ? "#fff" : "#64748b",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        Yearly
      </button>
    </div>
  );
};

// 15. CalendarHeatmap
export const CalendarHeatmap = ({ style, ...props }) => {
  // Generates 7x15 activity grid representing contributions
  const grid = Array.from({ length: 7 * 15 }).map(() => Math.floor(Math.random() * 4));
  const colors = ["rgba(255,255,255,0.02)", "rgba(99,102,241,0.25)", "rgba(99,102,241,0.55)", "#6366f1"];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(15, 12px)",
        gridTemplateRows: "repeat(7, 12px)",
        gap: "4px",
        width: "fit-content",
        padding: "12px",
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "8px",
        ...style
      }}
      {...props}
    >
      {grid.map((val, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.2, zIndex: 1 }}
          style={{
            borderRadius: "2px",
            backgroundColor: colors[val],
            cursor: "pointer"
          }}
        />
      ))}
    </div>
  );
};
