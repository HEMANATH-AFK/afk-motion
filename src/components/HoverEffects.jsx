import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTilt } from "../hooks/useTilt";

// Helper/wrapper to standardize hover structures
export const HoverScale = ({ children, scale = 1.05, duration = 0.2, ...props }) => (
  <motion.div whileHover={{ scale }} transition={{ duration }} style={{ display: "inline-block" }} {...props}>
    {children}
  </motion.div>
);

export const HoverGrow = ({ children, ...props }) => <HoverScale scale={1.12} {...props}>{children}</HoverScale>;
export const HoverShrink = ({ children, ...props }) => <HoverScale scale={0.93} {...props}>{children}</HoverScale>;

export const HoverLift = ({ children, liftDistance = -8, duration = 0.25, ...props }) => (
  <motion.div whileHover={{ y: liftDistance }} transition={{ duration, ease: "easeOut" }} style={{ display: "inline-block" }} {...props}>
    {children}
  </motion.div>
);

export const HoverFloat = ({ children, ...props }) => (
  <motion.div
    whileHover={{
      y: [0, -8, 0],
      transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
    }}
    style={{ display: "inline-block" }}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverTilt = ({ children, maxTilt = 15, scale = 1.04, style, ...props }) => {
  const containerRef = useRef(null);
  const tiltData = useTilt(containerRef, { maxTilt, scale });

  // Convert springs to motion values for style binding
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const updateStyles = () => {
      setStyles({
        transform: `perspective(${tiltData.perspective}px) rotateX(${tiltData.rotateX.get()}deg) rotateY(${tiltData.rotateY.get()}deg) scale(${tiltData.scale.get()})`,
        transition: "transform 0.1s ease-out"
      });
    };

    const cleanups = [
      tiltData.rotateX.onChange(updateStyles),
      tiltData.rotateY.onChange(updateStyles),
      tiltData.scale.onChange(updateStyles)
    ];

    return () => cleanups.forEach((c) => c());
  }, [tiltData]);

  return (
    <div ref={containerRef} style={{ display: "inline-block", cursor: "pointer", ...style, ...styles }} {...props}>
      {children}
    </div>
  );
};

export const HoverRotate = ({ children, angle = 8, ...props }) => (
  <motion.div whileHover={{ rotate: angle }} transition={{ type: "spring", stiffness: 300, damping: 15 }} style={{ display: "inline-block" }} {...props}>
    {children}
  </motion.div>
);

export const HoverFlip = ({ children, axis = "Y", ...props }) => {
  const rotation = axis === "Y" ? { rotateY: 180 } : { rotateX: 180 };
  return (
    <div style={{ perspective: 800, display: "inline-block" }}>
      <motion.div
        whileHover={rotation}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", display: "inline-block" }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const HoverGlow = ({ children, glowColor = "rgba(99, 102, 241, 0.4)", ...props }) => (
  <motion.div
    whileHover={{
      boxShadow: `0 0 25px 5px ${glowColor}`,
      borderColor: "rgba(255,255,255,0.2)"
    }}
    transition={{ duration: 0.3 }}
    style={{ display: "inline-block", transition: "box-shadow 0.3s ease, border-color 0.3s ease" }}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverPulse = ({ children, ...props }) => (
  <motion.div
    whileHover={{
      scale: [1, 1.04, 1],
      transition: { repeat: Infinity, duration: 0.9, ease: "easeInOut" }
    }}
    style={{ display: "inline-block" }}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverShake = ({ children, ...props }) => (
  <motion.div
    whileHover={{
      x: [0, -3, 3, -3, 3, 0],
      rotate: [0, -1, 1, -1, 1, 0],
      transition: { duration: 0.35 }
    }}
    style={{ display: "inline-block" }}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverBounce = ({ children, ...props }) => (
  <motion.div
    whileHover={{
      y: [0, -12, 0, -4, 0],
      transition: { duration: 0.5, ease: "easeOut" }
    }}
    style={{ display: "inline-block" }}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverRipple = ({ children, rippleColor = "rgba(255, 255, 255, 0.15)", style, ...props }) => {
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const addRipple = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={addRipple}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        cursor: "pointer",
        ...style
      }}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: "10px",
            height: "10px",
            background: rippleColor,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            animation: "afk-ripple-effect 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
            pointerEvents: "none"
          }}
        />
      ))}
      <style>{`
        @keyframes afk-ripple-effect {
          0% { width: 0px; height: 0px; opacity: 0.5; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
      `}</style>
      {children}
    </div>
  );
};

export const HoverMagnetic = ({ children, strength = 0.3, range = 100, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
 
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const elementX = e.clientX - (rect.left + rect.width / 2);
    const elementY = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(elementX * elementX + elementY * elementY);
    const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (isInside || dist < range) {
      x.set(elementX * strength);
      y.set(elementY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };
 
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
 
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-block",
        x: springX,
        y: springY,
        willChange: "transform"
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const HoverBorderExpand = ({ children, borderColor = "#6366f1", borderWidth = 2, style, ...props }) => (
  <div
    style={{
      position: "relative",
      padding: "10px 20px",
      cursor: "pointer",
      display: "inline-block",
      ...style
    }}
    {...props}
    className="afk-border-expand-container"
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        border: `${borderWidth}px solid transparent`,
        borderRadius: "inherit",
        transition: "border-color 0.3s ease",
        pointerEvents: "none"
      }}
      className="afk-border-rect"
    />
    <style>{`
      .afk-border-expand-container:hover .afk-border-rect {
        border-color: ${borderColor} !important;
      }
    `}</style>
    {children}
  </div>
);

export const HoverUnderline = ({ children, color = "#6366f1", height = 2, style, ...props }) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      cursor: "pointer",
      paddingBottom: "4px",
      ...style
    }}
    {...props}
    className="afk-underline-container"
  >
    {children}
    <span
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: `${height}px`,
        backgroundColor: color,
        transform: "scaleX(0)",
        transformOrigin: "bottom right",
        transition: "transform 0.3s cubic-bezier(0.86, 0, 0.07, 1)",
        pointerEvents: "none"
      }}
      className="afk-underline-bar"
    />
    <style>{`
      .afk-underline-container:hover .afk-underline-bar {
        transform: scaleX(1) !important;
        transformOrigin: bottom left !important;
      }
    `}</style>
  </span>
);

export const HoverGradientShift = ({ children, gradient = "linear-gradient(135deg, #6366f1, #c084fc, #f472b6)", style, ...props }) => (
  <div
    style={{
      background: gradient,
      backgroundSize: "200% 200%",
      backgroundPosition: "0% 50%",
      transition: "background-position 0.5s ease",
      cursor: "pointer",
      display: "inline-block",
      borderRadius: "8px",
      ...style
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = "100% 50%")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = "0% 50%")}
    {...props}
  >
    {children}
  </div>
);

export const HoverSpotlight = ({ children, glowColor = "rgba(99, 102, 241, 0.18)", glowSize = 150, style, ...props }) => {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        cursor: "pointer",
        ...style
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(${glowSize}px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent)`,
          opacity: coords.opacity,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
};
