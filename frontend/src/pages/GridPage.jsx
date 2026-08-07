import { useState, useCallback, useEffect } from "react";
import { INK, LINE, PAPER, MUTED, AMBER, BASIC_COLORS } from "../theme";
import GridSizeSelector from "../components/GridSizeSelector";
import ColorWheel from "../components/ColorWheel";
import useUndoRedo from "../hooks/useUndoRedo";

function Sidebar({ onBack, cols, rows, selectedColor, palette, showColorWheel, setShowColorWheel, onAddToPalette, onClearGrid, onExportPNG, onSelectColor, onColorChange, canUndo, canRedo, onUndo, onRedo, activeTool, onSelectTool, onSelectToolWithHistory, eyedropperFlash }) {
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
            onClick={() => onSelectToolWithHistory("eyedropper")}
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

      {/* Actions */}
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
  const [previousTool, setPreviousTool] = useState("paint");
  const [eyedropperFlash, setEyedropperFlash] = useState(false);

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
      } else if (e.key === "f" && !isMod) {
        setActiveTool("fill");
      } else if (e.key === "p" && !isMod) {
        setActiveTool("paint");
      } else if (e.key === "i" && !isMod) {
        setPreviousTool(activeTool);
        setActiveTool("eyedropper");
      } else if (e.key === "e" && !isMod) {
        setActiveTool("eraser");
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
      setGrid((prev) => {
        const next = [...prev];
        next[index] = selectedColor;
        return next;
      });
    },
    [selectedColor, setGrid]
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

  const handleMouseDown = (index) => {
    if (activeTool === "fill") {
      beginStroke();
      handleFloodFill(index);
      endStroke();
      return;
    }
    if (activeTool === "eyedropper") {
      const pickedColor = grid[index];
      if (pickedColor) {
        setSelectedColor(pickedColor);
        if (!palette.includes(pickedColor)) {
          setPalette((prev) => [...prev, pickedColor]);
        }
        setEyedropperFlash(true);
        setTimeout(() => setEyedropperFlash(false), 300);
      }
      setActiveTool(previousTool);
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
    if (tool === "eyedropper") {
      setPreviousTool(activeTool);
    }
    setActiveTool(tool);
  };

  const handleClearGrid = () => {
    reset(Array.from({ length: cols * rows }, () => null));
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
