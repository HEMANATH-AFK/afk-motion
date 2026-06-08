import React, { useRef, useEffect, useState } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

// Default cubic ease-in-out curve
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * ScrollTop - A highly-customizable scroll-to-top button.
 * Incorporates a circular scroll progress tracker, glassmorphism themes,
 * custom icons (renders a dotted arrow by default), and smooth easing scroll loops.
 * Employs direct DOM updates for optimal 60fps performance during scrolling.
 */
export const ScrollTop = ({
  variant = "circle", // "circle" | "minimal" | "percentage" | "linear" | "dotted" | "square" | "glow"
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
  const buttonRef = useRef(null);
  const progressCircleRef = useRef(null);
  const squareProgressRef = useRef(null);
  const percentRef = useRef(null);
  const linearProgressRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { onChange } = useScrollProgress();

  // Scope unique mask ID per component instance
  const uniqueMaskIdRef = useRef("");
  if (!uniqueMaskIdRef.current) {
    uniqueMaskIdRef.current = `dotted-mask-${Math.random().toString(36).substring(2, 9)}`;
  }
  const maskId = uniqueMaskIdRef.current;

  // SVG Circle Calculations
  const radius = (size - strokeWidth) / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  // SVG Square Calculations
  const rectWidth = size - strokeWidth - 8;
  const rectHeight = size - strokeWidth - 8;
  const perimeter = 2 * (rectWidth + rectHeight);

  // Custom smooth scroll animation
  const handleClick = (e) => {
    if (props.onClick) props.onClick(e);

    const start = window.scrollY;
    const target = 0;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
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

    // Direct DOM manipulation on scroll to update opacity, scale/translate, and progress values
    return onChange(({ scrollY, scrollProgress }) => {
      const shouldShow = scrollY > threshold;

      // Handle visibility transitions
      button.style.opacity = shouldShow ? "1" : "0";
      
      if (variant === "linear") {
        button.style.transform = shouldShow 
          ? "translate3d(0, 0, 0)" 
          : "translate3d(0, 100%, 0)";
      } else {
        button.style.transform = shouldShow 
          ? (isHovered ? "scale(1.08)" : "scale(1)") 
          : "scale(0.85)";
      }
      
      button.style.pointerEvents = shouldShow ? "all" : "none";

      // Handle progress ring strokeoffset (circle, dotted, and glow variants)
      if ((variant === "circle" || variant === "dotted" || variant === "glow") && progressRing && progressCircle) {
        const offset = circumference - scrollProgress * circumference;
        progressCircle.style.strokeDashoffset = `${offset}px`;
      }

      // Handle square progress border (square variant)
      if (variant === "square" && progressRing && squareProgressRef.current) {
        const offset = perimeter - scrollProgress * perimeter;
        squareProgressRef.current.style.strokeDashoffset = `${offset}px`;
      }

      // Handle percentage text (percentage variant)
      if (variant === "percentage" && percentRef.current) {
        percentRef.current.textContent = `${Math.round(scrollProgress * 100)}%`;
      }

      // Handle linear progress bar width (linear variant)
      if (variant === "linear" && linearProgressRef.current) {
        linearProgressRef.current.style.width = `${scrollProgress * 100}%`;
      }
    });
  }, [onChange, threshold, circumference, perimeter, progressRing, isHovered, variant]);

  // Combined styling
  const isLinear = variant === "linear";
  const isDotted = variant === "dotted";
  const isSquare = variant === "square";
  const isGlow = variant === "glow";

  const buttonStyle = isLinear
    ? {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "48px",
        zIndex: 99,
        borderTop: glass ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid #e2e8f0",
        backgroundColor: glass ? "rgba(10, 10, 15, 0.9)" : "#ffffff",
        color: glass ? "#ffffff" : "#1e293b",
        cursor: "pointer",
        outline: "none",
        padding: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        fontSize: "0.875rem",
        fontWeight: 500,
        willChange: "transform, opacity",
        transform: "translate3d(0, 100%, 0)",
        opacity: 0,
        transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease",
        backdropFilter: glass ? "blur(16px)" : undefined,
        WebkitBackdropFilter: glass ? "blur(16px)" : undefined,
        boxShadow: "0 -5px 30px rgba(0, 0, 0, 0.3)",
        ...style,
      }
    : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: isSquare ? "12px" : "50%",
        border: glass
          ? (isDotted ? "1px dotted rgba(255, 255, 255, 0.3)" : "1px solid rgba(255, 255, 255, 0.15)")
          : "1px solid #e2e8f0",
        backgroundColor: glass ? "rgba(10, 10, 15, 0.8)" : "#ffffff",
        color: glass ? "#ffffff" : "#1e293b",
        cursor: "pointer",
        outline: "none",
        padding: 0,
        willChange: "transform, opacity",
        opacity: 0,
        transform: "scale(0.85)",
        transition: "opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: isGlow
          ? (isHovered 
              ? `0 0 20px ${progressColor}66, 0 0 40px ${progressColor}44, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
              : `0 0 12px ${progressColor}33, 0 0 24px ${progressColor}22, inset 0 1px 0 rgba(255, 255, 255, 0.1)`)
          : (glass
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"),
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

  // Staggered dot animator style helper for default circle icon
  const getDotStyle = (cy) => {
    const delay = (35 - cy) * 0.015;
    return {
      transform: isHovered ? "translate3d(0, -4px, 0)" : "translate3d(0, 0, 0)",
      opacity: isHovered ? 0.6 : 1,
      transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
      transitionDelay: `${delay}s`,
    };
  };

  // Render default dotted arrow matching the visual guidelines (for circle)
  const defaultCircleIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="currentColor"
      style={{
        display: "block",
        overflow: "visible",
      }}
    >
      {/* Arrow Head */}
      <circle cx="24" cy="15" r="2.3" style={getDotStyle(15)} />
      <circle cx="20" cy="19" r="2.3" style={getDotStyle(19)} />
      <circle cx="24" cy="19" r="2.3" style={getDotStyle(19)} />
      <circle cx="28" cy="19" r="2.3" style={getDotStyle(19)} />
      <circle cx="16" cy="23" r="2.3" style={getDotStyle(23)} />
      <circle cx="20" cy="23" r="2.3" style={getDotStyle(23)} />
      <circle cx="24" cy="23" r="2.3" style={getDotStyle(23)} />
      <circle cx="28" cy="23" r="2.3" style={getDotStyle(23)} />
      <circle cx="32" cy="23" r="2.3" style={getDotStyle(23)} />
      {/* Arrow Stem */}
      <circle cx="24" cy="27" r="2.3" style={getDotStyle(27)} />
      <circle cx="24" cy="31" r="2.3" style={getDotStyle(31)} />
      <circle cx="24" cy="35" r="2.3" style={getDotStyle(35)} />
    </svg>
  );

  // Minimal spring arrow
  const minimalIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: isHovered ? "translate3d(0, -4px, 0)" : "translate3d(0, 0, 0)",
        transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );

  // Percentage bubble content
  const percentageContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.75rem",
        fontWeight: "bold",
        lineHeight: 1.1,
      }}
    >
      <span ref={percentRef}>0%</span>
      <span
        style={{
          fontSize: "0.7rem",
          transform: isHovered ? "translate3d(0, -3px, 0)" : "translate3d(0, 0, 0)",
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          marginTop: "2px",
        }}
      >
        ▲
      </span>
    </div>
  );

  // Linear full width bottom bar content
  const linearContent = (
    <>
      <div
        ref={linearProgressRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: `${strokeWidth}px`,
          backgroundColor: progressColor,
          width: "0%",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>Back to Top</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isHovered ? "translate3d(0, -3px, 0)" : "translate3d(0, 0, 0)",
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </>
  );

  return (
    <button
      ref={buttonRef}
      style={buttonStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("afk-scroll-top", className)}
      aria-label="Scroll to top"
      {...props}
    >
      {/* Scroll Progress Ring overlay (only for circle, dotted, and glow variants) */}
      {(variant === "circle" || variant === "dotted" || variant === "glow") && progressRing && (
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
          {variant === "dotted" && (
            <defs>
              <mask id={maskId}>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke="#ffffff"
                  strokeWidth={strokeWidth}
                  strokeDasharray="3 7"
                  strokeLinecap="round"
                />
              </mask>
            </defs>
          )}

          {/* Base track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={glass ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}
            strokeWidth={strokeWidth}
            strokeDasharray={variant === "dotted" ? "3 7" : undefined}
            strokeLinecap={variant === "dotted" ? "round" : undefined}
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
            mask={variant === "dotted" ? `url(#${maskId})` : undefined}
            style={{
              transition: "stroke-dashoffset 0.08s linear",
            }}
          />
        </svg>
      )}

      {/* Scroll Progress Rect overlay (only for square variant) */}
      {variant === "square" && progressRing && (
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
          <rect
            x={(size - rectWidth) / 2}
            y={(size - rectHeight) / 2}
            width={rectWidth}
            height={rectHeight}
            rx={8}
            ry={8}
            fill="transparent"
            stroke={glass ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}
            strokeWidth={strokeWidth}
          />
          {/* Active progress */}
          <rect
            ref={squareProgressRef}
            x={(size - rectWidth) / 2}
            y={(size - rectHeight) / 2}
            width={rectWidth}
            height={rectHeight}
            rx={8}
            ry={8}
            fill="transparent"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${perimeter}px`}
            strokeDashoffset={`${perimeter}px`}
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
        {(variant === "circle" || variant === "dotted" || variant === "glow" || variant === "square") && (icon || defaultCircleIcon)}
        {variant === "minimal" && (icon || minimalIcon)}
        {variant === "percentage" && percentageContent}
        {variant === "linear" && linearContent}
      </div>
    </button>
  );
};

// Internal utility class name joiner in case cn.js is not fully imported
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
