import React, { useRef, useEffect, HTMLAttributes } from "react";
import { useMousePosition } from "../hooks/useMousePosition";
import { useSpringValue } from "../hooks/useSpring";

export interface ImageLayer {
  /** Source URL of the image layer */
  src: string;
  /** Movement offset multiplier. Lower numbers shift less (background), higher numbers shift more (foreground) */
  depth: number;
  /** Alternative image text description */
  alt?: string;
}

export interface ImageDepthHoverProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of image layers (can be URLs or layer configs) */
  layers: (string | ImageLayer)[];
  /** Maximum parallax translation offset in pixels */
  maxShift?: number;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** CSS 3D perspective distance */
  perspective?: number;
  /** Spring stiffness coefficient */
  stiffness?: number;
  /** Spring damping coefficient */
  damping?: number;
  /** Enable mouse spotlight glow overlay */
  glow?: boolean;
  /** Color of the spotlight glow overlay */
  glowColor?: string;
}

/**
 * ImageDepthHover - Multi-layer 3D parallax hover card (Apple-TV style).
 * Displays stacked image layers that shift at different speeds based on mouse coordinates.
 * Operates entirely via springs and direct DOM style updates to ensure steady 60fps execution.
 */
export const ImageDepthHover: React.FC<ImageDepthHoverProps> = ({
  layers,
  maxShift = 25,
  maxTilt = 8,
  perspective = 1000,
  stiffness = 120,
  damping = 14,
  glow = true,
  glowColor = "rgba(255, 255, 255, 0.15)",
  style,
  className,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onChange } = useMousePosition(containerRef);

  // Springs tracking normalized cursor location (-1.0 to 1.0)
  const normXSpring = useSpringValue(0, { stiffness, damping });
  const normYSpring = useSpringValue(0, { stiffness, damping });

  const processedLayers: ImageLayer[] = layers.map((layer, index) => {
    if (typeof layer === "string") {
      // Auto-assign depth layer weights. 
      // Background layers shift less, foreground layers shift more.
      const fraction = layers.length > 1 ? index / (layers.length - 1) : 0.5;
      const depth = 0.15 + fraction * 0.85; // maps depth between 0.15 and 1.0
      return { src: layer, depth };
    }
    return layer;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layerElements = container.querySelectorAll<HTMLImageElement>("[data-parallax-layer]");

    const updateTransforms = (nx: number, ny: number) => {
      // Rotate the overall card slightly to match the perspective angle
      const rx = -ny * maxTilt;
      const ry = nx * maxTilt;
      container.style.transform = `perspective(${perspective}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

      // Translate each layer depending on its specific depth
      layerElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute("data-depth") || "0");
        const tx = nx * maxShift * depth;
        const ty = ny * maxShift * depth;
        // Slightly scale closer layers to accentuate distance illusion
        const scaleVal = 1 + depth * 0.04;
        el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0px) scale(${scaleVal.toFixed(3)})`;
      });

      // Update spotlight position
      if (glow) {
        const gx = (nx + 1) * 50;
        const gy = (ny + 1) * 50;
        container.style.setProperty("--glow-x", `${gx.toFixed(1)}%`);
        container.style.setProperty("--glow-y", `${gy.toFixed(1)}%`);
      }
    };

    const cleanups = [
      normXSpring.onChange((nx) => {
        container.style.setProperty("--norm-x", nx.toFixed(3));
        updateTransforms(nx, normYSpring.get());
      }),
      normYSpring.onChange((ny) => {
        container.style.setProperty("--norm-y", ny.toFixed(3));
        updateTransforms(normXSpring.get(), ny);
      }),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [normXSpring, normYSpring, maxShift, maxTilt, perspective, glow, processedLayers.length]);

  useEffect(() => {
    return onChange((pos) => {
      const container = containerRef.current;
      if (!container) return;

      if (pos.isHovered) {
        const rect = container.getBoundingClientRect();
        const nx = pos.centerX / (rect.width / 2);
        const ny = pos.centerY / (rect.height / 2);
        normXSpring.set(nx);
        normYSpring.set(ny);
      } else {
        normXSpring.set(0);
        normYSpring.set(0);
      }
    });
  }, [onChange, normXSpring, normYSpring]);

  const baseStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    willChange: "transform",
    transition: "transform 0.15s ease-out",
    ...style,
  };

  return (
    <div
      ref={containerRef}
      style={baseStyle}
      className={className}
      {...props}
    >
      {processedLayers.map((layer, index) => (
        <img
          key={index}
          src={layer.src}
          alt={layer.alt || `Layer ${index}`}
          data-parallax-layer
          data-depth={layer.depth}
          style={{
            position: index === 0 ? "relative" : "absolute",
            inset: index === 0 ? undefined : 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: "transform 0.15s ease-out",
            zIndex: index + 1,
          }}
        />
      ))}

      {/* Floating Glow Overlay */}
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            zIndex: processedLayers.length + 2,
            background: "radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--glow-color, rgba(255,255,255,0.15)), transparent)",
            mixBlendMode: "screen",
          }}
        />
      )}
      {children}
    </div>
  );
};
