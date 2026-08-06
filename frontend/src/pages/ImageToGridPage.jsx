import { useState, useRef, useCallback, useEffect } from "react";
import { INK, LINE, PAPER, MUTED, AMBER, TEAL } from "../theme";
import ImageUploader from "../components/ImageUploader";

function imageToGrid(img, cols, rows) {
  const canvas = document.createElement("canvas");
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, cols, rows);
  const imageData = ctx.getImageData(0, 0, cols, rows);
  const data = imageData.data;
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const i = (r * cols + c) * 4;
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const hex = "#" + [red, green, blue].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
      row.push(hex);
    }
    grid.push(row);
  }
  return grid;
}

function GridPreview({ img, cols, rows }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const previewW = 200;
    const previewH = Math.round((rows / cols) * previewW);
    canvas.width = previewW;
    canvas.height = previewH;
    ctx.drawImage(img, 0, 0, previewW, previewH);

    const cellW = previewW / cols;
    const cellH = previewH / rows;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 0.5;
    for (let c = 1; c < cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellW, 0);
      ctx.lineTo(c * cellW, previewH);
      ctx.stroke();
    }
    for (let r = 1; r < rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellH);
      ctx.lineTo(previewW, r * cellH);
      ctx.stroke();
    }
  }, [img, cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: 200,
        borderRadius: 4,
        border: `1px solid ${LINE}`,
      }}
    />
  );
}

export default function ImageToGridPage({ onBack, onGridGenerated }) {
  const [image, setImage] = useState(null);
  const [cols, setCols] = useState(32);
  const [rows, setRows] = useState(32);
  const [colsInput, setColsInput] = useState("32");
  const [rowsInput, setRowsInput] = useState("32");
  const [processing, setProcessing] = useState(false);

  const handleImageLoaded = useCallback((img) => {
    setImage(img);
    if (img) {
      const aspect = img.naturalWidth / img.naturalHeight;
      let c = 32;
      let r = Math.round(c / aspect);
      if (r < 4) { r = 4; c = Math.round(r * aspect); }
      if (r > 100) { r = 100; c = Math.round(r * aspect); }
      if (c < 4) { c = 4; r = Math.round(c / aspect); }
      if (c > 100) { c = 100; r = Math.round(c / aspect); }
      setCols(c);
      setRows(r);
      setColsInput(String(c));
      setRowsInput(String(r));
    }
  }, []);

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

  const handleGenerate = () => {
    if (!image) return;
    setProcessing(true);
    requestAnimationFrame(() => {
      const grid = imageToGrid(image, cols, rows);
      setProcessing(false);
      onGridGenerated({ cols, rows, grid });
    });
  };

  return (
    <div style={{
      position: "relative", width: "100%", minHeight: "100vh",
      overflow: "hidden", display: "flex", backgroundColor: INK,
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Background grid pattern */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Back button */}
      <div style={{ position: "absolute", top: 24, left: 24, zIndex: 20 }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none", border: "none", color: MUTED, cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 6,
            padding: "6px 10px", borderRadius: 4, transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
          onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
        >
          <span style={{ fontSize: "1rem" }}>&larr;</span> Back
        </button>
      </div>

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 10, width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "80px 24px 40px", gap: 32, overflowY: "auto",
      }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{
            margin: 0, fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, color: PAPER, fontSize: "1.8rem",
          }}>
            Photo to Grid
          </h2>
          <p style={{ marginTop: 8, color: MUTED, fontSize: "0.9rem" }}>
            Upload an image and convert it into a pixel grid pattern
          </p>
        </div>

        <div style={{
          display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center",
          alignItems: "flex-start", maxWidth: 900, width: "100%",
        }}>
          {/* Left: Upload + Controls */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 24, flex: "1 1 400px", maxWidth: 500,
          }}>
            <ImageUploader onImageLoaded={handleImageLoaded} />

            {image && (
              <>
                <div style={{ height: 1, backgroundColor: LINE, width: "100%", maxWidth: 480 }} />

                {/* Grid size controls */}
                <div style={{
                  display: "flex", gap: 40, padding: "24px 32px",
                  backgroundColor: "#1A1D2B", border: `1px solid ${LINE}`,
                  borderRadius: 6, width: "100%", maxWidth: 480,
                  justifyContent: "center",
                }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: MUTED, fontSize: "0.7rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                      Columns
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="range" min={4} max={100} value={cols}
                        onChange={(e) => { const v = Number(e.target.value); setCols(v); setColsInput(String(v)); }}
                        style={{ width: 120, accentColor: AMBER }}
                      />
                      <input
                        type="number" min={4} max={100}
                        value={colsInput}
                        onChange={(e) => setColsInput(e.target.value)}
                        onBlur={handleColsBlur}
                        onKeyDown={(e) => { if (e.key === "Enter") handleColsBlur(); }}
                        style={{
                          width: 56, padding: "6px 8px", backgroundColor: INK,
                          border: `1px solid ${LINE}`, borderRadius: 4,
                          color: PAPER, fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.9rem", fontWeight: 500, textAlign: "center",
                          outline: "none",
                        }}
                      />
                    </div>
                  </label>

                  <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: MUTED, fontSize: "0.7rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                      Rows
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <input
                        type="range" min={4} max={100} value={rows}
                        onChange={(e) => { const v = Number(e.target.value); setRows(v); setRowsInput(String(v)); }}
                        style={{ width: 120, accentColor: TEAL }}
                      />
                      <input
                        type="number" min={4} max={100}
                        value={rowsInput}
                        onChange={(e) => setRowsInput(e.target.value)}
                        onBlur={handleRowsBlur}
                        onKeyDown={(e) => { if (e.key === "Enter") handleRowsBlur(); }}
                        style={{
                          width: 56, padding: "6px 8px", backgroundColor: INK,
                          border: `1px solid ${LINE}`, borderRadius: 4,
                          color: PAPER, fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.9rem", fontWeight: 500, textAlign: "center",
                          outline: "none",
                        }}
                      />
                    </div>
                  </label>
                </div>

                {/* Generate button */}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={processing}
                  style={{
                    padding: "14px 40px", backgroundColor: AMBER, color: INK,
                    border: "none", borderRadius: 4,
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
                    fontSize: "0.8rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", cursor: processing ? "wait" : "pointer",
                    opacity: processing ? 0.6 : 1,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => { if (!processing) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px -6px rgba(255,178,56,0.5)"; } }}
                  onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
                >
                  {processing ? "Processing..." : "Generate Grid"}
                </button>
              </>
            )}
          </div>

          {/* Right: Preview */}
          {image && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 12, flex: "0 0 auto",
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", color: MUTED,
                fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                Grid Preview ({cols} x {rows})
              </span>
              <GridPreview img={image} cols={cols} rows={rows} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
