import { LINE } from "../theme";

export default function PatternPreview({ pattern, cellSize = 14 }) {
  return (
    <div style={{
      width: "100%",
      aspectRatio: `${pattern.cols} / ${pattern.rows}`,
      border: `1px solid ${LINE}`, borderRadius: 4, overflow: "hidden",
    }}>
      <div style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${pattern.cols}, 1fr)`,
        gridTemplateRows: `repeat(${pattern.rows}, 1fr)`,
      }}>
        {pattern.grid.flat().map((color, i) => (
          <div key={i} style={{
            backgroundColor: color || "#1A1D2B",
            borderRight: `0.5px solid ${LINE}30`,
            borderBottom: `0.5px solid ${LINE}30`,
          }} />
        ))}
      </div>
    </div>
  );
}
