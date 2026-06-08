import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const baseInputStyle = {
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "10px",
  color: "#ffffff",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "all 0.25s ease"
};

// 1. AnimatedInput (Expanding focus border)
export const AnimatedInput = ({ style, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...baseInputStyle,
          borderColor: focused ? "#6366f1" : "rgba(255, 255, 255, 0.08)",
          ...style
        }}
        {...props}
      />
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: "#6366f1",
          transformOrigin: "center"
        }}
      />
    </div>
  );
};

// 2. FloatingLabelInput
export const FloatingLabelInput = ({ label, value: controlledValue, onChange, style, ...props }) => {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : localValue;
  const isFilled = value !== undefined && value !== null && value.toString().length > 0;

  const handleChange = (e) => {
    if (controlledValue === undefined) {
      setLocalValue(e.target.value);
    }
    if (onChange) onChange(e);
  };

  return (
    <div style={{ position: "relative", width: "100%", paddingTop: "14px" }}>
      <motion.label
        animate={{
          y: (focused || isFilled) ? -18 : 12,
          scale: (focused || isFilled) ? 0.85 : 1,
          color: focused ? "#6366f1" : "#64748b"
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          left: "16px",
          top: "14px",
          pointerEvents: "none",
          transformOrigin: "left top"
        }}
      >
        {label}
      </motion.label>
      <input
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...baseInputStyle,
          borderColor: focused ? "#6366f1" : "rgba(255, 255, 255, 0.08)",
          ...style
        }}
        {...props}
      />
    </div>
  );
};

// 3. PasswordStrengthInput
export const PasswordStrengthInput = ({ value: controlledValue, onChange, style, ...props }) => {
  const [localValue, setLocalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : localValue;
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    const valStr = value ? value.toString() : "";
    if (valStr.length > 5) score += 20;
    if (valStr.length > 9) score += 20;
    if (/[A-Z]/.test(valStr)) score += 20;
    if (/[0-9]/.test(valStr)) score += 20;
    if (/[^A-Za-z0-9]/.test(valStr)) score += 20;
    setStrength(score);
  }, [value]);

  const handleChange = (e) => {
    if (controlledValue === undefined) {
      setLocalValue(e.target.value);
    }
    if (onChange) onChange(e);
  };

  const getColor = () => {
    if (strength <= 40) return "#ef4444";
    if (strength <= 80) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div style={{ width: "100%", ...style }}>
      <input
        type="password"
        value={value}
        onChange={handleChange}
        style={baseInputStyle}
        {...props}
      />
      <div style={{ display: "flex", gap: "4px", marginTop: "8px", height: "4px", width: "100%" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: "2px",
              backgroundColor: strength >= i * 20 ? getColor() : "rgba(255,255,255,0.06)",
              transition: "background-color 0.3s"
            }}
          />
        ))}
      </div>
    </div>
  );
};

// 4. OTPInput
export const OTPInput = ({ length = 4, onChangeVal, style, ...props }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    onChangeVal && onChangeVal(newOtp.join(""));

    // Move to next input
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "12px", justifyContent: "center", ...style }} {...props}>
      {otp.map((char, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          value={char}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "1.3rem",
            fontWeight: 700,
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            color: "#fff",
            outline: "none"
          }}
        />
      ))}
    </div>
  );
};

// 5. SearchInput
export const SearchInput = ({ placeholder = "Search...", onSearch, style, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      animate={{ width: expanded ? "240px" : "160px" }}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <input
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        placeholder={placeholder}
        style={{
          ...baseInputStyle,
          paddingRight: "40px"
        }}
        {...props}
      />
      <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }}>
        &#x1F50D;
      </span>
    </motion.div>
  );
};

// 6. AutoCompleteInput
export const AutoCompleteInput = ({ suggestions = [], onSelect, style, ...props }) => {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);

  // Safeguard suggestions mapping split in case of string
  const itemsList = typeof suggestions === "string" ? suggestions.split(",") : suggestions;
  const filtered = itemsList.filter((s) => s.toLowerCase().startsWith(val.toLowerCase()) && s !== val);

  return (
    <div style={{ position: "relative", width: "100%", ...style }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        style={baseInputStyle}
        {...props}
      />
      <AnimatePresence>
        {focused && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "105%",
              background: "#0c0c14",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              zIndex: 99,
              overflow: "hidden"
            }}
          >
            {filtered.map((item, idx) => (
              <div
                key={idx}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setVal(item);
                  onSelect && onSelect(item);
                  setFocused(false);
                }}
                style={{ padding: "10px 16px", cursor: "pointer", color: "#94a3b8" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 7. AnimatedCheckbox
export const AnimatedCheckbox = ({ checked: controlledChecked = false, onChange, label, style, ...props }) => {
  const [checked, setChecked] = useState(controlledChecked);

  useEffect(() => {
    setChecked(controlledChecked);
  }, [controlledChecked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", ...style }} {...props}>
      <input type="checkbox" checked={checked} onChange={handleChange} style={{ display: "none" }} />
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "6px",
          border: checked ? "none" : "1.5px solid rgba(255,255,255,0.2)",
          backgroundColor: checked ? "#6366f1" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s"
        }}
      >
        {checked && (
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
          >
            <path d="M1 5L4.5 8L11 1" />
          </motion.svg>
        )}
      </div>
      {label && <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>{label}</span>}
    </label>
  );
};

// 8. AnimatedRadio
export const AnimatedRadio = ({ checked: controlledChecked = false, onChange, label, style, ...props }) => {
  const [checked, setChecked] = useState(controlledChecked);

  useEffect(() => {
    setChecked(controlledChecked);
  }, [controlledChecked]);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", ...style }} {...props}>
      <input type="radio" checked={checked} onChange={handleChange} style={{ display: "none" }} />
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#6366f1" }}
          />
        )}
      </div>
      {label && <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>{label}</span>}
    </label>
  );
};

// 9. ToggleSwitch
export const ToggleSwitch = ({ isOn: controlledIsOn = false, onToggle, label, style, ...props }) => {
  const [isOn, setIsOn] = useState(controlledIsOn);

  useEffect(() => {
    setIsOn(controlledIsOn);
  }, [controlledIsOn]);

  const handleToggle = () => {
    const next = !isOn;
    setIsOn(next);
    onToggle && onToggle(next);
  };

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", ...style }} {...props}>
      <div
        onClick={handleToggle}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          backgroundColor: isOn ? "#6366f1" : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          padding: "2px",
          transition: "background-color 0.25s"
        }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            marginLeft: isOn ? "auto" : 0
          }}
        />
      </div>
      {label && <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>{label}</span>}
    </label>
  );
};

// 10. RangeSlider
export const RangeSlider = ({ min = 0, max = 100, value = 50, onChange, style, ...props }) => {
  const [val, setVal] = useState(value);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ width: "100%", position: "relative", ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={val}
        onChange={(e) => {
          const v = Number(e.target.value);
          setVal(v);
          onChange && onChange(v);
        }}
        className="slider-input"
        style={{ width: "100%" }}
      />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: -32, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            style={{
              position: "absolute",
              left: `${((val - min) / (max - min)) * 95}%`,
              backgroundColor: "#6366f1",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "4px 8px",
              borderRadius: "4px",
              pointerEvents: "none"
            }}
          >
            {val}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
