import React, { useState, useCallback } from "react";

const INK = "#12141C";
const LINE = "#262A3A";
const PAPER = "#F1EFE7";
const MUTED = "#9CA0B4";
const AMBER = "#FFB238";
const TEAL = "#5EEAD4";

const BASIC_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#EF4444" },
  { name: "Orange", hex: "#F97316" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Green", hex: "#22C55E" },
  { name: "Teal", hex: "#14B8A6" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Indigo", hex: "#6366F1" },
  { name: "Purple", hex: "#A855F7" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Gray", hex: "#6B7280" },
  { name: "Amber", hex: "#FFB238" },
  { name: "Cyan", hex: "#06B6D4" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Rose", hex: "#F43F5E" },
];

function GridSizeSelector({ onConfirm }) {
  const [cols, setCols] = useState(16);
  const [rows, setRows] = useState(16);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: PAPER,
            fontSize: "1.8rem",
          }}
        >
          Choose Your Grid
        </h2>
        <p style={{ marginTop: 8, color: MUTED, fontSize: "0.9rem" }}>
          Select the dimensions for your canvas
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 48,
          padding: "32px 40px",
          backgroundColor: "#1A1D2B",
          border: `1px solid ${LINE}`,
          borderRadius: 6,
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: MUTED,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Columns
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="range"
              min={4}
              max={48}
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              style={{ width: 120, accentColor: AMBER }}
            />
            <span
              style={{
                color: AMBER,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1.2rem",
                fontWeight: 500,
                minWidth: 36,
                textAlign: "right",
              }}
            >
              {cols}
            </span>
          </div>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: MUTED,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Rows
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="range"
              min={4}
              max={48}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              style={{ width: 120, accentColor: TEAL }}
            />
            <span
              style={{
                color: TEAL,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "1.2rem",
                fontWeight: 500,
                minWidth: 36,
                textAlign: "right",
              }}
            >
              {rows}
            </span>
          </div>
        </label>
      </div>

      {/* Preview */}
      <div
        style={{
          width: 200,
          height: 200,
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(cols, 16)}, 1fr)`,
          gridTemplateRows: `repeat(${Math.min(rows, 16)}, 1fr)`,
          border: `1px solid ${LINE}`,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: Math.min(cols, 16) * Math.min(rows, 16) }, (_, i) => (
          <div
            key={i}
            style={{
              borderRight: `1px solid ${LINE}40`,
              borderBottom: `1px solid ${LINE}40`,
              backgroundColor: `${INK}80`,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onConfirm(cols, rows)}
        style={{
          padding: "14px 40px",
          backgroundColor: AMBER,
          color: INK,
          border: "none",
          borderRadius: 4,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 24px -6px rgba(255,178,56,0.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Create Grid
      </button>
    </div>
  );
}

function ColorWheel({ onSelectColor }) {
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
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: MUTED,
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Color Wheel
      </span>

      {/* Hue Spectrum */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: 16,
            borderRadius: 4,
            background:
              "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        />
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={handleHueChange}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 16,
            opacity: 0,
            cursor: "pointer",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -4,
            left: `${(hue / 360) * 100}%`,
            transform: "translateX(-50%)",
            width: 12,
            height: 24,
            backgroundColor: currentColor,
            border: `2px solid ${PAPER}`,
            borderRadius: 2,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Preview + Hex Input */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 4,
            backgroundColor: currentColor,
            border: `1px solid ${LINE}`,
          }}
        />
        <input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          maxLength={7}
          style={{
            flex: 1,
            padding: "10px 12px",
            backgroundColor: INK,
            border: `1px solid ${LINE}`,
            borderRadius: 4,
            color: PAPER,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={handleAddColor}
          style={{
            padding: "10px 16px",
            backgroundColor: TEAL,
            color: INK,
            border: "none",
            borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function GridPage({ onBack }) {
  const [gridCreated, setGridCreated] = useState(false);
  const [cols, setCols] = useState(16);
  const [rows, setRows] = useState(16);
  const [grid, setGrid] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#FFB238");
  const [palette, setPalette] = useState(BASIC_COLORS.map((c) => c.hex));
  const [isPainting, setIsPainting] = useState(false);

  const handleConfirmGrid = (c, r) => {
    setCols(c);
    setRows(r);
    setGrid(Array.from({ length: c * r }, () => null));
    setGridCreated(true);
  };

  const handlePaint = useCallback(
    (index) => {
      setGrid((prev) => {
        const next = [...prev];
        next[index] = selectedColor;
        return next;
      });
    },
    [selectedColor]
  );

  const handleMouseDown = (index) => {
    setIsPainting(true);
    handlePaint(index);
  };

  const handleMouseEnter = (index) => {
    if (isPainting) {
      handlePaint(index);
    }
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const handleAddToPalette = (color) => {
    if (!palette.includes(color)) {
      setPalette((prev) => [...prev, color]);
    }
    setSelectedColor(color);
  };

  const handleClearGrid = () => {
    setGrid(Array.from({ length: cols * rows }, () => null));
  };

  if (!gridCreated) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: INK,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');

          input[type="range"] {
            height: 4px;
            border-radius: 2px;
            background: ${LINE};
            outline: none;
            cursor: pointer;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: currentColor;
            border: 2px solid ${INK};
            cursor: pointer;
          }
        `}</style>

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${INK}00 0%, ${INK}CC 62%, ${INK} 100%)`,
          }}
        />

        <div style={{ position: "absolute", top: 24, left: 24, zIndex: 20 }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: MUTED,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 4,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
          >
            <span style={{ fontSize: "1rem" }}>&larr;</span>
            Back
          </button>
        </div>

        <GridSizeSelector onConfirm={handleConfirmGrid} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        backgroundColor: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');

        .grid-cell {
          border-right: 1px solid ${LINE}40;
          border-bottom: 1px solid ${LINE}40;
          cursor: crosshair;
          transition: opacity 0.1s ease;
        }
        .grid-cell:hover {
          opacity: 0.8;
        }

        .palette-color {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .palette-color:hover {
          transform: scale(1.1);
        }
        .palette-color.active {
          border-color: ${PAPER};
          transform: scale(1.15);
        }
      `}</style>

      {/* Sidebar */}
      <div
        style={{
          width: 260,
          minWidth: 260,
          height: "100vh",
          overflowY: "auto",
          backgroundColor: "#1A1D2B",
          borderRight: `1px solid ${LINE}`,
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Back + Title */}
        <div>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: MUTED,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 0",
              marginBottom: 12,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
          >
            <span>&larr;</span> Back
          </button>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: PAPER,
              fontSize: "1rem",
            }}
          >
            {cols} × {rows} Grid
          </h3>
        </div>

        {/* Selected Color Preview */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              backgroundColor: selectedColor,
              border: `2px solid ${LINE}`,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: PAPER,
                fontSize: "0.8rem",
              }}
            >
              Selected
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: MUTED,
                fontSize: "0.7rem",
              }}
            >
              {selectedColor}
            </div>
          </div>
        </div>

        {/* Color Wheel */}
        <ColorWheel onSelectColor={handleAddToPalette} />

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: LINE }} />

        {/* Palette */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: MUTED,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Palette ({palette.length})
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {palette.map((color, i) => (
              <div
                key={`${color}-${i}`}
                className={`palette-color ${selectedColor === color ? "active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: LINE }} />

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
          <button
            type="button"
            onClick={handleClearGrid}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "transparent",
              color: MUTED,
              border: `1px solid ${LINE}`,
              borderRadius: 4,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = AMBER;
              e.target.style.color = AMBER;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = LINE;
              e.target.style.color = MUTED;
            }}
          >
            Clear Grid
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            border: `1px solid ${LINE}`,
            borderRadius: 2,
            userSelect: "none",
          }}
        >
          {grid.map((color, index) => (
            <div
              key={index}
              className="grid-cell"
              style={{
                width: Math.min(28, (window.innerWidth - 340) / cols),
                height: Math.min(28, (window.innerHeight - 80) / rows),
                backgroundColor: color || `${INK}40`,
              }}
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
