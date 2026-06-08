import React from "react";
import { motion } from "framer-motion";

// Configuration presets for all 22 entrance animations
const baseVariants = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  fadeDown: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  fadeLeft: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, y: 0 } }, // corrected to x
  fadeRight: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  zoomIn: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  zoomOut: { hidden: { opacity: 0, scale: 1.2 }, visible: { opacity: 1, scale: 1 } },
  scaleIn: { hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } },
  slideUp: { hidden: { y: "100%" }, visible: { y: 0 } },
  slideDown: { hidden: { y: "-100%" }, visible: { y: 0 } },
  slideLeft: { hidden: { x: "100%" }, visible: { x: 0 } },
  slideRight: { hidden: { x: "-100%" }, visible: { x: 0 } },
  rotateIn: { hidden: { opacity: 0, rotate: -180, scale: 0.7 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
  flipInX: { hidden: { opacity: 0, rotateX: 90 }, visible: { opacity: 1, rotateX: 0 } },
  flipInY: { hidden: { opacity: 0, rotateY: 90 }, visible: { opacity: 1, rotateY: 0 } },
  blurIn: { hidden: { opacity: 0, filter: "blur(16px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  expandIn: { 
    hidden: { opacity: 0, clipPath: "inset(50% 50% 50% 50% rounded 12px)" }, 
    visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% rounded 12px)" } 
  },
  bounceIn: { hidden: { opacity: 0, scale: 0.3 }, visible: { opacity: 1, scale: 1 } },
  elasticIn: { hidden: { opacity: 0, scale: 0.4, y: 60 }, visible: { opacity: 1, scale: 1, y: 0 } },
  swingIn: { 
    hidden: { opacity: 0, rotate: -25, transformOrigin: "top center" }, 
    visible: { opacity: 1, rotate: 0 } 
  },
  rollIn: { hidden: { opacity: 0, x: "-100%", rotate: -120 }, visible: { opacity: 1, x: 0, rotate: 0 } },
  lightSpeedIn: { hidden: { opacity: 0, x: "100%", skewX: -30 }, visible: { opacity: 1, x: 0, skewX: 0 } }
};

// Fixed typo: fadeLeft was visible: { opacity: 1, y: 0 } instead of x: 0
baseVariants.fadeLeft = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };

export const EntranceAnimation = ({
  children,
  preset = "fadeIn",
  duration = 0.6,
  delay = 0,
  ease = "easeOut",
  once = true,
  threshold = 0.1,
  viewportTrigger = true,
  style,
  className,
  ...props
}) => {
  const chosenVariants = baseVariants[preset] || baseVariants.fadeIn;

  // Customize physics transitions based on components
  let transitionConfig = { duration, delay, ease };

  if (preset === "bounceIn") {
    transitionConfig = {
      type: "spring",
      stiffness: 280,
      damping: 12,
      delay
    };
  } else if (preset === "elasticIn") {
    transitionConfig = {
      type: "spring",
      stiffness: 350,
      damping: 10,
      delay
    };
  } else if (preset === "swingIn") {
    transitionConfig = {
      type: "spring",
      stiffness: 180,
      damping: 8,
      delay
    };
  }

  const animationProps = viewportTrigger
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once, amount: threshold }
      }
    : {
        initial: "hidden",
        animate: "visible"
      };

  return (
    <motion.div
      variants={chosenVariants}
      transition={transitionConfig}
      style={{ display: "inline-block", ...style }}
      className={className}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Exporting individual named entrance components for easy import
export const FadeIn = (props) => <EntranceAnimation preset="fadeIn" {...props} />;
export const FadeUp = (props) => <EntranceAnimation preset="fadeUp" {...props} />;
export const FadeDown = (props) => <EntranceAnimation preset="fadeDown" {...props} />;
export const FadeLeft = (props) => <EntranceAnimation preset="fadeLeft" {...props} />;
export const FadeRight = (props) => <EntranceAnimation preset="fadeRight" {...props} />;
export const ZoomIn = (props) => <EntranceAnimation preset="zoomIn" {...props} />;
export const ZoomOut = (props) => <EntranceAnimation preset="zoomOut" {...props} />;
export const ScaleIn = (props) => <EntranceAnimation preset="scaleIn" {...props} />;
export const SlideUp = (props) => <EntranceAnimation preset="slideUp" {...props} />;
export const SlideDown = (props) => <EntranceAnimation preset="slideDown" {...props} />;
export const SlideLeft = (props) => <EntranceAnimation preset="slideLeft" {...props} />;
export const SlideRight = (props) => <EntranceAnimation preset="slideRight" {...props} />;
export const RotateIn = (props) => <EntranceAnimation preset="rotateIn" {...props} />;
export const FlipInX = (props) => <EntranceAnimation preset="flipInX" {...props} />;
export const FlipInY = (props) => <EntranceAnimation preset="flipInY" {...props} />;
export const BlurIn = (props) => <EntranceAnimation preset="blurIn" {...props} />;
export const ExpandIn = (props) => <EntranceAnimation preset="expandIn" {...props} />;
export const BounceIn = (props) => <EntranceAnimation preset="bounceIn" {...props} />;
export const ElasticIn = (props) => <EntranceAnimation preset="elasticIn" {...props} />;
export const SwingIn = (props) => <EntranceAnimation preset="swingIn" {...props} />;
export const RollIn = (props) => <EntranceAnimation preset="rollIn" {...props} />;
export const LightSpeedIn = (props) => <EntranceAnimation preset="lightSpeedIn" {...props} />;
