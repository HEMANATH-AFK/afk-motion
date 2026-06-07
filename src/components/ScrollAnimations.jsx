import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// 1. ScrollReveal
export const ScrollReveal = ({ children, duration = 0.6, delay = 0, yOffset = 40, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration, delay, ease: "easeOut" }}
    {...props}
  >
    {children}
  </motion.div>
);

// 2. ScrollFade
export const ScrollFade = ({ children, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "center center", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} {...props}>
      {children}
    </motion.div>
  );
};

// 3. ScrollScale
export const ScrollScale = ({ children, startScale = 0.85, endScale = 1.05, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [startScale, 1, endScale]);

  return (
    <motion.div ref={ref} style={{ scale }} {...props}>
      {children}
    </motion.div>
  );
};

// 4. ScrollRotate
export const ScrollRotate = ({ children, maxRotation = 45, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end start"]
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-maxRotation, maxRotation]);

  return (
    <motion.div ref={ref} style={{ rotate }} {...props}>
      {children}
    </motion.div>
  );
};

// 5. ScrollParallax
export const ScrollParallax = ({ children, speed = 100, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} {...props}>
      {children}
    </motion.div>
  );
};

// 6. ScrollProgress (Reading bar)
export const ScrollProgress = ({ color = "#6366f1", height = 4, style = undefined, container, ...props }) => {
  const { scrollYProgress } = useScroll({ container });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{
        position: container ? "absolute" : "fixed",
        top: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor: color,
        transformOrigin: "0%",
        zIndex: 9999,
        scaleX,
        ...style
      }}
      {...props}
    />
  );
};

// 7. ScrollBlur
export const ScrollBlur = ({ children, maxBlur = 10, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "center center", "end start"]
  });
  const blurVal = useTransform(scrollYProgress, [0, 0.5, 1], [maxBlur, 0, maxBlur]);
  const filter = useTransform(blurVal, (b) => `blur(${b}px)`);

  return (
    <motion.div ref={ref} style={{ filter }} {...props}>
      {children}
    </motion.div>
  );
};

// 8. ScrollPin
export const ScrollPin = ({ children, top = 20, ...props }) => (
  <div style={{ position: "sticky", top, zIndex: 10 }} {...props}>
    {children}
  </div>
);

// 9. ScrollZoom
export const ScrollZoom = ({ src, alt, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <div ref={ref} style={{ overflow: "hidden", borderRadius: "12px", width: "100%", height: "100%" }} {...props}>
      <motion.img src={src} alt={alt} style={{ scale, width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};

// 10. ScrollStagger
export const ScrollStagger = ({ children, staggerDelay = 0.1, ...props }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={childVariants} style={{ display: "inline-block" }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// 11. ScrollCounter
export const ScrollCounter = ({ to, from = 0, duration = 1.5, ...props }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, from, to, duration]);

  return <span ref={ref} {...props}>{count}</span>;
};

// 12. ScrollTimeline (Vertical path line drawer)
export const ScrollTimeline = ({ style, container, ...props }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 15 });

  return (
    <div ref={ref} style={{ position: "relative", width: "4px", backgroundColor: "rgba(255,255,255,0.05)", ...style }} {...props}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#6366f1",
          transformOrigin: "top center",
          scaleY
        }}
      />
    </div>
  );
};
