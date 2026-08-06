import { useState, useRef, useCallback } from "react";
import { INK, MUTED, AMBER, LINE } from "../theme";

export default function ImageUploader({ onImageLoaded }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setPreview(e.target.result);
        onImageLoaded(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [onImageLoaded]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragActive(false);
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    processFile(file);
  }, [processFile]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
    onImageLoaded(null);
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        width: "100%",
        maxWidth: 480,
        height: preview ? "auto" : 240,
        border: `2px dashed ${dragActive ? AMBER : LINE}`,
        borderRadius: 8,
        backgroundColor: dragActive ? "#1A1D2B" : "#0D0F18",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: preview ? 0 : 24,
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt="Uploaded preview"
            style={{
              width: "100%",
              maxHeight: 320,
              objectFit: "contain",
              display: "block",
            }}
          />
          <div style={{
            width: "100%",
            padding: "10px 16px",
            backgroundColor: "#1A1D2B",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: MUTED,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}>
              {fileName}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              style={{
                background: "none",
                border: `1px solid ${LINE}`,
                borderRadius: 4,
                color: MUTED,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                padding: "4px 10px",
                cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.target.style.color = AMBER; e.target.style.borderColor = AMBER; }}
              onMouseLeave={(e) => { e.target.style.color = MUTED; e.target.style.borderColor = LINE; }}
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: MUTED }}>
            {dragActive ? "Drop image here" : "Click or drag an image to upload"}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#3A3F55" }}>
            PNG, JPG, GIF, WEBP
          </span>
        </>
      )}
    </div>
  );
}
