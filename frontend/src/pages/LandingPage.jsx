import { useMemo, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import EmbeddedPatterns from "../components/EmbeddedPatterns";
import { INK, LINE, PAPER, MUTED, AMBER, TEAL } from "../theme";

const WORDMARK = "CraftMatrix";

const FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />
      </svg>
    ),
    title: "Pixel-Perfect Grids",
    desc: "Create precise grid layouts with customizable dimensions from 4×4 to 100×100.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" /><path d="M12 2a7 7 0 0 0 0 20" /><path d="M12 2v20" />
      </svg>
    ),
    title: "Screen Color Picker",
    desc: "Pick any color from your screen with the eyedropper tool — not just from the grid.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" /><path d="M3 12h18" /><path d="M7.5 7.5l9 9" /><path d="M16.5 7.5l-9 9" />
      </svg>
    ),
    title: "Symmetry Mode",
    desc: "Draw with horizontal, vertical, or both-axis symmetry for perfect designs.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    title: "Export PNG",
    desc: "Download your design as a high-quality PNG with grid labels included.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    title: "Undo / Redo",
    desc: "Full history support — never worry about making mistakes.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: "Save Projects",
    desc: "Save your work to the browser and continue later — no account needed.",
  },
];

const STEPS = [
  { num: "01", title: "Choose Size", desc: "Select your grid dimensions or start from a template." },
  { num: "02", title: "Paint & Create", desc: "Use tools, symmetry, and colors to design your pattern." },
  { num: "03", title: "Export & Share", desc: "Download as PNG or save to continue later." },
];

function FeaturesSection() {
  return (
    <section style={{ padding: "100px 32px", backgroundColor: INK, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 24, height: 1, backgroundColor: AMBER }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: AMBER, letterSpacing: "0.2em", fontSize: "0.7rem", textTransform: "uppercase" }}>
              Features
            </span>
            <span style={{ width: 24, height: 1, backgroundColor: AMBER }} />
          </div>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
            Everything you need to create
          </h2>
          <p style={{ marginTop: 16, color: MUTED, fontSize: "1rem", lineHeight: 1.6, maxWidth: 500, margin: "16px auto 0" }}>
            Powerful tools wrapped in a clean interface.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: 32, backgroundColor: "#1A1D2B", border: `1px solid ${LINE}`, borderRadius: 8,
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "1.1rem" }}>
                {f.title}
              </h3>
              <p style={{ margin: "12px 0 0", color: MUTED, fontSize: "0.9rem", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection({ onStartCreating }) {
  return (
    <section style={{ padding: "100px 32px", backgroundColor: "#0D0F18", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 24, height: 1, backgroundColor: TEAL }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: TEAL, letterSpacing: "0.2em", fontSize: "0.7rem", textTransform: "uppercase" }}>
              How it works
            </span>
            <span style={{ width: 24, height: 1, backgroundColor: TEAL }} />
          </div>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
            Three steps to your design
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
              <div style={{
                flexShrink: 0, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "#1A1D2B", border: `2px solid ${i === 1 ? TEAL : LINE}`, borderRadius: 8,
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: i === 1 ? TEAL : AMBER,
              }}>
                {s.num}
              </div>
              <div>
                <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "1.3rem" }}>
                  {s.title}
                </h3>
                <p style={{ margin: "8px 0 0", color: MUTED, fontSize: "1rem", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 64 }}>
          <button
            type="button"
            onClick={onStartCreating}
            style={{
              padding: "16px 48px", backgroundColor: TEAL, color: INK,
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
              fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
              border: "none", borderRadius: 4, cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px -6px rgba(94,234,212,0.4)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >
            Start creating now
          </button>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "100×100", label: "Max Grid Size" },
    { value: "16+", label: "Built-in Patterns" },
    { value: "4", label: "Drawing Tools" },
    { value: "∞", label: "Undo History" },
  ];

  return (
    <section style={{ padding: "80px 32px", backgroundColor: INK, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 40 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: i % 2 === 0 ? AMBER : TEAL, fontSize: "2rem" }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

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



export default function CraftMatrixLanding({ onStartCreating, onPatterns, onHome, onSelectPattern, onUploadPhoto }) {
  const [ready, setReady] = useState(false);
  const [cols, setCols] = useState(24);
  const [rows, setRows] = useState(14);
  const patternsRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const scrollToPatterns = () => {
    patternsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ width: "100%", backgroundColor: INK }}>
      <Navbar
        onStartCreating={onStartCreating}
        onPatterns={onPatterns}
        onHome={onHome}
        onUploadPhoto={onUploadPhoto}
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
                onClick={onStartCreating}
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

      {/* ── Stats Section ──────────────────────────────────────────── */}
      <StatsSection />

      {/* ── Features Section ──────────────────────────────────────── */}
      <FeaturesSection />

      {/* ── How It Works Section ──────────────────────────────────── */}
      <HowItWorksSection onStartCreating={onStartCreating} />

      {/* ── Patterns Section ──────────────────────────────────────── */}
      <div ref={patternsRef}>
        <EmbeddedPatterns onSelectPattern={onSelectPattern} onSeeMore={onPatterns} />
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{ padding: "40px 32px", backgroundColor: "#0D0F18", borderTop: `1px solid ${LINE}`, textAlign: "center" }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: PAPER, fontSize: "1.1rem", marginBottom: 8 }}>
          Craft<span style={{ color: AMBER }}>Matrix</span>
        </div>
        <p style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "0.7rem", letterSpacing: "0.05em" }}>
          Pixel-perfect grid design tool. Free and open source.
        </p>
      </footer>
    </div>
  );
}
