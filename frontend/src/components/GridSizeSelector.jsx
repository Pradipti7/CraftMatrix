import { useState } from "react";
import { INK, AMBER, TEAL } from "../theme";

export default function GridSizeSelector({ onConfirm }) {
  const [cols, setCols] = useState(16);
  const [rows, setRows] = useState(16);
  const [colsInput, setColsInput] = useState("16");
  const [rowsInput, setRowsInput] = useState("16");

  const handleColsBlur = () => {
    const val = parseInt(colsInput, 10);
    if (!isNaN(val) && val >= 4 && val <= 100) {
      setCols(val);
      setColsInput(String(val));
    } else {
      setColsInput(String(cols));
    }
  };

  const handleRowsBlur = () => {
    const val = parseInt(rowsInput, 10);
    if (!isNaN(val) && val >= 4 && val <= 100) {
      setRows(val);
      setRowsInput(String(val));
    } else {
      setRowsInput(String(rows));
    }
  };

  const handleSliderCols = (e) => {
    const val = Number(e.target.value);
    setCols(val);
    setColsInput(String(val));
  };

  const handleSliderRows = (e) => {
    const val = Number(e.target.value);
    setRows(val);
    setRowsInput(String(val));
  };

  return (
    <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: INK, fontSize: "1.8rem" }}>
          Choose Your Grid
        </h2>
        <p style={{ marginTop: 8, color: "#6B7280", fontSize: "0.9rem" }}>
          Select the dimensions for your canvas
        </p>
      </div>

      <div style={{ display: "flex", gap: 48, padding: "32px 40px", backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B7280", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Columns
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="range" min={4} max={48} value={cols} onChange={handleSliderCols} style={{ width: 120, accentColor: AMBER }} />
            <input
              type="number"
              min={4}
              max={100}
              value={colsInput}
              onChange={(e) => setColsInput(e.target.value)}
              onBlur={handleColsBlur}
              onKeyDown={(e) => { if (e.key === "Enter") handleColsBlur(); }}
              style={{ width: 56, padding: "6px 8px", backgroundColor: "#FFFFFF", border: "1px solid #D1D5DB", borderRadius: 4, color: INK, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", fontWeight: 500, textAlign: "center", outline: "none" }}
            />
          </div>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6B7280", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Rows
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="range" min={4} max={48} value={rows} onChange={handleSliderRows} style={{ width: 120, accentColor: TEAL }} />
            <input
              type="number"
              min={4}
              max={100}
              value={rowsInput}
              onChange={(e) => setRowsInput(e.target.value)}
              onBlur={handleRowsBlur}
              onKeyDown={(e) => { if (e.key === "Enter") handleRowsBlur(); }}
              style={{ width: 56, padding: "6px 8px", backgroundColor: "#FFFFFF", border: "1px solid #D1D5DB", borderRadius: 4, color: INK, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem", fontWeight: 500, textAlign: "center", outline: "none" }}
            />
          </div>
        </label>
      </div>

      <div style={{
        width: 200, height: 200,
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(cols, 16)}, 1fr)`,
        gridTemplateRows: `repeat(${Math.min(rows, 16)}, 1fr)`,
        border: "1px solid #D1D5DB", borderRadius: 4, overflow: "hidden",
      }}>
        {Array.from({ length: Math.min(cols, 16) * Math.min(rows, 16) }, (_, i) => (
          <div key={i} style={{ borderRight: "1px solid #D1D5DB40", borderBottom: "1px solid #D1D5DB40", backgroundColor: "#F3F4F6" }} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onConfirm(cols, rows)}
        style={{
          padding: "14px 40px", backgroundColor: AMBER, color: INK, border: "none", borderRadius: 4,
          fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: "0.8rem",
          letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px -6px rgba(255,178,56,0.5)"; }}
        onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
      >
        Create Grid
      </button>
    </div>
  );
}
