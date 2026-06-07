import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountUpText } from "./TextAnimations";

// 1. AIChatBubble
export const AIChatBubble = ({ text = "Hello! I am an AI assistant. How can I help you today?", sender = "ai", avatar, style, ...props }) => {
  const isAI = sender === "ai";
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: "flex",
        justifyContent: isAI ? "flex-start" : "flex-end",
        gap: "10px",
        width: "100%",
        margin: "8px 0",
        ...style
      }}
      {...props}
    >
      {isAI && (
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "bold" }}>
          AI
        </div>
      )}
      <div
        style={{
          maxWidth: "70%",
          padding: "12px 16px",
          borderRadius: "16px",
          borderTopLeftRadius: isAI ? "4px" : "16px",
          borderTopRightRadius: !isAI ? "4px" : "16px",
          background: isAI ? "rgba(255,255,255,0.03)" : "#6366f1",
          border: isAI ? "1px solid rgba(255,255,255,0.07)" : "none",
          color: "#fff",
          fontSize: "0.9rem",
          lineHeight: 1.4
        }}
      >
        {text}
      </div>
    </motion.div>
  );
};

// 2. StreamingText (Word-by-word streaming display)
export const StreamingText = ({ text = "", speed = 40, onComplete, style, ...props }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const words = text.split(" ");
    let index = 0;
    setDisplayed("");

    const timer = setInterval(() => {
      if (index < words.length) {
        setDisplayed((prev) => (prev ? prev + " " + words[index] : words[index]));
        index++;
      } else {
        clearInterval(timer);
        onComplete && onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span style={style} {...props}>{displayed}</span>;
};

// 3. ThinkingIndicator
export const ThinkingIndicator = ({ style, ...props }) => (
  <div style={{ display: "inline-flex", gap: "5px", alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", ...style }} {...props}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: "easeInOut" }}
        style={{ width: "6px", height: "6px", backgroundColor: "#a5b4fc", borderRadius: "50%" }}
      />
    ))}
  </div>
);

// 4. AIResponseCard (Radial outline glow)
export const AIResponseCard = ({ header, children, style, ...props }) => (
  <div
    style={{
      borderRadius: "20px",
      background: "rgba(10,10,15,0.8)",
      border: "1px solid rgba(99, 102, 241, 0.25)",
      padding: "24px",
      boxShadow: "0 10px 30px rgba(99,102,241,0.08)",
      position: "relative",
      overflow: "hidden",
      ...style
    }}
    {...props}
  >
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(150px circle at top left, rgba(99,102,241,0.08), transparent 70%)", pointerEvents: "none" }} />
    <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px", marginBottom: "14px", color: "#818cf8", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
      <span>⚡</span> {header}
    </div>
    <div style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.5 }}>{children}</div>
  </div>
);

// 5. PromptInput (Autogrowing text-area with send animation)
export const PromptInput = ({ onSubmit, placeholder = "Ask AI...", style, ...props }) => {
  const [val, setVal] = useState("");
  const areaRef = useRef(null);

  const adjustHeight = () => {
    if (areaRef.current) {
      areaRef.current.style.height = "auto";
      areaRef.current.style.height = `${areaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!val.trim()) return;
    onSubmit && onSubmit(val);
    setVal("");
    if (areaRef.current) areaRef.current.style.height = "auto";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "10px 14px",
        width: "100%",
        ...style
      }}
      {...props}
    >
      <textarea
        ref={areaRef}
        rows={1}
        value={val}
        placeholder={placeholder}
        onChange={(e) => {
          setVal(e.target.value);
          adjustHeight();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        style={{
          flex: 1,
          background: "none",
          border: "none",
          color: "#fff",
          resize: "none",
          maxHeight: "150px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.95rem",
          outline: "none"
        }}
      />
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: val.trim() ? "#6366f1" : "rgba(255,255,255,0.04)",
          border: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: val.trim() ? "pointer" : "default",
          transition: "background-color 0.2s"
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </motion.button>
    </div>
  );
};

// 6. AIMessageLoader
export const AIMessageLoader = ({ style, ...props }) => (
  <div
    style={{
      padding: "16px",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      ...style
    }}
    {...props}
  >
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)" }} />
      <div style={{ width: "60px", height: "12px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.04)" }} />
    </div>
    <div style={{ width: "100%", height: "8px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.02)" }} />
    <div style={{ width: "80%", height: "8px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.02)" }} />
    <motion.div
      animate={{ x: ["-100%", "200%"] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "150px",
        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.05), transparent)"
      }}
    />
  </div>
);

// 7. TokenCounter
export const TokenCounter = ({ value, style, ...props }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 12px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "20px",
      fontSize: "0.8rem",
      color: "#94a3b8",
      ...style
    }}
    {...props}
  >
    <span>Tokens Used:</span>
    <strong style={{ color: "#818cf8" }}>
      <CountUpText to={value} />
    </strong>
  </div>
);

// 8. ConversationTimeline (Connection node timeline tracker)
export const ConversationTimeline = ({ steps = [
  { label: "Step 1: Setup", detail: "Install dependency packs." },
  { label: "Step 2: Code", detail: "Configure custom properties." },
  { label: "Step 3: Deploy", detail: "Run production build scripts." }
], style, ...props }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative", ...style }} {...props}>
    <div style={{ position: "absolute", left: "14px", top: "10px", bottom: "10px", width: "2px", backgroundColor: "rgba(99, 102, 241, 0.15)" }} />
    {steps.map((step, idx) => (
      <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start", position: "relative" }}>
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#0c0c14", border: "2px solid #6366f1", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "bold", zIndex: 1 }}>
          {idx + 1}
        </div>
        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "12px", flex: 1 }}>
          <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 700 }}>{step.label}</span>
          <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: "0.8rem" }}>{step.detail}</p>
        </div>
      </div>
    ))}
  </div>
);
