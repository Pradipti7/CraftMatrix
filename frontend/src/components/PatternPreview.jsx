import { LINE } from "../theme";

export default function PatternPreview({ pattern, cellSize = 14 }) {
  const w = pattern.cols * cellSize;
  const h = pattern.rows * cellSize;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${pattern.cols}, ${cellSize}px)`,
      gridTemplateRows: `repeat(${pattern.rows}, ${cellSize}px)`,
      border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden",
      width: w, height: h, flexShrink: 0,
    }}>
      {pattern.grid.flat().map((color, i) => (
        <div key={i} style={{
          backgroundColor: color || "#1A1D2B",
          borderRight: `0.5px solid ${LINE}30`,
          borderBottom: `0.5px solid ${LINE}30`,
        }} />
      ))}
    </div>
  );
}
