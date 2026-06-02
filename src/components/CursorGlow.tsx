import React, { useRef, useEffect, HTMLAttributes } from "react";
import { useSpringValue } from "../hooks/useSpring";

export interface CursorGlowProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the glow blob in pixels (default: 300) */
  size?: number;
  /** Color of the radial gradient glow */
  color?: string;
  /** Blur filter strength in pixels (default: 60) */
  blur?: number;
  /** If true, tracks global window. If false, tracks its parent container (default: false) */
  global?: boolean;
  /** Scale factor of the glow blob when hovering interactive elements (buttons, links) */
  hoverScale?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

/**
 * CursorGlow - Responsive cursor follower glow spotlight.
 * Follows the mouse position (either globally or bounded inside its parent container).
 * Expands dynamically when the mouse hovers over interactive elements.
 * Runs on direct DOM transforms and spring loops for maximum performance (60fps).
 */
export const CursorGlow: React.FC<CursorGlowProps> = ({
  size = 300,
  color = "rgba(99, 102, 241, 0.15)",
  blur = 60,
  global = false,
  hoverScale = 1.4,
  stiffness = 80,
  damping = 15,
  style,
  className,
  ...props
}) => {
  const glowRef = useRef<HTMLDivElement>(null);

  // Spring values for coordinates and scaling
  const xSpring = useSpringValue(0, { stiffness, damping });
  const ySpring = useSpringValue(0, { stiffness, damping });
  const scaleSpring = useSpringValue(1, { stiffness, damping });

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Detect parent target
    const target = global ? window : glow.parentElement;
    if (!target) return;

    // Direct DOM transformation updates on spring changes
    const updateStyle = () => {
      const x = xSpring.get();
      const y = ySpring.get();
      const s = scaleSpring.get();
      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) scale(${s.toFixed(3)})`;
    };

    const cleanups = [
      xSpring.onChange(updateStyle),
      ySpring.onChange(updateStyle),
      scaleSpring.onChange(updateStyle),
    ];

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { clientX, clientY } = mouseEvent;

      if (global) {
        // Global coordinates centered on cursor
        xSpring.set(clientX - size / 2);
        ySpring.set(clientY - size / 2);
      } else {
        // Local coordinates relative to parent container
        const parent = glow.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const elementX = clientX - rect.left;
        const elementY = clientY - rect.top;
        xSpring.set(elementX - size / 2);
        ySpring.set(elementY - size / 2);
      }
    };

    // Detect interactions to scale glow
    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest("button, a, [data-interactive]")) {
        scaleSpring.set(hoverScale);
      } else {
        scaleSpring.set(1);
      }
    };

    const handleMouseLeave = () => {
      // Hide or return local glow to center when leaving parent container
      if (!global) {
        const parent = glow.parentElement;
        if (!parent) return;
        xSpring.set(parent.clientWidth / 2 - size / 2);
        ySpring.set(parent.clientHeight / 2 - size / 2);
        scaleSpring.set(0); // Shrink to hide
      }
    };

    const handleMouseEnter = () => {
      if (!global) {
        scaleSpring.set(1);
      }
    };

    // Attach listeners
    if (global) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseover", handleMouseOver, { passive: true });
    } else {
      const parent = glow.parentElement;
      if (parent) {
        // Ensure parent has relative/absolute positioning so absolute child works
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.position === "static") {
          parent.style.position = "relative";
        }
        parent.addEventListener("mousemove", handleMouseMove, { passive: true });
        parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        parent.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        parent.addEventListener("mouseover", handleMouseOver, { passive: true });

        // Position initial state in center of parent
        xSpring.set(parent.clientWidth / 2 - size / 2);
        ySpring.set(parent.clientHeight / 2 - size / 2);
      }
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      if (global) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
      } else {
        const parent = glow.parentElement;
        if (parent) {
          parent.removeEventListener("mousemove", handleMouseMove);
          parent.removeEventListener("mouseleave", handleMouseLeave);
          parent.removeEventListener("mouseenter", handleMouseEnter);
          parent.removeEventListener("mouseover", handleMouseOver);
        }
      }
    };
  }, [global, size, hoverScale, xSpring, ySpring, scaleSpring]);

  const glowStyle: React.CSSProperties = {
    position: global ? "fixed" : "absolute",
    top: 0,
    left: 0,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    filter: `blur(${blur}px)`,
    pointerEvents: "none",
    zIndex: global ? 9999 : 0,
    willChange: "transform",
    transition: "transform 0.08s ease-out",
    ...style,
  };

  return (
    <div
      ref={glowRef}
      style={glowStyle}
      className={className}
      {...props}
    />
  );
};
