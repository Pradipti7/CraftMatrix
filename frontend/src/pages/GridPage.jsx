import { useState, useCallback, useEffect } from "react";
import { INK, LINE, PAPER, MUTED, AMBER, BASIC_COLORS } from "../theme";
import GridSizeSelector from "../components/GridSizeSelector";
import ColorWheel from "../components/ColorWheel";
import useUndoRedo from "../hooks/useUndoRedo";

const MAX_RECENT_COLORS = 8;

function Sidebar({ onBack, cols, rows, selectedColor, palette, showColorWheel, setShowColorWheel, onAddToPalette, onClearGrid, onExportPNG, onExportSVG, onSelectColor, onColorChange, canUndo, canRedo, onUndo, onRedo, activeTool, onSelectTool, onSelectToolWithHistory, eyedropperFlash, onPickScreenColor, recentColors, zoom, setZoom, showGridLines, setShowGridLines, onSave, onLoad, onShowShortcuts, symmetry, setSymmetry, onRotateLeft, onRotateRight, onFlipHorizontal, onFlipVertical, fillPattern, setFillPattern, onApplyFillPattern }) {
  return (
    <div style={{
      width: 300, minWidth: 300, height: "100vh", overflowY: "auto",
      backgroundColor: "#1A1D2B", borderRight: `1px solid ${LINE}`,
      padding: "20px 16px", display: "flex", flexDirection: "column", gap: 20, zIndex: 10,
    }}>
      {/* Back + Title */}
      <div>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none", border: "none", color: MUTED, cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6,
            padding: "4px 0", marginBottom: 12,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
          onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
        >
          <span>&larr;</span> Back
        </button>
        <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "1rem" }}>
          {cols} × {rows} Grid
        </h3>
      </div>

      {/* Selected Color Preview */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div 
          id="color-preview"
          style={{ 
            width: 40, height: 40, borderRadius: 4, backgroundColor: selectedColor, 
            border: `2px solid ${LINE}`,
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            transform: eyedropperFlash ? "scale(1.2)" : "scale(1)",
            boxShadow: eyedropperFlash ? `0 0 12px ${selectedColor}` : "none",
          }} 
        />
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: PAPER, fontSize: "0.8rem" }}>Selected</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem" }}>{selectedColor}</div>
        </div>
      </div>

      {/* Color Wheel Toggle */}
      <button
        type="button"
        onClick={() => setShowColorWheel(!showColorWheel)}
        style={{
          width: "100%", padding: "8px 12px", backgroundColor: "transparent",
          color: showColorWheel ? PAPER : MUTED, border: `1px solid ${showColorWheel ? AMBER : LINE}`,
          borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
          letterSpacing: "0.05em", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          transition: "border-color 0.2s ease, color 0.2s ease",
        }}
      >
        <span>Color Wheel</span>
        <span style={{ fontSize: "0.8rem" }}>{showColorWheel ? "−" : "+"}</span>
      </button>

      {showColorWheel && <ColorWheel onSelectColor={onAddToPalette} onColorChange={onColorChange} />}

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Palette */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Palette ({palette.length})
        </span>

        {/* Tool Selector */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={() => onSelectTool("paint")}
            title="Paint (P)"
            style={{
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: activeTool === "paint" ? "#262A3A" : "transparent",
              border: `1px solid ${activeTool === "paint" ? AMBER : LINE}`,
              borderRadius: 4, cursor: "pointer", transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTool === "paint" ? AMBER : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onPickScreenColor}
            title="Eyedropper (I)"
            style={{
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: activeTool === "eyedropper" ? "#262A3A" : "transparent",
              border: `1px solid ${activeTool === "eyedropper" ? AMBER : LINE}`,
              borderRadius: 4, cursor: "pointer", transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTool === "eyedropper" ? AMBER : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 22l1-1h3l9-9" />
              <path d="M3 21l9-9" />
              <circle cx="17.5" cy="6.5" r="3.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onSelectTool("eraser")}
            title="Eraser (E)"
            style={{
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: activeTool === "eraser" ? "#262A3A" : "transparent",
              border: `1px solid ${activeTool === "eraser" ? AMBER : LINE}`,
              borderRadius: 4, cursor: "pointer", transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTool === "eraser" ? AMBER : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20H7L3 16l9-9 8 8-4 4" />
              <path d="M6.5 13.5l5-5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onSelectTool("fill")}
            title="Flood Fill (F)"
            style={{
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: activeTool === "fill" ? "#262A3A" : "transparent",
              border: `1px solid ${activeTool === "fill" ? AMBER : LINE}`,
              borderRadius: 4, cursor: "pointer", transition: "border-color 0.2s ease, background-color 0.2s ease",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeTool === "fill" ? AMBER : MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 2.5l7.5 7.5" />
              <path d="M10 2L2 10l10 10 8-8-10-10z" />
              <path d="M19 11l3 3-8 8-3-3" />
              <path d="M22 14l-3 3" />
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {palette.map((color, i) => (
            <div
              key={`${color}-${i}`}
              className={`palette-color ${selectedColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => onSelectColor(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Recent Colors */}
      {recentColors.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Recent
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {recentColors.map((color, i) => (
              <div
                key={`recent-${color}-${i}`}
                className={`palette-color ${selectedColor === color ? "active" : ""}`}
                style={{ backgroundColor: color, width: 28, height: 28 }}
                onClick={() => onSelectColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Fill Patterns */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Fill Pattern
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {[
            { id: "none", label: "Off" },
            { id: "checker", label: "▦" },
            { id: "diagonal", label: "╱" },
            { id: "stripes-h", label: "≡" },
            { id: "stripes-v", label: "||" },
            { id: "dots", label: "⋯" },
            { id: "gradient-h", label: "▶" },
            { id: "gradient-v", label: "▼" },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSetFillPattern(p.id)}
              title={p.label}
              style={{
                height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: fillPattern === p.id ? "#262A3A" : "transparent",
                border: `1px solid ${fillPattern === p.id ? AMBER : LINE}`,
                borderRadius: 4, cursor: "pointer", color: fillPattern === p.id ? AMBER : MUTED,
                fontSize: "0.85rem",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        {fillPattern !== "none" && (
          <button
            type="button"
            onClick={onApplyFillPattern}
            style={{
              width: "100%", padding: "10px", backgroundColor: TEAL, color: INK,
              border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
          >
            Apply Pattern
          </button>
        )}
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Zoom Controls */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Zoom ({Math.round(zoom * 100)}%)
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}
            style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "transparent", border: `1px solid ${LINE}`, borderRadius: 4,
              cursor: "pointer", color: PAPER, fontSize: "1rem",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; }}
            title="Zoom Out (-)"
          >
            −
          </button>
          <input
            type="range"
            min={25}
            max={300}
            value={Math.round(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
            style={{ flex: 1, accentColor: AMBER }}
          />
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "transparent", border: `1px solid ${LINE}`, borderRadius: 4,
              cursor: "pointer", color: PAPER, fontSize: "1rem",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; }}
            title="Zoom In (+)"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            style={{
              padding: "4px 8px", backgroundColor: "transparent", border: `1px solid ${LINE}`,
              borderRadius: 4, cursor: "pointer", color: MUTED, fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem", transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = MUTED; }}
            title="Reset Zoom (0)"
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Grid Lines Toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Grid Lines
        </span>
        <button
          type="button"
          onClick={() => setShowGridLines(!showGridLines)}
          style={{
            width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
            backgroundColor: showGridLines ? AMBER : "#3A3F55",
            position: "relative", transition: "background-color 0.2s ease",
          }}
        >
          <div style={{
            position: "absolute", top: 3, left: showGridLines ? 23 : 3,
            width: 18, height: 18, borderRadius: "50%", backgroundColor: PAPER,
            transition: "left 0.2s ease",
          }} />
        </button>
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Symmetry Mode */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Symmetry ({symmetry === "none" ? "Off" : symmetry})
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { mode: "none", label: "Off", title: "No symmetry" },
            { mode: "horizontal", label: "↔", title: "Horizontal (left-right)" },
            { mode: "vertical", label: "↕", title: "Vertical (top-bottom)" },
            { mode: "both", label: "✦", title: "Both axes" },
          ].map(({ mode, label, title }) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSymmetry(mode)}
              title={title}
              style={{
                flex: 1, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: symmetry === mode ? "#262A3A" : "transparent",
                border: `1px solid ${symmetry === mode ? AMBER : LINE}`,
                borderRadius: 4, cursor: "pointer", color: symmetry === mode ? AMBER : MUTED,
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Undo / Redo */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          style={{
            flex: 1, padding: "8px", backgroundColor: "transparent",
            color: canUndo ? PAPER : "#3A3F55", border: `1px solid ${canUndo ? LINE : "#262A3A"}`,
            borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.05em", cursor: canUndo ? "pointer" : "not-allowed",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => { if (canUndo) { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; } }}
          onMouseLeave={(e) => { e.target.style.borderColor = canUndo ? LINE : "#262A3A"; e.target.style.color = canUndo ? PAPER : "#3A3F55"; }}
          title="Undo (Ctrl+Z)"
        >
          &#8630; Undo
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          style={{
            flex: 1, padding: "8px", backgroundColor: "transparent",
            color: canRedo ? PAPER : "#3A3F55", border: `1px solid ${canRedo ? LINE : "#262A3A"}`,
            borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.05em", cursor: canRedo ? "pointer" : "not-allowed",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => { if (canRedo) { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; } }}
          onMouseLeave={(e) => { e.target.style.borderColor = canRedo ? LINE : "#262A3A"; e.target.style.color = canRedo ? PAPER : "#3A3F55"; }}
          title="Redo (Ctrl+Shift+Z)"
        >
          &#8631; Redo
        </button>
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Rotate / Flip */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Transform
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={onRotateLeft}
            title="Rotate Left 90°"
            style={{
              flex: 1, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "transparent", border: `1px solid ${LINE}`, borderRadius: 4,
              cursor: "pointer", color: MUTED, fontSize: "0.7rem",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = MUTED; }}
          >
            ↺ Left
          </button>
          <button
            type="button"
            onClick={onRotateRight}
            title="Rotate Right 90°"
            style={{
              flex: 1, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "transparent", border: `1px solid ${LINE}`, borderRadius: 4,
              cursor: "pointer", color: MUTED, fontSize: "0.7rem",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = MUTED; }}
          >
            Right ↻
          </button>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            type="button"
            onClick={onFlipHorizontal}
            title="Flip Horizontal"
            style={{
              flex: 1, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "transparent", border: `1px solid ${LINE}`, borderRadius: 4,
              cursor: "pointer", color: MUTED, fontSize: "0.7rem",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = MUTED; }}
          >
            ↔ Flip H
          </button>
          <button
            type="button"
            onClick={onFlipVertical}
            title="Flip Vertical"
            style={{
              flex: 1, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "transparent", border: `1px solid ${LINE}`, borderRadius: 4,
              cursor: "pointer", color: MUTED, fontSize: "0.7rem",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = MUTED; }}
          >
            ↕ Flip V
          </button>
        </div>
      </div>

      <div style={{ height: 1, backgroundColor: LINE }} />

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={onSave}
            style={{
              flex: 1, padding: "8px", backgroundColor: "transparent",
              color: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.05em", cursor: "pointer",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = PAPER; }}
            title="Save to Browser (Ctrl+S)"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onLoad}
            style={{
              flex: 1, padding: "8px", backgroundColor: "transparent",
              color: PAPER, border: `1px solid ${LINE}`, borderRadius: 4,
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.05em", cursor: "pointer",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
            onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = PAPER; }}
            title="Load from Browser (Ctrl+O)"
          >
            Load
          </button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={onExportPNG}
            style={{
              flex: 1, padding: "10px", backgroundColor: AMBER, color: INK,
              border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer",
              transition: "background-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#ffc35e"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = AMBER; e.target.style.transform = "translateY(0)"; }}
          >
            Export PNG
          </button>
          <button
            type="button"
            onClick={onExportSVG}
            style={{
              flex: 1, padding: "10px", backgroundColor: TEAL, color: INK,
              border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer",
              transition: "background-color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = "#7dfce0"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = TEAL; e.target.style.transform = "translateY(0)"; }}
          >
            Export SVG
          </button>
        </div>
        <button
          type="button"
          onClick={onClearGrid}
          style={{
            width: "100%", padding: "10px", backgroundColor: "transparent",
            color: MUTED, border: `1px solid #D1D5DB`, borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            letterSpacing: "0.05em", cursor: "pointer",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
          onMouseLeave={(e) => { e.target.style.borderColor = "#D1D5DB"; e.target.style.color = MUTED; }}
        >
          Clear Grid
        </button>
        <button
          type="button"
          onClick={onShowShortcuts}
          style={{
            width: "100%", padding: "8px", backgroundColor: "transparent",
            color: MUTED, border: `1px solid ${LINE}`, borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
            letterSpacing: "0.05em", cursor: "pointer",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
          onMouseLeave={(e) => { e.target.style.borderColor = LINE; e.target.style.color = MUTED; }}
        >
          Keyboard Shortcuts (?)
        </button>
      </div>
    </div>
  );
}
function GridCanvas({ cols, rows, grid, onPaintStart, onPaintEnter, zoom, showGridLines }) {
  const baseCellSize = Math.min(28, (window.innerWidth - 340) / cols);
  const baseCellSizeH = Math.min(28, (window.innerHeight - 80) / rows);
  const cellSize = baseCellSize * zoom;
  const cellSizeH = baseCellSizeH * zoom;
  const gridW = cols * cellSize;
  const gridH = rows * cellSizeH;

  return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, overflow: "auto" }}>
      <div style={{ position: "relative", backgroundColor: "#FFFFFF", padding: "20px 24px 24px 20px", borderRadius: 8 }}>
        {/* Top column labels */}
        <div style={{ position: "absolute", top: 4, left: 20, width: gridW, height: 14 }}>
          {Array.from({ length: cols + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: i * cellSize, top: 0, transform: "translateX(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", lineHeight: "14px" }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        {/* Bottom column labels */}
        <div style={{ position: "absolute", top: gridH + 22, left: 20, width: gridW, height: 14 }}>
          {Array.from({ length: cols + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: i * cellSize, top: 0, transform: "translateX(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", lineHeight: "14px" }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        {/* Left row labels */}
        <div style={{ position: "absolute", left: 0, top: 20, height: gridH, width: 18 }}>
          {Array.from({ length: rows + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", top: i * cellSizeH, left: 0, transform: "translateY(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", width: "100%", textAlign: "right", paddingRight: 4 }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        {/* Right row labels */}
        <div style={{ position: "absolute", left: gridW + 22, top: 20, height: gridH, width: 18 }}>
          {Array.from({ length: rows + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", top: i * cellSizeH, left: 0, transform: "translateY(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", width: "100%", textAlign: "left", paddingLeft: 4 }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        {/* The grid */}
        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSizeH}px)`,
          border: showGridLines ? "1px solid #D1D5DB" : "none", borderRadius: 2, userSelect: "none",
        }}>
          {grid.map((color, index) => (
            <div
              key={index}
              className="grid-cell"
              style={{
                backgroundColor: color || "#F3F4F6",
                borderRight: showGridLines ? "1px solid #D1D5DB" : "none",
                borderBottom: showGridLines ? "1px solid #D1D5DB" : "none",
              }}
              onMouseDown={() => onPaintStart(index)}
              onMouseEnter={() => onPaintEnter(index)}
            />
          ))}
        </div>
      </div>
      </div>
  );
}

export default function GridPage({ onBack, initialPattern }) {
  const [gridCreated, setGridCreated] = useState(initialPattern ? true : false);
  const [cols, setCols] = useState(initialPattern?.cols || 16);
  const [rows, setRows] = useState(initialPattern?.rows || 16);
  const gridHook = useUndoRedo(initialPattern ? initialPattern.grid.flat() : []);
  const { present: grid, set: setGrid, beginStroke, endStroke, undo, redo, reset, canUndo, canRedo } = gridHook;
  const [selectedColor, setSelectedColor] = useState("#FFB238");
  const [palette, setPalette] = useState(BASIC_COLORS.map((c) => c.hex));
  const [isPainting, setIsPainting] = useState(false);
  const [showColorWheel, setShowColorWheel] = useState(true);
  const [activeTool, setActiveTool] = useState("paint");
  const [eyedropperFlash, setEyedropperFlash] = useState(false);
  const [recentColors, setRecentColors] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [showGridLines, setShowGridLines] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [symmetry, setSymmetry] = useState("none");
  const [fillPattern, setFillPattern] = useState("none");

  const addRecentColor = useCallback((color) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c !== color);
      return [color, ...filtered].slice(0, MAX_RECENT_COLORS);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gridCreated) return;
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (isMod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (isMod && e.key === "y") {
        e.preventDefault();
        redo();
      } else if (isMod && e.key === "s") {
        e.preventDefault();
        handleSave();
      } else if (isMod && e.key === "o") {
        e.preventDefault();
        handleLoad();
      } else if (e.key === "f" && !isMod) {
        setActiveTool("fill");
      } else if (e.key === "p" && !isMod) {
        setActiveTool("paint");
      } else if (e.key === "i" && !isMod) {
        handlePickScreenColor();
      } else if (e.key === "e" && !isMod) {
        setActiveTool("eraser");
      } else if (e.key === "=" || e.key === "+") {
        setZoom((z) => Math.min(3, z + 0.25));
      } else if (e.key === "-") {
        setZoom((z) => Math.max(0.25, z - 0.25));
      } else if (e.key === "0" && !isMod) {
        setZoom(1);
      } else if (e.key === "g" && !isMod) {
        setShowGridLines((v) => !v);
      } else if (e.key === "m" && !isMod) {
        setSymmetry((s) => {
          const modes = ["none", "horizontal", "vertical", "both"];
          const currentIndex = modes.indexOf(s);
          return modes[(currentIndex + 1) % modes.length];
        });
      } else if (e.key === "?") {
        setShowShortcuts((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gridCreated, undo, redo]);

  const handleConfirmGrid = (c, r) => {
    setCols(c);
    setRows(r);
    reset(Array.from({ length: c * r }, () => null));
    setGridCreated(true);
  };

  const handlePaint = useCallback(
    (index) => {
      addRecentColor(selectedColor);
      setGrid((prev) => {
        const next = [...prev];
        next[index] = selectedColor;

        if (symmetry !== "none") {
          const col = index % cols;
          const row = Math.floor(index / cols);

          if (symmetry === "horizontal" || symmetry === "both") {
            const mirrorCol = cols - 1 - col;
            const mirrorIndex = row * cols + mirrorCol;
            if (mirrorIndex !== index) next[mirrorIndex] = selectedColor;
          }
          if (symmetry === "vertical" || symmetry === "both") {
            const mirrorRow = rows - 1 - row;
            const mirrorIndex = mirrorRow * cols + col;
            if (mirrorIndex !== index) next[mirrorIndex] = selectedColor;
          }
          if (symmetry === "both") {
            const mirrorCol = cols - 1 - col;
            const mirrorRow = rows - 1 - row;
            const mirrorIndex = mirrorRow * cols + mirrorCol;
            if (mirrorIndex !== index) next[mirrorIndex] = selectedColor;
          }
        }

        return next;
      });
    },
    [selectedColor, setGrid, addRecentColor, symmetry, cols, rows]
  );

  const handleFloodFill = useCallback(
    (index) => {
      setGrid((prev) => {
        const targetColor = prev[index];
        if (targetColor === selectedColor) return prev;
        const next = [...prev];
        const queue = [index];
        const visited = new Set([index]);
        while (queue.length > 0) {
          const current = queue.shift();
          if (next[current] !== targetColor) continue;
          next[current] = selectedColor;
          const col = current % cols;
          const row = Math.floor(current / cols);
          const neighbors = [];
          if (col > 0) neighbors.push(current - 1);
          if (col < cols - 1) neighbors.push(current + 1);
          if (row > 0) neighbors.push(current - cols);
          if (row < rows - 1) neighbors.push(current + cols);
          for (const n of neighbors) {
            if (!visited.has(n) && next[n] === targetColor) {
              visited.add(n);
              queue.push(n);
            }
          }
        }
        return next;
      });
    },
    [selectedColor, setGrid, cols, rows]
  );

  const handlePickScreenColor = useCallback(async () => {
    if (typeof window.EyeDropper === "undefined") {
      alert("EyeDropper API is not supported in this browser.");
      return;
    }
    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      const hex = result.sRGBHex.toUpperCase();
      setSelectedColor(hex);
      if (!palette.includes(hex)) {
        setPalette((prev) => [...prev, hex]);
      }
      setEyedropperFlash(true);
      setTimeout(() => setEyedropperFlash(false), 300);
    } catch {
      // user cancelled
    }
  }, [palette]);

  const handleMouseDown = (index) => {
    if (activeTool === "fill") {
      beginStroke();
      handleFloodFill(index);
      endStroke();
      return;
    }
    if (activeTool === "eyedropper") {
      handlePickScreenColor();
      return;
    }
    if (activeTool === "eraser") {
      setIsPainting(true);
      beginStroke();
      setGrid((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
      return;
    }
    setIsPainting(true);
    beginStroke();
    handlePaint(index);
  };

  const handleMouseEnter = (index) => {
    if (!isPainting) return;
    if (activeTool === "eraser") {
      setGrid((prev) => {
        const next = [...prev];
        next[index] = null;

        if (symmetry !== "none") {
          const col = index % cols;
          const row = Math.floor(index / cols);

          if (symmetry === "horizontal" || symmetry === "both") {
            const mirrorCol = cols - 1 - col;
            const mirrorIndex = row * cols + mirrorCol;
            if (mirrorIndex !== index) next[mirrorIndex] = null;
          }
          if (symmetry === "vertical" || symmetry === "both") {
            const mirrorRow = rows - 1 - row;
            const mirrorIndex = mirrorRow * cols + col;
            if (mirrorIndex !== index) next[mirrorIndex] = null;
          }
          if (symmetry === "both") {
            const mirrorCol = cols - 1 - col;
            const mirrorRow = rows - 1 - row;
            const mirrorIndex = mirrorRow * cols + mirrorCol;
            if (mirrorIndex !== index) next[mirrorIndex] = null;
          }
        }

        return next;
      });
    } else {
      handlePaint(index);
    }
  };

  const handleMouseUp = () => {
    if (isPainting) {
      setIsPainting(false);
      endStroke();
    }
  };

  const handleAddToPalette = (color) => {
    if (!palette.includes(color)) {
      setPalette((prev) => [...prev, color]);
    }
    setSelectedColor(color);
  };

  const handleSelectToolWithHistory = (tool) => {
    setActiveTool(tool);
  };

  const handleClearGrid = () => {
    reset(Array.from({ length: cols * rows }, () => null));
  };

  const handleApplyFillPattern = () => {
    const newGrid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let color = null;
        switch (fillPattern) {
          case "checker":
            color = (r + c) % 2 === 0 ? selectedColor : null;
            break;
          case "diagonal":
            color = (r + c) % 3 === 0 ? selectedColor : null;
            break;
          case "stripes-h":
            color = r % 2 === 0 ? selectedColor : null;
            break;
          case "stripes-v":
            color = c % 2 === 0 ? selectedColor : null;
            break;
          case "dots":
            color = (r % 3 === 1 && c % 3 === 1) ? selectedColor : null;
            break;
          case "gradient-h":
            if (c / cols < 0.3) color = selectedColor;
            else if (c / cols < 0.6) {
              const alpha = Math.round(((c / cols) - 0.3) / 0.3 * 255).toString(16).padStart(2, "0");
              color = selectedColor + alpha;
            }
            break;
          case "gradient-v":
            if (r / rows < 0.3) color = selectedColor;
            else if (r / rows < 0.6) {
              const alpha = Math.round(((r / rows) - 0.3) / 0.3 * 255).toString(16).padStart(2, "0");
              color = selectedColor + alpha;
            }
            break;
          default:
            color = null;
        }
        newGrid.push(color);
      }
    }
    reset(newGrid);
  };

  const getGrid2D = () => {
    const grid2D = [];
    for (let r = 0; r < rows; r++) {
      grid2D.push(grid.slice(r * cols, (r + 1) * cols));
    }
    return grid2D;
  };

  const handleRotateRight = () => {
    const grid2D = getGrid2D();
    const newRows = cols;
    const newCols = rows;
    const newGrid = [];
    for (let r = 0; r < newRows; r++) {
      for (let c = 0; c < newCols; c++) {
        newGrid.push(grid2D[newCols - 1 - c][r]);
      }
    }
    setCols(newCols);
    setRows(newRows);
    reset(newGrid);
  };

  const handleRotateLeft = () => {
    const grid2D = getGrid2D();
    const newRows = cols;
    const newCols = rows;
    const newGrid = [];
    for (let r = 0; r < newRows; r++) {
      for (let c = 0; c < newCols; c++) {
        newGrid.push(grid2D[c][newRows - 1 - r]);
      }
    }
    setCols(newCols);
    setRows(newRows);
    reset(newGrid);
  };

  const handleFlipHorizontal = () => {
    const grid2D = getGrid2D();
    const newGrid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = cols - 1; c >= 0; c--) {
        newGrid.push(grid2D[r][c]);
      }
    }
    reset(newGrid);
  };

  const handleFlipVertical = () => {
    const grid2D = getGrid2D();
    const newGrid = [];
    for (let r = rows - 1; r >= 0; r--) {
      for (let c = 0; c < cols; c++) {
        newGrid.push(grid2D[r][c]);
      }
    }
    reset(newGrid);
  };

  const handleSave = () => {
    const data = { cols, rows, grid, palette, selectedColor };
    localStorage.setItem("craftmatrix-project", JSON.stringify(data));
    alert("Project saved to browser!");
  };

  const handleLoad = () => {
    const saved = localStorage.getItem("craftmatrix-project");
    if (!saved) {
      alert("No saved project found.");
      return;
    }
    try {
      const data = JSON.parse(saved);
      setCols(data.cols);
      setRows(data.rows);
      setPalette(data.palette);
      setSelectedColor(data.selectedColor);
      reset(data.grid);
      setGridCreated(true);
    } catch {
      alert("Failed to load project.");
    }
  };

  const handleExportPNG = () => {
    const cellSize = 32;
    const labelPad = 28;
    const canvasW = cols * cellSize + labelPad;
    const canvasH = rows * cellSize + labelPad;
    const canvas = document.createElement("canvas");
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvasW, canvasH);

    grid.forEach((color, i) => {
      if (color) {
        const x = (i % cols) * cellSize + labelPad;
        const y = Math.floor(i / cols) * cellSize + labelPad;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    });

    ctx.strokeStyle = "#D1D5DB";
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize + labelPad, labelPad);
      ctx.lineTo(c * cellSize + labelPad, canvasH);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(labelPad, r * cellSize + labelPad);
      ctx.lineTo(canvasW, r * cellSize + labelPad);
      ctx.stroke();
    }

    ctx.fillStyle = "#9CA0B4";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let c = 1; c <= cols; c++) {
      ctx.fillText(c, (c - 0.5) * cellSize + labelPad, labelPad / 2);
    }
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let r = 1; r <= rows; r++) {
      ctx.fillText(r, labelPad - 6, (r - 0.5) * cellSize + labelPad);
    }

    const link = document.createElement("a");
    link.download = `craftmatrix-${cols}x${rows}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleExportSVG = () => {
    const cellSize = 32;
    const labelPad = 28;
    const width = cols * cellSize + labelPad;
    const height = rows * cellSize + labelPad;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    svg += `<rect width="${width}" height="${height}" fill="#FFFFFF"/>`;

    grid.forEach((color, i) => {
      if (color) {
        const x = (i % cols) * cellSize + labelPad;
        const y = Math.floor(i / cols) * cellSize + labelPad;
        svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${color}"/>`;
      }
    });

    svg += `<g stroke="#D1D5DB" stroke-width="0.5">`;
    for (let c = 0; c <= cols; c++) {
      svg += `<line x1="${c * cellSize + labelPad}" y1="${labelPad}" x2="${c * cellSize + labelPad}" y2="${height}"/>`;
    }
    for (let r = 0; r <= rows; r++) {
      svg += `<line x1="${labelPad}" y1="${r * cellSize + labelPad}" x2="${width}" y2="${r * cellSize + labelPad}"/>`;
    }
    svg += `</g>`;

    svg += `<g fill="#9CA0B4" font-family="monospace" font-size="10" text-anchor="middle" dominant-baseline="middle">`;
    for (let c = 1; c <= cols; c++) {
      svg += `<text x="${(c - 0.5) * cellSize + labelPad}" y="${labelPad / 2}">${c}</text>`;
    }
    svg += `</g>`;
    svg += `<g fill="#9CA0B4" font-family="monospace" font-size="10" text-anchor="end" dominant-baseline="middle">`;
    for (let r = 1; r <= rows; r++) {
      svg += `<text x="${labelPad - 6}" y="${(r - 0.5) * cellSize + labelPad}">${r}</text>`;
    }
    svg += `</g>`;
    svg += `</svg>`;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `craftmatrix-${cols}x${rows}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!gridCreated) {
    return (
      <div
        style={{
          position: "relative", width: "100%", minHeight: "100vh",
          overflow: "hidden", display: "flex", alignItems: "center",
          justifyContent: "center", padding: "24px", backgroundColor: "#12141C",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "linear-gradient(#D1D5DB 1px, transparent 1px), linear-gradient(90deg, #D1D5DB 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "absolute", top: 24, left: 24, zIndex: 20 }}>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "none", border: "none", color: "#6B7280", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
              letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6,
              padding: "6px 10px", borderRadius: 4, transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
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
        position: "relative", width: "100%", minHeight: "100vh",
        overflow: "hidden", display: "flex", backgroundColor: "#12141C",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Sidebar
        onBack={onBack}
        cols={cols}
        rows={rows}
        selectedColor={selectedColor}
        palette={palette}
        showColorWheel={showColorWheel}
        setShowColorWheel={setShowColorWheel}
        onAddToPalette={handleAddToPalette}
        onClearGrid={handleClearGrid}
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
        onSelectColor={setSelectedColor}
        onColorChange={setSelectedColor}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onSelectToolWithHistory={handleSelectToolWithHistory}
        eyedropperFlash={eyedropperFlash}
        onPickScreenColor={handlePickScreenColor}
        recentColors={recentColors}
        zoom={zoom}
        setZoom={setZoom}
        showGridLines={showGridLines}
        setShowGridLines={setShowGridLines}
        onSave={handleSave}
        onLoad={handleLoad}
        onShowShortcuts={() => setShowShortcuts(true)}
        symmetry={symmetry}
        setSymmetry={setSymmetry}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onFlipHorizontal={handleFlipHorizontal}
        onFlipVertical={handleFlipVertical}
        fillPattern={fillPattern}
        setFillPattern={setFillPattern}
        onApplyFillPattern={handleApplyFillPattern}
      />
      <GridCanvas
        cols={cols}
        rows={rows}
        grid={grid}
        onPaintStart={handleMouseDown}
        onPaintEnter={handleMouseEnter}
        zoom={zoom}
        showGridLines={showGridLines}
      />

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div
          style={{
            position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
          }}
          onClick={() => setShowShortcuts(false)}
        >
          <div
            style={{
              backgroundColor: "#1A1D2B", border: `1px solid ${LINE}`, borderRadius: 8,
              padding: "24px 32px", maxWidth: 400, width: "90%", maxHeight: "80vh", overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 16px", fontFamily: "'Space Grotesk', sans-serif", color: PAPER, fontSize: "1.2rem" }}>
              Keyboard Shortcuts
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["P", "Paint tool"],
                ["E", "Eraser tool"],
                ["I", "Eyedropper (pick color from screen)"],
                ["F", "Flood fill tool"],
                ["M", "Cycle symmetry mode (off → horizontal → vertical → both)"],
                ["G", "Toggle grid lines"],
                ["+ / =", "Zoom in"],
                ["-", "Zoom out"],
                ["0", "Reset zoom"],
                ["Ctrl+Z", "Undo"],
                ["Ctrl+Shift+Z", "Redo"],
                ["Ctrl+Y", "Redo"],
                ["Ctrl+S", "Save project"],
                ["Ctrl+O", "Load project"],
                ["?", "Toggle this help"],
              ].map(([key, desc]) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: MUTED }}>{desc}</span>
                  <kbd style={{
                    padding: "2px 8px", backgroundColor: INK, border: `1px solid ${LINE}`,
                    borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: AMBER,
                  }}>
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowShortcuts(false)}
              style={{
                marginTop: 20, width: "100%", padding: "10px", backgroundColor: AMBER, color: INK,
                border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem", fontWeight: 500, cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
