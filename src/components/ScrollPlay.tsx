import React, { useRef, useEffect, HTMLAttributes } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

export interface ScrollPlayState {
  /** Opacity level (0.0 to 1.0) */
  opacity?: number;
  /** Translation along Y axis in pixels */
  y?: number;
  /** Translation along X axis in pixels */
  x?: number;
  /** Scale factor (e.g. 1.0) */
  scale?: number;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Blur filter radius in pixels */
  blur?: number;
}

export interface ScrollPlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Initial animation state when hidden or scroll progress is 0 */
  from: ScrollPlayState;
  /** Target animation state when fully active or scroll progress is 1 */
  to: ScrollPlayState;
  /** Animation triggering mode: 'viewport' (runs once on entry) or 'scroll' (scrubs animation based on scroll progress) */
  mode?: "viewport" | "scroll";
  /** If viewport mode, trigger the transition only once */
  once?: boolean;
  /** Viewport intersection threshold ratio (0.0 to 1.0) before triggering */
  threshold?: number;
  /** Duration of transition in ms (for viewport mode) */
  duration?: number;
  /** Delay of transition in ms (for viewport mode) */
  delay?: number;
  /** Easing curve for viewport transition (default: premium cubic-ease) */
  ease?: string;
  /** Multiplier for scroll-driven vertical parallax displacement */
  parallaxSpeed?: number;
}

/**
 * ScrollPlay - Scroll-driven and viewport-triggered animation component.
 * Supports scrubbing transformations proportionally to scroll timeline progress
 * or fading/sliding elements in on screen entry using IntersectionObserver.
 * Operates entirely without heavy animation libraries, maximizing performance.
 */
export const ScrollPlay: React.FC<ScrollPlayProps> = ({
  children,
  from,
  to,
  mode = "viewport",
  once = true,
  threshold = 0.1,
  duration = 800,
  delay = 0,
  ease = "cubic-bezier(0.16, 1, 0.3, 1)",
  parallaxSpeed = 0,
  style,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onChange } = useScrollProgress(containerRef);

  // Helper to construct CSS style string for transforms and filters
  const getStyles = (state: ScrollPlayState, progressVal?: number) => {
    const opacity = state.opacity ?? 1;
    const x = state.x ?? 0;
    let y = state.y ?? 0;
    const scale = state.scale ?? 1;
    const rotate = state.rotate ?? 0;
    const blur = state.blur ?? 0;

    // Apply parallax offset to vertical displacement if scrubbing scroll
    if (progressVal !== undefined && parallaxSpeed !== 0) {
      y += (progressVal - 0.5) * parallaxSpeed;
    }

    return {
      opacity: `${opacity}`,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale}) rotate(${rotate}deg)`,
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (mode === "viewport") {
      // Set initial styles from the 'from' prop
      const initialStyles = getStyles(from);
      container.style.opacity = initialStyles.opacity;
      container.style.filter = initialStyles.filter;
      container.style.transform = initialStyles.transform;
      container.style.transition = `opacity ${duration}ms ${ease} ${delay}ms, filter ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms`;

      // Set up IntersectionObserver to trigger animation
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const activeStyles = getStyles(to);
            container.style.opacity = activeStyles.opacity;
            container.style.filter = activeStyles.filter;
            container.style.transform = activeStyles.transform;

            if (once) {
              observer.unobserve(container);
            }
          } else if (!once) {
            // Reset back to initial state if scrolled out
            container.style.opacity = initialStyles.opacity;
            container.style.filter = initialStyles.filter;
            container.style.transform = initialStyles.transform;
          }
        },
        { threshold }
      );

      observer.observe(container);
      return () => observer.disconnect();
    } else {
      // Scroll-scrubbing mode: Register scroll event and interpolate values
      container.style.transition = "none"; // Disable CSS transitions for raw linear scrubbing

      return onChange(({ elementProgress }) => {
        // Interpolate individual attributes linearly
        const interpolate = (start: number, end: number) =>
          start + (end - start) * elementProgress;

        const currentFrameState: ScrollPlayState = {
          opacity: from.opacity !== undefined && to.opacity !== undefined
            ? interpolate(from.opacity, to.opacity)
            : undefined,
          x: from.x !== undefined && to.x !== undefined
            ? interpolate(from.x, to.x)
            : undefined,
          y: from.y !== undefined && to.y !== undefined
            ? interpolate(from.y, to.y)
            : undefined,
          scale: from.scale !== undefined && to.scale !== undefined
            ? interpolate(from.scale, to.scale)
            : undefined,
          rotate: from.rotate !== undefined && to.rotate !== undefined
            ? interpolate(from.rotate, to.rotate)
            : undefined,
          blur: from.blur !== undefined && to.blur !== undefined
            ? interpolate(from.blur, to.blur)
            : undefined,
        };

        const activeStyles = getStyles(currentFrameState, elementProgress);
        container.style.opacity = activeStyles.opacity;
        container.style.filter = activeStyles.filter;
        container.style.transform = activeStyles.transform;
      });
    }
  }, [mode, once, threshold, duration, delay, ease, from, to, parallaxSpeed, onChange]);

  const baseStyle: React.CSSProperties = {
    willChange: "transform, opacity, filter",
    ...style,
  };

  return (
    <div
      ref={containerRef}
      style={baseStyle}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};
