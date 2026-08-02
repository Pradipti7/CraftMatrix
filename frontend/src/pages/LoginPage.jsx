import React, { useState } from "react";

const INK = "#12141C";
const LINE = "#262A3A";
const PAPER = "#F1EFE7";
const MUTED = "#9CA0B4";
const AMBER = "#FFB238";
const TEAL = "#5EEAD4";

export default function LoginPage({ onBack, onNavigateToSignup, onGoogleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

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

        .login-input {
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
        .login-input:focus {
          border-color: ${AMBER};
        }
        .login-input::placeholder {
          color: ${MUTED};
        }

        .login-btn {
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
        .login-btn:hover {
          transform: translateY(-2px);
          background-color: #ffc35e;
          box-shadow: 0 10px 30px -8px rgba(255,178,56,0.5);
        }
        .login-btn:active {
          transform: translateY(0px) scale(0.98);
        }

        .login-link {
          color: ${AMBER};
          text-decoration: none;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }
        .login-link:hover {
          color: ${TEAL};
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
          color: ${MUTED};
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }
        .login-divider::before,
        .login-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background-color: ${LINE};
        }

        .login-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: ${MUTED};
          font-size: 0.85rem;
        }
        .login-checkbox input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: ${AMBER};
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .login-animate {
          animation: fadeIn 0.6s cubic-bezier(.2,.8,.2,1) forwards;
        }

        .google-btn {
          width: 100%;
          padding: 14px 16px;
          background-color: ${INK};
          color: ${PAPER};
          border: 1px solid ${LINE};
          border-radius: 4px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .google-btn:hover {
          border-color: ${MUTED};
          background-color: ${LINE}40;
        }
        .google-btn:active {
          background-color: ${LINE};
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

      {/* Login Card */}
      <div
        className="login-animate"
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
            Sign in to your account
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
              Email
            </label>
            <input
              type="email"
              className="login-input"
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
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 28,
            }}
          >
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="login-link">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-divider">OR</div>

        <button
          type="button"
          className="google-btn"
          onClick={onGoogleAuth}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Login with Google
        </button>

        <p style={{ textAlign: "center", color: MUTED, fontSize: "0.85rem" }}>
          Don't have an account?{" "}
          <span className="login-link" onClick={onNavigateToSignup} style={{ cursor: "pointer" }}>
            Sign up
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
        <span style={{ color: "#3A3F55" }}>CRAFTMATRIX · LOGIN</span>
      </div>
    </div>
  );
}
