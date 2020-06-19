import { useMemo, useEffect } from "react"

/**
 * World famous KONAMI code trigger
 * it can be mapped to any other sequence of keys
 *
 * Usage:
 *
 * const sequence = [
 *  "ArrowUp",
 *  "ArrowUp",
 *  "ArrowDown",
 *  "ArrowDown",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "b",
 *  "a"
 * ]
 *
 * useHotKey(sequence, () => {
 *   alert("konami activated!")
 * })
 * */

const createKeyChecker = (hotkeys = []) => {
  let index = 0
  const TAIL = hotkeys.length - 1
  return (key) => {
    if (key !== hotkeys[index]) {
      index = 0
      return false
    }
    if (index === TAIL) {
      index = 0
      return true
    }
    index++
    return false
  }
}

function useHotKey(hotKeys, onMatch) {
  const keyChecker = useMemo(() => createKeyChecker([].concat(hotKeys)), [
    hotKeys,
  ])
  const listen = ({ key }) => {
    if (keyChecker(key)) {
      onMatch()
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", listen)
    return () => {
      window.removeEventListener("keydown", listen)
    }
  })
}

export default useHotKey
