import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Helper styles for full screen backgrounds
const bgCanvasStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: -1 // Using zIndex -1 ensures they stack behind parent text/buttons but above parent background colors
};

// Hook to automatically ensure parent container is styled correctly to bound and stack backgrounds
const useBackgroundParent = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (parent) {
      const computedStyle = window.getComputedStyle(parent);
      if (computedStyle.position === "static") {
        parent.style.position = "relative";
      }
      if (computedStyle.overflow === "visible" || computedStyle.overflow === "") {
        parent.style.overflow = "hidden";
      }
      if (computedStyle.zIndex === "auto") {
        parent.style.zIndex = "1";
      }
    }
  }, []);
};

// 1. ParticleBackground
export const ParticleBackground = ({ color = "#6366f1", count = 60, style, ...props }) => {
  const canvasRef = useRef(null);
  useBackgroundParent(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;
    let animationFrameId;

    const resize = () => {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * (parent.clientWidth || window.innerWidth),
      y: Math.random() * (parent.clientHeight || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count]);

  return <canvas ref={canvasRef} style={{ ...bgCanvasStyle, ...style }} {...props} />;
};

// 2. StarfieldBackground
export const StarfieldBackground = ({ color = "#ffffff", count = 100, speed = 0.8, style, ...props }) => {
  const canvasRef = useRef(null);
  useBackgroundParent(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;
    let animationFrameId;

    const resize = () => {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const stars = Array.from({ length: count }).map(() => ({
      x: Math.random() * (parent.clientWidth || window.innerWidth),
      y: Math.random() * (parent.clientHeight || window.innerHeight),
      z: Math.random() * (parent.clientWidth || window.innerWidth)
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(7, 7, 10, 0.2)"; // faint trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      stars.forEach((s) => {
        s.z -= speed;
        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = Math.random() * canvas.width;
          s.y = Math.random() * canvas.height;
        }

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const k = 128 / s.z;
        const px = (s.x - cx) * k + cx;
        const py = (s.y - cy) * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const r = (1 - s.z / canvas.width) * 3;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count, speed]);

  return <canvas ref={canvasRef} style={{ ...bgCanvasStyle, ...style }} {...props} />;
};

// 3. AuroraBackground
export const AuroraBackground = ({ style, ...props }) => {
  const containerRef = useRef(null);
  useBackgroundParent(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        ...bgCanvasStyle,
        overflow: "hidden",
        background: "#07070a",
        ...style
      }}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          right: "-50%",
          bottom: "-50%",
          width: "200%",
          height: "200%",
          backgroundImage: "radial-gradient(circle at 40% 40%, #1e1b4b 0%, transparent 50%), radial-gradient(circle at 60% 60%, #311042 0%, transparent 50%), radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 60%)",
          filter: "blur(80px)",
          animation: "afk-aurora-glow 15s ease infinite alternate"
        }}
      />
      <style>{`
        @keyframes afk-aurora-glow {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(15deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

// 4. MeshGradient
export const MeshGradient = ({ style, ...props }) => {
  const containerRef = useRef(null);
  useBackgroundParent(containerRef);

  return (
    <div ref={containerRef} style={{ ...bgCanvasStyle, overflow: "hidden", background: "#07070a", ...style }} {...props}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.8,
          backgroundImage: "radial-gradient(at 10% 20%, rgba(99,102,241,0.15) 0px, transparent 50%), radial-gradient(at 90% 80%, rgba(244,63,94,0.12) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(192,132,252,0.1) 0px, transparent 50%)",
          animation: "afk-mesh-shift 10s ease infinite alternate"
        }}
      />
      <style>{`
        @keyframes afk-mesh-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
};

// 5. AnimatedGradient
export const AnimatedGradient = ({ gradient = "linear-gradient(-45deg, #07070a, #1e1b4b, #111827, #311042)", style, ...props }) => {
  const containerRef = useRef(null);
  useBackgroundParent(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        ...bgCanvasStyle,
        background: gradient,
        backgroundSize: "400% 400%",
        animation: "afk-bg-gradient 15s ease infinite",
        ...style
      }}
      {...props}
    >
      <style>{`
        @keyframes afk-bg-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

// 6. MatrixRain
export const MatrixRain = ({ color = "#00ff66", fontSize = 14, backgroundColor = "rgba(7, 7, 10, 0.08)", style, ...props }) => {
  const canvasRef = useRef(null);
  useBackgroundParent(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;
    let animationFrameId;

    let columns = Math.floor((parent.clientWidth || window.innerWidth) / fontSize) || 1;
    let drops = Array(columns).fill(1);

    const resize = () => {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
      const newColumns = Math.floor(canvas.width / fontSize) || 1;
      if (newColumns !== columns) {
        columns = newColumns;
        const newDrops = Array(columns).fill(1);
        for (let i = 0; i < Math.min(drops.length, newDrops.length); i++) {
          newDrops[i] = drops[i];
        }
        drops = newDrops;
      }
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(33 + Math.floor(Math.random() * 90));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, fontSize, backgroundColor]);

  return <canvas ref={canvasRef} style={{ ...bgCanvasStyle, ...style }} {...props} />;
};

// 7. SnowEffect
export const SnowEffect = ({ color = "#ffffff", count = 60, style, ...props }) => {
  const canvasRef = useRef(null);
  useBackgroundParent(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;
    let animationFrameId;

    const resize = () => {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const flakes = Array.from({ length: count }).map(() => ({
      x: Math.random() * (parent.clientWidth || window.innerWidth),
      y: Math.random() * (parent.clientHeight || window.innerHeight),
      r: Math.random() * 2.5 + 0.5,
      d: Math.random() * count,
      speed: Math.random() * 0.7 + 0.2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.beginPath();
      flakes.forEach((f) => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);

        // Movement
        f.y += f.speed;
        f.x += Math.sin(f.d / 10) * 0.2;

        if (f.y > canvas.height) {
          f.y = -10;
          f.x = Math.random() * canvas.width;
        }
        f.d++;
      });
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count]);

  return <canvas ref={canvasRef} style={{ ...bgCanvasStyle, ...style }} {...props} />;
};

// 8. RainEffect
export const RainEffect = ({ color = "rgba(174,194,224,0.12)", count = 100, style, ...props }) => {
  const canvasRef = useRef(null);
  useBackgroundParent(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;
    let animationFrameId;

    const resize = () => {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const drops = Array.from({ length: count }).map(() => ({
      x: Math.random() * (parent.clientWidth || window.innerWidth),
      y: Math.random() * (parent.clientHeight || window.innerHeight),
      l: Math.random() * 15 + 10,
      vy: Math.random() * 6 + 6
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";

      drops.forEach((d) => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.l);
        ctx.stroke();

        d.y += d.vy;
        if (d.y > canvas.height) {
          d.y = -d.l;
          d.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count]);

  return <canvas ref={canvasRef} style={{ ...bgCanvasStyle, ...style }} {...props} />;
};

// 9. BubbleBackground
export const BubbleBackground = ({ color = "rgba(99,102,241,0.15)", count = 40, style, ...props }) => {
  const containerRef = useRef(null);
  useBackgroundParent(containerRef);

  const bubbles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 15,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 8
    }));
  }, [count]);

  return (
    <div ref={containerRef} style={{ ...bgCanvasStyle, overflow: "hidden", ...style }} {...props}>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ top: "110%", left: `${b.x}%`, opacity: 0 }}
          animate={{ top: "-10%", opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            repeat: Infinity,
            duration: b.duration,
            delay: b.delay,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            backgroundColor: color,
            border: "1px solid rgba(255,255,255,0.02)",
            transform: "translateX(-50%)"
          }}
        />
      ))}
    </div>
  );
};

// 10. FirefliesEffect
export const FirefliesEffect = ({ color = "rgba(234,179,8,0.22)", count = 25, style, ...props }) => {
  const canvasRef = useRef(null);
  useBackgroundParent(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement || document.body;
    let animationFrameId;

    const resize = () => {
      canvas.width = parent.clientWidth || window.innerWidth;
      canvas.height = parent.clientHeight || window.innerHeight;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const flies = Array.from({ length: count }).map(() => ({
      x: Math.random() * (parent.clientWidth || window.innerWidth),
      y: Math.random() * (parent.clientHeight || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 3 + 1.5,
      alpha: Math.random(),
      da: (Math.random() - 0.5) * 0.02
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flies.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        f.alpha += f.da;

        if (f.alpha <= 0 || f.alpha >= 1) f.da *= -1;
        if (f.x < 0 || f.x > canvas.width) f.vx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.vy *= -1;

        ctx.fillStyle = color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count]);

  return <canvas ref={canvasRef} style={{ ...bgCanvasStyle, ...style }} {...props} />;
};

// 11. WaveBackground
export const WaveBackground = ({ color = "rgba(99,102,241,0.06)", style, ...props }) => {
  const containerRef = useRef(null);
  useBackgroundParent(containerRef);

  return (
    <div ref={containerRef} style={{ ...bgCanvasStyle, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", ...style }} {...props}>
      <svg style={{ width: "100%", height: "200px", marginBottom: "-10px" }} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <motion.path
          animate={{
            d: [
              "M0 100 C 360 40, 720 160, 1080 100 C 1260 70, 1380 70, 1440 100 L1440 200 L0 200 Z",
              "M0 100 C 360 160, 720 40, 1080 100 C 1260 130, 1380 70, 1440 100 L1440 200 L0 200 Z",
              "M0 100 C 360 40, 720 160, 1080 100 C 1260 70, 1380 70, 1440 100 L1440 200 L0 200 Z"
            ]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          fill={color}
        />
      </svg>
    </div>
  );
};

// 12. NoiseBackground
export const NoiseBackground = ({ opacity = 0.022, style, ...props }) => {
  const containerRef = useRef(null);
  useBackgroundParent(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        ...bgCanvasStyle,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        opacity,
        mixBlendMode: "overlay",
        animation: "afk-noise-grain 0.8s steps(4) infinite",
        ...style
      }}
      {...props}
    >
      <style>{`
        @keyframes afk-noise-grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -2%); }
          20% { transform: translate(-2%, 1%); }
          30% { transform: translate(1%, -1%); }
          40% { transform: translate(-1%, 3%); }
          50% { transform: translate(-2%, 2%); }
          60% { transform: translate(3%, -1%); }
          70% { transform: translate(2%, 1%); }
          80% { transform: translate(-3%, -2%); }
          90% { transform: translate(1%, 2%); }
        }
      `}</style>
    </div>
  );
};
