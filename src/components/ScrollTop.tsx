import React, { useRef, useEffect, HTMLAttributes } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

export interface ScrollTopProps extends HTMLAttributes<HTMLButtonElement> {
  /** Size of the button in pixels (width/height) */
  size?: number;
  /** Scroll threshold (in px) before showing the button */
  threshold?: number;
  /** Duration of scroll animation in ms */
  duration?: number;
  /** Enable circular scroll progress ring */
  progressRing?: boolean;
  /** Color of the progress ring track */
  progressColor?: string;
  /** Width of the progress ring stroke */
  strokeWidth?: number;
  /** Enable glassmorphism design */
  glass?: boolean;
  /** Custom scroll easing function (takes progress 0-1 and returns eased value) */
  easing?: (t: number) => number;
  /** Enable floating mode (positions button fixed bottom right) */
  floating?: boolean;
  /** Custom icon component or SVG. If omitted, renders the premium dot arrow. */
  icon?: React.ReactNode;
}

// Default cubic ease-in-out curve
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * ScrollTop - A highly-customizable scroll-to-top button.
 * Incorporates a circular scroll progress tracker, glassmorphism themes,
 * custom icons (renders a dotted arrow by default), and smooth easing scroll loops.
 * Employs direct DOM updates for optimal 60fps performance during scrolling.
 */
export const ScrollTop: React.FC<ScrollTopProps> = ({
  size = 60,
  threshold = 300,
  duration = 800,
  progressRing = true,
  progressColor = "#ffffff",
  strokeWidth = 3,
  glass = true,
  easing = easeInOutCubic,
  floating = true,
  icon,
  style,
  className,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const { onChange } = useScrollProgress();

  // SVG Circle Calculations
  const radius = (size - strokeWidth) / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  // Custom smooth scroll animation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e);

    const start = window.scrollY;
    const target = 0;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressVal = Math.min(elapsed / duration, 1);
      const eased = easing(progressVal);

      window.scrollTo(0, start + change * eased);

      if (progressVal < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const button = buttonRef.current;
    const progressCircle = progressCircleRef.current;
    if (!button) return;

    // Direct DOM manipulation on scroll to update opacity, scale, and progress ring offset
    return onChange(({ scrollY, scrollProgress }) => {
      const shouldShow = scrollY > threshold;

      // Handle visibility transitions
      button.style.opacity = shouldShow ? "1" : "0";
      button.style.transform = shouldShow ? "scale(1)" : "scale(0.85)";
      button.style.pointerEvents = shouldShow ? "all" : "none";

      // Handle progress ring strokeoffset
      if (progressRing && progressCircle) {
        const offset = circumference - scrollProgress * circumference;
        progressCircle.style.strokeDashoffset = `${offset}px`;
      }
    });
  }, [onChange, threshold, circumference, progressRing]);

  // Combined styling
  const buttonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    border: glass ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid #e2e8f0",
    backgroundColor: glass ? "rgba(255, 255, 255, 0.08)" : "#ffffff",
    color: glass ? "#ffffff" : "#1e293b",
    cursor: "pointer",
    outline: "none",
    padding: 0,
    willChange: "transform, opacity",
    transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease",
    boxShadow: glass
      ? "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    backdropFilter: glass ? "blur(12px)" : undefined,
    WebkitBackdropFilter: glass ? "blur(12px)" : undefined,
    ...(floating
      ? {
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 99,
        }
      : {
          position: "relative",
        }),
    ...style,
  };

  // Render default dotted arrow matching the visual guidelines
  const defaultIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="currentColor"
      style={{
        display: "block",
        transition: "transform 0.2s ease",
      }}
    >
      {/* Arrow Head */}
      <circle cx="24" cy="15" r="2.5" />
      <circle cx="20" cy="19" r="2.5" />
      <circle cx="24" cy="19" r="2.5" />
      <circle cx="28" cy="19" r="2.5" />
      <circle cx="16" cy="23" r="2.5" />
      <circle cx="20" cy="23" r="2.5" />
      <circle cx="24" cy="23" r="2.5" />
      <circle cx="28" cy="23" r="2.5" />
      <circle cx="32" cy="23" r="2.5" />
      {/* Arrow Stem */}
      <circle cx="24" cy="27" r="2.5" />
      <circle cx="24" cy="31" r="2.5" />
      <circle cx="24" cy="35" r="2.5" />
    </svg>
  );

  return (
    <button
      ref={buttonRef}
      style={buttonStyle}
      onClick={handleClick}
      className={cn("afk-scroll-top", className)}
      aria-label="Scroll to top"
      {...props}
    >
      {/* Scroll Progress Ring overlay */}
      {progressRing && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
            pointerEvents: "none",
          }}
          width={size}
          height={size}
        >
          {/* Base track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={glass ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}
            strokeWidth={strokeWidth}
          />
          {/* Active progress */}
          <circle
            ref={progressCircleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}px`}
            strokeDashoffset={`${circumference}px`}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.08s linear",
            }}
          />
        </svg>
      )}

      {/* Button Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon || defaultIcon}
      </div>
    </button>
  );
};

// Internal utility class name joiner in case cn.ts is not fully imported
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
