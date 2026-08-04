import { useState } from "react";
import { INK, LINE, PAPER, MUTED, TEAL } from "../theme";
import { hslToHex, hexToHsl } from "../utils/color";

export default function ColorWheel({ onSelectColor }) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [hexInput, setHexInput] = useState("#FF0000");

  const handleHueChange = (e) => {
    const newHue = Number(e.target.value);
    setHue(newHue);
    const hex = hslToHex(newHue, saturation, lightness);
    setHexInput(hex);
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

  const currentColor = hslToHex(hue, saturation, lightness);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Color Wheel
      </span>

      <div style={{ position: "relative" }}>
        <div style={{
          width: "100%", height: 16, borderRadius: 4,
          background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
        }} />
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={handleHueChange}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 16, opacity: 0, cursor: "pointer" }}
        />
        <div style={{
          position: "absolute", top: -4,
          left: `${(hue / 360) * 100}%`, transform: "translateX(-50%)",
          width: 12, height: 24, backgroundColor: currentColor,
          border: `2px solid ${PAPER}`, borderRadius: 2, pointerEvents: "none",
        }} />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
