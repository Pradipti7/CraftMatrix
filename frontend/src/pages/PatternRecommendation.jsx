import React, { useState } from "react";
import Navbar from "../components/Navbar";

const INK = "#12141C";
const LINE = "#262A3A";
const PAPER = "#F1EFE7";
const MUTED = "#9CA0B4";
const AMBER = "#FFB238";
const TEAL = "#5EEAD4";

const _ = null;

const PATTERNS = [
  {
    name: "Rose",
    category: "Flowers",
    cols: 16,
    rows: 16,
    grid: [
      [_,_,_,_,_,_,_,"#E11D48","#E11D48",_,_,_,_,_,_,_],
      [_,_,_,_,_,_,"#E11D48","#F43F5E","#F43F5E","#E11D48",_,_,_,_,_,_],
      [_,_,_,_,_,"#E11D48","#F43F5E","#FB7185","#FB7185","#F43F5E","#E11D48",_,_,_,_,_],
      [_,_,_,_,"#E11D48","#F43F5E","#FB7185","#FDA4AF","#FDA4AF","#FB7185","#F43F5E","#E11D48",_,_,_,_],
      [_,_,_,"#E11D48","#F43F5E","#FB7185","#FDA4AF","#FECDD3","#FECDD3","#FDA4AF","#FB7185","#F43F5E","#E11D48",_,_,_],
      [_,_,_,"#E11D48","#F43F5E","#FB7185","#FDA4AF","#FECDD3","#FECDD3","#FDA4AF","#FB7185","#F43F5E","#E11D48",_,_,_],
      [_,_,"#E11D48","#F43F5E","#FB7185","#FDA4AF","#FECDD3","#F43F5E","#F43F5E","#FECDD3","#FDA4AF","#FB7185","#F43F5E","#E11D48",_,_],
      [_,_,"#E11D48","#F43F5E","#FB7185","#FDA4AF","#F43F5E","#E11D48","#E11D48","#F43F5E","#FDA4AF","#FB7185","#F43F5E","#E11D48",_,_],
      [_,_,_,"#E11D48","#F43F5E","#FB7185","#FDA4AF","#FECDD3","#FECDD3","#FDA4AF","#FB7185","#F43F5E","#E11D48",_,_,_],
      [_,_,_,"#16A34A","#22C55E","#16A34A",_,_,_,_,"#16A34A","#22C55E","#16A34A",_,_,_],
      [_,_,_,_,_,_,"#16A34A","#22C55E","#22C55E","#16A34A",_,_,_,_,_,_],
      [_,_,_,_,_,_,_,"#16A34A","#16A34A",_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    ],
  },
  {
    name: "Sunflower",
    category: "Flowers",
    cols: 16,
    rows: 16,
    grid: [
      [_,_,_,_,_,_,"#EAB308","#EAB308","#EAB308","#EAB308",_,_,_,_,_,_],
      [_,_,_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_,_,_],
      [_,_,_,_,"#EAB308","#FACC15","#FDE047","#CA8A04","#CA8A04","#FDE047","#FACC15","#EAB308",_,_,_,_],
      [_,_,_,"#EAB308","#FACC15","#FDE047","#CA8A04","#92400E","#92400E","#CA8A04","#FDE047","#FACC15","#EAB308",_,_,_],
      [_,_,_,"#EAB308","#FACC15","#FDE047","#CA8A04","#92400E","#92400E","#CA8A04","#FDE047","#FACC15","#EAB308",_,_,_],
      [_,_,_,"#EAB308","#FACC15","#FDE047","#CA8A04","#FDE047","#FDE047","#CA8A04","#FDE047","#FACC15","#EAB308",_,_,_],
      [_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#CA8A04","#CA8A04","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_],
      [_,_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_,_],
      [_,_,_,_,_,"#EAB308","#FACC15","#FACC15","#FACC15","#FACC15","#EAB308",_,_,_,_,_],
      [_,_,_,_,_,_,"#EAB308","#EAB308","#EAB308","#EAB308",_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,"#16A34A",_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,"#16A34A",_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,"#16A34A","#22C55E","#16A34A",_,_,_,_,_,_],
      [_,_,_,_,_,_,"#16A34A",_,_,_,"#16A34A",_,_,_,_,_],
      [_,_,_,_,_,"#16A34A",_,_,_,_,_,"#16A34A",_,_,_,_],
      [_,_,_,_,"#16A34A",_,_,_,_,_,_,_,"#16A34A",_,_,_],
    ],
  },
  {
    name: "Tulip",
    category: "Flowers",
    cols: 12,
    rows: 14,
    grid: [
      [_,_,_,_,"#E11D48","#F43F5E","#F43F5E","#E11D48",_,_,_,_],
      [_,_,_,"#E11D48","#F43F5E","#FB7185","#FB7185","#F43F5E","#E11D48",_,_,_],
      [_,_,_,"#F43F5E","#FB7185","#FECDD3","#FECDD3","#FB7185","#F43F5E",_,_,_],
      [_,_,_,"#F43F5E","#FB7185","#FECDD3","#FECDD3","#FB7185","#F43F5E",_,_,_],
      [_,_,_,"#E11D48","#F43F5E","#FB7185","#FB7185","#F43F5E","#E11D48",_,_,_],
      [_,_,_,_,"#E11D48","#F43F5E","#F43F5E","#E11D48",_,_,_,_],
      [_,_,_,_,_,_,"#16A34A",_,_,_,_,_],
      [_,_,_,_,_,_,"#16A34A",_,_,_,_,_],
      [_,_,_,_,_,_,"#16A34A",_,_,_,_,_],
      [_,_,_,_,_,_,"#16A34A",_,_,_,_,_],
      [_,_,_,_,_,_,"#16A34A",_,_,_,_,_],
      [_,_,_,_,_,"#16A34A","#22C55E","#16A34A",_,_,_,_],
      [_,_,_,_,"#16A34A",_,_,_,"#16A34A",_,_,_],
      [_,_,_,"#16A34A",_,_,_,_,_,"#16A34A",_,_],
    ],
  },
  {
    name: "Straw Hat Flag",
    category: "Anime",
    cols: 16,
    rows: 16,
    grid: [
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,"#EAB308","#EAB308","#EAB308","#EAB308","#EAB308","#EAB308",_,_,_,_,_],
      [_,_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_,_],
      [_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_],
      [_,_,"#EAB308","#FACC15","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#FACC15","#EAB308",_,_],
      [_,_,_,_,"#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB",_,_,_,_],
      [_,_,_,"#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB",_,_,_],
      [_,_,_,"#F9FAFB","#F9FAFB","#1F2937","#1F2937","#F9FAFB","#F9FAFB","#1F2937","#1F2937","#F9FAFB","#F9FAFB",_,_,_],
      [_,_,_,"#F9FAFB","#F9FAFB","#1F2937","#1F2937","#F9FAFB","#F9FAFB","#1F2937","#1F2937","#F9FAFB","#F9FAFB",_,_,_],
      [_,_,_,"#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB",_,_,_],
      [_,_,_,_,"#F9FAFB","#F9FAFB","#1F2937","#F9FAFB","#F9FAFB","#1F2937","#F9FAFB","#F9FAFB",_,_,_,_],
      [_,_,_,_,_,"#F9FAFB","#1F2937","#1F2937","#1F2937","#1F2937","#F9FAFB",_,_,_,_,_],
      [_,_,_,_,_,"#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB","#F9FAFB",_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    ],
  },
  {
    name: "Straw Hat",
    category: "Anime",
    cols: 16,
    rows: 14,
    grid: [
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,"#EAB308","#EAB308","#EAB308","#EAB308",_,_,_,_,_,_],
      [_,_,_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_,_,_],
      [_,_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_,_],
      [_,_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_,_],
      [_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_],
      [_,_,"#EAB308","#FACC15","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#E11D48","#FACC15","#EAB308",_,_],
      [_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_],
      [_,_,"#EAB308","#FACC15","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FDE047","#FACC15","#EAB308",_,_],
      [_,_,"#EAB308","#FACC15","#FACC15","#FACC15","#FACC15","#FACC15","#FACC15","#FACC15","#FACC15","#FACC15","#FACC15","#EAB308",_,_],
      [_,_,_,"#EAB308","#EAB308","#EAB308","#EAB308","#EAB308","#EAB308","#EAB308","#EAB308","#EAB308","#EAB308",_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
    ],
  },
  {
    name: "Cat",
    category: "Animals",
    cols: 16,
    rows: 14,
    grid: [
      [_,_,_,"#F97316","#F97316",_,_,_,_,_,_,_,"#F97316","#F97316",_,_],
      [_,_,"#F97316","#FB923C","#FB923C","#F97316",_,_,_,_,_,"#F97316","#FB923C","#FB923C","#F97316",_],
      [_,_,"#F97316","#FB923C","#FB923C","#F97316",_,_,_,_,_,"#F97316","#FB923C","#FB923C","#F97316",_],
      [_,_,"#F97316","#FB923C","#FB923C","#FB923C","#F97316","#F97316","#F97316","#F97316","#FB923C","#FB923C","#FB923C","#FB923C","#F97316",_],
      [_,_,"#F97316","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#F97316",_],
      [_,_,"#F97316","#FB923C","#22C55E","#22C55E","#FB923C","#FB923C","#FB923C","#FB923C","#22C55E","#22C55E","#FB923C","#FB923C","#F97316",_],
      [_,_,"#F97316","#FB923C","#22C55E","#22C55E","#FB923C","#FB923C","#FB923C","#FB923C","#22C55E","#22C55E","#FB923C","#FB923C","#F97316",_],
      [_,_,_,"#F97316","#FB923C","#FB923C","#FB923C","#F43F5E","#F43F5E","#FB923C","#FB923C","#FB923C","#FB923C","#F97316",_,_],
      [_,_,_,_,"#F97316","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#F97316",_,_,_],
      [_,_,_,_,_,"#F97316","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#F97316",_,_,_,_],
      [_,_,_,_,_,"#F97316","#FB923C","#FB923C","#FB923C","#FB923C","#FB923C","#F97316",_,_,_,_],
      [_,_,_,_,_,"#F97316","#FB923C",_,_,_,"#FB923C","#F97316",_,_,_,_],
      [_,_,_,_,_,"#F97316","#FB923C",_,_,_,"#FB923C","#F97316",_,_,_,_],
      [_,_,_,_,"#F97316","#F97316",_,_,_,_,_,"#F97316","#F97316",_,_,_],
    ],
  },
  {
    name: "Dog",
    category: "Animals",
    cols: 16,
    rows: 14,
    grid: [
      [_,_,_,"#92400E","#92400E",_,_,_,_,_,_,_,"#92400E","#92400E",_,_],
      [_,_,"#92400E","#B45309","#B45309","#92400E",_,_,_,_,_,"#92400E","#B45309","#B45309","#92400E",_],
      [_,_,"#92400E","#B45309","#D97706","#B45309","#92400E","#92400E","#92400E","#92400E","#B45309","#D97706","#B45309","#B45309","#92400E",_],
      [_,_,"#92400E","#B45309","#D97706","#B45309","#B45309","#B45309","#B45309","#B45309","#B45309","#D97706","#B45309","#B45309","#92400E",_],
      [_,_,"#92400E","#B45309","#D97706","#D97706","#B45309","#B45309","#B45309","#B45309","#D97706","#D97706","#B45309","#B45309","#92400E",_],
      [_,_,_,"#92400E","#B45309","#D97706","#1F2937","#1F2937","#B45309","#1F2937","#1F2937","#D97706","#B45309","#92400E",_,_],
      [_,_,_,_,"#92400E","#B45309","#1F2937","#1F2937","#B45309","#1F2937","#1F2937","#B45309","#92400E",_,_,_],
      [_,_,_,_,_,"#92400E","#B45309","#B45309","#D97706","#B45309","#B45309","#92400E",_,_,_,_],
      [_,_,_,_,_,"#92400E","#B45309","#D97706","#1F2937","#D97706","#B45309","#92400E",_,_,_,_],
      [_,_,_,_,_,_,"#92400E","#B45309","#B45309","#B45309","#92400E",_,_,_,_,_],
      [_,_,_,_,_,_,"#92400E","#D97706","#D97706","#D97706","#92400E",_,_,_,_,_],
      [_,_,_,_,_,_,"#92400E","#B45309",_,_,"#B45309","#92400E",_,_,_,_],
      [_,_,_,_,_,"#92400E","#B45309",_,_,_,_,"#B45309","#92400E",_,_,_],
      [_,_,_,_,"#92400E","#92400E",_,_,_,_,_,_,"#92400E","#92400E",_,_],
    ],
  },
  {
    name: "Penguin",
    category: "Animals",
    cols: 14,
    rows: 14,
    grid: [
      [_,_,_,_,_,_,_,_,_,_,_,_,_,_],
      [_,_,_,_,_,"#1F2937","#1F2937","#1F2937","#1F2937",_,_,_,_,_],
      [_,_,_,_,"#1F2937","#374151","#374151","#374151","#374151","#1F2937",_,_,_,_],
      [_,_,_,"#1F2937","#374151","#374151","#374151","#374151","#374151","#374151","#1F2937",_,_,_],
      [_,_,_,"#1F2937","#374151","#F9FAFB","#F9FAFB","#374151","#374151","#374151","#1F2937",_,_,_],
      [_,_,_,"#1F2937","#374151","#F9FAFB","#F9FAFB","#374151","#374151","#374151","#1F2937",_,_,_],
      [_,_,_,"#1F2937","#374151","#374151","#374151","#374151","#374151","#374151","#1F2937",_,_,_],
      [_,_,_,_,"#1F2937","#374151","#F97316","#F97316","#374151","#1F2937",_,_,_,_],
      [_,_,_,_,_,"#1F2937","#F9FAFB","#F9FAFB","#1F2937",_,_,_,_,_],
      [_,_,_,_,_,"#1F2937","#F9FAFB","#F9FAFB","#1F2937",_,_,_,_,_],
      [_,_,_,_,_,"#1F2937","#F9FAFB","#F9FAFB","#1F2937",_,_,_,_,_],
      [_,_,_,_,_,_,"#1F2937","#1F2937",_,_,_,_,_,_],
      [_,_,_,_,_,"#F97316","#F97316","#F97316","#F97316",_,_,_,_,_],
      [_,_,_,_,_,"#F97316","#F97316","#F97316","#F97316",_,_,_,_,_],
    ],
  },
];

function PatternPreview({ pattern, cellSize = 14 }) {
  const w = pattern.cols * cellSize;
  const h = pattern.rows * cellSize;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${pattern.cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${pattern.rows}, ${cellSize}px)`,
        border: `1px solid ${LINE}`,
        borderRadius: 4,
        overflow: "hidden",
        width: w,
        height: h,
        flexShrink: 0,
      }}
    >
      {pattern.grid.flat().map((color, i) => (
        <div
          key={i}
          style={{
            backgroundColor: color || "#1A1D2B",
            borderRight: `0.5px solid ${LINE}30`,
            borderBottom: `0.5px solid ${LINE}30`,
          }}
        />
      ))}
    </div>
  );
}

const CATEGORIES = ["All", "Flowers", "Anime", "Animals"];

export default function PatternRecommendation({ onBack, onSelectPattern }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PATTERNS
      : PATTERNS.filter((p) => p.category === activeCategory);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap');

        .cm-pat-card {
          background-color: #1A1D2B;
          border: 1px solid ${LINE};
          border-radius: 6;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          transition: border-color 0.2s ease, transform 0.2s ease;
          cursor: default;
        }
        .cm-pat-card:hover {
          border-color: ${AMBER};
          transform: translateY(-2px);
        }

        .cm-pat-btn {
          padding: 8px 20px;
          background-color: ${AMBER};
          color: ${INK};
          border: none;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .cm-pat-btn:hover {
          background-color: #ffc35e;
          transform: translateY(-1px);
        }

        .cm-pat-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 3px;
          background-color: ${LINE};
          color: ${MUTED};
        }

        .cm-pat-filter {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          padding: 8px 16px;
          border: 1px solid ${LINE};
          border-radius: 4px;
          background: transparent;
          color: ${MUTED};
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cm-pat-filter:hover {
          color: ${PAPER};
          border-color: ${MUTED};
        }
        .cm-pat-filter.active {
          color: ${INK};
          background-color: ${AMBER};
          border-color: ${AMBER};
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          padding: "100px 32px 0",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
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
            padding: "6px 10px",
            borderRadius: 4,
            marginBottom: 32,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
          onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
        >
          <span>&larr;</span> Back
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
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
            Inspiration
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: PAPER,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Pattern <span style={{ color: AMBER }}>Recommendations</span>
        </h1>

        <p
          style={{
            marginTop: 16,
            color: MUTED,
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          Pick a pattern to jumpstart your grid. Each design loads directly into the
          editor so you can tweak and make it your own.
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
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 32px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((pattern) => (
          <div key={pattern.name} className="cm-pat-card">
            <PatternPreview pattern={pattern} cellSize={12} />

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: PAPER,
                  fontSize: "1rem",
                  marginBottom: 4,
                }}
              >
                {pattern.name}
              </div>
              <span className="cm-pat-tag">{pattern.category}</span>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: MUTED,
                  fontSize: "0.65rem",
                  marginTop: 6,
                }}
              >
                {pattern.cols} × {pattern.rows}
              </div>
            </div>

            <button
              type="button"
              className="cm-pat-btn"
              onClick={() => onSelectPattern(pattern)}
            >
              Use Pattern
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
