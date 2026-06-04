import { useState, useEffect, useRef } from "react";

/**
 * Tracks global or element-specific scroll progress.
 * Optimized with passive listeners and requestAnimationFrame to avoid layout thrashing.
 */
export function useScrollProgress(ref) {
  const [progress, setProgress] = useState({
    scrollY: 0,
    scrollProgress: 0,
    elementProgress: 0,
  });

  const progressRef = useRef(progress);
  const listenersRef = useRef(new Set());

  const onChange = (callback) => {
    listenersRef.current.add(callback);
    return () => {
      listenersRef.current.delete(callback);
    };
  };

  useEffect(() => {
    let rAFId;

    const handleScroll = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

        let elementProgress = 0;
        const element = ref?.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementHeight = rect.height;
          const windowHeight = window.innerHeight;

          // 0.0: Top of element is at bottom of viewport
          // 1.0: Bottom of element is at top of viewport
          const totalDistance = windowHeight + elementHeight;
          const currentDistance = windowHeight - rect.top;

          elementProgress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        }

        const nextProg = {
          scrollY,
          scrollProgress,
          elementProgress,
        };

        progressRef.current = nextProg;
        listenersRef.current.forEach((cb) => cb(nextProg));
        setProgress(nextProg);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Run initial scroll update
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rAFId);
    };
  }, [ref]);

  return {
    progress,
    onChange,
    get: () => progressRef.current,
  };
}
