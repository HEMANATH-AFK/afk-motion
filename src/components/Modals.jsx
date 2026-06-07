import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper Backdrop for modals
const Backdrop = ({ children, onClick, style, blur = false, inline = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClick}
    style={{
      position: inline ? "absolute" : "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: blur ? "blur(12px)" : "none",
      WebkitBackdropFilter: blur ? "blur(12px)" : "none",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      ...style
    }}
  >
    {children}
  </motion.div>
);

// 1. AnimatedModal
export const AnimatedModal = ({ isOpen, onClose, children, style, inline = false, blur = false, ...props }) => (
  <AnimatePresence>
    {isOpen && (
      <Backdrop onClick={onClose} inline={inline} blur={blur}>
        <motion.div
          initial={{ y: 50, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 30, scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#0c0c14",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "28px",
            maxWidth: "500px",
            width: "100%",
            color: "#ffffff",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            position: "relative",
            zIndex: 10000,
            ...style
          }}
          {...props}
        >
          {children}
        </motion.div>
      </Backdrop>
    )}
  </AnimatePresence>
);

// 2. BlurModal
export const BlurModal = ({ isOpen, onClose, children, ...props }) => (
  <AnimatedModal isOpen={isOpen} onClose={onClose} blur={true} {...props}>
    {children}
  </AnimatedModal>
);

// 3. SlideModal
export const SlideModal = ({ isOpen, onClose, children, direction = "right", style, inline = false, ...props }) => {
  const offsets = {
    left: { x: "-100%", y: 0 },
    right: { x: "100%", y: 0 },
    top: { x: 0, y: "-100%" },
    bottom: { x: 0, y: "100%" }
  };
  const offset = offsets[direction] || offsets.right;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop onClick={onClose} inline={inline} style={{ justifyContent: direction === "left" ? "flex-start" : direction === "right" ? "flex-end" : "center", alignItems: direction === "top" ? "flex-start" : direction === "bottom" ? "flex-end" : "center", padding: 0 }}>
          <motion.div
            initial={{ ...offset, opacity: 0.5 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ ...offset, opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0c0c14",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
              width: direction === "left" || direction === "right" ? "360px" : "100%",
              height: direction === "left" || direction === "right" ? "100%" : "auto",
              ...style
            }}
            {...props}
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

// 4. ZoomModal
export const ZoomModal = ({ isOpen, onClose, children, inline = false, ...props }) => (
  <AnimatePresence>
    {isOpen && (
      <Backdrop onClick={onClose} inline={inline}>
        <motion.div
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.2, opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#0c0c14",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "28px",
            maxWidth: "450px",
            width: "100%"
          }}
          {...props}
        >
          {children}
        </motion.div>
      </Backdrop>
    )}
  </AnimatePresence>
);

// 5. DrawerModal
export const DrawerModal = (props) => <SlideModal direction="right" {...props} />;

// 6. BottomSheet (Mobile drag modal)
export const BottomSheet = ({ isOpen, onClose, children, style, inline = false, ...props }) => (
  <AnimatePresence>
    {isOpen && (
      <Backdrop onClick={onClose} inline={inline} style={{ alignItems: "flex-end", padding: 0 }}>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={{ top: 0.1, bottom: 0.5 }}
          onDragEnd={(e, info) => {
            if (info.velocity.y > 150 || info.offset.y > 120) {
              onClose();
            }
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            background: "#0c0c14",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            padding: "24px",
            touchAction: "none",
            ...style
          }}
          {...props}
        >
          <div style={{ width: "40px", height: "4px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "2px", margin: "0 auto 16px" }} />
          {children}
        </motion.div>
      </Backdrop>
    )}
  </AnimatePresence>
);

// 7. ToastNotification (Stacked alert overlay)
export const ToastNotification = ({ toasts = [], onClose, inline = false, ...props }) => (
  <div
    style={{
      position: inline ? "absolute" : "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 99999,
      pointerEvents: "none"
    }}
    {...props}
  >
    <AnimatePresence>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ x: 80, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 50, opacity: 0, scale: 0.9 }}
          style={{
            background: "rgba(15,15,22,0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "12px 20px",
            color: "#fff",
            fontSize: "0.85rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            pointerEvents: "auto",
            minWidth: "220px"
          }}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => onClose && onClose(toast.id)}
            style={{
              background: "transparent",
              border: "none",
              color: "#cbd5e1",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
          >
            &times;
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

// 8. Snackbar
export const Snackbar = ({ isOpen, message, onClose, duration = 3000, inline = false, ...props }) => {
  useEffect(() => {
    if (isOpen && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 40, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 20, opacity: 0, x: "-50%" }}
          style={{
            position: inline ? "absolute" : "fixed",
            bottom: "24px",
            left: "50%",
            backgroundColor: "#6366f1",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "0.9rem",
            boxShadow: "0 10px 30px rgba(99,102,241,0.3)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
          {...props}
        >
          <span>{message}</span>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 9. FloatingAlert
export const FloatingAlert = ({ isOpen, title, message, type = "info", onClose, inline = false, ...props }) => {
  const colors = {
    info: "#6366f1",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444"
  };
  const color = colors[type] || colors.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -30, opacity: 0, x: 20 }}
          animate={{ y: 0, opacity: 1, x: 0 }}
          exit={{ y: -20, opacity: 0 }}
          style={{
            position: inline ? "absolute" : "fixed",
            top: "24px",
            right: "24px",
            background: "rgba(10,10,15,0.9)",
            border: `1px solid ${color}40`,
            borderLeft: `4px solid ${color}`,
            borderRadius: "8px",
            padding: "16px 20px",
            width: "300px",
            color: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            zIndex: 99999
          }}
          {...props}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{title}</span>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "1.1rem" }}>
              &times;
            </button>
          </div>
          <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.4 }}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 10. ConfirmDialog
export const ConfirmDialog = ({ isOpen, title = "Are you sure?", message, onConfirm, onCancel, ...props }) => (
  <AnimatedModal isOpen={isOpen} onClose={onCancel} {...props}>
    <h3 style={{ margin: "0 0 10px" }}>{title}</h3>
    <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5, margin: "0 0 24px" }}>{message}</p>
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
      <button
        onClick={onCancel}
        style={{
          padding: "10px 16px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#94a3b8",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        style={{
          padding: "10px 18px",
          background: "#ef4444",
          border: "none",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        Confirm
      </button>
    </div>
  </AnimatedModal>
);
