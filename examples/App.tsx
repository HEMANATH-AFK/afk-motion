import React, { useState } from "react";
import {
  CoordinateHover,
  ImageDepthHover,
  ScrollTop,
  MagneticButton,
  CursorGlow,
  ScrollPlay
} from "../src/index";

export const App: React.FC = () => {
  // Playground State for CoordinateHover
  const [tilt, setTilt] = useState(15);
  const [scale, setScale] = useState(1.06);
  const [glowSize, setGlowSize] = useState(300);
  const [shadow, setShadow] = useState(true);
  const [glowColor, setGlowColor] = useState("rgba(99, 102, 241, 0.15)");

  // Playground State for MagneticButton
  const [strength, setStrength] = useState(0.35);
  const [range, setRange] = useState(45);

  // Tab State for Code Examples
  const [activeTab, setActiveTab] = useState<"install" | "hover" | "depth" | "magnetic">("install");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code copied to clipboard!");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background Decorative Grids and Globs */}
      <div className="showcase-grid-overlay" />
      <div className="showcase-glow-mesh" />

      {/* Cursor Follower Glow Blob (Container Bounded / Bypasses Re-renders) */}
      <CursorGlow color="rgba(99, 102, 241, 0.18)" size={320} blur={60} />

      {/* Floating ScrollToTop Component with progress ring */}
      <ScrollTop size={60} threshold={200} duration={900} progressColor="#818cf8" glass={true} />

      {/* NAVIGATION BAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            afk<span style={{ color: "#6366f1" }}>.motion</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a
            href="#hero"
            style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            Showcase
          </a>
          <a
            href="#playgrounds"
            style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            Playgrounds
          </a>
          <a
            href="#code"
            style={{ color: "#94a3b8", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ffffff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
          >
            API Setup
          </a>
          <MagneticButton
            strength={0.3}
            range={30}
            style={{
              padding: "0.6rem 1.2rem",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "30px",
              color: "#f8fafc",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Star on GitHub
          </MagneticButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="hero"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 4rem",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 0.8rem",
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "20px",
              width: "fit-content",
              color: "#818cf8",
              fontSize: "0.85rem",
              fontWeight: 500,
            }}
          >
            ✨ v0.1 Released — Zero External Lock-In
          </div>
          <h1 className="text-gradient-hero" style={{ margin: 0, fontSize: "4.5rem" }}>
            Premium Motion Components
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--color-text-muted)", lineHeight: 1.6, margin: 0 }}>
            Supercharge your portfolio website aesthetics. High-performance, 60fps coordinate-based tilts, spotlight glows, elastic magnetic items, and scroll scrubbing with zero setup.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <a href="#playgrounds" style={{ textDecoration: "none" }}>
              <MagneticButton
                strength={0.25}
                style={{
                  padding: "0.9rem 2rem",
                  background: "#6366f1",
                  border: "none",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                }}
              >
                Try Sandbox
              </MagneticButton>
            </a>
            <a href="#code" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "0.9rem 2rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)")}
              >
                Read Documentation
              </button>
            </a>
          </div>
        </div>

        {/* HERO INTERACTIVE SHOWCASE CARD (CoordinateHover) */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CoordinateHover
            maxTilt={12}
            scale={1.04}
            glowSize={350}
            glowColor="rgba(129, 140, 248, 0.18)"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "460px",
              padding: "2rem",
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(10, 10, 15, 0.8) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", transform: "translateZ(30px)" }}>
              <div style={{ width: "45px", height: "45px", borderRadius: "12px", background: "linear-gradient(45deg, #6366f1, #c084fc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "auto" }}>
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <span style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Interactive 3D
              </span>
            </div>

            {/* Middle illustration with 3D offset */}
            <div style={{ transform: "translateZ(60px)", margin: "2rem 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                Hover & Tilt Me
              </h3>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.5 }}>
                Notice the spotlight following your cursor and the card tilting in 3D space with zero latency.
              </p>
            </div>

            <div style={{ transform: "translateZ(40px)", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["Tilt", "Glow Spotlight", "Shadow Displacement", "3D Layers"].map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: "0.75rem",
                    color: "#cbd5e1",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </CoordinateHover>
        </div>
      </section>

      {/* CORE SANDBOX & PLAYGROUNDS */}
      <section id="playgrounds" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.8rem", fontFamily: "'Outfit', sans-serif", fontWeight: 800, margin: "0 0 1rem" }}>
            Library Sandboxes
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", margin: 0 }}>
            Interact with live components, tweak properties, and copy responsive code layouts instantly.
          </p>
        </div>

        {/* PLAYGROUND 1: COORDINATE HOVER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "center",
            padding: "3rem",
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: "32px",
            marginBottom: "4rem",
          }}
        >
          {/* Controls */}
          <div>
            <span style={{ color: "#6366f1", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Hero Component
            </span>
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0.5rem 0 1.5rem" }}>
              CoordinateHover
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>Max Tilt Angle: <b style={{ color: "#6366f1" }}>{tilt}°</b></span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={tilt}
                  onChange={(e) => setTilt(Number(e.target.value))}
                  className="slider-input"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>Scale Factor: <b style={{ color: "#6366f1" }}>{scale.toFixed(2)}x</b></span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="1.15"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="slider-input"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>Glow Size: <b style={{ color: "#6366f1" }}>{glowSize}px</b></span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="500"
                  step="10"
                  value={glowSize}
                  onChange={(e) => setGlowSize(Number(e.target.value))}
                  className="slider-input"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>Spotlight Color:</span>
                </div>
                <select
                  value={glowColor}
                  onChange={(e) => setGlowColor(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    background: "#1e1e2e",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    color: "#f8fafc",
                    outline: "none",
                    marginTop: "5px",
                  }}
                >
                  <option value="rgba(99, 102, 241, 0.15)">Indigo glow (Default)</option>
                  <option value="rgba(236, 72, 153, 0.18)">Hot Pink glow</option>
                  <option value="rgba(255, 140, 0, 0.15)">Amber Glow</option>
                  <option value="rgba(255, 255, 255, 0.12)">Pure White spotlight</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  id="shadow-check"
                  checked={shadow}
                  onChange={(e) => setShadow(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#6366f1", cursor: "pointer" }}
                />
                <label htmlFor="shadow-check" style={{ fontSize: "0.95rem", cursor: "pointer", userSelect: "none" }}>
                  Enable Dynamic Light Shadow Displacement
                </label>
              </div>
            </div>
          </div>

          {/* Canvas Render */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CoordinateHover
              maxTilt={tilt}
              scale={scale}
              glowSize={glowSize}
              glowColor={glowColor}
              shadow={shadow}
              style={{
                width: "100%",
                maxWidth: "380px",
                height: "320px",
                padding: "2rem",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.4rem" }}>Dynamic Parameters</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
                Tweak parameters in the sidebar to see shifts in tilt limits, bounding scales, and cursor spotlight highlights.
              </p>
            </CoordinateHover>
          </div>
        </div>

        {/* PLAYGROUND 2: IMAGE DEPTH HOVER (THE KILLER COMPONENT) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "center",
            padding: "3rem",
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: "32px",
            marginBottom: "4rem",
          }}
        >
          {/* Parallax Card Render */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ImageDepthHover
              layers={["/bg.png", "/mid.png", "/front.png"]}
              maxShift={30}
              maxTilt={10}
              glowColor="rgba(255,255,255,0.18)"
              style={{
                width: "100%",
                maxWidth: "400px",
                aspectRatio: "1.2",
                borderRadius: "24px",
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6)",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Info */}
          <div>
            <span style={{ color: "#ff8c00", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Killer Component
            </span>
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0.5rem 0 1.5rem" }}>
              ImageDepthHover
            </h3>
            <p style={{ color: "#94a3b8", lineHeight: 1.6, fontSize: "1.05rem", margin: "0 0 1.5rem" }}>
              Stands out as our key differentiator. Supply an array of image layers, and cursor tracking automatically maps progressive multi-layered parallax depth. 
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ display: "flex", width: "24px", height: "24px", background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", borderRadius: "50%", color: "#ff8c00", fontSize: "0.75rem", fontWeight: 700, justifyContent: "center", alignItems: "center" }}>1</span>
                <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>Calculates offsets in requestAnimationFrame</span>
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ display: "flex", width: "24px", height: "24px", background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", borderRadius: "50%", color: "#ff8c00", fontSize: "0.75rem", fontWeight: 700, justifyContent: "center", alignItems: "center" }}>2</span>
                <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>Bypasses component state re-renders</span>
              </div>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ display: "flex", width: "24px", height: "24px", background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", borderRadius: "50%", color: "#ff8c00", fontSize: "0.75rem", fontWeight: 700, justifyContent: "center", alignItems: "center" }}>3</span>
                <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>Auto-assigns depth layers if provided with raw strings</span>
              </div>
            </div>
          </div>
        </div>

        {/* PLAYGROUND 3: MAGNETIC BUTTONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "center",
            padding: "3rem",
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: "32px",
            marginBottom: "4rem",
          }}
        >
          {/* Controls */}
          <div>
            <span style={{ color: "#a5b4fc", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Elastic micro-interaction
            </span>
            <h3 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0.5rem 0 1.5rem" }}>
              MagneticButton
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>Attraction Force: <b style={{ color: "#6366f1" }}>{strength.toFixed(2)}x</b></span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.65"
                  step="0.05"
                  value={strength}
                  onChange={(e) => setStrength(Number(e.target.value))}
                  className="slider-input"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span>Detection Buffer Range: <b style={{ color: "#6366f1" }}>{range}px</b></span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={range}
                  onChange={(e) => setRange(Number(e.target.value))}
                  className="slider-input"
                />
              </div>
            </div>
          </div>

          {/* Render */}
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", alignItems: "center" }}>
            <MagneticButton
              strength={strength}
              range={range}
              style={{
                padding: "1.2rem 2.5rem",
                borderRadius: "50px",
                background: "linear-gradient(45deg, #1e1b4b, #311042)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#f8fafc",
                fontWeight: 600,
                fontSize: "1.05rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              Elastic Target
            </MagneticButton>

            <MagneticButton
              strength={strength * 1.3}
              range={range + 10}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </MagneticButton>
          </div>
        </div>

        {/* PLAYGROUND 4: SCROLLPLAY VIEWPORT SCRUB */}
        <div
          style={{
            padding: "3rem",
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.03)",
            borderRadius: "32px",
            marginBottom: "4rem",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#c084fc", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Viewport Animation
          </span>
          <h3 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0.5rem 0 1.5rem" }}>
            ScrollPlay Transitions
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "2.5rem",
              flexWrap: "wrap",
            }}
          >
            <ScrollPlay
              from={{ opacity: 0, y: 50, scale: 0.8 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
              once={false}
              duration={1000}
              style={{
                width: "250px",
                padding: "2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                textAlign: "left",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem", color: "#818cf8" }}>Fade & Slide In</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
                Transitions on viewport entry. Triggers repeatedly when scrolling back out and in.
              </p>
            </ScrollPlay>

            <ScrollPlay
              from={{ opacity: 0, rotate: -15, scale: 0.85, blur: 8 }}
              to={{ opacity: 1, rotate: 0, scale: 1, blur: 0 }}
              once={true}
              duration={1200}
              delay={200}
              style={{
                width: "250px",
                padding: "2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                textAlign: "left",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem", color: "#c084fc" }}>Rotate & Blur Fade</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
                Includes rotation, blur filters, and triggers once with a customized delay.
              </p>
            </ScrollPlay>

            <ScrollPlay
              from={{ opacity: 0.2, scale: 0.9, y: 30 }}
              to={{ opacity: 1, scale: 1.05, y: -30 }}
              mode="scroll"
              parallaxSpeed={80}
              style={{
                width: "250px",
                padding: "2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                textAlign: "left",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem", color: "#f472b6" }}>Scroll Scrub Parallax</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>
                Progress is linked directly to your scroll viewport coordinate depth.
              </p>
            </ScrollPlay>
          </div>
        </div>
      </section>

      {/* QUICK DOCUMENTATION SECTION */}
      <section
        id="code"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 2rem 8rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontFamily: "'Outfit', sans-serif", fontWeight: 800, margin: "0 0 1rem" }}>
            Integration APIs
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem", margin: 0 }}>
            Import and stack premium animations in your portfolio with a few lines of clean code.
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { id: "install", label: "Installation" },
            { id: "hover", label: "CoordinateHover" },
            { id: "depth", label: "ImageDepthHover" },
            { id: "magnetic", label: "MagneticButton" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "0.6rem 1.2rem",
                borderRadius: "8px",
                border: activeTab === tab.id ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
                background: activeTab === tab.id ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)",
                color: activeTab === tab.id ? "#fff" : "#94a3b8",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Block Render */}
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          <button
            onClick={() => {
              const codeEl = document.getElementById("code-snippet");
              if (codeEl) copyToClipboard(codeEl.innerText);
            }}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              padding: "0.4rem 0.8rem",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "#cbd5e1",
              fontSize: "0.75rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Copy
          </button>

          <pre id="code-snippet" className="code-block">
            {activeTab === "install" && `npm install afk-motion`}

            {activeTab === "hover" &&
              `import { CoordinateHover } from "afk-motion";

export const Card = () => {
  return (
    <CoordinateHover 
      maxTilt={15} 
      scale={1.06} 
      glow={true} 
      shadow={true}
      glowColor="rgba(99, 102, 241, 0.15)"
    >
      <div className="portfolio-card">
        <h3>Design Project</h3>
        <p>Interactive 3D hover overlay details.</p>
      </div>
    </CoordinateHover>
  );
};`}

            {activeTab === "depth" &&
              `import { ImageDepthHover } from "afk-motion";

export const ParallaxCard = () => {
  return (
    <ImageDepthHover
      layers={[
        "/assets/background-stars.png",
        "/assets/floating-orbs.png",
        "/assets/central-logo.png"
      ]}
      maxShift={30}
      maxTilt={8}
    />
  );
};`}

            {activeTab === "magnetic" &&
              `import { MagneticButton } from "afk-motion";

export const CTA = () => {
  return (
    <MagneticButton strength={0.4} range={50}>
      <button className="cta-btn">
        Contact Me
      </button>
    </MagneticButton>
  );
};`}
          </pre>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "3rem 2rem",
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.9rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p style={{ margin: 0 }}>
          Built with React 19, TypeScript, and high-performance physics loops.
        </p>
        <p style={{ margin: "0.5rem 0 0" }}>
          © {new Date().getFullYear()} afk-motion. Released under the MIT License.
        </p>
      </footer>
    </div>
  );
};
