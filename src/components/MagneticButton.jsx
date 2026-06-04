import React, { useRef, useEffect } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { useSpringValue } from "../hooks/useSpring";

/**
 * MagneticButton - Elastic spring attraction button.
 * Pulls the button towards the cursor coordinates when hovered within range.
 * Runs on direct DOM transforms and spring loops for ultra-smooth 60fps response.
 */
export const MagneticButton = ({
  children,
  strength = 0.35,
  range = 45,
  stiffness = 120,
  damping = 12,
  containerClassName,
  containerStyle,
  style,
  className,
  ...props
}) => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const { onChange } = useMousePosition(containerRef);

  const xSpring = useSpringValue(0, { stiffness, damping });
  const ySpring = useSpringValue(0, { stiffness, damping });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const updateTransform = () => {
      const x = xSpring.get();
      const y = ySpring.get();
      button.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`;
    };

    const cleanups = [
      xSpring.onChange(updateTransform),
      ySpring.onChange(updateTransform),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [xSpring, ySpring]);

  useEffect(() => {
    return onChange((pos) => {
      if (pos.isHovered) {
        xSpring.set(pos.centerX * strength);
        ySpring.set(pos.centerY * strength);
      } else {
        xSpring.set(0);
        ySpring.set(0);
      }
    });
  }, [onChange, strength, xSpring, ySpring]);

  // Binds the interactive zone
  const baseContainerStyle = {
    display: "inline-block",
    padding: `${range}px`,
    margin: `-${range}px`, // Offsets padding to keep layout positioning stable
    cursor: "pointer",
    ...containerStyle,
  };

  const baseButtonStyle = {
    display: "inline-block",
    willChange: "transform",
    transition: "transform 0.08s ease-out",
    ...style,
  };

  return (
    <div
      ref={containerRef}
      style={baseContainerStyle}
      className={containerClassName}
    >
      <div
        ref={buttonRef}
        style={baseButtonStyle}
        className={className}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
