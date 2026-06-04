import React, { useRef, useEffect, useState } from "react";

/**
 * GravityButton - Fun physics-driven gravity button.
 * Pulls downward and bounces against a boundary when hovered.
 * Launches upward with an impulse when clicked, falling and settling under gravity.
 * Driven entirely via requestAnimationFrame loops for smooth performance.
 */
export const GravityButton = ({
  children,
  gravity = 0.5,
  bounce = 0.55,
  floor = 22, // Max drop distance in pixels
  style,
  className,
  ...props
}) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const yRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameId = useRef(null);

  // Starts the physics update loop
  const updatePhysics = () => {
    let y = yRef.current;
    let velocity = velocityRef.current;

    // Apply gravity
    velocity += gravity;
    y += velocity;

    // Collision with bottom floor
    if (y >= floor) {
      y = floor;
      velocity = -velocity * bounce; // Reverse direction and dampen velocity

      // If velocity is negligible, settle at the floor
      if (Math.abs(velocity) < 0.55) {
        velocity = 0;
        y = floor;
      }
    }

    yRef.current = y;
    velocityRef.current = velocity;

    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate3d(0px, ${y.toFixed(2)}px, 0px)`;
    }

    // Continue loop if not settled
    if (y < floor || velocity !== 0) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      cancelAnimationFrame(animFrameId.current);
    }
  };

  // Triggers an upward jump impulse when clicked
  const handleMouseDown = (e) => {
    if (props.onMouseDown) props.onMouseDown(e);

    cancelAnimationFrame(animFrameId.current);
    // Negative velocity is upward
    velocityRef.current = -8; 
    animFrameId.current = requestAnimationFrame(updatePhysics);
  };

  useEffect(() => {
    if (isHovered) {
      cancelAnimationFrame(animFrameId.current);
      // Start falling
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      // Snap back to top when mouse leaves
      cancelAnimationFrame(animFrameId.current);
      
      const snapBack = () => {
        let y = yRef.current;
        y += (0 - y) * 0.22; // Spring-like snapping return to 0
        yRef.current = y;
        velocityRef.current = 0;

        if (buttonRef.current) {
          buttonRef.current.style.transform = `translate3d(0px, ${y.toFixed(2)}px, 0px)`;
        }

        if (Math.abs(y) > 0.05) {
          animFrameId.current = requestAnimationFrame(snapBack);
        } else {
          yRef.current = 0;
          if (buttonRef.current) {
            buttonRef.current.style.transform = "translate3d(0px, 0px, 0px)";
          }
        }
      };

      animFrameId.current = requestAnimationFrame(snapBack);
    }

    return () => cancelAnimationFrame(animFrameId.current);
  }, [isHovered, gravity, bounce, floor]);

  const baseStyle = {
    display: "inline-block",
    willChange: "transform",
    cursor: "pointer",
    userSelect: "none",
    ...style,
  };

  return (
    <div
      ref={buttonRef}
      style={baseStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {children}
    </div>
  );
};
