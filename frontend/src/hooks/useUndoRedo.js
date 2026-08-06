import { useState, useCallback, useRef } from "react";

const MAX_HISTORY = 100;

export default function useUndoRedo(initialState) {
  const [present, setPresent] = useState(initialState);
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const strokeSnapshotRef = useRef(null);

  const set = useCallback((newState) => {
    setPresent((prev) => {
      if (typeof newState === "function") return newState(prev);
      return newState;
    });
  }, []);

  const beginStroke = useCallback(() => {
    strokeSnapshotRef.current = present;
  }, [present]);

  const endStroke = useCallback(() => {
    const snapshot = strokeSnapshotRef.current;
    strokeSnapshotRef.current = null;
    if (snapshot === null) return;

    setPresent((current) => {
      const changed = snapshot.some((v, i) => v !== current[i]);
      if (!changed) return current;

      const updatedPast = [...pastRef.current, snapshot];
      if (updatedPast.length > MAX_HISTORY) updatedPast.shift();
      pastRef.current = updatedPast;
      futureRef.current = [];
      return current;
    });
  }, []);

  const undo = useCallback(() => {
    if (pastRef.current.length === 0) return;
    const previous = pastRef.current[pastRef.current.length - 1];
    pastRef.current = pastRef.current.slice(0, -1);
    setPresent((current) => {
      futureRef.current = [current, ...futureRef.current];
      return previous;
    });
  }, []);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const next = futureRef.current[0];
    futureRef.current = futureRef.current.slice(1);
    setPresent((current) => {
      pastRef.current = [...pastRef.current, current];
      return next;
    });
  }, []);

  const reset = useCallback((newState) => {
    pastRef.current = [];
    futureRef.current = [];
    strokeSnapshotRef.current = null;
    setPresent(newState);
  }, []);

  // Force re-render when history changes so canUndo/canRedo stay in sync
  const [historyVersion, setHistoryVersion] = useState(0);
  const bumpHistory = useCallback(() => setHistoryVersion((v) => v + 1), []);

  const wrappedUndo = useCallback(() => {
    undo();
    requestAnimationFrame(bumpHistory);
  }, [undo, bumpHistory]);

  const wrappedRedo = useCallback(() => {
    redo();
    requestAnimationFrame(bumpHistory);
  }, [redo, bumpHistory]);

  const wrappedEndStroke = useCallback(() => {
    endStroke();
    requestAnimationFrame(bumpHistory);
  }, [endStroke, bumpHistory]);

  return {
    present,
    set,
    beginStroke,
    endStroke: wrappedEndStroke,
    undo: wrappedUndo,
    redo: wrappedRedo,
    reset,
    canUndo: pastRef.current.length > 0,
    canRedo: futureRef.current.length > 0,
    historyVersion,
  };
}
