import React, { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const INK = "#12141C";
const LINE = "#262A3A";
const PAPER = "#F1EFE7";
const MUTED = "#9CA0B4";
const AMBER = "#FFB238";
const TEAL = "#5EEAD4";

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
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {cells.map((c) => (
        <div
          key={c.id}
          style={{
            position: "relative",
            borderRight: `1px solid ${LINE}`,
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          {c.active && (
            <span
              className="cm-cell-pulse"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: c.color,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function GridControls({ cols, rows, onColsChange, onRowsChange }) {
  return (
    <div
      className="cm-controls"
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 20,
        display: "flex",
        gap: 16,
        padding: "12px 18px",
        backgroundColor: "#1A1D2B",
        border: `1px solid ${LINE}`,
        borderRadius: 6,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.7rem",
        color: MUTED,
        letterSpacing: "0.05em",
      }}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ textTransform: "uppercase", color: "#3A3F55", fontSize: "0.6rem" }}>
          Columns
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="range"
            min={4}
            max={48}
            value={cols}
            onChange={(e) => onColsChange(Number(e.target.value))}
            style={{ width: 80, accentColor: AMBER }}
          />
          <span style={{ color: AMBER, minWidth: 22, textAlign: "right" }}>{cols}</span>
        </div>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ textTransform: "uppercase", color: "#3A3F55", fontSize: "0.6rem" }}>
          Rows
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="range"
            min={2}
            max={30}
            value={rows}
            onChange={(e) => onRowsChange(Number(e.target.value))}
            style={{ width: 80, accentColor: TEAL }}
          />
          <span style={{ color: TEAL, minWidth: 22, textAlign: "right" }}>{rows}</span>
        </div>
      </label>
    </div>
  );
}

export default function CraftMatrixLanding({
  isLoggedIn,
  onLogin,
  onLogout,
  onStartCreating,
  onPreviousWork,
}) {
  const [ready, setReady] = useState(false);
  const [cols, setCols] = useState(24);
  const [rows, setRows] = useState(14);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ position: "relative", zIndex: 200 }}>
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
          onStartCreating={onStartCreating}
          onPreviousWork={onPreviousWork}
        />
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          paddingTop: "80px",
        }}
      >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');

        .cm-cell-pulse {
          opacity: 0;
          animation-name: cmPulse;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        @keyframes cmPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.16; }
        }

        .cm-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.5em);
          animation-name: cmLetterIn;
          animation-duration: 0.6s;
          animation-timing-function: cubic-bezier(.2,.8,.2,1);
          animation-fill-mode: forwards;
        }
        @keyframes cmLetterIn {
          0% { opacity: 0; transform: translateY(0.5em); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0); }
        }

        .cm-eyebrow, .cm-sub, .cm-cta {
          opacity: 0;
          animation-name: cmFadeUp;
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(.2,.8,.2,1);
          animation-fill-mode: forwards;
        }
        @keyframes cmFadeUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .cm-cta {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .cm-cta:hover {
          transform: translateY(-2px);
          background-color: #ffc35e !important;
          box-shadow: 0 10px 30px -8px rgba(255,178,56,0.5);
        }
        .cm-cta:hover .cm-corner {
          border-color: ${INK} !important;
        }
        .cm-cta:active {
          transform: translateY(0px) scale(0.98);
        }

        .cm-controls input[type="range"] {
          height: 4px;
          border-radius: 2px;
          background: ${LINE};
          outline: none;
          cursor: pointer;
        }
        .cm-controls input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${AMBER};
          border: 2px solid ${INK};
          cursor: pointer;
        }

        @media (prefers-reduced-motion: reduce) {
          .cm-cell-pulse, .cm-letter, .cm-eyebrow, .cm-sub, .cm-cta {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ── Background Image ───────────────────────────────────── */}
      {/*
        Replace the src below with your own image path, e.g.:
          src="/images/your-bg.jpg"
        or use a URL:
          src="https://example.com/your-bg.jpg"
      */}
      <img
        src="https://placehold.co/1920x1080/12141C/262A3A?text=YOUR+BACKGROUND+IMAGE+HERE"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {ready && <GridField cols={cols} rows={rows} />}

      {/* vignette so text stays legible */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${INK}00 0%, ${INK}CC 62%, ${INK} 100%)`,
          zIndex: 1,
        }}
      />

      {/* ── Main Content ───────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 768,
        }}
      >
        {ready && (
          <div
            className="cm-eyebrow"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
              animationDelay: "0.05s",
            }}
          >
            <span style={{ width: 6, height: 6, backgroundColor: TEAL }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: MUTED,
                letterSpacing: "0.25em",
                fontSize: "0.7rem",
                textTransform: "uppercase",
              }}
            >
              Grid design, made simple
            </span>
          </div>
        )}

        <h1
          style={{
            margin: 0,
            lineHeight: 1,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: PAPER,
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {ready &&
            WORDMARK.split("").map((ch, i) => (
              <span
                key={i}
                className="cm-letter"
                style={{ animationDelay: `${0.15 + i * 0.045}s` }}
              >
                {ch === "M" ? (
                  <span style={{ color: AMBER }}>{ch}</span>
                ) : (
                  ch
                )}
              </span>
            ))}
        </h1>

        {ready && (
          <p
            className="cm-sub"
            style={{
              marginTop: 24,
              maxWidth: 600,
              color: MUTED,
              fontSize: "1.05rem",
              lineHeight: 1.6,
              animationDelay: "0.75s",
            }}
          >
            Lay out pixel-perfect grids, patterns, and layouts on a live canvas —
            then export your design in one click.
          </p>
        )}

        {ready && (
          <button
            type="button"
            className="cm-cta"
            onClick={onStartCreating}
            style={{
              position: "relative",
              marginTop: 40,
              padding: "16px 36px",
              textTransform: "uppercase",
              backgroundColor: AMBER,
              color: INK,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              border: "none",
              cursor: "pointer",
              animationDelay: "0.95s",
            }}
          >
            <span
              className="cm-corner"
              style={{
                position: "absolute",
                top: -4,
                left: -4,
                width: 8,
                height: 8,
                borderTop: `2px solid ${AMBER}`,
                borderLeft: `2px solid ${AMBER}`,
              }}
            />
            <span
              className="cm-corner"
              style={{
                position: "absolute",
                bottom: -4,
                right: -4,
                width: 8,
                height: 8,
                borderBottom: `2px solid ${AMBER}`,
                borderRight: `2px solid ${AMBER}`,
              }}
            />
            Start creating
          </button>
        )}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: 64,
          fontFamily: "'JetBrains Mono', monospace",
          color: LINE,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
        }}
      >
        {ready && (
          <span className="cm-sub" style={{ animationDelay: "1.1s", color: "#3A3F55" }}>
            {cols} &nbsp;COLUMNS &nbsp;·&nbsp; {rows} &nbsp;ROWS &nbsp;·&nbsp; 03 &nbsp;EXPORT
          </span>
        )}
      </div>

      {ready && (
        <GridControls
          cols={cols}
          rows={rows}
          onColsChange={setCols}
          onRowsChange={setRows}
        />
      )}
    </div>
    </div>
  );
}
