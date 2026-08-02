import React, { useState } from "react";

const INK = "#12141C";
const LINE = "#262A3A";
const PAPER = "#F1EFE7";
const MUTED = "#9CA0B4";
const AMBER = "#FFB238";
const TEAL = "#5EEAD4";

export default function SignupPage({ onBack, onNavigateToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');

        .signup-input {
          width: 100%;
          padding: 14px 16px;
          background-color: ${INK};
          border: 1px solid ${LINE};
          border-radius: 4px;
          color: ${PAPER};
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .signup-input:focus {
          border-color: ${AMBER};
        }
        .signup-input::placeholder {
          color: ${MUTED};
        }

        .signup-btn {
          width: 100%;
          padding: 16px;
          background-color: ${AMBER};
          color: ${INK};
          border: none;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .signup-btn:hover {
          transform: translateY(-2px);
          background-color: #ffc35e;
          box-shadow: 0 10px 30px -8px rgba(255,178,56,0.5);
        }
        .signup-btn:active {
          transform: translateY(0px) scale(0.98);
        }

        .signup-link {
          color: ${AMBER};
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s ease;
          cursor: pointer;
        }
        .signup-link:hover {
          color: ${TEAL};
        }

        .signup-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
          color: ${MUTED};
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }
        .signup-divider::before,
        .signup-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: ${LINE};
        }

        .signup-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: ${MUTED};
          font-size: 0.85rem;
        }
        .signup-checkbox input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: ${AMBER};
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .signup-animate {
          animation: fadeIn 0.6s cubic-bezier(.2,.8,.2,1) forwards;
        }
      `}</style>

      {/* Grid Background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage: `
            linear-gradient(${LINE} 1px, transparent 1px),
            linear-gradient(90deg, ${LINE} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${INK}00 0%, ${INK}CC 62%, ${INK} 100%)`,
        }}
      />

      {/* Signup Card */}
      <div
        className="signup-animate"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 420,
          padding: "48px 40px",
          backgroundColor: "#1A1D2B",
          border: `1px solid ${LINE}`,
          borderRadius: 6,
        }}
      >
        {/* Back Button */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "none",
              border: "none",
              color: MUTED,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 8px",
              borderRadius: 4,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = AMBER)}
            onMouseLeave={(e) => (e.target.style.color = MUTED)}
          >
            <span style={{ fontSize: "1rem" }}>&larr;</span>
            Back
          </button>
        )}

        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: PAPER,
              fontSize: "2rem",
              letterSpacing: "-0.02em",
            }}
          >
            Craft<span style={{ color: AMBER }}>Matrix</span>
          </h1>
          <p
            style={{
              marginTop: 8,
              color: MUTED,
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
            }}
          >
            Create your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: MUTED,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              className="signup-input"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: MUTED,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Email
            </label>
            <input
              type="email"
              className="signup-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: MUTED,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Password
            </label>
            <input
              type="password"
              className="signup-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                color: MUTED,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="signup-input"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 28,
            }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{
                width: 16,
                height: 16,
                accentColor: AMBER,
                cursor: "pointer",
                marginTop: 2,
              }}
              required
            />
            <span style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.4 }}>
              I agree to the{" "}
              <span className="signup-link">Terms of Service</span> and{" "}
              <span className="signup-link">Privacy Policy</span>
            </span>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </form>

        <div className="signup-divider">OR</div>

        <p style={{ textAlign: "center", color: MUTED, fontSize: "0.85rem" }}>
          Already have an account?{" "}
          <span className="signup-link" onClick={onNavigateToLogin}>
            Sign in
          </span>
        </p>
      </div>

      {/* Corner Accents */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 10,
          fontFamily: "'JetBrains Mono', monospace",
          color: LINE,
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
        }}
      >
        <span style={{ color: "#3A3F55" }}>CRAFTMATRIX · SIGNUP</span>
      </div>
    </div>
  );
}
