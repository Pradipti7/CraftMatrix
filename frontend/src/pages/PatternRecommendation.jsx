import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "../components/Navbar";
import PatternPreview from "../components/PatternPreview";
import { INK, LINE, PAPER, MUTED, AMBER, TEAL } from "../theme";
import { PATTERNS, CATEGORIES } from "../data/patterns";

export default function PatternRecommendation({ onBack, onSelectPattern, onCreatePattern }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [fabPos, setFabPos] = useState({ x: window.innerWidth - 100, y: window.innerHeight * 0.7 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    didDrag.current = false;
    dragOffset.current = { x: e.clientX - fabPos.x, y: e.clientY - fabPos.y };
    setIsDragging(true);
  }, [fabPos]);

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      didDrag.current = true;
      setFabPos({
        x: Math.max(0, Math.min(window.innerWidth - 72, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 72, e.clientY - dragOffset.current.y)),
      });
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  const handleFabClick = () => {
    if (!didDrag.current) {
      onCreatePattern();
    }
  };

  const filtered = activeCategory === "All" ? PATTERNS : PATTERNS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundColor: INK, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ position: "relative", zIndex: 200 }}>
        <Navbar onStartCreating={onCreatePattern} onPatterns={() => {}} onHome={onBack} />
      </div>

      {/* Header */}
      <div style={{ padding: "100px 32px 0", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ width: 6, height: 6, backgroundColor: TEAL }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, letterSpacing: "0.25em", fontSize: "0.7rem", textTransform: "uppercase" }}>
            Inspiration
          </span>
        </div>

        <h1 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Pattern <span style={{ color: AMBER }}>Recommendations</span>
        </h1>

        <p style={{ marginTop: 16, color: MUTED, fontSize: "1rem", lineHeight: 1.6, maxWidth: 560, textAlign: "center" }}>
          Pick a pattern to jumpstart your grid. Each design loads directly into the editor so you can tweak and make it your own.
        </p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cm-pat-filter ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "40px 32px 80px",
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24,
      }}>
        {filtered.map((pattern) => (
          <div key={pattern.name} className="cm-pat-card">
            <PatternPreview pattern={pattern} cellSize={12} />

            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "1rem", marginBottom: 4 }}>
                {pattern.name}
              </div>
              <span className="cm-pat-tag">{pattern.category}</span>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.65rem", marginTop: 6 }}>
                {pattern.cols} × {pattern.rows}
              </div>
            </div>

            <button type="button" className="cm-pat-btn" onClick={() => onSelectPattern(pattern)}>
              Use Pattern
            </button>
          </div>
        ))}
      </div>

      {/* Draggable FAB */}
      <button
        type="button"
        className="cm-fab"
        onPointerDown={handlePointerDown}
        onClick={handleFabClick}
        style={{
          position: "fixed", left: fabPos.x, top: fabPos.y,
          width: 72, height: 72, borderRadius: "50%",
          backgroundColor: AMBER, color: INK, border: "none",
          fontSize: "2rem", fontWeight: 700,
          cursor: isDragging ? "grabbing" : "grab", zIndex: 999,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px -4px rgba(255,178,56,0.5)",
          transition: isDragging ? "none" : "box-shadow 0.4s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          userSelect: "none", touchAction: "none",
        }}
      >
        +
      </button>
    </div>
  );
}
