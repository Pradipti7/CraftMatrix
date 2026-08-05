import { useMemo, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import EmbeddedPatterns from "../components/EmbeddedPatterns";
import EmbeddedGrid from "../components/EmbeddedGrid";
import { INK, LINE, PAPER, MUTED, AMBER, TEAL } from "../theme";

const WORDMARK = "CraftMatrix";

function GridField({ cols, rows }) {
  const cells = useMemo(() => {
    const accents = [AMBER, TEAL];
    return Array.from({ length: cols * rows }, (_, i) => {
      const active = Math.random() < 0.055;
      return {
        id: i,
        active,
        color: accents[Math.floor(Math.random() * accents.length)],
        delay: (Math.random() * 8).toFixed(2),
        dur: (4 + Math.random() * 5).toFixed(2),
      };
    });
  }, [cols, rows]);

  return (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
    }}>
      {cells.map((c) => (
        <div key={c.id} style={{ position: "relative", borderRight: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          {c.active && (
            <span
              className="cm-cell-pulse"
              style={{ position: "absolute", inset: 0, backgroundColor: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function GridControls({ cols, rows, onColsChange, onRowsChange }) {
  return (
    <div className="cm-controls" style={{
      position: "fixed", bottom: 24, left: 24, zIndex: 20,
      display: "flex", gap: 16, padding: "12px 18px",
      backgroundColor: "#1A1D2B", border: `1px solid ${LINE}`,
      borderRadius: 6, fontFamily: "'JetBrains Mono', monospace",
      fontSize: "0.7rem", color: MUTED, letterSpacing: "0.05em",
    }}>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ textTransform: "uppercase", color: "#3A3F55", fontSize: "0.6rem" }}>Columns</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="range" min={4} max={48} value={cols} onChange={(e) => onColsChange(Number(e.target.value))} style={{ width: 80, accentColor: AMBER }} />
          <span style={{ color: AMBER, minWidth: 22, textAlign: "right" }}>{cols}</span>
        </div>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ textTransform: "uppercase", color: "#3A3F55", fontSize: "0.6rem" }}>Rows</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="range" min={2} max={30} value={rows} onChange={(e) => onRowsChange(Number(e.target.value))} style={{ width: 80, accentColor: TEAL }} />
          <span style={{ color: TEAL, minWidth: 22, textAlign: "right" }}>{rows}</span>
        </div>
      </label>
    </div>
  );
}

export default function CraftMatrixLanding({ onStartCreating, onPatterns, onHome, onSelectPattern }) {
  const [ready, setReady] = useState(false);
  const [cols, setCols] = useState(24);
  const [rows, setRows] = useState(14);
  const [gridPattern, setGridPattern] = useState(null);
  const patternsRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToPatterns = () => {
    patternsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPattern = (pattern) => {
    setGridPattern(pattern);
    setTimeout(() => scrollToGrid(), 100);
  };

  const handleStartCreating = () => {
    setGridPattern(null);
    setTimeout(() => scrollToGrid(), 100);
  };

  return (
    <div style={{ width: "100%", backgroundColor: INK }}>
      <Navbar
        onStartCreating={onStartCreating}
        onPatterns={onPatterns}
        onHome={onHome}
      />

      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section style={{
        position: "relative", width: "100%", minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "24px", paddingTop: "80px",
      }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${INK} 0%, #1A1D2B 50%, ${INK} 100%)`, zIndex: 0 }} />
        {ready && <GridField cols={cols} rows={rows} />}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${INK}00 0%, ${INK}CC 62%, ${INK} 100%)`, zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 768 }}>
          {ready && (
            <div className="cm-eyebrow" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, animationDelay: "0.05s" }}>
              <span style={{ width: 6, height: 6, backgroundColor: TEAL }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, letterSpacing: "0.25em", fontSize: "0.7rem", textTransform: "uppercase" }}>
                Grid design, made simple
              </span>
            </div>
          )}

          <h1 style={{ margin: 0, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "clamp(3rem, 10vw, 6.5rem)", letterSpacing: "-0.02em" }}>
            {ready && WORDMARK.split("").map((ch, i) => (
              <span key={i} className="cm-letter" style={{ animationDelay: `${0.15 + i * 0.045}s` }}>
                {ch === "M" ? <span style={{ color: AMBER }}>{ch}</span> : ch}
              </span>
            ))}
          </h1>

          {ready && (
            <p className="cm-sub" style={{ marginTop: 24, maxWidth: 600, color: MUTED, fontSize: "1.05rem", lineHeight: 1.6, animationDelay: "0.75s" }}>
              Lay out pixel-perfect grids, patterns, and layouts on a live canvas —
              then export your design in one click.
            </p>
          )}

          {ready && (
            <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                type="button"
                className="cm-cta"
                onClick={handleStartCreating}
                style={{
                  position: "relative", padding: "16px 36px",
                  textTransform: "uppercase", backgroundColor: AMBER, color: INK,
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
                  fontSize: "0.8rem", letterSpacing: "0.15em", border: "none",
                  cursor: "pointer", animationDelay: "0.95s",
                }}
              >
                <span className="cm-corner" style={{ position: "absolute", top: -4, left: -4, width: 8, height: 8, borderTop: `2px solid ${AMBER}`, borderLeft: `2px solid ${AMBER}` }} />
                <span className="cm-corner" style={{ position: "absolute", bottom: -4, right: -4, width: 8, height: 8, borderBottom: `2px solid ${AMBER}`, borderRight: `2px solid ${AMBER}` }} />
                Start creating
              </button>

              <button
                type="button"
                onClick={scrollToPatterns}
                className="cm-sub"
                style={{
                  padding: "16px 36px",
                  backgroundColor: "transparent", color: MUTED,
                  fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
                  fontSize: "0.8rem", letterSpacing: "0.15em",
                  border: `1px solid ${LINE}`, borderRadius: 4,
                  cursor: "pointer", animationDelay: "1.05s",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.target.style.color = PAPER; e.target.style.borderColor = MUTED; }}
                onMouseLeave={(e) => { e.target.style.color = MUTED; e.target.style.borderColor = LINE; }}
              >
                Browse patterns
              </button>
            </div>
          )}
        </div>

        <div style={{ position: "relative", zIndex: 10, marginTop: 64, fontFamily: "'JetBrains Mono', monospace", color: LINE, fontSize: "0.65rem", letterSpacing: "0.2em" }}>
          {ready && (
            <span className="cm-sub" style={{ animationDelay: "1.1s", color: "#3A3F55" }}>
              {cols} &nbsp;COLUMNS &nbsp;·&nbsp; {rows} &nbsp;ROWS &nbsp;·&nbsp; 03 &nbsp;EXPORT
            </span>
          )}
        </div>

        {ready && (
          <div className="cm-sub" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 10, animationDelay: "1.3s" }}>
            <div style={{
              width: 24, height: 40, borderRadius: 12,
              border: `2px solid ${MUTED}40`, display: "flex",
              justifyContent: "center", paddingTop: 8,
            }}>
              <div style={{
                width: 3, height: 8, borderRadius: 2,
                backgroundColor: MUTED, opacity: 0.5,
                animation: "cmScrollBounce 1.5s ease-in-out infinite",
              }} />
            </div>
          </div>
        )}
      </section>

      {/* ── Patterns Section ──────────────────────────────────────── */}
      <div ref={patternsRef}>
        <EmbeddedPatterns onSelectPattern={handleSelectPattern} />
      </div>

      {/* ── Grid Editor Section ───────────────────────────────────── */}
      <div ref={gridRef}>
        <EmbeddedGrid initialPattern={gridPattern} onClearPattern={() => setGridPattern(null)} />
      </div>
    </div>
  );
}
