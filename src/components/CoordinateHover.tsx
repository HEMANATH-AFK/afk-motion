import React, { useRef, useEffect, HTMLAttributes } from "react";
import { useTilt, TiltOptions } from "../hooks/useTilt";

export interface CoordinateHoverProps extends HTMLAttributes<HTMLDivElement>, TiltOptions {
  /** Enable mouse spotlight glow overlay */
  glow?: boolean;
  /** Color of the glow spotlight */
  glowColor?: string;
  /** Radius of the glow spotlight in pixels */
  glowSize?: number;
  /** Enable dynamic shadow displacement away from the cursor */
  shadow?: boolean;
  /** Color of the drop shadow */
  shadowColor?: string;
}

/**
 * CoordinateHover - A high-performance 3D hover interaction component.
 * Tracks mouse position inside the element to generate realistic 3D tilt,
 * cursor-following spotlight glow, and dynamic shadow displacement.
 * Bypasses React re-renders using springs and direct DOM updates.
 */
export const CoordinateHover: React.FC<CoordinateHoverProps> = ({
  children,
  maxTilt = 15,
  scale = 1.05,
  perspective = 1000,
  stiffness = 150,
  damping = 15,
  glow = true,
  glowColor = "rgba(255, 255, 255, 0.12)",
  glowSize = 350,
  shadow = true,
  shadowColor = "rgba(0, 0, 0, 0.4)",
  style,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tilt = useTilt(containerRef, { maxTilt, scale, perspective, stiffness, damping });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial custom properties for styling
    container.style.setProperty("--glow-size", `${glowSize}px`);
    container.style.setProperty("--glow-color", glowColor);

    // Subscribe to spring value changes to update CSS custom variables & transforms directly
    const cleanups = [
      tilt.rotateX.onChange((rx) => {
        container.style.setProperty("--tilt-x", `${rx.toFixed(2)}deg`);
        updateTransform();
      }),
      tilt.rotateY.onChange((ry) => {
        container.style.setProperty("--tilt-y", `${ry.toFixed(2)}deg`);
        updateTransform();
      }),
      tilt.scale.onChange((s) => {
        container.style.setProperty("--scale", s.toFixed(3));
        updateTransform();
      }),
      tilt.glowX.onChange((gx) => {
        container.style.setProperty("--glow-x", `${gx.toFixed(1)}%`);
      }),
      tilt.glowY.onChange((gy) => {
        container.style.setProperty("--glow-y", `${gy.toFixed(1)}%`);
      }),
      tilt.shadowX.onChange((sx) => {
        container.style.setProperty("--shadow-x", `${sx.toFixed(1)}px`);
        updateShadow();
      }),
      tilt.shadowY.onChange((sy) => {
        container.style.setProperty("--shadow-y", `${sy.toFixed(1)}px`);
        updateShadow();
      }),
    ];

    const updateTransform = () => {
      const rx = container.style.getPropertyValue("--tilt-x") || "0deg";
      const ry = container.style.getPropertyValue("--tilt-y") || "0deg";
      const s = container.style.getPropertyValue("--scale") || "1";
      container.style.transform = `perspective(${perspective}px) rotateX(${rx}) rotateY(${ry}) scale3d(${s}, ${s}, 1)`;
    };

    const updateShadow = () => {
      if (!shadow) return;
      const sx = container.style.getPropertyValue("--shadow-x") || "0px";
      const sy = container.style.getPropertyValue("--shadow-y") || "0px";
      // Map shadow depth based on how much it is currently scaled/tilted
      container.style.boxShadow = `${sx} ${sy} 35px 0px ${shadowColor}`;
    };

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [tilt, perspective, glow, glowColor, glowSize, shadow, shadowColor]);

  // Direct CSS styling
  const mergedStyle: React.CSSProperties = {
    position: "relative",
    willChange: "transform, box-shadow",
    transformStyle: "preserve-3d",
    // Transition helps smooth initial mouse entry and final mouse leave snap back
    transition: "transform 0.1s ease-out, box-shadow 0.15s ease",
    ...style,
  };

  return (
    <div
      ref={containerRef}
      style={mergedStyle}
      className={className}
      {...props}
    >
      {/* Spotlight Glow Overlay */}
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: 10,
            background: "radial-gradient(var(--glow-size) circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color), transparent)",
            mixBlendMode: "screen",
          }}
        />
      )}
      {children}
    </div>
  );
};
