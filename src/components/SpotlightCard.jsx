import React, { useRef, useEffect } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { useSpringValue } from "../hooks/useSpring";

/**
 * SpotlightCard - Premium border and background spotlight card.
 * Projects a cursor-following radial glow on both the card background and its borders.
 * Uses passive listeners and spring values for optimal performance.
 */
export const SpotlightCard = ({
  children,
  glowColor = "rgba(139, 92, 246, 0.12)",
  borderGlowColor = "rgba(139, 92, 246, 0.35)",
  glowSize = 300,
  stiffness = 120,
  damping = 15,
  style,
  className,
  ...props
}) => {
  const containerRef = useRef(null);
  const { onChange } = useMousePosition(containerRef);

  // Springs tracking local coordinates relative to the card
  const xSpring = useSpringValue(0, { stiffness, damping });
  const ySpring = useSpringValue(0, { stiffness, damping });
  const opacitySpring = useSpringValue(0, { stiffness, damping });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateGlowPosition = () => {
      const x = xSpring.get();
      const y = ySpring.get();
      const opacity = opacitySpring.get();

      container.style.setProperty("--glow-x", `${x.toFixed(1)}px`);
      container.style.setProperty("--glow-y", `${y.toFixed(1)}px`);
      container.style.setProperty("--glow-opacity", opacity.toFixed(3));
    };

    const cleanups = [
      xSpring.onChange(updateGlowPosition),
      ySpring.onChange(updateGlowPosition),
      opacitySpring.onChange(updateGlowPosition),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [xSpring, ySpring, opacitySpring]);

  useEffect(() => {
    return onChange((pos) => {
      if (pos.isHovered) {
        xSpring.set(pos.elementX);
        ySpring.set(pos.elementY);
        opacitySpring.set(1);
      } else {
        opacitySpring.set(0);
      }
    });
  }, [onChange, xSpring, ySpring, opacitySpring]);

  const containerStyle = {
    position: "relative",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.03)",
    padding: "1px", // Serves as the thin border glow width
    overflow: "hidden",
    backgroundImage: `radial-gradient(${glowSize}px circle at var(--glow-x, 0px) var(--glow-y, 0px), ${borderGlowColor}, transparent)`,
    transition: "background-image 0.1s ease",
    ...style,
  };

  const innerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "23px", // Fits inside the 24px border radius
    background: "#0c0c14",
    padding: "2rem",
    zIndex: 1,
    overflow: "hidden",
  };

  const glowOverlayStyle = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    opacity: "var(--glow-opacity, 0)",
    background: `radial-gradient(${glowSize}px circle at var(--glow-x, 0px) var(--glow-y, 0px), ${glowColor}, transparent)`,
    transition: "opacity 0.2s ease",
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={className}
      {...props}
    >
      <div style={innerStyle}>
        <div style={glowOverlayStyle} />
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>
    </div>
  );
};
