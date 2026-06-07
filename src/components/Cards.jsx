import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTilt } from "../hooks/useTilt";

// 1. GlassCard
export const GlassCard = ({ children, style, ...props }) => (
  <div
    style={{
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      color: "#ffffff",
      ...style
    }}
    {...props}
  >
    {children}
  </div>
);

// 2. TiltCard
export const TiltCard = ({ children, maxTilt = 12, scale = 1.05, style, ...props }) => {
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
    <div
      ref={ref}
      style={{
        cursor: "pointer",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "24px",
        willChange: "transform",
        ...style,
        ...styles
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// 3. FlipCard
export const FlipCard = ({ front, back, style, ...props }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      style={{ perspective: 1000, width: "100%", height: "200px", cursor: "pointer", ...style }}
      onClick={() => setIsFlipped(!isFlipped)}
      {...props}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Front Side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {front}
        </div>
        {/* Back Side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

// 4. HoverCard
export const HoverCard = ({ title, description, badge = "Details", style, ...props }) => (
  <motion.div
    whileHover="hover"
    style={{
      position: "relative",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      padding: "24px",
      overflow: "hidden",
      cursor: "pointer",
      ...style
    }}
    {...props}
  >
    <h4 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>{title}</h4>
    <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "10px 0 0" }}>{description}</p>
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        hover: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      transition={{ duration: 0.2 }}
      style={{
        marginTop: "16px",
        fontSize: "0.8rem",
        color: "#818cf8",
        fontWeight: 600
      }}
    >
      {badge} &rarr;
    </motion.div>
  </motion.div>
);

// 5. GlowCard
export const GlowCard = ({ children, glowColor = "rgba(99, 102, 241, 0.4)", style, ...props }) => (
  <motion.div
    whileHover={{
      borderColor: glowColor,
      boxShadow: `0 0 20px 2px ${glowColor}`
    }}
    transition={{ duration: 0.3 }}
    style={{
      borderRadius: "16px",
      background: "#08080c",
      border: "1px solid rgba(255,255,255,0.07)",
      padding: "24px",
      cursor: "pointer",
      transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      ...style
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// 6. ExpandCard
export const ExpandCard = ({ title, description, collapsedContent, expandedContent, style, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px",
        cursor: "pointer",
        overflow: "hidden",
        width: "100%",
        ...style
      }}
      {...props}
    >
      <motion.h4 layout="position" style={{ margin: 0, fontSize: "1.2rem" }}>
        {title}
      </motion.h4>
      <motion.p layout="position" style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "5px 0 0" }}>
        {description}
      </motion.p>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "14px" }}
          >
            {expandedContent}
          </motion.div>
        ) : (
          collapsedContent && (
            <motion.div style={{ marginTop: "10px" }}>{collapsedContent}</motion.div>
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 7. MagneticCard
export const MagneticCard = ({ children, range = 50, strength = 0.25, style, ...props }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(x * x + y * y);
    if (dist < range) {
      setCoords({ x: x * strength, y: y * strength });
    } else {
      setCoords({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: coords.x, y: coords.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "24px",
        cursor: "pointer",
        ...style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// 8. 3DCard (Layered depth displacement)
export const ThreeDCard = ({ children, style, ...props }) => {
  const containerRef = useRef(null);
  const tilt = useTilt(containerRef, { maxTilt: 15, scale: 1.03 });
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const update = () => {
      setStyles({
        transform: `perspective(${tilt.perspective}px) rotateX(${tilt.rotateX.get()}deg) rotateY(${tilt.rotateY.get()}deg) scale(${tilt.scale.get()})`,
        transition: "transform 0.1s ease-out"
      });
    };
    const cleanups = [tilt.rotateX.onChange(update), tilt.rotateY.onChange(update), tilt.scale.onChange(update)];
    return () => cleanups.forEach((c) => c());
  }, [tilt]);

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: "20px",
        background: "rgba(10,10,15,0.8)",
        border: "1px solid rgba(255,255,255,0.05)",
        padding: "24px",
        perspective: "1000px",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        ...style,
        ...styles
      }}
      {...props}
    >
      {/* 3D offset elements */}
      <div style={{ transform: "translateZ(30px)", transition: "transform 0.1s ease-out" }}>{children}</div>
    </div>
  );
};

// 9. AnimatedProfileCard
export const AnimatedProfileCard = ({ avatar, name, role, socials = [], style, ...props }) => (
  <motion.div
    whileHover="hover"
    style={{
      borderRadius: "20px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      padding: "30px 24px",
      textAlign: "center",
      cursor: "pointer",
      ...style
    }}
    {...props}
  >
    <motion.div
      variants={{ hover: { scale: 1.08, borderColor: "#6366f1" } }}
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        border: "3px solid rgba(255,255,255,0.1)",
        margin: "0 auto 16px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.05)"
      }}
    >
      {avatar ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
        <span style={{ fontSize: "2rem", fontWeight: 700 }}>{name[0]}</span>
      )}
    </motion.div>
    <h4 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700 }}>{name}</h4>
    <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "4px 0 20px" }}>{role}</p>
    <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          variants={{
            hover: { y: -4, color: "#fff" }
          }}
          style={{
            color: "#94a3b8",
            fontSize: "0.85rem",
            textDecoration: "none",
            background: "rgba(255,255,255,0.03)",
            padding: "4px 10px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          {social.name}
        </motion.a>
      ))}
    </div>
  </motion.div>
);

// 10. ProductCard
export const ProductCard = ({ image, title, price, tag = "New", style, ...props }) => (
  <motion.div
    whileHover="hover"
    style={{
      borderRadius: "20px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
      cursor: "pointer",
      ...style
    }}
    {...props}
  >
    <div style={{ position: "relative", height: "180px", overflow: "hidden", background: "rgba(255,255,255,0.05)" }}>
      {image ? (
        <motion.img
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.3 }}
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center", color: "#64748b" }}>
          Product Image
        </div>
      )}
      <span
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          backgroundColor: "#6366f1",
          color: "#fff",
          fontSize: "0.75rem",
          fontWeight: 700,
          padding: "3px 8px",
          borderRadius: "6px"
        }}
      >
        {tag}
      </span>
    </div>
    <div style={{ padding: "20px" }}>
      <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h4>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>
        <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>{price}</span>
        <motion.button
          variants={{ hover: { backgroundColor: "#c084fc", scale: 1.05 } }}
          style={{
            border: "none",
            backgroundColor: "#6366f1",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Add to Cart
        </motion.button>
      </div>
    </div>
  </motion.div>
);

// 11. PricingCard
export const PricingCard = ({ plan, price, period = "mo", features = [], isPopular = false, style, ...props }) => (
  <motion.div
    whileHover={{ y: -8 }}
    style={{
      borderRadius: "24px",
      background: isPopular ? "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(10,10,15,0.9) 100%)" : "rgba(255,255,255,0.02)",
      border: isPopular ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.06)",
      padding: "32px 24px",
      cursor: "pointer",
      position: "relative",
      ...style
    }}
    {...props}
  >
    {isPopular && (
      <span
        style={{
          position: "absolute",
          top: "-12px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#6366f1",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "0.75rem",
          fontWeight: 700,
          boxShadow: "0 4px 10px rgba(99, 102, 241, 0.4)"
        }}
      >
        MOST POPULAR
      </span>
    )}
    <h4 style={{ margin: 0, fontSize: "1.1rem", color: isPopular ? "#818cf8" : "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
      {plan}
    </h4>
    <div style={{ margin: "20px 0" }}>
      <span style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff" }}>{price}</span>
      <span style={{ color: "#64748b", fontSize: "0.95rem" }}>/{period}</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
      {features.map((feat, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#cbd5e1" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {feat}
        </div>
      ))}
    </div>
    <button
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "12px",
        border: "none",
        backgroundColor: isPopular ? "#6366f1" : "rgba(255,255,255,0.05)",
        color: "#fff",
        fontWeight: 600,
        fontSize: "0.9rem",
        cursor: "pointer"
      }}
    >
      Get Started
    </button>
  </motion.div>
);
