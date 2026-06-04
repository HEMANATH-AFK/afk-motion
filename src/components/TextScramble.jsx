import React, { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_CHARS = "!@#$%^&*()_+~`{}|[]\\:\";<>?,./";

/**
 * TextScramble - Premium text scrambling and decoding hover interaction.
 * Cycle-scrambles random glyphs before settling on the correct letters one by one.
 * Driven by an optimized requestAnimationFrame loop for ultra-smooth 60fps execution.
 */
export const TextScramble = ({
  text,
  speed = 40,
  scrambleChars = DEFAULT_CHARS,
  trigger = "hover", // 'hover' | 'mount'
  className,
  style,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const animationRef = useRef(null);
  const frameCountRef = useRef(0);
  const queueRef = useRef([]);

  // Sets up the queue for scrambling
  const setupQueue = useCallback(() => {
    const queue = [];
    for (let i = 0; i < text.length; i++) {
      const from = displayedText[i] || "";
      const to = text[i];
      // Random delay before starting the decode for this index
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20) + 10;
      queue.push({ from, to, start, end, char: from });
    }
    queueRef.current = queue;
  }, [text, displayedText]);

  // Main tick loop
  const tick = useCallback(() => {
    let complete = true;
    const queue = queueRef.current;
    const currentFrame = frameCountRef.current;

    const output = queue.map((item) => {
      if (currentFrame >= item.end) {
        item.char = item.to;
      } else if (currentFrame >= item.start) {
        complete = false;
        // Cycle random characters
        if (Math.random() < 0.28 || !item.char || item.char === item.to) {
          const randomIndex = Math.floor(Math.random() * scrambleChars.length);
          item.char = scrambleChars[randomIndex];
        }
      } else {
        complete = false;
      }
      return item.char;
    });

    setDisplayedText(output.join(""));

    if (complete) {
      cancelAnimationFrame(animationRef.current);
    } else {
      frameCountRef.current += 1;
      animationRef.current = requestAnimationFrame(tick);
    }
  }, [scrambleChars]);

  const startScramble = useCallback(() => {
    cancelAnimationFrame(animationRef.current);
    frameCountRef.current = 0;
    setupQueue();
    animationRef.current = requestAnimationFrame(tick);
  }, [setupQueue, tick]);

  useEffect(() => {
    if (trigger === "mount") {
      startScramble();
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [trigger, startScramble]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      startScramble();
    }
  };

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        fontFamily: "monospace",
        whiteSpace: "pre",
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {displayedText}
    </span>
  );
};
