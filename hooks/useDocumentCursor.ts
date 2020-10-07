import { useEffect, useState, useCallback, useMemo } from "react";

type Cursor =
  | "unset"
  | "auto"
  | "default"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "e-resize"
  | "n-resize"
  | "ne-resize"
  | "nw-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "w-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "col-resize"
  | "row-resize"
  | "all-scroll"
  | "zoom-in"
  | "zoom-out"
  | "grab"
  | "grabbing";

type Props = {
  initialState?: Cursor;
  resetOnUnmount?: boolean;
  getInitialStateFromDocument?: boolean;
};

const useDocumentCursor = (
  {
    initialState,
    resetOnUnmount = true,
    getInitialStateFromDocument,
  }: Props = { resetOnUnmount: true }
) => {
  const [cursor, set] = useState<Cursor | undefined>(initialState);

  const setCursor = useCallback((newCursor: Cursor, updateState = false) => {
    document.documentElement.style.cursor = newCursor;
    if (updateState) set(newCursor);
  }, []);

  const waitCursor = useCallback((updateState = false) => {
    document.documentElement.style.cursor = "wait";
    if (updateState) set("wait");
  }, []);

  const resetCursor = useCallback((updateState = false) => {
    document.documentElement.style.removeProperty("cursor");
    if (updateState) set(undefined);
  }, []);

  const isWaiting = useMemo(() => cursor === "wait", [cursor]);

  useEffect(() => {
    if (initialState) setCursor(initialState);
    else if (getInitialStateFromDocument) {
      setCursor(document.documentElement.style.cursor as Cursor, true);
    }

    if (resetOnUnmount) return resetCursor;
  }, [
    initialState,
    resetCursor,
    resetOnUnmount,
    setCursor,
    getInitialStateFromDocument,
  ]);

  return { cursor, isWaiting, setCursor, waitCursor, resetCursor };
};

export { useDocumentCursor };
