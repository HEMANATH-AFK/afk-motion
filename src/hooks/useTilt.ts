import { RefObject, useEffect } from "react";
import { useMousePosition } from "./useMousePosition";
import { useSpringValue } from "./useSpring";

export interface TiltOptions {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  stiffness?: number;
  damping?: number;
}

/**
 * Calculates 3D tilt, scale, spotlight (glow) positions, and shadow displacement.
 * Integrates directly with our spring values to avoid component re-renders.
 */
export function useTilt(
  ref: RefObject<HTMLElement | null>,
  options: TiltOptions = {}
) {
  const {
    maxTilt = 15,
    scale = 1.05,
    perspective = 1000,
    stiffness = 150,
    damping = 15,
  } = options;

  const { onChange } = useMousePosition(ref);

  const rotateXSpring = useSpringValue(0, { stiffness, damping });
  const rotateYSpring = useSpringValue(0, { stiffness, damping });
  const scaleSpring = useSpringValue(1, { stiffness, damping });
  const glowXSpring = useSpringValue(50, { stiffness, damping });
  const glowYSpring = useSpringValue(50, { stiffness, damping });
  const shadowXSpring = useSpringValue(0, { stiffness, damping });
  const shadowYSpring = useSpringValue(0, { stiffness, damping });

  useEffect(() => {
    return onChange((pos) => {
      const element = ref.current;
      if (!element) return;

      if (pos.isHovered) {
        const rect = element.getBoundingClientRect();
        // Normalized coordinates from -1 to 1
        const normX = pos.centerX / (rect.width / 2);
        const normY = pos.centerY / (rect.height / 2);

        // Rotate X is driven by Y-offset (negative since moving mouse down tilts card down/forward)
        rotateXSpring.set(-normY * maxTilt);
        rotateYSpring.set(normX * maxTilt);
        scaleSpring.set(scale);

        // Spotlight positions (0% to 100%)
        glowXSpring.set((pos.elementX / rect.width) * 100);
        glowYSpring.set((pos.elementY / rect.height) * 100);

        // Shadow shifts away from cursor position to simulate dynamic light sources
        shadowXSpring.set(-normX * 12);
        shadowYSpring.set(-normY * 12);
      } else {
        rotateXSpring.set(0);
        rotateYSpring.set(0);
        scaleSpring.set(1);
        glowXSpring.set(50);
        glowYSpring.set(50);
        shadowXSpring.set(0);
        shadowYSpring.set(0);
      }
    });
  }, [
    onChange,
    ref,
    maxTilt,
    scale,
    rotateXSpring,
    rotateYSpring,
    scaleSpring,
    glowXSpring,
    glowYSpring,
    shadowXSpring,
    shadowYSpring,
  ]);

  return {
    rotateX: rotateXSpring,
    rotateY: rotateYSpring,
    scale: scaleSpring,
    glowX: glowXSpring,
    glowY: glowYSpring,
    shadowX: shadowXSpring,
    shadowY: shadowYSpring,
    perspective,
  };
}
