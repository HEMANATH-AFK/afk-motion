import React from "react";
import { motion } from "framer-motion";

const exitVariants = {
  fadeOut: { exit: { opacity: 0 } },
  fadeUpOut: { exit: { opacity: 0, y: -40 } },
  fadeDownOut: { exit: { opacity: 0, y: 40 } },
  fadeLeftOut: { exit: { opacity: 0, x: -40 } },
  fadeRightOut: { exit: { opacity: 0, x: 40 } },
  zoomOut: { exit: { opacity: 0, scale: 0.8 } },
  scaleOut: { exit: { opacity: 0, scale: 0 } },
  slideUpOut: { exit: { y: "-100%" } },
  slideDownOut: { exit: { y: "100%" } },
  slideLeftOut: { exit: { x: "-100%" } },
  slideRightOut: { exit: { x: "100%" } },
  rotateOut: { exit: { opacity: 0, rotate: 180, scale: 0.7 } },
  flipOutX: { exit: { opacity: 0, rotateX: -90 } },
  flipOutY: { exit: { opacity: 0, rotateY: -90 } },
  blurOut: { exit: { opacity: 0, filter: "blur(16px)" } },
  collapseOut: { exit: { opacity: 0, height: 0, overflow: "hidden" } },
  bounceOut: { exit: { opacity: 0, scale: 0.5, y: 30 } },
  rollOut: { exit: { opacity: 0, x: "100%", rotate: 120 } }
};

export const ExitAnimation = ({
  children,
  preset = "fadeOut",
  duration = 0.5,
  delay = 0,
  ease = "easeIn",
  style,
  className,
  ...props
}) => {
  const chosenVariants = exitVariants[preset] || exitVariants.fadeOut;

  let transitionConfig = { duration, delay, ease };

  if (preset === "bounceOut") {
    transitionConfig = {
      type: "spring",
      stiffness: 250,
      damping: 15,
      delay
    };
  }

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
      exit={chosenVariants.exit}
      transition={transitionConfig}
      style={{ display: "inline-block", ...style }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeOut = (props) => <ExitAnimation preset="fadeOut" {...props} />;
export const FadeUpOut = (props) => <ExitAnimation preset="fadeUpOut" {...props} />;
export const FadeDownOut = (props) => <ExitAnimation preset="fadeDownOut" {...props} />;
export const FadeLeftOut = (props) => <ExitAnimation preset="fadeLeftOut" {...props} />;
export const FadeRightOut = (props) => <ExitAnimation preset="fadeRightOut" {...props} />;
export const ZoomOutExit = (props) => <ExitAnimation preset="zoomOut" {...props} />;
export const ScaleOut = (props) => <ExitAnimation preset="scaleOut" {...props} />;
export const SlideUpOut = (props) => <ExitAnimation preset="slideUpOut" {...props} />;
export const SlideDownOut = (props) => <ExitAnimation preset="slideDownOut" {...props} />;
export const SlideLeftOut = (props) => <ExitAnimation preset="slideLeftOut" {...props} />;
export const SlideRightOut = (props) => <ExitAnimation preset="slideRightOut" {...props} />;
export const RotateOut = (props) => <ExitAnimation preset="rotateOut" {...props} />;
export const FlipOutX = (props) => <ExitAnimation preset="flipOutX" {...props} />;
export const FlipOutY = (props) => <ExitAnimation preset="flipOutY" {...props} />;
export const BlurOut = (props) => <ExitAnimation preset="blurOut" {...props} />;
export const CollapseOut = (props) => <ExitAnimation preset="collapseOut" {...props} />;
export const BounceOut = (props) => <ExitAnimation preset="bounceOut" {...props} />;
export const RollOut = (props) => <ExitAnimation preset="rollOut" {...props} />;
