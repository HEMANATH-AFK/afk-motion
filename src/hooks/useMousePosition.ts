import { useState, useEffect, useRef, RefObject } from "react";

export interface MousePosition {
  x: number; // Client X
  y: number; // Client Y
  elementX: number; // Mouse X relative to target element left boundary
  elementY: number; // Mouse Y relative to target element top boundary
  centerX: number; // Mouse X relative to target element center
  centerY: number; // Mouse Y relative to target element center
  isHovered: boolean;
}

/**
 * Tracks mouse position relative to a target element or window.
 * Provides both standard state updates and a listener callback model for high-performance direct DOM updates.
 */
export function useMousePosition(ref?: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    centerX: 0,
    centerY: 0,
    isHovered: false,
  });

  const positionRef = useRef<MousePosition>(position);
  const listenersRef = useRef<Set<(pos: MousePosition) => void>>(new Set());

  const onChange = (callback: (pos: MousePosition) => void) => {
    listenersRef.current.add(callback);
    return () => {
      listenersRef.current.delete(callback);
    };
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      let elementX = 0;
      let elementY = 0;
      let centerX = 0;
      let centerY = 0;
      let isHovered = false;

      const element = ref?.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        isHovered =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        elementX = clientX - rect.left;
        elementY = clientY - rect.top;
        centerX = elementX - rect.width / 2;
        centerY = elementY - rect.height / 2;
      } else {
        // Window tracking
        isHovered = true;
      }

      const nextPos: MousePosition = {
        x: clientX,
        y: clientY,
        elementX,
        elementY,
        centerX,
        centerY,
        isHovered,
      };

      positionRef.current = nextPos;
      listenersRef.current.forEach((cb) => cb(nextPos));
      setPosition(nextPos);
    };

    const handleMouseLeave = () => {
      const nextPos: MousePosition = {
        x: positionRef.current.x,
        y: positionRef.current.y,
        elementX: 0,
        elementY: 0,
        centerX: 0,
        centerY: 0,
        isHovered: false,
      };
      positionRef.current = nextPos;
      listenersRef.current.forEach((cb) => cb(nextPos));
      setPosition(nextPos);
    };

    const element = ref?.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove, { passive: true });
      element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    } else {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [ref]);

  return {
    position,
    onChange,
    get: () => positionRef.current,
  };
}
