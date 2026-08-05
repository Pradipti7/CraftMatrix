import { useState, useRef, useCallback } from "react";
import { INK, LINE, PAPER, MUTED, TEAL } from "../theme";
import { hslToHex, hexToHsl } from "../utils/color";

export default function ColorWheel({ onSelectColor, onColorChange }) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [hexInput, setHexInput] = useState("#FF0000");
  const wheelRef = useRef(null);
  const isDragging = useRef(false);

  const currentColor = hslToHex(hue, saturation, lightness);

  const getColorFromPosition = useCallback((clientX, clientY) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const radius = rect.width / 2;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    const newHue = Math.round(angle) % 360;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const newSat = Math.round(Math.min(100, (dist / radius) * 100));

    return { h: newHue, s: newSat };
  }, []);

  const updateColor = useCallback((newHue, newSat) => {
    setHue(newHue);
    setSaturation(newSat);
    const hex = hslToHex(newHue, newSat, lightness);
    setHexInput(hex);
    onColorChange?.(hex);
  }, [lightness, onColorChange]);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const { h, s } = getColorFromPosition(e.clientX, e.clientY);
    updateColor(h, s);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const { h, s } = getColorFromPosition(e.clientX, e.clientY);
    updateColor(h, s);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleLightnessChange = (e) => {
    const l = Number(e.target.value);
    setLightness(l);
    const hex = hslToHex(hue, saturation, l);
    setHexInput(hex);
    onColorChange?.(hex);
  };

  const handleHexChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      const { h, s, l } = hexToHsl(val);
      setHue(h);
      setSaturation(s);
      setLightness(l);
    }
  };

  const handleAddColor = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      onSelectColor(hexInput);
    }
  };

  const wheelSize = 140;
  const indicatorAngle = (hue - 90) * (Math.PI / 180);
  const indicatorDist = (saturation / 100) * (wheelSize / 2 - 8);
  const indicatorX = Math.cos(indicatorAngle) * indicatorDist;
  const indicatorY = Math.sin(indicatorAngle) * indicatorDist;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Color Wheel
        </span>
        {typeof window !== "undefined" && "EyeDropper" in window && (
          <button
            type="button"
            onClick={async () => {
              try {
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                const { h, s, l } = hexToHsl(result.sRGBHex);
                setHue(h);
                setSaturation(s);
                setLightness(l);
                setHexInput(result.sRGBHex);
                onColorChange?.(result.sRGBHex);
              } catch {}
            }}
            title="Pick color from screen"
            style={{
              background: "none", border: "none", padding: 0,
              cursor: "pointer", display: "flex", alignItems: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22l1-1h3l9-9" />
              <path d="M3 21v-3l9-9" />
              <path d="M14.5 5.5l4-4a1.4 1.4 0 0 1 2 2l-4 4" />
              <path d="M12 8l4 4" />
            </svg>
          </button>
        )}
      </div>

      {/* Circular wheel */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          ref={wheelRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            position: "relative",
            width: wheelSize,
            height: wheelSize,
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
            cursor: "crosshair",
            touchAction: "none",
          }}
        >
          {/* Radial white overlay for saturation */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            opacity: 0.3,
            pointerEvents: "none",
          }} />

          {/* Draggable indicator */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 16, height: 16,
            borderRadius: "50%",
            backgroundColor: currentColor,
            border: `2px solid ${PAPER}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
            transform: `translate(calc(-50% + ${indicatorX}px), calc(-50% + ${indicatorY}px))`,
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* Lightness slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.65rem", minWidth: 14 }}>L</span>
        <div style={{ position: "relative", flex: 1 }}>
          <div style={{
            width: "100%", height: 10, borderRadius: 5,
            background: `linear-gradient(to right, #000000, ${hslToHex(hue, saturation, 50)}, #ffffff)`,
          }} />
          <input
            type="range"
            min={0}
            max={100}
            value={lightness}
            onChange={handleLightnessChange}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 10, opacity: 0, cursor: "pointer" }}
          />
          <div style={{
            position: "absolute", top: -3,
            left: `${lightness}%`, transform: "translateX(-50%)",
            width: 8, height: 16, borderRadius: 2,
            backgroundColor: currentColor, border: `1px solid ${PAPER}`,
            pointerEvents: "none",
          }} />
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.65rem", minWidth: 28, textAlign: "right" }}>{lightness}%</span>
      </div>

      {/* Preview + Hex + Add */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 4 }}>
        <div style={{ width: 48, height: 48, borderRadius: 4, backgroundColor: currentColor, border: `1px solid ${LINE}` }} />
        <input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          maxLength={7}
          style={{
            flex: 1, padding: "10px 12px", backgroundColor: INK,
            border: `1px solid ${LINE}`, borderRadius: 4, color: PAPER,
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", outline: "none",
          }}
        />
        <button
          type="button"
          onClick={handleAddColor}
          style={{
            padding: "10px 16px", backgroundColor: TEAL, color: INK,
            border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}
