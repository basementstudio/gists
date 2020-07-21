import { useEffect, useState, useCallback, useMemo } from "react"

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
  | "grabbing"

type Props = { initialState?: Cursor; resetOnUnmount?: boolean }

const defaultProps: Props = { resetOnUnmount: true }

const useDocumentCursor = ({
  initialState,
  resetOnUnmount
}: Props = defaultProps) => {
  const [cursor, set] = useState<Cursor | undefined>(initialState)

  const setCursor = useCallback(
    (newCursor: Cursor, updateState: boolean = false) => {
      document.body.style.cursor = newCursor
      if (updateState) set(newCursor)
    },
    []
  )

  const resetCursor = useCallback((updateState: boolean = false) => {
    document.body.style.removeProperty("cursor")
    if (updateState) set(undefined)
  }, [])

  const isWaiting = useMemo(() => cursor === "wait", [cursor])

  useEffect(() => {
    if (initialState) setCursor(initialState)
    else setCursor((document.body.style.cursor as Cursor) || undefined, true)

    if (resetOnUnmount) return resetCursor
  }, [initialState, resetOnUnmount])

  return { cursor, isWaiting, setCursor, resetCursor }
}

export { useDocumentCursor }
