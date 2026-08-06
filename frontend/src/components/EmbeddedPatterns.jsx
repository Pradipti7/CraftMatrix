import { useState } from "react";
import PatternPreview from "./PatternPreview";
import { INK, LINE, PAPER, MUTED, AMBER, TEAL } from "../theme";
import { PATTERNS, CATEGORIES } from "../data/patterns";

export default function EmbeddedPatterns({ onSelectPattern, onSeeMore }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? PATTERNS : PATTERNS.filter((p) => p.category === activeCategory);
  const displayed = filtered.slice(0, 6);
  const hasMore = filtered.length > 6;

  return (
    <div style={{ backgroundColor: INK, padding: "80px 32px 100px", fontFamily: "'Inter', system-ui, sans-serif", width: "100%" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, backgroundColor: TEAL }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, letterSpacing: "0.25em", fontSize: "0.7rem", textTransform: "uppercase" }}>
              Inspiration
            </span>
          </div>

          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Pattern <span style={{ color: AMBER }}>Recommendations</span>
          </h2>

          <p style={{ marginTop: 16, color: MUTED, fontSize: "1rem", lineHeight: 1.6, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            Pick a pattern to jumpstart your grid. Each design loads directly into the editor so you can tweak and make it your own.
          </p>

          <div style={{ display: "flex", gap: 8, marginTop: 32, justifyContent: "center", flexWrap: "wrap" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {displayed.map((pattern) => (
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

        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <button
              type="button"
              onClick={onSeeMore}
              style={{
                padding: "12px 32px",
                backgroundColor: AMBER, color: INK,
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
                fontSize: "0.8rem", letterSpacing: "0.1em",
                border: "none", borderRadius: 4,
                cursor: "pointer",
                transition: "background-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = "#ffc35e"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = AMBER; e.target.style.transform = "translateY(0)"; }}
            >
              See more patterns
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
