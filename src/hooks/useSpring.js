import { useRef, useEffect, useCallback, useState } from "react";

/**
 * A ultra-high-performance spring value hook that bypasses React re-renders.
 * It animates an internal value using requestAnimationFrame and exposes a listener pattern
 * so elements can update their styles directly in the DOM.
 */
export function useSpringValue(
  initialValue,
  config = {}
) {
  const { stiffness = 120, damping = 14, mass = 1, precision = 0.001 } = config;

  const currentRef = useRef(initialValue);
  const targetRef = useRef(initialValue);
  const velocityRef = useRef(0);
  const listenersRef = useRef(new Set());

  const animate = useCallback(() => {
    let rAFId;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const velocity = velocityRef.current;

      // F = -k * x - c * v
      const springForce = -stiffness * (current - target);
      const dampingForce = -damping * velocity;
      const acceleration = (springForce + dampingForce) / mass;

      // 16ms frame step integration
      const dt = 0.016;
      velocityRef.current = velocity + acceleration * dt;
      currentRef.current = current + velocityRef.current * dt;

      // Notify listeners
      listenersRef.current.forEach((listener) => listener(currentRef.current));

      // Settle check
      if (
        Math.abs(currentRef.current - target) < precision &&
        Math.abs(velocityRef.current) < precision
      ) {
        currentRef.current = target;
        velocityRef.current = 0;
        listenersRef.current.forEach((listener) => listener(target));
        return;
      }

      rAFId = requestAnimationFrame(tick);
    };

    rAFId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rAFId);
  }, [stiffness, damping, mass, precision]);

  const activeAnimationCleanup = useRef(null);

  const setTarget = useCallback(
    (newTarget) => {
      if (targetRef.current === newTarget) return;
      targetRef.current = newTarget;
      if (activeAnimationCleanup.current) {
        activeAnimationCleanup.current();
      }
      activeAnimationCleanup.current = animate();
    },
    [animate]
  );

  const onChange = useCallback((callback) => {
    listenersRef.current.add(callback);
    return () => {
      listenersRef.current.delete(callback);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (activeAnimationCleanup.current) {
        activeAnimationCleanup.current();
      }
    };
  }, []);

  return {
    get: () => currentRef.current,
    set: setTarget,
    onChange,
  };
}

/**
 * Standard state-based spring hook. Useful when you need React to trigger
 * re-renders upon value change (e.g., text values, inline style changes that React controls).
 */
export function useSpring(
  targetValue,
  config = {}
) {
  const [val, setVal] = useState(targetValue);
  const spring = useSpringValue(targetValue, config);

  useEffect(() => {
    spring.set(targetValue);
  }, [targetValue, spring]);

  useEffect(() => {
    return spring.onChange((latest) => {
      setVal(latest);
    });
  }, [spring]);

  return val;
}
