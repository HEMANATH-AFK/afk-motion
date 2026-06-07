import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper for navbar style
const navLinkStyle = {
  position: "relative",
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  padding: "8px 16px",
  cursor: "pointer",
  zIndex: 2,
  transition: "color 0.2s"
};

// 1. AnimatedNavbar
export const AnimatedNavbar = ({ items = [], style, ...props }) => {
  const [active, setActive] = useState(0);
  return (
    <nav style={{ display: "flex", gap: "10px", padding: "10px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", width: "fit-content", ...style }} {...props}>
      {items.map((item, idx) => (
        <span
          key={idx}
          onClick={() => setActive(idx)}
          style={{ ...navLinkStyle, color: active === idx ? "#ffffff" : "#94a3b8" }}
        >
          {item}
          {active === idx && (
            <motion.span
              layoutId="nav-bg-indicator"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "8px",
                zIndex: -1
              }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </span>
      ))}
    </nav>
  );
};

// 2. FloatingNavbar (Centered dock header)
export const FloatingNavbar = ({ items = [], style, ...props }) => {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", ...style }} {...props}>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px",
          background: "rgba(10, 10, 15, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "30px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
        }}
      >
        {items.map((item, idx) => (
          <span
            key={idx}
            onClick={() => setActive(idx)}
            style={{ ...navLinkStyle, padding: "8px 20px", color: active === idx ? "#fff" : "#94a3b8" }}
          >
            {item}
            {active === idx && (
              <motion.span
                layoutId="floating-nav-indicator"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#6366f1",
                  borderRadius: "20px",
                  zIndex: -1
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </span>
        ))}
      </motion.nav>
    </div>
  );
};

// 3. HideOnScrollNavbar
export const HideOnScrollNavbar = ({ children, style, ...props }) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 4. MorphNavbar
export const MorphNavbar = ({ items = [], style, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div
      layout
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "24px",
        padding: "8px 16px",
        cursor: "pointer",
        overflow: "hidden",
        height: "50px",
        ...style
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      {...props}
    >
      <motion.span layout="position" style={{ fontWeight: 700, marginRight: isExpanded ? "12px" : 0 }}>
        Menu
      </motion.span>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            {items.map((item, i) => (
              <span key={i} style={{ color: "#94a3b8", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                {item}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 5. SidebarMenu (Slide out drawer)
export const SidebarMenu = ({ isOpen, onClose, children, style, inline = false, ...props }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: inline ? "absolute" : "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 999
          }}
        />
        {/* Panel */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: inline ? "absolute" : "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: "300px",
            background: "#0c0c14",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            padding: "32px 24px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            ...style
          }}
          {...props}
        >
          <button
            onClick={onClose}
            style={{
              alignSelf: "flex-end",
              background: "transparent",
              border: "none",
              color: "#64748b",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
          >
            &times;
          </button>
          <div style={{ marginTop: "24px", flex: 1 }}>{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// 6. SlideMenu
export const SlideMenu = ({ isOpen, children, style, ...props }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    style={{ overflow: "hidden", ...style }}
    {...props}
  >
    {children}
  </motion.div>
);

// 7. MobileDrawer
export const MobileDrawer = ({ isOpen, onClose, children, style, inline = false, ...props }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: inline ? "absolute" : "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 999
          }}
        />
        {/* Drawer panel */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          style={{
            position: inline ? "absolute" : "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: "80vh",
            background: "#0c0c14",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            padding: "24px",
            zIndex: 1000,
            ...style
          }}
          {...props}
        >
          {/* Drag handle */}
          <div style={{ width: "40px", height: "4px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "2px", margin: "0 auto 16px" }} />
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// 8. MegaMenu
export const MegaMenu = ({ trigger, children, style, ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "inline-block", ...style }}
      {...props}
    >
      <span style={{ cursor: "pointer", color: hovered ? "#fff" : "#94a3b8" }}>{trigger}</span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: "absolute",
              left: "-100px",
              top: "100%",
              width: "450px",
              background: "#0c0c14",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "24px",
              marginTop: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              zIndex: 99
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 9. CircularMenu (Fires buttons radially)
export const CircularMenu = ({ icon = "+", items = [], style, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative", width: "50px", height: "50px", ...style }} {...props}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 135 : 0 }}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#6366f1",
          color: "#fff",
          fontSize: "1.5rem",
          border: "none",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        {icon}
      </motion.button>
      <AnimatePresence>
        {isOpen &&
          items.map((item, idx) => {
            const angle = (idx * (360 / items.length) * Math.PI) / 180;
            const dist = 70; // radial offset
            const targetX = Math.cos(angle) * dist;
            const targetY = Math.sin(angle) * dist;
            return (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ scale: 1, opacity: 1, x: targetX, y: targetY }}
                exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "10px",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  zIndex: 9
                }}
              >
                {item}
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
};

// 10. DockMenu (macOS scale proximity dock)
export const DockMenu = ({ items = [], style, ...props }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "12px",
        padding: "10px 20px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px",
        width: "fit-content",
        height: "60px",
        ...style
      }}
      {...props}
    >
      {items.map((item, idx) => {
        let scale = 1;
        if (hoveredIdx !== null) {
          const diff = Math.abs(idx - hoveredIdx);
          if (diff === 0) scale = 1.35;
          else if (diff === 1) scale = 1.18;
        }
        return (
          <motion.div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transformOrigin: "bottom center"
            }}
          >
            {item}
          </motion.div>
        );
      })}
    </div>
  );
};
