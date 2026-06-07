import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { TextScramble } from "./TextScramble";
import { useSpringValue } from "../hooks/useSpring";

// Re-export TextScramble as ScrambleText
export const ScrambleText = TextScramble;

// 1. TypewriterText
export const TypewriterText = ({ text = "Typewriter Text Effect", speed = 80, cursor = true, delay = 0, style, ...props }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timer;
    const timeout = setTimeout(() => {
      let index = 0;
      timer = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(timer);
    };
  }, [text, speed, delay]);

  return (
    <span style={{ fontFamily: "monospace", ...style }} {...props}>
      {displayedText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ marginLeft: "2px", fontWeight: "bold" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// 2. SplitText (Split into characters and stagger)
export const SplitText = ({ children = "Split Text Effect", duration = 0.5, stagger = 0.03, style, ...props }) => {
  const words = typeof children === "string" ? children.split(" ") : [];
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", ...style }} {...props}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} style={{ display: "inline-flex", marginRight: "0.4em", whiteSpace: "nowrap" }}>
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration,
                delay: (wordIdx * 4 + charIdx) * stagger,
                ease: "easeOut"
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

// 3. LetterReveal
export const LetterReveal = ({ text = "Letter Reveal Effect", delay = 0, stagger = 0.04, style, ...props }) => {
  return (
    <span style={{ display: "inline-block", ...style }} {...props}>
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + idx * stagger }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// 4. WordReveal
export const WordReveal = ({ text = "Word Reveal Effect", delay = 0, stagger = 0.1, style, ...props }) => {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", ...style }} {...props}>
      {text.split(" ").map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + idx * stagger, ease: "easeOut" }}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// 5. CharacterWave
export const CharacterWave = ({ text = "Character Wave Effect", style, ...props }) => {
  return (
    <span style={{ display: "inline-flex", ...style }} {...props}>
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          whileHover={{ y: -8, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 350, damping: 10 }}
          style={{ display: "inline-block", cursor: "default", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// 6. GradientText
export const GradientText = ({
  children,
  gradient = "linear-gradient(90deg, #6366f1, #c084fc, #f472b6)",
  style,
  ...props
}) => (
  <span
    style={{
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      display: "inline-block",
      ...style
    }}
    {...props}
  >
    {children}
  </span>
);

// 7. GlitchText
export const GlitchText = ({ children = "Glitch Text Effect", style, ...props }) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block", ...style }} {...props}>
      <span>{children}</span>
      {glitching && (
        <>
          <span
            style={{
              position: "absolute",
              left: "2px",
              top: "-2px",
              color: "#ff00ff",
              background: "#07070a",
              clipPath: "inset(10% 0 85% 0)",
              opacity: 0.8
            }}
          >
            {children}
          </span>
          <span
            style={{
              position: "absolute",
              left: "-2px",
              top: "2px",
              color: "#00ffff",
              background: "#07070a",
              clipPath: "inset(75% 0 5% 0)",
              opacity: 0.8
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

// 8. NeonText
export const NeonText = ({ children, color = "#ff007f", style, ...props }) => (
  <motion.span
    animate={{ opacity: [1, 0.95, 1, 0.8, 1, 0.9, 1] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    style={{
      color: "#ffffff",
      textShadow: `0 0 5px #fff, 0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}`,
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
      display: "inline-block",
      ...style
    }}
    {...props}
  >
    {children}
  </motion.span>
);

// 9. BlurRevealText
export const BlurRevealText = ({ children, duration = 0.8, delay = 0, style, ...props }) => (
  <motion.span
    initial={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration, delay, ease: "easeOut" }}
    style={{ display: "inline-block", ...style }}
    {...props}
  >
    {children}
  </motion.span>
);

// 10. RotateText (Cycles words)
export const RotateText = ({ words = [], delayInterval = 2500, style, ...props }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, delayInterval);
    return () => clearInterval(interval);
  }, [words, delayInterval]);

  return (
    <span style={{ display: "inline-inline-block", position: "relative", ...style }} {...props}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ display: "inline-block" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// 11. InfiniteTicker
export const InfiniteTicker = ({ children, speed = 25, style, ...props }) => (
  <div style={{ overflow: "hidden", display: "flex", width: "100%", ...style }} {...props}>
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      style={{ display: "flex", gap: "2rem", whiteSpace: "nowrap" }}
    >
      <div style={{ display: "flex", gap: "2rem" }}>{children}</div>
      <div style={{ display: "flex", gap: "2rem" }}>{children}</div>
    </motion.div>
  </div>
);

// 12. MarqueeText
export const MarqueeText = ({ text = "Marquee Text Effect", speed = 20, style, ...props }) => (
  <div style={{ overflow: "hidden", width: "100%", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "10px 0", ...style }} {...props}>
    <motion.div
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      style={{ display: "flex", width: "fit-content", gap: "4rem" }}
    >
      <span style={{ fontSize: "1.5rem", fontWeight: 800, whiteSpace: "nowrap" }}>{text}</span>
      <span style={{ fontSize: "1.5rem", fontWeight: 800, whiteSpace: "nowrap" }}>{text}</span>
    </motion.div>
  </div>
);

// 13. CountUpText
export const CountUpText = ({ from = 0, to = 100, duration = 2, style, ...props }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span style={style} {...props}>{count}</span>;
};

// 14. NumberTicker
export const NumberTicker = ({ value = 1000, style, ...props }) => {
  const spring = useSpringValue(value, { stiffness: 80, damping: 15 });
  const [displayVal, setDisplayVal] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return spring.onChange((latest) => {
      setDisplayVal(Math.round(latest));
    });
  }, [spring]);

  return <span style={style} {...props}>{displayVal}</span>;
};
