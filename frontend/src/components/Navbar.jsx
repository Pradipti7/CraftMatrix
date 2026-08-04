import { INK, LINE, PAPER, MUTED, AMBER, TEAL } from "../theme";

export default function Navbar({ onStartCreating, onPatterns, onHome }) {
  return (
    <nav className="cm-nav" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 32px", backgroundColor: `${INK}CC`,
      backdropFilter: "blur(12px)", borderBottom: `1px solid ${LINE}`,
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div className="cm-nav-brand" onClick={onHome} style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: "1.25rem", color: PAPER, letterSpacing: "-0.02em", cursor: "pointer",
      }}>
        Craft<span style={{ color: AMBER }}>Matrix</span>
      </div>

      <div className="cm-nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button
          type="button"
          className="cm-nav-link"
          onClick={onHome}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: MUTED, letterSpacing: "0.05em", cursor: "pointer",
            background: "none", border: "none", padding: "8px 12px", borderRadius: 4,
            transition: "color 0.2s ease, background-color 0.2s ease",
          }}
        >
          Home
        </button>
        <button
          type="button"
          className="cm-nav-link"
          onClick={onPatterns}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem",
            color: MUTED, letterSpacing: "0.05em", cursor: "pointer",
            background: "none", border: "none", padding: "8px 12px", borderRadius: 4,
            transition: "color 0.2s ease, background-color 0.2s ease",
          }}
        >
          Patterns
        </button>
        <button
          type="button"
          className="cm-nav-btn cm-nav-btn-primary"
          onClick={onStartCreating}
          style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "10px 20px", border: "none", borderRadius: 4, cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
          }}
        >
          Start Creating
        </button>
      </div>
    </nav>
  );
}
