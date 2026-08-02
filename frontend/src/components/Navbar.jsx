import React from "react";

const INK = "#12141C";
const LINE = "#262A3A";
const PAPER = "#F1EFE7";
const MUTED = "#9CA0B4";
const AMBER = "#FFB238";
const TEAL = "#5EEAD4";

export default function Navbar({ isLoggedIn, onLogin, onLogout, onStartCreating, onPreviousWork }) {
  return (
    <>
      <style>{`
        .cm-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          zIndex: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 32px;
          background-color: ${INK}CC;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${LINE};
          font-family: 'Inter', system-ui, sans-serif;
        }

        .cm-nav-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: ${PAPER};
          letter-spacing: -0.02em;
          cursor: pointer;
        }

        .cm-nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .cm-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: ${MUTED};
          letter-spacing: 0.05em;
          cursor: pointer;
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          transition: color 0.2s ease, background-color 0.2s ease;
        }
        .cm-nav-link:hover {
          color: ${PAPER};
          background-color: ${LINE};
        }

        .cm-nav-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }
        .cm-nav-btn:hover {
          transform: translateY(-1px);
        }
        .cm-nav-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .cm-nav-btn-primary {
          background-color: ${AMBER};
          color: ${INK};
        }
        .cm-nav-btn-primary:hover {
          background-color: #ffc35e;
          box-shadow: 0 4px 16px -4px rgba(255,178,56,0.5);
        }

        .cm-nav-btn-outline {
          background-color: transparent;
          color: ${PAPER};
          border: 1px solid ${LINE};
        }
        .cm-nav-btn-outline:hover {
          border-color: ${MUTED};
          background-color: ${LINE}40;
        }

        .cm-nav-btn-ghost {
          background-color: transparent;
          color: ${MUTED};
        }
        .cm-nav-btn-ghost:hover {
          color: ${PAPER};
          background-color: ${LINE};
        }

        @media (max-width: 640px) {
          .cm-nav {
            padding: 12px 16px;
          }
          .cm-nav-links {
            gap: 8px;
          }
          .cm-nav-link {
            display: none;
          }
        }
      `}</style>

      <nav className="cm-nav">
        <div className="cm-nav-brand">
          Craft<span style={{ color: AMBER }}>Matrix</span>
        </div>

        <div className="cm-nav-links">
          <button
            type="button"
            className="cm-nav-link"
            onClick={onPreviousWork}
          >
            Previous Work
          </button>

          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="cm-nav-btn cm-nav-btn-outline"
                onClick={onStartCreating}
              >
                Start Creating
              </button>
              <button
                type="button"
                className="cm-nav-btn cm-nav-btn-ghost"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="cm-nav-btn cm-nav-btn-outline"
                onClick={onStartCreating}
              >
                Start Creating
              </button>
              <button
                type="button"
                className="cm-nav-btn cm-nav-btn-primary"
                onClick={onLogin}
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
