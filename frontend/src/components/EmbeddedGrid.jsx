import { useState, useCallback } from "react";
import { INK, LINE, PAPER, MUTED, AMBER, BASIC_COLORS } from "../theme";
import GridSizeSelector from "./GridSizeSelector";
import ColorWheel from "./ColorWheel";

function Sidebar({ cols, rows, selectedColor, palette, showColorWheel, setShowColorWheel, onAddToPalette, onClearGrid, onExportPNG, onSelectColor, onColorChange }) {
  return (
    <div style={{
      width: 260, minWidth: 260, height: "100%", overflowY: "auto",
      backgroundColor: "#1A1D2B", borderRight: `1px solid ${LINE}`,
      padding: "20px 16px", display: "flex", flexDirection: "column", gap: 20,
    }}>
      <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "1rem" }}>
        {cols} × {rows} Grid
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 4, backgroundColor: selectedColor, border: `2px solid ${LINE}` }} />
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: PAPER, fontSize: "0.8rem" }}>Selected</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem" }}>{selectedColor}</div>
        </div>
      </div>

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

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Palette ({palette.length})
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <div
            className={`palette-color ${selectedColor === null ? "active" : ""}`}
            style={{ backgroundColor: "#F3F4F6", border: `2px dashed ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", color: MUTED }}
            onClick={() => onSelectColor(null)}
            title="Eraser"
          >
            &#10005;
          </div>
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

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto" }}>
        <button
          type="button"
          onClick={onExportPNG}
          style={{
            width: "100%", padding: "10px", backgroundColor: AMBER, color: INK,
            border: "none", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer",
            transition: "background-color 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = "#ffc35e"; e.target.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = AMBER; e.target.style.transform = "translateY(0)"; }}
        >
          Export PNG
        </button>
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
      </div>
    </div>
  );
}

function GridCanvas({ cols, rows, grid, onPaintStart, onPaintEnter }) {
  const cellSize = Math.min(28, (window.innerWidth - 340) / cols);
  const cellSizeH = Math.min(28, (window.innerHeight - 80) / rows);
  const gridW = cols * cellSize;
  const gridH = rows * cellSizeH;

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32, overflow: "auto" }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: -14, left: 0, width: gridW, height: 14 }}>
          {Array.from({ length: cols + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: i * cellSize, top: 0, transform: "translateX(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", lineHeight: "14px" }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", top: gridH + 2, left: 0, width: gridW, height: 14 }}>
          {Array.from({ length: cols + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: i * cellSize, top: 0, transform: "translateX(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", lineHeight: "14px" }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", left: -20, top: 0, height: gridH, width: 20 }}>
          {Array.from({ length: rows + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", top: i * cellSizeH, left: 0, transform: "translateY(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", width: "100%", textAlign: "right", paddingRight: 4 }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", left: gridW + 2, top: 0, height: gridH, width: 20 }}>
          {Array.from({ length: rows + 1 }, (_, i) => (
            <div key={i} style={{ position: "absolute", top: i * cellSizeH, left: 0, transform: "translateY(-50%)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#9CA0B4", width: "100%", textAlign: "left", paddingLeft: 4 }}>
              {i === 0 ? "" : i}
            </div>
          ))}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSizeH}px)`,
          border: "1px solid #D1D5DB", borderRadius: 2, userSelect: "none",
        }}>
          {grid.map((color, index) => (
            <div
              key={index}
              className="grid-cell"
              style={{ backgroundColor: color || "#F3F4F6" }}
              onMouseDown={() => onPaintStart(index)}
              onMouseEnter={() => onPaintEnter(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EmbeddedGrid({ initialPattern, onClearPattern }) {
  const [gridCreated, setGridCreated] = useState(initialPattern ? true : false);
  const [cols, setCols] = useState(initialPattern?.cols || 16);
  const [rows, setRows] = useState(initialPattern?.rows || 16);
  const [grid, setGrid] = useState(initialPattern ? initialPattern.grid.flat() : []);
  const [selectedColor, setSelectedColor] = useState("#FFB238");
  const [palette, setPalette] = useState(BASIC_COLORS.map((c) => c.hex));
  const [isPainting, setIsPainting] = useState(false);
  const [showColorWheel, setShowColorWheel] = useState(true);

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
    if (isPainting) handlePaint(index);
  };

  const handleMouseUp = () => setIsPainting(false);

  const handleAddToPalette = (color) => {
    if (!palette.includes(color)) setPalette((prev) => [...prev, color]);
    setSelectedColor(color);
  };

  const handleClearGrid = () => {
    setGrid(Array.from({ length: cols * rows }, () => null));
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
        ctx.fillStyle = color;
        ctx.fillRect((i % cols) * cellSize + labelPad, Math.floor(i / cols) * cellSize + labelPad, cellSize, cellSize);
      }
    });

    ctx.strokeStyle = "#D1D5DB";
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(c * cellSize + labelPad, labelPad); ctx.lineTo(c * cellSize + labelPad, canvasH); ctx.stroke(); }
    for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(labelPad, r * cellSize + labelPad); ctx.lineTo(canvasW, r * cellSize + labelPad); ctx.stroke(); }

    ctx.fillStyle = "#9CA0B4";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let c = 1; c <= cols; c++) ctx.fillText(c, (c - 0.5) * cellSize + labelPad, labelPad / 2);
    ctx.textAlign = "right";
    for (let r = 1; r <= rows; r++) ctx.fillText(r, labelPad - 6, (r - 0.5) * cellSize + labelPad);

    const link = document.createElement("a");
    link.download = `craftmatrix-${cols}x${rows}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!gridCreated) {
    return (
      <div style={{
        width: "100%", padding: "60px 24px",
        display: "flex", flexDirection: "column", alignItems: "center",
        backgroundColor: "#FFFFFF", fontFamily: "'Inter', system-ui, sans-serif",
      }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, backgroundColor: AMBER }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B7280", letterSpacing: "0.25em", fontSize: "0.7rem", textTransform: "uppercase" }}>
              Editor
            </span>
          </div>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#12141C", fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
            Create Your Grid
          </h2>
          <p style={{ marginTop: 12, color: "#6B7280", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Choose your dimensions below to start painting pixel-perfect designs.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 10 }}>
          <GridSizeSelector onConfirm={handleConfirmGrid} />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%", minHeight: "100vh",
        display: "flex", backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Sidebar
        cols={cols}
        rows={rows}
        selectedColor={selectedColor}
        palette={palette}
        showColorWheel={showColorWheel}
        setShowColorWheel={setShowColorWheel}
        onAddToPalette={handleAddToPalette}
        onClearGrid={handleClearGrid}
        onExportPNG={handleExportPNG}
        onSelectColor={setSelectedColor}
        onColorChange={setSelectedColor}
      />
      <GridCanvas
        cols={cols}
        rows={rows}
        grid={grid}
        onPaintStart={handleMouseDown}
        onPaintEnter={handleMouseEnter}
      />
    </div>
  );
}
